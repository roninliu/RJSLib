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

    //模块名称
    var _MODULE_NAME = "Godzilla";
    //模块版本
    var _MODULE_VERSION = "1.0.0";

    /**
     * [settings 默认参数设置]
     * @param  {[boolean]} DEBUG    [是否开启调试模式]
     */
    factory.settings = {
        DEBUG: true
    };

    /**
     * [ajax 封装ajax，跨域处理，跨域需要服务器设置header头CORS跨域]
     * @description  [IE6-IE9不支持跨域处理，只支持IE6-IE9的本域请求]
     * @param  {[object]} options   [url:请求接口地址，method：请求类型，默认为GET，data：请求参数]
     * @param  {[function]} success [获取数据成功的回调函数]
     * @param  {[function]} failed  [请求失败的回调函数]
     * @return {[object]}         [JSON Object]
     */
    factory.ajax = function(options, success, failed) {
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
            url = window.location.length
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