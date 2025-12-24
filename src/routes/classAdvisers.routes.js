const express = require('express');
const router = express.Router();
const { verifyToken, isAdmin } = require('../middleware/auth.middleware');
const {
  getClassAdvisers,
  createClassAdviser,
} = require('../controllers/classAdvisers.controller');

router.get('/class-advisers', verifyToken, isAdmin, getClassAdvisers);
router.post('/class-advisers', verifyToken, isAdmin, createClassAdviser);

module.exports = router;
