var dbHelper = require('../utils/databaseHelper.js')
var Promise = require('promise');

exports.function = function() {
    return new Promise(function(resolve, reject) {
        var intervals = ["00", "15", "30", "45"];
        var timeslots = [];
        for (let i = 9; i < 17; i++) {
            for (let j in intervals) {
                if (i < 10) {
                    timeslots.push("0" + i + ':' + intervals[j]);
                } else {
                    timeslots.push(i + ":" + intervals[j]);
                }
            }
        }
        //timeslots

        for (let i in req.body) {
            // console.log(i)
            // console.log(req.body[i])
            for (let j in req.body[i]) {
                for (let k in timeslots) {
                    // console.log(i + ' ' + timeslots[k])
                    dbHelper.getData("INSERT INTO available_slots (staff_id, date) VALUES (" + req.body[i][j].id + ",'" + (i + ' ' + timeslots[k]) + "')")
                }
            }
        }
        resolve('Create slots')
    })
}