var dbHelper = require('../utils/databaseHelper.js')
var Promise = require('promise');

exports.function = function() {
    return new Promise(function(resolve, reject) {
        dbHelper.getData("SELECT id FROM clients WHERE (first_name = '" + req.body.client.first_name + "' AND last_name = '" + req.body.client.last_name + "' AND email = '" + req.body.client.email + "') || (first_name = '" + req.body.client.first_name + "' AND last_name = '" + req.body.client.last_name + "' AND phone = '" + req.body.client.phone + "')").then((client) => {
            if (client.length < 1) {
                //create new client
                console.log('creating new client');
                dbHelper.getData("INSERT INTO clients (first_name, last_name, email, phone) VALUES ('" + req.body.client.first_name + "','" + req.body.client.last_name + "','" + req.body.client.email + "','" + req.body.client.phone + "')").then((result) => {
                    console.log('created new client');
                    //result.insertId
                    resolve('created new client');
                })
            } else {
                console.log('found client')
                console.log(client);
                let duration = req.body.treatment.duration / 15;
                console.log('duration = ' + duration);
                //update so many rows in available slots
                req.body.slot = req.body.slot.split('T').join(' ').substring(0, 19);
                console.log('req.body.slot');
                console.log(req.body.slot);
                console.log('req.body.slot');
                if (duration == 1) {
                    console.log('duration = 1');
                    dbHelper.getData("UPDATE available_slots SET taken = 1 WHERE date = '" + req.body.slot + "'").then((result) => {
                        console.log(result);
                        resolve(result);
                    })
                } else {
                    console.log('duration is not 1');
                    console.log(req.body.slot);
                    dbHelper.getData("SELECT id FROM available_slots WHERE date = '" + req.body.slot + "'").then((res) => {
                        console.log('res');
                        console.log(res[0].id);
                        console.log('res');
                        for (let i = 0; i <= duration; i++) {
                            console.log('res[0].id + i')
                            console.log(res[0].id + i)
                            console.log('res[0].id + i')
                            dbHelper.getData("UPDATE available_slots SET taken = 1, client_id = " + req.body.client_id + "  WHERE id = " + (res[0].id + i))
                        }
                        resolve('Updated available slots');
                    })
                }
            }
        })
    })
}