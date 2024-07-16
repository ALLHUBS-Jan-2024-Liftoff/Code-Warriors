package com.example.Backend.Dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.util.Date;

@ToString
@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserDto {


    private int userId;

    private String name;
    private String email;
    private String password;
    private String contact;


    private Date date;

    private String role;

    private String address;

//     private CartDto cart;

}