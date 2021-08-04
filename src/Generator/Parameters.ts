namespace Generator {
    /**
     * // TODO: comment Parameters
     * Gets script version
     * @param fileName
     * @returns script version
     */
    export class Parameters {
        // bound for generating platforms
        public static UBOUND = 2;
        public static LBOUND = 8;
        // game area
        public static GRID_HEIGHT = 10;
        public static CELL_SIZE = 64;
        public static CELL_STEPS = 4;
        // gravity
        public static GRAVITY = 2400;
        // player body dimensions
        public static PLAYER_BODY_WIDTH = 30;
        public static PLAYER_BODY_HEIGHT = 90;
        // jump height params
        public static HEIGHT_MIN = Parameters.CELL_SIZE * 0.75;
        public static HEIGHT_MAX = Parameters.CELL_SIZE * 2.90;
        public static HEIGHT_STEPS = 4;
        // horizontal speed
        public static VELOCITY_X = 300;
        // difficulty
        public static PLATFORM_LENGTH_MIN = 2;
        public static PLATFORM_LENGTH_MAX = 5;
        public static PLATFORM_LENGTH_DECREASER_MIN = 0;
        public static PLATFORM_LENGTH_DECREASER_MAX = -2;
        public static PLATFORM_LENGTH_DECREASER_START_TITLE = 100;
        public static PLATFORM_LENGTH_DECREASER_END_TITLE = 200;
        // jump length
        public static JUMP_LENGTH_DECREASER_MIN = -1;
        public static JUMP_LENGTH_DECREASER_MAX = 0;
        public static JUMP_LENGTH_DECREASER_MAX_START_TITLE = 0;
        public static JUMP_LENGTH_DECREASER_END_TITLE = 50;
        // probability to generate random piece in percent
        public static GENERATE_RANDOM = 50;
        // keep length of all platforms in pattern the same? (in percent)
        public static KEEP_LENGTH_IN_PATTERN = 75;
    }

}