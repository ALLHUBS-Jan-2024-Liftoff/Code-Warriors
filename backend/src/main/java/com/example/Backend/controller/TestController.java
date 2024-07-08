package com.example.Backend.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Arrays;
import java.util.List;

@RestController
@RequestMapping("/api")
public class TestController {

    @GetMapping("/testdata")
    public List<String> getTestData() {
        return Arrays.asList("FROM SPRINGBOOT!!!", "John", "Priya", "Nadya", "Dylan");
    }
}