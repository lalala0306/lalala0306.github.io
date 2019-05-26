$(function(){
	accordion();
	pieChart($("#c1")[0],0);
	pieChart($("#c2")[0],1);
	pieChart($("#c3")[0],2);
	toTop();
	myPhoto();
});
// -------------------手风琴效果----------------
/*
思路: 判断该元素有没对应的选择器如果有清除所有效果
如果没有就添加一个类样式。并且给当前的元素添加效果
is(selector) 根据选择器、元素或 jQuery 对象来检测
匹配元素集合，如果这些元素中至少有一个元素匹配给定的参数，则返回 true。
$(this).parents("h5").siblings();------>div.accordion-section-center
*/
function accordion(){
	$(".accordion-section-center").hide();
	$(".accordion-section-tittle").click(function(e){
		if($(e.target).is('.active')) {
			asc();
		}else{
			asc();
			$(this).addClass('active');
			$(this).parents("h5").siblings().slideDown(300).addClass('open');
		}
	});
	function asc() {
		$(".accordion-section-tittle").removeClass('active');
		$(".accordion-section-center").slideUp(300).removeClass('open');
	}
}
// --------------canvas表图--------------
function pieChart(dom,i) {
	//使用选择器获取到元素的内容值 并转换为数字
	var percent = parseInt($(".pie-value:eq("+i+")").text());
   //获取画布
	var canvas = dom;

	//创建画笔
	var ctx = canvas.getContext("2d");
	//圆的半径 需要减去线条的宽度防止超出画布的范围  被画布遮挡
	var radius = (canvas.width-8)/2;
	//重新映射画布上的 (0,0) 位置 将中心改变为画布中心
	ctx.translate(50, 50);
	//将当前绘图逆时针旋转九十度
	ctx.rotate(-90*Math.PI/180);
	//线条结束端点样式
	ctx.lineCap = "round";
	//绘制
	function drawCircle(color,lineWidth,percent){
		ctx.beginPath();
		ctx.arc(0, 0, radius, 0, Math.PI * 2 * percent/100);
		// 描边样式
		ctx.strokeStyle = color;
		// 线条宽度
		ctx.lineWidth = lineWidth;
		ctx.stroke();
	}
	// ----------动画-----------
	function animate(percent,tim) {
	var radian = 0;
	clearInterval(timeId);
	var timeId = setInterval(function(){
		radian+= 1 ;
		drawCircle("#10A7AF",7.3,radian);
		if (radian===percent) clearInterval(timeId);
	},tim);
}
	drawCircle("#fff",8,100);
	animate(percent,20);
}
// --------------------返回顶部隐藏/显示---------------
function toTop () {
	var ht = $(".header-top").height()+$(".header").height()+$(".about").height();
	window.onscroll = function () {
		var scrTop = document.documentElement.scrollTop || document.body.scrollTop;
		if (scrTop < ht) {
			$("#toTop").css("display","none");
		}else {
			$("#toTop").css("display","block");
		}
	}
}
// -------------------照片------------------
function myPhoto(){
	function closePhoto() {
			$("#barrierBed").hide();
			$(".photo").hide();
		}
	closePhoto();
	$("#myphoto").click(function(){
		$("#barrierBed").show();
		$(".photo").show();
	});
	$("#zp").click(function(){
		$("#barrierBed").show();
		$(".photo").show();
	});
	$("#remove1").click(function(){
		$("#barrierBed").hide();
		$(".photo").hide();
	});
} 