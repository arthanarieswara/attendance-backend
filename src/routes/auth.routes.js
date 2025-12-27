const express = require('express');
const router = express.Router();

const {
  adminLogin,
  staffLogin,
} = require('../controllers/auth.controller');

router.post('/auth/admin/login', adminLogin);
router.post('/auth/staff/login', staffLogin);

module.exports = router;
