#!/usr/bin/env node

require("esm")(module /*, options */);
const { run } = require("../src/cli");

run(process.argv);
