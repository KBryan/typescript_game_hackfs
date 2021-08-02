var ShadowySuperCoder;
(function (ShadowySuperCoder) {
    var Global = /** @class */ (function () {
        function Global() {
        }
        // game size
        Global.GAME_WIDTH = 1024;
        Global.GAME_HEIGHT = 640;
        return Global;
    }());
    ShadowySuperCoder.Global = Global;
})(ShadowySuperCoder || (ShadowySuperCoder = {}));
window.onload = function () {
    ShadowySuperCoder.Global.game = new ShadowySuperCoder.Game();
};
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var ShadowySuperCoder;
(function (ShadowySuperCoder) {
    var Game = /** @class */ (function (_super) {
        __extends(Game, _super);
        function Game() {
            var _this = _super.call(this, ShadowySuperCoder.Global.GAME_WIDTH, ShadowySuperCoder.Global.GAME_HEIGHT, Phaser.AUTO, "content") || this;
            _this.state.add("Boot", ShadowySuperCoder.Boot);
            _this.state.add("Preload", ShadowySuperCoder.Preload);
            _this.state.add("Play", ShadowySuperCoder.Play);
            // start
            _this.state.start("Boot");
            return _this;
        }
        return Game;
    }(Phaser.Game));
    ShadowySuperCoder.Game = Game;
})(ShadowySuperCoder || (ShadowySuperCoder = {}));
var ShadowySuperCoder;
(function (ShadowySuperCoder) {
    var Boot = /** @class */ (function (_super) {
        __extends(Boot, _super);
        function Boot() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Boot.prototype.create = function () {
            this.game.state.start("Preload");
        };
        return Boot;
    }(Phaser.State));
    ShadowySuperCoder.Boot = Boot;
})(ShadowySuperCoder || (ShadowySuperCoder = {}));
var ShadowySuperCoder;
(function (ShadowySuperCoder) {
    var Play = /** @class */ (function (_super) {
        __extends(Play, _super);
        function Play() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Play.prototype.create = function () {
            this.stage.backgroundColor = 0x000000;
        };
        Play.prototype.update = function () {
        };
        return Play;
    }(Phaser.State));
    ShadowySuperCoder.Play = Play;
})(ShadowySuperCoder || (ShadowySuperCoder = {}));
var ShadowySuperCoder;
(function (ShadowySuperCoder) {
    var Preload = /** @class */ (function (_super) {
        __extends(Preload, _super);
        function Preload() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            // music decode / ready for game
            _this._ready = false;
            return _this;
        }
        // Preload
        Preload.prototype.preload = function () {
        };
        Preload.prototype.create = function () {
        };
        Preload.prototype.update = function () {
            // run only once
            if (this._ready === false) {
                this._ready = true;
                this.game.state.start("Play");
            }
        };
        return Preload;
    }(Phaser.State));
    ShadowySuperCoder.Preload = Preload;
})(ShadowySuperCoder || (ShadowySuperCoder = {}));
//# sourceMappingURL=shadowysupercoder.js.map