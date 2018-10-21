var function_module = require('../route_functions/deleteShake.js')
module.exports = function(app) {
    app.get('/api/deleteShake', function(req, res, next) {
        var getResponse = function_module.function(req)
        getResponse.then(function(response) {
            res.send(response)
        }).catch(function() {
            res.status(200);
            res.json({ action: 'login' });
        })
    })
}