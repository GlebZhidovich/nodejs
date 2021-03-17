async function getBody(request) {
    return new Promise((resolve) => {
        let body = [];
        request
            .on('data', (chunk) => {
                body.push(chunk);
            })
            .on('end', () => {
                resolve(Buffer.concat(body).toString());
            });
    });
}

module.exports = {
    getBody
}
