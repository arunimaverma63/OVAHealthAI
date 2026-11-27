package com.example.OVAHealthAI.repo;

import com.example.OVAHealthAI.entity.PatientProfile;
import com.example.OVAHealthAI.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PatientProfileRepository extends JpaRepository<PatientProfile, Long> {

    // Strict lookup by user entity
    Optional<PatientProfile> findByUser(User user);

    // Lookup by username extracted from JWT
    Optional<PatientProfile> findByUser_Username(String username);
}