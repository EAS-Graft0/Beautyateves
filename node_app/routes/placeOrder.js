var function_module = require('../route_functions/placeOrder.js')
module.exports = function(app) {
    app.post('/api/placeOrder', function(req, res, next) {
        var getResponse = function_module.function(req.body)
        getResponse.then(function(response) {
            res.send(response)
        })
    })
}