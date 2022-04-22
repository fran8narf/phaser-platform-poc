import Phaser from "phaser";
class Projectile extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, key) {
        super(scene, x, y, key);

        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.speed = 300;
        this.maxDistance = 600;
        this.travelledDistance = 0;
        this.cooldown = 500;
    }

    fire(x, y) {
        this.setActive(true);
        this.setVisible(true);
        this.body.reset(x, y);
        this.setVelocityX(this.speed);
    }

    preUpdate(time, delta) {
        super.preUpdate(time, delta);

        this.travelledDistance += this.body.deltaAbsX() ;

        if (this.isOutOfRange()) {

            this.body.reset(0, 0);
            this.setActive(false);
            this.setVisible(false);

            this.travelledDistance = 0;
        }
    }

    isOutOfRange() {
        return this.travelledDistance &&
            this.travelledDistance >= this.maxDistance;
    }
}
export default Projectile;