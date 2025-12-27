const express = require('express');
const router = express.Router();

const {
  adminLogin,
  staffLogin,
} = require('../controllers/auth.controller');

// ADMIN LOGIN
router.post('/admin/login', adminLogin);

// STAFF LOGIN (Principal, HOD, ClassAdviser)
router.post('/staff/login', staffLogin);

module.exports = router;
