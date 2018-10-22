var function_module = require('../route_functions/createSlots.js')
module.exports = function(app) {
    app.get('/api/createSlots', function(req, res, next) {
        var getResponse = function_module.function()
        getResponse.then(function(response) {
            res.send(response)
        })
    })
}