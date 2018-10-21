var dbHelper = require('../utils/databaseHelper.js')
var Promise = require('promise');
var authHelper = require('../utils/authHelper.js');

exports.function = function(req) {
    return new Promise(function(resolve, reject) {

        authHelper.checkAuth(req, 'admin').then(function(authResult) {
            console.log(authResult)
            if (authResult == 'reject') {
                reject()
            } else {
                dbHelper.insert('UPDATE voucher_codes SET ? WHERE id = ' + req.query.id, req.body).then(function(update_voucher_result) {
                    if (update_voucher_result.errno === undefined) {
                        resolve('success')
                    } else {
                        reject('error updating voucher')
                    }
                })
            }
        })
    })
}