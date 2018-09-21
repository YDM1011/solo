const express = require('express');
const router = express.Router();
const orign = require('../middleware/apiOrign');
const verification = require('../middleware/verification');

const login = require('../controlers/auth/login');
const signup = require('../controlers/auth/signup');
const uploadFile = require('../controlers/uploadFile');
const setting = require('../controlers/setting');
const like = require('../controlers/like');

const multer = require('multer');
const upload = multer({dest: './upload/'});
const glob = require('glob');

router.post('/api/signin', [orign, verification], login);
router.post('/api/signup', [orign, verification], signup);
router.post('/api/uploadImage', [orign, upload.single("file")], uploadFile);

router.get('/api/setting/:id', [orign, glob.isMyProfile], setting);
router.post('/api/like', [orign, glob.getId], like);

module.exports = router;