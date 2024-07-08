package com.example.Backend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.util.List;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Data
@ToString
public class Cart {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int orderId;

    @OneToOne
    @JoinColumn(name = "user_id")
    private User user;

    private float totalAmount;


    @OneToMany(cascade = CascadeType.ALL,mappedBy = "cart")
    private List<OrderDetails> orderDetails;


}