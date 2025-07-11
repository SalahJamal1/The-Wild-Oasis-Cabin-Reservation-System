package com.app.wild.auth;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthController {
    private final AuthService authService;

    @PostMapping("/signup")
    public ResponseEntity<AuthResponse> signUp(@RequestBody AuthRegister authRegister, HttpServletResponse response) {
        return ResponseEntity.ok(authService.register(authRegister, response));
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> logIn(@RequestBody AuthLogin authLogin, HttpServletRequest request, HttpServletResponse response) {
        return ResponseEntity.ok(authService.login(authLogin, request, response));
    }

    @GetMapping("/logout")
    public ResponseEntity<String> logout(HttpServletRequest request, HttpServletResponse response) {
        authService.Logout(request, response);
        return ResponseEntity.status(HttpStatus.OK).body("logout done");
    }

    @GetMapping("/me")
    public Object getMe() {
        Object user = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (user instanceof UserDetails) {
            return user;
        } else throw new RuntimeException("you are not authenticated");
    }
}
