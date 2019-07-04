'use strict'

const path = require('path');
const config = require('./config');
var express = require('express');

var app = express()

app.disable('etag');
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.set('trust proxy', true);

/*app.get('/', function(req, res){
    res.status(200).send('Hello from Customer Profile app')
});

var server = app.listen(process.env.PORT || '8080', function(){
    console.log('App Listening on port %s', server.address().port);
});*/


// Customers
app.use('/customers', require('./customers/read'));
app.use('/api/customers', require('./customers/api'));

// Redirect root to /customers
app.get('/', (req, res) => {
  res.redirect('/customers');
});

// Basic 404 handler
app.use((req, res) => {
  res.status(404).send('Not Found');
});

// Basic error handler
app.use((err, req, res) => {
  /* jshint unused:false */
  console.error(err);
  // If our routes specified a specific response, then send that. Otherwise,
  // send a generic message so as not to leak anything.
  res.status(500).send(err.response || 'Something broke!');
});

if (module === require.main) {
  // Start the server
  const server = app.listen(config.get('PORT'), () => {
    const port = server.address().port;
    console.log(`App listening on port ${port}`);
  });
}

module.exports = app;
