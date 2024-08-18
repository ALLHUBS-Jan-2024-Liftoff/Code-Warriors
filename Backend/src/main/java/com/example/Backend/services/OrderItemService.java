package com.example.Backend.services;

import com.example.Backend.repositories.OrderItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class OrderItemService {

    @Autowired
    private OrderItemRepository orderItemRepository;

    public Map<String, Long> getOrderCountByCategory() {
        List<Object[]> results = orderItemRepository.getOrderCountByCategory();
        Map<String, Long> orderCountByCategory = new HashMap<>();

        // Initialize all categories with 0 count
        for (String category : List.of("Laptops", "Phones", "Cameras", "Computers", "Headphones", "TVs", "Accessories")) {
            orderCountByCategory.put(category, 0L);
        }

        // Fill in actual data
        for (Object[] result : results) {
            String category = (String) result[0];
            Long count = (Long) result[1];
            orderCountByCategory.put(category, count);
        }

        return orderCountByCategory;
    }
}