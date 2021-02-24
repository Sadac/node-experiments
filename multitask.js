
process.env.UV_THREADPOOL_SIZE = 1;

const https = require('https');
const crypto = require('crypto');
const fs = require('fs');

const start = Date.now();

function doRequest() {
  https.request('https://www.google.com', (res) => {
    res.on('data', () => {});
    res.on('end', () => {
      console.log(Date.now() - start); // 1
    });
  }).end();
}

function doHash() {
  crypto.pbkdf2('a', 'b', 100000, 512, 'sha512', () => {
    console.log('Hash: ', Date.now() - start); // 2 ,4,5,6
  });
}

doRequest();

fs.readFile('multitask.js', 'utf8', () => {
  console.log('FS: ', Date.now() - start); // 3
});

doHash();
doHash();
doHash();
doHash();

// que tenga 1 mayus
// que tenga almenos 1 numero
// que no tenga la palabra password
// que tenga markations o operadores suma resta
// que no sea menor a 32
