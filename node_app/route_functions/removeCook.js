var dbHelper = require('../utils/databaseHelper.js')
var Promise = require('promise');

exports.function = function(req) {
    return new Promise(function(resolve, reject) {
      dbHelper.getData('delete from current_cook where id='+ req.query.id + ' ;').then(function(removedCookResult) {
        if (removedCookResult.errno === undefined) {
          resolve(removedCookResult)
        } else {
          resolve("error removing cooker info");
        }
      })
    })
  }
