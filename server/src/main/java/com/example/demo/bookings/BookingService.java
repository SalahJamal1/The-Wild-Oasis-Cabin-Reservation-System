package com.example.demo.bookings;

import com.example.demo.contracts.GenricServices;
import org.springframework.stereotype.Service;

import java.util.List;

@Service

public class BookingService extends GenricServices<Booking, Integer> {
    private final BookingRepository repository;

    public BookingService(BookingRepository _bookingRepository) {

        super(_bookingRepository);
        repository = _bookingRepository;
    }


    public List<Booking> findBookingByUserId(Integer userId) {
        return repository.findBookingByUserId(userId);
    }

}
