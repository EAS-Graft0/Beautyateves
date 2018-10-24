var function_module = require('../route_functions/getAvailability.js')
module.exports = function(app) {
    app.get('/api/getAvailability', function(req, res, next) {
        var getResponse = function_module.function(req.query.skill_id)
        getResponse.then(function(response) {
            res.send(response)
        })
    })
}