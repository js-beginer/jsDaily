$(function() {
//1. 写程序将” Hello World”打印到屏幕。
	$(".name").prev().text("Hello World");
//2. 写程序输入用户的姓名并用该姓名和他打招呼。
	$(".sayhi").click(function() {
			var username = $(".name").val();
			alert(username + "你好！");
		})
//3. 修改上一个程序，使得仅可以与Alice和Bob这两个用户用其姓名与之打招呼。	
	$(".hiAlice").click(function() {
		var username = $(".name").val();
		alert("你好！Alice,我是" + username + "，很高兴认识你！");
	});
	$(".hiBob").click(function() {
			var username = $(".name").val();
			alert("你好！bob,我是" + username + "，很高兴认识你！");
		})
//4. 写程序输入一个数n并打印出从1到n的和。
	$(".sum").click(function() {
			var num = $(".number").val();
			var sum = 0;
			for(var i = 0; i <= num; i++) {
				sum += i;
			}
			alert("和是：" + sum);
		})
//5. 修改上个程序，使得求和的数只包含3或5的倍数，例如n=17，则求和的数为：3, 5, 6, 9, 10, 12, 15。
	$(".n35").click(function() {
			var num = $(".number").val();
			var sum = 0;
			var sum1 = 0;
			for(var i = 1; i <= num; i++) {
				if(i % 3 == 0 || i % 5 == 0) {
					sum = sum + ' ' + i;
					sum1 += i;
				}
			}
			alert(num + "中3或5的倍数有：" + sum + "\r\n和为：" + sum1);
		})
//6. 写个程序，要求用户输入一个数n，并概率性的选择是计算1到n的和还是计算1到n的乘积。
	$(".random").click(function() {
			var num = $(".number").val();
			var ran = Math.random();
			var sum = 0;
			var prod = 1;
			if(ran < 0.5) {
				for(var i = 0; i <= num; i++) {
					sum += i;
				}
				alert("和是：" + sum);
			} else {
				for(var i = 1; i <= num; i++) {
					prod = prod * i;
				}
				alert("积是：" + prod);
			}
		})
//7. 写程序打印出12×12乘法表。
	for(var i = 1; i <= 12; i++) {
		for(var j = 1; j <= 12; j++) {
			if(j <= i) {
				$(".tables").append(i + "*" + j + "=" + i * j + " ");
			}
		}
		$(".tables").append("<br>");
	}
//8. 写程序打印所有的素数。（注意：如果你用的编程语言不支持任意大小的数，那么打印出所有你能表示的素数，包括最大数）	
	$(".prime").click(function() {
			var num = Number($(".prime").prev().val());
			var sum = '';
			for(var i = 2; i <= num; i++) {
				var boolen = true;
				
				for(var j = 2; j < i; j++) {
					if(i % j == 0) {
						boolen = false;
						break;
					}
				}
				if(boolen == true) {
					sum = sum + ' ' + i;
				}
				
			}
			$(".prime").next().append(sum);
		})
//9. 写一个竞猜游戏，用户必须猜一个秘密的数字，在每次猜完后程序会告诉用户他猜的数是太大了还是太小了，直到猜测正确，最后打印出猜测的次数。如果用户连续猜测同一个数字则只算一次。
	var arr = [];
	$(".game").click(function() {
		var game = Number($(".gamet").val());
		arr.push(game);
		var json = {};
		var arrnew = [];

		for(var i = 0; i < arr.length; i++) {
			json[arr[i]] = arr[i]; //json对象包含且只包含一组原数组，重复的就剔除了
		}
		for(var j in json) { //var j in json相当于var j = 0; j < arr.length; j++
			arrnew.push(json[j]); //把json放进新数组
		}
		if(game > 46) {
			alert("猜大了");
		} else if(game < 46) {
			alert("猜小了");
		} else {
			alert("恭喜你！猜对了！你一共猜了：" + arrnew.length + "次哦。");
		}

		//	var arr = arr.sort();	//sort()排序
		//		console.log(arr)；
		//	var res = [arr[0]];
		//		console.log(res);
		//	for(var i = 1 ;i <arr.length;i++){
		//		if(arr[i]!== res[res.length-1]){	//如果输入的数不等于最后一个数
		//		res.push(arr[i]);		//就把数字放进数组arr里
		//			console.log(res)；						
		//		}
		//	}

	});
//10. 写个程序打印出接下来的20个闰年。
	$(".myyear").click(function () {
		var year = new Date();
		var thisyear = year.getFullYear();
		var count = 0;
		var arr  = [];
		while (count<20) {
			thisyear++;
			if (thisyear%4==0&&thisyear%100!==0||thisyear%100==0&&thisyear%400==0) {
				count++;
				arr.push(thisyear);
			}
		}
		$(".myyear").next().append(arr+" ");
	})
		
})