$(function () {
	//选择城市
	$('#takeOffCity').citySelect();
	$('#arriveCity').citySelect();
	//交换城市按钮
	$(".changeCityBtn").click(function () {
		var $takeOffCity = $("#takeOffCity").val();
		var $arriveCity = $("#arriveCity").val();
		$("#takeOffCity").val($arriveCity);
		$("#arriveCity").val($takeOffCity);
	});
	//返程激活状态
	$(".one_way").click(function () {
		$(".reDate").css("color","#BFBFBF");
		var reValue = $("#returnDate");
		reValue.val(' ');
		reValue.next().text(' ');
			
	});
	$(".round_trip").click(function () {
		$(".reDate").css("color","black");
	});
	$("#returnDate").focus(function () {
		var reValue = $("#returnDate").val();
		console.log(reValue);
		if (reValue!==' ') {
			$(".round_trip").prop("checked",true);
			$(".reDate").css("color","black");
		}
	})
	
	//日期选择插件
	 var dayNames = $("#takeOffDate").datepicker('option','dayNames');
	 var takeOffDate = $("#takeOffDate").val();
	 var returnDate = $("#returnDate").val();
	$( "#takeOffDate" ).datepicker({
        numberOfMonths: 2,
	    dateFormat: "yy-mm-dd",
	    dayNames: ['星期日','星期一','星期二','星期三','星期四','星期五','星期六'],
		minDate: new Date(),
		onSelect:function(date){
			$( "#returnDate" ).datepicker( "option", "minDate", date );
			var newday = new Date(date);
			var myDay = newday.getDay();
			var aa = "";
				switch(myDay) {
					case 1:
						aa = "一";
						break;
					case 2:
						aa = "二";
						break;
					case 3:
						aa = "三";
						break;
					case 4:
						aa = "四";
						break;
					case 5:
						aa = "五";
						break;
					case 6:
						aa = "六";
						break;
					default:
						aa = "日";
						break;
				}
			myDay =  "星期" + aa;
			$("#takeOffDate").next().text(myDay);
		}
    });
    $( "#returnDate" ).datepicker({
        numberOfMonths: 2,
	    dateFormat: "yy-mm-dd",
	    dayNames: ['星期日','星期一','星期二','星期三','星期四','星期五','星期六'],
	    minDate:new Date(),
		onSelect:function(date){
			$( "#takeOffDate" ).datepicker( "option", "maxDate", date );
			var newday = new Date(date);
			var myDay = newday.getDay();
			var aa = "";
				switch(myDay) {
					case 1:
						aa = "一";
						break;
					case 2:
						aa = "二";
						break;
					case 3:
						aa = "三";
						break;
					case 4:
						aa = "四";
						break;
					case 5:
						aa = "五";
						break;
					case 6:
						aa = "六";
						break;
					default:
						aa = "日";
						break;
				}
			myDay =  "星期" + aa;
			$("#returnDate").next().text(myDay);
		}
    });
   
		
})