import { Point } from './point';
export declare class Ref<T = number> {
    static from<T = number>(value: T): Ref<T>;
    value: T;
    constructor(value: T);
    swap(other: Ref<T>): void;
}
export declare class PointerArray<T> {
    static from<T = any>(data: T[]): PointerArray<T>;
    data: T[];
    curIndex: number;
    constructor(data: T[]);
    get length(): number;
    copy(source: PointerArray<T>): this;
    clone(): PointerArray<T>;
    slice(start: number): PointerArray<T>;
    get(index: number): T;
    set(index: number, value: T): this;
    set value(v: T);
    get value(): T;
    move(index: number): this;
    next(index?: number): this;
    prev(index?: number): this;
}
export declare class VectorIterator<T> {
    data: T[];
    size: number;
    currentIndex: number;
    increase: number;
    constructor(size: number, startIndex?: number, reverse?: boolean);
    get current(): T;
    get next(): T;
}
export declare const swap: (a: Ref, b: Ref) => void;
export declare class FloatPoint extends Float32Array {
    static make(size?: number): FloatPoint;
    static fromXY(x: number, y: number): FloatPoint;
    static splat(x: number, count?: number): FloatPoint;
    static fromPoint(point: Point): FloatPoint;
    static fromPoints(points: Point[], count: number): FloatPoint;
    static fromArray(points: number[] | Float32Array, count?: number): FloatPoint;
    constructor(size: number);
    get x(): number;
    set x(value: number);
    get y(): number;
    set y(value: number);
    get z(): number;
    set z(value: number);
    get w(): number;
    set w(value: number);
    get h(): number;
    set h(value: number);
    get elements(): this;
    setElements(elements: ArrayLike<number>): this;
    storePoint(target: Point): void;
    store(target: number[] | Float32Array): void;
    storePoints(target: Point[]): void;
    add(other: FloatPoint): this;
    sub(other: FloatPoint): this;
    mulScalar(scalar: number): this;
    min(other: FloatPoint): this;
    max(other: FloatPoint): this;
    mul(other: FloatPoint): this;
    div(other: FloatPoint): this;
    sqrt(): this;
    inverse(): this;
    clone(): FloatPoint;
    copy(other: FloatPoint): this;
    xy(): FloatPoint;
    xyxy(): FloatPoint;
    xyz(): FloatPoint;
    equals(other: FloatPoint): boolean;
    equalsWithTolerance(other: FloatPoint, tolerance?: number): boolean;
    lerp(a: FloatPoint, b: FloatPoint, t: FloatPoint): this;
    clmap(min: FloatPoint, max: FloatPoint): this;
}
export declare function sqrt(value: number): number;
export declare function sk_ieee_float_divide(numer: number, denom: number): number;
export declare function min(a: number, b: number): number;
export declare function max(a: number, b: number): number;
export declare function fabs(value: number): number;
export declare function clamp(value: number, min: number, max: number): number;
export declare function lerp(a: number, b: number, t: number): number;
export declare function sk_double_nearly_zero(a: number): boolean;
export declare function sk_ieee_double_divide(numer: number, denom: number): number;
export declare function sk_double_to_float(x: number): number;
export declare function isFinite(value: number): boolean;
/**
    * 返回具有 x 的绝对值但 y 符号的数值
    * 等价于 C++ 的 std::copysign(x, y)
    *
    * @param {number} x - 数值，其绝对值将被保留
    * @param {number} y - 数值，其符号将赋值给 x 的绝对值
    * @returns {number} 拥有 x 的绝对值及 y 符号的数值
    */
export declare function copysign(x: number, y: number): number;
export declare function magnitudeAlt(x: number): number;
export declare function sk_doubles_nearly_equal_ulps(a: number, b: number, maxUlpsDiff?: number): boolean;
