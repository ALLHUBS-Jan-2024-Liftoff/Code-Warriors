package com.example.Backend.repositories;

import com.example.Backend.entity.Payment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PaymentRepo extends JpaRepository<Payment, Long> {
    Payment findByUserEmail(String userEmail);
}
