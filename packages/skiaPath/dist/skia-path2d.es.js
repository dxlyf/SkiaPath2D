var $i = Object.defineProperty;
var Gi = (s, t, e) => t in s ? $i(s, t, { enumerable: !0, configurable: !0, writable: !0, value: e }) : s[t] = e;
var d = (s, t, e) => Gi(s, typeof t != "symbol" ? t + "" : t, e);
class f {
  constructor(t) {
    d(this, "elements", new Float32Array([0, 0]));
    d(this, "isVector2", !0);
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
    return f.default().copy(this);
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
  rotate(t, e = f.zero()) {
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
class ie {
  constructor(t = 0, e = 0, i = 0) {
    d(this, "elements", new Float32Array([0, 0, 0]));
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
    return new ie(this.x, this.y, this.z);
  }
  copy(t) {
    return this.elements[0] = t.x, this.elements[1] = t.y, this.elements[2] = t.z, this;
  }
}
const ts = 1192092896e-16;
class E {
  constructor(t) {
    d(this, "value");
    this.value = t;
  }
  static from(t) {
    return new E(t);
  }
  swap(t) {
    let e = this.value;
    this.value = t.value, t.value = e;
  }
}
class L {
  constructor(t) {
    d(this, "data", []);
    d(this, "curIndex", 0);
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
    return new L(this.data).copy(this);
  }
  slice(t) {
    const e = new L(this.data);
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
class Zn {
  constructor(t, e = 0, i = !1) {
    d(this, "data");
    d(this, "size", 0);
    d(this, "currentIndex", 0);
    d(this, "increase", 1);
    this.size = t, this.currentIndex = e % t, this.increase = i ? t - 1 : 1, this.data = new Array(t);
  }
  get current() {
    return this.data[this.currentIndex];
  }
  get next() {
    return this.currentIndex = (this.currentIndex + this.increase) % this.size, this.data[this.currentIndex];
  }
}
const Un = (s, t) => {
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
function es(s) {
  return Math.sqrt(s);
}
function se(s, t) {
  return s / t;
}
function Hn(s, t) {
  return Math.min(s, t);
}
function Kn(s, t) {
  return Math.max(s, t);
}
function is(s) {
  return Math.abs(s);
}
function ct(s, t, e) {
  return Math.min(Math.max(s, t), e);
}
function X(s, t, e) {
  return s + (t - s) * e;
}
function z(s) {
  return s == 0 || is(s) < ts;
}
function Se(s, t) {
  return s / t;
}
function Jn(s) {
  return s;
}
function $n(s) {
  return Number.isFinite(s);
}
function ss(s, t) {
  return t === 0 ? 1 / t === -1 / 0 ? -Math.abs(s) : Math.abs(s) : t < 0 ? -Math.abs(s) : Math.abs(s);
}
function Ze(s) {
  const t = new ArrayBuffer(8), e = new DataView(t);
  e.setFloat64(0, s, !0);
  const i = e.getUint32(0, !0), n = e.getUint32(4, !0);
  let r = BigInt(n) << 32n | BigInt(i);
  r &= 0b0111111111110000000000000000000000000000000000000000000000000000n;
  const o = Number(r >> 32n & 0xffffffffn), a = Number(r & 0xffffffffn);
  return e.setUint32(0, a, !0), e.setUint32(4, o, !0), e.getFloat64(0, !0);
}
function Gn(s) {
  return Math.sign(s) * Math.pow(2, Math.floor(Math.log2(Math.abs(s))));
}
function Mt(s, t, e = 0) {
  const i = Number.MIN_VALUE, n = Math.max(
    Math.max(Ze(s), i),
    Ze(t)
  ), r = Number.EPSILON, l = n * (r * (e + 1));
  return s === t || Math.abs(t - s) < l;
}
class tr {
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
    const i = (m) => t[2 * m], n = (m) => t[2 * m + 1];
    if (e == 0)
      return [i(0), n(0)];
    if (e == 1)
      return [i(3), n(3)];
    let r = 1 - e, l = r * r, o = l * r, a = 3 * l * e, h = e * e, u = 3 * r * h, c = h * e;
    return [
      o * i(0) + a * i(1) + u * i(2) + c * i(3),
      o * n(0) + a * n(1) + u * n(2) + c * n(3)
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
    }, u = (P) => i[2 * P + 6], c = (P) => i[2 * P + 7], m = (P, M) => {
      i[2 * P + 6] = M;
    }, y = (P, M) => {
      i[2 * P + 7] = M;
    };
    a(0, n(0)), h(0, r(0)), m(3, n(3)), y(3, r(3));
    let p = X(n(0), n(1), e), x = X(r(0), r(1), e), k = X(n(1), n(2), e), b = X(r(1), r(2), e), _ = X(n(2), n(3), e), v = X(r(2), r(3), e);
    a(1, p), h(1, x), m(2, _), y(2, v), a(2, X(p, k, e)), h(2, X(x, b, e)), m(1, X(k, _, e)), y(1, X(b, v, e)), a(3, X(l(2), u(1), e)), h(3, X(o(2), c(1), e));
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
function ns(s, t) {
  return z(t) ? z(s) : Math.abs(s / t) < 1e-16;
}
function rs(s, t, e) {
  return z(s) ? (e[0] = 0, z(t) ? 1 : 0) : (e[0] = -t / s, Number.isFinite(e[0]) ? 1 : 0);
}
class Jt {
  /**
   * Puts up to 2 real solutions to the equation
   *   A*t^2 + B*t + C = 0
   * in the provided array.
   */
  static RootsReal(t, e, i, n) {
    if (ns(t, e))
      return rs(e, i, n);
    const r = Se(e, 2 * t), l = Se(i, t), o = r * r;
    if (!Number.isFinite(o - l) || !z(o - l) && o < l)
      return 0;
    let a = 0;
    return o > l && (a = Math.sqrt(o - l)), n[0] = a - r, n[1] = -a - r, z(a) || Mt(n[0], n[1]) ? 1 : 2;
  }
  /**
   * Evaluates the quadratic function with the 3 provided coefficients and the
   * provided variable.
   */
  static EvalAt(t, e, i, n) {
    return t * n * n + e * n + i;
  }
}
const Ue = Math.PI;
function Dt(s, t) {
  return z(s) ? z(t) : Mt(s, t, 0);
}
function ne(s) {
  return Math.abs(s) < 1e-8;
}
function ls(s, t, e, i) {
  let n = [0, 0], r = Jt.RootsReal(3 * s, 2 * t, e, n), l = 0;
  for (let o = 0; o < r; o++) {
    let a = n[o];
    a >= 0 && a <= 1 && (i[l++] = a);
  }
  return l;
}
function os(s, t, e, i, n, r) {
  let l = Nt.EvalAt(s, t, e, i, n);
  if (ne(l))
    return n;
  let o = Nt.EvalAt(s, t, e, i, r);
  if (!Number.isFinite(l) || !Number.isFinite(o) || l > 0 && o > 0 || l < 0 && o < 0)
    return -1;
  let a = 1e3;
  for (let h = 0; h < a; h++) {
    let u = (n + r) / 2, c = Nt.EvalAt(s, t, e, i, u);
    if (ne(c))
      return u;
    c < 0 && l < 0 || c > 0 && l > 0 ? n = u : r = u;
  }
  return -1;
}
function as(s, t) {
  return z(t) ? z(s) : Math.abs(s / t) < 1e-7;
}
class Nt {
  /**
  * Puts up to 3 real solutions to the equation
  *   A*t^3 + B*t^2 + C*t + d = 0
  * in the provided array and returns how many roots that was.
  */
  static RootsReal(t, e, i, n, r) {
    if (as(t, e))
      return Jt.RootsReal(e, i, n, r);
    if (z(n)) {
      let _ = Jt.RootsReal(t, e, i, r);
      for (let v = 0; v < _; ++v)
        if (z(r[v]))
          return _;
      return r[_++] = 0, _;
    }
    if (z(t + e + i + n)) {
      let _ = Jt.RootsReal(t, t + e, -n, r);
      for (let v = 0; v < _; ++v)
        if (Mt(r[v], 1))
          return _;
      return r[_++] = 1, _;
    }
    let l, o, a;
    {
      let _ = Se(1, t);
      l = e * _, o = i * _, a = n * _;
    }
    let h = l * l, u = (h - o * 3) / 9, c = (2 * h * l - 9 * l * o + 27 * a) / 54, m = c * c, y = u * u * u, p = m - y;
    if (!Number.isFinite(p))
      return 0;
    let x = l / 3, k, b = L.from(r);
    if (p < 0) {
      const _ = Math.acos(ct(c / Math.sqrt(y), -1, 1)), v = -2 * Math.sqrt(u);
      k = v * Math.cos(_ / 3) - x, b.value = k, b.next(), k = v * Math.cos((_ + 2 * Ue) / 3) - x, Dt(r[0], k) || (b.value = k, b.next()), k = v * Math.cos((_ - 2 * Ue) / 3) - x, !Dt(r[0], k) && (b.curIndex == 1 || !Dt(r[1], k)) && (b.value = k, b.next());
    } else {
      const _ = Math.sqrt(p);
      t = Math.abs(c) + _, t = Math.cbrt(t), c > 0 && (t = -t), z(t) || (t += u / t), k = t - x, b.value = k, b.next(), !z(m) && Mt(m, y) && (k = -t / 2 - x, Dt(r[0], k) || (b.value = k, b.next()));
    }
    return b.curIndex;
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
      u >= 1 && u <= 1.00005 ? (a < 1 || !Mt(r[0], 1)) && (a < 2 || !Mt(r[1], 1)) && (r[a++] = 1) : u >= -5e-5 && (u <= 0 || z(u)) ? (a < 1 || !z(r[0])) && (a < 2 || !z(r[1])) && (r[a++] = 0) : u > 0 && u < 1 && (r[a++] = u);
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
    let l = [0, 0, 0, 1], o = [0, 0], a = ls(t, e, i, o), h = 2 - a;
    a == 1 && (l[h + 1] = o[0]), a == 2 && (l[h + 1] = Math.min(o[0], o[1]), l[h + 2] = Math.max(o[0], o[1]));
    let u = 0;
    for (; h < 3; h++) {
      let c = os(t, e, i, n, l[h], l[h + 1]);
      c >= 0 && (u < 1 || !ne(r[0] - c)) && (u < 2 || !ne(r[1] - c)) && (r[u++] = c);
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
const V = 1, pt = 0.5, er = Math.SQRT2, it = Math.PI, ir = 0.414213562, Ce = 0.707106781, hs = 3402823466e29, sr = -hs, nr = 1 / 0, rr = -1 / 0, lr = NaN, us = (s) => s, or = (s) => s, ar = (s) => s, hr = (s) => s, ur = (s) => s, $t = (s) => s, Mi = (s) => Math.floor(s), fr = (s) => Math.ceil(s), be = (s) => Math.round(s), fs = (s) => Math.trunc(s), cr = (s) => Math.floor(s), cs = (s) => Math.ceil(s), mr = (s) => Math.round(s), j = (s) => Math.abs(s), yr = (s, t) => Math.sign(t) * Math.abs(s), dr = (s, t) => s % t, U = (s) => Math.sqrt(s), ms = (s, t) => Math.pow(s, t), Re = (s) => Math.sin(s), xt = (s) => Math.cos(s), ys = (s) => Math.tan(s), pr = (s) => Math.asin(s), ds = (s) => Math.acos(s), He = (s, t) => Math.atan2(s, t), xr = (s) => Math.exp(s), br = (s) => Math.log(s), kr = (s) => Math.log2(s), ps = (s) => Number.isNaN(s), qt = (s) => Number.isFinite(s), Ne = (s, t) => Number.isFinite(s) && Number.isFinite(t), xs = (s, t) => s.slice(0, t).every(Number.isFinite), gr = (s) => s - fs(s), Lt = (s) => s * s, we = (s) => V / s, Ke = (s, t) => (s + t) * pt, J = (s) => s * pt, Je = (s) => s * (it / 180), _r = (s) => s * (180 / it), vr = (s) => s === Mi(s), $e = (s) => s < 0 ? -1 : s > 0 ? 1 : 0, Tr = (s) => s < 0 ? -V : s > 0 ? V : 0, We = V / 4096, nt = (s, t = We) => j(s) <= t, Z = (s, t, e = We) => j(s - t) <= e, Si = V / 65536, Gt = (s) => {
  const t = Re(s);
  return nt(t, Si) ? 0 : t;
}, te = (s) => {
  const t = xt(s);
  return nt(t, Si) ? 0 : t;
}, $ = (s, t, e) => ((e < 0 || e > V) && console.warn("t out of range [0, 1]"), s + (t - s) * e), Pr = (s, t, e, i) => {
  if (i <= 0 || !t || !e) throw new Error("Invalid input");
  let n = 0;
  for (; n < i && t[n] < s; ) n++;
  if (n === i) return e[i - 1];
  if (n === 0) return e[0];
  const r = t[n - 1], l = t[n], o = (s - r) / (l - r);
  return $(e[n - 1], e[n], o);
}, Ge = (s, t, e) => {
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
    d(this, "elements", new Float32Array([0, 0, 0, 0]));
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
    return f.fromXY(this.left, this.top);
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
    return f.create(this.centerX, this.centerY);
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
const D = class D {
  constructor(t, e = !0) {
    d(this, "isMatrix2D", !0);
    d(this, "elements", new Float32Array(6));
    d(this, "mutable", !0);
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
    return this.elements.every((t, e) => t === D.IDENTITY_MATRIX.elements[e]);
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
    return this.multiplyMatrices(this, D.fromScale(t, e));
  }
  postScale(t, e) {
    return this.multiplyMatrices(D.fromScale(t, e), this);
  }
  preRotate(t) {
    return this.multiplyMatrices(this, D.fromRotate(t));
  }
  preRotateDegrees(t) {
    return this.preRotate(t * Math.PI / 180);
  }
  postRotate(t) {
    return this.multiplyMatrices(D.fromRotate(t), this);
  }
  postRotateDegrees(t) {
    return this.postRotate(t * Math.PI / 180);
  }
  preTranslate(t, e) {
    return this.multiplyMatrices(this, D.fromTranslate(t, e));
  }
  postTranslate(t, e) {
    return this.multiplyMatrices(D.fromTranslate(t, e), this);
  }
  fromTranslateRotationSkewScalePivot(t, e, i, n, r) {
    const l = Math.cos(e), o = Math.sin(e), a = Math.tan(i.x), h = Math.tan(i.y), u = t.x, c = t.y, m = n.x, y = n.y, p = (l + a * o) * m, x = (o + h * l) * m, k = (-o + a * l) * y, b = (l + h * -o) * y, _ = u - (p * r.x + k * r.y), v = c - (x * r.x + b * r.y);
    return this.set(p, x, k, b, _, v);
  }
  determinant() {
    return this.a * this.d - this.b * this.c;
  }
  invertMatrix(t) {
    const e = t.elements, i = e[0], n = e[1], r = 0, l = e[2], o = e[3], a = 0, h = e[4], u = e[5], c = 1;
    let m = t.determinant();
    if (m === 0)
      return this;
    const y = 1 / m, p = (o * c - a * u) * y, x = -(n * c - u * r) * y, k = -(l * c - h * a) * y, b = (i * c - r * r) * y, _ = (l * u - h * o) * y, v = -(i * u - h * n) * y;
    return this.set(p, x, k, b, _, v);
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
    const t = this.elements, e = t[0], i = t[1], n = 0, r = t[2], l = t[3], o = 0, a = t[4], h = t[5], u = 1, c = l * u - o * h, m = -(i * u - h * n), y = -(r * u - a * o), p = e * u - n * n, x = r * h - a * l, k = -(e * h - a * i);
    return this.set(c, m, y, p, x, k);
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
d(D, "EPSILON", 1e-6), d(D, "IDENTITY_MATRIX", D.default()), d(D, "pools", []), d(D, "poolSize", 100);
let ot = D;
const ti = 5, bs = 5;
var ks = /* @__PURE__ */ ((s) => (s[s.kSerpentine = 0] = "kSerpentine", s[s.kLoop = 1] = "kLoop", s[s.kLocalCusp = 2] = "kLocalCusp", s[s.kCuspAtInfinity = 3] = "kCuspAtInfinity", s[s.kQuadratic = 4] = "kQuadratic", s[s.kLineOrPoint = 5] = "kLineOrPoint", s))(ks || {}), zt = /* @__PURE__ */ ((s) => (s[s.kCW_SkRotationDirection = 0] = "kCW_SkRotationDirection", s[s.kCCW_SkRotationDirection = 1] = "kCCW_SkRotationDirection", s))(zt || {});
function S(s) {
  return T.fromPoint(s);
}
function w(s) {
  let t = f.default();
  return s.storePoint(t), t;
}
function H(s) {
  return s.clone().add(s);
}
function gs(s) {
  return U(pt + s * pt);
}
function _s(s, t, e) {
  let i = s - t, n = t - e;
  return i < 0 && (n = -n), +(i == 0 || n < 0);
}
function Ft(s, t, e) {
  if (s < 0 && (s = -s, t = -t), t == 0 || s == 0 || s >= t)
    return 0;
  let i = s / t;
  return ps(i) || i == 0 ? 0 : (e.value = i, 1);
}
function Ot(s) {
  return s == 0 ? 0 : s;
}
function rt(s, t, e, i) {
  if (s == 0)
    return Ot(Ft(-e, t, i));
  let n = i.clone(), r = t * t - 4 * s * e;
  if (r < 0)
    return Ot(0);
  r = es(r);
  let l = $t(r);
  if (!qt(l))
    return Ot(0);
  let o = t < 0 ? -(t - l) / 2 : -(t + l) / 2;
  if (n.curIndex += Ft(o, s, n), n.curIndex += Ft(e, o, n), n.curIndex - i.curIndex == 2)
    if (i.get(0) > i.get(1)) {
      let a = i.get(0);
      i.set(0, i.get(1)), i.set(1, a);
    } else i.get(0) == i.get(1) && (n.curIndex -= 1);
  return Ot(n.curIndex - i.curIndex);
}
function St(s, t, e, i) {
  return e && e.copy(St(s, t)), i && i.copy(Fe(s, t)), e || w(new bt(s).eval(T.splat(t)));
}
function Fe(s, t) {
  if (t == 0 && s[0] == s[1] || t == 1 && s[1] == s[2])
    return s[2].clone().subtract(s[0]);
  let e = S(s[0]), i = S(s[1]), n = S(s[2]), r = i.clone().sub(e), o = n.clone().sub(i).sub(r).clone().mulScalar(t).add(r);
  return w(o.add(o));
}
function ke(s, t, e) {
  return s.clone().lerp(s, t, e);
}
function vs(s, t, e) {
  let i = S(s[0]), n = S(s[1]), r = S(s[2]), l = T.splat(e), o = ke(i, n, l), a = ke(n, r, l);
  t[0] = w(i), t[1] = w(o), t[2] = w(ke(o, a, l)), t[3] = w(a), t[4] = w(r);
}
function Ts(s, t) {
  return Ne(s, t) && (s || t);
}
function ge(s, t) {
  return !Ts(s.x - t.x, s.y - t.y);
}
function qe(s, t) {
  let e = f.make(2);
  s.dot(t) >= 0 ? (e[0].copy(s), e[1].copy(t)) : s.cross(t) >= 0 ? (e[0].set(-s.y, +s.x), e[1].set(+t.y, -t.x)) : (e[0].set(+s.y, -s.x), e[1].set(-t.y, +t.x));
  let i = T.fromXY(e[0].x, e[1].x), n = T.fromXY(e[0].y, e[1].y), r = i.clone().mul(i).add(n.clone().mul(n)).sqrt().inverse();
  return i.mul(r), n.mul(r), f.create(i[0] + i[1], n[0] + n[1]);
}
function Mr(s) {
  let t = s[1].clone().subtract(s[0]), e = s[2].clone().subtract(s[1]), i = qe(t, e.clone().negate()), n = se(t.dot(i), t.clone().subtract(e).dot(i));
  return n > 0 && n < 1 || (n = 0.5), n;
}
function ei(s, t, e, i) {
  return Ft(s - t, s - t - t + e, i);
}
function Ps(s, t = "x") {
  s.get(1)[t] = s.get(3)[t] = s.get(2)[t];
}
function Ms(s, t) {
  let e = s[0].y, i = s[1].y, n = s[2].y;
  if (_s(e, i, n)) {
    let r = L.from([0]);
    if (Ft(e - i, e - i - i + n, r))
      return vs(s, t, r.value), Ps(L.from(t), "y"), 1;
    i = j(e - i) < j(i - n) ? e : n;
  }
  return t[0].set(s[0].x, e), t[1].set(s[1].x, i), t[2].set(s[2].x, n), 0;
}
function Ss(s) {
  let t = s[1].x - s[0].x, e = s[1].y - s[0].y, i = s[0].x - s[1].x - s[1].x + s[2].x, n = s[0].y - s[1].y - s[1].y + s[2].y, r = -(t * i + e * n), l = i * i + n * n;
  return l < 0 && (r = -r, l = -l), r <= 0 ? 0 : r >= l ? 1 : r / l;
}
function Ci(s, t, e, i = 0) {
  for (let n = 0; n < e; n++)
    s[i + n].copy(t[n]);
}
function Ri(s, t) {
  let e = bt.default(), i = S(s[0]), n = S(s[1]), r = S(s[2]), l = S(s[3]);
  return e.fA = l.clone().add(n.clone().sub(r).mulScalar(3)).sub(i), e.fB = H(r.clone().sub(H(n)).add(i)), e.fC = n.clone().sub(i), w(e.eval(T.splat(t)));
}
function Cs(s, t) {
  let e = S(s[0]), i = S(s[1]), n = S(s[2]), r = S(s[3]), l = i.clone().sub(n).mulScalar(3).add(r).sub(e), o = n.clone().sub(H(i)).add(e);
  return w(l.mulScalar(t).add(o));
}
function wi(s, t, e = f.default()) {
  return t == 0 && s[0].equals(s[1]) || t == 1 && s[2].equals(s[3]) ? (t == 0 ? e.subtractVectors(s[2], s[0]) : e.subtractVectors(s[3], s[1]), !e.x && !e.y && e.subtractVectors(s[3], s[0])) : e.copy(Ri(s, t)), e;
}
function re(s, t, e = f.default()) {
  return e.copy(w(new Bs(s).eval(T.splat(t)))), e;
}
function Ii(s, t, e, i, n) {
  e && re(s, t, e), i && wi(s, t, i), n && n.copy(Cs(s, t));
}
function le(s, t, e, i, n) {
  let r = i - s + 3 * (t - e), l = 2 * (s - t - t + e), o = t - s;
  return rt(r, l, o, n);
}
function O(s, t, e) {
  return s.clone().lerp(s, t, e);
}
function ce(s, t, e) {
  if (e == 1) {
    Ci(t, s, 4), t[4].copy(s[3]), t[5].copy(s[3]), t[6].copy(s[3]);
    return;
  }
  let i = S(s[0]), n = S(s[1]), r = S(s[2]), l = S(s[3]), o = T.splat(e), a = O(i, n, o), h = O(n, r, o), u = O(r, l, o), c = O(a, h, o), m = O(h, u, o), y = O(c, m, o);
  t[0] = w(i), t[1] = w(a), t[2] = w(c), t[3] = w(y), t[4] = w(m), t[5] = w(u), t[6] = w(l);
}
function Rs(s, t, e, i) {
  if (i == 1) {
    ce(s, t, e), t[7].copy(s[3]), t[8].copy(s[3]), t[9].copy(s[3]);
    return;
  }
  let n = T.make(4), r = T.make(4), l = T.make(4), o = T.make(4), a = T.make(4);
  n.setElements([s[0].x, s[0].y, s[0].x, s[0].y]), r.setElements([s[1].x, s[1].y, s[1].x, s[1].y]), l.setElements([s[2].x, s[2].y, s[2].x, s[2].y]), o.setElements([s[3].x, s[3].y, s[3].x, s[3].y]), a.setElements([e, e, i, i]);
  let h = O(n, r, a), u = O(r, l, a), c = O(l, o, a), m = O(h, u, a), y = O(u, c, a), p = O(m, y, a), x = O(m, y, T.make(4).setElements([a[2], a[3], a[0], a[1]]));
  t[0] = f.create(n[0], n[1]), t[1] = f.create(h[0], h[1]), t[2] = f.create(m[0], m[1]), t[3] = f.create(p[0], p[1]), t[4] = f.create(x[0], x[1]), t[5] = f.create(x[2], x[3]), t[6] = f.create(p[2], p[3]), t[7] = f.create(y[2], y[3]), t[8] = f.create(c[2], c[3]), t[9] = f.create(o[2], o[3]);
}
function Ei(s, t, e, i) {
  if (t)
    if (i == 0)
      Ci(t, s, 4);
    else {
      let n = 0, r = 0, l = [];
      for (; n < i - 1; n += 2) {
        let o = T.splat(e[n]);
        if (n != 0) {
          let a = e[n - 1];
          o = o.clone().sub(T.splat(a)).div(T.splat(1 - a)).clmap(T.splat(0), T.splat(1));
        }
        l.length = 0, Rs(s, l, o[0], o[1]), l.forEach((a, h) => {
          t[r + h] = a;
        }), r += 6, s = l.slice(6);
      }
      if (n < i) {
        let o = e[n];
        if (n != 0) {
          let a = e[n - 1];
          o = ct(se(o - a, 1 - a), 0, 1);
        }
        l.length = 0, ce(s, l, o), l.forEach((a, h) => {
          t[r + h] = a;
        });
      }
    }
}
function Sr(s, t) {
  ce(s, t, 0.5);
}
function gt(s, t, e) {
  return T.make(4).setElements([
    s[0] * t + e[0],
    s[1] * t + e[1],
    s[2] * t + e[2],
    s[3] * t + e[3]
  ]);
}
function ws(s, t) {
  return t >= 0 ? Math.abs(s) : -Math.abs(s);
}
function Li(s, t, e, i) {
  let n = -0.5 * (t + ws(Math.sqrt(i), t)), r = -0.5 * n * s, l = Math.abs(n * n + r) < Math.abs(s * e + r) ? se(n, s) : se(e, n);
  return l > 0 && l < 1 || (l = 0.5), l;
}
function Is(s, t, e) {
  return Li(s, t, e, t * t - 4 * s * e);
}
function Cr(s) {
  let t = s[0].equals(s[1]) ? s[2].clone().subtract(s[0]) : s[1].clone().subtract(s[0]), e = s[2].equals(s[3]) ? s[3].clone().subtract(s[1]) : s[3].clone().subtract(s[2]), i = qe(t, e.clone().negate());
  const n = [
    T.fromArray([-1, 2, -1, 0]),
    T.fromArray([3, -4, 1, 0]),
    T.fromArray([-3, 2, 0, 0])
  ];
  let r = gt(
    n[0],
    s[0].x,
    gt(
      n[1],
      s[1].x,
      gt(n[2], s[2].x, T.fromArray([s[3].x, 0, 0, 0]))
    )
  ), l = gt(
    n[0],
    s[0].y,
    gt(
      n[1],
      s[1].y,
      gt(n[2], s[2].y, T.fromArray([s[3].y, 0, 0, 0]))
    )
  ), o = r.clone().mulScalar(i.x).add(l.clone().mulScalar(i.y)), a = 0, h = o[0], u = o[1], c = o[2], m = u * u - 4 * h * c;
  return m > 0 ? Li(h, u, c, m) : (o = r.clone().mulScalar(t.x).add(l.clone().mulScalar(t.y)), h = o[0], u = o[1], h != 0 && (a = -u / (2 * h)), a > 0 && a < 1 || (a = 0.5), a);
}
function oe(s, t = "x") {
  s.get(2)[t] = s.get(4)[t] = s.get(3)[t];
}
function Ai(s, t) {
  let e = L.from([0, 0]), i = le(
    s[0].y,
    s[1].y,
    s[2].y,
    s[3].y,
    e
  ), n = L.from(t);
  return Ei(s, t, e.data, i), t && i > 0 && (oe(n, "y"), i == 2 && (n.next(3), oe(n, "y"))), i;
}
function Rr(s, t) {
  let e = L.from([0, 0]), i = le(
    s[0].x,
    s[1].x,
    s[2].x,
    s[3].x,
    e
  );
  Ei(s, t, e.data, i);
  let n = L.from(t);
  return t && i > 0 && (oe(n, "x"), i == 2 && (n.next(3), oe(n, "x"))), i;
}
function Es(s, t) {
  let e = s[1].x - s[0].x, i = s[1].y - s[0].y, n = s[2].x - 2 * s[1].x + s[0].x, r = s[2].y - 2 * s[1].y + s[0].y, l = s[3].x + 3 * (s[1].x - s[2].x) - s[0].x, o = s[3].y + 3 * (s[1].y - s[2].y) - s[0].y;
  return rt(
    n * o - r * l,
    e * o - i * l,
    e * r - i * n,
    L.from(t)
  );
}
function Ls(s, t) {
  for (let e = t - 1; e > 0; --e)
    for (let i = e; i > 0; --i)
      if (s[i] < s[i - 1]) {
        let n = s[i];
        s[i] = s[i - 1], s[i - 1] = n;
      }
}
class bt {
  constructor(t, e, i) {
    d(this, "fA", T.make(2));
    d(this, "fB", T.make(2));
    d(this, "fC", T.make(2));
    if (t && e && i)
      this.fA.copy(t), this.fB.copy(e), this.fC.copy(i);
    else if (t) {
      let n = S(t[0]), r = S(t[1]), l = S(t[2]), o = H(r.clone().sub(n)), a = l.sub(H(r)).add(n);
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
function As(s, t) {
  for (let e = t; e > 1; --e)
    if (s.get(0) == s.get(1)) {
      for (let i = 1; i < e; ++i)
        s.set(i - 1, s.get(i));
      t -= 1;
    } else
      s.next();
  return t;
}
function Ns(s) {
  return ms(s, 0.3333333);
}
function Ws(s, t) {
  if (nt(s[0]))
    return rt(s[1], s[2], s[3], L.from(t));
  let e, i, n, r, l;
  {
    let u = we(s[0]);
    e = s[1] * u, i = s[2] * u, n = s[3] * u;
  }
  r = (e * e - i * 3) / 9, l = (2 * e * e * e - 9 * e * i + 27 * n) / 54;
  let o = r * r * r, a = l * l - o, h = e / 3;
  if (a < 0) {
    let u = ds(ct(l / U(o), -1, 1)), c = -2 * U(r);
    return t[0] = ct(c * xt(u / 3) - h, 0, 1), t[1] = ct(c * xt((u + 2 * it) / 3) - h, 0, 1), t[2] = ct(c * xt((u - 2 * it) / 3) - h, 0, 1), Ls(t, 3), As(L.from(t), 3);
  } else {
    let u = j(l) + U(a);
    return u = Ns(u), l > 0 && (u = -u), u != 0 && (u += r / u), t[0] = ct(u - h, 0, 1), 1;
  }
}
function ii(s, t) {
  let e = s[1] - s[0], i = s[2] - 2 * s[1] + s[0], n = s[3] + 3 * (s[1] - s[2]) - s[0];
  t[0] = n * n, t[1] = 3 * i * n, t[2] = 2 * i * i + n * e, t[3] = e * i;
}
function Ni(s, t) {
  let e = new Array(4).fill(0), i = new Array(4).fill(0), n;
  for (ii(s.map((l) => l.x), e), ii(s.map((l) => l.y), i), n = 0; n < 4; n++)
    e[n] += i[n];
  return Ws(e, t);
}
function Fs(s) {
  return (s[1].distanceToSquared(s[0]) + s[2].distanceToSquared(s[1]) + s[3].distanceToSquared(s[2])) * 1e-8;
}
function si(s, t, e) {
  let i = s[e].clone(), n = s[e + 1].clone().subtract(i), r = new Array(2).fill(0);
  for (let l = 0; l < 2; ++l) {
    let o = s[t + l].clone().subtract(i);
    r[l] = n.cross(o);
  }
  return r[0] * r[1] >= 0;
}
function qs(s) {
  if (s[0].equalsEpsilon(s[1]) || s[2].equalsEpsilon(s[3]) || si(s, 0, 2) || si(s, 2, 0))
    return -1;
  let t = new Array(3).fill(0), e = Ni(s, t);
  for (let i = 0; i < e; ++i) {
    let n = t[i];
    if (0 >= n || n >= 1)
      continue;
    let l = Ri(s, n).lengthSq(), o = Fs(s);
    if (l < o)
      return n;
  }
  return -1;
}
function zs(s, t, e) {
  const i = s[2] - s[0], n = s[1] - s[0], r = t * n;
  e[0] = t * i - i, e[1] = i - 2 * r, e[2] = r;
}
function ni(s, t, e) {
  let i = new Array(3).fill(0);
  zs(s, t, i);
  let n = L.from([0, 0]);
  return rt(i[0], i[1], i[2], n) == 1 ? (e.value = n.get(0), 1) : 0;
}
function _e(s, t, e, i = "x") {
  let n = $(s[0][i], s[1][i], e), r = $(s[1][i], s[2][i], e);
  t[0][i] = n, t[1][i] = $(n, r, e), t[2][i] = r;
}
function Qs(s, t, e) {
  e[0].set(s[0].x * 1, s[0].y * 1, 1), e[1].set(s[1].x * t, s[1].y * t, t), e[2].set(s[2].x * 1, s[2].y * 1, 1);
}
function ve(s) {
  return f.create(s.x / s.z, s.y / s.z);
}
class ri {
  constructor(t) {
    d(this, "fNumer", bt.default());
    d(this, "fDenom", bt.default());
    let e = S(t.fPts[0]), i = S(t.fPts[1]), n = S(t.fPts[2]), r = T.splat(t.fW), l = i.clone().mul(r);
    this.fNumer.fC.copy(e), this.fNumer.fA.copy(n.clone().sub(H(l)).add(e)), this.fNumer.fB.copy(H(l.clone().sub(e))), this.fDenom.fC.setElements([1, 1]), this.fDenom.fB = H(r.clone().sub(this.fDenom.fC)), this.fDenom.fA.setElements([0 - this.fDenom.fB.x, 0 - this.fDenom.fB.y]);
  }
  eval(t) {
    let e = T.splat(t), i = this.fNumer.eval(e), n = this.fDenom.eval(e);
    return i.div(n);
  }
}
class Bs {
  constructor(t) {
    d(this, "fA", T.make(2));
    d(this, "fB", T.make(2));
    d(this, "fC", T.make(2));
    d(this, "fD", T.make(2));
    let e = S(t[0]), i = S(t[1]), n = S(t[2]), r = S(t[3]), l = T.splat(3);
    this.fA = i.clone().sub(n).mul(l).add(r).sub(e), this.fB = n.clone().sub(H(i)).add(e).mul(l), this.fC = i.clone().sub(e).mul(l), this.fD = e;
  }
  eval(t) {
    return this.fA.clone().mul(t).add(this.fB).mul(t).add(this.fC).mul(t).add(this.fD);
  }
}
class W {
  constructor(t, e, i, n) {
    d(this, "fPts", f.make(3));
    d(this, "fW", 0);
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
    let i = ie.make(3), n = ie.make(3);
    Qs(this.fPts, this.fW, i), _e(i, n, t, "x"), _e(i, n, t, "y"), _e(i, n, t, "z"), e[0].fPts[0] = this.fPts[0].clone(), e[0].fPts[1] = ve(n[0]), e[0].fPts[2] = ve(n[1]), e[1].fPts[0] = e[0].fPts[2].clone(), e[1].fPts[1] = ve(n[2]), e[1].fPts[2] = this.fPts[2].clone();
    let r = U(n[1].z);
    return e[0].fW = n[0].z / r, e[1].fW = n[2].z / r, Ne(e[0].fPts[0].x, 14);
  }
  chopAt_3(t, e, i) {
    if (t == 0 || e == 1)
      if (t == 0 && e == 1) {
        i.copy(this);
        return;
      } else {
        let b = [W.default(), W.default()];
        if (this.chopAt_2(t || e, b)) {
          i.copy(b[+!!t]);
          return;
        }
      }
    let n = new ri(this), r = T.splat(t), l = n.fNumer.eval(r), o = n.fDenom.eval(r), a = T.splat((t + e) / 2), h = n.fNumer.eval(a), u = n.fDenom.eval(a), c = T.splat(e), m = n.fNumer.eval(c), y = n.fDenom.eval(c), p = H(h).sub(l.clone().add(m).mulScalar(0.5)), x = H(u).sub(o.clone().add(y).mulScalar(0.5));
    i.fPts[0] = w(l.clone().div(o)), i.fPts[1] = w(p.clone().div(x)), i.fPts[2] = w(m.clone().div(y));
    let k = x.clone().div(o.clone().mul(y).sqrt());
    i.fW = k[0];
  }
  evalAt(t) {
    return w(new ri(this).eval(t));
  }
  evalAt_3(t, e, i) {
    e && e.copy(this.evalAt(t)), i && i.copy(this.evalTangentAt(t));
  }
  evalTangentAt(t) {
    const e = this.fPts, i = this.fW;
    if (t == 0 && e[0] == e[1] || t == 1 && e[1] == e[2])
      return e[2].clone().subtract(e[0]);
    let n = S(e[0]), r = S(e[1]), l = S(e[2]), o = T.splat(i), a = l.clone().sub(n), h = r.clone().sub(n), u = o.clone().mul(h), c = o.clone().mul(a).sub(a), m = a.clone().sub(u).sub(u);
    return w(new bt(c, m, u).eval(T.splat(t)));
  }
  chop(t) {
    const e = this.fW, i = this.fPts, n = we(V + e), r = S(i[0]).mulScalar(n), l = S(i[1]).mulScalar(e * n), o = S(i[2]).mulScalar(n), a = w(r.clone().add(l)), h = w(l.clone().add(o)), u = w(r.clone().mulScalar(0.5).add(l).add(o.clone().mulScalar(0.5)));
    t[0].fPts[0].copy(i[0]), t[0].fPts[1].copy(a), t[0].fPts[2].copy(u), t[1].fPts[0].copy(u), t[1].fPts[1].copy(h), t[1].fPts[2].copy(i[2]), t[0].fW = t[1].fW = gs(e);
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
    let n = e - 1, r = n / (4 * (2 + n)), l = r * (i[0].x - 2 * i[1].x + i[2].x), o = r * (i[0].y - 2 * i[1].y + i[2].y), a = U(l * l + o * o), h = 0;
    for (h = 0; h < ti && !(a <= t); ++h)
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
    if (e == ti) {
      let l = [W.default(), W.default()];
      if (this.chop(l), ge(l[0].fPts[1], l[0].fPts[2]) && ge(l[1].fPts[0], l[1].fPts[1]))
        return t.get(1).copy(l[0].fPts[1]), t.get(2).copy(l[0].fPts[1]), t.get(3).copy(l[0].fPts[1]), t.get(4).copy(l[1].fPts[2]), e = 1, r(), 1 << e;
    }
    return t.next(), Ie(this, t, e), r(), 1 << e;
  }
  findMidTangent() {
    const t = this.fPts, e = this.fW;
    let i = t[1].clone().subtract(t[0]), n = t[2].clone().subtract(t[1]), r = qe(i, n.clone().negate()), l = t[2].clone().subtract(t[0]).multiplyScalar(e - 1), o = t[2].clone().subtract(t[0]).subtract(t[1].clone().subtract(t[0]).multiplyScalar(e * 2)), a = t[1].clone().subtract(t[0]).multiplyScalar(e), h = r.dot(l), u = r.dot(o), c = r.dot(a);
    return Is(h, u, c);
  }
  findXExtrema(t) {
    return ni(this.fPts.map((e) => e.x), this.fW, t);
  }
  findYExtrema(t) {
    return ni(this.fPts.map((e) => e.y), this.fW, t);
  }
  chopAtXExtrema(t) {
    let e = E.from(0);
    if (this.findXExtrema(e)) {
      if (!this.chopAt_2(e.value, t))
        return !1;
      let i = t[0].fPts[2].x;
      return t[0].fPts[1].x = i, t[1].fPts[0].x = i, t[1].fPts[1].x = i, !0;
    }
    return !1;
  }
  chopAtYExtrema(t) {
    let e = E.from(0);
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
    let i = f.make(4);
    i[0].copy(e[0]), i[1].copy(e[2]);
    let n = 2, r = E.from(0);
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
    if (j(o) <= We && l > 0 && (o >= 0 && i == 0 || o <= 0 && i == 1))
      return 0;
    i == 1 && (o = -o);
    let h = 0;
    o == 0 ? h = 2 : l == 0 ? h = o > 0 ? 1 : 3 : (o < 0 && (h += 2), l < 0 != o < 0 && (h += 1));
    const u = [
      f.create(1, 0),
      f.create(1, 1),
      f.create(0, 1),
      f.create(-1, 1),
      f.create(-1, 0),
      f.create(-1, -1),
      f.create(0, -1),
      f.create(1, -1)
    ], c = Ce;
    let m = h;
    for (let b = 0; b < m; ++b)
      r[b].set(u[b * 2], u[b * 2 + 1], u[b * 2 + 2], c);
    const y = f.create(l, o), p = u[h * 2], x = p.dot(y);
    if (x < 1) {
      let b = f.create(p.x + l, p.y + o);
      const _ = U((1 + x) / 2);
      b.setLength(we(_)), ge(p, b) || (r[m].set(p, b, y, _), m += 1);
    }
    let k = ot.identity();
    k.setSinCos(t.y, t.x), i == 1 && k.preScale(V, -V), n && k.premultiply(n);
    for (let b = 0; b < m; ++b)
      k.mapPoints(r[b].fPts, r[b].fPts);
    return m;
  }
}
function Vs(s, t) {
  let e = L.from([0, 0]), i = ei(s[0].x, s[1].x, s[2].x, e);
  e.next(i), i += ei(s[0].y, s[1].y, s[2].y, e), e.move(0);
  for (let n = 0; n < i; ++n)
    t[n] = St(s, e.get(n));
  return t[i].copy(s[2]), i + 1;
}
function Ys(s, t) {
  let e = L.from([0, 0, 0, 0]), i = 0;
  i = le(s[0].x, s[1].x, s[2].x, s[3].x, e), i += le(s[0].y, s[1].y, s[2].y, s[3].y, e), e.move(0);
  for (let n = 0; n < i; ++n)
    Ii(s, e.get(n), t[n], null, null);
  return t[i].copy(s[3]), i + 1;
}
function Ds(s, t, e) {
  let i = new W();
  i.set(s[0], s[1], s[2], t);
  let n = [E.from(0), E.from(0)], r = i.findXExtrema(n[0]);
  r += i.findYExtrema(n[1]);
  for (let l = 0; l < r; ++l)
    e[l] = i.evalAt(n[l].value);
  return e[r].copy(s[2]), r + 1;
}
function jt(s, t, e) {
  return (s - t) * (e - t) <= 0;
}
function Ie(s, t, e) {
  if (e === 0)
    return t.get(0).copy(s.fPts[1]), t.get(1).copy(s.fPts[2]), t.next(2), t;
  {
    const i = W.make(2);
    s.chop(i);
    const n = s.fPts[0].y;
    let r = s.fPts[2].y;
    if (jt(n, s.fPts[1].y, r)) {
      let l = i[0].fPts[2].y;
      if (!jt(n, l, r)) {
        let o = Math.abs(l - n) < Math.abs(l - r) ? n : r;
        i[0].fPts[2].y = i[1].fPts[0].y = o;
      }
      jt(n, i[0].fPts[1].y, i[0].fPts[2].y) || (i[0].fPts[1].y = n), jt(i[1].fPts[0].y, i[1].fPts[1].y, r) || (i[1].fPts[1].y = r);
    }
    return --e, Ie(i[0], t, e), Ie(i[1], t, e);
  }
}
class wr {
  constructor() {
    d(this, "fQuadCount", 0);
  }
  computeQuads(t, e, i) {
    if (t instanceof W) {
      i = e;
      let n = t.computeQuadPOW2(i);
      this.fQuadCount = 1 << n;
      let r = L.from(f.make(1 + 2 * this.fQuadCount));
      return this.fQuadCount = t.chopIntoQuadsPOW2(r, n), r.data;
    } else {
      let n = new W(t, e);
      return this.computeQuads(n, i);
    }
  }
}
function Xt(s, t, e, i) {
  return s + t > e ? Math.min(i, e / (s + t)) : i;
}
function Os(s, t) {
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
      o = Os(o, 0);
    r.value = o;
  }
}
function Ut(s, t) {
  s.value + t.value == s.value ? t.value = 0 : s.value + t.value == t.value && (s.value = 0);
}
function li(s, t, e) {
  return t <= e && s <= e - t && t + s <= e && e - s >= t && s >= 0;
}
function oi(s) {
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
function ai(s) {
  let t = !0;
  for (let e = 0; e < 4; ++e)
    s[e].x <= 0 || s[e].y <= 0 ? (s[e].x = 0, s[e].y = 0) : t = !1;
  return t;
}
const _t = 0, ht = 1, lt = 2, At = 3, Ht = 4, Te = 5, js = 5;
var Wi = /* @__PURE__ */ ((s) => (s[s.kUpperLeft_Corner = 0] = "kUpperLeft_Corner", s[s.kUpperRight_Corner = 1] = "kUpperRight_Corner", s[s.kLowerRight_Corner = 2] = "kLowerRight_Corner", s[s.kLowerLeft_Corner = 3] = "kLowerLeft_Corner", s))(Wi || {});
const ut = 0, vt = 1, Tt = 2, Pt = 3, mt = class mt {
  constructor() {
    d(this, "fRect", q.makeEmpty());
    d(this, "fType", 0);
    d(this, "fRadii", [f.zero(), f.zero(), f.zero(), f.zero()]);
  }
  static default() {
    return new this();
  }
  static from(t, e, i = _t) {
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
    return _t == this.getType();
  }
  isRect() {
    return ht == this.getType();
  }
  isOval() {
    return lt == this.getType();
  }
  isSimple() {
    return At == this.getType();
  }
  isNinePatch() {
    return Ht == this.getType();
  }
  isComplex() {
    return Te == this.getType();
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
    }), this.fType = ht);
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
      this.setRadiiEmpty(), this.fType = ht;
    else {
      for (let n = 0; n < 4; ++n)
        this.fRadii[n].set(e, i);
      this.fType = lt;
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
    if (Ne(e, i) || (e = i = 0), n.width < e + e || n.height < i + i) {
      let r = Math.min(n.width / (e + e), n.height / (i + i));
      e *= r, i *= r;
    }
    if (e <= 0 || i <= 0) {
      this.setRect(t);
      return;
    }
    for (let r = 0; r < 4; ++r)
      this.fRadii[r].set(e, i);
    this.fType = At, e >= J(n.width) && i >= J(n.height) && (this.fType = lt);
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
    if (!xs([e, i, n, r], 4)) {
      this.setRect(t);
      return;
    }
    e = Math.max(e, 0), i = Math.max(i, 0), n = Math.max(n, 0), r = Math.max(r, 0);
    let a = V;
    e + n > l.width && (a = l.width / (e + n)), i + r > l.height && (a = Math.min(a, l.height / (i + r))), a < V && (e *= a, i *= a, n *= a, r *= a), e == n && i == r ? e >= J(l.width) && i >= J(l.height) ? this.fType = lt : e == 0 || i == 0 ? (this.fType = ht, e = 0, i = 0, n = 0, r = 0) : this.fType = At : this.fType = Ht, this.fRadii[ut].set(e, i), this.fRadii[vt].set(n, i), this.fRadii[Tt].set(n, r), this.fRadii[Pt].set(e, r);
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
      }), ai(this.fRadii)) {
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
    return t.fRect == e.fRect && Ge(t.fRadii.map((i) => i.x), e.fRadii.map((i) => i.x), 4);
  }
  /** Returns true if bounds and radii in a are not equal to bounds and radii in b.
  
         a and b are not equal if either contain NaN. a and b are equal if members
         contain zeroes with different signs.
  
         @param a  SkRect bounds and radii to compare
         @param b  SkRect bounds and radii to compare
         @return   true if members are not equal
     */
  notEquals(t, e) {
    return t.fRect != e.fRect || !Ge(t.fRadii.map((i) => i.x), e.fRadii.map((i) => i.x), 4);
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
    if (r.right <= r.left && (l = !0, r.left = r.right = Ke(r.left, r.right)), r.bottom <= r.top && (l = !0, r.top = r.bottom = Ke(r.top, r.bottom)), l) {
      i.fRect.copy(r), i.setRadiiEmpty(), i.fType = _t;
      return;
    }
    if (!r.isFinite()) {
      i.setEmpty();
      return;
    }
    let o = [f.zero(), f.zero(), f.zero(), f.zero()];
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
    let r = oi(t), l = this.fType, o = this.fRect;
    if (l < 0 || l > js)
      return !1;
    switch (l) {
      case _t:
        if (!o.isEmpty() || !e || !n || !i)
          return !1;
        break;
      case ht:
        if (o.isEmpty() || !e || !n || !i)
          return !1;
        break;
      case lt:
        if (o.isEmpty() || e || !n || i)
          return !1;
        for (let a = 0; a < 4; ++a)
          if (!Z(t[a].x, o.halfWidth) || !Z(t[a].y, o.halfHeight))
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
      case Te:
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
      if (!li(e[i].x, t.left, t.right) || !li(e[i].y, t.top, t.bottom))
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
    if (e.fRect = i, e.fType = this.fType, ht == this.fType)
      return !0;
    if (lt == this.fType) {
      for (let a = 0; a < 4; ++a)
        e.fRadii[a].x = J(i.width), e.fRadii[a].y = J(i.height);
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
        const c = u + h >= 4 ? (u + h) % 4 : u + h;
        e.fRadii[u].x = this.fRadii[c].y, e.fRadii[u].y = this.fRadii[c].x;
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
    return t.isFinite() ? (this.fRect = t.makeSorted(), this.fRect.isEmpty() ? (this.setRadiiEmpty(), this.fType = _t, !1) : !0) : (this.setEmpty(), !1);
  }
  computeType() {
    const t = this.fRect;
    if (t.isEmpty()) {
      this.fType = _t;
      return;
    }
    let e = this.fRadii, i = !0, n = e[0].x == 0 || e[0].y == 0;
    for (let r = 1; r < 4; ++r)
      e[r].x != 0 && e[r].y != 0 && (n = !1), (e[r].x != e[r - 1].x || e[r].y != e[r - 1].y) && (i = !1);
    if (n) {
      this.fType = ht;
      return;
    }
    if (i) {
      e[0].x >= J(t.width) && e[0].y >= J(t.height) ? this.fType = lt : this.fType = At;
      return;
    }
    oi(e) ? this.fType = Ht : this.fType = Te, this.isValid() || this.setRect(this.rect());
  }
  checkCornerContainment(t, e) {
    let i = f.default(), n;
    const r = this.fRect, l = this.fRadii;
    if (lt == this.type)
      i.set(t - r.centerX, e - r.centerY), n = ut;
    else if (t < r.left + l[ut].x && e < r.top + l[ut].y)
      n = ut, i.set(
        t - (r.left + l[ut].x),
        e - (r.top + l[ut].y)
      );
    else if (t < r.left + l[Pt].x && e > r.bottom - l[Pt].y)
      n = Pt, i.set(
        t - (r.left + l[Pt].x),
        e - (r.bottom - l[Pt].y)
      );
    else if (t > r.right - l[vt].x && e < r.top + l[vt].y)
      n = vt, i.set(
        t - (r.right - l[vt].x),
        e - (r.top + l[vt].y)
      );
    else if (t > r.right - l[Tt].x && e > r.bottom - l[Tt].y)
      n = Tt, i.set(
        t - (r.right - l[Tt].x),
        e - (r.bottom - l[Tt].y)
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
    t = Xt(i[0].x, i[1].x, n, t), t = Xt(i[1].y, i[2].y, r, t), t = Xt(i[2].x, i[3].x, n, t), t = Xt(i[3].y, i[0].y, r, t);
    let l = E.from(i[0].x), o = E.from(i[1].x), a = E.from(i[2].x), h = E.from(i[3].x), u = E.from(i[0].y), c = E.from(i[1].y), m = E.from(i[2].y), y = E.from(i[3].y);
    return Ut(l, o), Ut(c, m), Ut(a, h), Ut(y, u), t < 1 && (Zt(n, t, l, o), Zt(r, t, c, m), Zt(n, t, a, h), Zt(r, t, y, u)), i[0].set(l.value, u.value), i[1].set(o.value, c.value), i[2].set(a.value, m.value), i[3].set(h.value, y.value), ai(i), this.computeType(), t < 1;
  }
};
d(mt, "Corner", Wi);
let yt = mt;
var dt = /* @__PURE__ */ ((s) => (s[s.kWinding = 0] = "kWinding", s[s.kEvenOdd = 1] = "kEvenOdd", s[s.kInverseWinding = 2] = "kInverseWinding", s[s.kInverseEvenOdd = 3] = "kInverseEvenOdd", s))(dt || {}), F = /* @__PURE__ */ ((s) => (s[s.kCW = 0] = "kCW", s[s.kCCW = 1] = "kCCW", s))(F || {}), et = /* @__PURE__ */ ((s) => (s[s.kLine_SkPathSegmentMask = 1] = "kLine_SkPathSegmentMask", s[s.kQuad_SkPathSegmentMask = 2] = "kQuad_SkPathSegmentMask", s[s.kConic_SkPathSegmentMask = 4] = "kConic_SkPathSegmentMask", s[s.kCubic_SkPathSegmentMask = 8] = "kCubic_SkPathSegmentMask", s))(et || {}), g = /* @__PURE__ */ ((s) => (s[s.kMove = 0] = "kMove", s[s.kLine = 1] = "kLine", s[s.kQuad = 2] = "kQuad", s[s.kConic = 3] = "kConic", s[s.kCubic = 4] = "kCubic", s[s.kClose = 5] = "kClose", s))(g || {}), R = /* @__PURE__ */ ((s) => (s[
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
function Xs(s) {
  return (s & 2) != 0;
}
class Zs {
  constructor(t, e = !1) {
    d(this, "path");
    d(this, "forceClose", !1);
    d(this, "needClose", !1);
    d(this, "closeLine", !1);
    d(this, "verbIndex", 0);
    d(this, "verbEnd", 0);
    d(this, "lastPoint", f.default());
    d(this, "movePoint", f.default());
    d(this, "pointIndex", 0);
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
        this.movePoint.copy(e[i]), t[0] = f.fromPoint(e[i]), i += 1, this.lastPoint.copy(this.movePoint), this.needClose = this.forceClose;
        break;
      case g.kLine:
        t[0] = this.lastPoint.clone(), t[1] = f.fromPoint(e[i]), this.lastPoint.copy(e[i]), this.closeLine = !1, i += 1;
        break;
      case g.kQuad:
        t[0] = this.lastPoint.clone(), t[1] = f.fromPoint(e[i]), t[2] = f.fromPoint(e[i + 1]), this.lastPoint.copy(e[i + 1]), i += 2;
        break;
      case g.kCubic:
        t[0] = this.lastPoint.clone(), t[1] = f.fromPoint(e[i]), t[2] = f.fromPoint(e[i + 1]), t[3] = f.fromPoint(e[i + 2]), this.lastPoint.copy(e[i + 2]), i += 3;
        break;
      case g.kClose:
        n = this.autoClose(t), n == R.kLineTo ? this.verbIndex-- : this.needClose = !1, this.lastPoint.copy(this.movePoint);
        break;
    }
    return this.pointIndex = i, n;
  }
}
function Fi(s, t, e) {
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
      let o = (r + n) / 2, a = $(i[0], i[1], o), h = $(i[1], i[2], o), u = $(i[2], i[3], o), c = $(a, h, o), m = $(h, u, o), y = $(c, m, o);
      if (y == 0)
        return e.value = o, !0;
      y < 0 ? n = o : r = o;
    } while (!(j(r - n) <= l));
    return e.value = (n + r) / 2, !0;
  }
}
function Q(s, t, e) {
  return (s - t) * (e - t) <= 0;
}
function me(s, t, e, i) {
  return e.y == i.y ? Q(e.x, s, i.x) && s != i.x : s == e.x && t == e.y;
}
function Us(s) {
  return s < 0 ? -1 : +(s > 0);
}
function Hs(s, t, e, i) {
  let n = s[0].x, r = s[0].y, l = s[1].x, o = s[1].y, a = o - r, h = 1;
  if (r > o) {
    let c = r;
    r = o, o = c, h = -1;
  }
  if (e < r || e > o)
    return 0;
  if (me(t, e, s[0], s[1]))
    return i.value += 1, 0;
  if (e == o)
    return 0;
  let u = (l - n) * (e - s[0].y) - a * (t - n);
  return u ? Us(u) == h && (h = 0) : ((t != l || e != s[1].y) && (i.value += 1), h = 0), h;
}
function qi(s, t, e) {
  return s == t ? !0 : s < t ? t <= e : t >= e;
}
function ye(s, t, e, i) {
  return (s * i + t) * i + e;
}
function Ks(s, t, e, i, n) {
  return ((s * n + t) * n + e) * n + i;
}
function hi(s, t, e, i) {
  let n = s[0].y, r = s[2].y, l = 1;
  if (n > r) {
    let u = n;
    n = r, r = u, l = -1;
  }
  if (e < n || e > r)
    return 0;
  if (me(t, e, s[0], s[2]))
    return i.value += 1, 0;
  if (e == r)
    return 0;
  let o = L.from([0, 0]), a = rt(
    s[0].y - 2 * s[1].y + s[2].y,
    2 * (s[1].y - s[0].y),
    s[0].y - e,
    o
  ), h;
  if (a == 0)
    h = s[1 - l].x;
  else {
    let u = o.get(0), c = s[0].x, m = s[2].x - 2 * s[1].x + c, y = 2 * (s[1].x - c);
    h = ye(m, y, c, u);
  }
  return Z(h, t) && (t != s[2].x || e != s[2].y) ? (i.value += 1, 0) : h < t ? l : 0;
}
function Js(s, t, e, i) {
  let n, r;
  n = r = t[0].x;
  for (let l = 1; l < s; ++l)
    n = Math.min(n, t[l].x), r = Math.max(r, t[l].x);
  e.value = n, i.value = r;
}
function zi(s, t, e, i, n) {
  let r = i + 3 * (t - e) - s, l = 3 * (e - t - t + s), o = 3 * (t - s);
  return Ks(r, l, o, s, n);
}
function $s(s, t, e, i) {
  let n = s[0].y, r = s[3].y, l = 1;
  if (n > r) {
    let c = n;
    n = r, r = c, l = -1;
  }
  if (e < n || e > r)
    return 0;
  if (me(t, e, s[0], s[3]))
    return i.value += 1, 0;
  if (e == r)
    return 0;
  let o = E.from(0), a = E.from(0);
  if (Js(4, s, o, a), t < o.value)
    return 0;
  if (t > a.value)
    return l;
  let h = E.from(0);
  if (!Fi(s, e, h))
    return 0;
  let u = zi(s[0].x, s[1].x, s[2].x, s[3].x, h.value);
  return Z(u, t) && (t != s[3].x || e != s[3].y) ? (i.value += 1, 0) : u < t ? l : 0;
}
function Gs(s, t, e, i) {
  let n = Array.from({ length: 5 }, () => f.default()), r = 0;
  qi(s[0].y, s[1].y, s[2].y) || (r = Ms(s, n), s = n);
  let l = hi(s, t, e, i);
  return r > 0 && (l += hi(s.slice(2), t, e, i)), l;
}
function tn(s, t, e, i) {
  let n = Array.from({ length: 10 }, () => f.default()), r = Ai(s, n), l = 0;
  for (let o = 0; o <= r; ++o)
    l += $s(n.slice(o * 3), t, e, i);
  return l;
}
function Qi(s, t, e) {
  let i = s[1] * t, n = s[0], r = s[2] - 2 * i + n, l = 2 * (i - n);
  return ye(r, l, n, e);
}
function Bi(s, t) {
  let e = 2 * (s - 1), i = 1, n = -e;
  return ye(n, e, i, t);
}
function ui(s, t, e, i) {
  const n = s.fPts;
  let r = n[0].y, l = n[2].y, o = 1;
  if (r > l) {
    let p = r;
    r = l, l = p, o = -1;
  }
  if (e < r || e > l)
    return 0;
  if (me(t, e, n[0], n[2]))
    return i.value += 1, 0;
  if (e == l)
    return 0;
  let a = L.from([0, 0]), h = n[2].y, u = n[1].y * s.fW - e * s.fW + e, c = n[0].y;
  h += c - 2 * u, u -= c, c -= e;
  let m = rt(h, 2 * u, c, a), y = 0;
  if (m == 0)
    y = n[1 - o].x;
  else {
    let p = a.get(0);
    y = Qi(n.map((x) => x.x), s.fW, p) / Bi(s.fW, p);
  }
  return Z(y, t) && (t != n[2].x || e != n[2].y) ? (i.value += 1, 0) : y < t ? o : 0;
}
function Ir(s, t, e, i, n) {
  let r = new W(s, i), l = [W.default(), W.default()], o = qi(s[0].y, s[1].y, s[2].y) || !r.chopAtYExtrema(l), a = ui(o ? r : l[0], t, e, n);
  return o || (a += ui(l[1], t, e, n)), a;
}
function en(s, t, e, i) {
  let n = s[0].y, r = s[1].y;
  if (!Q(n, e, r))
    return;
  let l = s[0].x, o = s[1].x;
  if (!Q(l, t, o))
    return;
  let a = o - l, h = r - n;
  if (!Z((t - l) * h, a * (e - n)))
    return;
  let u = f.default();
  u.set(a, h), i.push(u);
}
function sn(s, t, e, i) {
  if (!Q(s[0].y, e, s[1].y) && !Q(s[1].y, e, s[2].y) || !Q(s[0].x, t, s[1].x) && !Q(s[1].x, t, s[2].x))
    return;
  let n = L.from([0, 0]), r = rt(
    s[0].y - 2 * s[1].y + s[2].y,
    2 * (s[1].y - s[0].y),
    s[0].y - e,
    n
  );
  for (let l = 0; l < r; ++l) {
    let o = n.get(l), a = s[0].x, h = s[2].x - 2 * s[1].x + a, u = 2 * (s[1].x - a), c = ye(h, u, a, o);
    Z(t, c) && i.push(Fe(s, o));
  }
}
function nn(s, t, e, i) {
  if (!Q(s[0].y, e, s[1].y) && !Q(s[1].y, e, s[2].y) && !Q(s[2].y, e, s[3].y) || !Q(s[0].x, t, s[1].x) && !Q(s[1].x, t, s[2].x) && !Q(s[2].x, t, s[3].x))
    return;
  let n = Array.from({ length: 10 }, () => f.default()), r = Ai(s, n);
  for (let l = 0; l <= r; ++l) {
    let o = n.slice(l * 3), a = E.from(0);
    if (!Fi(o, e, a))
      continue;
    let h = zi(o[0].x, o[1].x, o[2].x, o[3].x, a.value);
    if (!Z(t, h))
      continue;
    let u = f.default();
    Ii(o, a.value, null, u, null), i.push(u);
  }
}
function Er(s, t, e, i, n) {
  if (!Q(s[0].y, e, s[1].y) && !Q(s[1].y, e, s[2].y) || !Q(s[0].y, t, s[1].y) && !Q(s[1].y, t, s[2].y))
    return;
  let r = L.from([0, 0]), l = s[2].y, o = s[1].y * i - e * i + e, a = s[0].y;
  l += a - 2 * o, o -= a, a -= e;
  let h = rt(l, 2 * o, a, r);
  for (let u = 0; u < h; ++u) {
    let c = r.get(u), m = Qi(s.map((p) => p.y), i, c) / Bi(i, c);
    if (!Z(t, m))
      continue;
    let y = new W(s, i);
    n.push(y.evalTangentAt(c));
  }
}
var Vi = /* @__PURE__ */ ((s) => (s[s.kIsA_JustMoves = 0] = "kIsA_JustMoves", s[s.kIsA_MoreThanMoves = 1] = "kIsA_MoreThanMoves", s[s.kIsA_Oval = 2] = "kIsA_Oval", s[s.kIsA_RRect = 3] = "kIsA_RRect", s))(Vi || {});
function fi(s, t) {
  return Z(s.x, t.x) && Z(s.y, t.y);
}
function ci(s, t, e, i, n) {
  let r = s * Math.PI / 180, l = (s + t) * Math.PI / 180;
  if (e.y = Gt(r), e.x = te(r), i.y = Gt(l), i.x = te(l), e.equals(i)) {
    let o = Math.abs(t);
    if (o < 360 && o > 359) {
      let a = ss(1953125e-9, t);
      do
        l -= a, i.y = Gt(l), i.x = te(l);
      while (e.equals(i));
    }
  }
  n.value = t > 0 ? zt.kCW_SkRotationDirection : zt.kCCW_SkRotationDirection;
}
function mi(s, t, e, i) {
  return e == 0 && (t == 0 || t == 360) ? (i.set(s.right, s.centerX), !0) : s.width == 0 && s.height == 0 ? (i.set(s.right, s.top), !0) : !1;
}
function yi(s, t, e, i, n, r) {
  let l = ot.fromScale(J(s.width), J(s.height));
  l.postTranslate(s.centerX, s.centerY);
  let o = W.BuildUnitArc(t, e, i, l, n);
  return o == 0 && l.mapXY(e.x, e.y, r), o;
}
const fe = class fe {
  constructor() {
    d(this, "fPts", []);
    d(this, "fVerbs", []);
    d(this, "fConicWeights", []);
    d(this, "fFillType", dt.kWinding);
    d(this, "fIsVolatile", !1);
    d(this, "fSegmentMask", et.kLine_SkPathSegmentMask);
    d(this, "fLastMovePoint", f.zero());
    d(this, "fLastMoveIndex", -1);
    // only needed until SkPath is immutable
    d(this, "fNeedsMoveVerb", !0);
    d(this, "fIsA", 0);
    d(this, "fIsAStart", -1);
    // tracks direction iff fIsA is not unknown
    d(this, "fIsACCW", !1);
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
    return Xs(this.getFillType());
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
    return this.fVerbs = t.fVerbs.slice(), this.fPts = t.fPts.map((e) => f.fromPoint(e)), this.fConicWeights = t.fConicWeights.slice(), this.fFillType = t.fFillType, this.fIsVolatile = t.fIsVolatile, this.fSegmentMask = t.fSegmentMask, this.fLastMovePoint.copy(t.fLastMovePoint), this.fLastMoveIndex = t.fLastMoveIndex, this;
  }
  clone() {
    return fe.default().copy(this);
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
      switch (l -= di(h), h) {
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
      let c = n[--i], m = di(c);
      switch (h && (--l, this.moveTo(r[l]), h = !1), l -= m, c) {
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
    this.fPts = [], this.fVerbs = [], this.fConicWeights = [], this.fFillType = dt.kWinding, this.fIsVolatile = !1, this.fSegmentMask = 0, this.fLastMovePoint = f.zero(), this.fLastMoveIndex = -1, this.fNeedsMoveVerb = !0, this.fSegmentMask = et.kLine_SkPathSegmentMask;
  }
  moveTo(t, e) {
    let i = typeof t == "number" ? f.create(t, e) : t;
    return this.fLastMoveIndex = this.fPts.length, this.fPts.push(i), this.fVerbs.push(g.kMove), this.fLastMovePoint.copy(i), this.fNeedsMoveVerb = !1, this;
  }
  lineTo(t, e) {
    let i = typeof t == "number" ? f.create(t, e) : t;
    return this.ensureMove(), this.fPts.push(i), this.fVerbs.push(g.kLine), this.fSegmentMask |= et.kLine_SkPathSegmentMask, this;
  }
  quadTo(t, e, i, n) {
    let r = typeof t == "number" ? f.create(t, e) : t, l = typeof e == "number" ? f.create(i, n) : e;
    return this.ensureMove(), this.fPts.push(r), this.fPts.push(l), this.fVerbs.push(g.kQuad), this.fSegmentMask |= et.kQuad_SkPathSegmentMask, this;
  }
  conicTo(t, e, i, n, r) {
    let l = typeof t == "number" ? f.create(t, e) : t, o = typeof e == "number" ? f.create(i, n) : e, a = typeof t == "number" ? r : i;
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
      let c = h.x + (l.x - h.x) * u, m = h.y + (l.y - h.y) * u, y = o.x + (l.x - o.x) * u, p = o.y + (l.y - o.y) * u;
      this.cubicTo(c, m, y, p, o.x, o.y);
    }
    return this.fSegmentMask |= et.kConic_SkPathSegmentMask, this;
  }
  cubicTo(t, e, i, n, r, l) {
    this.ensureMove();
    let o = typeof t == "number" ? f.create(t, e) : t, a = typeof e == "number" ? f.create(i, n) : e, h = typeof i == "number" ? f.create(r, l) : i;
    return this.fPts.push(o), this.fPts.push(a), this.fPts.push(h), this.fVerbs.push(g.kCubic), this.fSegmentMask |= et.kCubic_SkPathSegmentMask, this;
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
      this.fSegmentMask |= et.kLine_SkPathSegmentMask;
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
    let l = f.default();
    if (mi(t, e, i, l))
      return n ? this.moveTo(l) : this.lineTo(l);
    let o = f.default(), a = f.default(), h = E.from(zt.kCW_SkRotationDirection);
    ci(e, i, o, a, h);
    let u = f.default(), c = (p) => {
      n ? this.moveTo(p) : fi(this.lastPoint, p) || this.lineTo(p);
    };
    if (o.equals(a)) {
      let p = Je(e + i), x = t.width / 2, k = t.height / 2;
      return u.set(
        t.centerX + x * xt(p),
        t.centerY + k * Re(p)
      ), c(u), this;
    }
    let m = W.make(5), y = yi(t, o, a, h.value, m, u);
    if (y) {
      this.incReserve(y * 2 + 1);
      const p = m[0].fPts[0];
      c(p);
      for (let x = 0; x < y; ++x)
        this.conicTo(m[x].fPts[1], m[x].fPts[2], m[x].fW);
    } else
      c(u);
    return this;
  }
  arcTo(t, e, i, n, r) {
    const l = arguments.length, o = this.fVerbs, a = this.fPts;
    if (l === 3) {
      const h = t, u = e, c = i;
      if (this.ensureMove(), c == 0)
        return this.lineTo(h);
      let m = this.lastPoint, y = f.create(h.x - m.x, h.y - m.y).toNormalize(), p = f.create(u.x - h.x, u.y - h.y).toNormalize(), x = y.dot(p), k = y.cross(p);
      if (!y.isFinite() || !p.isFinite() || nt($t(k)))
        return this.lineTo(h);
      let b = j($t(c * (1 - x) / k)), _ = h.x - b * y.x, v = h.y - b * y.y, P = f.create(p.x, p.y);
      P.setLength(b), this.lineTo(_, v);
      let M = U($t(pt + x * 0.5));
      return this.conicTo(h, h.clone().add(P), M);
    } else if (l === 4) {
      let h = t, u = e, c = i, m = n;
      if (h.width < 0 || h.height < 0)
        return this;
      o.length <= 0 && (m = !0);
      let y = f.default();
      if (mi(h, u, c, y))
        return m ? this.moveTo(y) : this.lineTo(y);
      let p = f.default(), x = f.default(), k = E.from(zt.kCW_SkRotationDirection);
      ci(u, c, p, x, k);
      let b = f.default(), _ = (M) => {
        m ? this.moveTo(M) : fi(a[this.fPts.length - 1], M) || this.lineTo(M);
      };
      if (p.equalsEpsilon(x)) {
        let M = Je(u + c), N = h.width / 2, A = h.height / 2;
        return b.set(
          h.centerX + N * xt(M),
          h.centerY + A * Re(M)
        ), _(b), this;
      }
      let v = W.make(bs), P = yi(h, p, x, k.value, v, b);
      if (P) {
        this.incReserve(P * 2 + 1);
        const M = v[0].fPts[0];
        _(M);
        for (let N = 0; N < P; ++N)
          this.conicTo(v[N].fPts[1], v[N].fPts[2], v[N].fW);
      } else
        _(b);
      return this;
    } else {
      let h = t, u = e, c = i, m = n, y = r;
      this.ensureMove();
      let p = [this.lastPoint.clone(), y];
      if (!h.x || !h.y)
        return this.lineTo(y);
      if (p[0] == p[1])
        return this.lineTo(y);
      let x = j(h.x), k = j(h.y), b = p[0].clone().subtract(p[1]);
      b.multiplyScalar(0.5);
      let _ = ot.identity();
      _.setRotate(-u);
      let v = f.default();
      _.mapPoints([v], [b]);
      let P = x * x, M = k * k, N = v.x * v.x, A = v.y * v.y, I = N / P + A / M;
      I > 1 && (I = U(I), x *= I, k *= I), _.setScale(1 / x, 1 / k), _.preRotate(-u);
      let C = [f.default(), f.default()];
      _.mapPoints(C, p);
      let B = C[1].clone().subtract(C[0]), G = B.x * B.x + B.y * B.y, at = Math.max(1 / G - 0.25, 0), tt = U(at);
      m == F.kCCW != !!c && (tt = -tt), B.multiplyScalar(tt);
      let K = C[0].clone().add(C[1]);
      K.multiplyScalar(0.5), K.translate(-B.y, B.x), C[0].subtract(K), C[1].subtract(K);
      let wt = He(C[0].y, C[0].x), Y = He(C[1].y, C[1].x) - wt;
      if (Y < 0 && m == F.kCW ? Y += it * 2 : Y > 0 && m != F.kCW && (Y -= it * 2), j(Y) < it / (1e3 * 1e3))
        return this.lineTo(y);
      _.setRotate(u), _.preScale(x, k);
      let It = cs(j(Y / (2 * it / 3))), Qt = Y / It, pe = ys(0.5 * Qt);
      if (!qt(pe))
        return this;
      let Oe = wt, Ki = U(pt + xt(Qt) * pt), Bt = (Et) => Et == Mi(Et), Ji = nt(it / 2 - j(Qt)) && Bt(x) && Bt(k) && Bt(y.x) && Bt(y.y);
      for (let Et = 0; Et < It; ++Et) {
        let xe = Oe + Qt, je = Gt(xe), Xe = te(xe);
        C[1].set(Xe, je), C[1].add(K), C[0].copy(C[1]), C[0].translate(pe * je, -pe * Xe);
        let Vt = [f.default(), f.default()];
        if (_.mapPoints(Vt, C), Ji)
          for (let Yt of Vt)
            Yt.x = be(Yt.x), Yt.y = be(Yt.y);
        this.conicTo(Vt[0], Vt[1], Ki), Oe = xe;
      }
      a[a.length - 1].copy(y);
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
    const n = us(360);
    if (i >= n || i <= -n) {
      let r = e / 90, l = be(r), o = r - l;
      if (Z(o, 0)) {
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
    let n = new Pe(t, e, i);
    return this.moveTo(n.current), this.lineTo(n.next()), this.lineTo(n.next()), this.lineTo(n.next()), this.close();
  }
  addOval(t, e = F.kCW, i = 0) {
    const n = this.fIsA;
    this.incReserve(9, 6);
    let o = new rn(t, e, i), a = new Pe(t, e, i + (e == F.kCW ? 0 : 1));
    this.moveTo(o.current);
    for (let h = 0; h < 4; ++h)
      this.conicTo(a.next(), o.next(), Ce);
    return this.close(), n == 0 && (this.fIsA = 2, this.fIsACCW = e == F.kCCW, this.fIsAStart = i % 4), this;
  }
  addRRect(t, e = F.kCW, i = e == F.kCW ? 6 : 7) {
    const n = this.fIsA, r = t.getBounds();
    if (t.isRect() || t.isEmpty())
      this.addRect(r, e, (i + 1) / 2);
    else if (t.isOval())
      this.addOval(r, e, i / 2);
    else {
      const l = (i & 1) == +(e == F.kCW), o = Ce, a = l ? 9 : 10;
      this.incReserve(a);
      let h = new ln(t, e, i);
      const u = i / 2 + (e == F.kCW ? 0 : 1);
      let c = new Pe(r, e, u);
      if (this.moveTo(h.current), l) {
        for (let m = 0; m < 3; ++m)
          this.conicTo(c.next(), h.next(), o), this.lineTo(h.next());
        this.conicTo(c.next(), h.next(), o);
      } else
        for (let m = 0; m < 4; ++m)
          this.lineTo(h.next()), this.conicTo(c.next(), h.next(), o);
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
    if (this.getSegmentMasks() == et.kLine_SkPathSegmentMask)
      return this.getBounds();
    let t = new Array(5).fill(0).map(() => f.default()), e = f.create(1 / 0, 1 / 0), i = f.create(-1 / 0, -1 / 0), n = this.fPts, r = 0, l = 0;
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
          let c = [n[r - 1], n[r], n[r + 1]];
          h = Vs(c, t), r += 2;
          break;
        case g.kConic:
          let m = [n[r - 1], n[r], n[r + 1]];
          h = Ds(m, this.fConicWeights[l++], t);
          break;
        case g.kCubic:
          let y = [n[r - 1], n[r], n[r + 1], n[r + 2]];
          h = Ys(y, t), r += 3;
          break;
        case g.kClose:
          break;
      }
      for (let c = 0; c < h; ++c) {
        let m = t[c];
        e.min(m), i.max(m);
      }
    }
    let o = q.makeEmpty();
    return o.setLTRB(e.x, e.y, i.x, i.y), o;
  }
  contains(t, e, i = "nonzero") {
    return this.setCanvasFillType(i), on(t, e, this);
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
    let t = 0, e = f.default();
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
d(fe, "IsA", Vi);
let Ct = fe;
const di = (s) => {
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
class ze {
  constructor(t, e, i) {
    d(this, "fPts", []);
    d(this, "size", 0);
    d(this, "fCurrent");
    d(this, "fAdvance");
    this.size = t, this.fPts = new Array(t), this.fCurrent = Math.trunc(i) % t, this.fAdvance = e == F.kCW ? 1 : t - 1;
  }
  get current() {
    return this.fPts[this.fCurrent];
  }
  next(t = 0) {
    return this.fCurrent = (this.fCurrent + t * this.fAdvance + this.fAdvance) % this.size, this.current;
  }
}
class rn extends ze {
  constructor(t, e, i) {
    super(4, e, i);
    const n = t.centerX, r = t.centerY;
    this.fPts[0] = f.create(n, t.top), this.fPts[1] = f.create(t.right, r), this.fPts[2] = f.create(n, t.bottom), this.fPts[3] = f.create(t.left, r);
  }
}
class Pe extends ze {
  constructor(t, e, i) {
    super(4, e, i), this.fPts[0] = f.create(t.left, t.top), this.fPts[1] = f.create(t.right, t.top), this.fPts[2] = f.create(t.right, t.bottom), this.fPts[3] = f.create(t.left, t.bottom);
  }
}
class ln extends ze {
  constructor(t, e, i) {
    super(8, e, i);
    const n = t.getBounds(), r = n.left, l = n.top, o = n.right, a = n.bottom, h = t.fRadii, u = yt.Corner.kUpperLeft_Corner, c = yt.Corner.kUpperRight_Corner, m = yt.Corner.kLowerRight_Corner, y = yt.Corner.kLowerLeft_Corner;
    this.fPts[0] = f.create(r + h[u].x, l), this.fPts[1] = f.create(o - h[c].x, l), this.fPts[2] = f.create(o, l + h[c].y), this.fPts[3] = f.create(o, a - h[m].y), this.fPts[4] = f.create(o - h[m].x, a), this.fPts[5] = f.create(r + h[y].x, a), this.fPts[6] = f.create(r, a - h[y].y), this.fPts[7] = f.create(r, l + h[u].y);
  }
}
function on(s, t, e) {
  const i = e.getFillType();
  let n = e.isInverseFillType();
  if (e.countVerbs() <= 0 || !e.getBounds().containPoint(s, t))
    return n;
  let l = new Zs(e, !0), o = !1, a = 0, h = E.from(0), u = [f.default(), f.default(), f.default(), f.default()];
  do
    switch (l.next(u)) {
      case R.kMoveTo:
      case R.kClose:
        break;
      case R.kLineTo:
        a += Hs(u, s, t, h);
        break;
      case R.kQuadCurveTo:
        a += Gs(u, s, t, h);
        break;
      case R.kConicTo:
        break;
      case R.kCubicCurveTo:
        a += tn(u, s, t, h);
        break;
      case R.kDone:
        o = !0;
        break;
    }
  while (!o);
  let c = dt.kEvenOdd == i || dt.kInverseEvenOdd == i;
  if (c && (a &= 1), a)
    return !n;
  if (h.value <= 1)
    return !!(Number(h.value) ^ Number(n));
  if (h.value & 1 || c)
    return !!(Number(h.value & 1) ^ Number(n));
  l.setPath(e, !0), o = !1;
  let m = [];
  do {
    let y = m.length;
    switch (l.next(u)) {
      case R.kMoveTo:
      case R.kClose:
        break;
      case R.kLineTo:
        en(u, s, t, m);
        break;
      case R.kQuadCurveTo:
        sn(u, s, t, m);
        break;
      case R.kConicTo:
        break;
      case R.kCubicCurveTo:
        nn(u, s, t, m);
        break;
      case R.kDone:
        o = !0;
        break;
    }
    if (m.length > y) {
      let p = m.length - 1;
      const x = m[p];
      if (nt(x.dot(x)))
        m.splice(p, 1);
      else
        for (let k = 0; k < p; ++k) {
          const b = m[k];
          if (nt(b.cross(x)) && $e(x.x * b.x) <= 0 && $e(x.y * b.y) <= 0) {
            m.splice(p, 1), m.splice(k, 1, m[m.length]);
            break;
          }
        }
    }
  } while (!o);
  return Number(m.length ^ Number(n));
}
var an = /* @__PURE__ */ ((s) => (s.Miter = "miter", s.Round = "round", s.Bevel = "bevel", s.MiterClip = "miter-clip", s))(an || {}), hn = /* @__PURE__ */ ((s) => (s.Butt = "butt", s.Round = "round", s.Square = "square", s))(hn || {}), un = /* @__PURE__ */ ((s) => (s.NonZero = "nonzero", s.EvenOdd = "evenodd", s))(un || {});
class Qe {
  constructor(t) {
    d(this, "isAutoClose", !1);
    d(this, "path");
    d(this, "verbIndex");
    d(this, "pointsIndex");
    d(this, "lastMoveTo", f.default());
    d(this, "lastPoint", f.default());
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
    return new Qe({
      isAutoClose: this.isAutoClose,
      path: this.path,
      verbIndex: this.verbIndex,
      pointsIndex: this.pointsIndex,
      lastMoveTo: this.lastMoveTo,
      lastPoint: this.lastPoint
    });
  }
  *[Symbol.iterator]() {
    const t = this.path.fPts.map((n) => f.fromPoint(n)), e = this.path.fVerbs;
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
class fn {
  constructor(t, e) {
    this.inner = t, this.outer = e;
  }
  swap() {
    [this.inner, this.outer] = [this.outer, this.inner];
  }
}
const Ee = 0.707106781, Le = (s, t, e, i, n) => {
  n.lineTo(e.x, e.y);
}, cn = (s, t, e, i, n) => {
  let r = t.clone();
  r.cw();
  let l = s.clone().add(r), o = l.clone().add(t);
  n.conicTo(
    o.x,
    o.y,
    l.x,
    l.y,
    Ee
  ), o.copy(l).subtract(t), n.conicTo(
    o.x,
    o.y,
    e.x,
    e.y,
    Ee
  );
}, mn = (s, t, e, i, n) => {
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
function pi(s) {
  return Math.abs(s) <= Ve;
}
function Yi(s) {
  return s >= 0 ? pi(1 - s) ? 3 : 2 : pi(1 + s) ? 0 : 1;
}
function Be(s, t) {
  return s.x * t.y > s.y * t.x;
}
function ae(s, t, e) {
  e.lineTo(s.x, s.y), e.lineTo(s.x - t.x, s.y - t.y);
}
const Di = (s, t, e, i, n, r, l, o, a) => {
  function h(_, v, P, M, N, A, I, C, B, G) {
    if (C = C.clone(), C.multiplyScalar(P), I = I.clone(), A = A.clone(), G) {
      I.normalize();
      let at = A.dot(I), tt = A.cross(I), K = 0;
      Math.abs(tt) <= Ve ? K = 1 / B : K = (1 / B - at) / tt, A.multiplyScalar(P);
      let wt = A.clone();
      wt.cw();
      let de = C.clone();
      de.ccw();
      let Y = f.default();
      Y.addVectors(v, A).add(wt.clone().multiplyScalar(K));
      let It = f.default();
      Y.addVectors(v, C).add(de.clone().multiplyScalar(K)), M ? _.outer.setLastPoint(Y.x, Y.y) : _.outer.lineTo(Y.x, Y.y), _.outer.lineTo(It.x, It.y);
    }
    N || _.outer.lineTo(v.x + C.x, v.y + C.y), ae(v, C, _.inner);
  }
  function u(_, v, P, M, N, A, I) {
    I = I.clone(), I.multiplyScalar(P), M ? _.outer.setLastPoint(v.x + A.x, v.y + A.y) : _.outer.lineTo(v.x + A.x, v.y + A.y), N || _.outer.lineTo(v.x + I.x, v.y + I.y), ae(v, I, _.inner);
  }
  let c = s.dot(e), m = Yi(c), y = s.clone(), p = e.clone(), x = f.default();
  if (m == 3)
    return;
  if (m == 0) {
    o = !1, x.subtractVectors(p, y).multiplyScalar(i / 2), h(
      a,
      t,
      i,
      l,
      o,
      y,
      x,
      p,
      n,
      r
    );
    return;
  }
  let k = !Be(y, p);
  if (k && (a.swap(), y.negate(), p.negate()), c == 0 && n <= Ee) {
    x.addVectors(y, p).multiplyScalar(i), u(
      a,
      t,
      i,
      l,
      o,
      x,
      p
    );
    return;
  }
  m == 1 ? (x = f.create(p.y - y.y, y.x - p.x), k && x.negate()) : x = f.create(y.x + p.x, y.y + p.y);
  let b = Math.sqrt((1 + c) / 2);
  if (b < n) {
    o = !1, h(
      a,
      t,
      i,
      l,
      o,
      y,
      x,
      p,
      n,
      r
    );
    return;
  }
  x.setLength(i / b), u(
    a,
    t,
    i,
    l,
    o,
    x,
    p
  );
}, yn = (s, t, e, i, n, r, l, o) => {
  let a = e.clone().multiplyScalar(i);
  Be(s, e) || (o.swap(), a.negate()), o.outer.lineTo(t.x + a.x, t.y + a.y), ae(t, a, o.inner);
}, dn = (s, t, e, i, n, r, l, o) => Di(s, t, e, i, n, !1, r, l, o), pn = (s, t, e, i, n, r, l, o) => {
  Di(
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
}, Ae = (s, t, e, i, n, r, l, o) => {
  let a = s.dot(e);
  if (Yi(a) == 3)
    return;
  let u = s.clone(), c = e.clone(), m = F.kCW;
  Be(u, c) || (o.swap(), u.negate(), c.negate(), m = F.kCCW);
  let y = ot.fromRows(i, 0, 0, i, t.x, t.y), p = new Array(5).fill(0).map(() => new W()), x = W.BuildUnitArc(u, c, m, y, p);
  if (x > 0) {
    p = p.slice(0, x);
    for (let k of p)
      o.outer.conicTo(k.fPts[1], k.fPts[2], k.fW);
    c.multiplyScalar(i), ae(t, c, o.inner);
  }
};
function xi(s, t, e, i, n, r) {
  return r.setLengthFrom((t.x - s.x) * e, (t.y - s.y) * e, 1) ? (r.ccw(), n.copy(r).multiplyScalar(i), !0) : !1;
}
function xn(s, t, e, i) {
  return i.setLengthFrom(s.x, s.y, 1) ? (i.ccw(), e.copy(i).multiplyScalar(t), !0) : !1;
}
class Kt {
  constructor() {
    // The state of the quad stroke under construction.
    d(this, "quad", [f.default(), f.default(), f.default()]);
    // the stroked quad parallel to the original curve
    d(this, "tangent_start", f.default());
    // a point tangent to quad[0]
    d(this, "tangent_end", f.default());
    // a point tangent to quad[2]
    d(this, "start_t", 0);
    // a segment of the original curve
    d(this, "mid_t", 0);
    d(this, "end_t", 0);
    d(this, "start_set", !1);
    // state to share common points across structs
    d(this, "end_set", !1);
    d(this, "opposite_tangents", !1);
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
function bn(s) {
  let t = st(s[1].clone().sub(s[0])), e = st(s[2].clone().sub(s[1]));
  if (t & e)
    return [
      f.default(),
      0
      /* Point */
    ];
  if (t | e)
    return [
      f.default(),
      1
      /* Line */
    ];
  if (!kn(s))
    return [
      f.default(),
      2
      /* Quad */
    ];
  let i = Ss(s);
  return i == 0 || i == 1 ? [
    f.default(),
    1
    /* Line */
  ] : [
    St(s, i),
    3
    /* Degenerate */
  ];
}
function st(s) {
  return +!s.canNormalize();
}
function kn(s) {
  let t = -1, e = 0, i = 0;
  for (let o = 0; o < 2; o++)
    for (let a = o + 1; a < 3; a++) {
      let h = s[a].clone().sub(s[o]), u = Math.max(Math.abs(h.x), Math.abs(h.y));
      t < u && (e = o, i = a, t = u);
    }
  console.assert(e <= 1), console.assert(i >= 1 && i <= 2), console.assert(e < i);
  let n = e ^ i ^ 3, l = t * t * 5e-6;
  return Rt(s[n], s[e], s[i]) <= l;
}
function Rt(s, t, e) {
  let i = e.clone().sub(t), n = s.clone().sub(t), r = i.dot(n), l = i.dot(i), o = r / l;
  return o >= 0 && o <= 1 ? f.create(
    t.x * (1 - o) + e.x * o,
    t.y * (1 - o) + e.y * o
  ).distanceToSquared(s) : s.distanceToSquared(t);
}
function gn(s, t, e) {
  let i = s[1].clone().sub(s[0]), n = [0, 0, 0];
  for (let h = 0; h < 3; h++)
    n[h] = (t[h].y - s[0].y) * i.x - (t[h].x - s[0].x) * i.y;
  let r = n[2], l = n[1], o = n[0];
  r += o - 2 * l, l -= o;
  let a = rt(r, 2 * l, o, L.from(e));
  return e.slice(0, a);
}
function Me(s, t, e) {
  return s.distanceToSquared(t) <= e * e;
}
function bi(s) {
  let t = s[1].clone().sub(s[0]), e = s[1].clone().sub(s[2]), i = t.lengthSquared(), n = e.lengthSquared();
  return i > n && ([t, e] = [e, t], n = i), t.setLength(n) ? t.dot(e) > 0 : !1;
}
function _n(s, t, e) {
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
function vn(s, t, e) {
  let i = st(s[1].clone().sub(s[0])), n = st(s[2].clone().sub(s[1])), r = st(s[3].clone().sub(s[2]));
  if (i & n & r)
    return 0;
  if (i + n + r == 2)
    return 1;
  if (!Tn(s))
    return e && (i ? e.copy(s[2]) : e.copy(s[1])), 2;
  let l = [0, 0, 0], o = Ni(s, l), a = 0;
  l = l.slice(0, o);
  for (let h of l) {
    if (0 >= h || h >= 1)
      continue;
    let u = re(s, h);
    t[a] = f.create(u.x, u.y), !t[a].equals(s[0]) && !t[a].equals(s[3]) && (a += 1);
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
function Tn(s) {
  let t = -1, e = 0, i = 0;
  for (let o = 0; o < 3; o++)
    for (let a = o + 1; a < 4; a++) {
      let h = s[a].clone().sub(s[o]), u = Math.max(Math.abs(h.x), Math.abs(h.y));
      t < u && (e = o, i = a, t = u);
    }
  let n = 1 + (2 >> i) >> e, r = e ^ i ^ n, l = t * t * 1e-5;
  return Rt(s[n], s[e], s[i]) <= l && Rt(s[r], s[e], s[i]) <= l;
}
const Pn = {
  bevel: yn,
  miter: dn,
  "miter-clip": pn,
  round: Ae
}, Mn = {
  butt: Le,
  round: cn,
  square: mn
}, Sn = 3, ki = [15, 78, 33, 33], Ve = 1 / 4096;
class Lr {
  constructor() {
    d(this, "radius", 0);
    // 线段宽的一半
    d(this, "inv_miter_limit", 0);
    // 1/miter_limit
    d(this, "res_scale", 1);
    // 分辨率缩放因子
    d(this, "inv_res_scale", 1);
    // 分辨率缩放因子的倒数
    d(this, "inv_res_scale_squared", 1);
    // 分辨率缩放因子的倒数平方
    d(this, "first_normal", f.default());
    // Move->LineTo 旋转-90法向量剩以radius
    d(this, "prev_normal", f.default());
    // 上一个LineTo->lineTo点旋转-90法向量剩以radius
    d(this, "first_unit_normal", f.default());
    // Move->LineTo 线段的，旋转-90度的单位法向量
    d(this, "prev_unit_normal", f.default());
    // 上一个lineTo->LineTo点旋转-90度的单位法向量
    d(this, "first_pt", f.default());
    // moveTo点
    d(this, "prev_pt", f.default());
    // 上一个lineTo点
    d(this, "first_outer_pt", f.default());
    // 第一个线段的外侧点
    d(this, "first_outer_pt_index_in_contour", 0);
    // 第一个线段的外侧点在轮廓中的索引
    d(this, "segment_count", -1);
    // 从MoveTo线段计数
    d(this, "prev_is_line", !1);
    // 上一个绘制命令是否是lineTo
    d(this, "capper");
    d(this, "joiner");
    d(this, "inner", Ct.default());
    d(this, "outer", Ct.default());
    d(this, "cusper", Ct.default());
    d(this, "stroke_type", 1);
    // 线段类型
    d(this, "recursion_depth", 0);
    // 递归深度
    d(this, "found_tangents", !1);
    // 是否找到切线
    d(this, "join_completed", !1);
  }
  static computeResolutionScale(t) {
    let e = f.create(t.a, t.b).length(), i = f.create(t.c, t.d).length();
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
    return new fn(this.inner, this.outer);
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
        let n = i.inner.lastPoint ?? f.create(0, 0);
        i.outer.moveTo(n.x, n.y), i.outer.reversePathTo(i.inner), i.outer.close();
      } else {
        let n = i.inner.lastPoint ? f.fromPoint(i.inner.lastPoint) : f.create(0, 0), r = e ? i.inner : null;
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
    if (!xi(
      r.prev_pt,
      t,
      r.res_scale,
      r.radius,
      i,
      n
    )) {
      if (r.capper === Le)
        return !1;
      i.set(r.radius, 0), n.set(1, 0);
    }
    return r.segment_count == 0 ? (r.first_normal.copy(i), r.first_unit_normal.copy(n), r.first_outer_pt = f.create(l + i.x, o + i.y), r.outer.moveTo(r.first_outer_pt.x, r.first_outer_pt.y), r.inner.moveTo(l - i.x, o - i.y)) : r.joiner(
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
    if (i.recursion_depth += 1, i.recursion_depth > ki[Sn])
      return !1;
    let r = Kt.default();
    return r.initWithStart(e), !i.quadStroke(t, r) || (r.initWithEnd(e), !i.quadStroke(t, r)) ? !1 : (i.recursion_depth -= 1, !0);
  }
  compareQuadQuad(t, e) {
    const i = this;
    if (!e.start_set) {
      let o = f.zero();
      i.quadPerpRay(
        t,
        e.start_t,
        o,
        e.quad[0],
        e.tangent_start
      ), e.start_set = !0;
    }
    if (!e.end_set) {
      let o = f.zero();
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
    let r = f.zero(), l = f.zero();
    return i.quadPerpRay(t, e.mid_t, l, r), i.strokeCloseEnough(e.quad.slice(), [r, l], e);
  }
  // Given a point on the curve and its derivative, scale the derivative by the radius, and
  // compute the perpendicular point and its tangent.
  setRayPoints(t, e, i, n) {
    const r = this;
    e.setLength(r.radius) || e.copy(f.create(r.radius, 0));
    let l = r.stroke_type;
    i.x = t.x + l * e.y, i.y = t.y - l * e.x, n && (n.x = i.x + e.x, n.y = i.y + e.y);
  }
  // Given a quad and t, return the point on curve,
  // its perpendicular, and the perpendicular tangent.
  quadPerpRay(t, e, i, n, r) {
    let l = this, o = St(t, e);
    i.set(o.x, o.y), o = Fe(t, e);
    let a = f.create(o.x, o.y);
    a.isZero() && (a = t[2].sub(t[0])), l.setRayPoints(i, a, n, r);
  }
  strokeCloseEnough(t, e, i) {
    const n = this;
    let l = St(t, 0.5);
    if (Me(e[0], f.create(l.x, l.y), n.inv_res_scale))
      return bi(i.quad) ? 0 : 2;
    if (!_n(t, e[0], n.inv_res_scale))
      return 0;
    let o = new Array(3).fill(0.5);
    if (o = gn(e, t, o), o.length != 1)
      return 0;
    let a = St(t, o[0]), h = n.inv_res_scale * (1 - Math.abs(o[0] - 0.5) * 2);
    return Me(e[0], f.create(a.x, a.y), h) ? bi(i.quad) ? 0 : 2 : 0;
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
    let h = n.clone().sub(r), u = o.cross(h), c = l.cross(h);
    if (u >= 0 == c >= 0) {
      let y = Rt(n, r, e.tangent_end), p = Rt(r, n, e.tangent_start);
      return Math.max(y, p) <= i.inv_res_scale_squared ? 1 : 0;
    }
    return u /= a, u > u - 1 ? (t == 0 && (e.quad[1].x = n.x * (1 - u) + e.tangent_start.x * u, e.quad[1].y = n.y * (1 - u) + e.tangent_start.y * u), 2) : (e.opposite_tangents = l.dot(o) < 0, 1);
  }
  addDegenerateLine(t) {
    const e = this;
    e.stroke_type == 1 ? e.outer.lineTo(t.quad[2].x, t.quad[2].y) : e.inner.lineTo(t.quad[2].x, t.quad[2].y);
  }
  setCubicEndNormal(t, e, i, n, r) {
    let l = this, o = t[1].clone().sub(t[0]), a = t[3].clone().sub(t[2]), h = st(o), u = st(a);
    if (h && u) {
      n.copy(e), r.copy(i);
      return;
    }
    if (h && (o = t[2].clone().sub(t[0]), h = st(o)), u && (a = t[3].clone().sub(t[1]), u = st(a)), h || u) {
      n.copy(e), r.copy(i);
      return;
    }
    return xn(a, l.radius, n, r);
  }
  lineTo(t, e) {
    const i = this;
    let n = i.prev_pt.equalsEpsilon(t, Ve * i.inv_res_scale);
    if (i.capper, Le && n || n && (i.join_completed || e && e.hasValidTangent()))
      return;
    let r = f.default(), l = f.default();
    i.preJoinTo(t, !0, r, l) && (i.outer.lineTo(t.x + r.x, t.y + r.y), i.inner.lineTo(t.x - r.x, t.y - r.y), i.postJoinTo(t, r, l));
  }
  quadraticCurveTo(t, e) {
    const i = this;
    let n = [i.prev_pt, t, e], [r, l] = bn(n);
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
      let y = i.joiner;
      i.joiner = Ae, i.lineTo(e), i.joiner = y;
      return;
    }
    let o = f.default(), a = f.default(), h = f.default(), u = f.default();
    if (!i.preJoinTo(t, !1, o, a)) {
      i.lineTo(e);
      return;
    }
    let c = Kt.default();
    i.initQuad(
      1,
      0,
      1,
      c
    ), i.quadStroke(n, c), i.initQuad(
      -1,
      0,
      1,
      c
    ), i.quadStroke(n, c), xi(
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
    let r = [n.prev_pt, t, e, i], l = Array.from({ length: 3 }, () => f.zero()), o = f.zero(), a = vn(r, l, o);
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
      let b = n.joiner;
      n.joiner = Ae, 4 <= a && n.lineTo(l[1]), a == 5 && n.lineTo(l[2]), n.lineTo(i), n.joiner = b;
      return;
    }
    let h = f.zero(), u = f.zero(), c = f.zero(), m = f.zero();
    if (!n.preJoinTo(o, !1, h, u)) {
      n.lineTo(i);
      return;
    }
    let y = new Array(3).fill(0.5), p = Es(r, y);
    y = y.slice(0, p);
    let x = 0;
    for (let b = 0, _ = y.length; b <= _; b++) {
      let v = Number.isFinite(y[b]) ? y[b] : 1, P = Kt.default();
      n.initQuad(1, x, v, P), n.cubicStroke(r, P), n.initQuad(-1, x, v, P), n.cubicStroke(r, P), x = v;
    }
    let k = qs(r);
    if (k) {
      let b = re(r, k);
      n.cusper.addCircle(b.x, b.y, n.radius);
    }
    n.setCubicEndNormal(r, h, u, c, m), n.postJoinTo(i, c, m);
  }
  cubicStroke(t, e) {
    const i = this;
    if (!i.found_tangents) {
      let r = i.tangentsMeet(t, e);
      if (r != 2) {
        let l = Me(
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
    if (!Number.isFinite(e.quad[2].x) || !Number.isFinite(e.quad[2].x) || (i.recursion_depth += 1, i.recursion_depth > ki[Number(i.found_tangents)]))
      return !1;
    let n = Kt.default();
    return n.initWithStart(e) ? i.cubicStroke(t, n) ? n.initWithEnd(e) ? i.cubicStroke(t, n) ? (i.recursion_depth -= 1, !0) : !1 : (i.addDegenerateLine(e), i.recursion_depth -= 1, !0) : !1 : (i.addDegenerateLine(e), i.recursion_depth -= 1, !0);
  }
  cubicMidOnLine(t, e) {
    let i = this, n = f.zero();
    return i.cubicQuadMid(t, e, n), Rt(n, e.quad[0], e.quad[2]) < i.inv_res_scale_squared;
  }
  cubicQuadMid(t, e, i) {
    let n = f.zero();
    this.cubicPerpRay(t, e.mid_t, n, i);
  }
  compareQuadCubic(t, e) {
    let i = this;
    i.cubicQuadEnds(t, e);
    let n = i.intersectRay(0, e);
    if (n != 2)
      return n;
    let r = f.zero(), l = f.zero();
    return i.cubicPerpRay(t, e.mid_t, l, r), i.strokeCloseEnough(e.quad.slice(), [r, l], e);
  }
  // Given a cubic and a t range, find the start and end if they haven't been found already.
  cubicQuadEnds(t, e) {
    const i = this;
    if (!e.start_set) {
      let n = f.zero();
      i.cubicPerpRay(
        t,
        e.start_t,
        n,
        e.quad[0],
        e.tangent_start
      ), e.start_set = !0;
    }
    if (!e.end_set) {
      let n = f.zero();
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
    i.copy(re(t, e));
    let o = wi(t, e), a = Array.from({ length: 7 }, () => f.zero());
    if (o.x == 0 && o.y == 0) {
      let h = t;
      nt(e) ? o = t[2].clone().sub(t[0]) : nt(1 - e) ? o = t[3].clone().sub(t[1]) : (ce(t, a, e), o = a[3].clone().sub(a[2]), o.x == 0 && o.y == 0 && (o = a[3].clone().sub(a[1]), h = a)), o.x == 0 && o.y == 0 && (o = h[3].clone().sub(h[0]));
    }
    l.setRayPoints(i, o, n, r);
  }
  stroke(t, e) {
    return this.strokeInner(t, e.strokeWidth, e.miterLimit ?? 10, e.lineCap ?? "butt", e.lineJoin ?? "miter", this.res_scale);
  }
  strokeInner(t, e, i, n, r, l) {
    const o = this;
    let a = 0;
    r == "miter" && (i <= 1 ? r = "bevel" : a = 1 / i), r == "miter-clip" && (a = 1 / i), o.res_scale = l, o.inv_res_scale = 1 / (l * 4), o.inv_res_scale_squared = o.inv_res_scale ** 2, o.radius = e * 0.5, o.inv_miter_limit = a, o.first_normal = f.default(), o.prev_normal = f.default(), o.first_unit_normal = f.default(), o.prev_unit_normal = f.default(), o.first_pt = f.default(), o.prev_pt = f.default(), o.first_outer_pt = f.default(), o.first_outer_pt_index_in_contour = 0, o.segment_count = -1, o.prev_is_line = !1, o.capper = Mn[n], o.joiner = Pn[r], o.inner.reset(), o.outer.reset(), o.cusper.reset(), o.stroke_type = 1, o.recursion_depth = 0, o.found_tangents = !1, o.join_completed = !1;
    let h = !1, u = new Qe({
      path: t,
      verbIndex: 0,
      pointsIndex: 0,
      isAutoClose: !0
    });
    u.setAutoClose(!0);
    for (let c of u)
      switch (c.type) {
        case g.kMove:
          o.moveTo(c.p0);
          break;
        case g.kLine:
          o.lineTo(c.p0, u), h = !0;
          break;
        case g.kQuad:
          o.quadraticCurveTo(c.p1, c.p2), h = !1;
          break;
        case g.kCubic:
          o.bezierCurveTo(c.p1, c.p2, c.p3), h = !1;
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
const Cn = (s, t) => s[0] * t[0] + s[1] * t[1], Rn = (s, t) => s[0] * t[1] - s[1] * t[0], gi = (s, t) => Math.atan2(Rn(s, t), Cn(s, t));
function wn(s, t, e, i, n, r, l, o, a) {
  let h = Math.cos(a), u = Math.sin(a), c = h * (s - e) / 2 + u * (t - i) / 2, m = -u * (s - e) / 2 + h * (t - i) / 2, y = c * c / (l * l) + m * m / (o * o);
  y > 1 && (y = Math.sqrt(y), l *= y, o *= y);
  let p = n !== r ? 1 : -1, x = (l * l * o * o - l * l * m * m - o * o * c * c) / (l * l * m * m + o * o * c * c);
  x < 0 ? x = 0 : x = Math.sqrt(x);
  let k = p * x * (l * m / o), b = p * x * (-o * c / l), _ = h * k - u * b + (s + e) / 2, v = u * k + h * b + (t + i) / 2, P = gi([1, 0], [(c - k) / l, (m - b) / o]), M = gi([(c - k) / l, (m - b) / o], [(-c - k) / l, (-m - b) / o]);
  !r && M > 0 ? M -= Math.PI * 2 : r && M < 0 && (M += Math.PI * 2);
  let N = P + M;
  return {
    rx: l,
    ry: o,
    cx: _,
    cy: v,
    theta1: P,
    // 是拉伸和旋转操作之前椭圆弧的起始角度。
    theta2: N,
    // 是拉伸和旋转操作之前椭圆弧的终止角度。
    dtheta: M
    // 是这两个角度之间的差值。
  };
}
function In(s, t, e, i, n, r, l) {
  const o = l - r, a = 4 / 3 * Math.tan(o / 4), h = f.fromRotation(r), u = f.fromRotation(l), c = f.fromPoint(h), m = f.fromPoint(u);
  return c.translate(-a * h.y, a * h.x), m.translate(a * u.y, -a * u.x), h.scale(e, i).rotate(n).translate(s, t), c.scale(e, i).rotate(n).translate(s, t), m.scale(e, i).rotate(n).translate(s, t), u.scale(e, i).rotate(n).translate(s, t), [h.x, h.y, c.x, c.y, m.x, m.y, u.x, u.y];
}
function En(s, t, e, i, n, r, l, o, a, h) {
  const { cx: u, cy: c, theta1: m, dtheta: y, rx: p, ry: x } = wn(s, t, e, i, o, a, n, r, l), k = Math.ceil(Math.abs(y / (Math.PI / 2))), b = y / k, _ = [];
  let v = m;
  for (let P = 0; P < k; P++) {
    const M = v + b;
    let [N, A, I, C, B, G, at, tt] = In(u, c, p, x, l, v, M);
    h == null || h(N, A, I, C, B, G, at, tt, P), v = M, _.push(N, A, I, C, B, G, at, tt);
  }
  return _;
}
const _i = {
  M: 2,
  L: 2,
  H: 1,
  V: 1,
  C: 6,
  S: 4,
  Q: 4,
  T: 2,
  A: 7,
  Z: 0
};
new Set(Object.keys(_i).concat(Object.keys(_i).map((s) => s.toLowerCase())));
function Ye(s, t, e) {
  return s >= t && s <= e;
}
function Oi(s) {
  return Ye(s.charCodeAt(0), 1, 32);
}
function ee(s) {
  return Ye(s.charCodeAt(0), 48, 57);
}
function ji(s) {
  return Oi(s) || s === ",";
}
function Ln(s) {
  return Ye(s.charCodeAt(0), 97, 122);
}
function An(s) {
  return String.fromCharCode(s.charCodeAt(0) - 97 + 65);
}
function De(s) {
  let t = 0;
  for (; s.length > 0 && Oi(s[t]); )
    t++;
  return s.slice(t);
}
function he(s) {
  let t = 0;
  for (; s.length > 0 && ji(s[t]); )
    t++;
  return s.slice(t);
}
function Nn(s, t) {
  s = De(s);
  let e = 0;
  for (e < s.length && (s[e] === "+" || s[e] === "-") && e++; e < s.length && ee(s[e]); )
    e++;
  if (e < s.length && s[e] === ".")
    for (e++; e < s.length && ee(s[e]); )
      e++;
  if (e < s.length && (s[e] === "e" || s[e] === "E"))
    for (e++, e < s.length && (s[e] === "+" || s[e] === "-") && e++; e < s.length && ee(s[e]); )
      e++;
  return e == 0 ? (t.value = s, 0) : (t.value = s.substring(e), Number(s.substring(0, e)));
}
function Xi(s, t) {
  s = De(s);
  let e = { value: "" }, i = Nn(s, e);
  return s == e.value ? "" : (t && (t.value = i), e.value);
}
function vi(s, t, e, i) {
  return s = Xi(s, t), s ? (e && (t.value += i), s = he(s), s) : "";
}
function Wn(s, t, e) {
  if (e > 0) {
    let i = 0, n = { value: 0 };
    for (; s = Xi(s, n), t[i] = n.value, !(--e == 0 || s.length <= 0); )
      s = he(s), i++;
  }
  return s;
}
function ft(s, t, e, i, n) {
  if (s = Wn(s, t, e), i)
    for (let r = 0; r < e; r += 2)
      t[r] += n.x, t[r + 1] += n.y;
  return s;
}
function ue(s, t) {
  let e = { x: 0, y: 0 }, i = { x: 0, y: 0 }, n = { x: 0, y: 0 }, r = new Float32Array(7), l = { value: 0 }, o = "", a = "", h = !1;
  for (; t.length && (t = De(t), t[0] !== ""); ) {
    let u = t[0];
    if (ee(u) || u === "-" || u === "+" || u === ".") {
      if (o == "" || o == "Z")
        return !1;
    } else ji(u) || (o = u, h = !1, Ln(u) && (h = !0, o = An(u)), t = t.substring(1)), t = he(t);
    switch (o) {
      case "M":
        t = ft(t, r, 2, h, i), s.moveTo(r[0], r[1]), a = "", o = "L", i.x = r[0], i.y = r[1];
        break;
      case "L":
        t = ft(t, r, 2, h, i), s.lineTo(r[0], r[1]), i.x = r[0], i.y = r[1];
        break;
      case "H":
        t = vi(t, l, h, i.x), s.lineTo(l.value, i.y), i.x = l.value;
        break;
      case "V":
        t = vi(t, l, h, i.y), s.lineTo(i.x, l.value), i.y = l.value;
        break;
      case "C":
        t = ft(t, r, 6, h, i), s.bezierCurveTo(r[0], r[1], r[2], r[3], r[4], r[5]), n.x = r[2], n.y = r[3], i.x = r[4], i.y = r[5];
        break;
      case "S":
        t = ft(t, r.subarray(2), 4, h, i), r[0] = i.x, r[1] = i.y, (a == "C" || a == "S") && (r[0] -= n.x - i.x, r[1] -= n.y - i.y), s.bezierCurveTo(r[0], r[1], r[2], r[3], r[4], r[5]), n.x = r[2], n.y = r[3], i.x = r[4], i.y = r[5];
        break;
      case "Q":
        t = ft(t, r, 4, h, i), s.quadraticCurveTo(r[0], r[1], r[2], r[3]), n.x = r[0], n.y = r[1], i.x = r[2], i.y = r[3];
        break;
      case "T":
        t = ft(t, r.subarray(1), 2, h, i), r[0] = i.x, r[1] = i.y, (a == "Q" || a == "T") && (r[0] -= n.x - i.x, r[1] -= n.y - i.y), s.quadraticCurveTo(r[0], r[1], r[2], r[3]), n.x = r[0], n.y = r[1], i.x = r[2], i.y = r[3];
        break;
      case "A":
        t = ft(t, r, 7, !1);
        let c = i.x, m = i.y, y = r[0], p = r[1], x = r[2], k = !!r[3], b = !!r[4], _ = r[5], v = r[6];
        _ = h ? _ + i.x : _, v = h ? v + i.y : v, En(c, m, _, v, y, p, x, k, b, (P, M, N, A, I, C, B, G, at) => {
          s.bezierCurveTo(N, A, I, C, B, G), i.x = B, i.y = G;
        });
        break;
      case "Z":
        s.closePath(), i.x = e.x, i.y = e.y;
        break;
      default:
        return !1;
    }
    a == "" && (e.x = i.x, e.y = i.y), a = o;
  }
  return !0;
}
class Zi {
  constructor(t) {
    d(this, "commands", []);
    d(this, "dirty", !1);
    d(this, "_cb", null);
    typeof t == "string" ? ue(this, t) : t instanceof Zi && (this.commands = [...t.commands]);
  }
  fromSvgPath(t) {
    ue(this, t);
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
function Fn(s) {
  let t = { tl: 0, tr: 0, br: 0, bl: 0 };
  return typeof s == "number" ? t = { tl: s, tr: s, br: s, bl: s } : Array.isArray(s) ? s.length === 1 ? t = { tl: s[0], tr: s[0], br: s[0], bl: s[0] } : s.length === 2 ? t = { tl: s[0], tr: s[1], br: s[0], bl: s[1] } : s.length === 3 ? t = { tl: s[0], tr: s[1], br: s[2], bl: s[1] } : s.length === 4 && (t = { tl: s[0], tr: s[1], br: s[2], bl: s[3] }) : s && (t.tl = s.x ?? 0, t.tr = s.y ?? 0, t.bl = s.z ?? 0, t.br = s.w ?? 0), t;
}
function kt(s) {
  for (var t = 0; t < s.length; t++)
    if (s[t] !== void 0 && !Number.isFinite(s[t]))
      return !1;
  return !0;
}
function Ti(s) {
  return s / Math.PI * 180;
}
function qn(s, t) {
  return Math.abs(s - t) < 1e-5;
}
function zn(s, t, e, i, n, r, l = !1) {
  Ui(s, t, e, i, i, 0, n, r, l);
}
function Qn(s, t, e, i, n, r) {
  if (kt([t, e, i, n, r])) {
    if (r < 0)
      throw "radii cannot be negative";
    s.isEmpty() && s.moveTo(t, e), s.arcTo(f.create(t, e), f.create(i, n), r);
  }
}
function Bn(s, t, e, i, n, r, l) {
  kt([t, e, i, n, r, l]) && (s.isEmpty() && s.moveTo(t, e), s.cubicTo(t, e, i, n, r, l));
}
function Vn(s) {
  if (!s.isEmpty()) {
    var t = s.getBounds();
    (t.bottom - t.top || t.right - t.left) && s.close();
  }
}
function Pi(s, t, e, i, n, r, l) {
  var o = Ti(l - r), a = Ti(r), h = q.makeLTRB(t - i, e - n, t + i, e + n);
  if (qn(Math.abs(o), 360)) {
    var u = o / 2;
    s.arcToOval(h, a, u, !1), s.arcToOval(h, a + u, u, !1);
    return;
  }
  s.arcToOval(h, a, o, !1);
}
function Ui(s, t, e, i, n, r, l, o, a = !1) {
  if (kt([t, e, i, n, r, l, o])) {
    if (i < 0 || n < 0)
      throw "radii cannot be negative";
    var h = 2 * Math.PI, u = l % h;
    u < 0 && (u += h);
    var c = u - l;
    if (l = u, o += c, !a && o - l >= h ? o = l + h : a && l - o >= h ? o = l - h : !a && l > o ? o = l + (h - (l - o) % h) : a && l < o && (o = l - (h - (o - l) % h)), !r) {
      Pi(s, t, e, i, n, l, o);
      return;
    }
    var m = ot.fromRotateOrigin(r, t, e), y = ot.fromRotateOrigin(-r, t, e);
    s.transform(y), Pi(s, t, e, i, n, l, o), s.transform(m);
  }
}
function Yn(s, t, e) {
  kt([t, e]) && (s.isEmpty() && s.moveTo(t, e), s.lineTo(t, e));
}
function Dn(s, t, e) {
  kt([t, e]) && s.moveTo(t, e);
}
function On(s, t, e, i, n) {
  kt([t, e, i, n]) && (s.isEmpty() && s.moveTo(t, e), s.quadTo(t, e, i, n));
}
function jn(s, t, e, i, n) {
  var r = q.makeXYWH(t, e, i, n);
  kt([r.left, r.top, r.right, r.bottom]) && s.addRect(r);
}
let Ar = class Hi {
  constructor(t) {
    d(this, "_path", Ct.default());
    typeof t == "string" ? ue(this, t) : t instanceof Hi && this._path.copy(t.getPath());
  }
  static default() {
    return new this();
  }
  static fromSvgPath(t) {
    return new this(t);
  }
  fromSvgPath(t) {
    ue(this, t);
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
    zn(this._path, t, e, i, n, r, l);
  }
  arcTo(t, e, i, n, r) {
    Qn(this._path, t, e, i, n, r);
  }
  bezierCurveTo(t, e, i, n, r, l) {
    Bn(this._path, t, e, i, n, r, l);
  }
  closePath() {
    Vn(this._path);
  }
  conicTo(t, e, i, n, r) {
    this._path.conicTo(t, e, i, n, r);
  }
  ellipseArc(t, e, i, n, r, l, o, a, h) {
    this._path.isEmpty() && this._path.moveTo(t, e), this._path.arcTo(f.create(r, l), o, Number(a), +!h, f.create(i, n));
  }
  roundRect(t, e, i, n, r) {
    let l = Fn(r);
    const o = [
      f.create(l.tl, l.tl),
      // 左上角 (x半径, y半径)
      f.create(l.tr, l.tr),
      // 右上角
      f.create(l.br, l.br),
      // 右下角
      f.create(l.bl, l.bl)
      // 左下角
    ];
    let a = yt.makeEmpty(), h = q.makeXYWH(t, e, i, n);
    a.setRectRadii(h, o), this._path.addRRect(a);
  }
  ellipse(t, e, i, n, r, l, o, a = !1) {
    Ui(
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
    Yn(this._path, t, e);
  }
  moveTo(t, e) {
    Dn(this._path, t, e);
  }
  quadraticCurveTo(t, e, i, n) {
    On(this._path, t, e, i, n);
  }
  rect(t, e, i, n) {
    jn(this._path, t, e, i, n);
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
  un as FillRule,
  T as FloatPoint,
  hn as LineCap,
  an as LineJoin,
  ot as Matrix2D,
  Ue as PI,
  Ar as Path2D,
  Ct as PathBuilder,
  Qe as PathSegmentsIter,
  Lr as PathStroker,
  f as Point,
  ie as Point3D,
  L as PointerArray,
  Zi as ProxyPath2D,
  yt as RRect,
  q as Rect,
  E as Ref,
  V as SK_Scalar1,
  pt as SK_ScalarHalf,
  nr as SK_ScalarInfinity,
  hs as SK_ScalarMax,
  sr as SK_ScalarMin,
  lr as SK_ScalarNaN,
  We as SK_ScalarNearlyZero,
  rr as SK_ScalarNegativeInfinity,
  it as SK_ScalarPI,
  Ce as SK_ScalarRoot2Over2,
  Si as SK_ScalarSinCosNearlyZero,
  er as SK_ScalarSqrt2,
  ir as SK_ScalarTanPIOver8,
  Wt as Size,
  wr as SkAutoConicToQuads,
  tr as SkBezierCubic,
  Sr as SkChopCubicAtHalf,
  Rr as SkChopCubicAtXExtrema,
  Ai as SkChopCubicAtYExtrema,
  ce as SkChopCubicAt_3,
  Rs as SkChopCubicAt_4,
  Ei as SkChopCubicAt_5,
  vs as SkChopQuadAt,
  Ms as SkChopQuadAtYExtrema,
  Ds as SkComputeConicExtremas,
  Ys as SkComputeCubicExtremas,
  Vs as SkComputeQuadExtremas,
  W as SkConic,
  ks as SkCubicType,
  Nt as SkCubics,
  Je as SkDegreesToRadians,
  $t as SkDoubleToScalar,
  Ii as SkEvalCubicAt,
  re as SkEvalCubicPosAt,
  wi as SkEvalCubicTangentAt,
  St as SkEvalQuadAt,
  Fe as SkEvalQuadTangentAt,
  qe as SkFindBisector,
  qs as SkFindCubicCusp,
  le as SkFindCubicExtrema,
  Es as SkFindCubicInflections,
  Ni as SkFindCubicMaxCurvature,
  Cr as SkFindCubicMidTangent,
  ei as SkFindQuadExtrema,
  Ss as SkFindQuadMaxCurvature,
  Mr as SkFindQuadMidTangent,
  rt as SkFindUnitQuadRoots,
  hr as SkFloatToScalar,
  or as SkIntToFloat,
  us as SkIntToScalar,
  bt as SkQuadCoeff,
  Jt as SkQuads,
  _r as SkRadiansToDegrees,
  zt as SkRotationDirection,
  ds as SkScalarACos,
  pr as SkScalarASin,
  He as SkScalarATan2,
  j as SkScalarAbs,
  Ke as SkScalarAve,
  cs as SkScalarCeilToInt,
  fr as SkScalarCeilToScalar,
  yr as SkScalarCopySign,
  xt as SkScalarCos,
  te as SkScalarCosSnapToZero,
  xr as SkScalarExp,
  cr as SkScalarFloorToInt,
  Mi as SkScalarFloorToScalar,
  gr as SkScalarFraction,
  J as SkScalarHalf,
  $ as SkScalarInterp,
  Pr as SkScalarInterpFunc,
  we as SkScalarInvert,
  qt as SkScalarIsFinite,
  vr as SkScalarIsInt,
  ps as SkScalarIsNaN,
  br as SkScalarLog,
  kr as SkScalarLog2,
  dr as SkScalarMod,
  Z as SkScalarNearlyEqual,
  nt as SkScalarNearlyZero,
  ms as SkScalarPow,
  mr as SkScalarRoundToInt,
  be as SkScalarRoundToScalar,
  $e as SkScalarSignAsInt,
  Tr as SkScalarSignAsScalar,
  Re as SkScalarSin,
  Gt as SkScalarSinSnapToZero,
  U as SkScalarSqrt,
  Lt as SkScalarSquare,
  ys as SkScalarTan,
  ur as SkScalarToDouble,
  ar as SkScalarToFloat,
  fs as SkScalarTruncToScalar,
  Ne as SkScalarsAreFinite,
  xs as SkScalarsAreFiniteArray,
  Ge as SkScalarsEqual,
  Zn as VectorIterator,
  ct as clamp,
  ss as copysign,
  is as fabs,
  $n as isFinite,
  ti as kMaxConicToQuadPOW2,
  bs as kMaxConicsForArc,
  X as lerp,
  Gn as magnitudeAlt,
  Kn as max,
  Hn as min,
  Dt as nearly_equal,
  on as pointInPath,
  z as sk_double_nearly_zero,
  Jn as sk_double_to_float,
  Mt as sk_doubles_nearly_equal_ulps,
  Se as sk_ieee_double_divide,
  se as sk_ieee_float_divide,
  es as sqrt,
  Un as swap,
  Er as tangent_conic,
  nn as tangent_cubic,
  en as tangent_line,
  sn as tangent_quad,
  Ir as winding_conic,
  tn as winding_cubic,
  Hs as winding_line,
  Gs as winding_quad
};
