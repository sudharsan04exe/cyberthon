const mongoose = require('mongoose');

const cdrSchema = new mongoose.Schema({
    from_no: String,
    to_no: String,
    date: Date,
    time: String,
    duration: Number,
    cell_1_id: Number,
    cell_2_id: Number,
    type: Number,
    imei: String,
    imsi: String,
    roaming: Boolean
});

module.exports = mongoose.model('CDR', cdrSchema);
