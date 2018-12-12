
var express = require('express');
var router = express.Router();
router.get('/', function(req, res, next) {
    if (req.cookies['sid']) {
        next
    }else{
        res.render('index4', {title: 'Express'});
    }
});

module.exports = router;
