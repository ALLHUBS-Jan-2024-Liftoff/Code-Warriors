package com.example.Backend.controller;
import com.example.Backend.server.PaymentRequest;
import com.example.Backend.server.PaymentService;
import com.stripe.exception.StripeException;
import com.stripe.model.Charge;
import com.stripe.model.PaymentIntent;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;

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
    public ResponseEntity<PaymentIntent> createPaymentIntent(@Valid @RequestBody PaymentRequest paymentRequest) {
        try {
            PaymentIntent paymentIntent = paymentService.createPaymentIntent(paymentRequest);
            return ResponseEntity.ok(paymentIntent);
        } catch (StripeException e) {
            return ResponseEntity.status(500).body(null);
        }
    }
}