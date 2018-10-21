var function_module = require('../route_functions/getPrepStation.js')
module.exports = function(app) {
  app.get('/api/getPrepStation', function(req, res, next) {
      var getResponse = function_module.getPrepStation(req)
      getResponse.then(function(response) {
          res.send(response)
      })
    })
  }
