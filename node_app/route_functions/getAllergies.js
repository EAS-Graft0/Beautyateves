var dbHelper = require('../utils/databaseHelper.js')
var Promise = require('promise');

exports.function = function() {
    return new Promise(function(resolve, reject) {
dbHelper.getData('select * from lu_allergies;').then(function(allergyResults){
     if(allergyResults.errno === undefined){
        resolve(allergyResults);
     }
    else{
     //Error Log
        resolve('Error retrieving allergies')
    }
})
    })
}
