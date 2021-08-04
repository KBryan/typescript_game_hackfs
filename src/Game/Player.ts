namespace ShadowySuperCoder {
    /**
     * // TODO: comment Player
     * Gets script version
     * @param fileName
     * @returns script version
     */
    export class Player extends Phaser.Sprite {
        public constructor(game: Phaser.Game) {
            super(game,0,0,"Player");
            // center player
            this.anchor.x = 0.5;
            // enable physics
            game.physics.arcade.enable(this,false);
            // allow gravity
            let body = <Phaser.Physics.Arcade.Body>this.body;
            body.allowGravity = true;
        }
    }
}