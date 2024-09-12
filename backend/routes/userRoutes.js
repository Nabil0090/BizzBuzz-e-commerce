const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Route to get all users
router.get('/users', userController.getAllUsers);

// Route to handle user sign-up
router.post('/signup', userController.signUpUser);

// Route to handle user sign-in
router.post('/signin', userController.signInUser);

// Route to fetch a user profile
router.get('/users/:id', userController.getUserProfile);

// Route to update a user profile
router.post('/usersUpdate/:id', userController.updateUserProfile);

// Route to delete a user profile
router.delete('/users/:id', userController.deleteUserProfile);

module.exports = router;
