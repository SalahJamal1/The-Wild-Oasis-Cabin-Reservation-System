package com.app.wild.bookings;

import com.app.wild.user.User;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import javax.naming.AuthenticationException;
import java.nio.file.AccessDeniedException;
import java.util.List;

@RestController
@RequestMapping("/api/v1/bookings")
@RequiredArgsConstructor
public class BookingController {
    private final BookingService service;

    @GetMapping
    public List<Booking> Bookings() {
        return service.findAll();
    }

    @GetMapping("{bookingId}")
    public Booking Booking(@PathVariable Integer bookingId) {
        return service.findById(bookingId).orElseThrow(() -> new RuntimeException("we can not found the id"));
    }

    @GetMapping("/bookingindery")
    public List<Booking> Booking() throws AuthenticationException, AccessDeniedException {
        Object user = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (user instanceof User) {

            return service.findBookingByUserId(((User) user).getId());
        } else {
            throw new RuntimeException("Your are not authenticated");
        }
    }

    @DeleteMapping("{bookingId}")
    public String deleteBooking(@PathVariable Integer bookingId) {
        Booking booking = service.findById(bookingId).orElseThrow(() -> new RuntimeException("we can not found the id"));
        service.delete(booking);
        return "the entity deleted " + bookingId;
    }

    @PatchMapping("{bookingId}")
    public Booking updateBooking(@PathVariable Integer bookingId, @RequestBody Booking booking1) {
        Booking booking = service.findById(bookingId).orElseThrow(() -> new RuntimeException("we can not found the id"));
        booking1.setId(bookingId);
        booking1.setCreatedAt(booking.getCreatedAt());
        booking = booking1;
        return service.save(booking);
    }

    @PostMapping
    public Booking createBooking(@RequestBody Booking booking) {
        return service.save(booking);
    }
}
