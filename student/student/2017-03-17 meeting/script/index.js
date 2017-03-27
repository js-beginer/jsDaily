var vm = new Vue({
	el:"#meetApp",
	data:{
		
		productList:[],
		addFlag:false,
	},
	
	mounted: function () {
		this.$nextTick(function () {
			this.cartView();
		});
	},
	methods:{
		cartView: function () {
			let _this = this;
			this.$http.get("../../data/cartData.json",{"id":123}).then(res=> {
				this.productList = res.body.result.list;
			});
		},

		addConfirm:function () {
			this.addFlag = true;
		}
		
	}
});
