const db = require('../db');

const getAllReviews = (req, res) => {
  const query = 'SELECT * FROM REVIEWS';
  
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching reviews:', err);
      res.status(500).send('Error fetching reviews from the database.');
    } else {
      res.json(results);
    }
  });
};

module.exports = {
  getAllReviews,
};
