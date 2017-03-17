/**
 * Created by Administrator on 2016/8/16.
 */
function check() {
    var all = document.getElementsByName("like");
    var noall = document.getElementById("btn").value;

    if (noall == "全选") {    //全选
        document.getElementById("btn").value = "全不选";
        for (var i = 0; i < all.length; i++) {
            all[i].checked = true;
        }
    } else { //全不选
        document.getElementById("btn").value = "全选";
        for (var i = 0; i < all.length; i++) {
            all[i].checked = false;
        }
    }

}
//反选
function checka() {
    var all = document.getElementsByName("like");
    for(var i=0;i<all.length;i++){
        /*all[i].checked = !all[i].checked;*/
        if(all[i].checked==true) {
            all[i].checked=false;
        }else{
            all[i].checked=true;
        }
    }
}
//			购物车增加
$(".addd").click(function () {
    //var index = $(".addd").index($(this));

    //写法1
     var $numdom = $(this).prev();
     var num = Number($numdom.val())+1;
     $numdom.val(num);

    //写法2
    /*var $numdom = $(this).parent().find(".num");
    var num = Number($numdom.val())+1;
    $numdom.val(num);*/

    //写法3
    // var $numdom = $(this).parents(".shop-line").find(".num");
    // var num = Number($numdom.val())+1;
    // $numdom.val(num);

    var $pricedom = $(this).parents(".shop-line").find(".price");
    var numprice =Number($numdom.val())*20;
    $pricedom.val(numprice);

    var $zongjiadom = $(this).parents(".container").find("#zongjia");
    var numprice =Number($numdom.val());
    $zongjiadom.val(numprice);

    zongjia();

})
$(".subb").click(function () {
    var $numdom = $(this).next();
    var num = Number($numdom.val())-1;
    if (Number($numdom.val())<2) return;
    $numdom.val(num);

    var $pricedom = $(this).parents(".shop-line").find(".price");
    var numprice =Number($numdom.val())*20;
    $pricedom.val(numprice);

    zongjia();
})

function zongjia() {
    var total = 0;
    $(".price").each(function(){
        total += parseInt($(this).val());
    })

    // for(var i=0; i<$(".price").size(); i++){
    //     $(".price").eq(i)
    // }
    $("#zongjia").val(total);
}


//总价的
//			function zongjia () {
//				var zongjia=document.getElementById("zongjia").value;
//				var price1=document.getElementById("price1").value;
//				var price2=document.getElementById("price2").value;
//				var  price=document.getElementById("price").value;
//				zongjia=Number(price)+Number(price1)+Number(price2);
//				document.getElementById("zongjia").value=zongjia;
//			}
//第一套
//点增加的
//			function add () {
//				var add=document.getElementById("num").value;
//				add++;
//				document.getElementById("num").value=add;
//				var price=document.getElementById("price").value;
//				price=20*add;
//				document.getElementById("price").value=price;
//				zongjia();
//
//			}
//点减少的
//			function sub () {
//				var sub=document.getElementById("num").value;
//				sub--;
//				if (sub>0) {
//					document.getElementById("num").value=sub;
//				var price=document.getElementById("price").value;
//				price=20*sub;
//				document.getElementById("price").value=price;
//
//				zongjia();
//				}
//
//			}
//第二套
//			function add1 () {
//				var add=document.getElementById("num1").value;
//				add++;
//				document.getElementById("num1").value=add;
//				var price=document.getElementById("price1").value;
//				price=20*add;
//				document.getElementById("price1").value=price;
//
//				zongjia();
//			}
//
//			function sub1 () {
//				var sub=document.getElementById("num1").value;
//				sub--;
//				if (sub>0) {
//					document.getElementById("num1").value=sub;
//				var price=document.getElementById("price1").value;
//				price=20*sub;
//				document.getElementById("price1").value=price;
//
//				zongjia();
//				}
//
//			}
//第三套
/*function add2 () {
    var add=document.getElementById("num2").value;
    add++;
    document.getElementById("num2").value=add;
    var price=document.getElementById("price2").value;
    price=20*add;
    document.getElementById("price2").value=price;

    zongjia();
}

function sub2 () {
    var sub=document.getElementById("num2").value;
    sub--;
    if (sub>0) {
        document.getElementById("num2").value=sub;
        var price=document.getElementById("price2").value;
        price=20*sub;
        document.getElementById("price2").value=price;

        zongjia();
    }

}*/

//删除
$(document).ready(function() {
    $(".shan").click(function(){
        $(this).parent().parent().remove();
    })
})

$(function() { //载入后
    var d = $('#body .middle .gd ');
    var ul = d.find('ul');
    var li = ul.find('li');
    var l = $('#body .middle .bt .l');
    var r = $('#body .middle .bt .r')

    //设置ul的宽
    ul.width((li.width() + 10) * li.length);

    var zy = false;

    //给左右加事件
    l.click(function() {
        zy = true;
        zou(true);
    });
    r.click(function() {
        zy = false;
        zou(false);
    });
    //自动切换
    window.setInterval(function() {
        if (zy) {
            l.click(); //自动点击
        } else {
            r.click(); //自动点击
        }
    }, 2000);

    /*
     zuozou  向左或向右走
     */
    function zou(zuozou) {
        var k = $('#body .middle .gd ul li').width() * -1;
        var t = $('#body .middle .gd ul li').length - 1;
        if (zuozou) {
            //向左
            $('#body .middle .gd ul').stop(true, true).animate({
                'left': k
            }, function() { //执行完动画后
                $('#body .middle .gd ul li').eq(0).appendTo($('#body .middle .gd ul'));
                $('#body .middle .gd ul').css({
                    'left': 0
                });
            });
        } else {
            //向右
            $('#body .middle .gd ul li').eq(t).prependTo($('#body .middle .gd ul'));
            $('#body .middle .gd ul').css({
                'left': k
            });
            $('#body .middle .gd ul').stop(true, true).animate({
                'left': 0
            });
        }
    }
})