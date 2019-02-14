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

const calcEst = doc=>{
  let value=0;
  doc.map(d=>{
      value += d.myest.length
  });
  return value
};