'use strict';

const testConfig = require(`./_test-config`);
const test = require(`ava`);
const utils = require(`@google-cloud/nodejs-repo-tools`);

test.cb(`Verify API URL with Negative scenario`, t => {
  utils
    .getRequest(testConfig)
    .get(`/api/`)
    .expect(404)
    .expect(response => {
      t.regex(response.text, /Cannot GET \/api/);
    })
    .end(t.end);
});
