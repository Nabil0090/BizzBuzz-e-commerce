const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');


router.get('/users', userController.getAllUsers);

router.post('/signup', userController.signUpUser);

router.post('/signin', userController.signInUser);

router.get('/users/:id', userController.getUserProfile);

router.post('/usersUpdate/:id', userController.updateUserProfile);

router.delete('/users/:id', userController.deleteUserProfile);

module.exports = router;
