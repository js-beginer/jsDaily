$(function () {
	//1  _.chunk(array, [size=1])
	function chunk(arr,num){
		var count = 0;
		var result = [];
		var arrItem = [];
		while(arr.length){
			arrItem.push(arr[0]);
			arr.splice(0,1);
			count++;
			
			if(count === num || arr.length === 0) {
				result.push(arrItem);
				count = 0;
				arrItem = [];
			};
		}
		return result;
	}
	//console.log(chunk(luckyDraw,2));
	
	var luckyDraw = ["Colin", "John", "James", "Lily", "Mary"];
//	var arr1 = ["Colin", "John", "James", "Lily", "Mary"];
//	arr1[2] = "liuyue";
//	console.log(luckyDraw);
	var myNum = ['21','2','2','3','1','1','2','hao','21','13'];
	//2  _.uniq(array)
//	function uniq (arr) {
//		var box = [];
//		for (var i=0; i<arr.length; i++) {
//			if (box.indexOf(arr[i]) == -1) { //如果box的值在arr里没有再出现，就把arr的值放进box
//				box.push(arr[i]);
//			}
//		}
//		return box;
//	}
//	console.log(uniq(myNum));
	
	
//	var abc = '-_-abc-_-';
//	for (var i=0;i<abc.length;i++) {
//		if (abc[i]=='_') {
//			abc=abc.replace("-_","");
//		}
//		switch (){
//			case value:
//				break;
//			default:
//				break;
//		}
//		
//	}
       
	console.log(_.trim('- _-1a b1c-_1-', ' 1_-'));
//	console.log(abc);
})
