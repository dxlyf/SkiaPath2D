export declare const PI: number;
export declare function nearly_equal(x: number, y: number): boolean;
export declare class SkCubics {
    /**
 * Puts up to 3 real solutions to the equation
 *   A*t^3 + B*t^2 + C*t + d = 0
 * in the provided array and returns how many roots that was.
 */
    static RootsReal(A: number, B: number, C: number, D: number, solution: number[]): number;
    /**
    * Puts up to 3 real solutions to the equation
    *   A*t^3 + B*t^2 + C*t + D = 0
    * in the provided array, with the constraint that t is in the range [0.0, 1.0],
    * and returns how many roots that was.
    */
    static RootsValidT(A: number, B: number, C: number, D: number, solution: number[]): number;
    /**
    * Puts up to 3 real solutions to the equation
    *   A*t^3 + B*t^2 + C*t + D = 0
    * in the provided array, with the constraint that t is in the range [0.0, 1.0],
    * and returns how many roots that was.
    * This is a slower method than RootsValidT, but more accurate in circumstances
    * where floating point error gets too big.
    */
    static BinarySearchRootsValidT(A: number, B: number, C: number, D: number, solution: number[]): number;
    /**
    * Evaluates the cubic function with the 4 provided coefficients and the
    * provided variable.
    */
    static EvalAt(A: number, B: number, C: number, D: number, t: number): number;
    static EvalAt_2(coefficients: number[], t: number): number;
}
