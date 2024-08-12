package com.example.Backend.dto;

import com.example.Backend.entity.OrderStatus;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.util.Date;

@ToString
@Data
@NoArgsConstructor
@AllArgsConstructor
public class AdminOrderDto {
    private OrderStatus orderStatus;
    private Date workOrderDate;
}
