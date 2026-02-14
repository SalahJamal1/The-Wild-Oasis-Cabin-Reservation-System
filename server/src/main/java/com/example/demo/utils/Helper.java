package com.example.demo.utils;

import com.example.demo.token.Token;
import com.example.demo.token.TokenRepository;
import com.example.demo.user.User;
import com.fasterxml.jackson.databind.ObjectMapper;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;

import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.Arrays;
import java.util.LinkedHashMap;
import java.util.Map;
import java.util.UUID;

@Component
@RequiredArgsConstructor
public class Helper {
    private final ObjectMapper mapper = new ObjectMapper();
    private final TokenRepository tokenRepository;


    public void sendErrorResponse(HttpServletResponse response, int status, String message) throws IOException {
        response.setContentType("application/json");
        response.setStatus(status);
        Map<String, Object> map = new LinkedHashMap<>();
        map.put("status", status);
        map.put("message", message);
        mapper.writeValue(response.getWriter(), map);
    }

    public String getTokenFromCookie(HttpServletRequest request) {
        Cookie[] cookies = request.getCookies();
        if (cookies != null) {
            return Arrays.stream(cookies).filter(c -> c.getName()
                            .equals("jwt"))
                    .findFirst()
                    .map(Cookie::getValue)
                    .orElse(null);
        }

        return null;
    }

    public String getDeviceId(HttpServletRequest request) {
        if (request.getCookies() != null) {
            for (Cookie cookie : request.getCookies()) {
                if ("deviceId".equals(cookie.getName())) {
                    return cookie.getValue();
                }
            }
        }
        return null;
    }


    public String getOrCreateDeviceId(HttpServletRequest request, HttpServletResponse response) {
        var deviceId = getDeviceId(request);
        if (deviceId != null) return deviceId;
        String newDeviceId = UUID.randomUUID().toString();

        buildCookie(response, "deviceId", newDeviceId, 365);
        return newDeviceId;
    }

    public void buildCookie(HttpServletResponse response, String name, String value, int maxAge) {
        ResponseCookie cookie = ResponseCookie.from(name, value).
        httpOnly(true).
        secure(true).
        path("/").
                maxAge(60 * 60 * 24 * maxAge).sameSite("None")
                .build();
        response.addHeader(HttpHeaders.SET_COOKIE, cookie.toString());
    }

    public void saveUsertoken(String refreshToken, String accessToken, User user, String deviceId) {

        var token = Token.builder()
                .accessToken(accessToken)
                .refreshToken(refreshToken)
                .deviceId(deviceId)
                .user(user).build();
        tokenRepository.save(token);

    }

    public void revokeAllUserTokens(User user, String deviceId) {
        tokenRepository.UpdateAllValidTokenByUser(user.getId(), deviceId);
    }

}
