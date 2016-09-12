//插件中已经封装好了事件，想要获取数据，直接在onSelect回调函数中获取
$(function () {
	var result = {
		takeOffCity:"name",
		takeOffCityCode:"code",
		arriveCity:"name",
		arriveCityCode:"code",
		cabinType:"sel",
		takeOffDate:"date",
		returnDate:"date"
	};	
	//提交并获取json数据
	$(".submit").click(function () {
		var sel = $("select option:selected").val();
		result.cabinType = sel;
		console.log(result);
	});
	//选择城市
	$('#takeOffCity').citySelect({
     selectHandler:function(name,code){
    	result.takeOffCity = name;	
    	result.takeOffCityCode = code;
    	$('#takeOffCity').val(name);
      }
	});
	$('#arriveCity').citySelect({
		selectHandler:function(name,code){
		result.arriveCity = name;	
    	result.arriveCityCode = code;
    	$('#arriveCity').val(name);
      }
	});
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
		reValue.val('');
		reValue.next().text('');
			
	});
	$(".round_trip").click(function () {
		$(".reDate").css("color","black");
	});
	//日期选择插件
	 var dayNames = $("#takeOffDate").datepicker('option','dayNames');
	 var takeOffDate = $("#takeOffDate").val();
	 var returnDate = $("#returnDate").val();
	
	 
	$( "#takeOffDate" ).datepicker({
        numberOfMonths: 2,
	    dateFormat: "yy-mm-dd",
		minDate: new Date(),
		onSelect:function(date){
			result.takeOffDate = date;
			$( "#returnDate" ).datepicker( "option", "minDate", date );
			$("#takeOffDate").next().text(createDay(date));
		}
    });
    $( "#returnDate" ).datepicker({
        numberOfMonths: 2,
	    dateFormat: "yy-mm-dd",
	    minDate:new Date(),
		onSelect:function(date){
			result.returnDate = date;
			var reValue = $("#returnDate").val();
			if (reValue!==' ') {
				$(".round_trip").prop("checked",true);
				$(".reDate").css("color","black");
			}
			$( "#takeOffDate" ).datepicker( "option", "maxDate", date );
			$("#returnDate").next().text(createDay(date));
		}
    });
   //使用函数进行重复的调用
   function createDay(date){
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
   		return "星期" + aa;
   }	
})