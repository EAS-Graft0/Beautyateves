var dbHelper = require('../utils/databaseHelper.js')
var Promise = require('promise');

exports.getPrepStation = function(req) {
  return new Promise(function(resolve, reject) {
    var ingredientJSON = {}
    console.log(req.query.deliveryDate)
    dbHelper.getData('select delivery_meals.* from deliveries join delivery_meals on delivery_meals.delivery_id = deliveries.id where deliveries.delivery_date ="2018-01-01";').then(function(prepStationResults) {
      if (prepStationResults.errno === undefined) {
        console.log(prepStationResults)
        var prepIngredientPromises = [];
        for (meal in prepStationResults) {
          var prepIngredientPromise = new Promise(function(resolve, reject) {
            var intMeal = meal
            dbHelper.getData("SELECT lu_ingredients.name AS name,lu_ingredients.img AS img, lu_ingredients.cooktime as ingredientcooktime, SUM((lu_meal_ingredients.amount * lu_ingredients.measurement)) AS amount, ceil(amount / lu_equipment.capacity) AS batches, ceil(amount / (amount / lu_equipment.capacity)) AS batchqty, lu_equipment.capacity, lu_ingredients.cooktime FROM lu_meals JOIN lu_meal_ingredients ON lu_meal_ingredients.meal_id = lu_meals.id JOIN lu_ingredients ON lu_ingredients.id = lu_meal_ingredients.ingredient_id JOIN lu_equipment_ingredients ON lu_equipment_ingredients.ingredient_id = lu_ingredients.id JOIN lu_equipment ON lu_equipment.id = lu_equipment_ingredients.equipment_id WHERE lu_meals.id = '" + prepStationResults[intMeal].std_meal_id + "' group by lu_ingredients.name").then(function(prepIngredientResults) {
              if (prepIngredientResults.errno === undefined) {
                console.log(prepStationResults[intMeal].id)
                for (ing in prepIngredientResults) {
                  if (!ingredientJSON[prepIngredientResults[ing].name]) {
                    ingredientJSON[prepIngredientResults[ing].name] = {}
                    ingredientJSON[prepIngredientResults[ing].name].total = 0
                    ingredientJSON[prepIngredientResults[ing].name].img = prepIngredientResults[ing].img

                  }
                  if (prepIngredientResults[ing].amount !== undefined) {
                    ingredientJSON[prepIngredientResults[ing].name].total += prepIngredientResults[ing].amount
                  }
                }
                if (prepStationResults[intMeal].custom_meal == '1') {
                  console.log('hit')
                  dbHelper.getData("select lu_ingredients.name,lu_ingredients.name as name ,sum((delivery_ingredients.amount*lu_ingredients.measurement)) as amount from delivery_ingredients join lu_ingredients on lu_ingredients.id = delivery_ingredients.dmi where delivery_ingredients.dm_id = " + prepStationResults[intMeal].id + " group by lu_ingredients.name").then(function(customResults) {
                    if (customResults.errno === undefined) {
                      if (customResults.length == 0) {
                        console.log('no ingredients')
                        resolve('no custom ingredients')
                      } else {
                        for (ing in customResults) {
                          if (ingredientJSON[customResults[ing].name]) {
                            ingredientJSON[customResults[ing].name] += customResults[ing].amount
                          } else {
                            ingredientJSON[customResults[ing].name] = 0
                            ingredientJSON[customResults[ing].name] += customResults[ing].amount
                          }
                        }
                        resolve('done');
                      }
                    } else {
                      console.log(customResults)
                      resolve('error')
                    }
                  })
                } else {
                  resolve('done');
                }
              } else {
                console.log('error for ' + prepIngredientResults[meal].id)
                resolve('error')
              }
            })
          })
          prepIngredientPromises.push(prepIngredientPromise)
        }
        Promise.all(prepIngredientPromises).then(function(allTheData) {
          dbHelper.getData('SELECT lu_equipment.name AS equipment_name, lu_equipment.id AS equipment_id, lu_ingredients.name, lu_equipment_ingredients.ingredient_capacity AS batch_capacity, lu_ingredients.cooktime AS batch_time FROM lu_ingredients JOIN lu_equipment_ingredients ON lu_equipment_ingredients.ingredient_id = lu_ingredients.id JOIN lu_equipment ON lu_equipment.id = lu_equipment_ingredients.equipment_id').then(function(cookData){
            dbHelper.getData('select * from ')
            for(ingredient in ingredientJSON){
              for(line in cookData){
                if(ingredient == cookData[line].name){

                }
              }
            }
          })
          resolve(ingredientJSON)
        })
      } else {
        resolve("error retrieving Prep station meals");
      }
    })
  })

}
