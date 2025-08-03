package com.app.wild.contracts;

import lombok.RequiredArgsConstructor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
public class GenericService<T, ID> implements IGenericService<T, ID> {
    protected final JpaRepository<T, ID> repository;

    @Override
    @Transactional
    public T save(T entity) {
        return repository.save(entity);
    }

    @Override
    public List findAll() {
        return repository.findAll();
    }

    @Transactional
    @Override
    public void delete(T entity) {
        repository.delete(entity);

    }

    @Override
    public Optional<T> findById(ID id) {
        return repository.findById(id);
    }

}
