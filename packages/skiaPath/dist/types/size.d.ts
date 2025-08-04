export declare class Size {
    width: number;
    height: number;
    static default(): Size;
    static from(width: number, height: number): Size;
    constructor(width: number, height: number);
    set(width: number, height: number): void;
    setEmpty(): void;
    isEmpty(): boolean;
    isZero(): boolean;
    round(): void;
    ceil(): void;
    floor(): void;
    trunc(): void;
    clone(): Size;
    equals(other: Size): boolean;
    equalsWithEpsilon(other: Size, epsilon?: number): boolean;
}
