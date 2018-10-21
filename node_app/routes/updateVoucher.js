var function_module = require('../route_functions/updateVoucher.js')
module.exports = function(app) {
    app.post('/api/updateVoucher', function(req, res, next) {
        var getResponse = function_module.function(req)
        getResponse.then(function(response) {
            res.send(response)
        }).catch(function() {
            res.status(200);
            res.json({ action: 'login' });
        })
    })
}