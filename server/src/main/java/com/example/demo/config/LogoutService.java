package com.example.demo.config;

import com.example.demo.token.TokenRepository;
import com.example.demo.utils.Helper;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.logout.LogoutHandler;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
@RequiredArgsConstructor
public class LogoutService implements LogoutHandler {
    private final TokenRepository tokenRepository;
    private final Helper helper;

    @Override
    public void logout(HttpServletRequest request, HttpServletResponse response, Authentication authentication) {
        String jwt = helper.getTokenFromCookie(request);
        String deviceId = helper.getDeviceId(request);
        if (jwt != null && deviceId != null) {
            var token = tokenRepository.findByRefreshToken(jwt).orElse(null);
            if (token != null) {
                var user = token.getUser();
                tokenRepository.UpdateAllValidTokenByUser(user.getId(), deviceId);
                helper.buildCookie(response, "jwt", null, 0);
            }

            return;
        }
        throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "you are not logged in");
    }
}
