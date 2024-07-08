package com.example.Backend.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.util.List;

@Entity
@ToString
@Data
@NoArgsConstructor
public class Product {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int productId;
    @Column
    private String productName;

    private String description;
    private Float price;
    private int quantity;
    //InStock/OutOfStock
    private String status;
    private String imageUrl;


    @OneToMany(mappedBy = "products")
    private List<OrderDetails> list;


}
