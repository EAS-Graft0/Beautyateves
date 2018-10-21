var mysql = require('mysql');
var Promise = require('promise')
appConfig = require('../conf/appConfig.js');
// Initialise database connection
function handleDisconnect() {
    connection = mysql.createConnection(appConfig.db_config);
    connection.connect(function(err) {
        if (err) {
            setTimeout(handleDisconnect, 2000);
        }
    });
    connection.on('error', function(err) {
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            handleDisconnect();
        } else {
            throw err;
        }
    });
}
handleDisconnect();
exports.getData = function(queryString) {
    return new Promise(function(resolve, reject) {
        connection.query(queryString, function(err, data, fields) {
            if (err) {
                console.log(err)
                resolve(err)
            } else {
                resolve(data)
            }
        })
    })
}
exports.insert = function(queryString, dataToInsert) {
    return new Promise(function(resolve, reject) {
        connection.query(queryString, dataToInsert, function(error, results, fields) {
            if (error) {
                console.log(error);
                resolve(error)
            } else {
                resolve(results)
            }
        });
    })
}
exports.update = function(queryString, dataToUpdate) {
    return new Promise(function(resolve, reject) {
        connection.query(queryString, dataToUpdate, function(error, results, fields) {
            if (error) {
                resolve(error)
            } else {
                resolve(results)
            }
        });
    })
}