package com.example.demo.cabins;

import com.example.demo.contracts.GenricServices;
import org.springframework.stereotype.Service;

@Service
public class CabinService extends GenricServices<Cabin, Integer> {
    public CabinService(CabinRepository cabinRepository) {
        super(cabinRepository);
    }
}
