var vm = new Vue({
	el: "#Login",
	data: {
		loginErro: false,
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
						"password": that.ruleForm.password 
					}).then(function(data) {
						var result = data.data.result;
							if(result==='1'){
								location.href="pages/main.jsp"
							}else{
								that.loginErro = true;
								alert("密码错误！tttt")
							}
					},function(fail) {
						alert('失败')
					});
				} else {
					return false;
				}
			}.bind(this));
		}
		
	}
});