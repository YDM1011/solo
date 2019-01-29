const glob = require('glob');

module.exports = (req,res,next)=>{
    let errVal = 0;
    if(req.body.login){
        if(req.body.login.length >= 4 && req.body.login.length  <= 36){
            if(req.body.login.search('@') > -1){}
            else{errVal++;}
        }else{
            errVal++;
        }
    }
    if(req.body.pass){
        if(req.body.pass.length >= 6
            && req.body.pass.length  <= 24){
        }else{
            errVal++;
        }
    }
    if (errVal > 0){
       return res.badRequest("Login or passwor is wrong");
    }else{
        next();
    }
};