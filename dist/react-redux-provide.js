(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("redux"), require("react"));
	else if(typeof define === 'function' && define.amd)
		define(["redux", "react"], factory);
	else if(typeof exports === 'object')
		exports["ReactReduxProvide"] = factory(require("redux"), require("react"));
	else
		root["ReactReduxProvide"] = factory(root["Redux"], root["React"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_3__, __WEBPACK_EXTERNAL_MODULE_15__) {
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

	var _provide = __webpack_require__(5);

	var _provide2 = _interopRequireDefault(_provide);

	var _createProviderStore = __webpack_require__(2);

	var _createProviderStore2 = _interopRequireDefault(_createProviderStore);

	var _createCombinedStore = __webpack_require__(4);

	var _createCombinedStore2 = _interopRequireDefault(_createCombinedStore);

	var _pushMiddleware = __webpack_require__(7);

	var _pushMiddleware2 = _interopRequireDefault(_pushMiddleware);

	var _unshiftMiddleware = __webpack_require__(9);

	var _unshiftMiddleware2 = _interopRequireDefault(_unshiftMiddleware);

	var _pushEnhancer = __webpack_require__(6);

	var _pushEnhancer2 = _interopRequireDefault(_pushEnhancer);

	var _unshiftEnhancer = __webpack_require__(8);

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

	var _react = __webpack_require__(15);

	var _react2 = _interopRequireDefault(_react);

	var _isPlainObject = __webpack_require__(11);

	var _isPlainObject2 = _interopRequireDefault(_isPlainObject);

	var _redux = __webpack_require__(3);

	var _reactReduxLibUtilsShallowEqual = __webpack_require__(13);

	var _reactReduxLibUtilsShallowEqual2 = _interopRequireDefault(_reactReduxLibUtilsShallowEqual);

	var _reactReduxLibUtilsWrapActionCreators = __webpack_require__(14);

	var _reactReduxLibUtilsWrapActionCreators2 = _interopRequireDefault(_reactReduxLibUtilsWrapActionCreators);

	var _createProviderStore = __webpack_require__(2);

	var _createProviderStore2 = _interopRequireDefault(_createProviderStore);

	var _createCombinedStore = __webpack_require__(4);

	var _createCombinedStore2 = _interopRequireDefault(_createCombinedStore);

	var _hoistNonReactStatics = __webpack_require__(10);

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
	  providedState: _react.PropTypes.object,
	  providers: _react.PropTypes.object,
	  combinedProviders: _react.PropTypes.oneOfType([_react.PropTypes.object, _react.PropTypes.arrayOf(_react.PropTypes.object)]),
	  combinedProviderStores: _react.PropTypes.object,
	  providerReady: _react.PropTypes.arrayOf(_react.PropTypes.func)
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
/* 6 */
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
/* 7 */
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
/* 8 */
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
/* 9 */
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
/* 10 */
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
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

	/*!
	 * is-plain-object <https://github.com/jonschlinkert/is-plain-object>
	 *
	 * Copyright (c) 2014-2017, Jon Schlinkert.
	 * Released under the MIT License.
	 */

	'use strict';

	var isObject = __webpack_require__(12);

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
/* 12 */
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
/* 13 */
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
/* 14 */
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
/* 15 */
/***/ (function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_15__;

/***/ })
/******/ ])
});
;