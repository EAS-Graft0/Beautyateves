var function_module = require('../route_functions/getMealIngredients.js')
module.exports = function(app) {
    app.get('/api/getMealIngredients', function(req, res, next) {
        var getResponse = function_module.function()
        getResponse.then(function(response) {
            res.send(response)
        })
    })
}
