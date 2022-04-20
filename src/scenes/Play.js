import Phaser from "phaser";
import Player from '../entities/Player';
import Enemies from "../groups/Enemies";

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

        this.graphics = this.add.graphics();

        this.line = new Phaser.Geom.Line();
        this.graphics.lineStyle(1, 0x00ff00);
        this.plotting = false;

        this.input.on('pointerdown', this.startDrawing, this);
        this.input.on('pointerup', (pointer) => {
            this.stopDrawing(pointer, layers.platforms)
        }, this);
    }

    update() {
        if (this.plotting) {
            const pointer = this.input.activePointer;
            this.line.x2 = pointer.worldX;
            this.line.y2 = pointer.worldY;
            
            this.graphics.clear();
            //clear was removing lineStyle
            this.graphics.lineStyle(1, 0x00ff00);
            this.graphics.strokeLineShape(this.line);
        }
    }

    startDrawing(pointer) {
        this.line.x1 = pointer.worldX;;
        this.line.y1 = pointer.worldY;
        this.plotting = true;
    }
    stopDrawing(pointer, layer) {
        this.line.x2 = pointer.worldX;;
        this.line.y2 = pointer.worldY;

        this.tileHits = layer.getTilesWithinShape(this.line);

        // we check if the platforms are hit by the line
        if (this.tileHits.length > 0) {
            this.tileHits.forEach(tile => {
                tile.index !== -1 ? console.log('platform hit') : '';
            });
        }
        this.plotting = false;
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
        const enemies = new Enemies(this);
        const enemyTypes = enemies.getTypes();

        spawnLayer.objects.forEach(spawnPoint => {
            const enemy = new enemyTypes[spawnPoint.type](this, spawnPoint.x, spawnPoint.y, 'birdman');
            enemies.add(enemy);
        });

        return enemies;
    }
    createEnemyColliders(enemies, { colliders }) {
        enemies
            .addCollider(colliders.platformColliders)
            .addCollider(colliders.player);
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