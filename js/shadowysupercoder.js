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
var Generator;
(function (Generator) {
    var JumpTables = /** @class */ (function () {
        function JumpTables() {
            // velocites
            this._jumpVelocites = [];
            this.calculateJumpVelocities();
        }
        Object.defineProperty(JumpTables, "instance", {
            get: function () {
                if (JumpTables._instance === null) {
                    JumpTables._instance = new JumpTables();
                }
                return JumpTables._instance;
            },
            enumerable: false,
            configurable: true
        });
        JumpTables.prototype.calculateJumpVelocities = function () {
            // all height samples
            for (var i = 0; i <= Generator.Parameters.HEIGHT_STEPS; i++) {
                // maximun height of jump for this step
                var height = Generator.Parameters.HEIGHT_MIN + (Generator.Parameters.HEIGHT_MAX - Generator.Parameters.HEIGHT_MIN) / Generator.Parameters.HEIGHT_STEPS * i;
                // v - sqrt(-(2 * s * g))
                this._jumpVelocites[i] = -Math.sqrt(2 * height * Generator.Parameters.GRAVITY);
            }
        };
        Object.defineProperty(JumpTables.prototype, "minJumpVelocity", {
            get: function () {
                return this._jumpVelocites[0];
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(JumpTables.prototype, "maxJumpVelocity", {
            get: function () {
                return this._jumpVelocites[this._jumpVelocites.length - 1];
            },
            enumerable: false,
            configurable: true
        });
        JumpTables.setDebug = function (debug, gameGlobals) {
            JumpTables._DEBUG = debug;
            JumpTables._globals = gameGlobals;
            if (debug) {
                if (typeof gameGlobals === "undefined" || gameGlobals === null) {
                    console.warn("No game globals provided - switching debug off");
                    JumpTables._DEBUG = false;
                }
                else {
                    JumpTables.createDebugBitmap();
                }
            }
        };
        Object.defineProperty(JumpTables, "debugBitmapData", {
            get: function () {
                return JumpTables._debugBmd;
            },
            enumerable: false,
            configurable: true
        });
        JumpTables.createDebugBitmap = function () {
            var global = JumpTables._globals;
            var bmd = new Phaser.BitmapData(global.game, "Grid", global.GAME_WIDTH, global.GAME_HEIGHT);
            bmd.fill(192, 192, 192);
            // horizontal lines
            for (var i = 0; i < global.GAME_HEIGHT; i += Generator.Parameters.CELL_SIZE) {
                bmd.line(0, i + 0.5, global.GAME_WIDTH - 1, i + 0.5);
            }
            // vertical lines
            for (var i = 0; i < global.GAME_WIDTH; i += Generator.Parameters.CELL_SIZE) {
                bmd.line(i + 0.5, 0, i + 0.5, global.GAME_HEIGHT - 1);
                // add columns header numbers
                bmd.text("" + (i / Generator.Parameters.CELL_SIZE), i + 20, 20, "24px Courier", "#FFFF00");
            }
            JumpTables._debugBmd = bmd;
        };
        JumpTables._instance = null;
        JumpTables._DEBUG = false;
        return JumpTables;
    }());
    Generator.JumpTables = JumpTables;
})(Generator || (Generator = {}));
var Generator;
(function (Generator) {
    var Parameters = /** @class */ (function () {
        function Parameters() {
        }
        // game area
        Parameters.GRID_HEIGHT = 10;
        Parameters.CELL_SIZE = 64;
        Parameters.CELL_STEPS = 4;
        // gravity
        Parameters.GRAVITY = 2400;
        // player body dimensions
        Parameters.PLAYER_BODY_WIDTH = 30;
        Parameters.PLAYER_BODY_HEIGHT = 90;
        // jump height params
        Parameters.HEIGHT_MIN = Parameters.CELL_SIZE * 0.75;
        Parameters.HEIGHT_MAX = Parameters.CELL_SIZE * 2.90;
        Parameters.HEIGHT_STEPS = 4;
        // horizontal speed
        Parameters.VELOCITY_X = 300;
        return Parameters;
    }());
    Generator.Parameters = Parameters;
})(Generator || (Generator = {}));
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
            this.stage.backgroundColor = 0x80FF80;
            Generator.JumpTables.setDebug(true, ShadowySuperCoder.Global);
            Generator.JumpTables.instance;
            this.game.add.sprite(0, 0, Generator.JumpTables.debugBitmapData);
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