$(function () {
//	行程表格
	var roomNum = 5;
	var liNum = 16;
	var lihtml;
	var allText = '';
	var arrText = ['第一会议室','第二会议室','第三会议室','第四会议室','第五会议室'];
	var liBox = $('#liBoxClass');
	for(var i = 1; i <= roomNum ;i++){
		var htmlStr = '';
		var Room = 'Room' + i;
		var ul = '<ul class = "'+Room+' room"><li>'+ arrText[i-1] + '</li>';
		lihtml = '';
		for(var j = 1;j <= liNum;j++){
			lihtml += '<li></li>';
		}
		htmlStr = ul + lihtml +'</ul>';
		allText =  allText + htmlStr;
		liBox.html(allText);
	}
//	日期插件
	$( "#datepicker" ).datepicker({
		altField: "#alternate",
		altFormat: "yy-mm-dd",
		showButtonPanel:true,
		onSelect: gotoDate
	});
	function gotoDate(ev){
//          window.location.href = "XX.html" + "?Date=" + ev.date.getFullYear().toString() + "-"+ (ev.date.getMonth()+1).toString()+ "-"+ ev.date.getDate().toString();
		alert(ev);
    }
	$('#gotoToday').click(function(){
		$('#datepicker button[data-handler=today]').click()
	});
	
	
	//结束时间  
	end_str = "2014-01-01 11:30";
	var end_date = new Date(end_str);//将字符串转化为时间  
	
	//开始时间  
	sta_str = "2014-01-01 10:00";  
	var sta_date = new Date(sta_str);  
	var num = (end_date-sta_date)/(1000*3600);//求出两个时间的时间差，这个是天数  
	var days = parseInt(Math.ceil(num));//转化为整天（小于零的话剧不用转了）
	
})

var vm = new Vue({
	el:"#meetApp",
	data:{
		orderList:[],
		addFlag: false,
//		width: 11.6%; /*(5.8*(结束-开始)*2)%  */
//		top: 50px;  /*(50+100*(会议室-1))px  */
//		left: 10%;  /*((开始-8.5)*2*5.8+10)%  */
	},
	
	mounted: function () {
		this.$nextTick(function () {
			this.cartView();
		});
	},
	methods:{
		orderStyle : function(confName,BeginTime,EndTime){
			abc_str = "2017-03-29 08:30";  
			var abc_date = new Date(abc_str);  
//			noon_str = "2017-03-29 11:30";  
//			var noon_date = new Date(noon_str);  
//			night_str = "2017-03-29 17:00";  
//			var night_date = new Date(night_str);
			
			var end_date = new Date(EndTime);
			var sta_date = new Date(BeginTime);  
			
			var sta_num = (sta_date-abc_date)/(1000*3600); //八点半到开始时间  位置
			var end_num = (end_date-sta_date)/(1000*3600); //宽度
			var noon_num = (noon_date-sta_date)/(1000*3600); //开始时间到11点半
			
//			if(abc_date<=sta_date&&sta_date<noon_date&&noon_date<end_date&&end_date<night_date){
//				end_num = end_num - 1;
//				console.log(confName)
//			}
//			if(noon_date<sta_date&&end_date<night_date&&noon_date<end_date&&end_date<night_date){
//				end_num = end_num - 1;
//				sta_num = sta_num - 1;
//			}
//			if(sta_num>2.5){
//				sta_num = sta_num - 1;
//			}
//			if(end_num>3.5){
//				end_num = end_num - 1;
//			}
//			if(sta_num<2.5&&noon_num<end_num){
//				end_num = end_num - 1;
//			}
			return {
				width : (5.8*Number(end_num)*2) + "%",
				top : (50+100*(Number(confName)-1)) + 'px',
				left : (Number(sta_num)*2*5.8+10) +"%"
				
			};
		},
		cartView: function () {
			let _this = this;
			this.$http.get("../../data/meetingData.json",{"id":123}).then(res=> {
				this.orderList = res.body.result.list;
			});
		},
		
		addConfirm:function () {
			this.addFlag = true;
		}
		
	}
});
