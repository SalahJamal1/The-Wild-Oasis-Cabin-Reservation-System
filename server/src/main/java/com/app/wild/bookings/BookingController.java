package com.app.wild.bookings;

import com.app.wild.cabins.Cabin;
import com.app.wild.cabins.CabinImpService;
import com.app.wild.user.User;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import javax.naming.AuthenticationException;
import java.nio.file.AccessDeniedException;
import java.util.List;

@RestController
@RequestMapping("/api/v1/bookings")
@RequiredArgsConstructor
public class BookingController {
    private final BookingImpService service;
    private final CabinImpService cabinImpService;
    private final BookingMapper mapper;

    @GetMapping
    public List<Booking> Bookings() {
        return service.findAll();
    }

    @GetMapping("{bookingId}")
    public Booking Booking(@PathVariable Integer bookingId) {
        return service.findById(bookingId).orElseThrow(() -> new RuntimeException("we can not found the id"));
    }

    @GetMapping("/bookingindery")
    public List<Booking> Booking(@AuthenticationPrincipal User user) throws AuthenticationException, AccessDeniedException {
        if (user instanceof User) {

            return service.findByUserId(user.getId());
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
    public Booking updateBooking(@PathVariable Integer bookingId, @RequestBody Booking entity) {
        Booking booking = service.findById(bookingId).orElseThrow(() -> new RuntimeException("we can not found the id"));
        mapper.updateBooking(entity, booking);
        return service.save(booking);
    }

    @PostMapping("{cabinId}")
    public Booking createBooking(@AuthenticationPrincipal User user, @RequestBody Booking booking, @PathVariable Integer cabinId) {
        Cabin cabin = cabinImpService.findById(cabinId).orElseThrow(() -> new RuntimeException("we can not found the id"));
        if (user == null) {
            throw new RuntimeException("Your are not authenticated");
        }
        booking.setCabin(cabin);
        booking.setUser(user);
        return service.save(booking);
    }
}
