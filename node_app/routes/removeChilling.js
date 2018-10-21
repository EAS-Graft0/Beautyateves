var function_module = require('../route_functions/removeChilling.js')
module.exports = function(app) {
    app.get('/api/removeChilling', function(req, res, next) {
        var getResponse = function_module.function()
        getResponse.then(function(response) {
            res.send(response)
        })
    })
}
