var function_module = require('../route_functions/login.js')
module.exports = function(app) {
    app.post('/api/login', function(req, res, next) {
        var getResponse = function_module.function(req)
        getResponse.then(function(response) {
            res.send(response)
        })
    })
}