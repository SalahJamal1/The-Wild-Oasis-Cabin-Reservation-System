package com.example.demo.config;

import com.example.demo.token.TokenRepository;
import com.example.demo.utils.Helper;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Arrays;

@Slf4j
@Component
@RequiredArgsConstructor
public class JwtAuthFilter extends OncePerRequestFilter {
    private final JwtServices jwtServices;
    private final UserDetailsService userDetailsService;
    private final Helper helper;
    private final TokenRepository tokenRepository;

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain)
            throws ServletException, IOException {
        try {

            String jwt = getTokenFromHeader(request);
            if (jwt != null) {
                String username = jwtServices.extractUsername(jwt);
                if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {

                    UserDetails userDetails = userDetailsService.loadUserByUsername(username);
                    var isVaildToken = tokenRepository.findTokenByAccessToken(jwt)
                            .map(t -> !t.isExpired() && !t.isRevoked())
                            .orElse(false);
                    if (jwtServices.isTokenValid(jwt, userDetails) && isVaildToken) {
                        UsernamePasswordAuthenticationToken auth = new UsernamePasswordAuthenticationToken(
                                userDetails, null, userDetails.getAuthorities()
                        );
                        auth.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                        SecurityContextHolder.getContext().setAuthentication(auth);

                    }

                }

            }
        } catch (Exception e) {
            log.error("JWT authentication failed: {}", e.getMessage());
            helper.sendErrorResponse(response, HttpServletResponse.SC_UNAUTHORIZED,
                    "JWT authentication failed");
            return;

        }
        filterChain.doFilter(request, response);

    }

    public String getTokenFromHeader(HttpServletRequest request) {
        String auth = request.getHeader("Authorization");
        if (auth != null && auth.startsWith("Bearer ")) {
            return auth.substring(7);
        }


        return null;
    }


}
