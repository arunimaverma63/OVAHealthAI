package com.example.OVAHealthAI.service;

import com.example.OVAHealthAI.entity.SymptomLog;
import com.example.OVAHealthAI.entity.User;
import com.example.OVAHealthAI.repo.SymptomLogRepository;
import com.example.OVAHealthAI.repo.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.*;

@Service
public class CycleTrackingService {

    @Autowired
    private SymptomLogRepository logRepository;

    @Autowired
    private UserRepo userRepo;

    /**
     * Save or update daily symptom log (1 log per day per user)
     */
    public SymptomLog logDailySymptoms(String username, SymptomLog inputLog) {
        User user = userRepo.findFirstByUsernameOrderByIdenDesc(username)
                .orElseThrow(() -> new RuntimeException("User not found: " + username));

        LocalDate dateToLog = inputLog.getLogDate() != null ? inputLog.getLogDate() : LocalDate.now();

        // Check if log already exists for this date
        Optional<SymptomLog> existing = logRepository.findByUserAndLogDate(user, dateToLog);

        SymptomLog log = existing.orElse(new SymptomLog());
        log.setUser(user);
        log.setLogDate(dateToLog);
        log.setFlow(inputLog.getFlow() != null ? inputLog.getFlow() : "NONE");
        log.setCrampsLevel(inputLog.getCrampsLevel());
        log.setMood(inputLog.getMood());
        log.setAcneSeverity(inputLog.getAcneSeverity());
        log.setCravingsLevel(inputLog.getCravingsLevel());
        log.setBloating(inputLog.getBloating());
        log.setHeadache(inputLog.getHeadache());
        log.setBasalBodyTemp(inputLog.getBasalBodyTemp());
        log.setWeightKg(inputLog.getWeightKg());
        log.setNotes(inputLog.getNotes());

        return logRepository.save(log);
    }

    /**
     * Get all logs for a specific calendar month
     */
    public List<SymptomLog> getMonthlyLogs(String username, int year, int month) {
        User user = userRepo.findFirstByUsernameOrderByIdenDesc(username)
                .orElseThrow(() -> new RuntimeException("User not found: " + username));

        LocalDate start = LocalDate.of(year, month, 1);
        LocalDate end = start.plusMonths(1).minusDays(1);

        return logRepository.findByUserAndLogDateBetweenOrderByLogDateAsc(user, start, end);
    }

    /**
     * Smart Cycle Analytics & Prediction Algorithm
     */
    public Map<String, Object> calculateCycleAnalytics(String username) {
        User user = userRepo.findFirstByUsernameOrderByIdenDesc(username)
                .orElseThrow(() -> new RuntimeException("User not found: " + username));

        List<SymptomLog> allPeriodDays = logRepository.findByUserAndFlowNotOrderByLogDateDesc(user, "NONE");

        Map<String, Object> analytics = new HashMap<>();

        if (allPeriodDays.isEmpty()) {
            analytics.put("status", "NO_DATA");
            analytics.put("message", "No period logs recorded yet. Log your period flow to see predictions.");
            analytics.put("averageCycleLength", 28);
            analytics.put("currentCycleDay", 1);
            return analytics;
        }

        // 1. Identify distinct period start dates (days with flow where the previous day was NOT bleeding)
        List<LocalDate> periodStartDates = new ArrayList<>();
        for (int i = 0; i < allPeriodDays.size(); i++) {
            LocalDate current = allPeriodDays.get(i).getLogDate();
            if (i == allPeriodDays.size() - 1) {
                periodStartDates.add(current);
            } else {
                LocalDate nextInList = allPeriodDays.get(i + 1).getLogDate();
                // If more than 2 days apart, this is the start of a distinct cycle
                if (ChronoUnit.DAYS.between(nextInList, current) > 2) {
                    periodStartDates.add(current);
                }
            }
        }

        LocalDate lastPeriodStart = periodStartDates.get(0);
        long currentCycleDay = ChronoUnit.DAYS.between(lastPeriodStart, LocalDate.now()) + 1;

        // 2. Calculate average cycle length
        long avgCycleLength = 28; // standard baseline
        if (periodStartDates.size() >= 2) {
            long totalDays = 0;
            int intervals = periodStartDates.size() - 1;
            for (int i = 0; i < intervals; i++) {
                totalDays += ChronoUnit.DAYS.between(periodStartDates.get(i + 1), periodStartDates.get(i));
            }
            avgCycleLength = totalDays / intervals;
        }

        // 3. Predictions: Next Period & Ovulation Window
        LocalDate predictedNextPeriod = lastPeriodStart.plusDays(avgCycleLength);
        LocalDate estimatedOvulation = predictedNextPeriod.minusDays(14);
        LocalDate fertileWindowStart = estimatedOvulation.minusDays(5);
        LocalDate fertileWindowEnd = estimatedOvulation.plusDays(1);

        // 4. Current Cycle Phase
        String currentPhase;
        if (currentCycleDay <= 5) {
            currentPhase = "Menstrual Phase";
        } else if (LocalDate.now().isBefore(fertileWindowStart)) {
            currentPhase = "Follicular Phase";
        } else if (!LocalDate.now().isAfter(fertileWindowEnd)) {
            currentPhase = "Ovulatory Window (High Fertility)";
        } else {
            currentPhase = "Luteal Phase";
        }

        // 5. PCOS Delay Alert
        boolean isDelayed = currentCycleDay > (avgCycleLength + 5);

        analytics.put("lastPeriodStartDate", lastPeriodStart.toString());
        analytics.put("currentCycleDay", currentCycleDay);
        analytics.put("currentPhase", currentPhase);
        analytics.put("averageCycleLength", avgCycleLength);
        analytics.put("predictedNextPeriod", predictedNextPeriod.toString());
        analytics.put("estimatedOvulationDate", estimatedOvulation.toString());
        analytics.put("fertileWindow", fertileWindowStart + " to " + fertileWindowEnd);
        analytics.put("isDelayed", isDelayed);
        analytics.put("daysUntilNextPeriod", ChronoUnit.DAYS.between(LocalDate.now(), predictedNextPeriod));

        if (avgCycleLength > 35) {
            analytics.put("cyclePattern", "Irregular / Oligomenorrhea (Characteristic of PCOS/PMOS)");
        } else if (avgCycleLength < 21) {
            analytics.put("cyclePattern", "Polymenorrhea (Short cycle)");
        } else {
            analytics.put("cyclePattern", "Regular Ovulatory Cycle");
        }

        return analytics;
    }
}