'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const model = require('./model-datastore');
const router = express.Router();

// Automatically parse request body as JSON
router.use(bodyParser.json());

/**
 * GET /api/customers
 *
 * Retrieve a page of customers (up to ten at a time).
 */
router.get('/', (req, res, next) => {
  model.list(10, req.query.pageToken, (err, entities, cursor) => {
    res.json({
      customers: entities,
      nextPageToken: cursor,
    });
  });
});

/**
 * GET /api/customers/:id
 *
 * Retrieve a customer.
 */
router.get('/:customer', (req, res, next) => {
  model.read(req.params.customer, (err, entity) => {
    if(typeof entity == 'undefined'){
      return res.status(400).send({
        message: 'No Data Found!'
     });
    }else{
      res.json(entity);
    }
  });
});

module.exports = router;