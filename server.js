const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static(__dirname));

const db = mysql.createConnection({
    host: 'sql12.freesqldatabase.com', 
    user: 'sql12763765', 
    password: '@LITTLEflock-123', 
    database: 'sql12763765'
});

db.connect(err => {
    if (err) {
        console.error("❌ Database connection failed:", err);
        return;
    }
    console.log("✅ Connected to MySQL database");
});

// ✅ Save Score for Game1 and Game2 Separately
app.post('/save-score', (req, res) => {
    const { username, score, game } = req.body;
    if (!username || score === undefined || !game) {
        return res.status(400).json({ error: 'Invalid data' });
    }

    let table = game === "game1" ? "Gen1_scores" : "Gen2_scores";

    db.query(`INSERT INTO ${table} (username, score) VALUES (?, ?)`, [username, score], (err) => {
        if (err) return res.status(500).json({ error: 'Database error' });
        res.json({ message: 'Score saved' });
    });
});

// ✅ Fetch Leaderboard for Each Game Separately
app.get('/leaderboard', (req, res) => {
    const { game } = req.query;
    if (!game) return res.status(400).json({ error: 'Game not specified' });

    let table = game === "game1" ? "Gen1_scores" : "Gen2_scores";

    db.query(`INSERT INTO ${table} (username, score) VALUES (?, ?)`, [username, score], (err) => {
    if (err) {
        console.error("❌ Database Insert Error:", err);
        return res.status(500).json({ error: 'Database error' });
    }
    console.log(`✅ Score saved: ${username} - ${score} in ${table}`);
    res.json({ message: 'Score saved' });
});

});


// ✅ Start Server
const PORT = process.env.PORT || 10000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`✅ Server running on port ${PORT}`);
});
