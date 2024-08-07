package com.example.Backend.services.impl;

import com.example.Backend.dto.AddressDetailsDto;
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
        return "ORD" + uuid.substring(0, 6); // e.g., ORD1A2B3C
    }


    public static List<OrderDto> getOrderDtoList( UserOrder order){

        List<OrderDto> orderDtoList = new ArrayList<>();

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

        order.setShippingAddress(mapToEntity(addressDto.getShippingAddress()));
        order.setBillingAddress(mapToEntity(addressDto.getBillingAddress()));

        order.setOrderId(generateOrderId());

        order.setOrderStatus(OrderStatus.NEW);

        order.setOrderDate(new Date());

        orderRepo.saveAndFlush(order);

        return "Successfully Updated";

    }

    @Override
    public AddressDto getAddressForOrderId(int orderId){

        Optional<UserOrder> userOrder = orderRepo.findById(orderId);
        UserOrder order = userOrder.get();
        int orderAddressId = order.getShippingAddress().getId();

        Optional<OrderAddress> address = addressRepo.findById(orderAddressId);
        OrderAddress orderAddress = address.get();

        return this.modelMapper.map(orderAddress,AddressDto.class);

    }

    public  AddressDto getAddressDto(UserOrder order){

        AddressDto addressDto = new AddressDto();
        addressDto.setShippingAddress(addressEntityToDto(order.getShippingAddress()));
        addressDto.setBillingAddress(addressEntityToDto(order.getBillingAddress()));
        return addressDto;
    }

    @Override
    public OrderDetailsDto getOrdersByTrackingId(String orderId){

        OrderDetailsDto orderDetailsDto = new OrderDetailsDto();

        UserOrder order = orderRepo.findOrdersByOrderId(orderId);

        if(order != null){

            List<OrderDto> orderDtoList = getOrderDtoList(order);
            AddressDto addressDto = getAddressDto(order);
            orderDetailsDto.setAddressDto(addressDto);
            orderDetailsDto.setOrderDto(orderDtoList);
            orderDetailsDto.setOrderDate(order.getOrderDate());

        }
        return orderDetailsDto;
    }

    private OrderAddress mapToEntity(AddressDetailsDto addressDetailsDto) {

        OrderAddress address = new OrderAddress();
        address.setFullName(addressDetailsDto.getFullName());
        address.setAddressLine(addressDetailsDto.getAddressLine());
        address.setCity(addressDetailsDto.getCity());
        address.setState(addressDetailsDto.getState());
        address.setZipCode(addressDetailsDto.getZipCode());
        address.setCountry(addressDetailsDto.getCountry());
        return address;
    }

    private AddressDetailsDto addressEntityToDto(OrderAddress address) {
        AddressDetailsDto addressDto = new AddressDetailsDto();
        addressDto.setFullName(address.getFullName());
        addressDto.setAddressLine(address.getAddressLine());
        addressDto.setCity(address.getCity());
        addressDto.setState(address.getState());
        addressDto.setZipCode(address.getZipCode());
        addressDto.setCountry(address.getCountry());
        return addressDto;
    }

}
