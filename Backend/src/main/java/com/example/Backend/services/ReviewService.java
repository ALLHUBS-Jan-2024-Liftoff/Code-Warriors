package com.example.Backend.services;

import com.example.Backend.dto.CartDto;
import com.example.Backend.dto.OrderedProductResponseDto;
import com.example.Backend.dto.ReviewDto;
import com.example.Backend.entity.Review;

import java.util.List;
import java.util.Optional;

public interface ReviewService {
    void CreateReview(ReviewDto review);
    public Optional<Review> GetReviews(ReviewDto review);
    void DeleteReview(ReviewDto review);


}
