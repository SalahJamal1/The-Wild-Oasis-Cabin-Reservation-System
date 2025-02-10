package com.app.wild.guests;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class GuestImpService implements GuestService {
    private final GuestRepository repository;

    @Transactional
    @Override
    public Guest save(Guest entity) {
        return repository.save(entity);
    }

    @Override
    public List<Guest> findAll() {
        return repository.findAll();
    }

    @Transactional
    @Override
    public void delete(Guest entity) {
        repository.delete(entity);

    }

    @Override
    public Optional<Guest> findById(Integer id) {
        return Optional.of(repository.findById(id)).orElseThrow();
    }
}
