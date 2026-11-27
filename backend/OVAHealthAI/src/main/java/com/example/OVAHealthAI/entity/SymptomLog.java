package com.example.OVAHealthAI.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(
        name = "symptom_logs",
        uniqueConstraints = {
                @UniqueConstraint(name = "uk_user_date", columnNames = {"user_iden", "logDate"})
        }
)
public class SymptomLog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Strict association to the authenticated user
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_iden", referencedColumnName = "iden", nullable = false)
    private User user;

    @Column(nullable = false)
    private LocalDate logDate; // e.g., 2026-11-28

    // Menstrual Flow: "NONE", "SPOTTING", "LIGHT", "MEDIUM", "HEAVY"
    @Column(nullable = false)
    private String flow = "NONE";

    // Pain / Cramps scale: 0 = None, 1 = Mild, 2 = Moderate, 3 = Severe
    private Integer crampsLevel = 0;

    // Mood: "HAPPY", "CALM", "ANXIOUS", "IRRITABLE", "SAD", "TIRED"
    private String mood;

    // PCOS Specific Daily Hallmarks
    private Integer acneSeverity = 0;   // 0 = Clear, 1 = Mild, 2 = Moderate, 3 = Cystic
    private Integer cravingsLevel = 0; // 0 = None, 1 = Mild, 2 = Intense Sugar Cravings
    private Boolean bloating = false;
    private Boolean headache = false;

    // Daily Vitals (Optional)
    private Double basalBodyTemp; // in Celsius (e.g., 36.6)
    private Double weightKg;

    @Column(length = 1000)
    private String notes; // Personal diary note

    private LocalDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
        if (this.logDate == null) {
            this.logDate = LocalDate.now();
        }
    }
}