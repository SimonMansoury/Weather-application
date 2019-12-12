'use strict';
const fs = require('fs');
const http = require('http');
const hostname = '0.0.0.0';
var port = process.env.PORT || 8000;
const file = fs.readFileSync('./public/index.html', 'utf8');
const server = http.createServer((req, res) => {
    if(req.url == '/'){
        res.setHeader('Content-Type', 'text/html');
        res.write(file);
        res.end();
    }
});


server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
