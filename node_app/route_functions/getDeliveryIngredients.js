var dbHelper = require('../utils/databaseHelper.js')
var Promise = require('promise');
var authHelper = require('../utils/authHelper.js');

exports.function = function(req) {
    return new Promise(function(resolve, reject) {

        var ordersObj = {
            ingredients: {},
            items: {
                meals: {},
                shakes: {},
                snacks: {}
            },
            orders: []
        }
        authHelper.checkAuth(req, 'kitchen').then(function(authResult) {
            console.log(authResult)
            if (authResult == 'reject') {
                reject()
            } else {
                dbHelper.getData("SELECT concat(customers.name , '  ' , customers.surname) as customer_name, orders.id as order_id, deliveries.id as delivery_id, customers.address as delivery_address,customers.contact as customer_phone FROM deliveries JOIN orders on orders.id = deliveries.order_id JOIN customers on customers.id = orders.customer_id where deliveries.delivery_date between '" + req.query.fromDate + "' and '" + req.query.toDate + "'").then((deliveryList) => {
                    var deliveryPromises = []
                    for (var del in deliveryList) {
                        var deliveryPromise = new Promise((resolve, reject) => {
                            var intDel = del
                            dbHelper.getData("SELECT lu_meals.id,lu_meals.name,lu_meals.img from lu_meals join delivery_meals on delivery_meals.std_meal_id = lu_meals.id join deliveries on deliveries.id = delivery_meals.delivery_id where deliveries.id=" + deliveryList[intDel].delivery_id).then((mealsList) => {
                                var mealPromises = []
                                for (var meal in mealsList) {
                                    var mealPromise = new Promise((resolve, reject) => {
                                        var intMeal = meal
                                        dbHelper.getData("SELECT lu_ingredients.id, lu_ingredients.name, (lu_meal_ingredients.amount * lu_ingredients.measurement) AS amount FROM lu_ingredients JOIN lu_meal_ingredients ON lu_meal_ingredients.ingredient_id = lu_ingredients.id where lu_meal_ingredients.meal_id =" + mealsList[intMeal].id).then((ingredientList) => {
                                            for (var ing in ingredientList) {
                                                if (ordersObj.ingredients[ingredientList[ing].id]) {
                                                    ordersObj.ingredients[ingredientList[ing].id].amount += ingredientList[ing].amount
                                                } else {
                                                    ordersObj.ingredients[ingredientList[ing].id] = JSON.parse(JSON.stringify(ingredientList[ing]))
                                                }
                                            }
                                            mealsList[intMeal].ingredients = JSON.parse(JSON.stringify(ingredientList))
                                            resolve('done')

                                        })
                                    })
                                    mealPromises.push(mealPromise)
                                }
                                Promise.all(mealPromises).then((mealsDone) => {
                                    dbHelper.getData("SELECT lu_snacks.id,lu_snacks.name,lu_snacks.img from lu_snacks join delivery_snacks on delivery_snacks.std_meal_id = lu_snacks.id join deliveries on deliveries.id = delivery_snacks.delivery_id where deliveries.id=" + deliveryList[intDel].delivery_id).then((snacksList) => {
                                        var snackPromises = []
                                        for (var snack in snacksList) {
                                            var snackPromise = new Promise((resolve, reject) => {
                                                var intSnack = snack
                                                dbHelper.getData("SELECT lu_ingredients.id, lu_ingredients.name, (lu_snack_ingredients.amount * lu_ingredients.measurement) AS amount FROM lu_ingredients JOIN lu_snack_ingredients ON lu_snack_ingredients.ingredient_id = lu_ingredients.id where lu_snack_ingredients.meal_id =" + snacksList[intSnack].id).then((ingredientList) => {
                                                    for (var ing in ingredientList) {
                                                        if (ordersObj.ingredients[ingredientList[ing].id]) {
                                                            ordersObj.ingredients[ingredientList[ing].id].amount += ingredientList[ing].amount
                                                        } else {
                                                            ordersObj.ingredients[ingredientList[ing].id] = JSON.parse(JSON.stringify(ingredientList[ing]))
                                                        }
                                                    }
                                                    snacksList[intSnack].ingredients = JSON.parse(JSON.stringify(ingredientList))

                                                    resolve('done')
                                                })
                                            })
                                            snackPromises.push(snackPromise)
                                        }
                                        Promise.all(snackPromises).then((snacksDone) => {
                                            dbHelper.getData("SELECT lu_shakes.id,lu_shakes.name,lu_shakes.img from lu_shakes join delivery_shakes on delivery_shakes.std_meal_id = lu_shakes.id join deliveries on deliveries.id = delivery_shakes.delivery_id where deliveries.id=" + deliveryList[intDel].delivery_id).then((shakesList) => {
                                                var shakePromises = []
                                                for (var shake in shakesList) {
                                                    var shakePromise = new Promise((resolve, reject) => {
                                                        var intShake = shake
                                                        dbHelper.getData("SELECT lu_ingredients.id, lu_ingredients.name, (lu_shake_ingredients.amount * lu_ingredients.measurement) AS amount FROM lu_ingredients JOIN lu_shake_ingredients ON lu_shake_ingredients.ingredient_id = lu_ingredients.id where lu_shake_ingredients.meal_id =" + shakesList[intShake].id).then((ingredientList) => {
                                                            for (var ing in ingredientList) {
                                                                if (ordersObj.ingredients[ingredientList[ing].id]) {
                                                                    ordersObj.ingredients[ingredientList[ing].id].amount += ingredientList[ing].amount
                                                                } else {
                                                                    ordersObj.ingredients[ingredientList[ing].id] = JSON.parse(JSON.stringify(ingredientList[ing]))
                                                                }
                                                            }
                                                            shakesList[intShake].ingredients = JSON.parse(JSON.stringify(ingredientList))

                                                            resolve('done')
                                                        })
                                                    })
                                                    shakePromises.push(shakePromise)
                                                }
                                                Promise.all(shakePromises).then((shakesDone) => {
                                                    console.log('hit')
                                                    var delItem = deliveryList[intDel]
                                                    delItem.meals = {}

                                                    console.log('ID: ' + delItem.delivery_id)
                                                    console.log(mealsList.length)

                                                    for (var ordMeal in mealsList) {
                                                        if (delItem.meals[mealsList[ordMeal].id]) {
                                                            delItem.meals[mealsList[ordMeal].id].count += 1
                                                        } else {
                                                            delItem.meals[mealsList[ordMeal].id] = JSON.parse(JSON.stringify(mealsList[ordMeal]))
                                                            delItem.meals[mealsList[ordMeal].id].count = 1
                                                        }


                                                    }
                                                    delItem.snacks = {}
                                                    for (var ordSnack in snacksList) {
                                                        if (delItem.snacks[snacksList[ordSnack].id]) {
                                                            delItem.snacks[snacksList[ordSnack].id].count += 1
                                                        } else {
                                                            delItem.snacks[snacksList[ordSnack].id] = JSON.parse(JSON.stringify(snacksList[ordSnack]))
                                                            delItem.snacks[snacksList[ordSnack].id].count = 1
                                                        }


                                                    }
                                                    delItem.shakes = {}
                                                    for (var ordShake in shakesList) {
                                                        if (delItem.shakes[shakesList[ordShake].id]) {
                                                            delItem.shakes[shakesList[ordShake].id].count += 1
                                                        } else {
                                                            delItem.shakes[shakesList[ordShake].id] = JSON.parse(JSON.stringify(shakesList[ordShake]))
                                                            delItem.shakes[shakesList[ordShake].id].count = 1
                                                        }


                                                    }

                                                    ordersObj.orders.push(delItem)
                                                    resolve('done')
                                                })

                                            })
                                        })

                                    })
                                })

                            })

                        })
                        deliveryPromises.push(deliveryPromise)
                    }
                    Promise.all(deliveryPromises).then((deliveriesDone) => {

                        for (var finOrd in ordersObj.orders) {
                            for (var meal in ordersObj.orders[finOrd].meals) {
                                if (ordersObj.items.meals[ordersObj.orders[finOrd].meals[meal].id]) {
                                    ordersObj.items.meals[ordersObj.orders[finOrd].meals[meal].id].count += ordersObj.orders[finOrd].meals[meal].count
                                } else {
                                    ordersObj.items.meals[ordersObj.orders[finOrd].meals[meal].id] = JSON.parse(JSON.stringify(ordersObj.orders[finOrd].meals[meal]))
                                }

                            }


                            for (var snack in ordersObj.orders[finOrd].snacks) {
                                if (ordersObj.items.snacks[ordersObj.orders[finOrd].snacks[snack].id]) {
                                    ordersObj.items.snacks[ordersObj.orders[finOrd].snacks[snack].id].count += ordersObj.orders[finOrd].snacks[snack].count
                                } else {
                                    ordersObj.items.snacks[ordersObj.orders[finOrd].snacks[snack].id] = JSON.parse(JSON.stringify(ordersObj.orders[finOrd].snacks[snack]))
                                }

                            }

                            for (var shake in ordersObj.orders[finOrd].shakes) {
                                if (ordersObj.items.shakes[ordersObj.orders[finOrd].shakes[shake].id]) {
                                    ordersObj.items.shakes[ordersObj.orders[finOrd].shakes[shake].id].count += ordersObj.orders[finOrd].shakes[shake].count
                                } else {
                                    ordersObj.items.shakes[ordersObj.orders[finOrd].shakes[shake].id] = JSON.parse(JSON.stringify(ordersObj.orders[finOrd].shakes[shake]))
                                }

                            }
                        }
                        resolve(ordersObj)
                    })
                })
            }
        })
    })
}