package com.example.demo.auth;

import com.example.demo.config.JwtServices;
import com.example.demo.mapperConfig.MapperConfig;
import com.example.demo.token.TokenRepository;
import com.example.demo.user.Role;
import com.example.demo.user.User;
import com.example.demo.user.UserRepository;
import com.example.demo.utils.Helper;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.time.Duration;

@Service
@RequiredArgsConstructor
@Slf4j
public class AuthService {
    private final JwtServices jwtServices;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final MapperConfig mapperConfig;
    private final AuthenticationManager authenticationManager;
    private final TokenRepository tokenRepository;
    private final Helper helper;
    @Value("${jwt.refreshExpire}")
    private Duration refreshExpire;


    public AuthResponse register(AuthRegister authRegister, HttpServletRequest request, HttpServletResponse response) throws IOException {
        if (userRepository.findByEmail(authRegister.getEmail()).isPresent()) {
            throw new RuntimeException("The user already exists!");
        }
        User user = mapperConfig.toUser(authRegister);
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setRole(Role.ROLE_USER);
        String access_token = jwtServices.generateToken(user);
        String refresh_token = jwtServices.generateRefreshToken(user);
        try {

            String deviceId = helper.getOrCreateDeviceId(request, response);
            userRepository.save(user);
            helper.saveUsertoken(refresh_token, access_token, user, deviceId);
            var userDto = mapperConfig.toUserDto(user);
            return AuthResponse.builder().access_token(access_token).refresh_token(refresh_token).user(userDto).build();
        } catch (Exception e) {
            log.error("register error {}", e.getMessage());
            throw new RuntimeException(e.getMessage());
        }


    }

    public AuthResponse login(AuthLogin authLogin, HttpServletResponse response, HttpServletRequest request) throws IOException {


        User user = userRepository.findByEmail(authLogin.getEmail()).orElseThrow(() -> new UsernameNotFoundException("User not found"));
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(authLogin.getEmail(), authLogin.getPassword()));

        } catch (Exception e) {
            log.error("login error {}", e.getMessage());
            throw new RuntimeException("Incorrect password");

        }
        return getAuthResponse(request, response, user);

    }

    public AuthResponse refreshToken(HttpServletRequest request, HttpServletResponse response) throws IOException {
        String jwt = helper.getTokenFromCookie(request);
        if (jwt == null) {
            throw new RuntimeException("you are not logged in");
        }

        String username = jwtServices.extractUsername(jwt);
        if (username != null) {
            User user = userRepository.findByEmail(username).orElseThrow(() -> new RuntimeException("User not found"));

            if (jwtServices.isTokenValid(jwt, user)) {
                return getAuthResponse(request, response, user);

            }

        }
        throw new RuntimeException("Invalid token");

    }

    private AuthResponse getAuthResponse(HttpServletRequest request, HttpServletResponse response, User user) {
        String deviceId = helper.getOrCreateDeviceId(request, response);
        helper.revokeAllUserTokens(user, deviceId);

        String access_token = jwtServices.generateToken(user);
        String refresh_token = jwtServices.generateRefreshToken(user);

        helper.saveUsertoken(refresh_token, access_token, user, deviceId);

        helper.buildCookie(response, "jwt", refresh_token, 7);

        var userDto = mapperConfig.toUserDto(user);


        return AuthResponse.builder().access_token(access_token).refresh_token(refresh_token).user(userDto).build();
    }


}
