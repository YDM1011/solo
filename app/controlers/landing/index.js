const mongoose = require('mongoose');
const Establishment = mongoose.model('establishment');
const User = mongoose.model('user');
const moment = require('moment');

module.exports.getAll = (req, res, next) => {

    Establishment.find({})
        .exec((err,doc)=>{
            if (err) return res.badRequest(err);
            if (!doc) {
                return res.serverError('Somesing broken');
            }
            if (doc){
                return res.ok({count:calcEst(doc)});
            }
        })
};

module.exports.getAllUser = (req, res, next) => {
    // start today
    var start = moment().subtract('days', 7);

    let query = { data: { '$gte': start }};

    User.find({})
        .select('_id')
        .exec((err,doc)=>{
            if (err) return res.badRequest(err);
            if (!doc) {
                return res.serverError('Somesing broken');
            }
            if (doc){
                User.find(query)
                    .exec((err,doc1)=>{
                        if (err) return res.badRequest(err);
                        if (!doc1) {
                            return res.serverError('Somesing broken');
                        }
                        if (doc1){
                            //return res.status(200).json({count:doc.length});
                            return res.ok({count:doc.length,count2:doc1.length})
                        }
                    })                
            }
        })

    
};

module.exports.getMe = (req, res, next) => {
    
    User.findOne({_id: req.params.id})
        .populate({path:"bg photo"})
        .exec((err,doc)=>{
            if (err) return res.badRequest(err);
            if (!doc) {
                return res.serverError('Somesing broken');
            }
            if (doc){
                return res.ok(doc)
                                  
            }
        })    
};

module.exports.getVerify = (req, res, next) => {
    Establishment.find({verify:true})
        .exec((err,doc)=>{
            if (err) return res.badRequest(err);
            if (!doc) {
                return res.serverError('Somesing broken');
            }
            if (doc){
                return res.ok({count:calcEst(doc)});
            }
        })
};

module.exports.getBestVerify = (req, res, next) => {
    Establishment.find({verify:true}).sort({thebestCount: -1}).limit(5)
        .populate({path:'av'})
        .populate({path:'bg'})
        .exec((err,doc)=>{
            if (err) return res.badRequest(err);
            if (!doc) {
                return res.serverError('Somesing broken');
            }
            if (doc){
                return res.status(200).json(doc);
            }
        })
};

module.exports.getVerifyAll = (req, res, next) => {
    Establishment.find({verify:true})
        .exec((err,doc)=>{
            if (err) return res.badRequest(err);
            if (!doc) {
                return res.serverError('Somesing broken');
            }
            if (doc){
                Establishment.find({})
                    .exec((err,doc1)=>{
                        if (err) return res.badRequest(err);
                        if (!doc1) {
                            return res.serverError('Somesing broken');
                        }
                        if (doc1){
                            return res.ok({count:calcEst(doc),count2:calcEst(doc1)});
                        }
                    })
            }
        })
};

const calcEst = doc=>{
  let value=0;
  doc.map(d=>{
      value += d.myest.length
  });
  return value
};