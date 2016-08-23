(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.Progress = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';
// For more information about browser field, check out the browser field at https://github.com/substack/browserify-handbook#browser-field.

module.exports = {
    // Create a <link> tag with optional data attributes
    createLink: function(href, attributes) {
        var head = document.head || document.getElementsByTagName('head')[0];
        var link = document.createElement('link');

        link.href = href;
        link.rel = 'stylesheet';

        for (var key in attributes) {
            if ( ! attributes.hasOwnProperty(key)) {
                continue;
            }
            var value = attributes[key];
            link.setAttribute('data-' + key, value);
        }

        head.appendChild(link);
    },
    // Create a <style> tag with optional data attributes
    createStyle: function(cssText, attributes) {
        var head = document.head || document.getElementsByTagName('head')[0],
            style = document.createElement('style');

        style.type = 'text/css';

        for (var key in attributes) {
            if ( ! attributes.hasOwnProperty(key)) {
                continue;
            }
            var value = attributes[key];
            style.setAttribute('data-' + key, value);
        }
        
        if (style.sheet) { // for jsdom and IE9+
            style.innerHTML = cssText;
            style.sheet.cssText = cssText;
            head.appendChild(style);
        } else if (style.styleSheet) { // for IE8 and below
            head.appendChild(style);
            style.styleSheet.cssText = cssText;
        } else { // for Chrome, Firefox, and Safari
            style.appendChild(document.createTextNode(cssText));
            head.appendChild(style);
        }
    }
};

},{}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.rgbToHex = rgbToHex;
exports.hexToRgb = hexToRgb;
function componentToHex(c) {
  var hex = c.toString(16);
  return hex.length === 1 ? '0' + hex : hex;
}

function rgbToHex(rgb) {
  var arr = rgb.match(/\((.*)\)/)[1].split(',');
  var r = +arr[0];
  var g = +arr[1];
  var b = +arr[2];
  return '#' + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

function hexToRgb(hex) {
  // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
  var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  var h = hex.replace(shorthandRegex, function (m, r, g, b) {
    return r + r + g + g + b + b;
  });

  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(h);
  return result ? [parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16)].join(',') : null;
}

},{}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

exports.default = extend;
/* eslint-disable no-param-reassign */

function extend(source) {
  for (var _len = arguments.length, list = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    list[_key - 1] = arguments[_key];
  }

  if (!list || !source || (typeof source === 'undefined' ? 'undefined' : _typeof(source)) !== 'object') {
    return {};
  }
  list.forEach(function (obj) {
    Object.keys(obj).forEach(function (key) {
      if (Object.prototype.toString.call(obj[key]) === '[object Object]') {
        source[key] = extend({}, source[key], obj[key]);
      } else {
        source[key] = obj[key];
      }
    });
  });
  return source;
}

},{}],4:[function(require,module,exports){
'use strict';

module.exports = require('./progress').default;

},{"./progress":6}],5:[function(require,module,exports){
var css = ".progress-wrapper {\n  left: 0;\n  right: 0;\n  z-index: 999;\n  height: 5px;\n}\n.progress-bar {\n  width: 0;\n  position: relative;\n  transition: all .3s;\n}\n.progress-main {\n  position: absolute;\n  left: 0;\n  right: 0;\n}\n.progress-bar,\n.progress-bar-inner {\n  display: block;\n  height: 2px;\n  -moz-transition: all .3s;\n  -o-transition: all .3s;\n}\n.progress-bar-inner {\n  position: absolute;\n  top: 1px;\n  right: 0;\n  width: 100px;\n  transition: all .3s;\n}\n.progress-circle {\n  position: absolute;\n  top: 20px;\n  right: 20px;\n  width: 15px;\n  height: 15px;\n  border: 2px solid transparent;\n  border-radius: 50%;\n  -webkit-animation: spin .4s linear infinite;\n  -moz-animation: spin .4s linear infinite;\n  -o-animation: spin .4s linear infinite;\n  animation: spin .4s linear infinite;\n  -moz-transition: border .3s;\n  -o-transition: border .3s;\n  transition: border .3s;\n}\n@-webkit-keyframes spin {\n  0% {\n    -webkit-transform: rotate(0);\n    transform: rotate(0);\n  }\n\n  100% {\n    -webkit-transform: rotate(360deg);\n    transform: rotate(360deg);\n  }\n}\n@-moz-keyframes spin {\n  0% {\n    -moz-transform: rotate(0);\n    transform: rotate(0);\n  }\n\n  100% {\n    -moz-transform: rotate(360deg);\n    transform: rotate(360deg);\n  }\n}\n@-o-keyframes spin {\n  0% {\n    -o-transform: rotate(0);\n    transform: rotate(0);\n  }\n\n  100% {\n    -o-transform: rotate(360deg);\n    transform: rotate(360deg);\n  }\n}\n@keyframes spin {\n  0% {\n    -webkit-transform: rotate(0);\n    -moz-transform: rotate(0);\n    -o-transform: rotate(0);\n    transform: rotate(0);\n  }\n\n  100% {\n    -webkit-transform: rotate(360deg);\n    -moz-transform: rotate(360deg);\n    -o-transform: rotate(360deg);\n    transform: rotate(360deg);\n  }\n}\n"; (require("browserify-css").createStyle(css, { "href": "src/progress.css"})); module.exports = css;
},{"browserify-css":1}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /* eslint-disable no-underscore-dangle */


var _extend = require('./extend');

var _extend2 = _interopRequireDefault(_extend);

var _color = require('./color');

var color = _interopRequireWildcard(_color);

require('./progress.css');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var body = document.querySelector('body');

var defaultOption = {
  element: body,
  position: 'top',
  color: 'rgb(2, 141, 192)'
};

var linear = function linear(time) {
  return time * 2;
};

var instanceCount = 0;

var Progress = function () {
  function Progress() {
    var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

    _classCallCheck(this, Progress);

    instanceCount++;
    this.options = (0, _extend2.default)({}, defaultOption, options);
    this.percent = 0;
    this.id = instanceCount;
    this._intervalHandler = null;
    this.status = 'waiting';
    this.callbacks = {};
  }

  _createClass(Progress, [{
    key: 'init',
    value: function init() {
      var position = 'fixed';
      var display = 'block';
      var top = 0;
      var bottom = 'auto';
      var highlight = 'rotate(2deg) translate(0,-4px);';

      if (this.options.element !== body) {
        position = 'absolute';
        display = 'none';
      }

      if (this.options.position === 'bottom') {
        top = 'auto';
        bottom = 0;
        highlight = 'rotate(-2deg) translate(0,1px)';
      }

      var tmpl = '\n      <div class="progress-main">\n        <span class="progress-bar">\n          <span class="progress-bar-inner"></span>\n        </span>\n        <span class="progress-circle"></span>\n        <style>\n            .progress-wrapper{\n              position: ' + position + ';\n              top: ' + top + ';\n              bottom: ' + bottom + ';\n            }\n            .progress-main{\n              top: ' + top + ';\n              bottom: ' + bottom + ';\n            }\n            .progress-bar-inner{\n              -webkit-transform: ' + highlight + ';\n              -moz-transform: ' + highlight + ';\n              -ms-transform: ' + highlight + ';\n              -o-transform: ' + highlight + ';\n              transform: ' + highlight + ';\n            }\n            .progress-circle{\n              display:' + display + ';\n            }\n        </style>\n      </div>\n      ';
      this.element = document.createElement('div');
      this.element.innerHTML = tmpl;
      this.element.className = 'progress-wrapper';
      this.setColor(this.options.color);
      this.options.element.appendChild(this.element);
    }
  }, {
    key: 'start',
    value: function start(algorithm) {
      var _this = this;

      if (~['loading', 'prohibit'].indexOf(this.status)) return this;

      this.init();

      this.status = 'loading';

      var timingFn = null;

      switch (algorithm) {
        case 'linear':
          timingFn = linear;
          break;
        default:
          timingFn = linear;
      }

      var time = 1;

      this._intervalHandler = setInterval(function () {
        if (_this.percent < 98) {
          _this.percent = timingFn(time);
          _this.percent = _this.percent > 98 ? 98 : _this.percent;
          _this.set(_this.percent);
        }
        _this.trigger('progress', _this.percent);
        time += 1;
      }, 400);

      this.trigger('start');

      return this;
    }
  }, {
    key: 'stop',
    value: function stop() {
      if (this._intervalHandler) {
        clearInterval(this._intervalHandler);
        this._intervalHandler = null;
      }
      this.trigger('stop');

      return this;
    }
  }, {
    key: 'set',
    value: function set(percent) {
      if (this.status !== 'loading' || typeof percent !== 'number' || percent < 0 || percent > 100) {
        return this;
      }

      this.percent = percent;
      (0, _extend2.default)(this.element.querySelector('.progress-bar').style, {
        width: this.percent + '%'
      });
      this.trigger('set', percent);

      return this;
    }
  }, {
    key: 'end',
    value: function end() {
      var _this2 = this;

      if (this.status !== 'loading') return this;

      this.stop();
      this.set(100);
      this._autoIncrease = false;
      setTimeout(function () {
        var opacity = 1;
        var handler = setInterval(function () {
          (0, _extend2.default)(_this2.element.style, {
            opacity: opacity
          });
          if (opacity <= 0) {
            clearInterval(handler);
            _this2.percent = 0;
            _this2.status = 'waiting';
            _this2.element.parentNode.removeChild(_this2.element);
            _this2.trigger('end');
          }
          opacity -= 0.1;
        }, 50);
      }, 400);

      return this;
    }
  }, {
    key: 'setColor',
    value: function setColor(c) {
      if (!c) return this;

      var rgb = void 0;
      var hex = void 0;
      if (c[0] === '#') {
        rgb = color.hexToRgb(c);
        hex = c;
      } else {
        rgb = c.match(/\((.*)\)/)[1];
        hex = color.rgbToHex(c);
      }

      this.options.color = hex;
      (0, _extend2.default)(this.element.querySelector('.progress-bar').style, {
        background: hex,
        boxShadow: '0 0 10px 0 rgba(' + rgb + ', 0.5)'
      });
      (0, _extend2.default)(this.element.querySelector('.progress-bar-inner').style, {
        background: hex,
        boxShadow: '0 0 10px rgba(' + rgb + ',0.5)'
      });
      (0, _extend2.default)(this.element.querySelector('.progress-circle').style, {
        borderBottomColor: hex,
        borderLeftColor: hex
      });
      this.trigger('setColor', hex);

      return this;
    }
  }, {
    key: 'on',
    value: function on(name, fn, context) {
      if (!this.callbacks[name] || !this.callbacks[name].length) {
        this.callbacks[name] = [{
          fn: fn,
          context: context || this
        }];
      } else {
        this.callbacks[name].push({
          fn: fn,
          context: context || this
        });
      }

      return this;
    }
  }, {
    key: 'trigger',
    value: function trigger(name) {
      for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      if (!this.callbacks[name] || !this.callbacks[name].length) return this;

      this.callbacks[name].forEach(function (cb) {
        return cb.fn.apply(cb.context, args);
      });

      return this;
    }
  }]);

  return Progress;
}();

exports.default = Progress;

},{"./color":2,"./extend":3,"./progress.css":5}]},{},[4])(4)
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXMvYnJvd3NlcmlmeS1jc3MvYnJvd3Nlci5qcyIsInNyYy9jb2xvci5qcyIsInNyYy9leHRlbmQuanMiLCJzcmMvbG9hZGVyLmpzIiwic3JjL3Byb2dyZXNzLmNzcyIsInNyYy9wcm9ncmVzcy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztRQzdDZ0IsUSxHQUFBLFE7UUFRQSxRLEdBQUEsUTtBQWJoQixTQUFTLGNBQVQsQ0FBd0IsQ0FBeEIsRUFBMkI7QUFDekIsTUFBTSxNQUFNLEVBQUUsUUFBRixDQUFXLEVBQVgsQ0FBWjtBQUNBLFNBQU8sSUFBSSxNQUFKLEtBQWUsQ0FBZixTQUF1QixHQUF2QixHQUErQixHQUF0QztBQUNEOztBQUVNLFNBQVMsUUFBVCxDQUFrQixHQUFsQixFQUF1QjtBQUM1QixNQUFNLE1BQU0sSUFBSSxLQUFKLENBQVUsVUFBVixFQUFzQixDQUF0QixFQUF5QixLQUF6QixDQUErQixHQUEvQixDQUFaO0FBQ0EsTUFBTSxJQUFJLENBQUMsSUFBSSxDQUFKLENBQVg7QUFDQSxNQUFNLElBQUksQ0FBQyxJQUFJLENBQUosQ0FBWDtBQUNBLE1BQU0sSUFBSSxDQUFDLElBQUksQ0FBSixDQUFYO0FBQ0EsZUFBVyxlQUFlLENBQWYsQ0FBWCxHQUErQixlQUFlLENBQWYs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OztBQUVBLGFBQU8sSUFBUDtBQUNEOzs7dUJBRUUsSSxFQUFNLEUsRUFBSSxPLEVBQVM7QUFDcEIsVUFBSSxDQUFDLEtBQUssU0FBTCxDQUFlLElBQWYsQ0FBRCxJQUF5QixDQUFDLEtBQUssU0FBTCxDQUFlLElBQWYsRUFBcUIsTUFBbkQsRUFBMkQ7QUFDekQsYUFBSyxTQUFMLENBQWUsSUFBZixJQUF1QixDQUFDO0FBQ3RCLGdCQURzQjtBQUV0QixtQkFBUyxXQUFXO0FBRkUsU0FBRCxDQUF2QjtBQUlELE9BTEQsTUFLTztBQUNMLGFBQUssU0FBTCxDQUFlLElBQWYsRUFBcUIsSUFBckIsQ0FBMEI7QUFDeEIsZ0JBRHdCO0FBRXhCLG1CQUFTLFdBQVc7QUFGSSxTQUExQjtBQUlEOztBQUVELGFBQU8sSUFBUDtBQUNEOzs7NEJBRU8sSSxFQUFlO0FBQUEsd0NBQU4sSUFBTTtBQUFOLFlBQU07QUFBQTs7QUFDckIsVUFBSSxDQUFDLEtBQUssU0FBTCxDQUFlLElBQWYsQ0FBRCxJQUF5QixDQUFDLEtBQUssU0FBTCxDQUFlLElBQWYsRUFBcUIsTUFBbkQsRUFBMkQsT0FBTyxJQUFQOztBQUUzRCxXQUFLLFNBQUwsQ0FBZSxJQUFmLEVBQXFCLE9BQXJCLENBQTZCO0FBQUEsZUFBTSxHQUFHLEVBQUgsQ0FBTSxLQUFOLENBQVksR0FBRyxPQUFmLEVBQXdCLElBQXhCLENBQU47QUFBQSxPQUE3Qjs7QUFFQSxhQUFPLElBQVA7QUFDRDs7Ozs7O2tCQTdNa0IsUSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIndXNlIHN0cmljdCc7XG4vLyBGb3IgbW9yZSBpbmZvcm1hdGlvbiBhYm91dCBicm93c2VyIGZpZWxkLCBjaGVjayBvdXQgdGhlIGJyb3dzZXIgZmllbGQgYXQgaHR0cHM6Ly9naXRodWIuY29tL3N1YnN0YWNrL2Jyb3dzZXJpZnktaGFuZGJvb2sjYnJvd3Nlci1maWVsZC5cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgLy8gQ3JlYXRlIGEgPGxpbms+IHRhZyB3aXRoIG9wdGlvbmFsIGRhdGEgYXR0cmlidXRlc1xuICAgIGNyZWF0ZUxpbms6IGZ1bmN0aW9uKGhyZWYsIGF0dHJpYnV0ZXMpIHtcbiAgICAgICAgdmFyIGhlYWQgPSBkb2N1bWVudC5oZWFkIHx8IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdoZWFkJylbMF07XG4gICAgICAgIHZhciBsaW5rID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGluaycpO1xuXG4gICAgICAgIGxpbmsuaHJlZiA9IGhyZWY7XG4gICAgICAgIGxpbmsucmVsID0gJ3N0eWxlc2hlZXQnO1xuXG4gICAgICAgIGZvciAodmFyIGtleSBpbiBhdHRyaWJ1dGVzKSB7XG4gICAgICAgICAgICBpZiAoICEgYXR0cmlidXRlcy5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YXIgdmFsdWUgPSBhdHRyaWJ1dGVzW2tleV07XG4gICAgICAgICAgICBsaW5rLnNldEF0dHJpYnV0ZSgnZGF0YS0nICsga2V5LCB2YWx1ZSk7XG4gICAgICAgIH1cblxuICAgICAgICBoZWFkLmFwcGVuZENoaWxkKGxpbmspO1xuICAgIH0sXG4gICAgLy8gQ3JlYXRlIGEgPHN0eWxlPiB0YWcgd2l0aCBvcHRpb25hbCBkYXRhIGF0dHJpYnV0ZXNcbiAgICBjcmVhdGVTdHlsZTogZnVuY3Rpb24oY3NzVGV4dCwgYXR0cmlidXRlcykge1xuICAgICAgICB2YXIgaGVhZCA9IGRvY3VtZW50LmhlYWQgfHwgZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2hlYWQnKVswXSxcbiAgICAgICAgICAgIHN0eWxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3R5bGUnKTtcblxuICAgICAgICBzdHlsZS50eXBlID0gJ3RleHQvY3NzJztcblxuICAgICAgICBmb3IgKHZhciBrZXkgaW4gYXR0cmlidXRlcykge1xuICAgICAgICAgICAgaWYgKCAhIGF0dHJpYnV0ZXMuaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFyIHZhbHVlID0gYXR0cmlidXRlc1trZXldO1xuICAgICAgICAgICAgc3R5bGUuc2V0QXR0cmlidXRlKCdkYXRhLScgKyBrZXksIHZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgaWYgKHN0eWxlLnNoZWV0KSB7IC8vIGZvciBqc2RvbSBhbmQgSUU5K1xuICAgICAgICAgICAgc3R5bGUuaW5uZXJIVE1MID0gY3NzVGV4dDtcbiAgICAgICAgICAgIHN0eWxlLnNoZWV0LmNzc1RleHQgPSBjc3NUZXh0O1xuICAgICAgICAgICAgaGVhZC5hcHBlbmRDaGlsZChzdHlsZSk7XG4gICAgICAgIH0gZWxzZSBpZiAoc3R5bGUuc3R5bGVTaGVldCkgeyAvLyBmb3IgSUU4IGFuZCBiZWxvd1xuICAgICAgICAgICAgaGVhZC5hcHBlbmRDaGlsZChzdHlsZSk7XG4gICAgICAgICAgICBzdHlsZS5zdHlsZVNoZWV0LmNzc1RleHQgPSBjc3NUZXh0O1xuICAgICAgICB9IGVsc2UgeyAvLyBmb3IgQ2hyb21lLCBGaXJlZm94LCBhbmQgU2FmYXJpXG4gICAgICAgICAgICBzdHlsZS5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjc3NUZXh0KSk7XG4gICAgICAgICAgICBoZWFkLmFwcGVuZENoaWxkKHN0eWxlKTtcbiAgICAgICAgfVxuICAgIH1cbn07XG4iLCJmdW5jdGlvbiBjb21wb25lbnRUb0hleChjKSB7XG4gIGNvbnN0IGhleCA9IGMudG9TdHJpbmcoMTYpXG4gIHJldHVybiBoZXgubGVuZ3RoID09PSAxID8gYDAke2hleH1gIDogaGV4XG59XG5cbmV4cG9ydCBmdW5jdGlvbiByZ2JUb0hleChyZ2IpIHtcbiAgY29uc3QgYXJyID0gcmdiLm1hdGNoKC9cXCgoLiopXFwpLylbMV0uc3BsaXQoJywnKVxuICBjb25zdCByID0gK2FyclswXVxuICBjb25zdCBnID0gK2FyclsxXVxuICBjb25zdCBiID0gK2FyclsyXVxuICByZXR1cm4gYCMke2NvbXBvbmVudFRvSGV4KHIpfSR7Y29tcG9uZW50VG9IZXgoZyl9JHtjb21wb25lbnRUb0hleChiKX1gXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBoZXhUb1JnYihoZXgpIHtcbiAgICAvLyBFeHBhbmQgc2hvcnRoYW5kIGZvcm0gKGUuZy4gXCIwM0ZcIikgdG8gZnVsbCBmb3JtIChlLmcuIFwiMDAzM0ZGXCIpXG4gIGNvbnN0IHNob3J0aGFuZFJlZ2V4ID0gL14jPyhbYS1mXFxkXSkoW2EtZlxcZF0pKFthLWZcXGRdKSQvaVxuICBjb25zdCBoID0gaGV4LnJlcGxhY2Uoc2hvcnRoYW5kUmVnZXgsIChtLCByLCBnLCBiKSA9PiAociArIHIgKyBnICsgZyArIGIgKyBiKSlcblxuICBjb25zdCByZXN1bHQgPSAvXiM/KFthLWZcXGRdezJ9KShbYS1mXFxkXXsyfSkoW2EtZlxcZF17Mn0pJC9pLmV4ZWMoaClcbiAgcmV0dXJuIHJlc3VsdCA/IFtwYXJzZUludChyZXN1bHRbMV0sIDE2KSxcbiAgICBwYXJzZUludChyZXN1bHRbMl0sIDE2KSxcbiAgICBwYXJzZUludChyZXN1bHRbM10sIDE2KVxuICBdLmpvaW4oJywnKSA6IG51bGxcbn1cbiIsIi8qIGVzbGludC1kaXNhYmxlIG5vLXBhcmFtLXJlYXNzaWduICovXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGV4dGVuZChzb3VyY2UsIC4uLmxpc3QpIHtcbiAgaWYgKCFsaXN0IHx8ICFzb3VyY2UgfHwgdHlwZW9mIHNvdXJjZSAhPT0gJ29iamVjdCcpIHsgcmV0dXJuIHt9IH1cbiAgbGlzdC5mb3JFYWNoKG9iaiA9PiB7XG4gICAgT2JqZWN0LmtleXMob2JqKS5mb3JFYWNoKGtleSA9PiB7XG4gICAgICBpZiAoT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG9ialtrZXldKSA9PT0gJ1tvYmplY3QgT2JqZWN0XScpIHtcbiAgICAgICAgc291cmNlW2tleV0gPSBleHRlbmQoe30sIHNvdXJjZVtrZXldLCBvYmpba2V5XSlcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHNvdXJjZVtrZXldID0gb2JqW2tleV1cbiAgICAgIH1cbiAgICB9KVxuICB9KVxuICByZXR1cm4gc291cmNlXG59XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vcHJvZ3Jlc3MnKS5kZWZhdWx0XG4iLCJ2YXIgY3NzID0gXCIucHJvZ3Jlc3Mtd3JhcHBlciB7XFxuICBsZWZ0OiAwO1xcbiAgcmlnaHQ6IDA7XFxuICB6LWluZGV4OiA5OTk7XFxuICBoZWlnaHQ6IDVweDtcXG59XFxuLnByb2dyZXNzLWJhciB7XFxuICB3aWR0aDogMDtcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gIHRyYW5zaXRpb246IGFsbCAuM3M7XFxufVxcbi5wcm9ncmVzcy1tYWluIHtcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIGxlZnQ6IDA7XFxuICByaWdodDogMDtcXG59XFxuLnByb2dyZXNzLWJhcixcXG4ucHJvZ3Jlc3MtYmFyLWlubmVyIHtcXG4gIGRpc3BsYXk6IGJsb2NrO1xcbiAgaGVpZ2h0OiAycHg7XFxuICAtbW96LXRyYW5zaXRpb246IGFsbCAuM3M7XFxuICAtby10cmFuc2l0aW9uOiBhbGwgLjNzO1xcbn1cXG4ucHJvZ3Jlc3MtYmFyLWlubmVyIHtcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIHRvcDogMXB4O1xcbiAgcmlnaHQ6IDA7XFxuICB3aWR0aDogMTAwcHg7XFxuICB0cmFuc2l0aW9uOiBhbGwgLjNzO1xcbn1cXG4ucHJvZ3Jlc3MtY2lyY2xlIHtcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIHRvcDogMjBweDtcXG4gIHJpZ2h0OiAyMHB4O1xcbiAgd2lkdGg6IDE1cHg7XFxuICBoZWlnaHQ6IDE1cHg7XFxuICBib3JkZXI6IDJweCBzb2xpZCB0cmFuc3BhcmVudDtcXG4gIGJvcmRlci1yYWRpdXM6IDUwJTtcXG4gIC13ZWJraXQtYW5pbWF0aW9uOiBzcGluIC40cyBsaW5lYXIgaW5maW5pdGU7XFxuICAtbW96LWFuaW1hdGlvbjogc3BpbiAuNHMgbGluZWFyIGluZmluaXRlO1xcbiAgLW8tYW5pbWF0aW9uOiBzcGluIC40cyBsaW5lYXIgaW5maW5pdGU7XFxuICBhbmltYXRpb246IHNwaW4gLjRzIGxpbmVhciBpbmZpbml0ZTtcXG4gIC1tb3otdHJhbnNpdGlvbjogYm9yZGVyIC4zcztcXG4gIC1vLXRyYW5zaXRpb246IGJvcmRlciAuM3M7XFxuICB0cmFuc2l0aW9uOiBib3JkZXIgLjNzO1xcbn1cXG5ALXdlYmtpdC1rZXlmcmFtZXMgc3BpbiB7XFxuICAwJSB7XFxuICAgIC13ZWJraXQtdHJhbnNmb3JtOiByb3RhdGUoMCk7XFxuICAgIHRyYW5zZm9ybTogcm90YXRlKDApO1xcbiAgfVxcblxcbiAgMTAwJSB7XFxuICAgIC13ZWJraXQtdHJhbnNmb3JtOiByb3RhdGUoMzYwZGVnKTtcXG4gICAgdHJhbnNmb3JtOiByb3RhdGUoMzYwZGVnKTtcXG4gIH1cXG59XFxuQC1tb3ota2V5ZnJhbWVzIHNwaW4ge1xcbiAgMCUge1xcbiAgICAtbW96LXRyYW5zZm9ybTogcm90YXRlKDApO1xcbiAgICB0cmFuc2Zvcm06IHJvdGF0ZSgwKTtcXG4gIH1cXG5cXG4gIDEwMCUge1xcbiAgICAtbW96LXRyYW5zZm9ybTogcm90YXRlKDM2MGRlZyk7XFxuICAgIHRyYW5zZm9ybTogcm90YXRlKDM2MGRlZyk7XFxuICB9XFxufVxcbkAtby1rZXlmcmFtZXMgc3BpbiB7XFxuICAwJSB7XFxuICAgIC1vLXRyYW5zZm9ybTogcm90YXRlKDApO1xcbiAgICB0cmFuc2Zvcm06IHJvdGF0ZSgwKTtcXG4gIH1cXG5cXG4gIDEwMCUge1xcbiAgICAtby10cmFuc2Zvcm06IHJvdGF0ZSgzNjBkZWcpO1xcbiAgICB0cmFuc2Zvcm06IHJvdGF0ZSgzNjBkZWcpO1xcbiAgfVxcbn1cXG5Aa2V5ZnJhbWVzIHNwaW4ge1xcbiAgMCUge1xcbiAgICAtd2Via2l0LXRyYW5zZm9ybTogcm90YXRlKDApO1xcbiAgICAtbW96LXRyYW5zZm9ybTogcm90YXRlKDApO1xcbiAgICAtby10cmFuc2Zvcm06IHJvdGF0ZSgwKTtcXG4gICAgdHJhbnNmb3JtOiByb3RhdGUoMCk7XFxuICB9XFxuXFxuICAxMDAlIHtcXG4gICAgLXdlYmtpdC10cmFuc2Zvcm06IHJvdGF0ZSgzNjBkZWcpO1xcbiAgICAtbW96LXRyYW5zZm9ybTogcm90YXRlKDM2MGRlZyk7XFxuICAgIC1vLXRyYW5zZm9ybTogcm90YXRlKDM2MGRlZyk7XFxuICAgIHRyYW5zZm9ybTogcm90YXRlKDM2MGRlZyk7XFxuICB9XFxufVxcblwiOyAocmVxdWlyZShcImJyb3dzZXJpZnktY3NzXCIpLmNyZWF0ZVN0eWxlKGNzcywgeyBcImhyZWZcIjogXCJzcmMvcHJvZ3Jlc3MuY3NzXCJ9KSk7IG1vZHVsZS5leHBvcnRzID0gY3NzOyIsIi8qIGVzbGludC1kaXNhYmxlIG5vLXVuZGVyc2NvcmUtZGFuZ2xlICovXG5pbXBvcnQgZXh0ZW5kIGZyb20gJy4vZXh0ZW5kJ1xuaW1wb3J0ICogYXMgY29sb3IgZnJvbSAnLi9jb2xvcidcbmltcG9ydCAnLi9wcm9ncmVzcy5jc3MnXG5cbmNvbnN0IGJvZHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdib2R5JylcblxuY29uc3QgZGVmYXVsdE9wdGlvbiA9IHtcbiAgZWxlbWVudDogYm9keSxcbiAgcG9zaXRpb246ICd0b3AnLFxuICBjb2xvcjogJ3JnYigyLCAxNDEsIDE5MiknXG59XG5cbmNvbnN0IGxpbmVhciA9IHRpbWUgPT4gdGltZSAqIDJcblxubGV0IGluc3RhbmNlQ291bnQgPSAwXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFByb2dyZXNzIHtcbiAgY29uc3RydWN0b3Iob3B0aW9ucyA9IHt9KSB7XG4gICAgaW5zdGFuY2VDb3VudCsrXG4gICAgdGhpcy5vcHRpb25zID0gZXh0ZW5kKHt9LCBkZWZhdWx0T3B0aW9uLCBvcHRpb25zKVxuICAgIHRoaXMucGVyY2VudCA9IDBcbiAgICB0aGlzLmlkID0gaW5zdGFuY2VDb3VudFxuICAgIHRoaXMuX2ludGVydmFsSGFuZGxlciA9IG51bGxcbiAgICB0aGlzLnN0YXR1cyA9ICd3YWl0aW5nJ1xuICAgIHRoaXMuY2FsbGJhY2tzID0ge31cbiAgfVxuXG4gIGluaXQoKSB7XG4gICAgbGV0IHBvc2l0aW9uID0gJ2ZpeGVkJ1xuICAgIGxldCBkaXNwbGF5ID0gJ2Jsb2NrJ1xuICAgIGxldCB0b3AgPSAwXG4gICAgbGV0IGJvdHRvbSA9ICdhdXRvJ1xuICAgIGxldCBoaWdobGlnaHQgPSAncm90YXRlKDJkZWcpIHRyYW5zbGF0ZSgwLC00cHgpOydcblxuICAgIGlmICh0aGlzLm9wdGlvbnMuZWxlbWVudCAhPT0gYm9keSkge1xuICAgICAgcG9zaXRpb24gPSAnYWJzb2x1dGUnXG4gICAgICBkaXNwbGF5ID0gJ25vbmUnXG4gICAgfVxuXG4gICAgaWYgKHRoaXMub3B0aW9ucy5wb3NpdGlvbiA9PT0gJ2JvdHRvbScpIHtcbiAgICAgIHRvcCA9ICdhdXRvJ1xuICAgICAgYm90dG9tID0gMFxuICAgICAgaGlnaGxpZ2h0ID0gJ3JvdGF0ZSgtMmRlZykgdHJhbnNsYXRlKDAsMXB4KSdcbiAgICB9XG5cbiAgICBjb25zdCB0bXBsID0gYFxuICAgICAgPGRpdiBjbGFzcz1cInByb2dyZXNzLW1haW5cIj5cbiAgICAgICAgPHNwYW4gY2xhc3M9XCJwcm9ncmVzcy1iYXJcIj5cbiAgICAgICAgICA8c3BhbiBjbGFzcz1cInByb2dyZXNzLWJhci1pbm5lclwiPjwvc3Bhbj5cbiAgICAgICAgPC9zcGFuPlxuICAgICAgICA8c3BhbiBjbGFzcz1cInByb2dyZXNzLWNpcmNsZVwiPjwvc3Bhbj5cbiAgICAgICAgPHN0eWxlPlxuICAgICAgICAgICAgLnByb2dyZXNzLXdyYXBwZXJ7XG4gICAgICAgICAgICAgIHBvc2l0aW9uOiAke3Bvc2l0aW9ufTtcbiAgICAgICAgICAgICAgdG9wOiAke3RvcH07XG4gICAgICAgICAgICAgIGJvdHRvbTogJHtib3R0b219O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLnByb2dyZXNzLW1haW57XG4gICAgICAgICAgICAgIHRvcDogJHt0b3B9O1xuICAgICAgICAgICAgICBib3R0b206ICR7Ym90dG9tfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC5wcm9ncmVzcy1iYXItaW5uZXJ7XG4gICAgICAgICAgICAgIC13ZWJraXQtdHJhbnNmb3JtOiAke2hpZ2hsaWdodH07XG4gICAgICAgICAgICAgIC1tb3otdHJhbnNmb3JtOiAke2hpZ2hsaWdodH07XG4gICAgICAgICAgICAgIC1tcy10cmFuc2Zvcm06ICR7aGlnaGxpZ2h0fTtcbiAgICAgICAgICAgICAgLW8tdHJhbnNmb3JtOiAke2hpZ2hsaWdodH07XG4gICAgICAgICAgICAgIHRyYW5zZm9ybTogJHtoaWdobGlnaHR9O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLnByb2dyZXNzLWNpcmNsZXtcbiAgICAgICAgICAgICAgZGlzcGxheToke2Rpc3BsYXl9O1xuICAgICAgICAgICAgfVxuICAgICAgICA8L3N0eWxlPlxuICAgICAgPC9kaXY+XG4gICAgICBgXG4gICAgdGhpcy5lbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgICB0aGlzLmVsZW1lbnQuaW5uZXJIVE1MID0gdG1wbFxuICAgIHRoaXMuZWxlbWVudC5jbGFzc05hbWUgPSAncHJvZ3Jlc3Mtd3JhcHBlcidcbiAgICB0aGlzLnNldENvbG9yKHRoaXMub3B0aW9ucy5jb2xvcilcbiAgICB0aGlzLm9wdGlvbnMuZWxlbWVudC5hcHBlbmRDaGlsZCh0aGlzLmVsZW1lbnQpXG4gIH1cblxuICBzdGFydChhbGdvcml0aG0pIHtcbiAgICBpZiAoflsnbG9hZGluZycsICdwcm9oaWJpdCddLmluZGV4T2YodGhpcy5zdGF0dXMpKSByZXR1cm4gdGhpc1xuXG4gICAgdGhpcy5pbml0KClcblxuICAgIHRoaXMuc3RhdHVzID0gJ2xvYWRpbmcnXG5cbiAgICBsZXQgdGltaW5nRm4gPSBudWxsXG5cbiAgICBzd2l0Y2ggKGFsZ29yaXRobSkge1xuICAgICAgY2FzZSAnbGluZWFyJzpcbiAgICAgICAgdGltaW5nRm4gPSBsaW5lYXJcbiAgICAgICAgYnJlYWtcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHRpbWluZ0ZuID0gbGluZWFyXG4gICAgfVxuXG4gICAgbGV0IHRpbWUgPSAxXG5cbiAgICB0aGlzLl9pbnRlcnZhbEhhbmRsZXIgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XG4gICAgICBpZiAodGhpcy5wZXJjZW50IDwgOTgpIHtcbiAgICAgICAgdGhpcy5wZXJjZW50ID0gdGltaW5nRm4odGltZSlcbiAgICAgICAgdGhpcy5wZXJjZW50ID0gdGhpcy5wZXJjZW50ID4gOTggPyA5OCA6IHRoaXMucGVyY2VudFxuICAgICAgICB0aGlzLnNldCh0aGlzLnBlcmNlbnQpXG4gICAgICB9XG4gICAgICB0aGlzLnRyaWdnZXIoJ3Byb2dyZXNzJywgdGhpcy5wZXJjZW50KVxuICAgICAgdGltZSArPSAxXG4gICAgfSwgNDAwKVxuXG4gICAgdGhpcy50cmlnZ2VyKCdzdGFydCcpXG5cbiAgICByZXR1cm4gdGhpc1xuICB9XG5cbiAgc3RvcCgpIHtcbiAgICBpZiAodGhpcy5faW50ZXJ2YWxIYW5kbGVyKSB7XG4gICAgICBjbGVhckludGVydmFsKHRoaXMuX2ludGVydmFsSGFuZGxlcilcbiAgICAgIHRoaXMuX2ludGVydmFsSGFuZGxlciA9IG51bGxcbiAgICB9XG4gICAgdGhpcy50cmlnZ2VyKCdzdG9wJylcblxuICAgIHJldHVybiB0aGlzXG4gIH1cblxuICBzZXQocGVyY2VudCkge1xuICAgIGlmICh0aGlzLnN0YXR1cyAhPT0gJ2xvYWRpbmcnXG4gICAgICB8fCB0eXBlb2YgcGVyY2VudCAhPT0gJ251bWJlcidcbiAgICAgIHx8IHBlcmNlbnQgPCAwXG4gICAgICB8fCBwZXJjZW50ID4gMTAwKSB7XG4gICAgICByZXR1cm4gdGhpc1xuICAgIH1cblxuICAgIHRoaXMucGVyY2VudCA9IHBlcmNlbnRcbiAgICBleHRlbmQodGhpcy5lbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wcm9ncmVzcy1iYXInKS5zdHlsZSwge1xuICAgICAgd2lkdGg6IGAke3RoaXMucGVyY2VudH0lYFxuICAgIH0pXG4gICAgdGhpcy50cmlnZ2VyKCdzZXQnLCBwZXJjZW50KVxuXG4gICAgcmV0dXJuIHRoaXNcbiAgfVxuXG4gIGVuZCgpIHtcbiAgICBpZiAodGhpcy5zdGF0dXMgIT09ICdsb2FkaW5nJykgcmV0dXJuIHRoaXNcblxuICAgIHRoaXMuc3RvcCgpXG4gICAgdGhpcy5zZXQoMTAwKVxuICAgIHRoaXMuX2F1dG9JbmNyZWFzZSA9IGZhbHNlXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICBsZXQgb3BhY2l0eSA9IDFcbiAgICAgIGNvbnN0IGhhbmRsZXIgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XG4gICAgICAgIGV4dGVuZCh0aGlzLmVsZW1lbnQuc3R5bGUsIHtcbiAgICAgICAgICBvcGFjaXR5XG4gICAgICAgIH0pXG4gICAgICAgIGlmIChvcGFjaXR5IDw9IDApIHtcbiAgICAgICAgICBjbGVhckludGVydmFsKGhhbmRsZXIpXG4gICAgICAgICAgdGhpcy5wZXJjZW50ID0gMFxuICAgICAgICAgIHRoaXMuc3RhdHVzID0gJ3dhaXRpbmcnXG4gICAgICAgICAgdGhpcy5lbGVtZW50LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQodGhpcy5lbGVtZW50KVxuICAgICAgICAgIHRoaXMudHJpZ2dlcignZW5kJylcbiAgICAgICAgfVxuICAgICAgICBvcGFjaXR5IC09IDAuMVxuICAgICAgfSwgNTApXG4gICAgfSwgNDAwKVxuXG4gICAgcmV0dXJuIHRoaXNcbiAgfVxuXG4gIHNldENvbG9yKGMpIHtcbiAgICBpZiAoIWMpIHJldHVybiB0aGlzXG5cbiAgICBsZXQgcmdiXG4gICAgbGV0IGhleFxuICAgIGlmIChjWzBdID09PSAnIycpIHtcbiAgICAgIHJnYiA9IGNvbG9yLmhleFRvUmdiKGMpXG4gICAgICBoZXggPSBjXG4gICAgfSBlbHNlIHtcbiAgICAgIHJnYiA9IGMubWF0Y2goL1xcKCguKilcXCkvKVsxXVxuICAgICAgaGV4ID0gY29sb3IucmdiVG9IZXgoYylcbiAgICB9XG5cbiAgICB0aGlzLm9wdGlvbnMuY29sb3IgPSBoZXhcbiAgICBleHRlbmQodGhpcy5lbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wcm9ncmVzcy1iYXInKS5zdHlsZSwge1xuICAgICAgYmFja2dyb3VuZDogaGV4LFxuICAgICAgYm94U2hhZG93OiBgMCAwIDEwcHggMCByZ2JhKCR7cmdifSwgMC41KWBcbiAgICB9KVxuICAgIGV4dGVuZCh0aGlzLmVsZW1lbnQucXVlcnlTZWxlY3RvcignLnByb2dyZXNzLWJhci1pbm5lcicpLnN0eWxlLCB7XG4gICAgICBiYWNrZ3JvdW5kOiBoZXgsXG4gICAgICBib3hTaGFkb3c6IGAwIDAgMTBweCByZ2JhKCR7cmdifSwwLjUpYFxuICAgIH0pXG4gICAgZXh0ZW5kKHRoaXMuZWxlbWVudC5xdWVyeVNlbGVjdG9yKCcucHJvZ3Jlc3MtY2lyY2xlJykuc3R5bGUsIHtcbiAgICAgIGJvcmRlckJvdHRvbUNvbG9yOiBoZXgsXG4gICAgICBib3JkZXJMZWZ0Q29sb3I6IGhleFxuICAgIH0pXG4gICAgdGhpcy50cmlnZ2VyKCdzZXRDb2xvcicsIGhleClcblxuICAgIHJldHVybiB0aGlzXG4gIH1cblxuICBvbihuYW1lLCBmbiwgY29udGV4dCkge1xuICAgIGlmICghdGhpcy5jYWxsYmFja3NbbmFtZV0gfHwgIXRoaXMuY2FsbGJhY2tzW25hbWVdLmxlbmd0aCkge1xuICAgICAgdGhpcy5jYWxsYmFja3NbbmFtZV0gPSBbe1xuICAgICAgICBmbixcbiAgICAgICAgY29udGV4dDogY29udGV4dCB8fCB0aGlzXG4gICAgICB9XVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmNhbGxiYWNrc1tuYW1lXS5wdXNoKHtcbiAgICAgICAgZm4sXG4gICAgICAgIGNvbnRleHQ6IGNvbnRleHQgfHwgdGhpc1xuICAgICAgfSlcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpc1xuICB9XG5cbiAgdHJpZ2dlcihuYW1lLCAuLi5hcmdzKSB7XG4gICAgaWYgKCF0aGlzLmNhbGxiYWNrc1tuYW1lXSB8fCAhdGhpcy5jYWxsYmFja3NbbmFtZV0ubGVuZ3RoKSByZXR1cm4gdGhpc1xuXG4gICAgdGhpcy5jYWxsYmFja3NbbmFtZV0uZm9yRWFjaChjYiA9PiBjYi5mbi5hcHBseShjYi5jb250ZXh0LCBhcmdzKSlcblxuICAgIHJldHVybiB0aGlzXG4gIH1cbn1cbiJdfQ==
