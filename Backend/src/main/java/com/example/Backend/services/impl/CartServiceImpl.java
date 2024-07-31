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
    private CartItemService cartItemService;


    @Override
    public List<CartDto> addProductToCart(CartDto cartDto, int userId) {

        User existingUser = getCurrentUser( userRepo, userId);
        CartItem currentCartItem = cartItemService.createItemForCart(cartDto);
        Cart userCart = setProductInUserCart(existingUser,currentCartItem,cartDto);
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
        // cart total to be update on delete product
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

        Cart cart = cartRepo.findById(existingUserCart.getId())
                .orElseThrow(() -> new RuntimeException("Cart not found"));

        cartItemRepo.deleteAll(cart.getCartItems());
        cart.getCartItems().clear();
        cart.setCartTotal(0.0);
        cartRepo.save(cart);
         return "Cart cleared";
    }

    private Cart setProductInUserCart(User existingUser, CartItem currentCartItem,CartDto cartDto){
        List<CartItem> cartItems = new ArrayList<>();
        Cart userCart= existingUser.getCart();
        if(userCart!=null){
            cartItems = userCart.getCartItems();

        }

        double itemPrice= currentCartItem.getCartProduct().getPrice() * currentCartItem.getCartItemQuantity();

        if(userCart!=null){

            boolean flag = false;
            /* Updating quantity if same product is added to userCart*/
            for(CartItem c: cartItems) {
                if(c.getCartProduct().getProductId() == cartDto.getProductId()) {
                    c.setCartItemQuantity(c.getCartItemQuantity() + cartDto.getQuantity());
                    userCart.setCartTotal(userCart.getCartTotal() + itemPrice);
                    flag = true;
                }
            }
            /* Adding new product to cart*/
            if(!flag) {
                cartItems.add(currentCartItem);
                userCart.setCartTotal(userCart.getCartTotal() +itemPrice);
            }

        }else{
            /* When New user enters or Existing user with cart id and no CartItems! */
            userCart = new Cart();
            userCart.setCartTotal(itemPrice);
            cartItems.add(currentCartItem);
        }

        userCart.setCartItems(cartItems);
        userCart.setUser(existingUser);
        currentCartItem.setCart(userCart);
        return userCart;
    }

    @Override
    public Double getCartTotal(int userId){
        User existingUser = getCurrentUser( userRepo, userId);
        if(existingUser.getCart() != null) {

            Integer cartId = existingUser.getCart().getId();
            Optional<Cart> optCart = cartRepo.findById(cartId);
            Cart userCart = optCart.get();
            return userCart.getCartTotal();

        }else{
            return 0.0;
        }

    }



}