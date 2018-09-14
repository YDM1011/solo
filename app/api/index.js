const express = require('express');
const router = express.Router();
const orign = require('../middleware/apiOrign');
const verification = require('../middleware/verification');

const login = require('../controlers/auth/login');
const signup = require('../controlers/auth/signup');
const uploadFile = require('../controlers/uploadFile');
const setting = require('../controlers/setting');

const multer = require('multer');
const upload = multer({dest: './upload/'});
const glob = require('glob');

router.post('/api/signin', [orign, verification], login);
router.post('/api/signup', [orign, verification], signup);
router.post('/api/uploadImage', [orign, glob.isAuth, upload.single("file")], uploadFile);

router.get('/api/setting', [orign, glob.isAuth], setting);

module.exports = router;