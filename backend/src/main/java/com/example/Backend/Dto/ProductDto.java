package com.example.Backend.Dto;

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
    private Float Price;
    private int quantity;
    //InStock/OutOfStock
    private String status;
    private String ImageUrl;
}
