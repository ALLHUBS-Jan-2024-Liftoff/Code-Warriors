package com.example.Backend.services;

import com.example.Backend.dto.CartDto;
import com.example.Backend.entity.Cart;
import com.example.Backend.entity.CartItem;

import java.util.List;


public interface CartService {
    //add Product To Cart
    List<CartDto> addProductToCart(CartDto cartDto, int userId);

    List<CartDto> getCartProducts(int userId);

    List<CartDto> removeProductFromCart(int productId, int userId);

    String clearCart(int userId);

}
