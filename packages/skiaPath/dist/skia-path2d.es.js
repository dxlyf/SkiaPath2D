var Di = Object.defineProperty;
var Xi = (s, t, e) => t in s ? Di(s, t, { enumerable: !0, configurable: !0, writable: !0, value: e }) : s[t] = e;
var x = (s, t, e) => Xi(s, typeof t != "symbol" ? t + "" : t, e);
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
  subtractMultiplyVectorScalar(t, e, i) {
    return this.set(t.x - e.x * i, t.y - e.y * i);
  }
  addMultiplyVectorScalar(t, e, i) {
    return this.set(t.x + e.x * i, t.y + e.y * i);
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
    let i = this.projectLength(t) / t.length();
    return this.multiplyVectorScalar(t, i);
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
    let i = Math.cos(t), n = Math.sin(t);
    if (e.isZero())
      return this.set(
        this.x * i - this.y * n,
        this.x * n + this.y * i
      );
    {
      const r = this.x - e.x, l = this.y - e.y;
      return this.set(
        r * i - l * n + e.x,
        r * n + l * i + e.y
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
  lerp(t, e, i) {
    return this.set(t.x + (e.x - t.x) * i, t.y + (e.y - t.y) * i);
  }
  smoonstep(t, e, i) {
    return this.set(t.x + (e.x - t.x) * i * i * (3 - 2 * i), t.y + (e.y - t.y) * i * i * (3 - 2 * i));
  }
  setPointLength(t, e, i, n, r) {
    let l = e, o = i, a = Math.sqrt(l * l + o * o), h = n / a;
    if (e *= h, i *= h, !Number.isFinite(e) || !Number.isFinite(i) || e == 0 && i == 0)
      return t.set(0, 0), !1;
    let u = 0;
    return r && (u = a), t.set(e, i), r && (r.value = u), !0;
  }
  setLength(t) {
    return this.setPointLength(this, this.x, this.y, t);
  }
  setLengthFrom(t, e, i) {
    return this.setPointLength(this, t, e, i);
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
class ee {
  constructor(t = 0, e = 0, i = 0) {
    x(this, "elements", new Float32Array([0, 0, 0]));
    this.elements.set([t, e, i]);
  }
  static default() {
    return new this(0, 0, 0);
  }
  static make(t) {
    let e = new Array(t);
    for (let i = 0; i < t; i++)
      e[i] = this.default();
    return e;
  }
  static create(t = 0, e = 0, i = 0) {
    return new this(t, e, i);
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
  set(t, e, i) {
    return this.elements[0] = t, this.elements[1] = e, this.elements[2] = i, this;
  }
  clone() {
    return new ee(this.x, this.y, this.z);
  }
  copy(t) {
    return this.elements[0] = t.x, this.elements[1] = t.y, this.elements[2] = t.z, this;
  }
}
const ji = 1192092896e-16;
class A {
  constructor(t) {
    x(this, "value");
    this.value = t;
  }
  static from(t) {
    return new A(t);
  }
  swap(t) {
    let e = this.value;
    this.value = t.value, t.value = e;
  }
}
class N {
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
    return new N(this.data).copy(this);
  }
  slice(t) {
    const e = new N(this.data);
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
class zn {
  constructor(t, e = 0, i = !1) {
    x(this, "data");
    x(this, "size", 0);
    x(this, "currentIndex", 0);
    x(this, "increase", 1);
    this.size = t, this.currentIndex = e % t, this.increase = i ? t - 1 : 1, this.data = new Array(t);
  }
  get current() {
    return this.data[this.currentIndex];
  }
  get next() {
    return this.currentIndex = (this.currentIndex + this.increase) % this.size, this.data[this.currentIndex];
  }
}
const Bn = (s, t) => {
  let e = s.value;
  s.value = t.value, t.value = e;
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
    let i = new T(e * 2);
    for (let n = 0; n < e; n++)
      i.elements[n * 2] = t[n].x, i.elements[n * 2 + 1] = t[n].y;
    return i;
  }
  static fromArray(t, e = t.length) {
    let i = new T(e);
    for (let n = 0; n < e; n++)
      i.elements[n] = t[n];
    return i;
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
    return this.setElements(this.elements.map((e, i) => e + t.elements[i]));
  }
  sub(t) {
    return this.setElements(this.elements.map((e, i) => e - t.elements[i]));
  }
  mulScalar(t) {
    return this.setElements(this.elements.map((e) => e * t));
  }
  min(t) {
    return this.setElements(this.elements.map((e, i) => Math.min(e, t.elements[i])));
  }
  max(t) {
    return this.setElements(this.elements.map((e, i) => Math.max(e, t.elements[i])));
  }
  mul(t) {
    return this.setElements(this.elements.map((e, i) => e * t.elements[i]));
  }
  div(t) {
    return this.setElements(this.elements.map((e, i) => e / t.elements[i]));
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
    return this.elements.every((e, i) => e == t.elements[i]);
  }
  equalsWithTolerance(t, e = 1e-4) {
    return this.elements.every((i, n) => Math.abs(i - t.elements[n]) < e);
  }
  lerp(t, e, i) {
    return this.setElements(this.elements.map((n, r) => t.elements[r] + i.elements[r] * (e.elements[r] - t.elements[r])));
  }
  clmap(t, e) {
    return this.setElements(this.elements.map((i, n) => Math.max(t.elements[n], Math.min(e.elements[n], this.elements[n]))));
  }
}
function Zi(s) {
  return Math.sqrt(s);
}
function ie(s, t) {
  return s / t;
}
function Vn(s, t) {
  return Math.min(s, t);
}
function Yn(s, t) {
  return Math.max(s, t);
}
function Ui(s) {
  return Math.abs(s);
}
function ct(s, t, e) {
  return Math.min(Math.max(s, t), e);
}
function Z(s, t, e) {
  return s + (t - s) * e;
}
function Q(s) {
  return s == 0 || Ui(s) < ji;
}
function Te(s, t) {
  return s / t;
}
function On(s) {
  return s;
}
function Dn(s) {
  return Number.isFinite(s);
}
function Hi(s, t) {
  return t === 0 ? 1 / t === -1 / 0 ? -Math.abs(s) : Math.abs(s) : t < 0 ? -Math.abs(s) : Math.abs(s);
}
function Ye(s) {
  const t = new ArrayBuffer(8), e = new DataView(t);
  e.setFloat64(0, s, !0);
  const i = e.getUint32(0, !0), n = e.getUint32(4, !0);
  let r = BigInt(n) << 32n | BigInt(i);
  r &= 0b0111111111110000000000000000000000000000000000000000000000000000n;
  const o = Number(r >> 32n & 0xffffffffn), a = Number(r & 0xffffffffn);
  return e.setUint32(0, a, !0), e.setUint32(4, o, !0), e.getFloat64(0, !0);
}
function Xn(s) {
  return Math.sign(s) * Math.pow(2, Math.floor(Math.log2(Math.abs(s))));
}
function St(s, t, e = 0) {
  const i = Number.MIN_VALUE, n = Math.max(
    Math.max(Ye(s), i),
    Ye(t)
  ), r = Number.EPSILON, l = n * (r * (e + 1));
  return s === t || Math.abs(t - s) < l;
}
class jn {
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
    const i = (y) => t[2 * y], n = (y) => t[2 * y + 1];
    if (e == 0)
      return [i(0), n(0)];
    if (e == 1)
      return [i(3), n(3)];
    let r = 1 - e, l = r * r, o = l * r, a = 3 * l * e, h = e * e, u = 3 * r * h, f = h * e;
    return [
      o * i(0) + a * i(1) + u * i(2) + f * i(3),
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
  static Subdivide(t, e, i) {
    const n = (P) => t[2 * P], r = (P) => t[2 * P + 1], l = (P) => i[2 * P], o = (P) => i[2 * P + 1], a = (P, M) => {
      i[2 * P] = M;
    }, h = (P, M) => {
      i[2 * P + 1] = M;
    }, u = (P) => i[2 * P + 6], f = (P) => i[2 * P + 7], y = (P, M) => {
      i[2 * P + 6] = M;
    }, m = (P, M) => {
      i[2 * P + 7] = M;
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
    const i = e ? t.slice(1) : t, n = (l) => i[2 * l];
    let r = new Array(4);
    return r[0] = -n(0) + 3 * n(1) - 3 * n(2) + n(3), r[1] = 3 * n(0) - 6 * n(1) + 3 * n(2), r[2] = -3 * n(0) + 3 * n(1), r[3] = n(0), r;
  }
}
function Ki(s, t) {
  return Q(t) ? Q(s) : Math.abs(s / t) < 1e-16;
}
function Ji(s, t, e) {
  return Q(s) ? (e[0] = 0, Q(t) ? 1 : 0) : (e[0] = -t / s, Number.isFinite(e[0]) ? 1 : 0);
}
class Jt {
  /**
   * Puts up to 2 real solutions to the equation
   *   A*t^2 + B*t + C = 0
   * in the provided array.
   */
  static RootsReal(t, e, i, n) {
    if (Ki(t, e))
      return Ji(e, i, n);
    const r = Te(e, 2 * t), l = Te(i, t), o = r * r;
    if (!Number.isFinite(o - l) || !Q(o - l) && o < l)
      return 0;
    let a = 0;
    return o > l && (a = Math.sqrt(o - l)), n[0] = a - r, n[1] = -a - r, Q(a) || St(n[0], n[1]) ? 1 : 2;
  }
  /**
   * Evaluates the quadratic function with the 3 provided coefficients and the
   * provided variable.
   */
  static EvalAt(t, e, i, n) {
    return t * n * n + e * n + i;
  }
}
const Oe = Math.PI;
function Ot(s, t) {
  return Q(s) ? Q(t) : St(s, t, 0);
}
function se(s) {
  return Math.abs(s) < 1e-8;
}
function $i(s, t, e, i) {
  let n = [0, 0], r = Jt.RootsReal(3 * s, 2 * t, e, n), l = 0;
  for (let o = 0; o < r; o++) {
    let a = n[o];
    a >= 0 && a <= 1 && (i[l++] = a);
  }
  return l;
}
function Gi(s, t, e, i, n, r) {
  let l = Nt.EvalAt(s, t, e, i, n);
  if (se(l))
    return n;
  let o = Nt.EvalAt(s, t, e, i, r);
  if (!Number.isFinite(l) || !Number.isFinite(o) || l > 0 && o > 0 || l < 0 && o < 0)
    return -1;
  let a = 1e3;
  for (let h = 0; h < a; h++) {
    let u = (n + r) / 2, f = Nt.EvalAt(s, t, e, i, u);
    if (se(f))
      return u;
    f < 0 && l < 0 || f > 0 && l > 0 ? n = u : r = u;
  }
  return -1;
}
function ts(s, t) {
  return Q(t) ? Q(s) : Math.abs(s / t) < 1e-7;
}
class Nt {
  /**
  * Puts up to 3 real solutions to the equation
  *   A*t^3 + B*t^2 + C*t + d = 0
  * in the provided array and returns how many roots that was.
  */
  static RootsReal(t, e, i, n, r) {
    if (ts(t, e))
      return Jt.RootsReal(e, i, n, r);
    if (Q(n)) {
      let _ = Jt.RootsReal(t, e, i, r);
      for (let v = 0; v < _; ++v)
        if (Q(r[v]))
          return _;
      return r[_++] = 0, _;
    }
    if (Q(t + e + i + n)) {
      let _ = Jt.RootsReal(t, t + e, -n, r);
      for (let v = 0; v < _; ++v)
        if (St(r[v], 1))
          return _;
      return r[_++] = 1, _;
    }
    let l, o, a;
    {
      let _ = Te(1, t);
      l = e * _, o = i * _, a = n * _;
    }
    let h = l * l, u = (h - o * 3) / 9, f = (2 * h * l - 9 * l * o + 27 * a) / 54, y = f * f, m = u * u * u, k = y - m;
    if (!Number.isFinite(k))
      return 0;
    let p = l / 3, b, d = N.from(r);
    if (k < 0) {
      const _ = Math.acos(ct(f / Math.sqrt(m), -1, 1)), v = -2 * Math.sqrt(u);
      b = v * Math.cos(_ / 3) - p, d.value = b, d.next(), b = v * Math.cos((_ + 2 * Oe) / 3) - p, Ot(r[0], b) || (d.value = b, d.next()), b = v * Math.cos((_ - 2 * Oe) / 3) - p, !Ot(r[0], b) && (d.curIndex == 1 || !Ot(r[1], b)) && (d.value = b, d.next());
    } else {
      const _ = Math.sqrt(k);
      t = Math.abs(f) + _, t = Math.cbrt(t), f > 0 && (t = -t), Q(t) || (t += u / t), b = t - p, d.value = b, d.next(), !Q(y) && St(y, m) && (b = -t / 2 - p, Ot(r[0], b) || (d.value = b, d.next()));
    }
    return d.curIndex;
  }
  /**
  * Puts up to 3 real solutions to the equation
  *   A*t^3 + B*t^2 + C*t + D = 0
  * in the provided array, with the constraint that t is in the range [0.0, 1.0],
  * and returns how many roots that was.
  */
  static RootsValidT(t, e, i, n, r) {
    let l = [0, 0, 0], o = Nt.RootsReal(t, e, i, n, l), a = 0;
    for (let h = 0; h < o; ++h) {
      let u = l[h];
      u >= 1 && u <= 1.00005 ? (a < 1 || !St(r[0], 1)) && (a < 2 || !St(r[1], 1)) && (r[a++] = 1) : u >= -5e-5 && (u <= 0 || Q(u)) ? (a < 1 || !Q(r[0])) && (a < 2 || !Q(r[1])) && (r[a++] = 0) : u > 0 && u < 1 && (r[a++] = u);
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
  static BinarySearchRootsValidT(t, e, i, n, r) {
    if (!Number.isFinite(t) || !Number.isFinite(e) || !Number.isFinite(i) || !Number.isFinite(n))
      return 0;
    let l = [0, 0, 0, 1], o = [0, 0], a = $i(t, e, i, o), h = 2 - a;
    a == 1 && (l[h + 1] = o[0]), a == 2 && (l[h + 1] = Math.min(o[0], o[1]), l[h + 2] = Math.max(o[0], o[1]));
    let u = 0;
    for (; h < 3; h++) {
      let f = Gi(t, e, i, n, l[h], l[h + 1]);
      f >= 0 && (u < 1 || !se(r[0] - f)) && (u < 2 || !se(r[1] - f)) && (r[u++] = f);
    }
    return u;
  }
  /**
  * Evaluates the cubic function with the 4 provided coefficients and the
  * provided variable.
  */
  static EvalAt(t, e, i, n, r) {
    return t * r * r * r + e * r * r + i * r + n;
  }
  static EvalAt_2(t, e) {
    return this.EvalAt(t[0], t[1], t[2], t[3], e);
  }
}
const V = 1, pt = 0.5, Zn = Math.SQRT2, et = Math.PI, Un = 0.414213562, Pe = 0.707106781, es = 3402823466e29, Hn = -es, Kn = 1 / 0, Jn = -1 / 0, $n = NaN, is = (s) => s, Gn = (s) => s, tr = (s) => s, er = (s) => s, ir = (s) => s, $t = (s) => s, gi = (s) => Math.floor(s), sr = (s) => Math.ceil(s), de = (s) => Math.round(s), ss = (s) => Math.trunc(s), nr = (s) => Math.floor(s), ns = (s) => Math.ceil(s), rr = (s) => Math.round(s), X = (s) => Math.abs(s), lr = (s, t) => Math.sign(t) * Math.abs(s), or = (s, t) => s % t, K = (s) => Math.sqrt(s), rs = (s, t) => Math.pow(s, t), Me = (s) => Math.sin(s), xt = (s) => Math.cos(s), ls = (s) => Math.tan(s), ar = (s) => Math.asin(s), os = (s) => Math.acos(s), De = (s, t) => Math.atan2(s, t), hr = (s) => Math.exp(s), ur = (s) => Math.log(s), fr = (s) => Math.log2(s), as = (s) => Number.isNaN(s), qt = (s) => Number.isFinite(s), Ee = (s, t) => Number.isFinite(s) && Number.isFinite(t), hs = (s, t) => s.slice(0, t).every(Number.isFinite), cr = (s) => s - ss(s), Lt = (s) => s * s, Se = (s) => V / s, Xe = (s, t) => (s + t) * pt, $ = (s) => s * pt, je = (s) => s * (et / 180), mr = (s) => s * (180 / et), yr = (s) => s === gi(s), Ze = (s) => s < 0 ? -1 : s > 0 ? 1 : 0, dr = (s) => s < 0 ? -V : s > 0 ? V : 0, Le = V / 4096, st = (s, t = Le) => X(s) <= t, U = (s, t, e = Le) => X(s - t) <= e, _i = V / 65536, Gt = (s) => {
  const t = Me(s);
  return st(t, _i) ? 0 : t;
}, te = (s) => {
  const t = xt(s);
  return st(t, _i) ? 0 : t;
}, G = (s, t, e) => ((e < 0 || e > V) && console.warn("t out of range [0, 1]"), s + (t - s) * e), pr = (s, t, e, i) => {
  if (i <= 0 || !t || !e) throw new Error("Invalid input");
  let n = 0;
  for (; n < i && t[n] < s; ) n++;
  if (n === i) return e[i - 1];
  if (n === 0) return e[0];
  const r = t[n - 1], l = t[n], o = (s - r) / (l - r);
  return G(e[n - 1], e[n], o);
}, Ue = (s, t, e) => {
  if (e < 0) throw new Error("Invalid length");
  for (let i = 0; i < e; i++) if (s[i] !== t[i]) return !1;
  return !0;
};
class Wt {
  constructor(t, e) {
    this.width = t, this.height = e;
  }
  static default() {
    return new Wt(0, 0);
  }
  static from(t, e) {
    return new Wt(t, e);
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
    return new Wt(this.width, this.height);
  }
  equals(t) {
    return this.width === t.width && this.height === t.height;
  }
  equalsWithEpsilon(t, e = 1e-4) {
    return Math.abs(this.width - t.width) < e && Math.abs(this.height - t.height) < e;
  }
}
class q {
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
  static makeLTRB(t, e, i, n) {
    return new this([t, e, i, n]);
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
  static makeXYWH(t, e, i, n) {
    return this.makeLTRB(t, e, t + i, e + n);
  }
  set(t, e, i, n) {
    return this.elements.set([t, e, i, n]), this;
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
    return Wt.from(this.width, this.height);
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
  setLTRB(t, e, i, n) {
    return this.set(t, e, i, n);
  }
  /** Sets SkIRect to: (x, y, x + width, y + height).
          Does not validate input; width or height may be negative.
  
          @param x       stored in fLeft
          @param y       stored in fTop
          @param width   added to x and stored in fRight
          @param height  added to y and stored in fBottom
      */
  setXYWH(t, e, i, n) {
    return this.setLTRB(t, e, t + i, e + n);
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
    return q.makeLTRB(this.x + t, this.y + e, this.right + t, this.bottom + e);
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
    return q.makeLTRB(this.x + t, this.y + e, this.right - t, this.bottom - e);
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
  adjust(t, e, i, n) {
    return this.setLTRB(this.left + t, this.top + e, this.right + i, this.bottom + n);
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
    let i = q.makeLTRB(
      Math.max(t.left, e.left),
      Math.max(t.top, e.top),
      Math.max(t.right, e.right),
      Math.max(t.bottom, e.bottom)
    );
    return i.isEmpty() ? !1 : (this.copy(i), !0);
  }
  copy(t) {
    this.elements.set(t.elements);
  }
  clone() {
    return q.makeLTRB(this.left, this.top, this.right, this.bottom);
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
    return q.makeLTRB(
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
    let i, n, r = 0;
    e & 1 ? (i = n = T.fromPoints(t, 1).xyxy(), r += 1, e -= 1) : (i = n = T.fromPoints(t, 2), r += 2, e -= 2), n = n.clone();
    let l = i.clone().mulScalar(0);
    for (; e; ) {
      let a = T.fromArray([t[r].x, t[r].y, t[r + 1].x, t[r + 1].y], 4);
      l = l.mul(a), i = i.min(a), n = n.max(a), r += 2, e -= 2;
    }
    const o = l.elements.every((a) => Number.isFinite(a));
    return o ? this.setLTRB(
      Math.min(i.elements[0], i.elements[2]),
      Math.min(i.elements[1], i.elements[3]),
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
    let t = q.makeEmpty();
    return this.roundRect(t), t;
  }
  /** Sets SkIRect by discarding the fractional portion of fLeft and fTop; and rounding
      up fRight and fBottom, using
      (SkScalarFloorToInt(fLeft), SkScalarFloorToInt(fTop),
       SkScalarCeilToInt(fRight), SkScalarCeilToInt(fBottom)).
  
      @return  rounded SkIRect
  */
  roundOut() {
    let t = q.makeEmpty();
    return this.roundOutRect(t), t;
  }
  /** Sets SkIRect by rounding up fLeft and fTop; and discarding the fractional portion
      of fRight and fBottom, using
      (SkScalarCeilToInt(fLeft), SkScalarCeilToInt(fTop),
       SkScalarFloorToInt(fRight), SkScalarFloorToInt(fBottom)).
  
      @return  rounded SkIRect
  */
  roundIn() {
    let t = q.makeEmpty();
    return this.roundInRect(t), t;
  }
}
const O = class O {
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
  static fromSinCosOrigin(t, e, i, n) {
    const r = 1 - e;
    return this.fromRows(e, t, -t, e, t * n + r * i, -t * i + r * n);
  }
  static fromTranslation(t, e) {
    return this.fromRows(1, 0, 0, 1, t, e);
  }
  static fromTranslate(t, e) {
    return this.fromRows(1, 0, 0, 1, t, e);
  }
  static fromRotation(t) {
    const e = Math.cos(t), i = Math.sin(t);
    return this.fromRows(e, i, -i, e, 0, 0);
  }
  static fromRotate(t) {
    const e = Math.cos(t), i = Math.sin(t);
    return this.fromSinCos(i, e);
  }
  static fromRotateOrigin(t, e, i) {
    const n = Math.cos(t), r = Math.sin(t);
    return this.fromSinCosOrigin(r, n, e, i);
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
  static fromRows(t, e, i, n, r, l) {
    return this.fromArray([t, e, i, n, r, l]);
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
  set(t, e, i, n, r, l) {
    return this.mutable ? (this.elements[0] = t, this.elements[2] = i, this.elements[4] = r, this.elements[1] = e, this.elements[3] = n, this.elements[5] = l, this) : this.constructor.fromRows(t, e, i, n, r, l).setMutable(this.mutable);
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
    return this.elements.every((t, e) => t === O.IDENTITY_MATRIX.elements[e]);
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
    const i = t.elements, n = e.elements, r = i[0] * n[0] + i[2] * n[1], l = i[1] * n[0] + i[3] * n[1], o = i[0] * n[2] + i[2] * n[3], a = i[1] * n[2] + i[3] * n[3], h = i[0] * n[4] + i[2] * n[5] + i[4], u = i[1] * n[5] + i[3] * n[5] + i[5];
    return this.set(r, l, o, a, h, u);
  }
  multiplyScalar(t) {
    return this.set(this.a * t, this.b * t, this.c * t, this.d * t, this.e * t, this.f * t);
  }
  setScale(t, e) {
    return this.set(t, 0, 0, e, 0, 0);
  }
  setSinCos(...t) {
    const e = t[1], i = t[0];
    if (t.length === 4) {
      const n = t[2], r = t[3], l = 1 - e;
      return this.set(e, i, -i, e, i * r + l * n, -i * n + l * r);
    } else
      return this.set(e, i, -i, e, 0, 0);
  }
  setRotate(...t) {
    const e = t[0], i = Math.cos(e), n = Math.sin(e);
    return t.length === 1 ? this.setSinCos(n, i) : this.setSinCos(n, i, t[1], t[2]);
  }
  setRotateDegrees(t) {
    return this.setRotate(t * Math.PI / 180);
  }
  setTranslate(t, e) {
    return this.set(1, 0, 0, 1, t, e);
  }
  preScale(t, e) {
    return this.multiplyMatrices(this, O.fromScale(t, e));
  }
  postScale(t, e) {
    return this.multiplyMatrices(O.fromScale(t, e), this);
  }
  preRotate(t) {
    return this.multiplyMatrices(this, O.fromRotate(t));
  }
  preRotateDegrees(t) {
    return this.preRotate(t * Math.PI / 180);
  }
  postRotate(t) {
    return this.multiplyMatrices(O.fromRotate(t), this);
  }
  postRotateDegrees(t) {
    return this.postRotate(t * Math.PI / 180);
  }
  preTranslate(t, e) {
    return this.multiplyMatrices(this, O.fromTranslate(t, e));
  }
  postTranslate(t, e) {
    return this.multiplyMatrices(O.fromTranslate(t, e), this);
  }
  fromTranslateRotationSkewScalePivot(t, e, i, n, r) {
    const l = Math.cos(e), o = Math.sin(e), a = Math.tan(i.x), h = Math.tan(i.y), u = t.x, f = t.y, y = n.x, m = n.y, k = (l + a * o) * y, p = (o + h * l) * y, b = (-o + a * l) * m, d = (l + h * -o) * m, _ = u - (k * r.x + b * r.y), v = f - (p * r.x + d * r.y);
    return this.set(k, p, b, d, _, v);
  }
  determinant() {
    return this.a * this.d - this.b * this.c;
  }
  invertMatrix(t) {
    const e = t.elements, i = e[0], n = e[1], r = 0, l = e[2], o = e[3], a = 0, h = e[4], u = e[5], f = 1;
    let y = t.determinant();
    if (y === 0)
      return this;
    const m = 1 / y, k = (o * f - a * u) * m, p = -(n * f - u * r) * m, b = -(l * f - h * a) * m, d = (i * f - r * r) * m, _ = (l * u - h * o) * m, v = -(i * u - h * n) * m;
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
    const e = Math.cos(t), i = Math.sin(t);
    return this.set(
      this.a * e + this.c * i,
      this.b * e + this.d * i,
      this.a * -i + this.c * e,
      this.b * -i + this.d * e,
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
    const t = this.elements, e = t[0], i = t[1], n = 0, r = t[2], l = t[3], o = 0, a = t[4], h = t[5], u = 1, f = l * u - o * h, y = -(i * u - h * n), m = -(r * u - a * o), k = e * u - n * n, p = r * h - a * l, b = -(e * h - a * i);
    return this.set(f, y, m, k, p, b);
  }
  mapPoints(t, e) {
    return e.map((i, n) => {
      this.mapPoint(t[n], e[n]);
    }), this;
  }
  mapPoint(t, e) {
    const i = e.x, n = e.y;
    return t.x = this.a * i + this.c * n + this.e, t.y = this.b * i + this.d * n + this.f, t;
  }
  mapXY(t, e, i) {
    i.x = this.a * t + this.c * e + this.e, i.y = this.b * t + this.d * e + this.f;
  }
  projection(t, e) {
    return this.set(2 / t, 0, 0, -2 / e, -1, 1);
  }
  equals(t) {
    return !this.elements.some((e, i) => t.elements[i] !== e);
  }
  equalsEpsilon(t, e = 1e-6) {
    return !this.elements.some((i, n) => Math.abs(t.elements[n] - i) > e);
  }
  fromArray(t, e = 0) {
    for (let i = 0; i < 6; i++)
      this.elements[i] = t[i + e];
    return this;
  }
  toArray(t = [], e = 0) {
    const i = this.elements;
    return t[e] = i[0], t[e + 1] = i[1], t[e + 2] = i[2], t[e + 3] = i[3], t[e + 4] = i[4], t[e + 5] = i[5], t;
  }
};
x(O, "EPSILON", 1e-6), x(O, "IDENTITY_MATRIX", O.default()), x(O, "pools", []), x(O, "poolSize", 100);
let ht = O;
const He = 5, us = 5;
var fs = /* @__PURE__ */ ((s) => (s[s.kSerpentine = 0] = "kSerpentine", s[s.kLoop = 1] = "kLoop", s[s.kLocalCusp = 2] = "kLocalCusp", s[s.kCuspAtInfinity = 3] = "kCuspAtInfinity", s[s.kQuadratic = 4] = "kQuadratic", s[s.kLineOrPoint = 5] = "kLineOrPoint", s))(fs || {}), Qt = /* @__PURE__ */ ((s) => (s[s.kCW_SkRotationDirection = 0] = "kCW_SkRotationDirection", s[s.kCCW_SkRotationDirection = 1] = "kCCW_SkRotationDirection", s))(Qt || {});
function S(s) {
  return T.fromPoint(s);
}
function I(s) {
  let t = c.default();
  return s.storePoint(t), t;
}
function J(s) {
  return s.clone().add(s);
}
function cs(s) {
  return K(pt + s * pt);
}
function ms(s, t, e) {
  let i = s - t, n = t - e;
  return i < 0 && (n = -n), +(i == 0 || n < 0);
}
function Ft(s, t, e) {
  if (s < 0 && (s = -s, t = -t), t == 0 || s == 0 || s >= t)
    return 0;
  let i = s / t;
  return as(i) || i == 0 ? 0 : (e.value = i, 1);
}
function Dt(s) {
  return s == 0 ? 0 : s;
}
function nt(s, t, e, i) {
  if (s == 0)
    return Dt(Ft(-e, t, i));
  let n = i.clone(), r = t * t - 4 * s * e;
  if (r < 0)
    return Dt(0);
  r = Zi(r);
  let l = $t(r);
  if (!qt(l))
    return Dt(0);
  let o = t < 0 ? -(t - l) / 2 : -(t + l) / 2;
  if (n.curIndex += Ft(o, s, n), n.curIndex += Ft(e, o, n), n.curIndex - i.curIndex == 2)
    if (i.get(0) > i.get(1)) {
      let a = i.get(0);
      i.set(0, i.get(1)), i.set(1, a);
    } else i.get(0) == i.get(1) && (n.curIndex -= 1);
  return Dt(n.curIndex - i.curIndex);
}
function Ct(s, t, e, i) {
  return e && e.copy(Ct(s, t)), i && i.copy(Ae(s, t)), e || I(new kt(s).eval(T.splat(t)));
}
function Ae(s, t) {
  if (t == 0 && s[0] == s[1] || t == 1 && s[1] == s[2])
    return s[2].clone().subtract(s[0]);
  let e = S(s[0]), i = S(s[1]), n = S(s[2]), r = i.clone().sub(e), o = n.clone().sub(i).sub(r).clone().mulScalar(t).add(r);
  return I(o.add(o));
}
function pe(s, t, e) {
  return s.clone().lerp(s, t, e);
}
function ys(s, t, e) {
  let i = S(s[0]), n = S(s[1]), r = S(s[2]), l = T.splat(e), o = pe(i, n, l), a = pe(n, r, l);
  t[0] = I(i), t[1] = I(o), t[2] = I(pe(o, a, l)), t[3] = I(a), t[4] = I(r);
}
function ds(s, t) {
  return Ee(s, t) && (s || t);
}
function xe(s, t) {
  return !ds(s.x - t.x, s.y - t.y);
}
function Ne(s, t) {
  let e = c.make(2);
  s.dot(t) >= 0 ? (e[0].copy(s), e[1].copy(t)) : s.cross(t) >= 0 ? (e[0].set(-s.y, +s.x), e[1].set(+t.y, -t.x)) : (e[0].set(+s.y, -s.x), e[1].set(-t.y, +t.x));
  let i = T.fromXY(e[0].x, e[1].x), n = T.fromXY(e[0].y, e[1].y), r = i.clone().mul(i).add(n.clone().mul(n)).sqrt().inverse();
  return i.mul(r), n.mul(r), c.create(i[0] + i[1], n[0] + n[1]);
}
function xr(s) {
  let t = s[1].clone().subtract(s[0]), e = s[2].clone().subtract(s[1]), i = Ne(t, e.clone().negate()), n = ie(t.dot(i), t.clone().subtract(e).dot(i));
  return n > 0 && n < 1 || (n = 0.5), n;
}
function Ke(s, t, e, i) {
  return Ft(s - t, s - t - t + e, i);
}
function ps(s, t = "x") {
  s.get(1)[t] = s.get(3)[t] = s.get(2)[t];
}
function xs(s, t) {
  let e = s[0].y, i = s[1].y, n = s[2].y;
  if (ms(e, i, n)) {
    let r = N.from([0]);
    if (Ft(e - i, e - i - i + n, r))
      return ys(s, t, r.value), ps(N.from(t), "y"), 1;
    i = X(e - i) < X(i - n) ? e : n;
  }
  return t[0].set(s[0].x, e), t[1].set(s[1].x, i), t[2].set(s[2].x, n), 0;
}
function ks(s) {
  let t = s[1].x - s[0].x, e = s[1].y - s[0].y, i = s[0].x - s[1].x - s[1].x + s[2].x, n = s[0].y - s[1].y - s[1].y + s[2].y, r = -(t * i + e * n), l = i * i + n * n;
  return l < 0 && (r = -r, l = -l), r <= 0 ? 0 : r >= l ? 1 : r / l;
}
function vi(s, t, e, i = 0) {
  for (let n = 0; n < e; n++)
    s[i + n].copy(t[n]);
}
function Ti(s, t) {
  let e = kt.default(), i = S(s[0]), n = S(s[1]), r = S(s[2]), l = S(s[3]);
  return e.fA = l.clone().add(n.clone().sub(r).mulScalar(3)).sub(i), e.fB = J(r.clone().sub(J(n)).add(i)), e.fC = n.clone().sub(i), I(e.eval(T.splat(t)));
}
function bs(s, t) {
  let e = S(s[0]), i = S(s[1]), n = S(s[2]), r = S(s[3]), l = i.clone().sub(n).mulScalar(3).add(r).sub(e), o = n.clone().sub(J(i)).add(e);
  return I(l.mulScalar(t).add(o));
}
function Pi(s, t, e = c.default()) {
  return t == 0 && s[0].equals(s[1]) || t == 1 && s[2].equals(s[3]) ? (t == 0 ? e.subtractVectors(s[2], s[0]) : e.subtractVectors(s[3], s[1]), !e.x && !e.y && e.subtractVectors(s[3], s[0])) : e.copy(Ti(s, t)), e;
}
function ne(s, t, e = c.default()) {
  return e.copy(I(new Ls(s).eval(T.splat(t)))), e;
}
function Mi(s, t, e, i, n) {
  e && ne(s, t, e), i && Pi(s, t, i), n && n.copy(bs(s, t));
}
function re(s, t, e, i, n) {
  let r = i - s + 3 * (t - e), l = 2 * (s - t - t + e), o = t - s;
  return nt(r, l, o, n);
}
function D(s, t, e) {
  return s.clone().lerp(s, t, e);
}
function ue(s, t, e) {
  if (e == 1) {
    vi(t, s, 4), t[4].copy(s[3]), t[5].copy(s[3]), t[6].copy(s[3]);
    return;
  }
  let i = S(s[0]), n = S(s[1]), r = S(s[2]), l = S(s[3]), o = T.splat(e), a = D(i, n, o), h = D(n, r, o), u = D(r, l, o), f = D(a, h, o), y = D(h, u, o), m = D(f, y, o);
  t[0] = I(i), t[1] = I(a), t[2] = I(f), t[3] = I(m), t[4] = I(y), t[5] = I(u), t[6] = I(l);
}
function gs(s, t, e, i) {
  if (i == 1) {
    ue(s, t, e), t[7].copy(s[3]), t[8].copy(s[3]), t[9].copy(s[3]);
    return;
  }
  let n = T.make(4), r = T.make(4), l = T.make(4), o = T.make(4), a = T.make(4);
  n.setElements([s[0].x, s[0].y, s[0].x, s[0].y]), r.setElements([s[1].x, s[1].y, s[1].x, s[1].y]), l.setElements([s[2].x, s[2].y, s[2].x, s[2].y]), o.setElements([s[3].x, s[3].y, s[3].x, s[3].y]), a.setElements([e, e, i, i]);
  let h = D(n, r, a), u = D(r, l, a), f = D(l, o, a), y = D(h, u, a), m = D(u, f, a), k = D(y, m, a), p = D(y, m, T.make(4).setElements([a[2], a[3], a[0], a[1]]));
  t[0] = c.create(n[0], n[1]), t[1] = c.create(h[0], h[1]), t[2] = c.create(y[0], y[1]), t[3] = c.create(k[0], k[1]), t[4] = c.create(p[0], p[1]), t[5] = c.create(p[2], p[3]), t[6] = c.create(k[2], k[3]), t[7] = c.create(m[2], m[3]), t[8] = c.create(f[2], f[3]), t[9] = c.create(o[2], o[3]);
}
function Si(s, t, e, i) {
  if (t)
    if (i == 0)
      vi(t, s, 4);
    else {
      let n = 0, r = 0, l = [];
      for (; n < i - 1; n += 2) {
        let o = T.splat(e[n]);
        if (n != 0) {
          let a = e[n - 1];
          o = o.clone().sub(T.splat(a)).div(T.splat(1 - a)).clmap(T.splat(0), T.splat(1));
        }
        l.length = 0, gs(s, l, o[0], o[1]), l.forEach((a, h) => {
          t[r + h] = a;
        }), r += 6, s = l.slice(6);
      }
      if (n < i) {
        let o = e[n];
        if (n != 0) {
          let a = e[n - 1];
          o = ct(ie(o - a, 1 - a), 0, 1);
        }
        l.length = 0, ue(s, l, o), l.forEach((a, h) => {
          t[r + h] = a;
        });
      }
    }
}
function kr(s, t) {
  ue(s, t, 0.5);
}
function _t(s, t, e) {
  return T.make(4).setElements([
    s[0] * t + e[0],
    s[1] * t + e[1],
    s[2] * t + e[2],
    s[3] * t + e[3]
  ]);
}
function _s(s, t) {
  return t >= 0 ? Math.abs(s) : -Math.abs(s);
}
function Ci(s, t, e, i) {
  let n = -0.5 * (t + _s(Math.sqrt(i), t)), r = -0.5 * n * s, l = Math.abs(n * n + r) < Math.abs(s * e + r) ? ie(n, s) : ie(e, n);
  return l > 0 && l < 1 || (l = 0.5), l;
}
function vs(s, t, e) {
  return Ci(s, t, e, t * t - 4 * s * e);
}
function br(s) {
  let t = s[0].equals(s[1]) ? s[2].clone().subtract(s[0]) : s[1].clone().subtract(s[0]), e = s[2].equals(s[3]) ? s[3].clone().subtract(s[1]) : s[3].clone().subtract(s[2]), i = Ne(t, e.clone().negate());
  const n = [
    T.fromArray([-1, 2, -1, 0]),
    T.fromArray([3, -4, 1, 0]),
    T.fromArray([-3, 2, 0, 0])
  ];
  let r = _t(
    n[0],
    s[0].x,
    _t(
      n[1],
      s[1].x,
      _t(n[2], s[2].x, T.fromArray([s[3].x, 0, 0, 0]))
    )
  ), l = _t(
    n[0],
    s[0].y,
    _t(
      n[1],
      s[1].y,
      _t(n[2], s[2].y, T.fromArray([s[3].y, 0, 0, 0]))
    )
  ), o = r.clone().mulScalar(i.x).add(l.clone().mulScalar(i.y)), a = 0, h = o[0], u = o[1], f = o[2], y = u * u - 4 * h * f;
  return y > 0 ? Ci(h, u, f, y) : (o = r.clone().mulScalar(t.x).add(l.clone().mulScalar(t.y)), h = o[0], u = o[1], h != 0 && (a = -u / (2 * h)), a > 0 && a < 1 || (a = 0.5), a);
}
function le(s, t = "x") {
  s.get(2)[t] = s.get(4)[t] = s.get(3)[t];
}
function Ri(s, t) {
  let e = N.from([0, 0]), i = re(
    s[0].y,
    s[1].y,
    s[2].y,
    s[3].y,
    e
  ), n = N.from(t);
  return Si(s, t, e.data, i), t && i > 0 && (le(n, "y"), i == 2 && (n.next(3), le(n, "y"))), i;
}
function gr(s, t) {
  let e = N.from([0, 0]), i = re(
    s[0].x,
    s[1].x,
    s[2].x,
    s[3].x,
    e
  );
  Si(s, t, e.data, i);
  let n = N.from(t);
  return t && i > 0 && (le(n, "x"), i == 2 && (n.next(3), le(n, "x"))), i;
}
function Ts(s, t) {
  let e = s[1].x - s[0].x, i = s[1].y - s[0].y, n = s[2].x - 2 * s[1].x + s[0].x, r = s[2].y - 2 * s[1].y + s[0].y, l = s[3].x + 3 * (s[1].x - s[2].x) - s[0].x, o = s[3].y + 3 * (s[1].y - s[2].y) - s[0].y;
  return nt(
    n * o - r * l,
    e * o - i * l,
    e * r - i * n,
    N.from(t)
  );
}
function Ps(s, t) {
  for (let e = t - 1; e > 0; --e)
    for (let i = e; i > 0; --i)
      if (s[i] < s[i - 1]) {
        let n = s[i];
        s[i] = s[i - 1], s[i - 1] = n;
      }
}
class kt {
  constructor(t, e, i) {
    x(this, "fA", T.make(2));
    x(this, "fB", T.make(2));
    x(this, "fC", T.make(2));
    if (t && e && i)
      this.fA.copy(t), this.fB.copy(e), this.fC.copy(i);
    else if (t) {
      let n = S(t[0]), r = S(t[1]), l = S(t[2]), o = J(r.clone().sub(n)), a = l.sub(J(r)).add(n);
      this.fA.copy(a), this.fB.copy(o), this.fC.copy(n);
    }
  }
  static default() {
    return new kt();
  }
  eval(t) {
    return this.fA.clone().mul(t).add(this.fB).mul(t).add(this.fC);
  }
}
function Ms(s, t) {
  for (let e = t; e > 1; --e)
    if (s.get(0) == s.get(1)) {
      for (let i = 1; i < e; ++i)
        s.set(i - 1, s.get(i));
      t -= 1;
    } else
      s.next();
  return t;
}
function Ss(s) {
  return rs(s, 0.3333333);
}
function Cs(s, t) {
  if (st(s[0]))
    return nt(s[1], s[2], s[3], N.from(t));
  let e, i, n, r, l;
  {
    let u = Se(s[0]);
    e = s[1] * u, i = s[2] * u, n = s[3] * u;
  }
  r = (e * e - i * 3) / 9, l = (2 * e * e * e - 9 * e * i + 27 * n) / 54;
  let o = r * r * r, a = l * l - o, h = e / 3;
  if (a < 0) {
    let u = os(ct(l / K(o), -1, 1)), f = -2 * K(r);
    return t[0] = ct(f * xt(u / 3) - h, 0, 1), t[1] = ct(f * xt((u + 2 * et) / 3) - h, 0, 1), t[2] = ct(f * xt((u - 2 * et) / 3) - h, 0, 1), Ps(t, 3), Ms(N.from(t), 3);
  } else {
    let u = X(l) + K(a);
    return u = Ss(u), l > 0 && (u = -u), u != 0 && (u += r / u), t[0] = ct(u - h, 0, 1), 1;
  }
}
function Je(s, t) {
  let e = s[1] - s[0], i = s[2] - 2 * s[1] + s[0], n = s[3] + 3 * (s[1] - s[2]) - s[0];
  t[0] = n * n, t[1] = 3 * i * n, t[2] = 2 * i * i + n * e, t[3] = e * i;
}
function Ii(s, t) {
  let e = new Array(4).fill(0), i = new Array(4).fill(0), n;
  for (Je(s.map((l) => l.x), e), Je(s.map((l) => l.y), i), n = 0; n < 4; n++)
    e[n] += i[n];
  return Cs(e, t);
}
function Rs(s) {
  return (s[1].distanceToSquared(s[0]) + s[2].distanceToSquared(s[1]) + s[3].distanceToSquared(s[2])) * 1e-8;
}
function $e(s, t, e) {
  let i = s[e].clone(), n = s[e + 1].clone().subtract(i), r = new Array(2).fill(0);
  for (let l = 0; l < 2; ++l) {
    let o = s[t + l].clone().subtract(i);
    r[l] = n.cross(o);
  }
  return r[0] * r[1] >= 0;
}
function Is(s) {
  if (s[0].equalsEpsilon(s[1]) || s[2].equalsEpsilon(s[3]) || $e(s, 0, 2) || $e(s, 2, 0))
    return -1;
  let t = new Array(3).fill(0), e = Ii(s, t);
  for (let i = 0; i < e; ++i) {
    let n = t[i];
    if (0 >= n || n >= 1)
      continue;
    let l = Ti(s, n).lengthSq(), o = Rs(s);
    if (l < o)
      return n;
  }
  return -1;
}
function ws(s, t, e) {
  const i = s[2] - s[0], n = s[1] - s[0], r = t * n;
  e[0] = t * i - i, e[1] = i - 2 * r, e[2] = r;
}
function Ge(s, t, e) {
  let i = new Array(3).fill(0);
  ws(s, t, i);
  let n = N.from([0, 0]);
  return nt(i[0], i[1], i[2], n) == 1 ? (e.value = n.get(0), 1) : 0;
}
function ke(s, t, e, i = "x") {
  let n = G(s[0][i], s[1][i], e), r = G(s[1][i], s[2][i], e);
  t[0][i] = n, t[1][i] = G(n, r, e), t[2][i] = r;
}
function Es(s, t, e) {
  e[0].set(s[0].x * 1, s[0].y * 1, 1), e[1].set(s[1].x * t, s[1].y * t, t), e[2].set(s[2].x * 1, s[2].y * 1, 1);
}
function be(s) {
  return c.create(s.x / s.z, s.y / s.z);
}
class ti {
  constructor(t) {
    x(this, "fNumer", kt.default());
    x(this, "fDenom", kt.default());
    let e = S(t.fPts[0]), i = S(t.fPts[1]), n = S(t.fPts[2]), r = T.splat(t.fW), l = i.clone().mul(r);
    this.fNumer.fC.copy(e), this.fNumer.fA.copy(n.clone().sub(J(l)).add(e)), this.fNumer.fB.copy(J(l.clone().sub(e))), this.fDenom.fC.setElements([1, 1]), this.fDenom.fB = J(r.clone().sub(this.fDenom.fC)), this.fDenom.fA.setElements([0 - this.fDenom.fB.x, 0 - this.fDenom.fB.y]);
  }
  eval(t) {
    let e = T.splat(t), i = this.fNumer.eval(e), n = this.fDenom.eval(e);
    return i.div(n);
  }
}
class Ls {
  constructor(t) {
    x(this, "fA", T.make(2));
    x(this, "fB", T.make(2));
    x(this, "fC", T.make(2));
    x(this, "fD", T.make(2));
    let e = S(t[0]), i = S(t[1]), n = S(t[2]), r = S(t[3]), l = T.splat(3);
    this.fA = i.clone().sub(n).mul(l).add(r).sub(e), this.fB = n.clone().sub(J(i)).add(e).mul(l), this.fC = i.clone().sub(e).mul(l), this.fD = e;
  }
  eval(t) {
    return this.fA.clone().mul(t).add(this.fB).mul(t).add(this.fC).mul(t).add(this.fD);
  }
}
class W {
  constructor(t, e, i, n) {
    x(this, "fPts", c.make(3));
    x(this, "fW", 0);
    t !== void 0 && this.set(t, e, i, n);
  }
  static default() {
    return new this();
  }
  static make(t) {
    return Array.from({ length: t }, () => new W());
  }
  copy(t) {
    return this.fPts[0] = t.fPts[0].clone(), this.fPts[1] = t.fPts[1].clone(), this.fPts[2] = t.fPts[2].clone(), this.fW = t.fW, this;
  }
  clone() {
    return new W().copy(this);
  }
  set(t, e, i, n) {
    Array.isArray(t) ? this.set(t[0], t[1], t[2], e) : t && e !== void 0 && i !== void 0 && n !== void 0 && (this.fPts[0].copy(t), this.fPts[1].copy(e), this.fPts[2].copy(i), this.setW(n));
  }
  setW(t) {
    this.fW = t > 0 && qt(t) ? t : 1;
  }
  // return false if infinity or NaN is generated; caller must check
  chopAt_2(t, e) {
    let i = ee.make(3), n = ee.make(3);
    Es(this.fPts, this.fW, i), ke(i, n, t, "x"), ke(i, n, t, "y"), ke(i, n, t, "z"), e[0].fPts[0] = this.fPts[0].clone(), e[0].fPts[1] = be(n[0]), e[0].fPts[2] = be(n[1]), e[1].fPts[0] = e[0].fPts[2].clone(), e[1].fPts[1] = be(n[2]), e[1].fPts[2] = this.fPts[2].clone();
    let r = K(n[1].z);
    return e[0].fW = n[0].z / r, e[1].fW = n[2].z / r, Ee(e[0].fPts[0].x, 14);
  }
  chopAt_3(t, e, i) {
    if (t == 0 || e == 1)
      if (t == 0 && e == 1) {
        i.copy(this);
        return;
      } else {
        let d = [W.default(), W.default()];
        if (this.chopAt_2(t || e, d)) {
          i.copy(d[+!!t]);
          return;
        }
      }
    let n = new ti(this), r = T.splat(t), l = n.fNumer.eval(r), o = n.fDenom.eval(r), a = T.splat((t + e) / 2), h = n.fNumer.eval(a), u = n.fDenom.eval(a), f = T.splat(e), y = n.fNumer.eval(f), m = n.fDenom.eval(f), k = J(h).sub(l.clone().add(y).mulScalar(0.5)), p = J(u).sub(o.clone().add(m).mulScalar(0.5));
    i.fPts[0] = I(l.clone().div(o)), i.fPts[1] = I(k.clone().div(p)), i.fPts[2] = I(y.clone().div(m));
    let b = p.clone().div(o.clone().mul(m).sqrt());
    i.fW = b[0];
  }
  evalAt(t) {
    return I(new ti(this).eval(t));
  }
  evalAt_3(t, e, i) {
    e && e.copy(this.evalAt(t)), i && i.copy(this.evalTangentAt(t));
  }
  evalTangentAt(t) {
    const e = this.fPts, i = this.fW;
    if (t == 0 && e[0] == e[1] || t == 1 && e[1] == e[2])
      return e[2].clone().subtract(e[0]);
    let n = S(e[0]), r = S(e[1]), l = S(e[2]), o = T.splat(i), a = l.clone().sub(n), h = r.clone().sub(n), u = o.clone().mul(h), f = o.clone().mul(a).sub(a), y = a.clone().sub(u).sub(u);
    return I(new kt(f, y, u).eval(T.splat(t)));
  }
  chop(t) {
    const e = this.fW, i = this.fPts, n = Se(V + e), r = S(i[0]).mulScalar(n), l = S(i[1]).mulScalar(e * n), o = S(i[2]).mulScalar(n), a = I(r.clone().add(l)), h = I(l.clone().add(o)), u = I(r.clone().mulScalar(0.5).add(l).add(o.clone().mulScalar(0.5)));
    t[0].fPts[0].copy(i[0]), t[0].fPts[1].copy(a), t[0].fPts[2].copy(u), t[1].fPts[0].copy(u), t[1].fPts[1].copy(h), t[1].fPts[2].copy(i[2]), t[0].fW = t[1].fW = cs(e);
  }
  computeAsQuadError(t) {
    const e = this.fW, i = this.fPts;
    let n = e - 1, r = n / (4 * (2 + n)), l = r * (i[0].x - 2 * i[1].x + i[2].x), o = r * (i[0].y - 2 * i[1].y + i[2].y);
    t.set(l, o);
  }
  asQuadTol(t) {
    const e = this.fW, i = this.fPts;
    let n = e - 1, r = n / (4 * (2 + n)), l = r * (i[0].x - 2 * i[1].x + i[2].x), o = r * (i[0].y - 2 * i[1].y + i[2].y);
    return l * l + o * o <= t * t;
  }
  computeQuadPOW2(t) {
    if (t < 0 || !qt(t) || !this.fPts.every((u) => u.isFinite()))
      return 0;
    const e = this.fW, i = this.fPts;
    let n = e - 1, r = n / (4 * (2 + n)), l = r * (i[0].x - 2 * i[1].x + i[2].x), o = r * (i[0].y - 2 * i[1].y + i[2].y), a = K(l * l + o * o), h = 0;
    for (h = 0; h < He && !(a <= t); ++h)
      a *= 0.25;
    return h;
  }
  chopIntoQuadsPOW2(t, e) {
    const i = this.fPts;
    this.fW, t.get(0).copy(i[0]);
    let n = t.curIndex;
    const r = () => {
      const o = 2 * (1 << e) + 1;
      let a = t.curIndex - n;
      if (console.assert(a === o, "diff!==ptCount"), t.data.slice(t.curIndex, t.curIndex + o).some((h) => !h.isFinite()))
        for (let h = 1; h < o - 1; ++h)
          t.get(h).copy(i[1]);
    };
    if (e == He) {
      let l = [W.default(), W.default()];
      if (this.chop(l), xe(l[0].fPts[1], l[0].fPts[2]) && xe(l[1].fPts[0], l[1].fPts[1]))
        return t.get(1).copy(l[0].fPts[1]), t.get(2).copy(l[0].fPts[1]), t.get(3).copy(l[0].fPts[1]), t.get(4).copy(l[1].fPts[2]), e = 1, r(), 1 << e;
    }
    return t.next(), Ce(this, t, e), r(), 1 << e;
  }
  findMidTangent() {
    const t = this.fPts, e = this.fW;
    let i = t[1].clone().subtract(t[0]), n = t[2].clone().subtract(t[1]), r = Ne(i, n.clone().negate()), l = t[2].clone().subtract(t[0]).multiplyScalar(e - 1), o = t[2].clone().subtract(t[0]).subtract(t[1].clone().subtract(t[0]).multiplyScalar(e * 2)), a = t[1].clone().subtract(t[0]).multiplyScalar(e), h = r.dot(l), u = r.dot(o), f = r.dot(a);
    return vs(h, u, f);
  }
  findXExtrema(t) {
    return Ge(this.fPts.map((e) => e.x), this.fW, t);
  }
  findYExtrema(t) {
    return Ge(this.fPts.map((e) => e.y), this.fW, t);
  }
  chopAtXExtrema(t) {
    let e = A.from(0);
    if (this.findXExtrema(e)) {
      if (!this.chopAt_2(e.value, t))
        return !1;
      let i = t[0].fPts[2].x;
      return t[0].fPts[1].x = i, t[1].fPts[0].x = i, t[1].fPts[1].x = i, !0;
    }
    return !1;
  }
  chopAtYExtrema(t) {
    let e = A.from(0);
    if (this.findYExtrema(e)) {
      if (!this.chopAt_2(e.value, t))
        return !1;
      let i = t[0].fPts[2].y;
      return t[0].fPts[1].y = i, t[1].fPts[0].y = i, t[1].fPts[1].y = i, !0;
    }
    return !1;
  }
  computeTightBounds(t) {
    const e = this.fPts;
    let i = c.make(4);
    i[0].copy(e[0]), i[1].copy(e[2]);
    let n = 2, r = A.from(0);
    this.findXExtrema(r) && this.evalAt_3(r.value, i[n++]), this.findYExtrema(r) && this.evalAt_3(r.value, i[n++]), t.setBounds(i, n);
  }
  computeFastBounds(t) {
    t.setBounds(this.fPts, 3);
  }
  TransformW(t, e, i) {
    return e;
  }
  static BuildUnitArc(t, e, i, n, r) {
    let l = t.dot(e), o = t.cross(e);
    if (X(o) <= Le && l > 0 && (o >= 0 && i == 0 || o <= 0 && i == 1))
      return 0;
    i == 1 && (o = -o);
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
    ], f = Pe;
    let y = h;
    for (let d = 0; d < y; ++d)
      r[d].set(u[d * 2], u[d * 2 + 1], u[d * 2 + 2], f);
    const m = c.create(l, o), k = u[h * 2], p = k.dot(m);
    if (p < 1) {
      let d = c.create(k.x + l, k.y + o);
      const _ = K((1 + p) / 2);
      d.setLength(Se(_)), xe(k, d) || (r[y].set(k, d, m, _), y += 1);
    }
    let b = ht.identity();
    b.setSinCos(t.y, t.x), i == 1 && b.preScale(V, -V), n && b.premultiply(n);
    for (let d = 0; d < y; ++d)
      b.mapPoints(r[d].fPts, r[d].fPts);
    return y;
  }
}
function As(s, t) {
  let e = N.from([0, 0]), i = Ke(s[0].x, s[1].x, s[2].x, e);
  e.next(i), i += Ke(s[0].y, s[1].y, s[2].y, e), e.move(0);
  for (let n = 0; n < i; ++n)
    t[n] = Ct(s, e.get(n));
  return t[i].copy(s[2]), i + 1;
}
function Ns(s, t) {
  let e = N.from([0, 0, 0, 0]), i = 0;
  i = re(s[0].x, s[1].x, s[2].x, s[3].x, e), i += re(s[0].y, s[1].y, s[2].y, s[3].y, e), e.move(0);
  for (let n = 0; n < i; ++n)
    Mi(s, e.get(n), t[n], null, null);
  return t[i].copy(s[3]), i + 1;
}
function Ws(s, t, e) {
  let i = new W();
  i.set(s[0], s[1], s[2], t);
  let n = [A.from(0), A.from(0)], r = i.findXExtrema(n[0]);
  r += i.findYExtrema(n[1]);
  for (let l = 0; l < r; ++l)
    e[l] = i.evalAt(n[l].value);
  return e[r].copy(s[2]), r + 1;
}
function Xt(s, t, e) {
  return (s - t) * (e - t) <= 0;
}
function Ce(s, t, e) {
  if (e === 0)
    return t.get(0).copy(s.fPts[1]), t.get(1).copy(s.fPts[2]), t.next(2), t;
  {
    const i = W.make(2);
    s.chop(i);
    const n = s.fPts[0].y;
    let r = s.fPts[2].y;
    if (Xt(n, s.fPts[1].y, r)) {
      let l = i[0].fPts[2].y;
      if (!Xt(n, l, r)) {
        let o = Math.abs(l - n) < Math.abs(l - r) ? n : r;
        i[0].fPts[2].y = i[1].fPts[0].y = o;
      }
      Xt(n, i[0].fPts[1].y, i[0].fPts[2].y) || (i[0].fPts[1].y = n), Xt(i[1].fPts[0].y, i[1].fPts[1].y, r) || (i[1].fPts[1].y = r);
    }
    return --e, Ce(i[0], t, e), Ce(i[1], t, e);
  }
}
class _r {
  constructor() {
    x(this, "fQuadCount", 0);
  }
  computeQuads(t, e, i) {
    if (t instanceof W) {
      i = e;
      let n = t.computeQuadPOW2(i);
      this.fQuadCount = 1 << n;
      let r = N.from(c.make(1 + 2 * this.fQuadCount));
      return this.fQuadCount = t.chopIntoQuadsPOW2(r, n), r.data;
    } else {
      let n = new W(t, e);
      return this.computeQuads(n, i);
    }
  }
}
function jt(s, t, e, i) {
  return s + t > e ? Math.min(i, e / (s + t)) : i;
}
function Fs(s, t) {
  if (Number.isNaN(s) || Number.isNaN(t)) return NaN;
  if (s === t) return t;
  const e = new ArrayBuffer(4), i = new Float32Array(e), n = new Int32Array(e);
  return i[0] = s, s === 0 ? (n[0] = 2147483649, i[0]) : (s < t == s > 0 ? n[0]++ : n[0]--, i[0]);
}
function Zt(s, t, e, i) {
  if (e.value = e.value * t, i.value = i.value * t, e.value + i.value > s) {
    let n = e, r = i;
    if (n > r) {
      let a = n;
      n = r, r = a;
    }
    let l = n, o = s - l.value;
    for (; o + l.value > s; )
      o = Fs(o, 0);
    r.value = o;
  }
}
function Ut(s, t) {
  s.value + t.value == s.value ? t.value = 0 : s.value + t.value == t.value && (s.value = 0);
}
function ei(s, t, e) {
  return t <= e && s <= e - t && t + s <= e && e - s >= t && s >= 0;
}
function ii(s) {
  return s[
    0
    /* kUpperLeft_Corner */
  ].x == s[
    3
    /* kLowerLeft_Corner */
  ].x && s[
    0
    /* kUpperLeft_Corner */
  ].y == s[
    1
    /* kUpperRight_Corner */
  ].y && s[
    1
    /* kUpperRight_Corner */
  ].x == s[
    2
    /* kLowerRight_Corner */
  ].x && s[
    3
    /* kLowerLeft_Corner */
  ].y == s[
    2
    /* kLowerRight_Corner */
  ].y;
}
function si(s) {
  let t = !0;
  for (let e = 0; e < 4; ++e)
    s[e].x <= 0 || s[e].y <= 0 ? (s[e].x = 0, s[e].y = 0) : t = !1;
  return t;
}
const vt = 0, ut = 1, at = 2, At = 3, Ht = 4, ge = 5, qs = 5;
var wi = /* @__PURE__ */ ((s) => (s[s.kUpperLeft_Corner = 0] = "kUpperLeft_Corner", s[s.kUpperRight_Corner = 1] = "kUpperRight_Corner", s[s.kLowerRight_Corner = 2] = "kLowerRight_Corner", s[s.kLowerLeft_Corner = 3] = "kLowerLeft_Corner", s))(wi || {});
const ft = 0, Tt = 1, Pt = 2, Mt = 3, mt = class mt {
  constructor() {
    x(this, "fRect", q.makeEmpty());
    x(this, "fType", 0);
    x(this, "fRadii", [c.zero(), c.zero(), c.zero(), c.zero()]);
  }
  static default() {
    return new this();
  }
  static from(t, e, i = vt) {
    const n = new this();
    return n.fRect = t, n.fRadii.forEach((r, l) => {
      r.copy(e[l]);
    }), n.fType = i, n;
  }
  getType() {
    return this.fType;
  }
  get type() {
    return this.getType();
  }
  isEmpty() {
    return vt == this.getType();
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
    return Ht == this.getType();
  }
  isComplex() {
    return ge == this.getType();
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
  static makeRectXY(t, e, i) {
    let n = this.default();
    return n.setRectXY(t, e, i), n;
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
    let e = this.fRect.halfWidth, i = this.fRect.halfHeight;
    if (e == 0 || i == 0)
      this.setRadiiEmpty(), this.fType = ut;
    else {
      for (let n = 0; n < 4; ++n)
        this.fRadii[n].set(e, i);
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
  setRectXY(t, e, i) {
    if (!this.initializeRect(t))
      return;
    const n = this.fRect;
    if (Ee(e, i) || (e = i = 0), n.width < e + e || n.height < i + i) {
      let r = Math.min(n.width / (e + e), n.height / (i + i));
      e *= r, i *= r;
    }
    if (e <= 0 || i <= 0) {
      this.setRect(t);
      return;
    }
    for (let r = 0; r < 4; ++r)
      this.fRadii[r].set(e, i);
    this.fType = At, e >= $(n.width) && i >= $(n.height) && (this.fType = at);
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
  setNinePatch(t, e, i, n, r) {
    if (!this.initializeRect(t))
      return;
    const l = this.fRect;
    if (!hs([e, i, n, r], 4)) {
      this.setRect(t);
      return;
    }
    e = Math.max(e, 0), i = Math.max(i, 0), n = Math.max(n, 0), r = Math.max(r, 0);
    let a = V;
    e + n > l.width && (a = l.width / (e + n)), i + r > l.height && (a = Math.min(a, l.height / (i + r))), a < V && (e *= a, i *= a, n *= a, r *= a), e == n && i == r ? e >= $(l.width) && i >= $(l.height) ? this.fType = at : e == 0 || i == 0 ? (this.fType = ut, e = 0, i = 0, n = 0, r = 0) : this.fType = At : this.fType = Ht, this.fRadii[ft].set(e, i), this.fRadii[Tt].set(n, i), this.fRadii[Pt].set(n, r), this.fRadii[Mt].set(e, r);
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
      if (!e.every((i) => Number.isFinite(i.x))) {
        this.setRect(t);
        return;
      }
      if (this.fRadii.forEach((i, n) => {
        i.copy(e[n]);
      }), si(this.fRadii)) {
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
    return t.fRect == e.fRect && Ue(t.fRadii.map((i) => i.x), e.fRadii.map((i) => i.x), 4);
  }
  /** Returns true if bounds and radii in a are not equal to bounds and radii in b.
  
         a and b are not equal if either contain NaN. a and b are equal if members
         contain zeroes with different signs.
  
         @param a  SkRect bounds and radii to compare
         @param b  SkRect bounds and radii to compare
         @return   true if members are not equal
     */
  notEquals(t, e) {
    return t.fRect != e.fRect || !Ue(t.fRadii.map((i) => i.x), e.fRadii.map((i) => i.x), 4);
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
  insetRect(t, e, i) {
    let r = this.fRect.makeInset(t, e), l = !1;
    if (r.right <= r.left && (l = !0, r.left = r.right = Xe(r.left, r.right)), r.bottom <= r.top && (l = !0, r.top = r.bottom = Xe(r.top, r.bottom)), l) {
      i.fRect.copy(r), i.setRadiiEmpty(), i.fType = vt;
      return;
    }
    if (!r.isFinite()) {
      i.setEmpty();
      return;
    }
    let o = [c.zero(), c.zero(), c.zero(), c.zero()];
    o.forEach((a, h) => {
      a.copy(this.fRadii[h]);
    });
    for (let a = 0; a < 4; ++a)
      o[a].x && (o[a].x -= t), o[a].y && (o[a].y -= e);
    i.setRectRadii(r, o);
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
  outsetRect(t, e, i) {
    this.insetRect(-t, -e, i);
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
    let t = this.fRadii, e = t[0].x == 0 && t[0].y == 0, i = t[0].x == 0 || t[0].y == 0, n = !0;
    for (let a = 1; a < 4; ++a)
      (t[a].x != 0 || t[a].y != 0) && (e = !1), (t[a].x != t[a - 1].x || t[a].y != t[a - 1].y) && (n = !1), t[a].x != 0 && t[a].y != 0 && (i = !1);
    let r = ii(t), l = this.fType, o = this.fRect;
    if (l < 0 || l > qs)
      return !1;
    switch (l) {
      case vt:
        if (!o.isEmpty() || !e || !n || !i)
          return !1;
        break;
      case ut:
        if (o.isEmpty() || !e || !n || !i)
          return !1;
        break;
      case at:
        if (o.isEmpty() || e || !n || i)
          return !1;
        for (let a = 0; a < 4; ++a)
          if (!U(t[a].x, o.halfWidth) || !U(t[a].y, o.halfHeight))
            return !1;
        break;
      case At:
        if (o.isEmpty() || e || !n || i)
          return !1;
        break;
      case Ht:
        if (o.isEmpty() || e || n || i || !r)
          return !1;
        break;
      case ge:
        if (o.isEmpty() || e || n || i || r)
          return !1;
        break;
    }
    return !0;
  }
  areRectAndRadiiValid(t, e) {
    if (!t.isFinite() || !t.isSorted())
      return !1;
    for (let i = 0; i < 4; ++i)
      if (!ei(e[i].x, t.left, t.right) || !ei(e[i].y, t.top, t.bottom))
        return !1;
    return !0;
  }
  transform(t, e) {
    if (!e)
      return !1;
    if (t.isIdentity())
      return e.copy(this), !0;
    let i = q.makeEmpty();
    if (!i.isFinite() || i.isEmpty())
      return !1;
    if (e.fRect = i, e.fType = this.fType, ut == this.fType)
      return !0;
    if (at == this.fType) {
      for (let a = 0; a < 4; ++a)
        e.fRadii[a].x = $(i.width), e.fRadii[a].y = $(i.height);
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
    return t.isFinite() ? (this.fRect = t.makeSorted(), this.fRect.isEmpty() ? (this.setRadiiEmpty(), this.fType = vt, !1) : !0) : (this.setEmpty(), !1);
  }
  computeType() {
    const t = this.fRect;
    if (t.isEmpty()) {
      this.fType = vt;
      return;
    }
    let e = this.fRadii, i = !0, n = e[0].x == 0 || e[0].y == 0;
    for (let r = 1; r < 4; ++r)
      e[r].x != 0 && e[r].y != 0 && (n = !1), (e[r].x != e[r - 1].x || e[r].y != e[r - 1].y) && (i = !1);
    if (n) {
      this.fType = ut;
      return;
    }
    if (i) {
      e[0].x >= $(t.width) && e[0].y >= $(t.height) ? this.fType = at : this.fType = At;
      return;
    }
    ii(e) ? this.fType = Ht : this.fType = ge, this.isValid() || this.setRect(this.rect());
  }
  checkCornerContainment(t, e) {
    let i = c.default(), n;
    const r = this.fRect, l = this.fRadii;
    if (at == this.type)
      i.set(t - r.centerX, e - r.centerY), n = ft;
    else if (t < r.left + l[ft].x && e < r.top + l[ft].y)
      n = ft, i.set(
        t - (r.left + l[ft].x),
        e - (r.top + l[ft].y)
      );
    else if (t < r.left + l[Mt].x && e > r.bottom - l[Mt].y)
      n = Mt, i.set(
        t - (r.left + l[Mt].x),
        e - (r.bottom - l[Mt].y)
      );
    else if (t > r.right - l[Tt].x && e < r.top + l[Tt].y)
      n = Tt, i.set(
        t - (r.right - l[Tt].x),
        e - (r.top + l[Tt].y)
      );
    else if (t > r.right - l[Pt].x && e > r.bottom - l[Pt].y)
      n = Pt, i.set(
        t - (r.right - l[Pt].x),
        e - (r.bottom - l[Pt].y)
      );
    else
      return !0;
    return Lt(i.x) * Lt(l[n].y) + Lt(i.y) * Lt(l[n].x) <= Lt(l[n].x * l[n].x);
  }
  // Returns true if the radii had to be scaled to fit rect
  scaleRadii() {
    let t = 1;
    const e = this.fRect, i = this.fRadii;
    let n = e.right - e.left, r = e.bottom - e.top;
    t = jt(i[0].x, i[1].x, n, t), t = jt(i[1].y, i[2].y, r, t), t = jt(i[2].x, i[3].x, n, t), t = jt(i[3].y, i[0].y, r, t);
    let l = A.from(i[0].x), o = A.from(i[1].x), a = A.from(i[2].x), h = A.from(i[3].x), u = A.from(i[0].y), f = A.from(i[1].y), y = A.from(i[2].y), m = A.from(i[3].y);
    return Ut(l, o), Ut(f, y), Ut(a, h), Ut(m, u), t < 1 && (Zt(n, t, l, o), Zt(r, t, f, y), Zt(n, t, a, h), Zt(r, t, m, u)), i[0].set(l.value, u.value), i[1].set(o.value, f.value), i[2].set(a.value, y.value), i[3].set(h.value, m.value), si(i), this.computeType(), t < 1;
  }
};
x(mt, "Corner", wi);
let yt = mt;
var dt = /* @__PURE__ */ ((s) => (s[s.kWinding = 0] = "kWinding", s[s.kEvenOdd = 1] = "kEvenOdd", s[s.kInverseWinding = 2] = "kInverseWinding", s[s.kInverseEvenOdd = 3] = "kInverseEvenOdd", s))(dt || {}), F = /* @__PURE__ */ ((s) => (s[s.kCW = 0] = "kCW", s[s.kCCW = 1] = "kCCW", s))(F || {}), tt = /* @__PURE__ */ ((s) => (s[s.kLine_SkPathSegmentMask = 1] = "kLine_SkPathSegmentMask", s[s.kQuad_SkPathSegmentMask = 2] = "kQuad_SkPathSegmentMask", s[s.kConic_SkPathSegmentMask = 4] = "kConic_SkPathSegmentMask", s[s.kCubic_SkPathSegmentMask = 8] = "kCubic_SkPathSegmentMask", s))(tt || {}), g = /* @__PURE__ */ ((s) => (s[s.kMove = 0] = "kMove", s[s.kLine = 1] = "kLine", s[s.kQuad = 2] = "kQuad", s[s.kConic = 3] = "kConic", s[s.kCubic = 4] = "kCubic", s[s.kClose = 5] = "kClose", s))(g || {}), R = /* @__PURE__ */ ((s) => (s[
  s.kMoveTo = 0
  /* kMove */
] = "kMoveTo", s[
  s.kLineTo = 1
  /* kLine */
] = "kLineTo", s[
  s.kQuadCurveTo = 2
  /* kQuad */
] = "kQuadCurveTo", s[
  s.kConicTo = 3
  /* kConic */
] = "kConicTo", s[
  s.kCubicCurveTo = 4
  /* kCubic */
] = "kCubicCurveTo", s[
  s.kClose = 5
  /* kClose */
] = "kClose", s[s.kDone = 6] = "kDone", s))(R || {});
function Qs(s) {
  return (s & 2) != 0;
}
class zs {
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
    let e = this.path.fPts, i = this.pointIndex, n = this.verbs[this.verbIndex++];
    switch (n) {
      case g.kMove:
        if (this.needClose)
          return this.verbIndex--, n = this.autoClose(t), n == R.kClose && (this.needClose = !1), n;
        if (this.verbIndex === this.verbEnd)
          return R.kDone;
        this.movePoint.copy(e[i]), t[0] = c.fromPoint(e[i]), i += 1, this.lastPoint.copy(this.movePoint), this.needClose = this.forceClose;
        break;
      case g.kLine:
        t[0] = this.lastPoint.clone(), t[1] = c.fromPoint(e[i]), this.lastPoint.copy(e[i]), this.closeLine = !1, i += 1;
        break;
      case g.kQuad:
        t[0] = this.lastPoint.clone(), t[1] = c.fromPoint(e[i]), t[2] = c.fromPoint(e[i + 1]), this.lastPoint.copy(e[i + 1]), i += 2;
        break;
      case g.kCubic:
        t[0] = this.lastPoint.clone(), t[1] = c.fromPoint(e[i]), t[2] = c.fromPoint(e[i + 1]), t[3] = c.fromPoint(e[i + 2]), this.lastPoint.copy(e[i + 2]), i += 3;
        break;
      case g.kClose:
        n = this.autoClose(t), n == R.kLineTo ? this.verbIndex-- : this.needClose = !1, this.lastPoint.copy(this.movePoint);
        break;
    }
    return this.pointIndex = i, n;
  }
}
function Ei(s, t, e) {
  let i = new Array(4).fill(0);
  i[0] = s[0].y - t, i[1] = s[1].y - t, i[2] = s[2].y - t, i[3] = s[3].y - t;
  {
    let n = 0, r = 0;
    if (i[0] < 0) {
      if (i[3] < 0)
        return !1;
      n = 0, r = V;
    } else if (i[0] > 0) {
      if (i[3] > 0)
        return !1;
      n = V, r = 0;
    } else
      return e.value = 0, !0;
    const l = V / 65536;
    do {
      let o = (r + n) / 2, a = G(i[0], i[1], o), h = G(i[1], i[2], o), u = G(i[2], i[3], o), f = G(a, h, o), y = G(h, u, o), m = G(f, y, o);
      if (m == 0)
        return e.value = o, !0;
      m < 0 ? n = o : r = o;
    } while (!(X(r - n) <= l));
    return e.value = (n + r) / 2, !0;
  }
}
function z(s, t, e) {
  return (s - t) * (e - t) <= 0;
}
function fe(s, t, e, i) {
  return e.y == i.y ? z(e.x, s, i.x) && s != i.x : s == e.x && t == e.y;
}
function Bs(s) {
  return s < 0 ? -1 : +(s > 0);
}
function Vs(s, t, e, i) {
  let n = s[0].x, r = s[0].y, l = s[1].x, o = s[1].y, a = o - r, h = 1;
  if (r > o) {
    let f = r;
    r = o, o = f, h = -1;
  }
  if (e < r || e > o)
    return 0;
  if (fe(t, e, s[0], s[1]))
    return i.value += 1, 0;
  if (e == o)
    return 0;
  let u = (l - n) * (e - s[0].y) - a * (t - n);
  return u ? Bs(u) == h && (h = 0) : ((t != l || e != s[1].y) && (i.value += 1), h = 0), h;
}
function Li(s, t, e) {
  return s == t ? !0 : s < t ? t <= e : t >= e;
}
function ce(s, t, e, i) {
  return (s * i + t) * i + e;
}
function Ys(s, t, e, i, n) {
  return ((s * n + t) * n + e) * n + i;
}
function ni(s, t, e, i) {
  let n = s[0].y, r = s[2].y, l = 1;
  if (n > r) {
    let u = n;
    n = r, r = u, l = -1;
  }
  if (e < n || e > r)
    return 0;
  if (fe(t, e, s[0], s[2]))
    return i.value += 1, 0;
  if (e == r)
    return 0;
  let o = N.from([0, 0]), a = nt(
    s[0].y - 2 * s[1].y + s[2].y,
    2 * (s[1].y - s[0].y),
    s[0].y - e,
    o
  ), h;
  if (a == 0)
    h = s[1 - l].x;
  else {
    let u = o.get(0), f = s[0].x, y = s[2].x - 2 * s[1].x + f, m = 2 * (s[1].x - f);
    h = ce(y, m, f, u);
  }
  return U(h, t) && (t != s[2].x || e != s[2].y) ? (i.value += 1, 0) : h < t ? l : 0;
}
function Os(s, t, e, i) {
  let n, r;
  n = r = t[0].x;
  for (let l = 1; l < s; ++l)
    n = Math.min(n, t[l].x), r = Math.max(r, t[l].x);
  e.value = n, i.value = r;
}
function Ai(s, t, e, i, n) {
  let r = i + 3 * (t - e) - s, l = 3 * (e - t - t + s), o = 3 * (t - s);
  return Ys(r, l, o, s, n);
}
function Ds(s, t, e, i) {
  let n = s[0].y, r = s[3].y, l = 1;
  if (n > r) {
    let f = n;
    n = r, r = f, l = -1;
  }
  if (e < n || e > r)
    return 0;
  if (fe(t, e, s[0], s[3]))
    return i.value += 1, 0;
  if (e == r)
    return 0;
  let o = A.from(0), a = A.from(0);
  if (Os(4, s, o, a), t < o.value)
    return 0;
  if (t > a.value)
    return l;
  let h = A.from(0);
  if (!Ei(s, e, h))
    return 0;
  let u = Ai(s[0].x, s[1].x, s[2].x, s[3].x, h.value);
  return U(u, t) && (t != s[3].x || e != s[3].y) ? (i.value += 1, 0) : u < t ? l : 0;
}
function Xs(s, t, e, i) {
  let n = Array.from({ length: 5 }, () => c.default()), r = 0;
  Li(s[0].y, s[1].y, s[2].y) || (r = xs(s, n), s = n);
  let l = ni(s, t, e, i);
  return r > 0 && (l += ni(s.slice(2), t, e, i)), l;
}
function js(s, t, e, i) {
  let n = Array.from({ length: 10 }, () => c.default()), r = Ri(s, n), l = 0;
  for (let o = 0; o <= r; ++o)
    l += Ds(n.slice(o * 3), t, e, i);
  return l;
}
function Ni(s, t, e) {
  let i = s[1] * t, n = s[0], r = s[2] - 2 * i + n, l = 2 * (i - n);
  return ce(r, l, n, e);
}
function Wi(s, t) {
  let e = 2 * (s - 1), i = 1, n = -e;
  return ce(n, e, i, t);
}
function ri(s, t, e, i) {
  const n = s.fPts;
  let r = n[0].y, l = n[2].y, o = 1;
  if (r > l) {
    let k = r;
    r = l, l = k, o = -1;
  }
  if (e < r || e > l)
    return 0;
  if (fe(t, e, n[0], n[2]))
    return i.value += 1, 0;
  if (e == l)
    return 0;
  let a = N.from([0, 0]), h = n[2].y, u = n[1].y * s.fW - e * s.fW + e, f = n[0].y;
  h += f - 2 * u, u -= f, f -= e;
  let y = nt(h, 2 * u, f, a), m = 0;
  if (y == 0)
    m = n[1 - o].x;
  else {
    let k = a.get(0);
    m = Ni(n.map((p) => p.x), s.fW, k) / Wi(s.fW, k);
  }
  return U(m, t) && (t != n[2].x || e != n[2].y) ? (i.value += 1, 0) : m < t ? o : 0;
}
function vr(s, t, e, i, n) {
  let r = new W(s, i), l = [W.default(), W.default()], o = Li(s[0].y, s[1].y, s[2].y) || !r.chopAtYExtrema(l), a = ri(o ? r : l[0], t, e, n);
  return o || (a += ri(l[1], t, e, n)), a;
}
function Zs(s, t, e, i) {
  let n = s[0].y, r = s[1].y;
  if (!z(n, e, r))
    return;
  let l = s[0].x, o = s[1].x;
  if (!z(l, t, o))
    return;
  let a = o - l, h = r - n;
  if (!U((t - l) * h, a * (e - n)))
    return;
  let u = c.default();
  u.set(a, h), i.push(u);
}
function Us(s, t, e, i) {
  if (!z(s[0].y, e, s[1].y) && !z(s[1].y, e, s[2].y) || !z(s[0].x, t, s[1].x) && !z(s[1].x, t, s[2].x))
    return;
  let n = N.from([0, 0]), r = nt(
    s[0].y - 2 * s[1].y + s[2].y,
    2 * (s[1].y - s[0].y),
    s[0].y - e,
    n
  );
  for (let l = 0; l < r; ++l) {
    let o = n.get(l), a = s[0].x, h = s[2].x - 2 * s[1].x + a, u = 2 * (s[1].x - a), f = ce(h, u, a, o);
    U(t, f) && i.push(Ae(s, o));
  }
}
function Hs(s, t, e, i) {
  if (!z(s[0].y, e, s[1].y) && !z(s[1].y, e, s[2].y) && !z(s[2].y, e, s[3].y) || !z(s[0].x, t, s[1].x) && !z(s[1].x, t, s[2].x) && !z(s[2].x, t, s[3].x))
    return;
  let n = Array.from({ length: 10 }, () => c.default()), r = Ri(s, n);
  for (let l = 0; l <= r; ++l) {
    let o = n.slice(l * 3), a = A.from(0);
    if (!Ei(o, e, a))
      continue;
    let h = Ai(o[0].x, o[1].x, o[2].x, o[3].x, a.value);
    if (!U(t, h))
      continue;
    let u = c.default();
    Mi(o, a.value, null, u, null), i.push(u);
  }
}
function Tr(s, t, e, i, n) {
  if (!z(s[0].y, e, s[1].y) && !z(s[1].y, e, s[2].y) || !z(s[0].y, t, s[1].y) && !z(s[1].y, t, s[2].y))
    return;
  let r = N.from([0, 0]), l = s[2].y, o = s[1].y * i - e * i + e, a = s[0].y;
  l += a - 2 * o, o -= a, a -= e;
  let h = nt(l, 2 * o, a, r);
  for (let u = 0; u < h; ++u) {
    let f = r.get(u), y = Ni(s.map((k) => k.y), i, f) / Wi(i, f);
    if (!U(t, y))
      continue;
    let m = new W(s, i);
    n.push(m.evalTangentAt(f));
  }
}
var Fi = /* @__PURE__ */ ((s) => (s[s.kIsA_JustMoves = 0] = "kIsA_JustMoves", s[s.kIsA_MoreThanMoves = 1] = "kIsA_MoreThanMoves", s[s.kIsA_Oval = 2] = "kIsA_Oval", s[s.kIsA_RRect = 3] = "kIsA_RRect", s))(Fi || {});
function li(s, t) {
  return U(s.x, t.x) && U(s.y, t.y);
}
function oi(s, t, e, i, n) {
  let r = s * Math.PI / 180, l = (s + t) * Math.PI / 180;
  if (e.y = Gt(r), e.x = te(r), i.y = Gt(l), i.x = te(l), e.equals(i)) {
    let o = Math.abs(t);
    if (o < 360 && o > 359) {
      let a = Hi(1953125e-9, t);
      do
        l -= a, i.y = Gt(l), i.x = te(l);
      while (e.equals(i));
    }
  }
  n.value = t > 0 ? Qt.kCW_SkRotationDirection : Qt.kCCW_SkRotationDirection;
}
function ai(s, t, e, i) {
  return e == 0 && (t == 0 || t == 360) ? (i.set(s.right, s.centerX), !0) : s.width == 0 && s.height == 0 ? (i.set(s.right, s.top), !0) : !1;
}
function hi(s, t, e, i, n, r) {
  let l = ht.fromScale($(s.width), $(s.height));
  l.postTranslate(s.centerX, s.centerY);
  let o = W.BuildUnitArc(t, e, i, l, n);
  return o == 0 && l.mapXY(e.x, e.y, r), o;
}
const he = class he {
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
    return Qs(this.getFillType());
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
    return he.default().copy(this);
  }
  // 忽略第一个轮廓的最后一个点
  reversePathTo(t) {
    if (t.fVerbs.length == 0) return this;
    const e = 0;
    let i = t.countVerbs();
    const n = t.fVerbs, r = t.fPts;
    let l = r.length - 1;
    const o = t.fConicWeights;
    let a = t.fConicWeights.length;
    for (; i > e; ) {
      let h = n[--i];
      switch (l -= ui(h), h) {
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
    let i = t.countVerbs();
    const n = t.fVerbs, r = t.fPts;
    let l = r.length;
    const o = t.fConicWeights;
    let a = t.fConicWeights.length, h = !0, u = !1;
    for (; i > e; ) {
      let f = n[--i], y = ui(f);
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
    let t = q.makeEmpty(), e = this.fPts;
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
    let i = typeof t == "number" ? c.create(t, e) : t;
    return this.fLastMoveIndex = this.fPts.length, this.fPts.push(i), this.fVerbs.push(g.kMove), this.fLastMovePoint.copy(i), this.fNeedsMoveVerb = !1, this;
  }
  lineTo(t, e) {
    let i = typeof t == "number" ? c.create(t, e) : t;
    return this.ensureMove(), this.fPts.push(i), this.fVerbs.push(g.kLine), this.fSegmentMask |= tt.kLine_SkPathSegmentMask, this;
  }
  quadTo(t, e, i, n) {
    let r = typeof t == "number" ? c.create(t, e) : t, l = typeof e == "number" ? c.create(i, n) : e;
    return this.ensureMove(), this.fPts.push(r), this.fPts.push(l), this.fVerbs.push(g.kQuad), this.fSegmentMask |= tt.kQuad_SkPathSegmentMask, this;
  }
  conicTo(t, e, i, n, r) {
    let l = typeof t == "number" ? c.create(t, e) : t, o = typeof e == "number" ? c.create(i, n) : e, a = typeof t == "number" ? r : i;
    if (!(a > 0))
      this.lineTo(l);
    else if (!qt(a))
      this.lineTo(l), this.lineTo(o);
    else if (V == r)
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
  cubicTo(t, e, i, n, r, l) {
    this.ensureMove();
    let o = typeof t == "number" ? c.create(t, e) : t, a = typeof e == "number" ? c.create(i, n) : e, h = typeof i == "number" ? c.create(r, l) : i;
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
      for (let i = 0; i < e; ++i)
        this.fPts.push(t[i]), this.fVerbs.push(g.kLine);
      this.fSegmentMask |= tt.kLine_SkPathSegmentMask;
    }
    return this;
  }
  rLineTo(t, e) {
    return this.ensureMove(), this.lineTo(this.lastPoint.x + t, this.lastPoint.y + e);
  }
  rQuadTo(t, e) {
    this.ensureMove();
    let i = this.lastPoint;
    return this.quadTo(i.x + t.x, i.y + t.y, i.x + e.x, i.y + e.y);
  }
  rConicTo(t, e, i) {
    this.ensureMove();
    let n = this.lastPoint;
    return this.conicTo(n.x + t.x, n.y + t.y, n.x + e.x, n.y + e.y, i);
  }
  rCubicTo(t, e, i) {
    this.ensureMove();
    let n = this.lastPoint;
    return this.cubicTo(n.x + t.x, n.y + t.y, n.x + e.x, n.y + e.y, n.x + i.x, n.y + i.y);
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
  arcToOval(t, e, i, n) {
    if (t.width < 0 || t.height < 0)
      return this;
    this.fVerbs.length <= 0 && (n = !0);
    let l = c.default();
    if (ai(t, e, i, l))
      return n ? this.moveTo(l) : this.lineTo(l);
    let o = c.default(), a = c.default(), h = A.from(Qt.kCW_SkRotationDirection);
    oi(e, i, o, a, h);
    let u = c.default(), f = (k) => {
      n ? this.moveTo(k) : li(this.lastPoint, k) || this.lineTo(k);
    };
    if (o.equals(a)) {
      let k = je(e + i), p = t.width / 2, b = t.height / 2;
      return u.set(
        t.centerX + p * xt(k),
        t.centerY + b * Me(k)
      ), f(u), this;
    }
    let y = W.make(5), m = hi(t, o, a, h.value, y, u);
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
  arcTo(t, e, i, n, r) {
    const l = arguments.length, o = this.fVerbs, a = this.fPts;
    if (l === 3) {
      const h = t, u = e, f = i;
      if (this.ensureMove(), f == 0)
        return this.lineTo(h);
      let y = this.lastPoint, m = c.create(h.x - y.x, h.y - y.y).toNormalize(), k = c.create(u.x - h.x, u.y - h.y).toNormalize(), p = m.dot(k), b = m.cross(k);
      if (!m.isFinite() || !k.isFinite() || st($t(b)))
        return this.lineTo(h);
      let d = X($t(f * (1 - p) / b)), _ = h.x - d * m.x, v = h.y - d * m.y, P = c.create(k.x, k.y);
      P.setLength(d), this.lineTo(_, v);
      let M = K($t(pt + p * 0.5));
      return this.conicTo(h, h.clone().add(P), M);
    } else if (l === 4) {
      let h = t, u = e, f = i, y = n;
      if (h.width < 0 || h.height < 0)
        return this;
      o.length <= 0 && (y = !0);
      let m = c.default();
      if (ai(h, u, f, m))
        return y ? this.moveTo(m) : this.lineTo(m);
      let k = c.default(), p = c.default(), b = A.from(Qt.kCW_SkRotationDirection);
      oi(u, f, k, p, b);
      let d = c.default(), _ = (M) => {
        y ? this.moveTo(M) : li(a[this.fPts.length - 1], M) || this.lineTo(M);
      };
      if (k.equalsEpsilon(p)) {
        let M = je(u + f), E = h.width / 2, L = h.height / 2;
        return d.set(
          h.centerX + E * xt(M),
          h.centerY + L * Me(M)
        ), _(d), this;
      }
      let v = W.make(us), P = hi(h, k, p, b.value, v, d);
      if (P) {
        this.incReserve(P * 2 + 1);
        const M = v[0].fPts[0];
        _(M);
        for (let E = 0; E < P; ++E)
          this.conicTo(v[E].fPts[1], v[E].fPts[2], v[E].fW);
      } else
        _(d);
      return this;
    } else {
      let h = t, u = e, f = i, y = n, m = r;
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
      let P = p * p, M = b * b, E = v.x * v.x, L = v.y * v.y, w = E / P + L / M;
      w > 1 && (w = K(w), p *= w, b *= w), _.setScale(1 / p, 1 / b), _.preRotate(-u);
      let C = [c.default(), c.default()];
      _.mapPoints(C, k);
      let Y = C[1].clone().subtract(C[0]), rt = Y.x * Y.x + Y.y * Y.y, lt = Math.max(1 / rt - 0.25, 0), H = K(lt);
      y == F.kCCW != !!f && (H = -H), Y.multiplyScalar(H);
      let j = C[0].clone().add(C[1]);
      j.multiplyScalar(0.5), j.translate(-Y.y, Y.x), C[0].subtract(j), C[1].subtract(j);
      let ot = De(C[0].y, C[0].x), B = De(C[1].y, C[1].x) - ot;
      if (B < 0 && y == F.kCW ? B += et * 2 : B > 0 && y != F.kCW && (B -= et * 2), X(B) < et / (1e3 * 1e3))
        return this.lineTo(m);
      _.setRotate(u), _.preScale(p, b);
      let wt = ns(X(B / (2 * et / 3))), zt = B / wt, me = ls(0.5 * zt);
      if (!qt(me))
        return this;
      let ze = ot, Yi = K(pt + xt(zt) * pt), Bt = (Et) => Et == gi(Et), Oi = st(et / 2 - X(zt)) && Bt(p) && Bt(b) && Bt(m.x) && Bt(m.y);
      for (let Et = 0; Et < wt; ++Et) {
        let ye = ze + zt, Be = Gt(ye), Ve = te(ye);
        C[1].set(Ve, Be), C[1].add(j), C[0].copy(C[1]), C[0].translate(me * Be, -me * Ve);
        let Vt = [c.default(), c.default()];
        if (_.mapPoints(Vt, C), Oi)
          for (let Yt of Vt)
            Yt.x = de(Yt.x), Yt.y = de(Yt.y);
        this.conicTo(Vt[0], Vt[1], Yi), ze = ye;
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
  addArc(t, e, i) {
    if (t.isEmpty() || i == 0)
      return this;
    const n = is(360);
    if (i >= n || i <= -n) {
      let r = e / 90, l = de(r), o = r - l;
      if (U(o, 0)) {
        let a = (l + 1) % 4;
        return a = a < 0 ? a + 4 : a, this.addOval(
          t,
          i > 0 ? F.kCW : F.kCCW,
          a
        );
      }
    }
    return this.arcTo(t, e, i, !0);
  }
  addRect(t, e = F.kCW, i = 1) {
    let n = new _e(t, e, i);
    return this.moveTo(n.current), this.lineTo(n.next()), this.lineTo(n.next()), this.lineTo(n.next()), this.close();
  }
  addOval(t, e = F.kCW, i = 0) {
    const n = this.fIsA;
    this.incReserve(9, 6);
    let o = new Ks(t, e, i), a = new _e(t, e, i + (e == F.kCW ? 0 : 1));
    this.moveTo(o.current);
    for (let h = 0; h < 4; ++h)
      this.conicTo(a.next(), o.next(), Pe);
    return this.close(), n == 0 && (this.fIsA = 2, this.fIsACCW = e == F.kCCW, this.fIsAStart = i % 4), this;
  }
  addRRect(t, e = F.kCW, i = e == F.kCW ? 6 : 7) {
    const n = this.fIsA, r = t.getBounds();
    if (t.isRect() || t.isEmpty())
      this.addRect(r, e, (i + 1) / 2);
    else if (t.isOval())
      this.addOval(r, e, i / 2);
    else {
      const l = (i & 1) == +(e == F.kCW), o = Pe, a = l ? 9 : 10;
      this.incReserve(a);
      let h = new Js(t, e, i);
      const u = i / 2 + (e == F.kCW ? 0 : 1);
      let f = new _e(r, e, u);
      if (this.moveTo(h.current), l) {
        for (let y = 0; y < 3; ++y)
          this.conicTo(f.next(), h.next(), o), this.lineTo(h.next());
        this.conicTo(f.next(), h.next(), o);
      } else
        for (let y = 0; y < 4; ++y)
          this.lineTo(h.next()), this.conicTo(f.next(), h.next(), o);
      this.close();
    }
    return n == 0 && (this.fIsA = 3, this.fIsACCW = e == F.kCCW, this.fIsAStart = i % 8), this;
  }
  addCircle(t, e, i, n = F.kCW) {
    return i >= 0 && this.addOval(q.makeLTRB(t - i, e - i, t + i, e + i), n), this;
  }
  addPolygon(t, e, i) {
    return e <= 0 ? this : (this.moveTo(t[0]), this.polylineTo(t.slice(1), e - 1), i && this.close(), this);
  }
  getBounds() {
    const t = q.makeLTRB(1 / 0, 1 / 0, -1 / 0, -1 / 0);
    return t.setBounds(this.fPts, this.fPts.length), t;
  }
  computeTightBounds() {
    if (this.countVerbs() == 0)
      return q.makeEmpty();
    if (this.getSegmentMasks() == tt.kLine_SkPathSegmentMask)
      return this.getBounds();
    let t = new Array(5).fill(0).map(() => c.default()), e = c.create(1 / 0, 1 / 0), i = c.create(-1 / 0, -1 / 0), n = this.fPts, r = 0, l = 0;
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
          h = As(f, t), r += 2;
          break;
        case g.kConic:
          let y = [n[r - 1], n[r], n[r + 1]];
          h = Ws(y, this.fConicWeights[l++], t);
          break;
        case g.kCubic:
          let m = [n[r - 1], n[r], n[r + 1], n[r + 2]];
          h = Ns(m, t), r += 3;
          break;
        case g.kClose:
          break;
      }
      for (let f = 0; f < h; ++f) {
        let y = t[f];
        e.min(y), i.max(y);
      }
    }
    let o = q.makeEmpty();
    return o.setLTRB(e.x, e.y, i.x, i.y), o;
  }
  contains(t, e, i = "nonzero") {
    return this.setCanvasFillType(i), $s(t, e, this);
  }
  addPath(t) {
    for (let { type: e, p0: i, p1: n, p2: r, p3: l } of t)
      switch (e) {
        case g.kMove:
          this.moveTo(i);
          break;
        case g.kLine:
          this.lineTo(i);
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
    let i = this.fPts[t];
    for (let n = 1; n < e; n++)
      if (i.equals(this.fPts[n]))
        return !1;
    return !0;
  }
  *[Symbol.iterator]() {
    let t = 0, e = c.default();
    for (let i = 0; i < this.fVerbs.length; ++i) {
      let n = this.fVerbs[i];
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
    for (let { type: e, p0: i, p1: n, p2: r, p3: l } of this)
      switch (e) {
        case g.kMove:
          t.moveTo(i.x, i.y);
          break;
        case g.kLine:
          t.lineTo(i.x, i.y);
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
    for (let { type: e, p0: i, p1: n, p2: r, p3: l } of this)
      switch (e) {
        case g.kMove:
          t.push(["M", i.x, i.y]);
          break;
        case g.kLine:
          t.push(["L", i.x, i.y]);
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
x(he, "IsA", Fi);
let Rt = he;
const ui = (s) => {
  switch (s) {
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
class We {
  constructor(t, e, i) {
    x(this, "fPts", []);
    x(this, "size", 0);
    x(this, "fCurrent");
    x(this, "fAdvance");
    this.size = t, this.fPts = new Array(t), this.fCurrent = Math.trunc(i) % t, this.fAdvance = e == F.kCW ? 1 : t - 1;
  }
  get current() {
    return this.fPts[this.fCurrent];
  }
  next(t = 0) {
    return this.fCurrent = (this.fCurrent + t * this.fAdvance + this.fAdvance) % this.size, this.current;
  }
}
class Ks extends We {
  constructor(t, e, i) {
    super(4, e, i);
    const n = t.centerX, r = t.centerY;
    this.fPts[0] = c.create(n, t.top), this.fPts[1] = c.create(t.right, r), this.fPts[2] = c.create(n, t.bottom), this.fPts[3] = c.create(t.left, r);
  }
}
class _e extends We {
  constructor(t, e, i) {
    super(4, e, i), this.fPts[0] = c.create(t.left, t.top), this.fPts[1] = c.create(t.right, t.top), this.fPts[2] = c.create(t.right, t.bottom), this.fPts[3] = c.create(t.left, t.bottom);
  }
}
class Js extends We {
  constructor(t, e, i) {
    super(8, e, i);
    const n = t.getBounds(), r = n.left, l = n.top, o = n.right, a = n.bottom, h = t.fRadii, u = yt.Corner.kUpperLeft_Corner, f = yt.Corner.kUpperRight_Corner, y = yt.Corner.kLowerRight_Corner, m = yt.Corner.kLowerLeft_Corner;
    this.fPts[0] = c.create(r + h[u].x, l), this.fPts[1] = c.create(o - h[f].x, l), this.fPts[2] = c.create(o, l + h[f].y), this.fPts[3] = c.create(o, a - h[y].y), this.fPts[4] = c.create(o - h[y].x, a), this.fPts[5] = c.create(r + h[m].x, a), this.fPts[6] = c.create(r, a - h[m].y), this.fPts[7] = c.create(r, l + h[u].y);
  }
}
function $s(s, t, e) {
  const i = e.getFillType();
  let n = e.isInverseFillType();
  if (e.countVerbs() <= 0 || !e.getBounds().containPoint(s, t))
    return n;
  let l = new zs(e, !0), o = !1, a = 0, h = A.from(0), u = [c.default(), c.default(), c.default(), c.default()];
  do
    switch (l.next(u)) {
      case R.kMoveTo:
      case R.kClose:
        break;
      case R.kLineTo:
        a += Vs(u, s, t, h);
        break;
      case R.kQuadCurveTo:
        a += Xs(u, s, t, h);
        break;
      case R.kConicTo:
        break;
      case R.kCubicCurveTo:
        a += js(u, s, t, h);
        break;
      case R.kDone:
        o = !0;
        break;
    }
  while (!o);
  let f = dt.kEvenOdd == i || dt.kInverseEvenOdd == i;
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
        Zs(u, s, t, y);
        break;
      case R.kQuadCurveTo:
        Us(u, s, t, y);
        break;
      case R.kConicTo:
        break;
      case R.kCubicCurveTo:
        Hs(u, s, t, y);
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
          if (st(d.cross(p)) && Ze(p.x * d.x) <= 0 && Ze(p.y * d.y) <= 0) {
            y.splice(k, 1), y.splice(b, 1, y[y.length]);
            break;
          }
        }
    }
  } while (!o);
  return Number(y.length ^ Number(n));
}
var Gs = /* @__PURE__ */ ((s) => (s.Miter = "miter", s.Round = "round", s.Bevel = "bevel", s.MiterClip = "miter-clip", s))(Gs || {}), tn = /* @__PURE__ */ ((s) => (s.Butt = "butt", s.Round = "round", s.Square = "square", s))(tn || {}), en = /* @__PURE__ */ ((s) => (s.NonZero = "nonzero", s.EvenOdd = "evenodd", s))(en || {});
class Fe {
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
    return new Fe({
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
    let i = null;
    for (; this.verbIndex < e.length; ) {
      const n = e[this.verbIndex++];
      switch (n) {
        case g.kMove:
          this.pointsIndex += 1, i = t[this.pointsIndex - 1], this.lastMoveTo.copy(i), this.lastPoint.copy(this.lastMoveTo), yield { type: n, p0: t[this.pointsIndex - 1] };
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
class sn {
  constructor(t, e) {
    this.inner = t, this.outer = e;
  }
  swap() {
    [this.inner, this.outer] = [this.outer, this.inner];
  }
}
const Re = 0.707106781, Ie = (s, t, e, i, n) => {
  n.lineTo(e.x, e.y);
}, nn = (s, t, e, i, n) => {
  let r = t.clone();
  r.cw();
  let l = s.clone().add(r), o = l.clone().add(t);
  n.conicTo(
    o.x,
    o.y,
    l.x,
    l.y,
    Re
  ), o.copy(l).subtract(t), n.conicTo(
    o.x,
    o.y,
    e.x,
    e.y,
    Re
  );
}, rn = (s, t, e, i, n) => {
  let r = t.clone();
  r.cw(), i ? (n.setLastPoint(
    s.x + t.x + r.x,
    s.y + t.y + r.y
  ), n.lineTo(
    s.x - t.x + r.x,
    s.y - t.y + r.y
  )) : (n.lineTo(
    s.x + t.x + r.x,
    s.y + t.y + r.y
  ), n.lineTo(
    s.x - t.x + r.x,
    s.y - t.y + r.y
  ), n.lineTo(e.x, e.y));
};
function fi(s) {
  return Math.abs(s) <= Qe;
}
function qi(s) {
  return s >= 0 ? fi(1 - s) ? 3 : 2 : fi(1 + s) ? 0 : 1;
}
function qe(s, t) {
  return s.x * t.y > s.y * t.x;
}
function oe(s, t, e) {
  e.lineTo(s.x, s.y), e.lineTo(s.x - t.x, s.y - t.y);
}
const Qi = (s, t, e, i, n, r, l, o, a) => {
  function h(_, v, P, M, E, L, w, C, Y, rt) {
    if (C = C.clone(), C.multiplyScalar(P), w = w.clone(), L = L.clone(), rt) {
      w.normalize();
      let lt = L.dot(w), H = L.cross(w), j = 0;
      Math.abs(H) <= Qe ? j = 1 / Y : j = (1 / Y - lt) / H, L.multiplyScalar(P);
      let ot = L.clone();
      ot.cw();
      let gt = C.clone();
      gt.ccw();
      let B = c.default();
      B.addVectors(v, L).add(ot.clone().multiplyScalar(j));
      let wt = c.default();
      B.addVectors(v, C).add(gt.clone().multiplyScalar(j)), M ? _.outer.setLastPoint(B.x, B.y) : _.outer.lineTo(B.x, B.y), _.outer.lineTo(wt.x, wt.y);
    }
    E || _.outer.lineTo(v.x + C.x, v.y + C.y), oe(v, C, _.inner);
  }
  function u(_, v, P, M, E, L, w) {
    w = w.clone(), w.multiplyScalar(P), M ? _.outer.setLastPoint(v.x + L.x, v.y + L.y) : _.outer.lineTo(v.x + L.x, v.y + L.y), E || _.outer.lineTo(v.x + w.x, v.y + w.y), oe(v, w, _.inner);
  }
  let f = s.dot(e), y = qi(f), m = s.clone(), k = e.clone(), p = c.default();
  if (y == 3)
    return;
  if (y == 0) {
    o = !1, p.subtractVectors(k, m).multiplyScalar(i / 2), h(
      a,
      t,
      i,
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
  let b = !qe(m, k);
  if (b && (a.swap(), m.negate(), k.negate()), f == 0 && n <= Re) {
    p.addVectors(m, k).multiplyScalar(i), u(
      a,
      t,
      i,
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
      i,
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
  p.setLength(i / d), u(
    a,
    t,
    i,
    l,
    o,
    p,
    k
  );
}, ln = (s, t, e, i, n, r, l, o) => {
  let a = e.clone().multiplyScalar(i);
  qe(s, e) || (o.swap(), a.negate()), o.outer.lineTo(t.x + a.x, t.y + a.y), oe(t, a, o.inner);
}, on = (s, t, e, i, n, r, l, o) => Qi(s, t, e, i, n, !1, r, l, o), an = (s, t, e, i, n, r, l, o) => {
  Qi(
    s,
    t,
    e,
    i,
    n,
    !0,
    r,
    l,
    o
  );
}, we = (s, t, e, i, n, r, l, o) => {
  let a = s.dot(e);
  if (qi(a) == 3)
    return;
  let u = s.clone(), f = e.clone(), y = F.kCW;
  qe(u, f) || (o.swap(), u.negate(), f.negate(), y = F.kCCW);
  let m = ht.fromRows(i, 0, 0, i, t.x, t.y), k = new Array(5).fill(0).map(() => new W()), p = W.BuildUnitArc(u, f, y, m, k);
  if (p > 0) {
    k = k.slice(0, p);
    for (let b of k)
      o.outer.conicTo(b.fPts[1], b.fPts[2], b.fW);
    f.multiplyScalar(i), oe(t, f, o.inner);
  }
};
function ci(s, t, e, i, n, r) {
  return r.setLengthFrom((t.x - s.x) * e, (t.y - s.y) * e, 1) ? (r.ccw(), n.copy(r).multiplyScalar(i), !0) : !1;
}
function hn(s, t, e, i) {
  return i.setLengthFrom(s.x, s.y, 1) ? (i.ccw(), e.copy(i).multiplyScalar(t), !0) : !1;
}
class Kt {
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
function un(s) {
  let t = it(s[1].clone().sub(s[0])), e = it(s[2].clone().sub(s[1]));
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
  if (!fn(s))
    return [
      c.default(),
      2
      /* Quad */
    ];
  let i = ks(s);
  return i == 0 || i == 1 ? [
    c.default(),
    1
    /* Line */
  ] : [
    Ct(s, i),
    3
    /* Degenerate */
  ];
}
function it(s) {
  return +!s.canNormalize();
}
function fn(s) {
  let t = -1, e = 0, i = 0;
  for (let o = 0; o < 2; o++)
    for (let a = o + 1; a < 3; a++) {
      let h = s[a].clone().sub(s[o]), u = Math.max(Math.abs(h.x), Math.abs(h.y));
      t < u && (e = o, i = a, t = u);
    }
  console.assert(e <= 1), console.assert(i >= 1 && i <= 2), console.assert(e < i);
  let n = e ^ i ^ 3, l = t * t * 5e-6;
  return It(s[n], s[e], s[i]) <= l;
}
function It(s, t, e) {
  let i = e.clone().sub(t), n = s.clone().sub(t), r = i.dot(n), l = i.dot(i), o = r / l;
  return o >= 0 && o <= 1 ? c.create(
    t.x * (1 - o) + e.x * o,
    t.y * (1 - o) + e.y * o
  ).distanceToSquared(s) : s.distanceToSquared(t);
}
function cn(s, t, e) {
  let i = s[1].clone().sub(s[0]), n = [0, 0, 0];
  for (let h = 0; h < 3; h++)
    n[h] = (t[h].y - s[0].y) * i.x - (t[h].x - s[0].x) * i.y;
  let r = n[2], l = n[1], o = n[0];
  r += o - 2 * l, l -= o;
  let a = nt(r, 2 * l, o, N.from(e));
  return e.slice(0, a);
}
function ve(s, t, e) {
  return s.distanceToSquared(t) <= e * e;
}
function mi(s) {
  let t = s[1].clone().sub(s[0]), e = s[1].clone().sub(s[2]), i = t.lengthSquared(), n = e.lengthSquared();
  return i > n && ([t, e] = [e, t], n = i), t.setLength(n) ? t.dot(e) > 0 : !1;
}
function mn(s, t, e) {
  let i = Math.min(s[0].x, s[1].x, s[2].x);
  if (t.x + e < i)
    return !1;
  let n = Math.max(s[0].x, s[1].x, s[2].x);
  if (t.x - e > n)
    return !1;
  let r = Math.min(s[0].y, s[1].y, s[2].y);
  if (t.y + e < r)
    return !1;
  let l = Math.max(s[0].y, s[1].y, s[2].y);
  return !(t.y - e > l);
}
function yn(s, t, e) {
  let i = it(s[1].clone().sub(s[0])), n = it(s[2].clone().sub(s[1])), r = it(s[3].clone().sub(s[2]));
  if (i & n & r)
    return 0;
  if (i + n + r == 2)
    return 1;
  if (!dn(s))
    return e && (i ? e.copy(s[2]) : e.copy(s[1])), 2;
  let l = [0, 0, 0], o = Ii(s, l), a = 0;
  l = l.slice(0, o);
  for (let h of l) {
    if (0 >= h || h >= 1)
      continue;
    let u = ne(s, h);
    t[a] = c.create(u.x, u.y), !t[a].equals(s[0]) && !t[a].equals(s[3]) && (a += 1);
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
function dn(s) {
  let t = -1, e = 0, i = 0;
  for (let o = 0; o < 3; o++)
    for (let a = o + 1; a < 4; a++) {
      let h = s[a].clone().sub(s[o]), u = Math.max(Math.abs(h.x), Math.abs(h.y));
      t < u && (e = o, i = a, t = u);
    }
  let n = 1 + (2 >> i) >> e, r = e ^ i ^ n, l = t * t * 1e-5;
  return It(s[n], s[e], s[i]) <= l && It(s[r], s[e], s[i]) <= l;
}
const pn = {
  bevel: ln,
  miter: on,
  "miter-clip": an,
  round: we
}, xn = {
  butt: Ie,
  round: nn,
  square: rn
}, kn = 3, yi = [15, 78, 33, 33], Qe = 1 / 4096;
class Pr {
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
    x(this, "inner", Rt.default());
    x(this, "outer", Rt.default());
    x(this, "cusper", Rt.default());
    x(this, "stroke_type", 1);
    // 线段类型
    x(this, "recursion_depth", 0);
    // 递归深度
    x(this, "found_tangents", !1);
    // 是否找到切线
    x(this, "join_completed", !1);
  }
  static computeResolutionScale(t) {
    let e = c.create(t.a, t.b).length(), i = c.create(t.c, t.d).length();
    if (Number.isFinite(e) && Number.isFinite(i)) {
      let n = Math.max(e, i);
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
    return new sn(this.inner, this.outer);
  }
  close(t) {
    this.finishContour(!0, t);
  }
  moveTo(t) {
    this.segment_count > 0 && this.finishContour(!1, !1), this.segment_count = 0, this.first_pt.copy(t), this.prev_pt.copy(t), this.join_completed = !1;
  }
  finishContour(t, e) {
    const i = this;
    if (i.segment_count > 0) {
      if (t) {
        i.joiner(
          i.prev_unit_normal,
          i.prev_pt,
          i.first_unit_normal,
          i.radius,
          i.inv_miter_limit,
          i.prev_is_line,
          e,
          i.builders()
        ), i.outer.close();
        let n = i.inner.lastPoint ?? c.create(0, 0);
        i.outer.moveTo(n.x, n.y), i.outer.reversePathTo(i.inner), i.outer.close();
      } else {
        let n = i.inner.lastPoint ? c.fromPoint(i.inner.lastPoint) : c.create(0, 0), r = e ? i.inner : null;
        i.capper(
          i.prev_pt,
          i.prev_normal,
          n,
          r,
          i.outer
        ), i.outer.reversePathTo(i.inner), r = i.prev_is_line ? i.inner : null, i.capper(
          i.first_pt,
          i.first_normal.clone().negate(),
          i.first_outer_pt,
          r,
          i.outer
        ), i.outer.close();
      }
      i.cusper.isEmpty || (i.outer.addPath(i.cusper), i.cusper.reset());
    }
    i.inner.reset(), i.segment_count = -1, i.first_outer_pt_index_in_contour = i.outer.fPts.length;
  }
  preJoinTo(t, e, i, n) {
    const r = this;
    let l = r.prev_pt.x, o = r.prev_pt.y;
    if (!ci(
      r.prev_pt,
      t,
      r.res_scale,
      r.radius,
      i,
      n
    )) {
      if (r.capper === Ie)
        return !1;
      i.set(r.radius, 0), n.set(1, 0);
    }
    return r.segment_count == 0 ? (r.first_normal.copy(i), r.first_unit_normal.copy(n), r.first_outer_pt = c.create(l + i.x, o + i.y), r.outer.moveTo(r.first_outer_pt.x, r.first_outer_pt.y), r.inner.moveTo(l - i.x, o - i.y)) : r.joiner(
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
  postJoinTo(t, e, i) {
    this.join_completed = !0, this.prev_pt.copy(t), this.prev_unit_normal.copy(i), this.prev_normal.copy(e), this.segment_count += 1;
  }
  initQuad(t, e, i, n) {
    this.stroke_type = t, this.found_tangents = !1, n.init(e, i);
  }
  quadStroke(t, e) {
    let i = this, n = i.compareQuadQuad(t, e);
    if (n == 2)
      return (i.stroke_type == 1 ? i.outer : i.inner).quadTo(
        e.quad[1].x,
        e.quad[1].y,
        e.quad[2].x,
        e.quad[2].y
      ), !0;
    if (n == 1)
      return i.addDegenerateLine(e), !0;
    if (i.recursion_depth += 1, i.recursion_depth > yi[kn])
      return !1;
    let r = Kt.default();
    return r.initWithStart(e), !i.quadStroke(t, r) || (r.initWithEnd(e), !i.quadStroke(t, r)) ? !1 : (i.recursion_depth -= 1, !0);
  }
  compareQuadQuad(t, e) {
    const i = this;
    if (!e.start_set) {
      let o = c.zero();
      i.quadPerpRay(
        t,
        e.start_t,
        o,
        e.quad[0],
        e.tangent_start
      ), e.start_set = !0;
    }
    if (!e.end_set) {
      let o = c.zero();
      i.quadPerpRay(
        t,
        e.end_t,
        o,
        e.quad[2],
        e.tangent_end
      ), e.end_set = !0;
    }
    let n = i.intersectRay(0, e);
    if (n != 2)
      return n;
    let r = c.zero(), l = c.zero();
    return i.quadPerpRay(t, e.mid_t, l, r), i.strokeCloseEnough(e.quad.slice(), [r, l], e);
  }
  // Given a point on the curve and its derivative, scale the derivative by the radius, and
  // compute the perpendicular point and its tangent.
  setRayPoints(t, e, i, n) {
    const r = this;
    e.setLength(r.radius) || e.copy(c.create(r.radius, 0));
    let l = r.stroke_type;
    i.x = t.x + l * e.y, i.y = t.y - l * e.x, n && (n.x = i.x + e.x, n.y = i.y + e.y);
  }
  // Given a quad and t, return the point on curve,
  // its perpendicular, and the perpendicular tangent.
  quadPerpRay(t, e, i, n, r) {
    let l = this, o = Ct(t, e);
    i.set(o.x, o.y), o = Ae(t, e);
    let a = c.create(o.x, o.y);
    a.isZero() && (a = t[2].sub(t[0])), l.setRayPoints(i, a, n, r);
  }
  strokeCloseEnough(t, e, i) {
    const n = this;
    let l = Ct(t, 0.5);
    if (ve(e[0], c.create(l.x, l.y), n.inv_res_scale))
      return mi(i.quad) ? 0 : 2;
    if (!mn(t, e[0], n.inv_res_scale))
      return 0;
    let o = new Array(3).fill(0.5);
    if (o = cn(e, t, o), o.length != 1)
      return 0;
    let a = Ct(t, o[0]), h = n.inv_res_scale * (1 - Math.abs(o[0] - 0.5) * 2);
    return ve(e[0], c.create(a.x, a.y), h) ? mi(i.quad) ? 0 : 2 : 0;
  }
  // Find the intersection of the stroke tangents to construct a stroke quad.
  // Return whether the stroke is a degenerate (a line), a quad, or must be split.
  // Optionally compute the quad's control point.
  intersectRay(t, e) {
    const i = this;
    let n = e.quad[0], r = e.quad[2], l = e.tangent_start.clone().sub(n), o = e.tangent_end.clone().sub(r), a = l.cross(o);
    if (a == 0 || !Number.isFinite(a))
      return e.opposite_tangents = l.dot(o) < 0, 1;
    e.opposite_tangents = !1;
    let h = n.clone().sub(r), u = o.cross(h), f = l.cross(h);
    if (u >= 0 == f >= 0) {
      let m = It(n, r, e.tangent_end), k = It(r, n, e.tangent_start);
      return Math.max(m, k) <= i.inv_res_scale_squared ? 1 : 0;
    }
    return u /= a, u > u - 1 ? (t == 0 && (e.quad[1].x = n.x * (1 - u) + e.tangent_start.x * u, e.quad[1].y = n.y * (1 - u) + e.tangent_start.y * u), 2) : (e.opposite_tangents = l.dot(o) < 0, 1);
  }
  addDegenerateLine(t) {
    const e = this;
    e.stroke_type == 1 ? e.outer.lineTo(t.quad[2].x, t.quad[2].y) : e.inner.lineTo(t.quad[2].x, t.quad[2].y);
  }
  setCubicEndNormal(t, e, i, n, r) {
    let l = this, o = t[1].clone().sub(t[0]), a = t[3].clone().sub(t[2]), h = it(o), u = it(a);
    if (h && u) {
      n.copy(e), r.copy(i);
      return;
    }
    if (h && (o = t[2].clone().sub(t[0]), h = it(o)), u && (a = t[3].clone().sub(t[1]), u = it(a)), h || u) {
      n.copy(e), r.copy(i);
      return;
    }
    return hn(a, l.radius, n, r);
  }
  lineTo(t, e) {
    const i = this;
    let n = i.prev_pt.equalsEpsilon(t, Qe * i.inv_res_scale);
    if (i.capper, Ie && n || n && (i.join_completed || e && e.hasValidTangent()))
      return;
    let r = c.default(), l = c.default();
    i.preJoinTo(t, !0, r, l) && (i.outer.lineTo(t.x + r.x, t.y + r.y), i.inner.lineTo(t.x - r.x, t.y - r.y), i.postJoinTo(t, r, l));
  }
  quadraticCurveTo(t, e) {
    const i = this;
    let n = [i.prev_pt, t, e], [r, l] = un(n);
    if (l == 0) {
      i.lineTo(e);
      return;
    }
    if (l == 1) {
      i.lineTo(e);
      return;
    }
    if (l == 3) {
      i.lineTo(r);
      let m = i.joiner;
      i.joiner = we, i.lineTo(e), i.joiner = m;
      return;
    }
    let o = c.default(), a = c.default(), h = c.default(), u = c.default();
    if (!i.preJoinTo(t, !1, o, a)) {
      i.lineTo(e);
      return;
    }
    let f = Kt.default();
    i.initQuad(
      1,
      0,
      1,
      f
    ), i.quadStroke(n, f), i.initQuad(
      -1,
      0,
      1,
      f
    ), i.quadStroke(n, f), ci(
      n[1],
      n[2],
      i.res_scale,
      i.radius,
      h,
      u
    ) || (h = o, u = a), i.postJoinTo(e, h, u);
  }
  bezierCurveTo(t, e, i) {
    const n = this;
    let r = [n.prev_pt, t, e, i], l = Array.from({ length: 3 }, () => c.zero()), o = c.zero(), a = yn(r, l, o);
    if (a == 0) {
      n.lineTo(i);
      return;
    }
    if (a == 1) {
      n.lineTo(i);
      return;
    }
    if (3 <= a && 5 >= a) {
      n.lineTo(l[0]);
      let d = n.joiner;
      n.joiner = we, 4 <= a && n.lineTo(l[1]), a == 5 && n.lineTo(l[2]), n.lineTo(i), n.joiner = d;
      return;
    }
    let h = c.zero(), u = c.zero(), f = c.zero(), y = c.zero();
    if (!n.preJoinTo(o, !1, h, u)) {
      n.lineTo(i);
      return;
    }
    let m = new Array(3).fill(0.5), k = Ts(r, m);
    m = m.slice(0, k);
    let p = 0;
    for (let d = 0, _ = m.length; d <= _; d++) {
      let v = Number.isFinite(m[d]) ? m[d] : 1, P = Kt.default();
      n.initQuad(1, p, v, P), n.cubicStroke(r, P), n.initQuad(-1, p, v, P), n.cubicStroke(r, P), p = v;
    }
    let b = Is(r);
    if (b) {
      let d = ne(r, b);
      n.cusper.addCircle(d.x, d.y, n.radius);
    }
    n.setCubicEndNormal(r, h, u, f, y), n.postJoinTo(i, f, y);
  }
  cubicStroke(t, e) {
    const i = this;
    if (!i.found_tangents) {
      let r = i.tangentsMeet(t, e);
      if (r != 2) {
        let l = ve(
          e.quad[0],
          e.quad[2],
          i.inv_res_scale
        );
        if ((r == 1 || l) && i.cubicMidOnLine(t, e))
          return i.addDegenerateLine(e), !0;
      } else
        i.found_tangents = !0;
    }
    if (i.found_tangents) {
      let r = i.compareQuadCubic(t, e);
      if (r == 2) {
        let l = e.quad;
        return i.stroke_type == 1 ? i.outer.quadTo(l[1].x, l[1].y, l[2].x, l[2].y) : i.inner.quadTo(l[1].x, l[1].y, l[2].x, l[2].y), !0;
      }
      if (r == 1 && !e.opposite_tangents)
        return i.addDegenerateLine(e), !0;
    }
    if (!Number.isFinite(e.quad[2].x) || !Number.isFinite(e.quad[2].x) || (i.recursion_depth += 1, i.recursion_depth > yi[Number(i.found_tangents)]))
      return !1;
    let n = Kt.default();
    return n.initWithStart(e) ? i.cubicStroke(t, n) ? n.initWithEnd(e) ? i.cubicStroke(t, n) ? (i.recursion_depth -= 1, !0) : !1 : (i.addDegenerateLine(e), i.recursion_depth -= 1, !0) : !1 : (i.addDegenerateLine(e), i.recursion_depth -= 1, !0);
  }
  cubicMidOnLine(t, e) {
    let i = this, n = c.zero();
    return i.cubicQuadMid(t, e, n), It(n, e.quad[0], e.quad[2]) < i.inv_res_scale_squared;
  }
  cubicQuadMid(t, e, i) {
    let n = c.zero();
    this.cubicPerpRay(t, e.mid_t, n, i);
  }
  compareQuadCubic(t, e) {
    let i = this;
    i.cubicQuadEnds(t, e);
    let n = i.intersectRay(0, e);
    if (n != 2)
      return n;
    let r = c.zero(), l = c.zero();
    return i.cubicPerpRay(t, e.mid_t, l, r), i.strokeCloseEnough(e.quad.slice(), [r, l], e);
  }
  // Given a cubic and a t range, find the start and end if they haven't been found already.
  cubicQuadEnds(t, e) {
    const i = this;
    if (!e.start_set) {
      let n = c.zero();
      i.cubicPerpRay(
        t,
        e.start_t,
        n,
        e.quad[0],
        e.tangent_start
      ), e.start_set = !0;
    }
    if (!e.end_set) {
      let n = c.zero();
      i.cubicPerpRay(
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
  cubicPerpRay(t, e, i, n, r) {
    let l = this;
    i.copy(ne(t, e));
    let o = Pi(t, e), a = Array.from({ length: 7 }, () => c.zero());
    if (o.x == 0 && o.y == 0) {
      let h = t;
      st(e) ? o = t[2].clone().sub(t[0]) : st(1 - e) ? o = t[3].clone().sub(t[1]) : (ue(t, a, e), o = a[3].clone().sub(a[2]), o.x == 0 && o.y == 0 && (o = a[3].clone().sub(a[1]), h = a)), o.x == 0 && o.y == 0 && (o = h[3].clone().sub(h[0]));
    }
    l.setRayPoints(i, o, n, r);
  }
  stroke(t, e) {
    return this.strokeInner(t, e.strokeWidth, e.miterLimit ?? 10, e.lineCap ?? "butt", e.lineJoin ?? "miter", this.res_scale);
  }
  strokeInner(t, e, i, n, r, l) {
    const o = this;
    let a = 0;
    r == "miter" && (i <= 1 ? r = "bevel" : a = 1 / i), r == "miter-clip" && (a = 1 / i), o.res_scale = l, o.inv_res_scale = 1 / (l * 4), o.inv_res_scale_squared = o.inv_res_scale ** 2, o.radius = e * 0.5, o.inv_miter_limit = a, o.first_normal = c.default(), o.prev_normal = c.default(), o.first_unit_normal = c.default(), o.prev_unit_normal = c.default(), o.first_pt = c.default(), o.prev_pt = c.default(), o.first_outer_pt = c.default(), o.first_outer_pt_index_in_contour = 0, o.segment_count = -1, o.prev_is_line = !1, o.capper = xn[n], o.joiner = pn[r], o.inner.reset(), o.outer.reset(), o.cusper.reset(), o.stroke_type = 1, o.recursion_depth = 0, o.found_tangents = !1, o.join_completed = !1;
    let h = !1, u = new Fe({
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
const bn = (s, t) => s[0] * t[0] + s[1] * t[1], gn = (s, t) => s[0] * t[1] - s[1] * t[0], di = (s, t) => Math.atan2(gn(s, t), bn(s, t));
function _n(s, t, e, i, n, r, l, o, a) {
  let h = Math.cos(a), u = Math.sin(a), f = h * (s - e) / 2 + u * (t - i) / 2, y = -u * (s - e) / 2 + h * (t - i) / 2, m = f * f / (l * l) + y * y / (o * o);
  m > 1 && (m = Math.sqrt(m), l *= m, o *= m);
  let k = n !== r ? 1 : -1, p = (l * l * o * o - l * l * y * y - o * o * f * f) / (l * l * y * y + o * o * f * f);
  p < 0 ? p = 0 : p = Math.sqrt(p);
  let b = k * p * (l * y / o), d = k * p * (-o * f / l), _ = h * b - u * d + (s + e) / 2, v = u * b + h * d + (t + i) / 2, P = di([1, 0], [(f - b) / l, (y - d) / o]), M = di([(f - b) / l, (y - d) / o], [(-f - b) / l, (-y - d) / o]);
  !r && M > 0 ? M -= Math.PI * 2 : r && M < 0 && (M += Math.PI * 2);
  let E = P + M;
  return {
    rx: l,
    ry: o,
    cx: _,
    cy: v,
    theta1: P,
    // 是拉伸和旋转操作之前椭圆弧的起始角度。
    theta2: E,
    // 是拉伸和旋转操作之前椭圆弧的终止角度。
    dtheta: M
    // 是这两个角度之间的差值。
  };
}
function vn(s, t, e, i, n, r, l) {
  const o = l - r, a = 4 / 3 * Math.tan(o / 4), h = c.fromRotation(r), u = c.fromRotation(l), f = c.fromPoint(h), y = c.fromPoint(u);
  return f.translate(-a * h.y, a * h.x), y.translate(a * u.y, -a * u.x), h.scale(e, i).rotate(n).translate(s, t), f.scale(e, i).rotate(n).translate(s, t), y.scale(e, i).rotate(n).translate(s, t), u.scale(e, i).rotate(n).translate(s, t), [h.x, h.y, f.x, f.y, y.x, y.y, u.x, u.y];
}
function Tn(s, t, e, i, n, r, l, o, a, h) {
  const { cx: u, cy: f, theta1: y, dtheta: m, rx: k, ry: p } = _n(s, t, e, i, o, a, n, r, l), b = Math.ceil(Math.abs(m / (Math.PI / 2))), d = m / b, _ = [];
  let v = y;
  for (let P = 0; P < b; P++) {
    const M = v + d;
    let [E, L, w, C, Y, rt, lt, H] = vn(u, f, k, p, l, v, M);
    h == null || h(E, L, w, C, Y, rt, lt, H, P), v = M, _.push(E, L, w, C, Y, rt, lt, H);
  }
  return _;
}
const pi = {
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
}, xi = new Set(Object.keys(pi).concat(Object.keys(pi).map((s) => s.toLowerCase())));
function Pn(s) {
  return s === " " || s === "	" || s === `
` || s === "\r";
}
function Mn(s) {
  return s === " " || s === ",";
}
function Sn(s, t) {
  let e = 0, i = 0, n = 0, r = 0, l = 0, o = 0, a = 0, h = 0, u = "";
  for (let f = 0, y = t.length; f < y; f++) {
    const m = t[f];
    switch (m[0]) {
      case "M":
        s.moveTo(m[1], m[2]), e = m[1], i = m[2], n = e, r = i;
        break;
      case "L":
        s.lineTo(m[1], m[2]), e = m[1], i = m[2];
        break;
      case "H":
        s.lineTo(m[1], i), e = m[1];
        break;
      case "V":
        s.lineTo(e, m[1]), i = m[1];
        break;
      case "Q":
        s.quadraticCurveTo(m[1], m[2], m[3], m[4]), l = m[1], o = m[2], e = m[3], i = m[4];
        break;
      case "T":
        a = e, h = i, (u === "Q" || u === "T") && (a -= l - e, h -= o - i), s.quadraticCurveTo(a, h, m[1], m[2]), l = a, o = h, e = m[1], i = m[2];
        break;
      case "C":
        s.bezierCurveTo(m[1], m[2], m[3], m[4], m[5], m[6]), l = m[3], o = m[4], e = m[5], i = m[6];
        break;
      case "S":
        a = e, h = i, (u === "C" || u === "S") && (a -= l - e, h -= o - i), s.bezierCurveTo(a, h, m[1], m[2], m[3], m[4]), l = m[1], o = m[2], e = m[3], i = m[4];
        break;
      case "A":
        {
          let k = e, p = i, b = m[1], d = m[2], _ = m[3], v = !!m[4], P = !!m[5], M = m[6], E = m[7], L = M, w = E;
          Tn(k, p, M, E, b, d, _, v, P, (C, Y, rt, lt, H, j, ot, gt, B) => {
            s.bezierCurveTo(rt, lt, H, j, ot, gt), L = ot, w = gt;
          }), e = L, i = w;
        }
        break;
      case "Z":
        s.closePath(), e = n, i = r;
        break;
    }
    u = m[0];
  }
}
function ae(s, t) {
  const e = Cn(t);
  Sn(s, e);
}
function Cn(s) {
  const t = [];
  let e = 0, i = 0, n = s.length, r = "", l = "", o = 0, a = 0, h = 0, u = 0, f = 0, y = 0, m = 0, k = 0;
  for (; e < n; ) {
    for (i = e, r = s.charAt(i); Pn(r); )
      r = s.charAt(++e);
    l = r.toUpperCase();
    const p = r !== l;
    if (xi.has(l)) {
      r = s.charAt(++e);
      let b = "", d = [];
      for (; e < n && !xi.has(r); )
        Mn(r) ? (b !== "" && d.push(parseFloat(b)), b = "") : b += r, r = s.charAt(++e);
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
          let _ = d[0], v = d[1], P = d[2], M = d[3], E = d[4];
          f = p ? f + d[5] : d[5], y = p ? y + d[6] : d[6], d[0] = _, d[1] = v, d[2] = P, d[3] = M, d[4] = E, d[5] = f, d[6] = y;
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
class zi {
  constructor(t) {
    x(this, "commands", []);
    x(this, "dirty", !1);
    x(this, "_cb", null);
    typeof t == "string" ? ae(this, t) : t instanceof zi && (this.commands = [...t.commands]);
  }
  fromSvgPath(t) {
    ae(this, t);
  }
  onChange(t) {
    this._cb = t;
  }
  equals(t) {
    if (this.commands.length !== t.commands.length) return !1;
    for (let e = 0; e < this.commands.length; e++) {
      const i = this.commands[e], n = t.commands[e];
      if (i[0] !== n[0]) return !1;
      for (let r = 1; r < i.length; r++)
        if (i[r] !== n[r]) return !1;
    }
    return !0;
  }
  reset() {
    var t;
    this.commands.length = 0, this.dirty = !0, (t = this._cb) == null || t.call(this);
  }
  clone() {
    return new this.constructor(this);
  }
  addCmd(t, e) {
    var i;
    this.commands.push([t].concat(e)), this.dirty = !0, (i = this._cb) == null || i.call(this);
  }
  addPath(t, e) {
    this.commands = t.commands.slice();
  }
  arc(t, e, i, n, r, l = !1) {
    this.addCmd("AC", [t, e, i, n, r, l]);
  }
  arcTo(t, e, i, n, r) {
    this.addCmd("AT", [t, e, i, n, r]);
  }
  bezierCurveTo(t, e, i, n, r, l) {
    this.addCmd("C", [t, e, i, n, r, l]);
  }
  closePath() {
    this.commands.length > 0 && this.commands[this.commands.length - 1][0] !== "Z" && this.addCmd("Z", []);
  }
  ellipse(t, e, i, n, r, l, o, a = !1) {
    this.addCmd("E", [t, e, i, n, r, l, o, a]);
  }
  lineTo(t, e) {
    this.addCmd("L", [t, e]);
  }
  moveTo(t, e) {
    this.addCmd("M", [t, e]);
  }
  quadraticCurveTo(t, e, i, n) {
    this.addCmd("Q", [t, e, i, n]);
  }
  rect(t, e, i, n) {
    this.addCmd("R", [t, e, i, n]);
  }
  roundRect(t, e, i, n, r) {
    this.addCmd("RR", [t, e, i, n, r]);
  }
  toPath2D(t = new Path2D()) {
    return this.toCanvas(t);
  }
  toCanvas(t) {
    for (const e of this.commands)
      switch (e[0]) {
        case "M":
          t.moveTo(e[1], e[2]);
          break;
        case "L":
          t.lineTo(e[1], e[2]);
          break;
        case "Q":
          t.quadraticCurveTo(e[1], e[2], e[3], e[4]);
          break;
        case "C":
          t.bezierCurveTo(e[1], e[2], e[3], e[4], e[5], e[6]);
          break;
        case "AC":
          t.arc(e[1], e[2], e[3], e[4], e[5], e[6]);
          break;
        case "E":
          t.ellipse(e[1], e[2], e[3], e[4], e[5], e[6], e[7], e[8]);
          break;
        case "AT":
          t.arcTo(e[1], e[2], e[3], e[4], e[5]);
          break;
        case "RR":
          t.roundRect(e[1], e[2], e[3], e[4], e[5]);
          break;
        case "R":
          t.rect(e[1], e[2], e[3], e[4]);
          break;
        case "Z":
          t.closePath();
          break;
      }
    return t;
  }
}
function Rn(s) {
  let t = { tl: 0, tr: 0, br: 0, bl: 0 };
  return typeof s == "number" ? t = { tl: s, tr: s, br: s, bl: s } : Array.isArray(s) ? s.length === 1 ? t = { tl: s[0], tr: s[0], br: s[0], bl: s[0] } : s.length === 2 ? t = { tl: s[0], tr: s[1], br: s[0], bl: s[1] } : s.length === 3 ? t = { tl: s[0], tr: s[1], br: s[2], bl: s[1] } : s.length === 4 && (t = { tl: s[0], tr: s[1], br: s[2], bl: s[3] }) : s && (t.tl = s.x ?? 0, t.tr = s.y ?? 0, t.bl = s.z ?? 0, t.br = s.w ?? 0), t;
}
function bt(s) {
  for (var t = 0; t < s.length; t++)
    if (s[t] !== void 0 && !Number.isFinite(s[t]))
      return !1;
  return !0;
}
function ki(s) {
  return s / Math.PI * 180;
}
function In(s, t) {
  return Math.abs(s - t) < 1e-5;
}
function wn(s, t, e, i, n, r, l = !1) {
  Bi(s, t, e, i, i, 0, n, r, l);
}
function En(s, t, e, i, n, r) {
  if (bt([t, e, i, n, r])) {
    if (r < 0)
      throw "radii cannot be negative";
    s.isEmpty() && s.moveTo(t, e), s.arcTo(c.create(t, e), c.create(i, n), r);
  }
}
function Ln(s, t, e, i, n, r, l) {
  bt([t, e, i, n, r, l]) && (s.isEmpty() && s.moveTo(t, e), s.cubicTo(t, e, i, n, r, l));
}
function An(s) {
  if (!s.isEmpty()) {
    var t = s.getBounds();
    (t.bottom - t.top || t.right - t.left) && s.close();
  }
}
function bi(s, t, e, i, n, r, l) {
  var o = ki(l - r), a = ki(r), h = q.makeLTRB(t - i, e - n, t + i, e + n);
  if (In(Math.abs(o), 360)) {
    var u = o / 2;
    s.arcToOval(h, a, u, !1), s.arcToOval(h, a + u, u, !1);
    return;
  }
  s.arcToOval(h, a, o, !1);
}
function Bi(s, t, e, i, n, r, l, o, a = !1) {
  if (bt([t, e, i, n, r, l, o])) {
    if (i < 0 || n < 0)
      throw "radii cannot be negative";
    var h = 2 * Math.PI, u = l % h;
    u < 0 && (u += h);
    var f = u - l;
    if (l = u, o += f, !a && o - l >= h ? o = l + h : a && l - o >= h ? o = l - h : !a && l > o ? o = l + (h - (l - o) % h) : a && l < o && (o = l - (h - (o - l) % h)), !r) {
      bi(s, t, e, i, n, l, o);
      return;
    }
    var y = ht.fromRotateOrigin(r, t, e), m = ht.fromRotateOrigin(-r, t, e);
    s.transform(m), bi(s, t, e, i, n, l, o), s.transform(y);
  }
}
function Nn(s, t, e) {
  bt([t, e]) && (s.isEmpty() && s.moveTo(t, e), s.lineTo(t, e));
}
function Wn(s, t, e) {
  bt([t, e]) && s.moveTo(t, e);
}
function Fn(s, t, e, i, n) {
  bt([t, e, i, n]) && (s.isEmpty() && s.moveTo(t, e), s.quadTo(t, e, i, n));
}
function qn(s, t, e, i, n) {
  var r = q.makeXYWH(t, e, i, n);
  bt([r.left, r.top, r.right, r.bottom]) && s.addRect(r);
}
let Mr = class Vi {
  constructor(t) {
    x(this, "_path", Rt.default());
    typeof t == "string" ? ae(this, t) : t instanceof Vi && this._path.copy(t.getPath());
  }
  static default() {
    return new this();
  }
  static fromSvgPath(t) {
    return new this(t);
  }
  fromSvgPath(t) {
    ae(this, t);
  }
  getPath() {
    return this._path;
  }
  addPath(t, e) {
    this._path.addPath(t.getPath()), e && this._path.transform(e);
  }
  contains(t, e, i = "nonzero") {
    return this._path.contains(t, e, i);
  }
  arc(t, e, i, n, r, l = !1) {
    wn(this._path, t, e, i, n, r, l);
  }
  arcTo(t, e, i, n, r) {
    En(this._path, t, e, i, n, r);
  }
  bezierCurveTo(t, e, i, n, r, l) {
    Ln(this._path, t, e, i, n, r, l);
  }
  closePath() {
    An(this._path);
  }
  conicTo(t, e, i, n, r) {
    this._path.conicTo(t, e, i, n, r);
  }
  ellipseArc(t, e, i, n, r, l, o, a, h) {
    this._path.isEmpty() && this._path.moveTo(t, e), this._path.arcTo(c.create(r, l), o, Number(a), +!h, c.create(i, n));
  }
  roundRect(t, e, i, n, r) {
    let l = Rn(r);
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
    let a = yt.makeEmpty(), h = q.makeXYWH(t, e, i, n);
    a.setRectRadii(h, o), this._path.addRRect(a);
  }
  ellipse(t, e, i, n, r, l, o, a = !1) {
    Bi(
      this._path,
      t,
      e,
      i,
      n,
      r,
      l,
      o,
      a
    );
  }
  lineTo(t, e) {
    Nn(this._path, t, e);
  }
  moveTo(t, e) {
    Wn(this._path, t, e);
  }
  quadraticCurveTo(t, e, i, n) {
    Fn(this._path, t, e, i, n);
  }
  rect(t, e, i, n) {
    qn(this._path, t, e, i, n);
  }
  getBounds() {
    return this._path.getBounds();
  }
  computeTightBounds() {
    return this._path.computeTightBounds();
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
  en as FillRule,
  T as FloatPoint,
  tn as LineCap,
  Gs as LineJoin,
  ht as Matrix2D,
  Oe as PI,
  Mr as Path2D,
  Rt as PathBuilder,
  Fe as PathSegmentsIter,
  Pr as PathStroker,
  c as Point,
  ee as Point3D,
  N as PointerArray,
  zi as ProxyPath2D,
  yt as RRect,
  q as Rect,
  A as Ref,
  V as SK_Scalar1,
  pt as SK_ScalarHalf,
  Kn as SK_ScalarInfinity,
  es as SK_ScalarMax,
  Hn as SK_ScalarMin,
  $n as SK_ScalarNaN,
  Le as SK_ScalarNearlyZero,
  Jn as SK_ScalarNegativeInfinity,
  et as SK_ScalarPI,
  Pe as SK_ScalarRoot2Over2,
  _i as SK_ScalarSinCosNearlyZero,
  Zn as SK_ScalarSqrt2,
  Un as SK_ScalarTanPIOver8,
  Wt as Size,
  _r as SkAutoConicToQuads,
  jn as SkBezierCubic,
  kr as SkChopCubicAtHalf,
  gr as SkChopCubicAtXExtrema,
  Ri as SkChopCubicAtYExtrema,
  ue as SkChopCubicAt_3,
  gs as SkChopCubicAt_4,
  Si as SkChopCubicAt_5,
  ys as SkChopQuadAt,
  xs as SkChopQuadAtYExtrema,
  Ws as SkComputeConicExtremas,
  Ns as SkComputeCubicExtremas,
  As as SkComputeQuadExtremas,
  W as SkConic,
  fs as SkCubicType,
  Nt as SkCubics,
  je as SkDegreesToRadians,
  $t as SkDoubleToScalar,
  Mi as SkEvalCubicAt,
  ne as SkEvalCubicPosAt,
  Pi as SkEvalCubicTangentAt,
  Ct as SkEvalQuadAt,
  Ae as SkEvalQuadTangentAt,
  Ne as SkFindBisector,
  Is as SkFindCubicCusp,
  re as SkFindCubicExtrema,
  Ts as SkFindCubicInflections,
  Ii as SkFindCubicMaxCurvature,
  br as SkFindCubicMidTangent,
  Ke as SkFindQuadExtrema,
  ks as SkFindQuadMaxCurvature,
  xr as SkFindQuadMidTangent,
  nt as SkFindUnitQuadRoots,
  er as SkFloatToScalar,
  Gn as SkIntToFloat,
  is as SkIntToScalar,
  kt as SkQuadCoeff,
  Jt as SkQuads,
  mr as SkRadiansToDegrees,
  Qt as SkRotationDirection,
  os as SkScalarACos,
  ar as SkScalarASin,
  De as SkScalarATan2,
  X as SkScalarAbs,
  Xe as SkScalarAve,
  ns as SkScalarCeilToInt,
  sr as SkScalarCeilToScalar,
  lr as SkScalarCopySign,
  xt as SkScalarCos,
  te as SkScalarCosSnapToZero,
  hr as SkScalarExp,
  nr as SkScalarFloorToInt,
  gi as SkScalarFloorToScalar,
  cr as SkScalarFraction,
  $ as SkScalarHalf,
  G as SkScalarInterp,
  pr as SkScalarInterpFunc,
  Se as SkScalarInvert,
  qt as SkScalarIsFinite,
  yr as SkScalarIsInt,
  as as SkScalarIsNaN,
  ur as SkScalarLog,
  fr as SkScalarLog2,
  or as SkScalarMod,
  U as SkScalarNearlyEqual,
  st as SkScalarNearlyZero,
  rs as SkScalarPow,
  rr as SkScalarRoundToInt,
  de as SkScalarRoundToScalar,
  Ze as SkScalarSignAsInt,
  dr as SkScalarSignAsScalar,
  Me as SkScalarSin,
  Gt as SkScalarSinSnapToZero,
  K as SkScalarSqrt,
  Lt as SkScalarSquare,
  ls as SkScalarTan,
  ir as SkScalarToDouble,
  tr as SkScalarToFloat,
  ss as SkScalarTruncToScalar,
  Ee as SkScalarsAreFinite,
  hs as SkScalarsAreFiniteArray,
  Ue as SkScalarsEqual,
  zn as VectorIterator,
  ct as clamp,
  Hi as copysign,
  Ui as fabs,
  Dn as isFinite,
  He as kMaxConicToQuadPOW2,
  us as kMaxConicsForArc,
  Z as lerp,
  Xn as magnitudeAlt,
  Yn as max,
  Vn as min,
  Ot as nearly_equal,
  $s as pointInPath,
  Q as sk_double_nearly_zero,
  On as sk_double_to_float,
  St as sk_doubles_nearly_equal_ulps,
  Te as sk_ieee_double_divide,
  ie as sk_ieee_float_divide,
  Zi as sqrt,
  Bn as swap,
  Tr as tangent_conic,
  Hs as tangent_cubic,
  Zs as tangent_line,
  Us as tangent_quad,
  vr as winding_conic,
  js as winding_cubic,
  Vs as winding_line,
  Xs as winding_quad
};
