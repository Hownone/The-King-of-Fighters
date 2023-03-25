import GameMap from './game_map/base.js';
import Kyo from './player/kyo.js';

class KOF {
    constructor(id) {
        this.$kof = $('#' + id);
        this.game_map = new GameMap(this);
        this.$head = $(`<div class="kof-head">
                       <div class="kof-head-hp-0"><div><div></div></div></div>
                       <div class="kof-head-timer">60</div>
                       <div class="kof-head-hp-1"><div><div></div></div></div>
                    </div>`);
        this.$kof.append(this.$head);
        this.$timer = this.$kof.find(`.kof-head-timer`);
        this.players = [
            new Kyo(this, {
                id: 0,
                x: 290,
                y: 0,
                width: 150,
                height: 250,
                color: 'blue',
            }),
            new Kyo(this, {
                id: 1,
                x: 1010,
                y: 0,
                width: 150,
                height: 250,
                color: 'orange',
            }),
        ];

        // this.test = new Player(this, {});

    }
}

export default KOF;

console.log("KOB TEST");



