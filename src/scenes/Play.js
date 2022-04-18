import Phaser from "phaser";
import Player from '../entities/Player';

class Play extends Phaser.Scene {
    constructor(config) {
        super('PlayScene');
        this.config = config;
    }

    create() {
        const map = this.createMap();
        const layers = this.createLayers(map);

        const player = this.createPlayer();

        this.createPlayerColliders(player,
            {
                colliders: {
                    platformColliders: layers.platformColliders
            }
        });

        this.setUpFollowupCameraOn(player);
    }
    
    createMap() {
        const map = this.make.tilemap({ key: 'map-1' });
        map.addTilesetImage('tileset1', 'tileset1');
        map.addTilesetImage('tileset2', 'tileset2');

        return map;
    }
    
    createLayers(map) {
        const getTiledSet1 = map.getTileset('tileset1');
        const getTiledSet2 = map.getTileset('tileset2');

        const platformColliders = map.createStaticLayer('platform-colliders', [getTiledSet1, getTiledSet2]);
        const environment = map.createStaticLayer('environment', [getTiledSet1, getTiledSet2]);
        const platforms = map.createStaticLayer('platforms', [getTiledSet1, getTiledSet2]);

        const playerZones = map.getObjectLayer('player-zones');
        console.log(playerZones);

        platformColliders.setCollisionByProperty({collides: true});
        // platformColliders.setCollisionByExclusion( -1, true );
        return { environment, platforms, platformColliders };
    }

    createPlayer() {
        // old
        // const player = this.physics.add.sprite(50, 400, 'player');
        return new Player(this, 50, 510, 'player');
    }

    createPlayerColliders(player, { colliders }) {
        player.addCollider(colliders.platformColliders);
    }

    setUpFollowupCameraOn(player) {
        const { width, height, mapOffset } = this.config;
        this.physics.world.setBounds(0, 0, width + mapOffset, height + 100);
        this.cameras.main.startFollow(player);
        this.cameras.main.setBounds(0, 0, width + mapOffset, height).setZoom(1.5);
    }
}

export default Play;