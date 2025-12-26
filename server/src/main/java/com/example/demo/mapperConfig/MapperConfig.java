package com.example.demo.mapperConfig;


import com.example.demo.auth.AuthRegister;
import com.example.demo.bookings.Booking;
import com.example.demo.bookings.dto.BookingDto;
import com.example.demo.user.User;
import com.example.demo.user.dto.UserDto;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring")
public interface MapperConfig {

    UserDto toUserDto(User user);

    User toUser(AuthRegister authRegister);


    @Mapping(source = "isPaid",target = "isPaid")
    List<BookingDto> toBookingDto(List<Booking> booking);


}
