use bizzbuzz;

-- Insert dummy data into USER table
INSERT INTO USER (PASSWORD, EMAIL, NAME, PHONE_NO, ADDRESS, USER_TYPE) VALUES
('password123', 'john.doe@example.com', 'John Doe', '1234567890', '1234 Elm Street, Springfield', 'Buyer'),
('securepass456', 'jane.smith@example.com', 'Jane Smith', '0987654321', '5678 Maple Avenue, Springfield', 'Seller'),
('admin789', 'admin@example.com', 'Admin User', '1122334455', '1 Admin Plaza, Metropolis', 'Admin'),
('buyer2024', 'alice.jones@example.com', 'Alice Jones', '2233445566', '1010 Oak Boulevard, Gotham', 'Buyer'),
('seller2024', 'bob.brown@example.com', 'Bob Brown', '3344556677', '2020 Pine Street, Star City', 'Seller');

-- Insert dummy data into PRODUCT table
INSERT INTO PRODUCT (QUANTITY, DESCRIPTION, PRICE, AVAILABLE, NAME, PICTURE, SELLER_ID) VALUES
(10, 'A high-quality leather jacket.', 150.00, 5, 'Leather Jacket', NULL, 2),
(20, 'Comfortable running shoes.', 75.99, 15, 'Running Shoes', NULL, 2),
(5, 'Noise-canceling headphones.', 199.99, 3, 'Headphones', NULL, 2),
(30, 'Stylish wristwatch.', 120.00, 10, 'Wristwatch', NULL, 5),
(50, 'Smartphone with 128GB storage.', 699.99, 25, 'Smartphone', NULL, 5);

-- Insert dummy data into REVIEWS table
INSERT INTO REVIEWS (REVIEW_DATE, STAR_RATING, REVIEW_TEXT, BUYER_ID, PRODUCT_ID) VALUES
('2024-09-01', 4.5, 'Great quality product!', 1, 1),
('2024-09-02', 3.0, 'Decent, but could be better.', 4, 2),
('2024-09-03', 5.0, 'Exceeded my expectations!', 1, 3),
('2024-09-04', 2.5, 'Not worth the price.', 4, 4),
('2024-09-05', 4.0, 'Good product for the price.', 1, 5);

-- Insert dummy data into COMPLAINT table
INSERT INTO COMPLAINT (QUESTION, ANSWER, BUYER_ID, ADMIN_ID) VALUES
('Why has my order not been shipped yet?', 'We are looking into it and will update you soon.', 1, 3),
('Can I change my delivery address?', 'Yes, you can change it within 24 hours of placing the order.', 4, 3),
('Received a damaged product, what should I do?', 'Please return the product within 15 days.', 1, 3),
('How do I track my order?', 'Use the tracking link provided in your confirmation email.', 4, 3),
('Can I cancel my order?', 'Yes, cancellations are allowed within 12 hours of placing the order.', 1, 3);

-- Insert dummy data into CART table
INSERT INTO CART (CHECKOUT_DATE, BUYER_ID) VALUES
('2024-09-01', 1),
('2024-09-02', 4),
('2024-09-03', 1),
('2024-09-04', 4),
('2024-09-05', 1);

-- Insert dummy data into CART_PRODUCT_JUNCTION table
INSERT INTO CART_PRODUCT_JUNCTION (QUANTITY, PRODUCT_ID, CART_ID) VALUES
(2, 1, 1),
(1, 2, 1),
(3, 3, 2),
(1, 4, 3),
(5, 5, 4);
