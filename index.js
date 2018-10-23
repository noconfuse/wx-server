const express = require('express');
const router = express.Router();
const fs = require('fs');
const app = express();
app.use('/',require('./routes'))

var server = app.listen(3001, function () {
  let host = server.address().address;
  let port = server.address().port;
  console.log('server listening at http://%s:%s', host, port);
})