package com.example.OVAHealthAI.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Scan {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String imagePath;
    private String status;
    private String prediction;
    private Double confidence;

    @Column(length=5000)
    private String report;
}
