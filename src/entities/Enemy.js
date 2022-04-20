import Phaser from 'phaser';
import collidable from '../mixins/collidable';

class Enemy extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, key) {
        super(scene, x, y, key);

        this.config = scene.config;

        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.init();
        this.initEvents();

        // we copy all the collidable methods from the mixin to the player through 'this' context
        Object.assign(this, collidable);
    }
    
    init() {
        this.gravity = 700;
        this.speed = 95;

        this.timeFromLastTurn = 0;
        this.maxPatrolDistance = 400;
        this.currentPatrolDistance = 0;

        this.rayGraphics = this.scene.add.graphics({
            lineStyle : {
                width : 2,
                color : 0xaa00aa
            }
        });

        this.platformCollidersLayer = null;

        this.body.setGravityY(this.gravity);
        this.setSize(this.width-5, this.height-20);
        this.setOffset(5, 20);
        this.setCollideWorldBounds(true);
        this.setImmovable(true);
        this.setOrigin(.5, 1);
        this.setVelocityX(this.speed);
    }

    initEvents() {
        // accedemos a los eventos de la scene para que escucha al evento 'quequeramos'
        this.scene.events.on(Phaser.Scenes.Events.UPDATE, this.update, this);
    }

    update (time, delta) {

        this.patrol(time, delta);
    }

    patrol(time, delta) {
        if (!this.body || !this.body.onFloor()) { return; }
        this.currentPatrolDistance += Math.abs(this.body.deltaX());
        const { ray, hasHit  } = this.raycast(this.body, this.platformCollidersLayer,
            {rayLength: 30, precission: 1, steepness: 1}
        );

        if ((!hasHit  || this.currentPatrolDistance >= this.maxPatrolDistance) &&
            this.timeFromLastTurn + 500 < time) {
            this.setFlipX(!this.flipX);
            this.setVelocityX(this.speed = -this.speed); 
            this.timeFromLastTurn = time;
        }
        
        if (this.config.debug) {
            this.rayGraphics.clear();
            this.rayGraphics.strokeLineShape(ray);
        }
    }

    setPlatformColliders(platformCollidersLayer) {
        this.platformCollidersLayer = platformCollidersLayer;
    }
}

export default Enemy;