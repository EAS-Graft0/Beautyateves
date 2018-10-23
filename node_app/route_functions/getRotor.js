var dbHelper = require('../utils/databaseHelper.js')
var Promise = require('promise');

exports.function = function() {
    return new Promise(function(resolve, reject) {
        dbHelper.getData("SELECT staff.id as staff_id, first_name, date FROM rotor JOIN staff on staff.id = rotor.staff_id").then((result) => {
            resolve(result)
        })
    })
}