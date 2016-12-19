(function () {
	var app = angular.module('store',[]);
	
	app.controller('StoreController',function () {
		this.products = gems;
	});
	var gems = [
	  {
		name:'大宝石',
		price: 2,
		description:'南美真钻',
		canPurchase:true,
		images:[
			{
				full:'img/1.jpg',
				thumb:'img/t1.jpg'
			}
		]
	  },
	  {
		name:'小钻石',
		price: 1.2,
		description:'真的小钻石',
		canPurchase:true,
		images:[
			{
				full:'img/2.jpg',
				thumb:'img/t2.jpg'
			}
		]
	  },
	  {
		name:'海洋之心',
		price: 4.25,
		description:'南美真钻',
		canPurchase:true,
		images:[
			{
				full:'img/3.jpg',
				thumb:'img/t3.jpg'
			}
		]
	  }
	];
	
	
})();
