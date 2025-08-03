package com.app.wild.cabins;

import com.app.wild.contracts.GenericService;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service

public class CabinImpService extends GenericService<Cabin,Integer> {
    @Autowired
public CabinImpService(CabinRepository cabinRepository){
        super(cabinRepository);
    }

}
