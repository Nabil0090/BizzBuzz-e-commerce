const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost',          
  user: 'root',             
  password: 'R@fat2014',       
  database: 'BIZZBUZZ'        
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err.stack);
    return;
  }
  console.log('Connected to MySQL as ID', db.threadId);
});

module.exports = db;
