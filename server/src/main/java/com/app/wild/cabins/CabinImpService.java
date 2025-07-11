package com.app.wild.cabins;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CabinImpService {
    private final CabinRepository repository;

    @Transactional
    public Cabin save(Cabin entity) {
        return repository.save(entity);
    }


    public List<Cabin> findAll() {
        return repository.findAll();
    }

    @Transactional
    public void delete(Cabin entity) {
        repository.delete(entity);

    }


    public Optional<Cabin> findById(Integer id) {
        return Optional.of(repository.findById(id)).orElseThrow();
    }
}
