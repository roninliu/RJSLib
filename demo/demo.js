/**
 * [测试用例]
 */
(function() {
	GZL.settings.DEBUG = true; //声明调试模式
	//1.测试ajax



	$(function() {
		GZL.ajax({
			url: "xxxx",
			data: {
				a: 1
			},
			success:function(result){
				console.log(result);
			}
		});
		console.log(GZL.parseURI());
		console.log(GZL.getPlatform());
		console.log(GZL.getPlatform(false));
		console.log(GZL.generateUUID());
		console.log(GZL.generateUUID(12345663223));
		console.log(GZL.Sha1("hz"));
		console.log(GZL.Md5("hz"));
	})

}())