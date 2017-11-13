/**
 * Created by Lenovo on 2017/11/12.
 */
//面向对象开发，要求自己创建一个js。
//然后里面应用匿名函数自调用把局部变量提升为全局变量;(减少全局变量污染)
(function () {
    //2.创建一个小蛇对象;(宽高-位置-背景色-身体分为几部分)-分身体就是为了拐弯儿;
        //a.要有初始化小蛇的方法;
        //b.要有能够删除小蛇的方法;(删除旧蛇画一条新蛇;)
        //c.要有能够移动一个位置的蛇的方法;(删除旧蛇画一条新蛇;吃食物变长)


    //2.创建一个小蛇对象;(宽高-位置-背景色-身体分为几部分)-分身体就是为了拐弯儿;
    //按照道理来说应该先设置蛇的头部宽高位置背景...然后坐在设置身体的宽高位置背景...
        //但是宽高都一样;所以只要把头部和身体的位置和颜色区分出来就可以了(利用数组)；
    function Snake(w,h,d){
        //蛇的头部和身体宽高一样
        this.width = w || 20;
        this.height = h || 20;
        this.direction = d || "right";
        //整条蛇：分为头和身(身体有好几块);(位置和颜色)(放入数组中，方便操作)
        this.body = [
            //身体的每一部分都以对象形式存在;(属性：值方便获取)
            {top: 1,left: 3,background: "red"},//头
            {top: 1,left: 2,background: "orange"},//身体
            {top: 1,left: 1,background: "orange"} //身体
        ];
    }

    //a.要有初始化小蛇的方法;//和食物逻辑相似：1.位置不用随机;   2.生成多个;(for循环)
    //提升小蛇身体的每一部分的作用范围
    var arr = [];//身体的每一部分都放入数组中，将来方便删除;
    Snake.prototype.init = function (map) {
        //产生新蛇之前先删除旧蛇;
        removeSnake(map);
        //利用for循环，生成整条蛇;(设置宽高位置)
        for(var i=0;i<this.body.length;i++){
            //创建div，包装成蛇的一部分，添加到map中;
            var newDiv = document.createElement("div");
            //设置宽高
            newDiv.style.width = this.width+"px";
            newDiv.style.height = this.height+"px";
            //设置位置和颜色：要从body中取出来;
            newDiv.style.position = "absolute";
            newDiv.style.left = this.body[i].left*this.width+"px";
            newDiv.style.top = this.body[i].top*this.height+"px";
            newDiv.style.background = this.body[i].background;
            //添加到map中
            map.appendChild(newDiv);
            //把蛇的身体的每一部分都放入到数组中，将来操作(删除旧蛇);
            arr.push(newDiv);
        }
    }

    //b.要有能够删除小蛇的方法;(删除旧蛇画一条新蛇;)
        //删除小蛇方法私有;
    function removeSnake(map){
        //判断：数组中如果有元素就for循环删除，没有就算了;
            //使用for循环就没有必要判断了;(如果数组中没有就不进去了)
        for(var i=0;i<arr.length;i++){
            //千万不要删除数组中的元素，以后单独删除;(移动水果的时候说过)
            //先按照数组中的元素把map中的小蛇删除，然后在单数清空数组;
            map.removeChild(arr[i]);
        }
        //清空数组；每次数组中放入的都是新蛇;
        arr = [];
    }

    //c.要有能够移动一个位置的蛇的方法;(删除旧蛇画一条新蛇;吃食物变长)
        //这个方法要设置给原型，因为别人要用;
    Snake.prototype.snakeMove = function (map,food) {
        //1.删除旧蛇  2.画一条新蛇; （画新蛇之前要改变蛇对象的参数;）
            //蛇移动原理：(1).身体只需要设置为前一个元素的位置;  (2).头部按照方向+1/-1设置top/left;（头和身体）

        //1.删除旧蛇
        removeSnake(map);
        //(1).身体只需要设置为前一个元素的位置;
            //I.  不能从前往后，要从后往前;(不会出现层叠)(for循环)
            //II. 把前面的赋值给后面的;
            //III.不用赋值第一个，因为头部要特殊处理;
        for(var i=this.body.length-1;i>=1;i--){//I和III都体现出来了
            //II. 把前面的赋值给后面的;(位置：top/left)
            this.body[i].top = this.body[i-1].top;
            this.body[i].left = this.body[i-1].left;
        }

        //(2).头部按照方向+1/-1设置top/left;
            //this.direction的四个值分别为："top"/"right"/"bottom"/"left";
                    //top: this.body[0].top-1;       bottom：+1;
                    //left: this.body[0].left-1;     right：+1;
        switch (this.direction){
            case "top":
                //改变蛇头(this.body[0])的top/left值(-1)：
                this.body[0].top -= 1;
                break;
            case "bottom":
                //改变蛇头(this.body[0])的top/left值(+1)：
                this.body[0].top += 1;
                break;
            case "left":
                //改变蛇头(this.body[0])的top/left值(-1)：
                this.body[0].left -= 1;
                break;
            case "right":
                //改变蛇头(this.body[0])的top/left值(+1)：
                this.body[0].left += 1;
        }

        //(3).吃食物变长(I.吃食物就是头和食物坐标一样; II.添加身体的一部分，最好是最末尾)
        //I.吃食物就是头和食物坐标一样;
            //判断食物和蛇头部的坐标;
        var snakex = this.body[0].left*this.width;
        var snkaey = this.body[0].top*this.height;
        //获取蛇身体的最后一部分;
        var last = this.body[this.body.length-1];
        if(snkaey == food.top && snakex == food.left){
            //console.log("OK");
            //II.添加身体的一部分，最好是最末尾(初始化食物)
            var obj = {};//创建一个空白对象;然后把蛇身体的最后一部分的属性赋值给这个空白对象;
            obj.top = last.top;
            obj.left = last.left;
            obj.background = last.background;
            //添加到body中
            this.body.push(obj);
            //吃掉食物以后，还要产生一个新的事物
            food.init(map);
        }


        //2.画一条新蛇;
        this.init(map);
    }


    //把蛇构造函数暴露给全局
    window.Snake = Snake;
})();