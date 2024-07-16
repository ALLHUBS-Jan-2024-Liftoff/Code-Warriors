package com.example.Backend.services.impl;

import com.example.Backend.Dto.CartDto;
import com.example.Backend.entity.Cart;
import com.example.Backend.entity.CartItem;
import com.example.Backend.entity.User;
import com.example.Backend.repositories.CartRepo;
import com.example.Backend.repositories.UserRepo;
import com.example.Backend.services.CartItemService;
import com.example.Backend.services.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class CartServiceImpl implements CartService {

    @Autowired
    private CartRepo cartRepo;

    @Autowired
    private UserRepo userRepo;

    @Autowired
    private CartItemService cartItemService;


    @Override
    public Cart addProductToCart(CartDto cartDto, int userId) {

        Optional<User> user = userRepo.findById(userId);

        if(user.isEmpty())
            throw new UsernameNotFoundException("User does not exist");

        User existingUser = user.get();

        Cart userCart = existingUser.getCart();

        List<CartItem> cartItems = userCart.getCartItems();

        CartItem item = cartItemService.createItemForCart(cartDto);


        if(cartItems.isEmpty()) {
            cartItems.add(item);
            userCart.setCartTotal(item.getCartProduct().getPrice());
        }else {
            boolean flag = false;
            for(CartItem c: cartItems) {
                if(c.getCartProduct().getProductId() == cartDto.getProductId()) {
                    c.setCartItemQuantity(c.getCartItemQuantity() + 1);
                    userCart.setCartTotal(userCart.getCartTotal() + c.getCartProduct().getPrice());
                    flag = true;
                }
            }
            if(!flag) {
                cartItems.add(item);
                userCart.setCartTotal(userCart.getCartTotal() + item.getCartProduct().getPrice());
            }
        }
        userCart.setCartItems(cartItems);
        existingUser.setCart(userCart);
        return cartRepo.save(existingUser.getCart());
    }


    @Override
    public Cart getCartProducts(int userId) {

        Optional<User> user = userRepo.findById(userId);

        if(user.isEmpty())
            throw new UsernameNotFoundException("User does not exist");

        User existingUser = user.get();

        Integer cartId = existingUser.getCart().getCartId();


        Optional<Cart> optCart= cartRepo.findById(cartId);

        if(optCart.isEmpty()) {
            throw new RuntimeException("Cart Not found by Id");
        }
        return optCart.get();

    }


    @Override
    public Cart removeProductFromCart(CartDto cartDto, int userId) {

        Optional<User> user = userRepo.findById(userId);

        if(user.isEmpty())
            throw new UsernameNotFoundException("User does not exist");

        User existingUser = user.get();

        Cart existingUserCart = existingUser.getCart();

        List<CartItem> cartItems = existingUserCart.getCartItems();

        if(cartItems.isEmpty()) {
            throw new RuntimeException("Cart is empty");
        }


        boolean flag = false;

        for(CartItem c: cartItems) {

            if(c.getCartProduct().getProductId() == cartDto.getProductId()) {
                c.setCartItemQuantity(c.getCartItemQuantity() - 1);

                existingUserCart.setCartTotal(existingUserCart.getCartTotal() - c.getCartProduct().getPrice());
                if(c.getCartItemQuantity() == 0) {

                    cartItems.remove(c);
                    return cartRepo.save(existingUserCart);
                }
                flag = true;
            }
        }

        if(!flag) {
            throw new RuntimeException("Product not available in cart");
        }

        if(cartItems.isEmpty()) {
            cartRepo.save(existingUserCart);
            throw new RuntimeException("Cart is empty now");
        }

        return cartRepo.save(existingUserCart);
    }


    @Override
    public Cart clearCart(int userId) {

        Optional<User> user = userRepo.findById(userId);

        if(user.isEmpty())
            throw new UsernameNotFoundException("User does not exist");

        User existingUser = user.get();

        Cart existingUserCart = existingUser.getCart();

        if(existingUserCart.getCartItems().isEmpty()) {
            throw new RuntimeException("Cart already empty");
        }

        List<CartItem> emptyCart = new ArrayList<>();

        existingUserCart.setCartItems(emptyCart);

        existingUserCart.setCartTotal(0.0);

        return cartRepo.save(existingUserCart);
    }



}