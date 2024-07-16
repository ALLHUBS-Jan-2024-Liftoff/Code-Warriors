package com.example.Backend.services;

import com.example.Backend.Dto.CartDto;
import com.example.Backend.entity.Cart;


public interface CartService {
    //add Product To Cart
     Cart addProductToCart(CartDto cartDto, int userId);

    Cart getCartProducts(int userId);

    Cart removeProductFromCart(CartDto cartDto, int userId);

     Cart clearCart(int userId);

}
