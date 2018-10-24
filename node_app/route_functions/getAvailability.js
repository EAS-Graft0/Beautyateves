var dbHelper = require('../utils/databaseHelper.js')
var Promise = require('promise');

exports.function = function(skill_id) {
    return new Promise(function(resolve, reject) {
        dbHelper.getData("SELECT availability.staff_id, availability.date, staff.first_name, staff.last_name, staff.image, skills.name FROM beautyateves.availability JOIN staff ON staff.id = availability.staff_id JOIN skills_mapping ON skills_mapping.staff_id = availability.staff_id JOIN skills ON skills.id = skills_mapping.skill_id WHERE skills.id = " + skill_id + " AND taken IS NULL").then((result) => {
            resolve(result)
        })
    })
}