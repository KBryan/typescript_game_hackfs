namespace ShadowySuperCoder {
    export class Preload extends Phaser.State {
        // music decode / ready for game
        private _ready:boolean = false;
        // Preload
        public preload() {

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