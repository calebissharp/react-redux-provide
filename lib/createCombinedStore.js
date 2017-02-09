'use strict';

exports.__esModule = true;
exports['default'] = createdCombinedStore;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _createProviderStore = require('./createProviderStore');

var _createProviderStore2 = _interopRequireDefault(_createProviderStore);

/**
 * Creates and returns a shared store based on the combined providers.
 *
 * @param {Object} providers
 * @param {Object} initialState Optional
 * @return {Object}
 * @api public
 */

function createdCombinedStore(providers, initialState) {
  var combinedProvider = {
    reducers: {},
    middleware: [],
    enhancer: []
  };

  for (var providerName in providers) {
    copyValues(combinedProvider, providers[providerName]);
  }

  return _createProviderStore2['default'](combinedProvider, initialState);
}

function copyValues(combinedProvider, provider) {
  for (var key in combinedProvider) {
    var value = combinedProvider[key];
    var providerValue = provider[key];

    if (!providerValue) {
      continue;
    }

    if (Array.isArray(value)) {
      if (!Array.isArray(providerValue)) {
        providerValue = [providerValue];
      }

      for (var _iterator = providerValue, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
        var _ref;

        if (_isArray) {
          if (_i >= _iterator.length) break;
          _ref = _iterator[_i++];
        } else {
          _i = _iterator.next();
          if (_i.done) break;
          _ref = _i.value;
        }

        var item = _ref;

        if (value.indexOf(item) < 0) {
          value.push(item);
        }
      }
    } else if (typeof providerValue === 'object') {
      Object.assign(value, providerValue);
    }
  }
}
module.exports = exports['default'];