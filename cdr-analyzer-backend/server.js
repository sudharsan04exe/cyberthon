const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

// ✅ Middleware
app.use(cors());
app.use(express.json());

// ✅ Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/cdrDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("✅ MongoDB Connected"))
.catch(err => console.error("🔥 MongoDB Connection Error:", err));

// ✅ Import Routes
const cdrRoutes = require('./routes/cdrRoutes'); 
app.use('/api/cdr', cdrRoutes);

// ✅ Serve static files (optional)
app.use('/uploads', express.static('uploads'));

// ✅ Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
