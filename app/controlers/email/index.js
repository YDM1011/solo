const ejs = require('ejs');
const fs = require('fs');
const path = require('path');
const nodemailer = require('nodemailer');
module.exports.sendMail = (obj) => {

    const transporter = nodemailer.createTransport(
        {
            host: "smtp.mail.yahoo.com",
            port: 465,
            secure: true,
            auth: {
                user: "ydm101194@yahoo.com",
                pass: "adn45hrf"
            }
        });


    const contentMail ={
        message: obj.hash,
        link: String("http://localhost:4200")
    };
    transporter.sendMail({
        from: "ydm101194@yahoo.com",
        to: obj.mail,
        subject: "For Test",
        html: ejs.render( fs.readFileSync(path.join(__dirname, '../../views/emailTemplate/confirm-signup.ejs'), 'utf-8') , contentMail)
    }, (err, info) => {
        if (err) {
            return console.log(err);
        }
    });
};