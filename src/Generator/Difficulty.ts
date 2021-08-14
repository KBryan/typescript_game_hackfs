namespace Generator {

    export class Difficulty {

        private _rnd: Phaser.RandomDataGenerator;

        // platform length
        private _platformLengthDecrease: number;
        // jump length
        private _jumpLengthDecrease: number;
        // bonus jump probability
        private _bonusJumpProbability: number;
        // bonus jump count
        private _bonusJumpCount:number;
        /**
         * // TODO: comment Difficulty
         * Gets script version
         * @param fileName
         * @returns script version
         */
        // -------------------------------------------------------------------------
        public constructor(rnd: Phaser.RandomDataGenerator) {
            this._rnd = rnd;
            //initial bonus jump probability
            this._bonusJumpProbability = Parameters.BONUS_JUMP_PROB_MIN;
            // initial bonus jump count
            this._bonusJumpCount = Parameters.BONUS_JUMP_COUNT_MIN;

            // maximum length of platform
            this._platformLengthDecrease = Parameters.PLATFORM_LENGTH_DECREASER_MIN;
            // jump width decreaser to make jumps easier in game beginnig
            this._jumpLengthDecrease = Parameters.JUMP_LENGTH_DECREASER_MIN;
        }

        // -------------------------------------------------------------------------
        public get platformLengthDecrease(): number {
            return this._platformLengthDecrease;
        }

        // -------------------------------------------------------------------------
        public get jumpLengthDecrease(): number {
            return this._jumpLengthDecrease;
        }

        public get bonusJumpProbability(): number {
            return this._bonusJumpProbability;
        }
// -------------------------------------------------------------------------
        public get bonusJumpCount(): number {
            return this._bonusJumpCount;
        }

        // -------------------------------------------------------------------------
        public mapLinear(x: number, a1: number, a2: number, b1: number, b2: number): number {
            x = Phaser.Math.clamp(x, a1, a2);
            return Phaser.Math.mapLinear(x, a1, a2, b1, b2);
        }

        // -------------------------------------------------------------------------
        public update(tileX: number): void {
            // platform length
            this._platformLengthDecrease = Math.round(this.mapLinear(tileX,
                Parameters.PLATFORM_LENGTH_DECREASER_START_TITLE,
                Parameters.PLATFORM_LENGTH_DECREASER_END_TITLE,
                Parameters.PLATFORM_LENGTH_DECREASER_MIN,
                Parameters.PLATFORM_LENGTH_DECREASER_MAX));

            // jump length
            this._jumpLengthDecrease = Math.round(this.mapLinear(tileX,
                Parameters.JUMP_LENGTH_DECREASER_MAX_START_TITLE,
                Parameters.JUMP_LENGTH_DECREASER_END_TITLE,
                Parameters.JUMP_LENGTH_DECREASER_MIN,
                Parameters.JUMP_LENGTH_DECREASER_MAX));

            // bonus jump probability
            this._bonusJumpProbability = Math.round(this.mapLinear(tileX, Parameters.BONUS_JUMP_START_TITLE, Parameters.BONUS_JUMP_END_TITLE, Parameters.BONUS_JUMP_PROB_MIN, Parameters.BONUS_JUMP_PROB_MAX));
// bonus jump count
            this._bonusJumpCount = Math.round(this.mapLinear(tileX, Parameters.BONUS_JUMP_COUNT_START_TITLE, Parameters.BONUS_JUMP_COUNT_START_TITLE, Parameters.BONUS_JUMP_COUNT_MIN, Parameters.BONUS_JUMP_COUNT_MAX));
        }

        // -------------------------------------------------------------------------
        public toString(): string {
            return "platformLengthDecrease: " + this._platformLengthDecrease +
                ", jumpLengthDecrease: " + this.jumpLengthDecrease +
                ", bonusJumpProbability: " + this._bonusJumpProbability +
                ", bonusJumpCount: " + this._bonusJumpCount;
        }
    }
}
