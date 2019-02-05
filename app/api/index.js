const express = require('express');
const router = express.Router();
const orign = require('../middleware/apiOrign');
const verification = require('../middleware/verification');
const verify = require('../middleware/verify');

const login = require('../controlers/auth/login');
const facebook = require('../controlers/auth/facebook');
const admLogin = require('../controlers/auth/admLogin');
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
const search = require('../controlers/search');
const geo = require('../controlers/geo');

const multer = require('multer');
const upload = multer({dest: './upload/'});
const glob = require('glob');

var passport = require('passport');
router.get('/api/facebook', passport.authenticate('facebook', {session: false}));
router.get('/api/facebook/return',
    passport.authenticate('facebook', {session: false, failureRedirect: '/login' }),
    facebook.mdlAuth);

router.post('/api/signin', [orign, verification], login);
router.post('/api/signup', [orign, verification], signup.create);
router.post('/api/confirm', [orign, verification], signup.confirm);
router.post('/api/uploadImage', [orign, glob.getId], uploadFile.upload);

router.get('/api/setting/:id', [orign, glob.isMyProfile], setting);
router.get('/api/me', [orign, glob.cookieParser, glob.getId], me.myProfile);
router.get('/api/userDate/:id', [orign, glob.cookieParser, glob.getId], me.userDate);
router.get('/api/get_friend', [orign, glob.cookieParser, glob.getId], me.getFriend);

router.post('/api/like', [orign, glob.getId], like.put);
router.post('/api/likeCom', [orign, glob.getId], like.putCom);
router.post('/api/likeDish', [orign, glob.getId], like.putDish);
router.post('/api/share', [orign, glob.getId], share);
router.get('/api/getMutual/:FId', [orign, glob.getId], mutual.getMutual);
router.get('/api/getMutualFriends/:FId', [orign, glob.getId], mutual.getMutualFriends);
router.get('/api/getPhoto', [orign, glob.getId], gallery.getPhoto);
router.get('/api/getFriends', [orign, glob.getId], friend.getFriends);
router.get('/api/getFriendsOffer', [orign, glob.getId], friend.getFriendsOffer);
router.get('/api/getFriendsInvite', [orign, glob.getId], friend.getFriendsInvite);
router.post('/api/addFriend', [orign, glob.getId], friend.invite);
router.post('/api/isInvite', [orign, glob.getId], friend.isInvite);
router.post('/api/delFriend', [orign, glob.getId], friend.delFriend);
router.post('/api/delOffer', [orign, glob.getId], friend.delOffer);
router.post('/api/meetFriend', [orign, glob.getId], friend.meetFriend);
router.post('/api/delMeetFriend', [orign, glob.getId], friend.delMeetFriend);
router.post('/api/offerFriend', [orign, glob.getId], friend.offerFriend);
router.get('/api/getPotentialFriend', [orign, glob.getId], friend.getPotentialFriend);

router.post('/api/create_establishment', [orign, glob.getId, verify], establishment.create);
router.get('/api/get_est', [orign, glob.getId], establishment.getMy);
router.get('/api/getLikeEsts/:id', [orign, glob.getId], establishment.getLikeEsts);
router.get('/api/getLikeDish/:id', [orign, glob.getId], establishment.getLikeDish);

router.get('/api/search', [orign, glob.getId], search.get);
router.get('/api/geo', [orign, glob.getId], geo.get);
router.get('/api/resetEst', [orign, glob.getId], geo.get1);

// estaplishment API
router.get('/api/est', [orign], establishment.custom);
router.get('/api/est/:id', [orign], establishment.customParams);
router.get('/api/est_post', [orign], establishment.estPost);
router.get('/api/est_menu', [orign], establishment.estMenu);
router.get('/api/est_worktime', [orign], establishment.estWorkTime);
router.get('/api/est_est', [orign], establishment.estEst);
router.get('/api/est_pics', [orign], establishment.estPics);
router.get('/api/est_name', [orign], establishment.estName);
router.get('/api/getDish/:id', [orign, glob.getId], establishment.getDish);
router.post('/api/favorite', [orign, glob.getId], me.favorite);
router.get('/api/favorite/:key', [orign], me.getFavorite);
router.get('/api/dishHit', [orign], me.dishHit);
router.get('/api/favorite/:key/:usId', [orign, glob.getId], me.getFavoriteByUsId);

// basket API
router.post('/api/add_product', [orign, glob.getId], basket.addProduct);
router.get('/api/basket_from_est', [orign, glob.getId], basket.getBasketEst);
router.get('/api/basket_user', [orign, glob.getId], basket.getBasket);
router.get('/api/checkboxCom/:id', [orign, glob.getId], basket.checkbox);

// ADM
router.post('/api/adm/signin', [orign, verification], admLogin);


module.exports = router;