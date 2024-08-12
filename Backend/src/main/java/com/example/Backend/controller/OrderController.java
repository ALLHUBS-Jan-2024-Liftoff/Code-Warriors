package com.example.Backend.controller;

import com.example.Backend.dto.AddressDto;
import com.example.Backend.dto.OrderDetailsDto;
import com.example.Backend.dto.OrderDto;
import com.example.Backend.dto.QuantityUpdateDto;
import com.example.Backend.entity.Cart;
import com.example.Backend.entity.OrderItem;
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


}
