import Phaser from "phaser";

class Play extends Phaser.Scene {
    constructor() {
        super('PlayScene');
    }

    create() {
        const map = this.make.tilemap({ key: 'map-1' });

        console.log('map', map);

        const tileset1 = map.addTilesetImage('tileset1', 'tileset1');
        const tileset2 = map.addTilesetImage('tileset2', 'tileset2');

        map.createStaticLayer('platforms', [tileset1, tileset2]);
        map.createStaticLayer('environment', [tileset1, tileset2]);
    }
}

export default Play;