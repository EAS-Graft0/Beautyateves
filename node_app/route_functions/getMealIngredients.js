var dbHelper = require('../utils/databaseHelper.js')
var Promise = require('promise');

exports.function = function() {
    return new Promise(function(resolve, reject) {
        dbHelper.getData('SELECT * FROM lu_meal_ingredients INNER JOIN lu_ingredients ON lu_meal_ingredients.ingredient_id = lu_ingredients.id').then(function(mealIngredientsResults){
            if(mealIngredientsResults.errno === undefined){
                resolve(mealIngredientsResults);
             }else{
             //Error Log
                resolve('Error retrieving meal ingredients')
            }
        })
    })
}
