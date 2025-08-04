var Qi = Object.defineProperty;
var Oi = (i, t, e) => t in i ? Qi(i, t, { enumerable: !0, configurable: !0, writable: !0, value: e }) : i[t] = e;
var x = (i, t, e) => Oi(i, typeof t != "symbol" ? t + "" : t, e);
class c {
  constructor(t) {
    x(this, "elements", new Float32Array([0, 0]));
    x(this, "isVector2", !0);
    this.elements.set(t);
  }
  static zero() {
    return this.create(0, 0);
  }
  static default() {
    return this.zero();
  }
  static create(t, e) {
    return new this([t, e]);
  }
  static fromPoint(t) {
    return this.create(t.x, t.y);
  }
  static fromRotation(t) {
    return this.create(Math.cos(t), Math.sin(t));
  }
  static fromXY(t, e) {
    return this.create(t, e);
  }
  static splat(t) {
    return this.create(t, t);
  }
  static make(t) {
    return Array.from({ length: t }, () => this.default());
  }
  get x() {
    return this.elements[0];
  }
  set x(t) {
    this.elements[0] = t;
  }
  get y() {
    return this.elements[1];
  }
  set y(t) {
    this.elements[1] = t;
  }
  set(t, e) {
    return (this.x !== t || this.y !== e) && (this.elements[0] = t, this.elements[1] = e), this;
  }
  clone() {
    return c.default().copy(this);
  }
  copy(t) {
    return this.set(t.x, t.y);
  }
  add(t) {
    return this.addVectors(this, t);
  }
  addVectors(t, e) {
    return this.set(t.x + e.x, t.y + e.y);
  }
  subtractVectors(t, e) {
    return this.set(t.x - e.x, t.y - e.y);
  }
  sub(t) {
    return this.subtractVectors(this, t);
  }
  subtract(t) {
    return this.subtractVectors(this, t);
  }
  negate() {
    return this.set(-this.x, -this.y);
  }
  inverse() {
    return this.set(1 / this.x, 1 / this.y);
  }
  multiplyScalar(t) {
    return this.multiplyVectorScalar(this, t);
  }
  multiplyVectorScalar(t, e) {
    return this.set(t.x * e, t.y * e);
  }
  subtractMultiplyVectorScalar(t, e, s) {
    return this.set(t.x - e.x * s, t.y - e.y * s);
  }
  addMultiplyVectorScalar(t, e, s) {
    return this.set(t.x + e.x * s, t.y + e.y * s);
  }
  multiplySubtractVectors(t, e) {
    return this.scale(t.x - e.x, t.y - e.y);
  }
  multiplyAddVectors(t, e) {
    return this.scale(t.x + e.x, t.y + e.y);
  }
  multiplyVectors(t, e) {
    return this.set(t.x * e.x, t.y * e.y);
  }
  multiply(t) {
    return this.multiplyVectors(this, t);
  }
  divideVectors(t, e) {
    return this.set(t.x / e.x, t.y / e.y);
  }
  divideScalar(t) {
    return this.set(this.x / t, this.y / t);
  }
  divide(t) {
    return this.divideVectors(this, t);
  }
  dot(t) {
    return this.x * t.x + this.y * t.y;
  }
  cross(t) {
    return this.x * t.y - this.y * t.x;
  }
  perp() {
    return this.set(-this.y, this.x);
  }
  rperp() {
    return this.set(this.y, -this.x);
  }
  canNormalize() {
    return this.isFinite() && (this.x !== 0 || this.y !== 0);
  }
  toNormalize() {
    return this.normalize(), this;
  }
  normalize() {
    return this.setPointLength(this, this.x, this.y, 1);
  }
  setNormalized(t) {
    return this.setPointLength(this, t.x, t.y, 1);
  }
  distanceToSquared(t) {
    return (this.x - t.x) ** 2 + (this.y - t.y) ** 2;
  }
  distanceTo(t) {
    return Math.sqrt(this.distanceToSquared(t));
  }
  manhattanDistanceTo(t) {
    return Math.abs(this.x - t.x) + Math.abs(this.y - t.y);
  }
  lengthSquared() {
    return this.lengthSq();
  }
  lengthSq() {
    return this.x * this.x + this.y * this.y;
  }
  length() {
    return Math.sqrt(this.lengthSq());
  }
  inverseLength() {
    return 1 / this.length();
  }
  angle() {
    return Math.atan2(this.y, this.x);
  }
  angleTanTo(t) {
    return Math.atan2(this.cross(t), this.dot(t));
  }
  angleTo(t) {
    return Math.acos(this.dot(t) / (this.length() * t.length()));
  }
  projectLength(t) {
    return this.dot(t) / t.length();
  }
  projectLengthNormalize(t) {
    return this.dot(t);
  }
  projectRatio(t) {
    return this.dot(t) / t.dot(t);
  }
  project(t) {
    let s = this.projectLength(t) / t.length();
    return this.multiplyVectorScalar(t, s);
  }
  projectNormalize(t) {
    let e = this.projectLengthNormalize(t);
    return this.multiplyVectorScalar(t, e);
  }
  reflect(t) {
    const e = this.projectLengthNormalize(t);
    return this.subtractMultiplyVectorScalar(this, t, 2 * e - 1);
  }
  translate(t, e) {
    return this.set(this.x + t, this.y + e);
  }
  rotate(t, e = c.zero()) {
    let s = Math.cos(t), n = Math.sin(t);
    if (e.isZero())
      return this.set(
        this.x * s - this.y * n,
        this.x * n + this.y * s
      );
    {
      const r = this.x - e.x, l = this.y - e.y;
      return this.set(
        r * s - l * n + e.x,
        r * n + l * s + e.y
      );
    }
  }
  scale(t, e) {
    return this.set(this.x * t, this.y * e);
  }
  round() {
    return this.set(Math.round(this.x), Math.round(this.y));
  }
  abs() {
    return this.set(Math.abs(this.x), Math.abs(this.y));
  }
  ceil() {
    return this.set(Math.ceil(this.x), Math.ceil(this.y));
  }
  floor() {
    return this.set(Math.floor(this.x), Math.floor(this.y));
  }
  trunc() {
    return this.set(Math.trunc(this.x), Math.trunc(this.y));
  }
  sign() {
    return this.set(Math.sign(this.x), Math.sign(this.y));
  }
  cosSin() {
    return this.set(Math.cos(this.x), Math.sin(this.y));
  }
  minScalar(t) {
    return this.set(Math.min(this.x, t), Math.min(this.y, t));
  }
  minVectors(t, e) {
    return this.set(Math.min(t.x, e.x), Math.min(t.y, e.y));
  }
  maxVectors(t, e) {
    return this.set(Math.max(t.x, e.x), Math.max(t.y, e.y));
  }
  min(t) {
    return this.minVectors(this, t);
  }
  max(t) {
    return this.maxVectors(this, t);
  }
  lerp(t, e, s) {
    return this.set(t.x + (e.x - t.x) * s, t.y + (e.y - t.y) * s);
  }
  smoonstep(t, e, s) {
    return this.set(t.x + (e.x - t.x) * s * s * (3 - 2 * s), t.y + (e.y - t.y) * s * s * (3 - 2 * s));
  }
  setPointLength(t, e, s, n, r) {
    let l = e, o = s, a = Math.sqrt(l * l + o * o), h = n / a;
    if (e *= h, s *= h, !Number.isFinite(e) || !Number.isFinite(s) || e == 0 && s == 0)
      return t.set(0, 0), !1;
    let u = 0;
    return r && (u = a), t.set(e, s), r && (r.value = u), !0;
  }
  setLength(t) {
    return this.setPointLength(this, this.x, this.y, t);
  }
  setLengthFrom(t, e, s) {
    return this.setPointLength(this, t, e, s);
  }
  isFinite() {
    return isFinite(this.x) && isFinite(this.y);
  }
  isZero() {
    return this.x === 0 && this.y === 0;
  }
  isOne() {
    return this.x === 1 && this.y === 1;
  }
  equals(t) {
    return this.x === t.x && this.y === t.y;
  }
  equalsEpsilon(t, e = 1e-5) {
    return Math.abs(this.x - t.x) < e && Math.abs(this.y - t.y) < e;
  }
  applyMatrix2D(t) {
    return this.set(
      t.a * this.x + t.c * this.y + t.e,
      t.b * this.x + t.d * this.y + t.f
    );
  }
  cw() {
    return this.set(-this.y, this.x);
  }
  ccw() {
    return this.set(this.y, -this.x);
  }
}
class te {
  constructor(t = 0, e = 0, s = 0) {
    x(this, "elements", new Float32Array([0, 0, 0]));
    this.elements.set([t, e, s]);
  }
  static default() {
    return new this(0, 0, 0);
  }
  static make(t) {
    let e = new Array(t);
    for (let s = 0; s < t; s++)
      e[s] = this.default();
    return e;
  }
  static create(t = 0, e = 0, s = 0) {
    return new this(t, e, s);
  }
  get x() {
    return this.elements[0];
  }
  set x(t) {
    this.elements[0] = t;
  }
  get y() {
    return this.elements[1];
  }
  set y(t) {
    this.elements[1] = t;
  }
  get z() {
    return this.elements[2];
  }
  set z(t) {
    this.elements[2] = t;
  }
  set(t, e, s) {
    return this.elements[0] = t, this.elements[1] = e, this.elements[2] = s, this;
  }
  clone() {
    return new te(this.x, this.y, this.z);
  }
  copy(t) {
    return this.elements[0] = t.x, this.elements[1] = t.y, this.elements[2] = t.z, this;
  }
}
const Yi = 1192092896e-16;
class N {
  constructor(t) {
    x(this, "value");
    this.value = t;
  }
  static from(t) {
    return new N(t);
  }
  swap(t) {
    let e = this.value;
    this.value = t.value, t.value = e;
  }
}
class F {
  constructor(t) {
    x(this, "data", []);
    x(this, "curIndex", 0);
    this.data = t;
  }
  static from(t) {
    return new this(t);
  }
  get length() {
    return this.data.length;
  }
  copy(t) {
    return this.data = t.data, this.curIndex = t.curIndex, this;
  }
  clone() {
    return new F(this.data).copy(this);
  }
  slice(t) {
    const e = new F(this.data);
    return e.curIndex = t, e;
  }
  get(t) {
    return this.data[t + this.curIndex];
  }
  set(t, e) {
    return this.data[t + this.curIndex] = e, this;
  }
  set value(t) {
    this.data[this.curIndex] = t;
  }
  get value() {
    return this.data[this.curIndex];
  }
  move(t) {
    return this.curIndex = t, this;
  }
  next(t = 1) {
    return this.move(this.curIndex + t), this;
  }
  prev(t = 1) {
    return this.move(this.curIndex - t), this;
  }
}
class qn {
  constructor(t, e = 0, s = !1) {
    x(this, "data");
    x(this, "size", 0);
    x(this, "currentIndex", 0);
    x(this, "increase", 1);
    this.size = t, this.currentIndex = e % t, this.increase = s ? t - 1 : 1, this.data = new Array(t);
  }
  get current() {
    return this.data[this.currentIndex];
  }
  get next() {
    return this.currentIndex = (this.currentIndex + this.increase) % this.size, this.data[this.currentIndex];
  }
}
const zn = (i, t) => {
  let e = i.value;
  i.value = t.value, t.value = e;
};
class T extends Float32Array {
  static make(t = 4) {
    return new T(t);
  }
  static fromXY(t, e) {
    return new T(2).setElements([t, e]);
  }
  static splat(t, e = 2) {
    return new T(e).setElements(new Array(e).fill(t));
  }
  static fromPoint(t) {
    let e = new T(2);
    return e.set([t.x, t.y]), e;
  }
  static fromPoints(t, e) {
    let s = new T(e * 2);
    for (let n = 0; n < e; n++)
      s.elements[n * 2] = t[n].x, s.elements[n * 2 + 1] = t[n].y;
    return s;
  }
  static fromArray(t, e = t.length) {
    let s = new T(e);
    for (let n = 0; n < e; n++)
      s.elements[n] = t[n];
    return s;
  }
  constructor(t) {
    super(t);
  }
  get x() {
    return this.elements[0];
  }
  set x(t) {
    this.elements[0] = t;
  }
  get y() {
    return this.elements[1];
  }
  set y(t) {
    this.elements[1] = t;
  }
  get z() {
    return this.elements[2];
  }
  set z(t) {
    this.elements[2] = t;
  }
  get w() {
    return this.elements[2];
  }
  set w(t) {
    this.elements[2] = t;
  }
  get h() {
    return this.elements[3];
  }
  set h(t) {
    this.elements[3] = t;
  }
  get elements() {
    return this;
  }
  setElements(t) {
    return this.set(t), this;
  }
  storePoint(t) {
    t.set(this.x, this.y);
  }
  store(t) {
    for (let e = 0; e < this.elements.length; e += 1)
      t[e] = this.elements[e];
  }
  storePoints(t) {
    for (let e = 0; e < this.elements.length; e += 2)
      t[e / 2].set(this.elements[e], this.elements[e + 1]);
  }
  add(t) {
    return this.setElements(this.elements.map((e, s) => e + t.elements[s]));
  }
  sub(t) {
    return this.setElements(this.elements.map((e, s) => e - t.elements[s]));
  }
  mulScalar(t) {
    return this.setElements(this.elements.map((e) => e * t));
  }
  min(t) {
    return this.setElements(this.elements.map((e, s) => Math.min(e, t.elements[s])));
  }
  max(t) {
    return this.setElements(this.elements.map((e, s) => Math.max(e, t.elements[s])));
  }
  mul(t) {
    return this.setElements(this.elements.map((e, s) => e * t.elements[s]));
  }
  div(t) {
    return this.setElements(this.elements.map((e, s) => e / t.elements[s]));
  }
  sqrt() {
    return this.setElements(this.elements.map((t) => Math.sqrt(t)));
  }
  inverse() {
    return this.setElements(this.elements.map((t) => 1 / t));
  }
  clone() {
    return new T(this.elements.length).setElements(this.elements);
  }
  copy(t) {
    return this.elements.set(t.elements), this;
  }
  xy() {
    return new T(2).setElements([this.x, this.y]);
  }
  xyxy() {
    return new T(4).setElements([this.x, this.y, this.x, this.y]);
  }
  xyz() {
    return new T(3).setElements([this.x, this.y, this.z]);
  }
  equals(t) {
    return this.elements.every((e, s) => e == t.elements[s]);
  }
  equalsWithTolerance(t, e = 1e-4) {
    return this.elements.every((s, n) => Math.abs(s - t.elements[n]) < e);
  }
  lerp(t, e, s) {
    return this.setElements(this.elements.map((n, r) => t.elements[r] + s.elements[r] * (e.elements[r] - t.elements[r])));
  }
  clmap(t, e) {
    return this.setElements(this.elements.map((s, n) => Math.max(t.elements[n], Math.min(e.elements[n], this.elements[n]))));
  }
}
function Di(i) {
  return Math.sqrt(i);
}
function ee(i, t) {
  return i / t;
}
function Bn(i, t) {
  return Math.min(i, t);
}
function Vn(i, t) {
  return Math.max(i, t);
}
function Xi(i) {
  return Math.abs(i);
}
function ct(i, t, e) {
  return Math.min(Math.max(i, t), e);
}
function Z(i, t, e) {
  return i + (t - i) * e;
}
function q(i) {
  return i == 0 || Xi(i) < Yi;
}
function _e(i, t) {
  return i / t;
}
function Qn(i) {
  return i;
}
function On(i) {
  return Number.isFinite(i);
}
function ji(i, t) {
  return t === 0 ? 1 / t === -1 / 0 ? -Math.abs(i) : Math.abs(i) : t < 0 ? -Math.abs(i) : Math.abs(i);
}
function Be(i) {
  const t = new ArrayBuffer(8), e = new DataView(t);
  e.setFloat64(0, i, !0);
  const s = e.getUint32(0, !0), n = e.getUint32(4, !0);
  let r = BigInt(n) << 32n | BigInt(s);
  r &= 0b0111111111110000000000000000000000000000000000000000000000000000n;
  const o = Number(r >> 32n & 0xffffffffn), a = Number(r & 0xffffffffn);
  return e.setUint32(0, a, !0), e.setUint32(4, o, !0), e.getFloat64(0, !0);
}
function Yn(i) {
  return Math.sign(i) * Math.pow(2, Math.floor(Math.log2(Math.abs(i))));
}
function Ct(i, t, e = 0) {
  const s = Number.MIN_VALUE, n = Math.max(
    Math.max(Be(i), s),
    Be(t)
  ), r = Number.EPSILON, l = n * (r * (e + 1));
  return i === t || Math.abs(t - i) < l;
}
class Dn {
  /**
   * Evaluates the cubic Bézier curve for a given t. It returns an X and Y coordinate
   * following the formula, which does the interpolation mentioned above.
   *     X(t) = X_0*(1-t)^3 + 3*X_1*t(1-t)^2 + 3*X_2*t^2(1-t) + X_3*t^3
   *     Y(t) = Y_0*(1-t)^3 + 3*Y_1*t(1-t)^2 + 3*Y_2*t^2(1-t) + Y_3*t^3
   *
   * t is typically in the range [0, 1], but this function will not assert that,
   * as Bézier curves are well-defined for any real number input.
   */
  static EvalAt(t, e) {
    const s = (y) => t[2 * y], n = (y) => t[2 * y + 1];
    if (e == 0)
      return [s(0), n(0)];
    if (e == 1)
      return [s(3), n(3)];
    let r = 1 - e, l = r * r, o = l * r, a = 3 * l * e, h = e * e, u = 3 * r * h, f = h * e;
    return [
      o * s(0) + a * s(1) + u * s(2) + f * s(3),
      o * n(0) + a * n(1) + u * n(2) + f * n(3)
    ];
  }
  /**
   * Splits the provided Bézier curve at the location t, resulting in two
   * Bézier curves that share a point (the end point from curve 1
   * and the start point from curve 2 are the same).
   *
   * t must be in the interval [0, 1].
   *
   * The provided twoCurves array will be filled such that indices
   * 0-7 are the first curve (representing the interval [0, t]), and
   * indices 6-13 are the second curve (representing [t, 1]).
   */
  static Subdivide(t, e, s) {
    const n = (M) => t[2 * M], r = (M) => t[2 * M + 1], l = (M) => s[2 * M], o = (M) => s[2 * M + 1], a = (M, P) => {
      s[2 * M] = P;
    }, h = (M, P) => {
      s[2 * M + 1] = P;
    }, u = (M) => s[2 * M + 6], f = (M) => s[2 * M + 7], y = (M, P) => {
      s[2 * M + 6] = P;
    }, m = (M, P) => {
      s[2 * M + 7] = P;
    };
    a(0, n(0)), h(0, r(0)), y(3, n(3)), m(3, r(3));
    let k = Z(n(0), n(1), e), p = Z(r(0), r(1), e), b = Z(n(1), n(2), e), d = Z(r(1), r(2), e), _ = Z(n(2), n(3), e), v = Z(r(2), r(3), e);
    a(1, k), h(1, p), y(2, _), m(2, v), a(2, Z(k, b, e)), h(2, Z(p, d, e)), y(1, Z(b, _, e)), m(1, Z(d, v, e)), a(3, Z(l(2), u(1), e)), h(3, Z(o(2), f(1), e));
  }
  /**
   * Converts the provided Bézier curve into the the equivalent cubic
   *    f(t) = A*t^3 + B*t^2 + C*t + D
   * where f(t) will represent Y coordinates over time if yValues is
   * true and the X coordinates if yValues is false.
   *
   * In effect, this turns the control points into an actual line, representing
   * the x or y values.
   */
  static ConvertToPolynomial(t, e) {
    const s = e ? t.slice(1) : t, n = (l) => s[2 * l];
    let r = new Array(4);
    return r[0] = -n(0) + 3 * n(1) - 3 * n(2) + n(3), r[1] = 3 * n(0) - 6 * n(1) + 3 * n(2), r[2] = -3 * n(0) + 3 * n(1), r[3] = n(0), r;
  }
}
function Zi(i, t) {
  return q(t) ? q(i) : Math.abs(i / t) < 1e-16;
}
function Ui(i, t, e) {
  return q(i) ? (e[0] = 0, q(t) ? 1 : 0) : (e[0] = -t / i, Number.isFinite(e[0]) ? 1 : 0);
}
class Kt {
  /**
   * Puts up to 2 real solutions to the equation
   *   A*t^2 + B*t + C = 0
   * in the provided array.
   */
  static RootsReal(t, e, s, n) {
    if (Zi(t, e))
      return Ui(e, s, n);
    const r = _e(e, 2 * t), l = _e(s, t), o = r * r;
    if (!Number.isFinite(o - l) || !q(o - l) && o < l)
      return 0;
    let a = 0;
    return o > l && (a = Math.sqrt(o - l)), n[0] = a - r, n[1] = -a - r, q(a) || Ct(n[0], n[1]) ? 1 : 2;
  }
  /**
   * Evaluates the quadratic function with the 3 provided coefficients and the
   * provided variable.
   */
  static EvalAt(t, e, s, n) {
    return t * n * n + e * n + s;
  }
}
const Ve = Math.PI;
function Yt(i, t) {
  return q(i) ? q(t) : Ct(i, t, 0);
}
function ie(i) {
  return Math.abs(i) < 1e-8;
}
function Hi(i, t, e, s) {
  let n = [0, 0], r = Kt.RootsReal(3 * i, 2 * t, e, n), l = 0;
  for (let o = 0; o < r; o++) {
    let a = n[o];
    a >= 0 && a <= 1 && (s[l++] = a);
  }
  return l;
}
function Ki(i, t, e, s, n, r) {
  let l = Wt.EvalAt(i, t, e, s, n);
  if (ie(l))
    return n;
  let o = Wt.EvalAt(i, t, e, s, r);
  if (!Number.isFinite(l) || !Number.isFinite(o) || l > 0 && o > 0 || l < 0 && o < 0)
    return -1;
  let a = 1e3;
  for (let h = 0; h < a; h++) {
    let u = (n + r) / 2, f = Wt.EvalAt(i, t, e, s, u);
    if (ie(f))
      return u;
    f < 0 && l < 0 || f > 0 && l > 0 ? n = u : r = u;
  }
  return -1;
}
function Ji(i, t) {
  return q(t) ? q(i) : Math.abs(i / t) < 1e-7;
}
class Wt {
  /**
  * Puts up to 3 real solutions to the equation
  *   A*t^3 + B*t^2 + C*t + d = 0
  * in the provided array and returns how many roots that was.
  */
  static RootsReal(t, e, s, n, r) {
    if (Ji(t, e))
      return Kt.RootsReal(e, s, n, r);
    if (q(n)) {
      let _ = Kt.RootsReal(t, e, s, r);
      for (let v = 0; v < _; ++v)
        if (q(r[v]))
          return _;
      return r[_++] = 0, _;
    }
    if (q(t + e + s + n)) {
      let _ = Kt.RootsReal(t, t + e, -n, r);
      for (let v = 0; v < _; ++v)
        if (Ct(r[v], 1))
          return _;
      return r[_++] = 1, _;
    }
    let l, o, a;
    {
      let _ = _e(1, t);
      l = e * _, o = s * _, a = n * _;
    }
    let h = l * l, u = (h - o * 3) / 9, f = (2 * h * l - 9 * l * o + 27 * a) / 54, y = f * f, m = u * u * u, k = y - m;
    if (!Number.isFinite(k))
      return 0;
    let p = l / 3, b, d = F.from(r);
    if (k < 0) {
      const _ = Math.acos(ct(f / Math.sqrt(m), -1, 1)), v = -2 * Math.sqrt(u);
      b = v * Math.cos(_ / 3) - p, d.value = b, d.next(), b = v * Math.cos((_ + 2 * Ve) / 3) - p, Yt(r[0], b) || (d.value = b, d.next()), b = v * Math.cos((_ - 2 * Ve) / 3) - p, !Yt(r[0], b) && (d.curIndex == 1 || !Yt(r[1], b)) && (d.value = b, d.next());
    } else {
      const _ = Math.sqrt(k);
      t = Math.abs(f) + _, t = Math.cbrt(t), f > 0 && (t = -t), q(t) || (t += u / t), b = t - p, d.value = b, d.next(), !q(y) && Ct(y, m) && (b = -t / 2 - p, Yt(r[0], b) || (d.value = b, d.next()));
    }
    return d.curIndex;
  }
  /**
  * Puts up to 3 real solutions to the equation
  *   A*t^3 + B*t^2 + C*t + D = 0
  * in the provided array, with the constraint that t is in the range [0.0, 1.0],
  * and returns how many roots that was.
  */
  static RootsValidT(t, e, s, n, r) {
    let l = [0, 0, 0], o = Wt.RootsReal(t, e, s, n, l), a = 0;
    for (let h = 0; h < o; ++h) {
      let u = l[h];
      u >= 1 && u <= 1.00005 ? (a < 1 || !Ct(r[0], 1)) && (a < 2 || !Ct(r[1], 1)) && (r[a++] = 1) : u >= -5e-5 && (u <= 0 || q(u)) ? (a < 1 || !q(r[0])) && (a < 2 || !q(r[1])) && (r[a++] = 0) : u > 0 && u < 1 && (r[a++] = u);
    }
    return a;
  }
  /**
  * Puts up to 3 real solutions to the equation
  *   A*t^3 + B*t^2 + C*t + D = 0
  * in the provided array, with the constraint that t is in the range [0.0, 1.0],
  * and returns how many roots that was.
  * This is a slower method than RootsValidT, but more accurate in circumstances
  * where floating point error gets too big.
  */
  static BinarySearchRootsValidT(t, e, s, n, r) {
    if (!Number.isFinite(t) || !Number.isFinite(e) || !Number.isFinite(s) || !Number.isFinite(n))
      return 0;
    let l = [0, 0, 0, 1], o = [0, 0], a = Hi(t, e, s, o), h = 2 - a;
    a == 1 && (l[h + 1] = o[0]), a == 2 && (l[h + 1] = Math.min(o[0], o[1]), l[h + 2] = Math.max(o[0], o[1]));
    let u = 0;
    for (; h < 3; h++) {
      let f = Ki(t, e, s, n, l[h], l[h + 1]);
      f >= 0 && (u < 1 || !ie(r[0] - f)) && (u < 2 || !ie(r[1] - f)) && (r[u++] = f);
    }
    return u;
  }
  /**
  * Evaluates the cubic function with the 4 provided coefficients and the
  * provided variable.
  */
  static EvalAt(t, e, s, n, r) {
    return t * r * r * r + e * r * r + s * r + n;
  }
  static EvalAt_2(t, e) {
    return this.EvalAt(t[0], t[1], t[2], t[3], e);
  }
}
const Q = 1, pt = 0.5, Xn = Math.SQRT2, et = Math.PI, jn = 0.414213562, ve = 0.707106781, $i = 3402823466e29, Zn = -$i, Un = 1 / 0, Hn = -1 / 0, Kn = NaN, Gi = (i) => i, Jn = (i) => i, $n = (i) => i, Gn = (i) => i, tr = (i) => i, Jt = (i) => i, ki = (i) => Math.floor(i), er = (i) => Math.ceil(i), me = (i) => Math.round(i), ts = (i) => Math.trunc(i), ir = (i) => Math.floor(i), es = (i) => Math.ceil(i), sr = (i) => Math.round(i), X = (i) => Math.abs(i), nr = (i, t) => Math.sign(t) * Math.abs(i), rr = (i, t) => i % t, K = (i) => Math.sqrt(i), is = (i, t) => Math.pow(i, t), Te = (i) => Math.sin(i), xt = (i) => Math.cos(i), ss = (i) => Math.tan(i), lr = (i) => Math.asin(i), ns = (i) => Math.acos(i), Qe = (i, t) => Math.atan2(i, t), or = (i) => Math.exp(i), ar = (i) => Math.log(i), hr = (i) => Math.log2(i), rs = (i) => Number.isNaN(i), kt = (i) => Number.isFinite(i), Re = (i, t) => Number.isFinite(i) && Number.isFinite(t), ls = (i, t) => i.slice(0, t).every(Number.isFinite), ur = (i) => i - ts(i), Nt = (i) => i * i, Me = (i) => Q / i, Oe = (i, t) => (i + t) * pt, $ = (i) => i * pt, Ye = (i) => i * (et / 180), fr = (i) => i * (180 / et), cr = (i) => i === ki(i), De = (i) => i < 0 ? -1 : i > 0 ? 1 : 0, mr = (i) => i < 0 ? -Q : i > 0 ? Q : 0, we = Q / 4096, st = (i, t = we) => X(i) <= t, U = (i, t, e = we) => X(i - t) <= e, bi = Q / 65536, $t = (i) => {
  const t = Te(i);
  return st(t, bi) ? 0 : t;
}, Gt = (i) => {
  const t = xt(i);
  return st(t, bi) ? 0 : t;
}, G = (i, t, e) => ((e < 0 || e > Q) && console.warn("t out of range [0, 1]"), i + (t - i) * e), yr = (i, t, e, s) => {
  if (s <= 0 || !t || !e) throw new Error("Invalid input");
  let n = 0;
  for (; n < s && t[n] < i; ) n++;
  if (n === s) return e[s - 1];
  if (n === 0) return e[0];
  const r = t[n - 1], l = t[n], o = (i - r) / (l - r);
  return G(e[n - 1], e[n], o);
}, Xe = (i, t, e) => {
  if (e < 0) throw new Error("Invalid length");
  for (let s = 0; s < e; s++) if (i[s] !== t[s]) return !1;
  return !0;
};
class Ft {
  constructor(t, e) {
    this.width = t, this.height = e;
  }
  static default() {
    return new Ft(0, 0);
  }
  static from(t, e) {
    return new Ft(t, e);
  }
  set(t, e) {
    this.width = t, this.height = e;
  }
  setEmpty() {
    return this.set(0, 0);
  }
  isEmpty() {
    return this.width <= 0 || this.height <= 0;
  }
  isZero() {
    return this.width === 0 && this.height === 0;
  }
  round() {
    return this.set(Math.round(this.width), Math.round(this.height));
  }
  ceil() {
    return this.set(Math.ceil(this.width), Math.ceil(this.height));
  }
  floor() {
    return this.set(Math.floor(this.width), Math.floor(this.height));
  }
  trunc() {
    return this.set(Math.trunc(this.width), Math.trunc(this.height));
  }
  clone() {
    return new Ft(this.width, this.height);
  }
  equals(t) {
    return this.width === t.width && this.height === t.height;
  }
  equalsWithEpsilon(t, e = 1e-4) {
    return Math.abs(this.width - t.width) < e && Math.abs(this.height - t.height) < e;
  }
}
class W {
  constructor(t) {
    x(this, "elements", new Float32Array([0, 0, 0, 0]));
    this.elements.set(t);
  }
  /** Returns constructed SkIRect set to (0, 0, 0, 0).
          Many other rectangles are empty; if left is equal to or greater than right,
          or if top is equal to or greater than bottom. Setting all members to zero
          is a convenience, but does not designate a special empty rectangle.
  
          @return  bounds (0, 0, 0, 0)
      */
  static makeEmpty() {
    return new this([0, 0, 0, 0]);
  }
  /** Returns constructed SkIRect set to (0, 0, w, h). Does not validate input; w or h
          may be negative.
  
          @param w  width of constructed SkIRect
          @param h  height of constructed SkIRect
          @return   bounds (0, 0, w, h)
      */
  static makeWH(t, e) {
    return this.makeLTRB(0, 0, t, e);
  }
  static makeLTRB(t, e, s, n) {
    return new this([t, e, s, n]);
  }
  /** Returns constructed SkIRect set to (0, 0, size.width(), size.height()).
          Does not validate input; size.width() or size.height() may be negative.
  
          @param size  values for SkIRect width and height
          @return      bounds (0, 0, size.width(), size.height())
      */
  static makeSize(t) {
    return this.makeWH(t.width, t.height);
  }
  /** Returns constructed SkIRect set to (pt.x(), pt.y(), pt.x() + size.width(),
          pt.y() + size.height()). Does not validate input; size.width() or size.height() may be
          negative.
  
          @param pt    values for SkIRect fLeft and fTop
          @param size  values for SkIRect width and height
          @return      bounds at pt with width and height of size
      */
  static makePtSize(t, e) {
    return this.makeXYWH(t.x, t.y, e.width, e.height);
  }
  /** Returns constructed SkIRect set to: (x, y, x + w, y + h).
          Does not validate input; w or h may be negative.
  
          @param x  stored in fLeft
          @param y  stored in fTop
          @param w  added to x and stored in fRight
          @param h  added to y and stored in fBottom
          @return   bounds at (x, y) with width w and height h
      */
  static makeXYWH(t, e, s, n) {
    return this.makeLTRB(t, e, t + s, e + n);
  }
  set(t, e, s, n) {
    return this.elements.set([t, e, s, n]), this;
  }
  /** Returns left edge of SkIRect, if sorted.
          Call sort() to reverse fLeft and fRight if needed.
  
          @return  fLeft
      */
  get left() {
    return this.elements[0];
  }
  set left(t) {
    this.elements[0] = t;
  }
  /** Returns top edge of SkIRect, if sorted. Call isEmpty() to see if SkIRect may be invalid,
          and sort() to reverse fTop and fBottom if needed.
  
          @return  fTop
      */
  get top() {
    return this.elements[1];
  }
  set top(t) {
    this.elements[1] = t;
  }
  /** Returns right edge of SkIRect, if sorted.
          Call sort() to reverse fLeft and fRight if needed.
  
          @return  fRight
      */
  get right() {
    return this.elements[2];
  }
  set right(t) {
    this.elements[2] = t;
  }
  /** Returns bottom edge of SkIRect, if sorted. Call isEmpty() to see if SkIRect may be invalid,
          and sort() to reverse fTop and fBottom if needed.
  
          @return  fBottom
      */
  get bottom() {
    return this.elements[3];
  }
  set bottom(t) {
    this.elements[3] = t;
  }
  /** Returns left edge of SkIRect, if sorted. Call isEmpty() to see if SkIRect may be invalid,
          and sort() to reverse fLeft and fRight if needed.
  
          @return  fLeft
      */
  get x() {
    return this.left;
  }
  /** Returns top edge of SkIRect, if sorted. Call isEmpty() to see if SkIRect may be invalid,
          and sort() to reverse fTop and fBottom if needed.
  
          @return  fTop
      */
  get y() {
    return this.top;
  }
  // Experimental
  get topLeft() {
    return c.fromXY(this.left, this.top);
  }
  /** Returns span on the x-axis. This does not check if SkIRect is sorted, or if
          result fits in 32-bit signed integer; result may be negative.
  
          @return  fRight minus fLeft
      */
  get width() {
    return Math.trunc(this.right - this.left);
  }
  /** Returns span on the y-axis. This does not check if SkIRect is sorted, or if
          result fits in 32-bit signed integer; result may be negative.
  
          @return  fBottom minus fTop
      */
  get height() {
    return Math.trunc(this.bottom - this.top);
  }
  /** Returns spans on the x-axis and y-axis. This does not check if SkIRect is sorted,
          or if result fits in 32-bit signed integer; result may be negative.
  
          @return  SkISize (width, height)
      */
  size() {
    return Ft.from(this.width, this.height);
  }
  /** Returns true if width() or height() are zero or negative.
  
          @return  true if width() or height() are zero or negative
      */
  isEmpty() {
    let t = this.width, e = this.height;
    return t <= 0 || e <= 0 ? !0 : !Number.isSafeInteger(t | e);
  }
  /** Returns true if all members in a: fLeft, fTop, fRight, and fBottom; are
          identical to corresponding members in b.
  
          @param a  SkIRect to compare
          @param b  SkIRect to compare
          @return   true if members are equal
      */
  equals(t, e) {
    return t.left == e.left && t.top == e.top && t.right == e.right && t.bottom == e.bottom;
  }
  /** Returns true if any member in a: fLeft, fTop, fRight, and fBottom; is not
          identical to the corresponding member in b.
  
          @param a  SkIRect to compare
          @param b  SkIRect to compare
          @return   true if members are not equal
      */
  notEquals(t, e) {
    return t.left != e.left || t.top != e.top || t.right != e.right || t.bottom != e.bottom;
  }
  /** Sets SkIRect to (0, 0, 0, 0).
  
          Many other rectangles are empty; if left is equal to or greater than right,
          or if top is equal to or greater than bottom. Setting all members to zero
          is a convenience, but does not designate a special empty rectangle.
      */
  setEmpty() {
    this.elements.set([0, 0, 0, 0]);
  }
  /** Sets SkIRect to (left, top, right, bottom).
          left and right are not sorted; left is not necessarily less than right.
          top and bottom are not sorted; top is not necessarily less than bottom.
  
          @param left    stored in fLeft
          @param top     stored in fTop
          @param right   stored in fRight
          @param bottom  stored in fBottom
      */
  setLTRB(t, e, s, n) {
    return this.set(t, e, s, n);
  }
  /** Sets SkIRect to: (x, y, x + width, y + height).
          Does not validate input; width or height may be negative.
  
          @param x       stored in fLeft
          @param y       stored in fTop
          @param width   added to x and stored in fRight
          @param height  added to y and stored in fBottom
      */
  setXYWH(t, e, s, n) {
    return this.setLTRB(t, e, t + s, e + n);
  }
  setWH(t, e) {
    return this.setLTRB(0, 0, t, e);
  }
  setSize(t) {
    return this.setLTRB(0, 0, t.width, t.height);
  }
  /** Returns SkIRect offset by (dx, dy).
  
          If dx is negative, SkIRect returned is moved to the left.
          If dx is positive, SkIRect returned is moved to the right.
          If dy is negative, SkIRect returned is moved upward.
          If dy is positive, SkIRect returned is moved downward.
  
          @param dx  offset added to fLeft and fRight
          @param dy  offset added to fTop and fBottom
          @return    SkIRect offset by dx and dy, with original width and height
      */
  makeOffset(t, e) {
    return W.makeLTRB(this.x + t, this.y + e, this.right + t, this.bottom + e);
  }
  /** Returns SkIRect offset by (offset.x(), offset.y()).
  
          If offset.x() is negative, SkIRect returned is moved to the left.
          If offset.x() is positive, SkIRect returned is moved to the right.
          If offset.y() is negative, SkIRect returned is moved upward.
          If offset.y() is positive, SkIRect returned is moved downward.
  
          @param offset  translation vector
          @return    SkIRect translated by offset, with original width and height
      */
  makeOffsetPoint(t) {
    return this.makeOffset(t.x, t.y);
  }
  /** Returns SkIRect, inset by (dx, dy).
  
          If dx is negative, SkIRect returned is wider.
          If dx is positive, SkIRect returned is narrower.
          If dy is negative, SkIRect returned is taller.
          If dy is positive, SkIRect returned is shorter.
  
          @param dx  offset added to fLeft and subtracted from fRight
          @param dy  offset added to fTop and subtracted from fBottom
          @return    SkIRect inset symmetrically left and right, top and bottom
      */
  makeInset(t, e) {
    return W.makeLTRB(this.x + t, this.y + e, this.right - t, this.bottom - e);
  }
  /** Returns SkIRect, outset by (dx, dy).
  
          If dx is negative, SkIRect returned is narrower.
          If dx is positive, SkIRect returned is wider.
          If dy is negative, SkIRect returned is shorter.
          If dy is positive, SkIRect returned is taller.
  
          @param dx  offset subtracted to fLeft and added from fRight
          @param dy  offset subtracted to fTop and added from fBottom
          @return    SkIRect outset symmetrically left and right, top and bottom
      */
  makeOutset(t, e) {
    return this.makeInset(-t, -e);
  }
  /** Offsets SkIRect by adding dx to fLeft, fRight; and by adding dy to fTop, fBottom.
  
          If dx is negative, moves SkIRect returned to the left.
          If dx is positive, moves SkIRect returned to the right.
          If dy is negative, moves SkIRect returned upward.
          If dy is positive, moves SkIRect returned downward.
  
          @param dx  offset added to fLeft and fRight
          @param dy  offset added to fTop and fBottom
      */
  offset(t, e) {
    return this.setLTRB(this.x + t, this.y + e, this.right + t, this.bottom + e);
  }
  /** Offsets SkIRect by adding delta.fX to fLeft, fRight; and by adding delta.fY to
          fTop, fBottom.
  
          If delta.fX is negative, moves SkIRect returned to the left.
          If delta.fX is positive, moves SkIRect returned to the right.
          If delta.fY is negative, moves SkIRect returned upward.
          If delta.fY is positive, moves SkIRect returned downward.
  
          @param delta  offset added to SkIRect
      */
  offsetPoint(t) {
    return this.offset(t.x, t.y);
  }
  /** Offsets SkIRect so that fLeft equals newX, and fTop equals newY. width and height
          are unchanged.
  
          @param newX  stored in fLeft, preserving width()
          @param newY  stored in fTop, preserving height()
      */
  offsetTo(t, e) {
    return this.setLTRB(t, e, this.right + t - this.left, this.bottom + e - this.top);
  }
  /** Insets SkIRect by (dx,dy).
  
          If dx is positive, makes SkIRect narrower.
          If dx is negative, makes SkIRect wider.
          If dy is positive, makes SkIRect shorter.
          If dy is negative, makes SkIRect taller.
  
          @param dx  offset added to fLeft and subtracted from fRight
          @param dy  offset added to fTop and subtracted from fBottom
      */
  inset(t, e) {
    return this.setLTRB(this.x + t, this.y + e, this.right - t, this.bottom - e);
  }
  /** Outsets SkIRect by (dx, dy).
  
          If dx is positive, makes SkIRect wider.
          If dx is negative, makes SkIRect narrower.
          If dy is positive, makes SkIRect taller.
          If dy is negative, makes SkIRect shorter.
  
          @param dx  subtracted to fLeft and added from fRight
          @param dy  subtracted to fTop and added from fBottom
      */
  outset(t, e) {
    this.inset(-t, -e);
  }
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
  adjust(t, e, s, n) {
    return this.setLTRB(this.left + t, this.top + e, this.right + s, this.bottom + n);
  }
  /** Returns true if: fLeft <= x < fRight && fTop <= y < fBottom.
          Returns false if SkIRect is empty.
  
          Considers input to describe constructed SkIRect: (x, y, x + 1, y + 1) and
          returns true if constructed area is completely enclosed by SkIRect area.
  
          @param x  test SkIPoint x-coordinate
          @param y  test SkIPoint y-coordinate
          @return   true if (x, y) is inside SkIRect
      */
  containPoint(t, e) {
    return t >= this.left && t < this.right && e >= this.top && e < this.bottom;
  }
  /**如果SkiRect包含r，则返回true。
       如果Skirect为空或R为空，则返回false。
  
       当Skirect区域完全包括R区域时，Skirect包含R。
       @param r  SkIRect contained
       @return   true if all sides of SkIRect are outside r
       */
  contains(t) {
    return !t.isEmpty() && !this.isEmpty() && // check for empties
    this.left <= t.left && this.top <= t.top && this.right >= t.right && this.bottom >= t.bottom;
  }
  /** Returns true if SkIRect contains r.
          Returns false if SkIRect is empty or r is empty.
  
          SkIRect contains r when SkIRect area completely includes r area.
  
          @param r  SkRect contained
          @return   true if all sides of SkIRect are outside r
      */
  //  contains(r:Rect){
  //  }
  /** Returns true if SkIRect contains construction.
          Asserts if SkIRect is empty or construction is empty, and if SK_DEBUG is defined.
  
          Return is undefined if SkIRect is empty or construction is empty.
  
          @param r  SkIRect contained
          @return   true if all sides of SkIRect are outside r
      */
  containsNoEmptyCheck(t) {
    return this.left <= t.left && this.top <= t.top && this.right >= t.right && this.bottom >= t.bottom;
  }
  /** Returns true if SkIRect intersects r, and sets SkIRect to intersection.
          Returns false if SkIRect does not intersect r, and leaves SkIRect unchanged.
  
          Returns false if either r or SkIRect is empty, leaving SkIRect unchanged.
  
          @param r  limit of result
          @return   true if r and SkIRect have area in common
      */
  intersect(t) {
    return this.intersectRects(this, t);
  }
  /** Returns true if a intersects b, and sets SkIRect to intersection.
          Returns false if a does not intersect b, and leaves SkIRect unchanged.
  
          Returns false if either a or b is empty, leaving SkIRect unchanged.
  
          @param a  SkIRect to intersect
          @param b  SkIRect to intersect
          @return   true if a and b have area in common
      */
  intersectRects(t, e) {
    let s = W.makeLTRB(
      Math.max(t.left, e.left),
      Math.max(t.top, e.top),
      Math.max(t.right, e.right),
      Math.max(t.bottom, e.bottom)
    );
    return s.isEmpty() ? !1 : (this.copy(s), !0);
  }
  copy(t) {
    this.elements.set(t.elements);
  }
  clone() {
    return W.makeLTRB(this.left, this.top, this.right, this.bottom);
  }
  /** Returns true if a intersects b.
          Returns false if either a or b is empty, or do not intersect.
  
          @param a  SkIRect to intersect
          @param b  SkIRect to intersect
          @return   true if a and b have area in common
      */
  // Intersects(const SkIRect& a, const SkIRect& b) {
  //     return SkIRect{}.intersect(a, b);
  // }
  /** Sets SkIRect to the union of itself and r.
  
       Has no effect if r is empty. Otherwise, if SkIRect is empty, sets SkIRect to r.
  
       @param r  expansion SkIRect
  
          example: https://fiddle.skia.org/c/@IRect_join_2
       */
  // void join(const SkIRect& r);
  /** Swaps fLeft and fRight if fLeft is greater than fRight; and swaps
      fTop and fBottom if fTop is greater than fBottom. Result may be empty,
      and width() and height() will be zero or positive.
  */
  sort() {
    if (this.left > this.right) {
      let t = this.left;
      this.left = this.right, this.right = t;
    }
    if (this.top > this.bottom) {
      let t = this.top;
      this.top = this.bottom, this.bottom = t;
    }
  }
  /** Returns SkIRect with fLeft and fRight swapped if fLeft is greater than fRight; and
          with fTop and fBottom swapped if fTop is greater than fBottom. Result may be empty;
          and width() and height() will be zero or positive.
  
          @return  sorted SkIRect
      */
  makeSorted() {
    return W.makeLTRB(
      Math.min(this.left, this.right),
      Math.min(this.top, this.bottom),
      Math.max(this.left, this.right),
      Math.max(this.top, this.bottom)
    );
  }
  /** Returns constructed SkIRect set to irect, promoting integers to scalar.
          Does not validate input; fLeft may be greater than fRight, fTop may be greater
          than fBottom.
  
          @param irect  integer unsorted bounds
          @return       irect members converted to SkScalar
      */
  static Make(t) {
    return this.makeLTRB(t.left, t.top, t.right, t.bottom);
  }
  /** Returns true if fLeft is equal to or less than fRight, or if fTop is equal
          to or less than fBottom. Call sort() to reverse rectangles with negative
          width() or height().
  
          @return  true if width() or height() are zero or positive
      */
  isSorted() {
    return this.left <= this.right && this.top <= this.bottom;
  }
  /** Returns true if all values in the rectangle are finite: SK_ScalarMin or larger,
          and SK_ScalarMax or smaller.
  
          @return  true if no member is infinite or NaN
      */
  isFinite() {
    let t = 0;
    return t *= this.left, t *= this.top, t *= this.right, t *= this.bottom, !Number.isNaN(t);
  }
  get halfWidth() {
    return this.right * 0.5 - this.left * 0.5;
  }
  get halfHeight() {
    return this.bottom * 0.5 - this.top * 0.5;
  }
  /** Returns average of left edge and right edge. Result does not change if SkRect
          is sorted. Result may overflow to infinity if SkRect is far from the origin.
  
          @return  midpoint on x-axis
      */
  get centerX() {
    return this.left * 0.5 + this.right * 0.5;
  }
  /** Returns average of top edge and bottom edge. Result does not change if SkRect
          is sorted.
  
          @return  midpoint on y-axis
      */
  get centerY() {
    return this.top * 0.5 + this.bottom * 0.5;
  }
  /** Returns the point this->centerX(), this->centerY().
      @return  rectangle center
   */
  get center() {
    return c.create(this.centerX, this.centerY);
  }
  /** Returns four points in quad that enclose SkRect ordered as: top-left, top-right,
          bottom-right, bottom-left.
  
          TODO: Consider adding parameter to control whether quad is clockwise or counterclockwise.
  
          @param quad  storage for corners of SkRect
  
          example: https://fiddle.skia.org/c/@Rect_toQuad
      */
  toQuad(t) {
    t[0].set(this.left, this.top), t[1].set(this.right, this.top), t[2].set(this.right, this.bottom), t[3].set(this.left, this.bottom);
  }
  /** Sets to bounds of SkPoint array with count entries. If count is zero or smaller,
          or if SkPoint array contains an infinity or NaN, sets to (0, 0, 0, 0).
  
          Result is either empty or sorted: fLeft is less than or equal to fRight, and
          fTop is less than or equal to fBottom.
  
          @param pts    SkPoint array
          @param count  entries in array
      */
  setBounds(t, e) {
    this.setBoundsCheck(t, e);
  }
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
  setBoundsCheck(t, e) {
    if (e <= 0)
      return this.setEmpty(), !0;
    let s, n, r = 0;
    e & 1 ? (s = n = T.fromPoints(t, 1).xyxy(), r += 1, e -= 1) : (s = n = T.fromPoints(t, 2), r += 2, e -= 2), n = n.clone();
    let l = s.clone().mulScalar(0);
    for (; e; ) {
      let a = T.fromArray([t[r].x, t[r].y, t[r + 1].x, t[r + 1].y], 4);
      l = l.mul(a), s = s.min(a), n = n.max(a), r += 2, e -= 2;
    }
    const o = l.elements.every((a) => Number.isFinite(a));
    return o ? this.setLTRB(
      Math.min(s.elements[0], s.elements[2]),
      Math.min(s.elements[1], s.elements[3]),
      Math.max(n.elements[0], n.elements[2]),
      Math.max(n.elements[1], n.elements[3])
    ) : this.setEmpty(), o;
  }
  /** Sets to bounds of SkPoint pts array with count entries. If any SkPoint in pts
          contains infinity or NaN, all SkRect dimensions are set to NaN.
  
          @param pts    SkPoint array
          @param count  entries in array
  
          example: https://fiddle.skia.org/c/@Rect_setBoundsNoCheck
      */
  setBoundsNoCheck(t, e) {
    this.setBoundsCheck(t, e) || this.setLTRB(NaN, NaN, NaN, NaN);
  }
  /** Sets bounds to the smallest SkRect enclosing SkPoint p0 and p1. The result is
      sorted and may be empty. Does not check to see if values are finite.
  
      @param p0  corner to include
      @param p1  corner to include
  */
  setPoints(t, e) {
    this.left = Math.min(t.x, e.x), this.right = Math.max(t.x, e.x), this.top = Math.min(t.y, e.y), this.bottom = Math.max(t.y, e.y);
  }
  /** Sets SkRect to the union of itself and r.
  
      Has no effect if r is empty. Otherwise, if SkRect is empty, sets
      SkRect to r.
  
      @param r  expansion SkRect
  
      example: https://fiddle.skia.org/c/@Rect_join_2
  */
  join(t) {
    t.left >= t.right || t.top >= t.bottom || (this.left >= this.right || this.top >= this.bottom ? this.copy(t) : (t.left < this.left && (this.left = t.left), t.top < this.top && (this.top = t.top), t.right > this.right && (this.right = t.right), t.bottom > this.bottom && (this.bottom = t.bottom)));
  }
  /** Sets SkRect to the union of itself and r.
  
      Asserts if r is empty and SK_DEBUG is defined.
      If SkRect is empty, sets SkRect to r.
  
      May produce incorrect results if r is empty.
  
      @param r  expansion SkRect
  */
  joinNonEmptyArg(t) {
    this.left >= this.right || this.top >= this.bottom ? this.copy(t) : this.joinPossiblyEmptyRect(t);
  }
  /** Sets SkRect to the union of itself and the construction.
  
      May produce incorrect results if SkRect or r is empty.
  
      @param r  expansion SkRect
  */
  joinPossiblyEmptyRect(t) {
    return this.setLTRB(
      Math.min(this.left, t.left),
      Math.min(this.top, t.top),
      Math.max(this.right, t.right),
      Math.max(this.bottom, t.bottom)
    );
  }
  /** Sets SkIRect by adding 0.5 and discarding the fractional portion of SkRect
      members, using (SkScalarRoundToInt(fLeft), SkScalarRoundToInt(fTop),
                      SkScalarRoundToInt(fRight), SkScalarRoundToInt(fBottom)).
  
      @param dst  storage for SkIRect
  */
  roundRect(t) {
    t.setLTRB(
      Math.round(this.left),
      Math.round(this.top),
      Math.round(this.right),
      Math.round(this.bottom)
    );
  }
  /** Sets SkIRect by discarding the fractional portion of fLeft and fTop; and rounding
      up fRight and fBottom, using
      (SkScalarFloorToInt(fLeft), SkScalarFloorToInt(fTop),
       SkScalarCeilToInt(fRight), SkScalarCeilToInt(fBottom)).
  
      @param dst  storage for SkIRect
  */
  roundOutRect(t) {
    t.setLTRB(
      Math.floor(this.left),
      Math.floor(this.top),
      Math.ceil(this.right),
      Math.ceil(this.bottom)
    );
  }
  /** Sets SkRect by rounding up fLeft and fTop; and discarding the fractional portion
      of fRight and fBottom, using
      (SkScalarCeilToInt(fLeft), SkScalarCeilToInt(fTop),
       SkScalarFloorToInt(fRight), SkScalarFloorToInt(fBottom)).
  
      @param dst  storage for SkIRect
  */
  roundInRect(t) {
    t.setLTRB(
      Math.ceil(this.left),
      Math.ceil(this.top),
      Math.floor(this.right),
      Math.floor(this.bottom)
    );
  }
  /** Returns SkIRect by adding 0.5 and discarding the fractional portion of SkRect
      members, using (SkScalarRoundToInt(fLeft), SkScalarRoundToInt(fTop),
                      SkScalarRoundToInt(fRight), SkScalarRoundToInt(fBottom)).
  
      @return  rounded SkIRect
  */
  round() {
    let t = W.makeEmpty();
    return this.roundRect(t), t;
  }
  /** Sets SkIRect by discarding the fractional portion of fLeft and fTop; and rounding
      up fRight and fBottom, using
      (SkScalarFloorToInt(fLeft), SkScalarFloorToInt(fTop),
       SkScalarCeilToInt(fRight), SkScalarCeilToInt(fBottom)).
  
      @return  rounded SkIRect
  */
  roundOut() {
    let t = W.makeEmpty();
    return this.roundOutRect(t), t;
  }
  /** Sets SkIRect by rounding up fLeft and fTop; and discarding the fractional portion
      of fRight and fBottom, using
      (SkScalarCeilToInt(fLeft), SkScalarCeilToInt(fTop),
       SkScalarFloorToInt(fRight), SkScalarFloorToInt(fBottom)).
  
      @return  rounded SkIRect
  */
  roundIn() {
    let t = W.makeEmpty();
    return this.roundInRect(t), t;
  }
}
const Y = class Y {
  constructor(t, e = !0) {
    x(this, "isMatrix2D", !0);
    x(this, "elements", new Float32Array(6));
    x(this, "mutable", !0);
    this.elements.set(t), this.mutable = e;
  }
  static identity() {
    return this.fromRows(1, 0, 0, 1, 0, 0);
  }
  static default() {
    return this.identity();
  }
  static fromSinCos(t, e) {
    return this.fromRows(e, t, -t, e, 0, 0);
  }
  static fromSinCosOrigin(t, e, s, n) {
    const r = 1 - e;
    return this.fromRows(e, t, -t, e, t * n + r * s, -t * s + r * n);
  }
  static fromTranslation(t, e) {
    return this.fromRows(1, 0, 0, 1, t, e);
  }
  static fromTranslate(t, e) {
    return this.fromRows(1, 0, 0, 1, t, e);
  }
  static fromRotation(t) {
    const e = Math.cos(t), s = Math.sin(t);
    return this.fromRows(e, s, -s, e, 0, 0);
  }
  static fromRotate(t) {
    const e = Math.cos(t), s = Math.sin(t);
    return this.fromSinCos(s, e);
  }
  static fromRotateOrigin(t, e, s) {
    const n = Math.cos(t), r = Math.sin(t);
    return this.fromSinCosOrigin(r, n, e, s);
  }
  static fromRotateDegrees(t) {
    return this.fromRotate(t * Math.PI / 180);
  }
  static fromScale(t, e) {
    return this.fromRows(t, 0, 0, e, 0, 0);
  }
  static fromScaleAxis(t, e) {
    return this.fromRows(
      1 - (e - 1) * Math.pow(t.x, 2),
      (e - 1) * t.x * t.y,
      (e - 1) * t.x * t.y,
      1 + (e - 1) * Math.pow(t.y, 2),
      0,
      0
    );
  }
  static fromSkew(t, e) {
    return this.fromRows(1, Math.tan(e), Math.tan(t), 1, 0, 0);
  }
  static fromArray(t, e = !0) {
    return new this(t, e);
  }
  static fromRows(t, e, s, n, r, l) {
    return this.fromArray([t, e, s, n, r, l]);
  }
  static pool() {
    if (this.pools.length > 0) {
      const t = this.pools.shift();
      return t.identity(), t;
    } else
      return this.default();
  }
  static release(t) {
    this.pools.length < this.poolSize && (t.mutable = !0, this.pools.push(t));
  }
  get a() {
    return this.elements[0];
  }
  get b() {
    return this.elements[1];
  }
  get c() {
    return this.elements[2];
  }
  get d() {
    return this.elements[3];
  }
  get e() {
    return this.elements[4];
  }
  get f() {
    return this.elements[5];
  }
  pool() {
    return this.constructor.pool();
  }
  release() {
    return this.constructor.release(this);
  }
  setMutable(t) {
    return this.mutable = t, this;
  }
  identity() {
    return this.set(1, 0, 0, 1, 0, 0);
  }
  set(t, e, s, n, r, l) {
    return this.mutable ? (this.elements[0] = t, this.elements[2] = s, this.elements[4] = r, this.elements[1] = e, this.elements[3] = n, this.elements[5] = l, this) : this.constructor.fromRows(t, e, s, n, r, l).setMutable(this.mutable);
  }
  setElements(t) {
    return this.mutable ? (this.elements.set(t), this) : this.constructor.fromArray(t).setMutable(this.mutable);
  }
  clone() {
    return this.constructor.fromArray(this.elements, this.mutable);
  }
  copy(t) {
    return this.elements.set(t.elements), this;
  }
  isIdentity() {
    return this.elements.every((t, e) => t === Y.IDENTITY_MATRIX.elements[e]);
  }
  isZero() {
    return this.elements.every((t) => t === 0);
  }
  isFinite() {
    return this.elements.every((t) => Number.isFinite(t));
  }
  isTranslate() {
    return this.hasTranslate() && !this.hasScale() && !this.hasRotation();
  }
  isScale() {
    return this.hasScale() && !this.hasTranslate() && !this.hasRotation();
  }
  isRotation() {
    return this.hasRotation() && !this.hasScale() && !this.hasTranslate();
  }
  isScaleTranslate() {
    return (this.hasScale() || this.hasTranslate()) && !this.hasRotation();
  }
  isScaleRotate() {
    return this.hasRotation() && this.hasScale();
  }
  hasScale() {
    return this.a !== 1 || this.d !== 1;
  }
  hasTranslate() {
    return this.e !== 0 || this.f !== 0;
  }
  hasRotation() {
    return this.b !== 0 || this.c !== 0;
  }
  floor() {
    return this.setElements(this.elements.map((t) => Math.floor(t)));
  }
  ceil() {
    return this.setElements(this.elements.map((t) => Math.ceil(t)));
  }
  multiply(t) {
    return this.multiplyMatrices(this, t);
  }
  premultiply(t) {
    return this.multiplyMatrices(t, this);
  }
  multiplyMatrices(t, e) {
    const s = t.elements, n = e.elements, r = s[0] * n[0] + s[2] * n[1], l = s[1] * n[0] + s[3] * n[1], o = s[0] * n[2] + s[2] * n[3], a = s[1] * n[2] + s[3] * n[3], h = s[0] * n[4] + s[2] * n[5] + s[4], u = s[1] * n[5] + s[3] * n[5] + s[5];
    return this.set(r, l, o, a, h, u);
  }
  multiplyScalar(t) {
    return this.set(this.a * t, this.b * t, this.c * t, this.d * t, this.e * t, this.f * t);
  }
  setScale(t, e) {
    return this.set(t, 0, 0, e, 0, 0);
  }
  setSinCos(...t) {
    const e = t[1], s = t[0];
    if (t.length === 4) {
      const n = t[2], r = t[3], l = 1 - e;
      return this.set(e, s, -s, e, s * r + l * n, -s * n + l * r);
    } else
      return this.set(e, s, -s, e, 0, 0);
  }
  setRotate(...t) {
    const e = t[0], s = Math.cos(e), n = Math.sin(e);
    return t.length === 1 ? this.setSinCos(n, s) : this.setSinCos(n, s, t[1], t[2]);
  }
  setRotateDegrees(t) {
    return this.setRotate(t * Math.PI / 180);
  }
  setTranslate(t, e) {
    return this.set(1, 0, 0, 1, t, e);
  }
  preScale(t, e) {
    return this.multiplyMatrices(this, Y.fromScale(t, e));
  }
  postScale(t, e) {
    return this.multiplyMatrices(Y.fromScale(t, e), this);
  }
  preRotate(t) {
    return this.multiplyMatrices(this, Y.fromRotate(t));
  }
  preRotateDegrees(t) {
    return this.preRotate(t * Math.PI / 180);
  }
  postRotate(t) {
    return this.multiplyMatrices(Y.fromRotate(t), this);
  }
  postRotateDegrees(t) {
    return this.postRotate(t * Math.PI / 180);
  }
  preTranslate(t, e) {
    return this.multiplyMatrices(this, Y.fromTranslate(t, e));
  }
  postTranslate(t, e) {
    return this.multiplyMatrices(Y.fromTranslate(t, e), this);
  }
  fromTranslateRotationSkewScalePivot(t, e, s, n, r) {
    const l = Math.cos(e), o = Math.sin(e), a = Math.tan(s.x), h = Math.tan(s.y), u = t.x, f = t.y, y = n.x, m = n.y, k = (l + a * o) * y, p = (o + h * l) * y, b = (-o + a * l) * m, d = (l + h * -o) * m, _ = u - (k * r.x + b * r.y), v = f - (p * r.x + d * r.y);
    return this.set(k, p, b, d, _, v);
  }
  determinant() {
    return this.a * this.d - this.b * this.c;
  }
  invertMatrix(t) {
    const e = t.elements, s = e[0], n = e[1], r = 0, l = e[2], o = e[3], a = 0, h = e[4], u = e[5], f = 1;
    let y = t.determinant();
    if (y === 0)
      return this;
    const m = 1 / y, k = (o * f - a * u) * m, p = -(n * f - u * r) * m, b = -(l * f - h * a) * m, d = (s * f - r * r) * m, _ = (l * u - h * o) * m, v = -(s * u - h * n) * m;
    return this.set(k, p, b, d, _, v);
  }
  invert() {
    return this.invertMatrix(this);
  }
  scale(t, e) {
    return this.set(
      this.a * t,
      this.b * e,
      this.c * t,
      this.d * e,
      this.e,
      this.f
    );
  }
  rotate(t) {
    const e = Math.cos(t), s = Math.sin(t);
    return this.set(
      this.a * e + this.c * s,
      this.b * e + this.d * s,
      this.a * -s + this.c * e,
      this.b * -s + this.d * e,
      this.e,
      this.f
    );
  }
  translate(t, e) {
    return this.set(
      this.a,
      this.b,
      this.c,
      this.d,
      this.e + t * this.a + e * this.c,
      this.f + t * this.b + e * this.d
    );
  }
  /***
  * 伴随矩阵，先转置，再求余子式
  */
  adjoint() {
    const t = this.elements, e = t[0], s = t[1], n = 0, r = t[2], l = t[3], o = 0, a = t[4], h = t[5], u = 1, f = l * u - o * h, y = -(s * u - h * n), m = -(r * u - a * o), k = e * u - n * n, p = r * h - a * l, b = -(e * h - a * s);
    return this.set(f, y, m, k, p, b);
  }
  mapPoints(t, e) {
    return e.map((s, n) => {
      this.mapPoint(t[n], e[n]);
    }), this;
  }
  mapPoint(t, e) {
    const s = e.x, n = e.y;
    return t.x = this.a * s + this.c * n + this.e, t.y = this.b * s + this.d * n + this.f, t;
  }
  mapXY(t, e, s) {
    s.x = this.a * t + this.c * e + this.e, s.y = this.b * t + this.d * e + this.f;
  }
  projection(t, e) {
    return this.set(2 / t, 0, 0, -2 / e, -1, 1);
  }
  equals(t) {
    return !this.elements.some((e, s) => t.elements[s] !== e);
  }
  equalsEpsilon(t, e = 1e-6) {
    return !this.elements.some((s, n) => Math.abs(t.elements[n] - s) > e);
  }
  fromArray(t, e = 0) {
    for (let s = 0; s < 6; s++)
      this.elements[s] = t[s + e];
    return this;
  }
  toArray(t = [], e = 0) {
    const s = this.elements;
    return t[e] = s[0], t[e + 1] = s[1], t[e + 2] = s[2], t[e + 3] = s[3], t[e + 4] = s[4], t[e + 5] = s[5], t;
  }
};
x(Y, "EPSILON", 1e-6), x(Y, "IDENTITY_MATRIX", Y.default()), x(Y, "pools", []), x(Y, "poolSize", 100);
let ht = Y;
const je = 5, os = 5;
var as = /* @__PURE__ */ ((i) => (i[i.kSerpentine = 0] = "kSerpentine", i[i.kLoop = 1] = "kLoop", i[i.kLocalCusp = 2] = "kLocalCusp", i[i.kCuspAtInfinity = 3] = "kCuspAtInfinity", i[i.kQuadratic = 4] = "kQuadratic", i[i.kLineOrPoint = 5] = "kLineOrPoint", i))(as || {}), zt = /* @__PURE__ */ ((i) => (i[i.kCW_SkRotationDirection = 0] = "kCW_SkRotationDirection", i[i.kCCW_SkRotationDirection = 1] = "kCCW_SkRotationDirection", i))(zt || {});
function S(i) {
  return T.fromPoint(i);
}
function w(i) {
  let t = c.default();
  return i.storePoint(t), t;
}
function J(i) {
  return i.clone().add(i);
}
function hs(i) {
  return K(pt + i * pt);
}
function us(i, t, e) {
  let s = i - t, n = t - e;
  return s < 0 && (n = -n), +(s == 0 || n < 0);
}
function qt(i, t, e) {
  if (i < 0 && (i = -i, t = -t), t == 0 || i == 0 || i >= t)
    return 0;
  let s = i / t;
  return rs(s) || s == 0 ? 0 : (e.value = s, 1);
}
function Dt(i) {
  return i == 0 ? 0 : i;
}
function nt(i, t, e, s) {
  if (i == 0)
    return Dt(qt(-e, t, s));
  let n = s.clone(), r = t * t - 4 * i * e;
  if (r < 0)
    return Dt(0);
  r = Di(r);
  let l = Jt(r);
  if (!kt(l))
    return Dt(0);
  let o = t < 0 ? -(t - l) / 2 : -(t + l) / 2;
  if (n.curIndex += qt(o, i, n), n.curIndex += qt(e, o, n), n.curIndex - s.curIndex == 2)
    if (s.get(0) > s.get(1)) {
      let a = s.get(0);
      s.set(0, s.get(1)), s.set(1, a);
    } else s.get(0) == s.get(1) && (n.curIndex -= 1);
  return Dt(n.curIndex - s.curIndex);
}
function Rt(i, t, e, s) {
  return e && e.copy(Rt(i, t)), s && s.copy(Ie(i, t)), e || w(new bt(i).eval(T.splat(t)));
}
function Ie(i, t) {
  if (t == 0 && i[0] == i[1] || t == 1 && i[1] == i[2])
    return i[2].clone().subtract(i[0]);
  let e = S(i[0]), s = S(i[1]), n = S(i[2]), r = s.clone().sub(e), o = n.clone().sub(s).sub(r).clone().mulScalar(t).add(r);
  return w(o.add(o));
}
function ye(i, t, e) {
  return i.clone().lerp(i, t, e);
}
function fs(i, t, e) {
  let s = S(i[0]), n = S(i[1]), r = S(i[2]), l = T.splat(e), o = ye(s, n, l), a = ye(n, r, l);
  t[0] = w(s), t[1] = w(o), t[2] = w(ye(o, a, l)), t[3] = w(a), t[4] = w(r);
}
function cs(i, t = i.length) {
  for (let e = 0; e < t; ++e)
    if (!kt(i[e].x) || !kt(i[e].y))
      return !1;
  return !0;
}
function ms(i, t) {
  return Re(i, t) && (i || t);
}
function de(i, t) {
  return !ms(i.x - t.x, i.y - t.y);
}
function Ee(i, t) {
  let e = c.make(2);
  i.dot(t) >= 0 ? (e[0].copy(i), e[1].copy(t)) : i.cross(t) >= 0 ? (e[0].set(-i.y, +i.x), e[1].set(+t.y, -t.x)) : (e[0].set(+i.y, -i.x), e[1].set(-t.y, +t.x));
  let s = T.fromXY(e[0].x, e[1].x), n = T.fromXY(e[0].y, e[1].y), r = s.clone().mul(s).add(n.clone().mul(n)).sqrt().inverse();
  return s.mul(r), n.mul(r), c.create(s[0] + s[1], n[0] + n[1]);
}
function dr(i) {
  let t = i[1].clone().subtract(i[0]), e = i[2].clone().subtract(i[1]), s = Ee(t, e.clone().negate()), n = ee(t.dot(s), t.clone().subtract(e).dot(s));
  return n > 0 && n < 1 || (n = 0.5), n;
}
function Ze(i, t, e, s) {
  return qt(i - t, i - t - t + e, F.from(s));
}
function ys(i, t = "x") {
  i.get(2)[t] = i.get(6)[t] = i.get(4)[t];
}
function ds(i, t) {
  let e = i[0].y, s = i[1].y, n = i[2].y;
  if (us(e, s, n)) {
    let r = F.from([0]);
    if (qt(e - s, e - s - s + n, r))
      return fs(i, t, r.value), ys(F.from(t), "y"), 1;
    s = X(e - s) < X(s - n) ? e : n;
  }
  return t[0].set(i[0].x, e), t[1].set(i[1].x, s), t[2].set(i[2].x, n), 0;
}
function ps(i) {
  let t = i[1].x - i[0].x, e = i[1].y - i[0].y, s = i[0].x - i[1].x - i[1].x + i[2].x, n = i[0].y - i[1].y - i[1].y + i[2].y, r = -(t * s + e * n), l = s * s + n * n;
  return l < 0 && (r = -r, l = -l), r <= 0 ? 0 : r >= l ? 1 : r / l;
}
function gi(i, t, e, s = 0) {
  for (let n = 0; n < e; n++)
    i[s + n].copy(t[n]);
}
function _i(i, t) {
  let e = bt.default(), s = S(i[0]), n = S(i[1]), r = S(i[2]), l = S(i[3]);
  return e.fA = l.clone().add(n.clone().sub(r).mulScalar(3)).sub(s), e.fB = J(r.clone().sub(J(n)).add(s)), e.fC = n.clone().sub(s), w(e.eval(T.splat(t)));
}
function xs(i, t) {
  let e = S(i[0]), s = S(i[1]), n = S(i[2]), r = S(i[3]), l = s.clone().sub(n).mulScalar(3).add(r).sub(e), o = n.clone().sub(J(s)).add(e);
  return w(l.mulScalar(t).add(o));
}
function vi(i, t, e = c.default()) {
  return t == 0 && i[0].equals(i[1]) || t == 1 && i[2].equals(i[3]) ? (t == 0 ? e.subtractVectors(i[2], i[0]) : e.subtractVectors(i[3], i[1]), !e.x && !e.y && e.subtractVectors(i[3], i[0])) : e.copy(_i(i, t)), e;
}
function se(i, t, e = c.default()) {
  return e.copy(w(new Is(i).eval(T.splat(t)))), e;
}
function Ti(i, t, e, s, n) {
  e && se(i, t, e), s && vi(i, t, s), n && n.copy(xs(i, t));
}
function ne(i, t, e, s, n) {
  let r = s - i + 3 * (t - e), l = 2 * (i - t - t + e), o = t - i;
  return nt(r, l, o, F.from(n));
}
function D(i, t, e) {
  return i.clone().lerp(i, t, e);
}
function ae(i, t, e) {
  if (e == 1) {
    gi(t, i, 4), t[4].copy(i[3]), t[5].copy(i[3]), t[6].copy(i[3]);
    return;
  }
  let s = S(i[0]), n = S(i[1]), r = S(i[2]), l = S(i[3]), o = T.splat(e), a = D(s, n, o), h = D(n, r, o), u = D(r, l, o), f = D(a, h, o), y = D(h, u, o), m = D(f, y, o);
  t[0] = w(s), t[1] = w(a), t[2] = w(f), t[3] = w(m), t[4] = w(y), t[5] = w(u), t[6] = w(l);
}
function ks(i, t, e, s) {
  if (s == 1) {
    ae(i, t, e), t[7].copy(i[3]), t[8].copy(i[3]), t[9].copy(i[3]);
    return;
  }
  let n = T.make(4), r = T.make(4), l = T.make(4), o = T.make(4), a = T.make(4);
  n.setElements([i[0].x, i[0].y, i[0].x, i[0].y]), r.setElements([i[1].x, i[1].y, i[1].x, i[1].y]), l.setElements([i[2].x, i[2].y, i[2].x, i[2].y]), o.setElements([i[3].x, i[3].y, i[3].x, i[3].y]), a.setElements([e, e, s, s]);
  let h = D(n, r, a), u = D(r, l, a), f = D(l, o, a), y = D(h, u, a), m = D(u, f, a), k = D(y, m, a), p = D(y, m, T.make(4).setElements([a[2], a[3], a[0], a[1]]));
  t[0] = c.create(n[0], n[1]), t[1] = c.create(h[0], h[1]), t[2] = c.create(y[0], y[1]), t[3] = c.create(k[0], k[1]), t[4] = c.create(p[0], p[1]), t[5] = c.create(p[2], p[3]), t[6] = c.create(k[2], k[3]), t[7] = c.create(m[2], m[3]), t[8] = c.create(f[2], f[3]), t[9] = c.create(o[2], o[3]);
}
function Mi(i, t, e, s) {
  if (t)
    if (s == 0)
      gi(t, i, 4);
    else {
      let n = 0, r = 0;
      for (; n < s - 1; n += 2) {
        let l = T.splat(e[n]);
        if (n != 0) {
          let a = e[n - 1];
          l = l.clone().sub(T.splat(a)).div(T.splat(1 - a)).clmap(T.splat(0), T.splat(1));
        }
        let o = [];
        ks(i, o, l[0], l[1]), o.forEach((a, h) => {
          t[r + h] = a;
        }), r += 6, i = o.slice(6);
      }
      if (n < s) {
        let l = e[n];
        if (n != 0) {
          let a = e[n - 1];
          l = ct(ee(l - a, 1 - a), 0, 1);
        }
        let o = [];
        ae(i, o, l), o.forEach((a, h) => {
          t[r + h] = a;
        });
      }
    }
}
function pr(i, t) {
  ae(i, t, 0.5);
}
function vt(i, t, e) {
  return T.make(4).setElements([
    i[0] * t + e[0],
    i[1] * t + e[1],
    i[2] * t + e[2],
    i[3] * t + e[3]
  ]);
}
function bs(i, t) {
  return t >= 0 ? Math.abs(i) : -Math.abs(i);
}
function Pi(i, t, e, s) {
  let n = -0.5 * (t + bs(Math.sqrt(s), t)), r = -0.5 * n * i, l = Math.abs(n * n + r) < Math.abs(i * e + r) ? ee(n, i) : ee(e, n);
  return l > 0 && l < 1 || (l = 0.5), l;
}
function gs(i, t, e) {
  return Pi(i, t, e, t * t - 4 * i * e);
}
function xr(i) {
  let t = i[0].equals(i[1]) ? i[2].clone().subtract(i[0]) : i[1].clone().subtract(i[0]), e = i[2].equals(i[3]) ? i[3].clone().subtract(i[1]) : i[3].clone().subtract(i[2]), s = Ee(t, e.clone().negate());
  const n = [
    T.fromArray([-1, 2, -1, 0]),
    T.fromArray([3, -4, 1, 0]),
    T.fromArray([-3, 2, 0, 0])
  ];
  let r = vt(
    n[0],
    i[0].x,
    vt(
      n[1],
      i[1].x,
      vt(n[2], i[2].x, T.fromArray([i[3].x, 0, 0, 0]))
    )
  ), l = vt(
    n[0],
    i[0].y,
    vt(
      n[1],
      i[1].y,
      vt(n[2], i[2].y, T.fromArray([i[3].y, 0, 0, 0]))
    )
  ), o = r.clone().mulScalar(s.x).add(l.clone().mulScalar(s.y)), a = 0, h = o[0], u = o[1], f = o[2], y = u * u - 4 * h * f;
  return y > 0 ? Pi(h, u, f, y) : (o = r.clone().mulScalar(t.x).add(l.clone().mulScalar(t.y)), h = o[0], u = o[1], h != 0 && (a = -u / (2 * h)), a > 0 && a < 1 || (a = 0.5), a);
}
function re(i, t = "x") {
  i.get(4)[t] = i.get(8)[t] = i.get(6)[t];
}
function Si(i, t) {
  let e = [0, 0], s = ne(
    i[0].y,
    i[1].y,
    i[2].y,
    i[3].y,
    e
  ), n = F.from(t);
  return Mi(i, t, e, s), t && s > 0 && (re(n, "y"), s == 2 && (n.next(3), re(n, "y"))), s;
}
function kr(i, t) {
  let e = [0, 0], s = ne(
    i[0].x,
    i[1].x,
    i[2].x,
    i[3].x,
    e
  );
  Mi(i, t, e, s);
  let n = F.from(t);
  return t && s > 0 && (re(n, "x"), s == 2 && (n.next(3), re(n, "x"))), s;
}
function _s(i, t) {
  let e = i[1].x - i[0].x, s = i[1].y - i[0].y, n = i[2].x - 2 * i[1].x + i[0].x, r = i[2].y - 2 * i[1].y + i[0].y, l = i[3].x + 3 * (i[1].x - i[2].x) - i[0].x, o = i[3].y + 3 * (i[1].y - i[2].y) - i[0].y;
  return nt(
    n * o - r * l,
    e * o - s * l,
    e * r - s * n,
    F.from(t)
  );
}
function vs(i, t) {
  for (let e = t - 1; e > 0; --e)
    for (let s = e; s > 0; --s)
      if (i[s] < i[s - 1]) {
        let n = i[s];
        i[s] = i[s - 1], i[s - 1] = n;
      }
}
class bt {
  constructor(t, e, s) {
    x(this, "fA", T.make(2));
    x(this, "fB", T.make(2));
    x(this, "fC", T.make(2));
    if (t && e && s)
      this.fA.copy(t), this.fB.copy(e), this.fC.copy(s);
    else if (t) {
      let n = S(t[0]), r = S(t[1]), l = S(t[2]), o = J(r.clone().sub(n)), a = l.sub(J(r)).add(n);
      this.fA.copy(a), this.fB.copy(o), this.fC.copy(n);
    }
  }
  static default() {
    return new bt();
  }
  eval(t) {
    return this.fA.clone().mul(t).add(this.fB).mul(t).add(this.fC);
  }
}
function Ts(i, t) {
  for (let e = t; e > 1; --e)
    if (i.get(0) == i.get(1)) {
      for (let s = 1; s < e; ++s)
        i.set(s - 1, i.get(s));
      t -= 1;
    } else
      i.next();
  return t;
}
function Ms(i) {
  return is(i, 0.3333333);
}
function Ps(i, t) {
  if (st(i[0]))
    return nt(i[1], i[2], i[3], F.from(t));
  let e, s, n, r, l;
  {
    let u = Me(i[0]);
    e = i[1] * u, s = i[2] * u, n = i[3] * u;
  }
  r = (e * e - s * 3) / 9, l = (2 * e * e * e - 9 * e * s + 27 * n) / 54;
  let o = r * r * r, a = l * l - o, h = e / 3;
  if (a < 0) {
    let u = ns(ct(l / K(o), -1, 1)), f = -2 * K(r);
    return t[0] = ct(f * xt(u / 3) - h, 0, 1), t[1] = ct(f * xt((u + 2 * et) / 3) - h, 0, 1), t[2] = ct(f * xt((u - 2 * et) / 3) - h, 0, 1), vs(t, 3), Ts(F.from(t), 3);
  } else {
    let u = X(l) + K(a);
    return u = Ms(u), l > 0 && (u = -u), u != 0 && (u += r / u), t[0] = ct(u - h, 0, 1), 1;
  }
}
function Ue(i, t) {
  let e = i[2] - i[0], s = i[4] - 2 * i[2] + i[0], n = i[6] + 3 * (i[2] - i[4]) - i[0];
  t[0] = n * n, t[1] = 3 * s * n, t[2] = 2 * s * s + n * e, t[3] = e * s;
}
function Ci(i, t) {
  let e = new Array(4).fill(0), s = new Array(4).fill(0), n;
  for (Ue(i.map((l) => l.x), e), Ue(i.map((l) => l.y), s), n = 0; n < 4; n++)
    e[n] += s[n];
  return Ps(e, t);
}
function Ss(i) {
  return (i[1].distanceToSquared(i[0]) + i[2].distanceToSquared(i[1]) + i[3].distanceToSquared(i[2])) * 1e-8;
}
function He(i, t, e) {
  let s = i[e].clone(), n = i[e + 1].clone().subtract(s), r = new Array(2).fill(0);
  for (let l = 0; l < 2; ++l) {
    let o = i[t + l].clone().subtract(s);
    r[l] = n.cross(o);
  }
  return r[0] * r[1] >= 0;
}
function Cs(i) {
  if (i[0].equalsEpsilon(i[1]) || i[2].equalsEpsilon(i[3]) || He(i, 0, 2) || He(i, 2, 0))
    return -1;
  let t = new Array(3).fill(0), e = Ci(i, t);
  for (let s = 0; s < e; ++s) {
    let n = t[s];
    if (0 >= n || n >= 1)
      continue;
    let l = _i(i, n).lengthSq(), o = Ss(i);
    if (l < o)
      return n;
  }
  return -1;
}
function Rs(i, t, e) {
  const s = i[4] - i[0], n = i[2] - i[0], r = t * n;
  e[0] = t * s - s, e[1] = s - 2 * r, e[2] = r;
}
function Ke(i, t, e) {
  let s = new Array(3).fill(0);
  Rs(i, t, s);
  let n = F.from([0, 0]);
  return nt(s[0], s[1], s[2], n) == 1 ? (e.value = n.get(0), 1) : 0;
}
function pe(i, t, e, s = "x") {
  let n = G(i[0][s], i[3][s], e), r = G(i[3][s], i[6][s], e);
  t[0][s] = n, t[3][s] = G(n, r, e), t[6][s] = r;
}
function ws(i, t, e) {
  e[0].set(i[0].x * 1, i[0].y * 1, 1), e[1].set(i[1].x * t, i[1].y * t, t), e[2].set(i[2].x * 1, i[2].y * 1, 1);
}
function xe(i) {
  return c.create(i.x / i.z, i.y / i.z);
}
class Je {
  constructor(t) {
    x(this, "fNumer", bt.default());
    x(this, "fDenom", bt.default());
    let e = S(t.fPts[0]), s = S(t.fPts[1]), n = S(t.fPts[2]), r = T.splat(t.fW), l = s.clone().mul(r);
    this.fNumer.fC.copy(e), this.fNumer.fA.copy(n.clone().sub(J(l)).add(e)), this.fNumer.fB.copy(J(l.clone().sub(e))), this.fDenom.fC.setElements([1, 1]), this.fDenom.fB = J(r.clone().sub(this.fDenom.fC)), this.fDenom.fA.setElements([0 - this.fDenom.fB.x, 0 - this.fDenom.fB.y]);
  }
  eval(t) {
    let e = T.splat(t), s = this.fNumer.eval(e), n = this.fDenom.eval(e);
    return s.div(n);
  }
}
class Is {
  constructor(t) {
    x(this, "fA", T.make(2));
    x(this, "fB", T.make(2));
    x(this, "fC", T.make(2));
    x(this, "fD", T.make(2));
    let e = S(t[0]), s = S(t[1]), n = S(t[2]), r = S(t[3]), l = T.splat(3);
    this.fA = s.clone().sub(n).mul(l).add(r).sub(e), this.fB = n.clone().sub(J(s)).add(e).mul(l), this.fC = s.clone().sub(e).mul(l), this.fD = e;
  }
  eval(t) {
    return this.fA.clone().mul(t).add(this.fB).mul(t).add(this.fC).mul(t).add(this.fD);
  }
}
class z {
  constructor(t, e, s, n) {
    x(this, "fPts", c.make(3));
    x(this, "fW", 0);
    t !== void 0 && this.set(t, e, s, n);
  }
  static default() {
    return new this();
  }
  static make(t) {
    return Array.from({ length: t }, () => new z());
  }
  copy(t) {
    return this.fPts[0] = t.fPts[0].clone(), this.fPts[1] = t.fPts[1].clone(), this.fPts[2] = t.fPts[2].clone(), this.fW = t.fW, this;
  }
  clone() {
    return new z().copy(this);
  }
  set(t, e, s, n) {
    Array.isArray(t) ? this.set(t[0], t[1], t[2], e) : t && e !== void 0 && s !== void 0 && n !== void 0 && (this.fPts[0].copy(t), this.fPts[1].copy(e), this.fPts[2].copy(s), this.setW(n));
  }
  setW(t) {
    this.fW = t > 0 && kt(t) ? t : 1;
  }
  // return false if infinity or NaN is generated; caller must check
  chopAt_2(t, e) {
    let s = te.make(3), n = te.make(3);
    ws(this.fPts, this.fW, s), pe(s, n, t, "x"), pe(s, n, t, "y"), pe(s, n, t, "z"), e[0].fPts[0] = this.fPts[0].clone(), e[0].fPts[1] = xe(n[0]), e[0].fPts[2] = xe(n[1]), e[1].fPts[0] = e[0].fPts[2].clone(), e[1].fPts[1] = xe(n[2]), e[1].fPts[2] = this.fPts[2].clone();
    let r = K(n[1].z);
    return e[0].fW = n[0].z / r, e[1].fW = n[2].z / r, Re(e[0].fPts[0].x, 14);
  }
  chopAt_3(t, e, s) {
    if (t == 0 || e == 1)
      if (t == 0 && e == 1) {
        s.copy(this);
        return;
      } else {
        let d = [z.default(), z.default()];
        if (this.chopAt_2(t || e, d)) {
          s.copy(d[+!!t]);
          return;
        }
      }
    let n = new Je(this), r = T.splat(t), l = n.fNumer.eval(r), o = n.fDenom.eval(r), a = T.splat((t + e) / 2), h = n.fNumer.eval(a), u = n.fDenom.eval(a), f = T.splat(e), y = n.fNumer.eval(f), m = n.fDenom.eval(f), k = J(h).sub(l.clone().add(y).mulScalar(0.5)), p = J(u).sub(o.clone().add(m).mulScalar(0.5));
    s.fPts[0] = w(l.clone().div(o)), s.fPts[1] = w(k.clone().div(p)), s.fPts[2] = w(y.clone().div(m));
    let b = p.clone().div(o.clone().mul(m).sqrt());
    s.fW = b[0];
  }
  evalAt(t) {
    return w(new Je(this).eval(t));
  }
  evalAt_3(t, e, s) {
    e && e.copy(this.evalAt(t)), s && s.copy(this.evalTangentAt(t));
  }
  evalTangentAt(t) {
    const e = this.fPts, s = this.fW;
    if (t == 0 && e[0] == e[1] || t == 1 && e[1] == e[2])
      return e[2].clone().subtract(e[0]);
    let n = S(e[0]), r = S(e[1]), l = S(e[2]), o = T.splat(s), a = l.clone().sub(n), h = r.clone().sub(n), u = o.clone().mul(h), f = o.clone().mul(a).sub(a), y = a.clone().sub(u).sub(u);
    return w(new bt(f, y, u).eval(T.splat(t)));
  }
  chop(t) {
    const e = this.fW, s = this.fPts, n = Me(Q + e), r = S(s[0]).mulScalar(n), l = S(s[1]).mulScalar(e * n), o = S(s[2]).mulScalar(n), a = w(r.clone().add(l)), h = w(l.clone().add(o)), u = w(r.clone().mulScalar(0.5).add(l).add(o.clone().mulScalar(0.5)));
    t[0].fPts[0] = s[0], t[0].fPts[1] = a, t[0].fPts[2] = u, t[1].fPts[0] = u, t[1].fPts[1] = h, t[1].fPts[2] = s[2], t[0].fW = t[1].fW = hs(e);
  }
  computeAsQuadError(t) {
    const e = this.fW, s = this.fPts;
    let n = e - 1, r = n / (4 * (2 + n)), l = r * (s[0].x - 2 * s[1].x + s[2].x), o = r * (s[0].y - 2 * s[1].y + s[2].y);
    t.set(l, o);
  }
  asQuadTol(t) {
    const e = this.fW, s = this.fPts;
    let n = e - 1, r = n / (4 * (2 + n)), l = r * (s[0].x - 2 * s[1].x + s[2].x), o = r * (s[0].y - 2 * s[1].y + s[2].y);
    return l * l + o * o <= t * t;
  }
  computeQuadPOW2(t) {
    if (t < 0 || !kt(t) || !this.fPts.every((u) => u.isFinite()))
      return 0;
    const e = this.fW, s = this.fPts;
    let n = e - 1, r = n / (4 * (2 + n)), l = r * (s[0].x - 2 * s[1].x + s[2].x), o = r * (s[0].y - 2 * s[1].y + s[2].y), a = K(l * l + o * o), h;
    for (h = 0; h < je && !(a <= t); ++h)
      a *= 0.25;
    return h;
  }
  chopIntoQuadsPOW2(t, e) {
    const s = this.fPts;
    this.fW, t.data = s;
    const n = () => {
      const l = 2 * (1 << e) + 1;
      if (!cs(t.data, l))
        for (let o = 1; o < l - 1; ++o)
          t.get(o).copy(s[1]);
    };
    if (e == je) {
      let r = [z.default(), z.default()];
      this.chop(r), de(r[0].fPts[1], r[0].fPts[2]) && de(r[1].fPts[0], r[1].fPts[1]) && (t.get(1).copy(r[0].fPts[1]), t.get(2).copy(r[0].fPts[1]), t.get(3).copy(r[0].fPts[1]), t.get(4).copy(r[1].fPts[2]), e = 1, n());
    }
    return 1 << e;
  }
  findMidTangent() {
    const t = this.fPts, e = this.fW;
    let s = t[1].clone().subtract(t[0]), n = t[2].clone().subtract(t[1]), r = Ee(s, n.clone().negate()), l = t[2].clone().subtract(t[0]).multiplyScalar(e - 1), o = t[2].clone().subtract(t[0]).subtract(t[1].clone().subtract(t[0]).multiplyScalar(e * 2)), a = t[1].clone().subtract(t[0]).multiplyScalar(e), h = r.dot(l), u = r.dot(o), f = r.dot(a);
    return gs(h, u, f);
  }
  findXExtrema(t) {
    return Ke(this.fPts.map((e) => e.x), this.fW, t);
  }
  findYExtrema(t) {
    return Ke(this.fPts.map((e) => e.y), this.fW, t);
  }
  chopAtXExtrema(t) {
    let e = N.from(0);
    if (this.findXExtrema(e)) {
      if (!this.chopAt_2(e.value, t))
        return !1;
      let s = t[0].fPts[2].x;
      return t[0].fPts[1].x = s, t[1].fPts[0].x = s, t[1].fPts[1].x = s, !0;
    }
    return !1;
  }
  chopAtYExtrema(t) {
    let e = N.from(0);
    if (this.findYExtrema(e)) {
      if (!this.chopAt_2(e.value, t))
        return !1;
      let s = t[0].fPts[2].y;
      return t[0].fPts[1].y = s, t[1].fPts[0].y = s, t[1].fPts[1].y = s, !0;
    }
    return !1;
  }
  computeTightBounds(t) {
    const e = this.fPts;
    let s = c.make(4);
    s[0].copy(e[0]), s[1].copy(e[2]);
    let n = 2, r = N.from(0);
    this.findXExtrema(r) && this.evalAt_3(r.value, s[n++]), this.findYExtrema(r) && this.evalAt_3(r.value, s[n++]), t.setBounds(s, n);
  }
  computeFastBounds(t) {
    t.setBounds(this.fPts, 3);
  }
  TransformW(t, e, s) {
    return e;
  }
  static BuildUnitArc(t, e, s, n, r) {
    let l = t.dot(e), o = t.cross(e);
    if (X(o) <= we && l > 0 && (o >= 0 && s == 0 || o <= 0 && s == 1))
      return 0;
    s == 1 && (o = -o);
    let h = 0;
    o == 0 ? h = 2 : l == 0 ? h = o > 0 ? 1 : 3 : (o < 0 && (h += 2), l < 0 != o < 0 && (h += 1));
    const u = [
      c.create(1, 0),
      c.create(1, 1),
      c.create(0, 1),
      c.create(-1, 1),
      c.create(-1, 0),
      c.create(-1, -1),
      c.create(0, -1),
      c.create(1, -1)
    ], f = ve;
    let y = h;
    for (let d = 0; d < y; ++d)
      r[d].set(u[d * 2], u[d * 2 + 1], u[d * 2 + 2], f);
    const m = c.create(l, o), k = u[h * 2], p = k.dot(m);
    if (p < 1) {
      let d = c.create(k.x + l, k.y + o);
      const _ = K((1 + p) / 2);
      d.setLength(Me(_)), de(k, d) || (r[y].set(k, d, m, _), y += 1);
    }
    let b = ht.identity();
    b.setSinCos(t.y, t.x), s == 1 && b.preScale(Q, -Q), n && b.premultiply(n);
    for (let d = 0; d < y; ++d)
      b.mapPoints(r[d].fPts, r[d].fPts);
    return y;
  }
}
function Es(i, t) {
  let e = [], s = [], n = 0;
  Ze(i[0].x, i[1].x, i[2].x, s) > 0 && (e[n] = s[0], n++), Ze(i[0].y, i[1].y, i[2].y, s) > 0 && (e[n] = s[0], n++);
  for (let r = 0; r < n; ++r)
    t[r] = Rt(i, e[r]);
  return t[n] = i[2], n + 1;
}
function Ls(i, t) {
  let e = [], s = [], n = 0;
  ne(i[0].x, i[1].x, i[2].x, i[3].x, s) > 0 && (e[n] = s[0], n++), ne(i[0].y, i[1].y, i[2].y, i[3].y, s) > 0 && (e[n] = s[0], n++);
  for (let r = 0; r < n; ++r)
    t[r] = t[r] || c.default(), Ti(i, e[r], t[r], null, null);
  return t[n] = i[3], n + 1;
}
function Ns(i, t, e) {
  let s = new z();
  s.set(i[0], i[1], i[2], t);
  let n = [N.from(0), N.from(0)], r = s.findXExtrema(n[0]);
  r += s.findYExtrema(n[1]);
  for (let l = 0; l < r; ++l)
    e[l] = s.evalAt(n[l].value);
  return e[r] = i[2], r + 1;
}
function Xt(i, t, e, s) {
  return i + t > e ? Math.min(s, e / (i + t)) : s;
}
function As(i, t) {
  if (Number.isNaN(i) || Number.isNaN(t)) return NaN;
  if (i === t) return t;
  const e = new ArrayBuffer(4), s = new Float32Array(e), n = new Int32Array(e);
  return s[0] = i, i === 0 ? (n[0] = 2147483649, s[0]) : (i < t == i > 0 ? n[0]++ : n[0]--, s[0]);
}
function jt(i, t, e, s) {
  if (e.value = e.value * t, s.value = s.value * t, e.value + s.value > i) {
    let n = e, r = s;
    if (n > r) {
      let a = n;
      n = r, r = a;
    }
    let l = n, o = i - l.value;
    for (; o + l.value > i; )
      o = As(o, 0);
    r.value = o;
  }
}
function Zt(i, t) {
  i.value + t.value == i.value ? t.value = 0 : i.value + t.value == t.value && (i.value = 0);
}
function $e(i, t, e) {
  return t <= e && i <= e - t && t + i <= e && e - i >= t && i >= 0;
}
function Ge(i) {
  return i[
    0
    /* kUpperLeft_Corner */
  ].x == i[
    3
    /* kLowerLeft_Corner */
  ].x && i[
    0
    /* kUpperLeft_Corner */
  ].y == i[
    1
    /* kUpperRight_Corner */
  ].y && i[
    1
    /* kUpperRight_Corner */
  ].x == i[
    2
    /* kLowerRight_Corner */
  ].x && i[
    3
    /* kLowerLeft_Corner */
  ].y == i[
    2
    /* kLowerRight_Corner */
  ].y;
}
function ti(i) {
  let t = !0;
  for (let e = 0; e < 4; ++e)
    i[e].x <= 0 || i[e].y <= 0 ? (i[e].x = 0, i[e].y = 0) : t = !1;
  return t;
}
const Tt = 0, ut = 1, at = 2, At = 3, Ut = 4, ke = 5, Ws = 5;
var Ri = /* @__PURE__ */ ((i) => (i[i.kUpperLeft_Corner = 0] = "kUpperLeft_Corner", i[i.kUpperRight_Corner = 1] = "kUpperRight_Corner", i[i.kLowerRight_Corner = 2] = "kLowerRight_Corner", i[i.kLowerLeft_Corner = 3] = "kLowerLeft_Corner", i))(Ri || {});
const ft = 0, Mt = 1, Pt = 2, St = 3, mt = class mt {
  constructor() {
    x(this, "fRect", W.makeEmpty());
    x(this, "fType", 0);
    x(this, "fRadii", [c.zero(), c.zero(), c.zero(), c.zero()]);
  }
  static default() {
    return new this();
  }
  static from(t, e, s = Tt) {
    const n = new this();
    return n.fRect = t, n.fRadii.forEach((r, l) => {
      r.copy(e[l]);
    }), n.fType = s, n;
  }
  getType() {
    return this.fType;
  }
  get type() {
    return this.getType();
  }
  isEmpty() {
    return Tt == this.getType();
  }
  isRect() {
    return ut == this.getType();
  }
  isOval() {
    return at == this.getType();
  }
  isSimple() {
    return At == this.getType();
  }
  isNinePatch() {
    return Ut == this.getType();
  }
  isComplex() {
    return ke == this.getType();
  }
  /** Returns span on the x-axis. This does not check if result fits in 32-bit float;
         result may be infinity.
  
         @return  rect().fRight minus rect().fLeft
     */
  width() {
    return this.fRect.width;
  }
  /** Returns span on the y-axis. This does not check if result fits in 32-bit float;
         result may be infinity.
  
         @return  rect().fBottom minus rect().fTop
     */
  height() {
    return this.height;
  }
  /** Returns top-left corner radii. If type() returns kEmpty_Type, kRect_Type,
         kOval_Type, or kSimple_Type, returns a value representative of all corner radii.
         If type() returns kNinePatch_Type or kComplex_Type, at least one of the
         remaining three corners has a different value.
  
         @return  corner radii for simple types
     */
  getSimpleRadii() {
    return this.fRadii[0];
  }
  copy(t) {
    this.fRect.copy(t.fRect), this.fType = t.fType;
    for (let e = 0; e < 4; e++)
      this.fRadii[e].copy(t.fRadii[e]);
  }
  /** Sets bounds to zero width and height at (0, 0), the origin. Sets
      corner radii to zero and sets type to kEmpty_Type.
  */
  setEmpty() {
    this.copy(mt.default());
  }
  /** Sets bounds to sorted rect, and sets corner radii to zero.
      If set bounds has width and height, and sets type to kRect_Type;
      otherwise, sets type to kEmpty_Type.
  
      @param rect  bounds to set
  */
  setRect(t) {
    this.initializeRect(t) && (this.fRadii.forEach((e) => {
      e.set(0, 0);
    }), this.fType = ut);
  }
  /** Initializes bounds at (0, 0), the origin, with zero width and height.
         Initializes corner radii to (0, 0), and sets type of kEmpty_Type.
  
         @return  empty SkRRect
     */
  static makeEmpty() {
    return new this();
  }
  /** Initializes to copy of r bounds and zeroes corner radii.
  
         @param r  bounds to copy
         @return   copy of r
     */
  static makeRect(t) {
    let e = mt.default();
    return e.setRect(t), e;
  }
  /** Sets bounds to oval, x-axis radii to half oval.width(), and all y-axis radii
         to half oval.height(). If oval bounds is empty, sets to kEmpty_Type.
         Otherwise, sets to kOval_Type.
  
         @param oval  bounds of oval
         @return      oval
     */
  static makeOval(t) {
    let e = mt.default();
    return e.setOval(t), e;
  }
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
  static makeRectXY(t, e, s) {
    let n = this.default();
    return n.setRectXY(t, e, s), n;
  }
  setRadiiEmpty() {
    this.fRadii.forEach((t) => {
      t.set(0, 0);
    });
  }
  /** Sets bounds to oval, x-axis radii to half oval.width(), and all y-axis radii
      to half oval.height(). If oval bounds is empty, sets to kEmpty_Type.
      Otherwise, sets to kOval_Type.
  
      @param oval  bounds of oval
  */
  setOval(t) {
    if (!this.initializeRect(t))
      return;
    let e = this.fRect.halfWidth, s = this.fRect.halfHeight;
    if (e == 0 || s == 0)
      this.setRadiiEmpty(), this.fType = ut;
    else {
      for (let n = 0; n < 4; ++n)
        this.fRadii[n].set(e, s);
      this.fType = at;
    }
  }
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
  setRectXY(t, e, s) {
    if (!this.initializeRect(t))
      return;
    const n = this.fRect;
    if (Re(e, s) || (e = s = 0), n.width < e + e || n.height < s + s) {
      let r = Math.min(n.width / (e + e), n.height / (s + s));
      e *= r, s *= r;
    }
    if (e <= 0 || s <= 0) {
      this.setRect(t);
      return;
    }
    for (let r = 0; r < 4; ++r)
      this.fRadii[r].set(e, s);
    this.fType = At, e >= $(n.width) && s >= $(n.height) && (this.fType = at);
  }
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
  setNinePatch(t, e, s, n, r) {
    if (!this.initializeRect(t))
      return;
    const l = this.fRect;
    if (!ls([e, s, n, r], 4)) {
      this.setRect(t);
      return;
    }
    e = Math.max(e, 0), s = Math.max(s, 0), n = Math.max(n, 0), r = Math.max(r, 0);
    let a = Q;
    e + n > l.width && (a = l.width / (e + n)), s + r > l.height && (a = Math.min(a, l.height / (s + r))), a < Q && (e *= a, s *= a, n *= a, r *= a), e == n && s == r ? e >= $(l.width) && s >= $(l.height) ? this.fType = at : e == 0 || s == 0 ? (this.fType = ut, e = 0, s = 0, n = 0, r = 0) : this.fType = At : this.fType = Ut, this.fRadii[ft].set(e, s), this.fRadii[Mt].set(n, s), this.fRadii[Pt].set(n, r), this.fRadii[St].set(e, r);
  }
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
  setRectRadii(t, e) {
    if (this.initializeRect(t)) {
      if (!e.every((s) => Number.isFinite(s.x))) {
        this.setRect(t);
        return;
      }
      if (this.fRadii.forEach((s, n) => {
        s.copy(e[n]);
      }), ti(this.fRadii)) {
        this.setRect(t);
        return;
      }
      if (this.scaleRadii(), !this.isValid()) {
        this.setRect(t);
        return;
      }
    }
  }
  /** \enum SkRRect::Corner
      The radii are stored: top-left, top-right, bottom-right, bottom-left.
  */
  /** Returns bounds. Bounds may have zero width or zero height. Bounds right is
      greater than or equal to left; bounds bottom is greater than or equal to top.
      Result is identical to getBounds().
  
      @return  bounding box
  */
  rect() {
    return this.fRect;
  }
  /** Returns scalar pair for radius of curve on x-axis and y-axis for one corner.
         Both radii may be zero. If not zero, both are positive and finite.
  
         @return        x-axis and y-axis radii for one corner
     */
  radii(t) {
    return this.fRadii[t];
  }
  /** Returns bounds. Bounds may have zero width or zero height. Bounds right is
      greater than or equal to left; bounds bottom is greater than or equal to top.
      Result is identical to rect().
  
      @return  bounding box
  */
  getBounds() {
    return this.fRect;
  }
  /** Returns true if bounds and radii in a are equal to bounds and radii in b.
  
         a and b are not equal if either contain NaN. a and b are equal if members
         contain zeroes with different signs.
  
         @param a  SkRect bounds and radii to compare
         @param b  SkRect bounds and radii to compare
         @return   true if members are equal
     */
  equals(t, e) {
    return t.fRect == e.fRect && Xe(t.fRadii.map((s) => s.x), e.fRadii.map((s) => s.x), 4);
  }
  /** Returns true if bounds and radii in a are not equal to bounds and radii in b.
  
         a and b are not equal if either contain NaN. a and b are equal if members
         contain zeroes with different signs.
  
         @param a  SkRect bounds and radii to compare
         @param b  SkRect bounds and radii to compare
         @return   true if members are not equal
     */
  notEquals(t, e) {
    return t.fRect != e.fRect || !Xe(t.fRadii.map((s) => s.x), e.fRadii.map((s) => s.x), 4);
  }
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
  insetRect(t, e, s) {
    let r = this.fRect.makeInset(t, e), l = !1;
    if (r.right <= r.left && (l = !0, r.left = r.right = Oe(r.left, r.right)), r.bottom <= r.top && (l = !0, r.top = r.bottom = Oe(r.top, r.bottom)), l) {
      s.fRect.copy(r), s.setRadiiEmpty(), s.fType = Tt;
      return;
    }
    if (!r.isFinite()) {
      s.setEmpty();
      return;
    }
    let o = [c.zero(), c.zero(), c.zero(), c.zero()];
    o.forEach((a, h) => {
      a.copy(this.fRadii[h]);
    });
    for (let a = 0; a < 4; ++a)
      o[a].x && (o[a].x -= t), o[a].y && (o[a].y -= e);
    s.setRectRadii(r, o);
  }
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
  inset(t, e) {
    this.insetRect(t, e, this);
  }
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
  outsetRect(t, e, s) {
    this.insetRect(-t, -e, s);
  }
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
  outset(t, e) {
    this.insetRect(-t, -e, this);
  }
  /** Translates SkRRect by (dx, dy).
  
      @param dx  offset added to rect().fLeft and rect().fRight
      @param dy  offset added to rect().fTop and rect().fBottom
  */
  offset(t, e) {
    this.fRect.offset(t, e);
  }
  /** Returns SkRRect translated by (dx, dy).
  
         @param dx  offset added to rect().fLeft and rect().fRight
         @param dy  offset added to rect().fTop and rect().fBottom
         @return    SkRRect bounds offset by (dx, dy), with unchanged corner radii
     */
  makeOffset(t, e) {
    return mt.from(this.fRect.makeOffset(t, e), this.fRadii, this.fType);
  }
  /** Returns true if rect is inside the bounds and corner radii, and if
         SkRRect and rect are not empty.
  
         @param rect  area tested for containment
         @return      true if SkRRect contains rect
  
         example: https://fiddle.skia.org/c/@RRect_contains
     */
  contains(t) {
    return this.getBounds().contains(t) ? this.isRect() ? !0 : this.checkCornerContainment(t.left, t.top) && this.checkCornerContainment(t.right, t.top) && this.checkCornerContainment(t.right, t.bottom) && this.checkCornerContainment(t.left, t.bottom) : !1;
  }
  /** Returns true if bounds and radii values are finite and describe a SkRRect
         SkRRect::Type that matches getType(). All SkRRect methods construct valid types,
         even if the input values are not valid. Invalid SkRRect data can only
         be generated by corrupting memory.
  
         @return  true if bounds and radii match type()
  
         example: https://fiddle.skia.org/c/@RRect_isValid
     */
  isValid() {
    if (!this.areRectAndRadiiValid(this.fRect, this.fRadii))
      return !1;
    let t = this.fRadii, e = t[0].x == 0 && t[0].y == 0, s = t[0].x == 0 || t[0].y == 0, n = !0;
    for (let a = 1; a < 4; ++a)
      (t[a].x != 0 || t[a].y != 0) && (e = !1), (t[a].x != t[a - 1].x || t[a].y != t[a - 1].y) && (n = !1), t[a].x != 0 && t[a].y != 0 && (s = !1);
    let r = Ge(t), l = this.fType, o = this.fRect;
    if (l < 0 || l > Ws)
      return !1;
    switch (l) {
      case Tt:
        if (!o.isEmpty() || !e || !n || !s)
          return !1;
        break;
      case ut:
        if (o.isEmpty() || !e || !n || !s)
          return !1;
        break;
      case at:
        if (o.isEmpty() || e || !n || s)
          return !1;
        for (let a = 0; a < 4; ++a)
          if (!U(t[a].x, o.halfWidth) || !U(t[a].y, o.halfHeight))
            return !1;
        break;
      case At:
        if (o.isEmpty() || e || !n || s)
          return !1;
        break;
      case Ut:
        if (o.isEmpty() || e || n || s || !r)
          return !1;
        break;
      case ke:
        if (o.isEmpty() || e || n || s || r)
          return !1;
        break;
    }
    return !0;
  }
  areRectAndRadiiValid(t, e) {
    if (!t.isFinite() || !t.isSorted())
      return !1;
    for (let s = 0; s < 4; ++s)
      if (!$e(e[s].x, t.left, t.right) || !$e(e[s].y, t.top, t.bottom))
        return !1;
    return !0;
  }
  transform(t, e) {
    if (!e)
      return !1;
    if (t.isIdentity())
      return e.copy(this), !0;
    let s = W.makeEmpty();
    if (!s.isFinite() || s.isEmpty())
      return !1;
    if (e.fRect = s, e.fType = this.fType, ut == this.fType)
      return !0;
    if (at == this.fType) {
      for (let a = 0; a < 4; ++a)
        e.fRadii[a].x = $(s.width), e.fRadii[a].y = $(s.height);
      return !0;
    }
    let n = t.a, r = t.d;
    if (t.isScaleTranslate())
      for (let a = 0; a < 4; ++a)
        e.fRadii[a].x = this.fRadii[a].x, e.fRadii[a].y = this.fRadii[a].y;
    else {
      const a = t.b < 0;
      n = t.c * (a ? 1 : -1), r = t.b * (a ? -1 : 1);
      const h = a ? 3 : 1;
      for (let u = 0; u < 4; ++u) {
        const f = u + h >= 4 ? (u + h) % 4 : u + h;
        e.fRadii[u].x = this.fRadii[f].y, e.fRadii[u].y = this.fRadii[f].x;
      }
    }
    n < 0 && (n = -n), r < 0 && (r = -r);
    for (let a = 0; a < 4; ++a)
      e.fRadii[a].x *= n, e.fRadii[a].y *= r;
    return !0;
  }
  /**
   * Initializes fRect. If the passed in rect is not finite or empty the rrect will be fully
   * initialized and false is returned. Otherwise, just fRect is initialized and true is returned.
   */
  initializeRect(t) {
    return t.isFinite() ? (this.fRect = t.makeSorted(), this.fRect.isEmpty() ? (this.setRadiiEmpty(), this.fType = Tt, !1) : !0) : (this.setEmpty(), !1);
  }
  computeType() {
    const t = this.fRect;
    if (t.isEmpty()) {
      this.fType = Tt;
      return;
    }
    let e = this.fRadii, s = !0, n = e[0].x == 0 || e[0].y == 0;
    for (let r = 1; r < 4; ++r)
      e[r].x != 0 && e[r].y != 0 && (n = !1), (e[r].x != e[r - 1].x || e[r].y != e[r - 1].y) && (s = !1);
    if (n) {
      this.fType = ut;
      return;
    }
    if (s) {
      e[0].x >= $(t.width) && e[0].y >= $(t.height) ? this.fType = at : this.fType = At;
      return;
    }
    Ge(e) ? this.fType = Ut : this.fType = ke, this.isValid() || this.setRect(this.rect());
  }
  checkCornerContainment(t, e) {
    let s = c.default(), n;
    const r = this.fRect, l = this.fRadii;
    if (at == this.type)
      s.set(t - r.centerX, e - r.centerY), n = ft;
    else if (t < r.left + l[ft].x && e < r.top + l[ft].y)
      n = ft, s.set(
        t - (r.left + l[ft].x),
        e - (r.top + l[ft].y)
      );
    else if (t < r.left + l[St].x && e > r.bottom - l[St].y)
      n = St, s.set(
        t - (r.left + l[St].x),
        e - (r.bottom - l[St].y)
      );
    else if (t > r.right - l[Mt].x && e < r.top + l[Mt].y)
      n = Mt, s.set(
        t - (r.right - l[Mt].x),
        e - (r.top + l[Mt].y)
      );
    else if (t > r.right - l[Pt].x && e > r.bottom - l[Pt].y)
      n = Pt, s.set(
        t - (r.right - l[Pt].x),
        e - (r.bottom - l[Pt].y)
      );
    else
      return !0;
    return Nt(s.x) * Nt(l[n].y) + Nt(s.y) * Nt(l[n].x) <= Nt(l[n].x * l[n].x);
  }
  // Returns true if the radii had to be scaled to fit rect
  scaleRadii() {
    let t = 1;
    const e = this.fRect, s = this.fRadii;
    let n = e.right - e.left, r = e.bottom - e.top;
    t = Xt(s[0].x, s[1].x, n, t), t = Xt(s[1].y, s[2].y, r, t), t = Xt(s[2].x, s[3].x, n, t), t = Xt(s[3].y, s[0].y, r, t);
    let l = N.from(s[0].x), o = N.from(s[1].x), a = N.from(s[2].x), h = N.from(s[3].x), u = N.from(s[0].y), f = N.from(s[1].y), y = N.from(s[2].y), m = N.from(s[3].y);
    return Zt(l, o), Zt(f, y), Zt(a, h), Zt(m, u), t < 1 && (jt(n, t, l, o), jt(r, t, f, y), jt(n, t, a, h), jt(r, t, m, u)), s[0].set(l.value, u.value), s[1].set(o.value, f.value), s[2].set(a.value, y.value), s[3].set(h.value, m.value), ti(s), this.computeType(), t < 1;
  }
};
x(mt, "Corner", Ri);
let yt = mt;
var dt = /* @__PURE__ */ ((i) => (i[i.kWinding = 0] = "kWinding", i[i.kEvenOdd = 1] = "kEvenOdd", i[i.kInverseWinding = 2] = "kInverseWinding", i[i.kInverseEvenOdd = 3] = "kInverseEvenOdd", i))(dt || {}), A = /* @__PURE__ */ ((i) => (i[i.kCW = 0] = "kCW", i[i.kCCW = 1] = "kCCW", i))(A || {}), tt = /* @__PURE__ */ ((i) => (i[i.kLine_SkPathSegmentMask = 1] = "kLine_SkPathSegmentMask", i[i.kQuad_SkPathSegmentMask = 2] = "kQuad_SkPathSegmentMask", i[i.kConic_SkPathSegmentMask = 4] = "kConic_SkPathSegmentMask", i[i.kCubic_SkPathSegmentMask = 8] = "kCubic_SkPathSegmentMask", i))(tt || {}), g = /* @__PURE__ */ ((i) => (i[i.kMove = 0] = "kMove", i[i.kLine = 1] = "kLine", i[i.kQuad = 2] = "kQuad", i[i.kConic = 3] = "kConic", i[i.kCubic = 4] = "kCubic", i[i.kClose = 5] = "kClose", i))(g || {}), R = /* @__PURE__ */ ((i) => (i[
  i.kMoveTo = 0
  /* kMove */
] = "kMoveTo", i[
  i.kLineTo = 1
  /* kLine */
] = "kLineTo", i[
  i.kQuadCurveTo = 2
  /* kQuad */
] = "kQuadCurveTo", i[
  i.kConicTo = 3
  /* kConic */
] = "kConicTo", i[
  i.kCubicCurveTo = 4
  /* kCubic */
] = "kCubicCurveTo", i[
  i.kClose = 5
  /* kClose */
] = "kClose", i[i.kDone = 6] = "kDone", i))(R || {});
function Fs(i) {
  return (i & 2) != 0;
}
class qs {
  constructor(t, e = !1) {
    x(this, "path");
    x(this, "forceClose", !1);
    x(this, "needClose", !1);
    x(this, "closeLine", !1);
    x(this, "verbIndex", 0);
    x(this, "verbEnd", 0);
    x(this, "lastPoint", c.default());
    x(this, "movePoint", c.default());
    x(this, "pointIndex", 0);
    this.setPath(t, e);
  }
  get verbs() {
    return this.path.fVerbs;
  }
  setPath(t, e = !1) {
    this.path = t, this.verbEnd = t.fVerbs.length, this.forceClose = e, this.lastPoint.set(0, 0), this.movePoint.set(0, 0), this.forceClose = e, this.needClose = !1, this.closeLine = !1, this.pointIndex = 0;
  }
  isClosedContour() {
    if (this.path.countVerbs() <= 0 || this.verbIndex === this.verbEnd)
      return !1;
    if (this.forceClose)
      return !0;
    for (R.kMoveTo === this.verbs[this.verbIndex] && (this.verbIndex += 1); this.verbIndex < this.verbEnd; ) {
      let t = this.verbs[this.verbIndex++];
      if (R.kMoveTo == t)
        break;
      if (R.kClose == t)
        return !0;
    }
    return !1;
  }
  autoClose(t) {
    return this.lastPoint.equals(this.movePoint) ? (t[0] = this.movePoint.clone(), R.kClose) : !Number.isFinite(this.lastPoint.x) || !Number.isFinite(this.lastPoint.y) || !Number.isFinite(this.movePoint.x) || !Number.isFinite(this.movePoint.y) ? R.kClose : (t[0] = this.lastPoint.clone(), t[1] = this.movePoint.clone(), this.lastPoint.copy(this.movePoint), this.closeLine = !0, R.kLineTo);
  }
  next(t) {
    if (this.verbIndex >= this.verbEnd)
      return this.needClose ? R.kLineTo == this.autoClose(t) ? R.kLineTo : (this.needClose = !1, R.kClose) : R.kDone;
    let e = this.path.fPts, s = this.pointIndex, n = this.verbs[this.verbIndex++];
    switch (n) {
      case g.kMove:
        if (this.needClose)
          return this.verbIndex--, n = this.autoClose(t), n == R.kClose && (this.needClose = !1), n;
        if (this.verbIndex === this.verbEnd)
          return R.kDone;
        this.movePoint.copy(e[s]), t[0] = c.fromPoint(e[s]), s += 1, this.lastPoint.copy(this.movePoint), this.needClose = this.forceClose;
        break;
      case g.kLine:
        t[0] = this.lastPoint.clone(), t[1] = c.fromPoint(e[s]), this.lastPoint.copy(e[s]), this.closeLine = !1, s += 1;
        break;
      case g.kQuad:
        t[0] = this.lastPoint.clone(), t[1] = c.fromPoint(e[s]), t[2] = c.fromPoint(e[s + 1]), this.lastPoint.copy(e[s + 1]), s += 2;
        break;
      case g.kCubic:
        t[0] = this.lastPoint.clone(), t[1] = c.fromPoint(e[s]), t[2] = c.fromPoint(e[s + 1]), t[3] = c.fromPoint(e[s + 2]), this.lastPoint.copy(e[s + 2]), s += 3;
        break;
      case g.kClose:
        n = this.autoClose(t), n == R.kLineTo ? this.verbIndex-- : this.needClose = !1, this.lastPoint.copy(this.movePoint);
        break;
    }
    return this.pointIndex = s, n;
  }
}
function wi(i, t, e) {
  let s = new Array(4).fill(0);
  s[0] = i[0].y - t, s[1] = i[1].y - t, s[2] = i[2].y - t, s[3] = i[3].y - t;
  {
    let n = 0, r = 0;
    if (s[0] < 0) {
      if (s[3] < 0)
        return !1;
      n = 0, r = Q;
    } else if (s[0] > 0) {
      if (s[3] > 0)
        return !1;
      n = Q, r = 0;
    } else
      return e.value = 0, !0;
    const l = Q / 65536;
    do {
      let o = (r + n) / 2, a = G(s[0], s[1], o), h = G(s[1], s[2], o), u = G(s[2], s[3], o), f = G(a, h, o), y = G(h, u, o), m = G(f, y, o);
      if (m == 0)
        return e.value = o, !0;
      m < 0 ? n = o : r = o;
    } while (!(X(r - n) <= l));
    return e.value = (n + r) / 2, !0;
  }
}
function B(i, t, e) {
  return (i - t) * (e - t) <= 0;
}
function he(i, t, e, s) {
  return e.y == s.y ? B(e.x, i, s.x) && i != s.x : i == e.x && t == e.y;
}
function zs(i) {
  return i < 0 ? -1 : +(i > 0);
}
function Bs(i, t, e, s) {
  let n = i[0].x, r = i[0].y, l = i[1].x, o = i[1].y, a = o - r, h = 1;
  if (r > o) {
    let f = r;
    r = o, o = f, h = -1;
  }
  if (e < r || e > o)
    return 0;
  if (he(t, e, i[0], i[1]))
    return s.value += 1, 0;
  if (e == o)
    return 0;
  let u = (l - n) * (e - i[0].y) - a * (t - n);
  return u ? zs(u) == h && (h = 0) : ((t != l || e != i[1].y) && (s.value += 1), h = 0), h;
}
function Ii(i, t, e) {
  return i == t ? !0 : i < t ? t <= e : t >= e;
}
function ue(i, t, e, s) {
  return (i * s + t) * s + e;
}
function Vs(i, t, e, s, n) {
  return ((i * n + t) * n + e) * n + s;
}
function ei(i, t, e, s) {
  let n = i[0].y, r = i[2].y, l = 1;
  if (n > r) {
    let u = n;
    n = r, r = u, l = -1;
  }
  if (e < n || e > r)
    return 0;
  if (he(t, e, i[0], i[2]))
    return s.value += 1, 0;
  if (e == r)
    return 0;
  let o = F.from([0, 0]), a = nt(
    i[0].y - 2 * i[1].y + i[2].y,
    2 * (i[1].y - i[0].y),
    i[0].y - e,
    o
  ), h;
  if (a == 0)
    h = i[1 - l].x;
  else {
    let u = o.get(0), f = i[0].x, y = i[2].x - 2 * i[1].x + f, m = 2 * (i[1].x - f);
    h = ue(y, m, f, u);
  }
  return U(h, t) && (t != i[2].x || e != i[2].y) ? (s.value += 1, 0) : h < t ? l : 0;
}
function Qs(i, t, e, s) {
  let n, r;
  n = r = t[0].x;
  for (let l = 1; l < i; ++l)
    n = Math.min(n, t[l].x), r = Math.max(r, t[l].x);
  e.value = n, s.value = r;
}
function Ei(i, t, e, s, n) {
  let r = s + 3 * (t - e) - i, l = 3 * (e - t - t + i), o = 3 * (t - i);
  return Vs(r, l, o, i, n);
}
function Os(i, t, e, s) {
  let n = i[0].y, r = i[3].y, l = 1;
  if (n > r) {
    let f = n;
    n = r, r = f, l = -1;
  }
  if (e < n || e > r)
    return 0;
  if (he(t, e, i[0], i[3]))
    return s.value += 1, 0;
  if (e == r)
    return 0;
  let o = N.from(0), a = N.from(0);
  if (Qs(4, i, o, a), t < o.value)
    return 0;
  if (t > a.value)
    return l;
  let h = N.from(0);
  if (!wi(i, e, h))
    return 0;
  let u = Ei(i[0].x, i[1].x, i[2].x, i[3].x, h.value);
  return U(u, t) && (t != i[3].x || e != i[3].y) ? (s.value += 1, 0) : u < t ? l : 0;
}
function Ys(i, t, e, s) {
  let n = Array.from({ length: 5 }, () => c.default()), r = 0;
  Ii(i[0].y, i[1].y, i[2].y) || (r = ds(i, n), i = n);
  let l = ei(i, t, e, s);
  return r > 0 && (l += ei(i.slice(2), t, e, s)), l;
}
function Ds(i, t, e, s) {
  let n = Array.from({ length: 10 }, () => c.default()), r = Si(i, n), l = 0;
  for (let o = 0; o <= r; ++o)
    l += Os(n.slice(o * 3), t, e, s);
  return l;
}
function Li(i, t, e) {
  let s = i[2] * t, n = i[0], r = i[4] - 2 * s + n, l = 2 * (s - n);
  return ue(r, l, n, e);
}
function Ni(i, t) {
  let e = 2 * (i - 1), s = 1, n = -e;
  return ue(n, e, s, t);
}
function ii(i, t, e, s) {
  const n = i.fPts;
  let r = n[0].y, l = n[2].y, o = 1;
  if (r > l) {
    let k = r;
    r = l, l = k, o = -1;
  }
  if (e < r || e > l)
    return 0;
  if (he(t, e, n[0], n[2]))
    return s.value += 1, 0;
  if (e == l)
    return 0;
  let a = F.from([0, 0]), h = n[2].y, u = n[1].y * i.fW - e * i.fW + e, f = n[0].y;
  h += f - 2 * u, u -= f, f -= e;
  let y = nt(h, 2 * u, f, a), m = 0;
  if (y == 0)
    m = n[1 - o].x;
  else {
    let k = a.get(0);
    m = Li(n.map((p) => p.x), i.fW, k) / Ni(i.fW, k);
  }
  return U(m, t) && (t != n[2].x || e != n[2].y) ? (s.value += 1, 0) : m < t ? o : 0;
}
function br(i, t, e, s, n) {
  let r = new z(i, s), l = [z.default(), z.default()], o = Ii(i[0].y, i[1].y, i[2].y) || !r.chopAtYExtrema(l), a = ii(o ? r : l[0], t, e, n);
  return o || (a += ii(l[1], t, e, n)), a;
}
function Xs(i, t, e, s) {
  let n = i[0].y, r = i[1].y;
  if (!B(n, e, r))
    return;
  let l = i[0].x, o = i[1].x;
  if (!B(l, t, o))
    return;
  let a = o - l, h = r - n;
  if (!U((t - l) * h, a * (e - n)))
    return;
  let u = c.default();
  u.set(a, h), s.push(u);
}
function js(i, t, e, s) {
  if (!B(i[0].y, e, i[1].y) && !B(i[1].y, e, i[2].y) || !B(i[0].x, t, i[1].x) && !B(i[1].x, t, i[2].x))
    return;
  let n = F.from([0, 0]), r = nt(
    i[0].y - 2 * i[1].y + i[2].y,
    2 * (i[1].y - i[0].y),
    i[0].y - e,
    n
  );
  for (let l = 0; l < r; ++l) {
    let o = n.get(l), a = i[0].x, h = i[2].x - 2 * i[1].x + a, u = 2 * (i[1].x - a), f = ue(h, u, a, o);
    U(t, f) && s.push(Ie(i, o));
  }
}
function Zs(i, t, e, s) {
  if (!B(i[0].y, e, i[1].y) && !B(i[1].y, e, i[2].y) && !B(i[2].y, e, i[3].y) || !B(i[0].x, t, i[1].x) && !B(i[1].x, t, i[2].x) && !B(i[2].x, t, i[3].x))
    return;
  let n = Array.from({ length: 10 }, () => c.default()), r = Si(i, n);
  for (let l = 0; l <= r; ++l) {
    let o = n.slice(l * 3), a = N.from(0);
    if (!wi(o, e, a))
      continue;
    let h = Ei(o[0].x, o[1].x, o[2].x, o[3].x, a.value);
    if (!U(t, h))
      continue;
    let u = c.default();
    Ti(o, a.value, null, u, null), s.push(u);
  }
}
function gr(i, t, e, s, n) {
  if (!B(i[0].y, e, i[1].y) && !B(i[1].y, e, i[2].y) || !B(i[0].y, t, i[1].y) && !B(i[1].y, t, i[2].y))
    return;
  let r = F.from([0, 0]), l = i[2].y, o = i[1].y * s - e * s + e, a = i[0].y;
  l += a - 2 * o, o -= a, a -= e;
  let h = nt(l, 2 * o, a, r);
  for (let u = 0; u < h; ++u) {
    let f = r.get(u), y = Li(i.map((k) => k.y), s, f) / Ni(s, f);
    if (!U(t, y))
      continue;
    let m = new z(i, s);
    n.push(m.evalTangentAt(f));
  }
}
var Ai = /* @__PURE__ */ ((i) => (i[i.kIsA_JustMoves = 0] = "kIsA_JustMoves", i[i.kIsA_MoreThanMoves = 1] = "kIsA_MoreThanMoves", i[i.kIsA_Oval = 2] = "kIsA_Oval", i[i.kIsA_RRect = 3] = "kIsA_RRect", i))(Ai || {});
function si(i, t) {
  return U(i.x, t.x) && U(i.y, t.y);
}
function ni(i, t, e, s, n) {
  let r = i * Math.PI / 180, l = (i + t) * Math.PI / 180;
  if (e.y = $t(r), e.x = Gt(r), s.y = $t(l), s.x = Gt(l), e.equals(s)) {
    let o = Math.abs(t);
    if (o < 360 && o > 359) {
      let a = ji(1953125e-9, t);
      do
        l -= a, s.y = $t(l), s.x = Gt(l);
      while (e.equals(s));
    }
  }
  n.value = t > 0 ? zt.kCW_SkRotationDirection : zt.kCCW_SkRotationDirection;
}
function ri(i, t, e, s) {
  return e == 0 && (t == 0 || t == 360) ? (s.set(i.right, i.centerX), !0) : i.width == 0 && i.height == 0 ? (s.set(i.right, i.top), !0) : !1;
}
function li(i, t, e, s, n, r) {
  let l = ht.fromScale($(i.width), $(i.height));
  l.postTranslate(i.centerX, i.centerY);
  let o = z.BuildUnitArc(t, e, s, l, n);
  return o == 0 && l.mapXY(e.x, e.y, r), o;
}
const oe = class oe {
  constructor() {
    x(this, "fPts", []);
    x(this, "fVerbs", []);
    x(this, "fConicWeights", []);
    x(this, "fFillType", dt.kWinding);
    x(this, "fIsVolatile", !1);
    x(this, "fSegmentMask", tt.kLine_SkPathSegmentMask);
    x(this, "fLastMovePoint", c.zero());
    x(this, "fLastMoveIndex", -1);
    // only needed until SkPath is immutable
    x(this, "fNeedsMoveVerb", !0);
    x(this, "fIsA", 0);
    x(this, "fIsAStart", -1);
    // tracks direction iff fIsA is not unknown
    x(this, "fIsACCW", !1);
  }
  static default() {
    return new this();
  }
  static fromPathFillType(t) {
    return this.default().setFillType(t);
  }
  static fromPath(t) {
    return this.default().setFillType(t.getFillType()).addPath(t);
  }
  static fromPathBuilder(t) {
    return this.default().setFillType(t.getFillType()).addPath(t);
  }
  // tracks direction iff fIsA is not unknown
  isEmpty() {
    return this.fVerbs.length == 0;
  }
  getFillType() {
    return this.fFillType;
  }
  isInverseFillType() {
    return Fs(this.getFillType());
  }
  getSegmentMasks() {
    return this.fSegmentMask;
  }
  // constructor()
  // constructor(fillType:PathFillType)
  // constructor(path:any)
  countVerbs() {
    return this.fVerbs.length;
  }
  // called right before we add a (non-move) verb
  ensureMove() {
    this.fIsA = 1, this.fNeedsMoveVerb && this.moveTo(this.fLastMovePoint.x, this.fLastMovePoint.y);
  }
  copy(t) {
    return this.fVerbs = t.fVerbs.slice(), this.fPts = t.fPts.map((e) => c.fromPoint(e)), this.fConicWeights = t.fConicWeights.slice(), this.fFillType = t.fFillType, this.fIsVolatile = t.fIsVolatile, this.fSegmentMask = t.fSegmentMask, this.fLastMovePoint.copy(t.fLastMovePoint), this.fLastMoveIndex = t.fLastMoveIndex, this;
  }
  clone() {
    return oe.default().copy(this);
  }
  // 忽略第一个轮廓的最后一个点
  reversePathTo(t) {
    if (t.fVerbs.length == 0) return this;
    const e = 0;
    let s = t.countVerbs();
    const n = t.fVerbs, r = t.fPts;
    let l = r.length - 1;
    const o = t.fConicWeights;
    let a = t.fConicWeights.length;
    for (; s > e; ) {
      let h = n[--s];
      switch (l -= oi(h), h) {
        case g.kMove:
          return this;
        case g.kLine:
          this.lineTo(r[l]);
          break;
        case g.kQuad:
          this.quadTo(r[l + 1], r[l]);
          break;
        case g.kConic:
          this.conicTo(r[l + 1], r[l], o[--a]);
          break;
        case g.kCubic:
          this.cubicTo(r[l + 2], r[l + 1], r[l]);
          break;
        case g.kClose:
          break;
      }
    }
    return this;
  }
  reverseAddPath(t) {
    if (t.fVerbs.length == 0) return this;
    const e = 0;
    let s = t.countVerbs();
    const n = t.fVerbs, r = t.fPts;
    let l = r.length;
    const o = t.fConicWeights;
    let a = t.fConicWeights.length, h = !0, u = !1;
    for (; s > e; ) {
      let f = n[--s], y = oi(f);
      switch (h && (--l, this.moveTo(r[l]), h = !1), l -= y, f) {
        case g.kMove:
          u && (this.close(), u = !1), h = !0, l += 1;
          break;
        case g.kLine:
          this.lineTo(r[l]);
          break;
        case g.kQuad:
          this.quadTo(r[l + 1], r[l]);
          break;
        case g.kConic:
          this.conicTo(r[l + 1], r[l], o[--a]);
          break;
        case g.kCubic:
          this.cubicTo(r[l + 2], r[l + 1], r[l]);
          break;
        case g.kClose:
          u = !0;
          break;
      }
    }
    return this;
  }
  fillType() {
    return this.fFillType;
  }
  computeBounds() {
    let t = W.makeEmpty(), e = this.fPts;
    return t.setBounds(e, e.length), t;
  }
  snapshot() {
  }
  // the builder is unchanged after returning this path
  detach() {
    this.reset();
  }
  setFillType(t) {
    return this.fFillType = t, this;
  }
  setCanvasFillType(t) {
    switch (t) {
      case "evenodd":
        return this.setFillType(dt.kEvenOdd);
      case "nonzero":
        return this.setFillType(dt.kWinding);
    }
    return this;
  }
  setIsVolatile(t) {
    return this.fIsVolatile = t, this;
  }
  reset() {
    this.fPts = [], this.fVerbs = [], this.fConicWeights = [], this.fFillType = dt.kWinding, this.fIsVolatile = !1, this.fSegmentMask = 0, this.fLastMovePoint = c.zero(), this.fLastMoveIndex = -1, this.fNeedsMoveVerb = !0, this.fSegmentMask = tt.kLine_SkPathSegmentMask;
  }
  moveTo(t, e) {
    let s = typeof t == "number" ? c.create(t, e) : t;
    return this.fLastMoveIndex = this.fPts.length, this.fPts.push(s), this.fVerbs.push(g.kMove), this.fLastMovePoint.copy(s), this.fNeedsMoveVerb = !1, this;
  }
  lineTo(t, e) {
    let s = typeof t == "number" ? c.create(t, e) : t;
    return this.ensureMove(), this.fPts.push(s), this.fVerbs.push(g.kLine), this.fSegmentMask |= tt.kLine_SkPathSegmentMask, this;
  }
  quadTo(t, e, s, n) {
    let r = typeof t == "number" ? c.create(t, e) : t, l = typeof e == "number" ? c.create(s, n) : e;
    return this.ensureMove(), this.fPts.push(r), this.fPts.push(l), this.fVerbs.push(g.kQuad), this.fSegmentMask |= tt.kQuad_SkPathSegmentMask, this;
  }
  conicTo(t, e, s, n, r) {
    let l = typeof t == "number" ? c.create(t, e) : t, o = typeof e == "number" ? c.create(s, n) : e, a = typeof t == "number" ? r : s;
    if (!(a > 0))
      this.lineTo(l);
    else if (!kt(a))
      this.lineTo(l), this.lineTo(o);
    else if (Q == r)
      this.quadTo(l, o);
    else {
      this.ensureMove();
      let h = this.lastPoint;
      const u = 4 * a / (3 * (1 + a));
      let f = h.x + (l.x - h.x) * u, y = h.y + (l.y - h.y) * u, m = o.x + (l.x - o.x) * u, k = o.y + (l.y - o.y) * u;
      this.cubicTo(f, y, m, k, o.x, o.y);
    }
    return this.fSegmentMask |= tt.kConic_SkPathSegmentMask, this;
  }
  cubicTo(t, e, s, n, r, l) {
    this.ensureMove();
    let o = typeof t == "number" ? c.create(t, e) : t, a = typeof e == "number" ? c.create(s, n) : e, h = typeof s == "number" ? c.create(r, l) : s;
    return this.fPts.push(o), this.fPts.push(a), this.fPts.push(h), this.fVerbs.push(g.kCubic), this.fSegmentMask |= tt.kCubic_SkPathSegmentMask, this;
  }
  close() {
    return this.fVerbs.length > 0 && (this.ensureMove(), this.fVerbs.push(g.kClose), this.fNeedsMoveVerb = !0), this;
  }
  get lastPoint() {
    return this.fPts[this.fPts.length - 1];
  }
  setLastPoint(t, e) {
    this.lastPoint.set(t, e);
  }
  // Append a series of lineTo(...)
  polylineTo(t, e = t.length) {
    if (t.length > 0) {
      this.ensureMove();
      for (let s = 0; s < e; ++s)
        this.fPts.push(t[s]), this.fVerbs.push(g.kLine);
      this.fSegmentMask |= tt.kLine_SkPathSegmentMask;
    }
    return this;
  }
  rLineTo(t, e) {
    return this.ensureMove(), this.lineTo(this.lastPoint.x + t, this.lastPoint.y + e);
  }
  rQuadTo(t, e) {
    this.ensureMove();
    let s = this.lastPoint;
    return this.quadTo(s.x + t.x, s.y + t.y, s.x + e.x, s.y + e.y);
  }
  rConicTo(t, e, s) {
    this.ensureMove();
    let n = this.lastPoint;
    return this.conicTo(n.x + t.x, n.y + t.y, n.x + e.x, n.y + e.y, s);
  }
  rCubicTo(t, e, s) {
    this.ensureMove();
    let n = this.lastPoint;
    return this.cubicTo(n.x + t.x, n.y + t.y, n.x + e.x, n.y + e.y, n.x + s.x, n.y + s.y);
  }
  // Arcs
  /** Appends arc to the builder. Arc added is part of ellipse
          bounded by oval, from startAngle through sweepAngle. Both startAngle and
          sweepAngle are measured in degrees, where zero degrees is aligned with the
          positive x-axis, and positive sweeps extends arc clockwise.
  
          arcTo() adds line connecting the builder's last point to initial arc point if forceMoveTo
          is false and the builder is not empty. Otherwise, added contour begins with first point
          of arc. Angles greater than -360 and less than 360 are treated modulo 360.
  
          @param oval          bounds of ellipse containing arc
          @param startAngleDeg starting angle of arc in degrees
          @param sweepAngleDeg sweep, in degrees. Positive is clockwise; treated modulo 360
          @param forceMoveTo   true to start a new contour with arc
          @return              reference to the builder
      */
  arcToOval(t, e, s, n) {
    if (t.width < 0 || t.height < 0)
      return this;
    this.fVerbs.length <= 0 && (n = !0);
    let l = c.default();
    if (ri(t, e, s, l))
      return n ? this.moveTo(l) : this.lineTo(l);
    let o = c.default(), a = c.default(), h = N.from(zt.kCW_SkRotationDirection);
    ni(e, s, o, a, h);
    let u = c.default(), f = (k) => {
      n ? this.moveTo(k) : si(this.lastPoint, k) || this.lineTo(k);
    };
    if (o.equals(a)) {
      let k = Ye(e + s), p = t.width / 2, b = t.height / 2;
      return u.set(
        t.centerX + p * xt(k),
        t.centerY + b * Te(k)
      ), f(u), this;
    }
    let y = z.make(5), m = li(t, o, a, h.value, y, u);
    if (m) {
      this.incReserve(m * 2 + 1);
      const k = y[0].fPts[0];
      f(k);
      for (let p = 0; p < m; ++p)
        this.conicTo(y[p].fPts[1], y[p].fPts[2], y[p].fW);
    } else
      f(u);
    return this;
  }
  arcTo(t, e, s, n, r) {
    const l = arguments.length, o = this.fVerbs, a = this.fPts;
    if (l === 3) {
      const h = t, u = e, f = s;
      if (this.ensureMove(), f == 0)
        return this.lineTo(h);
      let y = this.lastPoint, m = c.create(h.x - y.x, h.y - y.y).toNormalize(), k = c.create(u.x - h.x, u.y - h.y).toNormalize(), p = m.dot(k), b = m.cross(k);
      if (!m.isFinite() || !k.isFinite() || st(Jt(b)))
        return this.lineTo(h);
      let d = X(Jt(f * (1 - p) / b)), _ = h.x - d * m.x, v = h.y - d * m.y, M = c.create(k.x, k.y);
      M.setLength(d), this.lineTo(_, v);
      let P = K(Jt(pt + p * 0.5));
      return this.conicTo(h, h.clone().add(M), P);
    } else if (l === 4) {
      let h = t, u = e, f = s, y = n;
      if (h.width < 0 || h.height < 0)
        return this;
      o.length <= 0 && (y = !0);
      let m = c.default();
      if (ri(h, u, f, m))
        return y ? this.moveTo(m) : this.lineTo(m);
      let k = c.default(), p = c.default(), b = N.from(zt.kCW_SkRotationDirection);
      ni(u, f, k, p, b);
      let d = c.default(), _ = (P) => {
        y ? this.moveTo(P) : si(a[this.fPts.length - 1], P) || this.lineTo(P);
      };
      if (k.equalsEpsilon(p)) {
        let P = Ye(u + f), E = h.width / 2, L = h.height / 2;
        return d.set(
          h.centerX + E * xt(P),
          h.centerY + L * Te(P)
        ), _(d), this;
      }
      let v = z.make(os), M = li(h, k, p, b.value, v, d);
      if (M) {
        this.incReserve(M * 2 + 1);
        const P = v[0].fPts[0];
        _(P);
        for (let E = 0; E < M; ++E)
          this.conicTo(v[E].fPts[1], v[E].fPts[2], v[E].fW);
      } else
        _(d);
      return this;
    } else {
      let h = t, u = e, f = s, y = n, m = r;
      this.ensureMove();
      let k = [this.lastPoint.clone(), m];
      if (!h.x || !h.y)
        return this.lineTo(m);
      if (k[0] == k[1])
        return this.lineTo(m);
      let p = X(h.x), b = X(h.y), d = k[0].clone().subtract(k[1]);
      d.multiplyScalar(0.5);
      let _ = ht.identity();
      _.setRotate(-u);
      let v = c.default();
      _.mapPoints([v], [d]);
      let M = p * p, P = b * b, E = v.x * v.x, L = v.y * v.y, I = E / M + L / P;
      I > 1 && (I = K(I), p *= I, b *= I), _.setScale(1 / p, 1 / b), _.preRotate(-u);
      let C = [c.default(), c.default()];
      _.mapPoints(C, k);
      let O = C[1].clone().subtract(C[0]), rt = O.x * O.x + O.y * O.y, lt = Math.max(1 / rt - 0.25, 0), H = K(lt);
      y == A.kCCW != !!f && (H = -H), O.multiplyScalar(H);
      let j = C[0].clone().add(C[1]);
      j.multiplyScalar(0.5), j.translate(-O.y, O.x), C[0].subtract(j), C[1].subtract(j);
      let ot = Qe(C[0].y, C[0].x), V = Qe(C[1].y, C[1].x) - ot;
      if (V < 0 && y == A.kCW ? V += et * 2 : V > 0 && y != A.kCW && (V -= et * 2), X(V) < et / (1e3 * 1e3))
        return this.lineTo(m);
      _.setRotate(u), _.preScale(p, b);
      let Et = es(X(V / (2 * et / 3))), Bt = V / Et, fe = ss(0.5 * Bt);
      if (!kt(fe))
        return this;
      let Fe = ot, Bi = K(pt + xt(Bt) * pt), Vt = (Lt) => Lt == ki(Lt), Vi = st(et / 2 - X(Bt)) && Vt(p) && Vt(b) && Vt(m.x) && Vt(m.y);
      for (let Lt = 0; Lt < Et; ++Lt) {
        let ce = Fe + Bt, qe = $t(ce), ze = Gt(ce);
        C[1].set(ze, qe), C[1].add(j), C[0].copy(C[1]), C[0].translate(fe * qe, -fe * ze);
        let Qt = [c.default(), c.default()];
        if (_.mapPoints(Qt, C), Vi)
          for (let Ot of Qt)
            Ot.x = me(Ot.x), Ot.y = me(Ot.y);
        this.conicTo(Qt[0], Qt[1], Bi), Fe = ce;
      }
      a[a.length - 1].copy(m);
    }
    return this;
  }
  /** Appends arc to the builder, as the start of new contour. Arc added is part of ellipse
          bounded by oval, from startAngle through sweepAngle. Both startAngle and
          sweepAngle are measured in degrees, where zero degrees is aligned with the
          positive x-axis, and positive sweeps extends arc clockwise.
  
          If sweepAngle <= -360, or sweepAngle >= 360; and startAngle modulo 90 is nearly
          zero, append oval instead of arc. Otherwise, sweepAngle values are treated
          modulo 360, and arc may or may not draw depending on numeric rounding.
  
          @param oval          bounds of ellipse containing arc
          @param startAngleDeg starting angle of arc in degrees
          @param sweepAngleDeg sweep, in degrees. Positive is clockwise; treated modulo 360
          @return              reference to this builder
      */
  addArc(t, e, s) {
    if (t.isEmpty() || s == 0)
      return this;
    const n = Gi(360);
    if (s >= n || s <= -n) {
      let r = e / 90, l = me(r), o = r - l;
      if (U(o, 0)) {
        let a = (l + 1) % 4;
        return a = a < 0 ? a + 4 : a, this.addOval(
          t,
          s > 0 ? A.kCW : A.kCCW,
          a
        );
      }
    }
    return this.arcTo(t, e, s, !0);
  }
  addRect(t, e = A.kCW, s = 1) {
    let n = new be(t, e, s);
    return this.moveTo(n.current), this.lineTo(n.next()), this.lineTo(n.next()), this.lineTo(n.next()), this.close();
  }
  addOval(t, e = A.kCW, s = 0) {
    const n = this.fIsA;
    this.incReserve(9, 6);
    let o = new Us(t, e, s), a = new be(t, e, s + (e == A.kCW ? 0 : 1));
    this.moveTo(o.current);
    for (let h = 0; h < 4; ++h)
      this.conicTo(a.next(), o.next(), ve);
    return this.close(), n == 0 && (this.fIsA = 2, this.fIsACCW = e == A.kCCW, this.fIsAStart = s % 4), this;
  }
  addRRect(t, e = A.kCW, s = e == A.kCW ? 6 : 7) {
    const n = this.fIsA, r = t.getBounds();
    if (t.isRect() || t.isEmpty())
      this.addRect(r, e, (s + 1) / 2);
    else if (t.isOval())
      this.addOval(r, e, s / 2);
    else {
      const l = (s & 1) == +(e == A.kCW), o = ve, a = l ? 9 : 10;
      this.incReserve(a);
      let h = new Hs(t, e, s);
      const u = s / 2 + (e == A.kCW ? 0 : 1);
      let f = new be(r, e, u);
      if (this.moveTo(h.current), l) {
        for (let y = 0; y < 3; ++y)
          this.conicTo(f.next(), h.next(), o), this.lineTo(h.next());
        this.conicTo(f.next(), h.next(), o);
      } else
        for (let y = 0; y < 4; ++y)
          this.lineTo(h.next()), this.conicTo(f.next(), h.next(), o);
      this.close();
    }
    return n == 0 && (this.fIsA = 3, this.fIsACCW = e == A.kCCW, this.fIsAStart = s % 8), this;
  }
  addCircle(t, e, s, n = A.kCW) {
    return s >= 0 && this.addOval(W.makeLTRB(t - s, e - s, t + s, e + s), n), this;
  }
  addPolygon(t, e, s) {
    return e <= 0 ? this : (this.moveTo(t[0]), this.polylineTo(t.slice(1), e - 1), s && this.close(), this);
  }
  getBounds() {
    const t = W.makeLTRB(1 / 0, 1 / 0, -1 / 0, -1 / 0);
    return t.setBounds(this.fPts, this.fPts.length), t;
  }
  computeTightBounds() {
    if (this.countVerbs() == 0)
      return W.makeEmpty();
    if (this.getSegmentMasks() == tt.kLine_SkPathSegmentMask)
      return this.getBounds();
    let t = new Array(5).fill(0).map(() => c.default()), e = c.default(), s = c.default(), n = this.fPts, r = 0, l = 0;
    for (let a = 0; a < this.fVerbs.length; ++a) {
      let h = 0;
      switch (this.fVerbs[a]) {
        case g.kMove:
          t[0].copy(n[r]), r += 1, h = 1;
          break;
        case g.kLine:
          t[0].copy(n[r]), r += 1, h = 1;
          break;
        case g.kQuad:
          let f = [n[r - 1], n[r], n[r + 1]];
          h = Es(f, t), r += 2;
          break;
        case g.kConic:
          let y = [n[r - 1], n[r], n[r + 1]];
          h = Ns(y, this.fConicWeights[l++], t);
          break;
        case g.kCubic:
          let m = [n[r - 1], n[r], n[r + 1], n[r + 2]];
          h = Ls(m, t), r += 3;
          break;
        case g.kClose:
          break;
      }
      for (let f = 0; f < h; ++f) {
        let y = t[f];
        e.min(y), s.max(y);
      }
    }
    let o = W.makeEmpty();
    return o.setLTRB(e.x, e.y, s.x, s.y), o;
  }
  contains(t, e, s = "nonzero") {
    return this.setCanvasFillType(s), Ks(t, e, this);
  }
  addPath(t) {
    for (let { type: e, p0: s, p1: n, p2: r, p3: l } of t)
      switch (e) {
        case g.kMove:
          this.moveTo(s);
          break;
        case g.kLine:
          this.lineTo(s);
          break;
        case g.kQuad:
          this.quadTo(n, r);
          break;
        case g.kCubic:
          this.cubicTo(n.x, n.y, r.x, r.y, l.x, l.y);
          break;
        case g.kClose:
          this.close();
          break;
      }
    return this;
  }
  // 扩充内存空间
  incReserve(t, e) {
  }
  transform(t) {
    if (t.isIdentity())
      return this;
    for (let e = 0; e < this.fPts.length; ++e)
      this.fPts[e].applyMatrix2D(t);
  }
  getLastPt(t) {
    let e = this.fPts.length;
    return e > 0 ? (t && t.copy(this.fPts[e - 1]), !0) : (t && t.set(0, 0), !1);
  }
  offset(t, e) {
  }
  toggleInverseFillType() {
    return this.fFillType = this.fFillType ^ 2, this;
  }
  isZeroLengthSincePoint(t) {
    let e = this.fPts.length - t;
    if (e < 2)
      return !0;
    let s = this.fPts[t];
    for (let n = 1; n < e; n++)
      if (s.equals(this.fPts[n]))
        return !1;
    return !0;
  }
  *[Symbol.iterator]() {
    let t = 0, e = c.default();
    for (let s = 0; s < this.fVerbs.length; ++s) {
      let n = this.fVerbs[s];
      switch (n) {
        case g.kMove:
          yield {
            type: n,
            p0: this.fPts[t]
          }, e.copy(this.fPts[t]), t += 1;
          break;
        case g.kLine:
          yield {
            type: n,
            p0: this.fPts[t]
          }, t += 1;
          break;
        case g.kQuad:
          yield {
            type: n,
            p0: this.fPts[t - 1],
            p1: this.fPts[t],
            p2: this.fPts[t + 1]
          }, t += 2;
          break;
        case g.kCubic:
          yield {
            type: n,
            p0: this.fPts[t - 1],
            p1: this.fPts[t],
            p2: this.fPts[t + 1],
            p3: this.fPts[t + 2]
          }, t += 3;
          break;
        case g.kClose:
          yield {
            type: n,
            p0: e,
            p1: this.fPts[t - 1]
          };
          break;
      }
    }
  }
  toCanvas(t) {
    for (let { type: e, p0: s, p1: n, p2: r, p3: l } of this)
      switch (e) {
        case g.kMove:
          t.moveTo(s.x, s.y);
          break;
        case g.kLine:
          t.lineTo(s.x, s.y);
          break;
        case g.kQuad:
          t.quadraticCurveTo(n.x, n.y, r.x, r.y);
          break;
        case g.kCubic:
          t.bezierCurveTo(n.x, n.y, r.x, r.y, l.x, l.y);
          break;
        case g.kClose:
          t.closePath();
          break;
      }
  }
  toPath2D() {
    const t = new Path2D();
    return this.toCanvas(t), t;
  }
  toSvgPath() {
    let t = [];
    for (let { type: e, p0: s, p1: n, p2: r, p3: l } of this)
      switch (e) {
        case g.kMove:
          t.push(["M", s.x, s.y]);
          break;
        case g.kLine:
          t.push(["L", s.x, s.y]);
          break;
        case g.kQuad:
          t.push(["Q", n.x, n.y, r.x, r.y]);
          break;
        case g.kCubic:
          t.push(["C", n.x, n.y, r.x, r.y, l.x, l.y]);
          break;
        case g.kClose:
          t.push(["Z"]);
          break;
      }
    return t.map((e) => e[0] + e.slice(1).join(" ")).join("");
  }
};
x(oe, "IsA", Ai);
let wt = oe;
const oi = (i) => {
  switch (i) {
    case g.kMove:
      return 1;
    case g.kLine:
      return 1;
    case g.kConic:
    case g.kQuad:
      return 2;
    case g.kCubic:
      return 3;
    default:
      return 0;
  }
};
class Le {
  constructor(t, e, s) {
    x(this, "fPts", []);
    x(this, "size", 0);
    x(this, "fCurrent");
    x(this, "fAdvance");
    this.size = t, this.fPts = new Array(t), this.fCurrent = Math.trunc(s) % t, this.fAdvance = e == A.kCW ? 1 : t - 1;
  }
  get current() {
    return this.fPts[this.fCurrent];
  }
  next(t = 0) {
    return this.fCurrent = (this.fCurrent + t * this.fAdvance + this.fAdvance) % this.size, this.current;
  }
}
class Us extends Le {
  constructor(t, e, s) {
    super(4, e, s);
    const n = t.centerX, r = t.centerY;
    this.fPts[0] = c.create(n, t.top), this.fPts[1] = c.create(t.right, r), this.fPts[2] = c.create(n, t.bottom), this.fPts[3] = c.create(t.left, r);
  }
}
class be extends Le {
  constructor(t, e, s) {
    super(4, e, s), this.fPts[0] = c.create(t.left, t.top), this.fPts[1] = c.create(t.right, t.top), this.fPts[2] = c.create(t.right, t.bottom), this.fPts[3] = c.create(t.left, t.bottom);
  }
}
class Hs extends Le {
  constructor(t, e, s) {
    super(8, e, s);
    const n = t.getBounds(), r = n.left, l = n.top, o = n.right, a = n.bottom, h = t.fRadii, u = yt.Corner.kUpperLeft_Corner, f = yt.Corner.kUpperRight_Corner, y = yt.Corner.kLowerRight_Corner, m = yt.Corner.kLowerLeft_Corner;
    this.fPts[0] = c.create(r + h[u].x, l), this.fPts[1] = c.create(o - h[f].x, l), this.fPts[2] = c.create(o, l + h[f].y), this.fPts[3] = c.create(o, a - h[y].y), this.fPts[4] = c.create(o - h[y].x, a), this.fPts[5] = c.create(r + h[m].x, a), this.fPts[6] = c.create(r, a - h[m].y), this.fPts[7] = c.create(r, l + h[u].y);
  }
}
function Ks(i, t, e) {
  const s = e.getFillType();
  let n = e.isInverseFillType();
  if (e.countVerbs() <= 0 || !e.getBounds().containPoint(i, t))
    return n;
  let l = new qs(e, !0), o = !1, a = 0, h = N.from(0), u = [c.default(), c.default(), c.default(), c.default()];
  do
    switch (l.next(u)) {
      case R.kMoveTo:
      case R.kClose:
        break;
      case R.kLineTo:
        a += Bs(u, i, t, h);
        break;
      case R.kQuadCurveTo:
        a += Ys(u, i, t, h);
        break;
      case R.kConicTo:
        break;
      case R.kCubicCurveTo:
        a += Ds(u, i, t, h);
        break;
      case R.kDone:
        o = !0;
        break;
    }
  while (!o);
  let f = dt.kEvenOdd == s || dt.kInverseEvenOdd == s;
  if (f && (a &= 1), a)
    return !n;
  if (h.value <= 1)
    return !!(Number(h.value) ^ Number(n));
  if (h.value & 1 || f)
    return !!(Number(h.value & 1) ^ Number(n));
  l.setPath(e, !0), o = !1;
  let y = [];
  do {
    let m = y.length;
    switch (l.next(u)) {
      case R.kMoveTo:
      case R.kClose:
        break;
      case R.kLineTo:
        Xs(u, i, t, y);
        break;
      case R.kQuadCurveTo:
        js(u, i, t, y);
        break;
      case R.kConicTo:
        break;
      case R.kCubicCurveTo:
        Zs(u, i, t, y);
        break;
      case R.kDone:
        o = !0;
        break;
    }
    if (y.length > m) {
      let k = y.length - 1;
      const p = y[k];
      if (st(p.dot(p)))
        y.splice(k, 1);
      else
        for (let b = 0; b < k; ++b) {
          const d = y[b];
          if (st(d.cross(p)) && De(p.x * d.x) <= 0 && De(p.y * d.y) <= 0) {
            y.splice(k, 1), y.splice(b, 1, y[y.length]);
            break;
          }
        }
    }
  } while (!o);
  return Number(y.length ^ Number(n));
}
var Js = /* @__PURE__ */ ((i) => (i.Miter = "miter", i.Round = "round", i.Bevel = "bevel", i.MiterClip = "miter-clip", i))(Js || {}), $s = /* @__PURE__ */ ((i) => (i.Butt = "butt", i.Round = "round", i.Square = "square", i))($s || {}), Gs = /* @__PURE__ */ ((i) => (i.NonZero = "nonzero", i.EvenOdd = "evenodd", i))(Gs || {});
class Ne {
  constructor(t) {
    x(this, "isAutoClose", !1);
    x(this, "path");
    x(this, "verbIndex");
    x(this, "pointsIndex");
    x(this, "lastMoveTo", c.default());
    x(this, "lastPoint", c.default());
    this.isAutoClose = t.isAutoClose ?? !1, this.verbIndex = t.verbIndex, this.pointsIndex = t.pointsIndex, this.path = t.path, t.lastMoveTo && this.lastMoveTo.copy(t.lastMoveTo), t.lastPoint && this.lastPoint.copy(t.lastPoint);
  }
  get curVerb() {
    return this.path.fVerbs[this.verbIndex - 1];
  }
  get nextVerb() {
    return this.path.fVerbs[this.verbIndex];
  }
  copy(t) {
    return this.isAutoClose = t.isAutoClose, this.verbIndex = t.verbIndex, this.pointsIndex = t.pointsIndex, this.lastMoveTo.copy(t.lastMoveTo), this.lastPoint.copy(t.lastPoint), this;
  }
  clone() {
    return new Ne({
      isAutoClose: this.isAutoClose,
      path: this.path,
      verbIndex: this.verbIndex,
      pointsIndex: this.pointsIndex,
      lastMoveTo: this.lastMoveTo,
      lastPoint: this.lastPoint
    });
  }
  *[Symbol.iterator]() {
    const t = this.path.fPts.map((n) => c.fromPoint(n)), e = this.path.fVerbs;
    let s = null;
    for (; this.verbIndex < e.length; ) {
      const n = e[this.verbIndex++];
      switch (n) {
        case g.kMove:
          this.pointsIndex += 1, s = t[this.pointsIndex - 1], this.lastMoveTo.copy(s), this.lastPoint.copy(this.lastMoveTo), yield { type: n, p0: t[this.pointsIndex - 1] };
          break;
        case g.kLine:
          this.pointsIndex += 1, this.lastPoint.copy(t[this.pointsIndex - 1]), yield { type: n, p0: t[this.pointsIndex - 1] };
          break;
        case g.kQuad:
          this.pointsIndex += 2, this.lastPoint.copy(t[this.pointsIndex - 1]), yield { type: n, p0: t[this.pointsIndex - 3], p1: t[this.pointsIndex - 2], p2: t[this.pointsIndex - 1] };
          break;
        case g.kCubic:
          this.pointsIndex += 3, this.lastPoint.copy(t[this.pointsIndex - 1]), yield { type: n, p0: t[this.pointsIndex - 4], p1: t[this.pointsIndex - 3], p2: t[this.pointsIndex - 2], p3: t[this.pointsIndex - 1] };
          break;
        case g.kClose:
          const r = this.autoClose();
          this.lastPoint.copy(this.lastMoveTo), yield r;
          break;
      }
    }
  }
  hasValidTangent() {
    let t = this.clone();
    for (let e of t)
      switch (e.type) {
        case g.kMove:
          return !1;
        case g.kLine: {
          if (t.lastPoint.equals(e.p0))
            continue;
          return !0;
        }
        case g.kQuad: {
          if (t.lastPoint.equals(e.p1) && t.lastPoint.equals(e.p2))
            continue;
          return !0;
        }
        case g.kCubic: {
          if (t.lastPoint.equals(e.p1) && t.lastPoint.equals(e.p2) && t.lastPoint.equals(e.p3))
            continue;
          return !0;
        }
        case g.kClose:
          return !1;
      }
    return !1;
  }
  setAutoClose(t) {
    this.isAutoClose = t;
  }
  autoClose() {
    return this.isAutoClose && !this.lastPoint.equals(this.lastMoveTo) ? (this.verbIndex -= 1, {
      type: g.kLine,
      p0: this.lastMoveTo
    }) : {
      type: g.kClose,
      p0: this.lastPoint,
      p1: this.lastMoveTo
    };
  }
}
class tn {
  constructor(t, e) {
    this.inner = t, this.outer = e;
  }
  swap() {
    [this.inner, this.outer] = [this.outer, this.inner];
  }
}
const Pe = 0.707106781, Se = (i, t, e, s, n) => {
  n.lineTo(e.x, e.y);
}, en = (i, t, e, s, n) => {
  let r = t.clone();
  r.cw();
  let l = i.clone().add(r), o = l.clone().add(t);
  n.conicTo(
    o.x,
    o.y,
    l.x,
    l.y,
    Pe
  ), o.copy(l).subtract(t), n.conicTo(
    o.x,
    o.y,
    e.x,
    e.y,
    Pe
  );
}, sn = (i, t, e, s, n) => {
  let r = t.clone();
  r.cw(), s ? (n.setLastPoint(
    i.x + t.x + r.x,
    i.y + t.y + r.y
  ), n.lineTo(
    i.x - t.x + r.x,
    i.y - t.y + r.y
  )) : (n.lineTo(
    i.x + t.x + r.x,
    i.y + t.y + r.y
  ), n.lineTo(
    i.x - t.x + r.x,
    i.y - t.y + r.y
  ), n.lineTo(e.x, e.y));
};
function ai(i) {
  return Math.abs(i) <= We;
}
function Wi(i) {
  return i >= 0 ? ai(1 - i) ? 3 : 2 : ai(1 + i) ? 0 : 1;
}
function Ae(i, t) {
  return i.x * t.y > i.y * t.x;
}
function le(i, t, e) {
  e.lineTo(i.x, i.y), e.lineTo(i.x - t.x, i.y - t.y);
}
const Fi = (i, t, e, s, n, r, l, o, a) => {
  function h(_, v, M, P, E, L, I, C, O, rt) {
    if (C = C.clone(), C.multiplyScalar(M), I = I.clone(), L = L.clone(), rt) {
      I.normalize();
      let lt = L.dot(I), H = L.cross(I), j = 0;
      Math.abs(H) <= We ? j = 1 / O : j = (1 / O - lt) / H, L.multiplyScalar(M);
      let ot = L.clone();
      ot.cw();
      let _t = C.clone();
      _t.ccw();
      let V = c.default();
      V.addVectors(v, L).add(ot.clone().multiplyScalar(j));
      let Et = c.default();
      V.addVectors(v, C).add(_t.clone().multiplyScalar(j)), P ? _.outer.setLastPoint(V.x, V.y) : _.outer.lineTo(V.x, V.y), _.outer.lineTo(Et.x, Et.y);
    }
    E || _.outer.lineTo(v.x + C.x, v.y + C.y), le(v, C, _.inner);
  }
  function u(_, v, M, P, E, L, I) {
    I = I.clone(), I.multiplyScalar(M), P ? _.outer.setLastPoint(v.x + L.x, v.y + L.y) : _.outer.lineTo(v.x + L.x, v.y + L.y), E || _.outer.lineTo(v.x + I.x, v.y + I.y), le(v, I, _.inner);
  }
  let f = i.dot(e), y = Wi(f), m = i.clone(), k = e.clone(), p = c.default();
  if (y == 3)
    return;
  if (y == 0) {
    o = !1, p.subtractVectors(k, m).multiplyScalar(s / 2), h(
      a,
      t,
      s,
      l,
      o,
      m,
      p,
      k,
      n,
      r
    );
    return;
  }
  let b = !Ae(m, k);
  if (b && (a.swap(), m.negate(), k.negate()), f == 0 && n <= Pe) {
    p.addVectors(m, k).multiplyScalar(s), u(
      a,
      t,
      s,
      l,
      o,
      p,
      k
    );
    return;
  }
  y == 1 ? (p = c.create(k.y - m.y, m.x - k.x), b && p.negate()) : p = c.create(m.x + k.x, m.y + k.y);
  let d = Math.sqrt((1 + f) / 2);
  if (d < n) {
    o = !1, h(
      a,
      t,
      s,
      l,
      o,
      m,
      p,
      k,
      n,
      r
    );
    return;
  }
  p.setLength(s / d), u(
    a,
    t,
    s,
    l,
    o,
    p,
    k
  );
}, nn = (i, t, e, s, n, r, l, o) => {
  let a = e.clone().multiplyScalar(s);
  Ae(i, e) || (o.swap(), a.negate()), o.outer.lineTo(t.x + a.x, t.y + a.y), le(t, a, o.inner);
}, rn = (i, t, e, s, n, r, l, o) => Fi(i, t, e, s, n, !1, r, l, o), ln = (i, t, e, s, n, r, l, o) => {
  Fi(
    i,
    t,
    e,
    s,
    n,
    !0,
    r,
    l,
    o
  );
}, Ce = (i, t, e, s, n, r, l, o) => {
  let a = i.dot(e);
  if (Wi(a) == 3)
    return;
  let u = i.clone(), f = e.clone(), y = A.kCW;
  Ae(u, f) || (o.swap(), u.negate(), f.negate(), y = A.kCCW);
  let m = ht.fromRows(s, 0, 0, s, t.x, t.y), k = new Array(5).fill(0).map(() => new z()), p = z.BuildUnitArc(u, f, y, m, k);
  if (p > 0) {
    k = k.slice(0, p);
    for (let b of k)
      o.outer.conicTo(b.fPts[1], b.fPts[2], b.fW);
    f.multiplyScalar(s), le(t, f, o.inner);
  }
};
function hi(i, t, e, s, n, r) {
  return r.setLengthFrom((t.x - i.x) * e, (t.y - i.y) * e, 1) ? (r.ccw(), n.copy(r).multiplyScalar(s), !0) : !1;
}
function on(i, t, e, s) {
  return s.setLengthFrom(i.x, i.y, 1) ? (s.ccw(), e.copy(s).multiplyScalar(t), !0) : !1;
}
class Ht {
  constructor() {
    // The state of the quad stroke under construction.
    x(this, "quad", [c.default(), c.default(), c.default()]);
    // the stroked quad parallel to the original curve
    x(this, "tangent_start", c.default());
    // a point tangent to quad[0]
    x(this, "tangent_end", c.default());
    // a point tangent to quad[2]
    x(this, "start_t", 0);
    // a segment of the original curve
    x(this, "mid_t", 0);
    x(this, "end_t", 0);
    x(this, "start_set", !1);
    // state to share common points across structs
    x(this, "end_set", !1);
    x(this, "opposite_tangents", !1);
  }
  static default() {
    return new this();
  }
  // set if coincident tangents have opposite directions
  init(t, e) {
    return this.start_t = t, this.mid_t = Math.min(1, Math.max(0, (t + e) / 2)), this.end_t = e, this.start_set = !1, this.end_set = !1, this.start_t < this.mid_t && this.mid_t < this.end_t;
  }
  initWithStart(t) {
    const e = this;
    return e.init(t.start_t, t.mid_t) ? (e.quad[0].copy(t.quad[0]), e.tangent_start.copy(t.tangent_start), e.start_set = !0, !0) : !1;
  }
  initWithEnd(t) {
    const e = this;
    return e.init(t.mid_t, t.end_t) ? (e.quad[2].copy(t.quad[2]), e.tangent_end.copy(t.tangent_end), e.end_set = !0, !0) : !1;
  }
}
function an(i) {
  let t = it(i[1].clone().sub(i[0])), e = it(i[2].clone().sub(i[1]));
  if (t & e)
    return [
      c.default(),
      0
      /* Point */
    ];
  if (t | e)
    return [
      c.default(),
      1
      /* Line */
    ];
  if (!hn(i))
    return [
      c.default(),
      2
      /* Quad */
    ];
  let s = ps(i);
  return s == 0 || s == 1 ? [
    c.default(),
    1
    /* Line */
  ] : [
    Rt(i, s),
    3
    /* Degenerate */
  ];
}
function it(i) {
  return +!i.canNormalize();
}
function hn(i) {
  let t = -1, e = 0, s = 0;
  for (let o = 0; o < 2; o++)
    for (let a = o + 1; a < 3; a++) {
      let h = i[a].clone().sub(i[o]), u = Math.max(Math.abs(h.x), Math.abs(h.y));
      t < u && (e = o, s = a, t = u);
    }
  console.assert(e <= 1), console.assert(s >= 1 && s <= 2), console.assert(e < s);
  let n = e ^ s ^ 3, l = t * t * 5e-6;
  return It(i[n], i[e], i[s]) <= l;
}
function It(i, t, e) {
  let s = e.clone().sub(t), n = i.clone().sub(t), r = s.dot(n), l = s.dot(s), o = r / l;
  return o >= 0 && o <= 1 ? c.create(
    t.x * (1 - o) + e.x * o,
    t.y * (1 - o) + e.y * o
  ).distanceToSquared(i) : i.distanceToSquared(t);
}
function un(i, t, e) {
  let s = i[1].clone().sub(i[0]), n = [0, 0, 0];
  for (let h = 0; h < 3; h++)
    n[h] = (t[h].y - i[0].y) * s.x - (t[h].x - i[0].x) * s.y;
  let r = n[2], l = n[1], o = n[0];
  r += o - 2 * l, l -= o;
  let a = nt(r, 2 * l, o, F.from(e));
  return e.slice(0, a);
}
function ge(i, t, e) {
  return i.distanceToSquared(t) <= e * e;
}
function ui(i) {
  let t = i[1].clone().sub(i[0]), e = i[1].clone().sub(i[2]), s = t.lengthSquared(), n = e.lengthSquared();
  return s > n && ([t, e] = [e, t], n = s), t.setLength(n) ? t.dot(e) > 0 : !1;
}
function fn(i, t, e) {
  let s = Math.min(i[0].x, i[1].x, i[2].x);
  if (t.x + e < s)
    return !1;
  let n = Math.max(i[0].x, i[1].x, i[2].x);
  if (t.x - e > n)
    return !1;
  let r = Math.min(i[0].y, i[1].y, i[2].y);
  if (t.y + e < r)
    return !1;
  let l = Math.max(i[0].y, i[1].y, i[2].y);
  return !(t.y - e > l);
}
function cn(i, t, e) {
  let s = it(i[1].clone().sub(i[0])), n = it(i[2].clone().sub(i[1])), r = it(i[3].clone().sub(i[2]));
  if (s & n & r)
    return 0;
  if (s + n + r == 2)
    return 1;
  if (!mn(i))
    return e && (s ? e.copy(i[2]) : e.copy(i[1])), 2;
  let l = [0, 0, 0], o = Ci(i, l), a = 0;
  l = l.slice(0, o);
  for (let h of l) {
    if (0 >= h || h >= 1)
      continue;
    let u = se(i, h);
    t[a] = c.create(u.x, u.y), !t[a].equals(i[0]) && !t[a].equals(i[3]) && (a += 1);
  }
  switch (a) {
    case 0:
      return 1;
    case 1:
      return 1;
    case 2:
      return 4;
    case 3:
      return 5;
    default:
      return -1;
  }
}
function mn(i) {
  let t = -1, e = 0, s = 0;
  for (let o = 0; o < 3; o++)
    for (let a = o + 1; a < 4; a++) {
      let h = i[a].clone().sub(i[o]), u = Math.max(Math.abs(h.x), Math.abs(h.y));
      t < u && (e = o, s = a, t = u);
    }
  let n = 1 + (2 >> s) >> e, r = e ^ s ^ n, l = t * t * 1e-5;
  return It(i[n], i[e], i[s]) <= l && It(i[r], i[e], i[s]) <= l;
}
const yn = {
  bevel: nn,
  miter: rn,
  "miter-clip": ln,
  round: Ce
}, dn = {
  butt: Se,
  round: en,
  square: sn
}, pn = 3, fi = [15, 78, 33, 33], We = 1 / 4096;
class _r {
  constructor() {
    x(this, "radius", 0);
    // 线段宽的一半
    x(this, "inv_miter_limit", 0);
    // 1/miter_limit
    x(this, "res_scale", 1);
    // 分辨率缩放因子
    x(this, "inv_res_scale", 1);
    // 分辨率缩放因子的倒数
    x(this, "inv_res_scale_squared", 1);
    // 分辨率缩放因子的倒数平方
    x(this, "first_normal", c.default());
    // Move->LineTo 旋转-90法向量剩以radius
    x(this, "prev_normal", c.default());
    // 上一个LineTo->lineTo点旋转-90法向量剩以radius
    x(this, "first_unit_normal", c.default());
    // Move->LineTo 线段的，旋转-90度的单位法向量
    x(this, "prev_unit_normal", c.default());
    // 上一个lineTo->LineTo点旋转-90度的单位法向量
    x(this, "first_pt", c.default());
    // moveTo点
    x(this, "prev_pt", c.default());
    // 上一个lineTo点
    x(this, "first_outer_pt", c.default());
    // 第一个线段的外侧点
    x(this, "first_outer_pt_index_in_contour", 0);
    // 第一个线段的外侧点在轮廓中的索引
    x(this, "segment_count", -1);
    // 从MoveTo线段计数
    x(this, "prev_is_line", !1);
    // 上一个绘制命令是否是lineTo
    x(this, "capper");
    x(this, "joiner");
    x(this, "inner", wt.default());
    x(this, "outer", wt.default());
    x(this, "cusper", wt.default());
    x(this, "stroke_type", 1);
    // 线段类型
    x(this, "recursion_depth", 0);
    // 递归深度
    x(this, "found_tangents", !1);
    // 是否找到切线
    x(this, "join_completed", !1);
  }
  static computeResolutionScale(t) {
    let e = c.create(t.a, t.b).length(), s = c.create(t.c, t.d).length();
    if (Number.isFinite(e) && Number.isFinite(s)) {
      let n = Math.max(e, s);
      if (n > 0)
        return n;
    }
    return 1;
  }
  // 是否完成连接
  get moveToPt() {
    return this.first_pt;
  }
  builders() {
    return new tn(this.inner, this.outer);
  }
  close(t) {
    this.finishContour(!0, t);
  }
  moveTo(t) {
    this.segment_count > 0 && this.finishContour(!1, !1), this.segment_count = 0, this.first_pt.copy(t), this.prev_pt.copy(t), this.join_completed = !1;
  }
  finishContour(t, e) {
    const s = this;
    if (s.segment_count > 0) {
      if (t) {
        s.joiner(
          s.prev_unit_normal,
          s.prev_pt,
          s.first_unit_normal,
          s.radius,
          s.inv_miter_limit,
          s.prev_is_line,
          e,
          s.builders()
        ), s.outer.close();
        let n = s.inner.lastPoint ?? c.create(0, 0);
        s.outer.moveTo(n.x, n.y), s.outer.reversePathTo(s.inner), s.outer.close();
      } else {
        let n = s.inner.lastPoint ? c.fromPoint(s.inner.lastPoint) : c.create(0, 0), r = e ? s.inner : null;
        s.capper(
          s.prev_pt,
          s.prev_normal,
          n,
          r,
          s.outer
        ), s.outer.reversePathTo(s.inner), r = s.prev_is_line ? s.inner : null, s.capper(
          s.first_pt,
          s.first_normal.clone().negate(),
          s.first_outer_pt,
          r,
          s.outer
        ), s.outer.close();
      }
      s.cusper.isEmpty || (s.outer.addPath(s.cusper), s.cusper.reset());
    }
    s.inner.reset(), s.segment_count = -1, s.first_outer_pt_index_in_contour = s.outer.fPts.length;
  }
  preJoinTo(t, e, s, n) {
    const r = this;
    let l = r.prev_pt.x, o = r.prev_pt.y;
    if (!hi(
      r.prev_pt,
      t,
      r.res_scale,
      r.radius,
      s,
      n
    )) {
      if (r.capper === Se)
        return !1;
      s.set(r.radius, 0), n.set(1, 0);
    }
    return r.segment_count == 0 ? (r.first_normal.copy(s), r.first_unit_normal.copy(n), r.first_outer_pt = c.create(l + s.x, o + s.y), r.outer.moveTo(r.first_outer_pt.x, r.first_outer_pt.y), r.inner.moveTo(l - s.x, o - s.y)) : r.joiner(
      r.prev_unit_normal,
      r.prev_pt,
      n,
      r.radius,
      r.inv_miter_limit,
      r.prev_is_line,
      e,
      r.builders()
    ), r.prev_is_line = e, !0;
  }
  postJoinTo(t, e, s) {
    this.join_completed = !0, this.prev_pt.copy(t), this.prev_unit_normal.copy(s), this.prev_normal.copy(e), this.segment_count += 1;
  }
  initQuad(t, e, s, n) {
    this.stroke_type = t, this.found_tangents = !1, n.init(e, s);
  }
  quadStroke(t, e) {
    let s = this, n = s.compareQuadQuad(t, e);
    if (n == 2)
      return (s.stroke_type == 1 ? s.outer : s.inner).quadTo(
        e.quad[1].x,
        e.quad[1].y,
        e.quad[2].x,
        e.quad[2].y
      ), !0;
    if (n == 1)
      return s.addDegenerateLine(e), !0;
    if (s.recursion_depth += 1, s.recursion_depth > fi[pn])
      return !1;
    let r = Ht.default();
    return r.initWithStart(e), !s.quadStroke(t, r) || (r.initWithEnd(e), !s.quadStroke(t, r)) ? !1 : (s.recursion_depth -= 1, !0);
  }
  compareQuadQuad(t, e) {
    const s = this;
    if (!e.start_set) {
      let o = c.zero();
      s.quadPerpRay(
        t,
        e.start_t,
        o,
        e.quad[0],
        e.tangent_start
      ), e.start_set = !0;
    }
    if (!e.end_set) {
      let o = c.zero();
      s.quadPerpRay(
        t,
        e.end_t,
        o,
        e.quad[2],
        e.tangent_end
      ), e.end_set = !0;
    }
    let n = s.intersectRay(0, e);
    if (n != 2)
      return n;
    let r = c.zero(), l = c.zero();
    return s.quadPerpRay(t, e.mid_t, l, r), s.strokeCloseEnough(e.quad.slice(), [r, l], e);
  }
  // Given a point on the curve and its derivative, scale the derivative by the radius, and
  // compute the perpendicular point and its tangent.
  setRayPoints(t, e, s, n) {
    const r = this;
    e.setLength(r.radius) || e.copy(c.create(r.radius, 0));
    let l = r.stroke_type;
    s.x = t.x + l * e.y, s.y = t.y - l * e.x, n && (n.x = s.x + e.x, n.y = s.y + e.y);
  }
  // Given a quad and t, return the point on curve,
  // its perpendicular, and the perpendicular tangent.
  quadPerpRay(t, e, s, n, r) {
    let l = this, o = Rt(t, e);
    s.set(o.x, o.y), o = Ie(t, e);
    let a = c.create(o.x, o.y);
    a.isZero() && (a = t[2].sub(t[0])), l.setRayPoints(s, a, n, r);
  }
  strokeCloseEnough(t, e, s) {
    const n = this;
    let l = Rt(t, 0.5);
    if (ge(e[0], c.create(l.x, l.y), n.inv_res_scale))
      return ui(s.quad) ? 0 : 2;
    if (!fn(t, e[0], n.inv_res_scale))
      return 0;
    let o = new Array(3).fill(0.5);
    if (o = un(e, t, o), o.length != 1)
      return 0;
    let a = Rt(t, o[0]), h = n.inv_res_scale * (1 - Math.abs(o[0] - 0.5) * 2);
    return ge(e[0], c.create(a.x, a.y), h) ? ui(s.quad) ? 0 : 2 : 0;
  }
  // Find the intersection of the stroke tangents to construct a stroke quad.
  // Return whether the stroke is a degenerate (a line), a quad, or must be split.
  // Optionally compute the quad's control point.
  intersectRay(t, e) {
    const s = this;
    let n = e.quad[0], r = e.quad[2], l = e.tangent_start.clone().sub(n), o = e.tangent_end.clone().sub(r), a = l.cross(o);
    if (a == 0 || !Number.isFinite(a))
      return e.opposite_tangents = l.dot(o) < 0, 1;
    e.opposite_tangents = !1;
    let h = n.clone().sub(r), u = o.cross(h), f = l.cross(h);
    if (u >= 0 == f >= 0) {
      let m = It(n, r, e.tangent_end), k = It(r, n, e.tangent_start);
      return Math.max(m, k) <= s.inv_res_scale_squared ? 1 : 0;
    }
    return u /= a, u > u - 1 ? (t == 0 && (e.quad[1].x = n.x * (1 - u) + e.tangent_start.x * u, e.quad[1].y = n.y * (1 - u) + e.tangent_start.y * u), 2) : (e.opposite_tangents = l.dot(o) < 0, 1);
  }
  addDegenerateLine(t) {
    const e = this;
    e.stroke_type == 1 ? e.outer.lineTo(t.quad[2].x, t.quad[2].y) : e.inner.lineTo(t.quad[2].x, t.quad[2].y);
  }
  setCubicEndNormal(t, e, s, n, r) {
    let l = this, o = t[1].clone().sub(t[0]), a = t[3].clone().sub(t[2]), h = it(o), u = it(a);
    if (h && u) {
      n.copy(e), r.copy(s);
      return;
    }
    if (h && (o = t[2].clone().sub(t[0]), h = it(o)), u && (a = t[3].clone().sub(t[1]), u = it(a)), h || u) {
      n.copy(e), r.copy(s);
      return;
    }
    return on(a, l.radius, n, r);
  }
  lineTo(t, e) {
    const s = this;
    let n = s.prev_pt.equalsEpsilon(t, We * s.inv_res_scale);
    if (s.capper, Se && n || n && (s.join_completed || e && e.hasValidTangent()))
      return;
    let r = c.default(), l = c.default();
    s.preJoinTo(t, !0, r, l) && (s.outer.lineTo(t.x + r.x, t.y + r.y), s.inner.lineTo(t.x - r.x, t.y - r.y), s.postJoinTo(t, r, l));
  }
  quadraticCurveTo(t, e) {
    const s = this;
    let n = [s.prev_pt, t, e], [r, l] = an(n);
    if (l == 0) {
      s.lineTo(e);
      return;
    }
    if (l == 1) {
      s.lineTo(e);
      return;
    }
    if (l == 3) {
      s.lineTo(r);
      let m = s.joiner;
      s.joiner = Ce, s.lineTo(e), s.joiner = m;
      return;
    }
    let o = c.default(), a = c.default(), h = c.default(), u = c.default();
    if (!s.preJoinTo(t, !1, o, a)) {
      s.lineTo(e);
      return;
    }
    let f = Ht.default();
    s.initQuad(
      1,
      0,
      1,
      f
    ), s.quadStroke(n, f), s.initQuad(
      -1,
      0,
      1,
      f
    ), s.quadStroke(n, f), hi(
      n[1],
      n[2],
      s.res_scale,
      s.radius,
      h,
      u
    ) || (h = o, u = a), s.postJoinTo(e, h, u);
  }
  bezierCurveTo(t, e, s) {
    const n = this;
    let r = [n.prev_pt, t, e, s], l = Array.from({ length: 3 }, () => c.zero()), o = c.zero(), a = cn(r, l, o);
    if (a == 0) {
      n.lineTo(s);
      return;
    }
    if (a == 1) {
      n.lineTo(s);
      return;
    }
    if (3 <= a && 5 >= a) {
      n.lineTo(l[0]);
      let d = n.joiner;
      n.joiner = Ce, 4 <= a && n.lineTo(l[1]), a == 5 && n.lineTo(l[2]), n.lineTo(s), n.joiner = d;
      return;
    }
    let h = c.zero(), u = c.zero(), f = c.zero(), y = c.zero();
    if (!n.preJoinTo(o, !1, h, u)) {
      n.lineTo(s);
      return;
    }
    let m = new Array(3).fill(0.5), k = _s(r, m);
    m = m.slice(0, k);
    let p = 0;
    for (let d = 0, _ = m.length; d <= _; d++) {
      let v = Number.isFinite(m[d]) ? m[d] : 1, M = Ht.default();
      n.initQuad(1, p, v, M), n.cubicStroke(r, M), n.initQuad(-1, p, v, M), n.cubicStroke(r, M), p = v;
    }
    let b = Cs(r);
    if (b) {
      let d = se(r, b);
      n.cusper.addCircle(d.x, d.y, n.radius);
    }
    n.setCubicEndNormal(r, h, u, f, y), n.postJoinTo(s, f, y);
  }
  cubicStroke(t, e) {
    const s = this;
    if (!s.found_tangents) {
      let r = s.tangentsMeet(t, e);
      if (r != 2) {
        let l = ge(
          e.quad[0],
          e.quad[2],
          s.inv_res_scale
        );
        if ((r == 1 || l) && s.cubicMidOnLine(t, e))
          return s.addDegenerateLine(e), !0;
      } else
        s.found_tangents = !0;
    }
    if (s.found_tangents) {
      let r = s.compareQuadCubic(t, e);
      if (r == 2) {
        let l = e.quad;
        return s.stroke_type == 1 ? s.outer.quadTo(l[1].x, l[1].y, l[2].x, l[2].y) : s.inner.quadTo(l[1].x, l[1].y, l[2].x, l[2].y), !0;
      }
      if (r == 1 && !e.opposite_tangents)
        return s.addDegenerateLine(e), !0;
    }
    if (!Number.isFinite(e.quad[2].x) || !Number.isFinite(e.quad[2].x) || (s.recursion_depth += 1, s.recursion_depth > fi[Number(s.found_tangents)]))
      return !1;
    let n = Ht.default();
    return n.initWithStart(e) ? s.cubicStroke(t, n) ? n.initWithEnd(e) ? s.cubicStroke(t, n) ? (s.recursion_depth -= 1, !0) : !1 : (s.addDegenerateLine(e), s.recursion_depth -= 1, !0) : !1 : (s.addDegenerateLine(e), s.recursion_depth -= 1, !0);
  }
  cubicMidOnLine(t, e) {
    let s = this, n = c.zero();
    return s.cubicQuadMid(t, e, n), It(n, e.quad[0], e.quad[2]) < s.inv_res_scale_squared;
  }
  cubicQuadMid(t, e, s) {
    let n = c.zero();
    this.cubicPerpRay(t, e.mid_t, n, s);
  }
  compareQuadCubic(t, e) {
    let s = this;
    s.cubicQuadEnds(t, e);
    let n = s.intersectRay(0, e);
    if (n != 2)
      return n;
    let r = c.zero(), l = c.zero();
    return s.cubicPerpRay(t, e.mid_t, l, r), s.strokeCloseEnough(e.quad.slice(), [r, l], e);
  }
  // Given a cubic and a t range, find the start and end if they haven't been found already.
  cubicQuadEnds(t, e) {
    const s = this;
    if (!e.start_set) {
      let n = c.zero();
      s.cubicPerpRay(
        t,
        e.start_t,
        n,
        e.quad[0],
        e.tangent_start
      ), e.start_set = !0;
    }
    if (!e.end_set) {
      let n = c.zero();
      s.cubicPerpRay(
        t,
        e.end_t,
        n,
        e.quad[2],
        e.tangent_end
      ), e.end_set = !0;
    }
  }
  tangentsMeet(t, e) {
    return this.cubicQuadEnds(t, e), this.intersectRay(1, e);
  }
  // Given a cubic and t, return the point on curve,
  // its perpendicular, and the perpendicular tangent.
  cubicPerpRay(t, e, s, n, r) {
    let l = this;
    s.copy(se(t, e));
    let o = vi(t, e), a = Array.from({ length: 7 }, () => c.zero());
    if (o.x == 0 && o.y == 0) {
      let h = t;
      st(e) ? o = t[2].clone().sub(t[0]) : st(1 - e) ? o = t[3].clone().sub(t[1]) : (ae(t, a, e), o = a[3].clone().sub(a[2]), o.x == 0 && o.y == 0 && (o = a[3].clone().sub(a[1]), h = a)), o.x == 0 && o.y == 0 && (o = h[3].clone().sub(h[0]));
    }
    l.setRayPoints(s, o, n, r);
  }
  stroke(t, e) {
    return this.strokeInner(t, e.strokeWidth, e.miterLimit, e.lineCap, e.lineJoin, this.res_scale);
  }
  strokeInner(t, e, s, n, r, l) {
    const o = this;
    let a = 0;
    r == "miter" && (s <= 1 ? r = "bevel" : a = 1 / s), r == "miter-clip" && (a = 1 / s), o.res_scale = l, o.inv_res_scale = 1 / (l * 4), o.inv_res_scale_squared = o.inv_res_scale ** 2, o.radius = e * 0.5, o.inv_miter_limit = a, o.first_normal = c.default(), o.prev_normal = c.default(), o.first_unit_normal = c.default(), o.prev_unit_normal = c.default(), o.first_pt = c.default(), o.prev_pt = c.default(), o.first_outer_pt = c.default(), o.first_outer_pt_index_in_contour = 0, o.segment_count = -1, o.prev_is_line = !1, o.capper = dn[n], o.joiner = yn[r], o.inner.reset(), o.outer.reset(), o.cusper.reset(), o.stroke_type = 1, o.recursion_depth = 0, o.found_tangents = !1, o.join_completed = !1;
    let h = !1, u = new Ne({
      path: t,
      verbIndex: 0,
      pointsIndex: 0,
      isAutoClose: !0
    });
    u.setAutoClose(!0);
    for (let f of u)
      switch (f.type) {
        case g.kMove:
          o.moveTo(f.p0);
          break;
        case g.kLine:
          o.lineTo(f.p0, u), h = !0;
          break;
        case g.kQuad:
          o.quadraticCurveTo(f.p1, f.p2), h = !1;
          break;
        case g.kCubic:
          o.bezierCurveTo(f.p1, f.p2, f.p3), h = !1;
          break;
        case g.kClose:
          if (n != "butt") {
            if (o.hasOnlyMoveTo()) {
              o.lineTo(o.moveToPt), h = !0;
              continue;
            }
            if (o.isCurrentContourEmpty()) {
              h = !0;
              continue;
            }
          }
          o.close(h);
          break;
      }
    return o.finish(h);
  }
  finish(t) {
    return this.finishContour(!1, t), this.outer.clone();
  }
  hasOnlyMoveTo() {
    return this.segment_count == 0;
  }
  isCurrentContourEmpty() {
    return this.inner.isZeroLengthSincePoint(0) && this.outer.isZeroLengthSincePoint(this.first_outer_pt_index_in_contour);
  }
}
const xn = (i, t) => i[0] * t[0] + i[1] * t[1], kn = (i, t) => i[0] * t[1] - i[1] * t[0], ci = (i, t) => Math.atan2(kn(i, t), xn(i, t));
function bn(i, t, e, s, n, r, l, o, a) {
  let h = Math.cos(a), u = Math.sin(a), f = h * (i - e) / 2 + u * (t - s) / 2, y = -u * (i - e) / 2 + h * (t - s) / 2, m = f * f / (l * l) + y * y / (o * o);
  m > 1 && (m = Math.sqrt(m), l *= m, o *= m);
  let k = n !== r ? 1 : -1, p = (l * l * o * o - l * l * y * y - o * o * f * f) / (l * l * y * y + o * o * f * f);
  p < 0 ? p = 0 : p = Math.sqrt(p);
  let b = k * p * (l * y / o), d = k * p * (-o * f / l), _ = h * b - u * d + (i + e) / 2, v = u * b + h * d + (t + s) / 2, M = ci([1, 0], [(f - b) / l, (y - d) / o]), P = ci([(f - b) / l, (y - d) / o], [(-f - b) / l, (-y - d) / o]);
  !r && P > 0 ? P -= Math.PI * 2 : r && P < 0 && (P += Math.PI * 2);
  let E = M + P;
  return {
    rx: l,
    ry: o,
    cx: _,
    cy: v,
    theta1: M,
    // 是拉伸和旋转操作之前椭圆弧的起始角度。
    theta2: E,
    // 是拉伸和旋转操作之前椭圆弧的终止角度。
    dtheta: P
    // 是这两个角度之间的差值。
  };
}
function gn(i, t, e, s, n, r, l) {
  const o = l - r, a = 4 / 3 * Math.tan(o / 4), h = c.fromRotation(r), u = c.fromRotation(l), f = c.fromPoint(h), y = c.fromPoint(u);
  return f.translate(-a * h.y, a * h.x), y.translate(a * u.y, -a * u.x), h.scale(e, s).rotate(n).translate(i, t), f.scale(e, s).rotate(n).translate(i, t), y.scale(e, s).rotate(n).translate(i, t), u.scale(e, s).rotate(n).translate(i, t), [h.x, h.y, f.x, f.y, y.x, y.y, u.x, u.y];
}
function _n(i, t, e, s, n, r, l, o, a, h) {
  const { cx: u, cy: f, theta1: y, dtheta: m, rx: k, ry: p } = bn(i, t, e, s, o, a, n, r, l), b = Math.ceil(Math.abs(m / (Math.PI / 2))), d = m / b, _ = [];
  let v = y;
  for (let M = 0; M < b; M++) {
    const P = v + d;
    let [E, L, I, C, O, rt, lt, H] = gn(u, f, k, p, l, v, P);
    h == null || h(E, L, I, C, O, rt, lt, H, M), v = P, _.push(E, L, I, C, O, rt, lt, H);
  }
  return _;
}
const mi = {
  M: 1,
  L: 2,
  H: 1,
  V: 1,
  C: 6,
  S: 4,
  Q: 4,
  T: 2,
  A: 7,
  Z: 0
}, yi = new Set(Object.keys(mi).concat(Object.keys(mi).map((i) => i.toLowerCase())));
function vn(i) {
  return i === " " || i === "	" || i === `
` || i === "\r";
}
function Tn(i) {
  return i === " " || i === ",";
}
function Mn(i, t) {
  let e = 0, s = 0, n = 0, r = 0, l = 0, o = 0, a = 0, h = 0, u = "";
  for (let f = 0, y = t.length; f < y; f++) {
    const m = t[f];
    switch (m[0]) {
      case "M":
        i.moveTo(m[1], m[2]), e = m[1], s = m[2], n = e, r = s;
        break;
      case "L":
        i.lineTo(m[1], m[2]), e = m[1], s = m[2];
        break;
      case "H":
        i.lineTo(m[1], s), e = m[1];
        break;
      case "V":
        i.lineTo(e, m[1]), s = m[1];
        break;
      case "Q":
        i.quadraticCurveTo(m[1], m[2], m[3], m[4]), l = m[1], o = m[2], e = m[3], s = m[4];
        break;
      case "T":
        a = e, h = s, (u === "Q" || u === "T") && (a -= l - e, h -= o - s), i.quadraticCurveTo(a, h, m[1], m[2]), l = a, o = h, e = m[1], s = m[2];
        break;
      case "C":
        i.bezierCurveTo(m[1], m[2], m[3], m[4], m[5], m[6]), l = m[3], o = m[4], e = m[5], s = m[6];
        break;
      case "S":
        a = e, h = s, (u === "C" || u === "S") && (a -= l - e, h -= o - s), i.bezierCurveTo(a, h, m[1], m[2], m[3], m[4]), l = m[1], o = m[2], e = m[3], s = m[4];
        break;
      case "A":
        {
          let k = e, p = s, b = m[1], d = m[2], _ = m[3], v = !!m[4], M = !!m[5], P = m[6], E = m[7], L = P, I = E;
          _n(k, p, P, E, b, d, _, v, M, (C, O, rt, lt, H, j, ot, _t, V) => {
            i.bezierCurveTo(rt, lt, H, j, ot, _t), L = ot, I = _t;
          }), e = L, s = I;
        }
        break;
      case "Z":
        i.closePath(), e = n, s = r;
        break;
    }
    u = m[0];
  }
}
function di(i, t) {
  const e = Pn(t);
  Mn(i, e);
}
function Pn(i) {
  const t = [];
  let e = 0, s = 0, n = i.length, r = "", l = "", o = 0, a = 0, h = 0, u = 0, f = 0, y = 0, m = 0, k = 0;
  for (; e < n; ) {
    for (s = e, r = i.charAt(s); vn(r); )
      r = i.charAt(++e);
    l = r.toUpperCase();
    const p = r !== l;
    if (yi.has(l)) {
      r = i.charAt(++e);
      let b = "", d = [];
      for (; e < n && !yi.has(r); )
        Tn(r) ? (b !== "" && d.push(parseFloat(b)), b = "") : b += r, r = i.charAt(++e);
      switch (b !== "" && d.push(parseFloat(b)), l) {
        case "M":
          f = p ? f + d[0] : d[0], y = p ? y + d[1] : d[1], d[0] = f, d[1] = y, m = f, k = y;
          break;
        case "L":
          f = p ? f + d[0] : d[0], y = p ? y + d[1] : d[1], d[0] = f, d[1] = y;
          break;
        case "H":
          f = p ? f + d[0] : d[0], d[0] = f;
          break;
        case "V":
          y = p ? y + d[0] : d[0], d[0] = y;
          break;
        case "Q":
          o = p ? f + d[0] : d[0], a = p ? y + d[1] : d[1], f = p ? f + d[2] : d[2], y = p ? y + d[3] : d[3], d[0] = o, d[1] = a, d[2] = f, d[3] = y;
          break;
        case "T":
          f = p ? f + d[0] : d[0], y = p ? y + d[1] : d[1], d[0] = f, d[1] = y;
          break;
        case "C":
          o = p ? f + d[0] : d[0], a = p ? y + d[1] : d[1], h = p ? f + d[2] : d[2], u = p ? y + d[3] : d[3], f = p ? f + d[4] : d[4], y = p ? y + d[5] : d[5], d[0] = o, d[1] = a, d[2] = h, d[3] = u, d[4] = f, d[5] = y;
          break;
        case "S":
          h = p ? f + d[0] : d[0], u = p ? y + d[1] : d[1], f = p ? f + d[2] : d[2], y = p ? y + d[3] : d[3], d[0] = h, d[1] = u, d[2] = f, d[3] = y;
          break;
        case "A":
          let _ = d[0], v = d[1], M = d[2], P = d[3], E = d[4];
          f = p ? f + d[5] : d[5], y = p ? y + d[6] : d[6], d[0] = _, d[1] = v, d[2] = M, d[3] = P, d[4] = E, d[5] = f, d[6] = y;
          break;
        case "Z":
          f = m, y = k;
          break;
      }
      t.push([l].concat(d));
    }
  }
  return t;
}
function Sn(i) {
  let t = { tl: 0, tr: 0, br: 0, bl: 0 };
  return typeof i == "number" ? t = { tl: i, tr: i, br: i, bl: i } : Array.isArray(i) ? i.length === 1 ? t = { tl: i[0], tr: i[0], br: i[0], bl: i[0] } : i.length === 2 ? t = { tl: i[0], tr: i[1], br: i[0], bl: i[1] } : i.length === 3 ? t = { tl: i[0], tr: i[1], br: i[2], bl: i[1] } : i.length === 4 && (t = { tl: i[0], tr: i[1], br: i[2], bl: i[3] }) : i && (t.tl = i.x ?? 0, t.tr = i.y ?? 0, t.bl = i.z ?? 0, t.br = i.w ?? 0), t;
}
function gt(i) {
  for (var t = 0; t < i.length; t++)
    if (i[t] !== void 0 && !Number.isFinite(i[t]))
      return !1;
  return !0;
}
function pi(i) {
  return i / Math.PI * 180;
}
function Cn(i, t) {
  return Math.abs(i - t) < 1e-5;
}
function Rn(i, t, e, s, n, r, l = !1) {
  qi(i, t, e, s, s, 0, n, r, l);
}
function wn(i, t, e, s, n, r) {
  if (gt([t, e, s, n, r])) {
    if (r < 0)
      throw "radii cannot be negative";
    i.isEmpty() && i.moveTo(t, e), i.arcTo(c.create(t, e), c.create(s, n), r);
  }
}
function In(i, t, e, s, n, r, l) {
  gt([t, e, s, n, r, l]) && (i.isEmpty() && i.moveTo(t, e), i.cubicTo(t, e, s, n, r, l));
}
function En(i) {
  if (!i.isEmpty()) {
    var t = i.getBounds();
    (t.bottom - t.top || t.right - t.left) && i.close();
  }
}
function xi(i, t, e, s, n, r, l) {
  var o = pi(l - r), a = pi(r), h = W.makeLTRB(t - s, e - n, t + s, e + n);
  if (Cn(Math.abs(o), 360)) {
    var u = o / 2;
    i.arcToOval(h, a, u, !1), i.arcToOval(h, a + u, u, !1);
    return;
  }
  i.arcToOval(h, a, o, !1);
}
function qi(i, t, e, s, n, r, l, o, a = !1) {
  if (gt([t, e, s, n, r, l, o])) {
    if (s < 0 || n < 0)
      throw "radii cannot be negative";
    var h = 2 * Math.PI, u = l % h;
    u < 0 && (u += h);
    var f = u - l;
    if (l = u, o += f, !a && o - l >= h ? o = l + h : a && l - o >= h ? o = l - h : !a && l > o ? o = l + (h - (l - o) % h) : a && l < o && (o = l - (h - (o - l) % h)), !r) {
      xi(i, t, e, s, n, l, o);
      return;
    }
    var y = ht.fromRotateOrigin(r, t, e), m = ht.fromRotateOrigin(-r, t, e);
    i.transform(m), xi(i, t, e, s, n, l, o), i.transform(y);
  }
}
function Ln(i, t, e) {
  gt([t, e]) && (i.isEmpty() && i.moveTo(t, e), i.lineTo(t, e));
}
function Nn(i, t, e) {
  gt([t, e]) && i.moveTo(t, e);
}
function An(i, t, e, s, n) {
  gt([t, e, s, n]) && (i.isEmpty() && i.moveTo(t, e), i.quadTo(t, e, s, n));
}
function Wn(i, t, e, s, n) {
  var r = W.makeXYWH(t, e, s, n);
  gt([r.left, r.top, r.right, r.bottom]) && i.addRect(r);
}
let vr = class zi {
  constructor(t) {
    x(this, "_path", wt.default());
    typeof t == "string" ? di(this, t) : t instanceof zi && this._path.copy(t.getPath());
  }
  static default() {
    return new this();
  }
  static fromSvgPath(t) {
    return new this(t);
  }
  fromSvgPath(t) {
    di(this, t);
  }
  getPath() {
    return this._path;
  }
  addPath(t, e) {
    this._path.addPath(t.getPath()), e && this._path.transform(e);
  }
  contains(t, e, s = "nonzero") {
    return this._path.contains(t, e, s);
  }
  arc(t, e, s, n, r, l = !1) {
    Rn(this._path, t, e, s, n, r, l);
  }
  arcTo(t, e, s, n, r) {
    wn(this._path, t, e, s, n, r);
  }
  bezierCurveTo(t, e, s, n, r, l) {
    In(this._path, t, e, s, n, r, l);
  }
  closePath() {
    En(this._path);
  }
  conicTo(t, e, s, n, r) {
    this._path.conicTo(t, e, s, n, r);
  }
  ellipseArc(t, e, s, n, r, l, o, a, h) {
    this._path.isEmpty() && this._path.moveTo(t, e), this._path.arcTo(c.create(r, l), o, Number(a), +!h, c.create(s, n));
  }
  roundRect(t, e, s, n, r) {
    let l = Sn(r);
    const o = [
      c.create(l.tl, l.tl),
      // 左上角 (x半径, y半径)
      c.create(l.tr, l.tr),
      // 右上角
      c.create(l.br, l.br),
      // 右下角
      c.create(l.bl, l.bl)
      // 左下角
    ];
    let a = yt.makeEmpty(), h = W.makeXYWH(t, e, s, n);
    a.setRectRadii(h, o), this._path.addRRect(a);
  }
  ellipse(t, e, s, n, r, l, o, a = !1) {
    qi(
      this._path,
      t,
      e,
      s,
      n,
      r,
      l,
      o,
      a
    );
  }
  lineTo(t, e) {
    Ln(this._path, t, e);
  }
  moveTo(t, e) {
    Nn(this._path, t, e);
  }
  quadraticCurveTo(t, e, s, n) {
    An(this._path, t, e, s, n);
  }
  rect(t, e, s, n) {
    Wn(this._path, t, e, s, n);
  }
  toCanvas(t) {
    return this._path.toCanvas(t);
  }
  toPath2D() {
    return this._path.toPath2D();
  }
  toSvgPath() {
    return this._path.toSvgPath();
  }
};
export {
  Gs as FillRule,
  T as FloatPoint,
  $s as LineCap,
  Js as LineJoin,
  ht as Matrix2D,
  Ve as PI,
  vr as Path2D,
  wt as PathBuilder,
  Ne as PathSegmentsIter,
  _r as PathStroker,
  c as Point,
  te as Point3D,
  F as PointerArray,
  yt as RRect,
  W as Rect,
  N as Ref,
  Q as SK_Scalar1,
  pt as SK_ScalarHalf,
  Un as SK_ScalarInfinity,
  $i as SK_ScalarMax,
  Zn as SK_ScalarMin,
  Kn as SK_ScalarNaN,
  we as SK_ScalarNearlyZero,
  Hn as SK_ScalarNegativeInfinity,
  et as SK_ScalarPI,
  ve as SK_ScalarRoot2Over2,
  bi as SK_ScalarSinCosNearlyZero,
  Xn as SK_ScalarSqrt2,
  jn as SK_ScalarTanPIOver8,
  Ft as Size,
  Dn as SkBezierCubic,
  pr as SkChopCubicAtHalf,
  kr as SkChopCubicAtXExtrema,
  Si as SkChopCubicAtYExtrema,
  ae as SkChopCubicAt_3,
  ks as SkChopCubicAt_4,
  Mi as SkChopCubicAt_5,
  fs as SkChopQuadAt,
  ds as SkChopQuadAtYExtrema,
  Ns as SkComputeConicExtremas,
  Ls as SkComputeCubicExtremas,
  Es as SkComputeQuadExtremas,
  z as SkConic,
  as as SkCubicType,
  Wt as SkCubics,
  Ye as SkDegreesToRadians,
  Jt as SkDoubleToScalar,
  Ti as SkEvalCubicAt,
  se as SkEvalCubicPosAt,
  vi as SkEvalCubicTangentAt,
  Rt as SkEvalQuadAt,
  Ie as SkEvalQuadTangentAt,
  Ee as SkFindBisector,
  Cs as SkFindCubicCusp,
  ne as SkFindCubicExtrema,
  _s as SkFindCubicInflections,
  Ci as SkFindCubicMaxCurvature,
  xr as SkFindCubicMidTangent,
  Ze as SkFindQuadExtrema,
  ps as SkFindQuadMaxCurvature,
  dr as SkFindQuadMidTangent,
  nt as SkFindUnitQuadRoots,
  Gn as SkFloatToScalar,
  Jn as SkIntToFloat,
  Gi as SkIntToScalar,
  bt as SkQuadCoeff,
  Kt as SkQuads,
  fr as SkRadiansToDegrees,
  zt as SkRotationDirection,
  ns as SkScalarACos,
  lr as SkScalarASin,
  Qe as SkScalarATan2,
  X as SkScalarAbs,
  Oe as SkScalarAve,
  es as SkScalarCeilToInt,
  er as SkScalarCeilToScalar,
  nr as SkScalarCopySign,
  xt as SkScalarCos,
  Gt as SkScalarCosSnapToZero,
  or as SkScalarExp,
  ir as SkScalarFloorToInt,
  ki as SkScalarFloorToScalar,
  ur as SkScalarFraction,
  $ as SkScalarHalf,
  G as SkScalarInterp,
  yr as SkScalarInterpFunc,
  Me as SkScalarInvert,
  kt as SkScalarIsFinite,
  cr as SkScalarIsInt,
  rs as SkScalarIsNaN,
  ar as SkScalarLog,
  hr as SkScalarLog2,
  rr as SkScalarMod,
  U as SkScalarNearlyEqual,
  st as SkScalarNearlyZero,
  is as SkScalarPow,
  sr as SkScalarRoundToInt,
  me as SkScalarRoundToScalar,
  De as SkScalarSignAsInt,
  mr as SkScalarSignAsScalar,
  Te as SkScalarSin,
  $t as SkScalarSinSnapToZero,
  K as SkScalarSqrt,
  Nt as SkScalarSquare,
  ss as SkScalarTan,
  tr as SkScalarToDouble,
  $n as SkScalarToFloat,
  ts as SkScalarTruncToScalar,
  Re as SkScalarsAreFinite,
  ls as SkScalarsAreFiniteArray,
  Xe as SkScalarsEqual,
  qn as VectorIterator,
  ct as clamp,
  ji as copysign,
  Xi as fabs,
  On as isFinite,
  je as kMaxConicToQuadPOW2,
  os as kMaxConicsForArc,
  Z as lerp,
  Yn as magnitudeAlt,
  Vn as max,
  Bn as min,
  Yt as nearly_equal,
  Ks as pointInPath,
  q as sk_double_nearly_zero,
  Qn as sk_double_to_float,
  Ct as sk_doubles_nearly_equal_ulps,
  _e as sk_ieee_double_divide,
  ee as sk_ieee_float_divide,
  Di as sqrt,
  zn as swap,
  gr as tangent_conic,
  Zs as tangent_cubic,
  Xs as tangent_line,
  js as tangent_quad,
  br as winding_conic,
  Ds as winding_cubic,
  Bs as winding_line,
  Ys as winding_quad
};
