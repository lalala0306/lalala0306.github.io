window.onload = function(){
	(function (){
  var elements = [];//用来保存每个小方块食物的
  //食物就是一个对象，有宽有高，有颜色，有纵横坐标，先定义构造函数，再创建对象
  function Food(width,height,color,x,y) {
  	this.width = width || 20;
  	this.height = height || 20;
  	this.color = color || "red";
  	this.x = x || 0;
  	this.y = y || 0;
  }
  //为原型添加初始化方法（作用：在页面上显示这个食物）
  //因为食物要在地图上显示，所以需要地图这个参数（map----就是页面上的class=map的这个div
  Food.prototype.init = function (map) {
    //先删除这个小食物
    remove();
    //创建div
    var div = document.createElement("div");
   //把div加入到map中
   map.appendChild(div);
    //设置div的样式
    div.style.width = this.width +"px";
    div.style.height = this.height+"px";
    div.classList.add("food");
    //先脱离文档流
    div.style.position = "absolute"
    //随机纵横坐标
    this.x = parseInt(Math.random()*(map.offsetWidth/this.width))*this.width;
    this.y = parseInt(Math.random()*(map.offsetHeight/this.height))*this.height;
    div.style.left = this.x + "px";
    div.style.top = this.y + "px";
    //把div加入到数组elements中；
    elements.push(div);
};
Food.prototype.remove = function (map){
	for (var i = 0 ; i < elements.length ; i ++) {
		var ele = elements[i];
      //找到这个子元素的父级元素，然后删除这个子元素
      ele.parentNode.removeChild(ele);
      //再次把elements中的这个子元素也要删除
      elements.splice(i,1);//从索引为i的位置删除一项
  }
}
   //私有函数  删除食物的
   function remove() {
    //elements 数组中有这个食物
    for (var i = 0 ; i < elements.length ; i ++) {
    	var ele = elements[i];
      //找到这个子元素的父级元素，然后删除这个子元素
      ele.parentNode.removeChild(ele);
      //再次把elements中的这个子元素也要删除
      elements.splice(i,1);//从索引为i的位置删除一项
  }
}
window.Food = Food; 
}());
 //小蛇
 (function(){
  var elements = [];//保存小蛇的每个身体
   //小蛇构造函数
   function Snake(width,height,direction){
   	this.score = 0;
   	this.width = width || 20;
   	this.height = height || 20;
    //小蛇的身体
    this.body = [
    {x:3,y:2,color:"header"},
    {x:2,y:2,color:"body"},
    {x:1,y:2,color:"body"}
    ];
    this.direction = direction || "right";
}
   //为原型添加小蛇初始化的方法
   Snake.prototype.init = function (map) {
   	remove();
    //循环遍历创建div
    for (var i = 0;i < this.body.length; i++) {
      //数组中的每个数组元素都是一个对象
      var obj = this.body[i];
      //创建div
      var div = document.createElement("div");
      //把第v加入到map地图中
      map.appendChild(div);
      //设置第v的样式
      div.style.position = "absolute";
      div.style.width = this.width+"px";
      div.style.height = this.height + "px";
      //横纵坐标
      div.style.left = obj.x*this.width + "px";
      div.style.top = obj.y*this.height + "px";
      //背景颜色
      // div.style.backgroundColor = obj.color;
      div.classList.add(obj.color);
      //方向

      //把div加入到elements数组中 目的为了删除
      elements.push(div);
  }
}
   //为原型添加小蛇动起来的方法
   Snake.prototype.move = function (food,map) {
    //改变小蛇身体的坐标位置
    var i = this.body.length-1;
    for (; i > 0; i--) {
    	this.body[i].x = this.body[i-1].x;
    	this.body[i].y = this.body[i-1].y;
    }
    //判断方向改变小蛇头的坐标位置
    switch (this.direction) {
    	case "right":this.body[0].x += 1;
    	break;
    	case "left":this.body[0].x -= 1;
    	break;
    	case "top":this.body[0].y -= 1;
    	break;
    	case "bottom":this.body[0].y += 1;
    	break;
    }
    // 判断小蛇有没有吃到食物
    // 小蛇头的坐标位置和食物的坐标位置一致
    var headX = this.body[0].x*this.width;
    var headY = this.body[0].y*this.height;
    //判断小蛇的头坐标和食物的坐标是否一致
    if (headX==food.x&&headY==food.y){
    	this.score += 1;
    	document.getElementById("score").innerHTML = "分数："+this.score;
      //获取小蛇最后的尾巴
      var last = this.body[this.body.length-1];
       //把蛇尾复制一个重新加入到小蛇的body中
       this.body.push({
       	x:last.x,
       	y:last.y,
       	color:last.color
       });
      //把食物删除，重新初始化食物
      food.init(map);
  }
} 
Snake.prototype.remove = function (food,map){
	var i = elements.length-1;
	for (;i >= 0 ; i--) {
		var ele = elements[i];
		ele.parentNode.removeChild(ele);
		elements.splice(i,1);
	}
}
   //私有函数删除小蛇
   function remove() {
    //获取数组
    var i = elements.length-1;
    for (;i >= 0 ; i--) {
    	var ele = elements[i];
    	ele.parentNode.removeChild(ele);
    	elements.splice(i,1);
    }
}
window.Snake = Snake;
}());
 //自调用函数 --- 游戏对象
 (function(){
 	var that = null;
  //游戏的构造函数
  function Game(map) {
    this.food = new Food();//食物对象
    this.snake = new Snake();//小蛇对象
    this.map = map;//地图
    that = this;
}
  //原型添加游戏初始化的方法
  Game.prototype.init = function() {
  	this.food.init(this.map);
  	this.snake.init(this.map);
  	this.runSnake(this.food,this.map);
  	this.bindKey();
  }
  //添加原型方法---让小蛇自动的动起来
  Game.prototype.runSnake = function (food,map) {
    //自动的去移动
    var timeId = setInterval(function(){
      //移动小蛇
      this.snake.move(food,map);
      //初始化小蛇
      this.snake.init(map);
      //横坐标的最大值
      var maxX = map.offsetWidth/this.snake.width;
      //纵坐标最大值
      var maxY = map.offsetHeight/this.snake.height;
      //小蛇的头的位置坐标
      var headX = this.snake.body[0].x;
      var headY = this.snake.body[0].y;
      function relodGame(){
      	clearInterval(timeId);
      	document.getElementById("end").style.display = "block";
      	that.snake.remove();
      	that.food.remove();
      	that.snake.body = [
      	{x:3,y:2,color:"header"},
      	{x:2,y:2,color:"body"},
      	{x:1,y:2,color:"body"}
      	];
      	that.snake.direction = "right";
      }
      //判断如果蛇头的坐标位置超出了地图 则游戏结束j'h'n
      if (headX<0||headX>=maxX) {
   		relodGame()		
      }
      if (headY<0||headY>=maxY) {
   		relodGame()
      }
      //当蛇头碰到身体时游戏结束
      for(var i=1; i<this.snake.body.length;i++){
      	if (this.snake.body[i].x==headX && this.snake.body[i].y==headY) {
    		relodGame() 
      	}
      }
  }.bind(that),150);

}
  //添加原型方法---设置用户按键，改变小蛇的移动方向
  //添加锁 使小蛇无法倒车
  Game.prototype.bindKey = function() {
  	var sankeRight = false;
  	var snakeLeft = false;
  	var snakeUp = true;
  	var snakeDown = true;
  //获取用户按键，改变小蛇方向
  document.addEventListener("keydown",function(e){
   //这里的this应该是触发keydown事件的对象----document
   //获取按键的值
   switch (e.keyCode) {
   	case 37:
   	if(snakeLeft){
   		this.snake.direction = "left";
   		sankeRight = false;
   		snakeLeft = false;
   		snakeUp = true;
   		snakeDown = true;
   	}
   	break;
   	case 38:
   	if(snakeUp){
   		this.snake.direction = "top";
   		sankeRight = true;
   		snakeLeft = true;
   		snakeUp = false;
   		snakeDown = false;
   	}
   	break;
   	case 39:
   	if(sankeRight){
   		this.snake.direction = "right";
   		sankeRight = false;
   		snakeLeft = false;
   		snakeUp = true;
   		snakeDown = true;
   	}
   	break;
   	case 40:
   	if(snakeDown){
   		this.snake.direction = "bottom";
   		sankeRight = true;
   		snakeLeft = true;
   		snakeUp = false;
   		snakeDown = false;
   	}
   	break;
   }
   // console.log(snakeUp +'..'+ snakeDown +'..'+ snakeLeft +'..'+ sankeRight)
}.bind(that),false);
};
window.Game = Game;
}());
 var gm = new Game(document.querySelector(".map"));
 var start = document.getElementById("start");
 var restart = document.getElementById("restart");
 var end = document.getElementById("end");
 start.onclick = function(){
 	gm.init();
 	start.style.display = "none";
 }
 restart.onclick = function(){
 	gm.init();
 	end.style.display = "none";
 	gm.snake.score = 0;
    document.getElementById("score").innerHTML = "分数："+gm.snake.score;
 }
 
//外部测试代码
// var fd = new Food();
// fd.init(document.querySelector(".map"));
// console.log(fd.x+"======"+fd.y);
// var snake = new Snake();
// snake.init(document.querySelector(".map"));
// setInterval(function(){
//   snake.move(fd,document.querySelector(".map"));
//   snake.init(document.querySelector(".map"));
// },150);
}