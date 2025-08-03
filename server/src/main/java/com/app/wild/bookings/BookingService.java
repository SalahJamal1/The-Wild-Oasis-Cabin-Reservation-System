package com.app.wild.bookings;

import com.app.wild.contracts.GenericService;
import com.app.wild.contracts.IGenericService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface BookingService extends IGenericService<Booking,Integer> {

    public List<Booking> findByUserId(Integer userId);
}
