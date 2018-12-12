const express = require('express');
const restify = require('express-restify-mongoose');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const glob = require('glob');
const mongoose = require('mongoose');
const data = require('./app/config/index');
const db = mongoose.connection;
const models = glob.sync('./app/model/*.js');
const subdomain = require('express-subdomain');
const app = express();



glob.app = app;
glob.jsonParser = bodyParser.json({limit: '5mb', extended: true});
glob.cookieParser = cookieParser();
glob.secret = "seecret";
require('./app/middleware/getId');
require('./app/middleware/getOwner');
require('./app/middleware/isAuth');
require('./app/middleware/isProfile');
require('./app/middleware/isMyProfile');

/***************************/
const cors = require('cors');
const originsWhitelist = [
    'http://localhost:4200',
    'http://*.localhost:4200',
    'http://localhost:4300',
    'http://*.localhost:4300',
    'http://localhost:5000',
    'http://*.localhost:5000',
    'http://localhost:3000',
    'http://*.localhost:3000',
    'https://tasteol1.com', 'https://solo.tasteol1.com', '.tasteol1.com', /\.tasteol1\.com$/,
    'https://tasteol.com', 'https://*.tasteol1.com', 'https://.tasteol1.com'
];
const corsOptions = {
    origin:originsWhitelist,
    credentials:true
};

app.use('/api', cors(corsOptions));
/***************************/
const methodOverride = require('method-override');
const compress = require('compression');
const flash = require('connect-flash');

app.use(methodOverride());
app.use(compress());
app.use(flash());
restify.defaults({
    prefix: '/api',
    version: ''
});
glob.restify = restify;
const route = express.Router();
glob.route = route;
/***   Model For DB   ***/
mongoose.Promise = global.Promise;
mongoose.connect(data.db);
db.on('error', function () {
    throw new Error('unable to connect to database at ' + data.db);
});
models.forEach(function (model) {
    require(model);
    let nameModel = model.split("./app/model/")[1].split(".js")[0];
    const modelApi = mongoose.model(nameModel);
    restify.serve(route, modelApi);
});
/*** Model For DB End ***/
app.use(route);
/***************************/

require('./app/config/express')(app);
const static1 = require('./app/route/mainindex');
const static2 = require('./app/route/apiindex');
const api = require('./app/api/index');

app.get("/about", function(req, res){
    res.render('index4', { title: "Landing" });
});

// view engine setup
app.set('views', path.join(__dirname, 'app/views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(bodyParser.json({limit: '5mb', "strict": false,}));
app.use(bodyParser.urlencoded({ extended: true, limit: '5mb'}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'admin/dist/admin')));
app.use(express.static(path.join(__dirname, 'establishments/dist/establishments')));
app.use(express.static(path.join(__dirname, 'solo-app/dist/solo-app')));
app.use(express.static(path.join(__dirname, 'public')));
app.set('subdomain offset', 2);
app.use((req,res,next)=>{
    next()
});
app.use('/', api);

app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  // res.status(err.status || 500);
  // res.render('error');
    if(err.status == 404){
        console.log(req.subdomains, req.cookies);
        if (req.cookies['sid']){
            switch(req.subdomains[0]){
                case undefined:res.render('index1', { title: req.params.path });
                    break;
                case 'solo':res.render('index2', { title: req.params.path });
                    break;
                case 'admin':res.render('index3', { title: req.params.path });
                    break;
                default: res.render('index2', { title: req.params.path });
                    break;
            }
        } else {
            res.render('index4', { title: "Landing" });
        }

    } else {
        res.render('error');
    }
});

module.exports = app;
