(() => {
    var e = [, e => {
            "use strict";
            let t;

            function n() {
                return t || (console.error("The `provider` object has not been set, please do so by calling the `init` method."), null)
            }
            const s = {
                init: function(e, n) {
                    return t = e, this.add(n)
                },
                _getValue: function(e, n) {
                    let s;
                    return "function" == typeof n ? (s = n(t), s || console.warn("The function for key " + e + " returned a falsy value: ", s)) : "string" == typeof n ? (s = t.get(n), s || console.warn("The provider `get` invocation for the key " + e + " returned a falsy value: ", s)) : "object" == typeof n && (s = n), s
                },
                add: function(e) {
                    e = e || {};
                    const t = [],
                        n = this;
                    return Object.keys(e).forEach((function(s) {
                        const a = e[s],
                            o = n._getValue(s, a);
                        o && o.then ? (o.then((function(e) {
                            e || console.warn("The promise for the key " + s + " resolved with a falsy value: ", e), n._addValue(s, e)
                        })), t.push(o)) : n._addValue(s, o)
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
            e.exports = s
        }, (e, t, n) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = function() {
                const e = new s.default;
                return new a.default(e)
            };
            var s = o(n(3)),
                a = o(n(85));

            function o(e) {
                return e && e.__esModule ? e : {
                    default: e
                }
            }
        }, (e, t, n) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = void 0;
            var s = n(1),
                a = function(e, t) {
                    if (!t && e && e.__esModule) return e;
                    if (null === e || "object" != typeof e && "function" != typeof e) return {
                        default: e
                    };
                    var n = l(t);
                    if (n && n.has(e)) return n.get(e);
                    var s = {},
                        a = Object.defineProperty && Object.getOwnPropertyDescriptor;
                    for (var o in e)
                        if ("default" !== o && Object.prototype.hasOwnProperty.call(e, o)) {
                            var r = a ? Object.getOwnPropertyDescriptor(e, o) : null;
                            r && (r.get || r.set) ? Object.defineProperty(s, o, r) : s[o] = e[o]
                        } s.default = e, n && n.set(e, s);
                    return s
                }(n(4)),
                o = n(7);

            function l(e) {
                if ("function" != typeof WeakMap) return null;
                var t = new WeakMap,
                    n = new WeakMap;
                return (l = function(e) {
                    return e ? n : t
                })(e)
            }
            t.default = class {
                constructor() {
                    this.screenRoot = this.getScreenRoot(), this.application = null, this.applicationRegistered = !1, this.eventShopDataBinding = (0, s.dataBinding)(o.EVENT_SHOP_API, s.socket)
                }
                getScreenRoot() {
                    const e = s.Viewport.getApiKey(a.APP_NAME);
                    return s.Viewport.main().getScreenRoot(e, a.APP_NAME)
                }
                show() {
                    return this.applicationRegistered || ((0, a.default)(), this.applicationRegistered = !0), this.screenRoot.bump().then((() => {
                        this.application || (this.application = s.ComponentFactory.create(a.APP_NAME), this.screenRoot.getElement().appendChild(this.application.domNode)), s.externalModel.set("isVisible", !0), this.eventShopDataBinding.get(o.EVENT_INFO_PATH).then((({
                            eventId: e
                        }) => {
                            s.Telemetry.sendCustomData(o.TELEMETRY.TABLE, {
                                eventName: o.TELEMETRY.SHOW_EVENT,
                                eventShopEventId: e
                            })
                        }))
                    }))
                }
                hide() {
                    s.externalModel.set("isVisible", !1), this.screenRoot.release()
                }
            }
        }, (e, t, n) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.APP_NAME = void 0, t.default = function() {
                const e = {
                    name: Y,
                    ComponentFactory: s.ComponentFactory,
                    Router: a.default,
                    ApplicationRoute: o.default,
                    IndexRoute: l.default,
                    tra: s.traService,
                    EventShopService: r.default,
                    PlayerSettingsService: i.default,
                    EventShopCardMultiPurchaseModalComponent: c.default,
                    EventShopCategoryNavBarComponent: p.default,
                    EventShopCategoryNavBarTabComponent: d.default,
                    EventShopCategoryOffersComponent: u.default,
                    EventShopFallbackComponent: m.default,
                    EventShopMainViewComponent: h.default,
                    EventShopOfferCardComponent: f.default,
                    EventShopPageHeaderComponent: v.default,
                    EventShopProgressionComponent: _.default,
                    EventShopPurchaseModalComponent: g.default,
                    EventShopRewardTrackWrapperComponent: E.default,
                    EventShopTokenBalanceAmountComponent: x.default,
                    EventShopTokenShopComponent: T.default,
                    EventShopXpComponent: b.default,
                    RemainingTimeTextComponent: K,
                    ...s.RewardTrackerEmberComponents,
                    ...s.MultiPurchaseSliderEmberComponents,
                    ApplicationController: k.default,
                    IndexController: y.default,
                    InventoryTypeNameHelper: S.default,
                    EqHelper: C.default,
                    TEMPLATES: {
                        application: P.default,
                        index: R.default,
                        "components/event-shop-card-multi-purchase-modal": O.default,
                        "components/event-shop-category-nav-bar-tab": w.default,
                        "components/event-shop-category-nav-bar": A.default,
                        "components/event-shop-category-offers": M.default,
                        "components/event-shop-fallback": D.default,
                        "components/event-shop-main-view": I.default,
                        "components/event-shop-offer-card": L.default,
                        "components/event-shop-page-header": N.default,
                        "components/event-shop-progression": B.default,
                        "components/event-shop-purchase-modal": U.default,
                        "components/event-shop-reward-track-wrapper": H.default,
                        "components/event-shop-token-shop": j.default,
                        "components/event-shop-xp": F.default
                    }
                };
                s.emberApplicationFactory.setFactoryDefinition(e)
            };
            var s = n(1),
                a = V(n(5)),
                o = V(n(6)),
                l = V(n(8)),
                r = V(n(9)),
                i = V(n(10)),
                c = V(n(11)),
                p = V(n(13)),
                d = V(n(14)),
                u = V(n(15)),
                m = V(n(16)),
                h = V(n(17)),
                f = V(n(18)),
                v = V(n(39)),
                _ = V(n(41)),
                g = V(n(42)),
                E = V(n(43)),
                x = V(n(62)),
                T = V(n(63)),
                b = V(n(64)),
                k = V(n(65)),
                y = V(n(67)),
                S = V(n(68)),
                C = V(n(69)),
                P = V(n(70)),
                R = V(n(71)),
                O = V(n(72)),
                w = V(n(73)),
                A = V(n(74)),
                M = V(n(75)),
                D = V(n(76)),
                I = V(n(77)),
                L = V(n(78)),
                N = V(n(79)),
                B = V(n(80)),
                U = V(n(81)),
                H = V(n(82)),
                j = V(n(83)),
                F = V(n(84));

            function V(e) {
                return e && e.__esModule ? e : {
                    default: e
                }
            }
            const {
                RemainingTimeTextComponent: K
            } = s.SharedComponents, Y = "rcp-fe-lol-event-shop";
            t.APP_NAME = Y
        }, (e, t, n) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = void 0;
            const s = n(1).Ember.Router.extend({
                location: "none"
            });
            s.map((function() {}));
            var a = s;
            t.default = a
        }, (e, t, n) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = void 0;
            var s = n(1),
                a = n(7);
            var o = s.Ember.Route.extend({
                model: () => (0, s.dataBinding)(a.EVENT_SHOP_API, s.socket).get("/pass-background-data").then((e => ({
                    externalModel: s.externalModel,
                    backgroundData: e
                })))
            });
            t.default = o
        }, (e, t) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = t.TOKEN_SHOP_DATA_PATH = t.TELEMETRY = t.REWARD_TRACK_ITEM_STATE = t.PURCHASE_OFFER_PATH = t.PURCHASE_ITEM_PATH = t.PASS_OWNERSHIP_TYPES = t.PASS_BUNDLES_PATH = t.OFFER_STATES = t.EVENT_SHOP_SERVICE_OBSERVERS = t.EVENT_SHOP_OFFER_CARD_CONTAINER_CLASSNAME = t.EVENT_SHOP_API = t.EVENT_INFO_PATH = t.CLAIM_CURRENT_BONUS_REWARDS_PATH = t.CLAIM_ALL_REWARDS_PATH = void 0;
            const n = "/lol-event-shop/v1";
            t.EVENT_SHOP_API = n;
            const s = "/claim-select-all";
            t.CLAIM_ALL_REWARDS_PATH = s;
            const a = "/claim-select-bonus-iteration";
            t.CLAIM_CURRENT_BONUS_REWARDS_PATH = a;
            t.PURCHASE_OFFER_PATH = "/purchase-offer";
            t.PASS_BUNDLES_PATH = "/pass-bundles";
            t.PURCHASE_ITEM_PATH = "/purchase-item";
            const o = "/info";
            t.EVENT_INFO_PATH = o;
            const l = "/token-shop-data";
            t.TOKEN_SHOP_DATA_PATH = l;
            const r = {
                PURCHASED: "Purchased",
                UNOWNED: "Unowned"
            };
            t.PASS_OWNERSHIP_TYPES = r;
            const i = {
                LOCKED: "Locked",
                UNLOCKED: "Unlocked",
                UNSELECTED: "Unselected",
                SELECTED: "Selected"
            };
            t.REWARD_TRACK_ITEM_STATE = i;
            t.OFFER_STATES = {
                OWNED: "kOwned",
                AVAILABLE: "kAvailable",
                UNAVAILABLE: "kUnavailable",
                UNREVEALED: "kUnrevealed",
                PURCHASING: "kPurchasing"
            };
            t.TELEMETRY = {
                TABLE: "event_shop",
                SHOW_EVENT: "event_shop_show",
                PURCHASE_PASS_CLICK_EVENT: "event_shop_purchase_pass_click",
                PURCHASE_TOKENS_CLICK_EVENT: "event_shop_purchase_tokens_click",
                OPEN_OFFER_CARD_EVENT: "event_shop_open_offer_card",
                PURCHASE_OFFER_EVENT: "event_shop_purchase_offer",
                CATEGORY_NAV_BAR_CLICK_EVENT: "event_shop_category_nav_bar_click",
                PURCHASE_PASS_UNLOCK_CLICK_EVENT: "event_shop_purchase_pass_unlock_click"
            };
            const c = [{
                propertyName: "eventShopProgressionData",
                path: "/progress-info-data"
            }, {
                propertyName: "rewardTrackProgress",
                path: "/reward-track-progress"
            }, {
                propertyName: "rewardTrackItems",
                path: "/reward-track-items"
            }, {
                propertyName: "rewardTrackBonusItems",
                path: "/reward-track-bonus-items"
            }, {
                propertyName: "rewardTrackBonusProgress",
                path: "/reward-track-bonus-progress"
            }, {
                propertyName: "tokenShopData",
                path: "/token-shop-data"
            }, {
                propertyName: "unclaimedRewards",
                path: "/unclaimed-rewards"
            }, {
                propertyName: "categoriesOffers",
                path: "/categories-offers"
            }, {
                propertyName: "tokenBalance",
                path: "/token-balance",
                defaultValue: 0
            }, {
                propertyName: "eventDetailsData",
                path: "/event-details-data"
            }, {
                propertyName: "isGracePeriod",
                path: "/is-grace-period"
            }, {
                propertyName: "failureLoadingRewardTrack",
                path: "/failure-loading-reward-track"
            }, {
                propertyName: "failureLoadingTokenShop",
                path: "/failure-loading-token-shop"
            }, {
                propertyName: "rewardTrackXP",
                path: "/reward-track-xp"
            }, {
                propertyName: "info",
                path: o
            }, {
                propertyName: "tokenShopData",
                path: l
            }];
            t.EVENT_SHOP_SERVICE_OBSERVERS = c;
            const p = "event-shop-offer-card";
            t.EVENT_SHOP_OFFER_CARD_CONTAINER_CLASSNAME = p;
            var d = {
                CLAIM_ALL_REWARDS_PATH: s,
                EVENT_SHOP_API: n,
                EVENT_SHOP_SERVICE_OBSERVERS: c,
                PASS_OWNERSHIP_TYPES: r,
                REWARD_TRACK_ITEM_STATE: i,
                CLAIM_CURRENT_BONUS_REWARDS_PATH: a,
                EVENT_SHOP_OFFER_CARD_CONTAINER_CLASSNAME: p
            };
            t.default = d
        }, (e, t, n) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = void 0;
            var s = n(1).Ember.Route.extend({
                model() {}
            });
            t.default = s
        }, (e, t, n) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = void 0;
            var s = n(7),
                a = n(1),
                o = a.Ember.Service.extend({
                    init() {
                        this._super(...arguments), this.eventShopDataBinding = (0, a.dataBinding)(s.EVENT_SHOP_API, a.socket), this.initObserveData()
                    },
                    initObserveData() {
                        for (const {
                                propertyName: e,
                                path: t,
                                defaultValue: n
                            }
                            of s.EVENT_SHOP_SERVICE_OBSERVERS) this.eventShopDataBinding.observe(t, this, (t => {
                            this.isDestroying || this.isDestroyed || (null == t && (t = n), this.setProperties({
                                [e]: t
                            }))
                        }))
                    },
                    async getPassBundles() {
                        return await this.eventShopDataBinding.get(s.PASS_BUNDLES_PATH, {
                            skipCache: !0
                        })
                    },
                    purchasePassBundle(e) {
                        const t = {
                            inventoryType: e.details.inventoryType,
                            itemId: e.details.itemId,
                            quantity: 1,
                            rpCost: e.finalPrice
                        };
                        return this.purchaseItem(t)
                    },
                    async purchaseItem(e) {
                        return await this.eventShopDataBinding.post(s.PURCHASE_ITEM_PATH, e)
                    },
                    claimAllPendingRewards() {
                        this.eventShopDataBinding.post(s.CLAIM_ALL_REWARDS_PATH)
                    },
                    claimCurrentBonusItems() {
                        this.eventShopDataBinding.post(s.CLAIM_CURRENT_BONUS_REWARDS_PATH)
                    },
                    async purchaseOffer(e, t) {
                        return await this.eventShopDataBinding.post(s.PURCHASE_OFFER_PATH, {
                            offerId: e,
                            purchaseQuantity: t
                        })
                    },
                    willDestroyElement() {
                        this._super(...arguments), a.dataBinding.unobserve(this)
                    }
                });
            t.default = o
        }, (e, t, n) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = void 0;
            var s = n(1);
            var a = s.Ember.Service.extend({
                init() {
                    this._super(...arguments), this.settingsDataBinding = (0, s.dataBinding)("/lol-settings/v2", s.socket)
                },
                updatePlayerSettings(e, t) {
                    this.settingsDataBinding.observe("/ready", this, (n => {
                        n && (this.settingsDataBinding.unobserve("/ready", this), this.settingsDataBinding.patch("/account/LCUPreferences/event-shop", {
                            data: {
                                lastTimeSeen: (new Date).toISOString(),
                                lastSeenTokenBalance: e,
                                lastSeenTokenShopOffersVersion: t
                            },
                            schemaVersion: 1
                        }))
                    }))
                },
                willDestroyElement() {
                    this._super(...arguments), s.dataBinding.unobserve(this)
                }
            });
            t.default = a
        }, (e, t, n) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = void 0;
            var s = n(1),
                a = n(7),
                o = n(12),
                l = s.Ember.Component.extend({
                    classNames: ["event-shop-card-multi-purchase-modal"],
                    eventShopService: s.Ember.inject.service("event-shop"),
                    purchaseInProgress: !1,
                    disableButtonState: !1,
                    notEnoughRp: !1,
                    offerPurchased: !1,
                    offer: null,
                    isPurchaseDisabled: s.Ember.computed.or("disableButtonState", "purchaseInProgress", "validationError"),
                    tokenImageSrc: s.Ember.computed.alias("eventShopService.tokenShopData.tokenImage"),
                    currentTokenBalance: s.Ember.computed.alias("eventShopService.tokenBalance"),
                    shouldRenderMultiPurchaseSlider: s.Ember.computed("offer.maxQuantity", (function() {
                        return this.get("offer.maxQuantity") > 1
                    })),
                    purchaseConstraints: s.Ember.computed("offer", (function() {
                        return (0, o.getOfferPurchaseConstraints)(this.get("offer"))
                    })),
                    minPurchasableQuantity: s.Ember.computed.alias("purchaseConstraints.min"),
                    maxPurchasableQuantity: s.Ember.computed.alias("purchaseConstraints.max"),
                    purchaseQuantity: s.Ember.computed("offer", "purchaseConstraints", "selectedQuantity", (function() {
                        const e = this.get("purchaseConstraints.getPurchaseQuantityFromSelectedQuantity")(this.get("selectedQuantity"));
                        return e || 1
                    })),
                    purchasePrice: s.Ember.computed("validationError", "purchaseConstraints", "purchaseQuantity", (function() {
                        return this.get("validationError") ? this.get("purchaseConstraints.price") : this.get("purchaseQuantity") * this.get("purchaseConstraints.price")
                    })),
                    futureTokenBalance: s.Ember.computed("currentTokenBalance", "purchaseConstraints", "purchaseQuantity", (function() {
                        return this.get("currentTokenBalance") - this.get("purchaseQuantity") * this.get("purchaseConstraints.price")
                    })),
                    selectedQuantity: null,
                    validationError: null,
                    init() {
                        this._super(...arguments), this.notEnoughRp = this.get("offer.offerState") === a.OFFER_STATES.UNAVAILABLE, this.offerPurchased = this.get("offer.offerState") === a.OFFER_STATES.OWNED, this.disableButtonState = this.notEnoughRp || this.offerPurchased, this.purchaseInProgress = this.get("offer.offerState") === a.OFFER_STATES.PURCHASING
                    },
                    showPostPurchaseConfirmation() {
                        const e = s.UIKit.getTemplateHelper().contentBlockDialog(this.get("tra.event_shop_card_purchase_confirmation_header"), this.get("tra.event_shop_card_purchase_confirmation_body"));
                        s.UIKit.getModalManager().add({
                            type: "DialogAlert",
                            data: {
                                contents: e,
                                okText: this.get("tra.event_shop_card_purchase_confirmation_done")
                            }
                        })
                    },
                    showGeneralErrorModal() {
                        const e = s.UIKit.getTemplateHelper().contentBlockDialog(this.get("tra.event_shop_generic_purchase_error_header"), this.get("tra.event_shop_generic_purchase_error_body"));
                        s.UIKit.getModalManager().add({
                            type: "DialogAlert",
                            data: {
                                contents: e,
                                okText: this.get("tra.event_shop_modal_ok_button")
                            }
                        })
                    },
                    executePurchase({
                        id: e
                    }) {
                        return s.Telemetry.sendCustomData(a.TELEMETRY.TABLE, {
                            eventName: a.TELEMETRY.PURCHASE_OFFER_EVENT,
                            eventShopEventId: this.get("eventShopService.info.eventId"),
                            clickedOffer: e,
                            tokenBalance: this.get("currentTokenBalance")
                        }), this.get("eventShopService").purchaseOffer(e, this.get("purchaseQuantity")).then((() => {
                            s.AudioPlugin.getChannel("sfx-ui").playSound("/fe/lol-static-assets/sounds/sfx-yourshop-stinger.ogg"), this.showPostPurchaseConfirmation(), this.closeModal()
                        })).catch((t => {
                            s.logger.error(`Failure purchasing offer id: ${e}`, t), this.closeModal(), this.showGeneralErrorModal()
                        }))
                    },
                    actions: {
                        purchaseOffer(e) {
                            !this.get("isPurchaseDisabled") && e && (this.set("purchaseInProgress", !0), this.executePurchase(e))
                        },
                        handleValidationChange(e) {
                            this.set("validationError", e)
                        },
                        handleSelectedQuantityChange(e) {
                            this.set("selectedQuantity", e)
                        }
                    }
                });
            t.default = l
        }, (e, t) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.getOfferPurchaseConstraints = t.getCategoryOffersId = t.default = void 0;
            const n = e => `event_shop_offers_category_${e.toLowerCase()}`;
            t.getCategoryOffersId = n;
            const s = e => {
                if (1 === e.items.length) {
                    const t = e.items[0];
                    return {
                        min: t.quantity,
                        max: t.quantity * e.maxQuantity,
                        getPurchaseQuantityFromSelectedQuantity: e => 0 === t.quantity ? 0 : e / t.quantity,
                        price: e.price
                    }
                }
                return {
                    min: 1,
                    max: e.maxQuantity,
                    getPurchaseQuantityFromSelectedQuantity: e => e,
                    price: e.price
                }
            };
            t.getOfferPurchaseConstraints = s;
            var a = {
                getCategoryOffersId: n,
                getOfferPurchaseConstraints: s
            };
            t.default = a
        }, (e, t, n) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = void 0;
            var s = n(1).Ember.Component.extend({
                classNames: ["event-shop-category-nav-bar"]
            });
            t.default = s
        }, (e, t, n) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = void 0;
            var s = n(1),
                a = n(7),
                o = n(12),
                l = s.Ember.Component.extend({
                    classNames: ["event-shop-nav-bar-tab"],
                    classNameBindings: ["isTabSelected:event-shop-nav-bar-tab-selected"],
                    scrollToCategory: null,
                    isTabSelected: s.Ember.computed("currentCategory", (function() {
                        return this.get("currentCategory") === this.get("category")
                    })),
                    categoryTra: s.Ember.computed("category", (function() {
                        return this.get(`tra.${(0,o.getCategoryOffersId)(this.category)}_tooltip`)
                    })),
                    click() {
                        this.scrollToCategory(this.get("category")), s.Telemetry.sendCustomData(a.TELEMETRY.TABLE, {
                            eventName: a.TELEMETRY.CATEGORY_NAV_BAR_CLICK_EVENT,
                            eventShopEventId: this.get("eventShopService.info.eventId"),
                            clickedCategory: this.get("category")
                        })
                    }
                });
            t.default = l
        }, (e, t, n) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = void 0;
            var s = n(1),
                a = n(7),
                o = n(12),
                l = s.Ember.Component.extend({
                    classNames: ["event-shop-category-offers"],
                    categoryOffersId: s.Ember.computed("categoryOffers.category", (function() {
                        return (0, o.getCategoryOffersId)(this.get("categoryOffers.category"))
                    })),
                    didInsertElement() {
                        this._super(...arguments);
                        const e = this.element.querySelectorAll(`.${a.EVENT_SHOP_OFFER_CARD_CONTAINER_CLASSNAME}`);
                        this.configureOfferCardsObservers(e)
                    },
                    configureOfferCardsObservers(e) {
                        e.length && (this.observeElementIntersection(e[0]), this.observeElementIntersection(e[e.length - 1]))
                    },
                    observeElementIntersection(e) {
                        e.category = this.get("categoryOffers.category"), this.headerTxtObserver.observe(e)
                    }
                });
            t.default = l
        }, (e, t, n) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = void 0;
            var s = n(1),
                a = s.Ember.Component.extend({
                    classNames: ["event-shop-fallback"],
                    tra: s.tra,
                    error: null,
                    errorMessageTra: s.Ember.computed("error", (function() {
                        return {
                            title: this.get(`tra.${this.get("error.errorId")}_title`),
                            description: this.get(`tra.${this.get("error.errorId")}_description`)
                        }
                    }))
                });
            t.default = a
        }, (e, t, n) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = void 0;
            var s = n(1).Ember.Component.extend({
                classNames: ["event-shop-main-view"],
                isRewardTrackMinimized: !1,
                actions: {
                    minimizeRewardTrack() {
                        this.sendAction("toggleMinimizeRewardTrack")
                    }
                }
            });
            t.default = s
        }, (e, t, n) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = void 0;
            var s = n(1),
                a = n(7);
            const o = n(19);
            var l = s.Ember.Component.extend({
                classNames: [a.EVENT_SHOP_OFFER_CARD_CONTAINER_CLASSNAME],
                classNameBindings: ["offer.highlighted:event-shop-token-shop-highlighted-card", "isOfferOwned:event-shop-token-shop-card-owned", "isOfferAvailable:event-shop-token-shop-card-available", "isOfferUnavailable:event-shop-token-shop-card-unavailable"],
                offer: null,
                eventShopService: s.Ember.inject.service("event-shop"),
                tooltipManager: s.UIKit.getTooltipManager(),
                isMouseOver: !1,
                tokenShopData: s.Ember.computed.alias("eventShopService.tokenShopData"),
                tokenBalance: s.Ember.computed.alias("eventShopService.tokenBalance"),
                requiredTokens: s.Ember.computed("offer.price", "tokenBalance", (function() {
                    return this.get("offer.price") - this.get("tokenBalance")
                })),
                isPurchasing: s.Ember.computed("offer.offerState", (function() {
                    return this.get("offer.offerState") === a.OFFER_STATES.PURCHASING
                })),
                isOfferRevealed: s.Ember.computed("offer.offerState", (function() {
                    return this.get("offer.offerState") !== a.OFFER_STATES.UNREVEALED
                })),
                isOfferOwned: s.Ember.computed("offer.offerState", (function() {
                    return this.get("offer.offerState") === a.OFFER_STATES.OWNED
                })),
                isOfferAvailable: s.Ember.computed("offer.offerState", (function() {
                    return this.get("offer.offerState") === a.OFFER_STATES.AVAILABLE
                })),
                isOfferUnavailable: s.Ember.computed("offer.offerState", (function() {
                    return this.get("offer.offerState") === a.OFFER_STATES.UNAVAILABLE
                })),
                shouldRenderOfferItemsCount: s.Ember.computed("offer", (function() {
                    return this.get("offer.items.length") > 1
                })),
                offerImage: s.Ember.computed("offer.image", (function() {
                    const e = this.get("offer.image");
                    return e && "/lol-game-data/assets/" !== e ? e : "/fe/lol-static-assets/images/event-shop/icon-shocked-poro-clear.png"
                })),
                displayMultiPurchaseModal: !1,
                didInsertElement() {
                    this._super(...arguments), this.priceDivTarget = this.element.querySelector("div.event-shop-token-shop-offer-card-price-value");
                    const e = {
                            root: document.querySelector("#token-shop-scrollable-container"),
                            rootMargin: "0px",
                            threshold: .7
                        },
                        t = new IntersectionObserver((e => this.enableTooltip(e)), e),
                        n = this.element;
                    t.observe(n), this.renderTooltip(), this.addObserver("requiredTokens", this.renderTooltip)
                },
                willDestroyElement() {
                    this.removeObserver("requiredTokens")
                },
                renderTooltip() {
                    if (this.get("tooltipManager").unassign(this.priceDivTarget), this.get("isOfferUnavailable")) {
                        const e = this.renderTooltipContainer(o);
                        this.get("tooltipManager").assign(this.priceDivTarget, e, {}, {
                            targetAnchor: {
                                x: "center",
                                y: "bottom"
                            },
                            positioningStrategy: "flip"
                        })
                    }
                },
                renderTooltipContainer(e) {
                    let t = this.get("tra.event_shop_progression_label_more_tokens");
                    1 === this.get("requiredTokens") && (t = this.get("tra.event_shop_progression_label_one_more_token"));
                    const n = e({
                            youNeedText: this.get("tra.event_shop_card_purchase_you_need"),
                            requiredTokens: this.get("requiredTokens"),
                            moreTokensText: t,
                            unlockText: this.get("tra.event_shop_card_purchase_to_unlock")
                        }),
                        s = document.createElement("div");
                    return s.innerHTML = n, s
                },
                enableTooltip(e) {
                    for (let t = 0; t < e.length; t++) {
                        const n = e[t];
                        this.get("isOfferUnavailable") && (n.isIntersecting ? (this.get("tooltipManager").enable(this.priceDivTarget), this.isMouseOver && this.get("tooltipManager").show(this.priceDivTarget)) : this.get("tooltipManager").disable(this.priceDivTarget))
                    }
                },
                mouseEnter() {
                    this.isMouseOver = !0, this.get("isOfferUnavailable") && this.get("tooltipManager").show(this.priceDivTarget)
                },
                mouseLeave() {
                    this.isMouseOver = !1, this.get("tooltipManager").hide(this.priceDivTarget)
                },
                click() {
                    this.get("isOfferRevealed") && this.showModal(this.get("offer"))
                },
                showModal(e) {
                    return s.Telemetry.sendCustomData(a.TELEMETRY.TABLE, {
                        eventName: a.TELEMETRY.OPEN_OFFER_CARD_EVENT,
                        eventShopEventId: this.get("eventShopService.info.eventId"),
                        clickedOffer: e.id,
                        tokenBalance: this.get("eventShopService.info.currentTokenBalance")
                    }), this.set("displayMultiPurchaseModal", !0)
                },
                actions: {
                    closeModal() {
                        this.set("displayMultiPurchaseModal", !1)
                    }
                }
            });
            t.default = l
        }, (e, t, n) => {
            var s = n(20);
            e.exports = (s.default || s).template({
                compiler: [7, ">= 4.0.0"],
                main: function(e, t, n, s, a) {
                    var o, l = null != t ? t : e.nullContext || {},
                        r = n.helperMissing,
                        i = "function",
                        c = e.escapeExpression;
                    return '<lol-uikit-tooltip>\r\n  <lol-uikit-content-block class="event-shop-xp-tooltip-content" type="tooltip-system">\r\n    <div class="event-shop-progression-tooltip-block">\r\n      <p>\r\n        ' + c(typeof(o = null != (o = n.youNeedText || (null != t ? t.youNeedText : t)) ? o : r) === i ? o.call(l, {
                        name: "youNeedText",
                        hash: {},
                        data: a
                    }) : o) + "<span class='event-shop-progression-tooltip-block-bold'> " + c(typeof(o = null != (o = n.requiredTokens || (null != t ? t.requiredTokens : t)) ? o : r) === i ? o.call(l, {
                        name: "requiredTokens",
                        hash: {},
                        data: a
                    }) : o) + " " + c(typeof(o = null != (o = n.moreTokensText || (null != t ? t.moreTokensText : t)) ? o : r) === i ? o.call(l, {
                        name: "moreTokensText",
                        hash: {},
                        data: a
                    }) : o) + " </span>" + c(typeof(o = null != (o = n.unlockText || (null != t ? t.unlockText : t)) ? o : r) === i ? o.call(l, {
                        name: "unlockText",
                        hash: {},
                        data: a
                    }) : o) + "\r\n      </p>\r\n    </div>\r\n  </lol-uikit-content-block>\r\n</lol-uikit-tooltip>"
                },
                useData: !0
            })
        }, (e, t, n) => {
            e.exports = n(21).default
        }, (e, t, n) => {
            "use strict";

            function s(e) {
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
            var o = a(n(22)),
                l = s(n(36)),
                r = s(n(24)),
                i = a(n(23)),
                c = a(n(37)),
                p = s(n(38));

            function d() {
                var e = new o.HandlebarsEnvironment;
                return i.extend(e, o), e.SafeString = l.default, e.Exception = r.default, e.Utils = i, e.escapeExpression = i.escapeExpression, e.VM = c, e.template = function(t) {
                    return c.template(t, e)
                }, e
            }
            var u = d();
            u.create = d, p.default(u), u.default = u, t.default = u, e.exports = t.default
        }, (e, t, n) => {
            "use strict";

            function s(e) {
                return e && e.__esModule ? e : {
                    default: e
                }
            }
            t.__esModule = !0, t.HandlebarsEnvironment = p;
            var a = n(23),
                o = s(n(24)),
                l = n(25),
                r = n(33),
                i = s(n(35));
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

            function p(e, t, n) {
                this.helpers = e || {}, this.partials = t || {}, this.decorators = n || {}, l.registerDefaultHelpers(this), r.registerDefaultDecorators(this)
            }
            p.prototype = {
                constructor: p,
                logger: i.default,
                log: i.default.log,
                registerHelper: function(e, t) {
                    if (a.toString.call(e) === c) {
                        if (t) throw new o.default("Arg not supported with multiple helpers");
                        a.extend(this.helpers, e)
                    } else this.helpers[e] = t
                },
                unregisterHelper: function(e) {
                    delete this.helpers[e]
                },
                registerPartial: function(e, t) {
                    if (a.toString.call(e) === c) a.extend(this.partials, e);
                    else {
                        if (void 0 === t) throw new o.default('Attempting to register a partial called "' + e + '" as undefined');
                        this.partials[e] = t
                    }
                },
                unregisterPartial: function(e) {
                    delete this.partials[e]
                },
                registerDecorator: function(e, t) {
                    if (a.toString.call(e) === c) {
                        if (t) throw new o.default("Arg not supported with multiple decorators");
                        a.extend(this.decorators, e)
                    } else this.decorators[e] = t
                },
                unregisterDecorator: function(e) {
                    delete this.decorators[e]
                }
            };
            var d = i.default.log;
            t.log = d, t.createFrame = a.createFrame, t.logger = i.default
        }, (e, t) => {
            "use strict";
            t.__esModule = !0, t.extend = l, t.indexOf = function(e, t) {
                for (var n = 0, s = e.length; n < s; n++)
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
                return e.replace(s, o)
            }, t.isEmpty = function(e) {
                return !e && 0 !== e || !(!c(e) || 0 !== e.length)
            }, t.createFrame = function(e) {
                var t = l({}, e);
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
                s = /[&<>"'`=]/g,
                a = /[&<>"'`=]/;

            function o(e) {
                return n[e]
            }

            function l(e) {
                for (var t = 1; t < arguments.length; t++)
                    for (var n in arguments[t]) Object.prototype.hasOwnProperty.call(arguments[t], n) && (e[n] = arguments[t][n]);
                return e
            }
            var r = Object.prototype.toString;
            t.toString = r;
            var i = function(e) {
                return "function" == typeof e
            };
            i(/x/) && (t.isFunction = i = function(e) {
                return "function" == typeof e && "[object Function]" === r.call(e)
            }), t.isFunction = i;
            var c = Array.isArray || function(e) {
                return !(!e || "object" != typeof e) && "[object Array]" === r.call(e)
            };
            t.isArray = c
        }, (e, t) => {
            "use strict";
            t.__esModule = !0;
            var n = ["description", "fileName", "lineNumber", "message", "name", "number", "stack"];

            function s(e, t) {
                var a = t && t.loc,
                    o = void 0,
                    l = void 0;
                a && (e += " - " + (o = a.start.line) + ":" + (l = a.start.column));
                for (var r = Error.prototype.constructor.call(this, e), i = 0; i < n.length; i++) this[n[i]] = r[n[i]];
                Error.captureStackTrace && Error.captureStackTrace(this, s);
                try {
                    a && (this.lineNumber = o, Object.defineProperty ? Object.defineProperty(this, "column", {
                        value: l,
                        enumerable: !0
                    }) : this.column = l)
                } catch (e) {}
            }
            s.prototype = new Error, t.default = s, e.exports = t.default
        }, (e, t, n) => {
            "use strict";

            function s(e) {
                return e && e.__esModule ? e : {
                    default: e
                }
            }
            t.__esModule = !0, t.registerDefaultHelpers = function(e) {
                a.default(e), o.default(e), l.default(e), r.default(e), i.default(e), c.default(e), p.default(e)
            };
            var a = s(n(26)),
                o = s(n(27)),
                l = s(n(28)),
                r = s(n(29)),
                i = s(n(30)),
                c = s(n(31)),
                p = s(n(32))
        }, (e, t, n) => {
            "use strict";
            t.__esModule = !0;
            var s = n(23);
            t.default = function(e) {
                e.registerHelper("blockHelperMissing", (function(t, n) {
                    var a = n.inverse,
                        o = n.fn;
                    if (!0 === t) return o(this);
                    if (!1 === t || null == t) return a(this);
                    if (s.isArray(t)) return t.length > 0 ? (n.ids && (n.ids = [n.name]), e.helpers.each(t, n)) : a(this);
                    if (n.data && n.ids) {
                        var l = s.createFrame(n.data);
                        l.contextPath = s.appendContextPath(n.data.contextPath, n.name), n = {
                            data: l
                        }
                    }
                    return o(t, n)
                }))
            }, e.exports = t.default
        }, (e, t, n) => {
            "use strict";
            t.__esModule = !0;
            var s, a = n(23),
                o = n(24),
                l = (s = o) && s.__esModule ? s : {
                    default: s
                };
            t.default = function(e) {
                e.registerHelper("each", (function(e, t) {
                    if (!t) throw new l.default("Must pass iterator to #each");
                    var n = t.fn,
                        s = t.inverse,
                        o = 0,
                        r = "",
                        i = void 0,
                        c = void 0;

                    function p(t, s, o) {
                        i && (i.key = t, i.index = s, i.first = 0 === s, i.last = !!o, c && (i.contextPath = c + t)), r += n(e[t], {
                            data: i,
                            blockParams: a.blockParams([e[t], t], [c + t, null])
                        })
                    }
                    if (t.data && t.ids && (c = a.appendContextPath(t.data.contextPath, t.ids[0]) + "."), a.isFunction(e) && (e = e.call(this)), t.data && (i = a.createFrame(t.data)), e && "object" == typeof e)
                        if (a.isArray(e))
                            for (var d = e.length; o < d; o++) o in e && p(o, o, o === e.length - 1);
                        else {
                            var u = void 0;
                            for (var m in e) e.hasOwnProperty(m) && (void 0 !== u && p(u, o - 1), u = m, o++);
                            void 0 !== u && p(u, o - 1, !0)
                        } return 0 === o && (r = s(this)), r
                }))
            }, e.exports = t.default
        }, (e, t, n) => {
            "use strict";
            t.__esModule = !0;
            var s, a = n(24),
                o = (s = a) && s.__esModule ? s : {
                    default: s
                };
            t.default = function(e) {
                e.registerHelper("helperMissing", (function() {
                    if (1 !== arguments.length) throw new o.default('Missing helper: "' + arguments[arguments.length - 1].name + '"')
                }))
            }, e.exports = t.default
        }, (e, t, n) => {
            "use strict";
            t.__esModule = !0;
            var s = n(23);
            t.default = function(e) {
                e.registerHelper("if", (function(e, t) {
                    return s.isFunction(e) && (e = e.call(this)), !t.hash.includeZero && !e || s.isEmpty(e) ? t.inverse(this) : t.fn(this)
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
                    for (var t = [void 0], n = arguments[arguments.length - 1], s = 0; s < arguments.length - 1; s++) t.push(arguments[s]);
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
            var s = n(23);
            t.default = function(e) {
                e.registerHelper("with", (function(e, t) {
                    s.isFunction(e) && (e = e.call(this));
                    var n = t.fn;
                    if (s.isEmpty(e)) return t.inverse(this);
                    var a = t.data;
                    return t.data && t.ids && ((a = s.createFrame(t.data)).contextPath = s.appendContextPath(t.data.contextPath, t.ids[0])), n(e, {
                        data: a,
                        blockParams: s.blockParams([e], [a && a.contextPath])
                    })
                }))
            }, e.exports = t.default
        }, (e, t, n) => {
            "use strict";
            t.__esModule = !0, t.registerDefaultDecorators = function(e) {
                o.default(e)
            };
            var s, a = n(34),
                o = (s = a) && s.__esModule ? s : {
                    default: s
                }
        }, (e, t, n) => {
            "use strict";
            t.__esModule = !0;
            var s = n(23);
            t.default = function(e) {
                e.registerDecorator("inline", (function(e, t, n, a) {
                    var o = e;
                    return t.partials || (t.partials = {}, o = function(a, o) {
                        var l = n.partials;
                        n.partials = s.extend({}, l, t.partials);
                        var r = e(a, o);
                        return n.partials = l, r
                    }), t.partials[a.args[0]] = a.fn, o
                }))
            }, e.exports = t.default
        }, (e, t, n) => {
            "use strict";
            t.__esModule = !0;
            var s = n(23),
                a = {
                    methodMap: ["debug", "info", "warn", "error"],
                    level: "info",
                    lookupLevel: function(e) {
                        if ("string" == typeof e) {
                            var t = s.indexOf(a.methodMap, e.toLowerCase());
                            e = t >= 0 ? t : parseInt(e, 10)
                        }
                        return e
                    },
                    log: function(e) {
                        if (e = a.lookupLevel(e), "undefined" != typeof console && a.lookupLevel(a.level) <= e) {
                            var t = a.methodMap[e];
                            console[t] || (t = "log");
                            for (var n = arguments.length, s = Array(n > 1 ? n - 1 : 0), o = 1; o < n; o++) s[o - 1] = arguments[o];
                            console[t].apply(console, s)
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
                    n = r.COMPILER_REVISION;
                if (t !== n) {
                    if (t < n) {
                        var s = r.REVISION_CHANGES[n],
                            a = r.REVISION_CHANGES[t];
                        throw new l.default("Template was precompiled with an older version of Handlebars than the current runtime. Please update your precompiler to a newer version (" + s + ") or downgrade your runtime to an older version (" + a + ").")
                    }
                    throw new l.default("Template was precompiled with a newer version of Handlebars than the current runtime. Please update your runtime to a newer version (" + e[1] + ").")
                }
            }, t.template = function(e, t) {
                if (!t) throw new l.default("No environment passed to template");
                if (!e || !e.main) throw new l.default("Unknown template object: " + typeof e);
                e.main.decorator = e.main_d, t.VM.checkRevision(e.compiler);
                var n = {
                    strict: function(e, t) {
                        if (!(t in e)) throw new l.default('"' + t + '" not defined in ' + e);
                        return e[t]
                    },
                    lookup: function(e, t) {
                        for (var n = e.length, s = 0; s < n; s++)
                            if (e[s] && null != e[s][t]) return e[s][t]
                    },
                    lambda: function(e, t) {
                        return "function" == typeof e ? e.call(t) : e
                    },
                    escapeExpression: a.escapeExpression,
                    invokePartial: function(n, s, o) {
                        o.hash && (s = a.extend({}, s, o.hash), o.ids && (o.ids[0] = !0)), n = t.VM.resolvePartial.call(this, n, s, o);
                        var r = t.VM.invokePartial.call(this, n, s, o);
                        if (null == r && t.compile && (o.partials[o.name] = t.compile(n, e.compilerOptions, t), r = o.partials[o.name](s, o)), null != r) {
                            if (o.indent) {
                                for (var i = r.split("\n"), c = 0, p = i.length; c < p && (i[c] || c + 1 !== p); c++) i[c] = o.indent + i[c];
                                r = i.join("\n")
                            }
                            return r
                        }
                        throw new l.default("The partial " + o.name + " could not be compiled when running in runtime-only mode")
                    },
                    fn: function(t) {
                        var n = e[t];
                        return n.decorator = e[t + "_d"], n
                    },
                    programs: [],
                    program: function(e, t, n, s, a) {
                        var o = this.programs[e],
                            l = this.fn(e);
                        return t || a || s || n ? o = i(this, e, l, t, n, s, a) : o || (o = this.programs[e] = i(this, e, l)), o
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

                function s(t) {
                    var a = arguments.length <= 1 || void 0 === arguments[1] ? {} : arguments[1],
                        o = a.data;
                    s._setup(a), !a.partial && e.useData && (o = function(e, t) {
                        t && "root" in t || ((t = t ? r.createFrame(t) : {}).root = e);
                        return t
                    }(t, o));
                    var l = void 0,
                        i = e.useBlockParams ? [] : void 0;

                    function c(t) {
                        return "" + e.main(n, t, n.helpers, n.partials, o, i, l)
                    }
                    return e.useDepths && (l = a.depths ? t != a.depths[0] ? [t].concat(a.depths) : a.depths : [t]), (c = p(e.main, c, n, a.depths || [], o, i))(t, a)
                }
                return s.isTop = !0, s._setup = function(s) {
                    s.partial ? (n.helpers = s.helpers, n.partials = s.partials, n.decorators = s.decorators) : (n.helpers = n.merge(s.helpers, t.helpers), e.usePartial && (n.partials = n.merge(s.partials, t.partials)), (e.usePartial || e.useDecorators) && (n.decorators = n.merge(s.decorators, t.decorators)))
                }, s._child = function(t, s, a, o) {
                    if (e.useBlockParams && !a) throw new l.default("must pass block params");
                    if (e.useDepths && !o) throw new l.default("must pass parent depths");
                    return i(n, t, e[t], s, 0, a, o)
                }, s
            }, t.wrapProgram = i, t.resolvePartial = function(e, t, n) {
                e ? e.call || n.name || (n.name = e, e = n.partials[e]) : e = "@partial-block" === n.name ? n.data["partial-block"] : n.partials[n.name];
                return e
            }, t.invokePartial = function(e, t, n) {
                var s = n.data && n.data["partial-block"];
                n.partial = !0, n.ids && (n.data.contextPath = n.ids[0] || n.data.contextPath);
                var o = void 0;
                n.fn && n.fn !== c && function() {
                    n.data = r.createFrame(n.data);
                    var e = n.fn;
                    o = n.data["partial-block"] = function(t) {
                        var n = arguments.length <= 1 || void 0 === arguments[1] ? {} : arguments[1];
                        return n.data = r.createFrame(n.data), n.data["partial-block"] = s, e(t, n)
                    }, e.partials && (n.partials = a.extend({}, n.partials, e.partials))
                }();
                void 0 === e && o && (e = o);
                if (void 0 === e) throw new l.default("The partial " + n.name + " could not be found");
                if (e instanceof Function) return e(t, n)
            }, t.noop = c;
            var s, a = function(e) {
                    if (e && e.__esModule) return e;
                    var t = {};
                    if (null != e)
                        for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
                    return t.default = e, t
                }(n(23)),
                o = n(24),
                l = (s = o) && s.__esModule ? s : {
                    default: s
                },
                r = n(22);

            function i(e, t, n, s, a, o, l) {
                function r(t) {
                    var a = arguments.length <= 1 || void 0 === arguments[1] ? {} : arguments[1],
                        r = l;
                    return !l || t == l[0] || t === e.nullContext && null === l[0] || (r = [t].concat(l)), n(e, t, e.helpers, e.partials, a.data || s, o && [a.blockParams].concat(o), r)
                }
                return (r = p(n, r, e, l, s, o)).program = t, r.depth = l ? l.length : 0, r.blockParams = a || 0, r
            }

            function c() {
                return ""
            }

            function p(e, t, n, s, o, l) {
                if (e.decorator) {
                    var r = {};
                    t = e.decorator(t, r, n, s && s[0], o, l, s), a.extend(t, r)
                }
                return t
            }
        }, (e, t, n) => {
            "use strict";
            t.__esModule = !0, t.default = function(e) {
                var t = void 0 !== n.g ? n.g : window,
                    s = t.Handlebars;
                e.noConflict = function() {
                    return t.Handlebars === e && (t.Handlebars = s), e
                }
            }, e.exports = t.default
        }, (e, t, n) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = void 0;
            var s = n(1),
                a = n(7);
            const o = n(40);
            var l = s.Ember.Component.extend({
                classNames: ["event-shop-page-header"],
                eventShopService: s.Ember.inject.service("event-shop"),
                eventDetailsData: s.Ember.computed.alias("eventShopService.eventDetailsData"),
                isGracePeriod: s.Ember.computed.alias("eventShopService.isGracePeriod"),
                tokenImage: s.Ember.computed.alias("eventShopService.tokenShopData.tokenImage"),
                tokenBundlesCatalogEntry: s.Ember.computed.alias("eventShopService.tokenShopData.tokenBundlesCatalogEntry"),
                storeItems: s.Ember.computed("tokenBundlesCatalogEntry", (function() {
                    return this.get("tokenBundlesCatalogEntry").map((e => ({
                        itemId: e.itemId,
                        inventoryType: "BUNDLES"
                    })))
                })),
                remainingTimeTextProps: s.Ember.computed("isGracePeriod", (function() {
                    return this.get("isGracePeriod") ? {
                        almostEndingText: this.get("tra.event_shop_page_header_shop_almost_closing"),
                        wrappingText: this.get("tra.event_shop_page_header_shop_closes_in"),
                        endDateTime: this.get("eventDetailsData.shopEndDate")
                    } : {
                        almostEndingText: this.get("tra.event_shop_page_header_event_almost_ending"),
                        wrappingText: this.get("tra.event_shop_page_header_event_ends_in"),
                        endDateTime: this.get("eventDetailsData.progressEndDate")
                    }
                })),
                progressEndDateFullText: s.Ember.computed("eventDetailsData", "tra.metadata.locale", (function() {
                    const e = this.get("tra.metadata.locale.id"),
                        t = this.getLocaleFromTraLocaleId(e);
                    return this.getEndTimerTooltipText(this.get("eventDetailsData").progressEndDate, t)
                })),
                shopEndDateFullText: s.Ember.computed("eventDetailsData", "tra.metadata.locale", (function() {
                    const e = this.get("tra.metadata.locale.id"),
                        t = this.getLocaleFromTraLocaleId(e);
                    return this.getEndTimerTooltipText(this.get("eventDetailsData").shopEndDate, t)
                })),
                renderHelpContainer(e) {
                    const t = e({
                            helpModalTitle: this.get("tra.event_shop_help_modal_title"),
                            introText: this.get("tra.event_shop_help_modal_text_description_intro"),
                            eventIconPath: this.get("eventDetailsData.eventIconPath"),
                            eventName: this.get("eventDetailsData.eventName"),
                            helpModalImagePath: this.get("eventDetailsData.helpModalImagePath"),
                            earnTokensText: this.get("tra.event_shop_help_modal_earn_tokens"),
                            earnTokensDescriptionText: this.get("tra.event_shop_help_modal_earn_tokens_description"),
                            redeemTokensText: this.get("tra.event_shop_help_modal_redeem_tokens"),
                            redeemTokensDescriptionText: this.get("tra.event_shop_help_modal_redeem_tokens_description"),
                            upgradePassText: this.get("tra.event_shop_help_modal_upgrade_pass"),
                            upgradePassDescriptionText: this.get("tra.event_shop_help_modal_upgrade_pass_description")
                        }),
                        n = document.createElement("div");
                    return n.innerHTML = t, n
                },
                getLocaleFromTraLocaleId: (e = "") => e.toLowerCase().replace("_", "-"),
                getEndTimerTooltipText(e, t) {
                    const n = new Date(e),
                        a = n.toLocaleDateString(t, {
                            dateStyle: "medium"
                        }),
                        o = n.toLocaleTimeString(t, {
                            timeZoneName: "short",
                            hour: "numeric",
                            minute: "numeric"
                        });
                    return s.tra.formatString("event_shop_page_header_time_tooltip_date_string", {
                        dateText: a,
                        timeText: o
                    })
                },
                actions: {
                    showHelpModal() {
                        s.UIKit.getModalManager().add({
                            type: "DialogConfirm",
                            data: {
                                contents: this.renderHelpContainer(o),
                                acceptText: this.get("tra.event_shop_help_modal_okay_button"),
                                closeButton: !0
                            }
                        })
                    },
                    navigateToStore() {
                        s.Telemetry.sendCustomData(a.TELEMETRY.TABLE, {
                            eventName: a.TELEMETRY.PURCHASE_TOKENS_CLICK_EVENT,
                            eventShopEventId: this.get("eventShopService.info.eventId"),
                            lockedTokens: this.get("eventShopService.info.lockedTokenCount"),
                            tokenBalance: this.get("eventShopService.info.currentTokenBalance")
                        }), s.Router.navigateTo("rcp-fe-lol-store", {
                            page: "hextech",
                            items: this.get("storeItems")
                        })
                    }
                }
            });
            t.default = l
        }, (e, t, n) => {
            var s = n(20);
            e.exports = (s.default || s).template({
                compiler: [7, ">= 4.0.0"],
                main: function(e, t, n, s, a) {
                    var o, l = null != t ? t : e.nullContext || {},
                        r = n.helperMissing,
                        i = "function",
                        c = e.escapeExpression;
                    return '<lol-uikit-content-block type="dialog-large" id="event-shop-help-modal">\r\n  <div class="event-shop-help-modal-top">\r\n    <div class="event-shop-help-modal-event-name">\r\n      <img class="event-shop-help-modal-logo" src=' + c(typeof(o = null != (o = n.eventIconPath || (null != t ? t.eventIconPath : t)) ? o : r) === i ? o.call(l, {
                        name: "eventIconPath",
                        hash: {},
                        data: a
                    }) : o) + " />\r\n      " + c(typeof(o = null != (o = n.eventName || (null != t ? t.eventName : t)) ? o : r) === i ? o.call(l, {
                        name: "eventName",
                        hash: {},
                        data: a
                    }) : o) + '\r\n    </div>\r\n    <div class="event-shop-help-modal-title">' + c(typeof(o = null != (o = n.helpModalTitle || (null != t ? t.helpModalTitle : t)) ? o : r) === i ? o.call(l, {
                        name: "helpModalTitle",
                        hash: {},
                        data: a
                    }) : o) + '</div>\r\n    <hr class="heading-spacer" />\r\n  </div>\r\n  <div class="event-shop-help-modal-mid">\r\n    <img class="event-shop-help-modal-image" src=' + c(typeof(o = null != (o = n.helpModalImagePath || (null != t ? t.helpModalImagePath : t)) ? o : r) === i ? o.call(l, {
                        name: "helpModalImagePath",
                        hash: {},
                        data: a
                    }) : o) + ' />\r\n  </div>\r\n  <div class="event-shop-help-modal-bot">\r\n    <div class="event-shop-help-modal-bot-containers">\r\n      <div class="event-shop-help-modal-icons event-shop-help-modal-icon-loot"></div>\r\n      <div class="event-shop-help-modal-topic">' + c(typeof(o = null != (o = n.earnTokensText || (null != t ? t.earnTokensText : t)) ? o : r) === i ? o.call(l, {
                        name: "earnTokensText",
                        hash: {},
                        data: a
                    }) : o) + '</div>\r\n      <div class="event-shop-help-description">' + c(typeof(o = null != (o = n.earnTokensDescriptionText || (null != t ? t.earnTokensDescriptionText : t)) ? o : r) === i ? o.call(l, {
                        name: "earnTokensDescriptionText",
                        hash: {},
                        data: a
                    }) : o) + '</div>\r\n    </div>\r\n    <div class="event-shop-help-modal-vertical-divider"></div>\r\n    <div class="event-shop-help-modal-bot-containers">\r\n      <div class="event-shop-help-modal-icons event-shop-help-modal-icon-currency"></div>\r\n      <div class="event-shop-help-modal-topic">' + c(typeof(o = null != (o = n.redeemTokensText || (null != t ? t.redeemTokensText : t)) ? o : r) === i ? o.call(l, {
                        name: "redeemTokensText",
                        hash: {},
                        data: a
                    }) : o) + '</div>\r\n      <div class="event-shop-help-description">' + c(typeof(o = null != (o = n.redeemTokensDescriptionText || (null != t ? t.redeemTokensDescriptionText : t)) ? o : r) === i ? o.call(l, {
                        name: "redeemTokensDescriptionText",
                        hash: {},
                        data: a
                    }) : o) + '</div>\r\n    </div>\r\n    <div class="event-shop-help-modal-vertical-divider"></div>\r\n    <div class="event-shop-help-modal-bot-containers">\r\n      <div class="event-shop-help-modal-icons event-shop-help-modal-icon-boost"></div>\r\n      <div class="event-shop-help-modal-topic">' + c(typeof(o = null != (o = n.upgradePassText || (null != t ? t.upgradePassText : t)) ? o : r) === i ? o.call(l, {
                        name: "upgradePassText",
                        hash: {},
                        data: a
                    }) : o) + '</div>\r\n      <div class="event-shop-help-description">' + c(typeof(o = null != (o = n.upgradePassDescriptionText || (null != t ? t.upgradePassDescriptionText : t)) ? o : r) === i ? o.call(l, {
                        name: "upgradePassDescriptionText",
                        hash: {},
                        data: a
                    }) : o) + "</div>\r\n    </div>\r\n  </div>\r\n</lol-uikit-content-block>\r\n"
                },
                useData: !0
            })
        }, (e, t, n) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = void 0;
            var s = n(1),
                a = n(7),
                o = s.Ember.Component.extend({
                    classNames: ["event-shop-progression"],
                    eventShopService: s.Ember.inject.service("event-shop"),
                    failureLoadingRewardTrack: s.Ember.computed.alias("eventShopService.failureLoadingRewardTrack"),
                    rewardTrackItems: s.Ember.computed.alias("eventShopService.rewardTrackItems"),
                    eventShopProgressionData: s.Ember.computed.alias("eventShopService.eventShopProgressionData"),
                    unclaimedRewards: s.Ember.computed.alias("eventShopService.unclaimedRewards.rewardsCount"),
                    lockedTokens: s.Ember.computed.alias("eventShopService.unclaimedRewards.lockedTokensCount"),
                    showPassPurchaseModal: !1,
                    isLoadingPassAvailability: !0,
                    passAvailableToPurchase: !1,
                    passUnavailable: s.Ember.computed.not("passAvailableToPurchase"),
                    hasUnclaimedRewards: s.Ember.computed("unclaimedRewards", (function() {
                        return this.get("unclaimedRewards") > 0
                    })),
                    eventPassItems: s.Ember.computed("eventShopProgressionData.eventPassBundlesCatalogEntry", (function() {
                        return (this.get("eventShopProgressionData.eventPassBundlesCatalogEntry") || []).map((e => ({
                            itemId: e.itemId,
                            inventoryType: "BUNDLES"
                        })))
                    })),
                    didInsertElement() {
                        this._super(...arguments), this.set("isLoadingPassAvailability", !0), this.checkPassAvailability()
                    },
                    checkPassAvailability() {
                        this.get("eventShopProgressionData.passPurchased") ? this.set("isLoadingPassAvailability", !1) : this.get("eventShopService").getPassBundles().then((e => {
                            e.length && this.set("passAvailableToPurchase", !0)
                        })).catch((e => {
                            s.logger.error("Failure loading pass options", e)
                        })).finally((() => {
                            this.set("isLoadingPassAvailability", !1)
                        }))
                    },
                    actions: {
                        passPurchaseClick() {
                            s.Telemetry.sendCustomData(a.TELEMETRY.TABLE, {
                                eventName: a.TELEMETRY.PURCHASE_PASS_CLICK_EVENT,
                                eventShopEventId: this.get("eventShopService.info.eventId"),
                                lockedTokens: this.get("eventShopService.info.lockedTokenCount"),
                                tokenBalance: this.get("eventShopService.info.currentTokenBalance")
                            }), this.set("showPassPurchaseModal", !0)
                        }
                    }
                });
            t.default = o
        }, (e, t, n) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = void 0;
            var s = n(1),
                a = n(7);
            const o = {
                1: {
                    CSS_CLASS: "event-shop-purchase-modal-option-single",
                    LOCATIONS: [0]
                },
                2: {
                    CSS_CLASS: "event-shop-purchase-modal-option-tall",
                    LOCATIONS: [0, 1]
                },
                3: {
                    CSS_CLASS: "event-shop-purchase-modal-option-tall",
                    LOCATIONS: [0]
                },
                4: {
                    CSS_CLASS: "event-shop-purchase-modal-option-wide",
                    LOCATIONS: [0]
                }
            };
            var l = s.Ember.Component.extend({
                tag: null,
                eventShopService: s.Ember.inject.service("event-shop"),
                showPurchaseModal: !1,
                bundles: null,
                selectedOption: null,
                summarySubtitle: s.Ember.computed.alias("tra.event_shop_purchase_modal_summary_pass_subtitle"),
                descriptionElementAdditionalClassName: null,
                isDescriptionExpanded: !1,
                isExecutingPurchase: !1,
                purchaseCompleted: !1,
                dropRatesLootItemName: null,
                showDropRatesModal: !1,
                unlockButtonDisabled: s.Ember.computed("isExecutingPurchase", "selectedOption", (function() {
                    const e = this.get("isExecutingPurchase"),
                        t = this.get("selectedOption");
                    return !(!e && t && t.isPurchasable)
                })),
                optionsPointerClass: s.Ember.computed("isExecutingPurchase", "purchaseCompleted", (function() {
                    return this.get("isExecutingPurchase") || this.get("purchaseCompleted") ? "" : "event-shop-purchase-modal-option-pointer"
                })),
                options: s.Ember.computed("bundles", (function() {
                    const e = this.get("bundles");
                    if (!e) return [];
                    if (!Object.keys(o).includes(e.length.toString())) {
                        const t = Object.keys(o).join(", ");
                        s.logger.error(`Pass Purchase Modal - expected number of bundles to be ${t}; but got: ${e.length}`)
                    }
                    const t = o[e.length] || {},
                        n = t.CSS_CLASS || "",
                        a = t.LOCATIONS || [],
                        l = e.sort(((e, t) => t.bundledItems.length - e.bundledItems.length)).map(((e, t) => ({
                            ...e,
                            optionTypeCssClass: a.includes(t) ? n : ""
                        })));
                    if (1 === l.length) {
                        const e = l[0];
                        this.set("selectedOption", e), s.Ember.set(e, "selectedCssClass", "event-shop-purchase-modal-option-selected")
                    }
                    return l
                })),
                summaryTitle: s.Ember.computed("selectedOption", (function() {
                    const e = this.get("selectedOption");
                    return e ? e.details.name : this.get("tra.event_shop_purchase_modal_summary_default_pass_title")
                })),
                newBalance: s.Ember.computed("selectedOption", (function() {
                    const e = this.get("selectedOption");
                    return e && e.futureBalance ? s.tra.formatString("event_shop_purchase_modal_rp", {
                        price: e.futureBalance
                    }) : ""
                })),
                finalPrice: s.Ember.computed("selectedOption", (function() {
                    const e = this.get("selectedOption");
                    return e && e.finalPrice ? s.tra.formatString("event_shop_purchase_modal_rp", {
                        price: e.finalPrice
                    }) : ""
                })),
                initialPrice: s.Ember.computed("selectedOption", (function() {
                    const e = this.get("selectedOption");
                    return e && e.initialPrice && e.finalPrice !== e.initialPrice ? s.tra.formatString("event_shop_purchase_modal_rp", {
                        price: e.initialPrice
                    }) : null
                })),
                discountPercentage: s.Ember.computed("selectedOption", (function() {
                    const e = this.get("selectedOption");
                    return e && e.discountPercentage ? s.tra.formatString("event_shop_purchase_modal_discount_percentage", {
                        percentage: e.discountPercentage
                    }) : null
                })),
                optionsExecutingPurchaseClass: s.Ember.computed("isExecutingPurchase", (function() {
                    return this.get("isExecutingPurchase") ? "event-shop-purchase-modal-option-executing-purchase" : ""
                })),
                numberOfOptionsWrapperCssClass: s.Ember.computed("options", (function() {
                    switch (this.get("options").length) {
                        case 1:
                            return "event-shop-purchase-modal-single-option";
                        case 2:
                            return "event-shop-purchase-modal-two-options";
                        case 3:
                            return "event-shop-purchase-modal-three-options";
                        case 4:
                            return "event-shop-purchase-modal-four-options";
                        default:
                            return ""
                    }
                })),
                didInsertElement() {
                    this._super(...arguments), this.addObserver("showPurchaseModal", this.getOptions)
                },
                willDestroyElement() {
                    this.removeObserver("showPurchaseModal")
                },
                didRender() {
                    this.defineSeeMoreElementVisibility()
                },
                defineSeeMoreElementVisibility() {
                    if (!this.get("selectedOption")) return void this.set("descriptionElementAdditionalClassName", "event-shop-purchase-modal-description-see-more-display-none");
                    const e = document.getElementById("event-shop-purchse-modal-summary-description-text");
                    e && e.offsetHeight < 72 ? this.set("descriptionElementAdditionalClassName", "event-shop-purchase-modal-description-see-more-display-none") : this.set("descriptionElementAdditionalClassName", "")
                },
                getOptions() {
                    this.get("showPurchaseModal") && this.get("eventShopService").getPassBundles().then((e => {
                        if (!e.length) throw new Error("Pass Purhcase Modal - Pass Bundles did not return any option");
                        this.set("bundles", e)
                    })).catch((e => {
                        s.logger.error("Pass Purchase Modal - Failure loading purchase options", e);
                        const t = s.UIKit.getTemplateHelper().contentBlockDialog(this.get("tra.event_shop_generic_error_header"), this.get("tra.event_shop_generic_error_body"));
                        this.showErrorModal(t)
                    }))
                },
                closeModal() {
                    this.setProperties({
                        showPurchaseModal: !1,
                        bundles: null,
                        selectedOption: null,
                        isExecutingPurchase: !1,
                        purchaseCompleted: !1,
                        dropRatesLootItemName: null,
                        showDropRatesModal: !1
                    }), this.setIsDescriptionExpanded(!1)
                },
                showErrorModal(e) {
                    this.closeModal(), s.UIKit.getModalManager().add({
                        type: "DialogAlert",
                        data: {
                            contents: e,
                            okText: this.get("tra.event_shop_modal_ok_button")
                        }
                    })
                },
                showPurchaseErrorModal() {
                    const e = s.UIKit.getTemplateHelper().contentBlockDialog(this.get("tra.event_shop_generic_purchase_error_header"), this.get("tra.event_shop_generic_purchase_error_body"));
                    this.showErrorModal(e)
                },
                resetSelectedOptionCssClass() {
                    this.get("options").forEach((e => {
                        e.selectedCssClass && s.Ember.set(e, "selectedCssClass", "")
                    }))
                },
                setIsDescriptionExpanded(e) {
                    this.set("isDescriptionExpanded", e);
                    const t = document.getElementById("event-shop-purchse-modal-summary-description");
                    if (t)
                        if (e) {
                            const e = t.scrollHeight + 3;
                            t.style.maxHeight = e + "px"
                        } else t.style.maxHeight = "72px"
                },
                actions: {
                    handleCloseModalClick() {
                        this.closeModal()
                    },
                    selectOption(e) {
                        this.get("isExecutingPurchase") || this.get("purchaseCompleted") || this.get("selectedOption") === e || (this.resetSelectedOptionCssClass(), s.Ember.set(e, "selectedCssClass", "event-shop-purchase-modal-option-selected"), this.set("selectedOption", e), this.setIsDescriptionExpanded(!1))
                    },
                    unlockPass() {
                        if (this.get("unlockButtonDisabled")) return;
                        this.set("isExecutingPurchase", !0);
                        const e = this.get("selectedOption");
                        s.Telemetry.sendCustomData(a.TELEMETRY.TABLE, {
                            eventName: a.TELEMETRY.PURCHASE_PASS_UNLOCK_CLICK_EVENT,
                            eventShopEventId: this.get("eventShopService.info.eventId"),
                            selectedOption: e.details.itemId
                        }), this.get("eventShopService").purchasePassBundle(e).then((() => {
                            this.set("isExecutingPurchase", !1), this.set("purchaseCompleted", !0)
                        })).catch((e => {
                            s.logger.error("Failure purchasing Event Pass", e), this.showPurchaseErrorModal()
                        }))
                    },
                    expandOrCollapseDescription() {
                        this.setIsDescriptionExpanded(!this.get("isDescriptionExpanded"))
                    },
                    openDropRatesModal(e) {
                        this.set("dropRatesLootItemName", `${e.subInventoryType}_${e.itemId}_OPEN`), this.set("showDropRatesModal", !0)
                    },
                    closeDropRatesModal() {
                        this.set("dropRatesLootItemName", null), this.set("showDropRatesModal", !1)
                    }
                }
            });
            t.default = l
        }, (e, t, n) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = void 0;
            var s = n(1),
                a = n(44),
                o = n(7);
            const {
                TRACKER_SIZE: l
            } = a.REWARD_TRACKER;
            var r = s.Ember.Component.extend({
                classNames: ["event-shop-reward-track-wrapper"],
                eventShopService: s.Ember.inject.service("event-shop"),
                trackerSize: l.SMALL,
                displayCurrentBonusIteration: !0,
                rewardTrackProgress: s.Ember.computed.alias("eventShopService.rewardTrackProgress"),
                rewardTrackItems: s.Ember.computed.alias("eventShopService.rewardTrackItems"),
                rewardTrackBonusProgress: s.Ember.computed.alias("eventShopService.rewardTrackBonusProgress"),
                rewardTrackBonusItems: s.Ember.computed.alias("eventShopService.rewardTrackBonusItems"),
                isGracePeriod: s.Ember.computed.alias("eventShopService.isGracePeriod"),
                scrollingArrowsEnabled: !0,
                handleClickItem(e, t = !1) {
                    this.trackItemHasUnclaimedRewards(e) && (s.AudioPlugin.getChannel("sfx-ui").playSound("/fe/lol-static-assets/sounds/sfx-uikit-grid-click.ogg"), t ? this.get("eventShopService").claimCurrentBonusItems() : this.get("eventShopService").claimAllPendingRewards())
                },
                trackItemHasUnclaimedRewards: ({
                    rewardOptions: e
                }) => e.some((({
                    state: e
                }) => e === o.REWARD_TRACK_ITEM_STATE.UNSELECTED)),
                actions: {
                    clickItem(e) {
                        s.Ember.run.debounce(this, this.handleClickItem, e, 250)
                    },
                    clickBonusItem(e) {
                        s.Ember.run.debounce(this, this.handleClickItem, e, !0, 250)
                    }
                }
            });
            t.default = r
        }, (e, t, n) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), Object.defineProperty(t, "PAW", {
                enumerable: !0,
                get: function() {
                    return s.default
                }
            }), Object.defineProperty(t, "PROFILE_PRIVACY", {
                enumerable: !0,
                get: function() {
                    return i.default
                }
            }), Object.defineProperty(t, "QUEUES", {
                enumerable: !0,
                get: function() {
                    return a.default
                }
            }), Object.defineProperty(t, "REWARD_TRACKER", {
                enumerable: !0,
                get: function() {
                    return o.default
                }
            }), Object.defineProperty(t, "SETTINGS", {
                enumerable: !0,
                get: function() {
                    return r.default
                }
            }), Object.defineProperty(t, "SOCIAL", {
                enumerable: !0,
                get: function() {
                    return l.default
                }
            }), Object.defineProperty(t, "TIME", {
                enumerable: !0,
                get: function() {
                    return c.default
                }
            });
            var s = p(n(45)),
                a = p(n(56)),
                o = p(n(57)),
                l = p(n(58)),
                r = p(n(59)),
                i = p(n(60)),
                c = p(n(61));

            function p(e) {
                return e && e.__esModule ? e : {
                    default: e
                }
            }
        }, (e, t, n) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = void 0;
            var s = m(n(46)),
                a = m(n(47)),
                o = m(n(48)),
                l = m(n(49)),
                r = m(n(50)),
                i = m(n(51)),
                c = m(n(52)),
                p = m(n(53)),
                d = m(n(54)),
                u = m(n(55));

            function m(e) {
                return e && e.__esModule ? e : {
                    default: e
                }
            }
            var h = {
                COMPONENT_TYPES: s.default,
                CURRENCY_TYPES: a.default,
                INVENTORY_TYPES: o.default,
                MEDIA_TYPES: l.default,
                MEDIA_LOAD_TYPES: r.default,
                MODAL_TYPES: i.default,
                OFFER_PURCHASE_STATES: c.default,
                OFFER_VALIDATION_STATES: p.default,
                SCROLL_LIST_DISPLAY_TYPES: d.default,
                TEMPLATE_TYPES: u.default
            };
            t.default = h
        }, (e, t) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = void 0;
            var n = {
                TEXT: "TEXT",
                TITLE_SUBTITLE: "TITLE_SUBTITLE",
                PURCHASE: "PURCHASE",
                MEDIA: "MEDIA",
                IMAGE_CAROUSEL: "IMAGE_CAROUSEL",
                SCROLL_LIST: "SCROLL_LIST",
                VERTICAL_LIST: "VERTICAL_LIST"
            };
            t.default = n
        }, (e, t) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = void 0;
            var n = {
                RP: "RP",
                IP: "IP",
                BE: "lol_blue_essence"
            };
            t.default = n
        }, (e, t) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = void 0;
            var n = {
                CHAMPION: "CHAMPION",
                CHAMPION_SKIN: "CHAMPION_SKIN",
                WARD_SKIN: "WARD_SKIN",
                BATTLE_BOOST: "BATTLE_BOOST",
                GIFT: "GIFT",
                MYSTERY: "MYSTERY",
                BUNDLES: "BUNDLES",
                SUMMONER_ICON: "SUMMONER_ICON",
                STATSTONE: "STATSTONE"
            };
            t.default = n
        }, (e, t) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = void 0;
            var n = {
                SVG: "SVG",
                IMAGE: "IMAGE",
                VIDEO: "VIDEO"
            };
            t.default = n
        }, (e, t) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = void 0;
            var n = {
                LOCAL_ASSET: "LOCAL_ASSET",
                EXTERNAL_URL: "EXTERNAL_URL",
                GAME_DATA: "GAME_DATA"
            };
            t.default = n
        }, (e, t) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = void 0;
            var n = {
                CHAMPION_MODAL: "CHAMPION_MODAL",
                SKIN_VIEWER_MODAL: "SKIN_VIEWER_MODAL",
                MULTIPLE_PURCHASE_MODAL: "MULTIPLE_PURCHASE_MODAL",
                CHROMA_MODAL: "CHROMA_MODAL",
                CHROMA_BUNDLE_MODAL: "CHROMA_BUNDLE_MODAL",
                SUMMONER_ICON_MODAL: "SUMMONER_ICON_MODAL",
                WARD_SKIN_MODAL: "WARD_SKIN_MODAL",
                SKIN_WITH_DEPENDENCY_MODAL: "SKIN_WITH_DEPENDENCY_MODAL",
                PAW_GENERIC_MODAL: "PAW_GENERIC_MODAL"
            };
            t.default = n
        }, (e, t) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = void 0;
            var n = {
                NOT_STARTED: "NOT_STARTED",
                IN_PROGRESS: "IN_PROGRESS",
                SUCCESS: "SUCCESS",
                FAIL: "FAIL"
            };
            t.default = n
        }, (e, t) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = void 0;
            var n = {
                NOT_STARTED: "NOT_STARTED",
                IN_PROGRESS: "IN_PROGRESS",
                COMPLETED: "COMPLETED"
            };
            t.default = n
        }, (e, t) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = void 0;
            var n = {
                EXPANDED: "EXPANDED",
                COMPACT: "COMPACT",
                DETAILED: "DETAILED"
            };
            t.default = n
        }, (e, t) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = void 0;
            var n = {
                LARGE_TWO_COLUMN_LANDSCAPE: "LARGE_TWO_COLUMN_LANDSCAPE"
            };
            t.default = n
        }, (e, t) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = void 0;
            const n = "RANKED_SOLO_5x5",
                s = "RANKED_FLEX_SR",
                a = "RANKED_FLEX_TT",
                o = "CHERRY",
                l = "RANKED_TFT",
                r = "RANKED_TFT_DOUBLE_UP",
                i = "RANKED_TFT_TURBO",
                c = "RANKED_TFT_PAIRS",
                p = [n, s],
                d = [...p, a],
                u = [o],
                m = [l, r],
                h = [i, c],
                f = [...m, ...h],
                v = [...d, ...m],
                _ = [...h, ...u];
            var g = {
                RANKED_SOLO_5x5_QUEUE_TYPE: n,
                RANKED_FLEX_SR_QUEUE_TYPE: s,
                RANKED_FLEX_TT_QUEUE_TYPE: a,
                RANKED_CHERRY_QUEUE_TYPE: o,
                RANKED_TFT_QUEUE_TYPE: l,
                RANKED_TFT_DOUBLE_UP_QUEUE_TYPE: r,
                RANKED_TFT_TURBO_QUEUE_TYPE: i,
                RANKED_TFT_PAIRS_QUEUE_TYPE: c,
                RANKED_LOL_QUEUE_TYPES: d,
                RANKED_SR_QUEUE_TYPES: p,
                RANKED_TFT_QUEUE_TYPES: m,
                RATED_TFT_QUEUE_TYPES: h,
                RANKED_AND_RATED_TFT_QUEUE_TYPES: f,
                ALL_RANKED_QUEUE_TYPES: v,
                ALL_RATED_QUEUE_TYPES: _,
                ALL_RANKED_AND_RATED_QUEUE_TYPES: [...v, ..._]
            };
            t.default = g
        }, (e, t) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = void 0;
            var n = {
                REWARD_TAGS: {
                    INSTANT: "Instant",
                    RARE: "Rare",
                    CHOICE: "Choice",
                    MULTIPLE: "Multiple"
                },
                MILESTONE_STAGES: {
                    COMPLETED: "completed",
                    CURRENT: "current",
                    FUTURE: "future",
                    HOVERING_COMPLETED: "future-completed"
                },
                REWARD_STATE: {
                    LOCKED: "Locked",
                    UNLOCKED: "Unlocked",
                    UNSELECTED: "Unselected",
                    SELECTED: "Selected"
                },
                TRACKER_SIZE: {
                    SMALL: "tracker-size-small",
                    MEDIUM: "tracker-size-medium"
                },
                REWARD_OPTION_HEADER_TYPE: {
                    FREE: "FREE",
                    PREMIUM: "PREMIUM",
                    NONE: "NONE"
                }
            };
            t.default = n
        }, (e, t) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = void 0;
            var n = {
                DEFAULT_SUMMONER_ICON_ID: 29
            };
            t.default = n
        }, (e, t) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = void 0;
            var n = {
                AUTO: "auto",
                ALWAYS: "always",
                NEVER: "never"
            };
            t.default = n
        }, (e, t) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = void 0;
            const n = {
                    UNKNOWN: "UNKNOWN",
                    ENABLED: "ENABLED",
                    DISABLED: "DISABLED"
                },
                s = {
                    PRIVATE: "PRIVATE",
                    PUBLIC: "PUBLIC"
                };
            var a = {
                ProfilePrivacyEnabledState: n,
                ProfilePrivacySetting: s,
                DEFAULT_PROFILE_PRIVACY: {
                    enabledState: n.UNKNOWN,
                    setting: s.PUBLIC
                }
            };
            t.default = a
        }, (e, t) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = t.TIME_UNITS = t.TIME_CONVERSIONS = void 0;
            const n = {
                MILLISECONDS: "milliseconds",
                SECONDS: "seconds",
                MINUTES: "minutes",
                HOURS: "hours",
                DAYS: "days",
                WEEKS: "weeks",
                MONTHS: "months",
                YEARS: "years"
            };
            t.TIME_UNITS = n;
            const s = 36e5,
                a = 864e5,
                o = 6048e5,
                l = {
                    MILLISECONDS_IN_A_SECOND: 1e3,
                    MILLISECONDS_IN_A_MINUTE: 6e4,
                    MILLISECONDS_IN_A_HOUR: s,
                    MILLISECONDS_IN_A_DAY: a,
                    MILLISECONDS_IN_A_WEEK: o,
                    MILLISECONDS_IN_A_YEAR: 314496e5
                };
            t.TIME_CONVERSIONS = l;
            var r = {
                TIME_UNITS: n,
                TIME_CONVERSIONS: l
            };
            t.default = r
        }, (e, t, n) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = void 0;
            var s = n(1),
                a = s.Ember.Component.extend({
                    classNames: ["event-shop-token-shop-balance-amount"],
                    eventShopService: s.Ember.inject.service("event-shop"),
                    init() {
                        this._super(...arguments), this.addObserver("eventShopService.tokenBalance", this.renderTokenBalance)
                    },
                    didInsertElement() {
                        this._super(...arguments), this.renderTokenBalance()
                    },
                    willDestroyElement() {
                        this.removeObserver("eventShopService.tokenBalance")
                    },
                    renderTokenBalance() {
                        const e = this.get("eventShopService.tokenBalance");
                        this.element.style.setProperty("--event-shop-token-balance", e || 0)
                    }
                });
            t.default = a
        }, (e, t, n) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = void 0;
            var s = n(1),
                a = n(7),
                o = n(12);
            var l = s.Ember.Component.extend({
                classNames: ["event-shop-token-shop"],
                eventShopService: s.Ember.inject.service("event-shop"),
                failureLoadingTokenShop: s.Ember.computed.alias("eventShopService.failureLoadingTokenShop"),
                categoriesOffers: s.Ember.computed.alias("eventShopService.categoriesOffers"),
                storeItems: [],
                init() {
                    this._super(...arguments), this.eventShopDataBinding = (0, s.dataBinding)(a.EVENT_SHOP_API, s.socket);
                    this.headerTxtObserver = new IntersectionObserver((e => this.updateHeader(e)), {
                        rootMargin: "0px",
                        threshold: .9
                    })
                },
                setCurrentCategoryTra(e) {
                    this.setProperties({
                        currentCategory: e,
                        currentCategoryTra: this.get(`tra.${(0,o.getCategoryOffersId)(e)}`)
                    })
                },
                updateHeader(e) {
                    for (let t = 0; t < e.length; t++) {
                        const n = e[t];
                        if (n.isIntersecting) {
                            this.setCurrentCategoryTra(n.target.category);
                            break
                        }
                    }
                },
                willDestroyElement() {
                    this._super(...arguments), this.eventShopDataBinding.removeObserver("/token-shop-data", this)
                },
                actions: {
                    scrollToCategory(e) {
                        const t = this.element.querySelector(`#${(0,o.getCategoryOffersId)(e)}`);
                        this.element.querySelector("#token-shop-scrollable-container").scrollTop = t.offsetTop - 70
                    }
                }
            });
            t.default = l
        }, (e, t, n) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = void 0;
            var s = n(1);
            var a = s.Ember.Component.extend({
                classNames: ["event-shop-xp"],
                eventShopService: s.Ember.inject.service("event-shop"),
                rewardTrackXP: s.Ember.computed.alias("eventShopService.rewardTrackXP"),
                isGracePeriod: s.Ember.computed.alias("eventShopService.isGracePeriod"),
                unclaimedRewards: s.Ember.computed.alias("eventShopService.unclaimedRewards.rewardsCount"),
                completedLoops: s.Ember.computed("rewardTrackXP", (function() {
                    return Math.max(this.get("rewardTrackXP.iteration") - 1, 0)
                })),
                hasUnclaimedRewards: s.Ember.computed("unclaimedRewards", (function() {
                    return this.get("unclaimedRewards") > 0
                })),
                levelLabel: s.Ember.computed("rewardTrackXP", (function() {
                    return this.get("rewardTrackXP.currentLevel") > 0 ? `${this.get("tra.event_shop_xp_label_level")} ${this.get("rewardTrackXP.currentLevel")}` : `${this.get("tra.event_shop_xp_label_level")} ${this.get("tra.event_shop_xp_label_level_start")}`
                })),
                xpOverflow: s.Ember.computed("rewardTrackXP", (function() {
                    return this.get("rewardTrackXP.isBonusPhase") && this.get("rewardTrackXP.currentLevelXP") >= this.get("rewardTrackXP.totalLevelXP")
                }))
            });
            t.default = a
        }, (e, t, n) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = void 0, n(66);
            var s = n(1),
                a = s.Ember.Controller.extend({
                    init() {
                        this._super(...arguments), this.addObserver("isVisible", this, "updatePlayerSettings"), this.addObserver("tokenBalance", this, "updatePlayerSettings"), this.addObserver("tokenShopOffersVersion", this, "updatePlayerSettings")
                    },
                    willDestroy() {
                        this.removeObserver("isVisible"), this.removeObserver("tokenBalance"), this.removeObserver("tokenShopOffersVersion")
                    },
                    eventShopService: s.Ember.inject.service("event-shop"),
                    playerSettingsService: s.Ember.inject.service("player-settings"),
                    isVisible: s.Ember.computed.alias("model.externalModel.isVisible"),
                    backgroundData: s.Ember.computed.alias("model.backgroundData"),
                    backgroundImageStyle: s.Ember.computed("backgroundData", (function() {
                        return s.Ember.String.htmlSafe(`background-image: url(${this.get("backgroundData.backgroundImagePath")})`)
                    })),
                    tokenBalance: s.Ember.computed.alias("eventShopService.tokenBalance"),
                    tokenShopOffersVersion: s.Ember.computed.alias("eventShopService.tokenShopData.offersVersion"),
                    updatePlayerSettings: function() {
                        this.get("isVisible") && this.get("playerSettingsService").updatePlayerSettings(this.get("tokenBalance"), this.get("tokenShopOffersVersion"))
                    }
                });
            t.default = a
        }, (e, t, n) => {
            "use strict";
            n.r(t)
        }, (e, t, n) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = void 0;
            var s = n(1),
                a = s.Ember.Controller.extend({
                    eventShopService: s.Ember.inject.service("event-shop"),
                    isEventShopReady: s.Ember.computed.or("eventShopService.categoriesOffers", "eventShopService.rewardTrackItems"),
                    isRewardTrackMinimized: !1,
                    actions: {
                        toggleMinimizeRewardTrack() {
                            this.set("isRewardTrackMinimized", !this.get("isRewardTrackMinimized"))
                        }
                    }
                });
            t.default = a
        }, (e, t, n) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = void 0, t.inventoryTypeName = o;
            var s = n(1);
            const a = {
                ACHIEVEMENT_TITLE: "event_shop_inventory_type_name_achievement_title",
                BOOST: "event_shop_inventory_type_name_boost",
                BUNDLES: "event_shop_inventory_type_name_bundles",
                CHAMPION: "event_shop_inventory_type_name_champion",
                CHAMPION_SKIN: "event_shop_inventory_type_name_champion_skin",
                COMPANION: "event_shop_inventory_type_name_companion",
                CURRENCY: "event_shop_inventory_type_name_currency",
                EMOTE: "event_shop_inventory_type_name_emote",
                EVENT_PASS: "event_shop_inventory_type_name_event_pass",
                GIFT: "event_shop_inventory_type_name_gift",
                HEXTECH_CRAFTING: "event_shop_inventory_type_name_hextech_crafting",
                MYSTERY: "event_shop_inventory_type_name_mystery",
                REGALIA_BANNER: "event_shop_inventory_type_name_regalia_banner",
                REGALIA_CREST: "event_shop_inventory_type_name_regalia_crest",
                RP: "event_shop_inventory_type_name_rp",
                RUNE: "event_shop_inventory_type_name_rune",
                SPELL_BOOK_PAGE: "event_shop_inventory_type_name_spell_book_page",
                STATSTONE: "event_shop_inventory_type_name_statstone",
                SUMMONER_ICON: "event_shop_inventory_type_name_summoner_icon",
                TFT_DAMAGE_SKIN: "event_shop_inventory_type_name_tft_damage_skin",
                TFT_MAP_SKIN: "event_shop_inventory_type_name_tft_map_skin",
                WARD_SKIN: "event_shop_inventory_type_name_ward_skin"
            };

            function o(e) {
                const t = e[0],
                    n = a[t];
                return s.tra.get(n)
            }
            var l = s.Ember.Helper.helper(o);
            t.default = l
        }, (e, t, n) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = void 0;
            var s = n(1).Ember.Helper.helper((e => e[0] === e[1]));
            t.default = s
        }, (e, t, n) => {
            const s = n(1).Ember;
            e.exports = s.HTMLBars.template({
                id: "E+/1mrYr",
                block: '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\Releases_14_1\\\\LeagueClientContent_Release\\\\15693\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-event-shop\\\\src\\\\app\\\\templates\\\\application.hbs\\" style-path=\\"null\\" js-path=\\"null\\" "],["text","\\n"],["block",["if"],[["get",["isVisible"]]],null,0]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","  "],["open-element","div",[]],["static-attr","class","rcp-fe-lol-event-shop-application"],["dynamic-attr","style",["unknown",["backgroundImageStyle"]],null],["flush-element"],["text","\\n    "],["append",["unknown",["outlet"]],false],["text","\\n  "],["close-element"],["text","\\n"]],"locals":[]}],"hasPartials":false}',
                meta: {}
            })
        }, (e, t, n) => {
            const s = n(1).Ember;
            e.exports = s.HTMLBars.template({
                id: "4wRqnAtC",
                block: '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\Releases_14_1\\\\LeagueClientContent_Release\\\\15693\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-event-shop\\\\src\\\\app\\\\templates\\\\index.hbs\\" style-path=\\"null\\" js-path=\\"null\\" "],["text","\\n"],["open-element","div",[]],["static-attr","class","event-shop-index"],["flush-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","event-shop-index-header"],["flush-element"],["text","\\n    "],["append",["unknown",["event-shop-page-header"]],false],["text","\\n  "],["close-element"],["text","\\n"],["block",["if"],[["get",["isEventShopReady"]]],null,1,0],["close-element"],["text","\\n"]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","    "],["append",["unknown",["event-shop-fallback"]],false],["text","\\n"]],"locals":[]},{"statements":[["text","    "],["append",["helper",["event-shop-main-view"],null,[["isRewardTrackMinimized","toggleMinimizeRewardTrack"],[["get",["isRewardTrackMinimized"]],["helper",["action"],[["get",[null]],"toggleMinimizeRewardTrack"],null]]]],false],["text","\\n"]],"locals":[]}],"hasPartials":false}',
                meta: {}
            })
        }, (e, t, n) => {
            const s = n(1).Ember;
            e.exports = s.HTMLBars.template({
                id: "lIpzalSy",
                block: '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\Releases_14_1\\\\LeagueClientContent_Release\\\\15693\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-event-shop\\\\src\\\\app\\\\templates\\\\components\\\\event-shop-card-multi-purchase-modal.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\Releases_14_1\\\\LeagueClientContent_Release\\\\15693\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-event-shop\\\\src\\\\app\\\\styles\\\\components\\\\event-shop-card-multi-purchase-modal.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\Releases_14_1\\\\LeagueClientContent_Release\\\\15693\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-event-shop\\\\src\\\\app\\\\components\\\\event-shop-card-multi-purchase-modal.js\\" "],["text","\\n"],["open-element","lol-uikit-content-block",[]],["static-attr","type","dialog-large"],["static-attr","class","event-shop-card-multi-purchase-content-block"],["flush-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","event-shop-card-multi-purchase-modal-preview-container"],["flush-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","event-shop-card-multi-purchase-modal-image-container"],["flush-element"],["text","\\n      "],["open-element","img",[]],["static-attr","class","event-shop-card-multi-purchase-modal-image"],["dynamic-attr","src",["unknown",["offer","image"]],null],["flush-element"],["close-element"],["text","\\n    "],["close-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","event-shop-card-multi-purchase-item-title"],["flush-element"],["append",["unknown",["offer","localizedTitle"]],false],["close-element"],["text","\\n  "],["close-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","event-shop-card-multi-purchase-item-details"],["flush-element"],["text","\\n    "],["open-element","p",[]],["flush-element"],["append",["unknown",["offer","localizedDescription"]],false],["close-element"],["text","\\n  "],["close-element"],["text","\\n"],["block",["if"],[["get",["shouldRenderMultiPurchaseSlider"]]],null,3],["text","  "],["open-element","div",[]],["static-attr","class","event-shop-card-multi-purchase-details"],["flush-element"],["text","\\n    "],["open-element","lol-uikit-purchase-button",[]],["dynamic-attr","disabled",["unknown",["isPurchaseDisabled"]],null],["dynamic-attr","onclick",["helper",["action"],[["get",[null]],"purchaseOffer",["get",["offer"]]],null],null],["flush-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","event-shop-card-multi-purchase-currency-wrapper"],["flush-element"],["text","\\n        "],["open-element","img",[]],["static-attr","class","event-shop-card-multi-purchase-currency-icon"],["dynamic-attr","src",["unknown",["tokenImageSrc"]],null],["flush-element"],["close-element"],["text","\\n        "],["append",["unknown",["purchasePrice"]],false],["text","\\n      "],["close-element"],["text","\\n    "],["close-element"],["text","\\n"],["block",["if"],[["get",["notEnoughRp"]]],null,2],["block",["if"],[["get",["offerPurchased"]]],null,1],["text","    "],["open-element","div",[]],["static-attr","class","event-shop-card-multi-purchase-future-balance"],["flush-element"],["text","\\n"],["block",["unless"],[["get",["isPurchaseDisabled"]]],null,0],["text","    "],["close-element"],["text","\\n\\n  "],["close-element"],["text","\\n"],["close-element"]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","        "],["append",["unknown",["tra","event_shop_purchase_modal_balance"]],false],["text"," "],["append",["unknown",["futureTokenBalance"]],false],["text","\\n"]],"locals":[]},{"statements":[["text","    "],["open-element","div",[]],["static-attr","class","event-shop-card-multi-purchase-not-enough-tokens"],["flush-element"],["append",["unknown",["tra","event_shop_card_purchase_offer_already_owned"]],false],["text","\\n    "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","    "],["open-element","div",[]],["static-attr","class","event-shop-card-multi-purchase-not-enough-tokens"],["flush-element"],["append",["unknown",["tra","event_shop_card_purchase_not_enough_tokens"]],false],["text","\\n    "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","    "],["append",["helper",["multi-purchase-slider"],null,[["min","max","onValidationChange","onSelectedQuantityChange","disabled"],[["get",["minPurchasableQuantity"]],["get",["maxPurchasableQuantity"]],["helper",["action"],[["get",[null]],"handleValidationChange"],null],["helper",["action"],[["get",[null]],"handleSelectedQuantityChange"],null],["get",["purchaseInProgress"]]]]],false],["text","\\n"]],"locals":[]}],"hasPartials":false}',
                meta: {}
            })
        }, (e, t, n) => {
            const s = n(1).Ember;
            e.exports = s.HTMLBars.template({
                id: "OmkjcCc4",
                block: '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\Releases_14_1\\\\LeagueClientContent_Release\\\\15693\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-event-shop\\\\src\\\\app\\\\templates\\\\components\\\\event-shop-category-nav-bar-tab.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\Releases_14_1\\\\LeagueClientContent_Release\\\\15693\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-event-shop\\\\src\\\\app\\\\styles\\\\components\\\\event-shop-category-nav-bar-tab.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\Releases_14_1\\\\LeagueClientContent_Release\\\\15693\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-event-shop\\\\src\\\\app\\\\components\\\\event-shop-category-nav-bar-tab.js\\" "],["text","\\n"],["open-element","img",[]],["static-attr","class","event-shop-nav-bar-tab-icon"],["dynamic-attr","src",["unknown",["categoryIconPath"]],null],["flush-element"],["close-element"],["text","\\n"],["block",["uikit-tooltip"],null,[["tooltipPosition","type"],["right","system"]],0]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["open-element","lol-uikit-content-block",[]],["static-attr","type","tooltip-system"],["flush-element"],["text","\\n    "],["open-element","p",[]],["flush-element"],["append",["unknown",["categoryTra"]],false],["close-element"],["text","\\n"],["close-element"],["text","\\n"]],"locals":[]}],"hasPartials":false}',
                meta: {}
            })
        }, (e, t, n) => {
            const s = n(1).Ember;
            e.exports = s.HTMLBars.template({
                id: "dmaueUn3",
                block: '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\Releases_14_1\\\\LeagueClientContent_Release\\\\15693\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-event-shop\\\\src\\\\app\\\\templates\\\\components\\\\event-shop-category-nav-bar.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\Releases_14_1\\\\LeagueClientContent_Release\\\\15693\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-event-shop\\\\src\\\\app\\\\styles\\\\components\\\\event-shop-category-nav-bar.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\Releases_14_1\\\\LeagueClientContent_Release\\\\15693\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-event-shop\\\\src\\\\app\\\\components\\\\event-shop-category-nav-bar.js\\" "],["text","\\n"],["block",["each"],[["get",["categoriesOffers"]]],null,0]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","  "],["append",["helper",["event-shop-category-nav-bar-tab"],null,[["scrollToCategory","category","categoryIconPath","currentCategory"],[["get",["scrollToCategory"]],["get",["categoryOffers","category"]],["get",["categoryOffers","categoryIconPath"]],["get",["currentCategory"]]]]],false],["text","\\n"]],"locals":["categoryOffers"]}],"hasPartials":false}',
                meta: {}
            })
        }, (e, t, n) => {
            const s = n(1).Ember;
            e.exports = s.HTMLBars.template({
                id: "yr3dKYUo",
                block: '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\Releases_14_1\\\\LeagueClientContent_Release\\\\15693\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-event-shop\\\\src\\\\app\\\\templates\\\\components\\\\event-shop-category-offers.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\Releases_14_1\\\\LeagueClientContent_Release\\\\15693\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-event-shop\\\\src\\\\app\\\\styles\\\\components\\\\event-shop-category-offers.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\Releases_14_1\\\\LeagueClientContent_Release\\\\15693\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-event-shop\\\\src\\\\app\\\\components\\\\event-shop-category-offers.js\\" "],["text","\\n"],["open-element","div",[]],["dynamic-attr","id",["unknown",["categoryOffersId"]],null],["static-attr","class","event-shop-token-shop-category-offers"],["flush-element"],["text","\\n"],["block",["each"],[["get",["categoryOffers","offers"]]],null,0],["close-element"],["text","\\n"]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","    "],["append",["helper",["event-shop-offer-card"],null,[["offer"],[["get",["offer"]]]]],false],["text","\\n"]],"locals":["offer"]}],"hasPartials":false}',
                meta: {}
            })
        }, (e, t, n) => {
            const s = n(1).Ember;
            e.exports = s.HTMLBars.template({
                id: "g6c2fL87",
                block: '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\Releases_14_1\\\\LeagueClientContent_Release\\\\15693\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-event-shop\\\\src\\\\app\\\\templates\\\\components\\\\event-shop-fallback.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\Releases_14_1\\\\LeagueClientContent_Release\\\\15693\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-event-shop\\\\src\\\\app\\\\styles\\\\components\\\\event-shop-fallback.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\Releases_14_1\\\\LeagueClientContent_Release\\\\15693\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-event-shop\\\\src\\\\app\\\\components\\\\event-shop-fallback.js\\" "],["text","\\n"],["block",["if"],[["get",["error","errorMessage"]]],null,1,0]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","  "],["open-element","div",[]],["static-attr","class","event-shop-spinner"],["flush-element"],["text","\\n    "],["append",["helper",["uikit-spinner"],null,[["width","height"],["40px","40px"]]],false],["text","\\n  "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","  "],["open-element","div",[]],["static-attr","class","event-shop-unavailable-container"],["flush-element"],["text","\\n    "],["open-element","img",[]],["static-attr","class","event-shop-unavailable-error-image"],["static-attr","src","/fe/lol-static-assets/images/event-shop/icon-shocked-poro-clear.png"],["flush-element"],["close-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","event-shop-unavailable-message"],["flush-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","event-shop-unavailable-message-title"],["flush-element"],["text","\\n        "],["open-element","img",[]],["static-attr","class","event-shop-unavailable-message-title-warning"],["static-attr","src","/fe/lol-static-assets/images/event-shop/red-warning.png"],["flush-element"],["close-element"],["append",["unknown",["errorMessageTra","title"]],false],["text","\\n      "],["close-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","event-shop-unavailable-message-description"],["flush-element"],["text","\\n        "],["append",["unknown",["errorMessageTra","description"]],false],["text","\\n      "],["close-element"],["text","\\n    "],["close-element"],["text","\\n  "],["close-element"],["text","\\n"]],"locals":[]}],"hasPartials":false}',
                meta: {}
            })
        }, (e, t, n) => {
            const s = n(1).Ember;
            e.exports = s.HTMLBars.template({
                id: "BEQRPqF3",
                block: '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\Releases_14_1\\\\LeagueClientContent_Release\\\\15693\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-event-shop\\\\src\\\\app\\\\templates\\\\components\\\\event-shop-main-view.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\Releases_14_1\\\\LeagueClientContent_Release\\\\15693\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-event-shop\\\\src\\\\app\\\\styles\\\\components\\\\event-shop-main-view.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\Releases_14_1\\\\LeagueClientContent_Release\\\\15693\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-event-shop\\\\src\\\\app\\\\components\\\\event-shop-main-view.js\\" "],["text","\\n"],["open-element","div",[]],["dynamic-attr","class",["concat",["event-shop-main-view-token-shop ",["helper",["if"],[["get",["isRewardTrackMinimized"]],"event-shop-main-view-token-shop-maximized",""],null]]]],["flush-element"],["text","\\n  "],["append",["unknown",["event-shop-token-shop"]],false],["text","\\n"],["close-element"],["text","\\n"],["open-element","div",[]],["dynamic-attr","class",["concat",["event-shop-main-view-progression ",["helper",["if"],[["get",["isRewardTrackMinimized"]],"event-shop-main-view-progression-minimized",""],null]]]],["flush-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","event-shop-main-view-progression-minimize-button-container"],["dynamic-attr","onclick",["helper",["action"],[["get",[null]],"minimizeRewardTrack"],null],null],["flush-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","event-shop-main-view-progression-minimize-button-trapezoid-border"],["flush-element"],["close-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","event-shop-main-view-progression-minimize-button-trapezoid"],["flush-element"],["text","\\n      "],["open-element","div",[]],["dynamic-attr","class",["concat",["event-shop-main-view-progression-minimize-button-chevron ",["helper",["if"],[["get",["isRewardTrackMinimized"]],"rotate-up",""],null]]]],["flush-element"],["close-element"],["text","\\n    "],["close-element"],["text","\\n  "],["close-element"],["text","\\n  "],["append",["unknown",["event-shop-progression"]],false],["text","\\n"],["close-element"]],"locals":[],"named":[],"yields":[],"blocks":[],"hasPartials":false}',
                meta: {}
            })
        }, (e, t, n) => {
            const s = n(1).Ember;
            e.exports = s.HTMLBars.template({
                id: "03kwJJVi",
                block: '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\Releases_14_1\\\\LeagueClientContent_Release\\\\15693\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-event-shop\\\\src\\\\app\\\\templates\\\\components\\\\event-shop-offer-card.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\Releases_14_1\\\\LeagueClientContent_Release\\\\15693\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-event-shop\\\\src\\\\app\\\\styles\\\\components\\\\event-shop-offer-card.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\Releases_14_1\\\\LeagueClientContent_Release\\\\15693\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-event-shop\\\\src\\\\app\\\\components\\\\event-shop-offer-card.js\\" "],["text","\\n"],["open-element","img",[]],["dynamic-attr","src",["concat",[["unknown",["offerImage"]]]]],["static-attr","class","event-shop-token-shop-offer-card-image"],["flush-element"],["close-element"],["text","\\n"],["open-element","div",[]],["static-attr","class","event-shop-token-shop-offer-card-footer"],["flush-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","event-shop-token-shop-offer-card-title"],["flush-element"],["text","\\n    "],["append",["unknown",["offer","localizedTitle"]],false],["text","\\n  "],["close-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","event-shop-token-shop-offer-card-price"],["flush-element"],["text","\\n"],["block",["if"],[["get",["isOfferOwned"]]],null,7,6],["text","  "],["close-element"],["text","\\n"],["block",["if"],[["get",["shouldRenderOfferItemsCount"]]],null,2],["close-element"],["text","\\n\\n"],["block",["if"],[["get",["displayMultiPurchaseModal"]]],null,1]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","    "],["append",["helper",["event-shop-card-multi-purchase-modal"],null,[["closeModal","offer"],[["helper",["action"],[["get",[null]],"closeModal"],null],["get",["offer"]]]]],false],["text","\\n"]],"locals":[]},{"statements":[["block",["uikit-modal"],null,[["displayModal","type","dismissible","dismissibleType","onClose"],[["get",["displayMultiPurchaseModal"]],"DialogDismiss",true,"outside",["helper",["action"],[["get",[null]],"closeModal"],null]]],0]],"locals":[]},{"statements":[["text","    "],["open-element","div",[]],["static-attr","class","event-shop-token-shop-offer-items-size"],["flush-element"],["text","\\n      "],["append",["unknown",["offer","items","length"]],false],["text","\\n    "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","      "],["open-element","img",[]],["static-attr","class","event-shop-token-shop-offer-card-price-currency-icon"],["dynamic-attr","src",["unknown",["tokenShopData","tokenImage"]],null],["flush-element"],["close-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","event-shop-token-shop-offer-card-price-value"],["flush-element"],["append",["unknown",["offer","price"]],false],["close-element"],["text","\\n    "]],"locals":[]},{"statements":[["block",["if"],[["get",["isOfferRevealed"]]],null,3]],"locals":[]},{"statements":[["text","      "],["open-element","div",[]],["static-attr","class","event-shop-token-shop-offer-card-spinner"],["flush-element"],["text","\\n        "],["append",["helper",["uikit-spinner"],null,[["width","height"],["15px","15px"]]],false],["text","\\n      "],["close-element"],["text","\\n      "],["append",["unknown",["tra","event_shop_offer_card_purchasing"]],false],["text","\\n"]],"locals":[]},{"statements":[["block",["if"],[["get",["isPurchasing"]]],null,5,4]],"locals":[]},{"statements":[["text","      "],["open-element","img",[]],["static-attr","class","event-shop-token-shop-offer-card-owned-icon"],["static-attr","src","/fe/lol-static-assets/images/event-shop/check_mask.png"],["flush-element"],["close-element"],["text","\\n      "],["append",["unknown",["tra","event_shop_offer_card_owned"]],false],["text","\\n"]],"locals":[]}],"hasPartials":false}',
                meta: {}
            })
        }, (e, t, n) => {
            const s = n(1).Ember;
            e.exports = s.HTMLBars.template({
                id: "4H2K59LO",
                block: '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\Releases_14_1\\\\LeagueClientContent_Release\\\\15693\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-event-shop\\\\src\\\\app\\\\templates\\\\components\\\\event-shop-page-header.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\Releases_14_1\\\\LeagueClientContent_Release\\\\15693\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-event-shop\\\\src\\\\app\\\\styles\\\\components\\\\event-shop-page-header.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\Releases_14_1\\\\LeagueClientContent_Release\\\\15693\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-event-shop\\\\src\\\\app\\\\components\\\\event-shop-page-header.js\\" "],["text","\\n"],["open-element","img",[]],["static-attr","class","event-shop-page-header-logo"],["dynamic-attr","src",["unknown",["eventDetailsData","eventIconPath"]],null],["flush-element"],["close-element"],["text","\\n"],["open-element","div",[]],["static-attr","class","event-shop-page-header-name"],["flush-element"],["text","\\n  "],["append",["unknown",["eventDetailsData","eventName"]],false],["text","\\n"],["close-element"],["text","\\n"],["open-element","div",[]],["static-attr","class","event-shop-page-header-vertical-divider"],["flush-element"],["close-element"],["text","\\n"],["open-element","div",[]],["static-attr","class","event-shop-page-header-end-timer"],["flush-element"],["text","\\n"],["block",["uikit-tooltip"],null,[["tooltipPosition","type"],["bottom","system"]],3],["text","  "],["open-element","img",[]],["static-attr","class","event-shop-page-header-clock-icon"],["static-attr","src","/fe/lol-static-assets/images/event-shop/clock-icon-gold3.svg"],["flush-element"],["close-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","event-shop-page-header-end-timer-text"],["flush-element"],["text","\\n    "],["append",["helper",["remaining-time-text"],null,[["endDateTime","almostEndingText","timeHasExpiredText","longTimeText","wrappingText"],[["get",["remainingTimeTextProps","endDateTime"]],["get",["remainingTimeTextProps","almostEndingText"]],["get",["tra","event_shop_page_header_event_ended"]],"",["get",["remainingTimeTextProps","wrappingText"]]]]],false],["text","\\n  "],["close-element"],["text","\\n"],["close-element"],["text","\\n"],["open-element","div",[]],["static-attr","class","event-shop-page-header-vertical-divider"],["flush-element"],["close-element"],["text","\\n"],["open-element","div",[]],["static-attr","class","event-shop-page-header-help-container"],["flush-element"],["text","\\n  "],["open-element","lol-uikit-info-icon",[]],["static-attr","class","event-shop-page-header-help-button"],["dynamic-attr","onclick",["helper",["action"],[["get",[null]],"showHelpModal"],null],null],["flush-element"],["text","\\n  "],["close-element"],["text","\\n"],["close-element"],["text","\\n"],["open-element","div",[]],["static-attr","class","event-shop-page-header-vertical-divider"],["flush-element"],["close-element"],["text","\\n"],["open-element","div",[]],["static-attr","class","event-shop-page-header-token-balance-wrapper"],["flush-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","event-shop-page-header-token-balance"],["flush-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","event-shop-page-header-token-balance-label"],["flush-element"],["text","\\n      "],["append",["unknown",["tra","event_shop_page_header_balance_you_have"]],false],["text","\\n    "],["close-element"],["text","\\n    "],["open-element","img",[]],["static-attr","class","event-shop-page-header-token-balance-icon"],["dynamic-attr","src",["unknown",["tokenImage"]],null],["flush-element"],["close-element"],["text","\\n    "],["append",["unknown",["event-shop-token-balance-amount"]],false],["text","\\n  "],["close-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","event-shop-page-header-buy-tokens-link"],["flush-element"],["text","\\n    "],["open-element","lol-uikit-close-button",[]],["static-attr","button-type","plus"],["dynamic-attr","onclick",["helper",["action"],[["get",[null]],"navigateToStore"],null],null],["flush-element"],["text","\\n"],["block",["uikit-tooltip"],null,[["tooltipPosition","type"],["bottom","system"]],0],["text","    "],["close-element"],["text","\\n  "],["close-element"],["text","\\n"],["close-element"]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","      "],["open-element","lol-uikit-content-block",[]],["static-attr","class","event-shop-page-header-buy-tokens-tooltip"],["static-attr","type","tooltip-system"],["flush-element"],["text","\\n        "],["append",["unknown",["tra","event_shop_page_header_buy_tokens_tooltip"]],false],["text","\\n      "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","    "],["open-element","div",[]],["static-attr","class","event-shop-page-header-tooltip-block event-shop-page-header-tooltip-block-top"],["flush-element"],["text","\\n      "],["open-element","h5",[]],["static-attr","class","event-shop-page-header-time-tooltip-top-title"],["flush-element"],["text","\\n        "],["append",["unknown",["tra","event_shop_page_header_time_tooltip_progress_title"]],false],["close-element"],["text","\\n      "],["open-element","p",[]],["static-attr","class","event-shop-page-header-time-tooltip-top-date"],["flush-element"],["append",["unknown",["progressEndDateFullText"]],false],["close-element"],["text","\\n      "],["open-element","p",[]],["static-attr","class","event-shop-page-header-description"],["flush-element"],["append",["unknown",["tra","event_shop_page_header_time_tooltip_progress_description"]],false],["close-element"],["text","\\n    "],["close-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","event-shop-page-header-tooltip-block event-shop-page-header-tooltip-block-bottom"],["flush-element"],["text","\\n      "],["open-element","h6",[]],["static-attr","class","event-shop-page-header-time-tooltip-bot-title"],["flush-element"],["append",["unknown",["tra","event_shop_page_header_time_tooltip_shop_title"]],false],["text","\\n      "],["close-element"],["text","\\n      "],["open-element","p",[]],["static-attr","class","event-shop-page-header-time-tooltip-bot-date"],["flush-element"],["append",["unknown",["shopEndDateFullText"]],false],["close-element"],["text","\\n    "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","    "],["open-element","div",[]],["static-attr","class","event-shop-page-header-tooltip-block event-shop-page-header-tooltip-block-top"],["flush-element"],["text","\\n      "],["open-element","h5",[]],["static-attr","class","event-shop-page-header-time-tooltip-top-title"],["flush-element"],["text","\\n        "],["append",["unknown",["tra","event_shop_page_header_time_tooltip_shop_title"]],false],["text","\\n      "],["close-element"],["text","\\n      "],["open-element","p",[]],["static-attr","class","event-shop-page-header-time-tooltip-top-date"],["flush-element"],["append",["unknown",["shopEndDateFullText"]],false],["close-element"],["text","\\n      "],["open-element","p",[]],["static-attr","class","event-shop-page-header-description-top"],["flush-element"],["text","\\n        "],["append",["unknown",["tra","event_shop_page_header_time_tooltip_shop_description_grace_period"]],false],["close-element"],["text","\\n    "],["close-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","event-shop-page-header-tooltip-block event-shop-page-header-tooltip-block-bottom"],["flush-element"],["text","\\n      "],["open-element","h6",[]],["static-attr","class","event-shop-page-header-time-tooltip-bot-title"],["flush-element"],["text","\\n        "],["append",["unknown",["tra","event_shop_page_header_time_tooltip_progress_title_grace_period"]],false],["text","\\n      "],["close-element"],["text","\\n      "],["open-element","p",[]],["static-attr","class","event-shop-page-header-description"],["flush-element"],["text","\\n        "],["append",["unknown",["tra","event_shop_page_header_time_tooltip_progress_description_grace_period"]],false],["close-element"],["text","\\n    "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","  "],["open-element","lol-uikit-content-block",[]],["static-attr","class","event-shop-page-header-tooltip-content"],["static-attr","type","tooltip-large"],["flush-element"],["text","\\n"],["block",["if"],[["get",["isGracePeriod"]]],null,2,1],["text","\\n  "],["close-element"],["text","\\n"]],"locals":[]}],"hasPartials":false}',
                meta: {}
            })
        }, (e, t, n) => {
            const s = n(1).Ember;
            e.exports = s.HTMLBars.template({
                id: "+MtSuC/9",
                block: '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\Releases_14_1\\\\LeagueClientContent_Release\\\\15693\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-event-shop\\\\src\\\\app\\\\templates\\\\components\\\\event-shop-progression.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\Releases_14_1\\\\LeagueClientContent_Release\\\\15693\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-event-shop\\\\src\\\\app\\\\styles\\\\components\\\\event-shop-progression.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\Releases_14_1\\\\LeagueClientContent_Release\\\\15693\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-event-shop\\\\src\\\\app\\\\components\\\\event-shop-progression.js\\" "],["text","\\n"],["block",["if"],[["get",["rewardTrackItems","length"]]],null,9,0]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","  "],["open-element","div",[]],["static-attr","class","event-shop-progression-fallback"],["flush-element"],["text","\\n    "],["append",["helper",["event-shop-fallback"],null,[["error"],[["get",["failureLoadingRewardTrack"]]]]],false],["text","\\n  "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","        "],["open-element","div",[]],["static-attr","class","event-shop-progression-label-wrapper"],["flush-element"],["text","\\n          "],["open-element","p",[]],["static-attr","class","event-shop-progression-label"],["flush-element"],["append",["unknown",["tra","event_shop_progression_label_instantly_get"]],false],["close-element"],["text","\\n          "],["open-element","img",[]],["static-attr","class","event-shop-progression-token-icon"],["dynamic-attr","src",["unknown",["eventShopProgressionData","tokenImage"]],null],["flush-element"],["close-element"],["text","\\n          "],["open-element","p",[]],["static-attr","class","event-shop-progression-label-tokens"],["flush-element"],["append",["unknown",["lockedTokens"]],false],["text","\\n            "],["append",["unknown",["tra","event_shop_progression_label_tokens"]],false],["close-element"],["text","\\n        "],["close-element"],["text","\\n        "],["open-element","div",[]],["static-attr","class","event-shop-progression-upgrade-button"],["flush-element"],["text","\\n          "],["open-element","lol-uikit-flat-button",[]],["static-attr","primary","true"],["static-attr","class","idle"],["modifier",["action"],[["get",[null]],"passPurchaseClick"]],["flush-element"],["text","\\n            "],["open-element","div",[]],["static-attr","class","event-shop-progression-button-content"],["flush-element"],["text","\\n              "],["open-element","img",[]],["static-attr","class","event-shop-progression-ticket-icon"],["static-attr","src","/fe/lol-static-assets/images/event-shop/ticket-gold2.svg"],["flush-element"],["close-element"],["text","\\n              "],["append",["unknown",["tra","event_shop_progression_button_purchase_pass"]],false],["text","\\n            "],["close-element"],["text","\\n          "],["close-element"],["text","\\n        "],["close-element"],["text","\\n      "]],"locals":[]},{"statements":[["text","        "],["open-element","div",[]],["static-attr","class","event-shop-progression-label-pass-message"],["flush-element"],["text","\\n          "],["append",["unknown",["tra","event_shop_progression_label_pass_unavailable"]],false],["text","\\n        "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["block",["if"],[["get",["passUnavailable"]]],null,2,1]],"locals":[]},{"statements":[["text","        "],["open-element","div",[]],["static-attr","class","event-shop-progression-label-pass-message"],["flush-element"],["text","\\n          "],["open-element","img",[]],["static-attr","class","event-shop-progression-check-icon"],["static-attr","src","/fe/lol-static-assets/images/event-shop/check_mask.png"],["flush-element"],["close-element"],["text","\\n          "],["append",["unknown",["tra","event_shop_progression_label_pass_purchased"]],false],["text","\\n        "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["block",["if"],[["get",["eventShopProgressionData","passPurchased"]]],null,4,3]],"locals":[]},{"statements":[["text","        "],["open-element","div",[]],["static-attr","class","event-shop-progression-label-pass-message"],["flush-element"],["text","\\n          "],["append",["unknown",["tra","event_shop_progression_label_pass_loading"]],false],["text","\\n        "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["block",["if"],[["get",["isLoadingPassAvailability"]]],null,6,5]],"locals":[]},{"statements":[["text","        "],["open-element","div",[]],["static-attr","class","event-shop-progression-unclaimed-wrapper"],["flush-element"],["text","\\n          "],["open-element","div",[]],["static-attr","class","event-shop-progression-unclaimed-box"],["flush-element"],["text","\\n            "],["open-element","span",[]],["flush-element"],["append",["unknown",["unclaimedRewards"]],false],["close-element"],["text","\\n          "],["close-element"],["text","\\n          "],["open-element","div",[]],["flush-element"],["text","\\n            "],["open-element","p",[]],["flush-element"],["append",["unknown",["tra","event_shop_progression_label_unclaimed_rewards"]],false],["close-element"],["text","\\n          "],["close-element"],["text","\\n        "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","  "],["open-element","div",[]],["static-attr","class","event-shop-progression-info"],["flush-element"],["text","\\n    "],["append",["unknown",["event-shop-xp"]],false],["text","\\n    "],["open-element","div",[]],["static-attr","class","event-shop-progression-pass-purchase"],["flush-element"],["text","\\n"],["block",["if"],[["get",["hasUnclaimedRewards"]]],null,8,7],["text","      "],["append",["helper",["event-shop-purchase-modal"],null,[["showPurchaseModal"],[["get",["showPassPurchaseModal"]]]]],false],["text","\\n    "],["close-element"],["text","\\n  "],["close-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","event-shop-progression-track"],["flush-element"],["text","\\n    "],["append",["unknown",["event-shop-reward-track-wrapper"]],false],["text","\\n  "],["close-element"],["text","\\n"]],"locals":[]}],"hasPartials":false}',
                meta: {}
            })
        }, (e, t, n) => {
            const s = n(1).Ember;
            e.exports = s.HTMLBars.template({
                id: "wpHS6YJj",
                block: '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\Releases_14_1\\\\LeagueClientContent_Release\\\\15693\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-event-shop\\\\src\\\\app\\\\templates\\\\components\\\\event-shop-purchase-modal.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\Releases_14_1\\\\LeagueClientContent_Release\\\\15693\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-event-shop\\\\src\\\\app\\\\styles\\\\components\\\\event-shop-purchase-modal.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\Releases_14_1\\\\LeagueClientContent_Release\\\\15693\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-event-shop\\\\src\\\\app\\\\components\\\\event-shop-purchase-modal.js\\" "],["text","\\n"],["block",["uikit-modal"],null,[["displayModal","type","dismissible","dismissibleType","onClose"],[["get",["showPurchaseModal"]],"DialogAlert",true,"inside",["helper",["action"],[["get",[null]],"handleCloseModalClick"],null]]],21],["block",["if"],[["get",["showDropRatesModal"]]],null,1]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","    "],["append",["helper",["loot-table-root"],null,[["name"],[["get",["dropRatesLootItemName"]]]]],false],["text","\\n"]],"locals":[]},{"statements":[["block",["uikit-modal"],null,[["show","type","dismissibleType","onClose"],["true","DialogDismiss","inside",["helper",["action"],[["get",[null]],"closeDropRatesModal"],null]]],0]],"locals":[]},{"statements":[["text","              "],["open-element","h5",[]],["static-attr","class","event-shop-purchase-modal-summary-choose-text"],["flush-element"],["append",["unknown",["tra","event_shop_purchase_modal_summary_choose"]],false],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","                    "],["open-element","div",[]],["static-attr","class","event-shop-purchase-modal-summary-balance-not-enough-rp"],["flush-element"],["text","\\n                      "],["append",["unknown",["tra","event_shop_purchase_modal_not_enough_rp"]],false],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","                    "],["append",["unknown",["tra","event_shop_purchase_modal_balance"]],false],["text","\\n                    "],["open-element","span",[]],["static-attr","class","event-shop-purchase-modal-rp-icon"],["flush-element"],["close-element"],["text","\\n                    "],["append",["unknown",["newBalance"]],false],["text","\\n"]],"locals":[]},{"statements":[["text","                    "],["open-element","div",[]],["static-attr","class","event-shop-purchase-modal-summary-discount"],["flush-element"],["text","\\n                      "],["open-element","div",[]],["static-attr","class","event-shop-purchase-modal-summary-discount-text"],["flush-element"],["append",["unknown",["discountPercentage"]],false],["close-element"],["text","\\n                    "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","                    "],["open-element","div",[]],["static-attr","class","event-shop-purchase-modal-summary-initial-price"],["flush-element"],["text","\\n                      "],["open-element","span",[]],["static-attr","class","event-shop-purchase-modal-rp-icon"],["flush-element"],["close-element"],["text","\\n                      "],["open-element","div",[]],["static-attr","class","event-shop-purchase-modal-summary-initial-price-text"],["flush-element"],["append",["unknown",["initialPrice"]],false],["close-element"],["text","\\n                    "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","                              "],["open-element","div",[]],["dynamic-attr","onclick",["helper",["action"],[["get",[null]],"openDropRatesModal",["get",["item"]]],null],null],["static-attr","class","event-shop-purchase-modal-summary-item-drop-rates"],["flush-element"],["text","\\n                                "],["open-element","span",[]],["static-attr","class","event-shop-purchase-modal-dice-icon"],["flush-element"],["close-element"],["text","\\n                                "],["append",["unknown",["tra","event_shop_purchase_modal_see_drop_rates"]],false],["text","\\n                              "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","                                "],["append",["helper",["inventory-type-name"],[["get",["item","inventoryType"]]],null],false],["text","\\n"]],"locals":[]},{"statements":[["text","                                "],["append",["unknown",["tra","event_shop_offer_card_owned"]],false],["text","\\n"]],"locals":[]},{"statements":[["text","                      "],["open-element","div",[]],["dynamic-attr","class",["concat",["event-shop-purchase-modal-summary-item\\n                          ",["helper",["if"],[["get",["item","owned"]],"event-shop-purchase-modal-summary-item-owned"],null]]]],["flush-element"],["text","\\n                        "],["open-element","div",[]],["static-attr","class","event-shop-purchase-modal-summary-item-img-wrapper"],["flush-element"],["text","\\n                          "],["open-element","img",[]],["static-attr","class","event-shop-purchase-modal-summary-item-img"],["dynamic-attr","src",["unknown",["item","splashImage"]],null],["flush-element"],["close-element"],["text","\\n                        "],["close-element"],["text","\\n                        "],["open-element","div",[]],["static-attr","class","event-shop-purchase-modal-summary-item-details"],["flush-element"],["text","\\n                          "],["open-element","p",[]],["static-attr","class","event-shop-purchase-modal-summary-item-name"],["flush-element"],["append",["unknown",["item","name"]],false],["close-element"],["text","\\n                          "],["open-element","div",[]],["static-attr","class","event-shop-purchase-modal-summary-item-description"],["flush-element"],["text","\\n                            "],["open-element","p",[]],["static-attr","class","event-shop-purchase-modal-summary-item-inventory-type"],["flush-element"],["text","\\n"],["block",["if"],[["get",["item","owned"]]],null,9,8],["text","                            "],["close-element"],["text","\\n"],["block",["if"],[["helper",["eq"],[["get",["item","subInventoryType"]],"CHEST"],null]],null,7],["text","                          "],["close-element"],["text","\\n                        "],["close-element"],["text","\\n                      "],["close-element"],["text","\\n"]],"locals":["item"]},{"statements":[["text","                        "],["append",["unknown",["tra","event_shop_see_more"]],false],["text","\\n"]],"locals":[]},{"statements":[["text","                        "],["append",["unknown",["tra","event_shop_see_less"]],false],["text","\\n"]],"locals":[]},{"statements":[["text","              "],["open-element","lol-uikit-scrollable",[]],["static-attr","overflow-masks","enabled"],["static-attr","class","event-shop-purchase-modal-summary-scrollable-area"],["flush-element"],["text","\\n                "],["open-element","div",[]],["static-attr","id","event-shop-purchse-modal-summary-description"],["dynamic-attr","class",["concat",["event-shop-purchse-modal-summary-description\\n                    ",["unknown",["descriptionElementAdditionalClassName"]],"\\n                    ",["helper",["if"],[["get",["isDescriptionExpanded"]],"event-shop-purchase-modal-summary-description-expanded"],null]]]],["flush-element"],["text","\\n                  "],["open-element","div",[]],["static-attr","id","event-shop-purchse-modal-summary-description-text"],["static-attr","class","event-shop-purchse-modal-summary-description-text"],["flush-element"],["text","\\n                    "],["append",["unknown",["selectedOption","details","description"]],true],["text","\\n                  "],["close-element"],["text","\\n                  "],["open-element","div",[]],["static-attr","class","event-shop-purchase-modal-summary-description-see-more"],["dynamic-attr","onclick",["helper",["action"],[["get",[null]],"expandOrCollapseDescription"],null],null],["flush-element"],["text","\\n                    "],["open-element","div",[]],["static-attr","class","event-shop-purchase-modal-summary-description-see-more-text"],["flush-element"],["text","\\n"],["block",["if"],[["get",["isDescriptionExpanded"]]],null,12,11],["text","                    "],["close-element"],["text","\\n                    "],["open-element","span",[]],["static-attr","class","event-shop-purchase-modal-summary-description-see-more-chevron"],["flush-element"],["close-element"],["text","\\n                  "],["close-element"],["text","\\n                "],["close-element"],["text","\\n                "],["open-element","div",[]],["static-attr","class","event-shop-purchase-modal-summary-items"],["flush-element"],["text","\\n                  "],["open-element","h5",[]],["static-attr","class","event-shop-purchase-modal-summary-items-header"],["flush-element"],["text","\\n                    "],["append",["unknown",["tra","event_shop_purchase_modal_purchse_summary"]],false],["text","\\n                  "],["close-element"],["text","\\n                  "],["open-element","div",[]],["static-attr","class","event-shop-purchase-modal-summary-item-list"],["flush-element"],["text","\\n"],["block",["each"],[["get",["selectedOption","bundledItems"]]],null,10],["text","                  "],["close-element"],["text","\\n                "],["close-element"],["text","\\n              "],["close-element"],["text","\\n              "],["open-element","div",[]],["static-attr","class","event-shop-purchase-modal-summary-unlock"],["flush-element"],["text","\\n                "],["open-element","div",[]],["static-attr","class","event-shop-purchase-modal-summary-price"],["flush-element"],["text","\\n                  "],["open-element","div",[]],["static-attr","class","event-shop-purchase-modal-summary-final-price"],["flush-element"],["text","\\n                    "],["open-element","span",[]],["static-attr","class","event-shop-purchase-modal-rp-icon"],["flush-element"],["close-element"],["text","\\n                    "],["open-element","div",[]],["static-attr","class","event-shop-purchase-modal-summary-final-price-text"],["flush-element"],["append",["unknown",["finalPrice"]],false],["close-element"],["text","\\n                  "],["close-element"],["text","\\n"],["block",["if"],[["get",["initialPrice"]]],null,6],["block",["if"],[["get",["discountPercentage"]]],null,5],["text","                "],["close-element"],["text","\\n                "],["open-element","div",[]],["static-attr","class","event-shop-purchase-modal-summary-balance"],["flush-element"],["text","\\n"],["block",["if"],[["get",["selectedOption","isPurchasable"]]],null,4,3],["text","                "],["close-element"],["text","\\n                "],["open-element","div",[]],["static-attr","class","event-shop-purchase-modal-summary-unlock-button"],["flush-element"],["text","\\n                  "],["open-element","lol-uikit-flat-button",[]],["static-attr","primary","true"],["dynamic-attr","disabled",["unknown",["unlockButtonDisabled"]],null],["dynamic-attr","onclick",["helper",["action"],[["get",[null]],"unlockPass"],null],null],["flush-element"],["text","\\n                    "],["open-element","div",[]],["static-attr","class","event-shop-purchase-modal-summary-unlock-button-content"],["flush-element"],["text","\\n                      "],["append",["unknown",["tra","event_shop_purchase_modal_unlock_now"]],false],["text","\\n                    "],["close-element"],["text","\\n                  "],["close-element"],["text","\\n                "],["close-element"],["text","\\n              "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","          "],["open-element","div",[]],["static-attr","class","event-shop-purchase-modal-summary-details"],["flush-element"],["text","\\n"],["block",["if"],[["get",["selectedOption"]]],null,13,2],["text","          "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","          "],["open-element","div",[]],["static-attr","class","event-shop-purchase-modal-spinner"],["flush-element"],["text","\\n            "],["append",["unknown",["event-shop-fallback"]],false],["text","\\n          "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","        "],["open-element","div",[]],["static-attr","class","event-shop-purchase-modal-summary-header"],["flush-element"],["text","\\n          "],["open-element","h4",[]],["static-attr","class","event-shop-purchase-modal-summary-title"],["flush-element"],["append",["unknown",["summaryTitle"]],false],["close-element"],["text","\\n          "],["open-element","h5",[]],["static-attr","class","event-shop-purchase-modal-summary-subtitle"],["flush-element"],["append",["unknown",["summarySubtitle"]],false],["close-element"],["text","\\n        "],["close-element"],["text","\\n"],["block",["if"],[["get",["isExecutingPurchase"]]],null,15,14]],"locals":[]},{"statements":[["text","        "],["open-element","div",[]],["static-attr","class","event-shop-purchase-modal-success"],["flush-element"],["text","\\n          "],["open-element","div",[]],["static-attr","class","event-shop-purchase-modal-success-header"],["flush-element"],["text","\\n            "],["open-element","div",[]],["static-attr","class","event-shop-purchase-modal-success-lock-icon"],["flush-element"],["close-element"],["text","\\n            "],["open-element","div",[]],["static-attr","class","event-shop-purchase-modal-success-text"],["flush-element"],["text","\\n              "],["append",["unknown",["tra","event_shop_purchase_modal_success_header"]],false],["text","\\n            "],["close-element"],["text","\\n            "],["open-element","div",[]],["static-attr","class","event-shop-purchase-modal-success-item-name"],["flush-element"],["text","\\n              "],["append",["unknown",["summaryTitle"]],false],["text","\\n            "],["close-element"],["text","\\n            "],["open-element","div",[]],["static-attr","class","event-shop-purchase-modal-success-message"],["flush-element"],["text","\\n              "],["append",["unknown",["tra","event_shop_purchase_modal_success_message"]],false],["text","\\n            "],["close-element"],["text","\\n          "],["close-element"],["text","\\n          "],["open-element","div",[]],["static-attr","class","event-shop-purchase-modal-success-footer"],["flush-element"],["text","\\n            "],["open-element","div",[]],["static-attr","class","event-shop-purchase-modal-summary-unlock-button"],["flush-element"],["text","\\n              "],["open-element","lol-uikit-flat-button",[]],["dynamic-attr","onclick",["helper",["action"],[["get",[null]],"handleCloseModalClick"],null],null],["flush-element"],["text","\\n                "],["open-element","div",[]],["static-attr","class","event-shop-purchase-modal-summary-unlock-button-content"],["flush-element"],["text","\\n                  "],["append",["unknown",["tra","event_shop_purchase_modal_awesome"]],false],["text","\\n                "],["close-element"],["text","\\n              "],["close-element"],["text","\\n            "],["close-element"],["text","\\n          "],["close-element"],["text","\\n        "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","        "],["open-element","div",[]],["static-attr","class","event-shop-purchase-modal-spinner"],["flush-element"],["text","\\n          "],["append",["unknown",["event-shop-fallback"]],false],["text","\\n        "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","            "],["open-element","div",[]],["dynamic-attr","class",["concat",["event-shop-purchase-modal-option\\n                ",["unknown",["option","optionTypeCssClass"]],"\\n                ",["unknown",["option","selectedCssClass"]],"\\n                ",["unknown",["optionsPointerClass"]],"\\n                ",["unknown",["optionsExecutingPurchaseClass"]]]]],["dynamic-attr","onclick",["helper",["action"],[["get",[null]],"selectOption",["get",["option"]]],null],null],["flush-element"],["text","\\n              "],["open-element","div",[]],["static-attr","class","event-shop-purchase-modal-option-image-wrapper"],["flush-element"],["text","\\n                "],["open-element","img",[]],["static-attr","class","event-shop-purchase-modal-option-image"],["dynamic-attr","src",["unknown",["option","details","splashImage"]],null],["dynamic-attr","alt",["unknown",["option","details","name"]],null],["flush-element"],["close-element"],["text","\\n              "],["close-element"],["text","\\n              "],["open-element","div",[]],["static-attr","class","event-shop-purchase-modal-option-details-wrapper"],["flush-element"],["text","\\n                "],["open-element","div",[]],["static-attr","class","event-shop-purchase-modal-option-details"],["flush-element"],["text","\\n                  "],["open-element","div",[]],["static-attr","class","event-shop-purchase-modal-option-title"],["flush-element"],["append",["unknown",["option","details","name"]],false],["close-element"],["text","\\n                  "],["open-element","div",[]],["static-attr","class","event-shop-purchase-modal-option-bottom-row"],["flush-element"],["text","\\n                    "],["open-element","div",[]],["static-attr","class","event-shop-purchase-modal-option-price"],["flush-element"],["text","\\n                      "],["open-element","span",[]],["static-attr","class","event-shop-purchase-modal-rp-icon"],["flush-element"],["close-element"],["text","\\n                      "],["open-element","div",[]],["static-attr","class","event-shop-purchase-modal-option-price-text"],["flush-element"],["append",["unknown",["option","finalPrice"]],false],["close-element"],["text","\\n                    "],["close-element"],["text","\\n                    "],["open-element","div",[]],["static-attr","class","event-shop-purchase-modal-option-quantity"],["flush-element"],["append",["unknown",["option","bundledItems","length"]],false],["close-element"],["text","\\n                  "],["close-element"],["text","\\n                "],["close-element"],["text","\\n              "],["close-element"],["text","\\n            "],["close-element"],["text","\\n"]],"locals":["option"]},{"statements":[["text","        "],["open-element","div",[]],["dynamic-attr","class",["concat",["event-shop-purchase-modal-options-wrapper ",["unknown",["numberOfOptionsWrapperCssClass"]]]]],["flush-element"],["text","\\n"],["block",["each"],[["get",["options"]]],null,19],["text","        "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","  "],["open-element","div",[]],["static-attr","class","event-shop-purchase-modal"],["flush-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","event-shop-purchase-modal-options"],["flush-element"],["text","\\n"],["block",["if"],[["get",["options","length"]]],null,20,18],["text","    "],["close-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","event-shop-purchase-modal-summary"],["flush-element"],["text","\\n"],["block",["if"],[["get",["purchaseCompleted"]]],null,17,16],["text","    "],["close-element"],["text","\\n  "],["close-element"],["text","\\n"]],"locals":[]}],"hasPartials":false}',
                meta: {}
            })
        }, (e, t, n) => {
            const s = n(1).Ember;
            e.exports = s.HTMLBars.template({
                id: "S8OtbX+m",
                block: '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\Releases_14_1\\\\LeagueClientContent_Release\\\\15693\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-event-shop\\\\src\\\\app\\\\templates\\\\components\\\\event-shop-reward-track-wrapper.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\Releases_14_1\\\\LeagueClientContent_Release\\\\15693\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-event-shop\\\\src\\\\app\\\\styles\\\\components\\\\event-shop-reward-track-wrapper.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\Releases_14_1\\\\LeagueClientContent_Release\\\\15693\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-event-shop\\\\src\\\\app\\\\components\\\\event-shop-reward-track-wrapper.js\\" "],["text","\\n"],["block",["if"],[["get",["rewardTrackItems"]]],null,0]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","  "],["append",["helper",["reward-tracker"],null,[["rewardTrackItems","rewardTrackProgress","displayCurrentBonusIteration","rewardTrackBonusItems","rewardTrackBonusProgress","itemClick","bonusItemClick","trackerSize","useDefaultTooltipComponent","isDisabled","shouldScrollToUnclaimedReward","scrollingArrowsEnabled"],[["get",["rewardTrackItems"]],["get",["rewardTrackProgress"]],["get",["displayCurrentBonusIteration"]],["get",["rewardTrackBonusItems"]],["get",["rewardTrackBonusProgress"]],["helper",["action"],[["get",[null]],"clickItem"],null],["helper",["action"],[["get",[null]],"clickBonusItem"],null],["get",["trackerSize"]],true,["get",["isGracePeriod"]],true,["get",["scrollingArrowsEnabled"]]]]],false],["text","\\n"]],"locals":[]}],"hasPartials":false}',
                meta: {}
            })
        }, (e, t, n) => {
            const s = n(1).Ember;
            e.exports = s.HTMLBars.template({
                id: "5qVftyAa",
                block: '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\Releases_14_1\\\\LeagueClientContent_Release\\\\15693\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-event-shop\\\\src\\\\app\\\\templates\\\\components\\\\event-shop-token-shop.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\Releases_14_1\\\\LeagueClientContent_Release\\\\15693\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-event-shop\\\\src\\\\app\\\\styles\\\\components\\\\event-shop-token-shop.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\Releases_14_1\\\\LeagueClientContent_Release\\\\15693\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-event-shop\\\\src\\\\app\\\\components\\\\event-shop-token-shop.js\\" "],["text","\\n"],["block",["if"],[["get",["categoriesOffers","length"]]],null,2,0]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","  "],["append",["helper",["event-shop-fallback"],null,[["error"],[["get",["failureLoadingTokenShop"]]]]],false],["text","\\n"]],"locals":[]},{"statements":[["text","          "],["open-element","div",[]],["static-attr","class","event-shop-token-shop-section-header-title-text"],["flush-element"],["append",["helper",["get"],[["get",["tra"]],["helper",["concat"],["event_shop_offers_category_",["get",["categoryOffers","category"]]],null]],null],false],["close-element"],["text","\\n          "],["open-element","hr",[]],["static-attr","class","event-shop-token-shop-section-header-line"],["flush-element"],["close-element"],["text","\\n          "],["append",["helper",["event-shop-category-offers"],null,[["categoryOffers","headerTxtObserver"],[["get",["categoryOffers"]],["get",["headerTxtObserver"]]]]],false],["text","\\n"]],"locals":["categoryOffers"]},{"statements":[["text","  "],["append",["helper",["event-shop-category-nav-bar"],null,[["currentCategory","categoriesOffers","scrollToCategory"],[["get",["currentCategory"]],["get",["categoriesOffers"]],["helper",["action"],[["get",[null]],"scrollToCategory"],null]]]],false],["text","\\n  "],["open-element","lol-uikit-scrollable",[]],["static-attr","id","token-shop-scrollable-container"],["static-attr","class","event-shop-token-shop-scrollable-section"],["flush-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","event-shop-token-shop-content"],["flush-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","event-shop-token-shop-offers"],["flush-element"],["text","\\n"],["block",["each"],[["get",["categoriesOffers"]]],null,1],["text","      "],["close-element"],["text","\\n    "],["close-element"],["text","\\n  "],["close-element"],["text","\\n"]],"locals":[]}],"hasPartials":false}',
                meta: {}
            })
        }, (e, t, n) => {
            const s = n(1).Ember;
            e.exports = s.HTMLBars.template({
                id: "KYlRMLAA",
                block: '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\Releases_14_1\\\\LeagueClientContent_Release\\\\15693\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-event-shop\\\\src\\\\app\\\\templates\\\\components\\\\event-shop-xp.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\Releases_14_1\\\\LeagueClientContent_Release\\\\15693\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-event-shop\\\\src\\\\app\\\\styles\\\\components\\\\event-shop-xp.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\Releases_14_1\\\\LeagueClientContent_Release\\\\15693\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-event-shop\\\\src\\\\app\\\\components\\\\event-shop-xp.js\\" "],["text","\\n"],["open-element","div",[]],["static-attr","class","event-shop-xp-header-pass-track"],["flush-element"],["text","\\n  "],["append",["unknown",["tra","event_shop_xp_header_pass_track"]],false],["text","\\n"],["close-element"],["text","\\n"],["open-element","div",[]],["static-attr","class","event-shop-xp-vertical-divider"],["flush-element"],["close-element"],["text","\\n"],["open-element","div",[]],["dynamic-attr","class",["concat",["event-shop-xp-level-tooltip ",["helper",["if"],[["get",["rewardTrackXP","isBonusPhase"]],"is-completed"],null]]]],["flush-element"],["text","\\n"],["block",["uikit-tooltip"],null,[["tooltipPosition","type"],["top","system"]],10],["text","  "],["open-element","div",[]],["static-attr","class","event-shop-xp-level"],["flush-element"],["text","\\n"],["block",["if"],[["get",["isGracePeriod"]]],null,5,4],["text","  "],["close-element"],["text","\\n"],["block",["if"],[["get",["isGracePeriod"]]],null,1,0],["close-element"],["text","\\n"],["open-element","div",[]],["static-attr","class","event-shop-xp-vertical-divider"],["flush-element"],["close-element"],["text","\\n"]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","    "],["open-element","div",[]],["dynamic-attr","class",["concat",["event-shop-xp-label-xp-wrapper ",["helper",["if"],[["get",["xpOverflow"]]," xp-overflow"],null]]]],["flush-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","event-shop-xp-label-xp"],["flush-element"],["text","\\n        "],["open-element","span",[]],["static-attr","class","event-shop-xp-label-xp-current"],["flush-element"],["append",["unknown",["rewardTrackXP","currentLevelXP"]],false],["close-element"],["text","\\n         / \\n        "],["open-element","span",[]],["static-attr","class","event-shop-xp-label-xp-total"],["flush-element"],["text"," "],["append",["unknown",["rewardTrackXP","totalLevelXP"]],false],["close-element"],["text","\\n      "],["close-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","event-shop-xp-label-level-xp"],["flush-element"],["append",["unknown",["tra","event_shop_xp_label"]],false],["close-element"],["text","\\n    "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","    "],["open-element","div",[]],["dynamic-attr","class",["concat",["event-shop-xp-label-xp-wrapper ",["helper",["if"],[["get",["hasUnclaimedRewards"]]," unclaimed"],null]]]],["flush-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","event-shop-xp-label-xp"],["flush-element"],["text","\\n        "],["open-element","span",[]],["static-attr","class","event-shop-xp-label-xp-current"],["flush-element"],["append",["unknown",["rewardTrackXP","currentLevel"]],false],["close-element"],["text","\\n      "],["close-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","event-shop-xp-label-level-xp"],["flush-element"],["append",["unknown",["tra","event_shop_reward_description_level_completed"]],false],["close-element"],["text","\\n    "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","      "],["open-element","div",[]],["static-attr","class","event-shop-xp-label-level"],["flush-element"],["text","\\n        "],["append",["unknown",["levelLabel"]],false],["text","\\n      "],["close-element"],["text","\\n    "]],"locals":[]},{"statements":[["text","      "],["open-element","div",[]],["static-attr","class","event-shop-xp-repeat"],["flush-element"],["text","\\n        "],["open-element","svg",[]],["static-attr","class","event-shop-xp-repeat-icon"],["static-attr","viewBox","0 0 10 7"],["flush-element"],["text","\\n          "],["open-element","path",[]],["static-attr","class","event-shop-xp-repeat-icon-path"],["static-attr","fill-rule","evenodd"],["static-attr","clip-rule","evenodd"],["static-attr","d","M6.38908 1.77185V0.399902L3.9833 2.31037L6.38956 4.22084V2.85168C6.81026 2.85942 7.21055 3.02847 7.50237 3.32164C7.79419 3.61481 7.95364 4.00809 7.94565 4.41496C7.93765 4.82183 7.76286 5.20897 7.45972 5.4912C7.15659 5.77343 6.74995 5.92765 6.32925 5.91991H3.33337C2.91248 5.91991 2.50883 5.75821 2.21121 5.47037C1.9136 5.18254 1.7464 4.79215 1.7464 4.3851C1.7464 3.97804 1.9136 3.58765 2.21121 3.29982C2.50883 3.01199 2.91248 2.85028 3.33337 2.85028V1.77045C2.61636 1.77045 1.92872 2.04593 1.42171 2.53627C0.914713 3.02661 0.629883 3.69165 0.629883 4.3851C0.629883 5.07854 0.914713 5.74359 1.42171 6.23393C1.92872 6.72427 2.61636 6.99974 3.33337 6.99974H6.32925C6.68409 7.00357 7.03623 6.93977 7.36557 6.81198C7.69491 6.68419 7.995 6.49492 8.24871 6.25496C8.50242 6.01501 8.70477 5.72907 8.84422 5.41349C8.98367 5.0979 9.05748 4.75884 9.06144 4.41566C9.0654 4.07249 8.99943 3.73192 8.8673 3.4134C8.73517 3.09488 8.53947 2.80465 8.29136 2.55928C8.04325 2.31391 7.7476 2.1182 7.42129 1.98334C7.09498 1.84847 6.7444 1.77708 6.38956 1.77325L6.38908 1.77185Z"],["static-attr","fill","#5b5a56"],["flush-element"],["close-element"],["text","\\n        "],["close-element"],["text","\\n        "],["open-element","span",[]],["static-attr","class","event-shop-xp-iteration"],["flush-element"],["text","\\n          "],["append",["unknown",["rewardTrackXP","iteration"]],false],["text","\\n        "],["close-element"],["text","\\n      "],["close-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","event-shop-xp-vertical-divider"],["flush-element"],["close-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","event-shop-xp-label-level"],["flush-element"],["text","\\n        "],["append",["unknown",["levelLabel"]],false],["text","\\n      "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["block",["if"],[["get",["rewardTrackXP","isBonusPhase"]]],null,3,2]],"locals":[]},{"statements":[["text","      "],["open-element","div",[]],["static-attr","class","event-shop-xp-label-progress-locked"],["flush-element"],["text","\\n        "],["append",["unknown",["tra","event_shop_xp_label_level_progress_locked"]],false],["text","\\n      "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","        "],["open-element","div",[]],["static-attr","class","event-shop-progression-tooltip-block"],["flush-element"],["text","\\n          "],["open-element","h5",[]],["flush-element"],["append",["unknown",["tra","event_shop_xp_label_event_xp"]],false],["close-element"],["text","\\n          "],["open-element","p",[]],["flush-element"],["append",["unknown",["tra","event_shop_xp_tooltip_complete_top"]],false],["open-element","br",[]],["flush-element"],["close-element"],["append",["unknown",["tra","event_shop_xp_tooltip_complete_bottom"]],false],["text","\\n          "],["close-element"],["text","\\n        "],["close-element"],["text","\\n      "]],"locals":[]},{"statements":[["text","        "],["open-element","div",[]],["static-attr","class","event-shop-progression-tooltip-block-repeat"],["flush-element"],["text","\\n          "],["open-element","div",[]],["static-attr","class","event-shop-xp-tooltip-block-description"],["flush-element"],["text","\\n            "],["open-element","h5",[]],["static-attr","class","event-shop-xp-tooltip-block-description-header"],["flush-element"],["text","\\n              "],["append",["unknown",["tra","event_shop_xp_tooltip_looping_description_header"]],false],["text","\\n            "],["close-element"],["text","\\n            "],["open-element","p",[]],["static-attr","class","event-shop-xp-tooltip-block-description-content"],["flush-element"],["text","\\n              "],["append",["helper",["sanitize"],[["get",["tra","event_shop_xp_tooltip_looping_description_content$html"]]],null],false],["text","\\n            "],["close-element"],["text","\\n          "],["close-element"],["text","\\n          "],["open-element","div",[]],["static-attr","class","event-shop-xp-vertical-divider"],["flush-element"],["close-element"],["text","\\n          "],["open-element","div",[]],["static-attr","class","event-shop-progression-tooltip-block-loop"],["flush-element"],["text","\\n            "],["open-element","div",[]],["static-attr","class","event-shop-xp-tooltip-repeat"],["flush-element"],["text","\\n              "],["open-element","svg",[]],["static-attr","class","event-shop-xp-tooltip-repeat-icon"],["static-attr","viewBox","0 0 10 7"],["flush-element"],["text","\\n                "],["open-element","path",[]],["static-attr","class","event-shop-xp-repeat-icon-path"],["static-attr","fill-rule","evenodd"],["static-attr","clip-rule","evenodd"],["static-attr","d","M6.38908 1.77185V0.399902L3.9833 2.31037L6.38956 4.22084V2.85168C6.81026 2.85942 7.21055 3.02847 7.50237 3.32164C7.79419 3.61481 7.95364 4.00809 7.94565 4.41496C7.93765 4.82183 7.76286 5.20897 7.45972 5.4912C7.15659 5.77343 6.74995 5.92765 6.32925 5.91991H3.33337C2.91248 5.91991 2.50883 5.75821 2.21121 5.47037C1.9136 5.18254 1.7464 4.79215 1.7464 4.3851C1.7464 3.97804 1.9136 3.58765 2.21121 3.29982C2.50883 3.01199 2.91248 2.85028 3.33337 2.85028V1.77045C2.61636 1.77045 1.92872 2.04593 1.42171 2.53627C0.914713 3.02661 0.629883 3.69165 0.629883 4.3851C0.629883 5.07854 0.914713 5.74359 1.42171 6.23393C1.92872 6.72427 2.61636 6.99974 3.33337 6.99974H6.32925C6.68409 7.00357 7.03623 6.93977 7.36557 6.81198C7.69491 6.68419 7.995 6.49492 8.24871 6.25496C8.50242 6.01501 8.70477 5.72907 8.84422 5.41349C8.98367 5.0979 9.05748 4.75884 9.06144 4.41566C9.0654 4.07249 8.99943 3.73192 8.8673 3.4134C8.73517 3.09488 8.53947 2.80465 8.29136 2.55928C8.04325 2.31391 7.7476 2.1182 7.42129 1.98334C7.09498 1.84847 6.7444 1.77708 6.38956 1.77325L6.38908 1.77185Z"],["static-attr","fill","#5b5a56"],["flush-element"],["close-element"],["text","\\n              "],["close-element"],["text","\\n              "],["open-element","span",[]],["static-attr","class","event-shop-xp-iteration"],["flush-element"],["text","\\n                "],["append",["unknown",["rewardTrackXP","iteration"]],false],["text","\\n              "],["close-element"],["text","\\n            "],["close-element"],["text","\\n            "],["open-element","p",[]],["flush-element"],["append",["unknown",["tra","event_shop_xp_tooltip_looping_loop_header"]],false],["close-element"],["text","\\n            "],["open-element","div",[]],["static-attr","class","event-shop-xp-horizontal-divider"],["flush-element"],["close-element"],["text","\\n            "],["open-element","p",[]],["flush-element"],["append",["unknown",["completedLoops"]],false],["text"," "],["append",["unknown",["tra","event_shop_xp_tooltip_looping_loop_footer"]],false],["close-element"],["text","\\n          "],["close-element"],["text","\\n        "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["block",["if"],[["get",["rewardTrackXP","isBonusPhase"]]],null,7,6]],"locals":[]},{"statements":[["text","        "],["open-element","div",[]],["static-attr","class","event-shop-progression-tooltip-block"],["flush-element"],["text","\\n          "],["open-element","h5",[]],["flush-element"],["append",["unknown",["tra","event_shop_xp_label_level_progress_locked"]],false],["close-element"],["text","\\n          "],["open-element","p",[]],["flush-element"],["append",["helper",["sanitize"],[["get",["tra","event_shop_xp_tooltip_progress_locked_description"]]],null],false],["close-element"],["text","\\n        "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","    "],["open-element","lol-uikit-content-block",[]],["static-attr","class","event-shop-xp-tooltip-content"],["static-attr","type","tooltip-system"],["flush-element"],["text","\\n"],["block",["if"],[["get",["isGracePeriod"]]],null,9,8],["text","    "],["close-element"],["text","\\n"]],"locals":[]}],"hasPartials":false}',
                meta: {}
            })
        }, (e, t) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = void 0;
            t.default = class {
                constructor(e) {
                    this.privateAPI = e
                }
                show() {
                    this.privateAPI.show()
                }
                hide() {
                    this.privateAPI.hide()
                }
            }
        }],
        t = {};

    function n(s) {
        var a = t[s];
        if (void 0 !== a) return a.exports;
        var o = t[s] = {
            exports: {}
        };
        return e[s](o, o.exports, n), o.exports
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
        const s = "rcp-fe-lol-event-shop",
            a = window.testsSandboxDoc || document.currentScript.ownerDocument;
        const o = window.getPluginAnnounceEventName(s);
        a.addEventListener(o, (function(e) {
            (0, e.registrationHandler)((e => t.default.init(e, {
                ComponentFactory: e => e.get("rcp-fe-common-libs").getComponentFactory(),
                Telemetry: e => e.get("rcp-fe-common-libs").getTelemetry(),
                dataBinding: e => e.get("rcp-fe-common-libs").getDataBinding("rcp-fe-lol-event-shop"),
                Ember: e => e.get("rcp-fe-ember-libs").getEmber(),
                emberL10n: e => e.get("rcp-fe-ember-libs").getEmberL10n(),
                logger: e => e.get("rcp-fe-common-libs").logging.create(s),
                UIKit: e => e.get("rcp-fe-lol-uikit"),
                AudioPlugin: e => e.get("rcp-fe-audio"),
                Navigation: e => e.get("rcp-fe-lol-navigation"),
                RewardTrackerEmberComponents: e => e.get("rcp-fe-lol-shared-components").getRewardTrackerEmberComponents(),
                MultiPurchaseSliderEmberComponents: e => e.get("rcp-fe-lol-shared-components").getMultiPurchaseSliderEmberComponents(),
                Router: e => e.get("rcp-fe-lol-shared-components").getApi_Router(),
                SharedComponents: e => e.get("rcp-fe-lol-shared-components").getSharedEmberComponents(),
                socket: e => e.getSocket(),
                Viewport: e => e.get("rcp-fe-lol-shared-components").getApi_Viewport()
            }).then((() => {
                const n = e.get("rcp-fe-lol-l10n").tra().overlay("/fe/lol-l10n/trans.json").overlay("/fe/lol-loot/trans.json").overlay("/fe/lol-event-shop/trans.json").overlay("/fe/lol-l10n/trans.json").overlay("/fe/ember-libs/trans-loot-table.json"),
                    s = t.default.emberL10n(t.default.Ember, n),
                    a = t.default.Ember.Object.create({
                        isVisible: !1
                    });
                return t.default.add({
                    emberApplicationFactory: e.get("rcp-fe-ember-libs").getEmberApplicationFactory(),
                    externalModel: a,
                    tra: n,
                    traService: s
                })
            })).then((() => (0, n(2).default)()))))
        }), {
            once: !0
        })
    })()
})();