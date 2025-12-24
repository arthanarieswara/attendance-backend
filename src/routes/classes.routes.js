const express = require('express');
const router = express.Router();

const { verifyToken, isAdmin } = require('../middleware/auth.middleware');
const { getClasses, createClass } = require('../controllers/classes.controller');

router.get('/classes', verifyToken, isAdmin, getClasses);
router.post('/classes', verifyToken, isAdmin, createClass);

module.exports = router;
