package com.example.OVAHealthAI.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name="userTable")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long iden;
    private String username;
    private String password;

    private String email;
    private String provider;
    private String providerId;
}
