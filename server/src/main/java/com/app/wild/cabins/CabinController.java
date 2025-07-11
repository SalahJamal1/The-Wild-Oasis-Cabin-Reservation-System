package com.app.wild.cabins;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/cabins")
@RequiredArgsConstructor
public class CabinController {
    private final CabinImpService service;
    private final CabinMapper mapper;

    @GetMapping
    public List<Cabin> cabins() {
        return service.findAll();
    }

    @GetMapping("{cabinId}")
    public Cabin cabin(@PathVariable Integer cabinId) {
        return service.findById(cabinId).orElseThrow(() -> new RuntimeException("we can not found the id"));
    }

    @DeleteMapping("{cabinId}")
    public String deleteCabin(@PathVariable Integer cabinId) {
        Cabin cabin = service.findById(cabinId).orElseThrow(() -> new RuntimeException("we can not found the id"));
        service.delete(cabin);
        return "the entity deleted " + cabinId;
    }

    @PatchMapping("{cabinId}")
    public Cabin updateCabin(@PathVariable Integer cabinId, @RequestBody Cabin entity) {
        Cabin cabin = service.findById(cabinId).orElseThrow(() -> new RuntimeException("we can not found the id"));
        mapper.updateCabin(entity, cabin);
        return service.save(cabin);
    }

    @PostMapping
    public Cabin createBooking(@RequestBody Cabin cabin) {
        return service.save(cabin);
    }
}
