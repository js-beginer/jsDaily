$(function() {
	var $nav = $(".category-nav");
	var $article = $(".category-article");
	var $navbar = $(".article-nav");
	var $list = $(".myul");
	
	//标签页切换
	$nav.click(function() {
		var _this = $(this);
		var index = _this.index();
		var str = $(this).data("codeId");
		var strid = "#" + str;
		$list = $(strid + " .myul");
		_this.addClass("category-nav-active").siblings().removeClass("category-nav-active");
		$article.eq(index).show().siblings().hide();
	});
	$navbar.click(function() {
		var _this = $(this);
		var index = _this.index();
		_this.addClass("article-nav-active").siblings().removeClass("article-nav-active");
		$list.eq(index).show().siblings().hide();
	});
	//处理时间
	function mydate(date) {
		var now = new Date().getTime();
		var text = '';
		var distance = parseInt(now - date);
		if(distance <= 86400 * 1000) {
			text = "大约" + Math.round((now - date) / 3600000) + "小时以前";
		} else if(distance < 86400000 * 30) {
			text = Math.round((now - date) / 86400000) + "天以前";
		} else if(distance < 86400000 * 30 * 12) {
			text = Math.round((now - date) / 86400000 / 30) + "个月以前";
		} else {
			text = "一年以前";
		}
		return text;
	};
	//模板引擎
	$(".myul").each(function(index) {
		var id = $(this).data("arrId");
		var arr = window["articles" + id];
		//处理时间
		for(var i = 0; i < arr.length; i++) {
			arr[i].timestamp = mydate(arr[i].timestamp);
		}
		//解析模版
		var myHandle = Handlebars.compile($("#hanle").html());
		//生成html
		var myLi = myHandle(arr);
		//插入到页面
		$(this).append(myLi);
	});
	
	//判断是否有图片封面
	$("img").each(function(index) {
		if($("img").eq(index).attr('src') == '') {
			$(this).css("display", "none");
		};
	});
})
