package com.example.Backend.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@ToString
@Data
@NoArgsConstructor
public class AddressDetailsDto {

    private String fullName;
    private String addressLine;
    private String city;
    private String state;
    private String zipCode;
    private String country;
}
