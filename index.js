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

function listenServer(request, response){
    logging(request);
    const id = nanoid();
    response.end("Hello world! " + id);
}
