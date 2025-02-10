package com.app.wild.bookings;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

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
        System.out.println("salah");
        return service.save(booking);
    }
}
