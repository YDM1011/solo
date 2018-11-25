const glob = require('glob');

module.exports = (req,res,next)=>{
    let errVal = 0;
    let text = '';
    if(req.body.subdomain){
        if(req.body.subdomain.length >= 1
            && req.body.subdomain.length  <= 10){
            let est = req.body.subdomain;
            if((est.toLowerCase() == 'admin') ||
                (est.toLowerCase() == 'api') ||
                (est.toLowerCase() == 'adm') ||
                (est.toLowerCase() == 'travel') ||
                (est.toLowerCase() == 'work') ||
                (est.toLowerCase() == 'reklama') ||
                (est.toLowerCase() == 'run') ||
                (est.toLowerCase() == 'help') ||
                (est.toLowerCase() == 'charity') ||
                (est.toLowerCase() == 'cafe') ||
                (est.toLowerCase() == 'blog') ||
                (est.toLowerCase() == 'shop')
            ){
                errVal++;
                text = `${est} вже занятий!`;
                return res.badRequest(text);
            }
        }else{
            errVal++;
            text = 'Сабдомен мусить бути не менше 1 символів і не більше 10!';
        }
    }else {errVal++; text = 'Сабдомен мусить бути не менше 1 символів і не більше 10!';}
    if(req.body.mobile){
        if(req.body.mobile.length == 10){
        }else{
            errVal++;
            text += ' Номер телефону з 10 символів!';
        }
    }else {errVal++; text += ' Номер телефону з 10 символів!';}
    if (errVal > 0){
       return res.badRequest(text);
    }else{
        next();
    }
};