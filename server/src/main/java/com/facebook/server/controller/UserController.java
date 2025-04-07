package com.facebook.server.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.facebook.server.dto.response.BaseResponse;
import com.facebook.server.dto.response.UserResponse;
import com.facebook.server.dto.request.UpdateUserRequest;
import com.facebook.server.service.UserService;
import jakarta.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/users")
public class UserController {
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping
    public ResponseEntity<BaseResponse<List<UserResponse>>> getAllUsers() {
        List<UserResponse> users = userService.getAllUsers();
        return ResponseEntity.ok(new BaseResponse<>(HttpStatus.OK, "Lấy danh sách user thành công", users));
    }

    @GetMapping("/{id}")
    public ResponseEntity<BaseResponse<UserResponse>> getUserById(@PathVariable String id) {
        UserResponse user = userService.getUserById(id);
        return ResponseEntity.ok(new BaseResponse<>(HttpStatus.OK, "Lấy user thành công", user));
    }

    @PatchMapping("/{id}")
    public ResponseEntity<BaseResponse<UserResponse>> updateUser(@PathVariable String id,
            @Valid @RequestBody UpdateUserRequest userDetails) {
        UserResponse updatedUser = userService.updateUser(id, userDetails);
        return ResponseEntity.ok(new BaseResponse<>(HttpStatus.OK, "Cập nhật user thành công", updatedUser));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<BaseResponse<String>> deleteUser(@PathVariable String id) {
        userService.deleteUser(id);
        return ResponseEntity
                .ok(new BaseResponse<>(HttpStatus.OK, "Xóa user thành công", "User deleted successfully!"));
    }
}
