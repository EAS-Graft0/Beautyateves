var function_module = require('../route_functions/getDeliveryOrders.js')
module.exports = function(app) {
    app.get('/api/getDeliveryOrders', function(req, res, next) {
        var getResponse = function_module.function()
        getResponse.then(function(response) {
            res.send(response)
        })
    })
}