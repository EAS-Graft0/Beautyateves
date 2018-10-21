var dbHelper = require('../utils/databaseHelper.js')
var Promise = require('promise');

exports.function = function(req) {
    return new Promise(function(resolve, reject) {
        dbHelper.getData('SELECT * FROM users WHERE name="' + req.body.username + '" AND password="' + req.body.password + '";').then(function(userResult) {
            if (userResult.errno === undefined && userResult.length != 0) {
                var location = '#!/orders'
                if (userResult[0].name == 'admin') {
                    location = '#!/admin'
                }
                dbHelper.getData('SELECT * FROM user_sessions WHERE user_id="' + userResult[0].id + '" AND expires > CURRENT_TIMESTAMP;').then(function(sessionResult) {
                    if (sessionResult.errno === undefined && sessionResult.length != 0) {
                        resolve({
                            token: sessionResult[0].token,
                            location: location
                        })
                    } else {
                        var userToken = generateToken()
                        dbHelper.getData('INSERT INTO user_sessions (user_id, token, expires) VALUES (' + userResult[0].id + ',"' + userToken + '", "' + new Date(Date.now() + (1000 * 60 * 60)).toLocaleString().split('/').join('-') + '");').then(function(insertSessionResult) {
                            if (insertSessionResult.errno === undefined) {
                                resolve({
                                    token: userToken,
                                    location: location
                                })
                            } else {
                                reject({ error: 'error creating session' });
                            }
                        });
                    }
                });
            } else {
                resolve({ error: 'no user' });
            }
        });
    })
}

function generateToken() {
    var token = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 18; i++) {
        if (i == 6 || i == 12) {
            token += '-'
        }
        token += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return token;
}