var http = require('http'),
url = require('url'),
httpProxy = require('http-proxy');


var proxy = httpProxy.createProxyServer({});

proxy.on('error', function (error, req, res) {
  var json;
  console.log('proxy error', error);
  if (!res.headersSent) {
    res.writeHead(500, { 'content-type': 'application/json' });
  }

  json = { error: 'proxy_error', reason: error.message };
  res.end(JSON.stringify(json));
});


var server = http.createServer(function(req, res) {
	var uri = url.parse(req.url, true);
  
  
  proxy.web(req, res, { 
  	target: {
      host: uri.hostname,
      port: uri.port || 80
    } 
  });

});

console.log("listening on port 8080")
server.listen(8080);