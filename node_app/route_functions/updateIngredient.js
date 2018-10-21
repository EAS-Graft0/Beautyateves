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
                dbHelper.insert('UPDATE lu_ingredients SET ? WHERE id = ' + req.query.id, req.body).then(function(insert_ingredient_result) {
                    if (insert_ingredient_result.errno === undefined) {
                        resolve('success')
                    } else {
                        reject('error inserting ingredient')
                    }
                })
            }
        })
    })
}