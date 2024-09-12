const express = require('express');
const bodyParser = require('body-parser');
const cors = require("cors")

const app = express();
const port = 3080;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

// Import routes
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const reviewsRoutes = require('./routes/reviewsRoutes');
const complaintRoutes = require('./routes/complaintRoutes');
const cartRoutes = require('./routes/cartRoutes');
const cartProductJunctionRoutes = require('./routes/cartProductJunctionRoutes'); // Corrected the duplicate require

// Use routes
app.use('/', userRoutes);
app.use('/', productRoutes);
app.use('/', reviewsRoutes);
app.use('/', complaintRoutes);
app.use('/', cartRoutes);
app.use('/', cartProductJunctionRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
