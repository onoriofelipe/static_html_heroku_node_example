const express = require('express');
let server = express();

let port = process.env.PORT || 3333;

server.get('/', (request, response) => {
    response.sendFile('./public/misc_html.html', { root: __dirname });
})

server.listen(port, () => { console.log(`Server listening on port ${port}.`); });