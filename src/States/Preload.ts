namespace ShadowySuperCoder {
    export class Preload extends Phaser.State {
        // music decode / ready for game
        private _ready:boolean = false;
        // Preload
        public preload() {
            this.load.image("Block","assets/Block.png");
            this.load.image("Player","assets/Player.png");
            this.load.atlas("Sprites","assets/Sprites.png","assets/Sprite.json");
            // spriter anim
            this.load.xml("ShadowAnim","assets/Goblin.xml");
        }
        public create() {

        }
        public update() {
            // run only once
            if(this._ready === false) {
                this._ready = true;
                this.game.state.start("Play");
            }
        }
    }
}