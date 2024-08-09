package com.example.Backend.server;


import com.stripe.exception.StripeException;
import com.stripe.model.Charge;
import com.stripe.model.PaymentIntent;
import com.stripe.param.PaymentIntentCreateParams;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class PaymentService {

    public Charge charge(PaymentRequest paymentRequest) throws StripeException {
        Map<String, Object> chargeParams = new HashMap<>();
        chargeParams.put("amount", paymentRequest.getAmount());
        chargeParams.put("currency", paymentRequest.getCurrency());
        chargeParams.put("source", paymentRequest.getSource());
        return Charge.create(chargeParams);
    }

    public PaymentIntent createPaymentIntent(PaymentRequest paymentRequest) throws StripeException {
        PaymentIntentCreateParams params =
                PaymentIntentCreateParams.builder()

                        .setAmount(paymentRequest.getAmount())
                        .setCurrency(paymentRequest.getCurrency())
                        .addPaymentMethodType("card")
                        .build();

        return PaymentIntent.create(params);
    }
}