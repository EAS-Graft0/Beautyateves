var dbHelper = require('../utils/databaseHelper.js')
var Promise = require('promise');
var authHelper = require('../utils/authHelper.js');


exports.function = function(req) {
    return new Promise(function(resolve, reject) {
        authHelper.checkAuth(req, 'kitchen').then(function(authResult) {
            console.log(authResult)
            if (authResult == 'reject') {
                reject()
            } else {
                dbHelper.getData("SELECT * FROM puro_kitchen.deliveries JOIN delivery_meals ON delivery_meals.delivery_id = deliveries.id JOIN orders ON orders.id = order_id JOIN customers ON customers.id = customer_id WHERE delivery_date between '" + req.query.fromDate + "' and '" + req.query.toDate + "'").then((res) => {
                    resolve(res)
                })
            }
        })
    })
}