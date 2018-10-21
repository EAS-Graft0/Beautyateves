var dbHelper = require('../utils/databaseHelper.js')
var Promise = require('promise');
var authHelper = require('../utils/authHelper.js');

exports.function = function(req) {
    return new Promise(function(resolve, reject) {
        authHelper.checkAuth(req, 'admin').then(function(authResult) {
            console.log(authResult)
            if (authResult == 'reject') {
                reject()
            } else {
                dbHelper.getData('UPDATE lu_snacks SET name="' + req.body.name + '", description="' + req.body.description + '" where id=' + req.body.id).then(function(updatesnackResult) {
                    if (updatesnackResult.errno === undefined) {
                        dbHelper.getData('DELETE FROM lu_snack_ingredients where meal_id=' + req.body.id).then(function(deleteResult) {
                            if (deleteResult.errno === undefined) {
                                if (req.body.ingredients.length > 0) {
                                    var ingredientArray = []

                                    for (ingredient in req.body.ingredients) {
                                        ingredientArray.push([req.body.id, req.body.ingredients[ingredient].id, req.body.ingredients[ingredient].amount])
                                    }
                                    console.log(ingredientArray)
                                    dbHelper.insert('INSERT INTO lu_snack_ingredients (meal_id, ingredient_id, amount) VALUES ?', [ingredientArray]).then(function(insertResult) {
                                        if (insertResult.errno === undefined) {
                                            resolve('success')
                                        } else {
                                            reject('error')
                                        }
                                    })
                                } else {
                                    resolve('success')
                                }
                            } else {
                                reject('error')
                            }
                        })
                    } else {
                        reject('error')
                    }
                })
            }
        })

    })
}