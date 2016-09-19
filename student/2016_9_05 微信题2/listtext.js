var num = [0,1,2,3,6,10,15,22];

1. 写一个函数，返回列表中最大的数。
	function maxNum () {
		return Math.max.apply(Math,num);
	};
	console.log(maxNum());
//2. 写函数逆转列表，最好是原地逆转。
//	function  reverseNum () {
//		return num.reverse();
//	}
//	console.log(reverseNum ());
//3. 写个函数检查指定的元素是否出现在列表中。
	function  checkNum () {
		return num.indexOf("e",0);//或数字 10 返回5
	}
	console.log(checkNum ());
//4. 写个函数返回列表中奇数位置的所有元素。
	function  oddNum () {
		var myOdd = [];
		for(var i=0;i<num.length;i++){
			if (i%2==0) {
				myOdd.push(num[i]);
			}	
		}
		return myOdd;
	}
	console.log(oddNum ());
//5. 写个函数计算列表的运行花费总和（the running total）。

//6. 写个函数测试一个字符串是否是回文。

//7. 写三个函数来计算列表中数字的和：分别用for循环，while循环和递归完成。

//8. 写个函数on_all遍历列表中的每个元素，打印出开始的20个完全平方数。

//9. 写个函数连接两个列表。

//10. 写个函数交替合并两个列表，例如：[a,b,c], [1,2,3] → [a,1,b,2,c,3]。

//11. 写个函数合并两个有序的列表。

//12. 写个函数计算前100个Fibonacci数的列表。

//13. 写个函数，返回指定数的各位数字的列表。