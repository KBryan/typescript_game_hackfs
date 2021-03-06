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
            // create Spriter loader - class that can change Spriter file into internal structure
          /*  let spriterLoader = new Spriter.Loader();

            // create Spriter file object - it wraps XML/JSON loaded with Phaser Loader
            let spriterFile = new Spriter.SpriterXml(game.cache.getXML("PlayerAnim"));

            // proces Spriter file (XML/JSON) with Spriter loader - outputs Spriter animation which you can instantiate multiple times with SpriterGroup
            let spriterData = spriterLoader.load(spriterFile);

            // create actual renderable object - it is extension of Phaser.Group
            this._spriterGroup = new Spriter.SpriterGroup(this.game, spriterData, "Sprites", "Goblin", "fall", 120);

            // set position size
            this._spriterGroup.position.set(-5, 60);

            // adds SpriterGroup to Phaser.World to appear on screen
            this.addChild(this._spriterGroup);*/
        }

        // -------------------------------------------------------------------------
        public animateJump(): void {
            this._spriterGroup.playAnimationByName("jump");
        }

        // -------------------------------------------------------------------------
        public animateDeath(): void {
            let body = <Phaser.Physics.Arcade.Body>this.body;
            body.enable = false;

            this._spriterGroup.playAnimationByName("fall_water");
        }

        // -------------------------------------------------------------------------
        public animateHit(): void {
            this._spriterGroup.playAnimationByName("hit");
        }

        // -------------------------------------------------------------------------
        public updateAnim(standing: boolean, velY: number, gameOver: boolean): void {

            if (!gameOver) {
                if (standing) {
                    if (this._spriterGroup.currentAnimationName !== "run") {
                        this._spriterGroup.playAnimationByName("run");
                    }
                } else if (velY > 0) {
                    if (this._spriterGroup.currentAnimationName !== "fall") {
                        this._spriterGroup.playAnimationByName("fall");
                    }
                }
            }

            this._spriterGroup.updateAnimation();
        }
    }
}
