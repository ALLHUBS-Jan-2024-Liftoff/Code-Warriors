package com.example.Backend.services.impl;


import com.example.Backend.Dto.PaymentDto;
import com.example.Backend.entity.Payment;
import com.example.Backend.repositories.PaymentRepo;
import com.example.Backend.services.PaymentService;
import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


@Service
@Transactional
public class PaymentServiceImpl implements PaymentService {

    @Autowired
    private PaymentRepo paymentRepo;
/*
    @Autowired
    public PaymentServiceImpl(PaymentRepo paymentRepository, @Value("${stripe.key.secret}") String secretKey) {
        this.paymentRepo = paymentRepository;
        Stripe.apiKey = secretKey;
    }*/

    public PaymentIntent createPaymentIntent(PaymentDto paymentDto) throws StripeException {
        List<String> paymentMethodTypes = new ArrayList<>();
        paymentMethodTypes.add("card");

        Map<String, Object> params = new HashMap<>();
        params.put("amount", paymentDto.getAmount());
        params.put("currency", paymentDto.getCurrency());
        params.put("payment_method_types", paymentMethodTypes);

        return PaymentIntent.create(params);
    }

    public ResponseEntity<String> stripePayment(String userEmail) throws Exception {
        Payment payment = paymentRepo.findByUserEmail(userEmail);

        if (payment == null) {
            throw new Exception("Payment information is missing");
        }
        payment.setAmount(00.00);
        paymentRepo.save(payment);
        return new ResponseEntity<>(HttpStatus.OK);
    }


}