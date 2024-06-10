// databaseInitializer.js

const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Function to initialize the SQLite database
function initializeDatabase() {
    // Define the path to the SQLite database file
    const dbPath = path.resolve(__dirname, 'mydatabase.db');

    // Open a connection to the SQLite database file
    const db = new sqlite3.Database(dbPath);

    // Create the table (if it doesn't exist)
    db.serialize(() => {
        db.run(`CREATE TABLE IF NOT EXISTS data (
            id INTEGER PRIMARY KEY,
            open FLOAT,
            close FLOAT,
	    high FLOAT,
	    low FLOAT
        )`);
    });

    // Close the database connection
    db.close();
}

module.exports = initializeDatabase;

