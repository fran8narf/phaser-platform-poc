import Phaser from "phaser";

class HealthBar {
    constructor(scene, x, y, width, height, health, maxHealth) {
        this.scene = scene;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.health = health;
        this.maxHealth = maxHealth;
        this.createHealthBar();
    }

    createHealthBar() {
        this.healthBar = this.scene.add.graphics();
        this.healthBar.setScrollFactor(0, 0)
        this.healthBar.fillStyle(0xffffff, 1);
        this.healthBar.fillRect(this.x, this.y, this.width, this.height);
        this.healthBar.fillStyle(0x00ff00, 1);
        this.healthBar.fillRect(this.x, this.y, this.width * (this.health / this.maxHealth), this.height);
    }

    updateHealthBar(health) {
        this.healthBar.clear();
        this.healthBar.fillStyle(0xFD3636, 1);
        this.healthBar.fillRect(this.x, this.y, this.width, this.height);
        this.healthBar.fillStyle(0x00ff00, 1);
        this.healthBar.fillRect(this.x, this.y, this.width * (health / this.maxHealth), this.height);
    }

    /* constructor(scene, x, y ,health) {
        this.bar = new Phaser.GameObjects.Graphics(scene);

        this.x = x;
        this.y = y;
        this.value = health;

        this.size = {
            width: 100,
            height: 5
        };

        this.pixelPerHealth = this.size.width / this.value;

        scene.add.existing(this.bar);
        this.draw(this.x, this.y);
    }

    draw(x, y) {
        this.bar.clear();
        const { width, height } = this.size;

        this.bar.fillStyle(0x00FF00);
        this.bar.fillRect(x, y, width, height);
    } */
}

export default HealthBar;