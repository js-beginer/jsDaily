$(function () {
//	行程表格
//	var roomNum = 5;
//	var liNum = 18;
//	var liHtml;
//	var allText = '';
//	var arrText = ['第1会议室','第2会议室','第3会议室','第4会议室','第5会议室'];
//	var liBox = $('#liBoxClass');
//	for(var i = 1; i <= roomNum ;i++){
//		var htmlStr = '';
//		var ul = '<ul class ="room"><li>'+ arrText[i-1] + '</li>';
//		liHtml = '';
//		for(var j = 1;j <= liNum;j++){
//			liHtml += '<li></li>';
//		}
//		htmlStr = ul + liHtml +'</ul>';
//		allText =  allText + htmlStr;
//		liBox.html(allText);
//	}
//	日期插件
	$( "#datepicker" ).datepicker({
		altField: "#alternate",
		altFormat: "yy-mm-dd",
		showButtonPanel:true,
		onSelect: vm.gotoDate
	});
	$('#gotoToday').click(function(){
		$('#datepicker button[data-handler=today]').click()
	});
})

var vm = new Vue({
	el:"#meetApp",
	data:{
		orderList:[],
		addFlag: false,
		resFlag: false,
		roomNum : 5,
		liNum : 18,
		liHtml: '',
		allText : '',
		arrText : ['第1会议室','第2会议室','第3会议室','第4会议室','第5会议室'],
		startTime: '',
		endTime: '',
		userName: '',
		content: '',
		meetRoom: ''
	},
	 filters: {
	    timeSort: function (value) {	
	      if (!value) return ''
	      value = value.toString();
	      return value.substr(11,5);
	    }
    },
	mounted: function () {
		this.$nextTick(function () {
			this.cartView();
			this.addLi();
		});
	},
	methods:{
		addLi: function(){
			for(var i = 1; i <= this.roomNum ;i++){
				var htmlStr = '';
				var ul = '<ul class="room"><li>'+ this.arrText[i-1] + '</li>';
				this.liHtml = '';
				for(var j = 1;j <= this.liNum;j++){
					this.liHtml += '<li></li>';
				}
				htmlStr = ul + this.liHtml +'</ul>';
				this.allText =  this.allText + htmlStr;
			}
		},
		orderStyle : function(confName,BeginTime,EndTime){
			abc_str = "2017-03-29 08:30";  
			var abc_date = new Date(abc_str);  
			var end_date = new Date(EndTime);
			var sta_date = new Date(BeginTime);  
			var sta_num = (sta_date-abc_date)/(1000*3600); 
			var end_num = (end_date-sta_date)/(1000*3600); 
			return {
				width : (5.29*Number(end_num)*2) + "%",
				top : (50+100*(Number(confName)-1)) + 'px',
				left : (Number(sta_num)*2*5.29+7.5) +"%"
			};
		},
		cartView: function () {
			let _this = this;
			this.$http.get("../../data/meetingData.json",{"id":123}).then(res=> {
				this.orderList = res.body.result.list;
			});
		},
		addConfirm: function () {
			this.addFlag = true;
		},
		resConfirm: function(item){
			this.resFlag = true;
			this.startTime = item.Appointment_begin_time.substr(11,5);
			this.endTime =  item.Appointment_end_time.substr(11,5);
			this.userName = item.user_name;
			this.content = item.content;
			this.meetRoom = item.conf_name;
//			alert(item.content)
			
		},
		
		gotoDate : function(ev){
			this.$http.post("<%=path%>/BespeakAction!LoginBespeak.do",{"id":123,"date":ev}).then(function(res){
				this.orderList = res.body.result.list;
			});
		alert(ev);
		}
	}
});

//		width: 11.6%; /*(5.8*(结束-开始)*2)%  */
//		top: 50px;  /*(50+100*(会议室-1))px  */
//		left: 10%;  /*((开始-8.5)*2*5.8+10)%  */
