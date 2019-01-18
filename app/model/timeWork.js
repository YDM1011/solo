const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const timeRangeSchema = {
    nameDay: String,
    timeStart:  {type: String, default: "9:00"},
    timeEnd: {type: String, default: "20:00"},
    isAllTime: {type: Boolean, default: false},
    isWeekend: {type: Boolean, default: false}
};

const model = new Schema({
    name: {type: String, required: [true, 'enter name']},
    timeRange1: timeRangeSchema,
    timeRange2: timeRangeSchema,
    timeRange3: timeRangeSchema,
    timeRange4: timeRangeSchema,
    timeRange5: timeRangeSchema,
    timeRange6: timeRangeSchema,
    timeRange7: timeRangeSchema,
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
    ownerEst: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "establishment"
    },
    data: {type: Date, default: new Date()},
},{
    toJSON: {
        transform: function (doc, ret) {},
    },
    toObject: {
        transform: function (doc, ret) {},
        virtuals: false
    },
    createRestApi: true,
    strict: true,
    paths: {
        "timeRange1" : Object,
        "timeRange1.nameDay" : Object,
        "timeRange1.timeStart" : Object,
        "timeRange1.timeEnd" : Object,
        "timeRange1.isAllTime" : Object,
        "timeRange1.isWeekend" : Object,
        "timeRange2" : Object,
        "timeRange2.nameDay" : Object,
        "timeRange2.timeStart" : Object,
        "timeRange2.timeEnd" : Object,
        "timeRange2.isAllTime" : Object,
        "timeRange2.isWeekend" : Object,
        "timeRange3" : Object,
        "timeRange3.nameDay" : Object,
        "timeRange3.timeStart" : Object,
        "timeRange3.timeEnd" : Object,
        "timeRange3.isAllTime" : Object,
        "timeRange3.isWeekend" : Object,
        "timeRange4" : Object,
        "timeRange4.nameDay" : Object,
        "timeRange4.timeStart" : Object,
        "timeRange4.timeEnd" : Object,
        "timeRange4.isAllTime" : Object,
        "timeRange4.isWeekend" : Object,
        "timeRange5" : Object,
        "timeRange5.nameDay" : Object,
        "timeRange5.timeStart" : Object,
        "timeRange5.timeEnd" : Object,
        "timeRange5.isAllTime" : Object,
        "timeRange5.isWeekend" : Object,
        "timeRange6" : Object,
        "timeRange6.nameDay" : Object,
        "timeRange6.timeStart" : Object,
        "timeRange6.timeEnd" : Object,
        "timeRange6.isAllTime" : Object,
        "timeRange6.isWeekend" : Object,
        "timeRange7" : Object,
        "timeRange7.nameDay" : Object,
        "timeRange7.timeStart" : Object,
        "timeRange7.timeEnd" : Object,
        "timeRange7.isAllTime" : Object,
        "timeRange7.isWeekend" : Object
    }
});

mongoose.model('timeWork', model);


const preRead = (req,res,next)=> {
    require("../responces/ok")(req, res);
    require("../responces/notFound")(req, res);
    require("../responces/badRequest")(req, res);
    next()
};

const preUpdate = (req,res,next)=> {
    require("../responces/ok")(req, res);
    require("../responces/notFound")(req, res);
    require("../responces/badRequest")(req, res);
    next()
};

const preCreate = (req,res,next)=> {
    require("../responces/ok")(req, res);
    require("../responces/notFound")(req, res);
    require("../responces/badRequest")(req, res);
    req.body['owner'] = req.userId;
    next()
};

const preDelete = (req,res,next)=> {
    require("../responces/ok")(req, res);
    require("../responces/notFound")(req, res);
    require("../responces/badRequest")(req, res);
    next()
};

const werify = (req,res,next)=>{
    require("../responces/ok")(req, res);
    require("../responces/notFound")(req, res);
    require("../responces/badRequest")(req, res);
    mongoose.model('timeWork')
        .findOne({_id: req.params.id, owner: req.userId})
        .exec((err,result)=>{
            if (err) return res.badRequest(err);
            if (!result) return res.notFound();
            if (result) {
                delete req.body['owner'];
                next()
            }
        })
};

const glob = require('glob');

glob.restify.serve(
    glob.route,
    mongoose.model('timeWork'),
    {
        preRead: [glob.jsonParser, glob.cookieParser, preRead],
        preUpdate: [glob.jsonParser, glob.cookieParser, glob.getId, werify, preUpdate],
        preCreate: [glob.jsonParser, glob.cookieParser, glob.getId, preCreate],
        preDelete: [glob.jsonParser, glob.cookieParser, glob.getId, werify, preDelete],
    });