namespace ShadowySuperCoder {
    /**
     * // TODO: comment Player
     * Gets script version
     * @param fileName
     * @returns script version
     */
    export class Player extends Phaser.Sprite {
        private _spriterGroup:Spriter.SpriterGroup;
        public constructor(game: Phaser.Game) {
            super(game,0,0,"Player");
            // center player
            this.anchor.x = 0.5;
            // enable physics
            game.physics.arcade.enable(this,false);
            // allow gravity
            let body = <Phaser.Physics.Arcade.Body>this.body;
            body.allowGravity = true;
            // set body size according to values in Generator.Parameters
            let bodyW = Generator.Parameters.PLAYER_BODY_WIDTH;
            let bodyH = Generator.Parameters.PLAYER_BODY_HEIGHT;
            let bodyOffsetX = -bodyW / 2 + this.width * this.anchor.x;
            let bodyOffsetY = 0;
            // set body size and offset
            body.setSize(bodyW, bodyH, bodyOffsetX, bodyOffsetY);
        }
    }
}