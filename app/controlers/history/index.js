const mongoose = require('mongoose');
const History = mongoose.model('history');
const BasketList = mongoose.model('basketsList');


module.exports.historyAddFoodCoin = async function(req, res) {

    const history = await BasketList.find({status: 6}).exec((err, doc)=>{
        doc.map(item=>{
            if(item.foodCoinHistory.isAdd == true){
                const obj = {
                    "foodcoin": item.foodCoinHistory.coin,
                    "userShow": item.owneruser,
                    "order": item._id,
                    "type": "foodcoin",
                    "est": item.ownerest,
                    "coment": "Вам нараховано FoodCoin!",
                    "date": item.dataUpdate
                }

                const h = new History(obj);
                h.save();
            }
        });
        res.status(200).json('ok');
    });

    //const obj = {
    //    "foodcoin": 99,
    //    "userShow": "5c059993d969df061b78656e",
    //    "order": "5d14f82cc15dff09e448df2e",
    //    "type": "foodcoin",
    //    "est": "5bd41fed52176844300d805b",
    //    "coment": "Вам нараховано FoodCoin!"
    //}

    //h.save().then(() => console.log('History works!'))
    
}

module.exports.historyShow = async function(req, res) {    
    const history = await History.find().exec((err, doc)=>{
        res.status(200).json(doc);
    });
    
}

