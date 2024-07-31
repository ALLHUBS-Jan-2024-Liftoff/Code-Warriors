package com.example.Backend.services;

import com.example.Backend.entity.Cart;
import com.example.Backend.entity.UserOrder;

import java.util.Optional;


public interface OrderService {

    UserOrder createOrder(int userId, Cart cart);

    Optional<UserOrder> getOrder(int id);
}
