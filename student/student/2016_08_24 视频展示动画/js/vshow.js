//$(function(){
//	var page = 1;
//	var i = 4;
//	//右方向的
//	$("span.next").click(function () {
//		var $parent = $(this).parents("div.main");
//		var $show = $parent.find("div.content_list");
//		var $content = $parent.find("div.content");
////		var wid = $content.width();
//		var len = $show.find("li").length;
//		var page_count = Math.ceil(len/i);
//		if (!$show.is(":animated")) {		//判断动画是否在进行
//			if (page==page_count) {			//如果已经到最后一个版面了，那下一个版面必须是第一版
//				$show.animate({ left: "0px" },"slow");
//				page = 1;
//			} else{
////				var newwid = $(this).width();
////				$show.animate({ left: newwid-wid },"slow");
//				$show.animate({ left : '-=832px'},"slow");
//				page++;
//			}
//			//对应展示数字
//			$parent.find("span").eq((page-1)).addClass("current1").siblings().removeClass("current1");
//		}
//	}).mouseenter(function () {
//		$(this).css({"cursor":"pointer","color":"yellow"})
//	}).mouseleave(function () {
//		$(this).css("color","black")
//	});
//	
//	//左方向的
//	$("span.prev").click(function () {
//		var $parent = $(this).parents("div.main");
//		var $show = $parent.find("div.content_list");
//		var $content = $parent.find("div.content");
////		var wid = $content.width();
//		var len = $show.find("li").length;
//		var page_count = Math.ceil(len/i);
//
//		if (!$show.is(":animated")) {		
//			if (page==1) {			
//				$show.animate({ left: '-='+(page_count-1)*832 },"slow");
//				page=page_count;
//				
//			} else{
//				$show.animate({ left : '+=832px'},"slow");
//				page--;
//			}
//			//对应展示数字
//			$parent.find("span").eq((page-1)).addClass("current1").siblings().removeClass("current1");
//		}
//	}).mouseenter(function () {
//		$(this).css({"cursor":"pointer","color":"yellow"})
//	}).mouseleave(function () {
//		$(this).css("color","black")
//	});
//})

//再写一次加深一下
$(function(){
	var page = 1;
	var i = 4;
	var $parent = $("div.change_btn").parents("div.main");
	var $show = $parent.find("div.content_list");
	var $content = $parent.find("div.content");
	var len = $show.find("li").length;
	var page_count = Math.ceil(len/i);
	$("span.next").click(function () {
		if (!$show.is(":animated")) {
			if (page==page_count) {
				$show.animate({left:"0px"},"slow");
				page = 1;
			} else{
				$show.animate({left:'-=832px'},"slow");
				page++;
			}
			$parent.find("span").eq((page-1)).addClass("current1").siblings().removeClass("current1");
		}
	}).mouseenter(function () {
		$(this).css({"cursor":"pointer","color":"yellow"});
	}).mouseleave(function () {
		$(this).css("color","black");
	});
	
	$("span.prev").click(function () {
		if (!$show.is(":animated")) {
			if (page==1) {
				$show.animate({left:'-='+(page_count-1)*832 },"slow");
				page=page_count;
			} else{
				$show.animate({left:'+=832px'},"slow");
				page--;
			}
			$parent.find("span").eq((page-1)).addClass("current1").siblings().removeClass("current1");
		}
	}).mouseenter(function () {
		$(this).css({"cursor":"pointer","color":"yellow"});
	}).mouseleave(function () {
		$(this).css("color","black");
	});
})


























