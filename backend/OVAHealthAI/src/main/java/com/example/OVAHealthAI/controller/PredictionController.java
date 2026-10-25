package com.example.OVAHealthAI.controller;

import com.example.OVAHealthAI.entity.Scan;
import com.example.OVAHealthAI.repo.ScanRepository;
import com.example.OVAHealthAI.service.ReportService;
import com.example.OVAHealthAI.service.ScanService;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.*;

import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class PredictionController {

    @Autowired
    private ScanService service;

    @Autowired
    private ReportService reportService;
    @Autowired
    private ScanRepository scanRepository;

    @GetMapping("/scans/{id}/report")
    public ResponseEntity<byte[]> downloadReport(@PathVariable Long id) {
        Scan scan = service.getScanById(id);

        byte[] pdfBytes = reportService.generateReport(scan);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_PDF);
        headers.setContentDispositionFormData("attachment", "PCOS-Report-" + id + ".pdf");

        return new ResponseEntity<>(pdfBytes, headers, HttpStatus.OK);
    }


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