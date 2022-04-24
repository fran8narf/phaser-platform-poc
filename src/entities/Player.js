import Phaser from 'phaser';
import initAnimations from './anims/playerAnims';

import collidable from '../mixins/collidable';
import HealthBar from '../hud/HealthBar';
import Projectile from '../attacks/Projectile';
import Projectiles from '../attacks/Projectiles';
import anims from '../mixins/anims';

class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'player');

        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.init();
        this.initEvents();

        // we copy all the collidable methods from the mixin to the player through 'this' context
        Object.assign(this, collidable);
        Object.assign(this, anims);
    }
    
    init() {
        this.gravity = 700;
        this.playerSpeed = 160;
        this.cursors = this.scene.input.keyboard.createCursorKeys();

        this.jumpCount = 0;
        this.consecutiveJumps = 1;
        this.hasBeenHit = false;
        this.bounceVelocity = 350;
        this.lastDirection = Phaser.Physics.Arcade.FACING_RIGHT;

        this.body.setGravityY(this.gravity);
        this.setSize(this.width-6, this.height -1);
        this.setOffset(6, 1);
        this.setCollideWorldBounds(true);

        initAnimations(this.scene.anims);

        this.healthBar = new HealthBar(
            this.scene,
            this.scene.config.leftTopCorner.x + 10,
            this.scene.config.leftTopCorner.y + 10,
            100,
            8,
            100,
            100
        );
        
        this.projectiles = new Projectiles(this.scene);
        this.scene.input.keyboard.on('keydown-Q', () => {
            this.play('cast', true);
            this.projectiles.fireProjectile(this);
        });
    }

    initEvents() {
        // accedemos a los eventos de la scene para que escucha al evento 'quequeramos'
        this.scene.events.on(Phaser.Scenes.Events.UPDATE, this.update, this);
    }

    update () {
        if (this.hasBeenHit) { return; }
        const { left, right, up, space, down } = this.cursors;
        const onFloor = this.body.onFloor();
        const isSpaceJustDown = Phaser.Input.Keyboard.JustDown(space);
        const isUpJustDown = Phaser.Input.Keyboard.JustDown(up);
        
        if (left.isDown) {
            this.lastDirection = Phaser.Physics.Arcade.FACING_LEFT;
            this.setVelocityX(-this.playerSpeed);
            this.setFlipX(true);
        } else if (right.isDown) {
            this.lastDirection = Phaser.Physics.Arcade.FACING_RIGHT;
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

        /* if (this.isPlayingAnims('cast')) {
            return;
        } */

        onFloor ? 
            this.body.velocity.x !== 0 ?
                this.play('run-right', true) : this.play('idle', true) :
            this.play('jump', true);

        if (this.healthBar.health === 0) {
            console.log('YOU DIED-GAMEOVER');
            this.scene.scene.start('PlayScene');
        }

    }

    takesHit(enemy) {
        if (this.hasBeenHit) { return; }
        this.hasBeenHit = true;
        this.bounceOff();

        //alternative to scene.time.addEvent
        this.scene.time.delayedCall(250, () => {
            this.hasBeenHit = false;
        });

        this.healthBar.updateHealthBar(this.healthBar.health -= enemy.dmg);
    }
    // add tween to the player

    bounceOff() {
        this.body.touching.right ? 
            this.setVelocityX(-this.bounceVelocity) :
            this.setVelocityX(this.bounceVelocity);

        setTimeout(() => { this.setVelocityY(-this.bounceVelocity), 0 });
    }

    playDamageTween() {
        const tween = this.scene.tweens.add({
            targets: this.body,
            duration : 250,
            ease: 'Linear',
            repeat: -1,
            yoyo : true
        });

        tween.play();
    }
}

export default Player;