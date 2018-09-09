const express = require('express');
const router = express.Router();
const orign = require('../middleware/apiOrign');
const verification = require('../middleware/verification');

const login = require('../controlers/auth/login');
const signup = require('../controlers/auth/signup');


const glob = require('glob');

router.post('/api/signin', [orign, verification], login);
router.post('/api/signup', [orign, verification], signup);
module.exports = router;