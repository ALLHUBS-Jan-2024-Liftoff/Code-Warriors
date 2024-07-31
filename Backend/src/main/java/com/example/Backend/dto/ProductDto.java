package com.example.Backend.dto;

import com.example.Backend.entity.ProductStatus;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Data
@ToString
public class ProductDto {
    private int productId;

    private String productName;

    private String description;

    private Double price;

    private Integer quantity;

    @Enumerated(EnumType.STRING)
    private ProductStatus status;

    private String ImageUrl;

}
