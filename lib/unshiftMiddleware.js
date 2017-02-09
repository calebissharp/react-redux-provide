'use strict';

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _createKeyConcat = require('./createKeyConcat');

var _createKeyConcat2 = _interopRequireDefault(_createKeyConcat);

var unshiftMiddleware = _createKeyConcat2['default']('middleware', true);

exports['default'] = unshiftMiddleware;
module.exports = exports['default'];