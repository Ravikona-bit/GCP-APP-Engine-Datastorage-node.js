'use strict';

const path = require(`path`);

const TESTNAME = `customers`;
const PORT = 8082;

module.exports = {
  test: TESTNAME,
  cwd: path.resolve(path.join(__dirname, `../`)),
  cmd: `app`,
  port: PORT,
  env: {
    PORT: PORT,
  },
  url: `http://localhost:${PORT}`,
  version: process.env.GAE_VERSION || TESTNAME,
  msg: `customerprofile`,
  project: process.env.GCLOUD_PROJECT, // needed for e2e URL
};
