var dbHelper = require('../utils/databaseHelper.js')
var Promise = require('promise');

exports.function = function(filters) {
    return new Promise(function(resolve, reject) {

        dbHelper.getData("SELECT * FROM lu_ingredients;").then(function(ingredientsResult) {
            if (ingredientsResult.errno === undefined) {
                resolve(ingredientsResult)
            } else {
                console.log("ingredientsResult: " + ingredientsResult);
                resolve("error retrieving ingredients");
            }
        })
    })
}