$(function() {
	//	日期插件
	$("#datepicker").datepicker({
		altField: "#alternate",
		altFormat: "yy-mm-dd",
		showButtonPanel: true,
		onSelect: vm.gotoDate
	});
	$('#gotoToday').click(function() {
		$('#datepicker button[data-handler=today]').click()
	});
})

var vm = new Vue({
	el: "#meetApp",
	data: {
		orderList: [
			{
				"Appointment_date":''
			}
		],
		addFlag: false,
		resFlag: false,
		roomNum: 5,
		liNum: 18,
		liHtml: '',
		allText: '',
		arrText: ['第1会议室', '第2会议室', '第3会议室', '第4会议室', '第5会议室'],
		startTime: '',
		endTime: '',
		userName: '',
		content: '',
		meetRoom: '',
		startTimeNew : '',
		endTimeNew : '',
		userNameNew : '',
		contentNew : '',
		meetRoomNew : '',
		myDate:''
	},
	filters: {
		timeSort: function(value) {
			if(!value) return ''
			value = value.toString();
			return value.substr(11, 5);
		}
	},
	mounted: function() {
		this.$nextTick(function() {
			this.orderView();
			this.addLi();
		});
	},
	methods: {
		//	行程表格
		addLi: function() {
			for(var i = 1; i <= this.roomNum; i++) {
				var htmlStr = '';
				var ul = '<ul class="room"><li>' + this.arrText[i - 1] + '</li>';
				this.liHtml = '';
				for(var j = 1; j <= this.liNum; j++) {
					this.liHtml += '<li></li>';
				}
				htmlStr = ul + this.liHtml + '</ul>';
				this.allText = this.allText + htmlStr;
			}
		},
		//  order定位
		orderStyle: function(confName, BeginTime, EndTime) {
			var begin_str = "2017-03-29 08:30";
			var bengin_date = moment(begin_str);
			var end_date = moment(EndTime);
			var sta_date = moment(BeginTime);
			var sta_num = (sta_date - bengin_date) / (1000 * 3600);
			var end_num = (end_date - sta_date) / (1000 * 3600);
			return {
				width: (5.29 * Number(end_num) * 2) + "%",
				top: (50 + 100 * (Number(confName) - 1)) + 'px',
				left: (Number(sta_num) * 2 * 5.29 + 7.5) + "%"
			};
		},
		orderView: function() {
			this.$http.get("../..//data/meetingData.json").then(function(res) {
//				this.orderList = res.body.list[0].result.list;
				this.orderList = res.body.list[0].result;
				
			});
		},
		addOrder: function() {
			this.startTimeNew = this.myDate + ' ' + this.startTimeNew;
			this.$http.post("BespeakAction!applyConferenceRoom.do", {
				"Appointment_begin_time": this.startTimeNew,
				"Appointment_end_time": this.endTimeNew,
				"content": this.userNameNew,
				"conf_name": this.contentNew,
				"user_name": this.meetRoomNew
				
//				startTimeNew : this.Appointment_begin_time,
//				endTimeNew : this.Appointment_end_time,
//				userNameNew : this.user_name,
//				contentNew : this.content,
//				meetRoomNew : this.conf_name,
				
			}).then(function(res) {
				alert(res);
//				this.orderList = res.body.result.list;
			})
			.catch(function(err){
				console.log(err);
			});
			
			
		},
		addConfirm: function() {
			this.addFlag = true;
		},
		resConfirm: function(item) {
			this.resFlag = true;
			this.startTime = item.Appointment_begin_time.substr(11, 5);
			this.endTime = item.Appointment_end_time.substr(11, 5);
			this.userName = item.user_name;
			this.content = item.content;
			this.meetRoom = item.conf_name;
		},

		gotoDate: function(ev) {
			this.$http.post("BespeakAction!LoginBespeak.do", { "date": ev }).then(function(res) {
//				this.orderList = res.body.result.list;
this.orderList = res.body.list[0].result;
//				console.log(orderList);
			});
			this.myDate = ev;
			
		}
	}
});

//		width: 11.6%; /*(5.8*(结束-开始)*2)%  */
//		top: 50px;  /*(50+100*(会议室-1))px  */
//		left: 10%;  /*((开始-8.5)*2*5.8+10)%  */