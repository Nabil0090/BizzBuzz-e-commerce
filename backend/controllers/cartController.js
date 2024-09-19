const db = require('../db');
const nodemailer = require("nodemailer");


const transporter = nodemailer.createTransport({
	host: "smtp.gmail.com",
	port: 465,
	secure: true,
	auth: {
		user: "orekilol110@gmail.com",
		pass: "lgho abey edyi kglh",
	},
});

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

const sendReceiptEmail = (buyerEmail, products, totalCost) => {
  // Generate the HTML receipt content
  const productDetails = products
    .map(
      (item) => `
        <tr>
          <td style="padding: 8px; border: 1px solid #ddd;">${item.NAME}</td>
          <td style="padding: 8px; border: 1px solid #ddd;">${item.quantity}</td>
          <td style="padding: 8px; border: 1px solid #ddd;">$${item.PRICE}</td>
          <td style="padding: 8px; border: 1px solid #ddd;">$${(item.PRICE * item.quantity).toFixed(2)}</td>
        </tr>`
    )
    .join("");

  const emailHtml = `
    <h2>Thank you for your purchase!</h2>
    <p>Here is your receipt:</p>
    <table style="width: 100%; border-collapse: collapse;">
      <thead>
        <tr>
          <th style="padding: 8px; border: 1px solid #ddd;">Product Name</th>
          <th style="padding: 8px; border: 1px solid #ddd;">Quantity</th>
          <th style="padding: 8px; border: 1px solid #ddd;">Unit Price</th>
          <th style="padding: 8px; border: 1px solid #ddd;">Total Price</th>
        </tr>
      </thead>
      <tbody>
        ${productDetails}
      </tbody>
      <tfoot>
        <tr>
          <td colspan="3" style="padding: 8px; border: 1px solid #ddd; text-align: right;">Final Total:</td>
          <td style="padding: 8px; border: 1px solid #ddd;">$${totalCost.toFixed(2)}</td>
        </tr>
      </tfoot>
    </table>
    <p>If you have any questions, feel free to contact us.</p>
  `;

  // Set email options
  const mailOptions = {
    from: "orekilol110@gmail.com", // replace with your actual email
    to: buyerEmail,
    subject: "Your Receipt - Thank you for your purchase",
    html: emailHtml,
  };

  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email:", error);
    }
  });
};

// Checkout function
const checkout = (req, res) => {
  const { buyerId, products } = req.body; // products = [{ productId, quantity }, ...]
  const checkoutDate = new Date();

  if (!buyerId || !products || products.length === 0) {
    return res.status(400).json({ error: "Invalid request: missing buyerId or products." });
  }

  // Start transaction
  db.beginTransaction(async (err) => {
    if (err) {
      console.error("Transaction start error:", err);
      return res.status(500).json("Error starting transaction.");
    }

    try {
      // Get buyer's email from the database
      const buyerQuery = "SELECT EMAIL FROM USER WHERE USER_ID = ?";
      db.query(buyerQuery, [buyerId], (err, buyerResult) => {
        if (err || buyerResult.length === 0) {
          throw new Error(`Error fetching buyer's email: ${err.message}`);
        }

        const buyerEmail = buyerResult[0].EMAIL;

        // Insert into CART table
        const cartQuery = "INSERT INTO CART (CHECKOUT_DATE, BUYER_ID) VALUES (?, ?)";
        db.query(cartQuery, [checkoutDate, buyerId], (err, result) => {
          if (err) {
            throw new Error(`Error inserting into CART table: ${err.message}`);
          }

          const cartId = result.insertId;

          // Insert products into CART_PRODUCT_JUNCTION table
          const productInsertPromises = products.map((item) => {
            const { productId, quantity } = item;
            return new Promise((resolve, reject) => {
              const junctionQuery =
                "INSERT INTO CART_PRODUCT_JUNCTION (PRODUCT_ID, CART_ID, QUANTITY) VALUES (?, ?, ?)";
              db.query(junctionQuery, [productId, cartId, quantity], (err) => {
                if (err) {
                  return reject(new Error(`Error inserting into CART_PRODUCT_JUNCTION: ${err.message}`));
                }
                resolve();
              });
            });
          });

          Promise.all(productInsertPromises)
            .then(() => {
              // Insert into CHECK_OUT table
              const checkoutQuery = "INSERT INTO CHECK_OUT (CHECKOUT_DATE, CART_ID) VALUES (?, ?)";
              db.query(checkoutQuery, [checkoutDate, cartId], (err) => {
                if (err) {
                  throw new Error(`Error inserting into CHECK_OUT table: ${err.message}`);
                }

                // Fetch product details for the receipt email
                const productIds = products.map((item) => item.productId);
                const productQuery = `SELECT PRODUCT_ID, NAME, PRICE FROM PRODUCT WHERE PRODUCT_ID IN (${productIds.join(
                  ","
                )})`;

                db.query(productQuery, (err, productResults) => {
                  if (err) {
                    throw new Error(`Error fetching product details: ${err.message}`);
                  }

                  // Add quantity info to product results
                  const detailedProducts = productResults.map((product) => {
                    const item = products.find((p) => p.productId === product.PRODUCT_ID);
                    return {
                      ...product,
                      quantity: item.quantity,
                    };
                  });

                  // Calculate total cost
                  const totalCost = detailedProducts.reduce(
                    (sum, product) => sum + product.PRICE * product.quantity,
                    0
                  );

                  // Send the receipt email
                  sendReceiptEmail(buyerEmail, detailedProducts, totalCost);

                  // Commit transaction
                  db.commit((err) => {
                    if (err) {
                      db.rollback(() => {
                        console.error("Transaction commit error:", err);
                        return res.status(500).json("Error during checkout commit.");
                      });
                    } else {
                      res.status(200).json({ message: "Checkout completed successfully and receipt sent." });
                    }
                  });
                });
              });
            })
            .catch((err) => {
              db.rollback(() => {
                console.error("Error during product insertion:", err.message);
                return res.status(500).json(err.message);
              });
            });
        });
      });
    } catch (error) {
      db.rollback(() => {
        console.error("Transaction error:", error.message);
        return res.status(500).json(error.message);
      });
    }
  });
};


module.exports = {
  getAllCarts,
  checkout
};
