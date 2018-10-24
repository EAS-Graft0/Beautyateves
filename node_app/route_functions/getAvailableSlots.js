var dbHelper = require('../utils/databaseHelper.js')
var Promise = require('promise');

exports.function = function(skill_id) {
    return new Promise(function(resolve, reject) {
        dbHelper.getData("SELECT available_slots.*, first_name FROM available_slots INNER JOIN skills_mapping ON skills_mapping.staff_id = available_slots.staff_id JOIN staff on staff.id = skills_mapping.staff_id WHERE skill_id = " + skill_id).then((result) => {
            resolve(result)
        })
    })
}