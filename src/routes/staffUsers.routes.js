const express = require('express');
const router = express.Router();

const { verifyToken, isAdmin } = require('../middleware/auth.middleware');

const {
  createStaffUser,
  updateStaffUser,
} = require('../controllers/staffUsers.controller');

router.post('/staff-users', verifyToken, isAdmin, createStaffUser);
router.put('/staff-users/:id', verifyToken, isAdmin, updateStaffUser);

module.exports = router;
