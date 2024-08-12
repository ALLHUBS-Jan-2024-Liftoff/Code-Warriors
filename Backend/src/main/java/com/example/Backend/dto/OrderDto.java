package com.example.Backend.dto;

import com.example.Backend.entity.OrderItem;
import com.example.Backend.entity.OrderStatus;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;

@ToString
@Data
@NoArgsConstructor
@AllArgsConstructor
public class OrderDto {

    private String orderId;

    private String productName;

    private Double price;

    private Integer quantity;

    private Double total;

    private Date orderDate;

    private Date workOrderDate;

    @Enumerated(EnumType.STRING)
    private OrderStatus orderStatus;

    private String customerName;

 }
