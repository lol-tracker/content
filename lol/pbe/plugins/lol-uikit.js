(() => {
    var t = [, t => {
            "use strict";
            let e;

            function n() {
                return e || (console.error("The `provider` object has not been set, please do so by calling the `init` method."), null)
            }
            const i = {
                init: function(t, n) {
                    return e = t, this.add(n)
                },
                _getValue: function(t, n) {
                    let i;
                    return "function" == typeof n ? (i = n(e), i || console.warn("The function for key " + t + " returned a falsy value: ", i)) : "string" == typeof n ? (i = e.get(n), i || console.warn("The provider `get` invocation for the key " + t + " returned a falsy value: ", i)) : "object" == typeof n && (i = n), i
                },
                add: function(t) {
                    t = t || {};
                    const e = [],
                        n = this;
                    return Object.keys(t).forEach((function(i) {
                        const o = t[i],
                            r = n._getValue(i, o);
                        r && r.then ? (r.then((function(t) {
                            t || console.warn("The promise for the key " + i + " resolved with a falsy value: ", t), n._addValue(i, t)
                        })), e.push(r)) : n._addValue(i, r)
                    })), Promise.all(e)
                },
                _addValue: function(t, e) {
                    this[t] = e
                },
                provider: function() {
                    return console.error("The function `provider` has been deprecated, please use `getProvider`", (new Error).stack), n()
                },
                getProvider: function() {
                    return n()
                }
            };
            t.exports = i
        }, (t, e) => {
            "use strict";
            Object.defineProperty(e, "__esModule", {
                value: !0
            }), e.default = void 0;
            var n = new class {
                constructor() {
                    this.subDoc = document
                }
                set(t) {
                    this.subDoc = t
                }
                get() {
                    return window.testsSandboxDoc || this.subDoc
                }
            };
            e.default = n
        }, (t, e, n) => {
            "use strict";
            n.r(e)
        }, (t, e, n) => {
            "use strict";
            Object.defineProperty(e, "__esModule", {
                value: !0
            }), e.default = void 0;
            var i = n(1);
            const {
                registerCustomElementV1: o
            } = i.webComponents, r = ["shadow-element.js", "subdoc-proxy.js", "video-handler.js", "polygon-generator.js"], s = n(5), a = n(224);
            let l = !1;
            var d = {
                registerCustomElements: function(t = document) {
                    if (t.isElementsRegistered) return;
                    s.keys().forEach((t => {
                        if (r.find((e => t.includes(e)))) return;
                        const e = s(t).default;
                        "function" == typeof e.prototype.createdCallback ? function(t) {
                            if (t.tagName) try {
                                customElements.define(t.tagName, {
                                    prototype: Object.create(t.prototype)
                                })
                            } catch (t) {
                                if ("development" === "production".NODE_ENV) throw t
                            }
                        }(e) : "function" == typeof e.prototype.connectedCallback && o(e)
                    })), t.isElementsRegistered = !0
                },
                registerComponents: function() {
                    l || (a.keys().forEach((t => {
                        var e;
                        e = a(t).default, i.componentFactory.setFactory(e.registerAs, e.create)
                    })), l = !0)
                }
            };
            e.default = d
        }, (t, e, n) => {
            var i = {
                "./animated-arrow-overlay/index.js": 6,
                "./animated-border-overlay/index.js": 11,
                "./arrow-button/index.js": 14,
                "./backdrop-magic/index.js": 25,
                "./behavior-media/index.js": 28,
                "./champion-mastery-banner/index.js": 38,
                "./champion-mastery-tooltip/index.js": 41,
                "./champion-thumbnail/index.js": 44,
                "./close-button/index.js": 47,
                "./comet-border/index.js": 50,
                "./condition-all/index.js": 53,
                "./condition-any/index.js": 55,
                "./condition-delay/index.js": 57,
                "./condition-media/index.js": 59,
                "./condition-parameter/index.js": 61,
                "./content-block/index.js": 63,
                "./context-menu/index.js": 65,
                "./dialog-frame/index.js": 69,
                "./dropdown-optgroup/index.js": 73,
                "./dropdown-option/index.js": 76,
                "./flat-button-group/index.js": 82,
                "./flat-button-secondary/index.js": 85,
                "./flat-button/index.js": 15,
                "./flat-checkbox/index.js": 88,
                "./flat-dropdown/index.js": 91,
                "./flat-input/index.js": 100,
                "./flat-textarea/index.js": 102,
                "./flyout-frame/index.js": 105,
                "./framed-dropdown/index.js": 110,
                "./full-page-backdrop/index.js": 113,
                "./game-data-markup/index.js": 116,
                "./info-icon/index.js": 118,
                "./lottie/index.js": 124,
                "./navigation-bar/index.js": 126,
                "./navigation-item/index.js": 129,
                "./parallax-background/Animation.js": 132,
                "./parallax-background/Layer.js": 133,
                "./parallax-background/Parallax.js": 134,
                "./parallax-background/index.js": 135,
                "./perfect-scrollable/index.js": 138,
                "./player-name/index.js": 164,
                "./primary-magic-button/index.js": 176,
                "./purchase-button/index.js": 179,
                "./radial-progress/index.js": 182,
                "./radial-progress/polygon-generator.js": 183,
                "./radio-input-option/index.js": 186,
                "./radio-input/index.js": 190,
                "./resizing-text-field/canvas-singleton.js": 193,
                "./resizing-text-field/index.js": 194,
                "./scrollable/index.js": 196,
                "./section-controller/index.js": 199,
                "./slider/index.js": 201,
                "./state-machine/index.js": 29,
                "./subdoc-proxy.js": 2,
                "./switch/index.js": 30,
                "./themed-level-ring-v2/index.js": 204,
                "./themed-level-ring/index.js": 207,
                "./tooltip/index.js": 210,
                "./tooltipped-keyword/index.js": 213,
                "./transition/index.js": 215,
                "./uikit-video/index.js": 34,
                "./video-state-machine/index.js": 217,
                "./video/index.js": 220,
                "./video/state-observer.js": 222,
                "./video/video-handler.js": 221
            };

            function o(t) {
                var e = r(t);
                return n(e)
            }

            function r(t) {
                if (!n.o(i, t)) {
                    var e = new Error("Cannot find module '" + t + "'");
                    throw e.code = "MODULE_NOT_FOUND", e
                }
                return i[t]
            }
            o.keys = function() {
                return Object.keys(i)
            }, o.resolve = r, t.exports = o, o.id = 5
        }, (t, e, n) => {
            "use strict";
            Object.defineProperty(e, "__esModule", {
                value: !0
            }), e.default = void 0;
            var i = n(1);
            const o = "single-carot",
                r = "state",
                s = "click",
                a = "hover",
                l = "init";
            class d extends i.webComponents.ShadowElement {
                static get observedAttributes() {
                    return []
                }
                templateMarkup() {
                    return n(7)
                }
                stylesheetMarkup() {
                    return n(8)
                }
                constructor() {
                    super(), this._stateTimeout
                }
                connectedCallback() {
                    super.connectedCallback(), this.redrawPath(), this._processStateChange()
                }
                attributeChangedCallback(t) {
                    t === r ? this._processStateChange() : t === o && this.redrawPath()
                }
                width() {
                    return this.offsetWidth
                }
                redrawPath() {
                    this.shadowRoot.querySelector("#scalable-path").setAttribute("d", this._getPathString())
                }
                _getPathString() {
                    const t = this.width() - 31,
                        e = this.getAttribute(o);
                    let n = `M0, 0 h${t} l15 16 l-15 16 H0 a21.461 21.461,0,0,0,8.4 -16,21.461 21.461,0,0,0,-8.4 -16 Z`;
                    return this.hasAttribute(o) && "false" !== e && (n = `M0, 0 h${t} l15 16 l-15 16 H0 0,0 Z`), n
                }
                _processStateChange() {
                    if (!this.hasAttribute("prevent-animation")) switch (clearTimeout(this._stateTimeout), this.getAttribute(r)) {
                        case l:
                            this._toggleAnimationClass(l), this._stateTimeout = setTimeout((() => {
                                this._setToStatic()
                            }), "750");
                            break;
                        case s:
                            this._toggleAnimationClass(s), this._stateTimeout = setTimeout((() => {
                                this._setToStatic()
                            }), "1500");
                            break;
                        case a:
                            this._toggleAnimationClass(a);
                            break;
                        default:
                            this._setToStatic()
                    }
                }
                _toggleAnimationClass(t) {
                    const e = this.shadowRoot.querySelector("#animated-arrow-overlay-wrapper");
                    e.className = "", t && e.classList.add(t)
                }
                _setToStatic() {
                    clearTimeout(this._stateTimeout), this._toggleAnimationClass(), this._stateTimeout = setTimeout((() => {
                        this._toggleAnimationClass("static")
                    }), "500")
                }
            }
            d.tagName = "lol-uikit-animated-arrow-overlay";
            var c = d;
            e.default = c
        }, t => {
            "use strict";
            t.exports = '<template>\r\n  <div id="animated-arrow-overlay-wrapper">\r\n    <svg id="path-defs" class="svg-container"\r\n      xmlns="http://www.w3.org/2000/svg"\r\n      xmlns:xlink="http://www.w3.org/1999/xlink"\r\n      x="0" y="0" width="100%" height="100%">\r\n\r\n      <defs>\r\n        <pattern id="noise-map" x="0" y="0" width="400" height="40" patternUnits="userSpaceOnUse">\r\n          <image xlink:href="/fe/lol-uikit/images/noise-tile-alpha-tint-large.png" x="0" y="0" width="400" height="40"></image>\r\n          <animate dur="20s" repeatCount="indefinite" attributeName="y" values="0;20;0"/>\r\n          <animate dur="40s" repeatCount="indefinite" attributeName="x" values="0;50;0;-50;0"/>\r\n        </pattern>\r\n        <pattern id="noise-map-offset" x="25%" y="0" width="400" height="40" patternUnits="userSpaceOnUse">\r\n          <image xlink:href="/fe/lol-uikit/images/noise-tile-alpha-tint-large.png" x="0" y="0" width="400" height="40"></image>\r\n          <animate dur="20s" repeatCount="indefinite" attributeName="y" values="0;20;0"/>\r\n          <animate dur="40s" repeatCount="indefinite" attributeName="x" values="25;75;25;-25;25"/>\r\n        </pattern>\r\n        <path id="scalable-path"\r\n          d="M0, 0" fill="none" stroke="#fff" stroke-width="2"/>\r\n        <mask id="mask-dashed-border" maskUnits="userSpaceOnUse" x="0" y="0" width="100%" height="100%">\r\n          <use xlink:href="#scalable-path" stroke-width="4" class="dashed-border"/>\r\n        </mask>\r\n        <mask id="mask-dashed-border-offset" maskUnits="userSpaceOnUse" x="0" y="0" width="100%" height="100%">\r\n          <use xlink:href="#scalable-path" stroke-width="4" class="dashed-border offset"/>\r\n        </mask>\r\n      </defs>\r\n    </svg>\r\n\r\n    <div id="animated-magic-container">\r\n      <svg id="animated-magic-low" class="svg-container"\r\n        xmlns="http://www.w3.org/2000/svg"\r\n        xmlns:xlink="http://www.w3.org/1999/xlink"\r\n        x="0" y="0" width="100%" height="100%">\r\n        <rect x="0" y="0" width="100%" height="100%" mask="url(#mask-dashed-border)" fill="url(#noise-map)"/>\r\n        <rect x="0" y="0" width="100%" height="100%" mask="url(#mask-dashed-border-offset)" fill="url(#noise-map-offset)"/>\r\n      </svg>\r\n      <svg id="animated-magic-high" class="svg-container"\r\n        xmlns="http://www.w3.org/2000/svg"\r\n        xmlns:xlink="http://www.w3.org/1999/xlink"\r\n        x="0" y="0" width="100%" height="100%">\r\n        <rect x="0" y="0" width="100%" height="100%" mask="url(#mask-dashed-border)" fill="url(#noise-map)"/>\r\n        <rect x="0" y="0" width="100%" height="100%" mask="url(#mask-dashed-border-offset)" fill="url(#noise-map-offset)"/>\r\n      </svg>\r\n    </div>\r\n  </div>\r\n</template>\r\n'
        }, (t, e, n) => {
            var i = n(9),
                o = n(10)(i);
            o.push([t.id, ":host {\n  width: calc(100% + 16px);\n  height: calc(100% + 16px);\n  left: -8px;\n  top: -8px;\n  position: absolute;\n  cursor: default;\n  pointer-events: none;\n}\n:host[prevent-animation] #animated-arrow-overlay-wrapper {\n  display: none;\n}\n#animated-arrow-overlay-wrapper {\n  width: 100%;\n  height: 100%;\n  position: relative;\n}\n#animated-arrow-overlay-wrapper.static {\n  display: none;\n}\n#animated-arrow-overlay-wrapper.hover #path-defs .dashed-border,\n#animated-arrow-overlay-wrapper.hover #path-defs .dashed-border.offset {\n  animation-duration: 1500ms;\n}\n#animated-arrow-overlay-wrapper.hover #animated-magic-container {\n  opacity: 1;\n}\n#animated-arrow-overlay-wrapper.init #path-defs .dashed-border,\n#animated-arrow-overlay-wrapper.click #path-defs .dashed-border,\n#animated-arrow-overlay-wrapper.init #path-defs .dashed-border.offset,\n#animated-arrow-overlay-wrapper.click #path-defs .dashed-border.offset {\n  animation-duration: 750ms;\n}\n#animated-arrow-overlay-wrapper.init #animated-magic-container,\n#animated-arrow-overlay-wrapper.click #animated-magic-container {\n  opacity: 1;\n}\n#path-defs .dashed-border,\n#path-defs .dashed-border.offset {\n  stroke: #fff;\n  animation-timing-function: linear;\n  animation-iteration-count: infinite;\n  animation-duration: 0ms;\n}\n#path-defs .dashed-border {\n  stroke-dasharray: 50;\n  animation-name: dash-stroke;\n}\n#path-defs .dashed-border.offset {\n  stroke-dashoffset: -50;\n  animation-name: dash-stroke-offset;\n}\n#scalable-path {\n  transform: translate(8px, 8px);\n}\n#animated-magic-container {\n  width: 100%;\n  height: 100%;\n  position: absolute;\n  opacity: 0;\n  transition: opacity 300ms linear;\n}\n#animated-magic-low {\n  filter: blur(2px) contrast(1.15);\n  -webkit-filter: blur(2px) contrast(1.15);\n  opacity: 0.75;\n}\n#animated-magic-high {\n  filter: blur(4px) contrast(1.35) brightness(1.5);\n  -webkit-filter: blur(4px) contrast(1.35) brightness(1.5);\n  opacity: 0.85;\n}\n.svg-container {\n  position: absolute;\n  left: 0;\n  top: 0;\n}\n@-moz-keyframes dash-stroke {\n  to {\n    stroke-dashoffset: -100;\n  }\n}\n@-webkit-keyframes dash-stroke {\n  to {\n    stroke-dashoffset: -100;\n  }\n}\n@-o-keyframes dash-stroke {\n  to {\n    stroke-dashoffset: -100;\n  }\n}\n@keyframes dash-stroke {\n  to {\n    stroke-dashoffset: -100;\n  }\n}\n@-moz-keyframes dash-stroke-offset {\n  to {\n    stroke-dashoffset: -150;\n  }\n}\n@-webkit-keyframes dash-stroke-offset {\n  to {\n    stroke-dashoffset: -150;\n  }\n}\n@-o-keyframes dash-stroke-offset {\n  to {\n    stroke-dashoffset: -150;\n  }\n}\n@keyframes dash-stroke-offset {\n  to {\n    stroke-dashoffset: -150;\n  }\n}\n", ""]), t.exports = o
        }, t => {
            "use strict";
            t.exports = function(t) {
                return t[1]
            }
        }, t => {
            "use strict";
            t.exports = function(t) {
                var e = [];
                return e.toString = function() {
                    return this.map((function(e) {
                        var n = "",
                            i = void 0 !== e[5];
                        return e[4] && (n += "@supports (".concat(e[4], ") {")), e[2] && (n += "@media ".concat(e[2], " {")), i && (n += "@layer".concat(e[5].length > 0 ? " ".concat(e[5]) : "", " {")), n += t(e), i && (n += "}"), e[2] && (n += "}"), e[4] && (n += "}"), n
                    })).join("")
                }, e.i = function(t, n, i, o, r) {
                    "string" == typeof t && (t = [
                        [null, t, void 0]
                    ]);
                    var s = {};
                    if (i)
                        for (var a = 0; a < this.length; a++) {
                            var l = this[a][0];
                            null != l && (s[l] = !0)
                        }
                    for (var d = 0; d < t.length; d++) {
                        var c = [].concat(t[d]);
                        i && s[c[0]] || (void 0 !== r && (void 0 === c[5] || (c[1] = "@layer".concat(c[5].length > 0 ? " ".concat(c[5]) : "", " {").concat(c[1], "}")), c[5] = r), n && (c[2] ? (c[1] = "@media ".concat(c[2], " {").concat(c[1], "}"), c[2] = n) : c[2] = n), o && (c[4] ? (c[1] = "@supports (".concat(c[4], ") {").concat(c[1], "}"), c[4] = o) : c[4] = "".concat(o)), e.push(c))
                    }
                }, e
            }
        }, (t, e, n) => {
            "use strict";
            Object.defineProperty(e, "__esModule", {
                value: !0
            }), e.default = void 0;
            var i = n(1);
            class o extends i.webComponents.ShadowElement {
                templateMarkup() {
                    return n(12)
                }
                stylesheetMarkup() {
                    return n(13)
                }
                static get observedAttributes() {
                    return ["speed"]
                }
                processAttributes() {
                    const t = this.shadowRoot,
                        e = this.getAttribute("speed") || 3e4,
                        n = t.querySelectorAll(".glow-content.scroll"),
                        i = t.querySelectorAll(".glow-content.overlay");
                    [].forEach.call(n, (function(t) {
                        t.style.animationDuration = e + "ms"
                    })), [].forEach.call(i, (function(t) {
                        t.style.animationDuration = e / 5 + "ms, " + e + "ms"
                    }))
                }
            }
            o.tagName = "lol-uikit-animated-border-overlay";
            var r = o;
            e.default = r
        }, t => {
            "use strict";
            t.exports = '<template>\r\n\r\n  <div class="animated-border-wrapper">\r\n    <div class="border-container">\r\n      <div class="blur-effect high">\r\n        <div class="glow-mask top">\r\n          <div class="glow-content scroll top"></div>\r\n          <div class="glow-content overlay top"></div>\r\n        </div>\r\n        <div class="glow-mask right">\r\n          <div class="glow-content scroll right"></div>\r\n          <div class="glow-content overlay right"></div>\r\n        </div>\r\n        <div class="glow-mask bottom">\r\n          <div class="glow-content scroll bottom"></div>\r\n          <div class="glow-content overlay bottom"></div>\r\n        </div>\r\n        <div class="glow-mask left">\r\n          <div class="glow-content scroll left"></div>\r\n          <div class="glow-content overlay left"></div>\r\n        </div>\r\n      </div>\r\n\r\n      <div class="blur-effect low">\r\n        <div class="glow-mask top">\r\n          <div class="glow-content scroll top"></div>\r\n          <div class="glow-content overlay top"></div>\r\n        </div>\r\n        <div class="glow-mask right">\r\n          <div class="glow-content scroll right"></div>\r\n          <div class="glow-content overlay right"></div>\r\n        </div>\r\n        <div class="glow-mask bottom">\r\n          <div class="glow-content scroll bottom"></div>\r\n          <div class="glow-content overlay bottom"></div>\r\n        </div>\r\n        <div class="glow-mask left">\r\n          <div class="glow-content scroll left"></div>\r\n          <div class="glow-content overlay left"></div>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</template>\r\n'
        }, (t, e, n) => {
            var i = n(9),
                o = n(10)(i);
            o.push([t.id, ':host .animated-border-wrapper {\n  display: block;\n  overflow: hidden;\n  position: relative;\n  box-sizing: border-box;\n  width: calc(100% + 12px);\n  height: calc(100% + 12px);\n  padding: 6px;\n  top: -6px;\n  left: -6px;\n}\n:host .animated-border-wrapper:lang(ar-ae) {\n  left: auto;\n  right: -6px;\n}\n:host .border-container {\n  position: relative;\n  width: 100%;\n  height: 100%;\n}\n:host .blur-effect {\n  display: block;\n  position: absolute;\n  width: 100%;\n  height: 100%;\n  top: 0;\n  left: 0;\n}\n:host .blur-effect.low {\n  -webkit-filter: blur(2px) contrast(1.15);\n  opacity: 0.75;\n}\n:host .blur-effect.high {\n  -webkit-filter: blur(4px) contrast(1.35);\n  opacity: 0.5;\n}\n:host .glow-mask {\n  display: block;\n  position: absolute;\n  width: 100%;\n  height: 100%;\n}\n:host .glow-mask.top {\n  top: -2px;\n  left: -2px;\n  -webkit-mask-image: linear-gradient(to bottom, #000, #000 4px, transparent 4px, transparent);\n}\n:host .glow-mask.right {\n  top: -2px;\n  right: -2px;\n  -webkit-mask-image: linear-gradient(to left, #000, #000 4px, transparent 4px, transparent);\n}\n:host .glow-mask.bottom {\n  bottom: -2px;\n  right: -2px;\n  -webkit-mask-image: linear-gradient(to top, #000, #000 4px, transparent 4px, transparent);\n}\n:host .glow-mask.left {\n  bottom: -2px;\n  left: -2px;\n  -webkit-mask-image: linear-gradient(to right, #000, #000 4px, transparent 4px, transparent);\n}\n:host .glow-content {\n  display: block;\n  position: absolute;\n  width: 100%;\n  height: 100%;\n  top: 0;\n  left: 0;\n  background-size: 200%;\n}\n:host .glow-content.scroll {\n  background-image: url("/fe/lol-uikit/images/noise-tile-alpha-tint-large.png");\n}\n:host .glow-content.overlay {\n  background-image: url("/fe/lol-uikit/images/noise-tile-alpha-tint-small.png");\n}\n:host .glow-content.top {\n  width: 200%;\n  transform: translateY(-50%) translateX(-25%);\n}\n:host .glow-content.bottom {\n  width: 200%;\n  transform: translateY(50%) translateX(-25%) rotate(180deg) scaleY(-1);\n}\n:host .glow-content.left {\n  transform: translateX(-50%) rotate(270deg) scaleY(-1);\n}\n:host .glow-content.right {\n  transform: translateX(50%) rotate(90deg) scaleY(-1);\n}\n:host(.intro) .glow-content.scroll,\n:host(.hover) .glow-content.scroll,\n:host(.down) .glow-content.scroll,\n:host(.click) .glow-content.scroll {\n  animation: borderNoiseScroll 30000ms linear infinite;\n}\n:host(.intro) .glow-content.overlay,\n:host(.hover) .glow-content.overlay,\n:host(.down) .glow-content.overlay,\n:host(.click) .glow-content.overlay {\n  animation: borderNoiseScroll 30000ms linear infinite;\n}\n@-moz-keyframes borderNoiseScroll {\n  0% {\n    background-position: 0 center;\n  }\n  100% {\n    background-position: -400% center;\n  }\n}\n@-webkit-keyframes borderNoiseScroll {\n  0% {\n    background-position: 0 center;\n  }\n  100% {\n    background-position: -400% center;\n  }\n}\n@-o-keyframes borderNoiseScroll {\n  0% {\n    background-position: 0 center;\n  }\n  100% {\n    background-position: -400% center;\n  }\n}\n@keyframes borderNoiseScroll {\n  0% {\n    background-position: 0 center;\n  }\n  100% {\n    background-position: -400% center;\n  }\n}\n', ""]), t.exports = o
        }, (t, e, n) => {
            "use strict";
            Object.defineProperty(e, "__esModule", {
                value: !0
            }), e.default = void 0;
            var i = s(n(15)),
                o = n(17),
                r = s(n(20));

            function s(t) {
                return t && t.__esModule ? t : {
                    default: t
                }
            }
            class a extends i.default {
                templateMarkup() {
                    return n(23)
                }
                stylesheetMarkup() {
                    return n(24)
                }
                setCustomSounds() {
                    const t = this.getAttribute("hover-sfx-src"),
                        e = this.getAttribute("click-sfx-src"),
                        n = t || r.default.arrowButtonHover,
                        i = e || r.default.arrowButtonClick;
                    this._hoverSound = this._createSound(n), this._clickSound = this._createSound(i)
                }
                _createSound(t) {
                    return (0, o.createSound)("sfx-ui", t, {
                        allowConcurrency: !1
                    })
                }
                disableOnClick() {}
                static get observedAttributes() {
                    return ["disabled", "direction", "click-sfx-src", "hover-sfx-src"]
                }
                processAttributes() {
                    this.$button() && (this.$button().removeClass("left right").addClass(this.getDirection()).toggleClass("disabled", this.disabled), super.processAttributes())
                }
                $button() {
                    return this.$root().find(".lol-uikit-arrow-button")
                }
                $buttonWrapper() {
                    return this.$root().find(".lol-uikit-arrow-button-container")
                }
                $buttonInner() {
                    return this.$root().find(".lol-uikit-arrow-button")
                }
                getDirection() {
                    return this.getAttribute("direction") || "right"
                }
                isDisabled() {
                    return null !== this.getAttribute("disabled")
                }
            }
            a.tagName = "lol-uikit-arrow-button";
            var l = a;
            e.default = l
        }, (t, e, n) => {
            "use strict";
            Object.defineProperty(e, "__esModule", {
                value: !0
            }), e.default = void 0;
            var i = n(16),
                o = n(17),
                r = n(18),
                s = n(1),
                a = d(n(19)),
                l = d(n(20));

            function d(t) {
                return t && t.__esModule ? t : {
                    default: t
                }
            }
            const c = [{
                    transform: "translateZ(0) rotateX(-90deg) scale(.94)",
                    opacity: 0,
                    offset: 0
                }, {
                    transform: "translateZ(0) rotateX(-90deg) scale(.94)",
                    opacity: 1,
                    offset: .001
                }, {
                    transform: "translateZ(0) rotateX(0deg) scale(.94)",
                    opacity: 1,
                    offset: 1
                }],
                u = {
                    duration: 333,
                    easing: "cubic-bezier(0.5, 0, 0.5, 1)",
                    iterations: 1
                },
                p = [{
                    transform: "scale(.94)"
                }, {
                    transform: "scale(1)"
                }],
                h = {
                    duration: 133,
                    easing: "cubic-bezier(1,0,1,1)",
                    iterations: 1
                },
                m = [{
                    color: "#5b5a56"
                }, {
                    color: "#f0e6d2"
                }],
                g = {
                    duration: 500,
                    easing: "linear",
                    iterations: 1
                },
                f = [{
                    textShadow: "0 0 4px 4px rgba(255, 255, 255, 1)",
                    offset: 0
                }, {
                    textShadow: "0 0 4px 4px rgba(255, 255, 255, .5)",
                    offset: .78
                }, {
                    textShadow: "0 0 4px 4px rgba(255, 255, 255, 0)",
                    offset: 1
                }],
                b = {
                    duration: 633,
                    easing: "linear",
                    iterations: 1
                },
                A = [{
                    boxShadow: "0px 0px 5px 4px rgba(240, 230, 216, 0), 0px 0px 2px 1px rgba(240, 230, 216, 0) inset",
                    offset: 0
                }, {
                    boxShadow: "0px 0px 5px 4px rgba(240, 230, 216, 1), 0px 0px 2px 1px rgba(240, 230, 216, 1) inset",
                    offset: .5
                }, {
                    boxShadow: "0px 0px 5px 4px rgba(240, 230, 216, 0), 0px 0px 2px 1px rgba(240, 230, 216, 0) inset",
                    offset: 1
                }],
                v = {
                    duration: 633,
                    easing: "linear",
                    iterations: 1
                },
                y = [{
                    backgroundImage: "linear-gradient(to bottom, rgba(74,67,55,1) 0%, rgba(74,67,55,1) 27%, rgba(166,133,66,1) 100%)",
                    opacity: 0,
                    offset: 0
                }, {
                    backgroundImage: "linear-gradient(to bottom, rgba(74,67,55,1) 0%, rgba(74,67,55,1) 27%, rgba(166,133,66,1) 100%)",
                    opacity: 0,
                    offset: .07
                }, {
                    backgroundImage: "linear-gradient(to bottom, rgba(74,67,55,1) 0%, rgba(74,67,55,1) 27%, rgba(166,133,66,1) 100%)",
                    opacity: 1,
                    offset: .38
                }, {
                    backgroundImage: "linear-gradient(to bottom, rgba(74,67,55,1) 0%, rgba(74,67,55,1) 27%, rgba(166,133,66,1) 100%)",
                    opacity: 0,
                    offset: .5
                }, {
                    backgroundImage: "linear-gradient(to bottom, rgba(74,67,55,1) 0%, rgba(74,67,55,1) 27%, rgba(166,133,66,1) 100%)",
                    opacity: 0,
                    offset: 1
                }],
                w = {
                    duration: 1333,
                    easing: "linear",
                    iterations: 1
                },
                k = [{
                    opacity: 1,
                    borderImageSlice: 1,
                    offset: 0
                }, {
                    opacity: 0,
                    borderImageSlice: 1,
                    offset: .53
                }, {
                    opacity: 0,
                    borderImageSlice: 1,
                    offset: 1
                }],
                x = {
                    duration: 933,
                    easing: "linear",
                    iterations: 1
                };
            class C extends s.webComponents.ShadowElement {
                templateMarkup() {
                    return n(21)
                }
                stylesheetMarkup() {
                    return n(22)
                }
                constructor() {
                    super(), this._hasPlayedIntro = !1, this.mouseover = this.sendMouseEvent.bind(this, "hover", "hover"), this.mouseout = this.sendMouseEvent.bind(this, "out", "idle"), this.mousedown = (0, i.leftClickHandler)(this.sendMouseEvent.bind(this, "down", "down")), this.click = (0, i.leftClickHandler)(this.sendMouseEvent.bind(this, "click", "click")), this.onFocus = () => {
                        this.setInteractionClass("hover")
                    }, this.onBlur = () => {
                        this.setInteractionClass("idle")
                    }
                }
                initIntroAnimation() {
                    const t = (0, r.isAttrTruthy)("intro-enabled", this.getAttribute("intro-enabled"));
                    !this.disabled && t && this.playIntro()
                }
                playIntro() {
                    this._hasPlayedIntro || (this.setInteractionClass("intro"), this.introAnimation().then((() => {
                        this.setInteractionClass("idle")
                    })), this._hasPlayedIntro = !0)
                }
                initAnimation(t, e, n) {
                    return function() {
                        return new Promise((function(i) {
                            t.animate(e, n).onfinish = function() {
                                i()
                            }
                        }))
                    }
                }
                introAnimation() {
                    const t = this.shadowRoot;
                    return new Promise((e => {
                        const n = t.querySelector(".lol-uikit-flat-button");
                        if (!n) return;
                        const i = n.querySelector(".lol-uikit-flat-button-glow"),
                            o = n.querySelector(".lol-uikit-flat-button-bg"),
                            r = n.querySelector(".lol-uikit-flat-button-border-transition"),
                            s = this.initAnimation(n, c, u),
                            a = this.initAnimation(n, p, h),
                            l = this.initAnimation(n, m, g),
                            d = this.initAnimation(n, f, b),
                            C = this.initAnimation(i, A, v),
                            E = this.initAnimation(o, y, w),
                            _ = this.initAnimation(r, k, x);
                        s().then(a), l(), d(), _(), C(), E().then((function() {
                            e()
                        }))
                    }))
                }
                _createSound(t) {
                    return (0, o.createSound)("sfx-ui", t, {
                        allowConcurrency: !1
                    })
                }
                addEventListeners() {
                    const t = this.shadowRoot;
                    t.addEventListener("mouseover", this.mouseover), t.addEventListener("mouseout", this.mouseout), t.addEventListener("mousedown", this.mousedown), t.addEventListener("click", this.click), this.addEventListener("focus", this.onFocus), this.addEventListener("blur", this.onBlur)
                }
                removeEventListeners() {
                    const t = this.shadowRoot;
                    t.removeEventListener("mouseover", this.mouseover), t.removeEventListener("mouseout", this.mouseout), t.removeEventListener("mousedown", this.mousedown), t.removeEventListener("click", this.click), this.removeEventListener("focus", this.onFocus), this.removeEventListener("blur", this.onBlur)
                }
                sendMouseEvent(t, e) {
                    this.disabled || (this.setInteractionClass(e), "click" === t && (this.disableOnClick(), this._clickSound && this._clickSound.play()), "hover" === t && this._hoverSound && this._hoverSound.play())
                }
                disableOnClick() {
                    this.removeEventListeners(), this.setInteractionClass("click"), window.setTimeout(function() {
                        this.addEventListeners(), this.disabled ? this.setInteractionClass() : this.setInteractionClass("idle")
                    }.bind(this), 600)
                }
                setInteractionClass(t) {
                    const e = this.shadowRoot.querySelector(".lol-uikit-flat-button");
                    null !== e && (this === document.activeElement && "idle" === t && (t = "hover"), ["intro", "idle", "hover", "down", "click"].forEach((t => {
                        e.classList.remove(t)
                    })), t && e.classList.add(t))
                }
                connectedCallback() {
                    super.connectedCallback(), this.isAttached = !0, this.isType("next") || setTimeout((() => {
                        this.initIntroAnimation()
                    }), 100), this.processAttributes({
                        event: "connected"
                    }), this.addEventListeners()
                }
                disconnectedCallback() {
                    super.disconnectedCallback(), this.isAttached = !1, this.processAttributes({
                        event: "disconnected"
                    }), this.removeEventListeners()
                }
                attributeChangedCallback() {
                    super.attributeChangedCallback(), this.processAttributes({
                        event: "changed"
                    })
                }
                static get observedAttributes() {
                    return ["disabled", "type", "remove-min-height", "primary", "hover-sfx-src", "click-sfx-src", "intro-enabled", "secondary", "remove-padding"]
                }
                processAttributes(t) {
                    super.processAttributes(), t = t || {}, this.setCustomSounds();
                    const e = this.$button().find(".lol-uikit-flat-button-content-wrapper");
                    this.$button().toggleClass("primary", this.isPrimary()), this.$button().toggleClass("back", this.isType("back")), e.toggleClass("external", this.isType("external")), this.$button().toggleClass("no-min-height", this.hasRemoveMinHeight()), this.$button().toggleClass("secondary", this.isSecondary()), this.$button().toggleClass("no-padding", this.hasRemovePadding()), this.setDisabledDisplay()
                }
                setCustomSounds() {
                    const t = this.getAttribute("hover-sfx-src"),
                        e = this.getAttribute("click-sfx-src"),
                        n = t || l.default.flatButtonHover,
                        i = e || l.default.flatButtonClick;
                    this._hoverSound = this._createSound(n), this._clickSound = this._createSound(i)
                }
                setDisabledDisplay() {
                    this.$button().toggleClass("disabled", this.disabled), this.$buttonWrapper().toggleClass("disabled", this.disabled)
                }
                $root() {
                    return (0, a.default)(this.shadowRoot)
                }
                $button() {
                    return this.$root().find(".lol-uikit-flat-button")
                }
                $buttonWrapper() {
                    return this.$root().find(".lol-uikit-flat-button-wrapper")
                }
                $buttonInner() {
                    return this.$root().find(".lol-uikit-flat-button-inner")
                }
                isShowArrow(t) {
                    return this.isAttachedOrChanged(t) && this.isType("next") && !this.isSimple()
                }
                isType(t) {
                    const e = this.getAttribute("type");
                    return !!!(!e || !t) && e.toLowerCase() === t.toLowerCase()
                }
                isPrimary() {
                    return (0, r.isAttrTruthy)("primary", this.getAttribute("primary"))
                }
                isSecondary() {
                    return (0, r.isAttrTruthy)("secondary", this.getAttribute("secondary"))
                }
                hasRemoveMinHeight() {
                    return (0, r.isAttrTruthy)("remove-min-height", this.getAttribute("remove-min-height"))
                }
                isAttachedOrChanged(t) {
                    return "attached" === t || "changed" === t && this.isAttached
                }
                isSimple() {
                    return (0, r.isAttrTruthy)("simple", this.getAttribute("simple"))
                }
                width() {
                    return this.shadowRoot.firstElementChild.offsetWidth
                }
                hasRemovePadding() {
                    return (0, r.isAttrTruthy)("remove-padding", this.getAttribute("remove-padding"))
                }
            }
            Object.defineProperty(C.prototype, "disabled", {
                enumerable: !0,
                get: function() {
                    return null !== this.getAttribute("disabled")
                },
                set: function(t) {
                    switch (t) {
                        case "":
                        case 0:
                        case !1:
                        case null:
                        case void 0:
                            return void this.removeAttribute("disabled");
                        default:
                            if ("number" == typeof t && isNaN(t)) return void this.removeAttribute("disabled");
                            this.setAttribute("disabled", "")
                    }
                }
            }), C.tagName = "lol-uikit-flat-button";
            var E = C;
            e.default = E
        }, (t, e) => {
            "use strict";
            Object.defineProperty(e, "__esModule", {
                value: !0
            }), e.leftClickHandler = function(t, ...e) {
                return n => {
                    if (0 === n.button) {
                        const i = [n].concat(e);
                        t(...i)
                    }
                }
            }
        }, (t, e, n) => {
            "use strict";
            Object.defineProperty(e, "__esModule", {
                value: !0
            }), e.createSound = function(t, ...e) {
                return a(t).registerSound(...e)
            }, e.getChannel = a;
            var i = n(1);
            const o = (0, i.getProvider)().get("rcp-fe-audio"),
                r = new Map;
            class s {
                constructor(t) {
                    if (this.channel = o.getChannel(t), !this.channel) throw new RangeError(`Channel ${t} not found`);
                    this._readyQueue = [], this._queueBusy = !1, this._soundsByUrl = new Map
                }
                registerSound(t, ...e) {
                    const n = this._soundsByUrl.get(t) || this.channel.createSound(t, ...e);
                    return this._soundsByUrl.set(t, n), this.enqueueSoundForLoad(n), n
                }
                enqueueSoundForLoad(t) {
                    this._readyQueue.push(t), this._dequeue()
                }
                _dequeue() {
                    if (this._queueBusy) return;
                    const t = this._readyQueue.shift();
                    return t ? (this._queueBusy = !0, t.ready().then((() => this._shiftQueue())).catch((function(e) {
                        if (window.testsSandbox) throw new Error(`UIKit failed to load an audio file: ${e.message} ${t.options.url}`);
                        i.logger.error("UIKit failed to load an audio file.", {
                            error: e,
                            next: t.options.url
                        })
                    }))) : void 0
                }
                _shiftQueue() {
                    this._queueBusy = !1, this._dequeue()
                }
            }

            function a(t) {
                return r.has(t) || r.set(t, new s(t)), r.get(t)
            }
        }, (t, e) => {
            "use strict";
            Object.defineProperty(e, "__esModule", {
                value: !0
            }), e.isAttrTruthy = function(t, e) {
                return "" === e || e === t || "true" === e
            }
        }, function(t, e) {
            var n, i, o;
            i = "undefined" != typeof window ? window : this, o = function(i, o) {
                var r = [],
                    s = r.slice,
                    a = r.concat,
                    l = r.push,
                    d = r.indexOf,
                    c = {},
                    u = c.toString,
                    p = c.hasOwnProperty,
                    h = {},
                    m = i.document,
                    g = "2.1.4",
                    f = function(t, e) {
                        return new f.fn.init(t, e)
                    },
                    b = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,
                    A = /^-ms-/,
                    v = /-([\da-z])/gi,
                    y = function(t, e) {
                        return e.toUpperCase()
                    };

                function w(t) {
                    var e = "length" in t && t.length,
                        n = f.type(t);
                    return "function" !== n && !f.isWindow(t) && (!(1 !== t.nodeType || !e) || "array" === n || 0 === e || "number" == typeof e && e > 0 && e - 1 in t)
                }
                f.fn = f.prototype = {
                    jquery: g,
                    constructor: f,
                    selector: "",
                    length: 0,
                    toArray: function() {
                        return s.call(this)
                    },
                    get: function(t) {
                        return null != t ? t < 0 ? this[t + this.length] : this[t] : s.call(this)
                    },
                    pushStack: function(t) {
                        var e = f.merge(this.constructor(), t);
                        return e.prevObject = this, e.context = this.context, e
                    },
                    each: function(t, e) {
                        return f.each(this, t, e)
                    },
                    map: function(t) {
                        return this.pushStack(f.map(this, (function(e, n) {
                            return t.call(e, n, e)
                        })))
                    },
                    slice: function() {
                        return this.pushStack(s.apply(this, arguments))
                    },
                    first: function() {
                        return this.eq(0)
                    },
                    last: function() {
                        return this.eq(-1)
                    },
                    eq: function(t) {
                        var e = this.length,
                            n = +t + (t < 0 ? e : 0);
                        return this.pushStack(n >= 0 && n < e ? [this[n]] : [])
                    },
                    end: function() {
                        return this.prevObject || this.constructor(null)
                    },
                    push: l,
                    sort: r.sort,
                    splice: r.splice
                }, f.extend = f.fn.extend = function() {
                    var t, e, n, i, o, r, s = arguments[0] || {},
                        a = 1,
                        l = arguments.length,
                        d = !1;
                    for ("boolean" == typeof s && (d = s, s = arguments[a] || {}, a++), "object" == typeof s || f.isFunction(s) || (s = {}), a === l && (s = this, a--); a < l; a++)
                        if (null != (t = arguments[a]))
                            for (e in t) n = s[e], s !== (i = t[e]) && (d && i && (f.isPlainObject(i) || (o = f.isArray(i))) ? (o ? (o = !1, r = n && f.isArray(n) ? n : []) : r = n && f.isPlainObject(n) ? n : {}, s[e] = f.extend(d, r, i)) : void 0 !== i && (s[e] = i));
                    return s
                }, f.extend({
                    expando: "jQuery" + (g + Math.random()).replace(/\D/g, ""),
                    isReady: !0,
                    error: function(t) {
                        throw new Error(t)
                    },
                    noop: function() {},
                    isFunction: function(t) {
                        return "function" === f.type(t)
                    },
                    isArray: Array.isArray,
                    isWindow: function(t) {
                        return null != t && t === t.window
                    },
                    isNumeric: function(t) {
                        return !f.isArray(t) && t - parseFloat(t) + 1 >= 0
                    },
                    isPlainObject: function(t) {
                        return !("object" !== f.type(t) || t.nodeType || f.isWindow(t) || t.constructor && !p.call(t.constructor.prototype, "isPrototypeOf"))
                    },
                    isEmptyObject: function(t) {
                        var e;
                        for (e in t) return !1;
                        return !0
                    },
                    type: function(t) {
                        return null == t ? t + "" : "object" == typeof t || "function" == typeof t ? c[u.call(t)] || "object" : typeof t
                    },
                    globalEval: function(t) {
                        var e, n = eval;
                        (t = f.trim(t)) && (1 === t.indexOf("use strict") ? ((e = m.createElement("script")).text = t, m.head.appendChild(e).parentNode.removeChild(e)) : n(t))
                    },
                    camelCase: function(t) {
                        return t.replace(A, "ms-").replace(v, y)
                    },
                    nodeName: function(t, e) {
                        return t.nodeName && t.nodeName.toLowerCase() === e.toLowerCase()
                    },
                    each: function(t, e, n) {
                        var i = 0,
                            o = t.length,
                            r = w(t);
                        if (n) {
                            if (r)
                                for (; i < o && !1 !== e.apply(t[i], n); i++);
                            else
                                for (i in t)
                                    if (!1 === e.apply(t[i], n)) break
                        } else if (r)
                            for (; i < o && !1 !== e.call(t[i], i, t[i]); i++);
                        else
                            for (i in t)
                                if (!1 === e.call(t[i], i, t[i])) break;
                        return t
                    },
                    trim: function(t) {
                        return null == t ? "" : (t + "").replace(b, "")
                    },
                    makeArray: function(t, e) {
                        var n = e || [];
                        return null != t && (w(Object(t)) ? f.merge(n, "string" == typeof t ? [t] : t) : l.call(n, t)), n
                    },
                    inArray: function(t, e, n) {
                        return null == e ? -1 : d.call(e, t, n)
                    },
                    merge: function(t, e) {
                        for (var n = +e.length, i = 0, o = t.length; i < n; i++) t[o++] = e[i];
                        return t.length = o, t
                    },
                    grep: function(t, e, n) {
                        for (var i = [], o = 0, r = t.length, s = !n; o < r; o++) !e(t[o], o) !== s && i.push(t[o]);
                        return i
                    },
                    map: function(t, e, n) {
                        var i, o = 0,
                            r = t.length,
                            s = [];
                        if (w(t))
                            for (; o < r; o++) null != (i = e(t[o], o, n)) && s.push(i);
                        else
                            for (o in t) null != (i = e(t[o], o, n)) && s.push(i);
                        return a.apply([], s)
                    },
                    guid: 1,
                    proxy: function(t, e) {
                        var n, i, o;
                        if ("string" == typeof e && (n = t[e], e = t, t = n), f.isFunction(t)) return i = s.call(arguments, 2), o = function() {
                            return t.apply(e || this, i.concat(s.call(arguments)))
                        }, o.guid = t.guid = t.guid || f.guid++, o
                    },
                    now: Date.now,
                    support: h
                }), f.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), (function(t, e) {
                    c["[object " + e + "]"] = e.toLowerCase()
                }));
                var k = function(t) {
                    var e, n, i, o, r, s, a, l, d, c, u, p, h, m, g, f, b, A, v, y = "sizzle" + 1 * new Date,
                        w = t.document,
                        k = 0,
                        x = 0,
                        C = st(),
                        E = st(),
                        _ = st(),
                        S = function(t, e) {
                            return t === e && (u = !0), 0
                        },
                        M = 1 << 31,
                        T = {}.hasOwnProperty,
                        L = [],
                        B = L.pop,
                        N = L.push,
                        O = L.push,
                        D = L.slice,
                        P = function(t, e) {
                            for (var n = 0, i = t.length; n < i; n++)
                                if (t[n] === e) return n;
                            return -1
                        },
                        I = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
                        R = "[\\x20\\t\\r\\n\\f]",
                        j = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",
                        H = j.replace("w", "w#"),
                        z = "\\[" + R + "*(" + j + ")(?:" + R + "*([*^$|!~]?=)" + R + "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + H + "))|)" + R + "*\\]",
                        W = ":(" + j + ")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|" + z + ")*)|.*)\\)|)",
                        F = new RegExp(R + "+", "g"),
                        q = new RegExp("^" + R + "+|((?:^|[^\\\\])(?:\\\\.)*)" + R + "+$", "g"),
                        X = new RegExp("^" + R + "*," + R + "*"),
                        V = new RegExp("^" + R + "*([>+~]|" + R + ")" + R + "*"),
                        Y = new RegExp("=" + R + "*([^\\]'\"]*?)" + R + "*\\]", "g"),
                        U = new RegExp(W),
                        Q = new RegExp("^" + H + "$"),
                        G = {
                            ID: new RegExp("^#(" + j + ")"),
                            CLASS: new RegExp("^\\.(" + j + ")"),
                            TAG: new RegExp("^(" + j.replace("w", "w*") + ")"),
                            ATTR: new RegExp("^" + z),
                            PSEUDO: new RegExp("^" + W),
                            CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + R + "*(even|odd|(([+-]|)(\\d*)n|)" + R + "*(?:([+-]|)" + R + "*(\\d+)|))" + R + "*\\)|)", "i"),
                            bool: new RegExp("^(?:" + I + ")$", "i"),
                            needsContext: new RegExp("^" + R + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + R + "*((?:-\\d)?\\d*)" + R + "*\\)|)(?=[^-]|$)", "i")
                        },
                        Z = /^(?:input|select|textarea|button)$/i,
                        J = /^h\d$/i,
                        $ = /^[^{]+\{\s*\[native \w/,
                        K = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
                        tt = /[+~]/,
                        et = /'|\\/g,
                        nt = new RegExp("\\\\([\\da-f]{1,6}" + R + "?|(" + R + ")|.)", "ig"),
                        it = function(t, e, n) {
                            var i = "0x" + e - 65536;
                            return i != i || n ? e : i < 0 ? String.fromCharCode(i + 65536) : String.fromCharCode(i >> 10 | 55296, 1023 & i | 56320)
                        },
                        ot = function() {
                            p()
                        };
                    try {
                        O.apply(L = D.call(w.childNodes), w.childNodes), L[w.childNodes.length].nodeType
                    } catch (t) {
                        O = {
                            apply: L.length ? function(t, e) {
                                N.apply(t, D.call(e))
                            } : function(t, e) {
                                for (var n = t.length, i = 0; t[n++] = e[i++];);
                                t.length = n - 1
                            }
                        }
                    }

                    function rt(t, e, i, o) {
                        var r, a, d, c, u, m, b, A, k, x;
                        if ((e ? e.ownerDocument || e : w) !== h && p(e), i = i || [], c = (e = e || h).nodeType, "string" != typeof t || !t || 1 !== c && 9 !== c && 11 !== c) return i;
                        if (!o && g) {
                            if (11 !== c && (r = K.exec(t)))
                                if (d = r[1]) {
                                    if (9 === c) {
                                        if (!(a = e.getElementById(d)) || !a.parentNode) return i;
                                        if (a.id === d) return i.push(a), i
                                    } else if (e.ownerDocument && (a = e.ownerDocument.getElementById(d)) && v(e, a) && a.id === d) return i.push(a), i
                                } else {
                                    if (r[2]) return O.apply(i, e.getElementsByTagName(t)), i;
                                    if ((d = r[3]) && n.getElementsByClassName) return O.apply(i, e.getElementsByClassName(d)), i
                                } if (n.qsa && (!f || !f.test(t))) {
                                if (A = b = y, k = e, x = 1 !== c && t, 1 === c && "object" !== e.nodeName.toLowerCase()) {
                                    for (m = s(t), (b = e.getAttribute("id")) ? A = b.replace(et, "\\$&") : e.setAttribute("id", A), A = "[id='" + A + "'] ", u = m.length; u--;) m[u] = A + ft(m[u]);
                                    k = tt.test(t) && mt(e.parentNode) || e, x = m.join(",")
                                }
                                if (x) try {
                                    return O.apply(i, k.querySelectorAll(x)), i
                                } catch (t) {} finally {
                                    b || e.removeAttribute("id")
                                }
                            }
                        }
                        return l(t.replace(q, "$1"), e, i, o)
                    }

                    function st() {
                        var t = [];
                        return function e(n, o) {
                            return t.push(n + " ") > i.cacheLength && delete e[t.shift()], e[n + " "] = o
                        }
                    }

                    function at(t) {
                        return t[y] = !0, t
                    }

                    function lt(t) {
                        var e = h.createElement("div");
                        try {
                            return !!t(e)
                        } catch (t) {
                            return !1
                        } finally {
                            e.parentNode && e.parentNode.removeChild(e), e = null
                        }
                    }

                    function dt(t, e) {
                        for (var n = t.split("|"), o = t.length; o--;) i.attrHandle[n[o]] = e
                    }

                    function ct(t, e) {
                        var n = e && t,
                            i = n && 1 === t.nodeType && 1 === e.nodeType && (~e.sourceIndex || M) - (~t.sourceIndex || M);
                        if (i) return i;
                        if (n)
                            for (; n = n.nextSibling;)
                                if (n === e) return -1;
                        return t ? 1 : -1
                    }

                    function ut(t) {
                        return function(e) {
                            return "input" === e.nodeName.toLowerCase() && e.type === t
                        }
                    }

                    function pt(t) {
                        return function(e) {
                            var n = e.nodeName.toLowerCase();
                            return ("input" === n || "button" === n) && e.type === t
                        }
                    }

                    function ht(t) {
                        return at((function(e) {
                            return e = +e, at((function(n, i) {
                                for (var o, r = t([], n.length, e), s = r.length; s--;) n[o = r[s]] && (n[o] = !(i[o] = n[o]))
                            }))
                        }))
                    }

                    function mt(t) {
                        return t && void 0 !== t.getElementsByTagName && t
                    }
                    for (e in n = rt.support = {}, r = rt.isXML = function(t) {
                            var e = t && (t.ownerDocument || t).documentElement;
                            return !!e && "HTML" !== e.nodeName
                        }, p = rt.setDocument = function(t) {
                            var e, o, s = t ? t.ownerDocument || t : w;
                            return s !== h && 9 === s.nodeType && s.documentElement ? (h = s, m = s.documentElement, (o = s.defaultView) && o !== o.top && (o.addEventListener ? o.addEventListener("unload", ot, !1) : o.attachEvent && o.attachEvent("onunload", ot)), g = !r(s), n.attributes = lt((function(t) {
                                return t.className = "i", !t.getAttribute("className")
                            })), n.getElementsByTagName = lt((function(t) {
                                return t.appendChild(s.createComment("")), !t.getElementsByTagName("*").length
                            })), n.getElementsByClassName = $.test(s.getElementsByClassName), n.getById = lt((function(t) {
                                return m.appendChild(t).id = y, !s.getElementsByName || !s.getElementsByName(y).length
                            })), n.getById ? (i.find.ID = function(t, e) {
                                if (void 0 !== e.getElementById && g) {
                                    var n = e.getElementById(t);
                                    return n && n.parentNode ? [n] : []
                                }
                            }, i.filter.ID = function(t) {
                                var e = t.replace(nt, it);
                                return function(t) {
                                    return t.getAttribute("id") === e
                                }
                            }) : (delete i.find.ID, i.filter.ID = function(t) {
                                var e = t.replace(nt, it);
                                return function(t) {
                                    var n = void 0 !== t.getAttributeNode && t.getAttributeNode("id");
                                    return n && n.value === e
                                }
                            }), i.find.TAG = n.getElementsByTagName ? function(t, e) {
                                return void 0 !== e.getElementsByTagName ? e.getElementsByTagName(t) : n.qsa ? e.querySelectorAll(t) : void 0
                            } : function(t, e) {
                                var n, i = [],
                                    o = 0,
                                    r = e.getElementsByTagName(t);
                                if ("*" === t) {
                                    for (; n = r[o++];) 1 === n.nodeType && i.push(n);
                                    return i
                                }
                                return r
                            }, i.find.CLASS = n.getElementsByClassName && function(t, e) {
                                if (g) return e.getElementsByClassName(t)
                            }, b = [], f = [], (n.qsa = $.test(s.querySelectorAll)) && (lt((function(t) {
                                m.appendChild(t).innerHTML = "<a id='" + y + "'></a><select id='" + y + "-\f]' msallowcapture=''><option selected=''></option></select>", t.querySelectorAll("[msallowcapture^='']").length && f.push("[*^$]=" + R + "*(?:''|\"\")"), t.querySelectorAll("[selected]").length || f.push("\\[" + R + "*(?:value|" + I + ")"), t.querySelectorAll("[id~=" + y + "-]").length || f.push("~="), t.querySelectorAll(":checked").length || f.push(":checked"), t.querySelectorAll("a#" + y + "+*").length || f.push(".#.+[+~]")
                            })), lt((function(t) {
                                var e = s.createElement("input");
                                e.setAttribute("type", "hidden"), t.appendChild(e).setAttribute("name", "D"), t.querySelectorAll("[name=d]").length && f.push("name" + R + "*[*^$|!~]?="), t.querySelectorAll(":enabled").length || f.push(":enabled", ":disabled"), t.querySelectorAll("*,:x"), f.push(",.*:")
                            }))), (n.matchesSelector = $.test(A = m.matches || m.webkitMatchesSelector || m.mozMatchesSelector || m.oMatchesSelector || m.msMatchesSelector)) && lt((function(t) {
                                n.disconnectedMatch = A.call(t, "div"), A.call(t, "[s!='']:x"), b.push("!=", W)
                            })), f = f.length && new RegExp(f.join("|")), b = b.length && new RegExp(b.join("|")), e = $.test(m.compareDocumentPosition), v = e || $.test(m.contains) ? function(t, e) {
                                var n = 9 === t.nodeType ? t.documentElement : t,
                                    i = e && e.parentNode;
                                return t === i || !(!i || 1 !== i.nodeType || !(n.contains ? n.contains(i) : t.compareDocumentPosition && 16 & t.compareDocumentPosition(i)))
                            } : function(t, e) {
                                if (e)
                                    for (; e = e.parentNode;)
                                        if (e === t) return !0;
                                return !1
                            }, S = e ? function(t, e) {
                                if (t === e) return u = !0, 0;
                                var i = !t.compareDocumentPosition - !e.compareDocumentPosition;
                                return i || (1 & (i = (t.ownerDocument || t) === (e.ownerDocument || e) ? t.compareDocumentPosition(e) : 1) || !n.sortDetached && e.compareDocumentPosition(t) === i ? t === s || t.ownerDocument === w && v(w, t) ? -1 : e === s || e.ownerDocument === w && v(w, e) ? 1 : c ? P(c, t) - P(c, e) : 0 : 4 & i ? -1 : 1)
                            } : function(t, e) {
                                if (t === e) return u = !0, 0;
                                var n, i = 0,
                                    o = t.parentNode,
                                    r = e.parentNode,
                                    a = [t],
                                    l = [e];
                                if (!o || !r) return t === s ? -1 : e === s ? 1 : o ? -1 : r ? 1 : c ? P(c, t) - P(c, e) : 0;
                                if (o === r) return ct(t, e);
                                for (n = t; n = n.parentNode;) a.unshift(n);
                                for (n = e; n = n.parentNode;) l.unshift(n);
                                for (; a[i] === l[i];) i++;
                                return i ? ct(a[i], l[i]) : a[i] === w ? -1 : l[i] === w ? 1 : 0
                            }, s) : h
                        }, rt.matches = function(t, e) {
                            return rt(t, null, null, e)
                        }, rt.matchesSelector = function(t, e) {
                            if ((t.ownerDocument || t) !== h && p(t), e = e.replace(Y, "='$1']"), n.matchesSelector && g && (!b || !b.test(e)) && (!f || !f.test(e))) try {
                                var i = A.call(t, e);
                                if (i || n.disconnectedMatch || t.document && 11 !== t.document.nodeType) return i
                            } catch (t) {}
                            return rt(e, h, null, [t]).length > 0
                        }, rt.contains = function(t, e) {
                            return (t.ownerDocument || t) !== h && p(t), v(t, e)
                        }, rt.attr = function(t, e) {
                            (t.ownerDocument || t) !== h && p(t);
                            var o = i.attrHandle[e.toLowerCase()],
                                r = o && T.call(i.attrHandle, e.toLowerCase()) ? o(t, e, !g) : void 0;
                            return void 0 !== r ? r : n.attributes || !g ? t.getAttribute(e) : (r = t.getAttributeNode(e)) && r.specified ? r.value : null
                        }, rt.error = function(t) {
                            throw new Error("Syntax error, unrecognized expression: " + t)
                        }, rt.uniqueSort = function(t) {
                            var e, i = [],
                                o = 0,
                                r = 0;
                            if (u = !n.detectDuplicates, c = !n.sortStable && t.slice(0), t.sort(S), u) {
                                for (; e = t[r++];) e === t[r] && (o = i.push(r));
                                for (; o--;) t.splice(i[o], 1)
                            }
                            return c = null, t
                        }, o = rt.getText = function(t) {
                            var e, n = "",
                                i = 0,
                                r = t.nodeType;
                            if (r) {
                                if (1 === r || 9 === r || 11 === r) {
                                    if ("string" == typeof t.textContent) return t.textContent;
                                    for (t = t.firstChild; t; t = t.nextSibling) n += o(t)
                                } else if (3 === r || 4 === r) return t.nodeValue
                            } else
                                for (; e = t[i++];) n += o(e);
                            return n
                        }, i = rt.selectors = {
                            cacheLength: 50,
                            createPseudo: at,
                            match: G,
                            attrHandle: {},
                            find: {},
                            relative: {
                                ">": {
                                    dir: "parentNode",
                                    first: !0
                                },
                                " ": {
                                    dir: "parentNode"
                                },
                                "+": {
                                    dir: "previousSibling",
                                    first: !0
                                },
                                "~": {
                                    dir: "previousSibling"
                                }
                            },
                            preFilter: {
                                ATTR: function(t) {
                                    return t[1] = t[1].replace(nt, it), t[3] = (t[3] || t[4] || t[5] || "").replace(nt, it), "~=" === t[2] && (t[3] = " " + t[3] + " "), t.slice(0, 4)
                                },
                                CHILD: function(t) {
                                    return t[1] = t[1].toLowerCase(), "nth" === t[1].slice(0, 3) ? (t[3] || rt.error(t[0]), t[4] = +(t[4] ? t[5] + (t[6] || 1) : 2 * ("even" === t[3] || "odd" === t[3])), t[5] = +(t[7] + t[8] || "odd" === t[3])) : t[3] && rt.error(t[0]), t
                                },
                                PSEUDO: function(t) {
                                    var e, n = !t[6] && t[2];
                                    return G.CHILD.test(t[0]) ? null : (t[3] ? t[2] = t[4] || t[5] || "" : n && U.test(n) && (e = s(n, !0)) && (e = n.indexOf(")", n.length - e) - n.length) && (t[0] = t[0].slice(0, e), t[2] = n.slice(0, e)), t.slice(0, 3))
                                }
                            },
                            filter: {
                                TAG: function(t) {
                                    var e = t.replace(nt, it).toLowerCase();
                                    return "*" === t ? function() {
                                        return !0
                                    } : function(t) {
                                        return t.nodeName && t.nodeName.toLowerCase() === e
                                    }
                                },
                                CLASS: function(t) {
                                    var e = C[t + " "];
                                    return e || (e = new RegExp("(^|" + R + ")" + t + "(" + R + "|$)")) && C(t, (function(t) {
                                        return e.test("string" == typeof t.className && t.className || void 0 !== t.getAttribute && t.getAttribute("class") || "")
                                    }))
                                },
                                ATTR: function(t, e, n) {
                                    return function(i) {
                                        var o = rt.attr(i, t);
                                        return null == o ? "!=" === e : !e || (o += "", "=" === e ? o === n : "!=" === e ? o !== n : "^=" === e ? n && 0 === o.indexOf(n) : "*=" === e ? n && o.indexOf(n) > -1 : "$=" === e ? n && o.slice(-n.length) === n : "~=" === e ? (" " + o.replace(F, " ") + " ").indexOf(n) > -1 : "|=" === e && (o === n || o.slice(0, n.length + 1) === n + "-"))
                                    }
                                },
                                CHILD: function(t, e, n, i, o) {
                                    var r = "nth" !== t.slice(0, 3),
                                        s = "last" !== t.slice(-4),
                                        a = "of-type" === e;
                                    return 1 === i && 0 === o ? function(t) {
                                        return !!t.parentNode
                                    } : function(e, n, l) {
                                        var d, c, u, p, h, m, g = r !== s ? "nextSibling" : "previousSibling",
                                            f = e.parentNode,
                                            b = a && e.nodeName.toLowerCase(),
                                            A = !l && !a;
                                        if (f) {
                                            if (r) {
                                                for (; g;) {
                                                    for (u = e; u = u[g];)
                                                        if (a ? u.nodeName.toLowerCase() === b : 1 === u.nodeType) return !1;
                                                    m = g = "only" === t && !m && "nextSibling"
                                                }
                                                return !0
                                            }
                                            if (m = [s ? f.firstChild : f.lastChild], s && A) {
                                                for (h = (d = (c = f[y] || (f[y] = {}))[t] || [])[0] === k && d[1], p = d[0] === k && d[2], u = h && f.childNodes[h]; u = ++h && u && u[g] || (p = h = 0) || m.pop();)
                                                    if (1 === u.nodeType && ++p && u === e) {
                                                        c[t] = [k, h, p];
                                                        break
                                                    }
                                            } else if (A && (d = (e[y] || (e[y] = {}))[t]) && d[0] === k) p = d[1];
                                            else
                                                for (;
                                                    (u = ++h && u && u[g] || (p = h = 0) || m.pop()) && ((a ? u.nodeName.toLowerCase() !== b : 1 !== u.nodeType) || !++p || (A && ((u[y] || (u[y] = {}))[t] = [k, p]), u !== e)););
                                            return (p -= o) === i || p % i == 0 && p / i >= 0
                                        }
                                    }
                                },
                                PSEUDO: function(t, e) {
                                    var n, o = i.pseudos[t] || i.setFilters[t.toLowerCase()] || rt.error("unsupported pseudo: " + t);
                                    return o[y] ? o(e) : o.length > 1 ? (n = [t, t, "", e], i.setFilters.hasOwnProperty(t.toLowerCase()) ? at((function(t, n) {
                                        for (var i, r = o(t, e), s = r.length; s--;) t[i = P(t, r[s])] = !(n[i] = r[s])
                                    })) : function(t) {
                                        return o(t, 0, n)
                                    }) : o
                                }
                            },
                            pseudos: {
                                not: at((function(t) {
                                    var e = [],
                                        n = [],
                                        i = a(t.replace(q, "$1"));
                                    return i[y] ? at((function(t, e, n, o) {
                                        for (var r, s = i(t, null, o, []), a = t.length; a--;)(r = s[a]) && (t[a] = !(e[a] = r))
                                    })) : function(t, o, r) {
                                        return e[0] = t, i(e, null, r, n), e[0] = null, !n.pop()
                                    }
                                })),
                                has: at((function(t) {
                                    return function(e) {
                                        return rt(t, e).length > 0
                                    }
                                })),
                                contains: at((function(t) {
                                    return t = t.replace(nt, it),
                                        function(e) {
                                            return (e.textContent || e.innerText || o(e)).indexOf(t) > -1
                                        }
                                })),
                                lang: at((function(t) {
                                    return Q.test(t || "") || rt.error("unsupported lang: " + t), t = t.replace(nt, it).toLowerCase(),
                                        function(e) {
                                            var n;
                                            do {
                                                if (n = g ? e.lang : e.getAttribute("xml:lang") || e.getAttribute("lang")) return (n = n.toLowerCase()) === t || 0 === n.indexOf(t + "-")
                                            } while ((e = e.parentNode) && 1 === e.nodeType);
                                            return !1
                                        }
                                })),
                                target: function(e) {
                                    var n = t.location && t.location.hash;
                                    return n && n.slice(1) === e.id
                                },
                                root: function(t) {
                                    return t === m
                                },
                                focus: function(t) {
                                    return t === h.activeElement && (!h.hasFocus || h.hasFocus()) && !!(t.type || t.href || ~t.tabIndex)
                                },
                                enabled: function(t) {
                                    return !1 === t.disabled
                                },
                                disabled: function(t) {
                                    return !0 === t.disabled
                                },
                                checked: function(t) {
                                    var e = t.nodeName.toLowerCase();
                                    return "input" === e && !!t.checked || "option" === e && !!t.selected
                                },
                                selected: function(t) {
                                    return t.parentNode && t.parentNode.selectedIndex, !0 === t.selected
                                },
                                empty: function(t) {
                                    for (t = t.firstChild; t; t = t.nextSibling)
                                        if (t.nodeType < 6) return !1;
                                    return !0
                                },
                                parent: function(t) {
                                    return !i.pseudos.empty(t)
                                },
                                header: function(t) {
                                    return J.test(t.nodeName)
                                },
                                input: function(t) {
                                    return Z.test(t.nodeName)
                                },
                                button: function(t) {
                                    var e = t.nodeName.toLowerCase();
                                    return "input" === e && "button" === t.type || "button" === e
                                },
                                text: function(t) {
                                    var e;
                                    return "input" === t.nodeName.toLowerCase() && "text" === t.type && (null == (e = t.getAttribute("type")) || "text" === e.toLowerCase())
                                },
                                first: ht((function() {
                                    return [0]
                                })),
                                last: ht((function(t, e) {
                                    return [e - 1]
                                })),
                                eq: ht((function(t, e, n) {
                                    return [n < 0 ? n + e : n]
                                })),
                                even: ht((function(t, e) {
                                    for (var n = 0; n < e; n += 2) t.push(n);
                                    return t
                                })),
                                odd: ht((function(t, e) {
                                    for (var n = 1; n < e; n += 2) t.push(n);
                                    return t
                                })),
                                lt: ht((function(t, e, n) {
                                    for (var i = n < 0 ? n + e : n; --i >= 0;) t.push(i);
                                    return t
                                })),
                                gt: ht((function(t, e, n) {
                                    for (var i = n < 0 ? n + e : n; ++i < e;) t.push(i);
                                    return t
                                }))
                            }
                        }, i.pseudos.nth = i.pseudos.eq, {
                            radio: !0,
                            checkbox: !0,
                            file: !0,
                            password: !0,
                            image: !0
                        }) i.pseudos[e] = ut(e);
                    for (e in {
                            submit: !0,
                            reset: !0
                        }) i.pseudos[e] = pt(e);

                    function gt() {}

                    function ft(t) {
                        for (var e = 0, n = t.length, i = ""; e < n; e++) i += t[e].value;
                        return i
                    }

                    function bt(t, e, n) {
                        var i = e.dir,
                            o = n && "parentNode" === i,
                            r = x++;
                        return e.first ? function(e, n, r) {
                            for (; e = e[i];)
                                if (1 === e.nodeType || o) return t(e, n, r)
                        } : function(e, n, s) {
                            var a, l, d = [k, r];
                            if (s) {
                                for (; e = e[i];)
                                    if ((1 === e.nodeType || o) && t(e, n, s)) return !0
                            } else
                                for (; e = e[i];)
                                    if (1 === e.nodeType || o) {
                                        if ((a = (l = e[y] || (e[y] = {}))[i]) && a[0] === k && a[1] === r) return d[2] = a[2];
                                        if (l[i] = d, d[2] = t(e, n, s)) return !0
                                    }
                        }
                    }

                    function At(t) {
                        return t.length > 1 ? function(e, n, i) {
                            for (var o = t.length; o--;)
                                if (!t[o](e, n, i)) return !1;
                            return !0
                        } : t[0]
                    }

                    function vt(t, e, n, i, o) {
                        for (var r, s = [], a = 0, l = t.length, d = null != e; a < l; a++)(r = t[a]) && (n && !n(r, i, o) || (s.push(r), d && e.push(a)));
                        return s
                    }

                    function yt(t, e, n, i, o, r) {
                        return i && !i[y] && (i = yt(i)), o && !o[y] && (o = yt(o, r)), at((function(r, s, a, l) {
                            var d, c, u, p = [],
                                h = [],
                                m = s.length,
                                g = r || function(t, e, n) {
                                    for (var i = 0, o = e.length; i < o; i++) rt(t, e[i], n);
                                    return n
                                }(e || "*", a.nodeType ? [a] : a, []),
                                f = !t || !r && e ? g : vt(g, p, t, a, l),
                                b = n ? o || (r ? t : m || i) ? [] : s : f;
                            if (n && n(f, b, a, l), i)
                                for (d = vt(b, h), i(d, [], a, l), c = d.length; c--;)(u = d[c]) && (b[h[c]] = !(f[h[c]] = u));
                            if (r) {
                                if (o || t) {
                                    if (o) {
                                        for (d = [], c = b.length; c--;)(u = b[c]) && d.push(f[c] = u);
                                        o(null, b = [], d, l)
                                    }
                                    for (c = b.length; c--;)(u = b[c]) && (d = o ? P(r, u) : p[c]) > -1 && (r[d] = !(s[d] = u))
                                }
                            } else b = vt(b === s ? b.splice(m, b.length) : b), o ? o(null, s, b, l) : O.apply(s, b)
                        }))
                    }

                    function wt(t) {
                        for (var e, n, o, r = t.length, s = i.relative[t[0].type], a = s || i.relative[" "], l = s ? 1 : 0, c = bt((function(t) {
                                return t === e
                            }), a, !0), u = bt((function(t) {
                                return P(e, t) > -1
                            }), a, !0), p = [function(t, n, i) {
                                var o = !s && (i || n !== d) || ((e = n).nodeType ? c(t, n, i) : u(t, n, i));
                                return e = null, o
                            }]; l < r; l++)
                            if (n = i.relative[t[l].type]) p = [bt(At(p), n)];
                            else {
                                if ((n = i.filter[t[l].type].apply(null, t[l].matches))[y]) {
                                    for (o = ++l; o < r && !i.relative[t[o].type]; o++);
                                    return yt(l > 1 && At(p), l > 1 && ft(t.slice(0, l - 1).concat({
                                        value: " " === t[l - 2].type ? "*" : ""
                                    })).replace(q, "$1"), n, l < o && wt(t.slice(l, o)), o < r && wt(t = t.slice(o)), o < r && ft(t))
                                }
                                p.push(n)
                            } return At(p)
                    }
                    return gt.prototype = i.filters = i.pseudos, i.setFilters = new gt, s = rt.tokenize = function(t, e) {
                        var n, o, r, s, a, l, d, c = E[t + " "];
                        if (c) return e ? 0 : c.slice(0);
                        for (a = t, l = [], d = i.preFilter; a;) {
                            for (s in n && !(o = X.exec(a)) || (o && (a = a.slice(o[0].length) || a), l.push(r = [])), n = !1, (o = V.exec(a)) && (n = o.shift(), r.push({
                                    value: n,
                                    type: o[0].replace(q, " ")
                                }), a = a.slice(n.length)), i.filter) !(o = G[s].exec(a)) || d[s] && !(o = d[s](o)) || (n = o.shift(), r.push({
                                value: n,
                                type: s,
                                matches: o
                            }), a = a.slice(n.length));
                            if (!n) break
                        }
                        return e ? a.length : a ? rt.error(t) : E(t, l).slice(0)
                    }, a = rt.compile = function(t, e) {
                        var n, o = [],
                            r = [],
                            a = _[t + " "];
                        if (!a) {
                            for (e || (e = s(t)), n = e.length; n--;)(a = wt(e[n]))[y] ? o.push(a) : r.push(a);
                            a = _(t, function(t, e) {
                                var n = e.length > 0,
                                    o = t.length > 0,
                                    r = function(r, s, a, l, c) {
                                        var u, p, m, g = 0,
                                            f = "0",
                                            b = r && [],
                                            A = [],
                                            v = d,
                                            y = r || o && i.find.TAG("*", c),
                                            w = k += null == v ? 1 : Math.random() || .1,
                                            x = y.length;
                                        for (c && (d = s !== h && s); f !== x && null != (u = y[f]); f++) {
                                            if (o && u) {
                                                for (p = 0; m = t[p++];)
                                                    if (m(u, s, a)) {
                                                        l.push(u);
                                                        break
                                                    } c && (k = w)
                                            }
                                            n && ((u = !m && u) && g--, r && b.push(u))
                                        }
                                        if (g += f, n && f !== g) {
                                            for (p = 0; m = e[p++];) m(b, A, s, a);
                                            if (r) {
                                                if (g > 0)
                                                    for (; f--;) b[f] || A[f] || (A[f] = B.call(l));
                                                A = vt(A)
                                            }
                                            O.apply(l, A), c && !r && A.length > 0 && g + e.length > 1 && rt.uniqueSort(l)
                                        }
                                        return c && (k = w, d = v), b
                                    };
                                return n ? at(r) : r
                            }(r, o)), a.selector = t
                        }
                        return a
                    }, l = rt.select = function(t, e, o, r) {
                        var l, d, c, u, p, h = "function" == typeof t && t,
                            m = !r && s(t = h.selector || t);
                        if (o = o || [], 1 === m.length) {
                            if ((d = m[0] = m[0].slice(0)).length > 2 && "ID" === (c = d[0]).type && n.getById && 9 === e.nodeType && g && i.relative[d[1].type]) {
                                if (!(e = (i.find.ID(c.matches[0].replace(nt, it), e) || [])[0])) return o;
                                h && (e = e.parentNode), t = t.slice(d.shift().value.length)
                            }
                            for (l = G.needsContext.test(t) ? 0 : d.length; l-- && (c = d[l], !i.relative[u = c.type]);)
                                if ((p = i.find[u]) && (r = p(c.matches[0].replace(nt, it), tt.test(d[0].type) && mt(e.parentNode) || e))) {
                                    if (d.splice(l, 1), !(t = r.length && ft(d))) return O.apply(o, r), o;
                                    break
                                }
                        }
                        return (h || a(t, m))(r, e, !g, o, tt.test(t) && mt(e.parentNode) || e), o
                    }, n.sortStable = y.split("").sort(S).join("") === y, n.detectDuplicates = !!u, p(), n.sortDetached = lt((function(t) {
                        return 1 & t.compareDocumentPosition(h.createElement("div"))
                    })), lt((function(t) {
                        return t.innerHTML = "<a href='#'></a>", "#" === t.firstChild.getAttribute("href")
                    })) || dt("type|href|height|width", (function(t, e, n) {
                        if (!n) return t.getAttribute(e, "type" === e.toLowerCase() ? 1 : 2)
                    })), n.attributes && lt((function(t) {
                        return t.innerHTML = "<input/>", t.firstChild.setAttribute("value", ""), "" === t.firstChild.getAttribute("value")
                    })) || dt("value", (function(t, e, n) {
                        if (!n && "input" === t.nodeName.toLowerCase()) return t.defaultValue
                    })), lt((function(t) {
                        return null == t.getAttribute("disabled")
                    })) || dt(I, (function(t, e, n) {
                        var i;
                        if (!n) return !0 === t[e] ? e.toLowerCase() : (i = t.getAttributeNode(e)) && i.specified ? i.value : null
                    })), rt
                }(i);
                f.find = k, f.expr = k.selectors, f.expr[":"] = f.expr.pseudos, f.unique = k.uniqueSort, f.text = k.getText, f.isXMLDoc = k.isXML, f.contains = k.contains;
                var x = f.expr.match.needsContext,
                    C = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,
                    E = /^.[^:#\[\.,]*$/;

                function _(t, e, n) {
                    if (f.isFunction(e)) return f.grep(t, (function(t, i) {
                        return !!e.call(t, i, t) !== n
                    }));
                    if (e.nodeType) return f.grep(t, (function(t) {
                        return t === e !== n
                    }));
                    if ("string" == typeof e) {
                        if (E.test(e)) return f.filter(e, t, n);
                        e = f.filter(e, t)
                    }
                    return f.grep(t, (function(t) {
                        return d.call(e, t) >= 0 !== n
                    }))
                }
                f.filter = function(t, e, n) {
                    var i = e[0];
                    return n && (t = ":not(" + t + ")"), 1 === e.length && 1 === i.nodeType ? f.find.matchesSelector(i, t) ? [i] : [] : f.find.matches(t, f.grep(e, (function(t) {
                        return 1 === t.nodeType
                    })))
                }, f.fn.extend({
                    find: function(t) {
                        var e, n = this.length,
                            i = [],
                            o = this;
                        if ("string" != typeof t) return this.pushStack(f(t).filter((function() {
                            for (e = 0; e < n; e++)
                                if (f.contains(o[e], this)) return !0
                        })));
                        for (e = 0; e < n; e++) f.find(t, o[e], i);
                        return (i = this.pushStack(n > 1 ? f.unique(i) : i)).selector = this.selector ? this.selector + " " + t : t, i
                    },
                    filter: function(t) {
                        return this.pushStack(_(this, t || [], !1))
                    },
                    not: function(t) {
                        return this.pushStack(_(this, t || [], !0))
                    },
                    is: function(t) {
                        return !!_(this, "string" == typeof t && x.test(t) ? f(t) : t || [], !1).length
                    }
                });
                var S, M = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/;
                (f.fn.init = function(t, e) {
                    var n, i;
                    if (!t) return this;
                    if ("string" == typeof t) {
                        if (!(n = "<" === t[0] && ">" === t[t.length - 1] && t.length >= 3 ? [null, t, null] : M.exec(t)) || !n[1] && e) return !e || e.jquery ? (e || S).find(t) : this.constructor(e).find(t);
                        if (n[1]) {
                            if (e = e instanceof f ? e[0] : e, f.merge(this, f.parseHTML(n[1], e && e.nodeType ? e.ownerDocument || e : m, !0)), C.test(n[1]) && f.isPlainObject(e))
                                for (n in e) f.isFunction(this[n]) ? this[n](e[n]) : this.attr(n, e[n]);
                            return this
                        }
                        return (i = m.getElementById(n[2])) && i.parentNode && (this.length = 1, this[0] = i), this.context = m, this.selector = t, this
                    }
                    return t.nodeType ? (this.context = this[0] = t, this.length = 1, this) : f.isFunction(t) ? void 0 !== S.ready ? S.ready(t) : t(f) : (void 0 !== t.selector && (this.selector = t.selector, this.context = t.context), f.makeArray(t, this))
                }).prototype = f.fn, S = f(m);
                var T = /^(?:parents|prev(?:Until|All))/,
                    L = {
                        children: !0,
                        contents: !0,
                        next: !0,
                        prev: !0
                    };

                function B(t, e) {
                    for (;
                        (t = t[e]) && 1 !== t.nodeType;);
                    return t
                }
                f.extend({
                    dir: function(t, e, n) {
                        for (var i = [], o = void 0 !== n;
                            (t = t[e]) && 9 !== t.nodeType;)
                            if (1 === t.nodeType) {
                                if (o && f(t).is(n)) break;
                                i.push(t)
                            } return i
                    },
                    sibling: function(t, e) {
                        for (var n = []; t; t = t.nextSibling) 1 === t.nodeType && t !== e && n.push(t);
                        return n
                    }
                }), f.fn.extend({
                    has: function(t) {
                        var e = f(t, this),
                            n = e.length;
                        return this.filter((function() {
                            for (var t = 0; t < n; t++)
                                if (f.contains(this, e[t])) return !0
                        }))
                    },
                    closest: function(t, e) {
                        for (var n, i = 0, o = this.length, r = [], s = x.test(t) || "string" != typeof t ? f(t, e || this.context) : 0; i < o; i++)
                            for (n = this[i]; n && n !== e; n = n.parentNode)
                                if (n.nodeType < 11 && (s ? s.index(n) > -1 : 1 === n.nodeType && f.find.matchesSelector(n, t))) {
                                    r.push(n);
                                    break
                                } return this.pushStack(r.length > 1 ? f.unique(r) : r)
                    },
                    index: function(t) {
                        return t ? "string" == typeof t ? d.call(f(t), this[0]) : d.call(this, t.jquery ? t[0] : t) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1
                    },
                    add: function(t, e) {
                        return this.pushStack(f.unique(f.merge(this.get(), f(t, e))))
                    },
                    addBack: function(t) {
                        return this.add(null == t ? this.prevObject : this.prevObject.filter(t))
                    }
                }), f.each({
                    parent: function(t) {
                        var e = t.parentNode;
                        return e && 11 !== e.nodeType ? e : null
                    },
                    parents: function(t) {
                        return f.dir(t, "parentNode")
                    },
                    parentsUntil: function(t, e, n) {
                        return f.dir(t, "parentNode", n)
                    },
                    next: function(t) {
                        return B(t, "nextSibling")
                    },
                    prev: function(t) {
                        return B(t, "previousSibling")
                    },
                    nextAll: function(t) {
                        return f.dir(t, "nextSibling")
                    },
                    prevAll: function(t) {
                        return f.dir(t, "previousSibling")
                    },
                    nextUntil: function(t, e, n) {
                        return f.dir(t, "nextSibling", n)
                    },
                    prevUntil: function(t, e, n) {
                        return f.dir(t, "previousSibling", n)
                    },
                    siblings: function(t) {
                        return f.sibling((t.parentNode || {}).firstChild, t)
                    },
                    children: function(t) {
                        return f.sibling(t.firstChild)
                    },
                    contents: function(t) {
                        return t.contentDocument || f.merge([], t.childNodes)
                    }
                }, (function(t, e) {
                    f.fn[t] = function(n, i) {
                        var o = f.map(this, e, n);
                        return "Until" !== t.slice(-5) && (i = n), i && "string" == typeof i && (o = f.filter(i, o)), this.length > 1 && (L[t] || f.unique(o), T.test(t) && o.reverse()), this.pushStack(o)
                    }
                }));
                var N, O = /\S+/g,
                    D = {};

                function P() {
                    m.removeEventListener("DOMContentLoaded", P, !1), i.removeEventListener("load", P, !1), f.ready()
                }
                f.Callbacks = function(t) {
                    t = "string" == typeof t ? D[t] || function(t) {
                        var e = D[t] = {};
                        return f.each(t.match(O) || [], (function(t, n) {
                            e[n] = !0
                        })), e
                    }(t) : f.extend({}, t);
                    var e, n, i, o, r, s, a = [],
                        l = !t.once && [],
                        d = function(u) {
                            for (e = t.memory && u, n = !0, s = o || 0, o = 0, r = a.length, i = !0; a && s < r; s++)
                                if (!1 === a[s].apply(u[0], u[1]) && t.stopOnFalse) {
                                    e = !1;
                                    break
                                } i = !1, a && (l ? l.length && d(l.shift()) : e ? a = [] : c.disable())
                        },
                        c = {
                            add: function() {
                                if (a) {
                                    var n = a.length;
                                    ! function e(n) {
                                        f.each(n, (function(n, i) {
                                            var o = f.type(i);
                                            "function" === o ? t.unique && c.has(i) || a.push(i) : i && i.length && "string" !== o && e(i)
                                        }))
                                    }(arguments), i ? r = a.length : e && (o = n, d(e))
                                }
                                return this
                            },
                            remove: function() {
                                return a && f.each(arguments, (function(t, e) {
                                    for (var n;
                                        (n = f.inArray(e, a, n)) > -1;) a.splice(n, 1), i && (n <= r && r--, n <= s && s--)
                                })), this
                            },
                            has: function(t) {
                                return t ? f.inArray(t, a) > -1 : !(!a || !a.length)
                            },
                            empty: function() {
                                return a = [], r = 0, this
                            },
                            disable: function() {
                                return a = l = e = void 0, this
                            },
                            disabled: function() {
                                return !a
                            },
                            lock: function() {
                                return l = void 0, e || c.disable(), this
                            },
                            locked: function() {
                                return !l
                            },
                            fireWith: function(t, e) {
                                return !a || n && !l || (e = [t, (e = e || []).slice ? e.slice() : e], i ? l.push(e) : d(e)), this
                            },
                            fire: function() {
                                return c.fireWith(this, arguments), this
                            },
                            fired: function() {
                                return !!n
                            }
                        };
                    return c
                }, f.extend({
                    Deferred: function(t) {
                        var e = [
                                ["resolve", "done", f.Callbacks("once memory"), "resolved"],
                                ["reject", "fail", f.Callbacks("once memory"), "rejected"],
                                ["notify", "progress", f.Callbacks("memory")]
                            ],
                            n = "pending",
                            i = {
                                state: function() {
                                    return n
                                },
                                always: function() {
                                    return o.done(arguments).fail(arguments), this
                                },
                                then: function() {
                                    var t = arguments;
                                    return f.Deferred((function(n) {
                                        f.each(e, (function(e, r) {
                                            var s = f.isFunction(t[e]) && t[e];
                                            o[r[1]]((function() {
                                                var t = s && s.apply(this, arguments);
                                                t && f.isFunction(t.promise) ? t.promise().done(n.resolve).fail(n.reject).progress(n.notify) : n[r[0] + "With"](this === i ? n.promise() : this, s ? [t] : arguments)
                                            }))
                                        })), t = null
                                    })).promise()
                                },
                                promise: function(t) {
                                    return null != t ? f.extend(t, i) : i
                                }
                            },
                            o = {};
                        return i.pipe = i.then, f.each(e, (function(t, r) {
                            var s = r[2],
                                a = r[3];
                            i[r[1]] = s.add, a && s.add((function() {
                                n = a
                            }), e[1 ^ t][2].disable, e[2][2].lock), o[r[0]] = function() {
                                return o[r[0] + "With"](this === o ? i : this, arguments), this
                            }, o[r[0] + "With"] = s.fireWith
                        })), i.promise(o), t && t.call(o, o), o
                    },
                    when: function(t) {
                        var e, n, i, o = 0,
                            r = s.call(arguments),
                            a = r.length,
                            l = 1 !== a || t && f.isFunction(t.promise) ? a : 0,
                            d = 1 === l ? t : f.Deferred(),
                            c = function(t, n, i) {
                                return function(o) {
                                    n[t] = this, i[t] = arguments.length > 1 ? s.call(arguments) : o, i === e ? d.notifyWith(n, i) : --l || d.resolveWith(n, i)
                                }
                            };
                        if (a > 1)
                            for (e = new Array(a), n = new Array(a), i = new Array(a); o < a; o++) r[o] && f.isFunction(r[o].promise) ? r[o].promise().done(c(o, i, r)).fail(d.reject).progress(c(o, n, e)) : --l;
                        return l || d.resolveWith(i, r), d.promise()
                    }
                }), f.fn.ready = function(t) {
                    return f.ready.promise().done(t), this
                }, f.extend({
                    isReady: !1,
                    readyWait: 1,
                    holdReady: function(t) {
                        t ? f.readyWait++ : f.ready(!0)
                    },
                    ready: function(t) {
                        (!0 === t ? --f.readyWait : f.isReady) || (f.isReady = !0, !0 !== t && --f.readyWait > 0 || (N.resolveWith(m, [f]), f.fn.triggerHandler && (f(m).triggerHandler("ready"), f(m).off("ready"))))
                    }
                }), f.ready.promise = function(t) {
                    return N || (N = f.Deferred(), "complete" === m.readyState ? setTimeout(f.ready) : (m.addEventListener("DOMContentLoaded", P, !1), i.addEventListener("load", P, !1))), N.promise(t)
                }, f.ready.promise();
                var I = f.access = function(t, e, n, i, o, r, s) {
                    var a = 0,
                        l = t.length,
                        d = null == n;
                    if ("object" === f.type(n))
                        for (a in o = !0, n) f.access(t, e, a, n[a], !0, r, s);
                    else if (void 0 !== i && (o = !0, f.isFunction(i) || (s = !0), d && (s ? (e.call(t, i), e = null) : (d = e, e = function(t, e, n) {
                            return d.call(f(t), n)
                        })), e))
                        for (; a < l; a++) e(t[a], n, s ? i : i.call(t[a], a, e(t[a], n)));
                    return o ? t : d ? e.call(t) : l ? e(t[0], n) : r
                };

                function R() {
                    Object.defineProperty(this.cache = {}, 0, {
                        get: function() {
                            return {}
                        }
                    }), this.expando = f.expando + R.uid++
                }
                f.acceptData = function(t) {
                    return 1 === t.nodeType || 9 === t.nodeType || !+t.nodeType
                }, R.uid = 1, R.accepts = f.acceptData, R.prototype = {
                    key: function(t) {
                        if (!R.accepts(t)) return 0;
                        var e = {},
                            n = t[this.expando];
                        if (!n) {
                            n = R.uid++;
                            try {
                                e[this.expando] = {
                                    value: n
                                }, Object.defineProperties(t, e)
                            } catch (i) {
                                e[this.expando] = n, f.extend(t, e)
                            }
                        }
                        return this.cache[n] || (this.cache[n] = {}), n
                    },
                    set: function(t, e, n) {
                        var i, o = this.key(t),
                            r = this.cache[o];
                        if ("string" == typeof e) r[e] = n;
                        else if (f.isEmptyObject(r)) f.extend(this.cache[o], e);
                        else
                            for (i in e) r[i] = e[i];
                        return r
                    },
                    get: function(t, e) {
                        var n = this.cache[this.key(t)];
                        return void 0 === e ? n : n[e]
                    },
                    access: function(t, e, n) {
                        var i;
                        return void 0 === e || e && "string" == typeof e && void 0 === n ? void 0 !== (i = this.get(t, e)) ? i : this.get(t, f.camelCase(e)) : (this.set(t, e, n), void 0 !== n ? n : e)
                    },
                    remove: function(t, e) {
                        var n, i, o, r = this.key(t),
                            s = this.cache[r];
                        if (void 0 === e) this.cache[r] = {};
                        else {
                            f.isArray(e) ? i = e.concat(e.map(f.camelCase)) : (o = f.camelCase(e), i = e in s ? [e, o] : (i = o) in s ? [i] : i.match(O) || []), n = i.length;
                            for (; n--;) delete s[i[n]]
                        }
                    },
                    hasData: function(t) {
                        return !f.isEmptyObject(this.cache[t[this.expando]] || {})
                    },
                    discard: function(t) {
                        t[this.expando] && delete this.cache[t[this.expando]]
                    }
                };
                var j = new R,
                    H = new R,
                    z = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
                    W = /([A-Z])/g;

                function F(t, e, n) {
                    var i;
                    if (void 0 === n && 1 === t.nodeType)
                        if (i = "data-" + e.replace(W, "-$1").toLowerCase(), "string" == typeof(n = t.getAttribute(i))) {
                            try {
                                n = "true" === n || "false" !== n && ("null" === n ? null : +n + "" === n ? +n : z.test(n) ? f.parseJSON(n) : n)
                            } catch (t) {}
                            H.set(t, e, n)
                        } else n = void 0;
                    return n
                }
                f.extend({
                    hasData: function(t) {
                        return H.hasData(t) || j.hasData(t)
                    },
                    data: function(t, e, n) {
                        return H.access(t, e, n)
                    },
                    removeData: function(t, e) {
                        H.remove(t, e)
                    },
                    _data: function(t, e, n) {
                        return j.access(t, e, n)
                    },
                    _removeData: function(t, e) {
                        j.remove(t, e)
                    }
                }), f.fn.extend({
                    data: function(t, e) {
                        var n, i, o, r = this[0],
                            s = r && r.attributes;
                        if (void 0 === t) {
                            if (this.length && (o = H.get(r), 1 === r.nodeType && !j.get(r, "hasDataAttrs"))) {
                                for (n = s.length; n--;) s[n] && 0 === (i = s[n].name).indexOf("data-") && (i = f.camelCase(i.slice(5)), F(r, i, o[i]));
                                j.set(r, "hasDataAttrs", !0)
                            }
                            return o
                        }
                        return "object" == typeof t ? this.each((function() {
                            H.set(this, t)
                        })) : I(this, (function(e) {
                            var n, i = f.camelCase(t);
                            if (r && void 0 === e) return void 0 !== (n = H.get(r, t)) || void 0 !== (n = H.get(r, i)) || void 0 !== (n = F(r, i, void 0)) ? n : void 0;
                            this.each((function() {
                                var n = H.get(this, i);
                                H.set(this, i, e), -1 !== t.indexOf("-") && void 0 !== n && H.set(this, t, e)
                            }))
                        }), null, e, arguments.length > 1, null, !0)
                    },
                    removeData: function(t) {
                        return this.each((function() {
                            H.remove(this, t)
                        }))
                    }
                }), f.extend({
                    queue: function(t, e, n) {
                        var i;
                        if (t) return e = (e || "fx") + "queue", i = j.get(t, e), n && (!i || f.isArray(n) ? i = j.access(t, e, f.makeArray(n)) : i.push(n)), i || []
                    },
                    dequeue: function(t, e) {
                        e = e || "fx";
                        var n = f.queue(t, e),
                            i = n.length,
                            o = n.shift(),
                            r = f._queueHooks(t, e);
                        "inprogress" === o && (o = n.shift(), i--), o && ("fx" === e && n.unshift("inprogress"), delete r.stop, o.call(t, (function() {
                            f.dequeue(t, e)
                        }), r)), !i && r && r.empty.fire()
                    },
                    _queueHooks: function(t, e) {
                        var n = e + "queueHooks";
                        return j.get(t, n) || j.access(t, n, {
                            empty: f.Callbacks("once memory").add((function() {
                                j.remove(t, [e + "queue", n])
                            }))
                        })
                    }
                }), f.fn.extend({
                    queue: function(t, e) {
                        var n = 2;
                        return "string" != typeof t && (e = t, t = "fx", n--), arguments.length < n ? f.queue(this[0], t) : void 0 === e ? this : this.each((function() {
                            var n = f.queue(this, t, e);
                            f._queueHooks(this, t), "fx" === t && "inprogress" !== n[0] && f.dequeue(this, t)
                        }))
                    },
                    dequeue: function(t) {
                        return this.each((function() {
                            f.dequeue(this, t)
                        }))
                    },
                    clearQueue: function(t) {
                        return this.queue(t || "fx", [])
                    },
                    promise: function(t, e) {
                        var n, i = 1,
                            o = f.Deferred(),
                            r = this,
                            s = this.length,
                            a = function() {
                                --i || o.resolveWith(r, [r])
                            };
                        for ("string" != typeof t && (e = t, t = void 0), t = t || "fx"; s--;)(n = j.get(r[s], t + "queueHooks")) && n.empty && (i++, n.empty.add(a));
                        return a(), o.promise(e)
                    }
                });
                var q, X, V = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,
                    Y = ["Top", "Right", "Bottom", "Left"],
                    U = function(t, e) {
                        return t = e || t, "none" === f.css(t, "display") || !f.contains(t.ownerDocument, t)
                    },
                    Q = /^(?:checkbox|radio)$/i;
                q = m.createDocumentFragment().appendChild(m.createElement("div")), (X = m.createElement("input")).setAttribute("type", "radio"), X.setAttribute("checked", "checked"), X.setAttribute("name", "t"), q.appendChild(X), h.checkClone = q.cloneNode(!0).cloneNode(!0).lastChild.checked, q.innerHTML = "<textarea>x</textarea>", h.noCloneChecked = !!q.cloneNode(!0).lastChild.defaultValue;
                var G = "undefined";
                h.focusinBubbles = "onfocusin" in i;
                var Z = /^key/,
                    J = /^(?:mouse|pointer|contextmenu)|click/,
                    $ = /^(?:focusinfocus|focusoutblur)$/,
                    K = /^([^.]*)(?:\.(.+)|)$/;

                function tt() {
                    return !0
                }

                function et() {
                    return !1
                }

                function nt() {
                    try {
                        return m.activeElement
                    } catch (t) {}
                }
                f.event = {
                    global: {},
                    add: function(t, e, n, i, o) {
                        var r, s, a, l, d, c, u, p, h, m, g, b = j.get(t);
                        if (b)
                            for (n.handler && (n = (r = n).handler, o = r.selector), n.guid || (n.guid = f.guid++), (l = b.events) || (l = b.events = {}), (s = b.handle) || (s = b.handle = function(e) {
                                    return typeof f !== G && f.event.triggered !== e.type ? f.event.dispatch.apply(t, arguments) : void 0
                                }), d = (e = (e || "").match(O) || [""]).length; d--;) h = g = (a = K.exec(e[d]) || [])[1], m = (a[2] || "").split(".").sort(), h && (u = f.event.special[h] || {}, h = (o ? u.delegateType : u.bindType) || h, u = f.event.special[h] || {}, c = f.extend({
                                type: h,
                                origType: g,
                                data: i,
                                handler: n,
                                guid: n.guid,
                                selector: o,
                                needsContext: o && f.expr.match.needsContext.test(o),
                                namespace: m.join(".")
                            }, r), (p = l[h]) || ((p = l[h] = []).delegateCount = 0, u.setup && !1 !== u.setup.call(t, i, m, s) || t.addEventListener && t.addEventListener(h, s, !1)), u.add && (u.add.call(t, c), c.handler.guid || (c.handler.guid = n.guid)), o ? p.splice(p.delegateCount++, 0, c) : p.push(c), f.event.global[h] = !0)
                    },
                    remove: function(t, e, n, i, o) {
                        var r, s, a, l, d, c, u, p, h, m, g, b = j.hasData(t) && j.get(t);
                        if (b && (l = b.events)) {
                            for (d = (e = (e || "").match(O) || [""]).length; d--;)
                                if (h = g = (a = K.exec(e[d]) || [])[1], m = (a[2] || "").split(".").sort(), h) {
                                    for (u = f.event.special[h] || {}, p = l[h = (i ? u.delegateType : u.bindType) || h] || [], a = a[2] && new RegExp("(^|\\.)" + m.join("\\.(?:.*\\.|)") + "(\\.|$)"), s = r = p.length; r--;) c = p[r], !o && g !== c.origType || n && n.guid !== c.guid || a && !a.test(c.namespace) || i && i !== c.selector && ("**" !== i || !c.selector) || (p.splice(r, 1), c.selector && p.delegateCount--, u.remove && u.remove.call(t, c));
                                    s && !p.length && (u.teardown && !1 !== u.teardown.call(t, m, b.handle) || f.removeEvent(t, h, b.handle), delete l[h])
                                } else
                                    for (h in l) f.event.remove(t, h + e[d], n, i, !0);
                            f.isEmptyObject(l) && (delete b.handle, j.remove(t, "events"))
                        }
                    },
                    trigger: function(t, e, n, o) {
                        var r, s, a, l, d, c, u, h = [n || m],
                            g = p.call(t, "type") ? t.type : t,
                            b = p.call(t, "namespace") ? t.namespace.split(".") : [];
                        if (s = a = n = n || m, 3 !== n.nodeType && 8 !== n.nodeType && !$.test(g + f.event.triggered) && (g.indexOf(".") >= 0 && (b = g.split("."), g = b.shift(), b.sort()), d = g.indexOf(":") < 0 && "on" + g, (t = t[f.expando] ? t : new f.Event(g, "object" == typeof t && t)).isTrigger = o ? 2 : 3, t.namespace = b.join("."), t.namespace_re = t.namespace ? new RegExp("(^|\\.)" + b.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, t.result = void 0, t.target || (t.target = n), e = null == e ? [t] : f.makeArray(e, [t]), u = f.event.special[g] || {}, o || !u.trigger || !1 !== u.trigger.apply(n, e))) {
                            if (!o && !u.noBubble && !f.isWindow(n)) {
                                for (l = u.delegateType || g, $.test(l + g) || (s = s.parentNode); s; s = s.parentNode) h.push(s), a = s;
                                a === (n.ownerDocument || m) && h.push(a.defaultView || a.parentWindow || i)
                            }
                            for (r = 0;
                                (s = h[r++]) && !t.isPropagationStopped();) t.type = r > 1 ? l : u.bindType || g, (c = (j.get(s, "events") || {})[t.type] && j.get(s, "handle")) && c.apply(s, e), (c = d && s[d]) && c.apply && f.acceptData(s) && (t.result = c.apply(s, e), !1 === t.result && t.preventDefault());
                            return t.type = g, o || t.isDefaultPrevented() || u._default && !1 !== u._default.apply(h.pop(), e) || !f.acceptData(n) || d && f.isFunction(n[g]) && !f.isWindow(n) && ((a = n[d]) && (n[d] = null), f.event.triggered = g, n[g](), f.event.triggered = void 0, a && (n[d] = a)), t.result
                        }
                    },
                    dispatch: function(t) {
                        t = f.event.fix(t);
                        var e, n, i, o, r, a, l = s.call(arguments),
                            d = (j.get(this, "events") || {})[t.type] || [],
                            c = f.event.special[t.type] || {};
                        if (l[0] = t, t.delegateTarget = this, !c.preDispatch || !1 !== c.preDispatch.call(this, t)) {
                            for (a = f.event.handlers.call(this, t, d), e = 0;
                                (o = a[e++]) && !t.isPropagationStopped();)
                                for (t.currentTarget = o.elem, n = 0;
                                    (r = o.handlers[n++]) && !t.isImmediatePropagationStopped();) t.namespace_re && !t.namespace_re.test(r.namespace) || (t.handleObj = r, t.data = r.data, void 0 !== (i = ((f.event.special[r.origType] || {}).handle || r.handler).apply(o.elem, l)) && !1 === (t.result = i) && (t.preventDefault(), t.stopPropagation()));
                            return c.postDispatch && c.postDispatch.call(this, t), t.result
                        }
                    },
                    handlers: function(t, e) {
                        var n, i, o, r, s = [],
                            a = e.delegateCount,
                            l = t.target;
                        if (a && l.nodeType && (!t.button || "click" !== t.type))
                            for (; l !== this; l = l.parentNode || this)
                                if (!0 !== l.disabled || "click" !== t.type) {
                                    for (i = [], n = 0; n < a; n++) void 0 === i[o = (r = e[n]).selector + " "] && (i[o] = r.needsContext ? f(o, this).index(l) >= 0 : f.find(o, this, null, [l]).length), i[o] && i.push(r);
                                    i.length && s.push({
                                        elem: l,
                                        handlers: i
                                    })
                                } return a < e.length && s.push({
                            elem: this,
                            handlers: e.slice(a)
                        }), s
                    },
                    props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
                    fixHooks: {},
                    keyHooks: {
                        props: "char charCode key keyCode".split(" "),
                        filter: function(t, e) {
                            return null == t.which && (t.which = null != e.charCode ? e.charCode : e.keyCode), t
                        }
                    },
                    mouseHooks: {
                        props: "button buttons clientX clientY offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
                        filter: function(t, e) {
                            var n, i, o, r = e.button;
                            return null == t.pageX && null != e.clientX && (i = (n = t.target.ownerDocument || m).documentElement, o = n.body, t.pageX = e.clientX + (i && i.scrollLeft || o && o.scrollLeft || 0) - (i && i.clientLeft || o && o.clientLeft || 0), t.pageY = e.clientY + (i && i.scrollTop || o && o.scrollTop || 0) - (i && i.clientTop || o && o.clientTop || 0)), t.which || void 0 === r || (t.which = 1 & r ? 1 : 2 & r ? 3 : 4 & r ? 2 : 0), t
                        }
                    },
                    fix: function(t) {
                        if (t[f.expando]) return t;
                        var e, n, i, o = t.type,
                            r = t,
                            s = this.fixHooks[o];
                        for (s || (this.fixHooks[o] = s = J.test(o) ? this.mouseHooks : Z.test(o) ? this.keyHooks : {}), i = s.props ? this.props.concat(s.props) : this.props, t = new f.Event(r), e = i.length; e--;) t[n = i[e]] = r[n];
                        return t.target || (t.target = m), 3 === t.target.nodeType && (t.target = t.target.parentNode), s.filter ? s.filter(t, r) : t
                    },
                    special: {
                        load: {
                            noBubble: !0
                        },
                        focus: {
                            trigger: function() {
                                if (this !== nt() && this.focus) return this.focus(), !1
                            },
                            delegateType: "focusin"
                        },
                        blur: {
                            trigger: function() {
                                if (this === nt() && this.blur) return this.blur(), !1
                            },
                            delegateType: "focusout"
                        },
                        click: {
                            trigger: function() {
                                if ("checkbox" === this.type && this.click && f.nodeName(this, "input")) return this.click(), !1
                            },
                            _default: function(t) {
                                return f.nodeName(t.target, "a")
                            }
                        },
                        beforeunload: {
                            postDispatch: function(t) {
                                void 0 !== t.result && t.originalEvent && (t.originalEvent.returnValue = t.result)
                            }
                        }
                    },
                    simulate: function(t, e, n, i) {
                        var o = f.extend(new f.Event, n, {
                            type: t,
                            isSimulated: !0,
                            originalEvent: {}
                        });
                        i ? f.event.trigger(o, null, e) : f.event.dispatch.call(e, o), o.isDefaultPrevented() && n.preventDefault()
                    }
                }, f.removeEvent = function(t, e, n) {
                    t.removeEventListener && t.removeEventListener(e, n, !1)
                }, f.Event = function(t, e) {
                    if (!(this instanceof f.Event)) return new f.Event(t, e);
                    t && t.type ? (this.originalEvent = t, this.type = t.type, this.isDefaultPrevented = t.defaultPrevented || void 0 === t.defaultPrevented && !1 === t.returnValue ? tt : et) : this.type = t, e && f.extend(this, e), this.timeStamp = t && t.timeStamp || f.now(), this[f.expando] = !0
                }, f.Event.prototype = {
                    isDefaultPrevented: et,
                    isPropagationStopped: et,
                    isImmediatePropagationStopped: et,
                    preventDefault: function() {
                        var t = this.originalEvent;
                        this.isDefaultPrevented = tt, t && t.preventDefault && t.preventDefault()
                    },
                    stopPropagation: function() {
                        var t = this.originalEvent;
                        this.isPropagationStopped = tt, t && t.stopPropagation && t.stopPropagation()
                    },
                    stopImmediatePropagation: function() {
                        var t = this.originalEvent;
                        this.isImmediatePropagationStopped = tt, t && t.stopImmediatePropagation && t.stopImmediatePropagation(), this.stopPropagation()
                    }
                }, f.each({
                    mouseenter: "mouseover",
                    mouseleave: "mouseout",
                    pointerenter: "pointerover",
                    pointerleave: "pointerout"
                }, (function(t, e) {
                    f.event.special[t] = {
                        delegateType: e,
                        bindType: e,
                        handle: function(t) {
                            var n, i = t.relatedTarget,
                                o = t.handleObj;
                            return i && (i === this || f.contains(this, i)) || (t.type = o.origType, n = o.handler.apply(this, arguments), t.type = e), n
                        }
                    }
                })), h.focusinBubbles || f.each({
                    focus: "focusin",
                    blur: "focusout"
                }, (function(t, e) {
                    var n = function(t) {
                        f.event.simulate(e, t.target, f.event.fix(t), !0)
                    };
                    f.event.special[e] = {
                        setup: function() {
                            var i = this.ownerDocument || this,
                                o = j.access(i, e);
                            o || i.addEventListener(t, n, !0), j.access(i, e, (o || 0) + 1)
                        },
                        teardown: function() {
                            var i = this.ownerDocument || this,
                                o = j.access(i, e) - 1;
                            o ? j.access(i, e, o) : (i.removeEventListener(t, n, !0), j.remove(i, e))
                        }
                    }
                })), f.fn.extend({
                    on: function(t, e, n, i, o) {
                        var r, s;
                        if ("object" == typeof t) {
                            for (s in "string" != typeof e && (n = n || e, e = void 0), t) this.on(s, e, n, t[s], o);
                            return this
                        }
                        if (null == n && null == i ? (i = e, n = e = void 0) : null == i && ("string" == typeof e ? (i = n, n = void 0) : (i = n, n = e, e = void 0)), !1 === i) i = et;
                        else if (!i) return this;
                        return 1 === o && (r = i, i = function(t) {
                            return f().off(t), r.apply(this, arguments)
                        }, i.guid = r.guid || (r.guid = f.guid++)), this.each((function() {
                            f.event.add(this, t, i, n, e)
                        }))
                    },
                    one: function(t, e, n, i) {
                        return this.on(t, e, n, i, 1)
                    },
                    off: function(t, e, n) {
                        var i, o;
                        if (t && t.preventDefault && t.handleObj) return i = t.handleObj, f(t.delegateTarget).off(i.namespace ? i.origType + "." + i.namespace : i.origType, i.selector, i.handler), this;
                        if ("object" == typeof t) {
                            for (o in t) this.off(o, e, t[o]);
                            return this
                        }
                        return !1 !== e && "function" != typeof e || (n = e, e = void 0), !1 === n && (n = et), this.each((function() {
                            f.event.remove(this, t, n, e)
                        }))
                    },
                    trigger: function(t, e) {
                        return this.each((function() {
                            f.event.trigger(t, e, this)
                        }))
                    },
                    triggerHandler: function(t, e) {
                        var n = this[0];
                        if (n) return f.event.trigger(t, e, n, !0)
                    }
                });
                var it = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
                    ot = /<([\w:]+)/,
                    rt = /<|&#?\w+;/,
                    st = /<(?:script|style|link)/i,
                    at = /checked\s*(?:[^=]|=\s*.checked.)/i,
                    lt = /^$|\/(?:java|ecma)script/i,
                    dt = /^true\/(.*)/,
                    ct = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,
                    ut = {
                        option: [1, "<select multiple='multiple'>", "</select>"],
                        thead: [1, "<table>", "</table>"],
                        col: [2, "<table><colgroup>", "</colgroup></table>"],
                        tr: [2, "<table><tbody>", "</tbody></table>"],
                        td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
                        _default: [0, "", ""]
                    };

                function pt(t, e) {
                    return f.nodeName(t, "table") && f.nodeName(11 !== e.nodeType ? e : e.firstChild, "tr") ? t.getElementsByTagName("tbody")[0] || t.appendChild(t.ownerDocument.createElement("tbody")) : t
                }

                function ht(t) {
                    return t.type = (null !== t.getAttribute("type")) + "/" + t.type, t
                }

                function mt(t) {
                    var e = dt.exec(t.type);
                    return e ? t.type = e[1] : t.removeAttribute("type"), t
                }

                function gt(t, e) {
                    for (var n = 0, i = t.length; n < i; n++) j.set(t[n], "globalEval", !e || j.get(e[n], "globalEval"))
                }

                function ft(t, e) {
                    var n, i, o, r, s, a, l, d;
                    if (1 === e.nodeType) {
                        if (j.hasData(t) && (r = j.access(t), s = j.set(e, r), d = r.events))
                            for (o in delete s.handle, s.events = {}, d)
                                for (n = 0, i = d[o].length; n < i; n++) f.event.add(e, o, d[o][n]);
                        H.hasData(t) && (a = H.access(t), l = f.extend({}, a), H.set(e, l))
                    }
                }

                function bt(t, e) {
                    var n = t.getElementsByTagName ? t.getElementsByTagName(e || "*") : t.querySelectorAll ? t.querySelectorAll(e || "*") : [];
                    return void 0 === e || e && f.nodeName(t, e) ? f.merge([t], n) : n
                }
                ut.optgroup = ut.option, ut.tbody = ut.tfoot = ut.colgroup = ut.caption = ut.thead, ut.th = ut.td, f.extend({
                    clone: function(t, e, n) {
                        var i, o, r, s, a, l, d, c = t.cloneNode(!0),
                            u = f.contains(t.ownerDocument, t);
                        if (!(h.noCloneChecked || 1 !== t.nodeType && 11 !== t.nodeType || f.isXMLDoc(t)))
                            for (s = bt(c), i = 0, o = (r = bt(t)).length; i < o; i++) a = r[i], l = s[i], d = void 0, "input" === (d = l.nodeName.toLowerCase()) && Q.test(a.type) ? l.checked = a.checked : "input" !== d && "textarea" !== d || (l.defaultValue = a.defaultValue);
                        if (e)
                            if (n)
                                for (r = r || bt(t), s = s || bt(c), i = 0, o = r.length; i < o; i++) ft(r[i], s[i]);
                            else ft(t, c);
                        return (s = bt(c, "script")).length > 0 && gt(s, !u && bt(t, "script")), c
                    },
                    buildFragment: function(t, e, n, i) {
                        for (var o, r, s, a, l, d, c = e.createDocumentFragment(), u = [], p = 0, h = t.length; p < h; p++)
                            if ((o = t[p]) || 0 === o)
                                if ("object" === f.type(o)) f.merge(u, o.nodeType ? [o] : o);
                                else if (rt.test(o)) {
                            for (r = r || c.appendChild(e.createElement("div")), s = (ot.exec(o) || ["", ""])[1].toLowerCase(), a = ut[s] || ut._default, r.innerHTML = a[1] + o.replace(it, "<$1></$2>") + a[2], d = a[0]; d--;) r = r.lastChild;
                            f.merge(u, r.childNodes), (r = c.firstChild).textContent = ""
                        } else u.push(e.createTextNode(o));
                        for (c.textContent = "", p = 0; o = u[p++];)
                            if ((!i || -1 === f.inArray(o, i)) && (l = f.contains(o.ownerDocument, o), r = bt(c.appendChild(o), "script"), l && gt(r), n))
                                for (d = 0; o = r[d++];) lt.test(o.type || "") && n.push(o);
                        return c
                    },
                    cleanData: function(t) {
                        for (var e, n, i, o, r = f.event.special, s = 0; void 0 !== (n = t[s]); s++) {
                            if (f.acceptData(n) && (o = n[j.expando]) && (e = j.cache[o])) {
                                if (e.events)
                                    for (i in e.events) r[i] ? f.event.remove(n, i) : f.removeEvent(n, i, e.handle);
                                j.cache[o] && delete j.cache[o]
                            }
                            delete H.cache[n[H.expando]]
                        }
                    }
                }), f.fn.extend({
                    text: function(t) {
                        return I(this, (function(t) {
                            return void 0 === t ? f.text(this) : this.empty().each((function() {
                                1 !== this.nodeType && 11 !== this.nodeType && 9 !== this.nodeType || (this.textContent = t)
                            }))
                        }), null, t, arguments.length)
                    },
                    append: function() {
                        return this.domManip(arguments, (function(t) {
                            1 !== this.nodeType && 11 !== this.nodeType && 9 !== this.nodeType || pt(this, t).appendChild(t)
                        }))
                    },
                    prepend: function() {
                        return this.domManip(arguments, (function(t) {
                            if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                                var e = pt(this, t);
                                e.insertBefore(t, e.firstChild)
                            }
                        }))
                    },
                    before: function() {
                        return this.domManip(arguments, (function(t) {
                            this.parentNode && this.parentNode.insertBefore(t, this)
                        }))
                    },
                    after: function() {
                        return this.domManip(arguments, (function(t) {
                            this.parentNode && this.parentNode.insertBefore(t, this.nextSibling)
                        }))
                    },
                    remove: function(t, e) {
                        for (var n, i = t ? f.filter(t, this) : this, o = 0; null != (n = i[o]); o++) e || 1 !== n.nodeType || f.cleanData(bt(n)), n.parentNode && (e && f.contains(n.ownerDocument, n) && gt(bt(n, "script")), n.parentNode.removeChild(n));
                        return this
                    },
                    empty: function() {
                        for (var t, e = 0; null != (t = this[e]); e++) 1 === t.nodeType && (f.cleanData(bt(t, !1)), t.textContent = "");
                        return this
                    },
                    clone: function(t, e) {
                        return t = null != t && t, e = null == e ? t : e, this.map((function() {
                            return f.clone(this, t, e)
                        }))
                    },
                    html: function(t) {
                        return I(this, (function(t) {
                            var e = this[0] || {},
                                n = 0,
                                i = this.length;
                            if (void 0 === t && 1 === e.nodeType) return e.innerHTML;
                            if ("string" == typeof t && !st.test(t) && !ut[(ot.exec(t) || ["", ""])[1].toLowerCase()]) {
                                t = t.replace(it, "<$1></$2>");
                                try {
                                    for (; n < i; n++) 1 === (e = this[n] || {}).nodeType && (f.cleanData(bt(e, !1)), e.innerHTML = t);
                                    e = 0
                                } catch (t) {}
                            }
                            e && this.empty().append(t)
                        }), null, t, arguments.length)
                    },
                    replaceWith: function() {
                        var t = arguments[0];
                        return this.domManip(arguments, (function(e) {
                            t = this.parentNode, f.cleanData(bt(this)), t && t.replaceChild(e, this)
                        })), t && (t.length || t.nodeType) ? this : this.remove()
                    },
                    detach: function(t) {
                        return this.remove(t, !0)
                    },
                    domManip: function(t, e) {
                        t = a.apply([], t);
                        var n, i, o, r, s, l, d = 0,
                            c = this.length,
                            u = this,
                            p = c - 1,
                            m = t[0],
                            g = f.isFunction(m);
                        if (g || c > 1 && "string" == typeof m && !h.checkClone && at.test(m)) return this.each((function(n) {
                            var i = u.eq(n);
                            g && (t[0] = m.call(this, n, i.html())), i.domManip(t, e)
                        }));
                        if (c && (i = (n = f.buildFragment(t, this[0].ownerDocument, !1, this)).firstChild, 1 === n.childNodes.length && (n = i), i)) {
                            for (r = (o = f.map(bt(n, "script"), ht)).length; d < c; d++) s = n, d !== p && (s = f.clone(s, !0, !0), r && f.merge(o, bt(s, "script"))), e.call(this[d], s, d);
                            if (r)
                                for (l = o[o.length - 1].ownerDocument, f.map(o, mt), d = 0; d < r; d++) s = o[d], lt.test(s.type || "") && !j.access(s, "globalEval") && f.contains(l, s) && (s.src ? f._evalUrl && f._evalUrl(s.src) : f.globalEval(s.textContent.replace(ct, "")))
                        }
                        return this
                    }
                }), f.each({
                    appendTo: "append",
                    prependTo: "prepend",
                    insertBefore: "before",
                    insertAfter: "after",
                    replaceAll: "replaceWith"
                }, (function(t, e) {
                    f.fn[t] = function(t) {
                        for (var n, i = [], o = f(t), r = o.length - 1, s = 0; s <= r; s++) n = s === r ? this : this.clone(!0), f(o[s])[e](n), l.apply(i, n.get());
                        return this.pushStack(i)
                    }
                }));
                var At, vt = {};

                function yt(t, e) {
                    var n, o = f(e.createElement(t)).appendTo(e.body),
                        r = i.getDefaultComputedStyle && (n = i.getDefaultComputedStyle(o[0])) ? n.display : f.css(o[0], "display");
                    return o.detach(), r
                }

                function wt(t) {
                    var e = m,
                        n = vt[t];
                    return n || ("none" !== (n = yt(t, e)) && n || ((e = (At = (At || f("<iframe frameborder='0' width='0' height='0'/>")).appendTo(e.documentElement))[0].contentDocument).write(), e.close(), n = yt(t, e), At.detach()), vt[t] = n), n
                }
                var kt = /^margin/,
                    xt = new RegExp("^(" + V + ")(?!px)[a-z%]+$", "i"),
                    Ct = function(t) {
                        return t.ownerDocument.defaultView.opener ? t.ownerDocument.defaultView.getComputedStyle(t, null) : i.getComputedStyle(t, null)
                    };

                function Et(t, e, n) {
                    var i, o, r, s, a = t.style;
                    return (n = n || Ct(t)) && (s = n.getPropertyValue(e) || n[e]), n && ("" !== s || f.contains(t.ownerDocument, t) || (s = f.style(t, e)), xt.test(s) && kt.test(e) && (i = a.width, o = a.minWidth, r = a.maxWidth, a.minWidth = a.maxWidth = a.width = s, s = n.width, a.width = i, a.minWidth = o, a.maxWidth = r)), void 0 !== s ? s + "" : s
                }

                function _t(t, e) {
                    return {
                        get: function() {
                            if (!t()) return (this.get = e).apply(this, arguments);
                            delete this.get
                        }
                    }
                }! function() {
                    var t, e, n = m.documentElement,
                        o = m.createElement("div"),
                        r = m.createElement("div");

                    function s() {
                        r.style.cssText = "-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;display:block;margin-top:1%;top:1%;border:1px;padding:1px;width:4px;position:absolute", r.innerHTML = "", n.appendChild(o);
                        var s = i.getComputedStyle(r, null);
                        t = "1%" !== s.top, e = "4px" === s.width, n.removeChild(o)
                    }
                    r.style && (r.style.backgroundClip = "content-box", r.cloneNode(!0).style.backgroundClip = "", h.clearCloneStyle = "content-box" === r.style.backgroundClip, o.style.cssText = "border:0;width:0;height:0;top:0;left:-9999px;margin-top:1px;position:absolute", o.appendChild(r), i.getComputedStyle && f.extend(h, {
                        pixelPosition: function() {
                            return s(), t
                        },
                        boxSizingReliable: function() {
                            return null == e && s(), e
                        },
                        reliableMarginRight: function() {
                            var t, e = r.appendChild(m.createElement("div"));
                            return e.style.cssText = r.style.cssText = "-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:0", e.style.marginRight = e.style.width = "0", r.style.width = "1px", n.appendChild(o), t = !parseFloat(i.getComputedStyle(e, null).marginRight), n.removeChild(o), r.removeChild(e), t
                        }
                    }))
                }(), f.swap = function(t, e, n, i) {
                    var o, r, s = {};
                    for (r in e) s[r] = t.style[r], t.style[r] = e[r];
                    for (r in o = n.apply(t, i || []), e) t.style[r] = s[r];
                    return o
                };
                var St = /^(none|table(?!-c[ea]).+)/,
                    Mt = new RegExp("^(" + V + ")(.*)$", "i"),
                    Tt = new RegExp("^([+-])=(" + V + ")", "i"),
                    Lt = {
                        position: "absolute",
                        visibility: "hidden",
                        display: "block"
                    },
                    Bt = {
                        letterSpacing: "0",
                        fontWeight: "400"
                    },
                    Nt = ["Webkit", "O", "Moz", "ms"];

                function Ot(t, e) {
                    if (e in t) return e;
                    for (var n = e[0].toUpperCase() + e.slice(1), i = e, o = Nt.length; o--;)
                        if ((e = Nt[o] + n) in t) return e;
                    return i
                }

                function Dt(t, e, n) {
                    var i = Mt.exec(e);
                    return i ? Math.max(0, i[1] - (n || 0)) + (i[2] || "px") : e
                }

                function Pt(t, e, n, i, o) {
                    for (var r = n === (i ? "border" : "content") ? 4 : "width" === e ? 1 : 0, s = 0; r < 4; r += 2) "margin" === n && (s += f.css(t, n + Y[r], !0, o)), i ? ("content" === n && (s -= f.css(t, "padding" + Y[r], !0, o)), "margin" !== n && (s -= f.css(t, "border" + Y[r] + "Width", !0, o))) : (s += f.css(t, "padding" + Y[r], !0, o), "padding" !== n && (s += f.css(t, "border" + Y[r] + "Width", !0, o)));
                    return s
                }

                function It(t, e, n) {
                    var i = !0,
                        o = "width" === e ? t.offsetWidth : t.offsetHeight,
                        r = Ct(t),
                        s = "border-box" === f.css(t, "boxSizing", !1, r);
                    if (o <= 0 || null == o) {
                        if (((o = Et(t, e, r)) < 0 || null == o) && (o = t.style[e]), xt.test(o)) return o;
                        i = s && (h.boxSizingReliable() || o === t.style[e]), o = parseFloat(o) || 0
                    }
                    return o + Pt(t, e, n || (s ? "border" : "content"), i, r) + "px"
                }

                function Rt(t, e) {
                    for (var n, i, o, r = [], s = 0, a = t.length; s < a; s++)(i = t[s]).style && (r[s] = j.get(i, "olddisplay"), n = i.style.display, e ? (r[s] || "none" !== n || (i.style.display = ""), "" === i.style.display && U(i) && (r[s] = j.access(i, "olddisplay", wt(i.nodeName)))) : (o = U(i), "none" === n && o || j.set(i, "olddisplay", o ? n : f.css(i, "display"))));
                    for (s = 0; s < a; s++)(i = t[s]).style && (e && "none" !== i.style.display && "" !== i.style.display || (i.style.display = e ? r[s] || "" : "none"));
                    return t
                }

                function jt(t, e, n, i, o) {
                    return new jt.prototype.init(t, e, n, i, o)
                }
                f.extend({
                    cssHooks: {
                        opacity: {
                            get: function(t, e) {
                                if (e) {
                                    var n = Et(t, "opacity");
                                    return "" === n ? "1" : n
                                }
                            }
                        }
                    },
                    cssNumber: {
                        columnCount: !0,
                        fillOpacity: !0,
                        flexGrow: !0,
                        flexShrink: !0,
                        fontWeight: !0,
                        lineHeight: !0,
                        opacity: !0,
                        order: !0,
                        orphans: !0,
                        widows: !0,
                        zIndex: !0,
                        zoom: !0
                    },
                    cssProps: {
                        float: "cssFloat"
                    },
                    style: function(t, e, n, i) {
                        if (t && 3 !== t.nodeType && 8 !== t.nodeType && t.style) {
                            var o, r, s, a = f.camelCase(e),
                                l = t.style;
                            if (e = f.cssProps[a] || (f.cssProps[a] = Ot(l, a)), s = f.cssHooks[e] || f.cssHooks[a], void 0 === n) return s && "get" in s && void 0 !== (o = s.get(t, !1, i)) ? o : l[e];
                            "string" == (r = typeof n) && (o = Tt.exec(n)) && (n = (o[1] + 1) * o[2] + parseFloat(f.css(t, e)), r = "number"), null != n && n == n && ("number" !== r || f.cssNumber[a] || (n += "px"), h.clearCloneStyle || "" !== n || 0 !== e.indexOf("background") || (l[e] = "inherit"), s && "set" in s && void 0 === (n = s.set(t, n, i)) || (l[e] = n))
                        }
                    },
                    css: function(t, e, n, i) {
                        var o, r, s, a = f.camelCase(e);
                        return e = f.cssProps[a] || (f.cssProps[a] = Ot(t.style, a)), (s = f.cssHooks[e] || f.cssHooks[a]) && "get" in s && (o = s.get(t, !0, n)), void 0 === o && (o = Et(t, e, i)), "normal" === o && e in Bt && (o = Bt[e]), "" === n || n ? (r = parseFloat(o), !0 === n || f.isNumeric(r) ? r || 0 : o) : o
                    }
                }), f.each(["height", "width"], (function(t, e) {
                    f.cssHooks[e] = {
                        get: function(t, n, i) {
                            if (n) return St.test(f.css(t, "display")) && 0 === t.offsetWidth ? f.swap(t, Lt, (function() {
                                return It(t, e, i)
                            })) : It(t, e, i)
                        },
                        set: function(t, n, i) {
                            var o = i && Ct(t);
                            return Dt(0, n, i ? Pt(t, e, i, "border-box" === f.css(t, "boxSizing", !1, o), o) : 0)
                        }
                    }
                })), f.cssHooks.marginRight = _t(h.reliableMarginRight, (function(t, e) {
                    if (e) return f.swap(t, {
                        display: "inline-block"
                    }, Et, [t, "marginRight"])
                })), f.each({
                    margin: "",
                    padding: "",
                    border: "Width"
                }, (function(t, e) {
                    f.cssHooks[t + e] = {
                        expand: function(n) {
                            for (var i = 0, o = {}, r = "string" == typeof n ? n.split(" ") : [n]; i < 4; i++) o[t + Y[i] + e] = r[i] || r[i - 2] || r[0];
                            return o
                        }
                    }, kt.test(t) || (f.cssHooks[t + e].set = Dt)
                })), f.fn.extend({
                    css: function(t, e) {
                        return I(this, (function(t, e, n) {
                            var i, o, r = {},
                                s = 0;
                            if (f.isArray(e)) {
                                for (i = Ct(t), o = e.length; s < o; s++) r[e[s]] = f.css(t, e[s], !1, i);
                                return r
                            }
                            return void 0 !== n ? f.style(t, e, n) : f.css(t, e)
                        }), t, e, arguments.length > 1)
                    },
                    show: function() {
                        return Rt(this, !0)
                    },
                    hide: function() {
                        return Rt(this)
                    },
                    toggle: function(t) {
                        return "boolean" == typeof t ? t ? this.show() : this.hide() : this.each((function() {
                            U(this) ? f(this).show() : f(this).hide()
                        }))
                    }
                }), f.Tween = jt, jt.prototype = {
                    constructor: jt,
                    init: function(t, e, n, i, o, r) {
                        this.elem = t, this.prop = n, this.easing = o || "swing", this.options = e, this.start = this.now = this.cur(), this.end = i, this.unit = r || (f.cssNumber[n] ? "" : "px")
                    },
                    cur: function() {
                        var t = jt.propHooks[this.prop];
                        return t && t.get ? t.get(this) : jt.propHooks._default.get(this)
                    },
                    run: function(t) {
                        var e, n = jt.propHooks[this.prop];
                        return this.options.duration ? this.pos = e = f.easing[this.easing](t, this.options.duration * t, 0, 1, this.options.duration) : this.pos = e = t, this.now = (this.end - this.start) * e + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), n && n.set ? n.set(this) : jt.propHooks._default.set(this), this
                    }
                }, jt.prototype.init.prototype = jt.prototype, jt.propHooks = {
                    _default: {
                        get: function(t) {
                            var e;
                            return null == t.elem[t.prop] || t.elem.style && null != t.elem.style[t.prop] ? (e = f.css(t.elem, t.prop, "")) && "auto" !== e ? e : 0 : t.elem[t.prop]
                        },
                        set: function(t) {
                            f.fx.step[t.prop] ? f.fx.step[t.prop](t) : t.elem.style && (null != t.elem.style[f.cssProps[t.prop]] || f.cssHooks[t.prop]) ? f.style(t.elem, t.prop, t.now + t.unit) : t.elem[t.prop] = t.now
                        }
                    }
                }, jt.propHooks.scrollTop = jt.propHooks.scrollLeft = {
                    set: function(t) {
                        t.elem.nodeType && t.elem.parentNode && (t.elem[t.prop] = t.now)
                    }
                }, f.easing = {
                    linear: function(t) {
                        return t
                    },
                    swing: function(t) {
                        return .5 - Math.cos(t * Math.PI) / 2
                    }
                }, f.fx = jt.prototype.init, f.fx.step = {};
                var Ht, zt, Wt = /^(?:toggle|show|hide)$/,
                    Ft = new RegExp("^(?:([+-])=|)(" + V + ")([a-z%]*)$", "i"),
                    qt = /queueHooks$/,
                    Xt = [function(t, e, n) {
                        var i, o, r, s, a, l, d, c = this,
                            u = {},
                            p = t.style,
                            h = t.nodeType && U(t),
                            m = j.get(t, "fxshow");
                        for (i in n.queue || (null == (a = f._queueHooks(t, "fx")).unqueued && (a.unqueued = 0, l = a.empty.fire, a.empty.fire = function() {
                                a.unqueued || l()
                            }), a.unqueued++, c.always((function() {
                                c.always((function() {
                                    a.unqueued--, f.queue(t, "fx").length || a.empty.fire()
                                }))
                            }))), 1 === t.nodeType && ("height" in e || "width" in e) && (n.overflow = [p.overflow, p.overflowX, p.overflowY], "inline" === ("none" === (d = f.css(t, "display")) ? j.get(t, "olddisplay") || wt(t.nodeName) : d) && "none" === f.css(t, "float") && (p.display = "inline-block")), n.overflow && (p.overflow = "hidden", c.always((function() {
                                p.overflow = n.overflow[0], p.overflowX = n.overflow[1], p.overflowY = n.overflow[2]
                            }))), e)
                            if (o = e[i], Wt.exec(o)) {
                                if (delete e[i], r = r || "toggle" === o, o === (h ? "hide" : "show")) {
                                    if ("show" !== o || !m || void 0 === m[i]) continue;
                                    h = !0
                                }
                                u[i] = m && m[i] || f.style(t, i)
                            } else d = void 0;
                        if (f.isEmptyObject(u)) "inline" === ("none" === d ? wt(t.nodeName) : d) && (p.display = d);
                        else
                            for (i in m ? "hidden" in m && (h = m.hidden) : m = j.access(t, "fxshow", {}), r && (m.hidden = !h), h ? f(t).show() : c.done((function() {
                                    f(t).hide()
                                })), c.done((function() {
                                    var e;
                                    for (e in j.remove(t, "fxshow"), u) f.style(t, e, u[e])
                                })), u) s = Qt(h ? m[i] : 0, i, c), i in m || (m[i] = s.start, h && (s.end = s.start, s.start = "width" === i || "height" === i ? 1 : 0))
                    }],
                    Vt = {
                        "*": [function(t, e) {
                            var n = this.createTween(t, e),
                                i = n.cur(),
                                o = Ft.exec(e),
                                r = o && o[3] || (f.cssNumber[t] ? "" : "px"),
                                s = (f.cssNumber[t] || "px" !== r && +i) && Ft.exec(f.css(n.elem, t)),
                                a = 1,
                                l = 20;
                            if (s && s[3] !== r) {
                                r = r || s[3], o = o || [], s = +i || 1;
                                do {
                                    s /= a = a || ".5", f.style(n.elem, t, s + r)
                                } while (a !== (a = n.cur() / i) && 1 !== a && --l)
                            }
                            return o && (s = n.start = +s || +i || 0, n.unit = r, n.end = o[1] ? s + (o[1] + 1) * o[2] : +o[2]), n
                        }]
                    };

                function Yt() {
                    return setTimeout((function() {
                        Ht = void 0
                    })), Ht = f.now()
                }

                function Ut(t, e) {
                    var n, i = 0,
                        o = {
                            height: t
                        };
                    for (e = e ? 1 : 0; i < 4; i += 2 - e) o["margin" + (n = Y[i])] = o["padding" + n] = t;
                    return e && (o.opacity = o.width = t), o
                }

                function Qt(t, e, n) {
                    for (var i, o = (Vt[e] || []).concat(Vt["*"]), r = 0, s = o.length; r < s; r++)
                        if (i = o[r].call(n, e, t)) return i
                }

                function Gt(t, e, n) {
                    var i, o, r = 0,
                        s = Xt.length,
                        a = f.Deferred().always((function() {
                            delete l.elem
                        })),
                        l = function() {
                            if (o) return !1;
                            for (var e = Ht || Yt(), n = Math.max(0, d.startTime + d.duration - e), i = 1 - (n / d.duration || 0), r = 0, s = d.tweens.length; r < s; r++) d.tweens[r].run(i);
                            return a.notifyWith(t, [d, i, n]), i < 1 && s ? n : (a.resolveWith(t, [d]), !1)
                        },
                        d = a.promise({
                            elem: t,
                            props: f.extend({}, e),
                            opts: f.extend(!0, {
                                specialEasing: {}
                            }, n),
                            originalProperties: e,
                            originalOptions: n,
                            startTime: Ht || Yt(),
                            duration: n.duration,
                            tweens: [],
                            createTween: function(e, n) {
                                var i = f.Tween(t, d.opts, e, n, d.opts.specialEasing[e] || d.opts.easing);
                                return d.tweens.push(i), i
                            },
                            stop: function(e) {
                                var n = 0,
                                    i = e ? d.tweens.length : 0;
                                if (o) return this;
                                for (o = !0; n < i; n++) d.tweens[n].run(1);
                                return e ? a.resolveWith(t, [d, e]) : a.rejectWith(t, [d, e]), this
                            }
                        }),
                        c = d.props;
                    for (function(t, e) {
                            var n, i, o, r, s;
                            for (n in t)
                                if (o = e[i = f.camelCase(n)], r = t[n], f.isArray(r) && (o = r[1], r = t[n] = r[0]), n !== i && (t[i] = r, delete t[n]), (s = f.cssHooks[i]) && "expand" in s)
                                    for (n in r = s.expand(r), delete t[i], r) n in t || (t[n] = r[n], e[n] = o);
                                else e[i] = o
                        }(c, d.opts.specialEasing); r < s; r++)
                        if (i = Xt[r].call(d, t, c, d.opts)) return i;
                    return f.map(c, Qt, d), f.isFunction(d.opts.start) && d.opts.start.call(t, d), f.fx.timer(f.extend(l, {
                        elem: t,
                        anim: d,
                        queue: d.opts.queue
                    })), d.progress(d.opts.progress).done(d.opts.done, d.opts.complete).fail(d.opts.fail).always(d.opts.always)
                }
                f.Animation = f.extend(Gt, {
                        tweener: function(t, e) {
                            f.isFunction(t) ? (e = t, t = ["*"]) : t = t.split(" ");
                            for (var n, i = 0, o = t.length; i < o; i++) n = t[i], Vt[n] = Vt[n] || [], Vt[n].unshift(e)
                        },
                        prefilter: function(t, e) {
                            e ? Xt.unshift(t) : Xt.push(t)
                        }
                    }), f.speed = function(t, e, n) {
                        var i = t && "object" == typeof t ? f.extend({}, t) : {
                            complete: n || !n && e || f.isFunction(t) && t,
                            duration: t,
                            easing: n && e || e && !f.isFunction(e) && e
                        };
                        return i.duration = f.fx.off ? 0 : "number" == typeof i.duration ? i.duration : i.duration in f.fx.speeds ? f.fx.speeds[i.duration] : f.fx.speeds._default, null != i.queue && !0 !== i.queue || (i.queue = "fx"), i.old = i.complete, i.complete = function() {
                            f.isFunction(i.old) && i.old.call(this), i.queue && f.dequeue(this, i.queue)
                        }, i
                    }, f.fn.extend({
                        fadeTo: function(t, e, n, i) {
                            return this.filter(U).css("opacity", 0).show().end().animate({
                                opacity: e
                            }, t, n, i)
                        },
                        animate: function(t, e, n, i) {
                            var o = f.isEmptyObject(t),
                                r = f.speed(e, n, i),
                                s = function() {
                                    var e = Gt(this, f.extend({}, t), r);
                                    (o || j.get(this, "finish")) && e.stop(!0)
                                };
                            return s.finish = s, o || !1 === r.queue ? this.each(s) : this.queue(r.queue, s)
                        },
                        stop: function(t, e, n) {
                            var i = function(t) {
                                var e = t.stop;
                                delete t.stop, e(n)
                            };
                            return "string" != typeof t && (n = e, e = t, t = void 0), e && !1 !== t && this.queue(t || "fx", []), this.each((function() {
                                var e = !0,
                                    o = null != t && t + "queueHooks",
                                    r = f.timers,
                                    s = j.get(this);
                                if (o) s[o] && s[o].stop && i(s[o]);
                                else
                                    for (o in s) s[o] && s[o].stop && qt.test(o) && i(s[o]);
                                for (o = r.length; o--;) r[o].elem !== this || null != t && r[o].queue !== t || (r[o].anim.stop(n), e = !1, r.splice(o, 1));
                                !e && n || f.dequeue(this, t)
                            }))
                        },
                        finish: function(t) {
                            return !1 !== t && (t = t || "fx"), this.each((function() {
                                var e, n = j.get(this),
                                    i = n[t + "queue"],
                                    o = n[t + "queueHooks"],
                                    r = f.timers,
                                    s = i ? i.length : 0;
                                for (n.finish = !0, f.queue(this, t, []), o && o.stop && o.stop.call(this, !0), e = r.length; e--;) r[e].elem === this && r[e].queue === t && (r[e].anim.stop(!0), r.splice(e, 1));
                                for (e = 0; e < s; e++) i[e] && i[e].finish && i[e].finish.call(this);
                                delete n.finish
                            }))
                        }
                    }), f.each(["toggle", "show", "hide"], (function(t, e) {
                        var n = f.fn[e];
                        f.fn[e] = function(t, i, o) {
                            return null == t || "boolean" == typeof t ? n.apply(this, arguments) : this.animate(Ut(e, !0), t, i, o)
                        }
                    })), f.each({
                        slideDown: Ut("show"),
                        slideUp: Ut("hide"),
                        slideToggle: Ut("toggle"),
                        fadeIn: {
                            opacity: "show"
                        },
                        fadeOut: {
                            opacity: "hide"
                        },
                        fadeToggle: {
                            opacity: "toggle"
                        }
                    }, (function(t, e) {
                        f.fn[t] = function(t, n, i) {
                            return this.animate(e, t, n, i)
                        }
                    })), f.timers = [], f.fx.tick = function() {
                        var t, e = 0,
                            n = f.timers;
                        for (Ht = f.now(); e < n.length; e++)(t = n[e])() || n[e] !== t || n.splice(e--, 1);
                        n.length || f.fx.stop(), Ht = void 0
                    }, f.fx.timer = function(t) {
                        f.timers.push(t), t() ? f.fx.start() : f.timers.pop()
                    }, f.fx.interval = 13, f.fx.start = function() {
                        zt || (zt = setInterval(f.fx.tick, f.fx.interval))
                    }, f.fx.stop = function() {
                        clearInterval(zt), zt = null
                    }, f.fx.speeds = {
                        slow: 600,
                        fast: 200,
                        _default: 400
                    }, f.fn.delay = function(t, e) {
                        return t = f.fx && f.fx.speeds[t] || t, e = e || "fx", this.queue(e, (function(e, n) {
                            var i = setTimeout(e, t);
                            n.stop = function() {
                                clearTimeout(i)
                            }
                        }))
                    },
                    function() {
                        var t = m.createElement("input"),
                            e = m.createElement("select"),
                            n = e.appendChild(m.createElement("option"));
                        t.type = "checkbox", h.checkOn = "" !== t.value, h.optSelected = n.selected, e.disabled = !0, h.optDisabled = !n.disabled, (t = m.createElement("input")).value = "t", t.type = "radio", h.radioValue = "t" === t.value
                    }();
                var Zt, Jt = f.expr.attrHandle;
                f.fn.extend({
                    attr: function(t, e) {
                        return I(this, f.attr, t, e, arguments.length > 1)
                    },
                    removeAttr: function(t) {
                        return this.each((function() {
                            f.removeAttr(this, t)
                        }))
                    }
                }), f.extend({
                    attr: function(t, e, n) {
                        var i, o, r = t.nodeType;
                        if (t && 3 !== r && 8 !== r && 2 !== r) return typeof t.getAttribute === G ? f.prop(t, e, n) : (1 === r && f.isXMLDoc(t) || (e = e.toLowerCase(), i = f.attrHooks[e] || (f.expr.match.bool.test(e) ? Zt : void 0)), void 0 === n ? i && "get" in i && null !== (o = i.get(t, e)) ? o : null == (o = f.find.attr(t, e)) ? void 0 : o : null !== n ? i && "set" in i && void 0 !== (o = i.set(t, n, e)) ? o : (t.setAttribute(e, n + ""), n) : void f.removeAttr(t, e))
                    },
                    removeAttr: function(t, e) {
                        var n, i, o = 0,
                            r = e && e.match(O);
                        if (r && 1 === t.nodeType)
                            for (; n = r[o++];) i = f.propFix[n] || n, f.expr.match.bool.test(n) && (t[i] = !1), t.removeAttribute(n)
                    },
                    attrHooks: {
                        type: {
                            set: function(t, e) {
                                if (!h.radioValue && "radio" === e && f.nodeName(t, "input")) {
                                    var n = t.value;
                                    return t.setAttribute("type", e), n && (t.value = n), e
                                }
                            }
                        }
                    }
                }), Zt = {
                    set: function(t, e, n) {
                        return !1 === e ? f.removeAttr(t, n) : t.setAttribute(n, n), n
                    }
                }, f.each(f.expr.match.bool.source.match(/\w+/g), (function(t, e) {
                    var n = Jt[e] || f.find.attr;
                    Jt[e] = function(t, e, i) {
                        var o, r;
                        return i || (r = Jt[e], Jt[e] = o, o = null != n(t, e, i) ? e.toLowerCase() : null, Jt[e] = r), o
                    }
                }));
                var $t = /^(?:input|select|textarea|button)$/i;
                f.fn.extend({
                    prop: function(t, e) {
                        return I(this, f.prop, t, e, arguments.length > 1)
                    },
                    removeProp: function(t) {
                        return this.each((function() {
                            delete this[f.propFix[t] || t]
                        }))
                    }
                }), f.extend({
                    propFix: {
                        for: "htmlFor",
                        class: "className"
                    },
                    prop: function(t, e, n) {
                        var i, o, r = t.nodeType;
                        if (t && 3 !== r && 8 !== r && 2 !== r) return (1 !== r || !f.isXMLDoc(t)) && (e = f.propFix[e] || e, o = f.propHooks[e]), void 0 !== n ? o && "set" in o && void 0 !== (i = o.set(t, n, e)) ? i : t[e] = n : o && "get" in o && null !== (i = o.get(t, e)) ? i : t[e]
                    },
                    propHooks: {
                        tabIndex: {
                            get: function(t) {
                                return t.hasAttribute("tabindex") || $t.test(t.nodeName) || t.href ? t.tabIndex : -1
                            }
                        }
                    }
                }), h.optSelected || (f.propHooks.selected = {
                    get: function(t) {
                        var e = t.parentNode;
                        return e && e.parentNode && e.parentNode.selectedIndex, null
                    }
                }), f.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], (function() {
                    f.propFix[this.toLowerCase()] = this
                }));
                var Kt = /[\t\r\n\f]/g;
                f.fn.extend({
                    addClass: function(t) {
                        var e, n, i, o, r, s, a = "string" == typeof t && t,
                            l = 0,
                            d = this.length;
                        if (f.isFunction(t)) return this.each((function(e) {
                            f(this).addClass(t.call(this, e, this.className))
                        }));
                        if (a)
                            for (e = (t || "").match(O) || []; l < d; l++)
                                if (i = 1 === (n = this[l]).nodeType && (n.className ? (" " + n.className + " ").replace(Kt, " ") : " ")) {
                                    for (r = 0; o = e[r++];) i.indexOf(" " + o + " ") < 0 && (i += o + " ");
                                    s = f.trim(i), n.className !== s && (n.className = s)
                                } return this
                    },
                    removeClass: function(t) {
                        var e, n, i, o, r, s, a = 0 === arguments.length || "string" == typeof t && t,
                            l = 0,
                            d = this.length;
                        if (f.isFunction(t)) return this.each((function(e) {
                            f(this).removeClass(t.call(this, e, this.className))
                        }));
                        if (a)
                            for (e = (t || "").match(O) || []; l < d; l++)
                                if (i = 1 === (n = this[l]).nodeType && (n.className ? (" " + n.className + " ").replace(Kt, " ") : "")) {
                                    for (r = 0; o = e[r++];)
                                        for (; i.indexOf(" " + o + " ") >= 0;) i = i.replace(" " + o + " ", " ");
                                    s = t ? f.trim(i) : "", n.className !== s && (n.className = s)
                                } return this
                    },
                    toggleClass: function(t, e) {
                        var n = typeof t;
                        return "boolean" == typeof e && "string" === n ? e ? this.addClass(t) : this.removeClass(t) : f.isFunction(t) ? this.each((function(n) {
                            f(this).toggleClass(t.call(this, n, this.className, e), e)
                        })) : this.each((function() {
                            if ("string" === n)
                                for (var e, i = 0, o = f(this), r = t.match(O) || []; e = r[i++];) o.hasClass(e) ? o.removeClass(e) : o.addClass(e);
                            else n !== G && "boolean" !== n || (this.className && j.set(this, "__className__", this.className), this.className = this.className || !1 === t ? "" : j.get(this, "__className__") || "")
                        }))
                    },
                    hasClass: function(t) {
                        for (var e = " " + t + " ", n = 0, i = this.length; n < i; n++)
                            if (1 === this[n].nodeType && (" " + this[n].className + " ").replace(Kt, " ").indexOf(e) >= 0) return !0;
                        return !1
                    }
                });
                var te = /\r/g;
                f.fn.extend({
                    val: function(t) {
                        var e, n, i, o = this[0];
                        return arguments.length ? (i = f.isFunction(t), this.each((function(n) {
                            var o;
                            1 === this.nodeType && (null == (o = i ? t.call(this, n, f(this).val()) : t) ? o = "" : "number" == typeof o ? o += "" : f.isArray(o) && (o = f.map(o, (function(t) {
                                return null == t ? "" : t + ""
                            }))), (e = f.valHooks[this.type] || f.valHooks[this.nodeName.toLowerCase()]) && "set" in e && void 0 !== e.set(this, o, "value") || (this.value = o))
                        }))) : o ? (e = f.valHooks[o.type] || f.valHooks[o.nodeName.toLowerCase()]) && "get" in e && void 0 !== (n = e.get(o, "value")) ? n : "string" == typeof(n = o.value) ? n.replace(te, "") : null == n ? "" : n : void 0
                    }
                }), f.extend({
                    valHooks: {
                        option: {
                            get: function(t) {
                                var e = f.find.attr(t, "value");
                                return null != e ? e : f.trim(f.text(t))
                            }
                        },
                        select: {
                            get: function(t) {
                                for (var e, n, i = t.options, o = t.selectedIndex, r = "select-one" === t.type || o < 0, s = r ? null : [], a = r ? o + 1 : i.length, l = o < 0 ? a : r ? o : 0; l < a; l++)
                                    if (((n = i[l]).selected || l === o) && (h.optDisabled ? !n.disabled : null === n.getAttribute("disabled")) && (!n.parentNode.disabled || !f.nodeName(n.parentNode, "optgroup"))) {
                                        if (e = f(n).val(), r) return e;
                                        s.push(e)
                                    } return s
                            },
                            set: function(t, e) {
                                for (var n, i, o = t.options, r = f.makeArray(e), s = o.length; s--;)((i = o[s]).selected = f.inArray(i.value, r) >= 0) && (n = !0);
                                return n || (t.selectedIndex = -1), r
                            }
                        }
                    }
                }), f.each(["radio", "checkbox"], (function() {
                    f.valHooks[this] = {
                        set: function(t, e) {
                            if (f.isArray(e)) return t.checked = f.inArray(f(t).val(), e) >= 0
                        }
                    }, h.checkOn || (f.valHooks[this].get = function(t) {
                        return null === t.getAttribute("value") ? "on" : t.value
                    })
                })), f.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "), (function(t, e) {
                    f.fn[e] = function(t, n) {
                        return arguments.length > 0 ? this.on(e, null, t, n) : this.trigger(e)
                    }
                })), f.fn.extend({
                    hover: function(t, e) {
                        return this.mouseenter(t).mouseleave(e || t)
                    },
                    bind: function(t, e, n) {
                        return this.on(t, null, e, n)
                    },
                    unbind: function(t, e) {
                        return this.off(t, null, e)
                    },
                    delegate: function(t, e, n, i) {
                        return this.on(e, t, n, i)
                    },
                    undelegate: function(t, e, n) {
                        return 1 === arguments.length ? this.off(t, "**") : this.off(e, t || "**", n)
                    }
                });
                var ee = f.now(),
                    ne = /\?/;
                f.parseJSON = function(t) {
                    return JSON.parse(t + "")
                }, f.parseXML = function(t) {
                    var e;
                    if (!t || "string" != typeof t) return null;
                    try {
                        e = (new DOMParser).parseFromString(t, "text/xml")
                    } catch (t) {
                        e = void 0
                    }
                    return e && !e.getElementsByTagName("parsererror").length || f.error("Invalid XML: " + t), e
                };
                var ie = /#.*$/,
                    oe = /([?&])_=[^&]*/,
                    re = /^(.*?):[ \t]*([^\r\n]*)$/gm,
                    se = /^(?:GET|HEAD)$/,
                    ae = /^\/\//,
                    le = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,
                    de = {},
                    ce = {},
                    ue = "*/".concat("*"),
                    pe = i.location.href,
                    he = le.exec(pe.toLowerCase()) || [];

                function me(t) {
                    return function(e, n) {
                        "string" != typeof e && (n = e, e = "*");
                        var i, o = 0,
                            r = e.toLowerCase().match(O) || [];
                        if (f.isFunction(n))
                            for (; i = r[o++];) "+" === i[0] ? (i = i.slice(1) || "*", (t[i] = t[i] || []).unshift(n)) : (t[i] = t[i] || []).push(n)
                    }
                }

                function ge(t, e, n, i) {
                    var o = {},
                        r = t === ce;

                    function s(a) {
                        var l;
                        return o[a] = !0, f.each(t[a] || [], (function(t, a) {
                            var d = a(e, n, i);
                            return "string" != typeof d || r || o[d] ? r ? !(l = d) : void 0 : (e.dataTypes.unshift(d), s(d), !1)
                        })), l
                    }
                    return s(e.dataTypes[0]) || !o["*"] && s("*")
                }

                function fe(t, e) {
                    var n, i, o = f.ajaxSettings.flatOptions || {};
                    for (n in e) void 0 !== e[n] && ((o[n] ? t : i || (i = {}))[n] = e[n]);
                    return i && f.extend(!0, t, i), t
                }
                f.extend({
                    active: 0,
                    lastModified: {},
                    etag: {},
                    ajaxSettings: {
                        url: pe,
                        type: "GET",
                        isLocal: /^(?:about|app|app-storage|.+-extension|file|res|widget):$/.test(he[1]),
                        global: !0,
                        processData: !0,
                        async: !0,
                        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                        accepts: {
                            "*": ue,
                            text: "text/plain",
                            html: "text/html",
                            xml: "application/xml, text/xml",
                            json: "application/json, text/javascript"
                        },
                        contents: {
                            xml: /xml/,
                            html: /html/,
                            json: /json/
                        },
                        responseFields: {
                            xml: "responseXML",
                            text: "responseText",
                            json: "responseJSON"
                        },
                        converters: {
                            "* text": String,
                            "text html": !0,
                            "text json": f.parseJSON,
                            "text xml": f.parseXML
                        },
                        flatOptions: {
                            url: !0,
                            context: !0
                        }
                    },
                    ajaxSetup: function(t, e) {
                        return e ? fe(fe(t, f.ajaxSettings), e) : fe(f.ajaxSettings, t)
                    },
                    ajaxPrefilter: me(de),
                    ajaxTransport: me(ce),
                    ajax: function(t, e) {
                        "object" == typeof t && (e = t, t = void 0), e = e || {};
                        var n, i, o, r, s, a, l, d, c = f.ajaxSetup({}, e),
                            u = c.context || c,
                            p = c.context && (u.nodeType || u.jquery) ? f(u) : f.event,
                            h = f.Deferred(),
                            m = f.Callbacks("once memory"),
                            g = c.statusCode || {},
                            b = {},
                            A = {},
                            v = 0,
                            y = "canceled",
                            w = {
                                readyState: 0,
                                getResponseHeader: function(t) {
                                    var e;
                                    if (2 === v) {
                                        if (!r)
                                            for (r = {}; e = re.exec(o);) r[e[1].toLowerCase()] = e[2];
                                        e = r[t.toLowerCase()]
                                    }
                                    return null == e ? null : e
                                },
                                getAllResponseHeaders: function() {
                                    return 2 === v ? o : null
                                },
                                setRequestHeader: function(t, e) {
                                    var n = t.toLowerCase();
                                    return v || (t = A[n] = A[n] || t, b[t] = e), this
                                },
                                overrideMimeType: function(t) {
                                    return v || (c.mimeType = t), this
                                },
                                statusCode: function(t) {
                                    var e;
                                    if (t)
                                        if (v < 2)
                                            for (e in t) g[e] = [g[e], t[e]];
                                        else w.always(t[w.status]);
                                    return this
                                },
                                abort: function(t) {
                                    var e = t || y;
                                    return n && n.abort(e), k(0, e), this
                                }
                            };
                        if (h.promise(w).complete = m.add, w.success = w.done, w.error = w.fail, c.url = ((t || c.url || pe) + "").replace(ie, "").replace(ae, he[1] + "//"), c.type = e.method || e.type || c.method || c.type, c.dataTypes = f.trim(c.dataType || "*").toLowerCase().match(O) || [""], null == c.crossDomain && (a = le.exec(c.url.toLowerCase()), c.crossDomain = !(!a || a[1] === he[1] && a[2] === he[2] && (a[3] || ("http:" === a[1] ? "80" : "443")) === (he[3] || ("http:" === he[1] ? "80" : "443")))), c.data && c.processData && "string" != typeof c.data && (c.data = f.param(c.data, c.traditional)), ge(de, c, e, w), 2 === v) return w;
                        for (d in (l = f.event && c.global) && 0 == f.active++ && f.event.trigger("ajaxStart"), c.type = c.type.toUpperCase(), c.hasContent = !se.test(c.type), i = c.url, c.hasContent || (c.data && (i = c.url += (ne.test(i) ? "&" : "?") + c.data, delete c.data), !1 === c.cache && (c.url = oe.test(i) ? i.replace(oe, "$1_=" + ee++) : i + (ne.test(i) ? "&" : "?") + "_=" + ee++)), c.ifModified && (f.lastModified[i] && w.setRequestHeader("If-Modified-Since", f.lastModified[i]), f.etag[i] && w.setRequestHeader("If-None-Match", f.etag[i])), (c.data && c.hasContent && !1 !== c.contentType || e.contentType) && w.setRequestHeader("Content-Type", c.contentType), w.setRequestHeader("Accept", c.dataTypes[0] && c.accepts[c.dataTypes[0]] ? c.accepts[c.dataTypes[0]] + ("*" !== c.dataTypes[0] ? ", " + ue + "; q=0.01" : "") : c.accepts["*"]), c.headers) w.setRequestHeader(d, c.headers[d]);
                        if (c.beforeSend && (!1 === c.beforeSend.call(u, w, c) || 2 === v)) return w.abort();
                        for (d in y = "abort", {
                                success: 1,
                                error: 1,
                                complete: 1
                            }) w[d](c[d]);
                        if (n = ge(ce, c, e, w)) {
                            w.readyState = 1, l && p.trigger("ajaxSend", [w, c]), c.async && c.timeout > 0 && (s = setTimeout((function() {
                                w.abort("timeout")
                            }), c.timeout));
                            try {
                                v = 1, n.send(b, k)
                            } catch (t) {
                                if (!(v < 2)) throw t;
                                k(-1, t)
                            }
                        } else k(-1, "No Transport");

                        function k(t, e, r, a) {
                            var d, b, A, y, k, x = e;
                            2 !== v && (v = 2, s && clearTimeout(s), n = void 0, o = a || "", w.readyState = t > 0 ? 4 : 0, d = t >= 200 && t < 300 || 304 === t, r && (y = function(t, e, n) {
                                for (var i, o, r, s, a = t.contents, l = t.dataTypes;
                                    "*" === l[0];) l.shift(), void 0 === i && (i = t.mimeType || e.getResponseHeader("Content-Type"));
                                if (i)
                                    for (o in a)
                                        if (a[o] && a[o].test(i)) {
                                            l.unshift(o);
                                            break
                                        } if (l[0] in n) r = l[0];
                                else {
                                    for (o in n) {
                                        if (!l[0] || t.converters[o + " " + l[0]]) {
                                            r = o;
                                            break
                                        }
                                        s || (s = o)
                                    }
                                    r = r || s
                                }
                                if (r) return r !== l[0] && l.unshift(r), n[r]
                            }(c, w, r)), y = function(t, e, n, i) {
                                var o, r, s, a, l, d = {},
                                    c = t.dataTypes.slice();
                                if (c[1])
                                    for (s in t.converters) d[s.toLowerCase()] = t.converters[s];
                                for (r = c.shift(); r;)
                                    if (t.responseFields[r] && (n[t.responseFields[r]] = e), !l && i && t.dataFilter && (e = t.dataFilter(e, t.dataType)), l = r, r = c.shift())
                                        if ("*" === r) r = l;
                                        else if ("*" !== l && l !== r) {
                                    if (!(s = d[l + " " + r] || d["* " + r]))
                                        for (o in d)
                                            if ((a = o.split(" "))[1] === r && (s = d[l + " " + a[0]] || d["* " + a[0]])) {
                                                !0 === s ? s = d[o] : !0 !== d[o] && (r = a[0], c.unshift(a[1]));
                                                break
                                            } if (!0 !== s)
                                        if (s && t.throws) e = s(e);
                                        else try {
                                            e = s(e)
                                        } catch (t) {
                                            return {
                                                state: "parsererror",
                                                error: s ? t : "No conversion from " + l + " to " + r
                                            }
                                        }
                                }
                                return {
                                    state: "success",
                                    data: e
                                }
                            }(c, y, w, d), d ? (c.ifModified && ((k = w.getResponseHeader("Last-Modified")) && (f.lastModified[i] = k), (k = w.getResponseHeader("etag")) && (f.etag[i] = k)), 204 === t || "HEAD" === c.type ? x = "nocontent" : 304 === t ? x = "notmodified" : (x = y.state, b = y.data, d = !(A = y.error))) : (A = x, !t && x || (x = "error", t < 0 && (t = 0))), w.status = t, w.statusText = (e || x) + "", d ? h.resolveWith(u, [b, x, w]) : h.rejectWith(u, [w, x, A]), w.statusCode(g), g = void 0, l && p.trigger(d ? "ajaxSuccess" : "ajaxError", [w, c, d ? b : A]), m.fireWith(u, [w, x]), l && (p.trigger("ajaxComplete", [w, c]), --f.active || f.event.trigger("ajaxStop")))
                        }
                        return w
                    },
                    getJSON: function(t, e, n) {
                        return f.get(t, e, n, "json")
                    },
                    getScript: function(t, e) {
                        return f.get(t, void 0, e, "script")
                    }
                }), f.each(["get", "post"], (function(t, e) {
                    f[e] = function(t, n, i, o) {
                        return f.isFunction(n) && (o = o || i, i = n, n = void 0), f.ajax({
                            url: t,
                            type: e,
                            dataType: o,
                            data: n,
                            success: i
                        })
                    }
                })), f._evalUrl = function(t) {
                    return f.ajax({
                        url: t,
                        type: "GET",
                        dataType: "script",
                        async: !1,
                        global: !1,
                        throws: !0
                    })
                }, f.fn.extend({
                    wrapAll: function(t) {
                        var e;
                        return f.isFunction(t) ? this.each((function(e) {
                            f(this).wrapAll(t.call(this, e))
                        })) : (this[0] && (e = f(t, this[0].ownerDocument).eq(0).clone(!0), this[0].parentNode && e.insertBefore(this[0]), e.map((function() {
                            for (var t = this; t.firstElementChild;) t = t.firstElementChild;
                            return t
                        })).append(this)), this)
                    },
                    wrapInner: function(t) {
                        return f.isFunction(t) ? this.each((function(e) {
                            f(this).wrapInner(t.call(this, e))
                        })) : this.each((function() {
                            var e = f(this),
                                n = e.contents();
                            n.length ? n.wrapAll(t) : e.append(t)
                        }))
                    },
                    wrap: function(t) {
                        var e = f.isFunction(t);
                        return this.each((function(n) {
                            f(this).wrapAll(e ? t.call(this, n) : t)
                        }))
                    },
                    unwrap: function() {
                        return this.parent().each((function() {
                            f.nodeName(this, "body") || f(this).replaceWith(this.childNodes)
                        })).end()
                    }
                }), f.expr.filters.hidden = function(t) {
                    return t.offsetWidth <= 0 && t.offsetHeight <= 0
                }, f.expr.filters.visible = function(t) {
                    return !f.expr.filters.hidden(t)
                };
                var be = /%20/g,
                    Ae = /\[\]$/,
                    ve = /\r?\n/g,
                    ye = /^(?:submit|button|image|reset|file)$/i,
                    we = /^(?:input|select|textarea|keygen)/i;

                function ke(t, e, n, i) {
                    var o;
                    if (f.isArray(e)) f.each(e, (function(e, o) {
                        n || Ae.test(t) ? i(t, o) : ke(t + "[" + ("object" == typeof o ? e : "") + "]", o, n, i)
                    }));
                    else if (n || "object" !== f.type(e)) i(t, e);
                    else
                        for (o in e) ke(t + "[" + o + "]", e[o], n, i)
                }
                f.param = function(t, e) {
                    var n, i = [],
                        o = function(t, e) {
                            e = f.isFunction(e) ? e() : null == e ? "" : e, i[i.length] = encodeURIComponent(t) + "=" + encodeURIComponent(e)
                        };
                    if (void 0 === e && (e = f.ajaxSettings && f.ajaxSettings.traditional), f.isArray(t) || t.jquery && !f.isPlainObject(t)) f.each(t, (function() {
                        o(this.name, this.value)
                    }));
                    else
                        for (n in t) ke(n, t[n], e, o);
                    return i.join("&").replace(be, "+")
                }, f.fn.extend({
                    serialize: function() {
                        return f.param(this.serializeArray())
                    },
                    serializeArray: function() {
                        return this.map((function() {
                            var t = f.prop(this, "elements");
                            return t ? f.makeArray(t) : this
                        })).filter((function() {
                            var t = this.type;
                            return this.name && !f(this).is(":disabled") && we.test(this.nodeName) && !ye.test(t) && (this.checked || !Q.test(t))
                        })).map((function(t, e) {
                            var n = f(this).val();
                            return null == n ? null : f.isArray(n) ? f.map(n, (function(t) {
                                return {
                                    name: e.name,
                                    value: t.replace(ve, "\r\n")
                                }
                            })) : {
                                name: e.name,
                                value: n.replace(ve, "\r\n")
                            }
                        })).get()
                    }
                }), f.ajaxSettings.xhr = function() {
                    try {
                        return new XMLHttpRequest
                    } catch (t) {}
                };
                var xe = 0,
                    Ce = {},
                    Ee = {
                        0: 200,
                        1223: 204
                    },
                    _e = f.ajaxSettings.xhr();
                i.attachEvent && i.attachEvent("onunload", (function() {
                    for (var t in Ce) Ce[t]()
                })), h.cors = !!_e && "withCredentials" in _e, h.ajax = _e = !!_e, f.ajaxTransport((function(t) {
                    var e;
                    if (h.cors || _e && !t.crossDomain) return {
                        send: function(n, i) {
                            var o, r = t.xhr(),
                                s = ++xe;
                            if (r.open(t.type, t.url, t.async, t.username, t.password), t.xhrFields)
                                for (o in t.xhrFields) r[o] = t.xhrFields[o];
                            for (o in t.mimeType && r.overrideMimeType && r.overrideMimeType(t.mimeType), t.crossDomain || n["X-Requested-With"] || (n["X-Requested-With"] = "XMLHttpRequest"), n) r.setRequestHeader(o, n[o]);
                            e = function(t) {
                                return function() {
                                    e && (delete Ce[s], e = r.onload = r.onerror = null, "abort" === t ? r.abort() : "error" === t ? i(r.status, r.statusText) : i(Ee[r.status] || r.status, r.statusText, "string" == typeof r.responseText ? {
                                        text: r.responseText
                                    } : void 0, r.getAllResponseHeaders()))
                                }
                            }, r.onload = e(), r.onerror = e("error"), e = Ce[s] = e("abort");
                            try {
                                r.send(t.hasContent && t.data || null)
                            } catch (t) {
                                if (e) throw t
                            }
                        },
                        abort: function() {
                            e && e()
                        }
                    }
                })), f.ajaxSetup({
                    accepts: {
                        script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
                    },
                    contents: {
                        script: /(?:java|ecma)script/
                    },
                    converters: {
                        "text script": function(t) {
                            return f.globalEval(t), t
                        }
                    }
                }), f.ajaxPrefilter("script", (function(t) {
                    void 0 === t.cache && (t.cache = !1), t.crossDomain && (t.type = "GET")
                })), f.ajaxTransport("script", (function(t) {
                    var e, n;
                    if (t.crossDomain) return {
                        send: function(i, o) {
                            e = f("<script>").prop({
                                async: !0,
                                charset: t.scriptCharset,
                                src: t.url
                            }).on("load error", n = function(t) {
                                e.remove(), n = null, t && o("error" === t.type ? 404 : 200, t.type)
                            }), m.head.appendChild(e[0])
                        },
                        abort: function() {
                            n && n()
                        }
                    }
                }));
                var Se = [],
                    Me = /(=)\?(?=&|$)|\?\?/;
                f.ajaxSetup({
                    jsonp: "callback",
                    jsonpCallback: function() {
                        var t = Se.pop() || f.expando + "_" + ee++;
                        return this[t] = !0, t
                    }
                }), f.ajaxPrefilter("json jsonp", (function(t, e, n) {
                    var o, r, s, a = !1 !== t.jsonp && (Me.test(t.url) ? "url" : "string" == typeof t.data && !(t.contentType || "").indexOf("application/x-www-form-urlencoded") && Me.test(t.data) && "data");
                    if (a || "jsonp" === t.dataTypes[0]) return o = t.jsonpCallback = f.isFunction(t.jsonpCallback) ? t.jsonpCallback() : t.jsonpCallback, a ? t[a] = t[a].replace(Me, "$1" + o) : !1 !== t.jsonp && (t.url += (ne.test(t.url) ? "&" : "?") + t.jsonp + "=" + o), t.converters["script json"] = function() {
                        return s || f.error(o + " was not called"), s[0]
                    }, t.dataTypes[0] = "json", r = i[o], i[o] = function() {
                        s = arguments
                    }, n.always((function() {
                        i[o] = r, t[o] && (t.jsonpCallback = e.jsonpCallback, Se.push(o)), s && f.isFunction(r) && r(s[0]), s = r = void 0
                    })), "script"
                })), f.parseHTML = function(t, e, n) {
                    if (!t || "string" != typeof t) return null;
                    "boolean" == typeof e && (n = e, e = !1), e = e || m;
                    var i = C.exec(t),
                        o = !n && [];
                    return i ? [e.createElement(i[1])] : (i = f.buildFragment([t], e, o), o && o.length && f(o).remove(), f.merge([], i.childNodes))
                };
                var Te = f.fn.load;
                f.fn.load = function(t, e, n) {
                    if ("string" != typeof t && Te) return Te.apply(this, arguments);
                    var i, o, r, s = this,
                        a = t.indexOf(" ");
                    return a >= 0 && (i = f.trim(t.slice(a)), t = t.slice(0, a)), f.isFunction(e) ? (n = e, e = void 0) : e && "object" == typeof e && (o = "POST"), s.length > 0 && f.ajax({
                        url: t,
                        type: o,
                        dataType: "html",
                        data: e
                    }).done((function(t) {
                        r = arguments, s.html(i ? f("<div>").append(f.parseHTML(t)).find(i) : t)
                    })).complete(n && function(t, e) {
                        s.each(n, r || [t.responseText, e, t])
                    }), this
                }, f.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], (function(t, e) {
                    f.fn[e] = function(t) {
                        return this.on(e, t)
                    }
                })), f.expr.filters.animated = function(t) {
                    return f.grep(f.timers, (function(e) {
                        return t === e.elem
                    })).length
                };
                var Le = i.document.documentElement;

                function Be(t) {
                    return f.isWindow(t) ? t : 9 === t.nodeType && t.defaultView
                }
                f.offset = {
                    setOffset: function(t, e, n) {
                        var i, o, r, s, a, l, d = f.css(t, "position"),
                            c = f(t),
                            u = {};
                        "static" === d && (t.style.position = "relative"), a = c.offset(), r = f.css(t, "top"), l = f.css(t, "left"), ("absolute" === d || "fixed" === d) && (r + l).indexOf("auto") > -1 ? (s = (i = c.position()).top, o = i.left) : (s = parseFloat(r) || 0, o = parseFloat(l) || 0), f.isFunction(e) && (e = e.call(t, n, a)), null != e.top && (u.top = e.top - a.top + s), null != e.left && (u.left = e.left - a.left + o), "using" in e ? e.using.call(t, u) : c.css(u)
                    }
                }, f.fn.extend({
                    offset: function(t) {
                        if (arguments.length) return void 0 === t ? this : this.each((function(e) {
                            f.offset.setOffset(this, t, e)
                        }));
                        var e, n, i = this[0],
                            o = {
                                top: 0,
                                left: 0
                            },
                            r = i && i.ownerDocument;
                        return r ? (e = r.documentElement, f.contains(e, i) ? (typeof i.getBoundingClientRect !== G && (o = i.getBoundingClientRect()), n = Be(r), {
                            top: o.top + n.pageYOffset - e.clientTop,
                            left: o.left + n.pageXOffset - e.clientLeft
                        }) : o) : void 0
                    },
                    position: function() {
                        if (this[0]) {
                            var t, e, n = this[0],
                                i = {
                                    top: 0,
                                    left: 0
                                };
                            return "fixed" === f.css(n, "position") ? e = n.getBoundingClientRect() : (t = this.offsetParent(), e = this.offset(), f.nodeName(t[0], "html") || (i = t.offset()), i.top += f.css(t[0], "borderTopWidth", !0), i.left += f.css(t[0], "borderLeftWidth", !0)), {
                                top: e.top - i.top - f.css(n, "marginTop", !0),
                                left: e.left - i.left - f.css(n, "marginLeft", !0)
                            }
                        }
                    },
                    offsetParent: function() {
                        return this.map((function() {
                            for (var t = this.offsetParent || Le; t && !f.nodeName(t, "html") && "static" === f.css(t, "position");) t = t.offsetParent;
                            return t || Le
                        }))
                    }
                }), f.each({
                    scrollLeft: "pageXOffset",
                    scrollTop: "pageYOffset"
                }, (function(t, e) {
                    var n = "pageYOffset" === e;
                    f.fn[t] = function(o) {
                        return I(this, (function(t, o, r) {
                            var s = Be(t);
                            if (void 0 === r) return s ? s[e] : t[o];
                            s ? s.scrollTo(n ? i.pageXOffset : r, n ? r : i.pageYOffset) : t[o] = r
                        }), t, o, arguments.length, null)
                    }
                })), f.each(["top", "left"], (function(t, e) {
                    f.cssHooks[e] = _t(h.pixelPosition, (function(t, n) {
                        if (n) return n = Et(t, e), xt.test(n) ? f(t).position()[e] + "px" : n
                    }))
                })), f.each({
                    Height: "height",
                    Width: "width"
                }, (function(t, e) {
                    f.each({
                        padding: "inner" + t,
                        content: e,
                        "": "outer" + t
                    }, (function(n, i) {
                        f.fn[i] = function(i, o) {
                            var r = arguments.length && (n || "boolean" != typeof i),
                                s = n || (!0 === i || !0 === o ? "margin" : "border");
                            return I(this, (function(e, n, i) {
                                var o;
                                return f.isWindow(e) ? e.document.documentElement["client" + t] : 9 === e.nodeType ? (o = e.documentElement, Math.max(e.body["scroll" + t], o["scroll" + t], e.body["offset" + t], o["offset" + t], o["client" + t])) : void 0 === i ? f.css(e, n, s) : f.style(e, n, i, s)
                            }), e, r ? i : void 0, r, null)
                        }
                    }))
                })), f.fn.size = function() {
                    return this.length
                }, f.fn.andSelf = f.fn.addBack, void 0 === (n = function() {
                    return f
                }.apply(e, [])) || (t.exports = n);
                var Ne = i.jQuery,
                    Oe = i.$;
                return f.noConflict = function(t) {
                    return i.$ === f && (i.$ = Oe), t && i.jQuery === f && (i.jQuery = Ne), f
                }, typeof o === G && (i.jQuery = i.$ = f), f
            }, "object" == typeof t.exports ? t.exports = i.document ? o(i, !0) : function(t) {
                if (!t.document) throw new Error("jQuery requires a window with a document");
                return o(t)
            } : o(i)
        }, (t, e) => {
            "use strict";

            function n(t) {
                return window.testsSandbox ? "/fe/rcp-fe-lol-uikit/" + t : "/fe/lol-uikit/" + t
            }
            Object.defineProperty(e, "__esModule", {
                value: !0
            }), e.default = void 0;
            var i = {
                arrowButtonHover: n("sfx-uikit-arrow-button-hover.ogg"),
                arrowButtonClick: n("sfx-uikit-arrow-button-click.ogg"),
                clickGeneric: n("sfx-uikit-click-generic.ogg"),
                closeButtonHover: n("sfx-uikit-button-circlegold-hover.ogg"),
                closeButtonClick: n("sfx-uikit-button-circlex-click.ogg"),
                dropdownOptionSelect: n("sfx-uikit-dropdown-select.ogg"),
                dropdownClick: n("sfx-uikit-dropdown-click.ogg"),
                dialogCelebrationIntro: n("sfx-celebrate-notif-intro.ogg"),
                dialogCelebrationReceive: n("sfx-celebrate-receive-generic.ogg"),
                dialogCelebrationClick: n("sfx-uikit-button-gold-click.ogg"),
                dialogCelebrationHover: n("sfx-uikit-button-gold-hover.ogg"),
                flatCheckBoxClick: n("sfx-uikit-checkbox-click.ogg"),
                flatButtonHover: n("sfx-uikit-button-gold-hover.ogg"),
                flatButtonClick: n("sfx-uikit-button-gold-click.ogg"),
                focus: n("sfx-uikit-generic-click-small.ogg"),
                primaryMagicButtonHover: n("sfx-uikit-magic-button-hover.ogg"),
                primaryMagicButtonClick: n("sfx-uikit-magic-button-click.ogg"),
                purchaseButtonHover: n("sfx-purchase-button-hover.ogg"),
                purchaseButtonClick: n("sfx-purchase-button-click.ogg"),
                navClick: n("sfx-nav-button-text-click.ogg"),
                radioInputClick: n("sfx-uikit-radio-click.ogg"),
                rewardToast: n("sfx-uikit-reward-toast.ogg"),
                subnavClick: n("sfx-uikit-text-click-small.ogg"),
                vignetteIntro: n("sfx-vignette-celebration-intro.ogg"),
                vignetteOutro: n("sfx-vignette-celebration-outro.ogg")
            };
            e.default = i
        }, t => {
            "use strict";
            t.exports = '<template>\r\n  <style>\r\n\t@keyframes hoverTextShadow {\r\n\t  0% {\r\n\t    text-shadow: 0 0 4px rgba(240, 230, 216, 1);\r\n\t  }\r\n\t  50% {\r\n\t    text-shadow: 0 0 4px rgba(240, 230, 216, .5);\r\n\t  }\r\n\t  100% {\r\n\t  \ttext-shadow: 0 0 4px rgba(240, 230, 216, 0);\r\n\t  }\r\n\t}\r\n\r\n\t@keyframes hoverGlow {\r\n\t  0% {\r\n\t    box-shadow: 0px 0px 5px 4px rgba(240, 230, 216, .5), 0px 0px 2px 1px rgba(240, 230, 216, .5) inset;\r\n\t  }\r\n\t  50% {\r\n\t    box-shadow: 0px 0px 5px 4px rgba(240, 230, 216, .3), 0px 0px 2px 1px rgba(240, 230, 216, .3) inset;\r\n\t  }\r\n\t  100% {\r\n\t    box-shadow: 0px 0px 5px 4px rgba(240, 230, 216, 0), 0px 0px 2px 1px rgba(240, 230, 216, 0) inset;\r\n\t  }\r\n\t}\r\n\r\n\t@keyframes clickFlare {\r\n\t  0% {\r\n\t    opacity: 0;\r\n\t  }\r\n\t  25% {\r\n\t    opacity: .6;\r\n\t  }\r\n\t  50% {\r\n\t    opacity: .3;\r\n\t  }\r\n\t  100% {\r\n\t    opacity: 0;\r\n\t  }\r\n\t}\r\n\r\n\t@keyframes clickScale {\r\n\t  from {\r\n\t  \ttransform: scale(.94);\r\n\t  }\r\n\r\n\t  to {\r\n\t\ttransform: scale(1.0);\r\n\t  }\r\n\t}\r\n\r\n\t@keyframes clickSheen {\r\n\t  from {\r\n\t    transform: translateY(-100%) rotate(0deg);\r\n\t  }\r\n\t  10% {\r\n\t   transform: translateY(-80%) rotate(-5deg);\r\n\t  }\r\n\t  to {\r\n\t    transform: translateY(100%) rotate(0deg);\r\n\t  }\r\n\t}\r\n  </style>\r\n  <div class="lol-uikit-flat-button-wrapper">\r\n    <div class="lol-uikit-flat-button-extra"></div>\r\n    <div class="lol-uikit-flat-button-inner">\r\n      <div class="lol-uikit-flat-button">\r\n      \t<div class="lol-uikit-flat-button-bg"></div>\r\n      \t<div class="lol-uikit-flat-button-border-idle"></div>\r\n      \t<div class="lol-uikit-flat-button-border-transition"></div>\r\n      \t<div class="lol-uikit-flat-button-flare"></div>\r\n      \t<div class="lol-uikit-flat-button-glow"></div>\r\n      \t<div class="lol-uikit-flat-button-sheen-wrapper">\r\n\t      <div class="lol-uikit-flat-button-sheen"></div>\r\n      \t</div>\r\n      \t<div class="lol-uikit-flat-button-content-wrapper">\r\n\t\t  <slot></slot>\r\n\t\t</div>\r\n      </div>\r\n    </div>\r\n\t<slot name="comet-border"></slot>\r\n  </div>\r\n</template>\r\n'
        }, (t, e, n) => {
            var i = n(9),
                o = n(10)(i);
            o.push([t.id, ':host .lol-uikit-flat-button {\n  font-family: var(--font-display);\n}\n:host(:not([type=next]):not([type=purchase])) .secondary:not(.disabled) .lol-uikit-flat-button-content-wrapper {\n  font-family: var(--font-body);\n}\n:host .lol-uikit-flat-button {\n  font-family: var(--font-display);\n}\n:host(:not([type=next]):not([type=purchase])) .secondary:not(.disabled) .lol-uikit-flat-button-content-wrapper {\n  font-family: var(--font-body);\n}\n:host(:not([type=next]):not([type=purchase])) .secondary:not(.disabled) .lol-uikit-flat-button-content-wrapper {\n  -webkit-user-select: none;\n}\n:host(:not([type=next]):not([type=purchase])) .secondary:not(.disabled) .lol-uikit-flat-button-content-wrapper {\n  font-kerning: normal;\n  -webkit-font-feature-settings: "kern" 1;\n  -webkit-font-smoothing: antialiased;\n}\n:host .lol-uikit-flat-button {\n  text-transform: uppercase;\n}\n:host .lol-uikit-flat-button:lang(ko-kr),\n:host .lol-uikit-flat-button:lang(ja-jp),\n:host .lol-uikit-flat-button:lang(tr-tr),\n:host .lol-uikit-flat-button:lang(el-gr),\n:host .lol-uikit-flat-button:lang(th-th),\n:host .lol-uikit-flat-button:lang(zh-tw) {\n  text-transform: none;\n}\n:host(:not([type=next]):not([type=purchase])) .secondary:not(.disabled) .lol-uikit-flat-button-content-wrapper {\n  color: #a09b8c;\n  font-size: 12px;\n  font-weight: normal;\n  line-height: 16px;\n  letter-spacing: 0.025em;\n  -webkit-font-smoothing: subpixel-antialiased;\n}\n:host(:not([type=next]):not([type=purchase])) .secondary:not(.disabled) .lol-uikit-flat-button-content-wrapper:lang(ja-jp) {\n  font-size: 13px;\n}\n:host(:not([type=next]):not([type=purchase])) .secondary:not(.disabled) .lol-uikit-flat-button-content-wrapper:lang(ar-ae) {\n  letter-spacing: 0;\n}\n:host {\n  --flat-button-height: 100%;\n  --flat-button-width: inherit;\n  --flat-button-min-height: 32px;\n  --flat-button-border-transition-opacity: 0;\n  --flat-button-glow-animation: initial;\n  --flat-button-bg-opacity: 0;\n  --flat-button-inner-height: 100%;\n  --flat-button-border-width: 2px;\n  --flat-button-border-offset: -2px;\n  --flat-button-disabled-color: #5c5b57;\n}\n:host .lol-uikit-flat-button {\n  color: #cdbe91;\n  font-size: var(--font-size, 14px);\n  font-family: var(--font-family, var(--font-display));\n  font-weight: bold;\n  letter-spacing: 1px;\n  position: relative;\n  display: flex;\n  align-items: center;\n  box-sizing: border-box;\n  justify-content: center;\n  white-space: nowrap;\n  padding: 5px 1.3em;\n  height: var(--flat-button-height);\n  width: var(--flat-button-width);\n  min-height: var(--flat-button-min-height);\n  cursor: pointer;\n  -webkit-user-select: none;\n  box-shadow: 0 0 1px 1px #010a13, inset 0 0 1px 1px #010a13;\n  background: #1e2328;\n  border: var(--flat-button-border-width) solid transparent;\n/* Flare Element - flare element used for click flare (note: actual image) */\n/* Glow Element - used for inner and outset glows for different states / transitions  */\n/* Border Element Idle - used for defaut border gradient on flat button */\n/* Border Element Transition - used for transitional border gradient for different states */\n/* Sheen Wrapper - used to wrap sheen animation and cleanly apply overflow hidden for the size of the button */\n/* Sheen Element - sheen element for transform */\n/* BG Element - used for BG Color Gradient for different states / transitions */\n/* State classes defined below are done so via JS in index.js by the `setInteractionClass` function */\n/* Intro State */\n/* Hover State - onmouseover */\n/* Down State - onmousedown */\n/* Click State - on click */\n/* Disabled - on disabled="true" */\n}\n:host .lol-uikit-flat-button * {\n  pointer-events: none;\n}\n:host .lol-uikit-flat-button .lol-uikit-flat-button-content-wrapper {\n  position: relative;\n}\n:host .lol-uikit-flat-button .lol-uikit-flat-button-content-wrapper:lang(ar-ae) {\n  direction: rtl;\n}\n:host .lol-uikit-flat-button .lol-uikit-flat-button-content-wrapper.external::after {\n  width: 9px;\n  height: 9px;\n  content: \'\';\n  display: inline-block;\n  vertical-align: middle;\n  -webkit-mask: url("/fe/lol-uikit/images/external-link-mask.png") no-repeat;\n  -webkit-mask-size: contain;\n  background: #cdbe91;\n  margin-left: 5px;\n  margin-top: -5px;\n}\n:host .lol-uikit-flat-button .lol-uikit-flat-button-content-wrapper.external:lang(ar-ae)::after {\n  transform: scaleX(-1);\n}\n:host .lol-uikit-flat-button .lol-uikit-flat-button-flare {\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  overflow: hidden;\n}\n:host .lol-uikit-flat-button .lol-uikit-flat-button-flare:before {\n  content: \'\';\n  position: absolute;\n  top: -25px;\n  left: -25px;\n  width: 48px;\n  height: 48px;\n  opacity: 0;\n  background: transparent url("/fe/lol-uikit/images/sheen.png") top center no-repeat;\n}\n:host .lol-uikit-flat-button .lol-uikit-flat-button-flare:after {\n  content: \'\';\n  position: absolute;\n  bottom: -25px;\n  right: -25px;\n  width: 48px;\n  height: 48px;\n  opacity: 0;\n  background: transparent url("/fe/lol-uikit/images/sheen.png") top center no-repeat;\n}\n:host .lol-uikit-flat-button .lol-uikit-flat-button-glow {\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  -webkit-filter: blur(4px);\n  animation: var(--flat-button-glow-animation);\n}\n:host .lol-uikit-flat-button .lol-uikit-flat-button-border-idle {\n  position: absolute;\n  top: var(--flat-button-border-offset);\n  left: var(--flat-button-border-offset);\n  width: 100%;\n  height: 100%;\n  opacity: 1;\n  border: var(--flat-button-border-width) solid transparent;\n  border-image: linear-gradient(to top, #785b28 0%, #c89c3c 55%, #c8a355 71%, #c8aa6e 100%);\n  border-image-slice: 1;\n  transition: opacity 300ms linear;\n}\n:host .lol-uikit-flat-button .lol-uikit-flat-button-border-transition {\n  position: absolute;\n  top: var(--flat-button-border-offset);\n  left: var(--flat-button-border-offset);\n  width: 100%;\n  height: 100%;\n  opacity: var(--flat-button-border-transition-opacity);\n  border: var(--flat-button-border-width) solid transparent;\n}\n:host .lol-uikit-flat-button .lol-uikit-flat-button-sheen-wrapper {\n  position: absolute;\n  top: 0;\n  left: 0;\n  overflow: hidden;\n  width: 100%;\n  height: 100%;\n}\n:host .lol-uikit-flat-button .lol-uikit-flat-button-sheen {\n  position: absolute;\n  top: 0;\n  left: 0;\n  overflow: hidden;\n  width: 100%;\n  height: 150%;\n  transform: translateY(-100%);\n  background: linear-gradient(to bottom, rgba(255,255,255,0) 0%, rgba(255,255,255,0.15) 92%, rgba(255,255,255,0) 100%);\n  -webkit-filter: blur(2px);\n}\n:host .lol-uikit-flat-button .lol-uikit-flat-button-bg {\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  transition: opacity 400ms cubic-bezier(0, 0, 0.33, 1);\n  opacity: var(--flat-button-bg-opacity);\n  background-image: linear-gradient(to bottom, #1e232a 0%, #1e232a 40%, rgba(118,97,51,0.8) 140%);\n}\n:host .lol-uikit-flat-button.intro .lol-uikit-flat-button-border-transition {\n  border-image: linear-gradient(to top, #fff 0%, #fff 33%, #fff 66%, #fff 100%);\n  border-image-slice: 1;\n}\n:host .lol-uikit-flat-button.hover {\n  color: #f0e6d2;\n  animation: 600ms cubic-bezier(0, 0, 0.33, 1) 1 hoverTextShadow;\n}\n:host .lol-uikit-flat-button.hover.disabled {\n  color: var(--flat-button-disabled-color);\n  animation: none;\n}\n:host .lol-uikit-flat-button.hover .lol-uikit-flat-button-border-transition {\n  opacity: 1;\n  border-image: linear-gradient(to top, #c89c3c 0%, #dcc188 50%, #e1c998 71%, #f0e6d8 100%);\n  border-image-slice: 1;\n}\n:host .lol-uikit-flat-button.hover .lol-uikit-flat-button-glow {\n  animation: 600ms cubic-bezier(0, 0, 0.33, 1) 1 hoverGlow;\n}\n:host .lol-uikit-flat-button.hover .lol-uikit-flat-button-bg {\n  opacity: 1;\n}\n:host .lol-uikit-flat-button.hover .lol-uikit-flat-button-content-wrapper.external::after {\n  background: #f0e6d2;\n}\n:host .lol-uikit-flat-button.down {\n  color: #5c5b57;\n  transition: color 100ms linear;\n  animation: none;\n}\n:host .lol-uikit-flat-button.down .lol-uikit-flat-button-bg {\n  opacity: 0;\n}\n:host .lol-uikit-flat-button.down .lol-uikit-flat-button-border-transition {\n  opacity: 1;\n  border-image: linear-gradient(to bottom, #463817 0%, #694f27 100%);\n  border-image-slice: 1;\n}\n:host .lol-uikit-flat-button.down .lol-uikit-flat-button-content-wrapper.external::after {\n  background: #5c5b57;\n}\n:host .lol-uikit-flat-button.click {\n  color: #e4e1d8;\n  border-image: linear-gradient(to top, #fff 0%, #fff 33%, #fff 66%, #fff 100%);\n  border-image-slice: 1;\n  animation: 130ms linear clickScale 1, 400ms linear 1 hoverTextShadow;\n}\n:host .lol-uikit-flat-button.click .lol-uikit-flat-button-border-transition {\n  border-image: linear-gradient(to top, #c89c3c 0%, #dcc188 50%, #e1c998 71%, #f0e6d8 100%);\n  border-image-slice: 1;\n  transition: opacity 400ms linear;\n  opacity: 1;\n}\n:host .lol-uikit-flat-button.click .lol-uikit-flat-button-glow {\n  animation: 600ms cubic-bezier(0, 0, 0.33, 1) hoverGlow 1;\n}\n:host .lol-uikit-flat-button.click .lol-uikit-flat-button-sheen {\n  animation: 330ms clickSheen 1 linear;\n}\n:host .lol-uikit-flat-button.click .lol-uikit-flat-button-bg {\n  opacity: 1;\n}\n:host .lol-uikit-flat-button.click .lol-uikit-flat-button-flare:before {\n  animation: 400ms cubic-bezier(0, 0, 0.33, 1) 0ms 1 clickFlare;\n}\n:host .lol-uikit-flat-button.click .lol-uikit-flat-button-flare:after {\n  animation: 400ms cubic-bezier(0, 0, 0.33, 1) 30ms 1 clickFlare;\n}\n:host .lol-uikit-flat-button.click .lol-uikit-flat-button-content-wrapper.external::after {\n  background: #e4e1d8;\n}\n:host .lol-uikit-flat-button.disabled {\n  cursor: default;\n  color: var(--flat-button-disabled-color);\n  background: #1e2328;\n  border: 2px solid var(--flat-button-disabled-color);\n  border-image: initial;\n  transition: all 300ms linear;\n}\n:host .lol-uikit-flat-button.disabled:hover {\n  cursor: default;\n  color: var(--flat-button-disabled-color);\n  background: #1e2328;\n  border-color: var(--flat-button-disabled-color);\n  border-image: initial;\n  background-image: initial;\n  animation: none;\n}\n:host .lol-uikit-flat-button.disabled .lol-uikit-flat-button-flare,\n:host .lol-uikit-flat-button.disabled .lol-uikit-flat-button-glow,\n:host .lol-uikit-flat-button.disabled .lol-uikit-flat-button-sheen-wrapper,\n:host .lol-uikit-flat-button.disabled .lol-uikit-flat-button-bg {\n  display: none;\n}\n:host .lol-uikit-flat-button.disabled .lol-uikit-flat-button-border-transition {\n  transition: opacity 300ms linear;\n  opacity: 0;\n}\n:host .lol-uikit-flat-button.disabled .lol-uikit-flat-button-border-idle {\n  opacity: 0;\n}\n:host .lol-uikit-flat-button.disabled .lol-uikit-flat-button-content-wrapper.external::after {\n  background: var(--flat-button-disabled-color);\n}\n:host .lol-uikit-flat-button.no-min-height {\n  min-height: 0;\n}\n:host .lol-uikit-flat-button.no-padding {\n  padding: 0 0;\n}\n:host .lol-uikit-flat-button.back {\n  background-image: url("/fe/lol-uikit/images/back.png");\n  background-position: center;\n  background-repeat: no-repeat;\n}\n:host .lol-uikit-flat-button.back:hover {\n  background-image: url("/fe/lol-uikit/images/back-hover.png");\n}\n:host .lol-uikit-flat-button.back.disabled,\n:host .lol-uikit-flat-button.back:active {\n  background-image: url("/fe/lol-uikit/images/back-disabled.png");\n}\n.lol-uikit-flat-button-wrapper {\n  min-width: inherit;\n  width: inherit;\n  height: 100%;\n  position: relative;\n}\n.lol-uikit-flat-button-inner {\n  height: var(--flat-button-inner-height);\n}\n:host(:not([type=next]):not([type=purchase])) .primary:not(.back):not(.disabled) {\n  background: linear-gradient(to bottom, #5a401f 0%, #332717 100%);\n}\n:host(:not([type=next]):not([type=purchase])) .primary:not(.back):not(.disabled) .lol-uikit-flat-button-bg {\n  background: linear-gradient(to bottom, #604522 0%, #846745 100%);\n}\n:host(:not([type=next]):not([type=purchase])) .primary:not(.back):not(.disabled).down {\n  color: #785a28;\n  background: linear-gradient(to bottom, #362715 0%, #17130e 100%);\n}\n:host(:not([type=next]):not([type=purchase])) .primary:not(.back):not(.disabled).down .lol-uikit-flat-button-content-wrapper.external::after {\n  background: #785a28;\n}\n:host(:not([type=next]):not([type=purchase])) .secondary:not(.disabled) {\n  border-width: 1px;\n  text-transform: none;\n}\n:host(:not([type=next]):not([type=purchase])) .secondary:not(.disabled).hover .lol-uikit-flat-button-content-wrapper {\n  color: #f0e6d2;\n}\n:host(:not([type=next]):not([type=purchase])) .secondary:not(.disabled).click .lol-uikit-flat-button-content-wrapper {\n  color: #e4e1d8;\n}\n:host(:not([type=next]):not([type=purchase])) .secondary:not(.disabled).down .lol-uikit-flat-button-content-wrapper {\n  color: #5c5b57;\n}\n:host(:not([type=next]):not([type=purchase])) .secondary:not(.disabled) .lol-uikit-flat-button-border-idle {\n  border-width: 1px;\n  top: -1px;\n  left: -1px;\n}\n:host(:not([type=next]):not([type=purchase])) .secondary:not(.disabled) .lol-uikit-flat-button-border-transition {\n  border-width: 1px;\n  top: -1px;\n  left: -1px;\n}\n:host(:not([type=next]):not([type=purchase])) .secondary:not(.disabled) .lol-uikit-flat-button-content-wrapper {\n  color: #cdbe91;\n}\n:host([type=purchase]:not([type=next])) .primary:not(.back):not(.disabled) {\n  background: linear-gradient(to bottom, rgba(255,44,170,0.3) 0%, rgba(255,44,170,0) 100%), #1e2328;\n  color: #fde9f8;\n}\n:host([type=purchase]:not([type=next])) .primary:not(.back):not(.disabled) .lol-uikit-flat-button-bg {\n  background: linear-gradient(to bottom, rgba(255,44,170,0.3) 0%, rgba(255,44,170,0) 100%), #1e2328;\n}\n:host([type=purchase]:not([type=next])) .primary:not(.back):not(.disabled) .lol-uikit-flat-button-border-idle {\n  border-image: linear-gradient(to bottom, rgba(245,155,247,0.8) 0%, rgba(232,216,227,0.8) 0.01%, rgba(237,153,239,0.8) 100%);\n  border-image-slice: 1;\n}\n:host([type=purchase]:not([type=next])) .primary:not(.back):not(.disabled).hover {\n  color: #fde9f8;\n  background: linear-gradient(to bottom, rgba(255,44,170,0.5) 0%, rgba(255,44,170,0) 100%), #1e2328;\n}\n:host([type=purchase]:not([type=next])) .primary:not(.back):not(.disabled).hover .lol-uikit-flat-button-bg {\n  background: linear-gradient(to bottom, rgba(255,44,170,0.5) 0%, rgba(255,44,170,0) 100%), #1e2328;\n}\n:host([type=purchase]:not([type=next])) .primary:not(.back):not(.disabled).hover.disabled {\n  color: #fde9f8;\n  animation: none;\n}\n:host([type=purchase]:not([type=next])) .primary:not(.back):not(.disabled).hover .lol-uikit-flat-button-border-transition {\n  border-image: linear-gradient(to bottom, #f59bf7 0%, #e8d8e3 0.01%, #ed99ef 100%);\n  border-image-slice: 1;\n}\n:host([type=purchase]:not([type=next])) .primary:not(.back):not(.disabled).disabled {\n  color: #fde9f8;\n}\n:host([type=purchase]:not([type=next])) .primary:not(.back):not(.disabled).down {\n  color: #fde9f8;\n  background: linear-gradient(to bottom, rgba(255,44,170,0.2) 0%, rgba(255,44,170,0) 100%), #1e2328;\n}\n:host([type=purchase]:not([type=next])) .primary:not(.back):not(.disabled).down .lol-uikit-flat-button-bg {\n  background: linear-gradient(to bottom, rgba(255,44,170,0.2) 0%, rgba(255,44,170,0) 100%), #1e2328;\n}\n:host([type=purchase]:not([type=next])) .primary:not(.back):not(.disabled).down .lol-uikit-flat-button-border-transition {\n  border-image: linear-gradient(to bottom, rgba(245,155,247,0.4) 0%, rgba(232,216,227,0.4) 0.01%, rgba(237,153,239,0.4) 100%);\n  border-image-slice: 1;\n}\n:host([type=purchase]:not([type=next])) .primary:not(.back):not(.disabled).down .lol-uikit-flat-button-border-idle {\n  border-image: linear-gradient(to bottom, rgba(245,155,247,0.4) 0%, rgba(232,216,227,0.4) 0.01%, rgba(237,153,239,0.4) 100%);\n  border-image-slice: 1;\n}\n:host([type=purchase]:not([type=next])) .primary:not(.back):not(.disabled).down .lol-uikit-flat-button-content-wrapper.external::after {\n  background: #fde9f8;\n}\n:host([type=next]) .lol-uikit-flat-button-wrapper .lol-uikit-flat-button-flare,\n:host([type=next]) .lol-uikit-flat-button-wrapper .lol-uikit-flat-button-glow,\n:host([type=next]) .lol-uikit-flat-button-wrapper .lol-uikit-flat-button-border-idle,\n:host([type=next]) .lol-uikit-flat-button-wrapper .lol-uikit-flat-button-border-transition,\n:host([type=next]) .lol-uikit-flat-button-wrapper .lol-uikit-flat-button-sheen-wrapper,\n:host([type=next]) .lol-uikit-flat-button-wrapper .lol-uikit-flat-button-bg {\n  display: none;\n}\n:host([type=next]) .lol-uikit-flat-button-wrapper .lol-uikit-flat-button-inner {\n  -webkit-clip-path: polygon(0% 0%, calc(100% - 17px) 0%, calc(100% - 1px) 50%, calc(100% - 17px) 100%, 0% 100%);\n}\n:host([type=next]) .lol-uikit-flat-button-wrapper .lol-uikit-flat-button-inner .lol-uikit-flat-button {\n  -webkit-clip-path: polygon(0% 0%, calc(100% - 19px) 0%, calc(100% - 4px) 50%, calc(100% - 19px) 100%, 0% 100%);\n}\n:host([type=next]) .lol-uikit-flat-button-wrapper:active .lol-uikit-flat-button-inner {\n  background: linear-gradient(to top, #005a82 0%, #08495f 50%, #0d404c 100%);\n}\n:host([type=next]) .lol-uikit-flat-button-wrapper:active .lol-uikit-flat-button-inner .lol-uikit-flat-button {\n  color: #005a82;\n}\n:host([type=next]) .lol-uikit-flat-button-wrapper.disabled .lol-uikit-flat-button-inner {\n  background: var(--flat-button-disabled-color);\n}\n:host([type=next]) .lol-uikit-flat-button-wrapper.disabled .lol-uikit-flat-button-inner .lol-uikit-flat-button {\n  color: var(--flat-button-disabled-color);\n  background: #1e2328;\n}\n:host([type=next]) .lol-uikit-flat-button-extra {\n  position: absolute;\n}\n:host([type=next]):host([box-outline]) .lol-uikit-flat-button-extra {\n  width: 20px;\n  right: 0;\n  top: 0;\n  bottom: 0;\n  border: 2px solid #0a323c;\n  border-left: 0;\n}\n:host([type=next]):host([box-outline]) .disabled .lol-uikit-flat-button-extra {\n  border: 2px solid #1e2328;\n}\n:host([type=next]) .lol-uikit-flat-button-inner {\n  position: relative;\n  background: linear-gradient(to top, #005a82 0%, #0596aa 50%, #08b1b2 100%);\n  padding: 2px 0 2px 2px;\n}\n:host([type=next]) .lol-uikit-flat-button-inner .lol-uikit-flat-button {\n  border: 0;\n  padding-right: 31px;\n  color: #a3c7c7;\n  min-height: 28px;\n  box-shadow: 0 0 1px 0px #010a13, inset 0 0 1px 1px #010a13;\n}\n:host([type=next]) .lol-uikit-flat-button-inner .lol-uikit-flat-button:hover {\n  color: #cdfafa;\n}\n:host([type=next]) .lol-uikit-flat-button-inner .lol-uikit-flat-button.click {\n  animation: none;\n}\n:host([type=next]) .lol-uikit-flat-button-inner:hover {\n  background: linear-gradient(to top, #3097c6 0%, #0ecaba 50%, #cdfafa 100%);\n}\n', ""]), t.exports = o
        }, t => {
            "use strict";
            t.exports = '<template>\r\n  <div class="lol-uikit-arrow-button">\r\n    <div class="arrow-button-container">\r\n      <div class="border-arrow-icon border-arrow-icon-disabled"></div>\r\n      <div class="border-arrow-icon border-arrow-icon-default"></div>\r\n      <div class="border-arrow-icon border-arrow-icon-hover"></div>\r\n      <div class="border-arrow-icon border-arrow-icon-clicked"></div>\r\n    </div>\r\n  </div>\r\n</template>\r\n'
        }, (t, e, n) => {
            var i = n(9),
                o = n(10)(i);
            o.push([t.id, ':host {\n  display: block;\n  height: 48px;\n  width: 48px;\n}\n:host .lol-uikit-arrow-button {\n  display: block;\n  position: relative;\n  width: 100%;\n  height: 100%;\n  cursor: pointer;\n}\n:host .lol-uikit-arrow-button.left .arrow-button-container {\n  transform: rotateY(180deg);\n}\n:host .lol-uikit-arrow-button.disabled {\n  cursor: default;\n}\n:host .lol-uikit-arrow-button.disabled .arrow-button-container .border-arrow-icon {\n  opacity: 0;\n}\n:host .lol-uikit-arrow-button.disabled .arrow-button-container .border-arrow-icon-disabled {\n  opacity: 1;\n}\n:host .lol-uikit-arrow-button.disabled .arrow-button-container:hover .border-arrow-icon,\n:host .lol-uikit-arrow-button.disabled .arrow-button-container:active .border-arrow-icon {\n  opacity: 0;\n}\n:host .lol-uikit-arrow-button.disabled .arrow-button-container:hover .border-arrow-icon-disabled,\n:host .lol-uikit-arrow-button.disabled .arrow-button-container:active .border-arrow-icon-disabled {\n  opacity: 1;\n}\n:host .lol-uikit-arrow-button .arrow-button-container {\n  display: block;\n  width: 100%;\n  height: 100%;\n  box-sizing: border-box;\n  margin-top: 2px;\n  margin-bottom: 2px;\n}\n:host .lol-uikit-arrow-button .arrow-button-container .border-arrow-icon {\n  position: absolute;\n  width: 100%;\n  height: 100%;\n  background-size: contain;\n  background-repeat: no-repeat;\n  transition: 0.3s all ease;\n  opacity: 0;\n}\n:host .lol-uikit-arrow-button .arrow-button-container .border-arrow-icon-default {\n  background-image: url("/fe/lol-uikit/images/border-arrow-up.png");\n  opacity: 1;\n}\n:host .lol-uikit-arrow-button .arrow-button-container .border-arrow-icon-hover {\n  background-image: url("/fe/lol-uikit/images/border-arrow-hover.png");\n}\n:host .lol-uikit-arrow-button .arrow-button-container .border-arrow-icon-clicked {\n  background-image: url("/fe/lol-uikit/images/border-arrow-click.png");\n}\n:host .lol-uikit-arrow-button .arrow-button-container .border-arrow-icon-disabled {\n  background-image: url("/fe/lol-uikit/images/border-arrow-disabled.png");\n  opacity: 1;\n  transition: none;\n}\n:host .lol-uikit-arrow-button .arrow-button-container:hover .border-arrow-icon {\n  opacity: 0;\n}\n:host .lol-uikit-arrow-button .arrow-button-container:hover .border-arrow-icon-hover {\n  opacity: 1;\n}\n:host .lol-uikit-arrow-button .arrow-button-container:active .border-arrow-icon {\n  opacity: 0;\n}\n:host .lol-uikit-arrow-button .arrow-button-container:active .border-arrow-icon-clicked {\n  opacity: 1;\n}\n', ""]), t.exports = o
        }, (t, e, n) => {
            "use strict";
            Object.defineProperty(e, "__esModule", {
                value: !0
            }), e.default = void 0;
            var i = n(1);
            class o extends i.webComponents.ShadowElement {
                templateMarkup() {
                    return n(26)
                }
                stylesheetMarkup() {
                    return n(27)
                }
            }
            o.tagName = "lol-uikit-backdrop-magic";
            var r = o;
            e.default = r
        }, t => {
            "use strict";
            t.exports = '<template>\r\n  <div class="wrapper">\r\n    <slot></slot>\r\n  </div>\r\n</template>\r\n'
        }, (t, e, n) => {
            var i = n(9),
                o = n(10)(i);
            o.push([t.id, '/* make the backdrop element fill the parent element */\n:host {\n  display: flex;\n  flex-direction: column;\n  height: 100%;\n  width: 100%;\n}\n:host .wrapper {\n  flex: 1 1 auto;\n  position: relative;\n  background-color: #000;\n  background-image: url("/fe/lol-static-assets/images/uikit/backdrop-magic/backdrop-magic.png");\n  background-repeat: no-repeat;\n}\n', ""]), t.exports = o
        }, (t, e, n) => {
            "use strict";
            Object.defineProperty(e, "__esModule", {
                value: !0
            }), e.default = void 0;
            var i, o = (i = n(29)) && i.__esModule ? i : {
                    default: i
                },
                r = function(t, e) {
                    if (!e && t && t.__esModule) return t;
                    if (null === t || "object" != typeof t && "function" != typeof t) return {
                        default: t
                    };
                    var n = a(e);
                    if (n && n.has(t)) return n.get(t);
                    var i = {},
                        o = Object.defineProperty && Object.getOwnPropertyDescriptor;
                    for (var r in t)
                        if ("default" !== r && Object.prototype.hasOwnProperty.call(t, r)) {
                            var s = o ? Object.getOwnPropertyDescriptor(t, r) : null;
                            s && (s.get || s.set) ? Object.defineProperty(i, r, s) : i[r] = t[r]
                        } i.default = t, n && n.set(t, i);
                    return i
                }(n(34)),
                s = n(1);

            function a(t) {
                if ("function" != typeof WeakMap) return null;
                var e = new WeakMap,
                    n = new WeakMap;
                return (a = function(t) {
                    return t ? n : e
                })(t)
            }
            const l = {};
            Object.keys(r.VideoTransitionMethods).forEach((function(t) {
                l[t.toLowerCase()] = r.VideoTransitionMethods[t]
            }));
            class d extends s.webComponents.ShadowElement {
                templateMarkup() {
                    return n(37)
                }
                static get observedAttributes() {
                    return ["selector", "preloading", "playing", "paused", "unloading", "non-media-duration", "ended"]
                }
                disconnectedCallback() {
                    super.disconnectedCallback(), this.deactivate()
                }
                activate() {
                    this.token = {};
                    const t = this.getRequestedState(),
                        e = this.getElements();
                    for (let n = 0; n < e.length; n++) {
                        const i = e[n];
                        if (r.default.detect(i)) {
                            if (i.playbackState.toLowerCase() === t) continue;
                            i[l[t]]()
                        }
                    }
                    this.attachSwitchChangeHandlers()
                }
                getRequestedState() {
                    for (let t = 0; t < this.attributes.length; t++) {
                        const e = this.attributes[t];
                        if (e.name in l) return e.name
                    }
                }
                deactivate() {
                    this.token = void 0, this.removeSwitchChangeHandlers && this.removeSwitchChangeHandlers()
                }
                attachSwitchChangeHandlers() {
                    const t = this.getSwitches(),
                        {
                            token: e
                        } = this,
                        n = () => {
                            this.token === e && (this.deactivate(), this.activate())
                        };
                    for (let e = 0; e < t.length; e++) {
                        t[e].subscribeVisibleNodesChanged(n)
                    }
                    this.removeSwitchChangeHandlers && this.removeSwitchChangeHandlers(), this.removeSwitchChangeHandlers = () => {
                        for (let e = 0; e < t.length; e++) {
                            t[e].unsubscribeVisibleNodesChanged(n)
                        }
                    }
                }
                getSwitches() {
                    const t = [],
                        e = this.getSelectedElements();
                    for (let n = 0; n < e.length; n++) {
                        let i = e[n];
                        for (; i && "getVisibleNodes" in i;) t.push(i), i = i.getVisibleNodes()[0]
                    }
                    return t
                }
                getElements() {
                    const t = this.getSelectedElements();
                    for (let e = 0; e < t.length; e++) {
                        let n = t[e];
                        for (; n && "getVisibleNodes" in n;) n = n.getVisibleNodes()[0];
                        t[e] = n
                    }
                    return t.filter((function(t) {
                        return t
                    }))
                }
                getSelectedElements() {
                    const t = o.default.getStateMachine(this),
                        e = this.getAttribute("selector");
                    let n;
                    return n = e && "" !== e ? [t.querySelector(":scope " + e)] : t.getVisibleNodes(), n
                }
            }
            d.tagName = "uikit-behavior-media";
            var c = d;
            e.default = c
        }, (t, e, n) => {
            "use strict";
            Object.defineProperty(e, "__esModule", {
                value: !0
            }), e.default = void 0;
            var i = n(1),
                o = s(n(30)),
                r = s(n(32));

            function s(t) {
                return t && t.__esModule ? t : {
                    default: t
                }
            }
            class a extends o.default {
                templateMarkup() {
                    return n(33)
                }
                constructor() {
                    super(), this.matchString = "state", this.state = this.getAttribute("state"), this.statePromise = new r.default, this.parameterChangedHandlers = []
                }
                connectedCallback() {
                    super.connectedCallback(), this.activateState(), this.updateCase()
                }
                attributeChangedCallback(t, e, n) {
                    super.attributeChangedCallback(t, e, n), e !== n && ("state" === t && (this.hasAttribute("log") && i.logger.trace("uikit-state-machine: changing state", {
                        oldValue: e,
                        newValue: n
                    }), this.activateState(n)), this.onParameterChanged(t, e, n))
                }
                onParameterChanged(t, e, n) {
                    const i = this.parameterChangedHandlers.slice(0);
                    for (let o = 0; o < i.length; o++) i[o](t, e, n)
                }
                subscribeParameterChanged(t) {
                    -1 === this.parameterChangedHandlers.indexOf(t) && this.parameterChangedHandlers.push(t)
                }
                unsubscribeParameterChanged(t) {
                    const e = this.parameterChangedHandlers.indexOf(t); - 1 !== e && this.parameterChangedHandlers.splice(e, 1)
                }
                isActive(t = void 0) {
                    return void 0 !== this.activeTransitionTokens && (!t || -1 !== this.activeTransitionTokens.indexOf(t))
                }
                deactivateState(t = this.state) {
                    this.activeTransitionTokens = void 0, this.getStateDescription(t).forEach((t => {
                        t.deactivate && t.deactivate()
                    }))
                }
                activateState(t = this.state) {
                    t !== this.state && this.deactivateState(this.state), this.state = t;
                    let e = !1;
                    const n = this.getStateDescription(t),
                        i = [];
                    this.activeTransitionTokens = i;
                    for (let t = 0; t < n.length; t++) {
                        if (e) return;
                        const o = n[t],
                            r = {};
                        o.activate && (i.push(r), o.activate((t => {
                            this.isActive(r) && (e = !0, this.changeState(t))
                        })))
                    }
                }
                getStateDescription(t = this.state, e = !1) {
                    if (!(t = this.getState(t))) return [];
                    const n = [];
                    for (let i = 0; i < t.childNodes.length; i++) {
                        const o = t.childNodes[i];
                        !o.activate || e && !o.getNextState || n.push(o)
                    }
                    return n
                }
                getActiveConditions() {
                    let t = [];
                    return (this.getStateDescription(this.state, !0) || []).forEach((function(e) {
                        t = t.concat(e.getActiveConditions())
                    })), t
                }
                eagerPromise(t) {
                    const e = this.statePromise,
                        n = new r.default(t);
                    this.statePromise = n, e.then(n)
                }
                changeState(t) {
                    this.deactivateState(), this.eagerPromise((e => {
                        const n = this.getState(t);
                        n || i.logger.error("uikit-state-machine: Invalid state", t), n && n.hasAttribute("synchronous") ? e() : requestAnimationFrame((() => requestAnimationFrame(e))), this.setAttribute("state", t)
                    }))
                }
                getState(t = this.state) {
                    return this.querySelector(':scope > uikit-states > uikit-state[name="' + t + '"]')
                }
                static getStateMachine(t) {
                    for (; t;) {
                        if (t instanceof a) return t;
                        t = t.parentNode
                    }
                }
            }
            a.tagName = "uikit-state-machine";
            var l = a;
            e.default = l
        }, (t, e, n) => {
            "use strict";
            Object.defineProperty(e, "__esModule", {
                value: !0
            }), e.default = void 0;
            var i = n(1);
            let o = 1;
            const r = function() {
                    let t = [];
                    this.matchGroups.forEach((function(e) {
                        t = t.concat(Array.from(e.childNodes))
                    }));
                    const e = a.call(this, t);
                    return t = t.concat(Array.from(e.values())), t.filter((function(t) {
                        return 1 === t.nodeType
                    }))
                },
                s = function(t) {
                    this.cachedValue !== t && (this.cachedValue = t, this.updateCase())
                };

            function a(t) {
                const e = new Map;
                this.removedElements.forEach((t => {
                    const n = this.elementStates.get(t);
                    n && n.commentNode ? e.set(n.commentNode, t) : e.set({}, t)
                }));
                for (let n = 0; n < t.length; n++) {
                    const i = t[n],
                        o = e.get(i);
                    o && (e.delete(i), t[n] = o)
                }
                return e
            }
            const l = function(t, e = this.isVisible(t), n) {
                n = n || t.getAttribute("visibility") || this.defaultVisibility;
                let i = this.elementStates.get(t);
                if (!i || i.method !== n || i.visible !== e) {
                    switch (i || (i = {
                            method: n,
                            visible: e,
                            parent: t.parentNode
                        }, this.elementStates.set(t, i)), n) {
                        case "hidden":
                            d.call(this, t, e);
                            break;
                        case "invisible":
                            c.call(this, t, e);
                            break;
                        case "removed":
                            u.call(this, t, e)
                    }
                    return i.method === n || i.visible || l.call(this, t, !0, i.method), i.visible = e, e
                }
            };

            function d(t, e) {
                const n = this.elementStates.get(t);
                e ? t.style.display = n.initialDisplay : (n.initialDisplay = "" !== t.style.display ? t.style.display : null, t.style.display = "none")
            }

            function c(t, e) {
                const n = this.elementStates.get(t);
                e ? (t.style.opacity = n.initialOpacity, t.style.pointerEvents = n.initialPointerEvents) : (n.initialOpacity = "" !== t.style.opacity ? t.style.opacity : null, n.initialPointerEvents = "" !== t.style.pointerEvents ? t.style.pointerEvents : null, t.style.opacity = "0", t.style.pointerEvents = "none")
            }

            function u(t, e) {
                const n = this.elementStates.get(t);
                let {
                    commentNode: i
                } = n;
                const o = t.parentNode || i && i.parentNode || n.parent;
                if (n.parent = o, e) {
                    if (!i) return;
                    this.removedElements.splice(this.removedElements.indexOf(t), 1), o.insertBefore(t, i), o.removeChild(i), n.commentNode = void 0
                } else {
                    if (!i) {
                        let e = this.removedElements.indexOf(t);
                        e = -1 === e ? this.removedElements.indexOf(void 0) : e, e = -1 === e ? this.removedElements.length : e, this.removedElements[e] = t, i = document.createComment(this.nodeId + "-" + e), n.commentNode = i
                    }
                    o !== i.parentNode && (o.insertBefore(i, t), o.removeChild(t))
                }
            }
            class p extends i.webComponents.ShadowElement {
                templateMarkup() {
                    return n(31)
                }
                setAttribute(t, e) {
                    const n = this.getAttribute(t);
                    super.setAttribute(t, e), this.attributeChangedCallback(t, n, e)
                }
                constructor() {
                    super(), this.matchString = this.getAttribute("match-string") || this.matchString || "value", this.setMatchNumber(), this.matchGroups = [this], this.defaultVisibility = this.getAttribute("default-visibility") || this.defaultVisibility || "hidden", this.overlapped = this.overlapped || !0, this.elementStates = new WeakMap, this.removedElements = [], this.nodeId = ++o, this.visibleNodesChangedHandlers = [], s.call(this, this.getAttribute(this.matchString))
                }
                connectedCallback() {
                    super.connectedCallback(), s.call(this, this.getAttribute(this.matchString))
                }
                attributeChangedCallback(t, e, n) {
                    super.attributeChangedCallback(t, e, n), e !== n && (t === this.matchString ? s.call(this, n) : "match-string" === t ? (this.matchString = n, this.updateCase()) : "match-number" === t ? (this.setMatchNumber(n), this.updateCase()) : "default-visibility" === t && (this.defaultVisibility = n, this.updateCase()))
                }
                addWatchedDOMNode(t) {
                    -1 === this.matchGroups.indexOf(t) && (this.matchGroups.push(t), this.updateCase())
                }
                removeWatchedDOMNode(t, e = !1) {
                    const n = this.matchGroups.indexOf(t);
                    if (-1 !== n) {
                        this.matchGroups.splice(n, 1);
                        for (let n = 0; n < t.childNodes.length; n++) {
                            const i = t.childNodes[n],
                                o = this.elementStates.get(i);
                            !o || o.visible || e || l.call(this, i, !0, o.method), this.elementStates.delete(i)
                        }
                    }
                }
                getVisibleNodes(t = this.cachedValue, e = r.call(this)) {
                    return (e = e.filter((e => this.isVisible(e, t)))).filter(((t, e) => e < this.matchNumber))
                }
                onVisibleNodesChanged() {
                    const t = this.visibleNodesChangedHandlers.slice(0);
                    for (let e = 0; e < t.length; e++) t[e]()
                }
                subscribeVisibleNodesChanged(t) {
                    -1 === this.visibleNodesChangedHandlers.indexOf(t) && this.visibleNodesChangedHandlers.push(t)
                }
                unsubscribeVisibleNodesChanged(t) {
                    const e = this.visibleNodesChangedHandlers.indexOf(t); - 1 !== e && this.visibleNodesChangedHandlers.splice(e, 1)
                }
                updateCase() {
                    const t = r.call(this),
                        e = this.getVisibleNodes(this.cachedValue, t),
                        n = i.Lodash.difference(t, e);
                    if (this.overlapped) {
                        for (let t = 0; t < e.length; t++) l.call(this, e[t], !0);
                        for (let t = 0; t < n.length; t++) l.call(this, n[t], !1)
                    } else {
                        for (let t = 0; t < n.length; t++) l.call(this, n[t], !1);
                        for (let t = 0; t < e.length; t++) l.call(this, e[t], !0)
                    }
                    this.onVisibleNodesChanged()
                }
                matches(t) {
                    return 1 === t.nodeType && t.hasAttribute("visible-" + this.matchString)
                }
                isVisible(t, e = this.cachedValue) {
                    const n = t.getAttribute("visible-" + this.matchString);
                    if ("*" === n) return !0;
                    {
                        const t = n && n.split(",");
                        return t && -1 !== t.indexOf(e)
                    }
                }
                setMatchNumber(t) {
                    if (null == t) {
                        if (void 0 !== this.matchNumber) return;
                        null === (t = this.getAttribute("match-number")) && (t = Number.MAX_SAFE_INTEGER)
                    }
                    switch (t) {
                        case "all":
                            this.matchNumber = Number.MAX_SAFE_INTEGER;
                            break;
                        case "none":
                            this.matchNumber = 0;
                            break;
                        case "any":
                            this.matchNumber = 1;
                            break;
                        default:
                            this.matchNumber = parseInt(t)
                    }
                }
            }
            p.tagName = "uikit-switch";
            var h = p;
            e.default = h
        }, t => {
            "use strict";
            t.exports = "<template>\r\n  <slot></slot>\r\n</template>\r\n"
        }, t => {
            "use strict";
            const e = function(t) {
                this.state = "pending", this.nextPromises = [], this.catchPromises = [], t ? this.resolver = t : this.resolve()
            };
            e.prototype.handle = function() {
                if (this.resolver)
                    if (this.resolver.length) this.resolver((t => {
                        this.resolve(t)
                    }), (t => {
                        this.reject(t)
                    }));
                    else {
                        let t;
                        try {
                            t = this.resolver()
                        } catch (t) {
                            return void this.reject(t)
                        }
                        this.resolve(t)
                    }
            }, e.prototype.then = function(t) {
                return "function" == typeof t && (t = new e(t)), t.parent = this, "resolved" === this.state ? this.nextPromises.length ? this.nextPromises.push(t) : t.handle() : this.nextPromises.push(t), t
            }, e.prototype.resolve = function(t) {
                if ("pending" === this.state)
                    if (this.parent = void 0, t && t.then) this.resolver = function() {}, t.then(this);
                    else
                        for (this.state = "resolved"; this.nextPromises.length;) {
                            this.nextPromises.shift().handle()
                        }
            }, e.prototype.reject = function(t) {
                if ("pending" === this.state)
                    for (this.parent = void 0, this.state = "rejected"; this.catchPromises.length;) {
                        this.catchPromises.shift().handle(t)
                    }
            }, e.prototype.cancel = function() {
                if (this.resolver && (this.resolver = void 0), this.onCancel && this.onCancel(), this.nextPromises) {
                    const {
                        nextPromises: t
                    } = this;
                    this.nextPromises = [], t.forEach((function(t) {
                        t.parent = void 0, t.cancel()
                    }))
                }
                this.parent && this.parent.cancel()
            }, e.chain = function(t) {
                let n, i, o = this.statePromise;
                if (o || (o = new e), t instanceof e)
                    for (i = t, n = t; i.parent && i.parent !== o;) i = i.parent;
                else n = new e(t), i = n;
                this.statePromise = n, o.then(i)
            }, t.exports = e
        }, t => {
            "use strict";
            t.exports = "<template>\r\n  <slot></slot>\r\n</template>\r\n"
        }, (t, e, n) => {
            "use strict";
            Object.defineProperty(e, "__esModule", {
                value: !0
            }), e.default = e.VideoTransitionMethods = e.VideoReadyStates = e.VideoPlaybackStates = void 0;
            var i = n(1),
                o = s(n(32)),
                r = s(n(35));

            function s(t) {
                return t && t.__esModule ? t : {
                    default: t
                }
            }
            const a = ["autoplay", "src", "loop"],
                l = {
                    Playing: "Playing",
                    Paused: "Paused",
                    Ended: "Ended",
                    Error: "Error"
                };
            e.VideoPlaybackStates = l;
            const d = {
                HAVE_NOTHING: 0,
                HAVE_METADATA: 1,
                HAVE_CURRENT_DATA: 2,
                HAVE_FUTURE_DATA: 3,
                HAVE_ENOUGH_DATA: 4
            };
            e.VideoReadyStates = d;
            e.VideoTransitionMethods = {
                Playing: "play",
                Paused: "pause",
                Ended: "play",
                Unloading: "unload",
                Preloading: "preload"
            };
            const c = new Map;
            class u extends i.webComponents.ShadowElement {
                templateMarkup() {
                    return n(36)
                }
                static get observedAttributes() {
                    return ["src", "cache-name", "loop", "preload", "autoplay"]
                }
                constructor() {
                    super(), this.stateChangedHandlers = [], this.playbackState = l.Paused, this.readyState = d.HAVE_NOTHING
                }
                connectedCallback() {
                    if (super.connectedCallback(), this.hasAttribute("preload") && this.createVideoElement(), this._videoEl)
                        for (let t = 0; t < this.stateChangedHandlers.length; t++) {
                            const e = c.get(this.stateChangedHandlers[t]);
                            if (this.isPlaybackState(e)) {
                                if (e === l.Playing) return void this._videoEl.play();
                                break
                            }
                        }
                }
                disconnectedCallback() {
                    super.disconnectedCallback(), this.unload(), this.playbackState !== l.Ended && this.playbackState !== l.Paused && this._changePlaybackState(l.Paused)
                }
                attributeChangedCallback(t, e, n) {
                    super.attributeChangedCallback(t, e, n), ("preload" === t || "src" === t && this.srcResolved || this._videoEl && -1 !== a.indexOf(t)) && this.setVideoAttributes()
                }
                addStateChangedHandler(t, e = void 0) {
                    -1 === this.stateChangedHandlers.indexOf(t) ? (this.stateChangedHandlers.push(t), c.set(t, e)) : i.logger.warning("UIKITVIDEO: handler already added", e)
                }
                removeStateChangedHandler(t) {
                    const e = this.stateChangedHandlers.indexOf(t); - 1 !== e && (this.stateChangedHandlers.splice(e, 1), c.delete(t))
                }
                when(t, e, n) {
                    const i = {};
                    if (e || n || (i.promise = new Promise((function(t, i) {
                            e = t, n = i
                        }))), this.matches(this.isPlaybackState(t) ? this.playbackState : this.readyState, t)) return e(), i.cancel = function() {}, i;
                    const o = (i, r, s) => {
                        this.matches(i, t) ? (this.removeStateChangedHandler(o), e()) : i === l.Error && (this.removeStateChangedHandler(o), n && n(s))
                    };
                    return this.addStateChangedHandler(o, t), i.cancel = () => {
                        this.removeStateChangedHandler(o)
                    }, i
                }
                whenEager(t) {
                    let e;
                    const n = (new o.default).then(((n, i) => {
                        e = this.when(t, n, i).cancel
                    }));
                    return n.onCancel = e, n
                }
                matches(t, e) {
                    const n = this.isPlaybackState(t);
                    return n === this.isPlaybackState(e) && (n || t === d.HAVE_NOTHING || e === d.HAVE_NOTHING ? t === e : t >= e)
                }
                _changePlaybackState(t) {
                    let e;
                    if (t === l.Error && (e = {
                            type: arguments[1],
                            data: arguments[2]
                        }, e.data.target && e.data.target.error)) {
                        if (4 === e.data.target.error.code && "" === e.data.target.getAttribute("src")) return;
                        if (2 === e.data.target.error.code) {
                            const {
                                currentTime: t
                            } = this._videoEl;
                            return this._videoEl.load(), this._videoEl.currentTime = t, void(this.playbackState === l.Playing && this._videoEl.play())
                        }
                    }
                    this._changeState(t, e)
                }
                _changeReadinessState() {
                    this._changeState()
                }
                _changeState(t = this.playbackState, e = void 0) {
                    const n = this.playbackState,
                        i = this.readyState,
                        o = this._videoEl && this._videoEl.readyState || d.HAVE_NOTHING;
                    this.readyState = o, this.playbackState = t, o !== i && this._updateStateChangedHandlers(o, i), t !== n && this._updateStateChangedHandlers(t, n, e)
                }
                _updateStateChangedHandlers() {
                    const t = this.stateChangedHandlers.slice(0);
                    for (let e = 0; e < t.length; e++) t[e].apply(this, arguments)
                }
                preload(t = void 0, e = void 0) {
                    let n = !1;
                    return t || (n = new Promise((function(e, n) {
                        t = e, n
                    }))), o.default.chain.call(this, new o.default((() => this.createVideoElement())).then((() => (this._videoEl.playbackState === l.Paused && 0 === this._videoEl.currentTime || (this._videoEl.currentTime = 0, this._videoEl.pause()), this.playbackState === l.Ended && this._changePlaybackState(l.Paused), this.whenEager(l.Paused)))).then((() => {
                        if (this.readyState !== d.HAVE_ENOUGH_DATA) return this.whenEager(d.HAVE_ENOUGH_DATA)
                    })).then((() => {
                        t()
                    }))), n
                }
                playWithEndedCallback(t) {
                    return this.play(void 0, void 0, t)
                }
                play(t = void 0, e = void 0, n = void 0) {
                    let i;
                    return t || (i = new Promise((function(e, n) {
                        t = e, n
                    }))), o.default.chain.call(this, new o.default((() => this.createVideoElement())).then(((t, e) => {
                        if (void 0 !== n && (this._videoEl.onended = n), this.playbackState === l.Playing) return void t();
                        (this._videoEl.play() || Promise.resolve()).then(t).catch(e)
                    })).then((() => this.whenEager(l.Playing))).then((() => {
                        t()
                    }))), i
                }
                playWithoutStopping(t = void 0) {
                    const e = t => {
                        !this._videoEl || t === l.Ended && this._videoEl.hasAttribute("loop") ? this.removeStateChangedHandler(e) : t === l.Paused && this.play()
                    };
                    this.addStateChangedHandler(e), this.play(t)
                }
                pause(t = void 0, e = void 0) {
                    let n;
                    return t || (n = new Promise((function(e, n) {
                        t = e, n
                    }))), o.default.chain.call(this, new o.default((() => {
                        if (this.playbackState !== l.Paused && this._videoEl) {
                            if (this.playbackState !== l.Ended) return this._videoEl.pause(), this.whenEager(l.Paused);
                            this._changePlaybackState(l.Paused)
                        } else;
                    })).then((function() {
                        t()
                    }))), n
                }
                unload(t = void 0) {
                    if (this.statePromise && (this.statePromise.cancel(), this.statePromise = void 0), this._videoEl) {
                        this._videoEl.setAttribute("src", "");
                        const t = this._videoEl;
                        delete this._videoEl, this.statePromise = void 0, this.srcResolved = void 0;
                        this.getVideoCache().release(t), this._changeState(l.Paused)
                    }
                    if (!t) return Promise.resolve();
                    t()
                }
                getVideoCache() {
                    let t = r.default;
                    const e = this.getAttribute("cache-name");
                    return e && (t = t.createCache(e)), t
                }
                isPlaybackState(t) {
                    return "string" == typeof t
                }
                onPlaying() {
                    this.hasAttribute("loop") && this.playbackState === l.Playing && this._changePlaybackState(l.Ended), this._changePlaybackState(l.Playing)
                }
                hasSrc() {
                    return this.hasAttribute("src") && "" !== this.getAttribute("src")
                }
                createVideoElement() {
                    if (this._videoEl) return this._videoEl;
                    if (!this.hasSrc()) return this.updateSrcPromise().then(this.createVideoElement.bind(this));
                    const t = this.getVideoCache(),
                        e = this.getAttribute("src"),
                        n = t.acquire(e, (t => {
                            t === this._videoEl && this.unload()
                        }));
                    n.onerror = this._changePlaybackState.bind(this, l.Error, "onerror"), n.onplaying = this.onPlaying.bind(this), n.onpause = this._changePlaybackState.bind(this, l.Paused), n.onended = this._changePlaybackState.bind(this, l.Ended);
                    const i = this._changeReadinessState.bind(this);
                    n.onloadedmetadata = i, n.oncanplay = i, n.oncanplaythrough = i, this._videoEl = n, this.setVideoAttributes();
                    for (let t = this.children.length - 1; t >= 0; t--) this.children[t] !== n && this.removeChild(this.children[t]);
                    let o;
                    return 1 !== this.children.length && this.appendChild(n), this.updateSrcPromise(), n.error && n.load(), o = n.paused ? l.Paused : l.Playing, this._changePlaybackState(o), this._videoEl
                }
                setVideoAttributes() {
                    if (!this._videoEl) return void this.createVideoElement();
                    let t = !1;
                    for (let e = 0; e < a.length; e++) {
                        const n = a[e],
                            i = this._videoEl.getAttribute(n),
                            o = this.getAttribute(n);
                        i !== o && ("src" === n ? t = !0 : this._videoEl.setAttribute(n, o))
                    }
                    t && (this.unload(), this.hasSrc() && this.createVideoElement())
                }
                updateSrcPromise() {
                    if (this.getAttribute("src")) {
                        if (this.srcResolved) {
                            const {
                                srcResolved: t
                            } = this;
                            this.srcResolved = void 0, t()
                        }
                    } else this.srcResolved || (this.srcPromise = new o.default, this.srcPromise = this.srcPromise.then((t => {
                        this.srcResolved = t
                    })));
                    return this.srcPromise
                }
                static detect(t) {
                    return t.play && t.pause && t.unload
                }
            }
            u.tagName = "uikit-video";
            var p = u;
            e.default = p
        }, (t, e) => {
            "use strict";
            Object.defineProperty(e, "__esModule", {
                value: !0
            }), e.default = e.VideoCache = e.DefaultCacheSize = e.DefaultCacheMode = e.CacheModes = void 0;
            const n = {
                LRU: "LRU",
                None: "NONE"
            };
            e.CacheModes = n;
            const i = n.LRU;
            e.DefaultCacheMode = i;
            e.DefaultCacheSize = 64;
            class o {
                constructor(t) {
                    this.owner = void 0, this.checkedOut = !1, this.videoEl = function(t) {
                        const e = document.createElement("video");
                        return e.setAttribute("src", t), e.setAttribute("preload", "auto"), e
                    }(t)
                }
                getUrl() {
                    return this.videoEl.getAttribute("src")
                }
                isCheckedOut() {
                    return this.checkedOut
                }
                checkout(t) {
                    this.checkedOut = !0, this.onRevoke = t
                }
                setOwner(t) {
                    return this.owner = t, this
                }
                clearOwner(t) {
                    this.owner = void 0, this.checkedOut = !1, this.onRevoke && (this.onRevoke(this.videoEl), this.onRevoke = void 0),
                        function(t, e) {
                            t.onstalled = null, t.onerror = null, t.onplaying = null, t.onwaiting = null, t.onpause = null, t.onended = null, t.onloadedmetadata = null, t.oncanplay = null, t.oncanplaythrough = null, t.parentNode && t.parentNode.removeChild(t), Array.from(t.attributes).forEach((function(e) {
                                "src" !== e.name && t.removeAttribute(e.name)
                            })), e ? t.src = "" : (t.error ? t.load() : t.currentTime = 0, t.setAttribute("preload", "auto"))
                        }(this.videoEl, t), t && (this.videoEl = void 0)
                }
                isOwner(t) {
                    return !this.owner || this.owner === t
                }
                release(t) {
                    this.clearOwner(t)
                }
            }
            class r {
                constructor(t = 64, e = i, n = "uikit-video-cache-unnamed", o = void 0) {
                    this.subCaches = {}, this.cachedItems = [], this.cacheMode = e, this.cacheSize = t, this.cacheName = n, this.parent = o
                }
                setCacheSize(t) {
                    for (this.cacheSize = t; this.cachedItems.length > t;)
                        if (!this._evict()) return
                }
                _getCache(t) {
                    return this.subCaches[t]
                }
                createCache(t, e = 64, i = n.None) {
                    let o = this._getCache(t);
                    return o || (o = new r(e, i, t, this), this.subCaches[t] = o, o)
                }
                _getCachedItem(t) {
                    for (let e = 0; e < this.cachedItems.length; e++) {
                        const n = this.cachedItems[e];
                        if (n.getUrl() === t && n.isOwner(this) && !n.isCheckedOut()) return n
                    }
                    return this.cache(t)
                }
                _touch(t) {
                    const e = this.cachedItems.indexOf(t); - 1 !== e && this.cachedItems.splice(e, 1), this.cachedItems.push(t)
                }
                acquire(t, e = void 0) {
                    const n = this._getCachedItem(t);
                    if (n.isOwner(this)) return this._touch(n), n.checkout(e), n.videoEl
                }
                _evict() {
                    return this.cacheMode === n.LRU ? this._evictLRU() : this.cacheMode === n.None
                }
                _evictLRU() {
                    for (let t = 0; t < this.cachedItems.length; t++) {
                        const e = this.cachedItems[t];
                        if (e.isOwner(this) && !e.isCheckedOut()) {
                            const e = this.cachedItems.splice(t, 1)[0],
                                n = !this.parent;
                            return e.release(n), e
                        }
                    }
                }
                cache(t) {
                    if (!t) return;
                    let e;
                    return this.cachedItems.length >= this.cacheSize && this._evict(), e = this.parent ? this.parent._getCachedItem(t) : "string" == typeof t ? new o(t) : t, e.setOwner(this), this.cachedItems.push(e), e
                }
                release() {
                    if (arguments.length > 0) return this.releaseVideo.apply(this, arguments);
                    for (let t = this.cachedItems.length; t >= 0; t--) {
                        const e = this.cachedItems[t];
                        e && (e.isOwner(this) && this.releaseVideo(e.videoEl))
                    }
                }
                releaseVideo(t) {
                    const e = this.cachedItems.find((function(e) {
                        return e.videoEl === t
                    }));
                    if (!e) return;
                    let n = !1,
                        i = this;
                    for (; i && (i.parent || i.cachedItems.length > i.cacheSize);) {
                        n = !i.parent;
                        const t = i.cachedItems.indexOf(e); - 1 !== t && i.cachedItems.splice(t, 1), i = i.parent
                    }
                    e.release(n)
                }
            }
            e.VideoCache = r;
            var s = new r(64, i, "uikit-video-cache-global");
            e.default = s
        }, t => {
            "use strict";
            t.exports = "<template>\r\n    <slot></slot>\r\n</template>\r\n"
        }, t => {
            "use strict";
            t.exports = "<template>\r\n</template>\r\n"
        }, (t, e, n) => {
            "use strict";
            Object.defineProperty(e, "__esModule", {
                value: !0
            }), e.default = void 0;
            var i = n(1);
            class o extends i.webComponents.ShadowElement {
                static get observedAttributes() {
                    return ["level"]
                }
                templateMarkup() {
                    return n(39)
                }
                stylesheetMarkup() {
                    return n(40)
                }
            }
            o.tagName = "lol-uikit-champion-mastery-banner";
            var r = o;
            e.default = r
        }, t => {
            "use strict";
            t.exports = '<template>\r\n  <div class="banner-size">\r\n    <div class="champion-mastery-banner"></div>\r\n  </div>\r\n</template>\r\n'
        }, (t, e, n) => {
            var i = n(9),
                o = n(10)(i);
            o.push([t.id, ':host {\n  display: block;\n}\n.banner-size {\n  position: relative;\n  padding-bottom: 158.730158730159%;\n}\n.champion-mastery-banner {\n  position: absolute;\n  width: 100%;\n  height: 124%;\n  background-repeat: no-repeat;\n  background-position: center top;\n  background-size: 100% auto;\n  animation: banner-unfurl 0.3s;\n}\n:host(:not([level])) .champion-mastery-banner {\n  background-image: url("/fe/lol-static-assets/images/uikit/champion-mastery-banner/mastery-banner-locked.png");\n  -webkit-filter: brightness(0.65);\n}\n:host([level]) .champion-mastery-banner {\n  background-image: url("/fe/lol-static-assets/images/uikit/champion-mastery-banner/mastery-banner-0.png");\n}\n:host([level=\'1\']) .champion-mastery-banner {\n  background-image: url("/fe/lol-static-assets/images/uikit/champion-mastery-banner/mastery-banner-1.png");\n}\n:host([level=\'2\']) .champion-mastery-banner {\n  background-image: url("/fe/lol-static-assets/images/uikit/champion-mastery-banner/mastery-banner-2.png");\n}\n:host([level=\'3\']) .champion-mastery-banner {\n  background-image: url("/fe/lol-static-assets/images/uikit/champion-mastery-banner/mastery-banner-3.png");\n}\n:host([level=\'4\']) .champion-mastery-banner {\n  background-image: url("/fe/lol-static-assets/images/uikit/champion-mastery-banner/mastery-banner-4.png");\n}\n:host([level=\'5\']) .champion-mastery-banner {\n  background-image: url("/fe/lol-static-assets/images/uikit/champion-mastery-banner/mastery-banner-5.png");\n}\n:host([level=\'6\']) .champion-mastery-banner {\n  background-image: url("/fe/lol-static-assets/images/uikit/champion-mastery-banner/mastery-banner-6.png");\n}\n:host([level=\'7\']) .champion-mastery-banner {\n  background-image: url("/fe/lol-static-assets/images/uikit/champion-mastery-banner/mastery-banner-7.png");\n}\n@-moz-keyframes banner-unfurl {\n  from {\n    opacity: 0;\n    top: -8%;\n  }\n  to {\n    opacity: 1;\n    top: 0;\n  }\n}\n@-webkit-keyframes banner-unfurl {\n  from {\n    opacity: 0;\n    top: -8%;\n  }\n  to {\n    opacity: 1;\n    top: 0;\n  }\n}\n@-o-keyframes banner-unfurl {\n  from {\n    opacity: 0;\n    top: -8%;\n  }\n  to {\n    opacity: 1;\n    top: 0;\n  }\n}\n@keyframes banner-unfurl {\n  from {\n    opacity: 0;\n    top: -8%;\n  }\n  to {\n    opacity: 1;\n    top: 0;\n  }\n}\n', ""]), t.exports = o
        }, (t, e, n) => {
            "use strict";
            Object.defineProperty(e, "__esModule", {
                value: !0
            }), e.default = void 0;
            var i = n(1);
            const o = "name",
                r = "title",
                s = "score",
                a = "chest-status",
                l = "chest-as-core";
            class d extends i.webComponents.ShadowElement {
                static get observedAttributes() {
                    return [o, r, s, a, l]
                }
                templateMarkup() {
                    return n(42)
                }
                stylesheetMarkup() {
                    return n(43)
                }
                connectedCallback() {
                    super.connectedCallback(), this.processName(), this.processTitle(), this.processScore(), this.processChestStatus(), this.processChestAsCore()
                }
                attributeChangedCallback(t) {
                    if (this.shadowRoot) switch (t) {
                        case o:
                            this.processName();
                            break;
                        case r:
                            this.processTitle();
                            break;
                        case s:
                            this.processScore();
                            break;
                        case a:
                            this.processChestStatus();
                            break;
                        case l:
                            this.processChestAsCore()
                    }
                }
                processName() {
                    const t = this.getAttribute(o);
                    this.shadowRoot.querySelector(".name").textContent = t || ""
                }
                processTitle() {
                    const t = this.getAttribute(r);
                    this.shadowRoot.querySelector(".title").textContent = t || ""
                }
                processScore() {
                    const t = this.getAttribute(s);
                    this.shadowRoot.querySelector(".score").textContent = t || ""
                }
                processChestStatus() {
                    const t = this.getAttribute(a);
                    this.shadowRoot.querySelector(".chest > .status").textContent = t || ""
                }
                processChestAsCore() {
                    const t = this.getAttribute(l),
                        e = this.shadowRoot.querySelector(".chest");
                    null !== t ? e.classList.add("display-as-core") : e.classList.remove("display-as-core")
                }
            }
            d.tagName = "lol-uikit-champion-mastery-tooltip";
            var c = d;
            e.default = c
        }, t => {
            "use strict";
            t.exports = '<template>\r\n\r\n  <slot name="lol-uikit-radial-progress"></slot>\r\n\r\n  <div class="info">\r\n    <h4 class="name"></h4>\r\n    <hr class="separator">\r\n    <div class="mastery">\r\n      <span class="score"></span>\r\n      <span class="title"></span>\r\n    </div>\r\n    <div class="chest">\r\n      <span class="status"></span>\r\n    </div>\r\n    <div class="detail">\r\n      <slot></slot>\r\n    </div>\r\n  </div>\r\n\r\n</template>\r\n'
        }, (t, e, n) => {
            var i = n(9),
                o = n(10)(i);
            o.push([t.id, 'h4,\n::slotted(h4) {\n  font-family: var(--font-display);\n}\n:host {\n  font-family: var(--font-body);\n}\n:host,\nh4,\n::slotted(h4) {\n  -webkit-user-select: none;\n}\n:host,\nh4,\n::slotted(h4) {\n  font-kerning: normal;\n  -webkit-font-feature-settings: "kern" 1;\n  -webkit-font-smoothing: antialiased;\n}\nh4,\n::slotted(h4) {\n  text-transform: uppercase;\n}\nh4:lang(ko-kr),\n::slotted(h4):lang(ko-kr),\nh4:lang(ja-jp),\n::slotted(h4):lang(ja-jp),\nh4:lang(tr-tr),\n::slotted(h4):lang(tr-tr),\nh4:lang(el-gr),\n::slotted(h4):lang(el-gr),\nh4:lang(th-th),\n::slotted(h4):lang(th-th),\nh4:lang(zh-tw),\n::slotted(h4):lang(zh-tw) {\n  text-transform: none;\n}\nh4,\n::slotted(h4) {\n  color: #f0e6d2;\n  font-size: 18px;\n  font-weight: 700;\n  line-height: 22px;\n  letter-spacing: 0.05em;\n}\nh4:lang(ar-ae),\n::slotted(h4):lang(ar-ae) {\n  letter-spacing: 0;\n}\n:host {\n  color: #a09b8c;\n  font-size: 12px;\n  font-weight: normal;\n  line-height: 16px;\n  letter-spacing: 0.025em;\n  -webkit-font-smoothing: subpixel-antialiased;\n}\n:host:lang(ja-jp) {\n  font-size: 13px;\n}\n:host:lang(ar-ae) {\n  letter-spacing: 0;\n}\n:host {\n  --champion-mastery-tooltip-name-text-align: initial;\n  --champion-mastery-tooltip-name-width: initial;\n  --champion-mastery-tooltip-name-font-size: 18px;\n  --champion-mastery-tooltip-name-line-height: 22px;\n  --champion-mastery-tooltip-name-letter-spacing: 0.05em;\n  --champion-mastery-tooltip-separator-display: block;\n  --champion-mastery-tooltip-separator-width: initial;\n  --champion-mastery-tooltip-separator-margin: 0 40px 0 0;\n  --champion-mastery-tooltip-separator-margin-rtl: 0 0 0 40px;\n  --champion-mastery-tooltip-separator-background-color: #463714;\n  --champion-mastery-tooltip-separator-background-size: initial;\n  --champion-mastery-tooltip-mastery-justify-content: initial;\n  --champion-mastery-tooltip-mastery-flex-direction: initial;\n  --champion-mastery-tooltip-mastery-flex-wrap: initial;\n  --champion-mastery-tooltip-mastery-score-padding: 0 7px 0 23px;\n  --champion-mastery-tooltip-mastery-score-padding-rtl: 0 23px 0 7px;\n  --champion-mastery-tooltip-mastery-score-before-right: initial;\n  --champion-mastery-tooltip-mastery-title-display: initial;\n  --champion-mastery-tooltip-detail-text-align: initial;\n  --champion-mastery-tooltip-detail-direction: initial;\n}\n:host {\n  padding: 12px 18px 12px 12px;\n  min-width: 255px;\n  display: flex;\n  flex-direction: row;\n  box-sizing: border-box;\n  white-space: nowrap;\n}\n:host .name {\n  font-size: var(--champion-mastery-tooltip-name-font-size);\n  line-height: var(--champion-mastery-tooltip-name-line-height);\n  letter-spacing: var(--champion-mastery-tooltip-name-letter-spacing);\n  text-align: var(--champion-mastery-tooltip-name-text-align);\n  width: var(--champion-mastery-tooltip-name-width);\n}\n:host .separator {\n  display: var(--champion-mastery-tooltip-separator-display);\n  border: none;\n  width: var(--champion-mastery-tooltip-separator-width);\n  height: 1px;\n  margin: var(--champion-mastery-tooltip-separator-margin);\n  background-color: var(--champion-mastery-tooltip-separator-background-color);\n  background-size: var(--champion-mastery-tooltip-separator-background-size);\n}\n:host .separator:lang(ar-ae) {\n  margin: var(--champion-mastery-tooltip-separator-margin-rtl);\n}\n:host .mastery {\n  display: flex;\n  margin: 3px 0 0 0;\n  justify-content: var(--champion-mastery-tooltip-mastery-justify-content);\n  flex-direction: var(--champion-mastery-tooltip-mastery-flex-direction);\n  flex-wrap: var(--champion-mastery-tooltip-mastery-flex-wrap);\n}\n:host .mastery > .score {\n  padding: var(--champion-mastery-tooltip-mastery-score-padding);\n}\n:host .mastery > .score::before {\n  right: var(--champion-mastery-tooltip-mastery-score-before-right);\n  margin: 0 0 0 -25px;\n  content: \'\';\n  position: absolute;\n  width: 17px;\n  height: 14px;\n  background: url("/fe/lol-uikit/images/icon-champ-tooltip-mastery.png") center no-repeat;\n  background-size: 100%;\n}\n:host .mastery > .score:lang(ar-ae) {\n  padding: var(--champion-mastery-tooltip-mastery-score-padding-rtl);\n}\n:host .mastery > .score:lang(ar-ae)::before {\n  right: 45px;\n  margin: 0 -45px 0 0;\n}\n:host .mastery > .title {\n  display: var(--champion-mastery-tooltip-mastery-title-display);\n  flex: 1 100%;\n  text-align: right;\n}\n:host .mastery > .title:lang(ar-ae) {\n  text-align: left;\n}\n:host .mastery:lang(ar-ae) {\n  position: relative;\n}\n:host .chest {\n  display: none;\n}\n:host .detail {\n  margin-top: 3px;\n  text-align: var(--champion-mastery-tooltip-detail-text-align);\n  direction: var(--champion-mastery-tooltip-detail-direction);\n}\n:host(.separator-background-image) .separator {\n  background-image: url("/fe/lol-uikit/images/title_divider.png");\n}\n:host(:lang(ar-ae)) {\n  direction: rtl;\n}\nh4,\n::slotted(h4) {\n  margin: 0;\n}\n.info {\n  flex: 1 1 auto;\n}\n.info:lang {\n  direction: rtl;\n}\n:host([chest-acquired]) .chest {\n  display: block;\n  padding: 0 0 0 23px;\n}\n:host([chest-acquired]) .chest:before {\n  content: \'\';\n  position: absolute;\n  width: 21px;\n  height: 14px;\n  background: url("/fe/lol-uikit/images/icon-chest-acquired.png") center no-repeat;\n  background-size: 100%;\n  margin-left: -24px;\n}\n:host([chest-acquired]) .chest.display-as-core:before {\n  background: url("/fe/lol-uikit/images/icon-core-acquired.png") center no-repeat;\n  background-size: 100%;\n}\n:host([chest-acquired]) .chest:lang(ar-ae) {\n  position: relative;\n  padding: 0 23px 0 0;\n  margin-right: -5px;\n}\n:host([chest-acquired]) .chest:lang(ar-ae):before {\n  right: 0;\n}\n', ""]), t.exports = o
        }, (t, e, n) => {
            "use strict";
            Object.defineProperty(e, "__esModule", {
                value: !0
            }), e.default = void 0;
            var i = n(1);
            class o extends i.webComponents.ShadowElement {
                static get observedAttributes() {
                    return ["name", "simple", "locked", "rental", "free-to-play", "loyalty-reward", "chest-acquired"]
                }
                templateMarkup() {
                    return n(45)
                }
                stylesheetMarkup() {
                    return n(46)
                }
            }
            o.tagName = "lol-uikit-champion-thumbnail";
            var r = o;
            e.default = r
        }, t => {
            "use strict";
            t.exports = '<template>\r\n  <div class="champion-thumbnail">\r\n    <slot name="lol-uikit-champion-mastery-banner"></slot>\r\n    <div class="thumbnail-square">\r\n      <slot name="lol-uikit-thumbnail"></slot>\r\n    </div>\r\n    <div class="champion-achievements">\r\n      <div class="chest-acquired-frame"></div>\r\n    </div>\r\n    <div class="champion-availability"></div>\r\n    <slot />\r\n  </div>\r\n</template>\r\n'
        }, (t, e, n) => {
            var i = n(9),
                o = n(10)(i);
            o.push([t.id, ':host {\n  font-family: var(--font-body);\n}\n:host {\n  -webkit-user-select: none;\n}\n:host {\n  font-kerning: normal;\n  -webkit-font-feature-settings: "kern" 1;\n  -webkit-font-smoothing: antialiased;\n}\n:host {\n  color: #a09b8c;\n  font-size: 12px;\n  font-weight: normal;\n  line-height: 16px;\n  letter-spacing: 0.1em;\n  -webkit-font-smoothing: subpixel-antialiased;\n}\n:host:lang(ja-jp) {\n  font-size: 13px;\n}\n:host:lang(ar-ae) {\n  letter-spacing: 0;\n}\n.champion-thumbnail {\n  position: relative;\n  display: flex;\n  flex-direction: column;\n}\n:host([name])::after {\n  white-space: nowrap;\n  position: relative;\n  top: 4px;\n  left: 50%;\n  transform: translateX(-50%);\n  display: inline-block;\n  content: attr(name);\n}\n:host(:lang(ar-ae)) {\n  left: auto;\n  right: 50%;\n  transform: translateX(50%);\n}\n.thumbnail-square {\n  order: -1;\n  position: relative;\n}\n::slotted(.lol-uikit-thumbnail) {\n  position: absolute;\n  width: 100%;\n  height: 100%;\n}\n::slotted(.lol-uikit-thumbnail):not([disabled]):not([active=\'false\']):hover {\n  cursor: pointer;\n}\n:host([locked]) ::slotted(.lol-uikit-thumbnail:not(:hover)) img {\n  -webkit-filter: brightness(0.3);\n}\n::slotted(lol-uikit-champion-mastery-banner) {\n  margin: 0 2px 0 2px;\n}\n.champion-availability {\n  position: absolute;\n  background-repeat: no-repeat;\n  background-size: contain;\n  background-position: center;\n  pointer-events: none;\n}\n:host([simple]) .champion-availability {\n  display: none;\n}\n:host([loyalty-reward]) .champion-availability {\n  width: 27px;\n  height: 32px;\n  top: -10px;\n  right: -13px;\n  background-image: url("/fe/lol-uikit/images/icon-free-to-play-reward.png");\n}\n:host([free-to-play]) .champion-availability {\n  width: 38px;\n  height: 38px;\n  top: -12px;\n  right: -18px;\n  background-image: url("/fe/lol-uikit/images/icon-free-to-play.png");\n}\n:host([rental]) .champion-availability {\n  width: 43px;\n  height: 43px;\n  top: -14px;\n  right: -21px;\n  background-image: url("/fe/lol-uikit/images/icon-rental.png");\n}\n:host([locked]) .champion-availability {\n  width: 100%;\n  height: 30px;\n  margin-top: 100%;\n  top: -14px;\n  left: 0;\n  background-image: url("/fe/lol-uikit/images/icon-lock-small.png");\n}\n.champion-achievements {\n  position: absolute;\n  pointer-events: none;\n  top: 0;\n  left: 0;\n}\n:host([chest-acquired]) .chest-acquired-frame {\n  width: 75px;\n  height: 75px;\n  margin-top: -6px;\n  margin-left: -4px;\n  background: url("/fe/lol-uikit/images/icon-chest-acquired-frame.png") no-repeat center;\n  background-size: contain;\n}\n', ""]), t.exports = o
        }, (t, e, n) => {
            "use strict";
            Object.defineProperty(e, "__esModule", {
                value: !0
            }), e.default = void 0;
            var i = n(1),
                o = s(n(19)),
                r = s(n(20));

            function s(t) {
                return t && t.__esModule ? t : {
                    default: t
                }
            }
            class a extends i.webComponents.ShadowElement {
                static get observedAttributes() {
                    return ["arrow-left", "arrow-right", "refresh", "disabled", "click-sfx-src", "hover-sfx-src", "arrow"]
                }
                templateMarkup() {
                    return n(48)
                }
                stylesheetMarkup() {
                    return n(49)
                }
                setCustomSounds() {
                    const t = this.getAttribute("hover-sfx-src"),
                        e = this.getAttribute("click-sfx-src"),
                        n = t || r.default.closeButtonHover,
                        i = e || r.default.closeButtonClick;
                    this._hoverSound = this._createSound(n), this._clickSound = this._createSound(i)
                }
                playSound(t) {
                    t && (0, i.getProvider)().get("rcp-fe-audio").getChannel("sfx-ui").playSound(t)
                }
                _createSound(t) {
                    return (0, i.getProvider)().get("rcp-fe-audio").getChannel("sfx-ui").createSound(t, {
                        allowConcurrency: !1
                    })
                }
                handleEvent(t) {
                    "MouseEvent" === t.constructor.name && (this.isDisabled() || ("mouseenter" === t.type && this._hoverSound ? this._hoverSound.play() : "click" === t.type && this._clickSound && this._clickSound.play()))
                }
                isDisabled() {
                    return null !== this.getAttribute("disabled")
                }
                constructor() {
                    super(), this.addEventListener("click", this.dispatchCloseEvent), this.addEventListener("mouseenter", this), this.addEventListener("click", this)
                }
                processAttributes() {
                    this.setCustomSounds(), this._disabledCheck(), this._handleArrowAttributes(), this._handleRefreshAttribute()
                }
                _handleRefreshAttribute() {
                    const t = this._buttonElement();
                    t && (this.hasAttribute("refresh") ? t.addClass("refresh") : t.removeClass("refresh"))
                }
                _handleArrowAttributes() {
                    const t = this._buttonElement();
                    t && (this.hasAttribute("arrow-left") ? (t.addClass("arrow"), t.addClass("arrow-left")) : this.hasAttribute("arrow-right") ? (t.addClass("arrow"), t.addClass("arrow-right")) : (t.removeClass("arrow"), t.removeClass("arrow-right"), t.removeClass("arrow-left")))
                }
                _disabledCheck() {
                    const t = this._buttonElement();
                    this.isDisabled() ? t.addClass("disabled") : t.removeClass("disabled")
                }
                _buttonElement() {
                    return (0, o.default)(this.shadowRoot.querySelector("div.lol-uikit-close-button"))
                }
                dispatchCloseEvent() {
                    this.dispatchEvent(new Event("closeButtonClick", {
                        bubbles: !0,
                        composed: !0
                    }))
                }
            }
            a.tagName = "lol-uikit-close-button";
            var l = a;
            e.default = l
        }, t => {
            "use strict";
            t.exports = '<template>\r\n  <div class="lol-uikit-close-button">\r\n    <div class="contents">\r\n      <div class="close-icon x-icon"></div>\r\n    </div>\r\n  </div>\r\n</template>\r\n'
        }, (t, e, n) => {
            var i = n(9),
                o = n(10)(i);
            o.push([t.id, ':host .lol-uikit-close-button {\n  width: 28px;\n  height: 28px;\n  border-radius: 50%;\n  background: linear-gradient(to top, #463714 4%, #785a28 23%, #c89b3c 90%, #c8aa6e 100%);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  cursor: pointer;\n}\n:host .contents {\n  width: 24px;\n  height: 24px;\n  border-radius: 50%;\n  background-color: #1e282d;\n  transition: box-shadow 150ms ease-out, color 150ms ease-out;\n}\n:host .close-icon {\n  width: 10px;\n  height: 10px;\n  transform: translate(7px, 7px);\n  -webkit-mask: url("/fe/lol-uikit/images/x-icon.png") no-repeat center;\n  -webkit-mask-size: 10px;\n  background-color: #cdbe91;\n}\n:host .lol-uikit-close-button.disabled,\n:host .lol-uikit-close-button.disabled:hover,\n:host .lol-uikit-close-button.disabled:active {\n  cursor: default;\n  background: none;\n  background-color: #5b5a56;\n}\n:host .lol-uikit-close-button.disabled .contents,\n:host .lol-uikit-close-button.disabled:hover .contents,\n:host .lol-uikit-close-button.disabled:active .contents {\n  background: none;\n  background-color: #1e282d;\n}\n:host .lol-uikit-close-button.disabled .close-icon,\n:host .lol-uikit-close-button.disabled:hover .close-icon,\n:host .lol-uikit-close-button.disabled:active .close-icon {\n  background-color: #5b5a56;\n}\n:host .lol-uikit-close-button:hover {\n  background: linear-gradient(to top, #c89b3c 0%, #f0e6d2 100%);\n}\n:host .lol-uikit-close-button:hover .contents {\n  background: linear-gradient(to top, #3c3c41 0%, #1e2328 100%);\n}\n:host .lol-uikit-close-button:hover .close-icon {\n  background-color: #f0e6d2;\n}\n:host .lol-uikit-close-button:active {\n  background: linear-gradient(to top, #785a28 0%, #463714 100%);\n}\n:host .lol-uikit-close-button:active .close-icon {\n  background-color: #785a28;\n}\n:host .lol-uikit-close-button:active .contents {\n  background: none;\n  background-color: #1e282d;\n}\n:host .lol-uikit-close-button.disabled .contents,\n:host .lol-uikit-close-button:active .contents {\n  box-shadow: none;\n  transition: none;\n}\n:host .lol-uikit-close-button.arrow {\n  width: 32px;\n  height: 32px;\n}\n:host .lol-uikit-close-button.arrow .contents {\n  width: 28px;\n  height: 28px;\n}\n:host .lol-uikit-close-button.arrow .contents .close-icon {\n  width: 7px;\n  height: 10px;\n  transform: translate(11px, 9px);\n  -webkit-mask: url("/fe/lol-uikit/images/arrow-right.png") no-repeat center;\n  -webkit-mask-size: 7px 10px;\n}\n:host .lol-uikit-close-button.arrow.arrow-left {\n  transform: scaleX(-1);\n}\n:host .lol-uikit-close-button.refresh {\n  width: 32px;\n  height: 32px;\n}\n:host .lol-uikit-close-button.refresh .contents {\n  width: 28px;\n  height: 28px;\n}\n:host .lol-uikit-close-button.refresh .contents .close-icon {\n  width: 20px;\n  height: 20px;\n  transform: translate(4px, 4px);\n  -webkit-mask: url("/fe/lol-uikit/images/refresh.png") no-repeat center;\n  -webkit-mask-size: 20px 20px;\n}\n:host([button-type="cog"]) .close-icon {\n  width: 24px;\n  height: 24px;\n  transform: translate(0px, 0px);\n  -webkit-mask: url("/fe/lol-uikit/images/icon_settings.png") no-repeat center;\n  -webkit-mask-size: 18px 18px;\n}\n:host([button-type="configure"]) .close-icon {\n  width: 20px;\n  height: 20px;\n  transform: translate(2px, 2px);\n  -webkit-mask: url("/fe/lol-uikit/images/icon_settings.png") no-repeat center;\n  -webkit-mask-size: 20px 20px;\n}\n:host([button-type="rename"]) .close-icon {\n  width: 15px;\n  height: 13px;\n  -webkit-mask: url("/fe/lol-uikit/images/icon_edit.png") no-repeat center;\n  -webkit-mask-size: 15px 13px;\n  transform: translate(5px, 5px);\n}\n:host([button-type="rename"]) .close-icon:lang(ar-ae) {\n  transform: translate(-5px, 5px);\n}\n:host([button-type="edit"]) .close-icon {\n  width: 13px;\n  height: 12px;\n  transform: translate(6px, 5px);\n  -webkit-mask: url("/fe/lol-uikit/images/icon_edit.png") no-repeat center;\n  -webkit-mask-size: 13px 12px;\n}\n:host([button-type="plus"]) .close-icon {\n  width: 10px;\n  height: 10px;\n  -webkit-mask: url("/fe/lol-uikit/images/icon_add.png") no-repeat center;\n  -webkit-mask-size: 10px 10px;\n  transform: translate(7px, 7px);\n}\n:host([button-type="plus"]) .close-icon:lang(ar-ae) {\n  transform: translate(-7px, 7px);\n}\n:host([button-type="delete"]) .close-icon {\n  width: 13px;\n  height: 15px;\n  -webkit-mask: url("/fe/lol-uikit/images/icon_delete.png") no-repeat center;\n  -webkit-mask-size: 13px 15px;\n  transform: translate(5px, 4px);\n}\n:host([button-type="delete"]) .close-icon:lang(ar-ae) {\n  transform: translate(-5px, 4px);\n}\n:host([button-type="next"]) .close-icon {\n  width: 17px;\n  height: 16px;\n  transform: translate(3px, 4px);\n  -webkit-mask: url("/fe/lol-uikit/images/icon_next.png");\n  -webkit-mask-size: 17px 16px;\n}\n:host([button-type="compare"]) .close-icon {\n  width: 24px;\n  height: 24px;\n  transform: translate(0px, 0px);\n  -webkit-mask: url("/fe/lol-uikit/images/icon_compare.png") no-repeat center;\n  -webkit-mask-size: 18px 18px;\n}\n:host([button-type="back"]) .close-icon {\n  width: 16px;\n  height: 16px;\n  transform: translate(4px, 4px);\n  -webkit-mask: url("/fe/lol-uikit/images/icon_back.png") no-repeat center;\n  -webkit-mask-size: 16px 16px;\n}\n:host([button-type="add"]) .close-icon {\n  width: 11px;\n  height: 11px;\n  transform: translate(7px, 6px);\n  -webkit-mask: url("/fe/lol-uikit/images/icon_plus.png") no-repeat center;\n  -webkit-mask-size: 11px 11px;\n}\n:host([button-type="add"]) .close-icon:lang(ar-ae) {\n  transform: translate(-6px, 6px);\n}\n:host([button-type="remove"]) .close-icon {\n  width: 11px;\n  height: 11px;\n  transform: translate(7px, 6px);\n  -webkit-mask: url("/fe/lol-uikit/images/icon_remove.png") no-repeat center;\n  -webkit-mask-size: 11px 11px;\n}\n:host([button-type="remove"]) .close-icon:lang(ar-ae) {\n  transform: translate(-6px, 6px);\n}\n:host([button-type="duplicate"]) .close-icon {\n  width: 20px;\n  height: 20px;\n  transform: translate(2px, 2px);\n  -webkit-mask: url("/fe/lol-uikit/images/icon_copy.png") no-repeat center;\n  -webkit-mask-size: 18px 18px;\n}\n:host([button-type="duplicate"]) .close-icon:lang(ar-ae) {\n  transform: translate(-2px, 2px);\n}\n:host([button-type="clear"]) .close-icon {\n  width: 17px;\n  height: 16px;\n  transform: translate(4px, 4px);\n  -webkit-mask: url("/fe/lol-uikit/images/icon_clearall.png") no-repeat center;\n  -webkit-mask-size: 17px 16px;\n}\n:host([button-type="clear"]) .close-icon:lang(ar-ae) {\n  transform: translate(-2px, 4px);\n}\n:host([button-type="export"]) .close-icon {\n  width: 17px;\n  height: 16px;\n  transform: translate(4px, 4px);\n  -webkit-mask: url("/fe/lol-uikit/images/icon_export.png") no-repeat center;\n  -webkit-mask-size: 14px 14px;\n}\n:host([button-type="export"]) .close-icon:lang(ar-ae) {\n  transform: translate(-3px, 3px);\n}\n:host([button-type="import"]) .close-icon {\n  width: 17px;\n  height: 16px;\n  transform: translate(4px, 4px);\n  -webkit-mask: url("/fe/lol-uikit/images/icon_import.png") no-repeat center;\n  -webkit-mask-size: 14px 14px;\n}\n:host([button-type="import"]) .close-icon:lang(ar-ae) {\n  transform: translate(-3px, 3px);\n}\n', ""]), t.exports = o
        }, (t, e, n) => {
            "use strict";
            Object.defineProperty(e, "__esModule", {
                value: !0
            }), e.default = void 0;
            var i = n(1);
            class o extends i.webComponents.ShadowElement {
                templateMarkup() {
                    return n(51)
                }
                stylesheetMarkup() {
                    return n(52)
                }
                connectedCallback() {
                    super.connectedCallback(), this.init()
                }
                init() {
                    window.requestAnimationFrame((() => {
                        const t = this.shadowRoot.getElementById("glow").style;
                        t.removeProperty("--animation-name"), t.removeProperty("--width"), t.removeProperty("--height");
                        const {
                            width: e,
                            height: n
                        } = this.parentElement.getBoundingClientRect();
                        t.setProperty("--width", `${e}px`), t.setProperty("--height", `${n}px`), t.setProperty("--animation-name", "animate-comet")
                    }))
                }
            }
            e.default = o, o.tagName = "lol-uikit-comet-border"
        }, t => {
            "use strict";
            t.exports = '<template>\r\n  <div id="glow">\r\n    <div id="top">\r\n      <div id="top-comet"></div>\r\n    </div>\r\n    <div id="bottom">\r\n      <div id="bottom-comet"></div>\r\n    </div>\r\n    <div id="left">\r\n      <div id="left-comet"></div>\r\n    </div>\r\n    <div id="right">\r\n      <div id="right-comet"></div>\r\n    </div>\r\n  </div>\r\n</template>\r\n'
        }, (t, e, n) => {
            var i = n(9),
                o = n(10)(i);
            o.push([t.id, ":host {\n  --border-color: transparent;\n  --border-width: 2px;\n  --comet-color: #f0e6d2;\n  --comet-length: 100px;\n  border: var(--border-width) solid var(--border-color);\n  box-sizing: border-box;\n  position: absolute;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  pointer-events: none;\n}\n#glow {\n  --animation-name: none;\n  --height: 0;\n  --width: 0;\n  height: 100%;\n  -webkit-filter: drop-shadow(0 0 1px var(--comet-color)) drop-shadow(0 0 1px var(--comet-color));\n}\n#top,\n#bottom,\n#left,\n#right {\n  overflow: hidden;\n  position: absolute;\n}\n#top,\n#bottom {\n  height: var(--border-width);\n  width: calc(100% + var(--border-width));\n}\n#top {\n  left: calc(var(--border-width) * -1);\n  top: calc(var(--border-width) * -1);\n}\n#bottom {\n  bottom: calc(var(--border-width) * -1);\n  transform: rotate(180deg);\n}\n#left,\n#right {\n  height: var(--border-width);\n  width: calc(var(--height) - var(--border-width));\n}\n#left {\n  right: calc(100% + var(--border-width) * 1);\n  transform: rotate(270deg);\n  transform-origin: 100% 0;\n}\n#right {\n  left: 100%;\n  top: calc(0% + var(--border-width) * -2);\n  transform: rotate(90deg);\n  transform-origin: 0 100%;\n}\n#left-comet,\n#right-comet,\n#top-comet,\n#bottom-comet {\n  animation-duration: 3s;\n  animation-iteration-count: infinite;\n  animation-name: var(--animation-name);\n  animation-timing-function: linear;\n  background-image: repeating-linear-gradient(270deg, transparent 0, var(--comet-color) 2px, transparent var(--comet-length), transparent calc(var(--width) + var(--height) - var(--border-width) * 2));\n  height: 100%;\n  position: absolute;\n  width: calc(var(--width) + var(--height) + var(--comet-length));\n}\n#left-comet,\n#right-comet {\n  right: 0;\n}\n#top-comet,\n#bottom-comet {\n  left: calc(var(--comet-length) * -1);\n}\n@-moz-keyframes animate-comet {\n  0% {\n    transform: translateX(0px);\n  }\n  100% {\n    transform: translateX(calc(var(--height) + var(--width) - var(--border-width) * 2));\n  }\n}\n@-webkit-keyframes animate-comet {\n  0% {\n    transform: translateX(0px);\n  }\n  100% {\n    transform: translateX(calc(var(--height) + var(--width) - var(--border-width) * 2));\n  }\n}\n@-o-keyframes animate-comet {\n  0% {\n    transform: translateX(0px);\n  }\n  100% {\n    transform: translateX(calc(var(--height) + var(--width) - var(--border-width) * 2));\n  }\n}\n@keyframes animate-comet {\n  0% {\n    transform: translateX(0px);\n  }\n  100% {\n    transform: translateX(calc(var(--height) + var(--width) - var(--border-width) * 2));\n  }\n}\n", ""]), t.exports = o
        }, (t, e, n) => {
            "use strict";
            Object.defineProperty(e, "__esModule", {
                value: !0
            }), e.default = void 0;
            var i = n(1);
            class o extends i.webComponents.ShadowElement {
                templateMarkup() {
                    return n(54)
                }
                static get observedAttributes() {
                    return ["nonsimultaneous"]
                }
                activate(t) {
                    this.activeConditionTokens = [], this.satisfiedConditions = [], this.onConditionSatisfied = t;
                    for (let t = 0; t < this.children.length; t++) {
                        const e = {
                            i: t
                        };
                        this.activeConditionTokens.push(e)
                    }
                    if (0 !== this.activeConditionTokens.length)
                        if (this.hasAttribute("nonsimultaneous")) {
                            const e = this.activeConditionTokens.slice(0);
                            for (let n = 0; n < this.children.length; n++) {
                                const i = e[n];
                                this.children[n].activate((() => {
                                    this.isActive(i) && (this.activeConditionTokens.splice(this.activeConditionTokens.indexOf(i), 1), 0 === this.activeConditionTokens.length && (t(), this.deactivate()))
                                }))
                            }
                        } else this.validateSimultaneousConditions();
                    else t()
                }
                validateSimultaneousConditions(t) {
                    t && this.satisfiedConditions ? -1 === this.satisfiedConditions.indexOf(t) && this.satisfiedConditions.push(t) : this.verificationLoop(t)
                }
                verificationLoop(t) {
                    this.satisfiedConditions = t ? [t] : [];
                    const e = this.activeConditionTokens,
                        {
                            satisfiedConditions: n
                        } = this;
                    for (let t = 0; t < this.children.length; t++) {
                        const i = e[t],
                            o = this.children[t];
                        if (-1 === n.indexOf(o) && (o.deactivate(), o.activate((() => {
                                this.isActive(i) && this.validateSimultaneousConditions(o)
                            })), -1 === n.indexOf(o))) break
                    }
                    n.length === e.length && (this.onConditionSatisfied(), this.deactivate()), this.satisfiedConditions = void 0
                }
                isActive(t) {
                    return void 0 === t ? !(!this.activeConditionTokens || !this.activeConditionTokens.length) : this.activeConditionTokens && -1 !== this.activeConditionTokens.indexOf(t)
                }
                deactivate() {
                    this.activeConditionTokens = void 0;
                    for (let t = 0; t < this.children.length; t++) {
                        this.children[t].deactivate()
                    }
                }
            }
            o.tagName = "uikit-condition-all";
            var r = o;
            e.default = r
        }, t => {
            "use strict";
            t.exports = "<template>\r\n  <slot></slot>\r\n</template>\r\n"
        }, (t, e, n) => {
            "use strict";
            Object.defineProperty(e, "__esModule", {
                value: !0
            }), e.default = void 0;
            var i = n(1);
            class o extends i.webComponents.ShadowElement {
                templateMarkup() {
                    return n(56)
                }
                activate(t) {
                    const e = {};
                    this.token = e;
                    const n = () => {
                        this.isActive(e) && (this.deactivate(), t())
                    };
                    for (let t = 0; t < this.children.length; t++) {
                        if (!this.token) return;
                        this.children[t].activate(n)
                    }
                }
                isActive(t = this.token) {
                    return this.token === t && void 0 !== t
                }
                deactivate() {
                    this.token = void 0;
                    for (let t = 0; t < this.children.length; t++) {
                        this.children[t].deactivate()
                    }
                }
            }
            o.tagName = "uikit-condition-any";
            var r = o;
            e.default = r
        }, t => {
            "use strict";
            t.exports = "<template>\r\n  <slot></slot>\r\n</template>\r\n"
        }, (t, e, n) => {
            "use strict";
            Object.defineProperty(e, "__esModule", {
                value: !0
            }), e.default = void 0;
            var i = n(1);
            class o extends i.webComponents.ShadowElement {
                templateMarkup() {
                    return n(58)
                }
                disconnectedCallback() {
                    super.disconnectedCallback(), this.deactivate()
                }
                static get observedAttributes() {
                    return ["duration"]
                }
                activate(t) {
                    this.info && this.deactivate();
                    const e = {
                        callback: t
                    };
                    this.info = e, e.timeoutId = setTimeout((() => {
                        e.timeoutId = void 0, this.onTimeout(e)
                    }), this.getAttribute("duration"))
                }
                deactivate(t = this.info) {
                    t && (t.timeoutId && clearTimeout(t.timeoutId), t === this.info && (this.info = void 0))
                }
                isActive() {
                    return void 0 !== this.info
                }
                onTimeout(t) {
                    const e = this.info === t;
                    this.deactivate(t), e && t.callback()
                }
            }
            o.tagName = "uikit-condition-delay";
            var r = o;
            e.default = r
        }, t => {
            "use strict";
            t.exports = "<template>\r\n</template>\r\n"
        }, (t, e, n) => {
            "use strict";
            Object.defineProperty(e, "__esModule", {
                value: !0
            }), e.default = void 0;
            var i, o = (i = n(29)) && i.__esModule ? i : {
                    default: i
                },
                r = n(34),
                s = n(1);
            const a = Object.keys(r.VideoPlaybackStates).map((function(t) {
                return r.VideoPlaybackStates[t]
            }));
            class l extends s.webComponents.ShadowElement {
                templateMarkup() {
                    return n(60)
                }
                static get observedAttributes() {
                    return ["selector", "can-play", "ended", "non-media-duration", "playing", "paused", "unloaded"]
                }
                activate(t) {
                    this.deactivate(), this.cancellations = [];
                    const e = {};
                    this.token = e;
                    const n = () => {
                            this.token === e && (t(), this.token = void 0)
                        },
                        i = this.getElement();
                    if (this.attachSwitchChangeHandlers(), i)
                        if ("when" in i)
                            if (this.hasAttribute("can-play")) i.preload(n, (() => {
                                this.token === e && (this.deactivate(), this.activate())
                            }));
                            else if (this.hasAttribute("unloaded")) this.cancellations.push(i.when(r.VideoReadyStates.HAVE_NOTHING, n).cancel);
                    else
                        for (let t = 0; t < a.length; t++) {
                            const e = a[t];
                            if (this.hasAttribute(e.toLowerCase())) return void this.cancellations.push(i.when(e, n).cancel)
                        } else if (this.hasAttribute("non-media-duration")) {
                            const t = setTimeout((function() {
                                n()
                            }), parseInt(this.getAttribute("non-media-duration")));
                            this.cancellations.push((function() {
                                clearTimeout(t)
                            }))
                        } else n();
                    else n()
                }
                isActive() {
                    return void 0 !== this.token
                }
                attachSwitchChangeHandlers() {
                    const t = this.getSwitches(),
                        {
                            token: e
                        } = this,
                        n = () => {
                            this.token === e && (this.deactivate(), this.activate())
                        };
                    for (let e = 0; e < t.length; e++) {
                        t[e].subscribeVisibleNodesChanged(n)
                    }
                    this.removeSwitchChangeHandlers && this.removeSwitchChangeHandlers(), this.removeSwitchChangeHandlers = () => {
                        for (let e = 0; e < t.length; e++) {
                            t[e].unsubscribeVisibleNodesChanged(n)
                        }
                    }
                }
                deactivate() {
                    if (this.token = void 0, this.removeSwitchChangeHandlers && this.removeSwitchChangeHandlers(), this.cancellations) {
                        for (let t = this.cancellations.length - 1; t >= 0; t--) this.cancellations[t]();
                        this.cancellations = void 0
                    }
                }
                getSwitches() {
                    const t = [];
                    let e = this.getSelectedElement();
                    for (; e && "getVisibleNodes" in e;) t.push(e), e = e.getVisibleNodes()[0];
                    return t
                }
                getElement() {
                    let t = this.getSelectedElement();
                    for (; t && "getVisibleNodes" in t;) t = t.getVisibleNodes()[0];
                    return t
                }
                getSelectedElement() {
                    const t = o.default.getStateMachine(this),
                        e = this.getAttribute("selector");
                    return t.querySelector(":scope " + e)
                }
            }
            l.tagName = "uikit-condition-media";
            var d = l;
            e.default = d
        }, t => {
            "use strict";
            t.exports = "<template>\r\n</template>\r\n"
        }, (t, e, n) => {
            "use strict";
            Object.defineProperty(e, "__esModule", {
                value: !0
            }), e.default = void 0;
            var i, o = n(1),
                r = (i = n(29)) && i.__esModule ? i : {
                    default: i
                };
            class s extends o.webComponents.ShadowElement {
                templateMarkup() {
                    return n(62)
                }
                static get observedAttributes() {
                    return ["name", "value", "not-value"]
                }
                activate(t) {
                    this.info && this.deactivate();
                    const e = r.default.getStateMachine(this);
                    if (!e) return void o.logger.error("could not find a state machine to attach to");
                    if (this.matches(e)) return void t();
                    const n = {
                        onConditionSatisfied: t,
                        stateMachine: e
                    };
                    n.handler = this.onParameterChanged.bind(this, n), this.info = n, e.subscribeParameterChanged(this.info.handler)
                }
                deactivate(t = this.info) {
                    t && (t.stateMachine.unsubscribeParameterChanged(t.handler), t === this.info && (this.info = void 0))
                }
                isActive() {
                    return void 0 !== this.info
                }
                onParameterChanged(t, e, n, i) {
                    this.info === t ? e === this.getAttribute("name") && this.matches(i) && (t.onConditionSatisfied(), this.deactivate(t)) : this.deactivate(t)
                }
                matches(t) {
                    let e;
                    return e = t instanceof r.default ? t.getAttribute(this.getAttribute("name")) : t, this.getAttribute("not-value") ? this.getAttribute("not-value") !== e : this.getAttribute("value") === e
                }
            }
            s.tagName = "uikit-condition-parameter";
            var a = s;
            e.default = a
        }, t => {
            "use strict";
            t.exports = "<template>\r\n  <slot></slot>\r\n</template>\r\n"
        }, (t, e, n) => {
            "use strict";
            Object.defineProperty(e, "__esModule", {
                value: !0
            }), e.default = void 0;
            var i = n(1);
            class o extends i.webComponents.ShadowElement {
                templateMarkup() {
                    return n(64)
                }
            }
            o.tagName = "lol-uikit-content-block";
            var r = o;
            e.default = r
        }, t => {
            "use strict";
            t.exports = "<template>\r\n  <slot></slot>\r\n</template>\r\n"
        }, (t, e, n) => {
            "use strict";
            Object.defineProperty(e, "__esModule", {
                value: !0
            }), e.default = void 0;
            var i = n(1),
                o = s(n(66)),
                r = s(n(20));

            function s(t) {
                return t && t.__esModule ? t : {
                    default: t
                }
            }
            class a extends i.webComponents.ShadowElement {
                templateMarkup() {
                    return n(67)
                }
                stylesheetMarkup() {
                    return n(68)
                }
                constructor() {
                    super(), this.defaultOptions = {
                        css: this.stylesheetMarkup(),
                        menuClass: "context-menu",
                        rootMenuClass: "context-menu-root",
                        subMenuClass: null,
                        openSubmenuClass: "open"
                    }, this.itemCount = 0, this.removed = !1, this.handleFocusOut = this.handleFocusOut.bind(this), this.styleElement = this.shadowRoot.firstElementChild, this.contextMenuElement = this.shadowRoot.lastElementChild, this.menuItemTemplate = this.contextMenuElement.firstElementChild, this.menuItemTemplate.remove(), this.contextMenuElement.addEventListener("click", this.handleClick.bind(this)), this.contextMenuElement.addEventListener("mouseover", this.handleMouseOver.bind(this)), this.contextMenuElement.addEventListener("mouseout", this.handleMouseOut.bind(this))
                }
                connectedCallback() {
                    super.connectedCallback(), this.style.position = "absolute", this.style.zIndex = "10000"
                }
                setOwner(t) {
                    this.parentContextMenu = t, t.contextMenuChild = this
                }
                setMenuItems(t) {
                    this._setMenuItems(t, this.defaultOptions)
                }
                setCustomMenuItems(t, e) {
                    this._setMenuItems(t, Object.assign({}, this.defaultOptions, e))
                }
                _setMenuItems(t, e) {
                    t = a.filterVisible(t), this.itemCount = t.length, this.menuOptions = e, this._clearMenu(), this._setupMenu(t, e), this._setMenuCSS(e.css);
                    for (let e = 0; e < t.length; e++) {
                        const n = t[e],
                            i = this.contextMenuElement.children[e];
                        i.item = n, i.classList.toggle("disabled", n.disabled || n.notImplemented || !1), i.classList.toggle("not-implemented", !!n.notImplemented), i.classList.toggle("has-submenu", !!n.submenu), !n.element && n.label && (i.textContent = n.label, n.class && i.classList.add(n.class))
                    }
                }
                _clearMenu() {
                    this.contextMenuElement.className = "context-menu", this.contextMenuElement.textContent = ""
                }
                _setupMenu(t, e) {
                    this.contextMenuElement.classList.add(e.menuClass), !this.parentContextMenu && e.rootMenuClass ? this.contextMenuElement.classList.add(e.rootMenuClass) : this.parentContextMenu && e.subMenuClass && this.contextMenuElement.classList.add(e.subMenuClass), this.openSubmenuClass = e.openSubmenuClass, this._setupMenuItems(t)
                }
                _setupMenuItems(t) {
                    for (let e = 0; e < t.length; e++) {
                        const {
                            element: n
                        } = t[e], {
                            label: i
                        } = t[e];
                        if (n && n instanceof HTMLElement) this.contextMenuElement.appendChild(n);
                        else {
                            if (!i || "string" != typeof i) throw new Error("Context menu items must have an element or label for each item");
                            this.contextMenuElement.appendChild(this.menuItemTemplate.cloneNode(!0))
                        }
                    }
                }
                _setMenuCSS(t) {
                    this.styleElement.innerHTML !== t && (this.styleElement.innerHTML = t)
                }
                openAtEvent(t) {
                    this.target = t.target;
                    const e = t.target.ownerDocument.defaultView.frameElement,
                        n = e ? e.ownerDocument : t.target.ownerDocument,
                        i = n.defaultView;
                    this.container = n.body;
                    let r = t.pageX,
                        s = t.pageY;
                    if (void 0 === r && void 0 !== t.screenX && (r = t.screenX - i.screenX, s = t.screenY - i.screenY), e) {
                        const n = e.getBoundingClientRect();
                        r = t.clientX + n.left, s = t.clientY + n.top
                    }
                    this.show(), this._placeMenu(i, new o.default(r, s)), this.lastActiveElement = this.target.ownerDocument.activeElement, this.focus()
                }
                openAtRect(t) {
                    this.show();
                    const e = this.ownerDocument.defaultView;
                    this._placeMenu(e, t), this.focus()
                }
                _placeMenu(t, e) {
                    this.style.left = "", this.style.top = "";
                    const n = o.default.fromDOMRect(this.getBoundingClientRect()),
                        i = new o.default(t.scrollX, t.scrollY, t.innerWidth, t.innerHeight);
                    n.place(e, i), this.style.left = n.left + "px", this.style.top = n.top + "px"
                }
                focus() {
                    this.contextMenuElement.focus(), this.contextMenuElement.addEventListener("blur", this.handleFocusOut.bind(this))
                }
                contextMenuHasFocus() {
                    return this.ownerDocument.activeElement.className.includes("context-menu")
                }
                hasFocus(t) {
                    const e = this.ownerDocument;
                    return e.hasFocus() && this.contextMenuElement.contains(t || e.activeElement)
                }
                isOpen() {
                    return Boolean(this.parentNode) && !this.removed
                }
                getContainer() {
                    const {
                        document: t
                    } = a;
                    return window.testsSandbox || this.container || this.parentContextMenu && this.parentContextMenu.container || t.body
                }
                show() {
                    const t = this.getContainer();
                    this.parentNode !== t && (t.appendChild(this), this.removed = !1)
                }
                close() {
                    this.contextMenuElement.removeEventListener("blur", this.handleFocusOut.bind(this)), this.contextMenuChild && this.contextMenuChild.isOpen() && this.contextMenuChild.close(), this.isOpen() && (this.contextMenuElement.dispatchEvent(new Event("closeContextMenu", {
                        bubbles: !0
                    })), this.lastActiveElement && this.lastActiveElement.focus(), this.target = null, this.lastActiveElement = null, this.removed = !0, this.contextMenuElement.removeEventListener("click", this.handleClick.bind(this)), this.contextMenuElement.removeEventListener("mouseover", this.handleMouseOver.bind(this)), this.contextMenuElement.removeEventListener("mouseout", this.handleMouseOut.bind(this)), this.remove())
                }
                handleFocusOut(t) {
                    if (!this.isOpen() || this.openingSubmenu) return;
                    const e = this.hasFocus(t.relatedTarget),
                        n = this.contextMenuChild && this.contextMenuChild.hasFocus(),
                        i = this.parentContextMenu && this.parentContextMenu === t.relatedTarget;
                    e || n || (this.close(), i || this.closeParent())
                }
                handleClick(t) {
                    const e = this._findItemRoot(t.target);
                    if (!e) return;
                    const {
                        item: n
                    } = e;
                    n.disabled ? this.focus() : n && (n.noClickSound || this._playSound(), n.target ? (this.itemAction(n), this.contextMenuElement.focus(), setTimeout((() => this.contextMenuElement.blur()))) : this.handleMouseOver(t))
                }
                itemAction(t) {
                    "function" == typeof t.action ? t.action.apply(t.target, t.args) : t.target && "function" == typeof t.target[t.action] ? t.target[t.action].apply(t.target, t.args) : t.target && "function" == typeof t.target.send && t.target.send.apply(t.target, [t.action].concat(t.args || []))
                }
                handleMouseOver(t) {
                    const e = this._findItemRoot(t.target);
                    if (this.submenuCloseCheck(), !e || !this.contextMenuChild || e.item.disabled) return;
                    const {
                        item: n
                    } = e;
                    n.submenu ? this.openSubmenu(e) : this.contextMenuChild.isOpen() && this.closeSubmenuDelayed()
                }
                submenuCloseCheck() {
                    this.parentContextMenu && this.parentContextMenu.cancelSubmenuClose()
                }
                handleMouseOut(t) {
                    const e = this._findItemRoot(t.target);
                    if (!e) return;
                    const {
                        item: n
                    } = e;
                    n.submenu && this.contextMenuChild && this.contextMenuChild.isOpen() && this.closeSubmenuDelayed()
                }
                openSubmenu(t) {
                    const {
                        item: e
                    } = t;
                    if (!t || !e) return;
                    this.contextMenuChild.isOpen() && this.closeSubmenu(), this.openingSubmenu = !0, this.cancelSubmenuClose(), setTimeout((() => this.openingSubmenu = !1), 300), t.classList.add(this.openSubmenuClass), this.contextMenuChild.openingElement = t, this.contextMenuChild._setMenuItems(e.submenu, this.menuOptions);
                    const n = o.default.fromDOMRect(t.getBoundingClientRect());
                    this.contextMenuChild.openAtRect(n)
                }
                closeSubmenuDelayed() {
                    this._closingSubmenu || (this._closingSubmenu = setTimeout(this.closeSubmenu.bind(this), 300))
                }
                closeSubmenu() {
                    this.cancelSubmenuClose(), this.contextMenuChild && (this.contextMenuChild.close(), this._closingSubmenu = null, this.contextMenuChild.openingElement.classList.remove(this.openSubmenuClass), this.contextMenuChild.openingElement = null, this.isOpen() && this.focus())
                }
                cancelSubmenuClose() {
                    clearTimeout(this._closingSubmenu), this._closingSubmenu = null
                }
                closeParent() {
                    this.parentContextMenu && setTimeout((() => this.parentContextMenu.close()))
                }
                _findItemRoot(t) {
                    return t && t !== this.contextMenuElement ? t.item ? t : this._findItemRoot(t.parentElement) : null
                }
                _playSound() {
                    (0, i.getProvider)().get("rcp-fe-audio").getChannel("sfx-ui").playSound(r.default.clickGeneric)
                }
                static filterVisible(t) {
                    return t.filter((function(t) {
                        return !t.hidden
                    }))
                }
            }
            e.default = a, a.tagName = "lol-uikit-context-menu"
        }, (t, e) => {
            "use strict";
            Object.defineProperty(e, "__esModule", {
                value: !0
            }), e.default = void 0;
            class n {
                constructor(t, e, n, i) {
                    this.left = t || 0, this.top = e || 0, this.width = n || 0, this.height = i || 0
                }
                get right() {
                    return this.left + this.width
                }
                set right(t) {
                    this.left = t - this.width
                }
                get bottom() {
                    return this.top + this.height
                }
                set bottom(t) {
                    this.top = t - this.height
                }
                fitWithin(t) {
                    this.left < t.left && (this.left = t.left), this.top < t.top && (this.top = t.top), this.right > t.right && (this.right = t.right), this.bottom > t.bottom && (this.bottom = t.bottom)
                }
                centerWithin(t) {
                    this.left = Math.round((t.width - this.width) / 2), this.top = Math.round((t.height - this.height) / 2)
                }
                place(t, e) {
                    return this.left = t.right, this.top = t.top, e && this.flipToFit(e, t), this
                }
                flipToFit(t, e) {
                    e || (e = new n(this.left, this.top)), this.right > t.right && (this.right = e.left), this.bottom > t.bottom && (this.bottom = e.bottom)
                }
                static fromDOMRect(t) {
                    return new n(t.left, t.top, t.width, t.height)
                }
            }
            var i = n;
            e.default = i
        }, t => {
            "use strict";
            t.exports = '<template>\r\n  <div tabindex="-1">\r\n    <div class="menu-item"></div>\r\n  </div>\r\n</template>\r\n'
        }, (t, e, n) => {
            var i = n(9),
                o = n(10)(i);
            o.push([t.id, ".context-menu {\n  user-select: none;\n  list-style: none;\n  margin: 0;\n  padding: 0;\n  min-width: 127px;\n  width: auto;\n  z-index: 10;\n  box-sizing: border-box;\n  background-color: #010a13;\n  box-shadow: 0 0 1px #000, 0 0 1px #000;\n  -webkit-user-select: none;\n/* if the width is changed, also change moveNearBoundingRect in popout-window.js to account for border size in the\n   alignment of subcontext menus */\n  border-width: 2px;\n  border-style: solid;\n  border-image: linear-gradient(to bottom, #463714, #785a28) 1;\n}\n.context-menu:focus {\n  outline: none;\n}\n.context-menu .menu-item {\n  font: 12px 'LoL Body', Arial, 'Helvetica Neue', Helvetica, sans-serif;\n  display: block;\n  outline: none;\n  min-width: 100%;\n  height: 29px;\n  line-height: 29px;\n  box-sizing: border-box;\n  border: none;\n  background: none;\n  color: #cdbe91;\n  white-space: nowrap;\n  overflow: visible;\n  text-overflow: ellipsis;\n  text-align: left;\n  cursor: default;\n  padding: 0 10px;\n}\n.context-menu .menu-item:lang(ar-ae) {\n  direction: rtl;\n  text-align: right;\n}\n.context-menu .menu-item.has-submenu {\n  position: relative;\n  padding-right: 23px;\n}\n.context-menu .menu-item.has-submenu:after {\n/* right-arrow */\n  content: '';\n  display: block;\n  position: absolute;\n  top: 50%;\n  right: 6px;\n  margin-top: -3px;\n  border: 3px solid transparent;\n  border-left-color: #cdbe91;\n}\n.context-menu .menu-item:hover {\n  color: #f0e6d2;\n  background: #1e2328;\n}\n.context-menu .menu-item:active {\n  color: #cdbe91;\n}\n.context-menu .menu-item.disabled,\n.context-menu .menu-item.disabled:hover,\n.context-menu .menu-item.disabled:active {\n  padding: 0 10px;\n  border-left-color: none;\n  border-right-color: none;\n  border-width: 0;\n  cursor: default;\n  color: #a09b8c;\n  background: none;\n  opacity: 0.55;\n/* to override the webkit-filter brightness in focus */\n  -webkit-filter: none;\n}\n.context-menu-root {\n  min-width: 131px;\n  width: auto;\n}\n", ""]), t.exports = o
        }, (t, e, n) => {
            "use strict";
            Object.defineProperty(e, "__esModule", {
                value: !0
            }), e.default = void 0;
            var i, o = n(1),
                r = (i = n(19)) && i.__esModule ? i : {
                    default: i
                },
                s = n(70);
            class a extends o.webComponents.ShadowElement {
                static get observedAttributes() {
                    return ["orientation", "appearance", "frame", "caret", "layer-position", "dismissable", "dismissable-type", "close-button"]
                }
                templateMarkup() {
                    return n(71)
                }
                stylesheetMarkup() {
                    return n(72)
                }
                constructor() {
                    super(), this._closeEvent = this.dispatchCloseEvent.bind(this)
                }
                connectedCallback() {
                    super.connectedCallback(), this.hasDismissableIcon() && (0, r.default)(this.shadowRoot).find(".lol-uikit-dialog-frame-toast-close-button")[0].addEventListener("click", this._closeEvent), this.hasDismissableButton() && (0, r.default)(this.shadowRoot).find(".lol-uikit-dialog-frame-close-button")[0].addEventListener("click", this._closeEvent), this.updateCssClasses()
                }
                disconnectedCallback() {
                    super.disconnectedCallback(), this.hasDismissableIcon() && (0, r.default)(this.shadowRoot).find(".lol-uikit-dialog-frame-toast-close-button")[0].removeEventListener("click", this._closeEvent), this.hasDismissableButton() && (0, r.default)(this.shadowRoot).find(".lol-uikit-dialog-frame-close-button")[0].removeEventListener("click", this._closeEvent)
                }
                processAttributes() {
                    this.shadowRoot.parentElement && this.updateCssClasses()
                }
                updateCssClasses() {
                    (0, r.default)(this.shadowRoot).find(".lol-uikit-dialog-frame").removeClass("top bottom left right").addClass(this.getOrientation()).removeClass("bordered borderless").addClass(this.getFrame()).removeClass("enabled disabled").addClass(this.getAppearance()).toggleClass("dismissable-icon", this.hasDismissableIcon()).toggleClass("dismissable-close-button", this.hasDismissableButton()).toggleClass("dismissable-icon-background", this.hasDismissableIconBackground()).toggleClass("caret", this.hasCaret()).addClass(this.getCaretDirection()).toggleClass("node", this.hasNode()).addClass(this.getLayerPosition()), this.setZIndex()
                }
                getOrientation() {
                    return this.getAttribute("orientation") || "bottom"
                }
                getAppearance() {
                    return this.getAttribute("appearance") || "enabled"
                }
                hasCaret() {
                    return this.hasAttribute("caret")
                }
                getFrame() {
                    return this.getAttribute("frame") || "bordered"
                }
                hasDismissableIcon() {
                    return "inside" === this.getAttribute("dismissable-type") && (this.hasAttribute("dismissable") || this.hasAttribute("close-button"))
                }
                hasDismissableButton() {
                    return "inside" !== this.getAttribute("dismissable-type") && (this.hasAttribute("dismissable") || this.hasAttribute("close-button"))
                }
                hasDismissableIconBackground() {
                    return this.hasDismissableIcon() && this.hasAttribute("dismissable-icon-background")
                }
                getCaretDirection() {
                    return this.getAttribute("caret")
                }
                hasNode() {
                    return this.hasAttribute("node")
                }
                getLayerPosition() {
                    return this.getAttribute("layer-position") || "default"
                }
                setZIndex() {
                    const t = this.getLayerPosition();
                    this.style.zIndex = "above-vignette" === t ? s.Z_INDEX_CONSTANTS.CELEBRATIONS_MODAL : "above-menus" === t ? s.Z_INDEX_CONSTANTS.CONTEXT_MENUS : 0
                }
                dispatchCloseEvent() {
                    this.dispatchEvent(new Event("dialogFrameDismissed", {
                        bubbles: !0,
                        composed: !0
                    }))
                }
            }
            a.tagName = "lol-uikit-dialog-frame";
            var l = a;
            e.default = l
        }, (t, e) => {
            "use strict";
            Object.defineProperty(e, "__esModule", {
                value: !0
            }), e.Z_INDEX_CONSTANTS = void 0;
            e.Z_INDEX_CONSTANTS = {
                TOOLTIPS: 19e3,
                NOTIFICATIONS: 8e3,
                DROPDOWNS: 2,
                SLIDER: 1,
                CONTEXT_MENUS: 10,
                CELEBRATIONS_TOAST: 9e3,
                CELEBRATIONS_VIGNETTE: 9001,
                CELEBRATIONS_MODAL: 9002
            }
        }, t => {
            "use strict";
            t.exports = '<template id="lol-uikit-template-dialog-frame">\r\n  <div class="lol-uikit-dialog-frame">\r\n    <div class="lol-uikit-dialog-frame-sub-border"></div>\r\n    <div class="content-wrapper">\r\n      <slot></slot>\r\n    </div>\r\n    <div class="lol-uikit-dialog-frame-toast-close-button"></div>\r\n    <div class="lol-uikit-dialog-frame-close-button">\r\n      <lol-uikit-close-button></lol-uikit-close-button>\r\n    </div>\r\n  </div>\r\n</template>\r\n'
        }, (t, e, n) => {
            var i = n(9),
                o = n(10)(i);
            o.push([t.id, ':host .lol-uikit-dialog-frame.left,\n:host .lol-uikit-dialog-frame.right {\n  border: 2px solid transparent;\n  border-image: linear-gradient(to right, #785a28 0, #463714 50%, #463714 100%) 1 stretch;\n}\n:host .lol-uikit-dialog-frame.right {\n  border: 2px solid transparent;\n  border-image: linear-gradient(to left, #785a28 0, #463714 50%, #463714 100%) 1 stretch;\n}\n:host .lol-uikit-dialog-frame.top,\n:host .lol-uikit-dialog-frame.bottom {\n  border: 2px solid transparent;\n  border-image: linear-gradient(to top, #785a28 0, #463714 50%, #463714 100%) 1 stretch;\n}\n:host .lol-uikit-dialog-frame.top {\n  border: 2px solid transparent;\n  border-image: linear-gradient(to bottom, #785a28 0, #463714 50%, #463714 100%) 1 stretch;\n}\n:host .lol-uikit-dialog-frame.top.disabled,\n:host .lol-uikit-dialog-frame.bottom.disabled {\n  border: 2px solid transparent;\n  border-image: linear-gradient(to top, #39393e 0, #1e282d 5px, #1e282d 100%) 1 stretch;\n}\n:host .lol-uikit-dialog-frame.top.disabled > .lol-uikit-dialog-frame-sub-border::before,\n:host .lol-uikit-dialog-frame.bottom.disabled > .lol-uikit-dialog-frame-sub-border::before {\n  top: -6px;\n  border-image-source: url("/fe/lol-uikit/images/sub-border-secondary-horizontal-disabled.png");\n}\n:host .lol-uikit-dialog-frame.top.disabled > .lol-uikit-dialog-frame-sub-border::after,\n:host .lol-uikit-dialog-frame.bottom.disabled > .lol-uikit-dialog-frame-sub-border::after {\n  bottom: -6px;\n  border-image-source: url("/fe/lol-uikit/images/sub-border-primary-horizontal-disabled.png");\n}\n:host .lol-uikit-dialog-frame.top .lol-uikit-dialog-frame-sub-border::before,\n:host .lol-uikit-dialog-frame.bottom .lol-uikit-dialog-frame-sub-border::before,\n:host .lol-uikit-dialog-frame.top .lol-uikit-dialog-frame-sub-border::after,\n:host .lol-uikit-dialog-frame.bottom .lol-uikit-dialog-frame-sub-border::after {\n  left: 12px;\n  width: calc(100% - 24px);\n  height: 0;\n  border-width: 4px 4px 0 4px;\n  border-image-width: 4px 4px 0 4px;\n  border-image-slice: 4 4 0 4;\n  border-image-repeat: stretch;\n  border-style: solid;\n}\n:host .lol-uikit-dialog-frame.top .lol-uikit-dialog-frame-sub-border::before,\n:host .lol-uikit-dialog-frame.bottom .lol-uikit-dialog-frame-sub-border::before {\n  top: -6px;\n  border-image-source: url("/fe/lol-uikit/images/sub-border-secondary-horizontal.png");\n}\n:host .lol-uikit-dialog-frame.top .lol-uikit-dialog-frame-sub-border::after,\n:host .lol-uikit-dialog-frame.bottom .lol-uikit-dialog-frame-sub-border::after {\n  bottom: -6px;\n  border-image-source: url("/fe/lol-uikit/images/sub-border-primary-horizontal.png");\n}\n:host .lol-uikit-dialog-frame.left.disabled,\n:host .lol-uikit-dialog-frame.right.disabled {\n  border: 2px solid transparent;\n  border-image: linear-gradient(to right, #39393e 0, #1e282d 5px, #1e282d 100%) 1 stretch;\n}\n:host .lol-uikit-dialog-frame.left.disabled > .lol-uikit-dialog-frame-sub-border::before,\n:host .lol-uikit-dialog-frame.right.disabled > .lol-uikit-dialog-frame-sub-border::before {\n  left: -6px;\n  border-image-source: url("/fe/lol-uikit/images/sub-border-secondary-vertical-disabled.png");\n}\n:host .lol-uikit-dialog-frame.left.disabled > .lol-uikit-dialog-frame-sub-border::after,\n:host .lol-uikit-dialog-frame.right.disabled > .lol-uikit-dialog-frame-sub-border::after {\n  right: -6px;\n  border-image-source: url("/fe/lol-uikit/images/sub-border-primary-vertical-disabled.png");\n}\n:host .lol-uikit-dialog-frame.left .lol-uikit-dialog-frame-sub-border::before,\n:host .lol-uikit-dialog-frame.right .lol-uikit-dialog-frame-sub-border::before,\n:host .lol-uikit-dialog-frame.left .lol-uikit-dialog-frame-sub-border::after,\n:host .lol-uikit-dialog-frame.right .lol-uikit-dialog-frame-sub-border::after {\n  top: 12px;\n  height: calc(100% - 24px);\n  width: 0;\n  border-width: 4px 4px 4px 0;\n  border-image-width: 4px 4px 4px 0;\n  border-image-slice: 4 4 4 0;\n  border-image-repeat: stretch;\n  border-style: solid;\n}\n:host .lol-uikit-dialog-frame.left .lol-uikit-dialog-frame-sub-border::before,\n:host .lol-uikit-dialog-frame.right .lol-uikit-dialog-frame-sub-border::before {\n  left: -6px;\n  border-image-source: url("/fe/lol-uikit/images/sub-border-primary-vertical.png");\n}\n:host .lol-uikit-dialog-frame.left .lol-uikit-dialog-frame-sub-border::after,\n:host .lol-uikit-dialog-frame.right .lol-uikit-dialog-frame-sub-border::after {\n  right: -6px;\n  border-image-source: url("/fe/lol-uikit/images/sub-border-secondary-vertical.png");\n}\nlol-uikit-dialog-frame {\n  z-index: 0;\n}\n:host .lol-uikit-dialog-frame {\n  position: relative;\n  background: #010a13;\n  box-shadow: 0 0 0 1px rgba(1,10,19,0.48);\n}\n:host .lol-uikit-dialog-frame::before {\n  content: \'\';\n  position: absolute;\n  width: calc(100% + 4px);\n  height: calc(100% + 4px);\n  top: -2px;\n  left: -2px;\n  box-shadow: 0 0 10px 1px rgba(0,0,0,0.5);\n  pointer-events: none;\n}\n:host .lol-uikit-dialog-frame .lol-uikit-dialog-frame-sub-border::before,\n:host .lol-uikit-dialog-frame .lol-uikit-dialog-frame-sub-border::after {\n  content: \'\';\n  position: absolute;\n  display: flex;\n  box-sizing: border-box;\n}\n:host .lol-uikit-dialog-frame.top.disabled > .lol-uikit-dialog-frame-sub-border::before {\n  border-image-source: url("/fe/lol-uikit/images/sub-border-primary-horizontal-disabled.png");\n  transform: rotate(180deg);\n}\n:host .lol-uikit-dialog-frame.top.disabled > .lol-uikit-dialog-frame-sub-border::after {\n  border-image-source: url("/fe/lol-uikit/images/sub-border-secondary-horizontal-disabled.png");\n  transform: rotate(180deg);\n}\n:host .lol-uikit-dialog-frame.top .lol-uikit-dialog-frame-sub-border::before {\n  border-image-source: url("/fe/lol-uikit/images/sub-border-primary-horizontal.png");\n  transform: rotate(180deg);\n}\n:host .lol-uikit-dialog-frame.top .lol-uikit-dialog-frame-sub-border::after {\n  border-image-source: url("/fe/lol-uikit/images/sub-border-secondary-horizontal.png");\n  transform: rotate(180deg);\n}\n:host .lol-uikit-dialog-frame.right.disabled > .lol-uikit-dialog-frame-sub-border::before {\n  border-image-source: url("/fe/lol-uikit/images/sub-border-primary-vertical-disabled.png");\n  transform: rotate(180deg);\n}\n:host .lol-uikit-dialog-frame.right.disabled > .lol-uikit-dialog-frame-sub-border::after {\n  border-image-source: url("/fe/lol-uikit/images/sub-border-secondary-vertical-disabled.png");\n  transform: rotate(180deg);\n}\n:host .lol-uikit-dialog-frame.right .lol-uikit-dialog-frame-sub-border::before {\n  border-image-source: url("/fe/lol-uikit/images/sub-border-secondary-vertical.png");\n  transform: rotate(180deg);\n}\n:host .lol-uikit-dialog-frame.right .lol-uikit-dialog-frame-sub-border::after {\n  border-image-source: url("/fe/lol-uikit/images/sub-border-primary-vertical.png");\n  transform: rotate(180deg);\n}\n:host .lol-uikit-dialog-frame.borderless .lol-uikit-dialog-frame-sub-border {\n  display: none;\n}\n:host .lol-uikit-dialog-frame .lol-uikit-dialog-frame-close-button {\n  display: none;\n}\n:host .lol-uikit-dialog-frame .lol-uikit-dialog-frame-close-button lol-uikit-close-button {\n  z-index: 10000000;\n}\n:host .lol-uikit-dialog-frame .lol-uikit-dialog-frame-uikit-close-button {\n  display: none;\n}\n:host .lol-uikit-dialog-frame.dismissable-icon .lol-uikit-dialog-frame-toast-close-button {\n  display: block;\n  height: 24px;\n  width: 24px;\n  position: absolute;\n  top: 8px;\n  right: 8px;\n  background: url("/fe/lol-uikit/images/close.png"), rgba(0,0,0,0.5);\n  cursor: pointer;\n  border-radius: 4px;\n  background-size: 75% 75%, 100% 100%;\n  background-position: center;\n  background-repeat: no-repeat;\n}\n:host .lol-uikit-dialog-frame.dismissable-icon .lol-uikit-dialog-frame-toast-close-button:lang(ar-ae) {\n  right: auto;\n  left: 8px;\n}\n:host .lol-uikit-dialog-frame.dismissable-icon .lol-uikit-dialog-frame-toast-close-button:hover {\n  background: url("/fe/lol-uikit/images/close.png"), rgba(10,20,40,0.5);\n  background-size: 75% 75%, 100% 100%;\n  background-position: center;\n  background-repeat: no-repeat;\n}\n:host .lol-uikit-dialog-frame.dismissable-icon.dismissable-icon-background .lol-uikit-dialog-frame-toast-close-button {\n  width: 24px;\n  height: 24px;\n  top: 8px;\n  right: 8px;\n  background-color: #0a1428;\n  background-size: 18px 18px;\n  background-position: center;\n  border-radius: 2px;\n  opacity: 0.8;\n  transition: opacity 0.05s ease-in-out;\n}\n:host .lol-uikit-dialog-frame.dismissable-icon.dismissable-icon-background .lol-uikit-dialog-frame-toast-close-button:hover {\n  opacity: 1;\n}\n:host .lol-uikit-dialog-frame.dismissable-close-button .lol-uikit-dialog-frame-close-button {\n  display: block;\n}\n:host .lol-uikit-dialog-frame.dismissable-close-button .lol-uikit-dialog-frame-close-button::before {\n  content: \'\';\n  position: absolute;\n  width: 38px;\n  height: 68px;\n  top: -22px;\n  right: -22px;\n  background-image: url("/fe/lol-uikit/images/frame-button-close-top-down.png");\n  background-size: 38px 68px;\n}\n:host .lol-uikit-dialog-frame.dismissable-close-button .lol-uikit-dialog-frame-close-button:lang(ar-ae)::before {\n  right: auto;\n  left: -22px;\n}\n:host .lol-uikit-dialog-frame.dismissable-close-button .lol-uikit-dialog-frame-close-button lol-uikit-close-button {\n  display: block;\n  position: absolute;\n  top: -17px;\n  right: -17px;\n}\n:host .lol-uikit-dialog-frame.dismissable-close-button .lol-uikit-dialog-frame-close-button lol-uikit-close-button:lang(ar-ae) {\n  right: auto;\n  left: -17px;\n}\n:host .lol-uikit-dialog-frame.caret::after {\n  content: \'\';\n  position: absolute;\n  background: url("/fe/lol-uikit/images/caret.png") 50% no-repeat;\n}\n:host .lol-uikit-dialog-frame.caret.top::after {\n  height: 18px;\n  width: 100%;\n  top: -16px;\n  transform: rotate(180deg);\n}\n:host .lol-uikit-dialog-frame.caret.bottom::after {\n  height: 18px;\n  width: 100%;\n  bottom: -16px;\n}\n:host .lol-uikit-dialog-frame.caret.left::after {\n  height: 100%;\n  width: 32px;\n  top: 0;\n  left: -23px;\n  transform: rotate(90deg);\n}\n:host .lol-uikit-dialog-frame.caret.right::after {\n  height: 100%;\n  width: 32px;\n  top: 0;\n  right: -23px;\n  transform: rotate(-90deg);\n}\n', ""]), t.exports = o
        }, (t, e, n) => {
            "use strict";
            Object.defineProperty(e, "__esModule", {
                value: !0
            }), e.default = void 0;
            var i = n(1);
            class o extends i.webComponents.ShadowElement {
                templateMarkup() {
                    return n(74)
                }
                stylesheetMarkup() {
                    return n(75)
                }
            }
            o.tagName = "lol-uikit-dropdown-optgroup";
            var r = o;
            e.default = r
        }, t => {
            "use strict";
            t.exports = '<template>\r\n  <div class="ui-dropdown-optgroup">\r\n    <div class="ui-dropdown-optgroup-header">\r\n      <slot name="lol-uikit-dropdown-optgroup-header"></slot>\r\n    </div>\r\n    <div class="ui-dropdown-options">\r\n      <slot name="lol-uikit-dropdown-option"></slot>\r\n    </div>\r\n  </div>\r\n</template>\r\n'
        }, (t, e, n) => {
            var i = n(9),
                o = n(10)(i);
            o.push([t.id, ':host .ui-dropdown-optgroup .ui-dropdown-optgroup-header {\n  font-family: var(--font-display);\n}\n:host .ui-dropdown-optgroup .ui-dropdown-optgroup-header {\n  -webkit-user-select: none;\n}\n:host .ui-dropdown-optgroup .ui-dropdown-optgroup-header {\n  font-kerning: normal;\n  -webkit-font-feature-settings: "kern" 1;\n  -webkit-font-smoothing: antialiased;\n}\n:host .ui-dropdown-optgroup .ui-dropdown-optgroup-header {\n  text-transform: uppercase;\n}\n:host .ui-dropdown-optgroup .ui-dropdown-optgroup-header:lang(ko-kr),\n:host .ui-dropdown-optgroup .ui-dropdown-optgroup-header:lang(ja-jp),\n:host .ui-dropdown-optgroup .ui-dropdown-optgroup-header:lang(tr-tr),\n:host .ui-dropdown-optgroup .ui-dropdown-optgroup-header:lang(el-gr),\n:host .ui-dropdown-optgroup .ui-dropdown-optgroup-header:lang(th-th),\n:host .ui-dropdown-optgroup .ui-dropdown-optgroup-header:lang(zh-tw) {\n  text-transform: none;\n}\n:host .ui-dropdown-optgroup .ui-dropdown-optgroup-header {\n  text-transform: none;\n}\n:host .ui-dropdown-optgroup .ui-dropdown-optgroup-header {\n  color: #f0e6d2;\n  font-size: 12px;\n  font-weight: 700;\n  line-height: 16px;\n  letter-spacing: 0.075em;\n}\n:host .ui-dropdown-optgroup .ui-dropdown-optgroup-header:lang(ja-jp) {\n  font-size: 13px;\n}\n:host .ui-dropdown-optgroup .ui-dropdown-optgroup-header:lang(ar-ae) {\n  letter-spacing: 0;\n}\n:host .ui-dropdown-optgroup .ui-dropdown-optgroup-header {\n  letter-spacing: 0.0375em;\n}\n:host .ui-dropdown-optgroup .ui-dropdown-optgroup-header:lang(ar-ae) {\n  letter-spacing: 0;\n}\n:host {\n  --dropdown-optgroup-header-font-size: 12px;\n}\n:host {\n  display: flex;\n  flex-direction: row;\n  background-color: #010a13;\n}\n:host .ui-dropdown-optgroup {\n  width: 100%;\n}\n:host .ui-dropdown-optgroup .ui-dropdown-optgroup-header {\n  font-size: var(--dropdown-optgroup-header-font-size);\n  padding: 0 10px;\n  color: #a09b8c;\n  height: 32px;\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n}\n', ""]), t.exports = o
        }, (t, e, n) => {
            "use strict";
            Object.defineProperty(e, "__esModule", {
                value: !0
            }), e.default = void 0;
            var i = n(1),
                o = a(n(19)),
                r = a(n(20)),
                s = n(18);

            function a(t) {
                return t && t.__esModule ? t : {
                    default: t
                }
            }
            class l extends i.webComponents.ShadowElement {
                templateMarkup() {
                    return n(77)
                }
                stylesheetMarkup() {
                    return n(78)
                }
                constructor() {
                    super(), this._optionSelectSound = this._createSound(r.default.dropdownOptionSelect)
                }
                connectedCallback() {
                    super.connectedCallback();
                    const t = this._ancestorDropdown();
                    t && ("LOL-UIKIT-FRAMED-DROPDOWN" === t.tagName ? this.classList.toggle("framed-dropdown-type", !0) : "LOL-UIKIT-FLAT-DROPDOWN" === t.tagName && this.classList.toggle("flat-dropdown-type", !0))
                }
                static get observedAttributes() {
                    return ["selected", "disabled", "draggable", "unselectable"]
                }
                processAttributes() {
                    this._draggableCheck(), this._disableCheck(), this._unselectableCheck(), this._selectedCheck(), this._clickableCheck()
                }
                isSelected() {
                    return (0, s.isAttrTruthy)("selected", this.getAttribute("selected"))
                }
                isDisabled() {
                    return (0, s.isAttrTruthy)("disabled", this.getAttribute("disabled"))
                }
                isDraggable() {
                    return (0, s.isAttrTruthy)("draggable", this.getAttribute("draggable"))
                }
                isUnselectable() {
                    return (0, s.isAttrTruthy)("unselectable", this.getAttribute("unselectable"))
                }
                _ancestorDropdown() {
                    return (0, o.default)(this).closest("lol-uikit-framed-dropdown,lol-uikit-flat-dropdown")[0]
                }
                _clickableCheck() {
                    const t = !this.isDisabled() && !this.isUnselectable();
                    t && !this._clickHandlerAttached && (this.addEventListener("click", this._handleClick), this._clickHandlerAttached = !0), !t && this._clickHandlerAttached && (this.removeEventListener("click", this._handleClick), this._clickHandlerAttached = !1)
                }
                _draggableCheck() {
                    const t = this.shadowRoot.querySelector(".ui-dropdown-option");
                    this.isDraggable() ? t.setAttribute("draggable", !0) : t.removeAttribute("draggable")
                }
                _disableCheck() {
                    const t = this.shadowRoot.querySelector(".ui-dropdown-option");
                    if (this.isDisabled() && this.isSelected()) {
                        this.removeAttribute("selected");
                        this._ancestorDropdown().dispatchEvent(new Event("reset"))
                    }
                    this.isDisabled() ? t.classList.add("ui-dropdown-option-disabled") : t.classList.remove("ui-dropdown-option-disabled")
                }
                _unselectableCheck() {
                    const t = this.shadowRoot.querySelector(".ui-dropdown-option");
                    if (this.isUnselectable() && this.isSelected()) {
                        this.removeAttribute("selected");
                        this._ancestorDropdown().dispatchEvent(new Event("reset"))
                    }
                    this.isUnselectable() ? t.classList.add("ui-dropdown-option-unselectable") : t.classList.remove("ui-dropdown-option-unselectable")
                }
                _selectedCheck() {
                    const {
                        classList: t
                    } = this.shadowRoot.querySelector(".ui-dropdown-option");
                    this.isSelected() ? t.add("ui-dropdown-option-selected") : t.remove("ui-dropdown-option-selected")
                }
                _handleClick(t) {
                    t.button > 0 || (this._ancestorDropdown().selectOption(this), this._optionSelectSound.play())
                }
                playSound(t) {
                    const e = t;
                    (0, i.getProvider)().get("rcp-fe-audio").getChannel("sfx-ui").playSound(e)
                }
                _createSound(t) {
                    return (0, i.getProvider)().get("rcp-fe-audio").getChannel("sfx-ui").createSound(t, {
                        allowConcurrency: !1
                    })
                }
            }
            l.tagName = "lol-uikit-dropdown-option";
            var d = l;
            e.default = d
        }, t => {
            "use strict";
            t.exports = '<template>\r\n  <div class="ui-dropdown-option"><slot></slot></div>\r\n</template>\r\n'
        }, (t, e, n) => {
            var i = n(79),
                o = n(10),
                r = n(80),
                s = n(81),
                a = o(i),
                l = r(s);
            a.push([t.id, ':host(.flat-dropdown-type) .ui-dropdown-option {\n  font-family: var(--font-display);\n}\n:host(.flat-dropdown-type) .ui-dropdown-option {\n  -webkit-user-select: none;\n}\n:host(.flat-dropdown-type) .ui-dropdown-option {\n  font-kerning: normal;\n  -webkit-font-feature-settings: "kern" 1;\n  -webkit-font-smoothing: antialiased;\n}\n:host(.flat-dropdown-type) .ui-dropdown-option {\n  text-transform: uppercase;\n}\n:host(.flat-dropdown-type) .ui-dropdown-option:lang(ko-kr),\n:host(.flat-dropdown-type) .ui-dropdown-option:lang(ja-jp),\n:host(.flat-dropdown-type) .ui-dropdown-option:lang(tr-tr),\n:host(.flat-dropdown-type) .ui-dropdown-option:lang(el-gr),\n:host(.flat-dropdown-type) .ui-dropdown-option:lang(th-th),\n:host(.flat-dropdown-type) .ui-dropdown-option:lang(zh-tw) {\n  text-transform: none;\n}\n:host(.flat-dropdown-type) .ui-dropdown-option {\n  text-transform: none;\n}\n:host(.flat-dropdown-type) .ui-dropdown-option {\n  color: #f0e6d2;\n  font-size: 14px;\n  font-weight: 700;\n  line-height: 18px;\n  letter-spacing: 0.075em;\n}\n:host(.flat-dropdown-type) .ui-dropdown-option:lang(ar-ae) {\n  letter-spacing: 0;\n}\n:host(.flat-dropdown-type) .ui-dropdown-option {\n  letter-spacing: 0.0375em;\n}\n:host(.flat-dropdown-type) .ui-dropdown-option:lang(ar-ae) {\n  letter-spacing: 0;\n}\n:host {\n  --dropdown-option-flat-height: 40px;\n  --dropdown-option-flat-font-weight: 700;\n  --dropdown-option-flat-overflow: visible;\n  --dropdown-option-flat-text-overflow: clip;\n  --dropdown-option-flat-white-space: inherit;\n  --dropdown-option-direction-rtl: rtl;\n  --dropdown-option-framed-line-height: 30px;\n  --dropdown-option-framed-white-space: nowrap;\n  --dropdown-option-framed-overflow-wrap: unset;\n}\n:host(.flat-dropdown-type) .ui-dropdown-option {\n  height: var(--dropdown-option-flat-height);\n  font-weight: var(--dropdown-option-flat-font-weight);\n  overflow: var(--dropdown-option-flat-overflow);\n  text-overflow: var(--dropdown-option-flat-text-overflow);\n  white-space: var(--dropdown-option-flat-white-space);\n  color: #cdbe91;\n  cursor: pointer;\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n  position: relative;\n  border-bottom: thin solid #1e2328;\n  padding: 0 10px;\n}\n:host(.flat-dropdown-type) .ui-dropdown-option:lang(ar-ae) {\n  padding: 0 10px 0 30px;\n}\n:host(.flat-dropdown-type) .ui-dropdown-option.ui-dropdown-option-disabled {\n  color: #888;\n  cursor: default;\n}\n:host(.flat-dropdown-type) .ui-dropdown-option.ui-dropdown-option-disabled:hover {\n  color: #888;\n  background-color: rgba(30,35,40,0);\n}\n:host(.flat-dropdown-type) .ui-dropdown-option.ui-dropdown-option-unselectable {\n  border-bottom: none;\n}\n:host(.flat-dropdown-type) .ui-dropdown-option.ui-dropdown-option-selected::after {\n  background: url(' + l + ") center no-repeat;\n  width: 14px;\n  height: 11px;\n  position: absolute;\n  right: 10px;\n  top: 50%;\n  transform: translate(0, -50%);\n  content: '';\n}\n:host(.flat-dropdown-type) .ui-dropdown-option.ui-dropdown-option-selected:lang(ar-ae)::after {\n  right: auto;\n  left: 10px;\n}\n:host(.flat-dropdown-type) .ui-dropdown-option:hover {\n  color: #f0e6d2;\n  background-color: #1e2328;\n}\n:host(.flat-dropdown-type) .ui-dropdown-option:active {\n  color: #463714;\n  background-color: rgba(30,35,40,0.5);\n}\n:host(.framed-dropdown-type) .ui-dropdown-option {\n  align-items: center;\n  border-top: thin solid #1f2123;\n  color: #cdbe91;\n  cursor: pointer;\n  display: block;\n  min-height: 30px;\n  line-height: var(--dropdown-option-framed-line-height);\n  margin: 0;\n  overflow: hidden;\n  padding: 2px 9px 2px 7px;\n  position: relative;\n  text-overflow: ellipsis;\n  white-space: var(--dropdown-option-framed-white-space);\n  overflow-wrap: var(--dropdown-option-framed-overflow-wrap);\n}\n:host(.framed-dropdown-type) .ui-dropdown-option:lang(ar-ae) {\n  direction: var(--dropdown-option-direction-rtl);\n}\n:host(.framed-dropdown-type) .ui-dropdown-option.ui-dropdown-option-disabled {\n  color: #888;\n  cursor: default;\n}\n:host(.framed-dropdown-type) .ui-dropdown-option.ui-dropdown-option-disabled:hover {\n  color: #888;\n  background-color: rgba(30,35,40,0);\n}\n:host(.framed-dropdown-type) .ui-dropdown-option.ui-dropdown-option-selected {\n  padding-right: 31px;\n}\n:host(.framed-dropdown-type) .ui-dropdown-option.ui-dropdown-option-selected:lang(ar-ae) {\n  padding-right: 7px;\n  padding-left: 31px;\n}\n:host(.framed-dropdown-type) .ui-dropdown-option.ui-dropdown-option-selected::after {\n  background: url(" + l + ") center no-repeat;\n  width: 14px;\n  height: 11px;\n  position: absolute;\n  right: 13px;\n  top: 50%;\n  transform: translate(0, -50%);\n  content: '';\n}\n:host(.framed-dropdown-type) .ui-dropdown-option.ui-dropdown-option-selected:lang(ar-ae)::after {\n  right: auto;\n  left: 13px;\n}\n:host(.framed-dropdown-type) .ui-dropdown-option:hover {\n  color: #f0e6d2;\n  background-color: #1e2328;\n}\n:host(.framed-dropdown-type) .ui-dropdown-option:active {\n  color: #463714;\n  background-color: rgba(30,35,40,0.5);\n}\n", "", {
                version: 3,
                sources: ["webpack://./fe/rcp-fe-lol-uikit/src/elements/dropdown-option/component-style.styl"],
                names: [],
                mappings: "AAAA;EACE,gCAAgC;AAClC;AACA;EACE,yBAAyB;AAC3B;AACA;EACE,oBAAoB;EACpB,uCAAuC;EACvC,mCAAmC;AACrC;AACA;EACE,yBAAyB;AAC3B;AACA;;;;;;EAME,oBAAoB;AACtB;AACA;EACE,oBAAoB;AACtB;AACA;EACE,cAAc;EACd,eAAe;EACf,gBAAgB;EAChB,iBAAiB;EACjB,uBAAuB;AACzB;AACA;EACE,iBAAiB;AACnB;AACA;EACE,wBAAwB;AAC1B;AACA;EACE,iBAAiB;AACnB;AACA;EACE,mCAAmC;EACnC,uCAAuC;EACvC,wCAAwC;EACxC,0CAA0C;EAC1C,2CAA2C;EAC3C,oCAAoC;EACpC,0CAA0C;EAC1C,4CAA4C;EAC5C,6CAA6C;AAC/C;AACA;EACE,0CAA0C;EAC1C,oDAAoD;EACpD,8CAA8C;EAC9C,wDAAwD;EACxD,oDAAoD;EACpD,cAAc;EACd,eAAe;EACf,aAAa;EACb,mBAAmB;EACnB,mBAAmB;EACnB,kBAAkB;EAClB,iCAAiC;EACjC,eAAe;AACjB;AACA;EACE,sBAAsB;AACxB;AACA;EACE,WAAW;EACX,eAAe;AACjB;AACA;EACE,WAAW;EACX,kCAAkC;AACpC;AACA;EACE,mBAAmB;AACrB;AACA;EACE,oEAAmE;EACnE,WAAW;EACX,YAAY;EACZ,kBAAkB;EAClB,WAAW;EACX,QAAQ;EACR,6BAA6B;EAC7B,WAAW;AACb;AACA;EACE,WAAW;EACX,UAAU;AACZ;AACA;EACE,cAAc;EACd,yBAAyB;AAC3B;AACA;EACE,cAAc;EACd,oCAAoC;AACtC;AACA;EACE,mBAAmB;EACnB,8BAA8B;EAC9B,cAAc;EACd,eAAe;EACf,cAAc;EACd,gBAAgB;EAChB,sDAAsD;EACtD,SAAS;EACT,gBAAgB;EAChB,wBAAwB;EACxB,kBAAkB;EAClB,uBAAuB;EACvB,sDAAsD;EACtD,0DAA0D;AAC5D;AACA;EACE,+CAA+C;AACjD;AACA;EACE,WAAW;EACX,eAAe;AACjB;AACA;EACE,WAAW;EACX,kCAAkC;AACpC;AACA;EACE,mBAAmB;AACrB;AACA;EACE,kBAAkB;EAClB,kBAAkB;AACpB;AACA;EACE,oEAAmE;EACnE,WAAW;EACX,YAAY;EACZ,kBAAkB;EAClB,WAAW;EACX,QAAQ;EACR,6BAA6B;EAC7B,WAAW;AACb;AACA;EACE,WAAW;EACX,UAAU;AACZ;AACA;EACE,cAAc;EACd,yBAAyB;AAC3B;AACA;EACE,cAAc;EACd,oCAAoC;AACtC",
                sourcesContent: [':host(.flat-dropdown-type) .ui-dropdown-option {\n  font-family: var(--font-display);\n}\n:host(.flat-dropdown-type) .ui-dropdown-option {\n  -webkit-user-select: none;\n}\n:host(.flat-dropdown-type) .ui-dropdown-option {\n  font-kerning: normal;\n  -webkit-font-feature-settings: "kern" 1;\n  -webkit-font-smoothing: antialiased;\n}\n:host(.flat-dropdown-type) .ui-dropdown-option {\n  text-transform: uppercase;\n}\n:host(.flat-dropdown-type) .ui-dropdown-option:lang(ko-kr),\n:host(.flat-dropdown-type) .ui-dropdown-option:lang(ja-jp),\n:host(.flat-dropdown-type) .ui-dropdown-option:lang(tr-tr),\n:host(.flat-dropdown-type) .ui-dropdown-option:lang(el-gr),\n:host(.flat-dropdown-type) .ui-dropdown-option:lang(th-th),\n:host(.flat-dropdown-type) .ui-dropdown-option:lang(zh-tw) {\n  text-transform: none;\n}\n:host(.flat-dropdown-type) .ui-dropdown-option {\n  text-transform: none;\n}\n:host(.flat-dropdown-type) .ui-dropdown-option {\n  color: #f0e6d2;\n  font-size: 14px;\n  font-weight: 700;\n  line-height: 18px;\n  letter-spacing: 0.075em;\n}\n:host(.flat-dropdown-type) .ui-dropdown-option:lang(ar-ae) {\n  letter-spacing: 0;\n}\n:host(.flat-dropdown-type) .ui-dropdown-option {\n  letter-spacing: 0.0375em;\n}\n:host(.flat-dropdown-type) .ui-dropdown-option:lang(ar-ae) {\n  letter-spacing: 0;\n}\n:host {\n  --dropdown-option-flat-height: 40px;\n  --dropdown-option-flat-font-weight: 700;\n  --dropdown-option-flat-overflow: visible;\n  --dropdown-option-flat-text-overflow: clip;\n  --dropdown-option-flat-white-space: inherit;\n  --dropdown-option-direction-rtl: rtl;\n  --dropdown-option-framed-line-height: 30px;\n  --dropdown-option-framed-white-space: nowrap;\n  --dropdown-option-framed-overflow-wrap: unset;\n}\n:host(.flat-dropdown-type) .ui-dropdown-option {\n  height: var(--dropdown-option-flat-height);\n  font-weight: var(--dropdown-option-flat-font-weight);\n  overflow: var(--dropdown-option-flat-overflow);\n  text-overflow: var(--dropdown-option-flat-text-overflow);\n  white-space: var(--dropdown-option-flat-white-space);\n  color: #cdbe91;\n  cursor: pointer;\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n  position: relative;\n  border-bottom: thin solid #1e2328;\n  padding: 0 10px;\n}\n:host(.flat-dropdown-type) .ui-dropdown-option:lang(ar-ae) {\n  padding: 0 10px 0 30px;\n}\n:host(.flat-dropdown-type) .ui-dropdown-option.ui-dropdown-option-disabled {\n  color: #888;\n  cursor: default;\n}\n:host(.flat-dropdown-type) .ui-dropdown-option.ui-dropdown-option-disabled:hover {\n  color: #888;\n  background-color: rgba(30,35,40,0);\n}\n:host(.flat-dropdown-type) .ui-dropdown-option.ui-dropdown-option-unselectable {\n  border-bottom: none;\n}\n:host(.flat-dropdown-type) .ui-dropdown-option.ui-dropdown-option-selected::after {\n  background: url("../../images/dropdown-check.png") center no-repeat;\n  width: 14px;\n  height: 11px;\n  position: absolute;\n  right: 10px;\n  top: 50%;\n  transform: translate(0, -50%);\n  content: \'\';\n}\n:host(.flat-dropdown-type) .ui-dropdown-option.ui-dropdown-option-selected:lang(ar-ae)::after {\n  right: auto;\n  left: 10px;\n}\n:host(.flat-dropdown-type) .ui-dropdown-option:hover {\n  color: #f0e6d2;\n  background-color: #1e2328;\n}\n:host(.flat-dropdown-type) .ui-dropdown-option:active {\n  color: #463714;\n  background-color: rgba(30,35,40,0.5);\n}\n:host(.framed-dropdown-type) .ui-dropdown-option {\n  align-items: center;\n  border-top: thin solid #1f2123;\n  color: #cdbe91;\n  cursor: pointer;\n  display: block;\n  min-height: 30px;\n  line-height: var(--dropdown-option-framed-line-height);\n  margin: 0;\n  overflow: hidden;\n  padding: 2px 9px 2px 7px;\n  position: relative;\n  text-overflow: ellipsis;\n  white-space: var(--dropdown-option-framed-white-space);\n  overflow-wrap: var(--dropdown-option-framed-overflow-wrap);\n}\n:host(.framed-dropdown-type) .ui-dropdown-option:lang(ar-ae) {\n  direction: var(--dropdown-option-direction-rtl);\n}\n:host(.framed-dropdown-type) .ui-dropdown-option.ui-dropdown-option-disabled {\n  color: #888;\n  cursor: default;\n}\n:host(.framed-dropdown-type) .ui-dropdown-option.ui-dropdown-option-disabled:hover {\n  color: #888;\n  background-color: rgba(30,35,40,0);\n}\n:host(.framed-dropdown-type) .ui-dropdown-option.ui-dropdown-option-selected {\n  padding-right: 31px;\n}\n:host(.framed-dropdown-type) .ui-dropdown-option.ui-dropdown-option-selected:lang(ar-ae) {\n  padding-right: 7px;\n  padding-left: 31px;\n}\n:host(.framed-dropdown-type) .ui-dropdown-option.ui-dropdown-option-selected::after {\n  background: url("../../images/dropdown-check.png") center no-repeat;\n  width: 14px;\n  height: 11px;\n  position: absolute;\n  right: 13px;\n  top: 50%;\n  transform: translate(0, -50%);\n  content: \'\';\n}\n:host(.framed-dropdown-type) .ui-dropdown-option.ui-dropdown-option-selected:lang(ar-ae)::after {\n  right: auto;\n  left: 13px;\n}\n:host(.framed-dropdown-type) .ui-dropdown-option:hover {\n  color: #f0e6d2;\n  background-color: #1e2328;\n}\n:host(.framed-dropdown-type) .ui-dropdown-option:active {\n  color: #463714;\n  background-color: rgba(30,35,40,0.5);\n}\n'],
                sourceRoot: ""
            }]), t.exports = a
        }, t => {
            "use strict";
            t.exports = function(t) {
                var e = t[1],
                    n = t[3];
                if (!n) return e;
                if ("function" == typeof btoa) {
                    var i = btoa(unescape(encodeURIComponent(JSON.stringify(n)))),
                        o = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(i),
                        r = "/*# ".concat(o, " */");
                    return [e].concat([r]).join("\n")
                }
                return [e].join("\n")
            }
        }, t => {
            "use strict";
            t.exports = function(t, e) {
                return e || (e = {}), t ? (t = String(t.__esModule ? t.default : t), /^['"].*['"]$/.test(t) && (t = t.slice(1, -1)), e.hash && (t += e.hash), /["'() \t\n]|(%20)/.test(t) || e.needQuotes ? '"'.concat(t.replace(/"/g, '\\"').replace(/\n/g, "\\n"), '"') : t) : t
            }
        }, (t, e, n) => {
            "use strict";
            t.exports = n.p + "dropdown-check.png"
        }, (t, e, n) => {
            "use strict";
            Object.defineProperty(e, "__esModule", {
                value: !0
            }), e.default = void 0;
            var i = n(1);
            class o extends i.webComponents.ShadowElement {
                templateMarkup() {
                    return n(83)
                }
                stylesheetMarkup() {
                    return n(84)
                }
            }
            o.tagName = "lol-uikit-flat-button-group";
            var r = o;
            e.default = r
        }, t => {
            "use strict";
            t.exports = '<template>\r\n  <div class="lol-uikit-flat-button-group">\r\n    <slot></slot>\r\n  </div>\r\n</template>'
        }, (t, e, n) => {
            var i = n(9),
                o = n(10)(i);
            o.push([t.id, ":host {\n  --flat-button-group-background-color: #010a13;\n}\n:host {\n  display: inline-flex;\n}\n:host(:not([type=dialog-frame])) .lol-uikit-flat-button-group {\n  border: thin solid #32281e;\n  border-image: $gradient-palette_button-click 1;\n  background-color: var(--flat-button-group-background-color);\n  padding: 5px;\n  display: flex;\n}\n:host([type=dialog-frame]) .lol-uikit-flat-button-group {\n  position: relative;\n  background-color: var(--flat-button-group-background-color);\n  padding: 0 4px;\n  display: flex;\n}\n:host([type=dialog-frame]) .lol-uikit-flat-button-group::before,\n:host([type=dialog-frame]) .lol-uikit-flat-button-group::after {\n  content: '';\n  position: absolute;\n  height: 10px;\n}\n:host([type=dialog-frame]) .lol-uikit-flat-button-group::before {\n  left: 0;\n  bottom: 0;\n  border-right: 2px solid #614a1f;\n  border-top: 2px solid transparent;\n  height: 10px;\n}\n:host([type=dialog-frame]) .lol-uikit-flat-button-group::after {\n  right: 0;\n  bottom: 0;\n  border-left: 2px solid #614a1f;\n  border-top: 2px solid transparent;\n  height: 10px;\n}\n:host([type=window-popup]) .lol-uikit-flat-button-group {\n  border: none;\n  position: relative;\n  background-color: var(--flat-button-group-background-color);\n  padding: 0 4px;\n  display: flex;\n}\n:host([type=window-popup]) .lol-uikit-flat-button-group::before,\n:host([type=window-popup]) .lol-uikit-flat-button-group::after {\n  content: '';\n  position: absolute;\n  height: 10px;\n}\n:host([type=window-popup]) .lol-uikit-flat-button-group::before {\n  left: 0;\n  bottom: 0;\n  border-right: 2px solid #614a1f;\n  border-top: 2px solid transparent;\n  height: 10px;\n}\n:host([type=window-popup]) .lol-uikit-flat-button-group::after {\n  right: 0;\n  bottom: 0;\n  border-left: 2px solid #614a1f;\n  border-top: 2px solid transparent;\n  height: 10px;\n}\n", ""]), t.exports = o
        }, (t, e, n) => {
            "use strict";
            Object.defineProperty(e, "__esModule", {
                value: !0
            }), e.default = void 0;
            var i = n(18),
                o = n(1);
            const r = "default",
                s = "over",
                a = "down",
                l = "click",
                d = "disabled";
            class c extends o.webComponents.ShadowElement {
                templateMarkup() {
                    return n(86)
                }
                stylesheetMarkup() {
                    return n(87)
                }
                constructor() {
                    super(), this._mouseOverEvent = this._mouseover.bind(this), this._mouseOutEvent = this._mouseout.bind(this), this._mouseDownEvent = this._mousedown.bind(this), this._clickEvent = this._click.bind(this)
                }
                connectedCallback() {
                    super.connectedCallback(), this._addMouseEvents()
                }
                disconnectedCallback() {
                    super.disconnectedCallback(), this._removeMouseEvents()
                }
                static get observedAttributes() {
                    return ["disabled"]
                }
                processAttributes() {
                    this._disabledCheck()
                }
                _disabledCheck() {
                    this.isDisabled() ? (this._removeMouseEvents(), this._setMouseClass(d)) : (this._addMouseEvents(), this._setMouseClass(r))
                }
                isDisabled() {
                    return (0, i.isAttrTruthy)("disabled", this.getAttribute("disabled"))
                }
                _addMouseEvents() {
                    const t = this.shadowRoot;
                    t && (t.addEventListener("mouseover", this._mouseOverEvent), t.addEventListener("mouseout", this._mouseOutEvent), t.addEventListener("mousedown", this._mouseDownEvent), t.addEventListener("click", this._clickEvent))
                }
                _removeMouseEvents() {
                    const t = this.shadowRoot;
                    t && (t.removeEventListener("mouseover", this._mouseOverEvent), t.removeEventListener("mouseout", this._mouseOutEvent), t.removeEventListener("mousedown", this._mouseDownEvent), t.removeEventListener("click", this._clickEvent))
                }
                _mouseover() {
                    this._setMouseClass(s)
                }
                _mouseout() {
                    this._setMouseClass(r)
                }
                _mousedown() {
                    this._setMouseClass(a)
                }
                _click() {
                    return this._setMouseClass(l), this._mouseAnimationTimeout(c._clickAnimationDurationMs)
                }
                _mouseAnimationTimeout(t) {
                    return this._removeMouseEvents(), new Promise((e => {
                        setTimeout((() => {
                            this._disabledCheck(), e()
                        }), t)
                    }))
                }
                _setMouseClass(t) {
                    const e = [r, s, a, l, d],
                        n = t || r,
                        i = this.shadowRoot,
                        o = i.querySelector(".lol-uikit-flat-button-secondary-wrapper"),
                        c = i.querySelector(".button-frame-container");
                    e.forEach((t => {
                        if (t !== n) {
                            c.querySelector("." + t).style.opacity = 0, o.classList.remove(t)
                        }
                    }));
                    c.querySelector("." + n).style.opacity = 1, o.classList.add(n)
                }
            }
            c.tagName = "lol-uikit-flat-button-secondary", c._clickAnimationDurationMs = 250;
            var u = c;
            e.default = u
        }, t => {
            "use strict";
            t.exports = '<template>\r\n  <div class="lol-uikit-flat-button-secondary-wrapper">\r\n    <div class="button-frame-container">\r\n      <div class="default"></div>\r\n      <div class="over"></div>\r\n      <div class="down click"></div>\r\n      <div class="disabled"></div>\r\n    </div>\r\n    <div class="lol-uikit-flat-button-secondary-content">\r\n      <slot></slot>\r\n    </div>\r\n  </div>\r\n</template>\r\n'
        }, (t, e, n) => {
            var i = n(9),
                o = n(10)(i);
            o.push([t.id, '.lol-uikit-flat-button-secondary-wrapper .lol-uikit-flat-button-secondary-content {\n  font-family: var(--font-body);\n}\n.lol-uikit-flat-button-secondary-wrapper .lol-uikit-flat-button-secondary-content {\n  -webkit-user-select: none;\n}\n.lol-uikit-flat-button-secondary-wrapper .lol-uikit-flat-button-secondary-content {\n  font-kerning: normal;\n  -webkit-font-feature-settings: "kern" 1;\n  -webkit-font-smoothing: antialiased;\n}\n.lol-uikit-flat-button-secondary-wrapper .lol-uikit-flat-button-secondary-content {\n  color: #a09b8c;\n  font-size: 12px;\n  font-weight: normal;\n  line-height: 16px;\n  letter-spacing: 0.025em;\n  -webkit-font-smoothing: subpixel-antialiased;\n}\n.lol-uikit-flat-button-secondary-wrapper .lol-uikit-flat-button-secondary-content:lang(ja-jp) {\n  font-size: 13px;\n}\n.lol-uikit-flat-button-secondary-wrapper .lol-uikit-flat-button-secondary-content:lang(ar-ae) {\n  letter-spacing: 0;\n}\n:host {\n  display: block;\n}\n.lol-uikit-flat-button-secondary-wrapper {\n  position: relative;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  box-sizing: border-box;\n  min-width: 90px;\n  height: 100%;\n  min-height: 32px;\n  cursor: pointer;\n  -webkit-user-select: none;\n}\n.lol-uikit-flat-button-secondary-wrapper .button-frame-container {\n  position: absolute;\n  width: 100%;\n  height: 100%;\n}\n.lol-uikit-flat-button-secondary-wrapper .button-frame-container .default,\n.lol-uikit-flat-button-secondary-wrapper .button-frame-container .over,\n.lol-uikit-flat-button-secondary-wrapper .button-frame-container .down,\n.lol-uikit-flat-button-secondary-wrapper .button-frame-container .disabled {\n  position: absolute;\n  width: 100%;\n  height: 100%;\n  box-sizing: border-box;\n  background: #1e2328;\n  box-shadow: 0 0 1px 1px #010a13, inset 0 0 1px 1px #010a13;\n  border: thin solid transparent;\n  border-image-slice: 1;\n  opacity: 0;\n  transition: opacity 200ms linear;\n}\n.lol-uikit-flat-button-secondary-wrapper .button-frame-container .default {\n  opacity: 1;\n  border-image-source: linear-gradient(to top, #785b28 0%, #c89c3c 55%, #c8a355 71%, #c8aa6e 100%);\n}\n.lol-uikit-flat-button-secondary-wrapper .button-frame-container .over {\n  background: linear-gradient(to bottom, #1e232a 0%, #1e232a 40%, rgba(118,97,51,0.8) 140%);\n  border-image-source: linear-gradient(to top, #c89c3c 0%, #dcc188 50%, #e1c998 71%, #f0e6d8 100%);\n}\n.lol-uikit-flat-button-secondary-wrapper .button-frame-container .down,\n.lol-uikit-flat-button-secondary-wrapper .button-frame-container .click {\n  transition-duration: 100ms;\n  border-image-source: linear-gradient(to top, #6b5024, #463714);\n}\n.lol-uikit-flat-button-secondary-wrapper .button-frame-container .disabled {\n  border-color: #5c5b57;\n}\n.lol-uikit-flat-button-secondary-wrapper .lol-uikit-flat-button-secondary-content {\n  position: relative;\n  display: flex;\n  flex-basis: 100%;\n  align-items: center;\n  justify-content: center;\n  top: 1px;\n  padding: 1px 15px;\n  font-weight: 700;\n  white-space: nowrap;\n  color: transparent;\n  background-color: #cdbe91;\n  -webkit-background-clip: text;\n  transition: all 200ms linear;\n}\n.lol-uikit-flat-button-secondary-wrapper.over .lol-uikit-flat-button-secondary-content {\n  background-color: #f0e6d2;\n}\n.lol-uikit-flat-button-secondary-wrapper.down .lol-uikit-flat-button-secondary-content,\n.lol-uikit-flat-button-secondary-wrapper.click .lol-uikit-flat-button-secondary-content {\n  transition-duration: 100ms;\n  background-color: #785a28;\n}\n.lol-uikit-flat-button-secondary-wrapper.click {\n  pointer-events: none;\n}\n.lol-uikit-flat-button-secondary-wrapper.disabled {\n  pointer-events: none;\n}\n.lol-uikit-flat-button-secondary-wrapper.disabled .lol-uikit-flat-button-secondary-content {\n  background-color: #5c5b57;\n}\n', ""]), t.exports = o
        }, (t, e, n) => {
            "use strict";
            Object.defineProperty(e, "__esModule", {
                value: !0
            }), e.default = void 0;
            var i, o = n(1),
                r = (i = n(20)) && i.__esModule ? i : {
                    default: i
                };
            class s extends o.webComponents.ShadowElement {
                templateMarkup() {
                    return n(89)
                }
                stylesheetMarkup() {
                    return n(90)
                }
                connectedCallback() {
                    super.connectedCallback(), this._inputElementInitialized = !1, this._labelElementInitialized = !1, this.updateCheckedStateListener = this.updateCheckedStateListener || this._updateCheckedState.bind(this), this.toggleCheckedStateListener = this.toggleCheckedStateListener || this._toggleCheckedState.bind(this), this._initObserver = new MutationObserver(this._mutationCallback.bind(this)), this._initObserver.observe(this, {
                        childList: !0
                    });
                    const t = this._getInput();
                    t && this._initInputElement(t);
                    const e = this._getLabel();
                    e && this._initLabelElement(e), this.addEventListener("click", this.toggleCheckedStateListener)
                }
                _mutationCallback(t) {
                    t.forEach((t => {
                        if ("childList" === t.type) {
                            Array.from(t.addedNodes).forEach((t => {
                                "INPUT" === t.tagName && this._initInputElement(t), "LABEL" === t.tagName && this._initLabelElement(t)
                            }))
                        }
                    }))
                }
                _initInputElement(t) {
                    if (!this._inputElementInitialized) {
                        const e = this,
                            n = Object.getOwnPropertyDescriptor(t.__proto__, "checked"),
                            i = n.set;
                        n.set = function(t) {
                            i.call(this, t), e._updateCheckedState()
                        }, Object.defineProperty(t, "checked", n), t.addEventListener("change", this.updateCheckedStateListener), this._updateCheckedState(), t.addEventListener("click", (t => {
                            t.stopPropagation()
                        })), this._setUpDisabledAttributeObserver(), this._inputElementInitialized = !0
                    }
                    this._inputElementInitialized && this._labelElementInitialized && this._initObserver.disconnect()
                }
                _initLabelElement(t) {
                    this._labelElementInitialized || (t.removeAttribute("for"), this._labelElementInitialized = !0), this._inputElementInitialized && this._labelElementInitialized && this._initObserver.disconnect()
                }
                _setUpDisabledAttributeObserver() {
                    const t = this._getInput();
                    if (!t) return;
                    const e = new MutationObserver(this._observeDisabledAttribute.bind(this));
                    e.observe(t, {
                        attributes: !0,
                        attributeFilter: ["disabled"]
                    }), this.disabledAttributeObserver = e, this._observeDisabledAttribute()
                }
                disconnectedCallback() {
                    super.disconnectedCallback();
                    const t = this._getInput();
                    t && t.removeEventListener("change", this.updateCheckedStateListener), this.disabledAttributeObserver && this.disabledAttributeObserver.disconnect()
                }
                _getInput() {
                    return this.querySelector("input")
                }
                _getLabel() {
                    return this.querySelector("label")
                }
                _getSpan() {
                    return this.shadowRoot.querySelector("span")
                }
                _toggleCheckedState() {
                    const t = this._getInput();
                    if (t.click(), !t.disabled) {
                        const e = new Event("checkboxToggle", {
                            bubbles: !0
                        });
                        e.checked = t, this.dispatchEvent(e), this._playClickSound()
                    }
                }
                _updateCheckedState() {
                    this._getInput().checked ? this.classList.add("checked") : this.classList.remove("checked")
                }
                _observeDisabledAttribute() {
                    const t = this._getInput();
                    t && t.disabled ? this.classList.add("disabled") : this.classList.remove("disabled")
                }
                _playClickSound() {
                    (0, o.getProvider)().get("rcp-fe-audio").getChannel("sfx-ui").playSound(r.default.flatCheckBoxClick)
                }
            }
            s.tagName = "lol-uikit-flat-checkbox";
            var a = s;
            e.default = a
        }, t => {
            "use strict";
            t.exports = '<template>\r\n  <slot name="input"></slot>\r\n  <span class="checkbox-span"></span>\r\n  <slot name="label"></slot>\r\n</template>\r\n'
        }, (t, e, n) => {
            var i = n(9),
                o = n(10)(i);
            o.push([t.id, ':host ::slotted(label) {\n  font-family: var(--font-body);\n}\n:host ::slotted(label) {\n  -webkit-user-select: none;\n}\n:host ::slotted(label) {\n  font-kerning: normal;\n  -webkit-font-feature-settings: "kern" 1;\n  -webkit-font-smoothing: antialiased;\n}\n:host ::slotted(label) {\n  color: #a09b8c;\n  font-size: 12px;\n  font-weight: normal;\n  line-height: 16px;\n  letter-spacing: 0.1em;\n  -webkit-font-smoothing: subpixel-antialiased;\n}\n:host ::slotted(label):lang(ja-jp) {\n  font-size: 13px;\n}\n:host ::slotted(label):lang(ar-ae) {\n  letter-spacing: 0;\n}\n:host {\n  display: flex;\n  align-items: center;\n  cursor: pointer;\n}\n:host ::slotted(input) {\n  opacity: 0;\n  position: absolute;\n  pointer-events: none;\n}\n:host ::slotted(label) {\n  color: #a09b8c;\n  cursor: pointer;\n  margin: 1px 0 0 5px;\n}\n:host ::slotted(label):lang(ar-ae) {\n  direction: rtl;\n  margin: 1px 5px 0 0;\n}\n:host span.checkbox-span {\n  width: 14px;\n  height: 14px;\n  background: url("/fe/lol-uikit/images/checkbox-spritesheet.png") no-repeat;\n  cursor: pointer;\n  flex-shrink: 0;\n}\n:host ::slotted(input:checked) + span.checkbox-span {\n  background-position-y: -14px;\n}\n:host(.checked) span.checkbox-span {\n  background-position-y: -28px;\n}\n:host(.checked:hover:not(.disabled)) span.checkbox-span {\n  background-position-y: -42px;\n}\n:host(.disabled) {\n  -webkit-filter: brightness(0.5);\n  cursor: default;\n}\n:host(.disabled) span.checkbox-span,\n:host(.disabled):hover span.checkbox-span {\n  cursor: default;\n}\n:host(.disabled) ::slotted(label) {\n  color: #a09b8c;\n  cursor: default;\n}\n:host(:not(.disabled)) ::slotted(input:focus) + ::slotted(label) {\n  color: #f0e6d2;\n}\n:host(:not(.disabled):hover) span.checkbox-span {\n  background-position-y: -14px;\n}\n:host(:not(.disabled):hover) ::slotted(label) {\n  color: #f0e6d2;\n}\n:host(:lang(ar-ae)) {\n  direction: rtl;\n}\n', ""]), t.exports = o
        }, (t, e, n) => {
            "use strict";
            Object.defineProperty(e, "__esModule", {
                value: !0
            }), e.default = void 0;
            var i = r(n(92)),
                o = r(n(2));

            function r(t) {
                return t && t.__esModule ? t : {
                    default: t
                }
            }
            class s extends i.default {
                templateMarkup() {
                    return n(96)
                }
                stylesheetMarkup() {
                    return n(97)
                }
                template() {
                    return o.default.get().getElementById("lol-uikit-template-flat-dropdown")
                }
            }
            s.tagName = "lol-uikit-flat-dropdown";
            var a = s;
            e.default = a
        }, (t, e, n) => {
            "use strict";
            Object.defineProperty(e, "__esModule", {
                value: !0
            }), e.default = void 0;
            var i = n(17),
                o = n(1),
                r = c(n(19)),
                s = c(n(93)),
                a = c(n(20)),
                l = c(n(76)),
                d = n(18);

            function c(t) {
                return t && t.__esModule ? t : {
                    default: t
                }
            }
            const u = ["close", "keyup", "mousedown", "blur"];
            class p extends o.webComponents.ShadowElement {
                template() {
                    throw new Error("Must override this base class to get a dropdown element")
                }
                constructor() {
                    super(), this.optionNodes = [], this.selected = !1, this.isDropdownOpen = !1, this.updateSelectedRequired = !0, this.currentElement = null, this.shadowContentElement = null, this.lightContentElement = null, this._dropdownSound = this._createSound(a.default.dropdownClick), this._handleClick = this._handleClick.bind(this), this._handleKeyUp = this._handleKeyUp.bind(this), this._handleDOMChange = this._handleDOMChange.bind(this), this._refreshSelected = () => {
                        this.refreshSelected()
                    }, this._handleClosableEvent = this._handleClosableEvent.bind(this)
                }
                connectedCallback() {
                    super.connectedCallback();
                    const t = this.getBoundingClientRect();
                    this._windowHeight = window.innerHeight, this._windowScrollY = window.scrollY, this._elementOffsetTop = t.top + this._windowScrollY, this._offsetHeight = this.offsetHeight, this._findSelected(), this._updateSelected(), this._attachEvents(), this._updateClasses(), (0, s.default)(this).then((() => {
                        this._checkOptionsRoom()
                    })), this.tabIndex = 0
                }
                disconnectedCallback() {
                    super.disconnectedCallback(), this._detachEvents()
                }
                _descendantOptions(t = "") {
                    const e = ["lol-uikit-dropdown-option"].map((e => `${e}${t}`)).join(",");
                    return Array.from(this.querySelectorAll(e))
                }
                _makeSelected(t) {
                    this._descendantOptions().forEach((e => {
                        e === t ? (e.removeAttribute("selected"), e.setAttribute("selected", !0)) : e.removeAttribute("selected")
                    })), this.selected = t
                }
                select(t) {
                    const e = this._descendantOptions();
                    for (let n = 0; n < e.length; n++) {
                        const i = e[n];
                        if (!0 === ("function" == typeof t ? t(i) : i.getAttribute("value") === t)) return this.selectOption(i)
                    }
                }
                selectOption(t) {
                    if (t !== this.selected) {
                        this._makeSelected(t);
                        const e = new Event("selected", {
                            composed: !0
                        });
                        e.selected = this.selected, this.dispatchEvent(e), this._updateSelected()
                    }
                    this._close()
                }
                refreshSelected() {
                    this.updateSelectedRequired = !0, this._findSelected(), this._updateSelected()
                }
                _checkOptionsRoom() {
                    const t = this.shadowRoot.querySelector(".ui-dropdown"),
                        e = this.shadowRoot.querySelector(".ui-dropdown-options-container lol-uikit-scrollable"),
                        n = this.getAttribute("direction"),
                        i = this._getTopOfDropdown(),
                        o = this._getBottomOfDropdown();
                    if ("upward" === n) return t.classList.add("opens-upward"), void this._constrainHeightToTop(e, i);
                    if ("downward" === n) return void this._constrainHeightToBottom(e, o);
                    const r = this._getWindowHeight();
                    this._extendsBelowClient(e, o) && i >= r / 2 ? (t.classList.add("opens-upward"), this._constrainHeightToTop(e, i)) : (t.classList.remove("opens-upward"), this._constrainHeightToBottom(e, o))
                }
                _extendsBelowClient(t, e) {
                    const n = this._getWindowHeight();
                    return e + t.offsetHeight > n
                }
                _extendsAboveClient(t, e) {
                    return e - t.offsetHeight < 10
                }
                _constrainHeightToTop(t, e) {
                    if (this._extendsAboveClient(t, e)) {
                        const n = Math.floor(e - 10);
                        t.style.maxHeight = n + "px"
                    }
                }
                _constrainHeightToBottom(t, e) {
                    const n = this._getWindowHeight();
                    if (this._extendsBelowClient(t, e)) {
                        const i = Math.floor(n - e - 10);
                        t.style.maxHeight = i + "px"
                    }
                }
                _getWindowHeight() {
                    return this._windowHeight - 10
                }
                _getBottomOfDropdown() {
                    return this._windowScrollY + this._elementOffsetTop + this._offsetHeight
                }
                _getTopOfDropdown() {
                    return this._windowScrollY + this._elementOffsetTop
                }
                _getOptionHeight(t) {
                    return t.offsetHeight
                }
                _findSelected() {
                    const t = this._descendantOptions("[selected]")[0];
                    if (t) return void(this.selected = t);
                    const e = this._descendantOptions(":not([unselectable]):not([disabled])")[0];
                    e && (e.setAttribute("selected", !0), this.selected = e)
                }
                _updateSelected() {
                    if (this.currentElement && this.updateSelectedRequired) {
                        const t = this.getAttribute("staticDisplay");
                        t ? (this.updateSelectedRequired = !1, this.currentElement.innerText !== t && (this.currentElement.innerText = t)) : this.selected && this.currentElement.innerHTML !== this.selected.innerHTML && (this.currentElement.innerHTML = this.selected.innerHTML)
                    }
                }
                _attachEvents() {
                    this.shadowRoot.querySelector(".ui-dropdown-current").addEventListener("click", this._handleClick), this.addEventListener("keyup", this._handleKeyUp), this.addEventListener("reset", this._refreshSelected), this._observer = new MutationObserver(this._handleDOMChange), this._observer.observe(this, {
                        childList: !0,
                        subtree: !0,
                        characterData: !0,
                        attributes: !0,
                        attributeOldValue: !0
                    })
                }
                _detachEvents() {
                    this.shadowRoot.querySelector(".ui-dropdown-current").removeEventListener("click", this._handleClick), this.removeEventListener("keyup", this._handleKeyUp), this.removeEventListener("reset", this._refreshSelected), this._observer.disconnect(), this._observer = null
                }
                _handleDOMChange(t) {
                    let e, n, i;
                    t.forEach((t => {
                        const {
                            attributeName: o
                        } = t, {
                            oldValue: r
                        } = t, {
                            target: s
                        } = t;
                        if ("childList" === t.type) {
                            Array.from(t.addedNodes).forEach((t => {
                                t instanceof l.default && t.getAttribute("selected") && (i = t)
                            })), this._checkOptionsRoom()
                        }
                        "disabled" === o ? (e = !(0, d.isAttrTruthy)("disabled", r), n = (0, d.isAttrTruthy)("disabled", s.getAttribute("disabled")), this.isDropdownOpen && e && n && this._close()) : "selected" === o && (0, d.isAttrTruthy)("selected", s.getAttribute("selected")) && this._descendantOptions().forEach((function(t) {
                            t !== s && t.getAttribute("selected") && t.removeAttribute("selected")
                        }))
                    })), i && this._descendantOptions().forEach((function(t) {
                        t !== i && t.getAttribute("selected") && t.removeAttribute("selected")
                    })), this._updateClasses(), this.refreshSelected()
                }
                _handleKeyUp(t) {
                    32 !== t.keyCode && 13 !== t.keyCode || this._toggleDropdown()
                }
                _handleClick() {
                    this._toggleDropdown()
                }
                _toggleDropdown() {
                    this._isDisabled() || (this.isDropdownOpen ? this._close() : this._open(), this._dropdownSound.play())
                }
                _createSound(t) {
                    return (0, i.createSound)("sfx-ui", t, {
                        allowConcurrency: !1
                    })
                }
                _handleClosableEvent(t = {}) {
                    const e = this === t.target,
                        n = (0, r.default)(this).has(t.target).length > 0;
                    e || n || this._close()
                }
                _open() {
                    this._isDisabled() || (this.isDropdownOpen = !0, this.classList.add("active"), (0, r.default)(window).on(u.join(" "), this._handleClosableEvent), this._scrollToSelectedOption())
                }
                _close() {
                    this.isDropdownOpen = !1, this.classList.remove("active"), (0, r.default)(window).off(u.join(" "), this._handleClosableEvent)
                }
                _isDisabled() {
                    return (0, d.isAttrTruthy)("disabled", this.getAttribute("disabled"))
                }
                _updateContentElement() {
                    this.isStylableContent = (0, d.isAttrTruthy)("stylablecontent", this.getAttribute("stylablecontent")), this.isStylableContent && !this.lightContentElement ? (this.lightContentElement = document.createElement("div"), this.lightContentElement.setAttribute("slot", ".ui-dropdown-current-content.light"), this.lightContentElement.classList.add("ui-dropdown-current-content"), this.lightContentElement.classList.add("light"), this.appendChild(this.lightContentElement)) : !this.isStylableContent && this.lightContentElement && (this.removeChild(this.lightContentElement), this.lightContentElement = null), this.shadowContentElement || (this.shadowContentElement = this.shadowRoot.querySelector(".ui-dropdown-current-content")), this.currentElement = this.isStylableContent ? this.lightContentElement : this.shadowContentElement
                }
                _updateClasses() {
                    this.classList.toggle("disabled", this._isDisabled()), this._updateContentElement()
                }
                _scrollToSelectedOption() {
                    const t = this.shadowRoot.querySelector("lol-uikit-scrollable");
                    if (t && t.clientHeight < t.scrollHeight) {
                        const e = this._descendantOptions()[0],
                            n = this._descendantOptions("[selected]")[0];
                        if (e && n) {
                            const i = e.offsetTop,
                                o = n.offsetTop;
                            t.scrollTop = o - i
                        }
                    }
                }
            }
            e.default = p
        }, (t, e, n) => {
            "use strict";
            Object.defineProperty(e, "__esModule", {
                value: !0
            }), e.default = function(t) {
                return new Promise((function(e) {
                    setTimeout((function() {
                        o(t) ? e(t) : document.body.contains(t) ? r(t, e) : function(t, e) {
                            t.classList.add("uikit-added-to-dom"), t.addEventListener("animationstart", (function n(i) {
                                "uikit-added-to-dom-animation" === i.animationName && (i.stopPropagation(), i.preventDefault(), t.classList.remove("uikit-added-to-dom"), t.removeEventListener("animationstart", n), o(t) ? e(t) : r(t, e))
                            }))
                        }(t, e)
                    }), 0)
                }))
            }, n(94);
            var i = n(95);

            function o(t) {
                const e = t.getBoundingClientRect();
                return e.width > 0 || e.height > 0
            }

            function r(t, e) {
                (0, i.addResizeListener)(t, (function n() {
                    o(t) && ((0, i.removeResizeListener)(t, n), e(t))
                }))
            }
        }, (t, e, n) => {
            "use strict";
            n.r(e)
        }, (t, e, n) => {
            "use strict";
            Object.defineProperty(e, "__esModule", {
                value: !0
            }), e.addResizeListener = function(t, e) {
                if (!t.__resizeListeners__) {
                    t.__resizeListeners__ = [], "static" === getComputedStyle(t).position && (i.logger.trace("Calling addResizeListener on a DOM element with its CSS position property set to static will result in it automatically being changed to position: relative."), t.style.position = "relative");
                    const e = t.__resizeTrigger__ = document.createElement("object");
                    e.setAttribute("style", "display: block; position: absolute;top: 0; left: 0; height: 100%; width: 100%; overflow: hidden;pointer-events: none; z-index: -1;"), e.__resizeElement__ = t, e.classList.add("uikit-resize-detection-helper"), e.onload = r, e.type = "text/html", e.data = "about:blank", t.appendChild(e)
                }
                t.__resizeListeners__.push(e)
            }, e.removeResizeListener = function(t, e) {
                if (!t.__resizeListeners__ || 0 === t.__resizeListeners__.length) return;
                t.__resizeListeners__.splice(t.__resizeListeners__.indexOf(e), 1), t.__resizeListeners__.length || (t.__resizeTrigger__.contentDocument.defaultView.removeEventListener("resize", o), t.__resizeTrigger__ = !t.removeChild(t.__resizeTrigger__))
            };
            var i = n(1);

            function o(t) {
                const e = t.target || t.srcElement;
                e.__resizeRAF__ && e.cancelAnimationFrame(e.__resizeRAF__), e.__resizeRAF__ = e.requestAnimationFrame((function() {
                    const n = e.__resizeTrigger__;
                    n.__resizeListeners__.forEach((function(e) {
                        e.call(n, t)
                    }))
                }))
            }

            function r() {
                this.contentDocument.defaultView.__resizeTrigger__ = this.__resizeElement__, this.contentDocument.defaultView.addEventListener("resize", o)
            }
        }, t => {
            "use strict";
            t.exports = '<template>\r\n  <div class="ui-dropdown">\r\n    <div class="ui-dropdown-options-container">\r\n      <lol-uikit-scrollable>\r\n        <div class="ui-dropdown-ungrouped-options">\r\n          <slot name="lol-uikit-dropdown-option"></slot>\r\n        </div>\r\n        <div class="ui-dropdown-optgroups">\r\n          <slot name="lol-uikit-dropdown-optgroup"></slot>\r\n        </div>\r\n        \x3c!--\r\n          This <slot> element used to invite in the host options list cannot include\r\n          the host\'s self-generated currently selected element (see base-dropdown.js\r\n          for the case where the stylablecontent attribute is set).\r\n        --\x3e\r\n        <slot></slot>\r\n      </lol-uikit-scrollable>\r\n    </div>\r\n    \x3c!-- \r\n      There\'s some subtlety in the way the slot elements are ordered and in the way\r\n      their invitations are triggered here. The currently selected element\r\n      must lie on top of the options list, otherwise when the options list is expanded,\r\n      the currently selected element will be covered up. This is why the \r\n      ui-dropdown-current section is AFTER the ui-dropdown-options-container section.\r\n    --\x3e\r\n    <div class="ui-dropdown-current">\r\n      <div class="ui-dropdown-current-content shadow"></div>\r\n      <slot name=".ui-dropdown-current-content.light"></slot>\r\n    </div>\r\n  </div>\r\n</template>\r\n'
        }, (t, e, n) => {
            var i = n(79),
                o = n(10),
                r = n(80),
                s = n(98),
                a = n(99),
                l = o(i),
                d = r(s),
                c = r(a);
            l.push([t.id, ":host .ui-dropdown .ui-dropdown-current {\n  font-family: var(--font-display);\n}\n:host .ui-dropdown .ui-dropdown-current {\n  -webkit-user-select: none;\n}\n:host .ui-dropdown .ui-dropdown-current {\n  font-kerning: normal;\n  -webkit-font-feature-settings: \"kern\" 1;\n  -webkit-font-smoothing: antialiased;\n}\n:host .ui-dropdown .ui-dropdown-current {\n  text-transform: uppercase;\n}\n:host .ui-dropdown .ui-dropdown-current:lang(ko-kr),\n:host .ui-dropdown .ui-dropdown-current:lang(ja-jp),\n:host .ui-dropdown .ui-dropdown-current:lang(tr-tr),\n:host .ui-dropdown .ui-dropdown-current:lang(el-gr),\n:host .ui-dropdown .ui-dropdown-current:lang(th-th),\n:host .ui-dropdown .ui-dropdown-current:lang(zh-tw) {\n  text-transform: none;\n}\n:host .ui-dropdown .ui-dropdown-current {\n  color: #f0e6d2;\n  font-size: 18px;\n  font-weight: 700;\n  line-height: 22px;\n  letter-spacing: 0.05em;\n}\n:host .ui-dropdown .ui-dropdown-current:lang(ar-ae) {\n  letter-spacing: 0;\n}\n:host(.active) .ui-dropdown .ui-dropdown-options-container {\n  border: thin solid transparent;\n  border-image: linear-gradient(to top, #695625, #463714) 1;\n}\n:host {\n  --flat-dropdown-current-height: 40px;\n  --flat-dropdown-scrollable-max-height: none;\n  --flat-dropdownactive-z-index: auto;\n  --flat-dropdownactive-max-width: none;\n  --flat-dropdownactive-current-display: flex;\n  --flat-dropdownactive-opens-upward-container-padding: 0 0 40px 0;\n  --flat-dropdownactive-opens-upward-container-margin: 0;\n  --flat-dropdown-current-content-display: block;\n  --flat-dropdown-current-content-max-width: none;\n  --flat-dropdown-current-content-text-transform: none;\n  --flat-dropdown-current-content-white-space: normal;\n  --flat-dropdown-current-content-text-overflow: clip;\n  --flat-dropdown-current-content-overflow: visible;\n  --flat-dropdown-current-content-color: #cdbe91;\n  --flat-dropdown-current-content-font-size: 18px;\n  --flat-dropdown-current-content-line-height: 22px;\n  --flat-dropdown-current-content-letter-spacing: 0.025em;\n  --flat-dropdown-direction-rtl: rtl;\n  --flat-dropdown-current-after-margin-rtl: 0 7px 0 0;\n}\n:host([stylablecontent]) .ui-dropdown-current-content.shadow {\n  display: none;\n}\n:host(:not([stylablecontent])) .ui-dropdown-current-content.light {\n  display: none;\n}\n:host .ui-dropdown-current-content,\n:host ::slotted(.ui-dropdown-current-content) {\n  display: var(--flat-dropdown-current-content-display);\n  max-width: var(--flat-dropdown-current-content-max-width);\n  text-transform: var(--flat-dropdown-current-content-text-transform);\n  white-space: var(--flat-dropdown-current-content-white-space);\n  text-overflow: var(--flat-dropdown-current-content-text-overflow);\n  overflow: var(--flat-dropdown-current-content-overflow);\n  color: var(--flat-dropdown-current-content-color);\n  font-size: var(--flat-dropdown-current-content-font-size);\n  line-height: var(--flat-dropdown-current-content-line-height);\n  letter-spacing: var(--flat-dropdown-current-letter-spacing);\n}\n:host {\n  display: inline-flex;\n  flex-direction: column;\n  width: 100%;\n  height: 40px;\n  outline: 0;\n}\n:host .ui-dropdown {\n  display: inline-flex;\n  flex-direction: column;\n  box-sizing: border-box;\n  position: relative;\n  user-select: none;\n  margin: 0;\n  width: 100%;\n  padding: 0;\n}\n:host .ui-dropdown:lang(ar-ae) {\n  direction: var(--flat-dropdown-direction-rtl);\n}\n:host .ui-dropdown .ui-dropdown-current {\n  display: flex;\n  flex-direction: row;\n  background: none;\n  position: absolute;\n  height: var(--flat-dropdown-current-height);\n  margin: 0;\n  align-items: center;\n  padding: 0 10px;\n  cursor: pointer;\n}\n:host .ui-dropdown .ui-dropdown-current:hover {\n  color: #f0e6d2;\n}\n:host .ui-dropdown .ui-dropdown-current:hover::after {\n  -webkit-filter: brightness(2.2);\n}\n:host .ui-dropdown .ui-dropdown-current::after {\n  content: '';\n  background: url(" + d + ") center no-repeat;\n  width: 13px;\n  height: 19px;\n  margin: 0 0 0 7px;\n}\n:host .ui-dropdown .ui-dropdown-current:lang(ar-ae)::after {\n  margin: var(--flat-dropdown-current-after-margin-rtl);\n}\n:host .ui-dropdown .ui-dropdown-options-container {\n  background-color: #010a13;\n  width: 100%;\n  opacity: 0;\n  position: absolute;\n  height: 0;\n  visibility: hidden;\n  transition: opacity 400ms;\n}\n:host .ui-dropdown .ui-dropdown-options-container lol-uikit-scrollable {\n  max-height: var(--flat-dropdown-scrollable-max-height);\n}\n:host .ui-dropdown.opens-upward .ui-dropdown-options-container {\n  bottom: 100%;\n  top: auto;\n  margin-bottom: -42px;\n}\n:host(.active) .ui-dropdown {\n  z-index: var(--flat-dropdownactive-z-index);\n  max-width: var(--flat-dropdownactive-max-width);\n}\n:host(.active) .ui-dropdown .ui-dropdown-current {\n  display: var(--flat-dropdownactive-current-display);\n  color: #785a28;\n}\n:host(.active) .ui-dropdown .ui-dropdown-current:hover {\n  color: #785a28;\n}\n:host(.active) .ui-dropdown .ui-dropdown-current:hover::after {\n  -webkit-filter: none;\n}\n:host(.active) .ui-dropdown .ui-dropdown-current::after {\n  background-image: url(" + c + ");\n}\n:host(.active) .ui-dropdown .ui-dropdown-options-container {\n  border-width: 2px;\n  padding-top: 40px;\n  width: 100%;\n  opacity: 1;\n  height: auto;\n  transition: opacity 400ms;\n  visibility: visible;\n}\n:host(.active) .ui-dropdown.opens-upward .ui-dropdown-options-container {\n  padding: var(--flat-dropdownactive-opens-upward-container-padding);\n  margin: var(--flat-dropdownactive-opens-upward-container-margin);\n}\n:host(.disabled) {\n  cursor: default;\n  pointer-events: none;\n}\n:host(.disabled) .ui-dropdown .ui-dropdown-current {\n  color: #3c3c41;\n}\n:host(.disabled) .ui-dropdown .ui-dropdown-current::after {\n  -webkit-filter: grayscale(100%);\n  opacity: 0.35;\n}\n", "", {
                version: 3,
                sources: ["webpack://./fe/rcp-fe-lol-uikit/src/elements/flat-dropdown/component-style.styl"],
                names: [],
                mappings: "AAAA;EACE,gCAAgC;AAClC;AACA;EACE,yBAAyB;AAC3B;AACA;EACE,oBAAoB;EACpB,uCAAuC;EACvC,mCAAmC;AACrC;AACA;EACE,yBAAyB;AAC3B;AACA;;;;;;EAME,oBAAoB;AACtB;AACA;EACE,cAAc;EACd,eAAe;EACf,gBAAgB;EAChB,iBAAiB;EACjB,sBAAsB;AACxB;AACA;EACE,iBAAiB;AACnB;AACA;EACE,8BAA8B;EAC9B,yDAAyD;AAC3D;AACA;EACE,oCAAoC;EACpC,2CAA2C;EAC3C,mCAAmC;EACnC,qCAAqC;EACrC,2CAA2C;EAC3C,gEAAgE;EAChE,sDAAsD;EACtD,8CAA8C;EAC9C,+CAA+C;EAC/C,oDAAoD;EACpD,mDAAmD;EACnD,mDAAmD;EACnD,iDAAiD;EACjD,8CAA8C;EAC9C,+CAA+C;EAC/C,iDAAiD;EACjD,uDAAuD;EACvD,kCAAkC;EAClC,mDAAmD;AACrD;AACA;EACE,aAAa;AACf;AACA;EACE,aAAa;AACf;AACA;;EAEE,qDAAqD;EACrD,yDAAyD;EACzD,mEAAmE;EACnE,6DAA6D;EAC7D,iEAAiE;EACjE,uDAAuD;EACvD,iDAAiD;EACjD,yDAAyD;EACzD,6DAA6D;EAC7D,2DAA2D;AAC7D;AACA;EACE,oBAAoB;EACpB,sBAAsB;EACtB,WAAW;EACX,YAAY;EACZ,UAAU;AACZ;AACA;EACE,oBAAoB;EACpB,sBAAsB;EACtB,sBAAsB;EACtB,kBAAkB;EAClB,iBAAiB;EACjB,SAAS;EACT,WAAW;EACX,UAAU;AACZ;AACA;EACE,6CAA6C;AAC/C;AACA;EACE,aAAa;EACb,mBAAmB;EACnB,gBAAgB;EAChB,kBAAkB;EAClB,2CAA2C;EAC3C,SAAS;EACT,mBAAmB;EACnB,eAAe;EACf,eAAe;AACjB;AACA;EACE,cAAc;AAChB;AACA;EACE,+BAA+B;AACjC;AACA;EACE,WAAW;EACX,oEAAkE;EAClE,WAAW;EACX,YAAY;EACZ,iBAAiB;AACnB;AACA;EACE,qDAAqD;AACvD;AACA;EACE,yBAAyB;EACzB,WAAW;EACX,UAAU;EACV,kBAAkB;EAClB,SAAS;EACT,kBAAkB;EAClB,yBAAyB;AAC3B;AACA;EACE,sDAAsD;AACxD;AACA;EACE,YAAY;EACZ,SAAS;EACT,oBAAoB;AACtB;AACA;EACE,2CAA2C;EAC3C,+CAA+C;AACjD;AACA;EACE,mDAAmD;EACnD,cAAc;AAChB;AACA;EACE,cAAc;AAChB;AACA;EACE,oBAAoB;AACtB;AACA;EACE,yDAA8D;AAChE;AACA;EACE,iBAAiB;EACjB,iBAAiB;EACjB,WAAW;EACX,UAAU;EACV,YAAY;EACZ,yBAAyB;EACzB,mBAAmB;AACrB;AACA;EACE,kEAAkE;EAClE,gEAAgE;AAClE;AACA;EACE,eAAe;EACf,oBAAoB;AACtB;AACA;EACE,cAAc;AAChB;AACA;EACE,+BAA+B;EAC/B,aAAa;AACf",
                sourcesContent: [':host .ui-dropdown .ui-dropdown-current {\n  font-family: var(--font-display);\n}\n:host .ui-dropdown .ui-dropdown-current {\n  -webkit-user-select: none;\n}\n:host .ui-dropdown .ui-dropdown-current {\n  font-kerning: normal;\n  -webkit-font-feature-settings: "kern" 1;\n  -webkit-font-smoothing: antialiased;\n}\n:host .ui-dropdown .ui-dropdown-current {\n  text-transform: uppercase;\n}\n:host .ui-dropdown .ui-dropdown-current:lang(ko-kr),\n:host .ui-dropdown .ui-dropdown-current:lang(ja-jp),\n:host .ui-dropdown .ui-dropdown-current:lang(tr-tr),\n:host .ui-dropdown .ui-dropdown-current:lang(el-gr),\n:host .ui-dropdown .ui-dropdown-current:lang(th-th),\n:host .ui-dropdown .ui-dropdown-current:lang(zh-tw) {\n  text-transform: none;\n}\n:host .ui-dropdown .ui-dropdown-current {\n  color: #f0e6d2;\n  font-size: 18px;\n  font-weight: 700;\n  line-height: 22px;\n  letter-spacing: 0.05em;\n}\n:host .ui-dropdown .ui-dropdown-current:lang(ar-ae) {\n  letter-spacing: 0;\n}\n:host(.active) .ui-dropdown .ui-dropdown-options-container {\n  border: thin solid transparent;\n  border-image: linear-gradient(to top, #695625, #463714) 1;\n}\n:host {\n  --flat-dropdown-current-height: 40px;\n  --flat-dropdown-scrollable-max-height: none;\n  --flat-dropdownactive-z-index: auto;\n  --flat-dropdownactive-max-width: none;\n  --flat-dropdownactive-current-display: flex;\n  --flat-dropdownactive-opens-upward-container-padding: 0 0 40px 0;\n  --flat-dropdownactive-opens-upward-container-margin: 0;\n  --flat-dropdown-current-content-display: block;\n  --flat-dropdown-current-content-max-width: none;\n  --flat-dropdown-current-content-text-transform: none;\n  --flat-dropdown-current-content-white-space: normal;\n  --flat-dropdown-current-content-text-overflow: clip;\n  --flat-dropdown-current-content-overflow: visible;\n  --flat-dropdown-current-content-color: #cdbe91;\n  --flat-dropdown-current-content-font-size: 18px;\n  --flat-dropdown-current-content-line-height: 22px;\n  --flat-dropdown-current-content-letter-spacing: 0.025em;\n  --flat-dropdown-direction-rtl: rtl;\n  --flat-dropdown-current-after-margin-rtl: 0 7px 0 0;\n}\n:host([stylablecontent]) .ui-dropdown-current-content.shadow {\n  display: none;\n}\n:host(:not([stylablecontent])) .ui-dropdown-current-content.light {\n  display: none;\n}\n:host .ui-dropdown-current-content,\n:host ::slotted(.ui-dropdown-current-content) {\n  display: var(--flat-dropdown-current-content-display);\n  max-width: var(--flat-dropdown-current-content-max-width);\n  text-transform: var(--flat-dropdown-current-content-text-transform);\n  white-space: var(--flat-dropdown-current-content-white-space);\n  text-overflow: var(--flat-dropdown-current-content-text-overflow);\n  overflow: var(--flat-dropdown-current-content-overflow);\n  color: var(--flat-dropdown-current-content-color);\n  font-size: var(--flat-dropdown-current-content-font-size);\n  line-height: var(--flat-dropdown-current-content-line-height);\n  letter-spacing: var(--flat-dropdown-current-letter-spacing);\n}\n:host {\n  display: inline-flex;\n  flex-direction: column;\n  width: 100%;\n  height: 40px;\n  outline: 0;\n}\n:host .ui-dropdown {\n  display: inline-flex;\n  flex-direction: column;\n  box-sizing: border-box;\n  position: relative;\n  user-select: none;\n  margin: 0;\n  width: 100%;\n  padding: 0;\n}\n:host .ui-dropdown:lang(ar-ae) {\n  direction: var(--flat-dropdown-direction-rtl);\n}\n:host .ui-dropdown .ui-dropdown-current {\n  display: flex;\n  flex-direction: row;\n  background: none;\n  position: absolute;\n  height: var(--flat-dropdown-current-height);\n  margin: 0;\n  align-items: center;\n  padding: 0 10px;\n  cursor: pointer;\n}\n:host .ui-dropdown .ui-dropdown-current:hover {\n  color: #f0e6d2;\n}\n:host .ui-dropdown .ui-dropdown-current:hover::after {\n  -webkit-filter: brightness(2.2);\n}\n:host .ui-dropdown .ui-dropdown-current::after {\n  content: \'\';\n  background: url("../../images/up-down-arrow.png") center no-repeat;\n  width: 13px;\n  height: 19px;\n  margin: 0 0 0 7px;\n}\n:host .ui-dropdown .ui-dropdown-current:lang(ar-ae)::after {\n  margin: var(--flat-dropdown-current-after-margin-rtl);\n}\n:host .ui-dropdown .ui-dropdown-options-container {\n  background-color: #010a13;\n  width: 100%;\n  opacity: 0;\n  position: absolute;\n  height: 0;\n  visibility: hidden;\n  transition: opacity 400ms;\n}\n:host .ui-dropdown .ui-dropdown-options-container lol-uikit-scrollable {\n  max-height: var(--flat-dropdown-scrollable-max-height);\n}\n:host .ui-dropdown.opens-upward .ui-dropdown-options-container {\n  bottom: 100%;\n  top: auto;\n  margin-bottom: -42px;\n}\n:host(.active) .ui-dropdown {\n  z-index: var(--flat-dropdownactive-z-index);\n  max-width: var(--flat-dropdownactive-max-width);\n}\n:host(.active) .ui-dropdown .ui-dropdown-current {\n  display: var(--flat-dropdownactive-current-display);\n  color: #785a28;\n}\n:host(.active) .ui-dropdown .ui-dropdown-current:hover {\n  color: #785a28;\n}\n:host(.active) .ui-dropdown .ui-dropdown-current:hover::after {\n  -webkit-filter: none;\n}\n:host(.active) .ui-dropdown .ui-dropdown-current::after {\n  background-image: url("../../images/up-down-arrow-locked.png");\n}\n:host(.active) .ui-dropdown .ui-dropdown-options-container {\n  border-width: 2px;\n  padding-top: 40px;\n  width: 100%;\n  opacity: 1;\n  height: auto;\n  transition: opacity 400ms;\n  visibility: visible;\n}\n:host(.active) .ui-dropdown.opens-upward .ui-dropdown-options-container {\n  padding: var(--flat-dropdownactive-opens-upward-container-padding);\n  margin: var(--flat-dropdownactive-opens-upward-container-margin);\n}\n:host(.disabled) {\n  cursor: default;\n  pointer-events: none;\n}\n:host(.disabled) .ui-dropdown .ui-dropdown-current {\n  color: #3c3c41;\n}\n:host(.disabled) .ui-dropdown .ui-dropdown-current::after {\n  -webkit-filter: grayscale(100%);\n  opacity: 0.35;\n}\n'],
                sourceRoot: ""
            }]), t.exports = l
        }, (t, e, n) => {
            "use strict";
            t.exports = n.p + "up-down-arrow.png"
        }, (t, e, n) => {
            "use strict";
            t.exports = n.p + "up-down-arrow-locked.png"
        }, (t, e, n) => {
            "use strict";
            Object.defineProperty(e, "__esModule", {
                value: !0
            }), e.default = void 0;
            var i, o = n(17),
                r = n(1),
                s = (i = n(20)) && i.__esModule ? i : {
                    default: i
                };
            class a extends r.webComponents.ShadowElement {
                templateMarkup() {
                    return n(101)
                }
                connectedCallback() {
                    super.connectedCallback();
                    const t = this.shadowRoot;
                    this.focusInEventHandler = this.focusInEventHandler.bind(this), t.addEventListener("focusin", this.focusInEventHandler), this._focusInSound = this._createSound(s.default.focus)
                }
                focusInEventHandler() {
                    this._focusInSound && this._focusInSound.play()
                }
                _createSound(t) {
                    return (0, o.createSound)("sfx-ui", t, {
                        allowConcurrency: !1
                    })
                }
            }
            a.tagName = "lol-uikit-flat-input";
            var l = a;
            e.default = l
        }, t => {
            "use strict";
            t.exports = "<template>\r\n  <slot>\x3c!-- input --\x3e</slot>\r\n</template>"
        }, (t, e, n) => {
            "use strict";
            Object.defineProperty(e, "__esModule", {
                value: !0
            }), e.default = void 0;
            var i = n(1);
            class o extends i.webComponents.ShadowElement {
                static get observedAttributes() {
                    return []
                }
                templateMarkup() {
                    return n(103)
                }
                stylesheetMarkup() {
                    return n(104)
                }
            }
            o.tagName = "lol-uikit-flat-textarea";
            var r = o;
            e.default = r
        }, t => {
            "use strict";
            t.exports = "<template>\r\n  <slot />\r\n</template>\r\n"
        }, (t, e, n) => {
            var i = n(9),
                o = n(10)(i);
            o.push([t.id, ':host ::slotted(textarea) {\n  font-family: var(--font-body);\n}\n:host ::slotted(textarea) {\n  -webkit-user-select: none;\n}\n:host ::slotted(textarea) {\n  font-kerning: normal;\n  -webkit-font-feature-settings: "kern" 1;\n  -webkit-font-smoothing: antialiased;\n}\n:host ::slotted(textarea) {\n  color: #a09b8c;\n  font-size: 12px;\n  font-weight: normal;\n  line-height: 16px;\n  letter-spacing: 0.025em;\n  -webkit-font-smoothing: subpixel-antialiased;\n}\n:host ::slotted(textarea):lang(ja-jp) {\n  font-size: 13px;\n}\n:host ::slotted(textarea):lang(ar-ae) {\n  letter-spacing: 0;\n}\n:host {\n  display: block;\n}\n:host ::slotted(textarea) {\n  display: block;\n  box-sizing: border-box;\n  width: 100%;\n  height: 100%;\n  margin-top: 2px;\n  font-size: 12px;\n  color: #f0e6d2;\n  border-color: #785a28;\n  border-width: 1px;\n  border-style: solid;\n  background-color: rgba(0,0,0,0.7);\n  vertical-align: middle;\n  padding: 8px 6px;\n  -webkit-appearance: none;\n  outline: none;\n  box-shadow: 0 0 0 1px rgba(0,0,0,0.25) inset, 0 0 0 1px rgba(0,0,0,0.25);\n  resize: none;\n}\n:host ::slotted(textarea):focus {\n  background: linear-gradient(to bottom, rgba(7,16,25,0.7), rgba(32,39,44,0.7));\n  border-image: linear-gradient(to bottom, #785a28, #c8aa6e) 1 stretch;\n}\n:host ::slotted(textarea):disabled {\n  background-color: #1e2328;\n  border-color: #3c3c41;\n}\n:host ::slotted(textarea)::-webkit-input-placeholder {\n  color: #a09b8c;\n  padding-left: 3px;\n  font-style: italic;\n}\n:host ::slotted(textarea)::-webkit-textfield-decoration-container {\n  position: relative;\n}\n', ""]), t.exports = o
        }, (t, e, n) => {
            "use strict";
            Object.defineProperty(e, "__esModule", {
                value: !0
            }), e.default = void 0;
            var i = n(1);
            class o extends i.webComponents.ShadowElement {
                templateMarkup() {
                    return n(106)
                }
                stylesheetMarkup() {
                    return n(107)
                }
                static get observedAttributes() {
                    return ["orientation", "show", "animated", "caretless", "borderless", "caretoffset", "dismissable"]
                }
                processAttributes() {
                    this.processWrapper(), this.processBorders()
                }
                getOrientation() {
                    return this.getAttribute("orientation") || "bottom"
                }
                processWrapper() {
                    const t = this.shadowRoot.querySelector(".lol-uikit-flyout-frame-wrapper"),
                        e = this.getOrientation(),
                        n = this.getAttribute("show") || "true";
                    t && (t.classList.remove("top", "bottom", "left", "right"), t.classList.add(e), this.setClosable(), "true" === n ? (t.classList.remove("idle", "animation", "closing"), this.setAnimated()) : t.classList.contains("idle") && (t.classList.remove("idle"), t.classList.add("closing")))
                }
                isVertical() {
                    const t = this.getOrientation();
                    return "top" === t || "bottom" === t
                }
                isHorizontal() {
                    const t = this.getOrientation();
                    return "left" === t || "right" === t
                }
                isAnimated() {
                    return "true" === this.getAttribute("animated")
                }
                processBorders() {
                    const t = this.shadowRoot.querySelector(".caret"),
                        e = this.shadowRoot.querySelector(".border"),
                        n = this.shadowRoot.querySelector(".sub-border");
                    if (!t || !e || !n) return;
                    const i = "true" === this.getAttribute("caretless"),
                        o = "true" === this.getAttribute("borderless"),
                        r = o || i;
                    if (t.style.visibility = i ? "hidden" : "visible", e.style.visibility = o ? "hidden" : "visible", n.style.visibility = r ? "hidden" : "visible", !i) {
                        const e = parseInt(this.getAttribute("caretoffset")) || 0;
                        t.style.left = null, t.style.top = null, this.isVertical() ? t.style.left = e + "px" : this.isHorizontal() && (t.style.top = e + "px")
                    }
                }
                setClosable() {
                    const t = this.shadowRoot,
                        e = this.getAttribute("dismissable"),
                        n = t.querySelector(".lol-uikit-flyout-frame-wrapper");
                    n.classList.remove("close-button"), "true" === e && n.classList.add("close-button")
                }
                setAnimated() {
                    const t = this.shadowRoot.querySelector(".lol-uikit-flyout-frame-wrapper");
                    this.isAnimated() ? t.classList.add("animation") : t.classList.remove("animation"), setTimeout((function() {
                        t.classList.add("idle")
                    }), 50)
                }
            }
            o.tagName = "lol-uikit-flyout-frame";
            var r = o;
            e.default = r
        }, t => {
            "use strict";
            t.exports = '<template>\r\n  <div class="lol-uikit-flyout-frame-wrapper">\r\n    <div class="border"></div>\r\n    <div class="sub-border"></div>\r\n    <div class="caret"></div>\r\n    <div class="lol-uikit-flyout-frame">\r\n      <slot></slot>\r\n    </div>\r\n    <div class="close-button-container">\r\n      <lol-uikit-close-button/>\r\n    </div>\r\n  </div>\r\n</template>\r\n'
        }, (t, e, n) => {
            var i = n(79),
                o = n(10),
                r = n(80),
                s = n(108),
                a = n(109),
                l = o(i),
                d = r(s),
                c = r(a);
            l.push([t.id, ":host .lol-uikit-flyout-frame-wrapper.right .border {\n  border: 2px solid transparent;\n  border-image: linear-gradient(to right, #785a28 0, #463714 50%, #463714 100%) 1 stretch;\n}\n:host .lol-uikit-flyout-frame-wrapper.left .border {\n  border: 2px solid transparent;\n  border-image: linear-gradient(to left, #785a28 0, #463714 50%, #463714 100%) 1 stretch;\n}\n:host .lol-uikit-flyout-frame-wrapper.top .border {\n  border: 2px solid transparent;\n  border-image: linear-gradient(to top, #785a28 0, #463714 50%, #463714 100%) 1 stretch;\n}\n:host .lol-uikit-flyout-frame-wrapper.bottom .border {\n  border: 2px solid transparent;\n  border-image: linear-gradient(to bottom, #785a28 0, #463714 50%, #463714 100%) 1 stretch;\n}\n:host {\n  pointer-events: all;\n}\n:host .lol-uikit-flyout-frame-wrapper {\n  position: relative;\n  transition: 250ms all cubic-bezier(0.02, 0.85, 0.08, 0.99);\n}\n:host .lol-uikit-flyout-frame-wrapper .border {\n  position: absolute;\n  box-sizing: border-box;\n  background-color: #010a13;\n  box-shadow: 0 0 0 1px rgba(1,10,19,0.48);\n  transition: 250ms all cubic-bezier(0.02, 0.85, 0.08, 0.99);\n}\n:host .lol-uikit-flyout-frame-wrapper .border::before {\n  content: '';\n  position: absolute;\n  width: calc(100% + 4px);\n  height: calc(100% + 4px);\n  top: -2px;\n  left: -2px;\n  box-shadow: 0 0 10px 1px rgba(0,0,0,0.5);\n  pointer-events: none;\n}\n:host .lol-uikit-flyout-frame-wrapper .sub-border {\n  position: absolute;\n  display: flex;\n  box-sizing: border-box;\n  transition: 250ms all cubic-bezier(0.02, 0.85, 0.08, 0.99);\n}\n:host .lol-uikit-flyout-frame-wrapper .sub-border::before {\n  content: '';\n  position: absolute;\n}\n:host .lol-uikit-flyout-frame-wrapper .close-button-container {\n  display: none;\n}\n:host .lol-uikit-flyout-frame-wrapper.close-button .close-button-container {\n  display: block;\n}\n:host .lol-uikit-flyout-frame-wrapper.close-button .close-button-container::before {\n  content: '';\n  position: absolute;\n  width: 38px;\n  height: 68px;\n  top: -20px;\n  right: -20px;\n  background-image: url(\"/fe/lol-uikit/images/frame-button-close-top-down.png\");\n  background-size: 38px 68px;\n}\n:host .lol-uikit-flyout-frame-wrapper.close-button .close-button-container lol-uikit-close-button {\n  display: block;\n  position: absolute;\n  top: -15px;\n  right: -15px;\n}\n:host .lol-uikit-flyout-frame-wrapper .caret {\n  position: absolute;\n  display: flex;\n  justify-content: center;\n  box-sizing: border-box;\n  transition: top 250ms all cubic-bezier(0.02, 0.85, 0.08, 0.99) ease, left 250ms all cubic-bezier(0.02, 0.85, 0.08, 0.99) ease, right 250ms all cubic-bezier(0.02, 0.85, 0.08, 0.99) ease, bottom 250ms all cubic-bezier(0.02, 0.85, 0.08, 0.99) ease;\n}\n:host .lol-uikit-flyout-frame-wrapper .caret::before {\n  content: '';\n  position: absolute;\n  width: 24px;\n  height: 16px;\n  background-image: url(" + d + ');\n  background-size: initial;\n  background-position: -312px;\n  background-repeat: no-repeat;\n}\n:host .lol-uikit-flyout-frame-wrapper .lol-uikit-flyout-frame {\n  position: relative;\n  display: flex;\n  -webkit-mask-image: linear-gradient(to left, #000, #000);\n  -webkit-mask-repeat: no-repeat;\n  -webkit-mask-position: center;\n  padding: 2px;\n  box-sizing: border-box;\n  transition: 250ms all cubic-bezier(0.02, 0.85, 0.08, 0.99), 300ms opacity linear;\n}\n:host .lol-uikit-flyout-frame-wrapper .lol-uikit-flyout-frame:lang(ar-ae) {\n  direction: rtl;\n}\n:host .lol-uikit-flyout-frame-wrapper.top .border,\n:host .lol-uikit-flyout-frame-wrapper.bottom .border {\n  width: 100%;\n  height: 100%;\n}\n:host .lol-uikit-flyout-frame-wrapper.top .sub-border,\n:host .lol-uikit-flyout-frame-wrapper.bottom .sub-border {\n  left: 8px;\n  width: calc(100% - 16px);\n  height: 0;\n}\n:host .lol-uikit-flyout-frame-wrapper.top .sub-border::before,\n:host .lol-uikit-flyout-frame-wrapper.bottom .sub-border::before {\n  width: calc(100% - 8px);\n  height: 0;\n  border-image-source: url("/fe/lol-uikit/images/sub-border-primary-horizontal.png");\n  border-width: 4px 4px 0 4px;\n  border-image-width: 4px 4px 0 4px;\n  border-image-slice: 4 4 0 4;\n  border-image-repeat: stretch;\n  border-style: solid;\n}\n:host .lol-uikit-flyout-frame-wrapper.top .caret,\n:host .lol-uikit-flyout-frame-wrapper.bottom .caret {\n  width: 100%;\n  height: 0;\n}\n:host .lol-uikit-flyout-frame-wrapper.top .caret::before,\n:host .lol-uikit-flyout-frame-wrapper.bottom .caret::before {\n  left: calc(50% - 12px);\n  transform-origin: center center;\n}\n:host .lol-uikit-flyout-frame-wrapper.top .lol-uikit-flyout-frame,\n:host .lol-uikit-flyout-frame-wrapper.bottom .lol-uikit-flyout-frame {\n  -webkit-mask-size: 100%;\n}\n:host .lol-uikit-flyout-frame-wrapper.left .border,\n:host .lol-uikit-flyout-frame-wrapper.right .border {\n  width: 100%;\n  height: 100%;\n}\n:host .lol-uikit-flyout-frame-wrapper.left .sub-border,\n:host .lol-uikit-flyout-frame-wrapper.right .sub-border {\n  width: 0;\n  height: calc(100% - 16px);\n  top: 8px;\n}\n:host .lol-uikit-flyout-frame-wrapper.left .sub-border::before,\n:host .lol-uikit-flyout-frame-wrapper.right .sub-border::before {\n  height: calc(100% - 8px);\n  width: 0;\n  border-image-source: url("/fe/lol-uikit/images/sub-border-primary-vertical.png");\n  border-width: 4px 4px 4px 0;\n  border-image-width: 4px 4px 4px 0;\n  border-image-slice: 4 4 4 0;\n  border-image-repeat: stretch;\n  border-style: solid;\n}\n:host .lol-uikit-flyout-frame-wrapper.left .caret,\n:host .lol-uikit-flyout-frame-wrapper.right .caret {\n  width: 0;\n  height: 100%;\n}\n:host .lol-uikit-flyout-frame-wrapper.left .caret::before,\n:host .lol-uikit-flyout-frame-wrapper.right .caret::before {\n  top: calc(50% + 12px);\n}\n:host .lol-uikit-flyout-frame-wrapper.left .lol-uikit-flyout-frame,\n:host .lol-uikit-flyout-frame-wrapper.right .lol-uikit-flyout-frame {\n  -webkit-mask-size: 100%;\n}\n:host .lol-uikit-flyout-frame-wrapper.bottom .sub-border {\n  top: 0;\n  transform: rotate(180deg);\n}\n:host .lol-uikit-flyout-frame-wrapper.bottom .caret {\n  top: 3px;\n}\n:host .lol-uikit-flyout-frame-wrapper.bottom .caret::before {\n  bottom: 0;\n  transform: rotate(180deg);\n}\n:host .lol-uikit-flyout-frame-wrapper.top .sub-border {\n  bottom: 0;\n}\n:host .lol-uikit-flyout-frame-wrapper.top .caret {\n  bottom: 3px;\n}\n:host .lol-uikit-flyout-frame-wrapper.left .sub-border {\n  right: -4px;\n  transform: rotate(180deg);\n}\n:host .lol-uikit-flyout-frame-wrapper.left .caret {\n  right: 0;\n}\n:host .lol-uikit-flyout-frame-wrapper.left .caret::before {\n  left: -3px;\n  transform-origin: top left;\n  transform: rotate(270deg);\n}\n:host .lol-uikit-flyout-frame-wrapper.right .sub-border {\n  left: -4px;\n}\n:host .lol-uikit-flyout-frame-wrapper.right .caret {\n  left: 0;\n}\n:host .lol-uikit-flyout-frame-wrapper.right .caret::before {\n  right: -3px;\n  transform-origin: top right;\n  transform: rotate(90deg);\n}\n:host .lol-uikit-flyout-frame-wrapper.animation .caret::before {\n  background-position: 0;\n}\n:host .lol-uikit-flyout-frame-wrapper.animation.top .border,\n:host .lol-uikit-flyout-frame-wrapper.animation.bottom .border {\n  width: 50%;\n  left: 25%;\n}\n:host .lol-uikit-flyout-frame-wrapper.animation.top .sub-border,\n:host .lol-uikit-flyout-frame-wrapper.animation.bottom .sub-border {\n  width: 30%;\n  left: calc(33% + 8px);\n}\n:host .lol-uikit-flyout-frame-wrapper.animation.top .lol-uikit-flyout-frame,\n:host .lol-uikit-flyout-frame-wrapper.animation.bottom .lol-uikit-flyout-frame {\n  -webkit-mask-size: 50% 100%;\n}\n:host .lol-uikit-flyout-frame-wrapper.animation.left .border,\n:host .lol-uikit-flyout-frame-wrapper.animation.right .border {\n  height: 50%;\n  top: 25%;\n}\n:host .lol-uikit-flyout-frame-wrapper.animation.left .sub-border,\n:host .lol-uikit-flyout-frame-wrapper.animation.right .sub-border {\n  height: 30%;\n  top: calc(33% + 8px);\n}\n:host .lol-uikit-flyout-frame-wrapper.animation.left .lol-uikit-flyout-frame,\n:host .lol-uikit-flyout-frame-wrapper.animation.right .lol-uikit-flyout-frame {\n  opacity: 0;\n  -webkit-mask-size: 100% 50%;\n}\n:host .lol-uikit-flyout-frame-wrapper.animation.idle .border {\n  width: 100%;\n  height: 100%;\n}\n:host .lol-uikit-flyout-frame-wrapper.animation.idle .caret::before {\n  animation: caretIntro 433ms steps(13, end) forwards;\n}\n:host .lol-uikit-flyout-frame-wrapper.animation.idle .lol-uikit-flyout-frame {\n  opacity: 1;\n  -webkit-mask-size: 100% 100%;\n}\n:host .lol-uikit-flyout-frame-wrapper.animation.idle.top,\n:host .lol-uikit-flyout-frame-wrapper.animation.idle.bottom {\n  top: 0;\n}\n:host .lol-uikit-flyout-frame-wrapper.animation.idle.top .border,\n:host .lol-uikit-flyout-frame-wrapper.animation.idle.bottom .border,\n:host .lol-uikit-flyout-frame-wrapper.animation.idle.top border-glow,\n:host .lol-uikit-flyout-frame-wrapper.animation.idle.bottom border-glow {\n  left: 0;\n}\n:host .lol-uikit-flyout-frame-wrapper.animation.idle.top .sub-border,\n:host .lol-uikit-flyout-frame-wrapper.animation.idle.bottom .sub-border {\n  width: calc(100% - 16px);\n  left: 8px;\n}\n:host .lol-uikit-flyout-frame-wrapper.animation.idle.left,\n:host .lol-uikit-flyout-frame-wrapper.animation.idle.right {\n  left: 0;\n}\n:host .lol-uikit-flyout-frame-wrapper.animation.idle.left .border,\n:host .lol-uikit-flyout-frame-wrapper.animation.idle.right .border,\n:host .lol-uikit-flyout-frame-wrapper.animation.idle.left border-glow,\n:host .lol-uikit-flyout-frame-wrapper.animation.idle.right border-glow {\n  top: 0;\n}\n:host .lol-uikit-flyout-frame-wrapper.animation.idle.left .sub-border,\n:host .lol-uikit-flyout-frame-wrapper.animation.idle.right .sub-border {\n  height: calc(100% - 16px);\n  top: 8px;\n}\n:host .lol-uikit-flyout-frame-wrapper.animation.closing .border,\n:host .lol-uikit-flyout-frame-wrapper.animation.closing .sub-border,\n:host .lol-uikit-flyout-frame-wrapper.animation.closing .lol-uikit-flyout-frame {\n  transition: 133ms all cubic-bezier(1, 0, 1, 1);\n}\n:host .lol-uikit-flyout-frame-wrapper.animation.closing .caret::before {\n  background-image: url(' + c + ");\n  animation: caretOutro 133ms steps(4, end) forwards;\n  transition: background 0;\n}\n@-moz-keyframes caretIntro {\n  from {\n    background-position: 0;\n  }\n  to {\n    background-position: -312px;\n  }\n}\n@-webkit-keyframes caretIntro {\n  from {\n    background-position: 0;\n  }\n  to {\n    background-position: -312px;\n  }\n}\n@-o-keyframes caretIntro {\n  from {\n    background-position: 0;\n  }\n  to {\n    background-position: -312px;\n  }\n}\n@keyframes caretIntro {\n  from {\n    background-position: 0;\n  }\n  to {\n    background-position: -312px;\n  }\n}\n@-moz-keyframes caretOutro {\n  from {\n    background-position: 0;\n  }\n  to {\n    background-position: -96px;\n  }\n}\n@-webkit-keyframes caretOutro {\n  from {\n    background-position: 0;\n  }\n  to {\n    background-position: -96px;\n  }\n}\n@-o-keyframes caretOutro {\n  from {\n    background-position: 0;\n  }\n  to {\n    background-position: -96px;\n  }\n}\n@keyframes caretOutro {\n  from {\n    background-position: 0;\n  }\n  to {\n    background-position: -96px;\n  }\n}\n", "", {
                version: 3,
                sources: ["webpack://./fe/rcp-fe-lol-uikit/src/elements/flyout-frame/component-style.styl"],
                names: [],
                mappings: "AAAA;EACE,6BAA6B;EAC7B,uFAAuF;AACzF;AACA;EACE,6BAA6B;EAC7B,sFAAsF;AACxF;AACA;EACE,6BAA6B;EAC7B,qFAAqF;AACvF;AACA;EACE,6BAA6B;EAC7B,wFAAwF;AAC1F;AACA;EACE,mBAAmB;AACrB;AACA;EACE,kBAAkB;EAClB,0DAA0D;AAC5D;AACA;EACE,kBAAkB;EAClB,sBAAsB;EACtB,yBAAyB;EACzB,wCAAwC;EACxC,0DAA0D;AAC5D;AACA;EACE,WAAW;EACX,kBAAkB;EAClB,uBAAuB;EACvB,wBAAwB;EACxB,SAAS;EACT,UAAU;EACV,wCAAwC;EACxC,oBAAoB;AACtB;AACA;EACE,kBAAkB;EAClB,aAAa;EACb,sBAAsB;EACtB,0DAA0D;AAC5D;AACA;EACE,WAAW;EACX,kBAAkB;AACpB;AACA;EACE,aAAa;AACf;AACA;EACE,cAAc;AAChB;AACA;EACE,WAAW;EACX,kBAAkB;EAClB,WAAW;EACX,YAAY;EACZ,UAAU;EACV,YAAY;EACZ,6EAA6E;EAC7E,0BAA0B;AAC5B;AACA;EACE,cAAc;EACd,kBAAkB;EAClB,UAAU;EACV,YAAY;AACd;AACA;EACE,kBAAkB;EAClB,aAAa;EACb,uBAAuB;EACvB,sBAAsB;EACtB,oPAAoP;AACtP;AACA;EACE,WAAW;EACX,kBAAkB;EAClB,WAAW;EACX,YAAY;EACZ,yDAAoD;EACpD,wBAAwB;EACxB,2BAA2B;EAC3B,4BAA4B;AAC9B;AACA;EACE,kBAAkB;EAClB,aAAa;EACb,wDAAwD;EACxD,8BAA8B;EAC9B,6BAA6B;EAC7B,YAAY;EACZ,sBAAsB;EACtB,gFAAgF;AAClF;AACA;EACE,cAAc;AAChB;AACA;;EAEE,WAAW;EACX,YAAY;AACd;AACA;;EAEE,SAAS;EACT,wBAAwB;EACxB,SAAS;AACX;AACA;;EAEE,uBAAuB;EACvB,SAAS;EACT,kFAAkF;EAClF,2BAA2B;EAC3B,iCAAiC;EACjC,2BAA2B;EAC3B,4BAA4B;EAC5B,mBAAmB;AACrB;AACA;;EAEE,WAAW;EACX,SAAS;AACX;AACA;;EAEE,sBAAsB;EACtB,+BAA+B;AACjC;AACA;;EAEE,uBAAuB;AACzB;AACA;;EAEE,WAAW;EACX,YAAY;AACd;AACA;;EAEE,QAAQ;EACR,yBAAyB;EACzB,QAAQ;AACV;AACA;;EAEE,wBAAwB;EACxB,QAAQ;EACR,gFAAgF;EAChF,2BAA2B;EAC3B,iCAAiC;EACjC,2BAA2B;EAC3B,4BAA4B;EAC5B,mBAAmB;AACrB;AACA;;EAEE,QAAQ;EACR,YAAY;AACd;AACA;;EAEE,qBAAqB;AACvB;AACA;;EAEE,uBAAuB;AACzB;AACA;EACE,MAAM;EACN,yBAAyB;AAC3B;AACA;EACE,QAAQ;AACV;AACA;EACE,SAAS;EACT,yBAAyB;AAC3B;AACA;EACE,SAAS;AACX;AACA;EACE,WAAW;AACb;AACA;EACE,WAAW;EACX,yBAAyB;AAC3B;AACA;EACE,QAAQ;AACV;AACA;EACE,UAAU;EACV,0BAA0B;EAC1B,yBAAyB;AAC3B;AACA;EACE,UAAU;AACZ;AACA;EACE,OAAO;AACT;AACA;EACE,WAAW;EACX,2BAA2B;EAC3B,wBAAwB;AAC1B;AACA;EACE,sBAAsB;AACxB;AACA;;EAEE,UAAU;EACV,SAAS;AACX;AACA;;EAEE,UAAU;EACV,qBAAqB;AACvB;AACA;;EAEE,2BAA2B;AAC7B;AACA;;EAEE,WAAW;EACX,QAAQ;AACV;AACA;;EAEE,WAAW;EACX,oBAAoB;AACtB;AACA;;EAEE,UAAU;EACV,2BAA2B;AAC7B;AACA;EACE,WAAW;EACX,YAAY;AACd;AACA;EACE,mDAAmD;AACrD;AACA;EACE,UAAU;EACV,4BAA4B;AAC9B;AACA;;EAEE,MAAM;AACR;AACA;;;;EAIE,OAAO;AACT;AACA;;EAEE,wBAAwB;EACxB,SAAS;AACX;AACA;;EAEE,OAAO;AACT;AACA;;;;EAIE,MAAM;AACR;AACA;;EAEE,yBAAyB;EACzB,QAAQ;AACV;AACA;;;EAGE,8CAA8C;AAChD;AACA;EACE,yDAAoD;EACpD,kDAAkD;EAClD,wBAAwB;AAC1B;AACA;EACE;IACE,sBAAsB;EACxB;EACA;IACE,2BAA2B;EAC7B;AACF;AACA;EACE;IACE,sBAAsB;EACxB;EACA;IACE,2BAA2B;EAC7B;AACF;AACA;EACE;IACE,sBAAsB;EACxB;EACA;IACE,2BAA2B;EAC7B;AACF;AACA;EACE;IACE,sBAAsB;EACxB;EACA;IACE,2BAA2B;EAC7B;AACF;AACA;EACE;IACE,sBAAsB;EACxB;EACA;IACE,0BAA0B;EAC5B;AACF;AACA;EACE;IACE,sBAAsB;EACxB;EACA;IACE,0BAA0B;EAC5B;AACF;AACA;EACE;IACE,sBAAsB;EACxB;EACA;IACE,0BAA0B;EAC5B;AACF;AACA;EACE;IACE,sBAAsB;EACxB;EACA;IACE,0BAA0B;EAC5B;AACF",
                sourcesContent: [':host .lol-uikit-flyout-frame-wrapper.right .border {\n  border: 2px solid transparent;\n  border-image: linear-gradient(to right, #785a28 0, #463714 50%, #463714 100%) 1 stretch;\n}\n:host .lol-uikit-flyout-frame-wrapper.left .border {\n  border: 2px solid transparent;\n  border-image: linear-gradient(to left, #785a28 0, #463714 50%, #463714 100%) 1 stretch;\n}\n:host .lol-uikit-flyout-frame-wrapper.top .border {\n  border: 2px solid transparent;\n  border-image: linear-gradient(to top, #785a28 0, #463714 50%, #463714 100%) 1 stretch;\n}\n:host .lol-uikit-flyout-frame-wrapper.bottom .border {\n  border: 2px solid transparent;\n  border-image: linear-gradient(to bottom, #785a28 0, #463714 50%, #463714 100%) 1 stretch;\n}\n:host {\n  pointer-events: all;\n}\n:host .lol-uikit-flyout-frame-wrapper {\n  position: relative;\n  transition: 250ms all cubic-bezier(0.02, 0.85, 0.08, 0.99);\n}\n:host .lol-uikit-flyout-frame-wrapper .border {\n  position: absolute;\n  box-sizing: border-box;\n  background-color: #010a13;\n  box-shadow: 0 0 0 1px rgba(1,10,19,0.48);\n  transition: 250ms all cubic-bezier(0.02, 0.85, 0.08, 0.99);\n}\n:host .lol-uikit-flyout-frame-wrapper .border::before {\n  content: \'\';\n  position: absolute;\n  width: calc(100% + 4px);\n  height: calc(100% + 4px);\n  top: -2px;\n  left: -2px;\n  box-shadow: 0 0 10px 1px rgba(0,0,0,0.5);\n  pointer-events: none;\n}\n:host .lol-uikit-flyout-frame-wrapper .sub-border {\n  position: absolute;\n  display: flex;\n  box-sizing: border-box;\n  transition: 250ms all cubic-bezier(0.02, 0.85, 0.08, 0.99);\n}\n:host .lol-uikit-flyout-frame-wrapper .sub-border::before {\n  content: \'\';\n  position: absolute;\n}\n:host .lol-uikit-flyout-frame-wrapper .close-button-container {\n  display: none;\n}\n:host .lol-uikit-flyout-frame-wrapper.close-button .close-button-container {\n  display: block;\n}\n:host .lol-uikit-flyout-frame-wrapper.close-button .close-button-container::before {\n  content: \'\';\n  position: absolute;\n  width: 38px;\n  height: 68px;\n  top: -20px;\n  right: -20px;\n  background-image: url("/fe/lol-uikit/images/frame-button-close-top-down.png");\n  background-size: 38px 68px;\n}\n:host .lol-uikit-flyout-frame-wrapper.close-button .close-button-container lol-uikit-close-button {\n  display: block;\n  position: absolute;\n  top: -15px;\n  right: -15px;\n}\n:host .lol-uikit-flyout-frame-wrapper .caret {\n  position: absolute;\n  display: flex;\n  justify-content: center;\n  box-sizing: border-box;\n  transition: top 250ms all cubic-bezier(0.02, 0.85, 0.08, 0.99) ease, left 250ms all cubic-bezier(0.02, 0.85, 0.08, 0.99) ease, right 250ms all cubic-bezier(0.02, 0.85, 0.08, 0.99) ease, bottom 250ms all cubic-bezier(0.02, 0.85, 0.08, 0.99) ease;\n}\n:host .lol-uikit-flyout-frame-wrapper .caret::before {\n  content: \'\';\n  position: absolute;\n  width: 24px;\n  height: 16px;\n  background-image: url("images/pointer-intro-01.png");\n  background-size: initial;\n  background-position: -312px;\n  background-repeat: no-repeat;\n}\n:host .lol-uikit-flyout-frame-wrapper .lol-uikit-flyout-frame {\n  position: relative;\n  display: flex;\n  -webkit-mask-image: linear-gradient(to left, #000, #000);\n  -webkit-mask-repeat: no-repeat;\n  -webkit-mask-position: center;\n  padding: 2px;\n  box-sizing: border-box;\n  transition: 250ms all cubic-bezier(0.02, 0.85, 0.08, 0.99), 300ms opacity linear;\n}\n:host .lol-uikit-flyout-frame-wrapper .lol-uikit-flyout-frame:lang(ar-ae) {\n  direction: rtl;\n}\n:host .lol-uikit-flyout-frame-wrapper.top .border,\n:host .lol-uikit-flyout-frame-wrapper.bottom .border {\n  width: 100%;\n  height: 100%;\n}\n:host .lol-uikit-flyout-frame-wrapper.top .sub-border,\n:host .lol-uikit-flyout-frame-wrapper.bottom .sub-border {\n  left: 8px;\n  width: calc(100% - 16px);\n  height: 0;\n}\n:host .lol-uikit-flyout-frame-wrapper.top .sub-border::before,\n:host .lol-uikit-flyout-frame-wrapper.bottom .sub-border::before {\n  width: calc(100% - 8px);\n  height: 0;\n  border-image-source: url("/fe/lol-uikit/images/sub-border-primary-horizontal.png");\n  border-width: 4px 4px 0 4px;\n  border-image-width: 4px 4px 0 4px;\n  border-image-slice: 4 4 0 4;\n  border-image-repeat: stretch;\n  border-style: solid;\n}\n:host .lol-uikit-flyout-frame-wrapper.top .caret,\n:host .lol-uikit-flyout-frame-wrapper.bottom .caret {\n  width: 100%;\n  height: 0;\n}\n:host .lol-uikit-flyout-frame-wrapper.top .caret::before,\n:host .lol-uikit-flyout-frame-wrapper.bottom .caret::before {\n  left: calc(50% - 12px);\n  transform-origin: center center;\n}\n:host .lol-uikit-flyout-frame-wrapper.top .lol-uikit-flyout-frame,\n:host .lol-uikit-flyout-frame-wrapper.bottom .lol-uikit-flyout-frame {\n  -webkit-mask-size: 100%;\n}\n:host .lol-uikit-flyout-frame-wrapper.left .border,\n:host .lol-uikit-flyout-frame-wrapper.right .border {\n  width: 100%;\n  height: 100%;\n}\n:host .lol-uikit-flyout-frame-wrapper.left .sub-border,\n:host .lol-uikit-flyout-frame-wrapper.right .sub-border {\n  width: 0;\n  height: calc(100% - 16px);\n  top: 8px;\n}\n:host .lol-uikit-flyout-frame-wrapper.left .sub-border::before,\n:host .lol-uikit-flyout-frame-wrapper.right .sub-border::before {\n  height: calc(100% - 8px);\n  width: 0;\n  border-image-source: url("/fe/lol-uikit/images/sub-border-primary-vertical.png");\n  border-width: 4px 4px 4px 0;\n  border-image-width: 4px 4px 4px 0;\n  border-image-slice: 4 4 4 0;\n  border-image-repeat: stretch;\n  border-style: solid;\n}\n:host .lol-uikit-flyout-frame-wrapper.left .caret,\n:host .lol-uikit-flyout-frame-wrapper.right .caret {\n  width: 0;\n  height: 100%;\n}\n:host .lol-uikit-flyout-frame-wrapper.left .caret::before,\n:host .lol-uikit-flyout-frame-wrapper.right .caret::before {\n  top: calc(50% + 12px);\n}\n:host .lol-uikit-flyout-frame-wrapper.left .lol-uikit-flyout-frame,\n:host .lol-uikit-flyout-frame-wrapper.right .lol-uikit-flyout-frame {\n  -webkit-mask-size: 100%;\n}\n:host .lol-uikit-flyout-frame-wrapper.bottom .sub-border {\n  top: 0;\n  transform: rotate(180deg);\n}\n:host .lol-uikit-flyout-frame-wrapper.bottom .caret {\n  top: 3px;\n}\n:host .lol-uikit-flyout-frame-wrapper.bottom .caret::before {\n  bottom: 0;\n  transform: rotate(180deg);\n}\n:host .lol-uikit-flyout-frame-wrapper.top .sub-border {\n  bottom: 0;\n}\n:host .lol-uikit-flyout-frame-wrapper.top .caret {\n  bottom: 3px;\n}\n:host .lol-uikit-flyout-frame-wrapper.left .sub-border {\n  right: -4px;\n  transform: rotate(180deg);\n}\n:host .lol-uikit-flyout-frame-wrapper.left .caret {\n  right: 0;\n}\n:host .lol-uikit-flyout-frame-wrapper.left .caret::before {\n  left: -3px;\n  transform-origin: top left;\n  transform: rotate(270deg);\n}\n:host .lol-uikit-flyout-frame-wrapper.right .sub-border {\n  left: -4px;\n}\n:host .lol-uikit-flyout-frame-wrapper.right .caret {\n  left: 0;\n}\n:host .lol-uikit-flyout-frame-wrapper.right .caret::before {\n  right: -3px;\n  transform-origin: top right;\n  transform: rotate(90deg);\n}\n:host .lol-uikit-flyout-frame-wrapper.animation .caret::before {\n  background-position: 0;\n}\n:host .lol-uikit-flyout-frame-wrapper.animation.top .border,\n:host .lol-uikit-flyout-frame-wrapper.animation.bottom .border {\n  width: 50%;\n  left: 25%;\n}\n:host .lol-uikit-flyout-frame-wrapper.animation.top .sub-border,\n:host .lol-uikit-flyout-frame-wrapper.animation.bottom .sub-border {\n  width: 30%;\n  left: calc(33% + 8px);\n}\n:host .lol-uikit-flyout-frame-wrapper.animation.top .lol-uikit-flyout-frame,\n:host .lol-uikit-flyout-frame-wrapper.animation.bottom .lol-uikit-flyout-frame {\n  -webkit-mask-size: 50% 100%;\n}\n:host .lol-uikit-flyout-frame-wrapper.animation.left .border,\n:host .lol-uikit-flyout-frame-wrapper.animation.right .border {\n  height: 50%;\n  top: 25%;\n}\n:host .lol-uikit-flyout-frame-wrapper.animation.left .sub-border,\n:host .lol-uikit-flyout-frame-wrapper.animation.right .sub-border {\n  height: 30%;\n  top: calc(33% + 8px);\n}\n:host .lol-uikit-flyout-frame-wrapper.animation.left .lol-uikit-flyout-frame,\n:host .lol-uikit-flyout-frame-wrapper.animation.right .lol-uikit-flyout-frame {\n  opacity: 0;\n  -webkit-mask-size: 100% 50%;\n}\n:host .lol-uikit-flyout-frame-wrapper.animation.idle .border {\n  width: 100%;\n  height: 100%;\n}\n:host .lol-uikit-flyout-frame-wrapper.animation.idle .caret::before {\n  animation: caretIntro 433ms steps(13, end) forwards;\n}\n:host .lol-uikit-flyout-frame-wrapper.animation.idle .lol-uikit-flyout-frame {\n  opacity: 1;\n  -webkit-mask-size: 100% 100%;\n}\n:host .lol-uikit-flyout-frame-wrapper.animation.idle.top,\n:host .lol-uikit-flyout-frame-wrapper.animation.idle.bottom {\n  top: 0;\n}\n:host .lol-uikit-flyout-frame-wrapper.animation.idle.top .border,\n:host .lol-uikit-flyout-frame-wrapper.animation.idle.bottom .border,\n:host .lol-uikit-flyout-frame-wrapper.animation.idle.top border-glow,\n:host .lol-uikit-flyout-frame-wrapper.animation.idle.bottom border-glow {\n  left: 0;\n}\n:host .lol-uikit-flyout-frame-wrapper.animation.idle.top .sub-border,\n:host .lol-uikit-flyout-frame-wrapper.animation.idle.bottom .sub-border {\n  width: calc(100% - 16px);\n  left: 8px;\n}\n:host .lol-uikit-flyout-frame-wrapper.animation.idle.left,\n:host .lol-uikit-flyout-frame-wrapper.animation.idle.right {\n  left: 0;\n}\n:host .lol-uikit-flyout-frame-wrapper.animation.idle.left .border,\n:host .lol-uikit-flyout-frame-wrapper.animation.idle.right .border,\n:host .lol-uikit-flyout-frame-wrapper.animation.idle.left border-glow,\n:host .lol-uikit-flyout-frame-wrapper.animation.idle.right border-glow {\n  top: 0;\n}\n:host .lol-uikit-flyout-frame-wrapper.animation.idle.left .sub-border,\n:host .lol-uikit-flyout-frame-wrapper.animation.idle.right .sub-border {\n  height: calc(100% - 16px);\n  top: 8px;\n}\n:host .lol-uikit-flyout-frame-wrapper.animation.closing .border,\n:host .lol-uikit-flyout-frame-wrapper.animation.closing .sub-border,\n:host .lol-uikit-flyout-frame-wrapper.animation.closing .lol-uikit-flyout-frame {\n  transition: 133ms all cubic-bezier(1, 0, 1, 1);\n}\n:host .lol-uikit-flyout-frame-wrapper.animation.closing .caret::before {\n  background-image: url("images/pointer-outro-01.png");\n  animation: caretOutro 133ms steps(4, end) forwards;\n  transition: background 0;\n}\n@-moz-keyframes caretIntro {\n  from {\n    background-position: 0;\n  }\n  to {\n    background-position: -312px;\n  }\n}\n@-webkit-keyframes caretIntro {\n  from {\n    background-position: 0;\n  }\n  to {\n    background-position: -312px;\n  }\n}\n@-o-keyframes caretIntro {\n  from {\n    background-position: 0;\n  }\n  to {\n    background-position: -312px;\n  }\n}\n@keyframes caretIntro {\n  from {\n    background-position: 0;\n  }\n  to {\n    background-position: -312px;\n  }\n}\n@-moz-keyframes caretOutro {\n  from {\n    background-position: 0;\n  }\n  to {\n    background-position: -96px;\n  }\n}\n@-webkit-keyframes caretOutro {\n  from {\n    background-position: 0;\n  }\n  to {\n    background-position: -96px;\n  }\n}\n@-o-keyframes caretOutro {\n  from {\n    background-position: 0;\n  }\n  to {\n    background-position: -96px;\n  }\n}\n@keyframes caretOutro {\n  from {\n    background-position: 0;\n  }\n  to {\n    background-position: -96px;\n  }\n}\n'],
                sourceRoot: ""
            }]), t.exports = l
        }, (t, e, n) => {
            "use strict";
            t.exports = n.p + "pointer-intro-01.png"
        }, (t, e, n) => {
            "use strict";
            t.exports = n.p + "pointer-outro-01.png"
        }, (t, e, n) => {
            "use strict";
            Object.defineProperty(e, "__esModule", {
                value: !0
            }), e.default = void 0;
            var i = r(n(92)),
                o = r(n(2));

            function r(t) {
                return t && t.__esModule ? t : {
                    default: t
                }
            }
            class s extends i.default {
                templateMarkup() {
                    return n(111)
                }
                stylesheetMarkup() {
                    return n(112)
                }
                template() {
                    return o.default.get().getElementById("lol-uikit-template-framed-dropdown")
                }
            }
            s.tagName = "lol-uikit-framed-dropdown";
            var a = s;
            e.default = a
        }, t => {
            "use strict";
            t.exports = '<template>\r\n  <div class="ui-dropdown">\r\n    <dt class="ui-dropdown-current">\r\n      <div class="ui-dropdown-current-content shadow"></div>\r\n      <slot name=".ui-dropdown-current-content.light"></slot>\r\n    </dt>\r\n    <dd class="ui-dropdown-options-container">\r\n      <ul class="ui-dropdown-options">\r\n        <lol-uikit-scrollable>\r\n          <slot name="lol-uikit-dropdown-option"></slot>\r\n        </lol-uikit-scrollable>\r\n      </ul>\r\n    </dd>\r\n  </div>\r\n</template>\r\n'
        }, (t, e, n) => {
            var i = n(79),
                o = n(10),
                r = n(80),
                s = n(98),
                a = n(99),
                l = o(i),
                d = r(s),
                c = r(a);
            l.push([t.id, ':host .ui-dropdown {\n  font-family: var(--font-body);\n}\n:host .ui-dropdown {\n  -webkit-user-select: none;\n}\n:host .ui-dropdown {\n  font-kerning: normal;\n  -webkit-font-feature-settings: "kern" 1;\n  -webkit-font-smoothing: antialiased;\n}\n:host .ui-dropdown {\n  color: #a09b8c;\n  font-size: 12px;\n  font-weight: normal;\n  line-height: 16px;\n  letter-spacing: 0.025em;\n  -webkit-font-smoothing: subpixel-antialiased;\n}\n:host .ui-dropdown:lang(ja-jp) {\n  font-size: 13px;\n}\n:host .ui-dropdown:lang(ar-ae) {\n  letter-spacing: 0;\n}\n:host .ui-dropdown dt.ui-dropdown-current {\n  border: thin solid transparent;\n  border-image: linear-gradient(to top, #695625 0%, #a9852d 23%, #b88d35 93%, #c8aa6e 100%) 1;\n}\n:host(:not(.active):hover) dt.ui-dropdown-current,\n:host(:not(.active):focus) dt.ui-dropdown-current {\n  border: thin solid transparent;\n  border-image: linear-gradient(to top, #c89b3c, #f0e6d2) 1;\n}\n:host .ui-dropdown dd.ui-dropdown-options-container {\n  border: thin solid transparent;\n  border-image: linear-gradient(to top, #695625, #463714) 1;\n}\n:host {\n  --framed-dropdown-scrollable-max-height: 150px;\n  --framed-dropdown-current-content-padding: 0 20px 0 7px;\n  --framed-dropdown-current-content-padding-rtl: 0 7px 0 20px;\n  --framed-dropdown-opens-upward-height: auto;\n  --framed-dropdown-options-container-width: 100%;\n  --framed-dropdown-direction-rtl: rtl;\n}\n:host([stylablecontent]) .ui-dropdown-current-content.shadow {\n  display: none;\n}\n:host(:not([stylablecontent])) .ui-dropdown-current-content.light {\n  display: none;\n}\n:host .ui-dropdown-current-content,\n:host .ui-dropdown-current-content.shadow {\n  width: 100%;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n  padding: var(--framed-dropdown-current-content-padding);\n}\n:host .ui-dropdown-current-content .ui-dropdown-option-only,\n:host .ui-dropdown-current-content.shadow .ui-dropdown-option-only {\n  display: none;\n}\n:host .ui-dropdown-current-content:lang(ar-ae),\n:host .ui-dropdown-current-content.shadow:lang(ar-ae) {\n  padding: var(--framed-dropdown-current-content-padding-rtl);\n}\n:host {\n  display: inline-flex;\n  flex-direction: column;\n  width: 100%;\n  outline: 0;\n}\n:host .ui-dropdown {\n  display: inline-flex;\n  flex-direction: column;\n  position: relative;\n  user-select: none;\n  margin: 0;\n  cursor: pointer;\n  width: 100%;\n  height: 100%;\n}\n:host .ui-dropdown:lang(ar-ae) {\n  direction: var(--framed-dropdown-direction-rtl);\n  text-align: right;\n}\n:host .ui-dropdown dt.ui-dropdown-current {\n  display: flex;\n  box-sizing: border-box;\n  padding-bottom: 10px;\n  width: 100%;\n  height: 100%;\n  margin: 0;\n  padding: 7px 5px;\n  align-items: center;\n  background-color: rgba(30,35,40,0.5);\n}\n:host .ui-dropdown dt.ui-dropdown-current::after {\n  background: url(' + d + ") center no-repeat;\n  width: 13px;\n  height: 18px;\n  position: absolute;\n  right: 8px;\n  top: 50%;\n  transform: translate(0, -50%);\n  content: '';\n}\n:host .ui-dropdown dt.ui-dropdown-current:lang(ar-ae)::after {\n  right: auto;\n  left: 8px;\n}\n:host .ui-dropdown dd.ui-dropdown-options-container {\n  margin: 0;\n  opacity: 0;\n  display: flex;\n  padding: 0;\n  box-sizing: border-box;\n  width: var(--framed-dropdown-options-container-width);\n  position: absolute;\n  top: 100%;\n  max-height: 0;\n  transition: max-height 400ms;\n  z-index: 2;\n  overflow: hidden;\n  visibility: hidden;\n  background-color: rgba(30,35,40,0.5);\n}\n:host .ui-dropdown dd.ui-dropdown-options-container ul.ui-dropdown-options {\n  list-style: none;\n  margin: 0;\n  padding: 0;\n  box-sizing: border-box;\n  min-width: 100%;\n  background: #010a13;\n  height: 100%;\n}\n:host .ui-dropdown dd.ui-dropdown-options-container ul.ui-dropdown-options lol-uikit-scrollable {\n  max-height: var(--framed-dropdown-scrollable-max-height);\n}\n:host .ui-dropdown.opens-upward {\n  height: var(--framed-dropdown-opens-upward-height);\n}\n:host .ui-dropdown.opens-upward dd.ui-dropdown-options-container {\n  bottom: 100%;\n  top: auto;\n  margin-top: 1px;\n}\n:host(.disabled) {\n  cursor: default;\n  pointer-events: none;\n}\n:host(.disabled) .ui-dropdown dt.ui-dropdown-current {\n  border: thin solid #3c3c41;\n  color: #3c3c41;\n}\n:host(.disabled) .ui-dropdown dt.ui-dropdown-current::after {\n  -webkit-filter: grayscale(100%);\n  opacity: 0.35;\n}\n:host(.active) .ui-dropdown .ui-dropdown-current {\n  border: thin solid #463714;\n  color: #463714;\n}\n:host(.active) .ui-dropdown .ui-dropdown-current::after {\n  background-image: url(" + c + ");\n}\n:host(.active) .ui-dropdown dd.ui-dropdown-options-container {\n  opacity: 1;\n  max-height: 400px;\n  transition: max-height 400ms;\n  visibility: visible;\n}\n:host(:not(.active):hover) dt.ui-dropdown-current,\n:host(:not(.active):focus) dt.ui-dropdown-current {\n  background: linear-gradient(to top, rgba(88,83,66,0.5), rgba(30,35,40,0.5));\n}\n", "", {
                version: 3,
                sources: ["webpack://./fe/rcp-fe-lol-uikit/src/elements/framed-dropdown/component-style.styl"],
                names: [],
                mappings: "AAAA;EACE,6BAA6B;AAC/B;AACA;EACE,yBAAyB;AAC3B;AACA;EACE,oBAAoB;EACpB,uCAAuC;EACvC,mCAAmC;AACrC;AACA;EACE,cAAc;EACd,eAAe;EACf,mBAAmB;EACnB,iBAAiB;EACjB,uBAAuB;EACvB,4CAA4C;AAC9C;AACA;EACE,eAAe;AACjB;AACA;EACE,iBAAiB;AACnB;AACA;EACE,8BAA8B;EAC9B,2FAA2F;AAC7F;AACA;;EAEE,8BAA8B;EAC9B,yDAAyD;AAC3D;AACA;EACE,8BAA8B;EAC9B,yDAAyD;AAC3D;AACA;EACE,8CAA8C;EAC9C,uDAAuD;EACvD,2DAA2D;EAC3D,2CAA2C;EAC3C,+CAA+C;EAC/C,oCAAoC;AACtC;AACA;EACE,aAAa;AACf;AACA;EACE,aAAa;AACf;AACA;;EAEE,WAAW;EACX,gBAAgB;EAChB,uBAAuB;EACvB,mBAAmB;EACnB,uDAAuD;AACzD;AACA;;EAEE,aAAa;AACf;AACA;;EAEE,2DAA2D;AAC7D;AACA;EACE,oBAAoB;EACpB,sBAAsB;EACtB,WAAW;EACX,UAAU;AACZ;AACA;EACE,oBAAoB;EACpB,sBAAsB;EACtB,kBAAkB;EAClB,iBAAiB;EACjB,SAAS;EACT,eAAe;EACf,WAAW;EACX,YAAY;AACd;AACA;EACE,+CAA+C;EAC/C,iBAAiB;AACnB;AACA;EACE,aAAa;EACb,sBAAsB;EACtB,oBAAoB;EACpB,WAAW;EACX,YAAY;EACZ,SAAS;EACT,gBAAgB;EAChB,mBAAmB;EACnB,oCAAoC;AACtC;AACA;EACE,oEAAkE;EAClE,WAAW;EACX,YAAY;EACZ,kBAAkB;EAClB,UAAU;EACV,QAAQ;EACR,6BAA6B;EAC7B,WAAW;AACb;AACA;EACE,WAAW;EACX,SAAS;AACX;AACA;EACE,SAAS;EACT,UAAU;EACV,aAAa;EACb,UAAU;EACV,sBAAsB;EACtB,qDAAqD;EACrD,kBAAkB;EAClB,SAAS;EACT,aAAa;EACb,4BAA4B;EAC5B,UAAU;EACV,gBAAgB;EAChB,kBAAkB;EAClB,oCAAoC;AACtC;AACA;EACE,gBAAgB;EAChB,SAAS;EACT,UAAU;EACV,sBAAsB;EACtB,eAAe;EACf,mBAAmB;EACnB,YAAY;AACd;AACA;EACE,wDAAwD;AAC1D;AACA;EACE,kDAAkD;AACpD;AACA;EACE,YAAY;EACZ,SAAS;EACT,eAAe;AACjB;AACA;EACE,eAAe;EACf,oBAAoB;AACtB;AACA;EACE,0BAA0B;EAC1B,cAAc;AAChB;AACA;EACE,+BAA+B;EAC/B,aAAa;AACf;AACA;EACE,0BAA0B;EAC1B,cAAc;AAChB;AACA;EACE,yDAA8D;AAChE;AACA;EACE,UAAU;EACV,iBAAiB;EACjB,4BAA4B;EAC5B,mBAAmB;AACrB;AACA;;EAEE,2EAA2E;AAC7E",
                sourcesContent: [':host .ui-dropdown {\n  font-family: var(--font-body);\n}\n:host .ui-dropdown {\n  -webkit-user-select: none;\n}\n:host .ui-dropdown {\n  font-kerning: normal;\n  -webkit-font-feature-settings: "kern" 1;\n  -webkit-font-smoothing: antialiased;\n}\n:host .ui-dropdown {\n  color: #a09b8c;\n  font-size: 12px;\n  font-weight: normal;\n  line-height: 16px;\n  letter-spacing: 0.025em;\n  -webkit-font-smoothing: subpixel-antialiased;\n}\n:host .ui-dropdown:lang(ja-jp) {\n  font-size: 13px;\n}\n:host .ui-dropdown:lang(ar-ae) {\n  letter-spacing: 0;\n}\n:host .ui-dropdown dt.ui-dropdown-current {\n  border: thin solid transparent;\n  border-image: linear-gradient(to top, #695625 0%, #a9852d 23%, #b88d35 93%, #c8aa6e 100%) 1;\n}\n:host(:not(.active):hover) dt.ui-dropdown-current,\n:host(:not(.active):focus) dt.ui-dropdown-current {\n  border: thin solid transparent;\n  border-image: linear-gradient(to top, #c89b3c, #f0e6d2) 1;\n}\n:host .ui-dropdown dd.ui-dropdown-options-container {\n  border: thin solid transparent;\n  border-image: linear-gradient(to top, #695625, #463714) 1;\n}\n:host {\n  --framed-dropdown-scrollable-max-height: 150px;\n  --framed-dropdown-current-content-padding: 0 20px 0 7px;\n  --framed-dropdown-current-content-padding-rtl: 0 7px 0 20px;\n  --framed-dropdown-opens-upward-height: auto;\n  --framed-dropdown-options-container-width: 100%;\n  --framed-dropdown-direction-rtl: rtl;\n}\n:host([stylablecontent]) .ui-dropdown-current-content.shadow {\n  display: none;\n}\n:host(:not([stylablecontent])) .ui-dropdown-current-content.light {\n  display: none;\n}\n:host .ui-dropdown-current-content,\n:host .ui-dropdown-current-content.shadow {\n  width: 100%;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n  padding: var(--framed-dropdown-current-content-padding);\n}\n:host .ui-dropdown-current-content .ui-dropdown-option-only,\n:host .ui-dropdown-current-content.shadow .ui-dropdown-option-only {\n  display: none;\n}\n:host .ui-dropdown-current-content:lang(ar-ae),\n:host .ui-dropdown-current-content.shadow:lang(ar-ae) {\n  padding: var(--framed-dropdown-current-content-padding-rtl);\n}\n:host {\n  display: inline-flex;\n  flex-direction: column;\n  width: 100%;\n  outline: 0;\n}\n:host .ui-dropdown {\n  display: inline-flex;\n  flex-direction: column;\n  position: relative;\n  user-select: none;\n  margin: 0;\n  cursor: pointer;\n  width: 100%;\n  height: 100%;\n}\n:host .ui-dropdown:lang(ar-ae) {\n  direction: var(--framed-dropdown-direction-rtl);\n  text-align: right;\n}\n:host .ui-dropdown dt.ui-dropdown-current {\n  display: flex;\n  box-sizing: border-box;\n  padding-bottom: 10px;\n  width: 100%;\n  height: 100%;\n  margin: 0;\n  padding: 7px 5px;\n  align-items: center;\n  background-color: rgba(30,35,40,0.5);\n}\n:host .ui-dropdown dt.ui-dropdown-current::after {\n  background: url("../../images/up-down-arrow.png") center no-repeat;\n  width: 13px;\n  height: 18px;\n  position: absolute;\n  right: 8px;\n  top: 50%;\n  transform: translate(0, -50%);\n  content: \'\';\n}\n:host .ui-dropdown dt.ui-dropdown-current:lang(ar-ae)::after {\n  right: auto;\n  left: 8px;\n}\n:host .ui-dropdown dd.ui-dropdown-options-container {\n  margin: 0;\n  opacity: 0;\n  display: flex;\n  padding: 0;\n  box-sizing: border-box;\n  width: var(--framed-dropdown-options-container-width);\n  position: absolute;\n  top: 100%;\n  max-height: 0;\n  transition: max-height 400ms;\n  z-index: 2;\n  overflow: hidden;\n  visibility: hidden;\n  background-color: rgba(30,35,40,0.5);\n}\n:host .ui-dropdown dd.ui-dropdown-options-container ul.ui-dropdown-options {\n  list-style: none;\n  margin: 0;\n  padding: 0;\n  box-sizing: border-box;\n  min-width: 100%;\n  background: #010a13;\n  height: 100%;\n}\n:host .ui-dropdown dd.ui-dropdown-options-container ul.ui-dropdown-options lol-uikit-scrollable {\n  max-height: var(--framed-dropdown-scrollable-max-height);\n}\n:host .ui-dropdown.opens-upward {\n  height: var(--framed-dropdown-opens-upward-height);\n}\n:host .ui-dropdown.opens-upward dd.ui-dropdown-options-container {\n  bottom: 100%;\n  top: auto;\n  margin-top: 1px;\n}\n:host(.disabled) {\n  cursor: default;\n  pointer-events: none;\n}\n:host(.disabled) .ui-dropdown dt.ui-dropdown-current {\n  border: thin solid #3c3c41;\n  color: #3c3c41;\n}\n:host(.disabled) .ui-dropdown dt.ui-dropdown-current::after {\n  -webkit-filter: grayscale(100%);\n  opacity: 0.35;\n}\n:host(.active) .ui-dropdown .ui-dropdown-current {\n  border: thin solid #463714;\n  color: #463714;\n}\n:host(.active) .ui-dropdown .ui-dropdown-current::after {\n  background-image: url("../../images/up-down-arrow-locked.png");\n}\n:host(.active) .ui-dropdown dd.ui-dropdown-options-container {\n  opacity: 1;\n  max-height: 400px;\n  transition: max-height 400ms;\n  visibility: visible;\n}\n:host(:not(.active):hover) dt.ui-dropdown-current,\n:host(:not(.active):focus) dt.ui-dropdown-current {\n  background: linear-gradient(to top, rgba(88,83,66,0.5), rgba(30,35,40,0.5));\n}\n'],
                sourceRoot: ""
            }]), t.exports = l
        }, (t, e, n) => {
            "use strict";
            Object.defineProperty(e, "__esModule", {
                value: !0
            }), e.default = void 0;
            var i = n(1);
            class o extends i.webComponents.ShadowElement {
                templateMarkup() {
                    return n(114)
                }
                stylesheetMarkup() {
                    return n(115)
                }
                constructor() {
                    super(), this.addEventListener("cutout", (t => {
                        const e = this.buildWebkitClipPath(t);
                        this.style.webkitClipPath = e
                    }))
                }
                buildWebkitClipPath(t) {
                    return t && t.cutoutRect ? "polygon(0 0, " + t.cutoutRect.left + "px 0, " + t.cutoutRect.left + "px " + t.cutoutRect.bottom + "px, " + t.cutoutRect.right + "px " + t.cutoutRect.bottom + "px, " + t.cutoutRect.right + "px " + t.cutoutRect.top + "px, " + t.cutoutRect.left + "px " + t.cutoutRect.top + "px, " + t.cutoutRect.left + "px 0, 100% 0, 100% 100%, 0 100%)" : null
                }
            }
            o.tagName = "lol-uikit-full-page-backdrop";
            var r = o;
            e.default = r
        }, t => {
            "use strict";
            t.exports = "<template>\r\n  <slot></slot>\r\n</template>"
        }, (t, e, n) => {
            var i = n(9),
                o = n(10)(i);
            o.push([t.id, ":host {\n  background: linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.8) 93%);\n  position: absolute;\n  left: 0;\n  right: 0;\n  top: 0;\n  bottom: 0;\n}\n", ""]), t.exports = o
        }, (t, e, n) => {
            "use strict";
            Object.defineProperty(e, "__esModule", {
                value: !0
            }), e.default = void 0;
            var i = n(1);
            const o = {
                item: function(t) {
                    return function(t, e) {
                        for (const n of e) {
                            const e = new RegExp(`<(${n})>`, "g");
                            t = t.replace(e, '<span class="$1">');
                            const i = new RegExp(`</${n}>`, "g");
                            t = t.replace(i, "</span>")
                        }
                        return t
                    }(t = function(t) {
                        return t = t.replace(/<font color=['"](#?[a-z0-9]+)['"]>/gi, '<span style="color:$1;">'), t = t.replace(/<\/font>/g, "</span>"), t
                    }(t), ["active", "aura", "consumable", "flavorText", "groupLimit", "levelLimit", "mana", "passive", "rules", "scaleLevel", "stats", "unique", "unlockedPassive"])
                }
            };
            class r extends i.webComponents.ShadowElement {
                templateMarkup() {
                    return n(117)
                }
                connectedCallback() {
                    this.processAttributes()
                }
                static get observedAttributes() {
                    return ["type", "markup"]
                }
                processAttributes() {
                    const t = this.getAttribute("type");
                    let e = this.getAttribute("markup");
                    t && e ? (o[t] && (e = o[t](e)), this.innerHTML = i.htmlSanitizer.sanitize(e)) : this.innerHTML = ""
                }
            }
            r.tagName = "lol-uikit-game-data-markup";
            var s = r;
            e.default = s
        }, t => {
            "use strict";
            t.exports = "<template>\r\n  <slot></slot>\r\n</template>\r\n"
        }, (t, e, n) => {
            "use strict";
            Object.defineProperty(e, "__esModule", {
                value: !0
            }), e.default = void 0;
            var i = n(1);
            class o extends i.webComponents.ShadowElement {
                templateMarkup() {
                    return n(119)
                }
                stylesheetMarkup() {
                    return n(120)
                }
            }
            o.tagName = "lol-uikit-info-icon";
            var r = o;
            e.default = r
        }, t => {
            "use strict";
            t.exports = '<template>\r\n  <div class="lol-uikit-info-icon"></div>\r\n</template>\r\n'
        }, (t, e, n) => {
            var i = n(79),
                o = n(10),
                r = n(80),
                s = n(121),
                a = n(122),
                l = n(123),
                d = o(i),
                c = r(s),
                u = r(a),
                p = r(l);
            d.push([t.id, ".lol-uikit-info-icon {\n  position: relative;\n  width: var(--uikit-info-icon-width, 18px);\n  height: var(--uikit-info-icon-height, 18px);\n  background-image: url(" + c + ");\n  background-size: contain;\n  background-position: center;\n  background-repeat: no-repeat;\n}\n:hover {\n  background-image: url(" + u + ');\n}\n:host(:not([noClick="true"])) .lol-uikit-info-icon:active {\n  background-image: url(' + p + ");\n}\n", "", {
                version: 3,
                sources: ["webpack://./fe/rcp-fe-lol-uikit/src/elements/info-icon/component-style.styl"],
                names: [],
                mappings: "AAAA;EACE,kBAAkB;EAClB,yCAAyC;EACzC,2CAA2C;EAC3C,yDAA6C;EAC7C,wBAAwB;EACxB,2BAA2B;EAC3B,4BAA4B;AAC9B;AACA;EACE,yDAAmD;AACrD;AACA;EACE,yDAAqD;AACvD",
                sourcesContent: ['.lol-uikit-info-icon {\n  position: relative;\n  width: var(--uikit-info-icon-width, 18px);\n  height: var(--uikit-info-icon-height, 18px);\n  background-image: url("images/info-icon.svg");\n  background-size: contain;\n  background-position: center;\n  background-repeat: no-repeat;\n}\n:hover {\n  background-image: url("images/info-icon-hover.svg");\n}\n:host(:not([noClick="true"])) .lol-uikit-info-icon:active {\n  background-image: url("images/info-icon-clicked.svg");\n}\n'],
                sourceRoot: ""
            }]), t.exports = d
        }, (t, e, n) => {
            "use strict";
            t.exports = n.p + "info-icon.svg"
        }, (t, e, n) => {
            "use strict";
            t.exports = n.p + "info-icon-hover.svg"
        }, (t, e, n) => {
            "use strict";
            t.exports = n.p + "info-icon-clicked.svg"
        }, (t, e, n) => {
            "use strict";
            Object.defineProperty(e, "__esModule", {
                value: !0
            }), e.default = void 0;
            var i, o = (i = n(19)) && i.__esModule ? i : {
                    default: i
                },
                r = n(1);
            const s = ["src", "image-path", "resize-to-fit", "fixed-width", "loop", "autoplay", "gds-object-id", "errortext", "param-current-exp", "param-new-exp", "param-level-up", "param-twitch", "param-green", "param-blue", "param-purple", "text-tierlabel", "param-display-division-1", "param-display-division-2", "param-display-division-3", "param-display-division-4", "param-display-split-reward-1", "param-display-split-reward-2", "param-display-split-reward-3", "param-display-previous-division-1", "param-display-next-division-4", "param-display-next-division-1", "param-display-split-reward-1", "param-display-split-reward-2", "param-display-split-reward-3", "param-display-division-2-to-1", "param-display-division-3-to-2", "param-display-division-4-to-3", "param-display-split-reward-1", "param-display-split-reward-2", "param-display-split-reward-3", "param-checkbox-control-1", "param-current-level-progress", "param-previous-level-progress", "param-bar-filler", "asset-segments", "asset-tier", "text-winstreak", "param-effect-control-1", "param-effect-control-2"];

            function a(t) {
                return t.split("{{")[0].trim().toLowerCase().replace(/ /g, "-")
            }
            let l = null,
                d = null;
            class c extends r.webComponents.ShadowElement {
                static get observedAttributes() {
                    return s
                }
                templateMarkup() {
                    return n(125)
                }
                constructor() {
                    super(), this.data = null, this.animation = null, this.animationParams = {}, this.animationReplacementImages = {}, this.animationReplacementText = {}, this.noCache = !1, this.onAnimationStart = null, this.onAnimationComplete = null, this._reinitialize()
                }
                _reinitialize() {
                    this.animation && this.animation.destroy(), this.animation = null, this.loadingStarted = !1, this.loadingFinished = !1, this.loadPromise = new Promise(((t, e) => {
                        this.resolveLoadPromise = t, this.rejectLoadPromise = e
                    }))
                }
                reloadAnimation() {
                    if (this.loadingStarted && this.loadingFinished) return this.animation && this.animation.destroy(), this.animation = null, this._loadAnimation()
                }
                _animationParameterChangedCallback(t, e) {
                    let n = null;
                    t.match(/^param-.+$/) ? n = this.animationParams : t.match(/^text-.+$/) ? n = this.animationReplacementText : t.match(/^asset-.+$/) && (n = this.animationReplacementImages);
                    const i = t.match(/^(asset|param|text)-(.+)$/);
                    if (i) {
                        const t = i[2];
                        return e ? n[t] = e : delete n[t], this.reloadAnimation()
                    }
                }
                attributeChangedCallback(t, e, n) {
                    if (super.attributeChangedCallback(), "src" !== t) return this._animationParameterChangedCallback(t, n);
                    this._srcAttributeChanged(n)
                }
                _srcAttributeChanged(t) {
                    this.loadingStarted && !this.loadingFinished && this.rejectLoadPromise("src changed before loading was complete"), this._reinitialize(), t && this._loadAnimationJson(t).then((() => this._loadAnimation())).then((() => {
                        this.resolveLoadPromise()
                    }))
                }
                _setAnimationParameter(t, e) {
                    const n = this.data.layers.find((t => "animation control layer" === t.nm.toLowerCase()));
                    if (!n) throw new Error("Lottie animation has no animation control layer, but had parameters passed to it: " + this.getAttribute("src") + ", parameter is: " + t + "=" + e);
                    const i = n.ef.filter((e => a(e.nm) === t));
                    i.length && (e.match(/[0-9\.]+/) && (e = parseFloat(e)), i.forEach((n => {
                        const i = n.nm.match(/{{keyframe=([0-9]+)}}/);
                        if (n.mn.match("Slider")) {
                            if ("number" != typeof e) throw new Error("Lottie animation parameter value for a slider is not numeric: " + this.getAttribute("src") + ", parameter is: " + t + "=" + e);
                            if (i) {
                                const t = parseInt(i[1], 10) - 1;
                                t > 0 && n.ef[0].v.k[t - 1].e && (n.ef[0].v.k[t - 1].e[0] = e), n.ef[0].v.k[t].s && (n.ef[0].v.k[t].s[0] = e)
                            } else n.ef[0].v.k = e
                        } else {
                            if (i) throw new Error("Non-sliders in the control layer cannot have keyframes: " + this.getAttribute("src") + ", parameter is: " + t + "=" + e);
                            n.mn.match("Checkbox") ? n.ef[0].v.k = "false" !== e.toLowerCase() && 0 !== e ? 1 : 0 : n.ef[0].v.k = e
                        }
                    })))
                }
                _setText(t, e) {
                    const n = this.data.layers.filter((e => {
                        const n = e.nm.match(/{{textKey=([a-zA-Z0-9\-_]+)}}/);
                        return n && n[1] === t
                    }));
                    if (!n.length) throw new Error("Lottie animation had text subsitution, but target layer is not found. " + this.getAttribute("src") + ", textKey was: " + t + "=" + e);
                    n.forEach((n => {
                        if (!n.t) throw new Error("Lottie animation had text subsitution on a layer which is not a text layer. " + this.getAttribute("src") + ", textKey was: " + t + "=" + e);
                        n.t.d.k[0].s.t = e
                    }))
                }
                _loadGenericAssetsData() {
                    d || (d = o.default.getJSON("/lol-game-data/assets/v1/generic-assets.json", (t => {
                        l = t
                    })).fail((t => {
                        throw d = null, new Error(t)
                    })))
                }
                _setImagePaths() {
                    const t = this.getAttribute("gds-object-id"),
                        e = this.getAttribute("image-path"),
                        n = (this.getAttribute("src").match(/^(\/fe\/lol-[^\/]+\/(assets\/)?)/) || [])[1],
                        i = () => {
                            this.data.layers.forEach((t => {
                                const e = a(t.nm);
                                if (this.animationReplacementImages[e]) {
                                    const n = this.data.assets.find((e => e.id === t.refId)),
                                        i = this.animationReplacementImages[e] + "_" + Math.random();
                                    this.data.assets.push({
                                        id: i,
                                        p: this.animationReplacementImages[e].match(/[^\/]+$/)[0],
                                        u: this.animationReplacementImages[e].match(/^(.*?)[^\/]+$/)[1],
                                        w: n.w,
                                        h: n.h
                                    }), t.refId = i
                                }
                            })), this.data.assets.forEach((i => {
                                if (i.p && (i.p = i.p.split("?")[0]), t && l && l[t] && l[t][i.p]) {
                                    const e = l[t][i.p].match(/^(.*\/)(.*)$/);
                                    i.u = e[1], i.p = e[2]
                                } else e ? i.u = e : "images/" === i.u && (i.u = n + "lottie/images/");
                                this.noCache && (i.p = i.p + "?" + Math.random())
                            }))
                        };
                    return t ? d.then(i) : (i(), Promise.resolve())
                }
                _loadAnimationJson(t) {
                    this.loadingStarted = !0, this.loadingFinished = !1;
                    const e = t;
                    return this.classList.remove("loading-error"), o.default.getJSON(t, (t => {
                        e === this.getAttribute("src") && (this.data = t, this.loadingFinished = !0)
                    })).fail((t => {
                        e === this.getAttribute("src") && (this.data = null, this.loadingFinished = !0, this.classList.add("loading-error"), this.rejectLoadPromise(t))
                    }))
                }
                _loadAnimation() {
                    if (this.data && !this.animation) {
                        let t;
                        this.classList.remove("rendering-error");
                        try {
                            r.Lodash.forEach(this.animationParams, ((t, e) => {
                                this._setAnimationParameter(e, t)
                            })), r.Lodash.forEach(this.animationReplacementText, ((t, e) => {
                                this._setText(e, t)
                            })), this.getAttribute("gds-object-id") && this._loadGenericAssetsData(), t = this._setImagePaths()
                        } catch (t) {
                            throw this.classList.add("rendering-error"), this.setAttribute("errortext", "LOTTIE RENDERING ERROR: " + t.message), t
                        }
                        return t.then((() => {
                            const t = r.Lottie.loadAnimation({
                                container: this.shadowRoot.querySelector(".lottie-render-container"),
                                renderer: "svg",
                                loop: null !== this.getAttribute("loop"),
                                autoplay: null === this.getAttribute("autoplay") || "false" !== this.getAttribute("autoplay"),
                                animationData: this.data
                            });
                            this.animation = t, t && this._addHooks(t), null === this.getAttribute("resize-to-fit") && "false" !== this.getAttribute("resize-to-fit") && (this.shadowRoot.querySelector("svg").style.height = "", this.shadowRoot.querySelector("svg").style.width = "")
                        }))
                    }
                }
                _addHooks(t) {
                    t.onEnterFrame = () => {
                        t.onEnterFrame = null, this.onAnimationStart && this.onAnimationStart(t)
                    }, t.onComplete = () => {
                        this.onAnimationComplete && this.onAnimationComplete()
                    }
                }
                play() {
                    this.loadPromise.then((() => {
                        window.testsSandboxDoc && window.testsSandbox && this.animation.setSpeed(1e6), this.animation.play()
                    }))
                }
                pause() {
                    this.animation.pause()
                }
                stop() {
                    this.animation.stop()
                }
            }
            c.tagName = "lol-uikit-lottie";
            var u = c;
            e.default = u
        }, t => {
            "use strict";
            t.exports = '<template>\r\n  <style>\r\n    .lottie-render-container {\r\n      position: absolute;\r\n      left: 50%;\r\n      top: 50%;\r\n      transform: translate(-50%, -50%);\r\n    }\r\n\r\n    :host([resize-to-fit]) .lottie-render-container {\r\n      width: 100%;\r\n      height: 100%;\r\n    }\r\n\r\n    :host([fixed-width]) .lottie-render-container {\r\n      width: fit-content;\r\n      position: relative;\r\n    }\r\n  </style>\r\n  <div class="lottie-render-container"></div>\r\n</template>\r\n'
        }, (t, e, n) => {
            "use strict";
            Object.defineProperty(e, "__esModule", {
                value: !0
            }), e.default = void 0;
            var i = n(1);
            const o = "lol-uikit-navigation-item";
            class r extends i.webComponents.ShadowElement {
                static get observedAttributes() {
                    return ["type", "selectedindex", "direction"]
                }
                templateMarkup() {
                    return n(127)
                }
                stylesheetMarkup() {
                    return n(128)
                }
                constructor() {
                    super(), this.addEventListener("lol-uikit-navigation-item-click-event", (t => {
                        const e = Array.from(this.getElementsByTagName(o)).indexOf(t.target);
                        this.setAttribute("selectedindex", e), t.stopPropagation()
                    }))
                }
                connectedCallback() {
                    super.connectedCallback(), this.processAttributes()
                }
                processAttributes() {
                    if (!this.shadowRoot.host.parentElement) return;
                    const t = this.shadowRoot.querySelector(".navigation-bar"),
                        e = this.getAttribute("direction") || "left";
                    t && !t.classList.contains(e) && (t.classList.remove("up", "down", "left", "right"), t.classList.add(e)), this.getAttribute("type") || this.setAttribute("type", "nav-bar"), this.getAttribute("selectedindex") || this.setAttribute("selectedindex", 0);
                    const n = parseInt(this.getAttribute("selectedindex"));
                    this._updateActiveItem(n)
                }
                _updateActiveItem(t) {
                    Array.from(this.getElementsByTagName(o)).forEach((function(e, n) {
                        n === t ? e.setAttribute("active", "true") : e.removeAttribute("active")
                    }))
                }
            }
            r.tagName = "lol-uikit-navigation-bar";
            var s = r;
            e.default = s
        }, t => {
            "use strict";
            t.exports = '<template>\r\n  <nav class="navigation-bar">\r\n    <slot></slot>\r\n  </nav>\r\n</template>\r\n'
        }, (t, e, n) => {
            var i = n(9),
                o = n(10)(i);
            o.push([t.id, ':host([type=nav-bar]) .navigation-bar {\n  font-family: var(--font-display);\n}\n:host([type=nav-bar]) .navigation-bar {\n  -webkit-user-select: none;\n}\n:host([type=nav-bar]) .navigation-bar {\n  font-kerning: normal;\n  -webkit-font-feature-settings: "kern" 1;\n  -webkit-font-smoothing: antialiased;\n}\n:host([type=nav-bar]) .navigation-bar {\n  text-transform: uppercase;\n}\n:host([type=nav-bar]) .navigation-bar:lang(ko-kr),\n:host([type=nav-bar]) .navigation-bar:lang(ja-jp),\n:host([type=nav-bar]) .navigation-bar:lang(tr-tr),\n:host([type=nav-bar]) .navigation-bar:lang(el-gr),\n:host([type=nav-bar]) .navigation-bar:lang(th-th),\n:host([type=nav-bar]) .navigation-bar:lang(zh-tw) {\n  text-transform: none;\n}\n:host([type=nav-bar]) .navigation-bar {\n  font-size: 12px;\n  font-weight: 500;\n  letter-spacing: 0.1em;\n  color: #cdbe91;\n  -webkit-font-smoothing: subpixel-antialiased;\n}\n:host([type=nav-bar]) .navigation-bar.active {\n  position: relative;\n  color: #f0e6d2;\n}\n:host([type=nav-bar]) .navigation-bar:lang(ja-jp) {\n  font-size: 13px;\n}\n:host([type=nav-bar]) .navigation-bar:lang(zh-tw) {\n  font-size: 14px;\n}\n:host([type=nav-bar]) .navigation-bar:lang(ar-ae) {\n  letter-spacing: 0;\n}\n:host([type=nav-bar]) .navigation-bar {\n  font-family: var(--font-display);\n}\n.navigation-bar {\n  display: flex;\n  width: 100%;\n  height: 100%;\n}\n.navigation-bar.up,\n.navigation-bar.right {\n  justify-content: flex-end;\n}\n.navigation-bar.down,\n.navigation-bar.left {\n  justify-content: flex-start;\n}\n.navigation-bar.up {\n  flex-direction: column-reverse;\n}\n.navigation-bar.down {\n  flex-direction: column;\n}\n.navigation-bar.left {\n  flex-direction: row;\n}\n.navigation-bar.right {\n  flex-direction: row-reverse;\n}\n:host([type=nav-bar]) * {\n  margin: 0;\n  padding: 0;\n  border: 0;\n}\n:host([type=nav-bar]) .navigation-bar {\n  justify-content: space-between;\n  align-items: center;\n  height: auto;\n  flex: 6;\n}\n', ""]), t.exports = o
        }, (t, e, n) => {
            "use strict";
            Object.defineProperty(e, "__esModule", {
                value: !0
            }), e.default = void 0;
            var i = l(n(19)),
                o = n(1),
                r = n(18),
                s = n(17),
                a = l(n(20));

            function l(t) {
                return t && t.__esModule ? t : {
                    default: t
                }
            }
            const d = "active",
                c = "disabled",
                u = [d, c, "alert"],
                p = ".section-glow";
            class h extends o.webComponents.ShadowElement {
                static get observedAttributes() {
                    return u
                }
                templateMarkup() {
                    return n(130)
                }
                stylesheetMarkup() {
                    return n(131)
                }
                constructor() {
                    super(), this._item, this._mainElement = (0, i.default)(this.shadowRoot.querySelector(".section")), this._navClickSound = this._createSound(a.default.navClick), this._subNavClickSound = this._createSound(a.default.subnavClick), this.addEventListener("click", this._userClickedEvent.bind(this))
                }
                _handleMouseMove(t) {
                    if (this.isDisabled()) return;
                    const e = this.offsetWidth,
                        n = this.shadowRoot.querySelector(p),
                        i = e / 2,
                        o = t.offsetX - i;
                    n.style.transform = `translateX(${o/1.5}px)`, n.style.opacity = 1.3 - Math.abs(o / i)
                }
                _handleMouseOut() {
                    if (this.isDisabled()) return;
                    this.shadowRoot.querySelector(p).style.opacity = 0
                }
                connectedCallback() {
                    super.connectedCallback(), u.forEach((t => {
                        const e = this.getAttribute(t);
                        this._addRemoveCssClass(t, (0, r.isAttrTruthy)(t, e))
                    }));
                    const t = this.closest("lol-uikit-navigation-bar");
                    t && "nav-bar" === t.getAttribute("type") && (this.addEventListener("mousemove", this._handleMouseMove.bind(this)), this.addEventListener("mouseout", this._handleMouseOut.bind(this)))
                }
                _createSound(t) {
                    return (0, s.createSound)("sfx-ui", t, {
                        allowConcurrency: !1
                    })
                }
                _userClickedEvent() {
                    if (this.isDisabled()) return;
                    if (this.isActive()) return;
                    const t = this.closest("lol-uikit-navigation-bar");
                    t && "nav-bar-secondary" === t.getAttribute("type") || "tabbed" === t.getAttribute("type") ? this._subNavClickSound.play() : t && "nav-bar" === t.getAttribute("type") && this._navClickSound.play(), this.dispatchEvent(new CustomEvent("lol-uikit-navigation-item-click-event", {
                        bubbles: !0,
                        composed: !0,
                        cancelable: !0,
                        detail: {
                            node: this
                        }
                    }))
                }
                attributeChangedCallback(t, e, n) {
                    if (-1 === u.indexOf(t)) return;
                    const i = (0, r.isAttrTruthy)(t, e),
                        o = (0, r.isAttrTruthy)(t, n);
                    !i && o ? this._addRemoveCssClass(t, !0) : i && !o && this._addRemoveCssClass(t, !1)
                }
                _addRemoveCssClass(t, e) {
                    e ? this._mainElement.addClass(t) : this._mainElement.removeClass(t), this.dispatchEvent(new CustomEvent(e ? "lol-uikit-navigation-item-attr-set-event" : "lol-uikit-navigation-item-attr-remove-event", {
                        bubbles: !0,
                        composed: !0,
                        cancelable: !0,
                        detail: {
                            node: this,
                            attr: t
                        }
                    }))
                }
                isActive() {
                    return this._mainElement.hasClass(d)
                }
                isDisabled() {
                    return this._mainElement.hasClass(c)
                }
            }
            h.tagName = "lol-uikit-navigation-item";
            var m = h;
            e.default = m
        }, t => {
            "use strict";
            t.exports = '<template>\r\n  <div class="section">\r\n    <span class="section-text">\r\n      <slot></slot>\r\n      <div class="alertImage"></div>\r\n    </span>\r\n    <div class="section-glow-container">\r\n      <div class="section-glow"></div>\r\n    </div>\r\n  </div>\r\n</template>\r\n'
        }, (t, e, n) => {
            var i = n(9),
                o = n(10)(i);
            o.push([t.id, ":host-context(lol-uikit-navigation-bar[type=nav-bar]) .section,\n:host-context(lol-uikit-navigation-bar[type=nav-bar-secondary]) .section,\n:host-context(lol-uikit-navigation-bar[type=tabbed]) {\n  font-family: var(--font-display);\n}\n:host-context(lol-uikit-navigation-bar[type=nav-bar]) .section,\n:host-context(lol-uikit-navigation-bar[type=nav-bar-secondary]) .section,\n:host-context(lol-uikit-navigation-bar[type=tabbed]) {\n  -webkit-user-select: none;\n}\n:host-context(lol-uikit-navigation-bar[type=nav-bar]) .section,\n:host-context(lol-uikit-navigation-bar[type=nav-bar-secondary]) .section,\n:host-context(lol-uikit-navigation-bar[type=tabbed]) {\n  font-kerning: normal;\n  -webkit-font-feature-settings: \"kern\" 1;\n  -webkit-font-smoothing: antialiased;\n}\n:host-context(lol-uikit-navigation-bar[type=nav-bar]) .section,\n:host-context(lol-uikit-navigation-bar[type=nav-bar-secondary]) .section {\n  text-transform: uppercase;\n}\n:host-context(lol-uikit-navigation-bar[type=nav-bar]) .section:lang(ko-kr),\n:host-context(lol-uikit-navigation-bar[type=nav-bar-secondary]) .section:lang(ko-kr),\n:host-context(lol-uikit-navigation-bar[type=nav-bar]) .section:lang(ja-jp),\n:host-context(lol-uikit-navigation-bar[type=nav-bar-secondary]) .section:lang(ja-jp),\n:host-context(lol-uikit-navigation-bar[type=nav-bar]) .section:lang(tr-tr),\n:host-context(lol-uikit-navigation-bar[type=nav-bar-secondary]) .section:lang(tr-tr),\n:host-context(lol-uikit-navigation-bar[type=nav-bar]) .section:lang(el-gr),\n:host-context(lol-uikit-navigation-bar[type=nav-bar-secondary]) .section:lang(el-gr),\n:host-context(lol-uikit-navigation-bar[type=nav-bar]) .section:lang(th-th),\n:host-context(lol-uikit-navigation-bar[type=nav-bar-secondary]) .section:lang(th-th),\n:host-context(lol-uikit-navigation-bar[type=nav-bar]) .section:lang(zh-tw),\n:host-context(lol-uikit-navigation-bar[type=nav-bar-secondary]) .section:lang(zh-tw) {\n  text-transform: none;\n}\n:host-context(lol-uikit-navigation-bar[type=nav-bar]) .section,\n:host-context(lol-uikit-navigation-bar[type=nav-bar-secondary]) .section {\n  font-size: 14px;\n  font-weight: 700;\n  letter-spacing: 0.075em;\n  color: #cdbe91;\n}\n:host-context(lol-uikit-navigation-bar[type=nav-bar]) .section.active,\n:host-context(lol-uikit-navigation-bar[type=nav-bar-secondary]) .section.active {\n  position: relative;\n  color: #f0e6d2;\n}\n:host-context(lol-uikit-navigation-bar[type=nav-bar]) .section:lang(ar-ae),\n:host-context(lol-uikit-navigation-bar[type=nav-bar-secondary]) .section:lang(ar-ae) {\n  letter-spacing: 0;\n}\n:host-context(lol-uikit-navigation-bar[type=nav-bar-secondary]) .section {\n  font-size: 12px;\n  font-weight: 500;\n  letter-spacing: 0.1em;\n  color: #cdbe91;\n  -webkit-font-smoothing: subpixel-antialiased;\n}\n:host-context(lol-uikit-navigation-bar[type=nav-bar-secondary]) .section.active {\n  position: relative;\n  color: #f0e6d2;\n}\n:host-context(lol-uikit-navigation-bar[type=nav-bar-secondary]) .section:lang(ja-jp) {\n  font-size: 13px;\n}\n:host-context(lol-uikit-navigation-bar[type=nav-bar-secondary]) .section:lang(zh-tw) {\n  font-size: 14px;\n}\n:host-context(lol-uikit-navigation-bar[type=nav-bar-secondary]) .section:lang(ar-ae) {\n  letter-spacing: 0;\n}\n:host-context(lol-uikit-navigation-bar[type=tabbed]) {\n  color: #c8aa6e;\n  font-size: 14px;\n  font-weight: 700;\n  letter-spacing: 0.0325em;\n}\n:host-context(lol-uikit-navigation-bar[type=tabbed]):lang(ar-ae) {\n  letter-spacing: 0;\n}\n:host-context(lol-uikit-navigation-bar[type=tabbed]):hover {\n  color: #f0e6d2;\n}\n:host-context(lol-uikit-navigation-bar[type=tabbed]):disabled,\n:host-context(lol-uikit-navigation-bar[type=tabbed]):disabled:hover,\n:host-context(lol-uikit-navigation-bar[type=tabbed])[disabled='true'],\n:host-context(lol-uikit-navigation-bar[type=tabbed])[disabled='true']:hover {\n  color: #5c5b57;\n  cursor: default;\n}\n:host-context(lol-uikit-navigation-bar[type=tabbed]):active {\n  color: #785a28;\n}\n:host-context(lol-uikit-navigation-bar[type=nav-bar]),\n:host-context(lol-uikit-navigation-bar[type=nav-bar-secondary]) {\n  display: flex;\n  position: relative;\n  cursor: pointer;\n  min-width: 28px;\n  white-space: nowrap;\n  text-overflow: ellipsis;\n}\n:host-context(lol-uikit-navigation-bar[type=nav-bar]):last-of-type,\n:host-context(lol-uikit-navigation-bar[type=nav-bar-secondary]):last-of-type {\n  margin-right: 0;\n}\n:host-context(lol-uikit-navigation-bar[type=nav-bar]) *,\n:host-context(lol-uikit-navigation-bar[type=nav-bar-secondary]) * {\n  cursor: pointer;\n}\n:host-context(lol-uikit-navigation-bar[type=nav-bar]) .section,\n:host-context(lol-uikit-navigation-bar[type=nav-bar-secondary]) .section {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  position: relative;\n  color: var(--default-color, #cdbe91);\n  border: none;\n  margin: 0;\n  text-decoration: none;\n  outline: none;\n  transition: text-shadow 0.3s ease-in-out, background 1.5s;\n  width: 100%;\n  height: 100%;\n  min-height: 20px;\n  cursor: pointer;\n}\n:host-context(lol-uikit-navigation-bar[type=nav-bar]) .section *,\n:host-context(lol-uikit-navigation-bar[type=nav-bar-secondary]) .section * {\n  cursor: pointer;\n}\n:host-context(lol-uikit-navigation-bar[type=nav-bar]) .section .alertImage,\n:host-context(lol-uikit-navigation-bar[type=nav-bar-secondary]) .section .alertImage {\n  display: none;\n  position: absolute;\n  right: 0px;\n  top: -5px;\n  background-color: var(--default-color, #cdbe91);\n  border-radius: 50%;\n  width: 10px;\n  height: 10px;\n}\n:host-context(lol-uikit-navigation-bar[type=nav-bar]) .section.alert .alertImage,\n:host-context(lol-uikit-navigation-bar[type=nav-bar-secondary]) .section.alert .alertImage {\n  display: block;\n}\n:host-context(lol-uikit-navigation-bar[type=nav-bar]) .section .section-text,\n:host-context(lol-uikit-navigation-bar[type=nav-bar-secondary]) .section .section-text {\n  padding: 0px 15px;\n}\n:host-context(lol-uikit-navigation-bar[type=nav-bar]) .section .section-text:lang(ar-ae),\n:host-context(lol-uikit-navigation-bar[type=nav-bar-secondary]) .section .section-text:lang(ar-ae) {\n  direction: rtl;\n}\n:host-context(lol-uikit-navigation-bar[type=nav-bar]) .section.active,\n:host-context(lol-uikit-navigation-bar[type=nav-bar-secondary]) .section.active {\n  cursor: default;\n}\n:host-context(lol-uikit-navigation-bar[type=nav-bar]) .section.active::before,\n:host-context(lol-uikit-navigation-bar[type=nav-bar-secondary]) .section.active::before {\n  content: '';\n  height: 15px;\n  width: 100%;\n  position: absolute;\n  top: -1px;\n  left: 0;\n  background-image: url(\"/fe/lol-uikit/images/nav-pointer.png\");\n  background-repeat: no-repeat;\n  background-size: contain;\n  background-position: center;\n  pointer-events: none;\n}\n:host-context(lol-uikit-navigation-bar[type=nav-bar]) .section:hover:not(.disabled),\n:host-context(lol-uikit-navigation-bar[type=nav-bar-secondary]) .section:hover:not(.disabled) {\n  color: var(--hover-color, #f0e6d2);\n}\n:host-context(lol-uikit-navigation-bar[type=nav-bar]) .section:hover:not(.disabled) .alertImage,\n:host-context(lol-uikit-navigation-bar[type=nav-bar-secondary]) .section:hover:not(.disabled) .alertImage {\n  background-color: var(--hover-color, #f0e6d2);\n}\n:host-context(lol-uikit-navigation-bar[type=nav-bar]) .section.active,\n:host-context(lol-uikit-navigation-bar[type=nav-bar-secondary]) .section.active {\n  color: var(--active-color, #f0e6d2);\n}\n:host-context(lol-uikit-navigation-bar[type=nav-bar]) .section.active .alertImage,\n:host-context(lol-uikit-navigation-bar[type=nav-bar-secondary]) .section.active .alertImage {\n  background-color: var(--active-color, #f0e6d2);\n}\n:host-context(lol-uikit-navigation-bar[type=nav-bar]) .section:not(.active):not(.disabled):active,\n:host-context(lol-uikit-navigation-bar[type=nav-bar-secondary]) .section:not(.active):not(.disabled):active {\n  color: var(--click-color, #c89b3c);\n}\n:host-context(lol-uikit-navigation-bar[type=nav-bar]) .section.disabled,\n:host-context(lol-uikit-navigation-bar[type=nav-bar-secondary]) .section.disabled {\n  color: var(--disabled-color, #888);\n  cursor: default;\n}\n:host-context(lol-uikit-navigation-bar[type=nav-bar]) .section.disabled:hover,\n:host-context(lol-uikit-navigation-bar[type=nav-bar-secondary]) .section.disabled:hover,\n:host-context(lol-uikit-navigation-bar[type=nav-bar]) .section.disabled.active,\n:host-context(lol-uikit-navigation-bar[type=nav-bar-secondary]) .section.disabled.active {\n  background: none;\n  text-shadow: none;\n}\n:host-context(lol-uikit-navigation-bar[type=nav-bar-secondary]) .section .alertImage {\n  right: 5px;\n  top: -3px;\n  width: 6px;\n  height: 6px;\n  background-color: var(--default-color, #c89b3c);\n}\n:host-context(lol-uikit-navigation-bar[type=nav-bar-secondary]) .section.active::before {\n  background-image: none;\n}\n:host-context(lol-uikit-navigation-bar[type=nav-bar-secondary]) .section.active .section-glow {\n  height: 1px;\n  width: 100%;\n  position: absolute;\n  left: 0;\n  top: 20px;\n  margin: 0;\n  background: linear-gradient(to left, transparent, #cdbe91, transparent);\n}\n:host-context(lol-uikit-navigation-bar[type=nav-bar]) .section {\n  height: 79px;\n}\n:host-context(lol-uikit-navigation-bar[type=nav-bar]) .section.active {\n  background-image: linear-gradient(0deg, rgba(205,190,145,0.15) 0%, rgba(31,37,38,0) 55%);\n}\n:host-context(lol-uikit-navigation-bar[type=nav-bar]) .section::after {\n  content: '';\n  background-image: linear-gradient(0deg, rgba(205,190,145,0.2) 0%, rgba(31,37,38,0) 55%);\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  opacity: 0;\n  transition: opacity 0.4s ease-in;\n}\n:host-context(lol-uikit-navigation-bar[type=nav-bar]) .section:not(.disabled):hover::after {\n  opacity: 1;\n  transition: opacity 0.1s ease-out;\n}\n:host-context(lol-uikit-navigation-bar[type=nav-bar]) .section .section-glow-container {\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  overflow: hidden;\n}\n:host-context(lol-uikit-navigation-bar[type=nav-bar]) .section .section-glow {\n  width: 100%;\n  height: 90px;\n  position: absolute;\n  bottom: 0;\n  left: 0;\n  background: url(\"/fe/lol-uikit/images/nav-highlight.png\") no-repeat;\n  background-position: bottom center;\n  background-size: 100% 32px;\n  pointer-events: none;\n  opacity: 0;\n  transition: opacity 0.1s;\n}\n:host-context(lol-uikit-navigation-bar[type=nav-bar]) .section .section-text:lang(ko-kr),\n:host-context(lol-uikit-navigation-bar[type=nav-bar]) .section .section-text:lang(zh-tw),\n:host-context(lol-uikit-navigation-bar[type=nav-bar]) .section .section-text:lang(zh-cn),\n:host-context(lol-uikit-navigation-bar[type=nav-bar]) .section .section-text:lang(zh-my) {\n  font-size: 20px;\n}\n:host-context(lol-uikit-navigation-bar[type=tabbed]) {\n  display: flex;\n  position: relative;\n  width: 100%;\n  height: 100%;\n  cursor: pointer;\n  padding-left: 12px;\n  text-align: left;\n  line-height: 30px;\n  vertical-align: middle;\n  transition: 300ms color;\n}\n:host-context(lol-uikit-navigation-bar[type=tabbed]) .section {\n  position: relative;\n}\n:host-context(lol-uikit-navigation-bar[type=tabbed]) .section .alertImage {\n  display: none;\n  position: absolute;\n  right: -12px;\n  top: 0px;\n  background-color: var(--default-color, #cdbe91);\n  border-radius: 50%;\n  width: 10px;\n  height: 10px;\n}\n:host-context(lol-uikit-navigation-bar[type=tabbed]) .section.alert .alertImage {\n  display: block;\n}\n:host-context(lol-uikit-navigation-bar[type=tabbed]) .section.active .alertImage {\n  background-color: var(--active-color, #f0e6d2);\n}\n:host-context(lol-uikit-navigation-bar[type=tabbed])::before {\n  content: '';\n  position: absolute;\n  width: 3px;\n  height: 100%;\n  top: 0;\n  left: 1px;\n  background-image: linear-gradient(to bottom, #c89b3c, #c89b3c);\n  background-size: 100% 100%;\n  background-position: left center;\n  background-repeat: no-repeat;\n  opacity: 0;\n  transition: 400ms opacity;\n}\n:host-context(lol-uikit-navigation-bar[type=tabbed]):host {\n  cursor: pointer;\n}\n:host-context(lol-uikit-navigation-bar[type=tabbed]):host([active]) {\n  color: #f0e6d2;\n  cursor: default;\n}\n:host-context(lol-uikit-navigation-bar[type=tabbed]):host([active])::before {\n  opacity: 1;\n}\n:host-context(lol-uikit-navigation-bar[type=tabbed]):host([disabled]) {\n  color: #1e2328;\n  cursor: default;\n}\n", ""]), t.exports = o
        }, (t, e) => {
            "use strict";
            Object.defineProperty(e, "__esModule", {
                value: !0
            }), e.default = void 0;
            const n = {
                limitRange: 508.63361717427733,
                fadeRange: 100,
                scale1: 1.4382054002858877,
                scale2: 1,
                scale3: 1,
                scale4: 1.1,
                speed: .2630863537108331
            };
            var i = class {
                constructor(t, e = {}, i = !0) {
                    this._elements = t, this._config = Object.assign({}, n, e), this._init(), i && this.play()
                }
                _init() {}
                play() {
                    this._isPlaying = !0, this._loop()
                }
                pause() {
                    this._isPlaying = !1
                }
                update() {}
                _loop() {
                    this.update(), this._isPlaying && window.requestAnimationFrame((() => this._loop()))
                }
                destroy() {
                    this.pause()
                }
            };
            e.default = i
        }, (t, e) => {
            "use strict";
            Object.defineProperty(e, "__esModule", {
                value: !0
            }), e.default = void 0;
            var n = class {
                constructor(t, e) {
                    var n, i;
                    this._element = t, this._x = 0, this._y = 0, this._speed = .2 * (i = 10, (n = 5) + Math.random() * (i - n)), this._config = e
                }
                update(t, e) {
                    this._x -= this._speed * this._config.speed, this._x < -this._config.limitRange && (this._x += 2 * this._config.limitRange), this._updateCSS(t, e)
                }
                updateConfig(t) {
                    Object.assign(this._config, t)
                }
                _updateCSS() {
                    const {
                        limitRange: t,
                        fadeRange: e
                    } = this._config;
                    this._element.style.transform = `translate(${this._x}px, ${this._y}px)`;
                    let n = 1;
                    const i = Math.abs(this._x);
                    i > t - e && (n = 1 - (i - t + e) / e), this._element.style.opacity = n
                }
            };
            e.default = n
        }, (t, e, n) => {
            "use strict";
            Object.defineProperty(e, "__esModule", {
                value: !0
            }), e.default = void 0;
            var i = r(n(132)),
                o = r(n(133));

            function r(t) {
                return t && t.__esModule ? t : {
                    default: t
                }
            }
            class s extends i.default {
                constructor(t, e, n = !0) {
                    super(t, e, n)
                }
                _init() {
                    this._layers = [];
                    const t = -this._config.limitRange,
                        e = 2 * this._config.limitRange / this._elements.length;
                    this._elements.forEach(((n, i) => {
                        const r = (({
                            limitRange: t,
                            fadeRange: e,
                            speed: n
                        }) => ({
                            limitRange: t,
                            fadeRange: e,
                            speed: n
                        }))(this._config);
                        r.scale = this._config[`scale${i+1}`];
                        const s = new o.default(n, r);
                        s.x = t + i * e, this._layers.push(s)
                    }))
                }
                update() {
                    this._layers.forEach((t => t.update()))
                }
                updateConfig(t) {
                    this._config = Object.assign(this._config, t), this._layers.forEach(((t, e) => {
                        const n = (({
                            limitRange: t,
                            fadeRange: e,
                            speed: n
                        }) => ({
                            limitRange: t,
                            fadeRange: e,
                            speed: n
                        }))(this._config);
                        n.scale = this._config[`scale${e+1}`], t.updateConfig(n)
                    }))
                }
            }
            var a = s;
            e.default = a
        }, (t, e, n) => {
            "use strict";
            Object.defineProperty(e, "__esModule", {
                value: !0
            }), e.default = void 0;
            var i, o = (i = n(134)) && i.__esModule ? i : {
                    default: i
                },
                r = n(1);
            const s = ["/fe/lol-uikit/images/parallax-smoke1.png", "/fe/lol-uikit/images/parallax-smoke2.png", "/fe/lol-uikit/images/parallax-smoke3.png", "/fe/lol-uikit/images/parallax-smoke4.png"],
                a = "parallax-layer";
            class l extends r.webComponents.ShadowElement {
                static get observedAttributes() {
                    return ["animated", "parallax-config", "layer-image-paths", "background-path", "foreground-path"]
                }
                templateMarkup() {
                    return n(136)
                }
                stylesheetMarkup() {
                    return n(137)
                }
                connectedCallback() {
                    super.connectedCallback();
                    const t = "false" !== this.getAttribute("animated");
                    this._animated = t;
                    const e = JSON.parse(this.getAttribute("parallax-config"));
                    this.parallaxConfig = e;
                    const n = JSON.parse(this.getAttribute("layer-image-paths")) || s,
                        i = this.getAttribute("background-path") || "/fe/lol-uikit/images/parallax-smoke-background.png",
                        r = this.getAttribute("foreground-path") || "/fe/lol-uikit/images/parallax-smoke-foreground.png",
                        a = this.shadowRoot.querySelector(".parallax-layer-container"),
                        l = n.map((e => this.addParallaxLayer(a, e, "parallax-background-layer", t)));
                    this.setBackgroundPaths(a, r, i), this._parallaxConfigObserver = new MutationObserver((() => {
                        this.onParallaxConfigChanged()
                    })), this._parallaxConfigObserver.observe(this, {
                        attributeFilter: ["parallax-config"]
                    }), this._animatedObserver = new MutationObserver((() => {
                        this.onAnimatedChanged()
                    })), this._animatedObserver.observe(this, {
                        attributeFilter: ["animated"]
                    }), this._parallax = new o.default(l, e, t)
                }
                disconnectedCallback() {
                    super.disconnectedCallback(), this._parallaxConfigObserver.disconnect(), this._animatedObserver.disconnect(), this._parallax.destroy(), this.removeAllParallaxLayers()
                }
                addParallaxLayer(t, e, n, i) {
                    const o = document.createElement("div");
                    return o.classList.add(a), o.classList.add(n), o.style.backgroundImage = `url(${e})`, o.setAttribute("animated", Boolean(i)), t.appendChild(o), o
                }
                removeAllParallaxLayers() {
                    const t = this.shadowRoot.querySelector(".parallax-layer-container"),
                        e = this.shadowRoot.querySelectorAll("." + a);
                    for (let n = 0; n < e.length; n++) t.removeChild(e[n])
                }
                setBackgroundPaths(t, e, n) {
                    n && (t.style.backgroundImage = `url(${n})`), e && this.addParallaxLayer(t, e, "parallax-foreground-layer")
                }
                onParallaxConfigChanged() {
                    const t = JSON.parse(this.getAttribute("parallax-config"));
                    this._parallax.updateConfig(t)
                }
                onAnimatedChanged() {
                    const t = "false" !== this.getAttribute("animated");
                    this._animated !== t && (t ? this._parallax.play() : this._parallax.pause(), this._animated = t)
                }
            }
            l.tagName = "lol-uikit-parallax-background";
            var d = l;
            e.default = d
        }, t => {
            "use strict";
            t.exports = '<template>\r\n  <div class="parallax-layer-container">\r\n  </div>\r\n</template>\r\n'
        }, (t, e, n) => {
            var i = n(9),
                o = n(10)(i);
            o.push([t.id, "lol-uikit-parallax-background {\n  width: 100%;\n  height: 100%;\n  position: absolute;\n}\n.parallax-layer-container {\n  width: 100%;\n  height: 100%;\n  position: relative;\n  overflow: hidden;\n  background-size: cover;\n  background-position-y: 100%;\n  background-repeat: no-repeat;\n}\n.parallax-layer-container .parallax-layer {\n  width: 100%;\n  height: 100%;\n  position: absolute;\n  background-size: contain;\n  background-position-y: 100%;\n  backface-visibility: hidden;\n}\n.parallax-layer-container .parallax-background-layer {\n  background-repeat: no-repeat;\n}\n", ""]), t.exports = o
        }, (t, e, n) => {
            "use strict";
            Object.defineProperty(e, "__esModule", {
                value: !0
            }), e.default = void 0;
            var i = n(1),
                o = a(n(139)),
                r = a(n(160)),
                s = a(n(161));

            function a(t) {
                return t && t.__esModule ? t : {
                    default: t
                }
            }
            class l extends i.webComponents.ShadowElement {
                static get observedAttributes() {
                    return []
                }
                templateMarkup() {
                    return n(162)
                }
                stylesheetMarkup() {
                    const t = n(163);
                    return r.default+"\n" + t.toString()
                }
                connectedCallback() {
                    if (super.connectedCallback(), this._initialized) return;
                    this._initialized = !0;
                    const t = this.shadowRoot.querySelector(".wrapper");
                    o.default.initialize(t);
                    const e = t.querySelector(".inner-wrapper");
                    (0, s.default)(e, this.onElementResizeEvent)
                }
                onElementResizeEvent() {
                    if (!this.shadowRoot) return;
                    const t = this.shadowRoot.querySelector(".wrapper");
                    t && o.default.update(t)
                }
                disconnectedCallback() {
                    super.disconnectedCallback();
                    const t = this.shadowRoot.querySelector(".wrapper"),
                        e = t.querySelector(".inner-wrapper");
                    s.default.unbind(e, this.onElementResizeEvent), o.default.destroy(t), this._initialized = !1
                }
            }
            l.tagName = "lol-uikit-perfect-scrollable";
            var d = l;
            e.default = d
        }, (t, e, n) => {
            "use strict";
            t.exports = n(140)
        }, (t, e, n) => {
            "use strict";
            var i = n(141),
                o = n(149),
                r = n(159);
            t.exports = {
                initialize: o,
                update: r,
                destroy: i
            }
        }, (t, e, n) => {
            "use strict";
            var i = n(142),
                o = n(144),
                r = n(145);
            t.exports = function(t) {
                var e = r.get(t);
                e && (e.event.unbindAll(), o.remove(e.scrollbarX), o.remove(e.scrollbarY), o.remove(e.scrollbarXRail), o.remove(e.scrollbarYRail), i.removePsClasses(t), r.remove(t))
            }
        }, (t, e, n) => {
            "use strict";
            var i = n(143),
                o = n(144),
                r = e.toInt = function(t) {
                    return parseInt(t, 10) || 0
                },
                s = e.clone = function(t) {
                    if (t) {
                        if (t.constructor === Array) return t.map(s);
                        if ("object" == typeof t) {
                            var e = {};
                            for (var n in t) e[n] = s(t[n]);
                            return e
                        }
                        return t
                    }
                    return null
                };
            e.extend = function(t, e) {
                var n = s(t);
                for (var i in e) n[i] = s(e[i]);
                return n
            }, e.isEditable = function(t) {
                return o.matches(t, "input,[contenteditable]") || o.matches(t, "select,[contenteditable]") || o.matches(t, "textarea,[contenteditable]") || o.matches(t, "button,[contenteditable]")
            }, e.removePsClasses = function(t) {
                for (var e = i.list(t), n = 0; n < e.length; n++) {
                    var o = e[n];
                    0 === o.indexOf("ps-") && i.remove(t, o)
                }
            }, e.outerWidth = function(t) {
                return r(o.css(t, "width")) + r(o.css(t, "paddingLeft")) + r(o.css(t, "paddingRight")) + r(o.css(t, "borderLeftWidth")) + r(o.css(t, "borderRightWidth"))
            }, e.startScrolling = function(t, e) {
                i.add(t, "ps-in-scrolling"), void 0 !== e ? i.add(t, "ps-" + e) : (i.add(t, "ps-x"), i.add(t, "ps-y"))
            }, e.stopScrolling = function(t, e) {
                i.remove(t, "ps-in-scrolling"), void 0 !== e ? i.remove(t, "ps-" + e) : (i.remove(t, "ps-x"), i.remove(t, "ps-y"))
            }, e.env = {
                isWebKit: "WebkitAppearance" in document.documentElement.style,
                supportsTouch: "ontouchstart" in window || window.DocumentTouch && document instanceof window.DocumentTouch,
                supportsIePointer: null !== window.navigator.msMaxTouchPoints
            }
        }, (t, e) => {
            "use strict";
            e.add = function(t, e) {
                t.classList ? t.classList.add(e) : function(t, e) {
                    var n = t.className.split(" ");
                    n.indexOf(e) < 0 && n.push(e), t.className = n.join(" ")
                }(t, e)
            }, e.remove = function(t, e) {
                t.classList ? t.classList.remove(e) : function(t, e) {
                    var n = t.className.split(" "),
                        i = n.indexOf(e);
                    i >= 0 && n.splice(i, 1), t.className = n.join(" ")
                }(t, e)
            }, e.list = function(t) {
                return t.classList ? Array.prototype.slice.apply(t.classList) : t.className.split(" ")
            }
        }, t => {
            "use strict";
            var e = {};
            e.e = function(t, e) {
                var n = document.createElement(t);
                return n.className = e, n
            }, e.appendTo = function(t, e) {
                return e.appendChild(t), t
            }, e.css = function(t, e, n) {
                return "object" == typeof e ? function(t, e) {
                    for (var n in e) {
                        var i = e[n];
                        "number" == typeof i && (i = i.toString() + "px"), t.style[n] = i
                    }
                    return t
                }(t, e) : void 0 === n ? function(t, e) {
                    return window.getComputedStyle(t)[e]
                }(t, e) : function(t, e, n) {
                    return "number" == typeof n && (n = n.toString() + "px"), t.style[e] = n, t
                }(t, e, n)
            }, e.matches = function(t, e) {
                return void 0 !== t.matches ? t.matches(e) : void 0 !== t.matchesSelector ? t.matchesSelector(e) : void 0 !== t.webkitMatchesSelector ? t.webkitMatchesSelector(e) : void 0 !== t.mozMatchesSelector ? t.mozMatchesSelector(e) : void 0 !== t.msMatchesSelector ? t.msMatchesSelector(e) : void 0
            }, e.remove = function(t) {
                void 0 !== t.remove ? t.remove() : t.parentNode && t.parentNode.removeChild(t)
            }, e.queryChildren = function(t, n) {
                return Array.prototype.filter.call(t.childNodes, (function(t) {
                    return e.matches(t, n)
                }))
            }, t.exports = e
        }, (t, e, n) => {
            "use strict";
            var i = n(142),
                o = n(143),
                r = n(146),
                s = n(144),
                a = n(147),
                l = n(148),
                d = {};

            function c(t) {
                var e, n, l = this;

                function d() {
                    o.add(t, "ps-focus")
                }

                function c() {
                    o.remove(t, "ps-focus")
                }
                l.settings = i.clone(r), l.containerWidth = null, l.containerHeight = null, l.contentWidth = null, l.contentHeight = null, l.isRtl = "rtl" === s.css(t, "direction"), l.isNegativeScroll = (n = t.scrollLeft, t.scrollLeft = -1, e = t.scrollLeft < 0, t.scrollLeft = n, e), l.negativeScrollAdjustment = l.isNegativeScroll ? t.scrollWidth - t.clientWidth : 0, l.event = new a, l.ownerDocument = t.ownerDocument || document, l.scrollbarXRail = s.appendTo(s.e("div", "ps-scrollbar-x-rail"), t), l.scrollbarX = s.appendTo(s.e("div", "ps-scrollbar-x"), l.scrollbarXRail), l.scrollbarX.setAttribute("tabindex", 0), l.event.bind(l.scrollbarX, "focus", d), l.event.bind(l.scrollbarX, "blur", c), l.scrollbarXActive = null, l.scrollbarXWidth = null, l.scrollbarXLeft = null, l.scrollbarXBottom = i.toInt(s.css(l.scrollbarXRail, "bottom")), l.isScrollbarXUsingBottom = l.scrollbarXBottom == l.scrollbarXBottom, l.scrollbarXTop = l.isScrollbarXUsingBottom ? null : i.toInt(s.css(l.scrollbarXRail, "top")), l.railBorderXWidth = i.toInt(s.css(l.scrollbarXRail, "borderLeftWidth")) + i.toInt(s.css(l.scrollbarXRail, "borderRightWidth")), s.css(l.scrollbarXRail, "display", "block"), l.railXMarginWidth = i.toInt(s.css(l.scrollbarXRail, "marginLeft")) + i.toInt(s.css(l.scrollbarXRail, "marginRight")), s.css(l.scrollbarXRail, "display", ""), l.railXWidth = null, l.railXRatio = null, l.scrollbarYRail = s.appendTo(s.e("div", "ps-scrollbar-y-rail"), t), l.scrollbarY = s.appendTo(s.e("div", "ps-scrollbar-y"), l.scrollbarYRail), l.scrollbarY.setAttribute("tabindex", 0), l.event.bind(l.scrollbarY, "focus", d), l.event.bind(l.scrollbarY, "blur", c), l.scrollbarYActive = null, l.scrollbarYHeight = null, l.scrollbarYTop = null, l.scrollbarYRight = i.toInt(s.css(l.scrollbarYRail, "right")), l.isScrollbarYUsingRight = l.scrollbarYRight == l.scrollbarYRight, l.scrollbarYLeft = l.isScrollbarYUsingRight ? null : i.toInt(s.css(l.scrollbarYRail, "left")), l.scrollbarYOuterWidth = l.isRtl ? i.outerWidth(l.scrollbarY) : null, l.railBorderYWidth = i.toInt(s.css(l.scrollbarYRail, "borderTopWidth")) + i.toInt(s.css(l.scrollbarYRail, "borderBottomWidth")), s.css(l.scrollbarYRail, "display", "block"), l.railYMarginHeight = i.toInt(s.css(l.scrollbarYRail, "marginTop")) + i.toInt(s.css(l.scrollbarYRail, "marginBottom")), s.css(l.scrollbarYRail, "display", ""), l.railYHeight = null, l.railYRatio = null
            }

            function u(t) {
                return t.getAttribute("data-ps-id")
            }
            e.add = function(t) {
                var e = l();
                return function(t, e) {
                    t.setAttribute("data-ps-id", e)
                }(t, e), d[e] = new c(t), d[e]
            }, e.remove = function(t) {
                delete d[u(t)],
                    function(t) {
                        t.removeAttribute("data-ps-id")
                    }(t)
            }, e.get = function(t) {
                return d[u(t)]
            }
        }, t => {
            "use strict";
            t.exports = {
                handlers: ["click-rail", "drag-scrollbar", "keyboard", "wheel", "touch"],
                maxScrollbarLength: null,
                minScrollbarLength: null,
                scrollXMarginOffset: 0,
                scrollYMarginOffset: 0,
                suppressScrollX: !1,
                suppressScrollY: !1,
                swipePropagation: !0,
                useBothWheelAxes: !1,
                wheelPropagation: !1,
                wheelSpeed: 1,
                theme: "default"
            }
        }, t => {
            "use strict";
            var e = function(t) {
                this.element = t, this.events = {}
            };
            e.prototype.bind = function(t, e) {
                void 0 === this.events[t] && (this.events[t] = []), this.events[t].push(e), this.element.addEventListener(t, e, !1)
            }, e.prototype.unbind = function(t, e) {
                var n = void 0 !== e;
                this.events[t] = this.events[t].filter((function(i) {
                    return !(!n || i === e) || (this.element.removeEventListener(t, i, !1), !1)
                }), this)
            }, e.prototype.unbindAll = function() {
                for (var t in this.events) this.unbind(t)
            };
            var n = function() {
                this.eventElements = []
            };
            n.prototype.eventElement = function(t) {
                var n = this.eventElements.filter((function(e) {
                    return e.element === t
                }))[0];
                return void 0 === n && (n = new e(t), this.eventElements.push(n)), n
            }, n.prototype.bind = function(t, e, n) {
                this.eventElement(t).bind(e, n)
            }, n.prototype.unbind = function(t, e, n) {
                this.eventElement(t).unbind(e, n)
            }, n.prototype.unbindAll = function() {
                for (var t = 0; t < this.eventElements.length; t++) this.eventElements[t].unbindAll()
            }, n.prototype.once = function(t, e, n) {
                var i = this.eventElement(t),
                    o = function(t) {
                        i.unbind(e, o), n(t)
                    };
                i.bind(e, o)
            }, t.exports = n
        }, t => {
            "use strict";
            t.exports = function() {
                function t() {
                    return Math.floor(65536 * (1 + Math.random())).toString(16).substring(1)
                }
                return function() {
                    return t() + t() + "-" + t() + "-" + t() + "-" + t() + "-" + t() + t() + t()
                }
            }()
        }, (t, e, n) => {
            "use strict";
            var i = n(142),
                o = n(143),
                r = n(145),
                s = n(150),
                a = {
                    "click-rail": n(152),
                    "drag-scrollbar": n(153),
                    keyboard: n(154),
                    wheel: n(155),
                    touch: n(156),
                    selection: n(157)
                },
                l = n(158);
            t.exports = function(t, e) {
                e = "object" == typeof e ? e : {}, o.add(t, "ps-container");
                var n = r.add(t);
                n.settings = i.extend(n.settings, e), o.add(t, "ps-theme-" + n.settings.theme), n.settings.handlers.forEach((function(e) {
                    a[e](t)
                })), l(t), s(t)
            }
        }, (t, e, n) => {
            "use strict";
            var i = n(142),
                o = n(143),
                r = n(144),
                s = n(145),
                a = n(151);

            function l(t, e) {
                return t.settings.minScrollbarLength && (e = Math.max(e, t.settings.minScrollbarLength)), t.settings.maxScrollbarLength && (e = Math.min(e, t.settings.maxScrollbarLength)), e
            }
            t.exports = function(t) {
                var e, n = s.get(t);
                n.containerWidth = t.clientWidth, n.containerHeight = t.clientHeight, n.contentWidth = t.scrollWidth, n.contentHeight = t.scrollHeight, t.contains(n.scrollbarXRail) || ((e = r.queryChildren(t, ".ps-scrollbar-x-rail")).length > 0 && e.forEach((function(t) {
                        r.remove(t)
                    })), r.appendTo(n.scrollbarXRail, t)), t.contains(n.scrollbarYRail) || ((e = r.queryChildren(t, ".ps-scrollbar-y-rail")).length > 0 && e.forEach((function(t) {
                        r.remove(t)
                    })), r.appendTo(n.scrollbarYRail, t)), !n.settings.suppressScrollX && n.containerWidth + n.settings.scrollXMarginOffset < n.contentWidth ? (n.scrollbarXActive = !0, n.railXWidth = n.containerWidth - n.railXMarginWidth, n.railXRatio = n.containerWidth / n.railXWidth, n.scrollbarXWidth = l(n, i.toInt(n.railXWidth * n.containerWidth / n.contentWidth)), n.scrollbarXLeft = i.toInt((n.negativeScrollAdjustment + t.scrollLeft) * (n.railXWidth - n.scrollbarXWidth) / (n.contentWidth - n.containerWidth))) : n.scrollbarXActive = !1, !n.settings.suppressScrollY && n.containerHeight + n.settings.scrollYMarginOffset < n.contentHeight ? (n.scrollbarYActive = !0, n.railYHeight = n.containerHeight - n.railYMarginHeight, n.railYRatio = n.containerHeight / n.railYHeight, n.scrollbarYHeight = l(n, i.toInt(n.railYHeight * n.containerHeight / n.contentHeight)), n.scrollbarYTop = i.toInt(t.scrollTop * (n.railYHeight - n.scrollbarYHeight) / (n.contentHeight - n.containerHeight))) : n.scrollbarYActive = !1, n.scrollbarXLeft >= n.railXWidth - n.scrollbarXWidth && (n.scrollbarXLeft = n.railXWidth - n.scrollbarXWidth), n.scrollbarYTop >= n.railYHeight - n.scrollbarYHeight && (n.scrollbarYTop = n.railYHeight - n.scrollbarYHeight),
                    function(t, e) {
                        var n = {
                            width: e.railXWidth
                        };
                        e.isRtl ? n.left = e.negativeScrollAdjustment + t.scrollLeft + e.containerWidth - e.contentWidth : n.left = t.scrollLeft, e.isScrollbarXUsingBottom ? n.bottom = e.scrollbarXBottom - t.scrollTop : n.top = e.scrollbarXTop + t.scrollTop, r.css(e.scrollbarXRail, n);
                        var i = {
                            top: t.scrollTop,
                            height: e.railYHeight
                        };
                        e.isScrollbarYUsingRight ? e.isRtl ? i.right = e.contentWidth - (e.negativeScrollAdjustment + t.scrollLeft) - e.scrollbarYRight - e.scrollbarYOuterWidth : i.right = e.scrollbarYRight - t.scrollLeft : e.isRtl ? i.left = e.negativeScrollAdjustment + t.scrollLeft + 2 * e.containerWidth - e.contentWidth - e.scrollbarYLeft - e.scrollbarYOuterWidth : i.left = e.scrollbarYLeft + t.scrollLeft, r.css(e.scrollbarYRail, i), r.css(e.scrollbarX, {
                            left: e.scrollbarXLeft,
                            width: e.scrollbarXWidth - e.railBorderXWidth
                        }), r.css(e.scrollbarY, {
                            top: e.scrollbarYTop,
                            height: e.scrollbarYHeight - e.railBorderYWidth
                        })
                    }(t, n), n.scrollbarXActive ? o.add(t, "ps-active-x") : (o.remove(t, "ps-active-x"), n.scrollbarXWidth = 0, n.scrollbarXLeft = 0, a(t, "left", 0)), n.scrollbarYActive ? o.add(t, "ps-active-y") : (o.remove(t, "ps-active-y"), n.scrollbarYHeight = 0, n.scrollbarYTop = 0, a(t, "top", 0))
            }
        }, (t, e, n) => {
            "use strict";
            var i, o, r = n(145),
                s = function(t) {
                    var e = document.createEvent("Event");
                    return e.initEvent(t, !0, !0), e
                };
            t.exports = function(t, e, n) {
                if (void 0 === t) throw "You must provide an element to the update-scroll function";
                if (void 0 === e) throw "You must provide an axis to the update-scroll function";
                if (void 0 === n) throw "You must provide a value to the update-scroll function";
                "top" === e && n <= 0 && (t.scrollTop = n = 0, t.dispatchEvent(s("ps-y-reach-start"))), "left" === e && n <= 0 && (t.scrollLeft = n = 0, t.dispatchEvent(s("ps-x-reach-start")));
                var a = r.get(t);
                "top" === e && n >= a.contentHeight - a.containerHeight && ((n = a.contentHeight - a.containerHeight) - t.scrollTop <= 1 ? n = t.scrollTop : t.scrollTop = n, t.dispatchEvent(s("ps-y-reach-end"))), "left" === e && n >= a.contentWidth - a.containerWidth && ((n = a.contentWidth - a.containerWidth) - t.scrollLeft <= 1 ? n = t.scrollLeft : t.scrollLeft = n, t.dispatchEvent(s("ps-x-reach-end"))), i || (i = t.scrollTop), o || (o = t.scrollLeft), "top" === e && n < i && t.dispatchEvent(s("ps-scroll-up")), "top" === e && n > i && t.dispatchEvent(s("ps-scroll-down")), "left" === e && n < o && t.dispatchEvent(s("ps-scroll-left")), "left" === e && n > o && t.dispatchEvent(s("ps-scroll-right")), "top" === e && (t.scrollTop = i = n, t.dispatchEvent(s("ps-scroll-y"))), "left" === e && (t.scrollLeft = o = n, t.dispatchEvent(s("ps-scroll-x")))
            }
        }, (t, e, n) => {
            "use strict";
            var i = n(145),
                o = n(150),
                r = n(151);
            t.exports = function(t) {
                ! function(t, e) {
                    function n(t) {
                        return t.getBoundingClientRect()
                    }
                    var i = function(t) {
                        t.stopPropagation()
                    };
                    e.event.bind(e.scrollbarY, "click", i), e.event.bind(e.scrollbarYRail, "click", (function(i) {
                        var s = i.pageY - window.pageYOffset - n(e.scrollbarYRail).top > e.scrollbarYTop ? 1 : -1;
                        r(t, "top", t.scrollTop + s * e.containerHeight), o(t), i.stopPropagation()
                    })), e.event.bind(e.scrollbarX, "click", i), e.event.bind(e.scrollbarXRail, "click", (function(i) {
                        var s = i.pageX - window.pageXOffset - n(e.scrollbarXRail).left > e.scrollbarXLeft ? 1 : -1;
                        r(t, "left", t.scrollLeft + s * e.containerWidth), o(t), i.stopPropagation()
                    }))
                }(t, i.get(t))
            }
        }, (t, e, n) => {
            "use strict";
            var i = n(142),
                o = n(144),
                r = n(145),
                s = n(150),
                a = n(151);

            function l(t, e) {
                var n = null,
                    r = null;
                var l = function(o) {
                        ! function(o) {
                            var r = n + o * e.railXRatio,
                                s = Math.max(0, e.scrollbarXRail.getBoundingClientRect().left) + e.railXRatio * (e.railXWidth - e.scrollbarXWidth);
                            e.scrollbarXLeft = r < 0 ? 0 : r > s ? s : r;
                            var l = i.toInt(e.scrollbarXLeft * (e.contentWidth - e.containerWidth) / (e.containerWidth - e.railXRatio * e.scrollbarXWidth)) - e.negativeScrollAdjustment;
                            a(t, "left", l)
                        }(o.pageX - r), s(t), o.stopPropagation(), o.preventDefault()
                    },
                    d = function() {
                        i.stopScrolling(t, "x"), e.event.unbind(e.ownerDocument, "mousemove", l)
                    };
                e.event.bind(e.scrollbarX, "mousedown", (function(s) {
                    r = s.pageX, n = i.toInt(o.css(e.scrollbarX, "left")) * e.railXRatio, i.startScrolling(t, "x"), e.event.bind(e.ownerDocument, "mousemove", l), e.event.once(e.ownerDocument, "mouseup", d), s.stopPropagation(), s.preventDefault()
                }))
            }

            function d(t, e) {
                var n = null,
                    r = null;
                var l = function(o) {
                        ! function(o) {
                            var r = n + o * e.railYRatio,
                                s = Math.max(0, e.scrollbarYRail.getBoundingClientRect().top) + e.railYRatio * (e.railYHeight - e.scrollbarYHeight);
                            e.scrollbarYTop = r < 0 ? 0 : r > s ? s : r;
                            var l = i.toInt(e.scrollbarYTop * (e.contentHeight - e.containerHeight) / (e.containerHeight - e.railYRatio * e.scrollbarYHeight));
                            a(t, "top", l)
                        }(o.pageY - r), s(t), o.stopPropagation(), o.preventDefault()
                    },
                    d = function() {
                        i.stopScrolling(t, "y"), e.event.unbind(e.ownerDocument, "mousemove", l)
                    };
                e.event.bind(e.scrollbarY, "mousedown", (function(s) {
                    r = s.pageY, n = i.toInt(o.css(e.scrollbarY, "top")) * e.railYRatio, i.startScrolling(t, "y"), e.event.bind(e.ownerDocument, "mousemove", l), e.event.once(e.ownerDocument, "mouseup", d), s.stopPropagation(), s.preventDefault()
                }))
            }
            t.exports = function(t) {
                var e = r.get(t);
                l(t, e), d(t, e)
            }
        }, (t, e, n) => {
            "use strict";
            var i = n(142),
                o = n(144),
                r = n(145),
                s = n(150),
                a = n(151);

            function l(t, e) {
                var n = !1;
                e.event.bind(t, "mouseenter", (function() {
                    n = !0
                })), e.event.bind(t, "mouseleave", (function() {
                    n = !1
                }));
                var r = !1;
                e.event.bind(e.ownerDocument, "keydown", (function(l) {
                    if (!(l.isDefaultPrevented && l.isDefaultPrevented() || l.defaultPrevented)) {
                        var d = o.matches(e.scrollbarX, ":focus") || o.matches(e.scrollbarY, ":focus");
                        if (n || d) {
                            var c = document.activeElement ? document.activeElement : e.ownerDocument.activeElement;
                            if (c) {
                                if ("IFRAME" === c.tagName) c = c.contentDocument.activeElement;
                                else
                                    for (; c.shadowRoot && c.shadowRoot.activeElement;) c = c.shadowRoot.activeElement;
                                if (i.isEditable(c)) return
                            }
                            var u = 0,
                                p = 0;
                            switch (l.which) {
                                case 37:
                                    u = l.metaKey ? -e.contentWidth : l.altKey ? -e.containerWidth : -30;
                                    break;
                                case 38:
                                    p = l.metaKey ? e.contentHeight : l.altKey ? e.containerHeight : 30;
                                    break;
                                case 39:
                                    u = l.metaKey ? e.contentWidth : l.altKey ? e.containerWidth : 30;
                                    break;
                                case 40:
                                    p = l.metaKey ? -e.contentHeight : l.altKey ? -e.containerHeight : -30;
                                    break;
                                case 33:
                                    p = 90;
                                    break;
                                case 32:
                                    p = l.shiftKey ? 90 : -90;
                                    break;
                                case 34:
                                    p = -90;
                                    break;
                                case 35:
                                    p = l.ctrlKey ? -e.contentHeight : -e.containerHeight;
                                    break;
                                case 36:
                                    p = l.ctrlKey ? t.scrollTop : e.containerHeight;
                                    break;
                                default:
                                    return
                            }
                            a(t, "top", t.scrollTop - p), a(t, "left", t.scrollLeft + u), s(t), r = function(n, i) {
                                var o = t.scrollTop;
                                if (0 === n) {
                                    if (!e.scrollbarYActive) return !1;
                                    if (0 === o && i > 0 || o >= e.contentHeight - e.containerHeight && i < 0) return !e.settings.wheelPropagation
                                }
                                var r = t.scrollLeft;
                                if (0 === i) {
                                    if (!e.scrollbarXActive) return !1;
                                    if (0 === r && n < 0 || r >= e.contentWidth - e.containerWidth && n > 0) return !e.settings.wheelPropagation
                                }
                                return !0
                            }(u, p), r && l.preventDefault()
                        }
                    }
                }))
            }
            t.exports = function(t) {
                l(t, r.get(t))
            }
        }, (t, e, n) => {
            "use strict";
            var i = n(145),
                o = n(150),
                r = n(151);

            function s(t, e) {
                var n = !1;

                function i(i) {
                    var s = function(t) {
                            var e = t.deltaX,
                                n = -1 * t.deltaY;
                            return void 0 !== e && void 0 !== n || (e = -1 * t.wheelDeltaX / 6, n = t.wheelDeltaY / 6), t.deltaMode && 1 === t.deltaMode && (e *= 10, n *= 10), e != e && n != n && (e = 0, n = t.wheelDelta), t.shiftKey ? [-n, -e] : [e, n]
                        }(i),
                        a = s[0],
                        l = s[1];
                    (function(e, n) {
                        var i = t.querySelector("textarea:hover, select[multiple]:hover, .ps-child:hover");
                        if (i) {
                            if (!window.getComputedStyle(i).overflow.match(/(scroll|auto)/)) return !1;
                            var o = i.scrollHeight - i.clientHeight;
                            if (o > 0 && !(0 === i.scrollTop && n > 0 || i.scrollTop === o && n < 0)) return !0;
                            var r = i.scrollLeft - i.clientWidth;
                            if (r > 0 && !(0 === i.scrollLeft && e < 0 || i.scrollLeft === r && e > 0)) return !0
                        }
                        return !1
                    })(a, l) || (n = !1, e.settings.useBothWheelAxes ? e.scrollbarYActive && !e.scrollbarXActive ? (r(t, "top", l ? t.scrollTop - l * e.settings.wheelSpeed : t.scrollTop + a * e.settings.wheelSpeed), n = !0) : e.scrollbarXActive && !e.scrollbarYActive && (r(t, "left", a ? t.scrollLeft + a * e.settings.wheelSpeed : t.scrollLeft - l * e.settings.wheelSpeed), n = !0) : (r(t, "top", t.scrollTop - l * e.settings.wheelSpeed), r(t, "left", t.scrollLeft + a * e.settings.wheelSpeed)), o(t), n = n || function(n, i) {
                        var o = t.scrollTop;
                        if (0 === n) {
                            if (!e.scrollbarYActive) return !1;
                            if (0 === o && i > 0 || o >= e.contentHeight - e.containerHeight && i < 0) return !e.settings.wheelPropagation
                        }
                        var r = t.scrollLeft;
                        if (0 === i) {
                            if (!e.scrollbarXActive) return !1;
                            if (0 === r && n < 0 || r >= e.contentWidth - e.containerWidth && n > 0) return !e.settings.wheelPropagation
                        }
                        return !0
                    }(a, l), n && (i.stopPropagation(), i.preventDefault()))
                }
                void 0 !== window.onwheel ? e.event.bind(t, "wheel", i) : void 0 !== window.onmousewheel && e.event.bind(t, "mousewheel", i)
            }
            t.exports = function(t) {
                s(t, i.get(t))
            }
        }, (t, e, n) => {
            "use strict";
            var i = n(142),
                o = n(145),
                r = n(150),
                s = n(151);

            function a(t, e, n, i) {
                function a(e, n) {
                    s(t, "top", t.scrollTop - n), s(t, "left", t.scrollLeft - e), r(t)
                }
                var l = {},
                    d = 0,
                    c = {},
                    u = null,
                    p = !1,
                    h = !1;

                function m() {
                    p = !0
                }

                function g() {
                    p = !1
                }

                function f(t) {
                    return t.targetTouches ? t.targetTouches[0] : t
                }

                function b(t) {
                    return !(!t.targetTouches || 1 !== t.targetTouches.length) || !(!t.pointerType || "mouse" === t.pointerType || t.pointerType === t.MSPOINTER_TYPE_MOUSE)
                }

                function A(t) {
                    if (b(t)) {
                        h = !0;
                        var e = f(t);
                        l.pageX = e.pageX, l.pageY = e.pageY, d = (new Date).getTime(), null !== u && clearInterval(u), t.stopPropagation()
                    }
                }

                function v(n) {
                    if (!h && e.settings.swipePropagation && A(n), !p && h && b(n)) {
                        var i = f(n),
                            o = {
                                pageX: i.pageX,
                                pageY: i.pageY
                            },
                            r = o.pageX - l.pageX,
                            s = o.pageY - l.pageY;
                        a(r, s), l = o;
                        var u = (new Date).getTime(),
                            m = u - d;
                        m > 0 && (c.x = r / m, c.y = s / m, d = u),
                            function(n, i) {
                                var o = t.scrollTop,
                                    r = t.scrollLeft,
                                    s = Math.abs(n),
                                    a = Math.abs(i);
                                if (a > s) {
                                    if (i < 0 && o === e.contentHeight - e.containerHeight || i > 0 && 0 === o) return !e.settings.swipePropagation
                                } else if (s > a && (n < 0 && r === e.contentWidth - e.containerWidth || n > 0 && 0 === r)) return !e.settings.swipePropagation;
                                return !0
                            }(r, s) && (n.stopPropagation(), n.preventDefault())
                    }
                }

                function y() {
                    !p && h && (h = !1, clearInterval(u), u = setInterval((function() {
                        o.get(t) && (c.x || c.y) ? Math.abs(c.x) < .01 && Math.abs(c.y) < .01 ? clearInterval(u) : (a(30 * c.x, 30 * c.y), c.x *= .8, c.y *= .8) : clearInterval(u)
                    }), 10))
                }
                n ? (e.event.bind(window, "touchstart", m), e.event.bind(window, "touchend", g), e.event.bind(t, "touchstart", A), e.event.bind(t, "touchmove", v), e.event.bind(t, "touchend", y)) : i && (window.PointerEvent ? (e.event.bind(window, "pointerdown", m), e.event.bind(window, "pointerup", g), e.event.bind(t, "pointerdown", A), e.event.bind(t, "pointermove", v), e.event.bind(t, "pointerup", y)) : window.MSPointerEvent && (e.event.bind(window, "MSPointerDown", m), e.event.bind(window, "MSPointerUp", g), e.event.bind(t, "MSPointerDown", A), e.event.bind(t, "MSPointerMove", v), e.event.bind(t, "MSPointerUp", y)))
            }
            t.exports = function(t) {
                (i.env.supportsTouch || i.env.supportsIePointer) && a(t, o.get(t), i.env.supportsTouch, i.env.supportsIePointer)
            }
        }, (t, e, n) => {
            "use strict";
            var i = n(142),
                o = n(145),
                r = n(150),
                s = n(151);

            function a(t, e) {
                var n = null,
                    a = {
                        top: 0,
                        left: 0
                    };

                function l() {
                    n && (clearInterval(n), n = null), i.stopScrolling(t)
                }
                var d = !1;
                e.event.bind(e.ownerDocument, "selectionchange", (function() {
                    var e;
                    t.contains(0 === (e = window.getSelection ? window.getSelection() : document.getSelection ? document.getSelection() : "").toString().length ? null : e.getRangeAt(0).commonAncestorContainer) ? d = !0 : (d = !1, l())
                })), e.event.bind(window, "mouseup", (function() {
                    d && (d = !1, l())
                })), e.event.bind(window, "keyup", (function() {
                    d && (d = !1, l())
                })), e.event.bind(window, "mousemove", (function(e) {
                    if (d) {
                        var c = {
                                x: e.pageX,
                                y: e.pageY
                            },
                            u = {
                                left: t.offsetLeft,
                                right: t.offsetLeft + t.offsetWidth,
                                top: t.offsetTop,
                                bottom: t.offsetTop + t.offsetHeight
                            };
                        c.x < u.left + 3 ? (a.left = -5, i.startScrolling(t, "x")) : c.x > u.right - 3 ? (a.left = 5, i.startScrolling(t, "x")) : a.left = 0, c.y < u.top + 3 ? (a.top = u.top + 3 - c.y < 5 ? -5 : -20, i.startScrolling(t, "y")) : c.y > u.bottom - 3 ? (a.top = c.y - u.bottom + 3 < 5 ? 5 : 20, i.startScrolling(t, "y")) : a.top = 0, 0 === a.top && 0 === a.left ? l() : n || (n = setInterval((function() {
                            o.get(t) ? (s(t, "top", t.scrollTop + a.top), s(t, "left", t.scrollLeft + a.left), r(t)) : clearInterval(n)
                        }), 50))
                    }
                }))
            }
            t.exports = function(t) {
                a(t, o.get(t))
            }
        }, (t, e, n) => {
            "use strict";
            var i = n(145),
                o = n(150);
            t.exports = function(t) {
                ! function(t, e) {
                    e.event.bind(t, "scroll", (function() {
                        o(t)
                    }))
                }(t, i.get(t))
            }
        }, (t, e, n) => {
            "use strict";
            var i = n(142),
                o = n(144),
                r = n(145),
                s = n(150),
                a = n(151);
            t.exports = function(t) {
                var e = r.get(t);
                e && (e.negativeScrollAdjustment = e.isNegativeScroll ? t.scrollWidth - t.clientWidth : 0, o.css(e.scrollbarXRail, "display", "block"), o.css(e.scrollbarYRail, "display", "block"), e.railXMarginWidth = i.toInt(o.css(e.scrollbarXRail, "marginLeft")) + i.toInt(o.css(e.scrollbarXRail, "marginRight")), e.railYMarginHeight = i.toInt(o.css(e.scrollbarYRail, "marginTop")) + i.toInt(o.css(e.scrollbarYRail, "marginBottom")), o.css(e.scrollbarXRail, "display", "none"), o.css(e.scrollbarYRail, "display", "none"), s(t), a(t, "top", t.scrollTop), a(t, "left", t.scrollLeft), o.css(e.scrollbarXRail, "display", ""), o.css(e.scrollbarYRail, "display", ""))
            }
        }, (t, e, n) => {
            "use strict";
            n.r(e), n.d(e, {
                default: () => i
            });
            const i = "/* perfect-scrollbar v0.6.16 */\r\n.ps-container{-ms-touch-action:auto;touch-action:auto;overflow:hidden !important;-ms-overflow-style:none}@supports (-ms-overflow-style: none){.ps-container{overflow:auto !important}}@media screen and (-ms-high-contrast: active), (-ms-high-contrast: none){.ps-container{overflow:auto !important}}.ps-container.ps-active-x>.ps-scrollbar-x-rail,.ps-container.ps-active-y>.ps-scrollbar-y-rail{display:block;background-color:transparent}.ps-container.ps-in-scrolling.ps-x>.ps-scrollbar-x-rail{background-color:#eee;opacity:.9}.ps-container.ps-in-scrolling.ps-x>.ps-scrollbar-x-rail>.ps-scrollbar-x{background-color:#999;height:11px}.ps-container.ps-in-scrolling.ps-y>.ps-scrollbar-y-rail{background-color:#eee;opacity:.9}.ps-container.ps-in-scrolling.ps-y>.ps-scrollbar-y-rail>.ps-scrollbar-y{background-color:#999;width:11px}.ps-container>.ps-scrollbar-x-rail{display:none;position:absolute;opacity:0;-webkit-transition:background-color .2s linear, opacity .2s linear;-o-transition:background-color .2s linear, opacity .2s linear;-moz-transition:background-color .2s linear, opacity .2s linear;transition:background-color .2s linear, opacity .2s linear;bottom:0px;height:15px}.ps-container>.ps-scrollbar-x-rail>.ps-scrollbar-x{position:absolute;background-color:#aaa;-webkit-border-radius:6px;-moz-border-radius:6px;border-radius:6px;-webkit-transition:background-color .2s linear, height .2s linear, width .2s ease-in-out, -webkit-border-radius .2s ease-in-out;transition:background-color .2s linear, height .2s linear, width .2s ease-in-out, -webkit-border-radius .2s ease-in-out;-o-transition:background-color .2s linear, height .2s linear, width .2s ease-in-out, border-radius .2s ease-in-out;-moz-transition:background-color .2s linear, height .2s linear, width .2s ease-in-out, border-radius .2s ease-in-out, -moz-border-radius .2s ease-in-out;transition:background-color .2s linear, height .2s linear, width .2s ease-in-out, border-radius .2s ease-in-out;transition:background-color .2s linear, height .2s linear, width .2s ease-in-out, border-radius .2s ease-in-out, -webkit-border-radius .2s ease-in-out, -moz-border-radius .2s ease-in-out;bottom:2px;height:6px}.ps-container>.ps-scrollbar-x-rail:hover>.ps-scrollbar-x,.ps-container>.ps-scrollbar-x-rail:active>.ps-scrollbar-x{height:11px}.ps-container>.ps-scrollbar-y-rail{display:none;position:absolute;opacity:0;-webkit-transition:background-color .2s linear, opacity .2s linear;-o-transition:background-color .2s linear, opacity .2s linear;-moz-transition:background-color .2s linear, opacity .2s linear;transition:background-color .2s linear, opacity .2s linear;right:0;width:15px}.ps-container>.ps-scrollbar-y-rail>.ps-scrollbar-y{position:absolute;background-color:#aaa;-webkit-border-radius:6px;-moz-border-radius:6px;border-radius:6px;-webkit-transition:background-color .2s linear, height .2s linear, width .2s ease-in-out, -webkit-border-radius .2s ease-in-out;transition:background-color .2s linear, height .2s linear, width .2s ease-in-out, -webkit-border-radius .2s ease-in-out;-o-transition:background-color .2s linear, height .2s linear, width .2s ease-in-out, border-radius .2s ease-in-out;-moz-transition:background-color .2s linear, height .2s linear, width .2s ease-in-out, border-radius .2s ease-in-out, -moz-border-radius .2s ease-in-out;transition:background-color .2s linear, height .2s linear, width .2s ease-in-out, border-radius .2s ease-in-out;transition:background-color .2s linear, height .2s linear, width .2s ease-in-out, border-radius .2s ease-in-out, -webkit-border-radius .2s ease-in-out, -moz-border-radius .2s ease-in-out;right:2px;width:6px}.ps-container>.ps-scrollbar-y-rail:hover>.ps-scrollbar-y,.ps-container>.ps-scrollbar-y-rail:active>.ps-scrollbar-y{width:11px}.ps-container:hover.ps-in-scrolling.ps-x>.ps-scrollbar-x-rail{background-color:#eee;opacity:.9}.ps-container:hover.ps-in-scrolling.ps-x>.ps-scrollbar-x-rail>.ps-scrollbar-x{background-color:#999;height:11px}.ps-container:hover.ps-in-scrolling.ps-y>.ps-scrollbar-y-rail{background-color:#eee;opacity:.9}.ps-container:hover.ps-in-scrolling.ps-y>.ps-scrollbar-y-rail>.ps-scrollbar-y{background-color:#999;width:11px}.ps-container:hover>.ps-scrollbar-x-rail,.ps-container:hover>.ps-scrollbar-y-rail{opacity:.6}.ps-container:hover>.ps-scrollbar-x-rail:hover{background-color:#eee;opacity:.9}.ps-container:hover>.ps-scrollbar-x-rail:hover>.ps-scrollbar-x{background-color:#999}.ps-container:hover>.ps-scrollbar-y-rail:hover{background-color:#eee;opacity:.9}.ps-container:hover>.ps-scrollbar-y-rail:hover>.ps-scrollbar-y{background-color:#999}\r\n"
        }, t => {
            function e(t) {
                var e = t.target || t.srcElement;
                e.__resizeRAF__ && cancelAnimationFrame(e.__resizeRAF__), e.__resizeRAF__ = requestAnimationFrame((function() {
                    var n = e.__resizeTrigger__,
                        i = n && n.__resizeListeners__;
                    i && i.forEach((function(e) {
                        e.call(n, t)
                    }))
                }))
            }
            var n = function(t, n) {
                var i, o = this.document,
                    r = o.attachEvent;
                if ("undefined" != typeof navigator && (i = navigator.userAgent.match(/Trident/) || navigator.userAgent.match(/Edge/)), !t.__resizeListeners__)
                    if (t.__resizeListeners__ = [], r) t.__resizeTrigger__ = t, t.attachEvent("onresize", e);
                    else {
                        "static" === getComputedStyle(t).position && (t.style.position = "relative");
                        var s = t.__resizeTrigger__ = o.createElement("object");
                        s.setAttribute("style", "position: absolute; top: 0; left: 0; height: 100%; width: 100%; pointer-events: none; z-index: -1; opacity: 0;"), s.setAttribute("class", "resize-sensor"), s.setAttribute("tabindex", "-1"), s.__resizeElement__ = t, s.onload = function() {
                            this.contentDocument.defaultView.__resizeTrigger__ = this.__resizeElement__, this.contentDocument.defaultView.addEventListener("resize", e)
                        }, s.type = "text/html", i && t.appendChild(s), s.data = "about:blank", i || t.appendChild(s)
                    } t.__resizeListeners__.push(n)
            };
            t.exports = "undefined" == typeof window ? n : n.bind(window), t.exports.unbind = function(t, n) {
                var i = document.attachEvent,
                    o = t.__resizeListeners__ || [];
                if (n) {
                    var r = o.indexOf(n); - 1 !== r && o.splice(r, 1)
                } else o = t.__resizeListeners__ = [];
                if (!o.length) {
                    if (i) t.detachEvent("onresize", e);
                    else if (t.__resizeTrigger__) {
                        var s = t.__resizeTrigger__.contentDocument,
                            a = s && s.defaultView;
                        a && (a.removeEventListener("resize", e), delete a.__resizeTrigger__), t.__resizeTrigger__ = !t.removeChild(t.__resizeTrigger__)
                    }
                    delete t.__resizeListeners__
                }
            }
        }, t => {
            "use strict";
            t.exports = '<template>\r\n  <div class="wrapper use-for-higher-specificity">\r\n    <div class="inner-wrapper">\r\n      <slot></slot>\r\n    </div>\r\n  </div>\r\n</template>\r\n'
        }, (t, e, n) => {
            var i = n(9),
                o = n(10)(i);
            o.push([t.id, ":host {\n  display: flex;\n  flex-direction: column;\n}\n.wrapper {\n  flex: 1;\n  position: relative;\n}\n.ps-container .ps-scrollbar-y-rail .ps-scrollbar-y {\n  background-color: #785a28;\n  margin-right: 2px;\n  border: thin solid #000;\n}\n.ps-container.ps-in-scrolling.ps-y > .ps-scrollbar-y-rail {\n  background-color: transparent;\n}\n.ps-container.ps-in-scrolling.ps-y > .ps-scrollbar-y-rail > .ps-scrollbar-y {\n  background-color: #463714;\n}\n.ps-container:hover.ps-in-scrolling.ps-y > .ps-scrollbar-y-rail {\n  background-color: transparent;\n}\n.ps-container:hover.ps-in-scrolling.ps-y > .ps-scrollbar-y-rail > .ps-scrollbar-y {\n  background-color: #cdbe91;\n}\n.ps-container:hover > .ps-scrollbar-y-rail:hover {\n  background-color: transparent;\n}\n.ps-container:hover > .ps-scrollbar-y-rail:hover > .ps-scrollbar-y {\n  background-color: #cdbe91;\n}\n.ps-scrollbar-y-rail {\n  margin: 5px 0;\n}\n:host .wrapper .inner-wrapper {\n  overflow: hidden;\n}\n:host .wrapper.ps-container.ps-theme-default.use-for-higher-specificity .ps-scrollbar-y-rail .ps-scrollbar-y,\n:host .wrapper.ps-container.ps-theme-default.use-for-higher-specificity .ps-scrollbar-y-rail .ps-scrollbar-y:hover,\n:host .wrapper.ps-container.ps-theme-default.use-for-higher-specificity .ps-scrollbar-y-rail,\n:host .wrapper.ps-container.ps-theme-default.use-for-higher-specificity .ps-scrollbar-y-rail:hover,\n:host .wrapper.ps-container.ps-theme-default.use-for-higher-specificity .ps-scrollbar-y-rail .ps__scrollbar-y,\n:host .wrapper.ps-container.ps-theme-default.use-for-higher-specificity .ps-scrollbar-y-rail:hover .ps__scrollbar-y,\n:host .wrapper.ps-container.ps-theme-default.use-for-higher-specificity.ps--in-scrolling.ps--y .ps-scrollbar-y-rail .ps-scrollbar-y,\n:host .wrapper.ps-container.ps-theme-default.use-for-higher-specificity.ps--in-scrolling.ps--y .ps-scrollbar-y-rail .ps-scrollbar-y:hover,\n:host .wrapper.ps-container.ps-theme-default.use-for-higher-specificity.ps--in-scrolling.ps--y .ps-scrollbar-y-rail:hover .ps-scrollbar-y,\n:host .wrapper.ps-container.ps-theme-default.use-for-higher-specificity.ps--in-scrolling.ps--y .ps-scrollbar-y-rail:hover .ps-scrollbar-y:hover,\n:host .wrapper.ps-container.ps-theme-default.use-for-higher-specificity:hover .ps-scrollbar-y-rail .ps-scrollbar-y,\n:host .wrapper.ps-container.ps-theme-default.use-for-higher-specificity:hover .ps-scrollbar-y-rail .ps-scrollbar-y:hover,\n:host .wrapper.ps-container.ps-theme-default.use-for-higher-specificity:hover .ps-scrollbar-y-rail:hover .ps-scrollbar-y,\n:host .wrapper.ps-container.ps-theme-default.use-for-higher-specificity:hover .ps-scrollbar-y-rail:hover .ps-scrollbar-y:hover,\n:host .wrapper.ps-container.ps-theme-default.use-for-higher-specificity:hover.ps--in-scrolling.ps--y .ps-scrollbar-y-rail .ps-scrollbar-y,\n:host .wrapper.ps-container.ps-theme-default.use-for-higher-specificity:hover.ps--in-scrolling.ps--y .ps-scrollbar-y-rail .ps-scrollbar-y:hover,\n:host .wrapper.ps-container.ps-theme-default.use-for-higher-specificity:hover.ps--in-scrolling.ps--y .ps-scrollbar-y-rail:hover .ps-scrollbar-y,\n:host .wrapper.ps-container.ps-theme-default.use-for-higher-specificity:hover.ps--in-scrolling.ps--y .ps-scrollbar-y-rail:hover .ps-scrollbar-y:hover {\n  width: 4px;\n  opacity: 1;\n  right: 2px;\n}\n:host .wrapper.ps-container.ps-theme-default.use-for-higher-specificity .ps-scrollbar-y-rail .ps-scrollbar-y:lang(ar-ae),\n:host .wrapper.ps-container.ps-theme-default.use-for-higher-specificity .ps-scrollbar-y-rail .ps-scrollbar-y:hover:lang(ar-ae),\n:host .wrapper.ps-container.ps-theme-default.use-for-higher-specificity .ps-scrollbar-y-rail:lang(ar-ae),\n:host .wrapper.ps-container.ps-theme-default.use-for-higher-specificity .ps-scrollbar-y-rail:hover:lang(ar-ae),\n:host .wrapper.ps-container.ps-theme-default.use-for-higher-specificity .ps-scrollbar-y-rail .ps__scrollbar-y:lang(ar-ae),\n:host .wrapper.ps-container.ps-theme-default.use-for-higher-specificity .ps-scrollbar-y-rail:hover .ps__scrollbar-y:lang(ar-ae),\n:host .wrapper.ps-container.ps-theme-default.use-for-higher-specificity.ps--in-scrolling.ps--y .ps-scrollbar-y-rail .ps-scrollbar-y:lang(ar-ae),\n:host .wrapper.ps-container.ps-theme-default.use-for-higher-specificity.ps--in-scrolling.ps--y .ps-scrollbar-y-rail .ps-scrollbar-y:hover:lang(ar-ae),\n:host .wrapper.ps-container.ps-theme-default.use-for-higher-specificity.ps--in-scrolling.ps--y .ps-scrollbar-y-rail:hover .ps-scrollbar-y:lang(ar-ae),\n:host .wrapper.ps-container.ps-theme-default.use-for-higher-specificity.ps--in-scrolling.ps--y .ps-scrollbar-y-rail:hover .ps-scrollbar-y:hover:lang(ar-ae),\n:host .wrapper.ps-container.ps-theme-default.use-for-higher-specificity:hover .ps-scrollbar-y-rail .ps-scrollbar-y:lang(ar-ae),\n:host .wrapper.ps-container.ps-theme-default.use-for-higher-specificity:hover .ps-scrollbar-y-rail .ps-scrollbar-y:hover:lang(ar-ae),\n:host .wrapper.ps-container.ps-theme-default.use-for-higher-specificity:hover .ps-scrollbar-y-rail:hover .ps-scrollbar-y:lang(ar-ae),\n:host .wrapper.ps-container.ps-theme-default.use-for-higher-specificity:hover .ps-scrollbar-y-rail:hover .ps-scrollbar-y:hover:lang(ar-ae),\n:host .wrapper.ps-container.ps-theme-default.use-for-higher-specificity:hover.ps--in-scrolling.ps--y .ps-scrollbar-y-rail .ps-scrollbar-y:lang(ar-ae),\n:host .wrapper.ps-container.ps-theme-default.use-for-higher-specificity:hover.ps--in-scrolling.ps--y .ps-scrollbar-y-rail .ps-scrollbar-y:hover:lang(ar-ae),\n:host .wrapper.ps-container.ps-theme-default.use-for-higher-specificity:hover.ps--in-scrolling.ps--y .ps-scrollbar-y-rail:hover .ps-scrollbar-y:lang(ar-ae),\n:host .wrapper.ps-container.ps-theme-default.use-for-higher-specificity:hover.ps--in-scrolling.ps--y .ps-scrollbar-y-rail:hover .ps-scrollbar-y:hover:lang(ar-ae) {\n  right: auto;\n  left: 2px;\n}\n", ""]), t.exports = o
        }, (t, e, n) => {
            "use strict";
            Object.defineProperty(e, "__esModule", {
                value: !0
            }), e.default = void 0;
            var i, o = n(1),
                r = (i = n(165)) && i.__esModule ? i : {
                    default: i
                };
            const {
                RenderMode: s,
                PlayerNameComputer: a
            } = o.playerNameComponentLogic, l = {
                BATCH: "batch",
                FORMAT: "format",
                PUUID: "puuid",
                SUMMONER_ID: "summoner-id",
                SUMMONER_NAME: "summoner-name",
                GAME_NAME: "game-name",
                TAG_LINE: "tag-line",
                RENDER_MODE_OVERRIDE: "render-mode",
                RENDER_ALIAS_OVERRIDE: "render-alias"
            }, d = Object.values(l), c = "player-name__game-name", u = "player-name__tag-line", p = "player-name__summoner", h = "player-name__tooltip__game-name", m = "player-name__tooltip__tag-line", g = "player-name__error", f = "alias", b = "summoner";
            class A extends o.webComponents.ShadowElement {
                static get observedAttributes() {
                    return d
                }
                templateMarkup() {
                    return n(174)
                }
                stylesheetMarkup() {
                    return n(175)
                }
                constructor() {
                    super(), this._tooltipTarget = null, this._tooltipElement = null, this._destroyCurrentPlayerObserver = null, this._computer = new a(o.playerNames)
                }
                connectedCallback() {
                    this._compute()
                }
                disconnectedCallback() {
                    r.default.unassign(this._tooltipTarget), this._destroyCurrentPlayerObserver && this._destroyCurrentPlayerObserver()
                }
                attributeChangedCallback(t, e, n) {
                    super.attributeChangedCallback(t, e, n), this._compute()
                }
                _booleanAttribute(t) {
                    if (this.hasAttribute(t)) {
                        const t = this.getAttribute(l.RENDER_ALIAS_OVERRIDE);
                        return t && "false" !== t
                    }
                }
                _compute() {
                    this._shouldUseCurrentSummonerObserver() ? this._destroyCurrentPlayerObserver || (this._destroyCurrentPlayerObserver = o.playerNames.observeCurrentPlayerName(this._updatePlayerNameFromCurrentSummonerUpdate.bind(this)).destroy) : this._destroyCurrentPlayerObserver && (this._destroyCurrentPlayerObserver(), this._destroyCurrentPlayerObserver = null), this._computer.compute({
                        batch: this.getAttribute(l.BATCH),
                        puuid: this.getAttribute(l.PUUID),
                        summonerId: this.getAttribute(l.SUMMONER_ID),
                        summonerName: this.getAttribute(l.SUMMONER_NAME),
                        gameName: this.getAttribute(l.GAME_NAME),
                        tagLine: this.getAttribute(l.TAG_LINE),
                        format: this.getAttribute(l.FORMAT),
                        renderModeOverride: this.getAttribute(l.RENDER_MODE_OVERRIDE),
                        renderAliasOverride: this._booleanAttribute(l.RENDER_ALIAS_OVERRIDE)
                    }).then((t => this._updatePlayerName(t)))
                }
                _shouldUseCurrentSummonerObserver() {
                    const t = this.getAttribute(l.PUUID),
                        e = this.getAttribute(l.SUMMONER_ID),
                        n = this.getAttribute(l.SUMMONER_NAME),
                        i = this.getAttribute(l.GAME_NAME),
                        r = this.getAttribute(l.TAG_LINE),
                        s = o.playerNames.currentSummonerPuuid;
                    return !(n || i || r || t || e) || t === s
                }
                _updatePlayerNameFromCurrentSummonerUpdate(t) {
                    if (!t) return;
                    const e = this._playerName || {};
                    e.gameName = t.gameName, e.tagLine = t.tagLine, e.summonerName = t.summonerName, this._updatePlayerName(e)
                }
                _updatePlayerName(t) {
                    if (t) switch (this._playerName = t, r.default.unassign(this._tooltipTarget), this._updateEnabled(this.shadowRoot, ".renderMode", (e => e.classList.contains(t.renderMode))), t.renderMode) {
                        case s.FULL_ALIAS:
                        case s.GAME_NAME_ONLY:
                            this._applyGameNameAndTagLine(this.shadowRoot, t);
                            break;
                        case s.TAG_LINE_TOOLTIP:
                            this._applyGameNameAndTagLine(this.shadowRoot, t), this._assignTagLineTooltip(t);
                            break;
                        case s.SUMMONER_NAME:
                            this._applySummonerName(this.shadowRoot, t);
                            break;
                        case s.COMPONENT:
                            this._updateComponentElement();
                            break;
                        case s.ERROR:
                            this._applyError()
                    }
                }
                _updateEnabled(t, e, n) {
                    t.querySelectorAll(e).forEach((t => {
                        const e = n(t),
                            i = !t.classList.contains("disabled");
                        e && !i ? t.classList.remove("disabled") : !e && i && t.classList.add("disabled")
                    }))
                }
                _applyGameNameAndTagLine(t, e) {
                    t.querySelectorAll(`.${c},.${h}`).forEach((t => {
                        t.textContent = e.gameName
                    })), t.querySelectorAll(`.${u},.${m}`).forEach((t => {
                        t.textContent = e.tagLine
                    }))
                }
                _applySummonerName(t, e) {
                    t.querySelectorAll(`.${p}`).forEach((t => {
                        t.textContent = e.summonerName
                    }))
                }
                _assignTagLineTooltip(t) {
                    if (this._prepareTooltipTarget(), this._prepareTooltipElement(), this._tooltipTarget && this._tooltipElement) {
                        this._applyGameNameAndTagLine(this._tooltipElement, t);
                        const e = {
                            type: "system",
                            showDelay: 500,
                            targetAnchor: {
                                x: "center",
                                y: "bottom"
                            },
                            tooltipAnchor: {
                                x: "center",
                                y: "top"
                            },
                            positioningStrategy: "flip",
                            restrictArea: "safe-window"
                        };
                        r.default.assign(this._tooltipTarget, this._tooltipElement, {}, e)
                    }
                }
                _prepareTooltipTarget() {
                    this._tooltipTarget = this.shadowRoot.querySelector(`.${s.TAG_LINE_TOOLTIP} .${c}`)
                }
                _prepareTooltipElement() {
                    this._tooltipElement || (this._tooltipElement = this.shadowRoot.querySelector("lol-uikit-tooltip"), this._tooltipElement && this._tooltipElement.parentNode.removeChild(this._tooltipElement))
                }
                _updateComponentElement() {
                    if (!this._playerName) return;
                    const t = this.shadowRoot.querySelector(`.${s.COMPONENT}`);
                    if (t && t.hasChildNodes()) {
                        const e = this._playerName.useAlias ? f : b;
                        this._updateEnabled(t, "slot", (t => t.getAttribute("name") === e));
                        const n = this._getComponentForActiveSlot(e);
                        n && (n.playerName = this._playerName, this._playerName.useAlias ? (n.setAttribute(l.GAME_NAME, this._playerName.gameName), n.setAttribute(l.TAG_LINE, this._playerName.tagLine)) : n.setAttribute(l.SUMMONER_NAME, this._playerName.summonerName))
                    }
                }
                _getComponentForActiveSlot(t) {
                    return Array.from(this.querySelectorAll("[slot]")).find((e => e.getAttribute("slot") === t))
                }
                _applyError() {
                    this.shadowRoot.querySelectorAll(`.${g}`).forEach((t => {
                        t.textContent = o.tra.get("player_name_unknown")
                    }))
                }
            }
            A.tagName = "lol-uikit-player-name";
            var v = A;
            e.default = v
        }, (t, e, n) => {
            "use strict";
            Object.defineProperty(e, "__esModule", {
                value: !0
            }), e.default = void 0;
            var i, o = n(1),
                r = (i = n(166)) && i.__esModule ? i : {
                    default: i
                };
            var s = new class {
                assign(t, e, n, i = {}) {
                    i.ComponentFactory = i.ComponentFactory || o.componentFactory, this.unassign(t), r.default.registerTarget(t, e, n, i)
                }
                show(t) {
                    r.default.showTooltip(t)
                }
                hide(t) {
                    r.default.hideTooltip(t)
                }
                enable(t) {
                    r.default.enableTooltip(t)
                }
                disable(t) {
                    r.default.disableTooltip(t)
                }
                unassign(t) {
                    r.default.unregisterTarget(t)
                }
                hideAll() {
                    r.default.hideLayer()
                }
            };
            e.default = s
        }, (t, e, n) => {
            "use strict";
            var i = a(n(167)),
                o = n(1),
                r = a(n(168)),
                s = a(n(172));

            function a(t) {
                return t && t.__esModule ? t : {
                    default: t
                }
            }
            const l = "linear",
                d = {
                    short: 250,
                    system: 450,
                    long: 650
                },
                c = {
                    showEvent: "mouseenter",
                    hideEvent: "mouseleave",
                    targetAnchor: {
                        x: "right",
                        y: "center"
                    },
                    tooltipAnchor: null,
                    showDelay: "short",
                    offset: {
                        x: 0,
                        y: 0
                    },
                    positioningStrategy: "flip",
                    restrictArea: "safe-window",
                    transitionSpeed: 150
                },
                u = {
                    showDelay: "system"
                },
                p = {
                    showEvent: "mousedown",
                    hideEvent: "mousedown"
                },
                h = {
                    showEvent: null,
                    hideEvent: null
                },
                m = function() {
                    this.rootId = "lol-uikit-tooltip-root", this.layer = this.createLayer(), this.targets = new WeakMap, this.mutationObserver = new MutationObserver(this.handleMutation.bind(this)), this.lastPositioned = !1, this.pendingTooltips = new Map, this.tooltipVisible = !1, this.lastTarget = null, this.recentlyShowedTooltip = !1, i.default.addListener("change", this.handleLayerChange.bind(this))
                };

            function g(t, e, n) {
                const i = new Event("positioned");
                return i.offset = t, i.targetRect = e, i.tooltipRect = n, i
            }
            m.prototype.handleLayerChange = function(t) {
                const e = t.detail && t.detail.domNode;
                if (e && e.id === this.rootId) return;
                const n = this.lastTarget;
                this.tooltipVisible && n ? this.isOverlapping(e, n) && this.hideTooltip(n) : this.pendingTooltips.forEach(((t, e) => {
                    this.hideTooltip(e)
                }))
            }, m.prototype.isOverlapping = function(t, e) {
                function n(t) {
                    return t && "function" == typeof t.getBoundingClientRect
                }
                if (!n(t) || !n(e)) return !1;
                const i = t.getBoundingClientRect(),
                    o = e.getBoundingClientRect();
                return !(i.right < o.left || i.left > o.right || i.bottom < o.top || i.top > o.bottom)
            }, m.prototype.createLayer = function() {
                const t = document.createElement("div");
                return t.classList.add("tooltip"), t.id = this.rootId, t
            }, m.prototype.showLayer = function() {
                i.default.addLayer(this.layer)
            }, m.prototype.hideLayer = function() {
                this.pendingTooltips.forEach(((t, e) => {
                    this.hideTooltip(e)
                }));
                const t = this.lastTarget;
                this.hideTooltip(t), i.default.removeLayer(this.layer)
            }, m.prototype.defaults = function(t) {
                return "system" === t.type ? t = o.Lodash.defaults(t, u) : "attention" === t.type ? t = o.Lodash.defaults(t, p) : "banner" === t.type && (t = o.Lodash.defaults(t, h)), o.Lodash.defaults(t, c)
            }, m.prototype.registerTarget = function(t, e, n, i) {
                if (!t) return void o.logger.error("Attempted to register tooltip with invalid target:", t);
                const r = this.defaults(i),
                    s = {
                        show: this.showTooltip.bind(this, t),
                        hide: this.hideTooltip.bind(this, t),
                        toggle: this.toggleTooltip.bind(this, t)
                    };
                if (o.Lodash.isFunction(e)) {
                    const n = e;
                    e = function(e) {
                        const o = n(t, e);
                        return i.type && o.setAttribute("type", i.type), i.caretPosition && o.setAttribute("caret-position", i.caretPosition), i.tooltipPosition && o.setAttribute("tooltip-position", i.tooltipPosition), i.pseudoPartSelector && o.setAttribute("add-part-selector", i.pseudoPartSelector), o
                    }
                } else e instanceof HTMLElement && (e.parentNode && e.parentNode.removeChild(e), i.type && e.setAttribute("type", i.type), i.caretPosition && e.setAttribute("caret-position", i.caretPosition), i.tooltipPosition && e.setAttribute("tooltip-position", i.tooltipPosition), i.pseudoPartSelector && e.setAttribute("add-part-selector", i.pseudoPartSelector));
                this.targets.set(t, {
                    renderer: e,
                    data: n,
                    options: r,
                    eventHandlers: s,
                    tooltipVisible: !1,
                    tooltipEnabled: !0
                }), (0, o.jQuery)(t).each((function() {
                    r.showEvent && r.hideEvent && r.showEvent === r.hideEvent ? this.addEventListener(r.showEvent, s.toggle) : (r.showEvent && this.addEventListener(r.showEvent, s.show), r.hideEvent && this.addEventListener(r.hideEvent, s.hide))
                })), "attention" !== i.type && "banner" !== i.type || s.show()
            }, m.prototype.unregisterTarget = function(t) {
                const e = this.targets.get(t);
                e && e.eventHandlers && (e.eventHandlers.hide(), (0, o.jQuery)(t).each((function() {
                    this.removeEventListener(e.options.showEvent, e.eventHandlers.show), this.removeEventListener(e.options.hideEvent, e.eventHandlers.hide), this.removeEventListener(e.options.showEvent, e.eventHandlers.toggle), this.removeEventListener(e.options.hideEvent, e.eventHandlers.toggle)
                })), this.targets.delete(t))
            }, m.prototype.positionElement = function(t, e) {
                t.style.top = Math.floor(e.top) + "px", t.style.left = Math.floor(e.left) + "px"
            }, m.prototype.positionTooltip = function(t, e) {
                const n = this.targets.get(t);
                if (!n || !n.hasOwnProperty("options")) return void o.logger.error("Attempted to position tooltip with invalid target:", n);
                const {
                    options: i
                } = n, s = r.default.getPositioningStrategy(i.positioningStrategy), a = {
                    element: e,
                    target: t,
                    targetAnchor: i.targetAnchor,
                    elementAnchor: i.tooltipAnchor,
                    offset: i.offset,
                    areaRestriction: i.restrictArea
                }, l = e;
                let d = s(a);
                if (!d) return;
                this.positionElement(l, d);
                let c = e.querySelector("lol-uikit-tooltip");
                if (c || (c = e.classList.contains("lol-uikit-tooltip-target") ? e : e.querySelector(".lol-uikit-tooltip-target")), !(e = c || e.firstChild)) return;
                const u = r.default.elementRect(e),
                    p = r.default.elementRect(t),
                    h = r.default.relativePosition(t, this.layer);
                e.dispatchEvent(g(h, p, u)), d = s(a), d && (this.positionElement(l, d), e.dispatchEvent(g(h, p, u)), this.lastPositioned = {
                    target: t,
                    element: e
                })
            }, m.prototype.handleMutation = function() {
                this.lastPositioned && this.lastPositioned.hasOwnProperty("target") && this.positionTooltip(this.lastPositioned.target, this.lastPositioned.element)
            }, m.prototype.toggleTooltip = function(t, e) {
                const n = this.targets.get(t);
                return this.layer.parentElement ? n.eventHandlers.hide(e) : n.eventHandlers.show(e)
            }, m.prototype.prepareTooltip = function(t) {
                const e = this.targets.get(t);
                if (!e.domNode) {
                    const n = e.options.ComponentFactory.create(e.renderer, e.data);
                    if (e.domNode = document.createElement("div"), e.options.type && e.domNode.setAttribute("type", e.options.type), e.domNode.appendChild(e.options.ComponentFactory.getDOMNode(n)), n.renderPromise) return n.renderPromise = n.renderPromise.then(this.displayTooltip.bind(this, t)), "pending"
                }
                this.mutationObserver.observe(e.domNode, {
                    childList: !0,
                    subtree: !0
                })
            }, m.prototype.displayTooltip = function(t) {
                if (this.dispatchTargetEvent(t, "tooltip:beforeDisplay"), !this.pendingTooltips.get(t)) return;
                const e = this.targets.get(t);
                if (!e) return;
                if (e.tooltipVisible = this.tooltipVisible = !0, this.lastTarget = t, "pending" === this.prepareTooltip(t)) return;
                if (-1 === [].slice.call(this.layer.children).indexOf(e.domNode)) {
                    for (let t = this.layer.childNodes.length - 1; t >= 0; t--) "attention" !== this.layer.childNodes[t].getAttribute("type") && "banner" !== this.layer.childNodes[t].getAttribute("type") && this.layer.removeChild(this.layer.childNodes[t]);
                    this.layer.appendChild(e.domNode)
                }
                this.showLayer(), this.positionTooltip(t, e.domNode);
                let n = e.options.transitionSpeed;
                this.recentlyShowedTooltip && (n = 0), this.recentlyShowedTooltip = !0, (0, o.jQuery)(e.domNode).animate({
                    opacity: 1
                }, n, l).promise().done((() => {
                    this.dispatchTargetEvent(t, "tooltip:afterDisplay")
                }));
                const i = e.options && e.options.willHideOnChange;
                this.hideOnChange(t, i), this.pendingTooltips.delete(t)
            }, m.prototype.hideOnChange = function(t, e) {
                e || s.default.addTarget(t, (() => this.hideTooltip(t)))
            }, m.prototype.showTooltip = function(t) {
                const e = this.targets.get(t);
                if (!e.tooltipEnabled) return;
                if (this.dispatchTargetEvent(t, "tooltip:beforeShow"), this.pendingTooltips.get(t)) return;
                const n = this.recentlyShowedTooltip ? 0 : function(t) {
                    if (d[t]) return d[t];
                    if ("number" != typeof t) throw new Error(`Delay '${t}' is not a number`);
                    return t
                }(e.options.showDelay);
                this.pendingTooltips.set(t, setTimeout(function() {
                    clearTimeout(this.recentlyShowedTimeout), this.displayTooltip(t), this.dispatchTargetEvent(t, "tooltip:afterShow")
                }.bind(this), n))
            }, m.prototype.hideTooltip = function(t) {
                if (this.dispatchTargetEvent(t, "tooltip:beforeHide"), this.pendingTooltips.get(t)) clearTimeout(this.pendingTooltips.get(t)), this.pendingTooltips.delete(t), this.dispatchTargetEvent(t, "tooltip:afterHide");
                else {
                    s.default.removeTarget(t);
                    const e = this.targets.get(t);
                    this.tooltipVisible = !1, this.lastTarget = null, e && e.domNode && e.domNode.parentNode && (e.tooltipVisible = !1, this.recentlyShowedTimeout = setTimeout((() => {
                        this.recentlyShowedTooltip = !1
                    }), 500), (0, o.jQuery)(e.domNode).stop().animate({
                        opacity: 0
                    }, e.options.transitionSpeed, l).promise().done((() => {
                        this.mutationObserver.disconnect(), e.domNode.parentNode && e.domNode.parentNode.removeChild(e.domNode), this.lastTarget || this.layer.childNodes.length || this.hideLayer(), this.dispatchTargetEvent(t, "tooltip:afterHide")
                    })))
                }
            }, m.prototype.enableTooltip = function(t) {
                this.targets.get(t).tooltipEnabled = !0
            }, m.prototype.disableTooltip = function(t) {
                this.targets.get(t).tooltipEnabled = !1, this.hideTooltip(t)
            }, m.prototype.dispatchTargetEvent = function(t, e) {
                t && "function" == typeof t.dispatchEvent ? t.dispatchEvent(new Event(e)) : t && "function" == typeof t.trigger && t.trigger(e)
            }, t.exports = new m
        }, (t, e, n) => {
            "use strict";
            Object.defineProperty(e, "__esModule", {
                value: !0
            }), e.default = void 0;
            var i = n(1);
            const o = n(19);
            var r = new class {
                constructor() {
                    this._domNode = document.createElement("div"), this._domNode.id = "lol-uikit-layer-manager-wrapper"
                }
                get domNode() {
                    if (!this._isAddedToDom) {
                        const t = document.querySelector("#lol-uikit-layer-manager");
                        t && (t.appendChild(this._domNode), this._isAddedToDom = !0)
                    }
                    return this._domNode
                }
                addListener(t, e) {
                    this.domNode.addEventListener(t, e)
                }
                removeListener(t, e) {
                    this.domNode.removeEventListener(t, e)
                }
                trigger(t, e = null) {
                    if ("string" == typeof t) {
                        const n = new CustomEvent(t, {
                            detail: e
                        });
                        this.domNode.dispatchEvent(n)
                    }
                }
                attachTo(t) {
                    t instanceof o ? (i.logger.warning("[DEPRECATED]: passing a string is no longer supported, pass a DOM Node instance"), t.append(this.domNode)) : "string" == typeof t ? (i.logger.warning("[DEPRECATED]: passing a string is no longer supported, pass a DOM Node instance"), o(t).append(this.domNode)) : t.appendChild(this.domNode)
                }
                getDomNode(t) {
                    if (t) return t instanceof window.HTMLElement ? t : "domNode" in t ? t.domNode : void 0
                }
                addLayer(t) {
                    (t = this.getDomNode(t)) && -1 === Array.prototype.slice.call(this.domNode.children).indexOf(t) && (this.domNode.appendChild(t), this.trigger("change", {
                        domNode: t
                    }))
                }
                getLayer(t) {
                    if ("number" != typeof t && (t = this.getLayerIndex(t)), !(t < 0)) return this.domNode.children[t]
                }
                getLayerIndex(t) {
                    if (!(t = this.getDomNode(t))) return;
                    let e = this.domNode.childNodes.indexOf(t);
                    for (; - 1 === e;) {
                        if (!(t = t.parent)) return -1;
                        e = this.domNode.childNodes.indexOf(t)
                    }
                    return e
                }
                insertLayer(t, e) {
                    (t = this.getDomNode(t)) && (this.domNode.insertBefore(t, this.domNode.childNodes[e]), this.trigger("change", {
                        domNode: t
                    }))
                }
                insertToLayer(t, e) {
                    if (!(t = this.getDomNode(t))) return;
                    for (; e > this.domNode.childNodes.length;) this.addLayer(document.createElement("div"));
                    if (e === this.domNode.childNodes.length) return this.addLayer(t), void this.trigger("change", {
                        domNode: t
                    });
                    let n = this.domNode.childNodes[e];
                    if (!n.classList.contains("layer-group")) {
                        const t = document.createElement("div");
                        t.classList.add("layer-group"), this.domNode.insertBefore(t, n), this.domNode.removeChild(n), t.appendChild(n), n = t
                    }
                    n.appendChild(t), this.trigger("change", {
                        domNode: t
                    })
                }
                removeLayer(t) {
                    if (t) {
                        if (t.parentNode === this.domNode) this.domNode.removeChild(t);
                        else if (t.parentNode && t.parentNode.parentNode === this.domNode) {
                            const e = t.parentNode;
                            e.removeChild(t), 0 === e.childNodes.length && this.domNode.removeChild(e)
                        }
                        this.trigger("change", {
                            domNode: t
                        })
                    }
                }
            };
            e.default = r
        }, (t, e, n) => {
            "use strict";
            var i, o = (i = n(169)) && i.__esModule ? i : {
                    default: i
                },
                r = l(n(170)),
                s = l(n(171));

            function a(t) {
                if ("function" != typeof WeakMap) return null;
                var e = new WeakMap,
                    n = new WeakMap;
                return (a = function(t) {
                    return t ? n : e
                })(t)
            }

            function l(t, e) {
                if (!e && t && t.__esModule) return t;
                if (null === t || "object" != typeof t && "function" != typeof t) return {
                    default: t
                };
                var n = a(e);
                if (n && n.has(t)) return n.get(t);
                var i = {},
                    o = Object.defineProperty && Object.getOwnPropertyDescriptor;
                for (var r in t)
                    if ("default" !== r && Object.prototype.hasOwnProperty.call(t, r)) {
                        var s = o ? Object.getOwnPropertyDescriptor(t, r) : null;
                        s && (s.get || s.set) ? Object.defineProperty(i, r, s) : i[r] = t[r]
                    } return i.default = t, n && n.set(t, i), i
            }
            t.exports = {
                rect: r.rect,
                point: r.point,
                elementRect: s.elementRect,
                relativePosition: s.elementRect,
                getPositioningStrategy: t => o.default[t]
            }
        }, (t, e, n) => {
            "use strict";
            Object.defineProperty(e, "__esModule", {
                value: !0
            }), e.default = void 0;
            var i = n(1),
                o = a(n(170)),
                r = a(n(171));

            function s(t) {
                if ("function" != typeof WeakMap) return null;
                var e = new WeakMap,
                    n = new WeakMap;
                return (s = function(t) {
                    return t ? n : e
                })(t)
            }

            function a(t, e) {
                if (!e && t && t.__esModule) return t;
                if (null === t || "object" != typeof t && "function" != typeof t) return {
                    default: t
                };
                var n = s(e);
                if (n && n.has(t)) return n.get(t);
                var i = {},
                    o = Object.defineProperty && Object.getOwnPropertyDescriptor;
                for (var r in t)
                    if ("default" !== r && Object.prototype.hasOwnProperty.call(t, r)) {
                        var a = o ? Object.getOwnPropertyDescriptor(t, r) : null;
                        a && (a.get || a.set) ? Object.defineProperty(i, r, a) : i[r] = t[r]
                    } return i.default = t, n && n.set(t, i), i
            }

            function l(t) {
                const {
                    element: e,
                    target: n,
                    targetAnchor: i,
                    elementAnchor: s,
                    offset: a,
                    areaRestriction: l
                } = t, d = r.elementRect(e);
                if (!d) return;
                if (!r.elementRect(n)) return;
                const c = r.areaNameToCoords(l),
                    u = r.getAnchorPosition(n, i, a),
                    p = r.getAnchorPosition(e, s || r.mirrorAnchor("xy", i)),
                    h = r.constrain(c.right - d.w, c.left, d.left + (u.x - p.x)),
                    m = r.constrain(c.bottom - d.h, c.top, d.top + (u.y - p.y));
                return o.point(h, m)
            }
            var d = {
                preserve: l,
                flip: function(t) {
                    const {
                        element: e,
                        target: n,
                        offset: s,
                        areaRestriction: a
                    } = t;
                    let d = t.elementAnchor,
                        c = t.targetAnchor;
                    const u = r.elementRect(e);
                    if (!u) return;
                    if (!r.elementRect(n)) return;
                    const p = r.getAnchorPosition(n, c, s),
                        h = r.getAnchorPosition(e, d || r.mirrorAnchor("xy", c)),
                        m = p.x - h.x,
                        g = p.y - h.y,
                        f = r.areaNameToCoords(a),
                        b = {
                            x: !!(u.left + m < f.left && c.x === o.left || u.right + m > f.right && c.x === o.right),
                            y: !!(u.top + g < f.top && c.y === o.top || u.bottom + g > f.bottom && c.y === o.bottom)
                        };
                    return i.Lodash.forEach(b, ((t, e) => {
                        !0 === t && (i.logger.trace(`Tooltip does not fit on screen. Mirroring in the ${e} axis`), c = r.mirrorAnchor(e, c), d = r.mirrorAnchor(e, d))
                    })), l(i.Lodash.assign({}, t, {
                        targetAnchor: c,
                        elementAnchor: d,
                        areaRestriction: f
                    }))
                }
            };
            e.default = d
        }, (t, e) => {
            "use strict";
            Object.defineProperty(e, "__esModule", {
                value: !0
            }), e.opposites = e.left = e.center = e.bottom = void 0, e.point = function(t, e) {
                return {
                    x: t,
                    y: e,
                    left: t,
                    top: e
                }
            }, e.rect = function(t, e, n, i) {
                return {
                    x: t,
                    y: e,
                    w: n,
                    h: i,
                    width: n,
                    height: i,
                    top: e,
                    left: t,
                    right: t + n,
                    bottom: e + i
                }
            }, e.top = e.right = void 0;
            const n = "top";
            e.top = n;
            const i = "bottom";
            e.bottom = i;
            const o = "left";
            e.left = o;
            const r = "right";
            e.right = r;
            e.center = "center";
            const s = {
                [o]: r,
                [r]: o,
                [n]: i,
                [i]: n
            };
            e.opposites = s
        }, (t, e, n) => {
            "use strict";
            Object.defineProperty(e, "__esModule", {
                value: !0
            }), e._getAnchorX = d, e._getAnchorY = c, e.areaNameToCoords = function(t) {
                if ("safe-window" === t) return u(35, 35, 35, 35);
                if ("main-viewport" === t) return u(35, 80, 223, 35);
                if ("whole-window" === t) return u();
                if (i.Lodash.isArray(t)) {
                    const e = t[1][0] - t[0][0],
                        n = t[1][1] - t[0][1];
                    return o.rect(t[0][0], t[0][1], e, n)
                }
                if ("number" == typeof t.x && "number" == typeof t.width) return t;
                throw new Error(`We don't know what to do with restriction ${t}`)
            }, e.clamp = function(t, e, n) {
                return Math.max(Math.min(t, n), e)
            }, e.constrain = function(t, e, n) {
                return Math.min(t, Math.max(e, n))
            }, e.elementRect = l, e.getAnchorPosition = function(t, e, n) {
                const i = l(t),
                    {
                        x: r
                    } = e,
                    {
                        y: s
                    } = e,
                    a = n && n.x || 0,
                    u = n && n.y || 0,
                    p = d(r, i),
                    h = c(s, i);
                return o.point(p + a, h + u)
            }, e.getScreenRect = s, e.mirrorAnchor = function(t, e) {
                if (!e) return;
                const {
                    x: n,
                    y: i
                } = e;
                return {
                    x: -1 !== t.indexOf("x") && o.opposites[n] || n,
                    y: -1 !== t.indexOf("y") && o.opposites[i] || i
                }
            }, e.paddedRect = u, e.relativePosition = function(t, e) {
                const n = l(t),
                    i = l(e);
                return o.point(i.x - n.x, i.y - n.y)
            }, e.unwrapped = a;
            var i = n(1),
                o = function(t, e) {
                    if (!e && t && t.__esModule) return t;
                    if (null === t || "object" != typeof t && "function" != typeof t) return {
                        default: t
                    };
                    var n = r(e);
                    if (n && n.has(t)) return n.get(t);
                    var i = {},
                        o = Object.defineProperty && Object.getOwnPropertyDescriptor;
                    for (var s in t)
                        if ("default" !== s && Object.prototype.hasOwnProperty.call(t, s)) {
                            var a = o ? Object.getOwnPropertyDescriptor(t, s) : null;
                            a && (a.get || a.set) ? Object.defineProperty(i, s, a) : i[s] = t[s]
                        } i.default = t, n && n.set(t, i);
                    return i
                }(n(170));

            function r(t) {
                if ("function" != typeof WeakMap) return null;
                var e = new WeakMap,
                    n = new WeakMap;
                return (r = function(t) {
                    return t ? n : e
                })(t)
            }

            function s() {
                return o.rect(window.pageXOffset, window.pageYOffset, window.innerWidth, window.innerHeight)
            }

            function a(t) {
                return t ? t.jquery ? t[0] : t : null
            }

            function l(t) {
                const e = a(t);
                if (!e || !e.getBoundingClientRect) return;
                const n = a(t).getBoundingClientRect();
                return o.rect(n.left + window.pageXOffset, n.top + window.pageYOffset, n.width, n.height)
            }

            function d(t, e) {
                return t === o.left ? e.left : t === o.right ? e.right : t === o.center ? e.left + e.w / 2 : void 0
            }

            function c(t, e) {
                return t === o.top ? e.top : t === o.bottom ? e.bottom : t === o.center ? e.top + e.h / 2 : void 0
            }

            function u(t = 0, e = 0, n = t, i = e) {
                const r = s();
                return o.rect(t, e, r.width - (t + n), r.height - (e + i))
            }
        }, (t, e, n) => {
            "use strict";
            Object.defineProperty(e, "__esModule", {
                value: !0
            }), e.default = void 0;
            var i = n(1),
                o = s(n(168)),
                r = s(n(173));

            function s(t) {
                return t && t.__esModule ? t : {
                    default: t
                }
            }
            var a = new class {
                constructor() {
                    this._targets = new Map
                }
                _checkTargetPositions() {
                    if (0 !== this._targets.size) return r.default.getScreenInfo().then((t => {
                        this._targets.forEach(((e, n) => {
                            let r = o.default.elementRect(n);
                            0 === r.width && 0 === r.height && 0 === r.top && 0 === r.left && (r = !1);
                            "hidden" !== window.getComputedStyle(n).visibility && (i.Lodash.isEqual(r, e.position) || t.zoomScale !== this._zoomScale && !1 !== r) || e.callback(n, r), e.position = r
                        })), this._zoomScale = t.zoomScale, this.checkerLoop = window.setTimeout((() => this._checkTargetPositions()), 100)
                    }))
                }
                addTarget(t, e) {
                    return r.default.getScreenInfo().then((n => {
                        t.jquery && (t = t[0]), this._zoomScale = n.zoomScale, this._targets.set(t, {
                            callback: e,
                            position: o.default.elementRect(t)
                        }), 1 === this._targets.size && (this.checkerLoop = window.setTimeout((() => this._checkTargetPositions()), 100))
                    }))
                }
                removeTarget(t) {
                    this._targets.delete(t)
                }
            };
            e.default = a
        }, (t, e, n) => {
            "use strict";
            Object.defineProperty(e, "__esModule", {
                value: !0
            }), e.default = e.Screen = void 0;
            var i, o = (i = n(66)) && i.__esModule ? i : {
                default: i
            };
            class r {
                constructor() {
                    const t = void 0 === window.riotInvoke;
                    this.getDataFn = t ? this.chromeScreenData : this.clientScreenData
                }
                clientScreenData(t) {
                    return new Promise((function(e, n) {
                        window.riotInvoke({
                            request: JSON.stringify({
                                name: t,
                                params: []
                            }),
                            onSuccess(t) {
                                try {
                                    const {
                                        result: n
                                    } = JSON.parse(t);
                                    e(JSON.parse(n))
                                } catch (t) {
                                    n(t)
                                }
                            }
                        })
                    }))
                }
                chromeScreenData(t) {
                    if ("Window.ScreenData" === t) return Promise.resolve({
                        screenX: window.screenX,
                        screenY: window.screenY,
                        screenWidth: window.screen.width,
                        screenHeight: window.screen.height,
                        screenAvailWidth: window.screen.availWidth,
                        screenAvailHeight: window.screen.availHeight,
                        screenAvailLeft: window.screen.availLeft,
                        screenAvailTop: window.screen.availTop,
                        windowWidth: window.outerWidth,
                        windowHeight: window.outerHeight,
                        windowActivated: !document.hidden,
                        windowMinimized: document.hidden,
                        zoomScale: window.devicePixelRatio
                    });
                    if ("Window.GetValidWindowSizes" === t) return Promise.resolve([{
                        width: window.screen.width,
                        height: window.screen.height,
                        selected: !0,
                        scale: window.devicePixelRatio
                    }]);
                    throw "Invalid invocation name"
                }
                getScreenInfo() {
                    return this.getDataFn("Window.ScreenData")
                }
                getScreenRect() {
                    return this.getScreenInfo().then((t => new o.default(0, 0, t.screenWidth, t.screenHeight)))
                }
                getScreenAvailableRect() {
                    return this.getScreenInfo().then((t => new o.default(t.screenAvailLeft, t.screenAvailTop, t.screenAvailWidth, t.screenAvailHeight)))
                }
                getWindowRect() {
                    return this.getScreenInfo().then((t => new o.default(t.screenX, t.screenY, t.windowWidth, t.windowHeight)))
                }
                getValidWindowSizes() {
                    return this.getDataFn("Window.GetValidWindowSizes")
                }
            }
            e.Screen = r;
            var s = new r;
            e.default = s
        }, t => {
            "use strict";
            t.exports = '<template>\r\n\r\n  \x3c!-- Render components are activated via css class ("renderMode <RenderMode> disabled")\r\n       * <RenderMode> is defined in playerNameComponentLogic.RenderMode\r\n       * disabled is added/removed when the corresponding renderMode is activated\r\n       * player-name__<type> classes identify elements whose text is set to the respective player name\r\n    --\x3e\r\n\r\n  <div class="renderMode fullAlias disabled">\r\n    <span class="player-name__alias">\r\n      <span class="player-name__game-name"></span>\r\n      <span class="player-name__tag-line-separator">#</span>\x3c!--\r\n    --\x3e<span class="player-name__tag-line"></span>\r\n    </span>\r\n  </div>\r\n\r\n  <div class="renderMode gameNameOnly disabled">\r\n    <span class="player-name__alias">\r\n      <span class="player-name__game-name"></span>\r\n    </span>\r\n  </div>\r\n\r\n  <div class="renderMode tagLineTooltip disabled">\r\n    <span class="player-name__alias">\r\n      <span class="player-name__game-name"></span>\r\n    </span>\r\n    \x3c!--\r\n    <lol-uikit-tooltip showDelay=500 tooltipPosition="bottom" type="system" positioningStrategy="flip" restrictArea="safe-window">\r\n    --\x3e\r\n    <lol-uikit-tooltip>\r\n      <lol-uikit-content-block type="tooltip-system" class="player-name__tooltip__alias">\r\n        <span class="player-name__tooltip__game-name"></span>\r\n        <span class="player-name__tooltip__tag-line-separator">#</span>\x3c!--\r\n        --\x3e<span class="player-name__tooltip__tag-line"></span>\r\n      </lol-uikit-content-block>\r\n    </lol-uikit-tooltip>\r\n    \x3c!--\r\n    </lol-uikit-tooltip>\r\n    --\x3e\r\n  </div>\r\n\r\n  <div class="renderMode summonerName disabled">\r\n    <span class="player-name__summoner"></span>\r\n  </div>\r\n\r\n  <div class="renderMode error disabled">\r\n    <span class="player-name__error"></span>\r\n  </div>\r\n\r\n  <div class="renderMode component disabled">\r\n    <slot class="disabled" name="alias"></slot>\r\n    <slot class="disabled" name="summoner"></slot>\r\n  </div>\r\n\r\n</template>\r\n'
        }, (t, e, n) => {
            var i = n(79),
                o = n(10)(i);
            o.push([t.id, ":host .renderMode.disabled {\n  display: none;\n}\n:host .renderMode .disabled {\n  display: none;\n}\n", "", {
                version: 3,
                sources: ["webpack://./fe/rcp-fe-lol-uikit/src/elements/player-name/component-style.styl"],
                names: [],
                mappings: "AAAA;EACE,aAAa;AACf;AACA;EACE,aAAa;AACf",
                sourcesContent: [":host .renderMode.disabled {\n  display: none;\n}\n:host .renderMode .disabled {\n  display: none;\n}\n"],
                sourceRoot: ""
            }]), t.exports = o
        }, (t, e, n) => {
            "use strict";
            Object.defineProperty(e, "__esModule", {
                value: !0
            }), e.default = void 0;
            var i, o = n(17),
                r = n(16),
                s = (i = n(20)) && i.__esModule ? i : {
                    default: i
                },
                a = n(1);
            class l extends a.webComponents.ShadowElement {
                static initAnimationDelay = 100;
                templateMarkup() {
                    return n(177)
                }
                stylesheetMarkup() {
                    return n(178)
                }
                constructor() {
                    super(), this._wasDisabled = !1, this._hasPlayedIntro = !1, this.mouseover = this.sendMouseEvent.bind(this, "hover", "hover"), this.mouseout = this.sendMouseEvent.bind(this, "out", "idle"), this.mouseup = this.sendMouseEvent.bind(this, "up"), this.mousedown = (0, r.leftClickHandler)(this.sendMouseEvent.bind(this, "down", "down")), this.click = (0, r.leftClickHandler)(this.sendMouseEvent.bind(this, "click", "click"))
                }
                connectedCallback() {
                    this.setMouseEvents(), l.initAnimationDelay ? setTimeout(this.initAnimation.bind(this), l.initAnimationDelay) : this.initAnimation()
                }
                disconnectedCallback() {
                    this.removeMouseEvents()
                }
                static get observedAttributes() {
                    return ["hover-sfx-src", "click-sfx-src"]
                }
                attributeChangedCallback() {
                    super.attributeChangedCallback(), this.processAttributes({
                        event: "changed"
                    })
                }
                _createSound(t) {
                    return (0, o.createSound)("sfx-ui", t, {
                        allowConcurrency: !1
                    })
                }
                processAttributes() {
                    const t = this.shadowRoot.querySelector(".lol-uikit-primary-magic-button-wrapper"),
                        e = this.getAttribute("hover-sfx-src"),
                        n = this.getAttribute("click-sfx-src");
                    this.setCustomSounds(e, n), this.disabled && !t.classList.contains("click") ? this.setInteractionClass("disabled") : (this.setInteractionClass("idle"), this._wasDisabled && this.playIntro()), this._wasDisabled = this.disabled
                }
                setCustomSounds(t, e) {
                    const n = t || s.default.primaryMagicButtonHover,
                        i = e || s.default.primaryMagicButtonClick;
                    this._hoverSound = this._createSound(n), this._clickSound = this._createSound(i)
                }
                initAnimation() {
                    this.disabled || this.playIntro()
                }
                playIntro() {
                    if (this._hasPlayedIntro) return;
                    this.introTimer && clearTimeout(this.introTimer), this.setInteractionClass("intro"), this.introTimer = setTimeout((() => {
                        this.disabled || this.setInteractionClass("idle")
                    }), 500), this._hasPlayedIntro = !0
                }
                setMouseEvents() {
                    const t = this.shadowRoot;
                    t.addEventListener("mouseover", this.mouseover), t.addEventListener("mouseout", this.mouseout), t.addEventListener("mouseup", this.mouseup), t.addEventListener("mousedown", this.mousedown), t.addEventListener("click", this.click)
                }
                removeMouseEvents() {
                    const t = this.shadowRoot;
                    t.removeEventListener("mouseover", this.mouseover), t.removeEventListener("mouseout", this.mouseout), t.removeEventListener("mouseup", this.mouseup), t.removeEventListener("mousedown", this.mousedown), t.removeEventListener("click", this.click)
                }
                sendMouseEvent(t, e) {
                    this.disabled || (this.introTimer && clearTimeout(this.introTimer), "string" == typeof e && this.setInteractionClass(e), "click" === t && (this.disableOnClick(), this._clickSound.play()), "hover" === t && this._hoverSound.play())
                }
                disableOnClick(t = 0) {
                    function e() {
                        this.setMouseEvents(), this.setInteractionClass(this.disabled ? "disabled" : "idle")
                    }
                    this.disabled || (t = t || 500, this.removeMouseEvents(), t ? window.setTimeout(e.bind(this), t) : e())
                }
                setInteractionClass(t) {
                    const e = this.shadowRoot.querySelector(".lol-uikit-primary-magic-button-wrapper"),
                        n = e.querySelector("lol-uikit-animated-border-overlay");
                    ["intro", "idle", "hover", "down", "click", "disabled"].forEach((i => {
                        i !== t && (e.classList.remove(i), n.classList.remove(i))
                    })), t && (e.classList.add(t), n.classList.add(t))
                }
            }
            Object.defineProperty(l.prototype, "disabled", {
                enumerable: !0,
                get: function() {
                    return this.hasAttribute("disabled")
                },
                set: function(t) {
                    t ? this.setAttribute("disabled", "disabled") : this.removeAttribute("disabled")
                }
            }), l.tagName = "lol-uikit-primary-magic-button";
            var d = l;
            e.default = d
        }, t => {
            "use strict";
            t.exports = '<template>\r\n  <style>\r\n    @keyframes noiseScroll {\r\n      0%    { opacity: 1; background-position: 0 center; }\r\n      100%  { opacity: 1; background-position: -400% center; }\r\n    }\r\n\r\n    @keyframes noiseFade {\r\n      0%    { opacity: 1; }\r\n      10%   { opacity: 0; }\r\n      90%   { opacity: 0; }\r\n      100%  { opacity: 1; }\r\n    }\r\n\r\n    @keyframes radialEffectTransition {\r\n      0%    { top: -120px; }\r\n      100%  { top: 100%; }\r\n    }\r\n\r\n    @keyframes backgroundIntro {\r\n      0%    { box-shadow: inset 0 -10px 20px rgba(5, 150, 170, 0); }\r\n      30%   { box-shadow: inset 0 -10px 20px rgba(5, 150, 170, 0.5); }\r\n      100%  { box-shadow: inset 0 -10px 20px rgba(5, 150, 170, 0); }\r\n    }\r\n\r\n    @keyframes introText {\r\n      0%    { }\r\n      30%   { text-shadow: 0 0 0; }\r\n      50%   { text-shadow: 0 0 6px; }\r\n      60%   { text-shadow: 0 0 6px; }\r\n      100%  { text-shadow: 0 0 0; }\r\n    }\r\n\r\n    @keyframes backgroundClick {\r\n      0%    { box-shadow: inset 0 100px 0 rgba(5, 150, 170, 0); }\r\n      30%   { box-shadow: inset 0 100px 0 rgba(5, 150, 170, 0.5); }\r\n      100%  { box-shadow: inset 0 100px 0 rgba(5, 150, 170, 0.0); }\r\n    }\r\n\r\n    @keyframes runeMagicLeftSpriteSheetAnimation { /* 30 frames of 22px plus one null frame */\r\n      0%    { background-position-y: 22px; }\r\n      100%  { background-position-y: -660px; }\r\n    }\r\n    @keyframes runeMagicRightSpriteSheetAnimation { /* 30 frames of 22px plus one null frame */\r\n      0%    { background-position-y: 24px; }\r\n      100%  { background-position-y: -720px; }\r\n    }\r\n  </style>\r\n  <div class="lol-uikit-primary-magic-button-wrapper">\r\n    <div class="button-frame-idle"></div>\r\n    <div class="button-frame-interactive"></div>\r\n\r\n    <div class="left-rune-magic"></div>\r\n    <div class="right-rune-magic"></div>\r\n\r\n    <div class="radial-container">\r\n      <div class="radial-effect"></div>\r\n    </div>\r\n\r\n\r\n    <lol-uikit-animated-border-overlay\r\n      class="border-animation-container"\r\n      speed=15000>\r\n    </lol-uikit-animated-border-overlay>\r\n    <div class="lol-uikit-primary-magic-button">\r\n      <slot></slot>\r\n    </div>\r\n  </div>\r\n</template>\r\n'
        }, (t, e, n) => {
            var i = n(9),
                o = n(10)(i);
            o.push([t.id, ".lol-uikit-primary-magic-button-wrapper .lol-uikit-primary-magic-button {\n  font-family: var(--font-display);\n}\n.lol-uikit-primary-magic-button-wrapper .lol-uikit-primary-magic-button {\n  -webkit-user-select: none;\n}\n.lol-uikit-primary-magic-button-wrapper .lol-uikit-primary-magic-button {\n  font-kerning: normal;\n  -webkit-font-feature-settings: \"kern\" 1;\n  -webkit-font-smoothing: antialiased;\n}\n.lol-uikit-primary-magic-button-wrapper.disabled .lol-uikit-primary-magic-button {\n  text-transform: uppercase;\n}\n.lol-uikit-primary-magic-button-wrapper.disabled .lol-uikit-primary-magic-button:lang(ko-kr),\n.lol-uikit-primary-magic-button-wrapper.disabled .lol-uikit-primary-magic-button:lang(ja-jp),\n.lol-uikit-primary-magic-button-wrapper.disabled .lol-uikit-primary-magic-button:lang(tr-tr),\n.lol-uikit-primary-magic-button-wrapper.disabled .lol-uikit-primary-magic-button:lang(el-gr),\n.lol-uikit-primary-magic-button-wrapper.disabled .lol-uikit-primary-magic-button:lang(th-th),\n.lol-uikit-primary-magic-button-wrapper.disabled .lol-uikit-primary-magic-button:lang(zh-tw) {\n  text-transform: none;\n}\n.lol-uikit-primary-magic-button-wrapper .lol-uikit-primary-magic-button {\n  color: #c8aa6e;\n  font-size: 14px;\n  font-weight: 700;\n  letter-spacing: 0.0325em;\n}\n.lol-uikit-primary-magic-button-wrapper .lol-uikit-primary-magic-button:lang(ar-ae) {\n  letter-spacing: 0;\n}\n.lol-uikit-primary-magic-button-wrapper .lol-uikit-primary-magic-button:hover {\n  color: #f0e6d2;\n}\n.lol-uikit-primary-magic-button-wrapper .lol-uikit-primary-magic-button:disabled,\n.lol-uikit-primary-magic-button-wrapper .lol-uikit-primary-magic-button:disabled:hover,\n.lol-uikit-primary-magic-button-wrapper .lol-uikit-primary-magic-button[disabled='true'],\n.lol-uikit-primary-magic-button-wrapper .lol-uikit-primary-magic-button[disabled='true']:hover {\n  color: #5c5b57;\n  cursor: default;\n}\n.lol-uikit-primary-magic-button-wrapper .lol-uikit-primary-magic-button:active {\n  color: #785a28;\n}\n:host {\n  height: 32px;\n}\n:host.disabled,\n:host[disabled=disabled],\n:host:disabled {\n  cursor: default;\n  pointer-events: none;\n}\n.lol-uikit-primary-magic-button-wrapper {\n  display: flex;\n  height: 100%;\n  position: relative;\n  min-width: inherit;\n  width: inherit;\n  cursor: pointer;\n}\n.lol-uikit-primary-magic-button-wrapper .lol-uikit-primary-magic-button {\n  display: flex;\n  position: relative;\n  flex-direction: column;\n  justify-content: center;\n  width: 100%;\n  padding: 0 1.3em;\n  color: #3c3c41;\n  text-align: center;\n  box-sizing: border-box;\n  border: 2px solid transparent;\n  overflow: hidden;\n  transition: 300ms all linear;\n}\n.lol-uikit-primary-magic-button-wrapper .button-frame-idle,\n.lol-uikit-primary-magic-button-wrapper .button-frame-interactive {\n  display: block;\n  position: absolute;\n  width: 100%;\n  height: 100%;\n  box-sizing: border-box;\n  transition: 300ms all linear;\n}\n.lol-uikit-primary-magic-button-wrapper .button-frame-idle::before,\n.lol-uikit-primary-magic-button-wrapper .button-frame-interactive::before,\n.lol-uikit-primary-magic-button-wrapper .button-frame-idle::after,\n.lol-uikit-primary-magic-button-wrapper .button-frame-interactive::after {\n  content: '';\n  position: absolute;\n  width: 100%;\n  height: 100%;\n  top: 0;\n  left: 0;\n  box-sizing: border-box;\n  box-shadow: 0 0 1px rgba(1,10,19,0.25), inset 0 0 1px rgba(1,10,19,0.25);\n}\n.lol-uikit-primary-magic-button-wrapper .button-frame-idle {\n  opacity: 1;\n}\n.lol-uikit-primary-magic-button-wrapper .button-frame-idle::before,\n.lol-uikit-primary-magic-button-wrapper .button-frame-idle::after {\n  transition: 300ms all linear;\n}\n.lol-uikit-primary-magic-button-wrapper .button-frame-idle::before {\n  opacity: 1;\n  border: 2px solid #3c3c41;\n}\n.lol-uikit-primary-magic-button-wrapper .button-frame-idle::after {\n  opacity: 0;\n  border: 2px solid transparent;\n  border-image: linear-gradient(to top, #005a82 0%, #0596aa 44%, #0596aa 93%, #0ac8b9 100%) 2 stretch;\n}\n.lol-uikit-primary-magic-button-wrapper .button-frame-interactive {\n  opacity: 0;\n}\n.lol-uikit-primary-magic-button-wrapper .button-frame-interactive::before,\n.lol-uikit-primary-magic-button-wrapper .button-frame-interactive::after {\n  transition: 300ms all linear;\n}\n.lol-uikit-primary-magic-button-wrapper .button-frame-interactive::before {\n  opacity: 1;\n  border: 3px solid;\n  border-image: linear-gradient(to top, #3295c7 0%, #0ac8b9 49%, #cdfafa 100%) 2 stretch;\n}\n.lol-uikit-primary-magic-button-wrapper .button-frame-interactive::after {\n  opacity: 0;\n  border: 2px solid transparent;\n  border-image: linear-gradient(to top, #005a82 0%, #005a82 83%, #005a82 100%) 2 stretch;\n}\n.lol-uikit-primary-magic-button-wrapper .radial-container {\n  display: block;\n  width: 0;\n  height: 0;\n  pointer-events: none;\n}\n.lol-uikit-primary-magic-button-wrapper .radial-container .radial-effect {\n  display: none;\n  position: absolute;\n  width: 100%;\n  height: 100%;\n  padding: 3px;\n  box-sizing: border-box;\n  overflow: hidden;\n  -webkit-mask-image: linear-gradient(to right, #000, #000);\n}\n.lol-uikit-primary-magic-button-wrapper .radial-container .radial-effect::after {\n  content: '';\n  display: block;\n  position: absolute;\n  width: 100%;\n  height: 120px;\n  top: -120px;\n  opacity: 0.1;\n  background-image: radial-gradient(ellipse closest-side, #a2ffff 40%, #6cfcff 60%, transparent 90%);\n  background-position: center;\n}\n.lol-uikit-primary-magic-button-wrapper .border-animation-container {\n  display: block;\n  position: absolute;\n  width: 100%;\n  height: 100%;\n  top: 0;\n  left: 0;\n  opacity: 0.01;\n  transition: 300ms opacity linear;\n  pointer-events: none;\n}\n.lol-uikit-primary-magic-button-wrapper .left-rune-magic,\n.lol-uikit-primary-magic-button-wrapper .right-rune-magic {\n  position: absolute;\n  pointer-events: inherit;\n  background-repeat: no-repeat;\n}\n.lol-uikit-primary-magic-button-wrapper .left-rune-magic {\n  width: 44px;\n  height: 22px;\n  left: 0;\n  bottom: 0;\n  background-image: url(\"/fe/lol-uikit/images/magic-button-left-runes-44x22-29F30F29F.png\");\n  background-position: 100px 100px;\n}\n.lol-uikit-primary-magic-button-wrapper .right-rune-magic {\n  width: 62px;\n  height: 22px;\n  right: 0;\n  top: 0;\n  background-image: url(\"/fe/lol-uikit/images/magic-button-right-runes-62x22-25F30F29F.png\");\n  background-position: 100px 100px;\n}\n.lol-uikit-primary-magic-button-wrapper.disabled {\n  cursor: default;\n  pointer-events: none;\n}\n.lol-uikit-primary-magic-button-wrapper.disabled .lol-uikit-primary-magic-button {\n  color: #5c5b57;\n  font-size: 14px;\n  box-shadow: 0 0 1px 1px #010a13, inset 0 0 1px 1px #010a13;\n  background-color: #1e2328;\n  border: 2px solid #5c5b57;\n}\n.lol-uikit-primary-magic-button-wrapper.intro .border-animation-container,\n.lol-uikit-primary-magic-button-wrapper.hover .border-animation-container,\n.lol-uikit-primary-magic-button-wrapper.click .border-animation-container {\n  opacity: 1;\n}\n.lol-uikit-primary-magic-button-wrapper.intro .radial-container .radial-effect,\n.lol-uikit-primary-magic-button-wrapper.hover .radial-container .radial-effect,\n.lol-uikit-primary-magic-button-wrapper.click .radial-container .radial-effect {\n  display: block;\n}\n.lol-uikit-primary-magic-button-wrapper.intro .radial-container .radial-effect::after,\n.lol-uikit-primary-magic-button-wrapper.hover .radial-container .radial-effect::after,\n.lol-uikit-primary-magic-button-wrapper.click .radial-container .radial-effect::after {\n  animation: radialEffectTransition 700ms forwards ease-out;\n}\n.lol-uikit-primary-magic-button-wrapper.intro .left-rune-magic,\n.lol-uikit-primary-magic-button-wrapper.hover .left-rune-magic,\n.lol-uikit-primary-magic-button-wrapper.click .left-rune-magic {\n  animation: runeMagicLeftSpriteSheetAnimation 500ms forwards steps(31);\n}\n.lol-uikit-primary-magic-button-wrapper.intro .right-rune-magic,\n.lol-uikit-primary-magic-button-wrapper.hover .right-rune-magic,\n.lol-uikit-primary-magic-button-wrapper.click .right-rune-magic {\n  animation: runeMagicRightSpriteSheetAnimation 500ms forwards steps(31);\n}\n.lol-uikit-primary-magic-button-wrapper.intro .button-frame-idle {\n  background-color: rgba(30,35,40,0.5);\n  animation: backgroundIntro 1000ms ease-out;\n  transition: 800ms all ease-out;\n}\n.lol-uikit-primary-magic-button-wrapper.intro .button-frame-idle::before {\n  opacity: 0;\n}\n.lol-uikit-primary-magic-button-wrapper.intro .button-frame-idle::after {\n  opacity: 1;\n}\n.lol-uikit-primary-magic-button-wrapper.intro .lol-uikit-primary-magic-button {\n  color: #a3c7c7;\n  transition: 800ms all ease-out;\n  animation: introText 700ms forwards ease-in;\n}\n.lol-uikit-primary-magic-button-wrapper.intro .left-rune-magic {\n  background-position-x: 0;\n}\n.lol-uikit-primary-magic-button-wrapper.intro .right-rune-magic {\n  background-position-x: 0;\n}\n.lol-uikit-primary-magic-button-wrapper.idle .button-frame-idle {\n  opacity: 1;\n  background-color: rgba(30,35,40,0.5);\n}\n.lol-uikit-primary-magic-button-wrapper.idle .button-frame-idle::before,\n.lol-uikit-primary-magic-button-wrapper.idle .button-frame-idle::after {\n  transition: 300ms all linear;\n}\n.lol-uikit-primary-magic-button-wrapper.idle .button-frame-idle::before {\n  opacity: 0;\n}\n.lol-uikit-primary-magic-button-wrapper.idle .button-frame-idle::after {\n  opacity: 1;\n}\n.lol-uikit-primary-magic-button-wrapper.idle .button-frame-interactive {\n  opacity: 0;\n  transition: 300ms all linear;\n}\n.lol-uikit-primary-magic-button-wrapper.idle .button-frame-interactive::before {\n  opacity: 0;\n}\n.lol-uikit-primary-magic-button-wrapper.idle .button-frame-interactive::after {\n  opacity: 0;\n}\n.lol-uikit-primary-magic-button-wrapper.idle .lol-uikit-primary-magic-button {\n  color: #a3c7c7;\n}\n.lol-uikit-primary-magic-button-wrapper.hover .button-frame-idle {\n  background-color: rgba(30,35,40,0.5);\n  opacity: 0;\n}\n.lol-uikit-primary-magic-button-wrapper.hover .button-frame-interactive {\n  background-color: rgba(30,35,40,0.5);\n  opacity: 1;\n}\n.lol-uikit-primary-magic-button-wrapper.hover .button-frame-interactive::before,\n.lol-uikit-primary-magic-button-wrapper.hover .button-frame-interactive::after {\n  box-shadow: inset 0 -10px 20px rgba(5,150,170,0.5);\n}\n.lol-uikit-primary-magic-button-wrapper.hover .button-frame-interactive::before {\n  opacity: 1;\n}\n.lol-uikit-primary-magic-button-wrapper.hover .button-frame-interactive::after {\n  opacity: 0;\n}\n.lol-uikit-primary-magic-button-wrapper.hover .lol-uikit-primary-magic-button {\n  color: #cdfafa;\n}\n.lol-uikit-primary-magic-button-wrapper.hover .left-rune-magic {\n  background-position-x: -44px;\n}\n.lol-uikit-primary-magic-button-wrapper.hover .right-rune-magic {\n  background-position-x: -62px;\n}\n.lol-uikit-primary-magic-button-wrapper.click .button-frame-idle,\n.lol-uikit-primary-magic-button-wrapper.down .button-frame-idle {\n  opacity: 0;\n}\n.lol-uikit-primary-magic-button-wrapper.click .button-frame-interactive,\n.lol-uikit-primary-magic-button-wrapper.down .button-frame-interactive {\n  opacity: 1;\n}\n.lol-uikit-primary-magic-button-wrapper.click .button-frame-interactive::before,\n.lol-uikit-primary-magic-button-wrapper.down .button-frame-interactive::before,\n.lol-uikit-primary-magic-button-wrapper.click .button-frame-interactive::after,\n.lol-uikit-primary-magic-button-wrapper.down .button-frame-interactive::after {\n  box-shadow: inset 0 -10px 20px rgba(5,150,170,0);\n}\n.lol-uikit-primary-magic-button-wrapper.click .button-frame-interactive::before,\n.lol-uikit-primary-magic-button-wrapper.down .button-frame-interactive::before {\n  opacity: 0;\n}\n.lol-uikit-primary-magic-button-wrapper.click .button-frame-interactive::after,\n.lol-uikit-primary-magic-button-wrapper.down .button-frame-interactive::after {\n  opacity: 1;\n}\n.lol-uikit-primary-magic-button-wrapper.click .left-rune-magic,\n.lol-uikit-primary-magic-button-wrapper.down .left-rune-magic {\n  background-position-x: -88px;\n}\n.lol-uikit-primary-magic-button-wrapper.click .right-rune-magic,\n.lol-uikit-primary-magic-button-wrapper.down .right-rune-magic {\n  background-position-x: -124px;\n}\n.lol-uikit-primary-magic-button-wrapper.down .border-animation-container {\n  opacity: 0.5;\n}\n.lol-uikit-primary-magic-button-wrapper.down .button-frame-interactive {\n  box-shadow: inset 0 -10px 20px rgba(5,150,170,0.5);\n}\n.lol-uikit-primary-magic-button-wrapper.down .lol-uikit-primary-magic-button {\n  color: #005a82;\n}\n.lol-uikit-primary-magic-button-wrapper.click .button-frame-interactive {\n  animation: backgroundClick 800ms ease-out;\n}\n.lol-uikit-primary-magic-button-wrapper.click .lol-uikit-primary-magic-button {\n  transition: 500ms all ease-out;\n  color: #005a82;\n}\n", ""]), t.exports = o
        }, (t, e, n) => {
            "use strict";
            Object.defineProperty(e, "__esModule", {
                value: !0
            }), e.default = void 0;
            var i = n(16),
                o = n(17),
                r = n(18),
                s = n(1),
                a = d(n(19)),
                l = d(n(20));

            function d(t) {
                return t && t.__esModule ? t : {
                    default: t
                }
            }
            class c extends s.webComponents.ShadowElement {
                static get observedAttributes() {
                    return ["disabled", "rp", "be", "rp-value", "be-value", "hover-sfx-src", "click-sfx-src"]
                }
                templateMarkup() {
                    return n(180)
                }
                stylesheetMarkup() {
                    return n(181)
                }
                constructor() {
                    super(), this.setMouseEvents()
                }
                _createSound(t) {
                    return (0, o.createSound)("sfx-ui", t, {
                        allowConcurrency: !1
                    })
                }
                setMouseEvents() {
                    const t = this.shadowRoot;
                    this.mouseover = this.sendMouseEvent.bind(this, "hover", "hover"), this.mouseout = this.sendMouseEvent.bind(this, "out", "idle"), this.mousedown = (0, i.leftClickHandler)(this.sendMouseEvent.bind(this, "down", "down")), this.click = (0, i.leftClickHandler)(this.sendMouseEvent.bind(this, "click", "click")), t.addEventListener("mouseover", this.mouseover), t.addEventListener("mouseout", this.mouseout), t.addEventListener("mousedown", this.mousedown), t.addEventListener("click", this.click)
                }
                removeMouseEvents() {
                    const t = this.shadowRoot;
                    t.removeEventListener("mouseover", this.mouseover), t.removeEventListener("mouseout", this.mouseout), t.removeEventListener("mousedown", this.mousedown), t.removeEventListener("click", this.click)
                }
                sendMouseEvent(t, e) {
                    this.disabled || (this.setInteractionClass(e), "click" === t && (this.disableOnClick(), this._clickSound && this._clickSound.play()), "hover" === t && this._hoverSound && this._hoverSound.play())
                }
                disableOnClick() {
                    this.removeMouseEvents(), this.setInteractionClass("click"), window.setTimeout(function() {
                        this.setMouseEvents(), this.disabled ? this.setInteractionClass() : this.setInteractionClass("idle")
                    }.bind(this), 600)
                }
                setInteractionClass(t) {
                    const e = this.shadowRoot.querySelector(".lol-uikit-purchase-button");
                    null !== e && (["idle", "hover", "down", "click"].forEach((t => {
                        e.classList.remove(t)
                    })), t && e.classList.add(t))
                }
                connectedCallback() {
                    super.connectedCallback(), this.isAttached = !0, this.processAttributes({
                        event: "attached"
                    })
                }
                attributeChangedCallback() {
                    super.attributeChangedCallback(), this.processAttributes({
                        event: "changed"
                    })
                }
                processAttributes(t) {
                    super.processAttributes(), t = t || {}, this.setCustomSounds(), this.$button().toggleClass("rp", this.hasRP()), this.$button().toggleClass("be", this.hasBE()), this.updateCurrencyValues(), this.setDisabledDisplay()
                }
                setCustomSounds() {
                    const t = this.getAttribute("hover-sfx-src"),
                        e = this.getAttribute("click-sfx-src"),
                        n = t || l.default.purchaseButtonHover,
                        i = e || l.default.purchaseButtonClick;
                    this._hoverSound = this._createSound(n), this._clickSound = this._createSound(i)
                }
                setDisabledDisplay() {
                    this.$button().toggleClass("disabled", this.disabled), this.$buttonWrapper().toggleClass("disabled", this.disabled)
                }
                updateCurrencyValues() {
                    this.$currencyValue("rp").text(this.getAttribute("rp-value")), this.$currencyValue("be").text(this.getAttribute("be-value"))
                }
                $root() {
                    return (0, a.default)(this.shadowRoot)
                }
                $currencyValue(t) {
                    return this.$root().find(`.lol-uikit-purchase-button-content-value.${t}`)
                }
                $button() {
                    return this.$root().find(".lol-uikit-purchase-button")
                }
                $buttonWrapper() {
                    return this.$root().find(".lol-uikit-purchase-button-wrapper")
                }
                $buttonInner() {
                    return this.$root().find(".lol-uikit-purchase-button-inner")
                }
                hasRP() {
                    return (0, r.isAttrTruthy)("rp", this.getAttribute("rp"))
                }
                hasBE() {
                    return (0, r.isAttrTruthy)("be", this.getAttribute("be"))
                }
                isAttachedOrChanged(t) {
                    return "attached" === t || "changed" === t && this.isAttached
                }
                width() {
                    return this.shadowRoot.firstElementChild.offsetWidth
                }
            }
            Object.defineProperty(c.prototype, "disabled", {
                enumerable: !0,
                get: function() {
                    return (0, r.isAttrTruthy)("disabled", this.getAttribute("disabled"))
                },
                set: function(t) {
                    t ? this.setAttribute("disabled", "disabled") : this.removeAttribute("disabled")
                }
            }), c.tagName = "lol-uikit-purchase-button";
            var u = c;
            e.default = u
        }, t => {
            "use strict";
            t.exports = '<template>\r\n  <div class="lol-uikit-purchase-button-wrapper">\r\n    <div class="lol-uikit-purchase-button-inner">\r\n      <div class="lol-uikit-purchase-button">\r\n        <div class="lol-uikit-purchase-button-outer-border"></div>\r\n      \t<div class="lol-uikit-purchase-button-border-idle"></div>\r\n      \t<div class="lol-uikit-purchase-button-border-transition"></div>\r\n      \t<div class="lol-uikit-purchase-button-content-wrapper">\r\n          <span class="lol-uikit-purchase-button-content-icon rp"></span>\r\n          <p class="lol-uikit-purchase-button-content-value rp"></p>\r\n          <span class="lol-uikit-purchase-button-content-icon be">\r\n            <div class="be-icon"></div>\r\n          </span>\r\n          <p class="lol-uikit-purchase-button-content-value be"></p>\r\n          <slot />\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</template>\r\n'
        }, (t, e, n) => {
            var i = n(9),
                o = n(10)(i);
            o.push([t.id, '.lol-uikit-purchase-button {\n  font-family: var(--font-display);\n}\n.lol-uikit-purchase-button {\n  font-family: var(--font-display);\n}\n.lol-uikit-purchase-button {\n  text-transform: uppercase;\n}\n.lol-uikit-purchase-button:lang(ko-kr),\n.lol-uikit-purchase-button:lang(ja-jp),\n.lol-uikit-purchase-button:lang(tr-tr),\n.lol-uikit-purchase-button:lang(el-gr),\n.lol-uikit-purchase-button:lang(th-th),\n.lol-uikit-purchase-button:lang(zh-tw) {\n  text-transform: none;\n}\n.lol-uikit-purchase-button-wrapper {\n  min-width: inherit;\n  width: inherit;\n  height: 100%;\n  box-shadow: 0 0 1px 1px #010a13;\n}\n.lol-uikit-purchase-button-inner {\n  height: 100%;\n}\n.lol-uikit-purchase-button {\n  color: #cdbe91;\n  font-size: 14px;\n  font-weight: bold;\n  letter-spacing: 1px;\n  position: relative;\n  display: flex;\n  align-items: center;\n  box-sizing: border-box;\n  justify-content: center;\n  white-space: nowrap;\n  padding: 5px 2.5em;\n  height: 100%;\n  min-height: 32px;\n  cursor: pointer;\n  -webkit-user-select: none;\n  box-shadow: 0 0 0 2px #010a13, inset 0 0 0 1px rgba(1,10,19,0.35);\n  background: linear-gradient(to bottom, #25221b 0%, #433b2b 100%);\n  border: 2px solid transparent;\n/* Border Element Idle - used for defaut border gradient on purchase button */\n/* Border Element Transition - used for transitional border gradient for different states */\n/* State classes defined below are done so via JS in index.js by the `setInteractionClass` function */\n/* Hover State - onmouseover */\n/* Down State - onmousedown  */\n/* Click State - on click */\n/* Disabled - on disabled="true" */\n}\n.lol-uikit-purchase-button * {\n  pointer-events: none;\n}\n.lol-uikit-purchase-button .lol-uikit-purchase-button-outer-border {\n  position: absolute;\n  top: -5px;\n  right: -5px;\n  bottom: -5px;\n  left: -5px;\n  border: thin solid transparent;\n  border-image: linear-gradient(to bottom, #413722 4%, #5b4a25 23%, #907d53 88%, #5f5031 100%);\n  border-image-slice: 1;\n}\n.lol-uikit-purchase-button .lol-uikit-purchase-button-content-icon {\n  display: none;\n  position: relative;\n  top: 3px;\n  margin-right: 2px;\n}\n.lol-uikit-purchase-button .lol-uikit-purchase-button-content-icon.rp {\n  background: url("/fe/lol-static-assets/images/icon-rp-gradient-32.png") center center no-repeat;\n  width: 18px;\n  height: 18px;\n  background-size: contain;\n}\n.lol-uikit-purchase-button .lol-uikit-purchase-button-content-value {\n  display: none;\n  margin-top: 0px;\n  margin-bottom: 0px;\n}\n.lol-uikit-purchase-button .lol-uikit-purchase-button-border-idle {\n  position: absolute;\n  top: -2px;\n  left: -2px;\n  width: 100%;\n  height: 100%;\n  opacity: 1;\n  border: 2px solid transparent;\n  border-image: linear-gradient(to top, #785b28 0%, #c89c3c 55%, #c8a355 71%, #c8aa6e 100%);\n  border-image-slice: 1;\n  transition: opacity 300ms linear;\n}\n.lol-uikit-purchase-button .lol-uikit-purchase-button-border-transition {\n  position: absolute;\n  top: -2px;\n  left: -2px;\n  width: 100%;\n  height: 100%;\n  opacity: 0;\n  border: 2px solid transparent;\n}\n.lol-uikit-purchase-button.rp {\n  padding: 4px 2.5em;\n}\n.lol-uikit-purchase-button.rp .lol-uikit-purchase-button-content-icon.rp {\n  display: inline-block;\n}\n.lol-uikit-purchase-button.rp .lol-uikit-purchase-button-content-value.rp {\n  display: inline-block;\n}\n.lol-uikit-purchase-button.be .lol-uikit-purchase-button-content-icon.be {\n  display: inline-block;\n}\n.lol-uikit-purchase-button.be .lol-uikit-purchase-button-content-icon.be .be-icon {\n  width: 15px;\n  height: 15px;\n  background-image: url("/fe/lol-uikit/images/store-be.png");\n  background-position: center;\n  background-repeat: no-repeat;\n  background-size: contain;\n}\n.lol-uikit-purchase-button.be .lol-uikit-purchase-button-content-value.be {\n  display: inline-block;\n}\n.lol-uikit-purchase-button.hover {\n  color: #f0e6d2;\n  background: linear-gradient(to bottom, #29251d 0%, #655431 100%);\n}\n.lol-uikit-purchase-button.hover.disabled {\n  color: #5c5b57;\n  animation: none;\n}\n.lol-uikit-purchase-button.down {\n  color: #a09b8c;\n}\n.lol-uikit-purchase-button.down .lol-uikit-purchase-button-outer-border {\n  border-image: none;\n  border-color: #413722;\n}\n.lol-uikit-purchase-button.down .lol-uikit-purchase-button-border-idle {\n  border-image: none;\n  border-color: #6a502b;\n}\n.lol-uikit-purchase-button.disabled {\n  cursor: default;\n  color: #5b5a56;\n  background: #1e2328;\n  border: 2px solid #5b5a56;\n  border-image: initial;\n  transition: all 300ms linear;\n}\n.lol-uikit-purchase-button.disabled .lol-uikit-purchase-button-outer-border {\n  border-image: none;\n  border-color: #5c5b57;\n}\n.lol-uikit-purchase-button.disabled .lol-uikit-purchase-button-border-transition {\n  transition: opacity 300ms linear;\n  opacity: 0;\n}\n.lol-uikit-purchase-button.disabled .lol-uikit-purchase-button-border-idle {\n  opacity: 0;\n}\n.lol-uikit-purchase-button.no-min-height {\n  min-height: 0;\n}\n', ""]), t.exports = o
        }, (t, e, n) => {
            "use strict";
            Object.defineProperty(e, "__esModule", {
                value: !0
            }), e.default = void 0;
            var i, o = (i = n(183)) && i.__esModule ? i : {
                    default: i
                },
                r = n(1);
            const s = "summoner",
                a = "champion",
                l = "type",
                d = "percent",
                c = "start-angle",
                u = "end-angle",
                p = [s, a, "blue", "pink", "white", "custom"],
                h = {
                    percent: 0,
                    animateFillDuration: 1,
                    animateStartDelay: 0
                };
            class m extends r.webComponents.ShadowElement {
                templateMarkup() {
                    return n(184)
                }
                stylesheetMarkup() {
                    return n(185)
                }
                constructor() {
                    super(), this._type = s, this._percent = 0, this._mutationObserver = new MutationObserver((() => {
                        this._triggerMaskGeneration()
                    })), this._startMutationObserver()
                }
                _startMutationObserver() {
                    this._mutationObserver.observe(this, {
                        attributes: !0,
                        childList: !0,
                        subtree: !0,
                        attributeFilter: ["percent"]
                    })
                }
                static get observedAttributes() {
                    return [l, d, c, u]
                }
                attributeChangedCallback(t, e, n) {
                    switch (t) {
                        case l:
                            this._setType(n);
                            break;
                        case d:
                            this._percent = this._sanitizePercent(n);
                            break;
                        case c:
                            this._polygonGen.setStartAngle(n);
                            break;
                        case u:
                            this._polygonGen.setEndAngle(n)
                    }
                    this._triggerMaskGeneration()
                }
                render() {
                    super.render(), this._polygonGen = new o.default, this._percent = this._sanitizePercent(this.getAttribute(d)), this._setType(this.getAttribute(l)), this._polygonGen.setStartAngle(this.getAttribute(c)), this._polygonGen.setEndAngle(this.getAttribute(u)), this._triggerMaskGeneration()
                }
                animateFill(t) {
                    const e = Array.from(this.querySelectorAll("div.middle")),
                        n = [];
                    return e.forEach(((e, i) => {
                        const o = Object.assign({}, h, t[i] || {});
                        n.push(o)
                    })), this._triggerMaskGeneration(n)
                }
                _setType(t) {
                    t && -1 !== p.indexOf(t) ? (this._type = t, this._setDefaultAngles()) : this._type = s
                }
                _setDefaultAngles() {
                    this._type === a && (this.getAttribute(c) || this._polygonGen.setStartAngle("80deg"), this.getAttribute(u) || this._polygonGen.setEndAngle("-260deg"))
                }
                _sanitizePercent(t) {
                    return t ? (t = Number.parseFloat(t), isNaN(t) ? 0 : Math.min(Math.max(t, 0), 100)) : 0
                }
                _triggerMaskGeneration(t = []) {
                    const e = this.shadowRoot.querySelector(".middle-layer"),
                        n = Array.from(this.querySelectorAll("div.middle"));
                    if (n.length > 1) {
                        let i = 0,
                            s = this._polygonGen.startAngle;
                        const a = 3 * Math.PI / 2 - this._polygonGen.startAngle,
                            l = this._polygonGen.endAngle - this._polygonGen.startAngle;
                        return new Promise((c => {
                            const u = new r.gsap.TimelineLite({
                                paused: !0,
                                onComplete: c
                            });
                            n.forEach(((e, n) => {
                                const r = Number(e.getAttribute(d)),
                                    c = new o.default;
                                c.startAngle = s, c.endAngle = s + l;
                                const p = c.generatePolygon(r);
                                if (e.style.position = "absolute", e.style.webkitClipPath = p, t[n] && r > 0) {
                                    const o = e.querySelector(".mask-container.left-half img"),
                                        s = e.querySelector(".mask-container.right-half img"),
                                        {
                                            animateFillDuration: d
                                        } = t[n],
                                        {
                                            animateStartDelay: c
                                        } = t[n];
                                    this._animateFillPercent(u, o, s, i, r, l, a, d, c)
                                }
                                s = c.getAngleFromPercent({
                                    percent: r
                                }), i += r
                            })), e.style.webkitClipPath = "", u.play()
                        }))
                    }
                    return e.style.webkitClipPath = this._polygonGen.generatePolygon(this._percent), Promise.resolve()
                }
                _animateFillPercent(t, e, n, i, o, r, s, a, l) {
                    if (i + o <= 50) {
                        const n = i / 100 * Math.abs(r) + s,
                            d = (i + o) / 100 * Math.abs(r) + s;
                        t.fromTo(e, a, {
                            rotation: `${n}rad`
                        }, {
                            rotation: `${d}rad`,
                            ease: "Linear.easeNone"
                        }, `+=${l}`)
                    } else if (i >= 50) {
                        const e = (i - 50) / 100 * Math.abs(r),
                            s = (i + o - 50) / 100 * Math.abs(r);
                        t.fromTo(n, a, {
                            rotation: `${e}rad`
                        }, {
                            rotation: `${s}rad`,
                            ease: "Linear.easeNone"
                        }, `+=${l}`)
                    } else {
                        const d = i / 100 * Math.abs(r) + s,
                            c = a * (50 - i) / o;
                        t.fromTo(e, c, {
                            rotation: `${d}rad`
                        }, {
                            rotation: 180,
                            ease: "Linear.easeNone"
                        }, `+=${l}`);
                        const u = (i + o - 50) / 100 * Math.abs(r),
                            p = a * (i + o - 50) / o;
                        t.fromTo(n, p, {
                            rotation: 0
                        }, {
                            rotation: `${u}rad`,
                            ease: "Linear.easeNone"
                        }, "+=0")
                    }
                }
            }
            m.tagName = "lol-uikit-radial-progress";
            var g = m;
            e.default = g
        }, (t, e) => {
            "use strict";
            Object.defineProperty(e, "__esModule", {
                value: !0
            }), e.default = void 0;
            const n = Math.PI;
            var i = class {
                constructor() {
                    this.startAngle = n / 2, this.endAngle = -1.5 * n
                }
                setStartAngle(t) {
                    (t || 0 === t) && (this.startAngle = this.convertAngle(t))
                }
                setEndAngle(t) {
                    (t || 0 === t) && (this.endAngle = this.convertAngle(t))
                }
                convertAngle(t = 0) {
                    return "string" == typeof t && t.indexOf("rad") > -1 ? parseFloat(t) : parseFloat(t) * n / 180
                }
                normalizeAngle(t = 0) {
                    return (t % (2 * n) + 2 * n) % (2 * n)
                }
                getAngleFromPercent(t = {}) {
                    const {
                        percent: e,
                        startAngle: n = this.startAngle,
                        endAngle: i = this.endAngle
                    } = t;
                    return n + e / 100 * (i - n)
                }
                getPointOnSquare(t = 0) {
                    let e, i;
                    switch (t = this.normalizeAngle(t), !0) {
                        case t < n / 4:
                        case t >= 7 * n / 4:
                            e = 100, i = 50 - 50 * Math.tan(t);
                            break;
                        case t < 3 * n / 4:
                            e = 50 + 50 / Math.tan(t), i = 0;
                            break;
                        case t < 5 * n / 4:
                            e = 0, i = 50 + 50 * Math.tan(t);
                            break;
                        case t < 7 * n / 4:
                            e = 50 - 50 / Math.tan(t), i = 100
                    }
                    return e = Math.round(10 * e) / 10, i = Math.round(10 * i) / 10, {
                        xPos: e,
                        yPos: i
                    }
                }
                _calculatePolygonPoints(t) {
                    const e = [];
                    e.push({
                        xPos: 50,
                        yPos: 50
                    });
                    const {
                        startAngle: i
                    } = this, {
                        endAngle: o
                    } = this, r = this.getAngleFromPercent({
                        startAngle: i,
                        endAngle: o,
                        percent: t
                    });
                    let s, a;
                    if (e.push(this.getPointOnSquare(i)), r > i) {
                        s = Math.ceil(2 / n * i - .5), a = n / 4 * (2 * s + 1);
                        for (let t = 0; t < 4; t++) {
                            const i = a + t * n / 2;
                            if (!(i < r)) break;
                            e.push(this.getPointOnSquare(i))
                        }
                    } else {
                        s = Math.floor(2 * i / n - .5), a = n / 4 * (2 * s + 1);
                        for (let t = 0; t < 4; t++) {
                            const i = a - t * n / 2;
                            if (!(i > r)) break;
                            e.push(this.getPointOnSquare(i))
                        }
                    }
                    return e.push(this.getPointOnSquare(r)), e
                }
                generatePolygon(t) {
                    return `polygon(${this._calculatePolygonPoints(t).map((function(t){return`${t.xPos}% ${t.yPos}%`})).reduce((function(t,e){return`
                    $ {
                        t
                    }, $ {
                        e
                    }
                    `}))})`
                }
            };
            e.default = i
        }, t => {
            "use strict";
            t.exports = '<template>\r\n  \x3c!--\r\n    All elements for the radial progress are positioned as absolute\r\n    simulating a z-index superposition\r\n  --\x3e\r\n\r\n  \x3c!-- Contains all assets for the empty meter --\x3e\r\n  <div class="bottom-layer">\r\n    <slot name="bottom"></slot>\r\n  </div>\r\n\r\n  \x3c!--\r\n    Contains all assets that depends on the percentage\r\n    This layer will be affected by a mask that depends on the current percent\r\n  --\x3e\r\n  <div class="middle-layer masked-layer">\r\n    <slot name="middle"></slot>\r\n  </div>\r\n\r\n  \x3c!-- Anything that needs to be at the top --\x3e\r\n  <div class="top-layer">\r\n    <slot name="top"></slot>\r\n  </div>\r\n</template>\r\n'
        }, (t, e, n) => {
            var i = n(9),
                o = n(10)(i);
            o.push([t.id, ':host {\n  display: inline-block;\n  position: relative;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  min-width: 10px;\n  min-height: 10px;\n  margin: 0;\n  padding: 0;\n  border: 0;\n}\n.bottom-layer,\n.middle-layer,\n.top-layer {\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  margin: 0;\n  padding: 0;\n  border: 0;\n}\n.bottom-layer,\n.middle-layer {\n  background-color: transparent;\n  background-repeat: no-repeat;\n  background-size: contain;\n}\n.masked-layer {\n  webkit-clip-path: none;\n  clip-path: none;\n}\n:host([type="summoner"]) .bottom-layer {\n  background-image: url("/fe/lol-uikit/images/empty-meter-summoner.png");\n}\n:host([type="summoner"]) .middle-layer {\n  background-image: url("/fe/lol-uikit/images/full-meter-summoner.png");\n}\n:host([type="champion"]) .bottom-layer {\n  background-image: url("/fe/lol-uikit/images/empty-meter-champion.png");\n}\n:host([type="champion"]) .middle-layer {\n  background-image: url("/fe/lol-uikit/images/full-meter-champion.png");\n}\n:host([type="blue"]) .bottom-layer {\n  background-image: url("/fe/lol-uikit/images/empty-meter-blue.png");\n}\n:host([type="blue"]) .middle-layer {\n  background-image: url("/fe/lol-uikit/images/full-meter-blue.png");\n}\n:host([type="pink"]) .bottom-layer {\n  background-image: url("/fe/lol-uikit/images/empty-meter-pink.png");\n}\n:host([type="pink"]) .middle-layer {\n  background-image: url("/fe/lol-uikit/images/full-meter-pink.png");\n}\n:host([type="white"]) .bottom-layer {\n  background-image: url("/fe/lol-uikit/images/empty-meter-white.png");\n}\n:host([type="white"]) .middle-layer {\n  background-image: url("/fe/lol-uikit/images/full-meter-white.png");\n}\n:host([type="custom"]) .bottom-layer {\n  background-image: none;\n}\n:host([type="custom"]) .middle-layer {\n  background-image: none;\n}\n', ""]), t.exports = o
        }, (t, e, n) => {
            "use strict";
            Object.defineProperty(e, "__esModule", {
                value: !0
            }), e.default = void 0;
            var i = n(1);
            class o extends i.webComponents.ShadowElement {
                templateMarkup() {
                    return n(187)
                }
                stylesheetMarkup() {
                    return n(188)
                }
                constructor() {
                    super(), this.addEventListener("click", this._handleClick)
                }
                static get observedAttributes() {
                    return ["selected"]
                }
                processAttributes() {
                    this._selectedCheck()
                }
                isSelected() {
                    return null !== this.getAttribute("selected")
                }
                _selectedCheck() {
                    const t = (0, i.jQuery)(this.shadowRoot.querySelector("li"));
                    this.isSelected() ? (t.addClass("ui-radio-input-option-selected"), t.removeClass("ui-radio-input-option-unselected")) : (t.removeClass("ui-radio-input-option-selected"), t.addClass("ui-radio-input-option-unselected"))
                }
                _handleClick() {
                    (0, i.jQuery)(this).closest("lol-uikit-radio-input")[0].selectOption(this)
                }
            }
            o.tagName = "lol-uikit-radio-input-option";
            var r = o;
            e.default = r
        }, t => {
            "use strict";
            t.exports = '<template>\r\n    <li class="ui-radio-input-option"><slot></slot></li>\r\n</template>\r\n'
        }, (t, e, n) => {
            var i = n(79),
                o = n(10),
                r = n(80),
                s = n(189),
                a = o(i),
                l = r(s);
            a.push([t.id, ":host {\n  --radio-input-option-hover-background-color: transparent;\n  --radio-input-option-padding: 0;\n}\n:host li.ui-radio-input-option {\n  padding: var(--radio-input-option-padding);\n  margin: 0;\n  height: 36px;\n  display: flex;\n  align-items: center;\n  white-space: nowrap;\n  position: relative;\n  cursor: pointer;\n  color: #cdbe91;\n}\n:host li.ui-radio-input-option::before {\n  content: '';\n  width: 18px;\n  height: 18px;\n  margin-right: 7px;\n  background: url(" + l + ") center no-repeat;\n  background-position: 0px 0px;\n  background-size: 100%;\n}\n:host li.ui-radio-input-option:lang(ar-ae)::before {\n  margin: 0 0 0 7px;\n}\n:host li.ui-radio-input-option:hover {\n  color: #f0e6d2;\n  background-color: var(--radio-input-option-hover-background-color);\n}\n:host li.ui-radio-input-option.disabled {\n  color: #5c5b57;\n  cursor: default;\n}\n:host li.ui-radio-input-option:hover::before {\n  background-position: 0 -18px;\n}\n:host li.ui-radio-input-option:active::before {\n  background-position: 0 -36px;\n}\n:host li.ui-radio-input-option.disabled::before {\n  background-position: 0 -54px;\n}\n:host li.ui-radio-input-option.ui-radio-input-option-selected {\n  color: #f0e6d2;\n}\n:host li.ui-radio-input-option.ui-radio-input-option-selected::before {\n  background-position: 0 -72px;\n}\n:host li.ui-radio-input-option.ui-radio-input-option-selected:hover::before {\n  background-position: 0 -90px;\n}\n:host li.ui-radio-input-option.ui-radio-input-option-selected:active::before {\n  background-position: 0 -108px;\n}\n", "", {
                version: 3,
                sources: ["webpack://./fe/rcp-fe-lol-uikit/src/elements/radio-input-option/component-style.styl"],
                names: [],
                mappings: "AAAA;EACE,wDAAwD;EACxD,+BAA+B;AACjC;AACA;EACE,0CAA0C;EAC1C,SAAS;EACT,YAAY;EACZ,aAAa;EACb,mBAAmB;EACnB,mBAAmB;EACnB,kBAAkB;EAClB,eAAe;EACf,cAAc;AAChB;AACA;EACE,WAAW;EACX,WAAW;EACX,YAAY;EACZ,iBAAiB;EACjB,oEAAuD;EACvD,4BAA4B;EAC5B,qBAAqB;AACvB;AACA;EACE,iBAAiB;AACnB;AACA;EACE,cAAc;EACd,kEAAkE;AACpE;AACA;EACE,cAAc;EACd,eAAe;AACjB;AACA;EACE,4BAA4B;AAC9B;AACA;EACE,4BAA4B;AAC9B;AACA;EACE,4BAA4B;AAC9B;AACA;EACE,cAAc;AAChB;AACA;EACE,4BAA4B;AAC9B;AACA;EACE,4BAA4B;AAC9B;AACA;EACE,6BAA6B;AAC/B",
                sourcesContent: [":host {\n  --radio-input-option-hover-background-color: transparent;\n  --radio-input-option-padding: 0;\n}\n:host li.ui-radio-input-option {\n  padding: var(--radio-input-option-padding);\n  margin: 0;\n  height: 36px;\n  display: flex;\n  align-items: center;\n  white-space: nowrap;\n  position: relative;\n  cursor: pointer;\n  color: #cdbe91;\n}\n:host li.ui-radio-input-option::before {\n  content: '';\n  width: 18px;\n  height: 18px;\n  margin-right: 7px;\n  background: url(\"images/btn_icon.png\") center no-repeat;\n  background-position: 0px 0px;\n  background-size: 100%;\n}\n:host li.ui-radio-input-option:lang(ar-ae)::before {\n  margin: 0 0 0 7px;\n}\n:host li.ui-radio-input-option:hover {\n  color: #f0e6d2;\n  background-color: var(--radio-input-option-hover-background-color);\n}\n:host li.ui-radio-input-option.disabled {\n  color: #5c5b57;\n  cursor: default;\n}\n:host li.ui-radio-input-option:hover::before {\n  background-position: 0 -18px;\n}\n:host li.ui-radio-input-option:active::before {\n  background-position: 0 -36px;\n}\n:host li.ui-radio-input-option.disabled::before {\n  background-position: 0 -54px;\n}\n:host li.ui-radio-input-option.ui-radio-input-option-selected {\n  color: #f0e6d2;\n}\n:host li.ui-radio-input-option.ui-radio-input-option-selected::before {\n  background-position: 0 -72px;\n}\n:host li.ui-radio-input-option.ui-radio-input-option-selected:hover::before {\n  background-position: 0 -90px;\n}\n:host li.ui-radio-input-option.ui-radio-input-option-selected:active::before {\n  background-position: 0 -108px;\n}\n"],
                sourceRoot: ""
            }]), t.exports = a
        }, (t, e, n) => {
            "use strict";
            t.exports = n.p + "btn_icon.png"
        }, (t, e, n) => {
            "use strict";
            Object.defineProperty(e, "__esModule", {
                value: !0
            }), e.default = void 0;
            var i, o = n(1),
                r = (i = n(20)) && i.__esModule ? i : {
                    default: i
                };
            class s extends o.webComponents.ShadowElement {
                templateMarkup() {
                    return n(191)
                }
                stylesheetMarkup() {
                    return n(192)
                }
                constructor() {
                    super(), this.optionNodes = [], this.selected = !1, this._findSelected(), this._attachEvents()
                }
                selectOption(t) {
                    if (t !== this.selected) {
                        this.selected && this.selected.removeAttribute("selected"), t.setAttribute("selected", !0), this.selected = t;
                        const e = new Event("selected", {
                            bubbles: !0
                        });
                        e.selected = this.selected, this.dispatchEvent(e), this._playClickSound()
                    }
                }
                _findSelected() {
                    const t = this.querySelector("lol-uikit-radio-input-option[selected]");
                    t && (this.selected = t)
                }
                _attachEvents() {
                    new MutationObserver(this._handleDOMChange.bind(this)).observe(this, {
                        childList: !0
                    })
                }
                _handleDOMChange() {
                    this._findSelected()
                }
                _playClickSound() {
                    (0, o.getProvider)().get("rcp-fe-audio").getChannel("sfx-ui").playSound(r.default.radioInputClick)
                }
            }
            s.tagName = "lol-uikit-radio-input";
            var a = s;
            e.default = a
        }, t => {
            "use strict";
            t.exports = '<template>\r\n  <div class="ui-radio-input">\r\n    <ul class="ui-radio-input-options">\r\n      <slot></slot>\r\n    </ul>\r\n  </div>\r\n</template>\r\n'
        }, (t, e, n) => {
            var i = n(9),
                o = n(10)(i);
            o.push([t.id, ':host .ui-radio-input {\n  font-family: var(--font-body);\n}\n:host .ui-radio-input {\n  -webkit-user-select: none;\n}\n:host .ui-radio-input {\n  font-kerning: normal;\n  -webkit-font-feature-settings: "kern" 1;\n  -webkit-font-smoothing: antialiased;\n}\n:host .ui-radio-input {\n  color: #a09b8c;\n  font-size: 12px;\n  font-weight: normal;\n  line-height: 16px;\n  letter-spacing: 0.1em;\n  -webkit-font-smoothing: subpixel-antialiased;\n}\n:host .ui-radio-input:lang(ja-jp) {\n  font-size: 13px;\n}\n:host .ui-radio-input:lang(ar-ae) {\n  letter-spacing: 0;\n}\n:host {\n  display: inline-flex;\n  flex-direction: column;\n  width: 100%;\n}\n:host .ui-radio-input {\n  display: inline-flex;\n  flex-direction: column;\n  position: relative;\n  user-select: none;\n  margin: 0;\n  cursor: pointer;\n  width: 100%;\n}\n:host .ui-radio-input ul.ui-radio-input-options {\n  list-style: none;\n  margin: 0;\n  padding: 0;\n  box-sizing: border-box;\n  min-width: 100%;\n  display: var(--display, inherit);\n  flex-direction: var(--flex-direction, inherit);\n  justify-content: var(--justify-content, inherit);\n  align-items: var(--justify-content, inherit);\n  flex-wrap: var(--flex-wrap, inherit);\n  text-transform: var(--text-transform);\n}\n:host(:lang(ar-ae)) {\n  direction: rtl;\n}\n', ""]), t.exports = o
        }, (t, e) => {
            "use strict";
            Object.defineProperty(e, "__esModule", {
                value: !0
            }), e.default = function() {
                n || (n = document.createElement("canvas"));
                return n.getContext("2d")
            };
            let n = null
        }, (t, e, n) => {
            "use strict";
            Object.defineProperty(e, "__esModule", {
                value: !0
            }), e.default = void 0;
            var i, o = n(1),
                r = (i = n(193)) && i.__esModule ? i : {
                    default: i
                };
            const s = "data-max-width",
                a = "data-max-height",
                l = "data-multiline",
                d = "multiline";
            class c extends o.webComponents.ShadowElement {
                static get observedAttributes() {
                    return [s, a, l]
                }
                templateMarkup() {
                    return n(195)
                }
                connectedCallback() {
                    super.connectedCallback(), this._maxWidth = Number.parseInt(this.getAttribute(s), 10), this._maxHeight = Number.parseInt(this.getAttribute(a), 10), this._multiline = this.getAttribute(l), this._multiline && this.classList.add(d), this._computedStyle = window.getComputedStyle(this, null), this._preferredFontSize = Number.parseInt(this._computedStyle.getPropertyValue("font-size")), this._currentFontSize = this._preferredFontSize, this._fontFamily = this._computedStyle.getPropertyValue("font-family"), this._canvasContext = (0, r.default)(), this._textContentObserver = new MutationObserver((() => {
                        this.updateTextSize(this._multiline)
                    })), this._textContentObserver.observe(this, {
                        subtree: !0,
                        childList: !0,
                        characterData: !0
                    }), this._textFieldDimensionsObserver = new MutationObserver((() => {
                        this.onTextFieldDimensionsChanged()
                    })), this._textFieldDimensionsObserver.observe(this, {
                        attributeFilter: [s, a, l]
                    }), this.updateTextSize(this._multiline)
                }
                disconnectedCallback() {
                    super.disconnectedCallback(), this._textContentObserver.disconnect(), this._textFieldDimensionsObserver.disconnect()
                }
                onTextFieldDimensionsChanged() {
                    this._maxWidth = Number.parseInt(this.getAttribute(s), 10);
                    const t = this.getAttribute(l);
                    t ? (this._maxHeight = Number.parseInt(this.getAttribute(a), 10), this.classList.add(d)) : this.classList.remove(d), this.updateTextSize(t)
                }
                textFitsAllowedSpaceMultiLine(t) {
                    let e = 1,
                        n = 0,
                        i = "";
                    const o = t + 4,
                        r = this.textContent.split(" ");
                    for (; e * o <= this._maxHeight && n < r.length;) {
                        i += "" === i ? r[n] : ` ${r[n]}`;
                        this.measureTextWidth(t, this._fontFamily, i) > this._maxWidth ? (e++, i = "") : n++
                    }
                    return e * o <= this._maxHeight && n === r.length
                }
                textFitsAllowedSpace(t, e) {
                    if (t) return this.textFitsAllowedSpaceMultiLine(e);
                    return this.measureTextWidth(e, this._fontFamily, this.textContent) <= this._maxWidth
                }
                updateTextSize(t) {
                    (!this.textFitsAllowedSpace(t, this._currentFontSize) || this._currentFontSize < this._preferredFontSize) && this.resizeText()
                }
                measureTextWidth(t, e, n) {
                    return this._canvasContext.font = `${t}px ${e}`, this._canvasContext.measureText(n).width
                }
                calculateTextSizeThatFits(t) {
                    let e = 10,
                        n = t;
                    for (; e < n;) {
                        const t = Math.ceil(.5 * (e + n));
                        this.textFitsAllowedSpace(this._multiline, t) ? e = t : n = t - 1
                    }
                    return n
                }
                resizeText() {
                    this._currentFontSize = this.calculateTextSizeThatFits(this._preferredFontSize), this.style.fontSize = `${this._currentFontSize}px`
                }
            }
            c.tagName = "lol-uikit-resizing-text-field";
            var u = c;
            e.default = u
        }, t => {
            "use strict";
            t.exports = "<template>\r\n  <slot></slot>\r\n</template>\r\n"
        }, (t, e, n) => {
            "use strict";
            Object.defineProperty(e, "__esModule", {
                value: !0
            }), e.default = void 0;
            var i = n(1),
                o = n(18),
                r = n(171);
            class s extends i.webComponents.ShadowElement {
                templateMarkup() {
                    return n(197)
                }
                stylesheetMarkup() {
                    return n(198)
                }
                constructor() {
                    super(), this.sideScrollWheel = this.sideScrollWheel.bind(this), this.boundUpdateScrollingX = () => this.updateScrollingX(), this.isScrollingX = !1, this.xDirection = 0, this.targetScrollX = 0
                }
                connectedCallback() {
                    super.connectedCallback(), this.addEventListener("scroll", this.updateScrollableAttributes);
                    (0, o.isAttrTruthy)("side-scroll-wheel", this.getAttribute("side-scroll-wheel")) && this.addEventListener("wheel", this.sideScrollWheel, {
                        passive: !1
                    })
                }
                static get observedAttributes() {
                    return ["scrolled-bottom", "scrolled-top", "direction", "overflow-masks", "side-scroll-wheel"]
                }
                attributeChangedCallback() {
                    super.attributeChangedCallback(), this.getAttribute("scrolled-bottom") || this.getAttribute("scrolled-top") || (this.setAttribute("scrolled-bottom", !1), this.setAttribute("scrolled-top", !0))
                }
                updateScrollableAttributes() {
                    const t = this.getAttribute("direction"),
                        e = "true" === this.getAttribute("scrolled-top"),
                        n = "true" === this.getAttribute("scrolled-bottom"),
                        i = Number(this.getAttribute("buffer")) || 1,
                        {
                            scrollTop: o,
                            scrollLeft: r
                        } = this;
                    let s, a;
                    "horizontal" === t ? (s = r - i <= 0, a = r + this.offsetWidth + i >= this.scrollWidth) : (s = o - i <= 0, a = o + this.offsetHeight + i >= this.scrollHeight), e === s && n === a || (this.setAttribute("scrolled-top", s), this.setAttribute("scrolled-bottom", a), this.dispatchEvent(new CustomEvent("scroll-change", {
                        detail: {
                            scrolledTop: s,
                            scrolledBottom: a
                        }
                    })))
                }
                sideScrollWheel(t) {
                    let e = t.deltaY,
                        n = t.deltaX;
                    Math.abs(e) >= 0 && Math.abs(n) >= Math.abs(e) ? this.cancelScrolling() : (!e && t.detail && t.detail.deltaY && (e = t.detail.deltaY), !n && t.detail && t.detail.deltaX && (n = t.detail.deltaX), t.preventDefault(), t.stopPropagation(), this.smoothScrollByX(e))
                }
                calculateStepX(t, e) {
                    const n = .25 * t;
                    return e > 0 ? Math.max(n, 2) : Math.min(n, -2)
                }
                cancelScrolling() {
                    this.isScrollingX = !1
                }
                smoothScrollByX(t) {
                    if (0 === t) return;
                    const e = t > 0 ? 1 : -1;
                    this.isScrollingX && this.xDirection === e ? this.smoothScrollToX(this.targetScrollX + t) : this.smoothScrollToX(this.scrollLeft + t)
                }
                smoothScrollToX(t) {
                    (t = (0, r.clamp)(t, 0, this.scrollWidth - this.clientWidth)) !== this.scrollLeft ? (this.xDirection = t > this.scrollLeft ? 1 : -1, this.targetScrollX = t, !1 === this.isScrollingX && (window.requestAnimationFrame(this.boundUpdateScrollingX), this.isScrollingX = !0)) : this.isScrollingX = !1
                }
                updateScrollingX() {
                    if (!1 === this.isScrollingX) return;
                    const t = this.targetScrollX - this.scrollLeft;
                    let e = !1;
                    if (Math.abs(t) < 2) this.scrollLeft = this.targetScrollX, e = !0;
                    else {
                        const e = this.calculateStepX(t, this.xDirection);
                        this.scrollLeft += e
                    }
                    e ? this.isScrollingX = !1 : window.requestAnimationFrame(this.boundUpdateScrollingX)
                }
            }
            s.tagName = "lol-uikit-scrollable";
            var a = s;
            e.default = a
        }, t => {
            "use strict";
            t.exports = "<template>\r\n  <slot></slot>\r\n</template>\r\n"
        }, (t, e, n) => {
            var i = n(9),
                o = n(10)(i);
            o.push([t.id, ':host::-webkit-scrollbar,\n:host ::-webkit-scrollbar {\n  width: 11px;\n  height: 11px;\n  background-color: transparent;\n}\n:host::-webkit-scrollbar-thumb,\n:host ::-webkit-scrollbar-thumb {\n  border: 3px solid transparent;\n  border-radius: 6px;\n  background-clip: padding-box;\n  min-height: 32px;\n  background-color: #785a28;\n}\n:host::-webkit-scrollbar-thumb:hover,\n:host ::-webkit-scrollbar-thumb:hover {\n  background-color: #c8aa6e;\n}\n:host::-webkit-scrollbar-thumb:active,\n:host ::-webkit-scrollbar-thumb:active {\n  background-color: #463714;\n}\n:host::-webkit-scrollbar-thumb:disabled,\n:host ::-webkit-scrollbar-thumb:disabled {\n  background-color: #a09b8c;\n}\n:host {\n  display: block;\n  width: 100%;\n  height: 100%;\n  overflow: auto;\n  transform: translateZ(0);\n}\n:host(:not([direction="horizontal"])[overflow-masks="enabled"][scrolled-top="false"][scrolled-bottom="true"]) {\n  -webkit-mask-box-image-source: url("/fe/lol-static-assets/images/uikit/scrollable/scrollable-content-gradient-mask-top.png");\n  -webkit-mask-box-image-slice: 18 8 0 0 fill;\n}\n:host(:not([direction="horizontal"])[overflow-masks="enabled"][scrolled-top="true"][scrolled-bottom="false"]) {\n  -webkit-mask-box-image-source: url("/fe/lol-static-assets/images/uikit/scrollable/scrollable-content-gradient-mask-bottom.png");\n  -webkit-mask-box-image-slice: 0 8 18 0 fill;\n}\n:host(:not([direction="horizontal"])[overflow-masks="enabled"][scrolled-top="false"][scrolled-bottom="false"]) {\n  -webkit-mask-box-image-source: url("/fe/lol-static-assets/images/uikit/scrollable/scrollable-content-gradient-mask-both.png");\n  -webkit-mask-box-image-slice: 18 8 18 0 fill;\n}\n:host(:not([direction="horizontal"])[overflow-masks="bottom"][scrolled-top="true"][scrolled-bottom="false"],\n:not([direction="horizontal"])[overflow-masks="bottom"][scrolled-top="false"][scrolled-bottom="false"]) {\n  -webkit-mask-box-image-source: url("/fe/lol-static-assets/images/uikit/scrollable/scrollable-content-gradient-mask-bottom.png");\n  -webkit-mask-box-image-slice: 0 8 18 0 fill;\n}\n:host(:lang(ar-ae)) {\n  direction: rtl;\n}\n:host([direction="horizontal"]) {\n  display: flex;\n}\n:host([direction="horizontal"][overflow-masks="enabled"][scrolled-top="false"][scrolled-bottom="true"]) {\n  -webkit-mask-box-image-source: url("/fe/lol-static-assets/images/uikit/scrollable/scrollable-content-gradient-mask-left.png");\n/* top | right | bottom | left */\n  -webkit-mask-box-image-slice: 0 0 8 115 fill;\n}\n:host([direction="horizontal"][overflow-masks="enabled"][scrolled-top="true"][scrolled-bottom="false"]) {\n  -webkit-mask-box-image-source: url("/fe/lol-static-assets/images/uikit/scrollable/scrollable-content-gradient-mask-right.png");\n  -webkit-mask-box-image-slice: 0 115 8 0 fill;\n}\n:host([direction="horizontal"][overflow-masks="enabled"][scrolled-top="false"][scrolled-bottom="false"]) {\n  -webkit-mask-box-image-source: url("/fe/lol-static-assets/images/uikit/scrollable/scrollable-content-gradient-mask-both-horizontal.png");\n  -webkit-mask-box-image-slice: 0 115 8 115 fill;\n}\n:host([direction="horizontal"][overflow-masks="bottom"][scrolled-top="true"][scrolled-bottom="false"],\n[direction="horizontal"][overflow-masks="bottom"][scrolled-top="false"][scrolled-bottom="false"]) {\n  -webkit-mask-box-image-source: url("/fe/lol-static-assets/images/uikit/scrollable/scrollable-content-gradient-mask-right.png");\n  -webkit-mask-box-image-slice: 0 115 8 0 fill;\n}\n:host([show-on-hover="true"]) {\n  overflow: hidden;\n  padding-bottom: 11px;\n}\n:host([show-on-hover="true"]:hover) {\n  overflow: auto;\n  padding-bottom: 0;\n}\n', ""]), t.exports = o
        }, (t, e, n) => {
            "use strict";
            Object.defineProperty(e, "__esModule", {
                value: !0
            }), e.default = e.ANIMATION_SHOW = e.ANIMATION_KEYFRAME_MAPPING = e.ANIMATION_HIDE = e.ANIMATION_EVENT_FLOW = e.ANIMATION_EVENTS = void 0;
            var i = n(1);
            const o = "show";
            e.ANIMATION_SHOW = o;
            const r = "hide";
            e.ANIMATION_HIDE = r;
            const s = {
                    opacity: 0,
                    visbility: "hidden"
                },
                a = {
                    opacity: 0,
                    visbility: "visible"
                },
                l = {
                    opacity: .75,
                    visbility: "visible"
                },
                d = {
                    opacity: 1,
                    visbility: "visible"
                },
                c = {
                    fade: {
                        show: {
                            duration: 500,
                            frames: [s, a, d]
                        },
                        hide: {
                            duration: 500,
                            frames: [d, a, s]
                        }
                    },
                    crossfade: {
                        show: {
                            duration: 500,
                            frames: [s, l, d],
                            easing: "cubic-bezier(0, 0, 0, 1)"
                        },
                        hide: {
                            duration: 500,
                            frames: [d, l, s],
                            easing: "cubic-bezier(0, 0, 0, 1)"
                        }
                    }
                };
            e.ANIMATION_KEYFRAME_MAPPING = c;
            const u = {
                show: {
                    start: "elementWillShow",
                    end: "elementShow"
                },
                hide: {
                    start: "elementWillHide",
                    end: "elementHide"
                }
            };
            e.ANIMATION_EVENT_FLOW = u;
            const p = ["elementWillShow", "elementShow", "elementWillHide", "elementHide"];
            e.ANIMATION_EVENTS = p;
            const h = ["fade", "crossfade", "none"],
                m = "fade",
                g = {
                    bubbles: !0,
                    cancelable: !0
                };
            class f extends i.webComponents.ShadowElement {
                static get observedAttributes() {
                    return ["animation", "selected-item"]
                }
                templateMarkup() {
                    return n(200)
                }
                constructor() {
                    super(), this.preventEventPropagation(), this.selectedAnimation = m, this.selectedItem = null, this.selectedItemId = null, this.inProgressAnimation = Promise.resolve(), this.mutationObserver = new MutationObserver(this.handleMutation.bind(this))
                }
                preventEventPropagation() {
                    p.forEach((t => {
                        this.addEventListener(t, (t => t.stopPropagation()))
                    }))
                }
                handleMutation(t) {
                    if (this.selectedItem) return;
                    const e = this.getAttribute("selected-item");
                    let n = null;
                    t.some((t => Array.from(t.addedNodes).some((t => {
                        if ("LOL-UIKIT-SECTION" === t.tagName && t.getAttribute("section-id") === e) return n = t, !0
                    })))), n && this.setSectionActive(n)
                }
                setSectionActive(t) {
                    this.selectedItem = t, this.selectedItemId = t.getAttribute("section-id"), this.selectedItem.classList.add("visible")
                }
                connectedCallback() {
                    super.connectedCallback(), this._hideAllSections(), this.mutationObserver.observe(this, {
                        childList: !0
                    }), this.selectedAnimation = this.getAttribute("animation") || m, this.inProgressAnimation = Promise.resolve();
                    const t = this._getSectionElementById(this.getAttribute("selected-item"));
                    null !== t && this.setSectionActive(t)
                }
                disconnectedCallback() {
                    super.disconnectedCallback(), this._hideAllSections(), this.selectedItem = null, this.selectedItemId = null, this.selectedAnimation = m, this.inProgressAnimation = Promise.resolve(), this.mutationObserver.disconnect()
                }
                attributeChangedCallback(t, e, n) {
                    if ("animation" === t) {
                        if (h.indexOf(n) < 0) return void this.setAttribute("animation", this.selectedAnimation);
                        this.selectedAnimation = n
                    } else "selected-item" === t && this._transitionSection(n)
                }
                _getSectionElementById(t) {
                    return this.querySelector(`lol-uikit-section[section-id=${t}]`)
                }
                _transitionSection(t) {
                    const e = this._getSectionElementById(t);
                    if (!e) return;
                    const n = this.selectedItem;
                    e !== n && this._animationFlow(n, r).then((() => (this.selectedItem = e, this.selectedItemId = t, this._animationFlow(e, o), null)))
                }
                _animationFlow(t, e) {
                    if (!t) return Promise.resolve();
                    let n;
                    return t.dispatchEvent(new Event(u[e].start, g)), n = "none" === this.selectedAnimation ? this._runAnimationNone(t, e) : "crossfade" === this.selectedAnimation ? this._runAnimationCrossfade(t, e) : this._runAnimationFade(t, e), this.inProgressAnimation = n, n.then((() => (t.dispatchEvent(new Event(u[e].end, g)), null))), n
                }
                _runAnimationNone(t, e) {
                    return this._updateVisibility(t, e), Promise.resolve()
                }
                _runAnimationFade(t, e) {
                    const n = c[this.selectedAnimation][e];
                    return new Promise((i => {
                        t.animate(n.frames, n.duration).onfinish = () => {
                            this._updateVisibility(t, e), i()
                        }
                    }))
                }
                _runAnimationCrossfade(t, e) {
                    const n = c[this.selectedAnimation][e];
                    return new Promise((i => {
                        t.animate(n.frames, n.duration), this._updateVisibility(t, e), i()
                    }))
                }
                _updateVisibility(t, e) {
                    this._hideAllSections(), e === o && t.classList.add("visible")
                }
                _hideAllSections() {
                    Array.from(this.querySelectorAll(":scope > lol-uikit-section")).forEach((t => t.classList.remove("visible")))
                }
            }
            f.tagName = "lol-uikit-section-controller";
            var b = f;
            e.default = b
        }, t => {
            "use strict";
            t.exports = "<template>\r\n  <slot></slot>\r\n</template>"
        }, (t, e, n) => {
            "use strict";
            Object.defineProperty(e, "__esModule", {
                value: !0
            }), e.default = void 0;
            var i, o = (i = n(165)) && i.__esModule ? i : {
                    default: i
                },
                r = n(1);
            const s = "horizontal",
                a = s,
                l = {
                    mouseOffsetAttribute: "clientX",
                    baseElementMoveRangeAttribute: "width",
                    baseElementOffsetAttribute: "left",
                    buttonBlockAttribute: "width",
                    buttonOffsetAttribute: "left",
                    fillOffsetAttribute: "width",
                    calcOffset: (t, e) => t - e
                },
                d = {
                    mouseOffsetAttribute: "clientY",
                    baseElementMoveRangeAttribute: "height",
                    baseElementOffsetAttribute: "bottom",
                    buttonBlockAttribute: "height",
                    buttonOffsetAttribute: "bottom",
                    fillOffsetAttribute: "height",
                    calcOffset: (t, e) => e - t
                },
                c = new Map;
            c.set(s, l), c.set("vertical", d);
            const u = "disabled",
                p = "value";
            class h extends r.webComponents.ShadowElement {
                templateMarkup() {
                    return n(202)
                }
                stylesheetMarkup() {
                    return n(203)
                }
                constructor() {
                    super(), this._wrapperElement = this.shadowRoot.querySelector("div.lol-uikit-slider-wrapper"), this._baseElement = this.shadowRoot.querySelector("div.lol-uikit-slider-base"), this._buttonElement = this.shadowRoot.querySelector("div.lol-uikit-slider-button"), this._fillElement = this.shadowRoot.querySelector("div.lol-uikit-slider-fill"), this._mouseMoveHandler = this._mouseMoveHandler.bind(this), this._mouseUpHandler = this._mouseUpHandler.bind(this)
                }
                connectedCallback() {
                    super.connectedCallback(), this._initProperties(), this._cleanAttributeObservers(), this._addAttributeObservers(), this._bindEventListeners(), this._moveSliderTo(this._getSliderButtonOffset(this.value))
                }
                disconnectedCallback() {
                    super.disconnectedCallback(), this._cleanAttributeObservers(), this._unbindEventListeners()
                }
                setTooltipContentDelegate(t) {
                    if (null === t) this._tooltipContentDelegate = null;
                    else {
                        if (!r.Lodash.isFunction(t)) throw new Error("Tooltip content delegate must be a function or null.");
                        this._tooltipContentDelegate = t
                    }
                }
                _initProperties() {
                    if (this._normalizeOrientation(), this.isPercentage = this._getBooleanAttribute("percentage"), this.isPercentage) this._min = 0, this._max = 100, this._step = 1;
                    else {
                        if (this._min = this._getIntegerAttribute("min", 0), this._max = this._getIntegerAttribute("max", 100), this._max <= this._min) throw new Error(`Slider's max value (${this._max}) must be greater than min value (${this._min}).`);
                        this._step = this._getIntegerAttribute("step", 1), this._step <= 0 && (this._step = 1)
                    }
                    this._initStepAttributes(), this.value = this._getIntegerAttribute(p, this._min), this.disabled = this._getBooleanAttribute(u), this.disabled && this._wrapperElement.classList.add("disabled"), this._initTooltipAttributes()
                }
                _initStepAttributes() {
                    this._halfBtnBlock = h.getComputedStyleAttribute(this._buttonElement, this._options.buttonBlockAttribute) / 2, this._sliderValueRange = this._max - this._min, this._stepCount = this._sliderValueRange / this._step, this._maxOffset = this._getMaxOffset(), this._stepOffset = this._maxOffset / this._stepCount
                }
                _initTooltipAttributes() {
                    this._showTooltip = this._getBooleanAttribute("showTooltip", true), this._showTooltip && !this.disabled && this._assignTooltip(), this._tooltipUnit = this.getAttribute("unit")
                }
                _assignTooltip() {
                    !this.disabled && this._showTooltip && o.default.assign(this._buttonElement, this._tooltipElement(), {}, {
                        targetAnchor: {
                            x: "center",
                            y: "top"
                        },
                        tooltipAnchor: {
                            x: "center",
                            y: "bottom"
                        }
                    })
                }
                _tooltipElement() {
                    return this._tooltip || (this._tooltip = this.shadowRoot.querySelector("lol-uikit-tooltip")), this._updateTooltipContent(), this._tooltip
                }
                _addAttributeObservers() {
                    this._observeAttribute(u, this._disabledAttributeObserver.bind(this)), this._observeAttribute(p, this._valueAttributeObserver.bind(this))
                }
                _observeAttribute(t, e) {
                    const n = new MutationObserver(e),
                        i = {
                            attributes: !0,
                            attributeFilter: [t]
                        };
                    n.observe(this, i), this.attributeObservers.push(n)
                }
                _getMaxOffset() {
                    return parseFloat(this._baseElement.getBoundingClientRect()[this._options.baseElementMoveRangeAttribute]) - h.getComputedStyleAttribute(this._buttonElement, this._options.buttonBlockAttribute)
                }
                _disabledAttributeObserver() {
                    this.disabled = this._getBooleanAttribute(u), this.disabled ? (this._wrapperElement.classList.add("disabled"), this._showTooltip && o.default.unassign(this._buttonElement)) : (this._wrapperElement.classList.remove("disabled"), this._showTooltip && this._assignTooltip())
                }
                _valueAttributeObserver() {
                    const t = this._getIntegerAttribute(p, this.value);
                    this.value !== t && (this.value = t, this._moveSliderTo(this._getSliderButtonOffset(t)), this._updateTooltipContent())
                }
                _normalizeOrientation() {
                    let t = this.getAttribute("orientation");
                    t = t && c.has(t.toLowerCase()) ? t.toLowerCase() : a, this._options = c.get(t), this._wrapperElement.classList.add(t)
                }
                _bindEventListeners() {
                    this._clickBaseElementListener = this._onClickBaseElement.bind(this), this._baseElement.addEventListener("click", this._clickBaseElementListener), this._buttonElement.addEventListener("mousedown", function() {
                        this.disabled || (document.addEventListener("mousemove", this._mouseMoveHandler), document.addEventListener("mouseup", this._mouseUpHandler), this._dispatchSlideStartEvent())
                    }.bind(this))
                }
                _onClickBaseElement(t) {
                    this._getBooleanAttribute("clickSet") && this._updateSliderOnEvent(t) && this._dispatchSlideChangeEvent()
                }
                _unbindEventListeners() {
                    this._baseElement.removeEventListener("click", this._mouseUpBaseElementListener)
                }
                _mouseMoveHandler(t) {
                    t.preventDefault(), this._updateSliderOnEvent(t) && this._dispatchSlideChangeEvent()
                }
                _updateSliderOnEvent(t) {
                    const e = this._getOffset(t),
                        n = this._getSliderValue(e),
                        i = this.isPercentage ? e : this._getSliderButtonOffset(n);
                    return this._moveSliderTo(i), this.value !== n && (this.value = n, !0)
                }
                _moveSliderTo(t) {
                    this._buttonElement.style[this._options.buttonOffsetAttribute] = t + "px", this._fillElement.style[this._options.fillOffsetAttribute] = t + "px"
                }
                _getOffset(t) {
                    let e = this._options.calcOffset(t[this._options.mouseOffsetAttribute], this._baseElement.getBoundingClientRect()[this._options.baseElementOffsetAttribute]) - this._halfBtnBlock;
                    return e < 0 ? e = 0 : e > this._maxOffset && (e = this._maxOffset), e
                }
                _getSliderValue(t) {
                    let e = 0;
                    return e = this.isPercentage ? 0 === this._maxOffset ? 0 : Math.round(100 * t / this._maxOffset) : 0 === this._stepOffset ? 0 : Math.round(t / this._stepOffset), e < 0 ? e = 0 : e > this._stepCount && (e = this._stepCount), e * this._step + this._min
                }
                _getSliderButtonOffset(t) {
                    return this._stepOffset * ((t - this._min) / this._step)
                }
                _mouseUpHandler(t) {
                    t.preventDefault(), document.removeEventListener("mousemove", this._mouseMoveHandler), document.removeEventListener("mouseup", this._mouseUpHandler), this._updateSliderOnEvent(t), this._dispatchSlideEndEvent()
                }
                _updateTooltipContent() {
                    if (!this.disabled && this._showTooltip && this._tooltip) {
                        let t;
                        t = this._tooltipContentDelegate ? this._tooltipContentDelegate(this.value) : this._tooltipUnit ? `${this.value}${this._tooltipUnit}` : this.isPercentage ? `${this.value}%` : this.value;
                        const e = this._tooltip.querySelector("p");
                        e && (e.textContent = t)
                    }
                }
                _cleanAttributeObservers() {
                    this.attributeObservers && this.attributeObservers.forEach((t => t.disconnect())), this.attributeObservers = []
                }
                _dispatchSlideChangeEvent() {
                    this._dispatchEventWithCurrentValue("change"), this._updateTooltipContent()
                }
                _dispatchSlideStartEvent() {
                    this._dispatchEventWithCurrentValue("slideStart")
                }
                _dispatchSlideEndEvent() {
                    this._dispatchEventWithCurrentValue("slideEnd")
                }
                _dispatchEventWithCurrentValue(t) {
                    const e = new Event(t, {
                        bubbles: !0
                    });
                    e.value = this.value, this.dispatchEvent(e)
                }
                _getBooleanAttribute(t, e = !1) {
                    if (this.hasAttribute(t)) {
                        const e = this.getAttribute(t).trim().toLowerCase();
                        return "" === e || "true" === e || e === t.toLowerCase()
                    }
                    return e
                }
                _getIntegerAttribute(t, e) {
                    const n = parseInt(this.getAttribute(t));
                    return Number.isFinite(n) ? n : e
                }
                static getComputedStyleAttribute(t, e) {
                    return parseFloat(window.getComputedStyle(t)[e])
                }
            }
            h.tagName = "lol-uikit-slider";
            var m = h;
            e.default = m
        }, t => {
            "use strict";
            t.exports = '<template>\r\n  <div class="lol-uikit-slider-wrapper">\r\n    <div class="lol-uikit-slider-base">\r\n      <div class="lol-uikit-slider-button"></div>\r\n      <div class="lol-uikit-slider-fill"></div>\r\n    </div>\r\n  </div>\r\n  <lol-uikit-tooltip>\r\n    <lol-uikit-content-block type="tooltip-system">\r\n      <p></p>\r\n    </lol-uikit-content-block>\r\n  </lol-uikit-tooltip>\r\n</template>\r\n'
        }, (t, e, n) => {
            var i = n(9),
                o = n(10)(i);
            o.push([t.id, ":host {\n  --slider-base-before-top: 14px;\n  --slider-btn-cursor: default;\n  --slider-btn-width: 30px;\n  --slider-btn-height: 30px;\n  --slider-btn-hover-background-position: 0 -30px;\n  --slider-btn-active-background-position: 0 -60px;\n  --slider-fill-top: 13px;\n}\n:host {\n  display: flex;\n  align-items: center;\n}\n:host .lol-uikit-slider-wrapper {\n  position: relative;\n  height: inherit;\n  width: inherit;\n}\n:host .lol-uikit-slider-wrapper .lol-uikit-slider-base {\n  height: inherit;\n  width: inherit;\n  position: absolute;\n}\n:host .lol-uikit-slider-wrapper .lol-uikit-slider-base:before {\n  content: '';\n  position: absolute;\n  top: var(--slider-base-before-top);\n  left: 0;\n  width: calc(100% - 2.5px);\n  height: 2px;\n  background: #1e2328;\n}\n:host .lol-uikit-slider-wrapper .lol-uikit-slider-fill {\n  background: linear-gradient(to left, #695625, #463714);\n  position: absolute;\n  height: 2px;\n  width: 0;\n  top: var(--slider-fill-top);\n  border: thin solid #010a13;\n}\n:host .lol-uikit-slider-wrapper .lol-uikit-slider-button {\n  cursor: var(--slider-btn-cursor);\n  width: var(--slider-btn-width);\n  height: var(--slider-btn-height);\n  background: url(\"/fe/lol-uikit/images/slider-btn.png\") no-repeat top left;\n  background-size: 100%;\n  position: absolute;\n  top: 0px;\n}\n:host .lol-uikit-slider-wrapper .lol-uikit-slider-button:hover + .lol-uikit-slider-fill {\n  background: linear-gradient(to right, #785a28 0%, #c89b3c 56%, #c8aa6e 100%);\n}\n:host .lol-uikit-slider-wrapper .lol-uikit-slider-button:active + .lol-uikit-slider-fill {\n  background: linear-gradient(to right, #695625, #463714);\n}\n:host .lol-uikit-slider-wrapper .lol-uikit-slider-button:hover {\n  background-position: var(--slider-btn-hover-background-position);\n}\n:host .lol-uikit-slider-wrapper .lol-uikit-slider-button:active {\n  background-position: var(--slider-btn-active-background-position);\n}\n:host .lol-uikit-slider-wrapper.disabled .lol-uikit-slider-fill {\n  background: rgba(1,10,19,0.15);\n}\n:host .lol-uikit-slider-wrapper.disabled .lol-uikit-slider-button {\n  background-position: 0 -90px;\n}\n:host .lol-uikit-slider-wrapper.disabled .lol-uikit-slider-button:hover + .lol-uikit-slider-fill {\n  background: rgba(1,10,19,0.15);\n}\n:host .lol-uikit-slider-wrapper.disabled .lol-uikit-slider-button:active + .lol-uikit-slider-fill {\n  background: rgba(1,10,19,0.15);\n}\n:host .lol-uikit-slider-wrapper.disabled .lol-uikit-slider-button:hover {\n  background-position: 0 -90px;\n}\n:host .lol-uikit-slider-wrapper.disabled .lol-uikit-slider-button:active {\n  background-position: 0 -90px;\n}\n:host .lol-uikit-slider-wrapper.vertical .lol-uikit-slider-base:before {\n  top: 0px;\n  left: 15px;\n  bottom: 15px;\n  width: 2px;\n  height: calc(100% - 2.5px);\n  background: #1e2328;\n}\n:host .lol-uikit-slider-wrapper.vertical .lol-uikit-slider-fill {\n  background: linear-gradient(to top, #695625, #463714);\n  width: 2px;\n  height: 0;\n  bottom: 0px;\n  top: auto;\n  left: 14px;\n}\n:host .lol-uikit-slider-wrapper.vertical .lol-uikit-slider-button {\n  transform: rotate(90deg);\n  left: 0px;\n  bottom: 0px;\n  top: auto;\n}\n:host(:lang(ar-ae)) {\n  direction: ltr /*rtl:ignore*/;\n}\n", ""]), t.exports = o
        }, (t, e, n) => {
            "use strict";
            Object.defineProperty(e, "__esModule", {
                value: !0
            }), e.default = void 0;
            var i = n(1);
            const o = "level",
                r = "size",
                s = "prestige-crest-id",
                a = "is-identity-modal";
            class l extends i.webComponents.ShadowElement {
                templateMarkup() {
                    return n(205)
                }
                stylesheetMarkup() {
                    return n(206)
                }
                static get observedAttributes() {
                    return [o, s, r, a]
                }
                attributeChangedCallback(t, e, n) {
                    const i = this.shadowRoot.querySelector(".theme-ring-border");
                    if (i)
                        if (t === s) i.setAttribute("theme", n);
                        else if (t === o) {
                        const t = this._getThemeFromLevel(n);
                        i.setAttribute("theme", t)
                    } else t === r ? i.classList.add(n) : t === a && "true" === n && i.classList.add("identity-modal")
                }
                _getThemeFromLevel(t) {
                    if (t >= 1 && t <= 29) return 1;
                    if (t >= 30 && t <= 49) return 2;
                    {
                        const e = Math.floor(t / 25) + 1;
                        return Math.min(e, 21)
                    }
                }
            }
            l.tagName = "lol-uikit-themed-level-ring-v2";
            var d = l;
            e.default = d
        }, t => {
            "use strict";
            t.exports = '<template>\r\n  <div class="theme-ring-border"></div>\r\n</template>\r\n'
        }, (t, e, n) => {
            var i = n(9),
                o = n(10)(i);
            o.push([t.id, ':host {\n  display: block;\n  width: 100%;\n  height: 100%;\n}\n.theme-ring-border {\n  position: absolute;\n  left: -49px;\n  top: -43px;\n  width: 200px;\n  height: 200px;\n  background-size: contain;\n  background-repeat: no-repeat;\n}\n.theme-ring-border.identity-modal {\n  width: 165px;\n  height: 165px;\n  left: -32px;\n  top: -30px;\n}\n.theme-ring-border.small {\n  width: 165px;\n  height: 165px;\n  left: -42px;\n  top: -37px;\n}\n.theme-ring-border.medium {\n  width: 176px;\n  height: 176px;\n  left: -44px;\n  top: -38.2px;\n}\n.theme-ring-border.large {\n  width: 375px;\n  height: 375px;\n  left: -94px;\n  top: -83px;\n}\n.theme-ring-border.fill {\n  width: 100%;\n  height: 100%;\n  position: initial;\n}\n.theme-ring-border[theme="1"] {\n  background-image: url("/fe/lol-static-assets/images/uikit/themed-borders/theme-1-border.png");\n}\n.theme-ring-border[theme="2"] {\n  background-image: url("/fe/lol-static-assets/images/uikit/themed-borders/theme-2-border.png");\n}\n.theme-ring-border[theme="3"] {\n  background-image: url("/fe/lol-static-assets/images/uikit/themed-borders/theme-3-border.png");\n}\n.theme-ring-border[theme="4"] {\n  background-image: url("/fe/lol-static-assets/images/uikit/themed-borders/theme-4-border.png");\n}\n.theme-ring-border[theme="5"] {\n  background-image: url("/fe/lol-static-assets/images/uikit/themed-borders/theme-5-border.png");\n}\n.theme-ring-border[theme="6"] {\n  background-image: url("/fe/lol-static-assets/images/uikit/themed-borders/theme-6-border.png");\n}\n.theme-ring-border[theme="7"] {\n  background-image: url("/fe/lol-static-assets/images/uikit/themed-borders/theme-7-border.png");\n}\n.theme-ring-border[theme="8"] {\n  background-image: url("/fe/lol-static-assets/images/uikit/themed-borders/theme-8-border.png");\n}\n.theme-ring-border[theme="9"] {\n  background-image: url("/fe/lol-static-assets/images/uikit/themed-borders/theme-9-border.png");\n}\n.theme-ring-border[theme="10"] {\n  background-image: url("/fe/lol-static-assets/images/uikit/themed-borders/theme-10-border.png");\n}\n.theme-ring-border[theme="11"] {\n  background-image: url("/fe/lol-static-assets/images/uikit/themed-borders/theme-11-border.png");\n}\n.theme-ring-border[theme="12"] {\n  background-image: url("/fe/lol-static-assets/images/uikit/themed-borders/theme-12-border.png");\n}\n.theme-ring-border[theme="13"] {\n  background-image: url("/fe/lol-static-assets/images/uikit/themed-borders/theme-13-border.png");\n}\n.theme-ring-border[theme="14"] {\n  background-image: url("/fe/lol-static-assets/images/uikit/themed-borders/theme-14-border.png");\n}\n.theme-ring-border[theme="15"] {\n  background-image: url("/fe/lol-static-assets/images/uikit/themed-borders/theme-15-border.png");\n}\n.theme-ring-border[theme="16"] {\n  background-image: url("/fe/lol-static-assets/images/uikit/themed-borders/theme-16-border.png");\n}\n.theme-ring-border[theme="17"] {\n  background-image: url("/fe/lol-static-assets/images/uikit/themed-borders/theme-17-border.png");\n}\n.theme-ring-border[theme="18"] {\n  background-image: url("/fe/lol-static-assets/images/uikit/themed-borders/theme-18-border.png");\n}\n.theme-ring-border[theme="19"] {\n  background-image: url("/fe/lol-static-assets/images/uikit/themed-borders/theme-19-border.png");\n}\n.theme-ring-border[theme="20"] {\n  background-image: url("/fe/lol-static-assets/images/uikit/themed-borders/theme-20-border.png");\n}\n.theme-ring-border[theme="21"] {\n  background-image: url("/fe/lol-static-assets/images/uikit/themed-borders/theme-21-border.png");\n}\n', ""]), t.exports = o
        }, (t, e, n) => {
            "use strict";
            Object.defineProperty(e, "__esModule", {
                value: !0
            }), e.default = void 0;
            var i = n(1);
            const o = "level",
                r = "percent",
                s = "fresh-percent",
                a = "prestige-crest-id",
                l = "crest-by-level",
                d = ".xp-meter-progress",
                c = "has-fresh-xp";
            class u extends i.webComponents.ShadowElement {
                templateMarkup() {
                    return n(208)
                }
                stylesheetMarkup() {
                    return n(209)
                }
                static get observedAttributes() {
                    return [o, r, s, "simplified", "social", "solid", a, l]
                }
                constructor() {
                    super(), this._theme = 1, this._percent = 0, this._freshPercent = 0
                }
                attributeChangedCallback(t, e, n) {
                    const i = this.shadowRoot.querySelector(d);
                    if (t === o) {
                        null === i.getAttribute("theme") && (this._theme = this._getThemeFromLevel(n), i.setAttribute("theme", this._theme));
                        this.shadowRoot.querySelector(".level-text").textContent = n
                    } else t === r ? (this._percent = Number(n), this.shadowRoot.querySelector(".middle.regular").setAttribute("percent", this._percent)) : t === s ? (this._freshPercent = Number(n), this.shadowRoot.querySelector(".middle.fresh").setAttribute("percent", this._freshPercent), null !== n ? i.classList.add(c) : i.classList.remove(c)) : t === a ? (this._theme = n, i.setAttribute("theme", this._theme)) : t === l && (this._theme = this._getThemeFromLevel(n), i.setAttribute("theme", this._theme))
                }
                animateFill(t) {
                    const e = this.shadowRoot.querySelector(d),
                        {
                            percent: n
                        } = t[0],
                        i = t[1].percent;
                    return this.setAttribute(r, n), void 0 !== i ? this.setAttribute(s, i) : this.removeAttribute(s), e.animateFill(t)
                }
                activateGlow() {
                    const t = this.shadowRoot.querySelector(d),
                        e = t.querySelector(".mask-container.left-half img"),
                        n = t.querySelector(".mask-container.right-half img");
                    e.style.transform = "", n.style.transform = "", this.removeAttribute(s), this.setAttribute(r, 100)
                }
                _getThemeFromLevel(t) {
                    if (t >= 1 && t <= 29) return 1;
                    if (t >= 30 && t <= 49) return 2;
                    {
                        const e = Math.floor(t / 25) + 1;
                        return Math.min(e, 21)
                    }
                }
            }
            u.tagName = "lol-uikit-themed-level-ring";
            var p = u;
            e.default = p
        }, t => {
            "use strict";
            t.exports = '<template>\r\n  <lol-uikit-radial-progress class="xp-meter-progress" type="custom" start-angle="247" end-angle="-67">\r\n    <div slot="bottom" class="bottom">\r\n      <img class="unfilled-xp-ring" />\r\n    </div>\r\n    <div slot="middle" class="middle regular" percent="0">\r\n      <img class="filled-xp-ring" />\r\n      <div class="mask-container left-half">\r\n        <img class="unfilled-xp-ring mask" />\r\n      </div>\r\n      <div class="mask-container right-half">\r\n        <img class="unfilled-xp-ring mask" />\r\n      </div>\r\n    </div>\r\n    <div slot="middle" class="middle fresh" percent="0">\r\n      <img class="filled-xp-ring" />\r\n      <div class="mask-container left-half">\r\n        <img class="unfilled-xp-ring mask" />\r\n      </div>\r\n      <div class="mask-container right-half">\r\n        <img class="unfilled-xp-ring mask" />\r\n      </div>\r\n    </div>\r\n    <div slot="top" class="top">\r\n      <img class="level-ring-border" />\r\n      <div class="level-text"></div>\r\n    </div>\r\n  </lol-uikit-radial-progress>\r\n</template>\r\n'
        }, (t, e, n) => {
            var i = n(9),
                o = n(10)(i);
            o.push([t.id, '.xp-meter-progress .level-text {\n  font-family: var(--font-display);\n}\n.xp-meter-progress .level-text {\n  -webkit-user-select: none;\n}\n.xp-meter-progress .level-text {\n  font-kerning: normal;\n  -webkit-font-feature-settings: "kern" 1;\n  -webkit-font-smoothing: antialiased;\n}\n.xp-meter-progress .level-text {\n  text-transform: uppercase;\n}\n.xp-meter-progress .level-text:lang(ko-kr),\n.xp-meter-progress .level-text:lang(ja-jp),\n.xp-meter-progress .level-text:lang(tr-tr),\n.xp-meter-progress .level-text:lang(el-gr),\n.xp-meter-progress .level-text:lang(th-th),\n.xp-meter-progress .level-text:lang(zh-tw) {\n  text-transform: none;\n}\n.xp-meter-progress .level-text {\n  color: #f0e6d2;\n  font-size: 14px;\n  font-weight: 700;\n  line-height: 18px;\n  letter-spacing: 0.075em;\n}\n.xp-meter-progress .level-text:lang(ar-ae) {\n  letter-spacing: 0;\n}\n:host {\n  --themed-level-ring-level-text-font-size: 14px;\n  --themed-level-ring-level-text-font-weight: 700;\n  --themed-level-ring-level-text-line-height: 1.3;\n  --themed-level-ring-level-text-top: 86%;\n  --themed-level-ring-level-text-bottom: 2.5%;\n}\n:host {\n  display: block;\n  width: 100%;\n  height: 100%;\n}\n.xp-meter-progress .bottom,\n.xp-meter-progress .middle,\n.xp-meter-progress .top {\n  width: 100%;\n  height: 100%;\n}\n.xp-meter-progress img {\n  height: 140%;\n  position: absolute;\n  top: -20%;\n  left: -20%;\n}\n.xp-meter-progress img.unfilled-xp-ring {\n  content: url("/fe/lol-static-assets/images/uikit/themed-level-ring/unfilled-ring.png");\n}\n.xp-meter-progress .middle .mask-container {\n  height: 100%;\n  width: 50%;\n  position: absolute;\n  top: 0;\n  overflow: hidden;\n}\n.xp-meter-progress .middle .mask-container.left-half {\n  left: 0;\n}\n.xp-meter-progress .middle .mask-container.left-half img {\n  content: url("/fe/lol-static-assets/images/uikit/themed-level-ring/unfilled-ring-left.png");\n  transform-origin: center right;\n  transform: rotate(180deg);\n  left: initial;\n  right: 0;\n}\n.xp-meter-progress .middle .mask-container.right-half {\n  right: 0;\n}\n.xp-meter-progress .middle .mask-container.right-half img {\n  content: url("/fe/lol-static-assets/images/uikit/themed-level-ring/unfilled-ring-right.png");\n  transform-origin: center left;\n  transform: rotate(180deg);\n  left: 0;\n}\n.xp-meter-progress[theme="1"] img.filled-xp-ring {\n  content: url("/fe/lol-static-assets/images/uikit/themed-level-ring/theme-1-ring.png");\n}\n.xp-meter-progress[theme="1"] img.level-ring-border {\n  content: url("/fe/lol-static-assets/images/uikit/themed-level-ring/theme-1-border.png");\n}\n:host([simplified]) .xp-meter-progress[theme="1"] img.level-ring-border {\n  content: url("/fe/lol-static-assets/images/uikit/themed-level-ring/theme-1-simplified-border.png");\n}\n:host([social]) .xp-meter-progress[theme="1"] img {\n  height: 160%;\n  top: -30%;\n  left: -30%;\n}\n:host([social]) .xp-meter-progress[theme="1"] img.filled-xp-ring,\n:host([social]) .xp-meter-progress[theme="1"] img.unfilled-xp-ring {\n  display: none;\n}\n:host([social]) .xp-meter-progress[theme="1"] img.level-ring-border {\n  content: url("/fe/lol-static-assets/images/uikit/themed-level-ring/theme-1-social-border.png");\n}\n:host([solid]) .xp-meter-progress[theme="1"] img.filled-xp-ring,\n:host([solid]) .xp-meter-progress[theme="1"] img.unfilled-xp-ring {\n  display: none;\n}\n:host([solid]) .xp-meter-progress[theme="1"] img.level-ring-border {\n  content: url("/fe/lol-static-assets/images/uikit/themed-level-ring/theme-1-solid-border.png");\n}\n.xp-meter-progress[theme="2"] img.filled-xp-ring {\n  content: url("/fe/lol-static-assets/images/uikit/themed-level-ring/theme-2-ring.png");\n}\n.xp-meter-progress[theme="2"] img.level-ring-border {\n  content: url("/fe/lol-static-assets/images/uikit/themed-level-ring/theme-2-border.png");\n}\n:host([simplified]) .xp-meter-progress[theme="2"] img.level-ring-border {\n  content: url("/fe/lol-static-assets/images/uikit/themed-level-ring/theme-2-simplified-border.png");\n}\n:host([social]) .xp-meter-progress[theme="2"] img {\n  height: 160%;\n  top: -30%;\n  left: -30%;\n}\n:host([social]) .xp-meter-progress[theme="2"] img.filled-xp-ring,\n:host([social]) .xp-meter-progress[theme="2"] img.unfilled-xp-ring {\n  display: none;\n}\n:host([social]) .xp-meter-progress[theme="2"] img.level-ring-border {\n  content: url("/fe/lol-static-assets/images/uikit/themed-level-ring/theme-2-social-border.png");\n}\n:host([solid]) .xp-meter-progress[theme="2"] img.filled-xp-ring,\n:host([solid]) .xp-meter-progress[theme="2"] img.unfilled-xp-ring {\n  display: none;\n}\n:host([solid]) .xp-meter-progress[theme="2"] img.level-ring-border {\n  content: url("/fe/lol-static-assets/images/uikit/themed-level-ring/theme-2-solid-border.png");\n}\n.xp-meter-progress[theme="3"] img.filled-xp-ring {\n  content: url("/fe/lol-static-assets/images/uikit/themed-level-ring/theme-3-ring.png");\n}\n.xp-meter-progress[theme="3"] img.level-ring-border {\n  content: url("/fe/lol-static-assets/images/uikit/themed-level-ring/theme-3-border.png");\n}\n:host([simplified]) .xp-meter-progress[theme="3"] img.level-ring-border {\n  content: url("/fe/lol-static-assets/images/uikit/themed-level-ring/theme-3-simplified-border.png");\n}\n:host([social]) .xp-meter-progress[theme="3"] img {\n  height: 160%;\n  top: -30%;\n  left: -30%;\n}\n:host([social]) .xp-meter-progress[theme="3"] img.filled-xp-ring,\n:host([social]) .xp-meter-progress[theme="3"] img.unfilled-xp-ring {\n  display: none;\n}\n:host([social]) .xp-meter-progress[theme="3"] img.level-ring-border {\n  content: url("/fe/lol-static-assets/images/uikit/themed-level-ring/theme-3-social-border.png");\n}\n:host([solid]) .xp-meter-progress[theme="3"] img.filled-xp-ring,\n:host([solid]) .xp-meter-progress[theme="3"] img.unfilled-xp-ring {\n  display: none;\n}\n:host([solid]) .xp-meter-progress[theme="3"] img.level-ring-border {\n  content: url("/fe/lol-static-assets/images/uikit/themed-level-ring/theme-3-solid-border.png");\n}\n.xp-meter-progress[theme="4"] img.filled-xp-ring {\n  content: url("/fe/lol-static-assets/images/uikit/themed-level-ring/theme-4-ring.png");\n}\n.xp-meter-progress[theme="4"] img.level-ring-border {\n  content: url("/fe/lol-static-assets/images/uikit/themed-level-ring/theme-4-border.png");\n}\n:host([simplified]) .xp-meter-progress[theme="4"] img.level-ring-border {\n  content: url("/fe/lol-static-assets/images/uikit/themed-level-ring/theme-4-simplified-border.png");\n}\n:host([social]) .xp-meter-progress[theme="4"] img {\n  height: 160%;\n  top: -30%;\n  left: -30%;\n}\n:host([social]) .xp-meter-progress[theme="4"] img.filled-xp-ring,\n:host([social]) .xp-meter-progress[theme="4"] img.unfilled-xp-ring {\n  display: none;\n}\n:host([social]) .xp-meter-progress[theme="4"] img.level-ring-border {\n  content: url("/fe/lol-static-assets/images/uikit/themed-level-ring/theme-4-social-border.png");\n}\n:host([solid]) .xp-meter-progress[theme="4"] img.filled-xp-ring,\n:host([solid]) .xp-meter-progress[theme="4"] img.unfilled-xp-ring {\n  display: none;\n}\n:host([solid]) .xp-meter-progress[theme="4"] img.level-ring-border {\n  content: url("/fe/lol-static-assets/images/uikit/themed-level-ring/theme-4-solid-border.png");\n}\n.xp-meter-progress[theme="5"] img.filled-xp-ring {\n  content: url("/fe/lol-static-assets/images/uikit/themed-level-ring/theme-5-ring.png");\n}\n.xp-meter-progress[theme="5"] img.level-ring-border {\n  content: url("/fe/lol-static-assets/images/uikit/themed-level-ring/theme-5-border.png");\n}\n:host([simplified]) .xp-meter-progress[theme="5"] img.level-ring-border {\n  content: url("/fe/lol-static-assets/images/uikit/themed-level-ring/theme-5-simplified-border.png");\n}\n:host([social]) .xp-meter-progress[theme="5"] img {\n  height: 160%;\n  top: -30%;\n  left: -30%;\n}\n:host([social]) .xp-meter-progress[theme="5"] img.filled-xp-ring,\n:host([social]) .xp-meter-progress[theme="5"] img.unfilled-xp-ring {\n  display: none;\n}\n:host([social]) .xp-meter-progress[theme="5"] img.level-ring-border {\n  content: url("/fe/lol-static-assets/images/uikit/themed-level-ring/theme-5-social-border.png");\n}\n:host([solid]) .xp-meter-progress[theme="5"] img.filled-xp-ring,\n:host([solid]) .xp-meter-progress[theme="5"] img.unfilled-xp-ring {\n  display: none;\n}\n:host([solid]) .xp-meter-progress[theme="5"] img.level-ring-border {\n  content: url("/fe/lol-static-assets/images/uikit/themed-level-ring/theme-5-solid-border.png");\n}\n.xp-meter-progress[theme="6"] img.filled-xp-ring {\n  content: url("/fe/lol-static-assets/images/uikit/themed-level-ring/theme-6-ring.png");\n}\n.xp-meter-progress[theme="6"] img.level-ring-border {\n  content: url("/fe/lol-static-assets/images/uikit/themed-level-ring/theme-6-border.png");\n}\n:host([simplified]) .xp-meter-progress[theme="6"] img.level-ring-border {\n  content: url("/fe/lol-static-assets/images/uikit/themed-level-ring/theme-6-simplified-border.png");\n}\n:host([social]) .xp-meter-progress[theme="6"] img {\n  height: 160%;\n  top: -30%;\n  left: -30%;\n}\n:host([social]) .xp-meter-progress[theme="6"] img.filled-xp-ring,\n:host([social]) .xp-meter-progress[theme="6"] img.unfilled-xp-ring {\n  display: none;\n}\n:host([social]) .xp-meter-progress[theme="6"] img.level-ring-border {\n  content: url("/fe/lol-static-assets/images/uikit/themed-level-ring/theme-6-social-border.png");\n}\n:host([solid]) .xp-meter-progress[theme="6"] img.filled-xp-ring,\n:host([solid]) .xp-meter-progress[theme="6"] img.unfilled-xp-ring {\n  display: none;\n}\n:host([solid]) .xp-meter-progress[theme="6"] img.level-ring-border {\n  content: url("/fe/lol-static-assets/images/uikit/themed-level-ring/theme-6-solid-border.png");\n}\n.xp-meter-progress[theme="7"] img.filled-xp-ring {\n  content: url("/fe/lol-static-assets/images/uikit/themed-level-ring/theme-7-ring.png");\n}\n.xp-meter-progress[theme="7"] img.level-ring-border {\n  content: url("/fe/lol-static-assets/images/uikit/themed-level-ring/theme-7-border.png");\n}\n:host([simplified]) .xp-meter-progress[theme="7"] img.level-ring-border {\n  content: url("/fe/lol-static-assets/images/uikit/themed-level-ring/theme-7-simplified-border.png");\n}\n:host([social]) .xp-meter-progress[theme="7"] img {\n  height: 160%;\n  top: -30%;\n  left: -30%;\n}\n:host([social]) .xp-meter-progress[theme="7"] img.filled-xp-ring,\n:host([social]) .xp-meter-progress[theme="7"] img.unfilled-xp-ring {\n  display: none;\n}\n:host([social]) .xp-meter-progress[theme="7"] img.level-ring-border {\n  content: url("/fe/lol-static-assets/images/uikit/themed-level-ring/theme-7-social-border.png");\n}\n:host([solid]) .xp-meter-progress[theme="7"] img.filled-xp-ring,\n:host([solid]) .xp-meter-progress[theme="7"] img.unfilled-xp-ring {\n  display: none;\n}\n:host([solid]) .xp-meter-progress[theme="7"] img.level-ring-border {\n  content: url("/fe/lol-static-assets/images/uikit/themed-level-ring/theme-7-solid-border.png");\n}\n.xp-meter-progress[theme="8"] img.filled-xp-ring {\n  content: url("/fe/lol-static-assets/images/uikit/themed-level-ring/theme-8-ring.png");\n}\n.xp-meter-progress[theme="8"] img.level-ring-border {\n  content: url("/fe/lol-static-assets/images/uikit/themed-level-ring/theme-8-border.png");\n}\n:host([simplified]) .xp-meter-progress[theme="8"] img.level-ring-border {\n  content: url("/fe/lol-static-assets/images/uikit/themed-level-ring/theme-8-simplified-border.png");\n}\n:host([social]) .xp-meter-progress[theme="8"] img {\n  height: 160%;\n  top: -30%;\n  left: -30%;\n}\n:host([social]) .xp-meter-progress[theme="8"] img.filled-xp-ring,\n:host([social]) .xp-meter-progress[theme="8"] img.unfilled-xp-ring {\n  display: none;\n}\n:host([social]) .xp-meter-progress[theme="8"] img.level-ring-border {\n  content: url("/fe/lol-static-assets/images/uikit/themed-level-ring/theme-8-social-border.png");\n}\n:host([solid]) .xp-meter-progress[theme="8"] img.filled-xp-ring,\n:host([solid]) .xp-meter-progress[theme="8"] img.unfilled-xp-ring {\n  display: none;\n}\n:host([solid]) .xp-meter-progress[theme="8"] img.level-ring-border {\n  content: url("/fe/lol-static-assets/images/uikit/themed-level-ring/theme-8-solid-border.png");\n}\n.xp-meter-progress[theme="9"] img.filled-xp-ring {\n  content: url("/fe/lol-static-assets/images/uikit/themed-level-ring/theme-9-ring.png");\n}\n.xp-meter-progress[theme="9"] img.level-ring-border {\n  content: url("/fe/lol-static-assets/images/uikit/themed-level-ring/theme-9-border.png");\n}\n:host([simplified]) .xp-meter-progress[theme="9"] img.level-ring-border {\n  content: url("/fe/lol-static-assets/images/uikit/themed-level-ring/theme-9-simplified-border.png");\n}\n:host([social]) .xp-meter-progress[theme="9"] img {\n  height: 160%;\n  top: -30%;\n  left: -30%;\n}\n:host([social]) .xp-meter-progress[theme="9"] img.filled-xp-ring,\n:host([social]) .xp-meter-progress[theme="9"] img.unfilled-xp-ring {\n  display: none;\n}\n:host([social]) .xp-meter-progress[theme="9"] img.level-ring-border {\n  content: url("/fe/lol-static-assets/images/uikit/themed-level-ring/theme-9-social-border.png");\n}\n:host([solid]) .xp-meter-progress[theme="9"] img.filled-xp-ring,\n:host([solid]) .xp-meter-progress[theme="9"] img.unfilled-xp-ring {\n  display: none;\n}\n:host([solid]) .xp-meter-progress[theme="9"] img.level-ring-border {\n  content: url("/fe/lol-static-assets/images/uikit/themed-level-ring/theme-9-solid-border.png");\n}\n.xp-meter-progress[theme="10"] img.filled-xp-ring {\n  content: url("/fe/lol-static-assets/images/uikit/themed-level-ring/theme-10-ring.png");\n}\n.xp-meter-progress[theme="10"] img.level-ring-border {\n  content: url("/fe/lol-static-assets/images/uikit/themed-level-ring/theme-10-border.png");\n}\n:host([simplified]) .xp-meter-progress[theme="10"] img.level-ring-border {\n  content: url("/fe/lol-static-assets/images/uikit/themed-level-ring/theme-10-simplified-border.png");\n}\n:host([social]) .xp-meter-progress[theme="10"] img {\n  height: 160%;\n  top: -30%;\n  left: -30%;\n}\n:host([social]) .xp-meter-progress[theme="10"] img.filled-xp-ring,\n:host([social]) .xp-meter-progress[theme="10"] img.unfilled-xp-ring {\n  display: none;\n}\n:host([social]) .xp-meter-progress[theme="10"] img.level-ring-border {\n  content: url("/fe/lol-static-assets/images/uikit/themed-level-ring/theme-10-social-border.png");\n}\n:host([solid]) .xp-meter-progress[theme="10"] img.filled-xp-ring,\n:host([solid]) .xp-meter-progress[theme="10"] img.unfilled-xp-ring {\n  display: none;\n}\n:host([solid]) .xp-meter-progress[theme="10"] img.level-ring-border {\n  content: url("/fe/lol-static-assets/images/uikit/themed-level-ring/theme-10-solid-border.png");\n}\n.xp-meter-progress[theme="11"] img.filled-xp-ring {\n  content: url("/fe/lol-static-assets/images/uikit/themed-level-ring/theme-11-ring.png");\n}\n.xp-meter-progress[theme="11"] img.level-ring-border {\n  content: url("/fe/lol-static-assets/images/uikit/themed-level-ring/theme-11-border.png");\n}\n:host([simplified]) .xp-meter-progress[theme="11"] img.level-ring-border {\n  content: url("/fe/lol-static-assets/images/uikit/themed-level-ring/theme-11-simplified-border.png");\n}\n:host([social]) .xp-meter-progress[theme="11"] img {\n  height: 160%;\n  top: -30%;\n  left: -30%;\n}\n:host([social]) .xp-meter-progress[theme="11"] img.filled-xp-ring,\n:host([social]) .xp-meter-progress[theme="11"] img.unfilled-xp-ring {\n  display: none;\n}\n:host([social]) .xp-meter-progress[theme="11"] img.level-ring-border {\n  content: url("/fe/lol-static-assets/images/uikit/themed-level-ring/theme-11-social-border.png");\n}\n:host([solid]) .xp-meter-progress[theme="11"] img.filled-xp-ring,\n:host([solid]) .xp-meter-progress[theme="11"] img.unfilled-xp-ring {\n  display: none;\n}\n:host([solid]) .xp-meter-progress[theme="11"] img.level-ring-border {\n  content: url("/fe/lol-static-assets/images/uikit/themed-level-ring/theme-11-solid-border.png");\n}\n.xp-meter-progress[theme="12"] img.filled-xp-ring {\n  content: url("/fe/lol-static-assets/images/uikit/themed-level-ring/theme-12-ring.png");\n}\n.xp-meter-progress[theme="12"] img.level-ring-border {\n  content: url("/fe/lol-static-assets/images/uikit/themed-level-ring/theme-12-border.png");\n}\n:host([simplified]) .xp-meter-progress[theme="12"] img.level-ring-border {\n  content: url("/fe/lol-static-assets/images/uikit/themed-level-ring/theme-12-simplified-border.png");\n}\n:host([social]) .xp-meter-progress[theme="12"] img {\n  height: 160%;\n  top: -30%;\n  left: -30%;\n}\n:host([social]) .xp-meter-progress[theme="12"] img.filled-xp-ring,\n:host([social]) .xp-meter-progress[theme="12"] img.unfilled-xp-ring {\n  display: none;\n}\n:host([social]) .xp-meter-progress[theme="12"] img.level-ring-border {\n  content: url("/fe/lol-static-assets/images/uikit/themed-level-ring/theme-12-social-border.png");\n}\n:host([solid]) .xp-meter-progress[theme="12"] img.filled-xp-ring,\n:host([solid]) .xp-meter-progress[theme="12"] img.unfilled-xp-ring {\n  display: none;\n}\n:host([solid]) .xp-meter-progress[theme="12"] img.level-ring-border {\n  content: url("/fe/lol-static-assets/images/uikit/themed-level-ring/theme-12-solid-border.png");\n}\n.xp-meter-progress[theme="13"] img.filled-xp-ring {\n  content: url("/fe/lol-static-assets/images/uikit/themed-level-ring/theme-13-ring.png");\n}\n.xp-meter-progress[theme="13"] img.level-ring-border {\n  content: url("/fe/lol-static-assets/images/uikit/themed-level-ring/theme-13-border.png");\n}\n:host([simplified]) .xp-meter-progress[theme="13"] img.level-ring-border {\n  content: url("/fe/lol-static-assets/images/uikit/themed-level-ring/theme-13-simplified-border.png");\n}\n:host([social]) .xp-meter-progress[theme="13"] img {\n  height: 160%;\n  top: -30%;\n  left: -30%;\n}\n:host([social]) .xp-meter-progress[theme="13"] img.filled-xp-ring,\n:host([social]) .xp-meter-progress[theme="13"] img.unfilled-xp-ring {\n  display: none;\n}\n:host([social]) .xp-meter-progress[theme="13"] img.level-ring-border {\n  content: url("/fe/lol-static-assets/images/uikit/themed-level-ring/theme-13-social-border.png");\n}\n:host([solid]) .xp-meter-progress[theme="13"] img.filled-xp-ring,\n:host([solid]) .xp-meter-progress[theme="13"] img.unfilled-xp-ring {\n  display: none;\n}\n:host([solid]) .xp-meter-progress[theme="13"] img.level-ring-border {\n  content: url("/fe/lol-static-assets/images/uikit/themed-level-ring/theme-13-solid-border.png");\n}\n.xp-meter-progress[theme="14"] img.filled-xp-ring {\n  content: url("/fe/lol-static-assets/images/uikit/themed-level-ring/theme-14-ring.png");\n}\n.xp-meter-progress[theme="14"] img.level-ring-border {\n  content: url("/fe/lol-static-assets/images/uikit/themed-level-ring/theme-14-border.png");\n}\n:host([simplified]) .xp-meter-progress[theme="14"] img.level-ring-border {\n  content: url("/fe/lol-static-assets/images/uikit/themed-level-ring/theme-14-simplified-border.png");\n}\n:host([social]) .xp-meter-progress[theme="14"] img {\n  height: 160%;\n  top: -30%;\n  left: -30%;\n}\n:host([social]) .xp-meter-progress[theme="14"] img.filled-xp-ring,\n:host([social]) .xp-meter-progress[theme="14"] img.unfilled-xp-ring {\n  display: none;\n}\n:host([social]) .xp-meter-progress[theme="14"] img.level-ring-border {\n  content: url("/fe/lol-static-assets/images/uikit/themed-level-ring/theme-14-social-border.png");\n}\n:host([solid]) .xp-meter-progress[theme="14"] img.filled-xp-ring,\n:host([solid]) .xp-meter-progress[theme="14"] img.unfilled-xp-ring {\n  display: none;\n}\n:host([solid]) .xp-meter-progress[theme="14"] img.level-ring-border {\n  content: url("/fe/lol-static-assets/images/uikit/themed-level-ring/theme-14-solid-border.png");\n}\n.xp-meter-progress[theme="15"] img.filled-xp-ring {\n  content: url("/fe/lol-static-assets/images/uikit/themed-level-ring/theme-15-ring.png");\n}\n.xp-meter-progress[theme="15"] img.level-ring-border {\n  content: url("/fe/lol-static-assets/images/uikit/themed-level-ring/theme-15-border.png");\n}\n:host([simplified]) .xp-meter-progress[theme="15"] img.level-ring-border {\n  content: url("/fe/lol-static-assets/images/uikit/themed-level-ring/theme-15-simplified-border.png");\n}\n:host([social]) .xp-meter-progress[theme="15"] img {\n  height: 160%;\n  top: -30%;\n  left: -30%;\n}\n:host([social]) .xp-meter-progress[theme="15"] img.filled-xp-ring,\n:host([social]) .xp-meter-progress[theme="15"] img.unfilled-xp-ring {\n  display: none;\n}\n:host([social]) .xp-meter-progress[theme="15"] img.level-ring-border {\n  content: url("/fe/lol-static-assets/images/uikit/themed-level-ring/theme-15-social-border.png");\n}\n:host([solid]) .xp-meter-progress[theme="15"] img.filled-xp-ring,\n:host([solid]) .xp-meter-progress[theme="15"] img.unfilled-xp-ring {\n  display: none;\n}\n:host([solid]) .xp-meter-progress[theme="15"] img.level-ring-border {\n  content: url("/fe/lol-static-assets/images/uikit/themed-level-ring/theme-15-solid-border.png");\n}\n.xp-meter-progress[theme="16"] img.filled-xp-ring {\n  content: url("/fe/lol-static-assets/images/uikit/themed-level-ring/theme-16-ring.png");\n}\n.xp-meter-progress[theme="16"] img.level-ring-border {\n  content: url("/fe/lol-static-assets/images/uikit/themed-level-ring/theme-16-border.png");\n}\n:host([simplified]) .xp-meter-progress[theme="16"] img.level-ring-border {\n  content: url("/fe/lol-static-assets/images/uikit/themed-level-ring/theme-16-simplified-border.png");\n}\n:host([social]) .xp-meter-progress[theme="16"] img {\n  height: 160%;\n  top: -30%;\n  left: -30%;\n}\n:host([social]) .xp-meter-progress[theme="16"] img.filled-xp-ring,\n:host([social]) .xp-meter-progress[theme="16"] img.unfilled-xp-ring {\n  display: none;\n}\n:host([social]) .xp-meter-progress[theme="16"] img.level-ring-border {\n  content: url("/fe/lol-static-assets/images/uikit/themed-level-ring/theme-16-social-border.png");\n}\n:host([solid]) .xp-meter-progress[theme="16"] img.filled-xp-ring,\n:host([solid]) .xp-meter-progress[theme="16"] img.unfilled-xp-ring {\n  display: none;\n}\n:host([solid]) .xp-meter-progress[theme="16"] img.level-ring-border {\n  content: url("/fe/lol-static-assets/images/uikit/themed-level-ring/theme-16-solid-border.png");\n}\n.xp-meter-progress[theme="17"] img.filled-xp-ring {\n  content: url("/fe/lol-static-assets/images/uikit/themed-level-ring/theme-17-ring.png");\n}\n.xp-meter-progress[theme="17"] img.level-ring-border {\n  content: url("/fe/lol-static-assets/images/uikit/themed-level-ring/theme-17-border.png");\n}\n:host([simplified]) .xp-meter-progress[theme="17"] img.level-ring-border {\n  content: url("/fe/lol-static-assets/images/uikit/themed-level-ring/theme-17-simplified-border.png");\n}\n:host([social]) .xp-meter-progress[theme="17"] img {\n  height: 160%;\n  top: -30%;\n  left: -30%;\n}\n:host([social]) .xp-meter-progress[theme="17"] img.filled-xp-ring,\n:host([social]) .xp-meter-progress[theme="17"] img.unfilled-xp-ring {\n  display: none;\n}\n:host([social]) .xp-meter-progress[theme="17"] img.level-ring-border {\n  content: url("/fe/lol-static-assets/images/uikit/themed-level-ring/theme-17-social-border.png");\n}\n:host([solid]) .xp-meter-progress[theme="17"] img.filled-xp-ring,\n:host([solid]) .xp-meter-progress[theme="17"] img.unfilled-xp-ring {\n  display: none;\n}\n:host([solid]) .xp-meter-progress[theme="17"] img.level-ring-border {\n  content: url("/fe/lol-static-assets/images/uikit/themed-level-ring/theme-17-solid-border.png");\n}\n.xp-meter-progress[theme="18"] img.filled-xp-ring {\n  content: url("/fe/lol-static-assets/images/uikit/themed-level-ring/theme-18-ring.png");\n}\n.xp-meter-progress[theme="18"] img.level-ring-border {\n  content: url("/fe/lol-static-assets/images/uikit/themed-level-ring/theme-18-border.png");\n}\n:host([simplified]) .xp-meter-progress[theme="18"] img.level-ring-border {\n  content: url("/fe/lol-static-assets/images/uikit/themed-level-ring/theme-18-simplified-border.png");\n}\n:host([social]) .xp-meter-progress[theme="18"] img {\n  height: 160%;\n  top: -30%;\n  left: -30%;\n}\n:host([social]) .xp-meter-progress[theme="18"] img.filled-xp-ring,\n:host([social]) .xp-meter-progress[theme="18"] img.unfilled-xp-ring {\n  display: none;\n}\n:host([social]) .xp-meter-progress[theme="18"] img.level-ring-border {\n  content: url("/fe/lol-static-assets/images/uikit/themed-level-ring/theme-18-social-border.png");\n}\n:host([solid]) .xp-meter-progress[theme="18"] img.filled-xp-ring,\n:host([solid]) .xp-meter-progress[theme="18"] img.unfilled-xp-ring {\n  display: none;\n}\n:host([solid]) .xp-meter-progress[theme="18"] img.level-ring-border {\n  content: url("/fe/lol-static-assets/images/uikit/themed-level-ring/theme-18-solid-border.png");\n}\n.xp-meter-progress[theme="19"] img.filled-xp-ring {\n  content: url("/fe/lol-static-assets/images/uikit/themed-level-ring/theme-19-ring.png");\n}\n.xp-meter-progress[theme="19"] img.level-ring-border {\n  content: url("/fe/lol-static-assets/images/uikit/themed-level-ring/theme-19-border.png");\n}\n:host([simplified]) .xp-meter-progress[theme="19"] img.level-ring-border {\n  content: url("/fe/lol-static-assets/images/uikit/themed-level-ring/theme-19-simplified-border.png");\n}\n:host([social]) .xp-meter-progress[theme="19"] img {\n  height: 160%;\n  top: -30%;\n  left: -30%;\n}\n:host([social]) .xp-meter-progress[theme="19"] img.filled-xp-ring,\n:host([social]) .xp-meter-progress[theme="19"] img.unfilled-xp-ring {\n  display: none;\n}\n:host([social]) .xp-meter-progress[theme="19"] img.level-ring-border {\n  content: url("/fe/lol-static-assets/images/uikit/themed-level-ring/theme-19-social-border.png");\n}\n:host([solid]) .xp-meter-progress[theme="19"] img.filled-xp-ring,\n:host([solid]) .xp-meter-progress[theme="19"] img.unfilled-xp-ring {\n  display: none;\n}\n:host([solid]) .xp-meter-progress[theme="19"] img.level-ring-border {\n  content: url("/fe/lol-static-assets/images/uikit/themed-level-ring/theme-19-solid-border.png");\n}\n.xp-meter-progress[theme="20"] img.filled-xp-ring {\n  content: url("/fe/lol-static-assets/images/uikit/themed-level-ring/theme-20-ring.png");\n}\n.xp-meter-progress[theme="20"] img.level-ring-border {\n  content: url("/fe/lol-static-assets/images/uikit/themed-level-ring/theme-20-border.png");\n}\n:host([simplified]) .xp-meter-progress[theme="20"] img.level-ring-border {\n  content: url("/fe/lol-static-assets/images/uikit/themed-level-ring/theme-20-simplified-border.png");\n}\n:host([social]) .xp-meter-progress[theme="20"] img {\n  height: 160%;\n  top: -30%;\n  left: -30%;\n}\n:host([social]) .xp-meter-progress[theme="20"] img.filled-xp-ring,\n:host([social]) .xp-meter-progress[theme="20"] img.unfilled-xp-ring {\n  display: none;\n}\n:host([social]) .xp-meter-progress[theme="20"] img.level-ring-border {\n  content: url("/fe/lol-static-assets/images/uikit/themed-level-ring/theme-20-social-border.png");\n}\n:host([solid]) .xp-meter-progress[theme="20"] img.filled-xp-ring,\n:host([solid]) .xp-meter-progress[theme="20"] img.unfilled-xp-ring {\n  display: none;\n}\n:host([solid]) .xp-meter-progress[theme="20"] img.level-ring-border {\n  content: url("/fe/lol-static-assets/images/uikit/themed-level-ring/theme-20-solid-border.png");\n}\n.xp-meter-progress[theme="21"] img.filled-xp-ring {\n  content: url("/fe/lol-static-assets/images/uikit/themed-level-ring/theme-21-ring.png");\n}\n.xp-meter-progress[theme="21"] img.level-ring-border {\n  content: url("/fe/lol-static-assets/images/uikit/themed-level-ring/theme-21-border.png");\n}\n:host([simplified]) .xp-meter-progress[theme="21"] img.level-ring-border {\n  content: url("/fe/lol-static-assets/images/uikit/themed-level-ring/theme-21-simplified-border.png");\n}\n:host([social]) .xp-meter-progress[theme="21"] img {\n  height: 160%;\n  top: -30%;\n  left: -30%;\n}\n:host([social]) .xp-meter-progress[theme="21"] img.filled-xp-ring,\n:host([social]) .xp-meter-progress[theme="21"] img.unfilled-xp-ring {\n  display: none;\n}\n:host([social]) .xp-meter-progress[theme="21"] img.level-ring-border {\n  content: url("/fe/lol-static-assets/images/uikit/themed-level-ring/theme-21-social-border.png");\n}\n:host([solid]) .xp-meter-progress[theme="21"] img.filled-xp-ring,\n:host([solid]) .xp-meter-progress[theme="21"] img.unfilled-xp-ring {\n  display: none;\n}\n:host([solid]) .xp-meter-progress[theme="21"] img.level-ring-border {\n  content: url("/fe/lol-static-assets/images/uikit/themed-level-ring/theme-21-solid-border.png");\n}\n.xp-meter-progress.has-fresh-xp[theme="1"] .regular img.filled-xp-ring {\n  -webkit-filter: brightness(58%) hue-rotate(0deg) saturate(133%);\n}\n.xp-meter-progress.has-fresh-xp[theme="2"] .regular img.filled-xp-ring {\n  -webkit-filter: brightness(45%) hue-rotate(7deg) saturate(142%);\n}\n.xp-meter-progress.has-fresh-xp[theme="3"] .regular img.filled-xp-ring {\n  -webkit-filter: brightness(65%) hue-rotate(33deg) saturate(139%);\n}\n.xp-meter-progress.has-fresh-xp[theme="4"] .regular img.filled-xp-ring {\n  -webkit-filter: brightness(58%) hue-rotate(-34deg) saturate(148%);\n}\n.xp-meter-progress.has-fresh-xp[theme="5"] .regular img.filled-xp-ring {\n  -webkit-filter: brightness(53%) hue-rotate(11deg) saturate(111%);\n}\n.xp-meter-progress.has-fresh-xp[theme="6"] .regular img.filled-xp-ring {\n  -webkit-filter: brightness(50%) hue-rotate(30deg) saturate(119%);\n}\n.xp-meter-progress.has-fresh-xp[theme="7"] .regular img.filled-xp-ring {\n  -webkit-filter: brightness(51%) hue-rotate(18deg) saturate(143%);\n}\n.xp-meter-progress.has-fresh-xp[theme="8"] .regular img.filled-xp-ring {\n  -webkit-filter: brightness(42%) hue-rotate(-10deg) saturate(178%);\n}\n.xp-meter-progress .level-text {\n  font-size: var(--themed-level-ring-level-text-font-size);\n  font-weight: var(--themed-level-ring-level-text-font-weight);\n  line-height: var(--themed-level-ring-level-text-line-height);\n  top: var(--themed-level-ring-level-text-top);\n  bottom: var(--themed-level-ring-level-text-bottom);\n  color: #f0e6d2;\n  position: absolute;\n  left: 0;\n  right: 0;\n  text-align: center;\n}\n:host([simplified]) .xp-meter-progress .level-text {\n  display: none;\n}\n', ""]), t.exports = o
        }, (t, e, n) => {
            "use strict";
            Object.defineProperty(e, "__esModule", {
                value: !0
            }), e.default = void 0;
            var i = n(1);
            const o = function(t, e, n, i) {
                const o = n + i / 2 - (t + e / 2),
                    r = Math.max(0, (e - 48) / 2);
                return s = o, a = -r, l = r, Math.max(a, Math.min(l, s));
                var s, a, l
            };
            class r extends i.webComponents.ShadowElement {
                static get observedAttributes() {
                    return ["caret-position", "tooltip-position", "type", "data-tooltip-position", "add-part-selector"]
                }
                templateMarkup() {
                    return n(211)
                }
                stylesheetMarkup() {
                    return n(212)
                }
                connectedCallback() {
                    super.connectedCallback(), this.addEventListener("positioned", this)
                }
                disconnectedCallback() {
                    super.disconnectedCallback(), this.removeEventListener("positioned", this)
                }
                handleEvent(t) {
                    "positioned" === t.type && (this.shadowRoot || this.render(), this.onPositioned(t))
                }
                caretPosition() {
                    return "center" === this.getAttribute("caret-position") ? "center" : "auto"
                }
                tooltipPosition() {
                    const t = this.getAttribute("tooltip-position");
                    return "left" === t || "right" === t || "bottom" === t || "top" === t ? t : "auto"
                }
                onPositioned(t) {
                    const e = this.shadowRoot,
                        n = e.querySelector(".lol-uikit-tooltip-container").getBoundingClientRect(),
                        o = t.targetRect,
                        r = this._hasPartAttribute();
                    let s = this.tooltipPosition();
                    if ("auto" === s) {
                        const t = {
                            right: n.left - o.right,
                            left: o.left - n.right,
                            top: o.top - n.bottom,
                            bottom: n.top - o.bottom
                        };
                        s = i.Lodash.reduce(t, (function(e, n, i) {
                            return !e || n > t[e] ? i : e
                        }), void 0)
                    }
                    this.setAttribute("data-tooltip-position", s), this._addPartAttribute(r, e), "auto" === this.caretPosition() && this._repositionCaret(s, n, o)
                }
                _repositionCaret(t, e, n) {
                    const i = this.shadowRoot;
                    let r = 0,
                        s = 0;
                    "left" === t || "right" === t ? r = o(e.top, e.height, n.top, n.h) : s = o(e.left, e.width, n.left, n.w);
                    const a = i.querySelector(".lol-uikit-tooltip-caret");
                    a.style.top = r ? "calc(50% + " + r + "px)" : "", a.style.left = s ? "calc(50% + " + s + "px)" : ""
                }
                _hasPartAttribute() {
                    return !!this.getAttribute("add-part-selector")
                }
                _addPartAttribute(t, e) {
                    t && (e.querySelector(".lol-uikit-tooltip").setAttribute("part", "lol-uikit-tooltip"), e.querySelector(".lol-uikit-tooltip-caret").setAttribute("part", "lol-uikit-tooltip-caret"))
                }
            }
            r.tagName = "lol-uikit-tooltip";
            var s = r;
            e.default = s
        }, t => {
            "use strict";
            t.exports = '<template>\r\n  <div class="lol-uikit-tooltip-container">\r\n    <div class="lol-uikit-tooltip">\r\n      <slot />\r\n    </div>\r\n    <div class="lol-uikit-tooltip-caret"></div>\r\n  </div>\r\n</template>\r\n'
        }, (t, e, n) => {
            var i = n(9),
                o = n(10)(i);
            o.push([t.id, ":host([data-tooltip-position='right']) .lol-uikit-tooltip {\n  border: 2px solid transparent;\n  border-image: linear-gradient(to right, #785a28 0, #463714 50%, #463714 100%) 1 stretch;\n}\n:host([data-tooltip-position='left']) .lol-uikit-tooltip {\n  border: 2px solid transparent;\n  border-image: linear-gradient(to left, #785a28 0, #463714 50%, #463714 100%) 1 stretch;\n}\n:host([data-tooltip-position='top']) .lol-uikit-tooltip {\n  border: 2px solid transparent;\n  border-image: linear-gradient(to top, #785a28 0, #463714 50%, #463714 100%) 1 stretch;\n}\n:host([data-tooltip-position='bottom']) .lol-uikit-tooltip {\n  border: 2px solid transparent;\n  border-image: linear-gradient(to bottom, #785a28 0, #463714 50%, #463714 100%) 1 stretch;\n}\n:host {\n  display: block;\n  color: #fff;\n}\n.lol-uikit-tooltip-container {\n  position: relative;\n  display: flex;\n}\n.lol-uikit-tooltip-container .lol-uikit-tooltip {\n  margin: 1px;\n  box-sizing: border-box;\n  flex: 1;\n  background-color: #1a1c21;\n  border-width: 2px;\n  box-shadow: 0 0 0 1px rgba(1,10,19,0.48);\n}\n.lol-uikit-tooltip-container .lol-uikit-tooltip::before {\n  content: '';\n  position: absolute;\n  width: calc(100% - 2px);\n  height: calc(100% - 2px);\n  top: 1px;\n  left: 1px;\n  box-shadow: 0 0 10px 1px rgba(0,0,0,0.5);\n  pointer-events: none;\n}\n.lol-uikit-tooltip-container .lol-uikit-tooltip-caret {\n  position: absolute;\n  display: flex;\n}\n.lol-uikit-tooltip-container .lol-uikit-tooltip-caret::before {\n  content: '';\n  position: absolute;\n  width: 24px;\n  height: 15px;\n  background: url(\"/fe/lol-uikit/images/tooltip-caret.png\") center no-repeat;\n  background-size: contain;\n  filter: drop-shadow(0px 2px 1px rgba(1,10,19,0.5));\n}\n:host([type='system']) .lol-uikit-tooltip-caret::before {\n  width: 16px;\n  height: 11px;\n  background: url(\"/fe/lol-uikit/images/tooltip-system-caret.png\") center no-repeat;\n  background-size: contain;\n}\n:host([type='system'][data-tooltip-position='right']) .lol-uikit-tooltip-caret::before,\n:host([type='system'][data-tooltip-position='left']) .lol-uikit-tooltip-caret::before {\n  top: calc(50% + 8px);\n}\n:host([type='system'][data-tooltip-position='top']) .lol-uikit-tooltip-caret::before,\n:host([type='system'][data-tooltip-position='bottom']) .lol-uikit-tooltip-caret::before {\n  left: calc(50% - 8px);\n}\n:host([type='system'][data-tooltip-position='bottom']) .lol-uikit-tooltip-caret::before {\n  height: 10px;\n}\n:host([type='attention']) {\n  color: #32281e;\n  cursor: pointer;\n}\n:host([type='attention']) .lol-uikit-tooltip {\n  margin: 1px;\n  box-sizing: border-box;\n  flex: 1;\n  background-color: #c89b3c;\n  border: none;\n  padding-left: 44px;\n}\n:host([type='attention']) .lol-uikit-tooltip::after {\n  content: '';\n  position: absolute;\n  margin-top: -16px;\n  left: 12px;\n  top: 50%;\n  width: 32px;\n  height: 32px;\n  background: url(\"/fe/lol-uikit/images/attention-info.svg\") no-repeat;\n}\n:host([type='attention']) .lol-uikit-tooltip-caret {\n  position: absolute;\n  display: flex;\n}\n:host([type='attention']) .lol-uikit-tooltip-caret::before {\n  background: none;\n  border: 13px solid transparent;\n  width: 0;\n  height: 0;\n  border-top-width: 15px;\n  border-bottom-width: 15px;\n  border-top-color: #c89b3c;\n}\n:host([type='banner']) .lol-uikit-tooltip {\n  border: 2px solid #785a28;\n}\n:host([data-tooltip-position='right']) .lol-uikit-tooltip-caret,\n:host([data-tooltip-position='left']) .lol-uikit-tooltip-caret {\n  top: 50%;\n}\n:host([data-tooltip-position='right']) .lol-uikit-tooltip-caret::before,\n:host([data-tooltip-position='left']) .lol-uikit-tooltip-caret::before {\n  top: calc(50% + 12px);\n}\n:host([data-tooltip-position='top']) .lol-uikit-tooltip-caret,\n:host([data-tooltip-position='bottom']) .lol-uikit-tooltip-caret {\n  left: 50%;\n}\n:host([data-tooltip-position='top']) .lol-uikit-tooltip-caret::before,\n:host([data-tooltip-position='bottom']) .lol-uikit-tooltip-caret::before {\n  left: calc(50% - 12px);\n  transform-origin: center center;\n}\n:host([data-tooltip-position='right']) .lol-uikit-tooltip-container {\n  margin: 0 0 0 13px;\n}\n:host([data-tooltip-position='right']) .lol-uikit-tooltip-caret {\n  left: 0;\n}\n:host([data-tooltip-position='right']) .lol-uikit-tooltip-caret::before {\n  right: -3px;\n  transform-origin: top right;\n  transform: rotate(90deg);\n}\n:host([data-tooltip-position='left']) .lol-uikit-tooltip-container {\n  margin: 0 13px 0 0;\n}\n:host([data-tooltip-position='left']) .lol-uikit-tooltip-caret {\n  right: 0;\n}\n:host([data-tooltip-position='left']) .lol-uikit-tooltip-caret::before {\n  left: -3px;\n  transform-origin: top left;\n  transform: rotate(270deg);\n}\n:host([data-tooltip-position='top']) .lol-uikit-tooltip-container {\n  margin: 0 0 13px 0;\n}\n:host([data-tooltip-position='top']) .lol-uikit-tooltip-caret {\n  bottom: 0;\n}\n:host([data-tooltip-position='top']) .lol-uikit-tooltip-caret::before {\n  top: -3px;\n}\n:host([data-tooltip-position='bottom']) .lol-uikit-tooltip-container {\n  margin: 13px 0 0 0;\n}\n:host([data-tooltip-position='bottom']) .lol-uikit-tooltip-caret {\n  top: 0;\n}\n:host([data-tooltip-position='bottom']) .lol-uikit-tooltip-caret::before {\n  bottom: -3px;\n  transform: rotate(180deg);\n  height: 14px;\n}\n", ""]), t.exports = o
        }, (t, e, n) => {
            "use strict";
            Object.defineProperty(e, "__esModule", {
                value: !0
            }), e.default = void 0;
            var i, o = n(1),
                r = (i = n(165)) && i.__esModule ? i : {
                    default: i
                };
            class s extends o.webComponents.ShadowElement {
                static get observedAttributes() {
                    return ["key", "disabled"]
                }
                templateMarkup() {
                    return n(214)
                }
                connectedCallback() {
                    super.connectedCallback(), this._tooltipAssigned = !1, this._hovertipData = null;
                    const t = this.getAttribute("key");
                    this.handleKeyAttribute(t)
                }
                handleKeyAttribute(t) {
                    t && o.gameDataBinding.get("/assets/v1/hovertips.json").then((t => this._hovertipDataHandler(t)))
                }
                _hovertipDataHandler(t) {
                    const e = t ? t.find((t => t.key === this.getAttribute("key"))) : null;
                    e ? (this.removeAttribute("disabled"), this._bindMouseoverHandler(e)) : this.setAttribute("disabled", "")
                }
                _bindMouseoverHandler(t) {
                    this.addEventListener("mouseover", (() => {
                        if (!this._tooltipAssigned && t) {
                            const e = {
                                targetAnchor: {
                                    x: "center",
                                    y: "top"
                                },
                                tooltipAnchor: {
                                    x: "center",
                                    y: "bottom"
                                }
                            };
                            r.default.assign(this, this._tooltipDOM(t.value), void 0, e), this._tooltipAssigned = !0, r.default.show(this)
                        }
                    }))
                }
                _tooltipDOM(t) {
                    if (!this._tooltip) {
                        let t = this.querySelector("lol-uikit-tooltip");
                        if (!t) {
                            const e = this.shadowRoot.getElementById("lol-uikit-template-keyword-tooltip"),
                                n = document.importNode(e.content, !0);
                            this.appendChild(n), t = this.querySelector("lol-uikit-tooltip")
                        }
                        this._tooltip = t
                    }
                    return this._tooltip.querySelector("p").textContent = t, this._tooltip
                }
            }
            s.tagName = "lol-uikit-tooltipped-keyword";
            var a = s;
            e.default = a
        }, t => {
            "use strict";
            t.exports = '<template>\r\n  <slot></slot>\r\n\r\n  <template id="lol-uikit-template-keyword-tooltip"">\r\n    <lol-uikit-tooltip>\r\n      <lol-uikit-content-block type="tooltip-system">\r\n        <p class="keyword-tooltip-content"></p>\r\n      </lol-uikit-content-block>\r\n    </lol-uikit-tooltip>\r\n  </template>\r\n</template>'
        }, (t, e, n) => {
            "use strict";
            Object.defineProperty(e, "__esModule", {
                value: !0
            }), e.default = void 0;
            var i, o = (i = n(53)) && i.__esModule ? i : {
                default: i
            };
            class r extends o.default {
                templateMarkup() {
                    return n(216)
                }
                static get observedAttributes() {
                    return ["next-state"]
                }
                attributeChangedCallback(t, e, n) {
                    super.attributeChangedCallback(t, e, n)
                }
                activate(t) {
                    this.isActive() && this.deactivate(), super.activate((() => {
                        t(this.getNextState())
                    }))
                }
                deactivate() {
                    super.deactivate()
                }
                getConditions() {
                    return Array.from(this.children)
                }
                getActiveConditions() {
                    return this.getConditions().filter((function(t) {
                        return t && t.isActive()
                    }))
                }
                getNextState() {
                    return this.getAttribute("next-state")
                }
                static isTransition(t) {
                    return t && t instanceof r
                }
            }
            r.tagName = "uikit-transition";
            var s = r;
            e.default = s
        }, t => {
            "use strict";
            t.exports = "<template>\r\n  <slot></slot>\r\n</template>\r\n"
        }, (t, e, n) => {
            "use strict";
            Object.defineProperty(e, "__esModule", {
                value: !0
            }), e.default = void 0;
            var i = function(t, e) {
                    if (!e && t && t.__esModule) return t;
                    if (null === t || "object" != typeof t && "function" != typeof t) return {
                        default: t
                    };
                    var n = r(e);
                    if (n && n.has(t)) return n.get(t);
                    var i = {},
                        o = Object.defineProperty && Object.getOwnPropertyDescriptor;
                    for (var s in t)
                        if ("default" !== s && Object.prototype.hasOwnProperty.call(t, s)) {
                            var a = o ? Object.getOwnPropertyDescriptor(t, s) : null;
                            a && (a.get || a.set) ? Object.defineProperty(i, s, a) : i[s] = t[s]
                        } i.default = t, n && n.set(t, i);
                    return i
                }(n(1)),
                o = n(218);

            function r(t) {
                if ("function" != typeof WeakMap) return null;
                var e = new WeakMap,
                    n = new WeakMap;
                return (r = function(t) {
                    return t ? n : e
                })(t)
            }
            const {
                webComponents: s
            } = i.default, a = "no-preserve-state", l = "wait-for-end", d = "start", c = "done", u = "signal", p = "interupt", h = ["mousemove", "scroll", "keypress"];
            class m extends s.ShadowElement {
                templateMarkup() {
                    return n(219)
                }
                constructor() {
                    super(), this.isAttached = !1, (0, o.elementDeprecated)(this, "This element is to be obsoleted in favor of uikit-state-machine and uikit-video, please see documentation for more info"), this._dispatchVideoEventStart = t => this.dispatchVideoEvent("videoStateStart", t), this._dispatchVideoEventDone = t => this.dispatchVideoEvent("videoStateDone", t), this._dispatchVideoEventSignal = t => this.dispatchVideoEvent("videoStateSignal", t), this._setInactiveStateHandler = i.Lodash.debounce((() => this._setInactiveState()), "120000"), this._resumeVideosEvent = this._resumeVideos.bind(this)
                }
                static get observedAttributes() {
                    return [a, l]
                }
                connectedCallback() {
                    super.connectedCallback(), this.isAttached = !0, this.dispatchEvent(new Event("attached")), this._setInactiveStateHandler(), this._addInactiveListeners()
                }
                disconnectedCallback() {
                    super.disconnectedCallback(), this.isAttached = !1, this.dispatchEvent(new Event("detached")), this._removeInactiveListeners()
                }
                dispatchEvent(t) {
                    super.dispatchEvent(t);
                    const e = this.getElementsByTagName("lol-uikit-video-group");
                    for (let n = 0; n < e.length; n++) this.playGroupState(e[n], t)
                }
                playGroupState(t, e) {
                    const n = t.querySelector("lol-uikit-video-state[state=" + e.type + "]");
                    if (!n) return;
                    const i = n.hasAttribute(a) ? t.querySelectorAll("lol-uikit-video-state") : t.querySelectorAll("lol-uikit-video-state:not([state=" + e.type + "])");
                    if (e.type !== t.currentState || n.hasAttribute(a)) {
                        t.currentState = e.type;
                        for (let t = 0; t < i.length; t++) this.interuptAllVideos(i[t]);
                        t.playPromise ? t.playPromise.then((() => (t.playPromise = this.playState(n), null))) : t.playPromise = this.playState(n)
                    }
                }
                playState(t) {
                    const e = t.hasAttribute(l),
                        n = t.querySelector('lol-uikit-video[type="intro"]'),
                        i = t.querySelector('lol-uikit-video[type="idle"]'),
                        o = t.querySelector('lol-uikit-video[type="outro"]');
                    return new Promise((t => {
                        e || t(), this.addVideoListeners(n), this.addVideoListeners(i), this.addVideoListeners(o), this._playVideo(n).then((t => {
                            if (t !== p) return this._playVideo(i)
                        })).then((() => this._playVideo(o))).then((() => {
                            this.removeVideoListeners(n), this.removeVideoListeners(i), this.removeVideoListeners(o), t()
                        }))
                    }))
                }
                addVideoListeners(t) {
                    t && (t.addEventListener(d, this._dispatchVideoEventStart), t.addEventListener(c, this._dispatchVideoEventDone), t.addEventListener(u, this._dispatchVideoEventSignal))
                }
                removeVideoListeners(t) {
                    t && (t.removeEventListener(d, this._dispatchVideoEventStart), t.removeEventListener(c, this._dispatchVideoEventDone), t.removeEventListener(u, this._dispatchVideoEventSignal))
                }
                _playVideo(t) {
                    return t ? t.play() : Promise.resolve()
                }
                interuptAllVideos(t) {
                    if (!t) return;
                    const e = t.querySelectorAll("lol-uikit-video:not([type=outro])");
                    for (let t = 0; t < e.length; t++) e[t].dispatchEvent(new Event(p))
                }
                dispatchVideoEvent(t, e) {
                    const n = e.target,
                        i = n.getAttribute("type"),
                        o = n.parentElement.getAttribute("state"),
                        r = n.hasAttribute("name") ? n.getAttribute("name") : "",
                        s = new CustomEvent(t, {
                            detail: {
                                state: o,
                                type: i,
                                video: r
                            }
                        });
                    this.dispatchEvent(s)
                }
                _addInputDetection(t) {
                    h.forEach((e => {
                        window.addEventListener(e, t)
                    }))
                }
                _removeInputDetection(t) {
                    h.forEach((e => {
                        window.removeEventListener(e, t)
                    }))
                }
                _addInactiveListeners() {
                    this._addInputDetection(this._setInactiveStateHandler)
                }
                _removeInactiveListeners() {
                    this._removeInputDetection(this._setInactiveStateHandler)
                }
                _addResumeListeners() {
                    this._addInputDetection(this._resumeVideosEvent)
                }
                _removeResumeListeners() {
                    this._removeInputDetection(this._resumeVideosEvent)
                }
                _resumeVideos() {
                    this._removeResumeListeners();
                    const t = this.querySelectorAll('lol-uikit-video[type="idle"]');
                    for (let e = 0; e < t.length; e++) t[e].resume()
                }
                _setInactiveState() {
                    this._addResumeListeners();
                    const t = this.querySelectorAll('lol-uikit-video[type="idle"]');
                    for (let e = 0; e < t.length; e++) t[e].pause()
                }
            }
            m.tagName = "lol-uikit-video-state-machine";
            var g = m;
            e.default = g
        }, (t, e, n) => {
            "use strict";
            Object.defineProperty(e, "__esModule", {
                value: !0
            }), e.elementDeprecated = function(t, e) {
                return void 0;
                const n = t.tagName,
                    r = o.has(n),
                    s = o.get(n) || [];
                s.push(t), r || i.logger.trace("Element deprecation warning", {
                    elemName: n,
                    message: e
                });
                o.set(n, s)
            };
            var i = n(1);
            const o = new Map
        }, t => {
            "use strict";
            t.exports = "<template>\r\n  <slot></slot>\r\n</template>\r\n"
        }, (t, e, n) => {
            "use strict";
            Object.defineProperty(e, "__esModule", {
                value: !0
            }), e.default = void 0;
            var i = s(n(1)),
                o = s(n(221)),
                r = n(218);

            function s(t) {
                return t && t.__esModule ? t : {
                    default: t
                }
            }
            const {
                webComponents: a
            } = i.default, l = "type", d = "preload", c = "signal-before-end", u = "state", p = "interupt", h = "signalEnd", m = "idle";
            class g extends a.ShadowElement {
                templateMarkup() {
                    return n(223)
                }
                static get observedAttributes() {
                    return ["fade-in", "fade-out", "src", l, d, c, "alignment", u]
                }
                constructor() {
                    super(), (0, r.elementDeprecated)(this, "This element is to be obsoleted in favor of uikit-state-machine and uikit-video, please see documentation for more info"), this._video, this._start = this._startHandler.bind(this), this._ended = this._endedHandler.bind(this), this._signalEnd = this._signalEndHandler.bind(this), this._dispose = this.dispose.bind(this), this._pause = this.pause.bind(this), this._resume = this.resume.bind(this), this.addEventListener(p, this._dispose), this.addEventListener("pause", this._pause), this.addEventListener("resume", this._resume)
                }
                connectedCallback() {
                    super.connectedCallback(), this.hasAttribute(d) && (this._video = this._createVideoElement())
                }
                disconnectedCallback() {
                    super.disconnectedCallback(), this.disposeAll()
                }
                attributeChangedCallback(t, e, n) {
                    super.attributeChangedCallback(arguments);
                    const i = this._video;
                    !i || i.played.length > 0 || ("src" === t && (n ? (i.src = n, i.load()) : (i.pause(), i.src = "")), t === u ? i.loop = n === m : i.setAttribute(t, n))
                }
                play() {
                    return new Promise((t => {
                        const e = this._video || this._createVideoElement();
                        this._message = this.getAttribute(l);
                        let n = new o.default(e);
                        const i = () => {
                            this._removeEventHandlers(e), this._endedHandler(), this._video = null, t(this._message)
                        };
                        let r;
                        const s = () => {
                                r(), n = null
                            },
                            a = () => {
                                r(), this._removeEventHandlers(e), n = null, this._video = null
                            };
                        r = () => {
                            e.removeEventListener("resolve", i), e.removeEventListener("remove", s), e.removeEventListener("destroy", a)
                        }, e.addEventListener("resolve", i), e.addEventListener("remove", s), e.addEventListener("destroy", a), this._addEventHandlers(e), this.hasAttribute(d) || this.appendChild(e), n.setSignalEnd(this.getAttribute(c)), n.play()
                    }))
                }
                pause() {
                    const t = this.querySelectorAll("video");
                    for (let e = 0; e < t.length; e++) {
                        const n = t[e];
                        !n.paused && n.currentTime > 0 && n.pause()
                    }
                }
                resume() {
                    const t = this.querySelectorAll("video");
                    for (let e = 0; e < t.length; e++) {
                        const n = t[e];
                        n.paused && n.played.length > 0 && n.play()
                    }
                }
                dispose() {
                    this._message = p;
                    const t = this.querySelectorAll("video");
                    for (let e = 0; e < t.length; e++) {
                        const n = t[e];
                        (!this.hasAttribute(d) || this.hasAttribute(d) && n.played.length > 0) && n.dispatchEvent(new Event(p))
                    }
                }
                disposeAll() {
                    const t = this.querySelectorAll("video");
                    for (let e = 0; e < t.length; e++) {
                        const n = t[e];
                        n.pause(), n.dispatchEvent(new Event("destroy")), n.src = "", n.parentElement && n.parentElement.removeChild(n)
                    }
                }
                _createVideoElement() {
                    const t = this.hasAttribute("src") ? this.getAttribute("src") : "",
                        e = this.hasAttribute("alignment") ? this.getAttribute("alignment") : "",
                        n = this.getAttribute("type"),
                        i = document.createElement("video");
                    return i.className = "lol-uikit-video-content", i.autoplay = !this.hasAttribute(d), i.loop = n === m, i.src = t, "center" === e && i.classList.add("lol-uikit-video-content-centered"), "" !== t && i.load(), this.hasAttribute(d) && this.appendChild(i), i
                }
                _addEventHandlers(t) {
                    t.addEventListener("play", this._start), t.addEventListener("ended", this._ended), t.addEventListener("error", this._ended), t.addEventListener("stalled", this._ended), t.addEventListener(h, this._signalEnd)
                }
                _removeEventHandlers(t) {
                    t.removeEventListener("play", this._start), t.removeEventListener("ended", this._ended), t.removeEventListener("error", this._ended), t.removeEventListener("stalled", this._ended), t.removeEventListener(h, this._signalEnd)
                }
                _startHandler() {
                    this.dispatchEvent(new Event("start"))
                }
                _endedHandler(t) {
                    t && "error" === t.type && 3 === t.target.error.code ? this.play() : this.dispatchEvent(new Event("done"))
                }
                _signalEndHandler() {
                    this.dispatchEvent(new Event("signal"))
                }
            }
            g.tagName = "lol-uikit-video";
            var f = g;
            e.default = f
        }, (t, e, n) => {
            "use strict";
            Object.defineProperty(e, "__esModule", {
                value: !0
            }), e.default = void 0;
            var i, o = n(1),
                r = (i = n(222)) && i.__esModule ? i : {
                    default: i
                };
            const s = "fade-in",
                a = "fade-out",
                l = "interupt",
                d = new r.default,
                c = new r.default,
                u = new r.default;
            var p = class {
                constructor(t) {
                    this._video = t, this._signalEnd = null, this._done = !1, this._animate = null, this._boundHandleEnded = this._handleEnded.bind(this)
                }
                play() {
                    this._addEventHandlers(), this.canPlay() ? this._handleReadyToPlay() : d.addVideoHandler(this, this.canPlay, this._handleReadyToPlay)
                }
                setSignalEnd(t) {
                    this._signalEnd = t
                }
                canPlay() {
                    const t = this._video;
                    return !!t && t.readyState > 3
                }
                _handleReadyToPlay() {
                    d.removeVideoHandler(this);
                    const t = this._video;
                    t.autoplay || t.play();
                    const e = t.parentElement,
                        n = e && e.hasAttribute(s) ? e.getAttribute(s) : 300;
                    this._animate = t.animate([{
                        opacity: 0
                    }, {
                        opacity: 1
                    }], {
                        duration: this._convertToNumber(n),
                        fill: "both"
                    }), this._animate.play(), t.loop || this._isEnding() || c.addVideoHandler(this, this._isEnding, this._handleEnding), t.loop || this._hasEnded() || u.addVideoHandler(this, this._hasEnded, this._handleEnded)
                }
                _addEventHandlers() {
                    const t = this._video;
                    t.addEventListener("ended", this._boundHandleEnded), t.addEventListener("error", this._boundHandleEnded), t.addEventListener("stalled", this._boundHandleEnded), t.addEventListener(l, this._boundHandleEnded)
                }
                _removeEventHandlers() {
                    const t = this._video;
                    t.removeEventListener("ended", this._boundHandleEnded), t.removeEventListener("error", this._boundHandleEnded), t.removeEventListener("stalled", this._boundHandleEnded), t.removeEventListener(l, this._boundHandleEnded)
                }
                _isEnding() {
                    const t = this._video;
                    return !!t && (this._signalEnd && t.duration - this._signalEnd <= t.currentTime)
                }
                _hasEnded() {
                    const t = this._video;
                    return !!t && (t.duration - .2 <= t.currentTime || isNaN(t.duration))
                }
                _handleEnding() {
                    c.removeVideoHandler(this), this._signalEnd && (this._video.dispatchEvent(new Event("signalEnd")), this._signalEnd = null)
                }
                _handleEnded(t) {
                    t && "error" === t.type && t.target.error && 3 === t.target.error.code ? o.logger.warning("lol-uikit-video threw error event:", t.target.error) : (u.removeVideoHandler(this), this._video && (this._handleEnding(), this._clearVideo()))
                }
                _clearVideo() {
                    d.removeVideoHandler(this), c.removeVideoHandler(this), u.removeVideoHandler(this);
                    const t = this._video;
                    if (this._done) return;
                    if (!this._animate) return void this._removeVideo();
                    t.dispatchEvent(new Event("resolve"));
                    const e = t.parentElement,
                        n = e && e.hasAttribute(a) ? e.getAttribute(a) : 300;
                    "finished" !== this._animate.playState ? this._animate.reverse() : (this._animate = t.animate([{
                        opacity: 1
                    }, {
                        opacity: 0
                    }], {
                        duration: this._convertToNumber(n),
                        delay: this._convertToNumber(n) / 2,
                        fill: "both"
                    }), this._animate.play()), this._animate.onfinish = this._removeVideo.bind(this), this._done = !0
                }
                _removeVideo() {
                    const t = this._video;
                    t && (this._removeEventHandlers(), t.src = "", t.parentElement && t.parentElement.removeChild(t), t.dispatchEvent(new Event("remove")), this._video = null)
                }
                _convertToNumber(t) {
                    if (!isNaN(t)) return parseInt(t);
                    o.logger.warning('<lol-uikit-video> attributes fade-in and fade-out must be millisecond integer values without "ms" or "s". Support for time values is deprecated.');
                    const e = t.match(/(\d+)/g);
                    return parseInt(e[0])
                }
            };
            e.default = p
        }, (t, e) => {
            "use strict";
            Object.defineProperty(e, "__esModule", {
                value: !0
            }), e.default = void 0;
            const n = new Set;
            let i = 0;

            function o() {
                n.forEach((t => t()))
            }
            e.default = class {
                constructor() {
                    this._videoHandlers = new Map, this._boundTick = this._tick.bind(this)
                }
                addVideoHandler(t, e, n) {
                    this._videoHandlers.set(t, {
                        checkFunction: e,
                        callbackFunction: n
                    }), this._ensureClockRegistration()
                }
                removeVideoHandler(t) {
                    this._videoHandlers.delete(t), this._ensureClockRegistration()
                }
                _tick() {
                    for (const [t, {
                            checkFunction: e,
                            callbackFunction: n
                        }] of this._videoHandlers) {
                        e.call(t) && (this._videoHandlers.delete(t), n.call(t))
                    }
                    this._ensureClockRegistration()
                }
                _ensureClockRegistration() {
                    var t;
                    this._videoHandlers.size ? (t = this._boundTick, n.add(t), 0 === i && (i = setInterval(o, 100))) : function(t) {
                        n.delete(t), 0 === n.size && (clearInterval(i), i = 0)
                    }(this._boundTick)
                }
            }
        }, t => {
            "use strict";
            t.exports = "<template>\r\n  <slot></slot>\r\n</template>\r\n"
        }, (t, e, n) => {
            var i = {
                "./dialog-alert/index.js": 225,
                "./dialog-celebration/index.js": 228,
                "./dialog-confirm/index.js": 229,
                "./dialog-dismiss/index.js": 230,
                "./dialog-toast-celebration/index.js": 231,
                "./dialog-toast/index.js": 233,
                "./first-touch-modal/index.js": 235,
                "./vignette-celebration/index.js": 236
            };

            function o(t) {
                var e = r(t);
                return n(e)
            }

            function r(t) {
                if (!n.o(i, t)) {
                    var e = new Error("Cannot find module '" + t + "'");
                    throw e.code = "MODULE_NOT_FOUND", e
                }
                return i[t]
            }
            o.keys = function() {
                return Object.keys(i)
            }, o.resolve = r, t.exports = o, o.id = 224
        }, (t, e, n) => {
            "use strict";
            Object.defineProperty(e, "__esModule", {
                value: !0
            }), e.default = void 0;
            var i = l(n(2)),
                o = l(n(19)),
                r = l(n(226)),
                s = l(n(227)),
                a = n(16);

            function l(t) {
                return t && t.__esModule ? t : {
                    default: t
                }
            }
            const d = "ok-button",
                c = "close-button";
            class u {
                static registerAs = "DialogAlert";
                static template() {
                    return i.default.get().getElementById("lol-uikit-template-dialog-alert")
                }
                static create(t) {
                    const e = (0, o.default)("<div />").addClass("dialog-alert");
                    t && t.noDefaultPadding && e.attr("no-default-padding", "");
                    let n = null;
                    const i = t && "string" == typeof t.okText && t.okText.length > 0,
                        r = t && t.dismissible,
                        a = t && t.dismissibleType,
                        l = t && t.onClose,
                        d = function(t, e) {
                            let n = !0;
                            t && !1 === t[e] && (n = !1);
                            return n
                        }(t, "enterEnabled");
                    if (!1 === (i || r)) throw new Error("either okText or dismissible is required");
                    e.append(u.template().innerHTML);
                    const c = e.find("lol-uikit-dialog-frame.dialog-frame");
                    if (i) {
                        const i = s.default.dialogButtonGroupSingleButton(t.okText);
                        c.append(i), n = e.find("lol-uikit-flat-button.button-ok"), (t.primaryButton || void 0 === t.primaryButton) && n.attr({
                            primary: !0
                        })
                    }
                    r && (0, o.default)(c).attr("close-button", ""), a && (0, o.default)(c).attr("dismissable-type", a), u._appendContents(e, t);
                    return u._createModalObj(e, c, r, i, n, d, a, l)
                }
                static _appendContents(t, e) {
                    let n = e.contents ? e.contents : "";
                    const i = t.find(".dialog-content");
                    "string" == typeof n && (n = s.default.contentBlockDialogSimple(n)), i.append((0, o.default)(n))
                }
                static _createModalObj(t, e, n, i, o, r, s, l) {
                    const p = {
                            domNode: t[0]
                        },
                        h = i ? o.get(0) : null;
                    return p.okPromise = new Promise((s => {
                        function l(t) {
                            s(t), u._close(p)
                        }
                        if (i && (t.on("keydown", (t => {
                                13 === t.which && !h.disabled && r && l(d)
                            })), o.on("click", (0, a.leftClickHandler)((() => {
                                h.disabled || l(d)
                            })))), n) {
                            e.on("dialogFrameDismissed", (() => {
                                l(c)
                            })), e.on("mousedown", (t => !1));
                            let n = !1;
                            t.on("mousedown", (() => {
                                n = !1
                            })), t.on("mousemove", (() => {
                                n = !0
                            })), t.on("mouseup", (() => {
                                n || l(c)
                            }))
                        }
                    })), p.okPromise.then((t => {
                        l && "function" == typeof l && l(t)
                    })), i && (p.focusOkButton = function() {
                        o.focus()
                    }, p.disableOkButton = function() {
                        h.disabled = !0
                    }, p.enableOkButton = function() {
                        h.disabled = void 0
                    }, p.clickOkButton = function() {
                        h.dispatchEvent(new MouseEvent("click", {
                            button: 0
                        }))
                    }), p
                }
                static _close(t) {
                    r.default.remove(t)
                }
            }
            u.tagName = "lol-uikit-dialog-alert";
            var p = u;
            e.default = p
        }, (t, e, n) => {
            "use strict";
            Object.defineProperty(e, "__esModule", {
                value: !0
            }), e.default = void 0;
            var i, o = (i = n(167)) && i.__esModule ? i : {
                    default: i
                },
                r = function(t, e) {
                    if (!e && t && t.__esModule) return t;
                    if (null === t || "object" != typeof t && "function" != typeof t) return {
                        default: t
                    };
                    var n = s(e);
                    if (n && n.has(t)) return n.get(t);
                    var i = {},
                        o = Object.defineProperty && Object.getOwnPropertyDescriptor;
                    for (var r in t)
                        if ("default" !== r && Object.prototype.hasOwnProperty.call(t, r)) {
                            var a = o ? Object.getOwnPropertyDescriptor(t, r) : null;
                            a && (a.get || a.set) ? Object.defineProperty(i, r, a) : i[r] = t[r]
                        } i.default = t, n && n.set(t, i);
                    return i
                }(n(1));

            function s(t) {
                if ("function" != typeof WeakMap) return null;
                var e = new WeakMap,
                    n = new WeakMap;
                return (s = function(t) {
                    return t ? n : e
                })(t)
            }
            var a = new class {
                constructor() {
                    this.gameflowModalLock = !1, this.lockAndLoadLock = !1, this.type = "Modal", this.eligibleModalQueue = [], this.layer = this.createLayer(), this.addGameDataBinding(), this.addLockAndLoadListeners()
                }
                createLayer() {
                    const t = document.createElement("div");
                    return t.classList.add("modal"), t.style.position = "absolute", t.style.left = "0", t.style.right = "0", t.style.top = "0", t.style.bottom = "0", t
                }
                showLayer() {
                    o.default.addLayer(this.layer)
                }
                hideLayer() {
                    o.default.removeLayer(this.layer)
                }
                getDOMNode(t) {
                    if (t && !r.Lodash.isEmpty(t)) return t.domNode
                }
                initializeDomNodes(t) {
                    if ("Modal" === t.type) {
                        if (!t.domNode) {
                            const e = document.createElement("lol-uikit-full-page-backdrop");
                            e.classList.add("backdrop"), t.domNode = e
                        }
                        t.children || (t.children = []);
                        for (let e = 0; e < t.children.length; e++) {
                            const n = t.children[e];
                            if (n.owner = t.domNode, n.ComponentFactory = n.ComponentFactory || t.ComponentFactory, !n.domNode) {
                                const i = n.ComponentFactory.create(n);
                                r.Lodash.isObject(i) && r.Lodash.assign(i, n), t.children[e] = i
                            }
                        }
                    }
                }
                styleDOMNode(t) {
                    t.style.display = "flex", t.style["align-items"] = "center", t.style["justify-content"] = "center", t.style.position = "absolute", t.style.top = 0, t.style.bottom = 0, t.style.right = 0, t.style.left = 0
                }
                getModalsAndChildren() {
                    const t = [];
                    let e = this.eligibleModalQueue.slice(0);
                    for (; e.length;) {
                        const n = e[e.length - 1];
                        t.push(n), e.splice(e.length - 1, 1), e = e.concat(n.children || [])
                    }
                    return t
                }
                getActiveModal() {
                    const t = this.eligibleModalQueue.length && this.eligibleModalQueue[0];
                    return t && this.isModalVisible(t) ? t : null
                }
                getModalByDOMNode(t) {
                    if (!t) return;
                    const e = this.getModalsAndChildren(),
                        n = e.map((function(t) {
                            return t.domNode
                        }));
                    for (; t;) {
                        const i = n.indexOf(t);
                        if (-1 !== i) return e[i];
                        t = t.parentElement
                    }
                }
                isModalVisible(t) {
                    return !(!this.layer || !t.domNode) && -1 !== Array.prototype.slice.call(this.layer.children).indexOf(t.domNode)
                }
                showModal(t) {
                    this.forceShowModal(t)
                }
                forceShowModal(t) {
                    if (t) {
                        if (this._forceShowModal(t), this.isType(t) && t.children && t.children.length) {
                            const e = t.children[0];
                            e.owner = t.domNode, e.ComponentFactory = e.ComponentFactory || t.ComponentFactory, this._forceShowModal(e)
                        }
                        return t
                    }
                }
                _forceShowModal(t) {
                    let e;
                    this.showLayer();
                    const n = this.getModalByDOMNode(t.owner);
                    n ? (n.children || (n.children = []), e = n.children.indexOf(t), -1 === e ? n.children.unshift(t) : e > 0 && (n.children.splice(e, 1), n.children.unshift(t)), this._forceShowModal(n)) : (e = this.eligibleModalQueue.indexOf(t), -1 === e ? this.eligibleModalQueue.unshift(t) : e > 0 && (this.eligibleModalQueue.splice(e, 1), this.eligibleModalQueue.unshift(t)));
                    const i = this.getDOMNode(t);
                    for (let t = 0; t < this.layer.children.length; t++)
                        if (this.layer.children[t] === i) return;
                    this.styleDOMNode(i), this.layer.appendChild(i), i.dispatchEvent(new Event("modalShow"))
                }
                removeModal(t, e) {
                    let n, i = !1;
                    if (!t) return !1;
                    const o = this.getModalByDOMNode(t.owner);
                    if (o) {
                        if (o.children || (o.children = []), n = o.children.indexOf(t), n > 0) i = !0, o.children.splice(n, 1), this.deleteModal(t, e);
                        else if (0 === n && (i = !0, o.children.splice(n, 1), this.deleteModal(t, e), o.children.length)) return this.forceShowModal(o.children[0]), i;
                        if (this.isType(o) && (!o.children || !o.children.length)) return this.removeModal(o), i
                    } else n = this.eligibleModalQueue.indexOf(t), -1 !== n && (this.eligibleModalQueue.splice(n, 1), this.deleteModal(t, e), i = !0);
                    if (n = Array.prototype.slice.call(this.layer.children).indexOf(t.domNode), -1 !== n)
                        for (let t = this.layer.children.length - 1; t >= n; t--) this.layer.removeChild(this.layer.children[t]);
                    return 0 === this.layer.children.length && this.displayNextNotificationIfEligible(), i
                }
                remove(t, e) {
                    return this.removeModal(t, e)
                }
                deleteModal(t, e) {
                    return !!t && (e && e(t), t.onRemove && t.onRemove(), !0)
                }
                addGameDataBinding() {
                    r.default.gameFlowBinding.addObserver("v1/session", this, this.gameflowSessionHandler.bind(this))
                }
                gameflowSessionHandler(t) {
                    if (t) {
                        const e = t.gameClient.running;
                        this.gameflowModalLock = e, e || this.displayNextNotificationIfEligible()
                    } else this.gameflowModalLock = !1
                }
                addLockAndLoadListeners() {
                    const t = (0, r.getProvider)().get("rcp-fe-lol-lock-and-load");
                    this.lockAndLoadLock = t.getLockState(), t.addEventListener("lock", (() => {
                        this.lockAndLoadLock = !0
                    })), t.addEventListener("unlock", (() => {
                        this.lockAndLoadLock = !1, this.displayNextNotificationIfEligible()
                    }))
                }
                prependModal(t) {
                    const e = this._showModalWithParentIfParentExists(t);
                    return e || (-1 === this.eligibleModalQueue.indexOf(t) && (this.eligibleModalQueue.splice(1, 0, t), this.displayNextNotificationIfEligible()), t)
                }
                appendModal(t) {
                    const e = this._showModalWithParentIfParentExists(t);
                    if (e) return e;
                    return -1 === this.eligibleModalQueue.indexOf(t) && (this.eligibleModalQueue.push(t), this.displayNextNotificationIfEligible()), t
                }
                _showModalWithParentIfParentExists(t) {
                    const e = this.getModalByDOMNode(t.owner);
                    return !!e && (e.children || (e.children = []), -1 === e.children.indexOf(t) && (e.children.push(t), 1 === e.children.length && this.isModalVisible(e) && this.forceShowModal(t)), t)
                }
                shouldShowModal(t) {
                    const e = this.gameflowModalLock || this.lockAndLoadLock;
                    return t && t.show || !e
                }
                displayNextNotificationIfEligible() {
                    const t = this.eligibleModalQueue.length;
                    for (let e = 0; e < t; e++) {
                        const t = this.eligibleModalQueue[e];
                        if (this.shouldShowModal(t)) return this.showModal(t)
                    }
                    this.hideLayer()
                }
                handleNotification(t) {
                    return this.initializeDomNodes(t), t && t.show ? this.forceShowModal(t) : t && t.prepend ? this.prependModal(t) : this.appendModal(t)
                }
                isType(t) {
                    return "string" == typeof t ? this.type === t : this.type === t.type
                }
            };
            e.default = a
        }, (t, e) => {
            "use strict";
            Object.defineProperty(e, "__esModule", {
                value: !0
            }), e._createBody = o, e._createDivider = r, e._createHeading = i, e.contentBlockDialogSimple = s, e.default = void 0;
            const n = window.testsSandboxDoc || window.document;

            function i(t = "", e = "h6") {
                const i = n.createElement(e),
                    o = n.createTextNode(t);
                return i.appendChild(o), i
            }

            function o(t = "") {
                const e = n.createElement("p");
                return "string" == typeof t ? e.innerHTML = t : t instanceof HTMLElement && e.appendChild(t), e
            }

            function r(t = "") {
                const e = n.createElement("hr");
                return e.className = t, e
            }

            function s(t, e = "dialog-small", i = "") {
                if (!t) return;
                const r = n.createElement("lol-uikit-content-block");
                return r.className = i, r.setAttribute("type", e), r.appendChild(o(t)), r
            }
            var a = {
                contentBlockNotification: function(t, e = "") {
                    return s(t, "notification", e)
                },
                contentBlockTooltipSystem: function(t, e = "") {
                    return s(t, "tooltip-system", e)
                },
                contentBlockTooltipAttention: function(t, e = "") {
                    return s(t, "attention", e)
                },
                contentBlockTooltip: function(t, e, r = "tooltip-small", s = "") {
                    const a = i(t, "h6"),
                        l = o(e),
                        d = n.createElement("lol-uikit-content-block");
                    return d.className = s, d.setAttribute("type", r), d.appendChild(a), d.appendChild(l), d
                },
                contentBlockDialog: function(t, e, s = "dialog-small", a = "") {
                    const l = i(t, "h4"),
                        d = r("heading-spacer"),
                        c = o(e),
                        u = n.createElement("lol-uikit-content-block");
                    return u.className = a, u.setAttribute("type", s), u.appendChild(l), u.appendChild(d), u.appendChild(c), u
                },
                contentBlockDialogSimple: s,
                dialogButtonGroupSingleButton: function(t, e = "button-ok") {
                    const i = n.createElement("lol-uikit-flat-button-group");
                    i.setAttribute("type", "dialog-frame");
                    const o = n.createElement("lol-uikit-flat-button");
                    return o.className = e, o.setAttribute("tabindex", "0"), o.innerText = t, i.appendChild(o), i
                }
            };
            e.default = a
        }, (t, e, n) => {
            "use strict";
            Object.defineProperty(e, "__esModule", {
                value: !0
            }), e.default = void 0;
            var i = d(n(19)),
                o = n(1),
                r = d(n(2)),
                s = d(n(226)),
                a = n(16),
                l = d(n(20));

            function d(t) {
                return t && t.__esModule ? t : {
                    default: t
                }
            }
            const c = r.default.get();

            function u(t) {
                return t instanceof HTMLElement
            }
            class p {
                static registerAs = "DialogCelebration";
                static playNotificationSound(t) {
                    return (0, o.getProvider)().get("rcp-fe-audio").getChannel("sfx-notifications").playSound(t)
                }
                static playUISound(t) {
                    return (0, o.getProvider)().get("rcp-fe-audio").getChannel("sfx-ui").playSound(t)
                }
                static template() {
                    return c.getElementById("lol-uikit-template-dialog-celebration")
                }
                static create(t) {
                    t.rewardContent && !t.staticContent && (t.staticContent = t.rewardContent);
                    const e = c.createElement("div"),
                        n = p.template(),
                        i = c.importNode(n.content, !0);
                    e.appendChild(i);
                    const o = {
                            domNode: e
                        },
                        r = p._appendRewardContentAndRetrieveDelay(e, t);
                    return p._appendTitleContent(e, t.titleContent), p._appendContent(e, t.content), p._appendButtonContent(e, o, t.okText, t.onClose), t.contentContainsPlayerInput && p._addPlayerInputContentClass(e), e.addEventListener("modalShow", p._preloadAndTriggerAnimation.bind(null, {
                        domNode: e,
                        contentDelay: r,
                        shouldPlayStaticAudio: r > 0
                    })), o
                }
                static _hideRewardContent(t) {
                    (0, i.default)(t).find(".dialog-celebration-container").addClass("dialog-celebration-content-hidden")
                }
                static _appendRewardContentAndRetrieveDelay(t, e) {
                    let n = e.contentDelay || 0;
                    return e.videoContent ? ((0, i.default)(t).find(".dialog-celebration-container").addClass("dialog-celebration-type-video"), p._appendRewardContentVideo(t, e.videoContent), n > 0 && p._hideRewardContent(t)) : (n = 0, p._appendRewardContentStatic(t, e.staticContent)), n
                }
                static _revealRewardContent(t) {
                    (0, i.default)(t).find(".dialog-celebration-container").removeClass("dialog-celebration-content-hidden")
                }
                static _appendRewardContentStatic(t, e) {
                    e && (0, i.default)(t).find(".dialog-celebration-reward").addClass("dialog-celebration-reward-static").append(e)
                }
                static _appendRewardContentVideo(t, e) {
                    if (e) {
                        const n = (0, i.default)('<video src="/fe/lol-uikit/videos/celebration-bg-magic.webm"></video>').addClass("dialog-celebration-reward-bg-magic").attr("loop", !0).attr("autoplay", !0);
                        (0, i.default)(t).find(".dialog-celebration-reward").addClass("dialog-celebration-reward-video").before('<div class="dialog-celebration-reward-placeholder"></div>').before(n).append(e)
                    }
                }
                static _appendTitleContent(t, e) {
                    const n = (0, i.default)(t).find(".dialog-celebration-title");
                    "string" == typeof e ? (n.html(e), n.addClass("dialog-celebration-title-default")) : u(e) && n.append(e)
                }
                static _appendContent(t, e) {
                    const n = (0, i.default)(t).find(".dialog-celebration-body");
                    "string" == typeof e ? (n.html(e), n.addClass("dialog-celebration-body-default")) : u(e) && n.append(e)
                }
                static _addPlayerInputContentClass(t) {
                    (0, i.default)(t).find(".dialog-celebration-body-container").addClass("dialog-celebration-player-input-body")
                }
                static _appendButtonContent(t, e, n, o) {
                    const r = (0, i.default)(t).find(".dialog-celebration-ok-button");
                    r.text(n), e.okPromise = new Promise((t => {
                        r.on("click", (0, a.leftClickHandler)((() => {
                            p.playUISound(l.default.dialogCelebrationClick), t(), p._close(e)
                        }))), r.on("mouseenter", (() => {
                            p.playUISound(l.default.dialogCelebrationHover, {
                                allowConcurrency: !1
                            })
                        }))
                    })), e.okPromise.then((() => {
                        o && "function" == typeof o && o()
                    }))
                }
                static _preloadAndTriggerAnimation(t = {}) {
                    const {
                        domNode: e
                    } = t, {
                        contentDelay: n
                    } = t, {
                        shouldPlayStaticAudio: o
                    } = t, r = e.querySelectorAll("img, video"), s = [];
                    for (let t = 0; t < r.length; t++) !r[t].complete && !r[t].readyState >= 2 && s.push(new Promise((function(e) {
                        r[t].onload = e, r[t].onloadeddata = e, r[t].onerror = e, setTimeout(e, 5e3)
                    })));
                    Promise.all(s).then((function() {
                        (0, i.default)(e).find(".dialog-celebration-container").addClass("animate-dialog-celebration"), p.playNotificationSound(l.default.dialogCelebrationIntro), setTimeout((() => {
                            o && p.playNotificationSound(l.default.dialogCelebrationReceive), e.dispatchEvent(new Event("rewardContentShowing")), setTimeout((() => {
                                p._revealRewardContent(e)
                            }), n)
                        }), 420)
                    }))
                }
                static _close(t) {
                    const e = (0, i.default)(t.domNode).find(".dialog-celebration-ok-button");
                    e.off("click"), e.off("mouseenter"), t.domNode.removeEventListener("modalShow", p._preloadAndTriggerAnimation), s.default.remove(t)
                }
            }
            p.tagName = "lol-uikit-dialog-celebration";
            var h = p;
            e.default = h
        }, (t, e, n) => {
            "use strict";
            Object.defineProperty(e, "__esModule", {
                value: !0
            }), e.default = void 0;
            var i = a(n(2)),
                o = a(n(226)),
                r = n(227),
                s = n(16);

            function a(t) {
                return t && t.__esModule ? t : {
                    default: t
                }
            }
            const l = i.default.get();
            class d {
                static registerAs = "DialogConfirm";
                static template() {
                    return l.getElementById("lol-uikit-template-dialog-confirm")
                }
                static create(t) {
                    const e = l.createElement("div");
                    e.classList.add("dialog-confirm"), t && t.noDefaultPadding && e.setAttribute("no-default-padding", "");
                    const n = d.template(),
                        i = l.importNode(n.content, !0);
                    e.appendChild(i), d._appendContents(e, t);
                    const [o, r, a] = d._retrieveButtons(e, t), c = e.querySelector("lol-uikit-dialog-frame.dialog-frame"), u = {
                        domNode: e
                    }, p = function(t) {
                        let e = 0;
                        const n = function(n) {
                            e++, 9 === n.which && (e >= t.length && (e = 0), t[e].focus(), n.preventDefault())
                        };
                        return t.forEach((t => t.addEventListener("keydown", n))), () => {
                            t.forEach((t => t.removeEventListener("keydown", n)))
                        }
                    }([o, r]);
                    return e.addEventListener("modalShow", (() => {
                        a.focus()
                    })), t && t.closeButton && (c.setAttribute("close-button", ""), t.shouldKeepCancelButton || r.remove(), t.dismissibleType && c.setAttribute("dismissable-type", t.dismissibleType)), u.focusDefault = function() {
                        a.focus()
                    }, u.enableAcceptButton = function() {
                        o.disabled = void 0
                    }, u.disableAcceptButton = function() {
                        o.disabled = !0
                    }, u._resolvePromiseHalted = function() {
                        return !!o.disabled
                    }, u.acceptPromise = new Promise(((e, n) => {
                        function i(t) {
                            n(t), p(), d._close(u)
                        }
                        let a = null;

                        function l() {
                            if (a && "function" == typeof a) {
                                const t = a();
                                return "boolean" == typeof t ? Promise.resolve(t) : "object" == typeof t && "function" == typeof t.then ? t : Promise.resolve(!0)
                            }
                            return Promise.resolve(!0)
                        }

                        function h() {
                            e(), p(), d._close(u)
                        }
                        t && t.acceptHandler && (a = t.acceptHandler), o.addEventListener("keydown", (t => {
                            13 !== t.which || u._resolvePromiseHalted() || l().then((t => {
                                t && h()
                            }))
                        })), o.addEventListener("click", (0, s.leftClickHandler)((() => {
                            u._resolvePromiseHalted() || l().then((t => {
                                t && h()
                            }))
                        }))), c.addEventListener("closeButtonClick", (() => {
                            i("closeButtonClicked"), d._close(u)
                        })), r.addEventListener("keydown", (t => {
                            13 === t.which && i()
                        })), r.addEventListener("click", (0, s.leftClickHandler)((() => {
                            i()
                        }))), t && t.closeButton && c.addEventListener("dialogFrameDismissed", (() => {
                            i()
                        }))
                    })), u.acceptPromise.then((() => {
                        t && t.onAccept && "function" == typeof t.onAccept && t.onAccept()
                    }), (() => {
                        t && t.onDecline && "function" == typeof t.onDecline && t.onDecline()
                    })).finally((() => {
                        t && t.onClose && "function" == typeof t.onClose && t.onClose()
                    })), u
                }
                static _appendContents(t, e) {
                    let n = e.contents ? e.contents : "";
                    n.jquery && (n = n[0]);
                    const i = t.querySelector(".dialog-content");
                    "string" == typeof n && (n = (0, r.contentBlockDialogSimple)(n)), n && i.appendChild(n)
                }
                static _retrieveButtons(t, e) {
                    const n = e.acceptText ? e.acceptText : "",
                        i = e.declineText ? e.declineText : "",
                        o = t.querySelector("lol-uikit-flat-button.button-accept"),
                        r = t.querySelector("lol-uikit-flat-button.button-decline");
                    e.defaultTabIndex || (e.defaultTabIndex = 1);
                    const s = t.querySelector(`lol-uikit-flat-button[tabindex="${e.defaultTabIndex}"]`);
                    return e.acceptButtonType && o.setAttribute("type", e.acceptButtonType), o.innerText = n, r.innerText = i, e && e.primaryButton && "decline" === e.primaryButton.toLowerCase() ? r.setAttribute("primary", !0) : e && null === e.primaryButton || (e && (e.primaryButton && "accept" === e.primaryButton.toLowerCase() || e.closeButton && !e.shouldKeepCancelButton) || !e.declineText) && o.setAttribute("primary", !0), [o, r, s]
                }
                static _close(t) {
                    o.default.remove(t)
                }
            }
            var c = d;
            e.default = c
        }, (t, e, n) => {
            "use strict";
            Object.defineProperty(e, "__esModule", {
                value: !0
            }), e.default = void 0;
            var i = s(n(2)),
                o = s(n(226)),
                r = n(227);

            function s(t) {
                return t && t.__esModule ? t : {
                    default: t
                }
            }
            const a = i.default.get();
            class l {
                static registerAs = "DialogDismiss";
                static template() {
                    return a.getElementById("lol-uikit-template-dialog-dismiss")
                }
                static create(t) {
                    const e = a.createElement("div");
                    e.classList.add("dialog-dismiss"), t && t.noDefaultPadding && e.setAttribute("no-default-padding", "");
                    const n = l.template(),
                        i = a.importNode(n.content, !0);
                    e.appendChild(i), l._appendContents(e, t);
                    const o = e.querySelector("lol-uikit-dialog-frame.dialog-frame"),
                        r = {
                            domNode: e
                        };
                    return t && t.dismissibleType && o.setAttribute("dismissable-type", t.dismissibleType), o.addEventListener("dialogFrameDismissed", (() => {
                        t && "function" == typeof t.onClose && t.onClose(), l._close(r)
                    })), r
                }
                static _appendContents(t, e) {
                    let n = e && e.contents ? e.contents : "";
                    const i = t.querySelector(".dialog-content");
                    "string" == typeof n && (n = (0, r.contentBlockDialogSimple)(n)), n && i.appendChild(n)
                }
                static _close(t) {
                    o.default.remove(t)
                }
            }
            var d = l;
            e.default = d
        }, (t, e, n) => {
            "use strict";
            Object.defineProperty(e, "__esModule", {
                value: !0
            }), e.default = void 0;
            var i = r(n(2)),
                o = r(n(232));

            function r(t) {
                return t && t.__esModule ? t : {
                    default: t
                }
            }
            class s {
                static registerAs = "DialogToastCelebration";
                static template() {
                    return i.default.get().getElementById("lol-uikit-template-dialog-toast-celebration")
                }
                static create(t) {
                    const e = document.createElement("div");
                    return e.classList.add("dialog-toast-celebration"), e.innerHTML = s.template().innerHTML, s._appendTitleContent(e, t.title), s._appendDetailsContent(e, t.details), s._appendImageAndIconContent(e, t.backgroundImageUrl, t.iconUrl, t.iconElement, t.scaleIcon), s._applyAnimationClass(e, t.animationsEnabled, t.isMuted), {
                        domNode: e
                    }
                }
                static _appendTitleContent(t, e) {
                    t.querySelector(".toast-celebration-title").innerHTML += e
                }
                static _appendDetailsContent(t, e) {
                    t.querySelector(".toast-celebration-details").innerHTML += e
                }
                static _appendImageAndIconContent(t, e, n, i, o) {
                    if (e) {
                        const n = "url(" + e + ")";
                        t.querySelector(".toast-celebration-reward-image").style.backgroundImage = n
                    }
                    if (n) {
                        const e = "url(" + n + ")";
                        t.querySelector(".toast-celebration-reward-icon").style.backgroundImage = e
                    }
                    i && t.querySelector(".toast-celebration-reward-icon").appendChild(i), o && t.querySelector(".toast-celebration-reward-icon").classList.add("scale")
                }
                static _applyAnimationClass(t, e, n) {
                    e && t.classList.add("animate"), n && t.classList.add("muted")
                }
                static _close(t) {
                    o.default.remove(t)
                }
            }
            var a = s;
            e.default = a
        }, (t, e, n) => {
            "use strict";
            Object.defineProperty(e, "__esModule", {
                value: !0
            }), e.default = void 0;
            var i = a(n(167)),
                o = n(1),
                r = a(n(20)),
                s = n(70);

            function a(t) {
                return t && t.__esModule ? t : {
                    default: t
                }
            }
            const l = {
                SLOW: 7e3,
                NORMAL: 4e3,
                FAST: 2e3,
                INFINITE: -1
            };
            class d {
                constructor() {
                    this.currentIndex = -1, this.toastStack = [], this.BASE_LAYER_CLASS = "lol-uikit-toast-celebration-layer", this.layer = this._createLayer(this.BASE_LAYER_CLASS), this.type = "Toast", this.fadeOutDuration = 400, this._boundOnClickEvent = this._handleClickEvent.bind(this), this._boundOnDialogDismissEvent = this._handleDialogDismissEvent.bind(this)
                }
                static playSound(t) {
                    return (0, o.getProvider)().get("rcp-fe-audio").getChannel("sfx-notifications").playSound(t)
                }
                isExistingToastCelebration(t) {
                    if (t.id) {
                        if (this.toastStack.find((e => e.id === t.id))) return !0
                    }
                    return !1
                }
                handleToastCelebration(t) {
                    if (!t.type) return;
                    if (this.isExistingToastCelebration(t)) return;
                    const e = t.type,
                        n = t.data ? t.data : {},
                        i = t.ComponentFactory.create(e, n);
                    i && (Object.assign(t, i), t.data.animationsEnabled ? this.fadeOutDuration = 400 : this.fadeOutDuration = 0, this._addToastCelebration(t))
                }
                remove(t, e) {
                    const n = "managed";
                    if (this._removeToastCelebration(t, n), e) {
                        e({
                            type: n
                        })
                    }
                }
                dismissAll() {
                    this._endCelebrationCeremony()
                }
                _createLayer(t) {
                    const e = document.createElement("div");
                    return e.classList.add(t), e.style["z-index"] = s.Z_INDEX_CONSTANTS.CELEBRATIONS_TOAST, e
                }
                _showLayer() {
                    this.layer.classList.remove("hidden"), i.default.addLayer(this.layer)
                }
                _hideLayer() {
                    this.layer.classList.add("hidden"), this.layer.innerHTML = "", i.default.removeLayer(this.layer)
                }
                _getPipsContainerElement() {
                    let t = this.layer.querySelector(".toast-celebration-pips");
                    return t || (t = document.createElement("ul"), t.classList.add("toast-celebration-pips", "hidden"), this.layer.querySelector(".toast-celebration-background").appendChild(t)), t
                }
                _addToastCelebration(t) {
                    this.toastStack.push(t), this._updateToastStack()
                }
                _updateToastStack() {
                    this.toastStack.length > 1 ? (this._showPips(), this._addPip()) : 1 === this.toastStack.length && (this.toastStack[0].position && this._setLayerPosition(this.toastStack[0].position), this._displayNextToastCelebration())
                }
                _endCelebrationCeremony() {
                    this.currentIndex = -1, this.toastStack = [], this._hideLayer()
                }
                _showPips() {
                    this._getPipsContainerElement().classList.remove("hidden")
                }
                _addPip() {
                    const t = document.createElement("li");
                    this._getPipsContainerElement().appendChild(t)
                }
                _removePipAtIndexAtIndex(t) {
                    const e = this._getPipsContainerElement().querySelectorAll("li")[t];
                    e && e.remove()
                }
                _markPipAsViewed(t) {
                    const e = this._getPipsContainerElement().querySelectorAll("li")[t];
                    e && (e.classList.remove("selected"), e.classList.add("viewed"))
                }
                _markPipAsSelected(t) {
                    const e = this._getPipsContainerElement().querySelectorAll("li")[t];
                    e && e.classList.add("selected")
                }
                _handleClickEvent() {
                    const t = this.toastStack[this.currentIndex];
                    t && t.onClick && t.onClick(), this._removeCurrentToastCelebration("dismissed")
                }
                _handleDialogDismissEvent() {
                    this._endCelebrationCeremony()
                }
                _removeToastCelebration(t, e) {
                    const n = {
                        type: e
                    };
                    t.onRemove && t.onRemove(n);
                    const i = t.ComponentFactory.getDOMNode(t),
                        o = this.toastStack.indexOf(i);
                    if (this.layer.contains(i)) {
                        window.clearTimeout(this.currentToastTimeout), i.removeEventListener("click", this._boundOnClickEvent), i.removeEventListener("dialogFrameDismissed", this._boundOnDialogDismissEvent);
                        let t = i;
                        this.toastStack.length <= this.currentIndex + 1 && (t = this.layer), t.classList.add("fade-out"), t.style.setProperty("animation-duration", this.fadeOutDuration + "ms"), window.setTimeout((() => {
                            t.classList.remove("fade-out"), this.layer.contains(i) && this.layer.removeChild(i), this.toastStack.length > this.currentIndex + 1 ? this._displayNextToastCelebration() : this._endCelebrationCeremony()
                        }), this.fadeOutDuration)
                    } else o > this.currentIndex && (this.notificationStack.splice(o, 1), this._removePipAtIndex(o))
                }
                _removeCurrentToastCelebration(t) {
                    const e = this.toastStack[this.currentIndex];
                    e && this._removeToastCelebration(e, t)
                }
                _updatePips() {
                    for (let t = 0; t < this.toastStack.length; t++) this._addPip(), t < this.currentIndex && this._markPipAsViewed(t);
                    this._markPipAsSelected(this.currentIndex), this.toastStack.length > 1 && this._showPips()
                }
                _displayNextToastCelebration() {
                    this._showLayer(), this.currentIndex += 1;
                    const t = this.toastStack[this.currentIndex];
                    if (!t) return;
                    const e = t.ComponentFactory.getDOMNode(t);
                    this.layer.appendChild(e), this._updatePips();
                    const n = e.querySelector(".toast-celebration-body").offsetHeight;
                    e.querySelector(".toast-celebration-background").style.height = n + "px", t.data && (t.data.isMuted || d.playSound(r.default.rewardToast), e.addEventListener("click", this._boundOnClickEvent), e.addEventListener("dialogFrameDismissed", this._boundOnDialogDismissEvent), this._getTime(t) !== l.INFINITE && (this.currentToastTimeout = window.setTimeout((() => {
                        this._removeToastCelebration(t, "timeout")
                    }), this._getTime(t))))
                }
                _getTime(t) {
                    const e = "string" == typeof t.timing ? t.timing.toUpperCase() : "";
                    return l[e] || l.NORMAL
                }
                _setLayerPosition(t) {
                    t.x && t.y && (this.layer.style.left = t.x + "px", this.layer.style.top = t.y + "px")
                }
            }
            var c = new d;
            e.default = c
        }, (t, e, n) => {
            "use strict";
            Object.defineProperty(e, "__esModule", {
                value: !0
            }), e.default = void 0;
            var i = s(n(2)),
                o = s(n(19)),
                r = s(n(234));

            function s(t) {
                return t && t.__esModule ? t : {
                    default: t
                }
            }
            class a {
                static registerAs = "DialogToast";
                static template() {
                    return i.default.get().getElementById("lol-uikit-template-dialog-toast")
                }
                static create(t) {
                    const e = (0, o.default)("<div></div>");
                    e.addClass("dialog-toast"), e.append(a.template().innerHTML);
                    const n = t.contents ? t.contents : "";
                    return e.find(".toast-content").append(n), t.dismissable && !t.hideCloseButton || e.find("lol-uikit-dialog-frame").removeAttr("dismissable"), {
                        domNode: e[0]
                    }
                }
                static _close(t) {
                    r.default.remove(t)
                }
            }
            var l = a;
            e.default = l
        }, (t, e, n) => {
            "use strict";
            Object.defineProperty(e, "__esModule", {
                value: !0
            }), e.default = void 0;
            var i, o = n(1),
                r = (i = n(167)) && i.__esModule ? i : {
                    default: i
                };
            var s = new class {
                constructor() {
                    this.TOAST_SPEED = {
                        A_VERY_LONG_TIME: 3e5,
                        SLOW: 7e3,
                        NORMAL: 4e3,
                        FAST: 2e3
                    }, this.TOAST_POSITION = {
                        LEFT: "left",
                        RIGHT: "right"
                    }, this.MAX_TOASTS = 2, this.BASE_CLASS = "lol-uikit-toast-layer", this.notificationStack = [], this.layer = this._createLayer(), this.type = "Toast"
                }
                handleNotification(t) {
                    if (!t.type) return;
                    const e = t.type,
                        n = t.data ? t.data : {},
                        i = t.ComponentFactory.create(e, n);
                    o.Lodash.isObject(i) && o.Lodash.assign(t, i), this.notificationStack.push(t), this.notificationStack.length <= this.MAX_TOASTS && this._displayToastNotification(t)
                }
                remove(t, e) {
                    this._removeToastNotification(t, "managed", e)
                }
                _createLayer() {
                    const t = document.createElement("div");
                    return t.classList.add(this.BASE_CLASS), t
                }
                _removeToastNotification(t, e, n) {
                    const i = {
                        type: e
                    };
                    n && n(i);
                    const r = t.ComponentFactory.getDOMNode(t);
                    let s = Array.prototype.indexOf.call(this.layer.childNodes, r);
                    s >= 0 && (0, o.jQuery)(this.layer.childNodes[s]).fadeOut(function() {
                        s = Array.prototype.indexOf.call(this.layer.childNodes, r), this.notificationStack[s] && this.notificationStack[s].onRemove && this.notificationStack[s].onRemove(i), -1 !== s && (this.notificationStack.splice(s, 1), this.layer.removeChild(this.layer.childNodes[s])), this.notificationStack.length >= this.MAX_TOASTS && this._displayToastNotification(this.notificationStack[this.MAX_TOASTS - 1]), 0 === this.notificationStack.length && this._hideLayer()
                    }.bind(this))
                }
                _displayToastNotification(t) {
                    1 === this.notificationStack.length && this._showLayer();
                    const e = t.ComponentFactory.getDOMNode(t);
                    (0, o.jQuery)(this.layer).addClass(this._setPosition(t)), (0, o.jQuery)(this.layer).append(e), (0, o.jQuery)(e).fadeIn(), t.data && t.data.dismissable ? (e.addEventListener("dialogFrameDismissed", (() => {
                        this._removeToastNotification(t, "dismissed")
                    })), window.setTimeout((() => {
                        this._removeToastNotification(t, "timeout")
                    }), this._getTime(t))) : window.setTimeout((() => {
                        this._removeToastNotification(t, "timeout")
                    }), this._getTime(t))
                }
                _showLayer() {
                    r.default.addLayer(this.layer)
                }
                _hideLayer() {
                    r.default.removeLayer(this.layer)
                }
                _getTime(t) {
                    const e = o.Lodash.isString(t.timing) ? t.timing.toUpperCase() : "";
                    return this.TOAST_SPEED[e] || this.TOAST_SPEED.NORMAL
                }
                _setPosition(t) {
                    const e = o.Lodash.isString(t.position) ? t.position.toUpperCase() : "";
                    return this.layer.classList.remove(this.TOAST_POSITION.LEFT, this.TOAST_POSITION.RIGHT), this.TOAST_POSITION[e] || this.TOAST_POSITION.LEFT
                }
            };
            e.default = s
        }, (t, e, n) => {
            "use strict";
            var i;
            Object.defineProperty(e, "__esModule", {
                value: !0
            }), e.default = void 0;
            const o = ((i = n(2)) && i.__esModule ? i : {
                default: i
            }).default.get();
            class r {
                static registerAs = "FirstTouch";
                static _rootElement;
                static template() {
                    return o.getElementById("lol-uikit-template-first-touch-modal")
                }
                static create(t) {
                    r._rootElement = o.createElement("div");
                    const e = r._rootElement;
                    e.classList.add("first-touch-modal");
                    const n = r.template(),
                        i = o.importNode(n.content, !0);
                    e.appendChild(i);
                    const s = e.querySelector("div.first-touch-title");
                    r._appendTitleContent(s, t.titleImage, t.titleText, t.subtitleText);
                    const a = e.querySelector("div.first-touch-features");
                    r._populateFeatures(a, t.features);
                    const l = e.querySelector("lol-uikit-flat-button.button-accept");
                    return r._applyButtonLabel(l, t.buttonLabel), r._addListeners(e, l), {
                        domNode: e
                    }
                }
                static _appendTitleContent(t, e, n, i) {
                    t.querySelector(".title-image").setAttribute("src", e);
                    t.querySelector(".title-text").appendChild(o.createTextNode(n));
                    t.querySelector(".modal-subtitle").appendChild(o.createTextNode(i))
                }
                static _populateFeatures(t, e) {
                    const n = t.children;
                    for (let t = 0; t < n.length; t++) this._populateFeature(n[t], e[t])
                }
                static _populateFeature(t, e) {
                    t.querySelector(".feature-image").setAttribute("src", e.image);
                    t.querySelector(".feature-title").appendChild(o.createTextNode(e.title));
                    t.querySelector(".feature-description").appendChild(o.createTextNode(e.description))
                }
                static _applyButtonLabel(t, e) {
                    t.appendChild(o.createTextNode(e))
                }
                static _addListeners(t, e) {
                    t.addEventListener("dialogFrameDismissed", r._onDismiss), e.addEventListener("click", r._onAccept)
                }
                static _cleanListeners() {
                    const t = r._rootElement,
                        e = t.querySelector("lol-uikit-flat-button.button-accept");
                    t.removeEventListener("dialogFrameDismissed", r._onDismiss), e.removeEventListener("click", r._onAccept)
                }
                static _onAccept(t) {
                    const e = r._rootElement;
                    t.stopImmediatePropagation(), t.preventDefault(), r._cleanListeners(e);
                    const n = new Event("firstTouchAccept", {
                        bubbles: !0,
                        cancelable: !0
                    });
                    e.dispatchEvent(n)
                }
                static _onDismiss(t) {
                    const e = r._rootElement;
                    t.stopImmediatePropagation(), t.preventDefault(), r._cleanListeners(e);
                    const n = new Event("firstTouchDismissed", {
                        bubbles: !0,
                        cancelable: !0
                    });
                    e.dispatchEvent(n)
                }
            }
            var s = r;
            e.default = s
        }, (t, e, n) => {
            "use strict";
            Object.defineProperty(e, "__esModule", {
                value: !0
            }), e.default = void 0;
            var i, o = (i = n(2)) && i.__esModule ? i : {
                default: i
            };
            class r {
                static registerAs = "VignetteCelebration";
                static template() {
                    return o.default.get().getElementById("lol-uikit-template-vignette-celebration")
                }
                static create() {
                    const t = document.createElement("div");
                    return t.classList.add("vignette-celebration"), t.innerHTML = r.template().innerHTML, {
                        domNode: t
                    }
                }
            }
            var s = r;
            e.default = s
        }, (t, e, n) => {
            "use strict";
            Object.defineProperty(e, "__esModule", {
                value: !0
            }), e.default = void 0;
            var i = n(1),
                o = y(n(165)),
                r = y(n(238)),
                s = y(n(239)),
                a = y(n(240)),
                l = y(n(242)),
                d = y(n(243)),
                c = y(n(245)),
                u = y(n(246)),
                p = y(n(248)),
                h = y(n(250)),
                m = y(n(167)),
                g = y(n(253)),
                f = y(n(227)),
                b = y(n(30)),
                A = y(n(35)),
                v = y(n(255));

            function y(t) {
                return t && t.__esModule ? t : {
                    default: t
                }
            }
            var w = new class {
                constructor() {
                    this._summonerIconManager = null
                }
                getContextMenuManager() {
                    return l.default
                }
                getContextualNotificationManager() {
                    return d.default
                }
                getModalManager() {
                    return c.default
                }
                getToastManager() {
                    return r.default
                }
                getToastCelebrationManager() {
                    return s.default
                }
                getVignetteCelebrationManager() {
                    return a.default
                }
                getPopoutManager() {
                    return u.default
                }
                getFlyoutManager() {
                    return p.default
                }
                getTooltipManager() {
                    return o.default
                }
                getWindowManager() {
                    return h.default
                }
                getLayerManager() {
                    return m.default
                }
                getLayerWindowManager() {
                    return g.default
                }
                getComponentFactory() {
                    return i.componentFactory.exportable()
                }
                getTemplateHelper() {
                    return f.default
                }
                getVideoCache() {
                    return A.default
                }
                getSwitch() {
                    return b.default
                }
                getSummonerIconManager() {
                    return this._summonerIconManager || (this._summonerIconManager = (0, v.default)()), this._summonerIconManager
                }
            };
            e.default = w
        }, (t, e, n) => {
            "use strict";
            Object.defineProperty(e, "__esModule", {
                value: !0
            }), e.default = void 0;
            var i, o = n(1),
                r = (i = n(234)) && i.__esModule ? i : {
                    default: i
                };
            var s = new class {
                constructor() {
                    this.type = "DialogToast", this.dismissableDefault = !0
                }
                add(t) {
                    t.ComponentFactory = t.ComponentFactory || o.componentFactory, t.type = t.type || this.type, t.data = t.data || {}, void 0 === t.data.dismissable && (t.data.dismissable = this.dismissableDefault), r.default.handleNotification(t)
                }
                remove(t, e) {
                    t.ComponentFactory = t.ComponentFactory || o.componentFactory, t.type = t.type || this.type, r.default.remove(t, "managed", e)
                }
            };
            e.default = s
        }, (t, e, n) => {
            "use strict";
            Object.defineProperty(e, "__esModule", {
                value: !0
            }), e.default = void 0;
            var i, o = n(1),
                r = (i = n(232)) && i.__esModule ? i : {
                    default: i
                };
            const s = {
                type: "DialogToastCelebration",
                ComponentFactory: o.componentFactory,
                id: "",
                data: {
                    title: "",
                    details: "",
                    iconUrl: "",
                    backgroundImageUrl: "",
                    animationsEnabled: !0,
                    audioEnabled: !0,
                    isMuted: !1,
                    scaleIcon: !0
                },
                position: {
                    x: 350,
                    y: 520
                }
            };
            var a = new class {
                constructor() {
                    this.type = "DialogToastCelebration"
                }
                add(t) {
                    o.Lodash.defaultsDeep(t, s), r.default.handleToastCelebration(t)
                }
                remove(t, e) {
                    o.Lodash.defaultsDeep(t, s), r.default.remove(t, e)
                }
                dismissAll() {
                    r.default.dismissAll()
                }
            };
            e.default = a
        }, (t, e, n) => {
            "use strict";
            Object.defineProperty(e, "__esModule", {
                value: !0
            }), e.default = void 0;
            var i, o = n(1),
                r = (i = n(241)) && i.__esModule ? i : {
                    default: i
                };
            const s = {
                type: "VignetteCelebration",
                ComponentFactory: o.componentFactory,
                id: null,
                data: {
                    header: {
                        title: "",
                        titleSubtext: ""
                    },
                    backgroundImageUrl: "",
                    nextButtonText: "",
                    nextButtonEnabled: !0
                },
                height: "SMALL",
                timing: "INFINITE",
                animationsEnabled: !0,
                onShow: null,
                onRemove: null,
                onVignetteClose: null,
                onVignetteWillClose: null,
                onClick: null,
                content: null,
                behindVignette: !1
            };
            var a = new class {
                constructor() {
                    this.type = "VignetteCelebration"
                }
                add(t) {
                    return o.Lodash.defaultsDeep(t, s), t.id || (t.id = Symbol()), r.default.handleCelebration(t), t
                }
                remove(t, e) {
                    r.default.remove(t, e)
                }
                update(t) {
                    t.id && r.default.update(t)
                }
            };
            e.default = a
        }, (t, e, n) => {
            "use strict";
            Object.defineProperty(e, "__esModule", {
                value: !0
            }), e.default = void 0;
            var i = n(1),
                o = l(n(167)),
                r = n(16),
                s = n(70),
                a = l(n(20));

            function l(t) {
                return t && t.__esModule ? t : {
                    default: t
                }
            }
            const d = {
                    SLOW: 3e4,
                    NORMAL: 2e4,
                    FAST: 1e4,
                    INFINITE: -1
                },
                c = {
                    SMALL: "small",
                    MEDIUM: "medium",
                    LARGE: "large",
                    FULL: "full"
                };
            var u = new class {
                constructor() {
                    this.currentIndex = -1, this.celebrationQueue = [], this.currentCelebration = null, this.layer = this._createLayer("lol-uikit-vignette-celebration-layer"), this.animationsEnabled = !1, this._boundOnClickEvent = (0, r.leftClickHandler)(this._handleClickEvent.bind(this)), this.isEndingCeremony = !1
                }
                handleCelebration(t) {
                    t && !this._findCelebration(t) && (this._addCelebration(t), 1 !== this.celebrationQueue.length || this.isEndingCeremony || this._startCelebrationCeremony())
                }
                remove(t, e) {
                    const n = "managed",
                        i = this._findCelebration(t);
                    if (i && (this._removeCelebration(i, n), e)) {
                        e({
                            type: n
                        })
                    }
                }
                update(t) {
                    if (!t) return;
                    const e = this._findCelebration(t);
                    if (!e) return;
                    const n = i.Lodash.defaultsDeep(t, e);
                    this._setCelebration(n), this.currentCelebration && this.currentCelebration.id === n.id && (this._setHeader(n), this._setBackground(n), this._setVignetteHeight(n), this._setButtonState(n), this.currentCelebration = i.Lodash.cloneDeep(n))
                }
                _findCelebration(t) {
                    if (t && t.id) {
                        const e = this.celebrationQueue.find((e => e.id === t.id));
                        if (e) return e
                    }
                    return null
                }
                _setCelebration(t) {
                    if (t && t.id) {
                        const e = this.celebrationQueue.findIndex((e => e.id === t.id));
                        e > -1 && (this.celebrationQueue[e] = t)
                    }
                }
                _createLayer(t) {
                    const e = document.createElement("div");
                    return e.classList.add(t), e.style["z-index"] = s.Z_INDEX_CONSTANTS.CELEBRATIONS_VIGNETTE, e.addEventListener("keyup", this._keypressEventHandler.bind(this)), e
                }
                _keypressEventHandler(t) {
                    32 === t.which ? this._handleClickEvent(t) : 27 === t.which && this._removeAllCelebrations()
                }
                _showLayer() {
                    o.default.addLayer(this.layer)
                }
                _hideLayer() {
                    this.layer.removeEventListener("keypress", this._keypressEventHandler), this.layer.innerHTML = "", o.default.removeLayer(this.layer)
                }
                _addCelebration(t) {
                    this.celebrationQueue.push(t)
                }
                _playUISound(t) {
                    return (0, i.getProvider)().get("rcp-fe-audio").getChannel("sfx-ui").playSound(t)
                }
                _waitForVideoStart(t) {
                    return new Promise((e => {
                        function n() {
                            t.removeEventListener("playing", n), e()
                        }
                        t || e(), t.addEventListener("playing", n), setTimeout((() => {
                            n()
                        }), 1e3)
                    }))
                }
                _startCelebrationCeremony() {
                    if (!this.celebrationQueue.length) return;
                    this._showLayer();
                    const t = i.componentFactory.create("VignetteCelebration");
                    if (!t) return;
                    this.layer.appendChild(t.domNode), this._setVignetteHeight(this.celebrationQueue[0]), this._setAnimationsEnabled(this.celebrationQueue[0]);
                    const e = this.layer.querySelector(".footer-button");
                    e && e.addEventListener("click", this._boundOnClickEvent);
                    const n = this.layer.querySelector(".vignette-celebration"),
                        o = this.layer.querySelector(".celebration-banners"),
                        r = this.layer.querySelector(".celebration-intro-video");
                    this._waitForVideoStart(r).then((() => {
                        this._fadeIn(n, .4), this._playUISound(a.default.vignetteIntro), this._fadeIn(o, .2).then((() => {
                            this._openBanners().then((() => {
                                this._displayNextCelebration()
                            }))
                        }))
                    }))
                }
                _endCelebrationCeremony() {
                    this.layer.querySelector(".footer-button").removeEventListener("click", this._boundOnClickEvent), this.isEndingCeremony = !0;
                    const t = [],
                        e = this.layer.querySelectorAll(".inner-contents");
                    for (let n = 0; n < e.length; n++) t.push(this._fadeOut(e[n]));
                    Promise.all(t).then((() => {
                        this._playUISound(a.default.vignetteOutro), this._closeBanners().then((() => {
                            const t = this.layer.querySelector(".vignette-celebration"),
                                e = this.animationsEnabled ? .4 : 0;
                            this._fadeOut(t, e).then((() => {
                                this.currentIndex < this.celebrationQueue.length - 1 && this._startCelebrationCeremony(), this._finalizeCelebrationCeremony()
                            }))
                        }))
                    }))
                }
                _finalizeCelebrationCeremony() {
                    i.Lodash.forEach(this.celebrationQueue, (t => {
                        t.onVignetteClose && t.onVignetteClose()
                    })), this.celebrationQueue = [], this.currentIndex = -1, this.currentCelebration = null, this.isEndingCeremony = !1, this._hideLayer()
                }
                _openBanners() {
                    const t = this.layer.querySelector(".celebration-banners");
                    return new Promise((e => {
                        if (t || e(), this.animationsEnabled) {
                            function n() {
                                t.removeEventListener("transitionend", n), e()
                            }
                            t.addEventListener("transitionend", n), t.classList.remove("closed")
                        } else t.classList.remove("closed"), e()
                    }))
                }
                _closeBanners() {
                    const t = this.layer.querySelector(".celebration-banners");
                    return new Promise((e => {
                        if (t || e(), i.Lodash.forEach(this.celebrationQueue, (t => {
                                t.onVignetteWillClose && t.onVignetteWillClose()
                            })), this.animationsEnabled) {
                            function n() {
                                t.removeEventListener("transitionend", n), e()
                            }
                            t.addEventListener("transitionend", n), t.classList.add("closed")
                        } else t.classList.add("closed"), e()
                    }))
                }
                _handleClickEvent(t) {
                    this.currentCelebration && this.currentCelebration.data && this.currentCelebration.data.nextButtonEnabled && (this.currentCelebration.onClick ? this.currentCelebration.onClick(t) : this._removeCurrentCelebration("dismissed"))
                }
                _removeCelebration(t, e) {
                    const n = {
                        type: e
                    };
                    t.onRemove && t.onRemove(n);
                    const i = this.celebrationQueue.indexOf(t);
                    this.currentIndex === i ? (window.clearTimeout(this.currentCelebrationTimeout), this.celebrationQueue.length > this.currentIndex + 1 ? this._displayNextCelebration() : this._endCelebrationCeremony()) : i > this.currentIndex && this.celebrationQueue.splice(i, 1)
                }
                _removeAllCelebrations() {
                    for (let t = this.celebrationQueue.length - 1; t >= 0; t--) this._removeCelebration(this.celebrationQueue[t], "dismissed")
                }
                _removeCurrentCelebration(t) {
                    const e = this.celebrationQueue[this.currentIndex];
                    e && this._removeCelebration(e, t)
                }
                _displayNextCelebration() {
                    this.currentIndex += 1;
                    const t = this.celebrationQueue[this.currentIndex];
                    t && (this._setAnimationsEnabled(t), this._setHeader(t), this._setBackground(t), this._setContent(t), this._setVignetteHeight(t), this._setButtonState(t), t.onShow && t.onShow(), this._getTime(t) !== d.INFINITE && (this.currentCelebrationTimeout = window.setTimeout((() => {
                        this._removeCelebration(t, "timeout")
                    }), this._getTime(t))), this.currentCelebration = i.Lodash.cloneDeep(t))
                }
                _setContent(t) {
                    if (!t.content) return;
                    const e = t.behindVignette ? this.layer.querySelector(".celebration-background") : this.layer.querySelector(".celebration-content");
                    if (e && t.content.domNode) {
                        const n = function() {
                            e.innerHTML = "", e.appendChild(t.content.domNode)
                        };
                        if (!this.currentCelebration) return n(), void this._fadeIn(e);
                        this._fadeOutIn(e, n)
                    }
                }
                _setVignetteHeight(t) {
                    const e = this._getHeight(t);
                    if (this.currentCelebration && this._getHeight(this.currentCelebration) === e) return;
                    const n = this.layer.querySelector(".celebration-banners");
                    n.classList.add(e), Object.keys(c).map((t => {
                        c[t] !== e && n.classList.remove(c[t])
                    }))
                }
                _setBackground(t) {
                    const e = this.layer.querySelector(".celebration-background");
                    if (this.currentCelebration && this.currentCelebration.data.backgroundImageUrl === t.data.backgroundImageUrl) return;
                    const n = function() {
                        e.style.backgroundImage = "url(" + t.data.backgroundImageUrl + ")"
                    };
                    if (!this.currentCelebration) return n(), void this._fadeIn(e);
                    this._fadeOutIn(e, n)
                }
                _setAnimationsEnabled(t) {
                    this.animationsEnabled = t.animationsEnabled;
                    const e = this.layer.querySelector(".vignette-celebration");
                    e && (t.animationsEnabled ? e.classList.add("animate") : e.classList.remove("animate"))
                }
                _setHeader(t) {
                    const e = t.data.header.title,
                        n = t.data.header.titleSubtext,
                        i = this.layer.querySelector(".celebration-header"),
                        o = function() {
                            i.querySelector(".celebration-title-text").innerText = e, i.querySelector(".celebration-title-subtext").innerText = n
                        };
                    if (!this.currentCelebration) return o(), void this._fadeIn(i);
                    let r = !0;
                    r = this._getHeight(this.currentCelebration) !== this._getHeight(t) || (this.currentCelebration.data.header.title !== e || this.currentCelebration.data.header.titleSubtext !== n), r && this._fadeOutIn(i, o)
                }
                _setButtonState(t) {
                    const e = t.data.nextButtonText,
                        n = this.layer.querySelector(".footer-button-text"),
                        i = function() {
                            n.innerText = e
                        };
                    if (void 0 !== t.data.nextButtonEnabled) {
                        const e = this.layer.querySelector(".footer-button");
                        t.data.nextButtonEnabled ? e.removeAttribute("disabled") : e.setAttribute("disabled", "")
                    }
                    if (!this.currentCelebration) return i(), void this._fadeIn(this.layer.querySelector(".footer-button-wrapper"));
                    this.currentCelebration && this.currentCelebration.data.nextButtonText === t.data.nextButtonText || this._fadeOutIn(n, i)
                }
                _fadeOutIn(t, e, n = .4) {
                    this._fadeOut(t, n).then((() => (e && e(), this._fadeIn(t, n))))
                }
                _fadeIn(t, e) {
                    return new Promise((n => {
                        if (t || n(), this.animationsEnabled) {
                            function i() {
                                t.removeEventListener("animationend", i), n()
                            }
                            t.addEventListener("animationend", i), e && (t.style.animationDuration = e + "s")
                        } else setTimeout((() => n()), e);
                        t.classList.remove("fade-out"), t.classList.add("fade-in")
                    }))
                }
                _fadeOut(t, e) {
                    return new Promise((n => {
                        if (t || n(), this.animationsEnabled) {
                            function i() {
                                t.removeEventListener("animationend", i), n()
                            }
                            t.addEventListener("animationend", i), e && (t.style.animationDuration = e + "s")
                        } else setTimeout((() => n()), e);
                        t.classList.remove("fade-in"), t.classList.add("fade-out")
                    }))
                }
                _getTime(t) {
                    const e = "string" == typeof t.timing ? t.timing.toUpperCase() : "";
                    return d[e] || t.timing
                }
                _getHeight(t) {
                    let e = c.MEDIUM;
                    return t.height && (e = "string" == typeof t.height ? t.height.toUpperCase() : "", e = c[e]), e
                }
            };
            e.default = u
        }, (t, e, n) => {
            "use strict";
            Object.defineProperty(e, "__esModule", {
                value: !0
            }), e.default = void 0;
            var i, o = (i = n(65)) && i.__esModule ? i : {
                default: i
            };
            class r {
                static document = window.testsSandboxDoc ? window.testsSandboxDoc : window.document;
                createMenus() {
                    const {
                        document: t
                    } = r;
                    "complete" !== t.readyState ? t.addEventListener("DOMContentLoaded", this.createMenus.bind(this)) : this._createMenus()
                }
                _createMenus() {
                    const {
                        document: t
                    } = r;
                    this.menu || (this.menu = t.createElement("lol-uikit-context-menu"), this.subMenu = t.createElement("lol-uikit-context-menu"), this.subMenu.setOwner(this.menu))
                }
                setMenuItems(t) {
                    this.menu && this.menu.setMenuItems(t)
                }
                setCustomMenuItems(t, e) {
                    this.menu && this.menu.setCustomMenuItems(t, e)
                }
                filterVisible(t) {
                    return o.default.filterVisible(t)
                }
                openAtEvent(t) {
                    this.menu && this.menu.openAtEvent(t)
                }
                openAtRect(t) {
                    this.menu && this.menu.openAtRect(t)
                }
                isMenuOpen() {
                    return this.menu && this.menu.isOpen()
                }
                close() {
                    this.menu && this.menu.close()
                }
                addCloseListener(t) {
                    this.menu && this.menu.contextMenuElement.addEventListener("closeContextMenu", t)
                }
                removeCloseListener(t) {
                    this.menu && this.menu.contextMenuElement.removeEventListener("closeContextMenu", t)
                }
                isTargetContainedBy(t) {
                    return !(!this.menu || !this.menu.target) && t.contains(this.menu.target)
                }
                isTargetConnected() {
                    return !(!this.menu || !this.menu.target) && this.menu.target.isConnected
                }
            }
            const s = new r;
            s.createMenus();
            var a = {
                setMenuItems: s.setMenuItems.bind(s),
                setCustomMenuItems: s.setCustomMenuItems.bind(s),
                filterVisible: s.filterVisible.bind(s),
                openAtEvent: s.openAtEvent.bind(s),
                openAtRect: s.openAtRect.bind(s),
                isMenuOpen: s.isMenuOpen.bind(s),
                close: s.close.bind(s),
                addCloseListener: s.addCloseListener.bind(s),
                removeCloseListener: s.removeCloseListener.bind(s),
                isTargetContainedBy: s.isTargetContainedBy.bind(s),
                isTargetConnected: s.isTargetConnected.bind(s)
            };
            e.default = a
        }, (t, e, n) => {
            "use strict";
            Object.defineProperty(e, "__esModule", {
                value: !0
            }), e.default = void 0;
            var i, o = (i = n(244)) && i.__esModule ? i : {
                default: i
            };
            var r = new class {
                add(t, e) {
                    return o.default.add(t, e)
                }
                remove(t) {
                    o.default.remove(t)
                }
            };
            e.default = r
        }, (t, e, n) => {
            "use strict";
            Object.defineProperty(e, "__esModule", {
                value: !0
            }), e.default = void 0;
            var i = n(1),
                o = l(n(167)),
                r = l(n(227)),
                s = l(n(172)),
                a = l(n(168));

            function l(t) {
                return t && t.__esModule ? t : {
                    default: t
                }
            }
            const d = "DEFAULT";
            var c = new class {
                constructor() {
                    this.contextMap = new Map
                }
                add(t, e) {
                    const n = this._computeDefaultOptions(e),
                        i = this._createMetaNotification(t, n);
                    return n.dismissOtherNotifications && this._clearNotificationQueue(i.target), this._addNotificatonToQueue(i), this._processQueueState(i.target), {
                        id: i.id,
                        target: i.target,
                        onRemove: i.onRemove,
                        onCloseButtonClick: i.onCloseButtonClick
                    }
                }
                remove(t) {
                    const e = this._removeNotificationFromQueue(t);
                    e && this._processQueueState(e.target)
                }
                _getLayer(t) {
                    const e = document.createElement("div");
                    return t === d ? e.classList.add("lol-uikit-contextual-notification-targetless-layer") : e.classList.add("lol-uikit-contextual-notification-targeted-layer"), e
                }
                _computeDefaultOptions(t = {}) {
                    if (t.target) {
                        if (!(t.target.domNode instanceof Element)) throw new Error("ContextualNotificationController: target.domNode must be an HTMLElement in options");
                        if (t.position) throw new Error("ContextualNotificationController: Cannot specific position for targeted notification");
                        const e = {
                                orientation: "top",
                                anchor: {
                                    x: "center",
                                    y: "bottom"
                                },
                                offset: {
                                    x: 0,
                                    y: -20
                                },
                                dismissable: !0,
                                dismissOtherNotifications: !1,
                                dismissOnTargetHide: !1
                            },
                            n = {
                                anchor: {
                                    x: "center",
                                    y: "top"
                                }
                            };
                        return Object.assign(e, t), e.target && !e.target.anchor && (e.target.anchor = n.anchor), e
                    } {
                        const e = {
                            dismissable: !0
                        };
                        return Object.assign(e, t), e
                    }
                }
                _createMetaNotification(t, e) {
                    let n, i = t;
                    "string" == typeof i && (i = r.default.contentBlockNotification(i, "lol-uikit-contextual-notification-content"));
                    const o = new Promise((t => {
                        n = t
                    }));
                    let s;
                    const a = new Promise((t => {
                            s = t
                        })),
                        l = {
                            id: Symbol(),
                            target: e.target ? e.target.domNode : d,
                            displayed: !1,
                            content: i,
                            options: e,
                            onRemove: a,
                            resolveOnRemovePromise: s,
                            onCloseButtonClick: o,
                            resolveOnCloseButtonClickPromise: n
                        };
                    return e.target && delete l.options.target.domNode, l
                }
                _addNotificatonToQueue(t) {
                    let e = this.contextMap.get(t.target);
                    e || (e = {
                        layer: null,
                        queue: new Array
                    }), e.queue.push(t), this.contextMap.set(t.target, e)
                }
                _removeNotificationFromQueue(t) {
                    const e = this.contextMap.get(t.target);
                    if (!e) return;
                    const n = e.queue.find((function(e) {
                        return t.id === e.id
                    }));
                    return n ? (e.queue = e.queue.filter((function(t) {
                        return t.id !== n.id
                    })), n.displayed && (o.default.removeLayer(e.layer), e.layer = null), 0 === e.queue.length && (this.contextMap.delete(n.target), s.default.removeTarget(n.target)), n.resolveOnRemovePromise(), n) : void 0
                }
                _clearNotificationQueue(t) {
                    const e = this.contextMap.get(t);
                    e && e.queue && e.queue.length && (e.queue.forEach((t => {
                        e.layer && t.displayed && (o.default.removeLayer(e.layer), e.layer = null), t.resolveOnRemovePromise()
                    })), this.contextMap.delete(t))
                }
                _processQueueState(t) {
                    const e = this.contextMap.get(t);
                    if (!e) return;
                    const n = e.queue[0];
                    n.displayed || (e.layer = this._getLayer(t), n.target === d ? this._displayTargetlessNotification(n) : this._displayTargetedNotification(n))
                }
                _displayTargetlessNotification(t) {
                    const e = this.contextMap.get(t.target),
                        n = i.componentFactory.create("DialogToast", {
                            contents: t.content,
                            dismissable: t.options.dismissable
                        }),
                        r = i.componentFactory.getDOMNode(n);
                    if (r.addEventListener("dialogFrameDismissed", (() => {
                            t.resolveOnCloseButtonClickPromise(), this._removeNotificationFromQueue(t), this._processQueueState(t.target)
                        })), e.layer.appendChild(r), o.default.insertLayer(e.layer, 0), t.displayed = !0, t.options.position) {
                        const {
                            position: n
                        } = t.options;
                        e.layer.style.position = "absolute", e.layer.style.top = n.top ? n.top + "px" : "auto", e.layer.style.left = n.left ? n.left + "px" : "auto", e.layer.style.bottom = n.bottom ? n.bottom + "px" : "auto", e.layer.style.right = n.right ? n.right + "px" : "auto"
                    }
                }
                _displayTargetedNotification(t) {
                    const e = this.contextMap.get(t.target),
                        n = document.createElement("lol-uikit-flyout-frame");
                    n.addEventListener("closeButtonClick", (() => {
                        t.resolveOnCloseButtonClickPromise(), this._removeNotificationFromQueue(t), this._processQueueState(t.target)
                    })), n.setAttribute("orientation", t.options.orientation), n.setAttribute("animated", !1), n.setAttribute("dismissable", t.options.dismissable), n.setAttribute("show", !0), n.style.position = "absolute", n.appendChild(t.content), e.layer.appendChild(n), o.default.insertLayer(e.layer, 0), t.displayed = !0, t.options.dismissOnTargetHide && s.default.addTarget(t.target, (() => {
                        this.remove(t)
                    })), this._setTargetedNotificationPosition(e.layer, {
                        element: n,
                        target: t.target,
                        targetAnchor: t.options.target.anchor,
                        elementAnchor: t.options.anchor,
                        offset: t.options.offset,
                        areaRestriction: "whole-window"
                    })
                }
                _setTargetedNotificationPosition(t, e) {
                    const n = a.default.getPositioningStrategy("flip")(e);
                    n && (t.style.position = "absolute", t.style.top = n.top + "px", t.style.left = n.left + "px")
                }
            };
            e.default = c
        }, (t, e, n) => {
            "use strict";
            Object.defineProperty(e, "__esModule", {
                value: !0
            }), e.default = void 0;
            var i, o = n(1),
                r = (i = n(226)) && i.__esModule ? i : {
                    default: i
                };
            var s = new class {
                constructor() {
                    this.type = "Modal"
                }
                add(t) {
                    const e = {
                        type: "Modal",
                        children: [t],
                        show: t.show,
                        prepend: t.prepend,
                        owner: t.owner,
                        ComponentFactory: t.ComponentFactory || o.componentFactory
                    };
                    return r.default.handleNotification(e).children[0]
                }
                remove(t, e) {
                    return r.default.remove(t, e)
                }
                getDOMNode(t) {
                    t.type = t.type || this.type;
                    const e = r.default.getDOMNode(t);
                    return e || (r.default.initializeDomNodes(t), r.default.getDOMNode(t))
                }
                getActiveModal() {
                    const t = r.default.getActiveModal();
                    return t && t.children[0] || null
                }
            };
            e.default = s
        }, (t, e, n) => {
            "use strict";
            Object.defineProperty(e, "__esModule", {
                value: !0
            }), e.default = void 0;
            var i, o = n(1),
                r = (i = n(247)) && i.__esModule ? i : {
                    default: i
                };
            var s = new class {
                assign(t, e, n, i) {
                    i.ComponentFactory = i.ComponentFactory || o.componentFactory, this.unassign(t), r.default.registerTarget(t, e, n, i)
                }
                unassign(t) {
                    r.default.unregisterTarget(t)
                }
                sendEvent(t, e) {}
                isActive() {
                    return !1
                }
            };
            e.default = s
        }, (t, e, n) => {
            "use strict";
            var i = a(n(167)),
                o = a(n(93)),
                r = n(1),
                s = a(n(168));

            function a(t) {
                return t && t.__esModule ? t : {
                    default: t
                }
            }
            t.exports = new class {
                constructor() {
                    this.targets = new WeakMap, this.layer = this.createLayer(), this.popout = this.layer.querySelector(".popout")
                }
                createLayer() {
                    const t = document.createElement("lol-uikit-full-page-backdrop"),
                        e = document.createElement("div");
                    return e.classList.add("popout"), e.style.position = "absolute", e.style.overflow = "visible", t.appendChild(e), t
                }
                showLayer() {
                    i.default.addLayer(this.layer)
                }
                hideLayer() {
                    i.default.removeLayer(this.layer)
                }
                defaults(t) {
                    return r.Lodash.defaults(t || {}, {
                        showEvent: "click",
                        hideEvent: "click",
                        targetAnchor: {
                            x: "right",
                            y: "center"
                        },
                        anchor: null,
                        offset: {
                            x: 0,
                            y: 0
                        },
                        positioningStrategy: "flip",
                        restrictArea: "safe-window"
                    })
                }
                registerTarget(t, e, n, i) {
                    const o = this.defaults(i),
                        s = {
                            show: this.showPopout.bind(this, t),
                            hide: this.hidePopout.bind(this),
                            toggle: this.togglePopout.bind(this, t)
                        };
                    r.Lodash.isFunction(e) && (e = r.Lodash.partial(e, t)), this.targets.set(t, {
                        renderer: e,
                        data: n,
                        options: o,
                        eventHandlers: s
                    }), (0, r.jQuery)(t).each((function() {
                        o.showEvent === o.hideEvent ? this.addEventListener(o.showEvent, s.toggle) : (this.addEventListener(o.showEvent, s.show), this.addEventListener(o.hideEvent, s.hide))
                    }))
                }
                unregisterTarget(t) {
                    const e = this.targets.get(t);
                    e && e.eventHandlers && (e.eventHandlers.hide(), (0, r.jQuery)(t).each((function() {
                        this.removeEventListener(e.options.showEvent, e.eventHandlers.show), this.removeEventListener(e.options.hideEvent, e.eventHandlers.hide), this.removeEventListener(e.options.showEvent, e.eventHandlers.toggle), this.removeEventListener(e.options.hideEvent, e.eventHandlers.toggle)
                    }))), this.targets.delete(t)
                }
                positionPopout(t, e) {
                    const n = this.targets.get(t),
                        {
                            options: i
                        } = n,
                        o = s.default.getPositioningStrategy(i.positioningStrategy)({
                            element: e,
                            target: t,
                            targetAnchor: i.targetAnchor,
                            elementAnchor: i.anchor,
                            offset: i.offset,
                            areaRestriction: i.restrictArea
                        });
                    if (!o) return;
                    this.popout.style.top = o.top + "px", this.popout.style.left = o.left + "px";
                    const a = s.default.elementRect(e),
                        l = s.default.elementRect(t),
                        d = s.default.relativePosition(t, this.popout),
                        c = this;
                    if ((0, r.jQuery)(e).each((function() {
                            this.dispatchEvent(c.getPositioningEvent(d, l, a))
                        })), !1 !== i.backdropCutout) {
                        const e = i.backdropCutout || t;
                        this.layer.dispatchEvent(c.getCutoutEvent(s.default.elementRect(e)))
                    }
                }
                togglePopout(t, e) {
                    const n = this.targets.get(t);
                    return this.layer.parentElement ? n.eventHandlers.hide(e) : n.eventHandlers.show(e)
                }
                showPopout(t) {
                    const e = this.targets.get(t),
                        n = function() {
                            if (-1 === [].slice.call(this.popout.children).indexOf(e.domNode)) {
                                for (; this.popout.firstChild;) this.popout.removeChild(this.popout.firstChild);
                                this.popout.appendChild(e.domNode)
                            }
                            this.showLayer(t), (0, o.default)(e.domNode).then(function() {
                                this.positionPopout(t, e.domNode), e.domNode.addEventListener("closeButtonClick", e.eventHandlers.hide)
                            }.bind(this))
                        }.bind(this);
                    if (!e.domNode) {
                        const t = e.options.ComponentFactory.create(e.renderer, e.data);
                        if (e.domNode = e.options.ComponentFactory.getDOMNode(t), t.renderPromise) return void(t.renderPromise = t.renderPromise.then(n.bind(this)))
                    }
                    n()
                }
                dispatchNewEvent(t, e) {
                    (0, r.jQuery)(t).each((function() {
                        this.dispatchEvent(new Event(e))
                    }))
                }
                hidePopout() {
                    this.hideLayer()
                }
                getPositioningEvent(t, e, n) {
                    const i = new Event("positioned");
                    return i.offset = t, i.targetRect = e, i.rect = n, i
                }
                getCutoutEvent(t) {
                    const e = new Event("cutout");
                    return e.cutoutRect = t, e
                }
            }
        }, (t, e, n) => {
            "use strict";
            var i, o = n(1),
                r = (i = n(249)) && i.__esModule ? i : {
                    default: i
                };
            t.exports = {
                assignFlyout: function(t, e, n, i) {
                    i.ComponentFactory = i.ComponentFactory || o.componentFactory, this.unassignFlyout(t), r.default.registerTarget(t, e, n, i)
                },
                unassignFlyout: function(t) {
                    r.default.unregisterTarget(t)
                },
                sendEvent: function(t, e) {
                    r.default.dispatchNewEvent(t, e)
                },
                repositionCaret: function(t) {
                    r.default.flyout && r.default.flyout.setAttribute("caretoffset", t)
                },
                isActive: function() {
                    return !!r.default.layer.parentElement
                }
            }
        }, (t, e, n) => {
            "use strict";
            var i = function(t, e) {
                    if (!e && t && t.__esModule) return t;
                    if (null === t || "object" != typeof t && "function" != typeof t) return {
                        default: t
                    };
                    var n = l(e);
                    if (n && n.has(t)) return n.get(t);
                    var i = {},
                        o = Object.defineProperty && Object.getOwnPropertyDescriptor;
                    for (var r in t)
                        if ("default" !== r && Object.prototype.hasOwnProperty.call(t, r)) {
                            var s = o ? Object.getOwnPropertyDescriptor(t, r) : null;
                            s && (s.get || s.set) ? Object.defineProperty(i, r, s) : i[r] = t[r]
                        } i.default = t, n && n.set(t, i);
                    return i
                }(n(1)),
                o = a(n(167)),
                r = a(n(168)),
                s = a(n(172));

            function a(t) {
                return t && t.__esModule ? t : {
                    default: t
                }
            }

            function l(t) {
                if ("function" != typeof WeakMap) return null;
                var e = new WeakMap,
                    n = new WeakMap;
                return (l = function(t) {
                    return t ? n : e
                })(t)
            }
            const d = function() {
                this.targets = new WeakMap, this.activeTarget = null, [this.layer, this.overlay] = this.createLayer(), this.overlayEvents = [], this.flyoutEvents = [], this.flyout = this.layer.querySelector(".flyout");
                ! function(t) {
                    document.addEventListener("keydown", (e => {
                        if (e && "Escape" === e.key) {
                            const e = t();
                            e && e.options.closeWhenEscapePressed && e.eventHandlers.hide()
                        }
                    }))
                }((() => this.activeTarget ? this.targets.get(this.activeTarget) : null).bind(this))
            };

            function c(t) {
                const e = new Event("cutout");
                return e.cutoutRect = t, e
            }
            d.prototype.createLayer = function() {
                const t = document.createElement("lol-uikit-full-page-backdrop"),
                    e = document.createElement("lol-uikit-flyout-frame"),
                    n = document.createElement("lol-uikit-full-page-backdrop");
                return t.classList.add("flyout-container"), t.style.background = "none", t.style.pointerEvents = "none", n.classList.add("flyout-overlay"), n.style.background = "none", n.style.pointerEvents = "all", e.classList.add("flyout"), e.style.position = "absolute", e.style.overflow = "visible", t.appendChild(n), t.appendChild(e), [t, n]
            }, d.prototype.showLayer = function() {
                this.flyout.setAttribute("show", !0), o.default.addLayer(this.layer)
            }, d.prototype.hideLayer = function() {
                return this.removeAllEventListeners(), this.flyout.setAttribute("show", !1), this.delayedHideLayerPromise = new Promise((t => setTimeout(t, 133))).then((() => {
                    this.delayedHideLayerPromise = null, o.default.removeLayer(this.layer)
                })), this.delayedHideLayerPromise
            }, d.prototype.defaults = function(t) {
                return i.Lodash.defaults(t || {}, {
                    showEvent: "click",
                    hideEvent: "click",
                    targetAnchor: {
                        x: "right",
                        y: "center"
                    },
                    tooltipAnchor: {
                        x: "left",
                        y: "center"
                    },
                    anchor: null,
                    offset: {
                        x: 0,
                        y: 0
                    },
                    closeWhenOutsideClicked: !0,
                    closeWhenInsideClicked: !1,
                    closeWhenEscapePressed: !0,
                    dimBackdrop: !1,
                    domNode: null
                })
            }, d.prototype.registerTarget = function(t, e, n, o) {
                const r = this.defaults(o),
                    s = {
                        show: this.showFlyout.bind(this, t),
                        hide: this.hideFlyout.bind(this, t),
                        toggle: this.toggleFlyout.bind(this, t)
                    };
                i.Lodash.isFunction(e) && (e = i.Lodash.partial(e, t)), this.targets.set(t, {
                    renderer: e,
                    data: n,
                    options: r,
                    eventHandlers: s,
                    domNode: r.domNode
                }), (0, i.jQuery)(t).each((function() {
                    r.showEvent === r.hideEvent ? this.addEventListener(r.showEvent, s.toggle) : (this.addEventListener(r.showEvent, s.show), this.addEventListener(r.hideEvent, s.hide))
                }))
            }, d.prototype.unregisterTarget = function(t) {
                const e = this.targets.get(t);
                e && e.eventHandlers && (e.eventHandlers.hide(), (0, i.jQuery)(t).each((function() {
                    this.removeEventListener(e.options.showEvent, e.eventHandlers.show), this.removeEventListener(e.options.hideEvent, e.eventHandlers.hide), this.removeEventListener(e.options.showEvent, e.eventHandlers.toggle), this.removeEventListener(e.options.hideEvent, e.eventHandlers.toggle)
                })), this.targets.delete(t), e.potentialApp && "function" == typeof e.potentialApp.onRemove && e.potentialApp.onRemove())
            }, d.prototype.dispatchNewEvent = function(t, e) {
                (0, i.jQuery)(t).each((function() {
                    this.dispatchEvent(new Event(e))
                }))
            }, d.prototype.addOverlayEventListener = function(t, e) {
                this.overlay.addEventListener(t, e), this.overlayEvents.push([t, e])
            }, d.prototype.addFlyoutEventListener = function(t, e) {
                this.flyout.addEventListener(t, e), this.flyoutEvents.push([t, e])
            }, d.prototype.removeAllEventListeners = function() {
                for (; this.overlayEvents.length;) this.overlay.removeEventListener.apply(this.overlay, this.overlayEvents.pop());
                for (; this.flyoutEvents.length;) this.flyout.removeEventListener.apply(this.flyout, this.flyoutEvents.pop())
            }, d.prototype.positionFlyout = function(t, e) {
                const n = this.targets.get(t),
                    {
                        options: o
                    } = n,
                    s = {
                        element: e,
                        target: t,
                        targetAnchor: o.targetAnchor,
                        elementAnchor: o.tooltipAnchor,
                        offset: o.offset,
                        areaRestriction: "whole-window"
                    },
                    a = r.default.getPositioningStrategy("flip")(s);
                if (!a) return;
                n.options.borderless || (a.top = a.top - 10), this.flyout.style.top = a.top + "px", this.flyout.style.left = a.left + "px";
                const l = r.default.elementRect(e),
                    d = r.default.elementRect(t),
                    u = r.default.relativePosition(t, this.flyout);
                if ((0, i.jQuery)(e).each((function() {
                        this.dispatchEvent(function(t, e, n) {
                            const i = new Event("positioned");
                            return i.offset = t, i.targetRect = e, i.rect = n, i
                        }(u, d, l))
                    })), this.layer.style.background = o.dimBackdrop ? null : "none", !1 !== o.backdropCutout) {
                    const e = o.backdropCutout || t;
                    this.overlay.dispatchEvent(c(r.default.elementRect(e)))
                } else this.overlay.dispatchEvent(c(null))
            }, d.prototype.toggleFlyout = function(t, e) {
                const n = this.targets.get(t);
                return this.layer.parentElement ? n.eventHandlers.hide(e) : n.eventHandlers.show(e)
            }, d.prototype.showFlyout = function(t) {
                const e = this.targets.get(t);
                this.delayedHideLayerPromise && (this.delayedHideLayerPromise = null);
                const n = function() {
                    if (this.activeTarget !== t) {
                        for (this.activeTarget && (s.default.removeTarget(this.activeTarget), this.dispatchNewEvent(this.activeTarget, "willHide")), this.flyout.firstChild && this.removeAllEventListeners(); this.flyout.firstChild;) this.flyout.removeChild(this.flyout.firstChild);
                        this.activeTarget && this.dispatchNewEvent(this.activeTarget, "didHide"), this.flyout.setAttribute("orientation", e.options.orientation), this.flyout.setAttribute("animated", e.options.animated), this.flyout.setAttribute("caretoffset", e.options.caretOffset), this.flyout.setAttribute("borderless", e.options.borderless), this.flyout.setAttribute("caretless", e.options.caretless), this.flyout.style.top = "0px", this.flyout.style.left = "0px", this.activeTarget = t, this.flyout.appendChild(e.domNode)
                    }
                    var n;
                    this.showLayer(t), Promise.race([new Promise((t => setTimeout(t, 500))), (n = e.domNode, new Promise((function(t) {
                        const e = function() {
                            n.clientWidth ? t() : window.requestAnimationFrame(e)
                        };
                        e()
                    })))]).then(function() {
                        this.positionFlyout(t, e.domNode), e.options.closeWhenOutsideClicked && this.addOverlayEventListener("click", e.eventHandlers.hide), e.options.closeWhenInsideClicked && this.addFlyoutEventListener("click", e.eventHandlers.hide), s.default.addTarget(t, (() => {
                            this.hideFlyout(t)
                        })), Object.keys(e.eventHandlers).forEach(function(t) {
                            this.addOverlayEventListener(t, e.eventHandlers[t])
                        }.bind(this))
                    }.bind(this))
                }.bind(this);
                if (!e.domNode) {
                    const t = e.options.ComponentFactory.create(e.renderer, e.data);
                    if (e.potentialApp = t, e.domNode = e.options.ComponentFactory.getDOMNode(t), t.renderPromise) return void(t.renderPromise = t.renderPromise.then(n.bind(this)))
                }
                n(), this.dispatchNewEvent(t, "didShow")
            }, d.prototype.hideFlyout = function(t) {
                this.activeTarget === t && this.layer.parentElement && (s.default.removeTarget(t), this.dispatchNewEvent(t, "willHide"), this.hideLayer().then(function() {
                    for (; this.flyout.firstChild;) this.flyout.removeChild(this.flyout.firstChild);
                    this.dispatchNewEvent(t, "didHide")
                }.bind(this)), this.activeTarget = null)
            }, t.exports = new d
        }, (t, e, n) => {
            "use strict";
            Object.defineProperty(e, "__esModule", {
                value: !0
            }), e.default = void 0;
            var i = s(n(251)),
                o = s(n(252)),
                r = s(n(173));

            function s(t) {
                return t && t.__esModule ? t : {
                    default: t
                }
            }
            var a = new class {
                constructor() {
                    const t = void 0 === window.riotInvoke;
                    this.WindowClass = t ? o.default : i.default
                }
                create(t, e, n, i) {
                    const o = new(0, this.WindowClass)(t, e, void 0, n, i),
                        r = o.getNativeWindow();
                    return r && r.requestAnimationFrame && r.requestAnimationFrame((() => o.linkStyles("/fe/lol-uikit/main.css"))), o
                }
                decorateNative(t) {
                    return new(0, this.WindowClass)(null, t.name || "decorated-window", t)
                }
                getScreenInfo() {
                    return r.default.getScreenInfo()
                }
                getScreenRect() {
                    return r.default.getScreenRect()
                }
                getScreenAvailableRect() {
                    return r.default.getScreenAvailableRect()
                }
                getWindowRect() {
                    return r.default.getWindowRect()
                }
                getValidWindowSizes() {
                    return r.default.getValidWindowSizes()
                }
            };
            e.default = a
        }, (t, e, n) => {
            "use strict";
            Object.defineProperty(e, "__esModule", {
                value: !0
            }), e.inChrome = e.default = e.MockedWindow = void 0;
            var i = n(1),
                o = a(n(4)),
                r = a(n(66)),
                s = a(n(173));

            function a(t) {
                return t && t.__esModule ? t : {
                    default: t
                }
            }
            const l = window.testsSandboxDoc || window.document,
                d = void 0 === window.riotInvoke;
            e.inChrome = d;
            const c = d ? {
                    getRect: t => new r.default(t.scrollX, t.scrollY, t.innerWidth, t.innerHeight),
                    getPointFromEvent: function(t) {
                        let e = t.pageX,
                            n = t.pageY;
                        const i = t.target && t.target.ownerDocument.defaultView.frameElement;
                        if (i) {
                            const t = i.getBoundingClientRect();
                            e += t.left, n += t.top
                        }
                        return new r.default(e, n)
                    }
                } : {
                    getRect: t => new r.default(t.screen.availLeft, t.screen.availTop, t.screen.availWidth, t.screen.availHeight),
                    getPointFromEvent: function(t) {
                        return new r.default(t.screenX, t.screenY)
                    }
                },
                u = {
                    left: 0,
                    top: 0,
                    width: 100,
                    height: 100
                };
            class p {
                constructor(t, e = "", n, i, o = {}) {
                    this.init(t, e, n, i, o)
                }
                init(t, e, n, r, s) {
                    this._window = function(t, e, n, o) {
                        const r = o.parented ? "about:blank?parented=1" : "about:blank",
                            s = function(t) {
                                const e = i.Lodash.cloneDeep(u);
                                for (const n in u) void 0 !== t[n] && (e[n] = t[n]);
                                return Object.keys(e).map((t => t + "=" + e[t])).join(",")
                            }(o);
                        return e || (n || window).open(r, t, s)
                    }(e, n, r, s), this._initValues(s), s.showInTaskbar || this.invoke("Window.RemoveFromTaskbar"), this.invoke("Window.Hide");
                    const a = this._window,
                        l = a.document;
                    this.initStyles(), o.default.registerCustomElements(l), t ? this.setContent(t) : this._element = a.document.body, a.addEventListener("keydown", (function(t) {
                        (t.ctrlKey || t.metaKey) && t.altKey && 73 === t.keyCode && a.riotInvoke({
                            request: JSON.stringify({
                                name: "Window.ShowDevTools",
                                params: []
                            })
                        })
                    })), a.addEventListener("unload", (() => this.cleanupStyles()))
                }
                _initValues(t) {
                    this.width = t.width || 0, this.height = t.height || 0, this.visible = !1, this.dragEnabled = !0, this.resizeEnabled = !1, this.minimizeSync = !1
                }
                initStyles() {
                    const t = this._window.document,
                        e = t.querySelector("head"),
                        n = t.createElement("base");
                    n.setAttribute("href", l.baseURI), e.appendChild(n);
                    const o = t.createElement("style");
                    o.type = "text/css", o.innerHTML = "html,body{height:100%; margin: 0; overflow: hidden;}", e.appendChild(o);
                    (0, i.getProvider)().get("rcp-fe-lol-typekit").registerDocument(t)
                }
                cleanupStyles() {
                    const t = (0, i.getProvider)().get("rcp-fe-lol-typekit"),
                        e = this._window.document;
                    t.unregisterDocument(e)
                }
                getNativeWindow() {
                    return this._window
                }
                setDragEnabled(t) {
                    return this.dragEnabled = t, this.invoke("Mouse.SetDragEnabled", this.dragEnabled)
                }
                setResizeEnabled(t) {
                    if (this.resizeEnabled !== t) {
                        if (t) {
                            const t = this._window.document,
                                {
                                    body: e
                                } = this._window.document,
                                n = t.createElement("div");
                            n.setAttribute("id", "window-resize-element"), n.style.width = "20px", n.style.height = "20px", n.style.cursor = "nwse-resize", n.style.position = "fixed", n.style.bottom = 0, n.style.right = 0, n.style.zIndex = 1e3, e.appendChild(n)
                        } else {
                            const t = this._window.document.querySelector("#window-resize-element");
                            t && this._window.document.body.removeChild(t)
                        }
                        return this.resizeEnabled = t, this.invoke("Mouse.SetResizeEnabled", this.resizeEnabled)
                    }
                }
                setResizeBounds(t, e, n, i) {
                    return Promise.all([this.invoke("Mouse.SetResizeBounds", t, e, n, i), this.invoke("Window.SetResizeBounds", t, e, n, i)])
                }
                setMinimizeSync(t) {
                    return this.minimizeSync = t, this.invoke("Window.SyncMinimize", this.minimizeSync)
                }
                setContent(t) {
                    if (!t) return Promise.resolve();
                    const {
                        body: e
                    } = this._window.document;
                    return e.innerHTML = "", this._element = t, e.appendChild(t), this.autosize()
                }
                removeContent() {
                    if (this._element) {
                        const {
                            body: t
                        } = this._window.document;
                        t.innerHTML = "", this._element.remove(), this._element = null
                    }
                }
                addStyles(t) {
                    const e = this._window.document,
                        {
                            head: n
                        } = e,
                        i = e.createElement("style");
                    i.type = "text/css", i.appendChild(e.createTextNode(t)), n.appendChild(i)
                }
                linkStyles(t) {
                    const e = this._window.document,
                        {
                            head: n
                        } = e,
                        i = e.createElement("link");
                    i.rel = "stylesheet", i.href = t, n.appendChild(i)
                }
                show() {
                    const t = new CustomEvent("showing", {
                        cancelable: !0
                    });
                    return this._element.dispatchEvent(t), t.defaultPrevented ? Promise.resolve(!1) : (this.visible = !0, this.invoke("Window.Show").then((() => (this._element.dispatchEvent(new CustomEvent("show")), !0))))
                }
                hide() {
                    const t = new CustomEvent("hiding", {
                        cancelable: !0
                    });
                    return this._element.dispatchEvent(t), t.defaultPrevented ? Promise.resolve(!1) : (this.visible = !1, this.invoke("Window.Hide").then((() => (this._element.dispatchEvent(new CustomEvent("hide")), !0))))
                }
                minimize() {
                    return this.invoke("Window.Minimize")
                }
                restore() {
                    return this.invoke("Window.Restore")
                }
                close() {
                    return this._element.dispatchEvent(new CustomEvent("closing")), this.visible = !1, this._window.close(), this._element.dispatchEvent(new CustomEvent("close")), !0
                }
                closed() {
                    return this._window.closed
                }
                moveTo(t, e) {
                    return this.invoke("Window.MoveTo", t, e)
                }
                resizeTo(t, e) {
                    return this.width = t, this.height = e, this.invoke("Window.ResizeTo", t, e)
                }
                autosize() {
                    return this._element.style.position = "absolute", this.width = this._element.offsetWidth, this.height = this._element.offsetHeight, this._element.style.position = "", this.invoke("Window.ResizeTo", this.width, this.height)
                }
                activate() {
                    return this.invoke("Window.Activate")
                }
                setDragBarHeight(t) {
                    return this.invoke("Mouse.SetDragBarHeight", t)
                }
                setTitle(t) {
                    return this.invoke("Window.SetTitle", t)
                }
                invoke(t) {
                    const e = Array.prototype.slice.call(arguments, 1);
                    return new Promise((n => {
                        this._window.riotInvoke({
                            request: JSON.stringify({
                                name: t,
                                params: e
                            }),
                            onSuccess: n
                        })
                    }))
                }
                getWindowInfo() {
                    return this._window.riotInvoke ? this.invoke("Window.ScreenData").then((t => JSON.parse(JSON.parse(t).result))) : Promise.resolve({
                        screenX: window.screenX,
                        screenY: window.screenY,
                        screenWidth: window.screen.width,
                        screenHeight: window.screen.height,
                        screenAvailWidth: window.screen.availWidth,
                        screenAvailHeight: window.screen.availHeight,
                        screenAvailLeft: window.screen.availLeft,
                        screenAvailTop: window.screen.availTop,
                        windowWidth: window.outerWidth,
                        windowHeight: window.outerHeight,
                        windowActivated: !l.hidden,
                        windowMinimized: l.hidden,
                        zoomScale: window.devicePixelRatio
                    })
                }
                getWindowRect() {
                    return this.getWindowInfo().then((t => new r.default(t.screenX, t.screenY, t.windowWidth, t.windowHeight)))
                }
                center() {
                    const t = new r.default(0, 0, this.width, this.height);
                    return t.centerWithin(c.getRect(this._window)), this.moveTo(t.left, t.top)
                }
                centerWithinParent() {
                    return this.invoke("Window.CenterWithinParent")
                }
                centerWithinMainWindow() {
                    return s.default.getScreenInfo().then((t => {
                        const {
                            zoomScale: e
                        } = t, n = new r.default(0, 0, this.width * e, this.height * e), i = new r.default(t.screenX, t.screenY, t.windowWidth, t.windowHeight);
                        n.centerWithin(i), n.left += t.screenX, n.top += t.screenY, this.moveTo(n.left, n.top)
                    }))
                }
                moveNearMouseClick(t) {
                    const e = c.getPointFromEvent(t),
                        n = new r.default(0, 0, this.width, this.height);
                    return n.place(e, c.getRect(this._window)), this.moveTo(n.left, n.top)
                }
                moveNearBoundingRect(t) {
                    const e = new r.default(0, 0, this.width, this.height);
                    return e.place(t, c.getRect(this._window)), this.moveTo(e.left, e.top)
                }
                postMessage(t) {
                    this._window.postMessage(t, "*")
                }
                addListener(t, e) {
                    this._window.addEventListener(t, e)
                }
                removeListener(t, e) {
                    this._window.removeEventListener(t, e)
                }
                static getElementRectFromEvent(t, e) {
                    const n = e.screenX - e.clientX,
                        i = e.screenY - e.clientY,
                        o = t.ownerDocument.defaultView,
                        s = t.getBoundingClientRect(),
                        a = d ? o.scrollX : n,
                        l = d ? o.scrollY : i;
                    return new r.default(s.left + a, s.top + l, s.width, s.height)
                }
            }
            e.default = p;
            e.MockedWindow = class extends p {
                init(t) {
                    this._element = l.createElement("div"), t && this.setContent(t);
                    const {
                        style: e
                    } = this._element;
                    e.position = "absolute", e.zIndex = 100, this._dragBarHeight = 5, this.visible = !1, this.onMouseDown = this.onMouseDown.bind(this), this.onMouseMove = this.onMouseMove.bind(this), this.onMouseUp = this.onMouseUp.bind(this), this._element.addEventListener("mousedown", this.onMouseDown), this._window = window
                }
                setContent(t) {
                    this._element.textContent = "", this._element.appendChild(t)
                }
                get width() {
                    return this._element.offsetWidth
                }
                get height() {
                    return this._element.offsetHeight
                }
                show() {
                    return super.show().then((t => t ? l.body.appendChild(this._element) : null))
                }
                hide() {
                    return super.hide().then((t => t ? this._element.remove() : null))
                }
                moveTo(t, e) {
                    return this._element.style.left = t + "px", this._element.style.top = e + "px", Promise.resolve()
                }
                resizeTo(t, e) {
                    return this._element.style.width = t + "px", this._element.style.height = e + "px", Promise.resolve()
                }
                autosize() {
                    return this._element.style.width = "", this._element.style.height = "", Promise.resolve()
                }
                activate() {
                    return window.focus(), Promise.resolve()
                }
                setDragBarHeight(t) {
                    return this._dragBarHeight = t, Promise.resolve()
                }
                onMouseDown(t) {
                    0 === t.button && t.offsetY <= this._dragBarHeight && (t.preventDefault(), this._mouseOffset = {
                        x: -t.offsetX,
                        y: -t.offsetY
                    }, l.addEventListener("mousemove", this.onMouseMove), l.addEventListener("mouseup", this.onMouseUp))
                }
                onMouseMove(t) {
                    if (0 !== t.button) this.onMouseUp();
                    else {
                        const e = new r.default(t.pageX + this._mouseOffset.x, t.pageY + this._mouseOffset.y, this.width, this.height);
                        e.fitWithin(this.container.dimensions), this.moveTo(e.left, e.top)
                    }
                }
                onMouseUp() {
                    l.removeEventListener("mouseup", this.onMouseUp), l.removeEventListener("mousemove", this.onMouseMove)
                }
                invoke() {
                    return Promise.resolve()
                }
            }
        }, (t, e, n) => {
            "use strict";
            Object.defineProperty(e, "__esModule", {
                value: !0
            }), e.default = void 0;
            var i, o = (i = n(66)) && i.__esModule ? i : {
                default: i
            };
            const r = {
                get rect() {
                    return new o.default(window.scrollX, window.scrollY, window.innerWidth, window.innerHeight)
                },
                getPointFromEvent: function(t) {
                    return new o.default(t.pageX, t.pageY)
                }
            };
            var s = class {
                constructor(t) {
                    this._element = document.createElement("div"), this.setContent(t);
                    const {
                        style: e
                    } = this._element;
                    e.position = "absolute", e.zIndex = 100, this._dragBarHeight = 5, this.visible = !1, this._closed = !1, this.onMouseDown = this.onMouseDown.bind(this), this.onMouseMove = this.onMouseMove.bind(this), this.onMouseUp = this.onMouseUp.bind(this), this._element.addEventListener("mousedown", this.onMouseDown)
                }
                get width() {
                    return this._element.offsetWidth
                }
                get height() {
                    return this._element.offsetHeight
                }
                setContent(t) {
                    t && (this._element.innerHTML = "", this._element.appendChild(t), this.autosize())
                }
                addStyles(t) {
                    const {
                        head: e
                    } = document, n = document.createElement("style");
                    n.type = "text/css", n.appendChild(document.createTextNode(t)), e.appendChild(n)
                }
                linkStyles(t) {
                    const {
                        head: e
                    } = document, n = document.createElement("link");
                    n.rel = "stylesheet", n.href = t, e.appendChild(n)
                }
                show() {
                    const t = window.testsSandbox || document.body,
                        e = new CustomEvent("showing", {
                            cancelable: !0
                        });
                    return this._element.dispatchEvent(e), !e.defaultPrevented && (this.visible = !0, t.appendChild(this._element), this._element.dispatchEvent(new CustomEvent("show")), !0)
                }
                hide() {
                    const t = new CustomEvent("hiding", {
                        cancelable: !0
                    });
                    return this._element.dispatchEvent(t), !t.defaultPrevented && (this.visible = !1, this._element.remove(), this._element.dispatchEvent(new CustomEvent("hide")), !0)
                }
                close() {
                    return this._element.dispatchEvent(new CustomEvent("closing")), this._closed = !0, this.visible = !1, this._element.remove(), this._element.dispatchEvent(new CustomEvent("close")), !0
                }
                closed() {
                    return this._closed
                }
                moveTo(t, e) {
                    this._element.style.left = t + "px", this._element.style.top = e + "px"
                }
                resizeTo(t, e) {
                    this._element.style.width = t + "px", this._element.style.height = e + "px"
                }
                autosize() {
                    this._element.style.width = "", this._element.style.height = ""
                }
                activate() {
                    window.focus()
                }
                setDragBarHeight(t) {
                    this._dragBarHeight = t
                }
                center() {
                    const t = new o.default(0, 0, this.width, this.height);
                    t.centerWithin(r.rect), this.moveTo(t.left, t.top)
                }
                centerWithinMainWindow() {
                    return new Promise((t => {
                        this.center(), t()
                    }))
                }
                getNativeWindow() {
                    return {
                        requestAnimationFrame: function(t) {
                            t()
                        }
                    }
                }
                moveNearMouseClick(t) {
                    const e = r.getPointFromEvent(t),
                        n = new o.default(0, 0, this.width, this.height);
                    n.place(e, r.rect), this.moveTo(n.left, n.top)
                }
                moveNearBoundingRect(t) {
                    const e = new o.default(0, 0, this.width, this.height);
                    e.place(t, r.rect), this.moveTo(e.left, e.top)
                }
                onMouseDown(t) {
                    let e = window.getComputedStyle(this._element).getPropertyValue("top");
                    e = parseInt(e) || 0, 0 === t.button && t.pageY - e <= this._dragBarHeight && (t.preventDefault(), this._mouseOffset = {
                        x: -t.offsetX,
                        y: -t.offsetY
                    }, document.addEventListener("mousemove", this.onMouseMove), document.addEventListener("mouseup", this.onMouseUp))
                }
                onMouseMove(t) {
                    if (0 !== t.button) this.onMouseUp();
                    else {
                        const e = new o.default(t.pageX + this._mouseOffset.x, t.pageY + this._mouseOffset.y, this.width, this.height);
                        e.fitWithin(r.rect), this.moveTo(e.left, e.top)
                    }
                }
                onMouseUp() {
                    document.removeEventListener("mouseup", this.onMouseUp), document.removeEventListener("mousemove", this.onMouseMove)
                }
                postMessage(t) {
                    const e = new CustomEvent("message");
                    Object.assign(e, {
                        source: window,
                        data: t
                    }), this._element.dispatchEvent(e)
                }
                addListener(t, e) {
                    this._element.addEventListener(t, e)
                }
                removeListener(t, e) {
                    this._element.removeEventListener(t, e)
                }
            };
            e.default = s
        }, (t, e, n) => {
            "use strict";
            var i, o = (i = n(254)) && i.__esModule ? i : {
                default: i
            };
            t.exports = {
                registerLayerWindow: function(t, e, n, i) {
                    o.default.registerLayerWindow(t, e, n, i)
                },
                destroy: function(t) {
                    o.default.destroy(t)
                },
                close: function(t) {
                    o.default.close(t)
                },
                openLayer: function(t) {
                    o.default.openLayer(t)
                },
                closeLayer: function(t) {
                    o.default.closeLayer(t)
                },
                attach: function(t) {
                    o.default.attach(t)
                },
                detach: function(t) {
                    o.default.detach(t)
                },
                toggleLayerOpenClose: function(t) {
                    o.default.toggleLayerOpenClose(t)
                },
                toggleDetachAttach: function(t) {
                    o.default.toggleDetachAttach(t)
                },
                minimizeWindow: function(t) {
                    o.default.minimizeWindow(t)
                },
                flash: function(t) {
                    o.default.flash(t)
                },
                elongateLayer: function(t, e) {
                    o.default.elongateLayer(t, e)
                },
                getWindowRectPromise: function(t) {
                    return o.default.getWindowRectPromise()
                }
            }
        }, (t, e, n) => {
            "use strict";
            Object.defineProperty(e, "__esModule", {
                value: !0
            }), e.default = void 0;
            var i = s(n(1)),
                o = s(n(167)),
                r = s(n(250));

            function s(t) {
                return t && t.__esModule ? t : {
                    default: t
                }
            }
            const a = -10,
                l = -10;
            var d = new class {
                constructor() {
                    this._layerManager = o.default, this._windowManager = r.default, this._layerWindowMap = new Map, this._zoomScale = 1, this._setupDatabindingObservers()
                }
                registerLayerWindow(t, e, n, o) {
                    if (!t) return i.default.logger.error("LayerWindowController cannot register without a name!"), !1;
                    if (!e) return i.default.logger.error("LayerWindowController cannot register without options!"), !1;
                    const r = this._getInfo(t);
                    if (r) {
                        if (r.container === n && r.content === o) return !0;
                        this.destroy(t)
                    }
                    return this._setInfo(t, {
                        name: t,
                        options: e,
                        isDetached: !1,
                        isOpen: !1,
                        container: n,
                        content: o,
                        window: null,
                        unloadListener: null
                    }), !0
                }
                destroy(t) {
                    this._getInfo(t) && (this.close(t), this._layerWindowMap.delete(t))
                }
                close(t) {
                    const e = this._getInfo(t);
                    e && (e.isDetached ? (e.isDetached = !1, this._closeWindow(e)) : this.closeLayer(t))
                }
                openLayer(t) {
                    const e = this._getInfo(t);
                    e && (e.isDetached ? this._focusWindow(e) : e.isOpen || (e.isOpen = !0, this._addLayer(e), this._dispatchEvent(e, "onLayerOpened")))
                }
                closeLayer(t) {
                    const e = this._getInfo(t);
                    if (!e) return !1;
                    !e.isDetached && e.isOpen && (e.isOpen = !1, this._removeLayer(e), this._dispatchEvent(e, "onLayerClosed"))
                }
                attach(t) {
                    const e = this._getInfo(t);
                    e && e.isDetached && (this._closeWindow(e), e.isDetached = !1, this.isOpen || (e.isOpen = !0, this._addLayer(e)), this._dispatchEvent(e, "onWindowClosed"))
                }
                detach(t) {
                    const e = this._getInfo(t);
                    if (!e) return !1;
                    e.isDetached || (e.isOpen && (e.isOpen = !1, this._removeLayer(e)), e.isDetached = !0, this._openWindow(e), this._dispatchEvent(e, "onWindowOpened"))
                }
                toggleLayerOpenClose(t) {
                    const e = this._getInfo(t);
                    if (!e) return !1;
                    e.isDetached ? this._focusWindow(e) : e.isOpen ? this.closeLayer(t) : this.openLayer(t)
                }
                toggleDetachAttach(t) {
                    const e = this._getInfo(t);
                    if (!e) return !1;
                    e.isDetached ? this.attach(t) : this.detach(t)
                }
                minimizeWindow(t) {
                    const e = this._getInfo(t);
                    if (!e) return !1;
                    e.isDetached ? this._minimizeWindow(e) : this.closeLayer(t)
                }
                flash(t) {
                    const e = this._getInfo(t);
                    if (!e) return !1;
                    if (e.isDetached) this._flashWindow(e);
                    else if (window.riotInvoke) return window.riotInvoke({
                        request: JSON.stringify({
                            name: "Window.Flash",
                            params: []
                        })
                    })
                }
                elongateLayer(t, e) {
                    const n = this._getInfo(t);
                    if (!n) return !1;
                    if (n.isOpen) {
                        const t = this._prepareLayerStyles();
                        e = (e = e < t.layerMinHeight ? t.layerMinHeight : e) > t.layerMaxHeight ? t.layerMaxHeight : e, n.options.defaultHeight = e, n.content.style.height = `${e}px`
                    }
                }
                getWindowRectPromise(t) {
                    const e = this._getInfo(t);
                    return e && e.isDetached ? e.window.getWindowRect() : Promise.resolve()
                }
                _getInfo(t) {
                    return this._layerWindowMap.get(t)
                }
                _setInfo(t, e) {
                    return this._layerWindowMap.set(t, e)
                }
                _setupDatabindingObservers() {
                    const {
                        dataBinding: t,
                        socket: e
                    } = i.default;
                    t("/lol-settings", e).addObserver("/v1/local/video", this, (t => {
                        const e = t && t.data ? t.data.ZoomScale : this._zoomScale;
                        e && this._zoomScale !== e && (this._zoomScale = e, this._resizeOpenWindows())
                    }))
                }
                _resizeOpenWindows() {
                    this._layerWindowMap.forEach((function(t) {
                        t.isDetached && this._resizeWindow(t)
                    }))
                }
                _resizeWindow(t) {
                    t.window.resizeEnabled && t.window.setResizeBounds(t.window.minWidth * this._zoomScale, t.window.minHeight * this._zoomScale, screen.availWidth, screen.availHeight)
                }
                _prepareLayerStyles(t) {
                    return Object.assign({
                        layerMinHeight: 0,
                        layerMaxHeight: 0,
                        layerTop: null,
                        layerRight: null,
                        layerBottom: null,
                        layerLeft: null
                    }, t.options)
                }
                _addLayer(t) {
                    const e = this._prepareLayerStyles(t);
                    t.content.style.minHeight = this._inPixels(e.layerMinHeight), t.content.style.maxHeight = this._inPixels(e.layerMaxHeight), t.content.style.width = this._inPixels(e.defaultWidth), t.content.style.height = this._inPixels(e.defaultHeight), t.content.style.top = this._inPixels(e.layerTop), t.content.style.right = this._inPixels(e.layerRight), t.content.style.bottom = this._inPixels(e.layerBottom), t.content.style.left = this._inPixels(e.layerLeft), this._layerManager.addLayer(t.content)
                }
                _removeLayer(t) {
                    t.lastValidLayerOffsets = {
                        offsetLeft: t.content.offsetLeft,
                        offsetTop: t.content.offsetTop,
                        offsetWidth: t.content.offsetWidth,
                        offsetHeight: t.content.offsetHeight
                    }, this._layerManager.removeLayer(t.content)
                }
                _prepareWindowStyles(t) {
                    const e = {
                        showInTaskbar: !0,
                        windowWidth: t.options.defaultWidth,
                        windowHeight: t.options.defaultHeight,
                        windowMinWidth: 0,
                        windowMinHeight: 0,
                        windowLeft: window.screenLeft + a,
                        windowTop: window.screenTop + l,
                        resizable: !0,
                        title: "",
                        stylesheets: []
                    };
                    if (t.lastValidLayerOffsets) {
                        const n = t.lastValidLayerOffsets;
                        e.windowWidth = n.offsetWidth > 0 ? n.offsetWidth : e.windowWidth, e.windowHeight = n.offsetHeight > 0 ? n.offsetHeight : e.windowHeight, e.windowLeft += n.offsetLeft > 0 ? n.offsetLeft : 0, e.windowTop += n.offsetTop > 0 ? n.offsetTop : 0
                    }
                    const n = Object.assign({}, t.options);
                    return void 0 !== n.windowLeft && void 0 !== n.windowTop && (n.windowLeft < screen.availLeft || n.windowTop < screen.availTop || n.windowWidth < n.windowMinWidth || n.windowHeight < n.windowMinHeight || n.windowWidth > screen.availWidth || n.windowHeight > screen.availHeight ? (delete n.windowLeft, delete n.windowTop, delete n.windowWidth, delete n.windowHeight) : (n.windowWidth = n.windowWidth / this._zoomScale, n.windowHeight = n.windowHeight / this._zoomScale)), Object.assign(e, n)
                }
                _openWindow(t) {
                    const e = this._prepareWindowStyles(t);
                    t.window = this._windowManager.create(t.content, `layerWindow_${t.name}`, void 0, {
                        left: e.windowLeft,
                        top: e.windowTop,
                        width: e.windowWidth,
                        height: e.windowHeight
                    }), t.content.classList.add("detached");
                    const n = t.window._window.document;
                    n.body.style.overflow = "hidden", this._addStylesheets(e.stylesheets, n), t.window.resizeTo(e.windowWidth, e.windowHeight), t.window.moveTo(e.windowLeft, e.windowTop), t.window.show(), t.window.setDragBarHeight(48), e.resizable && (t.window.setResizeEnabled(!0), this._resizeWindow(t)), t.window.setTitle(e.title);
                    t.unloadListener = function() {
                        this.attach(t.name)
                    }.bind(this), t.window.addListener("unload", t.unloadListener)
                }
                _addStylesheets(t, e) {
                    const n = e.querySelector("head");
                    t.forEach((t => {
                        const i = e.createElement("link");
                        i.setAttribute("type", "text/css"), i.setAttribute("rel", "stylesheet"), i.setAttribute("href", t), n.appendChild(i)
                    }))
                }
                _closeWindow(t) {
                    t.content.classList.remove("detached"), t.window && (t.window.close(), t.window.removeContent(), t.window.removeListener("unload", t.unloadListener), t.window = null)
                }
                _minimizeWindow(t) {
                    t.window && t.window.minimize()
                }
                _focusWindow(t) {
                    t.window && (t.window.restore(), t.window.activate(), t.window._element.focus())
                }
                _flashWindow(t) {
                    t.window && t.window.invoke("Window.Flash")
                }
                _inPixels(t) {
                    return null !== t || void 0 !== t ? `${t}px` : ""
                }
                _dispatchEvent(t, e) {
                    t.container.dispatchEvent(new CustomEvent(e))
                }
            };
            e.default = d
        }, (t, e, n) => {
            "use strict";
            Object.defineProperty(e, "__esModule", {
                value: !0
            }), e.SummonerIconManager = e.DEFAULT_ICON_URL = void 0, e.default = function() {
                return o.gameDataBinding.get("/assets/v1/summoner-icons.json").then((t => new a(t)))
            };
            var i, o = n(1),
                r = (i = n(256)) && i.__esModule ? i : {
                    default: i
                };
            const s = "data:image/jpeg;base64,/9j/4QAYRXhpZgAASUkqAAgAAAAAAAAAAAAAAP/sABFEdWNreQABAAQAAAA8AAD/4QQYaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLwA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/PiA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJBZG9iZSBYTVAgQ29yZSA1LjYtYzE0NSA3OS4xNjM0OTksIDIwMTgvMDgvMTMtMTY6NDA6MjIgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcFJpZ2h0cz0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3JpZ2h0cy8iIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bXBNTTpPcmlnaW5hbERvY3VtZW50SUQ9InhtcC5kaWQ6NDA4MTQzMDktMGVhYS1lMTRiLTg3ZWItNzliZDViOGMwZDY1IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjg3MzAzMTk0QkQ4QjExRUI5MDAzREE5MzQ4RUFERDlCIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjg3MzAzMTkzQkQ4QjExRUI5MDAzREE5MzQ4RUFERDlCIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCBDQyAyMDE5IChXaW5kb3dzKSI+IDx4bXBSaWdodHM6VXNhZ2VUZXJtcz4gPHJkZjpBbHQ+IDxyZGY6bGkgeG1sOmxhbmc9IngtZGVmYXVsdCIvPiA8L3JkZjpBbHQ+IDwveG1wUmlnaHRzOlVzYWdlVGVybXM+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjE5YmJkNDlkLWJkYmYtZDU0YS04MWIyLWNhYzkwYjk2MzVlOCIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo0MDgxNDMwOS0wZWFhLWUxNGItODdlYi03OWJkNWI4YzBkNjUiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7/7QBIUGhvdG9zaG9wIDMuMAA4QklNBAQAAAAAAA8cAVoAAxslRxwCAAACAAIAOEJJTQQlAAAAAAAQ/OEfici3yXgvNGI0B1h36//iDFhJQ0NfUFJPRklMRQABAQAADEhMaW5vAhAAAG1udHJSR0IgWFlaIAfOAAIACQAGADEAAGFjc3BNU0ZUAAAAAElFQyBzUkdCAAAAAAAAAAAAAAAAAAD21gABAAAAANMtSFAgIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEWNwcnQAAAFQAAAAM2Rlc2MAAAGEAAAAbHd0cHQAAAHwAAAAFGJrcHQAAAIEAAAAFHJYWVoAAAIYAAAAFGdYWVoAAAIsAAAAFGJYWVoAAAJAAAAAFGRtbmQAAAJUAAAAcGRtZGQAAALEAAAAiHZ1ZWQAAANMAAAAhnZpZXcAAAPUAAAAJGx1bWkAAAP4AAAAFG1lYXMAAAQMAAAAJHRlY2gAAAQwAAAADHJUUkMAAAQ8AAAIDGdUUkMAAAQ8AAAIDGJUUkMAAAQ8AAAIDHRleHQAAAAAQ29weXJpZ2h0IChjKSAxOTk4IEhld2xldHQtUGFja2FyZCBDb21wYW55AABkZXNjAAAAAAAAABJzUkdCIElFQzYxOTY2LTIuMQAAAAAAAAAAAAAAEnNSR0IgSUVDNjE5NjYtMi4xAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABYWVogAAAAAAAA81EAAQAAAAEWzFhZWiAAAAAAAAAAAAAAAAAAAAAAWFlaIAAAAAAAAG+iAAA49QAAA5BYWVogAAAAAAAAYpkAALeFAAAY2lhZWiAAAAAAAAAkoAAAD4QAALbPZGVzYwAAAAAAAAAWSUVDIGh0dHA6Ly93d3cuaWVjLmNoAAAAAAAAAAAAAAAWSUVDIGh0dHA6Ly93d3cuaWVjLmNoAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAGRlc2MAAAAAAAAALklFQyA2MTk2Ni0yLjEgRGVmYXVsdCBSR0IgY29sb3VyIHNwYWNlIC0gc1JHQgAAAAAAAAAAAAAALklFQyA2MTk2Ni0yLjEgRGVmYXVsdCBSR0IgY29sb3VyIHNwYWNlIC0gc1JHQgAAAAAAAAAAAAAAAAAAAAAAAAAAAABkZXNjAAAAAAAAACxSZWZlcmVuY2UgVmlld2luZyBDb25kaXRpb24gaW4gSUVDNjE5NjYtMi4xAAAAAAAAAAAAAAAsUmVmZXJlbmNlIFZpZXdpbmcgQ29uZGl0aW9uIGluIElFQzYxOTY2LTIuMQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAdmlldwAAAAAAE6T+ABRfLgAQzxQAA+3MAAQTCwADXJ4AAAABWFlaIAAAAAAATAlWAFAAAABXH+dtZWFzAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAACjwAAAAJzaWcgAAAAAENSVCBjdXJ2AAAAAAAABAAAAAAFAAoADwAUABkAHgAjACgALQAyADcAOwBAAEUASgBPAFQAWQBeAGMAaABtAHIAdwB8AIEAhgCLAJAAlQCaAJ8ApACpAK4AsgC3ALwAwQDGAMsA0ADVANsA4ADlAOsA8AD2APsBAQEHAQ0BEwEZAR8BJQErATIBOAE+AUUBTAFSAVkBYAFnAW4BdQF8AYMBiwGSAZoBoQGpAbEBuQHBAckB0QHZAeEB6QHyAfoCAwIMAhQCHQImAi8COAJBAksCVAJdAmcCcQJ6AoQCjgKYAqICrAK2AsECywLVAuAC6wL1AwADCwMWAyEDLQM4A0MDTwNaA2YDcgN+A4oDlgOiA64DugPHA9MD4APsA/kEBgQTBCAELQQ7BEgEVQRjBHEEfgSMBJoEqAS2BMQE0wThBPAE/gUNBRwFKwU6BUkFWAVnBXcFhgWWBaYFtQXFBdUF5QX2BgYGFgYnBjcGSAZZBmoGewaMBp0GrwbABtEG4wb1BwcHGQcrBz0HTwdhB3QHhgeZB6wHvwfSB+UH+AgLCB8IMghGCFoIbgiCCJYIqgi+CNII5wj7CRAJJQk6CU8JZAl5CY8JpAm6Cc8J5Qn7ChEKJwo9ClQKagqBCpgKrgrFCtwK8wsLCyILOQtRC2kLgAuYC7ALyAvhC/kMEgwqDEMMXAx1DI4MpwzADNkM8w0NDSYNQA1aDXQNjg2pDcMN3g34DhMOLg5JDmQOfw6bDrYO0g7uDwkPJQ9BD14Peg+WD7MPzw/sEAkQJhBDEGEQfhCbELkQ1xD1ERMRMRFPEW0RjBGqEckR6BIHEiYSRRJkEoQSoxLDEuMTAxMjE0MTYxODE6QTxRPlFAYUJxRJFGoUixStFM4U8BUSFTQVVhV4FZsVvRXgFgMWJhZJFmwWjxayFtYW+hcdF0EXZReJF64X0hf3GBsYQBhlGIoYrxjVGPoZIBlFGWsZkRm3Gd0aBBoqGlEadxqeGsUa7BsUGzsbYxuKG7Ib2hwCHCocUhx7HKMczBz1HR4dRx1wHZkdwx3sHhYeQB5qHpQevh7pHxMfPh9pH5Qfvx/qIBUgQSBsIJggxCDwIRwhSCF1IaEhziH7IiciVSKCIq8i3SMKIzgjZiOUI8Ij8CQfJE0kfCSrJNolCSU4JWgllyXHJfcmJyZXJocmtyboJxgnSSd6J6sn3CgNKD8ocSiiKNQpBik4KWspnSnQKgIqNSpoKpsqzysCKzYraSudK9EsBSw5LG4soizXLQwtQS12Last4S4WLkwugi63Lu4vJC9aL5Evxy/+MDUwbDCkMNsxEjFKMYIxujHyMioyYzKbMtQzDTNGM38zuDPxNCs0ZTSeNNg1EzVNNYc1wjX9Njc2cjauNuk3JDdgN5w31zgUOFA4jDjIOQU5Qjl/Obw5+To2OnQ6sjrvOy07azuqO+g8JzxlPKQ84z0iPWE9oT3gPiA+YD6gPuA/IT9hP6I/4kAjQGRApkDnQSlBakGsQe5CMEJyQrVC90M6Q31DwEQDREdEikTORRJFVUWaRd5GIkZnRqtG8Ec1R3tHwEgFSEtIkUjXSR1JY0mpSfBKN0p9SsRLDEtTS5pL4kwqTHJMuk0CTUpNk03cTiVObk63TwBPSU+TT91QJ1BxULtRBlFQUZtR5lIxUnxSx1MTU19TqlP2VEJUj1TbVShVdVXCVg9WXFapVvdXRFeSV+BYL1h9WMtZGllpWbhaB1pWWqZa9VtFW5Vb5Vw1XIZc1l0nXXhdyV4aXmxevV8PX2Ffs2AFYFdgqmD8YU9homH1YklinGLwY0Njl2PrZEBklGTpZT1lkmXnZj1mkmboZz1nk2fpaD9olmjsaUNpmmnxakhqn2r3a09rp2v/bFdsr20IbWBtuW4SbmtuxG8eb3hv0XArcIZw4HE6cZVx8HJLcqZzAXNdc7h0FHRwdMx1KHWFdeF2Pnabdvh3VnezeBF4bnjMeSp5iXnnekZ6pXsEe2N7wnwhfIF84X1BfaF+AX5ifsJ/I3+Ef+WAR4CogQqBa4HNgjCCkoL0g1eDuoQdhICE44VHhauGDoZyhteHO4efiASIaYjOiTOJmYn+imSKyoswi5aL/IxjjMqNMY2Yjf+OZo7OjzaPnpAGkG6Q1pE/kaiSEZJ6kuOTTZO2lCCUipT0lV+VyZY0lp+XCpd1l+CYTJi4mSSZkJn8mmia1ZtCm6+cHJyJnPedZJ3SnkCerp8dn4uf+qBpoNihR6G2oiailqMGo3aj5qRWpMelOKWpphqmi6b9p26n4KhSqMSpN6mpqhyqj6sCq3Wr6axcrNCtRK24ri2uoa8Wr4uwALB1sOqxYLHWskuywrM4s660JbSctRO1irYBtnm28Ldot+C4WbjRuUq5wro7urW7LrunvCG8m70VvY++Cr6Evv+/er/1wHDA7MFnwePCX8Lbw1jD1MRRxM7FS8XIxkbGw8dBx7/IPci8yTrJuco4yrfLNsu2zDXMtc01zbXONs62zzfPuNA50LrRPNG+0j/SwdNE08bUSdTL1U7V0dZV1tjXXNfg2GTY6Nls2fHadtr724DcBdyK3RDdlt4c3qLfKd+v4DbgveFE4cziU+Lb42Pj6+Rz5PzlhOYN5pbnH+ep6DLovOlG6dDqW+rl63Dr++yG7RHtnO4o7rTvQO/M8Fjw5fFy8f/yjPMZ86f0NPTC9VD13vZt9vv3ivgZ+Kj5OPnH+lf65/t3/Af8mP0p/br+S/7c/23////uAA5BZG9iZQBkwAAAAAH/2wCEAAYEBAQFBAYFBQYJBgUGCQsIBgYICwwKCgsKCgwQDAwMDAwMEAwODxAPDgwTExQUExMcGxsbHB8fHx8fHx8fHx8BBwcHDQwNGBAQGBoVERUaHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fH//AABEIASwBLAMBEQACEQEDEQH/xACFAAEAAgMBAQEAAAAAAAAAAAAABgcBBAUDAggBAQEBAQAAAAAAAAAAAAAAAAACAwEQAAICAQIDBAYGCQUAAAAAAAABAgMEEQUhEgYxQVFhcYEiQhMUkaGxMlIH0WJygrLCI0MVwZIzYyQRAQEBAQEAAwEBAAAAAAAAAAABAhExIUFREgP/2gAMAwEAAhEDEQA/APyoAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD3w8LMzcmGLh0WZGTa9K6aouc5PyjHVg6n+z/lHZWo3dS5iwk+P+OxuW7KflN/8dXrbfkaTH6zv+n4mm3YuxbRTKjadpxqaprltsyIRyrrYvtVk7U+D8IpIufCL2+uPu/QPSG7808eMtizZe/SnbiSf61TfPD9x6eRNzK7NWIB1J0F1HsEfj5NCyNvb0huOK/i479Mlxg/KaTIubGk1KjhKgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACbdMfllm59VefvVr2va5rmrTjrlXx/6qnppF/jnovDUuY/Ua3+LF2+vbtoxpYmxYq2+iS5bbU+bJtX/bd95/sx0j5Gk+PGV+fXyA1AAe2NmZOLJyoscOZaTj2xkn3Si9YyXkx0R/f+genN7UrsHk2XdXx5Un8la/OK1lS/2dY+SJuZVTdisN72HdtkzXh7njyx7ktYa8YTj3TrmtYzi/FMzs41l655x0AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAANrbNr3DdM2rB2+ieTlXPSuqC1b8/JLvbOydct4tbpvonaOneW/LjXue+R0fM9J4uPL9SL4WzX4n7K7l3mkzxldWu1dfdfbK66bstm9ZTk9W2U4+NTganQ1AagNQBwfV6w83Be3bpjRztvbbVU+E65P36bF7VcvRwfejriturvy9y9oqluW2zln7K37V2i+NQ32RvguzymvZfl2Ges8a531DyFgAAAAAAAAAAAAAAAAAAAAAAAAAAAAHR2HYs/fNyr2/CinZPWVlkuEK64/essl3RijsnXLeLe2nbNs2HBlgbSm3YtMzcJLS7Ifh+pX4QXr1ZrPhjb17ANQGoDUBqA1AagNQGoHpj5NuPZz1PRtOMotJxlF8HGUXwlF96Y6IP1v0NjfL273sVXw6q/a3DbY6v4Kf8Adp73V4r3fR2TrP3F519VXxm0AAAAAAAAAAAAAAAAAAAAAAAAAAAAT78sc+UMfcsGKjH4jqtnJJc8ox1XK5dvKm09PEvFZ7TTUtDOoDUBqA1AagNQGoDUBqBjUD6rzJ4knkwlyupSk9eKcUnzJp9qa4NAUffYrbrLFFQU5OXJFaRWr10S8EYt3mAAAAAAAAAAAAAAAAAAAAAAAAAAACUfl5fyb9KvXhdRZHTzjpP+UrPqd+LH1NGTPMA1AzqA1AagNQGoDUDHMBhsDn9QX/B2HcLNdGqJxT85+x/Mcvjs9VAZNgAAAAAAAAAAAAAAAAAAAAAAAAAAAHd6Iko9T4evf8RfTVI7n1OvFkZ+WsTByMtx51RW7HDXTXl7teJozjg4PX+z5ElDIjPFk/el7cPpjx+o5/SripHRkU31K2iyNtcuycGpJ+tHUvTmOhzANQHMA5gGoHM3PqPaNt1WTkJ2r+zX7c/oXZ6zlvHZLWlsnV+Pu+4SxKcedaUJWKyclxUdOHKl5+Jya6XPHr1nNLpjN8/hJeu2P6Brwz6qwzagAAAAAAAAAAAAAAAAAAAAAAAAAAAO30ZBz6mwku6U5P0Rrk39h3PqdeLG3SmV+0Z9MeM541vKvOMHL+U0rOKeMmzb2/dM/b7vi4l0qpe8l92XlKL4M7K5YsPp3qvG3WKpt0pzkuNfuz074a/YXNdZ3PHd1KcNTganR5ZOVRjUTvyLFXTWtZzl2I4IBv8A1rmZk5UYEpY+J2cy4WT9LXYvJEXTSZRltt6vi32slSV/lxTKW75V2ns040tX5znGK+0rKNpJ1nCU+mctr3HVJ+j4iX+pWvE59VeZtQAAAAAAAAAAAAAAAAAAAAAAAAAAAEn/AC9x/ib5Zc1wxseyevnLStfxlZ9TvxYdFkYWwlNawT9teMXwa+gtmqHd8Ce37plYU09ce2UFr3xT9l+tcTOxrK0zjr6rssqsjZXJwsg1KMlwaa7GgLQ6Y3z/AC2389miyqXyXpd77pfvGkvWWpx19TrgBWvVvUFm5ZkqKpaYWPJqtL35Lg5v/Qi1pmccAlQBYX5fYjo2bJy5JqWZdGEH4wpTb09Mp/UXlnr12d7x/mdj3GnTVvHnOK86tLP5Cr45PVSGTUAAAAAAAAAAAAAAAAAAAAAAAAAAABYnQu2yxNlnmWLlt3GXsa9vwam0n+9PX6C8xnr1IdSkuX1J0rT1BTG/GlGneqYqEIyekMmEfuxcnwjZFcIt8GuByzrs1xWeVi5OJkTx8mqVN9b5bKrE4yi13NMzavICT/l/fKG721a+zbTJtecGmn9pWU6WBzFs2nvORKnaM22HCcKZuLXc2tE/rFdipDJqASPpbo3L3mSyciTw9orel2ZJauT/AAUx9+f1LvKmep1riw+XHrrrx8Wv4OJjwVePVrrywXi++TfGT8S2bNdihNOS5o9k4+MXwkvWgKo37ap7Vu2ThS4xrlrTP8VcvahL1xaM7GsvXPOOgAAAAAAAAAAAAAAAAAAAAAAAAA6vTeyWbxuleNq4Y8F8TLtXuVR+8/S+xeZ2TrlvFnznW2lVBVUwioU1LshXBaRivQjRk+dQ6zqByut9yxpbBOvPpryr3pXhXT4W1y73Ga9pxUfdfA5qu5nyrEzaJX+XuPCW4ZeRKWkqaNIQ727JJa+pJlZTtOdS2bwz8eGTt+XjzlyRtosjzvsT5W0360HYqIyauv0pkbfj77jTz8avKobcVXbryKbXsSkl95KXc+B2Oa8WlkZd98k7Za8i5YQSUYxXhGK0UV6DRlx46h1jUOOJ1ls/+T2pZdMdc7bottLtsxtdZL01t83o18CdRWbxXBDQAAAAAAAAAAAAAAAAAAAAAAAANrbduydxzqcLGUXffLlhzyUI9mrbk+CSSELVn7ZtmFs23/IYclbObU83L00+LNdijrxVcO7x7TSTjK3r21OjOpwNTogPXGZO7d/l9f6eNCMUv1prmk/rRGl5R0lTsdKbjHB3mqU3pVdrTY+5KXY/VLQ7HNRZWpozcbqzcVh7NbFPS3J/o1ryl95/7Sa7mK2IaAFpbFmyy9nxcib1nKHLN+MoNxb+o0jKt7U6GoH1VdZTbG2t6Ti9V3r1rwAhvWXSuPjwnvG2csMKUl8zhtpSonN6ewn96uT7NOzsI1FZv0h5KwAAAAAAAAAAAAAAAAAAAAAAB91W2VWwtrfLZBqUZLua4oCzNn3SrcsGGRDRT+7dD8M12r9BpKzsb2ocZ1AyuLS8Toq3esl5O7Zd/dO2fL6E9F9RnWkaRx0AsTpjfYZ2ByXzSycWOlrb01glwn+kuVnYiPUm8vc9wc4N/LVawoXl3y/eJtXJxyTjoBPehshz2iylv/huenomk/tTLyjSQ6lJNTgxqBBusd5WVkrCplrRjv22uyVnY/8Ab2E6q8xGyVAAAAAAAAAAAAAAAAAAAAAAAAB09h3mza8xWcZY9mkb6/FeK80dlcs6sam6q6qFtUlOuaUoSXY0y2b7Ayno9V3cQKknJynKT7W236zNq+QAH1Gc468snHmWktHpqn3MD5AAAJh0BJ8mdH3U6n6/aRWUaS0pLGoHB6p39YOP8tRL/wBly7V7kH3+l9xy1UiBELYAAAAAAAAAAAAAAAAAAAAAAAAAACQ9LdQ/JWLEyZf+Sx+zJ/25Pv8A2X3nZU2Jyn3riu5lpfdfGyKfY2k/WHFTZFTpyLanwdc5QafjF6GbV5gAAAAAAmfQVTjiZt/4rK4Lw9lSb/iRWUaSjUpxzt73mna8V2S0lfPVU1eL8X5I5aSdV1kZF2TfO+6TnbY+aUn4kNHkAAAAAAAAAAAAAAAAAAAAAAAAAAAABKOmOpVSo4ObP+l2U3P3f1ZeX2FSpsTHm716ikK96rxfl9/y0lpC2Suh6LUp/ayL60njkHHQAAAAALE6Uxvl9gx21pLIlO9+hvkj9UC4i+tjdt3xttxnbc9ZvhVUu2T/AEeLFrkV5uGfk5+VLIyJazl2Luiu5LyIaNYAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkXT/VM8RRxc1ueN2Qs7ZQ/TE7Km5b3WuLDJwsPdcdqyuC+XtnF6pxbc63/ABI7pzKHkrAAAAB7YeJdmZdOLSua2+cYQXnJ6AT7ed8wNnpjjVaW2UwjVRSn7sI8qlLw101Lt4zk6gednZObkSvyJ89kvoS8Eu5ENONcAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAANzD3XLxaL8aLU8XJjyXUT4xfepLwlFrVNDrnGmHQAAAAbe3blkbfbO7G5Y5EoOELWtZQUlpJw8JacNQ5Y1pznOTnOTlKT1lJvVth18gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB/9k=";
            e.DEFAULT_ICON_URL = s;
            class a {
                constructor(t) {
                    this._iconCache = t.reduce(((t, e) => ((0, r.default)(e), t.set(e.id, e), t)), new Map)
                }
                getIconByIdOrThrow(t) {
                    if (this._iconCache.has(t)) return this._iconCache.get(t);
                    throw new Error(`No summoner icon found with id ${t}.`)
                }
                getIconUrlById(t) {
                    try {
                        return this.getIconByIdOrThrow(t).imagePath
                    } catch (t) {
                        return this.getDefaultIconUrl()
                    }
                }
                getDefaultIconUrl() {
                    return s
                }
            }
            e.SummonerIconManager = a
        }, (t, e) => {
            "use strict";
            Object.defineProperty(e, "__esModule", {
                value: !0
            }), e.default = function t(e) {
                const n = Object.getOwnPropertyNames(e);
                for (const i of n) {
                    const n = e[i];
                    n && "object" == typeof n && t(n)
                }
                return Object.freeze(e)
            }
        }],
        e = {};

    function n(i) {
        var o = e[i];
        if (void 0 !== o) return o.exports;
        var r = e[i] = {
            id: i,
            exports: {}
        };
        return t[i].call(r.exports, r, r.exports, n), r.exports
    }
    n.d = (t, e) => {
        for (var i in e) n.o(e, i) && !n.o(t, i) && Object.defineProperty(t, i, {
            enumerable: !0,
            get: e[i]
        })
    }, n.o = (t, e) => Object.prototype.hasOwnProperty.call(t, e), n.r = t => {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(t, Symbol.toStringTag, {
            value: "Module"
        }), Object.defineProperty(t, "__esModule", {
            value: !0
        })
    }, n.p = "/fe/lol-uikit/", (() => {
        "use strict";
        var t = i(n(1)),
            e = i(n(2));

        function i(t) {
            return t && t.__esModule ? t : {
                default: t
            }
        }
        n(3);
        const o = "rcp-fe-lol-uikit",
            r = document.currentScript.ownerDocument;
        const s = window.getPluginAnnounceEventName(o);
        r.addEventListener(s, (function(i) {
            const s = i.registrationHandler;
            e.default.set(r), s((function(e) {
                return t.default.init(e).then((() => t.default.add({
                    Audio: t => t.get("rcp-fe-audio"),
                    componentFactory: t => t.get("rcp-fe-common-libs").getComponentFactory(1),
                    dataBinding: t => t.get("rcp-fe-common-libs").getDataBinding("rcp-fe-lol-uikit"),
                    gsap: t => t.get("rcp-fe-common-libs").getGsap("1"),
                    htmlSanitizer: t => t.get("rcp-fe-common-libs").getHtmlSanitizer(1),
                    jQuery: t => t.get("rcp-fe-common-libs").getJquery(2),
                    tra: t => t.get("rcp-fe-lol-l10n").tra().overlay("/fe/lol-l10n/trans.json"),
                    Lodash: t => t.get("rcp-fe-common-libs").getLodash(4),
                    logger: t => t.get("rcp-fe-common-libs").logging.create(o),
                    Lottie: t => t.get("rcp-fe-common-libs").getLottie(1),
                    playerNames: t => t.get("rcp-fe-common-libs").playerNames,
                    playerNameComponentLogic: t => t.get("rcp-fe-common-libs").playerNameComponentLogic,
                    socket: t => t.getSocket(),
                    webComponents: t => t.get("rcp-fe-common-libs").getWebComponents(r)
                }))).then((() => {
                    const {
                        dataBinding: e,
                        socket: i
                    } = t.default;
                    t.default.gameDataBinding = e("/lol-game-data", i), t.default.gameFlowBinding = e("/lol-gameflow", i);
                    const o = n(4).default;
                    o.registerCustomElements(), o.registerComponents();
                    return n(237).default
                }))
            }))
        }), {
            once: !0
        })
    })()
})();