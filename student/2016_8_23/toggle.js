$(document).ready(function() {

				//一种方法 布尔 show
				var show = true;
				$(".head1").click(function () {
					if(show) {
						$(".mytext1").hide();
						show = false;
					}else {
						$(".mytext1").show();
						show = true;
					}
					//需要把状态置回	
				});
				
				
				//另一种方法 .is(":visible")
//				var $head = $(".head1");
//				$(".head1").click(function () {
//					if($head.next().is(":visible")) {
//						$(this).next().hide();
//					}else{
//						$(this).next().show();
//					}	
					//条件对象别写错
//				});


//		$(".head1").click(function () {
//			$(this).next().slideToggle();
//		});
		$(".head2").click(function () {
			$(this).next().fadeToggle(1000);
		});
		$(".head3").click(function () {
			$(this).next().fadeTo(1000,0.2);
		});
		$("p").animate({height:"hide"},1000);
			
});