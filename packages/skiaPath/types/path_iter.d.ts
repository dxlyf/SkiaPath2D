import { PathBuilder } from './path_builder';
import { Point } from './point';
import { PathIterVerb } from './path_types';
export declare class PathIter {
    path: PathBuilder;
    forceClose: boolean;
    needClose: boolean;
    closeLine: boolean;
    verbIndex: number;
    verbEnd: number;
    lastPoint: Point;
    movePoint: Point;
    pointIndex: number;
    constructor(path: PathBuilder, forceClose?: boolean);
    get verbs(): any;
    setPath(path: PathBuilder, forceClose?: boolean): void;
    isClosedContour(): boolean;
    autoClose(pts: Point[]): PathIterVerb.kLineTo | PathIterVerb.kClose;
    next(pts: Point[]): any;
}
