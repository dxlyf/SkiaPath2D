import { Point } from './point';
import { Rect } from './rect';
import { Matrix2D } from './matrix';
/** \enum SkRRect::Type
      Type describes possible specializations of SkRRect. Each Type is
      exclusive; a SkRRect may only have one type.
 
      Type members become progressively less restrictive; larger values of
      Type have more degrees of freedom than smaller values.
  */
declare enum RRect_Type {
    kEmpty_Type = 0,//!< zero width or height
    kRect_Type = 1,//!< non-zero width and height, and zeroed radii
    kOval_Type = 2,//!< non-zero width and height filled with radii
    kSimple_Type = 3,//!< non-zero width and height with equal radii
    kNinePatch_Type = 4,//!< non-zero width and height with axis-aligned radii
    kComplex_Type = 5,//!< non-zero width and height with arbitrary radii
    kLastType = 5
}
declare enum Corner {
    kUpperLeft_Corner = 0,//!< index of top-left corner radii
    kUpperRight_Corner = 1,//!< index of top-right corner radii
    kLowerRight_Corner = 2,//!< index of bottom-right corner radii
    kLowerLeft_Corner = 3
}
export declare class RRect {
    static Corner: typeof Corner;
    static default(): RRect;
    static from(rect: Rect, radii: Point[], fType?: RRect_Type): RRect;
    fRect: Rect;
    fType: RRect_Type;
    fRadii: Point[];
    constructor();
    getType(): RRect_Type;
    get type(): RRect_Type;
    isEmpty(): boolean;
    isRect(): boolean;
    isOval(): boolean;
    isSimple(): boolean;
    isNinePatch(): boolean;
    isComplex(): boolean;
    /** Returns span on the x-axis. This does not check if result fits in 32-bit float;
        result may be infinity.
 
        @return  rect().fRight minus rect().fLeft
    */
    width(): number;
    /** Returns span on the y-axis. This does not check if result fits in 32-bit float;
        result may be infinity.
 
        @return  rect().fBottom minus rect().fTop
    */
    height(): () => /*elided*/ any;
    /** Returns top-left corner radii. If type() returns kEmpty_Type, kRect_Type,
        kOval_Type, or kSimple_Type, returns a value representative of all corner radii.
        If type() returns kNinePatch_Type or kComplex_Type, at least one of the
        remaining three corners has a different value.
 
        @return  corner radii for simple types
    */
    getSimpleRadii(): Point;
    copy(source: RRect): void;
    /** Sets bounds to zero width and height at (0, 0), the origin. Sets
        corner radii to zero and sets type to kEmpty_Type.
    */
    setEmpty(): void;
    /** Sets bounds to sorted rect, and sets corner radii to zero.
        If set bounds has width and height, and sets type to kRect_Type;
        otherwise, sets type to kEmpty_Type.
    
        @param rect  bounds to set
    */
    setRect(rect: Rect): void;
    /** Initializes bounds at (0, 0), the origin, with zero width and height.
        Initializes corner radii to (0, 0), and sets type of kEmpty_Type.
 
        @return  empty SkRRect
    */
    static makeEmpty(): RRect;
    /** Initializes to copy of r bounds and zeroes corner radii.
 
        @param r  bounds to copy
        @return   copy of r
    */
    static makeRect(r: Rect): RRect;
    /** Sets bounds to oval, x-axis radii to half oval.width(), and all y-axis radii
        to half oval.height(). If oval bounds is empty, sets to kEmpty_Type.
        Otherwise, sets to kOval_Type.
 
        @param oval  bounds of oval
        @return      oval
    */
    static makeOval(oval: Rect): RRect;
    /** Sets to rounded rectangle with the same radii for all four corners.
        If rect is empty, sets to kEmpty_Type.
        Otherwise, if xRad and yRad are zero, sets to kRect_Type.
        Otherwise, if xRad is at least half rect.width() and yRad is at least half
        rect.height(), sets to kOval_Type.
        Otherwise, sets to kSimple_Type.
 
        @param rect  bounds of rounded rectangle
        @param xRad  x-axis radius of corners
        @param yRad  y-axis radius of corners
        @return      rounded rectangle
    */
    static makeRectXY(rect: Rect, xRad: number, yRad: number): RRect;
    setRadiiEmpty(): void;
    /** Sets bounds to oval, x-axis radii to half oval.width(), and all y-axis radii
        to half oval.height(). If oval bounds is empty, sets to kEmpty_Type.
        Otherwise, sets to kOval_Type.
    
        @param oval  bounds of oval
    */
    setOval(oval: Rect): void;
    /** Sets to rounded rectangle with the same radii for all four corners.
        If rect is empty, sets to kEmpty_Type.
        Otherwise, if xRad or yRad is zero, sets to kRect_Type.
        Otherwise, if xRad is at least half rect.width() and yRad is at least half
        rect.height(), sets to kOval_Type.
        Otherwise, sets to kSimple_Type.
    
        @param rect  bounds of rounded rectangle
        @param xRad  x-axis radius of corners
        @param yRad  y-axis radius of corners
    
        example: https://fiddle.skia.org/c/@RRect_setRectXY
    */
    setRectXY(rect: Rect, xRad: number, yRad: number): void;
    /** Sets bounds to rect. Sets radii to (leftRad, topRad), (rightRad, topRad),
        (rightRad, bottomRad), (leftRad, bottomRad).
    
        If rect is empty, sets to kEmpty_Type.
        Otherwise, if leftRad and rightRad are zero, sets to kRect_Type.
        Otherwise, if topRad and bottomRad are zero, sets to kRect_Type.
        Otherwise, if leftRad and rightRad are equal and at least half rect.width(), and
        topRad and bottomRad are equal at least half rect.height(), sets to kOval_Type.
        Otherwise, if leftRad and rightRad are equal, and topRad and bottomRad are equal,
        sets to kSimple_Type. Otherwise, sets to kNinePatch_Type.
    
        Nine patch refers to the nine parts defined by the radii: one center rectangle,
        four edge patches, and four corner patches.
    
        @param rect       bounds of rounded rectangle
        @param leftRad    left-top and left-bottom x-axis radius
        @param topRad     left-top and right-top y-axis radius
        @param rightRad   right-top and right-bottom x-axis radius
        @param bottomRad  left-bottom and right-bottom y-axis radius
    */
    setNinePatch(rect: Rect, leftRad: number, topRad: number, rightRad: number, bottomRad: number): void;
    /** Sets bounds to rect. Sets radii array for individual control of all for corners.
    
        If rect is empty, sets to kEmpty_Type.
        Otherwise, if one of each corner radii are zero, sets to kRect_Type.
        Otherwise, if all x-axis radii are equal and at least half rect.width(), and
        all y-axis radii are equal at least half rect.height(), sets to kOval_Type.
        Otherwise, if all x-axis radii are equal, and all y-axis radii are equal,
        sets to kSimple_Type. Otherwise, sets to kNinePatch_Type.
    
        @param rect   bounds of rounded rectangle
        @param radii  corner x-axis and y-axis radii
    
        example: https://fiddle.skia.org/c/@RRect_setRectRadii
    */
    setRectRadii(rect: Rect, radii: Point[]): void;
    /** \enum SkRRect::Corner
        The radii are stored: top-left, top-right, bottom-right, bottom-left.
    */
    /** Returns bounds. Bounds may have zero width or zero height. Bounds right is
        greater than or equal to left; bounds bottom is greater than or equal to top.
        Result is identical to getBounds().
    
        @return  bounding box
    */
    rect(): Rect;
    /** Returns scalar pair for radius of curve on x-axis and y-axis for one corner.
        Both radii may be zero. If not zero, both are positive and finite.
 
        @return        x-axis and y-axis radii for one corner
    */
    radii(corner: Corner): Point;
    /** Returns bounds. Bounds may have zero width or zero height. Bounds right is
        greater than or equal to left; bounds bottom is greater than or equal to top.
        Result is identical to rect().
    
        @return  bounding box
    */
    getBounds(): Rect;
    /** Returns true if bounds and radii in a are equal to bounds and radii in b.
 
        a and b are not equal if either contain NaN. a and b are equal if members
        contain zeroes with different signs.
 
        @param a  SkRect bounds and radii to compare
        @param b  SkRect bounds and radii to compare
        @return   true if members are equal
    */
    equals(a: RRect, b: RRect): boolean;
    /** Returns true if bounds and radii in a are not equal to bounds and radii in b.
 
        a and b are not equal if either contain NaN. a and b are equal if members
        contain zeroes with different signs.
 
        @param a  SkRect bounds and radii to compare
        @param b  SkRect bounds and radii to compare
        @return   true if members are not equal
    */
    notEquals(a: RRect, b: RRect): boolean;
    /** Copies SkRRect to dst, then insets dst bounds by dx and dy, and adjusts dst
        radii by dx and dy. dx and dy may be positive, negative, or zero. dst may be
        SkRRect.
    
        If either corner radius is zero, the corner has no curvature and is unchanged.
        Otherwise, if adjusted radius becomes negative, pins radius to zero.
        If dx exceeds half dst bounds width, dst bounds left and right are set to
        bounds x-axis center. If dy exceeds half dst bounds height, dst bounds top and
        bottom are set to bounds y-axis center.
    
        If dx or dy cause the bounds to become infinite, dst bounds is zeroed.
    
        @param dx   added to rect().fLeft, and subtracted from rect().fRight
        @param dy   added to rect().fTop, and subtracted from rect().fBottom
        @param dst  insets bounds and radii
    
        example: https://fiddle.skia.org/c/@RRect_inset
    */
    insetRect(dx: number, dy: number, dst: RRect): void;
    /** Insets bounds by dx and dy, and adjusts radii by dx and dy. dx and dy may be
        positive, negative, or zero.
    
        If either corner radius is zero, the corner has no curvature and is unchanged.
        Otherwise, if adjusted radius becomes negative, pins radius to zero.
        If dx exceeds half bounds width, bounds left and right are set to
        bounds x-axis center. If dy exceeds half bounds height, bounds top and
        bottom are set to bounds y-axis center.
    
        If dx or dy cause the bounds to become infinite, bounds is zeroed.
    
        @param dx  added to rect().fLeft, and subtracted from rect().fRight
        @param dy  added to rect().fTop, and subtracted from rect().fBottom
    */
    inset(dx: number, dy: number): void;
    /** Outsets dst bounds by dx and dy, and adjusts radii by dx and dy. dx and dy may be
        positive, negative, or zero.
    
        If either corner radius is zero, the corner has no curvature and is unchanged.
        Otherwise, if adjusted radius becomes negative, pins radius to zero.
        If dx exceeds half dst bounds width, dst bounds left and right are set to
        bounds x-axis center. If dy exceeds half dst bounds height, dst bounds top and
        bottom are set to bounds y-axis center.
    
        If dx or dy cause the bounds to become infinite, dst bounds is zeroed.
    
        @param dx   subtracted from rect().fLeft, and added to rect().fRight
        @param dy   subtracted from rect().fTop, and added to rect().fBottom
        @param dst  outset bounds and radii
    */
    outsetRect(dx: number, dy: number, dst: RRect): void;
    /** Outsets bounds by dx and dy, and adjusts radii by dx and dy. dx and dy may be
        positive, negative, or zero.
    
        If either corner radius is zero, the corner has no curvature and is unchanged.
        Otherwise, if adjusted radius becomes negative, pins radius to zero.
        If dx exceeds half bounds width, bounds left and right are set to
        bounds x-axis center. If dy exceeds half bounds height, bounds top and
        bottom are set to bounds y-axis center.
    
        If dx or dy cause the bounds to become infinite, bounds is zeroed.
    
        @param dx  subtracted from rect().fLeft, and added to rect().fRight
        @param dy  subtracted from rect().fTop, and added to rect().fBottom
    */
    outset(dx: number, dy: number): void;
    /** Translates SkRRect by (dx, dy).
    
        @param dx  offset added to rect().fLeft and rect().fRight
        @param dy  offset added to rect().fTop and rect().fBottom
    */
    offset(dx: number, dy: number): void;
    /** Returns SkRRect translated by (dx, dy).
 
        @param dx  offset added to rect().fLeft and rect().fRight
        @param dy  offset added to rect().fTop and rect().fBottom
        @return    SkRRect bounds offset by (dx, dy), with unchanged corner radii
    */
    makeOffset(dx: number, dy: number): RRect;
    /** Returns true if rect is inside the bounds and corner radii, and if
        SkRRect and rect are not empty.
 
        @param rect  area tested for containment
        @return      true if SkRRect contains rect
 
        example: https://fiddle.skia.org/c/@RRect_contains
    */
    contains(rect: Rect): boolean;
    /** Returns true if bounds and radii values are finite and describe a SkRRect
        SkRRect::Type that matches getType(). All SkRRect methods construct valid types,
        even if the input values are not valid. Invalid SkRRect data can only
        be generated by corrupting memory.
 
        @return  true if bounds and radii match type()
 
        example: https://fiddle.skia.org/c/@RRect_isValid
    */
    isValid(): boolean;
    areRectAndRadiiValid(rect: Rect, radii: Point[]): boolean;
    transform(matrix: Matrix2D, dst?: RRect): boolean;
    /**
     * Initializes fRect. If the passed in rect is not finite or empty the rrect will be fully
     * initialized and false is returned. Otherwise, just fRect is initialized and true is returned.
     */
    initializeRect(rect: Rect): boolean;
    computeType(): void;
    checkCornerContainment(x: number, y: number): boolean;
    scaleRadii(): boolean;
}
export {};
