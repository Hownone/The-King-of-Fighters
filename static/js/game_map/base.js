import AcGameObject from "../ac_game_object.js";
import Controller from "../controller/base.js";


export default class GameMap extends AcGameObject {
    constructor(root) {
        super();
        this.root = root; //方便索引地图上的整个元素
        this.$canvas = $(`<canvas id="tutorial" width="1440" height="720" tabindex=0></canvas>`);
        this.ctx = this.$canvas[0].getContext('2d'); //获取canvas
        this.root.$kof.append(this.$canvas); //将canvas加入到$kof中
        this.$canvas.focus(); //为了能让canvas获取输入，要让canvas聚焦

        this.controller = new Controller(this.$canvas);

        this.time_left = 60000; //单位毫秒


    }

    start() {


    }

    update() {
        this.time_left -= this.timeDelta;
        if (this.time_left < 0) {
            this.time_left = 0;
            let [a, b] = this.root.players;
            if (a.status !== 6 && b.status !== 6) {
                a.status = b.status = 6;
                a.frame_current_cnt = b.frame_current_cnt = 0;
                a.vx = b.vx = 0;
            }
        }

        this.root.$timer.text(parseInt(this.time_left / 1000)); //转化为秒

        this.render();
    }

    render() {
        //console.log(`game_map: ${this.ctx.canvas.width} `);
        this.ctx.clearRect(0, 0, this.$canvas.width(), this.$canvas.height()); //与下面是等价的
        //this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height); //要清空canvas里的矩形，不然的话角色就不会运动了
        //this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    }

    // test() {
    //     console.log("yes kyo extends game_map's function!");
    // }

}

//测试我import了该类后，即使不调用他的一些内容，也会自己运行
console.log("I auto run in game map")
