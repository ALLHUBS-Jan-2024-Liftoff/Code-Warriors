package com.example.Backend.services.impl;

import com.example.Backend.dto.ProductDto;
import com.example.Backend.dto.ReviewDto;
import com.example.Backend.entity.Product;
import com.example.Backend.entity.Review;
import com.example.Backend.repositories.ReviewRepo;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.Backend.services.ReviewService;

import java.util.List;
import java.util.stream.Collectors;

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
    public List<ReviewDto> GetReviews(Integer productId) {

        List<Review> allReviews = reviewRepo.findAll();

        return allReviews.stream().filter(review -> review.getProduct().getProductId() == productId).map(
                dto -> new ReviewDto(dto.getId(),
                        dto.getRating(),
                        dto.getDescription(),
                        dto.getUser().getUsername(),
                        dto.getProduct())).collect(Collectors.toList());
    }

    @Override
    public void DeleteReview(Long reviewID) {
        this.reviewRepo.deleteById(Math.toIntExact(reviewID));
    }
}

