package com.app.wild.auth;

import com.app.wild.config.JwtService;
import com.app.wild.user.Role;
import com.app.wild.user.User;
import com.app.wild.user.UserRepository;
import com.app.wild.user.dto.UserDto;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final UserRepository userRepository;
    private final AuthenticationManager authenticationManager;

    public AuthResponse register(AuthRegister authRegister, HttpServletResponse response) {
        var user = User.builder()
                .email(authRegister.getEmail())
                .role(Role.ROLE_USER)
                .firstName(authRegister.getFirstName())
                .lastName(authRegister.getLastName())
                .password(passwordEncoder.encode(authRegister.getPassword()))
                .build();
        userRepository.save(user);

        return authResponse(user, response);
    }

    public AuthResponse login(AuthLogin authLogin, HttpServletRequest request, HttpServletResponse response) {
        try {

            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            authLogin.getEmail(),
                            authLogin.getPassword()
                    )
            );
            var user = userRepository.findByEmail(authLogin.getEmail());
            return authResponse(user, response);
        } catch (AuthenticationException exc) {
            throw new RuntimeException("Invalid email or password");
        }
    }

    public void Logout(HttpServletRequest request, HttpServletResponse response) {
        Cookie cookie = new Cookie("jwt", null);
        cookie.setMaxAge(0);
        cookie.setHttpOnly(true);
        cookie.setSecure(true);
        cookie.setPath("/");
        cookie.setAttribute("SameSite", "None");
        response.addCookie(cookie);
    }

    private void setCookie(String jwt, HttpServletResponse response) {
        Cookie cookie = new Cookie("jwt", jwt);
        cookie.setHttpOnly(true);
        cookie.setSecure(true);
        cookie.setPath("/");
        cookie.setMaxAge(7 * 24 * 60 * 60);
        cookie.setAttribute("SameSite", "None");

        response.addCookie(cookie);

    }

    private AuthResponse authResponse(User user, HttpServletResponse response) {
        String jwt = jwtService.generateToken(user);
        setCookie(jwt, response);
        UserDto userDto = UserDto.fromUser(user);
        return AuthResponse.builder().token(jwt).user(userDto).build();
    }
}
