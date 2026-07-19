package com.example.OVAHealthAI.controller;

import com.example.OVAHealthAI.service.ScanService;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.*;

import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class PredictionController {

    @Autowired
    private ScanService service;

    @PostMapping("/upload")
    public ResponseEntity<?> upload(
            @RequestParam("image") MultipartFile file
    ) {

        try {

            // service handles everything
            return ResponseEntity.ok(
                    service.uploadImage(file)
            );

        } catch (Exception e) {

            return ResponseEntity.badRequest()
                    .body(e.getMessage());
        }
    }

    @PostMapping("/predict-clinical")
    public ResponseEntity<?> predictClinical(
            @RequestBody java.util.Map<String, Object> params
    ) {
        try {
            return ResponseEntity.ok(
                    service.predictClinical(params)
            );
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body(e.getMessage());
        }
    }

    @GetMapping("/scans")
    public ResponseEntity<?> getAllScans() {
        return ResponseEntity.ok(service.getAllScans());
    }
}