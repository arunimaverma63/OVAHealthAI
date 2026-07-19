package com.example.OVAHealthAI.service;

import com.example.OVAHealthAI.entity.Scan;
import com.example.OVAHealthAI.repo.ScanRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.FileSystemResource;
import org.springframework.http.*;

import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;

import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.*;
import java.util.Map;
import java.util.UUID;

@Service
public class ScanService {

    @Autowired
    private RestTemplate restTemplate;

    @Autowired
    private ScanRepository repository;

    public Map<String, Object> uploadImage(MultipartFile file) throws IOException {

        // 1. validation
        if (file.isEmpty()) {
            throw new RuntimeException("File is empty");
        }

        String type = file.getContentType();

        if (!type.equals("image/jpeg") &&
                !type.equals("image/png")) {

            throw new RuntimeException("Only PNG/JPEG allowed");
        }

        // 2. generate unique filename
        String fileName =
                UUID.randomUUID()
                        + "_"
                        + file.getOriginalFilename();

        // 3. create uploads folder
        Path uploadPath = Paths.get("uploads");

        if (!Files.exists(uploadPath)) {
            Files.createDirectories(uploadPath);
        }

        // 4. save image
        Path filePath = uploadPath.resolve(fileName);

        Files.write(filePath, file.getBytes());

        // 5. save DB
        Scan scan = new Scan();

        scan.setImagePath(filePath.toString());
        scan.setStatus("PROCESSING");

        repository.save(scan);

        // =========================================
        // CALL FASTAPI & UPDATE DB
        // =========================================
        try {
            String fastApiUrl =
                    "http://127.0.0.1:8000/predict-usg";

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.MULTIPART_FORM_DATA);

            MultiValueMap<String, Object> body = new LinkedMultiValueMap<>();
            body.add("file", new FileSystemResource(filePath));

            HttpEntity<MultiValueMap<String, Object>> requestEntity =
                    new HttpEntity<>(body, headers);

            ResponseEntity<Map> response =
                    restTemplate.postForEntity(
                            fastApiUrl,
                            requestEntity,
                            Map.class
                    );

            Map<String, Object> aiResult = response.getBody();

            scan.setStatus("COMPLETED");
            scan.setPrediction(aiResult.get("prediction").toString());
            scan.setConfidence(Double.parseDouble(aiResult.get("confidence").toString()));

            if (aiResult.containsKey("explanation") && aiResult.get("explanation") != null) {
                scan.setReport(aiResult.get("explanation").toString());
            }

            repository.save(scan);
            return aiResult;

        } catch (Exception e) {
            scan.setStatus("FAILED");
            scan.setReport("AI analysis failed: " + e.getMessage());
            repository.save(scan);
            throw new RuntimeException("AI service error: " + e.getMessage(), e);
        }
    }

    public Map<String, Object> predictClinical(Map<String, Object> params) {
        try {
            String fastApiUrl = "http://127.0.0.1:8000/predict-clinical";

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

            MultiValueMap<String, Object> body = new LinkedMultiValueMap<>();
            body.add("age", params.get("age"));
            body.add("weight", params.get("weight"));
            body.add("bmi", params.get("bmi"));
            body.add("cycle_length", params.get("cycle_length"));

            HttpEntity<MultiValueMap<String, Object>> requestEntity =
                    new HttpEntity<>(body, headers);

            ResponseEntity<Map> response =
                    restTemplate.postForEntity(
                            fastApiUrl,
                            requestEntity,
                            Map.class
                    );

            Map<String, Object> aiResult = response.getBody();

            // Save clinical prediction to Database as a Scan entry (with null imagePath)
            Scan scan = new Scan();
            scan.setImagePath(null);
            scan.setStatus("COMPLETED");
            scan.setPrediction(aiResult.get("prediction").toString());
            scan.setConfidence(Double.parseDouble(aiResult.get("confidence").toString()));

            // Build a report for clinical prediction
            String age = params.get("age") != null ? params.get("age").toString() : "N/A";
            String weight = params.get("weight") != null ? params.get("weight").toString() : "N/A";
            String bmi = params.get("bmi") != null ? params.get("bmi").toString() : "N/A";
            String cycleLength = params.get("cycle_length") != null ? params.get("cycle_length").toString() : "N/A";
            String reportText = String.format(
                "Clinical Parameter Analysis. Patient Age: %s years. Weight: %s kg. BMI: %s. Cycle Length: %s days. Prediction result indicates %s with a confidence level of %s%%.",
                age, weight, bmi, cycleLength, scan.getPrediction(), scan.getConfidence()
            );
            scan.setReport(reportText);

            repository.save(scan);
            return aiResult;

        } catch (Exception e) {
            throw new RuntimeException("AI service error: " + e.getMessage(), e);
        }
    }

    public java.util.List<Scan> getAllScans() {
        return repository.findAll();
    }
}