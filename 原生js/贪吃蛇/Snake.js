/**
 * Created by Lenovo on 2017/11/12.
 */
//������󿪷���Ҫ���Լ�����һ��js��
//Ȼ������Ӧ�����������Ե��ðѾֲ���������Ϊȫ�ֱ���;(����ȫ�ֱ�����Ⱦ)
(function () {
    //2.����һ��С�߶���;(���-λ��-����ɫ-�����Ϊ������)-���������Ϊ�˹����;
        //a.Ҫ�г�ʼ��С�ߵķ���;
        //b.Ҫ���ܹ�ɾ��С�ߵķ���;(ɾ�����߻�һ������;)
        //c.Ҫ���ܹ��ƶ�һ��λ�õ��ߵķ���;(ɾ�����߻�һ������;��ʳ��䳤)


    //2.����һ��С�߶���;(���-λ��-����ɫ-�����Ϊ������)-���������Ϊ�˹����;
    //���յ�����˵Ӧ���������ߵ�ͷ�����λ�ñ���...Ȼ��������������Ŀ��λ�ñ���...
        //���ǿ�߶�һ��;����ֻҪ��ͷ���������λ�ú���ɫ���ֳ����Ϳ�����(��������)��
    function Snake(w,h,d){
        //�ߵ�ͷ����������һ��
        this.width = w || 20;
        this.height = h || 20;
        this.direction = d || "right";
        //�����ߣ���Ϊͷ����(�����кü���);(λ�ú���ɫ)(���������У��������)
        this.body = [
            //�����ÿһ���ֶ��Զ�����ʽ����;(���ԣ�ֵ�����ȡ)
            {top: 1,left: 3,background: "red"},//ͷ
            {top: 1,left: 2,background: "orange"},//����
            {top: 1,left: 1,background: "orange"} //����
        ];
    }

    //a.Ҫ�г�ʼ��С�ߵķ���;//��ʳ���߼����ƣ�1.λ�ò������;   2.���ɶ��;(forѭ��)
    //����С�������ÿһ���ֵ����÷�Χ
    var arr = [];//�����ÿһ���ֶ����������У���������ɾ��;
    Snake.prototype.init = function (map) {
        //��������֮ǰ��ɾ������;
        removeSnake(map);
        //����forѭ��������������;(���ÿ��λ��)
        for(var i=0;i<this.body.length;i++){
            //����div����װ���ߵ�һ���֣���ӵ�map��;
            var newDiv = document.createElement("div");
            //���ÿ��
            newDiv.style.width = this.width+"px";
            newDiv.style.height = this.height+"px";
            //����λ�ú���ɫ��Ҫ��body��ȡ����;
            newDiv.style.position = "absolute";
            newDiv.style.left = this.body[i].left*this.width+"px";
            newDiv.style.top = this.body[i].top*this.height+"px";
            newDiv.style.background = this.body[i].background;
            //��ӵ�map��
            map.appendChild(newDiv);
            //���ߵ������ÿһ���ֶ����뵽�����У���������(ɾ������);
            arr.push(newDiv);
        }
    }

    //b.Ҫ���ܹ�ɾ��С�ߵķ���;(ɾ�����߻�һ������;)
        //ɾ��С�߷���˽��;
    function removeSnake(map){
        //�жϣ������������Ԫ�ؾ�forѭ��ɾ����û�о�����;
            //ʹ��forѭ����û�б�Ҫ�ж���;(���������û�оͲ���ȥ��)
        for(var i=0;i<arr.length;i++){
            //ǧ��Ҫɾ�������е�Ԫ�أ��Ժ󵥶�ɾ��;(�ƶ�ˮ����ʱ��˵��)
            //�Ȱ��������е�Ԫ�ذ�map�е�С��ɾ����Ȼ���ڵ����������;
            map.removeChild(arr[i]);
        }
        //������飻ÿ�������з���Ķ�������;
        arr = [];
    }

    //c.Ҫ���ܹ��ƶ�һ��λ�õ��ߵķ���;(ɾ�����߻�һ������;��ʳ��䳤)
        //�������Ҫ���ø�ԭ�ͣ���Ϊ����Ҫ��;
    Snake.prototype.snakeMove = function (map,food) {
        //1.ɾ������  2.��һ������; ��������֮ǰҪ�ı��߶���Ĳ���;��
            //���ƶ�ԭ��(1).����ֻ��Ҫ����Ϊǰһ��Ԫ�ص�λ��;  (2).ͷ�����շ���+1/-1����top/left;��ͷ�����壩

        //1.ɾ������
        removeSnake(map);
        //(1).����ֻ��Ҫ����Ϊǰһ��Ԫ�ص�λ��;
            //I.  ���ܴ�ǰ����Ҫ�Ӻ���ǰ;(������ֲ��)(forѭ��)
            //II. ��ǰ��ĸ�ֵ�������;
            //III.���ø�ֵ��һ������Ϊͷ��Ҫ���⴦��;
        for(var i=this.body.length-1;i>=1;i--){//I��III�����ֳ�����
            //II. ��ǰ��ĸ�ֵ�������;(λ�ã�top/left)
            this.body[i].top = this.body[i-1].top;
            this.body[i].left = this.body[i-1].left;
        }

        //(2).ͷ�����շ���+1/-1����top/left;
            //this.direction���ĸ�ֵ�ֱ�Ϊ��"top"/"right"/"bottom"/"left";
                    //top: this.body[0].top-1;       bottom��+1;
                    //left: this.body[0].left-1;     right��+1;
        switch (this.direction){
            case "top":
                //�ı���ͷ(this.body[0])��top/leftֵ(-1)��
                this.body[0].top -= 1;
                break;
            case "bottom":
                //�ı���ͷ(this.body[0])��top/leftֵ(+1)��
                this.body[0].top += 1;
                break;
            case "left":
                //�ı���ͷ(this.body[0])��top/leftֵ(-1)��
                this.body[0].left -= 1;
                break;
            case "right":
                //�ı���ͷ(this.body[0])��top/leftֵ(+1)��
                this.body[0].left += 1;
        }

        //(3).��ʳ��䳤(I.��ʳ�����ͷ��ʳ������һ��; II.��������һ���֣��������ĩβ)
        //I.��ʳ�����ͷ��ʳ������һ��;
            //�ж�ʳ�����ͷ��������;
        var snakex = this.body[0].left*this.width;
        var snkaey = this.body[0].top*this.height;
        //��ȡ����������һ����;
        var last = this.body[this.body.length-1];
        if(snkaey == food.top && snakex == food.left){
            //console.log("OK");
            //II.��������һ���֣��������ĩβ(��ʼ��ʳ��)
            var obj = {};//����һ���հ׶���;Ȼ�������������һ���ֵ����Ը�ֵ������հ׶���;
            obj.top = last.top;
            obj.left = last.left;
            obj.background = last.background;
            //��ӵ�body��
            this.body.push(obj);
            //�Ե�ʳ���Ժ󣬻�Ҫ����һ���µ�����
            food.init(map);
        }


        //2.��һ������;
        this.init(map);
    }


    //���߹��캯����¶��ȫ��
    window.Snake = Snake;
})();