package com.example.Backend.Dto;

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
    private int ProductId;
    private String ProductName;
    private String Description;
    private Double Price;
    private Integer quantity;
    @Enumerated(EnumType.STRING)
    private ProductStatus status;
    private String ImageUrl;
}
