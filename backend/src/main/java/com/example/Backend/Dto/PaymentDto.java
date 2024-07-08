package com.example.Backend.Dto;

import lombok.Data;

@Data
public class PaymentDto {

        private int amount;
        private String currency;
        private String receiptEmail;

}
