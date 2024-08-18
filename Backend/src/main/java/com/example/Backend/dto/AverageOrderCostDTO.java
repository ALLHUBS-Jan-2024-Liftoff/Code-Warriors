package com.example.Backend.dto;

import java.util.Date;

public class AverageOrderCostDTO {
    private Date orderDate;
    private Double averageCost;

    public AverageOrderCostDTO(Date orderDate, Double averageCost) {
        this.orderDate = orderDate;
        this.averageCost = averageCost;
    }

    public Date getOrderDate() {
        return orderDate;
    }

    public Double getAverageCost() {
        return averageCost;
    }
}
