namespace Generator {
    export class Piece {
        // absolute position of left cell
        public position = new Phaser.Point(0,0);
        // calculate the offset
        public offset = new Phaser.Point(0,0);
        // length in cell /tiles
        public length: number;
        // bonus jump
        public bonusJump:boolean;
    }
}