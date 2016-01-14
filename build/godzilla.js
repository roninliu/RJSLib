var GZL = function(e, t) {
	"use strict";
	var n = "[Godzilla]";
	t.settings = {
		DEBUG: !1
	}, t.ajax = function(o) {
		var r = null;
		if (o = o || null, !o) return t.settings.DEBUG && console.info(n, o), console.error(n, "options is required"), !1;
		if (o.method = o.method || "GET", o.data = o.data || {}, o.url = o.url || null, o.success = o.success || function() {}, o.error = o.error || function() {}, !o.url) return t.settings.DEBUG && console.info(n, url), console.error(n, "options url is required"), !1;
		e.XMLHttpRequest ? (r = new XMLHttpRequest, t.settings.DEBUG && console.info(n, "Browser ajax supported")) : (t.settings.DEBUG && console.error(n, "Browser not support ajax"), r = null);
		var s = o.method.toUpperCase(),
			a = Math.random();
		if ("object" == typeof o.data) {
			var i = "";
			for (var u in o.data) i += u + "=" + o.data[u] + "&";
			o.data = i.replace(/&$/, "")
		}
		"GET" == s ? (o.data ? r.open("GET", o.url + "?" + o.data, !0) : r.open("GET", o.url + "?t=" + a, !0), r.send()) : "POST" == s && (r.open("POST", o.url, !0), r.setRequestHeader("Content-type", "application/x-www-form-urlencoded"), r.send(o.data)), r.onreadystatechange = function() {
			if (4 == r.readyState)
				if (t.settings.DEBUG && console.log(n, "request status:", r.status), 200 == r.status) {
					var e = r.responseText;
					try {
						e = JSON.parse(e)
					} catch (s) {
						t.settings.DEBUG && console.log(n, "Error:", s), e = e
					}
					t.settings.DEBUG && console.log(n, "Ajax Result:", e), o.success(e)
				} else t.settings.DEBUG && console.log(n, "Ajax Result:", r.responseText), o.error(r.status)
		}
	}, t.parseURI = function() {
		var e = "";
		e = 0 !== arguments.length ? arguments[0] : window.location.href, t.settings.DEBUG && console.log(n, e);
		var o = document.createElement("a");
		o.href = e;
		var r = {
			source: e,
			protocol: o.protocol.replace(":", ""),
			host: o.hostname,
			port: o.port,
			query: o.search,
			params: function() {
				for (var e, t = {}, n = o.search.replace(/^\?/, "").split("&"), r = n.length, s = 0; r > s; s++) n[s] && (e = n[s].split("="), t[e[0]] = e[1]);
				return t
			}(),
			file: (o.pathname.match(/\/([^\/?#]+)$/i) || [, ""])[1],
			hash: o.hash.replace("#", ""),
			path: o.pathname.replace(/^([^\/])/, "/$1"),
			relative: (o.href.match(/tps?:\/\/[^\/]+(.+)/) || [, ""])[1],
			segments: o.pathname.replace(/^\//, "").split("/")
		};
		return t.settings.DEBUG && console.log(n, "URL INFO:", r), r
	}, t.getPlatform = function() {
		var e = !0;
		0 !== arguments.length && (e = arguments[0]);
		var t = navigator.userAgent.toLowerCase();
		return /mobile/i.test(t) || /MIDP|SymbianOS|NOKIA|SAMSUNG|LG|NEC|TCL|Alcatel|BIRD|DBTEL|Dopod|PHILIPS|HAIER|LENOVO|MOT-|Nokia|SonyEricsson|SIE-|Amoi|ZTE/.test(t) ? /iphone/i.test(t) ? /micromessenger/i.test(t) ? e ? 4 : "IOS-WX" : e ? 2 : "IOS" : /android/i.test(t) ? /micromessenger/i.test(t) ? e ? 4 : "Andriod-WX" : e ? 1 : "Andriod" : e ? 5 : "unkown" : e ? 3 : "PC"
	}, t.generateUUID = function() {
		var e = null;
		e = 0 !== arguments.length ? arguments[0] : (new Date).getTime();
		var o = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(t) {
			var n = (e + 16 * Math.random()) % 16 | 0;
			return e = Math.floor(e / 16), ("x" == t ? n : 7 & n | 8).toString(16)
		});
		return t.settings.DEBUG && console.log(n, "UUID:", o), o
	}, t.setCookie = function(e, o) {
		var r = null;
		if (r = arguments.length > 2 ? arguments[2] : null, e && o) {
			var s = encodeURIComponent(e) + "=" + encodeURIComponent(o);
			if (null !== r) {
				if (r.expires) {
					var a = new Date;
					a.setTime(a.getTime() + 24 * r.expires * 60 * 60 * 1e3), s += ";expires=" + a.toGMTString()
				}
				r.path && (s += ";path=" + r.path), r.domain && (s += ";domain=" + r.domain), r.secure && (s += ";secure")
			}
			return document.cookie = s, t.settings.DEBUG && console.log(n, "Cookie:", document.cookie), s
		}
		return ""
	}, t.getCookie = function(e) {
		var o = v(),
			r = decodeURIComponent(o[e]) || null;
		return t.settings.DEBUG && console.log(n, "Cookie " + e, ":", r), r
	}, t.removeCookie = function(e) {
		var o = v();
		o[e] && (document.cookie = e + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT"), t.settings.DEBUG && console.log(n, "Cookie:", document.cookie)
	}, t.clearCookie = function() {
		var e = v();
		for (var o in e) document.cookie = o + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
		t.settings.DEBUG && console.log(n, "Cookie:", document.cookie)
	}, t.getAllCookies = function() {
		var e = v(),
			o = {};
		for (var r in e) o[r] = decodeURIComponent(e[r]);
		return t.settings.DEBUG && console.log(n, "All Cookie:", o), o
	}, t.Sha1 = function(e) {
		function o(e, t) {
			return (2147483647 & e) + (2147483647 & t) ^ 2147483648 & e ^ 2147483648 & t
		}

		function r(e) {
			for (var t = "0123456789abcdef", n = "", o = 7; o >= 0; o--) n += t.charAt(e >> 4 * o & 15);
			return n
		}

		function s(e) {
			for (var t = (e.length + 8 >> 6) + 1, n = new Array(16 * t), o = 0; 16 * t > o; o++) n[o] = 0;
			for (o = 0; o < e.length; o++) n[o >> 2] |= e.charCodeAt(o) << 24 - 8 * (3 & o);
			return n[o >> 2] |= 128 << 24 - 8 * (3 & o), n[16 * t - 1] = 8 * e.length, n
		}

		function a(e, t) {
			return e << t | e >>> 32 - t
		}

		function i(e, t, n, o) {
			return 20 > e ? t & n | ~t & o : 40 > e ? t ^ n ^ o : 60 > e ? t & n | t & o | n & o : t ^ n ^ o
		}

		function u(e) {
			return 20 > e ? 1518500249 : 40 > e ? 1859775393 : 60 > e ? -1894007588 : -899497514
		}
		for (var c = s(e), l = new Array(80), g = 1732584193, f = -271733879, d = -1732584194, p = 271733878, h = -1009589776, m = 0; m < c.length; m += 16) {
			for (var v = g, x = f, E = d, G = p, U = h, D = 0; 80 > D; D++) {
				16 > D ? l[D] = c[m + D] : l[D] = a(l[D - 3] ^ l[D - 8] ^ l[D - 14] ^ l[D - 16], 1);
				var C = o(o(a(g, 5), i(D, f, d, p)), o(o(h, l[D]), u(D)));
				h = p, p = d, d = a(f, 30), f = g, g = C
			}
			g = o(g, v), f = o(f, x), d = o(d, E), p = o(p, G), h = o(h, U)
		}
		var B = r(g) + r(f) + r(d) + r(p) + r(h);
		return t.settings.DEBUG && console.log(n, "SHA1:", B), B
	}, t.Md5 = function(e) {
		var r = "";
		r = arguments.length > 1 ? arguments[1].toString() + e.toString() : e;
		var s = a(o(r));
		return t.settings.DEBUG && console.log(n, "MD5:", s), s
	};
	var o = function(e) {
			return s(r(e))
		},
		r = function(e) {
			return unescape(encodeURIComponent(e))
		},
		s = function(e) {
			return m(h(i(e), 8 * e.length))
		},
		a = function(e) {
			var t, n, o = "0123456789abcdef",
				r = "";
			for (n = 0; n < e.length; n += 1) t = e.charCodeAt(n), r += o.charAt(t >>> 4 & 15) + o.charAt(15 & t);
			return r
		},
		i = function(e) {
			var t, n = [];
			for (n[(e.length >> 2) - 1] = void 0, t = 0; t < n.length; t += 1) n[t] = 0;
			for (t = 0; t < 8 * e.length; t += 8) n[t >> 5] |= (255 & e.charCodeAt(t / 8)) << t % 32;
			return n
		},
		u = function(e, t, n, o, r, s, a) {
			return c(t & n | ~t & o, e, t, r, s, a)
		},
		c = function(e, t, n, o, r, s) {
			return l(g(l(l(t, e), l(o, s)), r), n)
		},
		l = function(e, t) {
			var n = (65535 & e) + (65535 & t),
				o = (e >> 16) + (t >> 16) + (n >> 16);
			return o << 16 | 65535 & n
		},
		g = function(e, t) {
			return e << t | e >>> 32 - t
		},
		f = function(e, t, n, o, r, s, a) {
			return c(t & o | n & ~o, e, t, r, s, a)
		},
		d = function(e, t, n, o, r, s, a) {
			return c(t ^ n ^ o, e, t, r, s, a)
		},
		p = function(e, t, n, o, r, s, a) {
			return c(n ^ (t | ~o), e, t, r, s, a)
		},
		h = function(e, t) {
			e[t >> 5] |= 128 << t % 32, e[(t + 64 >>> 9 << 4) + 14] = t;
			var n, o, r, s, a, i = 1732584193,
				c = -271733879,
				g = -1732584194,
				h = 271733878;
			for (n = 0; n < e.length; n += 16) o = i, r = c, s = g, a = h, i = u(i, c, g, h, e[n], 7, -680876936), h = u(h, i, c, g, e[n + 1], 12, -389564586), g = u(g, h, i, c, e[n + 2], 17, 606105819), c = u(c, g, h, i, e[n + 3], 22, -1044525330), i = u(i, c, g, h, e[n + 4], 7, -176418897), h = u(h, i, c, g, e[n + 5], 12, 1200080426), g = u(g, h, i, c, e[n + 6], 17, -1473231341), c = u(c, g, h, i, e[n + 7], 22, -45705983), i = u(i, c, g, h, e[n + 8], 7, 1770035416), h = u(h, i, c, g, e[n + 9], 12, -1958414417), g = u(g, h, i, c, e[n + 10], 17, -42063), c = u(c, g, h, i, e[n + 11], 22, -1990404162), i = u(i, c, g, h, e[n + 12], 7, 1804603682), h = u(h, i, c, g, e[n + 13], 12, -40341101), g = u(g, h, i, c, e[n + 14], 17, -1502002290), c = u(c, g, h, i, e[n + 15], 22, 1236535329), i = f(i, c, g, h, e[n + 1], 5, -165796510), h = f(h, i, c, g, e[n + 6], 9, -1069501632), g = f(g, h, i, c, e[n + 11], 14, 643717713), c = f(c, g, h, i, e[n], 20, -373897302), i = f(i, c, g, h, e[n + 5], 5, -701558691), h = f(h, i, c, g, e[n + 10], 9, 38016083), g = f(g, h, i, c, e[n + 15], 14, -660478335), c = f(c, g, h, i, e[n + 4], 20, -405537848), i = f(i, c, g, h, e[n + 9], 5, 568446438), h = f(h, i, c, g, e[n + 14], 9, -1019803690), g = f(g, h, i, c, e[n + 3], 14, -187363961), c = f(c, g, h, i, e[n + 8], 20, 1163531501), i = f(i, c, g, h, e[n + 13], 5, -1444681467), h = f(h, i, c, g, e[n + 2], 9, -51403784), g = f(g, h, i, c, e[n + 7], 14, 1735328473), c = f(c, g, h, i, e[n + 12], 20, -1926607734), i = d(i, c, g, h, e[n + 5], 4, -378558), h = d(h, i, c, g, e[n + 8], 11, -2022574463), g = d(g, h, i, c, e[n + 11], 16, 1839030562), c = d(c, g, h, i, e[n + 14], 23, -35309556), i = d(i, c, g, h, e[n + 1], 4, -1530992060), h = d(h, i, c, g, e[n + 4], 11, 1272893353), g = d(g, h, i, c, e[n + 7], 16, -155497632), c = d(c, g, h, i, e[n + 10], 23, -1094730640), i = d(i, c, g, h, e[n + 13], 4, 681279174), h = d(h, i, c, g, e[n], 11, -358537222), g = d(g, h, i, c, e[n + 3], 16, -722521979), c = d(c, g, h, i, e[n + 6], 23, 76029189), i = d(i, c, g, h, e[n + 9], 4, -640364487), h = d(h, i, c, g, e[n + 12], 11, -421815835), g = d(g, h, i, c, e[n + 15], 16, 530742520), c = d(c, g, h, i, e[n + 2], 23, -995338651), i = p(i, c, g, h, e[n], 6, -198630844), h = p(h, i, c, g, e[n + 7], 10, 1126891415), g = p(g, h, i, c, e[n + 14], 15, -1416354905), c = p(c, g, h, i, e[n + 5], 21, -57434055), i = p(i, c, g, h, e[n + 12], 6, 1700485571), h = p(h, i, c, g, e[n + 3], 10, -1894986606), g = p(g, h, i, c, e[n + 10], 15, -1051523), c = p(c, g, h, i, e[n + 1], 21, -2054922799), i = p(i, c, g, h, e[n + 8], 6, 1873313359), h = p(h, i, c, g, e[n + 15], 10, -30611744), g = p(g, h, i, c, e[n + 6], 15, -1560198380), c = p(c, g, h, i, e[n + 13], 21, 1309151649), i = p(i, c, g, h, e[n + 4], 6, -145523070), h = p(h, i, c, g, e[n + 11], 10, -1120210379), g = p(g, h, i, c, e[n + 2], 15, 718787259), c = p(c, g, h, i, e[n + 9], 21, -343485551), i = l(i, o), c = l(c, r), g = l(g, s), h = l(h, a);
			return [i, c, g, h]
		},
		m = function(e) {
			var t, n = "";
			for (t = 0; t < 32 * e.length; t += 8) n += String.fromCharCode(e[t >> 5] >>> t % 32 & 255);
			return n
		},
		v = function() {
			var e = {};
			if (t.settings.DEBUG && console.log(n, "Cookie infomation:", document.cookie), document.cookie) {
				var o = document.cookie.split(";");
				for (var r in o) {
					var s = o[r].indexOf("="),
						a = o[r].substr(0, s).replace(/\s+/g, ""),
						i = o[r].substr(s + 1, o[r].length).replace(/\s+/g, "");
					e[a] = i
				}
			}
			return t.settings.DEBUG && console.log(n, "Cookie:", e), e
		};
	return t
}(window, window.GZL = window.GZL || {});