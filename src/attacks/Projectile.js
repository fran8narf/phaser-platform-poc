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

        this.dmg = 10;
    }

    fire(x, y) {
        this.activateProjectile(true);
        this.body.reset(x, y);
        this.setVelocityX(this.speed);
    }

    preUpdate(time, delta) {
        super.preUpdate(time, delta);

        this.travelledDistance += this.body.deltaAbsX() ;

        if (this.isOutOfRange()) {

            this.body.reset(0, 0);
            this.activateProjectile(false);

            this.travelledDistance = 0;
        }
    }

    isOutOfRange() {
        return this.travelledDistance &&
            this.travelledDistance >= this.maxDistance;
    }

    deliversHit(target) {
        this.activateProjectile(false);
        this.travelledDistance = 0;
        this.body.reset(0, 0);
    }

    activateProjectile(isActive) {
        this.setActive(isActive);
        this.setVisible(isActive);
    }
}
export default Projectile;