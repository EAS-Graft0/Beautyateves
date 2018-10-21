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
            to: body.mealData.customer.email, // list of receivers
            subject: 'Invoice for Order ' + body.order_id, // Subject line
            // text: "Your Order", // plain text body
            html: '<div> <div style="width: 50%"> <h3>Puro Fit Food</h3> <small>47 York Place,</small> <small>Newport, Wales, NP20 4GD </small> <small>' + new Date().toISOString().substring(0, 10) + '</small> </div> <div style="width: 50%"> <div style="background: url(https://stdavidscardiff.com/sites/st_davids/files/styles/shop_logo/public/images/shops/logos/fit-food-logo-web.jpg?itok=0Fz9x9xI);"> </div> </div> <hr> <div> <b>Bill To</b> <br> <p>' + (body.mealData.customer.name + body.mealData.customer.surname) + '</p> <br> <p>' + body.mealData.address + '</p> </div> <div> <b>Deliver To</b> <br> <p>' + body.mealData.customer.name + '</p> <br> <p>' + body.mealData.address + '</p> </div> <hr> <table> <thead> <tr> <th>Qty</th> <th>Description</th> <th>Price</th> </tr> </thead> <tbody> <tr> <td>1</td> <td>' + body.mealData.plans[body.mealData.mealPlan.planIndex].description + '</td> <td>£' + (body.mealData.plans[body.mealData.mealPlan.planIndex][body.mealData.planLength] += body.mealData.mealPlan.extraCost) + '</td> </tr> </tbody> </table> </div>' // html body
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                reject(error);
            }
            resolve();
        });
    })
}