const express = require('express');
const router = express.Router();

const { verifyToken, isAdmin } = require('../middleware/auth.middleware');
const {
  createStaffUser,
  updateStaffUser,
  getStaffUsers,   // 👈 ADD THIS
} = require('../controllers/staffUsers.controller');

router.get('/staff-users', verifyToken, isAdmin, getStaffUsers);
router.post('/staff-users', verifyToken, isAdmin, createStaffUser);
router.put('/staff-users/:id', verifyToken, isAdmin, updateStaffUser);

module.exports = router;
