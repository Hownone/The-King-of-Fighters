import Player from "./base.js";
import { GIF } from "../utils/gif.js";

export default class Kyo extends Player {
    constructor(root, info) {
        super(root, info);

        this.init_animations();

        //this.test();
        //this.test_ac();

    }

    init_animations() { //初始化动画
        let offsets = [0, -22, -22, -140, 0, 0, 0]; //纵向偏移量
        for (let i = 0; i < 7; i++) //一种有7个动作
        {
            let gif = GIF(); //这里参考别人写好的轮子写法
            gif.load(`/static/images/player/kyo/${i}.gif`);
            this.animations.set(i, {
                gif: gif,
                frame_cnt: 0, //有多少帧,总图片数，初始都为0，需要加载完后重新定义
                frame_rate: 4, //渲染速率，每4帧渲染一次
                offset_y: offsets[i], //竖直方向的偏移量
                loaded: false,//有没有被加载进页面
                scale: 2.5, //缩放倍率
            });

            //这些都是GIF类的API
            gif.onload = () => {
                let obj = this.animations.get(i);
                obj.frame_cnt = gif.frames.length; // 将gif里的所有帧数提取出来，即将gif中每帧的图片都提取出来
                obj.loaded = true; //已加载进页面
            }

        }
    }


}