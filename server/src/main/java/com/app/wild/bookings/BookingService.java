package com.app.wild.bookings;

import java.util.List;
import java.util.Optional;

public interface BookingService {
    Booking save(Booking entity);


    List<Booking> findAll();

    void delete(Booking entity);

    Optional<Booking> findById(Integer id);
}

