package com.example.Backend.controller;

import com.example.Backend.dto.OrderedProductResponseDto;
import com.example.Backend.dto.ProductDto;
import com.example.Backend.dto.ReviewDto;
import com.example.Backend.services.ReviewService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/review")

public class ReviewController {
    @Autowired
    private ReviewService reviewService;

    @PostMapping(value = "/create" )
    public ResponseEntity<String> createReviews(@RequestBody ReviewDto reviewDto) throws IOException {
        try{
            this.reviewService.CreateReview(reviewDto);

            return new ResponseEntity<String>("Successfully Added Review...", HttpStatusCode.valueOf(200));
        }catch(Exception e){
            return new ResponseEntity<String>(e.getMessage(), HttpStatusCode.valueOf(500));
        }
    }

    @GetMapping(value = "/get" )
    public ResponseEntity<String> getReviews(@RequestBody ReviewDto reviewDto) throws IOException {
        try{
            //this.reviewService.GetReviews(reviewDto);

            return new ResponseEntity<String>(String.valueOf(this.reviewService.GetReviews(reviewDto)), HttpStatusCode.valueOf(200));
        }catch(Exception e){
            return new ResponseEntity<String>(e.getMessage(), HttpStatusCode.valueOf(500));
        }
    }

}
