package com.example.Backend.repositories;

import com.example.Backend.entity.OrderItem;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface OrderItemRepository extends CrudRepository<OrderItem, Integer> {

    @Query("SELECT p.category, SUM(oi.quantity) FROM OrderItem oi JOIN oi.product p GROUP BY p.category")
    List<Object[]> getOrderCountByCategory();
}