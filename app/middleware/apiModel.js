module.exports = ()=>{
const app = express();
/***************************/
const methodOverride = require('method-override');
const compress = require('compression');
const flash = require('connect-flash');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(methodOverride());
app.use(compress());
app.use(flash());
const subdomain = require('express-subdomain');
restify.defaults({
    prefix: '/api',
    version: ''
});
const midl = (req, res, next) => {
    next();
};
const route = express.Router();

/***   Model For DB   ***/
mongoose.Promise = global.Promise;
mongoose.connect(data.db);
db.on('error', function () {
    throw new Error('unable to connect to database at ' + data.db);
});
models.forEach(function (model) {
    require(model);
    let nameModel = model.split("./app/model/")[1].split(".js")[0]
    const modelApi = mongoose.model(nameModel);
    restify.serve(route, modelApi, {preMiddleware: midl});
});
/*** Model For DB End ***/
app.use(route);
// next();
};
/***************************/