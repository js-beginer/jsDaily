var vm = new Vue({
	el: "#login",
	data: {
		loginErro: false,
		loginErro1: false,
		ruleForm: {
			userName: '',
			password: ''
		},
		rules: {
			userName: [{
					required: true,
					message: '*',
					trigger: 'blur'
				},
				{
					message: '*',
					trigger: 'blur'
				}
			],
			password: [{
					required: true,
					message: '*',
					trigger: 'blur'
				},
				{
					message: '*',
					trigger: 'blur'
				}
			]
		}
	},
	mounted: function() {
		this.$nextTick(function() {
			
			this.changeImg();
			this.loginErro = false;
			this.loginErro1 = false;
		});
	},
	methods: {
		//	登录
		login: function(formName){
			var that = this;
			this.$refs[formName].validate(function(valid) {
				if(valid) {
					that.$http.post("LoginMeetingAction!login.do", {
						"login_name": that.ruleForm.userName,
						"password": that.ruleForm.password,
						"verifyCode": that.ruleForm.verifyCode 
					}).then(function(data) {
						var result = data.data.result;
						var name = data.data.name;
						var LoginId = data.data.LoginId;
						var verifyCodeStatus = data.data.verifyCodeStatus;
							if(result==='1'){
								if(verifyCodeStatus===1){
									that.loginErro = false;
									that.loginErro1 = false;
									sessionStorage.setItem("name",name);
									sessionStorage.setItem("LoginId",LoginId);
									location.href="main.jsp";
									that.changeImg();
									
								}else{
									that.loginErro1 = true;
									that.loginErro = false;
									that.changeImg();
								}
							}else{
								that.loginErro = true;
								that.changeImg();
							}
					},function(fail) {
						alert('失败')
					});
				} else {
					return false;
				}
			}.bind(this));
		},
		changeImg: function(){
			 var img = document.getElementById("img");  
			 img.src = "authImage?date="+ new Date();
			
		}
		
	}
});
//function changeImg(){
//    var img = document.getElementById("img");  
//    img.src = "<%=path%>/authImage?date="+ new Date();
//};
