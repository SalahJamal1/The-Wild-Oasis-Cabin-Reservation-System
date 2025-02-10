package com.app.wild.bookings;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class BookingImpService implements BookingService {
    private final BookingRepository repository;

    @Transactional
    @Override
    public Booking save(Booking entity) {
        return repository.save(entity);
    }

    @Override
    public List<Booking> findAll() {
        return repository.findAll();
    }

    @Transactional
    @Override
    public void delete(Booking entity) {
        repository.delete(entity);

    }

    @Override
    public Optional<Booking> findById(Integer id) {
        return Optional.of(repository.findById(id)).orElseThrow();
    }
}
