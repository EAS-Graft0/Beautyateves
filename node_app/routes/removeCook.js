var function_module = require('../route_functions/removeCook.js')
module.exports = function(app) {
    app.get('/api/removeCook', function(req, res, next) {
        var getResponse = function_module.function()
        getResponse.then(function(response) {
            res.send(response)
        })
    })
}