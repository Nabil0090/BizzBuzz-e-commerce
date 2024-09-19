const db = require('../db');

const getAllProducts = (req, res) => {
  const query = 'SELECT * FROM PRODUCT';
  
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching products:', err);
      res.status(500).json('Error fetching products from the database.');
    } else {
      res.json(results);
    }
  });
};

const insertProduct = (req, res) => {
  const { quantity, description, price, available, name, picture, seller_id } = req.body;

  const pictureBuffer = Buffer.from(picture.split(",")[1], 'base64');

  const query = 'INSERT INTO PRODUCT (QUANTITY, DESCRIPTION, PRICE, AVAILABLE, NAME, PICTURE, SELLER_ID) VALUES (?, ?, ?, ?, ?, ?, ?)';
  const values = [quantity, description, price, available, name, pictureBuffer, seller_id];

  db.query(query, values, (err, results) => {
    if (err) {
      console.error('Error inserting new product:', err);
      res.status(500).json('Error inserting new product into the database.');
    } else {
      res.status(201).json('Product inserted successfully!');
    }
  });
};


const getProductsBySeller = (req, res) => {
  const { sellerId } = req.params;

  const query = 'SELECT * FROM PRODUCT WHERE SELLER_ID = ?';
  
  db.query(query, [sellerId], (err, results) => {
    if (err) {
      console.error('Error fetching products by seller:', err);
      res.status(500).json('Error fetching products by seller from the database.');
    } else {
      
      const products = results.map(product => ({
        ...product,
        picture: product.PICTURE ? `data:image/jpeg;base64,${product.PICTURE.toString('base64')}` : null
      }));
      res.json(products);
    }
  });
};

const getProductById = (req, res) => {
  const { id } = req.params; 

  const query = 'SELECT * FROM PRODUCT WHERE PRODUCT_ID = ?';
  
  db.query(query, [id], (err, results) => {
    if (err) {
      console.error('Error fetching product by ID:', err);
      res.status(500).json('Error fetching product from the database.');
    } else {
      if (results.length > 0) {
        res.json(results[0]);
      } else {
        res.status(404).json('Product not found.');
      }
    }
  });
};

const updateProduct = (req, res) => {
  const { id } = req.params;
  const { NAME, DESCRIPTION, PRICE, QUANTITY, AVAILABLE, PICTURE } = req.body;

  const pictureBuffer = PICTURE ? Buffer.from(PICTURE.split(",")[1], 'base64') : null;

  const query = `
    UPDATE PRODUCT
    SET NAME = ?, DESCRIPTION = ?, PRICE = ?, QUANTITY = ?, AVAILABLE = ?, PICTURE = ?
    WHERE PRODUCT_ID = ?
  `;
  const values = [NAME, DESCRIPTION, PRICE, QUANTITY, AVAILABLE, pictureBuffer, id];

  db.query(query, values, (err, results) => {
    if (err) {
      console.error('Error updating product:', err);
      res.status(500).json('Error updating product in the database.');
    } else {
      res.status(200).json('Product updated successfully!');
    }
  });
};



module.exports = {
  getAllProducts,
  insertProduct,
  getProductsBySeller,
  getProductById,
  updateProduct
};
