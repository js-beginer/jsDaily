function itemClick(){
			//string字符串数据的indexOf，检索字符串是否存在，如果存在返回索引，不存在返回-1
			if(this.className.indexOf("selected")!=-1){
				this.className = "";
			}else{
				this.className = "selected";
			}
		}
		function buttonClick(){
			var leftList = document.getElementById("left-list");
			var rightList = document.getElementById("right-list");
			var selecteds = [];
			var source = (this.id == 'add'?leftList:rightList),target=(this.id == 'add'?rightList:leftList);
			for(var i=0;i<source.children.length;i++){
				if(source.children[i].className.indexOf("selected")!=-1){
					//代表已经被选中
					selecteds.push(source.children[i]);
				}
			}
			for(var i=0;i<selecteds.length;i++){
				selecteds[i].className = "";
				target.appendChild(selecteds[i]);
			}
		}
		//当浏览器解析完当前HTML代码之后，回调的事件
		window.onload = function(){
			var leftList = document.getElementById("left-list");
			var rightList = document.getElementById("right-list");
			var targetItem;
			leftList.onmouseup = rightList.onmouseup = function(){
				targetItem&&this.appendChild(targetItem);
			}
			leftList.oncontextmenu = rightList.oncontextmenu = function(){
				return false;
			}
			//leftList里所有的子标签数组集合
			for(var i=0;i<leftList.children.length;i++){
				leftList.children[i].onclick = itemClick;
				leftList.children[i].onmousedown = function(event){
					if(event.button!=2)return;
					var item = this;
					item.style.position = "fixed";
					this.style.width = "216px";
					this.className = "draging";
					this.style.left = event.clientX +"px";
					this.style.top = event.clientY +"px";
					targetItem = item;
					document.onmousemove = function(event){
						//如果让item跟着鼠标移动
						item.style.left = (event.clientX+10) +"px";
						item.style.top = (event.clientY+10) +"px";
					}
					document.onmouseup = function(){
						item.style.position = "static";
						item.style.width = "auto";
						item.style.left = 0;
						item.style.top = 0;
						item.className = "";
						document.onmousemove = null;
						targetItem = null;
					}
				}
			}

			var add = document.getElementById("add");
			var del = document.getElementById("del");

			add.onclick = del.onclick = buttonClick;
		}
