$(function() {
		var $todo = $("#newTodo");
		var $oUl = $("#todoList");
		var $oLi = $(".todo-list li");
		var Todo = {
			//添加
			Add: function() {
				$todo.keydown(function(event) {
					var text = $(this).val();
					if(text === "") {
						return;
					} else {
						if(event.keyCode == 13) {
							var $item = $('<li class="mylist"><input type="checkbox" class="toggle" name="items"><label>' + text + '</label><button class="destroy">X</button><input class="edit" value="" /></li>');
							Todo.Completed($item);
							$oUl.append($item);
							$(this).val('');
						};
						Todo.Count();
					};
				});
			},
			//删除
			Del: function() {
				$("#todoList").on("click", ".destroy", function() {
					if(confirm("是否确定删除？")) {
						$(this).parent().remove();
					};
					Todo.Count();
				});
			},
			//修改
			Revise:function(){
				$(".todo-list").on("dblclick","label",function () {
					$(this).css("display","none");
					$(this).parent('li').find('.edit').css("display","block").focus().val($(this).html());

					$(".edit").blur(function () {
						$(this).css("display","none");
						$(this).parent('li').find('label').css("display","block").html($(this).val());
					});
					$(".edit").keydown(function (event) {
						if(event.keyCode == 13) {
							$(this).css("display","none");
							$(this).parent('li').find('label').css("display","block").html($(this).val());
						};
					});
				});
			},
			//全选
			selectAll: function() {
				//全选和全不选
				$("#toggle-all").click(function() {
					$(".toggle").prop("checked", this.checked);
					if($('input:checked')) {
						$('input:checked').parent("li").find("label").removeClass("selectLabel");
					} else {
						$('input:checked').parent("li").find("label").addClass("selectLabel");
					}
					$(".toggle").parent("li").find("label").toggleClass("selectLabel");
					Todo.Count();
				});

			},
			//全选联动
			selectLitte: function() {
				$("#todoList").on('click', '.toggle', function() { //事件委派$(elements).on( events,[selector],data,handler );
					//筛选正被选中的与所有的进行长度比较
					$("#toggle-all").prop("checked", $(".toggle").length == $(".toggle").filter(".toggle:checked").length);
				});
			},
			//选择的样式
			Completed: function($item) {
				$item.find('input:checkbox').on('change', function() {
					$(this).parent("li").find("label").toggleClass("selectLabel");
					Todo.Count();
				});
			},
			//计数
			Count: function() {
				var len = $("input[name='items']").not('input:checked').length;
				$("#number").html(len);
				if(len == 0 && $('.todo-list li').length == 0) {
					$(".footer").hide();
					$("#toggle-all").prop("checked", false);
				} else {
					$(".footer").show();
				};
			},
			//全部显示
			showAll: function() {
				$(".selected").click(function() {
					$("#todoList li").show();
				});
			},
			//只显示未完成
			showActive: function() {

				$(".active").click(function() {
					$("#todoList li").show();
					$('input:checked').parent("li").hide();
				});
			},
			//只显示已完成
			showCompleted: function() {
				$(".completed").click(function() {
					$("#todoList li").show();
					$("input[name='items']").not('input:checked').parent("li").hide();
				});
			},
			//清除已完成
			clearCompleted: function() {
				$(".clear-completed").click(function() {
					$('input:checked').parent("li").remove();
					Todo.Count();
				})
			},
			
			init: function() {
				this.Add();
				this.Del();
				this.Revise();
				this.selectAll();
				this.selectLitte();
				this.showAll();
				this.showActive();
				this.showCompleted();
				this.clearCompleted();
			}
		}
		Todo.init();
	})
	//下次写的时候要注意jqurey版本问题..