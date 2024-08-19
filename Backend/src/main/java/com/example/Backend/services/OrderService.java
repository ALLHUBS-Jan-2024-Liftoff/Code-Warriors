package com.example.Backend.services;

import com.example.Backend.dto.*;
import com.example.Backend.entity.OrderStatus;
import com.example.Backend.entity.UserOrder;

import java.util.List;


public interface OrderService {

    Integer createOrder(int userId);

    List<OrderDto> getOrder(int id);

    String updateAddressForOrder(AddressDto addressDto, int orderId);

    AddressDto getAddressForOrderId(int orderId);

    OrderDetailsDto  getOrdersByTrackingId(String orderId);

    List<OrderDto> getAllOrdersByAdmin();

    String updateStatusForOrderId(String orderId, AdminOrderDto adminOrderDto);

    List<AverageOrderCostDTO> getAverageOrderCostLast7Days();

    List<SalesRevenueDTO> getTotalRevenueLast7Days();

    List<ProductsSoldDTO> getTotalProductsSoldLast7Days();

    List<OrderDetailsDto> getOrdersByUserId(Integer userId);
}
