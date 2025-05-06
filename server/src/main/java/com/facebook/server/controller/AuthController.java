package com.facebook.server.controller;

import org.modelmapper.ModelMapper;
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
import com.facebook.server.security.JwtUtil;
import com.facebook.server.service.UserService;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;
    private final UserService userService;
    private final PasswordEncoder passwordEncoder;
    private final ModelMapper modelMapper;

    public AuthController(
            AuthenticationManager authenticationManager,
            JwtUtil jwtUtil,
            UserService userService,
            PasswordEncoder passwordEncoder,
            ModelMapper modelMapper) {
        this.authenticationManager = authenticationManager;
        this.jwtUtil = jwtUtil;
        this.userService = userService;
        this.passwordEncoder = passwordEncoder;
        this.modelMapper = modelMapper;
    }

    @PostMapping("/login")
    public BaseResponse<AuthResponse> login(@RequestBody AuthRequest request) {
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));

            String accessToken = jwtUtil.generateAccessToken(request.getEmail());
            String refreshToken = jwtUtil.generateRefreshToken(request.getEmail());
            String email = jwtUtil.extractEmail(accessToken);
            UserResponse userResponse = userService.findByEmail(email)
                    .orElseThrow(() -> new RuntimeException("Không tìm thấy người dùng!"));

            AuthResponse authData = new AuthResponse(userResponse, accessToken, refreshToken);
            return new BaseResponse<>(HttpStatus.OK, "Đăng nhập thành công", authData);
        } catch (BadCredentialsException e) {
            throw new RuntimeException("Email hoặc mật khẩu không đúng!");
        }
    }

    @PostMapping("/refresh")
    public AuthResponse refresh(@RequestParam String refreshToken) {
        String email = jwtUtil.extractEmail(refreshToken);
        UserResponse userResponse = userService.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy người dùng!"));
        if (email != null && jwtUtil.validateToken(refreshToken)) {
            return new AuthResponse(userResponse, jwtUtil.generateAccessToken(email), refreshToken);
        }
        throw new RuntimeException("Token không hợp lệ!");
    }

    @PostMapping("/register")
    public BaseResponse<String> register(@RequestBody AuthRequest request) {
        if (userService.findByEmail(request.getEmail()).isPresent()) {
            throw new RuntimeException("Email đã tồn tại!");
        }
        String hashedPassword = passwordEncoder.encode(request.getPassword());
        request.setPassword(hashedPassword);
        userService.saveUser(request);

        return new BaseResponse<>(HttpStatus.CREATED, "Đăng ký thành công", "User registered successfully!");
    }

    @PostMapping("/verify")
    public UserResponse verifyToken(@RequestParam String token) {
        if (!jwtUtil.validateToken(token)) {
            throw new RuntimeException("Token không hợp lệ!");
        }

        String email = jwtUtil.extractEmail(token);
        return userService.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy người dùng!"));
    }
}
