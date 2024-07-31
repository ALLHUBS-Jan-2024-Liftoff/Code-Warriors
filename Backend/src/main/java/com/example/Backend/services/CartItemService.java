package com.example.Backend.services;

import com.example.Backend.dto.CartDto;
import com.example.Backend.entity.CartItem;

public interface CartItemService {
    public CartItem createItemForCart(CartDto cartdto);

    public String updateCartItemQuantity(int userId, int productId,int quantity);
}
