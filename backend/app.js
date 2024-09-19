const express = require('express');
const bodyParser = require('body-parser');
const cors = require("cors");

const app = express();
const port = 3080;

app.use(bodyParser.urlencoded({ extended: true, limit: '100mb' }));
app.use(bodyParser.json({ limit: '100mb' }));
app.use(cors());

const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const reviewsRoutes = require('./routes/reviewsRoutes');
const complaintRoutes = require('./routes/complaintRoutes');
const cartRoutes = require('./routes/cartRoutes');
const cartProductJunctionRoutes = require('./routes/cartProductJunctionRoutes');

app.use('/', userRoutes);
app.use('/', productRoutes);
app.use('/', reviewsRoutes);
app.use('/', complaintRoutes);
app.use('/', cartRoutes);
app.use('/', cartProductJunctionRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
