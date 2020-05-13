const http = require("http");

// copy https://nodejs.org/dist/latest-v12.x/docs/api/http.html#http_http_createserver_options_requestlistener
// Returns content-type = text/plain
const server = http.createServer((req, res) => {
  console.log("request server")
  res.setHeader('Content-Type', 'text/html');
  res.setHeader('X-Foo', 'bar');
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('ok');
});

server.listen(8088);