const db = require('../db');

const getAllComplaints = (req, res) => {
  const query = 'SELECT * FROM COMPLAINT';
  
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching complaints:', err);
      res.status(500).send('Error fetching complaints from the database.');
    } else {
      res.json(results);
    }
  });
};

module.exports = {
  getAllComplaints,
};
