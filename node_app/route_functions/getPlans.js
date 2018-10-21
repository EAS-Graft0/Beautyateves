var dbHelper = require('../utils/databaseHelper.js')
var Promise = require('promise');

exports.function = function() {
    return new Promise(function(resolve, reject) {
        dbHelper.getData('select *,(meal_count+ shake_count+ snack_count) as slots from lu_plans').then(function(planResults) {
            if (planResults.errno === undefined) {
                resolve(planResults);
            } else {
                //Error Log
                resolve('Error retrieving plans')
            }
        })
    })
}