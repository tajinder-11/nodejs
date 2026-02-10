const http = require('node:http');
const fs = require('node:fs');

const server = http.createServer((req, res) => {
  //   console.log(`incoming request at ${Date.now()}`);

  const method = req.method;
  const path = req.url;
  const log = `\n[${Date.now()}]: ${method} ${path}`;
  fs.appendFileSync('log.txt', log, 'utf-8');
  switch (method) {
    case 'GET':
      switch (path) {
        case '/':
          return res.writeHead(200).end('Hey hello from server');
        case '/contact-us':
          return res
            .writeHead(200)
            .end(
              'Please contact me at tajinder 3990@gmail.com and my name is Tajinder',
            );
        case '/tweet':
          return res.writeHead(200).end('Tweet 1, Tweet 2');
      }
      break;
    case 'POST': {
      switch (path) {
        case '/tweet':
          return res.writeHead(201).end('Your tweet was created');
      }
    }
  }
  return res.writeHead(404).end('You are lost man');
});

server.listen(8000, () => {
  console.log('server is listenin at port: 8000');
});
