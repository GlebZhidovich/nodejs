const http = require('http');
const router = require('./src/projects.router');
const { sendNotFound, sendInternal } = require('./src/error');
const { getBody, getProjectId, isAccess, getRouterMethodName } = require('./src/helpers');

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
  console.log('Body: ' + JSON.stringify(body, null, 2));
}

async function listenServer(req, res) {
  try {
    const { url, method } = req;
    const id = getProjectId(url);
    const bodyJson = await getBody(req);
    const body = JSON.parse(bodyJson);
    logging({ url, method, body });
    if (isAccess({ url, method, obj: router })) {
      router[getRouterMethodName({ method, id })]({ req, res, body, id });
      return;
    }

    sendNotFound(res);
  } catch (err) {
    console.error(err);
    sendInternal(res);
  }
}
