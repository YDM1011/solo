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
glob.secret = "seecret";
require('./app/middleware/isAuth');
/***************************/
const cors = require('cors');
const originsWhitelist = [
    'http://localhost:4200',
    'http://test.localhost:3000',
];
const corsOptions = {
    origin: function(origin, callback){
        const isWhitelisted = originsWhitelist.indexOf(origin) !== -1;
        callback(null, isWhitelisted);
    },
    credentials:true
};
app.use('/api', cors(corsOptions));
/***************************/
const methodOverride = require('method-override');
const compress = require('compression');
const flash = require('connect-flash');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
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
    console.log(model.split("./app/model/")[1].split(".js")[0]);
    let nameModel = model.split("./app/model/")[1].split(".js")[0]
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

// view engine setup
app.set('views', path.join(__dirname, 'app/views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'solo-app/dist/solo-app')));
app.set('subdomain offset', 1);
app.use((req,res,next)=>{
    console.log(req.subdomains);
    next()
});
app.use('/', static2);
app.use('/', api);
app.use(subdomain('test', static1));
// catch 404 and forward to error handler
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
        console.log(req.subdomains);
        switch(req.subdomains[0]){
            case '':res.render('index2', { title: req.params.path });
            break;
            case 'test':res.render('index1', { title: req.params.path });
            break;
            default:res.render('index2', { title: req.params.path });break;

        }

    }else{
        res.render('error');
    }
});

module.exports = app;
