const ejs = require('ejs');
const fs = require('fs');
const path = require('path');
const data = require('../../config/config').data;
const nodemailer = require('nodemailer');
module.exports.sendMail = (obj, st = null) => {

    let template = path.join(__dirname, '../../views-v1/emailTemplate/confirm-signup.ejs');
    const transporter = nodemailer.createTransport(
        {
            host: data.email.host,
            port: data.email.port,
            secure: data.email.secure,
            auth: {
                user: data.email.user,
                pass: data.email.pass
            }
        });
        //console.log('11111111111111111111'+st);
    if (st){
        switch(st){
            case 'err':                
                template = path.join(__dirname, '../../views-v1/emailTemplate/est3.ejs');
                sender(transporter, data, obj, template);
                //console.log('WWWWWWWWWWWWWWWWWW');
                break;
            case 1:
                if(obj.isUser){
                    template = path.join(__dirname, '../../views-v1/emailTemplate/user1.ejs');
                    sender(transporter, data, obj, template);
                }
                if(obj.isEst){
                    template = path.join(__dirname, '../../views-v1/emailTemplate/est1.ejs');
                    sender(transporter, data, obj, template);
                    //console.log(obj);
                }
                break;
            case 2:
                if(obj.isUser){
                    if(obj.orderType == 'delivery'){
                        template = path.join(__dirname, '../../views-v1/emailTemplate/user2d.ejs');
                        sender(transporter, data, obj, template);
                    }else if(obj.orderType != 'delivery'){
                        template = path.join(__dirname, '../../views-v1/emailTemplate/user2.ejs');
                        sender(transporter, data, obj, template);
                    }
                }
                if(obj.isEst){
                    template = path.join(__dirname, '../../views-v1/emailTemplate/est2.ejs');
                    sender(transporter, data, obj, template);
                    //console.log(obj);
                }
                break;
            case 3:
                if(obj.isUser){
                    template = path.join(__dirname, '../../views-v1/emailTemplate/user3.ejs');
                    sender(transporter, data, obj, template);
                }
                break;
            case 4:
                if(obj.isEst){
                    template = path.join(__dirname, '../../views-v1/emailTemplate/est4.ejs');
                    sender(transporter, data, obj, template);
                }
                break;
            case 5:
                if(obj.isUser){
                    template = path.join(__dirname, '../../views-v1/emailTemplate/user5.ejs');
                    sender(transporter, data, obj, template);
                }
                break;
            case 6:
                if(obj.isUser){
                    template = path.join(__dirname, '../../views-v1/emailTemplate/user6.ejs');
                    sender(transporter, data, obj, template);
                }
                if(obj.isEst){
                    template = path.join(__dirname, '../../views-v1/emailTemplate/est6.ejs');
                    sender(transporter, data, obj, template);
                }
                break;
            case 7:
                if(obj.isUser){
                    template = path.join(__dirname, '../../views-v1/emailTemplate/user7.ejs');
                    sender(transporter, data, obj, template);
                }
                if(obj.isEst){
                    template = path.join(__dirname, '../../views-v1/emailTemplate/est7.ejs');
                    sender(transporter, data, obj, template);
                }
                break;
            default: return
        }
    }

    if (!st) sender(transporter, data, obj, template);

};

const sender = (tr, data, obj, template, st = null)=>{
    tr.sendMail({
        from: data.email.user,
        to: obj.mail,
        subject: st ? data.email.subject : 'Taste of Life',
        html: ejs.render( fs.readFileSync(template, 'utf-8') , {message: obj})
    }, (err, info) => {
        if (err) {
            return console.log(err);
        }
    });
};