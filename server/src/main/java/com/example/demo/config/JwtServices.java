package com.example.demo.config;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.util.*;
import java.util.function.Function;

@Service
public class JwtServices {
    @Value("${jwt.secretKey}")
    private String secretKey;
    @Value("${jwt.refreshExpire}")
    private long refreshExpire;
    @Value("${jwt.expire}")
    private long expire;

    public String extractUsername(String token) {
        return extractClaims(token, Claims::getSubject);
    }

    public boolean isTokenValid(String token, UserDetails userDetails) {
        String username = extractUsername(token);
        return (username.equals(userDetails.getUsername())) && !isTokenExpired(token);
    }

    public boolean isTokenExpired(String token) {
        Date expiration = extractClaims(token, Claims::getExpiration);
        return expiration.before(new Date());
    }

    public <T> T extractClaims(String token, Function<Claims, T> claimsTFunction) {
        Claims claims = getClaimsFromToken(token);
        return claimsTFunction.apply(claims);
    }

    public Claims getClaimsFromToken(String token) {
        try {

            return Jwts.parserBuilder()
                    .setSigningKey(signingKey())
                    .build()
                    .parseClaimsJws(token).getBody();
        } catch (Exception e) {
            throw new RuntimeException("Invalid JWT Token", e);
        }
    }

    public String generateToken(UserDetails userDetails) {
        return generateToken(userDetails, new HashMap<>());
    }

    public String generateToken(UserDetails userDetails, Map<String, Object> claims) {
        return buildToken(userDetails, claims, expire);
    }

    public String generateRefreshToken(UserDetails userDetails) {
        return buildToken(userDetails, new HashMap<>(), refreshExpire);
    }

    private String buildToken(UserDetails userDetails, Map<String, Object> claims, long expiration) {

        claims.put("jti", UUID.randomUUID().toString());
        return Jwts.builder()
                .signWith(signingKey(), SignatureAlgorithm.HS256)
                .setClaims(claims)
                .setSubject(userDetails.getUsername())
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + expiration))
                .compact();
    }

    private Key signingKey() {
        byte[] keys = Base64.getDecoder().decode(secretKey);
        return Keys.hmacShaKeyFor(keys);

    }
}
