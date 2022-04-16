import Phaser from "phaser";
import Player from '../entities/Player';

class Play extends Phaser.Scene {
    constructor() {
        super('PlayScene');
        this.playerSpeed = 160;
    }

    create() {
        const map = this.createMap();
        const layers = this.createLayers(map);

        this.player = this.createPlayer();
        this.physics.add.collider(this.player, layers.platformColliders);

        this.cursors = this.input.keyboard.createCursorKeys();
        console.log(this.cursors);
    }
    
    createMap() {
        const map = this.make.tilemap({ key: 'map-1' });
        map.addTilesetImage('tileset1', 'tileset1');
        map.addTilesetImage('tileset2', 'tileset2');
        console.log('map createD?', map);

        return map;
    }
    
    createLayers(map) {
        const getTiledSet1 = map.getTileset('tileset1');
        const getTiledSet2 = map.getTileset('tileset2');

        const platformColliders = map.createStaticLayer('platform-colliders', [getTiledSet1, getTiledSet2]);
        const environment = map.createStaticLayer('environment', [getTiledSet1, getTiledSet2]);
        const platforms = map.createStaticLayer('platforms', [getTiledSet1, getTiledSet2]);

        platformColliders.setCollisionByProperty({collides: true});
        // platformColliders.setCollisionByExclusion( -1, true );
        return { environment, platforms, platformColliders };
    }

    createPlayer() {
        const player = this.physics.add.sprite(50, 400, 'player');
        // const player = new Player(50, 400, 'player');
        player.body.setGravityY(300);
        player.setCollideWorldBounds(true);

        return player;
    }

    update () {
        const { left, right } = this.cursors;
        
        if (left.isDown) {
            this.player.setVelocityX(-this.playerSpeed);
        } else if (right.isDown) {
            this.player.setVelocityX(this.playerSpeed);
        } else {

        }
    }
}

export default Play;