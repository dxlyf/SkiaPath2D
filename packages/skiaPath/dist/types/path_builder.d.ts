import { RRect } from './rrect';
import { Matrix2D } from './matrix';
import { PathDirection, PathFillType, PathVerb } from './path_types';
import { Point } from './point';
import { Rect } from './rect';
declare enum IsA {
    kIsA_JustMoves = 0,// we only have 0 or more moves
    kIsA_MoreThanMoves = 1,// we have verbs other than just move
    kIsA_Oval = 2,// we are 0 or more moves followed by an oval
    kIsA_RRect = 3
}
export declare class PathBuilder {
    static IsA: typeof IsA;
    static default(): PathBuilder;
    static fromPathFillType(fillType: PathFillType): PathBuilder;
    static fromPath(path: PathBuilder): PathBuilder;
    static fromPathBuilder(builder: PathBuilder): PathBuilder;
    fPts: Point[];
    fVerbs: PathVerb[];
    fConicWeights: number[];
    fFillType: PathFillType;
    fIsVolatile: boolean;
    fSegmentMask: number;
    fLastMovePoint: Point;
    fLastMoveIndex: number;
    fNeedsMoveVerb: boolean;
    fIsA: IsA;
    fIsAStart: number;
    fIsACCW: boolean;
    isEmpty(): boolean;
    getFillType(): PathFillType;
    isInverseFillType(): boolean;
    getSegmentMasks(): number;
    countVerbs(): number;
    ensureMove(): void;
    copy(path: PathBuilder): this;
    clone(): PathBuilder;
    reversePathTo(src: PathBuilder): this;
    reverseAddPath(src: PathBuilder): this;
    fillType(): PathFillType;
    computeBounds(): Rect;
    snapshot(): void;
    detach(): void;
    setFillType(ft: PathFillType): this;
    setCanvasFillType(fillRule: CanvasFillRule): this;
    setIsVolatile(isVolatile: boolean): this;
    reset(): void;
    moveTo(x: number, y: number): PathBuilder;
    moveTo(x: Point): PathBuilder;
    lineTo(x: number, y: number): PathBuilder;
    lineTo(x: Point): PathBuilder;
    quadTo(x1: number, y1: number, x2: number, y2: number): PathBuilder;
    quadTo(p1: Point, p2: Point): PathBuilder;
    conicTo(x1: number, y1: number, x2: number, y2: number, w: number): PathBuilder;
    conicTo(p1: Point, p2: Point, w: number): PathBuilder;
    cubicTo(x1: number, y1: number, x2: number, y2: number, x3: number, y3: number): PathBuilder;
    cubicTo(p1: Point, p2: Point, p3: Point): PathBuilder;
    close(): this;
    get lastPoint(): Point;
    setLastPoint(x: number, y: number): void;
    polylineTo(pts: Point[], count?: number): this;
    rLineTo(x: number, y: number): PathBuilder;
    rQuadTo(p1: Point, p2: Point): PathBuilder;
    rConicTo(p1: Point, p2: Point, w: number): PathBuilder;
    rCubicTo(p1: Point, p2: Point, p3: Point): PathBuilder;
    /** Appends arc to the builder. Arc added is part of ellipse
        bounded by oval, from startAngle through sweepAngle. Both startAngle and
        sweepAngle are measured in degrees, where zero degrees is aligned with the
        positive x-axis, and positive sweeps extends arc clockwise.

        arcTo() adds line connecting the builder's last point to initial arc point if forceMoveTo
        is false and the builder is not empty. Otherwise, added contour begins with first point
        of arc. Angles greater than -360 and less than 360 are treated modulo 360.

        @param oval          bounds of ellipse containing arc
        @param startAngleDeg starting angle of arc in degrees
        @param sweepAngleDeg sweep, in degrees. Positive is clockwise; treated modulo 360
        @param forceMoveTo   true to start a new contour with arc
        @return              reference to the builder
    */
    arcToOval(oval: Rect, startAngleDeg: number, sweepAngleDeg: number, forceMoveTo: boolean): PathBuilder;
    arcTo(p1: Point, p2: Point, radius: number): this;
    arcTo(oval: Rect, startAngle: number, sweepAngle: number, forceMoveTo: boolean): this;
    /** Appends arc to SkPath. Arc is implemented by one or more conic weighted to describe
        part of oval with radii (r.x, r.y) rotated by xAxisRotate degrees. Arc curves
        from last SkPath SkPoint to (xy.x, xy.y), choosing one of four possible routes:
        clockwise or counterclockwise,
        and smaller or larger.

        Arc sweep is always less than 360 degrees. arcTo() appends line to xy if either
        radii are zero, or if last SkPath SkPoint equals (xy.x, xy.y). arcTo() scales radii r to
        fit last SkPath SkPoint and xy if both are greater than zero but too small to describe
        an arc.

        arcTo() appends up to four conic curves.
        arcTo() implements the functionality of SVG arc, although SVG sweep-flag value is
        opposite the integer value of sweep; SVG sweep-flag uses 1 for clockwise, while
        kCW_Direction cast to int is zero.

        @param r            radii on axes before x-axis rotation
        @param xAxisRotate  x-axis rotation in degrees; positive values are clockwise
        @param largeArc     chooses smaller or larger arc
        @param sweep        chooses clockwise or counterclockwise arc
        @param xy           end of arc
        @return             reference to SkPath
    */
    arcTo(r: Point, xAxisRotate: number, largeArc: number, sweep: PathDirection, xy: Point): this;
    /** Appends arc to the builder, as the start of new contour. Arc added is part of ellipse
        bounded by oval, from startAngle through sweepAngle. Both startAngle and
        sweepAngle are measured in degrees, where zero degrees is aligned with the
        positive x-axis, and positive sweeps extends arc clockwise.

        If sweepAngle <= -360, or sweepAngle >= 360; and startAngle modulo 90 is nearly
        zero, append oval instead of arc. Otherwise, sweepAngle values are treated
        modulo 360, and arc may or may not draw depending on numeric rounding.

        @param oval          bounds of ellipse containing arc
        @param startAngleDeg starting angle of arc in degrees
        @param sweepAngleDeg sweep, in degrees. Positive is clockwise; treated modulo 360
        @return              reference to this builder
    */
    addArc(oval: Rect, startAngle: number, sweepAngle: number): this;
    addRect(rect: Rect, dir?: PathDirection): this;
    addRect(rect: Rect, dir?: PathDirection, index?: number): this;
    addOval(oval: Rect, dir?: PathDirection, index?: number): this;
    addRRect(rrect: RRect, dir?: PathDirection, index?: number): this;
    addCircle(x: number, y: number, r: number, dir?: PathDirection): this;
    addPolygon(pts: Point[], count: number, isClosed: boolean): this;
    getBounds(): Rect;
    computeTightBounds(): Rect;
    contains(x: number, y: number, fillRule?: CanvasFillRule): number | boolean;
    addPath(path: PathBuilder): this;
    incReserve(extraPtCount: number, extraVerbCount?: number): void;
    transform(matrix: Matrix2D): this | undefined;
    getLastPt(lastPt?: Point): boolean;
    offset(dx: number, dy: number): void;
    toggleInverseFillType(): this;
    isZeroLengthSincePoint(start_pt_index: number): boolean;
    [Symbol.iterator](): Iterator<{
        type: PathVerb;
        p0: Point;
        p1?: Point;
        p2?: Point;
        p3?: Point;
    }>;
    toCanvas(ctx: CanvasRenderingContext2D | Path2D): void;
    toPath2D(): Path2D;
    toSvgPath(): string;
}
export declare function pointInPath(x: number, y: number, path: PathBuilder): number | boolean;
export {};
