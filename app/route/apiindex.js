var express = require('express');
var router = express.Router();
router.get('/', function(req, res, next) {
    res.render('index2', { title: 'Test' });
});
module.exports = router;
