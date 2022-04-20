import Phaser from 'phaser';
import initAnimations from './anims/playerAnims';

import collidable from '../mixins/collidable';

class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'player');

        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.init();
        this.initEvents();

        // we copy all the collidable methods from the mixin to the player through 'this' context
        Object.assign(this, collidable);
    }
    
    init() {
        this.gravity = 700;
        this.playerSpeed = 160;
        this.cursors = this.scene.input.keyboard.createCursorKeys();

        this.jumpCount = 0;
        this.consecutiveJumps = 1;

        this.body.setGravityY(this.gravity);
        this.setSize(this.width-6, this.height -1);
        this.setOffset(6, 1);
        this.setCollideWorldBounds(true);

        initAnimations(this.scene.anims);
    }

    initEvents() {
        // accedemos a los eventos de la scene para que escucha al evento 'quequeramos'
        this.scene.events.on(Phaser.Scenes.Events.UPDATE, this.update, this);
    }

    update () {
        const { left, right, up, space, down } = this.cursors;
        const onFloor = this.body.onFloor();
        const isSpaceJustDown = Phaser.Input.Keyboard.JustDown(space);
        const isUpJustDown = Phaser.Input.Keyboard.JustDown(up);
        
        if (left.isDown) {
            this.setVelocityX(-this.playerSpeed);
            this.setFlipX(true);
        } else if (right.isDown) {
            this.play('run-right', true);
            this.setVelocityX(this.playerSpeed);
            this.setFlipX(false);
        } else {
            this.setVelocityX(0);
        }
        
        if ((isUpJustDown || isSpaceJustDown) && (onFloor || this.jumpCount < this.consecutiveJumps)) {
            this.setVelocityY(-this.playerSpeed-200);
            this.jumpCount++;
        } 

        if(onFloor) {
            this.jumpCount = 0;
        }
        // don't play again if the animation is still playing
        // ignoreIfPlaying === true
        // this.play('idle', true);

        onFloor ? 
            this.body.velocity.x !== 0 ?
                this.play('run-right', true) : this.play('idle', true) :
            this.play('jump', true);

    }

    takesHit(enemy) {
        console.log('takes hit');
        console.log(enemy);
    }
}

export default Player;