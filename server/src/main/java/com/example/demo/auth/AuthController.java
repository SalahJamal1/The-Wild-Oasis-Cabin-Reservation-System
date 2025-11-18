package com.example.demo.auth;


import com.example.demo.mapperConfig.MapperConfig;
import com.example.demo.user.User;
import com.example.demo.utils.Helper;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthController {
    private final AuthService service;
    private final MapperConfig mapperConfig;
    private final Helper helper;

    @PostMapping("/signup")
    public ResponseEntity<AuthResponse> signup(@Valid @RequestBody AuthRegister authRegister, HttpServletRequest request, HttpServletResponse response) throws IOException {

        return ResponseEntity.ok(service.register(authRegister, request, response));
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody AuthLogin authLogin, HttpServletResponse response, HttpServletRequest request) throws IOException {
        return ResponseEntity.ok(service.login(authLogin, response, request));
    }


    @PostMapping("/refresh-token")
    public ResponseEntity<AuthResponse> refreshToken(HttpServletRequest request, HttpServletResponse response, @AuthenticationPrincipal User user) throws IOException {


        return ResponseEntity.ok(service.refreshToken(request, response));
    }


}
