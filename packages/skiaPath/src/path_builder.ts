
import { RRect } from "./rrect";
import { kMaxConicsForArc, SkComputeConicExtremas, SkComputeCubicExtremas, SkComputeQuadExtremas, SkConic, SkRotationDirection } from "./geometry";
import { Matrix2D } from "./matrix";
import { PathDirection, PathFillType, PathFillType_IsInverse, PathIterVerb, PathSegmentMask, PathVerb } from "./path_types";
import { Point } from "./point";
import { Rect } from "./rect";
import { SK_Scalar1, SK_ScalarHalf, SK_ScalarPI, SK_ScalarRoot2Over2, SkDegreesToRadians, SkDoubleToScalar, SkIntToScalar, SkScalarAbs, SkScalarATan2, SkScalarCeilToInt, SkScalarCos, SkScalarCosSnapToZero, SkScalarFloorToScalar, SkScalarHalf, SkScalarIsFinite, SkScalarNearlyEqual, SkScalarNearlyZero, SkScalarRoundToScalar, SkScalarSignAsInt, SkScalarSin, SkScalarSinSnapToZero, SkScalarSqrt, SkScalarTan } from "./scalar";
import { Ref, copysign } from "./util";
import { PathIter } from './path_iter'
import { tangent_cubic, tangent_line, tangent_quad, winding_cubic, winding_line, winding_quad } from "./path_intersection";
enum IsA {
    kIsA_JustMoves,     // we only have 0 or more moves
    kIsA_MoreThanMoves, // we have verbs other than just move
    kIsA_Oval,          // we are 0 or more moves followed by an oval
    kIsA_RRect,         // we are 0 or more moves followed by a rrect
};
enum ArcSize {
    kSmall_ArcSize, //!< smaller of arc pair
    kLarge_ArcSize, //!< larger of arc pair
};
function nearly_equal(a: Point, b: Point) {
    return SkScalarNearlyEqual(a.x, b.x)
        && SkScalarNearlyEqual(a.y, b.y);
}

function angles_to_unit_vectors(startAngle: number, sweepAngle: number,
    startV: Point, stopV: Point, dir: Ref<SkRotationDirection>) {
    let startRad = startAngle * Math.PI / 180,
        stopRad = (startAngle + sweepAngle) * Math.PI / 180;



    startV.y = SkScalarSinSnapToZero(startRad);
    startV.x = SkScalarCosSnapToZero(startRad);
    stopV.y = SkScalarSinSnapToZero(stopRad);
    stopV.x = SkScalarCosSnapToZero(stopRad);

    /*  If the sweep angle is nearly (but less than) 360, then due to precision
    loss in radians-conversion and/or sin/cos, we may end up with coincident
    vectors, which will fool SkBuildQuadArc into doing nothing (bad) instead
    of drawing a nearly complete circle (good).
    e.g. canvas.drawArc(0, 359.99, ...)
    -vs- canvas.drawArc(0, 359.9, ...)
    We try to detect this edge case, and tweak the stop vector
    */
    if (startV.equals(stopV)) {
        let sw = Math.abs(sweepAngle);
        if (sw < 360 && sw > 359) {
            // make a guess at a tiny angle (in radians) to tweak by
            let deltaRad = copysign(1 / 512, sweepAngle);
            // not sure how much will be enough, so we use a loop
            do {
                stopRad -= deltaRad;
                stopV.y = SkScalarSinSnapToZero(stopRad);
                stopV.x = SkScalarCosSnapToZero(stopRad);
            } while (startV.equals(stopV));
        }
    }
    dir.value = sweepAngle > 0 ? SkRotationDirection.kCW_SkRotationDirection : SkRotationDirection.kCCW_SkRotationDirection

}
function arc_is_lone_point(oval: Rect, startAngle: number, sweepAngle: number, pt: Point) {
    if (0 == sweepAngle && (0 == startAngle || 360 == startAngle)) {
        //Chrome使用此路径进入椭圆形。如果不
        //被视为特殊情况，移动会使椭圆形变形
        //边界框（并打破圆形特殊情况）。
        pt.set(oval.right, oval.centerX);
        return true;
    } else if (0 == oval.width && 0 == oval.height) {
        //Chrome有时会创建0个半径圆形矩形。退化
        //路径中的四段段可防止路径被识别为
        //一个矩形。
        //todo：优化宽度或高度之一的情况
        //也应考虑。但是，这种情况似乎并不是
        //与单点案例一样常见。
        pt.set(oval.right, oval.top);
        return true;
    }
    return false;
}
/**
 *  If this returns 0, then the caller should just line-to the singlePt, else it should
 *  ignore singlePt and append the specified number of conics.
 */
function build_arc_conics(oval: Rect, start: Point, stop: Point, dir: SkRotationDirection, conics: SkConic[], singlePt: Point) {

    let matrix = Matrix2D.fromScale(SkScalarHalf(oval.width), SkScalarHalf(oval.height));
    matrix.postTranslate(oval.centerX, oval.centerY);

    let count = SkConic.BuildUnitArc(start, stop, dir, matrix, conics);
    if (0 == count) {
        matrix.mapXY(stop.x, stop.y, singlePt as any);
    }
    return count;
}
export class PathBuilder {
    static IsA = IsA
    static default() {
        return new this()
    }
    static fromPathFillType(fillType: PathFillType) {
        return this.default().setFillType(fillType);
    }
    static fromPath(path: PathBuilder) {
        return this.default().setFillType(path.getFillType()).addPath(path);
    }
    static fromPathBuilder(builder: PathBuilder) {
        return this.default().setFillType(builder.getFillType()).addPath(builder);
    }
    fPts: Point[] = []
    fVerbs: PathVerb[] = [];
    fConicWeights: number[] = [];
    fFillType: PathFillType = PathFillType.kWinding

    fIsVolatile: boolean = false;

    fSegmentMask: number = PathSegmentMask.kLine_SkPathSegmentMask
    fLastMovePoint = Point.zero();
    fLastMoveIndex: number = -1; // only needed until SkPath is immutable
    fNeedsMoveVerb: boolean = true;


    fIsA: IsA = IsA.kIsA_JustMoves;
    fIsAStart: number = -1;     // tracks direction iff fIsA is not unknown
    fIsACCW = false;  // tracks direction iff fIsA is not unknown
    isEmpty() {
        return this.fVerbs.length == 0;
    }
    getFillType() {
        return this.fFillType;
    }
    isInverseFillType() {
        return PathFillType_IsInverse(this.getFillType());
    }
    getSegmentMasks() {
        return this.fSegmentMask
    }
    // constructor()
    // constructor(fillType:PathFillType)
    // constructor(path:any)
    countVerbs() { return this.fVerbs.length; }

    // called right before we add a (non-move) verb
    ensureMove() {
        this.fIsA = IsA.kIsA_MoreThanMoves;
        if (this.fNeedsMoveVerb) {
            this.moveTo(this.fLastMovePoint.x, this.fLastMovePoint.y);
        }
    }
    copy(path: PathBuilder) {
        this.fVerbs = path.fVerbs.slice()
        this.fPts = path.fPts.map(d => Point.fromPoint(d))
        this.fConicWeights = path.fConicWeights.slice()
        this.fFillType = path.fFillType
        this.fIsVolatile = path.fIsVolatile;
        this.fSegmentMask = path.fSegmentMask
        this.fLastMovePoint.copy(path.fLastMovePoint)
        this.fLastMoveIndex = path.fLastMoveIndex; // only needed
        return this
    }
    clone() {
        const newPath = PathBuilder.default()
        return newPath.copy(this)
    }
    // 忽略第一个轮廓的最后一个点
    reversePathTo(src: PathBuilder) {
        if (src.fVerbs.length == 0) return this;
        const verbsBegin = 0;
        let verbsEnd = src.countVerbs()
        const verbs = src.fVerbs
        const pts = src.fPts
        let ptsIndex = pts.length - 1
        const conicWeights = src.fConicWeights
        let conicWeightsIndex = src.fConicWeights.length

        while (verbsEnd > verbsBegin) {
            let v = verbs[--verbsEnd];
            ptsIndex -= PtsInVerb(v);
            switch (v) {
                case PathVerb.kMove:
                    return this;
                case PathVerb.kLine:
                    this.lineTo(pts[ptsIndex]);
                    break;
                case PathVerb.kQuad:
                    this.quadTo(pts[ptsIndex + 1], pts[ptsIndex]);
                    break;
                case PathVerb.kConic:
                    this.conicTo(pts[ptsIndex + 1], pts[ptsIndex], conicWeights[--conicWeightsIndex]);
                    break;
                case PathVerb.kCubic:
                    this.cubicTo(pts[ptsIndex + 2], pts[ptsIndex + 1], pts[ptsIndex]);
                    break;
                case PathVerb.kClose:
                    break;
                default:
                // SkDEBUGFAIL("unexpected verb");
            }
        }
        return this;
    }

    reverseAddPath(src: PathBuilder) {
        if (src.fVerbs.length == 0) return this;
        const verbsBegin = 0;
        let verbsEnd = src.countVerbs()
        const verbs = src.fVerbs
        const pts = src.fPts
        let ptsIndex = pts.length
        const conicWeights = src.fConicWeights
        let conicWeightsIndex = src.fConicWeights.length

        let needMove = true;
        let needClose = false;
        while (verbsEnd > verbsBegin) {
            let v = verbs[--verbsEnd];
            let n = PtsInVerb(v);

            if (needMove) {
                --ptsIndex;
                this.moveTo(pts[ptsIndex]);
                needMove = false;
            }
            ptsIndex -= n;
            switch (v) {
                case PathVerb.kMove:
                    if (needClose) {
                        this.close();
                        needClose = false;
                    }
                    needMove = true;
                    ptsIndex += 1;   // so we see the point in "if (needMove)" above
                    break;
                case PathVerb.kLine:
                    this.lineTo(pts[ptsIndex]);
                    break;
                case PathVerb.kQuad:
                    this.quadTo(pts[ptsIndex + 1], pts[ptsIndex]);
                    break;
                case PathVerb.kConic:
                    this.conicTo(pts[ptsIndex + 1], pts[ptsIndex], conicWeights[--conicWeightsIndex]);
                    break;
                case PathVerb.kCubic:
                    this.cubicTo(pts[ptsIndex + 2], pts[ptsIndex + 1], pts[ptsIndex]);
                    break;
                case PathVerb.kClose:
                    needClose = true;
                    break;
                default:
                // SkDEBUGFAIL("unexpected verb");
            }
        }
        return this;
    }

    fillType() {
        return this.fFillType
    }
    computeBounds() {
        let bounds = Rect.makeEmpty(), fPts = this.fPts;
        bounds.setBounds(fPts, fPts.length);
        return bounds;
    }

    snapshot() {

    }  // the builder is unchanged after returning this path
    detach()    // the builder is reset to empty after returning this path
    {
        // let path = this.make(new SkPathRef(std.move(fPts),
        //                                               std.move(fVerbs),
        //                                               std.move(fConicWeights),
        //                                               fSegmentMask)));
        this.reset();
        // return path;
    }
    setFillType(ft: PathFillType) { this.fFillType = ft; return this; }
    setCanvasFillType(fillRule: CanvasFillRule) {
        switch (fillRule) {
            case "evenodd":
                return this.setFillType(PathFillType.kEvenOdd);
            case "nonzero":
                return this.setFillType(PathFillType.kWinding);
        }
        return this
    }
    setIsVolatile(isVolatile: boolean) { this.fIsVolatile = isVolatile; return this; }

    reset() {
        this.fPts = []
        this.fVerbs = []
        this.fConicWeights = []
        this.fFillType = PathFillType.kWinding;
        this.fIsVolatile = false;

        // these are internal state

        this.fSegmentMask = 0;
        this.fLastMovePoint = Point.zero();
        this.fLastMoveIndex = -1;        // illegal
        this.fNeedsMoveVerb = true;
        this.fSegmentMask = PathSegmentMask.kLine_SkPathSegmentMask
    }

    moveTo(x: number, y: number): PathBuilder;
    moveTo(x: Point): PathBuilder;
    moveTo(x: Point | number, y?: number) {
        let pt: Point = typeof x === "number" ? Point.create(x, y!) : x;
        // only needed while SkPath is mutable
        this.fLastMoveIndex = this.fPts.length

        this.fPts.push(pt);
        this.fVerbs.push(PathVerb.kMove);
        this.fLastMovePoint.copy(pt);
        this.fNeedsMoveVerb = false;
        return this;
    }

    lineTo(x: number, y: number): PathBuilder;
    lineTo(x: Point): PathBuilder;
    lineTo(x: Point | number, y?: number) {
        let pt: Point = typeof x === "number" ? Point.create(x, y!) : x;

        this.ensureMove();
        this.fPts.push(pt);
        this.fVerbs.push(PathVerb.kLine);
        this.fSegmentMask |= PathSegmentMask.kLine_SkPathSegmentMask;
        return this;
    }
    quadTo(x1: number, y1: number, x2: number, y2: number): PathBuilder
    quadTo(p1: Point, p2: Point): PathBuilder
    quadTo(x1: Point | number, y1: Point | number, x2?: number, y2?: number) {
        let pt1: Point = typeof x1 === "number" ? Point.create(x1, y1 as number) : x1;
        let pt2: Point = typeof y1 === "number" ? Point.create(x2!, y2!) : y1;
        this.ensureMove();

        this.fPts.push(pt1);
        this.fPts.push(pt2);
        this.fVerbs.push(PathVerb.kQuad);

        this.fSegmentMask |= PathSegmentMask.kQuad_SkPathSegmentMask;
        return this;
    }

    conicTo(x1: number, y1: number, x2: number, y2: number, w: number): PathBuilder
    conicTo(p1: Point, p2: Point, w: number): PathBuilder
    conicTo(x1: Point | number, y1: Point | number, x2: number, y2?: number, w?: number) {
        let pt1: Point = typeof x1 === "number" ? Point.create(x1, y1 as number) : x1;
        let pt2: Point = typeof y1 === "number" ? Point.create(x2, y2!) : y1;
        let weight = typeof x1 === 'number' ? w! : x2!;

        // check for <= 0 or NaN with this test
        if (!(weight > 0)) {
            this.lineTo(pt1);
        } else if (!SkScalarIsFinite(weight)) {
            this.lineTo(pt1);
            this.lineTo(pt2);
        } else if (SK_Scalar1 == w) {
            this.quadTo(pt1, pt2);
        } else {
            this.ensureMove()
            // 用三次贝塞尔曲线近似代替conicTo
            let lastPoint = this.lastPoint
            const ww = (4 * weight) / (3 * (1 + weight))
            let cp0X = lastPoint.x + (pt1.x - lastPoint.x) * ww
            let cp0Y = lastPoint.y + (pt1.y - lastPoint.y) * ww
            let cp1X = pt2.x + (pt1.x - pt2.x) * ww
            let cp1Y = pt2.y + (pt1.y - pt2.y) * ww
            this.cubicTo(cp0X, cp0Y, cp1X, cp1Y, pt2.x, pt2.y)
        }
        this.fSegmentMask |= PathSegmentMask.kConic_SkPathSegmentMask;
        return this;
    }
    cubicTo(x1: number, y1: number, x2: number, y2: number, x3: number, y3: number): PathBuilder
    cubicTo(p1: Point, p2: Point, p3: Point): PathBuilder
    cubicTo(x1: Point | number, y1: Point | number, x2: Point | number, y2?: number, x3?: number, y3?: number) {
        this.ensureMove();
        let pt1: Point = typeof x1 === "number" ? Point.create(x1, y1 as number) : x1;
        let pt2: Point = typeof y1 === "number" ? Point.create(x2 as number, y2!) : y1;
        let pt3: Point = typeof x2 === "number" ? Point.create(x3!, y3! as number) : x2;

        this.fPts.push(pt1);
        this.fPts.push(pt2);
        this.fPts.push(pt3);
        this.fVerbs.push(PathVerb.kCubic);

        this.fSegmentMask |= PathSegmentMask.kCubic_SkPathSegmentMask;
        return this;
    }
    close() {
        if (this.fVerbs.length > 0) {
            this.ensureMove();

            this.fVerbs.push(PathVerb.kClose);

            // fLastMovePoint stays where it is -- the previous moveTo
            this.fNeedsMoveVerb = true;
        }
        return this;
    }
    get lastPoint() {
        return this.fPts[this.fPts.length - 1];
    }
    setLastPoint(x: number, y: number) {
        this.lastPoint.set(x, y)
    }
    // Append a series of lineTo(...)
    polylineTo(pts: Point[], count: number = pts.length) {
        if (pts.length > 0) {
            this.ensureMove();
            for (let i = 0; i < count; ++i) {
                this.fPts.push(pts[i]);
                this.fVerbs.push(PathVerb.kLine);
            }
            this.fSegmentMask |= PathSegmentMask.kLine_SkPathSegmentMask;
        }
        return this;
    }

    rLineTo(x: number, y: number) {
        this.ensureMove();
        return this.lineTo(this.lastPoint.x + x, this.lastPoint.y + y);
    }
    rQuadTo(p1: Point, p2: Point) {
        this.ensureMove();
        let base = this.lastPoint;
        return this.quadTo(base.x + p1.x, base.y + p1.y, base.x + p2.x, base.y + p2.y);
    }

    rConicTo(p1: Point, p2: Point, w: number) {
        this.ensureMove();
        let base = this.lastPoint;
        return this.conicTo(base.x + p1.x, base.y + p1.y, base.x + p2.x, base.y + p2.y, w);
    }
    rCubicTo(p1: Point, p2: Point, p3: Point) {
        this.ensureMove();
        let base = this.lastPoint;
        return this.cubicTo(base.x + p1.x, base.y + p1.y, base.x + p2.x, base.y + p2.y, base.x + p3.x, base.y + p3.y);
    }

    // Arcs

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
    arcToOval(oval: Rect, startAngleDeg: number, sweepAngleDeg: number, forceMoveTo: boolean) {
        if (oval.width < 0 || oval.height < 0) {
            return this;
        }

        const fVerbs = this.fVerbs

        if (fVerbs.length <= 0) {
            forceMoveTo = true;
        }

        let lonePt = Point.default();
        if (arc_is_lone_point(oval, startAngleDeg, sweepAngleDeg, lonePt)) {
            return forceMoveTo ? this.moveTo(lonePt) : this.lineTo(lonePt);
        }

        let startV = Point.default(), stopV = Point.default(), dir = Ref.from(SkRotationDirection.kCW_SkRotationDirection);

        angles_to_unit_vectors(startAngleDeg, sweepAngleDeg, startV, stopV, dir);

        let singlePt = Point.default();

        // Adds a move-to to 'pt' if forceMoveTo is true. Otherwise a lineTo unless we're sufficiently
        // close to 'pt' currently. This prevents spurious lineTos when adding a series of contiguous
        // arcs from the same oval.
        let addPt = (pt: Point) => {
            if (forceMoveTo) {
                this.moveTo(pt);
            } else if (!nearly_equal(this.lastPoint, pt)) {
                this.lineTo(pt);
            }
        };

        // At this point, we know that the arc is not a lone point, but startV == stopV
        // indicates that the sweepAngle is too small such that angles_to_unit_vectors
        // cannot handle it.
        if (startV.equals(stopV)) {
            let endAngle = SkDegreesToRadians(startAngleDeg + sweepAngleDeg);
            let radiusX = oval.width / 2;
            let radiusY = oval.height / 2;
            // We do not use SkScalar[Sin|Cos]SnapToZero here. When sin(startAngle) is 0 and sweepAngle
            // is very small and radius is huge, the expected behavior here is to draw a line. But
            // calling SkScalarSinSnapToZero will make sin(endAngle) be 0 which will then draw a dot.
            singlePt.set(oval.centerX + radiusX * SkScalarCos(endAngle),
                oval.centerY + radiusY * SkScalarSin(endAngle));
            addPt(singlePt);
            return this;
        }

        let conics = SkConic.make(5);
        let count = build_arc_conics(oval, startV, stopV, dir.value, conics, singlePt);
        if (count) {
            this.incReserve(count * 2 + 1);
            const pt = conics[0].fPts[0];
            addPt(pt);
            for (let i = 0; i < count; ++i) {
                this.conicTo(conics[i].fPts[1], conics[i].fPts[2], conics[i].fW);
            }
        } else {
            addPt(singlePt);
        }
        return this;
    }
    arcTo(p1: Point, p2: Point, radius: number): this
    arcTo(oval: Rect, startAngle: number, sweepAngle: number, forceMoveTo: boolean): this
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
    arcTo(r: Point, xAxisRotate: number, largeArc: number, sweep: PathDirection, xy: Point): this
    arcTo(rOrP1OrOval: Point | Rect, p2OrStartAngleOrXAxis: Point | number, radiusOrLargeArcOrSweep: number, sweepOrForceMoveTo?: PathDirection | boolean, xy?: Point) {
        const argLength = arguments.length, fVerbs = this.fVerbs, fPts = this.fPts;

        if (argLength === 3) {
            const p1 = rOrP1OrOval as Point, p2 = p2OrStartAngleOrXAxis as Point, radius = radiusOrLargeArcOrSweep as number;
            this.ensureMove();

            if (radius == 0) {
                return this.lineTo(p1);
            }

            // need to know our prev pt so we can construct tangent vectors
            let start = this.lastPoint;

            // need double precision for these calcs.
            let befored = Point.create(p1.x - start.x, p1.y - start.y).toNormalize();
            let afterd = Point.create(p2.x - p1.x, p2.y - p1.y).toNormalize();
            let cosh = befored.dot(afterd)
            let sinh = befored.cross(afterd);

            // If the previous point equals the first point, befored will be denormalized.
            // If the two points equal, afterd will be denormalized.
            // If the second point equals the first point, sinh will be zero.
            // In all these cases, we cannot construct an arc, so we construct a line to the first point.
            if (!befored.isFinite() || !afterd.isFinite() || SkScalarNearlyZero(SkDoubleToScalar(sinh))) {
                return this.lineTo(p1);
            }

            // safe to convert back to floats now
            let dist = SkScalarAbs(SkDoubleToScalar(radius * (1 - cosh) / sinh));//(1 - cosh) / sinh)=crd
            let xx = p1.x - dist * befored.x;
            let yy = p1.y - dist * befored.y;

            let after = Point.create(afterd.x, afterd.y);
            after.setLength(dist);
            this.lineTo(xx, yy);
            let weight = SkScalarSqrt(SkDoubleToScalar(SK_ScalarHalf + cosh * 0.5));
            return this.conicTo(p1, p1.clone().add(after), weight);
        } else if (argLength === 4) {
            let oval = rOrP1OrOval as Rect, startAngle = p2OrStartAngleOrXAxis as number, sweepAngle = radiusOrLargeArcOrSweep as number,
                forceMoveTo = sweepOrForceMoveTo as boolean;
            if (oval.width < 0 || oval.height < 0) {
                return this;
            }

            if (fVerbs.length <= 0) {
                forceMoveTo = true;
            }

            let lonePt = Point.default();
            if (arc_is_lone_point(oval, startAngle, sweepAngle, lonePt)) {
                return forceMoveTo ? this.moveTo(lonePt) : this.lineTo(lonePt);
            }

            let startV = Point.default(), stopV = Point.default();
            let dir = Ref.from(SkRotationDirection.kCW_SkRotationDirection)
            angles_to_unit_vectors(startAngle, sweepAngle, startV, stopV, dir);

            let singlePt = Point.default();

            // Adds a move-to to 'pt' if forceMoveTo is true. Otherwise a lineTo unless we're sufficiently
            // close to 'pt' currently. This prevents spurious lineTos when adding a series of contiguous
            // arcs from the same oval.
            let addPt = (pt: Point) => {
                if (forceMoveTo) {
                    this.moveTo(pt);
                } else if (!nearly_equal(fPts[this.fPts.length - 1], pt)) {
                    this.lineTo(pt);
                }
            };

            // At this point, we know that the arc is not a lone point, but startV == stopV
            // indicates that the sweepAngle is too small such that angles_to_unit_vectors
            // cannot handle it.
            if (startV.equalsEpsilon(stopV)) {
                let endAngle = SkDegreesToRadians(startAngle + sweepAngle);
                let radiusX = oval.width / 2;
                let radiusY = oval.height / 2;
                // We do not use SkScalar[Sin|Cos]SnapToZero here. When sin(startAngle) is 0 and sweepAngle
                // is very small and radius is huge, the expected behavior here is to draw a line. But
                // calling SkScalarSinSnapToZero will make sin(endAngle) be 0 which will then draw a dot.
                singlePt.set(oval.centerX + radiusX * SkScalarCos(endAngle),
                    oval.centerY + radiusY * SkScalarSin(endAngle));
                addPt(singlePt);
                return this;
            }

            let conics = SkConic.make(kMaxConicsForArc);
            let count = build_arc_conics(oval, startV, stopV, dir.value, conics, singlePt);
            if (count) {
                this.incReserve(count * 2 + 1);
                const pt = conics[0].fPts[0];
                addPt(pt);
                for (let i = 0; i < count; ++i) {
                    this.conicTo(conics[i].fPts[1], conics[i].fPts[2], conics[i].fW);
                }
            } else {
                addPt(singlePt);
            }
            return this;
        } else {
            let rad = rOrP1OrOval as Point, angle = p2OrStartAngleOrXAxis as number,
                arcLarge = radiusOrLargeArcOrSweep as number, arcSweep = sweepOrForceMoveTo as number, endPt = xy as Point;

            this.ensureMove();

            let srcPts = [this.lastPoint.clone(), endPt]

            // If rx = 0 or ry = 0 then this arc is treated as a straight line segment (a "lineto")
            // joining the endpoints.
            // http://www.w3.org/TR/SVG/implnote.html#ArcOutOfRangeParameters
            if (!rad.x || !rad.y) {
                return this.lineTo(endPt);
            }
            // If the current point and target point for the arc are identical, it should be treated as a
            // zero length path. This ensures continuity in animations.
            if (srcPts[0] == srcPts[1]) {
                return this.lineTo(endPt);
            }
            let rx = SkScalarAbs(rad.x);
            let ry = SkScalarAbs(rad.y);
            let midPointDistance = srcPts[0].clone().subtract(srcPts[1]);
            midPointDistance.multiplyScalar(0.5)

            let pointTransform = Matrix2D.identity();
            pointTransform.setRotate(-angle);

            let transformedMidPoint = Point.default();
            pointTransform.mapPoints([transformedMidPoint] as any, [midPointDistance] as any);
            let squareRx = rx * rx;
            let squareRy = ry * ry;
            let squareX = transformedMidPoint.x * transformedMidPoint.x;
            let squareY = transformedMidPoint.y * transformedMidPoint.y;

            // Check if the radii are big enough to draw the arc, scale radii if not.
            // http://www.w3.org/TR/SVG/implnote.html#ArcCorrectionOutOfRangeRadii
            let radiiScale = squareX / squareRx + squareY / squareRy;
            if (radiiScale > 1) {
                radiiScale = SkScalarSqrt(radiiScale);
                rx *= radiiScale;
                ry *= radiiScale;
            }

            pointTransform.setScale(1 / rx, 1 / ry);
            pointTransform.preRotate(-angle);

            let unitPts = [Point.default(), Point.default()];
            pointTransform.mapPoints(unitPts as any, srcPts as any);
            let delta = unitPts[1].clone().subtract(unitPts[0]);

            let d = delta.x * delta.x + delta.y * delta.y;
            let scaleFactorSquared = Math.max(1 / d - 0.25, 0);

            let scaleFactor = SkScalarSqrt(scaleFactorSquared);
            if ((arcSweep == PathDirection.kCCW) != Boolean(arcLarge)) {  // flipped from the original implementation
                scaleFactor = -scaleFactor;
            }
            delta.multiplyScalar(scaleFactor);
            let centerPoint = unitPts[0].clone().add(unitPts[1]);
            centerPoint.multiplyScalar(0.5);
            centerPoint.translate(-delta.y, delta.x);
            unitPts[0].subtract(centerPoint);
            unitPts[1].subtract(centerPoint);
            let theta1 = SkScalarATan2(unitPts[0].y, unitPts[0].x);
            let theta2 = SkScalarATan2(unitPts[1].y, unitPts[1].x);
            let thetaArc = theta2 - theta1;
            if (thetaArc < 0 && (arcSweep == PathDirection.kCW)) {  // arcSweep flipped from the original implementation
                thetaArc += SK_ScalarPI * 2;
            } else if (thetaArc > 0 && (arcSweep != PathDirection.kCW)) {  // arcSweep flipped from the original implementation
                thetaArc -= SK_ScalarPI * 2;
            }

            // Very tiny angles cause our subsequent math to go wonky (skbug.com/9272)
            // so we do a quick check here. The precise tolerance amount is just made up.
            // PI/million happens to fix the bug in 9272, but a larger value is probably
            // ok too.
            if (SkScalarAbs(thetaArc) < (SK_ScalarPI / (1000 * 1000))) {
                return this.lineTo(endPt);
            }

            pointTransform.setRotate(angle);
            pointTransform.preScale(rx, ry);

            // the arc may be slightly bigger than 1/4 circle, so allow up to 1/3rd
            let segments = SkScalarCeilToInt(SkScalarAbs(thetaArc / (2 * SK_ScalarPI / 3)));
            let thetaWidth = thetaArc / segments;
            let t = SkScalarTan(0.5 * thetaWidth);
            if (!SkScalarIsFinite(t)) {
                return this;
            }
            let startTheta = theta1;
            let w = SkScalarSqrt(SK_ScalarHalf + SkScalarCos(thetaWidth) * SK_ScalarHalf);
            let scalar_is_integer = (scalar: number) => {
                return scalar == SkScalarFloorToScalar(scalar);
            };
            let expectIntegers = SkScalarNearlyZero(SK_ScalarPI / 2 - SkScalarAbs(thetaWidth)) &&
                scalar_is_integer(rx) && scalar_is_integer(ry) &&
                scalar_is_integer(endPt.x) && scalar_is_integer(endPt.y);

            for (let i = 0; i < segments; ++i) {
                let endTheta = startTheta + thetaWidth,
                    sinEndTheta = SkScalarSinSnapToZero(endTheta),
                    cosEndTheta = SkScalarCosSnapToZero(endTheta);

                unitPts[1].set(cosEndTheta, sinEndTheta);
                unitPts[1].add(centerPoint);
                unitPts[0].copy(unitPts[1]);
                unitPts[0].translate(t * sinEndTheta, -t * cosEndTheta);
                let mapped = [Point.default(), Point.default()];
                pointTransform.mapPoints(mapped as any, unitPts as any);
                /*
                Computing the arc width introduces rounding errors that cause arcs to start
                outside their marks. A round rect may lose convexity as a result. If the input
                values are on integers, place the conic on integers as well.
                 */
                if (expectIntegers) {
                    for (let point of mapped) {
                        point.x = SkScalarRoundToScalar(point.x);
                        point.y = SkScalarRoundToScalar(point.y);
                    }
                }
                this.conicTo(mapped[0], mapped[1], w);
                startTheta = endTheta;
            }

            // The final point should match the input point (by definition); replace it to
            // ensure that rounding errors in the above math don't cause any problems.
            fPts[fPts.length - 1].copy(endPt)
        }
        return this
    }
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
    addArc(oval: Rect, startAngle: number, sweepAngle: number) {
        if (oval.isEmpty() || 0 == sweepAngle) {
            return this;
        }

        const kFullCircleAngle = SkIntToScalar(360);

        if (sweepAngle >= kFullCircleAngle || sweepAngle <= -kFullCircleAngle) {
            // We can treat the arc as an oval if it begins at one of our legal starting positions.
            // See SkPath.addOval() docs.
            let startOver90 = startAngle / 90;
            let startOver90I = SkScalarRoundToScalar(startOver90);
            let error = startOver90 - startOver90I;
            if (SkScalarNearlyEqual(error, 0)) {
                // Index 1 is at startAngle == 0.
                let startIndex = ((startOver90I + 1) % 4);
                startIndex = startIndex < 0 ? startIndex + 4 : startIndex;
                return this.addOval(oval, sweepAngle > 0 ? PathDirection.kCW : PathDirection.kCCW,
                    startIndex);
            }
        }
        return this.arcTo(oval, startAngle, sweepAngle, true);
    }

    // Add a new contour
    addRect(rect: Rect, dir?: PathDirection): this
    addRect(rect: Rect, dir?: PathDirection, index?: number): this
    addRect(rect: Rect, dir: PathDirection = PathDirection.kCW, index: number = 1) {
        const kPts = 4;   // moveTo + 3 lines
        const kVerbs = 5;   // moveTo + 3 lines + close
        // this.incReserve(kPts, kVerbs);

        let iter = new RectPointIterator(rect, dir, index);

        this.moveTo(iter.current);
        this.lineTo(iter.next());
        this.lineTo(iter.next());
        this.lineTo(iter.next());
        return this.close();
    }
    addOval(oval: Rect, dir: PathDirection = PathDirection.kCW, index: number = 0) {
        const prevIsA = this.fIsA;

        const kPts = 9;   // moveTo + 4 conics(2 pts each)
        const kVerbs = 6;   // moveTo + 4 conics + close
        this.incReserve(kPts, kVerbs);

        let ovalIter = new OvalPointIterator(oval, dir, index);
        let rectIter = new RectPointIterator(oval, dir, index + (dir == PathDirection.kCW ? 0 : 1));

        // The corner iterator pts are tracking "behind" the oval/radii pts.

        this.moveTo(ovalIter.current);
        for (let i = 0; i < 4; ++i) {
            this.conicTo(rectIter.next(), ovalIter.next(), SK_ScalarRoot2Over2);
        }
        this.close();

        if (prevIsA == IsA.kIsA_JustMoves) {
            this.fIsA = IsA.kIsA_Oval;
            this.fIsACCW = (dir == PathDirection.kCCW);
            this.fIsAStart = index % 4;
        }
        return this;
    }
    addRRect(rrect: RRect, dir: PathDirection = PathDirection.kCW, index: number = dir == PathDirection.kCW ? 6 : 7) {
        const prevIsA = this.fIsA;
        const bounds = rrect.getBounds();

        if (rrect.isRect() || rrect.isEmpty()) {

            // degenerate(rect) => radii points are collapsing
            this.addRect(bounds, dir, (index + 1) / 2);
        } else if (rrect.isOval()) {
            // degenerate(oval) => line points are collapsing
            this.addOval(bounds, dir, index / 2);
        } else {

            // we start with a conic on odd indices when moving CW vs. even indices when moving CCW
            const startsWithConic = ((index & 1) == Number(dir == PathDirection.kCW));
            const weight = SK_ScalarRoot2Over2;

            const kVerbs = startsWithConic
                ? 9   // moveTo + 4x conicTo + 3x lineTo + close
                : 10; // moveTo + 4x lineTo + 4x conicTo + close
            this.incReserve(kVerbs);

            let rrectIter = new RRectPointIterator(rrect, dir, index);
            // Corner iterator indices follow the collapsed radii model,
            // adjusted such that the start pt is "behind" the radii start pt.
            const rectStartIndex = index / 2 + (dir == PathDirection.kCW ? 0 : 1);
            let rectIter = new RectPointIterator(bounds, dir, rectStartIndex);

            this.moveTo(rrectIter.current);
            if (startsWithConic) {
                for (let i = 0; i < 3; ++i) {
                    this.conicTo(rectIter.next(), rrectIter.next(), weight);
                    this.lineTo(rrectIter.next());
                }
                this.conicTo(rectIter.next(), rrectIter.next(), weight);
                // final lineTo handled by close().
            } else {
                for (let i = 0; i < 4; ++i) {
                    this.lineTo(rrectIter.next());
                    this.conicTo(rectIter.next(), rrectIter.next(), weight);
                }
            }
            this.close();
        }

        if (prevIsA == IsA.kIsA_JustMoves) {
            this.fIsA = IsA.kIsA_RRect;
            this.fIsACCW = (dir == PathDirection.kCCW);
            this.fIsAStart = index % 8;
        }
        return this;
    }

    addCircle(x: number, y: number, r: number, dir = PathDirection.kCW) {
        if (r >= 0) {
            this.addOval(Rect.makeLTRB(x - r, y - r, x + r, y + r), dir);
        }
        return this;
    }


    addPolygon(pts: Point[], count: number, isClosed: boolean) {
        if (count <= 0) {
            return this;
        }

        this.moveTo(pts[0]);
        this.polylineTo(pts.slice(1), count - 1);
        if (isClosed) {
            this.close();
        }
        return this;
    }
    getBounds() {
        const bounds = Rect.makeLTRB(Infinity, Infinity, -Infinity, -Infinity)
        bounds.setBounds(this.fPts, this.fPts.length)
        return bounds
    }
    computeTightBounds() {
        if (0 == this.countVerbs()) {
            return Rect.makeEmpty();
        }

        if (this.getSegmentMasks() == PathSegmentMask.kLine_SkPathSegmentMask) {
            return this.getBounds();
        }

        let extremas = new Array(5).fill(0).map(() => Point.default()); // big enough to hold worst-case curve type (cubic) extremas + 1

        // initial with the first MoveTo, so we don't have to check inside the switch
        let min = Point.create(Infinity,Infinity), max = Point.create(-Infinity, -Infinity)
        let pts = this.fPts, k = 0, wIndex = 0
        for (let i = 0; i < this.fVerbs.length; ++i) {
            let count = 0;
            let verb = this.fVerbs[i];
            switch (verb) {
                case PathVerb.kMove:
                    extremas[0].copy(pts[k]);
                    k += 1;
                    count = 1;
                    break;
                case PathVerb.kLine:
                    extremas[0].copy(pts[k]);
                    k += 1
                    count = 1;
                    break;
                case PathVerb.kQuad:
                    let p = [pts[k - 1], pts[k], pts[k + 1]]
                    count = SkComputeQuadExtremas(p, extremas);
                    k += 2;
                    break;
                case PathVerb.kConic:
                    let p1 = [pts[k - 1], pts[k], pts[k + 1]]
                    count = SkComputeConicExtremas(p1, this.fConicWeights[wIndex++], extremas);
                    k + 2;
                    break;
                case PathVerb.kCubic:
                    let p2 = [pts[k - 1], pts[k], pts[k + 1], pts[k + 2]]
                    count = SkComputeCubicExtremas(p2, extremas);
                    k += 3;
                    break;
                case PathVerb.kClose:
                    break;
            }
            for (let i = 0; i < count; ++i) {
                let tmp = extremas[i];
                min.min(tmp)
                max.max(tmp)
            }
        }
        let bounds = Rect.makeEmpty();
        bounds.setLTRB(min.x, min.y, max.x, max.y);
        return bounds;
    }
    contains(x: number, y: number, fillRule: CanvasFillRule = 'nonzero') {
        this.setCanvasFillType(fillRule)
        return pointInPath(x, y, this)
    }
    addPath(path: PathBuilder) {
        for (let { type, p0, p1, p2, p3 } of path) {
            switch (type) {
                case PathVerb.kMove:
                    this.moveTo(p0)
                    break;
                case PathVerb.kLine:
                    this.lineTo(p0)
                    break;
                case PathVerb.kQuad:
                    this.quadTo(p1!, p2!)
                    break;
                case PathVerb.kCubic:
                    this.cubicTo(p1!.x, p1!.y, p2!.x, p2!.y, p3!.x, p3!.y)
                    break;
                case PathVerb.kClose:
                    this.close()
                    break;
            }
        }
        return this
    }
    // 扩充内存空间
    incReserve(extraPtCount: number, extraVerbCount?: number) {

    }
    transform(matrix: Matrix2D) {
        if (matrix.isIdentity()) {
            return this;
        }

        for (let i = 0; i < this.fPts.length; ++i) {
            this.fPts[i].applyMatrix2D(matrix)
        }
    }
    getLastPt(lastPt?: Point) {

        let count = this.fPts.length
        if (count > 0) {
            if (lastPt) {
                lastPt.copy(this.fPts[count - 1])
            }
            return true;
        }
        if (lastPt) {
            lastPt.set(0, 0);
        }
        return false;
    }
    offset(dx: number, dy: number) {

    }

    toggleInverseFillType() {
        this.fFillType = (this.fFillType ^ 2);
        return this;
    }
    isZeroLengthSincePoint(start_pt_index: number) {
        let count = (this.fPts.length) - start_pt_index;
        if (count < 2) {
            return true;
        }

        let first = this.fPts[start_pt_index];
        for (let i = 1; i < count; i++) {
            if (first.equals(this.fPts[i])) {
                return false;
            }
        }
        return true
    }
    *[Symbol.iterator](): Iterator<{
        type: PathVerb,
        p0: Point,
        p1?: Point,
        p2?: Point,
        p3?: Point
    }> {

        let k = 0;
        let firstPoint = Point.default()
        for (let i = 0; i < this.fVerbs.length; ++i) {
            let verb = this.fVerbs[i]
            switch (verb) {
                case PathVerb.kMove:
                    yield {
                        type: verb,
                        p0: this.fPts[k]
                    }
                    firstPoint.copy(this.fPts[k])
                    k += 1;
                    break;
                case PathVerb.kLine:
                    yield {
                        type: verb,
                        p0: this.fPts[k]
                    }
                    k += 1
                    break;
                case PathVerb.kQuad:
                    yield {
                        type: verb,
                        p0: this.fPts[k - 1],
                        p1: this.fPts[k],
                        p2: this.fPts[k + 1]

                    }
                    k += 2
                    break;
                case PathVerb.kCubic:
                    yield {
                        type: verb,
                        p0: this.fPts[k - 1],
                        p1: this.fPts[k],
                        p2: this.fPts[k + 1],
                        p3: this.fPts[k + 2]
                    }
                    k += 3
                    break;
                case PathVerb.kClose:
                    yield {
                        type: verb,
                        p0: firstPoint,
                        p1: this.fPts[k - 1],
                    }
                    break

            }

        }
    }
    toCanvas(ctx: CanvasRenderingContext2D | Path2D) {
        for (let { type, p0, p1, p2, p3 } of this) {
            switch (type) {
                case PathVerb.kMove:
                    ctx.moveTo(p0.x, p0.y)
                    break;
                case PathVerb.kLine:
                    ctx.lineTo(p0.x, p0.y)
                    break;
                case PathVerb.kQuad:
                    ctx.quadraticCurveTo(p1!.x, p1!.y, p2!.x, p2!.y)
                    break;
                case PathVerb.kCubic:
                    ctx.bezierCurveTo(p1!.x, p1!.y, p2!.x, p2!.y, p3!.x, p3!.y)
                    break;
                case PathVerb.kClose:
                    ctx.closePath()
                    break;
            }
        }

    }
    toPath2D() {
        const path = new Path2D()
        this.toCanvas(path)
        return path
    }
    toSvgPath(){
        let svgCmd:any[][]=[]
        for (let { type, p0, p1, p2, p3 } of this) {
            switch (type) {
                case PathVerb.kMove:
                    svgCmd.push(['M',p0.x, p0.y])
                    break;
                case PathVerb.kLine:
                    svgCmd.push(['L',p0.x, p0.y])
                    break;
                case PathVerb.kQuad:
                    svgCmd.push(['Q',p1!.x, p1!.y, p2!.x, p2!.y])
                    break;
                case PathVerb.kCubic:
                    svgCmd.push(['C',p1!.x, p1!.y, p2!.x, p2!.y, p3!.x, p3!.y])
                    break;
                case PathVerb.kClose:
                    svgCmd.push(['Z'])
                    break;
            }
        }
        return svgCmd.map(cmd=>cmd[0]+cmd.slice(1).join(' ')).join('')
    }
};







const PtsInVerb = (v: PathVerb) => {
    switch (v) {
        case PathVerb.kMove: return 1
        case PathVerb.kLine: return 1
        case PathVerb.kConic:
        case PathVerb.kQuad:
            return 2
        case PathVerb.kCubic: return 3
        default: return 0
    }
}
class PointIterator {
    fPts: Point[] = []
    size: number = 0
    fCurrent: number;
    fAdvance: number;
    constructor(size: number, dir: PathDirection, startIndex: number) {
        this.size = size
        this.fPts = new Array(size)
        this.fCurrent = Math.trunc(startIndex) % size
        this.fAdvance = (dir == PathDirection.kCW ? 1 : size - 1)
    }
    get current() {
        return this.fPts[this.fCurrent];
    }

    next(index: number = 0) {
        this.fCurrent = ((this.fCurrent + (index * this.fAdvance) + this.fAdvance) % this.size);
        return this.current;
    }
}
class OvalPointIterator extends PointIterator {
    constructor(oval: Rect, dir: PathDirection, startIndex: number) {
        super(4, dir, startIndex)
        const cx = oval.centerX;
        const cy = oval.centerY;

        this.fPts[0] = Point.create(cx, oval.top);
        this.fPts[1] = Point.create(oval.right, cy);
        this.fPts[2] = Point.create(cx, oval.bottom);
        this.fPts[3] = Point.create(oval.left, cy);
    }
}
class RectPointIterator extends PointIterator {
    constructor(rect: Rect, dir: PathDirection, startIndex: number) {
        super(4, dir, startIndex)
        this.fPts[0] = Point.create(rect.left, rect.top);
        this.fPts[1] = Point.create(rect.right, rect.top);
        this.fPts[2] = Point.create(rect.right, rect.bottom);
        this.fPts[3] = Point.create(rect.left, rect.bottom);
    }
}
class RRectPointIterator extends PointIterator {
    constructor(rrect: RRect, dir: PathDirection, startIndex: number) {
        super(8, dir, startIndex)
        const bounds = rrect.getBounds();
        const L = bounds.left;
        const T = bounds.top;
        const R = bounds.right;
        const B = bounds.bottom;
        const radii = rrect.fRadii

        const kUpperLeft_Corner = RRect.Corner.kUpperLeft_Corner
        const kUpperRight_Corner = RRect.Corner.kUpperRight_Corner
        const kLowerRight_Corner = RRect.Corner.kLowerRight_Corner
        const kLowerLeft_Corner = RRect.Corner.kLowerLeft_Corner

        this.fPts[0] = Point.create(L + radii[kUpperLeft_Corner].x, T);
        this.fPts[1] = Point.create(R - radii[kUpperRight_Corner].x, T);
        this.fPts[2] = Point.create(R, T + radii[kUpperRight_Corner].y);
        this.fPts[3] = Point.create(R, B - radii[kLowerRight_Corner].y);
        this.fPts[4] = Point.create(R - radii[kLowerRight_Corner].x, B);
        this.fPts[5] = Point.create(L + radii[kLowerLeft_Corner].x, B);
        this.fPts[6] = Point.create(L, B - radii[kLowerLeft_Corner].y);
        this.fPts[7] = Point.create(L, T + radii[kUpperLeft_Corner].y);
    }
}



export function pointInPath(x: number, y: number, path: PathBuilder) {
    const fillType = path.getFillType()
    let isInverse = path.isInverseFillType()

    if (path.countVerbs() <= 0) {
        return isInverse;
    }
    const bounds = path.getBounds()

    if (!bounds.containPoint(x, y)) {
        return isInverse;
    }

    let iter = new PathIter(path, true)
    let done = false
    let w = 0
    let onCurveCount = Ref.from(0);
    let pts = [Point.default(), Point.default(), Point.default(), Point.default()]
    do {
        switch (iter.next(pts)) {
            case PathIterVerb.kMoveTo:
            case PathIterVerb.kClose:
                break;
            case PathIterVerb.kLineTo:
                w += winding_line(pts, x, y, onCurveCount);
                break;
            case PathIterVerb.kQuadCurveTo:
                w += winding_quad(pts, x, y, onCurveCount);
                break;
            case PathIterVerb.kConicTo:
                //  w += winding_conic(pts, x, y, iter.conicWeight(), & onCurveCount);
                break;
            case PathIterVerb.kCubicCurveTo:
                w += winding_cubic(pts, x, y, onCurveCount);
                break;
            case PathIterVerb.kDone:
                done = true
                break;
        }
    } while (!done);

    let evenOddFill = PathFillType.kEvenOdd == fillType || PathFillType.kInverseEvenOdd == fillType;
    if (evenOddFill) {
        w &= 1;
    }
    if (w) {
        return !isInverse;
    }
    if (onCurveCount.value <= 1) {
        return Boolean(Number(onCurveCount.value) ^ Number(isInverse));
    }
    if ((onCurveCount.value & 1) || evenOddFill) {
        return Boolean(Number(onCurveCount.value & 1) ^ Number(isInverse))
    }
    iter.setPath(path, true)
    done = false;
    let tangents: Point[] = []
    do {
        let oldCount = tangents.length
        switch (iter.next(pts)) {
            case PathIterVerb.kMoveTo:
            case PathIterVerb.kClose:
                break;
            case PathIterVerb.kLineTo:
                tangent_line(pts, x, y, tangents);
                break;
            case PathIterVerb.kQuadCurveTo:
                tangent_quad(pts, x, y, tangents);
                break;
            case PathIterVerb.kConicTo:
                //tangent_conic(pts, x, y, iter.conicWeight(), & tangents);
                break;
            case PathIterVerb.kCubicCurveTo:
                tangent_cubic(pts, x, y, tangents);
                break;
            case PathIterVerb.kDone:
                done = true
                break;
        }
        if (tangents.length > oldCount) {
            let last = tangents.length - 1;
            const tangent: Point = tangents[last];
            if (SkScalarNearlyZero(tangent.dot(tangent))) {
                tangents.splice(last, 1)
            } else {
                for (let index = 0; index < last; ++index) {
                    const test = tangents[index];
                    if (SkScalarNearlyZero(test.cross(tangent))
                        && SkScalarSignAsInt(tangent.x * test.x) <= 0
                        && SkScalarSignAsInt(tangent.y * test.y) <= 0) {
                        tangents.splice(last, 1);
                        tangents.splice(index, 1, tangents[tangents.length]);
                        break;
                    }
                }
            }
        }
    } while (!done);
    return Number(tangents.length ^ Number(isInverse));
}