package com.example.demo.cabins;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/cabins")
@RequiredArgsConstructor
public class CabinController {
    private final CabinService service;

    @GetMapping
    public List<Cabin> GetAllCabin() {
        return service.findAll();
    }

    @GetMapping("{id}")
    public Cabin GetCabin(@PathVariable Integer id) {
        return service.findById(id);
    }

    @GetMapping("/test")
    public Map<String, String> test() {
        Map<String, String> map = new HashMap<>();
        map.put("message", "Hello World");
        return map;
    }


}
