package com.example.Backend.services;

import com.example.Backend.dto.OrderedProductResponseDto;

public interface ReviewService {
    OrderedProductResponseDto getOrderedProductDetailsByOrderId(Long orderId);
}
