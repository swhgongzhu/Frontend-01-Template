const net = require("net");

class Request {
  constructor(options){
    this.method = options.method || "GET";
    this.host = options.host;
    this.port = options.port || 80;
    this.path = options.port || '/';
    this.body = options.body || {};
    this.headers = options.headers || {};
    if(!this.headers["Content-Type"]){
      this.headers["Content-Type"] = "application/x-www-form-urlencoded"
    }
    if(this.headers["Content-Type"] === "application/json"){
      this.bodyText = JSON.stringify(this.body);
    }else if(this.headers["Content-Type"] === "application/x-www-form-urlencoded"){
      this.bodyText = Object.keys(this.body).map(key => `${key}=${encodeURIComponent(this.body[key])}`)
      this.headers["Content-Length"] = this.bodyText.length
    }
    toString(){
    
    }
  }
  // send
  send(connection){
    return new Promise((resolve,reject) => {
      if(connection){
        connection.write(this.toString());
      }else{
        connection = net.createConnection({
          host: this.host,
          port: this.port
        }, () => {
          connection.write(this.toString());
        })
      }
      //
      connection.on('data', (data) => {
        console.log(data.toString());
        connection.end();
      });
      connection.on('end', () => {
        console.log('disconnected from server');
      });
      connection.on('error', (err) => {
        console.log('error-',err);
      });
      //
    })
  }
}

// class Response {
// }

// copy-https://nodejs.org/dist/latest-v12.x/docs/api/net.html#net_net_createconnection
const client = net.createConnection({
  host: "127.0.0.1",
  port: 8088
}, () => {
  // 'connect' listener.
  console.log('connected to server!');
  // client.write('world!\r\n');
  // client.write('GET / HTTP/1.1\r\n');
  // client.write('Content-Length: 20\r\n');
  // client.write('field1=aaa&code=x%3D1\r\n');

  let request = new Request({
    method: "post",
    host: "127.0.0.1",
    port: 8088,
    path: '/',
    headers: {
      ['Swh']: "customclient"
    },
    body: {
      name: "swh"
    },
  });

  client.write(request.toString());
});
client.on('data', (data) => {
  console.log(data.toString());
  client.end();
});
client.on('end', () => {
  console.log('disconnected from server');
});
client.on('error', (err) => {
  console.log('error-',err);
});
