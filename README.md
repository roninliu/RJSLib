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

1. ajax
类似jquery，功能单一，够用
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
