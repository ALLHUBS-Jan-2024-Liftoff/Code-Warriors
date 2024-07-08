package com.example.Backend.services;

import com.example.Backend.Dto.PaymentDto;
import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;
import org.springframework.http.ResponseEntity;

public interface PaymentService {

    PaymentIntent createPaymentIntent(PaymentDto paymentDto) throws StripeException;
    ResponseEntity<String> stripePayment(String userEmail)throws Exception;
}
