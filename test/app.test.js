'use strict';

const testConfig = require(`./_test-config`);
const proxyquire = require(`proxyquire`).noPreserveCache();
const sinon = require(`sinon`);
const test = require(`ava`);
const utils = require(`@google-cloud/nodejs-repo-tools`);

test.cb(`should redirect / to /customers`, t => {
  utils
    .getRequest(testConfig)
    .get(`/`)
    .expect(302)
    .expect(response => {
      t.regex(response.text, /Redirecting to \/customers/);
    })
    .end(t.end);
});

test(`should check config`, t => {
  const nconfMock = {
    argv: sinon.stub().returnsThis(),
    env: sinon.stub().returnsThis(),
    file: sinon.stub().returnsThis(),
    defaults: sinon.stub().returnsThis(),
    get: function(setting) {
      return this[setting];
    },
  };

  const testFunc = () => {
    proxyquire(`../config`, {nconf: nconfMock});
  };

  t.notThrows(testFunc);
});
