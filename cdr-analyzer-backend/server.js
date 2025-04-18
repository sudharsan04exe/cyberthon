const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
const authRoutes = require('./routes/authRoutes');
const cdrRoutes = require('./routes/cdrRoutes');

const app = express();

// ✅ Middleware
app.use(cors());
app.use(express.json());

// ✅ Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/cdr_db', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log("MongoDB connected"))
.catch(err => console.error("MongoDB connection error:", err));

// ✅ Import Routes
app.use('/api/cdr', cdrRoutes);
app.use('/api/auth', authRoutes);

// ✅ Serve static files (optional)
app.use('/uploads', express.static('uploads'));

// ✅ Global error handler
app.use((err, req, res, next) => {
    console.error("🔥 Error:", err.message);
    res.status(500).json({ error: "Internal Server Error" });
});

// ✅ Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
s