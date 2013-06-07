/**
 * Module dependencies
 */
var http = require('http')
  , https = require('https')
  , url = require('url')
  , metric = require('metric-log').context({fn:'request',at:'http'});

/**
 * Expose the metric
 */
module.exports = metric;

/**
 * Request Logging
 */
function request(mod, proto) {
  // Cache the old method
  var _request = mod.request;

  return function(options, cb) {
    // Parse it before node http does so we can get the host
    options = typeof options === 'string'
      ? url.parse(options)
      : options;

    // Make the request
    var req = _request.call(mod, options)
      , prof = metric.profile('response_time', {
          method: req.method,
          path: req.path,
          host: (options.hostname || options.host),
          proto: proto
        });

    // Listen for the response and log the metric
    req.once('response', function(res) {
      var profOpts = {code: res.statusCode};
      if(res.headers['content-length']) profOpts.content_length = res.headers['content-length'];
      if(res.headers['x-request-id']) profOpts.request_id = res.headers['x-request-id'];
      prof(profOpts);
    });

    // Register the callback after ours
    if(cb) req.once('response', cb);

    return req;
  };
};

/**
 * Patch the method
 */
http.request = request(http, 'http');
https.request = request(https, 'https');
