import Phaser from "phaser";

export default {
    addCollider(gameObject, callback) {
        this.scene.physics.add.collider(this, gameObject, callback,  null, this);

        return this;
    },
    bodyPositionDiffX : 0,
    prevRay : null,
    prevHasHit : null,
    raycast(body, layer, {rayLength = 30, precission = 0, steepness = 1}) {
        const { x, y , width, halfHeight } = body;
        const  line = new Phaser.Geom.Line();
        let hasHit = false;
        this.bodyPositionDiffX += body.x - body.prev.x

        if ((Math.abs(this.bodyPositionDiffX) <= precission) && this.prevHasHit !== null) {
            return {
                ray : this.prevRay,
                hasHit : this.prevHasHit
            }
        }

        switch(body.facing) {
            case Phaser.Physics.Arcade.FACING_RIGHT: {
                line.x1 = x + width;
                line.y1 = y + halfHeight;
                line.x2 = line.x1 + rayLength * steepness;
                line.y2 = line.y1 + rayLength;
                break;
            }
            case Phaser.Physics.Arcade.FACING_LEFT: {
                line.x1 = x;
                line.y1 = y + halfHeight;
                line.x2 = line.x1 - rayLength * steepness;
                line.y2 = line.y1 + rayLength;
                break;
            }
        }

        const hits = layer.getTilesWithinShape(line);
        if (hits.length > 0) {
            // some will return true if at least 
            // one element satisfies the condition hit.indez !== -1
            hasHit = this.prevHasHit = hits.some(hit => hit.index !== -1);
        }
        this.prevRay = line;
        this.bodyPositionDiffX = 0;
        return { ray: line, hasHit };
    }
}