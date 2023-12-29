(() => {
  "use strict";
  var e = [
      ,
      (e) => {
        let t;
        function n() {
          return (
            t ||
            (console.error(
              "The `provider` object has not been set, please do so by calling the `init` method.",
            ),
            null)
          );
        }
        const o = {
          init: function (e, n) {
            return (t = e), this.add(n);
          },
          _getValue: function (e, n) {
            let o;
            return (
              "function" == typeof n
                ? ((o = n(t)),
                  o ||
                    console.warn(
                      "The function for key " + e + " returned a falsy value: ",
                      o,
                    ))
                : "string" == typeof n
                  ? ((o = t.get(n)),
                    o ||
                      console.warn(
                        "The provider `get` invocation for the key " +
                          e +
                          " returned a falsy value: ",
                        o,
                      ))
                  : "object" == typeof n && (o = n),
              o
            );
          },
          add: function (e) {
            e = e || {};
            const t = [],
              n = this;
            return (
              Object.keys(e).forEach(function (o) {
                const i = e[o],
                  s = n._getValue(o, i);
                s && s.then
                  ? (s.then(function (e) {
                      e ||
                        console.warn(
                          "The promise for the key " +
                            o +
                            " resolved with a falsy value: ",
                          e,
                        ),
                        n._addValue(o, e);
                    }),
                    t.push(s))
                  : n._addValue(o, s);
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
              n()
            );
          },
          getProvider: function () {
            return n();
          },
        };
        e.exports = o;
      },
      (e, t, n) => {
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        var o,
          i = (o = n(3)) && o.__esModule ? o : { default: o };
        function s(e) {
          const t = document.createElement("link");
          return (
            t.setAttribute("type", "text/css"),
            t.setAttribute("rel", "stylesheet"),
            t.setAttribute("id", e),
            t
          );
        }
        t.default = class {
          constructor() {
            (this.fontLinkElementMain = s("typekit-fonts")),
              (this.fontLinkElement = s("typekit-fonts")),
              (this.styleLinkElement = s("typekit-styles")),
              (this.fontLoadTimeout = null),
              (this.headerElements = [
                this.fontLinkElement,
                this.styleLinkElement,
              ]),
              (this.fontFaces = []),
              (this.publicApi = new i.default(
                this.headerElements,
                this.fontFaces,
              )),
              (this.onStyleLoad = this.onStyleLoad.bind(this)),
              (this.current = { region: null, locale: null, lang: null });
          }
          loadStyles(e, t) {
            const n = `/fe/lol-typekit/fonts/fonts.css?locale=${e}-${t}`;
            this.fontLinkElementMain.setAttribute("href", n),
              (this.fontLinkElementMain.onload = this.onStyleLoad),
              (this.fontLoadTimeout = setTimeout(this.onStyleLoad, 300)),
              this.fontLinkElement.setAttribute("href", n);
            const o = `/fe/lol-typekit/fonts/styles.css?locale=${e}-${t}`;
            this.styleLinkElement.setAttribute("href", o),
              this.publicApi.notifyListeners();
          }
          onStyleLoad() {
            clearTimeout(this.fontLoadTimeout),
              (this.fontLinkElementMain.onload = null),
              (this.fontFaces.length = 0),
              this.fontFaces.push.apply(
                this.fontFaces,
                Array.from(document.fonts.values()),
              ),
              Promise.all(this.fontFaces.map((e) => e.load())).then(() => {
                this.publicApi.updateDocuments();
              });
          }
          setLocaleModifiers(e, t, n) {
            const o = {
              region: (e = e.toLowerCase()),
              locale: (t = t.split("_")[0] + "-" + t.split("_")[1]),
              lang: n,
            };
            document.documentElement.setAttribute("lang", t),
              Object.keys(o).forEach((e) => {
                const t = this.current[e],
                  n = o[e];
                document.body.setAttribute(`data-${e}`, n),
                  t !== n &&
                    (document.body.classList.remove(`typekit-${e}-${t}`),
                    document.body.classList.add(`typekit-${e}-${n}`),
                    (this.current[e] = n));
              });
          }
          isValidRegionAndLocale({ region: e, locale: t }) {
            return e && t && t.indexOf("_") > 0;
          }
        };
      },
      (e, t) => {
        function n(e, t) {
          e(
            (function (e) {
              return e.map((e) => e.cloneNode(!0));
            })(t),
          );
        }
        function o(e, t, n) {
          e.fonts.clear(),
            t.forEach((t) => e.fonts.add(t)),
            n.forEach((t) => {
              if ("typekit-fonts" === t.id) return;
              const n = e.getElementById(t.id);
              n
                ? n.setAttribute("href", t.href)
                : e.head.appendChild(e.importNode(t, !0));
            });
        }
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        t.default = class {
          constructor(e, t) {
            (this._headerElements = e),
              (this._fontFaces = t),
              (this._listeners = []),
              (this._documents = new Set());
          }
          observeHeaderElements(e) {
            this._listeners.push(e), n(e, this._headerElements);
          }
          notifyListeners() {
            this._listeners.forEach((e) => {
              n(e, this._headerElements);
            });
          }
          registerDocument(e) {
            this._documents.add(e), o(e, this._fontFaces, this._headerElements);
          }
          unregisterDocument(e) {
            e && (this._documents.delete(e), e.fonts.clear());
          }
          updateDocuments() {
            this._documents.forEach((e) =>
              o(e, this._fontFaces, this._headerElements),
            );
          }
        };
      },
    ],
    t = {};
  function n(o) {
    var i = t[o];
    if (void 0 !== i) return i.exports;
    var s = (t[o] = { exports: {} });
    return e[o](s, s.exports, n), s.exports;
  }
  (() => {
    var e,
      t = (e = n(1)) && e.__esModule ? e : { default: e };
    const o = "rcp-fe-lol-typekit",
      i = document.currentScript.ownerDocument;
    const s = window.getPluginAnnounceEventName(o);
    i.addEventListener(
      s,
      function (e) {
        (0, e.registrationHandler)((e) =>
          t.default
            .init(e, {
              dataBinding: (e) =>
                e
                  .get("rcp-fe-common-libs")
                  .getDataBinding("rcp-fe-lol-typekit"),
              logger: (e) => e.get("rcp-fe-common-libs").logging.create(o),
              socket: (e) => e.getSocket(),
            })
            .then(() => {
              const e = new (0, n(2).default)(),
                o = t.default.dataBinding("/riotclient", t.default.socket);
              return (
                i.head.appendChild(e.fontLinkElement),
                i.head.appendChild(e.styleLinkElement),
                o.observe("/region-locale", function (n) {
                  if (e.isValidRegionAndLocale(n)) {
                    const { region: o } = n,
                      { locale: i } = n,
                      s = i.split("_")[0];
                    t.default.logger.trace("Region/Locale switching", {
                      region: o,
                      locale: i,
                      lang: s,
                    }),
                      e.loadStyles(o, i),
                      e.setLocaleModifiers(o, i, s);
                  } else
                    t.default.logger.error(
                      "Region/Locale not valid, ignoring this locale change",
                      n,
                    );
                }),
                e.publicApi
              );
            }),
        );
      },
      { once: !0 },
    );
  })();
})();
