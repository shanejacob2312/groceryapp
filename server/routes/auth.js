const express = require('express');
const router = express.Router();

// Test route to verify auth routes are working
router.get('/test', (req, res) => {
  res.json({ message: 'Auth routes are working!' });
});

// Simple login route for testing
router.post('/login', (req, res) => {
  res.json({ message: 'Login endpoint reached' });
});

// Simple register route for testing
router.post('/register', (req, res) => {
  res.json({ message: 'Register endpoint reached' });
});

module.exports = router; 