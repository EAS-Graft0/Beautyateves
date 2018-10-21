var dbHelper = require('../utils/databaseHelper.js')
var Promise = require('promise');

exports.function = function() {
    return new Promise(function(resolve, reject) {
        dbHelper.getData('select * from lu_allergy_ingredients').then(function(allergyIngredientsResults){
            if(allergyIngredientsResults.errno === undefined){
                resolve(allergyIngredientsResults);
             }else{
             //Error Log
                resolve('Error retrieving allergy ingredients')
            }
        })
    })
}
