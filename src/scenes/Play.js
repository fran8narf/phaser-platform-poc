import Phaser from "phaser";

class Play extends Phaser.Scene {
    constructor() {
        super('PlayScene');
        this.map = null;
    }

    create() {
        this.createMap();
        const layers = this.createLayers();
        const player = this.createPlayer();

        this.physics.add.collider(player, layers.platformColliders);
    }
    
    createMap() {
        this.map = this.make.tilemap({ key: 'map-1' });
        console.log(this.map);
    }
    
    createLayers() {
        const tileset1 = this.map.addTilesetImage('tileset1', 'tileset1');
        const tileset2 = this.map.addTilesetImage('tileset2', 'tileset2');
    
        const platformColliders = this.map.createStaticLayer('platform-colliders', [tileset1, tileset2]);
        const environment = this.map.createStaticLayer('environment', [tileset1, tileset2]);
        const platforms = this.map.createStaticLayer('platforms', [tileset1, tileset2]);

        platformColliders.setCollisionByProperty({collides: true});

        return { environment, platforms, platformColliders };
    }

    createPlayer() {
        const player = this.physics.add.sprite(50, 400, 'player');
            player.setCollideWorldBounds(true);
            player.body.setGravityY(300);

        return player;
    }
}

export default Play;