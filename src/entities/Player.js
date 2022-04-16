import Phaser from 'phaser';

class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'player');

        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.init();
        this.initEvents();
    }
    
    init() {
        this.gravity = 700;
        this.playerSpeed = 160;
        this.cursors = this.scene.input.keyboard.createCursorKeys();

        this.body.setGravityY(this.gravity);
        this.setCollideWorldBounds(true);
        console.log(this.cursors);
    }

    initEvents() {
        // accedemos a los eventos de la scene para que escucha al evento 'quequeramos'
        this.scene.events.on(Phaser.Scenes.Events.UPDATE, this.update, this);
    }

    //main purpose is for update sprite animations
    /* update(time, delta) {
        super.preUpdate(time, delta)
        const { left, right, up, down } = this.cursors;
        
        if (left.isDown) {
            this.setVelocityX(-this.playerSpeed);
        } else if (right.isDown) {
            this.setVelocityX(this.playerSpeed);
        } else if (up.isDown) {
            this.setVelocityY(-this.playerSpeed);
            this.setGravityY(200);
        } else {
            this.setVelocityX(0);
        }
    } */

    update () {
        const { left, right, up, down } = this.cursors;
        
        if (left.isDown) {
            this.setVelocityX(-this.playerSpeed);
        } else if (right.isDown) {
            this.setVelocityX(this.playerSpeed);
        } else if (up.isDown) {
            this.setVelocityY(-this.playerSpeed);
            this.setGravityY(this.gravity);
        } else {
            this.setVelocityX(0);
        }
    }
}

export default Player;