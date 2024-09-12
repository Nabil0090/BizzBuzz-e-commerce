const db = require('../db'); // Import the database connection

// Function to get all users
const getAllUsers = (req, res) => {
  const query = 'SELECT * FROM USER';

  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching users:', err);
      res.status(500).json('Error fetching users from the database.');
    } else {
      res.json(results);
    }
  });
};

// Function for user sign-up
const signUpUser = (req, res) => {
  const { email, password, name, phone_no, address, user_type } = req.body;

  const query = 'INSERT INTO USER (EMAIL, PASSWORD, NAME, PHONE_NO, ADDRESS, USER_TYPE) VALUES (?, ?, ?, ?, ?, ?)';
  const values = [email, password, name, phone_no, address, user_type];

  db.query(query, values, (err, results) => {
    if (err) {
      console.error('Error creating new user:', err);
      res.status(500).json('Error creating new user.');
    } else {
      res.status(201).json('User created successfully!');
    }
  });
};

// Function for user sign-in
const signInUser = (req, res) => {
  const { email, password } = req.body;

  const query = 'SELECT * FROM USER WHERE EMAIL = ? AND PASSWORD = ?';
  const values = [email, password];

  db.query(query, values, (err, results) => {
    if (err) {
      console.error('Error signing in:', err);
      res.status(500).json('Error signing in.');
    } else {
      if (results.length > 0) {
        res.status(200).json({ message: 'Sign-in successful!', user: results[0] });
      } else {
        res.status(401).json('Invalid email or password.');
      }
    }
  });
};

// Function to fetch user profile
const getUserProfile = (req, res) => {
  const userId = req.params.id; // Assuming you pass user ID as a route parameter

  const query = 'SELECT * FROM USER WHERE USER_ID = ?';
  db.query(query, [userId], (err, results) => {
    if (err) {
      console.error('Error fetching user profile:', err);
      res.status(500).json('Error fetching user profile.');
    } else {
      if (results.length > 0) {
        res.status(200).json(results[0]);
      } else {
        res.status(404).json('User not found.');
      }
    }
  });
};

// Function to update user profile
const updateUserProfile = (req, res) => {
  const userId = req.params.id; // Assuming you pass user ID as a route parameter
  const { EMAIL, PASSWORD, NAME, PHONE_NO, ADDRESS, USER_TYPE } = req.body;
  console.log(req.body)
  const query = 'UPDATE USER SET EMAIL = ?, PASSWORD = ?, NAME = ?, PHONE_NO = ?, ADDRESS = ?, USER_TYPE = ? WHERE USER_ID = ?';
  const values = [EMAIL, PASSWORD, NAME, PHONE_NO, ADDRESS, USER_TYPE, userId];

  db.query(query, values, (err, results) => {
    if (err) {
      console.error('Error updating user profile:', err);
      res.status(500).json('Error updating user profile.');
    } else {
      res.status(200).json('User profile updated successfully!');
    }
  });
};

// Function to delete user profile
const deleteUserProfile = (req, res) => {
  const userId = req.params.id; // Assuming you pass user ID as a route parameter

  const query = 'DELETE FROM USER WHERE USER_ID = ?';
  db.query(query, [userId], (err, results) => {
    if (err) {
      console.error('Error deleting user profile:', err);
      res.status(500).json('Error deleting user profile.');
    } else {
      
      res.status(200).json('User profile deleted successfully!');
    }
  });
};

module.exports = {
  getAllUsers,
  signUpUser,
  signInUser,
  getUserProfile,
  updateUserProfile,
  deleteUserProfile
};
