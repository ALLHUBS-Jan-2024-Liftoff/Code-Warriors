package com.example.Backend.services.impl;

import com.example.Backend.dto.CartDto;
import com.example.Backend.entity.Cart;
import com.example.Backend.entity.CartItem;
import com.example.Backend.entity.User;
import com.example.Backend.repositories.CartItemRepo;
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
    private CartItemRepo cartItemRepo;

    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private CartItemService cartItemService;


    @Override
    public List<CartDto> addProductToCart(CartDto cartDto, int userId) {
        List<CartItem> cartItems = new ArrayList<>();

        User existingUser = getCurrentUser( userRepo, userId);
        System.out.println("User Id+++++"+existingUser.getUserId());
        Cart userCart= existingUser.getCart();

        if(userCart!=null){
            cartItems = userCart.getCartItems();

        }

        CartItem currentCartItem = cartItemService.createItemForCart(cartDto);

        double itemPrice= currentCartItem.getCartProduct().getPrice() * currentCartItem.getCartItemQuantity();


        if(cartItems.isEmpty()) {

            System.out.println(":::::New User entry:::");
            userCart = new Cart();
            userCart.setCartTotal(itemPrice);
            System.out.println(":::::Cart Item Id:::"+currentCartItem.getCartItemId());
            cartItems.add(currentCartItem);

        }else {
            boolean flag = false;
            for(CartItem c: cartItems) {
                if(c.getCartProduct().getProductId() == cartDto.getProductId()) {
                    c.setCartItemQuantity(c.getCartItemQuantity() + cartDto.getQuantity());
                    userCart.setCartTotal(userCart.getCartTotal() + itemPrice);
                    flag = true;
                }
            }
            if(!flag) {
                cartItems.add(currentCartItem);

                userCart.setCartTotal(userCart.getCartTotal() +itemPrice);
            }
        }
        userCart.setCartItems(cartItems);
        userCart.setUser(existingUser);
        currentCartItem.setCart(userCart);
        Cart cart = cartRepo.save(userCart);

        return getCartDtoList(cart);
    }


    @Override
    public List<CartDto> getCartProducts(int userId) {

        User existingUser = getCurrentUser( userRepo, userId);

        if(existingUser.getCart() != null){
            Integer cartId = existingUser.getCart().getId();
            Optional<Cart> optCart= cartRepo.findById(cartId);

            if(optCart.isEmpty()) {
                throw new RuntimeException("Cart Not found by Id");
            }

            Cart cart = optCart.get();
            return getCartDtoList(cart);
        }else{
            return new ArrayList<>();
        }
    }

    private static List<CartDto> getCartDtoList(Cart cart) {
        List<CartDto> cartList = new ArrayList<>();

        for (CartItem cartItem: cart.getCartItems()){
            CartDto cartDto1 = new CartDto();
            cartDto1.setProductId(cartItem.getCartProduct().getProductId());
            cartDto1.setPrice( cartItem.getCartProduct().getPrice());
            cartDto1.setQuantity(cartItem.getCartItemQuantity());
            cartDto1.setProductName(cartItem.getCartProduct().getProductName());
            cartList.add(cartDto1);

        }
        return cartList;
    }


    @Override
    public List<CartDto> removeProductFromCart(int productId, int userId) {

        User existingUser = getCurrentUser( userRepo, userId);
        Cart existingUserCart = existingUser.getCart();
        if(existingUserCart  == null) {
            throw new RuntimeException("Cart is empty");
        }

        List<CartItem> cartItemsList = existingUserCart.getCartItems();
        if(cartItemsList.isEmpty()){
            throw new RuntimeException("Cart Item is empty");
        }

        for(CartItem cartItem: cartItemsList) {

            if(cartItem.getCartProduct().getProductId() == productId) {
                cartItemsList.remove(cartItem);
                existingUserCart.setCartItems(cartItemsList);
                cartItemRepo.deleteById(cartItem.getCartItemId());
                Cart optCart=cartRepo.save(updateCartTotal(existingUserCart, cartItem));
                return getCartDtoList(optCart);
            }
        }

        throw new RuntimeException("Product not available in cart");

    }

    private static Cart updateCartTotal(Cart existingUserCart, CartItem cartItem){
        // cartItem to be update or delete
       double cartItemTotal=  cartItem.getCartProduct().getPrice() * cartItem.getCartItemQuantity();

        existingUserCart.setCartTotal(existingUserCart.getCartTotal() - cartItemTotal);

        return existingUserCart;

    }


    private static User getCurrentUser(UserRepo userRepo, int userId){

        Optional<User> user = userRepo.findById(userId);

        if(user.isEmpty())
            throw new RuntimeException("User does not exist");

        return user.get();
    }

    @Override
    public String clearCart(int userId) {

        User existingUser = getCurrentUser( userRepo, userId);

        Cart existingUserCart = existingUser.getCart();

        if(existingUserCart.getCartItems().isEmpty()) {

            throw new RuntimeException("Cart already empty");

        }else{

            //cartRepo.deleteById(userId);
            cartRepo.deleteById(existingUserCart.getId());
        }

      // List<CartItem> emptyCart = new ArrayList<>();

        existingUserCart.setCartItems(null);

        existingUserCart.setCartTotal(0.0);

         cartRepo.save(existingUserCart);
         return "Cart cleared";
    }



}