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

app.listen(3000, () => console.log('Server running on port 3000'));
