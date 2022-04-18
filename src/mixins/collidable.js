
export default {
    addCollider(gameObject, callback) {
        this.scene.physics.add.collider(this, gameObject, callback,  null, this);
    }
}