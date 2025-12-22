const express = require('express');
const router = express.Router();

const { verifyToken, isAdmin } = require('../middleware/auth.middleware');
const {
  getDepartments,
  createDepartment,
} = require('../controllers/departments.controller');

router.get('/departments', verifyToken, isAdmin, getDepartments);
router.post('/departments', verifyToken, isAdmin, createDepartment);

module.exports = router;
