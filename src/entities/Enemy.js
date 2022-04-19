import Phaser from 'phaser';
import collidable from '../mixins/collidable';

class Enemy extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, key) {
        super(scene, x, y, key);

        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.init();

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
    }

    update () {
    }
}

export default Enemy;