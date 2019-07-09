'use strict';

const {Datastore} = require('@google-cloud/datastore');

// [START config]
const ds = new Datastore();
const kind = 'Customers';
// [END config]

function fromDatastore(obj) {
  if(typeof obj != 'undefined'){
    obj.id = obj[Datastore.KEY].id;
  }
  return obj;
}
// Lists all customers in the Datastore sorted alphabetically by name.
// The ``limit`` argument determines the maximum amount of results to
// return per page. The ``token`` argument allows requesting additional
// pages. The callback is invoked with ``(err, customers, nextPageToken)``.
// [START list]
function list(limit, token, cb) {
  const q = ds
    .createQuery([kind])
    .limit(limit)
    .order('name')
    .start(token);

  ds.runQuery(q, (err, entities, nextQuery) => {
    if (err) {
      cb(err);
      return;
    }
    const hasMore =
      nextQuery.moreResults !== Datastore.NO_MORE_RESULTS
        ? nextQuery.endCursor
        : false;
    cb(null, entities.map(fromDatastore), hasMore);
  });
}
// [END list]
//Returns specific customer details for given customer ID
function read(id, cb) {
  const key = ds.key([kind, parseInt(id, 10)]);
  ds.get(key, (err, entity) => {
    cb(null, fromDatastore(entity));
  });
}
// [START exports]
module.exports = {
  read,
  list
};
// [END exports]