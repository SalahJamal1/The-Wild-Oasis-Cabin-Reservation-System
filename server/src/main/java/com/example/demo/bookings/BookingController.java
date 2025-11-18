package com.example.demo.bookings;

import com.example.demo.bookings.dto.BookingDto;
import com.example.demo.mapperConfig.MapperConfig;
import com.example.demo.user.User;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping("/api/v1/bookings")
@RequiredArgsConstructor
public class BookingController {
    private final BookingService service;
    private final MapperConfig mapperConfig;

    @GetMapping
    public List<BookingDto> GetAll(@AuthenticationPrincipal User user) {
        if (user == null) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "you are not logged in");
        }
        var booking = service.findBookingByUserId(user.getId());
        return mapperConfig.toBookingDto(booking);

    }
}
