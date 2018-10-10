const express = require('express');
const router = express.Router();
const orign = require('../middleware/apiOrign');
const verification = require('../middleware/verification');

const login = require('../controlers/auth/login');
const signup = require('../controlers/auth/signup');
const uploadFile = require('../controlers/uploadFile');
const setting = require('../controlers/setting');
const like = require('../controlers/like');
const share = require('../controlers/share');
const friend = require('../controlers/friend');
const gallery = require('../controlers/gallery');
const mutual = require('../controlers/mutual');

const multer = require('multer');
const upload = multer({dest: './upload/'});
const glob = require('glob');

router.post('/api/signin', [orign, verification], login);
router.post('/api/signup', [orign, verification], signup.create);
router.post('/api/confirm', [orign, verification], signup.confirm);
router.post('/api/uploadImage', [orign, upload.single("file")], uploadFile);

router.get('/api/setting/:id', [orign, glob.isMyProfile], setting);
router.post('/api/like', [orign, glob.getId], like.put);
router.post('/api/likeCom', [orign, glob.getId], like.putCom);
router.post('/api/share', [orign, glob.getId], share);
router.get('/api/getMutual/:FId', [orign, glob.getId], mutual.getMutual);
router.get('/api/getPhoto', [orign, glob.getId], gallery.getPhoto);
router.get('/api/getFriends', [orign, glob.getId], friend.getFriends);
router.post('/api/addFriend', [orign, glob.getId], friend.invite);
router.post('/api/isInvite', [orign, glob.getId], friend.isInvite);
router.post('/api/delFriend', [orign, glob.getId], friend.delFriend);
router.post('/api/meetFriend', [orign, glob.getId], friend.meetFriend);
router.post('/api/delMeetFriend', [orign, glob.getId], friend.delMeetFriend);
router.post('/api/offerFriend', [orign, glob.getId], friend.offerFriend);

module.exports = router;