export declare enum PathFillType {
    /** Specifies that "inside" is computed by a non-zero sum of signed edge crossings */
    kWinding = 0,
    /** Specifies that "inside" is computed by an odd number of edge crossings */
    kEvenOdd = 1,
    /** Same as Winding, but draws outside of the path, rather than inside */
    kInverseWinding = 2,
    /** Same as EvenOdd, but draws outside of the path, rather than inside */
    kInverseEvenOdd = 3
}
export declare enum PathDirection {
    /** clockwise direction for adding closed contours */
    kCW = 0,
    /** counter-clockwise direction for adding closed contours */
    kCCW = 1
}
export declare enum PathSegmentMask {
    kLine_SkPathSegmentMask = 1,
    kQuad_SkPathSegmentMask = 2,
    kConic_SkPathSegmentMask = 4,
    kCubic_SkPathSegmentMask = 8
}
export declare enum PathVerb {
    kMove = 0,//!< SkPath::RawIter returns 1 point
    kLine = 1,//!< SkPath::RawIter returns 2 points
    kQuad = 2,//!< SkPath::RawIter returns 3 points
    kConic = 3,//!< SkPath::RawIter returns 3 points + 1 weight
    kCubic = 4,//!< SkPath::RawIter returns 4 points
    kClose = 5
}
export declare enum PathIterVerb {
    kMoveTo = 0,
    kLineTo = 1,
    kQuadCurveTo = 2,
    kConicTo = 3,
    kCubicCurveTo = 4,
    kClose = 5,
    kDone = 6
}
export declare function PathFillType_IsInverse(ft: PathFillType): boolean;
