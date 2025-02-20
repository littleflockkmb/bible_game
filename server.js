const express = require('express');
const mysql = require('mysql2'); // Use 'mysql2' for better stability
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// Fix: Create server AFTER defining 'app'
const server = require('http').createServer(app);

const db = mysql.createConnection({
    host: 'sql12.freesqldatabase.com',  // Your database host
    user: 'sql12763765',               // Your database username
    password: '@LITTLEflock-123',// Your database password
    database: 'sql12763765'            // Your database name
});

db.connect(err => {
    if (err) {
        console.error("❌ Database connection failed:", err);
        return;
    }
    console.log("✅ Connected to MySQL database");
});
app.get('/', (req, res) => {
    res.send("✅ Bible Game API is Running! Use /leaderboard or /save-score");
});

// Route to Save Score
app.post('/save-score', (req, res) => {
    const { username, score } = req.body;
    if (!username || score === undefined) {
        return res.status(400).json({ error: 'Invalid data' });
    }
    db.query('INSERT INTO scores (username, score) VALUES (?, ?)', [username, score], (err) => {
        if (err) return res.status(500).json({ error: 'Database error' });
        res.json({ message: 'Score saved' });
    });
});

// Route to Get Leaderboard
app.get('/leaderboard', (req, res) => {
    db.query('SELECT username, score FROM scores ORDER BY score DESC LIMIT 10', (err, results) => {
        if (err) return res.status(500).json({ error: 'Database error' });
        res.json(results);
    });
});

// Fix: Start server with proper port and timeouts
const PORT = process.env.PORT || 10000;
server.keepAliveTimeout = 120000;
server.headersTimeout = 120000;

server.listen(PORT, '0.0.0.0', () => {
    console.log(`✅ Server running on port ${PORT}`);
});
