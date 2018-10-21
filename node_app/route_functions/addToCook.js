var dbHelper = require('../utils/databaseHelper.js')
var Promise = require('promise');

exports.function = function(req) {
  return new Promise(function(resolve, reject) {
    dbHelper.getData('insert into current_cook (ingredient_id, equipment_id,  amount) values (' + req.query.ingredient_id + ' , ' + req.query.equipment_id + ' ,' + req.query.amount + ');').then(function(addToCookResult) {
      if (addToCookResult.errno === undefined) {
        console.log(addToCookResult.insertId);
        resolve("Inserted: " + addToCookResult.insertId)
      } else {
        console.log(addToCookResult)
        resolve(addToCookResult)
      }
    })
  })
}
