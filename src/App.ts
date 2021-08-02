namespace ShadowySuperCoder {
    export class Global {
        static game:Phaser.Game;
        // game size
        static GAME_WIDTH :number = 1024;
        static GAME_HEIGHT:number = 640;
    }
}

window.onload = function () {
    ShadowySuperCoder.Global.game = new ShadowySuperCoder.Game();
}