package com.example.Backend.controller;

import com.example.Backend.dto.CartDto;
import com.example.Backend.dto.QuantityUpdateDto;
import com.example.Backend.entity.Cart;
import com.example.Backend.entity.CartItem;
import com.example.Backend.services.CartItemService;
import com.example.Backend.services.CartService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/cart")
public class CartController {

    @Autowired
    private CartService cartService;

    @Autowired
    private CartItemService cartItemService;

    @PostMapping("/addProduct")
    public ResponseEntity <List<CartDto>> addProductToCart(@RequestBody CartDto cartDto, HttpServletRequest request) {
        int userId = (int) request.getAttribute("userId");
        return new ResponseEntity<>(cartService.addProductToCart(cartDto,userId), HttpStatus.CREATED);
    }

    @GetMapping("/userCart")
    public ResponseEntity<List<CartDto>> getCartProducts(HttpServletRequest request) {
        int userId = (int) request.getAttribute("userId");
        return new ResponseEntity<>(cartService.getCartProducts(userId),HttpStatus.ACCEPTED);
    }


    @DeleteMapping("/delete/{productId}")
    public ResponseEntity<List<CartDto>> removeProductFromCart(HttpServletRequest request, @PathVariable("productId") int productId) {
        int userId = (int) request.getAttribute("userId");
        return new ResponseEntity<>(cartService.removeProductFromCart(productId, userId),HttpStatus.OK);
    }

    @DeleteMapping("/clear")
    public ResponseEntity<String> clearCart(HttpServletRequest request) {
        int userId = (int) request.getAttribute("userId");
        return new ResponseEntity<>(cartService.clearCart(userId), HttpStatus.ACCEPTED);
    }

    @GetMapping("/total")
    public ResponseEntity<Double> getCartTotal(HttpServletRequest request) {
        int userId = (int) request.getAttribute("userId");
        return new ResponseEntity<>(cartService.getCartTotal(userId),HttpStatus.ACCEPTED);
    }

    @PutMapping("/updateQuantity/{productId}")
    public ResponseEntity<String> updateCartItemQuantity(HttpServletRequest request, @PathVariable("productId") int productId, @RequestBody QuantityUpdateDto quantityUpdateDto) {
        int userId = (int) request.getAttribute("userId");
        return new ResponseEntity<>(cartItemService.updateCartItemQuantity(userId,productId, quantityUpdateDto.getQuantity()),HttpStatus.ACCEPTED);
    }


}