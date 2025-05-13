package com.facebook.server.service;

import com.facebook.server.dto.model.UserDataModel;
import com.facebook.server.dto.model.UserModel;
import com.facebook.server.dto.request.LoginRequest;
import com.facebook.server.dto.response.BanResponse;
import com.facebook.server.dto.response.LoginResponse;
import com.facebook.server.dto.response.PageResponse;
import com.facebook.server.dto.response.UserListResponse;
import com.facebook.server.entity.User;
import com.facebook.server.entity.constants.ImageType;
import org.springframework.data.domain.Page;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface UserService {
  LoginResponse login(LoginRequest loginRequest);

  LoginResponse register(UserModel userModel);

  UserModel getCurrentUserInfo();

  UserModel getUserProfileInfo(Long userId);

  void uploadUserImage(MultipartFile file, ImageType imageType, String description);

  UserListResponse searchUser(String search, int pageNo, int pageSize);

  PageResponse getUserPagination(Page<User> users);

  BanResponse banUser(Long userId, Boolean baned);

  List<UserDataModel> getUserDataModels(Page<User> users);

  User getUserByUserId(Long userId);

  User getCurrentAuthenticatedUser();

  UserListResponse getAllUsers(int pageNo, int pageSize);
}
