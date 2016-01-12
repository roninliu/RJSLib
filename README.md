# RJSLib
RJS Lib
javascript库，godzilla
实现公用库：

---
全局Debug模式
```
GZL.settings.DEBUG = true;
```
---

1 . ajax
类似jquery，功能简单，平常使用足够
使用方法：
```
GZL.ajax({
	url:"url",
	data:{
		name:1,
		age:2
	},
	success:function(res){
		console.log(res)
	}
})
```
---
2 . parseURI
解析URL参数
使用方法：
```
GZL.parseURI();//解析浏览器地址的url
```
或者
```
GZL.parseURI("http://www.google.com?t=1000");//解析输入的url参数
```
---
3 . getPlatform
获取设备平台
```
GZL.getPlatform();//输出平台代号，1，2，3，4，5 这种
```
或者
```
GZL.getPlatform(false);//输出平台代码，IOS，Android ，PC 这种
```
---
4 . generateUUID
获取UUID，javascript模拟
```
GZL.generateUUID();
```
或者
```
GZL.generateUUID("12345667")
```
---

5 . setCookie
设置Cookie
```
GZL.setCookie("name", "1221", {
	expires: 10,
    path: "/",
    domain: 'xxx.com'
})
GZL.setCookie("test", "100000", {
    expires: 10,
	path: "/"
})
GZL.setCookie("KEY", "1111111");
GZL.setCookie("age", "12岁")
GZL.setCookie("user", "oo");
```
---
6 . getAllCookies
获取全部cookie
```
GZL.getAllCookies();
```
---
7 . getCookie
获取指定key cookie
```
GZL.getCookie("age");
```
---

8 . removeCookie
移除指定key cookie
```
GZL.removeCookie("user");
```
---
9 . clearCookie
清除所有cookie
```
GZL.clearCookie()
```
--- 
10 .  Sha1
Sha1加密
```
GZL.Sha1("msg");
```
---
11 .  md5
md5 加密
```
GZL.Md5("11111");
```
