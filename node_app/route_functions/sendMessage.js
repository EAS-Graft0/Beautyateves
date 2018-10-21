var dbHelper = require('../utils/databaseHelper.js')
var Promise = require('promise');
const nodemailer = require('nodemailer');
const emailAddress = 'mealprep@purofitfood.com';
const emailPassword = 'Purounit11?';

exports.function = function(body) {
    return new Promise(function(resolve, reject) {

        let transporter = nodemailer.createTransport({
            host: 'smtp.123-reg.co.uk',
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
                user: emailAddress, // generated ethereal user
                pass: emailPassword // generated ethereal password
            }
        });

        let mailOptions = {
            from: emailAddress, // sender address
            to: emailAddress, // list of receivers
            subject: 'Web email from ' + body.email, // Subject line
            text: body.message // plain text body
                // html: '<b>Hello world?</b>' // html body
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                reject(error);
            }
            resolve('Your message was sent successfully.');

        });
    })
}