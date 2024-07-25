package com.example.Backend.server;
import jakarta.validation.constraints.NotNull;

public class PaymentRequest {
    @NotNull
    private String currency;

    @NotNull
    private Long amount;

    @NotNull
    private String source;

    // Getters and Setters
    public String getCurrency() {
        return currency;
    }

    public void setCurrency(String currency) {
        this.currency = currency;
    }

    public Long getAmount() {
        return amount;
    }

    public void setAmount(Long amount) {
        this.amount = amount;
    }

    public String getSource() {
        return source;
    }

    public void setSource(String source) {
        this.source = source;
    }
}
