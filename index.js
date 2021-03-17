const http = require('http');
const router = require('./src/projects.router')
const { getBody } = require('./src/helpers');

process.on('uncaughtException', err => {
  console.error('Uncaught Exception:', err.message);
});

process.on('unhandledRejection', err => {
  console.error('Unhandled Rejection:', err.message);
});

http.createServer(listenServer).listen(3000, '127.0.0.1', () => {
  console.log('Сервер начал прослушивание запросов');
});

function logging({ url, method, body }) {
  console.log('Url: ' + url);
  console.log('Тип запроса: ' + method);
  console.log('Body: ' + body);
}

function isProductsUrl(url) {
  const urlName = 'projects';
  const arrUrl = url.split('/');
  const maxParams = 4;
  return arrUrl.includes(urlName) && arrUrl.length < maxParams;
}

function isInRouter(method) {
  const methodName = `${method.toLowerCase()}Method`;
  return router[methodName];
}

function isAccess(url, method) {
  return isProductsUrl(url) && isInRouter(method);
}

async function listenServer(req, res) {
  const { url, method } = req;
  const body = await getBody(req);
  logging({ url, method, body });
    console.log(isProductsUrl(url))
  if (isAccess(url, method)) {
    router[`${method.toLowerCase()}Method`](req, res);
    return;
  }

  res.statusCode = 404;
  res.end('Not found!');
}
