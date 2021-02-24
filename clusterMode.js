/* eslint-disable */

// set to 1 the thread pool size of EVERY child cluster and main master
// So for experiment purpose we only will have 1 thread per instance forked
process.env.UV_THREADPOOL_SIZE = 1;
const cluster = require('cluster');

console.log(cluster.isMaster);
if (cluster.isMaster) {
  // Makes index.js to be executed again
  // But in slave/child mode
  cluster.fork();

  // We need to call another instance in order to have X instances of node
  // Usually match the forks with the number of cores of the CPU.
  // an i5 has 4 cores, so we fork 4 instances of node
  cluster.fork();
  cluster.fork();
  cluster.fork();

} else {
  const crypto = require('crypto');
  const express = require('express');
  const app = express();

  // ab -c 2 -n 2 localhost:3000/
  // apache bench mark, make -n 2 requests at the exact same time -c 2 (concurrency) to
  // the defined child instances or master single instance
  app.get('/', (req, res) => {
    crypto.pbkdf2('a', 'b', 100000, 512, 'sha512', () => {
      res.send('Hi there dude!');
    });
  });

  // If we call the 2 endpoints in parallel, with the fork()
  // the /fast will be executed immediately, but without the fork()
  // the /fast endpoint will wait until / gets resolved
  app.get('/fast', (req, res) => {
    res.send('This was fast...!');
  });

  app.listen(3000, () => console.log('listening on port 3000'));
}
