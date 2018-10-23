var function_module = require('../route_functions/getTreatments.js')
module.exports = function(app) {
    app.get('/api/getTreatments', function(req, res, next) {
        var getResponse = function_module.function()
        getResponse.then(function(response) {
            res.send(response)
        })
    })
}