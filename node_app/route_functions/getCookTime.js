var dbHelper = require('../utils/databaseHelper.js')
var Promise = require('promise');
exports.function = function(filters) {
  return new Promise(function(resolve, reject) {
    dbHelper.getData("select sum(cooktime) as cooktime, sum(preptime) as preptime, lu_ingredients.cooktime as ingredientcooktime from lu_ingredients inner join lu_meal_ingredients  on lu_ingredients.id = lu_meal_ingredients.meal_id inner join delivery_meals where lu_meal_ingredients.id = delivery_meals.std_meal_id;").then(function(cooktimeResult) {
      if (cooktimeResult.errno === undefined) {
        resolve(cooktimeResult)
      } else {
        resolve("error retrieving cooktimes");
      }
    })
  })
}
