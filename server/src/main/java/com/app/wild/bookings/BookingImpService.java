package com.app.wild.bookings;

import com.app.wild.contracts.GenericService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BookingImpService extends GenericService<Booking, Integer> implements BookingService {
    public BookingImpService(BookingRepository repository) {
        super(repository);
    }

    @Override
    public List<Booking> findByUserId(Integer userId) {
        return ((BookingRepository) super.repository).findByUserId(userId);
    }
}
