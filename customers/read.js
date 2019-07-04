'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const model = require('./model-datastore');

const router = express.Router();

// Automatically parse request body as form data
router.use(bodyParser.urlencoded({extended: false}));

// Set Content-Type for all responses for these routes
router.use((req, res, next) => {
  res.set('Content-Type', 'text/html');
  next();
});

/**
 * GET /customers
 *
 * Display a page of customers (up to ten at a time).
 */
router.get('/', (req, res, next) => {
  model.list(10, req.query.pageToken, (err, entities, cursor) => {
    if (err) {
      next(err);
      return;
    }
    res.render('customers/list.pug', {
      customers: entities,
      nextPageToken: cursor,
    });
  });
});


/**
 * GET /customers/:id
 *
 * Display a customer.
 */
router.get('/:customer', (req, res, next) => {
  model.read(req.params.customer, (err, entity) => {
    if (err) {
      next(err);
      return;
    }
    res.render('customers/view.pug', {
      customer: entity,
    });
  });
});

/**
 * Errors on "/customers/*" routes.
 */
router.use((err, req, res, next) => {
  // Format error and forward to generic error handler for logging and
  // responding to the request
  err.response = err.message;
  next(err);
});

module.exports = router;
