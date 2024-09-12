const db = require('../db');

const getAllCartProducts = (req, res) => {
  const query = 'SELECT * FROM CART_PRODUCT_JUNCTION';
  
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching cart products:', err);
      res.status(500).send('Error fetching cart products from the database.');
    } else {
      res.json(results);
    }
  });
};

module.exports = {
  getAllCartProducts,
};
