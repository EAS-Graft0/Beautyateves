var express = require("express");
var dbHelper = require('./databaseHelper.js')

var mysql = require('mysql');
var bodyParser = require('body-parser');
var Promise = require('promise')
var connection = mysql.createConnection({
    host: '35.189.209.155',
    user: 'root',
    password: 'Renegade187!',
    database: 'beautyateves',
    connectTimeout: 10000,
    waitForConnections: true,
    queueLimit: 0
});

var app = express();
var server = require('http').Server(app);
app.use(express.static(process.cwd() + '/app'));
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(bodyParser.json())

app.get("/api/getTreatments", (req, res) => {
    dbHelper.getData("SELECT * FROM treatments").then((result) => {
        res.send(result)
    })
})

app.get("/api/getTreatmentCats", (req, res) => {
    dbHelper.getData("SELECT * FROM categories").then((result) => {
        res.send(result)
    })
})

app.get("/api/getStaff", (req, res) => {
    dbHelper.getData("SELECT * FROM staff").then((result) => {
        res.send(result)
    })
})

app.get("/api/getOpeningHours", (req, res) => {
    dbHelper.getData("SELECT * FROM opening_hours").then((result) => {
        res.send(result)
    })
})

app.get("/api/getAvailability", (req, res) => {
    dbHelper.getData("SELECT availability.staff_id, availability.date, staff.first_name, staff.last_name, staff.image, skills.name FROM beautyateves.availability JOIN staff ON staff.id = availability.staff_id JOIN skills_mapping ON skills_mapping.staff_id = availability.staff_id JOIN skills ON skills.id = skills_mapping.skill_id WHERE skills.id = " + req.query.skillID + " AND taken IS NULL").then((result) => {
        res.send(result)
    })
})

app.get("/api/getBookings", (req, res) => {
    dbHelper.getData("SELECT clients.first_name, clients.last_name, treatments.name, bookings.treatment_id, bookings.date, bookings.paid FROM beautyateves.bookings JOIN staff ON staff.id = bookings.staff_id JOIN clients ON clients.id = bookings.client_id JOIN treatments ON treatments.id = bookings.treatment_id WHERE staff_id = " + req.query.staffID).then((result) => {
        res.send(result)
    })
})


app.post("/newClient", function(req, res) {
    if (checkClient() != 'exists') {
        dbHelper.getData("INSERT INTO clients (first_name, lsat_name, email, phone) VALUES ('" + req.body.first_name + "','" + req.body.last_name + "','" + req.body.email + "','" + req.body.phone + "')").then(function(result) {
            res.send(result)
        })
    } else {
        res.send('user exists')
    }
})

app.post("/newBooking", function(req, res) {
    if (checkClient() != 'exists') {
        dbHelper.getData("INSERT INTO clients (first_name, lsat_name, email, phone) VALUES ('" + req.body.first_name + "','" + req.body.last_name + "','" + req.body.email + "','" + req.body.phone + "')").then(function(result) {
            res.send(result)
        })
    } else {
        res.send('user exists')
    }
})

function checkClient() {
    console.log('checking client')
        //chcek if client exists
        //change to get client? and have check in there?
    return 'exists'
}

// app.get("/apiGet", function(req, res) {
//     var get = dbHelper.getData("")
//     get.then(function(result) {
//         res.send(result)
//     })
// })


// app.post("/apiPost", function(req, res) {
//     var post = dbHelper.getData("")
//     post.then(function(result) {
//         res.send(result)
//     })
// })



app.listen(86);
console.log('Listening on port 86!');