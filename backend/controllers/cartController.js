const db = require('../db');

const getAllCarts = (req, res) => {
  const query = 'SELECT * FROM CART';
  
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching carts:', err);
      res.status(500).json('Error fetching carts from the database.');
    } else {
      res.json(results);
    }
  });
};

module.exports = {
  getAllCarts,
};
