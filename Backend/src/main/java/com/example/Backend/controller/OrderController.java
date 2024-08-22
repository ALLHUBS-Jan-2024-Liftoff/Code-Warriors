package com.example.Backend.controller;

import com.example.Backend.dto.*;
import com.example.Backend.entity.Cart;
import com.example.Backend.entity.OrderItem;
import com.example.Backend.entity.OrderStatus;
import com.example.Backend.entity.UserOrder;
import com.example.Backend.services.OrderService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/orders")
public class OrderController {
    @Autowired
    private OrderService orderService;

    @PostMapping("/create")
    public ResponseEntity<Integer> createOrder(HttpServletRequest request) {
        int userId = (int) request.getAttribute("userId");
        return new ResponseEntity<>(orderService.createOrder(userId), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<List<OrderDto>> getOrder(@PathVariable("id") int id) {

        return new ResponseEntity<>(orderService.getOrder(id), HttpStatus.OK);
    }

    @PutMapping("/updateAddress/{orderId}")
    public ResponseEntity<String> updateAddressForOrderId(HttpServletRequest request, @PathVariable("orderId") int orderId, @RequestBody AddressDto addressDto) {

        return new ResponseEntity<>(orderService.updateAddressForOrder(addressDto, orderId), HttpStatus.OK);
    }

    @GetMapping("/address/{orderId}")
    public ResponseEntity<AddressDto> getAddressForOrderId(@PathVariable("orderId") int orderId) {
       return new ResponseEntity<>(orderService.getAddressForOrderId(orderId), HttpStatus.OK);
    }

    @GetMapping("/track/{trackId}")
    public ResponseEntity<OrderDetailsDto> getOrder(@PathVariable("trackId") String trackId) {


        return new ResponseEntity<>(orderService.getOrdersByTrackingId(trackId), HttpStatus.OK);
    }

    @GetMapping("/all")
    public ResponseEntity<List<OrderDto>> getAllOrders() {
        return new ResponseEntity<>(orderService.getAllOrdersByAdmin(), HttpStatus.OK);
    }


    @PutMapping("/updateStatus/{orderId}")
    public ResponseEntity<String> updateStatusForOrderId(HttpServletRequest request, @PathVariable("orderId") String orderId, @RequestBody AdminOrderDto adminOrderDto) {

        return new ResponseEntity<>(orderService.updateStatusForOrderId(orderId, adminOrderDto), HttpStatus.OK);
    }

    @GetMapping("/average-cost-last-7-days")
    public List<AverageOrderCostDTO> getAverageOrderCostLast7Days() {
        return orderService.getAverageOrderCostLast7Days();
    }

    @GetMapping("/revenue/last7days")
    public List<SalesRevenueDTO> getTotalRevenueLast7Days() {
        return orderService.getTotalRevenueLast7Days();
    }

    @GetMapping("/products-sold/last7days")
    public List<ProductsSoldDTO> getTotalProductsSoldLast7Days() {
        return orderService.getTotalProductsSoldLast7Days();
    }

    // Order Tracking
    @GetMapping("/trackOrder/{userId}")
    public ResponseEntity<List<OrderDetailsDto>> getAllOrdersByUserId(@PathVariable("userId") Integer userId) {
        return new ResponseEntity<>(orderService.getOrdersByUserId(userId), HttpStatus.OK);
    }
}
