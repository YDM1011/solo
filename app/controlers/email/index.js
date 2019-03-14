const ejs = require('ejs');
const fs = require('fs');
const path = require('path');
const data = require('../../config/config').data;
const nodemailer = require('nodemailer');
module.exports.sendMail = (obj) => {

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

    const contentMail ={
        message: obj,
        link: String("http://localhost:4200")
    };
    transporter.sendMail({
        from: data.email.user,
        to: obj.mail,
        subject: data.email.subject,
        html: ejs.render( fs.readFileSync(path.join(__dirname, '../../views-v1/emailTemplate/confirm-signup.ejs'), 'utf-8') , contentMail)
    }, (err, info) => {
        if (err) {
            return console.log(err);
        }
    });
};