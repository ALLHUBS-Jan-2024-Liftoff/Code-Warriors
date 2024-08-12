package com.example.Backend.services;

import com.example.Backend.dto.AddressDto;
import com.example.Backend.dto.OrderDetailsDto;
import com.example.Backend.dto.OrderDto;

import java.util.List;


public interface OrderService {

    Integer createOrder(int userId);

    List<OrderDto> getOrder(int id);

    String updateAddressForOrder(AddressDto addressDto, int orderId);

    AddressDto getAddressForOrderId(int orderId);

    OrderDetailsDto  getOrdersByTrackingId(String orderId);
}
