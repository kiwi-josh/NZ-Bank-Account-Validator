(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("NZ-Bank-Account-Validator", [], factory);
	else if(typeof exports === 'object')
		exports["NZ-Bank-Account-Validator"] = factory();
	else
		root["NZ-Bank-Account-Validator"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	var _constants = __webpack_require__(1);
	
	var _utils = __webpack_require__(2);
	
	exports.default = {
	  getId: function getId(input) {
	    return this.getPartsObject(input).id;
	  },
	  getBranch: function getBranch(input) {
	    return this.getPartsObject(input).branch;
	  },
	  getBase: function getBase(input) {
	    return this.getPartsObject(input).base;
	  },
	  getSuffix: function getSuffix(input) {
	    return this.getPartsObject(input).suffix;
	  },
	  isPartsObject: function isPartsObject() {
	    var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	
	    if ((typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) !== 'object') return false;
	    var inputsKeys = Object.keys(obj);
	    var requiredKeys = Object.keys(_constants.partConstants);
	    var filteredKeys = requiredKeys.filter(function (k) {
	      return inputsKeys.includes(k);
	    });
	
	    return requiredKeys.length === filteredKeys.length;
	  },
	  splitString: function splitString() {
	    var str = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
	
	    var parts = (0, _utils.isString)(str) ? str.split(/[^0-9]/) : [];
	
	    // If the input string had no delimiters, and its length is
	    // long enough, manually forge an array.
	    if (parts.length === 1) {
	      parts[0] = str.slice(0, 2);
	      parts[1] = str.slice(2, 5);
	      parts[2] = str.slice(5, 12);
	      parts[3] = str.slice(12);
	    }
	
	    return parts.filter(function (i) {
	      return i.length;
	    });
	  },
	  getPartsObject: function getPartsObject(input) {
	    if (this.isPartsObject(input)) {
	      return input;
	    }
	
	    if (!(0, _utils.isString)(input)) {
	      return {};
	    }
	
	    var parts = this.splitString(input);
	
	    return {
	      id: parts[_constants.partIndexes.id],
	      branch: parts[_constants.partIndexes.branch],
	      base: parts[_constants.partIndexes.base],
	      suffix: parts[_constants.partIndexes.suffix]
	    };
	  },
	  partsObjectValid: function partsObjectValid() {
	    var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	
	    var keys = Object.keys(obj);
	
	    if (keys.length !== 4) {
	      return false;
	    }
	
	    return keys.reduce(function (isValid, key) {
	      var value = obj[key];
	      var onlyNumbers = (0, _utils.isNumbersOnly)(value);
	      var withinMaxLength = (0, _utils.isString)(value) && value.length <= _constants.partMaxLengths[key];
	      var valueValid = onlyNumbers && withinMaxLength;
	
	      return isValid && valueValid;
	    }, true);
	  },
	  validate: function validate(input) {
	    var partsObject = this.getPartsObject(input);
	
	    if (!this.partsObjectValid(partsObject)) {
	      return false;
	    }
	
	    var id = partsObject.id,
	        branch = partsObject.branch,
	        base = partsObject.base;
	
	    // VALIDATION - STEP 1
	    /*
	      https://web.archive.org/web/20181009211542/https://www.ird.govt.nz/resources/9/d/9d739cde-ad76-4c49-ae08
	      -522c62d94dd6/rwt-nrwt-spec-2016.pdf (PAGE 10)
	    */
	
	    var bankData = this.getBankData(id, branch);
	
	    if (!bankData) {
	      return false;
	    }
	
	    var algorithm = this.getChecksum(bankData, base);
	    // console.info("algorithm",algorithm)
	    // console.info("bankData",bankData)
	
	    if (!algorithm) {
	      return false;
	    }
	
	    // VALIDATION - STEP 2
	    /*
	      https://web.archive.org/web/20181009211542/https://www.ird.govt.nz/resources/9/d/9d739cde-ad76-4c49-ae08
	      -522c62d94dd6/rwt-nrwt-spec-2016.pdf (PAGE 11)
	    */
	
	    var weighting = algorithm.weighting,
	        modulo = algorithm.modulo,
	        specialCase = algorithm.specialCase;
	
	    var earlyExit = !specialCase;
	
	    var result = (0, _utils.getPaddedAccountArray)(partsObject).reduce(function (result, num, idx) {
	      var multiplied = num * weighting[idx];
	
	      if (earlyExit || multiplied < 10) {
	        return result + multiplied;
	      }
	
	      var summed = (0, _utils.sumChars)(multiplied);
	      var summedTwice = (0, _utils.sumChars)(summed);
	      var final = summed < 10 ? summed : summedTwice;
	
	      return result + final;
	    }, 0);
	
	    // Final modulo test
	    return result % modulo === 0;
	  },
	  getBankData: function getBankData(id, branch) {
	    var paddedId = (0, _utils.padLeft)(id, _constants.partMaxLengths.id);
	
	    return _constants.bankData.find(function (r) {
	      var ranges = r.branches[paddedId];
	
	      return ranges && (0, _utils.inRanges)(branch, ranges);
	    });
	  },
	  getChecksum: function getChecksum(bankData, base) {
	    var key = bankData.key;
	
	
	    if (key === 'AB') {
	      key = parseInt(base, 10) < 990000 ? 'A' : 'B';
	    }
	
	    return _constants.bankChecksums[key];
	  }
	};
	module.exports = exports['default'];

/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _partIndexes, _partMaxLengths;
	
	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
	
	/*eslint-disable */
	
	var partConstants = {
	  id: 'id',
	  branch: 'branch',
	  base: 'base',
	  suffix: 'suffix'
	};
	
	var partIndexes = (_partIndexes = {}, _defineProperty(_partIndexes, partConstants.id, 0), _defineProperty(_partIndexes, partConstants.branch, 1), _defineProperty(_partIndexes, partConstants.base, 2), _defineProperty(_partIndexes, partConstants.suffix, 3), _partIndexes);
	
	var partMaxLengths = (_partMaxLengths = {}, _defineProperty(_partMaxLengths, partConstants.id, 2), _defineProperty(_partMaxLengths, partConstants.branch, 4), _defineProperty(_partMaxLengths, partConstants.base, 8), _defineProperty(_partMaxLengths, partConstants.suffix, 4), _partMaxLengths);
	
	var bankData = [{
	  key: 'AB',
	  branches: {
	
	    '01': [[1, 999], [1100, 1199], [1800, 1899]],
	
	    '02': [[1, 999], [1200, 1299]],
	
	    '03': [[1, 999], [1300, 1399], [1500, 1599], [1700, 1799], [1900, 1999], [7350, 7399]],
	
	    '04': [[2020, 2024]],
	
	    '06': [[1, 999], [1400, 1499]],
	
	    '11': [[5000, 6499], [6600, 8999]],
	
	    '12': [[3000, 3299], [3400, 3499], [3600, 3699]],
	
	    '13': [[4900, 4999]],
	
	    '14': [[4700, 4799]],
	
	    '15': [[3900, 3999]],
	
	    '16': [[4400, 4499]],
	
	    '17': [[3300, 3399]],
	
	    '18': [[3500, 3599]],
	
	    '19': [[4600, 4649]],
	
	    '20': [[4100, 4199]],
	
	    '21': [[4800, 4899]],
	
	    '22': [[4000, 4049]],
	
	    '23': [[3700, 3799]],
	
	    '24': [[4300, 4349]],
	
	    '27': [[3800, 3849]],
	
	    '30': [[2900, 2949]],
	
	    '35': [[2400, 2499]],
	
	    '38': [[9000, 9499]]
	  }
	}, {
	  key: 'D',
	  branches: {
	    '08': [[6500, 6599]]
	  }
	}, {
	  key: 'E',
	  branches: {
	    '09': [[0, 0]]
	  }
	}, {
	  key: 'F',
	  branches: {
	    '25': [[2500, 2599]],
	
	    '33': [[6700, 6799]]
	  }
	}, {
	  key: 'G',
	  branches: {
	    '26': [[2600, 2699]],
	
	    '28': [[2100, 2149]],
	
	    '29': [[2150, 2299]]
	  }
	}, {
	  key: 'X',
	  branches: {
	    '31': [[2800, 2849]]
	  }
	}];
	
	var bankChecksums = {
	  A: {
	    weighting: [0, 0, 6, 3, 7, 9, 0, 0, 10, 5, 8, 4, 2, 1, 0, 0, 0, 0],
	    modulo: 11
	  },
	
	  B: {
	    weighting: [0, 0, 0, 0, 0, 0, 0, 0, 10, 5, 8, 4, 2, 1, 0, 0, 0, 0],
	    modulo: 11
	  },
	
	  C: {
	    weighting: [3, 7, 0, 0, 0, 0, 9, 1, 10, 5, 3, 4, 2, 1, 0, 0, 0, 0],
	    modulo: 11
	  },
	
	  D: {
	    weighting: [0, 0, 0, 0, 0, 0, 0, 7, 6, 5, 4, 3, 2, 1, 0, 0, 0, 0],
	    modulo: 11
	  },
	
	  E: {
	    weighting: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 4, 3, 2, 0, 0, 0, 1],
	    modulo: 11,
	    specialCase: true
	  },
	
	  F: {
	    weighting: [0, 0, 0, 0, 0, 0, 0, 1, 7, 3, 1, 7, 3, 1, 0, 0, 0, 0],
	    modulo: 10
	  },
	
	  G: {
	    weighting: [0, 0, 0, 0, 0, 0, 0, 1, 3, 7, 1, 3, 7, 1, 0, 3, 7, 1],
	    modulo: 10,
	    specialCase: true
	  },
	
	  X: {
	    weighting: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	    modulo: 1
	  }
	};
	
	/*eslint-enable */
	
	exports.default = {
	  partConstants: partConstants,
	  partIndexes: partIndexes,
	  partMaxLengths: partMaxLengths,
	  bankData: bankData,
	  bankChecksums: bankChecksums
	};
	module.exports = exports['default'];

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();
	
	var _constants = __webpack_require__(1);
	
	var isString = function isString(x) {
	  return x === x + '';
	};
	
	var isNumbersOnly = function isNumbersOnly(x) {
	  return (/^[0-9]+$/.test(x)
	  );
	};
	
	var padLeft = function padLeft(input, length) {
	  var token = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '0';
	  return Array(length - String(input).length + 1).join(token) + input;
	};
	
	var inRange = function inRange(start, value, end) {
	  return value >= start && value <= end;
	};
	
	var inRanges = function inRanges(value) {
	  var ranges = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
	
	  return ranges.reduce(function (bool, range) {
	    var _range = _slicedToArray(range, 2),
	        start = _range[0],
	        end = _range[1];
	
	    return bool || inRange(start, value, end);
	  }, false);
	};
	
	var sumChars = function sumChars(int) {
	  return (int + '').split('').reduce(function (acc, num) {
	    return acc + num * 1;
	  }, 0);
	};
	
	var getPaddedAccountArray = function getPaddedAccountArray(partsObj) {
	  return Object.keys(partsObj).reduce(function (a, k) {
	    var paddedValue = padLeft(partsObj[k], _constants.partMaxLengths[k]);
	    var splitValues = paddedValue.split('');
	
	    return a.concat(splitValues);
	  }, []);
	};
	
	exports.default = {
	  isString: isString,
	  isNumbersOnly: isNumbersOnly,
	  padLeft: padLeft,
	  inRange: inRange,
	  inRanges: inRanges,
	  sumChars: sumChars,
	  getPaddedAccountArray: getPaddedAccountArray
	};
	module.exports = exports['default'];

/***/ }
/******/ ])
});
;
//# sourceMappingURL=NZ-Bank-Account-Validator.js.map