function move(obj, attr, dir, target, endFn) {
	//判断步长的方向
	dir = parseInt(getStyle(obj, attr)) < target ? dir : -dir; //以当前坐标位置与目标target值对比
	
	clearInterval(obj.timer); //先清除空的
	//设置定时器
	obj.timer = setInterval(function() {
		var speed = parseInt(getStyle(obj, attr)) + dir; //速度
		if(speed > target && dir > 0 || speed < target && dir < 0) { //代码简写
			speed = target;
		};
		obj.style[attr] = speed + 'px'; //凡是出现obj.style的点 进行传参的时候 都用[]写
		if(speed == target) {
			clearInterval(obj.timer);
			if(endFn) {
				endFn();
			}
		}
	}, 30);
};
//获取样式
	function getStyle (obj,attr) {
		return obj.currentStyle?obj.currentStyle[attr]:getComputedStyle(obj)[attr];
	};