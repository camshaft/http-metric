/**
 * Module dependencies
 */
var should = require("should")
  , http = require('http')
  , superagent = require('superagent')
  , httpMetric = require('..');

describe("http-metric", function(){

  var out;

  before(function() {
    httpMetric.log = function(_out) {
      console.log(_out);
      out = _out;
    };
  });

  it("should print the response time of http requests", function(done) {
    http.get("http://www.google.com", function(res) {
      out.should.include("at=http");
      done();
    }).on('error', done);
  });

  it("should print the response time of superagent requests", function(done) {
    superagent
      .get("http://www.google.com")
      .on('error', done)
      .end(function(res) {
        out.should.include("at=http");
        done();
      });
  });

  it("should print the response time of https requests", function(done) {
    superagent
      .get("https://www.google.com")
      .on('error', done)
      .end(function(res) {
        out.should.include("at=http");
        out.should.include("proto=https");
        done();
      });
  });
});
