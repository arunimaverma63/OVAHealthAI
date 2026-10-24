package com.example.OVAHealthAI.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "userTable",
        uniqueConstraints = {
                @UniqueConstraint(name = "uk_user_username", columnNames = "username"),
                @UniqueConstraint(name = "uk_user_email", columnNames = "email"),
                @UniqueConstraint(name = "uk_user_provider", columnNames = {"provider", "provider_id"})
        })
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long iden;

    @Column(nullable = false)
    private String username;
    private String password;

    private String email;
    private String provider;

    @Column(name = "provider_id")
    private String providerId;
}
