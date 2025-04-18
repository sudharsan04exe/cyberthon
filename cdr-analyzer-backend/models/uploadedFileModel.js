const mongoose = require('mongoose');

const uploadedFileSchema = new mongoose.Schema({
    filename: String,
    originalname: String,
    uploadedBy: String,
    uploadDate: { type: Date, default: Date.now },
});

module.exports = mongoose.model('UploadedFile', uploadedFileSchema);
