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
                dbHelper.getData('select * from voucher_codes').then(function(planResults) {
                    if (planResults.errno === undefined) {
                        resolve(planResults);
                    } else {
                        //Error Log
                        resolve('Error retrieving plans')
                    }
                })
            }
        })
    })
}