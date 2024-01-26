(() => {
    var e = [, e => {
            "use strict";
            let t;

            function n() {
                return t || (console.error("The `provider` object has not been set, please do so by calling the `init` method."), null)
            }
            const a = {
                init: function(e, n) {
                    return t = e, this.add(n)
                },
                _getValue: function(e, n) {
                    let a;
                    return "function" == typeof n ? (a = n(t), a || console.warn("The function for key " + e + " returned a falsy value: ", a)) : "string" == typeof n ? (a = t.get(n), a || console.warn("The provider `get` invocation for the key " + e + " returned a falsy value: ", a)) : "object" == typeof n && (a = n), a
                },
                add: function(e) {
                    e = e || {};
                    const t = [],
                        n = this;
                    return Object.keys(e).forEach((function(a) {
                        const s = e[a],
                            l = n._getValue(a, s);
                        l && l.then ? (l.then((function(e) {
                            e || console.warn("The promise for the key " + a + " resolved with a falsy value: ", e), n._addValue(a, e)
                        })), t.push(l)) : n._addValue(a, l)
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
            e.exports = a
        }, (e, t, n) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = function() {
                const e = new a.default;
                return new s.default(e)
            };
            var a = l(n(3)),
                s = l(n(97));

            function l(e) {
                return e && e.__esModule ? e : {
                    default: e
                }
            }
        }, (e, t, n) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = void 0;
            var a = n(1),
                s = function(e, t) {
                    if (!t && e && e.__esModule) return e;
                    if (null === e || "object" != typeof e && "function" != typeof e) return {
                        default: e
                    };
                    var n = o(t);
                    if (n && n.has(e)) return n.get(e);
                    var a = {},
                        s = Object.defineProperty && Object.getOwnPropertyDescriptor;
                    for (var l in e)
                        if ("default" !== l && Object.prototype.hasOwnProperty.call(e, l)) {
                            var r = s ? Object.getOwnPropertyDescriptor(e, l) : null;
                            r && (r.get || r.set) ? Object.defineProperty(a, l, r) : a[l] = e[l]
                        } a.default = e, n && n.set(e, a);
                    return a
                }(n(4)),
                l = n(5);

            function o(e) {
                if ("function" != typeof WeakMap) return null;
                var t = new WeakMap,
                    n = new WeakMap;
                return (o = function(e) {
                    return e ? n : t
                })(e)
            }
            t.default = class {
                constructor() {
                    this.screenRoot = this.getScreenRoot(), this.application = null, this.applicationRegistered = !1, this.eventHubDataBinding = (0, a.dataBinding)(l.EVENT_HUB_API, a.socket)
                }
                getScreenRoot() {
                    const e = a.Viewport.getApiKey(s.APP_NAME);
                    return a.Viewport.main().getScreenRoot(e, s.APP_NAME)
                }
                show(e) {
                    return this.applicationRegistered || ((0, s.default)(), this.applicationRegistered = !0), this.screenRoot.bump().then((() => {
                        this.application || (this.application = a.ComponentFactory.create(s.APP_NAME), this.screenRoot.getElement().appendChild(this.application.domNode)), a.externalModel.set("isVisible", !0), a.externalModel.set("navOptions", e), a.Telemetry.sendCustomData(l.TELEMETRY.TABLE, {
                            eventName: l.TELEMETRY.SHOW_EVENT,
                            eventShopEventId: e?.eventId
                        })
                    }))
                }
                hide() {
                    a.externalModel.set("isVisible", !1), this.screenRoot.release()
                }
            }
        }, (e, t, n) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.APP_NAME = void 0, t.default = function() {
                const e = {
                    ComponentFactory: a.ComponentFactory,
                    Router: l.default,
                    ApplicationRoute: o.default,
                    IndexRoute: r.default,
                    EventShopRoute: i.default,
                    HallOfLegendsRoute: c.default,
                    tra: a.traService,
                    EventHubService: p.default,
                    PlayerSettingsService: u.default,
                    PageHeaderComponent: d.default,
                    PurchaseLevelsModalComponent: m.default,
                    EventShopCardMultiPurchaseModalComponent: h.default,
                    EventShopCategoryNavBarComponent: v.default,
                    EventShopCategoryNavBarTabComponent: f.default,
                    EventShopCategoryOffersComponent: _.default,
                    EventShopFallbackComponent: g.default,
                    EventShopMainViewComponent: b.default,
                    EventShopOfferCardComponent: x.default,
                    EventShopProgressionComponent: E.default,
                    EventShopPurchaseModalComponent: T.default,
                    EventShopRewardTrackWrapperComponent: k.default,
                    EventShopTokenBalanceAmountComponent: y.default,
                    EventShopTokenShopComponent: P.default,
                    EventShopXpComponent: C.default,
                    HolXpComponent: w.default,
                    HolRewardDetailsComponent: S.default,
                    RemainingTimeTextComponent: ne,
                    ...a.RewardTrackerEmberComponents,
                    ...a.MultiPurchaseSliderEmberComponents,
                    ApplicationController: R.default,
                    IndexController: O.default,
                    EventShopController: M.default,
                    HallOfLegendsController: A.default,
                    InventoryTypeNameHelper: I.default,
                    EqHelper: L.default,
                    TEMPLATES: {
                        application: D.default,
                        index: N.default,
                        [s.ROUTES.EVENT_SHOP]: B.default,
                        [s.ROUTES.HALL_OF_LEGENDS]: H.default,
                        "components/page-header": U.default,
                        "components/purchase-levels-modal": V.default,
                        "components/event-shop-card-multi-purchase-modal": j.default,
                        "components/event-shop-category-nav-bar-tab": F.default,
                        "components/event-shop-category-nav-bar": K.default,
                        "components/event-shop-category-offers": Y.default,
                        "components/event-shop-fallback": G.default,
                        "components/event-shop-main-view": W.default,
                        "components/event-shop-offer-card": X.default,
                        "components/event-shop-progression": Q.default,
                        "components/event-shop-purchase-modal": z.default,
                        "components/event-shop-reward-track-wrapper": q.default,
                        "components/event-shop-token-shop": $.default,
                        "components/event-shop-xp": Z.default,
                        "components/hol-xp": J.default,
                        "components/hol-reward-details": ee.default
                    }
                };
                a.emberApplicationFactory.setFactoryDefinition(ae, e, {
                    EMBER_CLI_COMPAT: !0
                })
            };
            var a = n(1),
                s = n(5),
                l = te(n(6)),
                o = te(n(7)),
                r = te(n(8)),
                i = te(n(9)),
                c = te(n(10)),
                p = te(n(11)),
                u = te(n(12)),
                d = te(n(13)),
                m = te(n(34)),
                h = te(n(35)),
                v = te(n(37)),
                f = te(n(38)),
                _ = te(n(39)),
                g = te(n(40)),
                b = te(n(41)),
                x = te(n(42)),
                E = te(n(44)),
                T = te(n(45)),
                k = te(n(46)),
                y = te(n(65)),
                P = te(n(66)),
                C = te(n(67)),
                w = te(n(68)),
                S = te(n(69)),
                R = te(n(70)),
                O = te(n(72)),
                M = te(n(73)),
                A = te(n(74)),
                I = te(n(75)),
                L = te(n(76)),
                D = te(n(77)),
                N = te(n(78)),
                B = te(n(79)),
                H = te(n(80)),
                U = te(n(81)),
                V = te(n(82)),
                j = te(n(83)),
                F = te(n(84)),
                K = te(n(85)),
                Y = te(n(86)),
                G = te(n(87)),
                W = te(n(88)),
                X = te(n(89)),
                Q = te(n(90)),
                z = te(n(91)),
                q = te(n(92)),
                $ = te(n(93)),
                Z = te(n(94)),
                J = te(n(95)),
                ee = te(n(96));

            function te(e) {
                return e && e.__esModule ? e : {
                    default: e
                }
            }
            const {
                RemainingTimeTextComponent: ne
            } = a.SharedComponents, ae = "rcp-fe-lol-event-hub";
            t.APP_NAME = ae
        }, (e, t) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = t.TOKEN_SHOP_OBSERVERS = t.TELEMETRY = t.ROUTES = t.REWARD_TRACK_OBSERVERS = t.REWARD_TRACK_ITEM_STATE = t.PURCHASE_OFFER_PATH = t.PURCHASE_ITEM_PATH = t.PROGRESSION_PURCHASE_DATA_PATH = t.PASS_OWNERSHIP_TYPES = t.PASS_BUNDLES_PATH = t.OFFER_STATES = t.HOL_OBSERVERS = t.EVENT_SHOP_OFFER_CARD_CONTAINER_CLASSNAME = t.EVENT_SHOP_OBSERVERS = t.EVENT_OBSERVERS_BY_TYPE = t.EVENT_INFO_PATH = t.EVENT_HUB_TYPES = t.EVENT_HUB_API = t.EVENT_BASE_OBSERVERS = t.CLAIM_ALL_REWARDS_PATH = void 0;
            const n = "/lol-event-hub/v1";
            t.EVENT_HUB_API = n;
            const a = "/info";
            t.EVENT_INFO_PATH = a;
            t.PASS_BUNDLES_PATH = "/pass-bundles";
            t.PROGRESSION_PURCHASE_DATA_PATH = "/progression-purchase-data";
            t.PURCHASE_ITEM_PATH = "/purchase-item";
            t.PURCHASE_OFFER_PATH = "/purchase-offer";
            const s = "/reward-track/claim-all";
            t.CLAIM_ALL_REWARDS_PATH = s;
            const l = {
                INDEX: "/",
                EVENT_SHOP: "event-shop",
                HALL_OF_LEGENDS: "hall-of-legends"
            };
            t.ROUTES = l;
            const o = {
                EVENT_SHOP: "kEventShop",
                HALL_OF_LEGENDS: "kHallOfLegends"
            };
            t.EVENT_HUB_TYPES = o;
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
                PURCHASE_PASS_UNLOCK_CLICK_EVENT: "event_shop_purchase_pass_unlock_click",
                REWARD_CLICK_EVENT: "hall_of_legends_reward_click",
                REPLAY_BUTTON_CLICK_EVENT: "hall_of_legends_replay_button_click"
            };
            const c = [{
                propertyName: "info",
                propertyPath: a
            }, {
                propertyName: "backgroundData",
                propertyPath: "/pass-background-data"
            }, {
                propertyName: "eventShopProgressionData",
                propertyPath: "/progress-info-data"
            }, {
                propertyName: "eventDetailsData",
                propertyPath: "/event-details-data"
            }];
            t.EVENT_BASE_OBSERVERS = c;
            const p = [{
                propertyName: "tokenShopData",
                propertyPath: "/token-shop"
            }, {
                propertyName: "categoriesOffers",
                propertyPath: "/token-shop/categories-offers"
            }, {
                propertyName: "tokenBalance",
                propertyPath: "/token-shop/token-balance",
                defaultValue: 0
            }];
            t.TOKEN_SHOP_OBSERVERS = p;
            const u = [{
                propertyName: "rewardTrackProgress",
                propertyPath: "/reward-track/progress"
            }, {
                propertyName: "rewardTrackItems",
                propertyPath: "/reward-track/items"
            }, {
                propertyName: "rewardTrackBonusItems",
                propertyPath: "/reward-track/bonus-items"
            }, {
                propertyName: "rewardTrackBonusProgress",
                propertyPath: "/reward-track/bonus-progress"
            }, {
                propertyName: "unclaimedRewards",
                propertyPath: "/reward-track/unclaimed-rewards"
            }, {
                propertyName: "rewardTrackXP",
                propertyPath: "/reward-track/xp"
            }, {
                propertyName: "failureLoadingRewardTrack",
                propertyPath: "/reward-track/failure"
            }];
            t.REWARD_TRACK_OBSERVERS = u;
            const d = [...c, ...p, ...u, {
                propertyName: "isGracePeriod",
                propertyPath: "/is-grace-period"
            }];
            t.EVENT_SHOP_OBSERVERS = d;
            const m = [...c, ...u, {
                propertyName: "progressionPurchaseData",
                propertyPath: "/progression-purchase-data"
            }];
            t.HOL_OBSERVERS = m;
            const h = {
                [o.EVENT_SHOP]: d,
                [o.HALL_OF_LEGENDS]: m
            };
            t.EVENT_OBSERVERS_BY_TYPE = h;
            const v = "event-shop-offer-card";
            t.EVENT_SHOP_OFFER_CARD_CONTAINER_CLASSNAME = v;
            var f = {
                CLAIM_ALL_REWARDS_PATH: s,
                EVENT_HUB_API: n,
                EVENT_OBSERVERS_BY_TYPE: h,
                PASS_OWNERSHIP_TYPES: r,
                REWARD_TRACK_ITEM_STATE: i,
                EVENT_SHOP_OFFER_CARD_CONTAINER_CLASSNAME: v,
                ROUTES: l,
                EVENT_HUB_TYPES: o
            };
            t.default = f
        }, (e, t, n) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = void 0;
            var a = n(1),
                s = n(5);
            const l = a.Ember.Router.extend({
                location: "none"
            });
            l.map((function() {
                this.route(s.ROUTES.EVENT_SHOP), this.route(s.ROUTES.HALL_OF_LEGENDS)
            }));
            var o = l;
            t.default = o
        }, (e, t, n) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = void 0;
            var a = n(1),
                s = a.Ember.Route.extend({
                    model: () => a.externalModel
                });
            t.default = s
        }, (e, t, n) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = void 0;
            var a = n(1),
                s = a.Ember.Route.extend({
                    model: () => a.externalModel
                });
            t.default = s
        }, (e, t, n) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = void 0;
            var a = n(1),
                s = a.Ember.Route.extend({
                    model: () => a.externalModel
                });
            t.default = s
        }, (e, t, n) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = void 0;
            var a = n(1),
                s = a.Ember.Route.extend({
                    model: () => a.externalModel
                });
            t.default = s
        }, (e, t, n) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = void 0;
            var a = n(5),
                s = n(1),
                l = s.Ember.Service.extend({
                    init() {
                        this._super(...arguments), this.eventHubDataBinding = (0, s.dataBinding)(a.EVENT_HUB_API, s.socket), this.eventSpecificObservers = [], this.getEvents()
                    },
                    getEvents() {
                        this.eventHubDataBinding.observe("/events", this, (e => {
                            this.setProperties({
                                events: e
                            })
                        }))
                    },
                    setActiveEvent(e) {
                        const t = this.get("activeEventId");
                        if (!t || t !== e) {
                            this.clearEventSpecificData();
                            const t = this.events.find((({
                                    eventId: t
                                }) => t === e)),
                                n = t?.eventInfo?.eventType;
                            this.setProperties({
                                activeEventId: e,
                                activeEventType: n
                            }), this.observeEventSpecificData()
                        }
                    },
                    observeEventSpecificData() {
                        const e = a.EVENT_OBSERVERS_BY_TYPE[this.activeEventType] || [];
                        for (const {
                                propertyName: t,
                                propertyPath: n,
                                defaultValue: a
                            }
                            of e) {
                            const e = this.getEventSpecificPropertyPath(n);
                            this.eventSpecificObservers.push({
                                path: e,
                                propertyName: t
                            }), this.eventHubDataBinding.observe(e, this, (e => {
                                this.isDestroying || this.isDestroyed || (null == e && (e = a), this.setProperties({
                                    [t]: e
                                }))
                            }))
                        }
                    },
                    clearEventSpecificData() {
                        this.eventSpecificObservers.forEach((({
                            path: e,
                            propertyName: t
                        }) => {
                            this.eventHubDataBinding.unobserve(e), this.setProperties({
                                [t]: void 0
                            })
                        })), this.eventSpecificObservers = []
                    },
                    async getPassBundles() {
                        return await this.eventHubDataBinding.get(this.getEventSpecificPropertyPath(a.PASS_BUNDLES_PATH), {
                            skipCache: !0
                        })
                    },
                    async getProgressionPurchaseData() {
                        return await this.eventHubDataBinding.get(this.getEventSpecificPropertyPath(a.PROGRESSION_PURCHASE_DATA_PATH), {
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
                        return await this.eventHubDataBinding.post(a.PURCHASE_ITEM_PATH, e)
                    },
                    claimAllPendingRewards() {
                        this.eventHubDataBinding.post(this.getEventSpecificPropertyPath(a.CLAIM_ALL_REWARDS_PATH))
                    },
                    async purchaseOffer(e, t) {
                        return await this.eventHubDataBinding.post(this.getEventSpecificPropertyPath(a.PURCHASE_OFFER_PATH), {
                            offerId: e,
                            purchaseQuantity: t
                        })
                    },
                    getEventSpecificPropertyPath(e) {
                        return `/events/${this.activeEventId}${e}`
                    },
                    willDestroyElement() {
                        this._super(...arguments), s.dataBinding.unobserve(this)
                    }
                });
            t.default = l
        }, (e, t, n) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = void 0;
            var a = n(1);
            var s = a.Ember.Service.extend({
                init() {
                    this._super(...arguments), this.settingsDataBinding = (0, a.dataBinding)("/lol-settings/v2", a.socket)
                },
                updateEventShopPlayerSettings(e, t) {
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
                    this._super(...arguments), a.dataBinding.unobserve(this)
                }
            });
            t.default = s
        }, (e, t, n) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = void 0;
            var a = n(1),
                s = n(5);
            const l = n(14);
            var o = a.Ember.Component.extend({
                classNames: ["eh-page-header"],
                showHelpIcon: !1,
                showTokenBalance: !1,
                showSystemControls: !1,
                eventHubService: a.Ember.inject.service("event-hub"),
                eventDetailsData: a.Ember.computed.alias("eventHubService.eventDetailsData"),
                isGracePeriod: a.Ember.computed.alias("eventHubService.isGracePeriod"),
                tokenImage: a.Ember.computed.alias("eventHubService.tokenShopData.tokenImage"),
                tokenBundlesCatalogEntry: a.Ember.computed.alias("eventHubService.tokenShopData.tokenBundlesCatalogEntry"),
                isAnimationEnabled: !1,
                isSoundEnabled: !0,
                remainingTimeTextProps: a.Ember.computed("isGracePeriod", "eventDetailsData", (function() {
                    if (this.get("isGracePeriod")) return {
                        almostEndingText: this.get("tra.event_shop_page_header_shop_almost_closing"),
                        wrappingText: this.get("tra.event_shop_page_header_shop_closes_in"),
                        endDateTime: this.get("eventDetailsData.shopEndDate")
                    };
                    const e = this.get("eventDetailsData.progressEndDate") || this.get("eventDetailsData.shopEndDate");
                    return {
                        almostEndingText: this.get("tra.event_shop_page_header_event_almost_ending"),
                        wrappingText: this.get("tra.event_shop_page_header_event_ends_in"),
                        endDateTime: e
                    }
                })),
                progressEndDateFullText: a.Ember.computed("eventDetailsData", "tra.metadata.locale", (function() {
                    if (!this.get("eventDetailsData.progressEndDate")) return;
                    const e = this.get("tra.metadata.locale.id"),
                        t = this.getLocaleFromTraLocaleId(e);
                    return this.getEndTimerTooltipText(this.get("eventDetailsData.progressEndDate"), t)
                })),
                shopEndDateFullText: a.Ember.computed("eventDetailsData", "tra.metadata.locale", (function() {
                    const e = this.get("tra.metadata.locale.id"),
                        t = this.getLocaleFromTraLocaleId(e);
                    return this.getEndTimerTooltipText(this.get("eventDetailsData.shopEndDate"), t)
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
                        s = n.toLocaleDateString(t, {
                            dateStyle: "medium"
                        }),
                        l = n.toLocaleTimeString(t, {
                            timeZoneName: "short",
                            hour: "numeric",
                            minute: "numeric"
                        });
                    return a.tra.formatString("event_shop_page_header_time_tooltip_date_string", {
                        dateText: s,
                        timeText: l
                    })
                },
                actions: {
                    showHelpModal() {
                        a.UIKit.getModalManager().add({
                            type: "DialogConfirm",
                            data: {
                                contents: this.renderHelpContainer(l),
                                acceptText: this.get("tra.event_shop_help_modal_okay_button"),
                                closeButton: !0
                            }
                        })
                    },
                    navigateToStore() {
                        a.Telemetry.sendCustomData(s.TELEMETRY.TABLE, {
                            eventName: s.TELEMETRY.PURCHASE_TOKENS_CLICK_EVENT,
                            eventShopEventId: this.get("eventHubService.info.eventId"),
                            lockedTokens: this.get("eventHubService.info.lockedTokenCount"),
                            tokenBalance: this.get("eventHubService.info.currentTokenBalance")
                        });
                        const e = this.get("tokenBundlesCatalogEntry").map((e => ({
                            itemId: e.itemId,
                            inventoryType: "BUNDLES"
                        })));
                        a.Router.navigateTo("rcp-fe-lol-store", {
                            page: "hextech",
                            items: e
                        })
                    }
                }
            });
            t.default = o
        }, (e, t, n) => {
            var a = n(15);
            e.exports = (a.default || a).template({
                compiler: [7, ">= 4.0.0"],
                main: function(e, t, n, a, s) {
                    var l, o = null != t ? t : e.nullContext || {},
                        r = n.helperMissing,
                        i = "function",
                        c = e.escapeExpression;
                    return '<lol-uikit-content-block type="dialog-large" id="event-shop-help-modal">\r\n  <div class="event-shop-help-modal-top">\r\n    <div class="event-shop-help-modal-event-name">\r\n      <img class="event-shop-help-modal-logo" src=' + c(typeof(l = null != (l = n.eventIconPath || (null != t ? t.eventIconPath : t)) ? l : r) === i ? l.call(o, {
                        name: "eventIconPath",
                        hash: {},
                        data: s
                    }) : l) + " />\r\n      " + c(typeof(l = null != (l = n.eventName || (null != t ? t.eventName : t)) ? l : r) === i ? l.call(o, {
                        name: "eventName",
                        hash: {},
                        data: s
                    }) : l) + '\r\n    </div>\r\n    <div class="event-shop-help-modal-title">' + c(typeof(l = null != (l = n.helpModalTitle || (null != t ? t.helpModalTitle : t)) ? l : r) === i ? l.call(o, {
                        name: "helpModalTitle",
                        hash: {},
                        data: s
                    }) : l) + '</div>\r\n    <hr class="heading-spacer" />\r\n  </div>\r\n  <div class="event-shop-help-modal-mid">\r\n    <img class="event-shop-help-modal-image" src=' + c(typeof(l = null != (l = n.helpModalImagePath || (null != t ? t.helpModalImagePath : t)) ? l : r) === i ? l.call(o, {
                        name: "helpModalImagePath",
                        hash: {},
                        data: s
                    }) : l) + ' />\r\n  </div>\r\n  <div class="event-shop-help-modal-bot">\r\n    <div class="event-shop-help-modal-bot-containers">\r\n      <div class="event-shop-help-modal-icons event-shop-help-modal-icon-loot"></div>\r\n      <div class="event-shop-help-modal-topic">' + c(typeof(l = null != (l = n.earnTokensText || (null != t ? t.earnTokensText : t)) ? l : r) === i ? l.call(o, {
                        name: "earnTokensText",
                        hash: {},
                        data: s
                    }) : l) + '</div>\r\n      <div class="event-shop-help-description">' + c(typeof(l = null != (l = n.earnTokensDescriptionText || (null != t ? t.earnTokensDescriptionText : t)) ? l : r) === i ? l.call(o, {
                        name: "earnTokensDescriptionText",
                        hash: {},
                        data: s
                    }) : l) + '</div>\r\n    </div>\r\n    <div class="event-shop-help-modal-vertical-divider"></div>\r\n    <div class="event-shop-help-modal-bot-containers">\r\n      <div class="event-shop-help-modal-icons event-shop-help-modal-icon-currency"></div>\r\n      <div class="event-shop-help-modal-topic">' + c(typeof(l = null != (l = n.redeemTokensText || (null != t ? t.redeemTokensText : t)) ? l : r) === i ? l.call(o, {
                        name: "redeemTokensText",
                        hash: {},
                        data: s
                    }) : l) + '</div>\r\n      <div class="event-shop-help-description">' + c(typeof(l = null != (l = n.redeemTokensDescriptionText || (null != t ? t.redeemTokensDescriptionText : t)) ? l : r) === i ? l.call(o, {
                        name: "redeemTokensDescriptionText",
                        hash: {},
                        data: s
                    }) : l) + '</div>\r\n    </div>\r\n    <div class="event-shop-help-modal-vertical-divider"></div>\r\n    <div class="event-shop-help-modal-bot-containers">\r\n      <div class="event-shop-help-modal-icons event-shop-help-modal-icon-boost"></div>\r\n      <div class="event-shop-help-modal-topic">' + c(typeof(l = null != (l = n.upgradePassText || (null != t ? t.upgradePassText : t)) ? l : r) === i ? l.call(o, {
                        name: "upgradePassText",
                        hash: {},
                        data: s
                    }) : l) + '</div>\r\n      <div class="event-shop-help-description">' + c(typeof(l = null != (l = n.upgradePassDescriptionText || (null != t ? t.upgradePassDescriptionText : t)) ? l : r) === i ? l.call(o, {
                        name: "upgradePassDescriptionText",
                        hash: {},
                        data: s
                    }) : l) + "</div>\r\n    </div>\r\n  </div>\r\n</lol-uikit-content-block>\r\n"
                },
                useData: !0
            })
        }, (e, t, n) => {
            e.exports = n(16).default
        }, (e, t, n) => {
            "use strict";

            function a(e) {
                return e && e.__esModule ? e : {
                    default: e
                }
            }

            function s(e) {
                if (e && e.__esModule) return e;
                var t = {};
                if (null != e)
                    for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
                return t.default = e, t
            }
            t.__esModule = !0;
            var l = s(n(17)),
                o = a(n(31)),
                r = a(n(19)),
                i = s(n(18)),
                c = s(n(32)),
                p = a(n(33));

            function u() {
                var e = new l.HandlebarsEnvironment;
                return i.extend(e, l), e.SafeString = o.default, e.Exception = r.default, e.Utils = i, e.escapeExpression = i.escapeExpression, e.VM = c, e.template = function(t) {
                    return c.template(t, e)
                }, e
            }
            var d = u();
            d.create = u, p.default(d), d.default = d, t.default = d, e.exports = t.default
        }, (e, t, n) => {
            "use strict";

            function a(e) {
                return e && e.__esModule ? e : {
                    default: e
                }
            }
            t.__esModule = !0, t.HandlebarsEnvironment = p;
            var s = n(18),
                l = a(n(19)),
                o = n(20),
                r = n(28),
                i = a(n(30));
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
                this.helpers = e || {}, this.partials = t || {}, this.decorators = n || {}, o.registerDefaultHelpers(this), r.registerDefaultDecorators(this)
            }
            p.prototype = {
                constructor: p,
                logger: i.default,
                log: i.default.log,
                registerHelper: function(e, t) {
                    if (s.toString.call(e) === c) {
                        if (t) throw new l.default("Arg not supported with multiple helpers");
                        s.extend(this.helpers, e)
                    } else this.helpers[e] = t
                },
                unregisterHelper: function(e) {
                    delete this.helpers[e]
                },
                registerPartial: function(e, t) {
                    if (s.toString.call(e) === c) s.extend(this.partials, e);
                    else {
                        if (void 0 === t) throw new l.default('Attempting to register a partial called "' + e + '" as undefined');
                        this.partials[e] = t
                    }
                },
                unregisterPartial: function(e) {
                    delete this.partials[e]
                },
                registerDecorator: function(e, t) {
                    if (s.toString.call(e) === c) {
                        if (t) throw new l.default("Arg not supported with multiple decorators");
                        s.extend(this.decorators, e)
                    } else this.decorators[e] = t
                },
                unregisterDecorator: function(e) {
                    delete this.decorators[e]
                }
            };
            var u = i.default.log;
            t.log = u, t.createFrame = s.createFrame, t.logger = i.default
        }, (e, t) => {
            "use strict";
            t.__esModule = !0, t.extend = o, t.indexOf = function(e, t) {
                for (var n = 0, a = e.length; n < a; n++)
                    if (e[n] === t) return n;
                return -1
            }, t.escapeExpression = function(e) {
                if ("string" != typeof e) {
                    if (e && e.toHTML) return e.toHTML();
                    if (null == e) return "";
                    if (!e) return e + "";
                    e = "" + e
                }
                if (!s.test(e)) return e;
                return e.replace(a, l)
            }, t.isEmpty = function(e) {
                return !e && 0 !== e || !(!c(e) || 0 !== e.length)
            }, t.createFrame = function(e) {
                var t = o({}, e);
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
                a = /[&<>"'`=]/g,
                s = /[&<>"'`=]/;

            function l(e) {
                return n[e]
            }

            function o(e) {
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

            function a(e, t) {
                var s = t && t.loc,
                    l = void 0,
                    o = void 0;
                s && (e += " - " + (l = s.start.line) + ":" + (o = s.start.column));
                for (var r = Error.prototype.constructor.call(this, e), i = 0; i < n.length; i++) this[n[i]] = r[n[i]];
                Error.captureStackTrace && Error.captureStackTrace(this, a);
                try {
                    s && (this.lineNumber = l, Object.defineProperty ? Object.defineProperty(this, "column", {
                        value: o,
                        enumerable: !0
                    }) : this.column = o)
                } catch (e) {}
            }
            a.prototype = new Error, t.default = a, e.exports = t.default
        }, (e, t, n) => {
            "use strict";

            function a(e) {
                return e && e.__esModule ? e : {
                    default: e
                }
            }
            t.__esModule = !0, t.registerDefaultHelpers = function(e) {
                s.default(e), l.default(e), o.default(e), r.default(e), i.default(e), c.default(e), p.default(e)
            };
            var s = a(n(21)),
                l = a(n(22)),
                o = a(n(23)),
                r = a(n(24)),
                i = a(n(25)),
                c = a(n(26)),
                p = a(n(27))
        }, (e, t, n) => {
            "use strict";
            t.__esModule = !0;
            var a = n(18);
            t.default = function(e) {
                e.registerHelper("blockHelperMissing", (function(t, n) {
                    var s = n.inverse,
                        l = n.fn;
                    if (!0 === t) return l(this);
                    if (!1 === t || null == t) return s(this);
                    if (a.isArray(t)) return t.length > 0 ? (n.ids && (n.ids = [n.name]), e.helpers.each(t, n)) : s(this);
                    if (n.data && n.ids) {
                        var o = a.createFrame(n.data);
                        o.contextPath = a.appendContextPath(n.data.contextPath, n.name), n = {
                            data: o
                        }
                    }
                    return l(t, n)
                }))
            }, e.exports = t.default
        }, (e, t, n) => {
            "use strict";
            t.__esModule = !0;
            var a, s = n(18),
                l = n(19),
                o = (a = l) && a.__esModule ? a : {
                    default: a
                };
            t.default = function(e) {
                e.registerHelper("each", (function(e, t) {
                    if (!t) throw new o.default("Must pass iterator to #each");
                    var n = t.fn,
                        a = t.inverse,
                        l = 0,
                        r = "",
                        i = void 0,
                        c = void 0;

                    function p(t, a, l) {
                        i && (i.key = t, i.index = a, i.first = 0 === a, i.last = !!l, c && (i.contextPath = c + t)), r += n(e[t], {
                            data: i,
                            blockParams: s.blockParams([e[t], t], [c + t, null])
                        })
                    }
                    if (t.data && t.ids && (c = s.appendContextPath(t.data.contextPath, t.ids[0]) + "."), s.isFunction(e) && (e = e.call(this)), t.data && (i = s.createFrame(t.data)), e && "object" == typeof e)
                        if (s.isArray(e))
                            for (var u = e.length; l < u; l++) l in e && p(l, l, l === e.length - 1);
                        else {
                            var d = void 0;
                            for (var m in e) e.hasOwnProperty(m) && (void 0 !== d && p(d, l - 1), d = m, l++);
                            void 0 !== d && p(d, l - 1, !0)
                        } return 0 === l && (r = a(this)), r
                }))
            }, e.exports = t.default
        }, (e, t, n) => {
            "use strict";
            t.__esModule = !0;
            var a, s = n(19),
                l = (a = s) && a.__esModule ? a : {
                    default: a
                };
            t.default = function(e) {
                e.registerHelper("helperMissing", (function() {
                    if (1 !== arguments.length) throw new l.default('Missing helper: "' + arguments[arguments.length - 1].name + '"')
                }))
            }, e.exports = t.default
        }, (e, t, n) => {
            "use strict";
            t.__esModule = !0;
            var a = n(18);
            t.default = function(e) {
                e.registerHelper("if", (function(e, t) {
                    return a.isFunction(e) && (e = e.call(this)), !t.hash.includeZero && !e || a.isEmpty(e) ? t.inverse(this) : t.fn(this)
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
                    for (var t = [void 0], n = arguments[arguments.length - 1], a = 0; a < arguments.length - 1; a++) t.push(arguments[a]);
                    var s = 1;
                    null != n.hash.level ? s = n.hash.level : n.data && null != n.data.level && (s = n.data.level), t[0] = s, e.log.apply(e, t)
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
            var a = n(18);
            t.default = function(e) {
                e.registerHelper("with", (function(e, t) {
                    a.isFunction(e) && (e = e.call(this));
                    var n = t.fn;
                    if (a.isEmpty(e)) return t.inverse(this);
                    var s = t.data;
                    return t.data && t.ids && ((s = a.createFrame(t.data)).contextPath = a.appendContextPath(t.data.contextPath, t.ids[0])), n(e, {
                        data: s,
                        blockParams: a.blockParams([e], [s && s.contextPath])
                    })
                }))
            }, e.exports = t.default
        }, (e, t, n) => {
            "use strict";
            t.__esModule = !0, t.registerDefaultDecorators = function(e) {
                l.default(e)
            };
            var a, s = n(29),
                l = (a = s) && a.__esModule ? a : {
                    default: a
                }
        }, (e, t, n) => {
            "use strict";
            t.__esModule = !0;
            var a = n(18);
            t.default = function(e) {
                e.registerDecorator("inline", (function(e, t, n, s) {
                    var l = e;
                    return t.partials || (t.partials = {}, l = function(s, l) {
                        var o = n.partials;
                        n.partials = a.extend({}, o, t.partials);
                        var r = e(s, l);
                        return n.partials = o, r
                    }), t.partials[s.args[0]] = s.fn, l
                }))
            }, e.exports = t.default
        }, (e, t, n) => {
            "use strict";
            t.__esModule = !0;
            var a = n(18),
                s = {
                    methodMap: ["debug", "info", "warn", "error"],
                    level: "info",
                    lookupLevel: function(e) {
                        if ("string" == typeof e) {
                            var t = a.indexOf(s.methodMap, e.toLowerCase());
                            e = t >= 0 ? t : parseInt(e, 10)
                        }
                        return e
                    },
                    log: function(e) {
                        if (e = s.lookupLevel(e), "undefined" != typeof console && s.lookupLevel(s.level) <= e) {
                            var t = s.methodMap[e];
                            console[t] || (t = "log");
                            for (var n = arguments.length, a = Array(n > 1 ? n - 1 : 0), l = 1; l < n; l++) a[l - 1] = arguments[l];
                            console[t].apply(console, a)
                        }
                    }
                };
            t.default = s, e.exports = t.default
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
                        var a = r.REVISION_CHANGES[n],
                            s = r.REVISION_CHANGES[t];
                        throw new o.default("Template was precompiled with an older version of Handlebars than the current runtime. Please update your precompiler to a newer version (" + a + ") or downgrade your runtime to an older version (" + s + ").")
                    }
                    throw new o.default("Template was precompiled with a newer version of Handlebars than the current runtime. Please update your runtime to a newer version (" + e[1] + ").")
                }
            }, t.template = function(e, t) {
                if (!t) throw new o.default("No environment passed to template");
                if (!e || !e.main) throw new o.default("Unknown template object: " + typeof e);
                e.main.decorator = e.main_d, t.VM.checkRevision(e.compiler);
                var n = {
                    strict: function(e, t) {
                        if (!(t in e)) throw new o.default('"' + t + '" not defined in ' + e);
                        return e[t]
                    },
                    lookup: function(e, t) {
                        for (var n = e.length, a = 0; a < n; a++)
                            if (e[a] && null != e[a][t]) return e[a][t]
                    },
                    lambda: function(e, t) {
                        return "function" == typeof e ? e.call(t) : e
                    },
                    escapeExpression: s.escapeExpression,
                    invokePartial: function(n, a, l) {
                        l.hash && (a = s.extend({}, a, l.hash), l.ids && (l.ids[0] = !0)), n = t.VM.resolvePartial.call(this, n, a, l);
                        var r = t.VM.invokePartial.call(this, n, a, l);
                        if (null == r && t.compile && (l.partials[l.name] = t.compile(n, e.compilerOptions, t), r = l.partials[l.name](a, l)), null != r) {
                            if (l.indent) {
                                for (var i = r.split("\n"), c = 0, p = i.length; c < p && (i[c] || c + 1 !== p); c++) i[c] = l.indent + i[c];
                                r = i.join("\n")
                            }
                            return r
                        }
                        throw new o.default("The partial " + l.name + " could not be compiled when running in runtime-only mode")
                    },
                    fn: function(t) {
                        var n = e[t];
                        return n.decorator = e[t + "_d"], n
                    },
                    programs: [],
                    program: function(e, t, n, a, s) {
                        var l = this.programs[e],
                            o = this.fn(e);
                        return t || s || a || n ? l = i(this, e, o, t, n, a, s) : l || (l = this.programs[e] = i(this, e, o)), l
                    },
                    data: function(e, t) {
                        for (; e && t--;) e = e._parent;
                        return e
                    },
                    merge: function(e, t) {
                        var n = e || t;
                        return e && t && e !== t && (n = s.extend({}, t, e)), n
                    },
                    nullContext: Object.seal({}),
                    noop: t.VM.noop,
                    compilerInfo: e.compiler
                };

                function a(t) {
                    var s = arguments.length <= 1 || void 0 === arguments[1] ? {} : arguments[1],
                        l = s.data;
                    a._setup(s), !s.partial && e.useData && (l = function(e, t) {
                        t && "root" in t || ((t = t ? r.createFrame(t) : {}).root = e);
                        return t
                    }(t, l));
                    var o = void 0,
                        i = e.useBlockParams ? [] : void 0;

                    function c(t) {
                        return "" + e.main(n, t, n.helpers, n.partials, l, i, o)
                    }
                    return e.useDepths && (o = s.depths ? t != s.depths[0] ? [t].concat(s.depths) : s.depths : [t]), (c = p(e.main, c, n, s.depths || [], l, i))(t, s)
                }
                return a.isTop = !0, a._setup = function(a) {
                    a.partial ? (n.helpers = a.helpers, n.partials = a.partials, n.decorators = a.decorators) : (n.helpers = n.merge(a.helpers, t.helpers), e.usePartial && (n.partials = n.merge(a.partials, t.partials)), (e.usePartial || e.useDecorators) && (n.decorators = n.merge(a.decorators, t.decorators)))
                }, a._child = function(t, a, s, l) {
                    if (e.useBlockParams && !s) throw new o.default("must pass block params");
                    if (e.useDepths && !l) throw new o.default("must pass parent depths");
                    return i(n, t, e[t], a, 0, s, l)
                }, a
            }, t.wrapProgram = i, t.resolvePartial = function(e, t, n) {
                e ? e.call || n.name || (n.name = e, e = n.partials[e]) : e = "@partial-block" === n.name ? n.data["partial-block"] : n.partials[n.name];
                return e
            }, t.invokePartial = function(e, t, n) {
                var a = n.data && n.data["partial-block"];
                n.partial = !0, n.ids && (n.data.contextPath = n.ids[0] || n.data.contextPath);
                var l = void 0;
                n.fn && n.fn !== c && function() {
                    n.data = r.createFrame(n.data);
                    var e = n.fn;
                    l = n.data["partial-block"] = function(t) {
                        var n = arguments.length <= 1 || void 0 === arguments[1] ? {} : arguments[1];
                        return n.data = r.createFrame(n.data), n.data["partial-block"] = a, e(t, n)
                    }, e.partials && (n.partials = s.extend({}, n.partials, e.partials))
                }();
                void 0 === e && l && (e = l);
                if (void 0 === e) throw new o.default("The partial " + n.name + " could not be found");
                if (e instanceof Function) return e(t, n)
            }, t.noop = c;
            var a, s = function(e) {
                    if (e && e.__esModule) return e;
                    var t = {};
                    if (null != e)
                        for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
                    return t.default = e, t
                }(n(18)),
                l = n(19),
                o = (a = l) && a.__esModule ? a : {
                    default: a
                },
                r = n(17);

            function i(e, t, n, a, s, l, o) {
                function r(t) {
                    var s = arguments.length <= 1 || void 0 === arguments[1] ? {} : arguments[1],
                        r = o;
                    return !o || t == o[0] || t === e.nullContext && null === o[0] || (r = [t].concat(o)), n(e, t, e.helpers, e.partials, s.data || a, l && [s.blockParams].concat(l), r)
                }
                return (r = p(n, r, e, o, a, l)).program = t, r.depth = o ? o.length : 0, r.blockParams = s || 0, r
            }

            function c() {
                return ""
            }

            function p(e, t, n, a, l, o) {
                if (e.decorator) {
                    var r = {};
                    t = e.decorator(t, r, n, a && a[0], l, o, a), s.extend(t, r)
                }
                return t
            }
        }, (e, t, n) => {
            "use strict";
            t.__esModule = !0, t.default = function(e) {
                var t = void 0 !== n.g ? n.g : window,
                    a = t.Handlebars;
                e.noConflict = function() {
                    return t.Handlebars === e && (t.Handlebars = a), e
                }
            }, e.exports = t.default
        }, (e, t, n) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = t.SOUNDS = void 0;
            var a = n(1);
            const s = {
                STEP: "/fe/lol-static-assets/sounds/sfx-uikit-generic-click-small.ogg",
                MAX: "/fe/lol-static-assets/sounds/sfx-uikit-generic-click-big.ogg"
            };
            t.SOUNDS = s;
            var l = a.Ember.Component.extend({
                tag: null,
                eventHubService: a.Ember.inject.service("event-hub"),
                formatter: a.Ember.computed("tra.metadata.locale.id", (function() {
                    const e = this.get("tra.metadata.locale.id").toLowerCase().replace("_", "-");
                    return Intl.NumberFormat(e)
                })),
                progressionOfferId: "",
                showPurchaseModal: !1,
                errorLoadingPurchaseData: !1,
                purchaseInProgress: !1,
                levelsToBuy: 1,
                minNumberOfLevelsToBuy: 1,
                tosChecked: !1,
                tosNotChecked: a.Ember.computed.not("tosChecked"),
                titleTraKey: "",
                pricePerLevel: 0,
                currentBalance: 0,
                currentLevel: a.Ember.computed.alias("eventHubService.rewardTrackProgress.level"),
                totalNumberOfLevels: a.Ember.computed.alias("eventHubService.rewardTrackProgress.totalLevels"),
                shouldRenderSlider: a.Ember.computed("maxNumberOfLevelsToBuy", "tosEnabled", (function() {
                    return this.get("maxNumberOfLevelsToBuy") > 1 && this.get("tosEnabled")
                })),
                newLevel: a.Ember.computed("currentLevel", "levelsToBuy", (function() {
                    return this.get("currentLevel") + this.get("levelsToBuy")
                })),
                notEnoughRp: a.Ember.computed("currentBalance", "pricePerLevel", (function() {
                    return this.get("currentBalance") < this.get("pricePerLevel")
                })),
                tosDisabled: a.Ember.computed("notEnoughRp", "errorLoadingPurchaseData", (function() {
                    const e = this.get("notEnoughRp") || this.get("errorLoadingPurchaseData");
                    return e && this.set("tosChecked", !1), e
                })),
                tosEnabled: a.Ember.computed.not("tosDisabled"),
                totalPrice: a.Ember.computed("levelsToBuy", "pricePerLevel", (function() {
                    return this.get("levelsToBuy") * this.get("pricePerLevel")
                })),
                totalPriceTra: a.Ember.computed("totalPrice", (function() {
                    const e = this.get("formatter").format(this.get("totalPrice"));
                    return a.tra.formatString("event_hub_purchase_levels_modal_rp_value", {
                        value: e
                    })
                })),
                maxNumberOfLevelsToBuy: a.Ember.computed("currentLevel", "totalNumberOfLevels", "currentBalance", "pricePerLevel", (function() {
                    const e = this.get("totalNumberOfLevels") - this.get("currentLevel"),
                        t = Math.floor(this.get("currentBalance") / this.get("pricePerLevel"));
                    return Math.min(e, t)
                })),
                newBalance: a.Ember.computed("currentBalance", "totalPrice", (function() {
                    return this.get("currentBalance") - this.get("totalPrice")
                })),
                newBalanceTra: a.Ember.computed("newBalance", (function() {
                    const e = this.get("formatter").format(this.get("newBalance"));
                    return a.tra.formatString("event_hub_purchase_levels_modal_rp_value", {
                        value: e
                    })
                })),
                titleTra: a.Ember.computed("titleTraKey", (function() {
                    return this.get(`tra.${this.get("titleTraKey")}`)
                })),
                purchaseTosTra: a.Ember.computed.alias("tra.event_hub_purchase_levels_tos"),
                purchaseButtonDisabled: a.Ember.computed.or("tosNotChecked", "purchaseInProgress"),
                levelsButtonTra: a.Ember.computed.alias("tra.event_hub_purchase_levels_button"),
                init() {
                    this._super(...arguments), this.fetchProgressionPurchaseData(), this.addObserver("showPurchaseModal", this.observeShowPurchaseModal)
                },
                showPostPurchaseConfirmation() {
                    const e = a.UIKit.getTemplateHelper().contentBlockDialog(this.get("tra.event_hub_purchase_levels_confirmation_header"), this.get("tra.event_hub_purchase_levels_confirmation_body"));
                    a.UIKit.getModalManager().add({
                        type: "DialogAlert",
                        data: {
                            contents: e,
                            okText: this.get("tra.event_shop_card_purchase_confirmation_done")
                        }
                    })
                },
                showGeneralErrorModal() {
                    const e = a.UIKit.getTemplateHelper().contentBlockDialog(this.get("tra.event_hub_generic_purchase_error_header"), this.get("tra.event_hub_generic_purchase_error_body"));
                    a.UIKit.getModalManager().add({
                        type: "DialogAlert",
                        data: {
                            contents: e,
                            okText: this.get("tra.event_hub_modal_ok_button")
                        }
                    })
                },
                observeShowPurchaseModal() {
                    this.get("showPurchaseModal") && this.fetchProgressionPurchaseData()
                },
                fetchProgressionPurchaseData() {
                    this.get("eventHubService").getProgressionPurchaseData().then((e => {
                        this.set("errorLoadingPurchaseData", !1), this.set("pricePerLevel", e.pricePerLevel), this.set("currentBalance", e.rpBalance), this.set("progressionOfferId", e.offerId), this.set("levelsToBuy", Math.max(1, Math.min(this.get("levelsToBuy"), this.get("maxNumberOfLevelsToBuy"))))
                    })).catch((e => {
                        this.set("errorLoadingPurchaseData", !0), a.logger.error("Failure loading progression purchase data", e)
                    }))
                },
                willDestroyElement() {
                    this.removeObserver("showPurchaseModal")
                },
                closeModal() {
                    this.setProperties({
                        showPurchaseModal: !1,
                        purchaseInProgress: !1,
                        tosChecked: !1,
                        levelsToBuy: 1
                    })
                },
                showErrorModal(e) {
                    this.closeModal(), a.UIKit.getModalManager().add({
                        type: "DialogAlert",
                        data: {
                            contents: e,
                            okText: this.get("tra.event_hub_modal_ok_button")
                        }
                    })
                },
                showPurchaseErrorModal() {
                    const e = a.UIKit.getTemplateHelper().contentBlockDialog(this.get("tra.event_shop_generic_purchase_error_header"), this.get("tra.event_shop_generic_purchase_error_body"));
                    this.showErrorModal(e)
                },
                actions: {
                    handleCloseModalClick() {
                        this.closeModal()
                    },
                    handleValidationChange(e) {},
                    handleSelectedQuantityChange(e) {},
                    updateLevelsToBuy(e) {
                        this.set("levelsToBuy", e.value);
                        const t = a.AudioPlugin.getChannel("sfx-ui");
                        this.get("levelsToBuy") === this.get("maxNumberOfLevelsToBuy") ? t.playSound(s.MAX) : t.playSound(s.STEP)
                    },
                    decreaseLevelsToBuy() {
                        this.set("levelsToBuy", Math.max(1, this.get("levelsToBuy") - 1))
                    },
                    increaseLevelsToBuy() {
                        this.set("levelsToBuy", Math.min(this.get("levelsToBuy") + 1, this.get("maxNumberOfLevelsToBuy")))
                    },
                    toggleTosChecked(e) {
                        this.set("tosChecked", e.target.checked)
                    },
                    purchaseLevels() {
                        if (!this.get("purchaseButtonDisabled")) return this.set("purchaseInProgress", !0), this.get("eventHubService").purchaseOffer(this.get("progressionOfferId"), this.get("levelsToBuy")).then((() => {
                            a.AudioPlugin.getChannel("sfx-ui").playSound("/fe/lol-static-assets/sounds/sfx-yourshop-stinger.ogg"), this.showPostPurchaseConfirmation(), this.closeModal()
                        })).catch((e => {
                            a.logger.error(`Failure purchasing offer id: ${this.get("progressionOfferId")}`, e), this.closeModal(), this.showGeneralErrorModal()
                        }))
                    }
                }
            });
            t.default = l
        }, (e, t, n) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = void 0;
            var a = n(1),
                s = n(5),
                l = n(36),
                o = a.Ember.Component.extend({
                    classNames: ["event-shop-card-multi-purchase-modal"],
                    eventHubService: a.Ember.inject.service("event-hub"),
                    purchaseInProgress: !1,
                    disableButtonState: !1,
                    notEnoughRp: !1,
                    offerPurchased: !1,
                    offer: null,
                    isPurchaseDisabled: a.Ember.computed.or("disableButtonState", "purchaseInProgress", "validationError"),
                    tokenImageSrc: a.Ember.computed.alias("eventHubService.tokenShopData.tokenImage"),
                    currentTokenBalance: a.Ember.computed.alias("eventHubService.tokenBalance"),
                    shouldRenderMultiPurchaseSlider: a.Ember.computed("offer.maxQuantity", (function() {
                        return this.get("offer.maxQuantity") > 1
                    })),
                    purchaseConstraints: a.Ember.computed("offer", (function() {
                        return (0, l.getOfferPurchaseConstraints)(this.get("offer"))
                    })),
                    minPurchasableQuantity: a.Ember.computed.alias("purchaseConstraints.min"),
                    maxPurchasableQuantity: a.Ember.computed.alias("purchaseConstraints.max"),
                    purchaseQuantity: a.Ember.computed("offer", "purchaseConstraints", "selectedQuantity", (function() {
                        const e = this.get("purchaseConstraints.getPurchaseQuantityFromSelectedQuantity")(this.get("selectedQuantity"));
                        return e || 1
                    })),
                    purchasePrice: a.Ember.computed("validationError", "purchaseConstraints", "purchaseQuantity", (function() {
                        return this.get("validationError") ? this.get("purchaseConstraints.price") : this.get("purchaseQuantity") * this.get("purchaseConstraints.price")
                    })),
                    futureTokenBalance: a.Ember.computed("currentTokenBalance", "purchaseConstraints", "purchaseQuantity", (function() {
                        return this.get("currentTokenBalance") - this.get("purchaseQuantity") * this.get("purchaseConstraints.price")
                    })),
                    selectedQuantity: null,
                    validationError: null,
                    init() {
                        this._super(...arguments), this.notEnoughRp = this.get("offer.offerState") === s.OFFER_STATES.UNAVAILABLE, this.offerPurchased = this.get("offer.offerState") === s.OFFER_STATES.OWNED, this.disableButtonState = this.notEnoughRp || this.offerPurchased, this.purchaseInProgress = this.get("offer.offerState") === s.OFFER_STATES.PURCHASING
                    },
                    showPostPurchaseConfirmation() {
                        const e = a.UIKit.getTemplateHelper().contentBlockDialog(this.get("tra.event_shop_card_purchase_confirmation_header"), this.get("tra.event_shop_card_purchase_confirmation_body"));
                        a.UIKit.getModalManager().add({
                            type: "DialogAlert",
                            data: {
                                contents: e,
                                okText: this.get("tra.event_shop_card_purchase_confirmation_done")
                            }
                        })
                    },
                    showGeneralErrorModal() {
                        const e = a.UIKit.getTemplateHelper().contentBlockDialog(this.get("tra.event_hub_generic_purchase_error_header"), this.get("tra.event_hub_generic_purchase_error_body"));
                        a.UIKit.getModalManager().add({
                            type: "DialogAlert",
                            data: {
                                contents: e,
                                okText: this.get("tra.event_hub_modal_ok_button")
                            }
                        })
                    },
                    executePurchase({
                        id: e
                    }) {
                        return a.Telemetry.sendCustomData(s.TELEMETRY.TABLE, {
                            eventName: s.TELEMETRY.PURCHASE_OFFER_EVENT,
                            eventShopEventId: this.get("eventHubService.info.eventId"),
                            clickedOffer: e,
                            tokenBalance: this.get("currentTokenBalance")
                        }), this.get("eventHubService").purchaseOffer(e, this.get("purchaseQuantity")).then((() => {
                            a.AudioPlugin.getChannel("sfx-ui").playSound("/fe/lol-static-assets/sounds/sfx-yourshop-stinger.ogg"), this.showPostPurchaseConfirmation(), this.closeModal()
                        })).catch((t => {
                            a.logger.error(`Failure purchasing offer id: ${e}`, t), this.closeModal(), this.showGeneralErrorModal()
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
            t.default = o
        }, (e, t, n) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.getRouteByEventHubType = t.getOfferPurchaseConstraints = t.getCategoryOffersId = t.default = void 0;
            var a = n(5);
            const s = e => `event_shop_offers_category_${e.toLowerCase()}`;
            t.getCategoryOffersId = s;
            const l = e => {
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
            t.getOfferPurchaseConstraints = l;
            const o = e => {
                switch (e) {
                    case a.EVENT_HUB_TYPES.EVENT_SHOP:
                        return a.ROUTES.EVENT_SHOP;
                    case a.EVENT_HUB_TYPES.HALL_OF_LEGENDS:
                        return a.ROUTES.HALL_OF_LEGENDS;
                    default:
                        return a.ROUTES.EVENT_SHOP
                }
            };
            t.getRouteByEventHubType = o;
            var r = {
                getCategoryOffersId: s,
                getOfferPurchaseConstraints: l,
                getRouteByEventHubType: o
            };
            t.default = r
        }, (e, t, n) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = void 0;
            var a = n(1).Ember.Component.extend({
                classNames: ["event-shop-category-nav-bar"]
            });
            t.default = a
        }, (e, t, n) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = void 0;
            var a = n(1),
                s = n(5),
                l = n(36),
                o = a.Ember.Component.extend({
                    classNames: ["event-shop-nav-bar-tab"],
                    classNameBindings: ["isTabSelected:event-shop-nav-bar-tab-selected"],
                    scrollToCategory: null,
                    isTabSelected: a.Ember.computed("currentCategory", (function() {
                        return this.get("currentCategory") === this.get("category")
                    })),
                    categoryTra: a.Ember.computed("category", (function() {
                        return this.get(`tra.${(0,l.getCategoryOffersId)(this.category)}_tooltip`)
                    })),
                    click() {
                        this.scrollToCategory(this.get("category")), a.Telemetry.sendCustomData(s.TELEMETRY.TABLE, {
                            eventName: s.TELEMETRY.CATEGORY_NAV_BAR_CLICK_EVENT,
                            eventShopEventId: this.get("eventHubService.info.eventId"),
                            clickedCategory: this.get("category")
                        })
                    }
                });
            t.default = o
        }, (e, t, n) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = void 0;
            var a = n(1),
                s = n(5),
                l = n(36),
                o = a.Ember.Component.extend({
                    classNames: ["event-shop-category-offers"],
                    categoryOffersId: a.Ember.computed("categoryOffers.category", (function() {
                        return (0, l.getCategoryOffersId)(this.get("categoryOffers.category"))
                    })),
                    didInsertElement() {
                        this._super(...arguments);
                        const e = this.element.querySelectorAll(`.${s.EVENT_SHOP_OFFER_CARD_CONTAINER_CLASSNAME}`);
                        this.configureOfferCardsObservers(e)
                    },
                    configureOfferCardsObservers(e) {
                        e.length && (this.observeElementIntersection(e[0]), this.observeElementIntersection(e[e.length - 1]))
                    },
                    observeElementIntersection(e) {
                        e.category = this.get("categoryOffers.category"), this.headerTxtObserver.observe(e)
                    }
                });
            t.default = o
        }, (e, t, n) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = void 0;
            var a = n(1),
                s = a.Ember.Component.extend({
                    classNames: ["event-shop-fallback"],
                    tra: a.tra,
                    error: null,
                    errorMessageTra: a.Ember.computed("error", (function() {
                        return {
                            title: this.get(`tra.${this.get("error.errorId")}_title`),
                            description: this.get(`tra.${this.get("error.errorId")}_description`)
                        }
                    }))
                });
            t.default = s
        }, (e, t, n) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = void 0;
            var a = n(1).Ember.Component.extend({
                classNames: ["event-shop-main-view"],
                isRewardTrackMinimized: !1,
                actions: {
                    minimizeRewardTrack() {
                        this.sendAction("toggleMinimizeRewardTrack")
                    }
                }
            });
            t.default = a
        }, (e, t, n) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = void 0;
            var a = n(1),
                s = n(5);
            const l = n(43);
            var o = a.Ember.Component.extend({
                classNames: [s.EVENT_SHOP_OFFER_CARD_CONTAINER_CLASSNAME],
                classNameBindings: ["offer.highlighted:event-shop-token-shop-highlighted-card", "isOfferOwned:event-shop-token-shop-card-owned", "isOfferAvailable:event-shop-token-shop-card-available", "isOfferUnavailable:event-shop-token-shop-card-unavailable"],
                offer: null,
                eventHubService: a.Ember.inject.service("event-hub"),
                tooltipManager: a.UIKit.getTooltipManager(),
                isMouseOver: !1,
                tokenShopData: a.Ember.computed.alias("eventHubService.tokenShopData"),
                tokenBalance: a.Ember.computed.alias("eventHubService.tokenBalance"),
                requiredTokens: a.Ember.computed("offer.price", "tokenBalance", (function() {
                    return this.get("offer.price") - this.get("tokenBalance")
                })),
                isPurchasing: a.Ember.computed("offer.offerState", (function() {
                    return this.get("offer.offerState") === s.OFFER_STATES.PURCHASING
                })),
                isOfferRevealed: a.Ember.computed("offer.offerState", (function() {
                    return this.get("offer.offerState") !== s.OFFER_STATES.UNREVEALED
                })),
                isOfferOwned: a.Ember.computed("offer.offerState", (function() {
                    return this.get("offer.offerState") === s.OFFER_STATES.OWNED
                })),
                isOfferAvailable: a.Ember.computed("offer.offerState", (function() {
                    return this.get("offer.offerState") === s.OFFER_STATES.AVAILABLE
                })),
                isOfferUnavailable: a.Ember.computed("offer.offerState", (function() {
                    return this.get("offer.offerState") === s.OFFER_STATES.UNAVAILABLE
                })),
                shouldRenderOfferItemsCount: a.Ember.computed("offer", (function() {
                    return this.get("offer.items.length") > 1
                })),
                offerImage: a.Ember.computed("offer.image", (function() {
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
                        const e = this.renderTooltipContainer(l);
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
                        a = document.createElement("div");
                    return a.innerHTML = n, a
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
                    return a.Telemetry.sendCustomData(s.TELEMETRY.TABLE, {
                        eventName: s.TELEMETRY.OPEN_OFFER_CARD_EVENT,
                        eventShopEventId: this.get("eventHubService.info.eventId"),
                        clickedOffer: e.id,
                        tokenBalance: this.get("eventHubService.info.currentTokenBalance")
                    }), this.set("displayMultiPurchaseModal", !0)
                },
                actions: {
                    closeModal() {
                        this.set("displayMultiPurchaseModal", !1)
                    }
                }
            });
            t.default = o
        }, (e, t, n) => {
            var a = n(15);
            e.exports = (a.default || a).template({
                compiler: [7, ">= 4.0.0"],
                main: function(e, t, n, a, s) {
                    var l, o = null != t ? t : e.nullContext || {},
                        r = n.helperMissing,
                        i = "function",
                        c = e.escapeExpression;
                    return '<lol-uikit-tooltip>\r\n  <lol-uikit-content-block class="event-shop-xp-tooltip-content" type="tooltip-system">\r\n    <div class="event-shop-progression-tooltip-block">\r\n      <p>\r\n        ' + c(typeof(l = null != (l = n.youNeedText || (null != t ? t.youNeedText : t)) ? l : r) === i ? l.call(o, {
                        name: "youNeedText",
                        hash: {},
                        data: s
                    }) : l) + "<span class='event-shop-progression-tooltip-block-bold'> " + c(typeof(l = null != (l = n.requiredTokens || (null != t ? t.requiredTokens : t)) ? l : r) === i ? l.call(o, {
                        name: "requiredTokens",
                        hash: {},
                        data: s
                    }) : l) + " " + c(typeof(l = null != (l = n.moreTokensText || (null != t ? t.moreTokensText : t)) ? l : r) === i ? l.call(o, {
                        name: "moreTokensText",
                        hash: {},
                        data: s
                    }) : l) + " </span>" + c(typeof(l = null != (l = n.unlockText || (null != t ? t.unlockText : t)) ? l : r) === i ? l.call(o, {
                        name: "unlockText",
                        hash: {},
                        data: s
                    }) : l) + "\r\n      </p>\r\n    </div>\r\n  </lol-uikit-content-block>\r\n</lol-uikit-tooltip>"
                },
                useData: !0
            })
        }, (e, t, n) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = void 0;
            var a = n(1),
                s = n(5),
                l = a.Ember.Component.extend({
                    classNames: ["event-shop-progression"],
                    eventHubService: a.Ember.inject.service("event-hub"),
                    failureLoadingRewardTrack: a.Ember.computed.alias("eventHubService.failureLoadingRewardTrack"),
                    rewardTrackItems: a.Ember.computed.alias("eventHubService.rewardTrackItems"),
                    eventShopProgressionData: a.Ember.computed.alias("eventHubService.eventShopProgressionData"),
                    unclaimedRewards: a.Ember.computed.alias("eventHubService.unclaimedRewards.rewardsCount"),
                    lockedTokens: a.Ember.computed.alias("eventHubService.unclaimedRewards.lockedTokensCount"),
                    showPassPurchaseModal: !1,
                    isLoadingPassAvailability: !0,
                    passAvailableToPurchase: !1,
                    passUnavailable: a.Ember.computed.not("passAvailableToPurchase"),
                    hasUnclaimedRewards: a.Ember.computed("unclaimedRewards", (function() {
                        return this.get("unclaimedRewards") > 0
                    })),
                    eventPassItems: a.Ember.computed("eventShopProgressionData.eventPassBundlesCatalogEntry", (function() {
                        return (this.get("eventShopProgressionData.eventPassBundlesCatalogEntry") || []).map((e => ({
                            itemId: e.itemId,
                            inventoryType: "BUNDLES"
                        })))
                    })),
                    didInsertElement() {
                        this._super(...arguments), this.set("isLoadingPassAvailability", !0), this.checkPassAvailability()
                    },
                    checkPassAvailability() {
                        this.get("eventShopProgressionData.passPurchased") ? this.set("isLoadingPassAvailability", !1) : this.get("eventHubService").getPassBundles().then((e => {
                            e.length && this.set("passAvailableToPurchase", !0)
                        })).catch((e => {
                            a.logger.error("Failure loading pass options", e)
                        })).finally((() => {
                            this.set("isLoadingPassAvailability", !1)
                        }))
                    },
                    actions: {
                        passPurchaseClick() {
                            a.Telemetry.sendCustomData(s.TELEMETRY.TABLE, {
                                eventName: s.TELEMETRY.PURCHASE_PASS_CLICK_EVENT,
                                eventShopEventId: this.get("eventHubService.info.eventId"),
                                lockedTokens: this.get("eventHubService.info.lockedTokenCount"),
                                tokenBalance: this.get("eventHubService.info.currentTokenBalance")
                            }), this.set("showPassPurchaseModal", !0)
                        }
                    }
                });
            t.default = l
        }, (e, t, n) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = void 0;
            var a = n(1),
                s = n(5);
            const l = {
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
            var o = a.Ember.Component.extend({
                tag: null,
                eventHubService: a.Ember.inject.service("event-hub"),
                showPurchaseModal: !1,
                bundles: null,
                selectedOption: null,
                summarySubtitle: a.Ember.computed.alias("tra.event_shop_purchase_modal_summary_pass_subtitle"),
                descriptionElementAdditionalClassName: null,
                isDescriptionExpanded: !1,
                isExecutingPurchase: !1,
                purchaseCompleted: !1,
                dropRatesLootItemName: null,
                showDropRatesModal: !1,
                unlockButtonDisabled: a.Ember.computed("isExecutingPurchase", "selectedOption", (function() {
                    const e = this.get("isExecutingPurchase"),
                        t = this.get("selectedOption");
                    return !(!e && t && t.isPurchasable)
                })),
                optionsPointerClass: a.Ember.computed("isExecutingPurchase", "purchaseCompleted", (function() {
                    return this.get("isExecutingPurchase") || this.get("purchaseCompleted") ? "" : "event-shop-purchase-modal-option-pointer"
                })),
                options: a.Ember.computed("bundles", (function() {
                    const e = this.get("bundles");
                    if (!e) return [];
                    if (!Object.keys(l).includes(e.length.toString())) {
                        const t = Object.keys(l).join(", ");
                        a.logger.error(`Pass Purchase Modal - expected number of bundles to be ${t}; but got: ${e.length}`)
                    }
                    const t = l[e.length] || {},
                        n = t.CSS_CLASS || "",
                        s = t.LOCATIONS || [],
                        o = e.sort(((e, t) => t.bundledItems.length - e.bundledItems.length)).map(((e, t) => ({
                            ...e,
                            optionTypeCssClass: s.includes(t) ? n : ""
                        })));
                    if (1 === o.length) {
                        const e = o[0];
                        this.set("selectedOption", e), a.Ember.set(e, "selectedCssClass", "event-shop-purchase-modal-option-selected")
                    }
                    return o
                })),
                summaryTitle: a.Ember.computed("selectedOption", (function() {
                    const e = this.get("selectedOption");
                    return e ? e.details.name : this.get("tra.event_shop_purchase_modal_summary_default_pass_title")
                })),
                newBalance: a.Ember.computed("selectedOption", (function() {
                    const e = this.get("selectedOption");
                    return e && e.futureBalance ? a.tra.formatString("event_shop_purchase_modal_rp", {
                        price: e.futureBalance
                    }) : ""
                })),
                finalPrice: a.Ember.computed("selectedOption", (function() {
                    const e = this.get("selectedOption");
                    return e && e.finalPrice ? a.tra.formatString("event_shop_purchase_modal_rp", {
                        price: e.finalPrice
                    }) : ""
                })),
                initialPrice: a.Ember.computed("selectedOption", (function() {
                    const e = this.get("selectedOption");
                    return e && e.initialPrice && e.finalPrice !== e.initialPrice ? a.tra.formatString("event_shop_purchase_modal_rp", {
                        price: e.initialPrice
                    }) : null
                })),
                discountPercentage: a.Ember.computed("selectedOption", (function() {
                    const e = this.get("selectedOption");
                    return e && e.discountPercentage ? a.tra.formatString("event_shop_purchase_modal_discount_percentage", {
                        percentage: e.discountPercentage
                    }) : null
                })),
                optionsExecutingPurchaseClass: a.Ember.computed("isExecutingPurchase", (function() {
                    return this.get("isExecutingPurchase") ? "event-shop-purchase-modal-option-executing-purchase" : ""
                })),
                numberOfOptionsWrapperCssClass: a.Ember.computed("options", (function() {
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
                    this.get("showPurchaseModal") && this.get("eventHubService").getPassBundles().then((e => {
                        if (!e.length) throw new Error("Pass Purhcase Modal - Pass Bundles did not return any option");
                        this.set("bundles", e)
                    })).catch((e => {
                        a.logger.error("Pass Purchase Modal - Failure loading purchase options", e);
                        const t = a.UIKit.getTemplateHelper().contentBlockDialog(this.get("tra.event_shop_generic_error_header"), this.get("tra.event_shop_generic_error_body"));
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
                    this.closeModal(), a.UIKit.getModalManager().add({
                        type: "DialogAlert",
                        data: {
                            contents: e,
                            okText: this.get("tra.event_hub_modal_ok_button")
                        }
                    })
                },
                showPurchaseErrorModal() {
                    const e = a.UIKit.getTemplateHelper().contentBlockDialog(this.get("tra.event_hub_generic_purchase_error_header"), this.get("tra.event_hub_generic_purchase_error_body"));
                    this.showErrorModal(e)
                },
                resetSelectedOptionCssClass() {
                    this.get("options").forEach((e => {
                        e.selectedCssClass && a.Ember.set(e, "selectedCssClass", "")
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
                        this.get("isExecutingPurchase") || this.get("purchaseCompleted") || this.get("selectedOption") === e || (this.resetSelectedOptionCssClass(), a.Ember.set(e, "selectedCssClass", "event-shop-purchase-modal-option-selected"), this.set("selectedOption", e), this.setIsDescriptionExpanded(!1))
                    },
                    unlockPass() {
                        if (this.get("unlockButtonDisabled")) return;
                        this.set("isExecutingPurchase", !0);
                        const e = this.get("selectedOption");
                        a.Telemetry.sendCustomData(s.TELEMETRY.TABLE, {
                            eventName: s.TELEMETRY.PURCHASE_PASS_UNLOCK_CLICK_EVENT,
                            eventShopEventId: this.get("eventHubService.info.eventId"),
                            selectedOption: e.details.itemId
                        }), this.get("eventHubService").purchasePassBundle(e).then((() => {
                            this.set("isExecutingPurchase", !1), this.set("purchaseCompleted", !0)
                        })).catch((e => {
                            a.logger.error("Failure purchasing Event Pass", e), this.showPurchaseErrorModal()
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
            t.default = o
        }, (e, t, n) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = void 0;
            var a = n(1),
                s = n(47),
                l = n(5);
            const {
                TRACKER_SIZE: o
            } = s.REWARD_TRACKER;
            var r = a.Ember.Component.extend({
                classNames: ["event-shop-reward-track-wrapper"],
                eventHubService: a.Ember.inject.service("event-hub"),
                trackerSize: o.SMALL,
                displayCurrentBonusIteration: !0,
                rewardTrackProgress: a.Ember.computed.alias("eventHubService.rewardTrackProgress"),
                rewardTrackItems: a.Ember.computed.alias("eventHubService.rewardTrackItems"),
                rewardTrackBonusProgress: a.Ember.computed.alias("eventHubService.rewardTrackBonusProgress"),
                rewardTrackBonusItems: a.Ember.computed.alias("eventHubService.rewardTrackBonusItems"),
                isGracePeriod: a.Ember.computed.alias("eventHubService.isGracePeriod"),
                scrollingArrowsEnabled: !0,
                handleClickItem(e) {
                    this.trackItemHasUnclaimedRewards(e) && (a.AudioPlugin.getChannel("sfx-ui").playSound("/fe/lol-static-assets/sounds/sfx-uikit-grid-click.ogg"), this.get("eventHubService").claimAllPendingRewards())
                },
                trackItemHasUnclaimedRewards: ({
                    rewardOptions: e
                }) => e.some((({
                    state: e
                }) => e === l.REWARD_TRACK_ITEM_STATE.UNSELECTED)),
                actions: {
                    clickItem(e) {
                        a.Ember.run.debounce(this, this.handleClickItem, e, 250)
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
                    return a.default
                }
            }), Object.defineProperty(t, "PROFILE_PRIVACY", {
                enumerable: !0,
                get: function() {
                    return i.default
                }
            }), Object.defineProperty(t, "QUEUES", {
                enumerable: !0,
                get: function() {
                    return s.default
                }
            }), Object.defineProperty(t, "REWARD_TRACKER", {
                enumerable: !0,
                get: function() {
                    return l.default
                }
            }), Object.defineProperty(t, "SETTINGS", {
                enumerable: !0,
                get: function() {
                    return r.default
                }
            }), Object.defineProperty(t, "SOCIAL", {
                enumerable: !0,
                get: function() {
                    return o.default
                }
            }), Object.defineProperty(t, "TIME", {
                enumerable: !0,
                get: function() {
                    return c.default
                }
            });
            var a = p(n(48)),
                s = p(n(59)),
                l = p(n(60)),
                o = p(n(61)),
                r = p(n(62)),
                i = p(n(63)),
                c = p(n(64));

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
            var a = m(n(49)),
                s = m(n(50)),
                l = m(n(51)),
                o = m(n(52)),
                r = m(n(53)),
                i = m(n(54)),
                c = m(n(55)),
                p = m(n(56)),
                u = m(n(57)),
                d = m(n(58));

            function m(e) {
                return e && e.__esModule ? e : {
                    default: e
                }
            }
            var h = {
                COMPONENT_TYPES: a.default,
                CURRENCY_TYPES: s.default,
                INVENTORY_TYPES: l.default,
                MEDIA_TYPES: o.default,
                MEDIA_LOAD_TYPES: r.default,
                MODAL_TYPES: i.default,
                OFFER_PURCHASE_STATES: c.default,
                OFFER_VALIDATION_STATES: p.default,
                SCROLL_LIST_DISPLAY_TYPES: u.default,
                TEMPLATE_TYPES: d.default
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
                a = "RANKED_FLEX_SR",
                s = "RANKED_FLEX_TT",
                l = "CHERRY",
                o = "RANKED_TFT",
                r = "RANKED_TFT_DOUBLE_UP",
                i = "RANKED_TFT_TURBO",
                c = "RANKED_TFT_PAIRS",
                p = [n, a],
                u = [...p, s],
                d = [l],
                m = [o, r],
                h = [i, c],
                v = [...m, ...h],
                f = [...u, ...m],
                _ = [...h, ...d];
            var g = {
                RANKED_SOLO_5x5_QUEUE_TYPE: n,
                RANKED_FLEX_SR_QUEUE_TYPE: a,
                RANKED_FLEX_TT_QUEUE_TYPE: s,
                RANKED_CHERRY_QUEUE_TYPE: l,
                RANKED_TFT_QUEUE_TYPE: o,
                RANKED_TFT_DOUBLE_UP_QUEUE_TYPE: r,
                RANKED_TFT_TURBO_QUEUE_TYPE: i,
                RANKED_TFT_PAIRS_QUEUE_TYPE: c,
                RANKED_LOL_QUEUE_TYPES: u,
                RANKED_SR_QUEUE_TYPES: p,
                RANKED_TFT_QUEUE_TYPES: m,
                RATED_TFT_QUEUE_TYPES: h,
                RANKED_AND_RATED_TFT_QUEUE_TYPES: v,
                ALL_RANKED_QUEUE_TYPES: f,
                ALL_RATED_QUEUE_TYPES: _,
                ALL_RANKED_AND_RATED_QUEUE_TYPES: [...f, ..._]
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
                a = {
                    PRIVATE: "PRIVATE",
                    PUBLIC: "PUBLIC"
                };
            var s = {
                ProfilePrivacyEnabledState: n,
                ProfilePrivacySetting: a,
                DEFAULT_PROFILE_PRIVACY: {
                    enabledState: n.UNKNOWN,
                    setting: a.PUBLIC
                }
            };
            t.default = s
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
            const a = 36e5,
                s = 864e5,
                l = 6048e5,
                o = {
                    MILLISECONDS_IN_A_SECOND: 1e3,
                    MILLISECONDS_IN_A_MINUTE: 6e4,
                    MILLISECONDS_IN_A_HOUR: a,
                    MILLISECONDS_IN_A_DAY: s,
                    MILLISECONDS_IN_A_WEEK: l,
                    MILLISECONDS_IN_A_YEAR: 314496e5
                };
            t.TIME_CONVERSIONS = o;
            var r = {
                TIME_UNITS: n,
                TIME_CONVERSIONS: o
            };
            t.default = r
        }, (e, t, n) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = void 0;
            var a = n(1),
                s = a.Ember.Component.extend({
                    classNames: ["event-shop-token-shop-balance-amount"],
                    eventHubService: a.Ember.inject.service("event-hub"),
                    init() {
                        this._super(...arguments), this.addObserver("eventHubService.tokenBalance", this.renderTokenBalance)
                    },
                    didInsertElement() {
                        this._super(...arguments), this.renderTokenBalance()
                    },
                    willDestroyElement() {
                        this.removeObserver("eventHubService.tokenBalance")
                    },
                    renderTokenBalance() {
                        const e = this.get("eventHubService.tokenBalance");
                        this.element.style.setProperty("--event-shop-token-balance", e || 0)
                    }
                });
            t.default = s
        }, (e, t, n) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = void 0;
            var a = n(1),
                s = (n(5), n(36));
            var l = a.Ember.Component.extend({
                classNames: ["event-shop-token-shop"],
                eventHubService: a.Ember.inject.service("event-hub"),
                categoriesOffers: a.Ember.computed.alias("eventHubService.categoriesOffers"),
                tokenName: a.Ember.computed.alias("eventHubService.tokenShopData.tokenName"),
                tokenImage: a.Ember.computed.alias("eventHubService.tokenShopData.tokenImage"),
                tokenBundlesCatalogEntry: a.Ember.computed.alias("eventHubService.tokenShopData.tokenBundlesCatalogEntry"),
                storeItems: a.Ember.computed("tokenBundlesCatalogEntry", (function() {
                    return this.get("tokenBundlesCatalogEntry").map((e => ({
                        itemId: e.itemId,
                        inventoryType: "BUNDLES"
                    })))
                })),
                init() {
                    this._super(...arguments);
                    this.headerTxtObserver = new IntersectionObserver((e => this.updateHeader(e)), {
                        rootMargin: "0px",
                        threshold: .9
                    })
                },
                setCurrentCategoryTra(e) {
                    this.setProperties({
                        currentCategory: e,
                        currentCategoryTra: this.get(`tra.${(0,s.getCategoryOffersId)(e)}`)
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
                actions: {
                    scrollToCategory(e) {
                        const t = this.element.querySelector(`#${(0,s.getCategoryOffersId)(e)}`);
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
            var a = n(1),
                s = a.Ember.Component.extend({
                    classNames: ["event-shop-xp"],
                    eventHubService: a.Ember.inject.service("event-hub"),
                    rewardTrackXP: a.Ember.computed.alias("eventHubService.rewardTrackXP"),
                    isGracePeriod: a.Ember.computed.alias("eventHubService.isGracePeriod"),
                    unclaimedRewards: a.Ember.computed.alias("eventHubService.unclaimedRewards.rewardsCount"),
                    completedLoops: a.Ember.computed("rewardTrackXP", (function() {
                        return Math.max(this.get("rewardTrackXP.iteration") - 1, 0)
                    })),
                    hasUnclaimedRewards: a.Ember.computed("unclaimedRewards", (function() {
                        return this.get("unclaimedRewards") > 0
                    })),
                    levelLabel: a.Ember.computed("rewardTrackXP", (function() {
                        return this.get("rewardTrackXP.currentLevel") > 0 ? `${this.get("tra.event_shop_xp_label_level")} ${this.get("rewardTrackXP.currentLevel")}` : `${this.get("tra.event_shop_xp_label_level")} ${this.get("tra.event_shop_xp_label_level_start")}`
                    })),
                    xpOverflow: a.Ember.computed("rewardTrackXP", (function() {
                        return this.get("rewardTrackXP.isBonusPhase") && this.get("rewardTrackXP.currentLevelXP") >= this.get("rewardTrackXP.totalLevelXP")
                    }))
                });
            t.default = s
        }, (e, t, n) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = void 0;
            var a = n(1);
            var s = a.Ember.Component.extend({
                classNames: ["hol-xp"],
                eventHubService: a.Ember.inject.service("event-hub"),
                rewardTrackProgress: a.Ember.computed.alias("eventHubService.rewardTrackProgress"),
                radialPercentage: 0,
                remainingPercentage: a.Ember.computed("radialPercentage", (function() {
                    const e = 100 - this.get("radialPercentage");
                    return e > 0 ? e : 0
                })),
                playerXpPercentage: a.Ember.computed("rewardTrackProgress", (function() {
                    const e = this.get("rewardTrackProgress"),
                        t = Math.ceil(e?.currentLevelXP / e?.totalLevelXP * 100);
                    return Math.min(100, t) || 0
                })),
                init() {
                    this._super(...arguments), this.updateRadialPercentage = this.updateRadialPercentage.bind(this)
                },
                didInsertElement() {
                    this._super(...arguments), this.addObserver("playerXpPercentage", this.updateRadialPercentage), this.updateRadialPercentage()
                },
                willDestroyElement() {
                    this._super(...arguments), this.removeObserver("playerXpPercentage")
                },
                updateRadialPercentage() {
                    const e = this.get("radialPercentage"),
                        t = this.get("playerXpPercentage");
                    if (e === t) return;
                    if (100 === e) return this.set("radialPercentage", 0), void requestAnimationFrame(this.updateRadialPercentage);
                    const n = t < e ? 5 : Math.min(5, t - e),
                        a = Math.min(100, e + n);
                    this.set("radialPercentage", a), requestAnimationFrame(this.updateRadialPercentage)
                }
            });
            t.default = s
        }, (e, t, n) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = void 0;
            var a = n(1),
                s = n(5),
                l = a.Ember.Component.extend({
                    classNames: ["hol-reward-details"],
                    eventHubService: a.Ember.inject.service("event-hub"),
                    selectedReward: null,
                    level: a.Ember.computed("selectedReward", (function() {
                        const e = this.get("selectedReward")?.item.threshold;
                        return a.tra.formatString("event_hub_reward_level_number_text", {
                            levelNumber: e
                        })
                    })),
                    title: a.Ember.computed("selectedReward", (function() {
                        const e = this.get("selectedReward")?.item,
                            t = this.get("selectedReward")?.optionIndex || 0;
                        return e?.rewardOptions?.[t]?.rewardName || ""
                    })),
                    description: a.Ember.computed("selectedReward", (function() {
                        const e = this.get("selectedReward")?.item,
                            t = this.get("selectedReward")?.optionIndex || 0;
                        return e?.rewardOptions?.[t]?.rewardDescription || ""
                    })),
                    showReplayButton: a.Ember.computed("selectedReward", (function() {
                        return !0
                    })),
                    actions: {
                        replayButtonClick() {
                            const e = this.get("selectedReward");
                            a.Telemetry.sendCustomData(s.TELEMETRY.TABLE, {
                                eventName: s.TELEMETRY.REPLAY_BUTTON_CLICK_EVENT,
                                eventId: this.get("eventHubService.info.eventId"),
                                milestoneLevel: e.threshold
                            })
                        }
                    }
                });
            t.default = l
        }, (e, t, n) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = void 0;
            var a = n(1),
                s = n(5);
            n(71);
            var l = a.Ember.Controller.extend({
                isVisible: a.Ember.computed.alias("model.isVisible"),
                eventHubService: a.Ember.inject.service("event-hub"),
                backgroundImageStyle: a.Ember.computed("eventHubService.backgroundData", "eventHubService.activeEventType", (function() {
                    if (this.get("eventHubService.activeEventType") === s.EVENT_HUB_TYPES.EVENT_SHOP && this.get("eventHubService.backgroundData.backgroundImagePath")) return a.Ember.String.htmlSafe(`background-image: url(${this.get("eventHubService.backgroundData.backgroundImagePath")})`)
                }))
            });
            t.default = l
        }, (e, t, n) => {
            "use strict";
            n.r(t)
        }, (e, t, n) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = void 0;
            var a = n(1),
                s = n(36),
                l = n(5),
                o = a.Ember.Controller.extend({
                    eventHubService: a.Ember.inject.service("event-hub"),
                    isVisible: a.Ember.computed.alias("model.isVisible"),
                    availableEvents: a.Ember.computed("eventHubService.events.[]", (function() {
                        return (this.get("eventHubService.events") || []).map((({
                            eventId: e,
                            eventInfo: {
                                eventName: t,
                                eventType: n
                            }
                        }) => ({
                            eventId: e,
                            eventType: n,
                            eventName: t,
                            route: (0, s.getRouteByEventHubType)(n)
                        })))
                    })),
                    init() {
                        this._super(...arguments), this.handleAvailableEventsChanged = this.handleAvailableEventsChanged.bind(this), this.handleIsVisibleChanged = this.handleIsVisibleChanged.bind(this), this.addObserver("isVisible", this, this.handleIsVisibleChanged), this.addObserver("availableEvents", this.handleAvailableEventsChanged)
                    },
                    willDestroyElement() {
                        this.removeObserver("isVisible"), this.removeObserver("availableEvents")
                    },
                    handleIsVisibleChanged() {
                        this.transitionToRoute(l.ROUTES.INDEX), this.handleAvailableEventsChanged()
                    },
                    handleAvailableEventsChanged() {
                        if (!this.get("isVisible")) return;
                        const e = this.get("availableEvents");
                        1 === e.length && this.send("selectEvent", e[0])
                    },
                    actions: {
                        selectEvent({
                            eventId: e,
                            route: t
                        }) {
                            const n = this.get("eventHubService.activeEventId");
                            n && n === e || this.get("eventHubService").setActiveEvent(e), this.transitionToRoute(t)
                        }
                    }
                });
            t.default = o
        }, (e, t, n) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = void 0, n(71);
            var a = n(1),
                s = a.Ember.Controller.extend({
                    init() {
                        this._super(...arguments), this.addObserver("isVisible", this, "updatePlayerSettings"), this.addObserver("tokenBalance", this, "updatePlayerSettings"), this.addObserver("tokenShopOffersVersion", this, "updatePlayerSettings")
                    },
                    willDestroy() {
                        this.removeObserver("isVisible"), this.removeObserver("tokenBalance"), this.removeObserver("tokenShopOffersVersion")
                    },
                    eventHubService: a.Ember.inject.service("event-hub"),
                    playerSettingsService: a.Ember.inject.service("player-settings"),
                    isVisible: a.Ember.computed.alias("model.isVisible"),
                    tokenBalance: a.Ember.computed.alias("eventHubService.tokenBalance"),
                    tokenShopOffersVersion: a.Ember.computed.alias("eventHubService.tokenShopData.offersVersion"),
                    isEventShopReady: a.Ember.computed.or("eventHubService.categoriesOffers", "eventHubService.rewardTrackItems"),
                    isRewardTrackMinimized: !1,
                    updatePlayerSettings: function() {
                        this.get("isVisible") && this.get("playerSettingsService").updateEventShopPlayerSettings(this.get("tokenBalance"), this.get("tokenShopOffersVersion"))
                    },
                    actions: {
                        toggleMinimizeRewardTrack() {
                            this.set("isRewardTrackMinimized", !this.get("isRewardTrackMinimized"))
                        }
                    }
                });
            t.default = s
        }, (e, t, n) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = void 0;
            var a = n(1),
                s = n(47),
                l = n(5);
            n(71);
            const {
                TRACKER_SIZE: o
            } = s.REWARD_TRACKER;
            var r = a.Ember.Controller.extend({
                eventHubService: a.Ember.inject.service("event-hub"),
                rewardTrackProgress: a.Ember.computed.alias("eventHubService.rewardTrackProgress"),
                rewardTrackItems: a.Ember.computed.alias("eventHubService.rewardTrackItems"),
                unclaimedRewards: a.Ember.computed.alias("eventHubService.unclaimedRewards.rewardsCount"),
                trackerSize: o.MEDIUM,
                premiumTrackInView: !1,
                passPurchased: a.Ember.computed.alias("eventHubService.info.isPassPurchased"),
                showPassPurchaseModal: !1,
                showPurchaseLevelsModal: !1,
                currentLevel: a.Ember.computed.alias("eventHubService.rewardTrackProgress.level"),
                totalNumberOfLevels: a.Ember.computed.alias("eventHubService.rewardTrackProgress.totalLevels"),
                noMoreLevelsToBuy: a.Ember.computed("currentLevel", "totalNumberOfLevels", (function() {
                    return this.get("currentLevel") === this.get("totalNumberOfLevels")
                })),
                backgroundImageStyle: a.Ember.computed("eventHubService.backgroundData", "premiumTrackInView", (function() {
                    const e = this.get("eventHubService.backgroundData");
                    if (!e?.backgroundImagePath && !e?.premiumBackgroundImagePath) return;
                    const t = this.get("premiumTrackInView") ? e.premiumBackgroundImagePath : e.backgroundImagePath;
                    return a.Ember.String.htmlSafe(`background-image: url("${t}")`)
                })),
                selectedReward: null,
                selectedRewardImage: a.Ember.computed("selectedReward", (function() {
                    const e = this.get("selectedReward")?.item,
                        t = this.get("selectedReward")?.optionIndex || 0;
                    return e?.rewardOptions[t]?.thumbIconPath || ""
                })),
                init() {
                    this._super(...arguments), this.addObserver("rewardTrackItems", this, "setInitialSelectedReward")
                },
                setInitialSelectedReward() {
                    const e = this.get("rewardTrackItems");
                    if (!e?.length) return;
                    let t = e.find((e => "Locked" === e.rewardOptions[0].state || "Unlocked" === e.rewardOptions[0].state));
                    t || (t = e[0]), this.set("selectedReward", {
                        item: t,
                        optionIndex: 0
                    }), this.removeObserver("rewardTrackItems")
                },
                actions: {
                    passPurchaseClick() {
                        this.get("passPurchased") || (a.Telemetry.sendCustomData(l.TELEMETRY.TABLE, {
                            eventName: l.TELEMETRY.PURCHASE_PASS_CLICK_EVENT,
                            eventShopEventId: this.get("eventHubService.info.eventId")
                        }), this.set("showPassPurchaseModal", !0))
                    },
                    rewardsInViewChanged(e = []) {
                        this.set("premiumTrackInView", e.some((e => e >= 99)))
                    },
                    purchaseLevelsClick() {
                        this.set("showPurchaseLevelsModal", !0)
                    },
                    claimAllRewards() {
                        this.get("eventHubService").claimAllPendingRewards()
                    },
                    rewardItemClick(e, t, n) {
                        a.Telemetry.sendCustomData(l.TELEMETRY.TABLE, {
                            eventName: l.TELEMETRY.REWARD_CLICK_EVENT,
                            eventId: this.get("eventHubService.info.eventId"),
                            milestoneLevel: e.threshold
                        }), this.set("selectedReward", {
                            item: e,
                            optionIndex: n
                        })
                    }
                }
            });
            t.default = r
        }, (e, t, n) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = void 0, t.inventoryTypeName = l;
            var a = n(1);
            const s = {
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

            function l(e) {
                const t = e[0],
                    n = s[t];
                return a.tra.get(n)
            }
            var o = a.Ember.Helper.helper(l);
            t.default = o
        }, (e, t, n) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = void 0;
            var a = n(1).Ember.Helper.helper((e => e[0] === e[1]));
            t.default = a
        }, (e, t, n) => {
            const a = n(1).Ember;
            e.exports = a.HTMLBars.template({
                id: "JTitz1ev",
                block: '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-event-hub\\\\src\\\\app\\\\templates\\\\application.hbs\\" style-path=\\"null\\" js-path=\\"null\\" "],["text","\\n"],["block",["if"],[["get",["isVisible"]]],null,0]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","  "],["open-element","div",[]],["static-attr","class","rcp-fe-lol-event-hub-application"],["dynamic-attr","style",["unknown",["backgroundImageStyle"]],null],["flush-element"],["text","\\n    "],["append",["unknown",["outlet"]],false],["text","\\n  "],["close-element"],["text","\\n"]],"locals":[]}],"hasPartials":false}',
                meta: {}
            })
        }, (e, t, n) => {
            const a = n(1).Ember;
            e.exports = a.HTMLBars.template({
                id: "+k2D/OgR",
                block: '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-event-hub\\\\src\\\\app\\\\templates\\\\index.hbs\\" style-path=\\"null\\" js-path=\\"null\\" "],["text","\\n"],["open-element","div",[]],["static-attr","class","event-hub-index"],["flush-element"],["text","\\n"],["block",["each"],[["get",["availableEvents"]]],null,0],["close-element"],["text","\\n"]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","    "],["open-element","div",[]],["static-attr","class","event-hub-navigation-item"],["modifier",["action"],[["get",[null]],"selectEvent",["get",["event"]]]],["flush-element"],["text","\\n          "],["append",["unknown",["event","route"]],false],["text","\\n          "],["append",["unknown",["event","eventName"]],false],["text","\\n    "],["close-element"],["text","\\n"]],"locals":["event"]}],"hasPartials":false}',
                meta: {}
            })
        }, (e, t, n) => {
            const a = n(1).Ember;
            e.exports = a.HTMLBars.template({
                id: "ewM3589a",
                block: '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-event-hub\\\\src\\\\app\\\\templates\\\\event-shop.hbs\\" style-path=\\"null\\" js-path=\\"null\\" "],["text","\\n"],["open-element","div",[]],["static-attr","class","event-shop-root"],["dynamic-attr","style",["unknown",["backgroundImageStyle"]],null],["flush-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","event-shop-root-header"],["flush-element"],["text","\\n    "],["append",["helper",["page-header"],null,[["showHelpIcon","showTokenBalance"],[true,true]]],false],["text","\\n  "],["close-element"],["text","\\n"],["block",["if"],[["get",["isEventShopReady"]]],null,1,0],["close-element"],["text","\\n"]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","    "],["append",["unknown",["event-shop-fallback"]],false],["text","\\n"]],"locals":[]},{"statements":[["text","    "],["append",["helper",["event-shop-main-view"],null,[["isRewardTrackMinimized","toggleMinimizeRewardTrack"],[["get",["isRewardTrackMinimized"]],["helper",["action"],[["get",[null]],"toggleMinimizeRewardTrack"],null]]]],false],["text","\\n"]],"locals":[]}],"hasPartials":false}',
                meta: {}
            })
        }, (e, t, n) => {
            const a = n(1).Ember;
            e.exports = a.HTMLBars.template({
                id: "VZtV5o5y",
                block: '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-event-hub\\\\src\\\\app\\\\templates\\\\hall-of-legends.hbs\\" style-path=\\"null\\" js-path=\\"null\\" "],["text","\\n"],["open-element","div",[]],["static-attr","class","hol-root"],["dynamic-attr","style",["unknown",["backgroundImageStyle"]],null],["flush-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","hol-root-reward-highlight"],["flush-element"],["text","\\n    "],["open-element","img",[]],["dynamic-attr","src",["concat",[["unknown",["selectedRewardImage"]]]]],["static-attr","class","hol-root-reward-highlight-image"],["flush-element"],["close-element"],["text","\\n  "],["close-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","hol-root-content-shroud"],["flush-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","hol-root-reward-framming"],["flush-element"],["text","\\n      "],["open-element","img",[]],["static-attr","src","/fe/lol-event-hub/images/hol-reward-framing.png"],["static-attr","class","hol-root-reward-framming-image"],["flush-element"],["close-element"],["text","\\n    "],["close-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","hol-root-header"],["flush-element"],["text","\\n      "],["append",["helper",["page-header"],null,[["showSystemControls"],[true]]],false],["text","\\n    "],["close-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","hol-root-center-area"],["flush-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","hol-root-reward-details"],["flush-element"],["text","\\n        "],["append",["helper",["hol-reward-details"],null,[["selectedReward"],[["get",["selectedReward"]]]]],false],["text","\\n      "],["close-element"],["text","\\n    "],["close-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","hol-root-reward-track"],["flush-element"],["text","\\n"],["block",["if"],[["get",["rewardTrackItems"]]],null,4,0],["text","    "],["close-element"],["text","\\n  "],["close-element"],["text","\\n  "],["append",["helper",["purchase-levels-modal"],null,[["showPurchaseModal","titleTraKey"],[["get",["showPurchaseLevelsModal"]],"hol_purchase_levels_modal_title"]]],false],["text","\\n  "],["append",["helper",["event-shop-purchase-modal"],null,[["showPurchaseModal"],[["get",["showPassPurchaseModal"]]]]],false],["text","\\n"],["close-element"],["text","\\n"]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","        "],["append",["unknown",["event-shop-fallback"]],false],["text","\\n"]],"locals":[]},{"statements":[["text","              "],["open-element","lol-uikit-flat-button",[]],["static-attr","primary","true"],["static-attr","class","idle hol-root-reward-track-cta"],["modifier",["action"],[["get",[null]],"passPurchaseClick"]],["flush-element"],["text","\\n                "],["open-element","div",[]],["static-attr","class","hol-root-reward-track-upgrade-pass-cta"],["flush-element"],["text","\\n                  "],["append",["unknown",["tra","event_hub_upgrade"]],false],["text","\\n                  "],["open-element","img",[]],["static-attr","class","hol-root-ticket-icon"],["static-attr","src","/fe/lol-static-assets/images/event-shop/ticket-gold2.svg"],["flush-element"],["close-element"],["text","\\n                "],["close-element"],["text","\\n              "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","              "],["open-element","lol-uikit-flat-button",[]],["static-attr","primary","true"],["static-attr","class","idle hol-root-reward-track-cta"],["dynamic-attr","disabled",["unknown",["noMoreLevelsToBuy"]],null],["modifier",["action"],[["get",[null]],"purchaseLevelsClick"]],["flush-element"],["text","\\n                "],["append",["unknown",["tra","event_hub_purchase_lvl"]],false],["text","\\n              "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","                  "],["open-element","div",[]],["static-attr","class","hol-root-unclaimed-rewards-label"],["flush-element"],["text","\\n                    "],["append",["unknown",["unclaimedRewards"]],false],["text","\\n                  "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","        "],["append",["helper",["reward-tracker"],null,[["rewardTrackItems","rewardTrackProgress","trackerSize","shouldScrollToUnclaimedReward","rewardItemTooltipComponent","rewardsInViewChanged","itemClick","isBorderlessTrack"],[["get",["rewardTrackItems"]],["get",["rewardTrackProgress"]],["get",["trackerSize"]],true,"",["helper",["action"],[["get",[null]],"rewardsInViewChanged"],null],["helper",["action"],[["get",[null]],"rewardItemClick"],null],true]]],false],["text","\\n        "],["open-element","div",[]],["static-attr","class","hol-root-reward-track-second-row"],["flush-element"],["text","\\n          "],["open-element","div",[]],["static-attr","class","hol-root-xp"],["flush-element"],["text","\\n            "],["append",["unknown",["hol-xp"]],false],["text","\\n          "],["close-element"],["text","\\n          "],["open-element","div",[]],["static-attr","class","hol-root-reward-track-cta-group"],["flush-element"],["text","\\n            "],["open-element","lol-uikit-flat-button",[]],["static-attr","class","idle hol-root-reward-track-cta"],["modifier",["action"],[["get",[null]],"claimAllRewards"]],["flush-element"],["text","\\n              "],["open-element","div",[]],["static-attr","class","hol-root-reward-track-claim-cta"],["flush-element"],["text","\\n                "],["append",["unknown",["tra","event_shop_reward_button_claim_reward"]],false],["text","\\n"],["block",["if"],[["get",["unclaimedRewards"]]],null,3],["text","              "],["close-element"],["text","\\n            "],["close-element"],["text","\\n"],["block",["if"],[["get",["passPurchased"]]],null,2,1],["text","          "],["close-element"],["text","\\n        "],["close-element"],["text","\\n"]],"locals":[]}],"hasPartials":false}',
                meta: {}
            })
        }, (e, t, n) => {
            const a = n(1).Ember;
            e.exports = a.HTMLBars.template({
                id: "xbxOUARs",
                block: '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-event-hub\\\\src\\\\app\\\\templates\\\\components\\\\page-header.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-event-hub\\\\src\\\\app\\\\styles\\\\components\\\\page-header.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-event-hub\\\\src\\\\app\\\\components\\\\page-header.js\\" "],["text","\\n"],["open-element","img",[]],["static-attr","class","eh-page-header-logo"],["dynamic-attr","src",["unknown",["eventDetailsData","eventIconPath"]],null],["flush-element"],["close-element"],["text","\\n"],["open-element","div",[]],["static-attr","class","eh-page-header-vertical-divider"],["flush-element"],["close-element"],["text","\\n"],["open-element","div",[]],["static-attr","class","eh-page-header-name"],["flush-element"],["text","\\n  "],["append",["unknown",["eventDetailsData","eventName"]],false],["text","\\n"],["close-element"],["text","\\n"],["open-element","div",[]],["static-attr","class","eh-page-header-vertical-divider"],["flush-element"],["close-element"],["text","\\n"],["open-element","div",[]],["static-attr","class","eh-page-header-end-timer"],["flush-element"],["text","\\n"],["block",["uikit-tooltip"],null,[["tooltipPosition","type"],["bottom","system"]],13],["text","  "],["open-element","img",[]],["static-attr","class","eh-page-header-clock-icon"],["static-attr","src","/fe/lol-static-assets/images/event-shop/clock-icon-gold3.svg"],["flush-element"],["close-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","eh-page-header-end-timer-text"],["flush-element"],["text","\\n    "],["append",["helper",["remaining-time-text"],null,[["endDateTime","almostEndingText","timeHasExpiredText","longTimeText","wrappingText"],[["get",["remainingTimeTextProps","endDateTime"]],["get",["remainingTimeTextProps","almostEndingText"]],["get",["tra","event_shop_page_header_event_ended"]],"",["get",["remainingTimeTextProps","wrappingText"]]]]],false],["text","\\n  "],["close-element"],["text","\\n"],["close-element"],["text","\\n"],["open-element","div",[]],["static-attr","class","eh-page-header-vertical-divider"],["flush-element"],["close-element"],["text","\\n"],["block",["if"],[["get",["showHelpIcon"]]],null,7],["block",["if"],[["get",["showTokenBalance"]]],null,6],["block",["if"],[["get",["showSystemControls"]]],null,4]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","        "],["open-element","svg",[]],["static-attr","width","30"],["static-attr","height","30"],["static-attr","viewBox","0 0 30 30"],["static-attr","fill","none"],["static-attr","xmlns","http://www.w3.org/2000/svg","http://www.w3.org/2000/xmlns/"],["flush-element"],["text","\\n          "],["open-element","circle",[]],["static-attr","class","eh-page-header-system-controls-icon-circle"],["static-attr","cx","15"],["static-attr","cy","15"],["static-attr","r","14.5"],["static-attr","stroke","#A09B8C"],["flush-element"],["close-element"],["text","\\n          "],["open-element","path",[]],["static-attr","class","eh-page-header-system-controls-icon-path"],["static-attr","fill-rule","evenodd"],["static-attr","clip-rule","evenodd"],["static-attr","d","M10.3763 7.4502L8.75 9.07654L20.9476 21.2741L22.5739 19.6478L17.95 15.0238V8.60023H15.65L13.5882 10.662L10.3763 7.4502ZM9.9 12.0502H8.75V18.9502H12.2L15.65 22.4002H17.95V21.2502L9.9 13.2002V12.0502Z"],["static-attr","fill","#A09B8C"],["flush-element"],["close-element"],["text","\\n        "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","        "],["open-element","svg",[]],["static-attr","width","30"],["static-attr","height","30"],["static-attr","viewBox","0 0 30 30"],["static-attr","fill","none"],["static-attr","xmlns","http://www.w3.org/2000/svg","http://www.w3.org/2000/xmlns/"],["flush-element"],["text","\\n          "],["open-element","circle",[]],["static-attr","class","eh-page-header-system-controls-icon-circle"],["static-attr","cx","15"],["static-attr","cy","15"],["static-attr","r","14.5"],["static-attr","stroke","#A09B8C"],["flush-element"],["close-element"],["text","\\n          "],["open-element","path",[]],["static-attr","class","eh-page-header-system-controls-icon-path"],["static-attr","fill-rule","evenodd"],["static-attr","clip-rule","evenodd"],["static-attr","d","M21.5437 18.9501H19.0276C19.6203 17.8163 19.9629 16.5764 20.0339 15.3086C19.971 14.162 19.6261 13.0462 19.0276 12.0535H21.5437C22.1364 13.1947 22.479 14.4413 22.5499 15.7157C22.4868 16.8558 22.1418 17.9648 21.5437 18.9501ZM10.2236 18.9501H6.44995V12.0501H10.2236L13.9973 8.6001H16.5125V22.4001H13.9964L10.2236 18.9501Z"],["static-attr","fill","#A09B8C"],["flush-element"],["close-element"],["text","\\n        "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","        "],["open-element","svg",[]],["static-attr","width","30"],["static-attr","height","30"],["static-attr","viewBox","0 0 30 30"],["static-attr","fill","none"],["static-attr","xmlns","http://www.w3.org/2000/svg","http://www.w3.org/2000/xmlns/"],["flush-element"],["text","\\n          "],["open-element","circle",[]],["static-attr","class","eh-page-header-system-controls-icon-circle"],["static-attr","cx","15"],["static-attr","cy","15"],["static-attr","r","14.5"],["static-attr","stroke","#A09B8C"],["flush-element"],["close-element"],["text","\\n          "],["open-element","path",[]],["static-attr","class","eh-page-header-system-controls-icon-path"],["static-attr","fill-rule","evenodd"],["static-attr","clip-rule","evenodd"],["static-attr","d","M10.3763 7.4502L8.75 9.07654L20.9476 21.2741L22.5739 19.6478L17.95 15.0238V8.60023H15.65L13.5882 10.662L10.3763 7.4502ZM9.9 12.0502H8.75V18.9502H12.2L15.65 22.4002H17.95V21.2502L9.9 13.2002V12.0502Z"],["static-attr","fill","#A09B8C"],["flush-element"],["close-element"],["text","\\n        "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","        "],["open-element","svg",[]],["static-attr","width","30"],["static-attr","height","30"],["static-attr","viewBox","0 0 30 30"],["static-attr","fill","none"],["static-attr","xmlns","http://www.w3.org/2000/svg","http://www.w3.org/2000/xmlns/"],["flush-element"],["text","\\n          "],["open-element","circle",[]],["static-attr","class","eh-page-header-system-controls-icon-circle"],["static-attr","cx","15"],["static-attr","cy","15"],["static-attr","r","14.5"],["static-attr","stroke","#A09B8C"],["flush-element"],["close-element"],["text","\\n          "],["open-element","path",[]],["static-attr","class","eh-page-header-system-controls-icon-path"],["static-attr","fill-rule","evenodd"],["static-attr","clip-rule","evenodd"],["static-attr","d","M21.5437 18.9501H19.0276C19.6203 17.8163 19.9629 16.5764 20.0339 15.3086C19.971 14.162 19.6261 13.0462 19.0276 12.0535H21.5437C22.1364 13.1947 22.479 14.4413 22.5499 15.7157C22.4868 16.8558 22.1418 17.9648 21.5437 18.9501ZM10.2236 18.9501H6.44995V12.0501H10.2236L13.9973 8.6001H16.5125V22.4001H13.9964L10.2236 18.9501Z"],["static-attr","fill","#A09B8C"],["flush-element"],["close-element"],["text","\\n        "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","  "],["open-element","div",[]],["static-attr","class","eh-page-header-system-controls"],["flush-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","eh-page-header-system-controls-icon-wrapper eh-page-header-animation-control"],["flush-element"],["text","\\n"],["block",["if"],[["get",["isAnimationEnabled"]]],null,3,2],["text","    "],["close-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","eh-page-header-system-controls-icon-wrapper eh-page-header-animation-control"],["flush-element"],["text","\\n"],["block",["if"],[["get",["isSoundEnabled"]]],null,1,0],["text","    "],["close-element"],["text","\\n  "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","          "],["open-element","lol-uikit-content-block",[]],["static-attr","class","eh-page-header-buy-tokens-tooltip"],["static-attr","type","tooltip-system"],["flush-element"],["text","\\n            "],["append",["unknown",["tra","event_shop_page_header_buy_tokens_tooltip"]],false],["text","\\n          "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","  "],["open-element","div",[]],["static-attr","class","eh-page-header-token-balance-wrapper"],["flush-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","eh-page-header-token-balance"],["flush-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","eh-page-header-token-balance-label"],["flush-element"],["text","\\n        "],["append",["unknown",["tra","event_shop_page_header_balance_you_have"]],false],["text","\\n      "],["close-element"],["text","\\n      "],["open-element","img",[]],["static-attr","class","eh-page-header-token-balance-icon"],["dynamic-attr","src",["unknown",["tokenImage"]],null],["flush-element"],["close-element"],["text","\\n      "],["append",["unknown",["event-shop-token-balance-amount"]],false],["text","\\n    "],["close-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","eh-page-header-buy-tokens-link"],["flush-element"],["text","\\n      "],["open-element","lol-uikit-close-button",[]],["static-attr","button-type","plus"],["dynamic-attr","onclick",["helper",["action"],[["get",[null]],"navigateToStore"],null],null],["flush-element"],["text","\\n"],["block",["uikit-tooltip"],null,[["tooltipPosition","type"],["bottom","system"]],5],["text","      "],["close-element"],["text","\\n    "],["close-element"],["text","\\n  "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","  "],["open-element","div",[]],["static-attr","class","eh-page-header-help-container"],["flush-element"],["text","\\n    "],["open-element","lol-uikit-info-icon",[]],["static-attr","class","eh-page-header-help-button"],["dynamic-attr","onclick",["helper",["action"],[["get",[null]],"showHelpModal"],null],null],["flush-element"],["text","\\n    "],["close-element"],["text","\\n  "],["close-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","eh-page-header-vertical-divider"],["flush-element"],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","          "],["open-element","div",[]],["static-attr","class","eh-page-header-tooltip-block eh-page-header-tooltip-block-bottom"],["flush-element"],["text","\\n            "],["open-element","h6",[]],["static-attr","class","eh-page-header-time-tooltip-bot-title"],["flush-element"],["append",["unknown",["tra","event_shop_page_header_time_tooltip_shop_title"]],false],["text","\\n            "],["close-element"],["text","\\n            "],["open-element","p",[]],["static-attr","class","eh-page-header-time-tooltip-bot-date"],["flush-element"],["append",["unknown",["shopEndDateFullText"]],false],["close-element"],["text","\\n          "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","              "],["append",["unknown",["shopEndDateFullText"]],false],["text","\\n"]],"locals":[]},{"statements":[["text","              "],["append",["unknown",["progressEndDateFullText"]],false],["text","\\n"]],"locals":[]},{"statements":[["text","        "],["open-element","div",[]],["static-attr","class","eh-page-header-tooltip-block eh-page-header-tooltip-block-top"],["flush-element"],["text","\\n          "],["open-element","h5",[]],["static-attr","class","eh-page-header-time-tooltip-top-title"],["flush-element"],["text","\\n            "],["append",["unknown",["tra","event_shop_page_header_time_tooltip_progress_title"]],false],["close-element"],["text","\\n          "],["open-element","p",[]],["static-attr","class","eh-page-header-time-tooltip-top-date"],["flush-element"],["text","\\n"],["block",["if"],[["get",["progressEndDateFullText"]]],null,10,9],["text","          "],["close-element"],["text","\\n          "],["open-element","p",[]],["static-attr","class","eh-page-header-description"],["flush-element"],["append",["unknown",["tra","event_shop_page_header_time_tooltip_progress_description"]],false],["close-element"],["text","\\n        "],["close-element"],["text","\\n"],["block",["if"],[["get",["progressEndDateFullText"]]],null,8]],"locals":[]},{"statements":[["text","        "],["open-element","div",[]],["static-attr","class","eh-page-header-tooltip-block eh-page-header-tooltip-block-top"],["flush-element"],["text","\\n          "],["open-element","h5",[]],["static-attr","class","eh-page-header-time-tooltip-top-title"],["flush-element"],["text","\\n            "],["append",["unknown",["tra","event_shop_page_header_time_tooltip_shop_title"]],false],["text","\\n          "],["close-element"],["text","\\n          "],["open-element","p",[]],["static-attr","class","eh-page-header-time-tooltip-top-date"],["flush-element"],["append",["unknown",["shopEndDateFullText"]],false],["close-element"],["text","\\n          "],["open-element","p",[]],["static-attr","class","eh-page-header-description-top"],["flush-element"],["text","\\n            "],["append",["unknown",["tra","event_shop_page_header_time_tooltip_shop_description_grace_period"]],false],["close-element"],["text","\\n        "],["close-element"],["text","\\n        "],["open-element","div",[]],["static-attr","class","eh-page-header-tooltip-block eh-page-header-tooltip-block-bottom"],["flush-element"],["text","\\n          "],["open-element","h6",[]],["static-attr","class","eh-page-header-time-tooltip-bot-title"],["flush-element"],["text","\\n            "],["append",["unknown",["tra","event_shop_page_header_time_tooltip_progress_title_grace_period"]],false],["text","\\n          "],["close-element"],["text","\\n          "],["open-element","p",[]],["static-attr","class","eh-page-header-description"],["flush-element"],["text","\\n            "],["append",["unknown",["tra","event_shop_page_header_time_tooltip_progress_description_grace_period"]],false],["close-element"],["text","\\n        "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","    "],["open-element","lol-uikit-content-block",[]],["static-attr","class","eh-page-header-tooltip-content"],["static-attr","type","tooltip-large"],["flush-element"],["text","\\n"],["block",["if"],[["get",["isGracePeriod"]]],null,12,11],["text","\\n    "],["close-element"],["text","\\n"]],"locals":[]}],"hasPartials":false}',
                meta: {}
            })
        }, (e, t, n) => {
            const a = n(1).Ember;
            e.exports = a.HTMLBars.template({
                id: "iF8GqMVg",
                block: '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-event-hub\\\\src\\\\app\\\\templates\\\\components\\\\purchase-levels-modal.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-event-hub\\\\src\\\\app\\\\styles\\\\components\\\\purchase-levels-modal.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-event-hub\\\\src\\\\app\\\\components\\\\purchase-levels-modal.js\\" "],["text","\\n"],["block",["uikit-modal"],null,[["displayModal","type","dismissible","dismissibleType","onClose"],[["get",["showPurchaseModal"]],"DialogAlert",true,"inside",["helper",["action"],[["get",[null]],"handleCloseModalClick"],null]]],4]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","                    "],["open-element","div",[]],["static-attr","class","es-purchase-levels-modal-error"],["flush-element"],["text","\\n                        "],["append",["unknown",["tra","event_hub_purchase_modal_not_enough_rp"]],false],["text","\\n                    "],["close-element"],["text","\\n                "]],"locals":[]},{"statements":[["block",["if"],[["get",["notEnoughRp"]]],null,0]],"locals":[]},{"statements":[["text","                    "],["open-element","div",[]],["static-attr","class","es-purchase-levels-modal-error"],["flush-element"],["text","\\n                        "],["append",["unknown",["tra","event_hub_purchase_levels_modal_error_loading_offer"]],false],["text","\\n                    "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","                    "],["open-element","div",[]],["static-attr","class","eh-multi-purchase-slider-container"],["flush-element"],["text","\\n                        "],["open-element","div",[]],["static-attr","class","eh-slider-number"],["flush-element"],["text","\\n                            "],["append",["unknown",["minNumberOfLevelsToBuy"]],false],["text","\\n                        "],["close-element"],["text","\\n                        "],["open-element","lol-uikit-slider",[]],["static-attr","class","multi-purchase-uikit-slider eh-multi-purchase-slider"],["static-attr","step","1"],["static-attr","min","1"],["dynamic-attr","max",["unknown",["maxNumberOfLevelsToBuy"]],null],["dynamic-attr","value",["unknown",["levelsToBuy"]],null],["static-attr","clickSet","true"],["dynamic-attr","onchange",["helper",["action"],[["get",[null]],"updateLevelsToBuy"],null],null],["flush-element"],["close-element"],["text","\\n                        "],["open-element","div",[]],["static-attr","class","eh-slider-number"],["flush-element"],["text","\\n                            "],["append",["unknown",["maxNumberOfLevelsToBuy"]],false],["text","\\n                        "],["close-element"],["text","\\n                    "],["close-element"],["text","\\n\\n                    "],["open-element","div",[]],["static-attr","class","eh-slider-incrementer-container"],["flush-element"],["text","\\n                        "],["open-element","div",[]],["static-attr","class","eh-slider-incrementer"],["flush-element"],["text","\\n                            "],["open-element","lol-uikit-close-button",[]],["static-attr","button-type","remove"],["dynamic-attr","onclick",["helper",["action"],[["get",[null]],"decreaseLevelsToBuy"],null],null],["flush-element"],["close-element"],["text","\\n                            "],["open-element","div",[]],["static-attr","class","eh-slider-incrementer-current"],["flush-element"],["append",["unknown",["levelsToBuy"]],false],["close-element"],["text","\\n                            "],["open-element","lol-uikit-close-button",[]],["static-attr","button-type","add"],["dynamic-attr","onclick",["helper",["action"],[["get",[null]],"increaseLevelsToBuy"],null],null],["flush-element"],["close-element"],["text","\\n                        "],["close-element"],["text","\\n                        "],["open-element","div",[]],["static-attr","class","eh-slider-incrementer-caption"],["flush-element"],["text","\\n                            "],["append",["unknown",["tra","event_hub_purchase_levels_modal_slider_caption"]],false],["text","\\n                        "],["close-element"],["text","\\n                    "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","    "],["open-element","div",[]],["static-attr","class","eh-purchase-levels-modal"],["flush-element"],["text","\\n        "],["open-element","div",[]],["static-attr","class","eh-purchase-levels-modal-container"],["flush-element"],["text","\\n            "],["open-element","div",[]],["static-attr","class","eh-purchase-levels-modal-header"],["flush-element"],["text","\\n                "],["open-element","img",[]],["static-attr","src","/fe/lol-static-assets/images/event-hub/ticket.svg"],["flush-element"],["close-element"],["text","\\n                "],["open-element","div",[]],["static-attr","class","eh-purchase-levels-modal-header-title"],["flush-element"],["text","\\n                    "],["append",["unknown",["titleTra"]],false],["text","\\n                "],["close-element"],["text","\\n                "],["open-element","div",[]],["static-attr","class","eh-purchase-levels-modal-header-subtitle"],["flush-element"],["text","\\n                    "],["append",["unknown",["tra","event_hub_purchase_levels_modal_subtitle"]],false],["text","\\n                "],["close-element"],["text","\\n            "],["close-element"],["text","\\n\\n            "],["open-element","div",[]],["static-attr","class","eh-purchase-levels-modal-selection-container"],["flush-element"],["text","\\n                "],["open-element","div",[]],["static-attr","class","eh-purchase-levels-modal-selection"],["flush-element"],["text","\\n                    "],["open-element","div",[]],["static-attr","class","eh-purchase-levels-modal-selection-next-level"],["flush-element"],["text","\\n                        "],["open-element","div",[]],["static-attr","class","eh-purchase-levels-modal-selection-next-level-title"],["flush-element"],["text","\\n                            "],["append",["unknown",["tra","event_hub_purchase_levels_modal_new_level_text"]],false],["text","\\n                        "],["close-element"],["text","\\n                        "],["open-element","div",[]],["static-attr","class","eh-purchase-levels-modal-selection-next-level-black-box"],["flush-element"],["text","\\n                            "],["open-element","div",[]],["static-attr","class","eh-purchase-levels-modal-selection-next-level-new-level"],["flush-element"],["text","\\n                                "],["append",["unknown",["newLevel"]],false],["text","\\n                            "],["close-element"],["text","\\n                        "],["close-element"],["text","\\n                    "],["close-element"],["text","\\n                "],["close-element"],["text","\\n\\n"],["block",["if"],[["get",["shouldRenderSlider"]]],null,3],["text","            "],["close-element"],["text","\\n\\n            "],["open-element","div",[]],["static-attr","class","eh-purchase-levels-modal-price-breakdown-container"],["flush-element"],["text","\\n                "],["open-element","div",[]],["static-attr","class","eh-purchase-levels-modal-price-breakdown-rp"],["flush-element"],["open-element","img",[]],["static-attr","src","/fe/lol-static-assets/images/event-hub/rp.svg"],["flush-element"],["close-element"],["append",["unknown",["totalPriceTra"]],false],["close-element"],["text","\\n                "],["open-element","div",[]],["static-attr","class","eh-purchase-levels-modal-price-breakdown-new-balance"],["flush-element"],["append",["unknown",["tra","event_hub_purchase_levels_modal_new_balance"]],false],["open-element","img",[]],["static-attr","src","/fe/lol-static-assets/images/event-hub/rp-small.svg"],["flush-element"],["close-element"],["append",["unknown",["newBalanceTra"]],false],["close-element"],["text","\\n            "],["close-element"],["text","\\n\\n            "],["open-element","div",[]],["static-attr","class","eh-purchase-levels-modal-price-confirmation-container"],["flush-element"],["text","\\n                "],["open-element","lol-uikit-flat-checkbox",[]],["flush-element"],["text","\\n                    "],["open-element","input",[]],["static-attr","slot","input"],["static-attr","id","tosChecked"],["static-attr","name","tosChecked"],["static-attr","type","checkbox"],["dynamic-attr","onchange",["helper",["action"],[["get",[null]],"toggleTosChecked"],null],null],["dynamic-attr","disabled",["unknown",["tosDisabled"]],null],["dynamic-attr","checked",["unknown",["tosChecked"]],null],["flush-element"],["close-element"],["text","\\n                    "],["open-element","label",[]],["static-attr","slot","label"],["static-attr","for","tosChecked"],["static-attr","class","eh-purchase-levels-modal-price-confirmation-text"],["flush-element"],["text","\\n                        "],["append",["unknown",["purchaseTosTra"]],false],["text","\\n                    "],["close-element"],["text","\\n                "],["close-element"],["text","\\n            "],["close-element"],["text","\\n            "],["open-element","div",[]],["static-attr","class","eh-purchase-levels-modal-price-button-container"],["flush-element"],["text","\\n                "],["open-element","lol-uikit-flat-button",[]],["static-attr","class","eh-purchase-levels-modal-price-button"],["dynamic-attr","disabled",["unknown",["purchaseButtonDisabled"]],null],["dynamic-attr","onclick",["helper",["action"],[["get",[null]],"purchaseLevels"],null],null],["flush-element"],["text","\\n                    "],["append",["unknown",["levelsButtonTra"]],false],["text","\\n                "],["close-element"],["text","\\n"],["block",["if"],[["get",["errorLoadingPurchaseData"]]],null,2,1],["text","            "],["close-element"],["text","\\n            \\n        "],["close-element"],["text","\\n    "],["close-element"],["text","\\n"]],"locals":[]}],"hasPartials":false}',
                meta: {}
            })
        }, (e, t, n) => {
            const a = n(1).Ember;
            e.exports = a.HTMLBars.template({
                id: "jRZJ/bye",
                block: '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-event-hub\\\\src\\\\app\\\\templates\\\\components\\\\event-shop-card-multi-purchase-modal.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-event-hub\\\\src\\\\app\\\\styles\\\\components\\\\event-shop-card-multi-purchase-modal.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-event-hub\\\\src\\\\app\\\\components\\\\event-shop-card-multi-purchase-modal.js\\" "],["text","\\n"],["open-element","lol-uikit-content-block",[]],["static-attr","type","dialog-large"],["static-attr","class","event-shop-card-multi-purchase-content-block"],["flush-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","event-shop-card-multi-purchase-modal-preview-container"],["flush-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","event-shop-card-multi-purchase-modal-image-container"],["flush-element"],["text","\\n      "],["open-element","img",[]],["static-attr","class","event-shop-card-multi-purchase-modal-image"],["dynamic-attr","src",["unknown",["offer","image"]],null],["flush-element"],["close-element"],["text","\\n    "],["close-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","event-shop-card-multi-purchase-item-title"],["flush-element"],["append",["unknown",["offer","localizedTitle"]],false],["close-element"],["text","\\n  "],["close-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","event-shop-card-multi-purchase-item-details"],["flush-element"],["text","\\n    "],["open-element","p",[]],["flush-element"],["append",["unknown",["offer","localizedDescription"]],false],["close-element"],["text","\\n  "],["close-element"],["text","\\n"],["block",["if"],[["get",["shouldRenderMultiPurchaseSlider"]]],null,3],["text","  "],["open-element","div",[]],["static-attr","class","event-shop-card-multi-purchase-details"],["flush-element"],["text","\\n    "],["open-element","lol-uikit-purchase-button",[]],["dynamic-attr","disabled",["unknown",["isPurchaseDisabled"]],null],["dynamic-attr","onclick",["helper",["action"],[["get",[null]],"purchaseOffer",["get",["offer"]]],null],null],["flush-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","event-shop-card-multi-purchase-currency-wrapper"],["flush-element"],["text","\\n        "],["open-element","img",[]],["static-attr","class","event-shop-card-multi-purchase-currency-icon"],["dynamic-attr","src",["unknown",["tokenImageSrc"]],null],["flush-element"],["close-element"],["text","\\n        "],["append",["unknown",["purchasePrice"]],false],["text","\\n      "],["close-element"],["text","\\n    "],["close-element"],["text","\\n"],["block",["if"],[["get",["notEnoughRp"]]],null,2],["block",["if"],[["get",["offerPurchased"]]],null,1],["text","    "],["open-element","div",[]],["static-attr","class","event-shop-card-multi-purchase-future-balance"],["flush-element"],["text","\\n"],["block",["unless"],[["get",["isPurchaseDisabled"]]],null,0],["text","    "],["close-element"],["text","\\n\\n  "],["close-element"],["text","\\n"],["close-element"]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","        "],["append",["unknown",["tra","event_shop_purchase_modal_balance"]],false],["text"," "],["append",["unknown",["futureTokenBalance"]],false],["text","\\n"]],"locals":[]},{"statements":[["text","    "],["open-element","div",[]],["static-attr","class","event-shop-card-multi-purchase-not-enough-tokens"],["flush-element"],["append",["unknown",["tra","event_shop_card_purchase_offer_already_owned"]],false],["text","\\n    "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","    "],["open-element","div",[]],["static-attr","class","event-shop-card-multi-purchase-not-enough-tokens"],["flush-element"],["append",["unknown",["tra","event_shop_card_purchase_not_enough_tokens"]],false],["text","\\n    "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","    "],["append",["helper",["multi-purchase-slider"],null,[["min","max","onValidationChange","onSelectedQuantityChange","disabled"],[["get",["minPurchasableQuantity"]],["get",["maxPurchasableQuantity"]],["helper",["action"],[["get",[null]],"handleValidationChange"],null],["helper",["action"],[["get",[null]],"handleSelectedQuantityChange"],null],["get",["purchaseInProgress"]]]]],false],["text","\\n"]],"locals":[]}],"hasPartials":false}',
                meta: {}
            })
        }, (e, t, n) => {
            const a = n(1).Ember;
            e.exports = a.HTMLBars.template({
                id: "FpB3kkPW",
                block: '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-event-hub\\\\src\\\\app\\\\templates\\\\components\\\\event-shop-category-nav-bar-tab.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-event-hub\\\\src\\\\app\\\\styles\\\\components\\\\event-shop-category-nav-bar-tab.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-event-hub\\\\src\\\\app\\\\components\\\\event-shop-category-nav-bar-tab.js\\" "],["text","\\n"],["open-element","img",[]],["static-attr","class","event-shop-nav-bar-tab-icon"],["dynamic-attr","src",["unknown",["categoryIconPath"]],null],["flush-element"],["close-element"],["text","\\n"],["block",["uikit-tooltip"],null,[["tooltipPosition","type"],["right","system"]],0]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["open-element","lol-uikit-content-block",[]],["static-attr","type","tooltip-system"],["flush-element"],["text","\\n    "],["open-element","p",[]],["flush-element"],["append",["unknown",["categoryTra"]],false],["close-element"],["text","\\n"],["close-element"],["text","\\n"]],"locals":[]}],"hasPartials":false}',
                meta: {}
            })
        }, (e, t, n) => {
            const a = n(1).Ember;
            e.exports = a.HTMLBars.template({
                id: "1M/mdIqu",
                block: '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-event-hub\\\\src\\\\app\\\\templates\\\\components\\\\event-shop-category-nav-bar.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-event-hub\\\\src\\\\app\\\\styles\\\\components\\\\event-shop-category-nav-bar.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-event-hub\\\\src\\\\app\\\\components\\\\event-shop-category-nav-bar.js\\" "],["text","\\n"],["block",["each"],[["get",["categoriesOffers"]]],null,0]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","  "],["append",["helper",["event-shop-category-nav-bar-tab"],null,[["scrollToCategory","category","categoryIconPath","currentCategory"],[["get",["scrollToCategory"]],["get",["categoryOffers","category"]],["get",["categoryOffers","categoryIconPath"]],["get",["currentCategory"]]]]],false],["text","\\n"]],"locals":["categoryOffers"]}],"hasPartials":false}',
                meta: {}
            })
        }, (e, t, n) => {
            const a = n(1).Ember;
            e.exports = a.HTMLBars.template({
                id: "ShveJusy",
                block: '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-event-hub\\\\src\\\\app\\\\templates\\\\components\\\\event-shop-category-offers.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-event-hub\\\\src\\\\app\\\\styles\\\\components\\\\event-shop-category-offers.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-event-hub\\\\src\\\\app\\\\components\\\\event-shop-category-offers.js\\" "],["text","\\n"],["open-element","div",[]],["dynamic-attr","id",["unknown",["categoryOffersId"]],null],["static-attr","class","event-shop-token-shop-category-offers"],["flush-element"],["text","\\n"],["block",["each"],[["get",["categoryOffers","offers"]]],null,0],["close-element"],["text","\\n"]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","    "],["append",["helper",["event-shop-offer-card"],null,[["offer"],[["get",["offer"]]]]],false],["text","\\n"]],"locals":["offer"]}],"hasPartials":false}',
                meta: {}
            })
        }, (e, t, n) => {
            const a = n(1).Ember;
            e.exports = a.HTMLBars.template({
                id: "gGUMBjzT",
                block: '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-event-hub\\\\src\\\\app\\\\templates\\\\components\\\\event-shop-fallback.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-event-hub\\\\src\\\\app\\\\styles\\\\components\\\\event-shop-fallback.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-event-hub\\\\src\\\\app\\\\components\\\\event-shop-fallback.js\\" "],["text","\\n"],["block",["if"],[["get",["error","errorMessage"]]],null,1,0]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","  "],["open-element","div",[]],["static-attr","class","event-shop-spinner"],["flush-element"],["text","\\n    "],["append",["helper",["uikit-spinner"],null,[["width","height"],["40px","40px"]]],false],["text","\\n  "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","  "],["open-element","div",[]],["static-attr","class","event-shop-unavailable-container"],["flush-element"],["text","\\n    "],["open-element","img",[]],["static-attr","class","event-shop-unavailable-error-image"],["static-attr","src","/fe/lol-static-assets/images/event-shop/icon-shocked-poro-clear.png"],["flush-element"],["close-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","event-shop-unavailable-message"],["flush-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","event-shop-unavailable-message-title"],["flush-element"],["text","\\n        "],["open-element","img",[]],["static-attr","class","event-shop-unavailable-message-title-warning"],["static-attr","src","/fe/lol-static-assets/images/event-shop/red-warning.png"],["flush-element"],["close-element"],["append",["unknown",["errorMessageTra","title"]],false],["text","\\n      "],["close-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","event-shop-unavailable-message-description"],["flush-element"],["text","\\n        "],["append",["unknown",["errorMessageTra","description"]],false],["text","\\n      "],["close-element"],["text","\\n    "],["close-element"],["text","\\n  "],["close-element"],["text","\\n"]],"locals":[]}],"hasPartials":false}',
                meta: {}
            })
        }, (e, t, n) => {
            const a = n(1).Ember;
            e.exports = a.HTMLBars.template({
                id: "i359S0ZW",
                block: '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-event-hub\\\\src\\\\app\\\\templates\\\\components\\\\event-shop-main-view.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-event-hub\\\\src\\\\app\\\\styles\\\\components\\\\event-shop-main-view.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-event-hub\\\\src\\\\app\\\\components\\\\event-shop-main-view.js\\" "],["text","\\n"],["open-element","div",[]],["dynamic-attr","class",["concat",["event-shop-main-view-token-shop ",["helper",["if"],[["get",["isRewardTrackMinimized"]],"event-shop-main-view-token-shop-maximized",""],null]]]],["flush-element"],["text","\\n  "],["append",["unknown",["event-shop-token-shop"]],false],["text","\\n"],["close-element"],["text","\\n"],["open-element","div",[]],["dynamic-attr","class",["concat",["event-shop-main-view-progression ",["helper",["if"],[["get",["isRewardTrackMinimized"]],"event-shop-main-view-progression-minimized",""],null]]]],["flush-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","event-shop-main-view-progression-minimize-button-container"],["dynamic-attr","onclick",["helper",["action"],[["get",[null]],"minimizeRewardTrack"],null],null],["flush-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","event-shop-main-view-progression-minimize-button-trapezoid-border"],["flush-element"],["close-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","event-shop-main-view-progression-minimize-button-trapezoid"],["flush-element"],["text","\\n      "],["open-element","div",[]],["dynamic-attr","class",["concat",["event-shop-main-view-progression-minimize-button-chevron ",["helper",["if"],[["get",["isRewardTrackMinimized"]],"rotate-up",""],null]]]],["flush-element"],["close-element"],["text","\\n    "],["close-element"],["text","\\n  "],["close-element"],["text","\\n  "],["append",["unknown",["event-shop-progression"]],false],["text","\\n"],["close-element"]],"locals":[],"named":[],"yields":[],"blocks":[],"hasPartials":false}',
                meta: {}
            })
        }, (e, t, n) => {
            const a = n(1).Ember;
            e.exports = a.HTMLBars.template({
                id: "K4M13wZF",
                block: '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-event-hub\\\\src\\\\app\\\\templates\\\\components\\\\event-shop-offer-card.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-event-hub\\\\src\\\\app\\\\styles\\\\components\\\\event-shop-offer-card.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-event-hub\\\\src\\\\app\\\\components\\\\event-shop-offer-card.js\\" "],["text","\\n"],["open-element","img",[]],["dynamic-attr","src",["concat",[["unknown",["offerImage"]]]]],["static-attr","class","event-shop-token-shop-offer-card-image"],["flush-element"],["close-element"],["text","\\n"],["open-element","div",[]],["static-attr","class","event-shop-token-shop-offer-card-footer"],["flush-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","event-shop-token-shop-offer-card-title"],["flush-element"],["text","\\n    "],["append",["unknown",["offer","localizedTitle"]],false],["text","\\n  "],["close-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","event-shop-token-shop-offer-card-price"],["flush-element"],["text","\\n"],["block",["if"],[["get",["isOfferOwned"]]],null,7,6],["text","  "],["close-element"],["text","\\n"],["block",["if"],[["get",["shouldRenderOfferItemsCount"]]],null,2],["close-element"],["text","\\n\\n"],["block",["if"],[["get",["displayMultiPurchaseModal"]]],null,1]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","    "],["append",["helper",["event-shop-card-multi-purchase-modal"],null,[["closeModal","offer"],[["helper",["action"],[["get",[null]],"closeModal"],null],["get",["offer"]]]]],false],["text","\\n"]],"locals":[]},{"statements":[["block",["uikit-modal"],null,[["displayModal","type","dismissible","dismissibleType","onClose"],[["get",["displayMultiPurchaseModal"]],"DialogDismiss",true,"outside",["helper",["action"],[["get",[null]],"closeModal"],null]]],0]],"locals":[]},{"statements":[["text","    "],["open-element","div",[]],["static-attr","class","event-shop-token-shop-offer-items-size"],["flush-element"],["text","\\n      "],["append",["unknown",["offer","items","length"]],false],["text","\\n    "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","      "],["open-element","img",[]],["static-attr","class","event-shop-token-shop-offer-card-price-currency-icon"],["dynamic-attr","src",["unknown",["tokenShopData","tokenImage"]],null],["flush-element"],["close-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","event-shop-token-shop-offer-card-price-value"],["flush-element"],["append",["unknown",["offer","price"]],false],["close-element"],["text","\\n    "]],"locals":[]},{"statements":[["block",["if"],[["get",["isOfferRevealed"]]],null,3]],"locals":[]},{"statements":[["text","      "],["open-element","div",[]],["static-attr","class","event-shop-token-shop-offer-card-spinner"],["flush-element"],["text","\\n        "],["append",["helper",["uikit-spinner"],null,[["width","height"],["15px","15px"]]],false],["text","\\n      "],["close-element"],["text","\\n      "],["append",["unknown",["tra","event_shop_offer_card_purchasing"]],false],["text","\\n"]],"locals":[]},{"statements":[["block",["if"],[["get",["isPurchasing"]]],null,5,4]],"locals":[]},{"statements":[["text","      "],["open-element","img",[]],["static-attr","class","event-shop-token-shop-offer-card-owned-icon"],["static-attr","src","/fe/lol-static-assets/images/event-shop/check_mask.png"],["flush-element"],["close-element"],["text","\\n      "],["append",["unknown",["tra","event_shop_offer_card_owned"]],false],["text","\\n"]],"locals":[]}],"hasPartials":false}',
                meta: {}
            })
        }, (e, t, n) => {
            const a = n(1).Ember;
            e.exports = a.HTMLBars.template({
                id: "74XzCp72",
                block: '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-event-hub\\\\src\\\\app\\\\templates\\\\components\\\\event-shop-progression.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-event-hub\\\\src\\\\app\\\\styles\\\\components\\\\event-shop-progression.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-event-hub\\\\src\\\\app\\\\components\\\\event-shop-progression.js\\" "],["text","\\n"],["block",["if"],[["get",["rewardTrackItems","length"]]],null,9,0]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","  "],["open-element","div",[]],["static-attr","class","event-shop-progression-fallback"],["flush-element"],["text","\\n    "],["append",["helper",["event-shop-fallback"],null,[["error"],[["get",["failureLoadingRewardTrack"]]]]],false],["text","\\n  "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","        "],["open-element","div",[]],["static-attr","class","event-shop-progression-label-wrapper"],["flush-element"],["text","\\n          "],["open-element","p",[]],["static-attr","class","event-shop-progression-label"],["flush-element"],["append",["unknown",["tra","event_shop_progression_label_instantly_get"]],false],["close-element"],["text","\\n          "],["open-element","img",[]],["static-attr","class","event-shop-progression-token-icon"],["dynamic-attr","src",["unknown",["eventShopProgressionData","tokenImage"]],null],["flush-element"],["close-element"],["text","\\n          "],["open-element","p",[]],["static-attr","class","event-shop-progression-label-tokens"],["flush-element"],["append",["unknown",["lockedTokens"]],false],["text","\\n            "],["append",["unknown",["tra","event_shop_progression_label_tokens"]],false],["close-element"],["text","\\n        "],["close-element"],["text","\\n        "],["open-element","div",[]],["static-attr","class","event-shop-progression-upgrade-button"],["flush-element"],["text","\\n          "],["open-element","lol-uikit-flat-button",[]],["static-attr","primary","true"],["static-attr","class","idle"],["modifier",["action"],[["get",[null]],"passPurchaseClick"]],["flush-element"],["text","\\n            "],["open-element","div",[]],["static-attr","class","event-shop-progression-button-content"],["flush-element"],["text","\\n              "],["open-element","img",[]],["static-attr","class","event-shop-progression-ticket-icon"],["static-attr","src","/fe/lol-static-assets/images/event-shop/ticket-gold2.svg"],["flush-element"],["close-element"],["text","\\n              "],["append",["unknown",["tra","event_shop_progression_button_purchase_pass"]],false],["text","\\n            "],["close-element"],["text","\\n          "],["close-element"],["text","\\n        "],["close-element"],["text","\\n      "]],"locals":[]},{"statements":[["text","        "],["open-element","div",[]],["static-attr","class","event-shop-progression-label-pass-message"],["flush-element"],["text","\\n          "],["append",["unknown",["tra","event_shop_progression_label_pass_unavailable"]],false],["text","\\n        "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["block",["if"],[["get",["passUnavailable"]]],null,2,1]],"locals":[]},{"statements":[["text","        "],["open-element","div",[]],["static-attr","class","event-shop-progression-label-pass-message"],["flush-element"],["text","\\n          "],["open-element","img",[]],["static-attr","class","event-shop-progression-check-icon"],["static-attr","src","/fe/lol-static-assets/images/event-shop/check_mask.png"],["flush-element"],["close-element"],["text","\\n          "],["append",["unknown",["tra","event_shop_progression_label_pass_purchased"]],false],["text","\\n        "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["block",["if"],[["get",["eventShopProgressionData","passPurchased"]]],null,4,3]],"locals":[]},{"statements":[["text","        "],["open-element","div",[]],["static-attr","class","event-shop-progression-label-pass-message"],["flush-element"],["text","\\n          "],["append",["unknown",["tra","event_shop_progression_label_pass_loading"]],false],["text","\\n        "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["block",["if"],[["get",["isLoadingPassAvailability"]]],null,6,5]],"locals":[]},{"statements":[["text","        "],["open-element","div",[]],["static-attr","class","event-shop-progression-unclaimed-wrapper"],["flush-element"],["text","\\n          "],["open-element","div",[]],["static-attr","class","event-shop-progression-unclaimed-box"],["flush-element"],["text","\\n            "],["open-element","span",[]],["flush-element"],["append",["unknown",["unclaimedRewards"]],false],["close-element"],["text","\\n          "],["close-element"],["text","\\n          "],["open-element","div",[]],["flush-element"],["text","\\n            "],["open-element","p",[]],["flush-element"],["append",["unknown",["tra","event_shop_progression_label_unclaimed_rewards"]],false],["close-element"],["text","\\n          "],["close-element"],["text","\\n        "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","  "],["open-element","div",[]],["static-attr","class","event-shop-progression-info"],["flush-element"],["text","\\n    "],["append",["unknown",["event-shop-xp"]],false],["text","\\n    "],["open-element","div",[]],["static-attr","class","event-shop-progression-pass-purchase"],["flush-element"],["text","\\n"],["block",["if"],[["get",["hasUnclaimedRewards"]]],null,8,7],["text","      "],["append",["helper",["event-shop-purchase-modal"],null,[["showPurchaseModal"],[["get",["showPassPurchaseModal"]]]]],false],["text","\\n    "],["close-element"],["text","\\n  "],["close-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","event-shop-progression-track"],["flush-element"],["text","\\n    "],["append",["unknown",["event-shop-reward-track-wrapper"]],false],["text","\\n  "],["close-element"],["text","\\n"]],"locals":[]}],"hasPartials":false}',
                meta: {}
            })
        }, (e, t, n) => {
            const a = n(1).Ember;
            e.exports = a.HTMLBars.template({
                id: "6XGXvBWn",
                block: '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-event-hub\\\\src\\\\app\\\\templates\\\\components\\\\event-shop-purchase-modal.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-event-hub\\\\src\\\\app\\\\styles\\\\components\\\\event-shop-purchase-modal.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-event-hub\\\\src\\\\app\\\\components\\\\event-shop-purchase-modal.js\\" "],["text","\\n"],["block",["uikit-modal"],null,[["displayModal","type","dismissible","dismissibleType","onClose"],[["get",["showPurchaseModal"]],"DialogAlert",true,"inside",["helper",["action"],[["get",[null]],"handleCloseModalClick"],null]]],21],["block",["if"],[["get",["showDropRatesModal"]]],null,1]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","    "],["append",["helper",["loot-table-root"],null,[["name"],[["get",["dropRatesLootItemName"]]]]],false],["text","\\n"]],"locals":[]},{"statements":[["block",["uikit-modal"],null,[["show","type","dismissibleType","onClose"],["true","DialogDismiss","inside",["helper",["action"],[["get",[null]],"closeDropRatesModal"],null]]],0]],"locals":[]},{"statements":[["text","              "],["open-element","h5",[]],["static-attr","class","event-shop-purchase-modal-summary-choose-text"],["flush-element"],["append",["unknown",["tra","event_shop_purchase_modal_summary_choose"]],false],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","                    "],["open-element","div",[]],["static-attr","class","event-shop-purchase-modal-summary-balance-not-enough-rp"],["flush-element"],["text","\\n                      "],["append",["unknown",["tra","event_hub_purchase_modal_not_enough_rp"]],false],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","                    "],["append",["unknown",["tra","event_shop_purchase_modal_balance"]],false],["text","\\n                    "],["open-element","span",[]],["static-attr","class","event-shop-purchase-modal-rp-icon"],["flush-element"],["close-element"],["text","\\n                    "],["append",["unknown",["newBalance"]],false],["text","\\n"]],"locals":[]},{"statements":[["text","                    "],["open-element","div",[]],["static-attr","class","event-shop-purchase-modal-summary-discount"],["flush-element"],["text","\\n                      "],["open-element","div",[]],["static-attr","class","event-shop-purchase-modal-summary-discount-text"],["flush-element"],["append",["unknown",["discountPercentage"]],false],["close-element"],["text","\\n                    "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","                    "],["open-element","div",[]],["static-attr","class","event-shop-purchase-modal-summary-initial-price"],["flush-element"],["text","\\n                      "],["open-element","span",[]],["static-attr","class","event-shop-purchase-modal-rp-icon"],["flush-element"],["close-element"],["text","\\n                      "],["open-element","div",[]],["static-attr","class","event-shop-purchase-modal-summary-initial-price-text"],["flush-element"],["append",["unknown",["initialPrice"]],false],["close-element"],["text","\\n                    "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","                              "],["open-element","div",[]],["dynamic-attr","onclick",["helper",["action"],[["get",[null]],"openDropRatesModal",["get",["item"]]],null],null],["static-attr","class","event-shop-purchase-modal-summary-item-drop-rates"],["flush-element"],["text","\\n                                "],["open-element","span",[]],["static-attr","class","event-shop-purchase-modal-dice-icon"],["flush-element"],["close-element"],["text","\\n                                "],["append",["unknown",["tra","event_shop_purchase_modal_see_drop_rates"]],false],["text","\\n                              "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","                                "],["append",["helper",["inventory-type-name"],[["get",["item","inventoryType"]]],null],false],["text","\\n"]],"locals":[]},{"statements":[["text","                                "],["append",["unknown",["tra","event_shop_offer_card_owned"]],false],["text","\\n"]],"locals":[]},{"statements":[["text","                      "],["open-element","div",[]],["dynamic-attr","class",["concat",["event-shop-purchase-modal-summary-item\\n                          ",["helper",["if"],[["get",["item","owned"]],"event-shop-purchase-modal-summary-item-owned"],null]]]],["flush-element"],["text","\\n                        "],["open-element","div",[]],["static-attr","class","event-shop-purchase-modal-summary-item-img-wrapper"],["flush-element"],["text","\\n                          "],["open-element","img",[]],["static-attr","class","event-shop-purchase-modal-summary-item-img"],["dynamic-attr","src",["unknown",["item","splashImage"]],null],["flush-element"],["close-element"],["text","\\n                        "],["close-element"],["text","\\n                        "],["open-element","div",[]],["static-attr","class","event-shop-purchase-modal-summary-item-details"],["flush-element"],["text","\\n                          "],["open-element","p",[]],["static-attr","class","event-shop-purchase-modal-summary-item-name"],["flush-element"],["append",["unknown",["item","name"]],false],["close-element"],["text","\\n                          "],["open-element","div",[]],["static-attr","class","event-shop-purchase-modal-summary-item-description"],["flush-element"],["text","\\n                            "],["open-element","p",[]],["static-attr","class","event-shop-purchase-modal-summary-item-inventory-type"],["flush-element"],["text","\\n"],["block",["if"],[["get",["item","owned"]]],null,9,8],["text","                            "],["close-element"],["text","\\n"],["block",["if"],[["helper",["eq"],[["get",["item","subInventoryType"]],"CHEST"],null]],null,7],["text","                          "],["close-element"],["text","\\n                        "],["close-element"],["text","\\n                      "],["close-element"],["text","\\n"]],"locals":["item"]},{"statements":[["text","                        "],["append",["unknown",["tra","event_shop_see_more"]],false],["text","\\n"]],"locals":[]},{"statements":[["text","                        "],["append",["unknown",["tra","event_shop_see_less"]],false],["text","\\n"]],"locals":[]},{"statements":[["text","              "],["open-element","lol-uikit-scrollable",[]],["static-attr","overflow-masks","enabled"],["static-attr","class","event-shop-purchase-modal-summary-scrollable-area"],["flush-element"],["text","\\n                "],["open-element","div",[]],["static-attr","id","event-shop-purchse-modal-summary-description"],["dynamic-attr","class",["concat",["event-shop-purchse-modal-summary-description\\n                    ",["unknown",["descriptionElementAdditionalClassName"]],"\\n                    ",["helper",["if"],[["get",["isDescriptionExpanded"]],"event-shop-purchase-modal-summary-description-expanded"],null]]]],["flush-element"],["text","\\n                  "],["open-element","div",[]],["static-attr","id","event-shop-purchse-modal-summary-description-text"],["static-attr","class","event-shop-purchse-modal-summary-description-text"],["flush-element"],["text","\\n                    "],["append",["unknown",["selectedOption","details","description"]],true],["text","\\n                  "],["close-element"],["text","\\n                  "],["open-element","div",[]],["static-attr","class","event-shop-purchase-modal-summary-description-see-more"],["dynamic-attr","onclick",["helper",["action"],[["get",[null]],"expandOrCollapseDescription"],null],null],["flush-element"],["text","\\n                    "],["open-element","div",[]],["static-attr","class","event-shop-purchase-modal-summary-description-see-more-text"],["flush-element"],["text","\\n"],["block",["if"],[["get",["isDescriptionExpanded"]]],null,12,11],["text","                    "],["close-element"],["text","\\n                    "],["open-element","span",[]],["static-attr","class","event-shop-purchase-modal-summary-description-see-more-chevron"],["flush-element"],["close-element"],["text","\\n                  "],["close-element"],["text","\\n                "],["close-element"],["text","\\n                "],["open-element","div",[]],["static-attr","class","event-shop-purchase-modal-summary-items"],["flush-element"],["text","\\n                  "],["open-element","h5",[]],["static-attr","class","event-shop-purchase-modal-summary-items-header"],["flush-element"],["text","\\n                    "],["append",["unknown",["tra","event_shop_purchase_modal_purchse_summary"]],false],["text","\\n                  "],["close-element"],["text","\\n                  "],["open-element","div",[]],["static-attr","class","event-shop-purchase-modal-summary-item-list"],["flush-element"],["text","\\n"],["block",["each"],[["get",["selectedOption","bundledItems"]]],null,10],["text","                  "],["close-element"],["text","\\n                "],["close-element"],["text","\\n              "],["close-element"],["text","\\n              "],["open-element","div",[]],["static-attr","class","event-shop-purchase-modal-summary-unlock"],["flush-element"],["text","\\n                "],["open-element","div",[]],["static-attr","class","event-shop-purchase-modal-summary-price"],["flush-element"],["text","\\n                  "],["open-element","div",[]],["static-attr","class","event-shop-purchase-modal-summary-final-price"],["flush-element"],["text","\\n                    "],["open-element","span",[]],["static-attr","class","event-shop-purchase-modal-rp-icon"],["flush-element"],["close-element"],["text","\\n                    "],["open-element","div",[]],["static-attr","class","event-shop-purchase-modal-summary-final-price-text"],["flush-element"],["append",["unknown",["finalPrice"]],false],["close-element"],["text","\\n                  "],["close-element"],["text","\\n"],["block",["if"],[["get",["initialPrice"]]],null,6],["block",["if"],[["get",["discountPercentage"]]],null,5],["text","                "],["close-element"],["text","\\n                "],["open-element","div",[]],["static-attr","class","event-shop-purchase-modal-summary-balance"],["flush-element"],["text","\\n"],["block",["if"],[["get",["selectedOption","isPurchasable"]]],null,4,3],["text","                "],["close-element"],["text","\\n                "],["open-element","div",[]],["static-attr","class","event-shop-purchase-modal-summary-unlock-button"],["flush-element"],["text","\\n                  "],["open-element","lol-uikit-flat-button",[]],["static-attr","primary","true"],["dynamic-attr","disabled",["unknown",["unlockButtonDisabled"]],null],["dynamic-attr","onclick",["helper",["action"],[["get",[null]],"unlockPass"],null],null],["flush-element"],["text","\\n                    "],["open-element","div",[]],["static-attr","class","event-shop-purchase-modal-summary-unlock-button-content"],["flush-element"],["text","\\n                      "],["append",["unknown",["tra","event_shop_purchase_modal_unlock_now"]],false],["text","\\n                    "],["close-element"],["text","\\n                  "],["close-element"],["text","\\n                "],["close-element"],["text","\\n              "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","          "],["open-element","div",[]],["static-attr","class","event-shop-purchase-modal-summary-details"],["flush-element"],["text","\\n"],["block",["if"],[["get",["selectedOption"]]],null,13,2],["text","          "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","          "],["open-element","div",[]],["static-attr","class","event-shop-purchase-modal-spinner"],["flush-element"],["text","\\n            "],["append",["unknown",["event-shop-fallback"]],false],["text","\\n          "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","        "],["open-element","div",[]],["static-attr","class","event-shop-purchase-modal-summary-header"],["flush-element"],["text","\\n          "],["open-element","h4",[]],["static-attr","class","event-shop-purchase-modal-summary-title"],["flush-element"],["append",["unknown",["summaryTitle"]],false],["close-element"],["text","\\n          "],["open-element","h5",[]],["static-attr","class","event-shop-purchase-modal-summary-subtitle"],["flush-element"],["append",["unknown",["summarySubtitle"]],false],["close-element"],["text","\\n        "],["close-element"],["text","\\n"],["block",["if"],[["get",["isExecutingPurchase"]]],null,15,14]],"locals":[]},{"statements":[["text","        "],["open-element","div",[]],["static-attr","class","event-shop-purchase-modal-success"],["flush-element"],["text","\\n          "],["open-element","div",[]],["static-attr","class","event-shop-purchase-modal-success-header"],["flush-element"],["text","\\n            "],["open-element","div",[]],["static-attr","class","event-shop-purchase-modal-success-lock-icon"],["flush-element"],["close-element"],["text","\\n            "],["open-element","div",[]],["static-attr","class","event-shop-purchase-modal-success-text"],["flush-element"],["text","\\n              "],["append",["unknown",["tra","event_shop_purchase_modal_success_header"]],false],["text","\\n            "],["close-element"],["text","\\n            "],["open-element","div",[]],["static-attr","class","event-shop-purchase-modal-success-item-name"],["flush-element"],["text","\\n              "],["append",["unknown",["summaryTitle"]],false],["text","\\n            "],["close-element"],["text","\\n            "],["open-element","div",[]],["static-attr","class","event-shop-purchase-modal-success-message"],["flush-element"],["text","\\n              "],["append",["unknown",["tra","event_shop_purchase_modal_success_message"]],false],["text","\\n            "],["close-element"],["text","\\n          "],["close-element"],["text","\\n          "],["open-element","div",[]],["static-attr","class","event-shop-purchase-modal-success-footer"],["flush-element"],["text","\\n            "],["open-element","div",[]],["static-attr","class","event-shop-purchase-modal-summary-unlock-button"],["flush-element"],["text","\\n              "],["open-element","lol-uikit-flat-button",[]],["dynamic-attr","onclick",["helper",["action"],[["get",[null]],"handleCloseModalClick"],null],null],["flush-element"],["text","\\n                "],["open-element","div",[]],["static-attr","class","event-shop-purchase-modal-summary-unlock-button-content"],["flush-element"],["text","\\n                  "],["append",["unknown",["tra","event_shop_purchase_modal_awesome"]],false],["text","\\n                "],["close-element"],["text","\\n              "],["close-element"],["text","\\n            "],["close-element"],["text","\\n          "],["close-element"],["text","\\n        "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","        "],["open-element","div",[]],["static-attr","class","event-shop-purchase-modal-spinner"],["flush-element"],["text","\\n          "],["append",["unknown",["event-shop-fallback"]],false],["text","\\n        "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","            "],["open-element","div",[]],["dynamic-attr","class",["concat",["event-shop-purchase-modal-option\\n                ",["unknown",["option","optionTypeCssClass"]],"\\n                ",["unknown",["option","selectedCssClass"]],"\\n                ",["unknown",["optionsPointerClass"]],"\\n                ",["unknown",["optionsExecutingPurchaseClass"]]]]],["dynamic-attr","onclick",["helper",["action"],[["get",[null]],"selectOption",["get",["option"]]],null],null],["flush-element"],["text","\\n              "],["open-element","div",[]],["static-attr","class","event-shop-purchase-modal-option-image-wrapper"],["flush-element"],["text","\\n                "],["open-element","img",[]],["static-attr","class","event-shop-purchase-modal-option-image"],["dynamic-attr","src",["unknown",["option","details","splashImage"]],null],["dynamic-attr","alt",["unknown",["option","details","name"]],null],["flush-element"],["close-element"],["text","\\n              "],["close-element"],["text","\\n              "],["open-element","div",[]],["static-attr","class","event-shop-purchase-modal-option-details-wrapper"],["flush-element"],["text","\\n                "],["open-element","div",[]],["static-attr","class","event-shop-purchase-modal-option-details"],["flush-element"],["text","\\n                  "],["open-element","div",[]],["static-attr","class","event-shop-purchase-modal-option-title"],["flush-element"],["append",["unknown",["option","details","name"]],false],["close-element"],["text","\\n                  "],["open-element","div",[]],["static-attr","class","event-shop-purchase-modal-option-bottom-row"],["flush-element"],["text","\\n                    "],["open-element","div",[]],["static-attr","class","event-shop-purchase-modal-option-price"],["flush-element"],["text","\\n                      "],["open-element","span",[]],["static-attr","class","event-shop-purchase-modal-rp-icon"],["flush-element"],["close-element"],["text","\\n                      "],["open-element","div",[]],["static-attr","class","event-shop-purchase-modal-option-price-text"],["flush-element"],["append",["unknown",["option","finalPrice"]],false],["close-element"],["text","\\n                    "],["close-element"],["text","\\n                    "],["open-element","div",[]],["static-attr","class","event-shop-purchase-modal-option-quantity"],["flush-element"],["append",["unknown",["option","bundledItems","length"]],false],["close-element"],["text","\\n                  "],["close-element"],["text","\\n                "],["close-element"],["text","\\n              "],["close-element"],["text","\\n            "],["close-element"],["text","\\n"]],"locals":["option"]},{"statements":[["text","        "],["open-element","div",[]],["dynamic-attr","class",["concat",["event-shop-purchase-modal-options-wrapper ",["unknown",["numberOfOptionsWrapperCssClass"]]]]],["flush-element"],["text","\\n"],["block",["each"],[["get",["options"]]],null,19],["text","        "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","  "],["open-element","div",[]],["static-attr","class","event-shop-purchase-modal"],["flush-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","event-shop-purchase-modal-options"],["flush-element"],["text","\\n"],["block",["if"],[["get",["options","length"]]],null,20,18],["text","    "],["close-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","event-shop-purchase-modal-summary"],["flush-element"],["text","\\n"],["block",["if"],[["get",["purchaseCompleted"]]],null,17,16],["text","    "],["close-element"],["text","\\n  "],["close-element"],["text","\\n"]],"locals":[]}],"hasPartials":false}',
                meta: {}
            })
        }, (e, t, n) => {
            const a = n(1).Ember;
            e.exports = a.HTMLBars.template({
                id: "i+L8e1qP",
                block: '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-event-hub\\\\src\\\\app\\\\templates\\\\components\\\\event-shop-reward-track-wrapper.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-event-hub\\\\src\\\\app\\\\styles\\\\components\\\\event-shop-reward-track-wrapper.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-event-hub\\\\src\\\\app\\\\components\\\\event-shop-reward-track-wrapper.js\\" "],["text","\\n"],["block",["if"],[["get",["rewardTrackItems"]]],null,0]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","  "],["append",["helper",["reward-tracker"],null,[["rewardTrackItems","rewardTrackProgress","displayCurrentBonusIteration","rewardTrackBonusItems","rewardTrackBonusProgress","itemClick","bonusItemClick","trackerSize","useDefaultTooltipComponent","isDisabled","shouldScrollToUnclaimedReward","scrollingArrowsEnabled"],[["get",["rewardTrackItems"]],["get",["rewardTrackProgress"]],["get",["displayCurrentBonusIteration"]],["get",["rewardTrackBonusItems"]],["get",["rewardTrackBonusProgress"]],["helper",["action"],[["get",[null]],"clickItem"],null],["helper",["action"],[["get",[null]],"clickItem"],null],["get",["trackerSize"]],true,["get",["isGracePeriod"]],true,["get",["scrollingArrowsEnabled"]]]]],false],["text","\\n"]],"locals":[]}],"hasPartials":false}',
                meta: {}
            })
        }, (e, t, n) => {
            const a = n(1).Ember;
            e.exports = a.HTMLBars.template({
                id: "+Ba8qCgV",
                block: '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-event-hub\\\\src\\\\app\\\\templates\\\\components\\\\event-shop-token-shop.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-event-hub\\\\src\\\\app\\\\styles\\\\components\\\\event-shop-token-shop.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-event-hub\\\\src\\\\app\\\\components\\\\event-shop-token-shop.js\\" "],["text","\\n"],["block",["if"],[["get",["categoriesOffers","length"]]],null,2,0]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","  "],["append",["unknown",["event-shop-fallback"]],false],["text","\\n"]],"locals":[]},{"statements":[["text","          "],["open-element","div",[]],["static-attr","class","event-shop-token-shop-section-header-title-text"],["flush-element"],["append",["helper",["get"],[["get",["tra"]],["helper",["concat"],["event_shop_offers_category_",["get",["categoryOffers","category"]]],null]],null],false],["close-element"],["text","\\n          "],["open-element","hr",[]],["static-attr","class","event-shop-token-shop-section-header-line"],["flush-element"],["close-element"],["text","\\n          "],["append",["helper",["event-shop-category-offers"],null,[["categoryOffers","headerTxtObserver"],[["get",["categoryOffers"]],["get",["headerTxtObserver"]]]]],false],["text","\\n"]],"locals":["categoryOffers"]},{"statements":[["text","  "],["append",["helper",["event-shop-category-nav-bar"],null,[["currentCategory","categoriesOffers","scrollToCategory"],[["get",["currentCategory"]],["get",["categoriesOffers"]],["helper",["action"],[["get",[null]],"scrollToCategory"],null]]]],false],["text","\\n  "],["open-element","lol-uikit-scrollable",[]],["static-attr","id","token-shop-scrollable-container"],["static-attr","class","event-shop-token-shop-scrollable-section"],["flush-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","event-shop-token-shop-content"],["flush-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","event-shop-token-shop-offers"],["flush-element"],["text","\\n"],["block",["each"],[["get",["categoriesOffers"]]],null,1],["text","      "],["close-element"],["text","\\n    "],["close-element"],["text","\\n  "],["close-element"],["text","\\n"]],"locals":[]}],"hasPartials":false}',
                meta: {}
            })
        }, (e, t, n) => {
            const a = n(1).Ember;
            e.exports = a.HTMLBars.template({
                id: "eLPucwG6",
                block: '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-event-hub\\\\src\\\\app\\\\templates\\\\components\\\\event-shop-xp.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-event-hub\\\\src\\\\app\\\\styles\\\\components\\\\event-shop-xp.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-event-hub\\\\src\\\\app\\\\components\\\\event-shop-xp.js\\" "],["text","\\n"],["open-element","div",[]],["static-attr","class","event-shop-xp-header-pass-track"],["flush-element"],["text","\\n  "],["append",["unknown",["tra","event_shop_xp_header_pass_track"]],false],["text","\\n"],["close-element"],["text","\\n"],["open-element","div",[]],["static-attr","class","event-shop-xp-vertical-divider"],["flush-element"],["close-element"],["text","\\n"],["open-element","div",[]],["dynamic-attr","class",["concat",["event-shop-xp-level-tooltip ",["helper",["if"],[["get",["rewardTrackXP","isBonusPhase"]],"is-completed"],null]]]],["flush-element"],["text","\\n"],["block",["uikit-tooltip"],null,[["tooltipPosition","type"],["top","system"]],10],["text","  "],["open-element","div",[]],["static-attr","class","event-shop-xp-level"],["flush-element"],["text","\\n"],["block",["if"],[["get",["isGracePeriod"]]],null,5,4],["text","  "],["close-element"],["text","\\n"],["block",["if"],[["get",["isGracePeriod"]]],null,1,0],["close-element"],["text","\\n"],["open-element","div",[]],["static-attr","class","event-shop-xp-vertical-divider"],["flush-element"],["close-element"],["text","\\n"]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","    "],["open-element","div",[]],["dynamic-attr","class",["concat",["event-shop-xp-label-xp-wrapper ",["helper",["if"],[["get",["xpOverflow"]]," xp-overflow"],null]]]],["flush-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","event-shop-xp-label-xp"],["flush-element"],["text","\\n        "],["open-element","span",[]],["static-attr","class","event-shop-xp-label-xp-current"],["flush-element"],["append",["unknown",["rewardTrackXP","currentLevelXP"]],false],["close-element"],["text","\\n         / \\n        "],["open-element","span",[]],["static-attr","class","event-shop-xp-label-xp-total"],["flush-element"],["text"," "],["append",["unknown",["rewardTrackXP","totalLevelXP"]],false],["close-element"],["text","\\n      "],["close-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","event-shop-xp-label-level-xp"],["flush-element"],["append",["unknown",["tra","event_hub_xp_label"]],false],["close-element"],["text","\\n    "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","    "],["open-element","div",[]],["dynamic-attr","class",["concat",["event-shop-xp-label-xp-wrapper ",["helper",["if"],[["get",["hasUnclaimedRewards"]]," unclaimed"],null]]]],["flush-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","event-shop-xp-label-xp"],["flush-element"],["text","\\n        "],["open-element","span",[]],["static-attr","class","event-shop-xp-label-xp-current"],["flush-element"],["append",["unknown",["rewardTrackXP","currentLevel"]],false],["close-element"],["text","\\n      "],["close-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","event-shop-xp-label-level-xp"],["flush-element"],["append",["unknown",["tra","event_shop_reward_description_level_completed"]],false],["close-element"],["text","\\n    "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","      "],["open-element","div",[]],["static-attr","class","event-shop-xp-label-level"],["flush-element"],["text","\\n        "],["append",["unknown",["levelLabel"]],false],["text","\\n      "],["close-element"],["text","\\n    "]],"locals":[]},{"statements":[["text","      "],["open-element","div",[]],["static-attr","class","event-shop-xp-repeat"],["flush-element"],["text","\\n        "],["open-element","svg",[]],["static-attr","class","event-shop-xp-repeat-icon"],["static-attr","viewBox","0 0 10 7"],["flush-element"],["text","\\n          "],["open-element","path",[]],["static-attr","class","event-shop-xp-repeat-icon-path"],["static-attr","fill-rule","evenodd"],["static-attr","clip-rule","evenodd"],["static-attr","d","M6.38908 1.77185V0.399902L3.9833 2.31037L6.38956 4.22084V2.85168C6.81026 2.85942 7.21055 3.02847 7.50237 3.32164C7.79419 3.61481 7.95364 4.00809 7.94565 4.41496C7.93765 4.82183 7.76286 5.20897 7.45972 5.4912C7.15659 5.77343 6.74995 5.92765 6.32925 5.91991H3.33337C2.91248 5.91991 2.50883 5.75821 2.21121 5.47037C1.9136 5.18254 1.7464 4.79215 1.7464 4.3851C1.7464 3.97804 1.9136 3.58765 2.21121 3.29982C2.50883 3.01199 2.91248 2.85028 3.33337 2.85028V1.77045C2.61636 1.77045 1.92872 2.04593 1.42171 2.53627C0.914713 3.02661 0.629883 3.69165 0.629883 4.3851C0.629883 5.07854 0.914713 5.74359 1.42171 6.23393C1.92872 6.72427 2.61636 6.99974 3.33337 6.99974H6.32925C6.68409 7.00357 7.03623 6.93977 7.36557 6.81198C7.69491 6.68419 7.995 6.49492 8.24871 6.25496C8.50242 6.01501 8.70477 5.72907 8.84422 5.41349C8.98367 5.0979 9.05748 4.75884 9.06144 4.41566C9.0654 4.07249 8.99943 3.73192 8.8673 3.4134C8.73517 3.09488 8.53947 2.80465 8.29136 2.55928C8.04325 2.31391 7.7476 2.1182 7.42129 1.98334C7.09498 1.84847 6.7444 1.77708 6.38956 1.77325L6.38908 1.77185Z"],["static-attr","fill","#5b5a56"],["flush-element"],["close-element"],["text","\\n        "],["close-element"],["text","\\n        "],["open-element","span",[]],["static-attr","class","event-shop-xp-iteration"],["flush-element"],["text","\\n          "],["append",["unknown",["rewardTrackXP","iteration"]],false],["text","\\n        "],["close-element"],["text","\\n      "],["close-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","event-shop-xp-vertical-divider"],["flush-element"],["close-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","event-shop-xp-label-level"],["flush-element"],["text","\\n        "],["append",["unknown",["levelLabel"]],false],["text","\\n      "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["block",["if"],[["get",["rewardTrackXP","isBonusPhase"]]],null,3,2]],"locals":[]},{"statements":[["text","      "],["open-element","div",[]],["static-attr","class","event-shop-xp-label-progress-locked"],["flush-element"],["text","\\n        "],["append",["unknown",["tra","event_shop_xp_label_level_progress_locked"]],false],["text","\\n      "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","        "],["open-element","div",[]],["static-attr","class","event-shop-progression-tooltip-block"],["flush-element"],["text","\\n          "],["open-element","h5",[]],["flush-element"],["append",["unknown",["tra","event_shop_xp_label_event_xp"]],false],["close-element"],["text","\\n          "],["open-element","p",[]],["flush-element"],["append",["unknown",["tra","event_shop_xp_tooltip_complete_top"]],false],["open-element","br",[]],["flush-element"],["close-element"],["append",["unknown",["tra","event_shop_xp_tooltip_complete_bottom"]],false],["text","\\n          "],["close-element"],["text","\\n        "],["close-element"],["text","\\n      "]],"locals":[]},{"statements":[["text","        "],["open-element","div",[]],["static-attr","class","event-shop-progression-tooltip-block-repeat"],["flush-element"],["text","\\n          "],["open-element","div",[]],["static-attr","class","event-shop-xp-tooltip-block-description"],["flush-element"],["text","\\n            "],["open-element","h5",[]],["static-attr","class","event-shop-xp-tooltip-block-description-header"],["flush-element"],["text","\\n              "],["append",["unknown",["tra","event_shop_xp_tooltip_looping_description_header"]],false],["text","\\n            "],["close-element"],["text","\\n            "],["open-element","p",[]],["static-attr","class","event-shop-xp-tooltip-block-description-content"],["flush-element"],["text","\\n              "],["append",["helper",["sanitize"],[["get",["tra","event_shop_xp_tooltip_looping_description_content$html"]]],null],false],["text","\\n            "],["close-element"],["text","\\n          "],["close-element"],["text","\\n          "],["open-element","div",[]],["static-attr","class","event-shop-xp-vertical-divider"],["flush-element"],["close-element"],["text","\\n          "],["open-element","div",[]],["static-attr","class","event-shop-progression-tooltip-block-loop"],["flush-element"],["text","\\n            "],["open-element","div",[]],["static-attr","class","event-shop-xp-tooltip-repeat"],["flush-element"],["text","\\n              "],["open-element","svg",[]],["static-attr","class","event-shop-xp-tooltip-repeat-icon"],["static-attr","viewBox","0 0 10 7"],["flush-element"],["text","\\n                "],["open-element","path",[]],["static-attr","class","event-shop-xp-repeat-icon-path"],["static-attr","fill-rule","evenodd"],["static-attr","clip-rule","evenodd"],["static-attr","d","M6.38908 1.77185V0.399902L3.9833 2.31037L6.38956 4.22084V2.85168C6.81026 2.85942 7.21055 3.02847 7.50237 3.32164C7.79419 3.61481 7.95364 4.00809 7.94565 4.41496C7.93765 4.82183 7.76286 5.20897 7.45972 5.4912C7.15659 5.77343 6.74995 5.92765 6.32925 5.91991H3.33337C2.91248 5.91991 2.50883 5.75821 2.21121 5.47037C1.9136 5.18254 1.7464 4.79215 1.7464 4.3851C1.7464 3.97804 1.9136 3.58765 2.21121 3.29982C2.50883 3.01199 2.91248 2.85028 3.33337 2.85028V1.77045C2.61636 1.77045 1.92872 2.04593 1.42171 2.53627C0.914713 3.02661 0.629883 3.69165 0.629883 4.3851C0.629883 5.07854 0.914713 5.74359 1.42171 6.23393C1.92872 6.72427 2.61636 6.99974 3.33337 6.99974H6.32925C6.68409 7.00357 7.03623 6.93977 7.36557 6.81198C7.69491 6.68419 7.995 6.49492 8.24871 6.25496C8.50242 6.01501 8.70477 5.72907 8.84422 5.41349C8.98367 5.0979 9.05748 4.75884 9.06144 4.41566C9.0654 4.07249 8.99943 3.73192 8.8673 3.4134C8.73517 3.09488 8.53947 2.80465 8.29136 2.55928C8.04325 2.31391 7.7476 2.1182 7.42129 1.98334C7.09498 1.84847 6.7444 1.77708 6.38956 1.77325L6.38908 1.77185Z"],["static-attr","fill","#5b5a56"],["flush-element"],["close-element"],["text","\\n              "],["close-element"],["text","\\n              "],["open-element","span",[]],["static-attr","class","event-shop-xp-iteration"],["flush-element"],["text","\\n                "],["append",["unknown",["rewardTrackXP","iteration"]],false],["text","\\n              "],["close-element"],["text","\\n            "],["close-element"],["text","\\n            "],["open-element","p",[]],["flush-element"],["append",["unknown",["tra","event_shop_xp_tooltip_looping_loop_header"]],false],["close-element"],["text","\\n            "],["open-element","div",[]],["static-attr","class","event-shop-xp-horizontal-divider"],["flush-element"],["close-element"],["text","\\n            "],["open-element","p",[]],["flush-element"],["append",["unknown",["completedLoops"]],false],["text"," "],["append",["unknown",["tra","event_shop_xp_tooltip_looping_loop_footer"]],false],["close-element"],["text","\\n          "],["close-element"],["text","\\n        "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["block",["if"],[["get",["rewardTrackXP","isBonusPhase"]]],null,7,6]],"locals":[]},{"statements":[["text","        "],["open-element","div",[]],["static-attr","class","event-shop-progression-tooltip-block"],["flush-element"],["text","\\n          "],["open-element","h5",[]],["flush-element"],["append",["unknown",["tra","event_shop_xp_label_level_progress_locked"]],false],["close-element"],["text","\\n          "],["open-element","p",[]],["flush-element"],["append",["helper",["sanitize"],[["get",["tra","event_shop_xp_tooltip_progress_locked_description"]]],null],false],["close-element"],["text","\\n        "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","    "],["open-element","lol-uikit-content-block",[]],["static-attr","class","event-shop-xp-tooltip-content"],["static-attr","type","tooltip-system"],["flush-element"],["text","\\n"],["block",["if"],[["get",["isGracePeriod"]]],null,9,8],["text","    "],["close-element"],["text","\\n"]],"locals":[]}],"hasPartials":false}',
                meta: {}
            })
        }, (e, t, n) => {
            const a = n(1).Ember;
            e.exports = a.HTMLBars.template({
                id: "MRGT3NQF",
                block: '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-event-hub\\\\src\\\\app\\\\templates\\\\components\\\\hol-xp.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-event-hub\\\\src\\\\app\\\\styles\\\\components\\\\hol-xp.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-event-hub\\\\src\\\\app\\\\components\\\\hol-xp.js\\" "],["text","\\n"],["open-element","div",[]],["static-attr","class","hol-xp-text-wrapper"],["flush-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","hol-xp-level-progress"],["flush-element"],["text","\\n    "],["open-element","span",[]],["static-attr","class","hol-xp-level-progress-current"],["flush-element"],["append",["unknown",["rewardTrackProgress","currentLevelXP"]],false],["close-element"],["text","\\n     / \\n    "],["open-element","span",[]],["static-attr","class","hol-xp-level-progress-total"],["flush-element"],["text"," "],["append",["unknown",["rewardTrackProgress","totalLevelXP"]],false],["close-element"],["text","\\n  "],["close-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","hol-xp-label"],["flush-element"],["append",["unknown",["tra","event_hub_xp_label"]],false],["close-element"],["text","\\n"],["close-element"],["text","\\n"],["open-element","div",[]],["static-attr","class","hol-xp-radial"],["flush-element"],["text","\\n  "],["open-element","lol-uikit-radial-progress",[]],["static-attr","class","hol-xp-radial-component"],["static-attr","start-angle","270"],["static-attr","end-angle","-90"],["static-attr","type","custom"],["flush-element"],["text","\\n    "],["open-element","div",[]],["static-attr","slot","bottom"],["static-attr","class","bottom"],["flush-element"],["text","\\n        "],["open-element","div",[]],["static-attr","class","hol-xp-radial-component-outer-ring"],["flush-element"],["close-element"],["text","\\n    "],["close-element"],["text","\\n    "],["open-element","div",[]],["static-attr","slot","middle"],["static-attr","class","middle"],["dynamic-attr","percent",["unknown",["radialPercentage"]],null],["flush-element"],["close-element"],["text","\\n    "],["open-element","div",[]],["static-attr","slot","middle"],["static-attr","class","middle hol-xp-radial-component-remaining-xp"],["dynamic-attr","percent",["unknown",["remainingPercentage"]],null],["flush-element"],["close-element"],["text","\\n    "],["open-element","div",[]],["static-attr","slot","top"],["static-attr","class","top"],["flush-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","hol-xp-radial-component-label"],["flush-element"],["append",["unknown",["rewardTrackProgress","level"]],false],["close-element"],["text","\\n    "],["close-element"],["text","\\n  "],["close-element"],["text","\\n"],["close-element"],["text","\\n"]],"locals":[],"named":[],"yields":[],"blocks":[],"hasPartials":false}',
                meta: {}
            })
        }, (e, t, n) => {
            const a = n(1).Ember;
            e.exports = a.HTMLBars.template({
                id: "gxJDKo5f",
                block: '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-event-hub\\\\src\\\\app\\\\templates\\\\components\\\\hol-reward-details.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-event-hub\\\\src\\\\app\\\\styles\\\\components\\\\hol-reward-details.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-event-hub\\\\src\\\\app\\\\components\\\\hol-reward-details.js\\" "],["text","\\n"],["open-element","div",[]],["static-attr","class","hol-reward-details-level"],["flush-element"],["text","\\n  "],["append",["unknown",["level"]],false],["text","\\n"],["close-element"],["text","\\n"],["open-element","div",[]],["static-attr","class","hol-reward-details-title"],["flush-element"],["text","\\n  "],["append",["unknown",["title"]],false],["text","\\n"],["close-element"],["text","\\n"],["open-element","div",[]],["static-attr","class","hol-reward-details-description"],["flush-element"],["text","\\n  "],["append",["unknown",["description"]],false],["text","\\n"],["close-element"],["text","\\n"],["block",["if"],[["get",["showReplayButton"]]],null,0]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","  "],["open-element","lol-uikit-flat-button",[]],["static-attr","class","idle hol-reward-details-replay-button"],["flush-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","hol-reward-details-replay-button-content"],["flush-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","hol-reward-details-replay-button-icon"],["flush-element"],["text","\\n"],["text","        "],["open-element","svg",[]],["static-attr","xmlns","http://www.w3.org/2000/svg","http://www.w3.org/2000/xmlns/"],["static-attr","width","16"],["static-attr","height","16"],["static-attr","viewBox","0 0 16 16"],["static-attr","fill","none"],["flush-element"],["text","\\n          "],["open-element","path",[]],["static-attr","d","M4.7998 3.19995L12.7998 7.99995L4.7998 12.8L4.7998 3.19995Z"],["static-attr","fill","#C8AA6E"],["flush-element"],["close-element"],["text","\\n        "],["close-element"],["text","\\n      "],["close-element"],["text","\\n      "],["append",["unknown",["tra","hol_cutscene_button_label"]],false],["text","\\n    "],["close-element"],["text","\\n  "],["close-element"],["text","\\n"]],"locals":[]}],"hasPartials":false}',
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
                show(e) {
                    this.privateAPI.show(e)
                }
                hide() {
                    this.privateAPI.hide()
                }
            }
        }],
        t = {};

    function n(a) {
        var s = t[a];
        if (void 0 !== s) return s.exports;
        var l = t[a] = {
            exports: {}
        };
        return e[a](l, l.exports, n), l.exports
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
        const a = "rcp-fe-lol-event-hub",
            s = window.testsSandboxDoc || document.currentScript.ownerDocument;
        const l = window.getPluginAnnounceEventName(a);
        s.addEventListener(l, (function(e) {
            (0, e.registrationHandler)((e => t.default.init(e, {
                ComponentFactory: e => e.get("rcp-fe-common-libs").getComponentFactory(),
                Telemetry: e => e.get("rcp-fe-common-libs").getTelemetry(),
                dataBinding: e => e.get("rcp-fe-common-libs").getDataBinding(a),
                Ember: e => e.get("rcp-fe-ember-libs").getEmber(),
                emberL10n: e => e.get("rcp-fe-ember-libs").getEmberL10n(),
                logger: e => e.get("rcp-fe-common-libs").logging.create(a),
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
                const n = e.get("rcp-fe-lol-l10n").tra().overlay("/fe/lol-l10n/trans.json").overlay("/fe/lol-loot/trans.json").overlay("/fe/lol-event-hub/trans.json"),
                    a = t.default.emberL10n(t.default.Ember, n),
                    s = t.default.Ember.Object.create({
                        isVisible: !1
                    });
                return t.default.add({
                    emberApplicationFactory: e.get("rcp-fe-ember-libs").getEmberApplicationFactory(),
                    externalModel: s,
                    tra: n,
                    traService: a
                })
            })).then((() => (0, n(2).default)()))))
        }), {
            once: !0
        })
    })()
})();