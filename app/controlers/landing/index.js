const mongoose = require('mongoose');
const Establishment = mongoose.model('establishment');

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