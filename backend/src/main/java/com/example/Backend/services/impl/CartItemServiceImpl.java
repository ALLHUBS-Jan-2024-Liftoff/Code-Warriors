package com.example.Backend.services.impl;

import com.example.Backend.Dto.CartDto;
import com.example.Backend.entity.CartItem;
import com.example.Backend.entity.Product;
import com.example.Backend.entity.ProductStatus;
import com.example.Backend.repositories.ProductRepo;
import com.example.Backend.services.CartItemService;
import com.example.Backend.services.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.crossstore.ChangeSetPersister;

public class CartItemServiceImpl implements CartItemService {

    @Autowired
    ProductRepo productRepo;

    @Override
    public CartItem createItemForCart(CartDto cartDto) {

        Product existingProduct = productRepo.findById(cartDto.getProductId()).orElseThrow( ()
                -> new RuntimeException("Product Not found"));

        if(existingProduct.getStatus().equals(ProductStatus.OUTOFSTOCK) || existingProduct.getQuantity() == 0) {
            throw new RuntimeException("Product OUT OF STOCK");
        }

        CartItem newItem = new CartItem();

        newItem.setCartItemQuantity(1);

        newItem.setCartProduct(existingProduct);

        return newItem;
    }



}
