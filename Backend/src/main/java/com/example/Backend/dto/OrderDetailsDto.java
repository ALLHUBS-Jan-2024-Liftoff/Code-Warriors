package com.example.Backend.dto;
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
public class OrderDetailsDto {

    private List<OrderDto> orderDto;
    private AddressDto addressDto;
    private Date orderDate;
}
