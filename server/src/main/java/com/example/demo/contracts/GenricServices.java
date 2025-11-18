package com.example.demo.contracts;

import lombok.RequiredArgsConstructor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@RequiredArgsConstructor
public class GenricServices<T, ID> implements IGenricServices<T, ID> {
    private final JpaRepository<T, ID> repository;


    @Override
    @Transactional
    public void delete(ID id) {
        var entity = findById(id);
        repository.delete(entity);
    }

    @Override
    @Transactional
    public T save(T entity) {
        return repository.save(entity);
    }

    @Override
    public T findById(ID id) {
        return repository.findById(id).orElseThrow(() -> new RuntimeException("not found"));
    }

    @Override
    public List<T> findAll() {
        return repository.findAll();
    }
}
