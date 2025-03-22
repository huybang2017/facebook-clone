package com.facebook.server.controller;

import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import com.facebook.server.dto.request.AuthRequest;
import com.facebook.server.dto.response.AuthResponse;
import com.facebook.server.dto.response.BaseResponse;
import com.facebook.server.dto.response.UserResponse;
import com.facebook.server.entity.User;
import com.facebook.server.repository.UserRepository;
import com.facebook.server.security.JwtUtil;
import com.facebook.server.service.UserService;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;
    private final UserService userService;
    private final PasswordEncoder passwordEncoder;

    public AuthController(AuthenticationManager authenticationManager, JwtUtil jwtUtil, UserService userService,
            PasswordEncoder passwordEncoder) {
        this.authenticationManager = authenticationManager;
        this.jwtUtil = jwtUtil;
        this.userService = userService;
        this.passwordEncoder = passwordEncoder;
    }

    @PostMapping("/login")
    public BaseResponse<AuthResponse> login(@RequestBody AuthRequest request) {
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));

            String accessToken = jwtUtil.generateAccessToken(request.getEmail());
            String refreshToken = jwtUtil.generateRefreshToken(request.getEmail());

            AuthResponse authData = new AuthResponse(accessToken, refreshToken);
            return new BaseResponse<>(HttpStatus.OK, "Đăng nhập thành công", authData);
        } catch (BadCredentialsException e) {
            throw new RuntimeException("Email hoặc mật khẩu không đúng!");
        }
    }

    @PostMapping("/refresh")
    public BaseResponse<AuthResponse> refresh(@RequestParam String refreshToken) {
        String email = jwtUtil.extractEmail(refreshToken);
        if (email != null && jwtUtil.validateToken(refreshToken)) {
            AuthResponse authData = new AuthResponse(jwtUtil.generateAccessToken(email), refreshToken);
            return new BaseResponse<>(HttpStatus.OK, "Làm mới token thành công", authData);
        }
        throw new RuntimeException("Token không hợp lệ!");
    }

    @PostMapping("/register")
    public BaseResponse<String> register(@RequestBody AuthRequest request) {
        if (userService.findByEmail(request.getEmail()).isPresent()) { // Dùng userService.findByEmail()
            throw new RuntimeException("Email đã tồn tại!");
        }

        User user = new User();
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        userService.saveUser(user); // Dùng userService.saveUser()

        return new BaseResponse<>(HttpStatus.CREATED, "Đăng ký thành công", "User registered successfully!");
    }

    @PostMapping("/verify")
    public BaseResponse<UserResponse> verifyToken(@RequestParam String token) {
        if (jwtUtil.validateToken(token)) {
            String email = jwtUtil.extractEmail(token);
            return userService.findByEmail(email)
                    .map(user -> {
                        UserResponse userResponse = new UserResponse(
                                user.getId(),
                                user.getEmail(),
                                user.getName(),
                                user.getBirthday(),
                                user.getLinkSocialMedia(),
                                user.getBio(),
                                user.getImage() != null ? user.getImage().toString() : null,
                                user.getCreatedAt(),
                                user.getUpdatedAt());
                        return new BaseResponse<>(HttpStatus.OK, "Token hợp lệ", userResponse);
                    })
                    .orElseThrow(() -> new RuntimeException("Không tìm thấy người dùng!"));
        }
        throw new RuntimeException("Token không hợp lệ!");
    }
}
