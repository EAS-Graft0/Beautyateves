var dbHelper = require('../utils/databaseHelper.js')
var Promise = require('promise');

exports.function = function(req) {
  return new Promise(function(resolve, reject) {
    dbHelper.getData('insert into current_chill (ingredient_id, equipment_id, amount, cook_id) values (' + req.query.ingredient_id + ' , ' + req.query.equipment_id + ' ,' + req.query.amount + ',' + req.query.cook_id + ');').then(function(addToChillResult) {
      if (addToChillResult.errno === undefined) {
        console.log(addToChillResult);
        resolve(addToChillResult);
      } else {
        console.log(addToChillResult)
        resolve(addToChillResult);
      }
    })
  })
}
