(() => {
  var e = [
      ,
      (e) => {
        "use strict";
        let t;
        function o() {
          return (
            t ||
            (console.error(
              "The `provider` object has not been set, please do so by calling the `init` method.",
            ),
            null)
          );
        }
        const n = {
          init: function (e, o) {
            return (t = e), this.add(o);
          },
          _getValue: function (e, o) {
            let n;
            return (
              "function" == typeof o
                ? ((n = o(t)),
                  n ||
                    console.warn(
                      "The function for key " + e + " returned a falsy value: ",
                      n,
                    ))
                : "string" == typeof o
                  ? ((n = t.get(o)),
                    n ||
                      console.warn(
                        "The provider `get` invocation for the key " +
                          e +
                          " returned a falsy value: ",
                        n,
                      ))
                  : "object" == typeof o && (n = o),
              n
            );
          },
          add: function (e) {
            e = e || {};
            const t = [],
              o = this;
            return (
              Object.keys(e).forEach(function (n) {
                const s = e[n],
                  r = o._getValue(n, s);
                r && r.then
                  ? (r.then(function (e) {
                      e ||
                        console.warn(
                          "The promise for the key " +
                            n +
                            " resolved with a falsy value: ",
                          e,
                        ),
                        o._addValue(n, e);
                    }),
                    t.push(r))
                  : o._addValue(n, r);
              }),
              Promise.all(t)
            );
          },
          _addValue: function (e, t) {
            this[e] = t;
          },
          provider: function () {
            return (
              console.error(
                "The function `provider` has been deprecated, please use `getProvider`",
                new Error().stack,
              ),
              o()
            );
          },
          getProvider: function () {
            return o();
          },
        };
        e.exports = n;
      },
      (e, t, o) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = function (e) {
            const t = new s.default();
            return (
              e.addEventListener("riotPlugin.lifecycle.postinit", () =>
                t.releaseUnlockBrake(),
              ),
              new n.default(t)
            );
          });
        var n = r(o(3)),
          s = r(o(5));
        function r(e) {
          return e && e.__esModule ? e : { default: e };
        }
      },
      (e, t, o) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        var n,
          s = (n = o(4)) && n.__esModule ? n : { default: n };
        let r = null;
        t.default = class {
          constructor(e) {
            r = e;
          }
          initPluginsLoadedLock() {
            r.initPluginsLoadedLock();
          }
          lockAndLoad(e) {
            return r.lockAndLoad(e);
          }
          addEventListener(...e) {
            return s.default.addEventListener(...e);
          }
          removeEventListener(...e) {
            return s.default.removeEventListener(...e);
          }
          hasEventListener(...e) {
            return s.default.hasEventListener(...e);
          }
          getLockState() {
            return r.isLocked;
          }
          get isLocked() {
            return r.isLocked;
          }
          set isLocked(e) {
            throw new Error(
              "Attempted to set rcp-fe-lol-lock-and-load.isLocked, which is read-only",
            );
          }
        };
      },
      function (e) {
        var t;
        e.exports =
          ((t = {}),
          ((t = function () {
            this.listeners = {};
          }).prototype = {
            addEventListener: function (e, t, o) {
              for (var n = [], s = arguments.length, r = 0; r < s; r++)
                n.push(arguments[r]);
              (n = n.length > 3 ? n.splice(3, n.length - 1) : []),
                void 0 !== this.listeners[e]
                  ? this.listeners[e].push({ scope: o, callback: t, args: n })
                  : (this.listeners[e] = [{ scope: o, callback: t, args: n }]);
            },
            removeEventListener: function (e, t, o) {
              if (void 0 !== this.listeners[e]) {
                for (
                  var n = this.listeners[e].length, s = [], r = 0;
                  r < n;
                  r++
                ) {
                  var i = this.listeners[e][r];
                  (i.scope == o && i.callback == t) || s.push(i);
                }
                this.listeners[e] = s;
              }
            },
            hasEventListener: function (e, t, o) {
              if (void 0 !== this.listeners[e]) {
                var n = this.listeners[e].length;
                if (void 0 === t && void 0 === o) return n > 0;
                for (var s = 0; s < n; s++) {
                  var r = this.listeners[e][s];
                  if ((!o || r.scope == o) && r.callback == t) return !0;
                }
              }
              return !1;
            },
            dispatch: function (e, t) {
              for (
                var o = { type: e, target: t },
                  n = [],
                  s = arguments.length,
                  r = 0;
                r < s;
                r++
              )
                n.push(arguments[r]);
              if (
                ((n = n.length > 2 ? n.splice(2, n.length - 1) : []),
                (n = [o].concat(n)),
                void 0 !== this.listeners[e])
              ) {
                var i = this.listeners[e].slice(),
                  l = i.length;
                for (r = 0; r < l; r++) {
                  var a = i[r];
                  if (a && a.callback) {
                    var c = n.concat(a.args);
                    a.callback.apply(a.scope, c);
                  }
                }
              }
            },
            getEvents: function () {
              var e = "";
              for (var t in this.listeners)
                for (var o = this.listeners[t].length, n = 0; n < o; n++) {
                  var s = this.listeners[t][n];
                  (e +=
                    s.scope && s.scope.className
                      ? s.scope.className
                      : "anonymous"),
                    (e += " listen for '" + t + "'\n");
                }
              return e;
            },
          }),
          new t());
      },
      (e, t, o) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        var n,
          s = o(1),
          r = (n = o(4)) && n.__esModule ? n : { default: n };
        t.default = class {
          constructor() {
            (this.locks = []), (this.isLocked = !1);
          }
          initPluginsLoadedLock() {
            (this._allPluginsLoadedUnlock = this.lockAndLoad({
              lockName: "rcp-fe-lol-lock-and-load:allPluginsLoaded",
            })),
              window.addEventListener("riotPlugin.allPluginsLoaded", () => {
                this._allPluginsLoadedUnlock();
              });
          }
          lockAndLoad(e = {}) {
            const { lockName: t } = e;
            t ||
              s.logger.warning(
                "Lock created with no lockName. This could make debugging difficult in the future.",
              );
            const o = Date.now(),
              n = e.promise,
              r = Number.isFinite(e.timeout) ? e.timeout : 6e4;
            let i;
            const l = [
              new Promise((e) => {
                i = e;
              }),
            ];
            if (r > 0) {
              const e = new Promise((e, t) => {
                setTimeout(t, r);
              });
              l.push(e);
            }
            n && n.then && l.push(n);
            const a = Promise.race(l);
            return (
              a
                .then(() => {
                  this.unlock(a);
                  const e = Date.now() - o;
                  s.logger.trace("Lock unlocked", {
                    lockName: t,
                    elapsedTimeMs: e,
                  });
                })
                .catch(() => {
                  this.unlock(a);
                  const e = Date.now() - o;
                  s.logger.error(
                    "Lock loader promise rejected. Possible timeout?",
                    { lockName: t, elapsedTimeMs: e },
                  );
                }),
              this.locks.push(a),
              this.updateLockedState(),
              i
            );
          }
          unlock(e) {
            const t = this.locks.indexOf(e);
            t > -1 && this.locks.splice(t, 1), this.updateLockedState();
          }
          updateLockedState() {
            this.locks.length > 0
              ? this.setLockedState()
              : this.removeLockedState();
          }
          setLockedState() {
            this.isLocked ||
              ((this.isLocked = !0),
              (this.wasEverLocked = !0),
              r.default.dispatch("lock"));
          }
          removeLockedState() {
            this.isLocked &&
              ((this.isLocked = !1),
              this.brakeReleased && r.default.dispatch("unlock"));
          }
          releaseUnlockBrake() {
            (this.brakeReleased = !0),
              !this.isLocked &&
                this.wasEverLocked &&
                r.default.dispatch("unlock");
          }
        };
      },
    ],
    t = {};
  function o(n) {
    var s = t[n];
    if (void 0 !== s) return s.exports;
    var r = (t[n] = { exports: {} });
    return e[n].call(r.exports, r, r.exports, o), r.exports;
  }
  (() => {
    "use strict";
    var e,
      t = (e = o(1)) && e.__esModule ? e : { default: e };
    const n = "rcp-fe-lol-lock-and-load",
      s = document.currentScript.ownerDocument;
    const r = window.getPluginAnnounceEventName(n);
    s.addEventListener(
      r,
      function (e) {
        (0, e.registrationHandler)(function (e) {
          return t.default
            .init(e, {
              logger: (e) => e.get("rcp-fe-common-libs").logging.create(n),
            })
            .then(() => {
              const e = (0, o(2).default)(s);
              return e.initPluginsLoadedLock(), e;
            });
        });
      },
      { once: !0 },
    );
  })();
})();
