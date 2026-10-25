package com.example.OVAHealthAI.service;

import com.example.OVAHealthAI.entity.Scan;
import com.lowagie.text.*;
import com.lowagie.text.pdf.*;
import com.lowagie.text.pdf.draw.LineSeparator;
import org.springframework.stereotype.Service;

import java.awt.Color;
import java.io.ByteArrayOutputStream;
import java.time.format.DateTimeFormatter;

@Service
public class ReportService {

    public byte[] generateReport(Scan scan) {
        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        Document document = new Document(PageSize.A4, 50, 50, 50, 50);

        try {
            PdfWriter.getInstance(document, baos);
            document.open();

            // --- Fonts ---
            Font titleFont = new Font(Font.HELVETICA, 22, Font.BOLD, new Color(98, 0, 238));
            Font headerFont = new Font(Font.HELVETICA, 14, Font.BOLD, new Color(33, 33, 33));
            Font bodyFont = new Font(Font.HELVETICA, 11, Font.NORMAL, new Color(66, 66, 66));
            Font labelFont = new Font(Font.HELVETICA, 10, Font.BOLD, new Color(100, 100, 100));
            Font valueFont = new Font(Font.HELVETICA, 12, Font.NORMAL, new Color(33, 33, 33));

            // --- Header ---
            Paragraph title = new Paragraph("OVAHealth AI — PCOS Scan Report", titleFont);
            title.setAlignment(Element.ALIGN_CENTER);
            title.setSpacingAfter(8);
            document.add(title);

            Paragraph subtitle = new Paragraph("Confidential Medical Document", labelFont);
            subtitle.setAlignment(Element.ALIGN_CENTER);
            subtitle.setSpacingAfter(20);
            document.add(subtitle);

            // Divider line
            LineSeparator line = new LineSeparator();
            line.setLineColor(new Color(200, 200, 200));
            document.add(new Chunk(line));
            document.add(Chunk.NEWLINE);

            // --- Patient Info Table ---
            PdfPTable infoTable = new PdfPTable(2);
            infoTable.setWidthPercentage(100);
            infoTable.setSpacingBefore(10);
            infoTable.setSpacingAfter(20);

            addTableRow(infoTable, "Scan ID", "PCOS-" + scan.getId(), labelFont, valueFont);
            addTableRow(infoTable, "Date",
                    scan.getTimestamp() != null
                            ? scan.getTimestamp().format(DateTimeFormatter.ofPattern("MMM dd, yyyy — hh:mm a"))
                            : "N/A",
                    labelFont, valueFont);
            addTableRow(infoTable, "Status", scan.getStatus(), labelFont, valueFont);

            document.add(infoTable);

            // --- Result Section ---
            document.add(new Paragraph("Diagnosis Result", headerFont));
            document.add(Chunk.NEWLINE);

            boolean isPCOS = scan.getPrediction() != null &&
                    (scan.getPrediction().toLowerCase().contains("detected") ||
                            scan.getPrediction().toLowerCase().contains("positive"));

            Font resultFont = new Font(Font.HELVETICA, 16, Font.BOLD,
                    isPCOS ? new Color(186, 26, 26) : new Color(21, 128, 61));

            Paragraph resultText = new Paragraph(
                    isPCOS ? "⚠ PCOS Detected" : "✓ No PCOS Detected (Negative)", resultFont);
            resultText.setSpacingAfter(8);
            document.add(resultText);

            String confStr = scan.getConfidence() != null
                    ? String.format("%.1f%%", scan.getConfidence())
                    : "N/A";
            document.add(new Paragraph("Confidence Score: " + confStr, valueFont));
            document.add(Chunk.NEWLINE);

            // --- AI Explanation ---
            document.add(new Chunk(line));
            document.add(Chunk.NEWLINE);
            document.add(new Paragraph("AI Analysis Summary", headerFont));
            document.add(Chunk.NEWLINE);

            String reportText = (scan.getReport() != null && !scan.getReport().isEmpty())
                    ? scan.getReport()
                    : "No detailed analysis available for this scan.";
            Paragraph reportParagraph = new Paragraph(reportText, bodyFont);
            reportParagraph.setLeading(18);
            document.add(reportParagraph);
            document.add(Chunk.NEWLINE);

            // --- Recommendations ---
            document.add(new Chunk(line));
            document.add(Chunk.NEWLINE);
            document.add(new Paragraph("Recommended Next Steps", headerFont));
            document.add(Chunk.NEWLINE);

            if (isPCOS) {
                document.add(new Paragraph("1. Schedule a consultation with an endocrinologist.", bodyFont));
                document.add(new Paragraph("2. Get a blood panel (Testosterone, LH/FSH, Insulin).", bodyFont));
                document.add(new Paragraph("3. Consider a low-glycemic diet and regular exercise.", bodyFont));
                document.add(new Paragraph("4. Follow up with a repeat ultrasound in 3–6 months.", bodyFont));
            } else {
                document.add(new Paragraph("1. Continue routine annual checkups.", bodyFont));
                document.add(new Paragraph("2. Maintain a balanced diet and active lifestyle.", bodyFont));
                document.add(new Paragraph("3. Monitor menstrual cycle regularity.", bodyFont));
            }

            document.add(Chunk.NEWLINE);
            document.add(Chunk.NEWLINE);

            // --- Disclaimer ---
            Font disclaimerFont = new Font(Font.HELVETICA, 8, Font.ITALIC, new Color(150, 150, 150));
            Paragraph disclaimer = new Paragraph(
                    "Disclaimer: This report is AI-generated and intended for informational purposes only. " +
                            "It does not constitute medical advice. Please consult a qualified healthcare professional " +
                            "for clinical decisions.", disclaimerFont);
            disclaimer.setAlignment(Element.ALIGN_CENTER);
            document.add(disclaimer);

        } catch (Exception e) {
            throw new RuntimeException("PDF generation failed: " + e.getMessage(), e);
        } finally {
            document.close();
        }

        return baos.toByteArray();
    }

    private void addTableRow(PdfPTable table, String label, String value,
                             Font labelFont, Font valueFont) {
        PdfPCell labelCell = new PdfPCell(new Phrase(label, labelFont));
        labelCell.setBorder(Rectangle.NO_BORDER);
        labelCell.setPadding(6);
        table.addCell(labelCell);

        PdfPCell valueCell = new PdfPCell(new Phrase(value, valueFont));
        valueCell.setBorder(Rectangle.NO_BORDER);
        valueCell.setPadding(6);
        table.addCell(valueCell);
    }
}
