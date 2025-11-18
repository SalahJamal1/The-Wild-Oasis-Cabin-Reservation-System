package com.example.demo.user.dto;

import com.example.demo.bookings.Booking;
import com.example.demo.user.Role;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserDto {
    private Integer id;
    private String email;
    private String firstName;
    private String lastName;
    private Role role;
}
