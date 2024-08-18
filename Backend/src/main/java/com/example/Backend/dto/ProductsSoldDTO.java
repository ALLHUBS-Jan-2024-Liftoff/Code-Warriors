package com.example.Backend.dto;

import java.util.Date;

public class ProductsSoldDTO {
    private Date orderDate;
    private Long totalQuantity;

    // Constructors, getters, and setters
    public ProductsSoldDTO(Date orderDate, Long totalQuantity) {
        this.orderDate = orderDate;
        this.totalQuantity = totalQuantity;
    }

    public Date getOrderDate() {
        return orderDate;
    }

    public void setOrderDate(Date orderDate) {
        this.orderDate = orderDate;
    }

    public Long getTotalQuantity() {
        return totalQuantity;
    }

    public void setTotalQuantity(Long totalQuantity) {
        this.totalQuantity = totalQuantity;
    }
}