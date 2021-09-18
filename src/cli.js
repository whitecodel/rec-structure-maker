const { code } = require("../bin/main");

const run = (args) => {
  if (args[2] == "create" && args[3]) {
    const json = require("../" + args[3]);
    code(json);
  } else {
    console.log("Invalid arguments");
  }
};

module.exports = { run };
