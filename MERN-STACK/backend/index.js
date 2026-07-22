require("dotenv").config(); 
const express = require("express"); 
const cors = require("cors"); 
const db = require("./models"); 
const app = express(); 
 
// Middleware 
app.use(cors({ 
    origin: "http://localhost:3000", 
    credentials: true 
})); 
 
app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 

const bookRoutes = require("./routes/bookRoutes");
app.use("/api/books", bookRoutes);

const userRoutes = require("./routes/userRoutes");
app.use("/api/users", userRoutes);
 
// Test database connection 
db.sequelize.authenticate() 
    .then(() => { 
        console.log("✓ Koneksi ke database MySQL berhasil!"); 
    }) 
    .catch((err) => { 
        console.error("✗ Koneksi ke database gagal:", err.message); 
        process.exit(1); 
    }); 
 
// Basic Routes 
app.get("/", (req, res) => { 
    res.json({ 
        message: "Server berjalan dengan baik", 
        status: "active", 
        timestamp: new Date() 
    }); 
}); 
 
app.get("/api/info", (req, res) => {
  res.json({
    message: "API MERN Stack Build by Express JS",
    version: "1.0.0",
    status: "active",
    database: "Connected with Sequelize",
    timestamp: new Date(),
  });
});

// 404 Handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

// Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: "Internal server error",
    error: err.message,
  });
});

// Start Server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`✓ Server running on port ${PORT}`);
  console.log(`✓ API available at http://localhost:${PORT}`);
});