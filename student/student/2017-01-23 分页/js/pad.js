$(function () {
	//模板引擎
	var myTemplate = Handlebars.compile($("#mypage").html());
	$('#tem').html(myTemplate(articles));
	
	var myTemplate = Handlebars.compile($("#mypage").html());
	$('#tem2').html(myTemplate(articles2));
	//分页
	var showNum = 4; //每页显示几条
	var all_items = $('#tem').children().size();  //共多少条
	var all_pages = Math.ceil(all_items / showNum); //共多少页
	var current_page = 0;//当前页
	var count = 0;
	
	function Pagination(showNum) {
		this.showNum = showNum;
//		this.all_items = $("#tem").children().size();  //共多少条
//		this.all_pages = Math.ceil(all_items / this.showNum); //共多少页
//		this.current_page = 0;//当前页
//		this.count = 0;	
	};
		//点击页码	
		Pagination.prototype.Pages = function(){
			while (all_pages>count){
				var $link = $('<a class="page_link" href="javascript:;">'+ (count+1) +'</a>');
				$link.appendTo($(".page_navigation"));
				$link.click(function(){
					current_page = $(".page_link").index(this);
					$(this).index();
					Pagination.prototype.GoPage(current_page);
				});
				count++;
			};
		};	
		//上一页
		Pagination.prototype.Previous = function(){
			var $previous_link = $('<a class="previous_link" href="javascript:;"><</a>');
			$(".page_navigation").prepend($previous_link);
			$('.page_navigation').on("click",".previous_link",function () {
				current_page = current_page - 1;
				if($('.active_page').prev('.page_link').length > 0) {
					Pagination.prototype.GoPage(current_page);
				}else{
					current_page = 0;
					$(".previous_link").addClass("disable");
				};
			});
		}
		//下一页
		Pagination.prototype.Next = function(){
			var $next_link = $('<a class="next_link" href="javascript:;">></a>');
			$(".page_navigation").append($next_link);
			$('.page_navigation').on("click",".next_link",function () {
				current_page = current_page + 1;
				if($('.active_page').next('.page_link').length > 0) {
					Pagination.prototype.GoPage(current_page);
				}else{
					current_page = all_pages - 1;
					$(".next_link").addClass("disable");
				};
			});
		};
		//点击页码
		Pagination.prototype.GoPage = function(page_num){
			start_from = page_num * this.showNum;
			end_on = start_from + this.showNum;
			$('#tem').children().css('display','none').slice(start_from,end_on).css('display','block');
			$(".page_link").eq(current_page).addClass('active_page').siblings('.active_page').removeClass('active_page');
			//禁用
			if(current_page === 0) {
				$(".previous_link").addClass("disable");
			}else {
				$(".previous_link").removeClass("disable");
			};
			
			if(current_page === all_pages-1) {
				$(".next_link").addClass("disable");
			}else {
				$(".next_link").removeClass("disable");
			};
		};
		//初始化
		Pagination.prototype.Initial = function(){
			$('.page_navigation .page_link:first').addClass('active_page');
			$('#tem').children().css('display', 'none');
			$('#tem').children().slice(0, this.showNum).css('display', 'block');
			$(".previous_link").addClass("disable");
		}
//		init: function () {
//			this.Pages();
//			this.Previous();
//			this.Next();
//			this.Initial();
//		}
	
//	Pagination.init();
	var Pagination_1 = new Pagination(4);
	Pagination_1.Pages();
	Pagination_1.Previous();
	Pagination_1.Next();
	Pagination_1.Initial();
	
})

