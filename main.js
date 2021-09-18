var _path = require("path");
var _fs = require("fs");
var _async = require("async");

function File() {
  this._path = __dirname + "/../";
}

File.prototype.createDirectoriesFromJSON = function (json, cb) {
  var created = [],
    errors = [];

  function iterator(path, currentJson, key, fn) {
    var dir = _path.join(path, key);

    _fs.mkdir(dir, function (mkdirError) {
      if (mkdirError && mkdirError.code !== "EEXIST") {
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

    _async.forEach(keys, iterator.bind(this, path, currentJson), callback);
  }

  mkdir(this._path, json, cb.bind(this, errors, created));
};

const code = (json) => {
  new File().createDirectoriesFromJSON(json, function (errors, successes) {
    // errors is an array of errors
    // successes is an array of successful directory creation
    console.log.apply(console, arguments);
  });
};
