/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/date-and-time/date-and-time.js":
/*!*****************************************************!*\
  !*** ./node_modules/date-and-time/date-and-time.js ***!
  \*****************************************************/
/***/ (function(module) {

(function (global, factory) {
     true ? module.exports = factory() :
    0;
})(this, (function () { 'use strict';

    /**
     * @preserve date-and-time (c) KNOWLEDGECODE | MIT
     */

    var locales = {},
        plugins = {},
        lang = 'en',
        _res = {
            MMMM: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
            MMM: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            dddd: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
            ddd: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
            dd: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
            A: ['AM', 'PM']
        },
        _formatter = {
            YYYY: function (d/*, formatString*/) { return ('000' + d.getFullYear()).slice(-4); },
            YY: function (d/*, formatString*/) { return ('0' + d.getFullYear()).slice(-2); },
            Y: function (d/*, formatString*/) { return '' + d.getFullYear(); },
            MMMM: function (d/*, formatString*/) { return this.res.MMMM[d.getMonth()]; },
            MMM: function (d/*, formatString*/) { return this.res.MMM[d.getMonth()]; },
            MM: function (d/*, formatString*/) { return ('0' + (d.getMonth() + 1)).slice(-2); },
            M: function (d/*, formatString*/) { return '' + (d.getMonth() + 1); },
            DD: function (d/*, formatString*/) { return ('0' + d.getDate()).slice(-2); },
            D: function (d/*, formatString*/) { return '' + d.getDate(); },
            HH: function (d/*, formatString*/) { return ('0' + d.getHours()).slice(-2); },
            H: function (d/*, formatString*/) { return '' + d.getHours(); },
            A: function (d/*, formatString*/) { return this.res.A[d.getHours() > 11 | 0]; },
            hh: function (d/*, formatString*/) { return ('0' + (d.getHours() % 12 || 12)).slice(-2); },
            h: function (d/*, formatString*/) { return '' + (d.getHours() % 12 || 12); },
            mm: function (d/*, formatString*/) { return ('0' + d.getMinutes()).slice(-2); },
            m: function (d/*, formatString*/) { return '' + d.getMinutes(); },
            ss: function (d/*, formatString*/) { return ('0' + d.getSeconds()).slice(-2); },
            s: function (d/*, formatString*/) { return '' + d.getSeconds(); },
            SSS: function (d/*, formatString*/) { return ('00' + d.getMilliseconds()).slice(-3); },
            SS: function (d/*, formatString*/) { return ('0' + (d.getMilliseconds() / 10 | 0)).slice(-2); },
            S: function (d/*, formatString*/) { return '' + (d.getMilliseconds() / 100 | 0); },
            dddd: function (d/*, formatString*/) { return this.res.dddd[d.getDay()]; },
            ddd: function (d/*, formatString*/) { return this.res.ddd[d.getDay()]; },
            dd: function (d/*, formatString*/) { return this.res.dd[d.getDay()]; },
            Z: function (d/*, formatString*/) {
                var offset = d.getTimezoneOffset() / 0.6 | 0;
                return (offset > 0 ? '-' : '+') + ('000' + Math.abs(offset - (offset % 100 * 0.4 | 0))).slice(-4);
            },
            ZZ: function (d/*, formatString*/) {
                var offset = d.getTimezoneOffset();
                var mod = Math.abs(offset);
                return (offset > 0 ? '-' : '+') + ('0' + (mod / 60 | 0)).slice(-2) + ':' + ('0' + mod % 60).slice(-2);
            },
            post: function (str) { return str; },
            res: _res
        },
        _parser = {
            YYYY: function (str/*, formatString */) { return this.exec(/^\d{4}/, str); },
            Y: function (str/*, formatString */) { return this.exec(/^\d{1,4}/, str); },
            MMMM: function (str/*, formatString */) {
                var result = this.find(this.res.MMMM, str);
                result.value++;
                return result;
            },
            MMM: function (str/*, formatString */) {
                var result = this.find(this.res.MMM, str);
                result.value++;
                return result;
            },
            MM: function (str/*, formatString */) { return this.exec(/^\d\d/, str); },
            M: function (str/*, formatString */) { return this.exec(/^\d\d?/, str); },
            DD: function (str/*, formatString */) { return this.exec(/^\d\d/, str); },
            D: function (str/*, formatString */) { return this.exec(/^\d\d?/, str); },
            HH: function (str/*, formatString */) { return this.exec(/^\d\d/, str); },
            H: function (str/*, formatString */) { return this.exec(/^\d\d?/, str); },
            A: function (str/*, formatString */) { return this.find(this.res.A, str); },
            hh: function (str/*, formatString */) { return this.exec(/^\d\d/, str); },
            h: function (str/*, formatString */) { return this.exec(/^\d\d?/, str); },
            mm: function (str/*, formatString */) { return this.exec(/^\d\d/, str); },
            m: function (str/*, formatString */) { return this.exec(/^\d\d?/, str); },
            ss: function (str/*, formatString */) { return this.exec(/^\d\d/, str); },
            s: function (str/*, formatString */) { return this.exec(/^\d\d?/, str); },
            SSS: function (str/*, formatString */) { return this.exec(/^\d{1,3}/, str); },
            SS: function (str/*, formatString */) {
                var result = this.exec(/^\d\d?/, str);
                result.value *= 10;
                return result;
            },
            S: function (str/*, formatString */) {
                var result = this.exec(/^\d/, str);
                result.value *= 100;
                return result;
            },
            Z: function (str/*, formatString */) {
                var result = this.exec(/^[+-]\d{2}[0-5]\d/, str);
                result.value = (result.value / 100 | 0) * -60 - result.value % 100;
                return result;
            },
            ZZ: function (str/*, formatString */) {
                var arr = /^([+-])(\d{2}):([0-5]\d)/.exec(str) || ['', '', '', ''];
                return { value: 0 - ((arr[1] + arr[2] | 0) * 60 + (arr[1] + arr[3] | 0)), length: arr[0].length };
            },
            h12: function (h, a) { return (h === 12 ? 0 : h) + a * 12; },
            exec: function (re, str) {
                var result = (re.exec(str) || [''])[0];
                return { value: result | 0, length: result.length };
            },
            find: function (array, str) {
                var index = -1, length = 0;

                for (var i = 0, len = array.length, item; i < len; i++) {
                    item = array[i];
                    if (!str.indexOf(item) && item.length > length) {
                        index = i;
                        length = item.length;
                    }
                }
                return { value: index, length: length };
            },
            pre: function (str) { return str; },
            res: _res
        },
        extend = function (base, props, override, res) {
            var obj = {}, key;

            for (key in base) {
                obj[key] = base[key];
            }
            for (key in props || {}) {
                if (!(!!override ^ !!obj[key])) {
                    obj[key] = props[key];
                }
            }
            if (res) {
                obj.res = res;
            }
            return obj;
        },
        proto = {
            _formatter: _formatter,
            _parser: _parser
        },
        localized_proto,
        date;

    /**
     * Compiling format strings
     * @param {string} formatString - A format string
     * @returns {Array.<string>} A compiled object
     */
    proto.compile = function (formatString) {
        var re = /\[([^[\]]|\[[^[\]]*])*]|([A-Za-z])\2+|\.{3}|./g, keys, pattern = [formatString];

        while ((keys = re.exec(formatString))) {
            pattern[pattern.length] = keys[0];
        }
        return pattern;
    };

    /**
     * Formatting date and time objects (Date -> String)
     * @param {Date} dateObj - A Date object
     * @param {string|Array.<string>} arg - A format string or its compiled object
     * @param {boolean} [utc] - Output as UTC
     * @returns {string} A formatted string
     */
    proto.format = function (dateObj, arg, utc) {
        var ctx = this || date, pattern = typeof arg === 'string' ? ctx.compile(arg) : arg,
            offset = dateObj.getTimezoneOffset(),
            d = ctx.addMinutes(dateObj, utc ? offset : 0),
            formatter = ctx._formatter, str = '';

        d.getTimezoneOffset = function () { return utc ? 0 : offset; };
        for (var i = 1, len = pattern.length, token; i < len; i++) {
            token = pattern[i];
            str += formatter[token] ? formatter.post(formatter[token](d, pattern[0])) : token.replace(/\[(.*)]/, '$1');
        }
        return str;
    };

    /**
     * Pre-parsing date and time strings
     * @param {string} dateString - A date and time string
     * @param {string|Array.<string>} arg - A format string or its compiled object
     * @param {boolean} [utc] - Input as UTC
     * @returns {Object} A pre-parsed result object
     */
    proto.preparse = function (dateString, arg) {
        var ctx = this || date, pattern = typeof arg === 'string' ? ctx.compile(arg) : arg,
            dt = { Y: 1970, M: 1, D: 1, H: 0, A: 0, h: 0, m: 0, s: 0, S: 0, Z: 0, _index: 0, _length: 0, _match: 0 },
            comment = /\[(.*)]/, parser = ctx._parser, offset = 0;

        dateString = parser.pre(dateString);
        for (var i = 1, len = pattern.length, token, result; i < len; i++) {
            token = pattern[i];
            if (parser[token]) {
                result = parser[token](dateString.slice(offset), pattern[0]);
                if (!result.length) {
                    break;
                }
                offset += result.length;
                dt[result.token || token.charAt(0)] = result.value;
                dt._match++;
            } else if (token === dateString.charAt(offset) || token === ' ') {
                offset++;
            } else if (comment.test(token) && !dateString.slice(offset).indexOf(comment.exec(token)[1])) {
                offset += token.length - 2;
            } else if (token === '...') {
                offset = dateString.length;
                break;
            } else {
                break;
            }
        }
        dt.H = dt.H || parser.h12(dt.h, dt.A);
        dt._index = offset;
        dt._length = dateString.length;
        return dt;
    };

    /**
     * Parsing of date and time string (String -> Date)
     * @param {string} dateString - A date-time string
     * @param {string|Array.<string>} arg - A format string or its compiled object
     * @param {boolean} [utc] - Input as UTC
     * @returns {Date} A Date object
     */
    proto.parse = function (dateString, arg, utc) {
        var ctx = this || date, pattern = typeof arg === 'string' ? ctx.compile(arg) : arg,
            dt = ctx.preparse(dateString, pattern);

        if (ctx.isValid(dt)) {
            dt.M -= dt.Y < 100 ? 22801 : 1; // 22801 = 1900 * 12 + 1
            if (utc || ~ctx._parser.find(pattern, 'ZZ').value) {
                return new Date(Date.UTC(dt.Y, dt.M, dt.D, dt.H, dt.m + dt.Z, dt.s, dt.S));
            }
            return new Date(dt.Y, dt.M, dt.D, dt.H, dt.m, dt.s, dt.S);
        }
        return new Date(NaN);
    };

    /**
     * Date and time string validation
     * @param {Object|string} arg1 - A pre-parsed result object or a date and time string
     * @param {string|Array.<string>} [arg2] - A format string or its compiled object
     * @returns {boolean} Whether the date and time string is a valid date and time
     */
    proto.isValid = function (arg1, arg2) {
        var ctx = this || date, dt = typeof arg1 === 'string' ? ctx.preparse(arg1, arg2) : arg1,
            last = [31, 28 + ctx.isLeapYear(dt.Y) | 0, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][dt.M - 1];

        return !(
            dt._index < 1 || dt._length < 1 || dt._index - dt._length || dt._match < 1 ||
            dt.Y < 1 || dt.Y > 9999 || dt.M < 1 || dt.M > 12 || dt.D < 1 || dt.D > last ||
            dt.H < 0 || dt.H > 23 || dt.m < 0 || dt.m > 59 || dt.s < 0 || dt.s > 59 || dt.S < 0 || dt.S > 999 ||
            dt.Z < -840 || dt.Z > 720
        );
    };

    /**
     * Format transformation of date and time string (String -> String)
     * @param {string} dateString - A date and time string
     * @param {string|Array.<string>} arg1 - A format string or its compiled object before transformation
     * @param {string|Array.<string>} arg2 - A format string or its compiled object after transformation
     * @param {boolean} [utc] - Output as UTC
     * @returns {string} A formatted string
     */
    proto.transform = function (dateString, arg1, arg2, utc) {
        const ctx = this || date;
        return ctx.format(ctx.parse(dateString, arg1), arg2, utc);
    };

    /**
     * Adding years
     * @param {Date} dateObj - A Date object
     * @param {number} years - Number of years to add
     * @param {boolean} [utc] - Calculates as UTC
     * @returns {Date} The Date object after adding the value
     */
    proto.addYears = function (dateObj, years, utc) {
        return (this || date).addMonths(dateObj, years * 12, utc);
    };

    /**
     * Adding months
     * @param {Date} dateObj - A Date object
     * @param {number} months - Number of months to add
     * @param {boolean} [utc] - Calculates as UTC
     * @returns {Date} The Date object after adding the value
     */
    proto.addMonths = function (dateObj, months, utc) {
        var d = new Date(dateObj.getTime());

        if (utc) {
            d.setUTCMonth(d.getUTCMonth() + months);
            if (d.getUTCDate() < dateObj.getUTCDate()) {
                return (this || date).addDays(d, -d.getUTCDate(), utc);
            }
        } else {
            d.setMonth(d.getMonth() + months);
            if (d.getDate() < dateObj.getDate()) {
                return (this || date).addDays(d, -d.getDate(), utc);
            }
        }
        return d;
    };

    /**
     * Adding days
     * @param {Date} dateObj - A Date object
     * @param {number} days - Number of days to add
     * @param {boolean} [utc] - Calculates as UTC
     * @returns {Date} The Date object after adding the value
     */
    proto.addDays = function (dateObj, days, utc) {
        return (this || date).addHours(dateObj, days * 24, utc);
    };

    /**
     * Adding hours
     * @param {Date} dateObj - A Date object
     * @param {number} hours - Number of hours to add
     * @param {boolean} [utc] - Calculates as UTC
     * @returns {Date} The Date object after adding the value
     */
    proto.addHours = function (dateObj, hours, utc) {
        return (this || date).addMinutes(dateObj, hours * 60, utc);
    };

    /**
     * Adding minutes
     * @param {Date} dateObj - A Date object
     * @param {number} minutes - Number of minutes to add
     * @param {boolean} [utc] - Calculates as UTC
     * @returns {Date} The Date object after adding the value
     */
    proto.addMinutes = function (dateObj, minutes, utc) {
        return (this || date).addSeconds(dateObj, minutes * 60, utc);
    };

    /**
     * Adding seconds
     * @param {Date} dateObj - A Date object
     * @param {number} seconds - Number of seconds to add
     * @param {boolean} [utc] - Calculates as UTC
     * @returns {Date} The Date object after adding the value
     */
    proto.addSeconds = function (dateObj, seconds, utc) {
        return (this || date).addMilliseconds(dateObj, seconds * 1000, utc);
    };

    /**
     * Adding milliseconds
     * @param {Date} dateObj - A Date object
     * @param {number} milliseconds - Number of milliseconds to add
     * @param {boolean} [utc] - Calculates as UTC
     * @returns {Date} The Date object after adding the value
     */
    proto.addMilliseconds = function (dateObj, milliseconds, utc) {
        var d = new Date(dateObj.getTime());

        if (utc) {
            d.setUTCMilliseconds(d.getUTCMilliseconds() + milliseconds);
        } else {
            d.setMilliseconds(d.getMilliseconds() + milliseconds);
        }
        return d;
    };

    /**
     * Subtracting two dates (date1 - date2)
     * @param {Date} date1 - A Date object
     * @param {Date} date2 - A Date object
     * @returns {Object} The result object of subtracting date2 from date1
     */
    proto.subtract = function (date1, date2) {
        var delta = date1.getTime() - date2.getTime();

        return {
            toMilliseconds: function () {
                return delta;
            },
            toSeconds: function () {
                return delta / 1000;
            },
            toMinutes: function () {
                return delta / 60000;
            },
            toHours: function () {
                return delta / 3600000;
            },
            toDays: function () {
                return delta / 86400000;
            }
        };
    };

    /**
     * Whether a year is a leap year
     * @param {number} y - A year to check
     * @returns {boolean} Whether the year is a leap year
     */
    proto.isLeapYear = function (y) {
        return (!(y % 4) && !!(y % 100)) || !(y % 400);
    };

    /**
     * Comparison of two dates
     * @param {Date} date1 - A Date object
     * @param {Date} date2 - A Date object
     * @returns {boolean} Whether the two dates are the same day (time is ignored)
     */
    proto.isSameDay = function (date1, date2) {
        return date1.toDateString() === date2.toDateString();
    };

    /**
     * Definition of new locale
     * @param {string} code - A language code
     * @param {Function} locale - A locale installer
     * @returns {void}
     */
    proto.locale = function (code, locale) {
        if (!locales[code]) {
            locales[code] = locale;
        }
    };

    /**
     * Definition of new plugin
     * @param {string} name - A plugin name
     * @param {Function} plugin - A plugin installer
     * @returns {void}
     */
    proto.plugin = function (name, plugin) {
        if (!plugins[name]) {
            plugins[name] = plugin;
        }
    };

    localized_proto = extend(proto);
    date = extend(proto);

    /**
     * Changing locales
     * @param {Function|string} [locale] - A locale installer or language code
     * @returns {string} The current language code
     */
    date.locale = function (locale) {
        var install = typeof locale === 'function' ? locale : date.locale[locale];

        if (!install) {
            return lang;
        }
        lang = install(proto);

        var extension = locales[lang] || {};
        var res = extend(_res, extension.res, true);
        var formatter = extend(_formatter, extension.formatter, true, res);
        var parser = extend(_parser, extension.parser, true, res);

        date._formatter = localized_proto._formatter = formatter;
        date._parser = localized_proto._parser = parser;

        for (var plugin in plugins) {
            date.extend(plugins[plugin]);
        }

        return lang;
    };

    /**
     * Functional extension
     * @param {Object} extension - An extension object
     * @returns {void}
     */
    date.extend = function (extension) {
        var res = extend(date._parser.res, extension.res);
        var extender = extension.extender || {};

        date._formatter = extend(date._formatter, extension.formatter, false, res);
        date._parser = extend(date._parser, extension.parser, false, res);

        for (var key in extender) {
            if (!date[key]) {
                date[key] = extender[key];
            }
        }
    };

    /**
     * Importing plugins
     * @param {Function|string} plugin - A plugin installer or plugin name
     * @returns {void}
     */
    date.plugin = function (plugin) {
        var install = typeof plugin === 'function' ? plugin : date.plugin[plugin];

        if (install) {
            date.extend(plugins[install(proto, localized_proto)] || {});
        }
    };

    var date$1 = date;

    return date$1;

}));


/***/ }),

/***/ "./node_modules/file-saver/dist/FileSaver.min.js":
/*!*******************************************************!*\
  !*** ./node_modules/file-saver/dist/FileSaver.min.js ***!
  \*******************************************************/
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function(a,b){if(true)!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (b),
		__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
		(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));else {}})(this,function(){"use strict";function b(a,b){return"undefined"==typeof b?b={autoBom:!1}:"object"!=typeof b&&(console.warn("Deprecated: Expected third argument to be a object"),b={autoBom:!b}),b.autoBom&&/^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(a.type)?new Blob(["\uFEFF",a],{type:a.type}):a}function c(a,b,c){var d=new XMLHttpRequest;d.open("GET",a),d.responseType="blob",d.onload=function(){g(d.response,b,c)},d.onerror=function(){console.error("could not download file")},d.send()}function d(a){var b=new XMLHttpRequest;b.open("HEAD",a,!1);try{b.send()}catch(a){}return 200<=b.status&&299>=b.status}function e(a){try{a.dispatchEvent(new MouseEvent("click"))}catch(c){var b=document.createEvent("MouseEvents");b.initMouseEvent("click",!0,!0,window,0,0,0,80,20,!1,!1,!1,!1,0,null),a.dispatchEvent(b)}}var f="object"==typeof window&&window.window===window?window:"object"==typeof self&&self.self===self?self:"object"==typeof __webpack_require__.g&&__webpack_require__.g.global===__webpack_require__.g?__webpack_require__.g:void 0,a=f.navigator&&/Macintosh/.test(navigator.userAgent)&&/AppleWebKit/.test(navigator.userAgent)&&!/Safari/.test(navigator.userAgent),g=f.saveAs||("object"!=typeof window||window!==f?function(){}:"download"in HTMLAnchorElement.prototype&&!a?function(b,g,h){var i=f.URL||f.webkitURL,j=document.createElement("a");g=g||b.name||"download",j.download=g,j.rel="noopener","string"==typeof b?(j.href=b,j.origin===location.origin?e(j):d(j.href)?c(b,g,h):e(j,j.target="_blank")):(j.href=i.createObjectURL(b),setTimeout(function(){i.revokeObjectURL(j.href)},4E4),setTimeout(function(){e(j)},0))}:"msSaveOrOpenBlob"in navigator?function(f,g,h){if(g=g||f.name||"download","string"!=typeof f)navigator.msSaveOrOpenBlob(b(f,h),g);else if(d(f))c(f,g,h);else{var i=document.createElement("a");i.href=f,i.target="_blank",setTimeout(function(){e(i)})}}:function(b,d,e,g){if(g=g||open("","_blank"),g&&(g.document.title=g.document.body.innerText="downloading..."),"string"==typeof b)return c(b,d,e);var h="application/octet-stream"===b.type,i=/constructor/i.test(f.HTMLElement)||f.safari,j=/CriOS\/[\d]+/.test(navigator.userAgent);if((j||h&&i||a)&&"undefined"!=typeof FileReader){var k=new FileReader;k.onloadend=function(){var a=k.result;a=j?a:a.replace(/^data:[^;]*;/,"data:attachment/file;"),g?g.location.href=a:location=a,g=null},k.readAsDataURL(b)}else{var l=f.URL||f.webkitURL,m=l.createObjectURL(b);g?g.location=m:location.href=m,g=null,setTimeout(function(){l.revokeObjectURL(m)},4E4)}});f.saveAs=g.saveAs=g, true&&(module.exports=g)});

//# sourceMappingURL=FileSaver.min.js.map

/***/ }),

/***/ "./node_modules/ics/dist/defaults.js":
/*!*******************************************!*\
  !*** ./node_modules/ics/dist/defaults.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;
var _nanoid = __webpack_require__(/*! nanoid */ "./node_modules/nanoid/index.browser.js");
var _utils = __webpack_require__(/*! ./utils */ "./node_modules/ics/dist/utils/index.js");
var defaults = {
  title: 'Untitled event',
  productId: 'adamgibbons/ics',
  method: 'PUBLISH',
  uid: (0, _nanoid.nanoid)(),
  timestamp: (0, _utils.formatDate)(null, 'utc'),
  start: (0, _utils.formatDate)(null, 'utc')
};
var _default = defaults;
exports["default"] = _default;

/***/ }),

/***/ "./node_modules/ics/dist/index.js":
/*!****************************************!*\
  !*** ./node_modules/ics/dist/index.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.convertTimestampToArray = convertTimestampToArray;
exports.createEvent = createEvent;
exports.createEvents = createEvents;
var _nanoid = __webpack_require__(/*! nanoid */ "./node_modules/nanoid/index.browser.js");
var _pipeline = __webpack_require__(/*! ./pipeline */ "./node_modules/ics/dist/pipeline/index.js");
function assignUniqueId(event) {
  event.uid = event.uid || (0, _nanoid.nanoid)();
  return event;
}
function validateAndBuildEvent(event) {
  return (0, _pipeline.validateEvent)((0, _pipeline.buildEvent)(event));
}
function applyInitialFormatting(_ref) {
  var error = _ref.error,
    value = _ref.value;
  if (error) {
    return {
      error: error,
      value: null
    };
  }
  return {
    error: null,
    value: (0, _pipeline.formatEvent)(value)
  };
}
function reformatEventsByPosition(_ref2, idx, list) {
  var error = _ref2.error,
    value = _ref2.value;
  if (error) return {
    error: error,
    value: value
  };
  if (idx === 0) {
    // beginning of list
    return {
      value: value.slice(0, value.indexOf('END:VCALENDAR')),
      error: null
    };
  }
  if (idx === list.length - 1) {
    // end of list
    return {
      value: value.slice(value.indexOf('BEGIN:VEVENT')),
      error: null
    };
  }
  return {
    error: null,
    value: value.slice(value.indexOf('BEGIN:VEVENT'), value.indexOf('END:VEVENT') + 12)
  };
}
function catenateEvents(accumulator, _ref3, idx) {
  var error = _ref3.error,
    value = _ref3.value;
  if (error) {
    accumulator.error = error;
    accumulator.value = null;
    return accumulator;
  }
  if (accumulator.value) {
    accumulator.value = accumulator.value.concat(value);
    return accumulator;
  }
  accumulator.value = value;
  return accumulator;
}
function convertTimestampToArray(timestamp) {
  var inputType = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'local';
  var dateArray = [];
  var d = new Date(timestamp);
  dateArray.push(inputType === 'local' ? d.getFullYear() : d.getUTCFullYear());
  dateArray.push((inputType === 'local' ? d.getMonth() : d.getUTCMonth()) + 1);
  dateArray.push(inputType === 'local' ? d.getDate() : d.getUTCDate());
  dateArray.push(inputType === 'local' ? d.getHours() : d.getUTCHours());
  dateArray.push(inputType === 'local' ? d.getMinutes() : d.getUTCMinutes());
  return dateArray;
}
function createEvent(attributes, cb) {
  if (!attributes) {
    Error('Attributes argument is required');
  }
  assignUniqueId(attributes);
  if (!cb) {
    // No callback, so return error or value in an object
    var _validateAndBuildEven = validateAndBuildEvent(attributes),
      _error = _validateAndBuildEven.error,
      _value = _validateAndBuildEven.value;
    if (_error) return {
      error: _error,
      value: _value
    };
    var event = '';
    try {
      event = (0, _pipeline.formatEvent)(_value);
    } catch (error) {
      return {
        error: error,
        value: null
      };
    }
    return {
      error: null,
      value: event
    };
  }

  // Return a node-style callback
  var _validateAndBuildEven2 = validateAndBuildEvent(attributes),
    error = _validateAndBuildEven2.error,
    value = _validateAndBuildEven2.value;
  if (error) return cb(error);
  return cb(null, (0, _pipeline.formatEvent)(value));
}
function createEvents(events, cb) {
  if (!events) {
    return {
      error: Error('one argument is required'),
      value: null
    };
  }
  if (events.length === 0) {
    var _createEvent = createEvent({
        start: [2000, 10, 5, 5, 0],
        duration: {
          hours: 1
        }
      }),
      _error2 = _createEvent.error,
      dummy = _createEvent.value;
    if (_error2) return {
      error: _error2,
      value: null
    };
    return {
      error: null,
      value: dummy.slice(0, dummy.indexOf('BEGIN:VEVENT')) + dummy.slice(dummy.indexOf('END:VEVENT') + 10 + 2)
    };
  }
  if (events.length === 1) {
    return createEvent(events[0], cb);
  }
  var _events$map$map$map$m = events.map(assignUniqueId).map(validateAndBuildEvent).map(applyInitialFormatting).map(reformatEventsByPosition).reduce(catenateEvents, {
      error: null,
      value: null
    }),
    error = _events$map$map$map$m.error,
    value = _events$map$map$map$m.value;
  if (!cb) {
    return {
      error: error,
      value: value
    };
  }
  return cb(error, value);
}

/***/ }),

/***/ "./node_modules/ics/dist/pipeline/build.js":
/*!*************************************************!*\
  !*** ./node_modules/ics/dist/pipeline/build.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = buildEvent;
var _defaults = _interopRequireDefault(__webpack_require__(/*! ../defaults */ "./node_modules/ics/dist/defaults.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function buildEvent() {
  var attributes = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var title = attributes.title,
    productId = attributes.productId,
    method = attributes.method,
    uid = attributes.uid,
    sequence = attributes.sequence,
    start = attributes.start,
    startType = attributes.startType,
    duration = attributes.duration,
    end = attributes.end,
    description = attributes.description,
    url = attributes.url,
    geo = attributes.geo,
    location = attributes.location,
    status = attributes.status,
    categories = attributes.categories,
    organizer = attributes.organizer,
    attendees = attributes.attendees,
    alarms = attributes.alarms,
    recurrenceRule = attributes.recurrenceRule,
    created = attributes.created,
    lastModified = attributes.lastModified,
    calName = attributes.calName,
    htmlContent = attributes.htmlContent;

  // fill in default values where necessary
  var output = Object.assign({}, _defaults["default"], attributes);

  // remove undefined values
  return Object.entries(output).reduce(function (clean, entry) {
    return typeof entry[1] !== 'undefined' ? Object.assign(clean, _defineProperty({}, entry[0], entry[1])) : clean;
  }, {});
}

/***/ }),

/***/ "./node_modules/ics/dist/pipeline/format.js":
/*!**************************************************!*\
  !*** ./node_modules/ics/dist/pipeline/format.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = formatEvent;
var _utils = __webpack_require__(/*! ../utils */ "./node_modules/ics/dist/utils/index.js");
function formatEvent() {
  var attributes = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var title = attributes.title,
    productId = attributes.productId,
    method = attributes.method,
    uid = attributes.uid,
    sequence = attributes.sequence,
    timestamp = attributes.timestamp,
    start = attributes.start,
    startType = attributes.startType,
    startInputType = attributes.startInputType,
    startOutputType = attributes.startOutputType,
    duration = attributes.duration,
    end = attributes.end,
    endInputType = attributes.endInputType,
    endOutputType = attributes.endOutputType,
    description = attributes.description,
    url = attributes.url,
    geo = attributes.geo,
    location = attributes.location,
    status = attributes.status,
    categories = attributes.categories,
    organizer = attributes.organizer,
    attendees = attributes.attendees,
    alarms = attributes.alarms,
    recurrenceRule = attributes.recurrenceRule,
    busyStatus = attributes.busyStatus,
    classification = attributes.classification,
    created = attributes.created,
    lastModified = attributes.lastModified,
    calName = attributes.calName,
    htmlContent = attributes.htmlContent;
  var icsFormat = '';
  icsFormat += 'BEGIN:VCALENDAR\r\n';
  icsFormat += 'VERSION:2.0\r\n';
  icsFormat += 'CALSCALE:GREGORIAN\r\n';
  icsFormat += (0, _utils.foldLine)("PRODID:".concat(productId)) + '\r\n';
  icsFormat += (0, _utils.foldLine)("METHOD:".concat(method)) + '\r\n';
  icsFormat += calName ? (0, _utils.foldLine)("X-WR-CALNAME:".concat(calName)) + '\r\n' : '';
  icsFormat += "X-PUBLISHED-TTL:PT1H\r\n";
  icsFormat += 'BEGIN:VEVENT\r\n';
  icsFormat += "UID:".concat(uid, "\r\n");
  icsFormat += (0, _utils.foldLine)("SUMMARY:".concat(title ? (0, _utils.setSummary)(title) : title)) + '\r\n';
  icsFormat += "DTSTAMP:".concat(timestamp, "\r\n");

  // All day events like anniversaries must be specified as VALUE type DATE
  icsFormat += "DTSTART".concat(start && start.length == 3 ? ";VALUE=DATE" : "", ":").concat((0, _utils.formatDate)(start, startOutputType || startType, startInputType), "\r\n");

  // End is not required for all day events on single days (like anniversaries)
  if (!end || end.length !== 3 || start.length !== end.length || start.some(function (val, i) {
    return val !== end[i];
  })) {
    if (end) {
      icsFormat += "DTEND".concat(end.length === 3 ? ";VALUE=DATE" : "", ":").concat((0, _utils.formatDate)(end, endOutputType || startOutputType || startType, endInputType || startInputType), "\r\n");
    }
  }
  icsFormat += typeof sequence !== 'undefined' ? "SEQUENCE:".concat(sequence, "\r\n") : '';
  icsFormat += description ? (0, _utils.foldLine)("DESCRIPTION:".concat((0, _utils.setDescription)(description))) + '\r\n' : '';
  icsFormat += url ? (0, _utils.foldLine)("URL:".concat(url)) + '\r\n' : '';
  icsFormat += geo ? (0, _utils.foldLine)("GEO:".concat((0, _utils.setGeolocation)(geo))) + '\r\n' : '';
  icsFormat += location ? (0, _utils.foldLine)("LOCATION:".concat((0, _utils.setLocation)(location))) + '\r\n' : '';
  icsFormat += status ? (0, _utils.foldLine)("STATUS:".concat(status)) + '\r\n' : '';
  icsFormat += categories ? (0, _utils.foldLine)("CATEGORIES:".concat(categories)) + '\r\n' : '';
  icsFormat += organizer ? (0, _utils.foldLine)("ORGANIZER;".concat((0, _utils.setOrganizer)(organizer))) + '\r\n' : '';
  icsFormat += busyStatus ? (0, _utils.foldLine)("X-MICROSOFT-CDO-BUSYSTATUS:".concat(busyStatus)) + '\r\n' : '';
  icsFormat += classification ? (0, _utils.foldLine)("CLASS:".concat(classification)) + '\r\n' : '';
  icsFormat += created ? 'CREATED:' + (0, _utils.formatDate)(created) + '\r\n' : '';
  icsFormat += lastModified ? 'LAST-MODIFIED:' + (0, _utils.formatDate)(lastModified) + '\r\n' : '';
  icsFormat += htmlContent ? (0, _utils.foldLine)("X-ALT-DESC;FMTTYPE=text/html:".concat(htmlContent)) + '\r\n' : '';
  if (attendees) {
    attendees.map(function (attendee) {
      icsFormat += (0, _utils.foldLine)("ATTENDEE;".concat((0, _utils.setContact)(attendee))) + '\r\n';
    });
  }
  icsFormat += recurrenceRule ? "RRULE:".concat(recurrenceRule, "\r\n") : '';
  icsFormat += duration ? "DURATION:".concat((0, _utils.formatDuration)(duration), "\r\n") : '';
  if (alarms) {
    alarms.map(function (alarm) {
      icsFormat += (0, _utils.setAlarm)(alarm);
    });
  }
  icsFormat += "END:VEVENT\r\n";
  icsFormat += "END:VCALENDAR\r\n";
  return icsFormat;
}

/***/ }),

/***/ "./node_modules/ics/dist/pipeline/index.js":
/*!*************************************************!*\
  !*** ./node_modules/ics/dist/pipeline/index.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
Object.defineProperty(exports, "buildEvent", ({
  enumerable: true,
  get: function get() {
    return _build["default"];
  }
}));
Object.defineProperty(exports, "formatEvent", ({
  enumerable: true,
  get: function get() {
    return _format["default"];
  }
}));
Object.defineProperty(exports, "validateEvent", ({
  enumerable: true,
  get: function get() {
    return _validate["default"];
  }
}));
var _build = _interopRequireDefault(__webpack_require__(/*! ./build */ "./node_modules/ics/dist/pipeline/build.js"));
var _format = _interopRequireDefault(__webpack_require__(/*! ./format */ "./node_modules/ics/dist/pipeline/format.js"));
var _validate = _interopRequireDefault(__webpack_require__(/*! ./validate */ "./node_modules/ics/dist/pipeline/validate.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/***/ }),

/***/ "./node_modules/ics/dist/pipeline/validate.js":
/*!****************************************************!*\
  !*** ./node_modules/ics/dist/pipeline/validate.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;
var _schema = _interopRequireDefault(__webpack_require__(/*! ../schema */ "./node_modules/ics/dist/schema/index.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var _default = _schema["default"];
exports["default"] = _default;

/***/ }),

/***/ "./node_modules/ics/dist/schema/index.js":
/*!***********************************************!*\
  !*** ./node_modules/ics/dist/schema/index.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = validateEvent;
var yup = _interopRequireWildcard(__webpack_require__(/*! yup */ "./node_modules/yup/index.esm.js"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
// yup url validation blocks localhost, so use a more flexible regex instead
// taken from https://github.com/jquense/yup/issues/224#issuecomment-417172609
// This does mean that the url validation error is
// "url must match the following: ...." as opposed to "url must be a valid URL"
var urlRegex = /^(?:([a-z0-9+.-]+):\/\/)(?:\S+(?::\S*)?@)?(?:(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*\.?)(?::\d{2,5})?(?:[/?#]\S*)?$/;
var dateTimeSchema = yup.array().min(3).max(7).of(yup.lazy(function (item, options) {
  var itemIndex = options.parent.indexOf(options.value);
  return [yup.number().integer(), yup.number().integer().min(1).max(12), yup.number().integer().min(1).max(31), yup.number().integer().min(0).max(23), yup.number().integer().min(0).max(60), yup.number().integer().min(0).max(60)][itemIndex];
}));
var durationSchema = yup.object().shape({
  before: yup["boolean"](),
  //option to set before alaram
  weeks: yup.number(),
  days: yup.number(),
  hours: yup.number(),
  minutes: yup.number(),
  seconds: yup.number()
}).noUnknown();
var contactSchema = yup.object().shape({
  name: yup.string(),
  email: yup.string().email(),
  rsvp: yup["boolean"](),
  dir: yup.string().matches(urlRegex),
  partstat: yup.string(),
  role: yup.string()
}).noUnknown();
var organizerSchema = yup.object().shape({
  name: yup.string(),
  email: yup.string().email(),
  dir: yup.string(),
  sentBy: yup.string()
}).noUnknown();
var alarmSchema = yup.object().shape({
  action: yup.string().matches(/audio|display|email/).required(),
  trigger: yup.mixed().required(),
  description: yup.string(),
  duration: durationSchema,
  repeat: yup.number(),
  attach: yup.string(),
  attachType: yup.string(),
  summary: yup.string(),
  attendee: contactSchema,
  'x-prop': yup.mixed(),
  'iana-prop': yup.mixed()
}).noUnknown();
var schema = yup.object().shape({
  summary: yup.string(),
  timestamp: yup.mixed(),
  title: yup.string(),
  productId: yup.string(),
  method: yup.string(),
  uid: yup.string().required(),
  sequence: yup.number(),
  start: dateTimeSchema.required(),
  duration: durationSchema,
  startType: yup.string().matches(/utc|local/),
  startInputType: yup.string().matches(/utc|local/),
  startOutputType: yup.string().matches(/utc|local/),
  end: dateTimeSchema,
  endInputType: yup.string().matches(/utc|local/),
  endOutputType: yup.string().matches(/utc|local/),
  description: yup.string(),
  url: yup.string().matches(urlRegex),
  geo: yup.object().shape({
    lat: yup.number(),
    lon: yup.number()
  }),
  location: yup.string(),
  status: yup.string().matches(/TENTATIVE|CANCELLED|CONFIRMED/i),
  categories: yup.array().of(yup.string()),
  organizer: organizerSchema,
  attendees: yup.array().of(contactSchema),
  alarms: yup.array().of(alarmSchema),
  recurrenceRule: yup.string(),
  busyStatus: yup.string().matches(/TENTATIVE|FREE|BUSY|OOF/i),
  classification: yup.string(),
  created: dateTimeSchema,
  lastModified: dateTimeSchema,
  calName: yup.string(),
  htmlContent: yup.string()
}).test('xor', "object should have end or duration", function (val) {
  var hasEnd = !!val.end;
  var hasDuration = !!val.duration;
  return hasEnd && !hasDuration || !hasEnd && hasDuration || !hasEnd && !hasDuration;
}).noUnknown();
function validateEvent(candidate) {
  try {
    var value = schema.validateSync(candidate, {
      abortEarly: false,
      strict: true
    });
    return {
      error: null,
      value: value
    };
  } catch (error) {
    return {
      error: Object.assign({}, error),
      value: undefined
    };
  }
}

/***/ }),

/***/ "./node_modules/ics/dist/utils/fold-line.js":
/*!**************************************************!*\
  !*** ./node_modules/ics/dist/utils/fold-line.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = foldLine;
function foldLine(line) {
  var parts = [];
  var length = 75;
  while (line.length > length) {
    parts.push(line.slice(0, length));
    line = line.slice(length);
    length = 74;
  }
  parts.push(line);
  return parts.join('\r\n\t');
}

/***/ }),

/***/ "./node_modules/ics/dist/utils/format-date.js":
/*!****************************************************!*\
  !*** ./node_modules/ics/dist/utils/format-date.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = formatDate;
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
var pad = function pad(n) {
  return n < 10 ? "0".concat(n) : "".concat(n);
};
function formatDate() {
  var args = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var outputType = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'utc';
  var inputType = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'local';
  if (Array.isArray(args) && args.length === 3) {
    var _args = _slicedToArray(args, 3),
      year = _args[0],
      month = _args[1],
      date = _args[2];
    return "".concat(year).concat(pad(month)).concat(pad(date));
  }
  var outDate = new Date();
  if (Array.isArray(args) && args.length > 0 && args[0]) {
    var _args2 = _slicedToArray(args, 6),
      _year = _args2[0],
      _month = _args2[1],
      _date = _args2[2],
      _args2$ = _args2[3],
      hours = _args2$ === void 0 ? 0 : _args2$,
      _args2$2 = _args2[4],
      minutes = _args2$2 === void 0 ? 0 : _args2$2,
      _args2$3 = _args2[5],
      seconds = _args2$3 === void 0 ? 0 : _args2$3;
    if (inputType === 'local') {
      outDate = new Date(_year, _month - 1, _date, hours, minutes, seconds);
    } else {
      outDate = new Date(Date.UTC(_year, _month - 1, _date, hours, minutes, seconds));
    }
  }
  if (outputType === 'local') {
    return [outDate.getFullYear(), pad(outDate.getMonth() + 1), pad(outDate.getDate()), 'T', pad(outDate.getHours()), pad(outDate.getMinutes()), pad(outDate.getSeconds())].join('');
  }
  return [outDate.getUTCFullYear(), pad(outDate.getUTCMonth() + 1), pad(outDate.getUTCDate()), 'T', pad(outDate.getUTCHours()), pad(outDate.getUTCMinutes()), pad(outDate.getUTCSeconds()), 'Z'].join('');
}

/***/ }),

/***/ "./node_modules/ics/dist/utils/format-duration.js":
/*!********************************************************!*\
  !*** ./node_modules/ics/dist/utils/format-duration.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = formatDuration;
function formatDuration() {
  var attributes = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var weeks = attributes.weeks,
    days = attributes.days,
    hours = attributes.hours,
    minutes = attributes.minutes,
    seconds = attributes.seconds;
  var formattedDuration = 'P';
  formattedDuration += weeks ? "".concat(weeks, "W") : '';
  formattedDuration += days ? "".concat(days, "D") : '';
  formattedDuration += 'T';
  formattedDuration += hours ? "".concat(hours, "H") : '';
  formattedDuration += minutes ? "".concat(minutes, "M") : '';
  formattedDuration += seconds ? "".concat(seconds, "S") : '';
  return formattedDuration;
}

/***/ }),

/***/ "./node_modules/ics/dist/utils/format-text.js":
/*!****************************************************!*\
  !*** ./node_modules/ics/dist/utils/format-text.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = formatText;
function formatText(text) {
  return text.replace(/\\/gm, "\\\\").replace(/\r?\n/gm, "\\n").replace(/;/gm, "\\;").replace(/,/gm, "\\,");
}

/***/ }),

/***/ "./node_modules/ics/dist/utils/index.js":
/*!**********************************************!*\
  !*** ./node_modules/ics/dist/utils/index.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
Object.defineProperty(exports, "foldLine", ({
  enumerable: true,
  get: function get() {
    return _foldLine["default"];
  }
}));
Object.defineProperty(exports, "formatDate", ({
  enumerable: true,
  get: function get() {
    return _formatDate["default"];
  }
}));
Object.defineProperty(exports, "formatDuration", ({
  enumerable: true,
  get: function get() {
    return _formatDuration["default"];
  }
}));
Object.defineProperty(exports, "setAlarm", ({
  enumerable: true,
  get: function get() {
    return _setAlarm["default"];
  }
}));
Object.defineProperty(exports, "setContact", ({
  enumerable: true,
  get: function get() {
    return _setContact["default"];
  }
}));
Object.defineProperty(exports, "setDescription", ({
  enumerable: true,
  get: function get() {
    return _setDescription["default"];
  }
}));
Object.defineProperty(exports, "setGeolocation", ({
  enumerable: true,
  get: function get() {
    return _setGeolocation["default"];
  }
}));
Object.defineProperty(exports, "setLocation", ({
  enumerable: true,
  get: function get() {
    return _setLocation["default"];
  }
}));
Object.defineProperty(exports, "setOrganizer", ({
  enumerable: true,
  get: function get() {
    return _setOrganizer["default"];
  }
}));
Object.defineProperty(exports, "setSummary", ({
  enumerable: true,
  get: function get() {
    return _setSummary["default"];
  }
}));
var _formatDate = _interopRequireDefault(__webpack_require__(/*! ./format-date */ "./node_modules/ics/dist/utils/format-date.js"));
var _setGeolocation = _interopRequireDefault(__webpack_require__(/*! ./set-geolocation */ "./node_modules/ics/dist/utils/set-geolocation.js"));
var _setContact = _interopRequireDefault(__webpack_require__(/*! ./set-contact */ "./node_modules/ics/dist/utils/set-contact.js"));
var _setOrganizer = _interopRequireDefault(__webpack_require__(/*! ./set-organizer */ "./node_modules/ics/dist/utils/set-organizer.js"));
var _setAlarm = _interopRequireDefault(__webpack_require__(/*! ./set-alarm */ "./node_modules/ics/dist/utils/set-alarm.js"));
var _setDescription = _interopRequireDefault(__webpack_require__(/*! ./set-description */ "./node_modules/ics/dist/utils/set-description.js"));
var _setSummary = _interopRequireDefault(__webpack_require__(/*! ./set-summary */ "./node_modules/ics/dist/utils/set-summary.js"));
var _formatDuration = _interopRequireDefault(__webpack_require__(/*! ./format-duration */ "./node_modules/ics/dist/utils/format-duration.js"));
var _foldLine = _interopRequireDefault(__webpack_require__(/*! ./fold-line */ "./node_modules/ics/dist/utils/fold-line.js"));
var _setLocation = _interopRequireDefault(__webpack_require__(/*! ./set-location */ "./node_modules/ics/dist/utils/set-location.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/***/ }),

/***/ "./node_modules/ics/dist/utils/set-alarm.js":
/*!**************************************************!*\
  !*** ./node_modules/ics/dist/utils/set-alarm.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = setAlarm;
var _formatDate = _interopRequireDefault(__webpack_require__(/*! ./format-date */ "./node_modules/ics/dist/utils/format-date.js"));
var _foldLine = _interopRequireDefault(__webpack_require__(/*! ./fold-line */ "./node_modules/ics/dist/utils/fold-line.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function setDuration(_ref) {
  var weeks = _ref.weeks,
    days = _ref.days,
    hours = _ref.hours,
    minutes = _ref.minutes,
    seconds = _ref.seconds;
  var formattedString = 'P';
  formattedString += weeks ? "".concat(weeks, "W") : '';
  formattedString += days ? "".concat(days, "D") : '';
  formattedString += 'T';
  formattedString += hours ? "".concat(hours, "H") : '';
  formattedString += minutes ? "".concat(minutes, "M") : '';
  formattedString += seconds ? "".concat(seconds, "S") : '';
  return formattedString;
}
function setTrigger(trigger) {
  var formattedString = '';
  if (Array.isArray(trigger)) {
    formattedString = "TRIGGER;VALUE=DATE-TIME:".concat((0, _formatDate["default"])(trigger), "\r\n");
  } else {
    var alert = trigger.before ? '-' : '';
    formattedString = "TRIGGER:".concat(alert + setDuration(trigger), "\r\n");
  }
  return formattedString;
}
function setAction(action) {
  return action.toUpperCase();
}
function setAlarm() {
  var attributes = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var action = attributes.action,
    repeat = attributes.repeat,
    description = attributes.description,
    duration = attributes.duration,
    attach = attributes.attach,
    attachType = attributes.attachType,
    trigger = attributes.trigger,
    summary = attributes.summary;
  var formattedString = 'BEGIN:VALARM\r\n';
  formattedString += (0, _foldLine["default"])("ACTION:".concat(setAction(action))) + '\r\n';
  formattedString += repeat ? (0, _foldLine["default"])("REPEAT:".concat(repeat)) + '\r\n' : '';
  formattedString += description ? (0, _foldLine["default"])("DESCRIPTION:".concat(description)) + '\r\n' : '';
  formattedString += duration ? (0, _foldLine["default"])("DURATION:".concat(setDuration(duration))) + '\r\n' : '';
  var attachInfo = attachType ? attachType : 'FMTTYPE=audio/basic';
  formattedString += attach ? (0, _foldLine["default"])("ATTACH;".concat(attachInfo, ":").concat(attach)) + '\r\n' : '';
  formattedString += trigger ? setTrigger(trigger) : '';
  formattedString += summary ? (0, _foldLine["default"])("SUMMARY:".concat(summary)) + '\r\n' : '';
  formattedString += 'END:VALARM\r\n';
  return formattedString;
}

// Example:  A duration of 15 days, 5 hours, and 20 seconds would be:

// P15DT5H0M20S

// A duration of 7 weeks would be:

// P7W

/***/ }),

/***/ "./node_modules/ics/dist/utils/set-contact.js":
/*!****************************************************!*\
  !*** ./node_modules/ics/dist/utils/set-contact.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = setContact;
function setContact(_ref) {
  var name = _ref.name,
    email = _ref.email,
    rsvp = _ref.rsvp,
    dir = _ref.dir,
    partstat = _ref.partstat,
    role = _ref.role;
  var formattedAttendee = '';
  formattedAttendee += rsvp ? 'RSVP=TRUE;' : 'RSVP=FALSE;';
  formattedAttendee += role ? "ROLE=".concat(role, ";") : '';
  formattedAttendee += partstat ? "PARTSTAT=".concat(partstat, ";") : '';
  formattedAttendee += dir ? "DIR=".concat(dir, ";") : '';
  formattedAttendee += 'CN=';
  formattedAttendee += name || 'Unnamed attendee';
  formattedAttendee += email ? ":mailto:".concat(email) : '';
  return formattedAttendee;
}

/***/ }),

/***/ "./node_modules/ics/dist/utils/set-description.js":
/*!********************************************************!*\
  !*** ./node_modules/ics/dist/utils/set-description.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = setDescription;
var _formatText = _interopRequireDefault(__webpack_require__(/*! ./format-text */ "./node_modules/ics/dist/utils/format-text.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function setDescription(description) {
  return (0, _formatText["default"])(description);
}

/***/ }),

/***/ "./node_modules/ics/dist/utils/set-geolocation.js":
/*!********************************************************!*\
  !*** ./node_modules/ics/dist/utils/set-geolocation.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = setGeolocation;
function setGeolocation(_ref) {
  var lat = _ref.lat,
    lon = _ref.lon;
  return "".concat(lat, ";").concat(lon);
}

/***/ }),

/***/ "./node_modules/ics/dist/utils/set-location.js":
/*!*****************************************************!*\
  !*** ./node_modules/ics/dist/utils/set-location.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = setLocation;
var _formatText = _interopRequireDefault(__webpack_require__(/*! ./format-text */ "./node_modules/ics/dist/utils/format-text.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function setLocation(location) {
  return (0, _formatText["default"])(location);
}

/***/ }),

/***/ "./node_modules/ics/dist/utils/set-organizer.js":
/*!******************************************************!*\
  !*** ./node_modules/ics/dist/utils/set-organizer.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = setOrganizer;
function setOrganizer(_ref) {
  var name = _ref.name,
    email = _ref.email,
    dir = _ref.dir,
    sentBy = _ref.sentBy;
  var formattedOrganizer = '';
  formattedOrganizer += dir ? "DIR=\"".concat(dir, "\";") : '';
  formattedOrganizer += sentBy ? "SENT-BY=\"MAILTO:".concat(sentBy, "\";") : '';
  formattedOrganizer += 'CN=';
  formattedOrganizer += name || 'Organizer';
  formattedOrganizer += email ? ":MAILTO:".concat(email) : '';
  return formattedOrganizer;
}

/***/ }),

/***/ "./node_modules/ics/dist/utils/set-summary.js":
/*!****************************************************!*\
  !*** ./node_modules/ics/dist/utils/set-summary.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = setSummary;
var _formatText = _interopRequireDefault(__webpack_require__(/*! ./format-text */ "./node_modules/ics/dist/utils/format-text.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function setSummary(summary) {
  return (0, _formatText["default"])(summary);
}

/***/ }),

/***/ "./node_modules/property-expr/index.js":
/*!*********************************************!*\
  !*** ./node_modules/property-expr/index.js ***!
  \*********************************************/
/***/ ((module) => {

"use strict";
/**
 * Based on Kendo UI Core expression code <https://github.com/telerik/kendo-ui-core#license-information>
 */


function Cache(maxSize) {
  this._maxSize = maxSize
  this.clear()
}
Cache.prototype.clear = function () {
  this._size = 0
  this._values = Object.create(null)
}
Cache.prototype.get = function (key) {
  return this._values[key]
}
Cache.prototype.set = function (key, value) {
  this._size >= this._maxSize && this.clear()
  if (!(key in this._values)) this._size++

  return (this._values[key] = value)
}

var SPLIT_REGEX = /[^.^\]^[]+|(?=\[\]|\.\.)/g,
  DIGIT_REGEX = /^\d+$/,
  LEAD_DIGIT_REGEX = /^\d/,
  SPEC_CHAR_REGEX = /[~`!#$%\^&*+=\-\[\]\\';,/{}|\\":<>\?]/g,
  CLEAN_QUOTES_REGEX = /^\s*(['"]?)(.*?)(\1)\s*$/,
  MAX_CACHE_SIZE = 512

var pathCache = new Cache(MAX_CACHE_SIZE),
  setCache = new Cache(MAX_CACHE_SIZE),
  getCache = new Cache(MAX_CACHE_SIZE)

var config

module.exports = {
  Cache: Cache,

  split: split,

  normalizePath: normalizePath,

  setter: function (path) {
    var parts = normalizePath(path)

    return (
      setCache.get(path) ||
      setCache.set(path, function setter(obj, value) {
        var index = 0
        var len = parts.length
        var data = obj

        while (index < len - 1) {
          var part = parts[index]
          if (
            part === '__proto__' ||
            part === 'constructor' ||
            part === 'prototype'
          ) {
            return obj
          }

          data = data[parts[index++]]
        }
        data[parts[index]] = value
      })
    )
  },

  getter: function (path, safe) {
    var parts = normalizePath(path)
    return (
      getCache.get(path) ||
      getCache.set(path, function getter(data) {
        var index = 0,
          len = parts.length
        while (index < len) {
          if (data != null || !safe) data = data[parts[index++]]
          else return
        }
        return data
      })
    )
  },

  join: function (segments) {
    return segments.reduce(function (path, part) {
      return (
        path +
        (isQuoted(part) || DIGIT_REGEX.test(part)
          ? '[' + part + ']'
          : (path ? '.' : '') + part)
      )
    }, '')
  },

  forEach: function (path, cb, thisArg) {
    forEach(Array.isArray(path) ? path : split(path), cb, thisArg)
  },
}

function normalizePath(path) {
  return (
    pathCache.get(path) ||
    pathCache.set(
      path,
      split(path).map(function (part) {
        return part.replace(CLEAN_QUOTES_REGEX, '$2')
      })
    )
  )
}

function split(path) {
  return path.match(SPLIT_REGEX) || ['']
}

function forEach(parts, iter, thisArg) {
  var len = parts.length,
    part,
    idx,
    isArray,
    isBracket

  for (idx = 0; idx < len; idx++) {
    part = parts[idx]

    if (part) {
      if (shouldBeQuoted(part)) {
        part = '"' + part + '"'
      }

      isBracket = isQuoted(part)
      isArray = !isBracket && /^\d+$/.test(part)

      iter.call(thisArg, part, isBracket, isArray, idx, parts)
    }
  }
}

function isQuoted(str) {
  return (
    typeof str === 'string' && str && ["'", '"'].indexOf(str.charAt(0)) !== -1
  )
}

function hasLeadingNumber(part) {
  return part.match(LEAD_DIGIT_REGEX) && !part.match(DIGIT_REGEX)
}

function hasSpecialChars(part) {
  return SPEC_CHAR_REGEX.test(part)
}

function shouldBeQuoted(part) {
  return !isQuoted(part) && (hasLeadingNumber(part) || hasSpecialChars(part))
}


/***/ }),

/***/ "./node_modules/tiny-case/index.js":
/*!*****************************************!*\
  !*** ./node_modules/tiny-case/index.js ***!
  \*****************************************/
/***/ ((module) => {

const reWords = /[A-Z\xc0-\xd6\xd8-\xde]?[a-z\xdf-\xf6\xf8-\xff]+(?:['’](?:d|ll|m|re|s|t|ve))?(?=[\xac\xb1\xd7\xf7\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\xbf\u2000-\u206f \t\x0b\f\xa0\ufeff\n\r\u2028\u2029\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000]|[A-Z\xc0-\xd6\xd8-\xde]|$)|(?:[A-Z\xc0-\xd6\xd8-\xde]|[^\ud800-\udfff\xac\xb1\xd7\xf7\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\xbf\u2000-\u206f \t\x0b\f\xa0\ufeff\n\r\u2028\u2029\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\d+\u2700-\u27bfa-z\xdf-\xf6\xf8-\xffA-Z\xc0-\xd6\xd8-\xde])+(?:['’](?:D|LL|M|RE|S|T|VE))?(?=[\xac\xb1\xd7\xf7\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\xbf\u2000-\u206f \t\x0b\f\xa0\ufeff\n\r\u2028\u2029\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000]|[A-Z\xc0-\xd6\xd8-\xde](?:[a-z\xdf-\xf6\xf8-\xff]|[^\ud800-\udfff\xac\xb1\xd7\xf7\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\xbf\u2000-\u206f \t\x0b\f\xa0\ufeff\n\r\u2028\u2029\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\d+\u2700-\u27bfa-z\xdf-\xf6\xf8-\xffA-Z\xc0-\xd6\xd8-\xde])|$)|[A-Z\xc0-\xd6\xd8-\xde]?(?:[a-z\xdf-\xf6\xf8-\xff]|[^\ud800-\udfff\xac\xb1\xd7\xf7\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\xbf\u2000-\u206f \t\x0b\f\xa0\ufeff\n\r\u2028\u2029\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\d+\u2700-\u27bfa-z\xdf-\xf6\xf8-\xffA-Z\xc0-\xd6\xd8-\xde])+(?:['’](?:d|ll|m|re|s|t|ve))?|[A-Z\xc0-\xd6\xd8-\xde]+(?:['’](?:D|LL|M|RE|S|T|VE))?|\d*(?:1ST|2ND|3RD|(?![123])\dTH)(?=\b|[a-z_])|\d*(?:1st|2nd|3rd|(?![123])\dth)(?=\b|[A-Z_])|\d+|(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff])[\ufe0e\ufe0f]?(?:[\u0300-\u036f\ufe20-\ufe2f\u20d0-\u20ff]|\ud83c[\udffb-\udfff])?(?:\u200d(?:[^\ud800-\udfff]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff])[\ufe0e\ufe0f]?(?:[\u0300-\u036f\ufe20-\ufe2f\u20d0-\u20ff]|\ud83c[\udffb-\udfff])?)*/g

const words = (str) => str.match(reWords) || []

const upperFirst = (str) => str[0].toUpperCase() + str.slice(1)

const join = (str, d) => words(str).join(d).toLowerCase()

const camelCase = (str) =>
  words(str).reduce(
    (acc, next) =>
      `${acc}${
        !acc
          ? next.toLowerCase()
          : next[0].toUpperCase() + next.slice(1).toLowerCase()
      }`,
    '',
  )

const pascalCase = (str) => upperFirst(camelCase(str))

const snakeCase = (str) => join(str, '_')

const kebabCase = (str) => join(str, '-')

const sentenceCase = (str) => upperFirst(join(str, ' '))

const titleCase = (str) => words(str).map(upperFirst).join(' ')

module.exports = {
  words,
  upperFirst,
  camelCase,
  pascalCase,
  snakeCase,
  kebabCase,
  sentenceCase,
  titleCase,
}


/***/ }),

/***/ "./node_modules/toposort/index.js":
/*!****************************************!*\
  !*** ./node_modules/toposort/index.js ***!
  \****************************************/
/***/ ((module) => {


/**
 * Topological sorting function
 *
 * @param {Array} edges
 * @returns {Array}
 */

module.exports = function(edges) {
  return toposort(uniqueNodes(edges), edges)
}

module.exports.array = toposort

function toposort(nodes, edges) {
  var cursor = nodes.length
    , sorted = new Array(cursor)
    , visited = {}
    , i = cursor
    // Better data structures make algorithm much faster.
    , outgoingEdges = makeOutgoingEdges(edges)
    , nodesHash = makeNodesHash(nodes)

  // check for unknown nodes
  edges.forEach(function(edge) {
    if (!nodesHash.has(edge[0]) || !nodesHash.has(edge[1])) {
      throw new Error('Unknown node. There is an unknown node in the supplied edges.')
    }
  })

  while (i--) {
    if (!visited[i]) visit(nodes[i], i, new Set())
  }

  return sorted

  function visit(node, i, predecessors) {
    if(predecessors.has(node)) {
      var nodeRep
      try {
        nodeRep = ", node was:" + JSON.stringify(node)
      } catch(e) {
        nodeRep = ""
      }
      throw new Error('Cyclic dependency' + nodeRep)
    }

    if (!nodesHash.has(node)) {
      throw new Error('Found unknown node. Make sure to provided all involved nodes. Unknown node: '+JSON.stringify(node))
    }

    if (visited[i]) return;
    visited[i] = true

    var outgoing = outgoingEdges.get(node) || new Set()
    outgoing = Array.from(outgoing)

    if (i = outgoing.length) {
      predecessors.add(node)
      do {
        var child = outgoing[--i]
        visit(child, nodesHash.get(child), predecessors)
      } while (i)
      predecessors.delete(node)
    }

    sorted[--cursor] = node
  }
}

function uniqueNodes(arr){
  var res = new Set()
  for (var i = 0, len = arr.length; i < len; i++) {
    var edge = arr[i]
    res.add(edge[0])
    res.add(edge[1])
  }
  return Array.from(res)
}

function makeOutgoingEdges(arr){
  var edges = new Map()
  for (var i = 0, len = arr.length; i < len; i++) {
    var edge = arr[i]
    if (!edges.has(edge[0])) edges.set(edge[0], new Set())
    if (!edges.has(edge[1])) edges.set(edge[1], new Set())
    edges.get(edge[0]).add(edge[1])
  }
  return edges
}

function makeNodesHash(arr){
  var res = new Map()
  for (var i = 0, len = arr.length; i < len; i++) {
    res.set(arr[i], i)
  }
  return res
}


/***/ }),

/***/ "./node_modules/yup/index.esm.js":
/*!***************************************!*\
  !*** ./node_modules/yup/index.esm.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ArraySchema: () => (/* binding */ ArraySchema),
/* harmony export */   BooleanSchema: () => (/* binding */ BooleanSchema),
/* harmony export */   DateSchema: () => (/* binding */ DateSchema),
/* harmony export */   MixedSchema: () => (/* binding */ MixedSchema),
/* harmony export */   NumberSchema: () => (/* binding */ NumberSchema),
/* harmony export */   ObjectSchema: () => (/* binding */ ObjectSchema),
/* harmony export */   Schema: () => (/* binding */ Schema),
/* harmony export */   StringSchema: () => (/* binding */ StringSchema),
/* harmony export */   TupleSchema: () => (/* binding */ TupleSchema),
/* harmony export */   ValidationError: () => (/* binding */ ValidationError),
/* harmony export */   addMethod: () => (/* binding */ addMethod),
/* harmony export */   array: () => (/* binding */ create$2),
/* harmony export */   bool: () => (/* binding */ create$7),
/* harmony export */   boolean: () => (/* binding */ create$7),
/* harmony export */   date: () => (/* binding */ create$4),
/* harmony export */   defaultLocale: () => (/* binding */ locale),
/* harmony export */   getIn: () => (/* binding */ getIn),
/* harmony export */   isSchema: () => (/* binding */ isSchema),
/* harmony export */   lazy: () => (/* binding */ create),
/* harmony export */   mixed: () => (/* binding */ create$8),
/* harmony export */   number: () => (/* binding */ create$5),
/* harmony export */   object: () => (/* binding */ create$3),
/* harmony export */   printValue: () => (/* binding */ printValue),
/* harmony export */   reach: () => (/* binding */ reach),
/* harmony export */   ref: () => (/* binding */ create$9),
/* harmony export */   setLocale: () => (/* binding */ setLocale),
/* harmony export */   string: () => (/* binding */ create$6),
/* harmony export */   tuple: () => (/* binding */ create$1)
/* harmony export */ });
/* harmony import */ var property_expr__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! property-expr */ "./node_modules/property-expr/index.js");
/* harmony import */ var property_expr__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(property_expr__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var tiny_case__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! tiny-case */ "./node_modules/tiny-case/index.js");
/* harmony import */ var tiny_case__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(tiny_case__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var toposort__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! toposort */ "./node_modules/toposort/index.js");
/* harmony import */ var toposort__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(toposort__WEBPACK_IMPORTED_MODULE_2__);




const toString = Object.prototype.toString;
const errorToString = Error.prototype.toString;
const regExpToString = RegExp.prototype.toString;
const symbolToString = typeof Symbol !== 'undefined' ? Symbol.prototype.toString : () => '';
const SYMBOL_REGEXP = /^Symbol\((.*)\)(.*)$/;
function printNumber(val) {
  if (val != +val) return 'NaN';
  const isNegativeZero = val === 0 && 1 / val < 0;
  return isNegativeZero ? '-0' : '' + val;
}
function printSimpleValue(val, quoteStrings = false) {
  if (val == null || val === true || val === false) return '' + val;
  const typeOf = typeof val;
  if (typeOf === 'number') return printNumber(val);
  if (typeOf === 'string') return quoteStrings ? `"${val}"` : val;
  if (typeOf === 'function') return '[Function ' + (val.name || 'anonymous') + ']';
  if (typeOf === 'symbol') return symbolToString.call(val).replace(SYMBOL_REGEXP, 'Symbol($1)');
  const tag = toString.call(val).slice(8, -1);
  if (tag === 'Date') return isNaN(val.getTime()) ? '' + val : val.toISOString(val);
  if (tag === 'Error' || val instanceof Error) return '[' + errorToString.call(val) + ']';
  if (tag === 'RegExp') return regExpToString.call(val);
  return null;
}
function printValue(value, quoteStrings) {
  let result = printSimpleValue(value, quoteStrings);
  if (result !== null) return result;
  return JSON.stringify(value, function (key, value) {
    let result = printSimpleValue(this[key], quoteStrings);
    if (result !== null) return result;
    return value;
  }, 2);
}

function toArray(value) {
  return value == null ? [] : [].concat(value);
}

let strReg = /\$\{\s*(\w+)\s*\}/g;
class ValidationError extends Error {
  static formatError(message, params) {
    const path = params.label || params.path || 'this';
    if (path !== params.path) params = Object.assign({}, params, {
      path
    });
    if (typeof message === 'string') return message.replace(strReg, (_, key) => printValue(params[key]));
    if (typeof message === 'function') return message(params);
    return message;
  }
  static isError(err) {
    return err && err.name === 'ValidationError';
  }
  constructor(errorOrErrors, value, field, type) {
    super();
    this.value = void 0;
    this.path = void 0;
    this.type = void 0;
    this.errors = void 0;
    this.params = void 0;
    this.inner = void 0;
    this.name = 'ValidationError';
    this.value = value;
    this.path = field;
    this.type = type;
    this.errors = [];
    this.inner = [];
    toArray(errorOrErrors).forEach(err => {
      if (ValidationError.isError(err)) {
        this.errors.push(...err.errors);
        this.inner = this.inner.concat(err.inner.length ? err.inner : err);
      } else {
        this.errors.push(err);
      }
    });
    this.message = this.errors.length > 1 ? `${this.errors.length} errors occurred` : this.errors[0];
    if (Error.captureStackTrace) Error.captureStackTrace(this, ValidationError);
  }
}

let mixed = {
  default: '${path} is invalid',
  required: '${path} is a required field',
  defined: '${path} must be defined',
  notNull: '${path} cannot be null',
  oneOf: '${path} must be one of the following values: ${values}',
  notOneOf: '${path} must not be one of the following values: ${values}',
  notType: ({
    path,
    type,
    value,
    originalValue
  }) => {
    const castMsg = originalValue != null && originalValue !== value ? ` (cast from the value \`${printValue(originalValue, true)}\`).` : '.';
    return type !== 'mixed' ? `${path} must be a \`${type}\` type, ` + `but the final value was: \`${printValue(value, true)}\`` + castMsg : `${path} must match the configured type. ` + `The validated value was: \`${printValue(value, true)}\`` + castMsg;
  }
};
let string = {
  length: '${path} must be exactly ${length} characters',
  min: '${path} must be at least ${min} characters',
  max: '${path} must be at most ${max} characters',
  matches: '${path} must match the following: "${regex}"',
  email: '${path} must be a valid email',
  url: '${path} must be a valid URL',
  uuid: '${path} must be a valid UUID',
  trim: '${path} must be a trimmed string',
  lowercase: '${path} must be a lowercase string',
  uppercase: '${path} must be a upper case string'
};
let number = {
  min: '${path} must be greater than or equal to ${min}',
  max: '${path} must be less than or equal to ${max}',
  lessThan: '${path} must be less than ${less}',
  moreThan: '${path} must be greater than ${more}',
  positive: '${path} must be a positive number',
  negative: '${path} must be a negative number',
  integer: '${path} must be an integer'
};
let date = {
  min: '${path} field must be later than ${min}',
  max: '${path} field must be at earlier than ${max}'
};
let boolean = {
  isValue: '${path} field must be ${value}'
};
let object = {
  noUnknown: '${path} field has unspecified keys: ${unknown}'
};
let array = {
  min: '${path} field must have at least ${min} items',
  max: '${path} field must have less than or equal to ${max} items',
  length: '${path} must have ${length} items'
};
let tuple = {
  notType: params => {
    const {
      path,
      value,
      spec
    } = params;
    const typeLen = spec.types.length;
    if (Array.isArray(value)) {
      if (value.length < typeLen) return `${path} tuple value has too few items, expected a length of ${typeLen} but got ${value.length} for value: \`${printValue(value, true)}\``;
      if (value.length > typeLen) return `${path} tuple value has too many items, expected a length of ${typeLen} but got ${value.length} for value: \`${printValue(value, true)}\``;
    }
    return ValidationError.formatError(mixed.notType, params);
  }
};
var locale = Object.assign(Object.create(null), {
  mixed,
  string,
  number,
  date,
  object,
  array,
  boolean
});

const isSchema = obj => obj && obj.__isYupSchema__;

class Condition {
  static fromOptions(refs, config) {
    if (!config.then && !config.otherwise) throw new TypeError('either `then:` or `otherwise:` is required for `when()` conditions');
    let {
      is,
      then,
      otherwise
    } = config;
    let check = typeof is === 'function' ? is : (...values) => values.every(value => value === is);
    return new Condition(refs, (values, schema) => {
      var _branch;
      let branch = check(...values) ? then : otherwise;
      return (_branch = branch == null ? void 0 : branch(schema)) != null ? _branch : schema;
    });
  }
  constructor(refs, builder) {
    this.fn = void 0;
    this.refs = refs;
    this.refs = refs;
    this.fn = builder;
  }
  resolve(base, options) {
    let values = this.refs.map(ref =>
    // TODO: ? operator here?
    ref.getValue(options == null ? void 0 : options.value, options == null ? void 0 : options.parent, options == null ? void 0 : options.context));
    let schema = this.fn(values, base, options);
    if (schema === undefined ||
    // @ts-ignore this can be base
    schema === base) {
      return base;
    }
    if (!isSchema(schema)) throw new TypeError('conditions must return a schema object');
    return schema.resolve(options);
  }
}

const prefixes = {
  context: '$',
  value: '.'
};
function create$9(key, options) {
  return new Reference(key, options);
}
class Reference {
  constructor(key, options = {}) {
    this.key = void 0;
    this.isContext = void 0;
    this.isValue = void 0;
    this.isSibling = void 0;
    this.path = void 0;
    this.getter = void 0;
    this.map = void 0;
    if (typeof key !== 'string') throw new TypeError('ref must be a string, got: ' + key);
    this.key = key.trim();
    if (key === '') throw new TypeError('ref must be a non-empty string');
    this.isContext = this.key[0] === prefixes.context;
    this.isValue = this.key[0] === prefixes.value;
    this.isSibling = !this.isContext && !this.isValue;
    let prefix = this.isContext ? prefixes.context : this.isValue ? prefixes.value : '';
    this.path = this.key.slice(prefix.length);
    this.getter = this.path && (0,property_expr__WEBPACK_IMPORTED_MODULE_0__.getter)(this.path, true);
    this.map = options.map;
  }
  getValue(value, parent, context) {
    let result = this.isContext ? context : this.isValue ? value : parent;
    if (this.getter) result = this.getter(result || {});
    if (this.map) result = this.map(result);
    return result;
  }

  /**
   *
   * @param {*} value
   * @param {Object} options
   * @param {Object=} options.context
   * @param {Object=} options.parent
   */
  cast(value, options) {
    return this.getValue(value, options == null ? void 0 : options.parent, options == null ? void 0 : options.context);
  }
  resolve() {
    return this;
  }
  describe() {
    return {
      type: 'ref',
      key: this.key
    };
  }
  toString() {
    return `Ref(${this.key})`;
  }
  static isRef(value) {
    return value && value.__isYupRef;
  }
}

// @ts-ignore
Reference.prototype.__isYupRef = true;

const isAbsent = value => value == null;

function createValidation(config) {
  function validate({
    value,
    path = '',
    options,
    originalValue,
    schema
  }, panic, next) {
    const {
      name,
      test,
      params,
      message,
      skipAbsent
    } = config;
    let {
      parent,
      context,
      abortEarly = schema.spec.abortEarly
    } = options;
    function resolve(item) {
      return Reference.isRef(item) ? item.getValue(value, parent, context) : item;
    }
    function createError(overrides = {}) {
      const nextParams = Object.assign({
        value,
        originalValue,
        label: schema.spec.label,
        path: overrides.path || path,
        spec: schema.spec
      }, params, overrides.params);
      for (const key of Object.keys(nextParams)) nextParams[key] = resolve(nextParams[key]);
      const error = new ValidationError(ValidationError.formatError(overrides.message || message, nextParams), value, nextParams.path, overrides.type || name);
      error.params = nextParams;
      return error;
    }
    const invalid = abortEarly ? panic : next;
    let ctx = {
      path,
      parent,
      type: name,
      from: options.from,
      createError,
      resolve,
      options,
      originalValue,
      schema
    };
    const handleResult = validOrError => {
      if (ValidationError.isError(validOrError)) invalid(validOrError);else if (!validOrError) invalid(createError());else next(null);
    };
    const handleError = err => {
      if (ValidationError.isError(err)) invalid(err);else panic(err);
    };
    const shouldSkip = skipAbsent && isAbsent(value);
    if (!options.sync) {
      try {
        Promise.resolve(!shouldSkip ? test.call(ctx, value, ctx) : true).then(handleResult, handleError);
      } catch (err) {
        handleError(err);
      }
      return;
    }
    let result;
    try {
      var _result;
      result = !shouldSkip ? test.call(ctx, value, ctx) : true;
      if (typeof ((_result = result) == null ? void 0 : _result.then) === 'function') {
        throw new Error(`Validation test of type: "${ctx.type}" returned a Promise during a synchronous validate. ` + `This test will finish after the validate call has returned`);
      }
    } catch (err) {
      handleError(err);
      return;
    }
    handleResult(result);
  }
  validate.OPTIONS = config;
  return validate;
}

function getIn(schema, path, value, context = value) {
  let parent, lastPart, lastPartDebug;

  // root path: ''
  if (!path) return {
    parent,
    parentPath: path,
    schema
  };
  (0,property_expr__WEBPACK_IMPORTED_MODULE_0__.forEach)(path, (_part, isBracket, isArray) => {
    let part = isBracket ? _part.slice(1, _part.length - 1) : _part;
    schema = schema.resolve({
      context,
      parent,
      value
    });
    let isTuple = schema.type === 'tuple';
    let idx = isArray ? parseInt(part, 10) : 0;
    if (schema.innerType || isTuple) {
      if (isTuple && !isArray) throw new Error(`Yup.reach cannot implicitly index into a tuple type. the path part "${lastPartDebug}" must contain an index to the tuple element, e.g. "${lastPartDebug}[0]"`);
      if (value && idx >= value.length) {
        throw new Error(`Yup.reach cannot resolve an array item at index: ${_part}, in the path: ${path}. ` + `because there is no value at that index. `);
      }
      parent = value;
      value = value && value[idx];
      schema = isTuple ? schema.spec.types[idx] : schema.innerType;
    }

    // sometimes the array index part of a path doesn't exist: "nested.arr.child"
    // in these cases the current part is the next schema and should be processed
    // in this iteration. For cases where the index signature is included this
    // check will fail and we'll handle the `child` part on the next iteration like normal
    if (!isArray) {
      if (!schema.fields || !schema.fields[part]) throw new Error(`The schema does not contain the path: ${path}. ` + `(failed at: ${lastPartDebug} which is a type: "${schema.type}")`);
      parent = value;
      value = value && value[part];
      schema = schema.fields[part];
    }
    lastPart = part;
    lastPartDebug = isBracket ? '[' + _part + ']' : '.' + _part;
  });
  return {
    schema,
    parent,
    parentPath: lastPart
  };
}
function reach(obj, path, value, context) {
  return getIn(obj, path, value, context).schema;
}

class ReferenceSet extends Set {
  describe() {
    const description = [];
    for (const item of this.values()) {
      description.push(Reference.isRef(item) ? item.describe() : item);
    }
    return description;
  }
  resolveAll(resolve) {
    let result = [];
    for (const item of this.values()) {
      result.push(resolve(item));
    }
    return result;
  }
  clone() {
    return new ReferenceSet(this.values());
  }
  merge(newItems, removeItems) {
    const next = this.clone();
    newItems.forEach(value => next.add(value));
    removeItems.forEach(value => next.delete(value));
    return next;
  }
}

// tweaked from https://github.com/Kelin2025/nanoclone/blob/0abeb7635bda9b68ef2277093f76dbe3bf3948e1/src/index.js
function clone(src, seen = new Map()) {
  if (isSchema(src) || !src || typeof src !== 'object') return src;
  if (seen.has(src)) return seen.get(src);
  let copy;
  if (src instanceof Date) {
    // Date
    copy = new Date(src.getTime());
    seen.set(src, copy);
  } else if (src instanceof RegExp) {
    // RegExp
    copy = new RegExp(src);
    seen.set(src, copy);
  } else if (Array.isArray(src)) {
    // Array
    copy = new Array(src.length);
    seen.set(src, copy);
    for (let i = 0; i < src.length; i++) copy[i] = clone(src[i], seen);
  } else if (src instanceof Map) {
    // Map
    copy = new Map();
    seen.set(src, copy);
    for (const [k, v] of src.entries()) copy.set(k, clone(v, seen));
  } else if (src instanceof Set) {
    // Set
    copy = new Set();
    seen.set(src, copy);
    for (const v of src) copy.add(clone(v, seen));
  } else if (src instanceof Object) {
    // Object
    copy = {};
    seen.set(src, copy);
    for (const [k, v] of Object.entries(src)) copy[k] = clone(v, seen);
  } else {
    throw Error(`Unable to clone ${src}`);
  }
  return copy;
}

class Schema {
  constructor(options) {
    this.type = void 0;
    this.deps = [];
    this.tests = void 0;
    this.transforms = void 0;
    this.conditions = [];
    this._mutate = void 0;
    this.internalTests = {};
    this._whitelist = new ReferenceSet();
    this._blacklist = new ReferenceSet();
    this.exclusiveTests = Object.create(null);
    this._typeCheck = void 0;
    this.spec = void 0;
    this.tests = [];
    this.transforms = [];
    this.withMutation(() => {
      this.typeError(mixed.notType);
    });
    this.type = options.type;
    this._typeCheck = options.check;
    this.spec = Object.assign({
      strip: false,
      strict: false,
      abortEarly: true,
      recursive: true,
      nullable: false,
      optional: true,
      coerce: true
    }, options == null ? void 0 : options.spec);
    this.withMutation(s => {
      s.nonNullable();
    });
  }

  // TODO: remove
  get _type() {
    return this.type;
  }
  clone(spec) {
    if (this._mutate) {
      if (spec) Object.assign(this.spec, spec);
      return this;
    }

    // if the nested value is a schema we can skip cloning, since
    // they are already immutable
    const next = Object.create(Object.getPrototypeOf(this));

    // @ts-expect-error this is readonly
    next.type = this.type;
    next._typeCheck = this._typeCheck;
    next._whitelist = this._whitelist.clone();
    next._blacklist = this._blacklist.clone();
    next.internalTests = Object.assign({}, this.internalTests);
    next.exclusiveTests = Object.assign({}, this.exclusiveTests);

    // @ts-expect-error this is readonly
    next.deps = [...this.deps];
    next.conditions = [...this.conditions];
    next.tests = [...this.tests];
    next.transforms = [...this.transforms];
    next.spec = clone(Object.assign({}, this.spec, spec));
    return next;
  }
  label(label) {
    let next = this.clone();
    next.spec.label = label;
    return next;
  }
  meta(...args) {
    if (args.length === 0) return this.spec.meta;
    let next = this.clone();
    next.spec.meta = Object.assign(next.spec.meta || {}, args[0]);
    return next;
  }
  withMutation(fn) {
    let before = this._mutate;
    this._mutate = true;
    let result = fn(this);
    this._mutate = before;
    return result;
  }
  concat(schema) {
    if (!schema || schema === this) return this;
    if (schema.type !== this.type && this.type !== 'mixed') throw new TypeError(`You cannot \`concat()\` schema's of different types: ${this.type} and ${schema.type}`);
    let base = this;
    let combined = schema.clone();
    const mergedSpec = Object.assign({}, base.spec, combined.spec);
    combined.spec = mergedSpec;
    combined.internalTests = Object.assign({}, base.internalTests, combined.internalTests);

    // manually merge the blacklist/whitelist (the other `schema` takes
    // precedence in case of conflicts)
    combined._whitelist = base._whitelist.merge(schema._whitelist, schema._blacklist);
    combined._blacklist = base._blacklist.merge(schema._blacklist, schema._whitelist);

    // start with the current tests
    combined.tests = base.tests;
    combined.exclusiveTests = base.exclusiveTests;

    // manually add the new tests to ensure
    // the deduping logic is consistent
    combined.withMutation(next => {
      schema.tests.forEach(fn => {
        next.test(fn.OPTIONS);
      });
    });
    combined.transforms = [...base.transforms, ...combined.transforms];
    return combined;
  }
  isType(v) {
    if (v == null) {
      if (this.spec.nullable && v === null) return true;
      if (this.spec.optional && v === undefined) return true;
      return false;
    }
    return this._typeCheck(v);
  }
  resolve(options) {
    let schema = this;
    if (schema.conditions.length) {
      let conditions = schema.conditions;
      schema = schema.clone();
      schema.conditions = [];
      schema = conditions.reduce((prevSchema, condition) => condition.resolve(prevSchema, options), schema);
      schema = schema.resolve(options);
    }
    return schema;
  }
  resolveOptions(options) {
    var _options$strict, _options$abortEarly, _options$recursive;
    return Object.assign({}, options, {
      from: options.from || [],
      strict: (_options$strict = options.strict) != null ? _options$strict : this.spec.strict,
      abortEarly: (_options$abortEarly = options.abortEarly) != null ? _options$abortEarly : this.spec.abortEarly,
      recursive: (_options$recursive = options.recursive) != null ? _options$recursive : this.spec.recursive
    });
  }

  /**
   * Run the configured transform pipeline over an input value.
   */

  cast(value, options = {}) {
    let resolvedSchema = this.resolve(Object.assign({
      value
    }, options));
    let allowOptionality = options.assert === 'ignore-optionality';
    let result = resolvedSchema._cast(value, options);
    if (options.assert !== false && !resolvedSchema.isType(result)) {
      if (allowOptionality && isAbsent(result)) {
        return result;
      }
      let formattedValue = printValue(value);
      let formattedResult = printValue(result);
      throw new TypeError(`The value of ${options.path || 'field'} could not be cast to a value ` + `that satisfies the schema type: "${resolvedSchema.type}". \n\n` + `attempted value: ${formattedValue} \n` + (formattedResult !== formattedValue ? `result of cast: ${formattedResult}` : ''));
    }
    return result;
  }
  _cast(rawValue, options) {
    let value = rawValue === undefined ? rawValue : this.transforms.reduce((prevValue, fn) => fn.call(this, prevValue, rawValue, this), rawValue);
    if (value === undefined) {
      value = this.getDefault(options);
    }
    return value;
  }
  _validate(_value, options = {}, panic, next) {
    let {
      path,
      originalValue = _value,
      strict = this.spec.strict
    } = options;
    let value = _value;
    if (!strict) {
      value = this._cast(value, Object.assign({
        assert: false
      }, options));
    }
    let initialTests = [];
    for (let test of Object.values(this.internalTests)) {
      if (test) initialTests.push(test);
    }
    this.runTests({
      path,
      value,
      originalValue,
      options,
      tests: initialTests
    }, panic, initialErrors => {
      // even if we aren't ending early we can't proceed further if the types aren't correct
      if (initialErrors.length) {
        return next(initialErrors, value);
      }
      this.runTests({
        path,
        value,
        originalValue,
        options,
        tests: this.tests
      }, panic, next);
    });
  }

  /**
   * Executes a set of validations, either schema, produced Tests or a nested
   * schema validate result.
   */
  runTests(runOptions, panic, next) {
    let fired = false;
    let {
      tests,
      value,
      originalValue,
      path,
      options
    } = runOptions;
    let panicOnce = arg => {
      if (fired) return;
      fired = true;
      panic(arg, value);
    };
    let nextOnce = arg => {
      if (fired) return;
      fired = true;
      next(arg, value);
    };
    let count = tests.length;
    let nestedErrors = [];
    if (!count) return nextOnce([]);
    let args = {
      value,
      originalValue,
      path,
      options,
      schema: this
    };
    for (let i = 0; i < tests.length; i++) {
      const test = tests[i];
      test(args, panicOnce, function finishTestRun(err) {
        if (err) {
          nestedErrors = nestedErrors.concat(err);
        }
        if (--count <= 0) {
          nextOnce(nestedErrors);
        }
      });
    }
  }
  asNestedTest({
    key,
    index,
    parent,
    parentPath,
    originalParent,
    options
  }) {
    const k = key != null ? key : index;
    if (k == null) {
      throw TypeError('Must include `key` or `index` for nested validations');
    }
    const isIndex = typeof k === 'number';
    let value = parent[k];
    const testOptions = Object.assign({}, options, {
      // Nested validations fields are always strict:
      //    1. parent isn't strict so the casting will also have cast inner values
      //    2. parent is strict in which case the nested values weren't cast either
      strict: true,
      parent,
      value,
      originalValue: originalParent[k],
      // FIXME: tests depend on `index` being passed around deeply,
      //   we should not let the options.key/index bleed through
      key: undefined,
      // index: undefined,
      [isIndex ? 'index' : 'key']: k,
      path: isIndex || k.includes('.') ? `${parentPath || ''}[${value ? k : `"${k}"`}]` : (parentPath ? `${parentPath}.` : '') + key
    });
    return (_, panic, next) => this.resolve(testOptions)._validate(value, testOptions, panic, next);
  }
  validate(value, options) {
    let schema = this.resolve(Object.assign({}, options, {
      value
    }));
    return new Promise((resolve, reject) => schema._validate(value, options, (error, parsed) => {
      if (ValidationError.isError(error)) error.value = parsed;
      reject(error);
    }, (errors, validated) => {
      if (errors.length) reject(new ValidationError(errors, validated));else resolve(validated);
    }));
  }
  validateSync(value, options) {
    let schema = this.resolve(Object.assign({}, options, {
      value
    }));
    let result;
    schema._validate(value, Object.assign({}, options, {
      sync: true
    }), (error, parsed) => {
      if (ValidationError.isError(error)) error.value = parsed;
      throw error;
    }, (errors, validated) => {
      if (errors.length) throw new ValidationError(errors, value);
      result = validated;
    });
    return result;
  }
  isValid(value, options) {
    return this.validate(value, options).then(() => true, err => {
      if (ValidationError.isError(err)) return false;
      throw err;
    });
  }
  isValidSync(value, options) {
    try {
      this.validateSync(value, options);
      return true;
    } catch (err) {
      if (ValidationError.isError(err)) return false;
      throw err;
    }
  }
  _getDefault(options) {
    let defaultValue = this.spec.default;
    if (defaultValue == null) {
      return defaultValue;
    }
    return typeof defaultValue === 'function' ? defaultValue.call(this, options) : clone(defaultValue);
  }
  getDefault(options
  // If schema is defaulted we know it's at least not undefined
  ) {
    let schema = this.resolve(options || {});
    return schema._getDefault(options);
  }
  default(def) {
    if (arguments.length === 0) {
      return this._getDefault();
    }
    let next = this.clone({
      default: def
    });
    return next;
  }
  strict(isStrict = true) {
    return this.clone({
      strict: isStrict
    });
  }
  nullability(nullable, message) {
    const next = this.clone({
      nullable
    });
    next.internalTests.nullable = createValidation({
      message,
      name: 'nullable',
      test(value) {
        return value === null ? this.schema.spec.nullable : true;
      }
    });
    return next;
  }
  optionality(optional, message) {
    const next = this.clone({
      optional
    });
    next.internalTests.optionality = createValidation({
      message,
      name: 'optionality',
      test(value) {
        return value === undefined ? this.schema.spec.optional : true;
      }
    });
    return next;
  }
  optional() {
    return this.optionality(true);
  }
  defined(message = mixed.defined) {
    return this.optionality(false, message);
  }
  nullable() {
    return this.nullability(true);
  }
  nonNullable(message = mixed.notNull) {
    return this.nullability(false, message);
  }
  required(message = mixed.required) {
    return this.clone().withMutation(next => next.nonNullable(message).defined(message));
  }
  notRequired() {
    return this.clone().withMutation(next => next.nullable().optional());
  }
  transform(fn) {
    let next = this.clone();
    next.transforms.push(fn);
    return next;
  }

  /**
   * Adds a test function to the schema's queue of tests.
   * tests can be exclusive or non-exclusive.
   *
   * - exclusive tests, will replace any existing tests of the same name.
   * - non-exclusive: can be stacked
   *
   * If a non-exclusive test is added to a schema with an exclusive test of the same name
   * the exclusive test is removed and further tests of the same name will be stacked.
   *
   * If an exclusive test is added to a schema with non-exclusive tests of the same name
   * the previous tests are removed and further tests of the same name will replace each other.
   */

  test(...args) {
    let opts;
    if (args.length === 1) {
      if (typeof args[0] === 'function') {
        opts = {
          test: args[0]
        };
      } else {
        opts = args[0];
      }
    } else if (args.length === 2) {
      opts = {
        name: args[0],
        test: args[1]
      };
    } else {
      opts = {
        name: args[0],
        message: args[1],
        test: args[2]
      };
    }
    if (opts.message === undefined) opts.message = mixed.default;
    if (typeof opts.test !== 'function') throw new TypeError('`test` is a required parameters');
    let next = this.clone();
    let validate = createValidation(opts);
    let isExclusive = opts.exclusive || opts.name && next.exclusiveTests[opts.name] === true;
    if (opts.exclusive) {
      if (!opts.name) throw new TypeError('Exclusive tests must provide a unique `name` identifying the test');
    }
    if (opts.name) next.exclusiveTests[opts.name] = !!opts.exclusive;
    next.tests = next.tests.filter(fn => {
      if (fn.OPTIONS.name === opts.name) {
        if (isExclusive) return false;
        if (fn.OPTIONS.test === validate.OPTIONS.test) return false;
      }
      return true;
    });
    next.tests.push(validate);
    return next;
  }
  when(keys, options) {
    if (!Array.isArray(keys) && typeof keys !== 'string') {
      options = keys;
      keys = '.';
    }
    let next = this.clone();
    let deps = toArray(keys).map(key => new Reference(key));
    deps.forEach(dep => {
      // @ts-ignore readonly array
      if (dep.isSibling) next.deps.push(dep.key);
    });
    next.conditions.push(typeof options === 'function' ? new Condition(deps, options) : Condition.fromOptions(deps, options));
    return next;
  }
  typeError(message) {
    let next = this.clone();
    next.internalTests.typeError = createValidation({
      message,
      name: 'typeError',
      skipAbsent: true,
      test(value) {
        if (!this.schema._typeCheck(value)) return this.createError({
          params: {
            type: this.schema.type
          }
        });
        return true;
      }
    });
    return next;
  }
  oneOf(enums, message = mixed.oneOf) {
    let next = this.clone();
    enums.forEach(val => {
      next._whitelist.add(val);
      next._blacklist.delete(val);
    });
    next.internalTests.whiteList = createValidation({
      message,
      name: 'oneOf',
      skipAbsent: true,
      test(value) {
        let valids = this.schema._whitelist;
        let resolved = valids.resolveAll(this.resolve);
        return resolved.includes(value) ? true : this.createError({
          params: {
            values: Array.from(valids).join(', '),
            resolved
          }
        });
      }
    });
    return next;
  }
  notOneOf(enums, message = mixed.notOneOf) {
    let next = this.clone();
    enums.forEach(val => {
      next._blacklist.add(val);
      next._whitelist.delete(val);
    });
    next.internalTests.blacklist = createValidation({
      message,
      name: 'notOneOf',
      test(value) {
        let invalids = this.schema._blacklist;
        let resolved = invalids.resolveAll(this.resolve);
        if (resolved.includes(value)) return this.createError({
          params: {
            values: Array.from(invalids).join(', '),
            resolved
          }
        });
        return true;
      }
    });
    return next;
  }
  strip(strip = true) {
    let next = this.clone();
    next.spec.strip = strip;
    return next;
  }

  /**
   * Return a serialized description of the schema including validations, flags, types etc.
   *
   * @param options Provide any needed context for resolving runtime schema alterations (lazy, when conditions, etc).
   */
  describe(options) {
    const next = (options ? this.resolve(options) : this).clone();
    const {
      label,
      meta,
      optional,
      nullable
    } = next.spec;
    const description = {
      meta,
      label,
      optional,
      nullable,
      default: next.getDefault(options),
      type: next.type,
      oneOf: next._whitelist.describe(),
      notOneOf: next._blacklist.describe(),
      tests: next.tests.map(fn => ({
        name: fn.OPTIONS.name,
        params: fn.OPTIONS.params
      })).filter((n, idx, list) => list.findIndex(c => c.name === n.name) === idx)
    };
    return description;
  }
}
// @ts-expect-error
Schema.prototype.__isYupSchema__ = true;
for (const method of ['validate', 'validateSync']) Schema.prototype[`${method}At`] = function (path, value, options = {}) {
  const {
    parent,
    parentPath,
    schema
  } = getIn(this, path, value, options.context);
  return schema[method](parent && parent[parentPath], Object.assign({}, options, {
    parent,
    path
  }));
};
for (const alias of ['equals', 'is']) Schema.prototype[alias] = Schema.prototype.oneOf;
for (const alias of ['not', 'nope']) Schema.prototype[alias] = Schema.prototype.notOneOf;

const returnsTrue = () => true;
function create$8(spec) {
  return new MixedSchema(spec);
}
class MixedSchema extends Schema {
  constructor(spec) {
    super(typeof spec === 'function' ? {
      type: 'mixed',
      check: spec
    } : Object.assign({
      type: 'mixed',
      check: returnsTrue
    }, spec));
  }
}
create$8.prototype = MixedSchema.prototype;

function create$7() {
  return new BooleanSchema();
}
class BooleanSchema extends Schema {
  constructor() {
    super({
      type: 'boolean',
      check(v) {
        if (v instanceof Boolean) v = v.valueOf();
        return typeof v === 'boolean';
      }
    });
    this.withMutation(() => {
      this.transform((value, _raw, ctx) => {
        if (ctx.spec.coerce && !ctx.isType(value)) {
          if (/^(true|1)$/i.test(String(value))) return true;
          if (/^(false|0)$/i.test(String(value))) return false;
        }
        return value;
      });
    });
  }
  isTrue(message = boolean.isValue) {
    return this.test({
      message,
      name: 'is-value',
      exclusive: true,
      params: {
        value: 'true'
      },
      test(value) {
        return isAbsent(value) || value === true;
      }
    });
  }
  isFalse(message = boolean.isValue) {
    return this.test({
      message,
      name: 'is-value',
      exclusive: true,
      params: {
        value: 'false'
      },
      test(value) {
        return isAbsent(value) || value === false;
      }
    });
  }
  default(def) {
    return super.default(def);
  }
  defined(msg) {
    return super.defined(msg);
  }
  optional() {
    return super.optional();
  }
  required(msg) {
    return super.required(msg);
  }
  notRequired() {
    return super.notRequired();
  }
  nullable() {
    return super.nullable();
  }
  nonNullable(msg) {
    return super.nonNullable(msg);
  }
  strip(v) {
    return super.strip(v);
  }
}
create$7.prototype = BooleanSchema.prototype;

// Taken from HTML spec: https://html.spec.whatwg.org/multipage/input.html#valid-e-mail-address
let rEmail =
// eslint-disable-next-line
/^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
let rUrl =
// eslint-disable-next-line
/^((https?|ftp):)?\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i;

// eslint-disable-next-line
let rUUID = /^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i;
let isTrimmed = value => isAbsent(value) || value === value.trim();
let objStringTag = {}.toString();
function create$6() {
  return new StringSchema();
}
class StringSchema extends Schema {
  constructor() {
    super({
      type: 'string',
      check(value) {
        if (value instanceof String) value = value.valueOf();
        return typeof value === 'string';
      }
    });
    this.withMutation(() => {
      this.transform((value, _raw, ctx) => {
        if (!ctx.spec.coerce || ctx.isType(value)) return value;

        // don't ever convert arrays
        if (Array.isArray(value)) return value;
        const strValue = value != null && value.toString ? value.toString() : value;

        // no one wants plain objects converted to [Object object]
        if (strValue === objStringTag) return value;
        return strValue;
      });
    });
  }
  required(message) {
    return super.required(message).withMutation(schema => schema.test({
      message: message || mixed.required,
      name: 'required',
      skipAbsent: true,
      test: value => !!value.length
    }));
  }
  notRequired() {
    return super.notRequired().withMutation(schema => {
      schema.tests = schema.tests.filter(t => t.OPTIONS.name !== 'required');
      return schema;
    });
  }
  length(length, message = string.length) {
    return this.test({
      message,
      name: 'length',
      exclusive: true,
      params: {
        length
      },
      skipAbsent: true,
      test(value) {
        return value.length === this.resolve(length);
      }
    });
  }
  min(min, message = string.min) {
    return this.test({
      message,
      name: 'min',
      exclusive: true,
      params: {
        min
      },
      skipAbsent: true,
      test(value) {
        return value.length >= this.resolve(min);
      }
    });
  }
  max(max, message = string.max) {
    return this.test({
      name: 'max',
      exclusive: true,
      message,
      params: {
        max
      },
      skipAbsent: true,
      test(value) {
        return value.length <= this.resolve(max);
      }
    });
  }
  matches(regex, options) {
    let excludeEmptyString = false;
    let message;
    let name;
    if (options) {
      if (typeof options === 'object') {
        ({
          excludeEmptyString = false,
          message,
          name
        } = options);
      } else {
        message = options;
      }
    }
    return this.test({
      name: name || 'matches',
      message: message || string.matches,
      params: {
        regex
      },
      skipAbsent: true,
      test: value => value === '' && excludeEmptyString || value.search(regex) !== -1
    });
  }
  email(message = string.email) {
    return this.matches(rEmail, {
      name: 'email',
      message,
      excludeEmptyString: true
    });
  }
  url(message = string.url) {
    return this.matches(rUrl, {
      name: 'url',
      message,
      excludeEmptyString: true
    });
  }
  uuid(message = string.uuid) {
    return this.matches(rUUID, {
      name: 'uuid',
      message,
      excludeEmptyString: false
    });
  }

  //-- transforms --
  ensure() {
    return this.default('').transform(val => val === null ? '' : val);
  }
  trim(message = string.trim) {
    return this.transform(val => val != null ? val.trim() : val).test({
      message,
      name: 'trim',
      test: isTrimmed
    });
  }
  lowercase(message = string.lowercase) {
    return this.transform(value => !isAbsent(value) ? value.toLowerCase() : value).test({
      message,
      name: 'string_case',
      exclusive: true,
      skipAbsent: true,
      test: value => isAbsent(value) || value === value.toLowerCase()
    });
  }
  uppercase(message = string.uppercase) {
    return this.transform(value => !isAbsent(value) ? value.toUpperCase() : value).test({
      message,
      name: 'string_case',
      exclusive: true,
      skipAbsent: true,
      test: value => isAbsent(value) || value === value.toUpperCase()
    });
  }
}
create$6.prototype = StringSchema.prototype;

//
// String Interfaces
//

let isNaN$1 = value => value != +value;
function create$5() {
  return new NumberSchema();
}
class NumberSchema extends Schema {
  constructor() {
    super({
      type: 'number',
      check(value) {
        if (value instanceof Number) value = value.valueOf();
        return typeof value === 'number' && !isNaN$1(value);
      }
    });
    this.withMutation(() => {
      this.transform((value, _raw, ctx) => {
        if (!ctx.spec.coerce) return value;
        let parsed = value;
        if (typeof parsed === 'string') {
          parsed = parsed.replace(/\s/g, '');
          if (parsed === '') return NaN;
          // don't use parseFloat to avoid positives on alpha-numeric strings
          parsed = +parsed;
        }

        // null -> NaN isn't useful; treat all nulls as null and let it fail on
        // nullability check vs TypeErrors
        if (ctx.isType(parsed) || parsed === null) return parsed;
        return parseFloat(parsed);
      });
    });
  }
  min(min, message = number.min) {
    return this.test({
      message,
      name: 'min',
      exclusive: true,
      params: {
        min
      },
      skipAbsent: true,
      test(value) {
        return value >= this.resolve(min);
      }
    });
  }
  max(max, message = number.max) {
    return this.test({
      message,
      name: 'max',
      exclusive: true,
      params: {
        max
      },
      skipAbsent: true,
      test(value) {
        return value <= this.resolve(max);
      }
    });
  }
  lessThan(less, message = number.lessThan) {
    return this.test({
      message,
      name: 'max',
      exclusive: true,
      params: {
        less
      },
      skipAbsent: true,
      test(value) {
        return value < this.resolve(less);
      }
    });
  }
  moreThan(more, message = number.moreThan) {
    return this.test({
      message,
      name: 'min',
      exclusive: true,
      params: {
        more
      },
      skipAbsent: true,
      test(value) {
        return value > this.resolve(more);
      }
    });
  }
  positive(msg = number.positive) {
    return this.moreThan(0, msg);
  }
  negative(msg = number.negative) {
    return this.lessThan(0, msg);
  }
  integer(message = number.integer) {
    return this.test({
      name: 'integer',
      message,
      skipAbsent: true,
      test: val => Number.isInteger(val)
    });
  }
  truncate() {
    return this.transform(value => !isAbsent(value) ? value | 0 : value);
  }
  round(method) {
    var _method;
    let avail = ['ceil', 'floor', 'round', 'trunc'];
    method = ((_method = method) == null ? void 0 : _method.toLowerCase()) || 'round';

    // this exists for symemtry with the new Math.trunc
    if (method === 'trunc') return this.truncate();
    if (avail.indexOf(method.toLowerCase()) === -1) throw new TypeError('Only valid options for round() are: ' + avail.join(', '));
    return this.transform(value => !isAbsent(value) ? Math[method](value) : value);
  }
}
create$5.prototype = NumberSchema.prototype;

//
// Number Interfaces
//

/* eslint-disable */
/**
 *
 * Date.parse with progressive enhancement for ISO 8601 <https://github.com/csnover/js-iso8601>
 * NON-CONFORMANT EDITION.
 * © 2011 Colin Snover <http://zetafleet.com>
 * Released under MIT license.
 */

//              1 YYYY                 2 MM        3 DD              4 HH     5 mm        6 ss            7 msec         8 Z 9 ±    10 tzHH    11 tzmm
var isoReg = /^(\d{4}|[+\-]\d{6})(?:-?(\d{2})(?:-?(\d{2}))?)?(?:[ T]?(\d{2}):?(\d{2})(?::?(\d{2})(?:[,\.](\d{1,}))?)?(?:(Z)|([+\-])(\d{2})(?::?(\d{2}))?)?)?$/;
function parseIsoDate(date) {
  var numericKeys = [1, 4, 5, 6, 7, 10, 11],
    minutesOffset = 0,
    timestamp,
    struct;
  if (struct = isoReg.exec(date)) {
    // avoid NaN timestamps caused by “undefined” values being passed to Date.UTC
    for (var i = 0, k; k = numericKeys[i]; ++i) struct[k] = +struct[k] || 0;

    // allow undefined days and months
    struct[2] = (+struct[2] || 1) - 1;
    struct[3] = +struct[3] || 1;

    // allow arbitrary sub-second precision beyond milliseconds
    struct[7] = struct[7] ? String(struct[7]).substr(0, 3) : 0;

    // timestamps without timezone identifiers should be considered local time
    if ((struct[8] === undefined || struct[8] === '') && (struct[9] === undefined || struct[9] === '')) timestamp = +new Date(struct[1], struct[2], struct[3], struct[4], struct[5], struct[6], struct[7]);else {
      if (struct[8] !== 'Z' && struct[9] !== undefined) {
        minutesOffset = struct[10] * 60 + struct[11];
        if (struct[9] === '+') minutesOffset = 0 - minutesOffset;
      }
      timestamp = Date.UTC(struct[1], struct[2], struct[3], struct[4], struct[5] + minutesOffset, struct[6], struct[7]);
    }
  } else timestamp = Date.parse ? Date.parse(date) : NaN;
  return timestamp;
}

// @ts-ignore
let invalidDate = new Date('');
let isDate = obj => Object.prototype.toString.call(obj) === '[object Date]';
function create$4() {
  return new DateSchema();
}
class DateSchema extends Schema {
  constructor() {
    super({
      type: 'date',
      check(v) {
        return isDate(v) && !isNaN(v.getTime());
      }
    });
    this.withMutation(() => {
      this.transform((value, _raw, ctx) => {
        // null -> InvalidDate isn't useful; treat all nulls as null and let it fail on
        // nullability check vs TypeErrors
        if (!ctx.spec.coerce || ctx.isType(value) || value === null) return value;
        value = parseIsoDate(value);

        // 0 is a valid timestamp equivalent to 1970-01-01T00:00:00Z(unix epoch) or before.
        return !isNaN(value) ? new Date(value) : DateSchema.INVALID_DATE;
      });
    });
  }
  prepareParam(ref, name) {
    let param;
    if (!Reference.isRef(ref)) {
      let cast = this.cast(ref);
      if (!this._typeCheck(cast)) throw new TypeError(`\`${name}\` must be a Date or a value that can be \`cast()\` to a Date`);
      param = cast;
    } else {
      param = ref;
    }
    return param;
  }
  min(min, message = date.min) {
    let limit = this.prepareParam(min, 'min');
    return this.test({
      message,
      name: 'min',
      exclusive: true,
      params: {
        min
      },
      skipAbsent: true,
      test(value) {
        return value >= this.resolve(limit);
      }
    });
  }
  max(max, message = date.max) {
    let limit = this.prepareParam(max, 'max');
    return this.test({
      message,
      name: 'max',
      exclusive: true,
      params: {
        max
      },
      skipAbsent: true,
      test(value) {
        return value <= this.resolve(limit);
      }
    });
  }
}
DateSchema.INVALID_DATE = invalidDate;
create$4.prototype = DateSchema.prototype;
create$4.INVALID_DATE = invalidDate;

// @ts-expect-error
function sortFields(fields, excludedEdges = []) {
  let edges = [];
  let nodes = new Set();
  let excludes = new Set(excludedEdges.map(([a, b]) => `${a}-${b}`));
  function addNode(depPath, key) {
    let node = (0,property_expr__WEBPACK_IMPORTED_MODULE_0__.split)(depPath)[0];
    nodes.add(node);
    if (!excludes.has(`${key}-${node}`)) edges.push([key, node]);
  }
  for (const key of Object.keys(fields)) {
    let value = fields[key];
    nodes.add(key);
    if (Reference.isRef(value) && value.isSibling) addNode(value.path, key);else if (isSchema(value) && 'deps' in value) value.deps.forEach(path => addNode(path, key));
  }
  return toposort__WEBPACK_IMPORTED_MODULE_2___default().array(Array.from(nodes), edges).reverse();
}

function findIndex(arr, err) {
  let idx = Infinity;
  arr.some((key, ii) => {
    var _err$path;
    if ((_err$path = err.path) != null && _err$path.includes(key)) {
      idx = ii;
      return true;
    }
  });
  return idx;
}
function sortByKeyOrder(keys) {
  return (a, b) => {
    return findIndex(keys, a) - findIndex(keys, b);
  };
}

const parseJson = (value, _, ctx) => {
  if (typeof value !== 'string') {
    return value;
  }
  let parsed = value;
  try {
    parsed = JSON.parse(value);
  } catch (err) {
    /* */
  }
  return ctx.isType(parsed) ? parsed : value;
};

// @ts-ignore
function deepPartial(schema) {
  if ('fields' in schema) {
    const partial = {};
    for (const [key, fieldSchema] of Object.entries(schema.fields)) {
      partial[key] = deepPartial(fieldSchema);
    }
    return schema.setFields(partial);
  }
  if (schema.type === 'array') {
    const nextArray = schema.optional();
    if (nextArray.innerType) nextArray.innerType = deepPartial(nextArray.innerType);
    return nextArray;
  }
  if (schema.type === 'tuple') {
    return schema.optional().clone({
      types: schema.spec.types.map(deepPartial)
    });
  }
  if ('optional' in schema) {
    return schema.optional();
  }
  return schema;
}
const deepHas = (obj, p) => {
  const path = [...(0,property_expr__WEBPACK_IMPORTED_MODULE_0__.normalizePath)(p)];
  if (path.length === 1) return path[0] in obj;
  let last = path.pop();
  let parent = (0,property_expr__WEBPACK_IMPORTED_MODULE_0__.getter)((0,property_expr__WEBPACK_IMPORTED_MODULE_0__.join)(path), true)(obj);
  return !!(parent && last in parent);
};
let isObject = obj => Object.prototype.toString.call(obj) === '[object Object]';
function unknown(ctx, value) {
  let known = Object.keys(ctx.fields);
  return Object.keys(value).filter(key => known.indexOf(key) === -1);
}
const defaultSort = sortByKeyOrder([]);
function create$3(spec) {
  return new ObjectSchema(spec);
}
class ObjectSchema extends Schema {
  constructor(spec) {
    super({
      type: 'object',
      check(value) {
        return isObject(value) || typeof value === 'function';
      }
    });
    this.fields = Object.create(null);
    this._sortErrors = defaultSort;
    this._nodes = [];
    this._excludedEdges = [];
    this.withMutation(() => {
      if (spec) {
        this.shape(spec);
      }
    });
  }
  _cast(_value, options = {}) {
    var _options$stripUnknown;
    let value = super._cast(_value, options);

    //should ignore nulls here
    if (value === undefined) return this.getDefault(options);
    if (!this._typeCheck(value)) return value;
    let fields = this.fields;
    let strip = (_options$stripUnknown = options.stripUnknown) != null ? _options$stripUnknown : this.spec.noUnknown;
    let props = [].concat(this._nodes, Object.keys(value).filter(v => !this._nodes.includes(v)));
    let intermediateValue = {}; // is filled during the transform below
    let innerOptions = Object.assign({}, options, {
      parent: intermediateValue,
      __validating: options.__validating || false
    });
    let isChanged = false;
    for (const prop of props) {
      let field = fields[prop];
      let exists = (prop in value);
      if (field) {
        let fieldValue;
        let inputValue = value[prop];

        // safe to mutate since this is fired in sequence
        innerOptions.path = (options.path ? `${options.path}.` : '') + prop;
        field = field.resolve({
          value: inputValue,
          context: options.context,
          parent: intermediateValue
        });
        let fieldSpec = field instanceof Schema ? field.spec : undefined;
        let strict = fieldSpec == null ? void 0 : fieldSpec.strict;
        if (fieldSpec != null && fieldSpec.strip) {
          isChanged = isChanged || prop in value;
          continue;
        }
        fieldValue = !options.__validating || !strict ?
        // TODO: use _cast, this is double resolving
        field.cast(value[prop], innerOptions) : value[prop];
        if (fieldValue !== undefined) {
          intermediateValue[prop] = fieldValue;
        }
      } else if (exists && !strip) {
        intermediateValue[prop] = value[prop];
      }
      if (exists !== prop in intermediateValue || intermediateValue[prop] !== value[prop]) {
        isChanged = true;
      }
    }
    return isChanged ? intermediateValue : value;
  }
  _validate(_value, options = {}, panic, next) {
    let {
      from = [],
      originalValue = _value,
      recursive = this.spec.recursive
    } = options;
    options.from = [{
      schema: this,
      value: originalValue
    }, ...from];
    // this flag is needed for handling `strict` correctly in the context of
    // validation vs just casting. e.g strict() on a field is only used when validating
    options.__validating = true;
    options.originalValue = originalValue;
    super._validate(_value, options, panic, (objectErrors, value) => {
      if (!recursive || !isObject(value)) {
        next(objectErrors, value);
        return;
      }
      originalValue = originalValue || value;
      let tests = [];
      for (let key of this._nodes) {
        let field = this.fields[key];
        if (!field || Reference.isRef(field)) {
          continue;
        }
        tests.push(field.asNestedTest({
          options,
          key,
          parent: value,
          parentPath: options.path,
          originalParent: originalValue
        }));
      }
      this.runTests({
        tests,
        value,
        originalValue,
        options
      }, panic, fieldErrors => {
        next(fieldErrors.sort(this._sortErrors).concat(objectErrors), value);
      });
    });
  }
  clone(spec) {
    const next = super.clone(spec);
    next.fields = Object.assign({}, this.fields);
    next._nodes = this._nodes;
    next._excludedEdges = this._excludedEdges;
    next._sortErrors = this._sortErrors;
    return next;
  }
  concat(schema) {
    let next = super.concat(schema);
    let nextFields = next.fields;
    for (let [field, schemaOrRef] of Object.entries(this.fields)) {
      const target = nextFields[field];
      nextFields[field] = target === undefined ? schemaOrRef : target;
    }
    return next.withMutation(s =>
    // XXX: excludes here is wrong
    s.setFields(nextFields, [...this._excludedEdges, ...schema._excludedEdges]));
  }
  _getDefault(options) {
    if ('default' in this.spec) {
      return super._getDefault(options);
    }

    // if there is no default set invent one
    if (!this._nodes.length) {
      return undefined;
    }
    let dft = {};
    this._nodes.forEach(key => {
      var _innerOptions;
      const field = this.fields[key];
      let innerOptions = options;
      if ((_innerOptions = innerOptions) != null && _innerOptions.value) {
        innerOptions = Object.assign({}, innerOptions, {
          parent: innerOptions.value,
          value: innerOptions.value[key]
        });
      }
      dft[key] = field && 'getDefault' in field ? field.getDefault(innerOptions) : undefined;
    });
    return dft;
  }
  setFields(shape, excludedEdges) {
    let next = this.clone();
    next.fields = shape;
    next._nodes = sortFields(shape, excludedEdges);
    next._sortErrors = sortByKeyOrder(Object.keys(shape));
    // XXX: this carries over edges which may not be what you want
    if (excludedEdges) next._excludedEdges = excludedEdges;
    return next;
  }
  shape(additions, excludes = []) {
    return this.clone().withMutation(next => {
      let edges = next._excludedEdges;
      if (excludes.length) {
        if (!Array.isArray(excludes[0])) excludes = [excludes];
        edges = [...next._excludedEdges, ...excludes];
      }

      // XXX: excludes here is wrong
      return next.setFields(Object.assign(next.fields, additions), edges);
    });
  }
  partial() {
    const partial = {};
    for (const [key, schema] of Object.entries(this.fields)) {
      partial[key] = 'optional' in schema && schema.optional instanceof Function ? schema.optional() : schema;
    }
    return this.setFields(partial);
  }
  deepPartial() {
    const next = deepPartial(this);
    return next;
  }
  pick(keys) {
    const picked = {};
    for (const key of keys) {
      if (this.fields[key]) picked[key] = this.fields[key];
    }
    return this.setFields(picked);
  }
  omit(keys) {
    const fields = Object.assign({}, this.fields);
    for (const key of keys) {
      delete fields[key];
    }
    return this.setFields(fields);
  }
  from(from, to, alias) {
    let fromGetter = (0,property_expr__WEBPACK_IMPORTED_MODULE_0__.getter)(from, true);
    return this.transform(obj => {
      if (!obj) return obj;
      let newObj = obj;
      if (deepHas(obj, from)) {
        newObj = Object.assign({}, obj);
        if (!alias) delete newObj[from];
        newObj[to] = fromGetter(obj);
      }
      return newObj;
    });
  }

  /** Parse an input JSON string to an object */
  json() {
    return this.transform(parseJson);
  }
  noUnknown(noAllow = true, message = object.noUnknown) {
    if (typeof noAllow !== 'boolean') {
      message = noAllow;
      noAllow = true;
    }
    let next = this.test({
      name: 'noUnknown',
      exclusive: true,
      message: message,
      test(value) {
        if (value == null) return true;
        const unknownKeys = unknown(this.schema, value);
        return !noAllow || unknownKeys.length === 0 || this.createError({
          params: {
            unknown: unknownKeys.join(', ')
          }
        });
      }
    });
    next.spec.noUnknown = noAllow;
    return next;
  }
  unknown(allow = true, message = object.noUnknown) {
    return this.noUnknown(!allow, message);
  }
  transformKeys(fn) {
    return this.transform(obj => {
      if (!obj) return obj;
      const result = {};
      for (const key of Object.keys(obj)) result[fn(key)] = obj[key];
      return result;
    });
  }
  camelCase() {
    return this.transformKeys(tiny_case__WEBPACK_IMPORTED_MODULE_1__.camelCase);
  }
  snakeCase() {
    return this.transformKeys(tiny_case__WEBPACK_IMPORTED_MODULE_1__.snakeCase);
  }
  constantCase() {
    return this.transformKeys(key => (0,tiny_case__WEBPACK_IMPORTED_MODULE_1__.snakeCase)(key).toUpperCase());
  }
  describe(options) {
    let base = super.describe(options);
    base.fields = {};
    for (const [key, value] of Object.entries(this.fields)) {
      var _innerOptions2;
      let innerOptions = options;
      if ((_innerOptions2 = innerOptions) != null && _innerOptions2.value) {
        innerOptions = Object.assign({}, innerOptions, {
          parent: innerOptions.value,
          value: innerOptions.value[key]
        });
      }
      base.fields[key] = value.describe(innerOptions);
    }
    return base;
  }
}
create$3.prototype = ObjectSchema.prototype;

function create$2(type) {
  return new ArraySchema(type);
}
class ArraySchema extends Schema {
  constructor(type) {
    super({
      type: 'array',
      spec: {
        types: type
      },
      check(v) {
        return Array.isArray(v);
      }
    });

    // `undefined` specifically means uninitialized, as opposed to "no subtype"
    this.innerType = void 0;
    this.innerType = type;
  }
  _cast(_value, _opts) {
    const value = super._cast(_value, _opts);

    // should ignore nulls here
    if (!this._typeCheck(value) || !this.innerType) {
      return value;
    }
    let isChanged = false;
    const castArray = value.map((v, idx) => {
      const castElement = this.innerType.cast(v, Object.assign({}, _opts, {
        path: `${_opts.path || ''}[${idx}]`
      }));
      if (castElement !== v) {
        isChanged = true;
      }
      return castElement;
    });
    return isChanged ? castArray : value;
  }
  _validate(_value, options = {}, panic, next) {
    var _options$recursive;
    // let sync = options.sync;
    // let path = options.path;
    let innerType = this.innerType;
    // let endEarly = options.abortEarly ?? this.spec.abortEarly;
    let recursive = (_options$recursive = options.recursive) != null ? _options$recursive : this.spec.recursive;
    options.originalValue != null ? options.originalValue : _value;
    super._validate(_value, options, panic, (arrayErrors, value) => {
      var _options$originalValu2;
      if (!recursive || !innerType || !this._typeCheck(value)) {
        next(arrayErrors, value);
        return;
      }

      // #950 Ensure that sparse array empty slots are validated
      let tests = new Array(value.length);
      for (let index = 0; index < value.length; index++) {
        var _options$originalValu;
        tests[index] = innerType.asNestedTest({
          options,
          index,
          parent: value,
          parentPath: options.path,
          originalParent: (_options$originalValu = options.originalValue) != null ? _options$originalValu : _value
        });
      }
      this.runTests({
        value,
        tests,
        originalValue: (_options$originalValu2 = options.originalValue) != null ? _options$originalValu2 : _value,
        options
      }, panic, innerTypeErrors => next(innerTypeErrors.concat(arrayErrors), value));
    });
  }
  clone(spec) {
    const next = super.clone(spec);
    // @ts-expect-error readonly
    next.innerType = this.innerType;
    return next;
  }

  /** Parse an input JSON string to an object */
  json() {
    return this.transform(parseJson);
  }
  concat(schema) {
    let next = super.concat(schema);

    // @ts-expect-error readonly
    next.innerType = this.innerType;
    if (schema.innerType)
      // @ts-expect-error readonly
      next.innerType = next.innerType ?
      // @ts-expect-error Lazy doesn't have concat and will break
      next.innerType.concat(schema.innerType) : schema.innerType;
    return next;
  }
  of(schema) {
    // FIXME: this should return a new instance of array without the default to be
    let next = this.clone();
    if (!isSchema(schema)) throw new TypeError('`array.of()` sub-schema must be a valid yup schema not: ' + printValue(schema));

    // @ts-expect-error readonly
    next.innerType = schema;
    next.spec = Object.assign({}, next.spec, {
      types: schema
    });
    return next;
  }
  length(length, message = array.length) {
    return this.test({
      message,
      name: 'length',
      exclusive: true,
      params: {
        length
      },
      skipAbsent: true,
      test(value) {
        return value.length === this.resolve(length);
      }
    });
  }
  min(min, message) {
    message = message || array.min;
    return this.test({
      message,
      name: 'min',
      exclusive: true,
      params: {
        min
      },
      skipAbsent: true,
      // FIXME(ts): Array<typeof T>
      test(value) {
        return value.length >= this.resolve(min);
      }
    });
  }
  max(max, message) {
    message = message || array.max;
    return this.test({
      message,
      name: 'max',
      exclusive: true,
      params: {
        max
      },
      skipAbsent: true,
      test(value) {
        return value.length <= this.resolve(max);
      }
    });
  }
  ensure() {
    return this.default(() => []).transform((val, original) => {
      // We don't want to return `null` for nullable schema
      if (this._typeCheck(val)) return val;
      return original == null ? [] : [].concat(original);
    });
  }
  compact(rejector) {
    let reject = !rejector ? v => !!v : (v, i, a) => !rejector(v, i, a);
    return this.transform(values => values != null ? values.filter(reject) : values);
  }
  describe(options) {
    let base = super.describe(options);
    if (this.innerType) {
      var _innerOptions;
      let innerOptions = options;
      if ((_innerOptions = innerOptions) != null && _innerOptions.value) {
        innerOptions = Object.assign({}, innerOptions, {
          parent: innerOptions.value,
          value: innerOptions.value[0]
        });
      }
      base.innerType = this.innerType.describe(innerOptions);
    }
    return base;
  }
}
create$2.prototype = ArraySchema.prototype;

// @ts-ignore
function create$1(schemas) {
  return new TupleSchema(schemas);
}
class TupleSchema extends Schema {
  constructor(schemas) {
    super({
      type: 'tuple',
      spec: {
        types: schemas
      },
      check(v) {
        const types = this.spec.types;
        return Array.isArray(v) && v.length === types.length;
      }
    });
    this.withMutation(() => {
      this.typeError(tuple.notType);
    });
  }
  _cast(inputValue, options) {
    const {
      types
    } = this.spec;
    const value = super._cast(inputValue, options);
    if (!this._typeCheck(value)) {
      return value;
    }
    let isChanged = false;
    const castArray = types.map((type, idx) => {
      const castElement = type.cast(value[idx], Object.assign({}, options, {
        path: `${options.path || ''}[${idx}]`
      }));
      if (castElement !== value[idx]) isChanged = true;
      return castElement;
    });
    return isChanged ? castArray : value;
  }
  _validate(_value, options = {}, panic, next) {
    let itemTypes = this.spec.types;
    super._validate(_value, options, panic, (tupleErrors, value) => {
      var _options$originalValu2;
      // intentionally not respecting recursive
      if (!this._typeCheck(value)) {
        next(tupleErrors, value);
        return;
      }
      let tests = [];
      for (let [index, itemSchema] of itemTypes.entries()) {
        var _options$originalValu;
        tests[index] = itemSchema.asNestedTest({
          options,
          index,
          parent: value,
          parentPath: options.path,
          originalParent: (_options$originalValu = options.originalValue) != null ? _options$originalValu : _value
        });
      }
      this.runTests({
        value,
        tests,
        originalValue: (_options$originalValu2 = options.originalValue) != null ? _options$originalValu2 : _value,
        options
      }, panic, innerTypeErrors => next(innerTypeErrors.concat(tupleErrors), value));
    });
  }
  describe(options) {
    let base = super.describe(options);
    base.innerType = this.spec.types.map((schema, index) => {
      var _innerOptions;
      let innerOptions = options;
      if ((_innerOptions = innerOptions) != null && _innerOptions.value) {
        innerOptions = Object.assign({}, innerOptions, {
          parent: innerOptions.value,
          value: innerOptions.value[index]
        });
      }
      return schema.describe(innerOptions);
    });
    return base;
  }
}
create$1.prototype = TupleSchema.prototype;

function create(builder) {
  return new Lazy(builder);
}
class Lazy {
  constructor(builder) {
    this.type = 'lazy';
    this.__isYupSchema__ = true;
    this.spec = void 0;
    this._resolve = (value, options = {}) => {
      let schema = this.builder(value, options);
      if (!isSchema(schema)) throw new TypeError('lazy() functions must return a valid schema');
      if (this.spec.optional) schema = schema.optional();
      return schema.resolve(options);
    };
    this.builder = builder;
    this.spec = {
      meta: undefined,
      optional: false
    };
  }
  clone(spec) {
    const next = new Lazy(this.builder);
    next.spec = Object.assign({}, this.spec, spec);
    return next;
  }
  optionality(optional) {
    const next = this.clone({
      optional
    });
    return next;
  }
  optional() {
    return this.optionality(true);
  }
  resolve(options) {
    return this._resolve(options.value, options);
  }
  cast(value, options) {
    return this._resolve(value, options).cast(value, options);
  }
  asNestedTest(config) {
    let {
      key,
      index,
      parent,
      options
    } = config;
    let value = parent[index != null ? index : key];
    return this._resolve(value, Object.assign({}, options, {
      value,
      parent
    })).asNestedTest(config);
  }
  validate(value, options) {
    return this._resolve(value, options).validate(value, options);
  }
  validateSync(value, options) {
    return this._resolve(value, options).validateSync(value, options);
  }
  validateAt(path, value, options) {
    return this._resolve(value, options).validateAt(path, value, options);
  }
  validateSyncAt(path, value, options) {
    return this._resolve(value, options).validateSyncAt(path, value, options);
  }
  isValid(value, options) {
    return this._resolve(value, options).isValid(value, options);
  }
  isValidSync(value, options) {
    return this._resolve(value, options).isValidSync(value, options);
  }
  describe(options) {
    return options ? this.resolve(options).describe(options) : {
      type: 'lazy',
      meta: this.spec.meta,
      label: undefined
    };
  }
  meta(...args) {
    if (args.length === 0) return this.spec.meta;
    let next = this.clone();
    next.spec.meta = Object.assign(next.spec.meta || {}, args[0]);
    return next;
  }
}

function setLocale(custom) {
  Object.keys(custom).forEach(type => {
    // @ts-ignore
    Object.keys(custom[type]).forEach(method => {
      // @ts-ignore
      locale[type][method] = custom[type][method];
    });
  });
}

function addMethod(schemaType, name, fn) {
  if (!schemaType || !isSchema(schemaType.prototype)) throw new TypeError('You must provide a yup schema constructor function');
  if (typeof name !== 'string') throw new TypeError('A Method name must be provided');
  if (typeof fn !== 'function') throw new TypeError('Method function must be provided');
  schemaType.prototype[name] = fn;
}




/***/ }),

/***/ "./node_modules/nanoid/index.browser.js":
/*!**********************************************!*\
  !*** ./node_modules/nanoid/index.browser.js ***!
  \**********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   customAlphabet: () => (/* binding */ customAlphabet),
/* harmony export */   customRandom: () => (/* binding */ customRandom),
/* harmony export */   nanoid: () => (/* binding */ nanoid),
/* harmony export */   random: () => (/* binding */ random),
/* harmony export */   urlAlphabet: () => (/* reexport safe */ _url_alphabet_index_js__WEBPACK_IMPORTED_MODULE_0__.urlAlphabet)
/* harmony export */ });
/* harmony import */ var _url_alphabet_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./url-alphabet/index.js */ "./node_modules/nanoid/url-alphabet/index.js");

let random = bytes => crypto.getRandomValues(new Uint8Array(bytes))
let customRandom = (alphabet, defaultSize, getRandom) => {
  let mask = (2 << (Math.log(alphabet.length - 1) / Math.LN2)) - 1
  let step = -~((1.6 * mask * defaultSize) / alphabet.length)
  return (size = defaultSize) => {
    let id = ''
    while (true) {
      let bytes = getRandom(step)
      let j = step
      while (j--) {
        id += alphabet[bytes[j] & mask] || ''
        if (id.length === size) return id
      }
    }
  }
}
let customAlphabet = (alphabet, size = 21) =>
  customRandom(alphabet, size, random)
let nanoid = (size = 21) =>
  crypto.getRandomValues(new Uint8Array(size)).reduce((id, byte) => {
    byte &= 63
    if (byte < 36) {
      id += byte.toString(36)
    } else if (byte < 62) {
      id += (byte - 26).toString(36).toUpperCase()
    } else if (byte > 62) {
      id += '-'
    } else {
      id += '_'
    }
    return id
  }, '')



/***/ }),

/***/ "./node_modules/nanoid/url-alphabet/index.js":
/*!***************************************************!*\
  !*** ./node_modules/nanoid/url-alphabet/index.js ***!
  \***************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   urlAlphabet: () => (/* binding */ urlAlphabet)
/* harmony export */ });
let urlAlphabet =
  'useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict'



/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!******************************!*\
  !*** ./src/contentScript.js ***!
  \******************************/


// Content script file will run in the context of web page.
// With content script you can manipulate the web pages using
// Document Object Model (DOM).
// You can also pass information to the parent extension.

// We execute this script by making an entry in manifest.json file
// under `content_scripts` property

// For more information on Content Scripts,
// See https://developer.chrome.com/extensions/content_scripts

// Log `title` of current active web page
const titleTag = document.head.getElementsByTagName("title")[0];
if (titleTag) {
  const pageTitle = titleTag.innerHTML;
  console.log(
    `Page title is: '${pageTitle}' - evaluated by Chrome extension's 'contentScript.js' file`
  );
} else {
  console.log("No title tag found in this document.");
}

// Communicate with background file by sending a message
chrome.runtime.sendMessage(
  {
    type: "GREETINGS",
    payload: {
      message: "Hello, my name is Con. I am from ContentScript.",
    },
  },
  (response) => {
    console.log(response.message);
  }
);

// Listen for message
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === "EXTRACT") {
    // check if the page is the timetable page
    const iframe = document.getElementsByClassName("ps_target-iframe");
    if (iframe.length === 0) {
      alert("Please go to the timetable page first!");
      sendResponse({});
      return;
    }

    const main =
      iframe[0].contentDocument.getElementsByClassName("PSGROUPBOXWBO");
    if (main.length === 0) {
      alert("Please go to the timetable page first!");
      sendResponse({});
      return;
    }
    // check if the radio button is
    const listViewRadioButton = iframe[0].contentDocument.getElementById(
      "DERIVED_REGFRM1_SSR_SCHED_FORMAT$258$"
    );
    if (listViewRadioButton.checked === false) {
      alert("Please select the list view first!");
      sendResponse({});
      return;
    }

    const data = [];

    for (let i = 1; i < main.length; i++) {
      const element = main[i];
      const courseName =
        element.getElementsByClassName("PAGROUPDIVIDER")[0].innerText;

      const timetable = element.querySelectorAll(
        "tbody > tr > td > table > tbody"
      )[2];

      const rows = timetable.querySelectorAll("tr");

      let lastClassNbr = "";
      let lastSection = "";
      let lastComponent = "";
      const campusAddress = {
        "NYP" : "\n172A Ang Mo Kio Avenue 8\nSingapore 567739",
        "DV" : "\n10 Dover Drive\nSingapore 138683",
        "NP" : "\n537 Clementi Road\nSingapore 599493",
        "RP" : "\n43 Woodlands Avenue 9\nSingapore 737729",
        "SP" : "\n510 Dover Road\nSingapore 139660",
        "TP" : "\nBlk 29B Tampines Avenue 1\nSingapore 528694"
      }
      for (let i = 1; i < rows.length; i++) {
        const row = rows[i];
        const cells = row.querySelectorAll("td");
        const classNbr = cells[0].innerText.trim();
        const section = cells[1].innerText.trim();
        const component = cells[2].innerText.trim();
        const daysNTimes = cells[3].innerText.trim().slice(3).split(" - ");
        const room = cells[4].innerText.trim();
        const instructor = cells[5].innerText.trim();
        const date = cells[6].innerText.trim().split(" - ")[0];

        if (classNbr !== "" && classNbr !== lastClassNbr) {
          lastClassNbr = classNbr;
        }
        if (section !== "" && section !== lastSection) {
          lastSection = section;
        }
        if (component !== "" && component !== lastComponent) {
          lastComponent = component;
        }
        let location = room
        if (room.split("-")[0] in campusAddress) {
          location = room + campusAddress[room.split("-")[0]];
        }

        const startTime = normalizeTime(daysNTimes[0]);
        const endTime = normalizeTime(daysNTimes[1]);

        data.push({
          courseName: courseName,
          classNbr: lastClassNbr,
          section: lastSection,
          component: lastComponent,
          startTime: startTime,
          endTime: endTime,
          location: location,
          instructor: instructor,
          date: date,
        });
      }
    }

    const ics = generateICS(data);

    downloadICS(ics);
  }

  // Send an empty response
  // See https://github.com/mozilla/webextension-polyfill/issues/130#issuecomment-531531890
  sendResponse({});
  return true;
});

function normalizeTime(time) {
  const dateAndTime = __webpack_require__(/*! date-and-time */ "./node_modules/date-and-time/date-and-time.js");

  if (time.length !== 5) {
    if (time.length === 6) {
      time = "0" + time;
    }
    time = time.slice(0, -2) + " " + time.slice(-2);
    time = dateAndTime.transform(time, 'hh:mm A', 'HH:mm');
  }

  return time;
}

function generateICS(data) {
  const ics = __webpack_require__(/*! ics */ "./node_modules/ics/dist/index.js");
  
  const processedData = data.map((item) => {
    return {
      title: `${item.courseName} (${item.section} ${item.component})`,
      start: [
        Number(item.date.split("/")[2]),
        Number(item.date.split("/")[1]),
        Number(item.date.split("/")[0]),
        Number(item.startTime.split(":")[0]),
        Number(item.startTime.split(":")[1]),
      ],
      end: [
        Number(item.date.split("/")[2]),
        Number(item.date.split("/")[1]),
        Number(item.date.split("/")[0]),
        Number(item.endTime.split(":")[0]),
        Number(item.endTime.split(":")[1]),
      ],
      location: item.location,
      description: `Class Nbr: ${item.classNbr}\nInstructor(s): ${item.instructor}`,
    };
  });
  console.log(processedData);
  const { error, value } = ics.createEvents(processedData);

  if (error) {
    console.log(error);
    return;
  }

  return value;
}

function downloadICS(ics) {
  var FileSaver = __webpack_require__(/*! file-saver */ "./node_modules/file-saver/dist/FileSaver.min.js");
  var blob = new Blob([ics], { type: "text/plain;charset=utf-8" });
  FileSaver.saveAs(blob, "myFile.ics");
}

})();

/******/ })()
;
//# sourceMappingURL=contentScript.js.map