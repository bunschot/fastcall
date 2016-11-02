'use strict';

var _marked = [enumScoped].map(regeneratorRuntime.mark);

var _ = require('lodash');
var verify = require('./verify');
var assert = require('assert');
var Promise = require('bluebird');

module.exports = scope;

function scope(body) {
    assert(_.isFunction(body), 'Body should be a function.');
    begin();
    try {
        var result = body(scope);
        if (result) {
            if (_.isFunction(result.then)) {
                return result.then(function (asyncResult) {
                    escape(asyncResult, true);
                    end();
                    return asyncResult;
                }, function (asyncError) {
                    end();
                    throw asyncError;
                });
            }
            escape(result, true);
        }
        end();
        return result;
    } catch (err) {
        end();
        throw err;
    }
}

scope._add = function (scoped) {
    add(scoped);
};

scope.async = function (body) {
    assert(_.isFunction(body), 'Body should be a function.');
    return scope(Promise.coroutine(body));
};

scope.escape = function (value) {
    return escape(value);
};

var layers = [];

function begin() {
    layers.push(new Set());
}

function end() {
    var last = layers.pop();
    if (last) {
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
            for (var _iterator = last.values()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                var scoped = _step.value;

                scoped._dispose();
            }
        } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion && _iterator.return) {
                    _iterator.return();
                }
            } finally {
                if (_didIteratorError) {
                    throw _iteratorError;
                }
            }
        }
    }
}

function add(scoped, layer) {
    if (verify.enabled) {
        var Scoped = scope.Scoped;
        verify(scoped instanceof Scoped);
    }
    var currentLayer = layer || (layers.length ? layers[layers.length - 1] : null);
    if (currentLayer) {
        currentLayer.add(scoped);
    }
}

function escape(result, propagate) {
    var currentLayer = null;
    var prevLayer = null;
    if (layers.length > 1) {
        currentLayer = layers[layers.length - 1];
        if (propagate) {
            prevLayer = layers[layers.length - 2];
        }
    } else if (layers.length) {
        currentLayer = layers[layers.length - 1];
    }

    if (currentLayer) {
        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
            for (var _iterator2 = enumScoped(result)[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                var scoped = _step2.value;

                currentLayer.delete(scoped);
                if (prevLayer) {
                    prevLayer.add(scoped);
                }
            }
        } catch (err) {
            _didIteratorError2 = true;
            _iteratorError2 = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion2 && _iterator2.return) {
                    _iterator2.return();
                }
            } finally {
                if (_didIteratorError2) {
                    throw _iteratorError2;
                }
            }
        }
    }
}

function enumScoped(result) {
    var Scoped, _iteratorNormalCompletion3, _didIteratorError3, _iteratorError3, _iterator3, _step3, item, _iteratorNormalCompletion4, _didIteratorError4, _iteratorError4, _iterator4, _step4, _item, key;

    return regeneratorRuntime.wrap(function enumScoped$(_context) {
        while (1) {
            switch (_context.prev = _context.next) {
                case 0:
                    Scoped = scope.Scoped;

                    if (!(result instanceof Scoped)) {
                        _context.next = 6;
                        break;
                    }

                    _context.next = 4;
                    return result;

                case 4:
                    _context.next = 70;
                    break;

                case 6:
                    if (!_.isArray(result)) {
                        _context.next = 34;
                        break;
                    }

                    _iteratorNormalCompletion3 = true;
                    _didIteratorError3 = false;
                    _iteratorError3 = undefined;
                    _context.prev = 10;
                    _iterator3 = result[Symbol.iterator]();

                case 12:
                    if (_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done) {
                        _context.next = 18;
                        break;
                    }

                    item = _step3.value;
                    return _context.delegateYield(enumScoped(item), 't0', 15);

                case 15:
                    _iteratorNormalCompletion3 = true;
                    _context.next = 12;
                    break;

                case 18:
                    _context.next = 24;
                    break;

                case 20:
                    _context.prev = 20;
                    _context.t1 = _context['catch'](10);
                    _didIteratorError3 = true;
                    _iteratorError3 = _context.t1;

                case 24:
                    _context.prev = 24;
                    _context.prev = 25;

                    if (!_iteratorNormalCompletion3 && _iterator3.return) {
                        _iterator3.return();
                    }

                case 27:
                    _context.prev = 27;

                    if (!_didIteratorError3) {
                        _context.next = 30;
                        break;
                    }

                    throw _iteratorError3;

                case 30:
                    return _context.finish(27);

                case 31:
                    return _context.finish(24);

                case 32:
                    _context.next = 70;
                    break;

                case 34:
                    if (!(result instanceof Map || result instanceof Set)) {
                        _context.next = 62;
                        break;
                    }

                    _iteratorNormalCompletion4 = true;
                    _didIteratorError4 = false;
                    _iteratorError4 = undefined;
                    _context.prev = 38;
                    _iterator4 = result.values()[Symbol.iterator]();

                case 40:
                    if (_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done) {
                        _context.next = 46;
                        break;
                    }

                    _item = _step4.value;
                    return _context.delegateYield(enumScoped(_item), 't2', 43);

                case 43:
                    _iteratorNormalCompletion4 = true;
                    _context.next = 40;
                    break;

                case 46:
                    _context.next = 52;
                    break;

                case 48:
                    _context.prev = 48;
                    _context.t3 = _context['catch'](38);
                    _didIteratorError4 = true;
                    _iteratorError4 = _context.t3;

                case 52:
                    _context.prev = 52;
                    _context.prev = 53;

                    if (!_iteratorNormalCompletion4 && _iterator4.return) {
                        _iterator4.return();
                    }

                case 55:
                    _context.prev = 55;

                    if (!_didIteratorError4) {
                        _context.next = 58;
                        break;
                    }

                    throw _iteratorError4;

                case 58:
                    return _context.finish(55);

                case 59:
                    return _context.finish(52);

                case 60:
                    _context.next = 70;
                    break;

                case 62:
                    if (!_.isObject(result)) {
                        _context.next = 70;
                        break;
                    }

                    _context.t4 = regeneratorRuntime.keys(result);

                case 64:
                    if ((_context.t5 = _context.t4()).done) {
                        _context.next = 70;
                        break;
                    }

                    key = _context.t5.value;

                    if (!result.hasOwnProperty(key)) {
                        _context.next = 68;
                        break;
                    }

                    return _context.delegateYield(enumScoped(result[key]), 't6', 68);

                case 68:
                    _context.next = 64;
                    break;

                case 70:
                case 'end':
                    return _context.stop();
            }
        }
    }, _marked[0], this, [[10, 20, 24, 32], [25,, 27, 31], [38, 48, 52, 60], [53,, 55, 59]]);
}
//# sourceMappingURL=scope.js.map