package com.example.Backend.services.impl;

import com.example.Backend.dto.AddressDto;
import com.example.Backend.dto.OrderDetailsDto;
import com.example.Backend.dto.OrderDto;
import com.example.Backend.entity.*;
import com.example.Backend.repositories.AddressRepo;
import com.example.Backend.repositories.OrderRepo;
import com.example.Backend.repositories.UserRepo;
import com.example.Backend.services.OrderService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.*;

@Service
public class OrderServiceImpl implements OrderService {

    @Autowired
    private OrderRepo orderRepo;

    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private AddressRepo addressRepo;


    @Autowired
    private UserRepo userRepo;

    @Override
    public Integer createOrder(int userId) {

        User user = userRepo.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));

        UserOrder order = new UserOrder();
        order.setUser(user);
        Cart cart = user.getCart();
        if(cart != null){
            List<OrderItem> orderItemsList = new ArrayList<>();
            for (CartItem cartItem : cart.getCartItems()) {
                OrderItem orderItem = new OrderItem();
                orderItem.setOrder(order);
                orderItem.setProduct(cartItem.getCartProduct());
                orderItem.setQuantity(cartItem.getCartItemQuantity());
                orderItem.setPrice(cartItem.getCartProduct().getPrice());
                orderItemsList.add(orderItem);
            }
            order.setTotal(cart.getCartTotal());
            order.setOrderItems(orderItemsList);
        }

        orderRepo.save(order);

        return order.getId();
    }

    @Override
    public List<OrderDto> getOrder(int id) {
        Optional<UserOrder> userOrder = orderRepo.findById(id);
        UserOrder order = userOrder.get();
        return getOrderDtoList(order);
    }


    public static String generateOrderId() {
        String uuid = UUID.randomUUID().toString().replaceAll("-", "").toUpperCase();
        return "ORD-" + uuid.substring(0, 6); // e.g., ORD-1A2B3C
    }


    public static List<OrderDto> getOrderDtoList( UserOrder order){

        List<OrderDto> orderDtoList = new ArrayList<>();
        System.out.println("order items::::"+order.getOrderItems().size());

        for (OrderItem orderItem: order.getOrderItems()){
            OrderDto orderDto = new OrderDto();
           orderDto.setOrderId(order.getOrderId());
            orderDto.setPrice(orderItem.getPrice());
            orderDto.setQuantity(orderItem.getQuantity());
            orderDto.setProductName(orderItem.getProduct().getProductName());
            orderDto.setTotal(order.getTotal());
            orderDto.setOrderDate(order.getOrderDate());
            orderDtoList.add(orderDto);
        }

        return orderDtoList;
    }

    @Override
    public String updateAddressForOrder(AddressDto addressDto, int orderId) {

        Optional<UserOrder> userOrder = orderRepo.findById(orderId);
        UserOrder order = userOrder.get();
        OrderAddress orderAddress = new OrderAddress();
        orderAddress.setFullName(addressDto.getFullName());
        orderAddress.setAddressLine(addressDto.getAddressLine());
        orderAddress.setCity(addressDto.getCity());
        orderAddress.setState(addressDto.getState());
        orderAddress.setZipCode(addressDto.getZipCode());
        orderAddress.setCountry(addressDto.getCountry());

        order.setOrderAddress(orderAddress);
        order.setOrderId(generateOrderId());
        order.setOrderStatus(OrderStatus.NEW);
        order.setOrderDate(new Date());

        orderRepo.save(order);

        return "Successfully Updated";

    }

    @Override
    public AddressDto getAddressForOrderId(int orderId){

        Optional<UserOrder> userOrder = orderRepo.findById(orderId);
        UserOrder order = userOrder.get();
        int orderAddressId = order.getOrderAddress().getId();

        Optional<OrderAddress> address = addressRepo.findById(orderAddressId);
        OrderAddress orderAddress = address.get();

        return this.modelMapper.map(orderAddress,AddressDto.class);

    }

    public static AddressDto getAddressDto(UserOrder order){

        AddressDto addressDto = new AddressDto();
        OrderAddress orderAddress = order.getOrderAddress();
        addressDto.setFullName(orderAddress.getFullName());
        addressDto.setAddressLine(orderAddress.getAddressLine());
        addressDto.setState(orderAddress.getState());
        addressDto.setCity(orderAddress.getCity());
        addressDto.setZipCode(orderAddress.getZipCode());
        addressDto.setCountry(orderAddress.getCountry());
        return addressDto;
    }

    @Override
    public OrderDetailsDto getOrdersByTrackingId(String orderId){

        System.out.println(orderId);

        OrderDetailsDto orderDetailsDto = new OrderDetailsDto();

        UserOrder order = orderRepo.findOrdersByOrderId(orderId);

        List<OrderDto> orderDtoList = getOrderDtoList(order);
        AddressDto addressDto = getAddressDto(order);
        orderDetailsDto.setAddressDto(addressDto);
        orderDetailsDto.setOrderDto(orderDtoList);
        orderDetailsDto.setOrderDate(order.getOrderDate());

        return orderDetailsDto;
    }

}
