'use strict';

const testConfig = require(`./_test-config`);
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
