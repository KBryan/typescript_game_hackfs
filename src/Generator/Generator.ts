namespace Generator {
    export class Generator {
        private _rnd:Phaser.RandomDataGenerator;
        private _jumpTables:JumpTables;
        private _piecesPool:Helper.Pool<Piece>;
        private _lastGeneratedPiece:Piece = null;
        //
        public constructor(rnd:Phaser.RandomDataGenerator) {
            // random number generator
            this._rnd = rnd;
            // reference to jump tables
            this._jumpTables = JumpTables.instance;
            // pool pieces
            this._piecesPool = new Helper.Pool<Generator.Piece>(Piece,16);
        }
        private createPiece():Piece {
            let piece = this._piecesPool.createItem();
            if(piece === null) {
                console.error("No free pieces in pool");
            }
            return piece;
        }
        public destroyPiece(piece:Piece): void {
            this._piecesPool.destroyItem(piece);
        }
        public setPiece(x: number, y: number, length: number, offsetX: number = 0, offsetY: number = 0): Piece {
            let piece = this.createPiece();
            piece.position.set(x, y);
            piece.offset.set(offsetX, offsetY);
            piece.length = length;
            return piece;
        }
        public generate(lastPosition:Phaser.Point):Piece {
            let piece = this.createPiece();
            let ubound = Parameters.UBOUND;
            let lbound = Parameters.LBOUND;
            // Y Position
            // how high can jump max
            let minY = this._jumpTables.maxOffsetY();
            // fall max
            let maxY = lbound - ubound;
            // clear last y from upper bound force to start from 0
            let currentY = lastPosition.y - ubound;
            // new randomness y position - each y level on screen has the same probability
            let shiftY = this._rnd.integerInRange(0,lbound - ubound);
            // substract currentY from shiftY split y levels to negative (step up -) (step down +)
            shiftY -= currentY;
            // clamp step
            shiftY = Phaser.Math.clamp(shiftY,minY,maxY);
            // new level for platform
            let newY = Phaser.Math.clamp(currentY + shiftY,0, lbound - ubound);
            // shift by upper bound to get right y
            piece.position.y = newY + ubound;
            // shift by upper bound to get right y on screen
            piece.offset.y = piece.position.y - lastPosition.y;
            // X POSITION
            let minX = this._jumpTables.minOffsetX(newY - currentY);
            let maxX = this._jumpTables.maxOffsetX(newY - currentY);
            // position of next tile in x direction
            let shiftX = this._rnd.integerInRange(minX,maxX);
            // new absolute x position
            piece.position.x = lastPosition.x + shiftX;
            // offset of new piece relative to last positon
            piece.offset.x = shiftX;
            // length
            piece.length = this._rnd.integerInRange(3,5);
            // returned result
            this._lastGeneratedPiece = piece;
            return piece;
        }
    }
}