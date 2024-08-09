package com.example.Backend.controller;
import com.example.Backend.server.PaymentRequest;
import com.example.Backend.server.PaymentService;
import com.stripe.exception.StripeException;
import com.stripe.model.Charge;
import com.stripe.model.PaymentIntent;
import com.stripe.param.PaymentIntentCreateParams;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/payments")
public class PaymentController {

    @Autowired
    private PaymentService paymentService;

    @PostMapping("/charge")
    public ResponseEntity<Charge> charge(@Valid @RequestBody PaymentRequest paymentRequest) {
        try {
            Charge charge = paymentService.charge(paymentRequest);
            return ResponseEntity.ok(charge);
        } catch (StripeException e) {
            return ResponseEntity.status(500).body(null);
        }
    }

    @PostMapping("/create-payment-intent")
    public ResponseEntity<Map<String, String>> createPaymentIntent(@RequestBody PaymentRequest paymentRequest) {
        try {
            PaymentIntentCreateParams params = PaymentIntentCreateParams.builder()
                    .setAmount(paymentRequest.getAmount())
                    .setCurrency(paymentRequest.getCurrency())

                    .build();

            PaymentIntent paymentIntent = PaymentIntent.create(params);

            Map<String, String> responseData = new HashMap<>();
            responseData.put("clientSecret", paymentIntent.getClientSecret());

            return ResponseEntity.ok(responseData);
        } catch (StripeException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }
}