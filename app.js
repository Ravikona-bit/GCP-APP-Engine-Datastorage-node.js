'use strict'

const path = require('path');
var express = require('express');
var app = express()

app.set('trust proxy', true);
app.use('/api/customers', require('./customers/api'));

if (module === require.main) {
  // Start the server
  const server = app.listen(8080, () => {
    const port = server.address().port;
    console.log(`App listening on port ${port}`);
  });
}
module.exports = app;