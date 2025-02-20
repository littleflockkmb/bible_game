const server = require('http').createServer(app);

server.keepAliveTimeout = 120000; // 120 seconds
server.headersTimeout = 120000; // 120 seconds

const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
    host: 'sql12.freesqldatabase.com',
    user: 'sql12763765',
    password: 'ZdwJzc6RV1',
    database: 'sql12763765'
});

db.connect(err => {
    if (err) {
        console.error('Database connection failed:', err);
        return;
    }
    console.log('Connected to MySQL database');
});

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

app.get('/leaderboard', (req, res) => {
    db.query('SELECT username, score FROM scores ORDER BY score DESC LIMIT 10', (err, results) => {
        if (err) return res.status(500).json({ error: 'Database error' });
        res.json(results);
    });
});

const PORT = process.env.PORT || 10000; // Render uses dynamic ports
server.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
});

