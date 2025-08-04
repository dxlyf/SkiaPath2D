import { Point } from './point';
import { FloatPoint, Ref, PointerArray } from './util';
import { Rect } from './rect';
import { Matrix2D } from './matrix';
export declare const kMaxConicToQuadPOW2 = 5;
export declare const kMaxConicsForArc = 5;
export declare enum SkCubicType {
    kSerpentine = 0,
    kLoop = 1,
    kLocalCusp = 2,// Cusp at a non-infinite parameter value with an inflection at t=infinity.
    kCuspAtInfinity = 3,// Cusp with a cusp at t=infinity and a local inflection.
    kQuadratic = 4,
    kLineOrPoint = 5
}
export declare enum SkRotationDirection {
    kCW_SkRotationDirection = 0,
    kCCW_SkRotationDirection = 1
}
/** Given a quadratic equation Ax^2 + Bx + C = 0, return 0, 1, 2 roots for the
    equation.
*/
/** From Numerical Recipes in C.

    Q = -1/2 (B + sign(B) sqrt[B*B - 4*A*C])
    x1 = Q / A
    x2 = C / Q
*/
declare function SkFindUnitQuadRoots(A: number, B: number, C: number, roots: PointerArray<number>): number;
declare function SkEvalQuadAt(src: Point[], t: number, pt?: Point, tangent?: Point): Point;
declare function SkEvalQuadTangentAt(src: Point[], t: number): Point;
declare function SkChopQuadAt(src: Point[], dst: Point[], t: number): void;
/**返回一个新的、任意缩放的向量，将给定的向量平分。返回的平分线
将始终指向所提供矢量的内部。
*/
declare function SkFindBisector(a: Point, b: Point): Point;
declare function SkFindQuadMidTangent(src: Point[]): number;
/** Quad'(t) = At + B, where
    A = 2(a - 2b + c)
    B = 2(b - a)
    Solve for t, only if it fits between 0 < t < 1
*/
declare function SkFindQuadExtrema(a: number, b: number, c: number, tValue: number[]): number;
declare function SkChopQuadAtYExtrema(src: Point[], dst: Point[]): number;
declare function SkFindQuadMaxCurvature(src: Point[]): number;
declare function SkEvalCubicTangentAt(src: Point[], t: number, tangent?: Point): Point;
declare function SkEvalCubicPosAt(src: Point[], t: number, out?: Point): Point;
declare function SkEvalCubicAt(src: Point[], t: number, loc: Point | null, tangent: Point | null, curvature: Point | null): void;
/** Cubic'(t) = At^2 + Bt + C, where
A = 3(-a + 3(b - c) + d)
B = 6(a - 2b + c)
C = 3(b - a)
Solve for t, keeping only those that fit betwee 0 < t < 1
*/
declare function SkFindCubicExtrema(a: number, b: number, c: number, d: number, tValues: number[]): number;
declare function SkChopCubicAt_3(src: Point[], dst: Point[], t: number): void;
declare function SkChopCubicAt_4(src: Point[], dst: Point[], t0: number, t1: number): void;
declare function SkChopCubicAt_5(src: Point[], dst: Point[], tValues: ArrayLike<number>, tCount: number): void;
declare function SkChopCubicAtHalf(src: Point[], dst: Point[]): void;
declare function SkFindCubicMidTangent(src: Point[]): number;
/** Given 4 points on a cubic bezier, chop it into 1, 2, 3 beziers such that
    the resulting beziers are monotonic in Y. This is called by the scan
    converter.  Depending on what is returned, dst[] is treated as follows:
    0   dst[0..3] is the original cubic
    1   dst[0..3] and dst[3..6] are the two new cubics
    2   dst[0..3], dst[3..6], dst[6..9] are the three new cubics
    If dst == null, it is ignored and only the count is returned.
*/
declare function SkChopCubicAtYExtrema(src: Point[], dst: Point[]): number;
declare function SkChopCubicAtXExtrema(src: Point[], dst: Point[]): number;
/** http://www.faculty.idc.ac.il/arik/quality/appendixA.html

    Inflection means that curvature is zero.
    Curvature is [F' x F''] / [F'^3]
    So we solve F'x X F''y - F'y X F''y == 0
    After some canceling of the cubic term, we get
    A = b - a
    B = c - 2b + a
    C = d - 3c + 3b - a
    (BxCy - ByCx)t^2 + (AxCy - AyCx)t + AxBy - AyBx == 0
*/
declare function SkFindCubicInflections(src: Point[], tValues: number[]): number;
/**
 *  use for : eval(t) == A * t^2 + B * t + C
 */
export declare class SkQuadCoeff {
    static default(): SkQuadCoeff;
    fA: FloatPoint;
    fB: FloatPoint;
    fC: FloatPoint;
    constructor();
    constructor(src?: Point[]);
    constructor(A?: FloatPoint | Point[], B?: FloatPoint, C?: FloatPoint);
    eval(tt: FloatPoint): FloatPoint;
}
declare function SkFindCubicMaxCurvature(src: Point[], tValues: number[]): number;
declare function SkFindCubicCusp(src: Point[]): number;
declare class SkConic {
    static default(): SkConic;
    static make(count: number): SkConic[];
    fPts: Point[];
    fW: number;
    constructor();
    constructor(pts: Point[], w: number);
    constructor(p0: Point, p1: Point, p2: Point, w: number);
    copy(conic: SkConic): this;
    clone(): SkConic;
    set(pts: Point[], w: number): void;
    set(p0: Point, p1: Point, p2: Point, w: number): void;
    setW(w: number): void;
    chopAt_2(t: number, dst: SkConic[]): boolean;
    chopAt_3(t1: number, t2: number, dst: SkConic): void;
    evalAt(t: number): Point;
    evalAt_3(t: number, pt?: Point, tangent?: Point): void;
    evalTangentAt(t: number): Point;
    chop(dst: SkConic[]): void;
    computeAsQuadError(err: Point): void;
    asQuadTol(tol: number): boolean;
    computeQuadPOW2(tol: number): number;
    chopIntoQuadsPOW2(pts: PointerArray<Point>, pow2: number): number;
    findMidTangent(): number;
    findXExtrema(t: Ref<number>): 0 | 1;
    findYExtrema(t: Ref<number>): 0 | 1;
    chopAtXExtrema(dst: SkConic[]): boolean;
    chopAtYExtrema(dst: SkConic[]): boolean;
    computeTightBounds(bounds: Rect): void;
    computeFastBounds(bounds: Rect): void;
    TransformW(pts: Point[], w: number, matrix: Matrix2D): number;
    static BuildUnitArc(uStart: Point, uStop: Point, dir: SkRotationDirection, userMatrix: Matrix2D, dst: SkConic[]): number;
}
/**
 * 计算二次贝塞尔曲线极值点。
 * @param src 控制点
 * @param extremas 极值点
 * @returns 极值点个数
 */
declare function SkComputeQuadExtremas(src: Point[], extremas: Point[]): number;
/**
 *  计算三次贝塞尔曲线极值点。
 * @param src 控制点数组
 * @param extremas  极值点数组
 * @returns  极值点个数
 */
declare function SkComputeCubicExtremas(src: Point[], extremas: Point[]): number;
declare function SkComputeConicExtremas(src: Point[], w: number, extremas: Point[]): number;
export { SkConic, SkFindCubicExtrema, SkFindCubicMaxCurvature, SkFindBisector, SkFindCubicCusp, SkFindCubicInflections, SkFindCubicMidTangent, SkFindQuadExtrema, SkFindQuadMaxCurvature, SkFindQuadMidTangent, SkFindUnitQuadRoots, SkChopCubicAt_3, SkChopCubicAt_4, SkChopCubicAt_5, SkChopQuadAt, SkEvalQuadAt, SkEvalCubicAt, SkChopCubicAtHalf, SkChopCubicAtXExtrema, SkChopCubicAtYExtrema, SkChopQuadAtYExtrema, SkEvalQuadTangentAt, SkComputeQuadExtremas, SkComputeCubicExtremas, SkComputeConicExtremas, SkEvalCubicTangentAt, SkEvalCubicPosAt };
