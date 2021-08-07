namespace ShadowySuperCoder {
    export class Preload extends Phaser.State {
        // music decode / ready for game
        private _ready:boolean = false;
        // Preload
        public preload() {
            this.load.image("Block","assets/Block.png");
            this.load.image("Player","assets/Player.png");
            this.load.atlas("Sprites","assets/Sprite.png","atlas/Sprite.json");
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