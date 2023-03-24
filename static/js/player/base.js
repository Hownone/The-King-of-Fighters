import AcGameObject from "../ac_game_object.js";

export default class Player extends AcGameObject {
    constructor(root, info) {
        super();
        this.root = root;
        this.id = info.id; //区分两名角色的id
        this.x = info.x; //坐标x
        this.y = info.y; //坐标y
        this.width = info.width; // 宽
        this.height = info.height; // 高
        this.color = info.color; //颜色

        this.vx = 0; //水平方向的速度
        this.vy = 0; // 竖直方向的速度

        this.direction = 1; // 1 为向右，-1位向左

        this.speedX = 400; //水平移动速度
        this.speedY = -1200; //跳起的初始速度

        this.gravity = 50;  //重力

        this.ctx = this.root.game_map.ctx;
        this.status = 3; //角色状态：0:idle, 1: 向前,2: 向后,3:跳跃,4:攻击，5：受击，6：死亡

        this.pressed_keys = this.root.game_map.controller.pressed_keys; // 控制按键
        this.animations = new Map(); //用Map存储角色每个状态的动作 status: gif
        this.frame_current_cnt = 0; // 记录当前是第几帧（总帧数）

    }

    start() {


    }

    update_move() {
        if (this.status === 3) this.vy += this.gravity;

        this.x += this.vx * this.timeDelta / 1000; //路程=速度*时间，timeDelta单位是毫秒，所以要 / 1000
        this.y += this.vy * this.timeDelta / 1000;


        if (this.y > 410) {  //到达地面后转换为状态0
            this.vy = 0;
            this.y = 410;
            this.status = 0;
        }

        //防越界
        // console.log(this.x, this.root.game_map.$canvas.width(), this.width);

        if (this.x < 0) this.x = 0;
        else if (this.x + this.width >= this.root.game_map.$canvas.width()) {
            this.x = this.root.game_map.$canvas.width() - this.width;
        }
    }

    update_control() { //每一帧都要去判断一下摁的是什么键
        let w, a, space, d;
        // console.log(this.pressed_keys);
        if (this.id === 0) {
            w = this.pressed_keys.has('w');
            a = this.pressed_keys.has('a');
            d = this.pressed_keys.has('d');
            space = this.pressed_keys.has(' ');
        } else {
            w = this.pressed_keys.has('ArrowUp');
            a = this.pressed_keys.has('ArrowLeft');
            d = this.pressed_keys.has('ArrowRight');
            space = this.pressed_keys.has('Enter');
        }
        //console.log(w, a, space, d);
        //这里是跳起来在空中不能做动作的版本,因此只能从0,1,2转变到3
        if (this.status === 0 || this.status === 1 || this.status === 2) {
            if (space) {
                this.status = 4;
                this.vx = 0;
                this.frame_current_cnt = 0; //调整为从第0帧开始
            }
            else if (w) {
                if (d) { //向前45°跳
                    this.vx = this.speedX;
                } else if (a) { //向后45°跳
                    this.vx = -this.speedX;
                } else { //垂直向上跳
                    this.vx = 0;
                }
                this.vy = this.speedY;
                this.status = 3;
                this.frame_current_cnt = 0; //调整为从第0帧开始
            } else if (d) { // 向前
                this.vx = this.speedX;
                this.status = 1;
                this.vy = 0;
            } else if (a) { //向后
                this.vx = -this.speedX;
                this.status = 2;
                this.vy = 0;
            } else { //没有移动
                this.vx = 0;
                this.vy = 0;
                this.status = 0;
            }
        }
    }

    update_direction() {
        let players = this.root.players;
        if (players[0] && players[1]) {
            let me = this, you = players[1 - this.id];
            if (me.x < you.x) me.direction = 1;
            else me.direction = -1;
        }

    }


    update() {
        this.update_move();
        this.update_control();
        this.update_direction();

        this.render();
    }


    render() {
        // this.ctx.fillStyle = this.color;
        // this.ctx.fillRect(this.x, this.y, this.width, this.height); //创建矩形
        let status = this.status;

        if (status === 1 && this.direction * this.vx < 0) { //如果当前方向和我们移动方向是不同方向的，就代表后退
            status = 2;
        }

        let obj = this.animations.get(status);
        //当gif被加载完毕才渲染
        if (obj && obj.loaded) {
            if (this.direction > 0) { //正方向
                let k = parseInt(this.frame_current_cnt / obj.frame_rate) % obj.frame_cnt;
                //if (status === 3) console.log(k, obj.frame_cnt); //用来调试跳跃的帧数
                let image = obj.gif.frames[k].image; //通过这个接口将GIF图片里的每一帧提取出来
                //将image画出来
                this.ctx.drawImage(image, this.x, this.y + obj.offset_y, image.width * obj.scale, image.height * obj.scale);
            } else { //反方向
                //canvas水平翻转
                this.ctx.save();
                this.ctx.scale(-1, 1); //让x * -1 ，y * 1 ，即将整个坐标系按y轴翻转
                this.ctx.translate(-this.root.game_map.$canvas.width(), 0);//将坐标系向负方向平移 

                let k = parseInt(this.frame_current_cnt / obj.frame_rate) % obj.frame_cnt;
                //if (status === 3) console.log(k, obj.frame_cnt); //用来调试跳跃的帧数
                let image = obj.gif.frames[k].image; //通过这个接口将GIF图片里的每一帧提取出来
                //将image画出来
                // console.log(this.root.game_map.$canvas.width())
                this.ctx.drawImage(image, this.root.game_map.$canvas.width() - this.x - this.width, this.y + obj.offset_y, image.width * obj.scale, image.height * obj.scale);
                this.ctx.restore();
            }
        }

        if (status === 4) //当攻击动作播放完后恢复为状态0
        {
            if (this.frame_current_cnt === obj.frame_rate * (obj.frame_cnt - 1)) //当前帧为该动作效果的最后一帧时
            {
                this.status = 0;

            }
            //console.log(this.status);
        }

        this.frame_current_cnt++;
    }

    test() {
        //测试某类extends我也会继承我的函数
        console.log("yes kyo extends player's function!");
    }
}