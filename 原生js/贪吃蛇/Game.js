/**
 * Created by Lenovo on 2017/11/12.
 */
//面向对象开发，要求自己创建一个js。
//然后里面应用匿名函数自调用把局部变量提升为全局变量;(减少全局变量污染)
(function () {
    //3.创建一个游戏对象;(游戏的开始和小蛇快跑和按键变向)
        //a.游戏开始;
        //b.小蛇快跑;(吃的越多跑的越快，游戏结束)
        //c.按键变向;(能按哪些，空格暂停)

    //3.创建一个游戏对象;(游戏的开始和小蛇快跑和按键变向)
    function Game(map){
        this.map = map;
        //加载到Game的时候已经有了Food和Snake了;
        this.food = new Food();
        this.snake = new Snake();
    }
    //a.游戏开始;(全局)
    Game.prototype.start = function () {
        //1.初始化出来蛇和食物;
        this.food.init(this.map);
        this.snake.init(this.map);
        //2.蛇通过定时器移动;(小蛇快跑)
        runOfTimer(this.food,this.snake,this.map);
        //3.按键变向;
        pressKey(this.snake);
    }

    //b.小蛇快跑;(吃的越多跑的越快，游戏结束)
    function runOfTimer(food,snake,map){
        //小蛇跑，是通过定时器！
        var timer = setInterval(function () {
            //小蛇移动;
            snake.snakeMove(map,food);
            //移动要有范围，超出界限游戏结束
                //snake的top/left值要收到约束;
            var snakex = snake.body[0].left*snake.width;//要记得snake的body里面的top和left值没有乘以宽高;
            var snakey = snake.body[0].top*snake.height;//要记得snake的body里面的top和left值没有乘以宽高;
            if(snakex<0 || snakey<0){
                alert("Game over!!!");
                //清除定时器;
                clearInterval(timer);
                //设置map的内容为重新开始
                map.innerHTML = "restart";
            }
            if(snakex>=map.offsetWidth || snakey>=map.offsetHeight){
                alert("Game over!!!");
                //清除定时器;
                clearInterval(timer);
                //设置map的内容为重新开始
                map.innerHTML = "restart";
            }
        },200);
    }

    //c.按键变向;(能按哪些，空格暂停)
    function pressKey(snake){
        //在页面上按下"上下左右"，改变小蛇的方向;
            //给document绑定键盘按下事件，获取Unicode编码，改变蛇的方向属性;
        document.onkeydown = function (event) {
            var event = event || window.event;
            //console.log(event.keyCode);//左:37;上:38;右:39;下:40;

                //前后走的时候，不能改变前后；左右同理
                if(snake.direction == "left" || snake.direction == "right"){
                    switch (event.keyCode){
                        case 38: snake.direction="top";break;
                        case 40: snake.direction="bottom";break;
                    }
                }else{
                    switch (event.keyCode){
                        case 37: snake.direction="left";break;
                        case 39: snake.direction="right";break;
                    }
                }
        }
    }




    //暴露给全局
    window.Game = Game;
})();