var function_module = require('../route_functions/getAllergies.js')
module.exports = function(app) {
    app.get('/api/getAllergies', function(req, res, next) {
        var getResponse = function_module.function()
        getResponse.then(function(response) {
            res.json(response)

        })
    })
}
