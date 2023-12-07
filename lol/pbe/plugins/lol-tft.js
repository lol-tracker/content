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
                            l = n._getValue(s, a);
                        l && l.then ? (l.then((function(e) {
                            e || console.warn("The promise for the key " + s + " resolved with a falsy value: ", e), n._addValue(s, e)
                        })), t.push(l)) : n._addValue(s, l)
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
        }, (e, t) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.soundsRoot = t.XP_GAIN_STR = t.XP_GAIN_SFX_PATH = t.XP_BAR_IMAGES_PATH = t.TFT_TROVES_ROUTE = t.TFT_TEST_ROUTE = t.TFT_TELEMETRY_EVENT = t.TFT_TEAM_PLANNER_BUTTON_HOVER_SFX_PATH = t.TFT_TEAM_PLANNER_BUTTON_DOWN_SFX_PATH = t.TFT_TACTICIAN_HOVER_SFX_PATH = t.TFT_TACTICIAN_HOVER_LOOP_SFX_PATH = t.TFT_STORE_PROMO_HOVER_SFX_PATH = t.TFT_STORE_PROMO_CLICK_SFX_PATH = t.TFT_RANKED_QUEUE_TYPE = t.TFT_NORMAL_QUEUE_ID = t.TFT_NEWS_ROUTE = t.TFT_MATCH_HISTORY_ROUTE = t.TFT_MAP_ID = t.TFT_HOME_ROUTE = t.TFT_GAME_QUEUES_CATEGORY = t.TFT_GAME_MODE = t.TFT_EVENT_ROUTE = t.TFT_BUTTON_HOVER_SFX_PATH = t.TFT_BUTTON_CLICK_SFX_PATH = t.TFT_BATTLE_PASS_ROUTE = t.TELEMETRY_TFT_SUB_NAV_CLICKED = t.TELEMETRY_TFT_STORE_PROMO_CLICKED = t.TELEMETRY_TFT_PASS_UPGRADE_CLICKED = t.TELEMETRY_TFT_EVENT_PROMO_CLICKED = t.SOUND_UX_CHANNEL = t.SECOND_IN_MS = t.REWARD_CELEBRATION_V2_NAME = t.REWARD_CELEBRATION_NAME = t.QUICK_PLAY_HOVER_SFX_PATH = t.QUICK_PLAY_CLICK_SFX_PATH = t.PLUGIN_NAME = t.PCS_TELEMETRY_TABLE = t.NORMAL_STR = t.MINUTE_IN_MS = t.LVL_UP_STR = t.LVL_UP_SFX_PATH = t.ITEM_PURCHASE_NAME = t.HOUR_IN_MS = t.DEFAULT_TELEMETRY_TABLE = t.DEFAULT_HUB_BACKGROUND_URL = t.DAY_IN_MS = t.BP_V2_MILESTONE_UPCOMING = t.BP_V2_MILESTONE_REWARDABLE = t.BP_V2_MILESTONE_COMPLETE = t.BP_V2_MILESTONE_ACTIVE = t.BONUS_STR = t.BATTLEPASS_LOTTIE_PATH = t.AVAILABLE_XP_SEGMENTS = t.AUDIO_CHANNELS = t.ANIMATION_SFX_START_DELAY = void 0;
            const n = "rcp-fe-lol-tft";
            t.PLUGIN_NAME = n;
            const s = n + "-reward-celebration";
            t.REWARD_CELEBRATION_NAME = s;
            const a = n + "-item-purchase";
            t.ITEM_PURCHASE_NAME = a;
            const l = n + "-reward-celebration-v2";
            t.REWARD_CELEBRATION_V2_NAME = l;
            t.TFT_HOME_ROUTE = "home";
            t.TFT_BATTLE_PASS_ROUTE = "battle-pass";
            t.TFT_MATCH_HISTORY_ROUTE = "match-history";
            t.TFT_NEWS_ROUTE = "news";
            t.TFT_TEST_ROUTE = "test-page";
            t.TFT_EVENT_ROUTE = "event-page";
            t.TFT_TROVES_ROUTE = "troves";
            t.TFT_RANKED_QUEUE_TYPE = "RANKED_TFT";
            t.TFT_GAME_QUEUES_CATEGORY = "PvP";
            t.TFT_GAME_MODE = "TFT";
            t.TFT_MAP_ID = 22;
            t.TFT_NORMAL_QUEUE_ID = 1090;
            t.SECOND_IN_MS = 1e3;
            t.MINUTE_IN_MS = 6e4;
            const o = 36e5;
            t.HOUR_IN_MS = o;
            t.DAY_IN_MS = 864e5;
            t.BP_V2_MILESTONE_ACTIVE = "ACTIVE";
            t.BP_V2_MILESTONE_UPCOMING = "UPCOMING";
            t.BP_V2_MILESTONE_REWARDABLE = "REWARDABLE";
            t.BP_V2_MILESTONE_COMPLETE = "COMPLETE";
            t.PCS_TELEMETRY_TABLE = "publishing_content";
            t.DEFAULT_HUB_BACKGROUND_URL = "fe/lol-tft/images/tft-hub-no-pass-background.jpg";
            t.BATTLEPASS_LOTTIE_PATH = "fe/lol-tft/lottie/Battlepass-XPBar/";
            t.XP_BAR_IMAGES_PATH = "fe/lol-tft/lottie/Battlepass-XPBar/images/";
            t.BONUS_STR = "BONUS";
            t.NORMAL_STR = "NORMAL";
            t.LVL_UP_STR = "GainLVL";
            t.XP_GAIN_STR = "GainXP";
            t.AVAILABLE_XP_SEGMENTS = [3, 5, 10, 20];
            t.SOUND_UX_CHANNEL = "sfx-ui";
            t.LVL_UP_SFX_PATH = "fe/lol-tft/sfx/sfx-bp-tft-xp-bar-level-up.ogg";
            t.XP_GAIN_SFX_PATH = "fe/lol-tft/sfx/sfx-bp-tft-xp-bar-xpgain.ogg";
            t.ANIMATION_SFX_START_DELAY = 1;
            const i = "/fe/lol-static-assets/sounds";
            t.soundsRoot = i;
            const r = `${i}/sfx-nav-button-play-hover.ogg`;
            t.QUICK_PLAY_HOVER_SFX_PATH = r;
            const c = `${i}/tft-homescreen/sfx-tft-homescreen-button-play-click.ogg.ogg`;
            t.QUICK_PLAY_CLICK_SFX_PATH = c;
            const m = `${i}/sfx-uikit-button-circlegold-hover.ogg`;
            t.TFT_BUTTON_HOVER_SFX_PATH = m;
            const u = `${i}/sfx-uikit-button-circlegold-click.ogg`;
            t.TFT_BUTTON_CLICK_SFX_PATH = u;
            const d = `${i}/sfx-uikit-button-generic-hover.ogg`;
            t.TFT_STORE_PROMO_HOVER_SFX_PATH = d;
            const p = `${i}/sfx-uikit-button-generic-click.ogg`;
            t.TFT_STORE_PROMO_CLICK_SFX_PATH = p;
            const h = `${i}/tft-homescreen/sfx-tft-homescreen-offer-hover-loop.ogg`;
            t.TFT_TACTICIAN_HOVER_LOOP_SFX_PATH = h;
            const f = `${i}/tft-homescreen/sfx-tft-homescreen-offer-hover.ogg`;
            t.TFT_TACTICIAN_HOVER_SFX_PATH = f;
            const g = `${i}/sfx-uikit-grid-click.ogg`;
            t.TFT_TEAM_PLANNER_BUTTON_DOWN_SFX_PATH = g;
            const _ = `${i}/sfx-uikit-button-circlegold-hover.ogg`;
            t.TFT_TEAM_PLANNER_BUTTON_HOVER_SFX_PATH = _;
            t.AUDIO_CHANNELS = {
                SFX_SUB_CHANNEL_UI_NAME: "sfx-ui",
                SFX_SUB_CHANNEL_AMBIENCE_INTERRUPTABLE_NAME: "sfx-ambience-interruptable"
            };
            t.DEFAULT_TELEMETRY_TABLE = "rcp-fe-lol-tft";
            t.TELEMETRY_TFT_EVENT_PROMO_CLICKED = "tft-event-promo-clicked";
            t.TELEMETRY_TFT_PASS_UPGRADE_CLICKED = "tft-hub-buy-premium-button-clicked";
            t.TELEMETRY_TFT_STORE_PROMO_CLICKED = "tft-store-promo-clicked";
            t.TELEMETRY_TFT_SUB_NAV_CLICKED = "tft-sub-nav-clicked";
            const b = {
                KEY: {
                    NAME: "eventName",
                    TYPE: "eventType",
                    FROM: "eventFrom",
                    TIME_SPENT: "timeSpent"
                },
                TYPE: {
                    OPEN: "open",
                    CLOSE: "close",
                    CLICK: "click",
                    TIME_SPENT: "time-spent"
                },
                FROM: {
                    EVENT_HUB: "event-hub",
                    EVENT_PASS: "event-pass"
                },
                format: (e, t, n, s = {}) => ({
                    [b.KEY.NAME]: "tft-" + e + "-" + t + "-" + n,
                    ...s
                }),
                formatOpen: (e, t = {}) => b.format(e, b.TYPE.OPEN, e, t),
                formatClose: (e, t = {}) => b.format(e, b.TYPE.CLOSE, e, t),
                formatClick: (e, t, n = {}) => b.format(e, b.TYPE.CLICK, t, n),
                formatTimeSpent: (e, t, n = {}) => b.format(e, b.TYPE.TIME_SPENT, e, {
                    [b.KEY.TIME_SPENT]: t,
                    ...n
                })
            };
            t.TFT_TELEMETRY_EVENT = b
        }, (e, t, n) => {
            "use strict";
            n.r(t)
        }, (e, t, n) => {
            "use strict";
            n.r(t)
        }, (e, t, n) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = void 0;
            var s = n(1),
                a = n(2);
            const l = ["/fe/lol-tft/videos/claimable-sparkles-free.webm", "/fe/lol-tft/videos/claimable-sparkles-premium.webm", "/fe/lol-tft/videos/claimable-sparkles-keystone.webm", "/fe/lol-tft/videos/background-sparkles.webm"];
            t.default = class {
                constructor(e) {
                    this._screenRoot = e, this._applicationComponentFactory = null, this._appRootElement = null, this._indexModel = null, this._factoryRegistered = !1, this._gameflowPhase = null, this._isInTFTGame = !1, this._isBattlePassV2Claimable = !1, this._ShownTftEventThisSession = !1
                }
                show(e) {
                    return this._screenRoot.bump().then(function() {
                        return this._getLandingPage().then(function(t) {
                            return this._getEmberComponentFactoryInstance(t).then((n => (this._appRootElement = n.domNode, this._screenRoot.getElement().appendChild(n.domNode), this._screenRoot.on("hide", (() => {
                                this._applicationComponentFactory && this._applicationComponentFactory.emberAppInstancePromise.then((e => {
                                    const t = e.__container__.lookup("service:tft");
                                    t ? t.onHide() : s.logger.warning("Failed to fetch TFT service from TFT Ember app.")
                                }), (e => s.logger.warning("Failed to fetch Ember app instance.", e))), this._indexModel.set("isVisible", !1), this._screenRoot.release(), this._screenRoot.getElement().contains(this._appRootElement) && this._screenRoot.getElement().removeChild(this._appRootElement)
                            })), e && e.page ? this._indexModel.set("page", e.page) : this._indexModel.set("page", t), this._indexModel.set("isVisible", !0), this._applicationComponentFactory.emberAppInstancePromise.then((e => {
                                const t = e.__container__.lookup("service:tft");
                                return t ? t.onShow() : s.logger.warning("Failed to fetch TFT service from TFT Ember app."), this._applicationComponentFactory
                            }), (e => s.logger.warning("Failed to fetch Ember app instance.", e))))))
                        }.bind(this))
                    }.bind(this))
                }
                setupTftApp() {
                    (0, s.dataBinding)("/lol-gameflow", s.socket).observe("/v1/session", (e => {
                        this._handleGameflowSession(e)
                    })), this._setupVideoCache()
                }
                showTroves() {
                    this.show().then((e => {
                        e.renderPromise.then((e => {
                            e.__container__.lookup("router:main").transitionTo(a.TFT_TROVES_ROUTE)
                        }))
                    }))
                }
                showEventPass() {
                    return this._getEmberComponentFactoryInstance(a.TFT_HOME_ROUTE).then((e => e.emberAppInstancePromise)).then((e => {
                        const t = e.__container__.lookup("controller:event-page");
                        t ? t.showEventPass() : s.logger.warning("Failed to fetch Event Page Controller from TFT Ember app.")
                    }))
                }
                updateEventHubUrl(e) {
                    return this._getEmberComponentFactoryInstance(a.TFT_HOME_ROUTE).then((e => e.emberAppInstancePromise)).then((t => {
                        const n = t.__container__.lookup("service:tft");
                        n ? n.updateEventHubUrl(e) : s.logger.warning("Failed to fetch TFT service from TFT Ember app.")
                    }), (e => s.logger.warning("Failed to fetch Ember app instance.", e)))
                }
                _registerEmberApplicationFactories(e) {
                    if (!this._factoryRegistered) {
                        const t = s.Ember.Object.create({
                            isVisible: !1,
                            page: e
                        });
                        this._indexModel = t,
                            function(e) {
                                const t = {
                                        tra: s.traService,
                                        ComponentFactory: s.componentFactory,
                                        Router: n(6).default,
                                        IndexRoute: s.Ember.Route.extend({
                                            beforeModel() {
                                                e.page.route && e.page.options ? this.replaceWith(e.page.route, e.page.options) : this.replaceWith(e.page)
                                            },
                                            model: () => e
                                        }),
                                        HomeRoute: n(7).default,
                                        BattlePassRoute: n(8).default,
                                        MatchHistoryRoute: n(9).default,
                                        NewsPageRoute: n(12).default,
                                        TestPageRoute: n(13).default,
                                        EventPageRoute: n(14).default,
                                        TrovesRoute: n(15).default,
                                        RemainingTimeTextComponent: s.SharedEmberComponents.RemainingTimeTextComponent,
                                        CountdownWidgetComponent: s.SharedEmberComponents.CountdownWidgetComponent,
                                        TftTimeRemainingWidgetComponent: n(16).default,
                                        TftTooltipComponent: n(19).default,
                                        TftHubComponent: n(21).default,
                                        BattlepassTimelineComponent: n(24).default,
                                        BattlepassMilestoneComponent: n(27).default,
                                        BattlepassLevelBarComponent: n(30).default,
                                        BattlepassSeriesInfoComponent: n(33).default,
                                        BattlepassUpgradeButtonComponent: n(36).default,
                                        BattlepassSelectedRewardDetailsComponent: n(39).default,
                                        CallToActionPipComponent: s.SharedEmberComponents.CallToActionPipComponent,
                                        ManagedIframeComponent: s.SharedEmberComponents.ManagedIframeComponent,
                                        TftSubNavComponent: n(42).default,
                                        TftSubNavItemComponent: n(45).default,
                                        TftHomeComponent: n(48).default,
                                        TftButtonComponent: n(52).default,
                                        TftNewsComponent: n(55).default,
                                        TftStorePromoComponent: n(58).default,
                                        TftPrimePromoComponent: n(62).default,
                                        TftTacticianPromoComponent: n(65).default,
                                        TftQuickPlayComponent: n(68).default,
                                        TftEventPromoComponent: n(71).default,
                                        TftHeaderButtonsComponent: n(74).default,
                                        TftTestPageComponent: n(78).default,
                                        TftEventPageComponent: n(81).default,
                                        TftEventHubComponent: n(84).default,
                                        TftEventMissionChainComponent: n(87).default,
                                        TftEventPassThumbnailComponent: n(90).default,
                                        TftEventTrovesThumbnailComponent: n(93).default,
                                        TftRadialProgressBarComponent: n(96).default,
                                        TftMatchSummaryRootComponent: n(99),
                                        TftMatchSummaryComponent: n(107),
                                        MatchHistoryTooltipComponent: n(110).default,
                                        RenderTelemetrySenderComponent: s.SharedEmberComponents.RenderTelemetrySenderComponent,
                                        MythicButtonComponent: n(112).default,
                                        MythicTokenDialogComponent: n(114).default,
                                        PullButtonComponent: n(115).default,
                                        PullButtonsContainerComponent: n(116).default,
                                        PullErrorDialogComponent: n(117).default,
                                        TrovesBannersComponent: n(118).default,
                                        TrovesCeremonyComponent: n(119).default,
                                        TrovesCeremonyHighlightRewardsComponent: n(120).default,
                                        TrovesCeremonyStandardRewardsComponent: n(121).default,
                                        ChasedContentComponent: n(122).default,
                                        TftTrovesComponent: n(123).default,
                                        RewardCardComponent: n(127).default,
                                        PortalVideoComponent: n(128).default,
                                        TrovesSpriteAnimationComponent: n(129).default,
                                        ApplicationController: n(130).default,
                                        BattlePassController: n(131).default,
                                        HomeController: n(132).default,
                                        MatchHistoryController: n(133).default,
                                        NewsController: n(134).default,
                                        TrovesController: n(135).default,
                                        EventPageController: n(136).default,
                                        EqHelper: s.Ember.Helper.helper((e => e[0] === e[1])),
                                        TftService: n(137).default,
                                        QueueService: n(140).default,
                                        PublishingService: n(141).default,
                                        StoreService: n(142).default,
                                        TftTrovesService: n(143).default,
                                        SummonerService: n(144).default,
                                        TEMPLATES: {
                                            application: n(145),
                                            index: n(146),
                                            loading: n(147),
                                            [a.TFT_HOME_ROUTE]: n(148),
                                            [a.TFT_NEWS_ROUTE]: n(149),
                                            [a.TFT_BATTLE_PASS_ROUTE]: n(150),
                                            [a.TFT_MATCH_HISTORY_ROUTE]: n(151),
                                            [a.TFT_TEST_ROUTE]: n(152),
                                            [a.TFT_EVENT_ROUTE]: n(153),
                                            "components/mythic-button": n(154),
                                            "components/mythic-token-dialog": n(155),
                                            "components/pull-button": n(156),
                                            "components/pull-buttons-container": n(157),
                                            "components/pull-error-dialog": n(158),
                                            "components/item-purchase": n(159),
                                            "components/troves-banners": n(160),
                                            "components/troves-ceremony": n(161),
                                            "components/troves-ceremony-highlight-rewards": n(162),
                                            "components/troves-ceremony-standard-rewards": n(163),
                                            "components/chased-content": n(164),
                                            "components/tft-troves": n(165),
                                            "components/reward-card": n(166),
                                            "components/portal-video": n(167),
                                            "components/troves-sprite-animation": n(168),
                                            troves: n(169)
                                        }
                                    },
                                    l = {
                                        tra: s.traService,
                                        ComponentFactory: s.componentFactory,
                                        ItemPurchaseComponent: n(170).default
                                    };
                                s.emberApplicationFactory.setFactoryDefinition(a.ITEM_PURCHASE_NAME, l), s.emberApplicationFactory.setFactoryDefinition(a.PLUGIN_NAME, t, {
                                    EMBER_CLI_COMPAT: !0
                                });
                                const o = {
                                    tra: s.traService,
                                    ComponentFactory: s.componentFactory,
                                    RewardCelebrationComponent: n(171).default
                                };
                                s.emberApplicationFactory.setFactoryDefinition(a.REWARD_CELEBRATION_NAME, o);
                                const i = {
                                    tra: s.traService,
                                    ComponentFactory: s.componentFactory,
                                    RewardCelebrationComponent: n(174).default
                                };
                                s.emberApplicationFactory.setFactoryDefinition(a.REWARD_CELEBRATION_V2_NAME, i)
                            }(t), this._factoryRegistered = !0
                    }
                }
                _getEmberComponentFactoryInstance(e) {
                    if (this._applicationComponentFactory) {
                        return this._applicationComponentFactory.emberAppInstancePromise.then((e => !(!e.isDestroyed && !e.isDestroying))).then((t => (t && (this._registerEmberApplicationFactories(e), this._applicationComponentFactory = s.componentFactory.create(a.PLUGIN_NAME)), this._applicationComponentFactory)))
                    }
                    return this._registerEmberApplicationFactories(e), this._applicationComponentFactory = s.componentFactory.create(a.PLUGIN_NAME), Promise.resolve(this._applicationComponentFactory)
                }
                _tryGetHomePage() {
                    return (0, s.dataBinding)("/lol-tft").get("/v1/tft/homeHub").then((e => e.enabled ? a.TFT_HOME_ROUTE : a.TFT_BATTLE_PASS_ROUTE)).catch((e => (s.logger.warning("Failed to fetch TFT Home config", e), a.TFT_BATTLE_PASS_ROUTE)))
                }
                _getLandingPage() {
                    return (0, s.dataBinding)("/lol-tft").get("/v1/tft/events").then((e => {
                        if (e && e.subNavTabs && e.subNavTabs.length && !this._ShownTftEventThisSession) {
                            e.subNavTabs.length > 1 && s.logger.error("Currently only displaying one event in the TFT Hub is supported - received " + e.subNavTabs.length + " events.");
                            const t = e.subNavTabs[0];
                            if (t.enabled && t.defaultLandingPage) return this._ShownTftEventThisSession = !0, {
                                route: a.TFT_EVENT_ROUTE,
                                options: {
                                    queryParams: {
                                        url: t.url
                                    }
                                }
                            }
                        }
                        return this._tryGetHomePage()
                    })).catch((e => (s.logger.warning("Failed to fetch TFT Event config", e), this._tryGetHomePage())))
                }
                _setupVideoCache() {
                    this.TFTVideoCache = s.VideoCache.createCache("rcp-fe-lol-tft"), s.UXSettings.addObserver((e => {
                        this.TFTVideoCache.release(), e && e.largeAreaAnimationsEnabled && l.forEach((e => {
                            this.TFTVideoCache.cache(e)
                        }))
                    }))
                }
                _handleGameflowSession(e) {
                    if (!e) return;
                    const t = this._gameflowPhase;
                    this._gameflowPhase = e.phase;
                    const n = ["FailedToLaunch", "WaitingForStats", "EndOfGame", "TerminatedInError"],
                        l = e.gameData && e.gameData.queue && e.gameData.queue.gameMode === a.TFT_GAME_MODE;
                    "None" === this._gameflowPhase ? (this._isInTFTGame && n.indexOf(t) > -1 && s.Router.navigateTo("rcp-fe-lol-tft"), this._isInTFTGame = !1) : ["GameStart", "InProgress", "Reconnect"].indexOf(this._gameflowPhase) > -1 ? this._isInTFTGame = l : n.indexOf(this._gameflowPhase) > -1 && l && l && (0, s.dataBinding)("/lol-settings", s.socket).patch("/v2/account/LCUPreferences/lol-tft", {
                        data: {
                            lastTftGameQueueId: e.gameData.queue.id
                        },
                        schemaVersion: 1
                    }), this._isInTFTGame ? (this._tftSettingsObserverEnabled = !0, (0, s.dataBinding)("/lol-settings", s.socket).observe("/v2/account/LCUPreferences/lol-tft", this, (e => {
                        e && (this._tftSettingsObserverEnabled = !1, (0, s.dataBinding)("/lol-settings", s.socket).unobserve("/v2/account/LCUPreferences/lol-tft", this))
                    }))) : this._tftSettingsObserverEnabled && (this._tftSettingsObserverEnabled = !1, (0, s.dataBinding)("/lol-settings", s.socket).unobserve("/v2/account/LCUPreferences/lol-tft", this))
                }
            }
        }, (e, t, n) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = void 0;
            var s = n(1),
                a = n(2);
            const l = s.Ember.Router.extend({
                location: "none"
            });
            l.map((function() {
                this.route(a.TFT_HOME_ROUTE), this.route(a.TFT_BATTLE_PASS_ROUTE), this.route(a.TFT_TROVES_ROUTE), this.route(a.TFT_MATCH_HISTORY_ROUTE), this.route(a.TFT_NEWS_ROUTE), this.route(a.TFT_TEST_ROUTE), this.route(a.TFT_EVENT_ROUTE)
            }));
            var o = l;
            t.default = o
        }, (e, t, n) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = void 0;
            var s = n(1),
                a = s.Ember.Route.extend({
                    store: s.Ember.inject.service(),
                    tft: s.Ember.inject.service(),
                    model() {
                        const e = this.get("store"),
                            t = this.get("tft");
                        return s.Ember.RSVP.hash({
                            storeCatalog: e.getStoreCatalog(),
                            regionLocale: e.getRegionLocale(),
                            storePromoAssets: t.getStorePromoAssets()
                        })
                    }
                });
            t.default = a
        }, (e, t, n) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = void 0;
            var s = n(1),
                a = n(2),
                l = s.Ember.Route.extend({
                    tftService: s.Ember.inject.service("tft"),
                    setupController(e, t) {
                        this._super(e, t), this.get("tftService").dismissNotification(a.TFT_BATTLE_PASS_ROUTE)
                    }
                });
            t.default = l
        }, (e, t, n) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = void 0;
            var s = n(1),
                a = n(10),
                l = s.Ember.Route.extend({
                    model: () => s.Ember.RSVP.hash({
                        champions: a.champions,
                        championsByAlias: a.championsByAlias,
                        items: a.items,
                        maps: a.maps,
                        queues: a.queues,
                        spells: a.spells,
                        tftItems: a.tftItems,
                        tftItemsByName: a.tftItemsByName,
                        tftChampionsByAlias: a.tftChampionsByAlias,
                        tftTraitsById: a.tftTraitsById,
                        tftGameVariationsByAlias: a.tftGameVariationsByAlias,
                        tftDefaultSet: a.tftDefaultSet,
                        tftSets: a.tftSets
                    })
                });
            t.default = l
        }, (e, t, n) => {
            "use strict";
            var s = n(1),
                a = n(11);
            const l = s.Ember.Object.extend(a.DataBindingMixin, a.FixDataBindingMixin, {
                    champions() {
                        return this.retrieveData("api.gameData", "/assets/v1/champion-summary.json").then((e => this._indexEntities(e)))
                    },
                    championsByAlias() {
                        return this.retrieveData("api.gameData", "/assets/v1/champion-summary.json").then((e => e.reduce(((e, t) => e.set(t.alias, t)), s.Ember.Map.create())))
                    },
                    tftChampionsByAlias() {
                        return this.retrieveData("api.gameData", "/assets/v1/tftchampions.json").then((e => e.reduce(((e, t) => t.name ? e.set(t.name.toLowerCase(), t) : e.set(t.character_id.toLowerCase(), t)), s.Ember.Map.create())))
                    },
                    tftTraitsById() {
                        return this.retrieveData("api.gameData", "/assets/v1/tfttraits.json").then((e => e.reduce(((e, t) => e.set(t.trait_id.toLowerCase(), t)), s.Ember.Map.create())))
                    },
                    tftGameVariationsByAlias() {
                        return this.retrieveData("api.gameData", "/assets/v1/tftgamevariations.json").then((e => e.reduce(((e, t) => e.set(t.game_variation_decorated_name.toLowerCase(), t)), s.Ember.Map.create())))
                    },
                    tftSets() {
                        return this.retrieveData("api.gameData", "/assets/v1/tftsets.json").then((e => e.LCTFTModeData.mActiveSets))
                    },
                    tftDefaultSet() {
                        return this.retrieveData("api.gameData", "/assets/v1/tftsets.json").then((e => e.LCTFTModeData.mDefaultSet))
                    },
                    items() {
                        return this.retrieveData("api.gameData", "/assets/v1/items.json").then((e => this._indexEntities(e)))
                    },
                    runes() {
                        return this.retrieveData("api.gameData", "/assets/v1/perks.json").then((e => this._indexEntities(e)), (() => s.Ember.Map.create()))
                    },
                    runesStyles() {
                        return this.retrieveData("api.gameData", "/assets/v1/perkstyles.json").then((e => e.styles ? this._indexEntities(e.styles) : this._indexEntities(e)), (() => s.Ember.Map.create()))
                    },
                    maps() {
                        return this.retrieveData("api.maps", "/v2/maps").then((e => s.Ember.A(e)))
                    },
                    queues() {
                        return this.retrieveData("api.queues", "/v1/queues").then((e => this._indexEntities(e)))
                    },
                    spells() {
                        return this.retrieveData("api.gameData", "/assets/v1/summoner-spells.json").then((e => this._indexEntities(e)))
                    },
                    augments() {
                        return this.retrieveData("api.gameData", "/assets/v1/cherry-augments.json").then((e => this._indexEntities(e)))
                    },
                    tftItems() {
                        return this.retrieveData("api.gameData", "/assets/v1/tftitems.json").then((e => this._indexEntities(e)))
                    },
                    tftItemsByName() {
                        return this.retrieveData("api.gameData", "/assets/v1/tftitems.json").then((e => this._indexEntitiesByName(e)))
                    },
                    _indexEntitiesByName: e => s.Ember.isArray(e) ? e.reduce(((e, t) => e.set(t.nameId, t)), s.Ember.Map.create()) : s.Ember.Map.create(),
                    _indexEntities: e => s.Ember.isArray(e) ? e.reduce(((e, t) => e.set(t.id, t)), s.Ember.Map.create()) : s.Ember.Map.create()
                }),
                o = l.create();
            e.exports = {
                MapsAndGameData: l,
                augments: o.augments(),
                champions: o.champions(),
                items: o.items(),
                maps: o.maps(),
                queues: o.queues(),
                runes: o.runes(),
                runesStyles: o.runesStyles(),
                spells: o.spells(),
                tftItems: o.tftItems(),
                tftItemsByName: o.tftItemsByName(),
                championsByAlias: o.championsByAlias(),
                tftChampionsByAlias: o.tftChampionsByAlias(),
                tftTraitsById: o.tftTraitsById(),
                tftGameVariationsByAlias: o.tftGameVariationsByAlias(),
                tftSets: o.tftSets(),
                tftDefaultSet: o.tftDefaultSet(),
                CUSTOM_GAME_TYPE: "CUSTOM_GAME",
                DEFAULT_MAP_ID: 11
            }
        }, (e, t, n) => {
            "use strict";
            var s = n(1);
            const a = (0, s.EmberDataBinding)({
                    Ember: s.Ember,
                    websocket: (0, s.getProvider)().getSocket(),
                    logPrefix: "rcp-fe-lol-match-history:mixins:data-binding",
                    basePaths: {
                        collections: "/lol-collections",
                        gameData: "/lol-game-data",
                        login: "/lol-login",
                        maps: "/lol-maps",
                        matchHistory: "/lol-match-history",
                        platformConfig: "/lol-platform-config",
                        summoner: "/lol-summoner",
                        chat: "/lol-chat",
                        settings: "/lol-settings",
                        queues: "/lol-game-queues",
                        cosmetics: "/lol-cosmetics"
                    },
                    boundProperties: {
                        matchHistoryWebURL: {
                            api: "matchHistory",
                            path: "/v1/web-url"
                        },
                        platformConfig: {
                            api: "platformConfig",
                            path: "/v1/namespaces"
                        },
                        session: {
                            api: "login",
                            path: "/v1/session"
                        },
                        myMasteries: {
                            api: "collections",
                            path: "/v1/inventories/{{session.puuid}}/champion-mastery"
                        },
                        mySummoner: {
                            api: "summoner",
                            path: "/v1/summoners/{{session.summonerId}}"
                        },
                        targetMasteries: {
                            api: "collections",
                            path: "/v1/inventories/{{puuid}}/champion-mastery"
                        },
                        targetSummoner: {
                            api: "summoner",
                            path: "/v1/summoners/{{summonerId}}"
                        },
                        blockedPlayers: {
                            api: "chat",
                            path: "/v1/blocked-players"
                        },
                        friends: {
                            api: "chat",
                            path: "/v1/friends"
                        },
                        lowSpecModeSettings: {
                            api: "settings",
                            path: "/v2/local/lol-user-experience"
                        },
                        companions: {
                            api: "cosmetics",
                            path: "/v1/inventories/tft/companions"
                        }
                    }
                }),
                l = s.Ember.Mixin.create({
                    retrieveData(e, t, n) {
                        return this.get(e).get(t, n).then((e => e ? Promise.resolve(e) : Promise.reject(void 0)))
                    }
                });
            e.exports = {
                FixDataBindingMixin: l,
                DataBindingMixin: a
            }
        }, (e, t, n) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = void 0;
            var s = n(1).Ember.Route;
            t.default = s
        }, (e, t, n) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = void 0;
            var s = n(1).Ember.Route;
            t.default = s
        }, (e, t, n) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = void 0;
            var s = n(1),
                a = s.Ember.Route.extend({
                    tftService: s.Ember.inject.service("tft"),
                    setupController(e, t) {
                        this._super(e, t), s.Ember.set(e, "displayEventPass", !1)
                    },
                    afterModel() {
                        this.get("tftService").setMissionOverrideSeries("TFT_Event_Series")
                    },
                    actions: {
                        willTransition: function(e) {
                            this.get("tftService").setMissionOverrideSeries("")
                        }
                    }
                });
            t.default = a
        }, (e, t, n) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = void 0;
            var s = n(1).Ember.Route.extend({
                resetController(e, t) {
                    t && e.set("displayedBannerId", "")
                }
            });
            t.default = s
        }, (e, t, n) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = void 0;
            var s = n(1),
                a = n(2),
                l = s.Ember.Component.extend({
                    classNames: [`${a.PLUGIN_NAME}-time-remaining-widget`],
                    layout: n(17),
                    style: n(18),
                    tftService: s.Ember.inject.service("tft"),
                    eventsData: s.Ember.computed.alias("tftService.eventsData"),
                    promoButtonsData: s.Ember.computed.alias("tftService.promoButtonsData"),
                    eventName: s.Ember.computed("eventsData", (function() {
                        const e = this.get("eventsData");
                        let t = "INVALID";
                        return e && Array.isArray(e) && (e.length > 1 ? s.logger.error("Currently only displaying one event timer in the TFT Hub is supported - received " + e.length + " events.") : 1 === e.length && (t = s.tra.get(e[0].titleTranslationKey))), t
                    })),
                    startDate: s.Ember.computed("eventsData", (function() {
                        const e = this.get("eventsData");
                        let t = "INVALID";
                        return e && Array.isArray(e) && (e.length > 1 ? s.logger.error("Currently only displaying one event timer in the TFT Hub is supported - received " + e.length + " events.") : 1 === e.length && (t = e[0].startDate)), t
                    })),
                    endDate: s.Ember.computed("eventsData", (function() {
                        const e = this.get("eventsData");
                        let t = "INVALID";
                        return e && Array.isArray(e) && (e.length > 1 ? s.logger.error("Currently only displaying one event timer in the TFT Hub is supported - received " + e.length + " events.") : 1 === e.length && (t = e[0].endDate)), t
                    })),
                    eventEnabled: s.Ember.computed("eventsData", (function() {
                        const e = this.get("eventsData");
                        let t = !1;
                        return e && Array.isArray(e) && (e.length > 1 ? s.logger.error("Currently only displaying one event timer in the TFT Hub is supported - received " + e.length + " events.") : 1 === e.length && (t = e[0].enabled)), t
                    })),
                    preEventEnabled: s.Ember.computed("eventEnabled", (function() {
                        return !this.get("eventEnabled")
                    })),
                    showWhileEventActive: s.Ember.computed("promoButtonsData", (function() {
                        const e = this.get("promoButtonsData");
                        let t = !0;
                        return e && Array.isArray(e) && (e.length > 1 ? s.logger.error("Currently only displaying one event timer in the TFT Hub is supported - received " + e.length + " event promo.") : 1 === e.length && (t = e[0].showTimerWhileEventActive)), t
                    }))
                });
            t.default = l
        }, (e, t, n) => {
            const s = n(1).Ember;
            e.exports = s.HTMLBars.template({
                id: "YDlwgDlx",
                block: '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-tft\\\\src\\\\app\\\\components\\\\tft-time-remaining-widget\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-tft\\\\src\\\\app\\\\components\\\\tft-time-remaining-widget\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-tft\\\\src\\\\app\\\\components\\\\tft-time-remaining-widget\\\\index.js\\" "],["text","\\n"],["block",["if"],[["get",["showWhileEventActive"]]],null,1,0]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","  "],["append",["helper",["countdown-widget"],null,[["startDate","endDate","preCountdownEnabled","countdownEnabled","hidePreCountdownAfterStartDate","startingSoonText","startingText","startingWrappingText","startingLongTimeText"],[["get",["startDate"]],["get",["endDate"]],["get",["preEventEnabled"]],false,false,["get",["tra","tft_event_almost_starting"]],["get",["tra","tft_event_almost_starting"]],["get",["tra","tft_event_time_until_start"]],""]]],false],["text","\\n"]],"locals":[]},{"statements":[["text","  "],["append",["helper",["countdown-widget"],null,[["startDate","endDate","preCountdownEnabled","countdownEnabled","requireStartDateToTransition","hidePreCountdownAfterStartDate","hideCountdownAfterEndDate","startingSoonText","startingText","startingWrappingText","startingLongTimeText","endingSoonText","endingText","endingWrappingText","endingLongTimeText"],[["get",["startDate"]],["get",["endDate"]],true,["get",["eventEnabled"]],false,false,false,["get",["tra","tft_event_almost_starting"]],["get",["tra","tft_event_almost_starting"]],["get",["tra","tft_event_time_until_start"]],"",["get",["tra","tft_event_almost_ending"]],["get",["tra","tft_event_almost_ending"]],["get",["tra","tft_event_time_until_end"]],""]]],false],["text","\\n"]],"locals":[]}],"hasPartials":false}',
                meta: {}
            })
        }, (e, t, n) => {
            "use strict";
            n.r(t)
        }, (e, t, n) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = void 0;
            var s = n(1),
                a = n(2);
            const l = s.UIKit.getTooltipManager(),
                o = {
                    targetAnchor: {
                        x: "center",
                        y: "top"
                    },
                    tooltipAnchor: {
                        x: "center",
                        y: "bottom"
                    },
                    tooltipDirection: "top"
                };
            var i = s.Ember.Component.extend({
                classNames: [`${a.PLUGIN_NAME}-tft-tooltip`],
                layout: n(20),
                toolTipAttached: !1,
                tooltipOptions: s.Ember.computed("targetAnchor", "tooltipAnchor", "tooltipDirection", (function() {
                    return {
                        targetAnchor: this.get("targetAnchor") || o.targetAnchor,
                        tooltipAnchor: this.get("tooltipAnchor") || o.tooltipAnchor,
                        tooltipDirection: this.get("tooltipDirection") || o.tooltipDirection
                    }
                })),
                tooltipSetup() {
                    const e = this.toolTipAttached;
                    if (this.tooltipHoverElement = this.element.parentElement, !e && this.tooltipHoverElement) {
                        const e = this.get("tooltipId");
                        this.tooltipElement = this.element.querySelector(`#tft-tooltip-${e}`), this.attachTooltip(), this.toolTipAttached = !0
                    }
                },
                didInsertElement() {
                    this._super(...arguments), this.tooltipSetup()
                },
                willDestroyElement() {
                    this.detachTooltip(), this._super(...arguments)
                },
                attachTooltip: function() {
                    l.assign(this.tooltipHoverElement, this.tooltipElement, null, this.get("tooltipOptions"))
                },
                detachTooltip: function() {
                    l.unassign(this.tooltipHoverElement)
                }
            });
            t.default = i
        }, (e, t, n) => {
            const s = n(1).Ember;
            e.exports = s.HTMLBars.template({
                id: "sngKakyU",
                block: '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-tft\\\\src\\\\app\\\\components\\\\tft-tooltip\\\\layout.hbs\\" style-path=\\"null\\" js-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-tft\\\\src\\\\app\\\\components\\\\tft-tooltip\\\\index.js\\" "],["text","\\n"],["open-element","lol-uikit-tooltip",[]],["dynamic-attr","id",["concat",["tft-tooltip-",["unknown",["tooltipId"]]]]],["flush-element"],["text","\\n  "],["yield","default"],["text","\\n"],["close-element"],["text","\\n"]],"locals":[],"named":[],"yields":["default"],"blocks":[],"hasPartials":false}',
                meta: {}
            })
        }, (e, t, n) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = void 0;
            var s = n(1),
                a = n(2);
            n(22);
            var l = s.Ember.Component.extend({
                classNames: [`${a.PLUGIN_NAME}-hub`],
                layout: n(23),
                _selectedMilestoneId: null,
                title: s.Ember.computed("playerHasPremium", "battlePass.info.title", "battlePass.info.premiumTitle", (function() {
                    const e = this.get("playerHasPremium"),
                        t = this.get("battlePass.info.title"),
                        n = this.get("battlePass.info.premiumTitle");
                    return !0 === e && n ? n : t
                })),
                pcPurchaseRequirement: s.Ember.computed.alias("battlePass.info.pcPurchaseRequirement"),
                waitingForPass: s.Ember.computed.equal("battlePass", null),
                passExpired: s.Ember.computed.empty("battlePass.milestones"),
                milestones: s.Ember.computed("battlePass.milestones.@each.{internalName,missionId,isLocked,pointsEarnedForMilestone}", (function() {
                    return s.Ember.A(Array.from(this.get("battlePass.milestones")))
                })),
                bonuses: s.Ember.computed("battlePass.bonuses.@each.{internalName,missionId,isLocked,pointsEarnedForMilestone}", (function() {
                    return s.Ember.A(Array.from(this.get("battlePass.bonuses")))
                })),
                hasBonuses: s.Ember.computed.notEmpty("bonuses"),
                playerHasPremium: s.Ember.computed.alias("battlePass.info.premium"),
                passEndDate: s.Ember.computed.alias("battlePass.info.endDate"),
                progressMissionId: s.Ember.computed.alias("battlePass.progressMissionId"),
                activeMilestone: s.Ember.computed.alias("battlePass.activeMilestone"),
                lastViewedMilestone: s.Ember.computed.alias("battlePass.lastViewedMilestone"),
                lastMainMilestone: s.Ember.computed.alias("milestones.lastObject"),
                lastBonusMilestone: s.Ember.computed.alias("bonuses.lastObject"),
                isMainMilestonesComplete: s.Ember.computed("lastMainMilestone.state", (function() {
                    const e = this.get("lastMainMilestone.state");
                    return e === a.BP_V2_MILESTONE_REWARDABLE || e === a.BP_V2_MILESTONE_COMPLETE
                })),
                isBonusMilestonesComplete: s.Ember.computed("lastBonusMilestone.state", (function() {
                    const e = this.get("lastBonusMilestone.state");
                    return e === a.BP_V2_MILESTONE_REWARDABLE || e === a.BP_V2_MILESTONE_COMPLETE
                })),
                isPassComplete: s.Ember.computed("hasBonuses", "isMainMilestonesComplete", "isBonusMilestonesComplete", (function() {
                    return this.get("hasBonuses") ? this.get("isBonusMilestonesComplete") : this.get("isMainMilestonesComplete")
                })),
                selectedMilestone: s.Ember.computed("_selectedMilestoneId", "milestones", "bonuses", "activeMilestone", (function() {
                    const e = this.get("_selectedMilestoneId"),
                        t = this.get("milestones").findBy("missionId", e),
                        n = this.get("bonuses").findBy("missionId", e),
                        s = this.get("activeMilestone");
                    return t || (n || s)
                })),
                selectedPassRewardIsLastMainMilestone: s.Ember.computed("selectedMilestone.internalName", "lastMainMilestone.internalName", (function() {
                    return this.get("lastMainMilestone.internalName") === this.get("selectedMilestone.internalName")
                })),
                currentTimeMetronome: s.Ember.on("init", (function() {
                    const e = this.get("passEndDate") - Date.now(),
                        t = Math.floor(e / a.DAY_IN_MS);
                    let n = a.MINUTE_IN_MS / 2;
                    t > 0 && (n = 6 * a.HOUR_IN_MS), s.Ember.run.later(this, (function() {
                        this.notifyPropertyChange("passEndDate"), this.currentTimeMetronome()
                    }), n)
                })),
                battlePassFooter: s.Ember.computed.alias("battlePass.info.media.battlepass-footer-bg"),
                totalPointsEarned: s.Ember.computed.alias("battlePass.totalPointsEarned"),
                isClaimAllEnabled: !1,
                backButtonAction: function() {},
                backButtonEnabled: !1,
                battlePass: null,
                celebratePassCompletionFunc: function(e) {},
                claimRewardsFunc: function(e, t) {},
                disableClaimButton: !1,
                isBattlePassXPBoosted: !1,
                media: null,
                markProgressAsViewedCallback: function(e, t) {},
                actions: {
                    openLoot() {
                        s.Router.navigateTo("rcp-fe-lol-loot")
                    },
                    handleRewardSelected(e) {
                        this.set("_selectedMilestoneId", e.missionId)
                    }
                }
            });
            t.default = l
        }, (e, t, n) => {
            "use strict";
            n.r(t)
        }, (e, t, n) => {
            const s = n(1).Ember;
            e.exports = s.HTMLBars.template({
                id: "y0rCjwM6",
                block: '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-tft\\\\src\\\\app\\\\components\\\\tft-hub\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-tft\\\\src\\\\app\\\\components\\\\tft-hub\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-tft\\\\src\\\\app\\\\components\\\\tft-hub\\\\index.js\\" "],["text","\\n"],["block",["if"],[["get",["waitingForPass"]]],null,4,3]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","        "],["open-element","lol-uikit-flat-button",[]],["dynamic-attr","onclick",["helper",["action"],[["get",[null]],["get",["backButtonAction"]]],null],null],["flush-element"],["append",["unknown",["tra","battlepass_back"]],false],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","    "],["open-element","div",[]],["static-attr","class","top"],["flush-element"],["text","\\n"],["block",["if"],[["get",["backButtonEnabled"]]],null,0],["text","    "],["close-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","middle"],["flush-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","column-left"],["flush-element"],["text","\\n        "],["append",["helper",["battlepass-series-info"],null,[["class","title","passEndDate","isBattlePassXPBoosted"],["pass-series-info",["get",["title"]],["get",["passEndDate"]],["get",["isBattlePassXPBoosted"]]]]],false],["text","\\n        "],["append",["helper",["battlepass-level-bar"],null,[["class","activeMilestone","lastViewedMilestone","lastMainMilestone","playerHasPremium","isPassComplete","progressMissionId","markProgressAsViewedCallback"],["pass-level-bar",["get",["activeMilestone"]],["get",["lastViewedMilestone"]],["get",["lastMainMilestone"]],["get",["playerHasPremium"]],["get",["isPassComplete"]],["get",["progressMissionId"]],["get",["markProgressAsViewedCallback"]]]]],false],["text","\\n        "],["append",["helper",["battlepass-upgrade-button"],null,[["class","playerHasPremium","pcPurchaseRequirement"],["pass-upgrade-button",["get",["playerHasPremium"]],["get",["pcPurchaseRequirement"]]]]],false],["text","\\n      "],["close-element"],["text","\\n\\n      "],["open-element","div",[]],["static-attr","class","column-right"],["flush-element"],["text","\\n        "],["append",["helper",["battlepass-selected-reward-details"],null,[["class","rewardInfo","isLastRewardInMainBattlepass","claimRewardsFunc","celebratePassCompletionFunc","media","disableClaimButton"],["pass-reward-details",["get",["selectedMilestone"]],["get",["selectedPassRewardIsLastMainMilestone"]],["get",["claimRewardsFunc"]],["get",["celebratePassCompletionFunc"]],["get",["media"]],["get",["disableClaimButton"]]]]],false],["text","\\n      "],["close-element"],["text","\\n    "],["close-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","tft-hub-footer-bg"],["dynamic-attr","style",["concat",["background-image: url(",["unknown",["battlePassFooter"]],")"]]],["flush-element"],["text","\\n    "],["close-element"],["text","\\n\\n    "],["append",["helper",["battlepass-timeline"],null,[["class","milestones","bonusMilestones","isPassComplete","isMainMilestonesComplete","genericAssets","rewardSelected","activeMilestone","media","totalPointsEarned"],["battlepass-timeline",["get",["milestones"]],["get",["bonuses"]],["get",["isPassComplete"]],["get",["isMainMilestonesComplete"]],["get",["genericAssets"]],["helper",["action"],[["get",[null]],"handleRewardSelected"],null],["get",["battlePass","activeMilestone"]],["get",["media"]],["get",["battlePass","totalPointsEarned"]]]]],false],["text","\\n"]],"locals":[]},{"statements":[["text","    "],["open-element","div",[]],["static-attr","class","pass-expired"],["flush-element"],["append",["unknown",["tra","battlepass_expired"]],false],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["block",["if"],[["get",["passExpired"]]],null,2,1],["text","\\n"]],"locals":[]},{"statements":[["text","  "],["open-element","div",[]],["static-attr","class","spinner-container"],["flush-element"],["text","\\n    "],["append",["helper",["uikit-spinner"],null,[["width","height"],["50px","50px"]]],false],["text","\\n  "],["close-element"],["text","\\n"]],"locals":[]}],"hasPartials":false}',
                meta: {}
            })
        }, (e, t, n) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = void 0;
            var s = n(1),
                a = n(2);
            n(25);
            var l = s.Ember.Component.extend({
                didRender() {
                    this._super(...arguments), this.get("milestoneChanged") && (this._handleMilestoneSelected(this.get("selectedMilestone")), this.set("milestoneChanged", !1))
                },
                classNames: [`${a.PLUGIN_NAME}-battlepass-timeline`],
                layout: n(26),
                milestoneChanged: !0,
                activeMilestone: null,
                bonusMilestones: null,
                isPassComplete: !1,
                isMainMilestonesComplete: !1,
                genericAssets: null,
                media: null,
                milestones: null,
                totalPointsEarned: 0,
                selectedMilestone: s.Ember.computed("_selectedMilestone", "activeMilestone", "milestones.lastObject", "bonusMilestones.lastObject", (function() {
                    const e = this.get("_selectedMilestone"),
                        t = this.get("activeMilestone"),
                        n = this.get("milestones.lastObject"),
                        s = this.get("bonusMilestones.lastObject");
                    return e || (t.missionId ? t : s || n)
                })),
                passEndMarkerDottedImage: s.Ember.computed("media", (function() {
                    return this.get("media.dotted-line")
                })),
                passEndMarkerCircleImage: s.Ember.computed("media", (function() {
                    return this.get("media.gold-circle")
                })),
                hasBonusMilestones: s.Ember.computed.notEmpty("bonusMilestones"),
                _find(e) {
                    return this.element.querySelector(e)
                },
                scrollToCenterMilestone(e) {
                    const t = this._find(`#id-${e.missionId}`);
                    if (t) {
                        const e = this._find("lol-uikit-scrollable").offsetWidth,
                            n = t.offsetLeft - (e - t.offsetWidth) / 2;
                        this._scrollTo(Math.ceil(n, 0))
                    }
                },
                _scrollTo(e) {
                    this._find("lol-uikit-scrollable").scrollTo({
                        top: 0,
                        left: e,
                        behavior: "smooth"
                    })
                },
                _handleMilestoneSelected(e) {
                    this.set("_selectedMilestone", e), this.sendAction("rewardSelected", e), this.scrollToCenterMilestone(e)
                },
                actions: {
                    handleMilestoneSelected(e) {
                        this.set("milestoneChanged", !0), this._handleMilestoneSelected(e)
                    }
                }
            });
            t.default = l
        }, (e, t, n) => {
            "use strict";
            n.r(t)
        }, (e, t, n) => {
            const s = n(1).Ember;
            e.exports = s.HTMLBars.template({
                id: "j1u1/H23",
                block: '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-tft\\\\src\\\\app\\\\components\\\\battlepass-timeline\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-tft\\\\src\\\\app\\\\components\\\\battlepass-timeline\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-tft\\\\src\\\\app\\\\components\\\\battlepass-timeline\\\\index.js\\" "],["text","\\n"],["open-element","lol-uikit-scrollable",[]],["static-attr","class","milestones"],["static-attr","direction","horizontal"],["static-attr","overflow-masks","enabled"],["static-attr","show-on-hover","false"],["static-attr","side-scroll-wheel",""],["flush-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","main-milestones"],["flush-element"],["text","\\n"],["block",["each"],[["get",["milestones"]]],null,3],["text","  "],["close-element"],["text","\\n"],["block",["if"],[["get",["hasBonusMilestones"]]],null,2],["text","  "],["open-element","div",[]],["dynamic-attr","class",["concat",["bonus-milestones ",["helper",["unless"],[["get",["isMainMilestonesComplete"]],"dimmed"],null]]]],["flush-element"],["text","\\n"],["block",["each"],[["get",["bonusMilestones"]]],null,0],["text","  "],["close-element"],["text","\\n"],["close-element"],["text","\\n"]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","      "],["append",["helper",["battlepass-milestone"],null,[["media","milestone","currentlyActiveMilestoneId","currentlySelectedMilestoneId","displayIndex","click"],[["get",["media"]],["get",["bonusMilestone"]],["get",["activeMilestone","missionId"]],["get",["selectedMilestone","missionId"]],["get",["index"]],["helper",["action"],[["get",[null]],"handleMilestoneSelected",["get",["bonusMilestone"]]],null]]]],false],["text","\\n"]],"locals":["bonusMilestone","index"]},{"statements":[["text","          "],["open-element","lol-uikit-content-block",[]],["static-attr","type","tooltip-small"],["flush-element"],["text","\\n            "],["open-element","p",[]],["flush-element"],["append",["unknown",["tra","battlepass_end_of_pass"]],false],["close-element"],["text","\\n          "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","  "],["open-element","div",[]],["static-attr","class","main-milestones-end-marker"],["flush-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","main-milestones-end-marker"],["flush-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","dotted-line"],["dynamic-attr","style",["concat",["--pass-end-marker-dotted-image: url(\'",["unknown",["passEndMarkerDottedImage"]],"\');"]]],["flush-element"],["close-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","circle"],["dynamic-attr","style",["concat",["--pass-end-marker-circle-image: url(\'",["unknown",["passEndMarkerCircleImage"]],"\');"]]],["flush-element"],["text","\\n"],["block",["tft-tooltip"],null,[["tooltipId"],["pass-details"]],1],["text","      "],["close-element"],["text","\\n    "],["close-element"],["text","\\n  "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","      "],["append",["helper",["battlepass-milestone"],null,[["media","totalPointsEarned","milestone","currentlyActiveMilestoneId","currentlySelectedMilestoneId","displayIndex","click"],[["get",["media"]],["get",["totalPointsEarned"]],["get",["milestone"]],["get",["activeMilestone","missionId"]],["get",["selectedMilestone","missionId"]],["get",["index"]],["helper",["action"],[["get",[null]],"handleMilestoneSelected",["get",["milestone"]]],null]]]],false],["text","\\n"]],"locals":["milestone","index"]}],"hasPartials":false}',
                meta: {}
            })
        }, (e, t, n) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = void 0;
            var s = n(1),
                a = n(2);
            n(28);
            var l = s.Ember.Component.extend({
                didRender() {
                    this._super(...arguments)
                },
                mouseDown() {
                    !this.get("isLocked") && this.get("isRewardable") ? s.Audio.getChannel("sfx-ui").playSound("/fe/lol-static-assets/sounds/sfx-uikit-grid-click.ogg") : s.Audio.getChannel("sfx-ui").playSound("/fe/lol-static-assets/sounds/sfx-battlepass-icon-locked-button-click.ogg")
                },
                mouseUp() {
                    !this.get("isLocked") && this.get("isRewardable") && s.Audio.getChannel("sfx-ui").playSound("/fe/lol-static-assets/sounds/sfx-uikit-grid-click-release.ogg")
                },
                classNames: [`${a.PLUGIN_NAME}-battlepass-milestone`],
                layout: n(29),
                currentlySelectedMilestoneId: "",
                currentlyActiveMilestoneId: "",
                displayIndex: 0,
                media: null,
                milestone: null,
                totalPointsEarned: 0,
                showProgressionTracker: !0,
                showTooltip: !0,
                missionId: s.Ember.computed.alias("milestone.missionId"),
                first: s.Ember.computed.equal("displayIndex", 0),
                rewards: s.Ember.computed.alias("milestone.rewards"),
                title: s.Ember.computed.alias("milestone.title"),
                description: s.Ember.computed.alias("milestone.description"),
                requiredXPValue: s.Ember.computed("totalPointsEarned", "milestone.totalPointsForMilestone", (function() {
                    const e = this.get("totalPointsEarned");
                    return this.get("milestone.totalPointsForMilestone") - e
                })),
                hasRequiredXP: s.Ember.computed.lte("requiredXPValue", 0),
                requiredXPText: s.Ember.computed("requiredXPValue", (function() {
                    return this.get("tra").formatString("battlepass_milestone_exp_required", {
                        amount_required: this.get("requiredXPValue")
                    })
                })),
                isPaid: s.Ember.computed.alias("milestone.isPaid"),
                isKeystone: s.Ember.computed.alias("milestone.isKeystone"),
                isBonus: s.Ember.computed.alias("milestone.isBonus"),
                isLocked: s.Ember.computed.alias("milestone.isLocked"),
                isLockedAndPaid: s.Ember.computed.and("isLocked", "isPaid"),
                isRewardable: s.Ember.computed.equal("milestone.state", "REWARDABLE"),
                isClaimed: s.Ember.computed.equal("milestone.state", "COMPLETE"),
                isSelected: s.Ember.computed("milestone.missionId", "currentlySelectedMilestoneId", (function() {
                    return this.get("milestone.missionId") === this.get("currentlySelectedMilestoneId")
                })),
                isActive: s.Ember.computed("milestone.missionId", "currentlyActiveMilestoneId", (function() {
                    return this.get("milestone.missionId") === this.get("currentlyActiveMilestoneId")
                })),
                isPast: s.Ember.computed.or("isClaimed", "isRewardable"),
                progress: s.Ember.computed("milestone.state", "milestone.pointsEarnedForMilestone", "milestone.pointsNeededForMilestone", (function() {
                    if ("REWARDABLE" === this.get("milestone.state") || "COMPLETE" === this.get("milestone.state")) return 100;
                    const e = this.get("milestone.pointsEarnedForMilestone"),
                        t = this.get("milestone.pointsNeededForMilestone");
                    return 0 === e ? 0 : Math.ceil(100 * e / t)
                })),
                rewardBackgroundImage: s.Ember.computed("media", (function() {
                    return this.get("media.reward-background")
                })),
                rewardFrameImageTag: s.Ember.computed("milestone.isPaid", "milestone.isKeystone", "milestone.isLocked", "isRewardable", "isClaimed", (function() {
                    const e = this.get("milestone.isPaid"),
                        t = this.get("milestone.isKeystone"),
                        n = e ? t ? "keystone" : "premium" : "free",
                        s = this.get("milestone.isLocked"),
                        a = this.get("isRewardable"),
                        l = this.get("isClaimed");
                    return `reward-frame--${n}-${s?"locked":a?"claimable":l?"claimed":"available"}`
                })),
                rewardFrameImage: s.Ember.computed("rewardFrameImageTag", "media", (function() {
                    return this.get(`media.${this.get("rewardFrameImageTag")}`)
                })),
                rewardFrameImageHover: s.Ember.computed("rewardFrameImageTag", "media", (function() {
                    return this.get(`media.${this.get("rewardFrameImageTag")}-hover`)
                })),
                levelPipImageTag: s.Ember.computed("isActive", "isUpcoming", "isPast", (function() {
                    const e = this.get("isActive"),
                        t = this.get("isPast"),
                        n = this.get("isBonus");
                    return e ? "level-pip--active" : t ? n ? "level-pip--bonus" : "level-pip--complete" : "level-pip--upcoming"
                })),
                levelPipImage: s.Ember.computed("levelPipImageTag", (function() {
                    return this.get(`media.${this.get("levelPipImageTag")}`)
                })),
                levelPipImageHover: s.Ember.computed("levelPipImageTag", (function() {
                    this.get("media");
                    return this.get(`media.${this.get("levelPipImageTag")}-hover`)
                })),
                selectedImage: s.Ember.computed("isSelected", (function() {
                    return this.get("media.selection-highlight")
                }))
            });
            t.default = l
        }, (e, t, n) => {
            "use strict";
            n.r(t)
        }, (e, t, n) => {
            const s = n(1).Ember;
            e.exports = s.HTMLBars.template({
                id: "U6O6WS74",
                block: '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-tft\\\\src\\\\app\\\\components\\\\battlepass-milestone\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-tft\\\\src\\\\app\\\\components\\\\battlepass-milestone\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-tft\\\\src\\\\app\\\\components\\\\battlepass-milestone\\\\index.js\\" "],["text","\\n"],["open-element","div",[]],["dynamic-attr","id",["concat",["id-",["unknown",["missionId"]]]]],["dynamic-attr","class",["concat",["milestone ",["helper",["if"],[["get",["isSmall"]],"small"],null]]]],["dynamic-attr","data-mission-id",["unknown",["milestoneCssId"]],null],["flush-element"],["text","\\n"],["block",["if"],[["get",["showToolTip"]]],null,6],["text","  "],["open-element","div",[]],["dynamic-attr","class",["concat",["selection-highlight ",["helper",["if"],[["get",["isSelected"]],"visible"],null]]]],["dynamic-attr","style",["concat",["--selection-highlight-image: url(\'",["unknown",["selectedImage"]],"\')"]]],["flush-element"],["close-element"],["text","\\n\\n  "],["open-element","div",[]],["dynamic-attr","class",["concat",["reward ",["helper",["if"],[["get",["isRewardable"]],"rewardable-glow"],null]," ",["helper",["if"],[["get",["isLockedAndPaid"]],"locked"],null]]]],["flush-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","images"],["flush-element"],["text","\\n      "],["open-element","img",[]],["static-attr","class","background"],["dynamic-attr","src",["concat",[["unknown",["rewardBackgroundImage"]]]]],["flush-element"],["close-element"],["text","\\n      "],["open-element","img",[]],["static-attr","class","reward-icon"],["dynamic-attr","src",["concat",[["unknown",["milestone","iconImageUrl"]]]]],["flush-element"],["close-element"],["text","\\n      "],["open-element","div",[]],["dynamic-attr","class",["concat",["checkmark ",["helper",["unless"],[["get",["isClaimed"]],"hidden"],null]]]],["dynamic-attr","style",["concat",["--checkmark-image: url(\'",["unknown",["media","reward-checkmark"]],"\');"]]],["flush-element"],["close-element"],["text","\\n      "],["open-element","div",[]],["dynamic-attr","class",["concat",["locked ",["helper",["unless"],[["get",["isLockedAndPaid"]],"hidden"],null]]]],["flush-element"],["close-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","frame"],["dynamic-attr","style",["concat",["--frame-image: url(\'",["unknown",["rewardFrameImage"]],"\'); --frame-image-hover: url(\'",["unknown",["rewardFrameImageHover"]],"\')"]]],["flush-element"],["close-element"],["text","\\n    "],["close-element"],["text","\\n\\n    "],["block",["unless"],[["get",["milestone","isPaid"]]],null,2],["text","\\n  "],["close-element"],["text","\\n\\n"],["block",["if"],[["get",["showProgressionTracker"]]],null,1],["close-element"]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","      "],["open-element","div",[]],["static-attr","class","progress-bar-container"],["flush-element"],["text","\\n        "],["open-element","div",[]],["static-attr","class","progress-bar-empty"],["flush-element"],["close-element"],["text","\\n        "],["open-element","div",[]],["dynamic-attr","class",["concat",["progress-bar ",["helper",["if"],[["get",["isBonus"]],"bonus"],null]]]],["dynamic-attr","style",["concat",["width:",["unknown",["progress"]],"%"]]],["flush-element"],["close-element"],["text","\\n      "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","  "],["open-element","div",[]],["static-attr","class","progression-tracker"],["flush-element"],["text","\\n"],["block",["unless"],[["get",["first"]]],null,0],["text","\\n    "],["open-element","div",[]],["static-attr","class","level-pip"],["flush-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","image"],["dynamic-attr","style",["concat",["--pip-image: url(\'",["unknown",["levelPipImage"]],"\'); --pip-image-hover: url(\'",["unknown",["levelPipImageHover"]],"\')"]]],["flush-element"],["close-element"],["text","\\n      "],["open-element","span",[]],["static-attr","class","label"],["flush-element"],["append",["unknown",["milestone","level"]],false],["close-element"],["text","\\n    "],["close-element"],["text","\\n  "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["open-element","span",[]],["static-attr","class","free-label"],["flush-element"],["append",["unknown",["tra","battlepass_free_label"]],false],["close-element"]],"locals":[]},{"statements":[["text","        "],["open-element","p",[]],["static-attr","style","margin-bottom: 0"],["flush-element"],["append",["helper",["sanitize"],[["get",["description"]]],null],false],["close-element"],["text","\\n        "],["open-element","p",[]],["static-attr","style","font-weight: bold"],["flush-element"],["append",["helper",["sanitize"],[["get",["requiredXPText"]]],null],false],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","        "],["open-element","p",[]],["flush-element"],["append",["helper",["sanitize"],[["get",["description"]]],null],false],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","    "],["open-element","lol-uikit-content-block",[]],["static-attr","type","tooltip-small"],["flush-element"],["text","\\n"],["block",["if"],[["get",["hasRequiredXP"]]],null,4,3],["text","    "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["block",["tft-tooltip"],null,[["tooltipId"],["milestone-details"]],5]],"locals":[]}],"hasPartials":false}',
                meta: {}
            })
        }, (e, t, n) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = void 0;
            var s = n(1),
                a = n(2);
            n(31);
            var l = s.Ember.Component.extend({
                classNames: [`${a.PLUGIN_NAME}-battlepass-level-bar`],
                classNameBindings: ["isPassComplete:pass-complete:", "isBonus:bonus:"],
                layout: n(32),
                activeMilestone: null,
                isPassComplete: null,
                lastViewedMilestone: null,
                lastMainMilestone: null,
                markProgressAsViewedCallback: null,
                playerHasPremium: null,
                progressMissionId: null,
                showTooltip: !0,
                showHeader: !0,
                level: s.Ember.computed("activeMilestone.level", (function() {
                    const e = this.get("activeMilestone.level") - 1;
                    return this.get("tra").formatString("battlepass_level_shorthand", {
                        level: e
                    })
                })),
                count: s.Ember.computed.alias("activeMilestone.pointsEarnedForMilestone"),
                total: s.Ember.computed.alias("activeMilestone.pointsNeededForMilestone"),
                isBonus: s.Ember.computed.alias("activeMilestone.isBonus"),
                lastViewedCount: s.Ember.computed.alias("lastViewedMilestone.pointsEarnedForMilestone"),
                lastViewedTotal: s.Ember.computed.alias("lastViewedMilestone.pointsNeededForMilestone"),
                hasChanged: s.Ember.computed("count", "activeMilestone.level", "lastViewedCount", "lastViewedMilestone.level", (function() {
                    return this.get("activeMilestone.level") !== this.get("lastViewedMilestone.level") || this.get("count") !== this.get("lastViewedCount")
                })),
                percentage: s.Ember.computed("count", "total", "isPassComplete", (function() {
                    return this._calculatePercentage(this.get("count"), this.get("total"), this.get("isPassComplete"))
                })),
                lastViewedPercentage: s.Ember.computed("lastViewedCount", "lastViewedTotal", "isPassComplete", (function() {
                    return this._calculatePercentage(this.get("lastViewedCount"), this.get("lastViewedTotal"), this.get("isPassComplete"))
                })),
                lottieSrc: s.Ember.computed("activeMilestone.level", "lastViewedMilestone.level", "isBonus", (function() {
                    const e = this.get("activeMilestone.level"),
                        t = this.get("lastViewedMilestone.level"),
                        n = this.get("isBonus") ? a.BONUS_STR : a.NORMAL_STR,
                        s = e === t ? a.XP_GAIN_STR : a.LVL_UP_STR;
                    return `${a.BATTLEPASS_LOTTIE_PATH}xpBar_${s}_${n}`
                })),
                assetSegmentsSrc: s.Ember.computed("total", (function() {
                    const e = this.get("total"),
                        t = Math.round(e / 100);
                    return a.AVAILABLE_XP_SEGMENTS.includes(t) ? `TFTM_BattlePass_Segments_${t}.png` : `TFTM_BattlePass_Segments_${a.AVAILABLE_XP_SEGMENTS[0]}.png`
                })),
                didInsertElement() {
                    this._super(...arguments), this._startAnimation()
                },
                willDestroyElement() {
                    this._markProgressAsViewed(), this._stopAnimation()
                },
                _startAnimation() {
                    const e = this.element.querySelector("lol-uikit-lottie#xp-bar");
                    this.get("hasChanged") ? (e.onAnimationStart = this._playSFX(), e.onAnimationComplete = this._transitionToLoopAnimation.bind(this), e.play()) : this._transitionToLoopAnimation()
                },
                _stopAnimation() {
                    const e = this.element.querySelector("lol-uikit-lottie#xp-bar"),
                        t = this.element.querySelector("lol-uikit-lottie#xp-bar-loop");
                    e.stop(), t.stop()
                },
                _transitionToLoopAnimation() {
                    const e = this.element.querySelector("lol-uikit-lottie#xp-bar");
                    this.element.querySelector("lol-uikit-lottie#xp-bar-loop").style.display = "inline", e.style.display = "none"
                },
                _markProgressAsViewed() {
                    const e = this.get("markProgressAsViewedCallback");
                    if (e) {
                        e([this.get("progressMissionId")], [])
                    }
                },
                _playSFX() {
                    const e = this.get("activeMilestone.level") === this.get("lastViewedMilestone.level") ? a.XP_GAIN_SFX_PATH : a.LVL_UP_SFX_PATH,
                        t = s.Audio.getChannel(a.SOUND_UX_CHANNEL),
                        n = t.audioContext.currentTime;
                    t.playSound(e, {}, {
                        when: n + a.ANIMATION_SFX_START_DELAY
                    })
                },
                _calculatePercentage(e, t, n) {
                    const s = parseInt(e),
                        a = parseInt(t);
                    return n ? 1 : a ? s / a : 0
                }
            });
            t.default = l
        }, (e, t, n) => {
            "use strict";
            n.r(t)
        }, (e, t, n) => {
            const s = n(1).Ember;
            e.exports = s.HTMLBars.template({
                id: "oH9ERmFf",
                block: '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-tft\\\\src\\\\app\\\\components\\\\battlepass-level-bar\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-tft\\\\src\\\\app\\\\components\\\\battlepass-level-bar\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-tft\\\\src\\\\app\\\\components\\\\battlepass-level-bar\\\\index.js\\" "],["text","\\n"],["open-element","div",[]],["static-attr","class","content"],["flush-element"],["text","\\n"],["block",["unless"],[["get",["isPassComplete"]]],null,5],["block",["if"],[["get",["showHeader"]]],null,2],["text","  "],["open-element","div",[]],["static-attr","class","tft-bar-lottie-container"],["flush-element"],["text"," \\n    "],["open-element","lol-uikit-lottie",[]],["static-attr","id","xp-bar-loop"],["dynamic-attr","src",["concat",[["unknown",["lottieSrc"]],"_LOOP.json"]]],["static-attr","autoplay","true"],["static-attr","image-path","fe/lol-tft/lottie/Battlepass-XPBar/images/"],["dynamic-attr","param-current-level-progress",["unknown",["percentage"]],null],["dynamic-attr","param-previous-level-progress",["unknown",["lastViewedPercentage"]],null],["dynamic-attr","asset-segments",["unknown",["assetSegmentsSrc"]],null],["static-attr","loop","true"],["flush-element"],["text","\\n    "],["close-element"],["text","\\n    "],["open-element","lol-uikit-lottie",[]],["static-attr","id","xp-bar"],["dynamic-attr","src",["concat",[["unknown",["lottieSrc"]],"_IN.json"]]],["static-attr","autoplay","false"],["static-attr","image-path","fe/lol-tft/lottie/Battlepass-XPBar/images/"],["dynamic-attr","param-current-level-progress",["unknown",["percentage"]],null],["dynamic-attr","param-previous-level-progress",["unknown",["lastViewedPercentage"]],null],["dynamic-attr","asset-segments",["unknown",["assetSegmentsSrc"]],null],["flush-element"],["text","\\n    "],["close-element"],["text","\\n  "],["close-element"],["text","\\n"],["close-element"]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","          "],["append",["unknown",["level"]],false],["text","\\n"]],"locals":[]},{"statements":[["text","          "],["append",["unknown",["tra","battlepass_one_hundred_percent_complete"]],false],["text","\\n"]],"locals":[]},{"statements":[["text","  "],["open-element","div",[]],["static-attr","class","header"],["flush-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","header-text"],["flush-element"],["text","\\n"],["block",["if"],[["get",["isPassComplete"]]],null,1,0],["text","    "],["close-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","progress-counter-alignment-wrapper"],["flush-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","progress-counter"],["flush-element"],["text","\\n        "],["open-element","div",[]],["static-attr","class","count"],["flush-element"],["append",["unknown",["count"]],false],["close-element"],["text","\\n        "],["open-element","div",[]],["static-attr","class","total"],["flush-element"],["append",["unknown",["total"]],false],["text"," "],["append",["unknown",["tra","battlepass_exp_shortened"]],false],["close-element"],["text","\\n      "],["close-element"],["text","\\n    "],["close-element"],["text","\\n  "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","      "],["open-element","lol-uikit-content-block",[]],["static-attr","type","tooltip-small"],["flush-element"],["text","\\n        "],["open-element","p",[]],["flush-element"],["append",["unknown",["tra","battlepass_level_bar_tooltip"]],false],["close-element"],["text","\\n      "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["block",["tft-tooltip"],null,[["tooltipId"],["level-bar-details"]],3]],"locals":[]},{"statements":[["block",["if"],[["get",["enableTooltip"]]],null,4]],"locals":[]}],"hasPartials":false}',
                meta: {}
            })
        }, (e, t, n) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = void 0;
            var s = n(1),
                a = n(2);
            n(34);
            var l = s.Ember.Component.extend({
                classNames: [`${a.PLUGIN_NAME}-battlepass-series-info`],
                layout: n(35),
                timeoutExpired: !1,
                isBattlePassXPBoosted: !1,
                title: null,
                passEndDate: null,
                timeLeftString: s.Ember.computed("timeoutExpired", "passEndDate", (function() {
                    let e = this.get("passEndDate") - Date.now();
                    const t = Math.floor(e / a.DAY_IN_MS);
                    e -= 86400 * t;
                    const n = Math.floor(e / a.HOUR_IN_MS) % 24;
                    e -= 3600 * n;
                    const l = Math.floor(e / a.MINUTE_IN_MS) % 60;
                    let o, i, r;
                    e -= 60 * l;
                    let c = 0;
                    return t > 0 ? (o = this.get("tra").formatString("tft_duration_days", {
                        days: t
                    }), this.get("tra").formatString("battlepass_time_till_event_end", {
                        duration: o
                    })) : (n > 0 && t <= 1 ? (i = this.get("tra").formatString("tft_duration_hours", {
                        hours: n
                    }), c = n > 1 ? a.HOUR_IN_MS : a.MINUTE_IN_MS) : (r = this.get("tra").formatString("tft_duration_minutes", {
                        minutes: l
                    }), c = a.MINUTE_IN_MS), this.timeoutExpired = !1, c > 0 && s.Ember.run.later(this, (function() {
                        this.set("timeoutExpired", !0)
                    }), c), i && r ? this.get("tra").formatString("battlepass_time_till_event_end_hours_and_minutes", {
                        hour_duration: i,
                        minutes_duration: r
                    }) : this.get("tra").formatString("battlepass_time_till_event_end", {
                        duration: i || r
                    }))
                }))
            });
            t.default = l
        }, (e, t, n) => {
            "use strict";
            n.r(t)
        }, (e, t, n) => {
            const s = n(1).Ember;
            e.exports = s.HTMLBars.template({
                id: "kQgaMqLv",
                block: '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-tft\\\\src\\\\app\\\\components\\\\battlepass-series-info\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-tft\\\\src\\\\app\\\\components\\\\battlepass-series-info\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-tft\\\\src\\\\app\\\\components\\\\battlepass-series-info\\\\index.js\\" "],["text","\\n"],["open-element","header",[]],["flush-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","title"],["flush-element"],["append",["unknown",["title"]],false],["close-element"],["text","\\n"],["close-element"],["text","\\n"],["open-element","sub",[]],["static-attr","class","pass-details"],["flush-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","pass-timeline-text"],["flush-element"],["append",["unknown",["timeLeftString"]],false],["close-element"],["text","\\n\\n"],["block",["if"],[["get",["isBattlePassXPBoosted"]]],null,1],["close-element"]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","                "],["open-element","lol-uikit-content-block",[]],["static-attr","type","tooltip-small"],["flush-element"],["text","\\n                    "],["open-element","p",[]],["flush-element"],["append",["unknown",["tra","battlepass_xp_boosted_tooltip"]],false],["close-element"],["text","\\n                "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","        "],["open-element","div",[]],["static-attr","class","xp-boosted-container"],["flush-element"],["text","\\n            "],["open-element","img",[]],["static-attr","src","/fe/lol-tft/images/TFT_Up_Arrow.svg"],["static-attr","class","tft-up-arrow-icon"],["flush-element"],["close-element"],["text","\\n            "],["open-element","p",[]],["static-attr","class","pass-timeline-text"],["flush-element"],["text","\\n                "],["append",["unknown",["tra","battlepass_xp_boosted"]],false],["text","\\n            "],["close-element"],["text","\\n"],["block",["tft-tooltip"],null,[["tooltipId","targetAnchor","tooltipAnchor","tooltipDirection"],["xp-boosted-message",["helper",["hash"],null,[["x","y"],["right","center"]]],["helper",["hash"],null,[["x","y"],["left","center"]]],"left"]],0],["text","        "],["close-element"],["text","\\n"]],"locals":[]}],"hasPartials":false}',
                meta: {}
            })
        }, (e, t, n) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = void 0;
            var s = n(1),
                a = n(2);
            n(37);
            var l = s.Ember.Component.extend({
                classNames: [`${a.PLUGIN_NAME}-battlepass-upgrade-button`],
                layout: n(38),
                pcPurchaseRequirement: null,
                actions: {
                    showEventPassStore() {
                        const e = this.get("pcPurchaseRequirement"),
                            [t, n] = e.split(":");
                        s.Telemetry.sendCustomData(a.DEFAULT_TELEMETRY_TABLE, {
                            eventName: a.TELEMETRY_TFT_PASS_UPGRADE_CLICKED,
                            inventoryType: t,
                            itemId: n
                        }), s.Router.navigateTo("rcp-fe-lol-store", {
                            items: [{
                                inventoryType: t,
                                itemId: n
                            }],
                            page: "companions"
                        })
                    }
                }
            });
            t.default = l
        }, (e, t, n) => {
            "use strict";
            n.r(t)
        }, (e, t, n) => {
            const s = n(1).Ember;
            e.exports = s.HTMLBars.template({
                id: "Hasy1wk/",
                block: '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-tft\\\\src\\\\app\\\\components\\\\battlepass-upgrade-button\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-tft\\\\src\\\\app\\\\components\\\\battlepass-upgrade-button\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-tft\\\\src\\\\app\\\\components\\\\battlepass-upgrade-button\\\\index.js\\" "],["text","\\n"],["block",["unless"],[["get",["playerHasPremium"]]],null,0]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","    "],["open-element","div",[]],["static-attr","class","magic-button-group"],["flush-element"],["text","\\n        "],["open-element","lol-uikit-flat-button",[]],["static-attr","primary","true"],["dynamic-attr","class",["helper",["if"],[["get",["selectedPassRewardDetails","isPaid"]],"glow"],null],null],["dynamic-attr","onclick",["helper",["action"],[["get",[null]],"showEventPassStore"],null],null],["flush-element"],["text","\\n            "],["append",["unknown",["tra","battlepass_go_premium"]],false],["text","\\n        "],["close-element"],["text","\\n    "],["close-element"],["text","\\n"]],"locals":[]}],"hasPartials":false}',
                meta: {}
            })
        }, (e, t, n) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = void 0;
            var s = n(1),
                a = n(2);
            n(40);
            var l = s.Ember.Component.extend({
                didRender() {
                    this._super(...arguments), setTimeout((() => {
                        const e = this.$(".reward-premium-glow uikit-video");
                        if (e) {
                            e.toArray().forEach((e => e.playWithoutStopping()))
                        }
                    }), 200)
                },
                classNames: [`${a.PLUGIN_NAME}-battlepass-selected-reward-details`],
                layout: n(41),
                celebratePassCompletionFunc: function(e) {},
                claimRewardsFunc: function(e, t) {},
                disableClaimButton: !1,
                isLastRewardInMainBattlepass: null,
                media: null,
                rewardInfo: null,
                battlepassRewardCelebrationBackground: s.Ember.computed.alias("media.background--battlepass-reward-celebration"),
                battlepassCompletionBackground: s.Ember.computed.alias("media.background--battlepass-completion"),
                title: s.Ember.computed.alias("rewardInfo.title"),
                description: s.Ember.computed.alias("rewardInfo.description"),
                iconImageUrl: s.Ember.computed.alias("rewardInfo.iconImageUrl"),
                iconNeedsFrame: s.Ember.computed.bool("rewardInfo.iconNeedsFrame"),
                isBonus: s.Ember.computed.alias("rewardInfo.isBonus"),
                isLocked: s.Ember.computed.alias("rewardInfo.isLocked"),
                isPaid: s.Ember.computed.alias("rewardInfo.isPaid"),
                missionId: s.Ember.computed.alias("rewardInfo.missionId"),
                state: s.Ember.computed.alias("rewardInfo.state"),
                isRewardable: s.Ember.computed.equal("state", "REWARDABLE"),
                isNotRewardable: s.Ember.computed.not("isRewardable"),
                isComplete: s.Ember.computed.equal("state", "COMPLETE"),
                loadingTimeoutId: null,
                isLoading: s.Ember.computed.bool("loadingTimeoutId"),
                showButton: s.Ember.computed("disableClaimButton", "isLocked", "isNotRewardable", (function() {
                    if (this.get("disableClaimButton")) return !1;
                    const e = this.get("isNotRewardable");
                    return !this.get("isLocked") && !e
                })),
                actions: {
                    claim(e) {
                        if (this.get("isLoading")) return;
                        const t = s.Ember.run.later((() => {
                            this.set("loadingTimeoutId", null)
                        }), 3e3);
                        this.set("loadingTimeoutId", t), s.Telemetry.sendEvent("tft-claim-reward-button-clicked", e.missionInternalName), this.get("claimRewardsFunc")(e, this.get("battlepassRewardCelebrationBackground")), this.get("isLastRewardInMainBattlepass") && this.get("celebratePassCompletionFunc")(this.get("battlepassCompletionBackground"))
                    }
                }
            });
            t.default = l
        }, (e, t, n) => {
            "use strict";
            n.r(t)
        }, (e, t, n) => {
            const s = n(1).Ember;
            e.exports = s.HTMLBars.template({
                id: "zfEIs2xU",
                block: '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-tft\\\\src\\\\app\\\\components\\\\battlepass-selected-reward-details\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-tft\\\\src\\\\app\\\\components\\\\battlepass-selected-reward-details\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-tft\\\\src\\\\app\\\\components\\\\battlepass-selected-reward-details\\\\index.js\\" "],["text","\\n"],["block",["if"],[["get",["rewardInfo"]]],null,4]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","        "],["open-element","div",[]],["static-attr","class","button-content"],["flush-element"],["append",["unknown",["tra","battlepass_milestone_claim"]],false],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","        "],["append",["helper",["uikit-spinner"],null,[["width"],["24px"]]],false],["text","\\n"]],"locals":[]},{"statements":[["text","    "],["open-element","lol-uikit-flat-button",[]],["dynamic-attr","onclick",["helper",["action"],[["get",[null]],"claim",["get",["rewardInfo"]]],null],null],["static-attr","class","button glow"],["static-attr","primary","true"],["flush-element"],["text","\\n"],["block",["if"],[["get",["isLoading"]]],null,1,0],["text","    "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","    "],["open-element","user-experience-perf-switch",[]],["static-attr","class","reward-premium-glow"],["flush-element"],["text","\\n      "],["open-element","uikit-video",[]],["static-attr","type","idle"],["static-attr","src","/fe/lol-tft/videos/background-sparkles.webm"],["static-attr","perf-flags","largeAreaAnimationsEnabled"],["static-attr","visibility","invisible"],["static-attr","cache-name","rcp-fe-lol-tft"],["static-attr","preload","true"],["static-attr","loop","true"],["static-attr","autoplay","true"],["flush-element"],["close-element"],["text","\\n    "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["open-element","section",[]],["static-attr","class","reward-tile"],["flush-element"],["text","\\n"],["block",["if"],[["get",["isPaid"]]],null,3],["text","  "],["open-element","img",[]],["static-attr","class","reward-image"],["dynamic-attr","src",["unknown",["iconImageUrl"]],null],["flush-element"],["close-element"],["text","\\n  "],["open-element","div",[]],["dynamic-attr","class",["concat",["icon-frame ",["helper",["if"],[["get",["iconNeedsFrame"]],"visible"],null]]]],["flush-element"],["close-element"],["text","\\n"],["close-element"],["text","\\n"],["open-element","section",[]],["static-attr","class","reward-details"],["flush-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","reward-text"],["flush-element"],["text","\\n    "],["open-element","header",[]],["flush-element"],["append",["unknown",["title"]],false],["close-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","description"],["flush-element"],["append",["helper",["sanitize"],[["get",["description"]]],null],false],["close-element"],["text","\\n  "],["close-element"],["text","\\n"],["block",["if"],[["get",["showButton"]]],null,2],["close-element"],["text","\\n"]],"locals":[]}],"hasPartials":false}',
                meta: {}
            })
        }, (e, t, n) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = t.UNKNOWN_TFT_TAB_ROUTE_INDEX = t.DEFAULT_TAB_COUNT_WITHOUT_EVENT = void 0;
            var s = n(1),
                a = n(2);
            n(43);
            t.UNKNOWN_TFT_TAB_ROUTE_INDEX = -1;
            t.DEFAULT_TAB_COUNT_WITHOUT_EVENT = 6;
            var l = s.Ember.Component.extend({
                classNames: [`${a.PLUGIN_NAME}-sub-nav`],
                layout: n(44),
                routeName: null,
                tftService: s.Ember.inject.service("tft"),
                trovesService: s.Ember.inject.service("tftTroves"),
                isEnabled: s.Ember.computed.alias("tftService.isSubNavEnabled"),
                homePageEnabled: s.Ember.computed.alias("tftService.homePageEnabled"),
                testPageEnabled: s.Ember.computed.alias("tftService.testPageEnabled"),
                tftNewsEnabled: s.Ember.computed.alias("tftService.newsEnabled"),
                isBattlePassV2Claimable: s.Ember.computed.alias("tftService.isBattlePassV2Claimable"),
                eventsData: s.Ember.computed.alias("tftService.eventsData"),
                trovesEnabled: s.Ember.computed("trovesService.trovesEnabled", (function() {
                    return !!this.get("trovesService") && this.get("trovesService.trovesEnabled")
                })),
                subNavTabs: s.Ember.computed("isBattlePassV2Claimable", "tftNewsEnabled", "testPageEnabled", "homePageEnabled", "trovesEnabled", "eventsData", (function() {
                    const e = this.get("eventsData"),
                        t = this._retrieveEvents(e);
                    return [{
                        route: a.TFT_HOME_ROUTE,
                        traKey: "subnav_home",
                        isEnabled: this.get("homePageEnabled"),
                        showPip: !1
                    }, {
                        route: a.TFT_BATTLE_PASS_ROUTE,
                        traKey: "subnav_battle_pass",
                        isEnabled: !0,
                        showPip: this.get("isBattlePassV2Claimable")
                    }, {
                        route: a.TFT_TROVES_ROUTE,
                        traKey: "subnav_troves",
                        isEnabled: this.get("trovesEnabled")
                    }, ...t, {
                        route: a.TFT_MATCH_HISTORY_ROUTE,
                        traKey: "subnav_match_history",
                        isEnabled: !0,
                        showPip: !1
                    }, {
                        route: a.TFT_NEWS_ROUTE,
                        traKey: "subnav_news",
                        isEnabled: this.get("tftNewsEnabled"),
                        showPip: !1
                    }, {
                        route: a.TFT_TEST_ROUTE,
                        traKey: "subnav_test_page",
                        isEnabled: this.get("testPageEnabled"),
                        showPip: !1
                    }]
                })),
                subNavTabIndexesByRouteName: s.Ember.computed("subNavTabs", (function() {
                    const e = this.get("subNavTabs"),
                        t = new Map;
                    return e.filter((e => e.isEnabled)).forEach(((e, n) => {
                        t.set(e.route, n)
                    })), t
                })),
                selectedIndex: s.Ember.computed("routeName", "subNavTabIndexesByRouteName", (function() {
                    const e = this.get("subNavTabIndexesByRouteName"),
                        t = this.get("routeName");
                    if (e && t) {
                        const n = e.get(t);
                        if (void 0 !== n) return n
                    }
                    return -1
                })),
                init() {
                    this._super(...arguments)
                },
                didRender() {
                    this._super(...arguments), this._highlightNavItemIfNeeded(this._retrieveSubNavContainer(this.element), this.get("selectedIndex"))
                },
                actions: {
                    subNavClicked(e) {
                        s.Telemetry.sendCustomData(a.DEFAULT_TELEMETRY_TABLE, {
                            eventName: a.TELEMETRY_TFT_SUB_NAV_CLICKED,
                            subNavRoute: e.route,
                            subNavUrl: e.url
                        })
                    }
                },
                _retrieveEvents: function(e) {
                    const t = [];
                    if (e && e.length > 0) {
                        e.length > 1 && s.logger.error("Received " + e.length + " events. Currently only displaying one event in the TFT Hub is supported. Picking the first event and ignoring the rest of the events in the data.");
                        const n = e[0];
                        n.enabled && n.titleTranslationKey && t.push({
                            route: a.TFT_EVENT_ROUTE,
                            traKey: n.titleTranslationKey,
                            isEnabled: !0,
                            showPip: !1,
                            url: n.url
                        })
                    }
                    return t
                },
                _highlightNavItemIfNeeded: function(e, t) {
                    if (e)
                        if (Number.isInteger(t)) {
                            if (-1 !== t) {
                                const n = this._getActiveTabIndex(e);
                                (-1 === n || n !== t) && e.setAttribute("selectedindex", t)
                            }
                        } else s.logger.warning("Received an invalid value for the navigation tab index. Index must be an integer.", t);
                    else s.logger.warning("Received an empty value for the tabs container where a HTMLElement was expected.", e)
                },
                _retrieveSubNavContainer: e => e && e instanceof HTMLElement ? e.querySelector("lol-uikit-navigation-bar.tft-sub-nav-container") : null,
                _getActiveTabIndex: e => Array.from(e.querySelectorAll("lol-uikit-navigation-item")).findIndex((e => e.hasAttribute("active")))
            });
            t.default = l
        }, (e, t, n) => {
            "use strict";
            n.r(t)
        }, (e, t, n) => {
            const s = n(1).Ember;
            e.exports = s.HTMLBars.template({
                id: "JF7zCG04",
                block: '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-tft\\\\src\\\\app\\\\components\\\\tft-sub-nav\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-tft\\\\src\\\\app\\\\components\\\\tft-sub-nav\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-tft\\\\src\\\\app\\\\components\\\\tft-sub-nav\\\\index.js\\" "],["text","\\n"],["block",["if"],[["get",["isEnabled"]]],null,8]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","            "],["append",["helper",["get"],[["get",["tra"]],["get",["subNav","traKey"]]],null],false],["text","\\n"]],"locals":[]},{"statements":[["block",["tft-sub-nav-item"],null,[["showPip"],[["get",["subNav","showPip"]]]],0]],"locals":[]},{"statements":[["block",["link-to"],[["get",["subNav","route"]]],null,1]],"locals":[]},{"statements":[["text","            "],["append",["helper",["get"],[["get",["tra"]],["get",["subNav","traKey"]]],null],false],["text","\\n"]],"locals":[]},{"statements":[["block",["tft-sub-nav-item"],null,[["showPip"],[["get",["subNav","showPip"]]]],3]],"locals":[]},{"statements":[["block",["link-to"],[["get",["subNav","route"]],["helper",["query-params"],null,[["url"],[["get",["subNav","url"]]]]]],null,4]],"locals":[]},{"statements":[["block",["if"],[["get",["subNav","url"]]],null,5,2]],"locals":[]},{"statements":[["text","    "],["open-element","span",[]],["dynamic-attr","onclick",["helper",["action"],[["get",[null]],"subNavClicked",["get",["subNav"]]],null],null],["flush-element"],["text","\\n"],["block",["if"],[["get",["subNav","isEnabled"]]],null,6],["text","    "],["close-element"],["text","\\n"]],"locals":["subNav","index"]},{"statements":[["text","  "],["open-element","lol-uikit-navigation-bar",[]],["static-attr","type","nav-bar-secondary"],["static-attr","class","tft-sub-nav-container"],["flush-element"],["text","\\n"],["block",["each"],[["get",["subNavTabs"]]],null,7],["text","  "],["close-element"],["text","\\n"]],"locals":[]}],"hasPartials":false}',
                meta: {}
            })
        }, (e, t, n) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = void 0;
            var s = n(1),
                a = n(2);
            n(46);
            var l = s.Ember.Component.extend({
                classNames: [`${a.PLUGIN_NAME}-sub-nav-item`],
                layout: n(47),
                showPip: !1
            });
            t.default = l
        }, (e, t, n) => {
            "use strict";
            n.r(t)
        }, (e, t, n) => {
            const s = n(1).Ember;
            e.exports = s.HTMLBars.template({
                id: "70KR4773",
                block: '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-tft\\\\src\\\\app\\\\components\\\\tft-sub-nav-item\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-tft\\\\src\\\\app\\\\components\\\\tft-sub-nav-item\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-tft\\\\src\\\\app\\\\components\\\\tft-sub-nav-item\\\\index.js\\" "],["text","\\n"],["open-element","lol-uikit-navigation-item",[]],["flush-element"],["text","\\n    "],["yield","default"],["text","\\n"],["block",["if"],[["get",["showPip"]]],null,0],["close-element"]],"locals":[],"named":[],"yields":["default"],"blocks":[{"statements":[["text","        "],["open-element","div",[]],["static-attr","class","tft-sub-nav-pip-cta"],["flush-element"],["text","\\n            "],["append",["unknown",["call-to-action-pip"]],false],["text","\\n        "],["close-element"],["text","\\n"]],"locals":[]}],"hasPartials":false}',
                meta: {}
            })
        }, (e, t, n) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = void 0;
            var s = n(1),
                a = n(2);
            n(49);
            var l, o = (l = n(50)) && l.__esModule ? l : {
                default: l
            };
            const i = {
                    clickSfxPath: a.TFT_STORE_PROMO_CLICK_SFX_PATH,
                    imageActive: "",
                    imageHover: "",
                    priceRP: Number.MIN_SAFE_INTEGER,
                    hoverSfxPath: a.TFT_STORE_PROMO_HOVER_SFX_PATH,
                    itemId: "FALLBACK_ITEM_ID",
                    inventoryType: "STAR_FRAGMENTS",
                    name: "FALLBACK_SHARDS_PROMO"
                },
                r = "store-promo-fallback-active",
                c = "store-promo-fallback-hover",
                m = "default-active",
                u = "default-hover";
            var d = s.Ember.Component.extend(o.default, {
                classNames: [`${a.PLUGIN_NAME}-home`],
                classNameBindings: ["tftService.homeOverrideUrl:iframe-view"],
                layout: n(51),
                storeCatalog: null,
                regionLocale: null,
                storePromoAssets: null,
                tftService: s.Ember.inject.service("tft"),
                trovesService: s.Ember.inject.service("tftTroves"),
                teamPlannerEnabled: s.Ember.computed((() => s.TeamPlanner && s.TeamPlanner.getEnabled())),
                battlePass: s.Ember.computed.alias("tftService.battlePassV2"),
                homeFooter: s.Ember.computed.alias("battlePass.info.media.home-footer-bg"),
                playerHasBPPremium: s.Ember.computed.alias("battlePass.info.premium"),
                storePromoOfferIds: s.Ember.computed("tftService.storePromoOfferIds", "tftService.battlePassOfferIds", "tftService.tacticianPromoOfferIds", "playerHasBPPremium", (function() {
                    const e = this.get("tftService.storePromoOfferIds"),
                        t = this.get("tftService.tacticianPromoOfferIds"),
                        n = this.get("tftService.battlePassOfferIds");
                    this.get("playerHasBPPremium");
                    if (!e || !n || !t) return [];
                    const a = [n[0], e[0]],
                        l = {
                            storeOfferIds: a,
                            tacticianOfferIds: t
                        };
                    return (0, s.dataBinding)("/lol-settings", s.socket).patch("/v2/account/LCUPreferences/lol-tft", {
                        data: {
                            seenOfferIds: l
                        },
                        schemaVersion: 1
                    }), a
                })),
                fallbackStorePromoOfferIds: s.Ember.computed.alias("tftService.fallbackStorePromoOfferIds"),
                fallbackPromoData: s.Ember.computed("fallbackStorePromoOfferIds", "storeCatalog", "storePromoAssets", "regionLocale", (function() {
                    const e = {
                            ...i
                        },
                        t = this.get("regionLocale"),
                        n = this.get("storePromoAssets");
                    n && (e.imageActive = n[r] ? n[r] : n[m], e.imageHover = n[c] ? n[c] : n[u]);
                    const s = this.get("fallbackStorePromoOfferIds");
                    if (Array.isArray(s) && s.length > 0) {
                        const n = s[0],
                            a = this.get("storeCatalog");
                        if (n && a) {
                            e.itemId = n;
                            const s = a.find((e => e.offerId === n));
                            if (s) {
                                if (s.prices) {
                                    const t = s.prices.find((e => "RP" === e.currency));
                                    t && (e.priceRP = t.cost)
                                }
                                const n = s.localizations && s.localizations[t] ? s.localizations[t].name : "";
                                n && (e.name = n)
                            }
                        }
                    }
                    return e
                })),
                _isValidStorePromoItem(e, t) {
                    if (!e) return !1;
                    const n = e.inventoryType,
                        s = e.itemId,
                        a = e.prices.find((e => "RP" === e.currency)),
                        l = e.localizations && e.localizations[t] ? e.localizations[t].name : "";
                    return !!(null != n && null != s && null != a && null != l) && {
                        inventoryType: n,
                        itemId: s,
                        priceRP: a,
                        name: l
                    }
                },
                storePromosData: s.Ember.computed("fallbackPromoData", "storePromoOfferIds", "storeCatalog", "regionLocale", "storePromoAssets", (function() {
                    const e = this.get("storeCatalog"),
                        t = this.get("storePromoAssets");
                    if (!e || !t) {
                        const e = this.get("fallbackPromoData");
                        return [e, e]
                    }
                    return this.get("storePromoOfferIds").map((n => {
                        const s = e.find((e => e.offerId === n)),
                            l = this.get("regionLocale"),
                            o = this._isValidStorePromoItem(s, l);
                        if (o) {
                            const e = `${n}-hover`,
                                s = `${n}-active`,
                                l = t[s] ? t[s] : t[m],
                                i = t[e] ? t[e] : t[u],
                                {
                                    inventoryType: r,
                                    itemId: c,
                                    priceRP: d,
                                    name: p
                                } = o;
                            return {
                                clickSfxPath: a.TFT_STORE_PROMO_CLICK_SFX_PATH,
                                hoverSfxPath: a.TFT_STORE_PROMO_HOVER_SFX_PATH,
                                imageActive: l,
                                imageHover: i,
                                inventoryType: r,
                                itemId: c,
                                priceRP: d.cost,
                                name: p
                            }
                        }
                        return this.get("fallbackPromoData")
                    }))
                })),
                tacticianPromoOfferId: s.Ember.computed("tftService.tacticianPromoOfferIds", (function() {
                    const e = this.get("tftService.tacticianPromoOfferIds");
                    return e ? e[0] : null
                })),
                tacticianPromo: s.Ember.computed.alias("trovesService.troveActiveBanners"),
                tacticianPromoData: s.Ember.computed("tacticianPromoOfferId", "storeCatalog", "regionLocale", "storePromoAssets", "tacticianPromo", (function() {
                    const e = this.get("tacticianPromoOfferId"),
                        t = this.get("storeCatalog"),
                        n = this.get("storePromoAssets");
                    if (t) {
                        const s = t.find((t => t.offerId === e)),
                            l = this.get("regionLocale"),
                            o = this._isValidStorePromoItem(s, l);
                        if (o) {
                            const t = e + "-hover",
                                s = e + "-active",
                                {
                                    inventoryType: l,
                                    itemId: i,
                                    priceRP: r,
                                    name: c
                                } = o;
                            return {
                                clickSfxPath: a.TFT_BUTTON_CLICK_SFX_PATH,
                                hoverSfxPath: a.TFT_TACTICIAN_HOVER_SFX_PATH,
                                imageActive: n ? n[s] : "",
                                imageHover: n ? n[t] : "",
                                inventoryType: l,
                                itemId: i,
                                priceRP: r.cost,
                                name: c
                            }
                        }
                    }
                    const s = this.get("tacticianPromo");
                    if (s) {
                        const t = s.find((t => t.sourceId === e || t.id === e));
                        if (t) {
                            const s = e + "-hover",
                                l = e + "-active";
                            return {
                                clickSfxPath: a.TFT_BUTTON_CLICK_SFX_PATH,
                                hoverSfxPath: a.TFT_TACTICIAN_HOVER_SFX_PATH,
                                imageActive: n ? n[l] : "",
                                imageHover: n ? n[s] : "",
                                inventoryType: "troves",
                                itemId: t.id,
                                name: t.name
                            }
                        }
                    }
                    return {
                        clickSfxPath: a.TFT_BUTTON_CLICK_SFX_PATH,
                        imageActive: n ? n["tactician-promo-fallback-active"] : "",
                        imageHover: n ? n["tactician-promo-fallback-hover"] : "",
                        hoverSfxPath: a.TFT_TACTICIAN_HOVER_SFX_PATH,
                        inventoryType: "COMPANION",
                        itemId: "FALLBACK_TACTICIAN_ID"
                    }
                })),
                primeGamingPromoOffer: s.Ember.computed.alias("tftService.primeGamingPromoOffer"),
                primeGamingPromoOfferData: s.Ember.computed("primeGamingPromoOffer", "storePromoAssets", (function() {
                    const e = this.get("primeGamingPromoOffer"),
                        t = this.get("storePromoAssets");
                    if (t && e) {
                        const n = e.assetId,
                            s = e.url,
                            l = n + "-hover",
                            o = n + "-active";
                        return {
                            clickSfxPath: a.TFT_STORE_PROMO_CLICK_SFX_PATH,
                            hoverSfxPath: a.TFT_STORE_PROMO_HOVER_SFX_PATH,
                            imageActive: t[o],
                            imageHover: t[l],
                            inventoryType: "primeGaming",
                            itemId: n,
                            name: "PrimeGaming",
                            primeGamingUrl: s
                        }
                    }
                    return null
                })),
                isLoading: s.Ember.computed("storePromosData", "tacticianPromoData", (function() {
                    const e = this.get("storePromosData"),
                        t = this.get("tacticianPromoData");
                    return e.length < 2 || !t || !e[0]
                })),
                didInsertElement() {
                    this._super(...arguments);
                    const e = this.element.querySelector(".team-planner-button-container");
                    e && (this.addPlaySound(e, "mousedown", a.TFT_TEAM_PLANNER_BUTTON_DOWN_SFX_PATH), this.addPlaySound(e, "mouseenter", a.TFT_TEAM_PLANNER_BUTTON_HOVER_SFX_PATH))
                },
                willDestroyElement() {
                    this._super(...arguments);
                    const e = this.element.querySelector("lol-parties-series-button.tft-missions-button");
                    null != e && (this.removeSound(e, "mouseenter"), this.removeSound(e, "click"));
                    const t = this.element.querySelector(".team-planner-button-container");
                    null != t && (this.removeSound(t, "mousedown"), this.removeSound(t, "mouseenter"))
                },
                actions: {
                    showTeamPlanner() {
                        s.TeamPlanner && s.TeamPlanner.show("tft-home")
                    }
                },
                isHidden: s.Ember.computed.alias("tftService.isHidden"),
                audioManager: s.Ember.computed("tftService", (function() {
                    return this.get("tftService").getTftAudioManager()
                })),
                teamPlannerButtonAssets: s.Ember.computed.alias("tftService.teamPlannerButtonAssets")
            });
            t.default = d
        }, (e, t, n) => {
            "use strict";
            n.r(t)
        }, (e, t, n) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = void 0;
            var s = n(1),
                a = n(2);
            const l = s.Audio.getChannel(a.SOUND_UX_CHANNEL);
            var o = s.Ember.Mixin.create({
                init() {
                    this._super(...arguments), this.listenersByEvents = new Map, this.soundMap = new Map
                },
                willDestroy() {
                    this._super(...arguments), this.listenersByEvents.clear(), this.soundMap.forEach((e => {
                        e.isPlaying() && e.stop()
                    })), this.soundMap.clear()
                },
                loopIsPlaying: !1,
                shouldPlay: !0,
                soundFile: null,
                disableProperty: null,
                debounceSoundLoop: function(e, t, n) {
                    this.set("shouldPlay", e), this.set("soundFile", t), this.set("disableProperty", n), s.Ember.run.debounce(this, this.handleSoundLoop, 150)
                },
                playSound(e, t) {
                    t && this.get(t) || l.playSound(e)
                },
                playSoundLoop(e, t) {
                    if (t && this.get(t)) return;
                    if (this.get("loopIsPlaying")) return;
                    const n = l.createSound(e, {
                        isLoop: !0
                    });
                    this.soundMap.set(e, n), n.play(), this.set("loopIsPlaying", !0)
                },
                stopSoundLoop(e) {
                    const t = this.soundMap.get(e);
                    t && this.get("loopIsPlaying") && (t.isPlaying() && t.stop(), this.set("loopIsPlaying", !1))
                },
                handleSoundLoop: function() {
                    const e = this.get("shouldPlay"),
                        t = this.get("soundFile"),
                        n = this.get("disableProperty");
                    e ? this.playSoundLoop(t, n) : this.stopSoundLoop(t)
                },
                addListenerToMap(e, t, n) {
                    if (this.listenersByEvents.has(e)) {
                        const s = this.listenersByEvents.get(e);
                        if (s.has(t)) {
                            s.get(t).push(n)
                        } else s.set(t, [n])
                    } else this.listenersByEvents.set(e, new Map([
                        [t, [n]]
                    ]))
                },
                addPlaySound(e, t, n, s) {
                    const a = this.playSound.bind(this, n, s);
                    this.addListenerToMap(t, e, a), e.addEventListener(t, a)
                },
                addPlaySoundLoop(e, t, n, s) {
                    const a = this.debounceSoundLoop.bind(this, !0, n, s);
                    this.addListenerToMap(t, e, a), e.addEventListener(t, a)
                },
                addStopSoundLoop(e, t, n) {
                    const s = this.debounceSoundLoop.bind(this, !1, n, null);
                    this.addListenerToMap(t, e, s), e.addEventListener(t, s)
                },
                removeSound(e, t) {
                    const n = this.listenersByEvents.get(t).get(e);
                    n && n.length && n.forEach((n => {
                        e.removeEventListener(t, n), n = null
                    }))
                }
            });
            t.default = o
        }, (e, t, n) => {
            const s = n(1).Ember;
            e.exports = s.HTMLBars.template({
                id: "86vC6PAB",
                block: '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-tft\\\\src\\\\app\\\\components\\\\tft-home\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-tft\\\\src\\\\app\\\\components\\\\tft-home\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-tft\\\\src\\\\app\\\\components\\\\tft-home\\\\index.js\\" "],["text","\\n"],["block",["if"],[["get",["tftService","homeOverrideUrl"]]],null,8,7]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","    "],["open-element","div",[]],["static-attr","class","tft-prime-promo-wrapper"],["flush-element"],["text","\\n      "],["append",["helper",["tft-prime-promo"],null,[["storePromoData"],[["get",["primeGamingPromoOfferData"]]]]],false],["text","\\n    "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","  "],["open-element","lol-parties-series-button",[]],["static-attr","class","tft-missions-button"],["static-attr","series","TFTBattlepass_Weeklies_Series"],["static-attr","type","simple"],["static-attr","outerRadius","58px"],["static-attr","innerRadius","50px"],["flush-element"],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","  "],["open-element","div",[]],["static-attr","class","tft-missions-button"],["flush-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","team-planner-button-container"],["modifier",["action"],[["get",[null]],"showTeamPlanner"]],["flush-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","team-planner-button-container__button"],["flush-element"],["text","\\n        "],["open-element","div",[]],["static-attr","class","team-planner-button-container__button-icon"],["dynamic-attr","style",["concat",["--team-planner-button-icon-default: url(\'",["unknown",["teamPlannerButtonAssets","team-planner-icon-home"]],"\');\\n                 --team-planner-button-icon-clicked: url(\'",["unknown",["teamPlannerButtonAssets","team-planner-icon-clicked"]],"\');"]]],["flush-element"],["text","\\n        "],["close-element"],["text","\\n      "],["close-element"],["text","\\n    "],["close-element"],["text","\\n  "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","    "],["append",["helper",["tft-store-promo"],null,[["storePromoData"],[["get",["data"]]]]],false],["text","\\n"]],"locals":["data"]},{"statements":[["block",["each"],[["get",["storePromosData"]]],null,3]],"locals":[]},{"statements":[["text","  "],["open-element","div",[]],["static-attr","class","tft-store-promos-wrapper"],["flush-element"],["text","\\n"],["block",["if"],[["get",["storePromosData"]]],null,4],["text","  "],["close-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","tft-tactician-promo-wrapper"],["flush-element"],["text","\\n    "],["append",["helper",["tft-tactician-promo"],null,[["storePromoData"],[["get",["tacticianPromoData"]]]]],false],["text","\\n  "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","  "],["open-element","div",[]],["static-attr","class","tft-home-spinner"],["flush-element"],["text","\\n    "],["append",["unknown",["uikit-spinner"]],false],["text","\\n  "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["open-element","div",[]],["static-attr","class","tft-home"],["flush-element"],["text","\\n"],["block",["if"],[["get",["isLoading"]]],null,6,5],["text","  "],["open-element","div",[]],["static-attr","class","tft-home-footer-bg"],["dynamic-attr","style",["concat",["background-image: url(",["unknown",["homeFooter"]],")"]]],["flush-element"],["text","\\n  "],["close-element"],["text","\\n"],["block",["if"],[["get",["teamPlannerEnabled"]]],null,2,1],["text","  "],["open-element","div",[]],["static-attr","class","tft-quick-play-wrapper"],["flush-element"],["text","\\n    "],["append",["unknown",["tft-quick-play"]],false],["text","\\n  "],["close-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","tft-events-promo-wrapper"],["flush-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","tft-event-promo"],["flush-element"],["text","\\n      "],["append",["unknown",["tft-event-promo"]],false],["text","\\n    "],["close-element"],["text","\\n"],["block",["if"],[["get",["primeGamingPromoOfferData"]]],null,0],["text","  "],["close-element"],["text","\\n"],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","    "],["append",["helper",["managed-iframe"],null,[["url","isHidden","audioManager"],[["get",["tftService","homeOverrideUrl"]],["get",["isHidden"]],["get",["audioManager"]]]]],false],["text","\\n"]],"locals":[]}],"hasPartials":false}',
                meta: {}
            })
        }, (e, t, n) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = void 0;
            var s = n(1),
                a = n(2);
            n(53);
            var l, o = (l = n(50)) && l.__esModule ? l : {
                default: l
            };
            var i = s.Ember.Component.extend(o.default, {
                classNames: [`${a.PLUGIN_NAME}-button`],
                layout: n(54),
                iconImageURL: null,
                iconRadius: "13px",
                outerCircleRadius: "32px",
                hasArrowEdge: !1,
                didInsertElement() {
                    this._super(...arguments);
                    const e = this.element;
                    this.addPlaySound(e, "mouseenter", a.TFT_BUTTON_HOVER_SFX_PATH), this.addPlaySound(e, "click", a.TFT_BUTTON_CLICK_SFX_PATH)
                },
                willDestroyElement() {
                    this._super(...arguments);
                    const e = this.element;
                    this.removeSound(e, "mouseenter"), this.removeSound(e, "click")
                },
                actions: {
                    click: function() {
                        this.sendAction()
                    }
                }
            });
            t.default = i
        }, (e, t, n) => {
            "use strict";
            n.r(t)
        }, (e, t, n) => {
            const s = n(1).Ember;
            e.exports = s.HTMLBars.template({
                id: "TTDZSXy/",
                block: '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-tft\\\\src\\\\app\\\\components\\\\tft-button\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-tft\\\\src\\\\app\\\\components\\\\tft-button\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-tft\\\\src\\\\app\\\\components\\\\tft-button\\\\index.js\\" "],["text","\\n"],["open-element","div",[]],["dynamic-attr","class",["concat",[["helper",["if"],[["get",["hasArrowEdge"]],"tft-button-arrow","tft-button-no-arrow"],null]]]],["flush-element"],["text","\\n"],["block",["if"],[["get",["hasArrowEdge"]]],null,0],["text","  "],["open-element","div",[]],["static-attr","class","tft-button-border"],["flush-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","tft-button-container"],["modifier",["action"],[["get",[null]],"click"]],["flush-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","tft-button-label"],["flush-element"],["yield","default"],["close-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","tft-button"],["dynamic-attr","style",["concat",["--icon-radius: ",["unknown",["iconRadius"]],"; --outer-circle-radius: ",["unknown",["outerCircleRadius"]]]]],["flush-element"],["text","\\n        "],["open-element","img",[]],["dynamic-attr","src",["unknown",["iconImageURL"]],null],["static-attr","class","tft-button-icon"],["flush-element"],["close-element"],["text","\\n      "],["close-element"],["text","\\n    "],["close-element"],["text","\\n  "],["close-element"],["text","\\n"],["close-element"]],"locals":[],"named":[],"yields":["default"],"blocks":[{"statements":[["text","    "],["open-element","div",[]],["static-attr","class","tft-button-arrow-border"],["flush-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","tft-button-arrow-container"],["flush-element"],["close-element"],["text","\\n    "],["close-element"],["text","\\n"]],"locals":[]}],"hasPartials":false}',
                meta: {}
            })
        }, (e, t, n) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = void 0;
            var s = n(1),
                a = n(2);
            n(56);
            var l = s.Ember.Component.extend({
                classNames: [`${a.PLUGIN_NAME}-news`],
                classNameBindings: ["showManagedIframe:iframe-view:cards-view"],
                layout: n(57),
                publishingService: s.Ember.inject.service("publishing"),
                tftService: s.Ember.inject.service("tft"),
                isHidden: s.Ember.computed.alias("tftService.isHidden"),
                audioManager: s.Ember.computed("tftService", (function() {
                    return this.get("tftService").getTftAudioManager()
                })),
                newsCards: s.Ember.computed("publishingService", (function() {
                    const e = this.get("publishingService");
                    return e.pcsChannelData ? {
                        main: e.pcsChannelData.contentGroups[0].items.slice(-2),
                        footer: e.pcsChannelData.contentGroups[0].items.slice(0, 4)
                    } : {
                        main: [],
                        footer: []
                    }
                })),
                hasMultipleMainCards: s.Ember.computed("newsCards", (function() {
                    return this.get("newsCards").main.length > 1
                })),
                showManagedIframe: s.Ember.computed("tftService.newsUrl", (function() {
                    return "" !== this.get("tftService.newsUrl")
                }))
            });
            t.default = l
        }, (e, t, n) => {
            "use strict";
            n.r(t)
        }, (e, t, n) => {
            const s = n(1).Ember;
            e.exports = s.HTMLBars.template({
                id: "C6kUWZK6",
                block: '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-tft\\\\src\\\\app\\\\components\\\\tft-news\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-tft\\\\src\\\\app\\\\components\\\\tft-news\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-tft\\\\src\\\\app\\\\components\\\\tft-news\\\\index.js\\" "],["text","\\n"],["block",["if"],[["get",["showManagedIframe"]]],null,7,5]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","    "],["open-element","div",[]],["static-attr","class","spinner-container"],["flush-element"],["text","\\n        "],["append",["helper",["uikit-spinner"],null,[["width","height"],["50px","50px"]]],false],["text","\\n    "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","    "],["append",["helper",["uikit-error-page"],null,[["contentText"],[["get",["tra","publishing_content_failure"]]]]],false],["text","\\n"]],"locals":[]},{"statements":[["block",["if"],[["get",["publishingService","fetchFailed"]]],null,1,0]],"locals":[]},{"statements":[["text","                "],["open-element","div",[]],["static-attr","class","main-card"],["flush-element"],["text","\\n                    "],["open-element","p",[]],["static-attr","class","main-card-title"],["flush-element"],["append",["unknown",["card","title"]],false],["close-element"],["text","\\n                    "],["append",["helper",["pcs-card"],null,[["data","showTitle"],[["get",["card"]],false]]],false],["text","\\n                "],["close-element"],["text","\\n"]],"locals":["card"]},{"statements":[["text","    "],["open-element","div",[]],["static-attr","class","news-cards-fallback"],["flush-element"],["text","\\n        "],["open-element","main",[]],["dynamic-attr","class",["concat",["news-cards-main ",["helper",["if"],[["get",["hasMultipleMainCards"]],"multiple-cards"],null]]]],["flush-element"],["text","\\n"],["block",["each"],[["get",["newsCards","main"]]],null,3],["text","        "],["close-element"],["text","\\n\\n        "],["append",["helper",["pcs-cards-row"],null,[["channelData"],[["get",["newsCards","footer"]]]]],false],["text","\\n    "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["block",["if"],[["get",["publishingService","tftCardsReadyToShow"]]],null,4,2]],"locals":[]},{"statements":[["text","    "],["append",["helper",["managed-iframe"],null,[["url","isHidden","audioManager"],[["get",["tftService","newsUrl"]],["get",["isHidden"]],["get",["audioManager"]]]]],false],["text","\\n"]],"locals":[]},{"statements":[["block",["unless"],[["get",["isHidden"]]],null,6]],"locals":[]}],"hasPartials":false}',
                meta: {}
            })
        }, (e, t, n) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = void 0;
            var s = n(1),
                a = n(2);
            n(59);
            var l, o = (l = n(60)) && l.__esModule ? l : {
                default: l
            };
            var i = s.Ember.Component.extend(o.default, {
                classNames: [`${a.PLUGIN_NAME}-store-promo`],
                layout: n(61)
            });
            t.default = i
        }, (e, t, n) => {
            "use strict";
            n.r(t)
        }, (e, t, n) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = void 0;
            var s, a = n(1),
                l = (s = n(50)) && s.__esModule ? s : {
                    default: s
                },
                o = n(2);
            const i = {
                COMPANION: "companions",
                HEXTECH_CRAFTING: "hextech",
                STAR_FRAGMENTS: "star_fragments",
                TFT_MAP_SKIN: "tft_map_skins"
            };
            var r = a.Ember.Mixin.create(l.default, {
                tftService: a.Ember.inject.service("tft"),
                storePromoData: null,
                storePromoImageHover: a.Ember.computed("storePromoData", (function() {
                    return this.get("storePromoData") ? this.get("storePromoData.imageHover") : null
                })),
                storePromoImageActive: a.Ember.computed("storePromoData", (function() {
                    return this.get("storePromoData") ? this.get("storePromoData.imageActive") : null
                })),
                storePromoInventoryType: a.Ember.computed("storePromoData", (function() {
                    return this.get("storePromoData") ? this.get("storePromoData.inventoryType") : null
                })),
                storePromoItemId: a.Ember.computed("storePromoData", (function() {
                    return this.get("storePromoData") ? this.get("storePromoData.itemId") : null
                })),
                storePromoPriceRP: a.Ember.computed("storePromoData", (function() {
                    return this.get("storePromoData") ? this.get("storePromoData.priceRP") : null
                })),
                shouldShowStorePromoPriceRP: a.Ember.computed("storePromoPriceRP", "storePromoInventoryType", (function() {
                    return "primeGaming" !== this.get("storePromoInventoryType") && (this.get("storePromoPriceRP") >= 0 && "troves" !== this.get("storePromoInventoryType"))
                })),
                storePromoName: a.Ember.computed("storePromoData", (function() {
                    return this.get("storePromoData") ? this.get("storePromoData.name") : null
                })),
                primeGamingUrl: a.Ember.computed.alias("storePromoData.primeGamingUrl"),
                linkToTrove: a.Ember.computed.equal("storePromoInventoryType", "troves"),
                didInsertElement() {
                    this._super(...arguments);
                    const e = this.element;
                    if (this.get("storePromoData")) {
                        const t = this.get("storePromoData.clickSfxPath"),
                            n = this.get("storePromoData.hoverSfxPath");
                        this.addPlaySound(e, "mouseenter", n), this.addPlaySound(e, "click", t)
                    }
                },
                willDestroyElement() {
                    this._super(...arguments);
                    const e = this.element;
                    this.removeSound(e, "mouseenter"), this.removeSound(e, "click")
                },
                actions: {
                    storePromoClicked: function() {
                        const e = this.get("storePromoInventoryType"),
                            t = this.get("storePromoItemId");
                        a.Telemetry.sendCustomData(o.DEFAULT_TELEMETRY_TABLE, {
                            eventName: o.TELEMETRY_TFT_STORE_PROMO_CLICKED,
                            inventoryType: e,
                            itemId: t
                        });
                        let n = i.COMPANION;
                        "HEXTECH_CRAFTING" === e ? n = i.COMPANION : e in i && (n = i[e]), a.Router.navigateTo("rcp-fe-lol-store", {
                            page: n,
                            items: [{
                                inventoryType: e,
                                itemId: t
                            }]
                        })
                    },
                    primePromoClicked: function() {
                        if (this.get("primeGamingUrl")) {
                            a.dataBinding.bindTo(a.socket).post("/lol-tft/v1/tft/homeHub/redirect")
                        }
                    }
                }
            });
            t.default = r
        }, (e, t, n) => {
            const s = n(1).Ember;
            e.exports = s.HTMLBars.template({
                id: "o7AqDypV",
                block: '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-tft\\\\src\\\\app\\\\components\\\\tft-store-promo\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-tft\\\\src\\\\app\\\\components\\\\tft-store-promo\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-tft\\\\src\\\\app\\\\components\\\\tft-store-promo\\\\index.js\\" "],["text","\\n"],["open-element","div",[]],["static-attr","class","tft-store-promo"],["modifier",["action"],[["get",[null]],"storePromoClicked"]],["flush-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","tft-store-promo-img"],["flush-element"],["text","\\n    "],["open-element","img",[]],["dynamic-attr","src",["unknown",["storePromoImageActive"]],null],["flush-element"],["close-element"],["text","\\n    "],["open-element","img",[]],["dynamic-attr","src",["unknown",["storePromoImageHover"]],null],["static-attr","class","tft-store-promo-img-hover"],["flush-element"],["close-element"],["text","\\n  "],["close-element"],["text","\\n\\n"],["block",["if"],[["get",["shouldShowStorePromoPriceRP"]]],null,0],["close-element"]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","    "],["open-element","div",[]],["static-attr","class","tft-store-promo-price"],["flush-element"],["text","\\n      "],["open-element","img",[]],["static-attr","src","/fe/lol-static-assets/images/icon-rp-32.png"],["static-attr","class","tft-rp-icon"],["flush-element"],["close-element"],["text","\\n      "],["append",["unknown",["storePromoPriceRP"]],false],["text","\\n    "],["close-element"],["text","\\n"]],"locals":[]}],"hasPartials":false}',
                meta: {}
            })
        }, (e, t, n) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = void 0;
            var s = n(1),
                a = n(2);
            n(63);
            var l, o = (l = n(60)) && l.__esModule ? l : {
                default: l
            };
            var i = s.Ember.Component.extend(o.default, {
                classNames: [`${a.PLUGIN_NAME}-prime-promo`],
                layout: n(64),
                tftService: s.Ember.inject.service("tft"),
                primeGamingPromoOffer: s.Ember.computed.alias("tftService.primeGamingPromoOffer")
            });
            t.default = i
        }, (e, t, n) => {
            "use strict";
            n.r(t)
        }, (e, t, n) => {
            const s = n(1).Ember;
            e.exports = s.HTMLBars.template({
                id: "5nQYayyX",
                block: '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-tft\\\\src\\\\app\\\\components\\\\tft-prime-promo\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-tft\\\\src\\\\app\\\\components\\\\tft-prime-promo\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-tft\\\\src\\\\app\\\\components\\\\tft-prime-promo\\\\index.js\\" "],["text","\\n"],["block",["if"],[["get",["primeGamingPromoOffer"]]],null,0]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["open-element","div",[]],["static-attr","class","tft-prime-promo"],["flush-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","tft-prime-promo-img"],["dynamic-attr","onclick",["helper",["action"],[["get",[null]],"primePromoClicked"],null],null],["flush-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","tft-prime-gaming-claim-now-label"],["flush-element"],["append",["unknown",["tra","tft_home_prime_gaming_claim_now"]],false],["close-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","tft-prime-gaming-rewards-label"],["flush-element"],["append",["unknown",["tra","tft_home_prime_gaming_rewards"]],false],["close-element"],["text","\\n  "],["close-element"],["text","\\n  "],["open-element","img",[]],["dynamic-attr","src",["unknown",["storePromoImageActive"]],null],["static-attr","class","tft-prime-promo-img-main"],["flush-element"],["close-element"],["text","\\n  "],["open-element","img",[]],["dynamic-attr","src",["unknown",["storePromoImageHover"]],null],["static-attr","class","tft-prime-promo-img-hover"],["flush-element"],["close-element"],["text","\\n"],["close-element"],["text","\\n"]],"locals":[]}],"hasPartials":false}',
                meta: {}
            })
        }, (e, t, n) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = void 0;
            var s = n(1),
                a = n(2);
            n(66);
            var l, o = (l = n(60)) && l.__esModule ? l : {
                default: l
            };
            var i = s.Ember.Component.extend(o.default, {
                classNames: [`${a.PLUGIN_NAME}-tactician-promo`],
                layout: n(67)
            });
            t.default = i
        }, (e, t, n) => {
            "use strict";
            n.r(t)
        }, (e, t, n) => {
            const s = n(1).Ember;
            e.exports = s.HTMLBars.template({
                id: "qOnJRg6E",
                block: '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-tft\\\\src\\\\app\\\\components\\\\tft-tactician-promo\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-tft\\\\src\\\\app\\\\components\\\\tft-tactician-promo\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-tft\\\\src\\\\app\\\\components\\\\tft-tactician-promo\\\\index.js\\" "],["text","\\n"],["open-element","div",[]],["static-attr","class","tft-tactician-promo"],["flush-element"],["text","\\n"],["block",["if"],[["get",["linkToTrove"]]],null,6,4],["text","\\n"],["block",["if"],[["get",["shouldShowStorePromoPriceRP"]]],null,3],["text","\\n  "],["open-element","img",[]],["dynamic-attr","src",["unknown",["storePromoImageActive"]],null],["static-attr","class","tft-tactician-promo-img-main"],["flush-element"],["close-element"],["text","\\n  "],["open-element","img",[]],["dynamic-attr","src",["unknown",["storePromoImageHover"]],null],["static-attr","class","tft-tactician-promo-img-hover"],["flush-element"],["close-element"],["text","\\n\\n"],["block",["if"],[["get",["linkToTrove"]]],null,1,0],["close-element"]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","    "],["open-element","div",[]],["static-attr","class","tft-tactician-promo-label"],["flush-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","tft-tactician-promo-name"],["flush-element"],["text","\\n        "],["append",["unknown",["storePromoName"]],false],["text","\\n      "],["close-element"],["text","\\n    "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","    "],["open-element","div",[]],["static-attr","class","tft-troves-promo-label"],["flush-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","tft-troves-promo-name"],["flush-element"],["text","\\n        "],["append",["unknown",["storePromoName"]],false],["text","\\n      "],["close-element"],["text","\\n    "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","        "],["open-element","div",[]],["static-attr","class","tft-tactician-promo-price-label"],["flush-element"],["text","\\n          "],["open-element","img",[]],["static-attr","src","/fe/lol-static-assets/images/icon-rp-32.png"],["static-attr","class","tft-rp-icon"],["flush-element"],["close-element"],["text","\\n          "],["open-element","div",[]],["static-attr","class","tft-tactician-promo-price"],["flush-element"],["text","\\n            "],["append",["unknown",["storePromoPriceRP"]],false],["text","\\n          "],["close-element"],["text","\\n        "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","    "],["open-element","div",[]],["static-attr","class","tft-tactician-promo-price-wrapper"],["flush-element"],["text","\\n"],["block",["tft-button"],null,[["iconImageURL","action","iconRadius"],["/fe/lol-tft/images/home/TFT_Icon_Arrow.png","storePromoClicked","18px"]],2],["text","    "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","    "],["open-element","div",[]],["static-attr","class","tft-tactician-promo-img"],["modifier",["action"],[["get",[null]],"storePromoClicked"]],["flush-element"],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","      "],["open-element","div",[]],["static-attr","class","tft-tactician-promo-img"],["flush-element"],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["block",["link-to"],["troves",["helper",["query-params"],null,[["displayedBannerId"],[["get",["storePromoItemId"]]]]]],null,5]],"locals":[]}],"hasPartials":false}',
                meta: {}
            })
        }, (e, t, n) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = void 0;
            var s = n(1),
                a = n(2);
            n(69);
            var l, o = (l = n(50)) && l.__esModule ? l : {
                default: l
            };
            var i = s.Ember.Component.extend(o.default, {
                classNameBindings: ["getClassNames"],
                getClassNames: s.Ember.computed("buttonClassName", (function() {
                    return "event-play" === this.get("buttonClassName") ? `${a.PLUGIN_NAME}-event-play` : `${a.PLUGIN_NAME}-quick-play`
                })),
                layout: n(70),
                summonerService: s.Ember.inject.service("summoner"),
                tftService: s.Ember.inject.service("tft"),
                queueService: s.Ember.inject.service("queue"),
                playButtonService: s.Ember.inject.service("play-button"),
                patcherService: s.Ember.inject.service("patcher"),
                ModalManager: s.UIKit.getModalManager(),
                buttonClassName: "quick-play",
                queueIdOverride: null,
                quickPlayFontSize: 20,
                isPlayButtonDisabled: s.Ember.computed.not("playButtonService.isButtonEnabled"),
                isPatching: s.Ember.computed("patcherService.currentPatchIsGame", "patcherService.patcherState", (function() {
                    return this.get("patcherService.currentPatchIsGame") && "patching" === this.get("patcherService.patcherState")
                })),
                inLobby: s.Ember.computed.alias("queueService.inLobby"),
                isLobbyLeader: s.Ember.computed.alias("queueService.isLobbyLeader"),
                isNotLobbyLeader: s.Ember.computed((function() {
                    return this.get("inLobby") && !this.get("isLobbyLeader")
                })),
                quickPlayDisabled: s.Ember.computed.or("isPlayButtonDisabled", "isPatching", "isNotLobbyLeader"),
                lastTftGameQueueId: s.Ember.computed.alias("tftService.lastTftGameQueueId"),
                availableQueueIds: s.Ember.computed((function() {
                    return s.Parties.getAvailableQueueIds(a.TFT_GAME_QUEUES_CATEGORY, a.TFT_MAP_ID, a.TFT_GAME_MODE)
                })),
                quickPlayGameModeQueueId: s.Ember.computed("lastTftGameQueueId", "queueIdOverride", "availableQueueIds", (function() {
                    const e = this.get("queueIdOverride"),
                        t = this.get("availableQueueIds");
                    let n = null;
                    return n = e || this.get("lastTftGameQueueId"), n && t.includes(n) ? n : a.TFT_NORMAL_QUEUE_ID
                })),
                queues: s.Ember.computed.alias("queueService.queues"),
                quickPlayGameModeName: s.Ember.computed("quickPlayGameModeQueueId", "queues", (function() {
                    const e = this.get("quickPlayGameModeQueueId"),
                        t = this.get("queues"),
                        n = e && Array.isArray(t) ? t.find((t => t.id === e)) : null;
                    return n ? n.description : ""
                })),
                showTooltip: s.Ember.computed.alias("quickPlayDisabled"),
                tooltipText: s.Ember.computed("isNotLobbyLeader", "isPlayButtonDisabled", "isPatching", "playButtonService.isPlayGameflowEnabled", "playButtonService.isAtLeastOneQueueEnabled", "playButtonService.isPlayerBanned", "playButtonService.isShowingTournaments", "playButtonService.isEligibilityInfoMissing", "playButtonService.gameflowRegistrationStatus", "playButtonService.gameflowRegistrationStatus.errorCodes.[]", "tra", "playerBannedToolTipText", (function() {
                    if (this.get("isNotLobbyLeader")) return this.get("tra.tft_home_quick_play_not_leader_error");
                    if (this.get("isPatching")) return this.get("tra.parties_game_select_patching_error");
                    if (this.get("playButtonService.isPlayerBanned")) return this.get("playerBannedTooltipText");
                    if (this.get("playButtonService.isEligibilityInfoMissing")) {
                        const e = this.get("playButtonService.gameflowRegistrationStatus");
                        if (e) {
                            const t = {
                                errorCodes: e.errorCodes.join(", ")
                            };
                            return e.errorCodes.length > 1 ? this.get("tra").formatString("patcher_gameflow_bad_registration_plural", t) : this.get("tra").formatString("patcher_gameflow_bad_registration_single", t)
                        }
                    } else {
                        if (this.get("playButtonService.isShowingTournaments")) return this.get("tra.patcher_player_in_tournament");
                        if (!this.get("playButtonService.isPlayGameflowEnabled")) return this.get("tra.patcher_gameflow_disabled");
                        if (!this.get("playButtonService.isAtLeastOneQueueEnabled")) return this.get("tra.patcher_no_queues")
                    }
                    return this.get("tra.patcher_disconnected")
                })),
                playerBannedTooltipText: s.Ember.computed("playButtonService.isPlayerPermabanned", "playButtonService.banTimeRemaining", "tra", (function() {
                    if (this.get("playButtonService.isPlayerPermaBanned")) return this.get("tra.patcher_player_banned");
                    {
                        const e = Math.ceil(this.get("playButtonService.banTimeRemaining") / 864e5);
                        return e > 0 ? this.get("tra").formatString("patcher_player_time_banned", {
                            days: e
                        }) : this.get("tra.patcher_player_banned")
                    }
                })),
                showQuickPlayErrorModal: function(e, t, n) {
                    const s = this.get("tra.parties_game_select_error_modal_ok"),
                        a = this.get("ModalManager").add({
                            type: "DialogAlert",
                            data: {
                                contents: e,
                                okText: s
                            }
                        });
                    return a && a.domNode && n && a.domNode.classList.add(n), t && a && a.okPromise && a.okPromise.then((() => {
                        t()
                    })), a
                },
                quickPlayErrorHandler: function(e) {
                    s.logger.error("quickPlay error", e), this.showQuickPlayErrorModal(this.get("tra.parties_game_select_confirm_error"))
                },
                didInsertElement() {
                    this._super(...arguments);
                    const e = this.element.querySelector("button.quick-play-button-btn");
                    this.addPlaySound(e, "mouseenter", a.QUICK_PLAY_HOVER_SFX_PATH, "quickPlayDisabled"), this.addPlaySound(e, "click", a.QUICK_PLAY_CLICK_SFX_PATH, "quickPlayDisabled"), this.resolveQuickPlayTextWidth()
                },
                willDestroyElement() {
                    this._super(...arguments);
                    const e = this.element.querySelector("button.quick-play-button-btn");
                    this.removeSound(e, "mouseenter"), this.removeSound(e, "click")
                },
                resolveQuickPlayTextWidth() {
                    const e = this.element.querySelector(".quick-play-button-label");
                    for (; Math.ceil(e.getBoundingClientRect().width) > 140;) {
                        const t = this.get("quickPlayFontSize");
                        this.set("quickPlayFontSize", t - 1), e.style.fontSize = t - 1 + "px"
                    }
                },
                createQuickPlayLobby() {
                    return s.Parties.createLobby(this.get("quickPlayGameModeQueueId")).then((() => {
                        s.Parties.showParty().catch((e => {
                            this.quickPlayErrorHandler(e)
                        }))
                    })).catch((e => {
                        this.quickPlayErrorHandler(e)
                    }))
                },
                actions: {
                    quickPlayButtonClicked: function() {
                        this.get("quickPlayDisabled") ? s.logger.info("playButtonService.isPatching", this.get("playButtonService.isPatching")) : this.createQuickPlayLobby()
                    }
                }
            });
            t.default = i
        }, (e, t, n) => {
            "use strict";
            n.r(t)
        }, (e, t, n) => {
            const s = n(1).Ember;
            e.exports = s.HTMLBars.template({
                id: "MMV1cXi3",
                block: '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-tft\\\\src\\\\app\\\\components\\\\tft-quick-play\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-tft\\\\src\\\\app\\\\components\\\\tft-quick-play\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-tft\\\\src\\\\app\\\\components\\\\tft-quick-play\\\\index.js\\" "],["text","\\n"],["open-element","div",[]],["flush-element"],["text","\\n  "],["open-element","div",[]],["dynamic-attr","class",["concat",["quick-play-game-mode-text ",["helper",["if"],[["get",["quickPlayDisabled"]],"disabled"],null]]]],["flush-element"],["append",["unknown",["quickPlayGameModeName"]],false],["close-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","quick-play-button"],["flush-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","quick-play-button-container"],["flush-element"],["text","\\n      "],["open-element","div",[]],["dynamic-attr","class",["concat",["quick-play-button-bg ",["helper",["if"],[["get",["quickPlayDisabled"]],"disabled"],null]]]],["flush-element"],["text","\\n        "],["open-element","button",[]],["dynamic-attr","class",["concat",["quick-play-button-btn ",["helper",["if"],[["get",["quickPlayDisabled"]],"disabled"],null]]]],["modifier",["action"],[["get",[null]],"quickPlayButtonClicked"]],["flush-element"],["text","\\n        "],["open-element","span",[]],["static-attr","class","quick-play-button-label"],["dynamic-attr","style",["concat",["font-size: ",["unknown",["quickPlayFontSize"]],"px;"]]],["flush-element"],["text","\\n          "],["append",["unknown",["tra","tft_home_quick_play_button_label"]],false],["text","\\n        "],["close-element"],["text","\\n          \\n"],["block",["if"],[["get",["showTooltip"]]],null,1],["text","        "],["close-element"],["text","\\n      "],["close-element"],["text","\\n    "],["close-element"],["text","\\n  "],["close-element"],["text","\\n"],["close-element"]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","            "],["open-element","lol-uikit-content-block",[]],["static-attr","type","tooltip-small"],["flush-element"],["text","\\n              "],["open-element","p",[]],["flush-element"],["text","\\n                "],["append",["unknown",["tooltipText"]],false],["text","\\n              "],["close-element"],["text","\\n            "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["block",["uikit-tooltip"],null,[["tooltipPosition"],["top"]],0]],"locals":[]}],"hasPartials":false}',
                meta: {}
            })
        }, (e, t, n) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = void 0;
            var s = n(1),
                a = n(2);
            n(72);
            var l = s.Ember.Component.extend({
                classNames: [`${a.PLUGIN_NAME}-event-promo`],
                layout: n(73),
                tftService: s.Ember.inject.service("tft"),
                eventPromoTileAssets: s.Ember.computed.alias("tftService.eventPromoTileAssets"),
                eventsData: s.Ember.computed.alias("tftService.eventsData"),
                promoButtonsData: s.Ember.computed.alias("tftService.promoButtonsData"),
                eventAssetId: s.Ember.computed("promoButtonsData", (function() {
                    const e = this.get("promoButtonsData");
                    return e ? e[0].eventAssetId : "fallback-event"
                })),
                eventPromoImage: s.Ember.computed("eventPromoTileAssets", (function() {
                    const e = this.get("eventPromoTileAssets"),
                        t = this.get("eventAssetId");
                    return e && t ? e[t] : ""
                })),
                eventPromoImagePressed: s.Ember.computed("eventPromoTileAssets", (function() {
                    const e = this.get("eventPromoTileAssets"),
                        t = this.get("eventAssetId");
                    return e && t ? e[t + "-pressed"] : ""
                })),
                eventRoute: a.TFT_EVENT_ROUTE,
                eventPromoName: s.Ember.computed("promoButtonsData", (function() {
                    const e = this.get("promoButtonsData");
                    if (e)
                        if (e.length > 1) s.logger.error("Currently only displaying one promo button in the TFT Hub is supported - received " + e.length + " promoButtons.");
                        else if (1 === e.length) return s.tra.get(e[0].eventKey);
                    return null
                })),
                eventRouteUrl: s.Ember.computed("promoButtonsData", (function() {
                    const e = this.get("promoButtonsData");
                    if (e)
                        if (e.length > 1) s.logger.error("Currently only displaying one promo button in the TFT Hub is supported - received " + e.length + " promoButtons.");
                        else if (1 === e.length) return e[0].url;
                    return null
                })),
                eventPromoEnabled: s.Ember.computed("promoButtonsData", (function() {
                    const e = this.get("promoButtonsData");
                    if (e)
                        if (e.length > 1) s.logger.error("Currently only displaying one promo button in the TFT Hub is supported - received " + e.length + " promoButtons.");
                        else if (1 === e.length) return e[0].enabled;
                    return !1
                })),
                eventEnabled: s.Ember.computed("eventsData", (function() {
                    const e = this.get("eventsData");
                    return !!(e && Array.isArray(e) && e.length) && (e.length > 1 && s.logger.error("Currently only displaying one event in the TFT Hub is supported - received " + e.length + " events."), e[0].enabled)
                })),
                actions: {
                    preEventPromoClicked: function() {
                        s.ModalManager.add({
                            type: "DialogAlert",
                            data: {
                                contents: s.TemplateHelper.contentBlockDialog("", s.tra.get("tft_event_pre_popup_text"), "dialog-small", "pre-event-popup-content"),
                                okText: s.tra.get("tft_event_pre_popup_ok_text"),
                                dismissible: !0
                            },
                            show: !0
                        })
                    },
                    eventPromoClicked: function() {
                        s.AudioPlugin.getChannel("sfx-ui").playSound("/fe/lol-uikit/sfx-uikit-click-and-slide.ogg"), s.Telemetry.sendCustomData(a.DEFAULT_TELEMETRY_TABLE, {
                            eventName: a.TELEMETRY_TFT_EVENT_PROMO_CLICKED,
                            eventRouteUrl: this.get("eventRouteUrl")
                        })
                    },
                    mouseEnter: function() {
                        s.AudioPlugin.getChannel("sfx-ui").playSound("/fe/lol-static-assets/sounds/sfx-uikit-button-gold-hover.ogg")
                    }
                }
            });
            t.default = l
        }, (e, t, n) => {
            "use strict";
            n.r(t)
        }, (e, t, n) => {
            const s = n(1).Ember;
            e.exports = s.HTMLBars.template({
                id: "oRxZebw3",
                block: '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-tft\\\\src\\\\app\\\\components\\\\tft-event-promo\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-tft\\\\src\\\\app\\\\components\\\\tft-event-promo\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-tft\\\\src\\\\app\\\\components\\\\tft-event-promo\\\\index.js\\" "],["text","\\n"],["block",["if"],[["get",["eventPromoEnabled"]]],null,3]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","    "],["open-element","div",[]],["static-attr","class","event-promo-container clickable"],["dynamic-attr","onclick",["helper",["action"],[["get",[null]],"preEventPromoClicked"],null],null],["dynamic-attr","style",["concat",["--event-promo-image: url(\'",["unknown",["eventPromoImage"]],"\'); --event-promo-image-pressed: url(\'",["unknown",["eventPromoImagePressed"]],"\');"]]],["flush-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","event-promo-text"],["flush-element"],["append",["helper",["sanitize"],[["get",["eventPromoName"]]],null],false],["close-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","time-remaining-widget"],["flush-element"],["text","\\n        "],["append",["unknown",["tft-time-remaining-widget"]],false],["text","\\n      "],["close-element"],["text","\\n    "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","    "],["open-element","div",[]],["static-attr","class","event-promo-container clickable"],["dynamic-attr","onclick",["helper",["action"],[["get",[null]],"eventPromoClicked"],null],null],["dynamic-attr","style",["concat",["--event-promo-image: url(\'",["unknown",["eventPromoImage"]],"\'); --event-promo-image-pressed: url(\'",["unknown",["eventPromoImagePressed"]],"\');"]]],["flush-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","event-promo-text"],["flush-element"],["append",["helper",["sanitize"],[["get",["eventPromoName"]]],null],false],["close-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","time-remaining-widget"],["flush-element"],["text","\\n        "],["append",["unknown",["tft-time-remaining-widget"]],false],["text","\\n      "],["close-element"],["text","\\n    "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["block",["link-to"],[["get",["eventRoute"]],["helper",["query-params"],null,[["url"],[["get",["eventRouteUrl"]]]]]],null,1]],"locals":[]},{"statements":[["block",["if"],[["get",["eventEnabled"]]],null,2,0]],"locals":[]}],"hasPartials":false}',
                meta: {}
            })
        }, (e, t, n) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = void 0;
            var s = n(1),
                a = n(2),
                l = n(75);
            n(76);
            var o = s.Ember.Component.extend({
                classNames: [`${a.PLUGIN_NAME}-header-buttons`],
                layout: n(77),
                tftService: s.Ember.inject.service("tft"),
                trovesService: s.Ember.inject.service("tftTroves"),
                isEnabled: s.Ember.computed.alias("tftService.isHeaderButtonsEnabled"),
                starShardsEnabled: s.Ember.computed.alias("tftService.starShardsEnabled"),
                formattedStarShardsAmount: s.Ember.computed.alias("tftService.formattedStarShardsAmountString"),
                linkToStoreHome: !1,
                routing: s.Ember.inject.service("-routing"),
                currentRouteName: s.Ember.computed.alias("routing.currentRouteName"),
                formattedTrovesTokensAmount: s.Ember.computed.alias("trovesService.formattedTrovesTokensAmountString"),
                rpAmount: s.Ember.computed.alias("tftService.rpAmount"),
                ModalManager: s.UIKit.getModalManager(),
                trovesEnabled: s.Ember.computed("trovesService.trovesEnabled", (function() {
                    return !!this.get("trovesService") && this.get("trovesService.trovesEnabled")
                })),
                showStore: s.Ember.computed("currentRouteName", (function() {
                    return "troves" !== this.get("currentRouteName")
                })),
                showStarShards: s.Ember.computed("starShardsEnabled", "currentRouteName", (function() {
                    return this.get("starShardsEnabled") && "troves" !== this.get("currentRouteName")
                })),
                showTrovesTokens: s.Ember.computed("trovesEnabled", "currentRouteName", (function() {
                    return this.get("trovesEnabled") && "troves" === this.get("currentRouteName")
                })),
                actions: {
                    navigateToTftStore() {
                        this.get("linkToStoreHome") ? s.Router.navigateTo("rcp-fe-lol-store") : s.Router.navigateTo("rcp-fe-lol-store", {
                            page: "companions"
                        })
                    },
                    navigateToStarShardsStore() {
                        s.Router.navigateTo("rcp-fe-lol-store", {
                            page: "star_fragments"
                        })
                    },
                    showTrovesTokensPurchaseDialog() {
                        const e = this.get("ModalManager"),
                            t = e.add({
                                type: a.ITEM_PURCHASE_NAME,
                                data: {
                                    tftService: this.get("tftService"),
                                    trovesService: this.get("trovesService")
                                },
                                ComponentFactory: s.componentFactory
                            });
                        t.domNode.addEventListener("closeButtonClick", (function() {
                            e.remove(t)
                        })), s.Telemetry.sendCustomData(l.TELEMETRY_TABLE_NAME, {
                            [l.TELEMETRY_EVENT_KEY_EVENT_NAME]: l.TELEMETRY_EVENT_NAME_OPEN_PURCHASE_MODAL
                        })
                    }
                }
            });
            t.default = o
        }, (e, t) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.TYPE_ID_STARSHARDS = t.TYPE_ID_PROMISETOKEN = t.TYPE_ID_MAPSKIN = t.TYPE_ID_DAMAGESKIN = t.TYPE_ID_COMPANION = t.TFT_TROVES_TOKENS_WALLETS_KEY = t.TFT_TROVES_GDS_PROMO_ASSETS_KEY = t.TFT_MYTHIC_TOKENS_WALLETS_KEY = t.TELEMETRY_TABLE_NAME = t.TELEMETRY_EVENT_NAME_USE_MYTHIC = t.TELEMETRY_EVENT_NAME_TROVES_VISITED = t.TELEMETRY_EVENT_NAME_SHOW_DETAILS = t.TELEMETRY_EVENT_NAME_ROLL_TEN = t.TELEMETRY_EVENT_NAME_ROLL_ONE = t.TELEMETRY_EVENT_NAME_OPEN_PURCHASE_MODAL = t.TELEMETRY_EVENT_NAME_MYTHIC_BUTTON = t.TELEMETRY_EVENT_NAME_BANNER_SELECTED = t.TELEMETRY_EVENT_KEY_VISIT_ID = t.TELEMETRY_EVENT_KEY_PITY_COUNT = t.TELEMETRY_EVENT_KEY_EVENT_NAME = t.TELEMETRY_EVENT_KEY_ACTIVE_BANNER_SOURCE_ID = t.STAR_LEVEL_3 = t.STAR_LEVEL_2 = t.STAR_LEVEL_1 = t.SINGLE_ROLL_COUNT = t.ROLL_REWARD_RARITY_STRING_RARE = t.ROLL_REWARD_RARITY_STRING_MYTHIC = t.ROLL_REWARD_RARITY_STRING_LEGENDARY = t.ROLL_REWARD_RARITY_STRING_EPIC = t.ROLL_REWARD_RARITY_RARE = t.ROLL_REWARD_RARITY_MYTHIC = t.ROLL_REWARD_RARITY_LEGENDARY = t.ROLL_REWARD_RARITY_EPIC = t.PULL_TYPE_SINGLE = t.PULL_TYPE_MYTHIC = t.PULL_TYPE_MULTI = t.POST_PORTAL_SEGMENT_OFFSET_MS = t.PATHS = t.MULTI_ROLL_COUNT = t.MAX_WAITING_TIME_IN_MS = t.HIGHLIGHT_SLIDER_VALUE_SINGLE_PROMISETOKEN = t.HIGHLIGHT_SLIDER_VALUE_SINGLE_MAPSKIN = t.HIGHLIGHT_SLIDER_VALUE_SINGLE_COMPANION = t.HIGHLIGHT_SLIDER_VALUE_MULTI_PROMISETOKEN = t.HIGHLIGHT_SLIDER_VALUE_MULTI_MAPSKIN = t.HIGHLIGHT_SLIDER_VALUE_MULTI_COMPANION = t.HIGHLIGHT_SEGMENT_PAUSE_OFFSET_MS = t.GDS_TROVES_BACKGROUND_ASSET_KEY = t.CEREMONY_STATE_STANDARD = t.CEREMONY_STATE_PORTAL = t.CEREMONY_STATE_NONE = t.CEREMONY_STATE_HIGHLIGHT = t.CEREMONY_STATE_CURRENCY = t.CAP_STATUS_FAILED = t.CAP_STATUS_COMPLETE = void 0;
            t.GDS_TROVES_BACKGROUND_ASSET_KEY = "troves-hub-background-image";
            t.CEREMONY_STATE_NONE = "none";
            t.CEREMONY_STATE_CURRENCY = "currency";
            t.CEREMONY_STATE_PORTAL = "portal";
            t.CEREMONY_STATE_HIGHLIGHT = "highlight";
            t.CEREMONY_STATE_STANDARD = "standard";
            t.PULL_TYPE_SINGLE = 2;
            t.PULL_TYPE_MULTI = 3;
            t.PULL_TYPE_MYTHIC = 4;
            t.MAX_WAITING_TIME_IN_MS = 19e3;
            t.CAP_STATUS_COMPLETE = "COMPLETE";
            t.CAP_STATUS_FAILED = "FAILED";
            t.POST_PORTAL_SEGMENT_OFFSET_MS = 5833;
            t.HIGHLIGHT_SEGMENT_PAUSE_OFFSET_MS = 2070;
            t.ROLL_REWARD_RARITY_RARE = 0;
            t.ROLL_REWARD_RARITY_EPIC = 1;
            t.ROLL_REWARD_RARITY_LEGENDARY = 2;
            t.ROLL_REWARD_RARITY_MYTHIC = 3;
            t.ROLL_REWARD_RARITY_STRING_RARE = "Default";
            t.ROLL_REWARD_RARITY_STRING_EPIC = "Epic";
            t.ROLL_REWARD_RARITY_STRING_LEGENDARY = "Legendary";
            t.ROLL_REWARD_RARITY_STRING_MYTHIC = "Mythic";
            t.STAR_LEVEL_1 = 1;
            t.STAR_LEVEL_2 = 2;
            t.STAR_LEVEL_3 = 3;
            t.TYPE_ID_COMPANION = "c958d32d-d80d-43d1-9c8a-7004fcebcf7e";
            t.TYPE_ID_MAPSKIN = "b26717c6-87ec-43b0-b58f-fabc897c0b27";
            t.TYPE_ID_DAMAGESKIN = "a6bdfd45-048a-4ab7-859e-f87abe7efab5";
            t.TYPE_ID_STARSHARDS = "33fe7291-2082-5b1d-be4a-8848d8a1eef8";
            t.TYPE_ID_PROMISETOKEN = "1db22e88-db12-53d8-acea-21c8684e46e5";
            t.HIGHLIGHT_SLIDER_VALUE_SINGLE_COMPANION = 2;
            t.HIGHLIGHT_SLIDER_VALUE_SINGLE_MAPSKIN = 3;
            t.HIGHLIGHT_SLIDER_VALUE_SINGLE_PROMISETOKEN = 4;
            t.HIGHLIGHT_SLIDER_VALUE_MULTI_COMPANION = 5;
            t.HIGHLIGHT_SLIDER_VALUE_MULTI_MAPSKIN = 6;
            t.HIGHLIGHT_SLIDER_VALUE_MULTI_PROMISETOKEN = 7;
            t.SINGLE_ROLL_COUNT = 1;
            t.MULTI_ROLL_COUNT = 10;
            t.TFT_TROVES_GDS_PROMO_ASSETS_KEY = "lcu-assets-tft-troves-promos";
            const n = "TFT_TREASURE_TROVE_TOKEN";
            t.TFT_TROVES_TOKENS_WALLETS_KEY = n;
            const s = "TFT_MYTHIC_TREASURE_TROVE_TOKEN";
            t.TFT_MYTHIC_TOKENS_WALLETS_KEY = s;
            const a = {
                ROLL: "/lol-tft-troves/v1/roll",
                ROLL_REWARDS: "/lol-tft-troves/v1/roll-rewards",
                TEST_SEND: "/lol-datatest/v1/send-data/01",
                CATALOG: "/lol-catalog/v1/item-details",
                GENERIC_ASSETS: "/lol-game-data/assets/v1/generic-assets.json",
                TROVES_CONFIG: "/lol-client-config/v3/client-config/lol.client_settings.tft.tft_troves",
                TROVES_TOKENS: "/lol-inventory/v1/wallet/" + n,
                MYTHIC_TOKENS: "/lol-inventory/v1/wallet/" + s,
                TROVES_BANNERS: "/lol-tft-troves/v1/banners",
                STATUS_NOTIFICATIONS: "/lol-tft-troves/v1/status-notifications"
            };
            t.PATHS = a;
            t.TELEMETRY_TABLE_NAME = "tft_troves";
            t.TELEMETRY_EVENT_NAME_BANNER_SELECTED = "troves_select_banner";
            t.TELEMETRY_EVENT_NAME_MYTHIC_BUTTON = "click_mythic_button";
            t.TELEMETRY_EVENT_NAME_ROLL_ONE = "click_roll_1";
            t.TELEMETRY_EVENT_NAME_ROLL_TEN = "click_roll_10";
            t.TELEMETRY_EVENT_NAME_SHOW_DETAILS = "click_show_details";
            t.TELEMETRY_EVENT_NAME_TROVES_VISITED = "troves_visited";
            t.TELEMETRY_EVENT_NAME_USE_MYTHIC = "click_use_mythic";
            t.TELEMETRY_EVENT_NAME_OPEN_PURCHASE_MODAL = "click_open_purchase_modal";
            t.TELEMETRY_EVENT_KEY_EVENT_NAME = "eventName";
            t.TELEMETRY_EVENT_KEY_ACTIVE_BANNER_SOURCE_ID = "active_banner_id";
            t.TELEMETRY_EVENT_KEY_VISIT_ID = "visit_id";
            t.TELEMETRY_EVENT_KEY_PITY_COUNT = "pity_count"
        }, (e, t, n) => {
            "use strict";
            n.r(t)
        }, (e, t, n) => {
            const s = n(1).Ember;
            e.exports = s.HTMLBars.template({
                id: "S4vAdfFQ",
                block: '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-tft\\\\src\\\\app\\\\components\\\\tft-header-buttons\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-tft\\\\src\\\\app\\\\components\\\\tft-header-buttons\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-tft\\\\src\\\\app\\\\components\\\\tft-header-buttons\\\\index.js\\" "],["text","\\n"],["block",["if"],[["get",["isEnabled"]]],null,7]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","          "],["open-element","div",[]],["static-attr","class","tft-star-shards-button-label"],["flush-element"],["text","\\n            "],["open-element","img",[]],["static-attr","src","/fe/lol-tft-troves/images/TFT_Icon_trovesTokens.png"],["static-attr","class","tft-star-shards-icon"],["flush-element"],["close-element"],["text","\\n            "],["open-element","div",[]],["static-attr","class","tft-star-shards-amount"],["flush-element"],["text","\\n              "],["append",["unknown",["formattedTrovesTokensAmount"]],false],["text","\\n            "],["close-element"],["text","\\n          "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","          "],["open-element","lol-uikit-content-block",[]],["static-attr","type","tooltip-small"],["flush-element"],["text","\\n            "],["open-element","p",[]],["flush-element"],["append",["unknown",["tra","troves_tokens_description"]],false],["close-element"],["text","\\n          "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","      "],["open-element","div",[]],["static-attr","class","tft-star-shards-button"],["flush-element"],["text","\\n"],["block",["tft-tooltip"],null,[["tooltipId"],["tft-troves-tokens-desc"]],1],["block",["tft-button"],null,[["iconImageURL","action","outerCircleRadius"],["/fe/lol-uikit/images/icon_add.png","showTrovesTokensPurchaseDialog","30px"]],0],["text","      "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","          "],["open-element","div",[]],["static-attr","class","tft-star-shards-button-label"],["flush-element"],["text","\\n            "],["open-element","img",[]],["static-attr","src","/fe/lol-tft/images/home/TFT_Icon_starShards.png"],["static-attr","class","tft-star-shards-icon"],["flush-element"],["close-element"],["text","\\n            "],["open-element","div",[]],["static-attr","class","tft-star-shards-amount"],["flush-element"],["text","\\n              "],["append",["unknown",["formattedStarShardsAmount"]],false],["text","\\n            "],["close-element"],["text","\\n          "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","      "],["open-element","div",[]],["static-attr","class","tft-star-shards-button"],["flush-element"],["text","\\n"],["block",["tft-button"],null,[["iconImageURL","action","outerCircleRadius"],["/fe/lol-uikit/images/icon_add.png","navigateToStarShardsStore","30px"]],3],["text","      "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","        "],["open-element","div",[]],["static-attr","class","tft-store-button-label"],["flush-element"],["text","\\n          "],["append",["unknown",["tra","tft_home_store_button_label"]],false],["text","\\n        "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","    "],["open-element","div",[]],["static-attr","class","tft-store-button"],["flush-element"],["text","\\n"],["block",["tft-button"],null,[["iconImageURL","action","hasArrowEdge","outerCircleRadius","iconRadius"],["/fe/lol-tft/images/home/TFT_Icon_Coins.png","navigateToTftStore",true,"30px","15px"]],5],["text","    "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","  "],["open-element","div",[]],["static-attr","class","tft-buttons-wrapper"],["flush-element"],["text","\\n"],["block",["if"],[["get",["showStore"]]],null,6],["block",["if"],[["get",["showStarShards"]]],null,4],["block",["if"],[["get",["showTrovesTokens"]]],null,2],["text","  "],["close-element"],["text","\\n"]],"locals":[]}],"hasPartials":false}',
                meta: {}
            })
        }, (e, t, n) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = void 0;
            var s = n(1);
            n(79);
            var a = s.Ember.Component.extend({
                classNames: ["rcp-fe-lol-tft-test-page"],
                tftService: s.Ember.inject.service("tft"),
                layout: n(80),
                showPage: null,
                isHidden: s.Ember.computed.alias("tftService.isHidden"),
                audioManager: s.Ember.computed("tftService", (function() {
                    return this.get("tftService").getTftAudioManager()
                })),
                actions: {
                    renderPage(e) {
                        this.set("showPage", e)
                    }
                }
            });
            t.default = a
        }, (e, t, n) => {
            "use strict";
            n.r(t)
        }, (e, t, n) => {
            const s = n(1).Ember;
            e.exports = s.HTMLBars.template({
                id: "KoMwukVI",
                block: '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-tft\\\\src\\\\app\\\\components\\\\tft-test-page\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-tft\\\\src\\\\app\\\\components\\\\tft-test-page\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-tft\\\\src\\\\app\\\\components\\\\tft-test-page\\\\index.js\\" "],["text","\\n"],["block",["unless"],[["get",["showPage"]]],null,3],["block",["if"],[["helper",["eq"],[["get",["showPage"]],"test"],null]],null,2],["block",["if"],[["helper",["eq"],[["get",["showPage"]],"defaultError"],null]],null,1],["block",["if"],[["helper",["eq"],[["get",["showPage"]],"customError"],null]],null,0]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","    "],["append",["helper",["uikit-error-page"],null,[["contentText","buttonText"],["Here comes some content","Click here"]]],false],["text","\\n"]],"locals":[]},{"statements":[["text","    "],["append",["unknown",["uikit-error-page"]],false],["text","\\n"]],"locals":[]},{"statements":[["text","    "],["append",["helper",["managed-iframe"],null,[["id","url","errorTimeoutMilliseconds"],["test-iframe","https://staging.frontpage.na.leagueoflegends.com/en_US/test/home-window-messenger",5000]]],false],["text","\\n"]],"locals":[]},{"statements":[["text","    "],["open-element","div",[]],["static-attr","class","rcp-fe-lol-tft-test-page__button-container"],["flush-element"],["text","\\n    "],["open-element","button",[]],["modifier",["action"],[["get",[null]],"renderPage","test"]],["flush-element"],["text","\\n        Show Test Page\\n    "],["close-element"],["text","\\n    "],["open-element","button",[]],["modifier",["action"],[["get",[null]],"renderPage","defaultError"]],["flush-element"],["text","\\n        Show Default Error Page\\n    "],["close-element"],["text","\\n    "],["open-element","button",[]],["modifier",["action"],[["get",[null]],"renderPage","customError"]],["flush-element"],["text","\\n        Show Custom Error Page\\n    "],["close-element"],["text","\\n    "],["close-element"],["text","\\n"]],"locals":[]}],"hasPartials":false}',
                meta: {}
            })
        }, (e, t, n) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = void 0;
            var s = n(1);
            n(82);
            var a = s.Ember.Component.extend({
                classNames: ["rcp-fe-lol-tft-event-page"],
                tftService: s.Ember.inject.service("tft"),
                layout: n(83),
                telemetryEventPassTimeSpent: null,
                url: null,
                isHidden: s.Ember.computed.alias("tftService.isHidden"),
                audioManager: s.Ember.computed("tftService", (function() {
                    return this.get("tftService").getTftAudioManager()
                })),
                showEventHub: s.Ember.computed.empty("url")
            });
            t.default = a
        }, (e, t, n) => {
            "use strict";
            n.r(t)
        }, (e, t, n) => {
            const s = n(1).Ember;
            e.exports = s.HTMLBars.template({
                id: "n4NmhstC",
                block: '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-tft\\\\src\\\\app\\\\components\\\\tft-event-page\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-tft\\\\src\\\\app\\\\components\\\\tft-event-page\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-tft\\\\src\\\\app\\\\components\\\\tft-event-page\\\\index.js\\" "],["text","\\n\\n"],["block",["unless"],[["get",["isHidden"]]],null,2]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","    "],["append",["helper",["managed-iframe"],null,[["id","url","audioManager","isHidden","height","width","errorTimeoutMilliseconds"],["event-iframe",["get",["url"]],["get",["audioManager"]],["get",["isHidden"]],"720","1055",30000]]],false],["text","\\n"]],"locals":[]},{"statements":[["text","    "],["append",["helper",["tft-event-hub"],null,[["telemetryEventPassTimeSpent","toggleEventPass"],[["get",["telemetryEventPassTimeSpent"]],["get",["toggleEventPass"]]]]],false],["text","\\n"]],"locals":[]},{"statements":[["block",["if"],[["get",["showEventHub"]]],null,1,0]],"locals":[]}],"hasPartials":false}',
                meta: {}
            })
        }, (e, t, n) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = void 0;
            var s = n(1),
                a = n(2);
            const l = "lny24-event-hub-logo-tft-name",
                o = "lny24-event-hub-logo-dragon-year",
                i = "lny24-event-hub-time-remaining-icon",
                r = "lny24-event-hub-question-mark",
                c = "lny24-event-hub-play-card",
                m = "lny24-hub-card-base-default",
                u = "lny24-hub-card-base-hover",
                d = "lny24-hub-card-base-pressed";
            var p = s.Ember.Component.extend({
                classNames: [`${a.PLUGIN_NAME}-event-hub`],
                layout: n(85),
                style: n(86),
                telemetryEventPassTimeSpent: null,
                tftService: s.Ember.inject.service("tft"),
                trovesService: s.Ember.inject.service("tftTroves"),
                allMissionChains: s.Ember.computed.alias("tftService.tftEventMissions"),
                hasMission: s.Ember.computed.notEmpty("allMissionChains"),
                eventHubAssets: s.Ember.computed.alias("tftService.eventHubAssets"),
                logoTftNameImagePath: s.Ember.computed("eventHubAssets", (function() {
                    const e = this.get("eventHubAssets");
                    return e ? e[l] : ""
                })),
                logoDragonYearImagePath: s.Ember.computed("eventHubAssets", (function() {
                    const e = this.get("eventHubAssets");
                    return e ? e[o] : ""
                })),
                iconTimeRemainingImagePath: s.Ember.computed("eventHubAssets", (function() {
                    const e = this.get("eventHubAssets");
                    return e ? e[i] : ""
                })),
                iconQuestionMarkImagePath: s.Ember.computed("eventHubAssets", (function() {
                    const e = this.get("eventHubAssets");
                    return e ? e[r] : ""
                })),
                backgroundPlayCardImagePath: s.Ember.computed("eventHubAssets", (function() {
                    const e = this.get("eventHubAssets");
                    return e ? e[c] : ""
                })),
                cardBackgroundDefaultPath: s.Ember.computed("eventHubAssets", (function() {
                    const e = this.get("eventHubAssets");
                    if (e) return e[m]
                })),
                cardBackgroundHoverPath: s.Ember.computed("eventHubAssets", (function() {
                    const e = this.get("eventHubAssets");
                    if (e) return e[u]
                })),
                cardBackgroundPressedPath: s.Ember.computed("eventHubAssets", (function() {
                    const e = this.get("eventHubAssets");
                    if (e) return e[d]
                })),
                eventsData: s.Ember.computed.alias("tftService.eventsData"),
                endDate: s.Ember.computed("eventsData", (function() {
                    const e = this.get("eventsData");
                    return e && Array.isArray(e) && 1 === e.length ? e[0].endDate : ""
                })),
                timeoutExpired: !1,
                timeLeftString: s.Ember.computed("timeoutExpired", "endDate", (function() {
                    const e = this.get("endDate");
                    if (!e) return "";
                    let t = new Date(e) - Date.now();
                    const n = Math.floor(t / a.DAY_IN_MS);
                    t -= 86400 * n;
                    const l = Math.floor(t / a.HOUR_IN_MS) % 24;
                    t -= 3600 * l;
                    const o = Math.floor(t / a.MINUTE_IN_MS) % 60;
                    let i, r, c;
                    t -= 60 * o;
                    let m = 0;
                    return n > 0 ? (i = this.get("tra").formatString("tft_duration_days", {
                        days: n
                    }), this.get("tra").formatString("battlepass_time_till_event_end", {
                        duration: i
                    })) : (l > 0 && n <= 1 ? (r = this.get("tra").formatString("tft_duration_hours", {
                        hours: l
                    }), m = l > 1 ? a.HOUR_IN_MS : a.MINUTE_IN_MS) : (c = this.get("tra").formatString("tft_duration_minutes", {
                        minutes: o
                    }), m = a.MINUTE_IN_MS), this.timeoutExpired = !1, m > 0 && s.Ember.run.later(this, (function() {
                        this.set("timeoutExpired", !0)
                    }), m), r && c ? this.get("tra").formatString("battlepass_time_till_event_end_hours_and_minutes", {
                        hour_duration: r,
                        minutes_duration: c
                    }) : this.get("tra").formatString("battlepass_time_till_event_end", {
                        duration: r || c
                    }))
                })),
                telemetryEventHubTimeStart: null,
                telemetryEventHubTimeSpent: null,
                urlFaq: s.Ember.computed("tftService.eventsData", (function() {
                    const e = this.get("tftService").eventsData;
                    return e && Array.isArray(e) && e.length ? e[0].urlFaq : ""
                })),
                hasUrlFaq: s.Ember.computed.notEmpty("urlFaq"),
                eventQueueId: s.Ember.computed("eventsData", (function() {
                    const e = this.get("eventsData");
                    if (e && Array.isArray(e) && e.length) {
                        e.length > 1 && s.logger.error("Currently only displaying one event in the TFT Hub is supported - received " + e.length + " events.");
                        const t = e[0];
                        return 0 === t.length ? (s.logger.error("No queueId is configured for this event"), null) : t.queueIds[0]
                    }
                    return null
                })),
                activeBanners: s.Ember.computed.alias("trovesService.troveActiveBanners"),
                bannerToDisplay: s.Ember.computed("activeBanners", (function() {
                    const e = this.get("activeBanners");
                    if (e)
                        for (let t = 0; t < e.length; ++t)
                            if (e[t] && e[t].status && !e[t].status.owned) return e[t];
                    return null
                })),
                telemetryOpenEventHub() {
                    s.Telemetry.sendCustomData(a.DEFAULT_TELEMETRY_TABLE, a.TFT_TELEMETRY_EVENT.formatOpen(a.TFT_TELEMETRY_EVENT.FROM.EVENT_HUB)), this.set("telemetryEventHubTimeStart", Date.now())
                },
                telemetryCloseEventHub() {
                    s.Telemetry.sendCustomData(a.DEFAULT_TELEMETRY_TABLE, a.TFT_TELEMETRY_EVENT.formatClose(a.TFT_TELEMETRY_EVENT.FROM.EVENT_HUB)), this.set("telemetryEventHubTimeSpent", Date.now() - this.get("telemetryEventHubTimeStart"));
                    let e = this.get("telemetryEventHubTimeSpent");
                    const t = this.get("telemetryEventPassTimeSpent");
                    t && (e -= t), s.Telemetry.sendCustomData(a.DEFAULT_TELEMETRY_TABLE, a.TFT_TELEMETRY_EVENT.formatTimeSpent(a.TFT_TELEMETRY_EVENT.FROM.EVENT_HUB, e))
                },
                actions: {
                    openEventUrlFaq() {
                        this.get("hasUrlFaq") && (window.open(this.get("urlFaq", "_blank")), s.Telemetry.sendCustomData(a.DEFAULT_TELEMETRY_TABLE, a.TFT_TELEMETRY_EVENT.formatClick(a.TFT_TELEMETRY_EVENT.FROM.EVENT_HUB, "player-support-button")))
                    },
                    telemetryClickGameMode() {
                        s.Telemetry.sendCustomData(a.DEFAULT_TELEMETRY_TABLE, a.TFT_TELEMETRY_EVENT.formatClick(a.TFT_TELEMETRY_EVENT.FROM.EVENT_HUB, "game-mode-button"))
                    }
                },
                didInsertElement() {
                    this._super(...arguments), this.telemetryOpenEventHub()
                },
                willDestroyElement() {
                    this.telemetryCloseEventHub(), this._super(...arguments);
                    const e = this.get("tftService");
                    e && e.set("isHeaderButtonsEnabled", !0)
                },
                didRender() {
                    const e = this.get("tftService");
                    e && e.set("isHeaderButtonsEnabled", !1)
                }
            });
            t.default = p
        }, (e, t, n) => {
            const s = n(1).Ember;
            e.exports = s.HTMLBars.template({
                id: "YVmN9jn3",
                block: '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-tft\\\\src\\\\app\\\\components\\\\tft-event-hub\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-tft\\\\src\\\\app\\\\components\\\\tft-event-hub\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-tft\\\\src\\\\app\\\\components\\\\tft-event-hub\\\\index.js\\" "],["text","\\n"],["open-element","div",[]],["static-attr","class","icon-question-mark-container"],["flush-element"],["text","\\n  "],["open-element","img",[]],["static-attr","class","icon-question-mark"],["dynamic-attr","src",["concat",[["unknown",["iconQuestionMarkImagePath"]]]]],["dynamic-attr","onclick",["helper",["action"],[["get",[null]],"openEventUrlFaq"],null],null],["flush-element"],["close-element"],["text","\\n"],["close-element"],["text","\\n"],["open-element","div",[]],["static-attr","class","event-hub-container"],["flush-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","left-container"],["flush-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","container-row info-row"],["flush-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","event-info"],["flush-element"],["text","\\n        "],["open-element","div",[]],["static-attr","class","logo-tft-name"],["dynamic-attr","style",["concat",["background-image: url(\'",["unknown",["logoTftNameImagePath"]],"\')"]]],["flush-element"],["close-element"],["text","\\n        "],["open-element","div",[]],["static-attr","class","event-name"],["flush-element"],["append",["unknown",["tra","subnav_event_tab_title_lny24"]],false],["close-element"],["text","\\n        "],["open-element","div",[]],["static-attr","class","logo-dragon-year"],["dynamic-attr","style",["concat",["background-image: url(\'",["unknown",["logoDragonYearImagePath"]],"\')"]]],["flush-element"],["close-element"],["text","\\n        "],["open-element","div",[]],["static-attr","class","event-time-row"],["flush-element"],["text","\\n          "],["open-element","div",[]],["static-attr","class","event-time-icon"],["dynamic-attr","style",["concat",["background-image: url(\'",["unknown",["iconTimeRemainingImagePath"]],"\')"]]],["flush-element"],["close-element"],["text","\\n          "],["open-element","div",[]],["static-attr","class","event-time-text"],["flush-element"],["append",["unknown",["timeLeftString"]],false],["close-element"],["text","\\n        "],["close-element"],["text","\\n      "],["close-element"],["text","\\n    "],["close-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","container-row event-play-button"],["dynamic-attr","style",["concat",["background-image: url(\'",["unknown",["backgroundPlayCardImagePath"]],"\')"]]],["flush-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","flex-end-bottom"],["flush-element"],["text","\\n        "],["open-element","div",[]],["static-attr","class","flex-end-right"],["modifier",["action"],[["get",[null]],"telemetryClickGameMode"]],["flush-element"],["text","\\n          "],["append",["helper",["tft-quick-play"],null,[["buttonClassName","queueIdOverride"],["event-play",["get",["eventQueueId"]]]]],false],["text","\\n        "],["close-element"],["text","\\n      "],["close-element"],["text","\\n    "],["close-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","container-row"],["flush-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","container-col"],["flush-element"],["text","\\n        "],["open-element","div",[]],["static-attr","class","event-pass-button gray-box"],["flush-element"],["text","\\n          "],["open-element","div",[]],["static-attr","class","card"],["dynamic-attr","onclick",["helper",["action"],[["get",[null]],["get",["toggleEventPass"]]],null],null],["flush-element"],["text","\\n            "],["open-element","div",[]],["static-attr","class","card-background"],["dynamic-attr","style",["concat",["--card-background-image: url(\'",["unknown",["cardBackgroundDefaultPath"]],"\'); --card-background-image-hover: url(\'",["unknown",["cardBackgroundHoverPath"]],"\'); --card-background-image-pressed: url(\'",["unknown",["cardBackgroundPressedPath"]],"\');"]]],["flush-element"],["close-element"],["text","\\n            "],["open-element","div",[]],["static-attr","class","card-content"],["flush-element"],["text","\\n              "],["append",["helper",["tft-event-pass-thumbnail"],null,[["class"],["event-pass-thumbnail"]]],false],["text","\\n            "],["close-element"],["text","\\n          "],["close-element"],["text","\\n        "],["close-element"],["text","\\n      "],["close-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","container-col"],["flush-element"],["text","\\n        "],["open-element","div",[]],["static-attr","class","treasure-realms-button gray-box"],["flush-element"],["text","\\n          "],["append",["helper",["tft-event-troves-thumbnail"],null,[["displayedBannerOverride"],[["get",["bannerToDisplay"]]]]],false],["text","\\n        "],["close-element"],["text","\\n      "],["close-element"],["text","\\n    "],["close-element"],["text","\\n  "],["close-element"],["text","\\n  "],["open-element","lol-uikit-scrollable",[]],["static-attr","class","center-container"],["flush-element"],["text","\\n"],["block",["if"],[["get",["hasMission"]]],null,1],["text","    "],["open-element","div",[]],["flush-element"],["text","-"],["close-element"],["text","\\n  "],["close-element"],["text","\\n"],["close-element"],["text","\\n"]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","        "],["append",["helper",["tft-event-mission-chain"],null,[["class","missionChain"],["event-mission-chain",["get",["missionChain"]]]]],false],["text","\\n"]],"locals":["missionChain"]},{"statements":[["block",["each"],[["get",["allMissionChains"]]],null,0]],"locals":[]}],"hasPartials":false}',
                meta: {}
            })
        }, (e, t, n) => {
            "use strict";
            n.r(t)
        }, (e, t, n) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = void 0;
            var s = n(1),
                a = n(2);
            const l = "lny24-hub-mission-card-small",
                o = "lny24-hub-mission-card-big",
                i = "lny24-hub-mission-tracker-completed",
                r = "lny24-hub-mission-tracker-current",
                c = "lny24-hub-mission-tracker-future",
                m = "lny24-hub-mission-tracker-connect-bar",
                u = "lny24-hub-mission-progress-completed",
                d = "lny24-hub-mission-objective-divider";
            var p = s.Ember.Component.extend({
                classNames: [`${a.PLUGIN_NAME}-event-mission-chain`],
                layout: n(88),
                style: n(89),
                missionChain: null,
                tftService: s.Ember.inject.service("tft"),
                eventHubAssets: s.Ember.computed.alias("tftService.eventHubAssets"),
                missions: s.Ember.computed.alias("missionChain.missions"),
                currentMission: s.Ember.computed("missions", (function() {
                    const e = this.get("missions");
                    return e && "array" === s.Ember.typeOf(e) && e.length > 0 ? e[e.length - 1] : null
                })),
                currentMissionCompleted: s.Ember.computed("currentMission", (function() {
                    const e = this.get("currentMission");
                    return !!e && "COMPLETED" === e.status
                })),
                currentMissionCompletedCSSString: s.Ember.computed("currentMissionCompleted", (function() {
                    return this.get("currentMissionCompleted") ? "completed" : "pending"
                })),
                title: s.Ember.computed.alias("currentMission.title"),
                objectives: s.Ember.computed.alias("currentMission.objectives"),
                rewards: s.Ember.computed.alias("currentMission.rewards"),
                missionTrackerTotal: s.Ember.computed.alias("missionChain.chainSize"),
                missionTrackerCurrent: s.Ember.computed("missions", (function() {
                    const e = this.get("missions");
                    return e && "array" === s.Ember.typeOf(e) && e.length > 0 ? e.length : null
                })),
                missionTrackerIcons: s.Ember.computed("missionTrackerTotal", "missionTrackerCurrent", "currentMissionCompleted", (function() {
                    const e = [],
                        t = this.get("missionTrackerTotal"),
                        n = this.get("missionTrackerCurrent");
                    if (t && n && "number" === s.Ember.typeOf(t) && "number" === s.Ember.typeOf(n) && n <= t && n > 0)
                        for (let t = 0; t < this.get("missionTrackerTotal"); t++) {
                            let s = "";
                            if (t + 1 < n) s = this.get("missionTrackerCompleteImagePath");
                            else if (t + 1 > n) s = this.get("missionTrackerFutureImagePath");
                            else {
                                s = this.get("currentMissionCompleted") ? this.get("missionTrackerCompleteImagePath") : this.get("missionTrackerCurrentImagePath")
                            }
                            e.push({
                                imagePath: s
                            })
                        }
                    return e
                })),
                missionTrackerCompleteImagePath: s.Ember.computed("eventHubAssets", (function() {
                    const e = this.get("eventHubAssets");
                    return e ? e[i] : ""
                })),
                missionTrackerCurrentImagePath: s.Ember.computed("eventHubAssets", (function() {
                    const e = this.get("eventHubAssets");
                    return e ? e[r] : ""
                })),
                missionTrackerFutureImagePath: s.Ember.computed("eventHubAssets", (function() {
                    const e = this.get("eventHubAssets");
                    return e ? e[c] : ""
                })),
                missionTrackerConnectBarImagePath: s.Ember.computed("eventHubAssets", (function() {
                    const e = this.get("eventHubAssets");
                    return e ? e[m] : ""
                })),
                missionXPGoldImagePath: s.Ember.computed("currentMission", "eventHubAssets", (function() {
                    const e = this.get("currentMission"),
                        t = this.get("eventHubAssets");
                    return e && t ? e.iconImageUrl : ""
                })),
                missionSmallImagePath: s.Ember.computed("eventHubAssets", (function() {
                    const e = this.get("eventHubAssets");
                    return e ? e[l] : ""
                })),
                missionBigImagePath: s.Ember.computed("eventHubAssets", (function() {
                    const e = this.get("eventHubAssets");
                    return e ? e[o] : ""
                })),
                progressCompletedImagePath: s.Ember.computed("eventHubAssets", (function() {
                    const e = this.get("eventHubAssets");
                    return e ? e[u] : ""
                })),
                objectiveDividerImagePath: s.Ember.computed("eventHubAssets", (function() {
                    const e = this.get("eventHubAssets");
                    return e ? e[d] : ""
                }))
            });
            t.default = p
        }, (e, t, n) => {
            const s = n(1).Ember;
            e.exports = s.HTMLBars.template({
                id: "k/gQS5lw",
                block: '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-tft\\\\src\\\\app\\\\components\\\\tft-event-mission-chain\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-tft\\\\src\\\\app\\\\components\\\\tft-event-mission-chain\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-tft\\\\src\\\\app\\\\components\\\\tft-event-mission-chain\\\\index.js\\" "],["text","\\n"],["open-element","div",[]],["static-attr","class","event-mission-container"],["flush-element"],["text","\\n"],["text","  "],["open-element","div",[]],["static-attr","class","tracker-columns"],["flush-element"],["text","\\n"],["block",["each"],[["get",["missionTrackerIcons"]]],null,6],["text","  "],["close-element"],["text","\\n"],["text","\\n"],["text","  "],["open-element","div",[]],["static-attr","class","card"],["dynamic-attr","style",["concat",["background: url(\'",["helper",["if"],[["helper",["eq"],[["get",["objectives","length"]],1],null],["get",["missionSmallImagePath"]],["get",["missionBigImagePath"]]],null],"\'); background-size: 100% 100%"]]],["flush-element"],["text","\\n"],["block",["each"],[["get",["objectives"]]],null,3],["text","  "],["close-element"],["text","\\n"],["close-element"]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","              "],["append",["unknown",["reward","quantity"]],false],["text"," XP\\n"]],"locals":["reward","index"]},{"statements":[["text","              "],["append",["unknown",["title"]],false],["text","\\n"]],"locals":[]},{"statements":[["text","        "],["open-element","div",[]],["static-attr","class","objective-columns"],["flush-element"],["text","\\n          "],["open-element","div",[]],["static-attr","class","divider-text left-column"],["flush-element"],["text","\\n            OR\\n          "],["close-element"],["text","\\n          "],["open-element","div",[]],["static-attr","class","divider-image middle-column"],["dynamic-attr","style",["concat",["background-image: url(\'",["unknown",["objectiveDividerImagePath"]],"\')"]]],["flush-element"],["close-element"],["text","\\n          "],["open-element","div",[]],["static-attr","class","divider-image right-column"],["flush-element"],["close-element"],["text","\\n        "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["block",["if"],[["helper",["eq"],[["get",["index"]],1],null]],null,2],["text","      "],["open-element","div",[]],["static-attr","class","objective-columns"],["flush-element"],["text","\\n"],["text","        "],["open-element","div",[]],["static-attr","class","progress left-column"],["flush-element"],["text","\\n          "],["append",["helper",["tft-radial-progress-bar"],null,[["current","total","completedIconImagePath"],[["get",["objective","progress","currentProgress"]],["get",["objective","progress","totalCount"]],["get",["progressCompletedImagePath"]]]]],false],["text","\\n        "],["close-element"],["text","\\n"],["text","        "],["open-element","div",[]],["static-attr","class","description middle-column"],["flush-element"],["text","\\n          "],["open-element","div",[]],["dynamic-attr","class",["concat",["title-",["unknown",["currentMissionCompletedCSSString"]]]]],["flush-element"],["text","\\n"],["block",["if"],[["helper",["eq"],[["get",["index"]],0],null]],null,1],["text","          "],["close-element"],["text","\\n          "],["open-element","div",[]],["dynamic-attr","class",["concat",["description-text-",["unknown",["currentMissionCompletedCSSString"]]]]],["flush-element"],["text","\\n            "],["append",["unknown",["objective","description"]],false],["text","\\n          "],["close-element"],["text","\\n        "],["close-element"],["text","\\n"],["text","        "],["open-element","div",[]],["static-attr","class","experience right-column"],["flush-element"],["text","\\n          "],["open-element","div",[]],["static-attr","class","xp-icon"],["dynamic-attr","style",["concat",["background-image: url(\'",["unknown",["missionXPGoldImagePath"]],"\')"]]],["flush-element"],["close-element"],["text","\\n          "],["open-element","div",[]],["static-attr","class","xp-text"],["flush-element"],["text","\\n"],["block",["each"],[["get",["rewards"]]],null,0],["text","          "],["close-element"],["text","\\n        "],["close-element"],["text","\\n      "],["close-element"],["text","\\n"]],"locals":["objective","index"]},{"statements":[["text","        "],["open-element","div",[]],["static-attr","class","tracker-connect-bar"],["dynamic-attr","style",["concat",["background: url(\'",["unknown",["missionTrackerConnectBarImagePath"]],"\')"]]],["flush-element"],["close-element"],["text","\\n"]],"locals":[]},{"statements":[],"locals":[]},{"statements":[["block",["if"],[["helper",["eq"],[["get",["index"]],0],null]],null,5,4],["text","      "],["open-element","div",[]],["static-attr","class","tracker-icon"],["dynamic-attr","style",["concat",["background: url(\'",["unknown",["missionTrackerIcon","imagePath"]],"\')"]]],["flush-element"],["close-element"],["text","\\n"]],"locals":["missionTrackerIcon","index"]}],"hasPartials":false}',
                meta: {}
            })
        }, (e, t, n) => {
            "use strict";
            n.r(t)
        }, (e, t, n) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = void 0;
            var s = n(1),
                a = n(2),
                l = s.Ember.Component.extend({
                    classNames: [`${a.PLUGIN_NAME}-event-pass-thumbnail`],
                    layout: n(91),
                    style: n(92),
                    tftService: s.Ember.inject.service("tft"),
                    eventPass: s.Ember.computed.alias("tftService.tftPassEventPass"),
                    activeMilestone: s.Ember.computed.alias("eventPass.activeMilestone"),
                    media: s.Ember.computed.alias("eventPass.info.media"),
                    lastMainMilestone: s.Ember.computed.alias("milestones.lastObject"),
                    lastViewedMilestone: s.Ember.computed.alias("eventPass.lastViewedMilestone"),
                    markMissionsAsViewedFunc: s.Ember.computed.alias("tftService.markMissionsAsViewed"),
                    milestonePointsEarned: s.Ember.computed.alias("milestoneToDisplay.pointsEarnedForMilestone"),
                    milestonePointsNeeded: s.Ember.computed.alias("milestoneToDisplay.pointsNeededForMilestone"),
                    playerHasPremium: s.Ember.computed.alias("eventPass.info.premium"),
                    progressMissionId: s.Ember.computed.alias("eventPass.progressMissionId"),
                    passName: s.Ember.computed("eventPass", (function() {
                        const e = this.get("eventPass");
                        if (e) return e.info.title
                    })),
                    milestoneLevel: s.Ember.computed("activeMilestone.level", (function() {
                        const e = this.get("activeMilestone.level");
                        return "number" !== s.Ember.typeOf(e) ? this.get("tra").formatString("battlepass_level_shorthand", {
                            level: 0
                        }) : this.get("tra").formatString("battlepass_level_shorthand", {
                            level: e - 1
                        })
                    })),
                    milestones: s.Ember.computed("eventPass.milestones.@each.{internalName,missionId,isLocked,pointsEarnedForMilestone}", (function() {
                        if (this.get("eventPass")) return s.Ember.A(Array.from(this.get("eventPass.milestones")))
                    })),
                    eventPassMilestones: s.Ember.computed("eventPass.milestones.@each.{internalName,missionId,isLocked,pointsEarnedForMilestone}", (function() {
                        return this.get("eventPass.milestones") ? s.Ember.A(Array.from(this.get("eventPass.milestones"))) : s.Ember.A()
                    })),
                    eventPassBonuses: s.Ember.computed("eventPass.bonuses.@each.{internalName,missionId,isLocked,pointsEarnedForMilestone}", (function() {
                        return this.get("eventPass.bonuses") ? s.Ember.A(Array.from(this.get("eventPass.bonuses"))) : s.Ember.A()
                    })),
                    hasEventPassBonuses: s.Ember.computed.notEmpty("eventPassBonuses"),
                    isMainMilestonesComplete: s.Ember.computed("eventPassMilestones.lastObject.state", (function() {
                        const e = this.get("eventPassMilestones.lastObject.state");
                        return e === a.BP_V2_MILESTONE_REWARDABLE || e === a.BP_V2_MILESTONE_COMPLETE
                    })),
                    isBonusMilestonesComplete: s.Ember.computed("eventPassBonuses.lastObject.state", (function() {
                        const e = this.get("eventPassBonuses.lastObject.state");
                        return e === a.BP_V2_MILESTONE_REWARDABLE || e === a.BP_V2_MILESTONE_COMPLETE
                    })),
                    isPassComplete: s.Ember.computed("hasEventPassBonuses", "isMainMilestonesComplete", "isBonusMilestonesComplete", (function() {
                        return this.get("hasEventPassBonuses") ? this.get("isBonusMilestonesComplete") : this.get("isMainMilestonesComplete")
                    })),
                    milestoneToDisplay: s.Ember.computed("isPassComplete", (function() {
                        const e = this.get("isPassComplete"),
                            t = (this.get("hasEventPassBonuses"), this.get("eventPassMilestones.lastObject"));
                        return e ? t : this.get("activeMilestone")
                    })),
                    actions: {
                        telemetryClickEventPassThumbnail() {
                            s.Telemetry.sendCustomData(a.DEFAULT_TELEMETRY_TABLE, a.TFT_TELEMETRY_EVENT.formatClick(a.TFT_TELEMETRY_EVENT.FROM.EVENT_HUB, "event-pass-button"))
                        }
                    }
                });
            t.default = l
        }, (e, t, n) => {
            const s = n(1).Ember;
            e.exports = s.HTMLBars.template({
                id: "DQjDHt+L",
                block: '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-tft\\\\src\\\\app\\\\components\\\\tft-event-pass-thumbnail\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-tft\\\\src\\\\app\\\\components\\\\tft-event-pass-thumbnail\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-tft\\\\src\\\\app\\\\components\\\\tft-event-pass-thumbnail\\\\index.js\\" "],["text","\\n"],["open-element","div",[]],["static-attr","class","thumbnail"],["flush-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","title"],["flush-element"],["append",["unknown",["passName"]],false],["close-element"],["text","\\n"],["text","    "],["open-element","div",[]],["static-attr","class","thumbnail-reward"],["modifier",["action"],[["get",[null]],"telemetryClickEventPassThumbnail"]],["flush-element"],["text","\\n        "],["append",["helper",["battlepass-milestone"],null,[["class","click","media","milestone","showProgressionTracker","showTooltip"],["next-reward-icon",["get",["toggleEventPass"]],["get",["media"]],["get",["milestoneToDisplay"]],false,false]]],false],["text","\\n    "],["close-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","reward-description"],["flush-element"],["text","\\n"],["block",["if"],[["get",["isPassComplete"]]],null,1,0],["text","    "],["close-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","thumbnail-progressbar"],["flush-element"],["text","\\n        "],["append",["helper",["battlepass-level-bar"],null,[["class","activeMilestone","lastViewedMilestone","lastMainMilestone","playerHasPremium","isPassComplete","progressMissionId","markProgressAsViewedCallback","showTooltip","showHeader"],["pass-level-bar",["get",["milestoneToDisplay"]],["get",["lastViewedMilestone"]],["get",["lastMainMilestone"]],["get",["playerHasPremium"]],["get",["isPassComplete"]],["get",["progressMissionId"]],["get",["markProgressAsViewedCallback"]],false,false]]],false],["text","\\n    "],["close-element"],["text","\\n"],["text","    "],["open-element","div",[]],["static-attr","class","xp-progress"],["flush-element"],["text","    \\n        "],["append",["unknown",["milestonePointsEarned"]],false],["text"," / "],["append",["unknown",["milestonePointsNeeded"]],false],["text","\\n    "],["close-element"],["text","\\n"],["close-element"],["text","\\n"]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","        "],["append",["unknown",["tra","tft_eventhub_pass_thumbnail_next_reward"]],false],["text","\\n"]],"locals":[]},{"statements":[["text","        "],["append",["unknown",["tra","battlepass_one_hundred_percent_complete"]],false],["text","\\n"]],"locals":[]}],"hasPartials":false}',
                meta: {}
            })
        }, (e, t, n) => {
            "use strict";
            n.r(t)
        }, (e, t, n) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = void 0;
            var s = n(1),
                a = n(2);
            const l = "troves-hub-banner-error",
                o = "troves-hub-banner-empty";
            var i = s.Ember.Component.extend({
                classNames: [`${a.PLUGIN_NAME}-event-troves-thumbnail`],
                layout: n(94),
                style: n(95),
                trovesService: s.Ember.inject.service("tftTroves"),
                displayedBannerOverride: null,
                isLoading: s.Ember.computed.alias("trovesService.isLoading"),
                hasBannerError: s.Ember.computed.alias("trovesService.hasBannerError"),
                trovesPromoAssets: s.Ember.computed.alias("trovesService.trovesPromoAssets"),
                activeBanners: s.Ember.computed.alias("trovesService.troveActiveBanners"),
                hasNoBanner: s.Ember.computed.empty("activeBanners"),
                displayedChasedContentId: s.Ember.computed.alias("displayedBanner.id"),
                missingBanner: s.Ember.computed("hasBannerError", "hasNoBanner", (function() {
                    return this.get("hasBannerError") || this.get("hasNoBanner")
                })),
                displayedBanner: s.Ember.computed("activeBanners", "displayedBannerOverride", (function() {
                    if (this.get("hasNoBanner")) return null;
                    if (this.get("displayedBannerOverride")) return this.get("displayedBannerOverride");
                    {
                        const e = this.get("activeBanners")[0];
                        if (e) return e
                    }
                    return null
                })),
                errorBannerImage: s.Ember.computed("trovesPromoAssets", (function() {
                    const e = this.get("trovesPromoAssets");
                    return e && e[l] ? e[l] : ""
                })),
                emptyBannerImage: s.Ember.computed("trovesPromoAssets", (function() {
                    const e = this.get("trovesPromoAssets");
                    return e && e[o] ? e[o] : ""
                })),
                missingBannerImage: s.Ember.computed("errorBannerImage", "emptyBannerImage", "missingBanner", (function() {
                    return this.get("hasBannerError") ? this.get("errorBannerImage") : this.get("hasNoBanner") ? this.get("emptyBannerImage") : ""
                })),
                missingBannerTitle: s.Ember.computed("errorBannerImage", "emptyBannerImage", "missingBanner", (function() {
                    return this.get("hasBannerError") ? this.get("tra.troves_hub_banner_error_title") : this.get("hasNoBanner") ? this.get("tra.troves_hub_banner_empty_title") : ""
                })),
                missingBannerFooter: s.Ember.computed("errorBannerImage", "emptyBannerImage", "missingBanner", (function() {
                    return this.get("hasBannerError") ? this.get("tra.troves_hub_banner_error_footer") : this.get("hasNoBanner") ? this.get("tra.troves_hub_banner_empty_footer") : ""
                })),
                actions: {
                    telemetryClickTreasureRealmsThumbnail() {
                        const e = this.get("displayedBanner");
                        s.Telemetry.sendCustomData(a.DEFAULT_TELEMETRY_TABLE, a.TFT_TELEMETRY_EVENT.formatClick(a.TFT_TELEMETRY_EVENT.FROM.EVENT_HUB, "treasure-realms-thumbnail", {
                            displayedBanner: e ? e.name : ""
                        }))
                    }
                }
            });
            t.default = i
        }, (e, t, n) => {
            const s = n(1).Ember;
            e.exports = s.HTMLBars.template({
                id: "4AEpy2wt",
                block: '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-tft\\\\src\\\\app\\\\components\\\\tft-event-troves-thumbnail\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-tft\\\\src\\\\app\\\\components\\\\tft-event-troves-thumbnail\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-tft\\\\src\\\\app\\\\components\\\\tft-event-troves-thumbnail\\\\index.js\\" "],["text","\\n"],["open-element","div",[]],["static-attr","class","thumbnail"],["flush-element"],["text","\\n"],["block",["if"],[["get",["isLoading"]]],null,4,3],["close-element"]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","          "],["open-element","lol-uikit-flat-button",[]],["static-attr","primary","true"],["static-attr","remove-padding","true"],["static-attr","class","button glow"],["modifier",["action"],[["get",[null]],"telemetryClickTreasureRealmsThumbnail"]],["flush-element"],["text","\\n              "],["open-element","img",[]],["dynamic-attr","src",["concat",[["unknown",["displayedBanner","bannerTexture"]]]]],["static-attr","class","banner-image"],["flush-element"],["close-element"],["text","\\n          "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","      "],["open-element","div",[]],["static-attr","class","banner-button"],["flush-element"],["text","\\n"],["block",["link-to"],["troves",["helper",["query-params"],null,[["displayedBannerId"],[["get",["displayedChasedContentId"]]]]]],null,0],["text","      "],["close-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","banner-name"],["flush-element"],["append",["unknown",["displayedBanner","name"]],false],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","      "],["open-element","div",[]],["static-attr","class","standalone-title-text"],["flush-element"],["append",["unknown",["missingBannerTitle"]],false],["close-element"],["text","\\n      "],["open-element","img",[]],["dynamic-attr","src",["concat",[["unknown",["missingBannerImage"]]]]],["static-attr","class","banner-image"],["flush-element"],["close-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","standalone-footer-text"],["flush-element"],["append",["unknown",["missingBannerFooter"]],false],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["block",["if"],[["get",["missingBanner"]]],null,2,1]],"locals":[]},{"statements":[["text","    "],["open-element","div",[]],["static-attr","id","event-trove_loading"],["flush-element"],["text","\\n      "],["append",["unknown",["uikit-spinner"]],false],["text","\\n    "],["close-element"],["text","\\n"]],"locals":[]}],"hasPartials":false}',
                meta: {}
            })
        }, (e, t, n) => {
            "use strict";
            n.r(t)
        }, (e, t, n) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = void 0;
            var s = n(1),
                a = n(2),
                l = s.Ember.Component.extend({
                    classNames: [`${a.PLUGIN_NAME}-radial-progress-bar`],
                    layout: n(97),
                    style: n(98),
                    current: null,
                    total: null,
                    completedIconImagePath: null,
                    isSingleDigitTotalValue: s.Ember.computed("total", (function() {
                        const e = this.get("total");
                        return !!(e && "number" === s.Ember.typeOf(e) && e >= 0) && e < 10
                    })),
                    isComplete: s.Ember.computed("current", "total", (function() {
                        const e = this.get("current"),
                            t = this.get("total");
                        return !!(e && t && "number" === s.Ember.typeOf(e) && "number" === s.Ember.typeOf(t) && e >= 0 && t >= 0) && e >= t
                    }))
                });
            t.default = l
        }, (e, t, n) => {
            const s = n(1).Ember;
            e.exports = s.HTMLBars.template({
                id: "VADkKNHG",
                block: '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-tft\\\\src\\\\app\\\\components\\\\tft-radial-progress-bar\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-tft\\\\src\\\\app\\\\components\\\\tft-radial-progress-bar\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-tft\\\\src\\\\app\\\\components\\\\tft-radial-progress-bar\\\\index.js\\" "],["text","\\n"],["block",["if"],[["get",["isComplete"]]],null,3,2]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","      "],["open-element","div",[]],["static-attr","class","radial-progress-bar-percentage"],["dynamic-attr","style",["concat",["--progress-current: ",["unknown",["current"]],"; --progress-total: ",["unknown",["total"]]]]],["flush-element"],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","      "],["open-element","div",[]],["static-attr","class","radial-progress-bar-against-total"],["dynamic-attr","style",["concat",["--progress-current: ",["unknown",["current"]],"; --progress-total: ",["unknown",["total"]]]]],["flush-element"],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["block",["if"],[["get",["isSingleDigitTotalValue"]]],null,1,0]],"locals":[]},{"statements":[["text","  "],["open-element","div",[]],["static-attr","class","progress-complete-icon"],["dynamic-attr","style",["concat",["background-image: url(\'",["unknown",["completedIconImagePath"]],"\')"]]],["flush-element"],["close-element"],["text","\\n"]],"locals":[]}],"hasPartials":false}',
                meta: {}
            })
        }, (e, t, n) => {
            "use strict";
            n.r(t)
        }, (e, t, n) => {
            "use strict";
            var s, a = n(1),
                l = n(11),
                o = (s = n(100)) && s.__esModule ? s : {
                    default: s
                },
                i = n(101);
            n(105);
            const {
                Component: r,
                RSVP: c,
                computed: m
            } = a.Ember;
            e.exports = r.extend(l.DataBindingMixin, l.FixDataBindingMixin, o.default, {
                classNames: ["tft-match-history-main", "tft-match-history-bg"],
                layout: n(106),
                deltas: null,
                tftMatchListData: null,
                finalPointDrivenLevel: 5,
                acsAccountInfo: null,
                atLeastOneTftMatch: m.gt("tftMatches.length", 0),
                fullMatchHistoryUrl: m("matchHistoryWebURL", "acsAccountInfo", (function() {
                    const e = this.get("matchHistoryWebURL");
                    if (e) {
                        const t = this.get("acsAccountInfo");
                        return `${e}/#match-history/${t.platformId}/${t.accountId}`
                    }
                    return !1
                })),
                summoner: m("targetSummoner", "mySummoner", (function() {
                    return this.get("mySummoner")
                })),
                championPortrait: m("participant.championId", (function() {
                    const e = this.get("participant.championId");
                    return this.get("champions").get(e)
                })),
                tftMatchesLoading: m.none("tftMatches"),
                tftMatches: m("tftMatchListData", (function() {
                    return this.get("tftMatchListData") ? this._enrichTftGames(this.get("tftMatchListData")) : null
                })),
                puuid: m("summoner.puuid", "session.puuid", (function() {
                    return this.get("session.puuid")
                })),
                didRender() {
                    this._super(...arguments)
                },
                init() {
                    this._super(...arguments), this.set("deltas", new Map)
                },
                didInsertElement() {
                    this._super(...arguments), this._updateSummoner()
                },
                willDestroyElement() {
                    this._super(...arguments), this.set("summonerId", "")
                },
                actions: {
                    clickWebMatchHistory: function() {
                        return i.SFX.genericClickSm.play(), !0
                    }
                },
                _updateSummoner() {
                    this.isDestroying || this.isDestroyed || this.get("api.platformConfig").get("v1/namespaces/NewMatchHistory/TftMatchHistoryEnabled").then((e => {
                        const t = this.get("puuid");
                        e && t && this._loadTftPlayerData(t)
                    }))
                },
                _loadTftPlayerData(e, t = !1) {
                    const n = this.get("tftDefaultSet"),
                        s = n ? `/v1/products/tft/${e}/matches?begin=0&count=20&tag=${n.SetCoreName}` : `/v1/products/tft/${e}/matches?begin=0&count=20`;
                    return c.hashSettled({
                        tftMatchListData: this.retrieveData("api.matchHistory", s, {
                            skipCache: !0
                        })
                    }).then((e => {
                        this.get("isDestroyed") || ("fulfilled" === e.tftMatchListData.state ? this.set("tftMatchListData", e.tftMatchListData.value.games) : t || 404 !== e.tftMatchListData.reason.status && this.showModal({
                            type: "DialogAlert",
                            data: {
                                contents: this.get("tra.MATCH_DETAILS_LOADING_ERROR"),
                                okText: this.get("tra.MATCH_DETAILS_LOADING_ERROR_CONFIRMATION"),
                                onOk: () => {}
                            }
                        }))
                    }))
                },
                _enrichTftGames(e) {
                    return e.forEach((e => {
                        e && e.json && e.json.participants && (this._enrichGameVariation(e), e.json.participants.forEach((t => {
                            this._enrichUnits(t), this._enrichTraits(e, t), this._enrichAugments(t)
                        })))
                    })), e
                },
                _enrichUnits(e) {
                    const t = this.get("tftChampionsByAlias"),
                        n = this.get("tftItemsByName"),
                        s = this.get("championsByAlias");
                    e.units.forEach((e => {
                        let l = t.get(e.character_id.toLowerCase());
                        if (l) l.character_record ? (e.iconPath = l.character_record.squareIconPath, e.championName = l.character_record.display_name) : (e.iconPath = l.squareIconPath, e.championName = l.display_name);
                        else {
                            const t = e.name.replace("TFT_", "").replace("TFT2_", "");
                            l = s.get(t), l ? (e.iconPath = l.squarePortraitPath, e.championName = l.name) : a.logger.trace("Unknown champion: " + e)
                        }
                        const o = [];
                        e.itemNames.forEach((e => {
                            const t = n.get(e);
                            t && o.push(t)
                        })), e.equippedItems = o
                    })), e.units.sort(((e, t) => e.tier > t.tier ? -1 : e.tier < t.tier ? 1 : e.itemNames.length > t.itemNames.length ? -1 : e.itemNames.length < t.itemNames.length ? 1 : e.rarity > t.rarity ? -1 : e.rarity < t.rarity ? 1 : e.name.localeCompare(t.name)))
                },
                _enrichTraits(e, t) {
                    const n = this.get("tftTraitsById");
                    "object" == typeof t.traits && t.traits.length && (t.traits.forEach((t => {
                        if ("object" == typeof t) {
                            const s = n.get(t.name.toLowerCase());
                            s && (t.name = s.display_name, t.iconPath = s.icon_path), e.metadata.data_version >= 3 ? t.rank = t.style : t.tier_current === t.tier_total ? t.rank = 3 : 0 === t.tier_current ? t.rank = 0 : 1 === t.tier_current ? t.rank = 1 : t.rank = 2
                        }
                    })), t.traits.sort(((e, t) => e.rank === t.rank ? 0 : e.rank > t.rank ? -1 : e.rank < t.rank ? 1 : e.name.localeCompare(t.name))))
                },
                _enrichAugments(e) {
                    if (e.augments) {
                        const t = this.get("tftItemsByName");
                        e.augments = e.augments.map((e => t.get(e)))
                    }
                },
                _enrichGameVariation(e) {
                    const t = this.get("tftGameVariationsByAlias");
                    if (!e.json.game_variation) return;
                    const n = t.get(e.json.game_variation.toLowerCase());
                    n && (e.json.gameVariation = {}, e.json.gameVariation.displayName = n.game_variation_display_name, e.json.gameVariation.description = n.game_variation_description, e.json.gameVariation.iconPath = n.icon_path)
                }
            })
        }, (e, t, n) => {
            "use strict";
            var s = n(1);
            e.exports = s.Ember.Mixin.create({
                ModalManager: (0, s.getProvider)().get("rcp-fe-lol-uikit").getModalManager(),
                showModal: function(e) {
                    const t = this.get("ModalManager").add(e);
                    return s.Ember.get(t, "data.onOk") && t.okPromise ? t.okPromise.then(e.data.onOk) : t.acceptPromise && t.acceptPromise.then((() => {
                        s.Ember.get(t, "data.onAccept") && t.data.onAccept()
                    })).catch((() => {
                        s.Ember.get(t, "data.onDecline") && t.data.onDecline()
                    })), t
                },
                removeModal: function(e) {
                    this.get("ModalManager").remove(e)
                }
            })
        }, (e, t, n) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.SFX = void 0;
            const s = n(1).AudioPlugin.getChannel("sfx-ui");

            function a(e) {
                return s.createSound(e, {
                    allowConcurrency: !1
                })
            }
            const l = {
                genericClickSm: a(n(102)),
                gridClick: a(n(103)),
                gridHover: a(n(104))
            };
            t.SFX = l
        }, (e, t, n) => {
            "use strict";
            e.exports = n.p + "sfx-uikit-generic-click-small.ogg"
        }, (e, t, n) => {
            "use strict";
            e.exports = n.p + "sfx-uikit-grid-click.ogg"
        }, (e, t, n) => {
            "use strict";
            e.exports = n.p + "sfx-uikit-grid-hover.ogg"
        }, (e, t, n) => {
            "use strict";
            n.r(t)
        }, (e, t, n) => {
            const s = n(1).Ember;
            e.exports = s.HTMLBars.template({
                id: "uBs1LRrS",
                block: '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-match-history\\\\src\\\\components\\\\summary\\\\tft-match-summary-root-component\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-match-history\\\\src\\\\components\\\\summary\\\\tft-match-summary-root-component\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-match-history\\\\src\\\\components\\\\summary\\\\tft-match-summary-root-component\\\\index.js\\" "],["text","\\n\\n"],["open-element","div",[]],["static-attr","class","tft-match-history"],["flush-element"],["text","\\n\\n"],["block",["if"],[["get",["tftMatchesLoading"]]],null,5,4],["close-element"],["text"," "]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","          "],["comment"," no games for this player "],["text","\\n          "],["open-element","div",[]],["static-attr","class","tft-match-history-wrapper loading-fade-in"],["flush-element"],["text","\\n            "],["open-element","div",[]],["static-attr","class","tft-match-history-no-games-header"],["flush-element"],["append",["unknown",["tra","MATCH_HISTORY_SUMMARY_NO_GAMES_HEADER"]],false],["close-element"],["text","\\n            "],["open-element","div",[]],["static-attr","class","tft-match-history-no-games-reason-header"],["flush-element"],["append",["unknown",["tra","MATCH_HISTORY_SUMMARY_NO_GAMES_REASON_HEADER"]],false],["close-element"],["text","\\n            "],["open-element","ul",[]],["static-attr","class","tft-match-history-no-games-reason"],["flush-element"],["text","\\n              "],["open-element","li",[]],["flush-element"],["append",["unknown",["tra","MATCH_HISTORY_SUMMARY_NO_GAMES_REASON_1"]],false],["close-element"],["text","\\n              "],["open-element","li",[]],["flush-element"],["append",["unknown",["tra","MATCH_HISTORY_SUMMARY_NO_GAMES_REASON_2"]],false],["close-element"],["text","\\n              "],["open-element","li",[]],["flush-element"],["append",["unknown",["tra","MATCH_HISTORY_SUMMARY_NO_GAMES_REASON_3"]],false],["close-element"],["text","\\n            "],["close-element"],["text","\\n          "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","                  "],["append",["helper",["tft-match-summary"],null,[["tftSets","puuid","companions","champions","match","spells","items","queues"],[["get",["tftSets"]],["get",["puuid"]],["get",["companions"]],["get",["champions"]],["get",["match"]],["get",["spells"]],["get",["items"]],["get",["queues"]]]]],false],["text","\\n"]],"locals":["match"]},{"statements":[["text","          "],["open-element","div",[]],["static-attr","class","tft-match-history-wrapper loading-fade-in"],["flush-element"],["text","\\n"],["text","            "],["open-element","lol-uikit-scrollable",[]],["static-attr","class","tft-match-history-list"],["static-attr","overflow-masks","enabled"],["flush-element"],["text","\\n"],["block",["each"],[["get",["tftMatches"]]],[["key"],["gameId"]],1],["text","            "],["close-element"],["text","\\n          "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","      "],["open-element","div",[]],["static-attr","class","tft-match-history-left"],["flush-element"],["text","\\n        "],["open-element","div",[]],["static-attr","class","tft-match-history-left-title"],["flush-element"],["append",["unknown",["tra","MATCH_HISTORY_SUMMARY_RECENT_GAMES_LABEL"]],false],["close-element"],["text","\\n"],["block",["if"],[["get",["atLeastOneTftMatch"]]],null,2,0],["text","      "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["block",["render-telemetry-sender"],null,[["renderEventName"],["tft-match-history-rendered"]],3]],"locals":[]},{"statements":[["text","    "],["open-element","div",[]],["static-attr","class","tft-match-history-left-title"],["flush-element"],["append",["unknown",["tra","MATCH_HISTORY_SUMMARY_RECENT_GAMES_LABEL"]],false],["close-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","tft-match-history-loading-icon-container"],["flush-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","tft-match-history-loading-icon"],["flush-element"],["close-element"],["text","\\n    "],["close-element"],["text","\\n"]],"locals":[]}],"hasPartials":false}',
                meta: {}
            })
        }, (e, t, n) => {
            "use strict";
            var s = n(1);
            n(108);
            e.exports = s.Ember.Component.extend({
                layout: n(109),
                match: null,
                classNames: ["tft-match-summary-component"],
                classNameBindings: ["isPair:pair"],
                matchData: s.Ember.computed.alias("match.json"),
                gameType: s.Ember.computed.alias("matchData.tft_game_type"),
                metadata: s.Ember.computed.alias("match.metadata"),
                companionIcon: s.Ember.computed.alias("matchCompanion.loadoutsIcon"),
                currentPlayerLevel: s.Ember.computed.alias("currentPlayer.level"),
                modeText: s.Ember.computed("matchData.queue_id", "metadata.tags.[]", "queues", (function() {
                    const e = this.get("queues").get(this.get("matchData.queue_id"));
                    if (e) return e.description;
                    return this.get("metadata.tags").includes("ranked") ? this.get("tra.MATCH_HISTORY_TFT_RANKED") : this.get("tra.MATCH_HISTORY_TFT_NORMAL")
                })),
                units: s.Ember.computed.alias("currentPlayer.units"),
                unitPlaceholders: s.Ember.computed("units.length", (function() {
                    const e = this.get("units.length");
                    if (e >= 10) return s.Ember.A();
                    const t = 10 - e,
                        n = s.Ember.A();
                    for (let e = 0; e < t; e++) n.push(e);
                    return n
                })),
                isPair: s.Ember.computed("gameType", (function() {
                    return "pairs" === this.get("gameType")
                })),
                placement: s.Ember.computed("currentPlayer.placement", "isPair", (function() {
                    return this.get("isPair") ? Math.ceil(this.get("currentPlayer.placement") / 2) : this.get("currentPlayer.placement")
                })),
                placementText: s.Ember.computed("placement", (function() {
                    return this.get("tra.MATCH_HISTORY_TFT_PLACEMENT_" + this.get("placement"))
                })),
                augmentContainer: s.Ember.computed("matchData.tft_set_core_name", "tftSets.@each.SetCoreName", (function() {
                    const e = this.get("matchData.tft_set_core_name"),
                        t = this.get("tftSets").find((t => t.SetCoreName === e)) || {};
                    return {
                        name: t.SetAugmentName || "",
                        icon: t.SetAugmentContainer || ""
                    }
                })),
                matchLength: s.Ember.computed("matchData.game_length", "matchData.game_datetime", (function() {
                    const e = this.get("matchData.game_length"),
                        t = ~~(e / 3600),
                        n = ~~(e % 3600 / 60),
                        s = ~~e % 60;
                    let a = "";
                    return t > 0 && (a += t + ":" + (n < 10 ? "0" : "")), a += n + ":" + (s < 10 ? "0" : ""), a += "" + s, a
                })),
                matchDate: s.Ember.computed("matchData.game_datetime", (function() {
                    return this.get("tra").moment(parseInt(this.get("matchData.game_datetime"))).format("L")
                })),
                matchCompanion: s.Ember.computed("companions", "currentPlayer.companion.content_ID", (function() {
                    const e = this.get("companions"),
                        t = this.get("currentPlayer.companion.content_ID");
                    if (!e || !t) return null;
                    let n;
                    return e.groups.every((e => e.items.every((e => e.contentId === t ? (n = [e], !1) : (n = e.upgrades.filter((function(e) {
                        return e.contentId === t
                    })), 0 === n.length))))), n.length > 0 ? n[0] : null
                })),
                currentPlayer: s.Ember.computed("matchData.participants", "puuid", (function() {
                    const e = this.get("matchData.participants"),
                        t = this.get("puuid"),
                        n = e.filter((function(e) {
                            return e.puuid === t
                        }));
                    return n.length > 0 ? n[0] : null
                })),
                actions: {
                    displayMatchDetails(e) {}
                }
            })
        }, (e, t, n) => {
            "use strict";
            n.r(t)
        }, (e, t, n) => {
            const s = n(1).Ember;
            e.exports = s.HTMLBars.template({
                id: "dbsgJDZF",
                block: '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-match-history\\\\src\\\\components\\\\summary\\\\tft-match-summary-component\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-match-history\\\\src\\\\components\\\\summary\\\\tft-match-summary-component\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-match-history\\\\src\\\\components\\\\summary\\\\tft-match-summary-component\\\\index.js\\" "],["text","\\n"],["open-element","div",[]],["dynamic-attr","class",["concat",["match-summary-little-legends-container placement_",["unknown",["placement"]]]]],["flush-element"],["text","\\n     "],["open-element","div",[]],["static-attr","class","player-history-champion"],["flush-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","player-history-champion-icon"],["flush-element"],["text","\\n        "],["open-element","div",[]],["static-attr","class","player-history-champion-icon-border"],["flush-element"],["close-element"],["text","\\n        "],["open-element","img",[]],["static-attr","class","match-summary-little-legends-img"],["dynamic-attr","src",["unknown",["companionIcon"]],null],["flush-element"],["close-element"],["text","\\n        "],["open-element","div",[]],["static-attr","class","player-history-champion-frame"],["flush-element"],["close-element"],["text","\\n      "],["close-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","player-history-lv"],["flush-element"],["append",["unknown",["currentPlayerLevel"]],false],["close-element"],["text","\\n    "],["close-element"],["text","\\n"],["close-element"],["text","\\n\\n"],["open-element","div",[]],["static-attr","class","match-summary-player-stats"],["flush-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","match-summary-placement-display"],["flush-element"],["append",["unknown",["placementText"]],false],["close-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","match-summary-details"],["flush-element"],["text","\\n        "],["append",["unknown",["modeText"]],false],["text"," ● "],["append",["unknown",["matchLength"]],false],["text","\\n    "],["close-element"],["text","\\n"],["block",["if"],[["get",["matchData","gameVariation"]]],null,13],["text","    "],["open-element","div",[]],["static-attr","class","match-summary-details"],["flush-element"],["text","\\n        "],["append",["unknown",["matchDate"]],false],["text","\\n    "],["close-element"],["text","\\n"],["close-element"],["text","\\n\\n"],["block",["if"],[["get",["currentPlayer","augments"]]],null,10],["text","\\n"],["open-element","div",[]],["static-attr","class","match-summary-right"],["flush-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","match-summary-champions-in-play"],["flush-element"],["text","\\n"],["block",["each"],[["get",["units"]]],[["key"],["name"]],6],["text","    "],["close-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","match-summary-traits"],["flush-element"],["text","\\n"],["block",["each"],[["get",["currentPlayer","traits"]]],[["key"],["name"]],2],["text","    "],["close-element"],["text","\\n"],["close-element"],["text","\\n"]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","                        "],["open-element","lol-uikit-content-block",[]],["static-attr","type","tooltip-system"],["static-attr","class","match-summary-tft-tooltip"],["flush-element"],["text","\\n                            "],["open-element","p",[]],["flush-element"],["append",["unknown",["trait","name"]],false],["close-element"],["text","\\n                        "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","                "],["open-element","div",[]],["dynamic-attr","class",["concat",["match-summary-trait-img-bg trait_level_",["unknown",["trait","rank"]]]]],["flush-element"],["text","\\n                    "],["open-element","img",[]],["dynamic-attr","class",["concat",["match-summary-trait-img ",["unknown",["trait","name"]]]]],["dynamic-attr","src",["unknown",["trait","iconPath"]],null],["flush-element"],["close-element"],["text","\\n"],["block",["match-history-tooltip"],null,[["direction","tooltipId"],["bottom","match-summary-tft-trait-tooltip"]],0],["text","                "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["block",["if"],[["get",["trait","tier_current"]]],null,1]],"locals":["trait","index"]},{"statements":[["text","                                "],["open-element","lol-uikit-content-block",[]],["static-attr","type","tooltip-system"],["static-attr","class","match-summary-tft-tooltip"],["flush-element"],["text","\\n                                    "],["open-element","p",[]],["flush-element"],["append",["unknown",["item","name"]],false],["close-element"],["text","\\n                                "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","                        "],["open-element","div",[]],["static-attr","class","match-history-tft-player-piece-item"],["dynamic-attr","style",["concat",["background-image: url(",["unknown",["item","loadoutsIcon"]],");"]]],["flush-element"],["text","\\n"],["block",["match-history-tooltip"],null,[["direction","tooltipId"],["bottom","match-summary-tft-champion-tooltip"]],3],["text","                        "],["close-element"],["text","\\n"]],"locals":["item"]},{"statements":[["text","                        "],["open-element","lol-uikit-content-block",[]],["static-attr","type","tooltip-system"],["static-attr","class","match-summary-tft-tooltip"],["flush-element"],["text","\\n                            "],["open-element","p",[]],["flush-element"],["append",["unknown",["unit","championName"]],false],["close-element"],["text","\\n                        "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","            "],["open-element","div",[]],["dynamic-attr","class",["concat",["tft-player-piece piece-level-",["unknown",["unit","tier"]]]]],["flush-element"],["text","\\n                "],["open-element","div",[]],["static-attr","class","piece-inner-border"],["dynamic-attr","style",["concat",["background-image: url(",["unknown",["unit","iconPath"]],");"]]],["flush-element"],["text","\\n"],["block",["match-history-tooltip"],null,[["direction","tooltipId"],["bottom","match-summary-tft-champion-tooltip"]],5],["text","                "],["close-element"],["text","\\n\\n                 "],["open-element","div",[]],["static-attr","class","match-history-tft-player-piece-item-container"],["flush-element"],["text","\\n"],["block",["each"],[["get",["unit","equippedItems"]]],null,4],["text","                "],["close-element"],["text","\\n            "],["close-element"],["text","\\n\\n\\n"]],"locals":["unit","index"]},{"statements":[["text","                        "],["open-element","lol-uikit-content-block",[]],["static-attr","type","tooltip-system"],["static-attr","class","match-summary-tft-tooltip"],["flush-element"],["text","\\n                            "],["open-element","p",[]],["flush-element"],["append",["unknown",["augment","name"]],false],["close-element"],["text","\\n                        "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","                "],["open-element","div",[]],["static-attr","class","match-summary-augment-icon"],["dynamic-attr","style",["concat",["background-image: url(",["unknown",["augment","loadoutsIcon"]],");"]]],["flush-element"],["text","\\n"],["block",["match-history-tooltip"],null,[["direction","tooltipId"],["bottom","match-summary-augment-tooltip"]],7],["text","                "],["close-element"],["text","\\n"]],"locals":["augment"]},{"statements":[["text","                "],["open-element","lol-uikit-content-block",[]],["static-attr","type","tooltip-system"],["static-attr","class","match-summary-tft-tooltip"],["flush-element"],["text","\\n                    "],["open-element","p",[]],["flush-element"],["append",["unknown",["augmentContainer","name"]],false],["close-element"],["text","\\n                "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","    "],["open-element","div",[]],["static-attr","class","match-summary-augment"],["flush-element"],["text","\\n        "],["open-element","div",[]],["static-attr","class","match-summary-augment-inner"],["dynamic-attr","style",["concat",["background-image: url(",["unknown",["augmentContainer","icon"]],");"]]],["flush-element"],["text","\\n"],["block",["match-history-tooltip"],null,[["direction","tooltipId"],["top","match-summary-augment-tooltip"]],9],["text","        "],["close-element"],["text","\\n        "],["open-element","div",[]],["static-attr","class","match-summary-augment-icon-container"],["flush-element"],["text","\\n"],["block",["each"],[["get",["currentPlayer","augments"]]],null,8],["text","        "],["close-element"],["text","\\n    "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","                    "],["open-element","lol-uikit-content-block",[]],["static-attr","type","tooltip-system"],["static-attr","class","match-summary-tft-tooltip"],["flush-element"],["text","\\n                        "],["open-element","p",[]],["flush-element"],["append",["unknown",["matchData","gameVariation","description"]],false],["close-element"],["text","\\n                    "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["block",["match-history-tooltip"],null,[["direction","tooltipId"],["bottom","match-summary-tft-trait-tooltip"]],11]],"locals":[]},{"statements":[["text","        "],["open-element","div",[]],["static-attr","class","match-summary-details"],["flush-element"],["text","\\n            "],["append",["unknown",["matchData","gameVariation","displayName"]],false],["text","\\n            "],["open-element","lol-uikit-info-icon",[]],["static-attr","class","match-summary-set-mechanic-tooltip-icon"],["flush-element"],["close-element"],["text","\\n"],["block",["if"],[["get",["matchData","gameVariation","description"]]],null,12],["text","        "],["close-element"],["text","\\n"]],"locals":[]}],"hasPartials":false}',
                meta: {}
            })
        }, (e, t, n) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = void 0;
            var s = n(1);
            const a = {
                    targetAnchor: {
                        x: "center",
                        y: "top"
                    },
                    tooltipAnchor: {
                        x: "center",
                        y: "bottom"
                    },
                    tooltipDirection: "top"
                },
                l = {
                    targetAnchor: {
                        x: "center",
                        y: "bottom"
                    },
                    tooltipAnchor: {
                        x: "center",
                        y: "top"
                    },
                    tooltipDirection: "bottom"
                };
            var o = s.Ember.Component.extend({
                classNames: ["match-history-tooltip"],
                layout: n(111),
                toolTipAttached: !1,
                tooltipOptions: a,
                tooltipSetup() {
                    const e = this.toolTipAttached;
                    if (this.tooltipHoverElement = this.element.parentElement, !e && this.tooltipHoverElement) {
                        const e = this.get("tooltipId");
                        this.tooltipElement = this.element.querySelector(`#match-history-tooltip-${e}`), this.attachTooltip(), this.toolTipAttached = !0
                    }
                },
                didInsertElement() {
                    this._super(...arguments), this.tooltipSetup()
                },
                willDestroyElement() {
                    this.detachTooltip(), this._super(...arguments)
                },
                attachTooltip: function() {
                    const e = "bottom" === this.get("direction") ? l : a;
                    s.TooltipManager.assign(this.tooltipHoverElement, this.tooltipElement, null, e)
                },
                detachTooltip: function() {
                    s.TooltipManager.unassign(this.tooltipHoverElement)
                }
            });
            t.default = o
        }, (e, t, n) => {
            const s = n(1).Ember;
            e.exports = s.HTMLBars.template({
                id: "kR3dy1Zj",
                block: '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-match-history\\\\src\\\\components\\\\summary\\\\match-history-tooltip-component\\\\layout.hbs\\" style-path=\\"null\\" js-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-match-history\\\\src\\\\components\\\\summary\\\\match-history-tooltip-component\\\\index.js\\" "],["text","\\n"],["open-element","lol-uikit-tooltip",[]],["dynamic-attr","id",["concat",["match-history-tooltip-",["unknown",["tooltipId"]]]]],["flush-element"],["text","\\n  "],["yield","default"],["text","\\n"],["close-element"],["text","\\n"]],"locals":[],"named":[],"yields":["default"],"blocks":[],"hasPartials":false}',
                meta: {}
            })
        }, (e, t, n) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = void 0;
            var s = n(1),
                a = n(75),
                l = n(113),
                o = s.Ember.Component.extend({
                    classNames: ["rcp-fe-lol-tft-troves-mythic-button"],
                    mythicTokenIcon: "/fe/lol-tft-troves/images/TFT_Icon_mythicTokens.png",
                    mythicOfferId: null,
                    activeBannerSourceId: null,
                    activeBannerStatus: null,
                    dropTableId: s.Ember.computed.alias("activeBannerStatus.dropTableId"),
                    confirmModalShowing: !1,
                    currentRmsNotificationTimer: null,
                    trovesService: s.Ember.inject.service("tftTroves"),
                    mythicTokensAmount: s.Ember.computed.alias("trovesService.mythicTokensAmount"),
                    isPulling: s.Ember.computed.alias("trovesService.isPulling"),
                    showMythicButton: s.Ember.computed("mythicTokensAmount", (function() {
                        return this.get("mythicTokensAmount") > 0
                    })),
                    balanceText: s.Ember.computed("mythicTokensAmount", (function() {
                        return this.get("tra").formatString("troves_mythic_token_dialog_balance", {
                            balance: this.get("mythicTokensAmount")
                        })
                    })),
                    ownedChaseContent: s.Ember.computed("activeBannerStatus", (function() {
                        const e = this.get("activeBannerStatus");
                        return !!e && e.owned
                    })),
                    disableAcceptButton: s.Ember.computed("ownedChaseContent", "mythicTokensAmount", "isPulling", (function() {
                        return this.get("ownedChaseContent") || isNaN(this.get("mythicTokensAmount")) || 0 === this.get("mythicTokensAmount") || this.get("isPulling")
                    })),
                    click() {
                        this.get("isPulling") || (l.SFX.buttonClick.play(), s.Telemetry.sendCustomData(a.TELEMETRY_TABLE_NAME, {
                            [a.TELEMETRY_EVENT_KEY_EVENT_NAME]: a.TELEMETRY_EVENT_NAME_MYTHIC_BUTTON,
                            [a.TELEMETRY_EVENT_KEY_ACTIVE_BANNER_SOURCE_ID]: this.get("activeBannerSourceId")
                        }), this.set("confirmModalShowing", !0))
                    },
                    mouseEnter() {
                        this.get("isPulling") || l.SFX.buttonHover.play()
                    },
                    actions: {
                        useMythicToken() {
                            this._updatePulling();
                            const e = {
                                offerId: this.get("mythicOfferId"),
                                dropTableId: this.get("dropTableId"),
                                numberOfRolls: 1,
                                isMythic: !0
                            };
                            s.Telemetry.sendCustomData(a.TELEMETRY_TABLE_NAME, {
                                [a.TELEMETRY_EVENT_KEY_EVENT_NAME]: a.TELEMETRY_EVENT_NAME_USE_MYTHIC,
                                [a.TELEMETRY_EVENT_KEY_ACTIVE_BANNER_SOURCE_ID]: this.get("activeBannerSourceId"),
                                [a.TELEMETRY_EVENT_KEY_PITY_COUNT]: this.get("pityCount")
                            }), s.db.post(a.PATHS.ROLL, e).catch(this._handleRollError.bind(this))
                        },
                        closeConfirmModal() {
                            this.set("confirmModalShowing", !1)
                        }
                    },
                    didUpdate() {
                        this._updateAcceptButton()
                    },
                    willDestroy() {
                        this._clearTimeoutTimer(), this._super(...arguments)
                    },
                    _updateAcceptButton() {
                        const e = document.querySelector(".rcp-fe-lol-tft-troves-mythic-token-dialog");
                        if (!e) return;
                        const t = e.parentElement.parentElement.parentElement.querySelector("lol-uikit-flat-button.button-accept");
                        if (!t) return;
                        const n = this.get("mythicTokenIcon"),
                            a = this.get("disableAcceptButton") ? "disabled" : "",
                            l = s.tra.get("troves_mythic_token_dialog_open");
                        t.innerHTML = `\n      <div class="button-with-icon">\n      <img src="${n}" class="mythic-currency-icon" ${a}>\n      <span>${l}</span>\n      </div>`, t.setAttribute("primary", !0), t.blur(), this.get("disableAcceptButton") && (t.disabled = !0)
                    },
                    _handleRollError() {
                        this.set("confirmModalShowing", !1), this.get("trovesService").updatePullErrorModal(!0)
                    },
                    _updatePulling() {
                        this.get("trovesService").updatePulling(!0);
                        const e = setTimeout((() => {
                            this._handleRollOrderNotificationTimeout()
                        }), a.MAX_WAITING_TIME_IN_MS);
                        this.set("currentRmsNotificationTimer", e)
                    },
                    _handleRollOrderNotificationTimeout() {
                        this.get("isPulling") && this.get("trovesService").updatePulling(!1), this._clearTimeoutTimer()
                    },
                    _clearTimeoutTimer() {
                        const e = this.get("currentRmsNotificationTimer");
                        e && (clearTimeout(e), this.set("currentRmsNotificationTransactionId", null))
                    }
                });
            t.default = o
        }, (e, t, n) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.SFX = void 0;
            var s = n(1),
                a = n(2);
            const l = s.AudioPlugin.getChannel(a.AUDIO_CHANNELS.SFX_SUB_CHANNEL_UI_NAME);

            function o(e) {
                return l.createSound(e, {
                    allowConcurrency: !1
                })
            }
            const i = {
                buttonClick: o("/fe/lol-static-assets/sounds/sfx-uikit-button-big-click.ogg"),
                buttonHover: o("/fe/lol-static-assets/sounds/sfx-uikit-button-generic-hover.ogg"),
                circleButtonClick: o("/fe/lol-static-assets/sounds/sfx-uikit-button-circlegold-click.ogg"),
                circleButtonHover: o("/fe/lol-static-assets/sounds/sfx-uikit-button-circlegold-hover.ogg")
            };
            t.SFX = i
        }, (e, t, n) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = void 0;
            var s = n(1),
                a = s.Ember.Component.extend({
                    classNames: ["rcp-fe-lol-tft-troves-mythic-token-dialog"],
                    mythicTokenIcon: null,
                    ownedChaseContent: null,
                    balanceText: null,
                    title: s.tra.get("troves_mythic_token_dialog_title"),
                    confirmText: s.tra.get("troves_mythic_token_dialog_content"),
                    ownedText: s.tra.get("troves_mythic_token_dialog_owned")
                });
            t.default = a
        }, (e, t, n) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = void 0;
            var s = n(1),
                a = n(75),
                l = s.Ember.Component.extend({
                    classNames: ["rcp-fe-lol-tft-troves-pull-button", "single-button-container"],
                    trovesService: s.Ember.inject.service("tftTroves"),
                    isPulling: s.Ember.computed.alias("trovesService.isPulling"),
                    cost: null,
                    buttonText: null,
                    activeBannerSourceId: null,
                    selectedOfferId: null,
                    rollCount: null,
                    dropTableId: null,
                    disabled: !0,
                    troveTokenIcon: "fe/lol-tft-troves/images/TFT_Icon_trovesTokens.png",
                    troveTokenHolder: "fe/lol-tft-troves/images/TFT_Holder_trovesTokens.png",
                    currentRmsNotificationTimer: null,
                    willDestroy() {
                        this._clearTimeoutTimer(), this._super(...arguments)
                    },
                    _clicked: !1,
                    showSpinner: s.Ember.computed("trovesService.isWaitingForCeremonyData", (function() {
                        const e = this.get("trovesService.isWaitingForCeremonyData");
                        return e || (this._clicked = !1), this._clicked && e
                    })),
                    click() {
                        this._clicked = !0;
                        const e = this.get("rollCount"),
                            t = this.get("selectedOfferId"),
                            n = this.get("dropTableId");
                        if (!e || this.get("disabled") || !t || !n) return;
                        this._sendRollClickTelemetry(this.get("activeBannerSourceId"), e), this._updatePulling();
                        this.get("trovesService").spendCoins(t, e, n)
                    },
                    _sendRollClickTelemetry(e, t) {
                        s.Telemetry.sendCustomData(a.TELEMETRY_TABLE_NAME, {
                            [a.TELEMETRY_EVENT_KEY_EVENT_NAME]: 1 === t ? a.TELEMETRY_EVENT_NAME_ROLL_ONE : a.TELEMETRY_EVENT_NAME_ROLL_TEN,
                            [a.TELEMETRY_EVENT_KEY_ACTIVE_BANNER_SOURCE_ID]: e,
                            [a.TELEMETRY_EVENT_KEY_PITY_COUNT]: this.get("pityCount")
                        })
                    },
                    _updatePulling() {
                        this.get("trovesService").updatePulling(!0);
                        const e = setTimeout((() => {
                            this._handleRollOrderNotificationTimeout()
                        }), a.MAX_WAITING_TIME_IN_MS);
                        this.set("currentRmsNotificationTimer", e)
                    },
                    _handleRollOrderNotificationTimeout() {
                        this.get("isPulling") && this.get("trovesService").updatePulling(!1), this._clearTimeoutTimer()
                    },
                    _clearTimeoutTimer() {
                        const e = this.get("currentRmsNotificationTimer");
                        e && (clearTimeout(e), this.set("currentRmsNotificationTransactionId", null))
                    }
                });
            t.default = l
        }, (e, t, n) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = void 0;
            var s = n(1),
                a = n(75),
                l = s.Ember.Component.extend({
                    classNames: ["rcp-fe-lol-tft-troves-pull-buttons-container"],
                    selectedOfferId: null,
                    activeBannerStatus: null,
                    pullCost: null,
                    SINGLE_ROLL_COUNT: a.SINGLE_ROLL_COUNT,
                    MULTI_ROLL_COUNT: a.MULTI_ROLL_COUNT,
                    dropTableId: s.Ember.computed.alias("activeBannerStatus.dropTableId"),
                    trovesService: s.Ember.inject.service("tftTroves"),
                    trovesTokensAmount: s.Ember.computed.alias("trovesService.trovesTokensAmount"),
                    isPulling: s.Ember.computed.alias("trovesService.isPulling"),
                    tenPullCost: s.Ember.computed("pullCost", (function() {
                        return 10 * this.get("pullCost")
                    })),
                    isSinglePullDisabled: s.Ember.computed("trovesTokensAmount", "activeBannerStatus", "isPulling", "pullCost", (function() {
                        const e = this.get("trovesTokensAmount"),
                            t = this.get("activeBannerStatus"),
                            n = this.get("isPulling"),
                            s = this.get("pullCost");
                        return this.isDisabledForPull(a.SINGLE_ROLL_COUNT, s, e, t, n)
                    })),
                    isTenPullDisabled: s.Ember.computed("trovesTokensAmount", "activeBannerStatus", "isPulling", "tenPullCost", (function() {
                        const e = this.get("trovesTokensAmount"),
                            t = this.get("activeBannerStatus"),
                            n = this.get("isPulling"),
                            s = this.get("tenPullCost");
                        return this.isDisabledForPull(a.MULTI_ROLL_COUNT, s, e, t, n)
                    })),
                    isDisabledForPull: (e, t, n, s, a) => !!a || (!!s.isCollectorBountyMaxRollsMet || (!(n && s && s.availableContents) || (n < t || s.availableContents < e))),
                    isAllContentOwned: s.Ember.computed("activeBannerStatus", (function() {
                        const e = this.get("activeBannerStatus");
                        return !(!e || e.availableContents) && 0 === e.availableContents
                    }))
                });
            t.default = l
        }, (e, t, n) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = void 0;
            var s = n(1),
                a = s.Ember.Component.extend({
                    classNames: ["rcp-fe-lol-tft-troves-pull-error-dialog"],
                    trovesService: s.Ember.inject.service("tftTroves"),
                    pullErrorModalShowing: s.Ember.computed.alias("trovesService.pullErrorModalShowing"),
                    title: s.tra.get("troves_pull_error_dialog_title"),
                    content: s.tra.get("troves_pull_error_dialog_content_msg"),
                    support: s.tra.get("troves_pull_error_dialog_support_msg"),
                    okText: s.tra.get("troves_pull_error_dialog_close"),
                    actions: {
                        closePullErrorModal() {
                            this.get("trovesService").updatePullErrorModal(!1)
                        }
                    }
                });
            t.default = a
        }, (e, t, n) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = void 0;
            var s = n(1);
            const {
                Component: a
            } = s.Ember;
            var l = a.extend({
                classNames: ["rcp-fe-lol-tft-troves-banners"],
                activeBanners: null,
                setSelectedChasedContentId: null
            });
            t.default = l
        }, (e, t, n) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = void 0;
            var s = n(1),
                a = n(75),
                l = n(2);
            const {
                SFX_SUB_CHANNEL_UI_NAME: o
            } = l.AUDIO_CHANNELS, {
                Component: i,
                computed: r
            } = s.Ember;

            function c(e) {
                return {
                    [a.ROLL_REWARD_RARITY_STRING_RARE]: 0,
                    [a.ROLL_REWARD_RARITY_STRING_EPIC]: 1,
                    [a.ROLL_REWARD_RARITY_STRING_LEGENDARY]: 2,
                    [a.ROLL_REWARD_RARITY_STRING_MYTHIC]: 3
                } [e]
            }

            function m(e) {
                return e.sort(((e, t) => c(t.rarity) - c(e.rarity)))
            }
            var u = i.extend({
                classNames: ["rcp-fe-lol-tft-troves-ceremony"],
                activeBanner: null,
                ceremonyData: null,
                trovesService: s.Ember.inject.service("tftTroves"),
                highlightRewards: r("ceremonyData", (function() {
                    const e = this.get("ceremonyData"),
                        t = e && e.rewards && e.rewards.highlight;
                    return t || []
                })),
                standardRewards: r("ceremonyData", (function() {
                    const e = this.get("ceremonyData"),
                        t = e && e.rewards && e.rewards.standard;
                    return t || []
                })),
                sortedStandardRewards: r("standardRewards", (function() {
                    return m(this.get("standardRewards"))
                })),
                maxRarityInRewards: r("highlightRewards", "sortedStandardRewards", (function() {
                    const e = m(this.get("highlightRewards")),
                        t = this.get("sortedStandardRewards");
                    return c(m([e[0], t[0]])[0].rarity)
                })),
                trovesPromoAssets: r.alias("trovesService.trovesPromoAssets"),
                backgroundImageAvailable: r("trovesPromoAssets", (function() {
                    const e = this.get("trovesPromoAssets");
                    return !(!e || !e[a.GDS_TROVES_BACKGROUND_ASSET_KEY])
                })),
                backgroundImage: r("trovesPromoAssets", (function() {
                    const e = this.get("trovesPromoAssets");
                    return this.get("backgroundImageAvailable") ? e[a.GDS_TROVES_BACKGROUND_ASSET_KEY] : ""
                })),
                ceremonyState: a.CEREMONY_STATE_NONE,
                playCurrencySegment: r.equal("ceremonyState", a.CEREMONY_STATE_CURRENCY),
                playPortalSegment: r.equal("ceremonyState", a.CEREMONY_STATE_PORTAL),
                playHighlightSegment: r.equal("ceremonyState", a.CEREMONY_STATE_HIGHLIGHT),
                playStandardSegment: r.equal("ceremonyState", a.CEREMONY_STATE_STANDARD),
                ceremonyInProgress: r("ceremonyState", (function() {
                    return this.get("ceremonyState") !== a.CEREMONY_STATE_NONE
                })),
                pullType: r.alias("ceremonyData.pullType"),
                currencySegmentData: r.alias("activeBanner.celebrationTheme.currencySegmentData"),
                currencyLottiePath: r.alias("currencySegmentData.lottieJsonPath"),
                currencyLottieImagePath: r("currencyLottiePath", (function() {
                    if (!this.get("currencyLottiePath")) return s.logger.error("`currencyLottieImagePath` will be empty"), "";
                    const e = this.get("currencyLottiePath");
                    return e.substr(0, e.lastIndexOf("/") + 1) + "images/"
                })),
                currencyParams: r("pullType", (function() {
                    let e = this.get("pullType");
                    return e && !isNaN(e) || (e = a.PULL_TYPE_SINGLE), {
                        "param-single-multi-mythic-slider": e
                    }
                })),
                currentlyPlayingPortal: !1,
                showPortal: r.or("currentlyPlayingPortal", "playPortalSegment"),
                highlightRewardsExist: r("highlightRewards", (function() {
                    return this.get("highlightRewards").length > 0
                })),
                highlightSegmentData: r.alias("activeBanner.celebrationTheme.highlightSegmentData"),
                highlightRevealSfxSrc: s.Ember.computed.alias("highlightSegmentData.revealSoundPath"),
                highlightTransitionWipeSfxSrc: s.Ember.computed.alias("highlightSegmentData.transitionWipeSoundPath"),
                hasHighlight: r.bool("highlightLottiePath"),
                pauseHighlightSegment: !1,
                highlightLottieImagePath: r("highlightLottiePath", (function() {
                    if (this.get("highlightLottiePath")) {
                        const e = this.get("highlightLottiePath");
                        return e.substr(0, e.lastIndexOf("/") + 1) + "images/"
                    }
                    return ""
                })),
                standardSegmentData: r.alias("activeBanner.celebrationTheme.standardSegmentData"),
                standardRewardsExist: r("standardRewards", (function() {
                    return this.get("standardRewards").length > 0
                })),
                _playSFX(e) {
                    s.Audio.getChannel(o).playSound(e)
                },
                didInsertElement() {
                    this._super(...arguments);
                    const e = s.Viewport.getApiKey("rcp-fe-lol-tft-troves_api_key");
                    this._screenRoot = s.Viewport.overlay().getScreenRoot(e, "rcp-fe-lol-tft-troves-ceremony");
                    const t = this.get("element");
                    this._screenRoot.getElement().appendChild(t)
                },
                didReceiveAttrs() {
                    this._super(...arguments);
                    const e = this.get("ceremonyData");
                    e && (this.get("ceremonyInProgress") || s.Ember.run.scheduleOnce("afterRender", this, (() => {
                        this._screenRoot && this._screenRoot.bump(), e.ceremonyState ? (s.logger.info("DEV ceremonyData has a dev-only ceremonyState field"), this.set("ceremonyState", e.ceremonyState)) : this.set("ceremonyState", a.CEREMONY_STATE_CURRENCY)
                    })))
                },
                resetState() {
                    this._currentSFXUI && this._currentSFXUI.isPlaying() && (this._currentSFXUI.stop(), this._currentSFXUI = null), this.set("ceremonyState", a.CEREMONY_STATE_NONE);
                    this.get("trovesService").clearCeremonyData()
                },
                exit() {
                    this._screenRoot.release(), this.resetState()
                },
                didUpdateAttrs: function() {
                    this._super(...arguments), this.get("shouldShow") && !this.get("ceremonyInProgress") && (this._screenRoot.bump(), this.set("ceremonyState", a.CEREMONY_STATE_CURRENCY))
                },
                _currentSFXUI: null,
                sfxCurrencySrc: r("currencySegmentData", (function() {
                    const e = this.get("currencySegmentData");
                    switch (this.get("pullType")) {
                        case a.PULL_TYPE_MULTI:
                            return e.multiPullSoundPath;
                        case a.PULL_TYPE_MYTHIC:
                            return e.mythicPullSoundPath;
                        case a.PULL_TYPE_SINGLE:
                        default:
                            return e.singlePullSoundPath
                    }
                })),
                portalSegmentData: r.alias("activeBanner.celebrationTheme.portalSegmentData"),
                actions: {
                    onCurrencyComplete() {
                        this.get("ceremonyState") === a.CEREMONY_STATE_CURRENCY && this.set("ceremonyState", a.CEREMONY_STATE_PORTAL)
                    },
                    onPortalPlayback() {
                        this.set("currentlyPlayingPortal", !0), s.Ember.run.later(this, (function() {
                            this.get("highlightRewardsExist") ? (this.set("ceremonyState", a.CEREMONY_STATE_HIGHLIGHT), this._playSFX(this.get("highlightRevealSfxSrc")), s.Ember.run.later(this, (function() {
                                this.set("pauseHighlightSegment", !0)
                            }), a.HIGHLIGHT_SEGMENT_PAUSE_OFFSET_MS)) : this.set("ceremonyState", a.CEREMONY_STATE_STANDARD)
                        }), a.POST_PORTAL_SEGMENT_OFFSET_MS)
                    },
                    onPortalComplete() {
                        this.set("currentlyPlayingPortal", !1)
                    },
                    onHighlightComplete() {
                        this.get("standardRewardsExist") ? this.set("ceremonyState", a.CEREMONY_STATE_STANDARD) : this.exit()
                    },
                    onHighlightContinueClick() {
                        this.set("pauseHighlightSegment", !1), this.get("standardRewardsExist") ? this._playSFX(this.get("highlightTransitionWipeSfxSrc")) : this.exit()
                    },
                    onStandardComplete() {
                        this.get("ceremonyState") === a.CEREMONY_STATE_STANDARD && this.exit()
                    }
                }
            });
            t.default = u
        }, (e, t, n) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = void 0;
            var s = n(1),
                a = n(75);
            const {
                Component: l,
                computed: o
            } = s.Ember;
            var i = l.extend({
                classNames: ["highlight-rewards"],
                classNameBindings: ["playAnimation:playing:not-playing", "pauseAnimation:paused:unpaused"],
                highlightSegmentData: null,
                playAnimation: !1,
                rewards: null,
                buttonText: "",
                pullType: "",
                transitionWipeSfxSrc: s.Ember.computed.alias("highlightSegmentData.transitionWipeSoundPath"),
                onButtonClick: null,
                highlightParams: o("highlightRewardsExist", "highlightSliderValue", (function() {
                    return {
                        "param-reward-type-slider": this.get("highlightSliderValue")
                    }
                })),
                highlightSliderValue: o("ceremonyData", "pullType", "highlightRewardsExist", (function() {
                    switch (this.get("rewards")[0].itemTypeId) {
                        case a.TYPE_ID_PROMISETOKEN:
                            return this.get("pullType") === a.PULL_TYPE_MULTI ? a.HIGHLIGHT_SLIDER_VALUE_MULTI_PROMISETOKEN : a.HIGHLIGHT_SLIDER_VALUE_SINGLE_PROMISETOKEN;
                        case a.TYPE_ID_COMPANION:
                            return this.get("pullType") === a.PULL_TYPE_MULTI ? a.HIGHLIGHT_SLIDER_VALUE_MULTI_COMPANION : a.HIGHLIGHT_SLIDER_VALUE_SINGLE_COMPANION;
                        case a.TYPE_ID_MAPSKIN:
                        default:
                            return this.get("pullType") === a.PULL_TYPE_MULTI ? a.HIGHLIGHT_SLIDER_VALUE_MULTI_MAPSKIN : a.HIGHLIGHT_SLIDER_VALUE_SINGLE_MAPSKIN
                    }
                })),
                highlightReplacementImages: o("rewards", (function() {
                    const e = this.get("rewards")[0];
                    if (e.itemTypeId === a.TYPE_ID_PROMISETOKEN) return {};
                    return {
                        [e.itemTypeId === a.TYPE_ID_COMPANION ? "asset-little-legend.png" : "asset-arena.png"]: e.highlightRewardAssetPath ? e.highlightRewardAssetPath : e.rewardTexturePath
                    }
                })),
                highlightReplacementText: o("highlightSegmentData", "rewards", (function() {
                    const e = this.get("rewards")[0],
                        t = {
                            rewardName: e.name
                        };
                    if (e.itemTypeId === a.TYPE_ID_PROMISETOKEN) {
                        const e = this.get("highlightSegmentData");
                        t.title = e.promiseTokenTitle, t.rewardDescription = e.promiseTokenDescription
                    }
                    return t
                })),
                highlightLottiePath: o.alias("highlightSegmentData.lottieJsonPath"),
                pauseHighlightSegment: !1,
                highlightLottieImagePath: o("highlightLottiePath", (function() {
                    if (this.get("highlightLottiePath")) {
                        const e = this.get("highlightLottiePath");
                        return e.substr(0, e.lastIndexOf("/") + 1) + "images/"
                    }
                    return ""
                }))
            });
            t.default = i
        }, (e, t, n) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = void 0;
            var s = n(1),
                a = n(75),
                l = n(2);
            const {
                SFX_SUB_CHANNEL_UI_NAME: o
            } = l.AUDIO_CHANNELS, {
                Component: i,
                computed: r
            } = s.Ember, c = "UX Choice: no reveal sound";
            var m = i.extend({
                classNames: ["standard-rewards"],
                standardSegmentData: null,
                rewards: null,
                highlightRewardsExist: !1,
                trovesService: s.Ember.inject.service("tftTroves"),
                headerText: r.alias("standardSegmentData.PCHeaderText"),
                buttonText: r.alias("standardSegmentData.PCButtonText"),
                onButtonClick: null,
                backgroundPath: r.alias("standardSegmentData.PCBackgroundPath"),
                firstItemTimingOffset: r("standardSegmentData.FirstItemTimingOffset", (function() {
                    return 1e3 * this.get("standardSegmentData.FirstItemTimingOffset")
                })),
                interItemTimingOffset: r("standardSegmentData.InterItemTimingOffset", (function() {
                    return 1e3 * this.get("standardSegmentData.InterItemTimingOffset")
                })),
                rewardStaggeredLists: null,
                isSingleReward: r.equal("rewards.length", 1),
                singleStandardRewardName: r("rewards", (function() {
                    const e = this.get("rewards");
                    return 1 === e.length ? e[0].name : null
                })),
                _resetRewardStaggeredLists(e) {
                    const t = s.Ember.A([s.Ember.A([])]);
                    this.get("rewards.length") > 5 && t.pushObject(s.Ember.A([]));
                    for (let n = 0; n < e; n++) n < 5 ? t[0].push(null) : t[1].push(null);
                    this.set("rewardStaggeredLists", t)
                },
                _renderRewardsStaggeredList() {
                    this._resetRewardStaggeredLists(this.get("rewards").length), s.Ember.run.scheduleOnce("afterRender", this, (() => {
                        this.get("rewards").length > 0 && this._scheduleNextRewardRender(0, this.get("firstItemTimingOffset"))
                    }))
                },
                _scheduleNextRewardRender(e, t) {
                    s.Ember.run.later((() => {
                        const t = this.get("rewards");
                        this._pushToRewardStaggeredLists(e, t[e]), e + 1 < t.length && this._scheduleNextRewardRender(e + 1, this.get("interItemTimingOffset"))
                    }), t)
                },
                _pushToRewardStaggeredLists(e, t) {
                    const n = this.get("rewardStaggeredLists");
                    if (e < 5) n[0].replace(e, 1, t);
                    else {
                        const s = e - 5;
                        n[1].replace(s, 1, t)
                    }
                },
                _getRevealSfxPath() {
                    if (this.get("highlightRewardsExist")) return c;
                    const e = this.get("standardSegmentData"),
                        t = this.get("rewards");
                    if (1 === t.length) {
                        switch (t[0].rarity) {
                            case a.ROLL_REWARD_RARITY_STRING_RARE:
                                return e.revealRareSoundPath;
                            case a.ROLL_REWARD_RARITY_STRING_EPIC:
                                return e.revealEpicSoundPath;
                            case a.ROLL_REWARD_RARITY_STRING_MYTHIC:
                                return e.revealMythicSoundPath
                        }
                    }
                    return e.revealRareSoundPath
                },
                init() {
                    this._super(...arguments);
                    const e = this._getRevealSfxPath();
                    e !== c && s.Audio.getChannel(o).playSound(e);
                    const t = this.get("standardSegmentData");
                    s.Audio.getChannel(o).playSound(t.revealGlobalSoundPath)
                },
                didInsertElement() {
                    this._super(...arguments);
                    const e = this.get("backgroundPath");
                    this.element.style.backgroundImage = `url(${e})`, this._renderRewardsStaggeredList()
                }
            });
            t.default = m
        }, (e, t, n) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = void 0;
            var s = n(1),
                a = n(75);
            const {
                Component: l,
                computed: o
            } = s.Ember;
            var i = l.extend({
                classNames: ["rcp-fe-lol-tft-troves-chased-content"],
                showDropRatesModal: !1,
                moreInfoIcon: "/fe/lol-tft-troves/images/TFT_Icon_moreInfo.png",
                chasedContent: null,
                onPityUpdate: null,
                pityCounter: o("chasedContent.status", "chasedContent.pityLimit", (function() {
                    const e = this.get("chasedContent.pityLimit"),
                        t = this.get("chasedContent.status.pityCount"),
                        n = Math.max(e - t, 0);
                    return this.get("onPityUpdate") && this.get("onPityUpdate")(n), n
                })),
                pityText: o("pityCounter", "chasedContent.name", "chasedContent.status", (function() {
                    const e = this.get("pityCounter"),
                        t = this.get("tra");
                    if (isNaN(e)) return t.formatString("troves_chased_content_pity_text_loading");
                    let n = this.get("chasedContent.name");
                    const s = this.get("chasedContent.status"),
                        a = s && s.owned;
                    a && (n = this.get("tra.troves_promise_token"));
                    const l = {
                        pity_count: e,
                        name: n
                    };
                    let o;
                    if (this.get("chasedContent.isCollectorBounty")) {
                        const e = this.get("chasedContent.maxTotalRolls"),
                            t = this.get("chasedContent.status.totalRollsCount");
                        l.max_roll = e, l.pity_count = e - t, o = s.isCollectorBountyMaxRollsMet ? "troves_collectors_pity_max_rolls_text" : a ? "troves_collectors_pity_owned_text" : "troves_collectors_pity_text"
                    } else o = "troves_chased_content_pity_text";
                    return t.formatString(o, l)
                })),
                legalDisclaimer: o("chasedContent.isCollectorBounty", (function() {
                    const e = this.get("chasedContent.isCollectorBounty"),
                        t = this.get("tra"),
                        n = e ? "collectors_loot_odds_bad_luck_protection_badge_title" : "troves_loot_odds_bad_luck_protection_badge_title",
                        s = e ? "collectors_loot_odds_bad_luck_protection_title" : "troves_loot_odds_bad_luck_protection_title",
                        a = e ? "collectors_loot_odds_bad_luck_protection_description" : "troves_loot_odds_bad_luck_protection_description",
                        l = {
                            badgeTitle: t.get(n),
                            title: t.get(s),
                            description: t.get(a),
                            iconCssClass: "bad-luck-protection-icon"
                        };
                    return e && (l.subtitle = t.get("collectors_loot_odds_droprates_modal_legal_disclaimer_subtitle")), l
                })),
                _sendMoreInfoClickedTelemetry() {
                    s.Telemetry.sendCustomData(a.TELEMETRY_TABLE_NAME, {
                        [a.TELEMETRY_EVENT_KEY_EVENT_NAME]: a.TELEMETRY_EVENT_NAME_SHOW_DETAILS,
                        [a.TELEMETRY_EVENT_KEY_ACTIVE_BANNER_SOURCE_ID]: this.get("chasedContent.sourceId")
                    })
                },
                actions: {
                    onMoreInfoClicked: function() {
                        this._sendMoreInfoClickedTelemetry(), this.set("showDropRatesModal", !0)
                    },
                    hideDropRatesModal: function() {
                        this.set("showDropRatesModal", !1)
                    }
                }
            });
            t.default = i
        }, (e, t, n) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = void 0;
            var s = n(1),
                a = n(75);
            const l = n(124),
                {
                    Component: o,
                    computed: i
                } = s.Ember,
                r = "troves-hub-banner-error",
                c = "troves-hub-banner-empty",
                m = "troves-hub-cloud-platform-image";
            var u = o.extend({
                classNames: ["rcp-fe-lol-tft-troves"],
                trovesService: s.Ember.inject.service("tftTroves"),
                activeBanner: null,
                onBannerSelected: null,
                isLoading: i.alias("trovesService.isLoading"),
                hasBannerError: i.alias("trovesService.hasBannerError"),
                trovesPromoAssets: i.alias("trovesService.trovesPromoAssets"),
                activeBanners: i.alias("trovesService.troveActiveBanners"),
                _visitId: null,
                isEmpty: i.empty("activeBanners"),
                errorBannerImage: i("trovesPromoAssets", (function() {
                    const e = this.get("trovesPromoAssets");
                    return e && e[r] ? e[r] : ""
                })),
                emptyBannerImage: i("trovesPromoAssets", (function() {
                    const e = this.get("trovesPromoAssets");
                    return e && e[c] ? e[c] : ""
                })),
                cloudPlatformImage: i("trovesPromoAssets", (function() {
                    const e = this.get("trovesPromoAssets");
                    return e && e[m] ? e[m] : ""
                })),
                activePlatformImage: i("cloudPlatformImage", "activeBanner", (function() {
                    const e = this.get("activeBanner");
                    return e && e.platformTexture && e.platformTexture.endsWith(".png") ? e.platformTexture : this.get("cloudPlatformImage")
                })),
                selectedChasedContentId: null,
                activeBannerStatus: i.alias("activeBanner.status"),
                currencySegmentData: i.alias("activeBanner.celebrationTheme.currencySegmentData"),
                pullCost: i.alias("activeBanner.pullCost"),
                selectedOfferId: i.alias("activeBanner.rollOffer"),
                showBannersList: i("activeBanners", (function() {
                    const e = this.get("activeBanners");
                    return e && e.length > 1
                })),
                mythicOfferId: i("activeBanner", (function() {
                    const e = this.get("activeBanner");
                    return e ? e.mythicOffer : null
                })),
                didInsertElement() {
                    this._super(...arguments);
                    const e = l();
                    this.set("_visitId", e), s.Telemetry.sendCustomData(a.TELEMETRY_TABLE_NAME, {
                        [a.TELEMETRY_EVENT_KEY_EVENT_NAME]: a.TELEMETRY_EVENT_NAME_TROVES_VISITED,
                        [a.TELEMETRY_EVENT_KEY_VISIT_ID]: e,
                        [a.TELEMETRY_EVENT_KEY_ACTIVE_BANNER_SOURCE_ID]: this.get("activeBanner.sourceId")
                    })
                },
                _sendBannerSelectedTelemetry() {
                    s.Telemetry.sendCustomData(a.TELEMETRY_TABLE_NAME, {
                        [a.TELEMETRY_EVENT_KEY_EVENT_NAME]: a.TELEMETRY_EVENT_NAME_BANNER_SELECTED,
                        [a.TELEMETRY_EVENT_KEY_ACTIVE_BANNER_SOURCE_ID]: this.get("activeBanner.sourceId"),
                        [a.TELEMETRY_EVENT_KEY_VISIT_ID]: this.get("_visitId")
                    })
                },
                actions: {
                    setSelectedChasedContentId(e) {
                        this.get("selectedChaseContentId") !== e && (this.set("selectedChasedContentId", e), this.sendAction("onBannerSelected", e), this._sendBannerSelectedTelemetry())
                    },
                    onPityUpdate(e) {
                        this.set("pityCount", e)
                    }
                }
            });
            t.default = u
        }, (e, t, n) => {
            var s = n(125),
                a = n(126);
            e.exports = function(e, t, n) {
                var l = t && n || 0;
                "string" == typeof e && (t = "binary" === e ? new Array(16) : null, e = null);
                var o = (e = e || {}).random || (e.rng || s)();
                if (o[6] = 15 & o[6] | 64, o[8] = 63 & o[8] | 128, t)
                    for (var i = 0; i < 16; ++i) t[l + i] = o[i];
                return t || a(o)
            }
        }, e => {
            var t = "undefined" != typeof crypto && crypto.getRandomValues && crypto.getRandomValues.bind(crypto) || "undefined" != typeof msCrypto && "function" == typeof window.msCrypto.getRandomValues && msCrypto.getRandomValues.bind(msCrypto);
            if (t) {
                var n = new Uint8Array(16);
                e.exports = function() {
                    return t(n), n
                }
            } else {
                var s = new Array(16);
                e.exports = function() {
                    for (var e, t = 0; t < 16; t++) 0 == (3 & t) && (e = 4294967296 * Math.random()), s[t] = e >>> ((3 & t) << 3) & 255;
                    return s
                }
            }
        }, e => {
            for (var t = [], n = 0; n < 256; ++n) t[n] = (n + 256).toString(16).substr(1);
            e.exports = function(e, n) {
                var s = n || 0,
                    a = t;
                return [a[e[s++]], a[e[s++]], a[e[s++]], a[e[s++]], "-", a[e[s++]], a[e[s++]], "-", a[e[s++]], a[e[s++]], "-", a[e[s++]], a[e[s++]], "-", a[e[s++]], a[e[s++]], a[e[s++]], a[e[s++]], a[e[s++]], a[e[s++]]].join("")
            }
        }, (e, t, n) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = void 0;
            var s = n(1),
                a = n(75),
                l = n(2);
            const {
                SFX_SUB_CHANNEL_AMBIENCE_INTERRUPTABLE_NAME: o
            } = l.AUDIO_CHANNELS, {
                Component: i,
                computed: r
            } = s.Ember;
            var c = i.extend({
                classNames: ["reward-card"],
                reward: null,
                shouldPlayGlint: !1,
                standardSegmentData: null,
                framePath: r.alias("standardSegmentData.PCRewardFramePath"),
                rewardFadeInDuration: r("standardSegmentData.PCRewardFadeInDuration", (function() {
                    return this._formatAsSeconds(this.get("standardSegmentData.PCRewardFadeInDuration"))
                })),
                rewardFadeInDelay: r("standardSegmentData.PCRewardFadeInDelay", (function() {
                    return this._formatAsSeconds(this.get("standardSegmentData.PCRewardFadeInDelay"))
                })),
                sheenPath: r.alias("standardSegmentData.PCRewardSheenPath"),
                sheenDuration: r("standardSegmentData.PCRewardSheenDuration", (function() {
                    return this._formatAsSeconds(this.get("standardSegmentData.PCRewardSheenDuration"))
                })),
                sheenDelay: r("standardSegmentData.PCRewardSheenDelay", (function() {
                    return this._formatAsSeconds(this.get("standardSegmentData.PCRewardSheenDelay"))
                })),
                thumbnailFadeInDuration: r("standardSegmentData.PCThumbnailFadeInDuration", (function() {
                    return this._formatAsSeconds(this.get("standardSegmentData.PCThumbnailFadeInDuration"))
                })),
                thumbnailFadeInDelay: r("standardSegmentData.PCThumbnailFadeInDelay", (function() {
                    return this._formatAsSeconds(this.get("standardSegmentData.PCThumbnailFadeInDelay"))
                })),
                glintDelay: r("standardSegmentData.PCGlintSprite.delay", (function() {
                    return this._formatAsSeconds(this.get("standardSegmentData.PCGlintSprite.delay"))
                })),
                glintDuration: r("standardSegmentData.PCGlintSprite.delay", "standardSegmentData.PCGlintSprite.duration", (function() {
                    const e = this.get("standardSegmentData.PCGlintSprite.duration") - this.get("standardSegmentData.PCGlintSprite.delay");
                    return this._formatAsSeconds(e)
                })),
                isLegendary: r.equal("reward.rarity", a.ROLL_REWARD_RARITY_STRING_LEGENDARY),
                starPath: r("reward", "standardSegmentData", (function() {
                    const e = this.get("reward"),
                        t = this.get("standardSegmentData");
                    switch (e.starLevel) {
                        case a.STAR_LEVEL_1:
                            return t.PCRewardOneStarPath;
                        case a.STAR_LEVEL_2:
                            return t.PCRewardTwoStarPath;
                        case a.STAR_LEVEL_3:
                            return t.PCRewardThreeStarPath;
                        default:
                            s.logger.error("No asset path for reward star level " + e.starLevel)
                    }
                    return null
                })),
                gemPath: r("reward", "standardSegmentData", (function() {
                    const e = this.get("reward"),
                        t = this.get("standardSegmentData");
                    switch (e.rarity) {
                        case a.ROLL_REWARD_RARITY_STRING_RARE:
                            return t.PCRewardRareGemPath;
                        case a.ROLL_REWARD_RARITY_STRING_EPIC:
                            return t.PCRewardEpicGemPath;
                        case a.ROLL_REWARD_RARITY_STRING_LEGENDARY:
                            return t.PCRewardLegendaryGemPath;
                        case a.ROLL_REWARD_RARITY_STRING_MYTHIC:
                            return t.PCRewardMythicGemPath;
                        default:
                            s.logger.error("No asset path for reward rarity " + e.rarity)
                    }
                    return null
                })),
                _formatAsSeconds: e => e ? `${e}s` : "0s",
                _playSFX() {
                    const e = this.get("standardSegmentData"),
                        t = this.get("isLegendary") ? e.pullSingleIndividualGlintLegendarySoundPath : e.pullSingleIndividualGlintSoundPath;
                    s.Audio.getChannel(o).playSound(t)
                },
                rarityCssClass: s.Ember.computed("reward.rarity", (function() {
                    return (this.get("reward.rarity") || "default").toLowerCase()
                })),
                didInsertElement() {
                    this._super(...arguments), this._playSFX(), requestAnimationFrame((() => {
                        this.element.querySelector(".reward-card-content").classList.add("reward-card-content--reveal"), this.element.querySelector(".cover").classList.add("cover--reveal"), this.element.querySelector(".sheen").classList.add("sheen--animate"), this.get("shouldPlayGlint") && this.element.querySelector(".glint-anim").classList.add("glint-anim--translate")
                    }))
                }
            });
            t.default = c
        }, (e, t, n) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = void 0;
            var s = n(1),
                a = n(75),
                l = n(2);
            const {
                SFX_SUB_CHANNEL_UI_NAME: o
            } = l.AUDIO_CHANNELS, {
                Component: i,
                computed: r
            } = s.Ember;
            var c = i.extend({
                classNames: "portal-video",
                play: null,
                portalSegmentData: null,
                maxRarityInRewards: null,
                pullType: null,
                onPlayback: null,
                onError: null,
                onPlaybackComplete: null,
                _videoInProgress: !1,
                _currentSFX: null,
                didRender() {
                    if (this._super(...arguments), !this.get("play")) return;
                    if (this.get("_videoInProgress")) return;
                    const e = this.element.querySelector("uikit-video");
                    this._play(e)
                },
                _play(e) {
                    this.set("_videoInProgress", !0);
                    e.play((() => {
                        this._playPortalSfx();
                        const e = this.get("onPlayback");
                        e && e()
                    }), (() => {
                        const e = this.get("onError");
                        e && e()
                    }), (() => {
                        this.set("_videoInProgress", !1), this._currentSFX = null;
                        const e = this.get("onPlaybackComplete");
                        e && e()
                    }))
                },
                _playPortalSfx() {
                    const e = this.get("portalSegmentData");
                    let t = e.singlePullSoundPath;
                    return t = this.get("pullType") === a.PULL_TYPE_MULTI ? e.multiPullSoundPath : t, this._currentSFX = s.Audio.getChannel(o).createSound(t), this._currentSFX.play()
                },
                portalVideoPath: r("portalSegmentData", "maxRarityInRewards", "pullType", (function() {
                    const e = this.get("portalSegmentData"),
                        t = this.get("pullType") === a.PULL_TYPE_MULTI,
                        n = this.get("maxRarityInRewards");
                    if (t) {
                        if (n === a.ROLL_REWARD_RARITY_RARE) return e.multiPullRareWebmPath;
                        if (n === a.ROLL_REWARD_RARITY_EPIC) return e.multiPullEpicWebmPath;
                        if (n === a.ROLL_REWARD_RARITY_LEGENDARY) return e.multiPullLegendaryWebmPath;
                        if (n === a.ROLL_REWARD_RARITY_MYTHIC) return e.multiPullMythicWebmPath
                    }
                    return n === a.ROLL_REWARD_RARITY_RARE ? e.singlePullRareWebmPath : n === a.ROLL_REWARD_RARITY_EPIC ? e.singlePullEpicWebmPath : n === a.ROLL_REWARD_RARITY_LEGENDARY ? e.singlePullLegendaryWebmPath : n === a.ROLL_REWARD_RARITY_MYTHIC ? e.singlePullMythicWebmPath : (s.logger.error("couldn't choose a portal, loading default portal"), e.singlePullRareWebmPath)
                }))
            });
            t.default = c
        }, (e, t, n) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = void 0;
            var s = n(1);
            const {
                Component: a,
                computed: l
            } = s.Ember, o = 1e3;
            var i = a.extend({
                classNames: ["troves-sprite-animation"],
                sprite: null,
                numRows: l.alias("sprite.numRows"),
                numCols: l.alias("sprite.numCols"),
                backgroundImage: null,
                currentFrame: 0,
                playCount: 0,
                delayTimeout: null,
                durationTimeout: null,
                animationInterval: null,
                elementStyle: l("backgroundImage", "backgroundPositionX", "backgroundPositionY", "numRows", "numCols", (function() {
                    return s.Ember.String.htmlSafe(`\n        background-image: url(${this.get("backgroundImage")});\n        top: -${100*this.get("backgroundPositionY")}%;\n        left: -${100*this.get("backgroundPositionX")}%;\n        width: ${100*this.get("numCols")}%;\n        height: ${100*this.get("numRows")}%;\n      `)
                })),
                play() {
                    if (this.get("delayTimeout") || this.get("durationTimeout") || this.get("animationInterval")) return;
                    const e = this.get("sprite.maxPlayCount");
                    this.set("delayTimeout", setTimeout((() => {
                        this.set("playCount", 0), this.set("backgroundImage", this.get("sprite.spritesheetPath"));
                        const t = this.get("numCols"),
                            n = this.get("sprite.numFrames");
                        let s = this.get("sprite.startFrame");
                        this.set("animationInterval", setInterval((() => {
                            if (this.set("backgroundPositionY", Math.floor(s / t)), this.set("backgroundPositionX", s % t), ++s, s === n) {
                                let t = this.get("playCount");
                                ++t, this.set("playCount", t), -1 === e || t < e ? s = 0 : this.stop()
                            }
                        }), o / this.get("sprite.fps")))
                    }), o * this.get("sprite.delay")));
                    const t = this.get("sprite.duration");
                    t > 0 && -1 !== e && this.set("durationTimeout", setTimeout((() => {
                        this.stop()
                    }), o * t))
                },
                stop() {
                    clearTimeout(this.get("delayTimeout")), clearTimeout(this.get("durationTimeout")), clearInterval(this.get("animationInterval")), this.set("delayTimeout", null), this.set("durationTimeout", null), this.set("animationInterval", null), this.set("backgroundImage", null), this.set("backgroundPositionX", 0), this.set("backgroundPositionY", 0)
                },
                didInsertElement() {
                    this.get("sprite.playAtInsert") && this.play()
                },
                willDestroyElement() {
                    this.stop()
                }
            });
            t.default = i
        }, (e, t, n) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = void 0;
            var s = n(1);
            n(3);
            var a = s.Ember.Controller.extend({
                routing: s.Ember.inject.service("-routing"),
                routeName: s.Ember.computed.alias("routing.currentRouteName"),
                tftService: s.Ember.inject.service("tft"),
                lastTFTSetSeen: s.Ember.computed.alias("tftService.lastTftSetCoreNameSeen"),
                currentDefaultTFTSet: s.Ember.computed.alias("tftService.currentDefaultTFTSet"),
                isHidden: s.Ember.computed.alias("tftService.isHidden"),
                mapData: s.Ember.computed.alias("tftService.mapData"),
                setAnnouncementData: s.Ember.computed.alias("mapData.categorizedContentBundles.set_announcement_modal"),
                setAnnouncementBackgroundImage: s.Ember.computed.alias("mapData.assets.set-announcement-background"),
                setAnnouncementSplash: s.Ember.computed.alias("mapData.assets.set-announcement-right-panel-background"),
                showSetAnnouncement: s.Ember.computed("isHidden", "lastTFTSetSeen", "currentDefaultTFTSet", (function() {
                    if (this.get("isHidden")) return !1;
                    const e = this.get("currentDefaultTFTSet");
                    if (null === e || "TFTSet9_2" === e) return !1;
                    const t = this.get("lastTFTSetSeen");
                    return null !== t && t !== e
                })),
                actions: {
                    confirm: function() {
                        this.get("tftService").recordSetAnnouncementSeen()
                    }
                }
            });
            t.default = a
        }, (e, t, n) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = void 0;
            var s = n(1);
            n(3);
            var a = s.Ember.Controller.extend({
                tftService: s.Ember.inject.service("tft"),
                hubBackground: s.Ember.computed("tftService.media", (function() {
                    return this.get("tftService.media.background--battlepass")
                })),
                battlePass: s.Ember.computed.alias("tftService.battlePassV2"),
                media: s.Ember.computed.alias("tftService.media"),
                isBattlePassXPBoosted: s.Ember.computed.alias("tftService.isBattlePassXPBoosted"),
                claimRewardsFunc: s.Ember.computed.alias("tftService.claimRewards"),
                markMissionsAsViewedFunc: s.Ember.computed.alias("tftService.markMissionsAsViewed"),
                celebratePassCompletionFunc: s.Ember.computed.alias("tftService.celebratePassCompletion")
            });
            t.default = a
        }, (e, t, n) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = void 0;
            var s = n(1);
            n(3);
            var a = s.Ember.Controller.extend({
                tftService: s.Ember.inject.service("tft"),
                hubBackground: s.Ember.computed("tftService.media", (function() {
                    return this.get("tftService.media.background--battlepass")
                }))
            });
            t.default = a
        }, (e, t, n) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = void 0;
            var s = n(1);
            n(3);
            var a = s.Ember.Controller.extend({
                tftService: s.Ember.inject.service("tft"),
                eogBackground: s.Ember.computed("tftService.media", (function() {
                    return this.get("tftService.media.background--eog")
                })),
                defaultBackground: "/fe/lol-static-assets/images/uikit/backdrop-magic/backdrop-magic.png"
            });
            t.default = a
        }, (e, t, n) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = void 0;
            var s = n(1);
            n(3);
            var a = s.Ember.Controller.extend({
                tftService: s.Ember.inject.service("tft"),
                hubBackground: s.Ember.computed("tftService.media", (function() {
                    return this.get("tftService.media.background--battlepass")
                }))
            });
            t.default = a
        }, (e, t, n) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = void 0;
            var s = n(1);
            n(3);
            const a = "troves-hub-background-image";
            var l = s.Ember.Controller.extend({
                queryParams: ["displayedBannerId"],
                displayedBannerId: "",
                tftService: s.Ember.inject.service("tft"),
                trovesService: s.Ember.inject.service("tftTroves"),
                trovesV2Enabled: s.Ember.computed("trovesService.trovesV2Enabled", (function() {
                    this.get("trovesService.trovesV2Enabled");
                    return !1
                })),
                trovesPromoAssets: s.Ember.computed.alias("trovesService.trovesPromoAssets"),
                activeBanners: s.Ember.computed.alias("trovesService.troveActiveBanners"),
                activeBannersById: s.Ember.computed("activeBanners", (function() {
                    const e = this.get("activeBanners"),
                        t = new Map;
                    for (const n of e) t.set(n.id, n);
                    return t
                })),
                displayedBanner: s.Ember.computed("activeBannersById", "displayedBannerId", (function() {
                    let e = this.get("displayedBannerId");
                    if (!e) {
                        const t = this.get("activeBanners");
                        t && t.length && (e = t[0].id)
                    }
                    const t = this.get("activeBannersById");
                    return t && t.has(e) ? t.get(e) : null
                })),
                backgroundPath: s.Ember.computed("trovesPromoAssets", "displayedBanner", (function() {
                    const e = this.get("displayedBanner");
                    return e && e.backgroundTexture && e.backgroundTexture.endsWith(".png") ? this._computeBackgroundPath(this.get("trovesPromoAssets"), e.backgroundTexture) : this._computeBackgroundPath(this.get("trovesPromoAssets"), "")
                })),
                _computeBackgroundPath(e, t) {
                    return t && t.endsWith(".png") ? t : e && e[a] ? e[a] : this.get("tftService.media.background--battlepass")
                },
                actions: {
                    onBannerSelected(e) {
                        this.set("displayedBannerId", e)
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
                a = n(2);
            n(3);
            var l = s.Ember.Controller.extend({
                queryParams: {
                    url: {
                        refreshModel: !0
                    }
                },
                url: "",
                displayEventPass: !1,
                tftService: s.Ember.inject.service("tft"),
                battlePass: s.Ember.computed.alias("tftService.tftPassEventPass"),
                hideEventPass: s.Ember.computed.not("displayEventPass"),
                media: s.Ember.computed.alias("battlePass.info.media"),
                eventHubAssets: s.Ember.computed.alias("tftService.eventHubAssets"),
                eventHubBackgroundImagePath: s.Ember.computed("eventHubAssets", (function() {
                    const e = this.get("eventHubAssets");
                    return e ? e["lny24-event-hub-background"] : ""
                })),
                hubBackground: s.Ember.computed("media", "displayEventPass", (function() {
                    return this.displayEventPass ? this.get("media.background--eventpass") : this.get("eventHubBackgroundImagePath")
                })),
                telemetryEventPassTimeStart: null,
                telemetryEventPassTimeSpent: null,
                showEventPass() {
                    this.set("displayEventPass", !0);
                    const e = this.get("tftService");
                    e && (e.set("isSubNavEnabled", !1), e.set("isHeaderButtonsEnabled", !1)), this.set("telemetryEventPassOpenTimeStart", Date.now()), s.Telemetry.sendCustomData(a.DEFAULT_TELEMETRY_TABLE, a.TFT_TELEMETRY_EVENT.formatOpen(a.TFT_TELEMETRY_EVENT.FROM.EVENT_PASS))
                },
                actions: {
                    toggleEventPass() {
                        this.toggleProperty("displayEventPass");
                        const e = this.get("tftService");
                        e && (this.get("displayEventPass") ? (e.set("isSubNavEnabled", !1), e.set("isHeaderButtonsEnabled", !1)) : (e.set("isSubNavEnabled", !0), e.set("isHeaderButtonsEnabled", !0))), this.get("displayEventPass") ? (this.set("telemetryEventPassTimeStart", Date.now()), s.Telemetry.sendCustomData(a.DEFAULT_TELEMETRY_TABLE, a.TFT_TELEMETRY_EVENT.formatOpen(a.TFT_TELEMETRY_EVENT.FROM.EVENT_PASS))) : (s.Telemetry.sendCustomData(a.DEFAULT_TELEMETRY_TABLE, a.TFT_TELEMETRY_EVENT.formatClose(a.TFT_TELEMETRY_EVENT.FROM.EVENT_PASS)), this.set("telemetryEventPassTimeSpent", Date.now() - this.get("telemetryEventPassTimeStart")), s.Telemetry.sendCustomData(a.DEFAULT_TELEMETRY_TABLE, a.TFT_TELEMETRY_EVENT.formatTimeSpent(a.TFT_TELEMETRY_EVENT.FROM.EVENT_PASS, this.get("telemetryEventPassTimeSpent"))))
                    }
                }
            });
            t.default = l
        }, (e, t, n) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = t.DEFAULT_RANKED_STATS = void 0;
            var s, a = n(1),
                l = (s = n(138)) && s.__esModule ? s : {
                    default: s
                },
                o = n(2);
            const i = n(139).default;
            t.DEFAULT_RANKED_STATS = {
                division: "NA",
                isProvisional: !1,
                leaguePoints: 0,
                provisionalGameThreshold: 10,
                provisionalGamesRemaining: 0,
                tier: "UNRANKED"
            };
            const r = "lastTftSetNameSeen",
                c = "tft_star_fragments",
                m = "lcu-assets-tft-home-store-promos",
                u = {
                    BATTLE_PASS_V2: "/lol-tft/v2/tft/battlepass",
                    GENERIC_ASSETS: "/lol-game-data/assets/v1/generic-assets.json",
                    MAP_DATA: "/lol-maps/v2/maps",
                    TFT_SETS_DATA_PATH: "/lol-game-data/assets/v1/tftsets.json",
                    RP: "/lol-inventory/v1/wallet/RP",
                    SETTINGS_READY: "/lol-settings/v2/ready",
                    STAR_SHARDS: "/lol-inventory/v1/wallet/" + c,
                    STAR_SHARDS_TOGGLES: "/lol-platform-config/v1/namespaces/Loadouts",
                    TFT_BATTLE_PASS_PAGE: "/lol-tft/v1/tft/battlePassHub",
                    TFT_EVENTS: "/lol-tft/v1/tft/events",
                    TFT_HOME: "/lol-tft/v1/tft/homeHub",
                    TFT_NEWS: "/lol-tft/v1/tft/newsHub",
                    TFT_PASS_ENABLED: "/lol-tft-pass/v1/enabled",
                    TFT_PASS_BATTLE_PASS: "/lol-tft-pass/v1/battle-pass",
                    TFT_PASS_EVENT_PASS: "/lol-tft-pass/v1/event-pass",
                    TFT_PLAYER_PREFERENCES: "/lol-settings/v2/account/LCUPreferences/lol-tft",
                    TFT_PROMO_BUTTONS: "/lol-tft/v1/tft/promoButtons",
                    TFT_TEST_PAGE: "/lol-tft/v1/tft/test-page",
                    TFT_PASS_REWARD_GIVEN: "/lol-tft-pass/v1/reward-notification",
                    TFT_EVENT_MISSIONS: "/lol-event-mission/v1/event-mission"
                },
                d = a.dataBinding.bindTo(a.socket);
            a.UIKit.getToastCelebrationManager();
            var p = a.Ember.Service.extend({
                isHidden: !1,
                audioManager: null,
                lastTftGameQueueId: null,
                lastTftSetCoreNameSeen: null,
                currentDefaultTFTSet: null,
                mapData: null,
                fallbackStorePromoOfferIds: null,
                primeGamingPromoOffer: null,
                promoButtonsData: null,
                storePromoOfferIds: null,
                storePromoAssets: null,
                tacticianPromoOfferIds: null,
                testPageEnabled: !1,
                homePageEnabled: !0,
                homeOverrideUrl: "",
                newsEnabled: !1,
                newsUrl: "",
                starShardsEnabled: !1,
                formattedStarShardsAmountString: "0",
                rpAmount: 0,
                starShardsAmount: 0,
                eventsData: null,
                eventPromoTileAssets: null,
                eventHubAssets: null,
                missionOverrideSeries: "",
                battlePassOfferIds: null,
                battlePassV2: a.Ember.computed.alias("missionsBattlePass"),
                isBattlePassV2Claimable: a.Ember.computed.alias("isMissionsBattlePassClaimable"),
                isBattlePassXPBoosted: !1,
                isMissionsBattlePassClaimable: !1,
                missionsBattlePass: null,
                tftPassUpgradeEnabled: !1,
                isTftPassBattlePassClaimable: !1,
                isTftPassEventPassClaimable: !1,
                tftPassBattlePass: null,
                tftPassEventPass: null,
                tftEventMissions: null,
                isSubNavEnabled: !0,
                isHeaderButtonsEnabled: !0,
                media: a.Ember.computed.alias("battlePassV2.info.media"),
                init() {
                    this._super(...arguments), this._initObservers()
                },
                willDestroy() {
                    this._super(...arguments), d.removeObserver(u.BATTLE_PASS_V2, this), d.removeObserver(u.GENERIC_ASSETS, this), d.removeObserver(u.MAP_DATA, this), d.removeObserver(u.TFT_SETS_DATA_PATH, this), d.removeObserver(u.RP, this), d.removeObserver(u.SETTINGS_READY, this), d.removeObserver(u.STAR_SHARDS, this), d.removeObserver(u.STAR_SHARDS_TOGGLES, this), d.removeObserver(u.TFT_BATTLE_PASS_PAGE, this), d.removeObserver(u.TFT_HOME, this), d.removeObserver(u.TFT_NEWS, this), d.removeObserver(u.TFT_PASS_BATTLE_PASS, this), d.removeObserver(u.TFT_PASS_ENABLED, this), d.removeObserver(u.TFT_PASS_EVENT_PASS, this), d.removeObserver(u.TFT_PLAYER_PREFERENCES, this), d.removeObserver(u.TFT_TEST_PAGE, this), d.removeObserver(u.TFT_EVENT_MISSIONS, this)
                },
                _initObservers() {
                    d.addObserver(u.STAR_SHARDS_TOGGLES, this, (e => {
                        e && this.set("starShardsEnabled", e.EnableStarShardsUpgradeFlow)
                    })), d.addObserver(u.TFT_PLAYER_PREFERENCES, this, (e => {
                        e && e.data && (this.set("lastTftSetCoreNameSeen", e.data[r] || ""), this.set("lastTftGameQueueId", e.data.lastTftGameQueueId))
                    })), d.addObserver(u.TFT_HOME, this, (e => {
                        e && (this.set("battlePassOfferIds", e.battlePassOfferIds), this.set("fallbackStorePromoOfferIds", e.fallbackStorePromoOfferIds), this.set("homeOverrideUrl", e.overrideUrl), this.set("homePageEnabled", e.enabled), this.set("primeGamingPromoOffer", e.primeGamingPromoOffer), this.set("storePromoOfferIds", e.storePromoOfferIds), this.set("tacticianPromoOfferIds", e.tacticianPromoOfferIds))
                    })), d.addObserver(u.RP, this, (e => {
                        if (!e) return;
                        const t = e.RP;
                        isNaN(t) ? this.set("rpAmount", 0) : this.set("rpAmount", t)
                    })), d.addObserver(u.TFT_EVENTS, this, (e => {
                        e && (this.set("eventsData", e.subNavTabs), d.addObserver(u.TFT_EVENT_MISSIONS, this, (e => {
                            e && this.set("tftEventMissions", e)
                        })))
                    })), d.addObserver(u.TFT_PROMO_BUTTONS, this, this._handleUpdatePromoButtonsConfig), d.addObserver(u.TFT_TEST_PAGE, this, (e => {
                        e && this.set("testPageEnabled", e.enabled)
                    })), d.addObserver(u.TFT_NEWS, this, (e => {
                        e && (this.set("newsEnabled", e.enabled), this.set("newsUrl", e.url))
                    })), d.addObserver(u.GENERIC_ASSETS, this, (e => {
                        e && (this.set("storePromoAssets", e[m]), this.set("eventPromoTileAssets", e["lcu-assets-tft-event-promo-tile"]), this.set("eventHubAssets", e["lcu-assets-tft-event-hub"]), this.set("teamPlannerButtonAssets", e["lcu-assets-tft-team-planner-button"]))
                    })), d.addObserver(u.MAP_DATA, this, (e => {
                        if (e)
                            for (const t of e)
                                if (22 === t.id && "TFT" === t.gameMode && "" === t.gameMutator) return void this.set("mapData", t)
                    })), d.addObserver(u.TFT_SETS_DATA_PATH, this, (e => {
                        e && this.set("currentDefaultTFTSet", e.LCTFTModeData.mDefaultSet.SetCoreName)
                    })), d.addObserver(u.STAR_SHARDS, this, (e => {
                        if (!e) return;
                        let t = e[c];
                        this.set("starShardsAmount", t), isNaN(t) ? this.set("formattedStarShardsAmountString", "0") : t < 1e5 ? this.set("formattedStarShardsAmountString", t) : (t = 1e3 * Math.floor(t / 1e3), this.set("formattedStarShardsAmountString", this.get("tra").numeral(t).format("0a")))
                    })), d.addObserver(u.TFT_BATTLE_PASS_PAGE, this, (e => {
                        e && this.set("isBattlePassXPBoosted", e.battlePassXPBoosted)
                    })), d.addObserver(u.TFT_PASS_ENABLED, this, (e => {
                        null !== e && this.set("tftPassUpgradeEnabled", e)
                    })), d.addObserver(u.BATTLE_PASS_V2, this, (e => {
                        e && (this.set("missionsBattlePass", e), this._handleBattlePassV2Change(e, "isMissionsBattlePassClaimable"))
                    })), d.addObserver(u.TFT_PASS_BATTLE_PASS, this, (e => {
                        e && (this.set("tftPassBattlePass", e), this._handleBattlePassV2Change(e, "isTftPassBattlePassClaimable"))
                    })), d.addObserver(u.TFT_PASS_EVENT_PASS, this, (e => {
                        e && (this.set("tftPassEventPass", e), this._handleBattlePassV2Change(e, "isTftPassEventPassClaimable"))
                    }))
                },
                getStorePromoAssets: () => a.db.get(u.GENERIC_ASSETS).then((e => e ? e[m] : null)),
                _handleUpdatePromoButtonsConfig(e) {
                    e && this.set("promoButtonsData", e.promoButtons)
                },
                recordSetAnnouncementSeen() {
                    const e = {};
                    e[r] = this.currentDefaultTFTSet, (0, a.dataBinding)("/lol-settings", a.socket).patch("/v2/account/LCUPreferences/lol-tft", {
                        data: e,
                        schemaVersion: 1
                    })
                },
                claimRewards(e, t) {
                    const {
                        rewards: n,
                        missionId: s
                    } = e;
                    if (1 === new Set(n.map((e => e.rewardGroup))).size) {
                        const e = {
                            rewardGroups: [n[0].rewardGroup]
                        };
                        (0, a.dataBinding)("/lol-missions").put("/v1/player/" + s, e)
                    }
                    l.default.celebrate(e, t)
                },
                claimRewardsV2(e, t) {
                    l.default.celebratePassReward({
                        rewards: e,
                        backgroundImage: t
                    })
                },
                celebratePassCompletion() {
                    l.default.celebratePassCompletion(this.get("media.background--battlepass-completion"))
                },
                markMissionsAsViewed(e, t) {
                    const n = {
                        missionIds: e,
                        serieIds: t
                    };
                    d.put("/lol-missions/v1/player", n).catch((() => null))
                },
                _handleBattlePassV2Change(e, t) {
                    const {
                        milestones: n,
                        bonuses: s
                    } = e;
                    if (!e || !Array.isArray(n) || !Array.isArray(s) || 0 === n.length || 0 === s.length) return;
                    const a = n.some((({
                        state: e,
                        isLocked: t
                    }) => !t && e === o.BP_V2_MILESTONE_REWARDABLE)) || s.some((({
                        state: e,
                        isLocked: t
                    }) => !t && e === o.BP_V2_MILESTONE_REWARDABLE));
                    this.set(t, a)
                },
                dismissNotification(e) {
                    if (e === o.TFT_BATTLE_PASS_ROUTE) this.set("isMissionsBattlePassClaimable", !1), this.set("isTftPassBattlePassClaimable", !1)
                },
                setMissionOverrideSeries(e) {
                    this.set("missionOverrideSeries", e), a.navigation.setTrackerState("tftViewSeries", e)
                },
                clearMissionOverrideSeries() {
                    a.navigation.setTrackerState("tftViewSeries", "")
                },
                getTftAudioManager() {
                    return this.audioManager || (this.audioManager = i()), this.audioManager
                },
                onHide() {
                    this.audioManager && this.audioManager.stopAll(), this.clearMissionOverrideSeries(), this.set("isHidden", !0)
                },
                onShow() {
                    a.navigation.setTrackerState("tftViewSeries", this.get("missionOverrideSeries")), this.set("isHidden", !1)
                },
                activeMilestonesProgress: a.Ember.computed("battlePassV2.totalPointsEarned", "battlePassV2.milestones.@each.{isPaid,isLocked,pointsEarnedForMilestone,missionId,status,state}", "battlePassV2.bonuses.@each.{isPaid,isLocked,pointsEarnedForMilestone,missionId,status,state}", (function() {
                    const e = this.get("battlePassV2.milestones"),
                        t = a.lodash.findIndex(e, ["state", "ACTIVE"]);
                    if (t < 0) return null;
                    const n = a.Ember.A([e[t]]);
                    return t > 0 && n.unshift(e[t - 1]), n
                })),
                updateEventHubUrl(e) {
                    this.eventsData.length > 0 && (a.Ember.set(this.eventsData[0], "url", e), this.notifyPropertyChange("eventsData"))
                }
            });
            t.default = p
        }, (e, t, n) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = void 0;
            var s = n(1),
                a = n(2);
            const l = s.UIKit.getVignetteCelebrationManager();

            function o(e) {
                return s.componentFactory.create({
                    type: a.REWARD_CELEBRATION_NAME,
                    data: e
                })
            }

            function i(e, t, n = !1) {
                const a = {
                    id: e,
                    rewards: t,
                    selectable: n
                };
                return s.Ember.Object.create(a)
            }

            function r(e) {
                return new Set(e.map((e => e.rewardGroup))).size > 1
            }

            function c(e, t) {
                const n = {
                    rewardGroups: [e.find((e => e.isSelected)).rewardGroup]
                };
                return (0, s.dataBinding)("/lol-missions").put("/v1/player/" + t, n)
            }
            var m = {
                celebrate: function({
                    id: e,
                    titleSubtext: t,
                    rewards: n,
                    missionId: a
                }, m) {
                    const u = r(n),
                        d = u ? "celebration_button_text_multi" : "celebration_button_text",
                        p = o(i(e, n = n.map((e => s.Ember.Object.create(e))), u));
                    l.add({
                        id: e,
                        data: {
                            header: {
                                title: s.traService.get("celebration_title"),
                                titleSubtext: t
                            },
                            nextButtonEnabled: !u,
                            nextButtonText: s.traService.get(d),
                            backgroundImageUrl: m
                        },
                        height: "SMALL",
                        content: p,
                        onRemove: () => {
                            u && c(n, a), p.onRemove && p.onRemove()
                        }
                    })
                },
                celebratePassReward: function({
                    rewards: e,
                    backgroundImage: t
                }) {
                    const n = function(e) {
                            const t = {
                                rewards: e
                            };
                            return s.Ember.Object.create(t)
                        }(e = e.map((e => s.Ember.Object.create(e)))),
                        o = (i = n, s.componentFactory.create({
                            type: a.REWARD_CELEBRATION_V2_NAME,
                            data: i
                        }));
                    var i;
                    l.add({
                        id: "tft_pass_reward_celebration",
                        data: {
                            header: {
                                title: s.traService.get("celebration_title")
                            },
                            nextButtonText: s.traService.get("celebration_button_text_continue"),
                            backgroundImageUrl: t
                        },
                        height: "LARGE",
                        content: o,
                        onRemove: () => {
                            o.onRemove && o.onRemove()
                        }
                    })
                },
                celebratePassCompletion: function(e) {
                    l.add({
                        id: "tft_battlepass_completed",
                        height: "MEDIUM",
                        data: {
                            header: {
                                title: s.traService.get("celebration_pass_completion_title"),
                                titleSubtext: s.traService.get("celebration_pass_completion_title_subtext")
                            },
                            backgroundImageUrl: e,
                            nextButtonText: s.traService.get("celebration_pass_completion_button")
                        }
                    })
                },
                isSelectable: r,
                updateRewardSelection: c,
                createCelebrationState: i,
                createCelebrationApplication: o
            };
            t.default = m
        }, (e, t, n) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.AudioManager = void 0, t.default = function() {
                o || (o = new l);
                return o
            };
            var s = n(1);

            function a(e) {
                if (e && e.crossfadeTime) return {
                    crossfade: !0,
                    fadeTime: e.crossfadeTime
                }
            }
            class l {
                constructor() {
                    this.playbackEnabled = !0, this.uiAudioChannel = s.Audio.getChannel("sfx-ui"), this.ambienceAudioChannel = s.Audio.getChannel("sfx-ambience-perks"), this.primaryIntroSound = null, this.primaryAmbienceSound = null, this.secondaryIntroSound = null, this.secondaryAmbienceSound = null, this.uiSounds = new Map
                }
                getUiSound(e, t) {
                    let n = this.uiSounds.get(e);
                    return n || (n = this.uiAudioChannel.createSound(e, t), this.uiSounds.set(e, n), n || s.logger.warning("Home Audio: failure to create ui sound", e)), n
                }
                getAmbienceSound(e, t) {
                    const n = Object.assign({
                            isLoop: !0,
                            crossfade: !0,
                            fadeTime: 500
                        }, t),
                        a = this.ambienceAudioChannel.createSound(e, n);
                    return a || s.logger.warning("Home Audio: failure to create ambience sound", e), a
                }
                playUiSound(e, t) {
                    const n = a(t);
                    this.getUiSound(e, n).play()
                }
                playMusicAmbience(e, t) {
                    const n = a(t) || {};
                    n.isLoop = !0, this.musicAmbience = s.Audio.getChannel("music-ambience").createSound(e, n), this.musicAmbience.play()
                }
                _playAmbienceSound(e, t, n) {
                    const s = a(t),
                        l = this.getAmbienceSound(e, s);
                    return n && n.isPlaying() && n.fadeOut({
                        fadeTime: l.options.fadeTime
                    }), l.play(), l
                }
                _playAmbienceSounds(e, t, n, s, l, o) {
                    if (!this.playbackEnabled) return {
                        activeAmbienceSound: l,
                        introSound: o
                    };
                    if (t) {
                        const e = a(s);
                        (o = this.getUiSound(t, e)).play()
                    } else o = null;
                    return {
                        newAmbienceSound: this._playAmbienceSound(e, n, l),
                        introSound: o
                    }
                }
                playPrimaryAmbienceSounds(e, t, n, s) {
                    const {
                        newAmbienceSound: a,
                        introSound: l
                    } = this._playAmbienceSounds(e, t, n, s, this.primaryAmbienceSound, this.primaryIntroSound);
                    this.primaryAmbienceSound = a, this.primaryIntroSound = l
                }
                playSecondaryAmbienceSounds(e, t, n, s) {
                    const {
                        newAmbienceSound: a,
                        introSound: l
                    } = this._playAmbienceSounds(e, t, n, s, this.secondaryAmbienceSound, this.secondaryIntroSound);
                    this.secondaryAmbienceSound = a, this.secondaryIntroSound = l
                }
                stopMusicAmbience(e) {
                    this.musicAmbience && this.musicAmbience.isPlaying() && (e && e.crossfadeTime ? this.musicAmbience.fadeOut({
                        fadeTime: e.crossfadeTime
                    }) : this.musicAmbience.stop())
                }
                stopPrimaryAmbienceSounds(e) {
                    const t = a(e);
                    this.primaryIntroSound && this.primaryIntroSound.isPlaying() && (t ? this.primaryIntroSound.fadeOut(t) : this.primaryIntroSound.stop()), this.primaryAmbienceSound && this.primaryAmbienceSound.isPlaying() && (t ? this.primaryAmbienceSound.fadeOut(t) : this.primaryAmbienceSound.stop())
                }
                stopSecondaryAmbienceSounds(e) {
                    const t = a(e);
                    this.secondaryIntroSound && this.secondaryIntroSound.isPlaying() && (t ? this.secondaryIntroSound.fadeOut(t) : this.secondaryIntroSound.stop()), this.secondaryAmbienceSound && this.secondaryAmbienceSound.isPlaying() && (t ? this.secondaryAmbienceSound.fadeOut(t) : this.secondaryAmbienceSound.stop())
                }
                stopAllAmbienceSounds(e) {
                    this.stopMusicAmbience(e), this.stopPrimaryAmbienceSounds(e), this.stopSecondaryAmbienceSounds(e)
                }
                stopAll(e) {
                    this.stopAllAmbienceSounds(e)
                }
                disableHomeAudio(e) {
                    this.playbackEnabled = !1, this.stopAll(e)
                }
                enableHomeAudio() {
                    this.playbackEnabled = !0
                }
            }
            let o;
            t.AudioManager = l
        }, (e, t, n) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = void 0;
            var s = n(1),
                a = n(2);
            const l = "/lol-lobby/v2/eligibility/initial-configuration-complete",
                o = "/lol-lobby/v2/eligibility/self",
                i = "/lol-lobby/v2/lobby",
                r = "/lol-clash/v1/playmode-restricted",
                c = "/lol-game-queues/v1/queues",
                m = s.dataBinding.bindTo(s.socket);
            var u = s.Ember.Service.extend({
                patcherButtonEnabled: !1,
                tftEligible: !1,
                inLobby: !1,
                inTournament: !1,
                queues: null,
                isLobbyLeader: !1,
                init() {
                    this._super(...arguments), this._patcherButtonEnabledSubscriber = this._patcherButtonEnabledSubscriber.bind(this), this._initObservers()
                },
                willDestroy() {
                    this._super(...arguments), m.removeObserver(l, this), m.removeObserver(i, this), m.removeObserver(r, this), m.removeObserver(c, this), s.navigation.isButtonEnabledUnsubscribe(this._patcherButtonEnabledSubscriber)
                },
                _patcherButtonEnabledSubscriber(e) {
                    this.isDestroying || this.isDestroyed || this.set("patcherButtonEnabled", e)
                },
                _initObservers() {
                    s.navigation.isButtonEnabledSubscribe(this._patcherButtonEnabledSubscriber), m.addObserver(l, this, (e => {
                        e && (this._getQueueEligibility(), m.removeObserver(l, this))
                    })), m.addObserver(i, this, (e => {
                        this.set("inLobby", !!e)
                    })), m.addObserver(i, this, (e => {
                        e && this.set("isLobbyLeader", e.localMember.isLeader)
                    })), m.addObserver(r, this, (e => {
                        this.set("inTournament", !!e)
                    })), m.addObserver(c, this, (e => {
                        this.set("queues", e)
                    }))
                },
                _getQueueEligibility() {
                    m.post(o).then((e => {
                        if (!e) return;
                        const t = e.find((e => e.queueId === a.TFT_NORMAL_QUEUE_ID));
                        this.set("tftEligible", !!t && t.eligible)
                    }))
                }
            });
            t.default = u
        }, (e, t, n) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = void 0;
            var s = n(1),
                a = n(2);
            const l = "/lol-platform-config/v1/namespaces/PublishingContent",
                o = "/lol-publishing-content/v1/ready",
                i = "/lol-publishing-content/v1/tft-hub-cards",
                r = s.dataBinding.bindTo(s.socket);
            var c = s.Ember.Service.extend({
                tftCardsReadyToShow: !1,
                fetchFailed: !1,
                willRetry: !1,
                pcsChannelData: null,
                init() {
                    this._super(...arguments), this._initObservers()
                },
                willDestroy() {
                    this._super(...arguments), r.unobserve(l, this)
                },
                _initObservers() {
                    r.observe(l, this, (e => {
                        e && e.Enabled ? this.renderPcsData() : (s.Telemetry.sendCustomData(a.PCS_TELEMETRY_TABLE, {
                            pcsEvent: "pcs_foundation_disabled"
                        }), this.renderErrorState())
                    }))
                },
                getPcsChannelData() {
                    r.observe(o, this, (e => {
                        e && (r.unobserve(o, this), r.get(i).then((e => {
                            if (!e) return s.Telemetry.sendCustomData(a.PCS_TELEMETRY_TABLE, {
                                pcsEvent: "pcs_foundation_failure"
                            }), void this.renderErrorState();
                            this.set("pcsChannelData", e), this.renderPcsData()
                        })))
                    }))
                },
                renderPcsData() {
                    this.get("pcsChannelData") ? (this.set("fetchFailed", !1), this.set("tftCardsReadyToShow", !0)) : this.getPcsChannelData()
                },
                setupRetry() {
                    this.get("willRetry") || s.navigation.on("navigate", (() => {
                        this.get("fetchFailed") && (this.getPcsChannelData(), this.set("willRetry", !0))
                    }))
                },
                renderErrorState() {
                    this.set("fetchFailed", !0), this.setupRetry()
                }
            });
            t.default = c
        }, (e, t, n) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = void 0;
            var s = n(1);
            const a = "/lol-store/v1/catalog",
                l = "/riotclient/region-locale",
                o = s.dataBinding.bindTo(s.socket);
            var i = s.Ember.Service.extend({
                regionLocale: null,
                storeCatalog: null,
                init() {
                    this._super(...arguments), this._initObservers()
                },
                willDestroy() {
                    this._super(...arguments), o.removeObserver(a, this), o.removeObserver(l, this)
                },
                getStoreCatalog: () => s.db.get(a),
                getRegionLocale: () => s.db.get(l),
                _initObservers() {
                    o.addObserver(a, this, (e => {
                        this.set("storeCatalog", e)
                    })), o.addObserver(l, this, (e => {
                        e && this.set("regionLocale", e.locale)
                    }))
                }
            });
            t.default = i
        }, (e, t, n) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = void 0;
            var s = n(1),
                a = n(75),
                l = s.Ember.Service.extend({
                    trovesEnabled: !1,
                    trovesV2Enabled: !1,
                    trovesTokensAmount: 0,
                    formattedTrovesTokensAmountString: "0",
                    mythicTokensAmount: 0,
                    troveActiveBanners: [],
                    trovesTokensOffer: null,
                    trovesTokensItemId: null,
                    trovesTokensOfferId: null,
                    isLoading: !0,
                    hasBannerError: !0,
                    pullErrorModalShowing: !1,
                    isPulling: !1,
                    isWaitingForCeremonyData: !1,
                    init() {
                        this._super(...arguments), this._initObservers()
                    },
                    willDestroy() {
                        this._super(...arguments), s.db.removeObserver(a.PATHS.GENERIC_ASSETS, this), s.db.removeObserver(a.PATHS.TROVES_CONFIG, this), s.db.removeObserver(a.PATHS.TROVES_TOKENS, this), s.db.removeObserver(a.PATHS.TROVES_BANNERS, this), s.db.removeObserver(a.PATHS.STATUS_NOTIFICATIONS, this), s.db.removeObserver(a.PATHS.ROLL_REWARDS, this)
                    },
                    _handleNewCeremonyData(e) {
                        e ? (this.set("ceremonyData", e), this.set("isWaitingForCeremonyData", !1)) : this.set("ceremonyData", null)
                    },
                    _initObservers() {
                        s.db.addObserver(a.PATHS.TROVES_CONFIG, this, (e => {
                            if (e && (this.set("trovesEnabled", Boolean(e.enabled)), this.set("trovesV2Enabled", Boolean(e.v2Enabled)), this.set("trovesTokensItemId", e.tokensItemId), this.set("trovesTokensOfferId", e.tokensOfferId), this.get("trovesEnabled"))) {
                                s.db.addObserver(a.PATHS.TROVES_BANNERS, this, (e => {
                                    this.set("isLoading", Boolean(!1)), e && (this.set("hasBannerError", Boolean(!1)), this.set("troveActiveBanners", e))
                                })), s.db.addObserver(a.PATHS.TROVES_TOKENS, this, (e => {
                                    if (!e) return;
                                    let t = e[a.TFT_TROVES_TOKENS_WALLETS_KEY];
                                    if (isNaN(t)) return this.set("trovesTokensAmount", 0), void this.set("formattedTrovesTokensAmountString", "0");
                                    this.set("trovesTokensAmount", t), t < 1e5 ? this.set("formattedTrovesTokensAmountString", t) : (t = 1e3 * Math.floor(t / 1e3), this.set("formattedTrovesTokensAmountString", this.get("tra").numeral(t).format("0a")))
                                })), s.db.addObserver(a.PATHS.MYTHIC_TOKENS, this, (e => {
                                    if (!e) return;
                                    const t = e[a.TFT_MYTHIC_TOKENS_WALLETS_KEY];
                                    isNaN(t) ? this.set("mythicTokensAmount", 0) : this.set("mythicTokensAmount", t)
                                })), s.db.addObserver(a.PATHS.GENERIC_ASSETS, this, (e => {
                                    e && this.set("trovesPromoAssets", e[a.TFT_TROVES_GDS_PROMO_ASSETS_KEY])
                                }));
                                const e = this.get("trovesTokensItemId");
                                s.db.addObserver(`${a.PATHS.CATALOG}?inventoryType=CURRENCY&itemId=${e}`, this, this._handleTrovesTokenOffer.bind(this)), s.db.addObserver(a.PATHS.STATUS_NOTIFICATIONS, this, (e => {
                                    if (this.get("isPulling") && this.set("isPulling", !1), !e) return;
                                    if (e.hasPullError) return void this.set("pullErrorModalShowing", !0);
                                    const t = this.get("troveActiveBanners"),
                                        n = t.findIndex((t => t.id === e.dropTableId));
                                    n > -1 && s.Ember.set(t[n], "status", e)
                                }))
                            }
                        })), this._handleNewCeremonyData = this._handleNewCeremonyData.bind(this), s.db.addObserver(a.PATHS.ROLL_REWARDS, this, this._handleNewCeremonyData)
                    },
                    _handleTrovesTokenOffer(e) {
                        if (e && e && e.item) {
                            const t = e.item,
                                n = t.prices && t.prices.filter((e => "RP" === e.currency));
                            let s = n && n[0].cost;
                            s || (s = 0);
                            let a = -1,
                                l = !1,
                                o = 1;
                            t.metadata && t.metadata.forEach((e => {
                                switch (e.type) {
                                    case "PURCHASE_RATE_LIMIT":
                                        a = parseInt(e.value);
                                        break;
                                    case "INCREMENTAL_PURCHASE":
                                        l = "true" === e.value.toLowerCase();
                                        break;
                                    case "QUANTITY":
                                        o = parseInt(e.value)
                                }
                            }));
                            const i = {
                                id: this.get("trovesTokensOfferId"),
                                name: t.name,
                                description: t.description,
                                iconUrl: t.imagePath,
                                price: s,
                                minQuantity: 1,
                                maxQuantity: a,
                                incrementalPurchase: l,
                                quantity: o
                            };
                            this.set("trovesTokensOffer", i)
                        }
                    },
                    clearCeremonyData() {
                        s.db.delete(a.PATHS.ROLL_REWARDS)
                    },
                    updatePulling(e) {
                        this.set("isPulling", e)
                    },
                    updatePullErrorModal(e) {
                        this.set("pullErrorModalShowing", e)
                    },
                    spendCoins(e, t, n) {
                        const l = {
                            offerId: e,
                            numberOfRolls: t,
                            dropTableId: n
                        };
                        this.set("isWaitingForCeremonyData", !0), s.db.post(a.PATHS.ROLL, l).catch((() => {
                            this.updatePullErrorModal(!0)
                        }))
                    }
                });
            t.default = l
        }, (e, t, n) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = t.SUMMONER_PATH = void 0;
            var s = n(1);
            const a = "/lol-summoner/v1/current-summoner";
            t.SUMMONER_PATH = a;
            var l = s.Ember.Service.extend({
                currentSummoner: null,
                init() {
                    this._super(...arguments), this.handleSummonerChanged = this.handleSummonerChanged.bind(this), this.initDataBindings()
                },
                initDataBindings() {
                    s.db.observe(a, this, this.handleSummonerChanged)
                },
                handleSummonerChanged(e) {
                    e && this.set("currentSummoner", e)
                },
                willDestroy() {
                    this._super(...arguments), s.db.unobserve(a, this)
                }
            });
            t.default = l
        }, (e, t, n) => {
            const s = n(1).Ember;
            e.exports = s.HTMLBars.template({
                id: "KEe628/D",
                block: '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-tft\\\\src\\\\app\\\\templates\\\\application.hbs\\" style-path=\\"null\\" js-path=\\"null\\" "],["text","\\n"],["open-element","div",[]],["flush-element"],["text","\\n  "],["open-element","div",[]],["flush-element"],["text","\\n    "],["append",["unknown",["outlet"]],false],["text","\\n  "],["close-element"],["text","\\n  "],["append",["helper",["tft-sub-nav"],null,[["routeName"],[["get",["routeName"]]]]],false],["text","\\n  "],["append",["unknown",["tft-header-buttons"]],false],["text","\\n"],["close-element"],["text","\\n\\n"],["open-element","lc-modal",[]],["dynamic-attr","onHide",["helper",["action"],[["get",[null]],"confirm"],null],null],["dynamic-attr","open",["unknown",["showSetAnnouncement"]],null],["flush-element"],["text","\\n  "],["open-element","lc-modal-content",[]],["flush-element"],["text","\\n    "],["open-element","lol-uikit-dialog-frame",[]],["static-attr","orientation","bottom"],["static-attr","dismissable",""],["static-attr","dismissable-type","inside"],["flush-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","tft-set-announcement"],["dynamic-attr","style",["concat",["background-image: url(",["unknown",["setAnnouncementBackgroundImage"]],");"]]],["flush-element"],["text","\\n        "],["open-element","div",[]],["static-attr","class","tft-set-announcement-left"],["flush-element"],["text","\\n          "],["open-element","div",[]],["static-attr","class","tft-set-announcement-title"],["flush-element"],["append",["unknown",["mapData","locStrings","set_announcement_title"]],false],["close-element"],["text","\\n          "],["open-element","div",[]],["static-attr","class","tft-set-announcement-set-name"],["flush-element"],["append",["unknown",["mapData","locStrings","set_announcement_set_name"]],false],["close-element"],["text","\\n          "],["open-element","div",[]],["static-attr","class","tft-set-announcement-icon-line"],["flush-element"],["text","\\n            "],["open-element","img",[]],["static-attr","src","/fe/lol-tft/images/vector-line.svg"],["flush-element"],["close-element"],["text","\\n            "],["open-element","img",[]],["static-attr","src","/fe/lol-tft/images/tft-icon.svg"],["static-attr","class","tft-set-announcement-line-icon"],["flush-element"],["close-element"],["text","\\n            "],["open-element","img",[]],["static-attr","src","/fe/lol-tft/images/vector-line.svg"],["static-attr","style","transform: rotate(180deg);"],["flush-element"],["close-element"],["text","\\n          "],["close-element"],["text","\\n          "],["open-element","div",[]],["static-attr","class","tft-set-announcement-body"],["flush-element"],["text","\\n"],["block",["each"],[["helper",["-each-in"],[["get",["setAnnouncementData"]]],null]],null,0],["text","          "],["close-element"],["text","\\n          "],["open-element","lol-uikit-flat-button",[]],["static-attr","class","tft-set-announcement-ok-button"],["dynamic-attr","onclick",["helper",["action"],[["get",[null]],"confirm"],null],null],["flush-element"],["append",["unknown",["mapData","locStrings","set_announcement_confirm_button"]],false],["close-element"],["text","\\n        "],["close-element"],["text","\\n        "],["open-element","div",[]],["static-attr","class","tft-set-announcement-right"],["dynamic-attr","style",["concat",["background-image: url(",["unknown",["setAnnouncementSplash"]],");"]]],["flush-element"],["text","\\n          "],["open-element","div",[]],["static-attr","class","tft-set-announcement-right-footer"],["flush-element"],["text","\\n            "],["append",["unknown",["mapData","locStrings","set_announcement_splash_footer"]],false],["text","\\n            "],["open-element","img",[]],["static-attr","src","/fe/lol-tft/images/volume-icon.png"],["flush-element"],["close-element"],["text","\\n          "],["close-element"],["text","\\n        "],["close-element"],["text","\\n      "],["close-element"],["text","\\n    "],["close-element"],["text","\\n  "],["close-element"],["text","\\n"],["close-element"]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","              "],["open-element","div",[]],["static-attr","class","tft-set-announcement-body-item"],["flush-element"],["text","\\n                "],["open-element","div",[]],["static-attr","class","tft-set-announcement-body-item-heading"],["flush-element"],["text","\\n                  "],["open-element","img",[]],["dynamic-attr","src",["concat",[["unknown",["data","imagePath"]]]]],["flush-element"],["close-element"],["text","\\n                  "],["append",["unknown",["data","header"]],false],["text","\\n                "],["close-element"],["text","\\n                "],["open-element","div",[]],["static-attr","class","tft-set-announcement-body-item-text"],["flush-element"],["append",["unknown",["data","body"]],false],["close-element"],["text","\\n              "],["close-element"],["text","\\n"]],"locals":["index","data"]}],"hasPartials":false}',
                meta: {}
            })
        }, (e, t, n) => {
            const s = n(1).Ember;
            e.exports = s.HTMLBars.template({
                id: "2H2pkGjC",
                block: '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-tft\\\\src\\\\app\\\\templates\\\\index.hbs\\" style-path=\\"null\\" js-path=\\"null\\" "],["text","\\n"],["block",["if"],[["get",["model","isVisible"]]],null,0]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","    "],["open-element","div",[]],["flush-element"],["close-element"],["text","\\n"]],"locals":[]}],"hasPartials":false}',
                meta: {}
            })
        }, (e, t, n) => {
            const s = n(1).Ember;
            e.exports = s.HTMLBars.template({
                id: "jab1h2M0",
                block: '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-tft\\\\src\\\\app\\\\templates\\\\loading.hbs\\" style-path=\\"null\\" js-path=\\"null\\" "],["text","\\n"],["append",["unknown",["uikit-spinner"]],false]],"locals":[],"named":[],"yields":[],"blocks":[],"hasPartials":false}',
                meta: {}
            })
        }, (e, t, n) => {
            const s = n(1).Ember;
            e.exports = s.HTMLBars.template({
                id: "0VKnGCVK",
                block: '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-tft\\\\src\\\\app\\\\templates\\\\home.hbs\\" style-path=\\"null\\" js-path=\\"null\\" "],["text","\\n"],["open-element","div",[]],["static-attr","class","rcp-fe-lol-tft-application-background"],["dynamic-attr","style",["concat",["background-image:url(",["unknown",["hubBackground"]],")"]]],["flush-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","rcp-fe-lol-tft-application"],["flush-element"],["text","\\n    "],["append",["helper",["tft-home"],null,[["storeCatalog","regionLocale","storePromoAssets"],[["get",["model","storeCatalog"]],["get",["model","regionLocale"]],["get",["model","storePromoAssets"]]]]],false],["text","\\n  "],["close-element"],["text","\\n"],["close-element"]],"locals":[],"named":[],"yields":[],"blocks":[],"hasPartials":false}',
                meta: {}
            })
        }, (e, t, n) => {
            const s = n(1).Ember;
            e.exports = s.HTMLBars.template({
                id: "R3QfJpKn",
                block: '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-tft\\\\src\\\\app\\\\templates\\\\news.hbs\\" style-path=\\"null\\" js-path=\\"null\\" "],["text","\\n"],["open-element","div",[]],["static-attr","class","rcp-fe-lol-tft-application-background"],["dynamic-attr","style",["concat",["background-image: linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(",["unknown",["hubBackground"]],")"]]],["flush-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","rcp-fe-lol-tft-application"],["flush-element"],["text","\\n    "],["append",["unknown",["tft-news"]],false],["text","\\n  "],["close-element"],["text","\\n"],["close-element"]],"locals":[],"named":[],"yields":[],"blocks":[],"hasPartials":false}',
                meta: {}
            })
        }, (e, t, n) => {
            const s = n(1).Ember;
            e.exports = s.HTMLBars.template({
                id: "MiktuCct",
                block: '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-tft\\\\src\\\\app\\\\templates\\\\battle-pass.hbs\\" style-path=\\"null\\" js-path=\\"null\\" "],["text","\\n"],["open-element","div",[]],["static-attr","class","rcp-fe-lol-tft-application-background"],["dynamic-attr","style",["concat",["background-image:url(",["unknown",["hubBackground"]],")"]]],["flush-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","rcp-fe-lol-tft-application"],["flush-element"],["text","\\n    "],["append",["helper",["tft-hub"],null,[["battlePass","media","isBattlePassXPBoosted","claimRewardsFunc","markProgressAsViewedCallback","celebratePassCompletionFunc","backButtonEnabled"],[["get",["battlePass"]],["get",["media"]],["get",["isBattlePassXPBoosted"]],["get",["claimRewardsFunc"]],["get",["markProgressAsViewedCallback"]],["get",["celebratePassCompletionFunc"]],false]]],false],["text","\\n  "],["close-element"],["text","\\n"],["close-element"]],"locals":[],"named":[],"yields":[],"blocks":[],"hasPartials":false}',
                meta: {}
            })
        }, (e, t, n) => {
            const s = n(1).Ember;
            e.exports = s.HTMLBars.template({
                id: "UIX1VY5C",
                block: '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-tft\\\\src\\\\app\\\\templates\\\\match-history.hbs\\" style-path=\\"null\\" js-path=\\"null\\" "],["text","\\n"],["open-element","div",[]],["static-attr","class","rcp-fe-lol-tft-application-background"],["dynamic-attr","style",["concat",["background-image:url(",["unknown",["eogBackground"]],");"]]],["flush-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","rcp-fe-lol-tft-match-history-application"],["flush-element"],["text","\\n    "],["append",["helper",["tft-match-summary-root"],null,[["champions","championsByAlias","tftChampionsByAlias","items","maps","queues","spells","tftItemsByName","tftTraitsById","tftGameVariationsByAlias","tftDefaultSet","tftSets"],[["get",["model","champions"]],["get",["model","championsByAlias"]],["get",["model","tftChampionsByAlias"]],["get",["model","items"]],["get",["model","maps"]],["get",["model","queues"]],["get",["model","spells"]],["get",["model","tftItemsByName"]],["get",["model","tftTraitsById"]],["get",["model","tftGameVariationsByAlias"]],["get",["model","tftDefaultSet"]],["get",["model","tftSets"]]]]],false],["text","\\n  "],["close-element"],["text","\\n"],["close-element"]],"locals":[],"named":[],"yields":[],"blocks":[],"hasPartials":false}',
                meta: {}
            })
        }, (e, t, n) => {
            const s = n(1).Ember;
            e.exports = s.HTMLBars.template({
                id: "gtpym7Id",
                block: '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-tft\\\\src\\\\app\\\\templates\\\\test-page.hbs\\" style-path=\\"null\\" js-path=\\"null\\" "],["text","\\n"],["open-element","div",[]],["static-attr","class","rcp-fe-lol-tft-application-background"],["flush-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","rcp-fe-lol-tft-application"],["static-attr","style","height: 720px; width: 1055px;"],["flush-element"],["text","\\n    "],["append",["unknown",["tft-test-page"]],false],["text","\\n  "],["close-element"],["text","\\n"],["close-element"]],"locals":[],"named":[],"yields":[],"blocks":[],"hasPartials":false}',
                meta: {}
            })
        }, (e, t, n) => {
            const s = n(1).Ember;
            e.exports = s.HTMLBars.template({
                id: "riDuKvyu",
                block: '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-tft\\\\src\\\\app\\\\templates\\\\event-page.hbs\\" style-path=\\"null\\" js-path=\\"null\\" "],["text","\\n"],["open-element","div",[]],["static-attr","class","rcp-fe-lol-tft-application-background"],["dynamic-attr","style",["concat",["background-image:url(",["unknown",["hubBackground"]],")"]]],["flush-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","rcp-fe-lol-tft-application"],["flush-element"],["text","\\n"],["block",["if"],[["get",["displayEventPass"]]],null,0],["text","    "],["open-element","div",[]],["static-attr","class","event-hub"],["dynamic-attr","hidden",["unknown",["displayEventPass"]],null],["flush-element"],["text","\\n      "],["append",["helper",["tft-event-page"],null,[["telemetryEventPassTimeSpent","toggleEventPass","url"],[["get",["telemetryEventPassTimeSpent"]],["helper",["action"],[["get",[null]],"toggleEventPass"],null],["get",["url"]]]]],false],["text","\\n    "],["close-element"],["text","\\n  "],["close-element"],["text","\\n"],["close-element"]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","      "],["open-element","div",[]],["static-attr","class","event-pass"],["flush-element"],["text","\\n        "],["append",["helper",["tft-hub"],null,[["battlePass","media","isBattlePassXPBoosted","backButtonEnabled","backButtonAction","disableClaimButton"],[["get",["battlePass"]],["get",["media"]],false,true,["helper",["action"],[["get",[null]],"toggleEventPass"],null],true]]],false],["text","\\n      "],["close-element"],["text","\\n"]],"locals":[]}],"hasPartials":false}',
                meta: {}
            })
        }, (e, t, n) => {
            const s = n(1).Ember;
            e.exports = s.HTMLBars.template({
                id: "JC8jYD1s",
                block: '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-tft\\\\src\\\\lib\\\\troves\\\\addon\\\\templates\\\\components\\\\mythic-button.hbs\\" style-path=\\"null\\" js-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-tft\\\\src\\\\lib\\\\troves\\\\addon\\\\components\\\\mythic-button.js\\" "],["text","\\n"],["block",["if"],[["get",["showMythicButton"]]],null,0]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["open-element","div",[]],["dynamic-attr","class",["concat",["mythic-button ",["helper",["if"],[["get",["isPulling"]],"disabled"],null]]]],["flush-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","mythic-button-glow"],["flush-element"],["close-element"],["text","\\n  "],["open-element","button",[]],["dynamic-attr","disabled",["unknown",["isPulling"]],null],["flush-element"],["text","\\n    "],["open-element","span",[]],["static-attr","class","mythic-button-holder-text"],["flush-element"],["append",["unknown",["tra","troves_mythic_token_usage"]],false],["close-element"],["text","\\n    "],["open-element","img",[]],["dynamic-attr","src",["concat",[["unknown",["mythicTokenIcon"]]]]],["static-attr","class","mythic-currency-icon"],["flush-element"],["close-element"],["text","\\n  "],["close-element"],["text","\\n"],["close-element"],["text","\\n"],["open-element","lc-confirm-modal",[]],["dynamic-attr","acceptText",["unknown",["tra","troves_mythic_token_dialog_open"]],null],["dynamic-attr","declineText",["unknown",["tra","troves_mythic_token_dialog_cancel"]],null],["dynamic-attr","onYes",["helper",["action"],[["get",[null]],"useMythicToken"],null],null],["dynamic-attr","onHide",["helper",["action"],[["get",[null]],"closeConfirmModal"],null],null],["dynamic-attr","open",["unknown",["confirmModalShowing"]],null],["flush-element"],["text","\\n  "],["open-element","lc-modal-content",[]],["flush-element"],["text","\\n    "],["append",["helper",["mythic-token-dialog"],null,[["mythicTokenIcon","ownedChaseContent","balanceText"],[["get",["mythicTokenIcon"]],["get",["ownedChaseContent"]],["get",["balanceText"]]]]],false],["text","\\n  "],["close-element"],["text","\\n"],["close-element"],["text","\\n"]],"locals":[]}],"hasPartials":false}',
                meta: {}
            })
        }, (e, t, n) => {
            const s = n(1).Ember;
            e.exports = s.HTMLBars.template({
                id: "6h/Wbb8v",
                block: '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-tft\\\\src\\\\lib\\\\troves\\\\addon\\\\templates\\\\components\\\\mythic-token-dialog.hbs\\" style-path=\\"null\\" js-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-tft\\\\src\\\\lib\\\\troves\\\\addon\\\\components\\\\mythic-token-dialog.js\\" "],["text","\\n"],["open-element","lol-uikit-content-block",[]],["static-attr","type","dialog-large"],["static-attr","id","mythic-token-dialog-content-block"],["flush-element"],["text","\\n  "],["open-element","h4",[]],["static-attr","class","mythic-token-dialog-title"],["flush-element"],["append",["unknown",["title"]],false],["close-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","mythic-token-dialog-content"],["flush-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","confirm-info"],["flush-element"],["append",["helper",["sanitize"],[["get",["confirmText"]]],null],false],["close-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","separate-line"],["flush-element"],["close-element"],["text","\\n"],["block",["if"],[["get",["ownedChaseContent"]]],null,1,0],["text","  "],["close-element"],["text","\\n"],["close-element"],["text","\\n"]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","    "],["open-element","div",[]],["static-attr","class","balance-info"],["flush-element"],["text","\\n      "],["open-element","img",[]],["dynamic-attr","src",["concat",[["unknown",["mythicTokenIcon"]]]]],["static-attr","class","mythic-currency-icon"],["flush-element"],["close-element"],["text","\\n      "],["open-element","span",[]],["flush-element"],["append",["unknown",["balanceText"]],false],["close-element"],["text","\\n    "],["close-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","separate-line"],["flush-element"],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","    "],["open-element","div",[]],["static-attr","class","owned-info"],["flush-element"],["append",["unknown",["ownedText"]],false],["close-element"],["text","\\n"]],"locals":[]}],"hasPartials":false}',
                meta: {}
            })
        }, (e, t, n) => {
            const s = n(1).Ember;
            e.exports = s.HTMLBars.template({
                id: "tsfuLboj",
                block: '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-tft\\\\src\\\\lib\\\\troves\\\\addon\\\\templates\\\\components\\\\pull-button.hbs\\" style-path=\\"null\\" js-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-tft\\\\src\\\\lib\\\\troves\\\\addon\\\\components\\\\pull-button.js\\" "],["text","\\n"],["open-element","lol-uikit-flat-button",[]],["static-attr","class","button glow"],["dynamic-attr","disabled",["unknown",["disabled"]],null],["flush-element"],["text","\\n"],["block",["if"],[["get",["showSpinner"]]],null,1,0],["close-element"],["text","\\n"],["open-element","div",[]],["static-attr","class","pull-button-text"],["flush-element"],["append",["unknown",["buttonText"]],false],["close-element"]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","    "],["open-element","img",[]],["dynamic-attr","src",["concat",[["unknown",["troveTokenIcon"]]]]],["static-attr","class","pull-currency-icon"],["dynamic-attr","disabled",["unknown",["disabled"]],null],["flush-element"],["close-element"],["text","\\n    "],["open-element","span",[]],["static-attr","class","pull-button-holder-text"],["flush-element"],["append",["unknown",["cost"]],false],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","    "],["append",["unknown",["uikit-spinner"]],false],["text","\\n"]],"locals":[]}],"hasPartials":false}',
                meta: {}
            })
        }, (e, t, n) => {
            const s = n(1).Ember;
            e.exports = s.HTMLBars.template({
                id: "nJf7/zoJ",
                block: '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-tft\\\\src\\\\lib\\\\troves\\\\addon\\\\templates\\\\components\\\\pull-buttons-container.hbs\\" style-path=\\"null\\" js-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-tft\\\\src\\\\lib\\\\troves\\\\addon\\\\components\\\\pull-buttons-container.js\\" "],["text","\\n"],["open-element","div",[]],["dynamic-attr","class",["concat",["button-container ",["helper",["if"],[["get",["isAllContentOwned"]],"","with-button"],null]]]],["flush-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","hextech-filigree"],["flush-element"],["open-element","img",[]],["static-attr","src","/fe/lol-tft-troves/images/Troves_Hextech_Filigree.png"],["flush-element"],["close-element"],["close-element"],["text","\\n"],["block",["if"],[["get",["isAllContentOwned"]]],null,1,0],["text","  "],["open-element","div",[]],["static-attr","class","hextech-filigree hextech-filigree-rotate"],["flush-element"],["open-element","img",[]],["static-attr","src","/fe/lol-tft-troves/images/Troves_Hextech_Filigree.png"],["flush-element"],["close-element"],["close-element"],["text","\\n"],["close-element"],["text","\\n"]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","    "],["append",["helper",["pull-button"],null,[["cost","buttonText","disabled","rollCount","activeBannerSourceId","pityCount","selectedOfferId","dropTableId"],[["get",["pullCost"]],["get",["tra","troves_pull_buttons_open_one"]],["get",["isSinglePullDisabled"]],["get",["SINGLE_ROLL_COUNT"]],["get",["activeBannerSourceId"]],["get",["pityCount"]],["get",["selectedOfferId"]],["get",["dropTableId"]]]]],false],["text","\\n    "],["append",["helper",["pull-button"],null,[["cost","buttonText","disabled","rollCount","activeBannerSourceId","pityCount","selectedOfferId","dropTableId"],[["get",["tenPullCost"]],["get",["tra","troves_pull_buttons_open_ten"]],["get",["isTenPullDisabled"]],["get",["MULTI_ROLL_COUNT"]],["get",["activeBannerSourceId"]],["get",["pityCount"]],["get",["selectedOfferId"]],["get",["dropTableId"]]]]],false],["text","\\n"]],"locals":[]},{"statements":[["text","    "],["open-element","div",[]],["static-attr","class","pull-container-label"],["flush-element"],["append",["unknown",["tra","troves_pull_buttons_all_owned"]],false],["close-element"],["text","\\n"]],"locals":[]}],"hasPartials":false}',
                meta: {}
            })
        }, (e, t, n) => {
            const s = n(1).Ember;
            e.exports = s.HTMLBars.template({
                id: "rjtrWJ+K",
                block: '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-tft\\\\src\\\\lib\\\\troves\\\\addon\\\\templates\\\\components\\\\pull-error-dialog.hbs\\" style-path=\\"null\\" js-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-tft\\\\src\\\\lib\\\\troves\\\\addon\\\\components\\\\pull-error-dialog.js\\" "],["text","\\n"],["open-element","lc-alert-modal",[]],["dynamic-attr","open",["unknown",["pullErrorModalShowing"]],null],["dynamic-attr","onHide",["helper",["action"],[["get",[null]],"closePullErrorModal"],null],null],["dynamic-attr","okText",["unknown",["okText"]],null],["dynamic-attr","dismissible",false,null],["flush-element"],["text","\\n  "],["open-element","lc-modal-content",[]],["flush-element"],["text","\\n    "],["open-element","lol-uikit-content-block",[]],["static-attr","type","dialog-large"],["static-attr","id","pull-error-dialog-content-block"],["flush-element"],["text","\\n      "],["open-element","h4",[]],["static-attr","class","pull-error-dialog-title"],["flush-element"],["append",["unknown",["title"]],false],["close-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","pull-error-dialog-content"],["flush-element"],["text","\\n        "],["open-element","span",[]],["flush-element"],["append",["helper",["sanitize"],[["get",["content"]]],null],false],["close-element"],["text","\\n        "],["open-element","br",[]],["flush-element"],["close-element"],["text","\\n        "],["open-element","span",[]],["static-attr","class","support"],["flush-element"],["append",["helper",["sanitize"],[["get",["support"]]],null],false],["close-element"],["text","\\n      "],["close-element"],["text","\\n    "],["close-element"],["text","\\n  "],["close-element"],["text","\\n"],["close-element"],["text","\\n\\n"]],"locals":[],"named":[],"yields":[],"blocks":[],"hasPartials":false}',
                meta: {}
            })
        }, (e, t, n) => {
            const s = n(1).Ember;
            e.exports = s.HTMLBars.template({
                id: "JHoaA2Al",
                block: '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-tft\\\\src\\\\lib\\\\troves\\\\addon\\\\templates\\\\components\\\\item-purchase.hbs\\" style-path=\\"null\\" js-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-tft\\\\src\\\\lib\\\\troves\\\\addon\\\\components\\\\item-purchase.js\\" "],["text","\\n"],["open-element","div",[]],["dynamic-attr","class",["concat",["item-purchase-container ",["helper",["if"],[["get",["isLoading"]],"loading-container"],null]]]],["flush-element"],["text","\\n"],["block",["if"],[["get",["isLoading"]]],null,7,6],["close-element"],["text","\\n"],["block",["if"],[["get",["showCompleteButton"]]],null,0]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","  "],["open-element","lol-uikit-flat-button-group",[]],["static-attr","type","dialog-frame"],["flush-element"],["text","\\n    "],["open-element","lol-uikit-flat-button",[]],["static-attr","tabindex","0"],["static-attr","class","button-accept"],["dynamic-attr","onclick",["helper",["action"],[["get",[null]],"endPurchase"],null],null],["flush-element"],["text","\\n      "],["append",["unknown",["completeButtonText"]],false],["text","\\n    "],["close-element"],["text","\\n  "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","              "],["open-element","div",[]],["static-attr","class","purchase-button-new-balance"],["flush-element"],["append",["unknown",["newBalanceText"]],false],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","              "],["open-element","div",[]],["static-attr","class","purchase-button-warning"],["flush-element"],["append",["unknown",["tra","tft_purchase_not_enough_rp"]],false],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","    "],["open-element","div",[]],["static-attr","class","price-container"],["flush-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","unlock-containers"],["flush-element"],["text","\\n        "],["open-element","div",[]],["static-attr","class","unlock-container purchase-button-unlock-container"],["flush-element"],["text","\\n          "],["open-element","div",[]],["static-attr","class","rp-button-wrap"],["flush-element"],["text","\\n            "],["open-element","lol-uikit-purchase-button",[]],["static-attr","rp",""],["dynamic-attr","disabled",["unknown",["notEnoughRp"]],null],["dynamic-attr","onclick",["helper",["action"],[["get",[null]],"makePurchase"],null],null],["static-attr","class","button glow"],["flush-element"],["text","\\n              "],["append",["unknown",["totalPrice"]],false],["text","\\n            "],["close-element"],["text","\\n            "],["open-element","div",[]],["static-attr","class","purchase-button-information-container"],["flush-element"],["text","\\n"],["block",["if"],[["get",["notEnoughRp"]]],null,2,1],["text","            "],["close-element"],["text","\\n          "],["close-element"],["text","\\n        "],["close-element"],["text","\\n      "],["close-element"],["text","\\n    "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","      "],["open-element","div",[]],["static-attr","class","quantity-limit"],["flush-element"],["append",["unknown",["tra","tft_purchase_limit_per_day"]],false],["text",": "],["append",["unknown",["tokenLimit"]],false],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","      "],["open-element","div",[]],["static-attr","class","quantity-control"],["flush-element"],["text","\\n        "],["open-element","div",[]],["dynamic-attr","class",["concat",["quantity-button multi-quantity-button ",["helper",["if"],[["get",["minusButtonDisabled"]],"disabled"],null]]]],["flush-element"],["text","\\n          "],["open-element","button",[]],["dynamic-attr","disabled",["unknown",["minusButtonDisabled"]],null],["dynamic-attr","onmouseenter",["helper",["action"],[["get",[null]],"playSound","buttonHover"],null],null],["modifier",["action"],[["get",[null]],"updateQuantity",["get",["negativeMultiplier"]],"buttonClick"]],["flush-element"],["text","- "],["append",["unknown",["multiplierStep"]],false],["close-element"],["text","\\n        "],["close-element"],["text","\\n        "],["open-element","div",[]],["static-attr","class","quantity-button-group"],["flush-element"],["text","\\n          "],["open-element","div",[]],["dynamic-attr","class",["concat",["quantity-button single-quantity-button ",["helper",["if"],[["get",["minusButtonDisabled"]],"disabled"],null]]]],["flush-element"],["text","\\n            "],["open-element","button",[]],["dynamic-attr","disabled",["unknown",["minusButtonDisabled"]],null],["dynamic-attr","onmouseenter",["helper",["action"],[["get",[null]],"playSound","circleButtonHover"],null],null],["modifier",["action"],[["get",[null]],"updateQuantity",-1,"circleButtonClick"]],["flush-element"],["text","-"],["close-element"],["text","\\n          "],["close-element"],["text","\\n          "],["open-element","span",[]],["flush-element"],["append",["unknown",["tokenQuantity"]],false],["close-element"],["text","\\n          "],["open-element","div",[]],["dynamic-attr","class",["concat",["quantity-button single-quantity-button ",["helper",["if"],[["get",["plusButtonDisabled"]],"disabled"],null]]]],["flush-element"],["text","\\n            "],["open-element","button",[]],["dynamic-attr","disabled",["unknown",["plusButtonDisabled"]],null],["dynamic-attr","onmouseenter",["helper",["action"],[["get",[null]],"playSound","circleButtonHover"],null],null],["modifier",["action"],[["get",[null]],"updateQuantity",1,"circleButtonClick"]],["flush-element"],["text","+"],["close-element"],["text","\\n          "],["close-element"],["text","\\n        "],["close-element"],["text","\\n        "],["open-element","div",[]],["dynamic-attr","class",["concat",["quantity-button multi-quantity-button ",["helper",["if"],[["get",["plusButtonDisabled"]],"disabled"],null]]]],["flush-element"],["text","\\n          "],["open-element","button",[]],["dynamic-attr","disabled",["unknown",["plusButtonDisabled"]],null],["dynamic-attr","onmouseenter",["helper",["action"],[["get",[null]],"playSound","buttonHover"],null],null],["modifier",["action"],[["get",[null]],"updateQuantity",["get",["multiplier"]],"buttonClick"]],["flush-element"],["text","+ "],["append",["unknown",["multiplierStep"]],false],["close-element"],["text","\\n        "],["close-element"],["text","\\n      "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","  "],["open-element","div",[]],["dynamic-attr","class",["concat",["item-portrait ",["helper",["if"],[["get",["isPurchasing"]],"loading-portrait"],null]," ",["helper",["if"],[["get",["purchaseError"]],"error-portrait"],null]]]],["flush-element"],["text","\\n    "],["open-element","img",[]],["dynamic-attr","src",["unknown",["iconUrl"]],null],["static-attr","class","item-image"],["flush-element"],["close-element"],["text","\\n  "],["close-element"],["text","\\n\\n  "],["open-element","div",[]],["dynamic-attr","class",["concat",["purchase-modal-info ",["helper",["if"],[["get",["showCompleteButton"]],"has-complete-button"],null]," ",["helper",["if"],[["get",["isPurchasing"]],"loading-info"],null]]]],["flush-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","purchase-modal-info-heading"],["flush-element"],["text","\\n      "],["open-element","h4",[]],["static-attr","class","title"],["flush-element"],["append",["unknown",["title"]],false],["close-element"],["text","\\n      "],["open-element","div",[]],["dynamic-attr","class",["concat",[["helper",["if"],[["get",["purchaseError"]],"error-description","item-description"],null]]]],["flush-element"],["append",["unknown",["itemDescription"]],false],["close-element"],["text","\\n"],["block",["if"],[["get",["showQuantityButtons"]]],null,5],["block",["if"],[["get",["showQuantityLimit"]]],null,4],["text","    "],["close-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","purchase-confirmation-text"],["flush-element"],["append",["helper",["sanitize"],[["get",["confirmationText"]]],null],false],["close-element"],["text","\\n"],["block",["if"],[["get",["isPurchaseInitializing"]]],null,3],["text","  "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","  "],["append",["unknown",["uikit-spinner"]],false],["text","\\n"]],"locals":[]}],"hasPartials":false}',
                meta: {}
            })
        }, (e, t, n) => {
            const s = n(1).Ember;
            e.exports = s.HTMLBars.template({
                id: "3/cTQCg8",
                block: '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-tft\\\\src\\\\lib\\\\troves\\\\addon\\\\templates\\\\components\\\\troves-banners.hbs\\" style-path=\\"null\\" js-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-tft\\\\src\\\\lib\\\\troves\\\\addon\\\\components\\\\troves-banners.js\\" "],["text","\\n"],["block",["each"],[["get",["activeBanners"]]],null,0]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","    "],["open-element","div",[]],["static-attr","class","banner-icon"],["flush-element"],["text","\\n      "],["open-element","lol-uikit-flat-button",[]],["dynamic-attr","onclick",["helper",["action"],[["get",[null]],["get",["setSelectedChasedContentId"]],["get",["banner","id"]]],null],null],["static-attr","class","button glow"],["static-attr","primary","true"],["static-attr","remove-padding","true"],["flush-element"],["text","\\n        "],["open-element","div",[]],["static-attr","class","banner-thumbnail-holder"],["flush-element"],["text","\\n          "],["open-element","img",[]],["dynamic-attr","src",["concat",[["unknown",["banner","thumbnailTexture"]]]]],["static-attr","class","banner-thumbnail"],["flush-element"],["close-element"],["text","\\n        "],["close-element"],["text","\\n      "],["close-element"],["text","\\n    "],["close-element"],["text","\\n"]],"locals":["banner"]}],"hasPartials":false}',
                meta: {}
            })
        }, (e, t, n) => {
            const s = n(1).Ember;
            e.exports = s.HTMLBars.template({
                id: "tPhQF8nn",
                block: '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-tft\\\\src\\\\lib\\\\troves\\\\addon\\\\templates\\\\components\\\\troves-ceremony.hbs\\" style-path=\\"null\\" js-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-tft\\\\src\\\\lib\\\\troves\\\\addon\\\\components\\\\troves-ceremony.js\\" "],["text","\\n"],["block",["if"],[["get",["ceremonyData"]]],null,3]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","    "],["append",["helper",["portal-video"],null,[["portalSegmentData","maxRarityInRewards","pullType","play","onPlayback","onPlaybackComplete"],[["get",["portalSegmentData"]],["get",["maxRarityInRewards"]],["get",["pullType"]],["get",["playPortalSegment"]],["helper",["action"],[["get",[null]],"onPortalPlayback"],null],["helper",["action"],[["get",[null]],"onPortalComplete"],null]]]],false],["text","\\n"]],"locals":[]},{"statements":[["text","    "],["append",["helper",["troves-ceremony-highlight-rewards"],null,[["highlightSegmentData","buttonText","playAnimation","pauseAnimation","pullType","rewards","onAnimationComplete","onButtonClick"],[["get",["highlightSegmentData"]],["get",["standardSegmentData","PCButtonText"]],["get",["playHighlightSegment"]],["get",["pauseHighlightSegment"]],["get",["pullType"]],["get",["highlightRewards"]],["helper",["action"],[["get",[null]],"onHighlightComplete"],null],["helper",["action"],[["get",[null]],"onHighlightContinueClick"],null]]]],false],["text","\\n"]],"locals":[]},{"statements":[["text","    "],["append",["helper",["troves-ceremony-standard-rewards"],null,[["standardSegmentData","rewards","highlightRewardsExist","onButtonClick"],[["get",["standardSegmentData"]],["get",["sortedStandardRewards"]],["get",["highlightRewardsExist"]],["helper",["action"],[["get",[null]],"onStandardComplete"],null]]]],false],["text","\\n"]],"locals":[]},{"statements":[["open-element","div",[]],["static-attr","class","ceremony__container ceremony__background"],["flush-element"],["text","\\n"],["block",["if"],[["get",["playStandardSegment"]]],null,2],["text","\\n"],["block",["if"],[["get",["highlightRewardsExist"]]],null,1],["text","\\n"],["block",["if"],[["get",["showPortal"]]],null,0],["text","\\n  "],["append",["helper",["uikit-lottie"],null,[["class","play","loop","imagePath","animationParams","onAnimationComplete","src","sfxSrc"],["ceremony__currency-lottie",["get",["playCurrencySegment"]],false,["get",["currencyLottieImagePath"]],["get",["currencyParams"]],["helper",["action"],[["get",[null]],"onCurrencyComplete"],null],["get",["currencyLottiePath"]],["get",["sfxCurrencySrc"]]]]],false],["text","\\n\\n"],["close-element"],["text","\\n"]],"locals":[]}],"hasPartials":false}',
                meta: {}
            })
        }, (e, t, n) => {
            const s = n(1).Ember;
            e.exports = s.HTMLBars.template({
                id: "I95Xu0Qo",
                block: '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-tft\\\\src\\\\lib\\\\troves\\\\addon\\\\templates\\\\components\\\\troves-ceremony-highlight-rewards.hbs\\" style-path=\\"null\\" js-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-tft\\\\src\\\\lib\\\\troves\\\\addon\\\\components\\\\troves-ceremony-highlight-rewards.js\\" "],["text","\\n"],["block",["uikit-vignette"],null,null,3]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","        "],["open-element","lol-uikit-flat-button",[]],["static-attr","class","continue-button"],["dynamic-attr","onclick",["unknown",["onButtonClick"]],null],["flush-element"],["text","\\n          "],["append",["unknown",["buttonText"]],false],["text","\\n        "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["block",["vignette","footer"],null,null,0]],"locals":[]},{"statements":[["text","    "],["append",["helper",["uikit-lottie"],null,[["class","play","pause","loop","imagePath","animationParams","animationReplacementImages","animationReplacementText","onAnimationComplete","src","noJsonCache"],["ceremony__highlight-reveal-lottie",["get",["playAnimation"]],["get",["pauseAnimation"]],false,["get",["highlightLottieImagePath"]],["get",["highlightParams"]],["get",["highlightReplacementImages"]],["get",["highlightReplacementText"]],["get",["onAnimationComplete"]],["get",["highlightLottiePath"]],true]]],false],["text","\\n"]],"locals":[]},{"statements":[["block",["vignette","content"],null,null,2],["text","  \\n"],["block",["if"],[["get",["playAnimation"]]],null,1]],"locals":["vignette"]}],"hasPartials":false}',
                meta: {}
            })
        }, (e, t, n) => {
            const s = n(1).Ember;
            e.exports = s.HTMLBars.template({
                id: "dMKbVV4L",
                block: '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-tft\\\\src\\\\lib\\\\troves\\\\addon\\\\templates\\\\components\\\\troves-ceremony-standard-rewards.hbs\\" style-path=\\"null\\" js-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-tft\\\\src\\\\lib\\\\troves\\\\addon\\\\components\\\\troves-ceremony-standard-rewards.js\\" "],["text","\\n"],["block",["uikit-vignette"],null,null,8]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","      "],["open-element","lol-uikit-flat-button",[]],["static-attr","class","button"],["dynamic-attr","onclick",["helper",["action"],[["get",[null]],["get",["onButtonClick"]]],null],null],["flush-element"],["text","\\n        "],["append",["unknown",["buttonText"]],false],["text","\\n      "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","        "],["open-element","div",[]],["static-attr","class","single-standard-reward-name"],["flush-element"],["text","\\n          "],["append",["unknown",["singleStandardRewardName"]],false],["text","\\n        "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","              "],["open-element","div",[]],["static-attr","class","reward-card-placeholder"],["flush-element"],["text","\\n"],["text","              "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","              "],["append",["helper",["reward-card"],null,[["reward","class","shouldPlayGlint","standardSegmentData"],[["get",["reward"]],["helper",["if"],[["get",["isSingleReward"]],"single-reward"],null],["get",["isSingleReward"]],["get",["standardSegmentData"]]]]],false],["text","\\n"]],"locals":[]},{"statements":[["block",["if"],[["get",["reward"]]],null,3,2]],"locals":["reward"]},{"statements":[["text","\\n        "],["open-element","div",[]],["static-attr","class","rewards-row"],["flush-element"],["text","\\n"],["block",["each"],[["get",["rewardsList"]]],null,4],["text","        "],["close-element"],["text","\\n\\n"]],"locals":["rewardsList"]},{"statements":[["text","    "],["open-element","div",[]],["static-attr","class","rewards-container"],["flush-element"],["text","\\n\\n"],["block",["each"],[["get",["rewardStaggeredLists"]]],null,5],["block",["if"],[["get",["isSingleReward"]]],null,1],["text","    "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","    "],["append",["unknown",["headerText"]],false],["text","\\n"]],"locals":[]},{"statements":[["block",["vignette","header"],null,null,7],["text","\\n"],["block",["vignette","content"],null,null,6],["text","  \\n"],["block",["vignette","footer"],null,null,0]],"locals":["vignette"]}],"hasPartials":false}',
                meta: {}
            })
        }, (e, t, n) => {
            const s = n(1).Ember;
            e.exports = s.HTMLBars.template({
                id: "JJCinhB+",
                block: '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-tft\\\\src\\\\lib\\\\troves\\\\addon\\\\templates\\\\components\\\\chased-content.hbs\\" style-path=\\"null\\" js-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-tft\\\\src\\\\lib\\\\troves\\\\addon\\\\components\\\\chased-content.js\\" "],["text","\\n"],["open-element","div",[]],["static-attr","class","chase-content"],["flush-element"],["text","\\n"],["block",["if"],[["get",["chasedContent","id"]]],null,3,2],["close-element"],["text","\\n\\n"],["block",["if"],[["get",["showDropRatesModal"]]],null,1]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","    "],["append",["helper",["loot-table-root"],null,[["dropTableId","badLuckProtectionDisclaimer"],[["get",["chasedContent","id"]],["get",["legalDisclaimer"]]]]],false],["text","\\n"]],"locals":[]},{"statements":[["block",["uikit-modal"],null,[["type","dismissibleType","onClose"],["DialogDismiss","inside",["helper",["action"],[["get",[null]],"hideDropRatesModal"],null]]],0]],"locals":[]},{"statements":[["text","    "],["open-element","div",[]],["static-attr","class","chase-name-label"],["flush-element"],["append",["unknown",["tra","troves_chased_content_not_available"]],false],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","    "],["open-element","div",[]],["static-attr","class","chase-name-label"],["flush-element"],["text","\\n      "],["open-element","span",[]],["static-attr","class","chase-name-inner"],["dynamic-attr","onclick",["helper",["action"],[["get",[null]],"onMoreInfoClicked"],null],null],["flush-element"],["append",["unknown",["chasedContent","name"]],false],["open-element","img",[]],["dynamic-attr","src",["concat",[["unknown",["moreInfoIcon"]]]]],["static-attr","class","more-info-icon"],["flush-element"],["close-element"],["close-element"],["text","\\n    "],["close-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","pity-label"],["flush-element"],["append",["unknown",["pityText"]],false],["close-element"],["text","\\n    "],["open-element","img",[]],["dynamic-attr","src",["concat",[["unknown",["chasedContent","bannerTexture"]]]]],["static-attr","class","chase-image"],["flush-element"],["close-element"],["text","\\n"]],"locals":[]}],"hasPartials":false}',
                meta: {}
            })
        }, (e, t, n) => {
            const s = n(1).Ember;
            e.exports = s.HTMLBars.template({
                id: "Z5J9MTUT",
                block: '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-tft\\\\src\\\\lib\\\\troves\\\\addon\\\\templates\\\\components\\\\tft-troves.hbs\\" style-path=\\"null\\" js-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-tft\\\\src\\\\lib\\\\troves\\\\addon\\\\components\\\\tft-troves.js\\" "],["text","\\n"],["block",["if"],[["get",["isLoading"]]],null,9,8]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","          "],["append",["helper",["mythic-button"],null,[["activeBannerStatus","activeBannerSourceId","pityCount","mythicOfferId"],[["get",["activeBannerStatus"]],["get",["activeBanner","sourceId"]],["get",["pityCount"]],["get",["mythicOfferId"]]]]],false],["text","\\n"]],"locals":[]},{"statements":[],"locals":[]},{"statements":[["text","          "],["open-element","div",[]],["static-attr","class","banners-container"],["flush-element"],["text","\\n            "],["append",["helper",["troves-banners"],null,[["activeBanners","setSelectedChasedContentId"],[["get",["activeBanners"]],["helper",["action"],[["get",[null]],"setSelectedChasedContentId"],null]]]],false],["text","\\n          "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","    "],["open-element","div",[]],["static-attr","id","troves-ceremony-wrapper"],["static-attr","class","troves-celebration"],["flush-element"],["text","\\n      "],["append",["helper",["troves-ceremony"],null,[["ceremonyData","activeBanner"],[["get",["trovesService","ceremonyData"]],["get",["activeBanner"]]]]],false],["text","\\n    "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["block",["if"],[["get",["trovesService","ceremonyData"]]],null,3],["text","\\n    "],["open-element","div",[]],["static-attr","class","root-container"],["flush-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","left-container"],["flush-element"],["text","\\n"],["block",["if"],[["get",["showBannersList"]]],null,2],["text","      "],["close-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","center-container"],["flush-element"],["text","\\n        "],["open-element","div",[]],["static-attr","class","chased-content-container"],["flush-element"],["text","\\n            "],["append",["helper",["chased-content"],null,[["chasedContent","onPityUpdate"],[["get",["activeBanner"]],["helper",["action"],[["get",[null]],"onPityUpdate"],null]]]],false],["text","\\n          "],["open-element","img",[]],["static-attr","class","cloud-platform-image"],["dynamic-attr","src",["concat",[["unknown",["activePlatformImage"]]]]],["flush-element"],["close-element"],["text","\\n        "],["close-element"],["text","\\n\\n        "],["open-element","div",[]],["static-attr","class","pull-buttons"],["flush-element"],["text","\\n          "],["append",["helper",["pull-buttons-container"],null,[["activeBannerStatus","activeBannerSourceId","pityCount","pullCost","selectedOfferId"],[["get",["activeBannerStatus"]],["get",["activeBanner","sourceId"]],["get",["pityCount"]],["get",["pullCost"]],["get",["selectedOfferId"]]]]],false],["text","\\n        "],["close-element"],["text","\\n      "],["close-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","right-container"],["flush-element"],["text","\\n"],["block",["if"],[["get",["activeBanner","isCollectorBounty"]]],null,1,0],["text","      "],["close-element"],["text","\\n    "],["close-element"],["text","\\n  "]],"locals":[]},{"statements":[["text","    "],["open-element","div",[]],["static-attr","class","standalone-container"],["flush-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","standalone-title-text"],["flush-element"],["append",["unknown",["tra","troves_hub_banner_empty_title"]],false],["close-element"],["text","\\n      "],["open-element","img",[]],["dynamic-attr","src",["concat",[["unknown",["emptyBannerImage"]]]]],["static-attr","class","standalone-image"],["flush-element"],["close-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","standalone-footer-text"],["flush-element"],["append",["unknown",["tra","troves_hub_banner_empty_footer"]],false],["close-element"],["text","\\n    "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["block",["if"],[["get",["isEmpty"]]],null,5,4]],"locals":[]},{"statements":[["text","    "],["open-element","div",[]],["static-attr","class","standalone-container"],["flush-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","standalone-title-text"],["flush-element"],["append",["unknown",["tra","troves_hub_banner_error_title"]],false],["close-element"],["text","\\n      "],["open-element","img",[]],["dynamic-attr","src",["concat",[["unknown",["errorBannerImage"]]]]],["static-attr","class","standalone-image"],["flush-element"],["close-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","standalone-footer-text"],["flush-element"],["append",["unknown",["tra","troves_hub_banner_error_footer"]],false],["close-element"],["text","\\n    "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["block",["if"],[["get",["hasBannerError"]]],null,7,6],["text","  "],["append",["unknown",["pull-error-dialog"]],false],["text","\\n"]],"locals":[]},{"statements":[["text","  "],["open-element","div",[]],["static-attr","class","loading-spinner"],["flush-element"],["text","\\n    "],["append",["unknown",["uikit-spinner"]],false],["text","\\n  "],["close-element"],["text","\\n"]],"locals":[]}],"hasPartials":false}',
                meta: {}
            })
        }, (e, t, n) => {
            const s = n(1).Ember;
            e.exports = s.HTMLBars.template({
                id: "VNq2uo2G",
                block: '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-tft\\\\src\\\\lib\\\\troves\\\\addon\\\\templates\\\\components\\\\reward-card.hbs\\" style-path=\\"null\\" js-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-tft\\\\src\\\\lib\\\\troves\\\\addon\\\\components\\\\reward-card.js\\" "],["text","\\n"],["open-element","div",[]],["static-attr","class","reward-card-content"],["dynamic-attr","style",["concat",["transition-duration: ",["unknown",["rewardFadeInDuration"]],"; transition-delay: ",["unknown",["rewardFadeInDelay"]]]]],["flush-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","sheen"],["dynamic-attr","style",["concat",["background-image: url(\'",["helper",["sanitize"],[["get",["sheenPath"]]],null],"\'); transition-duration: ",["unknown",["sheenDuration"]],"; transition-delay: ",["unknown",["sheenDelay"]],";"]]],["flush-element"],["close-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","frame-container"],["flush-element"],["text","\\n        "],["open-element","div",[]],["static-attr","class","frame"],["dynamic-attr","style",["concat",["background-image: url(\'",["helper",["sanitize"],[["get",["framePath"]]],null],"\');"]]],["flush-element"],["text","\\n            "],["open-element","div",[]],["static-attr","class","icon"],["dynamic-attr","style",["concat",["background-image: url(\'",["helper",["sanitize"],[["get",["reward","rewardTexturePath"]]],null],"\');"]]],["flush-element"],["text","\\n                "],["open-element","div",[]],["static-attr","class","cover"],["dynamic-attr","style",["concat",["transition-duration: ",["unknown",["thumbnailFadeInDuration"]],"; transition-delay: ",["unknown",["thumbnailFadeInDelay"]],";"]]],["flush-element"],["close-element"],["text","\\n            "],["close-element"],["text","\\n        "],["close-element"],["text","\\n    "],["close-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","reward-info star-level"],["dynamic-attr","style",["concat",["background-image: url(\'",["helper",["sanitize"],[["get",["starPath"]]],null],"\');"]]],["flush-element"],["close-element"],["text","\\n    "],["open-element","div",[]],["dynamic-attr","class",["concat",["reward-info rarity-gem ",["unknown",["rarityCssClass"]]]]],["dynamic-attr","style",["concat",["background-image: url(\'",["helper",["sanitize"],[["get",["gemPath"]]],null],"\');"]]],["flush-element"],["close-element"],["text","\\n"],["block",["if"],[["get",["shouldPlayGlint"]]],null,1],["close-element"],["text","\\n"],["block",["if"],[["get",["isLegendary"]]],null,0]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","    "],["open-element","div",[]],["static-attr","class","legendary-spark-anim"],["flush-element"],["text","\\n        "],["append",["helper",["troves-sprite-animation"],null,[["sprite"],[["get",["standardSegmentData","PCLegendarySparkSprite"]]]]],false],["text","\\n    "],["close-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","legendary-hit-anim"],["flush-element"],["text","\\n        "],["append",["helper",["troves-sprite-animation"],null,[["sprite"],[["get",["standardSegmentData","PCLegendaryHitSprite"]]]]],false],["text","\\n    "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","        "],["open-element","div",[]],["static-attr","class","glint-anim"],["dynamic-attr","style",["concat",["transition-duration: ",["unknown",["glintDuration"]],"; transition-delay: ",["unknown",["glintDelay"]]]]],["flush-element"],["text","\\n            "],["append",["helper",["troves-sprite-animation"],null,[["sprite"],[["get",["standardSegmentData","PCGlintSprite"]]]]],false],["text","\\n        "],["close-element"],["text","\\n"]],"locals":[]}],"hasPartials":false}',
                meta: {}
            })
        }, (e, t, n) => {
            const s = n(1).Ember;
            e.exports = s.HTMLBars.template({
                id: "sARxtk6q",
                block: '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-tft\\\\src\\\\lib\\\\troves\\\\addon\\\\templates\\\\components\\\\portal-video.hbs\\" style-path=\\"null\\" js-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-tft\\\\src\\\\lib\\\\troves\\\\addon\\\\components\\\\portal-video.js\\" "],["text","\\n"],["open-element","uikit-video",[]],["static-attr","class","ceremony__portal-webm"],["dynamic-attr","src",["unknown",["portalVideoPath"]],null],["static-attr","cache-name","rcp-fe-lol-tft"],["static-attr","preload","true"],["static-attr","autoplay","false"],["flush-element"],["text","\\n"],["close-element"]],"locals":[],"named":[],"yields":[],"blocks":[],"hasPartials":false}',
                meta: {}
            })
        }, (e, t, n) => {
            const s = n(1).Ember;
            e.exports = s.HTMLBars.template({
                id: "Mids4gmb",
                block: '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-tft\\\\src\\\\lib\\\\troves\\\\addon\\\\templates\\\\components\\\\troves-sprite-animation.hbs\\" style-path=\\"null\\" js-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-tft\\\\src\\\\lib\\\\troves\\\\addon\\\\components\\\\troves-sprite-animation.js\\" "],["text","\\n"],["open-element","div",[]],["static-attr","class","sprite-container"],["flush-element"],["text","\\n     "],["open-element","div",[]],["static-attr","class","sprite"],["dynamic-attr","style",["unknown",["elementStyle"]],null],["flush-element"],["close-element"],["text","\\n"],["close-element"]],"locals":[],"named":[],"yields":[],"blocks":[],"hasPartials":false}',
                meta: {}
            })
        }, (e, t, n) => {
            const s = n(1).Ember;
            e.exports = s.HTMLBars.template({
                id: "65LyRfQk",
                block: '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-tft\\\\src\\\\app\\\\templates\\\\troves.hbs\\" style-path=\\"null\\" js-path=\\"null\\" "],["text","\\n"],["open-element","div",[]],["static-attr","class","rcp-fe-lol-tft-application-background"],["dynamic-attr","style",["concat",["background-image:url(",["unknown",["backgroundPath"]],")"]]],["flush-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","rcp-fe-lol-tft-application"],["static-attr","style","height: 720px; width: 1055px;"],["flush-element"],["text","\\n"],["block",["if"],[["get",["trovesV2Enabled"]]],null,1,0],["text","  "],["close-element"],["text","\\n"],["close-element"],["text","\\n"]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","    "],["append",["helper",["tft-troves"],null,[["activeBanner","onBannerSelected"],[["get",["displayedBanner"]],["helper",["action"],[["get",[null]],"onBannerSelected"],null]]]],false],["text","\\n"]],"locals":[]},{"statements":[["text","    "],["append",["helper",["tft-troves-v2"],null,[["activeBanner","onBannerSelected"],[["get",["displayedBanner"]],["helper",["action"],[["get",[null]],"onBannerSelected"],null]]]],false],["text","\\n"]],"locals":[]}],"hasPartials":false}',
                meta: {}
            })
        }, (e, t, n) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = void 0;
            var s = n(1),
                a = n(75),
                l = n(113);
            const o = "/lol-tft-troves/v1/purchase",
                i = "/lol-tft-troves/v1/order-notifications/";
            var r = s.Ember.Component.extend({
                classNames: ["tft-troves-item-purchase"],
                layout: n(159),
                tagName: "lol-uikit-dialog-frame",
                attributeBindings: ["dismissable"],
                dismissable: !0,
                tftService: null,
                trovesService: null,
                offer: s.Ember.computed.alias("trovesService.trovesTokensOffer"),
                isLoading: s.Ember.computed.not("offer"),
                isPurchasing: !1,
                purchaseSuccess: !1,
                purchaseError: !1,
                errorMessage: null,
                currentOrderId: null,
                currentRmsNotificationTimer: null,
                orderNotifications: null,
                quantity: 1,
                multiplier: 10,
                ModalManager: s.UIKit.getModalManager(),
                init() {
                    this._super(...arguments)
                },
                willDestroy() {
                    this._clearPurchaseOrderNotificationTimer(), this._super(...arguments)
                },
                step: s.Ember.computed("offer.quantity", (function() {
                    const e = this.get("offer.quantity");
                    return isNaN(e) || e < 0 ? 1 : e
                })),
                multiplierStep: s.Ember.computed("step", "multiplier", (function() {
                    return this.get("step") * this.get("multiplier")
                })),
                negativeMultiplier: s.Ember.computed("multiplier", (function() {
                    return -this.get("multiplier")
                })),
                tokenQuantity: s.Ember.computed("quantity", "step", (function() {
                    return this.get("quantity") * this.get("step")
                })),
                plusButtonDisabled: s.Ember.computed("quantity", "offer.maxQuantity", (function() {
                    const e = this.get("offer.maxQuantity");
                    return !(isNaN(e) || e < 0) && this.get("quantity") >= e
                })),
                minusButtonDisabled: s.Ember.computed("quantity", "offer.minQuantity", (function() {
                    const e = this.get("offer.minQuantity");
                    return !(isNaN(e) || e < 0) && this.get("quantity") <= e
                })),
                totalPrice: s.Ember.computed("quantity", "offer.price", (function() {
                    let e = this.get("offer.price");
                    return isNaN(e) && (e = 0), this.get("quantity") * e
                })),
                newBalance: s.Ember.computed("totalPrice", "tftService.rpAmount", (function() {
                    return this.get("tftService.rpAmount") - this.get("totalPrice")
                })),
                newBalanceText: s.Ember.computed("newBalance", (function() {
                    return this.get("tra").formatString("tft_purchase_new_balance", {
                        balance: this.get("newBalance")
                    })
                })),
                notEnoughRp: s.Ember.computed.lt("newBalance", 0),
                tokenPurchaseSuccessText: s.Ember.computed("tokenQuantity", (function() {
                    return `<p class="purchase-success-quantity">${this.get("tra").formatString("troves_tokens_quantity",{quantity:this.get("tokenQuantity")})}</p><p class="purchase-success-message">${this.get("tra").formatString("troves_tokens_granting",{quantity:this.get("tokenQuantity")})}</p>`
                })),
                tokenLimit: s.Ember.computed("offer.maxQuantity", "offer.quantity", (function() {
                    return this.get("offer.maxQuantity") * this.get("offer.quantity")
                })),
                iconUrl: s.Ember.computed("isPurchasing", "purchaseError", "purchaseSuccess", "offer.iconUrl", (function() {
                    return this.get("isPurchasing") ? "/fe/lol-tft-troves/images/purchase-loading.gif" : this.get("purchaseError") ? "/fe/lol-tft-troves/images/purchase-warning.png" : this.get("offer.iconUrl")
                })),
                title: s.Ember.computed("isPurchasing", "purchaseError", "purchaseSuccess", "offer.name", (function() {
                    return this.get("isPurchasing") ? this.get("tra.tft_purchase_title_loading") : this.get("purchaseError") ? this.get("tra.tft_purchase_error_title") : this.get("purchaseSuccess") ? this.get("tra.tft_purchase_title_success") : this.get("offer.name")
                })),
                itemDescription: s.Ember.computed("isPurchasing", "purchaseError", "purchaseSuccess", "offer.description", (function() {
                    return this.get("purchaseError") ? this.get("errorMessage") : this.get("purchaseSuccess") || this.get("isPurchasing") ? "" : this.get("offer.description")
                })),
                completeButtonText: s.Ember.computed("purchaseSuccess", (function() {
                    return this.get("purchaseSuccess") ? this.get("tra.tft_purchase_button_complete") : this.get("tra.tft_purchase_button_close")
                })),
                confirmationText: s.Ember.computed("isPurchasing", "purchaseError", "purchaseSuccess", (function() {
                    return this.get("isPurchasing") ? this.get("tra.tft_purchase_message_loading") : this.get("purchaseError") ? this.get("tra.tft_purchase_error_try_later") : this.get("purchaseSuccess") ? this.get("tokenPurchaseSuccessText") : ""
                })),
                showCompleteButton: s.Ember.computed("purchaseSuccess", "purchaseError", (function() {
                    return this.get("purchaseSuccess") || this.get("purchaseError")
                })),
                isPurchaseInitializing: s.Ember.computed("isPurchasing", "purchaseError", "purchaseSuccess", (function() {
                    return !this.get("isPurchasing") && !this.get("purchaseError") && !this.get("purchaseSuccess")
                })),
                showQuantityButtons: s.Ember.computed("isPurchaseInitializing", "offer.incrementalPurchase", (function() {
                    return this.get("isPurchaseInitializing") && this.get("offer.incrementalPurchase")
                })),
                showQuantityLimit: s.Ember.computed("isPurchaseInitializing", "offer.maxQuantity", (function() {
                    return this.get("isPurchaseInitializing") && this.get("offer.maxQuantity") > 0
                })),
                actions: {
                    updateQuantity(e, t) {
                        if (e > 0 && this.get("plusButtonDisabled") || e < 0 && this.get("minusButtonDisabled")) return;
                        let n = this.get("offer.minQuantity");
                        isNaN(n) && (n = 1);
                        let s = this.get("offer.maxQuantity");
                        isNaN(s) && (s = -1);
                        let a = this.get("quantity") + e;
                        n > 0 && a < n ? a = n : s > 0 && a > s && (a = s), this.set("quantity", a), this.send("playSound", t)
                    },
                    makePurchase() {
                        if (this.get("offer")) return this.set("isPurchasing", !0), this.set("purchaseSuccess", !1), s.db.post(o, {
                            offerId: this.get("offer.id"),
                            quantity: this.get("quantity")
                        }).then(this._handlePurchaseRequestCompleted.bind(this)).catch(this._handlePurchaseError.bind(this))
                    },
                    endPurchase() {
                        this.element && this.element.dispatchEvent(new Event("closeButtonClick", {
                            bubbles: !0
                        }))
                    },
                    playSound(e) {
                        const t = l.SFX[e];
                        t && t.play()
                    }
                },
                _handlePurchaseRequestCompleted(e) {
                    if (e) {
                        const t = e.data && e.data.id;
                        if (!t) return void this._handlePurchaseError();
                        this.set("currentOrderId", t), s.db.addObserver(i + t, this, (e => {
                            e && (this.set("orderNotifications", e), this._clearPurchaseOrderNotificationTimer(), e.status === a.CAP_STATUS_COMPLETE ? this._handlePurchaseCompleted() : this._handlePurchaseError(), this.set("currentOrderId", null), s.db.removeObserver(i + e.orderId, this))
                        }));
                        const n = setTimeout((() => {
                            this._handlePurchaseOrderNotificationTimeout()
                        }), a.MAX_WAITING_TIME_IN_MS);
                        this.set("currentRmsNotificationTimer", n)
                    } else this._handlePurchaseCompleted()
                },
                _handlePurchaseCompleted() {
                    this.set("isPurchasing", !1), this.set("purchaseSuccess", !0)
                },
                _handlePurchaseError() {
                    this.set("isPurchasing", !1), this.set("purchaseSuccess", !1), this.set("purchaseError", !0);
                    const e = this.get("orderNotifications");
                    e && e.errorCode ? (e.data && e.data.availableQuantity && (e.data.availableQuantity = e.data.availableQuantity * this.get("step")), this.set("errorMessage", this.get("tra").formatString("troves_store_order_error_code_" + e.errorCode, e.data))) : this.set("errorMessage", this.get("tra.tft_purchase_error_generic"))
                },
                _handlePurchaseOrderNotificationTimeout() {
                    this._handlePurchaseError(), this.set("currentOrderId", null)
                },
                _clearPurchaseOrderNotificationTimer() {
                    const e = this.get("currentRmsNotificationTimer");
                    e && (clearTimeout(e), this.set("currentOrderId", null))
                }
            });
            t.default = r
        }, (e, t, n) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = void 0;
            var s = n(1),
                a = n(2);
            n(172);
            const l = s.UIKit.getVignetteCelebrationManager();
            var o = s.Ember.Component.extend({
                classNames: [`${a.PLUGIN_NAME}-reward-celebration`],
                layout: n(173),
                selectedReward: null,
                softSelectionMade: !1,
                didDestroyElement() {
                    null !== this.get("selectedReward") && this.set("selectedReward", null)
                },
                actions: {
                    selectReward(e, t) {
                        t.target.disabled || (null !== this.get("selectedReward") && this.set("selectedReward.isSelected", !1), this.set("selectedReward", e), this.set("selectedReward.isSelected", !0), this.set("softSelectionMade", !0), l.update({
                            id: this.id,
                            data: {
                                nextButtonEnabled: !0
                            }
                        }))
                    }
                }
            });
            t.default = o
        }, (e, t, n) => {
            "use strict";
            n.r(t)
        }, (e, t, n) => {
            const s = n(1).Ember;
            e.exports = s.HTMLBars.template({
                id: "rtoHnPaf",
                block: '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-tft\\\\src\\\\app\\\\components\\\\reward-celebration\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-tft\\\\src\\\\app\\\\components\\\\reward-celebration\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-tft\\\\src\\\\app\\\\components\\\\reward-celebration\\\\index.js\\" "],["text","\\n"],["open-element","div",[]],["static-attr","class","rewards-container"],["flush-element"],["text","\\n"],["block",["each"],[["get",["rewards"]]],null,2],["close-element"]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","      "],["open-element","div",[]],["static-attr","class","reward"],["flush-element"],["text","\\n        "],["open-element","div",[]],["dynamic-attr","class",["concat",["reward-icon ",["unknown",["reward","rewardType"]]]]],["flush-element"],["text","\\n          "],["open-element","img",[]],["dynamic-attr","src",["unknown",["reward","iconUrl"]],null],["flush-element"],["close-element"],["text","\\n        "],["close-element"],["text","\\n        "],["open-element","div",[]],["static-attr","class","reward-description-wrapper"],["flush-element"],["text","\\n          "],["open-element","div",[]],["static-attr","class","reward-description"],["flush-element"],["append",["unknown",["reward","description"]],false],["close-element"],["text","\\n        "],["close-element"],["text","\\n      "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","      "],["open-element","div",[]],["dynamic-attr","onclick",["helper",["action"],[["get",[null]],"selectReward",["get",["reward"]]],null],null],["dynamic-attr","class",["concat",["reward selectable \\n          ",["helper",["if"],[["get",["reward","isSelected"]],"selected"],null]," \\n          ",["helper",["if"],[["get",["softSelectionMade"]],"selection-made"],null]]]],["flush-element"],["text","\\n        "],["open-element","div",[]],["static-attr","class","brightener-bg"],["flush-element"],["close-element"],["text","\\n        "],["open-element","div",[]],["static-attr","class","dimmer-bg"],["flush-element"],["close-element"],["text","\\n        "],["open-element","div",[]],["static-attr","class","radial-glow"],["flush-element"],["close-element"],["text","\\n        "],["open-element","div",[]],["dynamic-attr","class",["concat",["reward-icon ",["unknown",["reward","rewardType"]]]]],["flush-element"],["text","\\n          "],["open-element","img",[]],["dynamic-attr","src",["unknown",["reward","iconUrl"]],null],["flush-element"],["close-element"],["text","\\n        "],["close-element"],["text","\\n        "],["open-element","div",[]],["static-attr","class","reward-description-wrapper"],["flush-element"],["text","\\n          "],["open-element","div",[]],["static-attr","class","reward-description"],["flush-element"],["append",["unknown",["reward","description"]],false],["close-element"],["text","\\n        "],["close-element"],["text","\\n      "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["block",["if"],[["get",["selectable"]]],null,1,0]],"locals":["reward"]}],"hasPartials":false}',
                meta: {}
            })
        }, (e, t, n) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = void 0;
            var s = n(1),
                a = n(2);
            n(175);
            var l = s.Ember.Component.extend({
                classNames: [`${a.PLUGIN_NAME}-reward-celebration-v2`],
                layout: n(176),
                rewardsPerPage: 10,
                currentPage: 1,
                pageCount: s.Ember.computed("rewardsPerPage", (function() {
                    const e = this.get("rewards"),
                        t = this.get("rewardsPerPage");
                    return Math.ceil(e.length / t)
                })),
                isOnePage: s.Ember.computed.equal("pageCount", 1),
                isFirstPage: s.Ember.computed.equal("currentPage", 1),
                isLastPage: s.Ember.computed("currentPage", "pageCount", (function() {
                    return this.get("pageCount") === this.get("currentPage")
                })),
                paginatedRewards: s.Ember.computed("rewards.@each", "pageCount", "currentPage", (function() {
                    const e = this.get("rewards"),
                        t = this.get("rewardsPerPage"),
                        n = this.get("pageCount"),
                        s = this.get("currentPage"),
                        a = {};
                    for (let l = 1; l <= n; l++) {
                        const n = e.slice((l - 1) * t, l * t);
                        a[l] = {
                            isSelected: l === s,
                            contents: n
                        }
                    }
                    return a
                })),
                currentPageRewards: s.Ember.computed("paginatedRewards", "currentPage", (function() {
                    return this.get("paginatedRewards")[this.get("currentPage")].contents
                })),
                selectedPageLookup: s.Ember.computed("currentPage", "pageCount", (function() {
                    const e = this.get("currentPage"),
                        t = this.get("pageCount"),
                        n = {};
                    for (let s = 1; s <= t; s++) n[s] = s === e;
                    return n
                })),
                playClickSounds() {
                    s.Audio.getChannel("sfx-ui").playSound("/fe/lol-static-assets/sounds/sfx-uikit-grid-click.ogg"), s.Audio.getChannel("sfx-ui").playSound("/fe/lol-static-assets/sounds/sfx-uikit-grid-click-release.ogg")
                },
                setPage(e) {
                    this.playClickSounds();
                    const t = parseInt(this.get("pageCount"));
                    (e = parseInt(e)) >= 1 && e <= t && this.set("currentPage", e)
                },
                actions: {
                    setPage(e) {
                        this.setPage(e)
                    },
                    nextPage() {
                        this.playClickSounds(), this.setPage(1 + this.get("currentPage"))
                    },
                    previousPage() {
                        this.playClickSounds(), this.setPage(this.get("currentPage") - 1)
                    }
                }
            });
            t.default = l
        }, (e, t, n) => {
            "use strict";
            n.r(t)
        }, (e, t, n) => {
            const s = n(1).Ember;
            e.exports = s.HTMLBars.template({
                id: "HvU1j5HT",
                block: '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-tft\\\\src\\\\app\\\\components\\\\reward-celebration-v2\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-tft\\\\src\\\\app\\\\components\\\\reward-celebration-v2\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-tft\\\\src\\\\app\\\\components\\\\reward-celebration-v2\\\\index.js\\" "],["text","\\n"],["open-element","div",[]],["static-attr","class","celebration-container"],["flush-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","reward-page"],["flush-element"],["text","\\n"],["block",["each"],[["get",["currentPageRewards"]]],null,4],["text","      "],["close-element"],["text","\\n    \\n\\n"],["block",["unless"],[["get",["isOnePage"]]],null,3],["text","    "],["block",["unless"],[["get",["isFirstPage"]]],null,1],["text","\\n    "],["block",["unless"],[["get",["isLastPage"]]],null,0],["text","\\n"],["close-element"],["text","\\n"]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text"," "],["open-element","a",[]],["dynamic-attr","class",["concat",["right-arrow ",["helper",["if"],[["get",["isLastPage"]],"hidden"],null]]]],["modifier",["action"],[["get",[null]],"nextPage"]],["flush-element"],["close-element"],["text"," "]],"locals":[]},{"statements":[["text"," "],["open-element","a",[]],["static-attr","class","left-arrow"],["modifier",["action"],[["get",[null]],"previousPage"]],["flush-element"],["close-element"],["text"," "]],"locals":[]},{"statements":[["text","        "],["open-element","a",[]],["dynamic-attr","class",["concat",["page-selector ",["helper",["if"],[["get",["rewards","isSelected"]],"selected"],null]]]],["modifier",["action"],[["get",[null]],"setPage",["get",["page"]]]],["flush-element"],["close-element"],["text","\\n"]],"locals":["page","rewards"]},{"statements":[["text","    "],["open-element","div",[]],["static-attr","class","page-select"],["flush-element"],["text","\\n"],["block",["each"],[["helper",["-each-in"],[["get",["paginatedRewards"]]],null]],null,2],["text","    "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","            "],["open-element","div",[]],["dynamic-attr","class",["concat",["reward ",["unknown",["reward","rewardType"]]]]],["dynamic-attr","style",["concat",["background-image: url(\'",["unknown",["reward","iconUrl"]],"\')"]]],["flush-element"],["close-element"],["text","\\n"]],"locals":["reward"]}],"hasPartials":false}',
                meta: {}
            })
        }, (e, t, n) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = void 0;
            t.default = class {
                constructor(e) {
                    this._api = e
                }
                show(e) {
                    return this._api.show(e).then((() => this))
                }
                hide() {}
                getBattlePassMilestone() {
                    return {
                        BattlepassMilestoneComponent: n(27).default,
                        TftService: n(137).default,
                        TftTooltipComponent: n(19).default
                    }
                }
                showTroves() {
                    return this._api.showTroves()
                }
                showEventPass() {
                    return this._api.showEventPass()
                }
                updateEventHubUrl(e) {
                    this._api.updateEventHubUrl(e)
                }
            }
        }],
        t = {};

    function n(s) {
        var a = t[s];
        if (void 0 !== a) return a.exports;
        var l = t[s] = {
            exports: {}
        };
        return e[s](l, l.exports, n), l.exports
    }
    n.r = e => {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
            value: "Module"
        }), Object.defineProperty(e, "__esModule", {
            value: !0
        })
    }, n.p = "/fe/lol-tft/", (() => {
        "use strict";
        var e, t = (e = n(1)) && e.__esModule ? e : {
                default: e
            },
            s = n(2);
        n(3), n(4);
        const a = "rcp-fe-lol-tft",
            l = document.currentScript.ownerDocument;
        const o = window.getPluginAnnounceEventName(a);
        l.addEventListener(o, (function(e) {
            (0, e.registrationHandler)((function(e) {
                const o = e => e.get("rcp-fe-ember-libs").getEmberDataBinding("rcp-fe-lol-tft");
                return t.default.init(e, {
                    Audio: e => e.get("rcp-fe-audio"),
                    AudioPlugin: e => e.get("rcp-fe-audio"),
                    componentFactory: e => e.get("rcp-fe-common-libs").getComponentFactory("1"),
                    dataBinding: e => e.get("rcp-fe-common-libs").getDataBinding(s.PLUGIN_NAME),
                    Ember: e => e.get("rcp-fe-ember-libs").getEmber(),
                    EmberDataBinding: o,
                    emberDataBinding: o,
                    emberL10n: e => e.get("rcp-fe-ember-libs").getEmberL10n("1"),
                    htmlSanitizer: e => e.get("rcp-fe-common-libs").getHtmlSanitizer(1),
                    LeagueTierNames: e => e.get("rcp-fe-lol-shared-components").getApi_LeagueTierNames(),
                    lockAndLoadPlugin: e => e.get("rcp-fe-lol-lock-and-load"),
                    lodash: e => e.get("rcp-fe-common-libs").getLodash(4),
                    logger: e => e.get("rcp-fe-common-libs").logging.create(a),
                    ModalManager: e => e.get("rcp-fe-lol-uikit").getModalManager(),
                    navigation: e => e.get("rcp-fe-lol-navigation"),
                    Parties: e => e.get("rcp-fe-lol-parties"),
                    Replays: e => e.get("rcp-fe-lol-shared-components").getApi_Replays(),
                    Router: e => e.get("rcp-fe-lol-shared-components").getApi_Router(),
                    SharedEmberComponents: e => e.get("rcp-fe-lol-shared-components").getSharedEmberComponents(),
                    socket: e => e.getSocket(),
                    Telemetry: e => e.get("rcp-fe-common-libs").getTelemetry(1),
                    TemplateHelper: e => e.get("rcp-fe-lol-uikit").getTemplateHelper(),
                    TooltipManager: e => e.get("rcp-fe-lol-uikit").getTooltipManager(),
                    UIKit: e => e.get("rcp-fe-lol-uikit"),
                    UIKitPlugin: e => e.get("rcp-fe-lol-uikit"),
                    UXSettings: e => e.get("rcp-fe-lol-shared-components").getApi_UXSettings(),
                    VideoCache: e => e.get("rcp-fe-lol-uikit").getVideoCache(),
                    Viewport: e => e.get("rcp-fe-lol-shared-components").getApi_Viewport(),
                    webComponents: e => e.get("rcp-fe-common-libs").getWebComponents(l),
                    websocket: e => e.getSocket()
                }).then((() => {
                    e.getOptional("rcp-fe-lol-tft-team-planner").then((e => {
                        t.default.TeamPlanner = e
                    }), (() => null))
                })).then((() => {
                    let n = e.get("rcp-fe-lol-l10n").tra().overlay("/fe/lol-l10n/trans.json").overlay("/fe/lol-tft/trans.json").overlay("/fe/lol-loot/trans.json").overlay("/fe/lol-match-history/trans.json").overlay("/fe/lol-parties/trans.json").overlay("/fe/lol-navigation/trans.json").overlay("/fe/lol-tft/trans-troves.json");
                    const s = t.default.emberL10n(t.default.Ember, n);
                    return t.default.add({
                        db: t.default.dataBinding.bindTo(e.getSocket()),
                        EmberAddons: e => e.get("rcp-fe-ember-libs").getSharedEmberAddons(),
                        emberApplicationFactory: e => e.get("rcp-fe-ember-libs").getEmberApplicationFactory(),
                        tra: n,
                        traService: s
                    })
                })).then((function() {
                    const {
                        Viewport: e,
                        navigation: a
                    } = t.default, l = e.getApiKey(s.PLUGIN_NAME), o = e.main().getScreenRoot(l, s.PLUGIN_NAME), i = new(0, n(5).default)(o);
                    i.setupTftApp();
                    return new(0, n(177).default)(i)
                }))
            }))
        }), {
            once: !0
        })
    })()
})();