const mongoose = require('mongoose');
const History = mongoose.model('history');
const BasketList = mongoose.model('basketsList');
const User = mongoose.model('user');


module.exports.historyAddFoodCoin = async function(req, res) {

    const history = await BasketList.find({status: 6}).exec((err, doc)=>{
        doc.map(item=>{
            if(item.foodCoinHistory.isAdd == true){
                let coment = 'Вам нараховано '+ item.foodCoinHistory.coin +' FoodCoin за замовлення №'+ item.orderNumber + '!';
                const obj = {
                    "foodcoin": item.foodCoinHistory.coin,
                    "userShow": item.owneruser,
                    "order": item._id,
                    "type": "foodcoin",
                    "est": item.ownerest,
                    "coment": coment,
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

module.exports.historyPayFoodCoin = async function(req, res) {

    const history = await BasketList.find({status: 6, paymentType: "coin"}).exec((err, doc)=>{
        doc.map(item=>{
            if(item.foodCoinHistory.isAdd == false){
                let coment = 'З Вашого балансу списано '+ item.foodCoinHistory.coin +' FoodCoin за замовлення №'+ item.orderNumber + '!';
                const obj = {
                    "foodcoin": item.foodCoinHistory.coin,
                    "userShow": item.owneruser,
                    "order": item._id,
                    "type": "foodcoin",
                    "est": item.ownerest,
                    "coment": coment,
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

module.exports.historyAddRegisterFoodCoin = async function(req, res) {

    const history = await User.find({verify: true}).exec((err, doc)=>{
        doc.map(item=>{
            let coment = 'Бонус реєстрації! Вам нараховано 10 FoodCoin!';
            const obj = {
                "foodcoin": 10,
                "userShow": item._id,
                "type": "foodcoin",
                "est": "Taste of Life",
                "coment": coment,
                "date": item.data
            }
            //console.log('!!!Working!!!')
            const h = new History(obj);
            h.save();
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

