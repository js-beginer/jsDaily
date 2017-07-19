$(function() {
	var userName = sessionStorage.getItem("name");
	$("#userName").html(userName);
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
		orderList: [{	//加载数据
			"appointment_date": '',
			list: []
		}],
		
//		loginName:sessionStorage.getItem("name"), //用户中文名
//		LoginId:sessionStorage.getItem("LoginId"),	//用户登录id
		loginName: '', //用户中文名
		LoginId: '',	//用户登录id
		isTimeRule: false, // 开始结束时间校验开关
		addFlag: false,	//添加预约遮罩
		resFlag: false,	//修改预约遮罩
		xqFlag: false,	//详情遮罩
		resMyOrderListFlag: false, //我的预约修改遮罩
		myOrderFlag:false, 
		iconOk: false, //hover时li的加号开关
		roomNum: 4, //共有几个会议室
		liNum: 17, 
		arrText: ['18层(大)', '18层(小)', '31层', '33层'],
		beginTime: '',
		endTime: '',
		userName: '',
		content: '',
		meetRoom: '',
		orderNumber: '', //每条数据的id号
		erRoom: false, //预约冲突开关
		revise: false, //修改铅笔
		readonlyPen: true, //只读铅笔开关
		disabledPen: true,
		orderPoint: [],	//预约冲突提示
		myDate: moment().format('YYYY-MM-DD'),
		myTime: moment().format('HH:mm'),
		myYear:moment().format('YYYY-MM'),
		myDD: moment().format('DD'),
		deleTips: false, // 确认删除开关
		myLoadingDel:false, // 删除loading开关
		myLoadingOk:false,	// 确认loading开关
		overDate: false,
		selfMarkNum:0, //我的预约默认查询方法
		pageInfo : {   //分页
			pageSize : 6,	//一页几条
			currentPage: 1   //当前页
		},
		currentList: [],  // 当前页的列表
		ruleForm1: {	//预约一套
			userNameNew: '',
			contentNew: '',
			meetRoomNew: '',
			beginTimeNew: '',
			endTimeNew: ''
		},
		ruleForm: {		//修改一套
			userName: '',
			content: '',
			meetRoom: '',
			beginTime: '',
			endTime: '',
			myDD: '', 
			myYear: '',
			myYearFull: ''
		},
		rules: {
			userNameNew: [{
					required: true,
					message: '*',
					trigger: 'blur'
			}],
			contentNew: [{
					required: true,
					message: '*',
					trigger: 'blur'
			}],
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
			}],
			content: [{
					required: true,
					message: '*',
					trigger: 'blur'
			}],
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
	computed : {
		startTimeMin : function(){
			if (moment(this.myDate).isAfter(moment().format('YYYY-MM-DD'))){
				return '00:00';
			} else {
				return this.myTime;
			}
		},
		endTimeMin : function(){
			if (moment().isBefore(moment(this.myDate + this.ruleForm1.beginTimeNew,"YYYY-MM-DDHH:mm"))){
				return this.ruleForm1.beginTimeNew;
			} else {
				return this.myTime;
			}
		},
		endTimeMin0 : function(){
			if (moment().isBefore(moment(this.myDate + this.ruleForm.beginTime,"YYYY-MM-DDHH:mm"))){
				return this.ruleForm.beginTime;
			} else {
				return this.myTime;
			}
		}
	},
	mounted: function() {
		this.$nextTick(function() {
			this.orderView();
		});
	},
	methods: {
		//	获取预约信息
		orderView: function() {
			this.myOrderFlag = false;
			$('#datepicker .ui-datepicker-calendar .ui-datepicker-today').click();
			this.myDate = moment().format('YYYY-MM-DD'); //初始化
			this.$http.get("BespeakAction!LoginBespeak.do", {
				params: {
					"date": this.myDate
				}
			}).then(function(res) {
				this.orderList = res.body.list[0].result;
				this.loginName = res.body.list[0].user_name;
				this.LoginId = res.body.list[0].login_id;
			});
		},
		//	查询日期
		gotoDate: function(ev) {
			this.myOrderFlag = false;
			if (moment(ev).isBefore(moment().format("YYYY-MM-DD"))) {
				this.overDate = true;
			} else{
				this.overDate = false;
			};
			this.$http.get("BespeakAction!LoginBespeak.do", {
				params: {
					"date": ev
				}
			}).then(function(res) {
				this.orderList = res.body.list[0].result;
			});
			this.myDate = ev;
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
				top: (30 + 115 * (Number(confName) - 1)) + 'px',
				left: (Number(bengin_num) * 2 * 5.29 + 7.5) + "%"
			};
		},
		//  鼠标hover时的加号
		addIcon: function(roomItem,liItem){
			var time = liItem*30;
			var beginTimeNew = String(moment(new Date(0, 0, 0, 0,0, 0)).add(8, 'h').add(time, 'm')._d);
			var endTimeNew = String(moment(new Date(0, 0, 0, 0,0, 0)).add(8.5, 'h').add(time, 'm')._d);
			return !(moment(this.myDate + " " + beginTimeNew.slice(16,21)).isBefore(moment().format("YYYY-MM-DD HH:mm")));
		},
		// 添加预约初始化
		addConfirm: function(roomItem,liItem) {
			this.myYear = this.myDate.slice(0,7);
			this.myDD = this.myDate.slice(8,10);
			this.erRoom = false;
			this.isTimeRule = false;
			var time = liItem*30;
			var beginTimeNew = String(moment(new Date(0, 0, 0, 0,0, 0)).add(8, 'h').add(time, 'm')._d);
			var endTimeNew = String(moment(new Date(0, 0, 0, 0,0, 0)).add(8.5, 'h').add(time, 'm')._d);
			if (moment(this.myDate + " " + beginTimeNew.slice(16,21)).isBefore(moment().format("YYYY-MM-DD HH:mm"))) {
				this.addFlag = false;
			}else{
				this.addFlag = true;
				this.ruleForm1.beginTimeNew = beginTimeNew.slice(16,21);
				this.ruleForm1.endTimeNew = endTimeNew.slice(16,21);
				this.ruleForm1.userNameNew = this.loginName;
				this.ruleForm1.contentNew = '';
				this.ruleForm1.meetRoomNew = String(roomItem);
			}
		},
		//	添加预约-确定
		addOrder: function(formName1) {
			var that = this;
			this.$refs[formName1].validate(function(valid) {
				if(valid) {
					if(moment(that.ruleForm1.beginTimeNew,"HH:mm").isBefore(moment(that.ruleForm1.endTimeNew,"HH:mm"))){
						that.isTimeRule = false;
						that.myLoadingOk = true; 
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
								that.addFlag = false;
							} else {
								that.erRoom = true;
								response.body.conf_list[response.body.conf_list.indexOf(0)] = '已订满';
								response.body.conf_list[response.body.conf_list.indexOf(1)] = '18层(大)';
								response.body.conf_list[response.body.conf_list.indexOf(2)] = '18层(小)';
								response.body.conf_list[response.body.conf_list.indexOf(3)] = '31层';
								response.body.conf_list[response.body.conf_list.indexOf(4)] = '33层';
								that.orderPoint = response.body.conf_list;
								that.addFlag = true;
								
							}
						}).catch(function(err) {
							that.$notify.error({
								title: '预约失败',
								message: '系统出现异常，请联系管理员'
							});
						}).then(function() {
							return that.$http.get("BespeakAction!LoginBespeak.do", {
								params: {
									"date": that.myDate
								}
							}).then(function(res) {
								that.myLoadingOk = false;
								that.orderList = res.body.list[0].result;
								that.loginName = res.body.list[0].user_name;
								that.LoginId = res.body.list[0].login_id;
							});
						});
					}else{
						that.isTimeRule = true;
						return false;
					}
				} else {
					return false;
				}
			}.bind(this));
		},
		//  添加预约关闭
		addFlagCancel: function(formName1) {
			this.addFlag = false;
			this.$refs[formName1].resetFields();
		},
		// 点击查看详情
		resConfirm: function(item) {
			this.isTimeRule = false;	//时间校验开关
			this.erRoom = false;
			this.ruleForm.myDD = item.appointment_begin_time.substr(8, 2);
			this.ruleForm.myYear = item.appointment_begin_time.substr(0, 7);
			this.ruleForm.userId = item.user_Id;
			this.ruleForm.beginTime = item.appointment_begin_time.substr(11, 5);
			this.ruleForm.endTime = item.appointment_end_time.substr(11, 5);
			this.ruleForm.userName = item.user_name;
			this.ruleForm.content = item.content;
			this.ruleForm.meetRoom = item.conf_id;
			this.ruleForm.orderNumber = item.order_number;
			this.xqFlag = true;  //详情页开关
			this.readonlyPen = true;	//只读开关
			this.disabledPen = true;	//只读开关
			if(this.ruleForm.userId == this.LoginId || this.LoginId == 3){
				if (moment(item.appointment_end_time).isBefore(moment().format("YYYY-MM-DD HH:mm"))) {
					this.revise = true;
				}else{
					this.revise = false;	//可编辑铅笔开关
				}
			}else{
				this.revise = true;
			}
		},
		//详情关闭
		xqFlagCancel: function(formName3) {
			this.xqFlag = false;
			this.$refs[formName3].resetFields();
		},
		//  详情修改铅笔
		revisePen: function() {
			this.readonlyPen = false;
			this.disabledPen = false;
		},
		//	修改预约-确定
		resOrder: function(formName3) {
			var that = this;
			this.$refs[formName3].validate(function(valid) {
				if(valid) {
					if(moment(that.ruleForm.beginTime,"HH:mm").isBefore(moment(that.ruleForm.endTime,"HH:mm"))){
						that.isTimeRule = false;
						that.myLoadingOk = true;
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
								that.xqFlag = false;
								that.$notify.success({
									title: '修改成功',
									message: '您的预约信息已成功修改'
								});
							} else {
								that.xqFlag = true;
								that.erRoom = true;
								response.body.conf_list[response.body.conf_list.indexOf(0)] = '已订满';
								response.body.conf_list[response.body.conf_list.indexOf(1)] = '18层(大)';
								response.body.conf_list[response.body.conf_list.indexOf(2)] = '18层(小)';
								response.body.conf_list[response.body.conf_list.indexOf(3)] = '31层';
								response.body.conf_list[response.body.conf_list.indexOf(4)] = '33层';
								that.orderPoint = response.body.conf_list;
							}
						}).catch(function(err) {
							that.$notify.error({
								title: '修改失败',
								message: '系统出现异常，请联系管理员'
							});
						}).then(function() {
							return that.$http.get("BespeakAction!LoginBespeak.do", {
								params: {
									"date": that.myDate
								}
							}).then(function(res) {
								that.orderList = res.body.list[0].result;
								that.loginName = res.body.list[0].user_name;
								that.LoginId = res.body.list[0].login_id;
								that.myLoadingOk = false;
							});
						});
					}else{
						that.isTimeRule = true;
						return false;
					}
					
				} else {
					return false;
				}
			}.bind(this));
		},
//		resFlagCancel: function(formName) {
//			this.resFlag = false;
//			this.$refs[formName].resetFields();
//			this.myOrderFlag = false;
//		},
		//	删除预约
		delConfirm: function() {
			console.log(1233);
			this.myLoadingDel = true;
			this.$http.post("BespeakAction!complementConferenceRoom.do", {
				"order_number": this.ruleForm.orderNumber,
				"user_name": this.ruleForm.userName
			}).then(function(response) {
				var result = response.data.result === '1';
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
					this.myLoadingDel = false;
					this.orderList = res.body.list[0].result;
					this.loginName = res.body.list[0].user_name;
					this.LoginId = res.body.list[0].login_id;
					this.deleTips = false;
					this.xqFlag = false;
				});
			});
		},
	//  我的预约
		myOrderList: function(markNum){
			this.selfMarkNum = markNum;
			this.$http.get("BespeakAction!SearchMyOrder.do", {
				params: {
					"LoginId": this.LoginId,
					"user_name":  this.loginName,
					"mark": this.selfMarkNum
				}
			}).then(function(res) {
				this.pageInfo.currentPage = 1;
				var data = res.body.list[0].result;
				data.list = data.list.map(function(item){
					item.deleteLoading = false;
					return item;
				});
				this.orderList = data;
				this.currentList = this.orderList.list.slice((this.pageInfo.currentPage-1)*6,6*this.pageInfo.currentPage);
			});
			this.myOrderFlag = true;
		},

		//  分页
		paginationList: function(list){
			this.currentList = this.orderList.list.slice((list-1)*6,6*list);
			this.pageInfo.currentPage = list;
		},
		//我的预约-样式
		listStyle :function(room){
			if(room == 1){
				return {
					background: 'rgba(132,88,113,0.8)'
				}
			}else if(room==2){
				return {
					background: 'rgba(146,160,143,0.8)' 
				}
			}else if(room==3){
				return {
					background: 'rgba(252,154,63,0.8)'
				}
			}else{
				return {
					background: 'rgba(227,72,86,0.8)' 
				}
			}
		},
		// 我的预约-点击修改预约
		resMyOrder: function(list) {
			this.isTimeRule = false;
			this.erRoom = false;
			this.ruleForm.userId = list.user_Id;
			this.ruleForm.myDD = list.appointment_begin_time.substr(8, 2);
			this.ruleForm.myYear = list.appointment_begin_time.substr(0, 7);
			this.ruleForm.myYearFull = list.appointment_begin_time.substr(0, 10);
			this.ruleForm.beginTime = list.appointment_begin_time.substr(11, 5);
			this.ruleForm.endTime = list.appointment_end_time.substr(11, 5);
			this.ruleForm.userName = list.user_name;
			this.ruleForm.content = list.content;
			this.ruleForm.meetRoom = list.conf_id;
			this.ruleForm.orderNumber = list.order_number;
				if (moment(list.appointment_end_time).isBefore(moment().format("YYYY-MM-DD HH:mm"))) {
					this.xqFlag = true;
				}else{
					this.resMyOrderListFlag = true;
				}
		},
		//我的预约-修改-确定
		resMyOrderList: function(formName) {
			var that = this;
			this.$refs[formName].validate(function(valid) {
				if(valid) {
					if(moment(that.ruleForm.beginTime,"HH:mm").isBefore(moment(that.ruleForm.endTime,"HH:mm"))){
						that.isTimeRule = false;
						that.myLoadingOk = true;
						that.$http.post("BespeakAction!modifyConferenceRoom.do", {
							"order_number": that.ruleForm.orderNumber,
							"appointment_begin_time": that.ruleForm.myYearFull + ' ' + that.ruleForm.beginTime,
							"appointment_end_time": that.ruleForm.myYearFull + ' ' + that.ruleForm.endTime,
							"content": that.ruleForm.content,
							"conf_id": that.ruleForm.meetRoom,
							"user_name": that.ruleForm.userName
						}).then(function(response) {
							var result = response.body.result === '1';
							if(result) {
								that.resMyOrderListFlag = false;
								that.$notify.success({
									title: '修改成功',
									message: '您的预约信息已成功修改'
								});
							} else {
								that.resMyOrderListFlag = true;
								that.erRoom = true;
								response.body.conf_list[response.body.conf_list.indexOf(0)] = '已订满';
								response.body.conf_list[response.body.conf_list.indexOf(1)] = '18层(大)';
								response.body.conf_list[response.body.conf_list.indexOf(2)] = '18层(小)';
								response.body.conf_list[response.body.conf_list.indexOf(3)] = '31层';
								response.body.conf_list[response.body.conf_list.indexOf(4)] = '33层';
								that.orderPoint = response.body.conf_list;
							}
						}).catch(function(err) {
							that.$notify.error({
								title: '修改失败',
								message: '系统出现异常，请联系管理员'
							});
						}).then(function(markNum) {
							return that.$http.get("BespeakAction!SearchMyOrder.do", {
								params: {
									"LoginId": that.LoginId,
									"user_name":  that.loginName,
									"mark": that.selfMarkNum
								}
							}).then(function(res) {
								that.orderList = res.body.list[0].result;
								that.currentList = that.orderList.list.slice((that.pageInfo.currentPage-1)*6,6*that.pageInfo.currentPage);
								that.myLoadingOk = false;
							});
						});
					}else{
						that.isTimeRule = true;
						return false;
					}
					
				} else {
					return false;
				}
			}.bind(this));
		},
		resMyOrderListFlagCancel: function(formName) {
			this.$refs[formName].resetFields();
			this.resMyOrderListFlag = false;
		},
		//  我的预约-删除
		delMyOrderList: function(orderNumber,userName,endTime,index) {
			var that = this;
			if (moment(endTime).isBefore(moment().format("YYYY-MM-DD HH:mm"))) {
				return false;
			}else{
				that.currentList[index].deleteLoading = true;
				that.$http.post("BespeakAction!complementConferenceRoom.do", {
					"order_number": orderNumber,
					"user_name": userName
				}).then(function(response) {
					var result = response.data.result === '1';
					if(result) {
						that.$notify.info({
							title: '成功',
							message: '此预约已成功取消'
						});
						return Promise.resolve();
					} else {
						return Promise.reject('删除会议室失败');
					}
				}).catch(function(err) {
					that.$notify.error({
						title: '删除失败',
						message: '很遗憾，此预约未能成功删除'
					});
				}).then(function(markNum) {
					return that.$http.get("BespeakAction!SearchMyOrder.do", {
						params: {
							"LoginId": that.LoginId,
							"user_name":  that.loginName,
							"mark": that.selfMarkNum
						}
					}).then(function(res) {
						that.currentList[index].deleteLoading = false;
						that.orderList = res.body.list[0].result;
						that.currentList = that.orderList.list.slice((that.pageInfo.currentPage-1)*6,6*that.pageInfo.currentPage);
						that.resMyOrderListFlag = false;
					});
				});
			}
		}
	}
});
//IE清除缓存
var noCache = function(request,next){
	request.headers.set('IF-Modified-Since', '0');
	next();
};
Vue.http.interceptors.push(noCache);