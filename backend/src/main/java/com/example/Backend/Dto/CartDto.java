package com.example.Backend.Dto;



import lombok.*;



@ToString
@Data
@NoArgsConstructor
@AllArgsConstructor
public class CartDto {

    private int productId;

    private String productName;

    private Double price;

    private Integer quantity;


}