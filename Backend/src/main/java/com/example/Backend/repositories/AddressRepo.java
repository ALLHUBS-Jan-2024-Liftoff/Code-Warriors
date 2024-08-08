package com.example.Backend.repositories;

import com.example.Backend.entity.OrderAddress;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AddressRepo extends JpaRepository<OrderAddress,Integer> {
}
