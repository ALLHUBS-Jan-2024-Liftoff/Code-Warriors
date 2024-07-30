package com.example.Backend.services.impl;

import com.example.Backend.dto.CartDto;
import com.example.Backend.entity.*;
import com.example.Backend.repositories.CartItemRepo;
import com.example.Backend.repositories.CartRepo;
import com.example.Backend.repositories.ProductRepo;
import com.example.Backend.repositories.UserRepo;
import com.example.Backend.services.CartItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Service
public class CartItemServiceImpl implements CartItemService {

    @Autowired
    ProductRepo productRepo;

    @Autowired
    CartRepo cartRepo;

    @Autowired
    UserRepo userRepo;

    @Override
    public CartItem createItemForCart(CartDto cartDto) {

        Product existingProduct = productRepo.findById(cartDto.getProductId()).orElseThrow( ()
                -> new RuntimeException("Product Not found"));

        if(existingProduct.getStatus().equals(ProductStatus.OUTOFSTOCK) || existingProduct.getQuantity() == 0) {
            throw new RuntimeException("Product OUT OF STOCK");
        }

        CartItem newItem = new CartItem();

        newItem.setCartItemQuantity(cartDto.getQuantity());

        newItem.setCartProduct(existingProduct);

        return newItem;
    }


    @Override
    public String updateCartItemQuantity(int userId, int productId, int quantity){
        Optional<User> user = userRepo.findById(userId);
        User currentUser = user.get();
        Cart userCart = currentUser.getCart();
        List<CartItem> cartItems =  userCart.getCartItems();
        double cartTotal = 0.0;

        for(CartItem c: cartItems) {
            if(c.getCartProduct().getProductId() == productId) {
                c.setCartItemQuantity(quantity);
            }
            cartTotal = cartTotal+ (c.getCartItemQuantity() * c.getCartProduct().getPrice());

        }

        userCart.setCartTotal(cartTotal);
        userCart.setCartItems(cartItems);
        userCart.setUser(currentUser);
        cartRepo.save(userCart);
        return "CartItem Updated";

    }



}
