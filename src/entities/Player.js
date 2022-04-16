import Phaser from 'phaser';
import initAnimations from './playerAnims';

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
        initAnimations(this.scene.anims);
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
            this.play('run-right', true);
            this.setVelocityX(this.playerSpeed);
        } else if (up.isDown) {
            this.setVelocityY(-this.playerSpeed);
            this.setGravityY(this.gravity);
        } else {
            this.setVelocityX(0);
        }
        // don't play again if the animation is still playing
        // ignoreIfPlaying === true
    }

    
}

export default Player;