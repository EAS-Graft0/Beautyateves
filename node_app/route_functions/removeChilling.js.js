var dbHelper = require('../utils/databaseHelper.js')
var Promise = require('promise');

exports.function = function() {
    return new Promise(function(resolve, reject) {
      dbHelper.getData('delete from current_chill where ' + req.query.current_chill_id + ';').then(function(removedChillResult) {
        if (removedChillResult.errno === undefined) {
          resolve(removedChillResult)
        } else {
          resolve("error removing cooker info");
        }
      })
    })
  }
