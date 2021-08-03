namespace ShadowySuperCoder {

    export class Play extends Phaser.State {
        private _mainLayer:MainLayer;
        // render to the screen
        public render() {
            this._mainLayer.render();
        }
        public create() {
            this.stage.backgroundColor = 0xC0C0C0;
            this.camera.bounds = null;
            Generator.JumpTables.setDebug(true, ShadowySuperCoder.Global);
            Generator.JumpTables.instance;
            this.game.add.sprite(0,0,Generator.JumpTables.debugBitmapData);
            this._mainLayer = new MainLayer(this.game,this.world);
        }

        public update() {

            this.camera.x += this.time.physicsElapsed * Generator.Parameters.VELOCITY_X / 2;
            this._mainLayer.generate(this.camera.x / Generator.Parameters.CELL_SIZE);
        }
    }
}