/**
 * Ronin公用JS Lib
 * namespace: R
 * use: R.method
 * @author   : Ronin Liu
 * @datetime : 2015/12/17
 * @version  : 1.0.0
 * @create   : 2015/12/17
 * @update   : 2015/12/17
 * @change Log
 *         2015-12-17 create file
 *
 */
var R = (function(root, factory) {

    //模块名称
    var _MODULE_NAME = "RJSLib";
    //模块版本
    var _MODULE_VERSION = "1.0.0";

    /**
     * [settings 默认参数设置]
     * @param  {[boolean]} DEBUG    [是否开启调试模式]
     * 
     */
    factory.settings = {
        DEBUG: true
    };


    (function() {
        if (!root.JSON) {
            root.JSON = {
                parse: function(jstr) {
                    return eval('(' + jstr + ')');
                },
                stringify: (function() {
                    var toString = Object.prototype.toString;
                    var isArray = Array.isArray || function(a) {
                        return toString.call(a) === '[object Array]';
                    };
                    var escMap = {
                        '"': '\\"',
                        '\\': '\\\\',
                        '\b': '\\b',
                        '\f': '\\f',
                        '\n': '\\n',
                        '\r': '\\r',
                        '\t': '\\t'
                    };
                    var escFunc = function(m) {
                        return escMap[m] || '\\u' + (m.charCodeAt(0) + 0x10000).toString(16).substr(1);
                    };
                    var escRE = /[\\"\u0000-\u001F\u2028\u2029]/g;
                    return function stringify(value) {
                        if (value == null) {
                            return 'null';
                        } else if (typeof value === 'number') {
                            return isFinite(value) ? value.toString() : 'null';
                        } else if (typeof value === 'boolean') {
                            return value.toString();
                        } else if (typeof value === 'object') {
                            if (typeof value.toJSON === 'function') {
                                return stringify(value.toJSON());
                            } else if (isArray(value)) {
                                var res = '[';
                                for (var i = 0; i < value.length; i++)
                                    res += (i ? ', ' : '') + stringify(value[i]);
                                return res + ']';
                            } else if (toString.call(value) === '[object Object]') {
                                var tmp = [];
                                for (var k in value) {
                                    if (value.hasOwnProperty(k))
                                        tmp.push(stringify(k) + ': ' + stringify(value[k]));
                                }
                                return '{' + tmp.join(', ') + '}';
                            }
                        }
                        return '"' + value.toString().replace(escRE, escFunc) + '"';
                    };
                })()
            };
        }
    })();


    /**
     * [ajax 封装ajax，支持跨域处理，跨域需要服务器设置header头CORS跨域]
     * @description  [不支持IE6-IE9的跨域处理，只支持IE6-IE9的本域请求]
     * @param  {[string]} type    [请求类型，GET|POST]
     * @param  {[string]} url     [请求的域名接口]
     * @param  {[object]} data    [请求参数]
     * @param  {[function]} success [获取数据成功的回调函数]
     * @param  {[function]} failed  [请求失败的回调函数]
     * @return {[object]}         [JSON Object]
     */
    factory.ajax = function(type, url, data, success, failed) {
        var xhr = null;
        if (root.XMLHttpRequest) {
            xhr = new XMLHttpRequest();
            if ("withCredentials" in xhr) {
                if (factory.settings.DEBUG) {
                    console.log("[SUCCESS]" + _MODULE_NAME + ": Browser support cross-domain!");
                }
            } else if (typeof XDomainRequest != "undefined") {
                if (factory.settings.DEBUG) {
                    console.log("[WARN]" + _MODULE_NAME + ": Browser not support cross-domain!")
                }
                xhr = new XDomainRequest();
            } else {
                if (factory.settings.DEBUG) {
                    console.log("[EORROR]" + _MODULE_NAME + ": Browser not support ajax!")
                }
                xhr = null;
            }
        } else {
            if (factory.settings.DEBUG) {
                console.log("[EORROR]" + _MODULE_NAME + ": Browser not support ajax!")
            }
            xhr = null;
        }
        var type = type.toUpperCase();
        var random = Math.random();
        if (typeof data == 'object') {
            var query = '';
            for (var key in data) {
                query += key + '=' + data[key] + '&';
            }
            data = query.replace(/&$/, '');
        }

        if (type == 'GET') {
            if (data) {
                xhr.open('GET', url + '?' + data, true);
            } else {
                xhr.open('GET', url + '?t=' + random, true);
            }
            xhr.send();
        } else if (type == 'POST') {
            xhr.open('POST', url, true);
            xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            xhr.send();
        }

        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4) {
                if (factory.settings.DEBUG) {
                    console.log("[INFO]" + _MODULE_NAME + ": request status [" + xhr.status + "]");
                }
                if (xhr.status == 200) {
                    success(JSON.parse(xhr.responseText));
                } else {
                    if (failed) {
                        failed(xhr.status);
                    }
                }
            }
        }
    };
    /* 暴露 API 工厂*/
    return factory;

})(window, window.R = window.R || {});