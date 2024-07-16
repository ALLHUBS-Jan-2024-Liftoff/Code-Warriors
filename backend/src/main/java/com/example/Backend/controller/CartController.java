package com.example.Backend.controller;

import com.example.Backend.Dto.CartDto;
import com.example.Backend.entity.Cart;
import com.example.Backend.services.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping("/cart")
public class CartController {

    @Autowired
    private CartService cartService;

    @PostMapping("/addProduct")
    public ResponseEntity<Cart> addProduct(@RequestBody CartDto cartDto,@RequestHeader("userId")int userId) {

        return new ResponseEntity<>(cartService.addProductToCart(cartDto,userId), HttpStatus.CREATED);
    }

    @GetMapping("/{userid}")
    public ResponseEntity<Cart> getCartProducts( @RequestHeader("userId") int userId) {

        return new ResponseEntity<>(cartService.getCartProducts(userId),HttpStatus.ACCEPTED);
    }


    @DeleteMapping("/product/{productId}")
    public ResponseEntity<Cart> removeProductFromCart( @RequestHeader("userId") int userId, @RequestBody CartDto cartDto ) {

        return new ResponseEntity<Cart>(cartService.removeProductFromCart(cartDto, userId),HttpStatus.OK);
    }

    @DeleteMapping("/clear")
    public ResponseEntity<Cart> clearCart( @RequestHeader("userId") int userId) {

        return new ResponseEntity<>(cartService.clearCart(userId), HttpStatus.ACCEPTED);
    }





}