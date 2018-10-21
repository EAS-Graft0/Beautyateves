var dbHelper = require('../utils/databaseHelper.js')
var Promise = require('promise')

var authHelper = require('../utils/authHelper.js');

exports.function = function(req) {
    return new Promise(function(resolve, reject) {
        authHelper.checkAuth(req, 'admin').then(function(authResult) {
            console.log(authResult)
            if (authResult == 'reject') {
                reject()
            } else {
                dbHelper.getData('insert into lu_meals (name, description, premium_price) values ("' + req.body.name + '" , "' + req.body.description + '" , "' + req.body.premium_price + '");').then(function(meal_result) {
                    if (meal_result.errno === undefined) {
                        var promiseArray = []
                        for (ingredient in req.body.ingredients) {
                            promiseArray.push(new Promise(function(resolve, reject) {
                                dbHelper.getData('insert into lu_meal_ingredients (meal_id, ingredient_id, amount) values ("' + meal_result.insertId + '" , "' + req.body.ingredients[ingredient].id + '" , "' + req.body.ingredients[ingredient].amount + '");').then(function(meal_ingredient_result) {
                                    if (meal_ingredient_result.errno === undefined) {
                                        resolve('ok')
                                    } else {
                                        reject('error inserting ingredient')
                                    }
                                })
                            }))
                        }
                        Promise.all(promiseArray).then(function(end_result) {
                            resolve('success')
                        })
                    } else {
                        reject('error inserting meal')
                    }
                })
            }
        });
    })
}