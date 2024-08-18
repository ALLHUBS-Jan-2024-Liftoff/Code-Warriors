package com.example.Backend.dto;

import java.util.Date;

public class SalesRevenueDTO {
    private Date orderDate;
    private Double totalRevenue;

    // Constructors, getters, and setters
    public SalesRevenueDTO(Date orderDate, Double totalRevenue) {
        this.orderDate = orderDate;
        this.totalRevenue = totalRevenue;
    }

    public Date getOrderDate() {
        return orderDate;
    }

    public void setOrderDate(Date orderDate) {
        this.orderDate = orderDate;
    }

    public Double getTotalRevenue() {
        return totalRevenue;
    }

    public void setTotalRevenue(Double totalRevenue) {
        this.totalRevenue = totalRevenue;
    }
}