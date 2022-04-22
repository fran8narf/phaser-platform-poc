import Phaser from "phaser";
import Projectile from "./Projectile";
import { getTimestamp } from "../utils/functions";

class Projectiles extends Phaser.Physics.Arcade.Group {
    constructor(scene) {
        super(scene.physics.world, scene);
        this.createMultiple({
            frameQuantity: 5,
            active: false,
            visible: false,
            key: 'iceball',
            classType: Projectile
        });

        this.timeFromLastFire = null;
    }

    fireProjectile(initiator) {
        const projectile = this.getFirstDead(false);
        const center = initiator.getCenter();

        if (!projectile) { return; }

        if (this.timeFromLastFire && this.timeFromLastFire + projectile.cooldown > getTimestamp()) { 
            console.log('tienes cd');
            return; 
        }

        if (initiator.lastDirection === Phaser.Physics.Arcade.FACING_RIGHT) {
            projectile.speed = Math.abs(projectile.speed);
            projectile.setFlipX(false);
        } else {
            projectile.speed = -Math.abs(projectile.speed);
            projectile.setFlipX(true);
        }
        projectile.fire(center.x + 20, center.y);

        this.timeFromLastFire = getTimestamp();
    }
}

export default Projectiles;