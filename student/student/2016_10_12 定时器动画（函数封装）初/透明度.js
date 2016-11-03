function opacity(obj, dir,target) {
	//判断步长的方向
	dir = parseFloat(getStyle(obj, opacity)) < target ? dir : -dir; 
	
	clearInterval(obj.timer); //先清除空的
	//设置定时器
	
	obj.timer = setInterval(function() {
		var speed = parseFloat(getStyle(obj, opacity)) + dir; //速度
		obj.style.opacity = speed; 
		console.log( speed);
		if(speed > target && dir > 0 || speed < target && dir < 0) { //代码简写
			speed = target;
		};
		if(speed == target) {

			clearInterval(obj.timer);
//			if(endFn) {
//				endFn();
////			}
	};
//	console.log(speed)
	}, 50);
	
};
//获取样式
function getStyle(obj) {
	return obj.currentStyle ? obj.currentStyle.opacity : getComputedStyle(obj).opacity;
};