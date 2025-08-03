package com.app.wild.contracts;

import com.app.wild.cabins.Cabin;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

public interface IGenericService<T,ID>  {
     T save(T entity);
     List<T> findAll();
     void delete(T entity) ;
    Optional<T> findById(ID id);
}
