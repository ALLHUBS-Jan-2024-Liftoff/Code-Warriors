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

    private Long id;

    private String fullName;
    private String addressLine;
    private String city;
    private String state;
    private String zipCode;
    private String country;
}
