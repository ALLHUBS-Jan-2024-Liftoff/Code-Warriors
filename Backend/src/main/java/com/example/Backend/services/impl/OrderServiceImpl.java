package com.example.Backend.services.impl;

import com.example.Backend.entity.*;
import com.example.Backend.repositories.OrderRepo;
import com.example.Backend.repositories.UserRepo;
import com.example.Backend.services.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class OrderServiceImpl implements OrderService {

    @Autowired
    private OrderRepo orderRepo;


    @Autowired
    private UserRepo userRepo;

    @Override
    public UserOrder createOrder(int userId, Cart cart) {

        User user = userRepo.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));

        UserOrder order = new UserOrder();
        order.setUser(user);


        for (CartItem cartItem : cart.getCartItems()) {
            OrderItem orderItem = new OrderItem();
            orderItem.setOrder(order);
            orderItem.setProduct(cartItem.getCartProduct());
            orderItem.setQuantity(cartItem.getCartItemQuantity());
            orderItem.setPrice(cartItem.getCartProduct().getPrice() * cartItem.getCartItemQuantity());
            order.getOrderItems().add(orderItem);

        }

        order.setTotal(cart.getCartTotal());
        order.setOrderStatus("NEW");

        return orderRepo.save(order);
    }

    @Override
    public Optional<UserOrder> getOrder(int id) {
        return orderRepo.findById(id);
    }

}
