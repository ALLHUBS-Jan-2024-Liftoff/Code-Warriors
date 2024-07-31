package com.example.Backend.controller;

import com.example.Backend.entity.Cart;
import com.example.Backend.entity.UserOrder;
import com.example.Backend.services.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/orders")
public class OrderController {
    @Autowired
    private OrderService orderService;

    @PostMapping("/{userId}")
    public UserOrder createOrder(@PathVariable("userId") int userId, @RequestBody Cart cart) {
        return orderService.createOrder(userId,cart);
    }

    @GetMapping("/{id}")
    public Optional<UserOrder> getOrder(@PathVariable int id) {
        return orderService.getOrder(id);
    }
}
