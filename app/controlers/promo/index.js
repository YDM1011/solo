const mongoose = require('mongoose');
const Promo = mongoose.model('promo');
const BasketList = mongoose.model('basketsList');
const User = mongoose.model('user');
const Foodcoin = mongoose.model('foodCoin');

module.exports.promoShow = async function(req, res) {    
    const promo = await Promo.find().exec((err, doc)=>{
        res.status(200).json(doc);
    });
    
}