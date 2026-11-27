package com.example.OVAHealthAI.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "patient_profiles")
public class PatientProfile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Strict 1-to-1 link to the User entity (unique = true ensures 1 profile per user)
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_iden", referencedColumnName = "iden", unique = true, nullable = false)
    private User user;

    // Biometrics
    private Integer age;
    private String bloodGroup; // e.g. "O+", "B+", "A-"
    private Double heightCm;   // in centimeters
    private Double weightKg;   // in kilograms
    private Double bmi;        // auto-calculated: weight / (height/100)^2

    // Menstrual & Reproductive History
    private Integer averageCycleLength; // days (e.g., 28, 35, 45)
    private Integer periodDuration;     // days (e.g., 5)
    private String lastPeriodDate;      // YYYY-MM-DD

    // PCOS Specific Indicators
    private Boolean diagnosedPcos;
    private String pcosType;           // "Insulin-Resistant", "Inflammatory", "Post-Pill", "Adrenal", "Undiagnosed"
    private String primarySymptoms;    // e.g. "Irregular periods, Acne, Hirsutism"

    // Optional Hormonal & Metabolic Lab Markers
    private Double fastingInsulin;     // uIU/mL
    private Double fastingGlucose;     // mg/dL
    private Double testosterone;       // ng/dL
    private Double amh;                // ng/mL

    // Lifestyle & Management
    private String activeMedications;  // e.g. "Metformin 500mg, Myo-Inositol"
    private String dietPreference;     // e.g. "Low GI", "Vegetarian", "High Protein"

    private LocalDateTime updatedAt;

    @PrePersist
    @PreUpdate
    protected void onUpdate() {
        this.updatedAt = LocalDateTime.now();
        // Auto-calculate BMI if height and weight are provided
        if (this.heightCm != null && this.heightCm > 0 && this.weightKg != null && this.weightKg > 0) {
            double heightM = this.heightCm / 100.0;
            this.bmi = Math.round((this.weightKg / (heightM * heightM)) * 10.0) / 10.0;
        }
    }
}