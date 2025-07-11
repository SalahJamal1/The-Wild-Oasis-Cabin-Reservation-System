package com.app.wild.bookings;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class BookingImpService {
    private final BookingRepository repository;

    @Transactional
    public Booking save(Booking entity) {
        return repository.save(entity);
    }


    public List<Booking> findAll() {
        return repository.findAll();
    }

    @Transactional

    public void delete(Booking entity) {
        repository.delete(entity);

    }


    public Optional<Booking> findById(Integer id) {
        return Optional.of(repository.findById(id)).orElseThrow();
    }

    public List<Booking> findByUserId(Integer userId) {


        return repository.findByUserId(userId);
    }
}
