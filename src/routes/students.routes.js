const express = require('express');
const router = express.Router();
const { verifyToken, isAdmin } = require('../middleware/auth.middleware');
const {
  getStudents,
  createStudent,
} = require('../controllers/students.controller');

router.get('/students', verifyToken, isAdmin, getStudents);
router.post('/students', verifyToken, isAdmin, createStudent);



module.exports = router;
