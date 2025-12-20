const express = require('express');
const router = express.Router();

const { adminLogin } = require('../controllers/auth.controller');
const { verifyToken, isAdmin } = require('../middleware/auth.middleware');

// Public route
router.post('/admin/login', adminLogin);

// Protected route (Admin only)
router.get('/admin/profile', verifyToken, isAdmin, (req, res) => {
  res.json({
    message: 'Welcome Admin',
    admin: req.user
  });
});

module.exports = router;
