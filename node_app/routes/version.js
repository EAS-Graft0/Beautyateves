var function_module = require('../route_functions/version.js')
module.exports = function(app) {
    app.get('/api/version', function(req, res, next) {

        var getResponse = function_module.getVersion()
        getResponse.then(function(response) {
            res.send(response)
        })

    })
}
