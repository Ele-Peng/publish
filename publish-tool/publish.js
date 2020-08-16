const http = require("http");
const fs = require('fs');
const querystring = require("querystring");

const postData = querystring.stringify({
    "content": "Hello World!2222"
})

let filename = "./cat.jpg"
fs.stat(filename, (error, stat) => {
    
    const options = {
        host: "localhost",
        port: 8081,
        path: "/?filename=" + filename,
        method: "POST",
        headers: {
            "Content-Type": "application/octet-stream",
            "Content-Length": stat.size
        }
    };

    const req = http.request(options, (res) => {
        console.log(`STATUS: ${res.statusCode}`);
        console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
        /*res.setEncoding('utf8');
        res.on('data', (chunk) => {
            console.log(`BODY: ${chunk}`);
        });
        res.on('end', () => {
            console.log('No more data in response.');
        });*/
    });
    
    req.on('error', (e) => {
        console.error(`problem with request: ${e.message}`);
    });
    
    let readStream = fs.createReadStream("./" + filename);
    readStream.pipe(req);
    readStream.on("end", () => {
        req.end();
    });
    
    // Write data to request body
    // req.write(postData);
    // req.end();
})