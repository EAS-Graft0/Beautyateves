var dbHelper = require('../utils/databaseHelper.js'),
    Promise = require('promise'),
    authHelper = require('../utils/authHelper.js');

exports.function = function(req) {
    return new Promise(function(resolve, reject) {
        authHelper.checkAuth(req, 'admin').then(function(authResult) {
            console.log(authResult)
            if (authResult == 'reject') {
                reject()
            } else {
                dbHelper.insert('insert into voucher_codes SET ?', req.body).then(function(insert_voucher_result) {
                    if (insert_voucher_result.errno === undefined) {
                        resolve('success')
                    } else {
                        resolve('error inserting voucher')
                    }
                })
            }
        });


    })
}