package com.app.wild.guests;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/guests")
@RequiredArgsConstructor
public class GuestController {
    private final GuestService service;

    @GetMapping
    public List<Guest> Guests() {
        return service.findAll();
    }

    @GetMapping("{GuestId}")
    public Guest Guest(@PathVariable Integer GuestId) {
        return service.findById(GuestId).orElseThrow(() -> new RuntimeException("we can not found the id"));
    }

    @DeleteMapping("{GuestId}")
    public String deleteGuest(@PathVariable Integer GuestId) {
        Guest Guest = service.findById(GuestId).orElseThrow(() -> new RuntimeException("we can not found the id"));
        service.delete(Guest);
        return "the entity deleted " + GuestId;
    }

    @PatchMapping("{GuestId}")
    public Guest updateGuest(@PathVariable Integer GuestId, @RequestBody Guest Guest1) {
        Guest Guest = service.findById(GuestId).orElseThrow(() -> new RuntimeException("we can not found the id"));
        Guest1.setId(GuestId);
        Guest = Guest1;
        return service.save(Guest);
    }

    @PostMapping
    public Guest createGuest(@RequestBody Guest Guest) {
        System.out.println("salah");
        return service.save(Guest);
    }
}
