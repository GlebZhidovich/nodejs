async function getBody(request) {
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

module.exports = {
  getBody,
  fromMapToArray
}
