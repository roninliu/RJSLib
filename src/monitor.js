/**
 * 最新版本的埋点文件，不支持APP内嵌页面的埋点,依赖GODZILLA库
 * namespace: MONITOR
 * use: HZM.method
 * @author   : Ronin Liu
 * @datetime : 2016/01/03
 * @version  : 1.0.0
 *
 */
var HZM = (function(root, factory) {
    "use strict";

    /**
     * [settings 默认参数设置]
     * @param  {[boolean]} DEBUG    [是否开启调试模式]
     */
    factory.settings = {
        DEBUG: false
    };
    /**
     * [定义对象解决性能问题]
     * 彻底解决需要使用构造函数的方式
     */
    var HZMObject = function() {};
    var PVObject = function() {};
    var CodeObject = function() {};
    var CVObject = function() {};

    /**
     * 定义切面Before方法，函数执行前执行
     * @param {func} func
     */
    Function.prototype.before = function(func) {
        var _self = this;
        return function() {
            if (func.apply(this, arguments) === false) {
                return false;
            } else {
                return _self.apply(this, arguments);
            }
        };
    };
    /**
     * 定义切面After方法，函数执行之后执行
     * @param {func} func
     */
    Function.prototype.after = function(func) {
        var _self = this;
        return function() {
            var ret = _self.apply(this, arguments);
            if (ret === false) {
                return false;
            } else {
                func.apply(this, arguments);
                return ret;
            }
        };
    };
    /**
     * [register 注册MAC和SEQ]
     * @param  {Function} callback [回调函数]
     * @return {[object]}          [注册后的信息]
     */
    var register = function(callback, status) {
        console.log(status);
        var monitorURL = null;
        var localData = new HZMObject();
        var mScripts = document.getElementsByTagName("script");
        for (var i = 0; i < mScripts.length; i++) {
            monitorURL = mScripts[i].src;
            if (monitorURL) {
                var mths = monitorURL.match(/\/monitor.js.*[?&]pageid=(\d+)/);
                if (mths && mths[1]) {
                    localData.PAGEID = mths[1];
                }
            }
        }
        if (window.localStorage && window.localStorage !== null) {
            localData.TYPE = 0;
            if (localStorage.hasOwnProperty("HZSEQ") && localStorage.hasOwnProperty("HZMAC") && localStorage.hasOwnProperty("HZNUM")) {
                localData.HZSEQ = localStorage.getItem("HZSEQ");
                localData.HZMAC = localStorage.getItem("HZMAC");
                if (!status) {
                    localData.HZNUM = parseInt(localStorage.getItem("HZNUM"));
                } else {
                    localData.HZNUM = parseInt(localStorage.getItem("HZNUM")) + 1;
                }
                localStorage.setItem("HZNUM", localData.HZNUM);
                GZL.setCookie("HZNUM", localData.HZNUM, {
                    expires: 10000
                });
                callback(localData);
            } else {
                var lhzmac = GZL.generateUUID();
                localStorage.setItem("HZMAC", lhzmac);
                localStorage.setItem("HZNUM", 0);
                GZL.setCookie("HZMAC", lhzmac, {
                    expires: 10000
                });
                GZL.setCookie("HZNUM", '0', {
                    expires: 10000
                });
                localData.HZNUM = localStorage.getItem("HZNUM");
                localData.HZMAC = lhzmac;
                GZL.ajax({
                    url: CONFIG.REPORT_API + "/getseq.do",
                    data: {
                        appid: CONFIG.APPID,
                        machineid: lhzmac
                    },
                    success: function(result) {
                        if (result.status === 200) {
                            localStorage.setItem("HZSEQ", result.data.seq);
                            GZL.setCookie("HZSEQ", result.data.seq, {
                                expires: 10000
                            });
                            localData.HZSEQ = localStorage.getItem("HZSEQ");
                        } else {
                            var _localSeq = GZL.Md5(CONFIG.APPID + lhzmac);
                            localStorage.setItem("HZSEQ", _localSeq);
                            GZL.setCookie("HZSEQ", _localSeq, {
                                expires: 10000
                            });
                            localData.HZSEQ = localStorage.getItem("HZSEQ");
                        }
                        callback(localData);
                    },
                    error: function() {
                        var _localeSeq = GZL.Md5(CONFIG.APPID + lhzmac);
                        localStorage.setItem("HZSEQ", _localeSeq);
                        GZL.setCookie("HZSEQ", _localeSeq, {
                            expires: 10000
                        });
                        localData.HZSEQ = localStorage.getItem("HZSEQ");
                        callback(localData);
                    }
                });
            }
        } else {
            var _cookies = GZL.getAllCookies();
            localData.TYPE = 1;
            if (_cookies.hasOwnProperty("HZSEQ") && _cookies.hasOwnProperty("HZMAC") && _cookies.hasOwnProperty("HZNUM")) {
                localData.HZSEQ = _cookies.getCookie("HZSEQ");
                localData.HZMAC = _cookies.getCookie("HZMAC");
                if (!status) {
                    localData.HZNUM = parseInt(_cookies.getCookie("HZNUM"));
                } else {
                    localData.HZNUM = parseInt(_cookies.getCookie("HZNUM")) + 1;
                }
                GZL.setCookie("HZNUM", localData.HZNUM, {
                    expires: 10000
                });
                callback(localData);
            } else {
                var chzmac = GZL.generateUUID();
                GZL.setCookie("HZMAC", chzmac, {
                    expires: 10000
                });
                GZL.setCookie("HZNUM", '0', {
                    expires: 10000
                });
                localData.HZNUM = _cookies.getCookie("HZNUM");
                localData.HZMAC = chzmac;
                GZL.ajax({
                    url: CONFIG.REPORT_API + "/getseq.do",
                    data: {
                        appid: CONFIG.APPID,
                        machineid: chzmac
                    },
                    success: function(result) {
                        if (result.status === 200) {
                            GZL.setCookie("HZSEQ", result.data.seq, {
                                expires: 10000
                            });
                            localData.HZSEQ = localStorage.getItem("HZSEQ");
                        } else {
                            var _localSeq = GZL.Md5(CONFIG.APPID + chzmac);
                            GZL.setCookie("HZSEQ", _localSeq, {
                                expires: 10000
                            });
                            localData.HZSEQ = localStorage.getItem("HZSEQ");
                        }
                        callback(localData);
                    },
                    error: function() {
                        var _localeSeq = GZL.Md5(CONFIG.APPID + chzmac);
                        GZL.setCookie("HZSEQ", _localeSeq, {
                            expires: 10000
                        });
                        localData.HZSEQ = localStorage.getItem("HZSEQ");
                        callback(localData);
                    }
                });
            }
        }
    };

    /**
     * [reportCV CV上报]
     * @param  {[int]} sid [上报的埋点ID]
     * @return {[void]}     [无]
     */
    factory.reportCV = function(sid) {
        register(function(result) {
            var cv = new CVObject();
            cv.appid = CONFIG.APPID;
            cv.channel = CONFIG.CHANNEL;
            cv.timestamp = new Date().valueOf();
            cv.machineid = result.HZMAC;
            cv.flagid = sid;
            cv.platform = GZL.getPlatform();
            cv.seqid = result.HZSEQ + "_" + result.HZNUM;
            cv.type = 2;
            cv.pageid = result.PAGEID;
            cv.tag = "CV_WAP";
            cv.other = {
                key: "HZ-XM"
            };
            console.log(cv);
            var cvs = [];
            cvs.push(cv);
            GZL.ajax({
                url: CONFIG.REPORT_API + "/gather.do",
                method: "POST",
                data: {
                    data: JSON.stringify(cvs)
                }
            });
        }, true);
    };

    /**
     * [returnCode  返回码上报]
     * @param  {[object]} options [返回码上报参数]
     * options.url:接口地址
     * options.stime:请求开始时间
     * options.etime:请求结束时间
     * options.code:返回码状态码
     * @return {[void]}         [无]
     */
    factory.returnCode = function(options) {
        register(function(result) {
            var code = new CodeObject();
            code.appid = CONFIG.APPID;
            code.channel = CONFIG.CHANNEL;
            code.type = 5;
            code.stime = options.stime || 0;
            code.machineid = result.HZMAC;
            code.pageid = result.PAGEID;
            code.platform = GZL.getPlatform();
            code.request = options.url || "Not-Found";
            code.code = options.code || 0;
            code.etime = options.etime || 0;
            code.seqid = result.HZSEQ + "_" + result.HZNUM;
            code.tag = "CODE_WAP";
            console.log(code);
            var codes = [];
            codes.push(code);
            GZL.ajax({
                url: CONFIG.REPORT_API + "/gather.do",
                method: "POST",
                data: {
                    data: JSON.stringify(codes)
                }
            });
        }, false);
    };
    /* 页面装载完成,启用PV上报 */
    root.onload = (root.onload || function() {}).before(function() {
        register(function(result) {
            console.log(result);
            var pv = new PVObject();
            pv.appid = CONFIG.APPID;
            pv.channel = CONFIG.CHANNEL;
            pv.stime = stime;
            pv.etime = etime;
            pv.machineid = result.HZMAC;
            pv.platform = GZL.getPlatform();
            pv.seqid = result.HZSEQ + "_" + result.HZNUM;
            pv.type = 1;
            pv.pageid = result.PAGEID;
            pv.tag = "PV_WAP";
            pv.other = {
                key: "HZ-XM",
                test: true
            };
            console.log(pv);
            var pvs = [];
            pvs.push(pv);
            GZL.ajax({
                url: CONFIG.REPORT_API + "/gather.do",
                method: "POST",
                data: {
                    data: JSON.stringify(pvs)
                }
            });
        }, true);
    });

    /* 暴露 API 工厂*/
    return factory;

})(window, window.HZM = window.HZM || {});