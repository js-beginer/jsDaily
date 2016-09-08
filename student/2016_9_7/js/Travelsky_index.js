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
	
	
	//
	 var dayNames = $("#takeOffDate").datepicker('option','dayNames');
	 var takeOffDate = $("#takeOffDate").val();
	 var returnDate = $("#returnDate").val();
//	  dayNames.css("color","red");
var datestart;
	$( "#takeOffDate" ).datepicker({
		
        numberOfMonths: 2,
	    dateFormat: "yy-mm-dd",
	    dayNames: ['星期日','星期一','星期二','星期三','星期四','星期五','星期六'],
		minDate: new Date(),
		onSelect:function(date){
			$( "#returnDate" ).datepicker( "option", "minDate", date );
			datestart = date;
			console.log(date);
			
		}
	   
    });
    $( "#returnDate" ).datepicker({
		
        numberOfMonths: 2,
	    dateFormat: "yy-mm-dd",
	    dayNames: ['星期日','星期一','星期二','星期三','星期四','星期五','星期六'],
	    minDate:new Date(),
		onSelect:function(date){
			$( "#takeOffDate" ).datepicker( "option", "maxDate", date );
		}
    });
   
		
})