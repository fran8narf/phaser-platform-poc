import Phaser from "phaser";

class Preload extends Phaser.Scene {
    constructor() {
        super('PreloadScene');
    }
    preload() {
        this.load.tilemapTiledJSON('map', 'src/assests/crystal_world_map.json');
        this.load.image('tiles-1', 'src/assests/main_lev_build_1.png');
        this.load.image('tiles-2', 'src/assests/main_lev_build_2.png');
    }

    create() {
        this.scene.start('PlayScene');
    }
}

export default Preload;