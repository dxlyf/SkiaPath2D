export declare class SkBezierCubic {
    /**
     * Evaluates the cubic Bézier curve for a given t. It returns an X and Y coordinate
     * following the formula, which does the interpolation mentioned above.
     *     X(t) = X_0*(1-t)^3 + 3*X_1*t(1-t)^2 + 3*X_2*t^2(1-t) + X_3*t^3
     *     Y(t) = Y_0*(1-t)^3 + 3*Y_1*t(1-t)^2 + 3*Y_2*t^2(1-t) + Y_3*t^3
     *
     * t is typically in the range [0, 1], but this function will not assert that,
     * as Bézier curves are well-defined for any real number input.
     */
    static EvalAt(curve: number[], t: number): [number, number];
    /**
     * Splits the provided Bézier curve at the location t, resulting in two
     * Bézier curves that share a point (the end point from curve 1
     * and the start point from curve 2 are the same).
     *
     * t must be in the interval [0, 1].
     *
     * The provided twoCurves array will be filled such that indices
     * 0-7 are the first curve (representing the interval [0, t]), and
     * indices 6-13 are the second curve (representing [t, 1]).
     */
    static Subdivide(curve: number[], t: number, twoCurves: number[]): void;
    /**
     * Converts the provided Bézier curve into the the equivalent cubic
     *    f(t) = A*t^3 + B*t^2 + C*t + D
     * where f(t) will represent Y coordinates over time if yValues is
     * true and the X coordinates if yValues is false.
     *
     * In effect, this turns the control points into an actual line, representing
     * the x or y values.
     */
    static ConvertToPolynomial(curve: number[], yValues: boolean): any[];
}
