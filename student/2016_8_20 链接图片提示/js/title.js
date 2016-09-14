//红色快随鼠标移动
//$(function(){
//	var x = 2;
//	var y = 2;
//	$(document).mousemove(function(e){ 
//// 		$(".aa").text("X:"+e.pageX+"PX,Y:"+e.pageY+"PX"); 
//		$(".aa").css({
//			"top":(e.pageY+y)+"px",
//			"left":(e.pageX+x)+"px"
//					
//			});
// 		});
//});

//文字提示
$(function() {
	var x = 10;
	var y = 20;
	$(".maow").mouseover(function(e) {
		this.myTitle = this.title;
		this.title = "";
		var imgTitle = this.myTitle?this.myTitle:"";
		var adw = "<div id='adwen'>"+imgTitle+"</div>";
		$("body").append(adw)
		$("#adwen").css({
			"top":e.pageY+y+"px",
			"left":e.pageX+x+"px"
		}).show("fast");
	}).mouseout(function() {
		this.title = this.myTitle;
		$("#adwen").remove();
	}).mousemove(function(e) {
		$("#adwen").css({
			"position":"absolute",
			"top":e.pageY+y+"px",
			"left":e.pageX+y+"px"
		});
	});
})   

//图片预览提示:
   $(function() {
   	var x = 10;
   	var y = 20;
   	$(".mao").mouseover(function(e) {
   		this.myTitle = this.title;
   		this.title = "";
   		var imgTitle = this.myTitle?"<br/>"+this.myTitle:"";
   		var tip = "<div id='adtip'><img src='"+this.href+"' alt='产品预览图'/>"+imgTitle+"</div>";
   		$("body").append(tip);
   		$("#adtip").css({
   			"top":e.pageY+y+"px",
   			"left":e.pageX+x+"px"
   		}).show("fast");
   		$(tip).css("backgroundColor","red");//怎么设置说明文字样式？
   	}).mouseout(function() {
   		this.title = this.myTitle;
   		$("#adtip").remove();
   	}).mousemove(function(e) {
   		$("#adtip").css({
   			"position":"absolute",
   			"top":e.pageY+y+"px",
   			"left":e.pageX+x+"px"
   		});
   	});
   })