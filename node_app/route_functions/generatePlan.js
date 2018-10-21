var dbHelper = require('../utils/databaseHelper.js')
var Promise = require('promise');

exports.function = function() {
    return new Promise(function(resolve, reject) {
      dbHelper.getData('select lu_meals.* from lu_meals join lu_meal_ingredients on lu_meal_ingredients.meal_id = lu_meals.id join lu_ingredients on lu_ingredients.id = lu_meal_ingredients.ingredient_id where lu_meal_ingredients.ingredient_id in (1,2,3)')
    })
}
