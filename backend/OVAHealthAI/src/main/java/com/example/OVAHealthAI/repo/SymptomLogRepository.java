package com.example.OVAHealthAI.repo;

import com.example.OVAHealthAI.entity.SymptomLog;
import com.example.OVAHealthAI.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface SymptomLogRepository extends JpaRepository<SymptomLog, Long> {

    // Find log for a specific date (for single day check)
    Optional<SymptomLog> findByUserAndLogDate(User user, LocalDate logDate);

    // Fetch all logs in a date range (for monthly calendar view)
    List<SymptomLog> findByUserAndLogDateBetweenOrderByLogDateAsc(User user, LocalDate startDate, LocalDate endDate);

    // Fetch all logs ordered by date descending (for algorithm calculation)
    List<SymptomLog> findByUserOrderByLogDateDesc(User user);

    // Fetch only active period flow days
    List<SymptomLog> findByUserAndFlowNotOrderByLogDateDesc(User user, String flow);
}