var dbHelper = require('../utils/databaseHelper.js')
var Promise = require('promise');

exports.function = function(data) {
    return new Promise(function(resolve, reject) {
        dbHelper.getData("SELECT lu_meals.id, sum(lu_meal_ingredients.amount * lu_ingredients.k) AS  k, sum(lu_meal_ingredients.amount * lu_ingredients.s) AS s, sum(lu_meal_ingredients.amount * lu_ingredients.p) AS p, sum(lu_meal_ingredients.amount * lu_ingredients.f )AS f, sum(lu_meal_ingredients.amount * lu_ingredients.c) AS c FROM lu_meals INNER JOIN lu_meal_ingredients ON lu_meals.id = lu_meal_ingredients.meal_id INNER JOIN lu_ingredients ON lu_meal_ingredients.ingredient_id = lu_ingredients.id WHERE lu_meals.id=" + data.id).then(function(mealNutritionResults){
            if(mealNutritionResults.errno === undefined){
                resolve(mealNutritionResults);
                //on Success console.log (meal.id)
             }else{
             //Error Log
                resolve('Error retrieving meal Nutrition')
            }
        })
    })
}
