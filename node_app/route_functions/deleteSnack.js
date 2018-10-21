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
                dbHelper.getData('DELETE FROM lu_snacks where id=' + req.query.id).then(function(deleteResult) {
                    if (deleteResult.errno === undefined) {
                        resolve()

                    } else {
                        reject('error deleting meal')
                    }
                })
            }
        })
    })
}