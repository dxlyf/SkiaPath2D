import {ellipseArcToCubicBezier} from './arc'
export const Command = {
    M: 1,
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
export type ArcCommand = PathCommand<'A', [number, number, number,0|1, 0|1, number, number]>
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

// const commandReg = /([mlhvaqtcsz])([^mlhvaqtcsz]+)?/gi;
// const numberReg = /-?\d*\.?\d+(e[-+]?\d+)?/gi;
function isWhiteSpace(ch: string) {
    return ch === ' ' || ch === '\t' || ch === '\n' || ch === '\r';
}
function isSpaceOrComma(ch: string) {
    return ch === ' ' || ch === ',';
}
export function pathFromSvgPathCommand<Path extends Path2D = Path2D>(path: Path, cmds: SVGPathCommand[]) {
    let x=0,y=0 // 当前点坐标
    let mx=0,my=0 //Move 点
    let lastCpx=0,lastCpy=0
    let cpx0 = 0, cpy0 = 0;
    let prevCmd:Command|''=''
    for (let i = 0, len = cmds.length; i < len; i++) {
        const cmd = cmds[i]
        switch (cmd[0]) {
            case 'M':
                path.moveTo(cmd[1], cmd[2]);
                x = cmd[1]
                y = cmd[2]
                mx=x
                my=y
                break;
            case 'L':
                path.lineTo(cmd[1], cmd[2]);
                x = cmd[1]
                y = cmd[2]
                break;
            case 'H':
                path.lineTo(cmd[1], y);
                x=cmd[1]
                break;
            case 'V':
                path.lineTo(x, cmd[1]);
                y=cmd[1]
                break;
            case 'Q':
                path.quadraticCurveTo(cmd[1], cmd[2], cmd[3], cmd[4]);
                lastCpx = cmd[1]
                lastCpy = cmd[2]
                x = cmd[3]
                y = cmd[4]
                break;
            case 'T':
                cpx0=x
                cpy0=y
                if(prevCmd === 'Q' || prevCmd === 'T'){
                    cpx0-=lastCpx-x
                    cpy0-=lastCpy-y
                }
                path.quadraticCurveTo(cpx0, cpy0, cmd[1], cmd[2]);
                lastCpx=cpx0
                lastCpy=cpy0
                x = cmd[1]
                y = cmd[2]
                break;
            case 'C':
                path.bezierCurveTo(cmd[1], cmd[2],cmd[3], cmd[4],cmd[5],cmd[6]);
                lastCpx = cmd[3]
                lastCpy = cmd[4]
                x = cmd[5]
                y = cmd[6]
                break;
            case 'S':
                cpx0=x
                cpy0=y
                if(prevCmd === 'C' || prevCmd === 'S'){
                    cpx0-=lastCpx-x
                    cpy0-=lastCpy-y
                }
                path.bezierCurveTo(cpx0,cpy0,cmd[1], cmd[2],cmd[3], cmd[4]);
                lastCpx = cmd[1]
                lastCpy = cmd[2]
                x = cmd[3]
                y = cmd[4]
                break
            case 'A':
               {
                let x0=x,y0=y
                let rx=cmd[1],ry=cmd[2],xAxisRotation=cmd[3],largeArcFlag=!!cmd[4],sweepFlag=!!cmd[5]
                let x2=cmd[6],y2=cmd[7]
                let lastX=x2,lastY=y2
                ellipseArcToCubicBezier(x0, y0,x2, y2, rx, ry, xAxisRotation, largeArcFlag, sweepFlag, (x0: number, y0: number, cp1x: number, cp1y: number, cp2x: number, cp2y: number, x: number, y: number, i: number) => {
                    path.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y)
                    lastX=x
                    lastY=y
                });
                x=lastX
                y=lastY
               }
            
            break;
            case 'Z':
                path.closePath()
                x=mx
                y=my
                break;
        }
        prevCmd=cmd[0]
    }

}
export function pathFromSvgPath<Path extends Path2D = Path2D>(path: Path, d: string) {
    const cmds = parseSvgPath(d)
    pathFromSvgPathCommand(path, cmds)
}

export function parseSvgPath(d: string): SVGPathCommand[] {

    const result: SVGPathCommand[] = [];
    let pos = 0, peekPos = 0, len = d.length, ch = '', upperCmd = ''

    let cpx0 = 0, cpy0 = 0, cpx1 = 0, cpy1 = 0;
    let x = 0, y = 0,mx=0,my=0;
    while (pos < len) {
        peekPos = pos
        ch = d.charAt(peekPos)
        while (isWhiteSpace(ch)) {
            ch = d.charAt(++pos)
        }
        upperCmd = ch.toUpperCase()
        const isRelative = ch !== upperCmd;
        if (CommandSet.has(upperCmd)) {
            ch = d.charAt(++pos)
            let numValue = ''
            let args: number[] = []
            while (pos < len && !CommandSet.has(ch)) {
                if (isSpaceOrComma(ch)) {
                    if (numValue !== '') {
                        args.push(parseFloat(numValue))
                    }
                    numValue = ''
                } else {
                    numValue += ch;
                }
                ch = d.charAt(++pos)
            }
            if (numValue !== '') {
                args.push(parseFloat(numValue))
            }

            switch (upperCmd) {
                case 'M':
                    x = isRelative ? x + args[0] : args[0]
                    y = isRelative ? y + args[1] : args[1]
                    args[0] = x
                    args[1] = y
                    mx=x
                    my=y
                    break
                case 'L':
                    x = isRelative ? x + args[0] : args[0]
                    y = isRelative ? y + args[1] : args[1]
                    args[0] = x
                    args[1] = y
                    break
                case 'H':
                    x = isRelative ? x + args[0] : args[0]
                    args[0] = x
                    break;
                case 'V':
                    y = isRelative ? y + args[0] : args[0]
                    args[0] = y
                    break;
                case 'Q':
                    cpx0 = isRelative ? x + args[0] : args[0]
                    cpy0 = isRelative ? y + args[1] : args[1]
                    x = isRelative ? x + args[2] : args[2]
                    y = isRelative ? y + args[3] : args[3]
                    args[0] = cpx0
                    args[1] = cpy0
                    args[2] = x;
                    args[3] = y;
                    break
                case 'T':
                    x = isRelative ? x + args[0] : args[0]
                    y = isRelative ? y + args[1] : args[1]
                    args[0] = x
                    args[1] = y
                    break
                case 'C':
                    cpx0 = isRelative ? x + args[0] : args[0]
                    cpy0 = isRelative ? y + args[1] : args[1]
                    cpx1 = isRelative ? x + args[2] : args[2]
                    cpy1 = isRelative ? y + args[3] : args[3]
                    x = isRelative ? x + args[4] : args[4]
                    y = isRelative ? y + args[5] : args[5]
                    args[0] = cpx0
                    args[1] = cpy0
                    args[2] = cpx1
                    args[3] = cpy1
                    args[4] = x;
                    args[5] = y;
                    break
                case 'S':
                    cpx1 = isRelative ? x + args[0] : args[0]
                    cpy1 = isRelative ? y + args[1] : args[1]
                    x = isRelative ? x + args[2] : args[2]
                    y = isRelative ? y + args[3] : args[3]
                    args[0] = cpx1
                    args[1] = cpy1
                    args[2] = x
                    args[3] = y
                    break
                case 'A':
                    let rx = args[0]
                    let ry = args[1]
                    let xAxisRotation = args[2]
                    let largeArcFlag = args[3]
                    let sweepFlag = args[4]
                    x = isRelative ? x + args[5] : args[5]
                    y = isRelative ? y + args[6] : args[6]
                    args[0] = rx
                    args[1] = ry
                    args[2] = xAxisRotation
                    args[3] = largeArcFlag
                    args[4] = sweepFlag
                    args[5] = x
                    args[6] = y

                    break
                case 'Z':
                    x=mx
                    y=my
                    break
            }
            result.push([upperCmd as Command].concat(args as any) as SVGPathCommand)
        }
    }
    return result;

}