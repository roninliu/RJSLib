/**
 * [测试用例]
 */
(function() {
	GZL.settings.DEBUG = true; //声明调试模式
	//1.测试ajax



	$(function() {
		GZL.ajax({
			url: "http://xmapi.rls.huizhuang.com/order/Product/productDetailV1.do",
			data: {
				a: 1
			},
			before: function() {
				a: 2
			}
		});
	})

}())