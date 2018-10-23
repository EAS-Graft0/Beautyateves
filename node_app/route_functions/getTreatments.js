var dbHelper = require('../utils/databaseHelper.js')
var Promise = require('promise');

exports.function = function() {
    return new Promise(function(resolve, reject) {
        dbHelper.getData("SELECT * FROM treatments").then((result) => {
            resolve(result)
        })
    })
}