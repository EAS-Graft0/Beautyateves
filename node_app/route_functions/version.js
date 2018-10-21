var dbHelper = require('../utils/databaseHelper.js') // delete this if there are no database queries in this route
var Promise = require('promise');
var authHelper = require('../utils/authHelper.js');

exports.getVersion = function() {
    return new Promise(function(resolve, reject) {
        dbHelper.getData('select id,name from lu_meals;').then(function(mealResults) {
            if (mealResults.errno === undefined) {
                var mealPromises = []
                for (meal in mealResults) {

                    var mealPromise = new Promise(function(resolve, reject) {
                        var intMeal = meal;
                        console.log(mealResults[intMeal].id)
                        dbHelper.getData('select lu_ingredients.*,lu_meal_ingredients.amount from lu_meal_ingredients join lu_ingredients on lu_ingredients.id = lu_meal_ingredients.ingredient_id where lu_meal_ingredients.meal_id =' + mealResults[intMeal].id).then(function(ingredientsResult) {
                            if (ingredientsResult.errno === undefined) {
                                mealResults[intMeal].ingredients = ingredientsResult;
                                mealResults[intMeal].total_capacity = 0;
                                mealResults[intMeal].total_k = 0;
                                mealResults[intMeal].total_c = 0;
                                mealResults[intMeal].total_p = 0;
                                mealResults[intMeal].total_f = 0;
                                mealResults[intMeal].total_s = 0;
                                for (ingredient in ingredientsResult) {
                                    mealResults[intMeal].total_capacity += (ingredientsResult[ingredient].volume * ingredientsResult[ingredient].amount)
                                    mealResults[intMeal].k += (ingredientsResult[ingredient].k * ingredientsResult[ingredient].amount)
                                    mealResults[intMeal].c += (ingredientsResult[ingredient].c * ingredientsResult[ingredient].amount)
                                    mealResults[intMeal].p += (ingredientsResult[ingredient].p * ingredientsResult[ingredient].amount)
                                    mealResults[intMeal].f += (ingredientsResult[ingredient].f * ingredientsResult[ingredient].amount)
                                }

                                resolve('done');
                            } else {
                                console.log(ingredientsResult)
                            }
                        })
                    })
                    mealPromises.push(mealPromise)
                }
                Promise.all(mealPromises).then(function(mealPromisesResults) {
                    resolve(mealResults)
                })
            } else {
                console.log(mealResults)
            }
        })

    })
}