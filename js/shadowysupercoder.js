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
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
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
    var Animations = /** @class */ (function () {
        function Animations() {
        }
        Animations.SPIKE_ANIM = ["Spikes1", "Spikes2", "Spikes3", "Spikes4", "Spikes3", "Spikes2"];
        Animations.BONUS_JUMP_ANIM = [
            "Bonus0", "Bonus1", "Bonus2", "Bonus3", "Bonus4",
            "Bonus4", "Bonus4", "Bonus3", "Bonus2", "Bonus1",
            "Bonus0", "Bonus5", "Bonus6", "Bonus7", "Bonus8",
            "Bonus8", "Bonus8", "Bonus7", "Bonus6", "Bonus5"
        ];
        return Animations;
    }());
    ShadowySuperCoder.Animations = Animations;
})(ShadowySuperCoder || (ShadowySuperCoder = {}));
var ShadowySuperCoder;
(function (ShadowySuperCoder) {
    var Background = /** @class */ (function (_super) {
        __extends(Background, _super);
        // -------------------------------------------------------------------------
        function Background(game, parent) {
            var _this = _super.call(this, game, parent) || this;
            _this._nextTree = 0;
            // heights
            var treesHeight = game.cache.getImage("TreesBg").height;
            var hillHeight = game.cache.getImage("Hill").height;
            var mudHeight = game.cache.getImage("Mud").height;
            // trees bg
            _this._treesBg = new Phaser.TileSprite(game, 0, 0, game.width, treesHeight, "TreesBg");
            _this._treesBg.fixedToCamera = true;
            _this.add(_this._treesBg);
            // trees group / pool
            _this._trees = new Phaser.Group(game, _this);
            _this._trees.createMultiple(4, "Sprites", "Tree", false);
            // width of tree sprite
            _this._treeWidth = game.cache.getFrameByName("Sprites", "Tree").width;
            // hill
            _this._hill = new Phaser.TileSprite(game, 0, game.height - mudHeight - hillHeight, game.width, hillHeight, "Hill");
            _this._hill.fixedToCamera = true;
            _this.add(_this._hill);
            // mud
            _this._mud = new Phaser.TileSprite(game, 0, game.height - mudHeight, game.width, mudHeight, "Mud");
            _this._mud.fixedToCamera = true;
            _this.add(_this._mud);
            return _this;
        }
        // -------------------------------------------------------------------------
        Background.prototype.updateLayers = function (x) {
            // move all three tilesprites
            this._mud.tilePosition.x = -x + Math.sin(Phaser.Math.degToRad((this.game.time.time / 30) % 360)) * 20;
            this._hill.tilePosition.x = -x * 0.5;
            this._treesBg.tilePosition.x = -x * 0.25;
            // move trees layer and remove/add trees
            this.manageTrees(x * 0.5);
        };
        // -------------------------------------------------------------------------
        Background.prototype.manageTrees = function (x) {
            // move trees layer
            this._trees.x = x;
            // remove old
            this._trees.forEachExists(function (tree) {
                if (tree.x < x - this._treeWidth) {
                    tree.exists = false;
                }
            }, this);
            // add new tree(s)
            while (this._nextTree < x + this.game.width) {
                // save new tree position
                var treeX = this._nextTree;
                // calcultate position for next tree
                this._nextTree += this.game.rnd.integerInRange(Background.TREE_DIST_MIN, Background.TREE_DIST_MAX);
                // get unused tree sprite
                var tree = this._trees.getFirstExists(false);
                // if no free sprites, exit loop
                if (tree === null) {
                    break;
                }
                // position tree and make it exist
                tree.x = treeX;
                tree.exists = true;
            }
        };
        Background.TREE_DIST_MIN = 300;
        Background.TREE_DIST_MAX = 800;
        return Background;
    }(Phaser.Group));
    ShadowySuperCoder.Background = Background;
})(ShadowySuperCoder || (ShadowySuperCoder = {}));
var ShadowySuperCoder;
(function (ShadowySuperCoder) {
    var BlockDefs = /** @class */ (function () {
        function BlockDefs() {
        }
        BlockDefs.BONUS_JUMP = { name: "bonusJump", anchorX: 0.5, anchorY: 0.5, bodyOffsetX: 7, bodyOffsetY: 7, bodyWidth: 50, bodyHeight: 50 };
        BlockDefs.PLATFORM = [[
                { name: "PlatformLeft", anchorX: 0, anchorY: 0.2, bodyOffsetX: 0, bodyOffsetY: 16, bodyWidth: 64, bodyHeight: 48 },
                { name: "PlatformMiddle", anchorX: 0, anchorY: 0.2, bodyOffsetX: 0, bodyOffsetY: 16, bodyWidth: 64, bodyHeight: 48 },
                { name: "PlatformRight", anchorX: 0, anchorY: 0.2, bodyOffsetX: 0, bodyOffsetY: 16, bodyWidth: 64, bodyHeight: 48 }
            ]];
        BlockDefs.BLOCK = [
            [
                { name: "BlockTopLeft", anchorX: 0, anchorY: 0.2, bodyOffsetX: 0, bodyOffsetY: 16, bodyWidth: 64, bodyHeight: 64 },
                { name: "BlockTopMiddle", anchorX: 0, anchorY: 0.2, bodyOffsetX: 0, bodyOffsetY: 16, bodyWidth: 64, bodyHeight: 64 },
                { name: "BlockTopRight", anchorX: 0, anchorY: 0.2, bodyOffsetX: 0, bodyOffsetY: 16, bodyWidth: 64, bodyHeight: 64 }
            ], [
                { name: "BlockMiddleLeft", anchorX: 0, anchorY: 0, bodyOffsetX: 0, bodyOffsetY: 0, bodyWidth: 64, bodyHeight: 64 },
                { name: "BlockMiddleMiddle", anchorX: 0, anchorY: 0, bodyOffsetX: 0, bodyOffsetY: 0, bodyWidth: 64, bodyHeight: 64 },
                { name: "BlockMiddleRight", anchorX: 0, anchorY: 0, bodyOffsetX: 0, bodyOffsetY: 0, bodyWidth: 64, bodyHeight: 64 }
            ], [
                { name: "BlockBottomLeft", anchorX: 0, anchorY: 0, bodyOffsetX: 0, bodyOffsetY: 0, bodyWidth: 64, bodyHeight: 64 },
                { name: "BlockBottomMiddle", anchorX: 0, anchorY: 0, bodyOffsetX: 0, bodyOffsetY: 0, bodyWidth: 64, bodyHeight: 64 },
                { name: "BlockBottomRight", anchorX: 0, anchorY: 0, bodyOffsetX: 0, bodyOffsetY: 0, bodyWidth: 64, bodyHeight: 64 }
            ]
        ];
        BlockDefs.LOW_BLOCK = [
            [
                { name: "LowBlockLeft", anchorX: 0, anchorY: 0.2, bodyOffsetX: 0, bodyOffsetY: 16, bodyWidth: 64, bodyHeight: 64 },
                { name: "LowBlockMiddle", anchorX: 0, anchorY: 0.2, bodyOffsetX: 0, bodyOffsetY: 16, bodyWidth: 64, bodyHeight: 64 },
                { name: "LowBlockRight", anchorX: 0, anchorY: 0.2, bodyOffsetX: 0, bodyOffsetY: 16, bodyWidth: 64, bodyHeight: 64 }
            ]
        ];
        return BlockDefs;
    }());
    ShadowySuperCoder.BlockDefs = BlockDefs;
})(ShadowySuperCoder || (ShadowySuperCoder = {}));
var ShadowySuperCoder;
(function (ShadowySuperCoder) {
    var MainLayer = /** @class */ (function (_super) {
        __extends(MainLayer, _super);
        // -------------------------------------------------------------------------
        function MainLayer(game, parent) {
            var _this = _super.call(this, game, parent) || this;
            _this._lastTile = new Phaser.Point(0, 0);
            // platforms generator
            _this._generator = new Generator.Generator(game.rnd);
            _this._generator.onRandomPlatform.add(_this.onRandomPlatform, _this);
            _this._generator.onPatternPlatform.add(_this.onPatternPlatform, _this);
            // object that holds level difficulty progress
            _this._difficulty = new Generator.Difficulty(game.rnd);
            // pool of walls
            _this._wallsPool = new Helper.Pool(Phaser.Sprite, 32, function () {
                // add empty sprite with body
                //let sprite = new Phaser.Sprite(game, 0, 0, "Sprites");
                var sprite = new Phaser.Sprite(game, 0, 0, "Block");
                game.physics.enable(sprite, Phaser.Physics.ARCADE);
                var body = sprite.body;
                body.allowGravity = false;
                body.immovable = true;
                body.moves = false;
                body.setSize(64, 64, 0, 0);
                return sprite;
            });
            // walls group
            _this._walls = new Phaser.Group(game, _this);
            // set initial tile for generating
            _this._generator.setPiece(0, 5, 10);
            _this._state = 0 /* PROCESS_PIECE */;
            return _this;
        }
        // -------------------------------------------------------------------------
        MainLayer.prototype.render = function () {
            this._walls.forEachExists(function (sprite) {
                this.game.debug.body(sprite);
            }, this);
        };
        // -------------------------------------------------------------------------
        MainLayer.prototype.generate = function (leftTile) {
            // remove tiles too far to left
            this.cleanTiles(leftTile);
            // width of screen rounded to whole tiles up
            var width = Math.ceil(this.game.width / Generator.Parameters.CELL_SIZE);
            // generate platforms until we generate platform that ends out of the screen on right
            while (this._lastTile.x < leftTile + width) {
                switch (this._state) {
                    case 0 /* PROCESS_PIECE */:
                        {
                            // check if queue not empty - should never happen
                            if (!this._generator.hasPieces) {
                                console.error("Pieces queue is empty!");
                            }
                            var piece = this._generator.getPieceFromQueue();
                            this._lastTile.copyFrom(piece.position);
                            var length_1 = piece.length;
                            var tileType = 0 /* LEFT */;
                            // process piece
                            while (length_1 > 0) {
                                this.addTiles(this._lastTile.x, this._lastTile.y, tileType, piece.isPlatform);
                                if ((--length_1) > 0) {
                                    ++this._lastTile.x;
                                }
                                tileType = (length_1 === 1) ? 2 /* RIGHT */ : 1 /* MIDDLE */;
                            }
                            // return processed piece into pool
                            this._generator.destroyPiece(piece);
                            // generate next platform
                            if (!this._generator.hasPieces) {
                                this._state = 1 /* GENERATE_PIECE */;
                            }
                            break;
                        }
                    case 1 /* GENERATE_PIECE */:
                        {
                            this._difficulty.update(leftTile);
                            this._generator.generatePieces(this._lastTile, this._difficulty);
                            this._state = 0 /* PROCESS_PIECE */;
                            break;
                        }
                }
            }
        };
        // -------------------------------------------------------------------------
        MainLayer.prototype.cleanTiles = function (leftTile) {
            leftTile *= Generator.Parameters.CELL_SIZE;
            for (var i = this._walls.length - 1; i >= 0; i--) {
                var wall = this._walls.getChildAt(i);
                if (wall.x - leftTile <= -64) {
                    this._walls.remove(wall);
                    wall.parent = null;
                    this._wallsPool.destroyItem(wall);
                }
            }
        };
        // -------------------------------------------------------------------------
        MainLayer.prototype.addTiles = function (x, y, type, platform) {
            var defs;
            // find right defs
            if (platform) {
                defs = ShadowySuperCoder.BlockDefs.PLATFORM;
            }
            else if (y === Generator.Parameters.LBOUND) {
                defs = ShadowySuperCoder.BlockDefs.LOW_BLOCK;
            }
            else {
                defs = ShadowySuperCoder.BlockDefs.BLOCK;
            }
            // number of vertical tiles
            var rowsCount = platform ? 1 : Generator.Parameters.LBOUND - y + 1;
            for (var r = y; r < y + rowsCount; r++) {
                // find correct block definition
                var blockDef = void 0;
                if (defs !== ShadowySuperCoder.BlockDefs.BLOCK) {
                    blockDef = defs[0][type];
                }
                else {
                    if (r === y) {
                        blockDef = defs[0][type];
                    }
                    else if (r < y + rowsCount - 1) {
                        blockDef = defs[1][type];
                    }
                    else {
                        blockDef = defs[2][type];
                    }
                }
                // sprite  get from pool
                var sprite = this._wallsPool.createItem();
                sprite.position.set(x * 64, r * 64);
                sprite.exists = true;
                sprite.visible = true;
                // adjust sprite to match block definition
                sprite.frameName = blockDef.name;
                sprite.anchor.set(blockDef.anchorX, blockDef.anchorY);
                var body = sprite.body;
                body.setSize(blockDef.bodyWidth, blockDef.bodyHeight, blockDef.bodyOffsetX, blockDef.bodyOffsetY);
                // add into walls group
                if (sprite.parent === null) {
                    this._walls.add(sprite);
                }
            }
        };
        Object.defineProperty(MainLayer.prototype, "walls", {
            // -------------------------------------------------------------------------
            get: function () {
                return this._walls;
            },
            enumerable: false,
            configurable: true
        });
        // -------------------------------------------------------------------------
        MainLayer.prototype.onRandomPlatform = function (piece, previous) {
            this.setPlatform(piece);
        };
        // -------------------------------------------------------------------------
        MainLayer.prototype.onPatternPlatform = function (piece, previous, position, repeat, template) {
            // first platform in pattern?
            if (position === 0 && repeat === 0) {
                this.setPlatform(piece);
            }
            else if (repeat === 0) { // still in base pieces?
                // randomly decide on whether to follow previous piece setting
                if (this.game.rnd.integerInRange(0, 99) < 50) {
                    piece.isPlatform = previous.isPlatform;
                }
                else {
                    this.setPlatform(piece);
                }
            }
            else {
                // high probability to follow base pices settings
                if (this.game.rnd.integerInRange(0, 99) < 90) {
                    piece.isPlatform = template.isPlatform;
                }
                else {
                    this.setPlatform(piece);
                }
            }
        };
        // -------------------------------------------------------------------------
        MainLayer.prototype.setPlatform = function (piece) {
            // draw as block or platform?
            var platformProb = 100 - (piece.position.y - Generator.Parameters.UBOUND) * 20;
            piece.isPlatform = this.game.rnd.integerInRange(0, 99) < platformProb;
        };
        return MainLayer;
    }(Phaser.Group));
    ShadowySuperCoder.MainLayer = MainLayer;
})(ShadowySuperCoder || (ShadowySuperCoder = {}));
var ShadowySuperCoder;
(function (ShadowySuperCoder) {
    /**
     * // TODO: comment Player
     * Gets script version
     * @param fileName
     * @returns script version
     */
    var Player = /** @class */ (function (_super) {
        __extends(Player, _super);
        function Player(game) {
            var _this = _super.call(this, game, 0, 0, "Player") || this;
            // center player
            _this.anchor.x = 0.5;
            // enable physics
            game.physics.arcade.enable(_this, false);
            // allow gravity
            var body = _this.body;
            body.allowGravity = true;
            // set body size according to values in Generator.Parameters
            var bodyW = Generator.Parameters.PLAYER_BODY_WIDTH;
            var bodyH = Generator.Parameters.PLAYER_BODY_HEIGHT;
            var bodyOffsetX = -bodyW / 2 + _this.width * _this.anchor.x;
            var bodyOffsetY = 0;
            // set body size and offset
            body.setSize(bodyW, bodyH, bodyOffsetX, bodyOffsetY);
            return _this;
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
        Player.prototype.animateJump = function () {
            this._spriterGroup.playAnimationByName("jump");
        };
        // -------------------------------------------------------------------------
        Player.prototype.animateDeath = function () {
            var body = this.body;
            body.enable = false;
            this._spriterGroup.playAnimationByName("fall_water");
        };
        // -------------------------------------------------------------------------
        Player.prototype.animateHit = function () {
            this._spriterGroup.playAnimationByName("hit");
        };
        // -------------------------------------------------------------------------
        Player.prototype.updateAnim = function (standing, velY, gameOver) {
            if (!gameOver) {
                if (standing) {
                    if (this._spriterGroup.currentAnimationName !== "run") {
                        this._spriterGroup.playAnimationByName("run");
                    }
                }
                else if (velY > 0) {
                    if (this._spriterGroup.currentAnimationName !== "fall") {
                        this._spriterGroup.playAnimationByName("fall");
                    }
                }
            }
            this._spriterGroup.updateAnimation();
        };
        return Player;
    }(Phaser.Sprite));
    ShadowySuperCoder.Player = Player;
})(ShadowySuperCoder || (ShadowySuperCoder = {}));
var Generator;
(function (Generator) {
    var Difficulty = /** @class */ (function () {
        /**
         * // TODO: comment Difficulty
         * Gets script version
         * @param fileName
         * @returns script version
         */
        // -------------------------------------------------------------------------
        function Difficulty(rnd) {
            this._rnd = rnd;
            //initial bonus jump probability
            this._bonusJumpProbability = Generator.Parameters.BONUS_JUMP_PROB_MIN;
            // initial bonus jump count
            this._bonusJumpCount = Generator.Parameters.BONUS_JUMP_COUNT_MIN;
            // maximum length of platform
            this._platformLengthDecrease = Generator.Parameters.PLATFORM_LENGTH_DECREASER_MIN;
            // jump width decreaser to make jumps easier in game beginnig
            this._jumpLengthDecrease = Generator.Parameters.JUMP_LENGTH_DECREASER_MIN;
        }
        Object.defineProperty(Difficulty.prototype, "platformLengthDecrease", {
            // -------------------------------------------------------------------------
            get: function () {
                return this._platformLengthDecrease;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Difficulty.prototype, "jumpLengthDecrease", {
            // -------------------------------------------------------------------------
            get: function () {
                return this._jumpLengthDecrease;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Difficulty.prototype, "bonusJumpProbability", {
            get: function () {
                return this._bonusJumpProbability;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Difficulty.prototype, "bonusJumpCount", {
            // -------------------------------------------------------------------------
            get: function () {
                return this._bonusJumpCount;
            },
            enumerable: false,
            configurable: true
        });
        // -------------------------------------------------------------------------
        Difficulty.prototype.mapLinear = function (x, a1, a2, b1, b2) {
            x = Phaser.Math.clamp(x, a1, a2);
            return Phaser.Math.mapLinear(x, a1, a2, b1, b2);
        };
        // -------------------------------------------------------------------------
        Difficulty.prototype.update = function (tileX) {
            // platform length
            this._platformLengthDecrease = Math.round(this.mapLinear(tileX, Generator.Parameters.PLATFORM_LENGTH_DECREASER_START_TITLE, Generator.Parameters.PLATFORM_LENGTH_DECREASER_END_TITLE, Generator.Parameters.PLATFORM_LENGTH_DECREASER_MIN, Generator.Parameters.PLATFORM_LENGTH_DECREASER_MAX));
            // jump length
            this._jumpLengthDecrease = Math.round(this.mapLinear(tileX, Generator.Parameters.JUMP_LENGTH_DECREASER_MAX_START_TITLE, Generator.Parameters.JUMP_LENGTH_DECREASER_END_TITLE, Generator.Parameters.JUMP_LENGTH_DECREASER_MIN, Generator.Parameters.JUMP_LENGTH_DECREASER_MAX));
            // bonus jump probability
            this._bonusJumpProbability = Math.round(this.mapLinear(tileX, Generator.Parameters.BONUS_JUMP_START_TITLE, Generator.Parameters.BONUS_JUMP_END_TITLE, Generator.Parameters.BONUS_JUMP_PROB_MIN, Generator.Parameters.BONUS_JUMP_PROB_MAX));
            // bonus jump count
            this._bonusJumpCount = Math.round(this.mapLinear(tileX, Generator.Parameters.BONUS_JUMP_COUNT_START_TITLE, Generator.Parameters.BONUS_JUMP_COUNT_START_TITLE, Generator.Parameters.BONUS_JUMP_COUNT_MIN, Generator.Parameters.BONUS_JUMP_COUNT_MAX));
        };
        // -------------------------------------------------------------------------
        Difficulty.prototype.toString = function () {
            return "platformLengthDecrease: " + this._platformLengthDecrease +
                ", jumpLengthDecrease: " + this.jumpLengthDecrease +
                ", bonusJumpProbability: " + this._bonusJumpProbability +
                ", bonusJumpCount: " + this._bonusJumpCount;
        };
        return Difficulty;
    }());
    Generator.Difficulty = Difficulty;
})(Generator || (Generator = {}));
var Generator;
(function (Generator_1) {
    var UNDEFINED = -10000;
    var Generator = /** @class */ (function () {
        // -------------------------------------------------------------------------
        function Generator(rnd) {
            // signals
            // dispatch new piece, previous piece
            this.onRandomPlatform = new Phaser.Signal();
            // dispatch new piece, previous piece, position in pattern, repeat order, pattern base piece
            this.onPatternPlatform = new Phaser.Signal();
            this._lastGeneratedPiece = null;
            // pieces queue
            this._piecesQueue = [];
            this._piecesQueueTop = 0;
            this._hlpPoint = new Phaser.Point();
            // random numbers generator
            this._rnd = rnd;
            // reference to jump tables
            this._jumpTables = Generator_1.JumpTables.instance;
            // pool of pieces
            this._piecesPool = new Helper.Pool(Generator_1.Piece, 16);
        }
        // -------------------------------------------------------------------------
        Generator.prototype.createPiece = function () {
            var piece = this._piecesPool.createItem();
            if (piece === null) {
                console.error("No free pieces in pool");
            }
            return piece;
        };
        // -------------------------------------------------------------------------
        Generator.prototype.destroyPiece = function (piece) {
            this._piecesPool.destroyItem(piece);
        };
        Object.defineProperty(Generator.prototype, "hasPieces", {
            // -------------------------------------------------------------------------
            get: function () {
                return this._piecesQueueTop > 0;
            },
            enumerable: false,
            configurable: true
        });
        // -------------------------------------------------------------------------
        Generator.prototype.addPieceIntoQueue = function (piece) {
            // put new piece into queue and increase its length
            this._piecesQueue[this._piecesQueueTop++] = piece;
        };
        // -------------------------------------------------------------------------
        Generator.prototype.getPieceFromQueue = function () {
            // if no pieces in queue then return null
            if (this._piecesQueueTop === 0) {
                return null;
            }
            // get first piece in queue
            var piece = this._piecesQueue[0];
            // shift remaining pieces left by 1
            for (var i = 0; i < this._piecesQueueTop - 1; i++) {
                this._piecesQueue[i] = this._piecesQueue[i + 1];
            }
            // clear last slot in queue and decrease queue top
            this._piecesQueue[--this._piecesQueueTop] = null;
            return piece;
        };
        // -------------------------------------------------------------------------
        Generator.prototype.setPiece = function (x, y, length, offsetX, offsetY) {
            if (offsetX === void 0) { offsetX = 0; }
            if (offsetY === void 0) { offsetY = 0; }
            var piece = this.createPiece();
            piece.position.set(x, y);
            piece.offset.set(offsetX, offsetY);
            piece.length = length;
            this.addPieceIntoQueue(piece);
            return piece;
        };
        // -------------------------------------------------------------------------
        Generator.prototype.generate = function (lastPosition, difficulty, length, offsetX, offsetY, bonusJump) {
            var piece = this.createPiece();
            var ubound = Generator_1.Parameters.UBOUND;
            var lbound = Generator_1.Parameters.LBOUND;
            // Y POSITION
            // how high can jump max
            var minY = this._jumpTables.maxOffsetY();
            // how deep can fall max
            // let maxY = lbound - ubound;
            var maxY = -minY;
            // clear last y from upper bound, so it starts from 0
            var currentY = lastPosition.y - ubound;
            var shiftY = offsetY;
            if (shiftY === UNDEFINED) {
                // new random y position - each y level on screen has the same probability
                shiftY = this._rnd.integerInRange(0, lbound - ubound);
                // substract currentY from shiftY - it will split possible y levels to negative
                // (how much step up (-)) and positive (how much to step down (+))
                shiftY -= currentY;
                // clamp step to keep it inside interval given with maximum
                // jump offset up (minY) and maximum fall down (maxX)
                shiftY = Phaser.Math.clamp(shiftY, minY, maxY);
            }
            // new level for platform
            // limit once more against game limits (2 free tiles on top, 1 water tile at bottom)
            var newY = Phaser.Math.clamp(currentY + shiftY, 0, lbound - ubound);
            // shift by upper bound to get right y level on screen
            piece.position.y = newY + ubound;
            // offset of new piece relative to last position (end position of last piece)
            piece.offset.y = piece.position.y - lastPosition.y;
            // X POSITION
            var shiftX = offsetX;
            // calculate is offsetX is not forced or offsetY was forced, but final value is different
            if (shiftX === UNDEFINED || (offsetY !== UNDEFINED && offsetY !== piece.offset.y)) {
                var minX = this._jumpTables.minOffsetX(piece.offset.y);
                var maxX = this._jumpTables.maxOffsetX(piece.offset.y);
                // decrease maximum jump distance with jump decreaser in difficulty to
                // make jumps easier in the beginning of game
                // But be sure it does not fall under minX
                maxX = Math.max(minX, maxX + difficulty.jumpLengthDecrease);
                // position of next tile in x direction
                shiftX = this._rnd.integerInRange(minX, maxX);
            }
            // new absolute x position
            piece.position.x = lastPosition.x + shiftX;
            // offset of new piece relative to last position (end position of last piece)
            piece.offset.x = shiftX;
            // LENGTH
            if (length !== UNDEFINED) {
                piece.length = length;
            }
            else {
                // decrease maximum length of platform with difficulty progress
                piece.length = this._rnd.integerInRange(Generator_1.Parameters.PLATFORM_LENGTH_MIN, Generator_1.Parameters.PLATFORM_LENGTH_MAX + difficulty.platformLengthDecrease);
            }
            // SPIKES
            // if (this._lastGeneratedPiece !== null && this._lastGeneratedPiece.spikesPattern === 0 &&
            //     !bonusJump &&
            //     (this._rnd.integerInRange(0, 99) < difficulty.spikesProbability)) {
            //
            //     // adjust length - make piece longer
            //     piece.length = this._rnd.integerInRange(5, 9);
            //
            //     // choose spikes pattern randomly
            //     let patternDefs = Parameters.SPIKE_PATTERNS[piece.length];
            //     piece.spikesPattern = patternDefs[this._rnd.integerInRange(0, patternDefs.length - 1)];
            //
            // } else {
            //     piece.spikesPattern = 0;
            // }
            // console.log(difficulty.toString());
            // RESULT
            this._lastGeneratedPiece = piece;
            return piece;
        };
        // -------------------------------------------------------------------------
        Generator.prototype.generatePieces = function (lastTile, difficulty) {
            var probability = this._rnd.integerInRange(0, 99);
            if (probability < Generator_1.Parameters.GENERATE_RANDOM) {
                this.generateRandomly(lastTile, difficulty);
            }
            else {
                this.generatePattern(lastTile, difficulty);
            }
        };
        // -------------------------------------------------------------------------
        Generator.prototype.generateRandomly = function (lastTile, difficulty) {
            var prevPiece = this._lastGeneratedPiece;
            var piece = this.generate(lastTile, difficulty, UNDEFINED, UNDEFINED, UNDEFINED, false);
            // add to queue
            this.addPieceIntoQueue(piece);
            // dispatch signal - let listeners know, random platform has been generated
            // pass: new piece, previous piece
            this.onRandomPlatform.dispatch(piece, prevPiece);
        };
        // -------------------------------------------------------------------------
        Generator.prototype.generatePattern = function (lastTile, difficulty) {
            // save index of first new piece
            var oldQueueTop = this._piecesQueueTop;
            // where to start generating
            var hlpPos = this._hlpPoint;
            hlpPos.copyFrom(lastTile);
            // same length for all pices?
            var length = UNDEFINED;
            if (this._rnd.integerInRange(0, 99) < Generator_1.Parameters.KEEP_LENGTH_IN_PATTERN) {
                length = this._rnd.integerInRange(Generator_1.Parameters.PLATFORM_LENGTH_MIN, Generator_1.Parameters.PLATFORM_LENGTH_MAX + difficulty.platformLengthDecrease);
            }
            // how many pieces to repeat in pattern
            var basePices = 2;
            for (var i = 0; i < basePices; i++) {
                var prevPiece = this._lastGeneratedPiece;
                var piece = this.generate(hlpPos, difficulty, length, UNDEFINED, UNDEFINED, false);
                hlpPos.copyFrom(piece.position);
                // get last tile of piece
                hlpPos.x += piece.length - 1;
                // add to queue
                this.addPieceIntoQueue(piece);
                // dispatch signal - let listeners know, pattern platform has been generated
                // pass: new piece, previous piece, position in pattern, repeat order, pattern base piece
                this.onPatternPlatform.dispatch(piece, prevPiece, i, 0, null);
            }
            // repeat pattern X times
            var repeat = 1;
            for (var i = 0; i < repeat; i++) {
                // repeat all pieces in pattern
                for (var p = 0; p < basePices; p++) {
                    var prevPiece = this._lastGeneratedPiece;
                    // get first piece in pattern to repeat as template
                    var templetePiece = this._piecesQueue[oldQueueTop + p];
                    // replicate it
                    var piece = this.generate(hlpPos, difficulty, length, templetePiece.offset.x, templetePiece.offset.y, false);
                    hlpPos.copyFrom(piece.position);
                    hlpPos.x += piece.length - 1;
                    // add to stack
                    this.addPieceIntoQueue(piece);
                    // dispatch signal - let listeners know, pattern platform has been generated
                    // pass: new piece, previous piece, position in pattern, repeat order, pattern base piece
                    this.onPatternPlatform.dispatch(piece, prevPiece, p, i + 1, templetePiece);
                }
            }
        };
        return Generator;
    }());
    Generator_1.Generator = Generator;
})(Generator || (Generator = {}));
var Generator;
(function (Generator) {
    /**
     * // TODO: comment Generator
     * Gets script version
     * @param fileName
     * @returns script version
     */
    var Jump = /** @class */ (function () {
        function Jump() {
            this.offsetY = 0;
            this.offsetX = 0;
        }
        Jump.prototype.toString = function () {
            return "offsetX: " + this.offsetX + ", offsetY: " + this.offsetY;
        };
        return Jump;
    }());
    Generator.Jump = Jump;
})(Generator || (Generator = {}));
var Generator;
(function (Generator) {
    /**
     * // TODO: comment JumpTables
     * Gets script version
     * @param fileName
     * @returns script version
     */
    var JumpTables = /** @class */ (function () {
        // -------------------------------------------------------------------------
        function JumpTables() {
            // velocities
            this._jumpVelocities = [];
            // list of possible jumps for each jump velocity and position within cell
            this._jumpDefs = [];
            // results of jump table analysis
            this._jumpOffsetsY = [];
            this._jumpOffsetYMax = 0;
            this._jumpOffsetXMins = {};
            this._jumpOffsetXMaxs = {};
            this.calculateJumpVelocities();
            this.calculateJumpTables();
        }
        Object.defineProperty(JumpTables, "instance", {
            // -------------------------------------------------------------------------
            get: function () {
                if (JumpTables._instance === null) {
                    JumpTables._instance = new JumpTables();
                }
                return JumpTables._instance;
            },
            enumerable: false,
            configurable: true
        });
        // -------------------------------------------------------------------------
        JumpTables.prototype.calculateJumpVelocities = function () {
            // all height samples
            for (var i = 0; i <= Generator.Parameters.HEIGHT_STEPS; i++) {
                // maximum height of jump for this step
                var height = Generator.Parameters.HEIGHT_MIN + (Generator.Parameters.HEIGHT_MAX - Generator.Parameters.HEIGHT_MIN) / Generator.Parameters.HEIGHT_STEPS * i;
                // v = sqrt(-(2 * s * g))
                this._jumpVelocities[i] = -Math.sqrt(2 * height * Generator.Parameters.GRAVITY);
            }
        };
        Object.defineProperty(JumpTables.prototype, "minJumpVelocity", {
            // -------------------------------------------------------------------------
            get: function () {
                return this._jumpVelocities[0];
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(JumpTables.prototype, "maxJumpVelocity", {
            // -------------------------------------------------------------------------
            get: function () {
                return this._jumpVelocities[this._jumpVelocities.length - 1];
            },
            enumerable: false,
            configurable: true
        });
        // -------------------------------------------------------------------------
        // ---------------------------- JUMP TABLES --------------------------------
        // -------------------------------------------------------------------------
        JumpTables.prototype.calculateJumpTables = function () {
            // all jump velocities
            for (var height = 0; height <= Generator.Parameters.HEIGHT_STEPS; height++) {
                this._jumpDefs[height] = [];
                // step from left to right on cell
                for (var step = 0; step < 1 /*Parameters.CELL_STEPS*/; step++) {
                    this.calculateJumpCurve(step, height);
                }
            }
            // analyze created jump tables
            this.analyzeJumpTables();
        };
        // -------------------------------------------------------------------------
        JumpTables.prototype.calculateJumpCurve = function (step, jumpIndex) {
            // simulation timestep
            var timeStep = 1 / 60;
            // take jump velocity we calculated previously
            var velocity = this._jumpVelocities[jumpIndex];
            // start at middle of first step to spread samples better over cell
            // x and y positions are in pixels
            var x = step * Generator.Parameters.CELL_SIZE / Generator.Parameters.CELL_STEPS
                + Generator.Parameters.CELL_SIZE / Generator.Parameters.CELL_STEPS / 2;
            var y = 0;
            // y position in cells coordinates (row within grid)
            var cellY = 0;
            // help variables to track previous position
            var prevX, prevY;
            // array of jumps from starting position to possible destinations
            var jumpDefs = [];
            // helper object that will help us keep track of visited cells
            var visitedList = {};
            // half of player body width
            var playerWidthHalf = Generator.Parameters.PLAYER_BODY_WIDTH / 2 * 0.5;
            // debug
            var debugBitmap = (JumpTables._DEBUG) ? JumpTables.debugBitmapData : null;
            // offset drawing of curve little bit down (by 4 cells),
            // otherwise it will be cut at top as we start jump at point [x, 0]
            var yOffset = Generator.Parameters.CELL_SIZE * 4;
            // simulate physics
            while (cellY < Generator.Parameters.GRID_HEIGHT) {
                // save previous position
                prevX = x;
                prevY = y;
                // adjust velocity
                velocity += Generator.Parameters.GRAVITY * timeStep;
                // new posiiton
                y += velocity * timeStep;
                x += Generator.Parameters.VELOCITY_X * timeStep;
                // draw path - small white dot
                if (JumpTables._DEBUG) {
                    debugBitmap.rect(x, y + yOffset, 2, 2, "#FFFFFF");
                }
                // left and right bottom point based on body width.
                var leftCell = void 0, rightCell = void 0;
                cellY = Math.floor(y / Generator.Parameters.CELL_SIZE);
                // falling down
                if (velocity > 0) {
                    // crossed cell border to next vertical cell?
                    if (cellY > Math.floor(prevY / Generator.Parameters.CELL_SIZE)) {
                        // calc as intersection of line from prev. position and current position with grid horizontal line
                        var pixelBorderY = Math.floor(y / Generator.Parameters.CELL_SIZE) * Generator.Parameters.CELL_SIZE;
                        var pixelBorderX = prevX + (x - prevX) * (pixelBorderY - prevY) / (y - prevY);
                        leftCell = Math.floor((pixelBorderX - playerWidthHalf) / Generator.Parameters.CELL_SIZE);
                        rightCell = Math.floor((pixelBorderX + playerWidthHalf) / Generator.Parameters.CELL_SIZE);
                        // all cells in x direction occupied with body
                        for (var i = leftCell; i <= rightCell; i++) {
                            var visitedId = i + (cellY << 8);
                            // if not already in list, then add new jump to reach this cell
                            if (typeof visitedList[visitedId] === "undefined") {
                                var jump = new Generator.Jump();
                                jump.offsetX = i;
                                jump.offsetY = cellY;
                                jumpDefs.push(jump);
                                console.log(jump.toString());
                            }
                        }
                        // debug
                        if (JumpTables._DEBUG) {
                            // debug draw
                            var py = pixelBorderY + yOffset;
                            // line with original body width
                            var color = "#4040FF";
                            var pxLeft = pixelBorderX - Generator.Parameters.PLAYER_BODY_WIDTH / 2;
                            var pxRight = pixelBorderX + Generator.Parameters.PLAYER_BODY_WIDTH / 2;
                            debugBitmap.line(pxLeft, py, pxRight, py, color);
                            color = "#0000FF";
                            pxLeft = pixelBorderX - playerWidthHalf;
                            pxRight = pixelBorderX + playerWidthHalf;
                            // line with shortened body width
                            debugBitmap.line(pxLeft, py, pxRight, py, color);
                            debugBitmap.line(pxLeft, py - 3, pxLeft, py + 3, color);
                            debugBitmap.line(pxRight, py - 3, pxRight, py + 3, color);
                        }
                    }
                }
                leftCell = Math.floor((x - playerWidthHalf) / Generator.Parameters.CELL_SIZE);
                rightCell = Math.floor((x + playerWidthHalf) / Generator.Parameters.CELL_SIZE);
                // add grid cells to visited
                for (var i = leftCell; i <= rightCell; i++) {
                    // make "id"
                    var visitedId = i + (cellY << 8);
                    if (typeof visitedList[visitedId] === "undefined") {
                        visitedList[visitedId] = visitedId;
                    }
                }
            }
            this._jumpDefs[jumpIndex][step] = jumpDefs;
        };
        // -------------------------------------------------------------------------
        JumpTables.prototype.analyzeJumpTables = function () {
            // min y
            this._jumpOffsetYMax = 0;
            // through all jump velocities
            for (var velocity = 0; velocity < this._jumpDefs.length; velocity++) {
                // get only first x position within cell and first jump for given velocity,
                // because all have the same height
                this._jumpOffsetsY[velocity] = this._jumpDefs[velocity][0][0].offsetY;
                // check for maximum offset in y direction.
                // As it is negative number, we are looking for min in fact
                this._jumpOffsetYMax = Math.min(this._jumpOffsetYMax, this._jumpOffsetsY[velocity]);
            }
            // find minimum and maximum offset in cells to jump to at given height level
            for (var velocity = 1; velocity < this._jumpDefs.length; velocity++) {
                // get only first startX, because it has smallest x offset
                var jumps = this._jumpDefs[velocity][0];
                for (var j = 0; j < jumps.length; j++) {
                    var jump = jumps[j];
                    var currentMin = this._jumpOffsetXMins[jump.offsetY];
                    this._jumpOffsetXMins[jump.offsetY] = (typeof currentMin !== "undefined") ?
                        Math.min(currentMin, jump.offsetX) : jump.offsetX;
                    // console.log("LEVEL: " + jump.offsetY + " - jump from " + this.minOffsetX(jump.offsetY));
                }
                // get only last startX, because it has biggest x offset
                jumps = this._jumpDefs[velocity][this._jumpDefs[velocity].length - 1];
                for (var j = 0; j < jumps.length; j++) {
                    var jump = jumps[j];
                    var currentMax = this._jumpOffsetXMaxs[jump.offsetY];
                    this._jumpOffsetXMaxs[jump.offsetY] = (typeof currentMax !== "undefined") ?
                        Math.max(currentMax, jump.offsetX) : jump.offsetX;
                    // console.log("LEVEL: " + jump.offsetY + " - jump to " + this.maxOffsetX(jump.offsetY));
                }
            }
        };
        JumpTables.prototype.maxOffsetY = function (jumpIndex) {
            if (jumpIndex === void 0) { jumpIndex = -1; }
            if (jumpIndex === -1) {
                return this._jumpOffsetYMax;
            }
            else {
                return this._jumpOffsetsY[jumpIndex];
            }
        };
        JumpTables.prototype.maxOffsetX = function (offsetY) {
            var maxX = this._jumpOffsetXMaxs[offsetY];
            if (typeof maxX === "undefined") {
                console.error("max X for offset y = " + offsetY + " does not exist");
                maxX = 0;
            }
            return maxX;
        };
        JumpTables.prototype.minOffsetX = function (offsetY) {
            var minX = this._jumpOffsetXMins[offsetY];
            if (typeof minX === "undefined") {
                console.error("min X for offset y = " + offsetY + " does not exist");
                minX = 0;
            }
            return minX;
        };
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
        // -------------------------------------------------------------------------
        // ------------------------------ DEBUG ------------------------------------
        // -------------------------------------------------------------------------
        JumpTables._DEBUG = false;
        return JumpTables;
    }());
    Generator.JumpTables = JumpTables;
})(Generator || (Generator = {}));
var Generator;
(function (Generator) {
    /**
     * // TODO: comment Parameters
     * Gets script version
     * @param fileName
     * @returns script version
     */
    var Parameters = /** @class */ (function () {
        function Parameters() {
        }
        // bound for generating platforms
        Parameters.UBOUND = 2;
        Parameters.LBOUND = 8;
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
        // difficulty
        Parameters.PLATFORM_LENGTH_MIN = 2;
        Parameters.PLATFORM_LENGTH_MAX = 5;
        Parameters.PLATFORM_LENGTH_DECREASER_MIN = 0;
        Parameters.PLATFORM_LENGTH_DECREASER_MAX = -2;
        Parameters.PLATFORM_LENGTH_DECREASER_START_TITLE = 100;
        Parameters.PLATFORM_LENGTH_DECREASER_END_TITLE = 200;
        // jump length
        Parameters.JUMP_LENGTH_DECREASER_MIN = -1;
        Parameters.JUMP_LENGTH_DECREASER_MAX = 0;
        Parameters.JUMP_LENGTH_DECREASER_MAX_START_TITLE = 0;
        Parameters.JUMP_LENGTH_DECREASER_END_TITLE = 50;
        // probability to generate random piece in percent
        Parameters.GENERATE_RANDOM = 50;
        // keep length of all platforms in pattern the same? (in percent)
        Parameters.KEEP_LENGTH_IN_PATTERN = 75;
        // bonus jump probability
        Parameters.BONUS_JUMP_PROB_MIN = 0;
        Parameters.BONUS_JUMP_PROB_MAX = 30;
        Parameters.BONUS_JUMP_START_TITLE = 50;
        Parameters.BONUS_JUMP_END_TITLE = 200;
        // bonus jump content
        Parameters.BONUS_JUMP_COUNT_MIN = 1;
        Parameters.BONUS_JUMP_COUNT_MAX = 3;
        Parameters.BONUS_JUMP_COUNT_START_TITLE = 50;
        Parameters.BONUS_JUMP_COUNT_END_TITLE = 300;
        return Parameters;
    }());
    Generator.Parameters = Parameters;
})(Generator || (Generator = {}));
var Generator;
(function (Generator) {
    var Piece = /** @class */ (function () {
        function Piece() {
            // absolute position of left cell
            this.position = new Phaser.Point(0, 0);
            // calculate the offset
            this.offset = new Phaser.Point(0, 0);
        }
        return Piece;
    }());
    Generator.Piece = Piece;
})(Generator || (Generator = {}));
var Helper;
(function (Helper) {
    /**
     * // TODO: comment Helper
     * Gets script version
     * @param fileName
     * @returns script version
     */
    var Pool = /** @class */ (function () {
        // -------------------------------------------------------------------------
        function Pool(classType, count, newFunction) {
            if (newFunction === void 0) { newFunction = null; }
            this._newFunction = null;
            this._count = 0;
            this._pool = [];
            this._canGrow = true;
            this._poolSize = 0;
            this._classType = classType;
            this._newFunction = newFunction;
            for (var i = 0; i < count; i++) {
                // create new item
                var item = this.newItem();
                // store into stack of free items
                this._pool[this._count++] = item;
            }
        }
        // -------------------------------------------------------------------------
        Pool.prototype.createItem = function () {
            if (this._count === 0) {
                return this._canGrow ? this.newItem() : null;
            }
            else {
                return this._pool[--this._count];
            }
        };
        // -------------------------------------------------------------------------
        Pool.prototype.destroyItem = function (item) {
            this._pool[this._count++] = item;
        };
        // -------------------------------------------------------------------------
        Pool.prototype.newItem = function () {
            ++this._poolSize;
            if (this._newFunction !== null) {
                return this._newFunction();
            }
            else {
                return new this._classType;
            }
        };
        Object.defineProperty(Pool.prototype, "newFunction", {
            // -------------------------------------------------------------------------
            set: function (newFunction) {
                this._newFunction = newFunction;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Pool.prototype, "canGrow", {
            // -------------------------------------------------------------------------
            set: function (canGrow) {
                this._canGrow = canGrow;
            },
            enumerable: false,
            configurable: true
        });
        return Pool;
    }());
    Helper.Pool = Pool;
})(Helper || (Helper = {}));
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
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this._jumpTimer = 0;
            // status
            _this._gameOver = false;
            _this._justDown = false;
            _this._justUp = false;
            return _this;
        }
        // -------------------------------------------------------------------------
        Play.prototype.render = function () {
            this._mainLayer.render();
        };
        // -------------------------------------------------------------------------
        Play.prototype.create = function () {
            this.stage.backgroundColor = 0xA0DA6F;
            // camera
            this.camera.bounds = null;
            // physics
            this.physics.arcade.gravity.y = Generator.Parameters.GRAVITY;
            // background
            this._bg = new ShadowySuperCoder.Background(this.game, this.world);
            //Generator.JumpTables.setDebug(true, ShadowySuperCoder.Global);
            Generator.JumpTables.instance;
            // this.game.add.sprite(0, 0, Generator.JumpTables.debugBitmapData);
            this._mainLayer = new ShadowySuperCoder.MainLayer(this.game, this.world);
            // set player
            this._player = new ShadowySuperCoder.Player(this.game);
            this._player.position.set(96, 64 * 1);
            this.world.add(this._player);
            // input
            // key
            this._jumpKey = this.game.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR);
            // mouse
            this.game.input.onDown.add(function () {
                this._justDown = true;
            }, this);
            this.game.input.onUp.add(function () {
                this._justUp = true;
            }, this);
        };
        // -------------------------------------------------------------------------
        Play.prototype.update = function () {
            if (!this._gameOver) {
                this.updatePhysics();
                // move background
                this._bg.updateLayers(this.camera.x);
                // move camera
                this.camera.x = this._player.x - 96;
                // generate level
                this._mainLayer.generate(this.camera.x / Generator.Parameters.CELL_SIZE);
                // check if player is still on screen
                if (this._player.y > this.game.height) {
                    console.log("GAME OVER");
                    this._gameOver = true;
                }
            }
        };
        // -------------------------------------------------------------------------
        Play.prototype.updatePhysics = function () {
            var body = this._player.body;
            // collision with walls
            var wallCollision = this.physics.arcade.collide(this._player, this._mainLayer.walls);
            // move
            if (wallCollision && body.touching.right) {
                body.velocity.set(0, 0);
                this._gameOver = true;
                console.log("GAME OVER");
                return;
            }
            // set body velocity
            body.velocity.x = Generator.Parameters.VELOCITY_X;
            // read keyboard
            if (this._jumpKey.justDown) {
                this._justDown = true;
            }
            if (this._jumpKey.justUp) {
                this._justUp = true;
            }
            var jumpTable = Generator.JumpTables.instance;
            // start jump
            if (this._justDown && body.touching.down && this.game.time.now > this._jumpTimer) {
                body.velocity.y = jumpTable.maxJumpVelocity;
                this._jumpTimer = this.game.time.now + 150;
                this._justDown = false;
            }
            // stop jump
            if (this._justUp && body.velocity.y < jumpTable.minJumpVelocity) {
                body.velocity.y = jumpTable.minJumpVelocity;
            }
            // if down pressed, but player is going up, then clear it
            if (body.velocity.y <= 0) {
                this._justDown = false;
            }
            // if key is released then clear down press
            if (this._justUp) {
                this._justDown = false;
            }
            // just up was processed - clear it
            this._justUp = false;
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
            // music decode / ready for game
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this._ready = false;
            return _this;
        }
        // Preload
        Preload.prototype.preload = function () {
            this.load.image("Block", "assets/Block.png");
            this.load.image("Player", "assets/Player.png");
            this.load.atlas("Sprites", "assets/Sprites.png", "assets/Sprite.json");
            // spriter anim
            this.load.image("Mud", "assets/Mud.png");
            this.load.image("Hill", "assets/Hill.png");
            this.load.image("TreesBg", "assets/TreesBg.png");
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