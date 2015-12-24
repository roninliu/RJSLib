/**
 * Ronin公用埋点JS Lib monitor
 * namespace: RMON
 * use: RMON.method
 * @author   : Ronin Liu
 * @datetime : 2015/12/24
 * @version  : 1.0.0
 * @create   : 2015/12/24
 * @update   : 2015/12/24
 * @change Log
 *         2015-12-24 create file
 *
 */
var RMON = (function(root, factory) {
    "use strict";

    //模块名称
    var _MODULE_NAME = "monitor";
    //模块版本
    var _MODULE_VERSION = "1.0.0";



    /**
     * [settings 默认参数设置]
     * @param  {[boolean]} DEBUG    [是否开启调试模式]
     */
    factory.settings = {
        DEBUG: true
    };



    /* 暴露 API 工厂*/
    return factory;

})(window, window.RMON = window.RMON || {});