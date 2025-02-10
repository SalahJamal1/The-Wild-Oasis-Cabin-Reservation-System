package com.app.wild.cabins;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CabinImpService implements CabinService {
    private final CabinRepository repository;

    @Override
    public Cabin save(Cabin entity) {
        return repository.save(entity);
    }

    @Override
    public List<Cabin> findAll() {
        return repository.findAll();
    }

    @Override
    public void delete(Cabin entity) {
        repository.delete(entity);

    }

    @Override
    public Optional<Cabin> findById(Integer id) {
        return Optional.of(repository.findById(id)).orElseThrow();
    }
}
