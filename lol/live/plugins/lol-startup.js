(() => {
  "use strict";
  var n = [
      ,
      (n, e) => {
        Object.defineProperty(e, "__esModule", { value: !0 }),
          (e.showWindow = function () {
            window.riotInvoke({
              request: JSON.stringify({
                name: "Window.ResizeTo",
                params: [o, r],
              }),
            }),
              window.riotInvoke({
                request: JSON.stringify({
                  name: "Window.CenterToScreen",
                  params: [],
                }),
              }),
              window.riotInvoke({
                request: JSON.stringify({ name: "Window.Show", params: [] }),
              });
          });
        const o = 1280,
          r = 720;
      },
    ],
    e = {};
  function o(r) {
    var t = e[r];
    if (void 0 !== t) return t.exports;
    var i = (e[r] = { exports: {} });
    return n[r](i, i.exports, o), i.exports;
  }
  (() => {
    var n = o(1);
    const e = document.currentScript.ownerDocument;
    const r = window.getPluginAnnounceEventName("rcp-fe-lol-startup");
    e.addEventListener(
      r,
      function (n) {
        (0, n.registrationHandler)(function () {
          return {};
        });
      },
      { once: !0 },
    ),
      (0, n.showWindow)();
  })();
})();
