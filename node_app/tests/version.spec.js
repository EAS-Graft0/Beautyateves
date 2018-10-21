var should = require('should')
var chai = require('chai')
var expect = require('chai').expect
var dbHelper = require('../utils/databaseHelper.js') // remove if no database queries in this test
var sut = require('../route_functions/version.js')

describe("/api/version", function() {

    it("Should return a number below 100",function(done){
        var getResponse = sut.getVersion()
        getResponse.then(function(response) {
            response.should.not.be.above(100)
            done()
        })  
    })
    
})