package com.app.wild.guests;

import java.util.List;
import java.util.Optional;

public interface GuestService {
    Guest save(Guest entity);


    List<Guest> findAll();

    void delete(Guest entity);

    Optional<Guest> findById(Integer id);
}

