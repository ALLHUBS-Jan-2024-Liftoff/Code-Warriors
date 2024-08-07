package com.example.Backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@ToString
@Data
@NoArgsConstructor
@AllArgsConstructor

public class AddressDto {

    private AddressDetailsDto shippingAddress;
    private AddressDetailsDto billingAddress;

}
