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
var R = (function(window, factory) {
    //模块名称
    var _MODULE_NAME = "RJSLib";
    //模块版本
    var _MODULE_VERSION = "1.0.0";

    /**
     * [ajax 实现ajax请求]
     * @param  {[string]} method [请求类型]
     * @param  {[string]} url    [请求地址]
     * @return {[object]}        [返回JSON object]
     */
    factory.ajax = function(method, url) {
        var args = [];
        var xmlhttprequest = new XMLHttpRequest();
        if ("withCredentials" in xmlhttprequest) {
            xmlhttprequest.open(method, url, true);
        } else if (typeof != "undefined") {
            xmlhttprequest = new XDomainRequest();
            xmlhttprequest.open(method, url);
        } else {
            xmlhttprequest = null;
        }
        if(!xmlhttprequest){
        	console.log("Browser not support CORS")
        }else{
        	xmlhttprequest.send();
        }

    }

    /* 暴露 API 工厂*/
    return factory;

})(window, window.R = window.R || {});
