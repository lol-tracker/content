(() => {
    "use strict";
    const e = document.currentScript.ownerDocument,
        n = window.getPluginAnnounceEventName("rcp-fe-lol-static-assets");
    e.addEventListener(n, (e => {
        e.registrationHandler((() => {}))
    }), {
        once: !0
    })
})();