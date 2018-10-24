var function_module = require('../route_functions/getAvailableSlots.js')
module.exports = function(app) {
    app.get('/api/getAvailableSlots', function(req, res, next) {
        var getResponse = function_module.function(req.query.skill_id)
        getResponse.then(function(response) {
            res.send(response)
        })
    })
}