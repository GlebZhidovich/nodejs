const http = require("http");
const { nanoid } = require('nanoid');

process.on('uncaughtException', err => {
    console.error(err.message);
});

process.on('unhandledRejection', err => {
    console.error(err.message);
});

http.createServer(listenServer).listen(3000);

function logging(request) {
    console.log("Url: " + request.url);
    console.log("Тип запроса: " + request.method);
}

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

async function listenServer(request, response) {
    logging(request);
    const body = await getBody(request);
    console.log(JSON.parse(body))
    response.end("Hello world! ");
}
