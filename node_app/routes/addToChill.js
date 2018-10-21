var function_module = require('../route_functions/addToChill.js')
module.exports = function(app) {
    app.get('/api/addToChill', function(req, res, next) {
        var getResponse = function_module.function(req)
        getResponse.then(function(response) {
            res.send(response) 
        })
    })
}
