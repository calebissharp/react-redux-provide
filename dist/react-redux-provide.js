(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("redux"), require("react"));
	else if(typeof define === 'function' && define.amd)
		define(["redux", "react"], factory);
	else if(typeof exports === 'object')
		exports["ReactReduxProvide"] = factory(require("redux"), require("react"));
	else
		root["ReactReduxProvide"] = factory(root["Redux"], root["React"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_3__, __WEBPACK_EXTERNAL_MODULE_20__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _provide = __webpack_require__(6);

	var _provide2 = _interopRequireDefault(_provide);

	var _createProviderStore = __webpack_require__(2);

	var _createProviderStore2 = _interopRequireDefault(_createProviderStore);

	var _createCombinedStore = __webpack_require__(4);

	var _createCombinedStore2 = _interopRequireDefault(_createCombinedStore);

	var _pushMiddleware = __webpack_require__(8);

	var _pushMiddleware2 = _interopRequireDefault(_pushMiddleware);

	var _unshiftMiddleware = __webpack_require__(10);

	var _unshiftMiddleware2 = _interopRequireDefault(_unshiftMiddleware);

	var _pushEnhancer = __webpack_require__(7);

	var _pushEnhancer2 = _interopRequireDefault(_pushEnhancer);

	var _unshiftEnhancer = __webpack_require__(9);

	var _unshiftEnhancer2 = _interopRequireDefault(_unshiftEnhancer);

	exports['default'] = _provide2['default'];
	exports.provide = _provide2['default'];
	exports.reloadProviders = _provide.reloadProviders;
	exports.createProviderStore = _createProviderStore2['default'];
	exports.createCombinedStore = _createCombinedStore2['default'];
	exports.pushMiddleware = _pushMiddleware2['default'];
	exports.unshiftMiddleware = _unshiftMiddleware2['default'];
	exports.pushEnhancer = _pushEnhancer2['default'];
	exports.unshiftEnhancer = _unshiftEnhancer2['default'];

/***/ }),
/* 1 */
/***/ (function(module, exports) {

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

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	exports['default'] = createProviderStore;

	var _redux = __webpack_require__(3);

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

/***/ }),
/* 3 */
/***/ (function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_3__;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	exports['default'] = createdCombinedStore;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _createProviderStore = __webpack_require__(2);

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

/***/ }),
/* 5 */
/***/ (function(module, exports) {

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 */

	'use strict';

	var ReactPropTypesSecret = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';

	module.exports = ReactPropTypesSecret;


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	exports['default'] = provide;
	exports.reloadProviders = reloadProviders;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _react = __webpack_require__(20);

	var _react2 = _interopRequireDefault(_react);

	var _propTypes = __webpack_require__(17);

	var _propTypes2 = _interopRequireDefault(_propTypes);

	var _isPlainObject = __webpack_require__(12);

	var _isPlainObject2 = _interopRequireDefault(_isPlainObject);

	var _redux = __webpack_require__(3);

	var _reactReduxLibUtilsShallowEqual = __webpack_require__(18);

	var _reactReduxLibUtilsShallowEqual2 = _interopRequireDefault(_reactReduxLibUtilsShallowEqual);

	var _reactReduxLibUtilsWrapActionCreators = __webpack_require__(19);

	var _reactReduxLibUtilsWrapActionCreators2 = _interopRequireDefault(_reactReduxLibUtilsWrapActionCreators);

	var _createProviderStore = __webpack_require__(2);

	var _createProviderStore2 = _interopRequireDefault(_createProviderStore);

	var _createCombinedStore = __webpack_require__(4);

	var _createCombinedStore2 = _interopRequireDefault(_createCombinedStore);

	var _hoistNonReactStatics = __webpack_require__(11);

	var _hoistNonReactStatics2 = _interopRequireDefault(_hoistNonReactStatics);

	var defaultMapState = function defaultMapState() {
	  return {};
	};
	var defaultMapDispatch = function defaultMapDispatch(dispatch) {
	  return { dispatch: dispatch };
	};
	var defaultMerge = function defaultMerge(stateProps, dispatchProps, parentProps) {
	  return _extends({}, stateProps, parentProps, dispatchProps);
	};

	var contextTypes = {
	  providedState: _propTypes2['default'].object,
	  providers: _propTypes2['default'].object,
	  combinedProviders: _propTypes2['default'].oneOfType([_propTypes2['default'].object, _propTypes2['default'].arrayOf(_propTypes2['default'].object)]),
	  combinedProviderStores: _propTypes2['default'].object,
	  providerReady: _propTypes2['default'].arrayOf(_propTypes2['default'].func)
	};

	var wrappedInstances = {};
	var rootInstance = null;

	function provide(WrappedComponent) {
	  var stateless = typeof WrappedComponent.prototype.render === 'undefined';
	  var wrappedName = WrappedComponent.displayName || WrappedComponent.name;
	  var instances = wrappedInstances[wrappedName] || new Set();
	  var pure = WrappedComponent.pure !== false;
	  var doSubscribe = false;
	  var statePropsDepend = false;
	  var dispatchPropsDepend = false;

	  if (!wrappedInstances[wrappedName]) {
	    wrappedInstances[wrappedName] = instances;
	  }

	  function getDisplayName() {
	    var providers = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

	    return 'Provide' + wrappedName + '(' + Object.keys(providers).join(',') + ')';
	  }

	  function getReduced(reducers) {
	    var reduced = {};

	    for (var key in reducers) {
	      reduced[key] = reducers[key](undefined, {});
	    }

	    return reduced;
	  }

	  var Provide = (function (_Component) {
	    _inherits(Provide, _Component);

	    Provide.prototype.getChildContext = function getChildContext() {
	      return {
	        providedState: this.providedState,
	        providers: this.contextProviders,
	        combinedProviders: this.contextCombinedProviders,
	        combinedProviderStores: this.contextCombinedProviderStores,
	        providerReady: this.providerReady
	      };
	    };

	    _createClass(Provide, null, [{
	      key: 'WrappedComponent',
	      value: WrappedComponent,
	      enumerable: true
	    }, {
	      key: 'displayName',
	      value: getDisplayName(),
	      enumerable: true
	    }, {
	      key: 'propTypes',
	      value: contextTypes,
	      enumerable: true
	    }, {
	      key: 'contextTypes',
	      value: contextTypes,
	      enumerable: true
	    }, {
	      key: 'childContextTypes',
	      value: contextTypes,
	      enumerable: true
	    }]);

	    function Provide(props, context) {
	      _classCallCheck(this, Provide);

	      _Component.call(this, props);

	      if (!context.providers) {
	        rootInstance = this;
	      }

	      this.prerenders = 1;
	      this.renders = 0;
	      this.initialize(props, context);
	    }

	    Provide.prototype.initialize = function initialize(props, context) {
	      this.stores = new Set();
	      this.storesStates = new WeakMap();
	      this.providedState = props.providedState || context.providedState || {};
	      this.providerReady = props.providerReady || context.providerReady;
	      this.initCombinedProviderStores(props, context);
	      this.initProviders(props, context);
	      this.initState(props, context);
	    };

	    Provide.prototype.reinitialize = function reinitialize(props, context, newWrappedComponent) {
	      if (newWrappedComponent) {
	        this.setWrappedComponent(newWrappedComponent);
	      }
	      this.initialize(props, context);
	      this.tryUnsubscribe();
	      this.trySubscribe();
	      this.forceUpdate();
	    };

	    Provide.prototype.setWrappedComponent = function setWrappedComponent(newWrappedComponent) {
	      var prevWrappedName = wrappedName;

	      WrappedComponent = newWrappedComponent;
	      Provide.WrappedComponent = WrappedComponent;
	      wrappedName = WrappedComponent.displayName || WrappedComponent.name;
	      if (prevWrappedName !== wrappedName) {
	        wrappedInstances[wrappedName] = instances;
	        delete wrappedInstances[prevWrappedName];
	      }
	      pure = WrappedComponent.pure !== false;
	      doSubscribe = false;
	      statePropsDepend = false;
	      dispatchPropsDepend = false;
	    };

	    Provide.prototype.initCombinedProviderStores = function initCombinedProviderStores(props, context) {
	      if (!props.providers && context.combinedProviderStores) {
	        this.contextCombinedProviders = context.combinedProviders;
	        this.contextCombinedProviderStores = context.combinedProviderStores;
	        return;
	      }

	      var _props$combinedProviders = props.combinedProviders;
	      var combinedProviders = _props$combinedProviders === undefined ? [] : _props$combinedProviders;

	      if (!Array.isArray(combinedProviders)) {
	        combinedProviders = [combinedProviders];
	      }

	      if (this.contextCombinedProviderStores) {
	        var removed = new WeakSet();

	        for (var _name in this.contextCombinedProviderStores) {
	          var store = this.contextCombinedProviderStores[_name];

	          if (store && store.remove && !removed.has(store)) {
	            store.remove();
	            removed.add(store);
	          }
	        }
	      }

	      this.contextCombinedProviders = combinedProviders;
	      this.contextCombinedProviderStores = {};

	      for (var _iterator = combinedProviders, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
	        var _ref;

	        if (_isArray) {
	          if (_i >= _iterator.length) break;
	          _ref = _iterator[_i++];
	        } else {
	          _i = _iterator.next();
	          if (_i.done) break;
	          _ref = _i.value;
	        }

	        var providers = _ref;

	        var store = _createCombinedStore2['default'](providers, this.providedState);

	        for (var _name2 in providers) {
	          this.contextCombinedProviderStores[_name2] = store;
	        }
	      }
	    };

	    Provide.prototype.initProviders = function initProviders(props, context) {
	      var _WrappedComponent = WrappedComponent;
	      var _WrappedComponent$propTypes = _WrappedComponent.propTypes;
	      var propTypes = _WrappedComponent$propTypes === undefined ? {} : _WrappedComponent$propTypes;

	      if (props.providers) {
	        if (this.contextProviders) {
	          var removed = new WeakSet();

	          for (var _name3 in this.contextProviders) {
	            var store = this.contextProviders[_name3].store;

	            if (store && store.remove && !removed.has(store)) {
	              store.remove();
	              removed.add(store);
	            }
	          }
	        }

	        this.contextProviders = {};

	        for (var _name4 in props.providers) {
	          this.initProvider(_name4, props.providers[_name4]);
	        }
	      } else {
	        this.contextProviders = context.providers;
	      }

	      this.providers = {};

	      for (var _name5 in this.contextProviders) {
	        var provider = this.contextProviders[_name5];
	        var _provider$actions = provider.actions;
	        var actions = _provider$actions === undefined ? {} : _provider$actions;
	        var _provider$reducers = provider.reducers;
	        var reducers = _provider$reducers === undefined ? {} : _provider$reducers;
	        var merge = provider.merge;

	        var merged = merge && merge(getReduced(reducers), {}, {}) || {};

	        for (var propKey in propTypes) {
	          if (propKey in actions || propKey in reducers || propKey in merged) {
	            this.providers[_name5] = provider;
	            this.addStore(provider.store);

	            if (provider.shouldSubscribe) {
	              doSubscribe = true;
	            }
	            if (provider.mapStateProps) {
	              statePropsDepend = true;
	            }
	            if (provider.mapDispatchProps) {
	              dispatchPropsDepend = true;
	            }

	            break;
	          }
	        }
	      }

	      Provide.displayName = getDisplayName(this.providers);
	    };

	    Provide.prototype.initProvider = function initProvider(name, provider) {
	      var _provider$actions2 = provider.actions;
	      var actions = _provider$actions2 === undefined ? {} : _provider$actions2;
	      var _provider$reducers2 = provider.reducers;
	      var reducers = _provider$reducers2 === undefined ? {} : _provider$reducers2;
	      var mapState = provider.mapState;
	      var mapDispatch = provider.mapDispatch;
	      var merge = provider.merge;

	      var shouldSubscribe = false;

	      if (typeof mapState === 'undefined') {
	        mapState = function (state) {
	          var props = {};

	          for (var key in reducers) {
	            props[key] = state[key];
	          }

	          return props;
	        };
	      }

	      if (typeof mapState === 'function') {
	        shouldSubscribe = true;
	      } else {
	        mapState = defaultMapState;
	      }

	      if (typeof mapDispatch === 'undefined') {
	        mapDispatch = function (dispatch) {
	          return _redux.bindActionCreators(actions, dispatch);
	        };
	      } else if (_isPlainObject2['default'](mapDispatch)) {
	        mapDispatch = _reactReduxLibUtilsWrapActionCreators2['default'](mapDispatch);
	      } else if (typeof mapDispatch !== 'function') {
	        mapDispatch = defaultMapDispatch;
	      }

	      if (!merge) {
	        merge = defaultMerge;
	      }

	      var mapStateProps = mapState.length !== 1;
	      var mapDispatchProps = mapDispatch.length !== 1;

	      this.contextProviders[name] = this.setProviderStore(_extends({
	        name: name
	      }, provider, {
	        shouldSubscribe: shouldSubscribe,
	        mapState: mapState,
	        mapStateProps: mapStateProps,
	        mapDispatch: mapDispatch,
	        mapDispatchProps: mapDispatchProps,
	        merge: merge
	      }));
	    };

	    Provide.prototype.addStore = function addStore(store) {
	      this.stores.add(store);
	      this.storesStates.set(store, store.getState());
	    };

	    Provide.prototype.setProviderStore = function setProviderStore(provider) {
	      if (!provider.store) {
	        provider.store = this.contextCombinedProviderStores[provider.name] || _createProviderStore2['default'](provider, this.providedState);

	        this.setProviderReady(provider);
	      }

	      return provider;
	    };

	    Provide.prototype.setProviderReady = function setProviderReady(provider) {
	      if (this.providerReady) {
	        for (var _iterator2 = this.providerReady, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
	          var _ref2;

	          if (_isArray2) {
	            if (_i2 >= _iterator2.length) break;
	            _ref2 = _iterator2[_i2++];
	          } else {
	            _i2 = _iterator2.next();
	            if (_i2.done) break;
	            _ref2 = _i2.value;
	          }

	          var ready = _ref2;

	          ready(provider);
	        }
	      }
	    };

	    Provide.prototype.initState = function initState(props, context) {
	      this.state = { storesStates: this.storesStates };
	      this.setStateProps(props);
	      this.setDispatchProps(props);
	      this.setMergedProps(props);
	    };

	    Provide.prototype.setStateProps = function setStateProps(props) {
	      var stateProps = this.stateProps;

	      var nextStateProps = this.computeStateProps(props);

	      if (stateProps && _reactReduxLibUtilsShallowEqual2['default'](nextStateProps, stateProps)) {
	        return false;
	      }

	      this.stateProps = nextStateProps;
	      return true;
	    };

	    Provide.prototype.computeStateProps = function computeStateProps(props) {
	      var stateProps = {};

	      for (var _name6 in this.providers) {
	        var provider = this.providers[_name6];
	        var state = provider.store.getState();
	        var providerStateProps = provider.mapStateProps ? provider.mapState(state, props) : provider.mapState(state);

	        if (!_isPlainObject2['default'](providerStateProps)) {
	          throw new Error('`mapState` must return an object. Instead received %s.', providerStateProps);
	        }

	        Object.assign(stateProps, providerStateProps);
	      }

	      return stateProps;
	    };

	    Provide.prototype.setDispatchProps = function setDispatchProps(props) {
	      var dispatchProps = this.dispatchProps;

	      var nextDispatchProps = this.computeDispatchProps(props);
	      if (dispatchProps && _reactReduxLibUtilsShallowEqual2['default'](nextDispatchProps, dispatchProps)) {
	        return false;
	      }

	      this.dispatchProps = nextDispatchProps;
	      return true;
	    };

	    Provide.prototype.computeDispatchProps = function computeDispatchProps(props) {
	      var dispatchProps = {};

	      for (var _name7 in this.providers) {
	        var provider = this.providers[_name7];
	        var dispatch = provider.store.dispatch;

	        var providerDispatchProps = provider.mapDispatchProps ? provider.mapDispatch(dispatch, props) : provider.mapDispatch(dispatch);

	        if (!_isPlainObject2['default'](providerDispatchProps)) {
	          throw new Error('`mapDispatch` must return an object. Instead received %s.', providerDispatchProps);
	        }

	        Object.assign(dispatchProps, providerDispatchProps);
	      }

	      return dispatchProps;
	    };

	    Provide.prototype.setMergedProps = function setMergedProps(props) {
	      var stateProps = this.stateProps;
	      var dispatchProps = this.dispatchProps;
	      var mergedProps = this.mergedProps;

	      this.mergedProps = this.computeMergedProps(stateProps, dispatchProps, WrappedComponent.defaultProps ? _extends({}, WrappedComponent.defaultProps, props) : props);

	      return !mergedProps || !_reactReduxLibUtilsShallowEqual2['default'](mergedProps, this.mergedProps);
	    };

	    Provide.prototype.computeMergedProps = function computeMergedProps(stateProps, dispatchProps, parentProps) {
	      var mergedProps = defaultMerge(stateProps, dispatchProps, parentProps);
	      var filtered = {};

	      for (var _name8 in this.providers) {
	        var provider = this.providers[_name8];
	        var providerMergedProps = provider.merge(stateProps, dispatchProps, mergedProps);

	        if (!_isPlainObject2['default'](providerMergedProps)) {
	          throw new Error('`merge` must return an object. Instead received %s.', providerMergedProps);
	        }

	        Object.assign(mergedProps, providerMergedProps);
	      }

	      for (var key in WrappedComponent.propTypes) {
	        if (mergedProps[key] !== undefined) {
	          filtered[key] = mergedProps[key];
	        }
	      }

	      return filtered;
	    };

	    Provide.prototype.componentDidMount = function componentDidMount() {
	      this.trySubscribe();
	      instances.add(this);
	    };

	    Provide.prototype.componentWillUnmount = function componentWillUnmount() {
	      this.tryUnsubscribe();
	      instances['delete'](this);
	    };

	    Provide.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
	      if (!pure || !_reactReduxLibUtilsShallowEqual2['default'](nextProps, this.props)) {
	        this.propsChanged = true;
	      }
	    };

	    Provide.prototype.isSubscribed = function isSubscribed() {
	      return this.unsubscribe && typeof this.unsubscribe[0] === 'function';
	    };

	    Provide.prototype.trySubscribe = function trySubscribe() {
	      var _this = this;

	      if (doSubscribe && !this.unsubscribe) {
	        this.unsubscribe = Array.from(this.stores).map(function (store) {
	          return store.subscribe(_this.handleChange.bind(_this));
	        });
	        this.handleChange();
	      }
	    };

	    Provide.prototype.tryUnsubscribe = function tryUnsubscribe() {
	      if (this.unsubscribe) {
	        for (var _iterator3 = this.unsubscribe, _isArray3 = Array.isArray(_iterator3), _i3 = 0, _iterator3 = _isArray3 ? _iterator3 : _iterator3[Symbol.iterator]();;) {
	          var _ref3;

	          if (_isArray3) {
	            if (_i3 >= _iterator3.length) break;
	            _ref3 = _iterator3[_i3++];
	          } else {
	            _i3 = _iterator3.next();
	            if (_i3.done) break;
	            _ref3 = _i3.value;
	          }

	          var unsubscribe = _ref3;

	          unsubscribe();
	        }
	        this.unsubscribe = null;
	      }
	    };

	    Provide.prototype.handleChange = function handleChange() {
	      if (!this.unsubscribe) {
	        return;
	      }

	      if (!pure || this.storesDidChange()) {
	        this.storesChanged = true;
	        this.setState({ storesStates: this.storesStates });
	      }
	    };

	    Provide.prototype.storesDidChange = function storesDidChange() {
	      var stores = this.stores;
	      var storesStates = this.storesStates;

	      var changed = false;

	      this.storesStates = new WeakMap();

	      for (var _iterator4 = stores, _isArray4 = Array.isArray(_iterator4), _i4 = 0, _iterator4 = _isArray4 ? _iterator4 : _iterator4[Symbol.iterator]();;) {
	        var _ref4;

	        if (_isArray4) {
	          if (_i4 >= _iterator4.length) break;
	          _ref4 = _iterator4[_i4++];
	        } else {
	          _i4 = _iterator4.next();
	          if (_i4.done) break;
	          _ref4 = _i4.value;
	        }

	        var store = _ref4;

	        var prevStoreState = storesStates.get(store);
	        var storeState = store.getState();

	        if (prevStoreState !== storeState && !_reactReduxLibUtilsShallowEqual2['default'](prevStoreState, storeState)) {
	          changed = true;
	        }

	        this.storesStates.set(store, storeState);
	      }

	      return changed;
	    };

	    Provide.prototype.getCurrentProvidedState = function getCurrentProvidedState() {
	      var contextProviders = this.contextProviders;

	      var providedState = {};

	      for (var _name9 in contextProviders) {
	        Object.assign(providedState, contextProviders[_name9].store.getState());
	      }

	      return providedState;
	    };

	    Provide.prototype.shouldComponentUpdate = function shouldComponentUpdate(props) {
	      var propsChanged = this.propsChanged;
	      var storesChanged = this.storesChanged;

	      var statePropsChanged = false;
	      var dispatchPropsChanged = false;
	      var mergedPropsChanged = false;

	      if (!pure) {
	        return true;
	      }

	      if (!propsChanged && !storesChanged) {
	        return false;
	      }

	      if (storesChanged || propsChanged && statePropsDepend) {
	        statePropsChanged = this.setStateProps(props);
	      }
	      if (propsChanged && dispatchPropsDepend) {
	        dispatchPropsChanged = this.setDispatchProps(props);
	      }
	      if (statePropsChanged || dispatchPropsChanged || propsChanged) {
	        mergedPropsChanged = this.setMergedProps(props);
	      }

	      this.prerenders++;
	      this.propsChanged = false;
	      this.storesChanged = false;

	      return mergedPropsChanged;
	    };

	    Provide.prototype.render = function render() {
	      this.renders++;

	      return stateless ? _react2['default'].createElement(WrappedComponent, this.mergedProps) : _react2['default'].createElement(WrappedComponent, _extends({ ref: 'wrappedInstance' }, this.mergedProps));
	    };

	    return Provide;
	  })(_react.Component);

	  if (true) {
	    for (var _iterator5 = instances, _isArray5 = Array.isArray(_iterator5), _i5 = 0, _iterator5 = _isArray5 ? _iterator5 : _iterator5[Symbol.iterator]();;) {
	      var _ref5;

	      if (_isArray5) {
	        if (_i5 >= _iterator5.length) break;
	        _ref5 = _iterator5[_i5++];
	      } else {
	        _i5 = _iterator5.next();
	        if (_i5.done) break;
	        _ref5 = _i5.value;
	      }

	      var instance = _ref5;
	      var props = instance.props;
	      var context = instance.context;

	      instance.reinitialize(props, context, WrappedComponent);
	    }
	  }

	  return _hoistNonReactStatics2['default'](Provide, WrappedComponent);
	}

	function reloadProviders(_ref7) {
	  var providers = _ref7.providers;
	  var combinedProviders = _ref7.combinedProviders;

	  rootInstance.reinitialize(_extends({}, rootInstance.props, {
	    providedState: rootInstance.getCurrentProvidedState(),
	    providers: providers,
	    combinedProviders: combinedProviders
	  }), rootInstance.context);

	  var _rootInstance = rootInstance;
	  var contextProviders = _rootInstance.contextProviders;
	  var contextCombinedProviders = _rootInstance.contextCombinedProviders;
	  var contextCombinedProviderStores = _rootInstance.contextCombinedProviderStores;

	  for (var wrappedName in wrappedInstances) {
	    var instances = wrappedInstances[wrappedName];

	    for (var _iterator6 = instances, _isArray6 = Array.isArray(_iterator6), _i6 = 0, _iterator6 = _isArray6 ? _iterator6 : _iterator6[Symbol.iterator]();;) {
	      var _ref6;

	      if (_isArray6) {
	        if (_i6 >= _iterator6.length) break;
	        _ref6 = _iterator6[_i6++];
	      } else {
	        _i6 = _iterator6.next();
	        if (_i6.done) break;
	        _ref6 = _i6.value;
	      }

	      var instance = _ref6;
	      var props = instance.props;
	      var context = instance.context;

	      if (instance !== rootInstance) {
	        context.providers = contextProviders;
	        context.combinedProviders = contextCombinedProviders;
	        context.combinedProviderStores = contextCombinedProviderStores;
	        instance.reinitialize(props, context);
	      }
	    }
	  }
	}

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _createKeyConcat = __webpack_require__(1);

	var _createKeyConcat2 = _interopRequireDefault(_createKeyConcat);

	var pushEnhancer = _createKeyConcat2['default']('enhancer');

	exports['default'] = pushEnhancer;
	module.exports = exports['default'];

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _createKeyConcat = __webpack_require__(1);

	var _createKeyConcat2 = _interopRequireDefault(_createKeyConcat);

	var pushMiddleware = _createKeyConcat2['default']('middleware');

	exports['default'] = pushMiddleware;
	module.exports = exports['default'];

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _createKeyConcat = __webpack_require__(1);

	var _createKeyConcat2 = _interopRequireDefault(_createKeyConcat);

	var unshiftEnhancer = _createKeyConcat2['default']('enhancer', true);

	exports['default'] = unshiftEnhancer;
	module.exports = exports['default'];

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _createKeyConcat = __webpack_require__(1);

	var _createKeyConcat2 = _interopRequireDefault(_createKeyConcat);

	var unshiftMiddleware = _createKeyConcat2['default']('middleware', true);

	exports['default'] = unshiftMiddleware;
	module.exports = exports['default'];

/***/ }),
/* 11 */
/***/ (function(module, exports) {

	/**
	 * Copyright 2015, Yahoo! Inc.
	 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
	 */
	'use strict';

	var REACT_STATICS = {
	    childContextTypes: true,
	    contextTypes: true,
	    defaultProps: true,
	    displayName: true,
	    getDefaultProps: true,
	    mixins: true,
	    propTypes: true,
	    type: true
	};

	var KNOWN_STATICS = {
	    name: true,
	    length: true,
	    prototype: true,
	    caller: true,
	    arguments: true,
	    arity: true
	};

	var isGetOwnPropertySymbolsAvailable = typeof Object.getOwnPropertySymbols === 'function';

	module.exports = function hoistNonReactStatics(targetComponent, sourceComponent, customStatics) {
	    if (typeof sourceComponent !== 'string') { // don't hoist over string (html) components
	        var keys = Object.getOwnPropertyNames(sourceComponent);

	        /* istanbul ignore else */
	        if (isGetOwnPropertySymbolsAvailable) {
	            keys = keys.concat(Object.getOwnPropertySymbols(sourceComponent));
	        }

	        for (var i = 0; i < keys.length; ++i) {
	            if (!REACT_STATICS[keys[i]] && !KNOWN_STATICS[keys[i]] && (!customStatics || !customStatics[keys[i]])) {
	                try {
	                    targetComponent[keys[i]] = sourceComponent[keys[i]];
	                } catch (error) {

	                }
	            }
	        }
	    }

	    return targetComponent;
	};


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

	/*!
	 * is-plain-object <https://github.com/jonschlinkert/is-plain-object>
	 *
	 * Copyright (c) 2014-2017, Jon Schlinkert.
	 * Released under the MIT License.
	 */

	'use strict';

	var isObject = __webpack_require__(13);

	function isObjectObject(o) {
	  return isObject(o) === true
	    && Object.prototype.toString.call(o) === '[object Object]';
	}

	module.exports = function isPlainObject(o) {
	  var ctor,prot;

	  if (isObjectObject(o) === false) return false;

	  // If has modified constructor
	  ctor = o.constructor;
	  if (typeof ctor !== 'function') return false;

	  // If has modified prototype
	  prot = ctor.prototype;
	  if (isObjectObject(prot) === false) return false;

	  // If constructor does not have an Object-specific method
	  if (prot.hasOwnProperty('isPrototypeOf') === false) {
	    return false;
	  }

	  // Most likely a plain Object
	  return true;
	};


/***/ }),
/* 13 */
/***/ (function(module, exports) {

	/*!
	 * isobject <https://github.com/jonschlinkert/isobject>
	 *
	 * Copyright (c) 2014-2017, Jon Schlinkert.
	 * Released under the MIT License.
	 */

	'use strict';

	module.exports = function isObject(val) {
	  return val != null && typeof val === 'object' && Array.isArray(val) === false;
	};


/***/ }),
/* 14 */
/***/ (function(module, exports) {

	/*
	object-assign
	(c) Sindre Sorhus
	@license MIT
	*/

	'use strict';
	/* eslint-disable no-unused-vars */
	var getOwnPropertySymbols = Object.getOwnPropertySymbols;
	var hasOwnProperty = Object.prototype.hasOwnProperty;
	var propIsEnumerable = Object.prototype.propertyIsEnumerable;

	function toObject(val) {
		if (val === null || val === undefined) {
			throw new TypeError('Object.assign cannot be called with null or undefined');
		}

		return Object(val);
	}

	function shouldUseNative() {
		try {
			if (!Object.assign) {
				return false;
			}

			// Detect buggy property enumeration order in older V8 versions.

			// https://bugs.chromium.org/p/v8/issues/detail?id=4118
			var test1 = new String('abc');  // eslint-disable-line no-new-wrappers
			test1[5] = 'de';
			if (Object.getOwnPropertyNames(test1)[0] === '5') {
				return false;
			}

			// https://bugs.chromium.org/p/v8/issues/detail?id=3056
			var test2 = {};
			for (var i = 0; i < 10; i++) {
				test2['_' + String.fromCharCode(i)] = i;
			}
			var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
				return test2[n];
			});
			if (order2.join('') !== '0123456789') {
				return false;
			}

			// https://bugs.chromium.org/p/v8/issues/detail?id=3056
			var test3 = {};
			'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
				test3[letter] = letter;
			});
			if (Object.keys(Object.assign({}, test3)).join('') !==
					'abcdefghijklmnopqrst') {
				return false;
			}

			return true;
		} catch (err) {
			// We don't expect any of the above to throw, but better to be safe.
			return false;
		}
	}

	module.exports = shouldUseNative() ? Object.assign : function (target, source) {
		var from;
		var to = toObject(target);
		var symbols;

		for (var s = 1; s < arguments.length; s++) {
			from = Object(arguments[s]);

			for (var key in from) {
				if (hasOwnProperty.call(from, key)) {
					to[key] = from[key];
				}
			}

			if (getOwnPropertySymbols) {
				symbols = getOwnPropertySymbols(from);
				for (var i = 0; i < symbols.length; i++) {
					if (propIsEnumerable.call(from, symbols[i])) {
						to[symbols[i]] = from[symbols[i]];
					}
				}
			}
		}

		return to;
	};


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 */

	'use strict';

	var printWarning = function() {};

	if (true) {
	  var ReactPropTypesSecret = __webpack_require__(5);
	  var loggedTypeFailures = {};

	  printWarning = function(text) {
	    var message = 'Warning: ' + text;
	    if (typeof console !== 'undefined') {
	      console.error(message);
	    }
	    try {
	      // --- Welcome to debugging React ---
	      // This error was thrown as a convenience so that you can use this stack
	      // to find the callsite that caused this warning to fire.
	      throw new Error(message);
	    } catch (x) {}
	  };
	}

	/**
	 * Assert that the values match with the type specs.
	 * Error messages are memorized and will only be shown once.
	 *
	 * @param {object} typeSpecs Map of name to a ReactPropType
	 * @param {object} values Runtime values that need to be type-checked
	 * @param {string} location e.g. "prop", "context", "child context"
	 * @param {string} componentName Name of the component for error messages.
	 * @param {?Function} getStack Returns the component stack.
	 * @private
	 */
	function checkPropTypes(typeSpecs, values, location, componentName, getStack) {
	  if (true) {
	    for (var typeSpecName in typeSpecs) {
	      if (typeSpecs.hasOwnProperty(typeSpecName)) {
	        var error;
	        // Prop type validation may throw. In case they do, we don't want to
	        // fail the render phase where it didn't fail before. So we log it.
	        // After these have been cleaned up, we'll let them throw.
	        try {
	          // This is intentionally an invariant that gets caught. It's the same
	          // behavior as without this statement except with a better message.
	          if (typeof typeSpecs[typeSpecName] !== 'function') {
	            var err = Error(
	              (componentName || 'React class') + ': ' + location + ' type `' + typeSpecName + '` is invalid; ' +
	              'it must be a function, usually from the `prop-types` package, but received `' + typeof typeSpecs[typeSpecName] + '`.'
	            );
	            err.name = 'Invariant Violation';
	            throw err;
	          }
	          error = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, ReactPropTypesSecret);
	        } catch (ex) {
	          error = ex;
	        }
	        if (error && !(error instanceof Error)) {
	          printWarning(
	            (componentName || 'React class') + ': type specification of ' +
	            location + ' `' + typeSpecName + '` is invalid; the type checker ' +
	            'function must return `null` or an `Error` but returned a ' + typeof error + '. ' +
	            'You may have forgotten to pass an argument to the type checker ' +
	            'creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and ' +
	            'shape all require an argument).'
	          )

	        }
	        if (error instanceof Error && !(error.message in loggedTypeFailures)) {
	          // Only monitor this failure once because there tends to be a lot of the
	          // same error.
	          loggedTypeFailures[error.message] = true;

	          var stack = getStack ? getStack() : '';

	          printWarning(
	            'Failed ' + location + ' type: ' + error.message + (stack != null ? stack : '')
	          );
	        }
	      }
	    }
	  }
	}

	module.exports = checkPropTypes;


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 */

	'use strict';

	var assign = __webpack_require__(14);

	var ReactPropTypesSecret = __webpack_require__(5);
	var checkPropTypes = __webpack_require__(15);

	var printWarning = function() {};

	if (true) {
	  printWarning = function(text) {
	    var message = 'Warning: ' + text;
	    if (typeof console !== 'undefined') {
	      console.error(message);
	    }
	    try {
	      // --- Welcome to debugging React ---
	      // This error was thrown as a convenience so that you can use this stack
	      // to find the callsite that caused this warning to fire.
	      throw new Error(message);
	    } catch (x) {}
	  };
	}

	function emptyFunctionThatReturnsNull() {
	  return null;
	}

	module.exports = function(isValidElement, throwOnDirectAccess) {
	  /* global Symbol */
	  var ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;
	  var FAUX_ITERATOR_SYMBOL = '@@iterator'; // Before Symbol spec.

	  /**
	   * Returns the iterator method function contained on the iterable object.
	   *
	   * Be sure to invoke the function with the iterable as context:
	   *
	   *     var iteratorFn = getIteratorFn(myIterable);
	   *     if (iteratorFn) {
	   *       var iterator = iteratorFn.call(myIterable);
	   *       ...
	   *     }
	   *
	   * @param {?object} maybeIterable
	   * @return {?function}
	   */
	  function getIteratorFn(maybeIterable) {
	    var iteratorFn = maybeIterable && (ITERATOR_SYMBOL && maybeIterable[ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL]);
	    if (typeof iteratorFn === 'function') {
	      return iteratorFn;
	    }
	  }

	  /**
	   * Collection of methods that allow declaration and validation of props that are
	   * supplied to React components. Example usage:
	   *
	   *   var Props = require('ReactPropTypes');
	   *   var MyArticle = React.createClass({
	   *     propTypes: {
	   *       // An optional string prop named "description".
	   *       description: Props.string,
	   *
	   *       // A required enum prop named "category".
	   *       category: Props.oneOf(['News','Photos']).isRequired,
	   *
	   *       // A prop named "dialog" that requires an instance of Dialog.
	   *       dialog: Props.instanceOf(Dialog).isRequired
	   *     },
	   *     render: function() { ... }
	   *   });
	   *
	   * A more formal specification of how these methods are used:
	   *
	   *   type := array|bool|func|object|number|string|oneOf([...])|instanceOf(...)
	   *   decl := ReactPropTypes.{type}(.isRequired)?
	   *
	   * Each and every declaration produces a function with the same signature. This
	   * allows the creation of custom validation functions. For example:
	   *
	   *  var MyLink = React.createClass({
	   *    propTypes: {
	   *      // An optional string or URI prop named "href".
	   *      href: function(props, propName, componentName) {
	   *        var propValue = props[propName];
	   *        if (propValue != null && typeof propValue !== 'string' &&
	   *            !(propValue instanceof URI)) {
	   *          return new Error(
	   *            'Expected a string or an URI for ' + propName + ' in ' +
	   *            componentName
	   *          );
	   *        }
	   *      }
	   *    },
	   *    render: function() {...}
	   *  });
	   *
	   * @internal
	   */

	  var ANONYMOUS = '<<anonymous>>';

	  // Important!
	  // Keep this list in sync with production version in `./factoryWithThrowingShims.js`.
	  var ReactPropTypes = {
	    array: createPrimitiveTypeChecker('array'),
	    bool: createPrimitiveTypeChecker('boolean'),
	    func: createPrimitiveTypeChecker('function'),
	    number: createPrimitiveTypeChecker('number'),
	    object: createPrimitiveTypeChecker('object'),
	    string: createPrimitiveTypeChecker('string'),
	    symbol: createPrimitiveTypeChecker('symbol'),

	    any: createAnyTypeChecker(),
	    arrayOf: createArrayOfTypeChecker,
	    element: createElementTypeChecker(),
	    instanceOf: createInstanceTypeChecker,
	    node: createNodeChecker(),
	    objectOf: createObjectOfTypeChecker,
	    oneOf: createEnumTypeChecker,
	    oneOfType: createUnionTypeChecker,
	    shape: createShapeTypeChecker,
	    exact: createStrictShapeTypeChecker,
	  };

	  /**
	   * inlined Object.is polyfill to avoid requiring consumers ship their own
	   * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
	   */
	  /*eslint-disable no-self-compare*/
	  function is(x, y) {
	    // SameValue algorithm
	    if (x === y) {
	      // Steps 1-5, 7-10
	      // Steps 6.b-6.e: +0 != -0
	      return x !== 0 || 1 / x === 1 / y;
	    } else {
	      // Step 6.a: NaN == NaN
	      return x !== x && y !== y;
	    }
	  }
	  /*eslint-enable no-self-compare*/

	  /**
	   * We use an Error-like object for backward compatibility as people may call
	   * PropTypes directly and inspect their output. However, we don't use real
	   * Errors anymore. We don't inspect their stack anyway, and creating them
	   * is prohibitively expensive if they are created too often, such as what
	   * happens in oneOfType() for any type before the one that matched.
	   */
	  function PropTypeError(message) {
	    this.message = message;
	    this.stack = '';
	  }
	  // Make `instanceof Error` still work for returned errors.
	  PropTypeError.prototype = Error.prototype;

	  function createChainableTypeChecker(validate) {
	    if (true) {
	      var manualPropTypeCallCache = {};
	      var manualPropTypeWarningCount = 0;
	    }
	    function checkType(isRequired, props, propName, componentName, location, propFullName, secret) {
	      componentName = componentName || ANONYMOUS;
	      propFullName = propFullName || propName;

	      if (secret !== ReactPropTypesSecret) {
	        if (throwOnDirectAccess) {
	          // New behavior only for users of `prop-types` package
	          var err = new Error(
	            'Calling PropTypes validators directly is not supported by the `prop-types` package. ' +
	            'Use `PropTypes.checkPropTypes()` to call them. ' +
	            'Read more at http://fb.me/use-check-prop-types'
	          );
	          err.name = 'Invariant Violation';
	          throw err;
	        } else if (("development") !== 'production' && typeof console !== 'undefined') {
	          // Old behavior for people using React.PropTypes
	          var cacheKey = componentName + ':' + propName;
	          if (
	            !manualPropTypeCallCache[cacheKey] &&
	            // Avoid spamming the console because they are often not actionable except for lib authors
	            manualPropTypeWarningCount < 3
	          ) {
	            printWarning(
	              'You are manually calling a React.PropTypes validation ' +
	              'function for the `' + propFullName + '` prop on `' + componentName  + '`. This is deprecated ' +
	              'and will throw in the standalone `prop-types` package. ' +
	              'You may be seeing this warning due to a third-party PropTypes ' +
	              'library. See https://fb.me/react-warning-dont-call-proptypes ' + 'for details.'
	            );
	            manualPropTypeCallCache[cacheKey] = true;
	            manualPropTypeWarningCount++;
	          }
	        }
	      }
	      if (props[propName] == null) {
	        if (isRequired) {
	          if (props[propName] === null) {
	            return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required ' + ('in `' + componentName + '`, but its value is `null`.'));
	          }
	          return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required in ' + ('`' + componentName + '`, but its value is `undefined`.'));
	        }
	        return null;
	      } else {
	        return validate(props, propName, componentName, location, propFullName);
	      }
	    }

	    var chainedCheckType = checkType.bind(null, false);
	    chainedCheckType.isRequired = checkType.bind(null, true);

	    return chainedCheckType;
	  }

	  function createPrimitiveTypeChecker(expectedType) {
	    function validate(props, propName, componentName, location, propFullName, secret) {
	      var propValue = props[propName];
	      var propType = getPropType(propValue);
	      if (propType !== expectedType) {
	        // `propValue` being instance of, say, date/regexp, pass the 'object'
	        // check, but we can offer a more precise error message here rather than
	        // 'of type `object`'.
	        var preciseType = getPreciseType(propValue);

	        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + preciseType + '` supplied to `' + componentName + '`, expected ') + ('`' + expectedType + '`.'));
	      }
	      return null;
	    }
	    return createChainableTypeChecker(validate);
	  }

	  function createAnyTypeChecker() {
	    return createChainableTypeChecker(emptyFunctionThatReturnsNull);
	  }

	  function createArrayOfTypeChecker(typeChecker) {
	    function validate(props, propName, componentName, location, propFullName) {
	      if (typeof typeChecker !== 'function') {
	        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside arrayOf.');
	      }
	      var propValue = props[propName];
	      if (!Array.isArray(propValue)) {
	        var propType = getPropType(propValue);
	        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an array.'));
	      }
	      for (var i = 0; i < propValue.length; i++) {
	        var error = typeChecker(propValue, i, componentName, location, propFullName + '[' + i + ']', ReactPropTypesSecret);
	        if (error instanceof Error) {
	          return error;
	        }
	      }
	      return null;
	    }
	    return createChainableTypeChecker(validate);
	  }

	  function createElementTypeChecker() {
	    function validate(props, propName, componentName, location, propFullName) {
	      var propValue = props[propName];
	      if (!isValidElement(propValue)) {
	        var propType = getPropType(propValue);
	        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected a single ReactElement.'));
	      }
	      return null;
	    }
	    return createChainableTypeChecker(validate);
	  }

	  function createInstanceTypeChecker(expectedClass) {
	    function validate(props, propName, componentName, location, propFullName) {
	      if (!(props[propName] instanceof expectedClass)) {
	        var expectedClassName = expectedClass.name || ANONYMOUS;
	        var actualClassName = getClassName(props[propName]);
	        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + actualClassName + '` supplied to `' + componentName + '`, expected ') + ('instance of `' + expectedClassName + '`.'));
	      }
	      return null;
	    }
	    return createChainableTypeChecker(validate);
	  }

	  function createEnumTypeChecker(expectedValues) {
	    if (!Array.isArray(expectedValues)) {
	       true ? printWarning('Invalid argument supplied to oneOf, expected an instance of array.') : void 0;
	      return emptyFunctionThatReturnsNull;
	    }

	    function validate(props, propName, componentName, location, propFullName) {
	      var propValue = props[propName];
	      for (var i = 0; i < expectedValues.length; i++) {
	        if (is(propValue, expectedValues[i])) {
	          return null;
	        }
	      }

	      var valuesString = JSON.stringify(expectedValues);
	      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of value `' + propValue + '` ' + ('supplied to `' + componentName + '`, expected one of ' + valuesString + '.'));
	    }
	    return createChainableTypeChecker(validate);
	  }

	  function createObjectOfTypeChecker(typeChecker) {
	    function validate(props, propName, componentName, location, propFullName) {
	      if (typeof typeChecker !== 'function') {
	        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside objectOf.');
	      }
	      var propValue = props[propName];
	      var propType = getPropType(propValue);
	      if (propType !== 'object') {
	        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an object.'));
	      }
	      for (var key in propValue) {
	        if (propValue.hasOwnProperty(key)) {
	          var error = typeChecker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
	          if (error instanceof Error) {
	            return error;
	          }
	        }
	      }
	      return null;
	    }
	    return createChainableTypeChecker(validate);
	  }

	  function createUnionTypeChecker(arrayOfTypeCheckers) {
	    if (!Array.isArray(arrayOfTypeCheckers)) {
	       true ? printWarning('Invalid argument supplied to oneOfType, expected an instance of array.') : void 0;
	      return emptyFunctionThatReturnsNull;
	    }

	    for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
	      var checker = arrayOfTypeCheckers[i];
	      if (typeof checker !== 'function') {
	        printWarning(
	          'Invalid argument supplied to oneOfType. Expected an array of check functions, but ' +
	          'received ' + getPostfixForTypeWarning(checker) + ' at index ' + i + '.'
	        );
	        return emptyFunctionThatReturnsNull;
	      }
	    }

	    function validate(props, propName, componentName, location, propFullName) {
	      for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
	        var checker = arrayOfTypeCheckers[i];
	        if (checker(props, propName, componentName, location, propFullName, ReactPropTypesSecret) == null) {
	          return null;
	        }
	      }

	      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`.'));
	    }
	    return createChainableTypeChecker(validate);
	  }

	  function createNodeChecker() {
	    function validate(props, propName, componentName, location, propFullName) {
	      if (!isNode(props[propName])) {
	        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`, expected a ReactNode.'));
	      }
	      return null;
	    }
	    return createChainableTypeChecker(validate);
	  }

	  function createShapeTypeChecker(shapeTypes) {
	    function validate(props, propName, componentName, location, propFullName) {
	      var propValue = props[propName];
	      var propType = getPropType(propValue);
	      if (propType !== 'object') {
	        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
	      }
	      for (var key in shapeTypes) {
	        var checker = shapeTypes[key];
	        if (!checker) {
	          continue;
	        }
	        var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
	        if (error) {
	          return error;
	        }
	      }
	      return null;
	    }
	    return createChainableTypeChecker(validate);
	  }

	  function createStrictShapeTypeChecker(shapeTypes) {
	    function validate(props, propName, componentName, location, propFullName) {
	      var propValue = props[propName];
	      var propType = getPropType(propValue);
	      if (propType !== 'object') {
	        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
	      }
	      // We need to check all keys in case some are required but missing from
	      // props.
	      var allKeys = assign({}, props[propName], shapeTypes);
	      for (var key in allKeys) {
	        var checker = shapeTypes[key];
	        if (!checker) {
	          return new PropTypeError(
	            'Invalid ' + location + ' `' + propFullName + '` key `' + key + '` supplied to `' + componentName + '`.' +
	            '\nBad object: ' + JSON.stringify(props[propName], null, '  ') +
	            '\nValid keys: ' +  JSON.stringify(Object.keys(shapeTypes), null, '  ')
	          );
	        }
	        var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
	        if (error) {
	          return error;
	        }
	      }
	      return null;
	    }

	    return createChainableTypeChecker(validate);
	  }

	  function isNode(propValue) {
	    switch (typeof propValue) {
	      case 'number':
	      case 'string':
	      case 'undefined':
	        return true;
	      case 'boolean':
	        return !propValue;
	      case 'object':
	        if (Array.isArray(propValue)) {
	          return propValue.every(isNode);
	        }
	        if (propValue === null || isValidElement(propValue)) {
	          return true;
	        }

	        var iteratorFn = getIteratorFn(propValue);
	        if (iteratorFn) {
	          var iterator = iteratorFn.call(propValue);
	          var step;
	          if (iteratorFn !== propValue.entries) {
	            while (!(step = iterator.next()).done) {
	              if (!isNode(step.value)) {
	                return false;
	              }
	            }
	          } else {
	            // Iterator will provide entry [k,v] tuples rather than values.
	            while (!(step = iterator.next()).done) {
	              var entry = step.value;
	              if (entry) {
	                if (!isNode(entry[1])) {
	                  return false;
	                }
	              }
	            }
	          }
	        } else {
	          return false;
	        }

	        return true;
	      default:
	        return false;
	    }
	  }

	  function isSymbol(propType, propValue) {
	    // Native Symbol.
	    if (propType === 'symbol') {
	      return true;
	    }

	    // 19.4.3.5 Symbol.prototype[@@toStringTag] === 'Symbol'
	    if (propValue['@@toStringTag'] === 'Symbol') {
	      return true;
	    }

	    // Fallback for non-spec compliant Symbols which are polyfilled.
	    if (typeof Symbol === 'function' && propValue instanceof Symbol) {
	      return true;
	    }

	    return false;
	  }

	  // Equivalent of `typeof` but with special handling for array and regexp.
	  function getPropType(propValue) {
	    var propType = typeof propValue;
	    if (Array.isArray(propValue)) {
	      return 'array';
	    }
	    if (propValue instanceof RegExp) {
	      // Old webkits (at least until Android 4.0) return 'function' rather than
	      // 'object' for typeof a RegExp. We'll normalize this here so that /bla/
	      // passes PropTypes.object.
	      return 'object';
	    }
	    if (isSymbol(propType, propValue)) {
	      return 'symbol';
	    }
	    return propType;
	  }

	  // This handles more types than `getPropType`. Only used for error messages.
	  // See `createPrimitiveTypeChecker`.
	  function getPreciseType(propValue) {
	    if (typeof propValue === 'undefined' || propValue === null) {
	      return '' + propValue;
	    }
	    var propType = getPropType(propValue);
	    if (propType === 'object') {
	      if (propValue instanceof Date) {
	        return 'date';
	      } else if (propValue instanceof RegExp) {
	        return 'regexp';
	      }
	    }
	    return propType;
	  }

	  // Returns a string that is postfixed to a warning about an invalid type.
	  // For example, "undefined" or "of type array"
	  function getPostfixForTypeWarning(value) {
	    var type = getPreciseType(value);
	    switch (type) {
	      case 'array':
	      case 'object':
	        return 'an ' + type;
	      case 'boolean':
	      case 'date':
	      case 'regexp':
	        return 'a ' + type;
	      default:
	        return type;
	    }
	  }

	  // Returns class name of the object, if any.
	  function getClassName(propValue) {
	    if (!propValue.constructor || !propValue.constructor.name) {
	      return ANONYMOUS;
	    }
	    return propValue.constructor.name;
	  }

	  ReactPropTypes.checkPropTypes = checkPropTypes;
	  ReactPropTypes.PropTypes = ReactPropTypes;

	  return ReactPropTypes;
	};


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 */

	if (true) {
	  var REACT_ELEMENT_TYPE = (typeof Symbol === 'function' &&
	    Symbol.for &&
	    Symbol.for('react.element')) ||
	    0xeac7;

	  var isValidElement = function(object) {
	    return typeof object === 'object' &&
	      object !== null &&
	      object.$$typeof === REACT_ELEMENT_TYPE;
	  };

	  // By explicitly using `prop-types` you are opting into new development behavior.
	  // http://fb.me/prop-types-in-prod
	  var throwOnDirectAccess = true;
	  module.exports = __webpack_require__(16)(isValidElement, throwOnDirectAccess);
	} else {
	  // By explicitly using `prop-types` you are opting into new production behavior.
	  // http://fb.me/prop-types-in-prod
	  module.exports = require('./factoryWithThrowingShims')();
	}


/***/ }),
/* 18 */
/***/ (function(module, exports) {

	"use strict";

	exports.__esModule = true;
	exports["default"] = shallowEqual;
	function shallowEqual(objA, objB) {
	  if (objA === objB) {
	    return true;
	  }

	  var keysA = Object.keys(objA);
	  var keysB = Object.keys(objB);

	  if (keysA.length !== keysB.length) {
	    return false;
	  }

	  // Test for A's keys different from B.
	  var hasOwn = Object.prototype.hasOwnProperty;
	  for (var i = 0; i < keysA.length; i++) {
	    if (!hasOwn.call(objB, keysA[i]) || objA[keysA[i]] !== objB[keysA[i]]) {
	      return false;
	    }
	  }

	  return true;
	}

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	exports["default"] = wrapActionCreators;

	var _redux = __webpack_require__(3);

	function wrapActionCreators(actionCreators) {
	  return function (dispatch) {
	    return (0, _redux.bindActionCreators)(actionCreators, dispatch);
	  };
	}

/***/ }),
/* 20 */
/***/ (function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_20__;

/***/ })
/******/ ])
});
;