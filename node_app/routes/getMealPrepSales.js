var function_module = require('../route_functions/getMealPrepSales.js')
module.exports = function(app) {
    app.get('/api/getMealPrepSales', function(req, res, next) {
        var getResponse = function_module.function(req.query)
        getResponse.then(function(response) {
            res.send(response)
        })
    })
}
