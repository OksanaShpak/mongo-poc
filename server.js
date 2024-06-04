const { readFileSync } = require('fs');

const startServer = ({ create, read, update, dremove }) => {
  const server = require('http').createServer();
  const port = 3000;

  server.addListener('request', handleRequest);
  server.listen(port, () => console.log('http://localhost:3000'));

  async function handleRequest(request, response) {
    const { url, method } = request;
    if (url.startsWith('/api/')) {
      const endpoint = method + ':' + url.slice(5);

      if (endpoint === 'GET:contacts') {
        const contacts = await read();
        response.writeHead(200).end(JSON.stringify(contacts));

      } else if (endpoint === 'POST:contact') {
        const contact = await getBody(request);
        const result = await create(contact);
        response.writeHead(201).end(JSON.stringify(result));

      } else if (endpoint === 'PUT:contact') {
        const {id, ...contact} = await getBody(request);
        const result = await update(id, contact);
        response.writeHead(200).end(JSON.stringify(result));

      } else if (endpoint === 'DELETE:contact') {
        const {id} = await getBody(request);
        const result = await dremove(id);
        response.writeHead(200).end(JSON.stringify(result));

      } else {
        response.writeHead(404).end(JSON.stringify({ error: 'Not Found' }));
      }
    } else {
      if(url === '/'){
        const html = readFileSync('public/index.html');
        response.writeHead(200).end(html);
      } else if(url === '/style.css'){
        const css = readFileSync('public/style.css');
        response.writeHead(200).end(css);
      } else if (url === '/script.js') {
        const js = readFileSync('public/script.js');
        response.writeHead(200).end(js);
      } else if (url === '/data.js') {
        const data = readFileSync('public/data.js');
        response.writeHead(200).end(data);
      } else if (url === '/contact1.jpg'){
        const img = readFileSync('public/contact1.jpg');
        response.writeHead(200).end(img);
      } else if (url === '/favicon.ico'){
        const icon = readFileSync('public/favicon.ico');
        response.writeHead(200).end(icon);
      }
    }
  }
};

exports.startServer = startServer;

async function getBody(request) {
  let body = '';
  for await (const chunk of request) {
    body += chunk;
  }
  return JSON.parse(body);
}