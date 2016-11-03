//$(function () {
//	var num = 0;
//	$(".btn").click(function () {
//		var $addt = $(".text").val();
//		num++;		
//		$list = $("<div class='list'><a href='#'>"+num+"."+$addt+"</a></div>");
//		$(".msn").append($list);
//		$list.show();
//		$("em").remove();
//		var $rem;
//		$list.mouseenter(function () {
//			$rem = $("<span class='rem'>删除</span>");
//			$list.append($rem);
//			$rem.css({
//				"position":"absolute",
//				"top":"0",
//				"right":"0",
//				"color":"red"
//			}).show();
//		}).mouseleave(function () {
//			$rem.remove();
//		}).click(function () {
//			if(confirm("是否确认删除？")){
//				$(this).remove();
//			}；
//		});
//	});
//});

//事件委派：
$(function () {
	var num= 0;
	
	var $rem;
	
	$(".btn").click(function () {
		var $addt = $(".text").val();
		num++;
		$list = $("<div class='list'><a href='#'>"+num+"."+$addt+"</a></div>");
		$(".msn").append($list);
		$list.show();
		$("em").remove();
		
		
		
	});
	
	//因为是在总的btn的click事件绑定的，所以每点一次btn都会绑定一次下面的事件，所以要单独写，就不会弹出好多次确认框了
	$(".msn").on("mouseenter",".list",function () {
			$rem = $("<span class='rem'>删除</span>");
			$(this).append($rem);
			$rem.show();
		}).on("mouseleave",".list",function(){
			$rem.remove();
		});
	$(".msn").on("click",".list",function(){
		if(confirm("是否确认删除？")){
				$(this).remove();
			};
	});
})