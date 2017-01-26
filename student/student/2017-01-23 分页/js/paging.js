$(document).ready(function() {
	//模板引擎
	var myTemplate = Handlebars.compile($("#mypage").html());
	$('#tem').html(myTemplate(articles));
	
	//分页
	var showNum = 4;  //每页显示几条
	var current_page = 0;//当前页
	var number_of_items = $('#tem').children().size();  //共多少条
	var number_of_pages = Math.ceil(number_of_items / showNum); //共多少页
	var count = 0;
//	$('#current_page').val(current_page);
//	$('#showNum').val(showNum);

	while(number_of_pages > count) {
//		navigation_html += '<a class="page_link" href="javascript:go_to_page(' + count + ')" longdesc="' + count + '" >' + (count + 1) + '</a>';
		var $link = $('<a class="page_link" >'+ (count+1) +'</a>');
		$link.click(function(){
			go_to_page(count);
		});
		$link.appendTo($('#page_navigation'));
//		var aEle = $('<a class="page_link" href="javascript:go_to_page(' + count + ')" longdesc="' + count + '" >' + (count + 1) + '</a>');
		count++;
	}
	// $('#page_navigation').html(navigation_html);
	$('#page_navigation .page_link:first').addClass('active_page');
	$('#tem').children().css('display', 'none');
	$('#tem').children().slice(0, showNum).css('display', 'block');
	
	$('#tem').on("click","a.page_link",function () {
		alert(1)
	});
	//上一页	
	var $navigation_html = $('<a class="previous_link"><</a>');
	$navigation_html.appendTo($('#page_navigation'));
	$(".previous_link").click(function () {
		previous();
	});
	//下一页
	$navigation_html += '<a class="next_link">></a>';
	$(".next_link").click(function () {
		next();
	});
	
	function previous() {
		new_page = parseInt(current_page) - 1;
		if($('.active_page').prev('.page_link').length == true) {
			go_to_page(new_page);
		}
	}
	function next() {
		new_page = parseInt(current_page) + 1;
		if($('.active_page').next('.page_link').length == true) {
			go_to_page(new_page);
		}
	}
	//跳转
	function go_to_page(page_num) {
		start_from = page_num * showNum;
		end_on = start_from + showNum;
		$('#tem').children().css('display','none').slice(start_from,end_on).css('display','block');
		$('.page_link').addClass('active_page').siblings('.active_page').removeClass('active_page');
//		$('#current_page').val(page_num);
	}
	
});

	