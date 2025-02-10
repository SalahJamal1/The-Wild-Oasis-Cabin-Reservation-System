package com.app.wild.cabins;

import java.util.List;
import java.util.Optional;

public interface CabinService {
    Cabin save(Cabin entity);


    List<Cabin> findAll();

    void delete(Cabin entity);

    Optional<Cabin> findById(Integer id);
}

