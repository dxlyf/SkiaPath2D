import { PathBuilder } from "./path_builder";
import { PathSegmentsIter } from "./path_stroker";
import { Point } from "./point";
import { clamp } from './util'
import { SkEvalQuadAt, SkEvalCubicAt, SkChopQuadAt, SkChopCubicAt_3 } from './geometry'
import { PathVerb } from "./path_types";

const CHEAP_DIST_LIMIT = 0.5
const MAX_T_VALUE = 0x3FFFFFFF;
const MAX_DASH_COUNT = 1000000; 
function adjustDashOffset(offset: number, len: number): number {
    if (offset < 0) {
        offset = -offset
        if (offset > len) {
            offset = offset % len;
        }
        offset = len - offset;
        if (offset === len) {
            offset = 0
        }
        return offset
    } else if (offset >= len) {
        return offset % len;
    } else {
        return offset;
    }
}
function findFirstInterval(dash: number[], offset: number): [number, number] {
    for (let i = 0, len = dash.length; i < len; ++i) {
        let gap = dash[i];
        if (offset > gap || (offset === gap && gap !== 0)) {
            offset -= gap;
        } else {
            return [gap - offset, i];
        }
    }
    return [dash[0], 0]
}
function isEven(value: number): boolean {
    return value % 2 === 0;
}

export class PathStrokeDash {
    data: number[];
    offset: number;
    interval_len: number;
    first_len: number;//
    first_index: number;
    constructor(data: number[], offset: number) {
        this.data = data;
        this.interval_len = this.data.reduce((sum, val) => sum + val, 0);
        this.offset = adjustDashOffset(offset, this.interval_len);
        const [first_len, first_index] = findFirstInterval(this.data, this.offset);
        this.first_len = first_len;
        this.first_index = first_index;
    }
    dash(path: PathBuilder, res_scale: number = 1):PathBuilder|undefined {
        if(this.data.length<2){
            return
        }
        if(this.data.some(d=>d<0)){
            return
        }
        return dashImpl(path, this, res_scale)
    }
}
function dashImpl(src: PathBuilder, dash: PathStrokeDash, res_scale = 1.0):PathBuilder|undefined  {
    let path=new PathBuilder()
    let dash_count = 0
    let contours = new ContourMeasureIter(src, res_scale)
    for(let contour of contours){
        let skip_first_segment=contour.isClosed
        let added_segment=false
        let length=contour.length
        let index=dash.first_index
        dash_count+=length*(dash.data.length>>1)/dash.interval_len
        if(dash_count>MAX_DASH_COUNT){
            return
        }
        let distance=0
        let d_len=dash.first_len
        while(distance<length){
            added_segment=false
            if(isEven(index)&&!skip_first_segment){
                added_segment=true
                contour.pushSegment(distance,distance+d_len,true,path)
            }
            distance+=d_len
            skip_first_segment=false
            index+=1
            if(index===dash.data.length){
                index=0
            }
            d_len=dash.data[index]
        }
        if(contour.isClosed&&isEven(dash.first_index)&&dash.first_len>=0){
            contour.pushSegment(0,dash.first_len,!added_segment,path)
        }
        return path
    }
}
enum SegmentType {
    Line,
    Quad,
    Cubic
}
class Segment {
    static create(opts: { distance: number, pointIndex: number, tValue: number, kind: SegmentType }) {
        let seg = new Segment()
        seg.distance = opts.distance
        seg.pointIndex = opts.pointIndex
        seg.tValue = opts.tValue
        seg.kind = opts.kind
        return seg
    }
    distance: number = 0
    pointIndex: number = 0
    tValue: number = 0
    kind: SegmentType = SegmentType.Line
    scalarT() {
        const MAX_T_RECIPROCAL = 1 / MAX_T_VALUE
        return this.tValue * MAX_T_RECIPROCAL
    }
}
class ContourMeasure {
    segments: Segment[] = []
    points: Point[] = []
    length: number = 0
    isClosed: boolean = false
    pushSegment(startDist: number, stopDist: number, startWithMoveTo: boolean, path: PathBuilder) {
        const segment = new Segment();
        if (startDist < 0) {
            startDist = 0;
        }
        if (stopDist > this.length) {
            stopDist = this.length;
        }
        if (!(startDist <= stopDist)) {
            return
        }
        if (this.segments.length <= 0) {
            return
        }
        let v = this.distanceTosegment(startDist);
        if (!v) {
            return
        }
        let [seg_index, start_t] = v;
        let seg = this.segments[seg_index];
        v = this.distanceTosegment(stopDist);
        if (!v) {
            return
        }
        let [stop_seg_index, stop_t] = v;
        let stop_seg = this.segments[stop_seg_index];
        let p = Point.default()
        if (startWithMoveTo) {
            computePosTan(this.points.slice(seg.pointIndex), seg.kind, start_t, p)
            path.moveTo(p)
        }
        if (seg.pointIndex === stop_seg.pointIndex) {
            segmentTo(this.points.slice(seg.pointIndex), seg.kind, start_t, stop_t, path)
        } else {
            let new_seg_index = seg_index
            do {
                segmentTo(this.points.slice(seg.pointIndex), seg.kind, start_t, 1, path)
                let old_point_index = seg.pointIndex
                do {
                    new_seg_index += 1;
                    if (this.segments[new_seg_index].pointIndex !== old_point_index) {
                        break
                    }
                } while (true)
                seg = this.segments[new_seg_index];
                start_t = 0
                if (seg.pointIndex >= stop_seg.pointIndex) {
                    break
                }

            } while (true);

            segmentTo(this.points.slice(seg.pointIndex), seg.kind, 0, stop_t, path)
        }
     

    }
    distanceTosegment(distance: number): [number, number] | undefined {
        let index = findSegment(this.segments, distance);
        index = index ^ (index >> 31)
        let seg = this.segments[index];
        let start_t = 0
        let start_d = 0
        if (index > 0) {
            start_d = this.segments[index - 1].distance;
            if (this.segments[index - 1].pointIndex == seg.pointIndex) {
                start_t = this.segments[index - 1].scalarT();
            }
        }
        let t = start_t + (seg.scalarT() - start_t) * (distance - start_d) / (seg.distance - start_d);
        if (!Number.isFinite(t)) {
            return
        }
        return [index, t]
    }
    computeLineSeg(p0: Point, p1: Point, distance: number, pointIndex: number) {
        let d = p0.distanceTo(p1)
        let prev_d = distance
        distance += d
        if (distance > prev_d) {
            this.segments.push(Segment.create({
                distance,
                pointIndex,
                tValue: MAX_T_VALUE,
                kind: SegmentType.Line
            }))
        }
        return distance
    }
    computeQuadSegs(p0: Point, p1: Point, p2: Point, distance: number, minT: number, maxT: number, pointIndex: number, tolerance: number) {
        if (tSapnBigEnough(maxT - minT) != 0 && quadTooCurvy(p0, p1, p2, tolerance)) {
            let tmp = Point.make(5)
            let half_t = (minT + maxT) >> 1;
            SkChopQuadAt([p0, p1, p2], tmp, 0.5)
            distance = this.computeQuadSegs(tmp[0], tmp[1], tmp[2], distance, minT, half_t, pointIndex, tolerance)

            distance = this.computeQuadSegs(tmp[2], tmp[3], tmp[4], distance, half_t, maxT, pointIndex, tolerance)
        } else {
            let d = p0.distanceTo(p2)
            let prev_d = distance
            distance += d
            if (distance > prev_d) {
                this.segments.push(Segment.create({
                    distance,
                    pointIndex,
                    tValue: maxT,
                    kind: SegmentType.Quad
                }))
            }
        }
        return distance
    }
    computeCubicSegs(p0: Point, p1: Point, p2: Point, p3: Point, distance: number, minT: number, maxT: number, pointIndex: number, tolerance: number) {
        if (tSapnBigEnough(maxT - minT) != 0 && cubicTooCurvy(p0, p1, p2, p3, tolerance)) {
            let tmp = Point.make(7)
            let half_t = (minT + maxT) >> 1;
            SkChopCubicAt_3([p0, p1, p2, p3], tmp, 0.5)
            distance = this.computeCubicSegs(tmp[0], tmp[1], tmp[2], tmp[3], distance, minT, half_t, pointIndex, tolerance)
            distance = this.computeCubicSegs(tmp[3], tmp[4], tmp[5], tmp[6], distance, half_t, maxT, pointIndex, tolerance)
        } else {
            let d = p0.distanceTo(p3)
            let prev_d = distance
            distance += d
            if (distance > prev_d) {
                this.segments.push(Segment.create({
                    distance,
                    pointIndex,
                    tValue: maxT,
                    kind: SegmentType.Cubic
                }))
            }
        }
        return distance
    }
}
class ContourMeasureIter {
    iter: PathSegmentsIter
    tolerance: number
    constructor(path: PathBuilder, res_scale: number = 1) {
        this.iter = new PathSegmentsIter({
            path: path,
            verbIndex: 0,
            pointsIndex: 0,
            isAutoClose: false,
        });
        this.tolerance = 1 / res_scale * CHEAP_DIST_LIMIT;
    }
    *[Symbol.iterator](): Iterator<ContourMeasure> {
        while (this.iter.canNext()) {
            let contour = new ContourMeasure()
            let pointIndex = 0
            let distance = 0
            let havSeenClose = false
            let prevPoint = Point.default()
            for (let seg of this.iter) {

                switch (seg.type) {
                    case PathVerb.kMove: {
                        contour.points.push(seg.p0!)
                        prevPoint.copy(seg.p0!)
                        break
                    }
                    case PathVerb.kLine: {
                        let prev_d = distance
                        distance = contour.computeLineSeg(prevPoint, seg.p0!, distance, pointIndex)
                        if (distance > prev_d) {
                            contour.points.push(seg.p0!)
                            pointIndex+=1
                        }
                        prevPoint.copy(seg.p0!)
                        break
                    }
                    case PathVerb.kQuad: {
                        let prev_d = distance
                        distance = contour.computeQuadSegs(prevPoint, seg.p1!, seg.p2!, distance, 0, MAX_T_VALUE, pointIndex, this.tolerance)
                        if (distance > prev_d) {
                            contour.points.push(seg.p1!)
                            contour.points.push(seg.p2!)
                            pointIndex += 2
                        }
                        prevPoint.copy(seg.p2!)

                        break
                    }
                    case PathVerb.kCubic: {
                        let prev_d = distance
                        distance = contour.computeCubicSegs(prevPoint, seg.p1!, seg.p2!, seg.p3!, distance, 0, MAX_T_VALUE, pointIndex, this.tolerance)
                        if (distance > prev_d) {
                            contour.points.push(seg.p1!)
                            contour.points.push(seg.p2!)
                            contour.points.push(seg.p3!)
                            pointIndex += 3
                        }
                        prevPoint.copy(seg.p3!)

                        break
                    }
                    case PathVerb.kClose: {
                        havSeenClose = true
                        break
                    }


                }
                if (this.iter.nextVerb === PathVerb.kMove) {
                    break
                }
            }
            if (!Number.isFinite(distance)) {
                return
            }
            if(havSeenClose){
                let prev_d=distance
                let first_pt=contour.points[0].clone()
                distance=contour.computeLineSeg(contour.points[pointIndex],
                    first_pt,
                    distance,
                    pointIndex
                )
                if(distance>prev_d){
                    contour.points.push(first_pt)
                }

            }
            contour.length=distance
            contour.isClosed=havSeenClose
            if(contour.points.length<=0){
                return
            }else{
                yield contour
            }
        }
    }
}




function findSegment(base: Segment[], key: number): number {
    if (base.length <= 0) {
        return ~0 //-1
    }
    let lo = 0;
    let hi = (base.length - 1);

    while (lo < hi) {
        let mid = (hi + lo) >>> 1;
        if (base[mid].distance < key) {
            lo = mid + 1;
        } else {
            hi = mid;
        }
    }

    if (base[hi].distance < key) {
        hi = hi + 1;
        hi = ~hi;
    } else if (key < base[hi].distance) {
        hi = ~hi;
    }

    return hi;
}

function interp(a: number, b: number, t: number): number {
    return a + (b - a) * t
}
function interpSafe(a: number, b: number, t: number): number {
    return interp(a, b, clamp(t, 0, 1))
}
function computePosTan(points: Point[], seg_kind: SegmentType, t: number, pos?: Point, tangent?: Point) {
    switch (seg_kind) {
        case SegmentType.Line: {
            {
                if (pos) {
                    pos.x = interp(points[0].x, points[1].x, t)
                    pos.y = interp(points[0].y, points[1].y, t)
                }
                if (tangent) {
                    tangent.setLengthFrom(points[1].x - points[0].x, points[1].y - points[0].y, 1)
                }
            }
            break;
        }
        case SegmentType.Quad: {
            {
                let src = points.slice(0, 3)
                SkEvalQuadAt(src, t, pos, tangent)
                if (tangent) {
                    tangent.normalize()
                }
            }
            break;
        }
        case SegmentType.Cubic: {
            {
                let src = points.slice(0, 4)
                SkEvalCubicAt(src, t, pos, tangent)
                if (tangent) {
                    tangent.normalize()
                }
            }
            break
        }
    }
}

function segmentTo(points: Point[], seg_kind: SegmentType, start_t: number, stop_t: number, path: PathBuilder) {
    if (start_t === stop_t) {
        if (path.lastPoint) {
            path.lineTo(path.lastPoint.x, path.lastPoint.y)
        }
        return
    }
    switch (seg_kind) {
        case SegmentType.Line: {
            if (stop_t === 1) {
                path.lineTo(points[1].x, points[1].y)
            } else {
                let x = interpSafe(points[0].x, points[1].x, stop_t)
                let y = interpSafe(points[0].y, points[1].y, stop_t)
                path.lineTo(x, y)
            }
            break
        }
        case SegmentType.Quad: {
            let tmp0 = Point.make(5)
            let tmp1 = Point.make(5)
            if (start_t === 0) {
                if (stop_t === 1) {
                    path.quadTo(points[1], points[2])
                } else {
                    let t = clamp(stop_t, 0, 1)
                    SkChopQuadAt(points, tmp0, t)
                }
            } else {
                let t = clamp(start_t, 0, 1)
                SkChopQuadAt(points, tmp0, t)
                if (stop_t === 1) {
                    path.quadTo(tmp0[3], tmp0[4])
                } else {
                    let t2 = clamp((stop_t - t) / (1 - start_t), 0, 1)
                    SkChopQuadAt(tmp0.slice(2), tmp1, t2)
                    path.quadTo(tmp1[1], tmp1[2])
                }

            }
            break;
        }
        case SegmentType.Cubic: {
            let tmp0 = Point.make(7)
            let tmp1 = Point.make(7)
            if (start_t === 0) {
                if (stop_t === 1) {
                    path.cubicTo(points[1], points[2], points[3])
                } else {
                    let t = clamp(stop_t, 0, 1)
                    SkChopCubicAt_3(points.slice(0, 4), tmp0, t)
                    path.cubicTo(tmp0[1], tmp0[2], tmp0[3])
                }
            } else {
                let t = clamp(start_t, 0, 1)
                SkChopCubicAt_3(points.slice(0, 4), tmp0, t)
                if (stop_t === 1) {
                    path.cubicTo(tmp0[4], tmp0[5], tmp0[6])
                } else {
                    let t2 = clamp((stop_t - t) / (1 - start_t), 0, 1)
                    SkChopCubicAt_3(tmp0.slice(3, 7), tmp1, t2)
                    path.cubicTo(tmp1[1], tmp1[2], tmp1[3])
                }
            }
            break
        }
    }
}

function tSapnBigEnough(tSpan: number) {
    return tSpan >> 10
}

function quadTooCurvy(p0: Point, p1: Point, p2: Point, tolearance: number) {
    // diff = (a/4 + b/2 + c/4) - (a/2 + c/2)
    // diff = -a/4 + b/2 - c/4
    let dx = p1.halfX - (p0.x + p2.x) * 0.5 * 0.5
    let dy = p1.halfY - (p0.y + p2.y) * 0.5 * 0.5
    let dist = Math.max(Math.abs(dx), Math.abs(dy))
    return dist > tolearance
}
function cubicTooCurvy(p0: Point, p1: Point, p2: Point, p3: Point, tolearance: number) {
    let n0 = cheapDistExceedsLimit(p1,
        interpSafe(p0.x, p3.x, 1 / 3),
        interpSafe(p0.y, p3.y, 1 / 3), tolearance)
    let n1 = cheapDistExceedsLimit(p2,
        interpSafe(p0.x, p3.x, 2 / 3),
        interpSafe(p0.y, p3.y, 2 / 3), tolearance)
    return n0 || n1
}
function cheapDistExceedsLimit(pt: Point, x: number, y: number, tolearance: number) {
    let dx = pt.x - x
    let dy = pt.y - y
    return Math.max(Math.abs(dx), Math.abs(dy)) > tolearance
}