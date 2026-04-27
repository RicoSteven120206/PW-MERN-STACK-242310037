const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const app = express();

app.use(
    cors({
        origin: "http://localhost:3000",
        credentials: true,
    }),
);

app.use(express.json());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "pw_praktikum_db",
});

db.connect((err) => {
    if (err) {
        console.error("Koneksi ke database gagal:", err.message);
        process.exit(1);
    }
    console.log("Koneksi ke database MYSQL berhasil");
});

app.get ("/", (req, res) => {
    res.send("Server Berjalan");
});

app.listen(3001, () => {
    console.log("Server running in port 3001");
});

app.get("/api/info", (req, res) => {
    res.json({
        message: "API MERN Stack Build by Express js",
        version: "1.0.0",
        status: "active",
        timestamp: new Date(),
    });
});