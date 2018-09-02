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
router.get('/getmenu', function(req, res, next) {
    menu = menu[0] ? menu : [
        {
            label:'Sass',
            link:'#'
        },
        {
            label:'Components',
            link:'#'
        },
        {
            label:'JavaScript',
            link:'#1'
        }
    ];
    if(typeof menu != 'string'){
        menu = JSON.stringify(menu);
    }
    ok(res, menu)
});

router.get('/getmenu/:id/:link', function(req, res, next) {
  menu = JSON.parse(menu);
  menu.push({
        label: req.params.id,
        link: req.params.link
    });
  menu = JSON.stringify(menu);
  ok(res, menu)
});
module.exports = router;
