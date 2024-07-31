package com.example.Backend.repositories;

import com.example.Backend.entity.UserOrder;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OrderRepo extends JpaRepository<UserOrder, Integer> {
}
