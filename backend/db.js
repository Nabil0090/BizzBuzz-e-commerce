const mysql = require('mysql2');

// Create MySQL connection
const db = mysql.createConnection({
  host: 'localhost',          // Update with correct host
  user: 'root',               // Replace with your MySQL username
  password: 'password',       // Replace with your MySQL password
  database: 'BIZZBUZZ'        // Replace with your database name
});

// Connect to MySQL
db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err.stack);
    return;
  }
  console.log('Connected to MySQL as ID', db.threadId);
});

module.exports = db;
