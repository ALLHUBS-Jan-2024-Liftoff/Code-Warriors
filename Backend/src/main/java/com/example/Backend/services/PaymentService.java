package com.example.Backend.services;

import com.example.Backend.dto.PaymentRequest;
import com.stripe.exception.StripeException;

import java.util.Map;

public interface PaymentService {

    Map<String, Object> createPaymentIntent(PaymentRequest paymentRequest) throws StripeException;
}
