const mongoose = require('mongoose');

const CDRSchema = new mongoose.Schema({
    from_no: String,
    to_no: String,
    date: Date,   // Change to Date
    time: String,
    duration: Number,  // Change to Number
    cell_1_id: Number, // Change to Number
    cell_2_id: Number, // Change to Number
    type: Number, // Change to Number
    imei: String,
    imsi: String,
    roaming: Boolean  // Ensure you convert 1 = true, 0 = false
});

// Export model
module.exports = mongoose.model('CDR', CDRSchema);
