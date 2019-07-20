/**
 * model: user ?
 * mobile: ?
 * subdomain: ?
 * estId: ?
 * oneEstId: ?
 */
const mongoose = require('mongoose');
const request = require('request');
const glob = require('glob');

const History = require('../history');

const send = async (req,res,next)=>{
    let sendResult = await smsSend();
    res.ok(sendResult);
};

const sendCode = async (req,res,next)=>{
    let code = getCode();

    let isMobile = await checkPhone(req).catch(e=>{return res.badRequest(e)});
    let isUnicue = await unicueMobile(req).catch(e=>{return res.badRequest(e)});
    if (!isMobile && isUnicue){
        let isSave = await saveCode(req, code).catch(e=>{return res.badRequest(e)});
        if(isSave.codeSaved && isSave.mobile){
            smsSend(code,isSave.mobile);
            return res.ok(isSave);
        } else {
            return res.serverError()
        }
    }else{
        if (isMobile) return res.badRequest("Мобільний телефон вже підключено!");
        // if (!isUnicue) return res.badRequest("Мобільний вже використовується!");
    }

};

const confirmCode = async (req,res,next)=>{
    let isMobile = await checkPhone(req).catch(e=>{return res.badRequest(e)});
    let isUnicue = await unicueMobile(req).catch(e=>{return res.badRequest(e)});
    let isCode = verifyMobileCode(req);
    //console.log(isMobile,isCode);
    if (!isMobile && isCode && isUnicue){
        let me = await saveMobile(req).catch(e=>{return res.badRequest(e)});
        return res.ok(me)
    }else{
        if (isMobile) return res.badRequest("Мобільний телефон вже підключено!");
        // if (!isUnicue) return res.badRequest("Мобільний вже використовується!");
        if (!isCode) return res.badRequest("Код не вірний!");
    }
};

const smsSend = (mes="test",phone)=>{
    return new Promise((rs,rj)=>{
        let sender = 'TasteOfLife';
        request(`https://smsc.ua/sys/send.php?login=Denis_Tasteol&psw=CVYeegS32jrJ7ef&phones=${phone}&mes=${mes}&sender=${sender}`,
            (error, response, body) => {
                //console.log('error:', error); // Print the error if one occurred
                //console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
                //console.log('body:', body); // Print the HTML for the Google homepage.
                rs({body, response})
            });
    })
};

const getCode = ()=>{
    return String(parseInt(Math.random()*100000))
};

const saveCode = (req, code)=>{
    return new Promise((rs,rj)=>{
        let modData = getModel(req);
        if(!modData) return rj("model is required");
        if(!modData.name) return rj("model is required");

        //console.log(code);
        glob[req.userId+'codeConfirmMobile'] = code;
        req.body.mobile = parseMobile(req.body.mobile);
        glob[req.userId+modData.name+'Mobile'] = req.body.mobile;
        rs({codeSaved:true,mobile:req.body.mobile})
    })

};

const clearCode = (req)=>{
    //console.log(glob[req.userId+'codeConfirmMobile']);
    delete glob[req.userId+'codeConfirmMobile'];
};

const verifyMobileCode = (req)=>{
    //console.log(req.body.code === glob[req.userId+'codeConfirmMobile']);
    //console.log(typeof glob[req.userId+'codeConfirmMobile'],glob[req.userId+'codeConfirmMobile']);
    //console.log(typeof req.body.code,req.body.code);
    if (req.body.code === glob[req.userId+'codeConfirmMobile']){
        clearCode(req);
        return true
    } else {
        clearCode(req);
        return false
    }
};

const saveMobile = (req, code)=>{
    let modData = getModel(req);
    return new Promise((rs,rj)=>{
        if(!modData) return rj("model is required");
        if(!modData.newData) return rj("invalid mobile");
        mongoose.model('foodCoin')
            .findOne(modData.newData)
            .exec((e,r)=>{
                if(e) return rj(e);
                let data = modData.newData;
                let coinData = Object.assign({},modData.newData) ;
                if (r){
                    if (r.isActive || (r.isActive === null || r.isActive === undefined)){
                        // data['foodcoin'] = parseInt(r ? r.foodcoin || 0:0);
                        if(r.foodcoin){
                            data['$inc'] = {foodcoin:r.foodcoin};
                            let coment = 'Ваші накопичені у Соло бонуси ('+ parseInt(r.foodcoin)+') конвертовано у '+ parseInt(r.foodcoin) +' FoodCoin системи Taste of Life! Смачного!';
                            const obj = {
                                "foodcoin": parseInt(r.foodcoin),
                                "userShow": req.userId,
                                "type": "foodcoin",
                                "est": "Old bonus",
                                "coment": coment
                            }
                            //console.log('!!!Working!!!')
                            const h = new History(obj);
                            h.save();

                        } else {
                            data['$inc'] = {foodcoin:0}
                        }

                        //console.log("coinData", coinData);

                        mongoose.model('foodCoin')
                            .findOneAndUpdate(coinData, {isActive:false})
                            .exec((e0,r0)=>{
                                //console.log(e0,r0)
                            })
                    }
                }
                //console.log("Data: ",data);
                mongoose.model(modData.name)
                    .findOneAndUpdate(modData.query, data, {new: true})
                    .exec((e,r)=>{
                        //console.log("Data2: ",data);
                        if(e) return rj(e);
                        if(!r) return rj("Not found");
                        if(r) {
                            return rs(r)
                        }
                    });
                delete glob[req.userId+'userMobile'];
            });


    })
};

const getModel = req =>{
    if(req.body){
        if (req.body.model === 'user'){
            let obj = {
                query: {_id: req.userId},
                mobileField: "mobile",
                name: "user"
            };
            glob[req.userId+'userMobile'] ? obj.newData = {mobile: glob[req.userId+'userMobile'].slice(-10)} : obj.newData = {mobile: req.body.mobile.slice(-10)};

            return obj;
        }

        return null
    }
};

const checkPhone = req =>{
    let modData = getModel(req);
    return new Promise((rs,rj)=>{
        if(!modData) return rj("model is required");
        if(!modData.newData) return rj("invalid mobile");

        mongoose.model(modData.name)
            .findOne(modData.query)
            .select(modData.mobileField)
            .exec((e,r)=>{
                if(e) return rj(e);
                if(!r) return rs(false);
                if(r){
                    if(r[modData.mobileField])
                        return rs(true);
                    else
                        return rs(false);
                }
            })
    })
};
const unicueMobile = req =>{
    let modData = getModel(req);
    return new Promise((rs,rj)=>{
        mongoose.model('user')
            .findOne({mobile: modData.newData.mobile})
            .exec((e,r)=>{
                if (e) return rj(e);
                if (r) return rj('Мобільний вже використовується');
                if (!r) return rs(true);
            })

    })
}

const parseMobile = str =>{
    var b = '';
    str.match(/\d+/ig).map(i => {
        b = b + String(i);
    })
    return b
};

module.exports.send = send;
module.exports.sendCode = sendCode;
module.exports.confirmCode = confirmCode;