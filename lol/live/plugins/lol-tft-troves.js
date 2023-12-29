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
                const r = e[o],
                  i = n._getValue(o, r);
                i && i.then
                  ? (i.then(function (e) {
                      e ||
                        console.warn(
                          "The promise for the key " +
                            o +
                            " resolved with a falsy value: ",
                          e,
                        ),
                        n._addValue(o, e);
                    }),
                    t.push(i))
                  : n._addValue(o, i);
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
    ],
    t = {};
  function n(o) {
    var r = t[o];
    if (void 0 !== r) return r.exports;
    var i = (t[o] = { exports: {} });
    return e[o](i, i.exports, n), i.exports;
  }
  (() => {
    var e;
    (e = n(1)) && e.__esModule;
    const t = document.currentScript.ownerDocument;
    const o = window.getPluginAnnounceEventName("rcp-fe-lol-tft-troves");
    t.addEventListener(
      o,
      function (e) {
        (0, e.registrationHandler)(function (e) {});
      },
      { once: !0 },
    );
  })();
})();
