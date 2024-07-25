const express = require('express');
const { createRating } = require('../controllers/auth_controllers');
const authMiddleware = require('../middlewares/auth-middleware');

const router = express.Router();

router.post('/', authMiddleware, createRating);

module.exports = router;
