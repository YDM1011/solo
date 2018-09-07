const express = require('express');
const router = express.Router();
const orign = require('../middleware/apiOrign');

const login = require('../controlers/auth/login');
const signup = require('../controlers/auth/signup');

router.post('/api/signin', [orign], login);
router.post('/api/signup', [orign], signup);

module.exports = router;