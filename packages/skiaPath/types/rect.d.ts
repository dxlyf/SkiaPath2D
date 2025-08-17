import { Size } from './size';
import { Point } from './point';
export declare class Rect {
    elements: Float32Array;
    /** Returns constructed SkIRect set to (0, 0, 0, 0).
        Many other rectangles are empty; if left is equal to or greater than right,
        or if top is equal to or greater than bottom. Setting all members to zero
        is a convenience, but does not designate a special empty rectangle.

        @return  bounds (0, 0, 0, 0)
    */
    static makeEmpty(): Rect;
    /** Returns constructed SkIRect set to (0, 0, w, h). Does not validate input; w or h
        may be negative.

        @param w  width of constructed SkIRect
        @param h  height of constructed SkIRect
        @return   bounds (0, 0, w, h)
    */
    static makeWH(w: number, h: number): Rect;
    static makeLTRB(l: number, t: number, r: number, b: number): Rect;
    /** Returns constructed SkIRect set to (0, 0, size.width(), size.height()).
        Does not validate input; size.width() or size.height() may be negative.

        @param size  values for SkIRect width and height
        @return      bounds (0, 0, size.width(), size.height())
    */
    static makeSize(size: Size): Rect;
    /** Returns constructed SkIRect set to (pt.x(), pt.y(), pt.x() + size.width(),
        pt.y() + size.height()). Does not validate input; size.width() or size.height() may be
        negative.

        @param pt    values for SkIRect fLeft and fTop
        @param size  values for SkIRect width and height
        @return      bounds at pt with width and height of size
    */
    static makePtSize(pt: Point, size: Size): Rect;
    /** Returns constructed SkIRect set to: (x, y, x + w, y + h).
        Does not validate input; w or h may be negative.

        @param x  stored in fLeft
        @param y  stored in fTop
        @param w  added to x and stored in fRight
        @param h  added to y and stored in fBottom
        @return   bounds at (x, y) with width w and height h
    */
    static makeXYWH(x: number, y: number, w: number, h: number): Rect;
    constructor(elements: number[] | Float32Array);
    set(left: number, top: number, right: number, bottom: number): this;
    /** Returns left edge of SkIRect, if sorted.
        Call sort() to reverse fLeft and fRight if needed.

        @return  fLeft
    */
    get left(): number;
    set left(v: number);
    /** Returns top edge of SkIRect, if sorted. Call isEmpty() to see if SkIRect may be invalid,
        and sort() to reverse fTop and fBottom if needed.

        @return  fTop
    */
    get top(): number;
    set top(v: number);
    /** Returns right edge of SkIRect, if sorted.
        Call sort() to reverse fLeft and fRight if needed.

        @return  fRight
    */
    get right(): number;
    set right(v: number);
    /** Returns bottom edge of SkIRect, if sorted. Call isEmpty() to see if SkIRect may be invalid,
        and sort() to reverse fTop and fBottom if needed.

        @return  fBottom
    */
    get bottom(): number;
    set bottom(v: number);
    /** Returns left edge of SkIRect, if sorted. Call isEmpty() to see if SkIRect may be invalid,
        and sort() to reverse fLeft and fRight if needed.

        @return  fLeft
    */
    get x(): number;
    /** Returns top edge of SkIRect, if sorted. Call isEmpty() to see if SkIRect may be invalid,
        and sort() to reverse fTop and fBottom if needed.

        @return  fTop
    */
    get y(): number;
    get topLeft(): Point;
    /** Returns span on the x-axis. This does not check if SkIRect is sorted, or if
        result fits in 32-bit signed integer; result may be negative.

        @return  fRight minus fLeft
    */
    get width(): number;
    /** Returns span on the y-axis. This does not check if SkIRect is sorted, or if
        result fits in 32-bit signed integer; result may be negative.

        @return  fBottom minus fTop
    */
    get height(): number;
    /** Returns spans on the x-axis and y-axis. This does not check if SkIRect is sorted,
        or if result fits in 32-bit signed integer; result may be negative.

        @return  SkISize (width, height)
    */
    size(): Size;
    /** Returns true if width() or height() are zero or negative.

        @return  true if width() or height() are zero or negative
    */
    isEmpty(): boolean;
    /** Returns true if all members in a: fLeft, fTop, fRight, and fBottom; are
        identical to corresponding members in b.

        @param a  SkIRect to compare
        @param b  SkIRect to compare
        @return   true if members are equal
    */
    equals(a: Rect, b: Rect): boolean;
    /** Returns true if any member in a: fLeft, fTop, fRight, and fBottom; is not
        identical to the corresponding member in b.

        @param a  SkIRect to compare
        @param b  SkIRect to compare
        @return   true if members are not equal
    */
    notEquals(a: Rect, b: Rect): boolean;
    /** Sets SkIRect to (0, 0, 0, 0).

        Many other rectangles are empty; if left is equal to or greater than right,
        or if top is equal to or greater than bottom. Setting all members to zero
        is a convenience, but does not designate a special empty rectangle.
    */
    setEmpty(): void;
    /** Sets SkIRect to (left, top, right, bottom).
        left and right are not sorted; left is not necessarily less than right.
        top and bottom are not sorted; top is not necessarily less than bottom.

        @param left    stored in fLeft
        @param top     stored in fTop
        @param right   stored in fRight
        @param bottom  stored in fBottom
    */
    setLTRB(left: number, top: number, right: number, bottom: number): this;
    /** Sets SkIRect to: (x, y, x + width, y + height).
        Does not validate input; width or height may be negative.

        @param x       stored in fLeft
        @param y       stored in fTop
        @param width   added to x and stored in fRight
        @param height  added to y and stored in fBottom
    */
    setXYWH(x: number, y: number, width: number, height: number): this;
    setWH(width: number, height: number): this;
    setSize(size: Size): this;
    /** Returns SkIRect offset by (dx, dy).

        If dx is negative, SkIRect returned is moved to the left.
        If dx is positive, SkIRect returned is moved to the right.
        If dy is negative, SkIRect returned is moved upward.
        If dy is positive, SkIRect returned is moved downward.

        @param dx  offset added to fLeft and fRight
        @param dy  offset added to fTop and fBottom
        @return    SkIRect offset by dx and dy, with original width and height
    */
    makeOffset(dx: number, dy: number): Rect;
    /** Returns SkIRect offset by (offset.x(), offset.y()).

        If offset.x() is negative, SkIRect returned is moved to the left.
        If offset.x() is positive, SkIRect returned is moved to the right.
        If offset.y() is negative, SkIRect returned is moved upward.
        If offset.y() is positive, SkIRect returned is moved downward.

        @param offset  translation vector
        @return    SkIRect translated by offset, with original width and height
    */
    makeOffsetPoint(offset: Point): Rect;
    /** Returns SkIRect, inset by (dx, dy).

        If dx is negative, SkIRect returned is wider.
        If dx is positive, SkIRect returned is narrower.
        If dy is negative, SkIRect returned is taller.
        If dy is positive, SkIRect returned is shorter.

        @param dx  offset added to fLeft and subtracted from fRight
        @param dy  offset added to fTop and subtracted from fBottom
        @return    SkIRect inset symmetrically left and right, top and bottom
    */
    makeInset(dx: number, dy: number): Rect;
    /** Returns SkIRect, outset by (dx, dy).

        If dx is negative, SkIRect returned is narrower.
        If dx is positive, SkIRect returned is wider.
        If dy is negative, SkIRect returned is shorter.
        If dy is positive, SkIRect returned is taller.

        @param dx  offset subtracted to fLeft and added from fRight
        @param dy  offset subtracted to fTop and added from fBottom
        @return    SkIRect outset symmetrically left and right, top and bottom
    */
    makeOutset(dx: number, dy: number): Rect;
    /** Offsets SkIRect by adding dx to fLeft, fRight; and by adding dy to fTop, fBottom.

        If dx is negative, moves SkIRect returned to the left.
        If dx is positive, moves SkIRect returned to the right.
        If dy is negative, moves SkIRect returned upward.
        If dy is positive, moves SkIRect returned downward.

        @param dx  offset added to fLeft and fRight
        @param dy  offset added to fTop and fBottom
    */
    offset(dx: number, dy: number): this;
    /** Offsets SkIRect by adding delta.fX to fLeft, fRight; and by adding delta.fY to
        fTop, fBottom.

        If delta.fX is negative, moves SkIRect returned to the left.
        If delta.fX is positive, moves SkIRect returned to the right.
        If delta.fY is negative, moves SkIRect returned upward.
        If delta.fY is positive, moves SkIRect returned downward.

        @param delta  offset added to SkIRect
    */
    offsetPoint(delta: Point): this;
    /** Offsets SkIRect so that fLeft equals newX, and fTop equals newY. width and height
        are unchanged.

        @param newX  stored in fLeft, preserving width()
        @param newY  stored in fTop, preserving height()
    */
    offsetTo(newX: number, newY: number): this;
    /** Insets SkIRect by (dx,dy).

        If dx is positive, makes SkIRect narrower.
        If dx is negative, makes SkIRect wider.
        If dy is positive, makes SkIRect shorter.
        If dy is negative, makes SkIRect taller.

        @param dx  offset added to fLeft and subtracted from fRight
        @param dy  offset added to fTop and subtracted from fBottom
    */
    inset(dx: number, dy: number): this;
    /** Outsets SkIRect by (dx, dy).

        If dx is positive, makes SkIRect wider.
        If dx is negative, makes SkIRect narrower.
        If dy is positive, makes SkIRect taller.
        If dy is negative, makes SkIRect shorter.

        @param dx  subtracted to fLeft and added from fRight
        @param dy  subtracted to fTop and added from fBottom
    */
    outset(dx: number, dy: number): void;
    /** Adjusts SkIRect by adding dL to fLeft, dT to fTop, dR to fRight, and dB to fBottom.

        If dL is positive, narrows SkIRect on the left. If negative, widens it on the left.
        If dT is positive, shrinks SkIRect on the top. If negative, lengthens it on the top.
        If dR is positive, narrows SkIRect on the right. If negative, widens it on the right.
        If dB is positive, shrinks SkIRect on the bottom. If negative, lengthens it on the bottom.

        The resulting SkIRect is not checked for validity. Thus, if the resulting SkIRect left is
        greater than right, the SkIRect will be considered empty. Call sort() after this call
        if that is not the desired behavior.

        @param dL  offset added to fLeft
        @param dT  offset added to fTop
        @param dR  offset added to fRight
        @param dB  offset added to fBottom
    */
    adjust(dL: number, dT: number, dR: number, dB: number): this;
    /** Returns true if: fLeft <= x < fRight && fTop <= y < fBottom.
        Returns false if SkIRect is empty.

        Considers input to describe constructed SkIRect: (x, y, x + 1, y + 1) and
        returns true if constructed area is completely enclosed by SkIRect area.

        @param x  test SkIPoint x-coordinate
        @param y  test SkIPoint y-coordinate
        @return   true if (x, y) is inside SkIRect
    */
    containPoint(x: number, y: number): boolean;
    /**如果SkiRect包含r，则返回true。
     如果Skirect为空或R为空，则返回false。

     当Skirect区域完全包括R区域时，Skirect包含R。
     @param r  SkIRect contained
     @return   true if all sides of SkIRect are outside r
     */
    contains(r: Rect): boolean;
    /** Returns true if SkIRect contains r.
        Returns false if SkIRect is empty or r is empty.

        SkIRect contains r when SkIRect area completely includes r area.

        @param r  SkRect contained
        @return   true if all sides of SkIRect are outside r
    */
    /** Returns true if SkIRect contains construction.
        Asserts if SkIRect is empty or construction is empty, and if SK_DEBUG is defined.

        Return is undefined if SkIRect is empty or construction is empty.

        @param r  SkIRect contained
        @return   true if all sides of SkIRect are outside r
    */
    containsNoEmptyCheck(r: Rect): boolean;
    /** Returns true if SkIRect intersects r, and sets SkIRect to intersection.
        Returns false if SkIRect does not intersect r, and leaves SkIRect unchanged.

        Returns false if either r or SkIRect is empty, leaving SkIRect unchanged.

        @param r  limit of result
        @return   true if r and SkIRect have area in common
    */
    intersect(r: Rect): boolean;
    /** Returns true if a intersects b, and sets SkIRect to intersection.
        Returns false if a does not intersect b, and leaves SkIRect unchanged.

        Returns false if either a or b is empty, leaving SkIRect unchanged.

        @param a  SkIRect to intersect
        @param b  SkIRect to intersect
        @return   true if a and b have area in common
    */
    intersectRects(a: Rect, b: Rect): boolean;
    copy(source: Rect): void;
    clone(): Rect;
    /** Returns true if a intersects b.
        Returns false if either a or b is empty, or do not intersect.

        @param a  SkIRect to intersect
        @param b  SkIRect to intersect
        @return   true if a and b have area in common
    */
    /** Sets SkIRect to the union of itself and r.

     Has no effect if r is empty. Otherwise, if SkIRect is empty, sets SkIRect to r.

     @param r  expansion SkIRect

        example: https://fiddle.skia.org/c/@IRect_join_2
     */
    /** Swaps fLeft and fRight if fLeft is greater than fRight; and swaps
        fTop and fBottom if fTop is greater than fBottom. Result may be empty,
        and width() and height() will be zero or positive.
    */
    sort(): void;
    /** Returns SkIRect with fLeft and fRight swapped if fLeft is greater than fRight; and
        with fTop and fBottom swapped if fTop is greater than fBottom. Result may be empty;
        and width() and height() will be zero or positive.

        @return  sorted SkIRect
    */
    makeSorted(): Rect;
    /** Returns constructed SkIRect set to irect, promoting integers to scalar.
        Does not validate input; fLeft may be greater than fRight, fTop may be greater
        than fBottom.

        @param irect  integer unsorted bounds
        @return       irect members converted to SkScalar
    */
    static Make(rect: Rect): Rect;
    /** Returns true if fLeft is equal to or less than fRight, or if fTop is equal
        to or less than fBottom. Call sort() to reverse rectangles with negative
        width() or height().

        @return  true if width() or height() are zero or positive
    */
    isSorted(): boolean;
    /** Returns true if all values in the rectangle are finite: SK_ScalarMin or larger,
        and SK_ScalarMax or smaller.

        @return  true if no member is infinite or NaN
    */
    isFinite(): boolean;
    get halfWidth(): number;
    get halfHeight(): number;
    /** Returns average of left edge and right edge. Result does not change if SkRect
        is sorted. Result may overflow to infinity if SkRect is far from the origin.

        @return  midpoint on x-axis
    */
    get centerX(): number;
    /** Returns average of top edge and bottom edge. Result does not change if SkRect
        is sorted.

        @return  midpoint on y-axis
    */
    get centerY(): number;
    /** Returns the point this->centerX(), this->centerY().
        @return  rectangle center
     */
    get center(): Point;
    /** Returns four points in quad that enclose SkRect ordered as: top-left, top-right,
        bottom-right, bottom-left.

        TODO: Consider adding parameter to control whether quad is clockwise or counterclockwise.

        @param quad  storage for corners of SkRect

        example: https://fiddle.skia.org/c/@Rect_toQuad
    */
    toQuad(quad: Point[]): void;
    /** Sets to bounds of SkPoint array with count entries. If count is zero or smaller,
        or if SkPoint array contains an infinity or NaN, sets to (0, 0, 0, 0).

        Result is either empty or sorted: fLeft is less than or equal to fRight, and
        fTop is less than or equal to fBottom.

        @param pts    SkPoint array
        @param count  entries in array
    */
    setBounds(pts: Point[], count: number): void;
    /** Sets to bounds of SkPoint array with count entries. Returns false if count is
        zero or smaller, or if SkPoint array contains an infinity or NaN; in these cases
        sets SkRect to (0, 0, 0, 0).

        Result is either empty or sorted: fLeft is less than or equal to fRight, and
        fTop is less than or equal to fBottom.

        @param pts    SkPoint array
        @param count  entries in array
        @return       true if all SkPoint values are finite

        example: https://fiddle.skia.org/c/@Rect_setBoundsCheck
    */
    setBoundsCheck(pts: Point[], count: number): boolean;
    /** Sets to bounds of SkPoint pts array with count entries. If any SkPoint in pts
        contains infinity or NaN, all SkRect dimensions are set to NaN.

        @param pts    SkPoint array
        @param count  entries in array

        example: https://fiddle.skia.org/c/@Rect_setBoundsNoCheck
    */
    setBoundsNoCheck(pts: Point[], count: number): void;
    /** Sets bounds to the smallest SkRect enclosing SkPoint p0 and p1. The result is
        sorted and may be empty. Does not check to see if values are finite.
    
        @param p0  corner to include
        @param p1  corner to include
    */
    setPoints(p0: Point, p1: Point): void;
    /** Sets SkRect to the union of itself and r.
    
        Has no effect if r is empty. Otherwise, if SkRect is empty, sets
        SkRect to r.
    
        @param r  expansion SkRect
    
        example: https://fiddle.skia.org/c/@Rect_join_2
    */
    join(r: Rect): void;
    /** Sets SkRect to the union of itself and r.
    
        Asserts if r is empty and SK_DEBUG is defined.
        If SkRect is empty, sets SkRect to r.
    
        May produce incorrect results if r is empty.
    
        @param r  expansion SkRect
    */
    joinNonEmptyArg(r: Rect): void;
    /** Sets SkRect to the union of itself and the construction.
    
        May produce incorrect results if SkRect or r is empty.
    
        @param r  expansion SkRect
    */
    joinPossiblyEmptyRect(r: Rect): this;
    /** Sets SkIRect by adding 0.5 and discarding the fractional portion of SkRect
        members, using (SkScalarRoundToInt(fLeft), SkScalarRoundToInt(fTop),
                        SkScalarRoundToInt(fRight), SkScalarRoundToInt(fBottom)).
    
        @param dst  storage for SkIRect
    */
    roundRect(dst: Rect): void;
    /** Sets SkIRect by discarding the fractional portion of fLeft and fTop; and rounding
        up fRight and fBottom, using
        (SkScalarFloorToInt(fLeft), SkScalarFloorToInt(fTop),
         SkScalarCeilToInt(fRight), SkScalarCeilToInt(fBottom)).
    
        @param dst  storage for SkIRect
    */
    roundOutRect(dst: Rect): void;
    /** Sets SkRect by rounding up fLeft and fTop; and discarding the fractional portion
        of fRight and fBottom, using
        (SkScalarCeilToInt(fLeft), SkScalarCeilToInt(fTop),
         SkScalarFloorToInt(fRight), SkScalarFloorToInt(fBottom)).
    
        @param dst  storage for SkIRect
    */
    roundInRect(dst: Rect): void;
    /** Returns SkIRect by adding 0.5 and discarding the fractional portion of SkRect
        members, using (SkScalarRoundToInt(fLeft), SkScalarRoundToInt(fTop),
                        SkScalarRoundToInt(fRight), SkScalarRoundToInt(fBottom)).
    
        @return  rounded SkIRect
    */
    round(): Rect;
    /** Sets SkIRect by discarding the fractional portion of fLeft and fTop; and rounding
        up fRight and fBottom, using
        (SkScalarFloorToInt(fLeft), SkScalarFloorToInt(fTop),
         SkScalarCeilToInt(fRight), SkScalarCeilToInt(fBottom)).
    
        @return  rounded SkIRect
    */
    roundOut(): Rect;
    /** Sets SkIRect by rounding up fLeft and fTop; and discarding the fractional portion
        of fRight and fBottom, using
        (SkScalarCeilToInt(fLeft), SkScalarCeilToInt(fTop),
         SkScalarFloorToInt(fRight), SkScalarFloorToInt(fBottom)).
    
        @return  rounded SkIRect
    */
    roundIn(): Rect;
}
