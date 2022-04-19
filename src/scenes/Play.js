import Phaser from "phaser";
import Player from '../entities/Player';

import { getEnemyType } from '../types';

class Play extends Phaser.Scene {
    constructor(config) {
        super('PlayScene');
        this.config = config;
    }

    create() {
        const map = this.createMap();
        const layers = this.createLayers(map);
        const playerZones = this.getPlayerZones(layers.playerZones);

        //setting up player
        const player = this.createPlayer(playerZones.start);
        this.createPlayerColliders(player,
            {
                colliders: {
                    platformColliders: layers.platformColliders
            }
        });

        //setting up enemies
        const enemies = this.createEnemies(layers.enemySpawnPoints);
        this.createEnemyColliders(enemies,
            {
                colliders: {
                    platformColliders: layers.platformColliders,
                player
            }
        });

        this.createEndOfLevel(playerZones.finish, player);

        this.setUpFollowupCameraOn(player);
    }
    
    createMap() {
        const map = this.make.tilemap({ key: 'map-1' });
        map.addTilesetImage('tileset1', 'tileset1');
        map.addTilesetImage('tileset2', 'tileset2');

        return map;
    }
    
    //adding all the layers to the scene
    createLayers(map) {
        const getTiledSet1 = map.getTileset('tileset1');
        const getTiledSet2 = map.getTileset('tileset2');

        const platformColliders = map.createStaticLayer('platform-colliders', [getTiledSet1, getTiledSet2]);
        const environment = map.createStaticLayer('environment', [getTiledSet1, getTiledSet2]);
        const platforms = map.createStaticLayer('platforms', [getTiledSet1, getTiledSet2]);

        const playerZones = map.getObjectLayer('player-zones');
        const enemySpawnPoints = map.getObjectLayer('enemy-spawn-points');
        console.log('enemySpawnPoints', enemySpawnPoints);

        platformColliders.setCollisionByProperty({collides: true});
        // platformColliders.setCollisionByExclusion( -1, true );
        return { environment, platforms, platformColliders, playerZones, enemySpawnPoints };
    }

    createPlayer(start) {
        // old
        // const player = this.physics.add.sprite(50, 400, 'player');
        return new Player(this, start.x, start.y, 'player');
    }

    createEnemies(spawnLayer) {
        const enemyTypes = getEnemyType();
        return spawnLayer.objects.map(enemy => {
            return new enemyTypes[enemy.type](this, enemy.x, enemy.y, 'birdman');
        }); 
    }
    createEnemyColliders(enemies, { colliders }) {
        enemies.forEach(enemy => {
            enemy.addCollider(colliders.platformColliders);
            console.log(colliders.player);
            enemy.addCollider(colliders.player);
        });
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

    getPlayerZones(playerZones) {
        const zonesObject = playerZones.objects;
        return {
            start : zonesObject.find(zone => zone.name === 'startZone'),
            finish : zonesObject.find(zone => zone.name === 'finishZone'),
        }
    }

    createEndOfLevel(finishZone, player) {
        const endOfLevel = this.physics.add.sprite(finishZone.x, finishZone.y, 'finish')
            .setAlpha(0)
            .setSize(5, this.config.height)
            .setOrigin(0.5, 1);

        const endOfLevelOverlap = this.physics.add.overlap(player, endOfLevel, () => {
            endOfLevelOverlap.active = false;
            console.log('you have passed the level!!');
        });
    }
}

export default Play;