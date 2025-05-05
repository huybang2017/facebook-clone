package com.facebook.server.controller;

import com.facebook.server.dto.model.UserModel;
import com.facebook.server.dto.request.BanUserRequest;
import com.facebook.server.dto.request.LoginRequest;
import com.facebook.server.dto.response.BanResponse;
import com.facebook.server.dto.response.ErrorResponse;
import com.facebook.server.dto.response.LoginResponse;
import com.facebook.server.dto.response.UserListResponse;
import com.facebook.server.entity.constants.ImageType;
import com.facebook.server.service.PostImageService;
import com.facebook.server.service.UserService;
import com.facebook.server.utils.StringUtil;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

import static org.springframework.http.MediaType.IMAGE_JPEG_VALUE;
import static org.springframework.http.MediaType.IMAGE_PNG_VALUE;

@RestController
@RequestMapping("/api/user")
@RequiredArgsConstructor
public class UserController {

  private final UserService userService;
  private final PostImageService postImageService;

  @PostMapping("/login")
  public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
    try {
      LoginResponse loginResponse = userService.login(loginRequest);
      return new ResponseEntity<>(loginResponse, HttpStatus.OK);
    } catch (BadCredentialsException e) {
      ErrorResponse errorResponse = new ErrorResponse(StringUtil.INVALID_CREDENTIALS);
      return new ResponseEntity<>(errorResponse, HttpStatus.UNAUTHORIZED);
    }
  }

  @PostMapping("/register")
  @ResponseStatus(HttpStatus.CREATED)
  public LoginResponse register(@RequestBody @Valid UserModel userModel) {
    return userService.register(userModel);
  }

  @PostMapping("/{id}/ban")
  public ResponseEntity<?> banUser(
      @PathVariable("id") Long userId,
      @RequestBody BanUserRequest request) {
    try {
      BanResponse response = userService.banUser(userId, request.getBaned());
      return new ResponseEntity<>(response, HttpStatus.OK);
    } catch (Exception e) {
      ErrorResponse errorResponse = new ErrorResponse(StringUtil.BAN_STRING);
      return new ResponseEntity<>(errorResponse, HttpStatus.BAD_REQUEST);
    }
  }

  @GetMapping
  public UserModel getCurrentUserInfo() {
    return userService.getCurrentUserInfo();
  }

  @GetMapping("/profile/{userId}")
  public UserModel getUserProfileInfo(@PathVariable Long userId) {
    return userService.getUserProfileInfo(userId);
  }

  @PostMapping("/profile/picture/upload/{imageType}")
  public void uploadUserImage(@PathVariable(value = "imageType") ImageType imageType,
      @RequestPart(value = "file") MultipartFile file,
      @RequestPart(value = "description", required = false) String description) {
    userService.uploadUserImage(file, imageType, description);
  }

  @GetMapping(path = "/image/{filename}", produces = { IMAGE_PNG_VALUE, IMAGE_JPEG_VALUE })
  public byte[] getUserPhoto(@PathVariable("filename") String filename) throws IOException {
    return postImageService.getImages(filename);
  }

  @GetMapping("/search")
  public UserListResponse searchUser(@RequestParam(value = "keyword") String search,
      @RequestParam(value = "pageNo", defaultValue = "0", required = false) int pageNo,
      @RequestParam(value = "pageSize", defaultValue = "10", required = false) int pageSize) {
    return userService.searchUser(search, pageNo, pageSize);
  }
}
