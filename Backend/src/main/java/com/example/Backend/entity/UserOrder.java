package com.example.Backend.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.util.Date;
import java.util.List;

@Entity
@ToString
@Data
@NoArgsConstructor
public class UserOrder {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String orderId;

    @ManyToOne
    private User user;

    @Enumerated(EnumType.STRING)
    private OrderStatus orderStatus;

    private Double total;

    @OneToMany(mappedBy ="order",cascade = CascadeType.ALL, orphanRemoval = true)
    private List<OrderItem> orderItems;

    private Date orderDate;

    private Date deliveryDate;

    @OneToOne(cascade = CascadeType.ALL)
    private OrderAddress orderAddress;


}

