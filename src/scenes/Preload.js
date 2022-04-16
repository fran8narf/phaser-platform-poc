import Phaser from "phaser";

class Preload extends Phaser.Scene {
    constructor() {
        super('PreloadScene');
    }
    preload() {
        this.load.tilemapTiledJSON('map-1', 'assets/map-1.json');
        this.load.image('tileset1', 'assets/tileset1.png');
        this.load.image('tileset2', 'assets/tileset2.png');

        // this.load.image('player', 'assets/player/movements/idle01.png');
        this.load.spritesheet('player', 'assets/player/move_sprite_1.png', {
            frameWidth: 64,
            frameHeight: 38
        });
    }

    create() {
        console.log('create de preaload');
        this.scene.start('PlayScene');
    }
}

export default Preload;