import GameMap from './game_map/base.js';
import Kyo from './player/kyo.js';
import Player from './player/base.js';
import Controller from './controller/base.js';

class KOF {
    constructor(id) {
        this.$kof = $('#' + id);
        this.game_map = new GameMap(this);

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



