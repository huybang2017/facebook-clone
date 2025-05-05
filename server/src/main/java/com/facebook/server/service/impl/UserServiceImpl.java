package com.facebook.server.service.impl;

import com.facebook.server.dto.model.UserDataModel;
import com.facebook.server.dto.model.UserModel;
import com.facebook.server.dto.request.LoginRequest;
import com.facebook.server.dto.response.LoginResponse;
import com.facebook.server.dto.response.PageResponse;
import com.facebook.server.dto.response.UserListResponse;
import com.facebook.server.entity.Post;
import com.facebook.server.entity.PostImage;
import com.facebook.server.entity.User;
import com.facebook.server.entity.constants.ImageType;
import com.facebook.server.repository.PostImageRepository;
import com.facebook.server.repository.PostRepository;
import com.facebook.server.repository.UserRepository;
import com.facebook.server.security.JwtService;
import com.facebook.server.service.UserService;
import com.facebook.server.utils.StringUtil;
import com.facebook.server.utils.mapper.UserMapper;
import jakarta.persistence.EntityExistsException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;

import static java.nio.file.StandardCopyOption.REPLACE_EXISTING;

@RequiredArgsConstructor
@Service
public class UserServiceImpl implements UserService {

    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    private final UserRepository userRepository;
    private final UserMapper mapper;
    private final PostRepository postRepository;
    private final PostImageRepository postImageRepository;

    @Override
    public LoginResponse login(LoginRequest loginRequest) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword()));

            return LoginResponse.builder()
                    .jwtToken(jwtService.generateToken(authentication))
                    .role(authentication.getAuthorities().iterator().next().getAuthority())
                    .build();
        } catch (AuthenticationException e) {
            throw new BadCredentialsException(StringUtil.INVALID_CREDENTIALS);
        }
    }

    @Override
    public LoginResponse register(UserModel userModel) {

        boolean isEmailExists = userRepository.existsByEmailIgnoreCase(userModel.getEmail());

        if (isEmailExists) {
            throw new EntityExistsException(StringUtil.USER_EXISTS + userModel.getEmail());
        }

        User user = mapper.mapUserModelToUserEntity(userModel);
        user.setCreatedAt(LocalDate.now());
        userRepository.save(user);

        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(userModel.getEmail(), userModel.getPassword()));

            return LoginResponse.builder()
                    .jwtToken(jwtService.generateToken(authentication))
                    .role(authentication.getAuthorities().iterator().next().getAuthority())
                    .build();
        } catch (AuthenticationException e) {
            throw new BadCredentialsException(StringUtil.INVALID_CREDENTIALS);
        }
    }

    @Override
    public User getUserByUserId(Long userId) {
        return userRepository.findById(userId)
                .orElseThrow(() -> new NoSuchElementException(StringUtil.USER_NOT_FOUND));
    }

    @Override
    public User getCurrentAuthenticatedUser() {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new NoSuchElementException(StringUtil.USER_NOT_FOUND));
    }

    @Override
    public UserModel getCurrentUserInfo() {
        User user = this.getCurrentAuthenticatedUser();
        return mapper.mapUserEntityToUserModel(user);
    }

    @Override
    public UserModel getUserProfileInfo(Long userId) {
        User user = this.getUserByUserId(userId);
        return mapper.mapUserEntityToUserModel(user);
    }

    @Override
    public void uploadUserImage(MultipartFile file, ImageType imageType, String description) {
        User user = this.getCurrentAuthenticatedUser();
        if (file != null) {
            if (imageType.equals(ImageType.PROFILE_PICTURE)) {
                user.setProfilePicture(processImage(file));
            } else if (imageType.equals(ImageType.COVER_PHOTO)) {
                user.setCoverPhoto(processImage(file));
            }
            User savedUser = userRepository.save(user);

            Post post = new Post();
            post.setContent(description);
            post.setTimestamp(LocalDateTime.now());
            post.setUser(savedUser);
            Post savedPost = postRepository.save(post);

            PostImage postImage = new PostImage();
            postImage.setPost(savedPost);
            postImage.setPostImageUrl(processImage(file));
            postImage.setTimestamp(LocalDateTime.now());
            postImageRepository.save(postImage);
        }
    }

    @Override
    public String processImage(MultipartFile image) {
        String filename = System.currentTimeMillis() + "_" + image.getOriginalFilename();

        try {
            Path fileStorageLocation = Paths.get(StringUtil.PHOTO_DIRECTORY).toAbsolutePath().normalize();

            if (!Files.exists(fileStorageLocation)) {
                Files.createDirectories(fileStorageLocation);
            }

            Files.copy(image.getInputStream(), fileStorageLocation.resolve(filename), REPLACE_EXISTING);

            return ServletUriComponentsBuilder
                    .fromCurrentContextPath()
                    .path("/api/user/image/" + filename).toUriString();

        } catch (Exception exception) {
            throw new RuntimeException("Unable to save image");
        }
    }

    @Override
    public UserListResponse searchUser(String search, int pageNo, int pageSize) {
        Pageable pageable = PageRequest.of(pageNo, pageSize);
        Page<User> users = userRepository.searchUser(search, pageable);
        PageResponse pageResponse = this.getUserPagination(users);
        List<UserDataModel> userDataModels = this.getUserDataModels(users);
        return new UserListResponse(userDataModels, pageResponse);
    }

    @Override
    public PageResponse getUserPagination(Page<User> users) {
        PageResponse pageResponse = new PageResponse();
        pageResponse.setPageNo(users.getNumber());
        pageResponse.setPageSize(users.getSize());
        pageResponse.setTotalElements(users.getTotalElements());
        pageResponse.setTotalPages(users.getTotalPages());
        pageResponse.setLast(users.isLast());
        return pageResponse;
    }

    @Override
    public List<UserDataModel> getUserDataModels(Page<User> users) {
        List<UserDataModel> userDataModels = new ArrayList<>();

        for (User user : users) {
            UserDataModel userDataModel = new UserDataModel();
            userDataModel.setUniqueId(user.getUserId() + 1000L);
            userDataModel.setUserId(user.getUserId());
            userDataModel.setFirstName(user.getFirstName());
            userDataModel.setLastName(user.getLastName());
            userDataModel.setProfilePicture(user.getProfilePicture());
            userDataModels.add(userDataModel);
        }
        return userDataModels;
    }
}
