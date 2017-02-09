'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports['default'] = createProviderStore;

var _redux = require('redux');

/**
 * Creates and returns a store specifically for some provider.
 *
 * @param {Object} provider
 * @param {Object} initialState Optional
 * @return {Object}
 * @api public
 */

function createProviderStore(provider, initialState) {
  var reducers = provider.reducers;
  var middleware = provider.middleware;
  var enhancer = provider.enhancer;

  var enhancers = [];
  var create = undefined;

  if (middleware) {
    enhancers.push(_redux.applyMiddleware.apply(null, [].concat(middleware)));
  }

  if (enhancer) {
    enhancers = enhancers.concat(enhancer);
  }

  if (initialState) {
    initialState = _extends({}, initialState);

    for (var key in initialState) {
      if (reducers[key] === undefined) {
        delete initialState[key];
      }
    }
  }

  if (enhancers.length) {
    create = _redux.compose.apply(undefined, enhancers)(_redux.createStore);
  } else {
    create = _redux.createStore;
  }

  return create(_redux.combineReducers(reducers), initialState);
}

module.exports = exports['default'];