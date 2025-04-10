const express = require('express');
const router = express.Router();
const CdrModel = require('../models/CDR');
const multer = require('multer');
const path = require('path');
const XLSX = require('xlsx');
const fs = require('fs');

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
    if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
    }

    try {
        // ✅ Read Excel file
        const workbook = XLSX.readFile(req.file.path);
        const sheetName = workbook.SheetNames[0];
        const sheet = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);

        if (!sheet.length) {
            fs.unlinkSync(req.file.path);
            return res.status(400).json({ message: "Empty file uploaded" });
        }

        // ✅ Normalize Data Fields Before Inserting
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
            roaming: record.roaming === "1"
        }));

        await CdrModel.insertMany(normalizedData);
        fs.unlinkSync(req.file.path);
        res.status(200).json({ message: `Uploaded & Inserted ${normalizedData.length} records` });
    } catch (error) {
        res.status(500).json({ error: "Failed to process file", details: error.message });
    }
});

// ✅ Insert a new CDR manually
router.post('/add-cdr', async (req, res) => {
    try {
        const newCdr = new CdrModel(req.body);
        await newCdr.save();
        res.status(201).json({ message: "CDR added successfully", data: newCdr });
    } catch (error) {
        res.status(500).json({ error: "Failed to add CDR", details: error.message });
    }
});
// ✅ Update Date Format for All CDRs
router.put('/update-date-format', async (req, res) => {
    try {
        // Find all records where date is stored as a string
        const cdrs = await CdrModel.find({});

        const bulkOps = cdrs
            .filter(cdr => typeof cdr.date === 'string')
            .map(cdr => ({
                updateOne: {
                    filter: { _id: cdr._id },
                    update: { $set: { date: new Date(cdr.date) } }
                }
            }));

        if (bulkOps.length > 0) {
            await CdrModel.bulkWrite(bulkOps);
            return res.status(200).json({ message: `Updated ${bulkOps.length} records successfully!` });
        }

        res.status(200).json({ message: "No records needed updating." });
    } catch (error) {
        res.status(500).json({ error: "Failed to update date format", details: error.message });
    }
});



// ✅ List uploaded files
router.get('/uploaded-files', (req, res) => {
    fs.readdir(uploadDir, (err, files) => {
        if (err) {
            return res.status(500).json({ error: "Failed to fetch uploaded files" });
        }

        const fileList = files.map(filename => ({
            filename: filename,
            uploadDate: fs.statSync(path.join(uploadDir, filename)).mtime
        }));

        res.json(fileList);
    });
});

module.exports = router;