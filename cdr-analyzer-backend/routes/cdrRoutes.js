const express = require('express');
const router = express.Router();
const CdrModel = require('../models/CDR'); // Ensure the model path is correct
const multer = require('multer');
const path = require('path');
const XLSX = require('xlsx');
const fs = require('fs');
const UploadedFile = require('../models/uploadedFileModel'); // Model for storing metadata

// ✅ Ensure uploads directory exists
const uploadDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// ✅ Multer Configuration for File Upload
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, uploadDir),
    filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`)
});
const upload = multer({ storage });

// ✅ Fetch all CDR records
router.get('/fetch-cdr', async (req, res) => {
    try {
        const cdrs = await CdrModel.find({});
        res.status(200).json({ success: true, data: cdrs });
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch CDR data", details: error.message });
    }
});

// ✅ Upload & Process CDR File (CSV or Excel)
router.post('/upload', upload.single('cdrFile'), async (req, res) => {
    if (!req.file) return res.status(400).json({ message: 'No file uploaded' });

    try {
        // Read the uploaded Excel file
        const workbook = XLSX.readFile(req.file.path);
        const sheetName = workbook.SheetNames[0];
        const sheet = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);

        if (!sheet.length) {
            fs.unlinkSync(req.file.path);
            return res.status(400).json({ message: "Empty file uploaded" });
        }

        // Normalize data according to expected field format
        const normalizedData = sheet.map(record => ({
            from_no: String(record.from_no || ''),
            to_no: String(record.to_no || ''),
            date: record.date ? new Date(record.date) : null,
            time: String(record.time || ''),
            duration: parseFloat(record.duration) || 0,
            cell_1_id: parseInt(record.cell_1_id) || 0,
            cell_2_id: parseInt(record.cell_2_id) || 0,
            type: parseInt(record.type) || 0,
            imei: String(record.imei || ''),
            imsi: String(record.imsi || ''),
            roaming: record.roaming === "1"  // Converting "1" to true
        }));

        // Insert records into MongoDB
        await CdrModel.insertMany(normalizedData);

        // ✅ Save file metadata
        await UploadedFile.create({
            filename: req.file.filename,
            originalname: req.file.originalname,
            uploadedBy: req.body.uploadedBy,  // Make sure to send uploadedBy in the request body
            uploadDate: new Date(),
        });

        // Cleanup: Delete the temporary file after processing
        fs.unlinkSync(req.file.path);

        res.status(200).json({ message: `Uploaded & Inserted ${normalizedData.length} records` });
    } catch (error) {
        res.status(500).json({ error: "Failed to process file", details: error.message });
    }
});

// ✅ List uploaded files
router.get("/uploaded-files", async (req, res) => {
    try {
        const files = await UploadedFile.find();  // Get metadata of uploaded files
        res.json(files);
    } catch (error) {
        res.status(500).json({ error: "Error fetching uploaded files", message: error.message });
    }
});

module.exports = router;
