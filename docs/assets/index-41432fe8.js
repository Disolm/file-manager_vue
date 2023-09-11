(function () {
    const t = document.createElement("link").relList;
    if (t && t.supports && t.supports("modulepreload")) return;
    for (const s of document.querySelectorAll('link[rel="modulepreload"]')) r(s);
    new MutationObserver(s => {
        for (const o of s) if (o.type === "childList") for (const i of o.addedNodes) i.tagName === "LINK" && i.rel === "modulepreload" && r(i)
    }).observe(document, {childList: !0, subtree: !0});

    function n(s) {
        const o = {};
        return s.integrity && (o.integrity = s.integrity), s.referrerPolicy && (o.referrerPolicy = s.referrerPolicy), s.crossOrigin === "use-credentials" ? o.credentials = "include" : s.crossOrigin === "anonymous" ? o.credentials = "omit" : o.credentials = "same-origin", o
    }

    function r(s) {
        if (s.ep) return;
        s.ep = !0;
        const o = n(s);
        fetch(s.href, o)
    }
})();

function qr(e, t) {
    const n = Object.create(null), r = e.split(",");
    for (let s = 0; s < r.length; s++) n[r[s]] = !0;
    return t ? s => !!n[s.toLowerCase()] : s => !!n[s]
}

const X = {}, It = [], Ce = () => {
    }, Rc = () => !1, xc = /^on[^a-z]/, Un = e => xc.test(e), zr = e => e.startsWith("onUpdate:"), se = Object.assign,
    Vr = (e, t) => {
        const n = e.indexOf(t);
        n > -1 && e.splice(n, 1)
    }, Sc = Object.prototype.hasOwnProperty, K = (e, t) => Sc.call(e, t), B = Array.isArray,
    Nt = e => kn(e) === "[object Map]", Lo = e => kn(e) === "[object Set]", U = e => typeof e == "function",
    oe = e => typeof e == "string", Wr = e => typeof e == "symbol", Z = e => e !== null && typeof e == "object",
    jo = e => Z(e) && U(e.then) && U(e.catch), Do = Object.prototype.toString, kn = e => Do.call(e),
    Cc = e => kn(e).slice(8, -1), $o = e => kn(e) === "[object Object]",
    Jr = e => oe(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e,
    Rn = qr(",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"),
    Hn = e => {
        const t = Object.create(null);
        return n => t[n] || (t[n] = e(n))
    }, Pc = /-(\w)/g, ke = Hn(e => e.replace(Pc, (t, n) => n ? n.toUpperCase() : "")), Ac = /\B([A-Z])/g,
    Ht = Hn(e => e.replace(Ac, "-$1").toLowerCase()), Kn = Hn(e => e.charAt(0).toUpperCase() + e.slice(1)),
    cr = Hn(e => e ? `on${Kn(e)}` : ""), on = (e, t) => !Object.is(e, t), lr = (e, t) => {
        for (let n = 0; n < e.length; n++) e[n](t)
    }, In = (e, t, n) => {
        Object.defineProperty(e, t, {configurable: !0, enumerable: !1, value: n})
    }, Tc = e => {
        const t = parseFloat(e);
        return isNaN(t) ? e : t
    };
let Cs;
const Or = () => Cs || (Cs = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {});

function Gr(e) {
    if (B(e)) {
        const t = {};
        for (let n = 0; n < e.length; n++) {
            const r = e[n], s = oe(r) ? Mc(r) : Gr(r);
            if (s) for (const o in s) t[o] = s[o]
        }
        return t
    } else {
        if (oe(e)) return e;
        if (Z(e)) return e
    }
}

const Ic = /;(?![^(]*\))/g, Nc = /:([^]+)/, Fc = /\/\*[^]*?\*\//g;

function Mc(e) {
    const t = {};
    return e.replace(Fc, "").split(Ic).forEach(n => {
        if (n) {
            const r = n.split(Nc);
            r.length > 1 && (t[r[0].trim()] = r[1].trim())
        }
    }), t
}

function Qr(e) {
    let t = "";
    if (oe(e)) t = e; else if (B(e)) for (let n = 0; n < e.length; n++) {
        const r = Qr(e[n]);
        r && (t += r + " ")
    } else if (Z(e)) for (const n in e) e[n] && (t += n + " ");
    return t.trim()
}

const Lc = "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly", jc = qr(Lc);

function Bo(e) {
    return !!e || e === ""
}

const Uo = e => oe(e) ? e : e == null ? "" : B(e) || Z(e) && (e.toString === Do || !U(e.toString)) ? JSON.stringify(e, ko, 2) : String(e),
    ko = (e, t) => t && t.__v_isRef ? ko(e, t.value) : Nt(t) ? {[`Map(${t.size})`]: [...t.entries()].reduce((n, [r, s]) => (n[`${r} =>`] = s, n), {})} : Lo(t) ? {[`Set(${t.size})`]: [...t.values()]} : Z(t) && !B(t) && !$o(t) ? String(t) : t;
let Ee;

class Dc {
    constructor(t = !1) {
        this.detached = t, this._active = !0, this.effects = [], this.cleanups = [], this.parent = Ee, !t && Ee && (this.index = (Ee.scopes || (Ee.scopes = [])).push(this) - 1)
    }

    get active() {
        return this._active
    }

    run(t) {
        if (this._active) {
            const n = Ee;
            try {
                return Ee = this, t()
            } finally {
                Ee = n
            }
        }
    }

    on() {
        Ee = this
    }

    off() {
        Ee = this.parent
    }

    stop(t) {
        if (this._active) {
            let n, r;
            for (n = 0, r = this.effects.length; n < r; n++) this.effects[n].stop();
            for (n = 0, r = this.cleanups.length; n < r; n++) this.cleanups[n]();
            if (this.scopes) for (n = 0, r = this.scopes.length; n < r; n++) this.scopes[n].stop(!0);
            if (!this.detached && this.parent && !t) {
                const s = this.parent.scopes.pop();
                s && s !== this && (this.parent.scopes[this.index] = s, s.index = this.index)
            }
            this.parent = void 0, this._active = !1
        }
    }
}

function $c(e, t = Ee) {
    t && t.active && t.effects.push(e)
}

function Bc() {
    return Ee
}

const Yr = e => {
    const t = new Set(e);
    return t.w = 0, t.n = 0, t
}, Ho = e => (e.w & ct) > 0, Ko = e => (e.n & ct) > 0, Uc = ({deps: e}) => {
    if (e.length) for (let t = 0; t < e.length; t++) e[t].w |= ct
}, kc = e => {
    const {deps: t} = e;
    if (t.length) {
        let n = 0;
        for (let r = 0; r < t.length; r++) {
            const s = t[r];
            Ho(s) && !Ko(s) ? s.delete(e) : t[n++] = s, s.w &= ~ct, s.n &= ~ct
        }
        t.length = n
    }
}, Rr = new WeakMap;
let Xt = 0, ct = 1;
const xr = 30;
let Oe;
const _t = Symbol(""), Sr = Symbol("");

class Xr {
    constructor(t, n = null, r) {
        this.fn = t, this.scheduler = n, this.active = !0, this.deps = [], this.parent = void 0, $c(this, r)
    }

    run() {
        if (!this.active) return this.fn();
        let t = Oe, n = st;
        for (; t;) {
            if (t === this) return;
            t = t.parent
        }
        try {
            return this.parent = Oe, Oe = this, st = !0, ct = 1 << ++Xt, Xt <= xr ? Uc(this) : Ps(this), this.fn()
        } finally {
            Xt <= xr && kc(this), ct = 1 << --Xt, Oe = this.parent, st = n, this.parent = void 0, this.deferStop && this.stop()
        }
    }

    stop() {
        Oe === this ? this.deferStop = !0 : this.active && (Ps(this), this.onStop && this.onStop(), this.active = !1)
    }
}

function Ps(e) {
    const {deps: t} = e;
    if (t.length) {
        for (let n = 0; n < t.length; n++) t[n].delete(e);
        t.length = 0
    }
}

let st = !0;
const qo = [];

function Kt() {
    qo.push(st), st = !1
}

function qt() {
    const e = qo.pop();
    st = e === void 0 ? !0 : e
}

function ge(e, t, n) {
    if (st && Oe) {
        let r = Rr.get(e);
        r || Rr.set(e, r = new Map);
        let s = r.get(n);
        s || r.set(n, s = Yr()), zo(s)
    }
}

function zo(e, t) {
    let n = !1;
    Xt <= xr ? Ko(e) || (e.n |= ct, n = !Ho(e)) : n = !e.has(Oe), n && (e.add(Oe), Oe.deps.push(e))
}

function Ge(e, t, n, r, s, o) {
    const i = Rr.get(e);
    if (!i) return;
    let c = [];
    if (t === "clear") c = [...i.values()]; else if (n === "length" && B(e)) {
        const l = Number(r);
        i.forEach((u, a) => {
            (a === "length" || a >= l) && c.push(u)
        })
    } else switch (n !== void 0 && c.push(i.get(n)), t) {
        case"add":
            B(e) ? Jr(n) && c.push(i.get("length")) : (c.push(i.get(_t)), Nt(e) && c.push(i.get(Sr)));
            break;
        case"delete":
            B(e) || (c.push(i.get(_t)), Nt(e) && c.push(i.get(Sr)));
            break;
        case"set":
            Nt(e) && c.push(i.get(_t));
            break
    }
    if (c.length === 1) c[0] && Cr(c[0]); else {
        const l = [];
        for (const u of c) u && l.push(...u);
        Cr(Yr(l))
    }
}

function Cr(e, t) {
    const n = B(e) ? e : [...e];
    for (const r of n) r.computed && As(r);
    for (const r of n) r.computed || As(r)
}

function As(e, t) {
    (e !== Oe || e.allowRecurse) && (e.scheduler ? e.scheduler() : e.run())
}

const Hc = qr("__proto__,__v_isRef,__isVue"),
    Vo = new Set(Object.getOwnPropertyNames(Symbol).filter(e => e !== "arguments" && e !== "caller").map(e => Symbol[e]).filter(Wr)),
    Kc = Zr(), qc = Zr(!1, !0), zc = Zr(!0), Ts = Vc();

function Vc() {
    const e = {};
    return ["includes", "indexOf", "lastIndexOf"].forEach(t => {
        e[t] = function (...n) {
            const r = z(this);
            for (let o = 0, i = this.length; o < i; o++) ge(r, "get", o + "");
            const s = r[t](...n);
            return s === -1 || s === !1 ? r[t](...n.map(z)) : s
        }
    }), ["push", "pop", "shift", "unshift", "splice"].forEach(t => {
        e[t] = function (...n) {
            Kt();
            const r = z(this)[t].apply(this, n);
            return qt(), r
        }
    }), e
}

function Wc(e) {
    const t = z(this);
    return ge(t, "has", e), t.hasOwnProperty(e)
}

function Zr(e = !1, t = !1) {
    return function (r, s, o) {
        if (s === "__v_isReactive") return !e;
        if (s === "__v_isReadonly") return e;
        if (s === "__v_isShallow") return t;
        if (s === "__v_raw" && o === (e ? t ? ul : Yo : t ? Qo : Go).get(r)) return r;
        const i = B(r);
        if (!e) {
            if (i && K(Ts, s)) return Reflect.get(Ts, s, o);
            if (s === "hasOwnProperty") return Wc
        }
        const c = Reflect.get(r, s, o);
        return (Wr(s) ? Vo.has(s) : Hc(s)) || (e || ge(r, "get", s), t) ? c : ae(c) ? i && Jr(s) ? c : c.value : Z(c) ? e ? Zo(c) : pn(c) : c
    }
}

const Jc = Wo(), Gc = Wo(!0);

function Wo(e = !1) {
    return function (n, r, s, o) {
        let i = n[r];
        if (jt(i) && ae(i) && !ae(s)) return !1;
        if (!e && (!Nn(s) && !jt(s) && (i = z(i), s = z(s)), !B(n) && ae(i) && !ae(s))) return i.value = s, !0;
        const c = B(n) && Jr(r) ? Number(r) < n.length : K(n, r), l = Reflect.set(n, r, s, o);
        return n === z(o) && (c ? on(s, i) && Ge(n, "set", r, s) : Ge(n, "add", r, s)), l
    }
}

function Qc(e, t) {
    const n = K(e, t);
    e[t];
    const r = Reflect.deleteProperty(e, t);
    return r && n && Ge(e, "delete", t, void 0), r
}

function Yc(e, t) {
    const n = Reflect.has(e, t);
    return (!Wr(t) || !Vo.has(t)) && ge(e, "has", t), n
}

function Xc(e) {
    return ge(e, "iterate", B(e) ? "length" : _t), Reflect.ownKeys(e)
}

const Jo = {get: Kc, set: Jc, deleteProperty: Qc, has: Yc, ownKeys: Xc}, Zc = {
    get: zc, set(e, t) {
        return !0
    }, deleteProperty(e, t) {
        return !0
    }
}, el = se({}, Jo, {get: qc, set: Gc}), es = e => e, qn = e => Reflect.getPrototypeOf(e);

function yn(e, t, n = !1, r = !1) {
    e = e.__v_raw;
    const s = z(e), o = z(t);
    n || (t !== o && ge(s, "get", t), ge(s, "get", o));
    const {has: i} = qn(s), c = r ? es : n ? rs : cn;
    if (i.call(s, t)) return c(e.get(t));
    if (i.call(s, o)) return c(e.get(o));
    e !== s && e.get(t)
}

function bn(e, t = !1) {
    const n = this.__v_raw, r = z(n), s = z(e);
    return t || (e !== s && ge(r, "has", e), ge(r, "has", s)), e === s ? n.has(e) : n.has(e) || n.has(s)
}

function vn(e, t = !1) {
    return e = e.__v_raw, !t && ge(z(e), "iterate", _t), Reflect.get(e, "size", e)
}

function Is(e) {
    e = z(e);
    const t = z(this);
    return qn(t).has.call(t, e) || (t.add(e), Ge(t, "add", e, e)), this
}

function Ns(e, t) {
    t = z(t);
    const n = z(this), {has: r, get: s} = qn(n);
    let o = r.call(n, e);
    o || (e = z(e), o = r.call(n, e));
    const i = s.call(n, e);
    return n.set(e, t), o ? on(t, i) && Ge(n, "set", e, t) : Ge(n, "add", e, t), this
}

function Fs(e) {
    const t = z(this), {has: n, get: r} = qn(t);
    let s = n.call(t, e);
    s || (e = z(e), s = n.call(t, e)), r && r.call(t, e);
    const o = t.delete(e);
    return s && Ge(t, "delete", e, void 0), o
}

function Ms() {
    const e = z(this), t = e.size !== 0, n = e.clear();
    return t && Ge(e, "clear", void 0, void 0), n
}

function En(e, t) {
    return function (r, s) {
        const o = this, i = o.__v_raw, c = z(i), l = t ? es : e ? rs : cn;
        return !e && ge(c, "iterate", _t), i.forEach((u, a) => r.call(s, l(u), l(a), o))
    }
}

function wn(e, t, n) {
    return function (...r) {
        const s = this.__v_raw, o = z(s), i = Nt(o), c = e === "entries" || e === Symbol.iterator && i,
            l = e === "keys" && i, u = s[e](...r), a = n ? es : t ? rs : cn;
        return !t && ge(o, "iterate", l ? Sr : _t), {
            next() {
                const {value: d, done: p} = u.next();
                return p ? {value: d, done: p} : {value: c ? [a(d[0]), a(d[1])] : a(d), done: p}
            }, [Symbol.iterator]() {
                return this
            }
        }
    }
}

function Ze(e) {
    return function (...t) {
        return e === "delete" ? !1 : this
    }
}

function tl() {
    const e = {
        get(o) {
            return yn(this, o)
        }, get size() {
            return vn(this)
        }, has: bn, add: Is, set: Ns, delete: Fs, clear: Ms, forEach: En(!1, !1)
    }, t = {
        get(o) {
            return yn(this, o, !1, !0)
        }, get size() {
            return vn(this)
        }, has: bn, add: Is, set: Ns, delete: Fs, clear: Ms, forEach: En(!1, !0)
    }, n = {
        get(o) {
            return yn(this, o, !0)
        }, get size() {
            return vn(this, !0)
        }, has(o) {
            return bn.call(this, o, !0)
        }, add: Ze("add"), set: Ze("set"), delete: Ze("delete"), clear: Ze("clear"), forEach: En(!0, !1)
    }, r = {
        get(o) {
            return yn(this, o, !0, !0)
        }, get size() {
            return vn(this, !0)
        }, has(o) {
            return bn.call(this, o, !0)
        }, add: Ze("add"), set: Ze("set"), delete: Ze("delete"), clear: Ze("clear"), forEach: En(!0, !0)
    };
    return ["keys", "values", "entries", Symbol.iterator].forEach(o => {
        e[o] = wn(o, !1, !1), n[o] = wn(o, !0, !1), t[o] = wn(o, !1, !0), r[o] = wn(o, !0, !0)
    }), [e, n, t, r]
}

const [nl, rl, sl, ol] = tl();

function ts(e, t) {
    const n = t ? e ? ol : sl : e ? rl : nl;
    return (r, s, o) => s === "__v_isReactive" ? !e : s === "__v_isReadonly" ? e : s === "__v_raw" ? r : Reflect.get(K(n, s) && s in r ? n : r, s, o)
}

const il = {get: ts(!1, !1)}, cl = {get: ts(!1, !0)}, ll = {get: ts(!0, !1)}, Go = new WeakMap, Qo = new WeakMap,
    Yo = new WeakMap, ul = new WeakMap;

function al(e) {
    switch (e) {
        case"Object":
        case"Array":
            return 1;
        case"Map":
        case"Set":
        case"WeakMap":
        case"WeakSet":
            return 2;
        default:
            return 0
    }
}

function fl(e) {
    return e.__v_skip || !Object.isExtensible(e) ? 0 : al(Cc(e))
}

function pn(e) {
    return jt(e) ? e : ns(e, !1, Jo, il, Go)
}

function Xo(e) {
    return ns(e, !1, el, cl, Qo)
}

function Zo(e) {
    return ns(e, !0, Zc, ll, Yo)
}

function ns(e, t, n, r, s) {
    if (!Z(e) || e.__v_raw && !(t && e.__v_isReactive)) return e;
    const o = s.get(e);
    if (o) return o;
    const i = fl(e);
    if (i === 0) return e;
    const c = new Proxy(e, i === 2 ? r : n);
    return s.set(e, c), c
}

function Ft(e) {
    return jt(e) ? Ft(e.__v_raw) : !!(e && e.__v_isReactive)
}

function jt(e) {
    return !!(e && e.__v_isReadonly)
}

function Nn(e) {
    return !!(e && e.__v_isShallow)
}

function ei(e) {
    return Ft(e) || jt(e)
}

function z(e) {
    const t = e && e.__v_raw;
    return t ? z(t) : e
}

function ti(e) {
    return In(e, "__v_skip", !0), e
}

const cn = e => Z(e) ? pn(e) : e, rs = e => Z(e) ? Zo(e) : e;

function ni(e) {
    st && Oe && (e = z(e), zo(e.dep || (e.dep = Yr())))
}

function ri(e, t) {
    e = z(e);
    const n = e.dep;
    n && Cr(n)
}

function ae(e) {
    return !!(e && e.__v_isRef === !0)
}

function dl(e) {
    return si(e, !1)
}

function hl(e) {
    return si(e, !0)
}

function si(e, t) {
    return ae(e) ? e : new pl(e, t)
}

class pl {
    constructor(t, n) {
        this.__v_isShallow = n, this.dep = void 0, this.__v_isRef = !0, this._rawValue = n ? t : z(t), this._value = n ? t : cn(t)
    }

    get value() {
        return ni(this), this._value
    }

    set value(t) {
        const n = this.__v_isShallow || Nn(t) || jt(t);
        t = n ? t : z(t), on(t, this._rawValue) && (this._rawValue = t, this._value = n ? t : cn(t), ri(this))
    }
}

function ot(e) {
    return ae(e) ? e.value : e
}

const ml = {
    get: (e, t, n) => ot(Reflect.get(e, t, n)), set: (e, t, n, r) => {
        const s = e[t];
        return ae(s) && !ae(n) ? (s.value = n, !0) : Reflect.set(e, t, n, r)
    }
};

function oi(e) {
    return Ft(e) ? e : new Proxy(e, ml)
}

class gl {
    constructor(t, n, r, s) {
        this._setter = n, this.dep = void 0, this.__v_isRef = !0, this.__v_isReadonly = !1, this._dirty = !0, this.effect = new Xr(t, () => {
            this._dirty || (this._dirty = !0, ri(this))
        }), this.effect.computed = this, this.effect.active = this._cacheable = !s, this.__v_isReadonly = r
    }

    get value() {
        const t = z(this);
        return ni(t), (t._dirty || !t._cacheable) && (t._dirty = !1, t._value = t.effect.run()), t._value
    }

    set value(t) {
        this._setter(t)
    }
}

function _l(e, t, n = !1) {
    let r, s;
    const o = U(e);
    return o ? (r = e, s = Ce) : (r = e.get, s = e.set), new gl(r, s, o || !s, n)
}

function it(e, t, n, r) {
    let s;
    try {
        s = r ? e(...r) : e()
    } catch (o) {
        zn(o, t, n)
    }
    return s
}

function Pe(e, t, n, r) {
    if (U(e)) {
        const o = it(e, t, n, r);
        return o && jo(o) && o.catch(i => {
            zn(i, t, n)
        }), o
    }
    const s = [];
    for (let o = 0; o < e.length; o++) s.push(Pe(e[o], t, n, r));
    return s
}

function zn(e, t, n, r = !0) {
    const s = t ? t.vnode : null;
    if (t) {
        let o = t.parent;
        const i = t.proxy, c = n;
        for (; o;) {
            const u = o.ec;
            if (u) {
                for (let a = 0; a < u.length; a++) if (u[a](e, i, c) === !1) return
            }
            o = o.parent
        }
        const l = t.appContext.config.errorHandler;
        if (l) {
            it(l, null, 10, [e, i, c]);
            return
        }
    }
    yl(e, n, s, r)
}

function yl(e, t, n, r = !0) {
    console.error(e)
}

let ln = !1, Pr = !1;
const ue = [];
let Be = 0;
const Mt = [];
let We = null, pt = 0;
const ii = Promise.resolve();
let ss = null;

function ci(e) {
    const t = ss || ii;
    return e ? t.then(this ? e.bind(this) : e) : t
}

function bl(e) {
    let t = Be + 1, n = ue.length;
    for (; t < n;) {
        const r = t + n >>> 1;
        un(ue[r]) < e ? t = r + 1 : n = r
    }
    return t
}

function os(e) {
    (!ue.length || !ue.includes(e, ln && e.allowRecurse ? Be + 1 : Be)) && (e.id == null ? ue.push(e) : ue.splice(bl(e.id), 0, e), li())
}

function li() {
    !ln && !Pr && (Pr = !0, ss = ii.then(ai))
}

function vl(e) {
    const t = ue.indexOf(e);
    t > Be && ue.splice(t, 1)
}

function El(e) {
    B(e) ? Mt.push(...e) : (!We || !We.includes(e, e.allowRecurse ? pt + 1 : pt)) && Mt.push(e), li()
}

function Ls(e, t = ln ? Be + 1 : 0) {
    for (; t < ue.length; t++) {
        const n = ue[t];
        n && n.pre && (ue.splice(t, 1), t--, n())
    }
}

function ui(e) {
    if (Mt.length) {
        const t = [...new Set(Mt)];
        if (Mt.length = 0, We) {
            We.push(...t);
            return
        }
        for (We = t, We.sort((n, r) => un(n) - un(r)), pt = 0; pt < We.length; pt++) We[pt]();
        We = null, pt = 0
    }
}

const un = e => e.id == null ? 1 / 0 : e.id, wl = (e, t) => {
    const n = un(e) - un(t);
    if (n === 0) {
        if (e.pre && !t.pre) return -1;
        if (t.pre && !e.pre) return 1
    }
    return n
};

function ai(e) {
    Pr = !1, ln = !0, ue.sort(wl);
    const t = Ce;
    try {
        for (Be = 0; Be < ue.length; Be++) {
            const n = ue[Be];
            n && n.active !== !1 && it(n, null, 14)
        }
    } finally {
        Be = 0, ue.length = 0, ui(), ln = !1, ss = null, (ue.length || Mt.length) && ai()
    }
}

function Ol(e, t, ...n) {
    if (e.isUnmounted) return;
    const r = e.vnode.props || X;
    let s = n;
    const o = t.startsWith("update:"), i = o && t.slice(7);
    if (i && i in r) {
        const a = `${i === "modelValue" ? "model" : i}Modifiers`, {number: d, trim: p} = r[a] || X;
        p && (s = n.map(g => oe(g) ? g.trim() : g)), d && (s = n.map(Tc))
    }
    let c, l = r[c = cr(t)] || r[c = cr(ke(t))];
    !l && o && (l = r[c = cr(Ht(t))]), l && Pe(l, e, 6, s);
    const u = r[c + "Once"];
    if (u) {
        if (!e.emitted) e.emitted = {}; else if (e.emitted[c]) return;
        e.emitted[c] = !0, Pe(u, e, 6, s)
    }
}

function fi(e, t, n = !1) {
    const r = t.emitsCache, s = r.get(e);
    if (s !== void 0) return s;
    const o = e.emits;
    let i = {}, c = !1;
    if (!U(e)) {
        const l = u => {
            const a = fi(u, t, !0);
            a && (c = !0, se(i, a))
        };
        !n && t.mixins.length && t.mixins.forEach(l), e.extends && l(e.extends), e.mixins && e.mixins.forEach(l)
    }
    return !o && !c ? (Z(e) && r.set(e, null), null) : (B(o) ? o.forEach(l => i[l] = null) : se(i, o), Z(e) && r.set(e, i), i)
}

function Vn(e, t) {
    return !e || !Un(t) ? !1 : (t = t.slice(2).replace(/Once$/, ""), K(e, t[0].toLowerCase() + t.slice(1)) || K(e, Ht(t)) || K(e, t))
}

let fe = null, Wn = null;

function Fn(e) {
    const t = fe;
    return fe = e, Wn = e && e.type.__scopeId || null, t
}

function is(e) {
    Wn = e
}

function cs() {
    Wn = null
}

function Jn(e, t = fe, n) {
    if (!t || e._n) return e;
    const r = (...s) => {
        r._d && Vs(-1);
        const o = Fn(t);
        let i;
        try {
            i = e(...s)
        } finally {
            Fn(o), r._d && Vs(1)
        }
        return i
    };
    return r._n = !0, r._c = !0, r._d = !0, r
}

function ur(e) {
    const {
        type: t,
        vnode: n,
        proxy: r,
        withProxy: s,
        props: o,
        propsOptions: [i],
        slots: c,
        attrs: l,
        emit: u,
        render: a,
        renderCache: d,
        data: p,
        setupState: g,
        ctx: b,
        inheritAttrs: R
    } = e;
    let j, T;
    const N = Fn(e);
    try {
        if (n.shapeFlag & 4) {
            const D = s || r;
            j = $e(a.call(D, D, d, o, g, p, b)), T = l
        } else {
            const D = t;
            j = $e(D.length > 1 ? D(o, {attrs: l, slots: c, emit: u}) : D(o, null)), T = t.props ? l : Rl(l)
        }
    } catch (D) {
        nn.length = 0, zn(D, e, 1), j = ee(lt)
    }
    let k = j;
    if (T && R !== !1) {
        const D = Object.keys(T), {shapeFlag: ce} = k;
        D.length && ce & 7 && (i && D.some(zr) && (T = xl(T, i)), k = Dt(k, T))
    }
    return n.dirs && (k = Dt(k), k.dirs = k.dirs ? k.dirs.concat(n.dirs) : n.dirs), n.transition && (k.transition = n.transition), j = k, Fn(N), j
}

const Rl = e => {
    let t;
    for (const n in e) (n === "class" || n === "style" || Un(n)) && ((t || (t = {}))[n] = e[n]);
    return t
}, xl = (e, t) => {
    const n = {};
    for (const r in e) (!zr(r) || !(r.slice(9) in t)) && (n[r] = e[r]);
    return n
};

function Sl(e, t, n) {
    const {props: r, children: s, component: o} = e, {props: i, children: c, patchFlag: l} = t, u = o.emitsOptions;
    if (t.dirs || t.transition) return !0;
    if (n && l >= 0) {
        if (l & 1024) return !0;
        if (l & 16) return r ? js(r, i, u) : !!i;
        if (l & 8) {
            const a = t.dynamicProps;
            for (let d = 0; d < a.length; d++) {
                const p = a[d];
                if (i[p] !== r[p] && !Vn(u, p)) return !0
            }
        }
    } else return (s || c) && (!c || !c.$stable) ? !0 : r === i ? !1 : r ? i ? js(r, i, u) : !0 : !!i;
    return !1
}

function js(e, t, n) {
    const r = Object.keys(t);
    if (r.length !== Object.keys(e).length) return !0;
    for (let s = 0; s < r.length; s++) {
        const o = r[s];
        if (t[o] !== e[o] && !Vn(n, o)) return !0
    }
    return !1
}

function Cl({vnode: e, parent: t}, n) {
    for (; t && t.subTree === e;) (e = t.vnode).el = n, t = t.parent
}

const Pl = e => e.__isSuspense;

function Al(e, t) {
    t && t.pendingBranch ? B(e) ? t.effects.push(...e) : t.effects.push(e) : El(e)
}

const On = {};

function Lt(e, t, n) {
    return di(e, t, n)
}

function di(e, t, {immediate: n, deep: r, flush: s, onTrack: o, onTrigger: i} = X) {
    var c;
    const l = Bc() === ((c = ie) == null ? void 0 : c.scope) ? ie : null;
    let u, a = !1, d = !1;
    if (ae(e) ? (u = () => e.value, a = Nn(e)) : Ft(e) ? (u = () => e, r = !0) : B(e) ? (d = !0, a = e.some(D => Ft(D) || Nn(D)), u = () => e.map(D => {
        if (ae(D)) return D.value;
        if (Ft(D)) return gt(D);
        if (U(D)) return it(D, l, 2)
    })) : U(e) ? t ? u = () => it(e, l, 2) : u = () => {
        if (!(l && l.isUnmounted)) return p && p(), Pe(e, l, 3, [g])
    } : u = Ce, t && r) {
        const D = u;
        u = () => gt(D())
    }
    let p, g = D => {
        p = N.onStop = () => {
            it(D, l, 4)
        }
    }, b;
    if (fn) if (g = Ce, t ? n && Pe(t, l, 3, [u(), d ? [] : void 0, g]) : u(), s === "sync") {
        const D = Ru();
        b = D.__watcherHandles || (D.__watcherHandles = [])
    } else return Ce;
    let R = d ? new Array(e.length).fill(On) : On;
    const j = () => {
        if (N.active) if (t) {
            const D = N.run();
            (r || a || (d ? D.some((ce, de) => on(ce, R[de])) : on(D, R))) && (p && p(), Pe(t, l, 3, [D, R === On ? void 0 : d && R[0] === On ? [] : R, g]), R = D)
        } else N.run()
    };
    j.allowRecurse = !!t;
    let T;
    s === "sync" ? T = j : s === "post" ? T = () => me(j, l && l.suspense) : (j.pre = !0, l && (j.id = l.uid), T = () => os(j));
    const N = new Xr(u, T);
    t ? n ? j() : R = N.run() : s === "post" ? me(N.run.bind(N), l && l.suspense) : N.run();
    const k = () => {
        N.stop(), l && l.scope && Vr(l.scope.effects, N)
    };
    return b && b.push(k), k
}

function Tl(e, t, n) {
    const r = this.proxy, s = oe(e) ? e.includes(".") ? hi(r, e) : () => r[e] : e.bind(r, r);
    let o;
    U(t) ? o = t : (o = t.handler, n = t);
    const i = ie;
    $t(this);
    const c = di(s, o.bind(r), n);
    return i ? $t(i) : yt(), c
}

function hi(e, t) {
    const n = t.split(".");
    return () => {
        let r = e;
        for (let s = 0; s < n.length && r; s++) r = r[n[s]];
        return r
    }
}

function gt(e, t) {
    if (!Z(e) || e.__v_skip || (t = t || new Set, t.has(e))) return e;
    if (t.add(e), ae(e)) gt(e.value, t); else if (B(e)) for (let n = 0; n < e.length; n++) gt(e[n], t); else if (Lo(e) || Nt(e)) e.forEach(n => {
        gt(n, t)
    }); else if ($o(e)) for (const n in e) gt(e[n], t);
    return e
}

function xh(e, t) {
    const n = fe;
    if (n === null) return e;
    const r = Xn(n) || n.proxy, s = e.dirs || (e.dirs = []);
    for (let o = 0; o < t.length; o++) {
        let [i, c, l, u = X] = t[o];
        i && (U(i) && (i = {mounted: i, updated: i}), i.deep && gt(c), s.push({
            dir: i,
            instance: r,
            value: c,
            oldValue: void 0,
            arg: l,
            modifiers: u
        }))
    }
    return e
}

function dt(e, t, n, r) {
    const s = e.dirs, o = t && t.dirs;
    for (let i = 0; i < s.length; i++) {
        const c = s[i];
        o && (c.oldValue = o[i].value);
        let l = c.dir[r];
        l && (Kt(), Pe(l, n, 8, [e.el, c, e, t]), qt())
    }
}

function bt(e, t) {
    return U(e) ? (() => se({name: e.name}, t, {setup: e}))() : e
}

const en = e => !!e.type.__asyncLoader, pi = e => e.type.__isKeepAlive;

function Il(e, t) {
    mi(e, "a", t)
}

function Nl(e, t) {
    mi(e, "da", t)
}

function mi(e, t, n = ie) {
    const r = e.__wdc || (e.__wdc = () => {
        let s = n;
        for (; s;) {
            if (s.isDeactivated) return;
            s = s.parent
        }
        return e()
    });
    if (Gn(t, r, n), n) {
        let s = n.parent;
        for (; s && s.parent;) pi(s.parent.vnode) && Fl(r, t, n, s), s = s.parent
    }
}

function Fl(e, t, n, r) {
    const s = Gn(t, e, r, !0);
    gi(() => {
        Vr(r[t], s)
    }, n)
}

function Gn(e, t, n = ie, r = !1) {
    if (n) {
        const s = n[e] || (n[e] = []), o = t.__weh || (t.__weh = (...i) => {
            if (n.isUnmounted) return;
            Kt(), $t(n);
            const c = Pe(t, n, e, i);
            return yt(), qt(), c
        });
        return r ? s.unshift(o) : s.push(o), o
    }
}

const Qe = e => (t, n = ie) => (!fn || e === "sp") && Gn(e, (...r) => t(...r), n), Ml = Qe("bm"), Ll = Qe("m"),
    jl = Qe("bu"), Dl = Qe("u"), $l = Qe("bum"), gi = Qe("um"), Bl = Qe("sp"), Ul = Qe("rtg"), kl = Qe("rtc");

function Hl(e, t = ie) {
    Gn("ec", e, t)
}

const Kl = "components", ql = "directives", zl = Symbol.for("v-ndc");

function Sh(e) {
    return Vl(ql, e)
}

function Vl(e, t, n = !0, r = !1) {
    const s = fe || ie;
    if (s) {
        const o = s.type;
        if (e === Kl) {
            const c = Eu(o, !1);
            if (c && (c === t || c === ke(t) || c === Kn(ke(t)))) return o
        }
        const i = Ds(s[e] || o[e], t) || Ds(s.appContext[e], t);
        return !i && r ? o : i
    }
}

function Ds(e, t) {
    return e && (e[t] || e[ke(t)] || e[Kn(ke(t))])
}

function _i(e, t, n = {}, r, s) {
    if (fe.isCE || fe.parent && en(fe.parent) && fe.parent.isCE) return t !== "default" && (n.name = t), ee("slot", n, r && r());
    let o = e[t];
    o && o._c && (o._d = !1), Te();
    const i = o && yi(o(n)),
        c = as(we, {key: n.key || i && i.key || `_${t}`}, i || (r ? r() : []), i && e._ === 1 ? 64 : -2);
    return !s && c.scopeId && (c.slotScopeIds = [c.scopeId + "-s"]), o && o._c && (o._d = !0), c
}

function yi(e) {
    return e.some(t => jn(t) ? !(t.type === lt || t.type === we && !yi(t.children)) : !0) ? e : null
}

const Ar = e => e ? Ti(e) ? Xn(e) || e.proxy : Ar(e.parent) : null, tn = se(Object.create(null), {
    $: e => e,
    $el: e => e.vnode.el,
    $data: e => e.data,
    $props: e => e.props,
    $attrs: e => e.attrs,
    $slots: e => e.slots,
    $refs: e => e.refs,
    $parent: e => Ar(e.parent),
    $root: e => Ar(e.root),
    $emit: e => e.emit,
    $options: e => ls(e),
    $forceUpdate: e => e.f || (e.f = () => os(e.update)),
    $nextTick: e => e.n || (e.n = ci.bind(e.proxy)),
    $watch: e => Tl.bind(e)
}), ar = (e, t) => e !== X && !e.__isScriptSetup && K(e, t), Wl = {
    get({_: e}, t) {
        const {ctx: n, setupState: r, data: s, props: o, accessCache: i, type: c, appContext: l} = e;
        let u;
        if (t[0] !== "$") {
            const g = i[t];
            if (g !== void 0) switch (g) {
                case 1:
                    return r[t];
                case 2:
                    return s[t];
                case 4:
                    return n[t];
                case 3:
                    return o[t]
            } else {
                if (ar(r, t)) return i[t] = 1, r[t];
                if (s !== X && K(s, t)) return i[t] = 2, s[t];
                if ((u = e.propsOptions[0]) && K(u, t)) return i[t] = 3, o[t];
                if (n !== X && K(n, t)) return i[t] = 4, n[t];
                Tr && (i[t] = 0)
            }
        }
        const a = tn[t];
        let d, p;
        if (a) return t === "$attrs" && ge(e, "get", t), a(e);
        if ((d = c.__cssModules) && (d = d[t])) return d;
        if (n !== X && K(n, t)) return i[t] = 4, n[t];
        if (p = l.config.globalProperties, K(p, t)) return p[t]
    }, set({_: e}, t, n) {
        const {data: r, setupState: s, ctx: o} = e;
        return ar(s, t) ? (s[t] = n, !0) : r !== X && K(r, t) ? (r[t] = n, !0) : K(e.props, t) || t[0] === "$" && t.slice(1) in e ? !1 : (o[t] = n, !0)
    }, has({_: {data: e, setupState: t, accessCache: n, ctx: r, appContext: s, propsOptions: o}}, i) {
        let c;
        return !!n[i] || e !== X && K(e, i) || ar(t, i) || (c = o[0]) && K(c, i) || K(r, i) || K(tn, i) || K(s.config.globalProperties, i)
    }, defineProperty(e, t, n) {
        return n.get != null ? e._.accessCache[t] = 0 : K(n, "value") && this.set(e, t, n.value, null), Reflect.defineProperty(e, t, n)
    }
};

function $s(e) {
    return B(e) ? e.reduce((t, n) => (t[n] = null, t), {}) : e
}

let Tr = !0;

function Jl(e) {
    const t = ls(e), n = e.proxy, r = e.ctx;
    Tr = !1, t.beforeCreate && Bs(t.beforeCreate, e, "bc");
    const {
        data: s,
        computed: o,
        methods: i,
        watch: c,
        provide: l,
        inject: u,
        created: a,
        beforeMount: d,
        mounted: p,
        beforeUpdate: g,
        updated: b,
        activated: R,
        deactivated: j,
        beforeDestroy: T,
        beforeUnmount: N,
        destroyed: k,
        unmounted: D,
        render: ce,
        renderTracked: de,
        renderTriggered: Ne,
        errorCaptured: Ke,
        serverPrefetch: wt,
        expose: Fe,
        inheritAttrs: Ye,
        components: ft,
        directives: Me,
        filters: Wt
    } = t;
    if (u && Gl(u, r, null), i) for (const Q in i) {
        const V = i[Q];
        U(V) && (r[Q] = V.bind(n))
    }
    if (s) {
        const Q = s.call(n, n);
        Z(Q) && (e.data = pn(Q))
    }
    if (Tr = !0, o) for (const Q in o) {
        const V = o[Q], qe = U(V) ? V.bind(n, n) : U(V.get) ? V.get.bind(n, n) : Ce,
            Xe = !U(V) && U(V.set) ? V.set.bind(n) : Ce, Le = Re({get: qe, set: Xe});
        Object.defineProperty(r, Q, {enumerable: !0, configurable: !0, get: () => Le.value, set: pe => Le.value = pe})
    }
    if (c) for (const Q in c) bi(c[Q], r, n, Q);
    if (l) {
        const Q = U(l) ? l.call(n) : l;
        Reflect.ownKeys(Q).forEach(V => {
            xn(V, Q[V])
        })
    }
    a && Bs(a, e, "c");

    function re(Q, V) {
        B(V) ? V.forEach(qe => Q(qe.bind(n))) : V && Q(V.bind(n))
    }

    if (re(Ml, d), re(Ll, p), re(jl, g), re(Dl, b), re(Il, R), re(Nl, j), re(Hl, Ke), re(kl, de), re(Ul, Ne), re($l, N), re(gi, D), re(Bl, wt), B(Fe)) if (Fe.length) {
        const Q = e.exposed || (e.exposed = {});
        Fe.forEach(V => {
            Object.defineProperty(Q, V, {get: () => n[V], set: qe => n[V] = qe})
        })
    } else e.exposed || (e.exposed = {});
    ce && e.render === Ce && (e.render = ce), Ye != null && (e.inheritAttrs = Ye), ft && (e.components = ft), Me && (e.directives = Me)
}

function Gl(e, t, n = Ce) {
    B(e) && (e = Ir(e));
    for (const r in e) {
        const s = e[r];
        let o;
        Z(s) ? "default" in s ? o = Ue(s.from || r, s.default, !0) : o = Ue(s.from || r) : o = Ue(s), ae(o) ? Object.defineProperty(t, r, {
            enumerable: !0,
            configurable: !0,
            get: () => o.value,
            set: i => o.value = i
        }) : t[r] = o
    }
}

function Bs(e, t, n) {
    Pe(B(e) ? e.map(r => r.bind(t.proxy)) : e.bind(t.proxy), t, n)
}

function bi(e, t, n, r) {
    const s = r.includes(".") ? hi(n, r) : () => n[r];
    if (oe(e)) {
        const o = t[e];
        U(o) && Lt(s, o)
    } else if (U(e)) Lt(s, e.bind(n)); else if (Z(e)) if (B(e)) e.forEach(o => bi(o, t, n, r)); else {
        const o = U(e.handler) ? e.handler.bind(n) : t[e.handler];
        U(o) && Lt(s, o, e)
    }
}

function ls(e) {
    const t = e.type, {mixins: n, extends: r} = t, {
        mixins: s,
        optionsCache: o,
        config: {optionMergeStrategies: i}
    } = e.appContext, c = o.get(t);
    let l;
    return c ? l = c : !s.length && !n && !r ? l = t : (l = {}, s.length && s.forEach(u => Mn(l, u, i, !0)), Mn(l, t, i)), Z(t) && o.set(t, l), l
}

function Mn(e, t, n, r = !1) {
    const {mixins: s, extends: o} = t;
    o && Mn(e, o, n, !0), s && s.forEach(i => Mn(e, i, n, !0));
    for (const i in t) if (!(r && i === "expose")) {
        const c = Ql[i] || n && n[i];
        e[i] = c ? c(e[i], t[i]) : t[i]
    }
    return e
}

const Ql = {
    data: Us,
    props: ks,
    emits: ks,
    methods: Zt,
    computed: Zt,
    beforeCreate: he,
    created: he,
    beforeMount: he,
    mounted: he,
    beforeUpdate: he,
    updated: he,
    beforeDestroy: he,
    beforeUnmount: he,
    destroyed: he,
    unmounted: he,
    activated: he,
    deactivated: he,
    errorCaptured: he,
    serverPrefetch: he,
    components: Zt,
    directives: Zt,
    watch: Xl,
    provide: Us,
    inject: Yl
};

function Us(e, t) {
    return t ? e ? function () {
        return se(U(e) ? e.call(this, this) : e, U(t) ? t.call(this, this) : t)
    } : t : e
}

function Yl(e, t) {
    return Zt(Ir(e), Ir(t))
}

function Ir(e) {
    if (B(e)) {
        const t = {};
        for (let n = 0; n < e.length; n++) t[e[n]] = e[n];
        return t
    }
    return e
}

function he(e, t) {
    return e ? [...new Set([].concat(e, t))] : t
}

function Zt(e, t) {
    return e ? se(Object.create(null), e, t) : t
}

function ks(e, t) {
    return e ? B(e) && B(t) ? [...new Set([...e, ...t])] : se(Object.create(null), $s(e), $s(t ?? {})) : t
}

function Xl(e, t) {
    if (!e) return t;
    if (!t) return e;
    const n = se(Object.create(null), e);
    for (const r in t) n[r] = he(e[r], t[r]);
    return n
}

function vi() {
    return {
        app: null,
        config: {
            isNativeTag: Rc,
            performance: !1,
            globalProperties: {},
            optionMergeStrategies: {},
            errorHandler: void 0,
            warnHandler: void 0,
            compilerOptions: {}
        },
        mixins: [],
        components: {},
        directives: {},
        provides: Object.create(null),
        optionsCache: new WeakMap,
        propsCache: new WeakMap,
        emitsCache: new WeakMap
    }
}

let Zl = 0;

function eu(e, t) {
    return function (r, s = null) {
        U(r) || (r = se({}, r)), s != null && !Z(s) && (s = null);
        const o = vi(), i = new Set;
        let c = !1;
        const l = o.app = {
            _uid: Zl++,
            _component: r,
            _props: s,
            _container: null,
            _context: o,
            _instance: null,
            version: xu,
            get config() {
                return o.config
            },
            set config(u) {
            },
            use(u, ...a) {
                return i.has(u) || (u && U(u.install) ? (i.add(u), u.install(l, ...a)) : U(u) && (i.add(u), u(l, ...a))), l
            },
            mixin(u) {
                return o.mixins.includes(u) || o.mixins.push(u), l
            },
            component(u, a) {
                return a ? (o.components[u] = a, l) : o.components[u]
            },
            directive(u, a) {
                return a ? (o.directives[u] = a, l) : o.directives[u]
            },
            mount(u, a, d) {
                if (!c) {
                    const p = ee(r, s);
                    return p.appContext = o, a && t ? t(p, u) : e(p, u, d), c = !0, l._container = u, u.__vue_app__ = l, Xn(p.component) || p.component.proxy
                }
            },
            unmount() {
                c && (e(null, l._container), delete l._container.__vue_app__)
            },
            provide(u, a) {
                return o.provides[u] = a, l
            },
            runWithContext(u) {
                Ln = l;
                try {
                    return u()
                } finally {
                    Ln = null
                }
            }
        };
        return l
    }
}

let Ln = null;

function xn(e, t) {
    if (ie) {
        let n = ie.provides;
        const r = ie.parent && ie.parent.provides;
        r === n && (n = ie.provides = Object.create(r)), n[e] = t
    }
}

function Ue(e, t, n = !1) {
    const r = ie || fe;
    if (r || Ln) {
        const s = r ? r.parent == null ? r.vnode.appContext && r.vnode.appContext.provides : r.parent.provides : Ln._context.provides;
        if (s && e in s) return s[e];
        if (arguments.length > 1) return n && U(t) ? t.call(r && r.proxy) : t
    }
}

function tu(e, t, n, r = !1) {
    const s = {}, o = {};
    In(o, Yn, 1), e.propsDefaults = Object.create(null), Ei(e, t, s, o);
    for (const i in e.propsOptions[0]) i in s || (s[i] = void 0);
    n ? e.props = r ? s : Xo(s) : e.type.props ? e.props = s : e.props = o, e.attrs = o
}

function nu(e, t, n, r) {
    const {props: s, attrs: o, vnode: {patchFlag: i}} = e, c = z(s), [l] = e.propsOptions;
    let u = !1;
    if ((r || i > 0) && !(i & 16)) {
        if (i & 8) {
            const a = e.vnode.dynamicProps;
            for (let d = 0; d < a.length; d++) {
                let p = a[d];
                if (Vn(e.emitsOptions, p)) continue;
                const g = t[p];
                if (l) if (K(o, p)) g !== o[p] && (o[p] = g, u = !0); else {
                    const b = ke(p);
                    s[b] = Nr(l, c, b, g, e, !1)
                } else g !== o[p] && (o[p] = g, u = !0)
            }
        }
    } else {
        Ei(e, t, s, o) && (u = !0);
        let a;
        for (const d in c) (!t || !K(t, d) && ((a = Ht(d)) === d || !K(t, a))) && (l ? n && (n[d] !== void 0 || n[a] !== void 0) && (s[d] = Nr(l, c, d, void 0, e, !0)) : delete s[d]);
        if (o !== c) for (const d in o) (!t || !K(t, d)) && (delete o[d], u = !0)
    }
    u && Ge(e, "set", "$attrs")
}

function Ei(e, t, n, r) {
    const [s, o] = e.propsOptions;
    let i = !1, c;
    if (t) for (let l in t) {
        if (Rn(l)) continue;
        const u = t[l];
        let a;
        s && K(s, a = ke(l)) ? !o || !o.includes(a) ? n[a] = u : (c || (c = {}))[a] = u : Vn(e.emitsOptions, l) || (!(l in r) || u !== r[l]) && (r[l] = u, i = !0)
    }
    if (o) {
        const l = z(n), u = c || X;
        for (let a = 0; a < o.length; a++) {
            const d = o[a];
            n[d] = Nr(s, l, d, u[d], e, !K(u, d))
        }
    }
    return i
}

function Nr(e, t, n, r, s, o) {
    const i = e[n];
    if (i != null) {
        const c = K(i, "default");
        if (c && r === void 0) {
            const l = i.default;
            if (i.type !== Function && !i.skipFactory && U(l)) {
                const {propsDefaults: u} = s;
                n in u ? r = u[n] : ($t(s), r = u[n] = l.call(null, t), yt())
            } else r = l
        }
        i[0] && (o && !c ? r = !1 : i[1] && (r === "" || r === Ht(n)) && (r = !0))
    }
    return r
}

function wi(e, t, n = !1) {
    const r = t.propsCache, s = r.get(e);
    if (s) return s;
    const o = e.props, i = {}, c = [];
    let l = !1;
    if (!U(e)) {
        const a = d => {
            l = !0;
            const [p, g] = wi(d, t, !0);
            se(i, p), g && c.push(...g)
        };
        !n && t.mixins.length && t.mixins.forEach(a), e.extends && a(e.extends), e.mixins && e.mixins.forEach(a)
    }
    if (!o && !l) return Z(e) && r.set(e, It), It;
    if (B(o)) for (let a = 0; a < o.length; a++) {
        const d = ke(o[a]);
        Hs(d) && (i[d] = X)
    } else if (o) for (const a in o) {
        const d = ke(a);
        if (Hs(d)) {
            const p = o[a], g = i[d] = B(p) || U(p) ? {type: p} : se({}, p);
            if (g) {
                const b = zs(Boolean, g.type), R = zs(String, g.type);
                g[0] = b > -1, g[1] = R < 0 || b < R, (b > -1 || K(g, "default")) && c.push(d)
            }
        }
    }
    const u = [i, c];
    return Z(e) && r.set(e, u), u
}

function Hs(e) {
    return e[0] !== "$"
}

function Ks(e) {
    const t = e && e.toString().match(/^\s*(function|class) (\w+)/);
    return t ? t[2] : e === null ? "null" : ""
}

function qs(e, t) {
    return Ks(e) === Ks(t)
}

function zs(e, t) {
    return B(t) ? t.findIndex(n => qs(n, e)) : U(t) && qs(t, e) ? 0 : -1
}

const Oi = e => e[0] === "_" || e === "$stable", us = e => B(e) ? e.map($e) : [$e(e)], ru = (e, t, n) => {
    if (t._n) return t;
    const r = Jn((...s) => us(t(...s)), n);
    return r._c = !1, r
}, Ri = (e, t, n) => {
    const r = e._ctx;
    for (const s in e) {
        if (Oi(s)) continue;
        const o = e[s];
        if (U(o)) t[s] = ru(s, o, r); else if (o != null) {
            const i = us(o);
            t[s] = () => i
        }
    }
}, xi = (e, t) => {
    const n = us(t);
    e.slots.default = () => n
}, su = (e, t) => {
    if (e.vnode.shapeFlag & 32) {
        const n = t._;
        n ? (e.slots = z(t), In(t, "_", n)) : Ri(t, e.slots = {})
    } else e.slots = {}, t && xi(e, t);
    In(e.slots, Yn, 1)
}, ou = (e, t, n) => {
    const {vnode: r, slots: s} = e;
    let o = !0, i = X;
    if (r.shapeFlag & 32) {
        const c = t._;
        c ? n && c === 1 ? o = !1 : (se(s, t), !n && c === 1 && delete s._) : (o = !t.$stable, Ri(t, s)), i = t
    } else t && (xi(e, t), i = {default: 1});
    if (o) for (const c in s) !Oi(c) && !(c in i) && delete s[c]
};

function Fr(e, t, n, r, s = !1) {
    if (B(e)) {
        e.forEach((p, g) => Fr(p, t && (B(t) ? t[g] : t), n, r, s));
        return
    }
    if (en(r) && !s) return;
    const o = r.shapeFlag & 4 ? Xn(r.component) || r.component.proxy : r.el, i = s ? null : o, {i: c, r: l} = e,
        u = t && t.r, a = c.refs === X ? c.refs = {} : c.refs, d = c.setupState;
    if (u != null && u !== l && (oe(u) ? (a[u] = null, K(d, u) && (d[u] = null)) : ae(u) && (u.value = null)), U(l)) it(l, c, 12, [i, a]); else {
        const p = oe(l), g = ae(l);
        if (p || g) {
            const b = () => {
                if (e.f) {
                    const R = p ? K(d, l) ? d[l] : a[l] : l.value;
                    s ? B(R) && Vr(R, o) : B(R) ? R.includes(o) || R.push(o) : p ? (a[l] = [o], K(d, l) && (d[l] = a[l])) : (l.value = [o], e.k && (a[e.k] = l.value))
                } else p ? (a[l] = i, K(d, l) && (d[l] = i)) : g && (l.value = i, e.k && (a[e.k] = i))
            };
            i ? (b.id = -1, me(b, n)) : b()
        }
    }
}

const me = Al;

function iu(e) {
    return cu(e)
}

function cu(e, t) {
    const n = Or();
    n.__VUE__ = !0;
    const {
            insert: r,
            remove: s,
            patchProp: o,
            createElement: i,
            createText: c,
            createComment: l,
            setText: u,
            setElementText: a,
            parentNode: d,
            nextSibling: p,
            setScopeId: g = Ce,
            insertStaticContent: b
        } = e, R = (f, h, m, _ = null, E = null, w = null, P = !1, x = null, S = !!h.dynamicChildren) => {
            if (f === h) return;
            f && !Gt(f, h) && (_ = v(f), pe(f, E, w, !0), f = null), h.patchFlag === -2 && (S = !1, h.dynamicChildren = null);
            const {type: O, ref: M, shapeFlag: I} = h;
            switch (O) {
                case Qn:
                    j(f, h, m, _);
                    break;
                case lt:
                    T(f, h, m, _);
                    break;
                case fr:
                    f == null && N(h, m, _, P);
                    break;
                case we:
                    ft(f, h, m, _, E, w, P, x, S);
                    break;
                default:
                    I & 1 ? ce(f, h, m, _, E, w, P, x, S) : I & 6 ? Me(f, h, m, _, E, w, P, x, S) : (I & 64 || I & 128) && O.process(f, h, m, _, E, w, P, x, S, C)
            }
            M != null && E && Fr(M, f && f.ref, w, h || f, !h)
        }, j = (f, h, m, _) => {
            if (f == null) r(h.el = c(h.children), m, _); else {
                const E = h.el = f.el;
                h.children !== f.children && u(E, h.children)
            }
        }, T = (f, h, m, _) => {
            f == null ? r(h.el = l(h.children || ""), m, _) : h.el = f.el
        }, N = (f, h, m, _) => {
            [f.el, f.anchor] = b(f.children, h, m, _, f.el, f.anchor)
        }, k = ({el: f, anchor: h}, m, _) => {
            let E;
            for (; f && f !== h;) E = p(f), r(f, m, _), f = E;
            r(h, m, _)
        }, D = ({el: f, anchor: h}) => {
            let m;
            for (; f && f !== h;) m = p(f), s(f), f = m;
            s(h)
        }, ce = (f, h, m, _, E, w, P, x, S) => {
            P = P || h.type === "svg", f == null ? de(h, m, _, E, w, P, x, S) : wt(f, h, E, w, P, x, S)
        }, de = (f, h, m, _, E, w, P, x) => {
            let S, O;
            const {type: M, props: I, shapeFlag: L, transition: $, dirs: H} = f;
            if (S = f.el = i(f.type, w, I && I.is, I), L & 8 ? a(S, f.children) : L & 16 && Ke(f.children, S, null, _, E, w && M !== "foreignObject", P, x), H && dt(f, null, _, "created"), Ne(S, f, f.scopeId, P, _), I) {
                for (const G in I) G !== "value" && !Rn(G) && o(S, G, null, I[G], w, f.children, _, E, le);
                "value" in I && o(S, "value", null, I.value), (O = I.onVnodeBeforeMount) && De(O, _, f)
            }
            H && dt(f, null, _, "beforeMount");
            const Y = (!E || E && !E.pendingBranch) && $ && !$.persisted;
            Y && $.beforeEnter(S), r(S, h, m), ((O = I && I.onVnodeMounted) || Y || H) && me(() => {
                O && De(O, _, f), Y && $.enter(S), H && dt(f, null, _, "mounted")
            }, E)
        }, Ne = (f, h, m, _, E) => {
            if (m && g(f, m), _) for (let w = 0; w < _.length; w++) g(f, _[w]);
            if (E) {
                let w = E.subTree;
                if (h === w) {
                    const P = E.vnode;
                    Ne(f, P, P.scopeId, P.slotScopeIds, E.parent)
                }
            }
        }, Ke = (f, h, m, _, E, w, P, x, S = 0) => {
            for (let O = S; O < f.length; O++) {
                const M = f[O] = x ? nt(f[O]) : $e(f[O]);
                R(null, M, h, m, _, E, w, P, x)
            }
        }, wt = (f, h, m, _, E, w, P) => {
            const x = h.el = f.el;
            let {patchFlag: S, dynamicChildren: O, dirs: M} = h;
            S |= f.patchFlag & 16;
            const I = f.props || X, L = h.props || X;
            let $;
            m && ht(m, !1), ($ = L.onVnodeBeforeUpdate) && De($, m, h, f), M && dt(h, f, m, "beforeUpdate"), m && ht(m, !0);
            const H = E && h.type !== "foreignObject";
            if (O ? Fe(f.dynamicChildren, O, x, m, _, H, w) : P || V(f, h, x, null, m, _, H, w, !1), S > 0) {
                if (S & 16) Ye(x, h, I, L, m, _, E); else if (S & 2 && I.class !== L.class && o(x, "class", null, L.class, E), S & 4 && o(x, "style", I.style, L.style, E), S & 8) {
                    const Y = h.dynamicProps;
                    for (let G = 0; G < Y.length; G++) {
                        const te = Y[G], ve = I[te], St = L[te];
                        (St !== ve || te === "value") && o(x, te, ve, St, E, f.children, m, _, le)
                    }
                }
                S & 1 && f.children !== h.children && a(x, h.children)
            } else !P && O == null && Ye(x, h, I, L, m, _, E);
            (($ = L.onVnodeUpdated) || M) && me(() => {
                $ && De($, m, h, f), M && dt(h, f, m, "updated")
            }, _)
        }, Fe = (f, h, m, _, E, w, P) => {
            for (let x = 0; x < h.length; x++) {
                const S = f[x], O = h[x], M = S.el && (S.type === we || !Gt(S, O) || S.shapeFlag & 70) ? d(S.el) : m;
                R(S, O, M, null, _, E, w, P, !0)
            }
        }, Ye = (f, h, m, _, E, w, P) => {
            if (m !== _) {
                if (m !== X) for (const x in m) !Rn(x) && !(x in _) && o(f, x, m[x], null, P, h.children, E, w, le);
                for (const x in _) {
                    if (Rn(x)) continue;
                    const S = _[x], O = m[x];
                    S !== O && x !== "value" && o(f, x, O, S, P, h.children, E, w, le)
                }
                "value" in _ && o(f, "value", m.value, _.value)
            }
        }, ft = (f, h, m, _, E, w, P, x, S) => {
            const O = h.el = f ? f.el : c(""), M = h.anchor = f ? f.anchor : c("");
            let {patchFlag: I, dynamicChildren: L, slotScopeIds: $} = h;
            $ && (x = x ? x.concat($) : $), f == null ? (r(O, m, _), r(M, m, _), Ke(h.children, m, M, E, w, P, x, S)) : I > 0 && I & 64 && L && f.dynamicChildren ? (Fe(f.dynamicChildren, L, m, E, w, P, x), (h.key != null || E && h === E.subTree) && Si(f, h, !0)) : V(f, h, m, M, E, w, P, x, S)
        }, Me = (f, h, m, _, E, w, P, x, S) => {
            h.slotScopeIds = x, f == null ? h.shapeFlag & 512 ? E.ctx.activate(h, m, _, P, S) : Wt(h, m, _, E, w, P, S) : Ot(f, h, S)
        }, Wt = (f, h, m, _, E, w, P) => {
            const x = f.component = gu(f, _, E);
            if (pi(f) && (x.ctx.renderer = C), _u(x), x.asyncDep) {
                if (E && E.registerDep(x, re), !f.el) {
                    const S = x.subTree = ee(lt);
                    T(null, S, h, m)
                }
                return
            }
            re(x, f, h, m, E, w, P)
        }, Ot = (f, h, m) => {
            const _ = h.component = f.component;
            if (Sl(f, h, m)) if (_.asyncDep && !_.asyncResolved) {
                Q(_, h, m);
                return
            } else _.next = h, vl(_.update), _.update(); else h.el = f.el, _.vnode = h
        }, re = (f, h, m, _, E, w, P) => {
            const x = () => {
                if (f.isMounted) {
                    let {next: M, bu: I, u: L, parent: $, vnode: H} = f, Y = M, G;
                    ht(f, !1), M ? (M.el = H.el, Q(f, M, P)) : M = H, I && lr(I), (G = M.props && M.props.onVnodeBeforeUpdate) && De(G, $, M, H), ht(f, !0);
                    const te = ur(f), ve = f.subTree;
                    f.subTree = te, R(ve, te, d(ve.el), v(ve), f, E, w), M.el = te.el, Y === null && Cl(f, te.el), L && me(L, E), (G = M.props && M.props.onVnodeUpdated) && me(() => De(G, $, M, H), E)
                } else {
                    let M;
                    const {el: I, props: L} = h, {bm: $, m: H, parent: Y} = f, G = en(h);
                    if (ht(f, !1), $ && lr($), !G && (M = L && L.onVnodeBeforeMount) && De(M, Y, h), ht(f, !0), I && W) {
                        const te = () => {
                            f.subTree = ur(f), W(I, f.subTree, f, E, null)
                        };
                        G ? h.type.__asyncLoader().then(() => !f.isUnmounted && te()) : te()
                    } else {
                        const te = f.subTree = ur(f);
                        R(null, te, m, _, f, E, w), h.el = te.el
                    }
                    if (H && me(H, E), !G && (M = L && L.onVnodeMounted)) {
                        const te = h;
                        me(() => De(M, Y, te), E)
                    }
                    (h.shapeFlag & 256 || Y && en(Y.vnode) && Y.vnode.shapeFlag & 256) && f.a && me(f.a, E), f.isMounted = !0, h = m = _ = null
                }
            }, S = f.effect = new Xr(x, () => os(O), f.scope), O = f.update = () => S.run();
            O.id = f.uid, ht(f, !0), O()
        }, Q = (f, h, m) => {
            h.component = f;
            const _ = f.vnode.props;
            f.vnode = h, f.next = null, nu(f, h.props, _, m), ou(f, h.children, m), Kt(), Ls(), qt()
        }, V = (f, h, m, _, E, w, P, x, S = !1) => {
            const O = f && f.children, M = f ? f.shapeFlag : 0, I = h.children, {patchFlag: L, shapeFlag: $} = h;
            if (L > 0) {
                if (L & 128) {
                    Xe(O, I, m, _, E, w, P, x, S);
                    return
                } else if (L & 256) {
                    qe(O, I, m, _, E, w, P, x, S);
                    return
                }
            }
            $ & 8 ? (M & 16 && le(O, E, w), I !== O && a(m, I)) : M & 16 ? $ & 16 ? Xe(O, I, m, _, E, w, P, x, S) : le(O, E, w, !0) : (M & 8 && a(m, ""), $ & 16 && Ke(I, m, _, E, w, P, x, S))
        }, qe = (f, h, m, _, E, w, P, x, S) => {
            f = f || It, h = h || It;
            const O = f.length, M = h.length, I = Math.min(O, M);
            let L;
            for (L = 0; L < I; L++) {
                const $ = h[L] = S ? nt(h[L]) : $e(h[L]);
                R(f[L], $, m, null, E, w, P, x, S)
            }
            O > M ? le(f, E, w, !0, !1, I) : Ke(h, m, _, E, w, P, x, S, I)
        }, Xe = (f, h, m, _, E, w, P, x, S) => {
            let O = 0;
            const M = h.length;
            let I = f.length - 1, L = M - 1;
            for (; O <= I && O <= L;) {
                const $ = f[O], H = h[O] = S ? nt(h[O]) : $e(h[O]);
                if (Gt($, H)) R($, H, m, null, E, w, P, x, S); else break;
                O++
            }
            for (; O <= I && O <= L;) {
                const $ = f[I], H = h[L] = S ? nt(h[L]) : $e(h[L]);
                if (Gt($, H)) R($, H, m, null, E, w, P, x, S); else break;
                I--, L--
            }
            if (O > I) {
                if (O <= L) {
                    const $ = L + 1, H = $ < M ? h[$].el : _;
                    for (; O <= L;) R(null, h[O] = S ? nt(h[O]) : $e(h[O]), m, H, E, w, P, x, S), O++
                }
            } else if (O > L) for (; O <= I;) pe(f[O], E, w, !0), O++; else {
                const $ = O, H = O, Y = new Map;
                for (O = H; O <= L; O++) {
                    const ye = h[O] = S ? nt(h[O]) : $e(h[O]);
                    ye.key != null && Y.set(ye.key, O)
                }
                let G, te = 0;
                const ve = L - H + 1;
                let St = !1, Rs = 0;
                const Jt = new Array(ve);
                for (O = 0; O < ve; O++) Jt[O] = 0;
                for (O = $; O <= I; O++) {
                    const ye = f[O];
                    if (te >= ve) {
                        pe(ye, E, w, !0);
                        continue
                    }
                    let je;
                    if (ye.key != null) je = Y.get(ye.key); else for (G = H; G <= L; G++) if (Jt[G - H] === 0 && Gt(ye, h[G])) {
                        je = G;
                        break
                    }
                    je === void 0 ? pe(ye, E, w, !0) : (Jt[je - H] = O + 1, je >= Rs ? Rs = je : St = !0, R(ye, h[je], m, null, E, w, P, x, S), te++)
                }
                const xs = St ? lu(Jt) : It;
                for (G = xs.length - 1, O = ve - 1; O >= 0; O--) {
                    const ye = H + O, je = h[ye], Ss = ye + 1 < M ? h[ye + 1].el : _;
                    Jt[O] === 0 ? R(null, je, m, Ss, E, w, P, x, S) : St && (G < 0 || O !== xs[G] ? Le(je, m, Ss, 2) : G--)
                }
            }
        }, Le = (f, h, m, _, E = null) => {
            const {el: w, type: P, transition: x, children: S, shapeFlag: O} = f;
            if (O & 6) {
                Le(f.component.subTree, h, m, _);
                return
            }
            if (O & 128) {
                f.suspense.move(h, m, _);
                return
            }
            if (O & 64) {
                P.move(f, h, m, C);
                return
            }
            if (P === we) {
                r(w, h, m);
                for (let I = 0; I < S.length; I++) Le(S[I], h, m, _);
                r(f.anchor, h, m);
                return
            }
            if (P === fr) {
                k(f, h, m);
                return
            }
            if (_ !== 2 && O & 1 && x) if (_ === 0) x.beforeEnter(w), r(w, h, m), me(() => x.enter(w), E); else {
                const {leave: I, delayLeave: L, afterLeave: $} = x, H = () => r(w, h, m), Y = () => {
                    I(w, () => {
                        H(), $ && $()
                    })
                };
                L ? L(w, H, Y) : Y()
            } else r(w, h, m)
        }, pe = (f, h, m, _ = !1, E = !1) => {
            const {type: w, props: P, ref: x, children: S, dynamicChildren: O, shapeFlag: M, patchFlag: I, dirs: L} = f;
            if (x != null && Fr(x, null, m, f, !0), M & 256) {
                h.ctx.deactivate(f);
                return
            }
            const $ = M & 1 && L, H = !en(f);
            let Y;
            if (H && (Y = P && P.onVnodeBeforeUnmount) && De(Y, h, f), M & 6) _n(f.component, m, _); else {
                if (M & 128) {
                    f.suspense.unmount(m, _);
                    return
                }
                $ && dt(f, null, h, "beforeUnmount"), M & 64 ? f.type.remove(f, h, m, E, C, _) : O && (w !== we || I > 0 && I & 64) ? le(O, h, m, !1, !0) : (w === we && I & 384 || !E && M & 16) && le(S, h, m), _ && Rt(f)
            }
            (H && (Y = P && P.onVnodeUnmounted) || $) && me(() => {
                Y && De(Y, h, f), $ && dt(f, null, h, "unmounted")
            }, m)
        }, Rt = f => {
            const {type: h, el: m, anchor: _, transition: E} = f;
            if (h === we) {
                xt(m, _);
                return
            }
            if (h === fr) {
                D(f);
                return
            }
            const w = () => {
                s(m), E && !E.persisted && E.afterLeave && E.afterLeave()
            };
            if (f.shapeFlag & 1 && E && !E.persisted) {
                const {leave: P, delayLeave: x} = E, S = () => P(m, w);
                x ? x(f.el, w, S) : S()
            } else w()
        }, xt = (f, h) => {
            let m;
            for (; f !== h;) m = p(f), s(f), f = m;
            s(h)
        }, _n = (f, h, m) => {
            const {bum: _, scope: E, update: w, subTree: P, um: x} = f;
            _ && lr(_), E.stop(), w && (w.active = !1, pe(P, f, h, m)), x && me(x, h), me(() => {
                f.isUnmounted = !0
            }, h), h && h.pendingBranch && !h.isUnmounted && f.asyncDep && !f.asyncResolved && f.suspenseId === h.pendingId && (h.deps--, h.deps === 0 && h.resolve())
        }, le = (f, h, m, _ = !1, E = !1, w = 0) => {
            for (let P = w; P < f.length; P++) pe(f[P], h, m, _, E)
        }, v = f => f.shapeFlag & 6 ? v(f.component.subTree) : f.shapeFlag & 128 ? f.suspense.next() : p(f.anchor || f.el),
        A = (f, h, m) => {
            f == null ? h._vnode && pe(h._vnode, null, null, !0) : R(h._vnode || null, f, h, null, null, null, m), Ls(), ui(), h._vnode = f
        }, C = {p: R, um: pe, m: Le, r: Rt, mt: Wt, mc: Ke, pc: V, pbc: Fe, n: v, o: e};
    let F, W;
    return t && ([F, W] = t(C)), {render: A, hydrate: F, createApp: eu(A, F)}
}

function ht({effect: e, update: t}, n) {
    e.allowRecurse = t.allowRecurse = n
}

function Si(e, t, n = !1) {
    const r = e.children, s = t.children;
    if (B(r) && B(s)) for (let o = 0; o < r.length; o++) {
        const i = r[o];
        let c = s[o];
        c.shapeFlag & 1 && !c.dynamicChildren && ((c.patchFlag <= 0 || c.patchFlag === 32) && (c = s[o] = nt(s[o]), c.el = i.el), n || Si(i, c)), c.type === Qn && (c.el = i.el)
    }
}

function lu(e) {
    const t = e.slice(), n = [0];
    let r, s, o, i, c;
    const l = e.length;
    for (r = 0; r < l; r++) {
        const u = e[r];
        if (u !== 0) {
            if (s = n[n.length - 1], e[s] < u) {
                t[r] = s, n.push(r);
                continue
            }
            for (o = 0, i = n.length - 1; o < i;) c = o + i >> 1, e[n[c]] < u ? o = c + 1 : i = c;
            u < e[n[o]] && (o > 0 && (t[r] = n[o - 1]), n[o] = r)
        }
    }
    for (o = n.length, i = n[o - 1]; o-- > 0;) n[o] = i, i = t[i];
    return n
}

const uu = e => e.__isTeleport, we = Symbol.for("v-fgt"), Qn = Symbol.for("v-txt"), lt = Symbol.for("v-cmt"),
    fr = Symbol.for("v-stc"), nn = [];
let xe = null;

function Te(e = !1) {
    nn.push(xe = e ? null : [])
}

function au() {
    nn.pop(), xe = nn[nn.length - 1] || null
}

let an = 1;

function Vs(e) {
    an += e
}

function Ci(e) {
    return e.dynamicChildren = an > 0 ? xe || It : null, au(), an > 0 && xe && xe.push(e), e
}

function ut(e, t, n, r, s, o) {
    return Ci(vt(e, t, n, r, s, o, !0))
}

function as(e, t, n, r, s) {
    return Ci(ee(e, t, n, r, s, !0))
}

function jn(e) {
    return e ? e.__v_isVNode === !0 : !1
}

function Gt(e, t) {
    return e.type === t.type && e.key === t.key
}

const Yn = "__vInternal", Pi = ({key: e}) => e ?? null, Sn = ({
                                                                  ref: e,
                                                                  ref_key: t,
                                                                  ref_for: n
                                                              }) => (typeof e == "number" && (e = "" + e), e != null ? oe(e) || ae(e) || U(e) ? {
    i: fe,
    r: e,
    k: t,
    f: !!n
} : e : null);

function vt(e, t = null, n = null, r = 0, s = null, o = e === we ? 0 : 1, i = !1, c = !1) {
    const l = {
        __v_isVNode: !0,
        __v_skip: !0,
        type: e,
        props: t,
        key: t && Pi(t),
        ref: t && Sn(t),
        scopeId: Wn,
        slotScopeIds: null,
        children: n,
        component: null,
        suspense: null,
        ssContent: null,
        ssFallback: null,
        dirs: null,
        transition: null,
        el: null,
        anchor: null,
        target: null,
        targetAnchor: null,
        staticCount: 0,
        shapeFlag: o,
        patchFlag: r,
        dynamicProps: s,
        dynamicChildren: null,
        appContext: null,
        ctx: fe
    };
    return c ? (fs(l, n), o & 128 && e.normalize(l)) : n && (l.shapeFlag |= oe(n) ? 8 : 16), an > 0 && !i && xe && (l.patchFlag > 0 || o & 6) && l.patchFlag !== 32 && xe.push(l), l
}

const ee = fu;

function fu(e, t = null, n = null, r = 0, s = null, o = !1) {
    if ((!e || e === zl) && (e = lt), jn(e)) {
        const c = Dt(e, t, !0);
        return n && fs(c, n), an > 0 && !o && xe && (c.shapeFlag & 6 ? xe[xe.indexOf(e)] = c : xe.push(c)), c.patchFlag |= -2, c
    }
    if (wu(e) && (e = e.__vccOpts), t) {
        t = du(t);
        let {class: c, style: l} = t;
        c && !oe(c) && (t.class = Qr(c)), Z(l) && (ei(l) && !B(l) && (l = se({}, l)), t.style = Gr(l))
    }
    const i = oe(e) ? 1 : Pl(e) ? 128 : uu(e) ? 64 : Z(e) ? 4 : U(e) ? 2 : 0;
    return vt(e, t, n, r, s, i, o, !0)
}

function du(e) {
    return e ? ei(e) || Yn in e ? se({}, e) : e : null
}

function Dt(e, t, n = !1) {
    const {props: r, ref: s, patchFlag: o, children: i} = e, c = t ? hu(r || {}, t) : r;
    return {
        __v_isVNode: !0,
        __v_skip: !0,
        type: e.type,
        props: c,
        key: c && Pi(c),
        ref: t && t.ref ? n && s ? B(s) ? s.concat(Sn(t)) : [s, Sn(t)] : Sn(t) : s,
        scopeId: e.scopeId,
        slotScopeIds: e.slotScopeIds,
        children: i,
        target: e.target,
        targetAnchor: e.targetAnchor,
        staticCount: e.staticCount,
        shapeFlag: e.shapeFlag,
        patchFlag: t && e.type !== we ? o === -1 ? 16 : o | 16 : o,
        dynamicProps: e.dynamicProps,
        dynamicChildren: e.dynamicChildren,
        appContext: e.appContext,
        dirs: e.dirs,
        transition: e.transition,
        component: e.component,
        suspense: e.suspense,
        ssContent: e.ssContent && Dt(e.ssContent),
        ssFallback: e.ssFallback && Dt(e.ssFallback),
        el: e.el,
        anchor: e.anchor,
        ctx: e.ctx,
        ce: e.ce
    }
}

function Ai(e = " ", t = 0) {
    return ee(Qn, null, e, t)
}

function Ch(e = "", t = !1) {
    return t ? (Te(), as(lt, null, e)) : ee(lt, null, e)
}

function $e(e) {
    return e == null || typeof e == "boolean" ? ee(lt) : B(e) ? ee(we, null, e.slice()) : typeof e == "object" ? nt(e) : ee(Qn, null, String(e))
}

function nt(e) {
    return e.el === null && e.patchFlag !== -1 || e.memo ? e : Dt(e)
}

function fs(e, t) {
    let n = 0;
    const {shapeFlag: r} = e;
    if (t == null) t = null; else if (B(t)) n = 16; else if (typeof t == "object") if (r & 65) {
        const s = t.default;
        s && (s._c && (s._d = !1), fs(e, s()), s._c && (s._d = !0));
        return
    } else {
        n = 32;
        const s = t._;
        !s && !(Yn in t) ? t._ctx = fe : s === 3 && fe && (fe.slots._ === 1 ? t._ = 1 : (t._ = 2, e.patchFlag |= 1024))
    } else U(t) ? (t = {default: t, _ctx: fe}, n = 32) : (t = String(t), r & 64 ? (n = 16, t = [Ai(t)]) : n = 8);
    e.children = t, e.shapeFlag |= n
}

function hu(...e) {
    const t = {};
    for (let n = 0; n < e.length; n++) {
        const r = e[n];
        for (const s in r) if (s === "class") t.class !== r.class && (t.class = Qr([t.class, r.class])); else if (s === "style") t.style = Gr([t.style, r.style]); else if (Un(s)) {
            const o = t[s], i = r[s];
            i && o !== i && !(B(o) && o.includes(i)) && (t[s] = o ? [].concat(o, i) : i)
        } else s !== "" && (t[s] = r[s])
    }
    return t
}

function De(e, t, n, r = null) {
    Pe(e, t, 7, [n, r])
}

const pu = vi();
let mu = 0;

function gu(e, t, n) {
    const r = e.type, s = (t ? t.appContext : e.appContext) || pu, o = {
        uid: mu++,
        vnode: e,
        type: r,
        parent: t,
        appContext: s,
        root: null,
        next: null,
        subTree: null,
        effect: null,
        update: null,
        scope: new Dc(!0),
        render: null,
        proxy: null,
        exposed: null,
        exposeProxy: null,
        withProxy: null,
        provides: t ? t.provides : Object.create(s.provides),
        accessCache: null,
        renderCache: [],
        components: null,
        directives: null,
        propsOptions: wi(r, s),
        emitsOptions: fi(r, s),
        emit: null,
        emitted: null,
        propsDefaults: X,
        inheritAttrs: r.inheritAttrs,
        ctx: X,
        data: X,
        props: X,
        attrs: X,
        slots: X,
        refs: X,
        setupState: X,
        setupContext: null,
        attrsProxy: null,
        slotsProxy: null,
        suspense: n,
        suspenseId: n ? n.pendingId : 0,
        asyncDep: null,
        asyncResolved: !1,
        isMounted: !1,
        isUnmounted: !1,
        isDeactivated: !1,
        bc: null,
        c: null,
        bm: null,
        m: null,
        bu: null,
        u: null,
        um: null,
        bum: null,
        da: null,
        a: null,
        rtg: null,
        rtc: null,
        ec: null,
        sp: null
    };
    return o.ctx = {_: o}, o.root = t ? t.root : o, o.emit = Ol.bind(null, o), e.ce && e.ce(o), o
}

let ie = null, ds, Ct, Ws = "__VUE_INSTANCE_SETTERS__";
(Ct = Or()[Ws]) || (Ct = Or()[Ws] = []), Ct.push(e => ie = e), ds = e => {
    Ct.length > 1 ? Ct.forEach(t => t(e)) : Ct[0](e)
};
const $t = e => {
    ds(e), e.scope.on()
}, yt = () => {
    ie && ie.scope.off(), ds(null)
};

function Ti(e) {
    return e.vnode.shapeFlag & 4
}

let fn = !1;

function _u(e, t = !1) {
    fn = t;
    const {props: n, children: r} = e.vnode, s = Ti(e);
    tu(e, n, s, t), su(e, r);
    const o = s ? yu(e, t) : void 0;
    return fn = !1, o
}

function yu(e, t) {
    const n = e.type;
    e.accessCache = Object.create(null), e.proxy = ti(new Proxy(e.ctx, Wl));
    const {setup: r} = n;
    if (r) {
        const s = e.setupContext = r.length > 1 ? vu(e) : null;
        $t(e), Kt();
        const o = it(r, e, 0, [e.props, s]);
        if (qt(), yt(), jo(o)) {
            if (o.then(yt, yt), t) return o.then(i => {
                Js(e, i, t)
            }).catch(i => {
                zn(i, e, 0)
            });
            e.asyncDep = o
        } else Js(e, o, t)
    } else Ii(e, t)
}

function Js(e, t, n) {
    U(t) ? e.type.__ssrInlineRender ? e.ssrRender = t : e.render = t : Z(t) && (e.setupState = oi(t)), Ii(e, n)
}

let Gs;

function Ii(e, t, n) {
    const r = e.type;
    if (!e.render) {
        if (!t && Gs && !r.render) {
            const s = r.template || ls(e).template;
            if (s) {
                const {isCustomElement: o, compilerOptions: i} = e.appContext.config, {
                    delimiters: c,
                    compilerOptions: l
                } = r, u = se(se({isCustomElement: o, delimiters: c}, i), l);
                r.render = Gs(s, u)
            }
        }
        e.render = r.render || Ce
    }
    $t(e), Kt(), Jl(e), qt(), yt()
}

function bu(e) {
    return e.attrsProxy || (e.attrsProxy = new Proxy(e.attrs, {
        get(t, n) {
            return ge(e, "get", "$attrs"), t[n]
        }
    }))
}

function vu(e) {
    const t = n => {
        e.exposed = n || {}
    };
    return {
        get attrs() {
            return bu(e)
        }, slots: e.slots, emit: e.emit, expose: t
    }
}

function Xn(e) {
    if (e.exposed) return e.exposeProxy || (e.exposeProxy = new Proxy(oi(ti(e.exposed)), {
        get(t, n) {
            if (n in t) return t[n];
            if (n in tn) return tn[n](e)
        }, has(t, n) {
            return n in t || n in tn
        }
    }))
}

function Eu(e, t = !0) {
    return U(e) ? e.displayName || e.name : e.name || t && e.__name
}

function wu(e) {
    return U(e) && "__vccOpts" in e
}

const Re = (e, t) => _l(e, t, fn);

function Ni(e, t, n) {
    const r = arguments.length;
    return r === 2 ? Z(t) && !B(t) ? jn(t) ? ee(e, null, [t]) : ee(e, t) : ee(e, null, t) : (r > 3 ? n = Array.prototype.slice.call(arguments, 2) : r === 3 && jn(n) && (n = [n]), ee(e, t, n))
}

const Ou = Symbol.for("v-scx"), Ru = () => Ue(Ou), xu = "3.3.4", Su = "http://www.w3.org/2000/svg",
    mt = typeof document < "u" ? document : null, Qs = mt && mt.createElement("template"), Cu = {
        insert: (e, t, n) => {
            t.insertBefore(e, n || null)
        },
        remove: e => {
            const t = e.parentNode;
            t && t.removeChild(e)
        },
        createElement: (e, t, n, r) => {
            const s = t ? mt.createElementNS(Su, e) : mt.createElement(e, n ? {is: n} : void 0);
            return e === "select" && r && r.multiple != null && s.setAttribute("multiple", r.multiple), s
        },
        createText: e => mt.createTextNode(e),
        createComment: e => mt.createComment(e),
        setText: (e, t) => {
            e.nodeValue = t
        },
        setElementText: (e, t) => {
            e.textContent = t
        },
        parentNode: e => e.parentNode,
        nextSibling: e => e.nextSibling,
        querySelector: e => mt.querySelector(e),
        setScopeId(e, t) {
            e.setAttribute(t, "")
        },
        insertStaticContent(e, t, n, r, s, o) {
            const i = n ? n.previousSibling : t.lastChild;
            if (s && (s === o || s.nextSibling)) for (; t.insertBefore(s.cloneNode(!0), n), !(s === o || !(s = s.nextSibling));) ; else {
                Qs.innerHTML = r ? `<svg>${e}</svg>` : e;
                const c = Qs.content;
                if (r) {
                    const l = c.firstChild;
                    for (; l.firstChild;) c.appendChild(l.firstChild);
                    c.removeChild(l)
                }
                t.insertBefore(c, n)
            }
            return [i ? i.nextSibling : t.firstChild, n ? n.previousSibling : t.lastChild]
        }
    };

function Pu(e, t, n) {
    const r = e._vtc;
    r && (t = (t ? [t, ...r] : [...r]).join(" ")), t == null ? e.removeAttribute("class") : n ? e.setAttribute("class", t) : e.className = t
}

function Au(e, t, n) {
    const r = e.style, s = oe(n);
    if (n && !s) {
        if (t && !oe(t)) for (const o in t) n[o] == null && Mr(r, o, "");
        for (const o in n) Mr(r, o, n[o])
    } else {
        const o = r.display;
        s ? t !== n && (r.cssText = n) : t && e.removeAttribute("style"), "_vod" in e && (r.display = o)
    }
}

const Ys = /\s*!important$/;

function Mr(e, t, n) {
    if (B(n)) n.forEach(r => Mr(e, t, r)); else if (n == null && (n = ""), t.startsWith("--")) e.setProperty(t, n); else {
        const r = Tu(e, t);
        Ys.test(n) ? e.setProperty(Ht(r), n.replace(Ys, ""), "important") : e[r] = n
    }
}

const Xs = ["Webkit", "Moz", "ms"], dr = {};

function Tu(e, t) {
    const n = dr[t];
    if (n) return n;
    let r = ke(t);
    if (r !== "filter" && r in e) return dr[t] = r;
    r = Kn(r);
    for (let s = 0; s < Xs.length; s++) {
        const o = Xs[s] + r;
        if (o in e) return dr[t] = o
    }
    return t
}

const Zs = "http://www.w3.org/1999/xlink";

function Iu(e, t, n, r, s) {
    if (r && t.startsWith("xlink:")) n == null ? e.removeAttributeNS(Zs, t.slice(6, t.length)) : e.setAttributeNS(Zs, t, n); else {
        const o = jc(t);
        n == null || o && !Bo(n) ? e.removeAttribute(t) : e.setAttribute(t, o ? "" : n)
    }
}

function Nu(e, t, n, r, s, o, i) {
    if (t === "innerHTML" || t === "textContent") {
        r && i(r, s, o), e[t] = n ?? "";
        return
    }
    const c = e.tagName;
    if (t === "value" && c !== "PROGRESS" && !c.includes("-")) {
        e._value = n;
        const u = c === "OPTION" ? e.getAttribute("value") : e.value, a = n ?? "";
        u !== a && (e.value = a), n == null && e.removeAttribute(t);
        return
    }
    let l = !1;
    if (n === "" || n == null) {
        const u = typeof e[t];
        u === "boolean" ? n = Bo(n) : n == null && u === "string" ? (n = "", l = !0) : u === "number" && (n = 0, l = !0)
    }
    try {
        e[t] = n
    } catch {
    }
    l && e.removeAttribute(t)
}

function Fu(e, t, n, r) {
    e.addEventListener(t, n, r)
}

function Mu(e, t, n, r) {
    e.removeEventListener(t, n, r)
}

function Lu(e, t, n, r, s = null) {
    const o = e._vei || (e._vei = {}), i = o[t];
    if (r && i) i.value = r; else {
        const [c, l] = ju(t);
        if (r) {
            const u = o[t] = Bu(r, s);
            Fu(e, c, u, l)
        } else i && (Mu(e, c, i, l), o[t] = void 0)
    }
}

const eo = /(?:Once|Passive|Capture)$/;

function ju(e) {
    let t;
    if (eo.test(e)) {
        t = {};
        let r;
        for (; r = e.match(eo);) e = e.slice(0, e.length - r[0].length), t[r[0].toLowerCase()] = !0
    }
    return [e[2] === ":" ? e.slice(3) : Ht(e.slice(2)), t]
}

let hr = 0;
const Du = Promise.resolve(), $u = () => hr || (Du.then(() => hr = 0), hr = Date.now());

function Bu(e, t) {
    const n = r => {
        if (!r._vts) r._vts = Date.now(); else if (r._vts <= n.attached) return;
        Pe(Uu(r, n.value), t, 5, [r])
    };
    return n.value = e, n.attached = $u(), n
}

function Uu(e, t) {
    if (B(t)) {
        const n = e.stopImmediatePropagation;
        return e.stopImmediatePropagation = () => {
            n.call(e), e._stopped = !0
        }, t.map(r => s => !s._stopped && r && r(s))
    } else return t
}

const to = /^on[a-z]/, ku = (e, t, n, r, s = !1, o, i, c, l) => {
    t === "class" ? Pu(e, r, s) : t === "style" ? Au(e, n, r) : Un(t) ? zr(t) || Lu(e, t, n, r, i) : (t[0] === "." ? (t = t.slice(1), !0) : t[0] === "^" ? (t = t.slice(1), !1) : Hu(e, t, r, s)) ? Nu(e, t, r, o, i, c, l) : (t === "true-value" ? e._trueValue = r : t === "false-value" && (e._falseValue = r), Iu(e, t, r, s))
};

function Hu(e, t, n, r) {
    return r ? !!(t === "innerHTML" || t === "textContent" || t in e && to.test(t) && U(n)) : t === "spellcheck" || t === "draggable" || t === "translate" || t === "form" || t === "list" && e.tagName === "INPUT" || t === "type" && e.tagName === "TEXTAREA" || to.test(t) && oe(n) ? !1 : t in e
}

const Ku = se({patchProp: ku}, Cu);
let no;

function qu() {
    return no || (no = iu(Ku))
}

const zu = (...e) => {
    const t = qu().createApp(...e), {mount: n} = t;
    return t.mount = r => {
        const s = Vu(r);
        if (!s) return;
        const o = t._component;
        !U(o) && !o.render && !o.template && (o.template = s.innerHTML), s.innerHTML = "";
        const i = n(s, !1, s instanceof SVGElement);
        return s instanceof Element && (s.removeAttribute("v-cloak"), s.setAttribute("data-v-app", "")), i
    }, t
};

function Vu(e) {
    return oe(e) ? document.querySelector(e) : e
}

function Wu() {
    return Fi().__VUE_DEVTOOLS_GLOBAL_HOOK__
}

function Fi() {
    return typeof navigator < "u" && typeof window < "u" ? window : typeof global < "u" ? global : {}
}

const Ju = typeof Proxy == "function", Gu = "devtools-plugin:setup", Qu = "plugin:settings:set";
let Pt, Lr;

function Yu() {
    var e;
    return Pt !== void 0 || (typeof window < "u" && window.performance ? (Pt = !0, Lr = window.performance) : typeof global < "u" && (!((e = global.perf_hooks) === null || e === void 0) && e.performance) ? (Pt = !0, Lr = global.perf_hooks.performance) : Pt = !1), Pt
}

function Xu() {
    return Yu() ? Lr.now() : Date.now()
}

class Zu {
    constructor(t, n) {
        this.target = null, this.targetQueue = [], this.onQueue = [], this.plugin = t, this.hook = n;
        const r = {};
        if (t.settings) for (const i in t.settings) {
            const c = t.settings[i];
            r[i] = c.defaultValue
        }
        const s = `__vue-devtools-plugin-settings__${t.id}`;
        let o = Object.assign({}, r);
        try {
            const i = localStorage.getItem(s), c = JSON.parse(i);
            Object.assign(o, c)
        } catch {
        }
        this.fallbacks = {
            getSettings() {
                return o
            }, setSettings(i) {
                try {
                    localStorage.setItem(s, JSON.stringify(i))
                } catch {
                }
                o = i
            }, now() {
                return Xu()
            }
        }, n && n.on(Qu, (i, c) => {
            i === this.plugin.id && this.fallbacks.setSettings(c)
        }), this.proxiedOn = new Proxy({}, {
            get: (i, c) => this.target ? this.target.on[c] : (...l) => {
                this.onQueue.push({method: c, args: l})
            }
        }), this.proxiedTarget = new Proxy({}, {
            get: (i, c) => this.target ? this.target[c] : c === "on" ? this.proxiedOn : Object.keys(this.fallbacks).includes(c) ? (...l) => (this.targetQueue.push({
                method: c,
                args: l,
                resolve: () => {
                }
            }), this.fallbacks[c](...l)) : (...l) => new Promise(u => {
                this.targetQueue.push({method: c, args: l, resolve: u})
            })
        })
    }

    async setRealTarget(t) {
        this.target = t;
        for (const n of this.onQueue) this.target.on[n.method](...n.args);
        for (const n of this.targetQueue) n.resolve(await this.target[n.method](...n.args))
    }
}

function ea(e, t) {
    const n = e, r = Fi(), s = Wu(), o = Ju && n.enableEarlyProxy;
    if (s && (r.__VUE_DEVTOOLS_PLUGIN_API_AVAILABLE__ || !o)) s.emit(Gu, e, t); else {
        const i = o ? new Zu(n, s) : null;
        (r.__VUE_DEVTOOLS_PLUGINS__ = r.__VUE_DEVTOOLS_PLUGINS__ || []).push({
            pluginDescriptor: n,
            setupFn: t,
            proxy: i
        }), i && t(i.proxiedTarget)
    }
}/*!
  * vue-router v4.2.4
  * (c) 2023 Eduardo San Martin Morote
  * @license MIT
  */
const Tt = typeof window < "u";

function ta(e) {
    return e.__esModule || e[Symbol.toStringTag] === "Module"
}

const J = Object.assign;

function pr(e, t) {
    const n = {};
    for (const r in t) {
        const s = t[r];
        n[r] = Ae(s) ? s.map(e) : e(s)
    }
    return n
}

const rn = () => {
}, Ae = Array.isArray, na = /\/$/, ra = e => e.replace(na, "");

function mr(e, t, n = "/") {
    let r, s = {}, o = "", i = "";
    const c = t.indexOf("#");
    let l = t.indexOf("?");
    return c < l && c >= 0 && (l = -1), l > -1 && (r = t.slice(0, l), o = t.slice(l + 1, c > -1 ? c : t.length), s = e(o)), c > -1 && (r = r || t.slice(0, c), i = t.slice(c, t.length)), r = ca(r ?? t, n), {
        fullPath: r + (o && "?") + o + i,
        path: r,
        query: s,
        hash: i
    }
}

function sa(e, t) {
    const n = t.query ? e(t.query) : "";
    return t.path + (n && "?") + n + (t.hash || "")
}

function ro(e, t) {
    return !t || !e.toLowerCase().startsWith(t.toLowerCase()) ? e : e.slice(t.length) || "/"
}

function oa(e, t, n) {
    const r = t.matched.length - 1, s = n.matched.length - 1;
    return r > -1 && r === s && Bt(t.matched[r], n.matched[s]) && Mi(t.params, n.params) && e(t.query) === e(n.query) && t.hash === n.hash
}

function Bt(e, t) {
    return (e.aliasOf || e) === (t.aliasOf || t)
}

function Mi(e, t) {
    if (Object.keys(e).length !== Object.keys(t).length) return !1;
    for (const n in e) if (!ia(e[n], t[n])) return !1;
    return !0
}

function ia(e, t) {
    return Ae(e) ? so(e, t) : Ae(t) ? so(t, e) : e === t
}

function so(e, t) {
    return Ae(t) ? e.length === t.length && e.every((n, r) => n === t[r]) : e.length === 1 && e[0] === t
}

function ca(e, t) {
    if (e.startsWith("/")) return e;
    if (!e) return t;
    const n = t.split("/"), r = e.split("/"), s = r[r.length - 1];
    (s === ".." || s === ".") && r.push("");
    let o = n.length - 1, i, c;
    for (i = 0; i < r.length; i++) if (c = r[i], c !== ".") if (c === "..") o > 1 && o--; else break;
    return n.slice(0, o).join("/") + "/" + r.slice(i - (i === r.length ? 1 : 0)).join("/")
}

var dn;
(function (e) {
    e.pop = "pop", e.push = "push"
})(dn || (dn = {}));
var sn;
(function (e) {
    e.back = "back", e.forward = "forward", e.unknown = ""
})(sn || (sn = {}));

function la(e) {
    if (!e) if (Tt) {
        const t = document.querySelector("base");
        e = t && t.getAttribute("href") || "/", e = e.replace(/^\w+:\/\/[^\/]+/, "")
    } else e = "/";
    return e[0] !== "/" && e[0] !== "#" && (e = "/" + e), ra(e)
}

const ua = /^[^#]+#/;

function aa(e, t) {
    return e.replace(ua, "#") + t
}

function fa(e, t) {
    const n = document.documentElement.getBoundingClientRect(), r = e.getBoundingClientRect();
    return {behavior: t.behavior, left: r.left - n.left - (t.left || 0), top: r.top - n.top - (t.top || 0)}
}

const Zn = () => ({left: window.pageXOffset, top: window.pageYOffset});

function da(e) {
    let t;
    if ("el" in e) {
        const n = e.el, r = typeof n == "string" && n.startsWith("#"),
            s = typeof n == "string" ? r ? document.getElementById(n.slice(1)) : document.querySelector(n) : n;
        if (!s) return;
        t = fa(s, e)
    } else t = e;
    "scrollBehavior" in document.documentElement.style ? window.scrollTo(t) : window.scrollTo(t.left != null ? t.left : window.pageXOffset, t.top != null ? t.top : window.pageYOffset)
}

function oo(e, t) {
    return (history.state ? history.state.position - t : -1) + e
}

const jr = new Map;

function ha(e, t) {
    jr.set(e, t)
}

function pa(e) {
    const t = jr.get(e);
    return jr.delete(e), t
}

let ma = () => location.protocol + "//" + location.host;

function Li(e, t) {
    const {pathname: n, search: r, hash: s} = t, o = e.indexOf("#");
    if (o > -1) {
        let c = s.includes(e.slice(o)) ? e.slice(o).length : 1, l = s.slice(c);
        return l[0] !== "/" && (l = "/" + l), ro(l, "")
    }
    return ro(n, e) + r + s
}

function ga(e, t, n, r) {
    let s = [], o = [], i = null;
    const c = ({state: p}) => {
        const g = Li(e, location), b = n.value, R = t.value;
        let j = 0;
        if (p) {
            if (n.value = g, t.value = p, i && i === b) {
                i = null;
                return
            }
            j = R ? p.position - R.position : 0
        } else r(g);
        s.forEach(T => {
            T(n.value, b, {delta: j, type: dn.pop, direction: j ? j > 0 ? sn.forward : sn.back : sn.unknown})
        })
    };

    function l() {
        i = n.value
    }

    function u(p) {
        s.push(p);
        const g = () => {
            const b = s.indexOf(p);
            b > -1 && s.splice(b, 1)
        };
        return o.push(g), g
    }

    function a() {
        const {history: p} = window;
        p.state && p.replaceState(J({}, p.state, {scroll: Zn()}), "")
    }

    function d() {
        for (const p of o) p();
        o = [], window.removeEventListener("popstate", c), window.removeEventListener("beforeunload", a)
    }

    return window.addEventListener("popstate", c), window.addEventListener("beforeunload", a, {passive: !0}), {
        pauseListeners: l,
        listen: u,
        destroy: d
    }
}

function io(e, t, n, r = !1, s = !1) {
    return {back: e, current: t, forward: n, replaced: r, position: window.history.length, scroll: s ? Zn() : null}
}

function _a(e) {
    const {history: t, location: n} = window, r = {value: Li(e, n)}, s = {value: t.state};
    s.value || o(r.value, {
        back: null,
        current: r.value,
        forward: null,
        position: t.length - 1,
        replaced: !0,
        scroll: null
    }, !0);

    function o(l, u, a) {
        const d = e.indexOf("#"),
            p = d > -1 ? (n.host && document.querySelector("base") ? e : e.slice(d)) + l : ma() + e + l;
        try {
            t[a ? "replaceState" : "pushState"](u, "", p), s.value = u
        } catch (g) {
            console.error(g), n[a ? "replace" : "assign"](p)
        }
    }

    function i(l, u) {
        const a = J({}, t.state, io(s.value.back, l, s.value.forward, !0), u, {position: s.value.position});
        o(l, a, !0), r.value = l
    }

    function c(l, u) {
        const a = J({}, s.value, t.state, {forward: l, scroll: Zn()});
        o(a.current, a, !0);
        const d = J({}, io(r.value, l, null), {position: a.position + 1}, u);
        o(l, d, !1), r.value = l
    }

    return {location: r, state: s, push: c, replace: i}
}

function ya(e) {
    e = la(e);
    const t = _a(e), n = ga(e, t.state, t.location, t.replace);

    function r(o, i = !0) {
        i || n.pauseListeners(), history.go(o)
    }

    const s = J({location: "", base: e, go: r, createHref: aa.bind(null, e)}, t, n);
    return Object.defineProperty(s, "location", {
        enumerable: !0,
        get: () => t.location.value
    }), Object.defineProperty(s, "state", {enumerable: !0, get: () => t.state.value}), s
}

function ba(e) {
    return typeof e == "string" || e && typeof e == "object"
}

function ji(e) {
    return typeof e == "string" || typeof e == "symbol"
}

const et = {
    path: "/",
    name: void 0,
    params: {},
    query: {},
    hash: "",
    fullPath: "/",
    matched: [],
    meta: {},
    redirectedFrom: void 0
}, Di = Symbol("");
var co;
(function (e) {
    e[e.aborted = 4] = "aborted", e[e.cancelled = 8] = "cancelled", e[e.duplicated = 16] = "duplicated"
})(co || (co = {}));

function Ut(e, t) {
    return J(new Error, {type: e, [Di]: !0}, t)
}

function ze(e, t) {
    return e instanceof Error && Di in e && (t == null || !!(e.type & t))
}

const lo = "[^/]+?", va = {sensitive: !1, strict: !1, start: !0, end: !0}, Ea = /[.+*?^${}()[\]/\\]/g;

function wa(e, t) {
    const n = J({}, va, t), r = [];
    let s = n.start ? "^" : "";
    const o = [];
    for (const u of e) {
        const a = u.length ? [] : [90];
        n.strict && !u.length && (s += "/");
        for (let d = 0; d < u.length; d++) {
            const p = u[d];
            let g = 40 + (n.sensitive ? .25 : 0);
            if (p.type === 0) d || (s += "/"), s += p.value.replace(Ea, "\\$&"), g += 40; else if (p.type === 1) {
                const {value: b, repeatable: R, optional: j, regexp: T} = p;
                o.push({name: b, repeatable: R, optional: j});
                const N = T || lo;
                if (N !== lo) {
                    g += 10;
                    try {
                        new RegExp(`(${N})`)
                    } catch (D) {
                        throw new Error(`Invalid custom RegExp for param "${b}" (${N}): ` + D.message)
                    }
                }
                let k = R ? `((?:${N})(?:/(?:${N}))*)` : `(${N})`;
                d || (k = j && u.length < 2 ? `(?:/${k})` : "/" + k), j && (k += "?"), s += k, g += 20, j && (g += -8), R && (g += -20), N === ".*" && (g += -50)
            }
            a.push(g)
        }
        r.push(a)
    }
    if (n.strict && n.end) {
        const u = r.length - 1;
        r[u][r[u].length - 1] += .7000000000000001
    }
    n.strict || (s += "/?"), n.end ? s += "$" : n.strict && (s += "(?:/|$)");
    const i = new RegExp(s, n.sensitive ? "" : "i");

    function c(u) {
        const a = u.match(i), d = {};
        if (!a) return null;
        for (let p = 1; p < a.length; p++) {
            const g = a[p] || "", b = o[p - 1];
            d[b.name] = g && b.repeatable ? g.split("/") : g
        }
        return d
    }

    function l(u) {
        let a = "", d = !1;
        for (const p of e) {
            (!d || !a.endsWith("/")) && (a += "/"), d = !1;
            for (const g of p) if (g.type === 0) a += g.value; else if (g.type === 1) {
                const {value: b, repeatable: R, optional: j} = g, T = b in u ? u[b] : "";
                if (Ae(T) && !R) throw new Error(`Provided param "${b}" is an array but it is not repeatable (* or + modifiers)`);
                const N = Ae(T) ? T.join("/") : T;
                if (!N) if (j) p.length < 2 && (a.endsWith("/") ? a = a.slice(0, -1) : d = !0); else throw new Error(`Missing required param "${b}"`);
                a += N
            }
        }
        return a || "/"
    }

    return {re: i, score: r, keys: o, parse: c, stringify: l}
}

function Oa(e, t) {
    let n = 0;
    for (; n < e.length && n < t.length;) {
        const r = t[n] - e[n];
        if (r) return r;
        n++
    }
    return e.length < t.length ? e.length === 1 && e[0] === 40 + 40 ? -1 : 1 : e.length > t.length ? t.length === 1 && t[0] === 40 + 40 ? 1 : -1 : 0
}

function Ra(e, t) {
    let n = 0;
    const r = e.score, s = t.score;
    for (; n < r.length && n < s.length;) {
        const o = Oa(r[n], s[n]);
        if (o) return o;
        n++
    }
    if (Math.abs(s.length - r.length) === 1) {
        if (uo(r)) return 1;
        if (uo(s)) return -1
    }
    return s.length - r.length
}

function uo(e) {
    const t = e[e.length - 1];
    return e.length > 0 && t[t.length - 1] < 0
}

const xa = {type: 0, value: ""}, Sa = /[a-zA-Z0-9_]/;

function Ca(e) {
    if (!e) return [[]];
    if (e === "/") return [[xa]];
    if (!e.startsWith("/")) throw new Error(`Invalid path "${e}"`);

    function t(g) {
        throw new Error(`ERR (${n})/"${u}": ${g}`)
    }

    let n = 0, r = n;
    const s = [];
    let o;

    function i() {
        o && s.push(o), o = []
    }

    let c = 0, l, u = "", a = "";

    function d() {
        u && (n === 0 ? o.push({
            type: 0,
            value: u
        }) : n === 1 || n === 2 || n === 3 ? (o.length > 1 && (l === "*" || l === "+") && t(`A repeatable param (${u}) must be alone in its segment. eg: '/:ids+.`), o.push({
            type: 1,
            value: u,
            regexp: a,
            repeatable: l === "*" || l === "+",
            optional: l === "*" || l === "?"
        })) : t("Invalid state to consume buffer"), u = "")
    }

    function p() {
        u += l
    }

    for (; c < e.length;) {
        if (l = e[c++], l === "\\" && n !== 2) {
            r = n, n = 4;
            continue
        }
        switch (n) {
            case 0:
                l === "/" ? (u && d(), i()) : l === ":" ? (d(), n = 1) : p();
                break;
            case 4:
                p(), n = r;
                break;
            case 1:
                l === "(" ? n = 2 : Sa.test(l) ? p() : (d(), n = 0, l !== "*" && l !== "?" && l !== "+" && c--);
                break;
            case 2:
                l === ")" ? a[a.length - 1] == "\\" ? a = a.slice(0, -1) + l : n = 3 : a += l;
                break;
            case 3:
                d(), n = 0, l !== "*" && l !== "?" && l !== "+" && c--, a = "";
                break;
            default:
                t("Unknown state");
                break
        }
    }
    return n === 2 && t(`Unfinished custom RegExp for param "${u}"`), d(), i(), s
}

function Pa(e, t, n) {
    const r = wa(Ca(e.path), n), s = J(r, {record: e, parent: t, children: [], alias: []});
    return t && !s.record.aliasOf == !t.record.aliasOf && t.children.push(s), s
}

function Aa(e, t) {
    const n = [], r = new Map;
    t = ho({strict: !1, end: !0, sensitive: !1}, t);

    function s(a) {
        return r.get(a)
    }

    function o(a, d, p) {
        const g = !p, b = Ta(a);
        b.aliasOf = p && p.record;
        const R = ho(t, a), j = [b];
        if ("alias" in a) {
            const k = typeof a.alias == "string" ? [a.alias] : a.alias;
            for (const D of k) j.push(J({}, b, {
                components: p ? p.record.components : b.components,
                path: D,
                aliasOf: p ? p.record : b
            }))
        }
        let T, N;
        for (const k of j) {
            const {path: D} = k;
            if (d && D[0] !== "/") {
                const ce = d.record.path, de = ce[ce.length - 1] === "/" ? "" : "/";
                k.path = d.record.path + (D && de + D)
            }
            if (T = Pa(k, d, R), p ? p.alias.push(T) : (N = N || T, N !== T && N.alias.push(T), g && a.name && !fo(T) && i(a.name)), b.children) {
                const ce = b.children;
                for (let de = 0; de < ce.length; de++) o(ce[de], T, p && p.children[de])
            }
            p = p || T, (T.record.components && Object.keys(T.record.components).length || T.record.name || T.record.redirect) && l(T)
        }
        return N ? () => {
            i(N)
        } : rn
    }

    function i(a) {
        if (ji(a)) {
            const d = r.get(a);
            d && (r.delete(a), n.splice(n.indexOf(d), 1), d.children.forEach(i), d.alias.forEach(i))
        } else {
            const d = n.indexOf(a);
            d > -1 && (n.splice(d, 1), a.record.name && r.delete(a.record.name), a.children.forEach(i), a.alias.forEach(i))
        }
    }

    function c() {
        return n
    }

    function l(a) {
        let d = 0;
        for (; d < n.length && Ra(a, n[d]) >= 0 && (a.record.path !== n[d].record.path || !$i(a, n[d]));) d++;
        n.splice(d, 0, a), a.record.name && !fo(a) && r.set(a.record.name, a)
    }

    function u(a, d) {
        let p, g = {}, b, R;
        if ("name" in a && a.name) {
            if (p = r.get(a.name), !p) throw Ut(1, {location: a});
            R = p.record.name, g = J(ao(d.params, p.keys.filter(N => !N.optional).map(N => N.name)), a.params && ao(a.params, p.keys.map(N => N.name))), b = p.stringify(g)
        } else if ("path" in a) b = a.path, p = n.find(N => N.re.test(b)), p && (g = p.parse(b), R = p.record.name); else {
            if (p = d.name ? r.get(d.name) : n.find(N => N.re.test(d.path)), !p) throw Ut(1, {
                location: a,
                currentLocation: d
            });
            R = p.record.name, g = J({}, d.params, a.params), b = p.stringify(g)
        }
        const j = [];
        let T = p;
        for (; T;) j.unshift(T.record), T = T.parent;
        return {name: R, path: b, params: g, matched: j, meta: Na(j)}
    }

    return e.forEach(a => o(a)), {addRoute: o, resolve: u, removeRoute: i, getRoutes: c, getRecordMatcher: s}
}

function ao(e, t) {
    const n = {};
    for (const r of t) r in e && (n[r] = e[r]);
    return n
}

function Ta(e) {
    return {
        path: e.path,
        redirect: e.redirect,
        name: e.name,
        meta: e.meta || {},
        aliasOf: void 0,
        beforeEnter: e.beforeEnter,
        props: Ia(e),
        children: e.children || [],
        instances: {},
        leaveGuards: new Set,
        updateGuards: new Set,
        enterCallbacks: {},
        components: "components" in e ? e.components || null : e.component && {default: e.component}
    }
}

function Ia(e) {
    const t = {}, n = e.props || !1;
    if ("component" in e) t.default = n; else for (const r in e.components) t[r] = typeof n == "object" ? n[r] : n;
    return t
}

function fo(e) {
    for (; e;) {
        if (e.record.aliasOf) return !0;
        e = e.parent
    }
    return !1
}

function Na(e) {
    return e.reduce((t, n) => J(t, n.meta), {})
}

function ho(e, t) {
    const n = {};
    for (const r in e) n[r] = r in t ? t[r] : e[r];
    return n
}

function $i(e, t) {
    return t.children.some(n => n === e || $i(e, n))
}

const Bi = /#/g, Fa = /&/g, Ma = /\//g, La = /=/g, ja = /\?/g, Ui = /\+/g, Da = /%5B/g, $a = /%5D/g, ki = /%5E/g,
    Ba = /%60/g, Hi = /%7B/g, Ua = /%7C/g, Ki = /%7D/g, ka = /%20/g;

function hs(e) {
    return encodeURI("" + e).replace(Ua, "|").replace(Da, "[").replace($a, "]")
}

function Ha(e) {
    return hs(e).replace(Hi, "{").replace(Ki, "}").replace(ki, "^")
}

function Dr(e) {
    return hs(e).replace(Ui, "%2B").replace(ka, "+").replace(Bi, "%23").replace(Fa, "%26").replace(Ba, "`").replace(Hi, "{").replace(Ki, "}").replace(ki, "^")
}

function Ka(e) {
    return Dr(e).replace(La, "%3D")
}

function qa(e) {
    return hs(e).replace(Bi, "%23").replace(ja, "%3F")
}

function za(e) {
    return e == null ? "" : qa(e).replace(Ma, "%2F")
}

function Dn(e) {
    try {
        return decodeURIComponent("" + e)
    } catch {
    }
    return "" + e
}

function Va(e) {
    const t = {};
    if (e === "" || e === "?") return t;
    const r = (e[0] === "?" ? e.slice(1) : e).split("&");
    for (let s = 0; s < r.length; ++s) {
        const o = r[s].replace(Ui, " "), i = o.indexOf("="), c = Dn(i < 0 ? o : o.slice(0, i)),
            l = i < 0 ? null : Dn(o.slice(i + 1));
        if (c in t) {
            let u = t[c];
            Ae(u) || (u = t[c] = [u]), u.push(l)
        } else t[c] = l
    }
    return t
}

function po(e) {
    let t = "";
    for (let n in e) {
        const r = e[n];
        if (n = Ka(n), r == null) {
            r !== void 0 && (t += (t.length ? "&" : "") + n);
            continue
        }
        (Ae(r) ? r.map(o => o && Dr(o)) : [r && Dr(r)]).forEach(o => {
            o !== void 0 && (t += (t.length ? "&" : "") + n, o != null && (t += "=" + o))
        })
    }
    return t
}

function Wa(e) {
    const t = {};
    for (const n in e) {
        const r = e[n];
        r !== void 0 && (t[n] = Ae(r) ? r.map(s => s == null ? null : "" + s) : r == null ? r : "" + r)
    }
    return t
}

const Ja = Symbol(""), mo = Symbol(""), ps = Symbol(""), qi = Symbol(""), $r = Symbol("");

function Qt() {
    let e = [];

    function t(r) {
        return e.push(r), () => {
            const s = e.indexOf(r);
            s > -1 && e.splice(s, 1)
        }
    }

    function n() {
        e = []
    }

    return {add: t, list: () => e.slice(), reset: n}
}

function rt(e, t, n, r, s) {
    const o = r && (r.enterCallbacks[s] = r.enterCallbacks[s] || []);
    return () => new Promise((i, c) => {
        const l = d => {
            d === !1 ? c(Ut(4, {from: n, to: t})) : d instanceof Error ? c(d) : ba(d) ? c(Ut(2, {
                from: t,
                to: d
            })) : (o && r.enterCallbacks[s] === o && typeof d == "function" && o.push(d), i())
        }, u = e.call(r && r.instances[s], t, n, l);
        let a = Promise.resolve(u);
        e.length < 3 && (a = a.then(l)), a.catch(d => c(d))
    })
}

function gr(e, t, n, r) {
    const s = [];
    for (const o of e) for (const i in o.components) {
        let c = o.components[i];
        if (!(t !== "beforeRouteEnter" && !o.instances[i])) if (Ga(c)) {
            const u = (c.__vccOpts || c)[t];
            u && s.push(rt(u, n, r, o, i))
        } else {
            let l = c();
            s.push(() => l.then(u => {
                if (!u) return Promise.reject(new Error(`Couldn't resolve component "${i}" at "${o.path}"`));
                const a = ta(u) ? u.default : u;
                o.components[i] = a;
                const p = (a.__vccOpts || a)[t];
                return p && rt(p, n, r, o, i)()
            }))
        }
    }
    return s
}

function Ga(e) {
    return typeof e == "object" || "displayName" in e || "props" in e || "__vccOpts" in e
}

function go(e) {
    const t = Ue(ps), n = Ue(qi), r = Re(() => t.resolve(ot(e.to))), s = Re(() => {
            const {matched: l} = r.value, {length: u} = l, a = l[u - 1], d = n.matched;
            if (!a || !d.length) return -1;
            const p = d.findIndex(Bt.bind(null, a));
            if (p > -1) return p;
            const g = _o(l[u - 2]);
            return u > 1 && _o(a) === g && d[d.length - 1].path !== g ? d.findIndex(Bt.bind(null, l[u - 2])) : p
        }), o = Re(() => s.value > -1 && Xa(n.params, r.value.params)),
        i = Re(() => s.value > -1 && s.value === n.matched.length - 1 && Mi(n.params, r.value.params));

    function c(l = {}) {
        return Ya(l) ? t[ot(e.replace) ? "replace" : "push"](ot(e.to)).catch(rn) : Promise.resolve()
    }

    return {route: r, href: Re(() => r.value.href), isActive: o, isExactActive: i, navigate: c}
}

const Qa = bt({
    name: "RouterLink",
    compatConfig: {MODE: 3},
    props: {
        to: {type: [String, Object], required: !0},
        replace: Boolean,
        activeClass: String,
        exactActiveClass: String,
        custom: Boolean,
        ariaCurrentValue: {type: String, default: "page"}
    },
    useLink: go,
    setup(e, {slots: t}) {
        const n = pn(go(e)), {options: r} = Ue(ps), s = Re(() => ({
            [yo(e.activeClass, r.linkActiveClass, "router-link-active")]: n.isActive,
            [yo(e.exactActiveClass, r.linkExactActiveClass, "router-link-exact-active")]: n.isExactActive
        }));
        return () => {
            const o = t.default && t.default(n);
            return e.custom ? o : Ni("a", {
                "aria-current": n.isExactActive ? e.ariaCurrentValue : null,
                href: n.href,
                onClick: n.navigate,
                class: s.value
            }, o)
        }
    }
}), zi = Qa;

function Ya(e) {
    if (!(e.metaKey || e.altKey || e.ctrlKey || e.shiftKey) && !e.defaultPrevented && !(e.button !== void 0 && e.button !== 0)) {
        if (e.currentTarget && e.currentTarget.getAttribute) {
            const t = e.currentTarget.getAttribute("target");
            if (/\b_blank\b/i.test(t)) return
        }
        return e.preventDefault && e.preventDefault(), !0
    }
}

function Xa(e, t) {
    for (const n in t) {
        const r = t[n], s = e[n];
        if (typeof r == "string") {
            if (r !== s) return !1
        } else if (!Ae(s) || s.length !== r.length || r.some((o, i) => o !== s[i])) return !1
    }
    return !0
}

function _o(e) {
    return e ? e.aliasOf ? e.aliasOf.path : e.path : ""
}

const yo = (e, t, n) => e ?? t ?? n, Za = bt({
    name: "RouterView",
    inheritAttrs: !1,
    props: {name: {type: String, default: "default"}, route: Object},
    compatConfig: {MODE: 3},
    setup(e, {attrs: t, slots: n}) {
        const r = Ue($r), s = Re(() => e.route || r.value), o = Ue(mo, 0), i = Re(() => {
            let u = ot(o);
            const {matched: a} = s.value;
            let d;
            for (; (d = a[u]) && !d.components;) u++;
            return u
        }), c = Re(() => s.value.matched[i.value]);
        xn(mo, Re(() => i.value + 1)), xn(Ja, c), xn($r, s);
        const l = dl();
        return Lt(() => [l.value, c.value, e.name], ([u, a, d], [p, g, b]) => {
            a && (a.instances[d] = u, g && g !== a && u && u === p && (a.leaveGuards.size || (a.leaveGuards = g.leaveGuards), a.updateGuards.size || (a.updateGuards = g.updateGuards))), u && a && (!g || !Bt(a, g) || !p) && (a.enterCallbacks[d] || []).forEach(R => R(u))
        }, {flush: "post"}), () => {
            const u = s.value, a = e.name, d = c.value, p = d && d.components[a];
            if (!p) return bo(n.default, {Component: p, route: u});
            const g = d.props[a], b = g ? g === !0 ? u.params : typeof g == "function" ? g(u) : g : null,
                j = Ni(p, J({}, b, t, {
                    onVnodeUnmounted: T => {
                        T.component.isUnmounted && (d.instances[a] = null)
                    }, ref: l
                }));
            return bo(n.default, {Component: j, route: u}) || j
        }
    }
});

function bo(e, t) {
    if (!e) return null;
    const n = e(t);
    return n.length === 1 ? n[0] : n
}

const Vi = Za;

function ef(e) {
    const t = Aa(e.routes, e), n = e.parseQuery || Va, r = e.stringifyQuery || po, s = e.history, o = Qt(), i = Qt(),
        c = Qt(), l = hl(et);
    let u = et;
    Tt && e.scrollBehavior && "scrollRestoration" in history && (history.scrollRestoration = "manual");
    const a = pr.bind(null, v => "" + v), d = pr.bind(null, za), p = pr.bind(null, Dn);

    function g(v, A) {
        let C, F;
        return ji(v) ? (C = t.getRecordMatcher(v), F = A) : F = v, t.addRoute(F, C)
    }

    function b(v) {
        const A = t.getRecordMatcher(v);
        A && t.removeRoute(A)
    }

    function R() {
        return t.getRoutes().map(v => v.record)
    }

    function j(v) {
        return !!t.getRecordMatcher(v)
    }

    function T(v, A) {
        if (A = J({}, A || l.value), typeof v == "string") {
            const m = mr(n, v, A.path), _ = t.resolve({path: m.path}, A), E = s.createHref(m.fullPath);
            return J(m, _, {params: p(_.params), hash: Dn(m.hash), redirectedFrom: void 0, href: E})
        }
        let C;
        if ("path" in v) C = J({}, v, {path: mr(n, v.path, A.path).path}); else {
            const m = J({}, v.params);
            for (const _ in m) m[_] == null && delete m[_];
            C = J({}, v, {params: d(m)}), A.params = d(A.params)
        }
        const F = t.resolve(C, A), W = v.hash || "";
        F.params = a(p(F.params));
        const f = sa(r, J({}, v, {hash: Ha(W), path: F.path})), h = s.createHref(f);
        return J({fullPath: f, hash: W, query: r === po ? Wa(v.query) : v.query || {}}, F, {
            redirectedFrom: void 0,
            href: h
        })
    }

    function N(v) {
        return typeof v == "string" ? mr(n, v, l.value.path) : J({}, v)
    }

    function k(v, A) {
        if (u !== v) return Ut(8, {from: A, to: v})
    }

    function D(v) {
        return Ne(v)
    }

    function ce(v) {
        return D(J(N(v), {replace: !0}))
    }

    function de(v) {
        const A = v.matched[v.matched.length - 1];
        if (A && A.redirect) {
            const {redirect: C} = A;
            let F = typeof C == "function" ? C(v) : C;
            return typeof F == "string" && (F = F.includes("?") || F.includes("#") ? F = N(F) : {path: F}, F.params = {}), J({
                query: v.query,
                hash: v.hash,
                params: "path" in F ? {} : v.params
            }, F)
        }
    }

    function Ne(v, A) {
        const C = u = T(v), F = l.value, W = v.state, f = v.force, h = v.replace === !0, m = de(C);
        if (m) return Ne(J(N(m), {state: typeof m == "object" ? J({}, W, m.state) : W, force: f, replace: h}), A || C);
        const _ = C;
        _.redirectedFrom = A;
        let E;
        return !f && oa(r, F, C) && (E = Ut(16, {
            to: _,
            from: F
        }), Le(F, F, !0, !1)), (E ? Promise.resolve(E) : Fe(_, F)).catch(w => ze(w) ? ze(w, 2) ? w : Xe(w) : V(w, _, F)).then(w => {
            if (w) {
                if (ze(w, 2)) return Ne(J({replace: h}, N(w.to), {
                    state: typeof w.to == "object" ? J({}, W, w.to.state) : W,
                    force: f
                }), A || _)
            } else w = ft(_, F, !0, h, W);
            return Ye(_, F, w), w
        })
    }

    function Ke(v, A) {
        const C = k(v, A);
        return C ? Promise.reject(C) : Promise.resolve()
    }

    function wt(v) {
        const A = xt.values().next().value;
        return A && typeof A.runWithContext == "function" ? A.runWithContext(v) : v()
    }

    function Fe(v, A) {
        let C;
        const [F, W, f] = tf(v, A);
        C = gr(F.reverse(), "beforeRouteLeave", v, A);
        for (const m of F) m.leaveGuards.forEach(_ => {
            C.push(rt(_, v, A))
        });
        const h = Ke.bind(null, v, A);
        return C.push(h), le(C).then(() => {
            C = [];
            for (const m of o.list()) C.push(rt(m, v, A));
            return C.push(h), le(C)
        }).then(() => {
            C = gr(W, "beforeRouteUpdate", v, A);
            for (const m of W) m.updateGuards.forEach(_ => {
                C.push(rt(_, v, A))
            });
            return C.push(h), le(C)
        }).then(() => {
            C = [];
            for (const m of f) if (m.beforeEnter) if (Ae(m.beforeEnter)) for (const _ of m.beforeEnter) C.push(rt(_, v, A)); else C.push(rt(m.beforeEnter, v, A));
            return C.push(h), le(C)
        }).then(() => (v.matched.forEach(m => m.enterCallbacks = {}), C = gr(f, "beforeRouteEnter", v, A), C.push(h), le(C))).then(() => {
            C = [];
            for (const m of i.list()) C.push(rt(m, v, A));
            return C.push(h), le(C)
        }).catch(m => ze(m, 8) ? m : Promise.reject(m))
    }

    function Ye(v, A, C) {
        c.list().forEach(F => wt(() => F(v, A, C)))
    }

    function ft(v, A, C, F, W) {
        const f = k(v, A);
        if (f) return f;
        const h = A === et, m = Tt ? history.state : {};
        C && (F || h ? s.replace(v.fullPath, J({scroll: h && m && m.scroll}, W)) : s.push(v.fullPath, W)), l.value = v, Le(v, A, C, h), Xe()
    }

    let Me;

    function Wt() {
        Me || (Me = s.listen((v, A, C) => {
            if (!_n.listening) return;
            const F = T(v), W = de(F);
            if (W) {
                Ne(J(W, {replace: !0}), F).catch(rn);
                return
            }
            u = F;
            const f = l.value;
            Tt && ha(oo(f.fullPath, C.delta), Zn()), Fe(F, f).catch(h => ze(h, 12) ? h : ze(h, 2) ? (Ne(h.to, F).then(m => {
                ze(m, 20) && !C.delta && C.type === dn.pop && s.go(-1, !1)
            }).catch(rn), Promise.reject()) : (C.delta && s.go(-C.delta, !1), V(h, F, f))).then(h => {
                h = h || ft(F, f, !1), h && (C.delta && !ze(h, 8) ? s.go(-C.delta, !1) : C.type === dn.pop && ze(h, 20) && s.go(-1, !1)), Ye(F, f, h)
            }).catch(rn)
        }))
    }

    let Ot = Qt(), re = Qt(), Q;

    function V(v, A, C) {
        Xe(v);
        const F = re.list();
        return F.length ? F.forEach(W => W(v, A, C)) : console.error(v), Promise.reject(v)
    }

    function qe() {
        return Q && l.value !== et ? Promise.resolve() : new Promise((v, A) => {
            Ot.add([v, A])
        })
    }

    function Xe(v) {
        return Q || (Q = !v, Wt(), Ot.list().forEach(([A, C]) => v ? C(v) : A()), Ot.reset()), v
    }

    function Le(v, A, C, F) {
        const {scrollBehavior: W} = e;
        if (!Tt || !W) return Promise.resolve();
        const f = !C && pa(oo(v.fullPath, 0)) || (F || !C) && history.state && history.state.scroll || null;
        return ci().then(() => W(v, A, f)).then(h => h && da(h)).catch(h => V(h, v, A))
    }

    const pe = v => s.go(v);
    let Rt;
    const xt = new Set, _n = {
        currentRoute: l,
        listening: !0,
        addRoute: g,
        removeRoute: b,
        hasRoute: j,
        getRoutes: R,
        resolve: T,
        options: e,
        push: D,
        replace: ce,
        go: pe,
        back: () => pe(-1),
        forward: () => pe(1),
        beforeEach: o.add,
        beforeResolve: i.add,
        afterEach: c.add,
        onError: re.add,
        isReady: qe,
        install(v) {
            const A = this;
            v.component("RouterLink", zi), v.component("RouterView", Vi), v.config.globalProperties.$router = A, Object.defineProperty(v.config.globalProperties, "$route", {
                enumerable: !0,
                get: () => ot(l)
            }), Tt && !Rt && l.value === et && (Rt = !0, D(s.location).catch(W => {
            }));
            const C = {};
            for (const W in et) Object.defineProperty(C, W, {get: () => l.value[W], enumerable: !0});
            v.provide(ps, A), v.provide(qi, Xo(C)), v.provide($r, l);
            const F = v.unmount;
            xt.add(v), v.unmount = function () {
                xt.delete(v), xt.size < 1 && (u = et, Me && Me(), Me = null, l.value = et, Rt = !1, Q = !1), F()
            }
        }
    };

    function le(v) {
        return v.reduce((A, C) => A.then(() => wt(C)), Promise.resolve())
    }

    return _n
}

function tf(e, t) {
    const n = [], r = [], s = [], o = Math.max(t.matched.length, e.matched.length);
    for (let i = 0; i < o; i++) {
        const c = t.matched[i];
        c && (e.matched.find(u => Bt(u, c)) ? r.push(c) : n.push(c));
        const l = e.matched[i];
        l && (t.matched.find(u => Bt(u, l)) || s.push(l))
    }
    return [n, r, s]
}

const nf = "https://disolm.github.io/file-manager_vue/assets/logo-267386d8.svg",
    Wi = e => (is("data-v-ac22a7d5"), e = e(), cs(), e), rf = {class: "logo"},
    sf = Wi(() => vt("img", {src: nf, alt: "file-manager", class: "logo__image"}, null, -1)),
    of = Wi(() => vt("span", {class: "logo__title"}, Uo("file manager"), -1)), cf = bt({
        __name: "MainLogo", setup(e) {
            return (t, n) => (Te(), ut("div", rf, [ee(ot(zi), {
                to: {name: "home"},
                class: "logo__link"
            }, {default: Jn(() => [sf, of]), _: 1})]))
        }
    });
const at = (e, t) => {
    const n = e.__vccOpts || e;
    for (const [r, s] of t) n[r] = s;
    return n
}, lf = at(cf, [["__scopeId", "data-v-ac22a7d5"]]);
const uf = {}, af = {class: "nav-bar"};

function ff(e, t) {
    return Te(), ut("div", af)
}

const df = at(uf, [["render", ff], ["__scopeId", "data-v-2f6145d4"]]), hf = {class: "header"}, pf = bt({
    __name: "TheHeader", setup(e) {
        return (t, n) => (Te(), ut("div", hf, [ee(lf), ee(df)]))
    }
});
const mf = at(pf, [["__scopeId", "data-v-7749ca8d"]]);
const gf = {}, _f = {class: "container"};

function yf(e, t) {
    return Te(), ut("div", _f, [_i(e.$slots, "default", {}, void 0, !0)])
}

const bf = at(gf, [["render", yf], ["__scopeId", "data-v-7ba4919b"]]), vf = {class: "footer"}, Ef = bt({
    __name: "TheFooter", setup(e) {
        return (t, n) => (Te(), ut("footer", vf, [ee(bf, null, {
            default: Jn(() => [Ai("© Глебский Дмитрий 2023 - " + Uo(new Date().getFullYear()), 1)]),
            _: 1
        })]))
    }
});
const wf = at(Ef, [["__scopeId", "data-v-c6a62aaa"]]), Of = {class: "wrapper"}, Rf = {class: "main"}, xf = bt({
    __name: "LayoutBase", setup(e) {
        return (t, n) => (Te(), ut("div", Of, [ee(mf), vt("main", Rf, [_i(t.$slots, "default", {}, void 0, !0)]), ee(wf)]))
    }
});
const Sf = at(xf, [["__scopeId", "data-v-7ed45cbb"]]), Cf = bt({
    __name: "App", setup(e) {
        return (t, n) => (Te(), as(Sf, null, {default: Jn(() => [ee(ot(Vi))]), _: 1}))
    }
});
const Pf = "modulepreload", Af = function (e) {
    return "/" + e
}, vo = {}, Eo = function (t, n, r) {
    if (!n || n.length === 0) return t();
    const s = document.getElementsByTagName("link");
    return Promise.all(n.map(o => {
        if (o = Af(o), o in vo) return;
        vo[o] = !0;
        const i = o.endsWith(".css"), c = i ? '[rel="stylesheet"]' : "";
        if (!!r) for (let a = s.length - 1; a >= 0; a--) {
            const d = s[a];
            if (d.href === o && (!i || d.rel === "stylesheet")) return
        } else if (document.querySelector(`link[href="${o}"]${c}`)) return;
        const u = document.createElement("link");
        if (u.rel = i ? "stylesheet" : Pf, i || (u.as = "script", u.crossOrigin = ""), u.href = o, document.head.appendChild(u), i) return new Promise((a, d) => {
            u.addEventListener("load", a), u.addEventListener("error", () => d(new Error(`Unable to preload CSS for ${o}`)))
        })
    })).then(() => t()).catch(o => {
        const i = new Event("vite:preloadError", {cancelable: !0});
        if (i.payload = o, window.dispatchEvent(i), !i.defaultPrevented) throw o
    })
};
const Tf = {}, If = e => (is("data-v-a6bf4df7"), e = e(), cs(), e), Nf = {class: "file-info-empty-view"},
    Ff = If(() => vt("div", {class: "file-info-empty-view__title"}, " Выберите файл для просмотра. ", -1)), Mf = [Ff];

function Lf(e, t) {
    return Te(), ut("div", Nf, Mf)
}

const jf = at(Tf, [["render", Lf], ["__scopeId", "data-v-a6bf4df7"]]);
const Df = {}, $f = e => (is("data-v-edb55016"), e = e(), cs(), e), Bf = {class: "file-info-empty-view"},
    Uf = $f(() => vt("div", {class: "file-info-empty-view__title"}, " Выберите файл для просмотра. ", -1)), kf = [Uf];

function Hf(e, t) {
    return Te(), ut("div", Bf, kf)
}

const Kf = at(Df, [["render", Hf], ["__scopeId", "data-v-edb55016"]]), qf = ef({
    history: ya("file-manager_vue/"),
    routes: [{path: "file-manager_vue/", name: "home", redirect: {name: "file-manager"}}, {
        path: "file-manager_vue/fileManager",
        name: "file-manager",
        component: () => Eo(() => import("https://disolm.github.io/file-manager_vue/assets/FileManagerView-421d3220.js"), ["https://disolm.github.io/file-manager_vue/assets/FileManagerView-421d3220.js", "https://disolm.github.io/file-manager_vue/assets/FileManagerView-2fb1c931.css"]),
        redirect: {name: "file.empty"},
        children: [{path: "", name: "file.empty", component: jf}, {path: ":pathId", name: "file.info", component: Kf}]
    },
        // {
        //     path: "/:pathMatch(.*)*",
        //     name: "NotFound",
        //     component: () => Eo(() => import("./NotFoundView-e536de7b.js"), ["assets/NotFoundView-e536de7b.js", "assets/NotFoundView-071816b8.css"])
        // }
    ]
});/*!
 * vuex v4.0.2
 * (c) 2021 Evan You
 * @license MIT
 */
var Ji = "store";

function Ph(e) {
    return e === void 0 && (e = null), Ue(e !== null ? e : Ji)
}

function zt(e, t) {
    Object.keys(e).forEach(function (n) {
        return t(e[n], n)
    })
}

function zf(e) {
    return e !== null && typeof e == "object"
}

function Vf(e) {
    return e && typeof e.then == "function"
}

function Wf(e, t) {
    return function () {
        return e(t)
    }
}

function Gi(e, t, n) {
    return t.indexOf(e) < 0 && (n && n.prepend ? t.unshift(e) : t.push(e)), function () {
        var r = t.indexOf(e);
        r > -1 && t.splice(r, 1)
    }
}

function Qi(e, t) {
    e._actions = Object.create(null), e._mutations = Object.create(null), e._wrappedGetters = Object.create(null), e._modulesNamespaceMap = Object.create(null);
    var n = e.state;
    er(e, n, [], e._modules.root, !0), ms(e, n, t)
}

function ms(e, t, n) {
    var r = e._state;
    e.getters = {}, e._makeLocalGettersCache = Object.create(null);
    var s = e._wrappedGetters, o = {};
    zt(s, function (i, c) {
        o[c] = Wf(i, e), Object.defineProperty(e.getters, c, {
            get: function () {
                return o[c]()
            }, enumerable: !0
        })
    }), e._state = pn({data: t}), e.strict && Xf(e), r && n && e._withCommit(function () {
        r.data = null
    })
}

function er(e, t, n, r, s) {
    var o = !n.length, i = e._modules.getNamespace(n);
    if (r.namespaced && (e._modulesNamespaceMap[i], e._modulesNamespaceMap[i] = r), !o && !s) {
        var c = gs(t, n.slice(0, -1)), l = n[n.length - 1];
        e._withCommit(function () {
            c[l] = r.state
        })
    }
    var u = r.context = Jf(e, i, n);
    r.forEachMutation(function (a, d) {
        var p = i + d;
        Gf(e, p, a, u)
    }), r.forEachAction(function (a, d) {
        var p = a.root ? d : i + d, g = a.handler || a;
        Qf(e, p, g, u)
    }), r.forEachGetter(function (a, d) {
        var p = i + d;
        Yf(e, p, a, u)
    }), r.forEachChild(function (a, d) {
        er(e, t, n.concat(d), a, s)
    })
}

function Jf(e, t, n) {
    var r = t === "", s = {
        dispatch: r ? e.dispatch : function (o, i, c) {
            var l = $n(o, i, c), u = l.payload, a = l.options, d = l.type;
            return (!a || !a.root) && (d = t + d), e.dispatch(d, u)
        }, commit: r ? e.commit : function (o, i, c) {
            var l = $n(o, i, c), u = l.payload, a = l.options, d = l.type;
            (!a || !a.root) && (d = t + d), e.commit(d, u, a)
        }
    };
    return Object.defineProperties(s, {
        getters: {
            get: r ? function () {
                return e.getters
            } : function () {
                return Yi(e, t)
            }
        }, state: {
            get: function () {
                return gs(e.state, n)
            }
        }
    }), s
}

function Yi(e, t) {
    if (!e._makeLocalGettersCache[t]) {
        var n = {}, r = t.length;
        Object.keys(e.getters).forEach(function (s) {
            if (s.slice(0, r) === t) {
                var o = s.slice(r);
                Object.defineProperty(n, o, {
                    get: function () {
                        return e.getters[s]
                    }, enumerable: !0
                })
            }
        }), e._makeLocalGettersCache[t] = n
    }
    return e._makeLocalGettersCache[t]
}

function Gf(e, t, n, r) {
    var s = e._mutations[t] || (e._mutations[t] = []);
    s.push(function (i) {
        n.call(e, r.state, i)
    })
}

function Qf(e, t, n, r) {
    var s = e._actions[t] || (e._actions[t] = []);
    s.push(function (i) {
        var c = n.call(e, {
            dispatch: r.dispatch,
            commit: r.commit,
            getters: r.getters,
            state: r.state,
            rootGetters: e.getters,
            rootState: e.state
        }, i);
        return Vf(c) || (c = Promise.resolve(c)), e._devtoolHook ? c.catch(function (l) {
            throw e._devtoolHook.emit("vuex:error", l), l
        }) : c
    })
}

function Yf(e, t, n, r) {
    e._wrappedGetters[t] || (e._wrappedGetters[t] = function (o) {
        return n(r.state, r.getters, o.state, o.getters)
    })
}

function Xf(e) {
    Lt(function () {
        return e._state.data
    }, function () {
    }, {deep: !0, flush: "sync"})
}

function gs(e, t) {
    return t.reduce(function (n, r) {
        return n[r]
    }, e)
}

function $n(e, t, n) {
    return zf(e) && e.type && (n = t, t = e, e = e.type), {type: e, payload: t, options: n}
}

var Zf = "vuex bindings", wo = "vuex:mutations", _r = "vuex:actions", At = "vuex", ed = 0;

function td(e, t) {
    ea({
        id: "org.vuejs.vuex",
        app: e,
        label: "Vuex",
        homepage: "https://next.vuex.vuejs.org/",
        logo: "https://vuejs.org/images/icons/favicon-96x96.png",
        packageName: "vuex",
        componentStateTypes: [Zf]
    }, function (n) {
        n.addTimelineLayer({id: wo, label: "Vuex Mutations", color: Oo}), n.addTimelineLayer({
            id: _r,
            label: "Vuex Actions",
            color: Oo
        }), n.addInspector({
            id: At,
            label: "Vuex",
            icon: "storage",
            treeFilterPlaceholder: "Filter stores..."
        }), n.on.getInspectorTree(function (r) {
            if (r.app === e && r.inspectorId === At) if (r.filter) {
                var s = [];
                tc(s, t._modules.root, r.filter, ""), r.rootNodes = s
            } else r.rootNodes = [ec(t._modules.root, "")]
        }), n.on.getInspectorState(function (r) {
            if (r.app === e && r.inspectorId === At) {
                var s = r.nodeId;
                Yi(t, s), r.state = sd(id(t._modules, s), s === "root" ? t.getters : t._makeLocalGettersCache, s)
            }
        }), n.on.editInspectorState(function (r) {
            if (r.app === e && r.inspectorId === At) {
                var s = r.nodeId, o = r.path;
                s !== "root" && (o = s.split("/").filter(Boolean).concat(o)), t._withCommit(function () {
                    r.set(t._state.data, o, r.state.value)
                })
            }
        }), t.subscribe(function (r, s) {
            var o = {};
            r.payload && (o.payload = r.payload), o.state = s, n.notifyComponentUpdate(), n.sendInspectorTree(At), n.sendInspectorState(At), n.addTimelineEvent({
                layerId: wo,
                event: {time: Date.now(), title: r.type, data: o}
            })
        }), t.subscribeAction({
            before: function (r, s) {
                var o = {};
                r.payload && (o.payload = r.payload), r._id = ed++, r._time = Date.now(), o.state = s, n.addTimelineEvent({
                    layerId: _r,
                    event: {time: r._time, title: r.type, groupId: r._id, subtitle: "start", data: o}
                })
            }, after: function (r, s) {
                var o = {}, i = Date.now() - r._time;
                o.duration = {
                    _custom: {
                        type: "duration",
                        display: i + "ms",
                        tooltip: "Action duration",
                        value: i
                    }
                }, r.payload && (o.payload = r.payload), o.state = s, n.addTimelineEvent({
                    layerId: _r,
                    event: {time: Date.now(), title: r.type, groupId: r._id, subtitle: "end", data: o}
                })
            }
        })
    })
}

var Oo = 8702998, nd = 6710886, rd = 16777215, Xi = {label: "namespaced", textColor: rd, backgroundColor: nd};

function Zi(e) {
    return e && e !== "root" ? e.split("/").slice(-2, -1)[0] : "Root"
}

function ec(e, t) {
    return {
        id: t || "root",
        label: Zi(t),
        tags: e.namespaced ? [Xi] : [],
        children: Object.keys(e._children).map(function (n) {
            return ec(e._children[n], t + n + "/")
        })
    }
}

function tc(e, t, n, r) {
    r.includes(n) && e.push({
        id: r || "root",
        label: r.endsWith("/") ? r.slice(0, r.length - 1) : r || "Root",
        tags: t.namespaced ? [Xi] : []
    }), Object.keys(t._children).forEach(function (s) {
        tc(e, t._children[s], n, r + s + "/")
    })
}

function sd(e, t, n) {
    t = n === "root" ? t : t[n];
    var r = Object.keys(t), s = {
        state: Object.keys(e.state).map(function (i) {
            return {key: i, editable: !0, value: e.state[i]}
        })
    };
    if (r.length) {
        var o = od(t);
        s.getters = Object.keys(o).map(function (i) {
            return {
                key: i.endsWith("/") ? Zi(i) : i, editable: !1, value: Br(function () {
                    return o[i]
                })
            }
        })
    }
    return s
}

function od(e) {
    var t = {};
    return Object.keys(e).forEach(function (n) {
        var r = n.split("/");
        if (r.length > 1) {
            var s = t, o = r.pop();
            r.forEach(function (i) {
                s[i] || (s[i] = {
                    _custom: {
                        value: {},
                        display: i,
                        tooltip: "Module",
                        abstract: !0
                    }
                }), s = s[i]._custom.value
            }), s[o] = Br(function () {
                return e[n]
            })
        } else t[n] = Br(function () {
            return e[n]
        })
    }), t
}

function id(e, t) {
    var n = t.split("/").filter(function (r) {
        return r
    });
    return n.reduce(function (r, s, o) {
        var i = r[s];
        if (!i) throw new Error('Missing module "' + s + '" for path "' + t + '".');
        return o === n.length - 1 ? i : i._children
    }, t === "root" ? e : e.root._children)
}

function Br(e) {
    try {
        return e()
    } catch (t) {
        return t
    }
}

var Ie = function (t, n) {
    this.runtime = n, this._children = Object.create(null), this._rawModule = t;
    var r = t.state;
    this.state = (typeof r == "function" ? r() : r) || {}
}, nc = {namespaced: {configurable: !0}};
nc.namespaced.get = function () {
    return !!this._rawModule.namespaced
};
Ie.prototype.addChild = function (t, n) {
    this._children[t] = n
};
Ie.prototype.removeChild = function (t) {
    delete this._children[t]
};
Ie.prototype.getChild = function (t) {
    return this._children[t]
};
Ie.prototype.hasChild = function (t) {
    return t in this._children
};
Ie.prototype.update = function (t) {
    this._rawModule.namespaced = t.namespaced, t.actions && (this._rawModule.actions = t.actions), t.mutations && (this._rawModule.mutations = t.mutations), t.getters && (this._rawModule.getters = t.getters)
};
Ie.prototype.forEachChild = function (t) {
    zt(this._children, t)
};
Ie.prototype.forEachGetter = function (t) {
    this._rawModule.getters && zt(this._rawModule.getters, t)
};
Ie.prototype.forEachAction = function (t) {
    this._rawModule.actions && zt(this._rawModule.actions, t)
};
Ie.prototype.forEachMutation = function (t) {
    this._rawModule.mutations && zt(this._rawModule.mutations, t)
};
Object.defineProperties(Ie.prototype, nc);
var Et = function (t) {
    this.register([], t, !1)
};
Et.prototype.get = function (t) {
    return t.reduce(function (n, r) {
        return n.getChild(r)
    }, this.root)
};
Et.prototype.getNamespace = function (t) {
    var n = this.root;
    return t.reduce(function (r, s) {
        return n = n.getChild(s), r + (n.namespaced ? s + "/" : "")
    }, "")
};
Et.prototype.update = function (t) {
    rc([], this.root, t)
};
Et.prototype.register = function (t, n, r) {
    var s = this;
    r === void 0 && (r = !0);
    var o = new Ie(n, r);
    if (t.length === 0) this.root = o; else {
        var i = this.get(t.slice(0, -1));
        i.addChild(t[t.length - 1], o)
    }
    n.modules && zt(n.modules, function (c, l) {
        s.register(t.concat(l), c, r)
    })
};
Et.prototype.unregister = function (t) {
    var n = this.get(t.slice(0, -1)), r = t[t.length - 1], s = n.getChild(r);
    s && s.runtime && n.removeChild(r)
};
Et.prototype.isRegistered = function (t) {
    var n = this.get(t.slice(0, -1)), r = t[t.length - 1];
    return n ? n.hasChild(r) : !1
};

function rc(e, t, n) {
    if (t.update(n), n.modules) for (var r in n.modules) {
        if (!t.getChild(r)) return;
        rc(e.concat(r), t.getChild(r), n.modules[r])
    }
}

function cd(e) {
    return new _e(e)
}

var _e = function (t) {
    var n = this;
    t === void 0 && (t = {});
    var r = t.plugins;
    r === void 0 && (r = []);
    var s = t.strict;
    s === void 0 && (s = !1);
    var o = t.devtools;
    this._committing = !1, this._actions = Object.create(null), this._actionSubscribers = [], this._mutations = Object.create(null), this._wrappedGetters = Object.create(null), this._modules = new Et(t), this._modulesNamespaceMap = Object.create(null), this._subscribers = [], this._makeLocalGettersCache = Object.create(null), this._devtools = o;
    var i = this, c = this, l = c.dispatch, u = c.commit;
    this.dispatch = function (p, g) {
        return l.call(i, p, g)
    }, this.commit = function (p, g, b) {
        return u.call(i, p, g, b)
    }, this.strict = s;
    var a = this._modules.root.state;
    er(this, a, [], this._modules.root), ms(this, a), r.forEach(function (d) {
        return d(n)
    })
}, _s = {state: {configurable: !0}};
_e.prototype.install = function (t, n) {
    t.provide(n || Ji, this), t.config.globalProperties.$store = this;
    var r = this._devtools !== void 0 ? this._devtools : !1;
    r && td(t, this)
};
_s.state.get = function () {
    return this._state.data
};
_s.state.set = function (e) {
};
_e.prototype.commit = function (t, n, r) {
    var s = this, o = $n(t, n, r), i = o.type, c = o.payload, l = {type: i, payload: c}, u = this._mutations[i];
    u && (this._withCommit(function () {
        u.forEach(function (d) {
            d(c)
        })
    }), this._subscribers.slice().forEach(function (a) {
        return a(l, s.state)
    }))
};
_e.prototype.dispatch = function (t, n) {
    var r = this, s = $n(t, n), o = s.type, i = s.payload, c = {type: o, payload: i}, l = this._actions[o];
    if (l) {
        try {
            this._actionSubscribers.slice().filter(function (a) {
                return a.before
            }).forEach(function (a) {
                return a.before(c, r.state)
            })
        } catch {
        }
        var u = l.length > 1 ? Promise.all(l.map(function (a) {
            return a(i)
        })) : l[0](i);
        return new Promise(function (a, d) {
            u.then(function (p) {
                try {
                    r._actionSubscribers.filter(function (g) {
                        return g.after
                    }).forEach(function (g) {
                        return g.after(c, r.state)
                    })
                } catch {
                }
                a(p)
            }, function (p) {
                try {
                    r._actionSubscribers.filter(function (g) {
                        return g.error
                    }).forEach(function (g) {
                        return g.error(c, r.state, p)
                    })
                } catch {
                }
                d(p)
            })
        })
    }
};
_e.prototype.subscribe = function (t, n) {
    return Gi(t, this._subscribers, n)
};
_e.prototype.subscribeAction = function (t, n) {
    var r = typeof t == "function" ? {before: t} : t;
    return Gi(r, this._actionSubscribers, n)
};
_e.prototype.watch = function (t, n, r) {
    var s = this;
    return Lt(function () {
        return t(s.state, s.getters)
    }, n, Object.assign({}, r))
};
_e.prototype.replaceState = function (t) {
    var n = this;
    this._withCommit(function () {
        n._state.data = t
    })
};
_e.prototype.registerModule = function (t, n, r) {
    r === void 0 && (r = {}), typeof t == "string" && (t = [t]), this._modules.register(t, n), er(this, this.state, t, this._modules.get(t), r.preserveState), ms(this, this.state)
};
_e.prototype.unregisterModule = function (t) {
    var n = this;
    typeof t == "string" && (t = [t]), this._modules.unregister(t), this._withCommit(function () {
        var r = gs(n.state, t.slice(0, -1));
        delete r[t[t.length - 1]]
    }), Qi(this)
};
_e.prototype.hasModule = function (t) {
    return typeof t == "string" && (t = [t]), this._modules.isRegistered(t)
};
_e.prototype.hotUpdate = function (t) {
    this._modules.update(t), Qi(this, !0)
};
_e.prototype._withCommit = function (t) {
    var n = this._committing;
    this._committing = !0, t(), this._committing = n
};
Object.defineProperties(_e.prototype, _s);

function sc(e, t) {
    return function () {
        return e.apply(t, arguments)
    }
}

const {toString: ld} = Object.prototype, {getPrototypeOf: ys} = Object, tr = (e => t => {
        const n = ld.call(t);
        return e[n] || (e[n] = n.slice(8, -1).toLowerCase())
    })(Object.create(null)), He = e => (e = e.toLowerCase(), t => tr(t) === e),
    nr = e => t => typeof t === e, {isArray: Vt} = Array, hn = nr("undefined");

function ud(e) {
    return e !== null && !hn(e) && e.constructor !== null && !hn(e.constructor) && be(e.constructor.isBuffer) && e.constructor.isBuffer(e)
}

const oc = He("ArrayBuffer");

function ad(e) {
    let t;
    return typeof ArrayBuffer < "u" && ArrayBuffer.isView ? t = ArrayBuffer.isView(e) : t = e && e.buffer && oc(e.buffer), t
}

const fd = nr("string"), be = nr("function"), ic = nr("number"), rr = e => e !== null && typeof e == "object",
    dd = e => e === !0 || e === !1, Cn = e => {
        if (tr(e) !== "object") return !1;
        const t = ys(e);
        return (t === null || t === Object.prototype || Object.getPrototypeOf(t) === null) && !(Symbol.toStringTag in e) && !(Symbol.iterator in e)
    }, hd = He("Date"), pd = He("File"), md = He("Blob"), gd = He("FileList"), _d = e => rr(e) && be(e.pipe), yd = e => {
        let t;
        return e && (typeof FormData == "function" && e instanceof FormData || be(e.append) && ((t = tr(e)) === "formdata" || t === "object" && be(e.toString) && e.toString() === "[object FormData]"))
    }, bd = He("URLSearchParams"), vd = e => e.trim ? e.trim() : e.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");

function mn(e, t, {allOwnKeys: n = !1} = {}) {
    if (e === null || typeof e > "u") return;
    let r, s;
    if (typeof e != "object" && (e = [e]), Vt(e)) for (r = 0, s = e.length; r < s; r++) t.call(null, e[r], r, e); else {
        const o = n ? Object.getOwnPropertyNames(e) : Object.keys(e), i = o.length;
        let c;
        for (r = 0; r < i; r++) c = o[r], t.call(null, e[c], c, e)
    }
}

function cc(e, t) {
    t = t.toLowerCase();
    const n = Object.keys(e);
    let r = n.length, s;
    for (; r-- > 0;) if (s = n[r], t === s.toLowerCase()) return s;
    return null
}

const lc = (() => typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : global)(),
    uc = e => !hn(e) && e !== lc;

function Ur() {
    const {caseless: e} = uc(this) && this || {}, t = {}, n = (r, s) => {
        const o = e && cc(t, s) || s;
        Cn(t[o]) && Cn(r) ? t[o] = Ur(t[o], r) : Cn(r) ? t[o] = Ur({}, r) : Vt(r) ? t[o] = r.slice() : t[o] = r
    };
    for (let r = 0, s = arguments.length; r < s; r++) arguments[r] && mn(arguments[r], n);
    return t
}

const Ed = (e, t, n, {allOwnKeys: r} = {}) => (mn(t, (s, o) => {
        n && be(s) ? e[o] = sc(s, n) : e[o] = s
    }, {allOwnKeys: r}), e), wd = e => (e.charCodeAt(0) === 65279 && (e = e.slice(1)), e), Od = (e, t, n, r) => {
        e.prototype = Object.create(t.prototype, r), e.prototype.constructor = e, Object.defineProperty(e, "super", {value: t.prototype}), n && Object.assign(e.prototype, n)
    }, Rd = (e, t, n, r) => {
        let s, o, i;
        const c = {};
        if (t = t || {}, e == null) return t;
        do {
            for (s = Object.getOwnPropertyNames(e), o = s.length; o-- > 0;) i = s[o], (!r || r(i, e, t)) && !c[i] && (t[i] = e[i], c[i] = !0);
            e = n !== !1 && ys(e)
        } while (e && (!n || n(e, t)) && e !== Object.prototype);
        return t
    }, xd = (e, t, n) => {
        e = String(e), (n === void 0 || n > e.length) && (n = e.length), n -= t.length;
        const r = e.indexOf(t, n);
        return r !== -1 && r === n
    }, Sd = e => {
        if (!e) return null;
        if (Vt(e)) return e;
        let t = e.length;
        if (!ic(t)) return null;
        const n = new Array(t);
        for (; t-- > 0;) n[t] = e[t];
        return n
    }, Cd = (e => t => e && t instanceof e)(typeof Uint8Array < "u" && ys(Uint8Array)), Pd = (e, t) => {
        const r = (e && e[Symbol.iterator]).call(e);
        let s;
        for (; (s = r.next()) && !s.done;) {
            const o = s.value;
            t.call(e, o[0], o[1])
        }
    }, Ad = (e, t) => {
        let n;
        const r = [];
        for (; (n = e.exec(t)) !== null;) r.push(n);
        return r
    }, Td = He("HTMLFormElement"), Id = e => e.toLowerCase().replace(/[-_\s]([a-z\d])(\w*)/g, function (n, r, s) {
        return r.toUpperCase() + s
    }), Ro = (({hasOwnProperty: e}) => (t, n) => e.call(t, n))(Object.prototype), Nd = He("RegExp"), ac = (e, t) => {
        const n = Object.getOwnPropertyDescriptors(e), r = {};
        mn(n, (s, o) => {
            let i;
            (i = t(s, o, e)) !== !1 && (r[o] = i || s)
        }), Object.defineProperties(e, r)
    }, Fd = e => {
        ac(e, (t, n) => {
            if (be(e) && ["arguments", "caller", "callee"].indexOf(n) !== -1) return !1;
            const r = e[n];
            if (be(r)) {
                if (t.enumerable = !1, "writable" in t) {
                    t.writable = !1;
                    return
                }
                t.set || (t.set = () => {
                    throw Error("Can not rewrite read-only method '" + n + "'")
                })
            }
        })
    }, Md = (e, t) => {
        const n = {}, r = s => {
            s.forEach(o => {
                n[o] = !0
            })
        };
        return Vt(e) ? r(e) : r(String(e).split(t)), n
    }, Ld = () => {
    }, jd = (e, t) => (e = +e, Number.isFinite(e) ? e : t), yr = "abcdefghijklmnopqrstuvwxyz", xo = "0123456789",
    fc = {DIGIT: xo, ALPHA: yr, ALPHA_DIGIT: yr + yr.toUpperCase() + xo}, Dd = (e = 16, t = fc.ALPHA_DIGIT) => {
        let n = "";
        const {length: r} = t;
        for (; e--;) n += t[Math.random() * r | 0];
        return n
    };

function $d(e) {
    return !!(e && be(e.append) && e[Symbol.toStringTag] === "FormData" && e[Symbol.iterator])
}

const Bd = e => {
    const t = new Array(10), n = (r, s) => {
        if (rr(r)) {
            if (t.indexOf(r) >= 0) return;
            if (!("toJSON" in r)) {
                t[s] = r;
                const o = Vt(r) ? [] : {};
                return mn(r, (i, c) => {
                    const l = n(i, s + 1);
                    !hn(l) && (o[c] = l)
                }), t[s] = void 0, o
            }
        }
        return r
    };
    return n(e, 0)
}, Ud = He("AsyncFunction"), kd = e => e && (rr(e) || be(e)) && be(e.then) && be(e.catch), y = {
    isArray: Vt,
    isArrayBuffer: oc,
    isBuffer: ud,
    isFormData: yd,
    isArrayBufferView: ad,
    isString: fd,
    isNumber: ic,
    isBoolean: dd,
    isObject: rr,
    isPlainObject: Cn,
    isUndefined: hn,
    isDate: hd,
    isFile: pd,
    isBlob: md,
    isRegExp: Nd,
    isFunction: be,
    isStream: _d,
    isURLSearchParams: bd,
    isTypedArray: Cd,
    isFileList: gd,
    forEach: mn,
    merge: Ur,
    extend: Ed,
    trim: vd,
    stripBOM: wd,
    inherits: Od,
    toFlatObject: Rd,
    kindOf: tr,
    kindOfTest: He,
    endsWith: xd,
    toArray: Sd,
    forEachEntry: Pd,
    matchAll: Ad,
    isHTMLForm: Td,
    hasOwnProperty: Ro,
    hasOwnProp: Ro,
    reduceDescriptors: ac,
    freezeMethods: Fd,
    toObjectSet: Md,
    toCamelCase: Id,
    noop: Ld,
    toFiniteNumber: jd,
    findKey: cc,
    global: lc,
    isContextDefined: uc,
    ALPHABET: fc,
    generateString: Dd,
    isSpecCompliantForm: $d,
    toJSONObject: Bd,
    isAsyncFn: Ud,
    isThenable: kd
};

function q(e, t, n, r, s) {
    Error.call(this), Error.captureStackTrace ? Error.captureStackTrace(this, this.constructor) : this.stack = new Error().stack, this.message = e, this.name = "AxiosError", t && (this.code = t), n && (this.config = n), r && (this.request = r), s && (this.response = s)
}

y.inherits(q, Error, {
    toJSON: function () {
        return {
            message: this.message,
            name: this.name,
            description: this.description,
            number: this.number,
            fileName: this.fileName,
            lineNumber: this.lineNumber,
            columnNumber: this.columnNumber,
            stack: this.stack,
            config: y.toJSONObject(this.config),
            code: this.code,
            status: this.response && this.response.status ? this.response.status : null
        }
    }
});
const dc = q.prototype, hc = {};
["ERR_BAD_OPTION_VALUE", "ERR_BAD_OPTION", "ECONNABORTED", "ETIMEDOUT", "ERR_NETWORK", "ERR_FR_TOO_MANY_REDIRECTS", "ERR_DEPRECATED", "ERR_BAD_RESPONSE", "ERR_BAD_REQUEST", "ERR_CANCELED", "ERR_NOT_SUPPORT", "ERR_INVALID_URL"].forEach(e => {
    hc[e] = {value: e}
});
Object.defineProperties(q, hc);
Object.defineProperty(dc, "isAxiosError", {value: !0});
q.from = (e, t, n, r, s, o) => {
    const i = Object.create(dc);
    return y.toFlatObject(e, i, function (l) {
        return l !== Error.prototype
    }, c => c !== "isAxiosError"), q.call(i, e.message, t, n, r, s), i.cause = e, i.name = e.name, o && Object.assign(i, o), i
};
const Hd = null;

function kr(e) {
    return y.isPlainObject(e) || y.isArray(e)
}

function pc(e) {
    return y.endsWith(e, "[]") ? e.slice(0, -2) : e
}

function So(e, t, n) {
    return e ? e.concat(t).map(function (s, o) {
        return s = pc(s), !n && o ? "[" + s + "]" : s
    }).join(n ? "." : "") : t
}

function Kd(e) {
    return y.isArray(e) && !e.some(kr)
}

const qd = y.toFlatObject(y, {}, null, function (t) {
    return /^is[A-Z]/.test(t)
});

function sr(e, t, n) {
    if (!y.isObject(e)) throw new TypeError("target must be an object");
    t = t || new FormData, n = y.toFlatObject(n, {metaTokens: !0, dots: !1, indexes: !1}, !1, function (R, j) {
        return !y.isUndefined(j[R])
    });
    const r = n.metaTokens, s = n.visitor || a, o = n.dots, i = n.indexes,
        l = (n.Blob || typeof Blob < "u" && Blob) && y.isSpecCompliantForm(t);
    if (!y.isFunction(s)) throw new TypeError("visitor must be a function");

    function u(b) {
        if (b === null) return "";
        if (y.isDate(b)) return b.toISOString();
        if (!l && y.isBlob(b)) throw new q("Blob is not supported. Use a Buffer instead.");
        return y.isArrayBuffer(b) || y.isTypedArray(b) ? l && typeof Blob == "function" ? new Blob([b]) : Buffer.from(b) : b
    }

    function a(b, R, j) {
        let T = b;
        if (b && !j && typeof b == "object") {
            if (y.endsWith(R, "{}")) R = r ? R : R.slice(0, -2), b = JSON.stringify(b); else if (y.isArray(b) && Kd(b) || (y.isFileList(b) || y.endsWith(R, "[]")) && (T = y.toArray(b))) return R = pc(R), T.forEach(function (k, D) {
                !(y.isUndefined(k) || k === null) && t.append(i === !0 ? So([R], D, o) : i === null ? R : R + "[]", u(k))
            }), !1
        }
        return kr(b) ? !0 : (t.append(So(j, R, o), u(b)), !1)
    }

    const d = [], p = Object.assign(qd, {defaultVisitor: a, convertValue: u, isVisitable: kr});

    function g(b, R) {
        if (!y.isUndefined(b)) {
            if (d.indexOf(b) !== -1) throw Error("Circular reference detected in " + R.join("."));
            d.push(b), y.forEach(b, function (T, N) {
                (!(y.isUndefined(T) || T === null) && s.call(t, T, y.isString(N) ? N.trim() : N, R, p)) === !0 && g(T, R ? R.concat(N) : [N])
            }), d.pop()
        }
    }

    if (!y.isObject(e)) throw new TypeError("data must be an object");
    return g(e), t
}

function Co(e) {
    const t = {"!": "%21", "'": "%27", "(": "%28", ")": "%29", "~": "%7E", "%20": "+", "%00": "\0"};
    return encodeURIComponent(e).replace(/[!'()~]|%20|%00/g, function (r) {
        return t[r]
    })
}

function bs(e, t) {
    this._pairs = [], e && sr(e, this, t)
}

const mc = bs.prototype;
mc.append = function (t, n) {
    this._pairs.push([t, n])
};
mc.toString = function (t) {
    const n = t ? function (r) {
        return t.call(this, r, Co)
    } : Co;
    return this._pairs.map(function (s) {
        return n(s[0]) + "=" + n(s[1])
    }, "").join("&")
};

function zd(e) {
    return encodeURIComponent(e).replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, "+").replace(/%5B/gi, "[").replace(/%5D/gi, "]")
}

function gc(e, t, n) {
    if (!t) return e;
    const r = n && n.encode || zd, s = n && n.serialize;
    let o;
    if (s ? o = s(t, n) : o = y.isURLSearchParams(t) ? t.toString() : new bs(t, n).toString(r), o) {
        const i = e.indexOf("#");
        i !== -1 && (e = e.slice(0, i)), e += (e.indexOf("?") === -1 ? "?" : "&") + o
    }
    return e
}

class Vd {
    constructor() {
        this.handlers = []
    }

    use(t, n, r) {
        return this.handlers.push({
            fulfilled: t,
            rejected: n,
            synchronous: r ? r.synchronous : !1,
            runWhen: r ? r.runWhen : null
        }), this.handlers.length - 1
    }

    eject(t) {
        this.handlers[t] && (this.handlers[t] = null)
    }

    clear() {
        this.handlers && (this.handlers = [])
    }

    forEach(t) {
        y.forEach(this.handlers, function (r) {
            r !== null && t(r)
        })
    }
}

const Po = Vd, _c = {silentJSONParsing: !0, forcedJSONParsing: !0, clarifyTimeoutError: !1},
    Wd = typeof URLSearchParams < "u" ? URLSearchParams : bs, Jd = typeof FormData < "u" ? FormData : null,
    Gd = typeof Blob < "u" ? Blob : null, Qd = (() => {
        let e;
        return typeof navigator < "u" && ((e = navigator.product) === "ReactNative" || e === "NativeScript" || e === "NS") ? !1 : typeof window < "u" && typeof document < "u"
    })(),
    Yd = (() => typeof WorkerGlobalScope < "u" && self instanceof WorkerGlobalScope && typeof self.importScripts == "function")(),
    Se = {
        isBrowser: !0,
        classes: {URLSearchParams: Wd, FormData: Jd, Blob: Gd},
        isStandardBrowserEnv: Qd,
        isStandardBrowserWebWorkerEnv: Yd,
        protocols: ["http", "https", "file", "blob", "url", "data"]
    };

function Xd(e, t) {
    return sr(e, new Se.classes.URLSearchParams, Object.assign({
        visitor: function (n, r, s, o) {
            return Se.isNode && y.isBuffer(n) ? (this.append(r, n.toString("base64")), !1) : o.defaultVisitor.apply(this, arguments)
        }
    }, t))
}

function Zd(e) {
    return y.matchAll(/\w+|\[(\w*)]/g, e).map(t => t[0] === "[]" ? "" : t[1] || t[0])
}

function eh(e) {
    const t = {}, n = Object.keys(e);
    let r;
    const s = n.length;
    let o;
    for (r = 0; r < s; r++) o = n[r], t[o] = e[o];
    return t
}

function yc(e) {
    function t(n, r, s, o) {
        let i = n[o++];
        const c = Number.isFinite(+i), l = o >= n.length;
        return i = !i && y.isArray(s) ? s.length : i, l ? (y.hasOwnProp(s, i) ? s[i] = [s[i], r] : s[i] = r, !c) : ((!s[i] || !y.isObject(s[i])) && (s[i] = []), t(n, r, s[i], o) && y.isArray(s[i]) && (s[i] = eh(s[i])), !c)
    }

    if (y.isFormData(e) && y.isFunction(e.entries)) {
        const n = {};
        return y.forEachEntry(e, (r, s) => {
            t(Zd(r), s, n, 0)
        }), n
    }
    return null
}

function th(e, t, n) {
    if (y.isString(e)) try {
        return (t || JSON.parse)(e), y.trim(e)
    } catch (r) {
        if (r.name !== "SyntaxError") throw r
    }
    return (n || JSON.stringify)(e)
}

const vs = {
    transitional: _c,
    adapter: Se.isNode ? "http" : "xhr",
    transformRequest: [function (t, n) {
        const r = n.getContentType() || "", s = r.indexOf("application/json") > -1, o = y.isObject(t);
        if (o && y.isHTMLForm(t) && (t = new FormData(t)), y.isFormData(t)) return s && s ? JSON.stringify(yc(t)) : t;
        if (y.isArrayBuffer(t) || y.isBuffer(t) || y.isStream(t) || y.isFile(t) || y.isBlob(t)) return t;
        if (y.isArrayBufferView(t)) return t.buffer;
        if (y.isURLSearchParams(t)) return n.setContentType("application/x-www-form-urlencoded;charset=utf-8", !1), t.toString();
        let c;
        if (o) {
            if (r.indexOf("application/x-www-form-urlencoded") > -1) return Xd(t, this.formSerializer).toString();
            if ((c = y.isFileList(t)) || r.indexOf("multipart/form-data") > -1) {
                const l = this.env && this.env.FormData;
                return sr(c ? {"files[]": t} : t, l && new l, this.formSerializer)
            }
        }
        return o || s ? (n.setContentType("application/json", !1), th(t)) : t
    }],
    transformResponse: [function (t) {
        const n = this.transitional || vs.transitional, r = n && n.forcedJSONParsing, s = this.responseType === "json";
        if (t && y.isString(t) && (r && !this.responseType || s)) {
            const i = !(n && n.silentJSONParsing) && s;
            try {
                return JSON.parse(t)
            } catch (c) {
                if (i) throw c.name === "SyntaxError" ? q.from(c, q.ERR_BAD_RESPONSE, this, null, this.response) : c
            }
        }
        return t
    }],
    timeout: 0,
    xsrfCookieName: "XSRF-TOKEN",
    xsrfHeaderName: "X-XSRF-TOKEN",
    maxContentLength: -1,
    maxBodyLength: -1,
    env: {FormData: Se.classes.FormData, Blob: Se.classes.Blob},
    validateStatus: function (t) {
        return t >= 200 && t < 300
    },
    headers: {common: {Accept: "application/json, text/plain, */*", "Content-Type": void 0}}
};
y.forEach(["delete", "get", "head", "post", "put", "patch"], e => {
    vs.headers[e] = {}
});
const Es = vs,
    nh = y.toObjectSet(["age", "authorization", "content-length", "content-type", "etag", "expires", "from", "host", "if-modified-since", "if-unmodified-since", "last-modified", "location", "max-forwards", "proxy-authorization", "referer", "retry-after", "user-agent"]),
    rh = e => {
        const t = {};
        let n, r, s;
        return e && e.split(`
`).forEach(function (i) {
            s = i.indexOf(":"), n = i.substring(0, s).trim().toLowerCase(), r = i.substring(s + 1).trim(), !(!n || t[n] && nh[n]) && (n === "set-cookie" ? t[n] ? t[n].push(r) : t[n] = [r] : t[n] = t[n] ? t[n] + ", " + r : r)
        }), t
    }, Ao = Symbol("internals");

function Yt(e) {
    return e && String(e).trim().toLowerCase()
}

function Pn(e) {
    return e === !1 || e == null ? e : y.isArray(e) ? e.map(Pn) : String(e)
}

function sh(e) {
    const t = Object.create(null), n = /([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;
    let r;
    for (; r = n.exec(e);) t[r[1]] = r[2];
    return t
}

const oh = e => /^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(e.trim());

function br(e, t, n, r, s) {
    if (y.isFunction(r)) return r.call(this, t, n);
    if (s && (t = n), !!y.isString(t)) {
        if (y.isString(r)) return t.indexOf(r) !== -1;
        if (y.isRegExp(r)) return r.test(t)
    }
}

function ih(e) {
    return e.trim().toLowerCase().replace(/([a-z\d])(\w*)/g, (t, n, r) => n.toUpperCase() + r)
}

function ch(e, t) {
    const n = y.toCamelCase(" " + t);
    ["get", "set", "has"].forEach(r => {
        Object.defineProperty(e, r + n, {
            value: function (s, o, i) {
                return this[r].call(this, t, s, o, i)
            }, configurable: !0
        })
    })
}

class or {
    constructor(t) {
        t && this.set(t)
    }

    set(t, n, r) {
        const s = this;

        function o(c, l, u) {
            const a = Yt(l);
            if (!a) throw new Error("header name must be a non-empty string");
            const d = y.findKey(s, a);
            (!d || s[d] === void 0 || u === !0 || u === void 0 && s[d] !== !1) && (s[d || l] = Pn(c))
        }

        const i = (c, l) => y.forEach(c, (u, a) => o(u, a, l));
        return y.isPlainObject(t) || t instanceof this.constructor ? i(t, n) : y.isString(t) && (t = t.trim()) && !oh(t) ? i(rh(t), n) : t != null && o(n, t, r), this
    }

    get(t, n) {
        if (t = Yt(t), t) {
            const r = y.findKey(this, t);
            if (r) {
                const s = this[r];
                if (!n) return s;
                if (n === !0) return sh(s);
                if (y.isFunction(n)) return n.call(this, s, r);
                if (y.isRegExp(n)) return n.exec(s);
                throw new TypeError("parser must be boolean|regexp|function")
            }
        }
    }

    has(t, n) {
        if (t = Yt(t), t) {
            const r = y.findKey(this, t);
            return !!(r && this[r] !== void 0 && (!n || br(this, this[r], r, n)))
        }
        return !1
    }

    delete(t, n) {
        const r = this;
        let s = !1;

        function o(i) {
            if (i = Yt(i), i) {
                const c = y.findKey(r, i);
                c && (!n || br(r, r[c], c, n)) && (delete r[c], s = !0)
            }
        }

        return y.isArray(t) ? t.forEach(o) : o(t), s
    }

    clear(t) {
        const n = Object.keys(this);
        let r = n.length, s = !1;
        for (; r--;) {
            const o = n[r];
            (!t || br(this, this[o], o, t, !0)) && (delete this[o], s = !0)
        }
        return s
    }

    normalize(t) {
        const n = this, r = {};
        return y.forEach(this, (s, o) => {
            const i = y.findKey(r, o);
            if (i) {
                n[i] = Pn(s), delete n[o];
                return
            }
            const c = t ? ih(o) : String(o).trim();
            c !== o && delete n[o], n[c] = Pn(s), r[c] = !0
        }), this
    }

    concat(...t) {
        return this.constructor.concat(this, ...t)
    }

    toJSON(t) {
        const n = Object.create(null);
        return y.forEach(this, (r, s) => {
            r != null && r !== !1 && (n[s] = t && y.isArray(r) ? r.join(", ") : r)
        }), n
    }

    [Symbol.iterator]() {
        return Object.entries(this.toJSON())[Symbol.iterator]()
    }

    toString() {
        return Object.entries(this.toJSON()).map(([t, n]) => t + ": " + n).join(`
`)
    }

    get [Symbol.toStringTag]() {
        return "AxiosHeaders"
    }

    static from(t) {
        return t instanceof this ? t : new this(t)
    }

    static concat(t, ...n) {
        const r = new this(t);
        return n.forEach(s => r.set(s)), r
    }

    static accessor(t) {
        const r = (this[Ao] = this[Ao] = {accessors: {}}).accessors, s = this.prototype;

        function o(i) {
            const c = Yt(i);
            r[c] || (ch(s, i), r[c] = !0)
        }

        return y.isArray(t) ? t.forEach(o) : o(t), this
    }
}

or.accessor(["Content-Type", "Content-Length", "Accept", "Accept-Encoding", "User-Agent", "Authorization"]);
y.reduceDescriptors(or.prototype, ({value: e}, t) => {
    let n = t[0].toUpperCase() + t.slice(1);
    return {
        get: () => e, set(r) {
            this[n] = r
        }
    }
});
y.freezeMethods(or);
const Je = or;

function vr(e, t) {
    const n = this || Es, r = t || n, s = Je.from(r.headers);
    let o = r.data;
    return y.forEach(e, function (c) {
        o = c.call(n, o, s.normalize(), t ? t.status : void 0)
    }), s.normalize(), o
}

function bc(e) {
    return !!(e && e.__CANCEL__)
}

function gn(e, t, n) {
    q.call(this, e ?? "canceled", q.ERR_CANCELED, t, n), this.name = "CanceledError"
}

y.inherits(gn, q, {__CANCEL__: !0});

function lh(e, t, n) {
    const r = n.config.validateStatus;
    !n.status || !r || r(n.status) ? e(n) : t(new q("Request failed with status code " + n.status, [q.ERR_BAD_REQUEST, q.ERR_BAD_RESPONSE][Math.floor(n.status / 100) - 4], n.config, n.request, n))
}

const uh = Se.isStandardBrowserEnv ? function () {
    return {
        write: function (n, r, s, o, i, c) {
            const l = [];
            l.push(n + "=" + encodeURIComponent(r)), y.isNumber(s) && l.push("expires=" + new Date(s).toGMTString()), y.isString(o) && l.push("path=" + o), y.isString(i) && l.push("domain=" + i), c === !0 && l.push("secure"), document.cookie = l.join("; ")
        }, read: function (n) {
            const r = document.cookie.match(new RegExp("(^|;\\s*)(" + n + ")=([^;]*)"));
            return r ? decodeURIComponent(r[3]) : null
        }, remove: function (n) {
            this.write(n, "", Date.now() - 864e5)
        }
    }
}() : function () {
    return {
        write: function () {
        }, read: function () {
            return null
        }, remove: function () {
        }
    }
}();

function ah(e) {
    return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(e)
}

function fh(e, t) {
    return t ? e.replace(/\/+$/, "") + "/" + t.replace(/^\/+/, "") : e
}

function vc(e, t) {
    return e && !ah(t) ? fh(e, t) : t
}

const dh = Se.isStandardBrowserEnv ? function () {
    const t = /(msie|trident)/i.test(navigator.userAgent), n = document.createElement("a");
    let r;

    function s(o) {
        let i = o;
        return t && (n.setAttribute("href", i), i = n.href), n.setAttribute("href", i), {
            href: n.href,
            protocol: n.protocol ? n.protocol.replace(/:$/, "") : "",
            host: n.host,
            search: n.search ? n.search.replace(/^\?/, "") : "",
            hash: n.hash ? n.hash.replace(/^#/, "") : "",
            hostname: n.hostname,
            port: n.port,
            pathname: n.pathname.charAt(0) === "/" ? n.pathname : "/" + n.pathname
        }
    }

    return r = s(window.location.href), function (i) {
        const c = y.isString(i) ? s(i) : i;
        return c.protocol === r.protocol && c.host === r.host
    }
}() : function () {
    return function () {
        return !0
    }
}();

function hh(e) {
    const t = /^([-+\w]{1,25})(:?\/\/|:)/.exec(e);
    return t && t[1] || ""
}

function ph(e, t) {
    e = e || 10;
    const n = new Array(e), r = new Array(e);
    let s = 0, o = 0, i;
    return t = t !== void 0 ? t : 1e3, function (l) {
        const u = Date.now(), a = r[o];
        i || (i = u), n[s] = l, r[s] = u;
        let d = o, p = 0;
        for (; d !== s;) p += n[d++], d = d % e;
        if (s = (s + 1) % e, s === o && (o = (o + 1) % e), u - i < t) return;
        const g = a && u - a;
        return g ? Math.round(p * 1e3 / g) : void 0
    }
}

function To(e, t) {
    let n = 0;
    const r = ph(50, 250);
    return s => {
        const o = s.loaded, i = s.lengthComputable ? s.total : void 0, c = o - n, l = r(c), u = o <= i;
        n = o;
        const a = {
            loaded: o,
            total: i,
            progress: i ? o / i : void 0,
            bytes: c,
            rate: l || void 0,
            estimated: l && i && u ? (i - o) / l : void 0,
            event: s
        };
        a[t ? "download" : "upload"] = !0, e(a)
    }
}

const mh = typeof XMLHttpRequest < "u", gh = mh && function (e) {
    return new Promise(function (n, r) {
        let s = e.data;
        const o = Je.from(e.headers).normalize(), i = e.responseType;
        let c;

        function l() {
            e.cancelToken && e.cancelToken.unsubscribe(c), e.signal && e.signal.removeEventListener("abort", c)
        }

        y.isFormData(s) && (Se.isStandardBrowserEnv || Se.isStandardBrowserWebWorkerEnv ? o.setContentType(!1) : o.setContentType("multipart/form-data;", !1));
        let u = new XMLHttpRequest;
        if (e.auth) {
            const g = e.auth.username || "", b = e.auth.password ? unescape(encodeURIComponent(e.auth.password)) : "";
            o.set("Authorization", "Basic " + btoa(g + ":" + b))
        }
        const a = vc(e.baseURL, e.url);
        u.open(e.method.toUpperCase(), gc(a, e.params, e.paramsSerializer), !0), u.timeout = e.timeout;

        function d() {
            if (!u) return;
            const g = Je.from("getAllResponseHeaders" in u && u.getAllResponseHeaders()), R = {
                data: !i || i === "text" || i === "json" ? u.responseText : u.response,
                status: u.status,
                statusText: u.statusText,
                headers: g,
                config: e,
                request: u
            };
            lh(function (T) {
                n(T), l()
            }, function (T) {
                r(T), l()
            }, R), u = null
        }

        if ("onloadend" in u ? u.onloadend = d : u.onreadystatechange = function () {
            !u || u.readyState !== 4 || u.status === 0 && !(u.responseURL && u.responseURL.indexOf("file:") === 0) || setTimeout(d)
        }, u.onabort = function () {
            u && (r(new q("Request aborted", q.ECONNABORTED, e, u)), u = null)
        }, u.onerror = function () {
            r(new q("Network Error", q.ERR_NETWORK, e, u)), u = null
        }, u.ontimeout = function () {
            let b = e.timeout ? "timeout of " + e.timeout + "ms exceeded" : "timeout exceeded";
            const R = e.transitional || _c;
            e.timeoutErrorMessage && (b = e.timeoutErrorMessage), r(new q(b, R.clarifyTimeoutError ? q.ETIMEDOUT : q.ECONNABORTED, e, u)), u = null
        }, Se.isStandardBrowserEnv) {
            const g = (e.withCredentials || dh(a)) && e.xsrfCookieName && uh.read(e.xsrfCookieName);
            g && o.set(e.xsrfHeaderName, g)
        }
        s === void 0 && o.setContentType(null), "setRequestHeader" in u && y.forEach(o.toJSON(), function (b, R) {
            u.setRequestHeader(R, b)
        }), y.isUndefined(e.withCredentials) || (u.withCredentials = !!e.withCredentials), i && i !== "json" && (u.responseType = e.responseType), typeof e.onDownloadProgress == "function" && u.addEventListener("progress", To(e.onDownloadProgress, !0)), typeof e.onUploadProgress == "function" && u.upload && u.upload.addEventListener("progress", To(e.onUploadProgress)), (e.cancelToken || e.signal) && (c = g => {
            u && (r(!g || g.type ? new gn(null, e, u) : g), u.abort(), u = null)
        }, e.cancelToken && e.cancelToken.subscribe(c), e.signal && (e.signal.aborted ? c() : e.signal.addEventListener("abort", c)));
        const p = hh(a);
        if (p && Se.protocols.indexOf(p) === -1) {
            r(new q("Unsupported protocol " + p + ":", q.ERR_BAD_REQUEST, e));
            return
        }
        u.send(s || null)
    })
}, An = {http: Hd, xhr: gh};
y.forEach(An, (e, t) => {
    if (e) {
        try {
            Object.defineProperty(e, "name", {value: t})
        } catch {
        }
        Object.defineProperty(e, "adapterName", {value: t})
    }
});
const Ec = {
    getAdapter: e => {
        e = y.isArray(e) ? e : [e];
        const {length: t} = e;
        let n, r;
        for (let s = 0; s < t && (n = e[s], !(r = y.isString(n) ? An[n.toLowerCase()] : n)); s++) ;
        if (!r) throw r === !1 ? new q(`Adapter ${n} is not supported by the environment`, "ERR_NOT_SUPPORT") : new Error(y.hasOwnProp(An, n) ? `Adapter '${n}' is not available in the build` : `Unknown adapter '${n}'`);
        if (!y.isFunction(r)) throw new TypeError("adapter is not a function");
        return r
    }, adapters: An
};

function Er(e) {
    if (e.cancelToken && e.cancelToken.throwIfRequested(), e.signal && e.signal.aborted) throw new gn(null, e)
}

function Io(e) {
    return Er(e), e.headers = Je.from(e.headers), e.data = vr.call(e, e.transformRequest), ["post", "put", "patch"].indexOf(e.method) !== -1 && e.headers.setContentType("application/x-www-form-urlencoded", !1), Ec.getAdapter(e.adapter || Es.adapter)(e).then(function (r) {
        return Er(e), r.data = vr.call(e, e.transformResponse, r), r.headers = Je.from(r.headers), r
    }, function (r) {
        return bc(r) || (Er(e), r && r.response && (r.response.data = vr.call(e, e.transformResponse, r.response), r.response.headers = Je.from(r.response.headers))), Promise.reject(r)
    })
}

const No = e => e instanceof Je ? e.toJSON() : e;

function kt(e, t) {
    t = t || {};
    const n = {};

    function r(u, a, d) {
        return y.isPlainObject(u) && y.isPlainObject(a) ? y.merge.call({caseless: d}, u, a) : y.isPlainObject(a) ? y.merge({}, a) : y.isArray(a) ? a.slice() : a
    }

    function s(u, a, d) {
        if (y.isUndefined(a)) {
            if (!y.isUndefined(u)) return r(void 0, u, d)
        } else return r(u, a, d)
    }

    function o(u, a) {
        if (!y.isUndefined(a)) return r(void 0, a)
    }

    function i(u, a) {
        if (y.isUndefined(a)) {
            if (!y.isUndefined(u)) return r(void 0, u)
        } else return r(void 0, a)
    }

    function c(u, a, d) {
        if (d in t) return r(u, a);
        if (d in e) return r(void 0, u)
    }

    const l = {
        url: o,
        method: o,
        data: o,
        baseURL: i,
        transformRequest: i,
        transformResponse: i,
        paramsSerializer: i,
        timeout: i,
        timeoutMessage: i,
        withCredentials: i,
        adapter: i,
        responseType: i,
        xsrfCookieName: i,
        xsrfHeaderName: i,
        onUploadProgress: i,
        onDownloadProgress: i,
        decompress: i,
        maxContentLength: i,
        maxBodyLength: i,
        beforeRedirect: i,
        transport: i,
        httpAgent: i,
        httpsAgent: i,
        cancelToken: i,
        socketPath: i,
        responseEncoding: i,
        validateStatus: c,
        headers: (u, a) => s(No(u), No(a), !0)
    };
    return y.forEach(Object.keys(Object.assign({}, e, t)), function (a) {
        const d = l[a] || s, p = d(e[a], t[a], a);
        y.isUndefined(p) && d !== c || (n[a] = p)
    }), n
}

const wc = "1.5.0", ws = {};
["object", "boolean", "number", "function", "string", "symbol"].forEach((e, t) => {
    ws[e] = function (r) {
        return typeof r === e || "a" + (t < 1 ? "n " : " ") + e
    }
});
const Fo = {};
ws.transitional = function (t, n, r) {
    function s(o, i) {
        return "[Axios v" + wc + "] Transitional option '" + o + "'" + i + (r ? ". " + r : "")
    }

    return (o, i, c) => {
        if (t === !1) throw new q(s(i, " has been removed" + (n ? " in " + n : "")), q.ERR_DEPRECATED);
        return n && !Fo[i] && (Fo[i] = !0, console.warn(s(i, " has been deprecated since v" + n + " and will be removed in the near future"))), t ? t(o, i, c) : !0
    }
};

function _h(e, t, n) {
    if (typeof e != "object") throw new q("options must be an object", q.ERR_BAD_OPTION_VALUE);
    const r = Object.keys(e);
    let s = r.length;
    for (; s-- > 0;) {
        const o = r[s], i = t[o];
        if (i) {
            const c = e[o], l = c === void 0 || i(c, o, e);
            if (l !== !0) throw new q("option " + o + " must be " + l, q.ERR_BAD_OPTION_VALUE);
            continue
        }
        if (n !== !0) throw new q("Unknown option " + o, q.ERR_BAD_OPTION)
    }
}

const Hr = {assertOptions: _h, validators: ws}, tt = Hr.validators;

class Bn {
    constructor(t) {
        this.defaults = t, this.interceptors = {request: new Po, response: new Po}
    }

    request(t, n) {
        typeof t == "string" ? (n = n || {}, n.url = t) : n = t || {}, n = kt(this.defaults, n);
        const {transitional: r, paramsSerializer: s, headers: o} = n;
        r !== void 0 && Hr.assertOptions(r, {
            silentJSONParsing: tt.transitional(tt.boolean),
            forcedJSONParsing: tt.transitional(tt.boolean),
            clarifyTimeoutError: tt.transitional(tt.boolean)
        }, !1), s != null && (y.isFunction(s) ? n.paramsSerializer = {serialize: s} : Hr.assertOptions(s, {
            encode: tt.function,
            serialize: tt.function
        }, !0)), n.method = (n.method || this.defaults.method || "get").toLowerCase();
        let i = o && y.merge(o.common, o[n.method]);
        o && y.forEach(["delete", "get", "head", "post", "put", "patch", "common"], b => {
            delete o[b]
        }), n.headers = Je.concat(i, o);
        const c = [];
        let l = !0;
        this.interceptors.request.forEach(function (R) {
            typeof R.runWhen == "function" && R.runWhen(n) === !1 || (l = l && R.synchronous, c.unshift(R.fulfilled, R.rejected))
        });
        const u = [];
        this.interceptors.response.forEach(function (R) {
            u.push(R.fulfilled, R.rejected)
        });
        let a, d = 0, p;
        if (!l) {
            const b = [Io.bind(this), void 0];
            for (b.unshift.apply(b, c), b.push.apply(b, u), p = b.length, a = Promise.resolve(n); d < p;) a = a.then(b[d++], b[d++]);
            return a
        }
        p = c.length;
        let g = n;
        for (d = 0; d < p;) {
            const b = c[d++], R = c[d++];
            try {
                g = b(g)
            } catch (j) {
                R.call(this, j);
                break
            }
        }
        try {
            a = Io.call(this, g)
        } catch (b) {
            return Promise.reject(b)
        }
        for (d = 0, p = u.length; d < p;) a = a.then(u[d++], u[d++]);
        return a
    }

    getUri(t) {
        t = kt(this.defaults, t);
        const n = vc(t.baseURL, t.url);
        return gc(n, t.params, t.paramsSerializer)
    }
}

y.forEach(["delete", "get", "head", "options"], function (t) {
    Bn.prototype[t] = function (n, r) {
        return this.request(kt(r || {}, {method: t, url: n, data: (r || {}).data}))
    }
});
y.forEach(["post", "put", "patch"], function (t) {
    function n(r) {
        return function (o, i, c) {
            return this.request(kt(c || {}, {
                method: t,
                headers: r ? {"Content-Type": "multipart/form-data"} : {},
                url: o,
                data: i
            }))
        }
    }

    Bn.prototype[t] = n(), Bn.prototype[t + "Form"] = n(!0)
});
const Tn = Bn;

class Os {
    constructor(t) {
        if (typeof t != "function") throw new TypeError("executor must be a function.");
        let n;
        this.promise = new Promise(function (o) {
            n = o
        });
        const r = this;
        this.promise.then(s => {
            if (!r._listeners) return;
            let o = r._listeners.length;
            for (; o-- > 0;) r._listeners[o](s);
            r._listeners = null
        }), this.promise.then = s => {
            let o;
            const i = new Promise(c => {
                r.subscribe(c), o = c
            }).then(s);
            return i.cancel = function () {
                r.unsubscribe(o)
            }, i
        }, t(function (o, i, c) {
            r.reason || (r.reason = new gn(o, i, c), n(r.reason))
        })
    }

    throwIfRequested() {
        if (this.reason) throw this.reason
    }

    subscribe(t) {
        if (this.reason) {
            t(this.reason);
            return
        }
        this._listeners ? this._listeners.push(t) : this._listeners = [t]
    }

    unsubscribe(t) {
        if (!this._listeners) return;
        const n = this._listeners.indexOf(t);
        n !== -1 && this._listeners.splice(n, 1)
    }

    static source() {
        let t;
        return {
            token: new Os(function (s) {
                t = s
            }), cancel: t
        }
    }
}

const yh = Os;

function bh(e) {
    return function (n) {
        return e.apply(null, n)
    }
}

function vh(e) {
    return y.isObject(e) && e.isAxiosError === !0
}

const Kr = {
    Continue: 100,
    SwitchingProtocols: 101,
    Processing: 102,
    EarlyHints: 103,
    Ok: 200,
    Created: 201,
    Accepted: 202,
    NonAuthoritativeInformation: 203,
    NoContent: 204,
    ResetContent: 205,
    PartialContent: 206,
    MultiStatus: 207,
    AlreadyReported: 208,
    ImUsed: 226,
    MultipleChoices: 300,
    MovedPermanently: 301,
    Found: 302,
    SeeOther: 303,
    NotModified: 304,
    UseProxy: 305,
    Unused: 306,
    TemporaryRedirect: 307,
    PermanentRedirect: 308,
    BadRequest: 400,
    Unauthorized: 401,
    PaymentRequired: 402,
    Forbidden: 403,
    NotFound: 404,
    MethodNotAllowed: 405,
    NotAcceptable: 406,
    ProxyAuthenticationRequired: 407,
    RequestTimeout: 408,
    Conflict: 409,
    Gone: 410,
    LengthRequired: 411,
    PreconditionFailed: 412,
    PayloadTooLarge: 413,
    UriTooLong: 414,
    UnsupportedMediaType: 415,
    RangeNotSatisfiable: 416,
    ExpectationFailed: 417,
    ImATeapot: 418,
    MisdirectedRequest: 421,
    UnprocessableEntity: 422,
    Locked: 423,
    FailedDependency: 424,
    TooEarly: 425,
    UpgradeRequired: 426,
    PreconditionRequired: 428,
    TooManyRequests: 429,
    RequestHeaderFieldsTooLarge: 431,
    UnavailableForLegalReasons: 451,
    InternalServerError: 500,
    NotImplemented: 501,
    BadGateway: 502,
    ServiceUnavailable: 503,
    GatewayTimeout: 504,
    HttpVersionNotSupported: 505,
    VariantAlsoNegotiates: 506,
    InsufficientStorage: 507,
    LoopDetected: 508,
    NotExtended: 510,
    NetworkAuthenticationRequired: 511
};
Object.entries(Kr).forEach(([e, t]) => {
    Kr[t] = e
});
const Eh = Kr;

function Oc(e) {
    const t = new Tn(e), n = sc(Tn.prototype.request, t);
    return y.extend(n, Tn.prototype, t, {allOwnKeys: !0}), y.extend(n, t, null, {allOwnKeys: !0}), n.create = function (s) {
        return Oc(kt(e, s))
    }, n
}

const ne = Oc(Es);
ne.Axios = Tn;
ne.CanceledError = gn;
ne.CancelToken = yh;
ne.isCancel = bc;
ne.VERSION = wc;
ne.toFormData = sr;
ne.AxiosError = q;
ne.Cancel = ne.CanceledError;
ne.all = function (t) {
    return Promise.all(t)
};
ne.spread = bh;
ne.isAxiosError = vh;
ne.mergeConfig = kt;
ne.AxiosHeaders = Je;
ne.formToJSON = e => yc(y.isHTMLForm(e) ? new FormData(e) : e);
ne.getAdapter = Ec.getAdapter;
ne.HttpStatusCode = Eh;
ne.default = ne;
const Mo = ne;

function Ve(e) {
    if (typeof e != "object") return e;
    var t, n, r = Object.prototype.toString.call(e);
    if (r === "[object Object]") {
        if (e.constructor !== Object && typeof e.constructor == "function") {
            n = new e.constructor;
            for (t in e) e.hasOwnProperty(t) && n[t] !== e[t] && (n[t] = Ve(e[t]))
        } else {
            n = {};
            for (t in e) t === "__proto__" ? Object.defineProperty(n, t, {
                value: Ve(e[t]),
                configurable: !0,
                enumerable: !0,
                writable: !0
            }) : n[t] = Ve(e[t])
        }
        return n
    }
    if (r === "[object Array]") {
        for (t = e.length, n = Array(t); t--;) n[t] = Ve(e[t]);
        return n
    }
    return r === "[object Set]" ? (n = new Set, e.forEach(function (s) {
        n.add(Ve(s))
    }), n) : r === "[object Map]" ? (n = new Map, e.forEach(function (s, o) {
        n.set(Ve(o), Ve(s))
    }), n) : r === "[object Date]" ? new Date(+e) : r === "[object RegExp]" ? (n = new RegExp(e.source, e.flags), n.lastIndex = e.lastIndex, n) : r === "[object DataView]" ? new e.constructor(Ve(e.buffer)) : r === "[object ArrayBuffer]" ? e.slice(0) : r.slice(-6) === "Array]" ? new e.constructor(e) : e
}

const wr = {filesTree: null, finallyRequest: !1}, wh = {
    state: wr, mutations: {
        setFileData(e, t) {
            e.filesTree = Ve(t)
        }
    }, actions: {
        async fetchFile({commit: e}) {
            const t = "./src/api/json/files-tree.json";
            wr.finallyRequest = !1, await Mo.get(t).then(n => {
                e("setFileData", n.data)
            }).catch(n => {
                e("setFileData", void 0), console.error(n)
            }).finally(() => wr.finallyRequest = !0)
        }
    }, getters: {
        sendingFileToServer(e) {
            const t = "http://localhost:8081/";
            Mo.post(t, {body: e.filesTree}).then(n => {
                console.log(n)
            }).catch(n => {
                console.log(n)
            })
        }, getFileData(e) {
            return e.filesTree
        }
    }
}, Oh = cd({modules: {conditionPath: wh}}), Rh = {
    beforeMount(e, t) {
        e.clickOutsideEvent = n => {
            n.stopPropagation(), e === n.target || e.contains(n.target) || t.value()
        }, document.addEventListener("click", e.clickOutsideEvent)
    }, beforeUnmount(e) {
        document.removeEventListener("click", e.clickOutsideEvent)
    }
}, ir = zu(Cf);
ir.use(qf);
ir.use(Oh);
ir.directive("clickOutside", Rh);
ir.mount("#app");
export {
    we as F,
    Vi as R,
    bf as U,
    at as _,
    Re as a,
    vt as b,
    ut as c,
    bt as d,
    ee as e,
    dl as f,
    as as g,
    Sh as h,
    Ch as i,
    jn as j,
    Ve as k,
    Ai as l,
    hu as m,
    Qr as n,
    Te as o,
    Jn as p,
    ot as q,
    _i as r,
    is as s,
    Uo as t,
    Ph as u,
    cs as v,
    xh as w
};
