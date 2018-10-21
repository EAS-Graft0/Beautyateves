var dbHelper = require('../utils/databaseHelper.js')
var Promise = require('promise');

exports.function = function() {
    return new Promise(function(resolve, reject) {
        dbHelper.getData('select * from lu_snacks;').then(function(snackResults) {
            if (snackResults.errno === undefined) {
                var snackIngredientPromises = []
                for (meal in snackResults) {
                    var snackIngredientPromise = new Promise(function(resolve, reject) {
                        var intMeal = meal;
                        dbHelper.getData('select lu_ingredients.k,lu_ingredients.c,lu_ingredients.p,lu_ingredients.f,lu_ingredients.s,lu_ingredients.name,lu_snack_ingredients.ingredient_id,lu_snack_ingredients.amount,lu_ingredients.measurement,lu_ingredients.cost as co,lu_ingredients.volume, lu_ingredients.measurement_type from lu_snack_ingredients join lu_ingredients on lu_ingredients.id = lu_snack_ingredients.ingredient_id where lu_snack_ingredients.meal_id=' + snackResults[intMeal].id).then(function(ingredientResults) {
                            snackResults[intMeal].ingredients = ingredientResults
                            resolve('done')
                        })
                    })
                    snackIngredientPromises.push(snackIngredientPromise)
                }
                Promise.all(snackIngredientPromises).then(function(alldone) {
                    resolve(snackResults)
                })

                //resolve(shakeResults);
            } else {
                //Error Log
                resolve('Error retrieving meals')
            }
        })
    })
}