/**
 * Created by Lenovo on 2017/11/12.
 */
//������󿪷���Ҫ���Լ�����һ��js��
//Ȼ������Ӧ�����������Ե��ðѾֲ���������Ϊȫ�ֱ���;(����ȫ�ֱ�����Ⱦ)
(function () {
    //3.����һ����Ϸ����;(��Ϸ�Ŀ�ʼ��С�߿��ܺͰ�������)
        //a.��Ϸ��ʼ;
        //b.С�߿���;(�Ե�Խ���ܵ�Խ�죬��Ϸ����)
        //c.��������;(�ܰ���Щ���ո���ͣ)

    //3.����һ����Ϸ����;(��Ϸ�Ŀ�ʼ��С�߿��ܺͰ�������)
    function Game(map){
        this.map = map;
        //���ص�Game��ʱ���Ѿ�����Food��Snake��;
        this.food = new Food();
        this.snake = new Snake();
    }
    //a.��Ϸ��ʼ;(ȫ��)
    Game.prototype.start = function () {
        //1.��ʼ�������ߺ�ʳ��;
        this.food.init(this.map);
        this.snake.init(this.map);
        //2.��ͨ����ʱ���ƶ�;(С�߿���)
        runOfTimer(this.food,this.snake,this.map);
        //3.��������;
        pressKey(this.snake);
    }

    //b.С�߿���;(�Ե�Խ���ܵ�Խ�죬��Ϸ����)
    function runOfTimer(food,snake,map){
        //С���ܣ���ͨ����ʱ����
        var timer = setInterval(function () {
            //С���ƶ�;
            snake.snakeMove(map,food);
            //�ƶ�Ҫ�з�Χ������������Ϸ����
                //snake��top/leftֵҪ�յ�Լ��;
            var snakex = snake.body[0].left*snake.width;//Ҫ�ǵ�snake��body�����top��leftֵû�г��Կ��;
            var snakey = snake.body[0].top*snake.height;//Ҫ�ǵ�snake��body�����top��leftֵû�г��Կ��;
            if(snakex<0 || snakey<0){
                alert("Game over!!!");
                //�����ʱ��;
                clearInterval(timer);
                //����map������Ϊ���¿�ʼ
                map.innerHTML = "restart";
            }
            if(snakex>=map.offsetWidth || snakey>=map.offsetHeight){
                alert("Game over!!!");
                //�����ʱ��;
                clearInterval(timer);
                //����map������Ϊ���¿�ʼ
                map.innerHTML = "restart";
            }
        },200);
    }

    //c.��������;(�ܰ���Щ���ո���ͣ)
    function pressKey(snake){
        //��ҳ���ϰ���"��������"���ı�С�ߵķ���;
            //��document�󶨼��̰����¼�����ȡUnicode���룬�ı��ߵķ�������;
        document.onkeydown = function (event) {
            var event = event || window.event;
            //console.log(event.keyCode);//��:37;��:38;��:39;��:40;

                //ǰ���ߵ�ʱ�򣬲��ܸı�ǰ������ͬ��
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




    //��¶��ȫ��
    window.Game = Game;
})();