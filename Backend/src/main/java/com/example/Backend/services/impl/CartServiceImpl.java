package com.example.Backend.services.impl;

import com.example.Backend.dto.CartDto;
import com.example.Backend.entity.Cart;
import com.example.Backend.entity.CartItem;
import com.example.Backend.entity.User;
import com.example.Backend.repositories.CartRepo;
import com.example.Backend.repositories.UserRepo;
import com.example.Backend.services.CartItemService;
import com.example.Backend.services.CartService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
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
    private ModelMapper modelMapper;

    @Autowired
    private CartItemService cartItemService;


    @Override
    public List<CartDto> addProductToCart(CartDto cartDto, int userId) {

        Optional<User> user = userRepo.findById(userId);

        if(user.isEmpty())
            throw new RuntimeException("User does not exist");

        User existingUser = user.get();

        Cart userCart = existingUser.getCart();
        List<CartItem> cartItems = new ArrayList<>();
        if(userCart!=null){
            cartItems = userCart.getCartItems();

        }

        CartItem item = cartItemService.createItemForCart(cartDto);
        double itemPrice= item.getCartProduct().getPrice() * item.getCartItemQuantity();


        if(cartItems.isEmpty()) {

            userCart = new Cart();
            userCart.setCartTotal(itemPrice);
            cartItems.add(item);

        }else {
            boolean flag = false;
            for(CartItem c: cartItems) {
                if(c.getCartProduct().getProductId() == cartDto.getProductId()) {
                    c.setCartItemQuantity(c.getCartItemQuantity() + 1);
                    userCart.setCartTotal(userCart.getCartTotal() + itemPrice);
                    flag = true;
                }
            }
            if(!flag) {
                cartItems.add(item);

                userCart.setCartTotal(userCart.getCartTotal() +itemPrice);
            }
        }
        userCart.setCartItems(cartItems);
        userCart.setUser(existingUser);
        item.setCart(userCart);
        Cart cart = cartRepo.save(userCart);

        return getCartDtos(cart);
    }


    @Override
    public List<CartDto> getCartProducts(int userId) {

        Optional<User> user = userRepo.findById(userId);

        if(user.isEmpty())
            throw new RuntimeException("User does not exist");

        User existingUser = user.get();

        if(existingUser.getCart() != null){
            Integer cartId = existingUser.getCart().getCartId();
            Optional<Cart> optCart= cartRepo.findById(cartId);

            if(optCart.isEmpty()) {
                throw new RuntimeException("Cart Not found by Id");
            }

            Cart cart = optCart.get();

            return getCartDtos(cart);


        }else{
            return new ArrayList<>();
        }
    }

    private static List<CartDto> getCartDtos(Cart cart) {
        List<CartDto> cartList = new ArrayList<>();

        for (CartItem cartItem: cart.getCartItems()){
            CartDto cartDto1 = new CartDto();
            cartDto1.setProductId(cartItem.getCartProduct().getProductId());
            //double itemPrice = cartItem.getCartProduct().getPrice() * cartItem.getCartItemQuantity();
            cartDto1.setPrice( cartItem.getCartProduct().getPrice());
            cartDto1.setQuantity(cartItem.getCartItemQuantity());
            cartDto1.setProductName(cartItem.getCartProduct().getProductName());
            cartList.add(cartDto1);

        }
        return cartList;
    }


    @Override
    public List<CartDto> removeProductFromCart(int productId, int userId) {

        Optional<User> user = userRepo.findById(userId);

        if(user.isEmpty())
            throw new RuntimeException("User does not exist");

        User existingUser = user.get();

        Cart existingUserCart = existingUser.getCart();

        List<CartItem> cartItems = existingUserCart.getCartItems();

        if(cartItems.isEmpty()) {
            throw new RuntimeException("Cart is empty");
        }


        boolean flag = false;

        for(CartItem c: cartItems) {

            if(c.getCartProduct().getProductId() == productId) {
                c.setCartItemQuantity(c.getCartItemQuantity() - 1);

                existingUserCart.setCartTotal(existingUserCart.getCartTotal() - c.getCartProduct().getPrice());
                if(c.getCartItemQuantity() == 0) {

                    cartItems.remove(c);
                    Cart optCart=cartRepo.save(existingUserCart);
                    return getCartDtos(optCart);
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

        Cart optCart=cartRepo.save(existingUserCart);
        return getCartDtos(optCart);

    }


    @Override
    public String clearCart(int userId) {

        Optional<User> user = userRepo.findById(userId);

        if(user.isEmpty())
            throw new RuntimeException("User does not exist");

        User existingUser = user.get();

        Cart existingUserCart = existingUser.getCart();

        if(existingUserCart.getCartItems().isEmpty()) {
            throw new RuntimeException("Cart already empty");
        }

        List<CartItem> emptyCart = new ArrayList<>();

        existingUserCart.setCartItems(emptyCart);

        existingUserCart.setCartTotal(0.0);

         cartRepo.save(existingUserCart);
         return "Cart cleared";
    }



}