var dbHelper = require('../utils/databaseHelper.js')
var Promise = require('promise');

exports.function = function() {
    return new Promise(function(resolve, reject) {
        dbHelper.getData('select * from lu_shakes;').then(function(shakeResults) {
            if (shakeResults.errno === undefined) {
                var shakeIngredientPromises = []
                for (meal in shakeResults) {
                    var shakeIngredientPromise = new Promise(function(resolve, reject) {
                        var intMeal = meal;
                        dbHelper.getData('select lu_ingredients.k,lu_ingredients.c,lu_ingredients.p,lu_ingredients.f,lu_ingredients.s,lu_ingredients.name,lu_shake_ingredients.ingredient_id,lu_shake_ingredients.amount,lu_ingredients.measurement,lu_ingredients.cost as co,lu_ingredients.volume, lu_ingredients.measurement_type from lu_shake_ingredients join lu_ingredients on lu_ingredients.id = lu_shake_ingredients.ingredient_id where lu_shake_ingredients.meal_id=' + shakeResults[intMeal].id).then(function(ingredientResults) {
                            shakeResults[intMeal].ingredients = ingredientResults
                            resolve('done')
                        })
                    })
                    shakeIngredientPromises.push(shakeIngredientPromise)
                }
                Promise.all(shakeIngredientPromises).then(function(alldone) {
                    resolve(shakeResults)
                })

                //resolve(shakeResults);
            } else {
                //Error Log
                resolve('Error retrieving meals')
            }
        })
    })
}