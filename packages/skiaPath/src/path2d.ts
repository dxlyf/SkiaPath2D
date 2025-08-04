import { PathBuilder } from './path_builder'
import { Point } from './point'
import { Rect } from './rect'
import { RRect } from './rrect'
import { pathFromSvgPath } from './svt_path_parse'
import { Matrix2D } from './matrix'


function normalizeRectRadii(radii?: number | DOMPointInit | Iterable<number | DOMPointInit>) {
    let radius: { tl: number, tr: number, br: number, bl: number } = { tl: 0, tr: 0, br: 0, bl: 0 }
    // 如果 radius 是数字，统一处理为四个角的半径
    if (typeof radii === 'number') {
        radius = { tl: radii, tr: radii, br: radii, bl: radii };
    } else if (Array.isArray(radii)) {
        if (radii.length === 1) {
            radius = { tl: radii[0], tr: radii[0], br: radii[0], bl: radii[0] };
        } else if (radii.length === 2) {
            radius = { tl: radii[0], tr: radii[1], br: radii[0], bl: radii[1] };
        } else if (radii.length === 3) {
            radius = { tl: radii[0], tr: radii[1], br: radii[2], bl: radii[1] };
        } else if (radii.length === 4) {
            radius = { tl: radii[0], tr: radii[1], br: radii[2], bl: radii[3] };
        }
    } else if (radii) {
        radius.tl = (radii as DOMPointInit).x ?? 0
        radius.tr = (radii as DOMPointInit).y ?? 0
        radius.bl = (radii as DOMPointInit).z ?? 0
        radius.br = (radii as DOMPointInit).w ?? 0
    }
    return radius
}
function sdot(...arg: number[]) { // to be called with an even number of scalar args
    var acc = 0;
    for (var i = 0; i < arg.length - 1; i += 2) {
        acc += arg[i] * arg[i + 1];
    }
    return acc;
}
function allAreFinite(args: any[]) {
    for (var i = 0; i < args.length; i++) {
        if (args[i] !== undefined && !Number.isFinite(args[i])) {
            return false;
        }
    }
    return true;
}

function radiansToDegrees(rad: number) {
    return (rad / Math.PI) * 180;
}

function degreesToRadians(deg: number) {
    return (deg / 180) * Math.PI;
}

function almostEqual(floata: number, floatb: number) {
    return Math.abs(floata - floatb) < 0.00001;
}

function arc(skpath: PathBuilder, x: number, y: number, radius: number, startAngle: number, endAngle: number, ccw = false) {
    // As per  https://html.spec.whatwg.org/multipage/canvas.html#dom-context-2d-arc
    // arc is essentially a simpler version of ellipse.
    ellipse(skpath, x, y, radius, radius, 0, startAngle, endAngle, ccw);
}

function arcTo(skpath: PathBuilder, x1: number, y1: number, x2: number, y2: number, radius: number) {
    if (!allAreFinite([x1, y1, x2, y2, radius])) {
        return;
    }
    if (radius < 0) {
        throw 'radii cannot be negative';
    }
    if (skpath.isEmpty()) {
        skpath.moveTo(x1, y1);
    }
    skpath.arcTo(Point.create(x1, y1), Point.create(x2, y2), radius);
}

function bezierCurveTo(skpath: PathBuilder, cp1x: number, cp1y: number, cp2x: number, cp2y: number, x: number, y: number) {
    if (!allAreFinite([cp1x, cp1y, cp2x, cp2y, x, y])) {
        return;
    }
    if (skpath.isEmpty()) {
        skpath.moveTo(cp1x, cp1y);
    }
    skpath.cubicTo(cp1x, cp1y, cp2x, cp2y, x, y);
}

function closePath(skpath: PathBuilder) {
    if (skpath.isEmpty()) {
        return;
    }
    // Check to see if we are not just a single point
    var bounds = skpath.getBounds();
    if ((bounds.bottom - bounds.top) || (bounds.right - bounds.left)) {
        skpath.close();
    }
}

function _ellipseHelper(skpath: PathBuilder, x: number, y: number, radiusX: number, radiusY: number, startAngle: number, endAngle: number) {
    var sweepDegrees = radiansToDegrees(endAngle - startAngle);
    var startDegrees = radiansToDegrees(startAngle);

    var oval = Rect.makeLTRB(x - radiusX, y - radiusY, x + radiusX, y + radiusY);
    // draw in 2 180 degree segments because trying to draw all 360 degrees at once
    // draws nothing.
    if (almostEqual(Math.abs(sweepDegrees), 360)) {
        var halfSweep = sweepDegrees / 2;
        skpath.arcToOval(oval, startDegrees, halfSweep, false);
        skpath.arcToOval(oval, startDegrees + halfSweep, halfSweep, false);
        return;
    }
    skpath.arcToOval(oval, startDegrees, sweepDegrees, false);
}

function ellipse(skpath: PathBuilder, x: number, y: number, radiusX: number, radiusY: number, rotation: number,
    startAngle: number, endAngle: number, ccw = false) {
    if (!allAreFinite([x, y, radiusX, radiusY, rotation, startAngle, endAngle])) {
        return;
    }
    if (radiusX < 0 || radiusY < 0) {
        throw 'radii cannot be negative';
    }

    // based off of CanonicalizeAngle in Chrome
    var tao = 2 * Math.PI;
    var newStartAngle = startAngle % tao;
    if (newStartAngle < 0) {
        newStartAngle += tao;
    }
    var delta = newStartAngle - startAngle;
    startAngle = newStartAngle;
    endAngle += delta;

    // Based off of AdjustEndAngle in Chrome.
    if (!ccw && (endAngle - startAngle) >= tao) {
        // Draw complete ellipse
        endAngle = startAngle + tao;
    } else if (ccw && (startAngle - endAngle) >= tao) {
        // Draw complete ellipse
        endAngle = startAngle - tao;
    } else if (!ccw && startAngle > endAngle) {
        endAngle = startAngle + (tao - (startAngle - endAngle) % tao);
    } else if (ccw && startAngle < endAngle) {
        endAngle = startAngle - (tao - (endAngle - startAngle) % tao);
    }

    // Based off of Chrome's implementation in
    // https://cs.chromium.org/chromium/src/third_party/blink/renderer/platform/graphics/path.cc
    // of note, can't use addArc or addOval because they close the arc, which
    // the spec says not to do (unless the user explicitly calls closePath).
    // This throws off points being in/out of the arc.
    if (!rotation) {
        _ellipseHelper(skpath, x, y, radiusX, radiusY, startAngle, endAngle);
        return;
    }
    var rotated = Matrix2D.fromRotateOrigin(rotation, x, y);
    var rotatedInvert = Matrix2D.fromRotateOrigin(-rotation, x, y);
    skpath.transform(rotatedInvert);
    _ellipseHelper(skpath, x, y, radiusX, radiusY, startAngle, endAngle);
    skpath.transform(rotated);
}

function lineTo(skpath: PathBuilder, x: number, y: number) {
    if (!allAreFinite([x, y])) {
        return;
    }
    // A lineTo without a previous point has a moveTo inserted before it
    if (skpath.isEmpty()) {
        skpath.moveTo(x, y);
    }
    skpath.lineTo(x, y);
}

function moveTo(skpath: PathBuilder, x: number, y: number) {
    if (!allAreFinite([x, y])) {
        return;
    }
    skpath.moveTo(x, y);
}

function quadraticCurveTo(skpath: PathBuilder, cpx: number, cpy: number, x: number, y: number) {
    if (!allAreFinite([cpx, cpy, x, y])) {
        return;
    }
    if (skpath.isEmpty()) {
        skpath.moveTo(cpx, cpy);
    }
    skpath.quadTo(cpx, cpy, x, y);
}

function rect(skpath: PathBuilder, x: number, y: number, width: number, height: number) {
    var rect = Rect.makeXYWH(x, y, width, height);
    if (!allAreFinite([rect.left, rect.top, rect.right, rect.bottom])) {
        return;
    }
    // https://html.spec.whatwg.org/multipage/canvas.html#dom-context-2d-rect
    skpath.addRect(rect);
}


export class Path2D {

    static default() {
        return new this()
    }
    static fromSvgPath(d: string) {
        return new this(d)
    }
    _path = PathBuilder.default()
    constructor(pathOrCmd?: string | Path2D) {
        if (typeof pathOrCmd === 'string') {
            pathFromSvgPath(this, pathOrCmd)
        } else if (pathOrCmd instanceof Path2D) {
            this._path.copy(pathOrCmd.getPath())
        }
    }
    fromSvgPath(d: string) {
        pathFromSvgPath(this, d)
    }

    getPath() {
        return this._path;
    }

    addPath(path2d: Path2D, transform?: Matrix2D) {

        this._path.addPath(path2d.getPath());
        if (transform) {
            this._path.transform(transform)
        }
    }
    contains(x: number, y: number,fillRule:CanvasFillRule='nonzero') {
        return this._path.contains(x, y,fillRule)
    }
    arc(x: number, y: number, radius: number, startAngle: number, endAngle: number, ccw = false) {
        arc(this._path, x, y, radius, startAngle, endAngle, ccw);
    }

    arcTo(x1: number, y1: number, x2: number, y2: number, radius: number) {
        arcTo(this._path, x1, y1, x2, y2, radius);
    }

    bezierCurveTo(cp1x: number, cp1y: number, cp2x: number, cp2y: number, x: number, y: number) {
        bezierCurveTo(this._path, cp1x, cp1y, cp2x, cp2y, x, y);
    }

    closePath() {
        closePath(this._path);
    }
    conicTo(x1: number, y1: number, x2: number, y2: number, weight: number) {
        this._path.conicTo(x1, y1, x2, y2, weight)
    }
    ellipseArc(x1: number, y1: number, x2: number, y2: number,
        rx: number, ry: number, xAxisRotation: number,
        largeArcFlag: boolean, sweepFlag: boolean) {
        if (this._path.isEmpty()) {
            this._path.moveTo(x1, y1)
        }
        this._path.arcTo(Point.create(rx, ry), xAxisRotation, Number(largeArcFlag), Number(!sweepFlag), Point.create(x2, y2));
        // this._path.getLastPt(Point.create(x2,y2));
    }
    roundRect(x: number, y: number, width: number, height: number, radii?: any) {
        let radius = normalizeRectRadii(radii)
        // 分别为四个角设置半径：[左上, 右上, 右下, 左下]
        const rradii: Point[] = [
            Point.create(radius.tl, radius.tl), // 左上角 (x半径, y半径)
            Point.create(radius.tr, radius.tr), // 右上角
            Point.create(radius.br, radius.br), // 右下角
            Point.create(radius.bl, radius.bl) // 左下角
        ];
        let rrect = RRect.makeEmpty()
        let rect = Rect.makeXYWH(x, y, width, height)
        rrect.setRectRadii(rect, rradii)
        this._path.addRRect(rrect)
    }
    ellipse(x: number, y: number, radiusX: number, radiusY: number, rotation: number,
        startAngle: number, endAngle: number, ccw = false) {
        ellipse(this._path, x, y, radiusX, radiusY, rotation,
            startAngle, endAngle, ccw);
    }

    lineTo(x: number, y: number) {
        lineTo(this._path, x, y);
    }

    moveTo(x: number, y: number) {
        moveTo(this._path, x, y);
    }

    quadraticCurveTo(cpx: number, cpy: number, x: number, y: number) {
        quadraticCurveTo(this._path, cpx, cpy, x, y);
    }

    rect(x: number, y: number, width: number, height: number) {
        rect(this._path, x, y, width, height);
    }
    getBounds(){
        return this._path.getBounds()
    }
    computeTightBounds(){
        return this._path.computeTightBounds()
    }
    toCanvas(ctxOrPath:globalThis.Path2D) {
        return this._path.toCanvas(ctxOrPath)
    }
    toPath2D() {
        return this._path.toPath2D()
    }
    toSvgPath(){
        return this._path.toSvgPath()
    }
}