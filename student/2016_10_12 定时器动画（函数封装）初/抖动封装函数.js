function shake(obj, attr,endFn) {
	var num = 0;
	var arr = [];
	var pos = parseInt(getStyle(obj, attr));
	//把数放进数组里
	for(var i = 20; i > 0; i -= 4) {
		arr.push(i, -i);
	};
	arr.push(0);
	//设置定时器
	clearInterval(obj.shake);
	obj.shake = setInterval(function() {
		obj.style[attr] = pos + arr[num] + 'px';
		num++;
		if(num === arr.length) {
			clearInterval(obj.shake);
			endFn && endFn();
		};
	}, 50);
};
//获取样式
function getStyle(obj, attr) {
	return obj.currentStyle ? obj.currentStyle[attr] : getComputedStyle(obj)[attr];
};