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
				"appointment_date":''
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
		nowDate : '',
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
		//	获取预约信息
		orderView: function() {
			this.nowDate = moment().format('YYYY-MM-DD');
			this.$http.get("BespeakAction!LoginBespeak.do", { 
				params:{"date": this.nowDate }
			}).then(function(res) {
				this.orderList = res.body.list[0].result;
			});
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
		addOrder: function() {
			if( this.myDate == '' ){
				this.startTimeNew = this.nowDate + ' ' + this.startTimeNew;
				this.endTimeNew = this.nowDate + ' ' + this.endTimeNew;
			}else{
				this.startTimeNew = this.myDate + ' ' + this.startTimeNew;
				this.endTimeNew = this.myDate + ' ' + this.endTimeNew;
			};
			this.$http.post("BespeakAction!applyConferenceRoom.do", {
				"appointment_begin_time": this.startTimeNew,
				"appointment_end_time": this.endTimeNew,
				"content": this.contentNew,
				"conf_id": this.meetRoomNew,
				"user_name": this.userNameNew
				
			}).then(function(result) {
				this.addFlag = false;
			},function(result) {
				alert("添加失败！");
			});
		},
		addConfirm: function() {
			this.addFlag = true;
		},
		resConfirm: function(item) {
			this.resFlag = true;
			this.startTime = item.appointment_begin_time.substr(11, 5);
			this.endTime = item.appointment_end_time.substr(11, 5);
			this.userName = item.user_name;
			this.content = item.content;
			this.meetRoom = item.conf_id;
		},
		//删除预约
		delConfirm: function() {
			alert(1)
		},
		//查询日期
		gotoDate: function(ev) {
			this.$http.get("BespeakAction!LoginBespeak.do",{ 
				params:{"date": ev }
			
			}).then(function(res) {
				this.orderList = res.body.list[0].result;
			});
			this.myDate = ev;
		}
	}
});