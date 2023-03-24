export default class Controller {
    constructor($canvas) {
        this.$canvas = $canvas;

        this.pressed_keys = new Set(); //手动实现当前摁住了哪个键
        this.start();
    }

    start() {
        this.$canvas.keydown(e => {
            this.pressed_keys.add(e.key);
            // console.log(e.key);
            //console.log(event.code);
            // console.log(e.code, e.altKey);
        });

        this.$canvas.keyup(e => {
            this.pressed_keys.delete(e.key);
            //console.log(e.key);
        });

    }
}