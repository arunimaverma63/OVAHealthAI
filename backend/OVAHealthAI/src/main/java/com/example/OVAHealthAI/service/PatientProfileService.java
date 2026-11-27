package com.example.OVAHealthAI.service;

import com.example.OVAHealthAI.entity.PatientProfile;
import com.example.OVAHealthAI.entity.User;
import com.example.OVAHealthAI.repo.PatientProfileRepository;
import com.example.OVAHealthAI.repo.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PatientProfileService {

    @Autowired
    private PatientProfileRepository profileRepository;

    @Autowired
    private UserRepo userRepo;

    /**
     * Get profile for currently authenticated username.
     * If profile doesn't exist yet, creates an empty initial profile.
     */
    public PatientProfile getOrCreateProfile(String username) {
        User user = userRepo.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found: " + username));

        return profileRepository.findByUser(user).orElseGet(() -> {
            PatientProfile newProfile = new PatientProfile();
            newProfile.setUser(user);
            return profileRepository.save(newProfile);
        });
    }

    /**
     * Update profile for the authenticated username.
     */
    public PatientProfile updateProfile(String username, PatientProfile updatedData) {
        PatientProfile profile = getOrCreateProfile(username);

        // Update biometrics
        profile.setAge(updatedData.getAge());
        profile.setBloodGroup(updatedData.getBloodGroup());
        profile.setHeightCm(updatedData.getHeightCm());
        profile.setWeightKg(updatedData.getWeightKg());

        // Update cycle history
        profile.setAverageCycleLength(updatedData.getAverageCycleLength());
        profile.setPeriodDuration(updatedData.getPeriodDuration());
        profile.setLastPeriodDate(updatedData.getLastPeriodDate());

        // Update PCOS markers
        profile.setDiagnosedPcos(updatedData.getDiagnosedPcos());
        profile.setPcosType(updatedData.getPcosType());
        profile.setPrimarySymptoms(updatedData.getPrimarySymptoms());

        // Update labs
        profile.setFastingInsulin(updatedData.getFastingInsulin());
        profile.setFastingGlucose(updatedData.getFastingGlucose());
        profile.setTestosterone(updatedData.getTestosterone());
        profile.setAmh(updatedData.getAmh());

        // Update lifestyle
        profile.setActiveMedications(updatedData.getActiveMedications());
        profile.setDietPreference(updatedData.getDietPreference());

        return profileRepository.save(profile);
    }
}