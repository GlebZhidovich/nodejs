const sendBadRequest = (res) => {
  res.statusCode = 400;
  res.end('Bad request');
}

const sendInternal  = (res) => {
  res.statusCode = 500;
  res.end('Internal Server Error');
}

const sendNotFound  = (res) => {
  res.statusCode = 404;
  res.end('Not found');
}

const errorHandleWrap = (cb) => (req, res, body) => {
  try {
    return cb(req, res, body);
  } catch (err) {
    console.log(err);
    sendInternal(res);
  }
}

module.exports = {
  sendBadRequest,
  sendInternal,
  sendNotFound,
  errorHandleWrap
}
