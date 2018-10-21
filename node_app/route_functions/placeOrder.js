var dbHelper = require('../utils/databaseHelper.js')
var Promise = require('promise');
var sendInvoice = require('../route_functions/sendInvoice.js')

/*
order id is invoice number
invoice date
charge 
puro address
customer address

breakdown of items

*/
exports.function = function(body) {
    return new Promise(function(resolve, reject) {
        var stripe = require("stripe")("sk_test_I2smlMdv25dGXcxlHSYhHMVv");
        // Token is created using Checkout or Elements!
        // Get the payment token ID submitted by the form:
        const token = body.token; // Using Express
        var delivery;
        switch (body.mealData.deliveryType) {
            case 'collection':
                delivery = 0;
                break;
            case 'delivery':
                body.mealData.address = JSON.stringify(body.mealData.address);
                delivery = 1;
                break;
        }
        //get back prices from database
        //go over items and add on premium charge
        //calculate postcode charge again in case they edit it when it goes through
        //
        const charge = stripe.charges.create({
            amount: body.mealData.totalPayment,
            currency: 'gbp',
            description: body.mealData.plans[body.mealData.planIndex].description,
            source: token,
        }).then((charge) => {
            body.chargeValue = charge;
            if (charge.paid == true) {
                dbHelper.getData("SELECT id FROM customers WHERE email = '" + body.mealData.customer.email + "'").then((customer) => {
                    if (customer.length < 1) {
                        dbHelper.getData("INSERT INTO customers (name, email, contact, surname, address) VALUES ('" + body.mealData.customer.name + "','" + body.mealData.customer.email + "','" + body.mealData.customer.contact + "','" + body.mealData.customer.surname + "','" + body.mealData.address + "')").then((res) => {
                            //
                        })
                    }
                    //insert
                    dbHelper.getData("INSERT INTO orders (customer_id, date, cost, payment_id, plan_id, qty, delivery, address, payment_type) VALUES ('" + customer[0].id + "', NOW(),'" + charge.amount + "','" + charge.id + "','" + body.mealData.planId + "','" + 1 + "','" + delivery + "','" + body.mealData.address + "', 'stripe')").then((order) => {
                            body.order_id = order.insertId;
                            if (body.mealData.planLength == 'week_price') {
                                if (body.mealData.deliveries == 2) {
                                    var date = new Date(body.mealData.date)
                                    var date2 = new Date(body.mealData.date)
                                    date2.setDate(date2.getDate() + 2);
                                    dbHelper.getData("INSERT INTO deliveries (delivery_date, order_id) VALUES ('" + date.toISOString().substring(0, 10) + "', " + order.insertId + ")").then((delivery) => {
                                            var promiseArray = [];
                                            for (let i = 0; i < 2; i++) {
                                                for (let j in body.mealData.mealPlan.days[i].meals) {
                                                    promiseArray.push(new Promise((resolve, reject) => {
                                                        dbHelper.getData("INSERT INTO delivery_" + body.mealData.mealPlan.days[i].meals[j].type + " (std_meal_id, delivery_id) VALUES (" + body.mealData.mealPlan.days[i].meals[j].id + ", " + delivery.insertId + ")").then((deliveryMeal) => {
                                                            resolve(deliveryMeal)
                                                        })
                                                    }))
                                                }
                                            }
                                            Promise.all(promiseArray).then((result) => {
                                                dbHelper.getData("INSERT INTO deliveries (delivery_date, order_id) VALUES ('" + date2.toISOString().substring(0, 10) + "', " + order.insertId + ")").then((delivery) => {
                                                    var promiseArray = [];
                                                    for (let i = 2; i < body.mealData.mealPlan.days.length; i++) {
                                                        for (let j in body.mealData.mealPlan.days[i].meals) {
                                                            promiseArray.push(new Promise((resolve, reject) => {
                                                                dbHelper.getData("INSERT INTO delivery_" + body.mealData.mealPlan.days[i].meals[j].type + " (std_meal_id, delivery_id) VALUES (" + body.mealData.mealPlan.days[i].meals[j].id + ", " + delivery.insertId + ")").then((deliveryMeal) => {
                                                                    resolve(deliveryMeal)
                                                                })
                                                            }))
                                                        }
                                                    }
                                                })
                                                Promise.all(promiseArray).then((result) => {
                                                    sendInvoice.function(body)
                                                    resolve('Order Complete')
                                                })
                                            })
                                        })
                                        //   
                                } else {
                                    var date = new Date(body.mealData.date)
                                    dbHelper.getData("INSERT INTO deliveries (delivery_date, order_id) VALUES ('" + date.toISOString().substring(0, 10) + "', " + order.insertId + ")").then((delivery) => {
                                        var promiseArray = [];
                                        for (let i in body.mealData.mealPlan.days) {
                                            for (let j in body.mealData.mealPlan.days[i].meals) {
                                                promiseArray.push(new Promise((resolve, reject) => {
                                                    dbHelper.getData("INSERT INTO delivery_" + body.mealData.mealPlan.days[i].meals[j].type + " (std_meal_id, delivery_id) VALUES (" + body.mealData.mealPlan.days[i].meals[j].id + ", " + delivery.insertId + ")").then((deliveryMeal) => {
                                                        resolve(deliveryMeal)
                                                    })
                                                }))
                                            }
                                        }
                                        Promise.all(promiseArray).then((result) => {
                                            sendInvoice.function(body)
                                            resolve('Order Complete');
                                        })
                                    })
                                }
                            } else if (body.mealData.planLength == 'month_price') {
                                for (let i = 0; i < 28; i += 7) {
                                    var date = new Date(body.mealData.date);
                                    date = date.setDate(date.getDate() + i)
                                    date = new Date(date);
                                    if (body.mealData.deliveries == 2) {
                                        var date2 = new Date(date)
                                        date2.setDate(date2.getDate() + 2);
                                        dbHelper.getData("INSERT INTO deliveries (delivery_date, order_id) VALUES ('" + date.toISOString().substring(0, 10) + "', " + order.insertId + ")").then((delivery) => {
                                                var promiseArray = [];
                                                for (let i = 0; i < 2; i++) {
                                                    for (let j in body.mealData.mealPlan.days[i].meals) {
                                                        promiseArray.push(new Promise((resolve, reject) => {
                                                            dbHelper.getData("INSERT INTO delivery_" + body.mealData.mealPlan.days[i].meals[j].type + " (std_meal_id, delivery_id) VALUES (" + body.mealData.mealPlan.days[i].meals[j].id + ", " + delivery.insertId + ")").then((deliveryMeal) => {
                                                                resolve(deliveryMeal)
                                                            })
                                                        }))
                                                    }
                                                }
                                                Promise.all(promiseArray).then((result) => {
                                                    dbHelper.getData("INSERT INTO deliveries (delivery_date, order_id) VALUES ('" + date2.toISOString().substring(0, 10) + "', " + order.insertId + ")").then((delivery) => {
                                                        var promiseArray = [];
                                                        for (let i = 2; i < body.mealData.mealPlan.days.length; i++) {
                                                            for (let j in body.mealData.mealPlan.days[i].meals) {
                                                                promiseArray.push(new Promise((resolve, reject) => {
                                                                    dbHelper.getData("INSERT INTO delivery_" + body.mealData.mealPlan.days[i].meals[j].type + " (std_meal_id, delivery_id) VALUES (" + body.mealData.mealPlan.days[i].meals[j].id + ", " + delivery.insertId + ")").then((deliveryMeal) => {
                                                                        resolve(deliveryMeal)
                                                                    })
                                                                }))
                                                            }
                                                        }
                                                    })
                                                    Promise.all(promiseArray).then((result) => {
                                                        sendInvoice.function(body)
                                                        resolve('Order Complete')
                                                    })
                                                })
                                            })
                                            //   
                                    } else { //1 delivery
                                        var date = new Date(body.mealData.date)
                                        dbHelper.getData("INSERT INTO deliveries (delivery_date, order_id) VALUES ('" + date.toISOString().substring(0, 10) + "', " + order.insertId + ")").then((delivery) => {
                                            var promiseArray = [];
                                            for (let i in body.mealData.mealPlan.days) {
                                                for (let j in body.mealData.mealPlan.days[i].meals) {
                                                    promiseArray.push(new Promise((resolve, reject) => {
                                                        dbHelper.getData("INSERT INTO delivery_" + body.mealData.mealPlan.days[i].meals[j].type + " (std_meal_id, delivery_id) VALUES (" + body.mealData.mealPlan.days[i].meals[j].id + ", " + delivery.insertId + ")").then((deliveryMeal) => {
                                                            for (let k in body.mealData.meals[body.mealData.mealPlan.days[i].meals[j].id].ingredients) {
                                                                resolve(deliveryMeal)
                                                            }
                                                        })
                                                    }))
                                                }
                                            }
                                            Promise.all(promiseArray).then((result) => {
                                                sendInvoice.function(body)
                                                resolve('Order Complete');
                                            })
                                        })
                                    }
                                }
                                //do the insert 4 times
                            }
                        }) //rhys help with table headers
                        //insert
                })
            }
        }).catch((err) => {
            console.log('err');
            console.log(err);
            reject(err);
        })
    })
}