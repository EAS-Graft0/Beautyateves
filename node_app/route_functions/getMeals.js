var dbHelper = require('../utils/databaseHelper.js')
var Promise = require('promise');

exports.function = function() {
    return new Promise(function(resolve, reject) {
        dbHelper.getData('select * from lu_meals;').then(function(mealResults) {
            if (mealResults.errno === undefined) {
                var mealIngredientPromises = []
                for (meal in mealResults) {
                    var mealIngredientPromise = new Promise(function(resolve, reject) {
                        var intMeal = meal;
                        dbHelper.getData('select lu_ingredients.k,lu_ingredients.c,lu_ingredients.p,lu_ingredients.f,lu_ingredients.s,lu_ingredients.name,lu_meal_ingredients.ingredient_id,lu_meal_ingredients.amount,lu_ingredients.measurement,lu_ingredients.cost as co,lu_ingredients.volume, lu_ingredients.measurement_type from lu_meal_ingredients join lu_ingredients on lu_ingredients.id = lu_meal_ingredients.ingredient_id where lu_meal_ingredients.meal_id=' + mealResults[intMeal].id).then(function(ingredientResults) {
                            mealResults[intMeal].ingredients = ingredientResults
                            resolve('done')
                        })
                    })
                    mealIngredientPromises.push(mealIngredientPromise)
                }
                Promise.all(mealIngredientPromises).then(function(alldone) {
                    resolve(mealResults)
                })

                //resolve(mealResults);
            } else {
                //Error Log
                resolve('Error retrieving meals')
            }
        })
    })
}