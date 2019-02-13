const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const maincategoryschema = new Schema({
    id: String,
    name: String,
    label: String
});
const model = new Schema({
    name: String,
    maincategory: maincategoryschema,
    massa: String,
    energy: String,
    price: String,
    owneruser: String,
    ownerest: String,
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
        "maincategory.id": [Object],
    }
});

mongoose.model('complement', model);

const glob = require('glob');

const preRead = (req,res,next)=>{
    require("../responces/ok")(req, res);
    require("../responces/notFound")(req, res);
    require("../responces/badRequest")(req, res);
    mongoose.model('complement')
        .find({ownerest: req.params['id']})
        .populate({path:'pic', select:'preload _id'})
        .exec((err,info)=>{
            if (err) return res.serverError(err);
            if (!info) return res.notFound('Not found');
            if (info) return res.ok(info);
        })
};
const preUpdate = (req,res,next)=>{
    require("../responces/ok")(req, res);
    require("../responces/notFound")(req, res);
    require("../responces/badRequest")(req, res);
    delete req.body['owneruser'];
    delete req.body['ownerest'];
    if (req.body.maincategory){
        mongoose.model('category')
            .findOne({complementbox:{$in:req.params.id}})
            .exec((err,doc)=>{
                if(err) return res.badRequest('Something broke!');

                mongoose.model('category')
                    .findOneAndUpdate({_id: doc._id},
                        {$pull:{complementbox:req.params.id}}, {new: true})
                    .exec((err, content) =>{
                        if(err) {
                            return res.badRequest(err)
                        } else {
                            mongoose.model('category')
                                .findOneAndUpdate({_id: req.body.maincategory.id},
                                    {$push:{complementbox:req.params.id}}, {new: true})
                                .exec((err, content) =>{
                                    if(err) {
                                        return res.badRequest(err)
                                    } else {
                                        return next()
                                    }
                                });
                        }
                    });
            });
    }else{
        next()
    }

};
const preCreate = (req,res,next)=>{
    require("../responces/ok")(req, res);
    require("../responces/notFound")(req, res);
    require("../responces/badRequest")(req, res);
    req.body['owneruser'] = req.userId;
    req.body['ownerest'] = req.body.estId;
    next();

};

glob.restify.serve(
    glob.route,
    mongoose.model('complement'),
    {
        preRead: [glob.jsonParser, glob.cookieParser, glob.getId, preRead],
        preUpdate: [glob.jsonParser, glob.cookieParser, glob.getId, preUpdate],
        preCreate: [glob.jsonParser, glob.cookieParser, glob.getId, preCreate]
    });