/**
 * Created by Lenovo on 2017/9/16.
 */
(function () {
    //3.构造一个游戏对象;(只对外提供一个方法，游戏开始)
        //a. 游戏开始;
        //b. 利用定时器移动蛇(小蛇快跑);(最好不对外)
        //c. 按键改变方向;(最好不对外)


    //3.构造一个游戏对象;(只对外提供一个方法，游戏开始)
    function Game(map){
        //蛇和食物游戏可以自己创建;但是地图应该被传递过来;
        this.food = new Food();
        this.snake = new Snake();
        this.map = map;
    }

    //a. 游戏开始;
    Game.prototype.start = function () {
        //1.初始化食物和蛇;
        this.snake.init(this.map);
        this.food.init(this.map,this.snake);

        //2.利用定时器移动蛇(小蛇快跑);(最好不对外)
        snakeMoveOftimer(this.snake,this.food,this.map,700);
        //3.按键改变方向;(最好不对外)
        pressKey(this.snake,this.food,this.map);
    }

    //b. 利用定时器移动蛇(小蛇快跑);(最好不对外)
    var timer = null;
    var num = 130;
    function snakeMoveOftimer(snake,food,map,time){
        //设置定时器，小蛇移动;
        num = time;
        clearInterval(timer);
        timer = setInterval(function () {
            //小蛇移动;
            snake.snakeMove(map,food,snake);
            //超出地图，game over！
                //宽高有取值范围： [0, map-snake]
            var headx = snake.body[0].left*snake.width;
            var heady = snake.body[0].top*snake.height;
            if(headx<0 || headx > map.offsetWidth-snake.width){
                alert("Game over!");
                //清除定时器;
                clearInterval(timer);
                map.innerHTML = "<p><button>重新开始</button><button>退出游戏</button></butt>"
                document.getElementsByTagName("button")[0].onclick = function () {
                    location.reload();
                }
                document.getElementsByTagName("button")[1].onclick = function () {
                    close();
                }
            }
            if(heady<0 || heady > map.offsetHeight-snake.height){
                alert("Game over!");
                //清除定时器;
                clearInterval(timer);
                map.innerHTML = "<p><button>重新开始</button><button>退出游戏</button></butt>"
                document.getElementsByTagName("button")[0].onclick = function () {
                    location.reload();
                }
                document.getElementsByTagName("button")[1].onclick = function () {
                    close();
                }
            }
            //撞自己
            for(var i=1;i<snake.body.length;i++){
                if(snake.body[0].top == snake.body[i].top&&snake.body[0].left == snake.body[i].left){
                    alert("Game over!");
                    //清除定时器;
                    clearInterval(timer);
                    //map.innerHTML = "<p><button>重新开始</button><button>退出游戏</button></butt>"
                    //document.getElementsByTagName("button")[0].onclick = function () {
                    //    location.reload();
                    //}
                    //document.getElementsByTagName("button")[1].onclick = function () {
                    //    close();
                    //}
                }
            }

            //判断：
            if(snake.count%10 === 5 && num>70){
                snake.count = 0;
                num-=10;
                clearInterval(timer);
                console.log(num);
                document.getElementsByTagName("i")[1].innerHTML = num;
                snakeMoveOftimer(snake,food,map,num);
            }else if(snake.count%10 === 5 && num>15){
                snake.count = 0;
                num-=2;
                clearInterval(timer);
                console.log(num);
                document.getElementsByTagName("i")[1].innerHTML = num;
                snakeMoveOftimer(snake,food,map,num);
            }
		flag = true;
        },num);
    }
    //c. 按键改变方向;(最好不对外)
    var bool = true;
    var flag = true;
    function pressKey(snake,food,map){
        //通过按键改变snake的body中的direction
        var aaa = 0;
        document.onkeydown = function (event) {
		if(flag == false){return;}
		flag = false;
            event = event || window.event;
            //通过按键的值，给蛇body的direction属性改变;
            //alert(event.keyCode);//  左: 37;  上: 38;  右: 39;  下: 40;
            if(snake.direction== "left" || snake.direction=="right"){
                switch (event.keyCode){
                    case 38:snake.direction = "top";break;
                    case 40:snake.direction = "bottom";break;
                }
            }else{
                switch (event.keyCode){
                    case 37:snake.direction = "left";break;
                    case 39:snake.direction = "right";break;
                }
            }


            //event.keyCode
            if(event.keyCode == 80){
                aaa++;
                console.log(aaa);
                if(aaa === 3){
                    snakeMoveOftimer(snake,food,map,400);
                }
            }




            //添加暂停/开始
            if(event.keyCode == 32){
                if(bool){
                    bool = false;
                    clearInterval(timer);
                }else{
                    bool = true;
                    //设置定时器，小蛇移动;
                    timer = setInterval(function () {
                        //小蛇移动;
                        snake.snakeMove(map,food,snake);
                        //超出地图，game over！
                        //宽高有取值范围： [0, map-snake]
                        var headx = snake.body[0].left*snake.width;
                        var heady = snake.body[0].top*snake.height;
                        if(headx<0 || headx > map.offsetWidth-snake.width){
                            alert("Game over!");
                            //清除定时器;
                            clearInterval(timer);
                        }
                        if(heady<0 || heady > map.offsetHeight-snake.height){
                            alert("Game over!");
                            //清除定时器;
                            clearInterval(timer);
                        }
                    },num);
                }
            }
        }
    }




    //把Game暴露给全局
    window.Game = Game;
})();