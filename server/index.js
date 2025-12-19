const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { db, initDb } = require('./db');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(bodyParser.json());

// Initialize Database
// Using SQLite here because it's zero-config and great for these kinds of standalone assessments.
// In production, I'd swap this connection string for PostgreSQL or similar.
initDb();

// Routes

// GET all equipment
app.get('/api/equipment', (req, res) => {
    db.all("SELECT * FROM equipment ORDER BY id DESC", [], (err, rows) => {
        if (err) {
            res.status(400).json({ "error": err.message });
            return;
        }
        res.json({
            "message": "success",
            "data": rows
        });
    });
});

// GET single equipment (optional but good practice)
app.get('/api/equipment/:id', (req, res) => {
    const params = [req.params.id];
    db.get("SELECT * FROM equipment WHERE id = ?", params, (err, row) => {
        if (err) {
            res.status(400).json({ "error": err.message });
            return;
        }
        res.json({
            "message": "success",
            "data": row
        });
    });
});

// POST new equipment
app.post('/api/equipment', (req, res) => {
    const { name, type, status, last_cleaned } = req.body;

    // Basic validation - ensuring we don't get bad data in.
    // Ideally this would use a validation library like Joi or Zod.
    if (!name || !type || !status) {
        res.status(400).json({ error: "Please provide all required fields" });
        return;
    }

    const sql = "INSERT INTO equipment (name, type, status, last_cleaned) VALUES (?,?,?,?)";
    const params = [name, type, status, last_cleaned];

    db.run(sql, params, function (err, result) {
        if (err) {
            res.status(400).json({ "error": err.message });
            return;
        }
        // Return the ID so the frontend can update the list optimistically or strictly
        res.json({
            "message": "success",
            "data": { id: this.lastID, ...req.body },
            "id": this.lastID
        });
    });
});

// PUT update equipment
app.put('/api/equipment/:id', (req, res) => {
    const { name, type, status, last_cleaned } = req.body;
    const sql = `UPDATE equipment set 
     name = COALESCE(?,name), 
     type = COALESCE(?,type), 
     status = COALESCE(?,status), 
     last_cleaned = COALESCE(?,last_cleaned) 
     WHERE id = ?`;
    const params = [name, type, status, last_cleaned, req.params.id];

    db.run(sql, params, function (err, result) {
        if (err) {
            res.status(400).json({ "error": err.message });
            return;
        }
        res.json({
            message: "success",
            data: req.body,
            changes: this.changes
        });
    });
});

// DELETE equipment
app.delete('/api/equipment/:id', (req, res) => {
    const sql = 'DELETE FROM equipment WHERE id = ?';
    const params = [req.params.id];

    db.run(sql, params, function (err, result) {
        if (err) {
            res.status(400).json({ "error": res.message });
            return;
        }
        res.json({ "message": "deleted", changes: this.changes });
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
