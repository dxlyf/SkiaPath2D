var os = Object.defineProperty;
var as = (s, t, e) => t in s ? os(s, t, { enumerable: !0, configurable: !0, writable: !0, value: e }) : s[t] = e;
var d = (s, t, e) => as(s, typeof t != "symbol" ? t + "" : t, e);
const us = 1192092896e-16;
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
class cr {
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
const mr = (s, t) => {
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
function hs(s) {
  return Math.sqrt(s);
}
function le(s, t) {
  return s / t;
}
function yr(s, t) {
  return Math.min(s, t);
}
function dr(s, t) {
  return Math.max(s, t);
}
function fs(s) {
  return Math.abs(s);
}
function D(s, t, e) {
  return Math.min(Math.max(s, t), e);
}
function Z(s, t, e) {
  return s + (t - s) * e;
}
function Q(s) {
  return s == 0 || fs(s) < us;
}
function Le(s, t) {
  return s / t;
}
function pr(s) {
  return s;
}
function xr(s) {
  return Number.isFinite(s);
}
function cs(s, t) {
  return t === 0 ? 1 / t === -1 / 0 ? -Math.abs(s) : Math.abs(s) : t < 0 ? -Math.abs(s) : Math.abs(s);
}
function ti(s) {
  const t = new ArrayBuffer(8), e = new DataView(t);
  e.setFloat64(0, s, !0);
  const i = e.getUint32(0, !0), n = e.getUint32(4, !0);
  let r = BigInt(n) << 32n | BigInt(i);
  r &= 0b0111111111110000000000000000000000000000000000000000000000000000n;
  const o = Number(r >> 32n & 0xffffffffn), a = Number(r & 0xffffffffn);
  return e.setUint32(0, a, !0), e.setUint32(4, o, !0), e.getFloat64(0, !0);
}
function kr(s) {
  return Math.sign(s) * Math.pow(2, Math.floor(Math.log2(Math.abs(s))));
}
function Rt(s, t, e = 0) {
  const i = Number.MIN_VALUE, n = Math.max(
    Math.max(ti(s), i),
    ti(t)
  ), r = Number.EPSILON, l = n * (r * (e + 1));
  return s === t || Math.abs(t - s) < l;
}
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
  get halfX() {
    return this.elements[0] * 0.5;
  }
  get halfY() {
    return this.elements[1] * 0.5;
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
    let l = e, o = i, a = Math.sqrt(l * l + o * o), u = n / a;
    if (e *= u, i *= u, !Number.isFinite(e) || !Number.isFinite(i) || e == 0 && i == 0)
      return t.set(0, 0), !1;
    let h = 0;
    return r && (h = a), t.set(e, i), r && (r.value = h), !0;
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
class oe {
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
    return new oe(this.x, this.y, this.z);
  }
  copy(t) {
    return this.elements[0] = t.x, this.elements[1] = t.y, this.elements[2] = t.z, this;
  }
}
const ms = (s, t) => s[0] * t[0] + s[1] * t[1], ys = (s, t) => s[0] * t[1] - s[1] * t[0], ei = (s, t) => Math.atan2(ys(s, t), ms(s, t));
function ds(s, t, e, i, n, r, l, o, a) {
  let u = Math.cos(a), h = Math.sin(a), c = u * (s - e) / 2 + h * (t - i) / 2, m = -h * (s - e) / 2 + u * (t - i) / 2, y = c * c / (l * l) + m * m / (o * o);
  y > 1 && (y = Math.sqrt(y), l *= y, o *= y);
  let p = n !== r ? 1 : -1, x = (l * l * o * o - l * l * m * m - o * o * c * c) / (l * l * m * m + o * o * c * c);
  x < 0 ? x = 0 : x = Math.sqrt(x);
  let g = p * x * (l * m / o), k = p * x * (-o * c / l), _ = u * g - h * k + (s + e) / 2, v = h * g + u * k + (t + i) / 2, M = ei([1, 0], [(c - g) / l, (m - k) / o]), P = ei([(c - g) / l, (m - k) / o], [(-c - g) / l, (-m - k) / o]);
  !r && P > 0 ? P -= Math.PI * 2 : r && P < 0 && (P += Math.PI * 2);
  let N = M + P;
  return {
    rx: l,
    ry: o,
    cx: _,
    cy: v,
    theta1: M,
    // 是拉伸和旋转操作之前椭圆弧的起始角度。
    theta2: N,
    // 是拉伸和旋转操作之前椭圆弧的终止角度。
    dtheta: P
    // 是这两个角度之间的差值。
  };
}
function br(s, t, e, i, n, r) {
  const l = Math.cos(r) * e, o = Math.sin(r) * i, a = Math.cos(n), u = Math.sin(n);
  return {
    x: s + a * l - u * o,
    y: t + u * l + a * o
  };
}
function ps(s, t, e, i, n, r, l) {
  const o = l - r, a = 4 / 3 * Math.tan(o / 4), u = f.fromRotation(r), h = f.fromRotation(l), c = f.fromPoint(u), m = f.fromPoint(h);
  return c.translate(-a * u.y, a * u.x), m.translate(a * h.y, -a * h.x), u.scale(e, i).rotate(n).translate(s, t), c.scale(e, i).rotate(n).translate(s, t), m.scale(e, i).rotate(n).translate(s, t), h.scale(e, i).rotate(n).translate(s, t), [u.x, u.y, c.x, c.y, m.x, m.y, h.x, h.y];
}
function xs(s, t, e, i, n, r, l, o, a, u) {
  const { cx: h, cy: c, theta1: m, dtheta: y, rx: p, ry: x } = ds(s, t, e, i, o, a, n, r, l), g = Math.ceil(Math.abs(y / (Math.PI / 2))), k = y / g, _ = [];
  let v = m;
  for (let M = 0; M < g; M++) {
    const P = v + k;
    let [N, A, w, C, B, tt, ht, et] = ps(h, c, p, x, l, v, P);
    u == null || u(N, A, w, C, B, tt, ht, et, M), v = P, _.push(N, A, w, C, B, tt, ht, et);
  }
  return _;
}
class gr {
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
    let r = 1 - e, l = r * r, o = l * r, a = 3 * l * e, u = e * e, h = 3 * r * u, c = u * e;
    return [
      o * i(0) + a * i(1) + h * i(2) + c * i(3),
      o * n(0) + a * n(1) + h * n(2) + c * n(3)
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
    const n = (M) => t[2 * M], r = (M) => t[2 * M + 1], l = (M) => i[2 * M], o = (M) => i[2 * M + 1], a = (M, P) => {
      i[2 * M] = P;
    }, u = (M, P) => {
      i[2 * M + 1] = P;
    }, h = (M) => i[2 * M + 6], c = (M) => i[2 * M + 7], m = (M, P) => {
      i[2 * M + 6] = P;
    }, y = (M, P) => {
      i[2 * M + 7] = P;
    };
    a(0, n(0)), u(0, r(0)), m(3, n(3)), y(3, r(3));
    let p = Z(n(0), n(1), e), x = Z(r(0), r(1), e), g = Z(n(1), n(2), e), k = Z(r(1), r(2), e), _ = Z(n(2), n(3), e), v = Z(r(2), r(3), e);
    a(1, p), u(1, x), m(2, _), y(2, v), a(2, Z(p, g, e)), u(2, Z(x, k, e)), m(1, Z(g, _, e)), y(1, Z(k, v, e)), a(3, Z(l(2), h(1), e)), u(3, Z(o(2), c(1), e));
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
function ks(s, t) {
  return Q(t) ? Q(s) : Math.abs(s / t) < 1e-16;
}
function bs(s, t, e) {
  return Q(s) ? (e[0] = 0, Q(t) ? 1 : 0) : (e[0] = -t / s, Number.isFinite(e[0]) ? 1 : 0);
}
class ee {
  /**
   * Puts up to 2 real solutions to the equation
   *   A*t^2 + B*t + C = 0
   * in the provided array.
   */
  static RootsReal(t, e, i, n) {
    if (ks(t, e))
      return bs(e, i, n);
    const r = Le(e, 2 * t), l = Le(i, t), o = r * r;
    if (!Number.isFinite(o - l) || !Q(o - l) && o < l)
      return 0;
    let a = 0;
    return o > l && (a = Math.sqrt(o - l)), n[0] = a - r, n[1] = -a - r, Q(a) || Rt(n[0], n[1]) ? 1 : 2;
  }
  /**
   * Evaluates the quadratic function with the 3 provided coefficients and the
   * provided variable.
   */
  static EvalAt(t, e, i, n) {
    return t * n * n + e * n + i;
  }
}
const ii = Math.PI;
function Zt(s, t) {
  return Q(s) ? Q(t) : Rt(s, t, 0);
}
function ae(s) {
  return Math.abs(s) < 1e-8;
}
function gs(s, t, e, i) {
  let n = [0, 0], r = ee.RootsReal(3 * s, 2 * t, e, n), l = 0;
  for (let o = 0; o < r; o++) {
    let a = n[o];
    a >= 0 && a <= 1 && (i[l++] = a);
  }
  return l;
}
function _s(s, t, e, i, n, r) {
  let l = Ft.EvalAt(s, t, e, i, n);
  if (ae(l))
    return n;
  let o = Ft.EvalAt(s, t, e, i, r);
  if (!Number.isFinite(l) || !Number.isFinite(o) || l > 0 && o > 0 || l < 0 && o < 0)
    return -1;
  let a = 1e3;
  for (let u = 0; u < a; u++) {
    let h = (n + r) / 2, c = Ft.EvalAt(s, t, e, i, h);
    if (ae(c))
      return h;
    c < 0 && l < 0 || c > 0 && l > 0 ? n = h : r = h;
  }
  return -1;
}
function vs(s, t) {
  return Q(t) ? Q(s) : Math.abs(s / t) < 1e-7;
}
class Ft {
  /**
  * Puts up to 3 real solutions to the equation
  *   A*t^3 + B*t^2 + C*t + d = 0
  * in the provided array and returns how many roots that was.
  */
  static RootsReal(t, e, i, n, r) {
    if (vs(t, e))
      return ee.RootsReal(e, i, n, r);
    if (Q(n)) {
      let _ = ee.RootsReal(t, e, i, r);
      for (let v = 0; v < _; ++v)
        if (Q(r[v]))
          return _;
      return r[_++] = 0, _;
    }
    if (Q(t + e + i + n)) {
      let _ = ee.RootsReal(t, t + e, -n, r);
      for (let v = 0; v < _; ++v)
        if (Rt(r[v], 1))
          return _;
      return r[_++] = 1, _;
    }
    let l, o, a;
    {
      let _ = Le(1, t);
      l = e * _, o = i * _, a = n * _;
    }
    let u = l * l, h = (u - o * 3) / 9, c = (2 * u * l - 9 * l * o + 27 * a) / 54, m = c * c, y = h * h * h, p = m - y;
    if (!Number.isFinite(p))
      return 0;
    let x = l / 3, g, k = L.from(r);
    if (p < 0) {
      const _ = Math.acos(D(c / Math.sqrt(y), -1, 1)), v = -2 * Math.sqrt(h);
      g = v * Math.cos(_ / 3) - x, k.value = g, k.next(), g = v * Math.cos((_ + 2 * ii) / 3) - x, Zt(r[0], g) || (k.value = g, k.next()), g = v * Math.cos((_ - 2 * ii) / 3) - x, !Zt(r[0], g) && (k.curIndex == 1 || !Zt(r[1], g)) && (k.value = g, k.next());
    } else {
      const _ = Math.sqrt(p);
      t = Math.abs(c) + _, t = Math.cbrt(t), c > 0 && (t = -t), Q(t) || (t += h / t), g = t - x, k.value = g, k.next(), !Q(m) && Rt(m, y) && (g = -t / 2 - x, Zt(r[0], g) || (k.value = g, k.next()));
    }
    return k.curIndex;
  }
  /**
  * Puts up to 3 real solutions to the equation
  *   A*t^3 + B*t^2 + C*t + D = 0
  * in the provided array, with the constraint that t is in the range [0.0, 1.0],
  * and returns how many roots that was.
  */
  static RootsValidT(t, e, i, n, r) {
    let l = [0, 0, 0], o = Ft.RootsReal(t, e, i, n, l), a = 0;
    for (let u = 0; u < o; ++u) {
      let h = l[u];
      h >= 1 && h <= 1.00005 ? (a < 1 || !Rt(r[0], 1)) && (a < 2 || !Rt(r[1], 1)) && (r[a++] = 1) : h >= -5e-5 && (h <= 0 || Q(h)) ? (a < 1 || !Q(r[0])) && (a < 2 || !Q(r[1])) && (r[a++] = 0) : h > 0 && h < 1 && (r[a++] = h);
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
    let l = [0, 0, 0, 1], o = [0, 0], a = gs(t, e, i, o), u = 2 - a;
    a == 1 && (l[u + 1] = o[0]), a == 2 && (l[u + 1] = Math.min(o[0], o[1]), l[u + 2] = Math.max(o[0], o[1]));
    let h = 0;
    for (; u < 3; u++) {
      let c = _s(t, e, i, n, l[u], l[u + 1]);
      c >= 0 && (h < 1 || !ae(r[0] - c)) && (h < 2 || !ae(r[1] - c)) && (r[h++] = c);
    }
    return h;
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
const V = 1, xt = 0.5, _r = Math.SQRT2, st = Math.PI, vr = 0.414213562, Ae = 0.707106781, Ts = 3402823466e29, Tr = -Ts, Mr = 1 / 0, Pr = -1 / 0, Sr = NaN, Ms = (s) => s, Cr = (s) => s, Rr = (s) => s, Ir = (s) => s, wr = (s) => s, ie = (s) => s, Wi = (s) => Math.floor(s), Er = (s) => Math.ceil(s), Te = (s) => Math.round(s), Ps = (s) => Math.trunc(s), Lr = (s) => Math.floor(s), Ss = (s) => Math.ceil(s), Ar = (s) => Math.round(s), j = (s) => Math.abs(s), Nr = (s, t) => Math.sign(t) * Math.abs(s), Wr = (s, t) => s % t, H = (s) => Math.sqrt(s), Cs = (s, t) => Math.pow(s, t), Ne = (s) => Math.sin(s), kt = (s) => Math.cos(s), Rs = (s) => Math.tan(s), Fr = (s) => Math.asin(s), Is = (s) => Math.acos(s), si = (s, t) => Math.atan2(s, t), qr = (s) => Math.exp(s), Qr = (s) => Math.log(s), zr = (s) => Math.log2(s), ws = (s) => Number.isNaN(s), Vt = (s) => Number.isFinite(s), Ve = (s, t) => Number.isFinite(s) && Number.isFinite(t), Es = (s, t) => s.slice(0, t).every(Number.isFinite), Br = (s) => s - Ps(s), Nt = (s) => s * s, We = (s) => V / s, ni = (s, t) => (s + t) * xt, $ = (s) => s * xt, ri = (s) => s * (st / 180), Vr = (s) => s * (180 / st), Yr = (s) => s === Wi(s), li = (s) => s < 0 ? -1 : s > 0 ? 1 : 0, Or = (s) => s < 0 ? -V : s > 0 ? V : 0, Ye = V / 4096, rt = (s, t = Ye) => j(s) <= t, U = (s, t, e = Ye) => j(s - t) <= e, Fi = V / 65536, se = (s) => {
  const t = Ne(s);
  return rt(t, Fi) ? 0 : t;
}, ne = (s) => {
  const t = kt(s);
  return rt(t, Fi) ? 0 : t;
}, G = (s, t, e) => ((e < 0 || e > V) && console.warn("t out of range [0, 1]"), s + (t - s) * e), Dr = (s, t, e, i) => {
  if (i <= 0 || !t || !e) throw new Error("Invalid input");
  let n = 0;
  for (; n < i && t[n] < s; ) n++;
  if (n === i) return e[i - 1];
  if (n === 0) return e[0];
  const r = t[n - 1], l = t[n], o = (s - r) / (l - r);
  return G(e[n - 1], e[n], o);
}, oi = (s, t, e) => {
  if (e < 0) throw new Error("Invalid length");
  for (let i = 0; i < e; i++) if (s[i] !== t[i]) return !1;
  return !0;
};
class qt {
  constructor(t, e) {
    this.width = t, this.height = e;
  }
  static default() {
    return new qt(0, 0);
  }
  static from(t, e) {
    return new qt(t, e);
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
    return new qt(this.width, this.height);
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
    return qt.from(this.width, this.height);
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
const O = class O {
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
    const i = t.elements, n = e.elements, r = i[0] * n[0] + i[2] * n[1], l = i[1] * n[0] + i[3] * n[1], o = i[0] * n[2] + i[2] * n[3], a = i[1] * n[2] + i[3] * n[3], u = i[0] * n[4] + i[2] * n[5] + i[4], h = i[1] * n[5] + i[3] * n[5] + i[5];
    return this.set(r, l, o, a, u, h);
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
    const l = Math.cos(e), o = Math.sin(e), a = Math.tan(i.x), u = Math.tan(i.y), h = t.x, c = t.y, m = n.x, y = n.y, p = (l + a * o) * m, x = (o + u * l) * m, g = (-o + a * l) * y, k = (l + u * -o) * y, _ = h - (p * r.x + g * r.y), v = c - (x * r.x + k * r.y);
    return this.set(p, x, g, k, _, v);
  }
  determinant() {
    return this.a * this.d - this.b * this.c;
  }
  invertMatrix(t) {
    const e = t.elements, i = e[0], n = e[1], r = 0, l = e[2], o = e[3], a = 0, u = e[4], h = e[5], c = 1;
    let m = t.determinant();
    if (m === 0)
      return this;
    const y = 1 / m, p = (o * c - a * h) * y, x = -(n * c - h * r) * y, g = -(l * c - u * a) * y, k = (i * c - r * r) * y, _ = (l * h - u * o) * y, v = -(i * h - u * n) * y;
    return this.set(p, x, g, k, _, v);
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
    const t = this.elements, e = t[0], i = t[1], n = 0, r = t[2], l = t[3], o = 0, a = t[4], u = t[5], h = 1, c = l * h - o * u, m = -(i * h - u * n), y = -(r * h - a * o), p = e * h - n * n, x = r * u - a * l, g = -(e * u - a * i);
    return this.set(c, m, y, p, x, g);
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
d(O, "EPSILON", 1e-6), d(O, "IDENTITY_MATRIX", O.default()), d(O, "pools", []), d(O, "poolSize", 100);
let ut = O;
const ai = 5, Ls = 5;
var As = /* @__PURE__ */ ((s) => (s[s.kSerpentine = 0] = "kSerpentine", s[s.kLoop = 1] = "kLoop", s[s.kLocalCusp = 2] = "kLocalCusp", s[s.kCuspAtInfinity = 3] = "kCuspAtInfinity", s[s.kQuadratic = 4] = "kQuadratic", s[s.kLineOrPoint = 5] = "kLineOrPoint", s))(As || {}), Yt = /* @__PURE__ */ ((s) => (s[s.kCW_SkRotationDirection = 0] = "kCW_SkRotationDirection", s[s.kCCW_SkRotationDirection = 1] = "kCCW_SkRotationDirection", s))(Yt || {});
function S(s) {
  return T.fromPoint(s);
}
function I(s) {
  let t = f.default();
  return s.storePoint(t), t;
}
function K(s) {
  return s.clone().add(s);
}
function Ns(s) {
  return H(xt + s * xt);
}
function Ws(s, t, e) {
  let i = s - t, n = t - e;
  return i < 0 && (n = -n), +(i == 0 || n < 0);
}
function Qt(s, t, e) {
  if (s < 0 && (s = -s, t = -t), t == 0 || s == 0 || s >= t)
    return 0;
  let i = s / t;
  return ws(i) || i == 0 ? 0 : (e.value = i, 1);
}
function Ut(s) {
  return s == 0 ? 0 : s;
}
function lt(s, t, e, i) {
  if (s == 0)
    return Ut(Qt(-e, t, i));
  let n = i.clone(), r = t * t - 4 * s * e;
  if (r < 0)
    return Ut(0);
  r = hs(r);
  let l = ie(r);
  if (!Vt(l))
    return Ut(0);
  let o = t < 0 ? -(t - l) / 2 : -(t + l) / 2;
  if (n.curIndex += Qt(o, s, n), n.curIndex += Qt(e, o, n), n.curIndex - i.curIndex == 2)
    if (i.get(0) > i.get(1)) {
      let a = i.get(0);
      i.set(0, i.get(1)), i.set(1, a);
    } else i.get(0) == i.get(1) && (n.curIndex -= 1);
  return Ut(n.curIndex - i.curIndex);
}
function bt(s, t, e, i) {
  return e && e.copy(bt(s, t)), i && i.copy(Oe(s, t)), e || I(new _t(s).eval(T.splat(t)));
}
function Oe(s, t) {
  if (t == 0 && s[0] == s[1] || t == 1 && s[1] == s[2])
    return s[2].clone().subtract(s[0]);
  let e = S(s[0]), i = S(s[1]), n = S(s[2]), r = i.clone().sub(e), o = n.clone().sub(i).sub(r).clone().mulScalar(t).add(r);
  return I(o.add(o));
}
function Me(s, t, e) {
  return s.clone().lerp(s, t, e);
}
function zt(s, t, e) {
  let i = S(s[0]), n = S(s[1]), r = S(s[2]), l = T.splat(e), o = Me(i, n, l), a = Me(n, r, l);
  t[0] = I(i), t[1] = I(o), t[2] = I(Me(o, a, l)), t[3] = I(a), t[4] = I(r);
}
function Fs(s, t) {
  return Ve(s, t) && (s || t);
}
function Pe(s, t) {
  return !Fs(s.x - t.x, s.y - t.y);
}
function De(s, t) {
  let e = f.make(2);
  s.dot(t) >= 0 ? (e[0].copy(s), e[1].copy(t)) : s.cross(t) >= 0 ? (e[0].set(-s.y, +s.x), e[1].set(+t.y, -t.x)) : (e[0].set(+s.y, -s.x), e[1].set(-t.y, +t.x));
  let i = T.fromXY(e[0].x, e[1].x), n = T.fromXY(e[0].y, e[1].y), r = i.clone().mul(i).add(n.clone().mul(n)).sqrt().inverse();
  return i.mul(r), n.mul(r), f.create(i[0] + i[1], n[0] + n[1]);
}
function Xr(s) {
  let t = s[1].clone().subtract(s[0]), e = s[2].clone().subtract(s[1]), i = De(t, e.clone().negate()), n = le(t.dot(i), t.clone().subtract(e).dot(i));
  return n > 0 && n < 1 || (n = 0.5), n;
}
function ui(s, t, e, i) {
  return Qt(s - t, s - t - t + e, i);
}
function qs(s, t = "x") {
  s.get(1)[t] = s.get(3)[t] = s.get(2)[t];
}
function Qs(s, t) {
  let e = s[0].y, i = s[1].y, n = s[2].y;
  if (Ws(e, i, n)) {
    let r = L.from([0]);
    if (Qt(e - i, e - i - i + n, r))
      return zt(s, t, r.value), qs(L.from(t), "y"), 1;
    i = j(e - i) < j(i - n) ? e : n;
  }
  return t[0].set(s[0].x, e), t[1].set(s[1].x, i), t[2].set(s[2].x, n), 0;
}
function zs(s) {
  let t = s[1].x - s[0].x, e = s[1].y - s[0].y, i = s[0].x - s[1].x - s[1].x + s[2].x, n = s[0].y - s[1].y - s[1].y + s[2].y, r = -(t * i + e * n), l = i * i + n * n;
  return l < 0 && (r = -r, l = -l), r <= 0 ? 0 : r >= l ? 1 : r / l;
}
function qi(s, t, e, i = 0) {
  for (let n = 0; n < e; n++)
    s[i + n].copy(t[n]);
}
function Qi(s, t) {
  let e = _t.default(), i = S(s[0]), n = S(s[1]), r = S(s[2]), l = S(s[3]);
  return e.fA = l.clone().add(n.clone().sub(r).mulScalar(3)).sub(i), e.fB = K(r.clone().sub(K(n)).add(i)), e.fC = n.clone().sub(i), I(e.eval(T.splat(t)));
}
function Bs(s, t) {
  let e = S(s[0]), i = S(s[1]), n = S(s[2]), r = S(s[3]), l = i.clone().sub(n).mulScalar(3).add(r).sub(e), o = n.clone().sub(K(i)).add(e);
  return I(l.mulScalar(t).add(o));
}
function zi(s, t, e = f.default()) {
  return t == 0 && s[0].equals(s[1]) || t == 1 && s[2].equals(s[3]) ? (t == 0 ? e.subtractVectors(s[2], s[0]) : e.subtractVectors(s[3], s[1]), !e.x && !e.y && e.subtractVectors(s[3], s[0])) : e.copy(Qi(s, t)), e;
}
function ue(s, t, e = f.default()) {
  return e.copy(I(new Gs(s).eval(T.splat(t)))), e;
}
function Xe(s, t, e, i, n) {
  e && ue(s, t, e), i && zi(s, t, i), n && n.copy(Bs(s, t));
}
function he(s, t, e, i, n) {
  let r = i - s + 3 * (t - e), l = 2 * (s - t - t + e), o = t - s;
  return lt(r, l, o, n);
}
function X(s, t, e) {
  return s.clone().lerp(s, t, e);
}
function at(s, t, e) {
  if (e == 1) {
    qi(t, s, 4), t[4].copy(s[3]), t[5].copy(s[3]), t[6].copy(s[3]);
    return;
  }
  let i = S(s[0]), n = S(s[1]), r = S(s[2]), l = S(s[3]), o = T.splat(e), a = X(i, n, o), u = X(n, r, o), h = X(r, l, o), c = X(a, u, o), m = X(u, h, o), y = X(c, m, o);
  t[0] = I(i), t[1] = I(a), t[2] = I(c), t[3] = I(y), t[4] = I(m), t[5] = I(h), t[6] = I(l);
}
function Vs(s, t, e, i) {
  if (i == 1) {
    at(s, t, e), t[7].copy(s[3]), t[8].copy(s[3]), t[9].copy(s[3]);
    return;
  }
  let n = T.make(4), r = T.make(4), l = T.make(4), o = T.make(4), a = T.make(4);
  n.setElements([s[0].x, s[0].y, s[0].x, s[0].y]), r.setElements([s[1].x, s[1].y, s[1].x, s[1].y]), l.setElements([s[2].x, s[2].y, s[2].x, s[2].y]), o.setElements([s[3].x, s[3].y, s[3].x, s[3].y]), a.setElements([e, e, i, i]);
  let u = X(n, r, a), h = X(r, l, a), c = X(l, o, a), m = X(u, h, a), y = X(h, c, a), p = X(m, y, a), x = X(m, y, T.make(4).setElements([a[2], a[3], a[0], a[1]]));
  t[0] = f.create(n[0], n[1]), t[1] = f.create(u[0], u[1]), t[2] = f.create(m[0], m[1]), t[3] = f.create(p[0], p[1]), t[4] = f.create(x[0], x[1]), t[5] = f.create(x[2], x[3]), t[6] = f.create(p[2], p[3]), t[7] = f.create(y[2], y[3]), t[8] = f.create(c[2], c[3]), t[9] = f.create(o[2], o[3]);
}
function Bi(s, t, e, i) {
  if (t)
    if (i == 0)
      qi(t, s, 4);
    else {
      let n = 0, r = 0, l = [];
      for (; n < i - 1; n += 2) {
        let o = T.splat(e[n]);
        if (n != 0) {
          let a = e[n - 1];
          o = o.clone().sub(T.splat(a)).div(T.splat(1 - a)).clmap(T.splat(0), T.splat(1));
        }
        l.length = 0, Vs(s, l, o[0], o[1]), l.forEach((a, u) => {
          t[r + u] = a;
        }), r += 6, s = l.slice(6);
      }
      if (n < i) {
        let o = e[n];
        if (n != 0) {
          let a = e[n - 1];
          o = D(le(o - a, 1 - a), 0, 1);
        }
        l.length = 0, at(s, l, o), l.forEach((a, u) => {
          t[r + u] = a;
        });
      }
    }
}
function jr(s, t) {
  at(s, t, 0.5);
}
function Tt(s, t, e) {
  return T.make(4).setElements([
    s[0] * t + e[0],
    s[1] * t + e[1],
    s[2] * t + e[2],
    s[3] * t + e[3]
  ]);
}
function Ys(s, t) {
  return t >= 0 ? Math.abs(s) : -Math.abs(s);
}
function Vi(s, t, e, i) {
  let n = -0.5 * (t + Ys(Math.sqrt(i), t)), r = -0.5 * n * s, l = Math.abs(n * n + r) < Math.abs(s * e + r) ? le(n, s) : le(e, n);
  return l > 0 && l < 1 || (l = 0.5), l;
}
function Os(s, t, e) {
  return Vi(s, t, e, t * t - 4 * s * e);
}
function Zr(s) {
  let t = s[0].equals(s[1]) ? s[2].clone().subtract(s[0]) : s[1].clone().subtract(s[0]), e = s[2].equals(s[3]) ? s[3].clone().subtract(s[1]) : s[3].clone().subtract(s[2]), i = De(t, e.clone().negate());
  const n = [
    T.fromArray([-1, 2, -1, 0]),
    T.fromArray([3, -4, 1, 0]),
    T.fromArray([-3, 2, 0, 0])
  ];
  let r = Tt(
    n[0],
    s[0].x,
    Tt(
      n[1],
      s[1].x,
      Tt(n[2], s[2].x, T.fromArray([s[3].x, 0, 0, 0]))
    )
  ), l = Tt(
    n[0],
    s[0].y,
    Tt(
      n[1],
      s[1].y,
      Tt(n[2], s[2].y, T.fromArray([s[3].y, 0, 0, 0]))
    )
  ), o = r.clone().mulScalar(i.x).add(l.clone().mulScalar(i.y)), a = 0, u = o[0], h = o[1], c = o[2], m = h * h - 4 * u * c;
  return m > 0 ? Vi(u, h, c, m) : (o = r.clone().mulScalar(t.x).add(l.clone().mulScalar(t.y)), u = o[0], h = o[1], u != 0 && (a = -h / (2 * u)), a > 0 && a < 1 || (a = 0.5), a);
}
function fe(s, t = "x") {
  s.get(2)[t] = s.get(4)[t] = s.get(3)[t];
}
function Yi(s, t) {
  let e = L.from([0, 0]), i = he(
    s[0].y,
    s[1].y,
    s[2].y,
    s[3].y,
    e
  ), n = L.from(t);
  return Bi(s, t, e.data, i), t && i > 0 && (fe(n, "y"), i == 2 && (n.next(3), fe(n, "y"))), i;
}
function Ur(s, t) {
  let e = L.from([0, 0]), i = he(
    s[0].x,
    s[1].x,
    s[2].x,
    s[3].x,
    e
  );
  Bi(s, t, e.data, i);
  let n = L.from(t);
  return t && i > 0 && (fe(n, "x"), i == 2 && (n.next(3), fe(n, "x"))), i;
}
function Ds(s, t) {
  let e = s[1].x - s[0].x, i = s[1].y - s[0].y, n = s[2].x - 2 * s[1].x + s[0].x, r = s[2].y - 2 * s[1].y + s[0].y, l = s[3].x + 3 * (s[1].x - s[2].x) - s[0].x, o = s[3].y + 3 * (s[1].y - s[2].y) - s[0].y;
  return lt(
    n * o - r * l,
    e * o - i * l,
    e * r - i * n,
    L.from(t)
  );
}
function Xs(s, t) {
  for (let e = t - 1; e > 0; --e)
    for (let i = e; i > 0; --i)
      if (s[i] < s[i - 1]) {
        let n = s[i];
        s[i] = s[i - 1], s[i - 1] = n;
      }
}
class _t {
  constructor(t, e, i) {
    d(this, "fA", T.make(2));
    d(this, "fB", T.make(2));
    d(this, "fC", T.make(2));
    if (t && e && i)
      this.fA.copy(t), this.fB.copy(e), this.fC.copy(i);
    else if (t) {
      let n = S(t[0]), r = S(t[1]), l = S(t[2]), o = K(r.clone().sub(n)), a = l.sub(K(r)).add(n);
      this.fA.copy(a), this.fB.copy(o), this.fC.copy(n);
    }
  }
  static default() {
    return new _t();
  }
  eval(t) {
    return this.fA.clone().mul(t).add(this.fB).mul(t).add(this.fC);
  }
}
function js(s, t) {
  for (let e = t; e > 1; --e)
    if (s.get(0) == s.get(1)) {
      for (let i = 1; i < e; ++i)
        s.set(i - 1, s.get(i));
      t -= 1;
    } else
      s.next();
  return t;
}
function Zs(s) {
  return Cs(s, 0.3333333);
}
function Us(s, t) {
  if (rt(s[0]))
    return lt(s[1], s[2], s[3], L.from(t));
  let e, i, n, r, l;
  {
    let h = We(s[0]);
    e = s[1] * h, i = s[2] * h, n = s[3] * h;
  }
  r = (e * e - i * 3) / 9, l = (2 * e * e * e - 9 * e * i + 27 * n) / 54;
  let o = r * r * r, a = l * l - o, u = e / 3;
  if (a < 0) {
    let h = Is(D(l / H(o), -1, 1)), c = -2 * H(r);
    return t[0] = D(c * kt(h / 3) - u, 0, 1), t[1] = D(c * kt((h + 2 * st) / 3) - u, 0, 1), t[2] = D(c * kt((h - 2 * st) / 3) - u, 0, 1), Xs(t, 3), js(L.from(t), 3);
  } else {
    let h = j(l) + H(a);
    return h = Zs(h), l > 0 && (h = -h), h != 0 && (h += r / h), t[0] = D(h - u, 0, 1), 1;
  }
}
function hi(s, t) {
  let e = s[1] - s[0], i = s[2] - 2 * s[1] + s[0], n = s[3] + 3 * (s[1] - s[2]) - s[0];
  t[0] = n * n, t[1] = 3 * i * n, t[2] = 2 * i * i + n * e, t[3] = e * i;
}
function Oi(s, t) {
  let e = new Array(4).fill(0), i = new Array(4).fill(0), n;
  for (hi(s.map((l) => l.x), e), hi(s.map((l) => l.y), i), n = 0; n < 4; n++)
    e[n] += i[n];
  return Us(e, t);
}
function Hs(s) {
  return (s[1].distanceToSquared(s[0]) + s[2].distanceToSquared(s[1]) + s[3].distanceToSquared(s[2])) * 1e-8;
}
function fi(s, t, e) {
  let i = s[e].clone(), n = s[e + 1].clone().subtract(i), r = new Array(2).fill(0);
  for (let l = 0; l < 2; ++l) {
    let o = s[t + l].clone().subtract(i);
    r[l] = n.cross(o);
  }
  return r[0] * r[1] >= 0;
}
function Ks(s) {
  if (s[0].equalsEpsilon(s[1]) || s[2].equalsEpsilon(s[3]) || fi(s, 0, 2) || fi(s, 2, 0))
    return -1;
  let t = new Array(3).fill(0), e = Oi(s, t);
  for (let i = 0; i < e; ++i) {
    let n = t[i];
    if (0 >= n || n >= 1)
      continue;
    let l = Qi(s, n).lengthSq(), o = Hs(s);
    if (l < o)
      return n;
  }
  return -1;
}
function Js(s, t, e) {
  const i = s[2] - s[0], n = s[1] - s[0], r = t * n;
  e[0] = t * i - i, e[1] = i - 2 * r, e[2] = r;
}
function ci(s, t, e) {
  let i = new Array(3).fill(0);
  Js(s, t, i);
  let n = L.from([0, 0]);
  return lt(i[0], i[1], i[2], n) == 1 ? (e.value = n.get(0), 1) : 0;
}
function Se(s, t, e, i = "x") {
  let n = G(s[0][i], s[1][i], e), r = G(s[1][i], s[2][i], e);
  t[0][i] = n, t[1][i] = G(n, r, e), t[2][i] = r;
}
function $s(s, t, e) {
  e[0].set(s[0].x * 1, s[0].y * 1, 1), e[1].set(s[1].x * t, s[1].y * t, t), e[2].set(s[2].x * 1, s[2].y * 1, 1);
}
function Ce(s) {
  return f.create(s.x / s.z, s.y / s.z);
}
class mi {
  constructor(t) {
    d(this, "fNumer", _t.default());
    d(this, "fDenom", _t.default());
    let e = S(t.fPts[0]), i = S(t.fPts[1]), n = S(t.fPts[2]), r = T.splat(t.fW), l = i.clone().mul(r);
    this.fNumer.fC.copy(e), this.fNumer.fA.copy(n.clone().sub(K(l)).add(e)), this.fNumer.fB.copy(K(l.clone().sub(e))), this.fDenom.fC.setElements([1, 1]), this.fDenom.fB = K(r.clone().sub(this.fDenom.fC)), this.fDenom.fA.setElements([0 - this.fDenom.fB.x, 0 - this.fDenom.fB.y]);
  }
  eval(t) {
    let e = T.splat(t), i = this.fNumer.eval(e), n = this.fDenom.eval(e);
    return i.div(n);
  }
}
class Gs {
  constructor(t) {
    d(this, "fA", T.make(2));
    d(this, "fB", T.make(2));
    d(this, "fC", T.make(2));
    d(this, "fD", T.make(2));
    let e = S(t[0]), i = S(t[1]), n = S(t[2]), r = S(t[3]), l = T.splat(3);
    this.fA = i.clone().sub(n).mul(l).add(r).sub(e), this.fB = n.clone().sub(K(i)).add(e).mul(l), this.fC = i.clone().sub(e).mul(l), this.fD = e;
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
    this.fW = t > 0 && Vt(t) ? t : 1;
  }
  // return false if infinity or NaN is generated; caller must check
  chopAt_2(t, e) {
    let i = oe.make(3), n = oe.make(3);
    $s(this.fPts, this.fW, i), Se(i, n, t, "x"), Se(i, n, t, "y"), Se(i, n, t, "z"), e[0].fPts[0] = this.fPts[0].clone(), e[0].fPts[1] = Ce(n[0]), e[0].fPts[2] = Ce(n[1]), e[1].fPts[0] = e[0].fPts[2].clone(), e[1].fPts[1] = Ce(n[2]), e[1].fPts[2] = this.fPts[2].clone();
    let r = H(n[1].z);
    return e[0].fW = n[0].z / r, e[1].fW = n[2].z / r, Ve(e[0].fPts[0].x, 14);
  }
  chopAt_3(t, e, i) {
    if (t == 0 || e == 1)
      if (t == 0 && e == 1) {
        i.copy(this);
        return;
      } else {
        let k = [W.default(), W.default()];
        if (this.chopAt_2(t || e, k)) {
          i.copy(k[+!!t]);
          return;
        }
      }
    let n = new mi(this), r = T.splat(t), l = n.fNumer.eval(r), o = n.fDenom.eval(r), a = T.splat((t + e) / 2), u = n.fNumer.eval(a), h = n.fDenom.eval(a), c = T.splat(e), m = n.fNumer.eval(c), y = n.fDenom.eval(c), p = K(u).sub(l.clone().add(m).mulScalar(0.5)), x = K(h).sub(o.clone().add(y).mulScalar(0.5));
    i.fPts[0] = I(l.clone().div(o)), i.fPts[1] = I(p.clone().div(x)), i.fPts[2] = I(m.clone().div(y));
    let g = x.clone().div(o.clone().mul(y).sqrt());
    i.fW = g[0];
  }
  evalAt(t) {
    return I(new mi(this).eval(t));
  }
  evalAt_3(t, e, i) {
    e && e.copy(this.evalAt(t)), i && i.copy(this.evalTangentAt(t));
  }
  evalTangentAt(t) {
    const e = this.fPts, i = this.fW;
    if (t == 0 && e[0] == e[1] || t == 1 && e[1] == e[2])
      return e[2].clone().subtract(e[0]);
    let n = S(e[0]), r = S(e[1]), l = S(e[2]), o = T.splat(i), a = l.clone().sub(n), u = r.clone().sub(n), h = o.clone().mul(u), c = o.clone().mul(a).sub(a), m = a.clone().sub(h).sub(h);
    return I(new _t(c, m, h).eval(T.splat(t)));
  }
  chop(t) {
    const e = this.fW, i = this.fPts, n = We(V + e), r = S(i[0]).mulScalar(n), l = S(i[1]).mulScalar(e * n), o = S(i[2]).mulScalar(n), a = I(r.clone().add(l)), u = I(l.clone().add(o)), h = I(r.clone().mulScalar(0.5).add(l).add(o.clone().mulScalar(0.5)));
    t[0].fPts[0].copy(i[0]), t[0].fPts[1].copy(a), t[0].fPts[2].copy(h), t[1].fPts[0].copy(h), t[1].fPts[1].copy(u), t[1].fPts[2].copy(i[2]), t[0].fW = t[1].fW = Ns(e);
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
    if (t < 0 || !Vt(t) || !this.fPts.every((h) => h.isFinite()))
      return 0;
    const e = this.fW, i = this.fPts;
    let n = e - 1, r = n / (4 * (2 + n)), l = r * (i[0].x - 2 * i[1].x + i[2].x), o = r * (i[0].y - 2 * i[1].y + i[2].y), a = H(l * l + o * o), u = 0;
    for (u = 0; u < ai && !(a <= t); ++u)
      a *= 0.25;
    return u;
  }
  chopIntoQuadsPOW2(t, e) {
    const i = this.fPts;
    this.fW, t.get(0).copy(i[0]);
    let n = t.curIndex;
    const r = () => {
      const o = 2 * (1 << e) + 1;
      let a = t.curIndex - n;
      if (console.assert(a === o, "diff!==ptCount"), t.data.slice(t.curIndex, t.curIndex + o).some((u) => !u.isFinite()))
        for (let u = 1; u < o - 1; ++u)
          t.get(u).copy(i[1]);
    };
    if (e == ai) {
      let l = [W.default(), W.default()];
      if (this.chop(l), Pe(l[0].fPts[1], l[0].fPts[2]) && Pe(l[1].fPts[0], l[1].fPts[1]))
        return t.get(1).copy(l[0].fPts[1]), t.get(2).copy(l[0].fPts[1]), t.get(3).copy(l[0].fPts[1]), t.get(4).copy(l[1].fPts[2]), e = 1, r(), 1 << e;
    }
    return t.next(), Fe(this, t, e), r(), 1 << e;
  }
  findMidTangent() {
    const t = this.fPts, e = this.fW;
    let i = t[1].clone().subtract(t[0]), n = t[2].clone().subtract(t[1]), r = De(i, n.clone().negate()), l = t[2].clone().subtract(t[0]).multiplyScalar(e - 1), o = t[2].clone().subtract(t[0]).subtract(t[1].clone().subtract(t[0]).multiplyScalar(e * 2)), a = t[1].clone().subtract(t[0]).multiplyScalar(e), u = r.dot(l), h = r.dot(o), c = r.dot(a);
    return Os(u, h, c);
  }
  findXExtrema(t) {
    return ci(this.fPts.map((e) => e.x), this.fW, t);
  }
  findYExtrema(t) {
    return ci(this.fPts.map((e) => e.y), this.fW, t);
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
    if (j(o) <= Ye && l > 0 && (o >= 0 && i == 0 || o <= 0 && i == 1))
      return 0;
    i == 1 && (o = -o);
    let u = 0;
    o == 0 ? u = 2 : l == 0 ? u = o > 0 ? 1 : 3 : (o < 0 && (u += 2), l < 0 != o < 0 && (u += 1));
    const h = [
      f.create(1, 0),
      f.create(1, 1),
      f.create(0, 1),
      f.create(-1, 1),
      f.create(-1, 0),
      f.create(-1, -1),
      f.create(0, -1),
      f.create(1, -1)
    ], c = Ae;
    let m = u;
    for (let k = 0; k < m; ++k)
      r[k].set(h[k * 2], h[k * 2 + 1], h[k * 2 + 2], c);
    const y = f.create(l, o), p = h[u * 2], x = p.dot(y);
    if (x < 1) {
      let k = f.create(p.x + l, p.y + o);
      const _ = H((1 + x) / 2);
      k.setLength(We(_)), Pe(p, k) || (r[m].set(p, k, y, _), m += 1);
    }
    let g = ut.identity();
    g.setSinCos(t.y, t.x), i == 1 && g.preScale(V, -V), n && g.premultiply(n);
    for (let k = 0; k < m; ++k)
      g.mapPoints(r[k].fPts, r[k].fPts);
    return m;
  }
}
function tn(s, t) {
  let e = L.from([0, 0]), i = ui(s[0].x, s[1].x, s[2].x, e);
  e.next(i), i += ui(s[0].y, s[1].y, s[2].y, e), e.move(0);
  for (let n = 0; n < i; ++n)
    t[n] = bt(s, e.get(n));
  return t[i].copy(s[2]), i + 1;
}
function en(s, t) {
  let e = L.from([0, 0, 0, 0]), i = 0;
  i = he(s[0].x, s[1].x, s[2].x, s[3].x, e), i += he(s[0].y, s[1].y, s[2].y, s[3].y, e), e.move(0);
  for (let n = 0; n < i; ++n)
    Xe(s, e.get(n), t[n], null, null);
  return t[i].copy(s[3]), i + 1;
}
function sn(s, t, e) {
  let i = new W();
  i.set(s[0], s[1], s[2], t);
  let n = [E.from(0), E.from(0)], r = i.findXExtrema(n[0]);
  r += i.findYExtrema(n[1]);
  for (let l = 0; l < r; ++l)
    e[l] = i.evalAt(n[l].value);
  return e[r].copy(s[2]), r + 1;
}
function Ht(s, t, e) {
  return (s - t) * (e - t) <= 0;
}
function Fe(s, t, e) {
  if (e === 0)
    return t.get(0).copy(s.fPts[1]), t.get(1).copy(s.fPts[2]), t.next(2), t;
  {
    const i = W.make(2);
    s.chop(i);
    const n = s.fPts[0].y;
    let r = s.fPts[2].y;
    if (Ht(n, s.fPts[1].y, r)) {
      let l = i[0].fPts[2].y;
      if (!Ht(n, l, r)) {
        let o = Math.abs(l - n) < Math.abs(l - r) ? n : r;
        i[0].fPts[2].y = i[1].fPts[0].y = o;
      }
      Ht(n, i[0].fPts[1].y, i[0].fPts[2].y) || (i[0].fPts[1].y = n), Ht(i[1].fPts[0].y, i[1].fPts[1].y, r) || (i[1].fPts[1].y = r);
    }
    return --e, Fe(i[0], t, e), Fe(i[1], t, e);
  }
}
class Hr {
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
function Kt(s, t, e, i) {
  return s + t > e ? Math.min(i, e / (s + t)) : i;
}
function nn(s, t) {
  if (Number.isNaN(s) || Number.isNaN(t)) return NaN;
  if (s === t) return t;
  const e = new ArrayBuffer(4), i = new Float32Array(e), n = new Int32Array(e);
  return i[0] = s, s === 0 ? (n[0] = 2147483649, i[0]) : (s < t == s > 0 ? n[0]++ : n[0]--, i[0]);
}
function Jt(s, t, e, i) {
  if (e.value = e.value * t, i.value = i.value * t, e.value + i.value > s) {
    let n = e, r = i;
    if (n > r) {
      let a = n;
      n = r, r = a;
    }
    let l = n, o = s - l.value;
    for (; o + l.value > s; )
      o = nn(o, 0);
    r.value = o;
  }
}
function $t(s, t) {
  s.value + t.value == s.value ? t.value = 0 : s.value + t.value == t.value && (s.value = 0);
}
function yi(s, t, e) {
  return t <= e && s <= e - t && t + s <= e && e - s >= t && s >= 0;
}
function di(s) {
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
function pi(s) {
  let t = !0;
  for (let e = 0; e < 4; ++e)
    s[e].x <= 0 || s[e].y <= 0 ? (s[e].x = 0, s[e].y = 0) : t = !1;
  return t;
}
const Mt = 0, ft = 1, ot = 2, Wt = 3, Gt = 4, Re = 5, rn = 5;
var Di = /* @__PURE__ */ ((s) => (s[s.kUpperLeft_Corner = 0] = "kUpperLeft_Corner", s[s.kUpperRight_Corner = 1] = "kUpperRight_Corner", s[s.kLowerRight_Corner = 2] = "kLowerRight_Corner", s[s.kLowerLeft_Corner = 3] = "kLowerLeft_Corner", s))(Di || {});
const ct = 0, Pt = 1, St = 2, Ct = 3, yt = class yt {
  constructor() {
    d(this, "fRect", q.makeEmpty());
    d(this, "fType", 0);
    d(this, "fRadii", [f.zero(), f.zero(), f.zero(), f.zero()]);
  }
  static default() {
    return new this();
  }
  static from(t, e, i = Mt) {
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
    return Mt == this.getType();
  }
  isRect() {
    return ft == this.getType();
  }
  isOval() {
    return ot == this.getType();
  }
  isSimple() {
    return Wt == this.getType();
  }
  isNinePatch() {
    return Gt == this.getType();
  }
  isComplex() {
    return Re == this.getType();
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
    this.copy(yt.default());
  }
  /** Sets bounds to sorted rect, and sets corner radii to zero.
      If set bounds has width and height, and sets type to kRect_Type;
      otherwise, sets type to kEmpty_Type.
  
      @param rect  bounds to set
  */
  setRect(t) {
    this.initializeRect(t) && (this.fRadii.forEach((e) => {
      e.set(0, 0);
    }), this.fType = ft);
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
    let e = yt.default();
    return e.setRect(t), e;
  }
  /** Sets bounds to oval, x-axis radii to half oval.width(), and all y-axis radii
         to half oval.height(). If oval bounds is empty, sets to kEmpty_Type.
         Otherwise, sets to kOval_Type.
  
         @param oval  bounds of oval
         @return      oval
     */
  static makeOval(t) {
    let e = yt.default();
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
      this.setRadiiEmpty(), this.fType = ft;
    else {
      for (let n = 0; n < 4; ++n)
        this.fRadii[n].set(e, i);
      this.fType = ot;
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
    if (Ve(e, i) || (e = i = 0), n.width < e + e || n.height < i + i) {
      let r = Math.min(n.width / (e + e), n.height / (i + i));
      e *= r, i *= r;
    }
    if (e <= 0 || i <= 0) {
      this.setRect(t);
      return;
    }
    for (let r = 0; r < 4; ++r)
      this.fRadii[r].set(e, i);
    this.fType = Wt, e >= $(n.width) && i >= $(n.height) && (this.fType = ot);
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
    if (!Es([e, i, n, r], 4)) {
      this.setRect(t);
      return;
    }
    e = Math.max(e, 0), i = Math.max(i, 0), n = Math.max(n, 0), r = Math.max(r, 0);
    let a = V;
    e + n > l.width && (a = l.width / (e + n)), i + r > l.height && (a = Math.min(a, l.height / (i + r))), a < V && (e *= a, i *= a, n *= a, r *= a), e == n && i == r ? e >= $(l.width) && i >= $(l.height) ? this.fType = ot : e == 0 || i == 0 ? (this.fType = ft, e = 0, i = 0, n = 0, r = 0) : this.fType = Wt : this.fType = Gt, this.fRadii[ct].set(e, i), this.fRadii[Pt].set(n, i), this.fRadii[St].set(n, r), this.fRadii[Ct].set(e, r);
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
      }), pi(this.fRadii)) {
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
    return t.fRect == e.fRect && oi(t.fRadii.map((i) => i.x), e.fRadii.map((i) => i.x), 4);
  }
  /** Returns true if bounds and radii in a are not equal to bounds and radii in b.
  
         a and b are not equal if either contain NaN. a and b are equal if members
         contain zeroes with different signs.
  
         @param a  SkRect bounds and radii to compare
         @param b  SkRect bounds and radii to compare
         @return   true if members are not equal
     */
  notEquals(t, e) {
    return t.fRect != e.fRect || !oi(t.fRadii.map((i) => i.x), e.fRadii.map((i) => i.x), 4);
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
    if (r.right <= r.left && (l = !0, r.left = r.right = ni(r.left, r.right)), r.bottom <= r.top && (l = !0, r.top = r.bottom = ni(r.top, r.bottom)), l) {
      i.fRect.copy(r), i.setRadiiEmpty(), i.fType = Mt;
      return;
    }
    if (!r.isFinite()) {
      i.setEmpty();
      return;
    }
    let o = [f.zero(), f.zero(), f.zero(), f.zero()];
    o.forEach((a, u) => {
      a.copy(this.fRadii[u]);
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
    return yt.from(this.fRect.makeOffset(t, e), this.fRadii, this.fType);
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
    let r = di(t), l = this.fType, o = this.fRect;
    if (l < 0 || l > rn)
      return !1;
    switch (l) {
      case Mt:
        if (!o.isEmpty() || !e || !n || !i)
          return !1;
        break;
      case ft:
        if (o.isEmpty() || !e || !n || !i)
          return !1;
        break;
      case ot:
        if (o.isEmpty() || e || !n || i)
          return !1;
        for (let a = 0; a < 4; ++a)
          if (!U(t[a].x, o.halfWidth) || !U(t[a].y, o.halfHeight))
            return !1;
        break;
      case Wt:
        if (o.isEmpty() || e || !n || i)
          return !1;
        break;
      case Gt:
        if (o.isEmpty() || e || n || i || !r)
          return !1;
        break;
      case Re:
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
      if (!yi(e[i].x, t.left, t.right) || !yi(e[i].y, t.top, t.bottom))
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
    if (e.fRect = i, e.fType = this.fType, ft == this.fType)
      return !0;
    if (ot == this.fType) {
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
      const u = a ? 3 : 1;
      for (let h = 0; h < 4; ++h) {
        const c = h + u >= 4 ? (h + u) % 4 : h + u;
        e.fRadii[h].x = this.fRadii[c].y, e.fRadii[h].y = this.fRadii[c].x;
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
    return t.isFinite() ? (this.fRect = t.makeSorted(), this.fRect.isEmpty() ? (this.setRadiiEmpty(), this.fType = Mt, !1) : !0) : (this.setEmpty(), !1);
  }
  computeType() {
    const t = this.fRect;
    if (t.isEmpty()) {
      this.fType = Mt;
      return;
    }
    let e = this.fRadii, i = !0, n = e[0].x == 0 || e[0].y == 0;
    for (let r = 1; r < 4; ++r)
      e[r].x != 0 && e[r].y != 0 && (n = !1), (e[r].x != e[r - 1].x || e[r].y != e[r - 1].y) && (i = !1);
    if (n) {
      this.fType = ft;
      return;
    }
    if (i) {
      e[0].x >= $(t.width) && e[0].y >= $(t.height) ? this.fType = ot : this.fType = Wt;
      return;
    }
    di(e) ? this.fType = Gt : this.fType = Re, this.isValid() || this.setRect(this.rect());
  }
  checkCornerContainment(t, e) {
    let i = f.default(), n;
    const r = this.fRect, l = this.fRadii;
    if (ot == this.type)
      i.set(t - r.centerX, e - r.centerY), n = ct;
    else if (t < r.left + l[ct].x && e < r.top + l[ct].y)
      n = ct, i.set(
        t - (r.left + l[ct].x),
        e - (r.top + l[ct].y)
      );
    else if (t < r.left + l[Ct].x && e > r.bottom - l[Ct].y)
      n = Ct, i.set(
        t - (r.left + l[Ct].x),
        e - (r.bottom - l[Ct].y)
      );
    else if (t > r.right - l[Pt].x && e < r.top + l[Pt].y)
      n = Pt, i.set(
        t - (r.right - l[Pt].x),
        e - (r.top + l[Pt].y)
      );
    else if (t > r.right - l[St].x && e > r.bottom - l[St].y)
      n = St, i.set(
        t - (r.right - l[St].x),
        e - (r.bottom - l[St].y)
      );
    else
      return !0;
    return Nt(i.x) * Nt(l[n].y) + Nt(i.y) * Nt(l[n].x) <= Nt(l[n].x * l[n].x);
  }
  // Returns true if the radii had to be scaled to fit rect
  scaleRadii() {
    let t = 1;
    const e = this.fRect, i = this.fRadii;
    let n = e.right - e.left, r = e.bottom - e.top;
    t = Kt(i[0].x, i[1].x, n, t), t = Kt(i[1].y, i[2].y, r, t), t = Kt(i[2].x, i[3].x, n, t), t = Kt(i[3].y, i[0].y, r, t);
    let l = E.from(i[0].x), o = E.from(i[1].x), a = E.from(i[2].x), u = E.from(i[3].x), h = E.from(i[0].y), c = E.from(i[1].y), m = E.from(i[2].y), y = E.from(i[3].y);
    return $t(l, o), $t(c, m), $t(a, u), $t(y, h), t < 1 && (Jt(n, t, l, o), Jt(r, t, c, m), Jt(n, t, a, u), Jt(r, t, y, h)), i[0].set(l.value, h.value), i[1].set(o.value, c.value), i[2].set(a.value, m.value), i[3].set(u.value, y.value), pi(i), this.computeType(), t < 1;
  }
};
d(yt, "Corner", Di);
let dt = yt;
var pt = /* @__PURE__ */ ((s) => (s[s.kWinding = 0] = "kWinding", s[s.kEvenOdd = 1] = "kEvenOdd", s[s.kInverseWinding = 2] = "kInverseWinding", s[s.kInverseEvenOdd = 3] = "kInverseEvenOdd", s))(pt || {}), F = /* @__PURE__ */ ((s) => (s[s.kCW = 0] = "kCW", s[s.kCCW = 1] = "kCCW", s))(F || {}), it = /* @__PURE__ */ ((s) => (s[s.kLine_SkPathSegmentMask = 1] = "kLine_SkPathSegmentMask", s[s.kQuad_SkPathSegmentMask = 2] = "kQuad_SkPathSegmentMask", s[s.kConic_SkPathSegmentMask = 4] = "kConic_SkPathSegmentMask", s[s.kCubic_SkPathSegmentMask = 8] = "kCubic_SkPathSegmentMask", s))(it || {}), b = /* @__PURE__ */ ((s) => (s[s.kMove = 0] = "kMove", s[s.kLine = 1] = "kLine", s[s.kQuad = 2] = "kQuad", s[s.kConic = 3] = "kConic", s[s.kCubic = 4] = "kCubic", s[s.kClose = 5] = "kClose", s))(b || {}), R = /* @__PURE__ */ ((s) => (s[
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
function ln(s) {
  return (s & 2) != 0;
}
class on {
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
      case b.kMove:
        if (this.needClose)
          return this.verbIndex--, n = this.autoClose(t), n == R.kClose && (this.needClose = !1), n;
        if (this.verbIndex === this.verbEnd)
          return R.kDone;
        this.movePoint.copy(e[i]), t[0] = f.fromPoint(e[i]), i += 1, this.lastPoint.copy(this.movePoint), this.needClose = this.forceClose;
        break;
      case b.kLine:
        t[0] = this.lastPoint.clone(), t[1] = f.fromPoint(e[i]), this.lastPoint.copy(e[i]), this.closeLine = !1, i += 1;
        break;
      case b.kQuad:
        t[0] = this.lastPoint.clone(), t[1] = f.fromPoint(e[i]), t[2] = f.fromPoint(e[i + 1]), this.lastPoint.copy(e[i + 1]), i += 2;
        break;
      case b.kCubic:
        t[0] = this.lastPoint.clone(), t[1] = f.fromPoint(e[i]), t[2] = f.fromPoint(e[i + 1]), t[3] = f.fromPoint(e[i + 2]), this.lastPoint.copy(e[i + 2]), i += 3;
        break;
      case b.kClose:
        n = this.autoClose(t), n == R.kLineTo ? this.verbIndex-- : this.needClose = !1, this.lastPoint.copy(this.movePoint);
        break;
    }
    return this.pointIndex = i, n;
  }
}
function Xi(s, t, e) {
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
      let o = (r + n) / 2, a = G(i[0], i[1], o), u = G(i[1], i[2], o), h = G(i[2], i[3], o), c = G(a, u, o), m = G(u, h, o), y = G(c, m, o);
      if (y == 0)
        return e.value = o, !0;
      y < 0 ? n = o : r = o;
    } while (!(j(r - n) <= l));
    return e.value = (n + r) / 2, !0;
  }
}
function z(s, t, e) {
  return (s - t) * (e - t) <= 0;
}
function xe(s, t, e, i) {
  return e.y == i.y ? z(e.x, s, i.x) && s != i.x : s == e.x && t == e.y;
}
function an(s) {
  return s < 0 ? -1 : +(s > 0);
}
function un(s, t, e, i) {
  let n = s[0].x, r = s[0].y, l = s[1].x, o = s[1].y, a = o - r, u = 1;
  if (r > o) {
    let c = r;
    r = o, o = c, u = -1;
  }
  if (e < r || e > o)
    return 0;
  if (xe(t, e, s[0], s[1]))
    return i.value += 1, 0;
  if (e == o)
    return 0;
  let h = (l - n) * (e - s[0].y) - a * (t - n);
  return h ? an(h) == u && (u = 0) : ((t != l || e != s[1].y) && (i.value += 1), u = 0), u;
}
function ji(s, t, e) {
  return s == t ? !0 : s < t ? t <= e : t >= e;
}
function ke(s, t, e, i) {
  return (s * i + t) * i + e;
}
function hn(s, t, e, i, n) {
  return ((s * n + t) * n + e) * n + i;
}
function xi(s, t, e, i) {
  let n = s[0].y, r = s[2].y, l = 1;
  if (n > r) {
    let h = n;
    n = r, r = h, l = -1;
  }
  if (e < n || e > r)
    return 0;
  if (xe(t, e, s[0], s[2]))
    return i.value += 1, 0;
  if (e == r)
    return 0;
  let o = L.from([0, 0]), a = lt(
    s[0].y - 2 * s[1].y + s[2].y,
    2 * (s[1].y - s[0].y),
    s[0].y - e,
    o
  ), u;
  if (a == 0)
    u = s[1 - l].x;
  else {
    let h = o.get(0), c = s[0].x, m = s[2].x - 2 * s[1].x + c, y = 2 * (s[1].x - c);
    u = ke(m, y, c, h);
  }
  return U(u, t) && (t != s[2].x || e != s[2].y) ? (i.value += 1, 0) : u < t ? l : 0;
}
function fn(s, t, e, i) {
  let n, r;
  n = r = t[0].x;
  for (let l = 1; l < s; ++l)
    n = Math.min(n, t[l].x), r = Math.max(r, t[l].x);
  e.value = n, i.value = r;
}
function Zi(s, t, e, i, n) {
  let r = i + 3 * (t - e) - s, l = 3 * (e - t - t + s), o = 3 * (t - s);
  return hn(r, l, o, s, n);
}
function cn(s, t, e, i) {
  let n = s[0].y, r = s[3].y, l = 1;
  if (n > r) {
    let c = n;
    n = r, r = c, l = -1;
  }
  if (e < n || e > r)
    return 0;
  if (xe(t, e, s[0], s[3]))
    return i.value += 1, 0;
  if (e == r)
    return 0;
  let o = E.from(0), a = E.from(0);
  if (fn(4, s, o, a), t < o.value)
    return 0;
  if (t > a.value)
    return l;
  let u = E.from(0);
  if (!Xi(s, e, u))
    return 0;
  let h = Zi(s[0].x, s[1].x, s[2].x, s[3].x, u.value);
  return U(h, t) && (t != s[3].x || e != s[3].y) ? (i.value += 1, 0) : h < t ? l : 0;
}
function mn(s, t, e, i) {
  let n = Array.from({ length: 5 }, () => f.default()), r = 0;
  ji(s[0].y, s[1].y, s[2].y) || (r = Qs(s, n), s = n);
  let l = xi(s, t, e, i);
  return r > 0 && (l += xi(s.slice(2), t, e, i)), l;
}
function yn(s, t, e, i) {
  let n = Array.from({ length: 10 }, () => f.default()), r = Yi(s, n), l = 0;
  for (let o = 0; o <= r; ++o)
    l += cn(n.slice(o * 3), t, e, i);
  return l;
}
function Ui(s, t, e) {
  let i = s[1] * t, n = s[0], r = s[2] - 2 * i + n, l = 2 * (i - n);
  return ke(r, l, n, e);
}
function Hi(s, t) {
  let e = 2 * (s - 1), i = 1, n = -e;
  return ke(n, e, i, t);
}
function ki(s, t, e, i) {
  const n = s.fPts;
  let r = n[0].y, l = n[2].y, o = 1;
  if (r > l) {
    let p = r;
    r = l, l = p, o = -1;
  }
  if (e < r || e > l)
    return 0;
  if (xe(t, e, n[0], n[2]))
    return i.value += 1, 0;
  if (e == l)
    return 0;
  let a = L.from([0, 0]), u = n[2].y, h = n[1].y * s.fW - e * s.fW + e, c = n[0].y;
  u += c - 2 * h, h -= c, c -= e;
  let m = lt(u, 2 * h, c, a), y = 0;
  if (m == 0)
    y = n[1 - o].x;
  else {
    let p = a.get(0);
    y = Ui(n.map((x) => x.x), s.fW, p) / Hi(s.fW, p);
  }
  return U(y, t) && (t != n[2].x || e != n[2].y) ? (i.value += 1, 0) : y < t ? o : 0;
}
function Kr(s, t, e, i, n) {
  let r = new W(s, i), l = [W.default(), W.default()], o = ji(s[0].y, s[1].y, s[2].y) || !r.chopAtYExtrema(l), a = ki(o ? r : l[0], t, e, n);
  return o || (a += ki(l[1], t, e, n)), a;
}
function dn(s, t, e, i) {
  let n = s[0].y, r = s[1].y;
  if (!z(n, e, r))
    return;
  let l = s[0].x, o = s[1].x;
  if (!z(l, t, o))
    return;
  let a = o - l, u = r - n;
  if (!U((t - l) * u, a * (e - n)))
    return;
  let h = f.default();
  h.set(a, u), i.push(h);
}
function pn(s, t, e, i) {
  if (!z(s[0].y, e, s[1].y) && !z(s[1].y, e, s[2].y) || !z(s[0].x, t, s[1].x) && !z(s[1].x, t, s[2].x))
    return;
  let n = L.from([0, 0]), r = lt(
    s[0].y - 2 * s[1].y + s[2].y,
    2 * (s[1].y - s[0].y),
    s[0].y - e,
    n
  );
  for (let l = 0; l < r; ++l) {
    let o = n.get(l), a = s[0].x, u = s[2].x - 2 * s[1].x + a, h = 2 * (s[1].x - a), c = ke(u, h, a, o);
    U(t, c) && i.push(Oe(s, o));
  }
}
function xn(s, t, e, i) {
  if (!z(s[0].y, e, s[1].y) && !z(s[1].y, e, s[2].y) && !z(s[2].y, e, s[3].y) || !z(s[0].x, t, s[1].x) && !z(s[1].x, t, s[2].x) && !z(s[2].x, t, s[3].x))
    return;
  let n = Array.from({ length: 10 }, () => f.default()), r = Yi(s, n);
  for (let l = 0; l <= r; ++l) {
    let o = n.slice(l * 3), a = E.from(0);
    if (!Xi(o, e, a))
      continue;
    let u = Zi(o[0].x, o[1].x, o[2].x, o[3].x, a.value);
    if (!U(t, u))
      continue;
    let h = f.default();
    Xe(o, a.value, null, h, null), i.push(h);
  }
}
function Jr(s, t, e, i, n) {
  if (!z(s[0].y, e, s[1].y) && !z(s[1].y, e, s[2].y) || !z(s[0].y, t, s[1].y) && !z(s[1].y, t, s[2].y))
    return;
  let r = L.from([0, 0]), l = s[2].y, o = s[1].y * i - e * i + e, a = s[0].y;
  l += a - 2 * o, o -= a, a -= e;
  let u = lt(l, 2 * o, a, r);
  for (let h = 0; h < u; ++h) {
    let c = r.get(h), m = Ui(s.map((p) => p.y), i, c) / Hi(i, c);
    if (!U(t, m))
      continue;
    let y = new W(s, i);
    n.push(y.evalTangentAt(c));
  }
}
var Ki = /* @__PURE__ */ ((s) => (s[s.kIsA_JustMoves = 0] = "kIsA_JustMoves", s[s.kIsA_MoreThanMoves = 1] = "kIsA_MoreThanMoves", s[s.kIsA_Oval = 2] = "kIsA_Oval", s[s.kIsA_RRect = 3] = "kIsA_RRect", s))(Ki || {});
function bi(s, t) {
  return U(s.x, t.x) && U(s.y, t.y);
}
function gi(s, t, e, i, n) {
  let r = s * Math.PI / 180, l = (s + t) * Math.PI / 180;
  if (e.y = se(r), e.x = ne(r), i.y = se(l), i.x = ne(l), e.equals(i)) {
    let o = Math.abs(t);
    if (o < 360 && o > 359) {
      let a = cs(1953125e-9, t);
      do
        l -= a, i.y = se(l), i.x = ne(l);
      while (e.equals(i));
    }
  }
  n.value = t > 0 ? Yt.kCW_SkRotationDirection : Yt.kCCW_SkRotationDirection;
}
function _i(s, t, e, i) {
  return e == 0 && (t == 0 || t == 360) ? (i.set(s.right, s.centerX), !0) : s.width == 0 && s.height == 0 ? (i.set(s.right, s.top), !0) : !1;
}
function vi(s, t, e, i, n, r) {
  let l = ut.fromScale($(s.width), $(s.height));
  l.postTranslate(s.centerX, s.centerY);
  let o = W.BuildUnitArc(t, e, i, l, n);
  return o == 0 && l.mapXY(e.x, e.y, r), o;
}
const pe = class pe {
  constructor() {
    d(this, "fPts", []);
    d(this, "fVerbs", []);
    d(this, "fConicWeights", []);
    d(this, "fFillType", pt.kWinding);
    d(this, "fIsVolatile", !1);
    d(this, "fSegmentMask", it.kLine_SkPathSegmentMask);
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
    return ln(this.getFillType());
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
    return pe.default().copy(this);
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
      let u = n[--i];
      switch (l -= Ti(u), u) {
        case b.kMove:
          return this;
        case b.kLine:
          this.lineTo(r[l]);
          break;
        case b.kQuad:
          this.quadTo(r[l + 1], r[l]);
          break;
        case b.kConic:
          this.conicTo(r[l + 1], r[l], o[--a]);
          break;
        case b.kCubic:
          this.cubicTo(r[l + 2], r[l + 1], r[l]);
          break;
        case b.kClose:
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
    let a = t.fConicWeights.length, u = !0, h = !1;
    for (; i > e; ) {
      let c = n[--i], m = Ti(c);
      switch (u && (--l, this.moveTo(r[l]), u = !1), l -= m, c) {
        case b.kMove:
          h && (this.close(), h = !1), u = !0, l += 1;
          break;
        case b.kLine:
          this.lineTo(r[l]);
          break;
        case b.kQuad:
          this.quadTo(r[l + 1], r[l]);
          break;
        case b.kConic:
          this.conicTo(r[l + 1], r[l], o[--a]);
          break;
        case b.kCubic:
          this.cubicTo(r[l + 2], r[l + 1], r[l]);
          break;
        case b.kClose:
          h = !0;
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
        return this.setFillType(pt.kEvenOdd);
      case "nonzero":
        return this.setFillType(pt.kWinding);
    }
    return this;
  }
  setIsVolatile(t) {
    return this.fIsVolatile = t, this;
  }
  reset() {
    this.fPts = [], this.fVerbs = [], this.fConicWeights = [], this.fFillType = pt.kWinding, this.fIsVolatile = !1, this.fSegmentMask = 0, this.fLastMovePoint = f.zero(), this.fLastMoveIndex = -1, this.fNeedsMoveVerb = !0, this.fSegmentMask = it.kLine_SkPathSegmentMask;
  }
  moveTo(t, e) {
    let i = typeof t == "number" ? f.create(t, e) : t;
    return this.fLastMoveIndex = this.fPts.length, this.fPts.push(i), this.fVerbs.push(b.kMove), this.fLastMovePoint.copy(i), this.fNeedsMoveVerb = !1, this;
  }
  lineTo(t, e) {
    let i = typeof t == "number" ? f.create(t, e) : t;
    return this.ensureMove(), this.fPts.push(i), this.fVerbs.push(b.kLine), this.fSegmentMask |= it.kLine_SkPathSegmentMask, this;
  }
  quadTo(t, e, i, n) {
    let r = typeof t == "number" ? f.create(t, e) : t, l = typeof e == "number" ? f.create(i, n) : e;
    return this.ensureMove(), this.fPts.push(r), this.fPts.push(l), this.fVerbs.push(b.kQuad), this.fSegmentMask |= it.kQuad_SkPathSegmentMask, this;
  }
  conicTo(t, e, i, n, r) {
    let l = typeof t == "number" ? f.create(t, e) : t, o = typeof e == "number" ? f.create(i, n) : e, a = typeof t == "number" ? r : i;
    if (!(a > 0))
      this.lineTo(l);
    else if (!Vt(a))
      this.lineTo(l), this.lineTo(o);
    else if (V == r)
      this.quadTo(l, o);
    else {
      this.ensureMove();
      let u = this.lastPoint;
      const h = 4 * a / (3 * (1 + a));
      let c = u.x + (l.x - u.x) * h, m = u.y + (l.y - u.y) * h, y = o.x + (l.x - o.x) * h, p = o.y + (l.y - o.y) * h;
      this.cubicTo(c, m, y, p, o.x, o.y);
    }
    return this.fSegmentMask |= it.kConic_SkPathSegmentMask, this;
  }
  cubicTo(t, e, i, n, r, l) {
    this.ensureMove();
    let o = typeof t == "number" ? f.create(t, e) : t, a = typeof e == "number" ? f.create(i, n) : e, u = typeof i == "number" ? f.create(r, l) : i;
    return this.fPts.push(o), this.fPts.push(a), this.fPts.push(u), this.fVerbs.push(b.kCubic), this.fSegmentMask |= it.kCubic_SkPathSegmentMask, this;
  }
  close() {
    return this.fVerbs.length > 0 && (this.ensureMove(), this.fVerbs.push(b.kClose), this.fNeedsMoveVerb = !0), this;
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
        this.fPts.push(t[i]), this.fVerbs.push(b.kLine);
      this.fSegmentMask |= it.kLine_SkPathSegmentMask;
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
    if (_i(t, e, i, l))
      return n ? this.moveTo(l) : this.lineTo(l);
    let o = f.default(), a = f.default(), u = E.from(Yt.kCW_SkRotationDirection);
    gi(e, i, o, a, u);
    let h = f.default(), c = (p) => {
      n ? this.moveTo(p) : bi(this.lastPoint, p) || this.lineTo(p);
    };
    if (o.equals(a)) {
      let p = ri(e + i), x = t.width / 2, g = t.height / 2;
      return h.set(
        t.centerX + x * kt(p),
        t.centerY + g * Ne(p)
      ), c(h), this;
    }
    let m = W.make(5), y = vi(t, o, a, u.value, m, h);
    if (y) {
      const p = m[0].fPts[0];
      c(p);
      for (let x = 0; x < y; ++x)
        this.conicTo(m[x].fPts[1], m[x].fPts[2], m[x].fW);
    } else
      c(h);
    return this;
  }
  arcTo(t, e, i, n, r) {
    const l = arguments.length, o = this.fVerbs, a = this.fPts;
    if (l === 3) {
      const u = t, h = e, c = i;
      if (this.ensureMove(), c == 0)
        return this.lineTo(u);
      let m = this.lastPoint, y = f.create(u.x - m.x, u.y - m.y).toNormalize(), p = f.create(h.x - u.x, h.y - u.y).toNormalize(), x = y.dot(p), g = y.cross(p);
      if (!y.isFinite() || !p.isFinite() || rt(ie(g)))
        return this.lineTo(u);
      let k = j(ie(c * (1 - x) / g)), _ = u.x - k * y.x, v = u.y - k * y.y, M = f.create(p.x, p.y);
      M.setLength(k), this.lineTo(_, v);
      let P = H(ie(xt + x * 0.5));
      return this.conicTo(u, u.clone().add(M), P);
    } else if (l === 4) {
      let u = t, h = e, c = i, m = n;
      if (u.width < 0 || u.height < 0)
        return this;
      o.length <= 0 && (m = !0);
      let y = f.default();
      if (_i(u, h, c, y))
        return m ? this.moveTo(y) : this.lineTo(y);
      let p = f.default(), x = f.default(), g = E.from(Yt.kCW_SkRotationDirection);
      gi(h, c, p, x, g);
      let k = f.default(), _ = (P) => {
        m ? this.moveTo(P) : bi(a[this.fPts.length - 1], P) || this.lineTo(P);
      };
      if (p.equalsEpsilon(x)) {
        let P = ri(h + c), N = u.width / 2, A = u.height / 2;
        return k.set(
          u.centerX + N * kt(P),
          u.centerY + A * Ne(P)
        ), _(k), this;
      }
      let v = W.make(Ls), M = vi(u, p, x, g.value, v, k);
      if (M) {
        const P = v[0].fPts[0];
        _(P);
        for (let N = 0; N < M; ++N)
          this.conicTo(v[N].fPts[1], v[N].fPts[2], v[N].fW);
      } else
        _(k);
      return this;
    } else {
      let u = t, h = e, c = i, m = n, y = r;
      this.ensureMove();
      let p = [this.lastPoint.clone(), y];
      if (!u.x || !u.y)
        return this.lineTo(y);
      if (p[0] == p[1])
        return this.lineTo(y);
      let x = j(u.x), g = j(u.y), k = p[0].clone().subtract(p[1]);
      k.multiplyScalar(0.5);
      let _ = ut.identity();
      _.setRotate(-h);
      let v = f.default();
      _.mapPoints([v], [k]);
      let M = x * x, P = g * g, N = v.x * v.x, A = v.y * v.y, w = N / M + A / P;
      w > 1 && (w = H(w), x *= w, g *= w), _.setScale(1 / x, 1 / g), _.preRotate(-h);
      let C = [f.default(), f.default()];
      _.mapPoints(C, p);
      let B = C[1].clone().subtract(C[0]), tt = B.x * B.x + B.y * B.y, ht = Math.max(1 / tt - 0.25, 0), et = H(ht);
      m == F.kCCW != !!c && (et = -et), B.multiplyScalar(et);
      let J = C[0].clone().add(C[1]);
      J.multiplyScalar(0.5), J.translate(-B.y, B.x), C[0].subtract(J), C[1].subtract(J);
      let Et = si(C[0].y, C[0].x), Y = si(C[1].y, C[1].x) - Et;
      if (Y < 0 && m == F.kCW ? Y += st * 2 : Y > 0 && m != F.kCW && (Y -= st * 2), j(Y) < st / (1e3 * 1e3))
        return this.lineTo(y);
      _.setRotate(h), _.preScale(x, g);
      let Lt = Ss(j(Y / (2 * st / 3))), Ot = Y / Lt, _e = Rs(0.5 * Ot);
      if (!Vt(_e))
        return this;
      let Je = Et, rs = H(xt + kt(Ot) * xt), Dt = (At) => At == Wi(At), ls = rt(st / 2 - j(Ot)) && Dt(x) && Dt(g) && Dt(y.x) && Dt(y.y);
      for (let At = 0; At < Lt; ++At) {
        let ve = Je + Ot, $e = se(ve), Ge = ne(ve);
        C[1].set(Ge, $e), C[1].add(J), C[0].copy(C[1]), C[0].translate(_e * $e, -_e * Ge);
        let Xt = [f.default(), f.default()];
        if (_.mapPoints(Xt, C), ls)
          for (let jt of Xt)
            jt.x = Te(jt.x), jt.y = Te(jt.y);
        this.conicTo(Xt[0], Xt[1], rs), Je = ve;
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
    const n = Ms(360);
    if (i >= n || i <= -n) {
      let r = e / 90, l = Te(r), o = r - l;
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
  addRect(t, e = F.kCW, i = 0) {
    let n = new Ie(t, e, i);
    return this.moveTo(n.current), this.lineTo(n.next()), this.lineTo(n.next()), this.lineTo(n.next()), this.close();
  }
  addOval(t, e = F.kCW, i = 0) {
    const n = this.fIsA;
    let r = new kn(t, e, i), l = new Ie(t, e, i + (e == F.kCW ? 0 : 1));
    this.moveTo(r.current);
    for (let o = 0; o < 4; ++o)
      this.conicTo(l.next(), r.next(), Ae);
    return this.close(), n == 0 && (this.fIsA = 2, this.fIsACCW = e == F.kCCW, this.fIsAStart = i % 4), this;
  }
  addRRect(t, e = F.kCW, i = e == F.kCW ? 6 : 7) {
    const n = this.fIsA, r = t.getBounds();
    if (t.isRect() || t.isEmpty())
      this.addRect(r, e, (i + 1) / 2);
    else if (t.isOval())
      this.addOval(r, e, i / 2);
    else {
      const l = (i & 1) == +(e == F.kCW), o = Ae;
      let a = new bn(t, e, i);
      const u = i / 2 + (e == F.kCW ? 0 : 1);
      let h = new Ie(r, e, u);
      if (this.moveTo(a.current), l) {
        for (let c = 0; c < 3; ++c)
          this.conicTo(h.next(), a.next(), o), this.lineTo(a.next());
        this.conicTo(h.next(), a.next(), o);
      } else
        for (let c = 0; c < 4; ++c)
          this.lineTo(a.next()), this.conicTo(h.next(), a.next(), o);
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
    if (this.getSegmentMasks() == it.kLine_SkPathSegmentMask)
      return this.getBounds();
    let t = new Array(5).fill(0).map(() => f.default()), e = f.create(1 / 0, 1 / 0), i = f.create(-1 / 0, -1 / 0), n = this.fPts, r = 0, l = 0;
    for (let a = 0; a < this.fVerbs.length; ++a) {
      let u = 0;
      switch (this.fVerbs[a]) {
        case b.kMove:
          t[0].copy(n[r]), r += 1, u = 1;
          break;
        case b.kLine:
          t[0].copy(n[r]), r += 1, u = 1;
          break;
        case b.kQuad:
          let c = [n[r - 1], n[r], n[r + 1]];
          u = tn(c, t), r += 2;
          break;
        case b.kConic:
          let m = [n[r - 1], n[r], n[r + 1]];
          u = sn(m, this.fConicWeights[l++], t);
          break;
        case b.kCubic:
          let y = [n[r - 1], n[r], n[r + 1], n[r + 2]];
          u = en(y, t), r += 3;
          break;
        case b.kClose:
          break;
      }
      for (let c = 0; c < u; ++c) {
        let m = t[c];
        e.min(m), i.max(m);
      }
    }
    let o = q.makeEmpty();
    return o.setLTRB(e.x, e.y, i.x, i.y), o;
  }
  contains(t, e, i = "nonzero") {
    return this.setCanvasFillType(i), gn(t, e, this);
  }
  addPath(t) {
    for (let { type: e, p0: i, p1: n, p2: r, p3: l } of t)
      switch (e) {
        case b.kMove:
          this.moveTo(i);
          break;
        case b.kLine:
          this.lineTo(i);
          break;
        case b.kQuad:
          this.quadTo(n, r);
          break;
        case b.kCubic:
          this.cubicTo(n.x, n.y, r.x, r.y, l.x, l.y);
          break;
        case b.kClose:
          this.close();
          break;
      }
    return this;
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
      if (!i.equals(this.fPts[n]))
        return !1;
    return !0;
  }
  *[Symbol.iterator]() {
    let t = 0, e = f.default();
    for (let i = 0; i < this.fVerbs.length; ++i) {
      let n = this.fVerbs[i];
      switch (n) {
        case b.kMove:
          yield {
            type: n,
            p0: this.fPts[t]
          }, e.copy(this.fPts[t]), t += 1;
          break;
        case b.kLine:
          yield {
            type: n,
            p0: this.fPts[t]
          }, t += 1;
          break;
        case b.kQuad:
          yield {
            type: n,
            p0: this.fPts[t - 1],
            p1: this.fPts[t],
            p2: this.fPts[t + 1]
          }, t += 2;
          break;
        case b.kCubic:
          yield {
            type: n,
            p0: this.fPts[t - 1],
            p1: this.fPts[t],
            p2: this.fPts[t + 1],
            p3: this.fPts[t + 2]
          }, t += 3;
          break;
        case b.kClose:
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
        case b.kMove:
          t.moveTo(i.x, i.y);
          break;
        case b.kLine:
          t.lineTo(i.x, i.y);
          break;
        case b.kQuad:
          t.quadraticCurveTo(n.x, n.y, r.x, r.y);
          break;
        case b.kCubic:
          t.bezierCurveTo(n.x, n.y, r.x, r.y, l.x, l.y);
          break;
        case b.kClose:
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
        case b.kMove:
          t.push(["M", i.x, i.y]);
          break;
        case b.kLine:
          t.push(["L", i.x, i.y]);
          break;
        case b.kQuad:
          t.push(["Q", n.x, n.y, r.x, r.y]);
          break;
        case b.kCubic:
          t.push(["C", n.x, n.y, r.x, r.y, l.x, l.y]);
          break;
        case b.kClose:
          t.push(["Z"]);
          break;
      }
    return t.map((e) => e[0] + e.slice(1).join(" ")).join("");
  }
};
d(pe, "IsA", Ki);
let gt = pe;
const Ti = (s) => {
  switch (s) {
    case b.kMove:
      return 1;
    case b.kLine:
      return 1;
    case b.kConic:
    case b.kQuad:
      return 2;
    case b.kCubic:
      return 3;
    default:
      return 0;
  }
};
class je {
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
class kn extends je {
  constructor(t, e, i) {
    super(4, e, i);
    const n = t.centerX, r = t.centerY;
    this.fPts[0] = f.create(n, t.top), this.fPts[1] = f.create(t.right, r), this.fPts[2] = f.create(n, t.bottom), this.fPts[3] = f.create(t.left, r);
  }
}
class Ie extends je {
  constructor(t, e, i) {
    super(4, e, i), this.fPts[0] = f.create(t.left, t.top), this.fPts[1] = f.create(t.right, t.top), this.fPts[2] = f.create(t.right, t.bottom), this.fPts[3] = f.create(t.left, t.bottom);
  }
}
class bn extends je {
  constructor(t, e, i) {
    super(8, e, i);
    const n = t.getBounds(), r = n.left, l = n.top, o = n.right, a = n.bottom, u = t.fRadii, h = dt.Corner.kUpperLeft_Corner, c = dt.Corner.kUpperRight_Corner, m = dt.Corner.kLowerRight_Corner, y = dt.Corner.kLowerLeft_Corner;
    this.fPts[0] = f.create(r + u[h].x, l), this.fPts[1] = f.create(o - u[c].x, l), this.fPts[2] = f.create(o, l + u[c].y), this.fPts[3] = f.create(o, a - u[m].y), this.fPts[4] = f.create(o - u[m].x, a), this.fPts[5] = f.create(r + u[y].x, a), this.fPts[6] = f.create(r, a - u[y].y), this.fPts[7] = f.create(r, l + u[h].y);
  }
}
function gn(s, t, e) {
  const i = e.getFillType();
  let n = e.isInverseFillType();
  if (e.countVerbs() <= 0 || !e.getBounds().containPoint(s, t))
    return n;
  let l = new on(e, !0), o = !1, a = 0, u = E.from(0), h = [f.default(), f.default(), f.default(), f.default()];
  do
    switch (l.next(h)) {
      case R.kMoveTo:
      case R.kClose:
        break;
      case R.kLineTo:
        a += un(h, s, t, u);
        break;
      case R.kQuadCurveTo:
        a += mn(h, s, t, u);
        break;
      case R.kConicTo:
        break;
      case R.kCubicCurveTo:
        a += yn(h, s, t, u);
        break;
      case R.kDone:
        o = !0;
        break;
    }
  while (!o);
  let c = pt.kEvenOdd == i || pt.kInverseEvenOdd == i;
  if (c && (a &= 1), a)
    return !n;
  if (u.value <= 1)
    return !!(Number(u.value) ^ Number(n));
  if (u.value & 1 || c)
    return !!(Number(u.value & 1) ^ Number(n));
  l.setPath(e, !0), o = !1;
  let m = [];
  do {
    let y = m.length;
    switch (l.next(h)) {
      case R.kMoveTo:
      case R.kClose:
        break;
      case R.kLineTo:
        dn(h, s, t, m);
        break;
      case R.kQuadCurveTo:
        pn(h, s, t, m);
        break;
      case R.kConicTo:
        break;
      case R.kCubicCurveTo:
        xn(h, s, t, m);
        break;
      case R.kDone:
        o = !0;
        break;
    }
    if (m.length > y) {
      let p = m.length - 1;
      const x = m[p];
      if (rt(x.dot(x)))
        m.splice(p, 1);
      else
        for (let g = 0; g < p; ++g) {
          const k = m[g];
          if (rt(k.cross(x)) && li(x.x * k.x) <= 0 && li(x.y * k.y) <= 0) {
            m.splice(p, 1), m.splice(g, 1, m[m.length]);
            break;
          }
        }
    }
  } while (!o);
  return Number(m.length ^ Number(n));
}
var _n = /* @__PURE__ */ ((s) => (s.Miter = "miter", s.Round = "round", s.Bevel = "bevel", s.MiterClip = "miter-clip", s))(_n || {}), vn = /* @__PURE__ */ ((s) => (s.Butt = "butt", s.Round = "round", s.Square = "square", s))(vn || {}), Tn = /* @__PURE__ */ ((s) => (s.NonZero = "nonzero", s.EvenOdd = "evenodd", s))(Tn || {});
class be {
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
  canNext() {
    return this.verbIndex < this.path.fVerbs.length;
  }
  copy(t) {
    return this.isAutoClose = t.isAutoClose, this.verbIndex = t.verbIndex, this.pointsIndex = t.pointsIndex, this.lastMoveTo.copy(t.lastMoveTo), this.lastPoint.copy(t.lastPoint), this;
  }
  clone() {
    return new be({
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
        case b.kMove:
          this.pointsIndex += 1, i = t[this.pointsIndex - 1], this.lastMoveTo.copy(i), this.lastPoint.copy(this.lastMoveTo), yield { type: n, p0: t[this.pointsIndex - 1] };
          break;
        case b.kLine:
          this.pointsIndex += 1, this.lastPoint.copy(t[this.pointsIndex - 1]), yield { type: n, p0: t[this.pointsIndex - 1] };
          break;
        case b.kQuad:
          this.pointsIndex += 2, this.lastPoint.copy(t[this.pointsIndex - 1]), yield { type: n, p0: t[this.pointsIndex - 3], p1: t[this.pointsIndex - 2], p2: t[this.pointsIndex - 1] };
          break;
        case b.kCubic:
          this.pointsIndex += 3, this.lastPoint.copy(t[this.pointsIndex - 1]), yield { type: n, p0: t[this.pointsIndex - 4], p1: t[this.pointsIndex - 3], p2: t[this.pointsIndex - 2], p3: t[this.pointsIndex - 1] };
          break;
        case b.kClose:
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
        case b.kMove:
          return !1;
        case b.kLine: {
          if (t.lastPoint.equals(e.p0))
            continue;
          return !0;
        }
        case b.kQuad: {
          if (t.lastPoint.equals(e.p1) && t.lastPoint.equals(e.p2))
            continue;
          return !0;
        }
        case b.kCubic: {
          if (t.lastPoint.equals(e.p1) && t.lastPoint.equals(e.p2) && t.lastPoint.equals(e.p3))
            continue;
          return !0;
        }
        case b.kClose:
          return !1;
      }
    return !1;
  }
  setAutoClose(t) {
    this.isAutoClose = t;
  }
  autoClose() {
    return this.isAutoClose && !this.lastPoint.equals(this.lastMoveTo) ? (this.verbIndex -= 1, {
      type: b.kLine,
      p0: this.lastMoveTo
    }) : {
      type: b.kClose,
      p0: this.lastPoint,
      p1: this.lastMoveTo
    };
  }
}
class Mn {
  constructor(t, e) {
    this.inner = t, this.outer = e;
  }
  swap() {
    [this.inner, this.outer] = [this.outer, this.inner];
  }
}
const qe = 0.707106781, Qe = (s, t, e, i, n) => {
  n.lineTo(e.x, e.y);
}, Pn = (s, t, e, i, n) => {
  let r = t.clone();
  r.cw();
  let l = s.clone().add(r), o = l.clone().add(t);
  n.conicTo(
    o.x,
    o.y,
    l.x,
    l.y,
    qe
  ), o.copy(l).subtract(t), n.conicTo(
    o.x,
    o.y,
    e.x,
    e.y,
    qe
  );
}, Sn = (s, t, e, i, n) => {
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
function Mi(s) {
  return Math.abs(s) <= Ue;
}
function Ji(s) {
  return s >= 0 ? Mi(1 - s) ? 3 : 2 : Mi(1 + s) ? 0 : 1;
}
function Ze(s, t) {
  return s.x * t.y > s.y * t.x;
}
function ce(s, t, e) {
  e.lineTo(s.x, s.y), e.lineTo(s.x - t.x, s.y - t.y);
}
const $i = (s, t, e, i, n, r, l, o, a) => {
  function u(_, v, M, P, N, A, w, C, B, tt) {
    if (C = C.clone(), C.multiplyScalar(M), w = w.clone(), A = A.clone(), tt) {
      w.normalize();
      let ht = A.dot(w), et = A.cross(w), J = 0;
      Math.abs(et) <= Ue ? J = 1 / B : J = (1 / B - ht) / et, A.multiplyScalar(M);
      let Et = A.clone();
      Et.cw();
      let ge = C.clone();
      ge.ccw();
      let Y = f.default();
      Y.addVectors(v, A).add(Et.clone().multiplyScalar(J));
      let Lt = f.default();
      Y.addVectors(v, C).add(ge.clone().multiplyScalar(J)), P ? _.outer.setLastPoint(Y.x, Y.y) : _.outer.lineTo(Y.x, Y.y), _.outer.lineTo(Lt.x, Lt.y);
    }
    N || _.outer.lineTo(v.x + C.x, v.y + C.y), ce(v, C, _.inner);
  }
  function h(_, v, M, P, N, A, w) {
    w = w.clone(), w.multiplyScalar(M), P ? _.outer.setLastPoint(v.x + A.x, v.y + A.y) : _.outer.lineTo(v.x + A.x, v.y + A.y), N || _.outer.lineTo(v.x + w.x, v.y + w.y), ce(v, w, _.inner);
  }
  let c = s.dot(e), m = Ji(c), y = s.clone(), p = e.clone(), x = f.default();
  if (m == 3)
    return;
  if (m == 0) {
    o = !1, x.subtractVectors(p, y).multiplyScalar(i / 2), u(
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
  let g = !Ze(y, p);
  if (g && (a.swap(), y.negate(), p.negate()), c == 0 && n <= qe) {
    x.addVectors(y, p).multiplyScalar(i), h(
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
  m == 1 ? (x = f.create(p.y - y.y, y.x - p.x), g && x.negate()) : x = f.create(y.x + p.x, y.y + p.y);
  let k = Math.sqrt((1 + c) / 2);
  if (k < n) {
    o = !1, u(
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
  x.setLength(i / k), h(
    a,
    t,
    i,
    l,
    o,
    x,
    p
  );
}, Cn = (s, t, e, i, n, r, l, o) => {
  let a = e.clone().multiplyScalar(i);
  Ze(s, e) || (o.swap(), a.negate()), o.outer.lineTo(t.x + a.x, t.y + a.y), ce(t, a, o.inner);
}, Rn = (s, t, e, i, n, r, l, o) => $i(s, t, e, i, n, !1, r, l, o), In = (s, t, e, i, n, r, l, o) => {
  $i(
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
}, ze = (s, t, e, i, n, r, l, o) => {
  let a = s.dot(e);
  if (Ji(a) == 3)
    return;
  let h = s.clone(), c = e.clone(), m = F.kCW;
  Ze(h, c) || (o.swap(), h.negate(), c.negate(), m = F.kCCW);
  let y = ut.fromRows(i, 0, 0, i, t.x, t.y), p = new Array(5).fill(0).map(() => new W()), x = W.BuildUnitArc(h, c, m, y, p);
  if (x > 0) {
    p = p.slice(0, x);
    for (let g of p)
      o.outer.conicTo(g.fPts[1], g.fPts[2], g.fW);
    c.multiplyScalar(i), ce(t, c, o.inner);
  }
};
function Pi(s, t, e, i, n, r) {
  return r.setLengthFrom((t.x - s.x) * e, (t.y - s.y) * e, 1) ? (r.ccw(), n.copy(r).multiplyScalar(i), !0) : !1;
}
function wn(s, t, e, i) {
  return i.setLengthFrom(s.x, s.y, 1) ? (i.ccw(), e.copy(i).multiplyScalar(t), !0) : !1;
}
class te {
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
function En(s) {
  let t = nt(s[1].clone().sub(s[0])), e = nt(s[2].clone().sub(s[1]));
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
  if (!Ln(s))
    return [
      f.default(),
      2
      /* Quad */
    ];
  let i = zs(s);
  return i == 0 || i == 1 ? [
    f.default(),
    1
    /* Line */
  ] : [
    bt(s, i),
    3
    /* Degenerate */
  ];
}
function nt(s) {
  return +!s.canNormalize();
}
function Ln(s) {
  let t = -1, e = 0, i = 0;
  for (let o = 0; o < 2; o++)
    for (let a = o + 1; a < 3; a++) {
      let u = s[a].clone().sub(s[o]), h = Math.max(Math.abs(u.x), Math.abs(u.y));
      t < h && (e = o, i = a, t = h);
    }
  console.assert(e <= 1), console.assert(i >= 1 && i <= 2), console.assert(e < i);
  let n = e ^ i ^ 3, l = t * t * 5e-6;
  return wt(s[n], s[e], s[i]) <= l;
}
function wt(s, t, e) {
  let i = e.clone().sub(t), n = s.clone().sub(t), r = i.dot(n), l = i.dot(i), o = r / l;
  return o >= 0 && o <= 1 ? f.create(
    t.x * (1 - o) + e.x * o,
    t.y * (1 - o) + e.y * o
  ).distanceToSquared(s) : s.distanceToSquared(t);
}
function An(s, t, e) {
  let i = s[1].clone().sub(s[0]), n = [0, 0, 0];
  for (let u = 0; u < 3; u++)
    n[u] = (t[u].y - s[0].y) * i.x - (t[u].x - s[0].x) * i.y;
  let r = n[2], l = n[1], o = n[0];
  r += o - 2 * l, l -= o;
  let a = lt(r, 2 * l, o, L.from(e));
  return e.slice(0, a);
}
function we(s, t, e) {
  return s.distanceToSquared(t) <= e * e;
}
function Si(s) {
  let t = s[1].clone().sub(s[0]), e = s[1].clone().sub(s[2]), i = t.lengthSquared(), n = e.lengthSquared();
  return i > n && ([t, e] = [e, t], n = i), t.setLength(n) ? t.dot(e) > 0 : !1;
}
function Nn(s, t, e) {
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
function Wn(s, t, e) {
  let i = nt(s[1].clone().sub(s[0])), n = nt(s[2].clone().sub(s[1])), r = nt(s[3].clone().sub(s[2]));
  if (i & n & r)
    return 0;
  if (i + n + r == 2)
    return 1;
  if (!Fn(s))
    return e && (i ? e.copy(s[2]) : e.copy(s[1])), 2;
  let l = [0, 0, 0], o = Oi(s, l), a = 0;
  l = l.slice(0, o);
  for (let u of l) {
    if (0 >= u || u >= 1)
      continue;
    let h = ue(s, u);
    t[a] = f.create(h.x, h.y), !t[a].equals(s[0]) && !t[a].equals(s[3]) && (a += 1);
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
function Fn(s) {
  let t = -1, e = 0, i = 0;
  for (let o = 0; o < 3; o++)
    for (let a = o + 1; a < 4; a++) {
      let u = s[a].clone().sub(s[o]), h = Math.max(Math.abs(u.x), Math.abs(u.y));
      t < h && (e = o, i = a, t = h);
    }
  let n = 1 + (2 >> i) >> e, r = e ^ i ^ n, l = t * t * 1e-5;
  return wt(s[n], s[e], s[i]) <= l && wt(s[r], s[e], s[i]) <= l;
}
const qn = {
  bevel: Cn,
  miter: Rn,
  "miter-clip": In,
  round: ze
}, Qn = {
  butt: Qe,
  round: Pn,
  square: Sn
}, zn = 3, Ci = [15, 78, 33, 33], Ue = 1 / 4096;
class $r {
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
    d(this, "inner", gt.default());
    d(this, "outer", gt.default());
    d(this, "cusper", gt.default());
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
    return new Mn(this.inner, this.outer);
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
    if (!Pi(
      r.prev_pt,
      t,
      r.res_scale,
      r.radius,
      i,
      n
    )) {
      if (r.capper === Qe)
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
    if (i.recursion_depth += 1, i.recursion_depth > Ci[zn])
      return !1;
    let r = te.default();
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
    let l = this, o = bt(t, e);
    i.set(o.x, o.y), o = Oe(t, e);
    let a = f.create(o.x, o.y);
    a.isZero() && (a = t[2].sub(t[0])), l.setRayPoints(i, a, n, r);
  }
  strokeCloseEnough(t, e, i) {
    const n = this;
    let l = bt(t, 0.5);
    if (we(e[0], f.create(l.x, l.y), n.inv_res_scale))
      return Si(i.quad) ? 0 : 2;
    if (!Nn(t, e[0], n.inv_res_scale))
      return 0;
    let o = new Array(3).fill(0.5);
    if (o = An(e, t, o), o.length != 1)
      return 0;
    let a = bt(t, o[0]), u = n.inv_res_scale * (1 - Math.abs(o[0] - 0.5) * 2);
    return we(e[0], f.create(a.x, a.y), u) ? Si(i.quad) ? 0 : 2 : 0;
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
    let u = n.clone().sub(r), h = o.cross(u), c = l.cross(u);
    if (h >= 0 == c >= 0) {
      let y = wt(n, r, e.tangent_end), p = wt(r, n, e.tangent_start);
      return Math.max(y, p) <= i.inv_res_scale_squared ? 1 : 0;
    }
    return h /= a, h > h - 1 ? (t == 0 && (e.quad[1].x = n.x * (1 - h) + e.tangent_start.x * h, e.quad[1].y = n.y * (1 - h) + e.tangent_start.y * h), 2) : (e.opposite_tangents = l.dot(o) < 0, 1);
  }
  addDegenerateLine(t) {
    const e = this;
    e.stroke_type == 1 ? e.outer.lineTo(t.quad[2].x, t.quad[2].y) : e.inner.lineTo(t.quad[2].x, t.quad[2].y);
  }
  setCubicEndNormal(t, e, i, n, r) {
    let l = this, o = t[1].clone().sub(t[0]), a = t[3].clone().sub(t[2]), u = nt(o), h = nt(a);
    if (u && h) {
      n.copy(e), r.copy(i);
      return;
    }
    if (u && (o = t[2].clone().sub(t[0]), u = nt(o)), h && (a = t[3].clone().sub(t[1]), h = nt(a)), u || h) {
      n.copy(e), r.copy(i);
      return;
    }
    return wn(a, l.radius, n, r);
  }
  lineTo(t, e) {
    const i = this;
    let n = i.prev_pt.equalsEpsilon(t, Ue * i.inv_res_scale);
    if (i.capper, Qe && n || n && (i.join_completed || e && e.hasValidTangent()))
      return;
    let r = f.default(), l = f.default();
    i.preJoinTo(t, !0, r, l) && (i.outer.lineTo(t.x + r.x, t.y + r.y), i.inner.lineTo(t.x - r.x, t.y - r.y), i.postJoinTo(t, r, l));
  }
  quadraticCurveTo(t, e) {
    const i = this;
    let n = [i.prev_pt, t, e], [r, l] = En(n);
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
      i.joiner = ze, i.lineTo(e), i.joiner = y;
      return;
    }
    let o = f.default(), a = f.default(), u = f.default(), h = f.default();
    if (!i.preJoinTo(t, !1, o, a)) {
      i.lineTo(e);
      return;
    }
    let c = te.default();
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
    ), i.quadStroke(n, c), Pi(
      n[1],
      n[2],
      i.res_scale,
      i.radius,
      u,
      h
    ) || (u = o, h = a), i.postJoinTo(e, u, h);
  }
  bezierCurveTo(t, e, i) {
    const n = this;
    let r = [n.prev_pt, t, e, i], l = Array.from({ length: 3 }, () => f.zero()), o = f.zero(), a = Wn(r, l, o);
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
      let k = n.joiner;
      n.joiner = ze, 4 <= a && n.lineTo(l[1]), a == 5 && n.lineTo(l[2]), n.lineTo(i), n.joiner = k;
      return;
    }
    let u = f.zero(), h = f.zero(), c = f.zero(), m = f.zero();
    if (!n.preJoinTo(o, !1, u, h)) {
      n.lineTo(i);
      return;
    }
    let y = new Array(3).fill(0.5), p = Ds(r, y);
    y = y.slice(0, p);
    let x = 0;
    for (let k = 0, _ = y.length; k <= _; k++) {
      let v = Number.isFinite(y[k]) ? y[k] : 1, M = te.default();
      n.initQuad(1, x, v, M), n.cubicStroke(r, M), n.initQuad(-1, x, v, M), n.cubicStroke(r, M), x = v;
    }
    let g = Ks(r);
    if (g) {
      let k = ue(r, g);
      n.cusper.addCircle(k.x, k.y, n.radius);
    }
    n.setCubicEndNormal(r, u, h, c, m), n.postJoinTo(i, c, m);
  }
  cubicStroke(t, e) {
    const i = this;
    if (!i.found_tangents) {
      let r = i.tangentsMeet(t, e);
      if (r != 2) {
        let l = we(
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
    if (!Number.isFinite(e.quad[2].x) || !Number.isFinite(e.quad[2].x) || (i.recursion_depth += 1, i.recursion_depth > Ci[Number(i.found_tangents)]))
      return !1;
    let n = te.default();
    return n.initWithStart(e) ? i.cubicStroke(t, n) ? n.initWithEnd(e) ? i.cubicStroke(t, n) ? (i.recursion_depth -= 1, !0) : !1 : (i.addDegenerateLine(e), i.recursion_depth -= 1, !0) : !1 : (i.addDegenerateLine(e), i.recursion_depth -= 1, !0);
  }
  cubicMidOnLine(t, e) {
    let i = this, n = f.zero();
    return i.cubicQuadMid(t, e, n), wt(n, e.quad[0], e.quad[2]) < i.inv_res_scale_squared;
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
    i.copy(ue(t, e));
    let o = zi(t, e), a = Array.from({ length: 7 }, () => f.zero());
    if (o.x == 0 && o.y == 0) {
      let u = t;
      rt(e) ? o = t[2].clone().sub(t[0]) : rt(1 - e) ? o = t[3].clone().sub(t[1]) : (at(t, a, e), o = a[3].clone().sub(a[2]), o.x == 0 && o.y == 0 && (o = a[3].clone().sub(a[1]), u = a)), o.x == 0 && o.y == 0 && (o = u[3].clone().sub(u[0]));
    }
    l.setRayPoints(i, o, n, r);
  }
  stroke(t, e) {
    return this.strokeInner(t, e.strokeWidth, e.miterLimit ?? 10, e.lineCap ?? "butt", e.lineJoin ?? "miter", this.res_scale);
  }
  strokeInner(t, e, i, n, r, l) {
    const o = this;
    let a = 0;
    r == "miter" && (i <= 1 ? r = "bevel" : a = 1 / i), r == "miter-clip" && (a = 1 / i), o.res_scale = l, o.inv_res_scale = 1 / (l * 4), o.inv_res_scale_squared = o.inv_res_scale ** 2, o.radius = e * 0.5, o.inv_miter_limit = a, o.first_normal = f.default(), o.prev_normal = f.default(), o.first_unit_normal = f.default(), o.prev_unit_normal = f.default(), o.first_pt = f.default(), o.prev_pt = f.default(), o.first_outer_pt = f.default(), o.first_outer_pt_index_in_contour = 0, o.segment_count = -1, o.prev_is_line = !1, o.capper = Qn[n], o.joiner = qn[r], o.inner.reset(), o.outer.reset(), o.cusper.reset(), o.stroke_type = 1, o.recursion_depth = 0, o.found_tangents = !1, o.join_completed = !1;
    let u = !1, h = new be({
      path: t,
      verbIndex: 0,
      pointsIndex: 0,
      isAutoClose: !0
    });
    h.setAutoClose(!0);
    for (let c of h)
      switch (c.type) {
        case b.kMove:
          o.moveTo(c.p0);
          break;
        case b.kLine:
          o.lineTo(c.p0, h), u = !0;
          break;
        case b.kQuad:
          o.quadraticCurveTo(c.p1, c.p2), u = !1;
          break;
        case b.kCubic:
          o.bezierCurveTo(c.p1, c.p2, c.p3), u = !1;
          break;
        case b.kClose:
          if (n != "butt") {
            if (o.hasOnlyMoveTo()) {
              o.lineTo(o.moveToPt), u = !0;
              continue;
            }
            if (o.isCurrentContourEmpty()) {
              u = !0;
              continue;
            }
          }
          o.close(u);
          break;
      }
    return o.finish(u);
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
const Ri = {
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
new Set(Object.keys(Ri).concat(Object.keys(Ri).map((s) => s.toLowerCase())));
function He(s, t, e) {
  return s >= t && s <= e;
}
function Gi(s) {
  return He(s.charCodeAt(0), 1, 32);
}
function re(s) {
  return He(s.charCodeAt(0), 48, 57);
}
function ts(s) {
  return Gi(s) || s === ",";
}
function Bn(s) {
  return He(s.charCodeAt(0), 97, 122);
}
function Vn(s) {
  return String.fromCharCode(s.charCodeAt(0) - 97 + 65);
}
function Ke(s) {
  let t = 0;
  for (; s.length > 0 && Gi(s[t]); )
    t++;
  return s.slice(t);
}
function me(s) {
  let t = 0;
  for (; s.length > 0 && ts(s[t]); )
    t++;
  return s.slice(t);
}
function Yn(s, t) {
  s = Ke(s);
  let e = 0;
  for (e < s.length && (s[e] === "+" || s[e] === "-") && e++; e < s.length && re(s[e]); )
    e++;
  if (e < s.length && s[e] === ".")
    for (e++; e < s.length && re(s[e]); )
      e++;
  if (e < s.length && (s[e] === "e" || s[e] === "E"))
    for (e++, e < s.length && (s[e] === "+" || s[e] === "-") && e++; e < s.length && re(s[e]); )
      e++;
  return e == 0 ? (t.value = s, 0) : (t.value = s.substring(e), Number(s.substring(0, e)));
}
function es(s, t) {
  s = Ke(s);
  let e = { value: "" }, i = Yn(s, e);
  return s == e.value ? "" : (t && (t.value = i), e.value);
}
function Ii(s, t, e, i) {
  return s = es(s, t), s ? (e && (t.value += i), s = me(s), s) : "";
}
function On(s, t, e) {
  if (e > 0) {
    let i = 0, n = { value: 0 };
    for (; s = es(s, n), t[i] = n.value, !(--e == 0 || s.length <= 0); )
      s = me(s), i++;
  }
  return s;
}
function mt(s, t, e, i, n) {
  if (s = On(s, t, e), i)
    for (let r = 0; r < e; r += 2)
      t[r] += n.x, t[r + 1] += n.y;
  return s;
}
function ye(s, t) {
  let e = { x: 0, y: 0 }, i = { x: 0, y: 0 }, n = { x: 0, y: 0 }, r = new Float32Array(7), l = { value: 0 }, o = "", a = "", u = !1;
  for (; t.length && (t = Ke(t), t[0] !== ""); ) {
    let h = t[0];
    if (re(h) || h === "-" || h === "+" || h === ".") {
      if (o == "" || o == "Z")
        return !1;
    } else ts(h) || (o = h, u = !1, Bn(h) && (u = !0, o = Vn(h)), t = t.substring(1)), t = me(t);
    switch (o) {
      case "M":
        t = mt(t, r, 2, u, i), s.moveTo(r[0], r[1]), a = "", o = "L", i.x = r[0], i.y = r[1];
        break;
      case "L":
        t = mt(t, r, 2, u, i), s.lineTo(r[0], r[1]), i.x = r[0], i.y = r[1];
        break;
      case "H":
        t = Ii(t, l, u, i.x), s.lineTo(l.value, i.y), i.x = l.value;
        break;
      case "V":
        t = Ii(t, l, u, i.y), s.lineTo(i.x, l.value), i.y = l.value;
        break;
      case "C":
        t = mt(t, r, 6, u, i), s.bezierCurveTo(r[0], r[1], r[2], r[3], r[4], r[5]), n.x = r[2], n.y = r[3], i.x = r[4], i.y = r[5];
        break;
      case "S":
        t = mt(t, r.subarray(2), 4, u, i), r[0] = i.x, r[1] = i.y, (a == "C" || a == "S") && (r[0] -= n.x - i.x, r[1] -= n.y - i.y), s.bezierCurveTo(r[0], r[1], r[2], r[3], r[4], r[5]), n.x = r[2], n.y = r[3], i.x = r[4], i.y = r[5];
        break;
      case "Q":
        t = mt(t, r, 4, u, i), s.quadraticCurveTo(r[0], r[1], r[2], r[3]), n.x = r[0], n.y = r[1], i.x = r[2], i.y = r[3];
        break;
      case "T":
        t = mt(t, r.subarray(1), 2, u, i), r[0] = i.x, r[1] = i.y, (a == "Q" || a == "T") && (r[0] -= n.x - i.x, r[1] -= n.y - i.y), s.quadraticCurveTo(r[0], r[1], r[2], r[3]), n.x = r[0], n.y = r[1], i.x = r[2], i.y = r[3];
        break;
      case "A":
        t = mt(t, r, 7, !1);
        let c = i.x, m = i.y, y = r[0], p = r[1], x = r[2], g = !!r[3], k = !!r[4], _ = r[5], v = r[6];
        _ = u ? _ + i.x : _, v = u ? v + i.y : v, xs(c, m, _, v, y, p, x, g, k, (M, P, N, A, w, C, B, tt, ht) => {
          s.bezierCurveTo(N, A, w, C, B, tt), i.x = B, i.y = tt;
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
class is {
  constructor(t) {
    d(this, "commands", []);
    d(this, "dirty", !1);
    d(this, "_cb", null);
    typeof t == "string" ? ye(this, t) : t instanceof is && (this.commands = [...t.commands]);
  }
  fromSvgPath(t) {
    ye(this, t);
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
const Dn = 0.5, de = 1073741823, Xn = 1e6;
function jn(s, t) {
  return s < 0 ? (s = -s, s > t && (s = s % t), s = t - s, s === t && (s = 0), s) : s >= t ? s % t : s;
}
function Zn(s, t) {
  for (let e = 0, i = s.length; e < i; ++e) {
    let n = s[e];
    if (t > n || t === n && n !== 0)
      t -= n;
    else
      return [n - t, e];
  }
  return [s[0], 0];
}
function wi(s) {
  return s % 2 === 0;
}
class Gr {
  constructor(t, e) {
    d(this, "data");
    d(this, "offset");
    d(this, "interval_len");
    d(this, "first_len");
    //
    d(this, "first_index");
    this.data = t, this.interval_len = this.data.reduce((r, l) => r + l, 0), this.offset = jn(e, this.interval_len);
    const [i, n] = Zn(this.data, this.offset);
    this.first_len = i, this.first_index = n;
  }
  dash(t, e = 1) {
    if (!(this.data.length < 2) && !this.data.some((i) => i < 0))
      return Un(t, this, e);
  }
}
function Un(s, t, e = 1) {
  let i = new gt(), n = 0, r = new Kn(s, e);
  for (let l of r) {
    let o = l.isClosed, a = !1, u = l.length, h = t.first_index;
    if (n += u * (t.data.length >> 1) / t.interval_len, n > Xn)
      return;
    let c = 0, m = t.first_len;
    for (; c < u; )
      a = !1, wi(h) && !o && (a = !0, l.pushSegment(c, c + m, !0, i)), c += m, o = !1, h += 1, h === t.data.length && (h = 0), m = t.data[h];
    return l.isClosed && wi(t.first_index) && t.first_len >= 0 && l.pushSegment(0, t.first_len, !a, i), i;
  }
}
class Bt {
  constructor() {
    d(this, "distance", 0);
    d(this, "pointIndex", 0);
    d(this, "tValue", 0);
    d(this, "kind", 0);
  }
  static create(t) {
    let e = new Bt();
    return e.distance = t.distance, e.pointIndex = t.pointIndex, e.tValue = t.tValue, e.kind = t.kind, e;
  }
  scalarT() {
    const t = 1 / de;
    return this.tValue * t;
  }
}
class Hn {
  constructor() {
    d(this, "segments", []);
    d(this, "points", []);
    d(this, "length", 0);
    d(this, "isClosed", !1);
  }
  pushSegment(t, e, i, n) {
    if (t < 0 && (t = 0), e > this.length && (e = this.length), !(t <= e) || this.segments.length <= 0)
      return;
    let r = this.distanceTosegment(t);
    if (!r)
      return;
    let [l, o] = r, a = this.segments[l];
    if (r = this.distanceTosegment(e), !r)
      return;
    let [u, h] = r, c = this.segments[u], m = f.default();
    if (i && ($n(this.points.slice(a.pointIndex), a.kind, o, m), n.moveTo(m)), a.pointIndex === c.pointIndex)
      Ee(this.points.slice(a.pointIndex), a.kind, o, h, n);
    else {
      let y = l;
      do {
        Ee(this.points.slice(a.pointIndex), a.kind, o, 1, n);
        let p = a.pointIndex;
        do
          if (y += 1, this.segments[y].pointIndex !== p)
            break;
        while (!0);
        if (a = this.segments[y], o = 0, a.pointIndex >= c.pointIndex)
          break;
      } while (!0);
      Ee(this.points.slice(a.pointIndex), a.kind, 0, h, n);
    }
  }
  distanceTosegment(t) {
    let e = Jn(this.segments, t);
    e = e ^ e >> 31;
    let i = this.segments[e], n = 0, r = 0;
    e > 0 && (r = this.segments[e - 1].distance, this.segments[e - 1].pointIndex == i.pointIndex && (n = this.segments[e - 1].scalarT()));
    let l = n + (i.scalarT() - n) * (t - r) / (i.distance - r);
    if (Number.isFinite(l))
      return [e, l];
  }
  computeLineSeg(t, e, i, n) {
    let r = t.distanceTo(e), l = i;
    return i += r, i > l && this.segments.push(Bt.create({
      distance: i,
      pointIndex: n,
      tValue: de,
      kind: 0
      /* Line */
    })), i;
  }
  computeQuadSegs(t, e, i, n, r, l, o, a) {
    if (Ei(l - r) != 0 && Gn(t, e, i, a)) {
      let u = f.make(5), h = r + l >> 1;
      zt([t, e, i], u, 0.5), n = this.computeQuadSegs(u[0], u[1], u[2], n, r, h, o, a), n = this.computeQuadSegs(u[2], u[3], u[4], n, h, l, o, a);
    } else {
      let u = t.distanceTo(i), h = n;
      n += u, n > h && this.segments.push(Bt.create({
        distance: n,
        pointIndex: o,
        tValue: l,
        kind: 1
        /* Quad */
      }));
    }
    return n;
  }
  computeCubicSegs(t, e, i, n, r, l, o, a, u) {
    if (Ei(o - l) != 0 && tr(t, e, i, n, u)) {
      let h = f.make(7), c = l + o >> 1;
      at([t, e, i, n], h, 0.5), r = this.computeCubicSegs(h[0], h[1], h[2], h[3], r, l, c, a, u), r = this.computeCubicSegs(h[3], h[4], h[5], h[6], r, c, o, a, u);
    } else {
      let h = t.distanceTo(n), c = r;
      r += h, r > c && this.segments.push(Bt.create({
        distance: r,
        pointIndex: a,
        tValue: o,
        kind: 2
        /* Cubic */
      }));
    }
    return r;
  }
}
class Kn {
  constructor(t, e = 1) {
    d(this, "iter");
    d(this, "tolerance");
    this.iter = new be({
      path: t,
      verbIndex: 0,
      pointsIndex: 0,
      isAutoClose: !1
    }), this.tolerance = 1 / e * Dn;
  }
  *[Symbol.iterator]() {
    for (; this.iter.canNext(); ) {
      let t = new Hn(), e = 0, i = 0, n = !1, r = f.default();
      for (let l of this.iter) {
        switch (l.type) {
          case b.kMove: {
            t.points.push(l.p0), r.copy(l.p0);
            break;
          }
          case b.kLine: {
            let o = i;
            i = t.computeLineSeg(r, l.p0, i, e), i > o && (t.points.push(l.p0), e += 1), r.copy(l.p0);
            break;
          }
          case b.kQuad: {
            let o = i;
            i = t.computeQuadSegs(r, l.p1, l.p2, i, 0, de, e, this.tolerance), i > o && (t.points.push(l.p1), t.points.push(l.p2), e += 2), r.copy(l.p2);
            break;
          }
          case b.kCubic: {
            let o = i;
            i = t.computeCubicSegs(r, l.p1, l.p2, l.p3, i, 0, de, e, this.tolerance), i > o && (t.points.push(l.p1), t.points.push(l.p2), t.points.push(l.p3), e += 3), r.copy(l.p3);
            break;
          }
          case b.kClose: {
            n = !0;
            break;
          }
        }
        if (this.iter.nextVerb === b.kMove)
          break;
      }
      if (!Number.isFinite(i))
        return;
      if (n) {
        let l = i, o = t.points[0].clone();
        i = t.computeLineSeg(
          t.points[e],
          o,
          i,
          e
        ), i > l && t.points.push(o);
      }
      if (t.length = i, t.isClosed = n, t.points.length <= 0)
        return;
      yield t;
    }
  }
}
function Jn(s, t) {
  if (s.length <= 0)
    return -1;
  let e = 0, i = s.length - 1;
  for (; e < i; ) {
    let n = i + e >>> 1;
    s[n].distance < t ? e = n + 1 : i = n;
  }
  return s[i].distance < t ? (i = i + 1, i = ~i) : t < s[i].distance && (i = ~i), i;
}
function Be(s, t, e) {
  return s + (t - s) * e;
}
function It(s, t, e) {
  return Be(s, t, D(e, 0, 1));
}
function $n(s, t, e, i, n) {
  switch (t) {
    case 0: {
      i && (i.x = Be(s[0].x, s[1].x, e), i.y = Be(s[0].y, s[1].y, e));
      break;
    }
    case 1: {
      {
        let r = s.slice(0, 3);
        bt(r, e, i, n);
      }
      break;
    }
    case 2: {
      {
        let r = s.slice(0, 4);
        Xe(r, e, i, n);
      }
      break;
    }
  }
}
function Ee(s, t, e, i, n) {
  if (e === i) {
    n.lastPoint && n.lineTo(n.lastPoint.x, n.lastPoint.y);
    return;
  }
  switch (t) {
    case 0: {
      if (i === 1)
        n.lineTo(s[1].x, s[1].y);
      else {
        let r = It(s[0].x, s[1].x, i), l = It(s[0].y, s[1].y, i);
        n.lineTo(r, l);
      }
      break;
    }
    case 1: {
      let r = f.make(5), l = f.make(5);
      if (e === 0)
        if (i === 1)
          n.quadTo(s[1], s[2]);
        else {
          let o = D(i, 0, 1);
          zt(s, r, o);
        }
      else {
        let o = D(e, 0, 1);
        if (zt(s, r, o), i === 1)
          n.quadTo(r[3], r[4]);
        else {
          let a = D((i - o) / (1 - e), 0, 1);
          zt(r.slice(2), l, a), n.quadTo(l[1], l[2]);
        }
      }
      break;
    }
    case 2: {
      let r = f.make(7), l = f.make(7);
      if (e === 0)
        if (i === 1)
          n.cubicTo(s[1], s[2], s[3]);
        else {
          let o = D(i, 0, 1);
          at(s.slice(0, 4), r, o), n.cubicTo(r[1], r[2], r[3]);
        }
      else {
        let o = D(e, 0, 1);
        if (at(s.slice(0, 4), r, o), i === 1)
          n.cubicTo(r[4], r[5], r[6]);
        else {
          let a = D((i - o) / (1 - e), 0, 1);
          at(r.slice(3, 7), l, a), n.cubicTo(l[1], l[2], l[3]);
        }
      }
      break;
    }
  }
}
function Ei(s) {
  return s >> 10;
}
function Gn(s, t, e, i) {
  let n = t.halfX - (s.x + e.x) * 0.5 * 0.5, r = t.halfY - (s.y + e.y) * 0.5 * 0.5;
  return Math.max(Math.abs(n), Math.abs(r)) > i;
}
function tr(s, t, e, i, n) {
  let r = Li(
    t,
    It(s.x, i.x, 0.3333333333333333),
    It(s.y, i.y, 0.3333333333333333),
    n
  ), l = Li(
    e,
    It(s.x, i.x, 2 / 3),
    It(s.y, i.y, 2 / 3),
    n
  );
  return r || l;
}
function Li(s, t, e, i) {
  let n = s.x - t, r = s.y - e;
  return Math.max(Math.abs(n), Math.abs(r)) > i;
}
function er(s) {
  let t = { tl: 0, tr: 0, br: 0, bl: 0 };
  return typeof s == "number" ? t = { tl: s, tr: s, br: s, bl: s } : Array.isArray(s) ? s.length === 1 ? t = { tl: s[0], tr: s[0], br: s[0], bl: s[0] } : s.length === 2 ? t = { tl: s[0], tr: s[1], br: s[0], bl: s[1] } : s.length === 3 ? t = { tl: s[0], tr: s[1], br: s[2], bl: s[1] } : s.length === 4 && (t = { tl: s[0], tr: s[1], br: s[2], bl: s[3] }) : s && (t.tl = s.x ?? 0, t.tr = s.y ?? 0, t.bl = s.z ?? 0, t.br = s.w ?? 0), t;
}
function vt(s) {
  for (var t = 0; t < s.length; t++)
    if (s[t] !== void 0 && !Number.isFinite(s[t]))
      return !1;
  return !0;
}
function Ai(s) {
  return s / Math.PI * 180;
}
function ir(s, t) {
  return Math.abs(s - t) < 1e-5;
}
function sr(s, t, e, i, n, r, l = !1) {
  ss(s, t, e, i, i, 0, n, r, l);
}
function nr(s, t, e, i, n, r) {
  if (vt([t, e, i, n, r])) {
    if (r < 0)
      throw "radii cannot be negative";
    s.isEmpty() && s.moveTo(t, e), s.arcTo(f.create(t, e), f.create(i, n), r);
  }
}
function rr(s, t, e, i, n, r, l) {
  vt([t, e, i, n, r, l]) && (s.isEmpty() && s.moveTo(t, e), s.cubicTo(t, e, i, n, r, l));
}
function lr(s) {
  if (!s.isEmpty()) {
    var t = s.getBounds();
    (t.bottom - t.top || t.right - t.left) && s.close();
  }
}
function Ni(s, t, e, i, n, r, l) {
  var o = Ai(l - r), a = Ai(r), u = q.makeLTRB(t - i, e - n, t + i, e + n);
  if (ir(Math.abs(o), 360)) {
    var h = o / 2;
    s.arcToOval(u, a, h, !1), s.arcToOval(u, a + h, h, !1);
    return;
  }
  s.arcToOval(u, a, o, !1);
}
function ss(s, t, e, i, n, r, l, o, a = !1) {
  if (vt([t, e, i, n, r, l, o])) {
    if (i < 0 || n < 0)
      throw "radii cannot be negative";
    var u = 2 * Math.PI, h = l % u;
    h < 0 && (h += u);
    var c = h - l;
    if (l = h, o += c, !a && o - l >= u ? o = l + u : a && l - o >= u ? o = l - u : !a && l > o ? o = l + (u - (l - o) % u) : a && l < o && (o = l - (u - (o - l) % u)), !r) {
      Ni(s, t, e, i, n, l, o);
      return;
    }
    var m = ut.fromRotateOrigin(r, t, e), y = ut.fromRotateOrigin(-r, t, e);
    s.transform(y), Ni(s, t, e, i, n, l, o), s.transform(m);
  }
}
function or(s, t, e) {
  vt([t, e]) && (s.isEmpty() && s.moveTo(t, e), s.lineTo(t, e));
}
function ar(s, t, e) {
  vt([t, e]) && s.moveTo(t, e);
}
function ur(s, t, e, i, n) {
  vt([t, e, i, n]) && (s.isEmpty() && s.moveTo(t, e), s.quadTo(t, e, i, n));
}
function hr(s, t, e, i, n) {
  var r = q.makeXYWH(t, e, i, n);
  vt([r.left, r.top, r.right, r.bottom]) && s.addRect(r);
}
let tl = class ns {
  constructor(t) {
    d(this, "_path", gt.default());
    typeof t == "string" ? ye(this, t) : t instanceof ns && this._path.copy(t.getPath());
  }
  static default() {
    return new this();
  }
  static fromSvgPath(t) {
    return new this(t);
  }
  fromSvgPath(t) {
    ye(this, t);
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
    sr(this._path, t, e, i, n, r, l);
  }
  arcTo(t, e, i, n, r) {
    nr(this._path, t, e, i, n, r);
  }
  bezierCurveTo(t, e, i, n, r, l) {
    rr(this._path, t, e, i, n, r, l);
  }
  closePath() {
    lr(this._path);
  }
  conicTo(t, e, i, n, r) {
    this._path.conicTo(t, e, i, n, r);
  }
  ellipseArc(t, e, i, n, r, l, o, a, u) {
    this._path.isEmpty() && this._path.moveTo(t, e), this._path.arcTo(f.create(r, l), o, Number(a), +!u, f.create(i, n));
  }
  roundRect(t, e, i, n, r) {
    let l = er(r);
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
    let a = dt.makeEmpty(), u = q.makeXYWH(t, e, i, n);
    a.setRectRadii(u, o), this._path.addRRect(a);
  }
  ellipse(t, e, i, n, r, l, o, a = !1) {
    ss(
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
    or(this._path, t, e);
  }
  moveTo(t, e) {
    ar(this._path, t, e);
  }
  quadraticCurveTo(t, e, i, n) {
    ur(this._path, t, e, i, n);
  }
  rect(t, e, i, n) {
    hr(this._path, t, e, i, n);
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
  Tn as FillRule,
  T as FloatPoint,
  vn as LineCap,
  _n as LineJoin,
  ut as Matrix2D,
  ii as PI,
  tl as Path2D,
  gt as PathBuilder,
  be as PathSegmentsIter,
  Gr as PathStrokeDash,
  $r as PathStroker,
  f as Point,
  oe as Point3D,
  L as PointerArray,
  is as ProxyPath2D,
  dt as RRect,
  q as Rect,
  E as Ref,
  V as SK_Scalar1,
  xt as SK_ScalarHalf,
  Mr as SK_ScalarInfinity,
  Ts as SK_ScalarMax,
  Tr as SK_ScalarMin,
  Sr as SK_ScalarNaN,
  Ye as SK_ScalarNearlyZero,
  Pr as SK_ScalarNegativeInfinity,
  st as SK_ScalarPI,
  Ae as SK_ScalarRoot2Over2,
  Fi as SK_ScalarSinCosNearlyZero,
  _r as SK_ScalarSqrt2,
  vr as SK_ScalarTanPIOver8,
  qt as Size,
  Hr as SkAutoConicToQuads,
  gr as SkBezierCubic,
  jr as SkChopCubicAtHalf,
  Ur as SkChopCubicAtXExtrema,
  Yi as SkChopCubicAtYExtrema,
  at as SkChopCubicAt_3,
  Vs as SkChopCubicAt_4,
  Bi as SkChopCubicAt_5,
  zt as SkChopQuadAt,
  Qs as SkChopQuadAtYExtrema,
  sn as SkComputeConicExtremas,
  en as SkComputeCubicExtremas,
  tn as SkComputeQuadExtremas,
  W as SkConic,
  As as SkCubicType,
  Ft as SkCubics,
  ri as SkDegreesToRadians,
  ie as SkDoubleToScalar,
  Xe as SkEvalCubicAt,
  ue as SkEvalCubicPosAt,
  zi as SkEvalCubicTangentAt,
  bt as SkEvalQuadAt,
  Oe as SkEvalQuadTangentAt,
  De as SkFindBisector,
  Ks as SkFindCubicCusp,
  he as SkFindCubicExtrema,
  Ds as SkFindCubicInflections,
  Oi as SkFindCubicMaxCurvature,
  Zr as SkFindCubicMidTangent,
  ui as SkFindQuadExtrema,
  zs as SkFindQuadMaxCurvature,
  Xr as SkFindQuadMidTangent,
  lt as SkFindUnitQuadRoots,
  Ir as SkFloatToScalar,
  Cr as SkIntToFloat,
  Ms as SkIntToScalar,
  _t as SkQuadCoeff,
  ee as SkQuads,
  Vr as SkRadiansToDegrees,
  Yt as SkRotationDirection,
  Is as SkScalarACos,
  Fr as SkScalarASin,
  si as SkScalarATan2,
  j as SkScalarAbs,
  ni as SkScalarAve,
  Ss as SkScalarCeilToInt,
  Er as SkScalarCeilToScalar,
  Nr as SkScalarCopySign,
  kt as SkScalarCos,
  ne as SkScalarCosSnapToZero,
  qr as SkScalarExp,
  Lr as SkScalarFloorToInt,
  Wi as SkScalarFloorToScalar,
  Br as SkScalarFraction,
  $ as SkScalarHalf,
  G as SkScalarInterp,
  Dr as SkScalarInterpFunc,
  We as SkScalarInvert,
  Vt as SkScalarIsFinite,
  Yr as SkScalarIsInt,
  ws as SkScalarIsNaN,
  Qr as SkScalarLog,
  zr as SkScalarLog2,
  Wr as SkScalarMod,
  U as SkScalarNearlyEqual,
  rt as SkScalarNearlyZero,
  Cs as SkScalarPow,
  Ar as SkScalarRoundToInt,
  Te as SkScalarRoundToScalar,
  li as SkScalarSignAsInt,
  Or as SkScalarSignAsScalar,
  Ne as SkScalarSin,
  se as SkScalarSinSnapToZero,
  H as SkScalarSqrt,
  Nt as SkScalarSquare,
  Rs as SkScalarTan,
  wr as SkScalarToDouble,
  Rr as SkScalarToFloat,
  Ps as SkScalarTruncToScalar,
  Ve as SkScalarsAreFinite,
  Es as SkScalarsAreFiniteArray,
  oi as SkScalarsEqual,
  cr as VectorIterator,
  D as clamp,
  cs as copysign,
  xs as ellipseArcToCubicBezier,
  ds as endpoint_to_center,
  fs as fabs,
  xr as isFinite,
  ai as kMaxConicToQuadPOW2,
  Ls as kMaxConicsForArc,
  Z as lerp,
  kr as magnitudeAlt,
  dr as max,
  yr as min,
  Zt as nearly_equal,
  gn as pointInPath,
  br as pointOnEllipse,
  ps as quarterArcToCubicBezier,
  Q as sk_double_nearly_zero,
  pr as sk_double_to_float,
  Rt as sk_doubles_nearly_equal_ulps,
  Le as sk_ieee_double_divide,
  le as sk_ieee_float_divide,
  hs as sqrt,
  mr as swap,
  Jr as tangent_conic,
  xn as tangent_cubic,
  dn as tangent_line,
  pn as tangent_quad,
  Kr as winding_conic,
  yn as winding_cubic,
  un as winding_line,
  mn as winding_quad
};
