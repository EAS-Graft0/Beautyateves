var function_module = require('../route_functions/placeOrderVoucher.js')
module.exports = function(app) {
    app.post('/api/placeOrderVoucher', function(req, res, next) {
        var getResponse = function_module.function(req.body)
        getResponse.then(function(response) {
            res.send(response)
        })
    })
}