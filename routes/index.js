var express = require('express');
var router = express.Router();
var menu = [];
/* GET home page. */
function ok(res, info) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.send(info)
}
router.get('/', function(req, res, next) {
  res.render('index2', { title: 'Express' });
});
router.post('/api/signin', function(req, res, next) {
    ok(res, JSON.stringify({res:'isLoget'}) );
});
router.get('/getmenu', function(req, res, next) {
    menu = menu[0] ? menu : [
        {
            label:'home',
            link:''
        },
        {
            label:'dashboard',
            link:'dashboard'
        },
        {
            label:'signin',
            link:'signin'
        }
    ];
    if(typeof menu != 'string'){
        menu = JSON.stringify(menu);
    }
    ok(res, menu)
});

module.exports = router;
