const db = require('../db');

const getAllProducts = (req, res) => {
  const query = 'SELECT * FROM PRODUCT';
  
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching products:', err);
      res.status(500).send('Error fetching products from the database.');
    } else {
      res.json(results);
    }
  });
};

module.exports = {
  getAllProducts,
};
