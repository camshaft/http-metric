http-metric
===========

Measure HTTP requests

Usage
-----

To start measuring outgoing HTTP/HTTPS requests just require `http-metric` in your app code:

```js
require('http-metric');
```

This will patch the built-in http methods to log requests:

```
measure=response_time val=171 units=ms code=200 method=GET path=/ host=www.google.com proto=http fn=request at=http
measure=response_time val=172 units=ms code=200 method=GET path=/ host=www.google.com proto=http fn=request at=http
measure=response_time val=176 units=ms code=200 method=GET path=/ host=www.google.com proto=https fn=request at=http
```

You can turn it off by default by calling `debug`:

```js
require('http-metric').debug();
```

and conditionally show it by setting the `DEBUG` environment variable to `http:request`

Testing
-------

```sh
$ npm test
```
