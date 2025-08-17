import { PathBuilder } from './path_builder';
export declare class PathStrokeDash {
    data: number[];
    offset: number;
    interval_len: number;
    first_len: number;
    first_index: number;
    constructor(data: number[], offset: number);
    dash(path: PathBuilder, res_scale?: number): PathBuilder | undefined;
}
