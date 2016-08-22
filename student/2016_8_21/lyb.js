$(function () {
	var num = 0;
	
	$(".btn").click(function () {
		var $addt = $(".text").val();
		 num++;		
		 $list = $("<div class='list'><a href='#'>"+num+"."+$addt+"</a></div>");
		$(".msn").append($list);
		$list.show();
		$("em").remove();
		var $rem;
		$list.mouseenter(function () {
			$rem = $("<span class='rem'>删除</span>");
			$list.append($rem);
			$rem.css({
				"position":"absolute",
				"top":"0",
				"right":"0",
				"color":"red"
			}).show();
		}).mouseleave(function () {
			$rem.remove();
		}).click(function () {
			if(confirm("是否确认删除？")){
				$(this).remove();
			}
		});
		
	});
	
});