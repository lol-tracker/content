(() => {
    var e = [, e => {
            "use strict";
            let t;

            function n() {
                return t || (console.error("The `provider` object has not been set, please do so by calling the `init` method."), null)
            }
            const o = {
                init: function(e, n) {
                    return t = e, this.add(n)
                },
                _getValue: function(e, n) {
                    let o;
                    return "function" == typeof n ? (o = n(t), o || console.warn("The function for key " + e + " returned a falsy value: ", o)) : "string" == typeof n ? (o = t.get(n), o || console.warn("The provider `get` invocation for the key " + e + " returned a falsy value: ", o)) : "object" == typeof n && (o = n), o
                },
                add: function(e) {
                    e = e || {};
                    const t = [],
                        n = this;
                    return Object.keys(e).forEach((function(o) {
                        const a = e[o],
                            r = n._getValue(o, a);
                        r && r.then ? (r.then((function(e) {
                            e || console.warn("The promise for the key " + o + " resolved with a falsy value: ", e), n._addValue(o, e)
                        })), t.push(r)) : n._addValue(o, r)
                    })), Promise.all(t)
                },
                _addValue: function(e, t) {
                    this[e] = t
                },
                provider: function() {
                    return console.error("The function `provider` has been deprecated, please use `getProvider`", (new Error).stack), n()
                },
                getProvider: function() {
                    return n()
                }
            };
            e.exports = o
        }, (e, t) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = void 0;
            t.default = class {
                constructor(e) {
                    this._api = e, this.show = this.show.bind(this), this.hide = this.hide.bind(this)
                }
                show() {
                    this._api.show()
                }
                hide() {
                    this._api.hide()
                }
            }
        }, (e, t, n) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = void 0;
            var o, a = n(1),
                r = (o = n(4)) && o.__esModule ? o : {
                    default: o
                };
            t.default = class {
                constructor() {
                    this.settingsBinding = (0, a.dataBinding)("/lol-settings"), this.telemetryBinding = (0, a.dataBinding)("telemetry"), this.isScreenRootBumped = !1, this.application = void 0, this.screenRoot = a.Viewport.main().getScreenRoot("rcp-fe-lol-yourshop"), this.initializeTra()
                }
                initializeTra() {
                    this.tra = (0, a.getProvider)().get("rcp-fe-lol-l10n").tra().overlay("/fe/lol-l10n/trans.json").overlay("/fe/lol-yourshop/trans.json")
                }
                show() {
                    var e;
                    this.application || (this.application = (e = (0, r.default)(a.Ember, this.tra), a.emberApplicationFactory.setFactoryDefinition({
                        name: "rcp-fe-lol-yourshop",
                        tra: e,
                        ComponentFactory: a.componentFactory,
                        RootBaseComponent: n(5),
                        YourshopOfferCardComponent: n(9),
                        YourshopOfferCardContentComponent: n(12),
                        YourshopService: n(15),
                        ErrorLookupService: n(37),
                        TelemetryService: n(38),
                        YourshopHeaderComponent: n(39),
                        YourshopBodyComponent: n(42),
                        YourshopFooterComponent: n(45),
                        RemainingTimeTextComponent: a.SharedEmberComponents.RemainingTimeTextComponent
                    }), a.emberApplicationFactory.setFactoryDefinition({
                        name: "YourshopDetails",
                        tra: e,
                        ComponentFactory: a.componentFactory,
                        RootBaseComponent: n(48)
                    }), a.componentFactory.create("rcp-fe-lol-yourshop"))), this.screenRoot.getElement().appendChild(this.application.domNode), this.isScreenRootBumped || (this.screenRoot.bump(), this.isScreenRootBumped = !0), this.settingsBinding.patch("/v2/account/LCUPreferences/yourshop", {
                        data: {
                            lastViewedTimestamp: (new Date).toISOString()
                        },
                        schemaVersion: 1
                    }), this.sendTelemetryEvent("yourshop_event", {
                        id: "YOURSHOP_SHOW_EVENT"
                    })
                }
                hide() {
                    this.application && (this.application.onRemove(), this.application = null), this.isScreenRootBumped && (this.screenRoot.release(), this.isScreenRootBumped = !1), this.sendTelemetryEvent("yourshop_event", {
                        id: "YOURSHOP_HIDE_EVENT"
                    })
                }
                sendTelemetryEvent(e, t) {
                    t = Object.assign(t, {
                        plugin: "rcp-fe-lol-yourshop"
                    }), this.telemetryBinding.post(`/v1/events/${e}`, t)
                }
            }
        }, e => {
            "use strict";

            function t(e) {
                const n = {};
                for (const o in e) "object" == typeof e[o] ? n[o] = t(e[o]) : n[o] = e[o];
                return n
            }

            function n(e, t, n) {
                const {
                    regions: o,
                    region: a,
                    locale: r
                } = e.metadata();
                if ((n = n.get("metadata." + t)) && "region" === t && n.id !== a.id) {
                    const t = o[n.id],
                        a = t.defaultLocale ? t.defaultLocale.id : t.availableLocales[0].id;
                    e.setLocale(a, n.id)
                } else n && "locale" === t && n.id !== r.id && e.setLocale(n.id)
            }
            e.exports = function(e, o, a) {
                let r;
                const s = {
                    metadata: !0,
                    moment: !0
                };
                return o = o.observe((() => {
                    if (r) {
                        const e = t(o.metadata());
                        r.set("metadata", e), r.beginPropertyChanges(), Object.keys(s).forEach((e => {
                            r.propertyWillChange(e), r.propertyDidChange(e)
                        })), r.endPropertyChanges()
                    }
                })), r = e.Service.extend({
                    _tra: null,
                    init() {
                        this.wrapTra(o)
                    },
                    wrapTra(e) {
                        e && (this._tra = e, this.set("metadata", t(this._tra.metadata())), this.setLocale = this._tra.setLocale.bind(this._tra), this.formatString = this._tra.formatString.bind(this._tra), this.moment = this._tra.moment.bind(this._tra), this.ready = this._tra.ready.bind(this._tra), this.exists = this._tra.exists.bind(this._tra), this.getAsync = this._tra.getAsync.bind(this._tra), this.existsAsync = this._tra.existsAsync.bind(this._tra), this.numeral = this._tra.numeral.bind(this._tra))
                    },
                    unknownProperty(e) {
                        return s[e] = !0, this._tra.get(e)
                    },
                    willDestroy: () => this._tra.unregister(),
                    addOverlays: function(e) {
                        let t = this._tra;
                        for (const n of e) t = t.overlay(n);
                        t && this.wrapTra(t)
                    }
                }).create(), r.set("service", r), r.addObserver("metadata.region", n.bind(null, o, "region")), r.addObserver("metadata.locale", n.bind(null, o, "locale")), a && (console.warning("deprecated: pass a traService as a property of your Ember application definition"), a.register("tra:main", r, {
                    instantiate: !1
                }), a.inject("component", "tra", "tra:main"), a.inject("controller", "tra", "tra:main"), a.inject("view", "tra", "tra:main"), a.inject("model", "tra", "tra:main"), a.inject("route", "tra", "tra:main"), a.inject("service", "tra", "tra:main")), r
            }
        }, (e, t, n) => {
            "use strict";
            var o = n(1);
            n(6), n(7), e.exports = o.Ember.Component.extend({
                classNames: ["yourshop-root"],
                classNameBindings: ["seasonalBackground"],
                layout: n(8),
                yourshop: o.Ember.inject.service(),
                errorLookup: o.Ember.inject.service(),
                offers: o.Ember.computed.readOnly("yourshop.offers"),
                seasonalBackground: o.Ember.computed.readOnly("yourshop.useThemedBackground"),
                isTencentRegion: o.Ember.computed.readOnly("yourshop.isTencentRegion"),
                expirationDate: o.Ember.computed.readOnly("yourshop.status.endTime"),
                playerHasSetPermissions: o.Ember.computed.readOnly("yourshop.playerHasSetPermissions"),
                isDataAuthModalVisible: !1,
                shouldDisplayOffers: o.Ember.computed("offers", "isDataAuthModalVisible", (function() {
                    return !!this.get("offers") && !this.get("isDataAuthModalVisible")
                })),
                notifyModalVisible(e) {
                    this.set("isDataAuthModalVisible", e)
                },
                lessThanSixOffers: o.Ember.computed.lt("offers.length", 6),
                settingsLoaded: o.Ember.computed("isTencentRegion", "playerHasSetPermissions", (function() {
                    return void 0 !== this.get("isTencentRegion") && void 0 !== this.get("playerHasSetPermissions") && (this.get("isTencentRegion") && !1 === this.get("playerHasSetPermissions") ? (this.get("yourshop").showDataAuthModal(this.notifyModalVisible.bind(this)), !1) : (this.get("errorLookup").checkForOffersAndErrors(), !0))
                })),
                didInsertElement: function() {
                    this._super(...arguments)
                },
                actions: {
                    showDataAuthModal() {
                        this.get("yourshop").showDataAuthModal(this.notifyModalVisible.bind(this))
                    }
                }
            })
        }, (e, t, n) => {
            "use strict";
            n.r(t)
        }, (e, t, n) => {
            "use strict";
            n.r(t)
        }, (e, t, n) => {
            const o = n(1).Ember;
            e.exports = o.HTMLBars.template({
                id: "F/yhVJC2",
                block: '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-yourshop\\\\src\\\\app\\\\components\\\\root-component\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-yourshop\\\\src\\\\app\\\\components\\\\root-component\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-yourshop\\\\src\\\\app\\\\components\\\\root-component\\\\index.js\\" "],["text","\\n"],["open-element","div",[]],["static-attr","class","yourshop-content-wrapper"],["flush-element"],["text","\\n"],["block",["if"],[["get",["settingsLoaded"]]],null,1,0],["close-element"],["text","\\n"]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","  "],["append",["helper",["uikit-spinner"],null,[["class","width","height"],["yourshop-spinner-fullpage","80px","80px"]]],false],["text","\\n"]],"locals":[]},{"statements":[["text","  "],["append",["helper",["yourshop-header"],null,[["isTencentRegion","shouldDisplayOffers","lessThanSixOffers"],[["get",["isTencentRegion"]],["get",["shouldDisplayOffers"]],["get",["lessThanSixOffers"]]]]],false],["text","\\n  "],["append",["helper",["yourshop-body"],null,[["isTencentRegion","shouldDisplayOffers","offers"],[["get",["isTencentRegion"]],["get",["shouldDisplayOffers"]],["get",["offers"]]]]],false],["text","\\n  "],["append",["helper",["yourshop-footer"],null,[["isTencentRegion","expirationDate","showDataAuthModal"],[["get",["isTencentRegion"]],["get",["expirationDate"]],["helper",["action"],[["get",[null]],"showDataAuthModal"],null]]]],false],["text","\\n"]],"locals":[]}],"hasPartials":false}',
                meta: {}
            })
        }, (e, t, n) => {
            "use strict";
            var o = n(1);
            n(10), e.exports = o.Ember.Component.extend({
                classNames: ["yourshop-card"],
                layout: n(11),
                notOwned: o.Ember.computed.not("offer.owned"),
                notPurchasing: o.Ember.computed.not("offer.purchasing"),
                shouldShowPricing: o.Ember.computed.and("offer.revealed", "notOwned", "notPurchasing"),
                originalPriceText: o.Ember.computed("offer.originalPrice", "tra.yourshop_original_price_rp", (function() {
                    const e = this.get("offer.originalPrice");
                    if (e) return this.get("tra").formatString("yourshop_original_price_rp", {
                        originalPrice: e
                    })
                })),
                prepopulateOfferData: o.Ember.on("init", (function() {
                    this.get("offer.skin.id")
                }))
            })
        }, (e, t, n) => {
            "use strict";
            n.r(t)
        }, (e, t, n) => {
            const o = n(1).Ember;
            e.exports = o.HTMLBars.template({
                id: "QZZ/Jvrp",
                block: '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-yourshop\\\\src\\\\app\\\\components\\\\yourshop-offer-card\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-yourshop\\\\src\\\\app\\\\components\\\\yourshop-offer-card\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-yourshop\\\\src\\\\app\\\\components\\\\yourshop-offer-card\\\\index.js\\" "],["text","\\n"],["append",["helper",["yourshop-offer-card-content"],null,[["offer"],[["get",["offer"]]]]],false],["text","\\n\\n"],["block",["if"],[["get",["shouldShowPricing"]]],null,1]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","      "],["open-element","div",[]],["static-attr","class","offer-card-pricing-original"],["flush-element"],["append",["unknown",["originalPriceText"]],false],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","  "],["open-element","div",[]],["static-attr","class","offer-card-pricing"],["flush-element"],["text","\\n"],["block",["if"],[["get",["originalPriceText"]]],null,0],["text","    "],["open-element","div",[]],["static-attr","class","offer-card-pricing-discounted"],["flush-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","offer-card-rp-icon"],["flush-element"],["close-element"],["text","\\n      "],["append",["unknown",["offer","discountPrice"]],false],["text","\\n    "],["close-element"],["text","\\n  "],["close-element"],["text","\\n"]],"locals":[]}],"hasPartials":false}',
                meta: {}
            })
        }, (e, t, n) => {
            "use strict";
            var o = n(1);
            n(13), e.exports = o.Ember.Component.extend({
                classNames: ["yourshop-offer-card-content"],
                classNameBindings: ["fadedOut:yourshop-offer-card-content-owned:yourshop-offer-card-content", "offer.purchasing:yourshop-offer-card-content-purchasing"],
                layout: n(14),
                yourshop: o.Ember.inject.service(),
                revealed: o.Ember.computed.or("offer.revealed", "offer.owned"),
                notOwned: o.Ember.computed.not("offer.owned"),
                notPurchasing: o.Ember.computed.not("offer.purchasing"),
                shouldShowPricing: o.Ember.computed.and("revealed", "notOwned", "notPurchasing"),
                onDidInsertElement: o.Ember.on("didInsertElement", (function() {
                    this.$(".offer-card-state-machine")[0].subscribeParameterChanged(((e, t, n) => {
                        "state" === e && this.handleStateChange(n)
                    }))
                })),
                handleStateChange(e) {
                    switch (e) {
                        case "reveal-intro":
                            o.audioPlugin.getChannel("sfx-ui").playSound("/fe/lol-static-assets/sounds/po-sfx-card-activate.ogg");
                            break;
                        case "purchased":
                            o.Ember.run.next((() => {
                                this.set("fadedOut", !0)
                            }))
                    }
                },
                onDidRender: o.Ember.on("didRender", (function() {
                    const e = this.$(".offer-card-state-machine")[0];
                    e.activateState(), e.updateCase()
                })),
                revealingState: null,
                offerRevealedState: o.Ember.computed("revealed", (function() {
                    return this.get("revealed") ? "revealed" : "unrevealed"
                })),
                offerPurchasingState: o.Ember.computed.readOnly("offer.purchasing"),
                offerOwnedState: o.Ember.computed("offer.owned", (function() {
                    return this.get("offer.owned") ? "owned" : "unowned"
                })),
                click: function() {
                    const e = this.get("offer");
                    e && !e.owned && (e.revealed ? this.get("yourshop").showOfferDetails(e) : (this.get("yourshop").reveal(e, (() => {
                        this.set("revealingState", "revealed")
                    })), o.audioPlugin.getChannel("sfx-ui").playSound("/fe/lol-static-assets/sounds/sfx-yourshop-reveal-click.ogg"), this.set("revealingState", "revealing")))
                },
                mouseEnter: function() {
                    o.audioPlugin.getChannel("sfx-ui").playSound("/fe/lol-static-assets/sounds/po-sfx-uikit-button-gold-hover.ogg")
                }
            })
        }, (e, t, n) => {
            "use strict";
            n.r(t)
        }, (e, t, n) => {
            const o = n(1).Ember;
            e.exports = o.HTMLBars.template({
                id: "YEJBFowd",
                block: '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-yourshop\\\\src\\\\app\\\\components\\\\yourshop-offer-card-content\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-yourshop\\\\src\\\\app\\\\components\\\\yourshop-offer-card-content\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-yourshop\\\\src\\\\app\\\\components\\\\yourshop-offer-card-content\\\\index.js\\" "],["text","\\n"],["open-element","uikit-state-machine",[]],["static-attr","class","offer-card-state-machine"],["static-attr","state","none"],["dynamic-attr","offer-revealed-state",["unknown",["offerRevealedState"]],null],["dynamic-attr","revealing-state",["unknown",["revealingState"]],null],["dynamic-attr","offer-owned-state",["unknown",["offerOwnedState"]],null],["dynamic-attr","offer-purchasing-state",["concat",[["unknown",["offerPurchasingState"]]]]],["flush-element"],["text","\\n  "],["open-element","uikit-states",[]],["flush-element"],["text","\\n\\n    "],["open-element","uikit-state",[]],["static-attr","name","none"],["flush-element"],["text","\\n      "],["open-element","uikit-transition",[]],["static-attr","next-state","unrevealed"],["flush-element"],["text","\\n        "],["open-element","uikit-condition-parameter",[]],["static-attr","name","offer-revealed-state"],["static-attr","value","unrevealed"],["flush-element"],["close-element"],["text","\\n      "],["close-element"],["text","\\n      "],["open-element","uikit-transition",[]],["static-attr","next-state","purchased"],["flush-element"],["text","\\n        "],["open-element","uikit-condition-parameter",[]],["static-attr","name","offer-owned-state"],["static-attr","value","owned"],["flush-element"],["close-element"],["text","\\n      "],["close-element"],["text","\\n      "],["open-element","uikit-transition",[]],["static-attr","next-state","purchasing"],["flush-element"],["text","\\n        "],["open-element","uikit-condition-parameter",[]],["static-attr","name","offer-purchasing-state"],["static-attr","value","true"],["flush-element"],["close-element"],["text","\\n      "],["close-element"],["text","\\n      "],["open-element","uikit-transition",[]],["static-attr","next-state","revealed"],["flush-element"],["text","\\n        "],["open-element","uikit-condition-parameter",[]],["static-attr","name","offer-revealed-state"],["static-attr","value","revealed"],["flush-element"],["close-element"],["text","\\n      "],["close-element"],["text","\\n    "],["close-element"],["text","\\n\\n    "],["open-element","uikit-state",[]],["static-attr","name","unrevealed"],["flush-element"],["text","\\n      "],["open-element","uikit-behavior-media",[]],["static-attr","selector",".offer-card-unrevealed-loop-video"],["static-attr","playing",""],["flush-element"],["close-element"],["text","\\n      "],["open-element","uikit-behavior-media",[]],["static-attr","selector",".offer-card-reveal-intro-video"],["static-attr","preloading",""],["flush-element"],["close-element"],["text","\\n      "],["open-element","uikit-transition",[]],["static-attr","next-state","reveal-intro"],["flush-element"],["text","\\n        "],["open-element","uikit-condition-parameter",[]],["static-attr","name","revealing-state"],["static-attr","value","revealing"],["flush-element"],["close-element"],["text","\\n      "],["close-element"],["text","\\n    "],["close-element"],["text","\\n\\n    "],["open-element","uikit-state",[]],["static-attr","name","reveal-intro"],["flush-element"],["text","\\n      "],["open-element","uikit-behavior-media",[]],["static-attr","selector",".offer-card-reveal-intro-video"],["static-attr","playing",""],["flush-element"],["close-element"],["text","\\n      "],["open-element","uikit-behavior-media",[]],["static-attr","selector",".offer-card-reveal-outro-video"],["static-attr","preloading",""],["flush-element"],["close-element"],["text","\\n      "],["open-element","uikit-transition",[]],["static-attr","next-state","reveal-outro-success"],["flush-element"],["text","\\n        "],["open-element","uikit-condition-parameter",[]],["static-attr","name","revealing-state"],["static-attr","value","revealed"],["flush-element"],["close-element"],["text","\\n        "],["open-element","uikit-condition-parameter",[]],["static-attr","name","offer-revealed-state"],["static-attr","value","revealed"],["flush-element"],["close-element"],["text","\\n        "],["open-element","uikit-condition-media",[]],["static-attr","selector",".offer-card-reveal-intro-video"],["static-attr","ended",""],["flush-element"],["close-element"],["text","\\n      "],["close-element"],["text","\\n      "],["open-element","uikit-transition",[]],["static-attr","next-state","reveal-outro-failure"],["flush-element"],["text","\\n        "],["open-element","uikit-condition-parameter",[]],["static-attr","name","revealing-state"],["static-attr","value","revealed"],["flush-element"],["close-element"],["text","\\n        "],["open-element","uikit-condition-parameter",[]],["static-attr","name","offer-revealed-state"],["static-attr","value","unrevealed"],["flush-element"],["close-element"],["text","\\n        "],["open-element","uikit-condition-media",[]],["static-attr","selector",".offer-card-reveal-intro-video"],["static-attr","ended",""],["flush-element"],["close-element"],["text","\\n      "],["close-element"],["text","\\n    "],["close-element"],["text","\\n\\n    "],["open-element","uikit-state",[]],["static-attr","name","reveal-outro-success"],["flush-element"],["text","\\n      "],["open-element","uikit-behavior-media",[]],["static-attr","selector",".offer-card-reveal-outro-video"],["static-attr","playing",""],["flush-element"],["close-element"],["text","\\n      "],["open-element","uikit-transition",[]],["static-attr","next-state","revealed"],["flush-element"],["text","\\n        "],["open-element","uikit-condition-media",[]],["static-attr","selector",".offer-card-reveal-outro-video"],["static-attr","ended",""],["flush-element"],["close-element"],["text","\\n      "],["close-element"],["text","\\n    "],["close-element"],["text","\\n\\n    "],["open-element","uikit-state",[]],["static-attr","name","reveal-outro-failure"],["flush-element"],["text","\\n      "],["open-element","uikit-behavior-media",[]],["static-attr","selector",".offer-card-reveal-outro-video"],["static-attr","playing",""],["flush-element"],["close-element"],["text","\\n      "],["open-element","uikit-transition",[]],["static-attr","next-state","unrevealed"],["flush-element"],["text","\\n        "],["open-element","uikit-condition-media",[]],["static-attr","selector",".offer-card-reveal-outro-video"],["static-attr","ended",""],["flush-element"],["close-element"],["text","\\n      "],["close-element"],["text","\\n    "],["close-element"],["text","\\n\\n    "],["open-element","uikit-state",[]],["static-attr","name","revealed"],["flush-element"],["text","\\n      "],["open-element","uikit-transition",[]],["static-attr","next-state","purchasing"],["flush-element"],["text","\\n        "],["open-element","uikit-condition-parameter",[]],["static-attr","name","offer-purchasing-state"],["static-attr","value","true"],["flush-element"],["close-element"],["text","\\n      "],["close-element"],["text","\\n    "],["close-element"],["text","\\n\\n    "],["open-element","uikit-state",[]],["static-attr","name","purchasing"],["flush-element"],["text","\\n      "],["open-element","uikit-transition",[]],["static-attr","next-state","purchased"],["flush-element"],["text","\\n        "],["open-element","uikit-condition-parameter",[]],["static-attr","name","offer-owned-state"],["static-attr","value","owned"],["flush-element"],["close-element"],["text","\\n      "],["close-element"],["text","\\n    "],["close-element"],["text","\\n\\n    "],["open-element","uikit-state",[]],["static-attr","name","purchased"],["flush-element"],["close-element"],["text","\\n  "],["close-element"],["text","\\n\\n  "],["open-element","div",[]],["static-attr","class","offer-card-unrevealed-container"],["static-attr","visible-state","unrevealed,reveal-outro-failure"],["flush-element"],["text","\\n    "],["open-element","uikit-video",[]],["static-attr","class","offer-card-unrevealed-loop-video"],["static-attr","src","/fe/lol-static-assets/videos/po-unrevealed-loop.webm"],["static-attr","cache-name","rcp-fe-lol-yourshop"],["static-attr","loop",""],["flush-element"],["close-element"],["text","\\n    "],["open-element","img",[]],["static-attr","src","/fe/lol-static-assets/images/po-unrevealed-back-card.png"],["static-attr","class","offer-card-frame-image"],["flush-element"],["close-element"],["text","\\n  "],["close-element"],["text","\\n\\n  "],["open-element","div",[]],["static-attr","class","offer-card-revealed"],["static-attr","visible-state","revealed,purchasing,purchased,reveal-outro-success"],["flush-element"],["text","\\n    "],["open-element","img",[]],["static-attr","class","offer-card-skin-tile"],["dynamic-attr","src",["unknown",["offer","skin","splashPath"]],null],["flush-element"],["close-element"],["text","\\n"],["block",["if"],[["get",["offer","bundledChampion"]]],null,7,6],["block",["if"],[["get",["shouldShowPricing"]]],null,5],["text","  "],["close-element"],["text","\\n\\n  "],["open-element","uikit-video",[]],["static-attr","class","offer-card-reveal-intro-video"],["static-attr","visible-state","reveal-intro"],["static-attr","src","/fe/lol-static-assets/videos/po-reveal-intro.webm"],["static-attr","cache-name","rcp-fe-lol-yourshop"],["flush-element"],["close-element"],["text","\\n\\n  "],["open-element","uikit-video",[]],["static-attr","class","offer-card-reveal-outro-video"],["static-attr","visible-state","reveal-outro-failure,reveal-outro-success"],["static-attr","src","/fe/lol-static-assets/videos/po-reveal-outro.webm"],["static-attr","cache-name","rcp-fe-lol-yourshop"],["flush-element"],["close-element"],["text","\\n\\n\\n"],["block",["if"],[["get",["offer","owned"]]],null,3],["text","\\n"],["block",["if"],[["get",["offer","purchasing"]]],null,2],["text","\\n"],["block",["if"],[["get",["offer","legacy"]]],null,1],["text","\\n"],["block",["if"],[["get",["offer","rarity"]]],null,0],["close-element"],["text","\\n"]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","    "],["open-element","img",[]],["static-attr","class","offer-card-rarity-gem"],["static-attr","visible-state","reveal-outro-success,revealed,purchased,purchasing"],["dynamic-attr","src",["unknown",["offer","rarityGemPath"]],null],["flush-element"],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","    "],["open-element","div",[]],["static-attr","class","offer-card-legacy-emblem"],["static-attr","visible-state","reveal-outro-success,revealed,purchased,purchasing"],["flush-element"],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","    "],["open-element","div",[]],["static-attr","class","offer-card-purchasing"],["static-attr","visible-state","purchasing"],["flush-element"],["append",["helper",["uikit-spinner"],null,[["width","height"],["20px","20px"]]],false],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","    "],["open-element","div",[]],["static-attr","class","offer-card-owned-text"],["static-attr","visible-state","reveal-outro-success,revealed,purchased"],["flush-element"],["append",["unknown",["tra","yourshop_owned"]],false],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","          "],["open-element","div",[]],["static-attr","class","offer-card-discount"],["flush-element"],["append",["unknown",["offer","discountPercentageText"]],false],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["block",["if"],[["get",["offer","discountPercentageText"]]],null,4]],"locals":[]},{"statements":[["text","      "],["open-element","img",[]],["static-attr","src","/fe/lol-static-assets/images/po-offer-card-front.png"],["static-attr","class","offer-card-frame-image"],["flush-element"],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","      "],["open-element","img",[]],["static-attr","class","offer-card-champion-icon"],["dynamic-attr","src",["unknown",["offer","champion","squarePortraitPath"]],null],["flush-element"],["close-element"],["text","\\n      "],["open-element","img",[]],["static-attr","src","/fe/lol-static-assets/images/po-offer-card-front-bundle.png"],["static-attr","class","offer-card-frame-image"],["flush-element"],["close-element"],["text","\\n"]],"locals":[]}],"hasPartials":false}',
                meta: {}
            })
        }, (e, t, n) => {
            "use strict";
            var o, a = n(1),
                r = (o = n(16)) && o.__esModule ? o : {
                    default: o
                };
            const s = n(17),
                i = (0, a.emberDataBinding)({
                    Ember: a.Ember,
                    websocket: a.socket,
                    logPrefix: "yourshop-service",
                    boundProperties: {
                        walletRP: "/lol-inventory/v1/wallet/RP",
                        offers: {
                            path: "/lol-yourshop/v1/offers",
                            objectTypes: {
                                "[]": r.default
                            }
                        },
                        useThemedBackground: "/lol-yourshop/v1/themed",
                        status: "/lol-yourshop/v1/status",
                        isTencentRegion: "/lol-yourshop/v1/modal",
                        playerHasSetPermissions: "/lol-yourshop/v1/has-permissions"
                    }
                }),
                l = a.lolUikitPlugin.getModalManager();
            e.exports = a.Ember.Service.extend(i, {
                telemetry: a.Ember.inject.service(),
                willDestroy() {
                    this._super(...arguments);
                    const e = this.get("offers");
                    e && e.length && e.forEach((e => {
                        e.destroy()
                    }))
                },
                reveal: function(e, t) {
                    e && !e.revealed && (0, a.dataBinding)("/lol-yourshop").post(`/v1/offers/${e.id}/reveal`).then((() => {
                        this.get("telemetry").sendOfferEvent({
                            action: "reveal",
                            offer: e
                        }), t && t(!0)
                    })).catch((() => {
                        this.get("telemetry").sendOfferEvent({
                            action: "reveal_error",
                            offer: e
                        }), t && t(!1)
                    }))
                },
                showOfferDetails: function(e) {
                    const t = l.add({
                        type: "YourshopDetails",
                        data: {
                            yourshop: this,
                            offer: e
                        },
                        ComponentFactory: a.componentFactory
                    });
                    t.domNode.addEventListener("closeButtonClick", (function() {
                        l.remove(t)
                    })), this.get("telemetry").sendOfferEvent({
                        action: "show_offer_details",
                        offer: e
                    })
                },
                dataAuthModalHelper(e) {
                    const t = {
                            title: this.get("tra.yourshop_tencent_data_usage_modal_title"),
                            paragraphOne: this.get("tra.yourshop_tencent_data_usage_modal_text_1"),
                            paragraphTwo: this.get("tra.yourshop_tencent_data_usage_modal_text_2"),
                            dataUsageLink: this.get("tra.yourshop_tencent_data_usage_modal_link"),
                            dataUsageLinkText: this.get("tra.yourshop_tencent_data_usage_modal_link_text")
                        },
                        n = document.createElement("div");
                    return n.innerHTML = e(t), n
                },
                setDataUsage(e) {
                    const t = {
                        useData: e
                    };
                    return (0, a.dataBinding)("/lol-yourshop/v1").post("/permissions", t)
                },
                showDataAuthModal: function(e) {
                    (0, a.dataBinding)("/lol-yourshop").get("/v1/modal").then((t => {
                        if (t) {
                            const t = this.dataAuthModalHelper(s),
                                n = this.get("tra.yourshop_tencent_data_usage_modal_accept_button"),
                                o = this.get("tra.yourshop_tencent_data_usage_modal_reject_button"),
                                a = () => {
                                    this.setDataUsage("PERMITTED").finally((() => {
                                        e(!1)
                                    }))
                                },
                                r = () => {
                                    this.setDataUsage("DENIED").finally((() => {
                                        e(!1)
                                    }))
                                };
                            l.add({
                                type: "DialogConfirm",
                                data: {
                                    contents: t,
                                    acceptText: n,
                                    declineText: o,
                                    onAccept: a,
                                    onDecline: r
                                }
                            }), e(!0)
                        }
                    }))
                }
            })
        }, (e, t, n) => {
            "use strict";
            var o = n(1);
            const a = (0, o.emberDataBinding)({
                    Ember: o.Ember,
                    websocket: o.socket,
                    logPrefix: "yourshop-offer-entity",
                    boundProperties: {
                        regionLocale: "/riotclient/region-locale",
                        champion: "/lol-game-data/assets/v1/champions/{{championId}}.json"
                    }
                }),
                r = {
                    kEpic: s("epic", "epic"),
                    kLegendary: s("legendary", "legendary"),
                    kMythic: s("mythic", "mythic"),
                    kUltimate: s("ultimate", "ultimate"),
                    1: s("cn-gem-1", "cn_rarity_1"),
                    2: s("cn-gem-2", "cn_rarity_2"),
                    3: s("cn-gem-3", "cn_rarity_3"),
                    4: s("cn-gem-4", "cn_rarity_4"),
                    5: s("cn-gem-5", "cn_rarity_5"),
                    6: s("cn-gem-6", "cn_rarity_6"),
                    7: s("cn-gem-7", "cn_rarity_7"),
                    8: s("cn-gem-8", "cn_rarity_8"),
                    9: s("cn-gem-9", "cn_rarity_9")
                };

            function s(e, t) {
                return {
                    gemIcon: e,
                    traKey: t
                }
            }
            e.exports = o.Ember.Object.extend(a, {
                skin: o.Ember.computed("champion.skins.@each.id", "skinId", (function() {
                    const e = this.get("champion.skins");
                    if (e) {
                        const t = this.get("skinId");
                        return e.find((e => e.id === t))
                    }
                })),
                discountPercentage: o.Ember.computed("originalPrice", "discountPrice", (function() {
                    const e = this.get("originalPrice"),
                        t = this.get("discountPrice");
                    if (!e || !t) return "";
                    let n = (t - e) / e;
                    return n = Math.round(100 * n), Math.abs(n)
                })),
                discountPercentageText: o.Ember.computed("discountPercentage", "root.tra.yourshop_discount_percentage", (function() {
                    const e = this.get("discountPercentage");
                    if (e) return this.get("root.tra").formatString("yourshop_discount_percentage", {
                        discountPercentage: e
                    })
                })),
                legacy: o.Ember.computed("skin.isLegacy", "isTencent", (function() {
                    return this.get("skin.isLegacy") && !this.get("isTencent")
                })),
                isTencent: o.Ember.computed("regionLocale", (function() {
                    return this.get("regionLocale") && "TENCENT" === this.get("regionLocale").region
                })),
                rarityId: o.Ember.computed("isTencent", "skin.regionRarityId", "skin.rarity", (function() {
                    return this.get("isTencent") ? this.get("skin.regionRarityId") : this.get("skin.rarity")
                })),
                rarity: o.Ember.computed("rarityId", (function() {
                    return r[this.get("rarityId")]
                })),
                rarityGemPath: o.Ember.computed("rarity", (function() {
                    const e = this.get("rarity");
                    if (e) return `/lol-game-data/assets/v1/rarity-gem-icons/${e.gemIcon}.png`
                })),
                bundledChampion: o.Ember.computed.equal("type", "SkinWithChampion")
            })
        }, (e, t, n) => {
            var o = n(18);
            e.exports = (o.default || o).template({
                compiler: [7, ">= 4.0.0"],
                main: function(e, t, n, o, a) {
                    var r, s = null != t ? t : e.nullContext || {},
                        i = n.helperMissing,
                        l = "function",
                        c = e.escapeExpression;
                    return '<div class="data-auth-selection-contents">\r\n  <div class="data-auth-modal-title">' + c(typeof(r = null != (r = n.title || (null != t ? t.title : t)) ? r : i) === l ? r.call(s, {
                        name: "title",
                        hash: {},
                        data: a
                    }) : r) + '</div>\r\n\r\n  <div class="data-auth-paragraph-one">\r\n    ' + c(typeof(r = null != (r = n.paragraphOne || (null != t ? t.paragraphOne : t)) ? r : i) === l ? r.call(s, {
                        name: "paragraphOne",
                        hash: {},
                        data: a
                    }) : r) + '\r\n  </div>\r\n  <hr class="data-auth-modal-line" />\r\n  <div class="data-auth-more-info-section">\r\n    <img src="/fe/lol-static-assets/images/i-info-icon-in-rhombus.svg" />\r\n    <div class="data-auth-paragraph-two">\r\n      ' + c(typeof(r = null != (r = n.paragraphTwo || (null != t ? t.paragraphTwo : t)) ? r : i) === l ? r.call(s, {
                        name: "paragraphTwo",
                        hash: {},
                        data: a
                    }) : r) + "\r\n    </div>\r\n  </div>\r\n\r\n  <a href=" + c(typeof(r = null != (r = n.dataUsageLink || (null != t ? t.dataUsageLink : t)) ? r : i) === l ? r.call(s, {
                        name: "dataUsageLink",
                        hash: {},
                        data: a
                    }) : r) + ' class="data-auth-link" target="_blank">\r\n    ' + c(typeof(r = null != (r = n.dataUsageLinkText || (null != t ? t.dataUsageLinkText : t)) ? r : i) === l ? r.call(s, {
                        name: "dataUsageLinkText",
                        hash: {},
                        data: a
                    }) : r) + "</a>\r\n</div>"
                },
                useData: !0
            })
        }, (e, t, n) => {
            e.exports = n(19).default
        }, (e, t, n) => {
            "use strict";

            function o(e) {
                return e && e.__esModule ? e : {
                    default: e
                }
            }

            function a(e) {
                if (e && e.__esModule) return e;
                var t = {};
                if (null != e)
                    for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
                return t.default = e, t
            }
            t.__esModule = !0;
            var r = a(n(20)),
                s = o(n(34)),
                i = o(n(22)),
                l = a(n(21)),
                c = a(n(35)),
                u = o(n(36));

            function p() {
                var e = new r.HandlebarsEnvironment;
                return l.extend(e, r), e.SafeString = s.default, e.Exception = i.default, e.Utils = l, e.escapeExpression = l.escapeExpression, e.VM = c, e.template = function(t) {
                    return c.template(t, e)
                }, e
            }
            var d = p();
            d.create = p, u.default(d), d.default = d, t.default = d, e.exports = t.default
        }, (e, t, n) => {
            "use strict";

            function o(e) {
                return e && e.__esModule ? e : {
                    default: e
                }
            }
            t.__esModule = !0, t.HandlebarsEnvironment = u;
            var a = n(21),
                r = o(n(22)),
                s = n(23),
                i = n(31),
                l = o(n(33));
            t.VERSION = "4.1.2";
            t.COMPILER_REVISION = 7;
            t.REVISION_CHANGES = {
                1: "<= 1.0.rc.2",
                2: "== 1.0.0-rc.3",
                3: "== 1.0.0-rc.4",
                4: "== 1.x.x",
                5: "== 2.0.0-alpha.x",
                6: ">= 2.0.0-beta.1",
                7: ">= 4.0.0"
            };
            var c = "[object Object]";

            function u(e, t, n) {
                this.helpers = e || {}, this.partials = t || {}, this.decorators = n || {}, s.registerDefaultHelpers(this), i.registerDefaultDecorators(this)
            }
            u.prototype = {
                constructor: u,
                logger: l.default,
                log: l.default.log,
                registerHelper: function(e, t) {
                    if (a.toString.call(e) === c) {
                        if (t) throw new r.default("Arg not supported with multiple helpers");
                        a.extend(this.helpers, e)
                    } else this.helpers[e] = t
                },
                unregisterHelper: function(e) {
                    delete this.helpers[e]
                },
                registerPartial: function(e, t) {
                    if (a.toString.call(e) === c) a.extend(this.partials, e);
                    else {
                        if (void 0 === t) throw new r.default('Attempting to register a partial called "' + e + '" as undefined');
                        this.partials[e] = t
                    }
                },
                unregisterPartial: function(e) {
                    delete this.partials[e]
                },
                registerDecorator: function(e, t) {
                    if (a.toString.call(e) === c) {
                        if (t) throw new r.default("Arg not supported with multiple decorators");
                        a.extend(this.decorators, e)
                    } else this.decorators[e] = t
                },
                unregisterDecorator: function(e) {
                    delete this.decorators[e]
                }
            };
            var p = l.default.log;
            t.log = p, t.createFrame = a.createFrame, t.logger = l.default
        }, (e, t) => {
            "use strict";
            t.__esModule = !0, t.extend = s, t.indexOf = function(e, t) {
                for (var n = 0, o = e.length; n < o; n++)
                    if (e[n] === t) return n;
                return -1
            }, t.escapeExpression = function(e) {
                if ("string" != typeof e) {
                    if (e && e.toHTML) return e.toHTML();
                    if (null == e) return "";
                    if (!e) return e + "";
                    e = "" + e
                }
                if (!a.test(e)) return e;
                return e.replace(o, r)
            }, t.isEmpty = function(e) {
                return !e && 0 !== e || !(!c(e) || 0 !== e.length)
            }, t.createFrame = function(e) {
                var t = s({}, e);
                return t._parent = e, t
            }, t.blockParams = function(e, t) {
                return e.path = t, e
            }, t.appendContextPath = function(e, t) {
                return (e ? e + "." : "") + t
            };
            var n = {
                    "&": "&amp;",
                    "<": "&lt;",
                    ">": "&gt;",
                    '"': "&quot;",
                    "'": "&#x27;",
                    "`": "&#x60;",
                    "=": "&#x3D;"
                },
                o = /[&<>"'`=]/g,
                a = /[&<>"'`=]/;

            function r(e) {
                return n[e]
            }

            function s(e) {
                for (var t = 1; t < arguments.length; t++)
                    for (var n in arguments[t]) Object.prototype.hasOwnProperty.call(arguments[t], n) && (e[n] = arguments[t][n]);
                return e
            }
            var i = Object.prototype.toString;
            t.toString = i;
            var l = function(e) {
                return "function" == typeof e
            };
            l(/x/) && (t.isFunction = l = function(e) {
                return "function" == typeof e && "[object Function]" === i.call(e)
            }), t.isFunction = l;
            var c = Array.isArray || function(e) {
                return !(!e || "object" != typeof e) && "[object Array]" === i.call(e)
            };
            t.isArray = c
        }, (e, t) => {
            "use strict";
            t.__esModule = !0;
            var n = ["description", "fileName", "lineNumber", "message", "name", "number", "stack"];

            function o(e, t) {
                var a = t && t.loc,
                    r = void 0,
                    s = void 0;
                a && (e += " - " + (r = a.start.line) + ":" + (s = a.start.column));
                for (var i = Error.prototype.constructor.call(this, e), l = 0; l < n.length; l++) this[n[l]] = i[n[l]];
                Error.captureStackTrace && Error.captureStackTrace(this, o);
                try {
                    a && (this.lineNumber = r, Object.defineProperty ? Object.defineProperty(this, "column", {
                        value: s,
                        enumerable: !0
                    }) : this.column = s)
                } catch (e) {}
            }
            o.prototype = new Error, t.default = o, e.exports = t.default
        }, (e, t, n) => {
            "use strict";

            function o(e) {
                return e && e.__esModule ? e : {
                    default: e
                }
            }
            t.__esModule = !0, t.registerDefaultHelpers = function(e) {
                a.default(e), r.default(e), s.default(e), i.default(e), l.default(e), c.default(e), u.default(e)
            };
            var a = o(n(24)),
                r = o(n(25)),
                s = o(n(26)),
                i = o(n(27)),
                l = o(n(28)),
                c = o(n(29)),
                u = o(n(30))
        }, (e, t, n) => {
            "use strict";
            t.__esModule = !0;
            var o = n(21);
            t.default = function(e) {
                e.registerHelper("blockHelperMissing", (function(t, n) {
                    var a = n.inverse,
                        r = n.fn;
                    if (!0 === t) return r(this);
                    if (!1 === t || null == t) return a(this);
                    if (o.isArray(t)) return t.length > 0 ? (n.ids && (n.ids = [n.name]), e.helpers.each(t, n)) : a(this);
                    if (n.data && n.ids) {
                        var s = o.createFrame(n.data);
                        s.contextPath = o.appendContextPath(n.data.contextPath, n.name), n = {
                            data: s
                        }
                    }
                    return r(t, n)
                }))
            }, e.exports = t.default
        }, (e, t, n) => {
            "use strict";
            t.__esModule = !0;
            var o, a = n(21),
                r = n(22),
                s = (o = r) && o.__esModule ? o : {
                    default: o
                };
            t.default = function(e) {
                e.registerHelper("each", (function(e, t) {
                    if (!t) throw new s.default("Must pass iterator to #each");
                    var n = t.fn,
                        o = t.inverse,
                        r = 0,
                        i = "",
                        l = void 0,
                        c = void 0;

                    function u(t, o, r) {
                        l && (l.key = t, l.index = o, l.first = 0 === o, l.last = !!r, c && (l.contextPath = c + t)), i += n(e[t], {
                            data: l,
                            blockParams: a.blockParams([e[t], t], [c + t, null])
                        })
                    }
                    if (t.data && t.ids && (c = a.appendContextPath(t.data.contextPath, t.ids[0]) + "."), a.isFunction(e) && (e = e.call(this)), t.data && (l = a.createFrame(t.data)), e && "object" == typeof e)
                        if (a.isArray(e))
                            for (var p = e.length; r < p; r++) r in e && u(r, r, r === e.length - 1);
                        else {
                            var d = void 0;
                            for (var f in e) e.hasOwnProperty(f) && (void 0 !== d && u(d, r - 1), d = f, r++);
                            void 0 !== d && u(d, r - 1, !0)
                        } return 0 === r && (i = o(this)), i
                }))
            }, e.exports = t.default
        }, (e, t, n) => {
            "use strict";
            t.__esModule = !0;
            var o, a = n(22),
                r = (o = a) && o.__esModule ? o : {
                    default: o
                };
            t.default = function(e) {
                e.registerHelper("helperMissing", (function() {
                    if (1 !== arguments.length) throw new r.default('Missing helper: "' + arguments[arguments.length - 1].name + '"')
                }))
            }, e.exports = t.default
        }, (e, t, n) => {
            "use strict";
            t.__esModule = !0;
            var o = n(21);
            t.default = function(e) {
                e.registerHelper("if", (function(e, t) {
                    return o.isFunction(e) && (e = e.call(this)), !t.hash.includeZero && !e || o.isEmpty(e) ? t.inverse(this) : t.fn(this)
                })), e.registerHelper("unless", (function(t, n) {
                    return e.helpers.if.call(this, t, {
                        fn: n.inverse,
                        inverse: n.fn,
                        hash: n.hash
                    })
                }))
            }, e.exports = t.default
        }, (e, t) => {
            "use strict";
            t.__esModule = !0, t.default = function(e) {
                e.registerHelper("log", (function() {
                    for (var t = [void 0], n = arguments[arguments.length - 1], o = 0; o < arguments.length - 1; o++) t.push(arguments[o]);
                    var a = 1;
                    null != n.hash.level ? a = n.hash.level : n.data && null != n.data.level && (a = n.data.level), t[0] = a, e.log.apply(e, t)
                }))
            }, e.exports = t.default
        }, (e, t) => {
            "use strict";
            t.__esModule = !0, t.default = function(e) {
                e.registerHelper("lookup", (function(e, t) {
                    return e ? "constructor" !== t || e.propertyIsEnumerable(t) ? e[t] : void 0 : e
                }))
            }, e.exports = t.default
        }, (e, t, n) => {
            "use strict";
            t.__esModule = !0;
            var o = n(21);
            t.default = function(e) {
                e.registerHelper("with", (function(e, t) {
                    o.isFunction(e) && (e = e.call(this));
                    var n = t.fn;
                    if (o.isEmpty(e)) return t.inverse(this);
                    var a = t.data;
                    return t.data && t.ids && ((a = o.createFrame(t.data)).contextPath = o.appendContextPath(t.data.contextPath, t.ids[0])), n(e, {
                        data: a,
                        blockParams: o.blockParams([e], [a && a.contextPath])
                    })
                }))
            }, e.exports = t.default
        }, (e, t, n) => {
            "use strict";
            t.__esModule = !0, t.registerDefaultDecorators = function(e) {
                r.default(e)
            };
            var o, a = n(32),
                r = (o = a) && o.__esModule ? o : {
                    default: o
                }
        }, (e, t, n) => {
            "use strict";
            t.__esModule = !0;
            var o = n(21);
            t.default = function(e) {
                e.registerDecorator("inline", (function(e, t, n, a) {
                    var r = e;
                    return t.partials || (t.partials = {}, r = function(a, r) {
                        var s = n.partials;
                        n.partials = o.extend({}, s, t.partials);
                        var i = e(a, r);
                        return n.partials = s, i
                    }), t.partials[a.args[0]] = a.fn, r
                }))
            }, e.exports = t.default
        }, (e, t, n) => {
            "use strict";
            t.__esModule = !0;
            var o = n(21),
                a = {
                    methodMap: ["debug", "info", "warn", "error"],
                    level: "info",
                    lookupLevel: function(e) {
                        if ("string" == typeof e) {
                            var t = o.indexOf(a.methodMap, e.toLowerCase());
                            e = t >= 0 ? t : parseInt(e, 10)
                        }
                        return e
                    },
                    log: function(e) {
                        if (e = a.lookupLevel(e), "undefined" != typeof console && a.lookupLevel(a.level) <= e) {
                            var t = a.methodMap[e];
                            console[t] || (t = "log");
                            for (var n = arguments.length, o = Array(n > 1 ? n - 1 : 0), r = 1; r < n; r++) o[r - 1] = arguments[r];
                            console[t].apply(console, o)
                        }
                    }
                };
            t.default = a, e.exports = t.default
        }, (e, t) => {
            "use strict";

            function n(e) {
                this.string = e
            }
            t.__esModule = !0, n.prototype.toString = n.prototype.toHTML = function() {
                return "" + this.string
            }, t.default = n, e.exports = t.default
        }, (e, t, n) => {
            "use strict";
            t.__esModule = !0, t.checkRevision = function(e) {
                var t = e && e[0] || 1,
                    n = i.COMPILER_REVISION;
                if (t !== n) {
                    if (t < n) {
                        var o = i.REVISION_CHANGES[n],
                            a = i.REVISION_CHANGES[t];
                        throw new s.default("Template was precompiled with an older version of Handlebars than the current runtime. Please update your precompiler to a newer version (" + o + ") or downgrade your runtime to an older version (" + a + ").")
                    }
                    throw new s.default("Template was precompiled with a newer version of Handlebars than the current runtime. Please update your runtime to a newer version (" + e[1] + ").")
                }
            }, t.template = function(e, t) {
                if (!t) throw new s.default("No environment passed to template");
                if (!e || !e.main) throw new s.default("Unknown template object: " + typeof e);
                e.main.decorator = e.main_d, t.VM.checkRevision(e.compiler);
                var n = {
                    strict: function(e, t) {
                        if (!(t in e)) throw new s.default('"' + t + '" not defined in ' + e);
                        return e[t]
                    },
                    lookup: function(e, t) {
                        for (var n = e.length, o = 0; o < n; o++)
                            if (e[o] && null != e[o][t]) return e[o][t]
                    },
                    lambda: function(e, t) {
                        return "function" == typeof e ? e.call(t) : e
                    },
                    escapeExpression: a.escapeExpression,
                    invokePartial: function(n, o, r) {
                        r.hash && (o = a.extend({}, o, r.hash), r.ids && (r.ids[0] = !0)), n = t.VM.resolvePartial.call(this, n, o, r);
                        var i = t.VM.invokePartial.call(this, n, o, r);
                        if (null == i && t.compile && (r.partials[r.name] = t.compile(n, e.compilerOptions, t), i = r.partials[r.name](o, r)), null != i) {
                            if (r.indent) {
                                for (var l = i.split("\n"), c = 0, u = l.length; c < u && (l[c] || c + 1 !== u); c++) l[c] = r.indent + l[c];
                                i = l.join("\n")
                            }
                            return i
                        }
                        throw new s.default("The partial " + r.name + " could not be compiled when running in runtime-only mode")
                    },
                    fn: function(t) {
                        var n = e[t];
                        return n.decorator = e[t + "_d"], n
                    },
                    programs: [],
                    program: function(e, t, n, o, a) {
                        var r = this.programs[e],
                            s = this.fn(e);
                        return t || a || o || n ? r = l(this, e, s, t, n, o, a) : r || (r = this.programs[e] = l(this, e, s)), r
                    },
                    data: function(e, t) {
                        for (; e && t--;) e = e._parent;
                        return e
                    },
                    merge: function(e, t) {
                        var n = e || t;
                        return e && t && e !== t && (n = a.extend({}, t, e)), n
                    },
                    nullContext: Object.seal({}),
                    noop: t.VM.noop,
                    compilerInfo: e.compiler
                };

                function o(t) {
                    var a = arguments.length <= 1 || void 0 === arguments[1] ? {} : arguments[1],
                        r = a.data;
                    o._setup(a), !a.partial && e.useData && (r = function(e, t) {
                        t && "root" in t || ((t = t ? i.createFrame(t) : {}).root = e);
                        return t
                    }(t, r));
                    var s = void 0,
                        l = e.useBlockParams ? [] : void 0;

                    function c(t) {
                        return "" + e.main(n, t, n.helpers, n.partials, r, l, s)
                    }
                    return e.useDepths && (s = a.depths ? t != a.depths[0] ? [t].concat(a.depths) : a.depths : [t]), (c = u(e.main, c, n, a.depths || [], r, l))(t, a)
                }
                return o.isTop = !0, o._setup = function(o) {
                    o.partial ? (n.helpers = o.helpers, n.partials = o.partials, n.decorators = o.decorators) : (n.helpers = n.merge(o.helpers, t.helpers), e.usePartial && (n.partials = n.merge(o.partials, t.partials)), (e.usePartial || e.useDecorators) && (n.decorators = n.merge(o.decorators, t.decorators)))
                }, o._child = function(t, o, a, r) {
                    if (e.useBlockParams && !a) throw new s.default("must pass block params");
                    if (e.useDepths && !r) throw new s.default("must pass parent depths");
                    return l(n, t, e[t], o, 0, a, r)
                }, o
            }, t.wrapProgram = l, t.resolvePartial = function(e, t, n) {
                e ? e.call || n.name || (n.name = e, e = n.partials[e]) : e = "@partial-block" === n.name ? n.data["partial-block"] : n.partials[n.name];
                return e
            }, t.invokePartial = function(e, t, n) {
                var o = n.data && n.data["partial-block"];
                n.partial = !0, n.ids && (n.data.contextPath = n.ids[0] || n.data.contextPath);
                var r = void 0;
                n.fn && n.fn !== c && function() {
                    n.data = i.createFrame(n.data);
                    var e = n.fn;
                    r = n.data["partial-block"] = function(t) {
                        var n = arguments.length <= 1 || void 0 === arguments[1] ? {} : arguments[1];
                        return n.data = i.createFrame(n.data), n.data["partial-block"] = o, e(t, n)
                    }, e.partials && (n.partials = a.extend({}, n.partials, e.partials))
                }();
                void 0 === e && r && (e = r);
                if (void 0 === e) throw new s.default("The partial " + n.name + " could not be found");
                if (e instanceof Function) return e(t, n)
            }, t.noop = c;
            var o, a = function(e) {
                    if (e && e.__esModule) return e;
                    var t = {};
                    if (null != e)
                        for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
                    return t.default = e, t
                }(n(21)),
                r = n(22),
                s = (o = r) && o.__esModule ? o : {
                    default: o
                },
                i = n(20);

            function l(e, t, n, o, a, r, s) {
                function i(t) {
                    var a = arguments.length <= 1 || void 0 === arguments[1] ? {} : arguments[1],
                        i = s;
                    return !s || t == s[0] || t === e.nullContext && null === s[0] || (i = [t].concat(s)), n(e, t, e.helpers, e.partials, a.data || o, r && [a.blockParams].concat(r), i)
                }
                return (i = u(n, i, e, s, o, r)).program = t, i.depth = s ? s.length : 0, i.blockParams = a || 0, i
            }

            function c() {
                return ""
            }

            function u(e, t, n, o, r, s) {
                if (e.decorator) {
                    var i = {};
                    t = e.decorator(t, i, n, o && o[0], r, s, o), a.extend(t, i)
                }
                return t
            }
        }, (e, t, n) => {
            "use strict";
            t.__esModule = !0, t.default = function(e) {
                var t = void 0 !== n.g ? n.g : window,
                    o = t.Handlebars;
                e.noConflict = function() {
                    return t.Handlebars === e && (t.Handlebars = o), e
                }
            }, e.exports = t.default
        }, (e, t, n) => {
            "use strict";
            var o = n(1);
            const a = {
                NO_OFFERS_FOUND: "yourshop_show_offers_error_text",
                CLIENT_NOT_AUTHORIZED: "yourshop_not_available_error_text",
                YOURSHOP_DISABLED: "yourshop_not_active",
                GENERIC_CODE: "yourshop_generic_error_text"
            };
            e.exports = o.Ember.Service.extend({
                telemetry: o.Ember.inject.service(),
                currentErorCode: null,
                currentErrorText: null,
                checkForOffersAndErrors: function() {
                    (0, o.dataBinding)("/lol-yourshop").get("/v1/offers", {
                        skipCache: !0
                    }).catch(this.handleOffersError.bind(this))
                },
                handleOffersError: function(e) {
                    const t = this.getErrorCode(e && e.data && e.data.message);
                    let n;
                    n = void 0 !== a[t] ? this.tra.get(a[t]) : this.tra.get(a.GENERIC_CODE), this.set("currentErrorText", n), this.set("currentErrorCode", t), this.get("telemetry").sendEvent({
                        id: "get_show_offers_error",
                        error: e
                    })
                },
                getErrorCode: function(e) {
                    try {
                        const t = JSON.parse(e);
                        if (t && t.errorCode) return t.errorCode
                    } catch (e) {}
                    return "GENERIC_CODE"
                }
            })
        }, (e, t, n) => {
            "use strict";
            var o = n(1);
            const a = (0, o.dataBinding)("/telemetry");
            e.exports = o.Ember.Service.extend({
                sendEvent: function(e) {
                    a.post("/v1/events/yourshop_event", e)
                },
                sendOfferEvent: function(e = {}) {
                    const {
                        offer: t
                    } = e;
                    if (!t || !t.get) return;
                    const n = {
                        action: e.action,
                        offerId: t.get("id"),
                        championId: t.get("champion.id"),
                        skinId: t.get("skin.id"),
                        offerType: t.get("type"),
                        discountPercentage: t.get("discountPercentage"),
                        originalPrice: t.get("originalPrice"),
                        discountPrice: t.get("discountPrice")
                    };
                    a.post("/v1/events/yourshop", n)
                }
            })
        }, (e, t, n) => {
            "use strict";
            var o = n(1);
            n(40), e.exports = o.Ember.Component.extend({
                classNames: ["yourshop-header"],
                layout: n(41),
                isTencentRegion: null,
                shouldDisplayOffers: null,
                lessThanSixOffers: null
            })
        }, (e, t, n) => {
            "use strict";
            n.r(t)
        }, (e, t, n) => {
            const o = n(1).Ember;
            e.exports = o.HTMLBars.template({
                id: "BvD14lYE",
                block: '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-yourshop\\\\src\\\\app\\\\components\\\\yourshop-header\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-yourshop\\\\src\\\\app\\\\components\\\\yourshop-header\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-yourshop\\\\src\\\\app\\\\components\\\\yourshop-header\\\\index.js\\" "],["text","\\n"],["open-element","div",[]],["dynamic-attr","class",["concat",["yourshop-header-riot ",["helper",["if"],[["get",["isTencentRegion"]],"yourshop-header-tencent"],null]]]],["flush-element"],["text","\\n  "],["open-element","div",[]],["dynamic-attr","class",["helper",["if"],[["get",["isTencentRegion"]],"yourshop-title"],null],null],["flush-element"],["text","\\n    "],["append",["unknown",["tra","yourshop_title"]],false],["text","\\n  "],["close-element"],["text","\\n"],["close-element"],["text","\\n\\n"],["block",["if"],[["get",["shouldDisplayOffers"]]],null,2]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","      "],["open-element","div",[]],["static-attr","class","yourshop-not-full-message"],["flush-element"],["append",["unknown",["tra","yourshop_not_full"]],false],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","    "],["open-element","div",[]],["static-attr","class","yourshop-tencent-notice"],["flush-element"],["text","\\n      "],["append",["unknown",["tra","yourshop_tencent_reminder_notice"]],false],["text","\\n      "],["append",["unknown",["tra","yourshop_general_includes_champ"]],false],["text","\\n    "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["block",["if"],[["get",["isTencentRegion"]]],null,1],["text","\\n"],["block",["if"],[["get",["lessThanSixOffers"]]],null,0]],"locals":[]}],"hasPartials":false}',
                meta: {}
            })
        }, (e, t, n) => {
            "use strict";
            var o = n(1);
            n(43), e.exports = o.Ember.Component.extend({
                classNames: ["yourshop-body"],
                layout: n(44),
                errorLookup: o.Ember.inject.service(),
                isTencentRegion: null,
                shouldDisplayOffers: null,
                offers: null
            })
        }, (e, t, n) => {
            "use strict";
            n.r(t)
        }, (e, t, n) => {
            const o = n(1).Ember;
            e.exports = o.HTMLBars.template({
                id: "guGS63BO",
                block: '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-yourshop\\\\src\\\\app\\\\components\\\\yourshop-body\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-yourshop\\\\src\\\\app\\\\components\\\\yourshop-body\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-yourshop\\\\src\\\\app\\\\components\\\\yourshop-body\\\\index.js\\" "],["text","\\n"],["open-element","div",[]],["dynamic-attr","class",["concat",["yourshop-body-riot ",["helper",["if"],[["get",["isTencentRegion"]],"yourshop-body-tencent"],null]]]],["flush-element"],["text","\\n"],["block",["if"],[["get",["shouldDisplayOffers"]]],null,4,2],["close-element"]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","    "],["append",["helper",["uikit-spinner"],null,[["class","width","height"],["yourshop-spinner","80px","80px"]]],false],["text","\\n  "]],"locals":[]},{"statements":[["text","    "],["open-element","div",[]],["static-attr","class","yourshop-error-message"],["flush-element"],["text","\\n      "],["append",["unknown",["errorLookup","currentErrorText"]],false],["text","\\n      "],["open-element","br",[]],["flush-element"],["close-element"],["text","\\n      "],["open-element","br",[]],["flush-element"],["close-element"],["text","\\n      "],["append",["unknown",["tra","yourshop_error_code"]],false],["append",["unknown",["errorLookup","currentErrorCode"]],false],["text","\\n    "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["block",["if"],[["get",["errorLookup","currentErrorText"]]],null,1,0]],"locals":[]},{"statements":[["text","      "],["append",["helper",["yourshop-offer-card"],null,[["offer"],[["get",["offer"]]]]],false],["text","\\n"]],"locals":["offer"]},{"statements":[["block",["each"],[["get",["offers"]]],null,3]],"locals":[]}],"hasPartials":false}',
                meta: {}
            })
        }, (e, t, n) => {
            "use strict";
            var o = n(1);
            n(46), e.exports = o.Ember.Component.extend({
                classNames: ["yourshop-footer"],
                layout: n(47),
                isTencentRegion: null,
                expirationDate: null,
                showDataAuthModal: null,
                endDateText: o.Ember.computed("expirationDate", "tra.yourshop_end_date", "tra.metadata.locale", (function() {
                    const e = this.get("expirationDate");
                    let t = this.get("tra.metadata.locale.id");
                    if (!e || !t) return;
                    "ar_AE" === t && (t = "ar-tn"), t = t.toLowerCase().replace("_", "-");
                    const n = new Date(e).toLocaleDateString(t, {
                            month: "long",
                            day: "numeric"
                        }),
                        o = this.getTimeString(e, t);
                    return this.get("tra").formatString("yourshop_end_date", {
                        dateString: n,
                        timeString: o
                    })
                })),
                getTimeString: function(e, t) {
                    const n = new Date(e).toLocaleTimeString(t, {
                        hour12: !1,
                        hour: "numeric",
                        minute: "numeric",
                        timeZoneName: "short"
                    });
                    if ("zh-my" === t || "zh-cn" === t) {
                        const e = n.split(/([0-9]{2}:[0-9]{2})/);
                        if (e.length > 1) return `${e[1]} ${e[0]}`
                    }
                    return n
                },
                endDateTextTooltip: o.Ember.computed("expirationDate", "tra.yourshop_tencent_end_date_tooltip", "tra.metadata.locale", (function() {
                    const e = this.get("expirationDate");
                    let t = this.get("tra.metadata.locale.id");
                    if (!e || !t) return;
                    t = t.toLowerCase().replace("_", "-");
                    const n = new Date(e).toLocaleDateString(t, {
                            month: "long",
                            day: "numeric",
                            year: "numeric"
                        }),
                        o = new Date(e).toLocaleString(t, {
                            hour: "numeric",
                            minute: "numeric",
                            hour12: !0,
                            timeZoneName: "short"
                        });
                    return this.get("tra").formatString("yourshop_tencent_end_date_tooltip", {
                        dateString: n,
                        timeString: o
                    })
                }))
            })
        }, (e, t, n) => {
            "use strict";
            n.r(t)
        }, (e, t, n) => {
            const o = n(1).Ember;
            e.exports = o.HTMLBars.template({
                id: "YAVPdLkn",
                block: '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-yourshop\\\\src\\\\app\\\\components\\\\yourshop-footer\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-yourshop\\\\src\\\\app\\\\components\\\\yourshop-footer\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-yourshop\\\\src\\\\app\\\\components\\\\yourshop-footer\\\\index.js\\" "],["text","\\n"],["block",["if"],[["get",["isTencentRegion"]]],null,4,1]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","      "],["open-element","div",[]],["static-attr","class","yourshop-footer-riot-expiration"],["flush-element"],["append",["unknown",["endDateText"]],false],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","  "],["open-element","div",[]],["static-attr","class","yourshop-footer-riot"],["flush-element"],["text","\\n"],["block",["if"],[["get",["endDateText"]]],null,0],["text","\\n    "],["open-element","div",[]],["static-attr","class","yourshop-footer-riot-notice"],["flush-element"],["append",["unknown",["tra","yourshop_general_includes_champ"]],false],["close-element"],["text","\\n\\n    "],["open-element","hr",[]],["static-attr","class","yourshop-footer-riot-rule"],["flush-element"],["close-element"],["text","\\n\\n    "],["open-element","div",[]],["static-attr","class","yourshop-footer-riot-notice"],["flush-element"],["text","\\n      "],["append",["unknown",["tra","yourshop_reminder_notice"]],false],["text","\\n    "],["close-element"],["text","\\n  "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","          "],["open-element","lol-uikit-content-block",[]],["static-attr","class","yourshop-footer-tencent-expiration-tooltip"],["flush-element"],["text","\\n            "],["open-element","div",[]],["static-attr","class","yourshop-footer-tencent-expiration-tooltip-text"],["flush-element"],["text","\\n              "],["append",["unknown",["tra","yourshop_tencent_end_date_tooltip_text"]],false],["text","\\n            "],["close-element"],["text","\\n            "],["open-element","div",[]],["static-attr","class","yourshop-footer-tencent-expiration-tooltip-date"],["flush-element"],["text","\\n              "],["append",["unknown",["endDateTextTooltip"]],false],["text","\\n            "],["close-element"],["text","\\n          "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","      "],["open-element","div",[]],["static-attr","class","yourshop-footer-tencent-expiration"],["flush-element"],["text","\\n"],["block",["uikit-tooltip"],null,[["tooltipPosition","type"],["top","system"]],2],["text","        "],["open-element","img",[]],["static-attr","class","yourshop-footer-tencent-clock-icon"],["static-attr","src","/fe/lol-static-assets/images/clock-icon-gold1.svg"],["flush-element"],["close-element"],["text","\\n        "],["open-element","div",[]],["static-attr","class","yourshop-footer-tencent-expiration-text"],["flush-element"],["text","\\n          "],["append",["helper",["remaining-time-text"],null,[["endDateTime","wrappingText"],[["get",["expirationDate"]],["get",["tra","yourshop_tencent_end_date_countdown"]]]]],false],["text","\\n        "],["close-element"],["text","\\n      "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","  "],["open-element","hr",[]],["static-attr","class","yourshop-footer-tencent-rule"],["flush-element"],["close-element"],["text","\\n\\n  "],["open-element","div",[]],["static-attr","class","yourshop-footer-tencent"],["flush-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","yourshop-footer-tencent-links"],["flush-element"],["text","\\n      "],["open-element","a",[]],["static-attr","class","yourshop-tou-link"],["dynamic-attr","href",["unknown",["tra","yourshop_tencent_data_usage_modal_link"]],null],["static-attr","target","_blank"],["flush-element"],["text","\\n        "],["append",["unknown",["tra","yourshop_tencent_terms_of_use_link_text"]],false],["text","\\n      "],["close-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","yourshop-footer-tencent-vertical-line"],["flush-element"],["close-element"],["text","\\n      "],["open-element","a",[]],["static-attr","class","yourshop-data-auth-modal-link"],["static-attr","href","javascript:void(0)"],["dynamic-attr","onClick",["unknown",["showDataAuthModal"]],null],["flush-element"],["text","\\n        "],["append",["unknown",["tra","yourshop_tencent_data_usage_bottom_modal_link"]],false],["text","\\n      "],["close-element"],["text","\\n    "],["close-element"],["text","\\n\\n"],["block",["if"],[["get",["endDateTextTooltip"]]],null,3],["text","  "],["close-element"],["text","\\n\\n"]],"locals":[]}],"hasPartials":false}',
                meta: {}
            })
        }, (e, t, n) => {
            "use strict";
            var o = n(1);
            n(49);
            const a = (0, o.emberDataBinding)({
                Ember: o.Ember,
                websocket: o.socket,
                logPrefix: "yourshop-details",
                boundProperties: {
                    champion: "/lol-game-data/assets/v1/champions/{{offer.championId}}.json",
                    purchaseConfirmationEnabled: "/lol-platform-config/v1/namespaces/LCUStore/PersonalizedOffersConfirmationEnabled"
                }
            });
            e.exports = o.Ember.Component.extend(a, {
                tagName: "lol-uikit-dialog-frame",
                attributeBindings: ["dismissable"],
                dismissable: !0,
                classNames: ["yourshop-details"],
                layout: n(50),
                yourshop: null,
                offer: null,
                purchaseConfirmationChecked: !1,
                purchaseInProgress: !1,
                rarityText: o.Ember.computed("offer.rarity", (function() {
                    const e = this.get("offer.rarity");
                    if (e) {
                        const t = e.traKey;
                        return this.get(`tra.yourshop_rarity_${t}`)
                    }
                })),
                telemetry: o.Ember.computed.readOnly("yourshop.telemetry"),
                wallet: o.Ember.computed("yourshop.walletRP.RP", (function() {
                    const e = this.get("yourshop.walletRP.RP") || 0;
                    return o.Ember.Object.create({
                        RP: e
                    })
                })),
                includesChampion: o.Ember.computed.equal("offer.type", "SkinWithChampion"),
                newBalance: o.Ember.computed("wallet.RP", "offer.discountPrice", (function() {
                    return this.get("wallet.RP") - this.get("offer.discountPrice")
                })),
                multipleDetailsclass: o.Ember.computed("offer.rarity", (function() {
                    return this.get("offer.rarity") ? "contains-multiple-detail" : "contains-single-detail"
                })),
                newBalanceText: o.Ember.computed("newBalance", "tra.yourshop_details_new_balance_rp", (function() {
                    const e = this.get("newBalance") || 0;
                    return this.get("tra").formatString("yourshop_details_new_balance_rp", {
                        newBalance: e
                    })
                })),
                notEnoughRp: o.Ember.computed.lt("newBalance", 0),
                purchaseConfirmationNotChecked: o.Ember.computed.not("purchaseConfirmationChecked"),
                needsConfirmation: o.Ember.computed.and("purchaseConfirmationEnabled", "purchaseConfirmationNotChecked"),
                purchaseButtonDisabled: o.Ember.computed.or("notEnoughRp", "needsConfirmation", "purchaseInProgress"),
                displayPurchaseConfirmation: o.Ember.computed.readOnly("purchaseConfirmationEnabled"),
                confirmationText: o.Ember.computed("tra.yourshop_details_purchase_confirmation_text", (function() {
                    const e = this.getConfirmationTextMatches(),
                        t = this.element.querySelector(".offer-details-purchase-confirmation-label");
                    if (e && 3 === e.length && t) {
                        const n = document.createElement("a"),
                            a = this.get("tra.yourshop_details_purchase_confirmation_link"),
                            r = this.get("tra.yourshop_details_purchase_confirmation_link_text");
                        n.target = "_blank", n.classList.add("yourshop-purchase-confirmation-link"), n.href = o.Ember.Handlebars.Utils.escapeExpression(a), n.innerText = o.Ember.Handlebars.Utils.escapeExpression(r), n.onclick = function(e) {
                            e.stopPropagation()
                        };
                        const s = o.Ember.Handlebars.Utils.escapeExpression(e[1]),
                            i = o.Ember.Handlebars.Utils.escapeExpression(e[2]);
                        return t.appendChild(document.createTextNode(s)), t.appendChild(n), t.appendChild(document.createTextNode(i)), ""
                    }
                    return this.get("tra.yourshop_details_purchase_confirmation_text")
                })),
                getConfirmationTextMatches: function() {
                    const e = this.get("tra.yourshop_details_purchase_confirmation_text");
                    return /(.*){{confirmationLink}}(.*)/.exec(e)
                },
                showGeneralErrorModal: function() {
                    const e = o.lolUikitPlugin.getTemplateHelper().contentBlockDialog(this.get("tra.yourshop_general_error_header"), this.get("tra.yourshop_general_error_body"));
                    o.lolUikitPlugin.getModalManager().add({
                        type: "DialogAlert",
                        data: {
                            contents: e,
                            okText: this.get("tra.yourshop_general_error_ok_text")
                        }
                    })
                },
                showPostPurchaseConfirmation: function() {
                    const e = o.lolUikitPlugin.getTemplateHelper().contentBlockDialog(this.get("tra.yourshop_details_post_purchase_confirmation_header"), this.get("tra.yourshop_details_post_purchase_confirmation_body"));
                    o.lolUikitPlugin.getModalManager().add({
                        type: "DialogAlert",
                        data: {
                            contents: e,
                            okText: this.get("tra.yourshop_details_post_purchase_confirmation_done")
                        }
                    })
                },
                executePurchase: function() {
                    const e = this.get("offer");
                    return (0, o.dataBinding)("/lol-yourshop").post(`/v1/offers/${e.id}/purchase`).then((() => {
                        o.audioPlugin.getChannel("sfx-ui").playSound("/fe/lol-static-assets/sounds/sfx-yourshop-stinger.ogg"), this.get("purchaseConfirmationEnabled") && this.showPostPurchaseConfirmation(), this.element && this.element.dispatchEvent(new Event("closeButtonClick", {
                            bubbles: !0
                        })), this.get("telemetry").sendOfferEvent({
                            action: "purchase",
                            offer: e
                        })
                    })).catch((() => {
                        this.element && this.element.dispatchEvent(new Event("closeButtonClick", {
                            bubbles: !0
                        })), this.showGeneralErrorModal(), this.get("telemetry").sendOfferEvent({
                            action: "purchase_error",
                            offer: e
                        })
                    }))
                },
                actions: {
                    purchase: function() {
                        const e = this.get("offer");
                        !this.get("purchaseButtonDisabled") && e && (this.set("purchaseInProgress", !0), this.executePurchase().finally((() => {
                            this.set("purchaseInProgress", !1)
                        })))
                    }
                }
            })
        }, (e, t, n) => {
            "use strict";
            n.r(t)
        }, (e, t, n) => {
            const o = n(1).Ember;
            e.exports = o.HTMLBars.template({
                id: "t4AKsEb+",
                block: '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-yourshop\\\\src\\\\app\\\\components\\\\details\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-yourshop\\\\src\\\\app\\\\components\\\\details\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-yourshop\\\\src\\\\app\\\\components\\\\details\\\\index.js\\" "],["text","\\n"],["open-element","div",[]],["static-attr","class","offer-details-contents"],["flush-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","offer-details-hero"],["flush-element"],["text","\\n    "],["open-element","img",[]],["static-attr","class","offer-details-skin-splash"],["dynamic-attr","src",["unknown",["offer","skin","uncenteredSplashPath"]],null],["flush-element"],["close-element"],["text","\\n\\n    "],["open-element","div",[]],["static-attr","class","offer-details-skin-vignette"],["flush-element"],["close-element"],["text","\\n\\n    "],["open-element","div",[]],["static-attr","class","offer-details-hero-copy"],["flush-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","offer-details-skin-name"],["flush-element"],["append",["unknown",["offer","skin","name"]],false],["close-element"],["text","\\n    "],["close-element"],["text","\\n  "],["close-element"],["text","\\n\\n"],["block",["if"],[["get",["offer","discountPercentageText"]]],null,7],["text","\\n  "],["open-element","div",[]],["dynamic-attr","class",["concat",["offer-details-item-details ",["unknown",["multipleDetailsclass"]]]]],["flush-element"],["text","\\n"],["block",["if"],[["get",["includesChampion"]]],null,6,4],["block",["if"],[["get",["offer","rarity"]]],null,3],["text","  "],["close-element"],["text","\\n\\n"],["block",["if"],[["get",["displayPurchaseConfirmation"]]],null,2],["text","\\n  "],["open-element","div",[]],["static-attr","class","offer-details-purchase-details"],["flush-element"],["text","\\n    "],["open-element","lol-uikit-purchase-button",[]],["static-attr","rp",""],["dynamic-attr","disabled",["unknown",["purchaseButtonDisabled"]],null],["dynamic-attr","onclick",["helper",["action"],[["get",[null]],"purchase"],null],null],["static-attr","click-sfx-src","/fe/lol-static-assets/sounds/sfx-yourshop-uikit-button-gold-click.ogg"],["static-attr","hover-sfx-src","/fe/lol-static-assets/sounds/sfx-yourshop-store-purchase-modal-button-hover.ogg"],["flush-element"],["text","\\n      "],["append",["unknown",["offer","discountPrice"]],false],["text","\\n    "],["close-element"],["text","\\n"],["block",["if"],[["get",["notEnoughRp"]]],null,1,0],["text","  "],["close-element"],["text","\\n"],["close-element"],["text","\\n"]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","      "],["open-element","div",[]],["static-attr","class","offer-details-new-balance"],["flush-element"],["append",["unknown",["newBalanceText"]],false],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","      "],["open-element","div",[]],["static-attr","class","offer-details-not-enough-rp"],["flush-element"],["append",["unknown",["tra","yourshop_not_enough_rp"]],false],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","    "],["open-element","div",[]],["static-attr","class","offer-details-purchase-confirmation"],["flush-element"],["text","\\n      "],["open-element","lol-uikit-flat-checkbox",[]],["flush-element"],["text","\\n        "],["append",["helper",["input"],null,[["slot","class","type","id","checked","name"],["input","offer-details-purchase-confirmation-checkbox","checkbox","offerDetailsCheckbox",["get",["purchaseConfirmationChecked"]],"rememberMe"]]],false],["text","\\n        "],["open-element","label",[]],["static-attr","slot","label"],["static-attr","class","offer-details-purchase-confirmation-label"],["flush-element"],["append",["unknown",["confirmationText"]],false],["close-element"],["text","\\n      "],["close-element"],["text","\\n    "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","      "],["open-element","div",[]],["static-attr","class","offer-details-skin-rarity"],["flush-element"],["text","\\n        "],["open-element","img",[]],["static-attr","class","offer-details-skin-rarity-image"],["dynamic-attr","src",["unknown",["offer","rarityGemPath"]],null],["flush-element"],["close-element"],["text","\\n        "],["append",["unknown",["rarityText"]],false],["text","\\n      "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","      "],["open-element","div",[]],["static-attr","class","offer-details-champion-owned"],["flush-element"],["text","\\n        "],["open-element","span",[]],["static-attr","class","offer-details-champion-owned-icon"],["flush-element"],["close-element"],["text","\\n        "],["append",["unknown",["tra","yourshop_details_champion_owned"]],false],["text","\\n      "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","          "],["open-element","img",[]],["dynamic-attr","src",["unknown",["offer","champion","squarePortraitPath"]],null],["flush-element"],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","      "],["open-element","div",[]],["static-attr","class","offer-details-includes-champion"],["flush-element"],["text","\\n"],["block",["uikit-framed-icon"],null,[["class","borderWidth"],["offer-details-includes-champion-icon",1]],5],["text","        "],["append",["unknown",["tra","yourshop_details_includes_champion"]],false],["text","\\n      "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","    "],["open-element","div",[]],["static-attr","class","offer-details-sale-badge"],["flush-element"],["append",["unknown",["offer","discountPercentageText"]],false],["close-element"],["text","\\n"]],"locals":[]}],"hasPartials":false}',
                meta: {}
            })
        }],
        t = {};

    function n(o) {
        var a = t[o];
        if (void 0 !== a) return a.exports;
        var r = t[o] = {
            exports: {}
        };
        return e[o](r, r.exports, n), r.exports
    }
    n.g = function() {
        if ("object" == typeof globalThis) return globalThis;
        try {
            return this || new Function("return this")()
        } catch (e) {
            if ("object" == typeof window) return window
        }
    }(), n.r = e => {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
            value: "Module"
        }), Object.defineProperty(e, "__esModule", {
            value: !0
        })
    }, (() => {
        "use strict";
        var e, t = (e = n(1)) && e.__esModule ? e : {
            default: e
        };
        const o = "rcp-fe-lol-yourshop",
            a = document.currentScript.ownerDocument;
        const r = window.getPluginAnnounceEventName(o);
        a.addEventListener(r, (function(e) {
            (0, e.registrationHandler)((function(e) {
                return t.default.init(e, {
                    audioPlugin: e => e.get("rcp-fe-audio"),
                    componentFactory: e => e.get("rcp-fe-common-libs").getComponentFactory("1"),
                    dataBinding: e => e.get("rcp-fe-common-libs").getDataBinding("rcp-fe-lol-yourshop"),
                    Ember: e => e.get("rcp-fe-ember-libs").getEmber(),
                    emberDataBinding: e => e.get("rcp-fe-ember-libs").getEmberDataBinding("rcp-fe-lol-yourshop"),
                    logger: e => e.get("rcp-fe-common-libs").logging.create(o),
                    lolUikitPlugin: e => e.get("rcp-fe-lol-uikit"),
                    socket: e => e.getSocket(),
                    Viewport: e => e.get("rcp-fe-lol-shared-components").getApi_Viewport(),
                    SharedEmberComponents: e => e.get("rcp-fe-lol-shared-components").getSharedEmberComponents()
                }).then((() => t.default.add({
                    emberApplicationFactory: e => e.get("rcp-fe-ember-libs").getEmberApplicationFactory()
                }))).then((function() {
                    return new(0, n(2).default)(new(0, n(3).default))
                }))
            }))
        }), {
            once: !0
        })
    })()
})();