/**
 * Created by Lenovo on 2017/11/12.
 */
//������󿪷���Ҫ���Լ�����һ��js��
//Ȼ������Ӧ�����������Ե��ðѾֲ���������Ϊȫ�ֱ���;(����ȫ�ֱ�����Ⱦ)
(function (){
    //1.����һ��ʳ�����;(���-λ��-����ɫ)
    //a.Ҫ�г�ʼ��ʳ��ķ���;
    //b.Ҫ�ܹ�ɾ��ʳ��ķ���;(����ʳ��Ҫ��û��Ȼ������µ�ʳ��)

    //1.����һ��ʳ�����;(���-λ��-����ɫ)
    function Food(w,h,t,l,bg){
        this.width = w || 20;
        this.height = h || 20;
        this.top = t || 0;
        this.left = l || 0;
        this.background = bg || "green";
    }

    //a.Ҫ�г�ʼ��ʳ��ķ���;(�ṩ��ԭ�ͣ���ÿ���������������-��ʡ�ڴ�ռ�)
    //���´�������������һ�����÷�Χ
    var newDiv = null;
    Food.prototype.init = function (map) {
        //0.����ʳ��֮ǰ������оɵ�ʳ��Ӧ��ɾ��;
        removeFood(map);
        //1.����div��2.���ÿ�ߺͱ���Ȼ�������λ�ã�3.��ӵ�map��;
        //1.����div��
        newDiv = document.createElement("div");
        //2.���ÿ�ߺͱ���Ȼ�������λ�ã�
        //newDiv.style.borderRadius = "50%";//��ΪԲ��ʳ��
        newDiv.style.width = this.width+"px";
        newDiv.style.height = this.height+"px";
        newDiv.style.background = this.background;
        //λ�ã������þ��Զ�λ�����λ�ø�ֵ��
        newDiv.style.position = "absolute";
        //�����λ��Ӧ���ǿ�ߵ�������
        this.top = parseInt(Math.random()*(map.offsetHeight-this.height)/this.height)*this.height;
        this.left = parseInt(Math.random()*(map.offsetWidth-this.width)/this.width)*this.width;
        //this.top = 20;//���ڲ���
        //this.left = 100;//���ڲ���
        //��ֵ
        newDiv.style.top = this.top+"px";
        newDiv.style.left = this.left+"px";

        //3.��ӵ�map��;
        map.appendChild(newDiv);
    }

    //b.Ҫ�ܹ�ɾ��ʳ��ķ���;(����ʳ��Ҫ��û��Ȼ������µ�ʳ��)
    //������������Χ�ڣ�����һ���ֲ���Χ�ڵĺ�����ֻ�������Χ������;
    function removeFood(map){
        //�ŵ㣺��ȫ��ֻ��һ���������ɾ��ʳ����Ǵ�����ʳ���ʱ��;
        //ȱ�㣺�ⲿ��Զ�޷�ʹ��removeFood();����Food�Ķ���ʵ��Ҳ�޷���������;
        //����оɵ�ʳ���ɾ����û�оͲ�Ҫɾ��;
        if(newDiv != null){
            map.removeChild(newDiv);
        }
    }

    //��Food�ṩ/��¶��ȫ��;
    window.Food = Food;
})()
