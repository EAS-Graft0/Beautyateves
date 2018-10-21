var dbHelper = require('../utils/databaseHelper.js')
var Promise = require('promise');
var fs = require('fs');

exports.function = function(body) {
    return new Promise(function(resolve, reject) {
        console.log(body)
        resolve()
    })
}