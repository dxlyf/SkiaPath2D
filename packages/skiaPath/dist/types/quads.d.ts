/**
 * Utilities for dealing with quadratic formulas with one variable:
 *   f(t) = A*t^2 + B*t + C
 */
export declare class SkQuads {
    /**
     * Puts up to 2 real solutions to the equation
     *   A*t^2 + B*t + C = 0
     * in the provided array.
     */
    static RootsReal(A: number, B: number, C: number, solution: number[]): 0 | 1 | 2;
    /**
     * Evaluates the quadratic function with the 3 provided coefficients and the
     * provided variable.
     */
    static EvalAt(A: number, B: number, C: number, t: number): number;
}
