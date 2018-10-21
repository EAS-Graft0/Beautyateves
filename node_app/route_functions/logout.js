var dbHelper = require('../utils/databaseHelper.js')
var Promise = require('promise');

exports.function = function(req) {
    return new Promise(function(resolve, reject) {
        dbHelper.getData('UPDATE user_sessions set expires=CURRENT_TIMESTAMP WHERE token="' + req.headers["session-token"] + '" AND expires > CURRENT_TIMESTAMP;').then(function(sessionResult) {
            if (sessionResult.errno === undefined) {
                resolve('success')
            } else {
                resolve('failed')
            }
        });
        // resolve()
    })
}