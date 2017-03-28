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
		showButtonPanel:true
	});
	console.log($( "#datepicker" ).datepicker( 'getDate' ))
	
	
	
	
	
})

var vm = new Vue({
	el:"#meetApp",
	data:{
		productList:[],
		addFlag:false,
	},
	
//	mounted: function () {
//		this.$nextTick(function () {
//			this.cartView();
//		});
//	},
	methods:{
//		cartView: function () {
//			let _this = this;
//			this.$http.get("../../data/cartData.json",{"id":123}).then(res=> {
//				this.productList = res.body.result.list;
//			});
//		},
		
		addConfirm:function () {
			this.addFlag = true;
		}
		
	}
});
