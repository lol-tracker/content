(() => {
  "use strict";
  var t = [
      ,
      (t) => {
        let e;
        function i() {
          return (
            e ||
            (console.error(
              "The `provider` object has not been set, please do so by calling the `init` method.",
            ),
            null)
          );
        }
        const o = {
          init: function (t, i) {
            return (e = t), this.add(i);
          },
          _getValue: function (t, i) {
            let o;
            return (
              "function" == typeof i
                ? ((o = i(e)),
                  o ||
                    console.warn(
                      "The function for key " + t + " returned a falsy value: ",
                      o,
                    ))
                : "string" == typeof i
                  ? ((o = e.get(i)),
                    o ||
                      console.warn(
                        "The provider `get` invocation for the key " +
                          t +
                          " returned a falsy value: ",
                        o,
                      ))
                  : "object" == typeof i && (o = i),
              o
            );
          },
          add: function (t) {
            t = t || {};
            const e = [],
              i = this;
            return (
              Object.keys(t).forEach(function (o) {
                const n = t[o],
                  a = i._getValue(o, n);
                a && a.then
                  ? (a.then(function (t) {
                      t ||
                        console.warn(
                          "The promise for the key " +
                            o +
                            " resolved with a falsy value: ",
                          t,
                        ),
                        i._addValue(o, t);
                    }),
                    e.push(a))
                  : i._addValue(o, a);
              }),
              Promise.all(e)
            );
          },
          _addValue: function (t, e) {
            this[t] = e;
          },
          provider: function () {
            return (
              console.error(
                "The function `provider` has been deprecated, please use `getProvider`",
                new Error().stack,
              ),
              i()
            );
          },
          getProvider: function () {
            return i();
          },
        };
        t.exports = o;
      },
      (t, e, i) => {
        i.r(e);
      },
      (t, e, i) => {
        Object.defineProperty(e, "__esModule", { value: !0 }),
          (e.default = function () {
            const t = new n.default();
            return new o.default(t);
          });
        var o = a(i(4)),
          n = a(i(5));
        function a(t) {
          return t && t.__esModule ? t : { default: t };
        }
      },
      (t, e) => {
        Object.defineProperty(e, "__esModule", { value: !0 }),
          (e.default = void 0);
        let i = null;
        e.default = class {
          constructor(t) {
            (i = t), i.initAfterLogin();
          }
        };
      },
      (t, e, i) => {
        Object.defineProperty(e, "__esModule", { value: !0 }),
          (e.default = void 0);
        var o = i(1),
          n = r(i(6)),
          a = r(i(8));
        function r(t) {
          return t && t.__esModule ? t : { default: t };
        }
        e.default = class {
          constructor() {
            (this.kickoutDialog = new n.default()),
              (this.antiAddiction = new a.default());
          }
          initAfterLogin() {
            const t = (0, o.getProvider)().getSocket();
            (0, o.dataBinding)("/lol-login", t).observe("v1/session", (t) => {
              t &&
                "SUCCEEDED" === t.state &&
                (this._bindingKickout(), this._bindingAntiAddiction());
            });
          }
          _bindingKickout() {
            const t = (0, o.getProvider)().getSocket();
            (0, o.dataBinding)("/lol-kickout", t).observe(
              "/v1/notification",
              (t) => {
                t && t.message && this.kickoutDialog.showDialog(t.message, 10);
              },
            );
          }
          _bindingAntiAddiction() {
            const t = (0, o.getProvider)().getSocket(),
              e = (0, o.dataBinding)("/anti-addiction", t);
            e.observe(
              "/v1/policies/antiAddictionWarning/anti-addiction-state",
              this._cbAntiAddiction.bind(this),
            ),
              e.observe(
                "/v1/policies/antiAddictionShutdown/anti-addiction-state",
                this._cbAntiAddiction.bind(this),
              );
          }
          _cbAntiAddiction(t) {
            if (t && t.policyType) {
              const { policyType: e, localizationKey: i } = t;
              this.antiAddiction.showDialog(e, i);
            }
          }
        };
      },
      (t, e, i) => {
        Object.defineProperty(e, "__esModule", { value: !0 }),
          (e.default = void 0);
        var o = i(1);
        i(7);
        const n = {
          securityCheckingFailure:
            "비정상적인 접근으로 인해 클라이언트가 종료됩니다.",
        };
        var a = class {
          constructor() {
            this.modalTimerDefault, this.kickoutInterval, this.dialog;
          }
          showDialog(t, e) {
            (this.modalTimerDefault = e),
              (this.dialog = o.uiKitPlugin
                .getModalManager()
                .add({
                  type: "DialogAlert",
                  data: {
                    contents: this._makeDialogContent(t),
                    okText: o.tra.get("lib_ui_dialog_alert_ok"),
                    dismissible: !1,
                  },
                  show: !0,
                })),
              this.dialog.okPromise.then(this._kickout.bind(this)),
              this._startKickoutTimer();
          }
          _kickout() {
            clearInterval(this.kickoutInterval),
              window.riotInvoke &&
                ((0, o.dataBinding)("/lol-login").delete("/v1/session"),
                window.riotInvoke({
                  request: JSON.stringify({
                    name: "RiotClient.Exit",
                    params: [],
                  }),
                }));
          }
          _startKickoutTimer() {
            this.kickoutInterval = setInterval(
              function () {
                this.modalTimerDefault > 0
                  ? ((this.modalTimerDefault -= 1),
                    (this.dialog.domNode.querySelector(
                      ".kickout-timer",
                    ).innerHTML = this.modalTimerDefault))
                  : this.dialog.clickOkButton();
              }.bind(this),
              1e3,
            );
          }
          _makeDialogContent(t) {
            n[t] && (t = n[t]);
            const e = o.uiKitPlugin
                .getTemplateHelper()
                .contentBlockDialogSimple(
                  t,
                  "dialog-medium",
                  "kickout-notification",
                ),
              i = document.createElement("p");
            return (
              i.setAttribute("class", "kickout-timer"),
              (i.innerHTML = this.modalTimerDefault),
              e.appendChild(i),
              e
            );
          }
        };
        e.default = a;
      },
      (t, e, i) => {
        i.r(e);
      },
      (t, e, i) => {
        Object.defineProperty(e, "__esModule", { value: !0 }),
          (e.default = void 0);
        var o = i(1);
        var n = class {
          constructor() {
            this.dialog;
          }
          showDialog(t, e) {
            (this.dialog = o.uiKitPlugin
              .getModalManager()
              .add({
                type: "DialogAlert",
                data: {
                  contents: this._makeDialogContent(e),
                  okText: o.tra.get("lib_ui_dialog_alert_ok"),
                  dismissible: !1,
                },
                show: !0,
              })),
              this.dialog.okPromise.then(() => {
                this._postAction(t);
              });
          }
          _postAction(t) {
            if ("antiAddictionWarning" === t) return !1;
            this._kickout();
          }
          _kickout() {
            window.riotInvoke &&
              ((0, o.dataBinding)("/lol-login").delete("/v1/session"),
              window.riotInvoke({
                request: JSON.stringify({
                  name: "RiotClient.Exit",
                  params: [],
                }),
              }));
          }
          _makeDialogContent(t) {
            return o.uiKitPlugin
              .getTemplateHelper()
              .contentBlockDialog(
                "游戏温馨提示",
                t,
                "dialog-medium",
                "antiAddiction-notification",
              );
          }
        };
        e.default = n;
      },
    ],
    e = {};
  function i(o) {
    var n = e[o];
    if (void 0 !== n) return n.exports;
    var a = (e[o] = { exports: {} });
    return t[o](a, a.exports, i), a.exports;
  }
  (i.r = (t) => {
    "undefined" != typeof Symbol &&
      Symbol.toStringTag &&
      Object.defineProperty(t, Symbol.toStringTag, { value: "Module" }),
      Object.defineProperty(t, "__esModule", { value: !0 });
  }),
    (() => {
      var t,
        e = (t = i(1)) && t.__esModule ? t : { default: t };
      i(2);
      const o = "rcp-fe-lol-kickout",
        n = document.currentScript.ownerDocument;
      const a = window.getPluginAnnounceEventName(o);
      n.addEventListener(
        a,
        function (t) {
          (0, t.registrationHandler)(function (t) {
            return e.default
              .init(t, {
                dataBinding: (t) =>
                  t
                    .get("rcp-fe-common-libs")
                    .getDataBinding("rcp-fe-lol-kickout"),
                logger: (t) => t.get("rcp-fe-common-libs").logging.create(o),
                tra: (t) =>
                  t
                    .get("rcp-fe-lol-l10n")
                    .tra()
                    .overlay("/fe/lol-l10n/trans.json"),
                uiKitPlugin: (t) => t.get("rcp-fe-lol-uikit"),
              })
              .then(function () {
                return (0, i(3).default)();
              });
          });
        },
        { once: !0 },
      );
    })();
})();
