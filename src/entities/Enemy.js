import Phaser from 'phaser';
import collidable from '../mixins/collidable';

class Enemy extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, key) {
        super(scene, x, y, key);

        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.init();
        this.initEvents();

        // we copy all the collidable methods from the mixin to the player through 'this' context
        Object.assign(this, collidable);
    }
    
    init() {
        this.gravity = 700;
        this.speed = 160;

        this.body.setGravityY(this.gravity);
        this.setSize(this.width-5, this.height-20);
        this.setOffset(5, 20);
        this.setCollideWorldBounds(true);
        this.setImmovable(true);
        this.setOrigin(.5, 1);
    }

    initEvents() {
        // accedemos a los eventos de la scene para que escucha al evento 'quequeramos'
        this.scene.events.on(Phaser.Scenes.Events.UPDATE, this.update, this);
    }

    update (time, delta) {
    }
}

export default Enemy;