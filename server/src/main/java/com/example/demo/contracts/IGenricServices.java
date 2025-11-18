package com.example.demo.contracts;

import java.util.List;

public interface IGenricServices<T, ID> {

    void delete(ID id);

    T save(T entity);

    T findById(ID id);

    List<T> findAll();

}
