package com.example.OVAHealthAI.controller;

import com.example.OVAHealthAI.entity.SymptomLog;
import com.example.OVAHealthAI.service.CycleTrackingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;

@RestController
@RequestMapping("/api/tracker")
@CrossOrigin(origins = "*")
public class CycleTrackingController {

    @Autowired
    private CycleTrackingService trackingService;

    private String getUsername(Authentication auth, String fallback) {
        if (auth != null && auth.isAuthenticated() && !auth.getName().equals("anonymousUser")) {
            return auth.getName();
        }
        return fallback;
    }

    /**
     * POST /api/tracker/log
     * Log daily symptoms & flow
     */
    @PostMapping("/log")
    public ResponseEntity<?> logDaily(
            Authentication auth,
            @RequestParam(value = "username", required = false) String fallbackUser,
            @RequestBody SymptomLog log
    ) {
        String username = getUsername(auth, fallbackUser);
        if (username == null) {
            return ResponseEntity.status(401).body("Authentication required");
        }
        return ResponseEntity.ok(trackingService.logDailySymptoms(username, log));
    }

    /**
     * GET /api/tracker/monthly?year=2026&month=11
     * Get all logs for a month to render dots on the calendar
     */
    @GetMapping("/monthly")
    public ResponseEntity<?> getMonthly(
            Authentication auth,
            @RequestParam(value = "username", required = false) String fallbackUser,
            @RequestParam(value = "year", required = false) Integer year,
            @RequestParam(value = "month", required = false) Integer month
    ) {
        String username = getUsername(auth, fallbackUser);
        if (username == null) {
            return ResponseEntity.status(401).body("Authentication required");
        }
        int y = (year != null) ? year : LocalDate.now().getYear();
        int m = (month != null) ? month : LocalDate.now().getMonthValue();

        return ResponseEntity.ok(trackingService.getMonthlyLogs(username, y, m));
    }

    /**
     * GET /api/tracker/analytics
     * Get cycle day, current phase, predicted next period & ovulation window
     */
    @GetMapping("/analytics")
    public ResponseEntity<?> getAnalytics(
            Authentication auth,
            @RequestParam(value = "username", required = false) String fallbackUser
    ) {
        String username = getUsername(auth, fallbackUser);
        if (username == null) {
            return ResponseEntity.status(401).body("Authentication required");
        }
        return ResponseEntity.ok(trackingService.calculateCycleAnalytics(username));
    }
}