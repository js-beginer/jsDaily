$(function () {
	//模板引擎
	var myTemplate = Handlebars.compile($("#mypage").html());

	//构造函数与原型模式组合
	function Pagination(el,data,showNum) {
		this.el = $(el);
		this.data = data;
		this.showNum = showNum;	//一页显示多少条
		
		this.all_items = data.length; //共多少条
		this.all_pages = Math.ceil(this.all_items / showNum); //共多少页
		this.current_page = 0; //当前页
		this.count = 0;
		this.init();
	};
	
	Pagination.prototype = {
		GoPage: function(page_num){
			this.current_page = page_num;
			var start_from = page_num * this.showNum;
			var end_on = start_from + this.showNum;
			this.el.find('.article').html(myTemplate(this.data.slice(start_from,end_on)));
			this.el.find(".page_link").eq(this.current_page).addClass('active_page').siblings('.active_page').removeClass('active_page');
			//禁用
			if(this.current_page === 0) {
				this.el.find(".previous_link").addClass("disable");
			}else {
				this.el.find(".previous_link").removeClass("disable");
			};
			
			if(this.current_page === this.all_pages-1) {
				this.el.find(".next_link").addClass("disable");
			}else {
				this.el.find(".next_link").removeClass("disable");
			};
		},
		
		createPages: function(){
			//var count = 0;
			var that = this;
			while (this.all_pages>this.count){
				var $link = $('<a class="page_link" href="javascript:;">'+ (++this.count) +'</a>');
				$link.appendTo(this.el.find(".page_navigation"));
				$link.click(function(){
					current_page = that.el.find(".page_link").index(this);
					that.GoPage(current_page);
				});
			};
		},
		createPrevious: function(){
			var that = this;
			var $previous_link = $('<a class="previous_link" href="javascript:;"><</a>');
			this.el.find(".page_navigation").prepend($previous_link);
			this.el.find('.page_navigation').on("click",".previous_link",function () {
				that.current_page--;
				if(that.el.find('.active_page').prev('.page_link').length > 0) {
					that.GoPage(that.current_page);
				}else{
					that.current_page = 0;
					that.el.find(".previous_link").addClass("disable");
				};
			});
		},
		createNext: function(){
			var that = this;
			var $next_link = $('<a class="next_link" href="javascript:;">></a>');
			this.el.find(".page_navigation").append($next_link);
			this.el.find('.page_navigation').on("click",".next_link",function () {
				that.current_page++;
				if(that.el.find('.active_page').next('.page_link').length > 0) {
					that.GoPage(that.current_page);
				}else{
					that.current_page = that.all_pages - 1;
					that.el.find(".next_link").addClass("disable");
				};
			});
		},
		
		init:function(){
			this.createPages();
			this.createPrevious();
			this.createNext();
			// 初始化
			this.el.find('.page_navigation .page_link:first').addClass('active_page');
			this.el.find('.article').html(myTemplate(this.data.slice(0,this.showNum)));
			this.el.find(".previous_link").addClass("disable");
		}
	}

	var Pagination_1 = new Pagination($('#content1'),articles,4);
	var Pagination_2 = new Pagination($('#content2'),articles2,3);
	
	
})



