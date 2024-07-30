package com.example.Backend.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.util.*;

@Entity
@NoArgsConstructor
@Data
@ToString
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int userId;

    private String userName;

    private String userEmail;

    private String password;

    private String contact;

    @JsonFormat(pattern = "yyyy-MM-dd")
    private Date date;

    private String address;

    @OneToOne(mappedBy = "user",cascade = CascadeType.ALL)
    private Cart cart;

}
