const getBody = async (request) => {
  return new Promise((resolve, reject) => {
    let body = [];
    request
      .on('error', (err) => {
        console.error(err);
        reject(err);
      })
      .on('data', (chunk) => {
        body.push(chunk);
      })
      .on('end', () => {
        resolve(Buffer.concat(body).toString());
      });
  });
}

const fromMapToArray = (obj) => {
  return Array.from(Object.values(Object.fromEntries(obj)));
}

const isProductsUrl = (url) => {
  const urlName = 'projects';
  const arrUrl = url.split('/');
  const maxParams = 4;
  return arrUrl.includes(urlName) && arrUrl.length < maxParams;
}

const isInRouter = ({ method, url, obj }) => {
  const id = getProjectId(url);
  const methodName = getRouterMethodName({ method, id });
  return obj[methodName];
}

const isAccess = ({ url, method, obj }) => {
  return isProductsUrl(url) && isInRouter({ method, url, obj });
}

const getProjectId = (url) => {
  return url.split('/')[2];
}

const responseWithData = ({ res, data, code }) => {
  res.statusCode = code;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(data));
}

const getRouterMethodName = ({ method, id }) => {
  return `${method.toLowerCase()}Method${id ? 'Id' : ''}`
}

module.exports = {
  getBody,
  fromMapToArray,
  getProjectId,
  isAccess,
  responseWithData,
  getRouterMethodName
}
