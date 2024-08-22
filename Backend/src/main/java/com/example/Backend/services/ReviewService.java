package com.example.Backend.services;

import com.example.Backend.dto.ReviewDto;
import com.example.Backend.entity.Review;

import java.util.List;

public interface ReviewService {
    void CreateReview(Review newReview);
    List<ReviewDto> GetReviews(Integer productId);
    void DeleteReview(Long reviewID);

}
