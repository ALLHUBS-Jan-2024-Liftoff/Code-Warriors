package com.example.Backend.services.impl;

import com.example.Backend.dto.ReviewDto;
import com.example.Backend.entity.Review;
import com.example.Backend.repositories.ReviewRepo;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.Backend.services.ReviewService;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ReviewServiceImp implements ReviewService {
    @Autowired
    private ModelMapper modelMapper;
    @Autowired
    private ReviewRepo reviewRepo;

    @Override
    public void CreateReview(ReviewDto reviewDto) {
        Review review = this.modelMapper.map(reviewDto,Review.class);

        this.reviewRepo.save(review);
    }

    @Override
    public Optional<Review> GetReviews(ReviewDto review) {
        Optional<Review> byId = this.reviewRepo.findById(review.getProduct().getProductId());
        return byId;
    }

    @Override
    public void DeleteReview(ReviewDto review) {

    }
}

