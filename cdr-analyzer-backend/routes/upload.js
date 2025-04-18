// routes/upload.js
const express = require('express');
const multer = require('multer');
const CDR = require('../models/CDR');  // Adjust path if needed
const XLSX = require('xlsx');
const fs = require('fs');
const router = express.Router();

// Ensure 'uploads/' directory exists
const uploadDir = 'uploads/';
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// Set up multer for file uploads
const upload = multer({ dest: uploadDir });  // Files will be stored in 'uploads/' directory

// Endpoint for uploading Excel file
router.post('/upload-excel', upload.single('cdrFile'), async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
    }

    try {
        // Read the uploaded Excel file
        const workbook = XLSX.readFile(req.file.path);
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];

        // Parse the sheet to JSON
        const data = XLSX.utils.sheet_to_json(sheet);

        // Process each row and save to the database
        for (const row of data) {
            const newCDR = new CDR({
                from_no: row.from_no,
                to_no: row.to_no,
                date: row.date,
                time: row.time,
                duration: row.duration,
                cell_1_id: row.cell_1_id,
                cell_2_id: row.cell_2_id,
                type: row.type,
                imei: row.imei,
                imsi: row.imsi,
                roaming: row.roaming === 1,  // Convert 1 to true
                file_metadata: {
                    fileName: req.file.originalname,
                    uploadedBy: req.body.uploadedBy,  // Assuming you send this in the request body
                    uploadDate: new Date(),
                }
            });

            // Save the record to the database
            await newCDR.save();
        }

        // Remove the uploaded file after processing
        fs.unlinkSync(req.file.path);

        res.status(200).json({ success: true, message: 'File processed and data saved' });
    } catch (error) {
        res.status(500).json({ error: 'Error processing file', message: error.message });
    }
});

module.exports = router;
