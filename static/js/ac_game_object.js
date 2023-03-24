let AC_GAME_OBJECTS = [];
export default class AcGameObject {
    constructor() {
        AC_GAME_OBJECTS.push(this);

        this.timeDelta = 0; // 存储时间间隔
        this.has_call_start = false; // 是否已经执行过start()函数

    }

    start() { //初始执行一次
        //console.log(AC_GAME_OBJECTS);
        //console.log(22);
        // console.log(obj);

    }

    update() { //每一帧执行一次（除了第一帧）
    }

    destroy() { // 删除当前对象
        for (let i in AC_GAME_OBJECTS) {
            AC_GAME_OBJECTS.splice(i, 1);
        }
    }
}


let last_timestamp;

let AC_GAME_OBJECTS_FRAME = timestamp => {
    for (let obj of AC_GAME_OBJECTS) {
        // console.log(obj);
        if (!obj.has_call_start) {
            obj.start();
            obj.has_call_start = true;
        } else {
            obj.timeDelta = timestamp - last_timestamp;
            obj.update();
        }
    }
    last_timestamp = timestamp;
    requestAnimationFrame(AC_GAME_OBJECTS_FRAME);
}

requestAnimationFrame(AC_GAME_OBJECTS_FRAME);
console.log("again!");



