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

        this.jumpCount = 0;
        this.consecutiveJumps = 1;

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
        const { left, right, up, space, down } = this.cursors;
        const onFloor = this.body.onFloor();
        
        if (left.isDown) {
            this.setVelocityX(-this.playerSpeed);
            this.setFlipX(true);
        } else if (right.isDown) {
            this.play('run-right', true);
            this.setVelocityX(this.playerSpeed);
            this.setFlipX(false);
        } else if ((up.isDown || space.isDown) && onFloor) {
            this.setVelocityY(-this.playerSpeed-200);
            this.setGravityY(this.gravity);
        } else {
            this.setVelocityX(0);
        }
        // don't play again if the animation is still playing
        // ignoreIfPlaying === true
        // this.play('idle', true);

        this.body.velocity.x !== 0 ?
            this.play('run-right', true) :
            this.play('idle', true);
    }

    
}

export default Player;