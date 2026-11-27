package com.example.OVAHealthAI.controller;

import com.example.OVAHealthAI.entity.PatientProfile;
import com.example.OVAHealthAI.service.PatientProfileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/profile")
@CrossOrigin(origins = "*")
public class PatientProfileController {

    @Autowired
    private PatientProfileService profileService;

    // Helper to get authenticated username from JWT context
    private String getCurrentUsername(Authentication auth, String fallbackUsername) {
        if (auth != null && auth.isAuthenticated() && !auth.getName().equals("anonymousUser")) {
            return auth.getName();
        }
        // Fallback for development if token isn't passed in header
        return fallbackUsername;
    }

    /**
     * GET /api/profile
     * Returns the authenticated user's profile ONLY
     */
    @GetMapping
    public ResponseEntity<?> getMyProfile(
            Authentication authentication,
            @RequestParam(value = "username", required = false) String fallbackUser
    ) {
        String username = getCurrentUsername(authentication, fallbackUser);
        if (username == null) {
            return ResponseEntity.status(401).body("Authentication required to view health profile");
        }
        return ResponseEntity.ok(profileService.getOrCreateProfile(username));
    }

    /**
     * PUT /api/profile
     * Updates the authenticated user's profile ONLY
     */
    @PutMapping
    public ResponseEntity<?> updateMyProfile(
            Authentication authentication,
            @RequestParam(value = "username", required = false) String fallbackUser,
            @RequestBody PatientProfile profileData
    ) {
        String username = getCurrentUsername(authentication, fallbackUser);
        if (username == null) {
            return ResponseEntity.status(401).body("Authentication required to update health profile");
        }
        return ResponseEntity.ok(profileService.updateProfile(username, profileData));
    }
}