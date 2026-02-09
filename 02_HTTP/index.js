const http = require('node:http');

const server = http.createServer((req, res) => {
  console.log(`Incoming request at $${Date.now()}`);
  console.log(req.headers);

  switch (req.url) {
    case '/':
      res.writeHead(200);
      return res.end('Hey you are on home page');
    case '/contact-us':
      res.writeHead(200);
      return res.end('Hey contact me at tajinder3990@gmail.com');
    case '/About':
      res.writeHead(200);
      return res.end('I am a mobile developer but learning backend');
    default:
      res.writeHead(404);
      return res.end('You are lost baby');
  }
  //   res.end(`Hey you can accept ${req.headers['accept-language']}`);
});

server.listen(8000, () => {
  console.log('the server is running on port: 8000');
});
