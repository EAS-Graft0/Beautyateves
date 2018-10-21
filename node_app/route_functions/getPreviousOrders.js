const dbHelper = require('../utils/databaseHelper.js')
const Promise = require('promise');

exports.function = (req) => {
    return new Promise((resolve, reject) => {
        dbHelper.getData("SELECT orders.id,orders.plan_id,orders.date,lu_plans.day_count,lu_plans.meal_count from orders JOIN customers on customers.id = orders.customer_id JOIN lu_plans on lu_plans.id = orders.plan_id where customers.email = '" + req.query.email + "' and customers.address like ' % " + req.query.postcode.replace(/\s/g, '') + " % ' ").then((orderList) => {
            var orderPromises = []
            for (order in orderList) {
                var orderPromise = new Promise((resolve, reject) => {
                    dbHelper.getData('select * from delivery_meals join deliveries on deliveries.id = delivery_meals.delivery_id join orders on orders.id = deliveries.order_id where orders.id = ' + orderList[order].id).then((mealList) => {
                        orderList[order].meals = mealList
                        resolve()
                    })
                })
                orderPromises.push(orderPromise)
            }
            Promise.all(orderPromises).then((allDone) => {
                resolve(orderList)
            })
        })
    })
}