package com.example.demo.auth;

import jakarta.validation.constraints.AssertTrue;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AuthRegister {
    @Email
    @NotBlank(message = "The Email is required")
    private String email;
    @NotBlank(message = "The First Name is required")
    private String firstName;
    @NotBlank(message = "The Last Name is required")
    private String lastName;
    @NotBlank(message = "The Password is required")
    private String password;
    @NotBlank(message = "please confirm Password")
    private String confirmPassword;

    @AssertTrue(message = "password doesn't match")
    public boolean isPasswordMatch() {
        return password.equals(confirmPassword);
    }
}
