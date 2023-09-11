import {
    _ as p,
    a as O,
    b as S,
    c as f,
    d as k,
    e as d,
    f as E,
    F as x,
    g as y,
    h as j,
    i as m,
    j as q,
    k as w,
    l as N,
    m as D,
    n as M,
    o as n,
    p as U,
    q as G,
    r as V,
    R as L,
    t as B,
    u as I,
    w as K
} from "./index-41432fe8.js";

const R = {}, z = {class: "sidebar"};

function H(t, s) {
    return n(), f("div", z, [V(t.$slots, "default", {}, void 0, !0)])
}

const J = p(R, [["render", H], ["__scopeId", "data-v-4c25bbe5"]]);
const Q = {}, W = {class: "content"};

function X(t, s) {
    return n(), f("div", W, [V(t.$slots, "default", {}, void 0, !0)])
}

const Y = p(Q, [["render", X], ["__scopeId", "data-v-d6faaa76"]]), Z = "https://disolm.github.io/file-manager_vue/assets/add-folder-svgrepo-com-64713310.svg",
    ee = "https://disolm.github.io/file-manager_vue/assets/add-file-svgrepo-com-b3a42f4b.svg", te = "https://disolm.github.io/file-manager_vue/assets/check-mark-svgrepo-com-bb2a2082.svg",
    se = "https://disolm.github.io/file-manager_vue/assets/cross-svgrepo-com-52833902.svg", re = "https://disolm.github.io/file-manager_vue/assets/directory-svgrepo-com-5b8865f1.svg",
    oe = "https://disolm.github.io/file-manager_vue/assets/file-directory-svgrepo-com-898f80cb.svg", ae = "https://disolm.github.io/file-manager_vue/assets/ellipsis-v-svgrepo-com-9cad17e2.svg",
    ne = "https://disolm.github.io/file-manager_vue/assets/files-by-google-svgrepo-com-e3d2f247.svg", ce = "https://disolm.github.io/file-manager_vue/assets/folder-tree-icon-d4638ad1.svg",
    le = "https://disolm.github.io/file-manager_vue/assets/pencil-file-svgrepo-com-c6ef03f1.svg", ie = "https://disolm.github.io/file-manager_vue/assets/pencil-folder-svgrepo-com-353f13f8.svg",
    de = "https://disolm.github.io/file-manager_vue/assets/pencil-svgrepo-com-23daafea.svg", _e = "https://disolm.github.io/file-manager_vue/assets/trash-bin-trash-svgrepo-com-f3c33ccf.svg",
    ue = "https://disolm.github.io/file-manager_vue/assets/question-mark-svgrepo-com-67cd5fa2.svg", fe = ["alt", "src"], pe = k({
        __name: "UiIcon", props: {icon: {}}, setup(t) {
            const s = t, e = {
                "add-folder": Z,
                "add-file": ee,
                "check-mark": te,
                cross: se,
                directory: re,
                "directory-empty": oe,
                ellipsis: ae,
                files: ne,
                "folder-tree": ce,
                "pencil-file": le,
                "pencil-folder": ie,
                pencil: de,
                "trash-bin": _e,
                "question-mark": ue
            }, o = O(() => e[s.icon]);
            return (a, r) => (n(), f("img", {
                class: "icon",
                alt: a.icon,
                src: o.value,
                draggable: "false"
            }, null, 8, fe))
        }
    });
const b = p(pe, [["__scopeId", "data-v-bfec158f"]]), ve = {
    name: "UiInput",
    inheritAttrs: !1,
    props: {modelValue: {type: String, required: !1}, placeholder: {type: String, default: ""}},
    emits: ["update:modelValue"],
    methods: {
        focus() {
            this.$refs.input.focus()
        }
    },
    mounted() {
        this.focus()
    }
};
const he = {class: "input"}, me = ["value", "placeholder"];

function ge(t, s, e, o, a, r) {
    return n(), f("div", he, [S("input", D({
        ref: "input",
        class: "input__input",
        value: e.modelValue
    }, t.$attrs, {
        onInput: s[0] || (s[0] = l => t.$emit("update:modelValue", l.target.value)),
        placeholder: e.placeholder
    }), null, 16, me)])
}

const ye = p(ve, [["render", ge], ["__scopeId", "data-v-ef81f1e6"]]), ke = {class: "edit-name-file-or-folder"}, Fe = k({
    __name: "EditNameFileOrFolder", props: {path: {}}, emits: ["closeEdit"], setup(t, {emit: s}) {
        const e = t, o = I(), a = w(o.getters.getFileData), r = e.path[e.path.length - 1];
        let l = r;
        const c = O({
            get() {
                return e.path[e.path.length - 1]
            }, set(_) {
                l = _
            }
        }), i = () => {
            const _ = e.path.length, u = e.path;
            let h = a;
            u.forEach((F, T) => {
                if (T < _ - 1) h = h.files[F]; else {
                    const A = Object.entries(h.files).map($ => ($[0] === r && ($.shift(), $.unshift(l)), $));
                    v() || (h.files = Object.fromEntries(A))
                }
            }), o.commit("setFileData", a), s("closeEdit")
        }, v = () => {
            let _ = w(a);
            const u = e.path;
            return u.some((h, F) => {
                if (F < u.length - 1) _ = _.files[h]; else if (F === u.length - 1) return !!_.files[l]
            })
        }, g = () => {
            s("closeEdit")
        };
        return (_, u) => (n(), f("div", ke, [d(ye, {
            modelValue: c.value,
            "onUpdate:modelValue": u[0] || (u[0] = h => c.value = h),
            placeholder: "new name",
            class: "edit-name-file-or-folder__input"
        }, null, 8, ["modelValue"]), d(b, {
            onClick: i,
            icon: "check-mark",
            class: "edit-name-file-or-folder__icon edit-name-file-or-folder__icon_click"
        }), d(b, {
            onClick: g,
            icon: "cross",
            class: "edit-name-file-or-folder__icon edit-name-file-or-folder__icon_click"
        })]))
    }
});
const be = k({
    __name: "DeletePartTree", props: {path: {}}, setup(t) {
        const s = t, e = I(), o = () => {
            const i = s.path.length, v = s.path;
            let g = e.getters.getFileData;
            v.forEach((_, u) => {
                if (u < i - 1) g = g.files[_]; else {
                    const F = Object.entries(g.files).filter(T => T[0] !== v[i - 1]);
                    g.files = Object.fromEntries(F)
                }
            })
        };
        let a;
        const r = E(!1), l = i => {
            r.value = !0, a = setTimeout(() => {
                o(), r.value = !1
            }, i)
        }, c = () => {
            clearTimeout(a), r.value = !1
        };
        return (i, v) => (n(), y(b, {
            onMousedown: v[0] || (v[0] = g => l(1e3)),
            onMouseup: c,
            onMouseout: c,
            icon: "trash-bin",
            class: M(["delete-part-tree__icon delete-part-tree__icon_click", {"timer-del": r.value}])
        }, null, 8, ["class"]))
    }
});
const $e = p(be, [["__scopeId", "data-v-bc600130"]]);

function P() {
    return Date.now().toString(36) + Math.random().toString(36)
}

const Ve = {class: "add-part-tree"}, Oe = "New folder", Ie = k({
    __name: "AddPartTree", props: {path: {}}, setup(t) {
        const s = t, e = I(), o = {id: String(P()), type: "directory", files: {}}, a = () => {
            const r = s.path.length, l = s.path;
            let c = e.getters.getFileData;
            l.forEach((i, v) => {
                v < r - 1 ? c = c.files[i] : c.files[i].files = {...w(c.files[i].files), [Oe]: o}
            })
        };
        return (r, l) => (n(), f("div", Ve, [d(b, {
            onClick: a,
            icon: "add-folder",
            class: "add-part-tree__icon add-part-tree__icon_click"
        })]))
    }
});
const Te = p(Ie, [["__scopeId", "data-v-93b434fc"]]), Ue = {class: "file-or-folder"},
    we = {class: "file-or-folder__name"}, Ee = k({
        __name: "UiFileOrFolder", props: {directory: {}, path: {}}, setup(t) {
            const s = t, e = E(!1), o = O(() => {
                var r, l, c;
                return ((r = s.directory) == null ? void 0 : r.type) === "directory" ? e.value ? "pencil-folder" : Object.keys((l = s.directory) == null ? void 0 : l.files).length ? "directory" : "directory-empty" : ((c = s.directory) == null ? void 0 : c.type) === "file" ? e.value ? "pencil-file" : "files" : "question-mark"
            }), a = () => {
                e.value = !e.value
            };
            return (r, l) => {
                var i;
                const c = j("clickOutside");
                return n(), f("div", Ue, [d(b, {
                    icon: o.value,
                    class: "file-or-folder__icon"
                }, null, 8, ["icon"]), S("div", we, [e.value ? m("", !0) : V(r.$slots, "default", {key: 0}, void 0, !0), e.value ? K((n(), y(Fe, {
                    key: 1,
                    path: r.path,
                    onCloseEdit: a
                }, null, 8, ["path"])), [[c, a]]) : m("", !0)]), e.value ? m("", !0) : (n(), y(b, {
                    key: 0,
                    onMouseup: a,
                    icon: "pencil",
                    class: "file-or-folder__icon file-or-folder__icon_click"
                })), e.value ? m("", !0) : (n(), f(x, {key: 1}, [((i = r.directory) == null ? void 0 : i.type) === "directory" ? (n(), y(Te, {
                    key: 0,
                    path: r.path
                }, null, 8, ["path"])) : m("", !0), d($e, {path: r.path}, null, 8, ["path"])], 64))])
            }
        }
    });
const Ce = p(Ee, [["__scopeId", "data-v-dd858b7f"]]);

function Se(t) {
    return typeof t == "function" || Object.prototype.toString.call(t) === "[object Object]" && !q(t)
}

const xe = [], Ne = k({
    name: "file-track", props: {dataFiles: {type: Object, required: !0}}, methods: {
        renderUi(t, s, e) {
            const o = P();
            return d(x, null, [d(Ce, {
                directory: s,
                key: o,
                path: e
            }, Se(t) ? t : {default: () => [t]}), d("div", {class: "file-track__tab"}, [s.type === "directory" && this.readFilesAndFoldersInFolder(s.files, e)])])
        }, readFilesAndFoldersInFolder(t, s) {
            return Object.entries(t).map(([o, a]) => {
                const r = s.concat([o]);
                return this.renderUi(o, a, r)
            })
        }
    }, render() {
        return d("div", {class: "file-track"}, [this.readFilesAndFoldersInFolder(this.dataFiles.files, xe)])
    }
});
const Pe = p(Ne, [["__scopeId", "data-v-9c628b79"]]),
    Ae = {name: "UiAlert", props: {text: {type: String, default: "Error..."}}};
const De = {class: "alert"};

function Me(t, s, e, o, a, r) {
    return n(), f("div", De, [V(t.$slots, "default", {}, () => [N(B(e.text), 1)], !0)])
}

const C = p(Ae, [["render", Me], ["__scopeId", "data-v-5825ff77"]]), je = {class: "file-manager"}, Ke = k({
    __name: "FileManagerView", setup(t) {
        const s = I(), e = E(!0), o = O(() => s.getters.getFileData);
        return (async () => (await s.dispatch("fetchFile"), e.value = !1))(), (a, r) => (n(), f("div", je, [d(J, null, {
            default: U(() => [e.value ? (n(), y(C, {key: 0}, {
                default: U(() => [N("загрузка")]),
                _: 1
            })) : m("", !0), !e.value && !o.value ? (n(), y(C, {key: 1})) : m("", !0), o.value ? (n(), y(Pe, {
                key: 2,
                "data-files": o.value
            }, null, 8, ["data-files"])) : m("", !0)]), _: 1
        }), d(Y, null, {default: U(() => [d(G(L))]), _: 1})]))
    }
});
const Ge = p(Ke, [["__scopeId", "data-v-ee6755a8"]]);
export {Ge as default};
