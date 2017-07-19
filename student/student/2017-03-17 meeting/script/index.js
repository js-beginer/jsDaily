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
		orderList: [{
			"appointment_date": ''
		}],
		addFlag: false,
		resFlag: false,
		roomNum: 4,
		liNum: 18,
		liHtml: '',
		allText: '',
		arrText: ['第1会议室', '第2会议室', '第3会议室', '第4会议室'],
		beginTime: '',
		endTime: '',
		userName: '',
		content: '',
		meetRoom: '',
		orderNumber: '',
		myDate: moment().format('YYYY-MM-DD'),
		deleTips: false,
		ruleForm1: {

			userNameNew: '',
			contentNew: '',
			meetRoomNew: '',
			beginTimeNew: '',
			endTimeNew: ''
		},
		ruleForm: {
			userName: '',
			content: '',
			meetRoom: '',
			beginTime: '',
			endTime: ''
		},
		rules: {
			userNameNew: [{
					required: true,
					message: '*',
					trigger: 'blur'
				},
				{
					min: 1,
					max: 5,
					message: '*',
					trigger: 'blur'
				}
			],
			contentNew: [{
					required: true,
					message: '*',
					trigger: 'blur'
				},
				{
					min: 1,
					max: 10,
					message: '*',
					trigger: 'blur'
				}
			],
			meetRoomNew: [{
				required: true,
				message: '*',
				trigger: 'change'
			}],
			beginTimeNew: [{
				required: true,
				message: '*',
				trigger: 'change'
			}],
			endTimeNew: [{
				required: true,
				message: '*',
				trigger: 'change'
			}],
			userName: [{
					required: true,
					message: '*',
					trigger: 'blur'
				},
				{
					min: 1,
					max: 5,
					message: '*',
					trigger: 'blur'
				}
			],
			content: [{
					required: true,
					message: '*',
					trigger: 'blur'
				},
				{
					min: 1,
					max: 10,
					message: '*',
					trigger: 'blur'
				}
			],
			meetRoom: [{
				required: true,
				message: '*',
				trigger: 'change'
			}],
			beginTime: [{
				required: true,
				message: '*',
				trigger: 'change'
			}],
			endTime: [{
				required: true,
				message: '*',
				trigger: 'change'
			}],
		}
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
			this.myDate = moment().format('YYYY-MM-DD'); //初始化
			this.$http.get("BespeakAction!LoginBespeak.do", {
				params: {
					"date": this.myDate
				}
			}).then(function(res) {
				this.orderList = res.body.list[0].result;
			});
		},
		//  order定位
		orderStyle: function(confName, BeginTime, EndTime) {
			var sta_date = moment(this.myDate + ' 08:30');
			var bengin_date = moment(BeginTime);
			var end_date = moment(EndTime);
			var bengin_num = (bengin_date - sta_date) / (1000 * 3600);
			var end_num = (end_date - bengin_date) / (1000 * 3600);
			return {
				width: (5.29 * Number(end_num) * 2) + "%",
				top: (50 + 135 * (Number(confName) - 1)) + 'px',
				left: (Number(bengin_num) * 2 * 5.29 + 7.5) + "%"
			};
		},
		// 添加预约初始化
		addConfirm: function() {
			this.addFlag = true;
			this.ruleForm1.beginTimeNew = '';
			this.ruleForm1.endTimeNew = '';
			this.ruleForm1.userNameNew = '';
			this.ruleForm1.contentNew = '';
			this.ruleForm1.meetRoomNew = '';
		},
		//	添加预约-确定
		addOrder: function(formName1) {
			var that = this;
			this.$refs[formName1].validate(function(valid) {
				if(valid) {
					that.$http.post("BespeakAction!applyConferenceRoom.do", {
						"appointment_begin_time": that.myDate + ' ' + that.ruleForm1.beginTimeNew,
						"appointment_end_time": that.myDate + ' ' + that.ruleForm1.endTimeNew,
						"content": that.ruleForm1.contentNew,
						"conf_id": that.ruleForm1.meetRoomNew,
						"user_name": that.ruleForm1.userNameNew
					}).then(function(response) {
						var result = response.body.result === '1';
						if(result) {
							that.$notify.success({
								title: '预约成功',
								message: '您已成功预约了会议室'
							});
							return Promise.resolve();
						} else {
							return Promise.reject('预定会议室失败');
						}
					}).catch(function(err) {
						that.$notify({
							title: '预约失败',
							message: '请查看您的预约时间段是否已经有预约了呢？',
							type: 'warning'
						});
					}).then(function() {
						return that.$http.get("BespeakAction!LoginBespeak.do", {
							params: {
								"date": that.myDate
							}
						}).then(function(res) {
							that.addFlag = false;
							that.$refs[formName1].resetFields();
							that.orderList = res.body.list[0].result;
						});
					});
				} else {
					return false;
				}
			}.bind(this));
		},
		addFlagCancel: function(formName1) {
			this.addFlag = false;
			this.$refs[formName1].resetFields();
		},
		// 点击修改预约
		resConfirm: function(item) {
			this.resFlag = true;
			this.ruleForm.beginTime = item.appointment_begin_time.substr(11, 5);
			this.ruleForm.endTime = item.appointment_end_time.substr(11, 5);
			this.ruleForm.userName = item.user_name;
			this.ruleForm.content = item.content;
			this.ruleForm.meetRoom = item.conf_id;
			this.ruleForm.orderNumber = item.order_number;
		},
		//	修改预约-确定
		resOrder: function(formName) {
			var that = this;
			this.$refs[formName].validate(function(valid) {
				if(valid) {
					that.$http.post("BespeakAction!modifyConferenceRoom.do", {
						"order_number": that.ruleForm.orderNumber,
						"appointment_begin_time": that.myDate + ' ' + that.ruleForm.beginTime,
						"appointment_end_time": that.myDate + ' ' + that.ruleForm.endTime,
						"content": that.ruleForm.content,
						"conf_id": that.ruleForm.meetRoom,
						"user_name": that.ruleForm.userName
					}).then(function(response) {
						var result = response.body.result === '1';
						if(result) {
							that.$notify.success({
								title: '修改成功',
								message: '您的预约信息已成功修改'
							});
							return Promise.resolve();
						} else {
							return Promise.reject('修改会议室失败');
						}
					}).catch(function(err) {
						that.$notify({
							title: '修改失败',
							message: '请查看您修改的时间段是否已经有预约了呢？',
							type: 'warning'
						});
					}).then(function() {
						return that.$http.get("BespeakAction!LoginBespeak.do", {
							params: {
								"date": that.myDate
							}
						}).then(function(res) {
							that.resFlag = false;
							that.$refs[formName1].resetFields();
							that.orderList = res.body.list[0].result;
						});
					});
				} else {
					return false;
				}
			}.bind(this));
		},
		resFlagCancel: function(formName) {
			this.resFlag = false;
			this.$refs[formName].resetFields();
		},
		//	删除预约
		delConfirm: function() {
			this.$http.post("BespeakAction!complementConferenceRoom.do", {
				"order_number": this.ruleForm.orderNumber
			}).then(function(response) {
				var result = response.body.result === '1';
				if(result) {
					this.$notify.info({
						title: '成功',
						message: '此预约已成功取消'
					});
					return Promise.resolve();
				} else {
					return Promise.reject('删除会议室失败');
				}
			}).catch(function(err) {
				this.$notify.error({
					title: '删除失败',
					message: '很遗憾，此预约未能成功删除'
				});
			}).then(function() {
				return this.$http.get("BespeakAction!LoginBespeak.do", {
					params: {
						"date": this.myDate
					}
				}).then(function(res) {
					this.orderList = res.body.list[0].result;
					this.deleTips = false;
					this.resFlag = false;
					this.$refs[formName1].resetFields();
					
				});
			});
		},
		//	查询日期
		gotoDate: function(ev) {
			this.$http.get("BespeakAction!LoginBespeak.do", {
				params: {
					"date": ev
				}
			}).then(function(res) {
				this.orderList = res.body.list[0].result;
			});
			this.myDate = ev;
		}
	}
});