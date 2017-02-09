"use strict";

exports.__esModule = true;
exports["default"] = createKeyConcat;

function createKeyConcat(key, unshift) {
  return function (providers, value) {
    for (var providerName in providers) {
      var provider = providers[providerName];

      if (!provider[key]) {
        provider[key] = [];
      } else if (!Array.isArray(provider[key])) {
        provider[key] = [provider[key]];
      }

      if (unshift) {
        provider[key] = [].concat(value).concat(provider[key]);
      } else {
        provider[key] = provider[key].concat(value);
      }
    }
  };
}

module.exports = exports["default"];