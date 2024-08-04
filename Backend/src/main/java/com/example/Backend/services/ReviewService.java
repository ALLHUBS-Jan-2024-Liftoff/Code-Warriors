package com.example.Backend.services;

import com.example.Backend.dto.ReviewDto;
import com.example.Backend.entity.Review;

import java.util.Optional;

public interface ReviewService {
    void CreateReview(ReviewDto review);
    public Optional<Review> GetReviews(ReviewDto review);
    void DeleteReview(Long reviewID);

}
