var dbHelper = require('../utils/databaseHelper.js')
var Promise = require('promise');

exports.function = function() {
    return new Promise(function(resolve, reject) {
        dbHelper.getData("SELECT * FROM categories").then((result) => {
            resolve(result)
        })
    })
}