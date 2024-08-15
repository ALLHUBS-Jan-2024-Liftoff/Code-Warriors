package com.example.Backend.dto;

import com.example.Backend.entity.Product;
import com.example.Backend.entity.User;
import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Data
@ToString
public class ReviewDto {
    private Long id;
    private Long rating;
    private String description;
    private User user;
    private Product product;

}
