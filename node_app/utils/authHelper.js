var dbHelper = require('../utils/databaseHelper.js');
var Promise = require('promise');

exports.checkAuth = function(req, role) {
    return new Promise(function(resolve, reject) {
        console.log(req.headers["session-token"])
        dbHelper.getData('SELECT * FROM user_sessions WHERE token="' + req.headers["session-token"] + '" AND expires > CURRENT_TIMESTAMP;').then(function(checkTokenResult) {
            if (checkTokenResult.length > 0) {
                dbHelper.getData('SELECT * FROM users WHERE id=' + checkTokenResult[0].user_id + ';').then(function(checkUserResult) {
                    if (checkUserResult[0].name == role) {
                        dbHelper.getData('UPDATE user_sessions set expires="' + new Date(Date.now() + (1000 * 60 * 60)).toLocaleString().split('/').join('-') + '" WHERE id=' + checkTokenResult[0].id + ';').then(function(updateTokenResult) {
                            resolve('allow');
                        })
                    } else {
                        resolve('reject');
                    }
                })

            } else {
                resolve('reject');
            }

        })
    })
}