package com.example.Backend.controller;

import com.example.Backend.dto.OrderedProductResponseDto;
import com.example.Backend.services.ReviewService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/review")

public class ReviewController {

    private final ReviewService reviewService;

    @GetMapping("/api/reviews")
    public ResponseEntity<OrderedProductResponseDto> getOrderedProductDetailsByOrderId(@PathVariable Long orderId) {

      return ResponseEntity.ok(reviewService.getOrderedProductDetailsByOrderId(orderId));

    }

}
