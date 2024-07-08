package com.example.Backend.controller;


import com.example.Backend.Dto.PaymentDto;
import com.example.Backend.services.PaymentService;
import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;



@RestController
@RequestMapping("/api/payment/secure")
public class PaymentController {


    @Autowired
    private PaymentService paymentService;

    @PostMapping("/payment-intent")
    public ResponseEntity<String> createPaymentIntent(@RequestBody PaymentDto paymentDto)
            throws StripeException {

        PaymentIntent paymentIntent = paymentService.createPaymentIntent(paymentDto);
        String paymentStr = paymentIntent.toJson();

    return new ResponseEntity<>(paymentStr, HttpStatus.OK);
    }

    @PutMapping("/payment-complete")
    public ResponseEntity<String> stripePaymentComplete(@RequestHeader(value="Authorization") String token)
            throws Exception {
       // String userEmail = ExtractJWT.payloadJWTExtraction(token, "\"sub\"");
        String userEmail="";
        if (userEmail == null) {
            throw new Exception("User email is missing");
        }
        return paymentService.stripePayment(userEmail);
    }
}