package com.app.wild.config;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

@Service
public class JwtService {
    private final String secretKey = "rpOeUA6M0FPqxedgdV5BxXfNT8luffR6u2GLJmOVnGk=";

    public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    public boolean isTokenValid(String token, UserDetails userDetails) {
        var username = extractUsername(token);
        return username.equals(userDetails.getUsername()) && extractClaim(token, Claims::getExpiration).after(new Date());
    }

    public <T> T extractClaim(String token, Function<Claims, T> claimsFunction) {
        Claims claims = extractClaims(token);
        return claimsFunction.apply(claims);
    }

    public Claims extractClaims(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(getSecretKey()).build()
                .parseClaimsJws(token)
                .getBody();

    }

    public String generateToken(UserDetails userDetails) {
        return generateToken(new HashMap<>(), userDetails);
    }

    public String generateToken(Map<String, Object> claims, UserDetails userDetails) {
        return Jwts.builder()
                .signWith(getSecretKey(), SignatureAlgorithm.HS256)
                .setClaims(claims)
                .setSubject(userDetails.getUsername())
                .setIssuedAt(
                        new Date(System.currentTimeMillis())
                ).setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 24)).compact();
    }

    public Key getSecretKey() {
        byte[] key = Decoders.BASE64.decode(secretKey);
        return Keys.hmacShaKeyFor(key);
    }
}
