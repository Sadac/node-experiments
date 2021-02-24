const https = require('https');

const start = Date.now();

function doRequest() {
  https.request('https://jsonplaceholder.typicode.com/todos', (res) => {
    res.on('data', () => {});
    res.on('end', () => {
      console.log('End request :', Date.now() - start);
    });
  }).end();
}

doRequest();
let sum = 0;
// useless heavy task to keep running and block the main thread
setTimeout(() => {
  for (let i = 0; i < 1000000000; i += 1) {
    sum += i;
  }
}, 0);
console.log('Non blocking');
