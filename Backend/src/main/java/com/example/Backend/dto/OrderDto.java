package com.example.Backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.time.LocalDateTime;
import java.util.Date;

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




}
