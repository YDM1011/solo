const express = require('express');
const router = express.Router();
const orign = require('../middleware/apiOrign');
const verification = require('../middleware/verification');
const verify = require('../middleware/verify');

const login = require('../controlers/auth/login');
const signup = require('../controlers/auth/signup');
const uploadFile = require('../controlers/uploadFile');
const setting = require('../controlers/setting');
const like = require('../controlers/like');
const share = require('../controlers/share');
const friend = require('../controlers/friend');
const gallery = require('../controlers/gallery');
const mutual = require('../controlers/mutual');
const me = require('../controlers/me');
const establishment = require('../controlers/establishment');
const basket = require('../controlers/basket');

const multer = require('multer');
const upload = multer({dest: './upload/'});
const glob = require('glob');

router.post('/api/signin', [orign, verification], login);
router.post('/api/signup', [orign, verification], signup.create);
router.post('/api/confirm', [orign, verification], signup.confirm);
router.post('/api/uploadImage', [orign, upload.single("file")], uploadFile);

router.get('/api/setting/:id', [orign, glob.isMyProfile], setting);
router.get('/api/me', [orign, glob.cookieParser, glob.getId], me.myProfile);
router.get('/api/userDate/:id', [orign, glob.cookieParser, glob.getId], me.userDate);
router.get('/api/get_friend', [orign, glob.cookieParser, glob.getId], me.getFriend);

router.post('/api/like', [orign, glob.getId], like.put);
router.post('/api/likeCom', [orign, glob.getId], like.putCom);
router.post('/api/likeDish', [orign, glob.getId], like.putDish);
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

router.post('/api/create_establishment', [orign, glob.getId, verify], establishment.create);
router.get('/api/get_est', [orign, glob.getId], establishment.getMy);

// estaplishment API
router.get('/api/est', [orign], establishment.custom);
router.get('/api/est/:id', [orign], establishment.customParams);
router.get('/api/est_post', [orign], establishment.estPost);
router.get('/api/est_menu', [orign], establishment.estMenu);
router.get('/api/est_est', [orign], establishment.estEst);
router.post('/api/favorite', [orign, glob.getId], me.favorite);
router.get('/api/favorite/:key', [orign], me.getFavorite);
router.get('/api/favorite/:key/:usId', [orign, glob.getId], me.getFavoriteByUsId);

// basket API
router.post('/api/add_product', [orign, glob.getId], basket.addProduct);
router.get('/api/basket_from_est', [orign, glob.getId], basket.getBasketEst);
router.get('/api/basket_user', [orign, glob.getId], basket.getBasket);
router.get('/api/checkbox/:id', [orign, glob.getId], basket.checkbox);

module.exports = router;