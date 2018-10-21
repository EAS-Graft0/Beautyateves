var function_module = require('../route_functions/getMealNutrition.js')
module.exports = function(app) {
    app.get('/api/getMealNutrition', function(req, res, next) {
        var getResponse = function_module.function(req.query)
        getResponse.then(function(response) {
            res.send(response)
        })
    })
}
