var function_module = require('../route_functions/addToCook.js')
module.exports = function(app) {
    app.get('/api/addToCook', function(req, res, next) {
        var getResponse = function_module.function(req)
        getResponse.then(function(response) {
            res.send(response)
        })
    })
}
