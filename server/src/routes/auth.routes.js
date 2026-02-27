const express = require('express');
const router = express.Router();
const { signup, login } = require('../controllers/auth.controller');

// Route for User Registration
// Path: /api/auth/signup
router.post('/signup', signup);

// Route for User Login
// Path: /api/auth/login
router.post('/login', login);

module.exports = router;