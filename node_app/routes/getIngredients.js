var function_module = require('../route_functions/getIngredients.js')
module.exports = function(app) {
    app.get('/api/getIngredients', function(req, res, next) {
        var getResponse = function_module.function()
        getResponse.then(function(response) {
            res.json(response)
            
        })
    })
}