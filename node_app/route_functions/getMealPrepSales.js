var dbHelper = require('../utils/databaseHelper.js')
var Promise = require('promise');

exports.function = function(filters) {
  return new Promise(function(resolve, reject) {

       dbHelper.getData("select delivery_meals.std_meal_id, lu_meals.img, lu_meals.name, count(delivery_meals.id) as qty from delivery_meals inner join lu_meals on delivery_meals.std_meal_id = lu_meals.id where delivery_meals.std_meal_id = lu_meals.id group by lu_meals.name;").then(function(mealPrepSalesResult) {
         if (mealPrepSalesResult.errno === undefined) {
           resolve(mealPrepSalesResult)
         } else {
           resolve("error retrieving meal prep sales results");
         }
       })
  })
}
