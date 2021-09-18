var path = require("path");
var fs = require("fs");
var async = require("async");
var files = require("./test.json");
files = { [process.argv[2]]: files };

function File() {
  this.path = __dirname;
}

File.prototype.createDirectoriesFromJSON = function (json, cb) {
  var created = [],
    errors = [];

  function iterator(path, currentJson, key, fn) {
    var dir = path.join(path, key);

    fs.mkdir(dir, function (mkdirError) {
      if (mkdirError && mkdirError.code !== "EXIST") {
        errors.push(mkdirError);
      } else if (!mkdirError) {
        created.push(dir);
      }

      mkdir(dir, currentJson[key], fn);
    });
  }

  function mkdir(path, currentJson, callback) {
    var keys = Object.keys(currentJson);

    if (keys.length === 0) return callback(null);

    async.forEach(keys, iterator.bind(this, path, currentJson), callback);
  }

  mkdir(this.path, json, cb.bind(this, errors, created));
};

new File().createDirectoriesFromJSON(files, function (errors, successes) {
  // errors is an array of errors
  // successes is an array of successful directory creation
  console.log.apply(console, arguments);
});
