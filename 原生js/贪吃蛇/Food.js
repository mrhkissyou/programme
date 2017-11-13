/**
 * Created by Lenovo on 2017/11/12.
 */
//面向对象开发，要求自己创建一个js。
//然后里面应用匿名函数自调用把局部变量提升为全局变量;(减少全局变量污染)
(function (){
    //1.创建一个食物对象;(宽高-位置-背景色)
    //a.要有初始化食物的方法;
    //b.要能够删除食物的方法;(吃了食物要变没，然后产出新的食物)

    //1.创建一个食物对象;(宽高-位置-背景色)
    function Food(w,h,t,l,bg){
        this.width = w || 20;
        this.height = h || 20;
        this.top = t || 0;
        this.left = l || 0;
        this.background = bg || "green";
    }

    //a.要有初始化食物的方法;(提供给原型，让每个对象共享这个方法-节省内存空间)
    //把新创建的事物提升一下作用范围
    var newDiv = null;
    Food.prototype.init = function (map) {
        //0.创建食物之前，如果有旧的食物应该删除;
        removeFood(map);
        //1.创建div；2.设置宽高和背景然后在随机位置；3.添加到map中;
        //1.创建div；
        newDiv = document.createElement("div");
        //2.设置宽高和背景然后在随机位置；
        //newDiv.style.borderRadius = "50%";//变为圆型食物
        newDiv.style.width = this.width+"px";
        newDiv.style.height = this.height+"px";
        newDiv.style.background = this.background;
        //位置：（设置绝对定位和随机位置赋值）
        newDiv.style.position = "absolute";
        //随机的位置应该是宽高的整数倍
        this.top = parseInt(Math.random()*(map.offsetHeight-this.height)/this.height)*this.height;
        this.left = parseInt(Math.random()*(map.offsetWidth-this.width)/this.width)*this.width;
        //this.top = 20;//用于测试
        //this.left = 100;//用于测试
        //赋值
        newDiv.style.top = this.top+"px";
        newDiv.style.left = this.left+"px";

        //3.添加到map中;
        map.appendChild(newDiv);
    }

    //b.要能够删除食物的方法;(吃了食物要变没，然后产出新的食物)
    //在匿名函数范围内，设置一个局部范围内的函数，只在这个范围起作用;
    function removeFood(map){
        //优点：安全，只有一种情况可以删除食物，就是创建新食物的时候;
        //缺点：外部永远无法使用removeFood();包括Food的对象实例也无法单独调用;
        //如果有旧的食物就删除，没有就不要删除;
        if(newDiv != null){
            map.removeChild(newDiv);
        }
    }

    //把Food提供/暴露给全局;
    window.Food = Food;
})()
