'use strict';

const getRequest = require(`@google-cloud/nodejs-repo-tools`).getRequest;
const test = require(`ava`);

module.exports = () => {
  let id, testConfig;

  test.before(() => {
    testConfig = require(`./_test-config`);
  });

  test.serial.cb(`should list customers`, t => {
    // Give Datastore time to become consistent
    setTimeout(() => {
      getRequest(testConfig)
        .get(`/api/customers`)
        .expect(200)
        .expect(response => {
          t.true(Array.isArray(response.body.items));
          t.true(response.body.items.length >= 1);
          id = response.body.items[0].id;
        })
        .end(t.end);
    }, 1000);
  });

  test.serial.cb(`should get customer with 200 response for respective customer id`, t => {
    getRequest(testConfig)
      .get(`/api/customers/${id}/`)
      .expect(200)
      .expect(response => {
        t.is(response.status,200)
      })
      .end(t.end);
  });
};
