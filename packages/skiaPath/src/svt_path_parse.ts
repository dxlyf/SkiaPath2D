import { ellipseArcToCubicBezier } from './arc'
export const Command = {
    M: 2,
    L: 2,
    H: 1,
    V: 1,
    C: 6,
    S: 4,
    Q: 4,
    T: 2,
    A: 7,
    Z: 0,
} as const;
export const CommandSet = new Set(Object.keys(Command).concat(Object.keys(Command).map(d => d.toLowerCase())))
export type Command = keyof typeof Command;
export type PathCommand<Type extends string, Args extends unknown[]> = [Type, ...Args]
// M x y
export type MoveCommand = PathCommand<'M', [number, number]>
// L x y
export type LineCommand = PathCommand<'L', [number, number]>
// H x
export type HorizonalCommand = PathCommand<'H', [number]>
// V y
export type VerticalCommand = PathCommand<'V', [number]>
// A rx ry x-axis-rotation large-arc-flag sweep-flag x y
export type ArcCommand = PathCommand<'A', [number, number, number, 0 | 1, 0 | 1, number, number]>
// Q cx cy x y
export type QuadCommand = PathCommand<'Q', [number, number, number, number]>
// T x y
export type QuadSmoothCommand = PathCommand<'T', [number, number]>
// C x1 y1 x2 y2 x y
export type CubicCommand = PathCommand<'C', [number, number, number, number, number, number]>
// S x2 y2 x y
export type CubicSmoothCommand = PathCommand<'S', [number, number, number, number]>
// Z
export type CloseCommand = PathCommand<'Z', []>



export type SVGPathCommand = MoveCommand | LineCommand | HorizonalCommand | VerticalCommand | ArcCommand | QuadCommand | QuadSmoothCommand | CubicCommand | CubicSmoothCommand | CloseCommand;


function isBetween(c: number, min: number, max: number) {
    return c >= min && c <= max
}

function isWhitespace(c: string) {
    return isBetween(c.charCodeAt(0), 1, 32);
}

function isDigit(c: string) {
    return isBetween(c.charCodeAt(0), '0'.charCodeAt(0), '9'.charCodeAt(0));
}

function isSeparator(c: string) {
    return isWhitespace(c) || c === ',';
}

function isLower(c: string) {
    return isBetween(c.charCodeAt(0), 'a'.charCodeAt(0), 'z'.charCodeAt(0));
}

function toUpper(c: string) {
    return String.fromCharCode(c.charCodeAt(0) - 'a'.charCodeAt(0) + 'A'.charCodeAt(0));
}

function skipWhitespace(str: string) {
    let pos = 0
    while (str.length > 0 && isWhitespace(str[pos])) {
        pos++
    }
    return str.slice(pos);
}

function skipSeparator(str: string) {
    let pos = 0
    while (str.length > 0 && isSeparator(str[pos])) {
        pos++
    }
    return str.slice(pos);
}
function strtod(str: string, endPtr: { value: string }) {
    str = skipWhitespace(str);
    let i = 0
    // Handle optional sign
    if (i < str.length && (str[i] === '+' || str[i] === '-')) {
        i++;
    }
    // Parse integer part
    while (i < str.length && isDigit(str[i])) {
        i++;
    }

    // Parse decimal part
    if (i < str.length && str[i] === '.') {
        i++;
        while (i < str.length && isDigit(str[i])) {
            i++;
        }
    }

    // Parse exponent
    if (i < str.length && (str[i] === 'e' || str[i] === 'E')) {
        i++;
        // Exponent sign
        if (i < str.length && (str[i] === '+' || str[i] === '-')) {
            i++;
        }
        // Exponent digits
        while (i < str.length && isDigit(str[i])) {
            i++;
        }
    }
    // Set end pointer position
    if (i == 0) {
        endPtr.value = str;
        return 0;
    }
    endPtr.value = str.substring(i);
    return Number(str.substring(0, i));
}
function findScalar(str: string, value: { value: number }) {
    str = skipWhitespace(str);
    let stop = { value: '' };
    let v = strtod(str, stop);
    if (str == stop.value) {
        return '';
    }
    if (value) {
        value.value = v;
    }
    return stop.value;
}
function findScalarSingle(str: string, value: { value: number }, isRelative: boolean, relative: number) {
    str = findScalar(str, value);
    if (!str) {
        return '';
    }
    if (isRelative) {
        value.value += relative;
    }
    str = skipSeparator(str)
    return str;
}
function findScalars(str: string, value: Float32Array, count: number) {
    if (count > 0) {
        let i = 0
        let ref = { value: 0 }
        for (; ;) {

            str = findScalar(str, ref)
            value[i] = ref.value
            if (--count == 0 || str.length <= 0) {
                break;
            }
            // keep going
            str = skipSeparator(str);
            i++
        }
    }
    return str
}
function findPoints(str: string, value: Float32Array, count: number, isRelative: boolean, relative?: null | { x: number, y: number }) {
    str = findScalars(str, value, count)
    if (isRelative) {
        for (let index = 0; index < count; index += 2) {
            value[index] += relative!.x;
            value[index + 1] += relative!.y;
        }
    }
    return str
}

export function pathFromSvgPathCommand<Path extends Path2D = Path2D>(path: Path, cmds: SVGPathCommand[]) {
    let x = 0, y = 0 // 当前点坐标
    let mx = 0, my = 0 //Move 点
    let lastCpx = 0, lastCpy = 0
    let cpx0 = 0, cpy0 = 0;
    let prevCmd: Command | '' = ''
    for (let i = 0, len = cmds.length; i < len; i++) {
        const cmd = cmds[i]
        switch (cmd[0]) {
            case 'M':
                path.moveTo(cmd[1], cmd[2]);
                x = cmd[1]
                y = cmd[2]
                mx = x
                my = y
                break;
            case 'L':
                path.lineTo(cmd[1], cmd[2]);
                x = cmd[1]
                y = cmd[2]
                break;
            case 'H':
                path.lineTo(cmd[1], y);
                x = cmd[1]
                break;
            case 'V':
                path.lineTo(x, cmd[1]);
                y = cmd[1]
                break;
            case 'Q':
                path.quadraticCurveTo(cmd[1], cmd[2], cmd[3], cmd[4]);
                lastCpx = cmd[1]
                lastCpy = cmd[2]
                x = cmd[3]
                y = cmd[4]
                break;
            case 'T':
                cpx0 = x
                cpy0 = y
                if (prevCmd === 'Q' || prevCmd === 'T') {
                    cpx0 -= lastCpx - x
                    cpy0 -= lastCpy - y
                }
                path.quadraticCurveTo(cpx0, cpy0, cmd[1], cmd[2]);
                lastCpx = cpx0
                lastCpy = cpy0
                x = cmd[1]
                y = cmd[2]
                break;
            case 'C':
                path.bezierCurveTo(cmd[1], cmd[2], cmd[3], cmd[4], cmd[5], cmd[6]);
                lastCpx = cmd[3]
                lastCpy = cmd[4]
                x = cmd[5]
                y = cmd[6]
                break;
            case 'S':
                cpx0 = x
                cpy0 = y
                if (prevCmd === 'C' || prevCmd === 'S') {
                    cpx0 -= lastCpx - x
                    cpy0 -= lastCpy - y
                }
                path.bezierCurveTo(cpx0, cpy0, cmd[1], cmd[2], cmd[3], cmd[4]);
                lastCpx = cmd[1]
                lastCpy = cmd[2]
                x = cmd[3]
                y = cmd[4]
                break
            case 'A':
                {
                    let x0 = x, y0 = y
                    let rx = cmd[1], ry = cmd[2], xAxisRotation = cmd[3], largeArcFlag = !!cmd[4], sweepFlag = !!cmd[5]
                    let x2 = cmd[6], y2 = cmd[7]
                    let lastX = x2, lastY = y2
                    ellipseArcToCubicBezier(x0, y0, x2, y2, rx, ry, xAxisRotation, largeArcFlag, sweepFlag, (x0: number, y0: number, cp1x: number, cp1y: number, cp2x: number, cp2y: number, x: number, y: number, i: number) => {
                        path.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y)
                        lastX = x
                        lastY = y
                    });
                    x = lastX
                    y = lastY
                }

                break;
            case 'Z':
                path.closePath()
                x = mx
                y = my
                break;
        }
        prevCmd = cmd[0]
    }

}
export function pathFromSvgPath(path: Path2D, data: string) {
    let first = { x: 0, y: 0 }
    let c = { x: 0, y: 0 }
    let lastc = { x: 0, y: 0 }
    let points=new Float32Array(7)
    let scratch={value:0}
    let op = ''
    let previousOp = ''
    let relative = false
    while (data.length) {
        data = skipWhitespace(data)
        if (data[0] === '') {
            break;
        }
        let ch = data[0]
        if (isDigit(ch) || ch === '-' || ch === '+' || ch === '.') {
            if (op == '' || op == 'Z') {
                return false;
            }
        } else if (isSeparator(ch)) {
            data = skipSeparator(data)
        } else {
            op = ch;
            relative = false
            if (isLower(ch)) {
                relative = true
                op = toUpper(ch)
            }
            data = data.substring(1)
            data = skipSeparator(data)
        }
        switch (op) {
            case 'M':
                {
                    data = findPoints(data, points, 2, relative, c)
                    path.moveTo(points[0], points[1])
                    previousOp = ''
                    op = 'L'
                    c.x = points[0]
                    c.y = points[1]
                }
                break
            case 'L':
                {
                    data = findPoints(data, points, 2, relative, c)
                    path.lineTo(points[0], points[1])
                    c.x = points[0]
                    c.y = points[1]
                }
                break
            case 'H':
                {
                    data = findScalarSingle(data, scratch, relative, c.x)
                    path.lineTo(scratch.value, c.y)
                    c.x = scratch.value
                }
                break
            case 'V':
                {
                    data = findScalarSingle(data, scratch, relative, c.y)
                    path.lineTo(c.x,scratch.value)
                    c.y = scratch.value
                }
                break
            case 'C':
                {
                    data = findPoints(data, points, 6, relative, c)
                    path.bezierCurveTo(points[0], points[1], points[2], points[3], points[4], points[5])
                    lastc.x = points[2]
                    lastc.y = points[3]
                    c.x = points[4]
                    c.y = points[5]
                }
                break
            case 'S':
                {
                    data = findPoints(data, points.subarray(2), 4, relative, c)
                    points[0]=c.x
                    points[1]=c.y
                    if (previousOp == 'C' || previousOp == 'S') {
                        points[0] -= lastc.x - c.x;
                        points[1] -= lastc.y - c.y;
                    }
                   
                    path.bezierCurveTo(points[0], points[1], points[2], points[3], points[4], points[5])
                    lastc.x = points[2]
                    lastc.y = points[3]
                    c.x = points[4]
                    c.y = points[5]
                }
                break
            case 'Q':
                {
                    data = findPoints(data, points, 4, relative, c)
                    path.quadraticCurveTo(points[0], points[1], points[2], points[3])
                    lastc.x = points[0]
                    lastc.y = points[1]
                    c.x = points[2]
                    c.y = points[3]
                }
                break
            case 'T':
                {
                    data = findPoints(data, points.subarray(1), 2, relative, c)
                    points[0]=c.x
                    points[1]=c.y
                    if (previousOp == 'Q' || previousOp == 'T') {
                        points[0] -= lastc.x - c.x;
                        points[1] -= lastc.y - c.y;
                    }
                    path.quadraticCurveTo(points[0], points[1], points[2], points[3])
                    lastc.x = points[0]
                    lastc.y = points[1]
                    c.x = points[2]
                    c.y = points[3]
                }
                break
            case 'A':
                data=findPoints(data, points, 7, false)
                
                let x0 = c.x, y0 = c.y
                let rx = points[0], ry = points[1], xAxisRotation = points[2], largeArcFlag = !!points[3], sweepFlag = !!points[4]
                let x2 = points[5], y2 = points[6]
                x2=relative?x2+c.x:x2;
                y2=relative?y2+c.y:y2;
                ellipseArcToCubicBezier(x0, y0, x2, y2, rx, ry, xAxisRotation, largeArcFlag, sweepFlag, (x0: number, y0: number, cp1x: number, cp1y: number, cp2x: number, cp2y: number, x: number, y: number, i: number) => {
                    path.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y)
                    c.x = x
                    c.y = y
                });

                break
            case 'Z':
                path.closePath()
                c.x = first.x
                c.y = first.y
                break
            default:
                return false
        }
        if (previousOp == '') {
            first.x = c.x;
            first.y = c.y;
        }
        previousOp = op
    }
    return true;
}


