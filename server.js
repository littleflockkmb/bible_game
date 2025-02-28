const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const path = require('path');
require('dotenv').config(); // ✅ Load environment variables

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static(__dirname));

// ✅ Use a connection pool (prevents "closed state" error)
const pool = mysql.createPool({
    connectionLimit: 10, // ✅ Allows multiple connections
    host: process.env.DB_HOST || 'sql206.infinityfree.com',
    user: process.env.DB_USER || 'if0_38415521',
    password: process.env.DB_PASS || 'X1n0cRaCgl',
    database: process.env.DB_NAME || 'if0_38415521_littleflockdb',
    port: process.env.DB_PORT || 3306,
    waitForConnections: true,
    queueLimit: 0
});

// ✅ Check database connection
pool.getConnection((err, connection) => {
    if (err) {
        console.error("❌ Database connection failed:", err);
    } else {
        console.log("✅ Connected to MySQL database");
        connection.release(); // ✅ Release the connection back to the pool
    }
});

// ✅ Save Score for Game1 and Game2 Separately
app.post('/save-score', (req, res) => {
    const { username, score, game } = req.body;
    if (!username || score === undefined || !game) {
        return res.status(400).json({ error: 'Invalid data' });
    }

    let table = game === "game1" ? "game1_scores" : "game2_scores";

    pool.query(`INSERT INTO ${table} (username, score) VALUES (?, ?)`, [username, score], (err) => {
        if (err) {
            console.error("❌ Database Insert Error:", err);
            return res.status(500).json({ error: 'Database error' });
        }
        console.log(`✅ Score saved: ${username} - ${score} in ${table}`);
        res.json({ message: 'Score saved' });
    });
});

// ✅ Fetch Leaderboard for Each Game Separately
app.get('/leaderboard', (req, res) => {
    const { game } = req.query;
    if (!game) return res.status(400).json({ error: 'Game not specified' });

    let table = game === "game1" ? "game1_scores" : "game2_scores";

    pool.query(`SELECT username, score FROM ${table} ORDER BY score DESC LIMIT 10`, (err, results) => {
        if (err) {
            console.error("❌ Database Fetch Error:", err);
            return res.status(500).json({ error: 'Database error' });
        }
        res.json(results);
    });
});

// ✅ Start Server
const PORT = process.env.PORT || 10000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`✅ Server running on port ${PORT}`);
});
