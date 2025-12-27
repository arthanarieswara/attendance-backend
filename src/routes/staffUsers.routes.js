const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/auth.middleware');

const {
  createStaffUser,
  updateStaffUser,
  getStaffUsers,
} = require('../controllers/staffUsers.controller');

router.post('/staff-users', verifyToken, createStaffUser);
router.put('/staff-users/:id', verifyToken, updateStaffUser);
router.get('/staff-users', verifyToken, getStaffUsers);

module.exports = router;
