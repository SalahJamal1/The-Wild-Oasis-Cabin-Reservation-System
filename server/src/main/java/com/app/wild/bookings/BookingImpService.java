package com.app.wild.bookings;

import jakarta.persistence.EntityManager;
import jakarta.persistence.TypedQuery;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class BookingImpService implements BookingService {
    private final BookingRepository repository;
    private final EntityManager entityManager;

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

    @Override
    public List<Booking> findBookingByUserId(Integer id) {
        TypedQuery<Booking> query = entityManager.createQuery("SELECT b FROM Booking b JOIN b.user u WHERE u.id= :id", Booking.class);
        query.setParameter("id", id);

        return query.getResultList();
    }
}
