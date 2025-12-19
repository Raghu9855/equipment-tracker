const path = require('path');
const fs = require('fs');
const sqlite3 = require('sqlite3').verbose();

// Vercel serverless environment is read-only except for /tmp
// This means data will reset occasionally, but it allows the app to run.
const isVercel = process.env.VERCEL === '1';
const dbPath = isVercel
  ? path.resolve('/tmp', 'equipment.db')
  : path.resolve(__dirname, 'equipment.db');

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error opening database', err.message);
  } else {
    console.log('Connected to the SQLite database.');
  }
});

function initDb() {
  db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS equipment (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      type TEXT NOT NULL,
      status TEXT NOT NULL,
      last_cleaned TEXT
    )`);

    // Seed with initial data if empty
    db.get("SELECT count(*) as count FROM equipment", (err, row) => {
      if (err) {
        console.error(err.message);
        return;
      }
      if (row.count === 0) {
        console.log("Seeding database...");
        const stmt = db.prepare("INSERT INTO equipment (name, type, status, last_cleaned) VALUES (?, ?, ?, ?)");
        stmt.run("Bioreactor A", "Machine", "Active", "2023-10-10");
        stmt.run("Mixing Tank 1", "Tank", "Under Maintenance", "2023-09-15");
        stmt.run("Vessel 42", "Vessel", "Inactive", "2023-11-01");
        stmt.finalize();
      }
    });

  });
}

module.exports = { db, initDb };
