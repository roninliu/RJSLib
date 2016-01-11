/**
 * Ronin公用JS Lib Godzilla
 * namespace: GZL
 * use: GZL.method
 * @author   : Ronin Liu
 * @datetime : 2015/12/17
 * @version  : 1.0.0
 * @create   : 2015/12/17
 * @update   : 2015/12/17
 * @change Log
 *         2015-12-17 create file
 *
 */
var GZL = (function(root, factory) {
    "use strict";

    //模块名称
    var _MODULE_NAME = "[Godzilla]";
    //模块版本
    var _MODULE_VERSION = "1.0.0";
    /***********************私有方法，内部调用********************/


    /*******************  ***接口方法***********************/
    /**
     * [settings 默认参数设置]
     * @param  {[boolean]} DEBUG    [是否开启调试模式,默认false]
     */
    factory.settings = {
        DEBUG: false
    };


    /**
     * [ajax 封装ajax]
     * @param  {[object]} options
     * options.url:请求接口地址
     * options.method:请求类型，默认为GET
     * options.data:请求参数
     * options.success:请求成功回调函数
     * options.error:请求失败回调函数
     * options.:
     * options.data
     * 
     * 
     * @return {[object]}         [JSON Object]
     */
    factory.ajax = function(options) {
        var xhr = null;
        options = options || null;
        if (!options) {
            if (factory.settings.DEBUG) {
                console.info(_MODULE_NAME, options);
            }
            console.error(_MODULE_NAME, "options is required");
            return false;
        }
        options.method = options.method || "GET";
        options.data = options.data || {};
        options.url = options.url || null;
        options.success = options.success || function() {};
        options.error = options.error || function() {};
        options.before = options.before || (function() {
            console.log(data);
            console.log("loading");
        })();
        options.before();
        if (!options.url) {
            if (factory.settings.DEBUG) {
                console.info(_MODULE_NAME, url);
            }
            console.error(_MODULE_NAME, "options url is required");
            return false;
        }
        if (root.XMLHttpRequest) {
            xhr = new XMLHttpRequest();
            if (factory.settings.DEBUG) {
                console.info(_MODULE_NAME, "Browser ajax supported");
            }
        } else {
            if (factory.settings.DEBUG) {
                console.error(_MODULE_NAME, "Browser not support ajax");
            }
            xhr = null;
        }
        var type = options.method.toUpperCase();
        var random = Math.random();
        if (typeof options.data == 'object') {
            var query = '';
            for (var key in options.data) {
                query += key + '=' + options.data[key] + '&';
            }
            options.data = query.replace(/&$/, '');
        }
        if (type == 'GET') {
            if (options.data) {
                xhr.open('GET', options.url + '?' + options.data, true);
            } else {
                xhr.open('GET', options.url + '?t=' + random, true);
            }
            xhr.send();

        } else if (type == 'POST') {
            xhr.open('POST', options.url, true);
            xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            xhr.send(options.data);
        }
        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4) {
                if (factory.settings.DEBUG) {
                    console.log(_MODULE_NAME, "request status:", xhr.status);
                }
                if (xhr.status == 200) {
                    var resultData = xhr.responseText;
                    try {
                        resultData = JSON.parse(resultData);
                    } catch (e) {
                        if (factory.settings.DEBUG) {
                            console.log(_MODULE_NAME, e);
                        }
                        resultData = resultData;
                    }
                    if (factory.settings.DEBUG) {
                        console.log(_MODULE_NAME, resultData);
                    }
                    options.success(resultData);
                } else {
                    if (factory.settings.DEBUG) {
                        console.log(_MODULE_NAME, xhr.responseText);
                    }
                    options.error(xhr.status);
                }
            }
        }


    }



    /**
     * [ajax 封装ajax，跨域处理，跨域需要服务器设置header头CORS跨域]
     * @description  [IE6-IE9不支持跨域处理，只支持IE6-IE9的本域请求]
     * @param  {[object]} options   [url:请求接口地址，method：请求类型，默认为GET，data：请求参数]
     * @param  {[function]} success [获取数据成功的回调函数]
     * @param  {[function]} failed  [请求失败的回调函数]
     * @return {[object]}         [JSON Object]
     */
    factory.ajax1 = function(options, success, failed) {
        var xhr = null;
        var method = options.method || "GET";
        var data = options.data || {};
        var url = options.url || null;
        if (!url) {
            if (factory.settings.DEBUG) {
                console.log("[EORROR]" + _MODULE_NAME + ": url not defiend!");
            }
            return false;
        }
        if (root.XMLHttpRequest) {
            xhr = new XMLHttpRequest();
            if ("withCredentials" in xhr) {
                if (factory.settings.DEBUG) {
                    console.log("[SUCCESS]" + _MODULE_NAME + ": Browser support cross-domain!");
                }
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
        var type = method.toUpperCase();
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
            xhr.send(data);
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

    /**
     * [parseURI 解析URL，可获得相关参数]
     * @description [url中拼接的参数在params中]
     * @param  {[string]} url [需要解析的url，可选，无参数默认url为浏览器地址]
     * @return {[object]} [对象返回url中的相关参数信息]
     */
    factory.parseURI = function() {
        var url = "";
        if (arguments.length !== 0) {
            url = arguments[0];
        } else {
            url = window.location.href
        }
        var a = document.createElement('a');
        a.href = url;
        var urlObject = {
            source: url,
            protocol: a.protocol.replace(':', ''),
            host: a.hostname,
            port: a.port,
            query: a.search,
            params: (function() {
                var ret = {},
                    seg = a.search.replace(/^\?/, '').split('&'),
                    len = seg.length,
                    i = 0,
                    s;
                for (; i < len; i++) {
                    if (!seg[i]) {
                        continue;
                    }
                    s = seg[i].split('=');
                    ret[s[0]] = s[1];
                }
                return ret;
            })(),
            file: (a.pathname.match(/\/([^\/?#]+)$/i) || [, ''])[1],
            hash: a.hash.replace('#', ''),
            path: a.pathname.replace(/^([^\/])/, '/$1'),
            relative: (a.href.match(/tps?:\/\/[^\/]+(.+)/) || [, ''])[1],
            segments: a.pathname.replace(/^\//, '').split('/')
        };
        if (factory.settings.DEBUG) {
            console.log("[INFO]" + _MODULE_NAME + ":URL INFO as bellow:");
            console.log(urlObject);
        }
        return urlObject;
    };
    /**
     * [getPlatformMethod 获取设备平台]
     * @param  {[boolean]} type  [返回int类型的值还是字符串，可选参数，true返回int，false返回字符串，默认true]
     * @return {[int | string]} [返回设备平台代号]
     * [1:Andriod,2: IOS,3:PC,4:微信,5:未知]
     */
    factory.getPlatformMethod = function() {
        var isInt = true;
        if (arguments.length !== 0) {
            isInt = arguments[0];
        }
        var _userAgent = navigator.userAgent.toLowerCase();
        if ((/mobile/i.test(_userAgent)) || (/MIDP|SymbianOS|NOKIA|SAMSUNG|LG|NEC|TCL|Alcatel|BIRD|DBTEL|Dopod|PHILIPS|HAIER|LENOVO|MOT-|Nokia|SonyEricsson|SIE-|Amoi|ZTE/.test(_userAgent))) {
            if (/iphone/i.test(_userAgent)) {
                if (/micromessenger/i.test(_userAgent)) {
                    if (!isInt) {
                        return "IOS-WX";
                    } else {
                        return 4;
                    }
                } else {
                    if (!isInt) {
                        return "IOS";
                    } else {
                        return 2;
                    }
                }
            } else if (/android/i.test(_userAgent)) {
                if (/micromessenger/i.test(_userAgent)) {
                    if (!isInt) {
                        return "Andriod-WX";
                    } else {
                        return 4;
                    }

                } else {
                    if (!isInt) {
                        return "Andriod";
                    } else {
                        return 1;
                    }
                }
            } else {
                if (!isInt) {
                    return "unkown";
                } else {
                    return 5;
                }
            }
        } else {
            if (!isInt) {
                return "PC";
            } else {
                return 3;
            }
        }
    };
    /**
     * [generateUUID 生成全球唯一标识UUID]
     * @return {[type]} [uuid字符串]
     */
    factory.generateUUID = function() {
        var d = new Date().getTime();
        var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = (d + Math.random() * 16) % 16 | 0;
            d = Math.floor(d / 16);
            return (c == 'x' ? r : (r & 0x7 | 0x8)).toString(16);
        });
        if (factory.settings.DEBUG) {
            console.log(uuid);
        }
        return uuid;
    };

    /**
     * [setCookie 设置cookie]
     * @param {[string]} key   [cookie的name]
     * @param {[string]} value [cookie的值]
     * @param {[object]} options [可选][设置cookie相关的属性，expires：过期天数，path：路径，domain：域名，secure：是否是安全传输]
     */
    factory.setCookie = function(key, value) {
        var options = null;
        if (arguments.length > 2) {
            options = arguments[2];
        } else {
            options = null;
        }
        if (key && value) {
            var cookie = encodeURIComponent(key) + "=" + encodeURIComponent(value);
            if (options !== null) {
                if (options.expires) {
                    var times = new Date();
                    times.setTime(times.getTime() + options.expires * 24 * 60 * 60 * 1000);
                    cookie += ';expires=' + times.toGMTString();
                }
                if (options.path) {
                    cookie += ';path=' + options.path;
                }
                if (options.domain) {
                    cookie += ';domain=' + options.domain;
                }
                if (options.secure) {
                    cookie += ';secure';
                }
            }
            document.cookie = cookie;
            if (factory.settings.DEBUG) {
                console.log(document.cookie);
            }
            return cookie;
        } else {
            return "";
        }
    };
    /**
     * [getCookie 获取cookie]
     * @param  {[string]} name [cookie的name]
     * @return {[sting]}      [cookie的value]
     */
    factory.getCookie = function(name) {
        var cookies = parseCookie();
        var current = decodeURIComponent(cookies[name]) || null;
        if (factory.settings.DEBUG) {
            console.log("[INFO]" + _MODULE_NAME + ": Cookie " + name + " value is " + current);
        }
        return current;
    };
    /**
     * [removeCookie 删除cookie的值]
     * @param  {[string]} name [cookie的关键字]
     * @return {[void]}      [无]
     */
    factory.removeCookie = function(name) {
        var cookies = parseCookie();
        if (cookies[name]) {
            document.cookie = name + '=;expires=0';
        }
        if (factory.settings.DEBUG) {
            console.log(document.cookie);
        }
    };
    /**
     * [clearCookie 清除全部cookie]
     * @return {[void]} [无]
     */
    factory.clearCookie = function() {
        var cookies = parseCookie();
        for (var key in cookies) {
            document.cookie = key + "=;expires=0"
        }
    };
    /**
     * [getAllCookies 获取当前全部cookie]
     * @return {[void]} [无]
     */
    factory.getAllCookies = function() {
        var cookies = parseCookie();
        var tmpCookies = {};
        for (var key in cookies) {
            tmpCookies[key] = decodeURIComponent(cookies[key]);
        }
        if (factory.settings.DEBUG) {
            console.log(tmpCookies);
        }
        return tmpCookies;
    };

    /**
     * [generateMD5 MD5字符串加密]
     * @param  {[string]} input [输入的字符串]
     * @param  {[string]} key   [加密密钥，可选,有key时，拼接规则key+input]
     * @return {[string]}       [加密后的字符串]
     */
    factory.generateMD5 = function(input) {
        var hexStr = '';
        if (arguments.length > 1) {
            hexStr = arguments[1].toString() + input.toString();
        } else {
            hexStr = input;
        }
        return rstr2hex(raw_md5(hexStr));
    };

    var raw_md5 = function(s) {
        return rstr_md5(str2rstr_utf8(s));
    };

    var str2rstr_utf8 = function(input) {
        return unescape(encodeURIComponent(input));
    };

    var rstr_md5 = function(s) {
        return binl2rstr(binl_md5(rstr2binl(s), s.length * 8));
    };
    var rstr2hex = function(input) {
        var hex_tab = '0123456789abcdef',
            output = '',
            x,
            i;
        for (i = 0; i < input.length; i += 1) {
            x = input.charCodeAt(i);
            output += hex_tab.charAt((x >>> 4) & 0x0F) +
                hex_tab.charAt(x & 0x0F);
        }
        return output;
    };

    /*
     * Convert a raw string to an array of little-endian words
     * Characters >255 have their high-byte silently ignored.
     */
    var rstr2binl = function(input) {
        var i,
            output = [];
        output[(input.length >> 2) - 1] = undefined;
        for (i = 0; i < output.length; i += 1) {
            output[i] = 0;
        }
        for (i = 0; i < input.length * 8; i += 8) {
            output[i >> 5] |= (input.charCodeAt(i / 8) & 0xFF) << (i % 32);
        }
        return output;
    };
    var md5_ff = function(a, b, c, d, x, s, t) {
        return md5_cmn((b & c) | ((~b) & d), a, b, x, s, t);
    };
    var md5_cmn = function(q, a, b, x, s, t) {
        return safe_add(bit_rol(safe_add(safe_add(a, q), safe_add(x, t)), s), b);
    }
    var safe_add = function(x, y) {
        var lsw = (x & 0xFFFF) + (y & 0xFFFF),
            msw = (x >> 16) + (y >> 16) + (lsw >> 16);
        return (msw << 16) | (lsw & 0xFFFF);
    }
    var bit_rol = function(num, cnt) {
        return (num << cnt) | (num >>> (32 - cnt));
    }
    var md5_gg = function(a, b, c, d, x, s, t) {
        return md5_cmn((b & d) | (c & (~d)), a, b, x, s, t);
    }
    var md5_hh = function(a, b, c, d, x, s, t) {
        return md5_cmn(b ^ c ^ d, a, b, x, s, t);
    }
    var md5_ii = function(a, b, c, d, x, s, t) {
        return md5_cmn(c ^ (b | (~d)), a, b, x, s, t);
    };

    /*
     * Calculate the MD5 of an array of little-endian words, and a bit length.
     */
    var binl_md5 = function(x, len) {
        /* append padding */
        x[len >> 5] |= 0x80 << (len % 32);
        x[(((len + 64) >>> 9) << 4) + 14] = len;

        var i, olda, oldb, oldc, oldd,
            a = 1732584193,
            b = -271733879,
            c = -1732584194,
            d = 271733878;

        for (i = 0; i < x.length; i += 16) {
            olda = a;
            oldb = b;
            oldc = c;
            oldd = d;

            a = md5_ff(a, b, c, d, x[i], 7, -680876936);
            d = md5_ff(d, a, b, c, x[i + 1], 12, -389564586);
            c = md5_ff(c, d, a, b, x[i + 2], 17, 606105819);
            b = md5_ff(b, c, d, a, x[i + 3], 22, -1044525330);
            a = md5_ff(a, b, c, d, x[i + 4], 7, -176418897);
            d = md5_ff(d, a, b, c, x[i + 5], 12, 1200080426);
            c = md5_ff(c, d, a, b, x[i + 6], 17, -1473231341);
            b = md5_ff(b, c, d, a, x[i + 7], 22, -45705983);
            a = md5_ff(a, b, c, d, x[i + 8], 7, 1770035416);
            d = md5_ff(d, a, b, c, x[i + 9], 12, -1958414417);
            c = md5_ff(c, d, a, b, x[i + 10], 17, -42063);
            b = md5_ff(b, c, d, a, x[i + 11], 22, -1990404162);
            a = md5_ff(a, b, c, d, x[i + 12], 7, 1804603682);
            d = md5_ff(d, a, b, c, x[i + 13], 12, -40341101);
            c = md5_ff(c, d, a, b, x[i + 14], 17, -1502002290);
            b = md5_ff(b, c, d, a, x[i + 15], 22, 1236535329);

            a = md5_gg(a, b, c, d, x[i + 1], 5, -165796510);
            d = md5_gg(d, a, b, c, x[i + 6], 9, -1069501632);
            c = md5_gg(c, d, a, b, x[i + 11], 14, 643717713);
            b = md5_gg(b, c, d, a, x[i], 20, -373897302);
            a = md5_gg(a, b, c, d, x[i + 5], 5, -701558691);
            d = md5_gg(d, a, b, c, x[i + 10], 9, 38016083);
            c = md5_gg(c, d, a, b, x[i + 15], 14, -660478335);
            b = md5_gg(b, c, d, a, x[i + 4], 20, -405537848);
            a = md5_gg(a, b, c, d, x[i + 9], 5, 568446438);
            d = md5_gg(d, a, b, c, x[i + 14], 9, -1019803690);
            c = md5_gg(c, d, a, b, x[i + 3], 14, -187363961);
            b = md5_gg(b, c, d, a, x[i + 8], 20, 1163531501);
            a = md5_gg(a, b, c, d, x[i + 13], 5, -1444681467);
            d = md5_gg(d, a, b, c, x[i + 2], 9, -51403784);
            c = md5_gg(c, d, a, b, x[i + 7], 14, 1735328473);
            b = md5_gg(b, c, d, a, x[i + 12], 20, -1926607734);

            a = md5_hh(a, b, c, d, x[i + 5], 4, -378558);
            d = md5_hh(d, a, b, c, x[i + 8], 11, -2022574463);
            c = md5_hh(c, d, a, b, x[i + 11], 16, 1839030562);
            b = md5_hh(b, c, d, a, x[i + 14], 23, -35309556);
            a = md5_hh(a, b, c, d, x[i + 1], 4, -1530992060);
            d = md5_hh(d, a, b, c, x[i + 4], 11, 1272893353);
            c = md5_hh(c, d, a, b, x[i + 7], 16, -155497632);
            b = md5_hh(b, c, d, a, x[i + 10], 23, -1094730640);
            a = md5_hh(a, b, c, d, x[i + 13], 4, 681279174);
            d = md5_hh(d, a, b, c, x[i], 11, -358537222);
            c = md5_hh(c, d, a, b, x[i + 3], 16, -722521979);
            b = md5_hh(b, c, d, a, x[i + 6], 23, 76029189);
            a = md5_hh(a, b, c, d, x[i + 9], 4, -640364487);
            d = md5_hh(d, a, b, c, x[i + 12], 11, -421815835);
            c = md5_hh(c, d, a, b, x[i + 15], 16, 530742520);
            b = md5_hh(b, c, d, a, x[i + 2], 23, -995338651);

            a = md5_ii(a, b, c, d, x[i], 6, -198630844);
            d = md5_ii(d, a, b, c, x[i + 7], 10, 1126891415);
            c = md5_ii(c, d, a, b, x[i + 14], 15, -1416354905);
            b = md5_ii(b, c, d, a, x[i + 5], 21, -57434055);
            a = md5_ii(a, b, c, d, x[i + 12], 6, 1700485571);
            d = md5_ii(d, a, b, c, x[i + 3], 10, -1894986606);
            c = md5_ii(c, d, a, b, x[i + 10], 15, -1051523);
            b = md5_ii(b, c, d, a, x[i + 1], 21, -2054922799);
            a = md5_ii(a, b, c, d, x[i + 8], 6, 1873313359);
            d = md5_ii(d, a, b, c, x[i + 15], 10, -30611744);
            c = md5_ii(c, d, a, b, x[i + 6], 15, -1560198380);
            b = md5_ii(b, c, d, a, x[i + 13], 21, 1309151649);
            a = md5_ii(a, b, c, d, x[i + 4], 6, -145523070);
            d = md5_ii(d, a, b, c, x[i + 11], 10, -1120210379);
            c = md5_ii(c, d, a, b, x[i + 2], 15, 718787259);
            b = md5_ii(b, c, d, a, x[i + 9], 21, -343485551);

            a = safe_add(a, olda);
            b = safe_add(b, oldb);
            c = safe_add(c, oldc);
            d = safe_add(d, oldd);
        }
        return [a, b, c, d];
    }

    /*
     * Convert an array of little-endian words to a string
     */
    var binl2rstr = function(input) {
        var i,
            output = '';
        for (i = 0; i < input.length * 32; i += 8) {
            output += String.fromCharCode((input[i >> 5] >>> (i % 32)) & 0xFF);
        }
        return output;
    }

    /**
     * [parseCookie 解析cookie，将cookie的字符串解析为Object]
     * @return {[object]} [object的cookie]
     */
    var parseCookie = function() {
        var cookies = {};
        if (factory.settings.DEBUG) {
            console.log("[INFO]" + _MODULE_NAME + ": Cookie infomation:");
            console.log(document.cookie);
        }
        if (document.cookie) {
            var tmpCookies = document.cookie.split(";");
            console.log(tmpCookies);
            for (var key in tmpCookies) {
                var index = tmpCookies[key].indexOf("=");
                var name = tmpCookies[key].substr(0, index).replace(/\s+/g, "");
                var value = tmpCookies[key].substr(index + 1, tmpCookies[key].length).replace(/\s+/g, "");
                cookies[name] = value;
            }
        }
        if (factory.settings.DEBUG) {
            console.log(cookies);
        }
        return cookies;
    }


    /* 暴露 API 工厂*/
    return factory;

})(window, window.GZL = window.GZL || {});