(() => {
  var e = [
      ,
      (e) => {
        "use strict";
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
        const s = {
          init: function (e, n) {
            return (t = e), this.add(n);
          },
          _getValue: function (e, n) {
            let s;
            return (
              "function" == typeof n
                ? ((s = n(t)),
                  s ||
                    console.warn(
                      "The function for key " + e + " returned a falsy value: ",
                      s,
                    ))
                : "string" == typeof n
                  ? ((s = t.get(n)),
                    s ||
                      console.warn(
                        "The provider `get` invocation for the key " +
                          e +
                          " returned a falsy value: ",
                        s,
                      ))
                  : "object" == typeof n && (s = n),
              s
            );
          },
          add: function (e) {
            e = e || {};
            const t = [],
              n = this;
            return (
              Object.keys(e).forEach(function (s) {
                const a = e[s],
                  o = n._getValue(s, a);
                o && o.then
                  ? (o.then(function (e) {
                      e ||
                        console.warn(
                          "The promise for the key " +
                            s +
                            " resolved with a falsy value: ",
                          e,
                        ),
                        n._addValue(s, e);
                    }),
                    t.push(o))
                  : n._addValue(s, o);
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
        e.exports = s;
      },
      (e, t) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.soundsRoot =
            t.XP_GAIN_STR =
            t.XP_GAIN_SFX_PATH =
            t.XP_BAR_IMAGES_PATH =
            t.TFT_TROVES_ROUTE =
            t.TFT_TEST_ROUTE =
            t.TFT_TELEMETRY_EVENT =
            t.TFT_TEAM_PLANNER_BUTTON_HOVER_SFX_PATH =
            t.TFT_TEAM_PLANNER_BUTTON_DOWN_SFX_PATH =
            t.TFT_TACTICIAN_HOVER_SFX_PATH =
            t.TFT_TACTICIAN_HOVER_LOOP_SFX_PATH =
            t.TFT_STORE_PROMO_HOVER_SFX_PATH =
            t.TFT_STORE_PROMO_CLICK_SFX_PATH =
            t.TFT_ROTATIONAL_SHOP_ROUTE =
            t.TFT_RANKED_QUEUE_TYPE =
            t.TFT_NORMAL_QUEUE_ID =
            t.TFT_NEWS_ROUTE =
            t.TFT_MATCH_HISTORY_ROUTE =
            t.TFT_MAP_ID =
            t.TFT_INDEX_ROUTE =
            t.TFT_HOME_ROUTE =
            t.TFT_GAME_QUEUES_CATEGORY =
            t.TFT_GAME_MODE =
            t.TFT_EVENT_ROUTE =
            t.TFT_BUTTON_HOVER_SFX_PATH =
            t.TFT_BUTTON_CLICK_SFX_PATH =
            t.TFT_BINDING_PATH =
            t.TFT_BATTLE_PASS_ROUTE =
            t.TELEMETRY_TFT_SUB_NAV_CLICKED =
            t.TELEMETRY_TFT_STORE_PROMO_CLICKED =
            t.TELEMETRY_TFT_PASS_UPGRADE_CLICKED =
            t.TELEMETRY_TFT_EVENT_PROMO_CLICKED =
            t.SOUND_UX_CHANNEL =
            t.SETTINGS_PATH =
            t.SECOND_IN_MS =
            t.REWARD_CELEBRATION_V2_NAME =
            t.REWARD_CELEBRATION_NAME =
            t.QUICK_PLAY_HOVER_SFX_PATH =
            t.QUICK_PLAY_CLICK_SFX_PATH =
            t.PLUGIN_NAME =
            t.PCS_TELEMETRY_TABLE =
            t.NORMAL_STR =
            t.MINUTE_IN_MS =
            t.LVL_UP_STR =
            t.LVL_UP_SFX_PATH =
            t.ITEM_PURCHASE_NAME =
            t.INVENTORY_TYPES =
            t.HOUR_IN_MS =
            t.EVENT_DAILY_LOGIN_CELEBRATION_NAME =
            t.DEFAULT_TELEMETRY_TABLE =
            t.DEFAULT_HUB_BACKGROUND_URL =
            t.DAY_IN_MS =
            t.DATABINDING_CATEGORY =
            t.BP_V2_MILESTONE_UPCOMING =
            t.BP_V2_MILESTONE_REWARDABLE =
            t.BP_V2_MILESTONE_COMPLETE =
            t.BP_V2_MILESTONE_CLAIMABLE =
            t.BP_V2_MILESTONE_ACTIVE =
            t.BONUS_STR =
            t.BATTLEPASS_LOTTIE_PATH =
            t.AVAILABLE_XP_SEGMENTS =
            t.AUDIO_CHANNELS =
            t.ANIMATION_SFX_START_DELAY =
              void 0);
        const n = "rcp-fe-lol-tft";
        t.PLUGIN_NAME = n;
        const s = n + "-reward-celebration";
        t.REWARD_CELEBRATION_NAME = s;
        const a = n + "-item-purchase";
        t.ITEM_PURCHASE_NAME = a;
        const o = n + "-reward-celebration-v2";
        t.REWARD_CELEBRATION_V2_NAME = o;
        const l = n + "-event-daily-login-celebration";
        t.EVENT_DAILY_LOGIN_CELEBRATION_NAME = l;
        t.TFT_INDEX_ROUTE = "index";
        t.TFT_HOME_ROUTE = "home";
        t.TFT_BATTLE_PASS_ROUTE = "battle-pass";
        t.TFT_MATCH_HISTORY_ROUTE = "match-history";
        t.TFT_NEWS_ROUTE = "news";
        t.TFT_TEST_ROUTE = "test-page";
        t.TFT_EVENT_ROUTE = "event-page";
        t.TFT_TROVES_ROUTE = "troves";
        t.TFT_ROTATIONAL_SHOP_ROUTE = "rotational-shop";
        t.TFT_RANKED_QUEUE_TYPE = "RANKED_TFT";
        t.TFT_GAME_QUEUES_CATEGORY = "PvP";
        t.TFT_GAME_MODE = "TFT";
        t.TFT_MAP_ID = 22;
        t.TFT_NORMAL_QUEUE_ID = 1090;
        t.SECOND_IN_MS = 1e3;
        t.MINUTE_IN_MS = 6e4;
        const i = 36e5;
        t.HOUR_IN_MS = i;
        t.DAY_IN_MS = 864e5;
        t.BP_V2_MILESTONE_ACTIVE = "ACTIVE";
        t.BP_V2_MILESTONE_UPCOMING = "UPCOMING";
        t.BP_V2_MILESTONE_REWARDABLE = "REWARDABLE";
        t.BP_V2_MILESTONE_CLAIMABLE = "CLAIMABLE";
        t.BP_V2_MILESTONE_COMPLETE = "COMPLETE";
        t.PCS_TELEMETRY_TABLE = "publishing_content";
        t.DEFAULT_HUB_BACKGROUND_URL =
          "fe/lol-tft/images/tft-hub-no-pass-background.jpg";
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
        const r = "/fe/lol-static-assets/sounds";
        t.soundsRoot = r;
        const c = `${r}/sfx-nav-button-play-hover.ogg`;
        t.QUICK_PLAY_HOVER_SFX_PATH = c;
        const m = `${r}/tft-homescreen/sfx-tft-homescreen-button-play-click.ogg.ogg`;
        t.QUICK_PLAY_CLICK_SFX_PATH = m;
        const u = `${r}/sfx-uikit-button-circlegold-hover.ogg`;
        t.TFT_BUTTON_HOVER_SFX_PATH = u;
        const d = `${r}/sfx-uikit-button-circlegold-click.ogg`;
        t.TFT_BUTTON_CLICK_SFX_PATH = d;
        const p = `${r}/sfx-uikit-button-generic-hover.ogg`;
        t.TFT_STORE_PROMO_HOVER_SFX_PATH = p;
        const h = `${r}/sfx-uikit-button-generic-click.ogg`;
        t.TFT_STORE_PROMO_CLICK_SFX_PATH = h;
        const f = `${r}/tft-homescreen/sfx-tft-homescreen-offer-hover-loop.ogg`;
        t.TFT_TACTICIAN_HOVER_LOOP_SFX_PATH = f;
        const g = `${r}/tft-homescreen/sfx-tft-homescreen-offer-hover.ogg`;
        t.TFT_TACTICIAN_HOVER_SFX_PATH = g;
        const _ = `${r}/sfx-uikit-grid-click.ogg`;
        t.TFT_TEAM_PLANNER_BUTTON_DOWN_SFX_PATH = _;
        const v = `${r}/sfx-uikit-button-circlegold-hover.ogg`;
        t.TFT_TEAM_PLANNER_BUTTON_HOVER_SFX_PATH = v;
        t.AUDIO_CHANNELS = {
          SFX_SUB_CHANNEL_UI_NAME: "sfx-ui",
          SFX_SUB_CHANNEL_AMBIENCE_INTERRUPTABLE_NAME:
            "sfx-ambience-interruptable",
        };
        t.DEFAULT_TELEMETRY_TABLE = "rcp-fe-lol-tft";
        t.TELEMETRY_TFT_EVENT_PROMO_CLICKED = "tft-event-promo-clicked";
        t.TELEMETRY_TFT_PASS_UPGRADE_CLICKED =
          "tft-hub-buy-premium-button-clicked";
        t.TELEMETRY_TFT_STORE_PROMO_CLICKED = "tft-store-promo-clicked";
        t.TELEMETRY_TFT_SUB_NAV_CLICKED = "tft-sub-nav-clicked";
        const b = {
          KEY: {
            NAME: "eventName",
            TYPE: "eventType",
            FROM: "eventFrom",
            TIME_SPENT: "timeSpent",
          },
          TYPE: {
            OPEN: "open",
            CLOSE: "close",
            CLICK: "click",
            TIME_SPENT: "time-spent",
          },
          FROM: { EVENT_HUB: "event-hub", EVENT_PASS: "event-pass" },
          format: (e, t, n, s = {}) => ({
            [b.KEY.NAME]: "tft-" + e + "-" + t + "-" + n,
            ...s,
          }),
          formatOpen: (e, t = {}) => b.format(e, b.TYPE.OPEN, e, t),
          formatClose: (e, t = {}) => b.format(e, b.TYPE.CLOSE, e, t),
          formatClick: (e, t, n = {}) => b.format(e, b.TYPE.CLICK, t, n),
          formatTimeSpent: (e, t, n = {}) =>
            b.format(e, b.TYPE.TIME_SPENT, e, { [b.KEY.TIME_SPENT]: t, ...n }),
        };
        t.TFT_TELEMETRY_EVENT = b;
        t.SETTINGS_PATH = "/lol-settings";
        t.TFT_BINDING_PATH = "/v2/account/TFT/";
        t.DATABINDING_CATEGORY = { FIRST_TIME: "VersionsSeen" };
        const E = {
          PRIME_GAMING: "primeGaming",
          TROVES: "troves",
          HEXTECH_CRAFTING: "HEXTECH_CRAFTING",
        };
        t.INVENTORY_TYPES = E;
      },
      (e, t, n) => {
        "use strict";
        n.r(t);
      },
      (e, t, n) => {
        "use strict";
        n.r(t);
      },
      (e, t, n) => {
        "use strict";
        n.r(t);
      },
      (e, t, n) => {
        "use strict";
        n.r(t);
      },
      (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        var s = n(1),
          a = n(2);
        const o = [
          "/fe/lol-tft/videos/claimable-sparkles-free.webm",
          "/fe/lol-tft/videos/claimable-sparkles-premium.webm",
          "/fe/lol-tft/videos/claimable-sparkles-keystone.webm",
          "/fe/lol-tft/videos/background-sparkles.webm",
        ];
        t.default = class {
          constructor(e) {
            (this._screenRoot = e),
              (this._applicationComponentFactory = null),
              (this._appRootElement = null),
              (this._indexModel = null),
              (this._factoryRegistered = !1),
              (this._gameflowPhase = null),
              (this._isInTFTGame = !1),
              (this._showBpNavPip = !1),
              (this._ShownTftEventThisSession = !1);
          }
          registerWithViewPort(e) {
            const t = e.rootElement;
            (this._appRootElement = t),
              this._screenRoot.getElement().appendChild(t),
              this._screenRoot.on("hide", () => {
                const t = e.__container__.lookup("service:tft");
                t
                  ? t.onHide()
                  : s.logger.warning(
                      "Failed to fetch TFT service from TFT Ember app.",
                    ),
                  this._screenRoot.release(),
                  this._screenRoot
                    .getElement()
                    .contains(this._appRootElement) &&
                    (this._screenRoot
                      .getElement()
                      .removeChild(this._appRootElement),
                    e.__container__
                      .lookup("router:main")
                      .transitionTo(a.TFT_INDEX_ROUTE));
              });
          }
          transitionToPage(e, t, n) {
            const o = e.__container__.lookup("router:main");
            t && t.page
              ? o.transitionTo(t.page)
              : n
                ? o.transitionTo(n)
                : o.transitionTo(a.TFT_HOME_ROUTE);
            const l = e.__container__.lookup("service:tft");
            l
              ? l.onShow()
              : s.logger.warning(
                  "Failed to fetch TFT service from TFT Ember app.",
                ),
              this.registerWithViewPort(e);
          }
          show(e) {
            return this._screenRoot.bump().then(
              function () {
                return this._getLandingPage().then(
                  function (t) {
                    return this._getEmberComponentFactoryInstance().then((n) =>
                      n.emberAppInstancePromise.then(
                        (n) => {
                          this.transitionToPage(n, e, t);
                        },
                        (e) =>
                          s.logger.warning(
                            "Failed to fetch Ember app instance.",
                            e,
                          ),
                      ),
                    );
                  }.bind(this),
                );
              }.bind(this),
            );
          }
          setupTftApp() {
            (0, s.dataBinding)("/lol-gameflow", s.socket).observe(
              "/v1/session",
              (e) => {
                this._handleGameflowSession(e);
              },
            ),
              this._setupVideoCache();
          }
          showTroves(e = 1) {
            this.show().then((t) => {
              t.renderPromise.then((t) => {
                const n = t.__container__.lookup("service:tft-troves");
                n
                  ? n.set("trovesV2Enabled", 2 === e)
                  : s.logger.warning(
                      "Failed to fetch TFT service from TFT Ember app",
                    );
                const o = t.__container__.lookup("router:main");
                o
                  ? o.transitionTo(a.TFT_TROVES_ROUTE)
                  : s.logger.warning(
                      "Failed to fetch TFT main router from TFT Ember app",
                    );
              });
            });
          }
          showEventPass() {
            this._getEmberComponentFactoryInstance()
              .then((e) => e.emberAppInstancePromise)
              .then((e) => {
                const t = e.__container__.lookup("controller:event-page");
                t
                  ? t.showEventPass()
                  : s.logger.warning(
                      "Failed to fetch Event Page Controller from TFT Ember app.",
                    );
              });
          }
          setEventsData(e, t) {
            return this._getEmberComponentFactoryInstance()
              .then((e) => e.emberAppInstancePromise)
              .then(
                (n) => {
                  const a = n.__container__.lookup("service:tft");
                  a
                    ? a.setEventsData(e, t)
                    : s.logger.warning(
                        "Failed to fetch TFT service from TFT Ember app.",
                      );
                },
                (e) =>
                  s.logger.warning("Failed to fetch Ember app instance.", e),
              );
          }
          setPromoButtonsData(e, t) {
            return this._getEmberComponentFactoryInstance()
              .then((e) => e.emberAppInstancePromise)
              .then(
                (n) => {
                  const a = n.__container__.lookup("service:tft");
                  a
                    ? a.setPromoButtonsData(e, t)
                    : s.logger.warning(
                        "Failed to fetch TFT service from TFT Ember app.",
                      );
                },
                (e) =>
                  s.logger.warning("Failed to fetch Ember app instance.", e),
              );
          }
          _registerEmberApplicationFactories() {
            this._factoryRegistered ||
              (!(function () {
                const e = {
                    tra: s.traService,
                    ComponentFactory: s.componentFactory,
                    Router: n(8).default,
                    HomeRoute: n(9).default,
                    BattlePassRoute: n(10).default,
                    MatchHistoryRoute: n(11).default,
                    NewsPageRoute: n(14).default,
                    TestPageRoute: n(15).default,
                    EventPageRoute: n(16).default,
                    TrovesRoute: n(17).default,
                    RemainingTimeTextComponent:
                      s.SharedEmberComponents.RemainingTimeTextComponent,
                    CountdownWidgetComponent:
                      s.SharedEmberComponents.CountdownWidgetComponent,
                    TftTimeRemainingWidgetComponent: n(18).default,
                    TftTooltipComponent: n(21).default,
                    TftHubComponent: n(23).default,
                    BattlepassTimelineComponent: n(26).default,
                    BattlepassMilestoneComponent: n(29).default,
                    BattlepassLevelBarComponent: n(32).default,
                    BattlepassInfoComponent: n(35).default,
                    BattlepassUpgradeButtonComponent: n(38).default,
                    BattlepassSelectedRewardDetailsComponent: n(41).default,
                    CallToActionPipComponent:
                      s.SharedEmberComponents.CallToActionPipComponent,
                    ManagedIframeComponent:
                      s.SharedEmberComponents.ManagedIframeComponent,
                    TftSubNavComponent: n(44).default,
                    TftSubNavItemComponent: n(47).default,
                    TftHomeComponent: n(50).default,
                    TftButtonComponent: n(54).default,
                    TftNewsComponent: n(57).default,
                    TftStorePromoComponent: n(60).default,
                    TftPrimePromoComponent: n(64).default,
                    TftTacticianPromoComponent: n(67).default,
                    TftQuickPlayComponent: n(70).default,
                    TftEventPromoComponent: n(73).default,
                    TftHeaderButtonsComponent: n(77).default,
                    TftTestPageComponent: n(81).default,
                    TftEventPageComponent: n(84).default,
                    TftEventHubComponent: n(87).default,
                    TftEventMissionChainComponent: n(95).default,
                    TftEventPassThumbnailComponent: n(98).default,
                    TftEventTrovesThumbnailComponent: n(101).default,
                    TftRadialProgressBarComponent: n(104).default,
                    TftVersionedContainerComponent: n(107).default,
                    TftCustomFlexWrapComponent: n(110).default,
                    TftContentViewportComponent: n(113).default,
                    TftEventDailyLoginThumbnailComponent: n(116).default,
                    TftEventDailyLoginPageComponent: n(119).default,
                    TftEventDailyLoginRewardItemComponent: n(122).default,
                    TftEventTimerComponent: n(125).default,
                    TftEventPlayPanelComponent: n(128).default,
                    TftEventMissionPanelComponent: n(131).default,
                    TftEventHubXsComponent: n(134).default,
                    TftEventHub5YearComponent: n(138).default,
                    TftEventHubFirstTimeFlowComponent: n(142).default,
                    TftMatchSummaryRootComponent: n(145),
                    TftMatchSummaryComponent: n(153),
                    MatchHistoryTooltipComponent: n(156).default,
                    RenderTelemetrySenderComponent:
                      s.SharedEmberComponents.RenderTelemetrySenderComponent,
                    MythicButtonComponent: n(158).default,
                    MythicTokenDialogComponent: n(160).default,
                    PullButtonComponent: n(161).default,
                    PullButtonsContainerComponent: n(162).default,
                    PullErrorDialogComponent: n(163).default,
                    TrovesBannersComponent: n(164).default,
                    TrovesCeremonyComponent: n(165).default,
                    TrovesCeremonyHighlightRewardsComponent: n(166).default,
                    TrovesCeremonyStandardRewardsComponent: n(167).default,
                    ChasedContentComponent: n(168).default,
                    TftTrovesComponent: n(187).default,
                    RewardCardComponent: n(188).default,
                    PortalVideoComponent: n(189).default,
                    TrovesSpriteAnimationComponent: n(190).default,
                    TimeRemainingWidgetComponent: n(191).default,
                    MilestoneRewardsTrackerComponent: n(192).default,
                    RewardCardV2Component: n(194).default,
                    TftTrovesV2Component: n(195).default,
                    TftTrovesV2FirstTimeFlowComponent: n(196).default,
                    TrovesCeremonyMilestoneRewardsComponent: n(198).default,
                    TrovesWalletComponent: n(199).default,
                    RotationalShopGroupedItemsComponent: n(200).default,
                    RotationalShopHeaderComponent: n(201).default,
                    RotationalShopItemComponent: n(202).default,
                    RotationalShopItemDetailSmallComponent: n(203).default,
                    RotationalShopItemDetailComponent: n(204).default,
                    RotationalShopNavComponent: n(205).default,
                    RotationalShopCraftingCeremonyComponent: n(206).default,
                    RotationalShopRedeemButtonComponent: n(207).default,
                    RotationalShopComponent: n(208).default,
                    RotationalShopRoute: n(209).default,
                    RotationalShopController: n(210).default,
                    ApplicationController: n(211).default,
                    BattlePassController: n(212).default,
                    HomeController: n(213).default,
                    MatchHistoryController: n(214).default,
                    NewsController: n(215).default,
                    TrovesController: n(216).default,
                    EventPageController: n(217).default,
                    EqHelper: s.Ember.Helper.helper((e) => e[0] === e[1]),
                    TftService: n(218).default,
                    QueueService: n(221).default,
                    PublishingService: n(222).default,
                    StoreService: n(223).default,
                    TftTrovesService: n(224).default,
                    SummonerService: n(225).default,
                    RotationalShopService: n(226).default,
                    TEMPLATES: {
                      application: n(227),
                      loading: n(228),
                      [a.TFT_INDEX_ROUTE]: n(229),
                      [a.TFT_HOME_ROUTE]: n(230),
                      [a.TFT_NEWS_ROUTE]: n(231),
                      [a.TFT_BATTLE_PASS_ROUTE]: n(232),
                      [a.TFT_MATCH_HISTORY_ROUTE]: n(233),
                      [a.TFT_TEST_ROUTE]: n(234),
                      [a.TFT_EVENT_ROUTE]: n(235),
                      "components/mythic-button": n(236),
                      "components/mythic-token-dialog": n(237),
                      "components/pull-button": n(238),
                      "components/pull-buttons-container": n(239),
                      "components/pull-error-dialog": n(240),
                      "components/item-purchase": n(241),
                      "components/time-remaining-widget": n(242),
                      "components/troves-banners": n(243),
                      "components/troves-ceremony": n(244),
                      "components/troves-ceremony-highlight-rewards": n(245),
                      "components/troves-ceremony-standard-rewards": n(246),
                      "components/chased-content": n(247),
                      "components/tft-troves": n(248),
                      "components/reward-card": n(249),
                      "components/portal-video": n(250),
                      "components/troves-sprite-animation": n(251),
                      troves: n(252),
                      "components/milestone-rewards-tracker": n(253),
                      "components/reward-card-v2": n(254),
                      "components/tft-troves-v2": n(255),
                      "components/tft-troves-v2-first-time-flow": n(256),
                      "components/troves-ceremony-milestone-rewards": n(257),
                      "components/troves-wallet": n(258),
                      "components/rotational-shop-grouped-items": n(259),
                      "components/rotational-shop-header": n(260),
                      "components/rotational-shop-item": n(261),
                      "components/rotational-shop-item-detail-small": n(262),
                      "components/rotational-shop-item-detail": n(263),
                      "components/rotational-shop-nav": n(264),
                      "components/rotational-shop-crafting-ceremony": n(265),
                      "components/rotational-shop-redeem-button": n(266),
                      "components/rotational-shop": n(267),
                      [a.TFT_ROTATIONAL_SHOP_ROUTE]: n(268),
                    },
                  },
                  t = {
                    tra: s.traService,
                    ComponentFactory: s.componentFactory,
                    ItemPurchaseComponent: n(269).default,
                  };
                s.emberApplicationFactory.setFactoryDefinition(
                  a.ITEM_PURCHASE_NAME,
                  t,
                ),
                  s.emberApplicationFactory.setFactoryDefinition(
                    a.PLUGIN_NAME,
                    e,
                    { EMBER_CLI_COMPAT: !0 },
                  );
                const o = {
                  tra: s.traService,
                  ComponentFactory: s.componentFactory,
                  RewardCelebrationComponent: n(270).default,
                };
                s.emberApplicationFactory.setFactoryDefinition(
                  a.REWARD_CELEBRATION_NAME,
                  o,
                );
                const l = {
                  tra: s.traService,
                  ComponentFactory: s.componentFactory,
                  RewardCelebrationComponent: n(273).default,
                };
                s.emberApplicationFactory.setFactoryDefinition(
                  a.REWARD_CELEBRATION_V2_NAME,
                  l,
                );
                const i = {
                  tra: s.traService,
                  ComponentFactory: s.componentFactory,
                  RewardCelebrationComponent: n(276).default,
                  TftEventDailyLoginRewardItemComponent: n(122).default,
                  TftService: n(218).default,
                };
                s.emberApplicationFactory.setFactoryDefinition(
                  a.EVENT_DAILY_LOGIN_CELEBRATION_NAME,
                  i,
                );
              })(),
              (this._factoryRegistered = !0));
          }
          _getEmberComponentFactoryInstance() {
            if (this._applicationComponentFactory) {
              return this._applicationComponentFactory.emberAppInstancePromise
                .then((e) => !(!e.isDestroyed && !e.isDestroying))
                .then(
                  (e) => (
                    e &&
                      (this._registerEmberApplicationFactories(),
                      (this._applicationComponentFactory =
                        s.componentFactory.create(a.PLUGIN_NAME))),
                    this._applicationComponentFactory
                  ),
                );
            }
            return (
              this._registerEmberApplicationFactories(),
              (this._applicationComponentFactory = s.componentFactory.create(
                a.PLUGIN_NAME,
              )),
              Promise.resolve(this._applicationComponentFactory)
            );
          }
          _tryGetHomePage() {
            return (0, s.dataBinding)("/lol-tft")
              .get("/v1/tft/homeHub")
              .then((e) =>
                e.enabled ? a.TFT_HOME_ROUTE : a.TFT_BATTLE_PASS_ROUTE,
              )
              .catch(
                (e) => (
                  s.logger.warning("Failed to fetch TFT Home config", e),
                  a.TFT_BATTLE_PASS_ROUTE
                ),
              );
          }
          _getLandingPage() {
            return (0, s.dataBinding)("/lol-tft")
              .get("/v1/tft/events")
              .then((e) => {
                if (
                  e &&
                  e.subNavTabs &&
                  e.subNavTabs.length &&
                  !this._ShownTftEventThisSession
                ) {
                  e.subNavTabs.length > 1 &&
                    s.logger.error(
                      "Currently only displaying one event in the TFT Hub is supported - received " +
                        e.subNavTabs.length +
                        " events.",
                    );
                  const t = e.subNavTabs[0];
                  if (t.enabled && t.defaultLandingPage)
                    return (
                      (this._ShownTftEventThisSession = !0),
                      {
                        route: a.TFT_EVENT_ROUTE,
                        options: { queryParams: { url: t.url } },
                      }
                    );
                }
                return this._tryGetHomePage();
              })
              .catch(
                (e) => (
                  s.logger.warning("Failed to fetch TFT Event config", e),
                  this._tryGetHomePage()
                ),
              );
          }
          _setupVideoCache() {
            (this.TFTVideoCache = s.VideoCache.createCache("rcp-fe-lol-tft")),
              s.UXSettings.addObserver((e) => {
                this.TFTVideoCache.release(),
                  e &&
                    e.largeAreaAnimationsEnabled &&
                    o.forEach((e) => {
                      this.TFTVideoCache.cache(e);
                    });
              });
          }
          _handleGameflowSession(e) {
            if (!e) return;
            const t = this._gameflowPhase;
            this._gameflowPhase = e.phase;
            const n = [
                "FailedToLaunch",
                "WaitingForStats",
                "EndOfGame",
                "TerminatedInError",
              ],
              o =
                e.gameData &&
                e.gameData.queue &&
                e.gameData.queue.gameMode === a.TFT_GAME_MODE;
            "None" === this._gameflowPhase
              ? (this._isInTFTGame &&
                  n.indexOf(t) > -1 &&
                  s.Router.navigateTo("rcp-fe-lol-tft"),
                (this._isInTFTGame = !1))
              : ["GameStart", "InProgress", "Reconnect"].indexOf(
                    this._gameflowPhase,
                  ) > -1
                ? (this._isInTFTGame = o)
                : n.indexOf(this._gameflowPhase) > -1 &&
                  o &&
                  o &&
                  (0, s.dataBinding)("/lol-settings", s.socket).patch(
                    "/v2/account/LCUPreferences/lol-tft",
                    {
                      data: { lastTftGameQueueId: e.gameData.queue.id },
                      schemaVersion: 1,
                    },
                  ),
              this._isInTFTGame
                ? ((this._tftSettingsObserverEnabled = !0),
                  (0, s.dataBinding)("/lol-settings", s.socket).observe(
                    "/v2/account/LCUPreferences/lol-tft",
                    this,
                    (e) => {
                      e &&
                        ((this._tftSettingsObserverEnabled = !1),
                        (0, s.dataBinding)("/lol-settings", s.socket).unobserve(
                          "/v2/account/LCUPreferences/lol-tft",
                          this,
                        ));
                    },
                  ))
                : this._tftSettingsObserverEnabled &&
                  ((this._tftSettingsObserverEnabled = !1),
                  (0, s.dataBinding)("/lol-settings", s.socket).unobserve(
                    "/v2/account/LCUPreferences/lol-tft",
                    this,
                  ));
          }
        };
      },
      (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        var s = n(1),
          a = n(2);
        const o = s.Ember.Router.extend({ location: "none" });
        o.map(function () {
          this.route(a.TFT_HOME_ROUTE),
            this.route(a.TFT_BATTLE_PASS_ROUTE),
            this.route(a.TFT_TROVES_ROUTE),
            this.route(a.TFT_MATCH_HISTORY_ROUTE),
            this.route(a.TFT_NEWS_ROUTE),
            this.route(a.TFT_TEST_ROUTE),
            this.route(a.TFT_EVENT_ROUTE),
            this.route(a.TFT_ROTATIONAL_SHOP_ROUTE);
        });
        var l = o;
        t.default = l;
      },
      (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
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
                storePromoAssets: t.getStorePromoAssets(),
              });
            },
          });
        t.default = a;
      },
      (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        var s = n(1),
          a = n(2),
          o = s.Ember.Route.extend({
            tftService: s.Ember.inject.service("tft"),
            setupController(e, t) {
              this._super(e, t),
                this.get("tftService").dismissNotification(
                  a.TFT_BATTLE_PASS_ROUTE,
                );
            },
          });
        t.default = o;
      },
      (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        var s = n(1),
          a = n(12),
          o = s.Ember.Route.extend({
            model: () =>
              s.Ember.RSVP.hash({
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
                tftSets: a.tftSets,
              }),
          });
        t.default = o;
      },
      (e, t, n) => {
        "use strict";
        var s = n(1),
          a = n(13);
        const o = s.Ember.Object.extend(
            a.DataBindingMixin,
            a.FixDataBindingMixin,
            {
              champions() {
                return this.retrieveData(
                  "api.gameData",
                  "/assets/v1/champion-summary.json",
                ).then((e) => this._indexEntities(e));
              },
              championsByAlias() {
                return this.retrieveData(
                  "api.gameData",
                  "/assets/v1/champion-summary.json",
                ).then((e) =>
                  e.reduce((e, t) => e.set(t.alias, t), s.Ember.Map.create()),
                );
              },
              tftChampionsByAlias() {
                return this.retrieveData(
                  "api.gameData",
                  "/assets/v1/tftchampions.json",
                ).then((e) =>
                  e.reduce(
                    (e, t) =>
                      t.name
                        ? e.set(t.name.toLowerCase(), t)
                        : e.set(t.character_id.toLowerCase(), t),
                    s.Ember.Map.create(),
                  ),
                );
              },
              tftTraitsById() {
                return this.retrieveData(
                  "api.gameData",
                  "/assets/v1/tfttraits.json",
                ).then((e) =>
                  e.reduce(
                    (e, t) => e.set(t.trait_id.toLowerCase(), t),
                    s.Ember.Map.create(),
                  ),
                );
              },
              tftGameVariationsByAlias() {
                return this.retrieveData(
                  "api.gameData",
                  "/assets/v1/tftgamevariations.json",
                ).then((e) =>
                  e.reduce(
                    (e, t) =>
                      e.set(t.game_variation_decorated_name.toLowerCase(), t),
                    s.Ember.Map.create(),
                  ),
                );
              },
              tftSets() {
                return this.retrieveData(
                  "api.gameData",
                  "/assets/v1/tftsets.json",
                ).then((e) => e.LCTFTModeData.mActiveSets);
              },
              tftDefaultSet() {
                return this.retrieveData(
                  "api.gameData",
                  "/assets/v1/tftsets.json",
                ).then((e) => e.LCTFTModeData.mDefaultSet);
              },
              items() {
                return this.retrieveData(
                  "api.gameData",
                  "/assets/v1/items.json",
                ).then((e) => this._indexEntities(e));
              },
              runes() {
                return this.retrieveData(
                  "api.gameData",
                  "/assets/v1/perks.json",
                ).then(
                  (e) => this._indexEntities(e),
                  () => s.Ember.Map.create(),
                );
              },
              runesStyles() {
                return this.retrieveData(
                  "api.gameData",
                  "/assets/v1/perkstyles.json",
                ).then(
                  (e) =>
                    e.styles
                      ? this._indexEntities(e.styles)
                      : this._indexEntities(e),
                  () => s.Ember.Map.create(),
                );
              },
              maps() {
                return this.retrieveData("api.maps", "/v2/maps").then((e) =>
                  s.Ember.A(e),
                );
              },
              queues() {
                return this.retrieveData("api.queues", "/v1/queues").then((e) =>
                  this._indexEntities(e),
                );
              },
              spells() {
                return this.retrieveData(
                  "api.gameData",
                  "/assets/v1/summoner-spells.json",
                ).then((e) => this._indexEntities(e));
              },
              augments() {
                return this.retrieveData(
                  "api.gameData",
                  "/assets/v1/cherry-augments.json",
                ).then((e) => this._indexEntities(e));
              },
              tftItems() {
                return this.retrieveData(
                  "api.gameData",
                  "/assets/v1/tftitems.json",
                ).then((e) => this._indexEntities(e));
              },
              tftItemsByName() {
                return this.retrieveData(
                  "api.gameData",
                  "/assets/v1/tftitems.json",
                ).then((e) => this._indexEntitiesByName(e));
              },
              _indexEntitiesByName: (e) =>
                s.Ember.isArray(e)
                  ? e.reduce((e, t) => e.set(t.nameId, t), s.Ember.Map.create())
                  : s.Ember.Map.create(),
              _indexEntities: (e) =>
                s.Ember.isArray(e)
                  ? e.reduce((e, t) => e.set(t.id, t), s.Ember.Map.create())
                  : s.Ember.Map.create(),
            },
          ),
          l = o.create();
        e.exports = {
          MapsAndGameData: o,
          augments: l.augments(),
          champions: l.champions(),
          items: l.items(),
          maps: l.maps(),
          queues: l.queues(),
          runes: l.runes(),
          runesStyles: l.runesStyles(),
          spells: l.spells(),
          tftItems: l.tftItems(),
          tftItemsByName: l.tftItemsByName(),
          championsByAlias: l.championsByAlias(),
          tftChampionsByAlias: l.tftChampionsByAlias(),
          tftTraitsById: l.tftTraitsById(),
          tftGameVariationsByAlias: l.tftGameVariationsByAlias(),
          tftSets: l.tftSets(),
          tftDefaultSet: l.tftDefaultSet(),
          CUSTOM_GAME_TYPE: "CUSTOM_GAME",
          DEFAULT_MAP_ID: 11,
        };
      },
      (e, t, n) => {
        "use strict";
        var s = n(1);
        const a = (0, s.EmberDataBinding)({
            Ember: s.Ember,
            websocket: (0, s.getProvider)().getSocket(),
            logPrefix: "rcp-fe-lol-match-history:mixins:data-binding",
            basePaths: {
              championMastery: "/lol-champion-mastery",
              gameData: "/lol-game-data",
              login: "/lol-login",
              maps: "/lol-maps",
              matchHistory: "/lol-match-history",
              platformConfig: "/lol-platform-config",
              summoner: "/lol-summoner",
              chat: "/lol-chat",
              settings: "/lol-settings",
              queues: "/lol-game-queues",
              cosmetics: "/lol-cosmetics",
            },
            boundProperties: {
              matchHistoryWebURL: { api: "matchHistory", path: "/v1/web-url" },
              platformConfig: { api: "platformConfig", path: "/v1/namespaces" },
              session: { api: "login", path: "/v1/session" },
              myMasteries: {
                api: "championMastery",
                path: "/v1/local-player/champion-mastery",
              },
              mySummoner: {
                api: "summoner",
                path: "/v1/summoners/{{session.summonerId}}",
              },
              targetMasteries: {
                api: "championMastery",
                path: "/v1/{{puuid}}/champion-mastery",
              },
              targetSummoner: {
                api: "summoner",
                path: "/v1/summoners/{{summonerId}}",
              },
              blockedPlayers: { api: "chat", path: "/v1/blocked-players" },
              friends: { api: "chat", path: "/v1/friends" },
              lowSpecModeSettings: {
                api: "settings",
                path: "/v2/local/lol-user-experience",
              },
              companions: {
                api: "cosmetics",
                path: "/v1/inventories/tft/companions",
              },
            },
          }),
          o = s.Ember.Mixin.create({
            retrieveData(e, t, n) {
              return this.get(e)
                .get(t, n)
                .then((e) => (e ? Promise.resolve(e) : Promise.reject(void 0)));
            },
          });
        e.exports = { FixDataBindingMixin: o, DataBindingMixin: a };
      },
      (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        var s = n(1).Ember.Route;
        t.default = s;
      },
      (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        var s = n(1).Ember.Route;
        t.default = s;
      },
      (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        var s = n(1),
          a = s.Ember.Route.extend({
            tftService: s.Ember.inject.service("tft"),
            setupController(e, t) {
              this._super(e, t), s.Ember.set(e, "displayEventPass", !1);
            },
            afterModel() {
              this.get("tftService").setMissionOverrideSeries(
                "TFT_Event_Series",
              );
            },
            actions: {
              willTransition: function (e) {
                this.get("tftService").setMissionOverrideSeries("");
              },
            },
          });
        t.default = a;
      },
      (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        var s = n(1).Ember.Route.extend({});
        t.default = s;
      },
      (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        var s = n(1),
          a = n(2),
          o = s.Ember.Component.extend({
            classNames: [`${a.PLUGIN_NAME}-time-remaining-widget`],
            layout: n(19),
            style: n(20),
            tftService: s.Ember.inject.service("tft"),
            eventsData: s.Ember.computed.alias("tftService.eventsData"),
            promoButtonsData: s.Ember.computed.alias(
              "tftService.promoButtonsData",
            ),
            eventName: s.Ember.computed("eventsData", function () {
              const e = this.get("eventsData");
              let t = "INVALID";
              return (
                e &&
                  Array.isArray(e) &&
                  (e.length > 1
                    ? s.logger.error(
                        "Currently only displaying one event timer in the TFT Hub is supported - received " +
                          e.length +
                          " events.",
                      )
                    : 1 === e.length &&
                      (t = s.tra.get(e[0].titleTranslationKey))),
                t
              );
            }),
            startDate: s.Ember.computed("eventsData", function () {
              const e = this.get("eventsData");
              let t = "INVALID";
              return (
                e &&
                  Array.isArray(e) &&
                  (e.length > 1
                    ? s.logger.error(
                        "Currently only displaying one event timer in the TFT Hub is supported - received " +
                          e.length +
                          " events.",
                      )
                    : 1 === e.length && (t = e[0].startDate)),
                t
              );
            }),
            endDate: s.Ember.computed("eventsData", function () {
              const e = this.get("eventsData");
              let t = "INVALID";
              return (
                e &&
                  Array.isArray(e) &&
                  (e.length > 1
                    ? s.logger.error(
                        "Currently only displaying one event timer in the TFT Hub is supported - received " +
                          e.length +
                          " events.",
                      )
                    : 1 === e.length && (t = e[0].endDate)),
                t
              );
            }),
            eventEnabled: s.Ember.computed("eventsData", function () {
              const e = this.get("eventsData");
              let t = !1;
              return (
                e &&
                  Array.isArray(e) &&
                  (e.length > 1
                    ? s.logger.error(
                        "Currently only displaying one event timer in the TFT Hub is supported - received " +
                          e.length +
                          " events.",
                      )
                    : 1 === e.length && (t = e[0].enabled)),
                t
              );
            }),
            preEventEnabled: s.Ember.computed("eventEnabled", function () {
              return !this.get("eventEnabled");
            }),
            showWhileEventActive: s.Ember.computed(
              "promoButtonsData",
              function () {
                const e = this.get("promoButtonsData");
                let t = !0;
                return (
                  e &&
                    Array.isArray(e) &&
                    (e.length > 1
                      ? s.logger.error(
                          "Currently only displaying one event timer in the TFT Hub is supported - received " +
                            e.length +
                            " event promo.",
                        )
                      : 1 === e.length && (t = e[0].showTimerWhileEventActive)),
                  t
                );
              },
            ),
          });
        t.default = o;
      },
      (e, t, n) => {
        const s = n(1).Ember;
        e.exports = s.HTMLBars.template({
          id: "YDlwgDlx",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-tft\\\\src\\\\app\\\\components\\\\tft-time-remaining-widget\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-tft\\\\src\\\\app\\\\components\\\\tft-time-remaining-widget\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-tft\\\\src\\\\app\\\\components\\\\tft-time-remaining-widget\\\\index.js\\" "],["text","\\n"],["block",["if"],[["get",["showWhileEventActive"]]],null,1,0]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","  "],["append",["helper",["countdown-widget"],null,[["startDate","endDate","preCountdownEnabled","countdownEnabled","hidePreCountdownAfterStartDate","startingSoonText","startingText","startingWrappingText","startingLongTimeText"],[["get",["startDate"]],["get",["endDate"]],["get",["preEventEnabled"]],false,false,["get",["tra","tft_event_almost_starting"]],["get",["tra","tft_event_almost_starting"]],["get",["tra","tft_event_time_until_start"]],""]]],false],["text","\\n"]],"locals":[]},{"statements":[["text","  "],["append",["helper",["countdown-widget"],null,[["startDate","endDate","preCountdownEnabled","countdownEnabled","requireStartDateToTransition","hidePreCountdownAfterStartDate","hideCountdownAfterEndDate","startingSoonText","startingText","startingWrappingText","startingLongTimeText","endingSoonText","endingText","endingWrappingText","endingLongTimeText"],[["get",["startDate"]],["get",["endDate"]],true,["get",["eventEnabled"]],false,false,false,["get",["tra","tft_event_almost_starting"]],["get",["tra","tft_event_almost_starting"]],["get",["tra","tft_event_time_until_start"]],"",["get",["tra","tft_event_almost_ending"]],["get",["tra","tft_event_almost_ending"]],["get",["tra","tft_event_time_until_end"]],""]]],false],["text","\\n"]],"locals":[]}],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, n) => {
        "use strict";
        n.r(t);
      },
      (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        var s = n(1),
          a = n(2);
        const o = s.UIKit.getTooltipManager(),
          l = {
            targetAnchor: { x: "center", y: "top" },
            tooltipAnchor: { x: "center", y: "bottom" },
            tooltipDirection: "top",
          };
        var i = s.Ember.Component.extend({
          classNames: [`${a.PLUGIN_NAME}-tft-tooltip`],
          layout: n(22),
          toolTipAttached: !1,
          tooltipOptions: s.Ember.computed(
            "targetAnchor",
            "tooltipAnchor",
            "tooltipDirection",
            function () {
              return {
                targetAnchor: this.get("targetAnchor") || l.targetAnchor,
                tooltipAnchor: this.get("tooltipAnchor") || l.tooltipAnchor,
                tooltipDirection:
                  this.get("tooltipDirection") || l.tooltipDirection,
              };
            },
          ),
          tooltipSetup() {
            const e = this.toolTipAttached;
            if (
              ((this.tooltipHoverElement = this.element.parentElement),
              !e && this.tooltipHoverElement)
            ) {
              const e = this.get("tooltipId");
              (this.tooltipElement = this.element.querySelector(
                `#tft-tooltip-${e}`,
              )),
                this.attachTooltip(),
                (this.toolTipAttached = !0);
            }
          },
          didInsertElement() {
            this._super(...arguments), this.tooltipSetup();
          },
          willDestroyElement() {
            this.detachTooltip(), this._super(...arguments);
          },
          attachTooltip: function () {
            o.assign(
              this.tooltipHoverElement,
              this.tooltipElement,
              null,
              this.get("tooltipOptions"),
            );
          },
          detachTooltip: function () {
            o.unassign(this.tooltipHoverElement);
          },
        });
        t.default = i;
      },
      (e, t, n) => {
        const s = n(1).Ember;
        e.exports = s.HTMLBars.template({
          id: "sngKakyU",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-tft\\\\src\\\\app\\\\components\\\\tft-tooltip\\\\layout.hbs\\" style-path=\\"null\\" js-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-tft\\\\src\\\\app\\\\components\\\\tft-tooltip\\\\index.js\\" "],["text","\\n"],["open-element","lol-uikit-tooltip",[]],["dynamic-attr","id",["concat",["tft-tooltip-",["unknown",["tooltipId"]]]]],["flush-element"],["text","\\n  "],["yield","default"],["text","\\n"],["close-element"],["text","\\n"]],"locals":[],"named":[],"yields":["default"],"blocks":[],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        var s = n(1),
          a = n(2);
        n(24);
        var o = s.Ember.Component.extend({
          classNames: [`${a.PLUGIN_NAME}-hub`],
          layout: n(25),
          _selectedMilestoneId: null,
          title: s.Ember.computed(
            "playerHasPremium",
            "battlePass.info.title",
            "battlePass.info.premiumTitle",
            function () {
              const e = this.get("playerHasPremium"),
                t = this.get("battlePass.info.title"),
                n = this.get("battlePass.info.premiumTitle");
              return !0 === e && n ? n : t;
            },
          ),
          pcPurchaseRequirement: s.Ember.computed.alias(
            "battlePass.info.pcPurchaseRequirement",
          ),
          isBattlePassEnabled: !1,
          waitingForPass: s.Ember.computed.equal("battlePass", null),
          passExpired: s.Ember.computed.empty("battlePass.milestones"),
          showSpinner: s.Ember.computed.and(
            "waitingForPass",
            "isBattlePassEnabled",
          ),
          milestones: s.Ember.computed(
            "battlePass.milestones.@each.{milestoneId,isLocked,pointsEarnedForMilestone}",
            function () {
              return s.Ember.A(Array.from(this.get("battlePass.milestones")));
            },
          ),
          bonuses: s.Ember.computed(
            "battlePass.bonuses.@each.{milestoneId,isLocked,pointsEarnedForMilestone}",
            function () {
              return s.Ember.A(Array.from(this.get("battlePass.bonuses")));
            },
          ),
          hasBonuses: s.Ember.computed.notEmpty("bonuses"),
          playerHasPremium: s.Ember.computed.alias("battlePass.info.premium"),
          passEndDate: s.Ember.computed.alias("battlePass.info.endDate"),
          activeMilestone: s.Ember.computed.alias("battlePass.activeMilestone"),
          lastViewedMilestone: s.Ember.computed.alias(
            "battlePass.lastViewedMilestone",
          ),
          lastMainMilestone: s.Ember.computed.alias("milestones.lastObject"),
          lastBonusMilestone: s.Ember.computed.alias("bonuses.lastObject"),
          isMainMilestonesComplete: s.Ember.computed(
            "lastMainMilestone.status",
            function () {
              const e = this.get("lastMainMilestone.status");
              return (
                e === a.BP_V2_MILESTONE_REWARDABLE ||
                e === a.BP_V2_MILESTONE_CLAIMABLE ||
                e === a.BP_V2_MILESTONE_COMPLETE
              );
            },
          ),
          isBonusMilestonesComplete: s.Ember.computed(
            "lastBonusMilestone.status",
            function () {
              const e = this.get("lastBonusMilestone.status");
              return (
                e === a.BP_V2_MILESTONE_REWARDABLE ||
                e === a.BP_V2_MILESTONE_CLAIMABLE ||
                e === a.BP_V2_MILESTONE_COMPLETE
              );
            },
          ),
          isPassComplete: s.Ember.computed(
            "hasBonuses",
            "isMainMilestonesComplete",
            "isBonusMilestonesComplete",
            function () {
              return this.get("hasBonuses")
                ? this.get("isBonusMilestonesComplete")
                : this.get("isMainMilestonesComplete");
            },
          ),
          selectedMilestone: s.Ember.computed(
            "_selectedMilestoneId",
            "milestones",
            "bonuses",
            "activeMilestone",
            function () {
              const e = this.get("_selectedMilestoneId"),
                t = this.get("milestones").findBy("milestoneId", e),
                n = this.get("bonuses").findBy("milestoneId", e),
                s = this.get("activeMilestone");
              return t || n || s;
            },
          ),
          selectedPassRewardIsLastMainMilestone: s.Ember.computed(
            "selectedMilestone.milestoneId",
            "lastMainMilestone.milestoneId",
            function () {
              return (
                this.get("lastMainMilestone.milestoneId") ===
                this.get("selectedMilestone.milestoneId")
              );
            },
          ),
          currentTimeMetronome: s.Ember.on("init", function () {
            const e = this.get("passEndDate") - Date.now(),
              t = Math.floor(e / a.DAY_IN_MS);
            let n = a.MINUTE_IN_MS / 2;
            t > 0 && (n = 6 * a.HOUR_IN_MS),
              s.Ember.run.later(
                this,
                function () {
                  this.notifyPropertyChange("passEndDate"),
                    this.currentTimeMetronome();
                },
                n,
              );
          }),
          battlePassFooter: s.Ember.computed.alias(
            "battlePass.info.media.battlepass-footer-bg",
          ),
          totalPointsEarned: s.Ember.computed.alias(
            "battlePass.totalPointsEarned",
          ),
          isClaimAllEnabled: !1,
          backButtonAction: function () {},
          backButtonEnabled: !1,
          battlePass: null,
          backgrounds: null,
          celebratePassCompletionFunc: function (e) {},
          claimRewardsFunc: function (e, t) {},
          claimAllRewardsFunc: function (e) {},
          disableClaimButton: !1,
          isBattlePassXPBoosted: !1,
          media: null,
          actions: {
            openLoot() {
              s.Router.navigateTo("rcp-fe-lol-loot");
            },
            handleRewardSelected(e) {
              this.set("_selectedMilestoneId", e.milestoneId);
            },
            claimAll() {
              const e = this.get("battlePass.info.passId");
              this.get("claimAllRewardsFunc")(e).finally(() => {});
            },
          },
        });
        t.default = o;
      },
      (e, t, n) => {
        "use strict";
        n.r(t);
      },
      (e, t, n) => {
        const s = n(1).Ember;
        e.exports = s.HTMLBars.template({
          id: "+7K7wb9B",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-tft\\\\src\\\\app\\\\components\\\\tft-hub\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-tft\\\\src\\\\app\\\\components\\\\tft-hub\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-tft\\\\src\\\\app\\\\components\\\\tft-hub\\\\index.js\\" "],["text","\\n"],["block",["if"],[["get",["showSpinner"]]],null,4,3]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","        "],["open-element","lol-uikit-flat-button",[]],["dynamic-attr","onclick",["helper",["action"],[["get",[null]],["get",["backButtonAction"]]],null],null],["flush-element"],["append",["unknown",["tra","battlepass_back"]],false],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","    "],["open-element","div",[]],["static-attr","class","top"],["flush-element"],["text","\\n"],["block",["if"],[["get",["backButtonEnabled"]]],null,0],["text","    "],["close-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","middle"],["flush-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","column-left"],["flush-element"],["text","\\n        "],["append",["helper",["battlepass-info"],null,[["class","title","passEndDate","isBattlePassXPBoosted"],["pass-info",["get",["title"]],["get",["passEndDate"]],["get",["isBattlePassXPBoosted"]]]]],false],["text","\\n        "],["append",["helper",["battlepass-level-bar"],null,[["class","activeMilestone","lastViewedMilestone","lastMainMilestone","playerHasPremium","isPassComplete"],["pass-level-bar",["get",["activeMilestone"]],["get",["lastViewedMilestone"]],["get",["lastMainMilestone"]],["get",["playerHasPremium"]],["get",["isPassComplete"]]]]],false],["text","\\n        "],["append",["helper",["battlepass-upgrade-button"],null,[["class","playerHasPremium","pcPurchaseRequirement"],["pass-upgrade-button",["get",["playerHasPremium"]],["get",["pcPurchaseRequirement"]]]]],false],["text","\\n      "],["close-element"],["text","\\n\\n      "],["open-element","div",[]],["static-attr","class","column-right"],["flush-element"],["text","\\n        "],["append",["helper",["battlepass-selected-reward-details"],null,[["class","rewardInfo","isLastRewardInMainBattlepass","claimRewardsFunc","celebratePassCompletionFunc","backgrounds","disableClaimButton","passId"],["pass-reward-details",["get",["selectedMilestone"]],["get",["selectedPassRewardIsLastMainMilestone"]],["get",["claimRewardsFunc"]],["get",["celebratePassCompletionFunc"]],["get",["backgrounds"]],["get",["disableClaimButton"]],["get",["battlePass","info","passId"]]]]],false],["text","\\n      "],["close-element"],["text","\\n    "],["close-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","tft-hub-footer-bg"],["dynamic-attr","style",["concat",["background-image: url(",["unknown",["battlePassFooter"]],")"]]],["flush-element"],["text","\\n    "],["close-element"],["text","\\n\\n    "],["append",["helper",["battlepass-timeline"],null,[["class","milestones","bonusMilestones","isPassComplete","isMainMilestonesComplete","genericAssets","rewardSelected","activeMilestone","media","totalPointsEarned"],["battlepass-timeline",["get",["milestones"]],["get",["bonuses"]],["get",["isPassComplete"]],["get",["isMainMilestonesComplete"]],["get",["genericAssets"]],["helper",["action"],[["get",[null]],"handleRewardSelected"],null],["get",["battlePass","activeMilestone"]],["get",["media"]],["get",["battlePass","totalPointsEarned"]]]]],false],["text","\\n"]],"locals":[]},{"statements":[["text","    "],["open-element","div",[]],["static-attr","class","pass-expired"],["flush-element"],["append",["unknown",["tra","battlepass_expired"]],false],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["block",["if"],[["get",["passExpired"]]],null,2,1],["text","\\n"]],"locals":[]},{"statements":[["text","  "],["open-element","div",[]],["static-attr","class","spinner-container"],["flush-element"],["text","\\n    "],["append",["helper",["uikit-spinner"],null,[["width","height"],["50px","50px"]]],false],["text","\\n  "],["close-element"],["text","\\n"]],"locals":[]}],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        var s = n(1),
          a = n(2);
        n(27);
        var o = s.Ember.Component.extend({
          didRender() {
            this._super(...arguments),
              this.get("milestoneChanged") &&
                (this._handleMilestoneSelected(this.get("selectedMilestone")),
                this.set("milestoneChanged", !1));
          },
          classNames: [`${a.PLUGIN_NAME}-battlepass-timeline`],
          layout: n(28),
          milestoneChanged: !0,
          activeMilestone: null,
          bonusMilestones: null,
          isPassComplete: !1,
          isMainMilestonesComplete: !1,
          genericAssets: null,
          media: null,
          milestones: null,
          totalPointsEarned: 0,
          selectedMilestone: s.Ember.computed(
            "_selectedMilestone",
            "activeMilestone",
            "milestones.lastObject",
            "bonusMilestones.lastObject",
            function () {
              const e = this.get("_selectedMilestone"),
                t = this.get("activeMilestone"),
                n = this.get("milestones.lastObject"),
                s = this.get("bonusMilestones.lastObject");
              return e || (t.milestoneId ? t : s || n);
            },
          ),
          passEndMarkerDottedImage: s.Ember.computed("media", function () {
            return this.get("media.dotted-line");
          }),
          passEndMarkerCircleImage: s.Ember.computed("media", function () {
            return this.get("media.gold-circle");
          }),
          hasBonusMilestones: s.Ember.computed.notEmpty("bonusMilestones"),
          _find(e) {
            return this.element.querySelector(e);
          },
          scrollToCenterMilestone(e) {
            const t = this._find(`#id-${e.milestoneId}`);
            if (t) {
              const e = this._find("lol-uikit-scrollable").offsetWidth,
                n = t.offsetLeft - (e - t.offsetWidth) / 2;
              this._scrollTo(Math.ceil(n, 0));
            }
          },
          _scrollTo(e) {
            this._find("lol-uikit-scrollable").scrollTo({
              top: 0,
              left: e,
              behavior: "smooth",
            });
          },
          _handleMilestoneSelected(e) {
            this.set("_selectedMilestone", e),
              this.sendAction("rewardSelected", e),
              this.scrollToCenterMilestone(e);
          },
          actions: {
            handleMilestoneSelected(e) {
              this.set("milestoneChanged", !0),
                this._handleMilestoneSelected(e);
            },
          },
        });
        t.default = o;
      },
      (e, t, n) => {
        "use strict";
        n.r(t);
      },
      (e, t, n) => {
        const s = n(1).Ember;
        e.exports = s.HTMLBars.template({
          id: "fa5YrUwW",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-tft\\\\src\\\\app\\\\components\\\\battlepass-timeline\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-tft\\\\src\\\\app\\\\components\\\\battlepass-timeline\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-tft\\\\src\\\\app\\\\components\\\\battlepass-timeline\\\\index.js\\" "],["text","\\n"],["open-element","lol-uikit-scrollable",[]],["static-attr","class","milestones"],["static-attr","direction","horizontal"],["static-attr","overflow-masks","enabled"],["static-attr","show-on-hover","false"],["static-attr","side-scroll-wheel",""],["flush-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","main-milestones"],["flush-element"],["text","\\n"],["block",["each"],[["get",["milestones"]]],null,3],["text","  "],["close-element"],["text","\\n"],["block",["if"],[["get",["hasBonusMilestones"]]],null,2],["text","  "],["open-element","div",[]],["dynamic-attr","class",["concat",["bonus-milestones ",["helper",["unless"],[["get",["isMainMilestonesComplete"]],"dimmed"],null]]]],["flush-element"],["text","\\n"],["block",["each"],[["get",["bonusMilestones"]]],null,0],["text","  "],["close-element"],["text","\\n"],["close-element"],["text","\\n"]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","      "],["append",["helper",["battlepass-milestone"],null,[["media","milestone","currentlyActiveMilestoneId","currentlySelectedMilestoneId","displayIndex","click"],[["get",["media"]],["get",["bonusMilestone"]],["get",["activeMilestone","milestoneId"]],["get",["selectedMilestone","milestoneId"]],["get",["index"]],["helper",["action"],[["get",[null]],"handleMilestoneSelected",["get",["bonusMilestone"]]],null]]]],false],["text","\\n"]],"locals":["bonusMilestone","index"]},{"statements":[["text","          "],["open-element","lol-uikit-content-block",[]],["static-attr","type","tooltip-small"],["flush-element"],["text","\\n            "],["open-element","p",[]],["flush-element"],["append",["unknown",["tra","battlepass_end_of_pass"]],false],["close-element"],["text","\\n          "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","  "],["open-element","div",[]],["static-attr","class","main-milestones-end-marker"],["flush-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","main-milestones-end-marker"],["flush-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","dotted-line"],["dynamic-attr","style",["concat",["--pass-end-marker-dotted-image: url(\'",["unknown",["passEndMarkerDottedImage"]],"\');"]]],["flush-element"],["close-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","circle"],["dynamic-attr","style",["concat",["--pass-end-marker-circle-image: url(\'",["unknown",["passEndMarkerCircleImage"]],"\');"]]],["flush-element"],["text","\\n"],["block",["tft-tooltip"],null,[["tooltipId"],["pass-details"]],1],["text","      "],["close-element"],["text","\\n    "],["close-element"],["text","\\n  "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","      "],["append",["helper",["battlepass-milestone"],null,[["media","totalPointsEarned","milestone","currentlyActiveMilestoneId","currentlySelectedMilestoneId","displayIndex","click"],[["get",["media"]],["get",["totalPointsEarned"]],["get",["milestone"]],["get",["activeMilestone","milestoneId"]],["get",["selectedMilestone","milestoneId"]],["get",["index"]],["helper",["action"],[["get",[null]],"handleMilestoneSelected",["get",["milestone"]]],null]]]],false],["text","\\n"]],"locals":["milestone","index"]}],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        var s = n(1),
          a = n(2);
        n(30);
        var o = s.Ember.Component.extend({
          didRender() {
            this._super(...arguments);
          },
          mouseDown() {
            !this.get("isLocked") && this.get("isRewardable")
              ? s.Audio.getChannel("sfx-ui").playSound(
                  "/fe/lol-static-assets/sounds/sfx-uikit-grid-click.ogg",
                )
              : s.Audio.getChannel("sfx-ui").playSound(
                  "/fe/lol-static-assets/sounds/sfx-battlepass-icon-locked-button-click.ogg",
                );
          },
          mouseUp() {
            !this.get("isLocked") &&
              this.get("isRewardable") &&
              s.Audio.getChannel("sfx-ui").playSound(
                "/fe/lol-static-assets/sounds/sfx-uikit-grid-click-release.ogg",
              );
          },
          classNames: [`${a.PLUGIN_NAME}-battlepass-milestone`],
          layout: n(31),
          currentlySelectedMilestoneId: "",
          currentlyActiveMilestoneId: "",
          displayIndex: 0,
          media: null,
          milestone: null,
          totalPointsEarned: 0,
          showProgressionTracker: !0,
          showTooltip: !0,
          milestoneId: s.Ember.computed.alias("milestone.milestoneId"),
          first: s.Ember.computed.equal("displayIndex", 0),
          rewards: s.Ember.computed.alias("milestone.rewards"),
          title: s.Ember.computed.alias("milestone.title"),
          description: s.Ember.computed.alias("milestone.description"),
          requiredXPValue: s.Ember.computed(
            "totalPointsEarned",
            "milestone.totalPointsForMilestone",
            function () {
              const e = this.get("totalPointsEarned");
              return this.get("milestone.totalPointsForMilestone") - e;
            },
          ),
          hasRequiredXP: s.Ember.computed.lte("requiredXPValue", 0),
          requiredXPText: s.Ember.computed("requiredXPValue", function () {
            return this.get("tra").formatString(
              "battlepass_milestone_exp_required",
              { amount_required: this.get("requiredXPValue") },
            );
          }),
          isPaid: s.Ember.computed.alias("milestone.isPaid"),
          isKeystone: s.Ember.computed.alias("milestone.isKeystone"),
          isBonus: s.Ember.computed.alias("milestone.isBonus"),
          isLocked: s.Ember.computed.alias("milestone.isLocked"),
          isLockedAndPaid: s.Ember.computed.and("isLocked", "isPaid"),
          isRewardable: s.Ember.computed.equal(
            "milestone.status",
            a.BP_V2_MILESTONE_REWARDABLE,
          ),
          isClaimable: s.Ember.computed.equal(
            "milestone.status",
            a.BP_V2_MILESTONE_CLAIMABLE,
          ),
          isClaimed: s.Ember.computed.equal(
            "milestone.status",
            a.BP_V2_MILESTONE_COMPLETE,
          ),
          isSelected: s.Ember.computed(
            "milestone.milestoneId",
            "currentlySelectedMilestoneId",
            function () {
              return (
                this.get("milestone.milestoneId") ===
                this.get("currentlySelectedMilestoneId")
              );
            },
          ),
          isActive: s.Ember.computed(
            "milestone.milestoneId",
            "currentlyActiveMilestoneId",
            function () {
              return (
                this.get("milestone.milestoneId") ===
                this.get("currentlyActiveMilestoneId")
              );
            },
          ),
          isPast: s.Ember.computed.or(
            "isClaimed",
            "isRewardable",
            "isClaimable",
          ),
          progress: s.Ember.computed(
            "milestone.status",
            "milestone.pointsEarnedForMilestone",
            "milestone.pointsNeededForMilestone",
            function () {
              if (
                this.get("milestone.status") === a.BP_V2_MILESTONE_REWARDABLE ||
                this.get("milestone.status") === a.BP_V2_MILESTONE_CLAIMABLE ||
                this.get("milestone.status") === a.BP_V2_MILESTONE_COMPLETE
              )
                return 100;
              const e = this.get("milestone.pointsEarnedForMilestone"),
                t = this.get("milestone.pointsNeededForMilestone");
              return 0 === e ? 0 : Math.ceil((100 * e) / t);
            },
          ),
          rewardBackgroundImage: s.Ember.computed("media", function () {
            return this.get("media.reward-background");
          }),
          rewardFrameImageTag: s.Ember.computed(
            "milestone.isPaid",
            "milestone.isKeystone",
            "milestone.isLocked",
            "isClaimable",
            "isClaimed",
            function () {
              const e = this.get("milestone.isPaid"),
                t = this.get("milestone.isKeystone"),
                n = e ? (t ? "keystone" : "premium") : "free",
                s = this.get("milestone.isLocked"),
                a = this.get("isClaimable"),
                o = this.get("isClaimed");
              return `reward-frame--${n}-${s ? "locked" : a ? "claimable" : o ? "claimed" : "available"}`;
            },
          ),
          rewardFrameImage: s.Ember.computed(
            "rewardFrameImageTag",
            "media",
            function () {
              return this.get(`media.${this.get("rewardFrameImageTag")}`);
            },
          ),
          rewardFrameImageHover: s.Ember.computed(
            "rewardFrameImageTag",
            "media",
            function () {
              return this.get(`media.${this.get("rewardFrameImageTag")}-hover`);
            },
          ),
          levelPipImageTag: s.Ember.computed(
            "isActive",
            "isUpcoming",
            "isPast",
            function () {
              const e = this.get("isActive"),
                t = this.get("isPast"),
                n = this.get("isBonus");
              return e
                ? "level-pip--active"
                : t
                  ? n
                    ? "level-pip--bonus"
                    : "level-pip--complete"
                  : "level-pip--upcoming";
            },
          ),
          levelPipImage: s.Ember.computed("levelPipImageTag", function () {
            return this.get(`media.${this.get("levelPipImageTag")}`);
          }),
          levelPipImageHover: s.Ember.computed("levelPipImageTag", function () {
            this.get("media");
            return this.get(`media.${this.get("levelPipImageTag")}-hover`);
          }),
          selectedImage: s.Ember.computed("isSelected", function () {
            return this.get("media.selection-highlight");
          }),
        });
        t.default = o;
      },
      (e, t, n) => {
        "use strict";
        n.r(t);
      },
      (e, t, n) => {
        const s = n(1).Ember;
        e.exports = s.HTMLBars.template({
          id: "Y2o889VK",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-tft\\\\src\\\\app\\\\components\\\\battlepass-milestone\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-tft\\\\src\\\\app\\\\components\\\\battlepass-milestone\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-tft\\\\src\\\\app\\\\components\\\\battlepass-milestone\\\\index.js\\" "],["text","\\n"],["open-element","div",[]],["dynamic-attr","id",["concat",["id-",["unknown",["milestoneId"]]]]],["dynamic-attr","class",["concat",["milestone ",["helper",["if"],[["get",["isSmall"]],"small"],null]]]],["dynamic-attr","data-milestone-id",["unknown",["milestoneCssId"]],null],["flush-element"],["text","\\n"],["block",["if"],[["get",["showTooltip"]]],null,6],["text","  "],["open-element","div",[]],["dynamic-attr","class",["concat",["selection-highlight ",["helper",["if"],[["get",["isSelected"]],"visible"],null]]]],["dynamic-attr","style",["concat",["--selection-highlight-image: url(\'",["unknown",["selectedImage"]],"\')"]]],["flush-element"],["close-element"],["text","\\n\\n  "],["open-element","div",[]],["dynamic-attr","class",["concat",["reward ",["helper",["if"],[["get",["isRewardable"]],"rewardable-glow"],null]," ",["helper",["if"],[["get",["isLockedAndPaid"]],"locked"],null]]]],["flush-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","images"],["flush-element"],["text","\\n      "],["open-element","img",[]],["static-attr","class","background"],["dynamic-attr","src",["concat",[["unknown",["rewardBackgroundImage"]]]]],["flush-element"],["close-element"],["text","\\n      "],["open-element","img",[]],["static-attr","class","reward-icon"],["dynamic-attr","src",["concat",[["unknown",["milestone","iconImageUrl"]]]]],["flush-element"],["close-element"],["text","\\n      "],["open-element","div",[]],["dynamic-attr","class",["concat",["checkmark ",["helper",["unless"],[["get",["isClaimed"]],"hidden"],null]]]],["dynamic-attr","style",["concat",["--checkmark-image: url(\'",["unknown",["media","reward-checkmark"]],"\');"]]],["flush-element"],["close-element"],["text","\\n      "],["open-element","div",[]],["dynamic-attr","class",["concat",["locked ",["helper",["unless"],[["get",["isLockedAndPaid"]],"hidden"],null]]]],["flush-element"],["close-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","frame"],["dynamic-attr","style",["concat",["--frame-image: url(\'",["unknown",["rewardFrameImage"]],"\'); --frame-image-hover: url(\'",["unknown",["rewardFrameImageHover"]],"\')"]]],["flush-element"],["close-element"],["text","\\n    "],["close-element"],["text","\\n\\n    "],["block",["unless"],[["get",["milestone","isPaid"]]],null,2],["text","\\n  "],["close-element"],["text","\\n\\n"],["block",["if"],[["get",["showProgressionTracker"]]],null,1],["close-element"]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","      "],["open-element","div",[]],["static-attr","class","progress-bar-container"],["flush-element"],["text","\\n        "],["open-element","div",[]],["static-attr","class","progress-bar-empty"],["flush-element"],["close-element"],["text","\\n        "],["open-element","div",[]],["dynamic-attr","class",["concat",["progress-bar ",["helper",["if"],[["get",["isBonus"]],"bonus"],null]]]],["dynamic-attr","style",["concat",["width:",["unknown",["progress"]],"%"]]],["flush-element"],["close-element"],["text","\\n      "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","  "],["open-element","div",[]],["static-attr","class","progression-tracker"],["flush-element"],["text","\\n"],["block",["unless"],[["get",["first"]]],null,0],["text","\\n    "],["open-element","div",[]],["static-attr","class","level-pip"],["flush-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","image"],["dynamic-attr","style",["concat",["--pip-image: url(\'",["unknown",["levelPipImage"]],"\'); --pip-image-hover: url(\'",["unknown",["levelPipImageHover"]],"\')"]]],["flush-element"],["close-element"],["text","\\n      "],["open-element","span",[]],["dynamic-attr","class",["concat",["label ",["helper",["if"],[["get",["isActive"]],"label-color-dark","label-color-bright"],null]]]],["flush-element"],["append",["unknown",["milestone","level"]],false],["close-element"],["text","\\n    "],["close-element"],["text","\\n  "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["open-element","span",[]],["static-attr","class","free-label"],["flush-element"],["append",["unknown",["tra","battlepass_free_label"]],false],["close-element"]],"locals":[]},{"statements":[["text","        "],["open-element","p",[]],["static-attr","style","margin-bottom: 0"],["flush-element"],["append",["helper",["sanitize"],[["get",["description"]]],null],false],["close-element"],["text","\\n        "],["open-element","p",[]],["static-attr","style","font-weight: bold"],["flush-element"],["append",["helper",["sanitize"],[["get",["requiredXPText"]]],null],false],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","        "],["open-element","p",[]],["flush-element"],["append",["helper",["sanitize"],[["get",["description"]]],null],false],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","    "],["open-element","lol-uikit-content-block",[]],["static-attr","type","tooltip-small"],["flush-element"],["text","\\n"],["block",["if"],[["get",["hasRequiredXP"]]],null,4,3],["text","    "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["block",["tft-tooltip"],null,[["tooltipId"],["milestone-details"]],5]],"locals":[]}],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        var s = n(1),
          a = n(2);
        n(33);
        var o = s.Ember.Component.extend({
          classNames: [`${a.PLUGIN_NAME}-battlepass-level-bar`],
          classNameBindings: [
            "isPassComplete:pass-complete:",
            "isBonus:bonus:",
          ],
          layout: n(34),
          activeMilestone: null,
          isPassComplete: null,
          lastViewedMilestone: null,
          lastMainMilestone: null,
          playerHasPremium: null,
          showTooltip: !0,
          showHeader: !0,
          level: s.Ember.computed("activeMilestone.level", function () {
            const e = this.get("activeMilestone.level") - 1;
            return this.get("tra").formatString("battlepass_level_shorthand", {
              level: e,
            });
          }),
          count: s.Ember.computed.alias(
            "activeMilestone.pointsEarnedForMilestone",
          ),
          total: s.Ember.computed.alias(
            "activeMilestone.pointsNeededForMilestone",
          ),
          isBonus: s.Ember.computed.alias("activeMilestone.isBonus"),
          lastViewedCount: s.Ember.computed.alias(
            "lastViewedMilestone.pointsEarnedForMilestone",
          ),
          lastViewedTotal: s.Ember.computed.alias(
            "lastViewedMilestone.pointsNeededForMilestone",
          ),
          hasChanged: s.Ember.computed(
            "count",
            "activeMilestone.level",
            "lastViewedCount",
            "lastViewedMilestone.level",
            function () {
              return (
                this.get("activeMilestone.level") !==
                  this.get("lastViewedMilestone.level") ||
                this.get("count") !== this.get("lastViewedCount")
              );
            },
          ),
          percentage: s.Ember.computed(
            "count",
            "total",
            "isPassComplete",
            function () {
              return this._calculatePercentage(
                this.get("count"),
                this.get("total"),
                this.get("isPassComplete"),
              );
            },
          ),
          lastViewedPercentage: s.Ember.computed(
            "lastViewedCount",
            "lastViewedTotal",
            "isPassComplete",
            function () {
              return this._calculatePercentage(
                this.get("lastViewedCount"),
                this.get("lastViewedTotal"),
                this.get("isPassComplete"),
              );
            },
          ),
          lottieSrc: s.Ember.computed(
            "activeMilestone.level",
            "lastViewedMilestone.level",
            "isBonus",
            function () {
              const e = this.get("activeMilestone.level"),
                t = this.get("lastViewedMilestone.level"),
                n = this.get("isBonus") ? a.BONUS_STR : a.NORMAL_STR,
                s = e === t ? a.XP_GAIN_STR : a.LVL_UP_STR;
              return `${a.BATTLEPASS_LOTTIE_PATH}xpBar_${s}_${n}`;
            },
          ),
          assetSegmentsSrc: s.Ember.computed("total", function () {
            const e = this.get("total"),
              t = Math.round(e / 100);
            return a.AVAILABLE_XP_SEGMENTS.includes(t)
              ? `TFTM_BattlePass_Segments_${t}.png`
              : `TFTM_BattlePass_Segments_${a.AVAILABLE_XP_SEGMENTS[0]}.png`;
          }),
          didInsertElement() {
            this._super(...arguments), this._startAnimation();
          },
          willDestroyElement() {
            this._stopAnimation();
          },
          _startAnimation() {
            const e = this.element.querySelector("lol-uikit-lottie#xp-bar");
            this.get("hasChanged")
              ? ((e.onAnimationStart = this._playSFX()),
                (e.onAnimationComplete =
                  this._transitionToLoopAnimation.bind(this)),
                e.play())
              : this._transitionToLoopAnimation();
          },
          _stopAnimation() {
            const e = this.element.querySelector("lol-uikit-lottie#xp-bar"),
              t = this.element.querySelector("lol-uikit-lottie#xp-bar-loop");
            e.stop(), t.stop();
          },
          _transitionToLoopAnimation() {
            const e = this.element.querySelector("lol-uikit-lottie#xp-bar");
            (this.element.querySelector(
              "lol-uikit-lottie#xp-bar-loop",
            ).style.display = "inline"),
              (e.style.display = "none");
          },
          _playSFX() {
            const e =
                this.get("activeMilestone.level") ===
                this.get("lastViewedMilestone.level")
                  ? a.XP_GAIN_SFX_PATH
                  : a.LVL_UP_SFX_PATH,
              t = s.Audio.getChannel(a.SOUND_UX_CHANNEL),
              n = t.audioContext.currentTime;
            t.playSound(e, {}, { when: n + a.ANIMATION_SFX_START_DELAY });
          },
          _calculatePercentage(e, t, n) {
            const s = parseInt(e),
              a = parseInt(t);
            return n ? 1 : a ? s / a : 0;
          },
        });
        t.default = o;
      },
      (e, t, n) => {
        "use strict";
        n.r(t);
      },
      (e, t, n) => {
        const s = n(1).Ember;
        e.exports = s.HTMLBars.template({
          id: "oH9ERmFf",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-tft\\\\src\\\\app\\\\components\\\\battlepass-level-bar\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-tft\\\\src\\\\app\\\\components\\\\battlepass-level-bar\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-tft\\\\src\\\\app\\\\components\\\\battlepass-level-bar\\\\index.js\\" "],["text","\\n"],["open-element","div",[]],["static-attr","class","content"],["flush-element"],["text","\\n"],["block",["unless"],[["get",["isPassComplete"]]],null,5],["block",["if"],[["get",["showHeader"]]],null,2],["text","  "],["open-element","div",[]],["static-attr","class","tft-bar-lottie-container"],["flush-element"],["text"," \\n    "],["open-element","lol-uikit-lottie",[]],["static-attr","id","xp-bar-loop"],["dynamic-attr","src",["concat",[["unknown",["lottieSrc"]],"_LOOP.json"]]],["static-attr","autoplay","true"],["static-attr","image-path","fe/lol-tft/lottie/Battlepass-XPBar/images/"],["dynamic-attr","param-current-level-progress",["unknown",["percentage"]],null],["dynamic-attr","param-previous-level-progress",["unknown",["lastViewedPercentage"]],null],["dynamic-attr","asset-segments",["unknown",["assetSegmentsSrc"]],null],["static-attr","loop","true"],["flush-element"],["text","\\n    "],["close-element"],["text","\\n    "],["open-element","lol-uikit-lottie",[]],["static-attr","id","xp-bar"],["dynamic-attr","src",["concat",[["unknown",["lottieSrc"]],"_IN.json"]]],["static-attr","autoplay","false"],["static-attr","image-path","fe/lol-tft/lottie/Battlepass-XPBar/images/"],["dynamic-attr","param-current-level-progress",["unknown",["percentage"]],null],["dynamic-attr","param-previous-level-progress",["unknown",["lastViewedPercentage"]],null],["dynamic-attr","asset-segments",["unknown",["assetSegmentsSrc"]],null],["flush-element"],["text","\\n    "],["close-element"],["text","\\n  "],["close-element"],["text","\\n"],["close-element"]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","          "],["append",["unknown",["level"]],false],["text","\\n"]],"locals":[]},{"statements":[["text","          "],["append",["unknown",["tra","battlepass_one_hundred_percent_complete"]],false],["text","\\n"]],"locals":[]},{"statements":[["text","  "],["open-element","div",[]],["static-attr","class","header"],["flush-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","header-text"],["flush-element"],["text","\\n"],["block",["if"],[["get",["isPassComplete"]]],null,1,0],["text","    "],["close-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","progress-counter-alignment-wrapper"],["flush-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","progress-counter"],["flush-element"],["text","\\n        "],["open-element","div",[]],["static-attr","class","count"],["flush-element"],["append",["unknown",["count"]],false],["close-element"],["text","\\n        "],["open-element","div",[]],["static-attr","class","total"],["flush-element"],["append",["unknown",["total"]],false],["text"," "],["append",["unknown",["tra","battlepass_exp_shortened"]],false],["close-element"],["text","\\n      "],["close-element"],["text","\\n    "],["close-element"],["text","\\n  "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","      "],["open-element","lol-uikit-content-block",[]],["static-attr","type","tooltip-small"],["flush-element"],["text","\\n        "],["open-element","p",[]],["flush-element"],["append",["unknown",["tra","battlepass_level_bar_tooltip"]],false],["close-element"],["text","\\n      "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["block",["tft-tooltip"],null,[["tooltipId"],["level-bar-details"]],3]],"locals":[]},{"statements":[["block",["if"],[["get",["enableTooltip"]]],null,4]],"locals":[]}],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        var s = n(1),
          a = n(2);
        n(36);
        var o = s.Ember.Component.extend({
          classNames: [`${a.PLUGIN_NAME}-battlepass-info`],
          layout: n(37),
          timeoutExpired: !1,
          isBattlePassXPBoosted: !1,
          title: null,
          passEndDate: null,
          timeLeftString: s.Ember.computed(
            "timeoutExpired",
            "passEndDate",
            function () {
              let e = this.get("passEndDate") - Date.now();
              const t = Math.floor(e / a.DAY_IN_MS);
              e -= 86400 * t;
              const n = Math.floor(e / a.HOUR_IN_MS) % 24;
              e -= 3600 * n;
              const o = Math.floor(e / a.MINUTE_IN_MS) % 60;
              let l, i, r;
              e -= 60 * o;
              let c = 0;
              return t > 0
                ? ((l = this.get("tra").formatString("tft_duration_days", {
                    days: t,
                  })),
                  this.get("tra").formatString(
                    "battlepass_time_till_event_end",
                    { duration: l },
                  ))
                : (n > 0 && t <= 1
                    ? ((i = this.get("tra").formatString("tft_duration_hours", {
                        hours: n,
                      })),
                      (c = n > 1 ? a.HOUR_IN_MS : a.MINUTE_IN_MS))
                    : ((r = this.get("tra").formatString(
                        "tft_duration_minutes",
                        { minutes: o },
                      )),
                      (c = a.MINUTE_IN_MS)),
                  (this.timeoutExpired = !1),
                  c > 0 &&
                    s.Ember.run.later(
                      this,
                      function () {
                        this.set("timeoutExpired", !0);
                      },
                      c,
                    ),
                  i && r
                    ? this.get("tra").formatString(
                        "battlepass_time_till_event_end_hours_and_minutes",
                        { hour_duration: i, minutes_duration: r },
                      )
                    : this.get("tra").formatString(
                        "battlepass_time_till_event_end",
                        { duration: i || r },
                      ));
            },
          ),
        });
        t.default = o;
      },
      (e, t, n) => {
        "use strict";
        n.r(t);
      },
      (e, t, n) => {
        const s = n(1).Ember;
        e.exports = s.HTMLBars.template({
          id: "hu8W1J1k",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-tft\\\\src\\\\app\\\\components\\\\battlepass-info\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-tft\\\\src\\\\app\\\\components\\\\battlepass-info\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-tft\\\\src\\\\app\\\\components\\\\battlepass-info\\\\index.js\\" "],["text","\\n"],["open-element","header",[]],["flush-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","title"],["flush-element"],["append",["unknown",["title"]],false],["close-element"],["text","\\n"],["close-element"],["text","\\n"],["open-element","sub",[]],["static-attr","class","pass-details"],["flush-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","pass-timeline-text"],["flush-element"],["append",["unknown",["timeLeftString"]],false],["close-element"],["text","\\n\\n"],["block",["if"],[["get",["isBattlePassXPBoosted"]]],null,1],["close-element"]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","                "],["open-element","lol-uikit-content-block",[]],["static-attr","type","tooltip-small"],["flush-element"],["text","\\n                    "],["open-element","p",[]],["flush-element"],["append",["unknown",["tra","battlepass_xp_boosted_tooltip"]],false],["close-element"],["text","\\n                "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","        "],["open-element","div",[]],["static-attr","class","xp-boosted-container"],["flush-element"],["text","\\n            "],["open-element","img",[]],["static-attr","src","/fe/lol-tft/images/TFT_Up_Arrow.svg"],["static-attr","class","tft-up-arrow-icon"],["flush-element"],["close-element"],["text","\\n            "],["open-element","p",[]],["static-attr","class","pass-timeline-text"],["flush-element"],["text","\\n                "],["append",["unknown",["tra","battlepass_xp_boosted"]],false],["text","\\n            "],["close-element"],["text","\\n"],["block",["tft-tooltip"],null,[["tooltipId","targetAnchor","tooltipAnchor","tooltipDirection"],["xp-boosted-message",["helper",["hash"],null,[["x","y"],["right","center"]]],["helper",["hash"],null,[["x","y"],["left","center"]]],"left"]],0],["text","        "],["close-element"],["text","\\n"]],"locals":[]}],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        var s = n(1),
          a = n(2);
        n(39);
        var o = s.Ember.Component.extend({
          classNames: [`${a.PLUGIN_NAME}-battlepass-upgrade-button`],
          layout: n(40),
          pcPurchaseRequirement: null,
          actions: {
            showEventPassStore() {
              const e = this.get("pcPurchaseRequirement"),
                [t, n] = e.split(":");
              s.Telemetry.sendCustomData(a.DEFAULT_TELEMETRY_TABLE, {
                eventName: a.TELEMETRY_TFT_PASS_UPGRADE_CLICKED,
                inventoryType: t,
                itemId: n,
              }),
                s.Router.navigateTo("rcp-fe-lol-store", {
                  items: [{ inventoryType: t, itemId: n }],
                  page: "companions",
                });
            },
          },
        });
        t.default = o;
      },
      (e, t, n) => {
        "use strict";
        n.r(t);
      },
      (e, t, n) => {
        const s = n(1).Ember;
        e.exports = s.HTMLBars.template({
          id: "Hasy1wk/",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-tft\\\\src\\\\app\\\\components\\\\battlepass-upgrade-button\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-tft\\\\src\\\\app\\\\components\\\\battlepass-upgrade-button\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-tft\\\\src\\\\app\\\\components\\\\battlepass-upgrade-button\\\\index.js\\" "],["text","\\n"],["block",["unless"],[["get",["playerHasPremium"]]],null,0]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","    "],["open-element","div",[]],["static-attr","class","magic-button-group"],["flush-element"],["text","\\n        "],["open-element","lol-uikit-flat-button",[]],["static-attr","primary","true"],["dynamic-attr","class",["helper",["if"],[["get",["selectedPassRewardDetails","isPaid"]],"glow"],null],null],["dynamic-attr","onclick",["helper",["action"],[["get",[null]],"showEventPassStore"],null],null],["flush-element"],["text","\\n            "],["append",["unknown",["tra","battlepass_go_premium"]],false],["text","\\n        "],["close-element"],["text","\\n    "],["close-element"],["text","\\n"]],"locals":[]}],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        var s = n(1),
          a = n(2);
        n(42);
        var o = s.Ember.Component.extend({
          didRender() {
            this._super(...arguments),
              setTimeout(() => {
                const e = this.$(".reward-premium-glow uikit-video");
                if (e) {
                  e.toArray().forEach((e) => e.playWithoutStopping());
                }
              }, 200);
          },
          classNames: [`${a.PLUGIN_NAME}-battlepass-selected-reward-details`],
          layout: n(43),
          celebratePassCompletionFunc: function (e) {},
          claimRewardsFunc: function (e, t) {},
          disableClaimButton: !1,
          isLastRewardInMainBattlepass: null,
          backgrounds: null,
          rewardInfo: null,
          passId: null,
          battlepassRewardCelebrationBackground: s.Ember.computed.alias(
            "backgrounds.background--battlepass-reward-celebration",
          ),
          battlepassCompletionBackground: s.Ember.computed.alias(
            "backgrounds.background--battlepass-completion",
          ),
          title: s.Ember.computed.alias("rewardInfo.title"),
          description: s.Ember.computed.alias("rewardInfo.description"),
          iconImageUrl: s.Ember.computed.alias("rewardInfo.iconImageUrl"),
          iconNeedsFrame: s.Ember.computed.bool("rewardInfo.iconNeedsFrame"),
          isBonus: s.Ember.computed.alias("rewardInfo.isBonus"),
          isLocked: s.Ember.computed.alias("rewardInfo.isLocked"),
          isPaid: s.Ember.computed.alias("rewardInfo.isPaid"),
          milestoneId: s.Ember.computed.alias("rewardInfo.milestoneId"),
          status: s.Ember.computed.alias("rewardInfo.status"),
          isClaimable: s.Ember.computed.equal(
            "status",
            a.BP_V2_MILESTONE_CLAIMABLE,
          ),
          isNotClaimable: s.Ember.computed.not("isClaimable"),
          isComplete: s.Ember.computed.equal(
            "status",
            a.BP_V2_MILESTONE_COMPLETE,
          ),
          loadingTimeoutId: null,
          isLoading: s.Ember.computed.bool("rewardInfo.isClaimRequestPending"),
          showButton: s.Ember.computed(
            "disableClaimButton",
            "isLocked",
            "isNotClaimable",
            function () {
              if (this.get("disableClaimButton")) return !1;
              const e = this.get("isNotClaimable");
              return !this.get("isLocked") && !e;
            },
          ),
          actions: {
            claim(e) {
              if (this.get("isLoading")) return;
              s.Telemetry.sendEvent(
                "tft-claim-reward-button-clicked",
                e.milestoneId,
              );
              const t = this.get("passId");
              t && (e.passId = t),
                this.set("rewardInfo.isClaimRequestPending", !0),
                this.get("claimRewardsFunc")(
                  e,
                  this.get("battlepassRewardCelebrationBackground"),
                ).finally(() => {
                  this.set("rewardInfo.isClaimRequestPending", !1);
                }),
                this.get("isLastRewardInMainBattlepass") &&
                  this.get("celebratePassCompletionFunc")(
                    this.get("battlepassCompletionBackground"),
                  );
            },
          },
        });
        t.default = o;
      },
      (e, t, n) => {
        "use strict";
        n.r(t);
      },
      (e, t, n) => {
        const s = n(1).Ember;
        e.exports = s.HTMLBars.template({
          id: "zfEIs2xU",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-tft\\\\src\\\\app\\\\components\\\\battlepass-selected-reward-details\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-tft\\\\src\\\\app\\\\components\\\\battlepass-selected-reward-details\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-tft\\\\src\\\\app\\\\components\\\\battlepass-selected-reward-details\\\\index.js\\" "],["text","\\n"],["block",["if"],[["get",["rewardInfo"]]],null,4]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","        "],["open-element","div",[]],["static-attr","class","button-content"],["flush-element"],["append",["unknown",["tra","battlepass_milestone_claim"]],false],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","        "],["append",["helper",["uikit-spinner"],null,[["width"],["24px"]]],false],["text","\\n"]],"locals":[]},{"statements":[["text","    "],["open-element","lol-uikit-flat-button",[]],["dynamic-attr","onclick",["helper",["action"],[["get",[null]],"claim",["get",["rewardInfo"]]],null],null],["static-attr","class","button glow"],["static-attr","primary","true"],["flush-element"],["text","\\n"],["block",["if"],[["get",["isLoading"]]],null,1,0],["text","    "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","    "],["open-element","user-experience-perf-switch",[]],["static-attr","class","reward-premium-glow"],["flush-element"],["text","\\n      "],["open-element","uikit-video",[]],["static-attr","type","idle"],["static-attr","src","/fe/lol-tft/videos/background-sparkles.webm"],["static-attr","perf-flags","largeAreaAnimationsEnabled"],["static-attr","visibility","invisible"],["static-attr","cache-name","rcp-fe-lol-tft"],["static-attr","preload","true"],["static-attr","loop","true"],["static-attr","autoplay","true"],["flush-element"],["close-element"],["text","\\n    "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["open-element","section",[]],["static-attr","class","reward-tile"],["flush-element"],["text","\\n"],["block",["if"],[["get",["isPaid"]]],null,3],["text","  "],["open-element","img",[]],["static-attr","class","reward-image"],["dynamic-attr","src",["unknown",["iconImageUrl"]],null],["flush-element"],["close-element"],["text","\\n  "],["open-element","div",[]],["dynamic-attr","class",["concat",["icon-frame ",["helper",["if"],[["get",["iconNeedsFrame"]],"visible"],null]]]],["flush-element"],["close-element"],["text","\\n"],["close-element"],["text","\\n"],["open-element","section",[]],["static-attr","class","reward-details"],["flush-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","reward-text"],["flush-element"],["text","\\n    "],["open-element","header",[]],["flush-element"],["append",["unknown",["title"]],false],["close-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","description"],["flush-element"],["append",["helper",["sanitize"],[["get",["description"]]],null],false],["close-element"],["text","\\n  "],["close-element"],["text","\\n"],["block",["if"],[["get",["showButton"]]],null,2],["close-element"],["text","\\n"]],"locals":[]}],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default =
            t.UNKNOWN_TFT_TAB_ROUTE_INDEX =
            t.DEFAULT_TAB_COUNT_WITHOUT_EVENT =
              void 0);
        var s = n(1),
          a = n(2);
        n(45);
        t.UNKNOWN_TFT_TAB_ROUTE_INDEX = -1;
        t.DEFAULT_TAB_COUNT_WITHOUT_EVENT = 7;
        var o = s.Ember.Component.extend({
          classNames: [`${a.PLUGIN_NAME}-sub-nav`],
          layout: n(46),
          routeName: null,
          tftService: s.Ember.inject.service("tft"),
          trovesService: s.Ember.inject.service("tftTroves"),
          rotationalShopService: s.Ember.inject.service("rotationalShop"),
          isEnabled: s.Ember.computed.alias("tftService.isSubNavEnabled"),
          homePageEnabled: s.Ember.computed.alias("tftService.homePageEnabled"),
          testPageEnabled: s.Ember.computed.alias("tftService.testPageEnabled"),
          tftNewsEnabled: s.Ember.computed.alias("tftService.newsEnabled"),
          rotationalShopEnabled: s.Ember.computed.alias(
            "rotationalShopService.rotationalShopEnabled",
          ),
          showStoreNavPip: s.Ember.computed.alias(
            "rotationalShopService.showStoreNavPip",
          ),
          showBpNavPip: s.Ember.computed.alias("tftService.showBpNavPip"),
          eventsData: s.Ember.computed.alias("tftService.eventsData"),
          events: s.Ember.computed(
            "eventsData",
            "showEventHubPip",
            function () {
              return this._retrieveEvents(
                this.get("eventsData"),
                this.get("showEventHubPip"),
              );
            },
          ),
          trovesEnabled: s.Ember.computed(
            "trovesService.trovesEnabled",
            function () {
              return (
                !!this.get("trovesService") &&
                this.get("trovesService.trovesEnabled")
              );
            },
          ),
          subNavTabs: s.Ember.computed(
            "showBpNavPip",
            "showStoreNavPip",
            "tftNewsEnabled",
            "testPageEnabled",
            "homePageEnabled",
            "trovesEnabled",
            "rotationalShopEnabled",
            "events",
            function () {
              const e = this.get("events");
              return [
                {
                  route: a.TFT_HOME_ROUTE,
                  traKey: "subnav_home",
                  isEnabled: this.get("homePageEnabled"),
                  showPip: !1,
                },
                {
                  route: a.TFT_BATTLE_PASS_ROUTE,
                  traKey: "subnav_battle_pass",
                  isEnabled: !0,
                  showPip: this.get("showBpNavPip"),
                },
                {
                  route: a.TFT_TROVES_ROUTE,
                  traKey: "subnav_troves",
                  isEnabled: this.get("trovesEnabled"),
                },
                {
                  route: a.TFT_ROTATIONAL_SHOP_ROUTE,
                  traKey: "subnav_rotational_shop",
                  isEnabled: this.get("rotationalShopEnabled"),
                  showPip: this.get("showStoreNavPip"),
                },
                ...e,
                {
                  route: a.TFT_MATCH_HISTORY_ROUTE,
                  traKey: "subnav_match_history",
                  isEnabled: !0,
                  showPip: !1,
                },
                {
                  route: a.TFT_NEWS_ROUTE,
                  traKey: "subnav_news",
                  isEnabled: this.get("tftNewsEnabled"),
                  showPip: !1,
                },
                {
                  route: a.TFT_TEST_ROUTE,
                  traKey: "subnav_test_page",
                  isEnabled: this.get("testPageEnabled"),
                  showPip: !1,
                },
              ];
            },
          ),
          subNavTabIndexesByRouteName: s.Ember.computed(
            "subNavTabs",
            function () {
              const e = this.get("subNavTabs"),
                t = new Map();
              return (
                e
                  .filter((e) => e.isEnabled)
                  .forEach((e, n) => {
                    t.set(e.route, n);
                  }),
                t
              );
            },
          ),
          selectedIndex: s.Ember.computed(
            "routeName",
            "subNavTabIndexesByRouteName",
            function () {
              const e = this.get("subNavTabIndexesByRouteName"),
                t = this.get("routeName");
              if (e && t) {
                const n = e.get(t);
                if (void 0 !== n) return n;
              }
              return -1;
            },
          ),
          init() {
            this._super(...arguments), this._initObservers();
          },
          willDestroy() {
            this._removeObservers();
          },
          didRender() {
            this._super(...arguments),
              this._highlightNavItemIfNeeded(
                this._retrieveSubNavContainer(this.element),
                this.get("selectedIndex"),
              );
          },
          actions: {
            subNavClicked(e) {
              s.Telemetry.sendCustomData(a.DEFAULT_TELEMETRY_TABLE, {
                eventName: a.TELEMETRY_TFT_SUB_NAV_CLICKED,
                subNavRoute: e.route,
                subNavUrl: e.url,
              });
            },
          },
          _retrieveEvents: function (e, t) {
            const n = [];
            if (e && e.length > 0) {
              e.length > 1 &&
                s.logger.error(
                  "Received " +
                    e.length +
                    " events. Currently only displaying one event in the TFT Hub is supported. Picking the first event and ignoring the rest of the events in the data.",
                );
              const o = e[0];
              o.enabled &&
                o.titleTranslationKey &&
                n.push({
                  route: a.TFT_EVENT_ROUTE,
                  traKey: o.titleTranslationKey,
                  isEnabled: !0,
                  showPip: t || !1,
                  url: o.url,
                });
            }
            return n;
          },
          _highlightNavItemIfNeeded: function (e, t) {
            if (e)
              if (Number.isInteger(t)) {
                if (-1 !== t) {
                  const n = this._getActiveTabIndex(e);
                  (-1 === n || n !== t) && e.setAttribute("selectedindex", t);
                }
              } else
                s.logger.warning(
                  "Received an invalid value for the navigation tab index. Index must be an integer.",
                  t,
                );
            else
              s.logger.warning(
                "Received an empty value for the tabs container where a HTMLElement was expected.",
                e,
              );
          },
          _retrieveSubNavContainer: (e) =>
            e && e instanceof HTMLElement
              ? e.querySelector(
                  "lol-uikit-navigation-bar.tft-sub-nav-container",
                )
              : null,
          _getActiveTabIndex: (e) =>
            Array.from(
              e.querySelectorAll("lol-uikit-navigation-item"),
            ).findIndex((e) => e.hasAttribute("active")),
          _initObservers() {
            this._observeEventHubVersion();
          },
          _removeObservers() {
            this._removeEventHubVersionObserver();
          },
          isNewEventHubVersion: !0,
          showEventHubPip: s.Ember.computed(
            "isNewEventHubVersion",
            function () {
              return this.get("isNewEventHubVersion");
            },
          ),
          _observeEventHubVersion() {
            s.db.addObserver(
              "/lol-settings/v2/account/TFT/VersionsSeen",
              this,
              (e) => {
                this.set("isNewEventHubVersion", (e?.data?.eventHub || 0) < 1);
              },
            );
          },
          _removeEventHubVersionObserver() {
            s.db.removeObserver(
              "/lol-settings/v2/account/TFT/VersionsSeen",
              this,
            );
          },
        });
        t.default = o;
      },
      (e, t, n) => {
        "use strict";
        n.r(t);
      },
      (e, t, n) => {
        const s = n(1).Ember;
        e.exports = s.HTMLBars.template({
          id: "JF7zCG04",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-tft\\\\src\\\\app\\\\components\\\\tft-sub-nav\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-tft\\\\src\\\\app\\\\components\\\\tft-sub-nav\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-tft\\\\src\\\\app\\\\components\\\\tft-sub-nav\\\\index.js\\" "],["text","\\n"],["block",["if"],[["get",["isEnabled"]]],null,8]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","            "],["append",["helper",["get"],[["get",["tra"]],["get",["subNav","traKey"]]],null],false],["text","\\n"]],"locals":[]},{"statements":[["block",["tft-sub-nav-item"],null,[["showPip"],[["get",["subNav","showPip"]]]],0]],"locals":[]},{"statements":[["block",["link-to"],[["get",["subNav","route"]]],null,1]],"locals":[]},{"statements":[["text","            "],["append",["helper",["get"],[["get",["tra"]],["get",["subNav","traKey"]]],null],false],["text","\\n"]],"locals":[]},{"statements":[["block",["tft-sub-nav-item"],null,[["showPip"],[["get",["subNav","showPip"]]]],3]],"locals":[]},{"statements":[["block",["link-to"],[["get",["subNav","route"]],["helper",["query-params"],null,[["url"],[["get",["subNav","url"]]]]]],null,4]],"locals":[]},{"statements":[["block",["if"],[["get",["subNav","url"]]],null,5,2]],"locals":[]},{"statements":[["text","    "],["open-element","span",[]],["dynamic-attr","onclick",["helper",["action"],[["get",[null]],"subNavClicked",["get",["subNav"]]],null],null],["flush-element"],["text","\\n"],["block",["if"],[["get",["subNav","isEnabled"]]],null,6],["text","    "],["close-element"],["text","\\n"]],"locals":["subNav","index"]},{"statements":[["text","  "],["open-element","lol-uikit-navigation-bar",[]],["static-attr","type","nav-bar-secondary"],["static-attr","class","tft-sub-nav-container"],["flush-element"],["text","\\n"],["block",["each"],[["get",["subNavTabs"]]],null,7],["text","  "],["close-element"],["text","\\n"]],"locals":[]}],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        var s = n(1),
          a = n(2);
        n(48);
        var o = s.Ember.Component.extend({
          classNames: [`${a.PLUGIN_NAME}-sub-nav-item`],
          layout: n(49),
          showPip: !1,
        });
        t.default = o;
      },
      (e, t, n) => {
        "use strict";
        n.r(t);
      },
      (e, t, n) => {
        const s = n(1).Ember;
        e.exports = s.HTMLBars.template({
          id: "70KR4773",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-tft\\\\src\\\\app\\\\components\\\\tft-sub-nav-item\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-tft\\\\src\\\\app\\\\components\\\\tft-sub-nav-item\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-tft\\\\src\\\\app\\\\components\\\\tft-sub-nav-item\\\\index.js\\" "],["text","\\n"],["open-element","lol-uikit-navigation-item",[]],["flush-element"],["text","\\n    "],["yield","default"],["text","\\n"],["block",["if"],[["get",["showPip"]]],null,0],["close-element"]],"locals":[],"named":[],"yields":["default"],"blocks":[{"statements":[["text","        "],["open-element","div",[]],["static-attr","class","tft-sub-nav-pip-cta"],["flush-element"],["text","\\n            "],["append",["unknown",["call-to-action-pip"]],false],["text","\\n        "],["close-element"],["text","\\n"]],"locals":[]}],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        var s = n(1),
          a = n(2);
        n(51);
        var o,
          l = (o = n(52)) && o.__esModule ? o : { default: o };
        const i = {
            clickSfxPath: a.TFT_STORE_PROMO_CLICK_SFX_PATH,
            imageActive: "",
            imageHover: "",
            priceRP: Number.MIN_SAFE_INTEGER,
            hoverSfxPath: a.TFT_STORE_PROMO_HOVER_SFX_PATH,
            itemId: "FALLBACK_ITEM_ID",
            inventoryType: "STAR_FRAGMENTS",
            name: "FALLBACK_SHARDS_PROMO",
          },
          r = "store-promo-fallback-active",
          c = "store-promo-fallback-hover",
          m = "default-active",
          u = "default-hover";
        var d = s.Ember.Component.extend(l.default, {
          classNames: "rcp-fe-lol-tft-home",
          classNameBindings: ["tftService.homeOverrideUrl:iframe-view"],
          layout: n(53),
          storeCatalog: null,
          regionLocale: null,
          storePromoAssets: null,
          tftService: s.Ember.inject.service("tft"),
          trovesService: s.Ember.inject.service("tftTroves"),
          teamPlannerEnabled: s.Ember.computed(
            () => s.TeamPlanner && s.TeamPlanner.getEnabled(),
          ),
          battlePass: s.Ember.computed.alias("tftService.battlePassV2"),
          homeFooter: s.Ember.computed.alias(
            "tftService.tftbackgrounds.home-footer-bg",
          ),
          playerHasBPPremium: s.Ember.computed.alias("battlePass.info.premium"),
          storePromoOfferIds: s.Ember.computed(
            "tftService.storePromoOfferIds",
            "tftService.battlePassOfferIds",
            "tftService.tacticianPromoOfferIds",
            "playerHasBPPremium",
            function () {
              const e = this.get("tftService.storePromoOfferIds"),
                t = this.get("tftService.tacticianPromoOfferIds"),
                n = this.get("tftService.battlePassOfferIds");
              this.get("playerHasBPPremium");
              if (!e || !n || !t) return [];
              const a = [n[0], e[0]],
                o = { storeOfferIds: a, tacticianOfferIds: t };
              return (
                (0, s.dataBinding)("/lol-settings", s.socket).patch(
                  "/v2/account/LCUPreferences/lol-tft",
                  { data: { seenOfferIds: o }, schemaVersion: 1 },
                ),
                a
              );
            },
          ),
          fallbackStorePromoOfferIds: s.Ember.computed.alias(
            "tftService.fallbackStorePromoOfferIds",
          ),
          fallbackPromoData: s.Ember.computed(
            "fallbackStorePromoOfferIds",
            "storeCatalog",
            "storePromoAssets",
            "regionLocale",
            function () {
              const e = { ...i },
                t = this.get("regionLocale"),
                n = this.get("storePromoAssets");
              n &&
                ((e.imageActive = n[r] ? n[r] : n[m]),
                (e.imageHover = n[c] ? n[c] : n[u]));
              const s = this.get("fallbackStorePromoOfferIds");
              if (Array.isArray(s) && s.length > 0) {
                const n = s[0],
                  a = this.get("storeCatalog");
                if (n && a) {
                  e.itemId = n;
                  const s = a.find((e) => e.offerId === n);
                  if (s) {
                    if (s.prices) {
                      const t = s.prices.find((e) => "RP" === e.currency);
                      t && (e.priceRP = t.cost);
                    }
                    const n =
                      s.localizations && s.localizations[t]
                        ? s.localizations[t].name
                        : "";
                    n && (e.name = n);
                  }
                }
              }
              return e;
            },
          ),
          _isValidStorePromoItem(e, t) {
            if (!e) return !1;
            const n = e.inventoryType,
              s = e.itemId,
              a = e.prices.find((e) => "RP" === e.currency),
              o =
                e.localizations && e.localizations[t]
                  ? e.localizations[t].name
                  : "";
            return (
              !!(null != n && null != s && null != a && null != o) && {
                inventoryType: n,
                itemId: s,
                priceRP: a,
                name: o,
              }
            );
          },
          firstStorePromoData: s.Ember.computed(
            "tftService.battlePassOfferIds",
            function () {
              const e = this.get("storeCatalog"),
                t = this.get("storePromoAssets");
              if (!e || !t) {
                return this.get("fallbackPromoData");
              }
              const n = this.get("tftService.battlePassOfferIds"),
                s = n.length ? n[0] : null,
                o = e.find((e) => e.offerId === s),
                l = this.get("regionLocale"),
                i = this._isValidStorePromoItem(o, l);
              if (i) {
                const e = `${s}-hover`,
                  n = `${s}-active`,
                  o = t[n] ? t[n] : t[m],
                  l = t[e] ? t[e] : t[u],
                  { inventoryType: r, itemId: c, priceRP: d, name: p } = i;
                return {
                  clickSfxPath: a.TFT_STORE_PROMO_CLICK_SFX_PATH,
                  hoverSfxPath: a.TFT_STORE_PROMO_HOVER_SFX_PATH,
                  imageActive: o,
                  imageHover: l,
                  inventoryType: r,
                  itemId: c,
                  priceRP: d.cost,
                  name: p,
                };
              }
              return this.get("fallbackPromoData");
            },
          ),
          secondStorePromoData: s.Ember.computed(
            "tftService.storePromoOfferIds",
            function () {
              const e = this.get("storeCatalog"),
                t = this.get("storePromoAssets");
              if (!e || !t) {
                return this.get("fallbackPromoData");
              }
              const n = this.get("tftService.storePromoOfferIds"),
                s = n.length ? n[0] : null,
                o = `${s}-hover`,
                l = `${s}-active`,
                i = t[l] ? t[l] : t[m],
                r = t[o] ? t[o] : t[u];
              return {
                clickSfxPath: a.TFT_STORE_PROMO_CLICK_SFX_PATH,
                hoverSfxPath: a.TFT_STORE_PROMO_HOVER_SFX_PATH,
                imageActive: i,
                imageHover: r,
              };
            },
          ),
          tacticianPromoOfferId: s.Ember.computed(
            "tftService.tacticianPromoOfferIds",
            function () {
              const e = this.get("tftService.tacticianPromoOfferIds");
              return e ? e[0] : null;
            },
          ),
          tacticianPromo: s.Ember.computed.alias(
            "trovesService.troveActiveBanners",
          ),
          tacticianPromoData: s.Ember.computed(
            "tacticianPromoOfferId",
            "storePromoAssets",
            "tacticianPromo",
            function () {
              const e = this.get("tacticianPromoOfferId"),
                t = this.get("storePromoAssets"),
                n = this.get("tacticianPromo");
              if (n) {
                const s = n.find((t) => t.sourceId === e || t.id === e);
                if (s) {
                  const n = e + "-hover",
                    o = e + "-active";
                  return {
                    clickSfxPath: a.TFT_BUTTON_CLICK_SFX_PATH,
                    hoverSfxPath: a.TFT_TACTICIAN_HOVER_SFX_PATH,
                    imageActive: t ? t[o] : "",
                    imageHover: t ? t[n] : "",
                    inventoryType: a.INVENTORY_TYPES.TROVES,
                    itemId: s.id,
                    name: s.name,
                  };
                }
              }
              return {
                clickSfxPath: a.TFT_BUTTON_CLICK_SFX_PATH,
                imageActive: t ? t["tactician-promo-fallback-active"] : "",
                imageHover: t ? t["tactician-promo-fallback-hover"] : "",
                hoverSfxPath: a.TFT_TACTICIAN_HOVER_SFX_PATH,
                inventoryType: "COMPANION",
                itemId: "FALLBACK_TACTICIAN_ID",
              };
            },
          ),
          primeGamingPromoOffer: s.Ember.computed.alias(
            "tftService.primeGamingPromoOffer",
          ),
          primeGamingPromoOfferData: s.Ember.computed(
            "primeGamingPromoOffer",
            "storePromoAssets",
            function () {
              const e = this.get("primeGamingPromoOffer"),
                t = this.get("storePromoAssets");
              if (t && e) {
                const n = e.assetId,
                  s = e.url,
                  o = n + "-hover",
                  l = n + "-active";
                return {
                  clickSfxPath: a.TFT_STORE_PROMO_CLICK_SFX_PATH,
                  hoverSfxPath: a.TFT_STORE_PROMO_HOVER_SFX_PATH,
                  imageActive: t[l],
                  imageHover: t[o],
                  inventoryType: a.INVENTORY_TYPES.PRIME_GAMING,
                  itemId: n,
                  name: "PrimeGaming",
                  primeGamingUrl: s,
                };
              }
              return null;
            },
          ),
          isLoading: s.Ember.computed(
            "firstStorePromoData",
            "secondStorePromoData",
            "tacticianPromoData",
            function () {
              const e = this.get("firstStorePromoData"),
                t = this.get("secondStorePromoData");
              return !(this.get("tacticianPromoData") && e && t);
            },
          ),
          didInsertElement() {
            this._super(...arguments);
            const e = this.element.querySelector(
              ".team-planner-button-container",
            );
            e &&
              (this.addPlaySound(
                e,
                "mousedown",
                a.TFT_TEAM_PLANNER_BUTTON_DOWN_SFX_PATH,
              ),
              this.addPlaySound(
                e,
                "mouseenter",
                a.TFT_TEAM_PLANNER_BUTTON_HOVER_SFX_PATH,
              ));
          },
          willDestroyElement() {
            this._super(...arguments);
            const e = this.element.querySelector(
              "lol-parties-series-button.tft-missions-button",
            );
            null != e &&
              (this.removeSound(e, "mouseenter"), this.removeSound(e, "click"));
            const t = this.element.querySelector(
              ".team-planner-button-container",
            );
            null != t &&
              (this.removeSound(t, "mousedown"),
              this.removeSound(t, "mouseenter"));
          },
          actions: {
            showTeamPlanner() {
              s.TeamPlanner && s.TeamPlanner.show("tft-home");
            },
          },
          isHidden: s.Ember.computed.alias("tftService.isHidden"),
          audioManager: s.Ember.computed("tftService", function () {
            return this.get("tftService").getTftAudioManager();
          }),
          teamPlannerButtonAssets: s.Ember.computed.alias(
            "tftService.teamPlannerButtonAssets",
          ),
        });
        t.default = d;
      },
      (e, t, n) => {
        "use strict";
        n.r(t);
      },
      (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        var s = n(1),
          a = n(2);
        const o = s.Audio.getChannel(a.SOUND_UX_CHANNEL);
        var l = s.Ember.Mixin.create({
          init() {
            this._super(...arguments),
              (this.listenersByEvents = new Map()),
              (this.soundMap = new Map());
          },
          willDestroy() {
            this._super(...arguments),
              this.listenersByEvents.clear(),
              this.soundMap.forEach((e) => {
                e.isPlaying() && e.stop();
              }),
              this.soundMap.clear();
          },
          loopIsPlaying: !1,
          shouldPlay: !0,
          soundFile: null,
          disableProperty: null,
          debounceSoundLoop: function (e, t, n) {
            this.set("shouldPlay", e),
              this.set("soundFile", t),
              this.set("disableProperty", n),
              s.Ember.run.debounce(this, this.handleSoundLoop, 150);
          },
          playSound(e, t) {
            (t && this.get(t)) || o.playSound(e);
          },
          playSoundLoop(e, t) {
            if (t && this.get(t)) return;
            if (this.get("loopIsPlaying")) return;
            const n = o.createSound(e, { isLoop: !0 });
            this.soundMap.set(e, n), n.play(), this.set("loopIsPlaying", !0);
          },
          stopSoundLoop(e) {
            const t = this.soundMap.get(e);
            t &&
              this.get("loopIsPlaying") &&
              (t.isPlaying() && t.stop(), this.set("loopIsPlaying", !1));
          },
          handleSoundLoop: function () {
            const e = this.get("shouldPlay"),
              t = this.get("soundFile"),
              n = this.get("disableProperty");
            e ? this.playSoundLoop(t, n) : this.stopSoundLoop(t);
          },
          addListenerToMap(e, t, n) {
            if (this.listenersByEvents.has(e)) {
              const s = this.listenersByEvents.get(e);
              if (s.has(t)) {
                s.get(t).push(n);
              } else s.set(t, [n]);
            } else this.listenersByEvents.set(e, new Map([[t, [n]]]));
          },
          addPlaySound(e, t, n, s) {
            const a = this.playSound.bind(this, n, s);
            this.addListenerToMap(t, e, a), e.addEventListener(t, a);
          },
          addPlaySoundLoop(e, t, n, s) {
            const a = this.debounceSoundLoop.bind(this, !0, n, s);
            this.addListenerToMap(t, e, a), e.addEventListener(t, a);
          },
          addStopSoundLoop(e, t, n) {
            const s = this.debounceSoundLoop.bind(this, !1, n, null);
            this.addListenerToMap(t, e, s), e.addEventListener(t, s);
          },
          removeSound(e, t) {
            const n = this.listenersByEvents.get(t).get(e);
            n &&
              n.length &&
              n.forEach((n) => {
                e.removeEventListener(t, n), (n = null);
              });
          },
        });
        t.default = l;
      },
      (e, t, n) => {
        const s = n(1).Ember;
        e.exports = s.HTMLBars.template({
          id: "p85V1+vh",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-tft\\\\src\\\\app\\\\components\\\\tft-home\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-tft\\\\src\\\\app\\\\components\\\\tft-home\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-tft\\\\src\\\\app\\\\components\\\\tft-home\\\\index.js\\" "],["text","\\n"],["block",["if"],[["get",["tftService","homeOverrideUrl"]]],null,6,5]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","    "],["open-element","div",[]],["static-attr","class","tft-prime-promo-wrapper"],["flush-element"],["text","\\n      "],["append",["helper",["tft-prime-promo"],null,[["storePromoData"],[["get",["primeGamingPromoOfferData"]]]]],false],["text","\\n    "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","  "],["open-element","lol-parties-series-button",[]],["static-attr","class","tft-missions-button"],["static-attr","series","TFTBattlepass_Weeklies_Series"],["static-attr","type","simple"],["static-attr","outerRadius","58px"],["static-attr","innerRadius","50px"],["flush-element"],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","  "],["open-element","div",[]],["static-attr","class","tft-missions-button"],["flush-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","team-planner-button-container"],["modifier",["action"],[["get",[null]],"showTeamPlanner"]],["flush-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","team-planner-button-container__button"],["flush-element"],["text","\\n        "],["open-element","div",[]],["static-attr","class","team-planner-button-container__button-icon"],["dynamic-attr","style",["concat",["--team-planner-button-icon-default: url(\'",["unknown",["teamPlannerButtonAssets","team-planner-icon-home"]],"\');\\n                 --team-planner-button-icon-clicked: url(\'",["unknown",["teamPlannerButtonAssets","team-planner-icon-clicked"]],"\');"]]],["flush-element"],["text","\\n        "],["close-element"],["text","\\n      "],["close-element"],["text","\\n    "],["close-element"],["text","\\n  "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","  "],["open-element","div",[]],["static-attr","class","tft-store-promos-wrapper"],["flush-element"],["text","\\n    "],["append",["helper",["tft-store-promo"],null,[["storePromoData"],[["get",["firstStorePromoData"]]]]],false],["text","\\n"],["text","    "],["append",["helper",["tft-store-promo"],null,[["storePromoData","redirectToRotationalShop"],[["get",["secondStorePromoData"]],true]]],false],["text","\\n  "],["close-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","tft-tactician-promo-wrapper"],["flush-element"],["text","\\n    "],["append",["helper",["tft-tactician-promo"],null,[["storePromoData"],[["get",["tacticianPromoData"]]]]],false],["text","\\n  "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","  "],["open-element","div",[]],["static-attr","class","tft-home-spinner"],["flush-element"],["text","\\n    "],["append",["unknown",["uikit-spinner"]],false],["text","\\n  "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["open-element","div",[]],["static-attr","class","tft-home"],["flush-element"],["text","\\n"],["block",["if"],[["get",["isLoading"]]],null,4,3],["text","  "],["open-element","div",[]],["static-attr","class","tft-home-footer-bg"],["dynamic-attr","style",["concat",["background-image: url(",["unknown",["homeFooter"]],")"]]],["flush-element"],["text","\\n  "],["close-element"],["text","\\n"],["block",["if"],[["get",["teamPlannerEnabled"]]],null,2,1],["text","  "],["open-element","div",[]],["static-attr","class","tft-quick-play-wrapper"],["flush-element"],["text","\\n    "],["append",["unknown",["tft-quick-play"]],false],["text","\\n  "],["close-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","tft-events-promo-wrapper"],["flush-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","tft-event-promo"],["flush-element"],["text","\\n      "],["append",["unknown",["tft-event-promo"]],false],["text","\\n    "],["close-element"],["text","\\n"],["block",["if"],[["get",["primeGamingPromoOfferData"]]],null,0],["text","  "],["close-element"],["text","\\n"],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","    "],["append",["helper",["managed-iframe"],null,[["url","isHidden","audioManager"],[["get",["tftService","homeOverrideUrl"]],["get",["isHidden"]],["get",["audioManager"]]]]],false],["text","\\n"]],"locals":[]}],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        var s = n(1),
          a = n(2);
        n(55);
        var o,
          l = (o = n(52)) && o.__esModule ? o : { default: o };
        var i = s.Ember.Component.extend(l.default, {
          classNames: [`${a.PLUGIN_NAME}-button`],
          layout: n(56),
          iconImageURL: null,
          iconRadius: "13px",
          outerCircleRadius: "32px",
          hasArrowEdge: !1,
          hasAddIcon: !0,
          minWidth: 125,
          minHeight: 38,
          didInsertElement() {
            this._super(...arguments);
            const e = this.element;
            this.addPlaySound(e, "mouseenter", a.TFT_BUTTON_HOVER_SFX_PATH),
              this.addPlaySound(e, "click", a.TFT_BUTTON_CLICK_SFX_PATH);
          },
          willDestroyElement() {
            this._super(...arguments);
            const e = this.element;
            this.removeSound(e, "mouseenter"), this.removeSound(e, "click");
          },
          actions: {
            click: function () {
              this.sendAction();
            },
          },
        });
        t.default = i;
      },
      (e, t, n) => {
        "use strict";
        n.r(t);
      },
      (e, t, n) => {
        const s = n(1).Ember;
        e.exports = s.HTMLBars.template({
          id: "KU5Lf7E4",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-tft\\\\src\\\\app\\\\components\\\\tft-button\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-tft\\\\src\\\\app\\\\components\\\\tft-button\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-tft\\\\src\\\\app\\\\components\\\\tft-button\\\\index.js\\" "],["text","\\n"],["open-element","div",[]],["dynamic-attr","class",["concat",[["helper",["if"],[["get",["hasArrowEdge"]],"tft-button-arrow","tft-button-no-arrow"],null]]]],["dynamic-attr","style",["concat",["--button-min-width: ",["unknown",["minWidth"]],"px; --button-min-height: ",["unknown",["minHeight"]],"px"]]],["flush-element"],["text","\\n"],["block",["if"],[["get",["hasArrowEdge"]]],null,1],["text","  "],["open-element","div",[]],["static-attr","class","tft-button-border"],["flush-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","tft-button-container"],["modifier",["action"],[["get",[null]],"click"]],["flush-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","tft-button-label"],["flush-element"],["yield","default"],["close-element"],["text","\\n"],["block",["if"],[["get",["hasAddIcon"]]],null,0],["text","    "],["close-element"],["text","\\n  "],["close-element"],["text","\\n"],["close-element"]],"locals":[],"named":[],"yields":["default"],"blocks":[{"statements":[["text","        "],["open-element","div",[]],["static-attr","class","tft-button"],["dynamic-attr","style",["concat",["--icon-radius: ",["unknown",["iconRadius"]],"; --outer-circle-radius: ",["unknown",["outerCircleRadius"]]]]],["flush-element"],["text","\\n          "],["open-element","img",[]],["dynamic-attr","src",["unknown",["iconImageURL"]],null],["static-attr","class","tft-button-icon"],["flush-element"],["close-element"],["text","\\n        "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","    "],["open-element","div",[]],["static-attr","class","tft-button-arrow-border"],["flush-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","tft-button-arrow-container"],["flush-element"],["close-element"],["text","\\n    "],["close-element"],["text","\\n"]],"locals":[]}],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        var s = n(1),
          a = n(2);
        n(58);
        var o = s.Ember.Component.extend({
          classNames: [`${a.PLUGIN_NAME}-news`],
          classNameBindings: ["showManagedIframe:iframe-view:cards-view"],
          layout: n(59),
          publishingService: s.Ember.inject.service("publishing"),
          tftService: s.Ember.inject.service("tft"),
          isHidden: s.Ember.computed.alias("tftService.isHidden"),
          audioManager: s.Ember.computed("tftService", function () {
            return this.get("tftService").getTftAudioManager();
          }),
          newsCards: s.Ember.computed("publishingService", function () {
            const e = this.get("publishingService");
            return e.pcsChannelData
              ? {
                  main: e.pcsChannelData.contentGroups[0].items.slice(-2),
                  footer: e.pcsChannelData.contentGroups[0].items.slice(0, 4),
                }
              : { main: [], footer: [] };
          }),
          hasMultipleMainCards: s.Ember.computed("newsCards", function () {
            return this.get("newsCards").main.length > 1;
          }),
          showManagedIframe: s.Ember.computed(
            "tftService.newsUrl",
            function () {
              return "" !== this.get("tftService.newsUrl");
            },
          ),
        });
        t.default = o;
      },
      (e, t, n) => {
        "use strict";
        n.r(t);
      },
      (e, t, n) => {
        const s = n(1).Ember;
        e.exports = s.HTMLBars.template({
          id: "C6kUWZK6",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-tft\\\\src\\\\app\\\\components\\\\tft-news\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-tft\\\\src\\\\app\\\\components\\\\tft-news\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-tft\\\\src\\\\app\\\\components\\\\tft-news\\\\index.js\\" "],["text","\\n"],["block",["if"],[["get",["showManagedIframe"]]],null,7,5]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","    "],["open-element","div",[]],["static-attr","class","spinner-container"],["flush-element"],["text","\\n        "],["append",["helper",["uikit-spinner"],null,[["width","height"],["50px","50px"]]],false],["text","\\n    "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","    "],["append",["helper",["uikit-error-page"],null,[["contentText"],[["get",["tra","publishing_content_failure"]]]]],false],["text","\\n"]],"locals":[]},{"statements":[["block",["if"],[["get",["publishingService","fetchFailed"]]],null,1,0]],"locals":[]},{"statements":[["text","                "],["open-element","div",[]],["static-attr","class","main-card"],["flush-element"],["text","\\n                    "],["open-element","p",[]],["static-attr","class","main-card-title"],["flush-element"],["append",["unknown",["card","title"]],false],["close-element"],["text","\\n                    "],["append",["helper",["pcs-card"],null,[["data","showTitle"],[["get",["card"]],false]]],false],["text","\\n                "],["close-element"],["text","\\n"]],"locals":["card"]},{"statements":[["text","    "],["open-element","div",[]],["static-attr","class","news-cards-fallback"],["flush-element"],["text","\\n        "],["open-element","main",[]],["dynamic-attr","class",["concat",["news-cards-main ",["helper",["if"],[["get",["hasMultipleMainCards"]],"multiple-cards"],null]]]],["flush-element"],["text","\\n"],["block",["each"],[["get",["newsCards","main"]]],null,3],["text","        "],["close-element"],["text","\\n\\n        "],["append",["helper",["pcs-cards-row"],null,[["channelData"],[["get",["newsCards","footer"]]]]],false],["text","\\n    "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["block",["if"],[["get",["publishingService","tftCardsReadyToShow"]]],null,4,2]],"locals":[]},{"statements":[["text","    "],["append",["helper",["managed-iframe"],null,[["url","isHidden","audioManager"],[["get",["tftService","newsUrl"]],["get",["isHidden"]],["get",["audioManager"]]]]],false],["text","\\n"]],"locals":[]},{"statements":[["block",["unless"],[["get",["isHidden"]]],null,6]],"locals":[]}],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        var s = n(1);
        n(61);
        var a,
          o = (a = n(62)) && a.__esModule ? a : { default: a };
        var l = s.Ember.Component.extend(o.default, {
          classNames: "rcp-fe-lol-tft-store-promo",
          layout: n(63),
        });
        t.default = l;
      },
      (e, t, n) => {
        "use strict";
        n.r(t);
      },
      (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        var s = n(1),
          a = n(2);
        const o = s.Audio.getChannel(a.SOUND_UX_CHANNEL),
          l = {
            COMPANION: "companions",
            HEXTECH_CRAFTING: "hextech",
            STAR_FRAGMENTS: "star_fragments",
            TFT_MAP_SKIN: "tft_map_skins",
          };
        var i = s.Ember.Mixin.create({
          redirectToRotationalShop: !1,
          tftService: s.Ember.inject.service("tft"),
          storePromoData: null,
          storePromoImageHover: s.Ember.computed.alias(
            "storePromoData.imageHover",
          ),
          storePromoImageActive: s.Ember.computed.alias(
            "storePromoData.imageActive",
          ),
          storePromoInventoryType: s.Ember.computed.alias(
            "storePromoData.inventoryType",
          ),
          storePromoItemId: s.Ember.computed.alias("storePromoData.itemId"),
          storePromoPriceRP: s.Ember.computed.alias("storePromoData.priceRP"),
          shouldShowStorePromoPriceRP: s.Ember.computed(
            "storePromoPriceRP",
            "storePromoInventoryType",
            function () {
              const e = this.get("storePromoInventoryType");
              return (
                e !== a.INVENTORY_TYPES.PRIME_GAMING &&
                this.get("storePromoPriceRP") >= 0 &&
                e !== a.INVENTORY_TYPES.TROVES
              );
            },
          ),
          storePromoName: s.Ember.computed.alias("storePromoData.name"),
          primeGamingUrl: s.Ember.computed.alias(
            "storePromoData.primeGamingUrl",
          ),
          linkToTrove: s.Ember.computed.equal(
            "storePromoInventoryType",
            a.INVENTORY_TYPES.TROVES,
          ),
          click() {
            const e = this.get("storePromoData.clickSfxPath");
            e && o.playSound(e), this.storePromoClicked();
          },
          mouseEnter() {
            const e = this.get("storePromoData.hoverSfxPath");
            e && o.playSound(e);
          },
          storePromoClicked() {
            const e = this.get("storePromoInventoryType"),
              t = this.get("storePromoItemId");
            s.Telemetry.sendCustomData(a.DEFAULT_TELEMETRY_TABLE, {
              eventName: a.TELEMETRY_TFT_STORE_PROMO_CLICKED,
              inventoryType: e,
              itemId: t,
            }),
              this.get("redirectToRotationalShop")
                ? this.navigateToTFTRotationalShop()
                : this.navigateToStore(e, t);
          },
          navigateToStore(e, t) {
            let n = l.COMPANION;
            e === a.INVENTORY_TYPES.HEXTECH_CRAFTING
              ? (n = l.COMPANION)
              : e in l && (n = l[e]),
              s.Router.navigateTo("rcp-fe-lol-store", {
                page: n,
                items: [{ inventoryType: e, itemId: t }],
              });
          },
          navigateToTFTRotationalShop() {
            this.container
              .lookup("router:main")
              .transitionTo(a.TFT_ROTATIONAL_SHOP_ROUTE);
          },
          actions: {
            primePromoClicked: function () {
              if (this.get("primeGamingUrl")) {
                s.dataBinding
                  .bindTo(s.socket)
                  .post("/lol-tft/v1/tft/homeHub/redirect");
              }
            },
          },
        });
        t.default = i;
      },
      (e, t, n) => {
        const s = n(1).Ember;
        e.exports = s.HTMLBars.template({
          id: "Nfbnxp08",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-tft\\\\src\\\\app\\\\components\\\\tft-store-promo\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-tft\\\\src\\\\app\\\\components\\\\tft-store-promo\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-tft\\\\src\\\\app\\\\components\\\\tft-store-promo\\\\index.js\\" "],["text","\\n  "],["open-element","div",[]],["static-attr","class","tft-store-promo-img"],["flush-element"],["text","\\n    "],["open-element","img",[]],["dynamic-attr","src",["unknown",["storePromoImageActive"]],null],["flush-element"],["close-element"],["text","\\n    "],["open-element","img",[]],["dynamic-attr","src",["unknown",["storePromoImageHover"]],null],["static-attr","class","tft-store-promo-img-hover"],["flush-element"],["close-element"],["text","\\n  "],["close-element"],["text","\\n\\n"],["block",["if"],[["get",["shouldShowStorePromoPriceRP"]]],null,0]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","    "],["open-element","div",[]],["static-attr","class","tft-store-promo-price"],["flush-element"],["text","\\n      "],["open-element","img",[]],["static-attr","src","/fe/lol-static-assets/images/icon-rp-32.png"],["static-attr","class","tft-rp-icon"],["flush-element"],["close-element"],["text","\\n      "],["append",["unknown",["storePromoPriceRP"]],false],["text","\\n    "],["close-element"],["text","\\n"]],"locals":[]}],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        var s = n(1),
          a = n(2);
        n(65);
        var o,
          l = (o = n(62)) && o.__esModule ? o : { default: o };
        var i = s.Ember.Component.extend(l.default, {
          classNames: [`${a.PLUGIN_NAME}-prime-promo`],
          layout: n(66),
          tftService: s.Ember.inject.service("tft"),
          primeGamingPromoOffer: s.Ember.computed.alias(
            "tftService.primeGamingPromoOffer",
          ),
        });
        t.default = i;
      },
      (e, t, n) => {
        "use strict";
        n.r(t);
      },
      (e, t, n) => {
        const s = n(1).Ember;
        e.exports = s.HTMLBars.template({
          id: "5nQYayyX",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-tft\\\\src\\\\app\\\\components\\\\tft-prime-promo\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-tft\\\\src\\\\app\\\\components\\\\tft-prime-promo\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-tft\\\\src\\\\app\\\\components\\\\tft-prime-promo\\\\index.js\\" "],["text","\\n"],["block",["if"],[["get",["primeGamingPromoOffer"]]],null,0]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["open-element","div",[]],["static-attr","class","tft-prime-promo"],["flush-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","tft-prime-promo-img"],["dynamic-attr","onclick",["helper",["action"],[["get",[null]],"primePromoClicked"],null],null],["flush-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","tft-prime-gaming-claim-now-label"],["flush-element"],["append",["unknown",["tra","tft_home_prime_gaming_claim_now"]],false],["close-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","tft-prime-gaming-rewards-label"],["flush-element"],["append",["unknown",["tra","tft_home_prime_gaming_rewards"]],false],["close-element"],["text","\\n  "],["close-element"],["text","\\n  "],["open-element","img",[]],["dynamic-attr","src",["unknown",["storePromoImageActive"]],null],["static-attr","class","tft-prime-promo-img-main"],["flush-element"],["close-element"],["text","\\n  "],["open-element","img",[]],["dynamic-attr","src",["unknown",["storePromoImageHover"]],null],["static-attr","class","tft-prime-promo-img-hover"],["flush-element"],["close-element"],["text","\\n"],["close-element"],["text","\\n"]],"locals":[]}],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        var s = n(1);
        n(68);
        var a,
          o = (a = n(62)) && a.__esModule ? a : { default: a };
        var l = s.Ember.Component.extend(o.default, {
          classNames: "rcp-fe-lol-tft-tactician-promo",
          layout: n(69),
        });
        t.default = l;
      },
      (e, t, n) => {
        "use strict";
        n.r(t);
      },
      (e, t, n) => {
        const s = n(1).Ember;
        e.exports = s.HTMLBars.template({
          id: "qOnJRg6E",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-tft\\\\src\\\\app\\\\components\\\\tft-tactician-promo\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-tft\\\\src\\\\app\\\\components\\\\tft-tactician-promo\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-tft\\\\src\\\\app\\\\components\\\\tft-tactician-promo\\\\index.js\\" "],["text","\\n"],["open-element","div",[]],["static-attr","class","tft-tactician-promo"],["flush-element"],["text","\\n"],["block",["if"],[["get",["linkToTrove"]]],null,6,4],["text","\\n"],["block",["if"],[["get",["shouldShowStorePromoPriceRP"]]],null,3],["text","\\n  "],["open-element","img",[]],["dynamic-attr","src",["unknown",["storePromoImageActive"]],null],["static-attr","class","tft-tactician-promo-img-main"],["flush-element"],["close-element"],["text","\\n  "],["open-element","img",[]],["dynamic-attr","src",["unknown",["storePromoImageHover"]],null],["static-attr","class","tft-tactician-promo-img-hover"],["flush-element"],["close-element"],["text","\\n\\n"],["block",["if"],[["get",["linkToTrove"]]],null,1,0],["close-element"]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","    "],["open-element","div",[]],["static-attr","class","tft-tactician-promo-label"],["flush-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","tft-tactician-promo-name"],["flush-element"],["text","\\n        "],["append",["unknown",["storePromoName"]],false],["text","\\n      "],["close-element"],["text","\\n    "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","    "],["open-element","div",[]],["static-attr","class","tft-troves-promo-label"],["flush-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","tft-troves-promo-name"],["flush-element"],["text","\\n        "],["append",["unknown",["storePromoName"]],false],["text","\\n      "],["close-element"],["text","\\n    "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","        "],["open-element","div",[]],["static-attr","class","tft-tactician-promo-price-label"],["flush-element"],["text","\\n          "],["open-element","img",[]],["static-attr","src","/fe/lol-static-assets/images/icon-rp-32.png"],["static-attr","class","tft-rp-icon"],["flush-element"],["close-element"],["text","\\n          "],["open-element","div",[]],["static-attr","class","tft-tactician-promo-price"],["flush-element"],["text","\\n            "],["append",["unknown",["storePromoPriceRP"]],false],["text","\\n          "],["close-element"],["text","\\n        "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","    "],["open-element","div",[]],["static-attr","class","tft-tactician-promo-price-wrapper"],["flush-element"],["text","\\n"],["block",["tft-button"],null,[["iconImageURL","action","iconRadius"],["/fe/lol-tft/images/home/TFT_Icon_Arrow.png","storePromoClicked","18px"]],2],["text","    "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","    "],["open-element","div",[]],["static-attr","class","tft-tactician-promo-img"],["modifier",["action"],[["get",[null]],"storePromoClicked"]],["flush-element"],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","      "],["open-element","div",[]],["static-attr","class","tft-tactician-promo-img"],["flush-element"],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["block",["link-to"],["troves",["helper",["query-params"],null,[["displayedBannerId"],[["get",["storePromoItemId"]]]]]],null,5]],"locals":[]}],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        var s = n(1),
          a = n(2);
        n(71);
        var o,
          l = (o = n(52)) && o.__esModule ? o : { default: o };
        var i = s.Ember.Component.extend(l.default, {
          classNameBindings: ["getClassNames"],
          getClassNames: s.Ember.computed("buttonClassName", function () {
            return "event-play" === this.get("buttonClassName")
              ? `${a.PLUGIN_NAME}-event-play`
              : `${a.PLUGIN_NAME}-quick-play`;
          }),
          layout: n(72),
          summonerService: s.Ember.inject.service("summoner"),
          tftService: s.Ember.inject.service("tft"),
          queueService: s.Ember.inject.service("queue"),
          playButtonService: s.Ember.inject.service("play-button"),
          patcherService: s.Ember.inject.service("patcher"),
          ModalManager: s.UIKit.getModalManager(),
          buttonClassName: "quick-play",
          queueIdOverride: null,
          queueButtonTextOverride: null,
          quickPlayFontSize: 20,
          isPlayButtonDisabled: s.Ember.computed.not(
            "playButtonService.isButtonEnabled",
          ),
          isPatching: s.Ember.computed(
            "patcherService.currentPatchIsGame",
            "patcherService.patcherState",
            function () {
              return (
                this.get("patcherService.currentPatchIsGame") &&
                "patching" === this.get("patcherService.patcherState")
              );
            },
          ),
          inLobby: s.Ember.computed.alias("queueService.inLobby"),
          isLobbyLeader: s.Ember.computed.alias("queueService.isLobbyLeader"),
          isNotLobbyLeader: s.Ember.computed(function () {
            return this.get("inLobby") && !this.get("isLobbyLeader");
          }),
          quickPlayDisabled: s.Ember.computed.or(
            "isPlayButtonDisabled",
            "isPatching",
            "isNotLobbyLeader",
          ),
          quickPlayButtonText: s.Ember.computed(
            "queueButtonTextOverride",
            function () {
              const e = this.get("queueButtonTextOverride");
              return e || this.get("tra.tft_home_quick_play_button_label");
            },
          ),
          lastTftGameQueueId: s.Ember.computed.alias(
            "tftService.lastTftGameQueueId",
          ),
          availableQueueIds: s.Ember.computed(function () {
            return s.Parties.getAvailableQueueIds(
              a.TFT_GAME_QUEUES_CATEGORY,
              a.TFT_MAP_ID,
              a.TFT_GAME_MODE,
            );
          }),
          quickPlayGameModeQueueId: s.Ember.computed(
            "lastTftGameQueueId",
            "queueIdOverride",
            "availableQueueIds",
            function () {
              const e = this.get("queueIdOverride"),
                t = this.get("availableQueueIds");
              let n = null;
              return (
                (n = e || this.get("lastTftGameQueueId")),
                n && t.includes(n) ? n : a.TFT_NORMAL_QUEUE_ID
              );
            },
          ),
          queues: s.Ember.computed.alias("queueService.queues"),
          quickPlayGameModeName: s.Ember.computed(
            "quickPlayGameModeQueueId",
            "queues",
            function () {
              const e = this.get("quickPlayGameModeQueueId"),
                t = this.get("queues"),
                n = e && Array.isArray(t) ? t.find((t) => t.id === e) : null;
              return n ? n.description : "";
            },
          ),
          showTooltip: s.Ember.computed.alias("quickPlayDisabled"),
          tooltipText: s.Ember.computed(
            "isNotLobbyLeader",
            "isPlayButtonDisabled",
            "isPatching",
            "playButtonService.isPlayGameflowEnabled",
            "playButtonService.isAtLeastOneQueueEnabled",
            "playButtonService.isPlayerBanned",
            "playButtonService.isShowingTournaments",
            "playButtonService.isEligibilityInfoMissing",
            "playButtonService.gameflowRegistrationStatus",
            "playButtonService.gameflowRegistrationStatus.errorCodes.[]",
            "tra",
            "playerBannedToolTipText",
            function () {
              if (this.get("isNotLobbyLeader"))
                return this.get("tra.tft_home_quick_play_not_leader_error");
              if (this.get("isPatching"))
                return this.get("tra.parties_game_select_patching_error");
              if (this.get("playButtonService.isPlayerBanned"))
                return this.get("playerBannedTooltipText");
              if (this.get("playButtonService.isEligibilityInfoMissing")) {
                const e = this.get(
                  "playButtonService.gameflowRegistrationStatus",
                );
                if (e) {
                  const t = { errorCodes: e.errorCodes.join(", ") };
                  return e.errorCodes.length > 1
                    ? this.get("tra").formatString(
                        "patcher_gameflow_bad_registration_plural",
                        t,
                      )
                    : this.get("tra").formatString(
                        "patcher_gameflow_bad_registration_single",
                        t,
                      );
                }
              } else {
                if (this.get("playButtonService.isShowingTournaments"))
                  return this.get("tra.patcher_player_in_tournament");
                if (!this.get("playButtonService.isPlayGameflowEnabled"))
                  return this.get("tra.patcher_gameflow_disabled");
                if (!this.get("playButtonService.isAtLeastOneQueueEnabled"))
                  return this.get("tra.patcher_no_queues");
              }
              return this.get("tra.patcher_disconnected");
            },
          ),
          playerBannedTooltipText: s.Ember.computed(
            "playButtonService.isPlayerPermabanned",
            "playButtonService.banTimeRemaining",
            "tra",
            function () {
              if (this.get("playButtonService.isPlayerPermaBanned"))
                return this.get("tra.patcher_player_banned");
              {
                const e = Math.ceil(
                  this.get("playButtonService.banTimeRemaining") / 864e5,
                );
                return e > 0
                  ? this.get("tra").formatString("patcher_player_time_banned", {
                      days: e,
                    })
                  : this.get("tra.patcher_player_banned");
              }
            },
          ),
          showQuickPlayErrorModal: function (e, t, n) {
            const s = this.get("tra.parties_game_select_error_modal_ok"),
              a = this.get("ModalManager").add({
                type: "DialogAlert",
                data: { contents: e, okText: s },
              });
            return (
              a && a.domNode && n && a.domNode.classList.add(n),
              t &&
                a &&
                a.okPromise &&
                a.okPromise.then(() => {
                  t();
                }),
              a
            );
          },
          quickPlayErrorHandler: function (e) {
            s.logger.error("quickPlay error", e),
              this.showQuickPlayErrorModal(
                this.get("tra.parties_game_select_confirm_error"),
              );
          },
          didInsertElement() {
            this._super(...arguments);
            const e = this.element.querySelector(
              "button.quick-play-button-btn",
            );
            this.addPlaySound(
              e,
              "mouseenter",
              a.QUICK_PLAY_HOVER_SFX_PATH,
              "quickPlayDisabled",
            ),
              this.addPlaySound(
                e,
                "click",
                a.QUICK_PLAY_CLICK_SFX_PATH,
                "quickPlayDisabled",
              ),
              this.resolveQuickPlayTextWidth();
          },
          willDestroyElement() {
            this._super(...arguments);
            const e = this.element.querySelector(
              "button.quick-play-button-btn",
            );
            this.removeSound(e, "mouseenter"), this.removeSound(e, "click");
          },
          resolveQuickPlayTextWidth() {
            const e = this.element.querySelector(".quick-play-button-label");
            for (; Math.ceil(e.getBoundingClientRect().width) > 140; ) {
              const t = this.get("quickPlayFontSize");
              this.set("quickPlayFontSize", t - 1),
                (e.style.fontSize = t - 1 + "px");
            }
          },
          createQuickPlayLobby() {
            return s.Parties.createLobby(this.get("quickPlayGameModeQueueId"))
              .then(() => {
                s.Parties.showParty().catch((e) => {
                  this.quickPlayErrorHandler(e);
                });
              })
              .catch((e) => {
                this.quickPlayErrorHandler(e);
              });
          },
          actions: {
            quickPlayButtonClicked: function () {
              this.get("quickPlayDisabled")
                ? s.logger.info(
                    "playButtonService.isPatching",
                    this.get("playButtonService.isPatching"),
                  )
                : this.createQuickPlayLobby();
            },
          },
        });
        t.default = i;
      },
      (e, t, n) => {
        "use strict";
        n.r(t);
      },
      (e, t, n) => {
        const s = n(1).Ember;
        e.exports = s.HTMLBars.template({
          id: "VtJ/0smN",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-tft\\\\src\\\\app\\\\components\\\\tft-quick-play\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-tft\\\\src\\\\app\\\\components\\\\tft-quick-play\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-tft\\\\src\\\\app\\\\components\\\\tft-quick-play\\\\index.js\\" "],["text","\\n"],["open-element","div",[]],["flush-element"],["text","\\n  "],["open-element","div",[]],["dynamic-attr","class",["concat",["quick-play-game-mode-text ",["helper",["if"],[["get",["quickPlayDisabled"]],"disabled"],null]]]],["flush-element"],["append",["unknown",["quickPlayGameModeName"]],false],["close-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","quick-play-button"],["flush-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","quick-play-button-container"],["flush-element"],["text","\\n      "],["open-element","div",[]],["dynamic-attr","class",["concat",["quick-play-button-bg ",["helper",["if"],[["get",["quickPlayDisabled"]],"disabled"],null]]]],["flush-element"],["text","\\n        "],["open-element","button",[]],["dynamic-attr","class",["concat",["quick-play-button-btn ",["helper",["if"],[["get",["quickPlayDisabled"]],"disabled"],null]]]],["modifier",["action"],[["get",[null]],"quickPlayButtonClicked"]],["flush-element"],["text","\\n        "],["open-element","span",[]],["static-attr","class","quick-play-button-label"],["dynamic-attr","style",["concat",["font-size: ",["unknown",["quickPlayFontSize"]],"px;"]]],["flush-element"],["text","\\n          "],["append",["unknown",["quickPlayButtonText"]],false],["text","\\n        "],["close-element"],["text","\\n          \\n"],["block",["if"],[["get",["showTooltip"]]],null,1],["text","        "],["close-element"],["text","\\n      "],["close-element"],["text","\\n    "],["close-element"],["text","\\n  "],["close-element"],["text","\\n"],["close-element"]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","            "],["open-element","lol-uikit-content-block",[]],["static-attr","type","tooltip-small"],["flush-element"],["text","\\n              "],["open-element","p",[]],["flush-element"],["text","\\n                "],["append",["unknown",["tooltipText"]],false],["text","\\n              "],["close-element"],["text","\\n            "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["block",["uikit-tooltip"],null,[["tooltipPosition"],["top"]],0]],"locals":[]}],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        var s = n(1),
          a = n(2);
        n(74);
        var o = n(75);
        var l = s.Ember.Component.extend({
          classNames: [`${a.PLUGIN_NAME}-event-promo`],
          layout: n(76),
          tftService: s.Ember.inject.service("tft"),
          eventPromoTileAssets: s.Ember.computed.alias(
            "tftService.eventPromoTileAssets",
          ),
          eventsData: s.Ember.computed.alias("tftService.eventsData"),
          promoButtonsData: s.Ember.computed.alias(
            "tftService.promoButtonsData",
          ),
          eventAssetId: s.Ember.computed("promoButtonsData", function () {
            const e = this.get("promoButtonsData");
            return e ? e[0].eventAssetId : "fallback-event";
          }),
          eventPromoImage: s.Ember.computed(
            "eventPromoTileAssets",
            function () {
              const e = this.get("eventPromoTileAssets"),
                t = this.get("eventAssetId");
              return e && t ? e[t] : "";
            },
          ),
          eventPromoImagePressed: s.Ember.computed(
            "eventPromoTileAssets",
            function () {
              const e = this.get("eventPromoTileAssets"),
                t = this.get("eventAssetId");
              return e && t ? e[t + "-pressed"] : "";
            },
          ),
          eventRoute: a.TFT_EVENT_ROUTE,
          eventPromoName: s.Ember.computed("promoButtonsData", function () {
            const e = this.get("promoButtonsData");
            if (e)
              if (e.length > 1)
                s.logger.error(
                  "Currently only displaying one promo button in the TFT Hub is supported - received " +
                    e.length +
                    " promoButtons.",
                );
              else if (1 === e.length) return s.tra.get(e[0].eventKey);
            return null;
          }),
          eventRouteUrl: s.Ember.computed("promoButtonsData", function () {
            const e = this.get("promoButtonsData");
            if (e)
              if (e.length > 1)
                s.logger.error(
                  "Currently only displaying one promo button in the TFT Hub is supported - received " +
                    e.length +
                    " promoButtons.",
                );
              else if (1 === e.length) return e[0].url;
            return null;
          }),
          eventPromoEnabled: s.Ember.computed("promoButtonsData", function () {
            const e = this.get("promoButtonsData");
            if (e)
              if (e.length > 1)
                s.logger.error(
                  "Currently only displaying one promo button in the TFT Hub is supported - received " +
                    e.length +
                    " promoButtons.",
                );
              else if (1 === e.length) return e[0].enabled;
            return !1;
          }),
          eventEnabled: s.Ember.computed("eventsData", function () {
            const e = this.get("eventsData");
            return (
              !!(e && Array.isArray(e) && e.length) &&
              (e.length > 1 &&
                s.logger.error(
                  "Currently only displaying one event in the TFT Hub is supported - received " +
                    e.length +
                    " events.",
                ),
              e[0].enabled)
            );
          }),
          mouseEnter() {
            o.SFX.buttonHover.play();
          },
          actions: {
            preEventPromoClicked: function () {
              s.ModalManager.add({
                type: "DialogAlert",
                data: {
                  contents: s.TemplateHelper.contentBlockDialog(
                    "",
                    s.tra.get("tft_event_pre_popup_text"),
                    "dialog-small",
                    "pre-event-popup-content",
                  ),
                  okText: s.tra.get("tft_event_pre_popup_ok_text"),
                  dismissible: !0,
                },
                show: !0,
              });
            },
            eventPromoClicked: function () {
              s.AudioPlugin.getChannel("sfx-ui").playSound(
                "/fe/lol-uikit/sfx-uikit-click-and-slide.ogg",
              ),
                s.Telemetry.sendCustomData(a.DEFAULT_TELEMETRY_TABLE, {
                  eventName: a.TELEMETRY_TFT_EVENT_PROMO_CLICKED,
                  eventRouteUrl: this.get("eventRouteUrl"),
                });
            },
            mouseEnter: function () {
              s.AudioPlugin.getChannel("sfx-ui").playSound(
                "/fe/lol-static-assets/sounds/sfx-uikit-button-gold-hover.ogg",
              );
            },
          },
        });
        t.default = l;
      },
      (e, t, n) => {
        "use strict";
        n.r(t);
      },
      (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }), (t.SFX = void 0);
        var s = n(1),
          a = n(2);
        const o = s.AudioPlugin.getChannel(
          a.AUDIO_CHANNELS.SFX_SUB_CHANNEL_UI_NAME,
        );
        function l(e) {
          return o.createSound(e, { allowConcurrency: !1 });
        }
        const i = {
          buttonClick: l(
            "/fe/lol-static-assets/sounds/sfx-uikit-button-big-click.ogg",
          ),
          buttonHover: l(
            "/fe/lol-static-assets/sounds/sfx-uikit-button-generic-hover.ogg",
          ),
          circleButtonClick: l(
            "/fe/lol-static-assets/sounds/sfx-uikit-button-circlegold-click.ogg",
          ),
          circleButtonHover: l(
            "/fe/lol-static-assets/sounds/sfx-uikit-button-circlegold-hover.ogg",
          ),
          buttonGoldHover: l(
            "/fe/lol-static-assets/sounds/sfx-uikit-button-gold-hover.ogg",
          ),
          buttonGenericClick: l(
            "/fe/lol-static-assets/sounds/sfx-uikit-button-generic-click.ogg",
          ),
        };
        t.SFX = i;
      },
      (e, t, n) => {
        const s = n(1).Ember;
        e.exports = s.HTMLBars.template({
          id: "oRxZebw3",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-tft\\\\src\\\\app\\\\components\\\\tft-event-promo\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-tft\\\\src\\\\app\\\\components\\\\tft-event-promo\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-tft\\\\src\\\\app\\\\components\\\\tft-event-promo\\\\index.js\\" "],["text","\\n"],["block",["if"],[["get",["eventPromoEnabled"]]],null,3]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","    "],["open-element","div",[]],["static-attr","class","event-promo-container clickable"],["dynamic-attr","onclick",["helper",["action"],[["get",[null]],"preEventPromoClicked"],null],null],["dynamic-attr","style",["concat",["--event-promo-image: url(\'",["unknown",["eventPromoImage"]],"\'); --event-promo-image-pressed: url(\'",["unknown",["eventPromoImagePressed"]],"\');"]]],["flush-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","event-promo-text"],["flush-element"],["append",["helper",["sanitize"],[["get",["eventPromoName"]]],null],false],["close-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","time-remaining-widget"],["flush-element"],["text","\\n        "],["append",["unknown",["tft-time-remaining-widget"]],false],["text","\\n      "],["close-element"],["text","\\n    "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","    "],["open-element","div",[]],["static-attr","class","event-promo-container clickable"],["dynamic-attr","onclick",["helper",["action"],[["get",[null]],"eventPromoClicked"],null],null],["dynamic-attr","style",["concat",["--event-promo-image: url(\'",["unknown",["eventPromoImage"]],"\'); --event-promo-image-pressed: url(\'",["unknown",["eventPromoImagePressed"]],"\');"]]],["flush-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","event-promo-text"],["flush-element"],["append",["helper",["sanitize"],[["get",["eventPromoName"]]],null],false],["close-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","time-remaining-widget"],["flush-element"],["text","\\n        "],["append",["unknown",["tft-time-remaining-widget"]],false],["text","\\n      "],["close-element"],["text","\\n    "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["block",["link-to"],[["get",["eventRoute"]],["helper",["query-params"],null,[["url"],[["get",["eventRouteUrl"]]]]]],null,1]],"locals":[]},{"statements":[["block",["if"],[["get",["eventEnabled"]]],null,2,0]],"locals":[]}],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        var s = n(1),
          a = n(2),
          o = n(78);
        n(79);
        var l = s.Ember.Component.extend({
          classNames: [`${a.PLUGIN_NAME}-header-buttons`],
          layout: n(80),
          tftService: s.Ember.inject.service("tft"),
          trovesService: s.Ember.inject.service("tftTroves"),
          rss: s.Ember.inject.service("rotationalShop"),
          starShardsEnabled: s.Ember.computed.alias(
            "tftService.starShardsEnabled",
          ),
          formattedStarShardsAmount: s.Ember.computed.alias(
            "tftService.formattedStarShardsAmountString",
          ),
          linkToStoreHome: !1,
          routing: s.Ember.inject.service("-routing"),
          currentRouteName: s.Ember.computed.alias("routing.currentRouteName"),
          formattedTrovesTokensAmount: s.Ember.computed.alias(
            "trovesService.formattedTrovesTokensAmountString",
          ),
          rpAmount: s.Ember.computed.alias("tftService.rpAmount"),
          ModalManager: s.UIKit.getModalManager(),
          isEnabled: s.Ember.computed(
            "tftService.isHeaderButtonsEnabled",
            "trovesService.trovesV2Enabled",
            function () {
              return (
                !this.get("trovesService.trovesV2Enabled") &&
                this.get("tftService.isHeaderButtonsEnabled")
              );
            },
          ),
          trovesEnabled: s.Ember.computed(
            "trovesService.trovesEnabled",
            function () {
              return (
                !!this.get("trovesService") &&
                this.get("trovesService.trovesEnabled")
              );
            },
          ),
          showStore: s.Ember.computed("currentRouteName", function () {
            return "troves" !== this.get("currentRouteName");
          }),
          showStarShards: s.Ember.computed(
            "starShardsEnabled",
            "currentRouteName",
            function () {
              return (
                this.get("starShardsEnabled") &&
                "troves" !== this.get("currentRouteName")
              );
            },
          ),
          showTrovesTokens: s.Ember.computed(
            "trovesEnabled",
            "currentRouteName",
            function () {
              return (
                this.get("trovesEnabled") &&
                "troves" === this.get("currentRouteName")
              );
            },
          ),
          audioManager: s.Ember.computed("tftService", function () {
            return this.get("tftService").getTftAudioManager();
          }),
          init() {
            this._super(...arguments);
          },
          actions: {
            navigateToTftStore() {
              this.get("linkToStoreHome")
                ? s.Router.navigateTo("rcp-fe-lol-store")
                : s.Router.navigateTo("rcp-fe-lol-store", {
                    page: "companions",
                  });
            },
            navigateToStarShardsStore() {
              s.Router.navigateTo("rcp-fe-lol-store", {
                page: "star_fragments",
              });
            },
            showTrovesTokensPurchaseDialog() {
              const e = this.get("ModalManager"),
                t = e.add({
                  type: a.ITEM_PURCHASE_NAME,
                  data: {
                    tftService: this.get("tftService"),
                    trovesService: this.get("trovesService"),
                  },
                  ComponentFactory: s.componentFactory,
                });
              t.domNode.addEventListener("closeButtonClick", function () {
                e.remove(t);
              }),
                s.Telemetry.sendCustomData(o.TELEMETRY_TABLE_NAME, {
                  [o.TELEMETRY_EVENT_KEY_EVENT_NAME]:
                    o.TELEMETRY_EVENT_NAME_OPEN_PURCHASE_MODAL,
                });
            },
          },
        });
        t.default = l;
      },
      (e, t) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.TYPE_ID_TREASURE_TOKEN =
            t.TYPE_ID_TO_MILESTONE_SLIDER_VALUE =
            t.TYPE_ID_STARSHARDS =
            t.TYPE_ID_REALMCRYSTAL =
            t.TYPE_ID_PROMISETOKEN =
            t.TYPE_ID_MYTHICMEDALLION =
            t.TYPE_ID_MAPSKIN =
            t.TYPE_ID_DAMAGESKIN =
            t.TYPE_ID_COMPANION =
            t.TYPE_CURRENCIES =
            t.TFT_TROVES_TOKENS_WALLETS_KEY =
            t.TFT_TROVES_GDS_PROMO_ASSETS_KEY =
            t.TFT_MYTHIC_TOKENS_WALLETS_KEY =
            t.TELEMETRY_TABLE_NAME =
            t.TELEMETRY_EVENT_NAME_USE_MYTHIC =
            t.TELEMETRY_EVENT_NAME_TROVES_VISITED =
            t.TELEMETRY_EVENT_NAME_SHOW_DETAILS =
            t.TELEMETRY_EVENT_NAME_ROLL_TEN =
            t.TELEMETRY_EVENT_NAME_ROLL_ONE =
            t.TELEMETRY_EVENT_NAME_OPEN_PURCHASE_MODAL =
            t.TELEMETRY_EVENT_NAME_MYTHIC_BUTTON =
            t.TELEMETRY_EVENT_NAME_BANNER_SELECTED =
            t.TELEMETRY_EVENT_KEY_VISIT_ID =
            t.TELEMETRY_EVENT_KEY_PITY_COUNT =
            t.TELEMETRY_EVENT_KEY_EVENT_NAME =
            t.TELEMETRY_EVENT_KEY_ACTIVE_BANNER_SOURCE_ID =
            t.STAR_LEVEL_3 =
            t.STAR_LEVEL_2 =
            t.STAR_LEVEL_1 =
            t.SINGLE_ROLL_COUNT =
            t.ROLL_REWARD_RARITY_STRING_RARE =
            t.ROLL_REWARD_RARITY_STRING_MYTHIC =
            t.ROLL_REWARD_RARITY_STRING_LEGENDARY =
            t.ROLL_REWARD_RARITY_STRING_EPIC =
            t.ROLL_REWARD_RARITY_RARE =
            t.ROLL_REWARD_RARITY_MYTHIC =
            t.ROLL_REWARD_RARITY_LEGENDARY =
            t.ROLL_REWARD_RARITY_EPIC =
            t.PULL_TYPE_SINGLE =
            t.PULL_TYPE_MYTHIC =
            t.PULL_TYPE_MULTI =
            t.POST_PORTAL_SEGMENT_OFFSET_MS =
            t.PATHS =
            t.MULTI_ROLL_COUNT =
            t.MILESTONE_ENDPOINTS =
            t.MAX_WAITING_TIME_IN_MS =
            t.HIGHLIGHT_SLIDER_VALUE_SINGLE_PROMISETOKEN =
            t.HIGHLIGHT_SLIDER_VALUE_SINGLE_MAPSKIN =
            t.HIGHLIGHT_SLIDER_VALUE_SINGLE_COMPANION =
            t.HIGHLIGHT_SLIDER_VALUE_MULTI_PROMISETOKEN =
            t.HIGHLIGHT_SLIDER_VALUE_MULTI_MAPSKIN =
            t.HIGHLIGHT_SLIDER_VALUE_MULTI_COMPANION =
            t.HIGHLIGHT_SEGMENT_PAUSE_OFFSET_MS =
            t.GDS_TROVES_BACKGROUND_ASSET_KEY =
            t.CEREMONY_STATE_STANDARD =
            t.CEREMONY_STATE_PORTAL =
            t.CEREMONY_STATE_NONE =
            t.CEREMONY_STATE_HIGHLIGHT =
            t.CEREMONY_STATE_CURRENCY =
            t.CEREMONIES_DUPLICATE_CURRENCY_AMOUNTS =
            t.CAP_STATUS_FAILED =
            t.CAP_STATUS_COMPLETE =
              void 0);
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
        const n = "db40bd66-f3ac-5bca-a104-2eebca8cc1d2";
        t.TYPE_ID_REALMCRYSTAL = n;
        const s = "686fa0fd-5138-52a0-bf58-eeab665eb93b";
        t.TYPE_ID_MYTHICMEDALLION = s;
        const a = "8b5ab62b-c56c-5abd-bec2-f1a1ff82ccfd";
        t.TYPE_ID_TREASURE_TOKEN = a;
        const o = [n, s, a];
        t.TYPE_CURRENCIES = o;
        const l = { [n]: 2, [s]: 3 };
        t.TYPE_ID_TO_MILESTONE_SLIDER_VALUE = l;
        t.HIGHLIGHT_SLIDER_VALUE_SINGLE_COMPANION = 2;
        t.HIGHLIGHT_SLIDER_VALUE_SINGLE_MAPSKIN = 3;
        t.HIGHLIGHT_SLIDER_VALUE_SINGLE_PROMISETOKEN = 4;
        t.HIGHLIGHT_SLIDER_VALUE_MULTI_COMPANION = 5;
        t.HIGHLIGHT_SLIDER_VALUE_MULTI_MAPSKIN = 6;
        t.HIGHLIGHT_SLIDER_VALUE_MULTI_PROMISETOKEN = 7;
        t.SINGLE_ROLL_COUNT = 1;
        t.MULTI_ROLL_COUNT = 10;
        t.TFT_TROVES_GDS_PROMO_ASSETS_KEY = "lcu-assets-tft-troves-promos";
        const i = "TFT_TREASURE_TROVE_TOKEN";
        t.TFT_TROVES_TOKENS_WALLETS_KEY = i;
        const r = "TFT_MYTHIC_TREASURE_TROVE_TOKEN";
        t.TFT_MYTHIC_TOKENS_WALLETS_KEY = r;
        const c = {
          ROLL: "/lol-tft-troves/v1/roll",
          ROLL_REWARDS: "/lol-tft-troves/v1/roll-rewards",
          TEST_SEND: "/lol-datatest/v1/send-data/01",
          CATALOG: "/lol-catalog/v1/item-details",
          GENERIC_ASSETS: "/lol-game-data/assets/v1/generic-assets.json",
          TROVES_CONFIG:
            "/lol-client-config/v3/client-config/lol.client_settings.tft.tft_troves",
          TROVES_TOKENS: "/lol-inventory/v1/wallet/" + i,
          MYTHIC_TOKENS: "/lol-inventory/v1/wallet/" + r,
          TROVES_BANNERS: "/lol-tft-troves/v1/banners",
          STATUS_NOTIFICATIONS: "/lol-tft-troves/v1/status-notifications",
          TROVES_NOCAP_SWITCH_TOGGLE: "/lol-tft-troves/v1/toggle-no-cap-switch",
        };
        t.PATHS = c;
        t.TELEMETRY_TABLE_NAME = "tft_troves";
        t.TELEMETRY_EVENT_NAME_BANNER_SELECTED = "troves_select_banner";
        t.TELEMETRY_EVENT_NAME_MYTHIC_BUTTON = "click_mythic_button";
        t.TELEMETRY_EVENT_NAME_ROLL_ONE = "click_roll_1";
        t.TELEMETRY_EVENT_NAME_ROLL_TEN = "click_roll_10";
        t.TELEMETRY_EVENT_NAME_SHOW_DETAILS = "click_show_details";
        t.TELEMETRY_EVENT_NAME_TROVES_VISITED = "troves_visited";
        t.TELEMETRY_EVENT_NAME_USE_MYTHIC = "click_use_mythic";
        t.TELEMETRY_EVENT_NAME_OPEN_PURCHASE_MODAL =
          "click_open_purchase_modal";
        t.TELEMETRY_EVENT_KEY_EVENT_NAME = "eventName";
        t.TELEMETRY_EVENT_KEY_ACTIVE_BANNER_SOURCE_ID = "active_banner_id";
        t.TELEMETRY_EVENT_KEY_VISIT_ID = "visit_id";
        t.TELEMETRY_EVENT_KEY_PITY_COUNT = "pity_count";
        t.MILESTONE_ENDPOINTS = {
          TROVES_MILESTONES: "/lol-tft-troves/v1/milestones",
          TROVES_MILESTONE_NOTIFICATIONS:
            "/lol-tft-troves/v1/milestone-notifications",
        };
        const m = { [n]: [150, 250, 500], [s]: [10, 25] };
        t.CEREMONIES_DUPLICATE_CURRENCY_AMOUNTS = m;
      },
      (e, t, n) => {
        "use strict";
        n.r(t);
      },
      (e, t, n) => {
        const s = n(1).Ember;
        e.exports = s.HTMLBars.template({
          id: "2K5VuFKY",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-tft\\\\src\\\\app\\\\components\\\\tft-header-buttons\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-tft\\\\src\\\\app\\\\components\\\\tft-header-buttons\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-tft\\\\src\\\\app\\\\components\\\\tft-header-buttons\\\\index.js\\" "],["text","\\n"],["block",["if"],[["get",["isEnabled"]]],null,9]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","            "],["open-element","div",[]],["static-attr","class","tft-star-shards-button-label"],["flush-element"],["text","\\n              "],["open-element","img",[]],["static-attr","src","/fe/lol-tft-troves/images/TFT_Icon_trovesTokens.png"],["static-attr","class","tft-star-shards-icon"],["flush-element"],["close-element"],["text","\\n              "],["open-element","div",[]],["static-attr","class","tft-star-shards-amount"],["flush-element"],["text","\\n                "],["append",["unknown",["formattedTrovesTokensAmount"]],false],["text","\\n              "],["close-element"],["text","\\n            "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","            "],["open-element","lol-uikit-content-block",[]],["static-attr","type","tooltip-small"],["flush-element"],["text","\\n              "],["open-element","p",[]],["flush-element"],["append",["unknown",["tra","troves_tokens_description"]],false],["close-element"],["text","\\n            "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","        "],["open-element","div",[]],["static-attr","class","tft-star-shards-button"],["flush-element"],["text","\\n"],["block",["tft-tooltip"],null,[["tooltipId"],["tft-troves-tokens-desc"]],1],["block",["tft-button"],null,[["iconImageURL","action","outerCircleRadius"],["/fe/lol-uikit/images/icon_add.png","showTrovesTokensPurchaseDialog","30px"]],0],["text","        "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","            "],["open-element","div",[]],["static-attr","class","tft-star-shards-button-label"],["flush-element"],["text","\\n              "],["open-element","img",[]],["static-attr","src","/fe/lol-tft/images/home/TFT_Icon_starShards.png"],["static-attr","class","tft-star-shards-icon"],["flush-element"],["close-element"],["text","\\n              "],["open-element","div",[]],["static-attr","class","tft-star-shards-amount"],["flush-element"],["text","\\n                "],["append",["unknown",["formattedStarShardsAmount"]],false],["text","\\n              "],["close-element"],["text","\\n            "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","        "],["open-element","div",[]],["static-attr","class","tft-star-shards-button"],["flush-element"],["text","\\n"],["block",["tft-button"],null,[["iconImageURL","action","outerCircleRadius"],["/fe/lol-uikit/images/icon_add.png","navigateToStarShardsStore","30px"]],3],["text","        "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","          "],["open-element","div",[]],["static-attr","class","tft-store-button-label"],["flush-element"],["text","\\n            "],["append",["unknown",["tra","tft_home_store_button_label"]],false],["text","\\n          "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","      "],["open-element","div",[]],["static-attr","class","tft-store-button"],["flush-element"],["text","\\n"],["block",["tft-button"],null,[["iconImageURL","action","hasArrowEdge","outerCircleRadius","iconRadius"],["/fe/lol-tft/images/home/TFT_Icon_Coins.png","navigateToTftStore",true,"30px","15px"]],5],["text","      "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["block",["if"],[["get",["showStore"]]],null,6],["block",["if"],[["get",["showStarShards"]]],null,4],["block",["if"],[["get",["showTrovesTokens"]]],null,2]],"locals":[]},{"statements":[["text","      "],["open-element","div",[]],["flush-element"],["text","\\n        "],["append",["helper",["managed-iframe"],null,[["url","isHidden","audioManager"],[["get",["tftService","headerButtonsOverrideUrl"]],false,["get",["audioManager"]]]]],false],["text","\\n      "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","  "],["open-element","div",[]],["static-attr","class","tft-buttons-wrapper"],["flush-element"],["text","\\n"],["block",["if"],[["get",["tftService","headerButtonsOverrideUrl"]]],null,8,7],["text","  "],["close-element"],["text","\\n"]],"locals":[]}],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        var s = n(1);
        n(82);
        var a = s.Ember.Component.extend({
          classNames: ["rcp-fe-lol-tft-test-page"],
          tftService: s.Ember.inject.service("tft"),
          layout: n(83),
          showPage: null,
          isHidden: s.Ember.computed.alias("tftService.isHidden"),
          audioManager: s.Ember.computed("tftService", function () {
            return this.get("tftService").getTftAudioManager();
          }),
          actions: {
            renderPage(e) {
              this.set("showPage", e);
            },
          },
        });
        t.default = a;
      },
      (e, t, n) => {
        "use strict";
        n.r(t);
      },
      (e, t, n) => {
        const s = n(1).Ember;
        e.exports = s.HTMLBars.template({
          id: "KoMwukVI",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-tft\\\\src\\\\app\\\\components\\\\tft-test-page\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-tft\\\\src\\\\app\\\\components\\\\tft-test-page\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-tft\\\\src\\\\app\\\\components\\\\tft-test-page\\\\index.js\\" "],["text","\\n"],["block",["unless"],[["get",["showPage"]]],null,3],["block",["if"],[["helper",["eq"],[["get",["showPage"]],"test"],null]],null,2],["block",["if"],[["helper",["eq"],[["get",["showPage"]],"defaultError"],null]],null,1],["block",["if"],[["helper",["eq"],[["get",["showPage"]],"customError"],null]],null,0]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","    "],["append",["helper",["uikit-error-page"],null,[["contentText","buttonText"],["Here comes some content","Click here"]]],false],["text","\\n"]],"locals":[]},{"statements":[["text","    "],["append",["unknown",["uikit-error-page"]],false],["text","\\n"]],"locals":[]},{"statements":[["text","    "],["append",["helper",["managed-iframe"],null,[["id","url","errorTimeoutMilliseconds"],["test-iframe","https://staging.frontpage.na.leagueoflegends.com/en_US/test/home-window-messenger",5000]]],false],["text","\\n"]],"locals":[]},{"statements":[["text","    "],["open-element","div",[]],["static-attr","class","rcp-fe-lol-tft-test-page__button-container"],["flush-element"],["text","\\n    "],["open-element","button",[]],["modifier",["action"],[["get",[null]],"renderPage","test"]],["flush-element"],["text","\\n        Show Test Page\\n    "],["close-element"],["text","\\n    "],["open-element","button",[]],["modifier",["action"],[["get",[null]],"renderPage","defaultError"]],["flush-element"],["text","\\n        Show Default Error Page\\n    "],["close-element"],["text","\\n    "],["open-element","button",[]],["modifier",["action"],[["get",[null]],"renderPage","customError"]],["flush-element"],["text","\\n        Show Custom Error Page\\n    "],["close-element"],["text","\\n    "],["close-element"],["text","\\n"]],"locals":[]}],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        var s = n(1);
        n(85);
        var a = s.Ember.Component.extend({
          classNames: ["rcp-fe-lol-tft-event-page"],
          tftService: s.Ember.inject.service("tft"),
          layout: n(86),
          telemetryEventPassTimeSpent: null,
          url: null,
          eventsData: s.Ember.computed.alias("tftService.eventsData"),
          eventData: s.Ember.computed("eventsData", function () {
            const e = this.get("eventsData");
            return e && Array.isArray(e) && 1 === e.length ? e[0] : null;
          }),
          isHidden: s.Ember.computed.alias("tftService.isHidden"),
          audioManager: s.Ember.computed("tftService", function () {
            return this.get("tftService").getTftAudioManager();
          }),
          showEventHub: s.Ember.computed.empty("url"),
          eventHubTemplateType: s.Ember.computed("eventData", function () {
            const e = this.get("eventData");
            return e && e.eventHubTemplateType ? e.eventHubTemplateType : "";
          }),
        });
        t.default = a;
      },
      (e, t, n) => {
        "use strict";
        n.r(t);
      },
      (e, t, n) => {
        const s = n(1).Ember;
        e.exports = s.HTMLBars.template({
          id: "YnW5Z/47",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-tft\\\\src\\\\app\\\\components\\\\tft-event-page\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-tft\\\\src\\\\app\\\\components\\\\tft-event-page\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-tft\\\\src\\\\app\\\\components\\\\tft-event-page\\\\index.js\\" "],["text","\\n\\n"],["block",["unless"],[["get",["isHidden"]]],null,2]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","    "],["append",["helper",["managed-iframe"],null,[["id","url","audioManager","isHidden","height","width","errorTimeoutMilliseconds"],["event-iframe",["get",["url"]],["get",["audioManager"]],["get",["isHidden"]],"720","1055",30000]]],false],["text","\\n"]],"locals":[]},{"statements":[["text","    "],["append",["helper",["component"],[["helper",["concat"],["tft-event-hub-",["get",["eventHubTemplateType"]]],null]],[["telemetryEventPassTimeSpent","toggleEventPass"],[["get",["telemetryEventPassTimeSpent"]],["get",["toggleEventPass"]]]]],false],["text","\\n"]],"locals":[]},{"statements":[["block",["if"],[["get",["showEventHub"]]],null,1,0]],"locals":[]}],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        var s,
          a = (s = n(88)) && s.__esModule ? s : { default: s },
          o = n(1),
          l = n(2);
        var i = o.Ember.Component.extend(a.default, {
          classNames: [`${l.PLUGIN_NAME}-event-hub`],
          layout: n(93),
          style: n(94),
          telemetryEventPassTimeSpent: null,
          didInsertElement() {
            this._super(...arguments), this.telemetryOpenEventHub();
          },
          willDestroyElement() {
            this.telemetryCloseEventHub(
              this.get("telemetryEventPassTimeSpent"),
            ),
              this._super(...arguments);
          },
          actions: {},
        });
        t.default = i;
      },
      (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        var s = n(1),
          a = n(2),
          o = n(89);
        const l = "lny24-event-hub-logo-tft-name",
          i = "lny24-event-hub-question-mark",
          r = "event-hub-play-card",
          c = "lny24-hub-card-base-default",
          m = "lny24-hub-card-base-hover",
          u = "lny24-hub-card-base-pressed";
        var d = s.Ember.Mixin.create({
          tftService: s.Ember.inject.service("tft"),
          trovesService: s.Ember.inject.service("tftTroves"),
          eventHubTencentConfigs: s.Ember.computed.alias(
            "tftService.eventHubTencentConfigs",
          ),
          tencentConfig: s.Ember.computed(
            "eventHubTencentConfigs",
            function () {
              const e = this.get("hasTencentConfigs"),
                t = this.get("eventHubTencentConfigs");
              if (e)
                if (t.length > 1)
                  s.logger.error(
                    "Only one event is support right now. Number of eventHubTencentConfigs recieved: " +
                      t.length,
                  );
                else if (1 === t.length) return t[0];
              return null;
            },
          ),
          hasTencentConfigs: s.Ember.computed(
            "eventHubTencentConfigs",
            function () {
              const e = this.get("eventHubTencentConfigs");
              return null != e && e.length > 0;
            },
          ),
          eventSeriesId: s.Ember.computed.alias("tftService.eventSeriesId"),
          eventHubAssets: s.Ember.computed.alias("tftService.eventHubAssets"),
          mapData: s.Ember.computed.alias("tftService.mapData"),
          logoTftNameTencentImagePath: s.Ember.computed(
            "eventHubAssets",
            "tencentConfig.logoAssetId",
            function () {
              const e = this.get("eventHubAssets"),
                t = this.get("tencentConfig.logoAssetId");
              return e && t ? e[t] : "";
            },
          ),
          logoTftNameImagePath: s.Ember.computed("eventHubAssets", function () {
            const e = this.get("eventHubAssets");
            return e ? e[l] : "";
          }),
          eventHubLogoImagePath: s.Ember.computed(
            "mapData.assets.set-event-5YA-Title-Logo",
            function () {
              const e = this.get("mapData.assets.set-event-5YA-Title-Logo");
              return e ? this.get("tftService").getLocalizedAssetPath(e) : "";
            },
          ),
          iconQuestionMarkImagePath: s.Ember.computed(
            "eventHubAssets",
            function () {
              const e = this.get("eventHubAssets");
              return e ? e[i] : "";
            },
          ),
          backgroundPlayCardImagePath: s.Ember.computed(
            "eventHubAssets",
            function () {
              const e = this.get("eventHubAssets");
              return e ? e[r] : "";
            },
          ),
          cardBackgroundDefaultPath: s.Ember.computed(
            "eventHubAssets",
            function () {
              const e = this.get("eventHubAssets");
              if (e) return e[c];
            },
          ),
          cardBackgroundHoverPath: s.Ember.computed(
            "eventHubAssets",
            function () {
              const e = this.get("eventHubAssets");
              if (e) return e[m];
            },
          ),
          cardBackgroundPressedPath: s.Ember.computed(
            "eventHubAssets",
            function () {
              const e = this.get("eventHubAssets");
              if (e) return e[u];
            },
          ),
          telemetryEventHubTimeStart: null,
          telemetryEventHubTimeSpent: null,
          telemetryOpenEventHub() {
            s.Telemetry.sendCustomData(
              a.DEFAULT_TELEMETRY_TABLE,
              a.TFT_TELEMETRY_EVENT.formatOpen(
                a.TFT_TELEMETRY_EVENT.FROM.EVENT_HUB,
              ),
            ),
              this.set("telemetryEventHubTimeStart", Date.now());
          },
          telemetryCloseEventHub(e) {
            s.Telemetry.sendCustomData(
              a.DEFAULT_TELEMETRY_TABLE,
              a.TFT_TELEMETRY_EVENT.formatClose(
                a.TFT_TELEMETRY_EVENT.FROM.EVENT_HUB,
              ),
            ),
              this.set(
                "telemetryEventHubTimeSpent",
                Date.now() - this.get("telemetryEventHubTimeStart"),
              );
            let t = this.get("telemetryEventHubTimeSpent");
            e && (t -= e),
              s.Telemetry.sendCustomData(
                a.DEFAULT_TELEMETRY_TABLE,
                a.TFT_TELEMETRY_EVENT.formatTimeSpent(
                  a.TFT_TELEMETRY_EVENT.FROM.EVENT_HUB,
                  t,
                ),
              );
          },
          actions: {
            openEventUrlFaq(e) {
              e &&
                (window.open(e, "_blank"),
                s.Telemetry.sendCustomData(
                  a.DEFAULT_TELEMETRY_TABLE,
                  a.TFT_TELEMETRY_EVENT.formatClick(
                    a.TFT_TELEMETRY_EVENT.FROM.EVENT_HUB,
                    "player-support-button",
                  ),
                ),
                (0, o.trackEventHubPlayerSupportButtonClick)(
                  this.get("eventSeriesId"),
                ));
            },
            telemetryClickGameMode() {
              s.Telemetry.sendCustomData(
                a.DEFAULT_TELEMETRY_TABLE,
                a.TFT_TELEMETRY_EVENT.formatClick(
                  a.TFT_TELEMETRY_EVENT.FROM.EVENT_HUB,
                  "game-mode-button",
                ),
              );
            },
          },
        });
        t.default = d;
      },
      (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.PHASE = void 0),
          (t.trackClickRotationalShopCategory = function (e) {
            r(a.ROTATIONAL_SHOP, "click_rotational_shop_category", {
              tab_category: e,
            });
          }),
          (t.trackClickRotationalShopEntry = function (e) {
            r(a.ROTATIONAL_SHOP, "click_rotational_shop_entry", {
              catalog_entry_id: e,
            });
          }),
          (t.trackCloseRotationalShop = function () {
            r(a.ROTATIONAL_SHOP, "close_rotational_shop", {
              phase_elapsed: Date.now() - a.ROTATIONAL_SHOP.time_start,
            });
          }),
          (t.trackCloseTroves = function () {
            r(a.TROVES_HOME, "close_troves", {
              phase_elapsed: Date.now() - a.TROVES_HOME.time_start,
            });
          }),
          (t.trackCurrencyGained = function (e, t, n, s = !1) {
            r(
              a.TROVES_ROLLING,
              "currency_gained",
              { source_type: e, currency_id: t, quantity: n },
              s,
            );
          }),
          (t.trackCurrencySpent = function (e, t, n, s) {
            r(e, "currency_spent", {
              catalog_entry_id: t,
              currency_id: n,
              quantity: s,
            });
          }),
          (t.trackErrorRedeem = function (e, t, n) {
            r(e, "error_redeem", { catalog_entry_id: t, error_code: n });
          }),
          (t.trackEventHubClose = function (e) {
            r(a.EVENT_HUB, "close-event-hub", {
              phase_elapsed: Date.now() - a.EVENT_HUB.time_start,
              series_id: e,
            });
          }),
          (t.trackEventHubDailyLoginClaim = function (e, t) {
            r(a.EVENT_HUB, "claim-event-hub-daily-login-reward", {
              milestone_id: e,
              series_id: t,
            });
          }),
          (t.trackEventHubDailyLoginClaimAllClick = function (e) {
            r(a.EVENT_HUB, "click-event-hub-daily-login-claim-all-reward", {
              series_id: e,
            });
          }),
          (t.trackEventHubDailyLoginModuleOpen = function (e) {
            r(a.EVENT_HUB, "open-event-hub-daily-module", { series_id: e });
          }),
          (t.trackEventHubEventPassButtonClick = function (e) {
            r(a.EVENT_HUB, "click-event-pass", { series_id: e });
          }),
          (t.trackEventHubIntroModalOpen = function (e) {
            r(a.EVENT_HUB, "open-event-hub-intro", { series_id: e });
          }),
          (t.trackEventHubMissionChainComplete = function (e, t) {
            r(a.EVENT_HUB, "mission-complete-event-hub", {
              mission_id: e,
              series_id: t,
            });
          }),
          (t.trackEventHubOpen = function (e) {
            r(a.EVENT_HUB, "open-event-hub", { series_id: e }, !0);
          }),
          (t.trackEventHubPlayGameModeButtonClick = function (e) {
            r(a.EVENT_HUB, "click-event-hub-play-button", { series_id: e });
          }),
          (t.trackEventHubPlayerSupportButtonClick = function (e) {
            r(a.EVENT_HUB, "click-player-support-button", { series_id: e });
          }),
          (t.trackEventHubTreasureRealmButtonClick = function (e) {
            r(a.EVENT_HUB, "click-event-hub-treasure-realm-button", {
              series_id: e,
            });
          }),
          (t.trackEventPassClaim = function (e, t) {
            r(a.EVENT_HUB, "click-event-pass-reward-claim", {
              milestone_id: e,
              series_id: t,
            });
          }),
          (t.trackMilestoneRewardsTroves = function (e) {
            return r(a.TROVES_HOME, "milestone_rewards_troves", {
              milestone_reward_id: e,
            });
          }),
          (t.trackOpenRotationalShop = function (e) {
            r(
              a.ROTATIONAL_SHOP,
              "open_rotational_shop",
              { active_store_ids: e },
              !0,
            );
          }),
          (t.trackOpenTroves = function (e) {
            r(a.TROVES_HOME, "open_troves", { active_banner_ids: e }, !0);
          }),
          (t.trackRollRewardTroves = function (e, t, n = !1) {
            r(
              a.TROVES_ROLLING,
              "roll_reward_troves",
              { order_id: e, item_id: t },
              n,
            );
          });
        var s = n(1);
        const a = {
          EVENT_HUB: { NAME: "event-hub", time_start: 0, uuid: "" },
          ROTATIONAL_SHOP: { NAME: "rotational_shop", time_start: 0, uuid: "" },
          TROVES_HOME: { NAME: "troves_home", time_start: 0, uuid: "" },
          TROVES_ROLLING: { NAME: "troves_rolling", time_start: 0, uuid: "" },
        };
        t.PHASE = a;
        const o = "rcp-fe-lol-tft",
          l = {
            device: "PC",
            event_id: "",
            env: "",
            locale: "",
            phase: "",
            phase_uuid: "",
            puuid: "",
            region: "",
            timestamp: 0,
          },
          i = n(90);
        function r(e, t, n, a = !1) {
          !(function (e, t, n = !1) {
            (l.phase = e.NAME),
              n && ((e.uuid = i()), (e.time_start = Date.now())),
              (l.phase_uuid = e.uuid),
              (l.event_id = t),
              (l.timestamp = Date.now());
          })(e, t, a),
            s.Telemetry.sendCustomData(o, { ...l, ...n });
        }
        !(async function () {
          if (!l.puuid) {
            const e = await s.db.get("/lol-summoner/v1/current-summoner");
            l.puuid = e?.puuid || "";
          }
          if (!l.locale || !l.region) {
            const e = await s.db.get("/riotclient/region-locale");
            (l.locale = e?.locale || ""), (l.region = e?.region || "");
          }
          if (!l.env && l.region) {
            const e = await s.db.get(
              `/data-store/v1/system-settings/region_data/${l.region}/rso_platform_id`,
            );
            (l.env = e), (l.region = e);
          }
        })();
      },
      (e, t, n) => {
        var s = n(91),
          a = n(92);
        e.exports = function (e, t, n) {
          var o = (t && n) || 0;
          "string" == typeof e &&
            ((t = "binary" === e ? new Array(16) : null), (e = null));
          var l = (e = e || {}).random || (e.rng || s)();
          if (((l[6] = (15 & l[6]) | 64), (l[8] = (63 & l[8]) | 128), t))
            for (var i = 0; i < 16; ++i) t[o + i] = l[i];
          return t || a(l);
        };
      },
      (e) => {
        var t =
          ("undefined" != typeof crypto &&
            crypto.getRandomValues &&
            crypto.getRandomValues.bind(crypto)) ||
          ("undefined" != typeof msCrypto &&
            "function" == typeof window.msCrypto.getRandomValues &&
            msCrypto.getRandomValues.bind(msCrypto));
        if (t) {
          var n = new Uint8Array(16);
          e.exports = function () {
            return t(n), n;
          };
        } else {
          var s = new Array(16);
          e.exports = function () {
            for (var e, t = 0; t < 16; t++)
              0 == (3 & t) && (e = 4294967296 * Math.random()),
                (s[t] = (e >>> ((3 & t) << 3)) & 255);
            return s;
          };
        }
      },
      (e) => {
        for (var t = [], n = 0; n < 256; ++n)
          t[n] = (n + 256).toString(16).substr(1);
        e.exports = function (e, n) {
          var s = n || 0,
            a = t;
          return [
            a[e[s++]],
            a[e[s++]],
            a[e[s++]],
            a[e[s++]],
            "-",
            a[e[s++]],
            a[e[s++]],
            "-",
            a[e[s++]],
            a[e[s++]],
            "-",
            a[e[s++]],
            a[e[s++]],
            "-",
            a[e[s++]],
            a[e[s++]],
            a[e[s++]],
            a[e[s++]],
            a[e[s++]],
            a[e[s++]],
          ].join("");
        };
      },
      (e, t, n) => {
        const s = n(1).Ember;
        e.exports = s.HTMLBars.template({
          id: "aQnDBczl",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-tft\\\\src\\\\app\\\\components\\\\tft-event-hub\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-tft\\\\src\\\\app\\\\components\\\\tft-event-hub\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-tft\\\\src\\\\app\\\\components\\\\tft-event-hub\\\\index.js\\" "],["text","\\n"],["open-element","div",[]],["static-attr","class","left-container"],["flush-element"],["text","\\n  "],["yield","default",[["helper",["hash"],null,[["leftPanel"],["blank-template"]]]]],["text","\\n"],["close-element"],["text","\\n"],["open-element","div",[]],["static-attr","class","right-container"],["flush-element"],["text","\\n  "],["yield","default",[["helper",["hash"],null,[["rightPanel"],["blank-template"]]]]],["text","\\n"],["close-element"],["text","\\n\\n\\n\\n"]],"locals":[],"named":[],"yields":["default"],"blocks":[],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, n) => {
        "use strict";
        n.r(t);
      },
      (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        var s = n(1),
          a = n(2);
        const o = "lny24-hub-mission-tracker-connect-bar",
          l = "lny24-hub-mission-objective-divider";
        var i = s.Ember.Component.extend({
          classNames: [`${a.PLUGIN_NAME}-event-mission-chain`],
          layout: n(96),
          style: n(97),
          missionChain: null,
          showMissionTracker: !0,
          overrideRewardIcon: !1,
          showMissionTrackerConnector: !0,
          tftService: s.Ember.inject.service("tft"),
          eventHubAssets: s.Ember.computed.alias("tftService.eventHubAssets"),
          eventsData: s.Ember.computed.alias("tftService.eventsData"),
          eventData: s.Ember.computed("eventsData", function () {
            const e = this.get("eventsData");
            return e && Array.isArray(e) && 1 === e.length ? e[0] : null;
          }),
          missions: s.Ember.computed.alias("missionChain.missions"),
          currentMission: s.Ember.computed(
            "missions",
            "selectedTrackerIndex",
            function () {
              const e = this.get("missions"),
                t = this.get("selectedTrackerIndex");
              return "array" === s.Ember.typeOf(e) && e[t] ? e[t] : null;
            },
          ),
          currentMissionCompleted: s.Ember.computed(
            "currentMission",
            function () {
              const e = this.get("currentMission");
              return !!e && "COMPLETED" === e.status;
            },
          ),
          currentMissionInProgress: s.Ember.computed(
            "currentMission",
            function () {
              const e = this.get("currentMission");
              return !!e && "PENDING" === e.status;
            },
          ),
          currentMissionCompletedCSSString: s.Ember.computed(
            "currentMissionCompleted",
            "isLocked",
            function () {
              return this.get("currentMissionCompleted")
                ? "completed"
                : this.get("isLocked")
                  ? "locked"
                  : "pending";
            },
          ),
          title: s.Ember.computed.alias("currentMission.title"),
          objectives: s.Ember.computed.alias("currentMission.objectives"),
          rewards: s.Ember.computed.alias("currentMission.rewards"),
          rewardText: s.Ember.computed("rewards", function () {
            const e = this.get("rewards");
            return e ? e.map((e) => e.description).join(", ") : "";
          }),
          rewardOverrideIconPath: s.Ember.computed(
            "eventHubAssets",
            "overrideRewardIcon",
            "isLocked",
            "currentMissionCompleted",
            function () {
              const e = this.get("isLocked"),
                t = this.get("overrideRewardIcon"),
                n = this.get("currentMissionCompleted");
              return !1 === t
                ? ""
                : e
                  ? this.get(
                      "eventHubAssets.mission-reward-icon-locked-override",
                    )
                  : n
                    ? this.get(
                        "eventHubAssets.mission-reward-icon-completed-override",
                      )
                    : this.get(
                        "eventHubAssets.mission-reward-icon-active-override",
                      );
            },
          ),
          isLocked: s.Ember.computed("currentMission", function () {
            const e = this.get("currentMission");
            return !!e && "DUMMY" === e.status;
          }),
          lockMessage: s.Ember.computed("currentMission", function () {
            const e = this.get("currentMission"),
              t = new Date(e.startTime);
            if ("DUMMY" === e.status)
              return t <= Date.now()
                ? this.get("tra").formatString(
                    "tft_eventHub_missions_complete_previous_text",
                  )
                : this._timeTillUnlockString(t);
          }),
          missionPanelBackground: s.Ember.computed(
            "isLocked",
            "objectives",
            "currentMissionCompleted",
            function () {
              const e = this.get("isLocked"),
                t = this.get("objectives"),
                n = this.get("currentMissionCompleted");
              return e
                ? t.length > 1
                  ? this.get("eventHubAssets.mission-card-large-locked")
                  : this.get("eventHubAssets.mission-card-small-locked")
                : n
                  ? t.length > 1
                    ? this.get("eventHubAssets.mission-card-large-completed")
                    : this.get("eventHubAssets.mission-card-small-completed")
                  : t.length > 1
                    ? this.get("eventHubAssets.mission-card-large-active")
                    : this.get("eventHubAssets.mission-card-small-active");
            },
          ),
          selectedTrackerIndex: s.Ember.computed("missions", function () {
            const e = this.get("missions");
            if (e && "array" === s.Ember.typeOf(e) && e.length > 0) {
              let t = e.findIndex((e) => "PENDING" === e.status);
              return t >= 0
                ? t
                : ((t = e.findIndex((e) => "DUMMY" === e.status)),
                  0 === t ? t : t > 0 ? t - 1 : e.length - 1);
            }
            return null;
          }),
          missionTrackerTotal: s.Ember.computed.alias("missionChain.chainSize"),
          missionTrackerIcons: s.Ember.computed(
            "missionTrackerTotal",
            "currentMissionCompleted",
            "eventHubAssets",
            function () {
              const e = [],
                t = this.get("missionTrackerTotal"),
                n = this.get("missions");
              if (n && "array" === s.Ember.typeOf(n) && n.length === t)
                for (let s = 0; s < t; s++) {
                  let t = "",
                    a = "",
                    o = "",
                    l = "";
                  switch (n[s].status) {
                    case "PENDING":
                    default:
                      (t = this.get(
                        "eventHubAssets.mission-tracker-current-default",
                      )),
                        (a = this.get(
                          "eventHubAssets.mission-tracker-current-clicked",
                        )),
                        (o = this.get(
                          "eventHubAssets.mission-tracker-current-hover",
                        )),
                        (l = this.get(
                          "eventHubAssets.mission-tracker-current-clicked-hover",
                        ));
                      break;
                    case "DUMMY":
                      (t = this.get(
                        "eventHubAssets.mission-tracker-locked-default",
                      )),
                        (a = this.get(
                          "eventHubAssets.mission-tracker-locked-clicked",
                        )),
                        (o = this.get(
                          "eventHubAssets.mission-tracker-locked-hover",
                        )),
                        (l = this.get(
                          "eventHubAssets.mission-tracker-locked-clicked-hover",
                        ));
                      break;
                    case "REWARDS_PENDING":
                    case "COMPLETED":
                      (t = this.get(
                        "eventHubAssets.mission-tracker-completed-default",
                      )),
                        (a = this.get(
                          "eventHubAssets.mission-tracker-completed-clicked",
                        )),
                        (o = this.get(
                          "eventHubAssets.mission-tracker-completed-hover",
                        )),
                        (l = this.get(
                          "eventHubAssets.mission-tracker-completed-clicked-hover",
                        ));
                  }
                  e.push({
                    defaultImagePath: t,
                    activeImagePath: a,
                    hoverImagePath: o,
                    clickedHoverImagePath: l,
                  });
                }
              return e;
            },
          ),
          missionTrackerConnectBarImagePath: s.Ember.computed(
            "eventHubAssets",
            function () {
              const e = this.get("eventHubAssets");
              return e ? e[o] : "";
            },
          ),
          objectiveDividerImagePath: s.Ember.computed(
            "eventHubAssets",
            function () {
              const e = this.get("eventHubAssets");
              return e ? e[l] : "";
            },
          ),
          _timeTillUnlockString(e) {
            if (!e) return "";
            let t = new Date(e) - Date.now();
            const n = Math.floor(t / a.DAY_IN_MS);
            t -= 86400 * n;
            const o = Math.floor(t / a.HOUR_IN_MS) % 24;
            t -= 3600 * o;
            const l = Math.floor(t / a.MINUTE_IN_MS) % 60;
            let i, r, c;
            t -= 60 * l;
            let m = 0;
            return n > 0
              ? ((i = this.get("tra").formatString("tft_duration_days", {
                  days: n,
                })),
                this.get("tra").formatString("tft_time_till_unlocked", {
                  duration: i,
                }))
              : (o > 0 && n <= 1
                  ? ((r = this.get("tra").formatString("tft_duration_hours", {
                      hours: o,
                    })),
                    (m = o > 1 ? a.HOUR_IN_MS : a.MINUTE_IN_MS))
                  : ((c = this.get("tra").formatString("tft_duration_minutes", {
                      minutes: l,
                    })),
                    (m = a.MINUTE_IN_MS)),
                (this.timeoutExpired = !1),
                m > 0 &&
                  s.Ember.run.later(
                    this,
                    function () {
                      this.set("timeoutExpired", !0);
                    },
                    m,
                  ),
                r && c
                  ? this.get("tra").formatString(
                      "tft_time_till_unlocked_hours_and_minutes",
                      { hour_duration: r, minutes_duration: c },
                    )
                  : this.get("tra").formatString("tft_time_till_unlocked", {
                      duration: r || c,
                    }));
          },
          actions: {
            selectMission(e) {
              this.set("selectedTrackerIndex", e);
            },
          },
        });
        t.default = i;
      },
      (e, t, n) => {
        const s = n(1).Ember;
        e.exports = s.HTMLBars.template({
          id: "zr6/qNt5",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-tft\\\\src\\\\app\\\\components\\\\tft-event-mission-chain\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-tft\\\\src\\\\app\\\\components\\\\tft-event-mission-chain\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-tft\\\\src\\\\app\\\\components\\\\tft-event-mission-chain\\\\index.js\\" "],["text","\\n"],["open-element","div",[]],["dynamic-attr","class",["concat",["event-mission-container ",["helper",["if"],[["get",["showMissionTracker"]],"","with-separator"],null]]]],["flush-element"],["text","\\n"],["block",["if"],[["get",["showMissionTracker"]]],null,11],["text","\\n"],["text","  "],["open-element","div",[]],["static-attr","class","card"],["dynamic-attr","style",["concat",["background: url(\'",["unknown",["missionPanelBackground"]],"\'); background-size: 100% 100%"]]],["flush-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","card-left"],["flush-element"],["text","\\n"],["block",["each"],[["get",["objectives"]]],null,6],["text","    "],["close-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","card-right"],["flush-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","rewards"],["flush-element"],["text","\\n"],["block",["each"],[["get",["rewards"]]],null,1],["text","      "],["close-element"],["text","\\n    "],["close-element"],["text","\\n  "],["close-element"],["text","\\n"],["close-element"]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","              "],["open-element","div",[]],["static-attr","class","reward-tick"],["dynamic-attr","style",["concat",["background-image: url(\'",["unknown",["eventHubAssets","mission-card-reward-icon-frame-tick"]],"\')"]]],["flush-element"],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","          "],["open-element","div",[]],["static-attr","class","reward"],["flush-element"],["text","\\n            "],["open-element","div",[]],["static-attr","class","reward-icon-frame"],["dynamic-attr","style",["concat",["background-image: url(\'",["helper",["if"],[["get",["currentMissionCompleted"]],["get",["eventHubAssets","mission-card-reward-icon-frame-complete"]],["get",["eventHubAssets","mission-card-reward-icon-frame"]]],null],"\')"]]],["flush-element"],["text","\\n              "],["open-element","div",[]],["static-attr","class","reward-icon"],["dynamic-attr","style",["concat",["background-image: url(\'",["helper",["if"],[["helper",["eq"],[["get",["overrideRewardIcon"]],false],null],["get",["reward","iconUrl"]],["get",["rewardOverrideIconPath"]]],null],"\')"]]],["flush-element"],["close-element"],["text","\\n            "],["close-element"],["text","\\n"],["block",["if"],[["get",["currentMissionCompleted"]]],null,0],["text","          "],["close-element"],["text","\\n"]],"locals":["reward"]},{"statements":[["text","            "],["open-element","div",[]],["dynamic-attr","class",["concat",["description-text-",["unknown",["currentMissionCompletedCSSString"]]]]],["flush-element"],["text","\\n              "],["append",["unknown",["objective","description"]],false],["text","\\n            "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","              "],["open-element","div",[]],["static-attr","class","description-lock-text"],["flush-element"],["text","\\n                "],["append",["unknown",["lockMessage"]],false],["text","\\n              "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","              "],["open-element","div",[]],["dynamic-attr","class",["concat",["title-",["unknown",["currentMissionCompletedCSSString"]]]]],["flush-element"],["text","\\n                "],["append",["unknown",["title"]],false],["text","\\n              "],["close-element"],["text","\\n              "],["open-element","div",[]],["dynamic-attr","class",["concat",["reward-text-",["unknown",["currentMissionCompletedCSSString"]]]]],["flush-element"],["text","\\n                "],["append",["unknown",["rewardText"]],false],["text","\\n              "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","          "],["open-element","div",[]],["static-attr","class","objective-columns"],["flush-element"],["text","\\n            "],["open-element","div",[]],["static-attr","class","divider-text left-column"],["flush-element"],["text","\\n              "],["append",["unknown",["tra","mission_objective_or"]],false],["text","\\n            "],["close-element"],["text","\\n            "],["open-element","div",[]],["static-attr","class","divider-image middle-column"],["dynamic-attr","style",["concat",["background-image: url(\'",["helper",["if"],[["get",["currentMissionCompleted"]],["get",["eventHubAssets","hub-mission-objective-divider-completed"]],["get",["eventHubAssets","hub-mission-objective-divider-default"]]],null],"\')"]]],["flush-element"],["close-element"],["text","\\n          "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["block",["if"],[["helper",["eq"],[["get",["index"]],1],null]],null,5],["text","        "],["open-element","div",[]],["static-attr","class","objective-columns"],["flush-element"],["text","\\n"],["text","          "],["open-element","div",[]],["static-attr","class","progress left-column"],["flush-element"],["text","\\n            "],["append",["helper",["tft-radial-progress-bar"],null,[["current","total","completedIconImagePath","valueLockedImagePath","isLocked","isComplete"],[["get",["objective","progress","currentProgress"]],["get",["objective","progress","totalCount"]],["get",["eventHubAssets","mission-progress-completed"]],["get",["eventHubAssets","event-mission-value-locked"]],["get",["isLocked"]],["get",["currentMissionCompleted"]]]]],false],["text","\\n          "],["close-element"],["text","\\n"],["text","          "],["open-element","div",[]],["static-attr","class","description middle-column"],["flush-element"],["text","\\n"],["block",["if"],[["helper",["eq"],[["get",["index"]],0],null]],null,4],["block",["if"],[["get",["isLocked"]]],null,3,2],["text","          "],["close-element"],["text","\\n        "],["close-element"],["text","\\n"]],"locals":["objective","index"]},{"statements":[["text","            "],["open-element","div",[]],["static-attr","class","tracker-connect-bar"],["dynamic-attr","style",["concat",["background: url(\'",["unknown",["missionTrackerConnectBarImagePath"]],"\')"]]],["flush-element"],["close-element"],["text","\\n"]],"locals":[]},{"statements":[],"locals":[]},{"statements":[["block",["if"],[["helper",["eq"],[["get",["index"]],0],null]],null,8,7]],"locals":[]},{"statements":[["block",["if"],[["get",["showMissionTrackerConnector"]]],null,9],["text","        "],["open-element","div",[]],["static-attr","class","tracker-icon"],["dynamic-attr","style",["concat",["--tracker-icon-image: url(\'",["helper",["if"],[["helper",["eq"],[["get",["selectedTrackerIndex"]],["get",["index"]]],null],["get",["missionTrackerIcon","activeImagePath"]],["get",["missionTrackerIcon","defaultImagePath"]]],null],"\'); --tracker-icon-image-hover: url(\'",["unknown",["missionTrackerIcon","hoverImagePath"]],"\'); --tracker-icon-image-clicked-hover: url(\'",["unknown",["missionTrackerIcon","clickedHoverImagePath"]],"\'); --tracker-icon-image-active: url(\'",["unknown",["missionTrackerIcon","activeImagePath"]],"\')"]]],["dynamic-attr","onclick",["helper",["action"],[["get",[null]],"selectMission",["get",["index"]]],null],null],["flush-element"],["close-element"],["text","\\n"]],"locals":["missionTrackerIcon","index"]},{"statements":[["text","    "],["open-element","div",[]],["static-attr","class","tracker-columns"],["flush-element"],["text","\\n"],["block",["each"],[["get",["missionTrackerIcons"]]],null,10],["text","    "],["close-element"],["text","\\n"]],"locals":[]}],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, n) => {
        "use strict";
        n.r(t);
      },
      (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        var s = n(1),
          a = n(2),
          o = n(75),
          l = n(89);
        const i = "lny24-hub-pass-complete-bg-default";
        var r = s.Ember.Component.extend({
          classNames: [`${a.PLUGIN_NAME}-event-pass-thumbnail`],
          layout: n(99),
          style: n(100),
          toggleEventPass: null,
          cardBackgroundDefaultPath: null,
          cardBackgroundHoverPath: null,
          cardBackgroundPressedPath: null,
          tftService: s.Ember.inject.service("tft"),
          eventSeriesId: s.Ember.computed.alias("tftService.eventSeriesId"),
          eventPass: s.Ember.computed.alias("tftService.tftPassEventPass"),
          eventHubAssets: s.Ember.computed.alias("tftService.eventHubAssets"),
          activeMilestone: s.Ember.computed.alias("eventPass.activeMilestone"),
          media: s.Ember.computed.alias("eventPass.info.media"),
          passCompleteBackgroundDefaultImagePath: s.Ember.computed(
            "eventHubAssets",
            function () {
              const e = this.get("eventHubAssets");
              if (e) return e[i];
            },
          ),
          lastMainMilestone: s.Ember.computed.alias("milestones.lastObject"),
          lastViewedMilestone: s.Ember.computed.alias(
            "eventPass.lastViewedMilestone",
          ),
          markMissionsAsViewedFunc: s.Ember.computed.alias(
            "tftService.markMissionsAsViewed",
          ),
          milestonePointsEarned: s.Ember.computed.alias(
            "milestoneToDisplay.pointsEarnedForMilestone",
          ),
          milestonePointsNeeded: s.Ember.computed.alias(
            "milestoneToDisplay.pointsNeededForMilestone",
          ),
          playerHasPremium: s.Ember.computed.alias("eventPass.info.premium"),
          passName: s.Ember.computed("eventPass", function () {
            const e = this.get("eventPass");
            if (e) return e.info.title;
          }),
          milestoneLevel: s.Ember.computed(
            "activeMilestone.level",
            function () {
              const e = this.get("activeMilestone.level");
              return "number" !== s.Ember.typeOf(e)
                ? this.get("tra").formatString("battlepass_level_shorthand", {
                    level: 0,
                  })
                : this.get("tra").formatString("battlepass_level_shorthand", {
                    level: e - 1,
                  });
            },
          ),
          milestones: s.Ember.computed(
            "eventPass.milestones.@each.{milestoneId,isLocked,pointsEarnedForMilestone}",
            function () {
              if (this.get("eventPass"))
                return s.Ember.A(Array.from(this.get("eventPass.milestones")));
            },
          ),
          eventPassMilestones: s.Ember.computed(
            "eventPass.milestones.@each.{milestoneId,isLocked,pointsEarnedForMilestone}",
            function () {
              return this.get("eventPass.milestones")
                ? s.Ember.A(Array.from(this.get("eventPass.milestones")))
                : s.Ember.A();
            },
          ),
          eventPassBonuses: s.Ember.computed(
            "eventPass.bonuses.@each.{milestoneId,isLocked,pointsEarnedForMilestone}",
            function () {
              return this.get("eventPass.bonuses")
                ? s.Ember.A(Array.from(this.get("eventPass.bonuses")))
                : s.Ember.A();
            },
          ),
          hasEventPassBonuses: s.Ember.computed.notEmpty("eventPassBonuses"),
          isMainMilestonesComplete: s.Ember.computed(
            "eventPassMilestones.lastObject.status",
            function () {
              const e = this.get("eventPassMilestones.lastObject.status");
              return (
                e === a.BP_V2_MILESTONE_REWARDABLE ||
                e === a.BP_V2_MILESTONE_CLAIMABLE ||
                e === a.BP_V2_MILESTONE_COMPLETE
              );
            },
          ),
          isBonusMilestonesComplete: s.Ember.computed(
            "eventPassBonuses.lastObject.status",
            function () {
              const e = this.get("eventPassBonuses.lastObject.status");
              return (
                e === a.BP_V2_MILESTONE_REWARDABLE ||
                e === a.BP_V2_MILESTONE_CLAIMABLE ||
                e === a.BP_V2_MILESTONE_COMPLETE
              );
            },
          ),
          isPassComplete: s.Ember.computed(
            "hasEventPassBonuses",
            "isMainMilestonesComplete",
            "isBonusMilestonesComplete",
            function () {
              return this.get("hasEventPassBonuses")
                ? this.get("isBonusMilestonesComplete")
                : this.get("isMainMilestonesComplete");
            },
          ),
          milestoneToDisplay: s.Ember.computed("isPassComplete", function () {
            const e = this.get("isPassComplete"),
              t =
                (this.get("hasEventPassBonuses"),
                this.get("eventPassMilestones.lastObject"));
            return e ? t : this.get("activeMilestone");
          }),
          click() {
            s.Telemetry.sendCustomData(
              a.DEFAULT_TELEMETRY_TABLE,
              a.TFT_TELEMETRY_EVENT.formatClick(
                a.TFT_TELEMETRY_EVENT.FROM.EVENT_HUB,
                "event-pass-button",
              ),
            ),
              (0, l.trackEventHubEventPassButtonClick)(
                this.get("eventSeriesId"),
              ),
              o.SFX.circleButtonClick.play();
          },
          mouseEnter() {
            o.SFX.buttonHover.play();
          },
        });
        t.default = r;
      },
      (e, t, n) => {
        const s = n(1).Ember;
        e.exports = s.HTMLBars.template({
          id: "EIzi2z4l",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-tft\\\\src\\\\app\\\\components\\\\tft-event-pass-thumbnail\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-tft\\\\src\\\\app\\\\components\\\\tft-event-pass-thumbnail\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-tft\\\\src\\\\app\\\\components\\\\tft-event-pass-thumbnail\\\\index.js\\" "],["text","\\n"],["open-element","div",[]],["static-attr","class","thumbnail"],["flush-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","card"],["dynamic-attr","style",["concat",["--pass-card-background-image: url(\'",["unknown",["eventHubAssets","event-hub-pass-thumbnail-card-bg"]],"\'); --pass-card-background-image-hover: url(\'",["unknown",["eventHubAssets","event-hub-pass-thumbnail-card-bg"]],"\'); --pass-card-background-image-pressed: url(\'",["unknown",["eventHubAssets","event-hub-pass-thumbnail-card-bg"]],"\');"]]],["dynamic-attr","onclick",["helper",["action"],[["get",[null]],["get",["toggleEventPass"]]],null],null],["flush-element"],["text","\\n"],["block",["if"],[["get",["eventPass"]]],null,5],["text","  "],["close-element"],["text","\\n"],["close-element"],["text","\\n"]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","            "],["append",["unknown",["tra","tft_eventhub_pass_thumbnail_next_reward"]],false],["text","\\n"]],"locals":[]},{"statements":[["text","            "],["append",["unknown",["tra","battlepass_one_hundred_percent_complete"]],false],["text","\\n"]],"locals":[]},{"statements":[["text","        "],["open-element","div",[]],["static-attr","class","reward-info"],["flush-element"],["text","\\n          "],["open-element","div",[]],["static-attr","class","reward-description"],["flush-element"],["text","\\n"],["block",["if"],[["get",["isPassComplete"]]],null,1,0],["text","          "],["close-element"],["text","\\n          "],["open-element","div",[]],["static-attr","class","thumbnail-progressbar"],["flush-element"],["text","\\n            "],["append",["helper",["battlepass-level-bar"],null,[["class","activeMilestone","lastViewedMilestone","lastMainMilestone","playerHasPremium","isPassComplete","showTooltip","showHeader"],["pass-level-bar",["get",["milestoneToDisplay"]],["get",["lastViewedMilestone"]],["get",["lastMainMilestone"]],["get",["playerHasPremium"]],["get",["isPassComplete"]],false,false]]],false],["text","\\n          "],["close-element"],["text","\\n"],["text","          "],["open-element","div",[]],["static-attr","class","xp-progress"],["flush-element"],["text","    \\n            "],["append",["unknown",["milestonePointsEarned"]],false],["text"," / "],["append",["unknown",["milestonePointsNeeded"]],false],["text","\\n          "],["close-element"],["text","\\n        "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","        "],["open-element","div",[]],["static-attr","class","pass-complete-text"],["flush-element"],["append",["unknown",["tra","tft_eventhub_pass_complete_text"]],false],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","          "],["open-element","div",[]],["static-attr","class","checkmark"],["dynamic-attr","style",["concat",["background-image: url(\'",["unknown",["eventHubAssets","thumbnail-complete-checkmark"]],"\');"]]],["flush-element"],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","      "],["open-element","div",[]],["static-attr","class","title"],["flush-element"],["text","\\n        "],["open-element","div",[]],["static-attr","class","title-text"],["flush-element"],["append",["unknown",["passName"]],false],["close-element"],["text","\\n      "],["close-element"],["text","\\n"],["text","      "],["open-element","div",[]],["static-attr","class","thumbnail-reward"],["modifier",["action"],[["get",[null]],"telemetryClickEventPassThumbnail"]],["flush-element"],["text","\\n        "],["append",["helper",["battlepass-milestone"],null,[["class","media","milestone","showProgressionTracker","showTooltip"],[["helper",["if"],[["get",["isPassComplete"]],"next-reward-icon gray-out","next-reward-icon"],null],["get",["media"]],["get",["milestoneToDisplay"]],false,false]]],false],["text","\\n"],["block",["if"],[["get",["isPassComplete"]]],null,4],["text","      "],["close-element"],["text","\\n"],["block",["if"],[["get",["isPassComplete"]]],null,3,2]],"locals":[]}],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, n) => {
        "use strict";
        n.r(t);
      },
      (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        var s = n(1),
          a = n(2),
          o = n(75),
          l = n(89);
        const i = "troves-hub-banner-error",
          r = "troves-hub-banner-empty",
          c = "lny24-hub-trove-textfield-bg",
          m = "lny24-hub-trove-arrow-icon-default",
          u = "lny24-hub-trove-arrow-icon-pressed";
        var d = s.Ember.Component.extend({
          classNames: [`${a.PLUGIN_NAME}-event-troves-thumbnail`],
          layout: n(102),
          style: n(103),
          tftService: s.Ember.inject.service("tft"),
          trovesService: s.Ember.inject.service("tftTroves"),
          eventSeriesId: s.Ember.computed.alias("tftService.eventSeriesId"),
          eventHubAssets: s.Ember.computed.alias("tftService.eventHubAssets"),
          eventHubTencentConfigs: s.Ember.computed.alias(
            "tftService.eventHubTencentConfigs",
          ),
          displayedBannerOverride: null,
          cardBackgroundDefaultPath: null,
          cardBackgroundHoverPath: null,
          cardBackgroundPressedPath: null,
          troveTextFieldBgPath: s.Ember.computed("eventHubAssets", function () {
            const e = this.get("eventHubAssets");
            if (e) return e[c];
          }),
          troveArrowIconDefaultPath: s.Ember.computed(
            "eventHubAssets",
            function () {
              const e = this.get("eventHubAssets");
              if (e) return e[m];
            },
          ),
          troveArrowIconPressedPath: s.Ember.computed(
            "eventHubAssets",
            function () {
              const e = this.get("eventHubAssets");
              if (e) return e[u];
            },
          ),
          troveTencentAssetPath: s.Ember.computed(
            "eventHubAssets",
            "tencentTroveAssetId",
            function () {
              const e = this.get("eventHubAssets"),
                t = this.get("tencentTroveAssetId");
              if (e && t) return e[t];
            },
          ),
          isLoading: s.Ember.computed(
            "trovesService.trovesEnabled",
            "trovesService.isLoading",
            function () {
              const e = this.get("trovesService.isLoading");
              return this.get("trovesService.trovesEnabled") && e;
            },
          ),
          isTrovesLinkDisabled: s.Ember.computed(
            "isLoading",
            "hasTencentConfigs",
            function () {
              const e = this.get("isLoading"),
                t = this.get("hasTencentConfigs");
              return e || t;
            },
          ),
          hasBannerError: s.Ember.computed.alias(
            "trovesService.hasBannerError",
          ),
          trovesPromoAssets: s.Ember.computed.alias(
            "trovesService.trovesPromoAssets",
          ),
          activeBanners: s.Ember.computed.alias(
            "trovesService.troveActiveBanners",
          ),
          hasNoBanner: s.Ember.computed.empty("activeBanners"),
          displayedChasedContentId:
            s.Ember.computed.alias("displayedBanner.id"),
          missingBanner: s.Ember.computed(
            "hasBannerError",
            "hasNoBanner",
            function () {
              return this.get("hasBannerError") || this.get("hasNoBanner");
            },
          ),
          displayedBanner: s.Ember.computed(
            "activeBanners",
            "displayedBannerOverride",
            function () {
              if (this.get("hasNoBanner")) return null;
              if (this.get("displayedBannerOverride"))
                return this.get("displayedBannerOverride");
              {
                const e = this.get("activeBanners")[0];
                if (e) return e;
              }
              return null;
            },
          ),
          errorBannerImage: s.Ember.computed("trovesPromoAssets", function () {
            const e = this.get("trovesPromoAssets");
            return e && e[i] ? e[i] : "";
          }),
          emptyBannerImage: s.Ember.computed("trovesPromoAssets", function () {
            const e = this.get("trovesPromoAssets");
            return e && e[r] ? e[r] : "";
          }),
          missingBannerImage: s.Ember.computed(
            "errorBannerImage",
            "emptyBannerImage",
            "missingBanner",
            function () {
              return this.get("hasBannerError")
                ? this.get("errorBannerImage")
                : this.get("hasNoBanner")
                  ? this.get("emptyBannerImage")
                  : "";
            },
          ),
          missingBannerTitle: s.Ember.computed(
            "errorBannerImage",
            "emptyBannerImage",
            "missingBanner",
            function () {
              return this.get("hasBannerError")
                ? this.get("tra.troves_hub_banner_error_title")
                : this.get("hasNoBanner")
                  ? this.get("tra.troves_hub_banner_empty_title")
                  : "";
            },
          ),
          missingBannerFooter: s.Ember.computed(
            "errorBannerImage",
            "emptyBannerImage",
            "missingBanner",
            function () {
              return this.get("hasBannerError")
                ? this.get("tra.troves_hub_banner_error_footer")
                : this.get("hasNoBanner")
                  ? this.get("tra.troves_hub_banner_empty_footer")
                  : "";
            },
          ),
          hasEventBannerTexture: s.Ember.computed(
            "displayedBanner",
            function () {
              return this.get("displayedBanner").eventHubBannerTexture.endsWith(
                ".png",
              );
            },
          ),
          bannerTexture: s.Ember.computed(
            "displayedBanner",
            "hasEventBannerTexture",
            function () {
              const e = this.get("displayedBanner");
              return this.get("hasEventBannerTexture")
                ? e.eventHubBannerTexture
                : e.bannerTexture;
            },
          ),
          showMissingBannerImage: s.Ember.computed(
            "hasTencentConfigs",
            "missingBanner",
            function () {
              const e = this.get("hasTencentConfigs"),
                t = this.get("missingBanner");
              return !e && t;
            },
          ),
          hasTencentConfigs: s.Ember.computed(
            "eventHubTencentConfigs",
            function () {
              const e = this.get("eventHubTencentConfigs");
              return null != e && e.length > 0;
            },
          ),
          tencentConfig: s.Ember.computed(
            "eventHubTencentConfigs",
            function () {
              const e = this.get("hasTencentConfigs"),
                t = this.get("eventHubTencentConfigs");
              if (e)
                if (t.length > 1)
                  s.logger.error(
                    "Only one event is support right now. Number of eventHubTencentConfigs recieved: " +
                      t.length,
                  );
                else if (1 === t.length) return t[0];
              return null;
            },
          ),
          tencentTroveURL: s.Ember.computed("tencentConfig", function () {
            const e = this.get("tencentConfig");
            if (e) {
              if (e.troveURL && "" !== e.troveURL) return e.troveURL;
              s.logger.error(
                "Missing tencentEventhubConfigs.troveURL in tencentEventhubConfigs",
              );
            }
            return null;
          }),
          tencentTroveAssetId: s.Ember.computed("tencentConfig", function () {
            const e = this.get("tencentConfig");
            if (e) {
              if (e.troveAssetId && "" !== e.troveAssetId)
                return e.troveAssetId;
              s.logger.error(
                "Missing tencentEventhubConfigs.troveAssetId in tencentEventhubConfigs",
              );
            }
            return null;
          }),
          mouseEnter() {
            o.SFX.buttonHover.play();
          },
          actions: {
            telemetryClickTreasureRealmsThumbnail() {
              const e = this.get("displayedBanner");
              s.Telemetry.sendCustomData(
                a.DEFAULT_TELEMETRY_TABLE,
                a.TFT_TELEMETRY_EVENT.formatClick(
                  a.TFT_TELEMETRY_EVENT.FROM.EVENT_HUB,
                  "treasure-realms-thumbnail",
                  { displayedBanner: e ? e.name : "" },
                ),
              );
            },
            SFXButtonClickPlay() {
              o.SFX.circleButtonClick.play();
            },
            onClickAction() {
              this.send("telemetryClickTreasureRealmsThumbnail"),
                (0, l.trackEventHubTreasureRealmButtonClick)(
                  this.get("eventSeriesId"),
                ),
                this.send("SFXButtonClickPlay");
            },
            openTencentTroveUrl() {
              const e = this.get("hasTencentConfigs"),
                t = this.get("tencentTroveURL");
              e && t && window.open(t);
            },
          },
        });
        t.default = d;
      },
      (e, t, n) => {
        const s = n(1).Ember;
        e.exports = s.HTMLBars.template({
          id: "I6iAaiTl",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-tft\\\\src\\\\app\\\\components\\\\tft-event-troves-thumbnail\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-tft\\\\src\\\\app\\\\components\\\\tft-event-troves-thumbnail\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-tft\\\\src\\\\app\\\\components\\\\tft-event-troves-thumbnail\\\\index.js\\" "],["text","\\n"],["open-element","div",[]],["static-attr","class","thumbnail"],["flush-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","card"],["flush-element"],["text","\\n"],["block",["link-to"],["troves",["helper",["query-params"],null,[["displayedBannerId"],[["get",["displayedChasedContentId"]]]]]],[["disabledWhen"],[["get",["isTrovesLinkDisabled"]]]],6],["text","  "],["close-element"],["text","\\n"],["close-element"],["text","\\n\\n"]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","                "],["open-element","div",[]],["static-attr","class","event-banner-image"],["dynamic-attr","style",["concat",["background-image: url(\'",["unknown",["bannerTexture"]],"\')"]]],["flush-element"],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","                "],["open-element","div",[]],["static-attr","class","event-banner-image"],["dynamic-attr","style",["concat",["background-image: url(\'",["unknown",["troveTencentAssetPath"]],"\')"]]],["dynamic-attr","onclick",["helper",["action"],[["get",[null]],"openTencentTroveUrl"],null],null],["flush-element"],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","            "],["open-element","div",[]],["static-attr","class","banner-image-container"],["modifier",["action"],[["get",[null]],"onClickAction"]],["flush-element"],["text","\\n"],["block",["if"],[["get",["hasTencentConfigs"]]],null,1,0],["text","            "],["close-element"],["text","\\n            "],["open-element","div",[]],["static-attr","class","banner-textfield"],["dynamic-attr","style",["concat",["background-image: url(\'",["unknown",["troveTextFieldBgPath"]],"\')"]]],["flush-element"],["text","\\n              "],["open-element","div",[]],["static-attr","class","banner-textfield-text"],["flush-element"],["append",["unknown",["tra","subnav_troves"]],false],["close-element"],["text","\\n              "],["open-element","div",[]],["static-attr","class","banner-textfield-arrow"],["dynamic-attr","style",["concat",["--textfield-arrow-default: url(\'",["unknown",["troveArrowIconDefaultPath"]],"\'); --textfield-arrow-pressed: url(\'",["unknown",["troveArrowIconPressedPath"]],"\');"]]],["flush-element"],["close-element"],["text","\\n            "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","            "],["open-element","img",[]],["dynamic-attr","src",["concat",[["unknown",["missingBannerImage"]]]]],["static-attr","class","banner-image"],["flush-element"],["close-element"],["text","\\n            "],["open-element","div",[]],["static-attr","class","standalone-title-text"],["flush-element"],["append",["unknown",["missingBannerTitle"]],false],["close-element"],["text","\\n            "],["open-element","div",[]],["static-attr","class","standalone-footer-text"],["flush-element"],["append",["unknown",["missingBannerFooter"]],false],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","        "],["open-element","div",[]],["static-attr","class","banner-button"],["flush-element"],["text","\\n"],["block",["if"],[["get",["showMissingBannerImage"]]],null,3,2],["text","        "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","        "],["open-element","div",[]],["static-attr","id","event-trove_loading"],["flush-element"],["text","\\n          "],["append",["unknown",["uikit-spinner"]],false],["text","\\n        "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","      "],["open-element","div",[]],["static-attr","class","tr-card-background"],["dynamic-attr","style",["concat",["--tr-card-background-image: url(\'",["unknown",["eventHubAssets","event-hub-troves-thumbnail-background"]],"\'); --tr-card-background-image-hover: url(\'",["unknown",["eventHubAssets","event-hub-troves-thumbnail-background"]],"\'); --tr-card-background-image-pressed: url(\'",["unknown",["eventHubAssets","event-hub-troves-thumbnail-background"]],"\');"]]],["flush-element"],["close-element"],["text","\\n"],["block",["if"],[["get",["isLoading"]]],null,5,4]],"locals":[]}],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, n) => {
        "use strict";
        n.r(t);
      },
      (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        var s = n(1),
          a = n(2),
          o = s.Ember.Component.extend({
            classNames: [`${a.PLUGIN_NAME}-radial-progress-bar`],
            layout: n(105),
            style: n(106),
            current: null,
            total: null,
            completedIconImagePath: null,
            valueLockedImagePath: null,
            isLocked: !1,
            isComplete: !1,
            isSingleDigitTotalValue: s.Ember.computed("total", function () {
              const e = this.get("total");
              return (
                !!(e && "number" === s.Ember.typeOf(e) && e >= 0) && e < 10
              );
            }),
          });
        t.default = o;
      },
      (e, t, n) => {
        const s = n(1).Ember;
        e.exports = s.HTMLBars.template({
          id: "G8N3Azfe",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-tft\\\\src\\\\app\\\\components\\\\tft-radial-progress-bar\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-tft\\\\src\\\\app\\\\components\\\\tft-radial-progress-bar\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-tft\\\\src\\\\app\\\\components\\\\tft-radial-progress-bar\\\\index.js\\" "],["text","\\n"],["block",["if"],[["get",["isComplete"]]],null,7,6]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","          "],["open-element","div",[]],["static-attr","class","radial-progress-bar-percentage-value radial-progress-bar-value-centralize"],["dynamic-attr","style",["concat",["--progress-current: ",["unknown",["current"]],"; --progress-total: ",["unknown",["total"]]]]],["flush-element"],["text"," "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","          "],["open-element","img",[]],["static-attr","class","radial-progress-bar-value-centralize"],["dynamic-attr","src",["concat",[["unknown",["valueLockedImagePath"]]]]],["flush-element"],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","        "],["open-element","div",[]],["dynamic-attr","class",["helper",["if"],[["get",["isLocked"]],"radial-progress-bar-locked","radial-progress-bar-percentage"],null],null],["dynamic-attr","style",["concat",["--progress-current: ",["unknown",["current"]],"; --progress-total: ",["unknown",["total"]]]]],["flush-element"],["close-element"],["text","\\n"],["block",["if"],[["get",["isLocked"]]],null,1,0]],"locals":[]},{"statements":[["text","          "],["open-element","div",[]],["static-attr","class","radial-progress-bar-against-total-value radial-progress-bar-value-centralize"],["dynamic-attr","style",["concat",["--progress-current: ",["unknown",["current"]],"; --progress-total: ",["unknown",["total"]]]]],["flush-element"],["text"," "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","          "],["open-element","img",[]],["static-attr","class","radial-progress-bar-value-centralize"],["dynamic-attr","src",["concat",[["unknown",["valueLockedImagePath"]]]]],["flush-element"],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","        "],["open-element","div",[]],["dynamic-attr","class",["helper",["if"],[["get",["isLocked"]],"radial-progress-bar-locked","radial-progress-bar-against-total"],null],null],["dynamic-attr","style",["concat",["--progress-current: ",["unknown",["current"]],"; --progress-total: ",["unknown",["total"]]]]],["flush-element"],["close-element"],["text","\\n"],["block",["if"],[["get",["isLocked"]]],null,4,3]],"locals":[]},{"statements":[["text","  "],["open-element","div",[]],["static-attr","class","radial-progress-bar"],["flush-element"],["text","\\n"],["block",["if"],[["get",["isSingleDigitTotalValue"]]],null,5,2],["text","  "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","  "],["open-element","div",[]],["static-attr","class","progress-complete-icon"],["dynamic-attr","style",["concat",["background-image: url(\'",["unknown",["completedIconImagePath"]],"\')"]]],["flush-element"],["close-element"],["text","\\n"]],"locals":[]}],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, n) => {
        "use strict";
        n.r(t);
      },
      (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        var s = n(1),
          a = n(2);
        n(108);
        var o = s.Ember.Component.extend({
          classNames: [`${a.PLUGIN_NAME}-versioned-container`],
          layout: n(109),
          name: "",
          version: 1,
          manual: !1,
          seen: !0,
          showContent: s.Ember.computed.not("seen"),
          responseData: null,
          _isOutdatedVersion(e) {
            return e < this.get("version");
          },
          _patchVersionToSettings(e) {
            (0, s.dataBinding)(a.SETTINGS_PATH).patch(
              a.TFT_BINDING_PATH + a.DATABINDING_CATEGORY.FIRST_TIME,
              { data: { [this.get("name")]: e } },
            );
          },
          async _getVersionFromSettings() {
            const e = this.get("name");
            let t = 0;
            return (
              await (0, s.dataBinding)(a.SETTINGS_PATH)
                .get(a.TFT_BINDING_PATH + a.DATABINDING_CATEGORY.FIRST_TIME)
                .then((n) => {
                  n && n.data && n.data[e] && (t = n.data[e]),
                    n.data || (n.data = {}),
                    this.get("manual") || (n.data[e] = this.get("version")),
                    this.set("responseData", n.data);
                }),
              t
            );
          },
          init() {
            this._super(...arguments),
              this._getVersionFromSettings().then((e) => {
                this._isOutdatedVersion(e) &&
                  (this.set("seen", !1),
                  this.get("manual") ||
                    this._patchVersionToSettings(this.get("version")));
              });
          },
          actions: {
            manuallyTriggerSeen() {
              const e = this.get("responseData");
              e && (e[this.get("name")] = this.get("version")),
                this._patchVersionToSettings(this.get("version"));
            },
          },
        });
        t.default = o;
      },
      (e, t, n) => {
        "use strict";
        n.r(t);
      },
      (e, t, n) => {
        const s = n(1).Ember;
        e.exports = s.HTMLBars.template({
          id: "NvZBVJkW",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-tft\\\\src\\\\app\\\\components\\\\tft-versioned-container\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-tft\\\\src\\\\app\\\\components\\\\tft-versioned-container\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-tft\\\\src\\\\app\\\\components\\\\tft-versioned-container\\\\index.js\\" "],["text","\\n"],["block",["if"],[["get",["showContent"]]],null,0]],"locals":[],"named":[],"yields":["default"],"blocks":[{"statements":[["text","  "],["yield","default",[["helper",["action"],[["get",[null]],"manuallyTriggerSeen"],null]]],["text","\\n"]],"locals":[]}],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        var s = n(1),
          a = n(2);
        n(111);
        var o = s.Ember.Component.extend({
          classNames: [`${a.PLUGIN_NAME}-custom-flex-wrap`],
          layout: n(112),
          elementId: "custom-flex-wrap",
          frames: null,
          columns: 2,
          heightRatio: 1,
          _validInput: s.Ember.computed("frames", function () {
            const e = this.get("frames");
            if (e) {
              let t = !0;
              return e.forEach((e) => (t = t && e.w && e.h && e.content)), !!t;
            }
            return !1;
          }),
          _maxRows: s.Ember.computed("frames", "_validInput", function () {
            if (!this.get("_validInput")) return 0;
            const e = this.get("frames");
            let t = 0;
            return e && e.forEach((e) => (t += e.h)), t;
          }),
          _columnWidthPercent: s.Ember.computed("columns", function () {
            const e = this.get("columns");
            return "number" === s.Ember.typeOf(e) ? 100 / e : 0;
          }),
          _clientRectWidth: 0,
          _cellHeight: s.Ember.computed("_clientRectWidth", function () {
            const e = this.get("_clientRectWidth"),
              t = this.get("columns"),
              n = this.get("heightRatio");
            if (
              "number" === s.Ember.typeOf(t) &&
              "number" === s.Ember.typeOf(n)
            )
              return (e / t) * n;
          }),
          _processedFrames: s.Ember.computed(
            "frames",
            "_validInput",
            function () {
              if (!this.get("_validInput")) return [];
              const e = this.get("frames");
              if (s.Ember.isEmpty(e) || "array" !== s.Ember.typeOf(e))
                return [];
              let t = 0;
              const n = [],
                a = this.get("columns"),
                o = this.get("_maxRows"),
                l = [...Array(o)].map((e) => Array(a).fill(0));
              let i = 0;
              const r = (e = 1, t = 1, s = null) => {
                n.push({ w: e, h: t, content: s });
              };
              for (let c = 0; c < o; ++c)
                for (let m = 0; m < a; ++m) {
                  if (l[c][m]) {
                    r();
                    continue;
                  }
                  const u = e[t];
                  if (u) {
                    let e = !0;
                    if (u.w > a)
                      return (
                        s.logger.error(
                          "tft-custom-flex-wrap item width defined larger than columns.",
                        ),
                        []
                      );
                    for (let t = m; t < m + u.w; ++t)
                      if (l[c][t] || t >= a) {
                        e = !1;
                        break;
                      }
                    if (e) {
                      for (let e = 0; e < u.h && c + e < o; ++e)
                        for (let t = 0; t < u.w && m + t < a; ++t)
                          (l[c + e][m + t] = 1), (i = Math.max(i, c + e));
                      r(u.w, u.h, u.content), ++t;
                    } else r();
                  } else {
                    if (!(c <= i)) return n;
                    r();
                  }
                }
              return n;
            },
          ),
          didRender() {
            this.set(
              "_clientRectWidth",
              document
                .getElementById(this.get("elementId"))
                .getBoundingClientRect().width,
            );
          },
        });
        t.default = o;
      },
      (e, t, n) => {
        "use strict";
        n.r(t);
      },
      (e, t, n) => {
        const s = n(1).Ember;
        e.exports = s.HTMLBars.template({
          id: "nURjg/ir",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-tft\\\\src\\\\app\\\\components\\\\tft-custom-flex-wrap\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-tft\\\\src\\\\app\\\\components\\\\tft-custom-flex-wrap\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-tft\\\\src\\\\app\\\\components\\\\tft-custom-flex-wrap\\\\index.js\\" "],["text","\\n"],["block",["each"],[["get",["_processedFrames"]]],null,1]],"locals":[],"named":[],"yields":["default"],"blocks":[{"statements":[["text","        "],["yield","default",[["get",["frame","content"]]]],["text","\\n"]],"locals":[]},{"statements":[["text","  "],["open-element","div",[]],["static-attr","class","frame"],["dynamic-attr","style",["concat",["height: ",["unknown",["_cellHeight"]],"px; --column-width-percent: ",["unknown",["_columnWidthPercent"]],"%;"]]],["flush-element"],["text","\\n    "],["open-element","div",[]],["dynamic-attr","class",["concat",["content ",["helper",["if"],[["get",["frame","content"]],"wireframe"],null]]]],["dynamic-attr","style",["concat",["--cellWidth: ",["unknown",["frame","w"]],"; --cellHeight: ",["unknown",["frame","h"]],";"]]],["flush-element"],["text","\\n"],["block",["if"],[["get",["frame","content"]]],null,0],["text","    "],["close-element"],["text","\\n  "],["close-element"],["text","\\n"]],"locals":["frame","index"]}],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        var s = n(1),
          a = n(2);
        n(114);
        var o = s.Ember.Component.extend({
          classNames: [`${a.PLUGIN_NAME}-content-viewport`],
          layout: n(115),
          fullHeight: !1,
          didInsertElement() {
            this.get("fullHeight") &&
              ((this.element.style.top = 0),
              (this.element.style.height = "100vh"));
          },
        });
        t.default = o;
      },
      (e, t, n) => {
        "use strict";
        n.r(t);
      },
      (e, t, n) => {
        const s = n(1).Ember;
        e.exports = s.HTMLBars.template({
          id: "piRRsuAM",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-tft\\\\src\\\\app\\\\components\\\\tft-content-viewport\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-tft\\\\src\\\\app\\\\components\\\\tft-content-viewport\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-tft\\\\src\\\\app\\\\components\\\\tft-content-viewport\\\\index.js\\" "],["text","\\n"],["yield","default"]],"locals":[],"named":[],"yields":["default"],"blocks":[],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        var s = n(1),
          a = n(2),
          o = s.Ember.Component.extend({
            classNames: [`${a.PLUGIN_NAME}-event-daily-login-thumbnail`],
            layout: n(117),
            style: n(118),
            showDailyLoginPage: !1,
            showPip: !0,
            tftService: s.Ember.inject.service("tft"),
            eventHubAssets: s.Ember.computed.alias("tftService.eventHubAssets"),
            dailyLoginPass: s.Ember.computed.alias(
              "tftService.tftPassDailyLoginPass",
            ),
            milestones: s.Ember.computed(
              "dailyLoginPass.milestones.@each.{internalName,milestoneId,isLocked,pointsEarnedForMilestone}",
              function () {
                return s.Ember.A(
                  Array.from(this.get("dailyLoginPass.milestones")),
                );
              },
            ),
            activeMilestone: s.Ember.computed.alias(
              "dailyLoginPass.activeMilestone",
            ),
            isDailyPassComplete: s.Ember.computed(
              "milestones.lastObject.state",
              function () {
                if (null == this.get("milestones")) return !1;
                const e = this.get("milestones.lastObject.state");
                return (
                  e === a.BP_V2_MILESTONE_REWARDABLE ||
                  e === a.BP_V2_MILESTONE_CLAIMABLE ||
                  e === a.BP_V2_MILESTONE_COMPLETE
                );
              },
            ),
            milestoneToDisplay: s.Ember.computed(
              "milestones",
              "activeMilestone",
              function () {
                const e = this.get("milestones"),
                  t = this.get("activeMilestone");
                if (null == e) return null;
                const n = e.filter(
                    (e) => e.state === a.BP_V2_MILESTONE_COMPLETE,
                  ),
                  s = n.length ? n[n.length - 1] : null,
                  o = e.find((e) => e.state === a.BP_V2_MILESTONE_CLAIMABLE);
                return o || s || t;
              },
            ),
            actions: {
              showDailyLoginModal() {
                this.set("showDailyLoginPage", !0);
              },
              hideDailyLoginModal() {
                s.Ember.run.later(() => {
                  this.set("showDailyLoginPage", !1);
                }, 300);
              },
            },
          });
        t.default = o;
      },
      (e, t, n) => {
        const s = n(1).Ember;
        e.exports = s.HTMLBars.template({
          id: "2zXGid4a",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-tft\\\\src\\\\app\\\\components\\\\tft-event-daily-login-thumbnail\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-tft\\\\src\\\\app\\\\components\\\\tft-event-daily-login-thumbnail\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-tft\\\\src\\\\app\\\\components\\\\tft-event-daily-login-thumbnail\\\\index.js\\" "],["text","\\n"],["open-element","div",[]],["static-attr","class","daily-login-thumbnail"],["dynamic-attr","onclick",["helper",["action"],[["get",[null]],"showDailyLoginModal"],null],null],["dynamic-attr","style",["concat",["--card-background-image: url(\'",["unknown",["eventHubAssets","event-hub-daily-login-thumbnail-card-bg"]],"\'); --card-background-image-hover: url(\'",["unknown",["eventHubAssets","event-hub-daily-login-thumbnail-card-bg"]],"\'); --card-background-image-pressed: url(\'",["unknown",["eventHubAssets","event-hub-daily-login-thumbnail-card-bg"]],"\');"]]],["flush-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","daily-login-thumbnail-title"],["flush-element"],["append",["unknown",["tra","tft_eventhub_daily_login_thumbnail_title"]],false],["close-element"],["text","\\n"],["block",["if"],[["get",["showPip"]]],null,2],["text","\\n  "],["append",["helper",["tft-event-daily-login-reward-item"],null,[["milestone","showHeader"],[["get",["milestoneToDisplay"]],false]]],false],["text","\\n"],["close-element"],["text","\\n"],["block",["if"],[["get",["showDailyLoginPage"]]],null,1]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","    "],["append",["helper",["tft-event-daily-login-page"],null,[["hideDailyLoginModal"],[["helper",["action"],[["get",[null]],"hideDailyLoginModal"],null]]]],false],["text","\\n"]],"locals":[]},{"statements":[["block",["uikit-modal"],null,[["type","dismissibleType","dismissible"],["DialogDismiss","inside","true"]],0]],"locals":[]},{"statements":[["text","      "],["open-element","div",[]],["static-attr","class","tft-sub-nav-pip-cta"],["flush-element"],["text","\\n          "],["append",["unknown",["call-to-action-pip"]],false],["text","\\n      "],["close-element"],["text","\\n"]],"locals":[]}],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, n) => {
        "use strict";
        n.r(t);
      },
      (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        var s = n(1),
          a = n(2),
          o = n(89);
        const l = s.UIKit.getVignetteCelebrationManager();
        var i = s.Ember.Component.extend({
          classNames: [`${a.PLUGIN_NAME}-event-daily-login-page`],
          layout: n(120),
          style: n(121),
          tftService: s.Ember.inject.service("tft"),
          eventHubAssets: s.Ember.computed.alias("tftService.eventHubAssets"),
          eventSeriesId: s.Ember.computed.alias("tftService.eventSeriesId"),
          dailyLoginPass: s.Ember.computed.alias(
            "tftService.tftPassDailyLoginPass",
          ),
          milestones: s.Ember.computed(
            "dailyLoginPass.milestones.@each.{milestoneId,isLocked,pointsEarnedForMilestone}",
            function () {
              return s.Ember.A(
                Array.from(this.get("dailyLoginPass.milestones")),
              );
            },
          ),
          claimableMilestones: s.Ember.computed(
            "milestones.@each.status",
            function () {
              return this.get("milestones").filterBy("status", "CLAIMABLE");
            },
          ),
          noClaimableMilestones: s.Ember.computed.lt(
            "claimableMilestones.length",
            1,
          ),
          isAnyClaimInProgress: s.Ember.computed(
            "milestones.@each.isClaimRequestPending",
            function () {
              return this.get("milestones").some(
                (e) => !0 === e.isClaimRequestPending,
              );
            },
          ),
          init() {
            this._super(...arguments),
              (0, o.trackEventHubDailyLoginModuleOpen)(
                this.get("eventSeriesId"),
              );
          },
          _createDailyRewardCelebration(e, t, n, o, i) {
            l.add({
              id: "tft_event_daily_login_celebration",
              height: "LARGE",
              data: {
                header: { title: n, titleSubtext: o },
                backgroundImageUrl: t,
                nextButtonText: i,
              },
              content: s.componentFactory.create({
                type: a.EVENT_DAILY_LOGIN_CELEBRATION_NAME,
                data: s.Ember.Object.create({ rewards: e }),
              }),
            });
          },
          actions: {
            claimSingleDailyReward(e) {
              if (this.get("isAnyClaimInProgress")) return;
              const t = this.get("dailyLoginPass.info.passId");
              s.Ember.set(e, "isClaimRequestPending", !0),
                s.db
                  .put(
                    `/lol-tft-pass/v1/pass/${t}/milestone/${e.milestoneId}/reward`,
                  )
                  .then(() => {
                    this.get("_createDailyRewardCelebration")(
                      [{ milestone: e }],
                      this.get(
                        "eventHubAssets.event-daily-login-celebration-background",
                      ),
                      this.get("tra.celebration_title"),
                      this.get("tra.tft_daily_login_celebration_subtitle"),
                      this.get("tra.celebration_button_text_multi"),
                    );
                  })
                  .finally(() => {
                    s.Ember.set(e, "isClaimRequestPending", !1);
                  }),
                (0, o.trackEventHubDailyLoginClaim)(
                  e.milestoneId,
                  this.get("eventSeriesId"),
                );
            },
            claimAllDailyReward() {
              if (
                this.get("isAnyClaimInProgress") ||
                0 === this.get("claimableMilestones").length
              )
                return;
              const e = this.get("tftService"),
                t = this.get("claimableMilestones");
              for (const e of t) s.Ember.set(e, "isClaimRequestPending", !0);
              e
                .claimAllRewards(this.get("dailyLoginPass.info.passId"))
                .then(() => {
                  this.get("_createDailyRewardCelebration")(
                    t.map((e) => ({ milestone: e })),
                    this.get(
                      "eventHubAssets.event-daily-login-celebration-background",
                    ),
                    this.get("tra.celebration_title"),
                    this.get("tra.tft_daily_login_celebration_subtitle"),
                    this.get("tra.celebration_button_text_multi"),
                  );
                })
                .finally(() => {
                  for (const e of t)
                    s.Ember.set(e, "isClaimRequestPending", !1);
                }),
                (0, o.trackEventHubDailyLoginClaimAllClick)(
                  this.get("eventSeriesId"),
                );
            },
            onCloseClicked() {
              this.sendAction("hideDailyLoginModal");
            },
          },
        });
        t.default = i;
      },
      (e, t, n) => {
        const s = n(1).Ember;
        e.exports = s.HTMLBars.template({
          id: "4Wc6nvyL",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-tft\\\\src\\\\app\\\\components\\\\tft-event-daily-login-page\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-tft\\\\src\\\\app\\\\components\\\\tft-event-daily-login-page\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-tft\\\\src\\\\app\\\\components\\\\tft-event-daily-login-page\\\\index.js\\" "],["text","\\n"],["open-element","div",[]],["static-attr","class","daily-reward-page"],["dynamic-attr","style",["concat",["--background-image: url(\'",["unknown",["eventHubAssets","daily-login-modal-bg"]],"\');"]]],["flush-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","header"],["flush-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","page-title gray-box"],["flush-element"],["append",["unknown",["tra","tft_daily_login_header_text"]],false],["close-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","page-subtitle gray-box"],["flush-element"],["append",["unknown",["tra","tft_daily_login_subheader_text"]],false],["close-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","close-button"],["dynamic-attr","onclick",["helper",["action"],[["get",[null]],"onCloseClicked"],null],null],["dynamic-attr","style",["concat",["--close-button-default: url(\'",["unknown",["eventHubAssets","event-daily-modal-close-default"]],"\'); --close-button-hover: url(\'",["unknown",["eventHubAssets","event-daily-modal-close-hover"]],"\'); --close-button-clicked: url(\'",["unknown",["eventHubAssets","event-daily-modal-close-clicked"]],"\');"]]],["flush-element"],["close-element"],["text","\\n\\n  "],["close-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","body gray-box"],["flush-element"],["text","    \\n    "],["open-element","div",[]],["static-attr","class","daily-rewards-container gray-box"],["flush-element"],["text","\\n"],["block",["each"],[["get",["milestones"]]],null,0],["text","    "],["close-element"],["text","\\n  "],["close-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","footer gray-box"],["flush-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","claim-button"],["dynamic-attr","disabled",["unknown",["noClaimableMilestones"]],null],["dynamic-attr","onclick",["helper",["action"],[["get",[null]],"claimAllDailyReward"],null],null],["dynamic-attr","style",["concat",["--button-default: url(\'",["unknown",["eventHubAssets","daily-login-reward-button-bg"]],"\'); --button-hover: url(\'",["unknown",["eventHubAssets","daily-login-reward-button-bg-hover"]],"\'); --button-clicked: url(\'",["unknown",["eventHubAssets","daily-login-reward-button-bg-clicked"]],"\'); --button-disabled: url(\'",["unknown",["eventHubAssets","daily-login-reward-button-bg-disabled"]],"\');"]]],["flush-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","claim-text"],["dynamic-attr","disabled",["unknown",["noClaimableMilestones"]],null],["flush-element"],["text"," "],["append",["unknown",["tra","tft_daily_login_claim_all"]],false],["text"," "],["close-element"],["text","\\n    "],["close-element"],["text","\\n  "],["close-element"],["text","\\n"],["close-element"]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","      "],["open-element","div",[]],["static-attr","class","daily-reward gray-box"],["flush-element"],["text","\\n        "],["append",["helper",["tft-event-daily-login-reward-item"],null,[["class","milestone","passId","showHeader","claimSingleDailyReward"],["daily-login-reward-item",["get",["milestone"]],["get",["dailyLoginPass","info","passId"]],true,["helper",["action"],[["get",[null]],"claimSingleDailyReward"],null]]]],false],["text","\\n      "],["close-element"],["text","\\n"]],"locals":["milestone"]}],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, n) => {
        "use strict";
        n.r(t);
      },
      (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        var s = n(1),
          a = n(2),
          o = s.Ember.Component.extend({
            classNames: [`${a.PLUGIN_NAME}-daily-login-reward-item`],
            layout: n(123),
            style: n(124),
            milestone: null,
            passId: null,
            showHeader: !0,
            tftService: s.Ember.inject.service("tft"),
            eventHubAssets: s.Ember.computed.alias("tftService.eventHubAssets"),
            isClaimable: s.Ember.computed.equal(
              "milestone.status",
              "CLAIMABLE",
            ),
            isClaimed: s.Ember.computed.equal("milestone.status", "COMPLETE"),
            title: s.Ember.computed("index", "milestone", function () {
              const e = this.get("milestone.level") + 1;
              return this.get("tra").formatString(
                "tft_daily_login_reward_day_text",
                { day: e },
              );
            }),
            rewardFramePath: s.Ember.computed(
              "isClaimable",
              "isClaimed",
              function () {
                return this.get("isClaimable")
                  ? this.get("eventHubAssets.event-daily-item-frame-claimable")
                  : this.get("isClaimed")
                    ? this.get("eventHubAssets.event-daily-item-frame-claimed")
                    : this.get("eventHubAssets.event-daily-item-frame-default");
              },
            ),
            rewardFrameHoverPath: s.Ember.computed(
              "isClaimable",
              "isClaimed",
              function () {
                return this.get("isClaimable")
                  ? this.get(
                      "eventHubAssets.event-daily-item-frame-claimable-hover",
                    )
                  : this.get("isClaimed")
                    ? this.get(
                        "eventHubAssets.event-daily-item-frame-claimed-hover",
                      )
                    : this.get(
                        "eventHubAssets.event-daily-item-frame-default-hover",
                      );
              },
            ),
            description: s.Ember.computed("milestone.rewards", function () {
              const e = this.get("milestone.rewards"),
                t = e[0]?.description;
              return isNaN(t) ? "" : t;
            }),
            isLoading: s.Ember.computed.bool(
              "rewardInfo.isClaimRequestPending",
            ),
            actions: {
              claimReward() {
                const e = this.get("milestone");
                this.get("isClaimable") &&
                  this.sendAction("claimSingleDailyReward", e);
              },
            },
          });
        t.default = o;
      },
      (e, t, n) => {
        const s = n(1).Ember;
        e.exports = s.HTMLBars.template({
          id: "C2nGzIrq",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-tft\\\\src\\\\app\\\\components\\\\tft-event-daily-login-reward-item\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-tft\\\\src\\\\app\\\\components\\\\tft-event-daily-login-reward-item\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-tft\\\\src\\\\app\\\\components\\\\tft-event-daily-login-reward-item\\\\index.js\\" "],["text","\\n"],["open-element","div",[]],["static-attr","class","daily-reward-item"],["dynamic-attr","onclick",["helper",["action"],[["get",[null]],"claimReward"],null],null],["flush-element"],["text","\\n"],["block",["if"],[["get",["showHeader"]]],null,2],["text","    "],["open-element","div",[]],["static-attr","class","daily-reward-icon-layout"],["flush-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","daily-reward-icon-background"],["dynamic-attr","style",["concat",["background-image: url(\'",["unknown",["eventHubAssets","event-daily-item-thumbnail-background"]],"\')"]]],["flush-element"],["close-element"],["text","\\n      "],["open-element","img",[]],["static-attr","class","daily-reward-icon"],["dynamic-attr","class",["concat",[["helper",["if"],[["get",["isClaimed"]],"daily-reward-icon-grey-out"],null]]]],["dynamic-attr","src",["concat",[["unknown",["milestone","iconImageUrl"]]]]],["flush-element"],["close-element"],["text","\\n"],["block",["if"],[["get",["isClaimed"]]],null,1,0],["text","      "],["open-element","div",[]],["static-attr","class","daily-reward-icon-frame"],["dynamic-attr","style",["concat",["--reward-frame-default: url(\'",["unknown",["rewardFramePath"]],"\'); --reward-frame-hover: url(\'",["unknown",["rewardFrameHoverPath"]],"\');"]]],["flush-element"],["close-element"],["text","\\n    "],["close-element"],["text","\\n"],["close-element"]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","        "],["open-element","div",[]],["static-attr","class","daily-reward-description"],["flush-element"],["append",["unknown",["description"]],false],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","        "],["open-element","img",[]],["static-attr","class","daily-reward-icon-claimed"],["dynamic-attr","src",["concat",[["unknown",["eventHubAssets","event-daily-item-claimed-tick"]]]]],["flush-element"],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","      "],["open-element","div",[]],["static-attr","class","daily-reward-day-header"],["dynamic-attr","style",["concat",["background-image: url(\'",["unknown",["eventHubAssets","daily-login-reward-day-bg"]],"\')"]]],["flush-element"],["text","\\n        "],["open-element","div",[]],["static-attr","class","daily-reward-day-text"],["flush-element"],["text","\\n          "],["append",["unknown",["title"]],false],["text","\\n        "],["close-element"],["text","\\n      "],["close-element"],["text","\\n"]],"locals":[]}],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, n) => {
        "use strict";
        n.r(t);
      },
      (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        var s = n(1),
          a = n(2);
        const o = "lny24-event-hub-time-remaining-icon";
        var l = s.Ember.Component.extend({
          classNames: [`${a.PLUGIN_NAME}-event-timer`],
          layout: n(126),
          style: n(127),
          basicTimer: !1,
          tftService: s.Ember.inject.service("tft"),
          eventsData: s.Ember.computed.alias("tftService.eventsData"),
          eventData: s.Ember.computed("eventsData", function () {
            const e = this.get("eventsData");
            return e && Array.isArray(e) && 1 === e.length ? e[0] : null;
          }),
          eventHubAssets: s.Ember.computed.alias("tftService.eventHubAssets"),
          iconTimeRemainingImagePath: s.Ember.computed(
            "eventHubAssets",
            function () {
              const e = this.get("eventHubAssets");
              return e ? e[o] : "";
            },
          ),
          endDate: s.Ember.computed("eventData", function () {
            const e = this.get("eventData");
            return e ? e.endDate : "";
          }),
          timeoutExpired: !1,
          timeLeftString: s.Ember.computed(
            "timeoutExpired",
            "endDate",
            function () {
              const e = this.get("endDate");
              if (!e) return "";
              let t = new Date(e) - Date.now();
              const n = Math.floor(t / a.DAY_IN_MS);
              t -= 86400 * n;
              const o = Math.floor(t / a.HOUR_IN_MS) % 24;
              t -= 3600 * o;
              const l = Math.floor(t / a.MINUTE_IN_MS) % 60;
              let i, r, c;
              t -= 60 * l;
              let m = 0;
              return n > 0
                ? ((i = this.get("tra").formatString("tft_duration_days", {
                    days: n,
                  })),
                  this.get("tra").formatString(
                    "battlepass_time_till_event_end",
                    { duration: i },
                  ))
                : (o > 0 && n <= 1
                    ? ((r = this.get("tra").formatString("tft_duration_hours", {
                        hours: o,
                      })),
                      (m = o > 1 ? a.HOUR_IN_MS : a.MINUTE_IN_MS))
                    : ((c = this.get("tra").formatString(
                        "tft_duration_minutes",
                        { minutes: l },
                      )),
                      (m = a.MINUTE_IN_MS)),
                  (this.timeoutExpired = !1),
                  m > 0 &&
                    s.Ember.run.later(
                      this,
                      function () {
                        this.set("timeoutExpired", !0);
                      },
                      m,
                    ),
                  r && c
                    ? this.get("tra").formatString(
                        "battlepass_time_till_event_end_hours_and_minutes",
                        { hour_duration: r, minutes_duration: c },
                      )
                    : this.get("tra").formatString(
                        "battlepass_time_till_event_end",
                        { duration: r || c },
                      ));
            },
          ),
        });
        t.default = l;
      },
      (e, t, n) => {
        const s = n(1).Ember;
        e.exports = s.HTMLBars.template({
          id: "lM6bpf/W",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-tft\\\\src\\\\app\\\\components\\\\tft-event-timer\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-tft\\\\src\\\\app\\\\components\\\\tft-event-timer\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-tft\\\\src\\\\app\\\\components\\\\tft-event-timer\\\\index.js\\" "],["text","\\n"],["open-element","div",[]],["static-attr","class","event-time-row"],["flush-element"],["text","\\n"],["block",["if"],[["get",["basicTimer"]]],null,1,0],["close-element"],["text","\\n\\n"]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","  "],["open-element","div",[]],["static-attr","class","event-time-text-non-basic"],["flush-element"],["append",["unknown",["tra","tft_eventhub_timer_text"]],false],["close-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","event-remaining-time"],["flush-element"],["text","\\n    "],["append",["helper",["countdown-widget"],null,[["endDate","preCountdownEnabled","countdownEnabled","requireStartDateToTransition","hidePreCountdownAfterStartDate","hideCountdownAfterEndDate","endingWrappingText","endingLongTimeText"],[["get",["endDate"]],false,true,false,false,false,["get",["tra","tft_event_time_until_end"]],""]]],false],["text","\\n  "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","  "],["open-element","div",[]],["static-attr","class","event-time-icon"],["dynamic-attr","style",["concat",["background-image: url(\'",["unknown",["iconTimeRemainingImagePath"]],"\')"]]],["flush-element"],["close-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","event-time-text"],["flush-element"],["append",["unknown",["timeLeftString"]],false],["close-element"],["text","\\n"]],"locals":[]}],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, n) => {
        "use strict";
        n.r(t);
      },
      (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        var s = n(1),
          a = n(2),
          o = s.Ember.Component.extend({
            classNames: [`${a.PLUGIN_NAME}-event-play-panel`],
            layout: n(129),
            style: n(130),
            backgroundPlayCardImagePath: "",
            tftService: s.Ember.inject.service("tft"),
            eventHubAssets: s.Ember.computed.alias("tftService.eventHubAssets"),
            eventsData: s.Ember.computed.alias("tftService.eventsData"),
            eventData: s.Ember.computed("eventsData", function () {
              const e = this.get("eventsData");
              return e && Array.isArray(e) && 1 === e.length ? e[0] : null;
            }),
            eventQueueId: s.Ember.computed("eventData", function () {
              const e = this.get("eventData"),
                t = e.queueIds;
              return t && Array.isArray(t) && t.length
                ? e.queueIds[0]
                : (s.logger.error("No queueId is configured for this event"),
                  null);
            }),
          });
        t.default = o;
      },
      (e, t, n) => {
        const s = n(1).Ember;
        e.exports = s.HTMLBars.template({
          id: "jHe0Ws5X",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-tft\\\\src\\\\app\\\\components\\\\tft-event-play-panel\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-tft\\\\src\\\\app\\\\components\\\\tft-event-play-panel\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-tft\\\\src\\\\app\\\\components\\\\tft-event-play-panel\\\\index.js\\" "],["text","\\n"],["open-element","div",[]],["static-attr","class","play-panel-component"],["flush-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","play-button-wrapper"],["dynamic-attr","onclick",["helper",["action"],[["get",[null]],"test"],null],null],["modifier",["action"],[["get",[null]],"telemetryClickGameMode"]],["flush-element"],["text","\\n    "],["append",["helper",["tft-quick-play"],null,[["buttonClassName","queueIdOverride","queueButtonTextOverride"],["event-play",["get",["eventQueueId"]],["get",["tra","tft_eventhub_play_button_text"]]]]],false],["text","\\n  "],["close-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","play-panel-background"],["dynamic-attr","style",["concat",["--play-background-image: url(\'",["unknown",["backgroundPlayCardImagePath"]],"\');"]]],["flush-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","pengu"],["dynamic-attr","style",["concat",["background-image: url(\'",["unknown",["eventHubAssets","event-hub-play-card-pride-pengu"]],"\')"]]],["flush-element"],["close-element"],["text","\\n  "],["close-element"],["text","\\n"],["close-element"],["text","\\n"]],"locals":[],"named":[],"yields":[],"blocks":[],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, n) => {
        "use strict";
        n.r(t);
      },
      (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        var s = n(1),
          a = n(2),
          o = s.Ember.Component.extend({
            classNames: [`${a.PLUGIN_NAME}-event-mission-panel`],
            layout: n(132),
            style: n(133),
            showMissionTracker: !0,
            showMissionTrackerConnector: !0,
            overrideRewardIcon: !1,
            showTimer: !1,
            tftService: s.Ember.inject.service("tft"),
            eventHubAssets: s.Ember.computed.alias("tftService.eventHubAssets"),
            eventsData: s.Ember.computed.alias("tftService.eventsData"),
            eventData: s.Ember.computed("eventsData", function () {
              const e = this.get("eventsData");
              return e && Array.isArray(e) && 1 === e.length ? e[0] : null;
            }),
            allMissionChains: s.Ember.computed.alias(
              "tftService.tftEventMissions",
            ),
            hasMission: s.Ember.computed.notEmpty("allMissionChains"),
            missionsCompleted: s.Ember.computed(
              "allMissionChains",
              function () {
                const e = this.get("allMissionChains");
                return (
                  "array" === s.Ember.typeOf(e) &&
                  e.every(
                    (e) =>
                      s.Ember.isEmpty(e.missions) ||
                      "COMPLETED" === e.missions[e.missions.length - 1].status,
                  )
                );
              },
            ),
            sortedMissionChains: s.Ember.computed(
              "allMissionChains",
              function () {
                if (!this.get("hasMission")) return null;
                const e = [],
                  t = [];
                return (
                  this.get("allMissionChains").forEach((n) => {
                    -1 === n.missions.findIndex((e) => "PENDING" === e.status)
                      ? t.push(n)
                      : e.push(n);
                  }),
                  e.concat(t)
                );
              },
            ),
          });
        t.default = o;
      },
      (e, t, n) => {
        const s = n(1).Ember;
        e.exports = s.HTMLBars.template({
          id: "O642DvKB",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-tft\\\\src\\\\app\\\\components\\\\tft-event-mission-panel\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-tft\\\\src\\\\app\\\\components\\\\tft-event-mission-panel\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-tft\\\\src\\\\app\\\\components\\\\tft-event-mission-panel\\\\index.js\\" "],["text","\\n\\n"],["block",["if"],[["get",["hasMission"]]],null,4,0]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","  "],["open-element","div",[]],["static-attr","class","failed-to-load"],["flush-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","icon"],["dynamic-attr","style",["concat",["background-image: url(\'",["unknown",["eventHubAssets","missions-failed-to-load-icon"]],"\')"]]],["flush-element"],["close-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","title"],["flush-element"],["append",["unknown",["tra","troves_hub_banner_error_title"]],false],["close-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","footer"],["flush-element"],["append",["unknown",["tra","troves_hub_banner_error_footer"]],false],["close-element"],["text","\\n  "],["close-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","failed-to-load-icon"],["flush-element"],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","      "],["append",["helper",["tft-event-mission-chain"],null,[["class","missionChain","showMissionTracker","overrideRewardIcon","showMissionTrackerConnector"],["event-mission-chain",["get",["missionChain"]],["get",["showMissionTracker"]],["get",["overrideRewardIcon"]],["get",["showMissionTrackerConnector"]]]]],false],["text","\\n"]],"locals":["missionChain"]},{"statements":[["text","      "],["open-element","div",[]],["static-attr","class","missions-complete"],["dynamic-attr","style",["concat",["background-image: url(\'",["unknown",["eventHubAssets","all-missions-complete-bg"]],"\')"]]],["flush-element"],["text","\\n        "],["open-element","div",[]],["static-attr","class","missions-complete-text"],["flush-element"],["append",["unknown",["tra","tft_eventHub_missions_complete_text"]],false],["close-element"],["text","\\n      "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","      "],["open-element","div",[]],["static-attr","class","event-timer"],["flush-element"],["text","\\n        "],["append",["unknown",["tft-event-timer"]],false],["text","\\n      "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","  "],["open-element","lol-uikit-scrollable",[]],["static-attr","class","scroll-content-container"],["static-attr","overflow-masks","enabled"],["flush-element"],["text","\\n"],["block",["if"],[["get",["showTimer"]]],null,3],["block",["if"],[["get",["missionsCompleted"]]],null,2],["block",["each"],[["get",["sortedMissionChains"]]],null,1],["text","  "],["close-element"],["text","\\n"]],"locals":[]}],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, n) => {
        "use strict";
        n.r(t);
      },
      (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        var s,
          a = (s = n(88)) && s.__esModule ? s : { default: s },
          o = n(1),
          l = n(2);
        n(135);
        var i = o.Ember.Component.extend(a.default, {
          classNames: [`${l.PLUGIN_NAME}-event-hub-xs`],
          layout: n(136),
          style: n(137),
          telemetryEventPassTimeSpent: null,
          showTrovesThumbnail: !1,
          tftService: o.Ember.inject.service("tft"),
          eventHubAssets: o.Ember.computed.alias("tftService.eventHubAssets"),
          eventsData: o.Ember.computed.alias("tftService.eventsData"),
          eventData: o.Ember.computed("eventsData", function () {
            const e = this.get("eventsData");
            return e && Array.isArray(e) && 1 === e.length ? e[0] : null;
          }),
          titleName: o.Ember.computed("eventData", function () {
            const e = this.get("eventData");
            return e ? this.get("tra").formatString(e.titleTranslationKey) : "";
          }),
          activeBanners: o.Ember.computed.alias(
            "trovesService.troveActiveBanners",
          ),
          bannerToDisplay: o.Ember.computed("activeBanners", function () {
            const e = this.get("activeBanners");
            if (e)
              for (let t = 0; t < e.length; ++t)
                if (e[t] && e[t].status && !e[t].status.owned) return e[t];
            return null;
          }),
          urlFaq: o.Ember.computed("eventData", function () {
            return this.get("eventData")?.urlFaq || "";
          }),
          init() {
            this._super(...arguments),
              o.db.patch("/lol-settings/v2/account/TFT/VersionsSeen", {
                data: { eventHub: 1 },
              });
          },
          actions: {
            openEventUrlFaq() {
              this.get("urlFaq") && window.open(this.get("urlFaq", "_blank"));
            },
          },
        });
        t.default = i;
      },
      (e, t, n) => {
        "use strict";
        n.r(t);
      },
      (e, t, n) => {
        const s = n(1).Ember;
        e.exports = s.HTMLBars.template({
          id: "oPwgtsMG",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-tft\\\\src\\\\app\\\\components\\\\tft-event-hub-xs\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-tft\\\\src\\\\app\\\\components\\\\tft-event-hub-xs\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-tft\\\\src\\\\app\\\\components\\\\tft-event-hub-xs\\\\index.js\\" "],["text","\\n"],["block",["tft-event-hub"],null,[["telemetryEventPassTimeSpent"],[["get",["telemetryEventPassTimeSpent"]]]],3],["text","\\n"]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","    "],["append",["helper",["tft-event-mission-panel"],null,[["showMissionTracker"],[false]]],false],["text","\\n"]],"locals":[]},{"statements":[["text","          "],["open-element","div",[]],["static-attr","class","troves-thumbnail-wrapper gray-box"],["flush-element"],["text","\\n            "],["append",["helper",["tft-event-troves-thumbnail"],null,[["displayedBannerOverride","cardBackgroundDefaultPath","cardBackgroundHoverPath","cardBackgroundPressedPath"],[["get",["bannerToDisplay"]],["get",["cardBackgroundDefaultPath"]],["get",["cardBackgroundHoverPath"]],["get",["cardBackgroundPressedPath"]]]]],false],["text","\\n          "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","    "],["open-element","div",[]],["static-attr","class","left-panel gray-box"],["flush-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","left-top gray-box"],["flush-element"],["text","\\n        "],["open-element","div",[]],["static-attr","class","logo-tft-name"],["dynamic-attr","style",["concat",["background-image: url(\'",["unknown",["logoTftNameImagePath"]],"\')"]]],["flush-element"],["close-element"],["text","\\n        "],["open-element","div",[]],["static-attr","class","event-name"],["flush-element"],["append",["unknown",["titleName"]],false],["close-element"],["text","\\n        "],["open-element","div",[]],["static-attr","class","timer-wrapper"],["flush-element"],["text","\\n          "],["append",["helper",["tft-event-timer"],null,[["basicTimer"],[true]]],false],["text","\\n        "],["close-element"],["text","\\n        "],["open-element","div",[]],["static-attr","class","event-info-link"],["flush-element"],["text","\\n          "],["open-element","div",[]],["static-attr","class","link-text"],["dynamic-attr","onclick",["helper",["action"],[["get",[null]],"openEventUrlFaq"],null],null],["flush-element"],["append",["unknown",["tra","tft_eventhub_faq_text"]],false],["close-element"],["text","\\n          "],["open-element","div",[]],["static-attr","class","link-icon"],["dynamic-attr","style",["concat",["background-image: url(\'",["unknown",["eventHubAssets","event-info-link-icon"]],"\');"]]],["flush-element"],["close-element"],["text","\\n        "],["close-element"],["text","\\n      "],["close-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","left-btm gray-box"],["flush-element"],["text","\\n"],["block",["if"],[["get",["showTrovesThumbnail"]]],null,1],["text","      "],["close-element"],["text","\\n    "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["block",["baseHub","leftPanel"],null,null,2],["block",["baseHub","rightPanel"],null,null,0]],"locals":["baseHub"]}],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, n) => {
        "use strict";
        n.r(t);
      },
      (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        var s,
          a = (s = n(88)) && s.__esModule ? s : { default: s },
          o = n(1),
          l = n(2),
          i = n(75),
          r = n(89);
        n(139);
        var c = o.Ember.Component.extend(a.default, {
          classNames: [`${l.PLUGIN_NAME}-event-hub-5-year`],
          layout: n(140),
          style: n(141),
          telemetryEventPassTimeSpent: null,
          tftService: o.Ember.inject.service("tft"),
          queueService: o.Ember.inject.service("queue"),
          eventsData: o.Ember.computed.alias("tftService.eventsData"),
          eventData: o.Ember.computed("eventsData", function () {
            const e = this.get("eventsData");
            return e && Array.isArray(e) && 1 === e.length ? e[0] : null;
          }),
          firstTimeFlowKey: "5YA",
          titleName: o.Ember.computed("eventData", function () {
            const e = this.get("eventData");
            return e ? this.get("tra").formatString(e.titleTranslationKey) : "";
          }),
          activeBanners: o.Ember.computed.alias(
            "trovesService.troveActiveBanners",
          ),
          bannerToDisplay: o.Ember.computed("activeBanners", function () {
            const e = this.get("activeBanners");
            if (e)
              for (let t = 0; t < e.length; ++t)
                if (e[t] && e[t].status && !e[t].status.owned) return e[t];
            return null;
          }),
          urlFaq: o.Ember.computed("eventData", function () {
            const e = this.get("eventData");
            return e ? e.urlFaq : "";
          }),
          eventQueueId: o.Ember.computed("eventData", function () {
            const e = this.get("eventData"),
              t = e.queueIds;
            return t && Array.isArray(t) && t.length ? e.queueIds[0] : null;
          }),
          queues: o.Ember.computed.alias("queueService.queues"),
          playButtonGameModeName: o.Ember.computed(
            "eventQueueId",
            "queues",
            function () {
              const e = this.get("eventQueueId"),
                t = this.get("queues"),
                n = e && Array.isArray(t) ? t.find((t) => t.id === e) : null;
              return n ? n.description : "";
            },
          ),
          init() {
            this._super(...arguments),
              (0, r.trackEventHubOpen)(this.get("eventData")?.seriesId);
          },
          didInsertElement() {
            this._super(...arguments),
              this.element
                .querySelector(".quick-play-button-btn")
                ?.addEventListener("click", () => {
                  (0, r.trackEventHubPlayGameModeButtonClick)(
                    this.get("eventData")?.seriesId,
                  );
                });
          },
          willDestroyElement() {
            this._super(...arguments),
              (0, r.trackEventHubClose)(this.get("eventData")?.seriesId);
          },
          actions: {
            circleButtonHover() {
              i.SFX.circleButtonHover.play();
            },
            circleButtonClick() {
              i.SFX.circleButtonClick.play();
            },
            onFirstTimeFlowClosed() {
              const e = this.get("tftService"),
                t = {
                  option: "OPT_IN",
                  seriesId: this.get("eventData").dailyLoginSeriesId,
                };
              e.optMissionSeries(t);
            },
          },
        });
        t.default = c;
      },
      (e, t, n) => {
        "use strict";
        n.r(t);
      },
      (e, t, n) => {
        const s = n(1).Ember;
        e.exports = s.HTMLBars.template({
          id: "vwleJaeq",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-tft\\\\src\\\\app\\\\components\\\\tft-event-hub-5-year\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-tft\\\\src\\\\app\\\\components\\\\tft-event-hub-5-year\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-tft\\\\src\\\\app\\\\components\\\\tft-event-hub-5-year\\\\index.js\\" "],["text","\\n\\n"],["append",["helper",["tft-event-hub-first-time-flow"],null,[["firstTimeFlowKey","backgroundImage","onFirstTimeFlowClosed"],[["get",["firstTimeFlowKey"]],["get",["eventHubAssets","event-welcome-background"]],["helper",["action"],[["get",[null]],"onFirstTimeFlowClosed"],null]]]],false],["text","\\n"],["block",["tft-event-hub"],null,[["telemetryEventPassTimeSpent"],[["get",["telemetryEventPassTimeSpent"]]]],4],["text","\\n"]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","    "],["open-element","div",[]],["static-attr","class","icon-question-mark-container"],["dynamic-attr","onclick",["helper",["action"],[["get",[null]],"circleButtonClick"],null],null],["dynamic-attr","onmouseenter",["helper",["action"],[["get",[null]],"circleButtonHover"],null],null],["flush-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","icon-question-mark"],["dynamic-attr","style",["concat",["--info-icon-image: url(\'",["unknown",["eventHubAssets","event-hub-info-icon"]],"\'); --info-icon-hover: url(\'",["unknown",["eventHubAssets","event-hub-info-icon-hover"]],"\'); --info-icon-clicked: url(\'",["unknown",["eventHubAssets","event-hub-info-icon-clicked"]],"\')"]]],["dynamic-attr","onclick",["helper",["action"],[["get",[null]],"openEventUrlFaq",["get",["urlFaq"]]],null],null],["flush-element"],["close-element"],["text","\\n    "],["close-element"],["text","\\n    "],["append",["helper",["tft-event-mission-panel"],null,[["overrideRewardIcon","showMissionTrackerConnector","showTimer"],[true,false,true]]],false],["text","\\n"]],"locals":[]},{"statements":[["text","          "],["open-element","div",[]],["static-attr","class","logo-event"],["dynamic-attr","style",["concat",["background-image: url(\'",["unknown",["eventHubLogoImagePath"]],"\')"]]],["flush-element"],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","          "],["open-element","div",[]],["static-attr","class","tencent-logo-event"],["dynamic-attr","style",["concat",["background-image: url(\'",["unknown",["logoTftNameTencentImagePath"]],"\')"]]],["flush-element"],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","    "],["open-element","div",[]],["static-attr","class","left-panel"],["flush-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","title-area gray-box"],["flush-element"],["text","\\n"],["block",["if"],[["get",["hasTencentConfigs"]]],null,2,1],["text","      "],["close-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","play-area  gray-box"],["flush-element"],["text","\\n        "],["open-element","div",[]],["static-attr","class","external-play-mode-name"],["flush-element"],["append",["unknown",["playButtonGameModeName"]],false],["close-element"],["text","\\n        "],["append",["helper",["tft-event-play-panel"],null,[["backgroundPlayCardImagePath"],[["get",["backgroundPlayCardImagePath"]]]]],false],["text","\\n      "],["close-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","daily-login-area gray-box"],["flush-element"],["append",["unknown",["tft-event-daily-login-thumbnail"]],false],["close-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","event-pass-area  gray-box"],["flush-element"],["text","\\n        "],["append",["helper",["tft-event-pass-thumbnail"],null,[["cardBackgroundDefaultPath","cardBackgroundHoverPath","cardBackgroundPressedPath","toggleEventPass"],[["get",["cardBackgroundDefaultPath"]],["get",["cardBackgroundHoverPath"]],["get",["cardBackgroundPressedPath"]],["get",["toggleEventPass"]]]]],false],["text","\\n      "],["close-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","tr-area gray-box"],["flush-element"],["text","\\n        "],["append",["helper",["tft-event-troves-thumbnail"],null,[["displayedBannerOverride","cardBackgroundDefaultPath","cardBackgroundHoverPath","cardBackgroundPressedPath"],[["get",["bannerToDisplay"]],["get",["cardBackgroundDefaultPath"]],["get",["cardBackgroundHoverPath"]],["get",["cardBackgroundPressedPath"]]]]],false],["text","\\n      "],["close-element"],["text","\\n    "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["block",["baseHub","leftPanel"],null,null,3],["block",["baseHub","rightPanel"],null,null,0]],"locals":["baseHub"]}],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, n) => {
        "use strict";
        n.r(t);
      },
      (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        var s = n(1),
          a = n(2),
          o = n(89),
          l = s.Ember.Component.extend({
            classNames: [`${a.PLUGIN_NAME}-event-hub-first-time-flow`],
            layout: n(143),
            style: n(144),
            backgroundImage: "",
            tftService: s.Ember.inject.service("tft"),
            eventHubAssets: s.Ember.computed.alias("tftService.eventHubAssets"),
            eventSeriesId: s.Ember.computed.alias("tftService.eventSeriesId"),
            showModal: !0,
            init() {
              this._super(...arguments),
                (0, o.trackEventHubIntroModalOpen)(this.get("eventSeriesId"));
            },
            actions: {
              hideModal(e) {
                e(),
                  this.sendAction("onFirstTimeFlowClosed"),
                  this.set("showModal", !1);
              },
            },
          });
        t.default = l;
      },
      (e, t, n) => {
        const s = n(1).Ember;
        e.exports = s.HTMLBars.template({
          id: "r0lCFm/A",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-tft\\\\src\\\\app\\\\components\\\\tft-event-hub-first-time-flow\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-tft\\\\src\\\\app\\\\components\\\\tft-event-hub-first-time-flow\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-tft\\\\src\\\\app\\\\components\\\\tft-event-hub-first-time-flow\\\\index.js\\" "],["text","\\n"],["block",["tft-versioned-container"],null,[["name","version","manual"],["eventHub",1,true]],2]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","      "],["open-element","div",[]],["static-attr","class","welcome-modal"],["dynamic-attr","style",["concat",["background-image: url(\'",["unknown",["backgroundImage"]],"\')"]]],["flush-element"],["text","\\n        "],["open-element","div",[]],["static-attr","class","welcome-message"],["flush-element"],["text","\\n          "],["open-element","div",[]],["static-attr","class","title"],["flush-element"],["append",["unknown",["tra","tft_eventhub_welcome_title"]],false],["close-element"],["text","\\n          "],["open-element","div",[]],["static-attr","class","divider"],["dynamic-attr","style",["concat",["background-image: url(\'",["unknown",["eventHubAssets","event-welcome-divider"]],"\')"]]],["flush-element"],["close-element"],["text","\\n          "],["open-element","div",[]],["static-attr","class","body-text-1"],["flush-element"],["append",["unknown",["tra","tft_eventhub_welcome_body_text_1"]],false],["close-element"],["text","\\n          "],["open-element","div",[]],["static-attr","class","body-text-2"],["flush-element"],["append",["unknown",["tra","tft_eventhub_welcome_body_text_2"]],true],["close-element"],["text","\\n          "],["open-element","div",[]],["static-attr","class","button"],["dynamic-attr","onclick",["helper",["action"],[["get",[null]],"hideModal",["get",["manuallyTriggerSeen"]]],null],null],["dynamic-attr","style",["concat",["--button-default: url(\'",["unknown",["eventHubAssets","daily-login-reward-button-bg"]],"\'); --button-hover: url(\'",["unknown",["eventHubAssets","daily-login-reward-button-bg-hover"]],"\'); --button-clicked: url(\'",["unknown",["eventHubAssets","daily-login-reward-button-bg-clicked"]],"\');"]]],["flush-element"],["text","\\n            "],["open-element","div",[]],["static-attr","class","button-text"],["flush-element"],["text"," "],["append",["unknown",["tra","tft_eventhub_welcome_button_text"]],false],["text"," "],["close-element"],["text","\\n          "],["close-element"],["text","\\n        "],["close-element"],["text","\\n      "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["block",["uikit-modal"],null,[["type","dismissibleType"],["DialogAlert","inside"]],0]],"locals":[]},{"statements":[["block",["if"],[["get",["showModal"]]],null,1]],"locals":["manuallyTriggerSeen"]}],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, n) => {
        "use strict";
        n.r(t);
      },
      (e, t, n) => {
        "use strict";
        var s,
          a = n(1),
          o = n(13),
          l = (s = n(146)) && s.__esModule ? s : { default: s },
          i = n(147);
        n(151);
        const { Component: r, RSVP: c, computed: m } = a.Ember;
        e.exports = r.extend(
          o.DataBindingMixin,
          o.FixDataBindingMixin,
          l.default,
          {
            classNames: ["tft-match-history-main", "tft-match-history-bg"],
            layout: n(152),
            deltas: null,
            tftMatchListData: null,
            acsAccountInfo: null,
            atLeastOneTftMatch: m.gt("tftMatches.length", 0),
            fullMatchHistoryUrl: m(
              "matchHistoryWebURL",
              "acsAccountInfo",
              function () {
                const e = this.get("matchHistoryWebURL");
                if (e) {
                  const t = this.get("acsAccountInfo");
                  return `${e}/#match-history/${t.platformId}/${t.accountId}`;
                }
                return !1;
              },
            ),
            summoner: m("targetSummoner", "mySummoner", function () {
              return this.get("mySummoner");
            }),
            championPortrait: m("participant.championId", function () {
              const e = this.get("participant.championId");
              return this.get("champions").get(e);
            }),
            tftMatchesLoading: m.none("tftMatches"),
            tftMatches: m("tftMatchListData", function () {
              return this.get("tftMatchListData")
                ? this._enrichTftGames(this.get("tftMatchListData"))
                : null;
            }),
            puuid: m("summoner.puuid", "session.puuid", function () {
              return this.get("session.puuid");
            }),
            didRender() {
              this._super(...arguments);
            },
            init() {
              this._super(...arguments), this.set("deltas", new Map());
            },
            didInsertElement() {
              this._super(...arguments), this._updateSummoner();
            },
            willDestroyElement() {
              this._super(...arguments), this.set("summonerId", "");
            },
            actions: {
              clickWebMatchHistory: function () {
                return i.SFX.genericClickSm.play(), !0;
              },
            },
            _updateSummoner() {
              this.isDestroying ||
                this.isDestroyed ||
                this.get("api.platformConfig")
                  .get("v1/namespaces/NewMatchHistory/TftMatchHistoryEnabled")
                  .then((e) => {
                    const t = this.get("puuid");
                    e && t && this._loadTftPlayerData(t);
                  });
            },
            _loadTftPlayerData(e, t = !1) {
              const n = this.get("tftDefaultSet"),
                s = n
                  ? `/v1/products/tft/${e}/matches?begin=0&count=20&tag=${n.SetCoreName}`
                  : `/v1/products/tft/${e}/matches?begin=0&count=20`;
              return c
                .hashSettled({
                  tftMatchListData: this.retrieveData("api.matchHistory", s, {
                    skipCache: !0,
                  }),
                })
                .then((e) => {
                  this.get("isDestroyed") ||
                    ("fulfilled" === e.tftMatchListData.state
                      ? this.set(
                          "tftMatchListData",
                          e.tftMatchListData.value.games,
                        )
                      : t ||
                        (404 !== e.tftMatchListData.reason.status &&
                          this.showModal({
                            type: "DialogAlert",
                            data: {
                              contents: this.get(
                                "tra.MATCH_DETAILS_LOADING_ERROR",
                              ),
                              okText: this.get(
                                "tra.MATCH_DETAILS_LOADING_ERROR_CONFIRMATION",
                              ),
                              onOk: () => {},
                            },
                          })));
                });
            },
            _enrichTftGames(e) {
              return (
                e.forEach((e) => {
                  e &&
                    e.json &&
                    e.json.participants &&
                    (this._enrichGameVariation(e),
                    e.json.participants.forEach((t) => {
                      this._enrichUnits(t),
                        this._enrichTraits(e, t),
                        this._enrichAugments(t);
                    }));
                }),
                e
              );
            },
            _enrichUnits(e) {
              const t = this.get("tftChampionsByAlias"),
                n = this.get("tftItemsByName"),
                s = this.get("championsByAlias");
              e.units.forEach((e) => {
                let o = t.get(e.character_id.toLowerCase());
                if (o)
                  o.character_record
                    ? ((e.iconPath = o.character_record.squareIconPath),
                      (e.championName = o.character_record.display_name))
                    : ((e.iconPath = o.squareIconPath),
                      (e.championName = o.display_name));
                else {
                  const t = e.name.replace("TFT_", "").replace("TFT2_", "");
                  (o = s.get(t)),
                    o
                      ? ((e.iconPath = o.squarePortraitPath),
                        (e.championName = o.name))
                      : a.logger.trace("Unknown champion: " + e);
                }
                const l = [];
                e.itemNames.forEach((e) => {
                  const t = n.get(e);
                  t && l.push(t);
                }),
                  (e.equippedItems = l);
              }),
                e.units.sort((e, t) =>
                  e.tier > t.tier
                    ? -1
                    : e.tier < t.tier
                      ? 1
                      : e.itemNames.length > t.itemNames.length
                        ? -1
                        : e.itemNames.length < t.itemNames.length
                          ? 1
                          : e.rarity > t.rarity
                            ? -1
                            : e.rarity < t.rarity
                              ? 1
                              : e.name.localeCompare(t.name),
                );
            },
            _enrichTraits(e, t) {
              const n = this.get("tftTraitsById");
              "object" == typeof t.traits &&
                t.traits.length &&
                (t.traits.forEach((t) => {
                  if ("object" == typeof t) {
                    const s = n.get(t.name.toLowerCase());
                    s &&
                      ((t.name = s.display_name), (t.iconPath = s.icon_path)),
                      e.metadata.data_version >= 3
                        ? (t.rank = t.style)
                        : t.tier_current === t.tier_total
                          ? (t.rank = 3)
                          : 0 === t.tier_current
                            ? (t.rank = 0)
                            : 1 === t.tier_current
                              ? (t.rank = 1)
                              : (t.rank = 2);
                  }
                }),
                t.traits.sort((e, t) =>
                  e.rank === t.rank
                    ? 0
                    : e.rank > t.rank
                      ? -1
                      : e.rank < t.rank
                        ? 1
                        : e.name.localeCompare(t.name),
                ));
            },
            _enrichAugments(e) {
              if (e.augments) {
                const t = this.get("tftItemsByName");
                e.augments = e.augments.map((e) => t.get(e));
              }
            },
            _enrichGameVariation(e) {
              const t = this.get("tftGameVariationsByAlias");
              if (!e.json.game_variation) return;
              const n = t.get(e.json.game_variation.toLowerCase());
              n &&
                ((e.json.gameVariation = {}),
                (e.json.gameVariation.displayName =
                  n.game_variation_display_name),
                (e.json.gameVariation.description =
                  n.game_variation_description),
                (e.json.gameVariation.iconPath = n.icon_path));
            },
          },
        );
      },
      (e, t, n) => {
        "use strict";
        var s = n(1);
        e.exports = s.Ember.Mixin.create({
          ModalManager: (0, s.getProvider)()
            .get("rcp-fe-lol-uikit")
            .getModalManager(),
          showModal: function (e) {
            const t = this.get("ModalManager").add(e);
            return (
              s.Ember.get(t, "data.onOk") && t.okPromise
                ? t.okPromise.then(e.data.onOk)
                : t.acceptPromise &&
                  t.acceptPromise
                    .then(() => {
                      s.Ember.get(t, "data.onAccept") && t.data.onAccept();
                    })
                    .catch(() => {
                      s.Ember.get(t, "data.onDecline") && t.data.onDecline();
                    }),
              t
            );
          },
          removeModal: function (e) {
            this.get("ModalManager").remove(e);
          },
        });
      },
      (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }), (t.SFX = void 0);
        const s = n(1).AudioPlugin.getChannel("sfx-ui");
        function a(e) {
          return s.createSound(e, { allowConcurrency: !1 });
        }
        const o = {
          genericClickSm: a(n(148)),
          gridClick: a(n(149)),
          gridHover: a(n(150)),
        };
        t.SFX = o;
      },
      (e, t, n) => {
        "use strict";
        e.exports = n.p + "sfx-uikit-generic-click-small.ogg";
      },
      (e, t, n) => {
        "use strict";
        e.exports = n.p + "sfx-uikit-grid-click.ogg";
      },
      (e, t, n) => {
        "use strict";
        e.exports = n.p + "sfx-uikit-grid-hover.ogg";
      },
      (e, t, n) => {
        "use strict";
        n.r(t);
      },
      (e, t, n) => {
        const s = n(1).Ember;
        e.exports = s.HTMLBars.template({
          id: "uBs1LRrS",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-match-history\\\\src\\\\components\\\\summary\\\\tft-match-summary-root-component\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-match-history\\\\src\\\\components\\\\summary\\\\tft-match-summary-root-component\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-match-history\\\\src\\\\components\\\\summary\\\\tft-match-summary-root-component\\\\index.js\\" "],["text","\\n\\n"],["open-element","div",[]],["static-attr","class","tft-match-history"],["flush-element"],["text","\\n\\n"],["block",["if"],[["get",["tftMatchesLoading"]]],null,5,4],["close-element"],["text"," "]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","          "],["comment"," no games for this player "],["text","\\n          "],["open-element","div",[]],["static-attr","class","tft-match-history-wrapper loading-fade-in"],["flush-element"],["text","\\n            "],["open-element","div",[]],["static-attr","class","tft-match-history-no-games-header"],["flush-element"],["append",["unknown",["tra","MATCH_HISTORY_SUMMARY_NO_GAMES_HEADER"]],false],["close-element"],["text","\\n            "],["open-element","div",[]],["static-attr","class","tft-match-history-no-games-reason-header"],["flush-element"],["append",["unknown",["tra","MATCH_HISTORY_SUMMARY_NO_GAMES_REASON_HEADER"]],false],["close-element"],["text","\\n            "],["open-element","ul",[]],["static-attr","class","tft-match-history-no-games-reason"],["flush-element"],["text","\\n              "],["open-element","li",[]],["flush-element"],["append",["unknown",["tra","MATCH_HISTORY_SUMMARY_NO_GAMES_REASON_1"]],false],["close-element"],["text","\\n              "],["open-element","li",[]],["flush-element"],["append",["unknown",["tra","MATCH_HISTORY_SUMMARY_NO_GAMES_REASON_2"]],false],["close-element"],["text","\\n              "],["open-element","li",[]],["flush-element"],["append",["unknown",["tra","MATCH_HISTORY_SUMMARY_NO_GAMES_REASON_3"]],false],["close-element"],["text","\\n            "],["close-element"],["text","\\n          "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","                  "],["append",["helper",["tft-match-summary"],null,[["tftSets","puuid","companions","champions","match","spells","items","queues"],[["get",["tftSets"]],["get",["puuid"]],["get",["companions"]],["get",["champions"]],["get",["match"]],["get",["spells"]],["get",["items"]],["get",["queues"]]]]],false],["text","\\n"]],"locals":["match"]},{"statements":[["text","          "],["open-element","div",[]],["static-attr","class","tft-match-history-wrapper loading-fade-in"],["flush-element"],["text","\\n"],["text","            "],["open-element","lol-uikit-scrollable",[]],["static-attr","class","tft-match-history-list"],["static-attr","overflow-masks","enabled"],["flush-element"],["text","\\n"],["block",["each"],[["get",["tftMatches"]]],[["key"],["gameId"]],1],["text","            "],["close-element"],["text","\\n          "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","      "],["open-element","div",[]],["static-attr","class","tft-match-history-left"],["flush-element"],["text","\\n        "],["open-element","div",[]],["static-attr","class","tft-match-history-left-title"],["flush-element"],["append",["unknown",["tra","MATCH_HISTORY_SUMMARY_RECENT_GAMES_LABEL"]],false],["close-element"],["text","\\n"],["block",["if"],[["get",["atLeastOneTftMatch"]]],null,2,0],["text","      "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["block",["render-telemetry-sender"],null,[["renderEventName"],["tft-match-history-rendered"]],3]],"locals":[]},{"statements":[["text","    "],["open-element","div",[]],["static-attr","class","tft-match-history-left-title"],["flush-element"],["append",["unknown",["tra","MATCH_HISTORY_SUMMARY_RECENT_GAMES_LABEL"]],false],["close-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","tft-match-history-loading-icon-container"],["flush-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","tft-match-history-loading-icon"],["flush-element"],["close-element"],["text","\\n    "],["close-element"],["text","\\n"]],"locals":[]}],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, n) => {
        "use strict";
        var s = n(1);
        n(154);
        e.exports = s.Ember.Component.extend({
          layout: n(155),
          match: null,
          classNames: ["tft-match-summary-component"],
          classNameBindings: ["isPair:pair"],
          matchData: s.Ember.computed.alias("match.json"),
          gameType: s.Ember.computed.alias("matchData.tft_game_type"),
          metadata: s.Ember.computed.alias("match.metadata"),
          companionIcon: s.Ember.computed.alias("matchCompanion.loadoutsIcon"),
          currentPlayerLevel: s.Ember.computed.alias("currentPlayer.level"),
          modeText: s.Ember.computed(
            "matchData.queue_id",
            "metadata.tags.[]",
            "queues",
            function () {
              const e = this.get("queues").get(this.get("matchData.queue_id"));
              if (e) return e.description;
              return this.get("metadata.tags").includes("ranked")
                ? this.get("tra.MATCH_HISTORY_TFT_RANKED")
                : this.get("tra.MATCH_HISTORY_TFT_NORMAL");
            },
          ),
          units: s.Ember.computed.alias("currentPlayer.units"),
          unitPlaceholders: s.Ember.computed("units.length", function () {
            const e = this.get("units.length");
            if (e >= 10) return s.Ember.A();
            const t = 10 - e,
              n = s.Ember.A();
            for (let e = 0; e < t; e++) n.push(e);
            return n;
          }),
          isPair: s.Ember.computed("gameType", function () {
            return "pairs" === this.get("gameType");
          }),
          placement: s.Ember.computed(
            "currentPlayer.placement",
            "isPair",
            function () {
              return this.get("isPair")
                ? Math.ceil(this.get("currentPlayer.placement") / 2)
                : this.get("currentPlayer.placement");
            },
          ),
          placementText: s.Ember.computed("placement", function () {
            return this.get(
              "tra.MATCH_HISTORY_TFT_PLACEMENT_" + this.get("placement"),
            );
          }),
          augmentContainer: s.Ember.computed(
            "matchData.tft_set_core_name",
            "tftSets.@each.SetCoreName",
            function () {
              const e = this.get("matchData.tft_set_core_name"),
                t = this.get("tftSets").find((t) => t.SetCoreName === e) || {};
              return {
                name: t.SetAugmentName || "",
                icon: t.SetAugmentContainer || "",
              };
            },
          ),
          matchLength: s.Ember.computed(
            "matchData.game_length",
            "matchData.game_datetime",
            function () {
              const e = this.get("matchData.game_length"),
                t = ~~(e / 3600),
                n = ~~((e % 3600) / 60),
                s = ~~e % 60;
              let a = "";
              return (
                t > 0 && (a += t + ":" + (n < 10 ? "0" : "")),
                (a += n + ":" + (s < 10 ? "0" : "")),
                (a += "" + s),
                a
              );
            },
          ),
          matchDate: s.Ember.computed("matchData.game_datetime", function () {
            return this.get("tra")
              .moment(parseInt(this.get("matchData.game_datetime")))
              .format("L");
          }),
          matchCompanion: s.Ember.computed(
            "companions",
            "currentPlayer.companion.content_ID",
            function () {
              const e = this.get("companions"),
                t = this.get("currentPlayer.companion.content_ID");
              if (!e || !t) return null;
              let n;
              return (
                e.groups.every((e) =>
                  e.items.every((e) =>
                    e.contentId === t
                      ? ((n = [e]), !1)
                      : ((n = e.upgrades.filter(function (e) {
                          return e.contentId === t;
                        })),
                        0 === n.length),
                  ),
                ),
                n.length > 0 ? n[0] : null
              );
            },
          ),
          currentPlayer: s.Ember.computed(
            "matchData.participants",
            "puuid",
            function () {
              const e = this.get("matchData.participants"),
                t = this.get("puuid"),
                n = e.filter(function (e) {
                  return e.puuid === t;
                });
              return n.length > 0 ? n[0] : null;
            },
          ),
          actions: { displayMatchDetails(e) {} },
        });
      },
      (e, t, n) => {
        "use strict";
        n.r(t);
      },
      (e, t, n) => {
        const s = n(1).Ember;
        e.exports = s.HTMLBars.template({
          id: "fHJ+EV7r",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-match-history\\\\src\\\\components\\\\summary\\\\tft-match-summary-component\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-match-history\\\\src\\\\components\\\\summary\\\\tft-match-summary-component\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-match-history\\\\src\\\\components\\\\summary\\\\tft-match-summary-component\\\\index.js\\" "],["text","\\n"],["open-element","div",[]],["dynamic-attr","class",["concat",["match-summary-little-legends-container placement_",["unknown",["placement"]]]]],["flush-element"],["text","\\n     "],["open-element","div",[]],["static-attr","class","player-history-champion"],["flush-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","player-history-champion-icon"],["flush-element"],["text","\\n        "],["open-element","div",[]],["static-attr","class","player-history-champion-icon-border"],["flush-element"],["close-element"],["text","\\n        "],["open-element","img",[]],["static-attr","class","match-summary-little-legends-img"],["dynamic-attr","src",["unknown",["companionIcon"]],null],["flush-element"],["close-element"],["text","\\n        "],["open-element","div",[]],["static-attr","class","player-history-champion-frame"],["flush-element"],["close-element"],["text","\\n      "],["close-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","player-history-lv"],["flush-element"],["append",["unknown",["currentPlayerLevel"]],false],["close-element"],["text","\\n    "],["close-element"],["text","\\n"],["close-element"],["text","\\n\\n"],["open-element","div",[]],["static-attr","class","match-summary-player-stats"],["flush-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","match-summary-placement-display"],["flush-element"],["append",["unknown",["placementText"]],false],["close-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","match-summary-details"],["flush-element"],["text","\\n        "],["append",["unknown",["modeText"]],false],["text"," ● "],["append",["unknown",["matchLength"]],false],["text","\\n    "],["close-element"],["text","\\n"],["block",["if"],[["get",["matchData","gameVariation"]]],null,13],["text","    "],["open-element","div",[]],["static-attr","class","match-summary-details"],["flush-element"],["text","\\n        "],["append",["unknown",["matchDate"]],false],["text","\\n    "],["close-element"],["text","\\n"],["close-element"],["text","\\n\\n"],["block",["if"],[["get",["currentPlayer","augments"]]],null,10],["text","\\n"],["open-element","div",[]],["static-attr","class","match-summary-right"],["flush-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","match-summary-champions-in-play"],["flush-element"],["text","\\n"],["block",["each"],[["get",["units"]]],[["key"],["name"]],6],["text","    "],["close-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","match-summary-traits"],["flush-element"],["text","\\n"],["block",["each"],[["get",["currentPlayer","traits"]]],[["key"],["name"]],2],["text","    "],["close-element"],["text","\\n"],["close-element"],["text","\\n"]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","                        "],["open-element","lol-uikit-content-block",[]],["static-attr","type","tooltip-system"],["static-attr","class","match-summary-tft-tooltip"],["flush-element"],["text","\\n                            "],["open-element","p",[]],["flush-element"],["append",["unknown",["trait","name"]],false],["close-element"],["text","\\n                        "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","                "],["open-element","div",[]],["dynamic-attr","class",["concat",["match-summary-trait-img-bg trait_level_",["unknown",["trait","rank"]]]]],["flush-element"],["text","\\n                    "],["open-element","img",[]],["dynamic-attr","class",["concat",["match-summary-trait-img ",["unknown",["trait","name"]]]]],["dynamic-attr","src",["unknown",["trait","iconPath"]],null],["flush-element"],["close-element"],["text","\\n"],["block",["match-history-tooltip"],null,[["direction","tooltipId"],["bottom","match-summary-tft-trait-tooltip"]],0],["text","                "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["block",["if"],[["get",["trait","tier_current"]]],null,1]],"locals":["trait","index"]},{"statements":[["text","                                "],["open-element","lol-uikit-content-block",[]],["static-attr","type","tooltip-system"],["static-attr","class","match-summary-tft-tooltip"],["flush-element"],["text","\\n                                    "],["open-element","p",[]],["flush-element"],["append",["unknown",["item","name"]],false],["close-element"],["text","\\n                                "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","                        "],["open-element","div",[]],["static-attr","class","match-history-tft-player-piece-item"],["dynamic-attr","style",["concat",["background-image: url(",["unknown",["item","squareIconPath"]],");"]]],["flush-element"],["text","\\n"],["block",["match-history-tooltip"],null,[["direction","tooltipId"],["bottom","match-summary-tft-champion-tooltip"]],3],["text","                        "],["close-element"],["text","\\n"]],"locals":["item"]},{"statements":[["text","                        "],["open-element","lol-uikit-content-block",[]],["static-attr","type","tooltip-system"],["static-attr","class","match-summary-tft-tooltip"],["flush-element"],["text","\\n                            "],["open-element","p",[]],["flush-element"],["append",["unknown",["unit","championName"]],false],["close-element"],["text","\\n                        "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","            "],["open-element","div",[]],["dynamic-attr","class",["concat",["tft-player-piece piece-level-",["unknown",["unit","tier"]]]]],["flush-element"],["text","\\n                "],["open-element","div",[]],["static-attr","class","piece-inner-border"],["dynamic-attr","style",["concat",["background-image: url(",["unknown",["unit","iconPath"]],");"]]],["flush-element"],["text","\\n"],["block",["match-history-tooltip"],null,[["direction","tooltipId"],["bottom","match-summary-tft-champion-tooltip"]],5],["text","                "],["close-element"],["text","\\n\\n                 "],["open-element","div",[]],["static-attr","class","match-history-tft-player-piece-item-container"],["flush-element"],["text","\\n"],["block",["each"],[["get",["unit","equippedItems"]]],null,4],["text","                "],["close-element"],["text","\\n            "],["close-element"],["text","\\n\\n\\n"]],"locals":["unit","index"]},{"statements":[["text","                        "],["open-element","lol-uikit-content-block",[]],["static-attr","type","tooltip-system"],["static-attr","class","match-summary-tft-tooltip"],["flush-element"],["text","\\n                            "],["open-element","p",[]],["flush-element"],["append",["unknown",["augment","name"]],false],["close-element"],["text","\\n                        "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","                "],["open-element","div",[]],["static-attr","class","match-summary-augment-icon"],["dynamic-attr","style",["concat",["background-image: url(",["unknown",["augment","squareIconPath"]],");"]]],["flush-element"],["text","\\n"],["block",["match-history-tooltip"],null,[["direction","tooltipId"],["bottom","match-summary-augment-tooltip"]],7],["text","                "],["close-element"],["text","\\n"]],"locals":["augment"]},{"statements":[["text","                "],["open-element","lol-uikit-content-block",[]],["static-attr","type","tooltip-system"],["static-attr","class","match-summary-tft-tooltip"],["flush-element"],["text","\\n                    "],["open-element","p",[]],["flush-element"],["append",["unknown",["augmentContainer","name"]],false],["close-element"],["text","\\n                "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","    "],["open-element","div",[]],["static-attr","class","match-summary-augment"],["flush-element"],["text","\\n        "],["open-element","div",[]],["static-attr","class","match-summary-augment-inner"],["dynamic-attr","style",["concat",["background-image: url(",["unknown",["augmentContainer","icon"]],");"]]],["flush-element"],["text","\\n"],["block",["match-history-tooltip"],null,[["direction","tooltipId"],["top","match-summary-augment-tooltip"]],9],["text","        "],["close-element"],["text","\\n        "],["open-element","div",[]],["static-attr","class","match-summary-augment-icon-container"],["flush-element"],["text","\\n"],["block",["each"],[["get",["currentPlayer","augments"]]],null,8],["text","        "],["close-element"],["text","\\n    "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","                    "],["open-element","lol-uikit-content-block",[]],["static-attr","type","tooltip-system"],["static-attr","class","match-summary-tft-tooltip"],["flush-element"],["text","\\n                        "],["open-element","p",[]],["flush-element"],["append",["unknown",["matchData","gameVariation","description"]],false],["close-element"],["text","\\n                    "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["block",["match-history-tooltip"],null,[["direction","tooltipId"],["bottom","match-summary-tft-trait-tooltip"]],11]],"locals":[]},{"statements":[["text","        "],["open-element","div",[]],["static-attr","class","match-summary-details"],["flush-element"],["text","\\n            "],["append",["unknown",["matchData","gameVariation","displayName"]],false],["text","\\n            "],["open-element","lol-uikit-info-icon",[]],["static-attr","class","match-summary-set-mechanic-tooltip-icon"],["flush-element"],["close-element"],["text","\\n"],["block",["if"],[["get",["matchData","gameVariation","description"]]],null,12],["text","        "],["close-element"],["text","\\n"]],"locals":[]}],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        var s = n(1);
        const a = {
            targetAnchor: { x: "center", y: "top" },
            tooltipAnchor: { x: "center", y: "bottom" },
            tooltipDirection: "top",
          },
          o = {
            targetAnchor: { x: "center", y: "bottom" },
            tooltipAnchor: { x: "center", y: "top" },
            tooltipDirection: "bottom",
          };
        var l = s.Ember.Component.extend({
          classNames: ["match-history-tooltip"],
          layout: n(157),
          toolTipAttached: !1,
          tooltipOptions: a,
          tooltipSetup() {
            const e = this.toolTipAttached;
            if (
              ((this.tooltipHoverElement = this.element.parentElement),
              !e && this.tooltipHoverElement)
            ) {
              const e = this.get("tooltipId");
              (this.tooltipElement = this.element.querySelector(
                `#match-history-tooltip-${e}`,
              )),
                this.attachTooltip(),
                (this.toolTipAttached = !0);
            }
          },
          didInsertElement() {
            this._super(...arguments), this.tooltipSetup();
          },
          willDestroyElement() {
            this.detachTooltip(), this._super(...arguments);
          },
          attachTooltip: function () {
            const e = "bottom" === this.get("direction") ? o : a;
            s.TooltipManager.assign(
              this.tooltipHoverElement,
              this.tooltipElement,
              null,
              e,
            );
          },
          detachTooltip: function () {
            s.TooltipManager.unassign(this.tooltipHoverElement);
          },
        });
        t.default = l;
      },
      (e, t, n) => {
        const s = n(1).Ember;
        e.exports = s.HTMLBars.template({
          id: "kR3dy1Zj",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-match-history\\\\src\\\\components\\\\summary\\\\match-history-tooltip-component\\\\layout.hbs\\" style-path=\\"null\\" js-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-match-history\\\\src\\\\components\\\\summary\\\\match-history-tooltip-component\\\\index.js\\" "],["text","\\n"],["open-element","lol-uikit-tooltip",[]],["dynamic-attr","id",["concat",["match-history-tooltip-",["unknown",["tooltipId"]]]]],["flush-element"],["text","\\n  "],["yield","default"],["text","\\n"],["close-element"],["text","\\n"]],"locals":[],"named":[],"yields":["default"],"blocks":[],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        var s = n(1),
          a = n(78),
          o = n(159),
          l = s.Ember.Component.extend({
            classNames: ["rcp-fe-lol-tft-troves-mythic-button"],
            mythicTokenIcon:
              "/fe/lol-tft-troves/images/TFT_Icon_mythicTokens.png",
            mythicOfferId: null,
            activeBannerSourceId: null,
            activeBannerStatus: null,
            dropTableId: s.Ember.computed.alias(
              "activeBannerStatus.dropTableId",
            ),
            confirmModalShowing: !1,
            currentRmsNotificationTimer: null,
            trovesService: s.Ember.inject.service("tftTroves"),
            mythicTokensAmount: s.Ember.computed.alias(
              "trovesService.mythicTokensAmount",
            ),
            isPulling: s.Ember.computed.alias("trovesService.isPulling"),
            showMythicButton: s.Ember.computed(
              "mythicTokensAmount",
              function () {
                return this.get("mythicTokensAmount") > 0;
              },
            ),
            balanceText: s.Ember.computed("mythicTokensAmount", function () {
              return this.get("tra").formatString(
                "troves_mythic_token_dialog_balance",
                { balance: this.get("mythicTokensAmount") },
              );
            }),
            ownedChaseContent: s.Ember.computed(
              "activeBannerStatus",
              function () {
                const e = this.get("activeBannerStatus");
                return !!e && e.owned;
              },
            ),
            disableAcceptButton: s.Ember.computed(
              "ownedChaseContent",
              "mythicTokensAmount",
              "isPulling",
              function () {
                return (
                  this.get("ownedChaseContent") ||
                  isNaN(this.get("mythicTokensAmount")) ||
                  0 === this.get("mythicTokensAmount") ||
                  this.get("isPulling")
                );
              },
            ),
            click() {
              this.get("isPulling") ||
                (o.SFX.buttonClick.play(),
                s.Telemetry.sendCustomData(a.TELEMETRY_TABLE_NAME, {
                  [a.TELEMETRY_EVENT_KEY_EVENT_NAME]:
                    a.TELEMETRY_EVENT_NAME_MYTHIC_BUTTON,
                  [a.TELEMETRY_EVENT_KEY_ACTIVE_BANNER_SOURCE_ID]: this.get(
                    "activeBannerSourceId",
                  ),
                }),
                this.set("confirmModalShowing", !0));
            },
            mouseEnter() {
              this.get("isPulling") || o.SFX.buttonHover.play();
            },
            actions: {
              useMythicToken() {
                this._updatePulling();
                const e = {
                  offerId: this.get("mythicOfferId"),
                  dropTableId: this.get("dropTableId"),
                  numberOfRolls: 1,
                  isMythic: !0,
                };
                s.Telemetry.sendCustomData(a.TELEMETRY_TABLE_NAME, {
                  [a.TELEMETRY_EVENT_KEY_EVENT_NAME]:
                    a.TELEMETRY_EVENT_NAME_USE_MYTHIC,
                  [a.TELEMETRY_EVENT_KEY_ACTIVE_BANNER_SOURCE_ID]: this.get(
                    "activeBannerSourceId",
                  ),
                  [a.TELEMETRY_EVENT_KEY_PITY_COUNT]: this.get("pityCount"),
                }),
                  s.db
                    .post(a.PATHS.ROLL, e)
                    .catch(this._handleRollError.bind(this));
              },
              closeConfirmModal() {
                this.set("confirmModalShowing", !1);
              },
            },
            didUpdate() {
              this._updateAcceptButton();
            },
            willDestroy() {
              this._clearTimeoutTimer(), this._super(...arguments);
            },
            _updateAcceptButton() {
              const e = document.querySelector(
                ".rcp-fe-lol-tft-troves-mythic-token-dialog",
              );
              if (!e) return;
              const t =
                e.parentElement.parentElement.parentElement.querySelector(
                  "lol-uikit-flat-button.button-accept",
                );
              if (!t) return;
              const n = this.get("mythicTokenIcon"),
                a = this.get("disableAcceptButton") ? "disabled" : "",
                o = s.tra.get("troves_mythic_token_dialog_open");
              (t.innerHTML = `\n      <div class="button-with-icon">\n      <img src="${n}" class="mythic-currency-icon" ${a}>\n      <span>${o}</span>\n      </div>`),
                t.setAttribute("primary", !0),
                t.blur(),
                this.get("disableAcceptButton") && (t.disabled = !0);
            },
            _handleRollError() {
              this.set("confirmModalShowing", !1),
                this.get("trovesService").updatePullErrorModal(!0);
            },
            _updatePulling() {
              this.get("trovesService").updatePulling(!0);
              const e = setTimeout(() => {
                this._handleRollOrderNotificationTimeout();
              }, a.MAX_WAITING_TIME_IN_MS);
              this.set("currentRmsNotificationTimer", e);
            },
            _handleRollOrderNotificationTimeout() {
              this.get("isPulling") &&
                this.get("trovesService").updatePulling(!1),
                this._clearTimeoutTimer();
            },
            _clearTimeoutTimer() {
              const e = this.get("currentRmsNotificationTimer");
              e &&
                (clearTimeout(e),
                this.set("currentRmsNotificationTransactionId", null));
            },
          });
        t.default = l;
      },
      (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }), (t.SFX = void 0);
        var s = n(1),
          a = n(2);
        const o = s.AudioPlugin.getChannel(
          a.AUDIO_CHANNELS.SFX_SUB_CHANNEL_UI_NAME,
        );
        function l(e) {
          return o.createSound(e, { allowConcurrency: !1 });
        }
        const i = {
          buttonClick: l(
            "/fe/lol-static-assets/sounds/sfx-uikit-button-big-click.ogg",
          ),
          buttonHover: l(
            "/fe/lol-static-assets/sounds/sfx-uikit-button-generic-hover.ogg",
          ),
          circleButtonClick: l(
            "/fe/lol-static-assets/sounds/sfx-uikit-button-circlegold-click.ogg",
          ),
          circleButtonHover: l(
            "/fe/lol-static-assets/sounds/sfx-uikit-button-circlegold-hover.ogg",
          ),
        };
        t.SFX = i;
      },
      (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        var s = n(1),
          a = s.Ember.Component.extend({
            classNames: ["rcp-fe-lol-tft-troves-mythic-token-dialog"],
            mythicTokenIcon: null,
            ownedChaseContent: null,
            balanceText: null,
            title: s.tra.get("troves_mythic_token_dialog_title"),
            confirmText: s.tra.get("troves_mythic_token_dialog_content"),
            ownedText: s.tra.get("troves_mythic_token_dialog_owned"),
          });
        t.default = a;
      },
      (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        var s = n(1),
          a = n(78),
          o = s.Ember.Component.extend({
            classNames: [
              "rcp-fe-lol-tft-troves-pull-button",
              "single-button-container",
            ],
            trovesService: s.Ember.inject.service("tftTroves"),
            isPulling: s.Ember.computed.alias("trovesService.isPulling"),
            cost: null,
            buttonText: null,
            activeBannerSourceId: null,
            selectedOfferId: null,
            rollCount: null,
            dropTableId: null,
            disabled: !0,
            troveTokenIcon:
              "fe/lol-tft-troves/images/TFT_Icon_trovesTokens.png",
            troveTokenHolder:
              "fe/lol-tft-troves/images/TFT_Holder_trovesTokens.png",
            currentRmsNotificationTimer: null,
            willDestroy() {
              this._clearTimeoutTimer(), this._super(...arguments);
            },
            _clicked: !1,
            showSpinner: s.Ember.computed(
              "trovesService.isWaitingForCeremonyData",
              function () {
                const e = this.get("trovesService.isWaitingForCeremonyData");
                return e || (this._clicked = !1), this._clicked && e;
              },
            ),
            click() {
              this._clicked = !0;
              const e = this.get("rollCount"),
                t = this.get("selectedOfferId"),
                n = this.get("dropTableId");
              if (!e || this.get("disabled") || !t || !n) return;
              this._sendRollClickTelemetry(this.get("activeBannerSourceId"), e),
                this._updatePulling();
              this.get("trovesService").spendCoins(t, e, n);
            },
            _sendRollClickTelemetry(e, t) {
              s.Telemetry.sendCustomData(a.TELEMETRY_TABLE_NAME, {
                [a.TELEMETRY_EVENT_KEY_EVENT_NAME]:
                  1 === t
                    ? a.TELEMETRY_EVENT_NAME_ROLL_ONE
                    : a.TELEMETRY_EVENT_NAME_ROLL_TEN,
                [a.TELEMETRY_EVENT_KEY_ACTIVE_BANNER_SOURCE_ID]: e,
                [a.TELEMETRY_EVENT_KEY_PITY_COUNT]: this.get("pityCount"),
              });
            },
            _updatePulling() {
              this.get("trovesService").updatePulling(!0);
              const e = setTimeout(() => {
                this._handleRollOrderNotificationTimeout();
              }, a.MAX_WAITING_TIME_IN_MS);
              this.set("currentRmsNotificationTimer", e);
            },
            _handleRollOrderNotificationTimeout() {
              this.get("isPulling") &&
                this.get("trovesService").updatePulling(!1),
                this._clearTimeoutTimer();
            },
            _clearTimeoutTimer() {
              const e = this.get("currentRmsNotificationTimer");
              e &&
                (clearTimeout(e),
                this.set("currentRmsNotificationTransactionId", null));
            },
          });
        t.default = o;
      },
      (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        var s = n(1),
          a = n(78),
          o = s.Ember.Component.extend({
            classNames: ["rcp-fe-lol-tft-troves-pull-buttons-container"],
            selectedOfferId: null,
            activeBannerStatus: null,
            pullCost: null,
            SINGLE_ROLL_COUNT: a.SINGLE_ROLL_COUNT,
            MULTI_ROLL_COUNT: a.MULTI_ROLL_COUNT,
            dropTableId: s.Ember.computed.alias(
              "activeBannerStatus.dropTableId",
            ),
            trovesService: s.Ember.inject.service("tftTroves"),
            trovesTokensAmount: s.Ember.computed.alias(
              "trovesService.trovesTokensAmount",
            ),
            isPulling: s.Ember.computed.alias("trovesService.isPulling"),
            tenPullCost: s.Ember.computed("pullCost", function () {
              return 10 * this.get("pullCost");
            }),
            isSinglePullDisabled: s.Ember.computed(
              "trovesTokensAmount",
              "activeBannerStatus",
              "isPulling",
              "pullCost",
              function () {
                const e = this.get("trovesTokensAmount"),
                  t = this.get("activeBannerStatus"),
                  n = this.get("isPulling"),
                  s = this.get("pullCost");
                return this.isDisabledForPull(a.SINGLE_ROLL_COUNT, s, e, t, n);
              },
            ),
            isTenPullDisabled: s.Ember.computed(
              "trovesTokensAmount",
              "activeBannerStatus",
              "isPulling",
              "tenPullCost",
              function () {
                const e = this.get("trovesTokensAmount"),
                  t = this.get("activeBannerStatus"),
                  n = this.get("isPulling"),
                  s = this.get("tenPullCost");
                return this.isDisabledForPull(a.MULTI_ROLL_COUNT, s, e, t, n);
              },
            ),
            isDisabledForPull: (e, t, n, s, a) =>
              !!a ||
              !!s.isCollectorBountyMaxRollsMet ||
              !(n && s && s.availableContents) ||
              n < t ||
              s.availableContents < e,
            selectedItem: null,
            startCraftingCeremony: null,
            contentOwned: !1,
            isSinglePullDisabledTrovesV2: s.Ember.computed(
              "trovesTokensAmount",
              "activeBannerStatus",
              "isPulling",
              "pullCost",
              function () {
                const e = this.get("trovesTokensAmount"),
                  t = this.get("activeBannerStatus"),
                  n = this.get("isPulling"),
                  s = this.get("pullCost");
                return this.isDisabledForPullTrovesV2(s, e, t, n);
              },
            ),
            isTenPullDisabledTrovesV2: s.Ember.computed(
              "trovesTokensAmount",
              "activeBannerStatus",
              "isPulling",
              "pullCost",
              function () {
                const e = this.get("trovesTokensAmount"),
                  t = this.get("activeBannerStatus"),
                  n = this.get("isPulling"),
                  s = this.get("tenPullCost");
                return this.isDisabledForPullTrovesV2(s, e, t, n);
              },
            ),
            isDisabledForPullTrovesV2: (e, t, n, s) => !!s || !t || !n || t < e,
            isAllContentOwned: s.Ember.computed(
              "activeBannerStatus",
              function () {
                const e = this.get("activeBannerStatus");
                return (
                  !(!e || e.availableContents) && 0 === e.availableContents
                );
              },
            ),
            actions: {
              startCraftingCeremony() {
                this.sendAction("startCraftingCeremony");
              },
            },
          });
        t.default = o;
      },
      (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        var s = n(1),
          a = s.Ember.Component.extend({
            classNames: ["rcp-fe-lol-tft-troves-pull-error-dialog"],
            trovesService: s.Ember.inject.service("tftTroves"),
            pullErrorModalShowing: s.Ember.computed.alias(
              "trovesService.pullErrorModalShowing",
            ),
            title: s.tra.get("troves_pull_error_dialog_title"),
            content: s.tra.get("troves_pull_error_dialog_content_msg"),
            support: s.tra.get("troves_pull_error_dialog_support_msg"),
            okText: s.tra.get("troves_pull_error_dialog_close"),
            actions: {
              closePullErrorModal() {
                this.get("trovesService").updatePullErrorModal(!1);
              },
            },
          });
        t.default = a;
      },
      (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        var s = n(1);
        const { Component: a } = s.Ember;
        var o = a.extend({
          classNames: ["rcp-fe-lol-tft-troves-banners"],
          activeBanners: null,
          setSelectedChasedContentId: null,
        });
        t.default = o;
      },
      (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        var s = n(1),
          a = n(78),
          o = n(2);
        const { SFX_SUB_CHANNEL_UI_NAME: l } = o.AUDIO_CHANNELS,
          { Component: i, computed: r } = s.Ember;
        function c(e) {
          return {
            [a.ROLL_REWARD_RARITY_STRING_RARE]: 0,
            [a.ROLL_REWARD_RARITY_STRING_EPIC]: 1,
            [a.ROLL_REWARD_RARITY_STRING_LEGENDARY]: 2,
            [a.ROLL_REWARD_RARITY_STRING_MYTHIC]: 3,
          }[e];
        }
        function m(e) {
          return e.sort((e, t) => c(t.rarity) - c(e.rarity));
        }
        var u = i.extend({
          classNames: ["rcp-fe-lol-tft-troves-ceremony"],
          activeBanner: null,
          ceremonyData: null,
          trovesService: s.Ember.inject.service("tftTroves"),
          highlightRewards: r("ceremonyData", function () {
            const e = this.get("ceremonyData"),
              t = e && e.rewards && e.rewards.highlight;
            return t || [];
          }),
          standardRewards: r("ceremonyData", function () {
            const e = this.get("ceremonyData"),
              t = e && e.rewards && e.rewards.standard;
            return t || [];
          }),
          sortedStandardRewards: r("standardRewards", function () {
            return m(this.get("standardRewards"));
          }),
          maxRarityInRewards: r(
            "highlightRewards",
            "sortedStandardRewards",
            function () {
              const e = m(this.get("highlightRewards")),
                t = this.get("sortedStandardRewards");
              return c(m([e[0], t[0]])[0].rarity);
            },
          ),
          trovesPromoAssets: r.alias("trovesService.trovesPromoAssets"),
          backgroundImageAvailable: r("trovesPromoAssets", function () {
            const e = this.get("trovesPromoAssets");
            return !(!e || !e[a.GDS_TROVES_BACKGROUND_ASSET_KEY]);
          }),
          backgroundImage: r("trovesPromoAssets", function () {
            const e = this.get("trovesPromoAssets");
            return this.get("backgroundImageAvailable")
              ? e[a.GDS_TROVES_BACKGROUND_ASSET_KEY]
              : "";
          }),
          ceremonyState: a.CEREMONY_STATE_NONE,
          playCurrencySegment: r.equal(
            "ceremonyState",
            a.CEREMONY_STATE_CURRENCY,
          ),
          playPortalSegment: r.equal("ceremonyState", a.CEREMONY_STATE_PORTAL),
          playHighlightSegment: r.equal(
            "ceremonyState",
            a.CEREMONY_STATE_HIGHLIGHT,
          ),
          playStandardSegment: r.equal(
            "ceremonyState",
            a.CEREMONY_STATE_STANDARD,
          ),
          ceremonyInProgress: r("ceremonyState", function () {
            return this.get("ceremonyState") !== a.CEREMONY_STATE_NONE;
          }),
          pullType: r.alias("ceremonyData.pullType"),
          currencySegmentData: r.alias(
            "activeBanner.celebrationTheme.currencySegmentData",
          ),
          currencyLottiePath: r.alias("currencySegmentData.lottieJsonPath"),
          currencyLottieImagePath: r("currencyLottiePath", function () {
            if (!this.get("currencyLottiePath"))
              return (
                s.logger.error("`currencyLottieImagePath` will be empty"), ""
              );
            const e = this.get("currencyLottiePath");
            return e.substr(0, e.lastIndexOf("/") + 1) + "images/";
          }),
          currencyParams: r("pullType", function () {
            let e = this.get("pullType");
            return (
              (e && !isNaN(e)) || (e = a.PULL_TYPE_SINGLE),
              { "param-single-multi-mythic-slider": e }
            );
          }),
          currentlyPlayingPortal: !1,
          showPortal: r.or("currentlyPlayingPortal", "playPortalSegment"),
          highlightRewardsExist: r("highlightRewards", function () {
            return this.get("highlightRewards").length > 0;
          }),
          highlightSegmentData: r.alias(
            "activeBanner.celebrationTheme.highlightSegmentData",
          ),
          highlightRevealSfxSrc: s.Ember.computed.alias(
            "highlightSegmentData.revealSoundPath",
          ),
          highlightTransitionWipeSfxSrc: s.Ember.computed.alias(
            "highlightSegmentData.transitionWipeSoundPath",
          ),
          hasHighlight: r.bool("highlightLottiePath"),
          pauseHighlightSegment: !1,
          highlightLottieImagePath: r("highlightLottiePath", function () {
            if (this.get("highlightLottiePath")) {
              const e = this.get("highlightLottiePath");
              return e.substr(0, e.lastIndexOf("/") + 1) + "images/";
            }
            return "";
          }),
          standardSegmentData: r.alias(
            "activeBanner.celebrationTheme.standardSegmentData",
          ),
          standardRewardsExist: r("standardRewards", function () {
            return this.get("standardRewards").length > 0;
          }),
          _playSFX(e) {
            s.Audio.getChannel(l).playSound(e);
          },
          didInsertElement() {
            this._super(...arguments);
            const e = s.Viewport.getApiKey("rcp-fe-lol-tft-troves_api_key");
            this._screenRoot = s.Viewport.overlay().getScreenRoot(
              e,
              "rcp-fe-lol-tft-troves-ceremony",
            );
            const t = this.get("element");
            this._screenRoot.getElement().appendChild(t);
          },
          didReceiveAttrs() {
            this._super(...arguments);
            const e = this.get("ceremonyData");
            e &&
              (this.get("ceremonyInProgress") ||
                s.Ember.run.scheduleOnce("afterRender", this, () => {
                  this._screenRoot && this._screenRoot.bump(),
                    e.ceremonyState
                      ? (s.logger.info(
                          "DEV ceremonyData has a dev-only ceremonyState field",
                        ),
                        this.set("ceremonyState", e.ceremonyState))
                      : this.set("ceremonyState", a.CEREMONY_STATE_CURRENCY);
                }));
          },
          resetState() {
            this._currentSFXUI &&
              this._currentSFXUI.isPlaying() &&
              (this._currentSFXUI.stop(), (this._currentSFXUI = null)),
              this.set("ceremonyState", a.CEREMONY_STATE_NONE);
            this.get("trovesService").clearCeremonyData();
          },
          startMilestoneCeremony: null,
          exit() {
            this._screenRoot.release(),
              this.resetState(),
              this.get("trovesService").trovesV2Enabled &&
                this.get("startMilestoneCeremony") &&
                this.attrs.startMilestoneCeremony();
          },
          didUpdateAttrs: function () {
            this._super(...arguments),
              this.get("shouldShow") &&
                !this.get("ceremonyInProgress") &&
                (this._screenRoot.bump(),
                this.set("ceremonyState", a.CEREMONY_STATE_CURRENCY));
          },
          _currentSFXUI: null,
          sfxCurrencySrc: r("currencySegmentData", function () {
            const e = this.get("currencySegmentData");
            switch (this.get("pullType")) {
              case a.PULL_TYPE_MULTI:
                return e.multiPullSoundPath;
              case a.PULL_TYPE_MYTHIC:
                return e.mythicPullSoundPath;
              case a.PULL_TYPE_SINGLE:
              default:
                return e.singlePullSoundPath;
            }
          }),
          portalSegmentData: r.alias(
            "activeBanner.celebrationTheme.portalSegmentData",
          ),
          isPortalSegmentSkipped: !1,
          _skipPortalSegment() {
            this.get("currentlyPlayingPortal") &&
              !this.get("highlightRewardsExist") &&
              (this.set("isPortalSegmentSkipped", !0),
              this.set("currentlyPlayingPortal", !1),
              this._transitionToHighlightCeremony());
          },
          _transitionToHighlightCeremony() {
            this.get("highlightRewardsExist")
              ? (this.set("ceremonyState", a.CEREMONY_STATE_HIGHLIGHT),
                this._playSFX(this.get("highlightRevealSfxSrc")),
                s.Ember.run.later(
                  this,
                  function () {
                    this.set("pauseHighlightSegment", !0);
                  },
                  a.HIGHLIGHT_SEGMENT_PAUSE_OFFSET_MS,
                ))
              : this.set("ceremonyState", a.CEREMONY_STATE_STANDARD);
          },
          actions: {
            onCurrencyComplete() {
              this.get("ceremonyState") === a.CEREMONY_STATE_CURRENCY &&
                this.set("ceremonyState", a.CEREMONY_STATE_PORTAL);
            },
            onPortalPlayback() {
              this.set("currentlyPlayingPortal", !0),
                s.Ember.run.later(
                  this,
                  function () {
                    this.get("isPortalSegmentSkipped") ||
                      this._transitionToHighlightCeremony();
                  },
                  a.POST_PORTAL_SEGMENT_OFFSET_MS,
                );
            },
            onPortalComplete() {
              this.set("currentlyPlayingPortal", !1);
            },
            onHighlightComplete() {
              this.get("standardRewardsExist")
                ? this.set("ceremonyState", a.CEREMONY_STATE_STANDARD)
                : this.exit();
            },
            onHighlightContinueClick() {
              this.set("pauseHighlightSegment", !1),
                this.get("standardRewardsExist")
                  ? this._playSFX(this.get("highlightTransitionWipeSfxSrc"))
                  : this.exit();
            },
            onStandardComplete() {
              this.get("ceremonyState") === a.CEREMONY_STATE_STANDARD &&
                this.exit();
            },
            onCeremonyClick() {
              this.get("trovesService").trovesV2Enabled &&
                this._skipPortalSegment();
            },
          },
        });
        t.default = u;
      },
      (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        var s = n(1),
          a = n(78);
        const { Component: o, computed: l } = s.Ember;
        var i = o.extend({
          classNames: ["highlight-rewards"],
          classNameBindings: [
            "playAnimation:playing:not-playing",
            "pauseAnimation:paused:unpaused",
          ],
          highlightSegmentData: null,
          playAnimation: !1,
          rewards: null,
          buttonText: "",
          pullType: "",
          transitionWipeSfxSrc: s.Ember.computed.alias(
            "highlightSegmentData.transitionWipeSoundPath",
          ),
          onButtonClick: null,
          highlightParams: l(
            "highlightRewardsExist",
            "highlightSliderValue",
            function () {
              return {
                "param-reward-type-slider": this.get("highlightSliderValue"),
              };
            },
          ),
          highlightSliderValue: l(
            "ceremonyData",
            "pullType",
            "highlightRewardsExist",
            function () {
              switch (this.get("rewards")[0].itemTypeId) {
                case a.TYPE_ID_PROMISETOKEN:
                  return this.get("pullType") === a.PULL_TYPE_MULTI
                    ? a.HIGHLIGHT_SLIDER_VALUE_MULTI_PROMISETOKEN
                    : a.HIGHLIGHT_SLIDER_VALUE_SINGLE_PROMISETOKEN;
                case a.TYPE_ID_COMPANION:
                  return this.get("pullType") === a.PULL_TYPE_MULTI
                    ? a.HIGHLIGHT_SLIDER_VALUE_MULTI_COMPANION
                    : a.HIGHLIGHT_SLIDER_VALUE_SINGLE_COMPANION;
                case a.TYPE_ID_MAPSKIN:
                default:
                  return this.get("pullType") === a.PULL_TYPE_MULTI
                    ? a.HIGHLIGHT_SLIDER_VALUE_MULTI_MAPSKIN
                    : a.HIGHLIGHT_SLIDER_VALUE_SINGLE_MAPSKIN;
              }
            },
          ),
          highlightReplacementImages: l("rewards", function () {
            const e = this.get("rewards")[0];
            if (e.itemTypeId === a.TYPE_ID_PROMISETOKEN) return {};
            return {
              [e.itemTypeId === a.TYPE_ID_COMPANION
                ? "asset-little-legend.png"
                : "asset-arena.png"]: e.highlightRewardAssetPath
                ? e.highlightRewardAssetPath
                : e.rewardTexturePath,
            };
          }),
          highlightReplacementText: l(
            "highlightSegmentData",
            "rewards",
            function () {
              const e = this.get("rewards")[0],
                t = { rewardName: e.name };
              if (e.itemTypeId === a.TYPE_ID_PROMISETOKEN) {
                const e = this.get("highlightSegmentData");
                (t.title = e.promiseTokenTitle),
                  (t.rewardDescription = e.promiseTokenDescription);
              }
              return t;
            },
          ),
          highlightLottiePath: l.alias("highlightSegmentData.lottieJsonPath"),
          pauseHighlightSegment: !1,
          highlightLottieImagePath: l("highlightLottiePath", function () {
            if (this.get("highlightLottiePath")) {
              const e = this.get("highlightLottiePath");
              return e.substr(0, e.lastIndexOf("/") + 1) + "images/";
            }
            return "";
          }),
        });
        t.default = i;
      },
      (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        var s = n(1),
          a = n(78),
          o = n(2);
        const { SFX_SUB_CHANNEL_UI_NAME: l } = o.AUDIO_CHANNELS,
          { Component: i, computed: r } = s.Ember,
          c = "UX Choice: no reveal sound";
        var m = i.extend({
          classNames: ["standard-rewards"],
          standardSegmentData: null,
          rewards: null,
          highlightRewardsExist: !1,
          isPortalSegmentSkipped: !1,
          trovesService: s.Ember.inject.service("tftTroves"),
          headerText: r.alias("standardSegmentData.PCHeaderText"),
          buttonText: r.alias("standardSegmentData.PCButtonText"),
          onButtonClick: null,
          backgroundPath: r.alias("standardSegmentData.PCBackgroundPath"),
          firstItemTimingOffset: r(
            "standardSegmentData.FirstItemTimingOffset",
            "isPortalSegmentSkipped",
            function () {
              return this.get("isPortalSegmentSkipped")
                ? 0
                : 1e3 * this.get("standardSegmentData.FirstItemTimingOffset");
            },
          ),
          interItemTimingOffset: r(
            "standardSegmentData.InterItemTimingOffset",
            function () {
              return (
                1e3 * this.get("standardSegmentData.InterItemTimingOffset")
              );
            },
          ),
          allRewardsRendered: !1,
          rewardStaggeredLists: null,
          isSingleReward: r.equal("rewards.length", 1),
          singleStandardRewardName: r("rewards", function () {
            const e = this.get("rewards");
            return 1 === e.length ? e[0].name : null;
          }),
          _resetRewardStaggeredLists(e) {
            const t = s.Ember.A([s.Ember.A([])]);
            this.get("rewards.length") > 5 && t.pushObject(s.Ember.A([]));
            for (let n = 0; n < e; n++)
              n < 5 ? t[0].push(null) : t[1].push(null);
            this.set("rewardStaggeredLists", t);
          },
          _renderRewardsStaggeredList() {
            this._resetRewardStaggeredLists(this.get("rewards").length),
              s.Ember.run.scheduleOnce("afterRender", this, () => {
                this.get("rewards").length > 0 &&
                  this._scheduleNextRewardRender(
                    0,
                    this.get("firstItemTimingOffset"),
                  );
              });
          },
          _scheduleNextRewardRender(e, t) {
            s.Ember.run.later(() => {
              const t = this.get("rewards");
              this._pushToRewardStaggeredLists(e, t[e]),
                e + 1 < t.length
                  ? this._scheduleNextRewardRender(
                      e + 1,
                      this.get("interItemTimingOffset"),
                    )
                  : this.set("allRewardsRendered", !0);
            }, t);
          },
          _pushToRewardStaggeredLists(e, t) {
            const n = this.get("rewardStaggeredLists");
            if (e < 5) n[0].replace(e, 1, t);
            else {
              const s = e - 5;
              n[1].replace(s, 1, t);
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
                  return e.revealMythicSoundPath;
              }
            }
            return e.revealRareSoundPath;
          },
          init() {
            this._super(...arguments);
            const e = this._getRevealSfxPath();
            e !== c && s.Audio.getChannel(l).playSound(e);
            const t = this.get("standardSegmentData");
            s.Audio.getChannel(l).playSound(t.revealGlobalSoundPath);
          },
          didInsertElement() {
            this._super(...arguments);
            const e = this.get("backgroundPath");
            (this.element.style.backgroundImage = `url(${e})`),
              this._renderRewardsStaggeredList();
          },
          actions: {
            onContinueClick() {
              this.get("trovesService").trovesV2Enabled
                ? (this.get("allRewardsRendered") &&
                    this.sendAction("onButtonClick"),
                  this.set("interItemTimingOffset", 0))
                : this.sendAction("onButtonClick");
            },
          },
        });
        t.default = m;
      },
      (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        var s = n(1),
          a = n(78);
        n(169);
        const { Component: o, computed: l } = s.Ember;
        var i = o.extend({
          classNames: ["rcp-fe-lol-tft-troves-chased-content"],
          showDropRatesModal: !1,
          moreInfoIcon: "/fe/lol-tft-troves/images/TFT_Icon_moreInfo.png",
          chasedContent: null,
          onPityUpdate: null,
          trovesService: s.Ember.inject.service("tftTroves"),
          pityCounter: l(
            "chasedContent.status",
            "chasedContent.pityLimit",
            function () {
              const e = this.get("chasedContent.pityLimit"),
                t = this.get("chasedContent.status.pityCount"),
                n = Math.max(e - t, 0);
              return this.get("onPityUpdate") && this.get("onPityUpdate")(n), n;
            },
          ),
          pityText: l(
            "pityCounter",
            "chasedContent.name",
            "chasedContent.status",
            function () {
              const e = this.get("pityCounter"),
                t = this.get("tra");
              if (isNaN(e))
                return t.formatString(
                  "troves_chased_content_pity_text_loading",
                );
              let n = this.get("chasedContent.name");
              const s = this.get("chasedContent.status"),
                a = s && s.owned;
              a && (n = this.get("tra.troves_promise_token"));
              const o = { pity_count: e, name: n };
              let l;
              if (this.get("chasedContent.isCollectorBounty")) {
                const e = this.get("chasedContent.maxTotalRolls"),
                  t = this.get("chasedContent.status.totalRollsCount");
                (o.max_roll = e),
                  (o.pity_count = e - t),
                  (l = s.isCollectorBountyMaxRollsMet
                    ? "troves_collectors_pity_max_rolls_text"
                    : a
                      ? "troves_collectors_pity_owned_text"
                      : "troves_collectors_pity_text");
              } else l = "troves_chased_content_pity_text";
              return t.formatString(l, o);
            },
          ),
          legalDisclaimer: l("chasedContent.isCollectorBounty", function () {
            const e = this.get("chasedContent.isCollectorBounty"),
              t = this.get("tra"),
              n = e
                ? "collectors_loot_odds_bad_luck_protection_badge_title"
                : "troves_loot_odds_bad_luck_protection_badge_title",
              s = e
                ? "collectors_loot_odds_bad_luck_protection_title"
                : "troves_loot_odds_bad_luck_protection_title",
              a = e
                ? "collectors_loot_odds_bad_luck_protection_description"
                : "troves_loot_odds_bad_luck_protection_description",
              o = {
                badgeTitle: t.get(n),
                title: t.get(s),
                description: t.get(a),
                iconCssClass: "bad-luck-protection-icon",
              };
            return (
              e &&
                (o.subtitle = t.get(
                  "collectors_loot_odds_droprates_modal_legal_disclaimer_subtitle",
                )),
              o
            );
          }),
          legalDisclaimerTrovesV2: l(function () {
            const e = this.get("tra");
            return {
              badgeTitle: e.get("troves_loot_odds_mythic_promise_badge_title"),
              title: e.get("troves_loot_odds_mythic_promise_title"),
              description: e.get("troves_loot_odds_mythic_promise_description"),
              iconCssClass: "mythic-promise-icon",
            };
          }),
          duplicateDisclaimerTrovesV2: l(function () {
            const e = this.get("tra");
            return {
              badgeTitle: e.get("troves_loot_odds_duplicates_badge_title"),
              title: e.get("troves_loot_odds_duplicates_title"),
              description: e.get("troves_loot_odds_duplicates_description"),
              iconCssClass: "duplicate-rewards-icon",
            };
          }),
          showBannerTimer: l("chasedContent", function () {
            const e = this.get("chasedContent");
            if (!e || !e.endDate) return !1;
            return new Date(e.endDate) - Date.now() > 0;
          }),
          hasBannerTexture: l("chasedContent.bannerTexture", function () {
            const e = this.get("chasedContent.bannerTexture");
            return e && e.endsWith(".png");
          }),
          _sendMoreInfoClickedTelemetry() {
            s.Telemetry.sendCustomData(a.TELEMETRY_TABLE_NAME, {
              [a.TELEMETRY_EVENT_KEY_EVENT_NAME]:
                a.TELEMETRY_EVENT_NAME_SHOW_DETAILS,
              [a.TELEMETRY_EVENT_KEY_ACTIVE_BANNER_SOURCE_ID]: this.get(
                "chasedContent.sourceId",
              ),
            });
          },
          actions: {
            onMoreInfoClicked: function () {
              this._sendMoreInfoClickedTelemetry(),
                this.set("showDropRatesModal", !0);
            },
            hideDropRatesModal: function () {
              this.set("showDropRatesModal", !1);
            },
          },
        });
        t.default = i;
      },
      (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          Object.defineProperty(t, "PAW", {
            enumerable: !0,
            get: function () {
              return s.default;
            },
          }),
          Object.defineProperty(t, "PROFILE_PRIVACY", {
            enumerable: !0,
            get: function () {
              return r.default;
            },
          }),
          Object.defineProperty(t, "QUEUES", {
            enumerable: !0,
            get: function () {
              return a.default;
            },
          }),
          Object.defineProperty(t, "REWARD_TRACKER", {
            enumerable: !0,
            get: function () {
              return o.default;
            },
          }),
          Object.defineProperty(t, "SETTINGS", {
            enumerable: !0,
            get: function () {
              return i.default;
            },
          }),
          Object.defineProperty(t, "SOCIAL", {
            enumerable: !0,
            get: function () {
              return l.default;
            },
          }),
          Object.defineProperty(t, "TIME", {
            enumerable: !0,
            get: function () {
              return c.default;
            },
          });
        var s = m(n(170)),
          a = m(n(181)),
          o = m(n(182)),
          l = m(n(183)),
          i = m(n(184)),
          r = m(n(185)),
          c = m(n(186));
        function m(e) {
          return e && e.__esModule ? e : { default: e };
        }
      },
      (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        var s = p(n(171)),
          a = p(n(172)),
          o = p(n(173)),
          l = p(n(174)),
          i = p(n(175)),
          r = p(n(176)),
          c = p(n(177)),
          m = p(n(178)),
          u = p(n(179)),
          d = p(n(180));
        function p(e) {
          return e && e.__esModule ? e : { default: e };
        }
        var h = {
          COMPONENT_TYPES: s.default,
          CURRENCY_TYPES: a.default,
          INVENTORY_TYPES: o.default,
          MEDIA_TYPES: l.default,
          MEDIA_LOAD_TYPES: i.default,
          MODAL_TYPES: r.default,
          OFFER_PURCHASE_STATES: c.default,
          OFFER_VALIDATION_STATES: m.default,
          SCROLL_LIST_DISPLAY_TYPES: u.default,
          TEMPLATE_TYPES: d.default,
        };
        t.default = h;
      },
      (e, t) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        var n = {
          TEXT: "TEXT",
          TITLE_SUBTITLE: "TITLE_SUBTITLE",
          PURCHASE: "PURCHASE",
          MEDIA: "MEDIA",
          IMAGE_CAROUSEL: "IMAGE_CAROUSEL",
          SCROLL_LIST: "SCROLL_LIST",
          VERTICAL_LIST: "VERTICAL_LIST",
        };
        t.default = n;
      },
      (e, t) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        var n = { RP: "RP", IP: "IP", BE: "lol_blue_essence" };
        t.default = n;
      },
      (e, t) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        var n = {
          CHAMPION: "CHAMPION",
          CHAMPION_SKIN: "CHAMPION_SKIN",
          WARD_SKIN: "WARD_SKIN",
          BATTLE_BOOST: "BATTLE_BOOST",
          GIFT: "GIFT",
          MYSTERY: "MYSTERY",
          BUNDLES: "BUNDLES",
          SUMMONER_ICON: "SUMMONER_ICON",
          STATSTONE: "STATSTONE",
        };
        t.default = n;
      },
      (e, t) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        var n = { SVG: "SVG", IMAGE: "IMAGE", VIDEO: "VIDEO" };
        t.default = n;
      },
      (e, t) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        var n = {
          LOCAL_ASSET: "LOCAL_ASSET",
          EXTERNAL_URL: "EXTERNAL_URL",
          GAME_DATA: "GAME_DATA",
        };
        t.default = n;
      },
      (e, t) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        var n = {
          CHAMPION_MODAL: "CHAMPION_MODAL",
          SKIN_VIEWER_MODAL: "SKIN_VIEWER_MODAL",
          MULTIPLE_PURCHASE_MODAL: "MULTIPLE_PURCHASE_MODAL",
          CHROMA_MODAL: "CHROMA_MODAL",
          CHROMA_BUNDLE_MODAL: "CHROMA_BUNDLE_MODAL",
          SUMMONER_ICON_MODAL: "SUMMONER_ICON_MODAL",
          WARD_SKIN_MODAL: "WARD_SKIN_MODAL",
          SKIN_WITH_DEPENDENCY_MODAL: "SKIN_WITH_DEPENDENCY_MODAL",
          PAW_GENERIC_MODAL: "PAW_GENERIC_MODAL",
        };
        t.default = n;
      },
      (e, t) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        var n = {
          NOT_STARTED: "NOT_STARTED",
          IN_PROGRESS: "IN_PROGRESS",
          SUCCESS: "SUCCESS",
          FAIL: "FAIL",
        };
        t.default = n;
      },
      (e, t) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        var n = {
          NOT_STARTED: "NOT_STARTED",
          IN_PROGRESS: "IN_PROGRESS",
          COMPLETED: "COMPLETED",
        };
        t.default = n;
      },
      (e, t) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        var n = {
          EXPANDED: "EXPANDED",
          COMPACT: "COMPACT",
          DETAILED: "DETAILED",
        };
        t.default = n;
      },
      (e, t) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        var n = { LARGE_TWO_COLUMN_LANDSCAPE: "LARGE_TWO_COLUMN_LANDSCAPE" };
        t.default = n;
      },
      (e, t) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        const n = "RANKED_SOLO_5x5",
          s = "RANKED_FLEX_SR",
          a = "RANKED_FLEX_TT",
          o = "CHERRY",
          l = "RANKED_TFT",
          i = "RANKED_TFT_DOUBLE_UP",
          r = "RANKED_TFT_TURBO",
          c = "RANKED_TFT_PAIRS",
          m = [n, s],
          u = [...m, a],
          d = [o],
          p = [l, i],
          h = [r, c],
          f = [...p, ...h],
          g = [...u, ...p],
          _ = [...h, ...d];
        var v = {
          RANKED_SOLO_5x5_QUEUE_TYPE: n,
          RANKED_FLEX_SR_QUEUE_TYPE: s,
          RANKED_FLEX_TT_QUEUE_TYPE: a,
          RANKED_CHERRY_QUEUE_TYPE: o,
          RANKED_TFT_QUEUE_TYPE: l,
          RANKED_TFT_DOUBLE_UP_QUEUE_TYPE: i,
          RANKED_TFT_TURBO_QUEUE_TYPE: r,
          RANKED_TFT_PAIRS_QUEUE_TYPE: c,
          RANKED_LOL_QUEUE_TYPES: u,
          RANKED_SR_QUEUE_TYPES: m,
          RANKED_TFT_QUEUE_TYPES: p,
          RATED_TFT_QUEUE_TYPES: h,
          RANKED_AND_RATED_TFT_QUEUE_TYPES: f,
          ALL_RANKED_QUEUE_TYPES: g,
          ALL_RATED_QUEUE_TYPES: _,
          ALL_RANKED_AND_RATED_QUEUE_TYPES: [...g, ..._],
        };
        t.default = v;
      },
      (e, t) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        var n = {
          REWARD_TAGS: {
            INSTANT: "Instant",
            RARE: "Rare",
            CHOICE: "Choice",
            MULTIPLE: "Multiple",
          },
          MILESTONE_STAGES: {
            COMPLETED: "completed",
            CURRENT: "current",
            FUTURE: "future",
            HOVERING_COMPLETED: "future-completed",
          },
          REWARD_STATE: {
            LOCKED: "Locked",
            UNLOCKED: "Unlocked",
            UNSELECTED: "Unselected",
            SELECTED: "Selected",
          },
          TRACKER_SIZE: {
            SMALL: "tracker-size-small",
            MEDIUM: "tracker-size-medium",
          },
          REWARD_OPTION_HEADER_TYPE: {
            FREE: "FREE",
            PREMIUM: "PREMIUM",
            NONE: "NONE",
          },
        };
        t.default = n;
      },
      (e, t) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        var n = { DEFAULT_SUMMONER_ICON_ID: 29 };
        t.default = n;
      },
      (e, t) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        var n = { AUTO: "auto", ALWAYS: "always", NEVER: "never" };
        t.default = n;
      },
      (e, t) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        const n = {
            UNKNOWN: "UNKNOWN",
            ENABLED: "ENABLED",
            DISABLED: "DISABLED",
          },
          s = { PRIVATE: "PRIVATE", PUBLIC: "PUBLIC" };
        var a = {
          ProfilePrivacyEnabledState: n,
          ProfilePrivacySetting: s,
          DEFAULT_PROFILE_PRIVACY: {
            enabledState: n.UNKNOWN,
            setting: s.PUBLIC,
          },
        };
        t.default = a;
      },
      (e, t) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = t.TIME_UNITS = t.TIME_CONVERSIONS = void 0);
        const n = {
          MILLISECONDS: "milliseconds",
          SECONDS: "seconds",
          MINUTES: "minutes",
          HOURS: "hours",
          DAYS: "days",
          WEEKS: "weeks",
          MONTHS: "months",
          YEARS: "years",
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
            MILLISECONDS_IN_A_YEAR: 314496e5,
          };
        t.TIME_CONVERSIONS = l;
        var i = { TIME_UNITS: n, TIME_CONVERSIONS: l };
        t.default = i;
      },
      (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        var s = n(1),
          a = n(78);
        n(169);
        const o = n(90),
          { Component: l, computed: i } = s.Ember,
          r = "troves-hub-banner-error",
          c = "troves-hub-banner-empty",
          m = "troves-hub-cloud-platform-image";
        var u = l.extend({
          classNames: ["rcp-fe-lol-tft-troves"],
          trovesService: s.Ember.inject.service("tftTroves"),
          activeBanner: null,
          onBannerSelected: null,
          isLoading: i.alias("trovesService.isLoading"),
          hasBannerError: i.alias("trovesService.hasBannerError"),
          trovesPromoAssets: i.alias("trovesService.trovesPromoAssets"),
          _visitId: null,
          isEmpty: i.empty("activeBanners"),
          activeBanners: i("trovesService.troveActiveBanners", function () {
            const e = this.get("trovesService.troveActiveBanners");
            return e && e.length
              ? e
                  .filter((e) => 1 === e.version)
                  .sort((e, t) => e.displayPriority - t.displayPriority)
              : [];
          }),
          errorBannerImage: i("trovesPromoAssets", function () {
            const e = this.get("trovesPromoAssets");
            return e && e[r] ? e[r] : "";
          }),
          emptyBannerImage: i("trovesPromoAssets", function () {
            const e = this.get("trovesPromoAssets");
            return e && e[c] ? e[c] : "";
          }),
          cloudPlatformImage: i("trovesPromoAssets", function () {
            const e = this.get("trovesPromoAssets");
            return e && e[m] ? e[m] : "";
          }),
          activePlatformImage: i(
            "cloudPlatformImage",
            "activeBanner",
            function () {
              const e = this.get("activeBanner");
              return e &&
                e.platformTexture &&
                e.platformTexture.endsWith(".png")
                ? e.platformTexture
                : this.get("cloudPlatformImage");
            },
          ),
          selectedChasedContentId: null,
          activeBannerStatus: i.alias("activeBanner.status"),
          currencySegmentData: i.alias(
            "activeBanner.celebrationTheme.currencySegmentData",
          ),
          pullCost: i.alias("activeBanner.pullCost"),
          selectedOfferId: i.alias("activeBanner.rollOffer"),
          showBannersList: i("activeBanners", function () {
            const e = this.get("activeBanners");
            return e && e.length > 1;
          }),
          showBannerTimer: i("activeBanner", function () {
            const e = this.get("activeBanner");
            if (!e || !e.endDate) return !1;
            return new Date(this.get("activeBanner.endDate")) - Date.now() > 0;
          }),
          mythicOfferId: i("activeBanner", function () {
            const e = this.get("activeBanner");
            return e ? e.mythicOffer : null;
          }),
          didInsertElement() {
            this._super(...arguments);
            const e = o();
            this.set("_visitId", e),
              s.Telemetry.sendCustomData(a.TELEMETRY_TABLE_NAME, {
                [a.TELEMETRY_EVENT_KEY_EVENT_NAME]:
                  a.TELEMETRY_EVENT_NAME_TROVES_VISITED,
                [a.TELEMETRY_EVENT_KEY_VISIT_ID]: e,
                [a.TELEMETRY_EVENT_KEY_ACTIVE_BANNER_SOURCE_ID]: this.get(
                  "activeBanner.sourceId",
                ),
              });
          },
          _sendBannerSelectedTelemetry() {
            s.Telemetry.sendCustomData(a.TELEMETRY_TABLE_NAME, {
              [a.TELEMETRY_EVENT_KEY_EVENT_NAME]:
                a.TELEMETRY_EVENT_NAME_BANNER_SELECTED,
              [a.TELEMETRY_EVENT_KEY_ACTIVE_BANNER_SOURCE_ID]: this.get(
                "activeBanner.sourceId",
              ),
              [a.TELEMETRY_EVENT_KEY_VISIT_ID]: this.get("_visitId"),
            });
          },
          actions: {
            setSelectedChasedContentId(e) {
              this.get("selectedChaseContentId") !== e &&
                (this.set("selectedChasedContentId", e),
                this.sendAction("onBannerSelected", e),
                this._sendBannerSelectedTelemetry());
            },
            onPityUpdate(e) {
              this.set("pityCount", e);
            },
          },
        });
        t.default = u;
      },
      (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        var s = n(1),
          a = n(78),
          o = n(2);
        const { SFX_SUB_CHANNEL_AMBIENCE_INTERRUPTABLE_NAME: l } =
            o.AUDIO_CHANNELS,
          { Component: i, computed: r } = s.Ember;
        var c = i.extend({
          classNames: ["reward-card"],
          reward: null,
          shouldPlayGlint: !1,
          standardSegmentData: null,
          framePath: r.alias("standardSegmentData.PCRewardFramePath"),
          rewardFadeInDuration: r(
            "standardSegmentData.PCRewardFadeInDuration",
            function () {
              return this._formatAsSeconds(
                this.get("standardSegmentData.PCRewardFadeInDuration"),
              );
            },
          ),
          rewardFadeInDelay: r(
            "standardSegmentData.PCRewardFadeInDelay",
            function () {
              return this._formatAsSeconds(
                this.get("standardSegmentData.PCRewardFadeInDelay"),
              );
            },
          ),
          sheenPath: r.alias("standardSegmentData.PCRewardSheenPath"),
          sheenDuration: r(
            "standardSegmentData.PCRewardSheenDuration",
            function () {
              return this._formatAsSeconds(
                this.get("standardSegmentData.PCRewardSheenDuration"),
              );
            },
          ),
          sheenDelay: r("standardSegmentData.PCRewardSheenDelay", function () {
            return this._formatAsSeconds(
              this.get("standardSegmentData.PCRewardSheenDelay"),
            );
          }),
          thumbnailFadeInDuration: r(
            "standardSegmentData.PCThumbnailFadeInDuration",
            function () {
              return this._formatAsSeconds(
                this.get("standardSegmentData.PCThumbnailFadeInDuration"),
              );
            },
          ),
          thumbnailFadeInDelay: r(
            "standardSegmentData.PCThumbnailFadeInDelay",
            function () {
              return this._formatAsSeconds(
                this.get("standardSegmentData.PCThumbnailFadeInDelay"),
              );
            },
          ),
          glintDelay: r("standardSegmentData.PCGlintSprite.delay", function () {
            return this._formatAsSeconds(
              this.get("standardSegmentData.PCGlintSprite.delay"),
            );
          }),
          glintDuration: r(
            "standardSegmentData.PCGlintSprite.delay",
            "standardSegmentData.PCGlintSprite.duration",
            function () {
              const e =
                this.get("standardSegmentData.PCGlintSprite.duration") -
                this.get("standardSegmentData.PCGlintSprite.delay");
              return this._formatAsSeconds(e);
            },
          ),
          isLegendary: r.equal(
            "reward.rarity",
            a.ROLL_REWARD_RARITY_STRING_LEGENDARY,
          ),
          starPath: r("reward", "standardSegmentData", function () {
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
                s.logger.error(
                  "No asset path for reward star level " + e.starLevel,
                );
            }
            return null;
          }),
          gemPath: r("reward", "standardSegmentData", function () {
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
                s.logger.error("No asset path for reward rarity " + e.rarity);
            }
            return null;
          }),
          _formatAsSeconds: (e) => (e ? `${e}s` : "0s"),
          _playSFX() {
            const e = this.get("standardSegmentData"),
              t = this.get("isLegendary")
                ? e.pullSingleIndividualGlintLegendarySoundPath
                : e.pullSingleIndividualGlintSoundPath;
            s.Audio.getChannel(l).playSound(t);
          },
          rarityCssClass: s.Ember.computed("reward.rarity", function () {
            return (this.get("reward.rarity") || "default").toLowerCase();
          }),
          didInsertElement() {
            this._super(...arguments),
              this._playSFX(),
              requestAnimationFrame(() => {
                this.element
                  .querySelector(".reward-card-content")
                  .classList.add("reward-card-content--reveal"),
                  this.element
                    .querySelector(".cover")
                    .classList.add("cover--reveal"),
                  this.element
                    .querySelector(".sheen")
                    .classList.add("sheen--animate"),
                  this.get("shouldPlayGlint") &&
                    this.element
                      .querySelector(".glint-anim")
                      .classList.add("glint-anim--translate");
              });
          },
        });
        t.default = c;
      },
      (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        var s = n(1),
          a = n(78),
          o = n(2);
        const { SFX_SUB_CHANNEL_UI_NAME: l } = o.AUDIO_CHANNELS,
          { Component: i, computed: r } = s.Ember;
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
            if ((this._super(...arguments), !this.get("play"))) return;
            if (this.get("_videoInProgress")) return;
            const e = this.element.querySelector("uikit-video");
            this._play(e);
          },
          _play(e) {
            this.set("_videoInProgress", !0);
            e.play(
              () => {
                this._playPortalSfx();
                const e = this.get("onPlayback");
                e && e();
              },
              () => {
                const e = this.get("onError");
                e && e();
              },
              () => {
                this.set("_videoInProgress", !1), (this._currentSFX = null);
                const e = this.get("onPlaybackComplete");
                e && e();
              },
            );
          },
          _playPortalSfx() {
            const e = this.get("portalSegmentData");
            let t = e.singlePullSoundPath;
            return (
              (t =
                this.get("pullType") === a.PULL_TYPE_MULTI
                  ? e.multiPullSoundPath
                  : t),
              (this._currentSFX = s.Audio.getChannel(l).createSound(t)),
              this._currentSFX.play()
            );
          },
          portalVideoPath: r(
            "portalSegmentData",
            "maxRarityInRewards",
            "pullType",
            function () {
              const e = this.get("portalSegmentData"),
                t = this.get("pullType") === a.PULL_TYPE_MULTI,
                n = this.get("maxRarityInRewards");
              if (t) {
                if (n === a.ROLL_REWARD_RARITY_RARE)
                  return e.multiPullRareWebmPath;
                if (n === a.ROLL_REWARD_RARITY_EPIC)
                  return e.multiPullEpicWebmPath;
                if (n === a.ROLL_REWARD_RARITY_LEGENDARY)
                  return e.multiPullLegendaryWebmPath;
                if (n === a.ROLL_REWARD_RARITY_MYTHIC)
                  return e.multiPullMythicWebmPath;
              }
              return n === a.ROLL_REWARD_RARITY_RARE
                ? e.singlePullRareWebmPath
                : n === a.ROLL_REWARD_RARITY_EPIC
                  ? e.singlePullEpicWebmPath
                  : n === a.ROLL_REWARD_RARITY_LEGENDARY
                    ? e.singlePullLegendaryWebmPath
                    : n === a.ROLL_REWARD_RARITY_MYTHIC
                      ? e.singlePullMythicWebmPath
                      : (s.logger.error(
                          "couldn't choose a portal, loading default portal",
                        ),
                        e.singlePullRareWebmPath);
            },
          ),
          willDestroyElement() {
            this._super(...arguments),
              this._currentSFX && this._currentSFX.stop();
          },
        });
        t.default = c;
      },
      (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        var s = n(1);
        const { Component: a, computed: o } = s.Ember,
          l = 1e3;
        var i = a.extend({
          classNames: ["troves-sprite-animation"],
          sprite: null,
          numRows: o.alias("sprite.numRows"),
          numCols: o.alias("sprite.numCols"),
          backgroundImage: null,
          currentFrame: 0,
          playCount: 0,
          delayTimeout: null,
          durationTimeout: null,
          animationInterval: null,
          elementStyle: o(
            "backgroundImage",
            "backgroundPositionX",
            "backgroundPositionY",
            "numRows",
            "numCols",
            function () {
              return s.Ember.String.htmlSafe(
                `\n        background-image: url(${this.get("backgroundImage")});\n        top: -${100 * this.get("backgroundPositionY")}%;\n        left: -${100 * this.get("backgroundPositionX")}%;\n        width: ${100 * this.get("numCols")}%;\n        height: ${100 * this.get("numRows")}%;\n      `,
              );
            },
          ),
          play() {
            if (
              this.get("delayTimeout") ||
              this.get("durationTimeout") ||
              this.get("animationInterval")
            )
              return;
            const e = this.get("sprite.maxPlayCount");
            this.set(
              "delayTimeout",
              setTimeout(
                () => {
                  this.set("playCount", 0),
                    this.set(
                      "backgroundImage",
                      this.get("sprite.spritesheetPath"),
                    );
                  const t = this.get("numCols"),
                    n = this.get("sprite.numFrames");
                  let s = this.get("sprite.startFrame");
                  this.set(
                    "animationInterval",
                    setInterval(
                      () => {
                        if (
                          (this.set("backgroundPositionY", Math.floor(s / t)),
                          this.set("backgroundPositionX", s % t),
                          ++s,
                          s === n)
                        ) {
                          let t = this.get("playCount");
                          ++t,
                            this.set("playCount", t),
                            -1 === e || t < e ? (s = 0) : this.stop();
                        }
                      },
                      l / this.get("sprite.fps"),
                    ),
                  );
                },
                l * this.get("sprite.delay"),
              ),
            );
            const t = this.get("sprite.duration");
            t > 0 &&
              -1 !== e &&
              this.set(
                "durationTimeout",
                setTimeout(() => {
                  this.stop();
                }, l * t),
              );
          },
          stop() {
            clearTimeout(this.get("delayTimeout")),
              clearTimeout(this.get("durationTimeout")),
              clearInterval(this.get("animationInterval")),
              this.set("delayTimeout", null),
              this.set("durationTimeout", null),
              this.set("animationInterval", null),
              this.set("backgroundImage", null),
              this.set("backgroundPositionX", 0),
              this.set("backgroundPositionY", 0);
          },
          didInsertElement() {
            this.get("sprite.playAtInsert") && this.play();
          },
          willDestroyElement() {
            this.stop();
          },
        });
        t.default = i;
      },
      (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        var s = n(1),
          a = n(78),
          o = s.Ember.Component.extend({
            classNames: [`${a.PLUGIN_NAME}-time-remaining-widget`],
            bannerData: null,
            bannerName: s.Ember.computed.alias("bannerData.name"),
            startDate: s.Ember.computed.alias("bannerData.startDate"),
            endDate: s.Ember.computed.alias("bannerData.endDate"),
          });
        t.default = o;
      },
      (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        var s = n(1),
          a = n(193);
        const { Component: o, computed: l, typeOf: i } = s.Ember;
        var r = o.extend({
          classNames: ["rcp-fe-lol-tft-troves-milestone-rewards-tracker"],
          closeMilestoneRewardsModal: null,
          rewardPositionInterval: -6,
          trovesService: s.Ember.inject.service("tftTroves"),
          milestones: l.alias("trovesService.milestones"),
          milestoneCounter: l.alias("milestones.counter"),
          progressInterval: l.alias("milestoneCounter.increaseBy"),
          progressCurrent: l.alias("milestoneCounter.resetValue"),
          milestoneRewards: l(
            "milestones.milestones",
            "progressCurrent",
            "progressInterval",
            "rewardPositionInterval",
            function () {
              const e = this.get("milestones.milestones"),
                t = this.get("progressCurrent"),
                n = this.get("progressInterval"),
                s = this.get("rewardPositionInterval");
              return (
                e.map((e, o) => {
                  const l = e.currencyId;
                  a.ROTATIONAL_SHOP_CURRENCY_IMAGE_PATHS.has(l) &&
                    (e.iconURL = a.ROTATIONAL_SHOP_CURRENCY_IMAGE_PATHS.get(l)),
                    (e.progressPosition = s * o * 2),
                    (e.position = e.progressPosition + s),
                    e.resetValue <= t
                      ? (e.progressPercentage = 100)
                      : e.resetValue > t + n
                        ? (e.progressPercentage = 0)
                        : (e.progressPercentage =
                            ((t + n - e.resetValue) / n) * 100);
                }),
                e
              );
            },
          ),
          milestoneRewardsLength: l("milestoneRewards", function () {
            const e = this.get("milestoneRewards");
            return e && "array" === i(e) ? e.length : 0;
          }),
          progressMax: l("milestoneRewards", function () {
            const e = this.get("milestoneRewards");
            if (e && "array" === i(e) && e.length) {
              return e[e.length - 1].resetValue;
            }
            return 0;
          }),
          progressIndex: l("milestoneRewards", function () {
            const e = this.get("milestoneRewards").findIndex(
              (e) => !e.triggered,
            );
            return -1 !== e ? e : 0;
          }),
          repeatTooltipProgressFormat: l(
            "progressCurrent",
            "progressMax",
            function () {
              return this.get("tra").formatString(
                "troves_milestone_repeat_tooltip_progress",
                {
                  current: this.get("progressCurrent"),
                  max: this.get("progressMax"),
                },
              );
            },
          ),
          milestoneClaimedCheckmark: l("trovesService", function () {
            const e = this.get("trovesService").trovesPromoAssets;
            return e ? e["troves-hub-milestone-claimed-checkmark"] : "";
          }),
          milestoneFrameImagePath: l("trovesService", function () {
            const e = this.get("trovesService").trovesPromoAssets;
            return e ? e["troves-hub-milestone-frame"] : "";
          }),
          milestonePipActiveImagePath: l("trovesService", function () {
            const e = this.get("trovesService").trovesPromoAssets;
            return e ? e["troves-hub-milestone-pip-active"] : "";
          }),
          milestonePipClaimedImagePath: l("trovesService", function () {
            const e = this.get("trovesService").trovesPromoAssets;
            return e ? e["troves-hub-milestone-pip-claimed"] : "";
          }),
          milestonePipLockedImagePath: l("trovesService", function () {
            const e = this.get("trovesService").trovesPromoAssets;
            return e ? e["troves-hub-milestone-pip-locked"] : "";
          }),
          repeatIconImagePath: l("trovesService", function () {
            const e = this.get("trovesService").trovesPromoAssets;
            return e ? e["troves-hub-milestone-rotate-icon"] : "";
          }),
        });
        t.default = r;
      },
      (e, t) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.UV_TYPE_DEFINITIONS =
            t.TFT_ROTATIONAL_SHOP_VERSIONS =
            t.TFT_ROTATIONAL_SHOP_NAVS =
            t.TFT_ROTATIONAL_SHOP_GROUPS =
            t.TFT_ROTATIONAL_SHOP_GDS_ASSETS_KEY =
            t.TFT_ROTATIONAL_SHOP_CURRENCIES =
            t.TFT_ROTATIONAL_SHOP_BACKGROUND_ASSET_KEYS =
            t.TFT_ROTATIONAL_SHOP_ASSETS_KEY =
            t.SERVICE_ENDPOINTS =
            t.ROTATIONAL_SHOP_CURRENCY_IMAGE_PATHS =
            t.MAX_WAITING_TIME_IN_MS =
            t.ITEM_TYPE_FRAME_DEFINITIONS =
            t.ITEM_TYPES =
            t.CAP_STATUS_CREATED =
            t.CAP_STATUS_COMPLETE =
              void 0);
        t.TFT_ROTATIONAL_SHOP_GDS_ASSETS_KEY = "lcu-assets-tft-rotational-shop";
        const n = { MYTHIC: "mythic", SEASONAL: "seasonal" };
        t.TFT_ROTATIONAL_SHOP_GROUPS = n;
        t.TFT_ROTATIONAL_SHOP_NAVS = ["mythic", "seasonal"];
        t.MAX_WAITING_TIME_IN_MS = 19e3;
        t.CAP_STATUS_COMPLETE = "COMPLETE";
        t.CAP_STATUS_CREATED = "CREATED";
        t.TFT_ROTATIONAL_SHOP_ASSETS_KEY = "lcu-assets-tft-rotational-shop";
        const s = new Map([
          [n.MYTHIC, "mythic-store-background"],
          [n.SEASONAL, "seasonal-store-background"],
        ]);
        t.TFT_ROTATIONAL_SHOP_BACKGROUND_ASSET_KEYS = s;
        t.TFT_ROTATIONAL_SHOP_CURRENCIES = {
          tft_standard_coin: "db40bd66-f3ac-5bca-a104-2eebca8cc1d2",
          tft_ultra_premium_coin: "686fa0fd-5138-52a0-bf58-eeab665eb93b",
        };
        const a = new Map([
          [
            "db40bd66-f3ac-5bca-a104-2eebca8cc1d2",
            "/fe/lol-tft/images/rotational-shop/TFT_Icon_SC.png",
          ],
          [
            "686fa0fd-5138-52a0-bf58-eeab665eb93b",
            "/fe/lol-tft/images/rotational-shop/TFT_Icon_PC.png",
          ],
        ]);
        t.ROTATIONAL_SHOP_CURRENCY_IMAGE_PATHS = a;
        t.SERVICE_ENDPOINTS = {
          ROTATIONAL_SHOP_CONFIG:
            "/lol-client-config/v3/client-config/lol.client_settings.tft.tft_rotational_shop",
          STORES: "/lol-marketplace/v1/products/tft/stores",
          WALLET: "/lol-inventory/v1/wallet",
          SEND_PURCHASE: "/lol-marketplace/v1/products/tft/purchases",
          PURCHASE_TRANSACTION: "/lol-marketplace/v1/purchases",
          GENERIC_ASSETS: "/lol-game-data/assets/v1/generic-assets.json",
        };
        const o = {
            _1x1: { w: 1, h: 1 },
            _1x2: { w: 1, h: 2 },
            _2x1: { w: 2, h: 1 },
            _2x2: { w: 2, h: 2 },
          },
          l = {
            ARENA: "arena",
            BOOM: "boom",
            CHIBI: "chibi",
            LITTLE_LEGEND: "littlelegend",
          };
        t.ITEM_TYPES = l;
        const i = "large-square",
          r = {
            [n.MYTHIC]: {
              [l.ARENA]: o._2x1,
              [l.BOOM]: o._2x1,
              [l.CHIBI]: o._1x2,
              [l.LITTLE_LEGEND]: o._1x1,
              [i]: o._2x2,
              DEFAULT: o._1x1,
            },
            [n.SEASONAL]: {
              [l.ARENA]: o._2x1,
              [l.BOOM]: o._2x1,
              [l.CHIBI]: o._1x1,
              [l.LITTLE_LEGEND]: o._1x1,
              [i]: o._2x2,
              DEFAULT: o._1x1,
            },
            DEFAULT: {
              [l.ARENA]: o._1x1,
              [l.BOOM]: o._1x1,
              [l.CHIBI]: o._1x1,
              [l.LITTLE_LEGEND]: o._1x1,
              [i]: o._1x1,
              DEFAULT: o._1x1,
            },
          };
        t.ITEM_TYPE_FRAME_DEFINITIONS = r;
        const c = "defaultUVs",
          m = "largeSquareUVs",
          u = "longTileUVs",
          d = {
            [n.MYTHIC]: {
              [l.ARENA]: u,
              [l.BOOM]: u,
              [l.CHIBI]: "tallTileUVs",
              [l.LITTLE_LEGEND]: c,
              [i]: m,
            },
            [n.SEASONAL]: {
              [l.ARENA]: u,
              [l.BOOM]: u,
              [l.CHIBI]: c,
              [l.LITTLE_LEGEND]: c,
              [i]: m,
            },
            DEFAULT: {
              [l.ARENA]: c,
              [l.BOOM]: c,
              [l.CHIBI]: c,
              [l.LITTLE_LEGEND]: c,
              [i]: m,
            },
          };
        t.UV_TYPE_DEFINITIONS = d;
        t.TFT_ROTATIONAL_SHOP_VERSIONS = {
          "rotational-shop-nav": 1,
          "rotational-shop-mythic": 1,
          "rotational-shop-seasonal": 1,
        };
      },
      (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        var s = n(1),
          a = n(78),
          o = n(2);
        const { SFX_SUB_CHANNEL_AMBIENCE_INTERRUPTABLE_NAME: l } =
            o.AUDIO_CHANNELS,
          { Component: i, computed: r } = s.Ember;
        var c = i.extend({
          classNames: ["reward-card-v2"],
          reward: null,
          shouldPlayGlint: !1,
          standardSegmentData: null,
          framePath: r.alias("standardSegmentData.PCRewardFramePath"),
          rewardFadeInDuration: r(
            "standardSegmentData.PCRewardFadeInDuration",
            function () {
              return this._formatAsSeconds(
                this.get("standardSegmentData.PCRewardFadeInDuration"),
              );
            },
          ),
          rewardFadeInDelay: r(
            "standardSegmentData.PCRewardFadeInDelay",
            function () {
              return this._formatAsSeconds(
                this.get("standardSegmentData.PCRewardFadeInDelay"),
              );
            },
          ),
          sheenPath: r.alias("standardSegmentData.PCRewardSheenPath"),
          sheenDuration: r(
            "standardSegmentData.PCRewardSheenDuration",
            function () {
              return this._formatAsSeconds(
                this.get("standardSegmentData.PCRewardSheenDuration"),
              );
            },
          ),
          sheenDelay: r("standardSegmentData.PCRewardSheenDelay", function () {
            return this._formatAsSeconds(
              this.get("standardSegmentData.PCRewardSheenDelay"),
            );
          }),
          thumbnailFadeInDuration: r(
            "standardSegmentData.PCThumbnailFadeInDuration",
            function () {
              return this._formatAsSeconds(
                this.get("standardSegmentData.PCThumbnailFadeInDuration"),
              );
            },
          ),
          thumbnailFadeInDelay: r(
            "standardSegmentData.PCThumbnailFadeInDelay",
            function () {
              return this._formatAsSeconds(
                this.get("standardSegmentData.PCThumbnailFadeInDelay"),
              );
            },
          ),
          glintDelay: r("standardSegmentData.PCGlintSprite.delay", function () {
            return this._formatAsSeconds(
              this.get("standardSegmentData.PCGlintSprite.delay"),
            );
          }),
          glintDuration: r(
            "standardSegmentData.PCGlintSprite.delay",
            "standardSegmentData.PCGlintSprite.duration",
            function () {
              const e =
                this.get("standardSegmentData.PCGlintSprite.duration") -
                this.get("standardSegmentData.PCGlintSprite.delay");
              return this._formatAsSeconds(e);
            },
          ),
          isLegendary: r.equal(
            "reward.rarity",
            a.ROLL_REWARD_RARITY_STRING_LEGENDARY,
          ),
          starPath: r("reward", "standardSegmentData", function () {
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
                s.logger.info(
                  "No asset path for reward star level " + e.starLevel,
                );
            }
            return "";
          }),
          gemPath: r("reward", "standardSegmentData", function () {
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
                s.logger.info("No asset path for reward rarity " + e.rarity);
            }
            return "";
          }),
          hasQuantity: s.Ember.computed.notEmpty("reward.quantity"),
          isCurrency: s.Ember.computed("reward.itemId", function () {
            return a.TYPE_CURRENCIES.includes(this.get("reward.itemId"));
          }),
          showQuantity: s.Ember.computed(
            "hasQuantity",
            "isCurrency",
            function () {
              return this.get("hasQuantity") && this.get("isCurrency");
            },
          ),
          trovesService: s.Ember.inject.service("tftTroves"),
          trovesPromoAssets: s.Ember.computed.alias(
            "trovesService.trovesPromoAssets",
          ),
          isToOverride: s.Ember.computed("reward", function () {
            const e = this.get("reward");
            return (
              e?.itemId === a.TYPE_ID_REALMCRYSTAL ||
              e?.itemId === a.TYPE_ID_MYTHICMEDALLION
            );
          }),
          overrideFrameImagePath: s.Ember.computed("reward", function () {
            const e = this.get("reward"),
              t = e?.itemId,
              n = this.get("trovesPromoAssets");
            switch (t) {
              case a.TYPE_ID_REALMCRYSTAL:
                return n["troves-hub-realm-crystal-frame"] || "";
              case a.TYPE_ID_MYTHICMEDALLION:
                return n["troves-hub-mythic-medallion-frame"] || "";
            }
          }),
          overrideIconImagePath: s.Ember.computed(
            "reward",
            "isDuplicate",
            function () {
              const e = this.get("reward"),
                t = e?.itemId,
                n = e?.quantity,
                s = this.get("trovesPromoAssets"),
                o = this.get("isDuplicate");
              if (t && n)
                switch (t) {
                  case a.TYPE_ID_REALMCRYSTAL:
                    if (o) return s["troves-hub-realm-crystal-duplicate"] || "";
                    if (n >= 1e3) return s["troves-hub-realm-crystal-L"] || "";
                    if (n > 100) return s["troves-hub-realm-crystal-M"] || "";
                    break;
                  case a.TYPE_ID_MYTHICMEDALLION:
                    if (o)
                      return s["troves-hub-mythic-medallion-duplicate"] || "";
                    if (n >= 5) return s["troves-hub-mythic-medallion-L"] || "";
                    if (n >= 3) return s["troves-hub-mythic-medallion-M"] || "";
                }
              return e?.rewardTexturePath || "";
            },
          ),
          isDuplicate: s.Ember.computed("reward", function () {
            const e = this.get("reward");
            return (
              (e &&
                a.CEREMONIES_DUPLICATE_CURRENCY_AMOUNTS[e.itemId]?.includes(
                  e.quantity,
                )) ||
              !1
            );
          }),
          _formatAsSeconds: (e) => (e ? `${e}s` : "0s"),
          _playSFX() {
            const e = this.get("standardSegmentData"),
              t = this.get("isLegendary")
                ? e.pullSingleIndividualGlintLegendarySoundPath
                : e.pullSingleIndividualGlintSoundPath;
            s.Audio.getChannel(l).playSound(t);
          },
          rarityCssClass: s.Ember.computed("reward.rarity", function () {
            return (this.get("reward.rarity") || "default").toLowerCase();
          }),
          didInsertElement() {
            this._super(...arguments),
              this._playSFX(),
              requestAnimationFrame(() => {
                this.element
                  .querySelector(".reward-card-content")
                  .classList.add("reward-card-content--reveal"),
                  this.element
                    .querySelector(".cover")
                    .classList.add("cover--reveal"),
                  this.element
                    .querySelector(".sheen")
                    .classList.add("sheen--animate"),
                  this.get("shouldPlayGlint") &&
                    this.element
                      .querySelector(".glint-anim")
                      .classList.add("glint-anim--translate");
              });
          },
        });
        t.default = c;
      },
      (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        var s = n(1),
          a = n(78),
          o = n(193),
          l = n(89);
        const i = n(90),
          { Component: r, computed: c } = s.Ember,
          m = "troves-hub-banner-error",
          u = "troves-hub-banner-empty";
        var d = r.extend({
          classNames: ["rcp-fe-lol-tft-troves-v2"],
          trovesService: s.Ember.inject.service("tftTroves"),
          activeBanner: null,
          onBannerSelected: null,
          isLoading: c.alias("trovesService.isLoading"),
          hasBannerError: c.alias("trovesService.hasBannerError"),
          trovesPromoAssets: c.alias("trovesService.trovesPromoAssets"),
          rotationalShopService: s.Ember.inject.service("rotationalShop"),
          showCraftingCeremony: !1,
          activeBanners: c("trovesService.troveActiveBanners", function () {
            const e = this.get("trovesService.troveActiveBanners");
            return e && e.length
              ? e
                  .filter((e) => 2 === e.version)
                  .sort((e, t) => e.displayPriority - t.displayPriority)
              : [];
          }),
          activeBannerIds: c("activeBanners", function () {
            return this.get("activeBanners").map((e) => e.id);
          }),
          selectedItem: c(
            "rotationalShopService.groupedStores",
            "activeBanner.chaseContentId",
            function () {
              const e = this.get("activeBanner.chaseContentId"),
                t = this.get("rotationalShopService.groupedStores");
              if (e && t) {
                const n = t.get(o.TFT_ROTATIONAL_SHOP_GROUPS.MYTHIC);
                if (!s.Ember.isEmpty(n)) {
                  const t = n[0];
                  if (e && t)
                    for (let n = 0; n < t.length; n++) {
                      const a = t[n];
                      if (a.catalogEntries)
                        for (let t = 0; t < a.catalogEntries.length; t++) {
                          const n = a.catalogEntries[t],
                            o = n.purchaseUnits;
                          if ("array" === s.Ember.typeOf(o) && o.length > 0) {
                            const t = o[0].fulfillment;
                            if (t && t.itemId === e)
                              return { storeId: a.id, item: n };
                          }
                        }
                    }
                }
              }
              return null;
            },
          ),
          hasValidSelectedItem: c.notEmpty("selectedItem"),
          milestones: s.Ember.computed.alias("trovesService.milestones"),
          milestonesTriggered: s.Ember.computed.alias(
            "trovesService.milestonesTriggered",
          ),
          showMilestoneCeremony: !1,
          _visitId: null,
          isEmpty: c.empty("activeBanners"),
          errorBannerImage: c("trovesPromoAssets", function () {
            const e = this.get("trovesPromoAssets");
            return e && e[m] ? e[m] : "";
          }),
          emptyBannerImage: c("trovesPromoAssets", function () {
            const e = this.get("trovesPromoAssets");
            return e && e[u] ? e[u] : "";
          }),
          selectedChasedContentId: null,
          activeBannerStatus: c.alias("activeBanner.status"),
          currencySegmentData: c.alias(
            "activeBanner.celebrationTheme.currencySegmentData",
          ),
          pullCost: c.alias("activeBanner.pullCost"),
          selectedOfferId: c.alias("activeBanner.rollOffer"),
          showBannersList: c("activeBanners", function () {
            const e = this.get("activeBanners");
            return e && e.length > 1;
          }),
          didInsertElement() {
            this._super(...arguments);
            const e = i();
            this.set("_visitId", e),
              s.Telemetry.sendCustomData(a.TELEMETRY_TABLE_NAME, {
                [a.TELEMETRY_EVENT_KEY_EVENT_NAME]:
                  a.TELEMETRY_EVENT_NAME_TROVES_VISITED,
                [a.TELEMETRY_EVENT_KEY_VISIT_ID]: e,
                [a.TELEMETRY_EVENT_KEY_ACTIVE_BANNER_SOURCE_ID]: this.get(
                  "activeBanner.sourceId",
                ),
              });
          },
          _sendBannerSelectedTelemetry() {
            s.Telemetry.sendCustomData(a.TELEMETRY_TABLE_NAME, {
              [a.TELEMETRY_EVENT_KEY_EVENT_NAME]:
                a.TELEMETRY_EVENT_NAME_BANNER_SELECTED,
              [a.TELEMETRY_EVENT_KEY_ACTIVE_BANNER_SOURCE_ID]: this.get(
                "activeBanner.sourceId",
              ),
              [a.TELEMETRY_EVENT_KEY_VISIT_ID]: this.get("_visitId"),
            });
          },
          init() {
            this._super(...arguments),
              (0, l.trackOpenTroves)(this.get("activeBannerIds"));
          },
          willDestroyElement() {
            this._super(...arguments), (0, l.trackCloseTroves)();
          },
          actions: {
            setSelectedChasedContentId(e) {
              this.get("selectedChaseContentId") !== e &&
                (this.set("selectedChasedContentId", e),
                this.sendAction("onBannerSelected", e),
                this._sendBannerSelectedTelemetry());
            },
            onPityUpdate(e) {
              this.set("pityCount", e);
            },
            startCraftingCeremony: function () {
              this.set("showCraftingCeremony", !0);
            },
            endCraftingCeremony: function () {
              this.set("showCraftingCeremony", !1);
            },
            startMilestoneCeremony: function () {
              this.get("milestonesTriggered").length &&
                this.set("showMilestoneCeremony", !0);
            },
            stopMilestoneCeremony() {
              this.set("showMilestoneCeremony", !1),
                this.set("milestonesTriggered", []);
            },
          },
        });
        t.default = d;
      },
      (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        var s = n(1),
          a = n(197);
        const o = "troves-ftf-splash-image",
          l = "troves-ftf-background-image";
        var i = s.Ember.Component.extend({
          classNames: ["rcp-fe-lol-tft-troves-v2-first-time-flow"],
          tftService: s.Ember.inject.service("tft"),
          trovesService: s.Ember.inject.service("tftTroves"),
          showModal: !0,
          rotationalShopAssets: s.Ember.computed.alias(
            "tftService.rotationalShopAssets",
          ),
          splashImagePath: s.Ember.computed(
            "rotationalShopAssets",
            function () {
              const e = this.get("rotationalShopAssets");
              return e ? e[o] : "";
            },
          ),
          backgroundImagePath: s.Ember.computed(
            "rotationalShopAssets",
            function () {
              const e = this.get("rotationalShopAssets");
              return e ? e[l] : "";
            },
          ),
          didRender() {
            this._super(...arguments),
              (0, a.updateRotationalShopConfirmDialog)(
                ".tft-troves-v2-first-time-flow-content",
              );
          },
          actions: {
            hideModal() {
              this.set("showModal", !1);
            },
          },
        });
        t.default = i;
      },
      (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.isItemSold = function (e) {
            if (s.Ember.isEmpty(e)) return !1;
            for (let t = 0; t < e.length; ++t) {
              if (e[t].fulfillment.finalDelta > 0) return !1;
            }
            return !0;
          }),
          (t.updateRotationalShopButton = a),
          (t.updateRotationalShopConfirmDialog = function (e) {
            const t = document.querySelector(e);
            if (!t) return;
            const n = t.closest("lol-uikit-dialog-frame");
            if (!n) return;
            const s = n.shadowRoot;
            if (s) {
              const e = document.createElement("style");
              (e.textContent =
                '\n    :host .lol-uikit-dialog-frame.top, :host .lol-uikit-dialog-frame.bottom {\n      border-image-source: linear-gradient(180deg, #AFE1F9 -171.29%, #BBA7F2 -35.19%, #8A81E9 100%);\n    }\n    :host .lol-uikit-dialog-frame.top .lol-uikit-dialog-frame-sub-border::before,\n    :host .lol-uikit-dialog-frame.bottom .lol-uikit-dialog-frame-sub-border::before {\n      top: -6px;\n      border-image-source: url("/fe/lol-tft/images/rotational-shop/rotashop-sub-border-secondary-horizontal.png");\n    }\n    :host .lol-uikit-dialog-frame.top .lol-uikit-dialog-frame-sub-border::after,\n    :host .lol-uikit-dialog-frame.bottom .lol-uikit-dialog-frame-sub-border::after {\n      bottom: -6px;\n      border-image-source: url("/fe/lol-tft/images/rotational-shop/rotashop-sub-border-primary-horizontal.png");\n    }\n    '),
                s.appendChild(e);
            }
            const o = n.querySelector(
              "lol-uikit-flat-button-group",
            )?.shadowRoot;
            if (o) {
              const e = document.createElement("style");
              (e.textContent =
                "\n    :host([type=dialog-frame]) .lol-uikit-flat-button-group::before {\n      border-right: 2px solid #8A81E9;\n    }\n    :host([type=dialog-frame]) .lol-uikit-flat-button-group::after {\n      border-left: 2px solid #8A81E9;\n    }\n    "),
                o.appendChild(e);
            }
            const l = n.querySelector("lol-uikit-flat-button.button-accept");
            l && (l.setAttribute("primary", !1), l.blur(), a(l));
          });
        var s = n(1);
        function a(e) {
          const t = e?.shadowRoot;
          if (t) {
            const e = document.createElement("style");
            (e.textContent =
              "\n    :host .lol-uikit-flat-button .lol-uikit-flat-button-border-idle { \n      border-image-source: linear-gradient(180deg, #AFE1F9 0%, #BBA7F2 50.17%, #8A81E9 100%); \n    }\n    :host .lol-uikit-flat-button .lol-uikit-flat-button-bg {\n      background-image: linear-gradient(to bottom, #1e232a 0%, #1e232a 40%, rgba(162,128,255,0.8) 140%);\n    }\n    :host .lol-uikit-flat-button.hover .lol-uikit-flat-button-border-transition {\n      border-image-source: linear-gradient(180deg, #D1EBF7 0%, #CABDED 50.17%, #A280FF 100%);\n    }\n    :host .lol-uikit-flat-button.down .lol-uikit-flat-button-border-transition {\n      border-image-source: linear-gradient(180deg, #A280FF 0%, #5930EE 100%);\n    }\n    "),
              t.appendChild(e);
          }
        }
      },
      (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        var s = n(1),
          a = n(78);
        const o = "troves-ceremony-milestone-lottie-json-path",
          l = "crafting-ceremony-currency-lottie-sound-path";
        var i = s.Ember.Component.extend({
          classNames: ["troves-ceremony-milestone-rewards"],
          milestones: null,
          milestonesTriggered: null,
          tftService: s.Ember.inject.service("tft"),
          trovesService: s.Ember.inject.service("tftTroves"),
          rotationalShopAssets: s.Ember.computed.alias(
            "tftService.rotationalShopAssets",
          ),
          trovesPromoAssets: s.Ember.computed.alias(
            "trovesService.trovesPromoAssets",
          ),
          milestoneLottieParams: s.Ember.computed(
            "rotationalShopAssets",
            "item",
            function () {
              const e = {},
                t = this.get("rotationalShopAssets");
              this.get("item");
              return (
                (e.src = t[o] || ""),
                (e.sfxSrc = t[l] || ""),
                (e.imagePath =
                  e.src.substr(0, e.src.lastIndexOf("/") + 1) + "images/"),
                e
              );
            },
          ),
          animationParams: s.Ember.computed("milestonesTriggered", function () {
            const e = this.get("milestonesTriggered");
            return "array" === s.Ember.typeOf(e) &&
              e.length > 0 &&
              a.TYPE_ID_TO_MILESTONE_SLIDER_VALUE[e[0].currencyId]
              ? {
                  "param-milestone-slider":
                    a.TYPE_ID_TO_MILESTONE_SLIDER_VALUE[e[0].currencyId],
                }
              : { "param-milestone-slider": 0 };
          }),
          animationReplacementText: s.Ember.computed(
            "milestonesTriggered",
            function () {
              const e = this.get("milestonesTriggered"),
                t = { rewardName: "", rewardDescription: "", title: "" };
              if ("array" === s.Ember.typeOf(e) && e.length > 0) {
                const n = e[0];
                let o = "",
                  l = "";
                switch (n.currencyId) {
                  case a.TYPE_ID_REALMCRYSTAL:
                    (o = "rotational_shop_standard_currency_name"),
                      (l = "rotational_shop_standard_currency_quantity");
                    break;
                  case a.TYPE_ID_MYTHICMEDALLION:
                    (o = "rotational_shop_premium_currency_name"),
                      (l = "rotational_shop_premium_currency_quantity");
                }
                (t.rewardName = s.tra.formatString(l, {
                  quantity: n.currencyAmount || 1,
                })),
                  (t.rewardDescription = s.tra.formatString(
                    "rotational_shop_currency_description",
                    { currencyName: s.tra.get(o) },
                  )),
                  (t.title = s.tra.get("troves_milestone_ceremony_title"));
              }
              return t;
            },
          ),
          exit() {
            this._screenRoot.release();
          },
          didInsertElement() {
            this._super(...arguments);
            const e = s.Viewport.getApiKey(
              "rcp-fe-lol-tft-troves-milestone_api_key",
            );
            this._screenRoot = s.Viewport.overlay().getScreenRoot(
              e,
              "troves-ceremony-milestone-rewards",
            );
            const t = this.get("element");
            this._screenRoot.getElement().appendChild(t);
          },
          didReceiveAttrs() {
            this._super(...arguments);
            this.get("milestonesTriggered") &&
              s.Ember.run.scheduleOnce("afterRender", this, () => {
                this._screenRoot && this._screenRoot.bump();
              });
          },
          willDestroyElement() {
            this.exit();
          },
          actions: {
            close() {
              this.get("stopMilestoneCeremony") &&
                this.attrs.stopMilestoneCeremony(),
                this.exit();
            },
          },
        });
        t.default = i;
      },
      (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        var s = n(1),
          a = n(2),
          o = n(78),
          l = n(193),
          i = s.Ember.Component.extend({
            classNames: [`${a.PLUGIN_NAME}-troves-wallet`],
            tftService: s.Ember.inject.service("tft"),
            trovesService: s.Ember.inject.service("tftTroves"),
            rss: s.Ember.inject.service("rotationalShop"),
            formattedTrovesTokensAmount: s.Ember.computed.alias(
              "trovesService.formattedTrovesTokensAmountString",
            ),
            rotationalShopWallet: s.Ember.computed.alias(
              "rss.rotationalShopWallet",
            ),
            standardCoinsDescription: s.Ember.computed(
              "rotationalShopWallet",
              function () {
                const e =
                  this.get("rotationalShopWallet")[
                    l.TFT_ROTATIONAL_SHOP_CURRENCIES.tft_standard_coin
                  ] || 0;
                return this.get("tra").formatString(
                  "rotational_shop_standard_currency_description",
                  { amount: new Intl.NumberFormat().format(e) },
                );
              },
            ),
            premiumCoinsDescription: s.Ember.computed(
              "rotationalShopWallet",
              function () {
                const e =
                  this.get("rotationalShopWallet")[
                    l.TFT_ROTATIONAL_SHOP_CURRENCIES.tft_ultra_premium_coin
                  ] || 0;
                return this.get("tra").formatString(
                  "rotational_shop_premium_currency_description",
                  { amount: new Intl.NumberFormat().format(e) },
                );
              },
            ),
            ModalManager: s.UIKit.getModalManager(),
            willDestroyElement() {
              this._super(...arguments);
              const e = this.get("tftService");
              e && e.set("isHeaderButtonsEnabled", !0);
            },
            didRender() {
              const e = this.get("tftService");
              e && e.set("isHeaderButtonsEnabled", !1);
            },
            actions: {
              showTrovesTokensPurchaseDialog() {
                const e = this.get("ModalManager"),
                  t = e.add({
                    type: a.ITEM_PURCHASE_NAME,
                    data: {
                      tftService: this.get("tftService"),
                      trovesService: this.get("trovesService"),
                    },
                    ComponentFactory: s.componentFactory,
                  });
                t.domNode.addEventListener("closeButtonClick", function () {
                  e.remove(t);
                }),
                  s.Telemetry.sendCustomData(o.TELEMETRY_TABLE_NAME, {
                    [o.TELEMETRY_EVENT_KEY_EVENT_NAME]:
                      o.TELEMETRY_EVENT_NAME_OPEN_PURCHASE_MODAL,
                  });
              },
            },
          });
        t.default = i;
      },
      (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        var s = n(1),
          a = n(193),
          o = s.Ember.Component.extend({
            classNames: ["rcp-fe-lol-tft-rotational-shop-grouped-items"],
            groupedItems: null,
            activeNav: null,
            onItemSelected: null,
            rotationalShopService: s.Ember.inject.service("rotationalShop"),
            rotationalShopAssets: s.Ember.computed.alias(
              "rotationalShopService.rotationalShopAssets",
            ),
            items: s.Ember.computed("groupedItems", function () {
              const e = this.get("groupedItems");
              if (!s.Ember.isEmpty(e)) {
                let t = [];
                return (
                  e.forEach((e) => {
                    this.set("name", e.name),
                      (t = t.concat(
                        Array.from(e.catalogEntries, (t) => ({
                          storeId: e.id,
                          item: t,
                        })),
                      ));
                  }),
                  t.sort((e, t) =>
                    e.item.displayMetadata.tft.order >
                    t.item.displayMetadata.tft.order
                      ? 1
                      : -1,
                  ),
                  t
                );
              }
              return [];
            }),
            hasItems: s.Ember.computed.notEmpty("items"),
            noItemsErrorMessage: s.Ember.computed(function () {
              return "We're working on updating this section of the store";
            }),
            endTime: s.Ember.computed("items", function () {
              const e = this.get("items");
              if (e && e.length) {
                return e[0].item.endTime;
              }
              return null;
            }),
            showGroupedEndTime: s.Ember.computed("groupedItems", function () {
              const e = this.get("groupedItems");
              if ("array" === s.Ember.typeOf(e) && !s.Ember.isEmpty(e)) {
                const t = e[0];
                return (
                  t.displayMetadata &&
                  t.displayMetadata.tft &&
                  t.displayMetadata.tft.store ===
                    a.TFT_ROTATIONAL_SHOP_GROUPS.SEASONAL
                );
              }
              return !1;
            }),
            name: "",
            itemTypeFrameDefinition: s.Ember.computed("activeNav", function () {
              const e = this.get("activeNav");
              return a.ITEM_TYPE_FRAME_DEFINITIONS[e]
                ? a.ITEM_TYPE_FRAME_DEFINITIONS[e]
                : a.ITEM_TYPE_FRAME_DEFINITIONS.DEFAULT;
            }),
            getRandomColor() {
              let e = "#";
              for (let t = 0; t < 6; t++)
                e += "0123456789ABCDEF"[Math.floor(16 * Math.random())];
              return e;
            },
            frames: s.Ember.computed(
              "items",
              "itemTypeFrameDefinition",
              function () {
                const e = this.get("items"),
                  t = this.get("itemTypeFrameDefinition"),
                  n = [];
                if (!s.Ember.isEmpty("items"))
                  for (let s = 0; s < e.length; ++s) {
                    const a = e[s],
                      o =
                        a &&
                        a.item &&
                        a.item.displayMetadata &&
                        a.item.displayMetadata.tft;
                    if (o) {
                      const e =
                        t[o.overrideTileSize] || t[o.itemType] || t.DEFAULT;
                      n.push({
                        ...e,
                        content: { item: a, frameDefinition: e },
                      });
                    }
                  }
                return n;
              },
            ),
            actions: {
              onItemSelected(e) {
                this.sendAction("onItemSelected", e);
              },
            },
          });
        t.default = o;
      },
      (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        var s = n(1),
          a = n(193),
          o = s.Ember.Component.extend({
            classNames: ["rcp-fe-lol-tft-rotational-shop-header"],
            showStandardCurrency: !0,
            rotationalShopService: s.Ember.inject.service("rotationalShop"),
            rotationalShopWallet: s.Ember.computed.alias(
              "rotationalShopService.rotationalShopWallet",
            ),
            standardCoinsDescription: s.Ember.computed(
              "rotationalShopWallet",
              function () {
                const e =
                  this.get("rotationalShopWallet")[
                    a.TFT_ROTATIONAL_SHOP_CURRENCIES.tft_standard_coin
                  ] || 0;
                return this.get("tra").formatString(
                  "rotational_shop_standard_currency_description",
                  { amount: new Intl.NumberFormat().format(e) },
                );
              },
            ),
            premiumCoinsDescription: s.Ember.computed(
              "rotationalShopWallet",
              function () {
                const e =
                  this.get("rotationalShopWallet")[
                    a.TFT_ROTATIONAL_SHOP_CURRENCIES.tft_ultra_premium_coin
                  ] || 0;
                return this.get("tra").formatString(
                  "rotational_shop_premium_currency_description",
                  { amount: new Intl.NumberFormat().format(e) },
                );
              },
            ),
          });
        t.default = o;
      },
      (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        var s = n(1),
          a = n(193),
          o = n(197),
          l = n(89),
          i = n(75),
          r = s.Ember.Component.extend({
            classNames: ["rcp-fe-lol-tft-rotational-shop-item"],
            itemWithStoreId: null,
            frameDefinition: null,
            onItemSelected: null,
            hasGroupedEndTime: !1,
            activeNav: null,
            rotationalShopService: s.Ember.inject.service("rotationalShop"),
            rotationalShopAssets: s.Ember.computed.alias(
              "rotationalShopService.rotationalShopAssets",
            ),
            rotationalShopWallet: s.Ember.computed.alias(
              "rotationalShopService.rotationalShopWallet",
            ),
            trovesService: s.Ember.inject.service("tftTroves"),
            activeBanners: s.Ember.computed.alias(
              "trovesService.troveActiveBanners",
            ),
            item: s.Ember.computed.alias("itemWithStoreId.item"),
            endTime: s.Ember.computed.alias("item.endTime"),
            showEndTime: s.Ember.computed(
              "hasGroupedEndTime",
              "endTime",
              function () {
                return (
                  !this.get("hasGroupedEndTime") && null != this.get("endTime")
                );
              },
            ),
            payments: s.Ember.computed("item.purchaseUnits", function () {
              const e = this.get("item.purchaseUnits"),
                t = new Map();
              return (
                e.forEach((e) => {
                  e.paymentOptions.forEach((e) => {
                    e.payments.forEach((e) => {
                      const n = e.currencyId;
                      t.has(n)
                        ? t.set(n, t.get(n) + e.finalDelta)
                        : t.set(n, e.finalDelta);
                    });
                  });
                }),
                Array.from(t, ([e, t]) => ({
                  currency: e,
                  cost: t,
                  icon: a.ROTATIONAL_SHOP_CURRENCY_IMAGE_PATHS.get(e),
                }))
              );
            }),
            insufficientCurrency: s.Ember.computed(
              "rotationalShopWallet",
              "payments",
              function () {
                const e = this.get("payments"),
                  t = "array" === s.Ember.typeOf(e) && this.get("payments")[0];
                if (t) {
                  const e = t.cost,
                    n = this.get("rotationalShopWallet");
                  return ((n && n[t.currency]) || 0) < e;
                }
                return !0;
              },
            ),
            itemSold: s.Ember.computed("item.purchaseUnits", function () {
              return (0, o.isItemSold)(this.get("item.purchaseUnits"));
            }),
            hasBanner: s.Ember.computed(
              "activeNav",
              "item",
              "activeBanners",
              function () {
                if (
                  this.get("activeNav") !== a.TFT_ROTATIONAL_SHOP_GROUPS.MYTHIC
                )
                  return !1;
                const e = this.get("activeBanners").map(
                  (e) => e.chaseContentId,
                );
                return this.get("item.purchaseUnits").some((t) => {
                  const n = t.fulfillment?.itemId;
                  return n && e.includes(n);
                });
              },
            ),
            imagePath: s.Ember.computed("item", function () {
              return this.get("item")?.displayMetadata?.tft?.pc || "";
            }),
            imageUV: s.Ember.computed(
              "activeNav",
              "item",
              "item.itemType",
              function () {
                const e = this.get("activeNav"),
                  t = this.get("item"),
                  n = t && a.UV_TYPE_DEFINITIONS[e],
                  s = t.displayMetadata && t.displayMetadata.tft;
                if (n && s) {
                  const e = s[n[s.overrideTileSize]] || s[n[s.itemType]];
                  if (e) return e;
                }
                return { u1: 0, u2: 1, v1: 0, v2: 1 };
              },
            ),
            grayout: s.Ember.computed(
              "itemSold",
              "insufficientCurrency",
              function () {
                return (
                  !this.get("itemSold") && this.get("insufficientCurrency")
                );
              },
            ),
            clickable: s.Ember.computed("itemSold", "activeNav", function () {
              return (
                !this.get("itemSold") ||
                this.get("activeNav") === a.TFT_ROTATIONAL_SHOP_GROUPS.MYTHIC
              );
            }),
            itemFrameImagePaths: s.Ember.computed(
              "rotationalShopAssets",
              "frameDefinition",
              "itemSold",
              function () {
                const e = this.get("rotationalShopAssets"),
                  t = this.get("frameDefinition"),
                  n = (n, s = n) =>
                    `--item-frame-${s}: url(${e[`shop-frame-${t.w}by${t.h}-${n}`] || ""});`;
                return (
                  n(this.get("itemSold") ? "owned" : "default", "default") +
                  n("hover") +
                  n("pressed")
                );
              },
            ),
            costLabelImagePaths: s.Ember.computed(
              "rotationalShopAssets",
              "itemSold",
              function () {
                const e = this.get("rotationalShopAssets"),
                  t = (t, n = t) =>
                    `--cost-label-${n}: url(${e[`shop-frame-cost-label-${t}`] || ""});`;
                return (
                  t(this.get("itemSold") ? "owned" : "default", "default") +
                  t("hover") +
                  t("pressed")
                );
              },
            ),
            click() {
              if (this.get("clickable")) {
                const e = this.get("itemWithStoreId");
                this.sendAction("onItemSelected", e), i.SFX.buttonClick.play();
              }
              (0, l.trackClickRotationalShopEntry)(this.get("item")?.id);
            },
            mouseEnter() {
              this.get("clickable") && i.SFX.buttonGoldHover.play();
            },
          });
        t.default = r;
      },
      (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        var s = n(1),
          a = n(197),
          o = n(193),
          l = n(75),
          i = n(2);
        const { SFX_SUB_CHANNEL_UI_NAME: r } = i.AUDIO_CHANNELS,
          c = "rotational-shop-seasonal-redeem-sfx";
        var m = s.Ember.Component.extend({
          classNames: ["rcp-fe-lol-tft-rotational-shop-item-detail-small"],
          closeItemDetail: null,
          selectedItem: null,
          hideItemModal: null,
          rotationalShopService: s.Ember.inject.service("rotationalShop"),
          rotationalShopAssets: s.Ember.computed.alias(
            "rotationalShopService.rotationalShopAssets",
          ),
          item: s.Ember.computed.alias("selectedItem.item"),
          itemSold: s.Ember.computed("item.purchaseUnits", function () {
            return (0, a.isItemSold)(this.get("item.purchaseUnits"));
          }),
          itemDefaultDescription: s.Ember.computed("item", function () {
            const e = this.get("item")?.displayMetadata?.tft?.itemType;
            return e === o.ITEM_TYPES.CHIBI || e === o.ITEM_TYPES.LITTLE_LEGEND
              ? this.get(
                  "tra.rotational_shop_item_default_description_tactician",
                )
              : this.get(`tra.rotational_shop_item_default_description_${e}`);
          }),
          description: s.Ember.computed(
            "item",
            "itemDefaultDescription",
            function () {
              return (
                this.get("item")?.description ||
                this.get("itemDefaultDescription") ||
                ""
              );
            },
          ),
          detailImagePath: s.Ember.computed("item", function () {
            const e = this.get("item");
            return (
              (e &&
                e.displayMetadata &&
                e.displayMetadata.tft &&
                e.displayMetadata.tft.pc) ||
              ""
            );
          }),
          errorMessage: null,
          paymentDetails: s.Ember.computed("selectedItem", function () {
            const e = this.get("selectedItem");
            if (e && e.item) {
              const t = e.item.purchaseUnits;
              if (t) {
                const e = new Map();
                return (
                  t.forEach((t) => {
                    t.paymentOptions.forEach((t) => {
                      t.payments.forEach((t) => {
                        const n = t.currencyId;
                        e.has(n)
                          ? e.set(n, e.get(n) + t.finalDelta)
                          : e.set(n, t.finalDelta);
                      });
                    });
                  }),
                  Array.from(e, ([e, t]) => ({
                    currencyId: e,
                    currencyImagePath:
                      o.ROTATIONAL_SHOP_CURRENCY_IMAGE_PATHS.get(e),
                    cost: t,
                  }))
                );
              }
            }
            return [];
          }),
          rotationalShopWallet: s.Ember.computed.alias(
            "rotationalShopService.rotationalShopWallet",
          ),
          balanceQuantity: s.Ember.computed("paymentDetails", function () {
            const e = this.get("paymentDetails")[0];
            return (
              (this.get("rotationalShopWallet")[e?.currencyId] || 0) -
              (e?.cost || 0)
            );
          }),
          insufficientBalance: s.Ember.computed("balanceQuantity", function () {
            return this.get("balanceQuantity") < 0;
          }),
          newBalanceString: s.Ember.computed("balanceQuantity", function () {
            const e = this.get("tra");
            return e.formatString(
              "rotational_shop_item_detail_small_new_balance",
              {
                currency: e.formatString(
                  "rotational_shop_standard_currency_quantity",
                  { quantity: this.get("balanceQuantity") },
                ),
              },
            );
          }),
          _getEnclosingModal: () =>
            document
              .querySelector(".rotational-shop-item-detail-small-modal")
              ?.closest(".modal"),
          _playRedeemSFX() {
            const e = this.get("rotationalShopAssets");
            if (e) {
              const t = e[c];
              s.Audio.getChannel(r).createSound(t).play();
            }
          },
          didInsertElement() {
            this._getEnclosingModal()?.animate(
              [{ opacity: "0" }, { opacity: "1" }],
              { duration: 300 },
            );
          },
          didRender() {
            const e = document
                .querySelector(".rotational-shop-item-detail-small-modal")
                ?.closest(".dialog-frame"),
              t = e?.shadowRoot;
            if (t) {
              const e = document.createElement("style");
              (e.textContent =
                '\n      :host .lol-uikit-dialog-frame.top, :host .lol-uikit-dialog-frame.bottom {\n        border-image-source: linear-gradient(180deg, #AFE1F9 -171.29%, #BBA7F2 -35.19%, #8A81E9 100%);\n      }\n      :host .lol-uikit-dialog-frame.top .lol-uikit-dialog-frame-sub-border::before,\n      :host .lol-uikit-dialog-frame.bottom .lol-uikit-dialog-frame-sub-border::before {\n        top: -6px;\n        border-image-source: url("/fe/lol-tft/images/rotational-shop/rotashop-sub-border-secondary-horizontal.png");\n      }\n      :host .lol-uikit-dialog-frame.top .lol-uikit-dialog-frame-sub-border::after,\n      :host .lol-uikit-dialog-frame.bottom .lol-uikit-dialog-frame-sub-border::after {\n        bottom: -6px;\n        border-image-source: url("/fe/lol-tft/images/rotational-shop/rotashop-sub-border-primary-horizontal.png");\n      }\n      '),
                t.appendChild(e);
            }
          },
          redeemCompleted: !1,
          actions: {
            close() {
              l.SFX.buttonGenericClick.play(),
                this._getEnclosingModal()?.animate(
                  [{ opacity: "1" }, { opacity: "0" }],
                  { duration: 500 },
                ),
                s.Ember.run.later(() => {
                  this.sendAction("closeItemDetail");
                }, 100);
            },
            redeemComplete() {
              this._playRedeemSFX(),
                this.set(
                  "description",
                  this.get("tra").formatString(
                    "rotational_shop_item_detail_small_congratulations",
                    { itemName: this.get("item")?.name },
                  ),
                ),
                this.set("redeemCompleted", !0);
            },
            redeemFail() {
              this.set(
                "errorMessage",
                this.get("tra.tft_purchase_error_generic"),
              );
            },
          },
        });
        t.default = m;
      },
      (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        var s = n(1),
          a = n(197),
          o = n(193),
          l = n(75),
          i = n(2);
        const { SFX_SUB_CHANNEL_UI_NAME: r } = i.AUDIO_CHANNELS,
          c = "rotational-shop-item-detail-close-sfx";
        var m = s.Ember.Component.extend({
          classNames: ["rcp-fe-lol-tft-rotational-shop-item-detail"],
          tftService: s.Ember.inject.service("tft"),
          rotationalShopService: s.Ember.inject.service("rotationalShop"),
          rotationalShopAssets: s.Ember.computed.alias(
            "rotationalShopService.rotationalShopAssets",
          ),
          selectedItem: null,
          startCraftingCeremony: null,
          closeItemDetail: null,
          isPurchasing: !1,
          errorMessage: null,
          item: s.Ember.computed.alias("selectedItem.item"),
          itemSold: s.Ember.computed("item.purchaseUnits", function () {
            return (0, a.isItemSold)(this.get("item.purchaseUnits"));
          }),
          itemIsBoom: s.Ember.computed.equal(
            "item.displayMetadata.tft.itemType",
            o.ITEM_TYPES.BOOM,
          ),
          boomBackgroundImagePath: s.Ember.computed(
            "rotationalShopAssets",
            function () {
              const e = this.get("rotationalShopAssets");
              return (e && e["mythic-store-background"]) || "";
            },
          ),
          itemDefaultDescription: s.Ember.computed("item", function () {
            const e = this.get("item")?.displayMetadata?.tft?.itemType;
            return e === o.ITEM_TYPES.CHIBI || e === o.ITEM_TYPES.LITTLE_LEGEND
              ? this.get(
                  "tra.rotational_shop_item_default_description_tactician",
                )
              : this.get(`tra.rotational_shop_item_default_description_${e}`);
          }),
          description: s.Ember.computed(
            "item",
            "itemDefaultDescription",
            function () {
              return (
                this.get("item")?.description ||
                this.get("itemDefaultDescription") ||
                ""
              );
            },
          ),
          detailImagePath: s.Ember.computed("item", function () {
            const e = this.get("item");
            return `/lol-game-data/assets/${(e && e.displayMetadata && e.displayMetadata.tft && e.displayMetadata.tft.pc) || ""}`;
          }),
          _toggleSubNav(e) {
            const t = this.get("tftService");
            t &&
              (t.set("isSubNavEnabled", e), t.set("isHeaderButtonsEnabled", e));
          },
          _playCloseSFX() {
            const e = this.get("rotationalShopAssets");
            if (e) {
              const t = e[c];
              s.Audio.getChannel(r).createSound(t).play();
            }
          },
          init() {
            this._super(...arguments), this._toggleSubNav(!1);
          },
          didInsertElement() {
            this.get("itemIsBoom")
              ? this.element.style.setProperty(
                  "--image-path",
                  `url('${this.get("boomBackgroundImagePath")}')`,
                )
              : this.element.style.setProperty(
                  "--image-path",
                  `url('${this.get("detailImagePath")}')`,
                ),
              this.element.classList.add(
                this.get("item.displayMetadata.tft.itemType"),
              );
          },
          willDestroyElement() {
            this._super(...arguments), this._toggleSubNav(!0);
          },
          actions: {
            close() {
              this.get("isPurchasing") ||
                (l.SFX.buttonGenericClick.play(),
                this._playCloseSFX(),
                this.sendAction("closeItemDetail"),
                this.element.classList.add(
                  "rotational-shop-item-detail-fadeout",
                ),
                this._toggleSubNav(!0));
            },
            startCraftingCeremony() {
              this.sendAction("startCraftingCeremony");
            },
            redeemStart() {
              this.set("isPurchasing", !0);
            },
            redeemFail() {
              this.set("isPurchasing", !1),
                this.set(
                  "errorMessage",
                  this.get("tra.tft_purchase_error_generic"),
                );
            },
            playBackButtonHoverSFX() {
              l.SFX.buttonGoldHover.play();
            },
          },
        });
        t.default = m;
      },
      (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        var s = n(1),
          a = n(193),
          o = n(89),
          l = n(75);
        const i = {
          [a.TFT_ROTATIONAL_SHOP_GROUPS.MYTHIC]: {
            iconAssetKey: "subnav-icon-mythic",
            nameTraKey: "rotational_shop_subnav_name_mythic",
          },
          [a.TFT_ROTATIONAL_SHOP_GROUPS.SEASONAL]: {
            iconAssetKey: "subnav-icon-seasonal",
            nameTraKey: "rotational_shop_subnav_name_seasonal",
          },
        };
        var r = s.Ember.Component.extend({
          classNames: ["rcp-fe-lol-tft-rotational-shop-nav"],
          nav: null,
          activeNav: null,
          onNavSelected: null,
          rotationalShopService: s.Ember.inject.service("rotationalShop"),
          rotationalShopAssets: s.Ember.computed.alias(
            "rotationalShopService.rotationalShopAssets",
          ),
          isSelected: s.Ember.computed("nav", "activeNav", function () {
            const e = this.get("nav"),
              t = this.get("activeNav");
            return e && t === e;
          }),
          navIconImagePath: s.Ember.computed(
            "nav",
            "rotationalShopAssets",
            function () {
              return (
                this.get("rotationalShopAssets")[
                  i[this.get("nav")]?.iconAssetKey
                ] || ""
              );
            },
          ),
          navName: s.Ember.computed("nav", function () {
            return this.get("tra").get(i[this.get("nav")]?.nameTraKey) || "";
          }),
          showPip: s.Ember.computed(
            "nav",
            "rotationalShopService.rotationalShopSeenVersion",
            function () {
              const e = this.get("nav"),
                t = this.get("rotationalShopService.rotationalShopSeenVersion");
              return this.get("rotationalShopService").showRotationalShopPip(
                t,
                `rotational-shop-${e}`,
              );
            },
          ),
          willDestroyElement() {
            if (this.get("isSelected") && this.get("showPip")) {
              const e = this.get("nav");
              this.get("rotationalShopService").patchRotationalShopSeenVersion(
                `rotational-shop-${e}`,
              );
            }
            this._super(...arguments);
          },
          click() {
            const e = this.get("nav");
            this.sendAction("onNavSelected", e),
              (0, o.trackClickRotationalShopCategory)(e),
              l.SFX.buttonGenericClick.play();
          },
          mouseEnter() {
            l.SFX.buttonGoldHover.play();
          },
          actions: {
            setGlowMousePosition(e) {
              this.element.style = `--y:${e.offsetY}px;`;
            },
          },
        });
        t.default = r;
      },
      (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        var s = n(1),
          a = n(2);
        const { SFX_SUB_CHANNEL_UI_NAME: o } = a.AUDIO_CHANNELS,
          l = "crafting-ceremony-video",
          i = "crafting-ceremony-sfx",
          r = "crafting-ceremony-currency-lottie-json-path",
          c = "crafting-ceremony-currency-lottie-sound-path",
          m = "crafting-ceremony-mythic-lottie-json-path",
          u = "crafting-ceremony-mythic-sound-path";
        var d = s.Ember.Component.extend({
          classNames: ["rcp-fe-lol-tft-rotational-shop-crafting-ceremony"],
          item: null,
          closeAction: null,
          tftService: s.Ember.inject.service("tft"),
          rotationalShopAssets: s.Ember.computed.alias(
            "tftService.rotationalShopAssets",
          ),
          displayModal: !0,
          showCurrencyLottie: !0,
          showCraftingVideo: !1,
          playedCraftingVideo: !1,
          showMythicLottie: !1,
          currenyLottieParams: s.Ember.computed(
            "rotationalShopAssets",
            function () {
              const e = {},
                t = this.get("rotationalShopAssets");
              return (
                (e.src = t[r] || ""),
                (e.sfxSrc = t[c] || ""),
                (e.imagePath =
                  e.src.substr(0, e.src.lastIndexOf("/") + 1) + "images/"),
                (e.animationParams = { "param-single-multi-mythic-slider": 5 }),
                e
              );
            },
          ),
          mythicLottieParams: s.Ember.computed(
            "rotationalShopAssets",
            "item",
            function () {
              const e = {},
                t = this.get("rotationalShopAssets"),
                n = this.get("item");
              return (
                (e.src = t[m] || ""),
                (e.sfxSrc = t[u] || ""),
                (e.imagePath =
                  e.src.substr(0, e.src.lastIndexOf("/") + 1) + "images/"),
                (e.animationParams = { "param-reward-type-slider": 2 }),
                (e.animationReplacementImages = {
                  "asset-little-legend.png":
                    "/lol-game-data/assets/" + n.displayMetadata.tft.pc,
                }),
                (e.animationReplacementText = { rewardName: n.name }),
                e
              );
            },
          ),
          craftingCeremonyVideoPath: s.Ember.computed(
            "rotationalShopAssets",
            function () {
              const e = this.get("rotationalShopAssets");
              return e ? e[l] : "";
            },
          ),
          _playPortalSfx() {
            const e = this.get("rotationalShopAssets");
            if (e) {
              const t = e[i];
              s.Audio.getChannel(o).createSound(t).play();
            }
          },
          _portalVideoWaitTime: 3500,
          _playPortalVideo() {
            const e = document.getElementById(
              "rotational-shop-crafting-ceremony-video",
            );
            e &&
              (e.playWithEndedCallback(() => {
                this.set("showCraftingVideo", !1);
              }),
              s.Ember.run.later(
                this,
                () => {
                  this.set("showMythicLottie", !0);
                },
                this.get("_portalVideoWaitTime"),
              ));
          },
          didRender() {
            this.get("showCraftingVideo") &&
              !this.get("playedCraftingVideo") &&
              (this._playPortalSfx(),
              this._playPortalVideo(),
              this.set("playedCraftingVideo", !0));
          },
          actions: {
            onCurrencyLottieAnimationComplete() {
              this.set("showCurrencyLottie", !1),
                this.set("showCraftingVideo", !0);
            },
            closeCraftingCeremony() {
              this.set("displayModal", !1), this.sendAction("closeAction");
            },
          },
        });
        t.default = d;
      },
      (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        var s = n(1),
          a = n(193),
          o = n(89),
          l = n(197),
          i = s.Ember.Component.extend({
            classNames: ["rcp-fe-lol-tft-rotational-shop-redeem-button"],
            rotationalShopService: s.Ember.inject.service("rotationalShop"),
            trovesService: s.Ember.inject.service("tftTroves"),
            contentOwned: !1,
            selectedItem: null,
            showConfirmModal: !1,
            showButtonText: !0,
            showTooltip: !0,
            showInsufficientButtonText: !1,
            overrideButtonClick: null,
            startCraftingCeremony: null,
            redeemStartCallback: null,
            redeemFailCallback: null,
            redeemCompleteCallback: null,
            overrideButtonContent: null,
            overrideButtonText: null,
            isPurchasing: !1,
            showRedeemModal: !1,
            showInsufficientModal: !1,
            isPulling: s.Ember.computed.alias("trovesService.isPulling"),
            paymentDetails: s.Ember.computed("selectedItem", function () {
              const e = this.get("selectedItem");
              if (e && e.item) {
                const t = e.item.purchaseUnits;
                if (t) {
                  const e = new Map();
                  return (
                    t.forEach((t) => {
                      t.paymentOptions.forEach((t) => {
                        t.payments.forEach((t) => {
                          const n = t.currencyId;
                          e.has(n)
                            ? e.set(n, e.get(n) + t.finalDelta)
                            : e.set(n, t.finalDelta);
                        });
                      });
                    }),
                    Array.from(e, ([e, t]) => ({
                      currencyImagePath:
                        a.ROTATIONAL_SHOP_CURRENCY_IMAGE_PATHS.get(e),
                      cost: t,
                      currency: e,
                    }))
                  );
                }
              }
              return [];
            }),
            isInsufficient: s.Ember.computed(
              "paymentDetails",
              "rotationalShopService.rotationalShopWallet",
              function () {
                const e = this.get("paymentDetails"),
                  t = this.get("rotationalShopService.rotationalShopWallet"),
                  n = e.filter((e) => t[e.currency] && t[e.currency] >= e.cost);
                return !(n && Array.isArray(n) && n.length);
              },
            ),
            isInsufficientAfterPurchase: s.Ember.computed(
              "isInsufficient",
              "isPurchasing",
              function () {
                return this.get("isInsufficient") && !this.get("isPurchasing");
              },
            ),
            isDisabledForRedeem: s.Ember.computed(
              "contentOwned",
              "isPulling",
              "isPurchasing",
              "isInsufficient",
              function () {
                if (this.get("contentOwned")) return !0;
                if (this.get("isPulling")) return !0;
                if (this.get("isPurchasing")) return !0;
                return !!this.get("isInsufficient");
              },
            ),
            itemName: s.Ember.computed.alias("selectedItem.item.name"),
            redeemDialogTitleText: s.Ember.computed("itemName", function () {
              const e = this.get("itemName");
              return this.get("tra").formatString(
                "troves_redeem_dialog_title",
                { name: e },
              );
            }),
            redeemDialogContentText: s.Ember.computed(
              "itemName",
              "paymentDetails",
              function () {
                const e = this.get("itemName"),
                  t = this.get("paymentDetails");
                if (t && t.length) {
                  const n = t[0];
                  let s = "";
                  switch (n.currency) {
                    case a.TFT_ROTATIONAL_SHOP_CURRENCIES.tft_standard_coin:
                      s = "rotational_shop_standard_currency_quantity";
                      break;
                    case a.TFT_ROTATIONAL_SHOP_CURRENCIES
                      .tft_ultra_premium_coin:
                      s = "rotational_shop_premium_currency_quantity";
                  }
                  const o = this.get("tra"),
                    l = o.formatString(s, { quantity: n.cost });
                  return o.formatString("troves_redeem_dialog_content", {
                    currencyWithQuantity: l,
                    name: e,
                  });
                }
              },
            ),
            currencyNameText: s.Ember.computed("paymentDetails", function () {
              const e = this.get("paymentDetails");
              if (e && e.length) {
                let t = "";
                switch (e[0].currency) {
                  case a.TFT_ROTATIONAL_SHOP_CURRENCIES.tft_standard_coin:
                    t = "rotational_shop_standard_currency_name";
                    break;
                  case a.TFT_ROTATIONAL_SHOP_CURRENCIES.tft_ultra_premium_coin:
                    t = "rotational_shop_premium_currency_name";
                }
                return this.get("tra").get(t);
              }
              return "";
            }),
            insufficientDialogTitleText: s.Ember.computed(
              "currencyNameText",
              function () {
                const e = this.get("currencyNameText");
                return this.get("tra").formatString(
                  "troves_redeem_insufficient_dialog_title",
                  { currencyName: e },
                );
              },
            ),
            insufficientDialogContentText: s.Ember.computed(
              "currencyNameText",
              function () {
                const e = this.get("currencyNameText");
                return this.get("tra").formatString(
                  "troves_redeem_insufficient_dialog_content",
                  { currencyName: e },
                );
              },
            ),
            redeemDialogBackground: s.Ember.computed(
              "rotationalShopService.rotationalShopAssets",
              function () {
                return (
                  this.get("rotationalShopService.rotationalShopAssets")[
                    "troves-redeem-background"
                  ] || ""
                );
              },
            ),
            defaultButtonText: s.Ember.computed("contentOwned", function () {
              return this.get("contentOwned")
                ? this.get("tra.rotational_shop_content_owned")
                : this.get("tra.rotational_shop_content_redeem");
            }),
            insufficientButtonText: s.Ember.computed(
              "currencyNameText",
              function () {
                const e = this.get("currencyNameText");
                return this.get("tra").formatString(
                  "rotational_shop_content_insufficient_currency",
                  { currencyName: e },
                );
              },
            ),
            insufficientBalanceTooltipDescription: s.Ember.computed(
              "currencyNameText",
              function () {
                return this.get("tra").formatString(
                  "rotational_shop_content_insufficient_currency_tooltip_description",
                  { currencyName: this.get("currencyNameText") },
                );
              },
            ),
            didRender() {
              this._super(...arguments),
                (0, l.updateRotationalShopButton)(
                  this.element.querySelector("lol-uikit-flat-button"),
                ),
                (0, l.updateRotationalShopConfirmDialog)(
                  ".tft-rotational-shop-redeem-dialog-container",
                );
            },
            actions: {
              hideRedeemModal: function () {
                this.set("showRedeemModal", !1);
              },
              hideSufficientModal: function () {
                this.set("showInsufficientModal", !1);
              },
              clickAction: function () {
                this.get("showConfirmModal")
                  ? !this.get("contentOwned") && this.get("isInsufficient")
                    ? this.set("showInsufficientModal", !0)
                    : this.get("isDisabledForRedeem") ||
                      this.set("showRedeemModal", !0)
                  : this.get("isDisabledForRedeem") || this.send("onRedeem");
              },
              onRedeem: function () {
                const { item: e, storeId: t } = this.get("selectedItem");
                e &&
                  t &&
                  this.get("rotationalShopService").makePurchase(t, e.id, {
                    context: this,
                    onStart: () => {
                      this.set("isPurchasing", !0),
                        this.sendAction("redeemStartCallback");
                    },
                    onComplete: () => {
                      this.set("isPurchasing", !1),
                        this.sendAction("startCraftingCeremony"),
                        this.sendAction("redeemCompleteCallback"),
                        this.set("contentOwned", !0);
                      const t = this.get("paymentDetails");
                      "array" === s.Ember.typeOf(t) &&
                        t.length > 0 &&
                        (0, o.trackCurrencySpent)(
                          o.PHASE.ROTATIONAL_SHOP,
                          e?.id,
                          t[0].currency,
                          t[0].cost,
                        );
                    },
                    onError: (t) => {
                      s.logger.error(t),
                        (0, o.trackErrorRedeem)(
                          o.PHASE.ROTATIONAL_SHOP,
                          e?.id,
                          t.status,
                        ),
                        this.sendAction("redeemFailedCallback");
                    },
                  });
              },
            },
          });
        t.default = i;
      },
      (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        var s = n(1),
          a = n(193),
          o = n(89),
          l = s.Ember.Component.extend({
            classNames: ["rcp-fe-lol-tft-rotational-shop"],
            setActiveNav: null,
            rotationalShopService: s.Ember.inject.service("rotationalShop"),
            rotationalShopAssets: s.Ember.computed.alias(
              "rotationalShopService.rotationalShopAssets",
            ),
            navs: a.TFT_ROTATIONAL_SHOP_NAVS,
            items: s.Ember.computed.alias("rotationalShopService.items"),
            groupedStores: s.Ember.computed.alias(
              "rotationalShopService.groupedStores",
            ),
            _selectedNav: null,
            activeNav: s.Ember.computed("navs", "_selectedNav", function () {
              const e = this.get("_selectedNav"),
                t = this.get("navs");
              return e && t && t.includes(e)
                ? (this.sendAction("setActiveNav", e), e)
                : t && t.length
                  ? (this.set("_selectedNav", t[0]),
                    this.sendAction("setActiveNav", t[0]),
                    t[0])
                  : null;
            }),
            displayedGroups: s.Ember.computed(
              "activeNav",
              "groupedStores",
              function () {
                const e = this.get("activeNav"),
                  t = this.get("groupedStores");
                return e && t ? t.get(e) : null;
              },
            ),
            hasDisplayedGroups: s.Ember.computed.notEmpty("displayedGroups"),
            noDisplayedGroupsErrorMessage: s.Ember.computed(
              "_selectedNav",
              function () {
                return this.get("tra").formatString(
                  "rotational_shop_no_displayed_groups_message",
                  { store: this.get("_selectedNav") },
                );
              },
            ),
            groupedStoreIds: s.Ember.computed("groupedStores", function () {
              const e = this.get("groupedStores"),
                t = [];
              return (
                e &&
                  e.forEach(([e]) => {
                    e.forEach((e) => {
                      t.push(e.id || "");
                    });
                  }),
                t
              );
            }),
            showItemModal: !1,
            showCraftingCeremony: !1,
            selectedItem: null,
            isSeasonalTab: s.Ember.computed.equal(
              "activeNav",
              a.TFT_ROTATIONAL_SHOP_GROUPS.SEASONAL,
            ),
            useSmallItemDetail: s.Ember.computed.alias("isSeasonalTab"),
            _scrollTop: 0,
            getActiveNavScrollTop() {
              const e = this.get("rotationalShopService");
              if (e) {
                const t = e.get("navScrollTopMap"),
                  n = this.get("activeNav");
                if (t && n && t.has(n)) return t.get(n);
              }
              return 0;
            },
            setActiveNavScrollTop() {
              const e = this.get("rotationalShopService").get(
                  "navScrollTopMap",
                ),
                t = this.get("activeNav");
              e && t && e.set(t, this.get("_scrollTop"));
            },
            init() {
              this._super(...arguments);
              const e = this.get("rotationalShopService");
              e && this.set("_selectedNav", e.selectedNav),
                (0, o.trackOpenRotationalShop)(this.get("groupedStoreIds"));
            },
            didRender() {
              this._super(...arguments);
              const e = this.element.querySelector("lol-uikit-scrollable"),
                t = this.get("_scrollTop");
              !e ||
                (0 !== e.scrollTop && e.scrollTop === t) ||
                (e.scrollTop = this.getActiveNavScrollTop()),
                this.get(
                  "rotationalShopService",
                ).patchRotationalShopSeenVersion("rotational-shop-nav");
            },
            willDestroyElement() {
              this._super(...arguments);
              const e = this.get("rotationalShopService");
              e &&
                (e.set("selectedNav", this.get("_selectedNav")),
                this.setActiveNavScrollTop()),
                (0, o.trackCloseRotationalShop)();
            },
            actions: {
              onNavSelected(e) {
                const t = this.get("_selectedNav");
                this.get(
                  "rotationalShopService",
                ).patchRotationalShopSeenVersion(`rotational-shop-${t}`),
                  this.setActiveNavScrollTop(),
                  this.set("_selectedNav", e);
              },
              onItemSelected(e) {
                this.setActiveNavScrollTop(),
                  this.set("selectedItem", e),
                  this.set("showItemModal", !0);
              },
              hideItemModal: function () {
                s.Ember.run.later(() => {
                  this.set("showItemModal", !1), this.set("selectedItem", null);
                }, 300);
              },
              startCraftingCeremony: function () {
                this.set("showCraftingCeremony", !0);
              },
              endCraftingCeremony: function () {
                this.set("showItemModal", !1),
                  this.set("showCraftingCeremony", !1);
              },
              goToLegacyStore: function () {
                s.Router.navigateTo("rcp-fe-lol-store", { page: "companions" });
              },
              onScroll: function () {
                const e = this.element.querySelector("lol-uikit-scrollable");
                this.set("_scrollTop", e.scrollTop);
              },
            },
          });
        t.default = l;
      },
      (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        var s = n(1).Ember.Route;
        t.default = s;
      },
      (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        var s = n(1);
        n(3);
        var a = n(193),
          o = s.Ember.Controller.extend({
            tftService: s.Ember.inject.service("tft"),
            shopService: s.Ember.inject.service("rotationalShop"),
            _activeNav: null,
            defaultBackground: s.Ember.computed(
              "tftService.media",
              function () {
                return this.get("tftService.media.background--battlepass");
              },
            ),
            shopBackground: s.Ember.computed(
              "shopService.rotationalShopAssets",
              "defaultBackground",
              "_activeNav",
              function () {
                const e = this.get("shopService.rotationalShopAssets"),
                  t = this.get("_activeNav");
                if (e) {
                  const n = a.TFT_ROTATIONAL_SHOP_BACKGROUND_ASSET_KEYS.get(t);
                  if (n && e[n]) return e[n];
                }
                return this.get("defaultBackground");
              },
            ),
            actions: {
              setActiveNav(e) {
                this.set("_activeNav", e);
              },
            },
          });
        t.default = o;
      },
      (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        var s = n(1);
        n(3);
        var a = s.Ember.Controller.extend({
          routing: s.Ember.inject.service("-routing"),
          routeName: s.Ember.computed.alias("routing.currentRouteName"),
          tftService: s.Ember.inject.service("tft"),
          lastTFTSetSeen: s.Ember.computed.alias(
            "tftService.lastTftSetCoreNameSeen",
          ),
          currentDefaultTFTSet: s.Ember.computed.alias(
            "tftService.currentDefaultTFTSet",
          ),
          isHidden: s.Ember.computed.alias("tftService.isHidden"),
          mapData: s.Ember.computed.alias("tftService.mapData"),
          setAnnouncementSeen: s.Ember.computed.alias(
            "tftService.setAnnouncementSeenLocal",
          ),
          setAnnouncementData: s.Ember.computed.alias(
            "mapData.categorizedContentBundles.set_announcement_modal",
          ),
          setAnnouncementBackgroundImage: s.Ember.computed.alias(
            "mapData.assets.set-announcement-background",
          ),
          setAnnouncementSplash: s.Ember.computed.alias(
            "mapData.assets.set-announcement-right-panel-background",
          ),
          setAnnouncementIcon: s.Ember.computed(
            "mapData.assets.set-announcement-icon",
            "tftService.locale",
            function () {
              const e = this.get("mapData.assets.set-announcement-icon");
              return e ? this.get("tftService").getLocalizedAssetPath(e) : "";
            },
          ),
          shouldShowVolumeIcon: s.Ember.computed(
            "currentDefaultTFTSet",
            function () {
              return "TFTSet10" === this.get("currentDefaultTFTSet");
            },
          ),
          showSetAnnouncement: s.Ember.computed(
            "isHidden",
            "lastTFTSetSeen",
            "currentDefaultTFTSet",
            "setAnnouncementSeen",
            function () {
              if (this.get("isHidden")) return !1;
              if (!0 === this.get("setAnnouncementSeen")) return !1;
              const e = this.get("currentDefaultTFTSet");
              if (null === e || "TFTSet9_2" === e) return !1;
              const t = this.get("lastTFTSetSeen");
              return null !== t && t !== e;
            },
          ),
          actions: {
            confirm: function () {
              this.get("tftService").recordSetAnnouncementSeen();
            },
          },
        });
        t.default = a;
      },
      (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        var s = n(1);
        n(3);
        var a = s.Ember.Controller.extend({
          tftService: s.Ember.inject.service("tft"),
          hubBackground: s.Ember.computed.alias(
            "tftService.tftbackgrounds.background--battlepass",
          ),
          isBattlePassEnabled: s.Ember.computed.alias(
            "tftService.isBattlePassEnabled",
          ),
          battlePass: s.Ember.computed.alias("tftService.battlePassV2"),
          media: s.Ember.computed.alias("tftService.media"),
          backgrounds: s.Ember.computed.alias("tftService.tftbackgrounds"),
          isBattlePassXPBoosted: s.Ember.computed.alias(
            "tftService.isBattlePassXPBoosted",
          ),
          claimRewardsFunc: s.Ember.computed.alias("tftService.claimRewards"),
          claimAllRewardsFunc: s.Ember.computed.alias(
            "tftService.claimAllRewards",
          ),
          markMissionsAsViewedFunc: s.Ember.computed.alias(
            "tftService.markMissionsAsViewed",
          ),
          celebratePassCompletionFunc: s.Ember.computed.alias(
            "tftService.celebratePassCompletion",
          ),
          isHidden: s.Ember.computed.alias("tftService.isHidden"),
          lastTFTBPSeen: s.Ember.computed.alias("tftService.lastTFTBPSeen"),
          currentTFTBP: s.Ember.computed.alias("tftService.currentTFTBP"),
          bpAnnouncementSeenLocal: s.Ember.computed.alias(
            "tftService.bpAnnouncementSeenLocal",
          ),
          bpAnnouncementBackgroundImage: s.Ember.computed.alias(
            "tftService.tftbackgrounds.background--season-start-modal",
          ),
          bpAnnouncementData: s.Ember.computed.alias(
            "tftService.bpAnnouncementData",
          ),
          showBPAnnouncement: s.Ember.computed(
            "isHidden",
            "lastTFTBPSeen",
            "currentTFTBP",
            "bpAnnouncementSeenLocal",
            function () {
              if (this.get("isHidden")) return !1;
              if (this.get("bpAnnouncementSeenLocal")) return !1;
              const e = this.get("currentTFTBP");
              if (null === e) return !1;
              const t = this.get("lastTFTBPSeen");
              return (
                null !== t &&
                (s.Telemetry.invokeWithLowProbability(() => {
                  s.Telemetry.recordNonTimingTracingEvent(
                    "team-fight-tactics-battlepass-seen",
                    1,
                    "click",
                  );
                }),
                t !== e)
              );
            },
          ),
          actions: {
            confirm: function () {
              this.get("tftService").recordBPAnnouncementSeen();
            },
          },
        });
        t.default = a;
      },
      (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        var s = n(1);
        n(3);
        var a = s.Ember.Controller.extend({
          tftService: s.Ember.inject.service("tft"),
          hubBackground: s.Ember.computed(
            "tftService.tftbackgrounds",
            function () {
              return this.get(
                "tftService.tftbackgrounds.background--battlepass",
              );
            },
          ),
        });
        t.default = a;
      },
      (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        var s = n(1);
        n(3);
        var a = s.Ember.Controller.extend({
          tftService: s.Ember.inject.service("tft"),
          eogBackground: s.Ember.computed(
            "tftService.tftbackgrounds",
            function () {
              return this.get("tftService.tftbackgrounds.background--eog");
            },
          ),
          defaultBackground:
            "/fe/lol-static-assets/images/uikit/backdrop-magic/backdrop-magic.png",
        });
        t.default = a;
      },
      (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        var s = n(1);
        n(3);
        var a = s.Ember.Controller.extend({
          tftService: s.Ember.inject.service("tft"),
          hubBackground: s.Ember.computed("tftService.media", function () {
            return this.get("tftService.media.background--battlepass");
          }),
        });
        t.default = a;
      },
      (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        var s = n(1);
        n(3);
        const a = "troves-hub-background-image";
        var o = s.Ember.Controller.extend({
          queryParams: ["displayedBannerId"],
          displayedBannerId: "",
          tftService: s.Ember.inject.service("tft"),
          trovesService: s.Ember.inject.service("tftTroves"),
          trovesPromoAssets: s.Ember.computed.alias(
            "trovesService.trovesPromoAssets",
          ),
          activeBanners: s.Ember.computed.alias(
            "trovesService.troveActiveBanners",
          ),
          activeBannersById: s.Ember.computed("activeBanners", function () {
            const e = this.get("activeBanners"),
              t = new Map();
            for (const n of e) t.set(n.id, n);
            return t;
          }),
          displayedBanner: s.Ember.computed(
            "activeBannersById",
            "displayedBannerId",
            function () {
              let e = this.get("displayedBannerId");
              if (!e) {
                const t = this.get("activeBanners");
                t && t.length && (e = t[0].id);
              }
              const t = this.get("activeBannersById");
              return t && t.has(e) ? t.get(e) : null;
            },
          ),
          backgroundPath: s.Ember.computed(
            "trovesPromoAssets",
            "displayedBanner",
            function () {
              const e = this.get("displayedBanner");
              return e &&
                e.backgroundTexture &&
                e.backgroundTexture.endsWith(".png")
                ? this._computeBackgroundPath(
                    this.get("trovesPromoAssets"),
                    e.backgroundTexture,
                  )
                : this._computeBackgroundPath(
                    this.get("trovesPromoAssets"),
                    "",
                  );
            },
          ),
          _computeBackgroundPath(e, t) {
            return t && t.endsWith(".png")
              ? t
              : e && e[a]
                ? e[a]
                : this.get("tftService.tftbackgrounds.background--battlepass");
          },
          actions: {
            onBannerSelected(e) {
              this.set("displayedBannerId", e);
            },
          },
        });
        t.default = o;
      },
      (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        var s = n(1),
          a = n(2);
        n(3);
        var o = s.Ember.Controller.extend({
          queryParams: { url: { refreshModel: !0 } },
          url: "",
          displayEventPass: !1,
          tftService: s.Ember.inject.service("tft"),
          battlePass: s.Ember.computed.alias("tftService.tftPassEventPass"),
          hideEventPass: s.Ember.computed.not("displayEventPass"),
          claimRewardsFunc: s.Ember.computed.alias("tftService.claimRewards"),
          claimAllRewardsFunc: s.Ember.computed.alias(
            "tftService.claimAllRewards",
          ),
          celebratePassCompletionFunc: s.Ember.computed.alias(
            "tftService.celebratePassCompletion",
          ),
          media: s.Ember.computed.alias("battlePass.info.media"),
          eventHubAssets: s.Ember.computed.alias("tftService.eventHubAssets"),
          eventHubBackgroundImagePath: s.Ember.computed(
            "eventHubAssets",
            function () {
              const e = this.get("eventHubAssets");
              return e ? e["lny24-event-hub-background"] : "";
            },
          ),
          hubBackground: s.Ember.computed(
            "media",
            "displayEventPass",
            "eventHubBackgroundImagePath",
            function () {
              return this.get("displayEventPass")
                ? this.get("media.background--eventpass")
                : this.get("eventHubBackgroundImagePath");
            },
          ),
          telemetryEventPassTimeStart: null,
          telemetryEventPassTimeSpent: null,
          showEventPass() {
            this.set("displayEventPass", !0);
            const e = this.get("tftService");
            e &&
              (e.set("isSubNavEnabled", !1),
              e.set("isHeaderButtonsEnabled", !1)),
              this.set("telemetryEventPassOpenTimeStart", Date.now()),
              s.Telemetry.sendCustomData(
                a.DEFAULT_TELEMETRY_TABLE,
                a.TFT_TELEMETRY_EVENT.formatOpen(
                  a.TFT_TELEMETRY_EVENT.FROM.EVENT_PASS,
                ),
              );
          },
          actions: {
            toggleEventPass() {
              if (!this.get("tftService.tftPassEventPass")) return;
              this.toggleProperty("displayEventPass");
              const e = this.get("tftService");
              e &&
                (this.get("displayEventPass")
                  ? (e.set("isSubNavEnabled", !1),
                    e.set("isHeaderButtonsEnabled", !1))
                  : (e.set("isSubNavEnabled", !0),
                    e.set("isHeaderButtonsEnabled", !0))),
                this.get("displayEventPass")
                  ? (this.set("telemetryEventPassTimeStart", Date.now()),
                    s.Telemetry.sendCustomData(
                      a.DEFAULT_TELEMETRY_TABLE,
                      a.TFT_TELEMETRY_EVENT.formatOpen(
                        a.TFT_TELEMETRY_EVENT.FROM.EVENT_PASS,
                      ),
                    ))
                  : (s.Telemetry.sendCustomData(
                      a.DEFAULT_TELEMETRY_TABLE,
                      a.TFT_TELEMETRY_EVENT.formatClose(
                        a.TFT_TELEMETRY_EVENT.FROM.EVENT_PASS,
                      ),
                    ),
                    this.set(
                      "telemetryEventPassTimeSpent",
                      Date.now() - this.get("telemetryEventPassTimeStart"),
                    ),
                    s.Telemetry.sendCustomData(
                      a.DEFAULT_TELEMETRY_TABLE,
                      a.TFT_TELEMETRY_EVENT.formatTimeSpent(
                        a.TFT_TELEMETRY_EVENT.FROM.EVENT_PASS,
                        this.get("telemetryEventPassTimeSpent"),
                      ),
                    ));
            },
          },
        });
        t.default = o;
      },
      (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = t.DEFAULT_RANKED_STATS = void 0);
        var s,
          a = n(1),
          o = (s = n(219)) && s.__esModule ? s : { default: s },
          l = n(2),
          i = n(89);
        const r = n(220).default;
        t.DEFAULT_RANKED_STATS = {
          division: "NA",
          isProvisional: !1,
          leaguePoints: 0,
          provisionalGameThreshold: 10,
          provisionalGamesRemaining: 0,
          tier: "UNRANKED",
        };
        const c = "lastTftSetNameSeen",
          m = "lastTFTBPSeen",
          u = "tft_star_fragments",
          d = "lcu-assets-tft-home-store-promos",
          p = {
            GENERIC_ASSETS: "/lol-game-data/assets/v1/generic-assets.json",
            MAP_DATA: "/lol-maps/v2/maps",
            TFT_SETS_DATA_PATH: "/lol-game-data/assets/v1/tftsets.json",
            RP: "/lol-inventory/v1/wallet/RP",
            SETTINGS_READY: "/lol-settings/v2/ready",
            STAR_SHARDS: "/lol-inventory/v1/wallet/" + u,
            STAR_SHARDS_TOGGLES: "/lol-platform-config/v1/namespaces/Loadouts",
            TFT_BATTLE_PASS_PAGE: "/lol-tft/v1/tft/battlePassHub",
            TFT_EVENTS: "/lol-tft/v1/tft/events",
            TFT_HOME: "/lol-tft/v1/tft/homeHub",
            TFT_BACKGROUNDS: "/lol-tft/v1/tft/backgrounds",
            TFT_NEWS: "/lol-tft/v1/tft/newsHub",
            TFT_PASS_IS_ENABLED: "/lol-tft-pass/v1/enabled",
            TFT_PASS_WELCOME_DATA_PATH:
              "/lol-game-data/assets/v1/tftpasswelcomedata.json",
            TFT_PASS_BATTLE_PASS: "/lol-tft-pass/v1/battle-pass",
            TFT_PASS_EVENT_PASS: "/lol-tft-pass/v1/event-pass",
            TFT_PASS_DAILY_LOGIN_PASS: "/lol-tft-pass/v1/daily-login-pass",
            TFT_PLAYER_PREFERENCES:
              "/lol-settings/v2/account/LCUPreferences/lol-tft",
            TFT_PROMO_BUTTONS: "/lol-tft/v1/tft/promoButtons",
            TFT_TEST_PAGE: "/lol-tft/v1/tft/test-page",
            TFT_PASS_REWARD_GIVEN: "/lol-tft-pass/v1/reward-notification",
            TFT_EVENT_MISSIONS: "/lol-event-mission/v1/event-mission",
            TFT_EVENT_TENCENT_CONFIGS: "/lol-tft/v1/tft/tencentEventhubConfigs",
          },
          h = a.dataBinding.bindTo(a.socket);
        var f = a.Ember.Service.extend({
          isHidden: !1,
          audioManager: null,
          lastTftGameQueueId: null,
          lastTftSetCoreNameSeen: null,
          lastTFTBPSeen: null,
          setAnnouncementSeenLocal: null,
          bpAnnouncementSeenLocal: null,
          currentDefaultTFTSet: null,
          currentTFTBP: null,
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
          headerButtonsOverrideUrl: "",
          locale: null,
          newsEnabled: !1,
          newsUrl: "",
          starShardsEnabled: !1,
          formattedStarShardsAmountString: "0",
          rpAmount: 0,
          starShardsAmount: 0,
          eventsData: null,
          eventPromoTileAssets: null,
          eventHubAssets: null,
          eventHubTencentConfigs: null,
          missionOverrideSeries: "",
          eventSeriesId: a.Ember.computed("eventsData", function () {
            const e = this.get("eventsData");
            if (Array.isArray(e) && e.length > 0) return e[0]?.seriesId || null;
          }),
          battlePassOfferIds: null,
          backgrounds: null,
          isBattlePassEnabled: !1,
          battlePassV2: null,
          bpAnnouncementData: null,
          showBpNavPip: !0,
          isBattlePassXPBoosted: !1,
          tftPassEventPass: null,
          tftEventMissions: null,
          tftPassDailyLoginPass: null,
          isSubNavEnabled: !0,
          isHeaderButtonsEnabled: !0,
          tftbackgrounds: a.Ember.computed.alias("backgrounds.backgrounds"),
          media: a.Ember.computed.alias("battlePassV2.info.media"),
          _eventMissionsStatusMap: new Map(),
          _eventPassMilestoneStatusMap: new Map(),
          init() {
            this._super(...arguments), this._setLocale(), this._initObservers();
          },
          willDestroy() {
            this._super(...arguments),
              h.removeObserver(p.GENERIC_ASSETS, this),
              h.removeObserver(p.MAP_DATA, this),
              h.removeObserver(p.TFT_SETS_DATA_PATH, this),
              h.removeObserver(p.RP, this),
              h.removeObserver(p.SETTINGS_READY, this),
              h.removeObserver(p.STAR_SHARDS, this),
              h.removeObserver(p.STAR_SHARDS_TOGGLES, this),
              h.removeObserver(p.TFT_BATTLE_PASS_PAGE, this),
              h.removeObserver(p.TFT_HOME, this),
              h.removeObserver(p.TFT_BACKGROUNDS, this),
              h.removeObserver(p.TFT_NEWS, this),
              h.removeObserver(p.TFT_PASS_IS_ENABLED, this),
              h.removeObserver(p.TFT_PASS_BATTLE_PASS, this),
              h.removeObserver(p.TFT_PASS_WELCOME_DATA_PATH, this),
              h.removeObserver(p.TFT_PASS_EVENT_PASS, this),
              h.removeObserver(p.TFT_PASS_DAILY_LOGIN_PASS, this),
              h.removeObserver(p.TFT_PLAYER_PREFERENCES, this),
              h.removeObserver(p.TFT_TEST_PAGE, this),
              h.removeObserver(p.TFT_EVENT_MISSIONS, this);
          },
          _initObservers() {
            h.addObserver(p.STAR_SHARDS_TOGGLES, this, (e) => {
              e && this.set("starShardsEnabled", e.EnableStarShardsUpgradeFlow);
            }),
              h.addObserver(p.TFT_PLAYER_PREFERENCES, this, (e) => {
                e &&
                  e.data &&
                  (this.set("lastTftSetCoreNameSeen", e.data[c] || ""),
                  this.set("lastTFTBPSeen", e.data[m] || ""),
                  this.set("lastTftGameQueueId", e.data.lastTftGameQueueId),
                  this._checkSetAnnouncmentSeen(),
                  this._checkBPAnnouncementSeen());
              }),
              h.addObserver(p.TFT_BACKGROUNDS, this, (e) => {
                e && this.set("backgrounds", e);
              }),
              h.addObserver(p.TFT_HOME, this, (e) => {
                e &&
                  (this.set("battlePassOfferIds", e.battlePassOfferIds),
                  this.set(
                    "fallbackStorePromoOfferIds",
                    e.fallbackStorePromoOfferIds,
                  ),
                  this.set("homeOverrideUrl", e.overrideUrl),
                  this.set(
                    "headerButtonsOverrideUrl",
                    e.headerButtonsOverrideUrl,
                  ),
                  this.set("homePageEnabled", e.enabled),
                  this.set("primeGamingPromoOffer", e.primeGamingPromoOffer),
                  this.set("storePromoOfferIds", e.storePromoOfferIds),
                  this.set("tacticianPromoOfferIds", e.tacticianPromoOfferIds));
              }),
              h.addObserver(p.RP, this, (e) => {
                if (!e) return;
                const t = e.RP;
                isNaN(t) ? this.set("rpAmount", 0) : this.set("rpAmount", t);
              }),
              h.addObserver(p.TFT_EVENTS, this, (e) => {
                e &&
                  (this.set("eventsData", e.subNavTabs),
                  h.addObserver(p.TFT_EVENT_MISSIONS, this, (e) => {
                    if (e) {
                      this.set("tftEventMissions", e);
                      try {
                        ((e, t) => {
                          e.forEach((e) => {
                            e.missions.forEach((e) => {
                              if (t.has(e.id)) {
                                "COMPLETED" !== t.get(e.id) &&
                                  "COMPLETED" === e.status &&
                                  (t.set(e.id, e.status),
                                  (0, i.trackEventHubMissionChainComplete)(
                                    e.id,
                                    this.get("eventSeriesId"),
                                  ));
                              } else t.set(e.id, e.status);
                            });
                          });
                        })(e, this.get("_eventMissionsStatusMap"));
                      } catch (e) {
                        a.logger.error("event missions telemetry failed", e);
                      }
                    }
                  }));
              }),
              h.addObserver(
                p.TFT_PROMO_BUTTONS,
                this,
                this._handleUpdatePromoButtonsConfig,
              ),
              h.addObserver(p.TFT_TEST_PAGE, this, (e) => {
                e && this.set("testPageEnabled", e.enabled);
              }),
              h.addObserver(p.TFT_NEWS, this, (e) => {
                e &&
                  (this.set("newsEnabled", e.enabled),
                  this.set("newsUrl", e.url));
              }),
              h.addObserver(p.GENERIC_ASSETS, this, (e) => {
                e &&
                  (this.set("storePromoAssets", e[d]),
                  this.set(
                    "eventPromoTileAssets",
                    e["lcu-assets-tft-event-promo-tile"],
                  ),
                  this.set("eventHubAssets", e["lcu-assets-tft-event-hub"]),
                  this.set(
                    "rotationalShopAssets",
                    e["lcu-assets-tft-rotational-shop"],
                  ),
                  this.set(
                    "teamPlannerButtonAssets",
                    e["lcu-assets-tft-team-planner-button"],
                  ));
              }),
              h.addObserver(p.MAP_DATA, this, (e) => {
                if (e)
                  for (const t of e)
                    if (
                      22 === t.id &&
                      "TFT" === t.gameMode &&
                      "" === t.gameMutator
                    )
                      return void this.set("mapData", t);
              }),
              h.addObserver(p.TFT_SETS_DATA_PATH, this, (e) => {
                e &&
                  (this.set(
                    "currentDefaultTFTSet",
                    e.LCTFTModeData.mDefaultSet.SetCoreName,
                  ),
                  this._checkSetAnnouncmentSeen());
              }),
              h.addObserver(p.STAR_SHARDS, this, (e) => {
                if (!e) return;
                let t = e[u];
                this.set("starShardsAmount", t),
                  isNaN(t)
                    ? this.set("formattedStarShardsAmountString", "0")
                    : t < 1e5
                      ? this.set("formattedStarShardsAmountString", t)
                      : ((t = 1e3 * Math.floor(t / 1e3)),
                        this.set(
                          "formattedStarShardsAmountString",
                          this.get("tra").numeral(t).format("0a"),
                        ));
              }),
              h.addObserver(p.TFT_BATTLE_PASS_PAGE, this, (e) => {
                e && this.set("isBattlePassXPBoosted", e.battlePassXPBoosted);
              }),
              h.addObserver(p.TFT_PASS_IS_ENABLED, this, (e) => {
                this.set("isBattlePassEnabled", Boolean(e));
              }),
              h.addObserver(p.TFT_PASS_BATTLE_PASS, this, (e) => {
                e &&
                  (this.set("battlePassV2", e),
                  this.set("currentTFTBP", e.info.passId),
                  this._checkBPAnnouncementSeen(),
                  this._handlePassV2Change(e, "showBpNavPip"));
              }),
              h.addObserver(p.TFT_PASS_WELCOME_DATA_PATH, this, (e) => {
                e && this.set("bpAnnouncementData", e);
              }),
              h.addObserver(p.TFT_PASS_EVENT_PASS, this, (e) => {
                if (e) {
                  this.set("tftPassEventPass", e);
                  try {
                    ((e, t) => {
                      e.forEach((e) => {
                        if (t.has(e.milestoneId)) {
                          "CLAIMED" !== t.get(e.milestoneId) &&
                            "CLAIMED" === e.status &&
                            (t.set(e.milestoneId, e.status),
                            (0, i.trackEventPassClaim)(
                              e.milestoneId,
                              this.get("eventSeriesId"),
                            ));
                        } else t.set(e.milestoneId, e.status);
                      });
                    })(
                      e.milestones || [],
                      this.get("_eventPassMilestoneStatusMap"),
                    );
                  } catch (e) {
                    a.logger.error("event pass telemetry failed", e);
                  }
                }
              }),
              h.addObserver(p.TFT_PASS_DAILY_LOGIN_PASS, this, (e) => {
                e && this.set("tftPassDailyLoginPass", e);
              }),
              h.addObserver(p.TFT_EVENT_TENCENT_CONFIGS, this, (e) => {
                e &&
                  this.set("eventHubTencentConfigs", e.tencentEventhubConfigs);
              });
          },
          getStorePromoAssets: () =>
            a.db.get(p.GENERIC_ASSETS).then((e) => (e ? e[d] : null)),
          _handleUpdatePromoButtonsConfig(e) {
            e && this.set("promoButtonsData", e.promoButtons);
          },
          _checkSetAnnouncmentSeen() {
            const e = this.get("lastTftSetCoreNameSeen"),
              t = this.get("currentDefaultTFTSet");
            null !== e &&
              null !== t &&
              (e === t
                ? this.set("setAnnouncementSeenLocal", !0)
                : "" === e && this.set("setAnnouncementSeenLocal", !1));
          },
          recordSetAnnouncementSeen() {
            this.set("setAnnouncementSeenLocal", !0);
            const e = {};
            (e[c] = this.currentDefaultTFTSet),
              (0, a.dataBinding)("/lol-settings", a.socket).patch(
                "/v2/account/LCUPreferences/lol-tft",
                { data: e, schemaVersion: 1 },
              );
          },
          _checkBPAnnouncementSeen() {
            const e = this.get("lastTFTBPSeen"),
              t = this.get("currentTFTBP");
            "0640f3a4-b37e-4ee8-bb13-e37ef9d99496" === t
              ? this.set("bpAnnouncementSeenLocal", !0)
              : "" === e
                ? this.set("bpAnnouncementSeenLocal", !1)
                : null !== e &&
                  null !== t &&
                  e === t &&
                  this.set("bpAnnouncementSeenLocal", !0);
          },
          recordBPAnnouncementSeen() {
            this.set("bpAnnouncementSeenLocal", !0);
            const e = {};
            (e[m] = this.currentTFTBP),
              (0, a.dataBinding)("/lol-settings", a.socket).patch(
                "/v2/account/LCUPreferences/lol-tft",
                { data: e, schemaVersion: 1 },
              );
          },
          _setLocale() {
            (0, a.dataBinding)("/riotclient")
              .get("/region-locale")
              .then((e) => {
                this.set("locale", e.locale);
              });
          },
          getLocalizedAssetPath(e) {
            const t = this.get("locale");
            return t ? e.replace("/en_US/", `/${t}/`) : e;
          },
          claimRewards(e, t) {
            const { rewards: n, milestoneId: s, passId: l, title: i } = e;
            return (
              (n[0].description = i),
              (0, a.dataBinding)("/lol-tft-pass")
                .put(`/v1/pass/${l}/milestone/${s}/reward`)
                .then(() => {
                  o.default.celebrate({ rewards: n, backgroundImage: t });
                })
            );
          },
          optMissionSeries: (e) => a.db.put("/lol-missions/v2/player/opt", e),
          claimAllRewards: (e) =>
            (0, a.dataBinding)("/lol-tft-pass").put(
              `/v1/pass/${e}/milestone/claimAllRewards`,
            ),
          celebratePassCompletion(e) {
            o.default.celebratePassCompletion(e);
          },
          markMissionsAsViewed(e, t) {
            const n = { missionIds: e, serieIds: t };
            h.put("/lol-missions/v1/player", n).catch(() => null);
          },
          _handlePassV2Change(e, t) {
            const { milestones: n, bonuses: s } = e;
            if (
              !e ||
              !Array.isArray(n) ||
              !Array.isArray(s) ||
              0 === n.length ||
              0 === s.length
            )
              return;
            const a =
              n.some(
                ({ status: e, isLocked: t }) =>
                  !t && e === l.BP_V2_MILESTONE_CLAIMABLE,
              ) ||
              s.some(
                ({ status: e, isLocked: t }) =>
                  !t && e === l.BP_V2_MILESTONE_CLAIMABLE,
              );
            this.set(t, a);
          },
          dismissNotification(e) {
            if (e === l.TFT_BATTLE_PASS_ROUTE) this.set("showBpNavPip", !1);
          },
          setMissionOverrideSeries(e) {
            this.set("missionOverrideSeries", e),
              a.navigation.setTrackerState("tftViewSeries", e);
          },
          clearMissionOverrideSeries() {
            a.navigation.setTrackerState("tftViewSeries", "");
          },
          getTftAudioManager() {
            return (
              this.audioManager || (this.audioManager = r()), this.audioManager
            );
          },
          onHide() {
            this.audioManager && this.audioManager.stopAll(),
              this.clearMissionOverrideSeries(),
              this.set("isHidden", !0);
          },
          onShow() {
            a.navigation.setTrackerState(
              "tftViewSeries",
              this.get("missionOverrideSeries"),
            ),
              this.set("isHidden", !1);
          },
          activeMilestonesProgress: a.Ember.computed(
            "battlePassV2.totalPointsEarned",
            "battlePassV2.milestones.@each.{isPaid,isLocked,pointsEarnedForMilestone,milestoneId,status,status}",
            "battlePassV2.bonuses.@each.{isPaid,isLocked,pointsEarnedForMilestone,milestoneId,status,status}",
            function () {
              const e = this.get("battlePassV2.milestones"),
                t = a.lodash.findIndex(e, ["status", l.BP_V2_MILESTONE_ACTIVE]);
              if (t < 0) return null;
              const n = a.Ember.A([e[t]]);
              return t > 0 && n.unshift(e[t - 1]), n;
            },
          ),
          setEventsData(e, t) {
            this.eventsData.length > 0 &&
              (a.Ember.set(this.eventsData[0], e, t),
              this.notifyPropertyChange("eventsData"));
          },
          setPromoButtonsData(e, t) {
            this.promoButtonsData.length > 0 &&
              (a.Ember.set(this.promoButtonsData[0], e, t),
              this.notifyPropertyChange("promoButtonsData"));
          },
        });
        t.default = f;
      },
      (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        var s = n(1),
          a = n(2);
        const o = s.UIKit.getVignetteCelebrationManager();
        function l(e) {
          return s.componentFactory.create({
            type: a.REWARD_CELEBRATION_NAME,
            data: e,
          });
        }
        function i(e, t, n = !1) {
          const a = { id: e, rewards: t, selectable: n };
          return s.Ember.Object.create(a);
        }
        function r(e) {
          return new Set(e.map((e) => e.rewardGroup)).size > 1;
        }
        function c(e, t) {
          const n = { rewardGroups: [e.find((e) => e.isSelected).rewardGroup] };
          return (0, s.dataBinding)("/lol-missions").put("/v1/player/" + t, n);
        }
        var m = {
          celebrate: function ({
            id: e,
            titleSubtext: t,
            rewards: n,
            missionId: a,
            backgroundImage: m,
          }) {
            const u = r(n),
              d = u
                ? "celebration_button_text_multi"
                : "celebration_button_text",
              p = l(i(e, (n = n.map((e) => s.Ember.Object.create(e))), u));
            o.add({
              id: e,
              data: {
                header: {
                  title: s.traService.get("celebration_title"),
                  titleSubtext: t,
                },
                nextButtonEnabled: !u,
                nextButtonText: s.traService.get(d),
                backgroundImageUrl: m,
              },
              height: "SMALL",
              content: p,
              onRemove: () => {
                u && c(n, a), p.onRemove && p.onRemove();
              },
            });
          },
          celebratePassReward: function ({ rewards: e, backgroundImage: t }) {
            const n = (function (e) {
                const t = { rewards: e };
                return s.Ember.Object.create(t);
              })((e = e.map((e) => s.Ember.Object.create(e)))),
              l =
                ((i = n),
                s.componentFactory.create({
                  type: a.REWARD_CELEBRATION_V2_NAME,
                  data: i,
                }));
            var i;
            o.add({
              id: "tft_pass_reward_celebration",
              data: {
                header: { title: s.traService.get("celebration_title") },
                nextButtonText: s.traService.get(
                  "celebration_button_text_continue",
                ),
                backgroundImageUrl: t,
              },
              height: "LARGE",
              content: l,
              onRemove: () => {
                l.onRemove && l.onRemove();
              },
            });
          },
          celebratePassCompletion: function (e) {
            o.add({
              id: "tft_battlepass_completed",
              height: "MEDIUM",
              data: {
                header: {
                  title: s.traService.get("celebration_pass_completion_title"),
                  titleSubtext: s.traService.get(
                    "celebration_pass_completion_title_subtext",
                  ),
                },
                backgroundImageUrl: e,
                nextButtonText: s.traService.get(
                  "celebration_pass_completion_button",
                ),
              },
            });
          },
          isSelectable: r,
          updateRewardSelection: c,
          createCelebrationState: i,
          createCelebrationApplication: l,
        };
        t.default = m;
      },
      (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.AudioManager = void 0),
          (t.default = function () {
            l || (l = new o());
            return l;
          });
        var s = n(1);
        function a(e) {
          if (e && e.crossfadeTime)
            return { crossfade: !0, fadeTime: e.crossfadeTime };
        }
        class o {
          constructor() {
            (this.playbackEnabled = !0),
              (this.uiAudioChannel = s.Audio.getChannel("sfx-ui")),
              (this.ambienceAudioChannel =
                s.Audio.getChannel("sfx-ambience-perks")),
              (this.primaryIntroSound = null),
              (this.primaryAmbienceSound = null),
              (this.secondaryIntroSound = null),
              (this.secondaryAmbienceSound = null),
              (this.uiSounds = new Map());
          }
          getUiSound(e, t) {
            let n = this.uiSounds.get(e);
            return (
              n ||
                ((n = this.uiAudioChannel.createSound(e, t)),
                this.uiSounds.set(e, n),
                n ||
                  s.logger.warning(
                    "Home Audio: failure to create ui sound",
                    e,
                  )),
              n
            );
          }
          getAmbienceSound(e, t) {
            const n = Object.assign(
                { isLoop: !0, crossfade: !0, fadeTime: 500 },
                t,
              ),
              a = this.ambienceAudioChannel.createSound(e, n);
            return (
              a ||
                s.logger.warning(
                  "Home Audio: failure to create ambience sound",
                  e,
                ),
              a
            );
          }
          playUiSound(e, t) {
            const n = a(t);
            this.getUiSound(e, n).play();
          }
          playMusicAmbience(e, t) {
            const n = a(t) || {};
            (n.isLoop = !0),
              (this.musicAmbience = s.Audio.getChannel(
                "music-ambience",
              ).createSound(e, n)),
              this.musicAmbience.play();
          }
          _playAmbienceSound(e, t, n) {
            const s = a(t),
              o = this.getAmbienceSound(e, s);
            return (
              n && n.isPlaying() && n.fadeOut({ fadeTime: o.options.fadeTime }),
              o.play(),
              o
            );
          }
          _playAmbienceSounds(e, t, n, s, o, l) {
            if (!this.playbackEnabled)
              return { activeAmbienceSound: o, introSound: l };
            if (t) {
              const e = a(s);
              (l = this.getUiSound(t, e)).play();
            } else l = null;
            return {
              newAmbienceSound: this._playAmbienceSound(e, n, o),
              introSound: l,
            };
          }
          playPrimaryAmbienceSounds(e, t, n, s) {
            const { newAmbienceSound: a, introSound: o } =
              this._playAmbienceSounds(
                e,
                t,
                n,
                s,
                this.primaryAmbienceSound,
                this.primaryIntroSound,
              );
            (this.primaryAmbienceSound = a), (this.primaryIntroSound = o);
          }
          playSecondaryAmbienceSounds(e, t, n, s) {
            const { newAmbienceSound: a, introSound: o } =
              this._playAmbienceSounds(
                e,
                t,
                n,
                s,
                this.secondaryAmbienceSound,
                this.secondaryIntroSound,
              );
            (this.secondaryAmbienceSound = a), (this.secondaryIntroSound = o);
          }
          stopMusicAmbience(e) {
            this.musicAmbience &&
              this.musicAmbience.isPlaying() &&
              (e && e.crossfadeTime
                ? this.musicAmbience.fadeOut({ fadeTime: e.crossfadeTime })
                : this.musicAmbience.stop());
          }
          stopPrimaryAmbienceSounds(e) {
            const t = a(e);
            this.primaryIntroSound &&
              this.primaryIntroSound.isPlaying() &&
              (t
                ? this.primaryIntroSound.fadeOut(t)
                : this.primaryIntroSound.stop()),
              this.primaryAmbienceSound &&
                this.primaryAmbienceSound.isPlaying() &&
                (t
                  ? this.primaryAmbienceSound.fadeOut(t)
                  : this.primaryAmbienceSound.stop());
          }
          stopSecondaryAmbienceSounds(e) {
            const t = a(e);
            this.secondaryIntroSound &&
              this.secondaryIntroSound.isPlaying() &&
              (t
                ? this.secondaryIntroSound.fadeOut(t)
                : this.secondaryIntroSound.stop()),
              this.secondaryAmbienceSound &&
                this.secondaryAmbienceSound.isPlaying() &&
                (t
                  ? this.secondaryAmbienceSound.fadeOut(t)
                  : this.secondaryAmbienceSound.stop());
          }
          stopAllAmbienceSounds(e) {
            this.stopMusicAmbience(e),
              this.stopPrimaryAmbienceSounds(e),
              this.stopSecondaryAmbienceSounds(e);
          }
          stopAll(e) {
            this.stopAllAmbienceSounds(e);
          }
          disableHomeAudio(e) {
            (this.playbackEnabled = !1), this.stopAll(e);
          }
          enableHomeAudio() {
            this.playbackEnabled = !0;
          }
        }
        let l;
        t.AudioManager = o;
      },
      (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        var s = n(1),
          a = n(2);
        const o = "/lol-lobby/v2/eligibility/initial-configuration-complete",
          l = "/lol-lobby/v2/eligibility/self",
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
            this._super(...arguments),
              (this._patcherButtonEnabledSubscriber =
                this._patcherButtonEnabledSubscriber.bind(this)),
              this._initObservers();
          },
          willDestroy() {
            this._super(...arguments),
              m.removeObserver(o, this),
              m.removeObserver(i, this),
              m.removeObserver(r, this),
              m.removeObserver(c, this),
              s.navigation.isButtonEnabledUnsubscribe(
                this._patcherButtonEnabledSubscriber,
              );
          },
          _patcherButtonEnabledSubscriber(e) {
            this.isDestroying ||
              this.isDestroyed ||
              this.set("patcherButtonEnabled", e);
          },
          _initObservers() {
            s.navigation.isButtonEnabledSubscribe(
              this._patcherButtonEnabledSubscriber,
            ),
              m.addObserver(o, this, (e) => {
                e && (this._getQueueEligibility(), m.removeObserver(o, this));
              }),
              m.addObserver(i, this, (e) => {
                this.set("inLobby", !!e);
              }),
              m.addObserver(i, this, (e) => {
                e && this.set("isLobbyLeader", e.localMember.isLeader);
              }),
              m.addObserver(r, this, (e) => {
                this.set("inTournament", !!e);
              }),
              m.addObserver(c, this, (e) => {
                this.set("queues", e);
              });
          },
          _getQueueEligibility() {
            m.post(l).then((e) => {
              if (!e) return;
              const t = e.find((e) => e.queueId === a.TFT_NORMAL_QUEUE_ID);
              this.set("tftEligible", !!t && t.eligible);
            });
          },
        });
        t.default = u;
      },
      (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        var s = n(1),
          a = n(2);
        const o = "/lol-platform-config/v1/namespaces/PublishingContent",
          l = "/lol-publishing-content/v1/ready",
          i = "/lol-publishing-content/v1/tft-hub-cards",
          r = s.dataBinding.bindTo(s.socket);
        var c = s.Ember.Service.extend({
          tftCardsReadyToShow: !1,
          fetchFailed: !1,
          willRetry: !1,
          pcsChannelData: null,
          init() {
            this._super(...arguments), this._initObservers();
          },
          willDestroy() {
            this._super(...arguments), r.unobserve(o, this);
          },
          _initObservers() {
            r.observe(o, this, (e) => {
              e && e.Enabled
                ? this.renderPcsData()
                : (s.Telemetry.sendCustomData(a.PCS_TELEMETRY_TABLE, {
                    pcsEvent: "pcs_foundation_disabled",
                  }),
                  this.renderErrorState());
            });
          },
          getPcsChannelData() {
            r.observe(l, this, (e) => {
              e &&
                (r.unobserve(l, this),
                r.get(i).then((e) => {
                  if (!e)
                    return (
                      s.Telemetry.sendCustomData(a.PCS_TELEMETRY_TABLE, {
                        pcsEvent: "pcs_foundation_failure",
                      }),
                      void this.renderErrorState()
                    );
                  this.set("pcsChannelData", e), this.renderPcsData();
                }));
            });
          },
          renderPcsData() {
            this.get("pcsChannelData")
              ? (this.set("fetchFailed", !1),
                this.set("tftCardsReadyToShow", !0))
              : this.getPcsChannelData();
          },
          setupRetry() {
            this.get("willRetry") ||
              s.navigation.on("navigate", () => {
                this.get("fetchFailed") &&
                  (this.getPcsChannelData(), this.set("willRetry", !0));
              });
          },
          renderErrorState() {
            this.set("fetchFailed", !0), this.setupRetry();
          },
        });
        t.default = c;
      },
      (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        var s = n(1);
        const a = "/lol-store/v1/catalog",
          o = "/riotclient/region-locale",
          l = s.dataBinding.bindTo(s.socket);
        var i = s.Ember.Service.extend({
          regionLocale: null,
          storeCatalog: null,
          init() {
            this._super(...arguments), this._initObservers();
          },
          willDestroy() {
            this._super(...arguments),
              l.removeObserver(a, this),
              l.removeObserver(o, this);
          },
          getStoreCatalog: () => s.db.get(a),
          getRegionLocale: () => s.db.get(o),
          _initObservers() {
            s.db.get(a, (e) => {
              this.set("storeCatalog", e);
            }),
              l.addObserver(o, this, (e) => {
                e && this.set("regionLocale", e.locale);
              });
          },
        });
        t.default = i;
      },
      (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        var s = n(1),
          a = n(78),
          o = n(89),
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
            milestones: null,
            milestonesTriggered: [],
            init() {
              this._super(...arguments), this._initObservers();
            },
            willDestroy() {
              this._super(...arguments),
                s.db.removeObserver(a.PATHS.GENERIC_ASSETS, this),
                s.db.removeObserver(a.PATHS.TROVES_CONFIG, this),
                s.db.removeObserver(a.PATHS.TROVES_TOKENS, this),
                s.db.removeObserver(a.PATHS.TROVES_BANNERS, this),
                s.db.removeObserver(a.PATHS.STATUS_NOTIFICATIONS, this),
                s.db.removeObserver(a.PATHS.ROLL_REWARDS, this),
                s.db.removeObserver(
                  a.MILESTONE_ENDPOINTS.TROVES_MILESTONES,
                  this,
                ),
                s.db.removeObserver(
                  a.MILESTONE_ENDPOINTS.TROVES_MILESTONE_NOTIFICATIONS,
                  this,
                );
            },
            _handleNewCeremonyData(e) {
              if (e) {
                if (this.get("trovesV2Enabled") && e) {
                  let t = !0;
                  e.rewards?.standard?.forEach((n) => {
                    a.TYPE_CURRENCIES.includes(n.itemId)
                      ? (0, o.trackCurrencyGained)(
                          "roll_reward",
                          n.itemId,
                          n.quantity,
                          t,
                        )
                      : (0, o.trackRollRewardTroves)(e.orderId, n.itemId, t),
                      (t = !1);
                  });
                }
                this.set("ceremonyData", e),
                  this.set("isWaitingForCeremonyData", !1);
              } else this.set("ceremonyData", null);
            },
            _initObservers() {
              s.db.addObserver(a.PATHS.TROVES_CONFIG, this, (e) => {
                if (e) {
                  if (
                    (this.set("trovesEnabled", Boolean(e.enabled)),
                    this.set("trovesV2Enabled", Boolean(e.v2Enabled)),
                    this.set("trovesTokensItemId", e.tokensItemId),
                    this.set("trovesTokensOfferId", e.tokensOfferId),
                    this.get("trovesEnabled"))
                  ) {
                    s.db.addObserver(a.PATHS.TROVES_BANNERS, this, (e) => {
                      this.set("isLoading", Boolean(!1)),
                        e &&
                          (this.set("hasBannerError", Boolean(!1)),
                          this.set("troveActiveBanners", e));
                    }),
                      s.db.addObserver(a.PATHS.TROVES_TOKENS, this, (e) => {
                        if (!e) return;
                        let t = e[a.TFT_TROVES_TOKENS_WALLETS_KEY];
                        if (isNaN(t))
                          return (
                            this.set("trovesTokensAmount", 0),
                            void this.set(
                              "formattedTrovesTokensAmountString",
                              "0",
                            )
                          );
                        this.set("trovesTokensAmount", t),
                          t < 1e5
                            ? this.set("formattedTrovesTokensAmountString", t)
                            : ((t = 1e3 * Math.floor(t / 1e3)),
                              this.set(
                                "formattedTrovesTokensAmountString",
                                this.get("tra").numeral(t).format("0a"),
                              ));
                      }),
                      s.db.addObserver(a.PATHS.MYTHIC_TOKENS, this, (e) => {
                        if (!e) return;
                        const t = e[a.TFT_MYTHIC_TOKENS_WALLETS_KEY];
                        isNaN(t)
                          ? this.set("mythicTokensAmount", 0)
                          : this.set("mythicTokensAmount", t);
                      }),
                      s.db.addObserver(a.PATHS.GENERIC_ASSETS, this, (e) => {
                        e &&
                          this.set(
                            "trovesPromoAssets",
                            e[a.TFT_TROVES_GDS_PROMO_ASSETS_KEY],
                          );
                      });
                    const e = this.get("trovesTokensItemId");
                    s.db.addObserver(
                      `${a.PATHS.CATALOG}?inventoryType=CURRENCY&itemId=${e}`,
                      this,
                      this._handleTrovesTokenOffer.bind(this),
                    ),
                      s.db.addObserver(
                        a.PATHS.STATUS_NOTIFICATIONS,
                        this,
                        (e) => {
                          if (
                            (this.get("isPulling") && this.set("isPulling", !1),
                            !e)
                          )
                            return;
                          if (e.hasPullError)
                            return (
                              this.set("pullErrorModalShowing", !0),
                              this.set("isWaitingForCeremonyData", !1),
                              void (
                                this.get("trovesV2Enabled") &&
                                (0, o.trackErrorRedeem)(
                                  o.PHASE.TROVES_HOME,
                                  e.dropTableId,
                                  500,
                                )
                              )
                            );
                          const t = this.get("troveActiveBanners"),
                            n = t.findIndex((t) => t.id === e.dropTableId);
                          n > -1 && s.Ember.set(t[n], "status", e);
                        },
                      );
                  }
                  this.get("trovesV2Enabled") &&
                    (s.db.addObserver(
                      a.MILESTONE_ENDPOINTS.TROVES_MILESTONES,
                      this,
                      (e) => {
                        this.set("milestones", e);
                      },
                    ),
                    s.db.addObserver(
                      a.MILESTONE_ENDPOINTS.TROVES_MILESTONE_NOTIFICATIONS,
                      this,
                      (e) => {
                        e &&
                          (this.get("milestonesTriggered").push(e),
                          (0, o.trackMilestoneRewardsTroves)(e.milestoneId),
                          (0, o.trackCurrencyGained)(
                            "milestone_rewards",
                            e.currencyId,
                            e.currencyAmount,
                          ));
                      },
                    ));
                }
              }),
                (this._handleNewCeremonyData =
                  this._handleNewCeremonyData.bind(this)),
                s.db.addObserver(
                  a.PATHS.ROLL_REWARDS,
                  this,
                  this._handleNewCeremonyData,
                );
            },
            _handleTrovesTokenOffer(e) {
              if (e && e && e.item) {
                const t = e.item,
                  n = t.prices && t.prices.filter((e) => "RP" === e.currency);
                let s = n && n[0].cost;
                s || (s = 0);
                let a = -1,
                  o = !1,
                  l = 1;
                t.metadata &&
                  t.metadata.forEach((e) => {
                    switch (e.type) {
                      case "PURCHASE_RATE_LIMIT":
                        a = parseInt(e.value);
                        break;
                      case "INCREMENTAL_PURCHASE":
                        o = "true" === e.value.toLowerCase();
                        break;
                      case "QUANTITY":
                        l = parseInt(e.value);
                    }
                  });
                const i = {
                  id: this.get("trovesTokensOfferId"),
                  name: t.name,
                  description: t.description,
                  iconUrl: t.imagePath,
                  price: s,
                  minQuantity: 1,
                  maxQuantity: a,
                  incrementalPurchase: o,
                  quantity: l,
                };
                this.set("trovesTokensOffer", i);
              }
            },
            clearCeremonyData() {
              s.db.delete(a.PATHS.ROLL_REWARDS);
            },
            updatePulling(e) {
              this.set("isPulling", e);
            },
            updatePullErrorModal(e) {
              this.set("pullErrorModalShowing", e);
            },
            spendCoins(e, t, n) {
              const o = { offerId: e, numberOfRolls: t, dropTableId: n };
              this.set("isWaitingForCeremonyData", !0),
                s.db.post(a.PATHS.ROLL, o).catch(() => {
                  this.set("isWaitingForCeremonyData", !1),
                    this.updatePulling(!1),
                    this.updatePullErrorModal(!0);
                });
            },
          });
        t.default = l;
      },
      (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = t.SUMMONER_PATH = void 0);
        var s = n(1);
        const a = "/lol-summoner/v1/current-summoner";
        t.SUMMONER_PATH = a;
        var o = s.Ember.Service.extend({
          currentSummoner: null,
          init() {
            this._super(...arguments),
              (this.handleSummonerChanged =
                this.handleSummonerChanged.bind(this)),
              this.initDataBindings();
          },
          initDataBindings() {
            s.db.observe(a, this, this.handleSummonerChanged);
          },
          handleSummonerChanged(e) {
            e && this.set("currentSummoner", e);
          },
          willDestroy() {
            this._super(...arguments), s.db.unobserve(a, this);
          },
        });
        t.default = o;
      },
      (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        var s = n(1),
          a = n(193),
          o = n(2),
          l = s.Ember.Service.extend({
            rotationalShopEnabled: !1,
            rotationalShopAssets: null,
            rotationalShopWallet: {},
            rotationalShopSeenVersion: {},
            _stores: null,
            groupedStores: s.Ember.computed("_stores", function () {
              const e = this.get("_stores"),
                t = new Map();
              if (e) {
                const n = new Map([
                  [
                    a.TFT_ROTATIONAL_SHOP_GROUPS.MYTHIC,
                    this._addMythicStoreToGroup,
                  ],
                  [
                    a.TFT_ROTATIONAL_SHOP_GROUPS.SEASONAL,
                    this._addSeasonalStoreToGroup,
                  ],
                ]);
                e.forEach((e) => {
                  this._setItemsEndTime(e);
                  const s =
                    e.displayMetadata &&
                    e.displayMetadata.tft &&
                    e.displayMetadata.tft.store;
                  n.has(s) && n.get(s).call(this, e, t);
                });
              }
              return t;
            }),
            selectedNav: "",
            navScrollTopMap: new Map(),
            formatCurrencyAmount(e) {
              return isNaN(e)
                ? "0"
                : e < 1e5
                  ? `${e}`
                  : ((e = 1e3 * Math.floor(e / 1e3)),
                    this.get("tra").numeral(e).format("0a"));
            },
            formattedSCAmountString: s.Ember.computed(
              "rotationalShopWallet",
              function () {
                const e = this.get("rotationalShopWallet");
                return e &&
                  e.hasOwnProperty(
                    a.TFT_ROTATIONAL_SHOP_CURRENCIES.tft_standard_coin,
                  )
                  ? this.formatCurrencyAmount(
                      e[a.TFT_ROTATIONAL_SHOP_CURRENCIES.tft_standard_coin],
                    )
                  : "0";
              },
            ),
            formattedUPCAmountString: s.Ember.computed(
              "rotationalShopWallet",
              function () {
                const e = this.get("rotationalShopWallet");
                return e &&
                  e.hasOwnProperty(
                    a.TFT_ROTATIONAL_SHOP_CURRENCIES.tft_ultra_premium_coin,
                  )
                  ? this.formatCurrencyAmount(
                      e[
                        a.TFT_ROTATIONAL_SHOP_CURRENCIES.tft_ultra_premium_coin
                      ],
                    )
                  : "0";
              },
            ),
            makePurchase: function (
              e,
              t,
              n = {
                context: null,
                onStart: null,
                onComplete: null,
                onError: null,
              },
            ) {
              const { context: o, onStart: l, onError: i } = n;
              return (
                l && l.apply(o),
                s.db
                  .post(a.SERVICE_ENDPOINTS.SEND_PURCHASE, {
                    storeId: e,
                    catalogEntryId: t,
                    paymentOptionsKeys: [],
                  })
                  .then(this._handlePurchaseRequestCreated.bind(this, n))
                  .catch(i && i.bind(o))
              );
            },
            currentPurchaseId: null,
            currentRmsNotificationTimer: null,
            _handlePurchaseRequestCreated(e, t) {
              if (!t) return;
              const { context: n, onComplete: o, onError: l } = e;
              if (t.data) {
                const e = t.data.id;
                if (!e) return void (l && l.apply(n));
                this.set("currentPurchaseId", e);
                const i = `${a.SERVICE_ENDPOINTS.PURCHASE_TRANSACTION}/${e}`;
                s.db.addObserver(i, this, (e) => {
                  e &&
                    e.purchaseState !== a.CAP_STATUS_CREATED &&
                    (this._clearPurchaseNotificationTimer(),
                    e.purchaseState === a.CAP_STATUS_COMPLETE
                      ? o && o.apply(n)
                      : l && l.apply(n),
                    s.db.removeObserver(i, this));
                });
                const r = setTimeout(() => {
                  this._handlePurchaseNotificationTimeout(), l && l.apply(n);
                }, a.MAX_WAITING_TIME_IN_MS);
                this.set("currentRmsNotificationTimer", r);
              } else t.error && 0 !== t.error.code && l && l.apply(n);
            },
            _handlePurchaseNotificationTimeout() {
              this.set("currentPurchaseId", null);
            },
            _clearPurchaseNotificationTimer() {
              const e = this.get("currentRmsNotificationTimer");
              e && (clearTimeout(e), this.set("currentPurchaseId", null));
            },
            init() {
              this._super(...arguments), this._initObservers();
            },
            willDestroy() {
              this._super(...arguments),
                s.db.removeObserver(
                  a.SERVICE_ENDPOINTS.ROTATIONAL_SHOP_CONFIG,
                  this,
                ),
                s.db.removeObserver(a.SERVICE_ENDPOINTS.STORES, this),
                Object.keys(a.TFT_ROTATIONAL_SHOP_CURRENCIES).forEach((e) => {
                  s.db.removeObserver(
                    `${a.SERVICE_ENDPOINTS.WALLET}/${e}`,
                    this,
                  );
                }),
                s.db.removeObserver(a.SERVICE_ENDPOINTS.GENERIC_ASSETS, this);
            },
            _initObservers() {
              s.db.addObserver(
                a.SERVICE_ENDPOINTS.ROTATIONAL_SHOP_CONFIG,
                this,
                (e) => {
                  if (
                    e &&
                    (this.set("rotationalShopEnabled", Boolean(e.enabled)),
                    e.enabled)
                  ) {
                    s.db.addObserver(a.SERVICE_ENDPOINTS.STORES, this, (e) => {
                      e && this.set("_stores", e.data);
                    });
                    const e = this.get("rotationalShopWallet");
                    Object.keys(a.TFT_ROTATIONAL_SHOP_CURRENCIES).forEach(
                      (t) => {
                        s.db.addObserver(
                          `${a.SERVICE_ENDPOINTS.WALLET}/${t}`,
                          this,
                          (n) => {
                            const o = a.TFT_ROTATIONAL_SHOP_CURRENCIES[t];
                            "number" === s.Ember.typeOf(n[t]) &&
                              ((e[o] = n[t]),
                              this.set("rotationalShopWallet", e),
                              this.notifyPropertyChange(
                                "rotationalShopWallet",
                              ));
                          },
                        );
                      },
                    ),
                      this._getRotationalShopVersionFromSettings();
                  }
                },
              ),
                s.db.addObserver(
                  a.SERVICE_ENDPOINTS.GENERIC_ASSETS,
                  this,
                  (e) => {
                    e &&
                      this.set(
                        "rotationalShopAssets",
                        e[a.TFT_ROTATIONAL_SHOP_ASSETS_KEY],
                      );
                  },
                );
            },
            _getRotationalShopVersionFromSettings() {
              s.db
                .get(
                  `${o.SETTINGS_PATH}${o.TFT_BINDING_PATH}${o.DATABINDING_CATEGORY.FIRST_TIME}`,
                )
                .then((e) => {
                  const t = e?.data;
                  if (t) {
                    const e = this.get("rotationalShopSeenVersion");
                    Object.keys(a.TFT_ROTATIONAL_SHOP_VERSIONS).forEach((n) => {
                      t[n] && (e[n] = t[n]);
                    }),
                      this.set("rotationalShopSeenVersion", e),
                      this.notifyPropertyChange("rotationalShopSeenVersion");
                  }
                });
            },
            _createNewGroup(e, t, n) {
              e.set(t, [[n]]);
            },
            _setItemsEndTime(e) {
              const t =
                e &&
                e.displayMetadata &&
                e.displayMetadata.tft &&
                e.displayMetadata.tft.endUtc;
              t && e.catalogEntries.forEach((e) => (e.endTime = t));
            },
            _addMythicStoreToGroup(e, t) {
              const n = a.TFT_ROTATIONAL_SHOP_GROUPS.MYTHIC,
                s = t.get(n);
              if (!s) return void this._createNewGroup(t, n, e);
              s[0].push(e);
            },
            _addSeasonalStoreToGroup(e, t) {
              const n = a.TFT_ROTATIONAL_SHOP_GROUPS.SEASONAL,
                s = t.get(n);
              s ? s.push([e]) : this._createNewGroup(t, n, e);
            },
            showRotationalShopPip: (e, t) =>
              !e || !e[t] || a.TFT_ROTATIONAL_SHOP_VERSIONS[t] > e[t],
            showStoreNavPip: s.Ember.computed(
              "rotationalShopEnabled",
              "rotationalShopSeenVersion",
              function () {
                const e = this.get("rotationalShopEnabled"),
                  t = this.get("rotationalShopSeenVersion");
                return (
                  e && this.showRotationalShopPip(t, "rotational-shop-nav")
                );
              },
            ),
            patchRotationalShopSeenVersion(e) {
              const t = this.get("rotationalShopSeenVersion");
              if (this.showRotationalShopPip(t, e)) {
                const n = a.TFT_ROTATIONAL_SHOP_VERSIONS[e];
                (t[e] = n),
                  this.set("rotationalShopSeenVersion", t),
                  this.notifyPropertyChange("rotationalShopSeenVersion"),
                  s.db.patch(
                    `${o.SETTINGS_PATH}${o.TFT_BINDING_PATH}${o.DATABINDING_CATEGORY.FIRST_TIME}`,
                    { data: { [e]: n } },
                  );
              }
            },
          });
        t.default = l;
      },
      (e, t, n) => {
        const s = n(1).Ember;
        e.exports = s.HTMLBars.template({
          id: "FvGpKkJa",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-tft\\\\src\\\\app\\\\templates\\\\application.hbs\\" style-path=\\"null\\" js-path=\\"null\\" "],["text","\\n"],["open-element","div",[]],["flush-element"],["text","\\n  "],["open-element","div",[]],["flush-element"],["text","\\n    "],["append",["unknown",["outlet"]],false],["text","\\n  "],["close-element"],["text","\\n  "],["append",["helper",["tft-sub-nav"],null,[["routeName"],[["get",["routeName"]]]]],false],["text","\\n  "],["append",["unknown",["tft-header-buttons"]],false],["text","\\n"],["close-element"],["text","\\n\\n"],["open-element","lc-modal",[]],["dynamic-attr","onHide",["helper",["action"],[["get",[null]],"confirm"],null],null],["dynamic-attr","open",["unknown",["showSetAnnouncement"]],null],["flush-element"],["text","\\n  "],["open-element","lc-modal-content",[]],["flush-element"],["text","\\n    "],["open-element","lol-uikit-dialog-frame",[]],["static-attr","orientation","bottom"],["static-attr","dismissable",""],["static-attr","dismissable-type","inside"],["flush-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","tft-set-announcement"],["dynamic-attr","style",["concat",["background-image: url(",["unknown",["setAnnouncementBackgroundImage"]],");"]]],["flush-element"],["text","\\n        "],["open-element","div",[]],["static-attr","class","tft-set-announcement-left"],["flush-element"],["text","\\n          "],["open-element","div",[]],["static-attr","class","tft-set-announcement-title"],["flush-element"],["append",["unknown",["mapData","locStrings","set_announcement_title"]],false],["close-element"],["text","\\n"],["block",["if"],[["get",["setAnnouncementIcon"]]],null,3,2],["text","          "],["open-element","div",[]],["static-attr","class","tft-set-announcement-icon-line"],["flush-element"],["text","\\n            "],["open-element","img",[]],["static-attr","src","/fe/lol-tft/images/vector-line.svg"],["flush-element"],["close-element"],["text","\\n            "],["open-element","img",[]],["static-attr","src","/fe/lol-tft/images/tft-icon.svg"],["static-attr","class","tft-set-announcement-line-icon"],["flush-element"],["close-element"],["text","\\n            "],["open-element","img",[]],["static-attr","src","/fe/lol-tft/images/vector-line.svg"],["static-attr","style","transform: rotate(180deg);"],["flush-element"],["close-element"],["text","\\n          "],["close-element"],["text","\\n          "],["open-element","div",[]],["static-attr","class","tft-set-announcement-body"],["flush-element"],["text","\\n"],["block",["each"],[["helper",["-each-in"],[["get",["setAnnouncementData"]]],null]],null,1],["text","          "],["close-element"],["text","\\n          "],["open-element","lol-uikit-flat-button-group",[]],["static-attr","class","tft-set-announcement-ok-button"],["static-attr","type","dialog-frame"],["flush-element"],["text","\\n            "],["open-element","lol-uikit-flat-button",[]],["dynamic-attr","onclick",["helper",["action"],[["get",[null]],"confirm"],null],null],["flush-element"],["append",["unknown",["mapData","locStrings","set_announcement_confirm_button"]],false],["close-element"],["text","\\n          "],["close-element"],["text","\\n        "],["close-element"],["text","\\n        "],["open-element","div",[]],["static-attr","class","tft-set-announcement-right"],["dynamic-attr","style",["concat",["background-image: url(",["unknown",["setAnnouncementSplash"]],");"]]],["flush-element"],["text","\\n          "],["open-element","div",[]],["static-attr","class","tft-set-announcement-right-footer"],["flush-element"],["text","\\n            "],["append",["unknown",["mapData","locStrings","set_announcement_splash_footer"]],false],["text","\\n"],["block",["if"],[["get",["shouldShowVolumeIcon"]]],null,0],["text","          "],["close-element"],["text","\\n        "],["close-element"],["text","\\n      "],["close-element"],["text","\\n    "],["close-element"],["text","\\n  "],["close-element"],["text","\\n"],["close-element"]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","            "],["open-element","img",[]],["static-attr","src","/fe/lol-tft/images/volume-icon.png"],["flush-element"],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","              "],["open-element","div",[]],["static-attr","class","tft-set-announcement-body-item"],["flush-element"],["text","\\n                "],["open-element","div",[]],["static-attr","class","tft-set-announcement-body-item-heading"],["flush-element"],["text","\\n                  "],["open-element","img",[]],["dynamic-attr","src",["concat",[["unknown",["data","imagePath"]]]]],["flush-element"],["close-element"],["text","\\n                  "],["append",["unknown",["data","header"]],false],["text","\\n                "],["close-element"],["text","\\n                "],["open-element","div",[]],["static-attr","class","tft-set-announcement-body-item-text"],["flush-element"],["append",["unknown",["data","body"]],false],["close-element"],["text","\\n              "],["close-element"],["text","\\n"]],"locals":["index","data"]},{"statements":[["text","          "],["open-element","div",[]],["static-attr","class","tft-set-announcement-set-name"],["flush-element"],["append",["unknown",["mapData","locStrings","set_announcement_set_name"]],false],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","          "],["open-element","img",[]],["static-attr","class","tft-set-announcement-set-name-image"],["dynamic-attr","src",["concat",[["unknown",["setAnnouncementIcon"]]]]],["flush-element"],["close-element"],["text","\\n"]],"locals":[]}],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, n) => {
        const s = n(1).Ember;
        e.exports = s.HTMLBars.template({
          id: "jab1h2M0",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-tft\\\\src\\\\app\\\\templates\\\\loading.hbs\\" style-path=\\"null\\" js-path=\\"null\\" "],["text","\\n"],["append",["unknown",["uikit-spinner"]],false]],"locals":[],"named":[],"yields":[],"blocks":[],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, n) => {
        const s = n(1).Ember;
        e.exports = s.HTMLBars.template({
          id: "DvSvGLjn",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-tft\\\\src\\\\app\\\\templates\\\\index.hbs\\" style-path=\\"null\\" js-path=\\"null\\" "],["text","\\n"],["open-element","div",[]],["flush-element"],["close-element"],["text","\\n"]],"locals":[],"named":[],"yields":[],"blocks":[],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, n) => {
        const s = n(1).Ember;
        e.exports = s.HTMLBars.template({
          id: "0VKnGCVK",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-tft\\\\src\\\\app\\\\templates\\\\home.hbs\\" style-path=\\"null\\" js-path=\\"null\\" "],["text","\\n"],["open-element","div",[]],["static-attr","class","rcp-fe-lol-tft-application-background"],["dynamic-attr","style",["concat",["background-image:url(",["unknown",["hubBackground"]],")"]]],["flush-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","rcp-fe-lol-tft-application"],["flush-element"],["text","\\n    "],["append",["helper",["tft-home"],null,[["storeCatalog","regionLocale","storePromoAssets"],[["get",["model","storeCatalog"]],["get",["model","regionLocale"]],["get",["model","storePromoAssets"]]]]],false],["text","\\n  "],["close-element"],["text","\\n"],["close-element"]],"locals":[],"named":[],"yields":[],"blocks":[],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, n) => {
        const s = n(1).Ember;
        e.exports = s.HTMLBars.template({
          id: "R3QfJpKn",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-tft\\\\src\\\\app\\\\templates\\\\news.hbs\\" style-path=\\"null\\" js-path=\\"null\\" "],["text","\\n"],["open-element","div",[]],["static-attr","class","rcp-fe-lol-tft-application-background"],["dynamic-attr","style",["concat",["background-image: linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(",["unknown",["hubBackground"]],")"]]],["flush-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","rcp-fe-lol-tft-application"],["flush-element"],["text","\\n    "],["append",["unknown",["tft-news"]],false],["text","\\n  "],["close-element"],["text","\\n"],["close-element"]],"locals":[],"named":[],"yields":[],"blocks":[],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, n) => {
        const s = n(1).Ember;
        e.exports = s.HTMLBars.template({
          id: "OkHA8jy+",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-tft\\\\src\\\\app\\\\templates\\\\battle-pass.hbs\\" style-path=\\"null\\" js-path=\\"null\\" "],["text","\\n"],["open-element","div",[]],["flush-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","rcp-fe-lol-tft-application-background"],["dynamic-attr","style",["concat",["background-image:url(",["unknown",["hubBackground"]],")"]]],["flush-element"],["close-element"],["text"," "],["text","\\n  "],["open-element","div",[]],["static-attr","class","rcp-fe-lol-tft-application"],["flush-element"],["text","\\n    "],["append",["helper",["tft-hub"],null,[["isBattlePassEnabled","battlePass","backgrounds","media","isBattlePassXPBoosted","claimRewardsFunc","claimAllRewardsFunc","celebratePassCompletionFunc","backButtonEnabled"],[["get",["isBattlePassEnabled"]],["get",["battlePass"]],["get",["backgrounds"]],["get",["media"]],["get",["isBattlePassXPBoosted"]],["get",["claimRewardsFunc"]],["get",["claimAllRewardsFunc"]],["get",["celebratePassCompletionFunc"]],false]]],false],["text","\\n  "],["close-element"],["text","\\n"],["close-element"],["text","\\n\\n"],["open-element","lc-alert-modal",[]],["dynamic-attr","okText",["concat",[["unknown",["bpAnnouncementData","ConfirmButton"]]]]],["dynamic-attr","onOk",["helper",["action"],[["get",[null]],"confirm"],null],null],["dynamic-attr","dismissible",true,null],["dynamic-attr","open",["unknown",["showBPAnnouncement"]],null],["static-attr","dismissibleType","inside"],["flush-element"],["text","\\n  "],["open-element","lc-modal-content",[]],["flush-element"],["text","\\n    "],["open-element","lol-uikit-dialog-frame",[]],["static-attr","orientation","bottom"],["flush-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","tft-season-start"],["dynamic-attr","style",["concat",["background-image: url(",["unknown",["bpAnnouncementBackgroundImage"]],");"]]],["flush-element"],["text","\\n        "],["open-element","div",[]],["static-attr","class","tft-season-start-title"],["flush-element"],["append",["unknown",["bpAnnouncementData","Title"]],false],["close-element"],["text","\\n        "],["open-element","div",[]],["static-attr","class","tft-season-start-body"],["flush-element"],["append",["unknown",["bpAnnouncementData","Body"]],false],["close-element"],["text","\\n      "],["close-element"],["text","\\n    "],["close-element"],["text","\\n  "],["close-element"],["text","\\n"],["close-element"]],"locals":[],"named":[],"yields":[],"blocks":[],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, n) => {
        const s = n(1).Ember;
        e.exports = s.HTMLBars.template({
          id: "UIX1VY5C",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-tft\\\\src\\\\app\\\\templates\\\\match-history.hbs\\" style-path=\\"null\\" js-path=\\"null\\" "],["text","\\n"],["open-element","div",[]],["static-attr","class","rcp-fe-lol-tft-application-background"],["dynamic-attr","style",["concat",["background-image:url(",["unknown",["eogBackground"]],");"]]],["flush-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","rcp-fe-lol-tft-match-history-application"],["flush-element"],["text","\\n    "],["append",["helper",["tft-match-summary-root"],null,[["champions","championsByAlias","tftChampionsByAlias","items","maps","queues","spells","tftItemsByName","tftTraitsById","tftGameVariationsByAlias","tftDefaultSet","tftSets"],[["get",["model","champions"]],["get",["model","championsByAlias"]],["get",["model","tftChampionsByAlias"]],["get",["model","items"]],["get",["model","maps"]],["get",["model","queues"]],["get",["model","spells"]],["get",["model","tftItemsByName"]],["get",["model","tftTraitsById"]],["get",["model","tftGameVariationsByAlias"]],["get",["model","tftDefaultSet"]],["get",["model","tftSets"]]]]],false],["text","\\n  "],["close-element"],["text","\\n"],["close-element"]],"locals":[],"named":[],"yields":[],"blocks":[],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, n) => {
        const s = n(1).Ember;
        e.exports = s.HTMLBars.template({
          id: "gtpym7Id",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-tft\\\\src\\\\app\\\\templates\\\\test-page.hbs\\" style-path=\\"null\\" js-path=\\"null\\" "],["text","\\n"],["open-element","div",[]],["static-attr","class","rcp-fe-lol-tft-application-background"],["flush-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","rcp-fe-lol-tft-application"],["static-attr","style","height: 720px; width: 1055px;"],["flush-element"],["text","\\n    "],["append",["unknown",["tft-test-page"]],false],["text","\\n  "],["close-element"],["text","\\n"],["close-element"]],"locals":[],"named":[],"yields":[],"blocks":[],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, n) => {
        const s = n(1).Ember;
        e.exports = s.HTMLBars.template({
          id: "MODEvCMw",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-tft\\\\src\\\\app\\\\templates\\\\event-page.hbs\\" style-path=\\"null\\" js-path=\\"null\\" "],["text","\\n"],["open-element","div",[]],["static-attr","class","rcp-fe-lol-tft-application-background"],["dynamic-attr","style",["concat",["background-image:url(",["unknown",["hubBackground"]],")"]]],["flush-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","rcp-fe-lol-tft-application"],["flush-element"],["text","\\n"],["block",["if"],[["get",["displayEventPass"]]],null,0],["text","    "],["open-element","div",[]],["static-attr","class","event-hub"],["dynamic-attr","hidden",["unknown",["displayEventPass"]],null],["flush-element"],["text","\\n      "],["append",["helper",["tft-event-page"],null,[["telemetryEventPassTimeSpent","toggleEventPass","url"],[["get",["telemetryEventPassTimeSpent"]],["helper",["action"],[["get",[null]],"toggleEventPass"],null],["get",["url"]]]]],false],["text","\\n    "],["close-element"],["text","\\n  "],["close-element"],["text","\\n"],["close-element"]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","      "],["open-element","div",[]],["static-attr","class","event-pass"],["flush-element"],["text","\\n        "],["append",["helper",["tft-hub"],null,[["battlePass","media","isBattlePassXPBoosted","backButtonEnabled","backButtonAction","claimRewardsFunc","claimAllRewardsFunc","celebratePassCompletionFunc"],[["get",["battlePass"]],["get",["media"]],false,true,["helper",["action"],[["get",[null]],"toggleEventPass"],null],["get",["claimRewardsFunc"]],["get",["claimAllRewardsFunc"]],["get",["celebratePassCompletionFunc"]]]]],false],["text","\\n      "],["close-element"],["text","\\n"]],"locals":[]}],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, n) => {
        const s = n(1).Ember;
        e.exports = s.HTMLBars.template({
          id: "JC8jYD1s",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-tft\\\\src\\\\lib\\\\troves\\\\addon\\\\templates\\\\components\\\\mythic-button.hbs\\" style-path=\\"null\\" js-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-tft\\\\src\\\\lib\\\\troves\\\\addon\\\\components\\\\mythic-button.js\\" "],["text","\\n"],["block",["if"],[["get",["showMythicButton"]]],null,0]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["open-element","div",[]],["dynamic-attr","class",["concat",["mythic-button ",["helper",["if"],[["get",["isPulling"]],"disabled"],null]]]],["flush-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","mythic-button-glow"],["flush-element"],["close-element"],["text","\\n  "],["open-element","button",[]],["dynamic-attr","disabled",["unknown",["isPulling"]],null],["flush-element"],["text","\\n    "],["open-element","span",[]],["static-attr","class","mythic-button-holder-text"],["flush-element"],["append",["unknown",["tra","troves_mythic_token_usage"]],false],["close-element"],["text","\\n    "],["open-element","img",[]],["dynamic-attr","src",["concat",[["unknown",["mythicTokenIcon"]]]]],["static-attr","class","mythic-currency-icon"],["flush-element"],["close-element"],["text","\\n  "],["close-element"],["text","\\n"],["close-element"],["text","\\n"],["open-element","lc-confirm-modal",[]],["dynamic-attr","acceptText",["unknown",["tra","troves_mythic_token_dialog_open"]],null],["dynamic-attr","declineText",["unknown",["tra","troves_mythic_token_dialog_cancel"]],null],["dynamic-attr","onYes",["helper",["action"],[["get",[null]],"useMythicToken"],null],null],["dynamic-attr","onHide",["helper",["action"],[["get",[null]],"closeConfirmModal"],null],null],["dynamic-attr","open",["unknown",["confirmModalShowing"]],null],["flush-element"],["text","\\n  "],["open-element","lc-modal-content",[]],["flush-element"],["text","\\n    "],["append",["helper",["mythic-token-dialog"],null,[["mythicTokenIcon","ownedChaseContent","balanceText"],[["get",["mythicTokenIcon"]],["get",["ownedChaseContent"]],["get",["balanceText"]]]]],false],["text","\\n  "],["close-element"],["text","\\n"],["close-element"],["text","\\n"]],"locals":[]}],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, n) => {
        const s = n(1).Ember;
        e.exports = s.HTMLBars.template({
          id: "6h/Wbb8v",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-tft\\\\src\\\\lib\\\\troves\\\\addon\\\\templates\\\\components\\\\mythic-token-dialog.hbs\\" style-path=\\"null\\" js-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-tft\\\\src\\\\lib\\\\troves\\\\addon\\\\components\\\\mythic-token-dialog.js\\" "],["text","\\n"],["open-element","lol-uikit-content-block",[]],["static-attr","type","dialog-large"],["static-attr","id","mythic-token-dialog-content-block"],["flush-element"],["text","\\n  "],["open-element","h4",[]],["static-attr","class","mythic-token-dialog-title"],["flush-element"],["append",["unknown",["title"]],false],["close-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","mythic-token-dialog-content"],["flush-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","confirm-info"],["flush-element"],["append",["helper",["sanitize"],[["get",["confirmText"]]],null],false],["close-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","separate-line"],["flush-element"],["close-element"],["text","\\n"],["block",["if"],[["get",["ownedChaseContent"]]],null,1,0],["text","  "],["close-element"],["text","\\n"],["close-element"],["text","\\n"]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","    "],["open-element","div",[]],["static-attr","class","balance-info"],["flush-element"],["text","\\n      "],["open-element","img",[]],["dynamic-attr","src",["concat",[["unknown",["mythicTokenIcon"]]]]],["static-attr","class","mythic-currency-icon"],["flush-element"],["close-element"],["text","\\n      "],["open-element","span",[]],["flush-element"],["append",["unknown",["balanceText"]],false],["close-element"],["text","\\n    "],["close-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","separate-line"],["flush-element"],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","    "],["open-element","div",[]],["static-attr","class","owned-info"],["flush-element"],["append",["unknown",["ownedText"]],false],["close-element"],["text","\\n"]],"locals":[]}],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, n) => {
        const s = n(1).Ember;
        e.exports = s.HTMLBars.template({
          id: "tsfuLboj",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-tft\\\\src\\\\lib\\\\troves\\\\addon\\\\templates\\\\components\\\\pull-button.hbs\\" style-path=\\"null\\" js-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-tft\\\\src\\\\lib\\\\troves\\\\addon\\\\components\\\\pull-button.js\\" "],["text","\\n"],["open-element","lol-uikit-flat-button",[]],["static-attr","class","button glow"],["dynamic-attr","disabled",["unknown",["disabled"]],null],["flush-element"],["text","\\n"],["block",["if"],[["get",["showSpinner"]]],null,1,0],["close-element"],["text","\\n"],["open-element","div",[]],["static-attr","class","pull-button-text"],["flush-element"],["append",["unknown",["buttonText"]],false],["close-element"]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","    "],["open-element","img",[]],["dynamic-attr","src",["concat",[["unknown",["troveTokenIcon"]]]]],["static-attr","class","pull-currency-icon"],["dynamic-attr","disabled",["unknown",["disabled"]],null],["flush-element"],["close-element"],["text","\\n    "],["open-element","span",[]],["static-attr","class","pull-button-holder-text"],["flush-element"],["append",["unknown",["cost"]],false],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","    "],["append",["unknown",["uikit-spinner"]],false],["text","\\n"]],"locals":[]}],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, n) => {
        const s = n(1).Ember;
        e.exports = s.HTMLBars.template({
          id: "h4YJpfqV",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-tft\\\\src\\\\lib\\\\troves\\\\addon\\\\templates\\\\components\\\\pull-buttons-container.hbs\\" style-path=\\"null\\" js-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-tft\\\\src\\\\lib\\\\troves\\\\addon\\\\components\\\\pull-buttons-container.js\\" "],["text","\\n"],["block",["if"],[["get",["trovesService","trovesV2Enabled"]]],null,3,2]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","      "],["append",["helper",["pull-button"],null,[["cost","buttonText","disabled","rollCount","activeBannerSourceId","pityCount","selectedOfferId","dropTableId"],[["get",["pullCost"]],["get",["tra","troves_pull_buttons_open_one"]],["get",["isSinglePullDisabled"]],["get",["SINGLE_ROLL_COUNT"]],["get",["activeBannerSourceId"]],["get",["pityCount"]],["get",["selectedOfferId"]],["get",["dropTableId"]]]]],false],["text","\\n      "],["append",["helper",["pull-button"],null,[["cost","buttonText","disabled","rollCount","activeBannerSourceId","pityCount","selectedOfferId","dropTableId"],[["get",["tenPullCost"]],["get",["tra","troves_pull_buttons_open_ten"]],["get",["isTenPullDisabled"]],["get",["MULTI_ROLL_COUNT"]],["get",["activeBannerSourceId"]],["get",["pityCount"]],["get",["selectedOfferId"]],["get",["dropTableId"]]]]],false],["text","\\n"]],"locals":[]},{"statements":[["text","      "],["open-element","div",[]],["static-attr","class","pull-container-label"],["flush-element"],["append",["unknown",["tra","troves_pull_buttons_all_owned"]],false],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","  "],["open-element","div",[]],["dynamic-attr","class",["concat",["button-container ",["helper",["if"],[["get",["isAllContentOwned"]],"","with-button"],null]]]],["flush-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","hextech-filigree"],["flush-element"],["open-element","img",[]],["static-attr","src","/fe/lol-tft-troves/images/Troves_Hextech_Filigree.png"],["flush-element"],["close-element"],["close-element"],["text","\\n"],["block",["if"],[["get",["isAllContentOwned"]]],null,1,0],["text","    "],["open-element","div",[]],["static-attr","class","hextech-filigree hextech-filigree-rotate"],["flush-element"],["open-element","img",[]],["static-attr","src","/fe/lol-tft-troves/images/Troves_Hextech_Filigree.png"],["flush-element"],["close-element"],["close-element"],["text","\\n  "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","  "],["open-element","div",[]],["static-attr","class","button-container"],["flush-element"],["text","\\n    "],["append",["helper",["pull-button"],null,[["cost","buttonText","disabled","rollCount","activeBannerSourceId","pityCount","selectedOfferId","dropTableId"],[["get",["pullCost"]],["get",["tra","troves_pull_buttons_open_one"]],["get",["isSinglePullDisabledTrovesV2"]],["get",["SINGLE_ROLL_COUNT"]],["get",["activeBannerSourceId"]],["get",["pityCount"]],["get",["selectedOfferId"]],["get",["dropTableId"]]]]],false],["text","\\n    "],["append",["helper",["pull-button"],null,[["cost","buttonText","disabled","rollCount","activeBannerSourceId","pityCount","selectedOfferId","dropTableId"],[["get",["tenPullCost"]],["get",["tra","troves_pull_buttons_open_ten"]],["get",["isTenPullDisabledTrovesV2"]],["get",["MULTI_ROLL_COUNT"]],["get",["activeBannerSourceId"]],["get",["pityCount"]],["get",["selectedOfferId"]],["get",["dropTableId"]]]]],false],["text","\\n    "],["append",["helper",["rotational-shop-redeem-button"],null,[["contentOwned","selectedItem","startCraftingCeremony","showConfirmModal","showTooltip"],[["get",["contentOwned"]],["get",["selectedItem"]],["get",["startCraftingCeremony"]],true,false]]],false],["text","\\n  "],["close-element"],["text","\\n"]],"locals":[]}],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, n) => {
        const s = n(1).Ember;
        e.exports = s.HTMLBars.template({
          id: "rjtrWJ+K",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-tft\\\\src\\\\lib\\\\troves\\\\addon\\\\templates\\\\components\\\\pull-error-dialog.hbs\\" style-path=\\"null\\" js-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-tft\\\\src\\\\lib\\\\troves\\\\addon\\\\components\\\\pull-error-dialog.js\\" "],["text","\\n"],["open-element","lc-alert-modal",[]],["dynamic-attr","open",["unknown",["pullErrorModalShowing"]],null],["dynamic-attr","onHide",["helper",["action"],[["get",[null]],"closePullErrorModal"],null],null],["dynamic-attr","okText",["unknown",["okText"]],null],["dynamic-attr","dismissible",false,null],["flush-element"],["text","\\n  "],["open-element","lc-modal-content",[]],["flush-element"],["text","\\n    "],["open-element","lol-uikit-content-block",[]],["static-attr","type","dialog-large"],["static-attr","id","pull-error-dialog-content-block"],["flush-element"],["text","\\n      "],["open-element","h4",[]],["static-attr","class","pull-error-dialog-title"],["flush-element"],["append",["unknown",["title"]],false],["close-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","pull-error-dialog-content"],["flush-element"],["text","\\n        "],["open-element","span",[]],["flush-element"],["append",["helper",["sanitize"],[["get",["content"]]],null],false],["close-element"],["text","\\n        "],["open-element","br",[]],["flush-element"],["close-element"],["text","\\n        "],["open-element","span",[]],["static-attr","class","support"],["flush-element"],["append",["helper",["sanitize"],[["get",["support"]]],null],false],["close-element"],["text","\\n      "],["close-element"],["text","\\n    "],["close-element"],["text","\\n  "],["close-element"],["text","\\n"],["close-element"],["text","\\n\\n"]],"locals":[],"named":[],"yields":[],"blocks":[],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, n) => {
        const s = n(1).Ember;
        e.exports = s.HTMLBars.template({
          id: "JHoaA2Al",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-tft\\\\src\\\\lib\\\\troves\\\\addon\\\\templates\\\\components\\\\item-purchase.hbs\\" style-path=\\"null\\" js-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-tft\\\\src\\\\lib\\\\troves\\\\addon\\\\components\\\\item-purchase.js\\" "],["text","\\n"],["open-element","div",[]],["dynamic-attr","class",["concat",["item-purchase-container ",["helper",["if"],[["get",["isLoading"]],"loading-container"],null]]]],["flush-element"],["text","\\n"],["block",["if"],[["get",["isLoading"]]],null,7,6],["close-element"],["text","\\n"],["block",["if"],[["get",["showCompleteButton"]]],null,0]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","  "],["open-element","lol-uikit-flat-button-group",[]],["static-attr","type","dialog-frame"],["flush-element"],["text","\\n    "],["open-element","lol-uikit-flat-button",[]],["static-attr","tabindex","0"],["static-attr","class","button-accept"],["dynamic-attr","onclick",["helper",["action"],[["get",[null]],"endPurchase"],null],null],["flush-element"],["text","\\n      "],["append",["unknown",["completeButtonText"]],false],["text","\\n    "],["close-element"],["text","\\n  "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","              "],["open-element","div",[]],["static-attr","class","purchase-button-new-balance"],["flush-element"],["append",["unknown",["newBalanceText"]],false],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","              "],["open-element","div",[]],["static-attr","class","purchase-button-warning"],["flush-element"],["append",["unknown",["tra","tft_purchase_not_enough_rp"]],false],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","    "],["open-element","div",[]],["static-attr","class","price-container"],["flush-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","unlock-containers"],["flush-element"],["text","\\n        "],["open-element","div",[]],["static-attr","class","unlock-container purchase-button-unlock-container"],["flush-element"],["text","\\n          "],["open-element","div",[]],["static-attr","class","rp-button-wrap"],["flush-element"],["text","\\n            "],["open-element","lol-uikit-purchase-button",[]],["static-attr","rp",""],["dynamic-attr","disabled",["unknown",["notEnoughRp"]],null],["dynamic-attr","onclick",["helper",["action"],[["get",[null]],"makePurchase"],null],null],["static-attr","class","button glow"],["flush-element"],["text","\\n              "],["append",["unknown",["totalPrice"]],false],["text","\\n            "],["close-element"],["text","\\n            "],["open-element","div",[]],["static-attr","class","purchase-button-information-container"],["flush-element"],["text","\\n"],["block",["if"],[["get",["notEnoughRp"]]],null,2,1],["text","            "],["close-element"],["text","\\n          "],["close-element"],["text","\\n        "],["close-element"],["text","\\n      "],["close-element"],["text","\\n    "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","      "],["open-element","div",[]],["static-attr","class","quantity-limit"],["flush-element"],["append",["unknown",["tra","tft_purchase_limit_per_day"]],false],["text",": "],["append",["unknown",["tokenLimit"]],false],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","      "],["open-element","div",[]],["static-attr","class","quantity-control"],["flush-element"],["text","\\n        "],["open-element","div",[]],["dynamic-attr","class",["concat",["quantity-button multi-quantity-button ",["helper",["if"],[["get",["minusButtonDisabled"]],"disabled"],null]]]],["flush-element"],["text","\\n          "],["open-element","button",[]],["dynamic-attr","disabled",["unknown",["minusButtonDisabled"]],null],["dynamic-attr","onmouseenter",["helper",["action"],[["get",[null]],"playSound","buttonHover"],null],null],["modifier",["action"],[["get",[null]],"updateQuantity",["get",["negativeMultiplier"]],"buttonClick"]],["flush-element"],["text","- "],["append",["unknown",["multiplierStep"]],false],["close-element"],["text","\\n        "],["close-element"],["text","\\n        "],["open-element","div",[]],["static-attr","class","quantity-button-group"],["flush-element"],["text","\\n          "],["open-element","div",[]],["dynamic-attr","class",["concat",["quantity-button single-quantity-button ",["helper",["if"],[["get",["minusButtonDisabled"]],"disabled"],null]]]],["flush-element"],["text","\\n            "],["open-element","button",[]],["dynamic-attr","disabled",["unknown",["minusButtonDisabled"]],null],["dynamic-attr","onmouseenter",["helper",["action"],[["get",[null]],"playSound","circleButtonHover"],null],null],["modifier",["action"],[["get",[null]],"updateQuantity",-1,"circleButtonClick"]],["flush-element"],["text","-"],["close-element"],["text","\\n          "],["close-element"],["text","\\n          "],["open-element","span",[]],["flush-element"],["append",["unknown",["tokenQuantity"]],false],["close-element"],["text","\\n          "],["open-element","div",[]],["dynamic-attr","class",["concat",["quantity-button single-quantity-button ",["helper",["if"],[["get",["plusButtonDisabled"]],"disabled"],null]]]],["flush-element"],["text","\\n            "],["open-element","button",[]],["dynamic-attr","disabled",["unknown",["plusButtonDisabled"]],null],["dynamic-attr","onmouseenter",["helper",["action"],[["get",[null]],"playSound","circleButtonHover"],null],null],["modifier",["action"],[["get",[null]],"updateQuantity",1,"circleButtonClick"]],["flush-element"],["text","+"],["close-element"],["text","\\n          "],["close-element"],["text","\\n        "],["close-element"],["text","\\n        "],["open-element","div",[]],["dynamic-attr","class",["concat",["quantity-button multi-quantity-button ",["helper",["if"],[["get",["plusButtonDisabled"]],"disabled"],null]]]],["flush-element"],["text","\\n          "],["open-element","button",[]],["dynamic-attr","disabled",["unknown",["plusButtonDisabled"]],null],["dynamic-attr","onmouseenter",["helper",["action"],[["get",[null]],"playSound","buttonHover"],null],null],["modifier",["action"],[["get",[null]],"updateQuantity",["get",["multiplier"]],"buttonClick"]],["flush-element"],["text","+ "],["append",["unknown",["multiplierStep"]],false],["close-element"],["text","\\n        "],["close-element"],["text","\\n      "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","  "],["open-element","div",[]],["dynamic-attr","class",["concat",["item-portrait ",["helper",["if"],[["get",["isPurchasing"]],"loading-portrait"],null]," ",["helper",["if"],[["get",["purchaseError"]],"error-portrait"],null]]]],["flush-element"],["text","\\n    "],["open-element","img",[]],["dynamic-attr","src",["unknown",["iconUrl"]],null],["static-attr","class","item-image"],["flush-element"],["close-element"],["text","\\n  "],["close-element"],["text","\\n\\n  "],["open-element","div",[]],["dynamic-attr","class",["concat",["purchase-modal-info ",["helper",["if"],[["get",["showCompleteButton"]],"has-complete-button"],null]," ",["helper",["if"],[["get",["isPurchasing"]],"loading-info"],null]]]],["flush-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","purchase-modal-info-heading"],["flush-element"],["text","\\n      "],["open-element","h4",[]],["static-attr","class","title"],["flush-element"],["append",["unknown",["title"]],false],["close-element"],["text","\\n      "],["open-element","div",[]],["dynamic-attr","class",["concat",[["helper",["if"],[["get",["purchaseError"]],"error-description","item-description"],null]]]],["flush-element"],["append",["unknown",["itemDescription"]],false],["close-element"],["text","\\n"],["block",["if"],[["get",["showQuantityButtons"]]],null,5],["block",["if"],[["get",["showQuantityLimit"]]],null,4],["text","    "],["close-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","purchase-confirmation-text"],["flush-element"],["append",["helper",["sanitize"],[["get",["confirmationText"]]],null],false],["close-element"],["text","\\n"],["block",["if"],[["get",["isPurchaseInitializing"]]],null,3],["text","  "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","  "],["append",["unknown",["uikit-spinner"]],false],["text","\\n"]],"locals":[]}],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, n) => {
        const s = n(1).Ember;
        e.exports = s.HTMLBars.template({
          id: "7khUR+L2",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-tft\\\\src\\\\lib\\\\troves\\\\addon\\\\templates\\\\components\\\\time-remaining-widget.hbs\\" style-path=\\"null\\" js-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-tft\\\\src\\\\lib\\\\troves\\\\addon\\\\components\\\\time-remaining-widget.js\\" "],["text","\\n"],["open-element","div",[]],["static-attr","class","time-remaining-widget"],["flush-element"],["text","\\n"],["append",["helper",["countdown-widget"],null,[["startDate","endDate","preCountdownEnabled","countdownEnabled","requireStartDateToTransition","hidePreCountdownAfterStartDate","hideCountdownAfterEndDate","startingLongTimeText","endingSoonText","endingText","endingWrappingText","endingLongTimeText"],[["get",["startDate"]],["get",["endDate"]],false,true,false,false,true,"",["get",["tra","tft_event_almost_ending"]],["get",["tra","tft_event_almost_ending"]],["get",["tra","tft_event_time_until_end"]],""]]],false],["text","\\n"],["close-element"]],"locals":[],"named":[],"yields":[],"blocks":[],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, n) => {
        const s = n(1).Ember;
        e.exports = s.HTMLBars.template({
          id: "3/cTQCg8",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-tft\\\\src\\\\lib\\\\troves\\\\addon\\\\templates\\\\components\\\\troves-banners.hbs\\" style-path=\\"null\\" js-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-tft\\\\src\\\\lib\\\\troves\\\\addon\\\\components\\\\troves-banners.js\\" "],["text","\\n"],["block",["each"],[["get",["activeBanners"]]],null,0]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","    "],["open-element","div",[]],["static-attr","class","banner-icon"],["flush-element"],["text","\\n      "],["open-element","lol-uikit-flat-button",[]],["dynamic-attr","onclick",["helper",["action"],[["get",[null]],["get",["setSelectedChasedContentId"]],["get",["banner","id"]]],null],null],["static-attr","class","button glow"],["static-attr","primary","true"],["static-attr","remove-padding","true"],["flush-element"],["text","\\n        "],["open-element","div",[]],["static-attr","class","banner-thumbnail-holder"],["flush-element"],["text","\\n          "],["open-element","img",[]],["dynamic-attr","src",["concat",[["unknown",["banner","thumbnailTexture"]]]]],["static-attr","class","banner-thumbnail"],["flush-element"],["close-element"],["text","\\n        "],["close-element"],["text","\\n      "],["close-element"],["text","\\n    "],["close-element"],["text","\\n"]],"locals":["banner"]}],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, n) => {
        const s = n(1).Ember;
        e.exports = s.HTMLBars.template({
          id: "NSx6zSMZ",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-tft\\\\src\\\\lib\\\\troves\\\\addon\\\\templates\\\\components\\\\troves-ceremony.hbs\\" style-path=\\"null\\" js-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-tft\\\\src\\\\lib\\\\troves\\\\addon\\\\components\\\\troves-ceremony.js\\" "],["text","\\n"],["block",["if"],[["get",["ceremonyData"]]],null,3]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","    "],["append",["helper",["portal-video"],null,[["portalSegmentData","maxRarityInRewards","pullType","play","onPlayback","onPlaybackComplete"],[["get",["portalSegmentData"]],["get",["maxRarityInRewards"]],["get",["pullType"]],["get",["playPortalSegment"]],["helper",["action"],[["get",[null]],"onPortalPlayback"],null],["helper",["action"],[["get",[null]],"onPortalComplete"],null]]]],false],["text","\\n"]],"locals":[]},{"statements":[["text","    "],["append",["helper",["troves-ceremony-highlight-rewards"],null,[["highlightSegmentData","buttonText","playAnimation","pauseAnimation","pullType","rewards","onAnimationComplete","onButtonClick"],[["get",["highlightSegmentData"]],["get",["standardSegmentData","PCButtonText"]],["get",["playHighlightSegment"]],["get",["pauseHighlightSegment"]],["get",["pullType"]],["get",["highlightRewards"]],["helper",["action"],[["get",[null]],"onHighlightComplete"],null],["helper",["action"],[["get",[null]],"onHighlightContinueClick"],null]]]],false],["text","\\n"]],"locals":[]},{"statements":[["text","    "],["append",["helper",["troves-ceremony-standard-rewards"],null,[["standardSegmentData","rewards","highlightRewardsExist","isPortalSegmentSkipped","onButtonClick"],[["get",["standardSegmentData"]],["get",["sortedStandardRewards"]],["get",["highlightRewardsExist"]],["get",["isPortalSegmentSkipped"]],["helper",["action"],[["get",[null]],"onStandardComplete"],null]]]],false],["text","\\n"]],"locals":[]},{"statements":[["open-element","div",[]],["static-attr","class","ceremony__container ceremony__background"],["dynamic-attr","onclick",["helper",["action"],[["get",[null]],"onCeremonyClick"],null],null],["flush-element"],["text","\\n"],["block",["if"],[["get",["playStandardSegment"]]],null,2],["text","\\n"],["block",["if"],[["get",["highlightRewardsExist"]]],null,1],["text","\\n"],["block",["if"],[["get",["showPortal"]]],null,0],["text","\\n  "],["append",["helper",["uikit-lottie"],null,[["class","play","loop","imagePath","animationParams","onAnimationComplete","src","sfxSrc"],["ceremony__currency-lottie",["get",["playCurrencySegment"]],false,["get",["currencyLottieImagePath"]],["get",["currencyParams"]],["helper",["action"],[["get",[null]],"onCurrencyComplete"],null],["get",["currencyLottiePath"]],["get",["sfxCurrencySrc"]]]]],false],["text","\\n\\n"],["close-element"],["text","\\n"]],"locals":[]}],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, n) => {
        const s = n(1).Ember;
        e.exports = s.HTMLBars.template({
          id: "I95Xu0Qo",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-tft\\\\src\\\\lib\\\\troves\\\\addon\\\\templates\\\\components\\\\troves-ceremony-highlight-rewards.hbs\\" style-path=\\"null\\" js-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-tft\\\\src\\\\lib\\\\troves\\\\addon\\\\components\\\\troves-ceremony-highlight-rewards.js\\" "],["text","\\n"],["block",["uikit-vignette"],null,null,3]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","        "],["open-element","lol-uikit-flat-button",[]],["static-attr","class","continue-button"],["dynamic-attr","onclick",["unknown",["onButtonClick"]],null],["flush-element"],["text","\\n          "],["append",["unknown",["buttonText"]],false],["text","\\n        "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["block",["vignette","footer"],null,null,0]],"locals":[]},{"statements":[["text","    "],["append",["helper",["uikit-lottie"],null,[["class","play","pause","loop","imagePath","animationParams","animationReplacementImages","animationReplacementText","onAnimationComplete","src","noJsonCache"],["ceremony__highlight-reveal-lottie",["get",["playAnimation"]],["get",["pauseAnimation"]],false,["get",["highlightLottieImagePath"]],["get",["highlightParams"]],["get",["highlightReplacementImages"]],["get",["highlightReplacementText"]],["get",["onAnimationComplete"]],["get",["highlightLottiePath"]],true]]],false],["text","\\n"]],"locals":[]},{"statements":[["block",["vignette","content"],null,null,2],["text","  \\n"],["block",["if"],[["get",["playAnimation"]]],null,1]],"locals":["vignette"]}],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, n) => {
        const s = n(1).Ember;
        e.exports = s.HTMLBars.template({
          id: "AqKf7PtV",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-tft\\\\src\\\\lib\\\\troves\\\\addon\\\\templates\\\\components\\\\troves-ceremony-standard-rewards.hbs\\" style-path=\\"null\\" js-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-tft\\\\src\\\\lib\\\\troves\\\\addon\\\\components\\\\troves-ceremony-standard-rewards.js\\" "],["text","\\n"],["block",["uikit-vignette"],null,null,10]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","      "],["open-element","lol-uikit-flat-button",[]],["static-attr","class","button"],["dynamic-attr","onclick",["helper",["action"],[["get",[null]],"onContinueClick"],null],null],["flush-element"],["text","\\n        "],["append",["unknown",["buttonText"]],false],["text","\\n      "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","        "],["open-element","div",[]],["static-attr","class","single-standard-reward-name"],["flush-element"],["text","\\n          "],["append",["unknown",["singleStandardRewardName"]],false],["text","\\n        "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","              "],["open-element","div",[]],["static-attr","class","reward-card-placeholder"],["flush-element"],["text","\\n"],["text","              "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","                "],["append",["helper",["reward-card"],null,[["reward","class","shouldPlayGlint","standardSegmentData"],[["get",["reward"]],["helper",["if"],[["get",["isSingleReward"]],"single-reward"],null],["get",["isSingleReward"]],["get",["standardSegmentData"]]]]],false],["text","\\n"]],"locals":[]},{"statements":[["text","                "],["append",["helper",["reward-card-v2"],null,[["reward","class","shouldPlayGlint","standardSegmentData"],[["get",["reward"]],["helper",["if"],[["get",["isSingleReward"]],"single-reward"],null],["get",["isSingleReward"]],["get",["standardSegmentData"]]]]],false],["text","\\n"]],"locals":[]},{"statements":[["block",["if"],[["get",["trovesService","trovesV2Enabled"]]],null,4,3]],"locals":[]},{"statements":[["block",["if"],[["get",["reward"]]],null,5,2]],"locals":["reward"]},{"statements":[["text","\\n        "],["open-element","div",[]],["static-attr","class","rewards-row"],["flush-element"],["text","\\n"],["block",["each"],[["get",["rewardsList"]]],null,6],["text","        "],["close-element"],["text","\\n\\n"]],"locals":["rewardsList"]},{"statements":[["text","    "],["open-element","div",[]],["static-attr","class","rewards-container"],["flush-element"],["text","\\n\\n"],["block",["each"],[["get",["rewardStaggeredLists"]]],null,7],["block",["if"],[["get",["isSingleReward"]]],null,1],["text","    "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","    "],["append",["unknown",["headerText"]],false],["text","\\n"]],"locals":[]},{"statements":[["block",["vignette","header"],null,null,9],["text","\\n"],["block",["vignette","content"],null,null,8],["text","  \\n"],["block",["vignette","footer"],null,null,0]],"locals":["vignette"]}],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, n) => {
        const s = n(1).Ember;
        e.exports = s.HTMLBars.template({
          id: "w7z2/+jj",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-tft\\\\src\\\\lib\\\\troves\\\\addon\\\\templates\\\\components\\\\chased-content.hbs\\" style-path=\\"null\\" js-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-tft\\\\src\\\\lib\\\\troves\\\\addon\\\\components\\\\chased-content.js\\" "],["text","\\n"],["block",["if"],[["get",["trovesService","trovesV2Enabled"]]],null,12,4]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","      "],["append",["helper",["loot-table-root"],null,[["dropTableId","badLuckProtectionDisclaimer"],[["get",["chasedContent","id"]],["get",["legalDisclaimer"]]]]],false],["text","\\n"]],"locals":[]},{"statements":[["block",["uikit-modal"],null,[["type","dismissibleType","onClose"],["DialogDismiss","inside",["helper",["action"],[["get",[null]],"hideDropRatesModal"],null]]],0]],"locals":[]},{"statements":[["text","      "],["open-element","span",[]],["static-attr","class","chase-name-label"],["flush-element"],["append",["unknown",["tra","troves_chased_content_not_available"]],false],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","      "],["open-element","span",[]],["static-attr","class","chase-name-label"],["flush-element"],["text","\\n        "],["open-element","span",[]],["static-attr","class","chase-name-inner"],["dynamic-attr","onclick",["helper",["action"],[["get",[null]],"onMoreInfoClicked"],null],null],["flush-element"],["append",["unknown",["chasedContent","name"]],false],["open-element","img",[]],["dynamic-attr","src",["concat",[["unknown",["moreInfoIcon"]]]]],["static-attr","class","more-info-icon"],["flush-element"],["close-element"],["close-element"],["text","\\n      "],["close-element"],["text","\\n      "],["open-element","br",[]],["flush-element"],["close-element"],["text","\\n      "],["open-element","span",[]],["static-attr","class","pity-label"],["flush-element"],["append",["unknown",["pityText"]],false],["close-element"],["text","\\n      "],["open-element","img",[]],["dynamic-attr","src",["concat",[["unknown",["chasedContent","bannerTexture"]]]]],["static-attr","class","chase-image"],["flush-element"],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","  "],["open-element","div",[]],["static-attr","class","chase-content"],["flush-element"],["text","\\n"],["block",["if"],[["get",["chasedContent","id"]]],null,3,2],["text","  "],["close-element"],["text","\\n\\n"],["block",["if"],[["get",["showDropRatesModal"]]],null,1]],"locals":[]},{"statements":[["text","      "],["append",["helper",["loot-table-root"],null,[["dropTableId","noDuplicatesDisclaimer","badLuckProtectionDisclaimer"],[["get",["chasedContent","id"]],["get",["duplicateDisclaimerTrovesV2"]],["get",["legalDisclaimerTrovesV2"]]]]],false],["text","\\n"]],"locals":[]},{"statements":[["block",["uikit-modal"],null,[["type","dismissibleType","onClose"],["DialogDismiss","inside",["helper",["action"],[["get",[null]],"hideDropRatesModal"],null]]],5]],"locals":[]},{"statements":[["text","      "],["open-element","div",[]],["static-attr","class","chase-name-label"],["flush-element"],["append",["unknown",["tra","troves_chased_content_not_available"]],false],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","        "],["open-element","img",[]],["dynamic-attr","src",["concat",[["unknown",["chasedContent","bannerTexture"]]]]],["static-attr","class","chase-image"],["flush-element"],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","        "],["open-element","div",[]],["static-attr","class","time-remaining-widget-container"],["flush-element"],["text","\\n          "],["append",["helper",["time-remaining-widget"],null,[["bannerData"],[["get",["chasedContent"]]]]],false],["text","\\n        "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","          "],["append",["unknown",["tra","troves_chased_content_owned"]],false],["text","\\n"]],"locals":[]},{"statements":[["text","      "],["open-element","div",[]],["static-attr","class","chase-content-owned-label"],["flush-element"],["text","\\n"],["block",["if"],[["get",["chasedContent","status","owned"]]],null,10],["text","      "],["close-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","chase-name-label"],["flush-element"],["text","\\n        "],["open-element","span",[]],["static-attr","class","chase-name-inner"],["dynamic-attr","onclick",["helper",["action"],[["get",[null]],"onMoreInfoClicked"],null],null],["flush-element"],["append",["unknown",["chasedContent","name"]],false],["open-element","img",[]],["dynamic-attr","src",["concat",[["unknown",["moreInfoIcon"]]]]],["static-attr","class","more-info-icon"],["flush-element"],["close-element"],["close-element"],["text","\\n      "],["close-element"],["text","\\n"],["block",["if"],[["get",["showBannerTimer"]]],null,9],["block",["if"],[["get",["hasBannerTexture"]]],null,8]],"locals":[]},{"statements":[["text","  "],["open-element","div",[]],["static-attr","class","chase-content"],["flush-element"],["text","\\n"],["block",["if"],[["get",["chasedContent","id"]]],null,11,7],["text","  "],["close-element"],["text","\\n\\n"],["block",["if"],[["get",["showDropRatesModal"]]],null,6]],"locals":[]}],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, n) => {
        const s = n(1).Ember;
        e.exports = s.HTMLBars.template({
          id: "niWEWCmk",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-tft\\\\src\\\\lib\\\\troves\\\\addon\\\\templates\\\\components\\\\tft-troves.hbs\\" style-path=\\"null\\" js-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-tft\\\\src\\\\lib\\\\troves\\\\addon\\\\components\\\\tft-troves.js\\" "],["text","\\n"],["block",["if"],[["get",["isLoading"]]],null,11,10]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","            "],["append",["helper",["time-remaining-widget"],null,[["bannerData"],[["get",["activeBanner"]]]]],false],["text","\\n"]],"locals":[]},{"statements":[["text","          "],["append",["helper",["mythic-button"],null,[["activeBannerStatus","activeBannerSourceId","pityCount","mythicOfferId"],[["get",["activeBannerStatus"]],["get",["activeBanner","sourceId"]],["get",["pityCount"]],["get",["mythicOfferId"]]]]],false],["text","\\n"],["block",["if"],[["get",["showBannerTimer"]]],null,0]],"locals":[]},{"statements":[["text","            "],["append",["helper",["time-remaining-widget"],null,[["bannerData"],[["get",["activeBanner"]]]]],false],["text","\\n"]],"locals":[]},{"statements":[["block",["if"],[["get",["showBannerTimer"]]],null,2]],"locals":[]},{"statements":[["text","          "],["open-element","div",[]],["static-attr","class","banners-container"],["flush-element"],["text","\\n            "],["append",["helper",["troves-banners"],null,[["activeBanners","setSelectedChasedContentId"],[["get",["activeBanners"]],["helper",["action"],[["get",[null]],"setSelectedChasedContentId"],null]]]],false],["text","\\n          "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","    "],["open-element","div",[]],["static-attr","id","troves-ceremony-wrapper"],["static-attr","class","troves-celebration"],["flush-element"],["text","\\n      "],["append",["helper",["troves-ceremony"],null,[["ceremonyData","activeBanner"],[["get",["trovesService","ceremonyData"]],["get",["activeBanner"]]]]],false],["text","\\n    "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["block",["if"],[["get",["trovesService","ceremonyData"]]],null,5],["text","\\n    "],["open-element","div",[]],["static-attr","class","root-container"],["flush-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","left-container"],["flush-element"],["text","\\n"],["block",["if"],[["get",["showBannersList"]]],null,4],["text","      "],["close-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","center-container"],["flush-element"],["text","\\n        "],["open-element","div",[]],["static-attr","class","chased-content-container"],["flush-element"],["text","\\n            "],["append",["helper",["chased-content"],null,[["chasedContent","onPityUpdate"],[["get",["activeBanner"]],["helper",["action"],[["get",[null]],"onPityUpdate"],null]]]],false],["text","\\n          "],["open-element","img",[]],["static-attr","class","cloud-platform-image"],["dynamic-attr","src",["concat",[["unknown",["activePlatformImage"]]]]],["flush-element"],["close-element"],["text","\\n        "],["close-element"],["text","\\n\\n        "],["open-element","div",[]],["static-attr","class","pull-buttons"],["flush-element"],["text","\\n          "],["append",["helper",["pull-buttons-container"],null,[["activeBannerStatus","activeBannerSourceId","pityCount","pullCost","selectedOfferId"],[["get",["activeBannerStatus"]],["get",["activeBanner","sourceId"]],["get",["pityCount"]],["get",["pullCost"]],["get",["selectedOfferId"]]]]],false],["text","\\n        "],["close-element"],["text","\\n      "],["close-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","right-container"],["flush-element"],["text","\\n"],["block",["if"],[["get",["activeBanner","isCollectorBounty"]]],null,3,1],["text","      "],["close-element"],["text","\\n    "],["close-element"],["text","\\n  "]],"locals":[]},{"statements":[["text","    "],["open-element","div",[]],["static-attr","class","standalone-container"],["flush-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","standalone-title-text"],["flush-element"],["append",["unknown",["tra","troves_hub_banner_empty_title"]],false],["close-element"],["text","\\n      "],["open-element","img",[]],["dynamic-attr","src",["concat",[["unknown",["emptyBannerImage"]]]]],["static-attr","class","standalone-image"],["flush-element"],["close-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","standalone-footer-text"],["flush-element"],["append",["unknown",["tra","troves_hub_banner_empty_footer"]],false],["close-element"],["text","\\n    "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["block",["if"],[["get",["isEmpty"]]],null,7,6]],"locals":[]},{"statements":[["text","    "],["open-element","div",[]],["static-attr","class","standalone-container"],["flush-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","standalone-title-text"],["flush-element"],["append",["unknown",["tra","troves_hub_banner_error_title"]],false],["close-element"],["text","\\n      "],["open-element","img",[]],["dynamic-attr","src",["concat",[["unknown",["errorBannerImage"]]]]],["static-attr","class","standalone-image"],["flush-element"],["close-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","standalone-footer-text"],["flush-element"],["append",["unknown",["tra","troves_hub_banner_error_footer"]],false],["close-element"],["text","\\n    "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["block",["if"],[["get",["hasBannerError"]]],null,9,8],["text","  "],["append",["unknown",["pull-error-dialog"]],false],["text","\\n"]],"locals":[]},{"statements":[["text","  "],["open-element","div",[]],["static-attr","class","loading-spinner"],["flush-element"],["text","\\n    "],["append",["unknown",["uikit-spinner"]],false],["text","\\n  "],["close-element"],["text","\\n"]],"locals":[]}],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, n) => {
        const s = n(1).Ember;
        e.exports = s.HTMLBars.template({
          id: "VNq2uo2G",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-tft\\\\src\\\\lib\\\\troves\\\\addon\\\\templates\\\\components\\\\reward-card.hbs\\" style-path=\\"null\\" js-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-tft\\\\src\\\\lib\\\\troves\\\\addon\\\\components\\\\reward-card.js\\" "],["text","\\n"],["open-element","div",[]],["static-attr","class","reward-card-content"],["dynamic-attr","style",["concat",["transition-duration: ",["unknown",["rewardFadeInDuration"]],"; transition-delay: ",["unknown",["rewardFadeInDelay"]]]]],["flush-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","sheen"],["dynamic-attr","style",["concat",["background-image: url(\'",["helper",["sanitize"],[["get",["sheenPath"]]],null],"\'); transition-duration: ",["unknown",["sheenDuration"]],"; transition-delay: ",["unknown",["sheenDelay"]],";"]]],["flush-element"],["close-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","frame-container"],["flush-element"],["text","\\n        "],["open-element","div",[]],["static-attr","class","frame"],["dynamic-attr","style",["concat",["background-image: url(\'",["helper",["sanitize"],[["get",["framePath"]]],null],"\');"]]],["flush-element"],["text","\\n            "],["open-element","div",[]],["static-attr","class","icon"],["dynamic-attr","style",["concat",["background-image: url(\'",["helper",["sanitize"],[["get",["reward","rewardTexturePath"]]],null],"\');"]]],["flush-element"],["text","\\n                "],["open-element","div",[]],["static-attr","class","cover"],["dynamic-attr","style",["concat",["transition-duration: ",["unknown",["thumbnailFadeInDuration"]],"; transition-delay: ",["unknown",["thumbnailFadeInDelay"]],";"]]],["flush-element"],["close-element"],["text","\\n            "],["close-element"],["text","\\n        "],["close-element"],["text","\\n    "],["close-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","reward-info star-level"],["dynamic-attr","style",["concat",["background-image: url(\'",["helper",["sanitize"],[["get",["starPath"]]],null],"\');"]]],["flush-element"],["close-element"],["text","\\n    "],["open-element","div",[]],["dynamic-attr","class",["concat",["reward-info rarity-gem ",["unknown",["rarityCssClass"]]]]],["dynamic-attr","style",["concat",["background-image: url(\'",["helper",["sanitize"],[["get",["gemPath"]]],null],"\');"]]],["flush-element"],["close-element"],["text","\\n"],["block",["if"],[["get",["shouldPlayGlint"]]],null,1],["close-element"],["text","\\n"],["block",["if"],[["get",["isLegendary"]]],null,0]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","    "],["open-element","div",[]],["static-attr","class","legendary-spark-anim"],["flush-element"],["text","\\n        "],["append",["helper",["troves-sprite-animation"],null,[["sprite"],[["get",["standardSegmentData","PCLegendarySparkSprite"]]]]],false],["text","\\n    "],["close-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","legendary-hit-anim"],["flush-element"],["text","\\n        "],["append",["helper",["troves-sprite-animation"],null,[["sprite"],[["get",["standardSegmentData","PCLegendaryHitSprite"]]]]],false],["text","\\n    "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","        "],["open-element","div",[]],["static-attr","class","glint-anim"],["dynamic-attr","style",["concat",["transition-duration: ",["unknown",["glintDuration"]],"; transition-delay: ",["unknown",["glintDelay"]]]]],["flush-element"],["text","\\n            "],["append",["helper",["troves-sprite-animation"],null,[["sprite"],[["get",["standardSegmentData","PCGlintSprite"]]]]],false],["text","\\n        "],["close-element"],["text","\\n"]],"locals":[]}],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, n) => {
        const s = n(1).Ember;
        e.exports = s.HTMLBars.template({
          id: "sARxtk6q",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-tft\\\\src\\\\lib\\\\troves\\\\addon\\\\templates\\\\components\\\\portal-video.hbs\\" style-path=\\"null\\" js-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-tft\\\\src\\\\lib\\\\troves\\\\addon\\\\components\\\\portal-video.js\\" "],["text","\\n"],["open-element","uikit-video",[]],["static-attr","class","ceremony__portal-webm"],["dynamic-attr","src",["unknown",["portalVideoPath"]],null],["static-attr","cache-name","rcp-fe-lol-tft"],["static-attr","preload","true"],["static-attr","autoplay","false"],["flush-element"],["text","\\n"],["close-element"]],"locals":[],"named":[],"yields":[],"blocks":[],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, n) => {
        const s = n(1).Ember;
        e.exports = s.HTMLBars.template({
          id: "Mids4gmb",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-tft\\\\src\\\\lib\\\\troves\\\\addon\\\\templates\\\\components\\\\troves-sprite-animation.hbs\\" style-path=\\"null\\" js-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-tft\\\\src\\\\lib\\\\troves\\\\addon\\\\components\\\\troves-sprite-animation.js\\" "],["text","\\n"],["open-element","div",[]],["static-attr","class","sprite-container"],["flush-element"],["text","\\n     "],["open-element","div",[]],["static-attr","class","sprite"],["dynamic-attr","style",["unknown",["elementStyle"]],null],["flush-element"],["close-element"],["text","\\n"],["close-element"]],"locals":[],"named":[],"yields":[],"blocks":[],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, n) => {
        const s = n(1).Ember;
        e.exports = s.HTMLBars.template({
          id: "Un0MT8oE",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-tft\\\\src\\\\app\\\\templates\\\\troves.hbs\\" style-path=\\"null\\" js-path=\\"null\\" "],["text","\\n"],["open-element","div",[]],["dynamic-attr","class",["concat",["rcp-fe-lol-tft-application-background ",["helper",["if"],[["get",["trovesService","trovesV2Enabled"]],"tft-troves-v2-background"],null]]]],["dynamic-attr","style",["concat",["background-image:url(",["unknown",["backgroundPath"]],")"]]],["flush-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","rcp-fe-lol-tft-application"],["static-attr","style","height: 720px; width: 1055px;"],["flush-element"],["text","\\n"],["block",["if"],[["get",["trovesService","trovesV2Enabled"]]],null,1,0],["text","  "],["close-element"],["text","\\n"],["close-element"],["text","\\n"]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","    "],["append",["helper",["tft-troves"],null,[["activeBanner","onBannerSelected"],[["get",["displayedBanner"]],["helper",["action"],[["get",[null]],"onBannerSelected"],null]]]],false],["text","\\n"]],"locals":[]},{"statements":[["text","    "],["append",["helper",["tft-troves-v2"],null,[["activeBanner","onBannerSelected"],[["get",["displayedBanner"]],["helper",["action"],[["get",[null]],"onBannerSelected"],null]]]],false],["text","\\n"]],"locals":[]}],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, n) => {
        const s = n(1).Ember;
        e.exports = s.HTMLBars.template({
          id: "1lLaCwWO",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-tft\\\\src\\\\lib\\\\troves\\\\addon\\\\templates\\\\components\\\\milestone-rewards-tracker.hbs\\" style-path=\\"null\\" js-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-tft\\\\src\\\\lib\\\\troves\\\\addon\\\\components\\\\milestone-rewards-tracker.js\\" "],["text","\\n"],["open-element","lol-uikit-scrollable",[]],["static-attr","class","rewards-scrollable"],["static-attr","direction","horizontal"],["static-attr","overflow-masks","disabled"],["static-attr","show-on-hover","false"],["static-attr","side-scroll-wheel",""],["dynamic-attr","style",["concat",["--number-of-milestones: ",["unknown",["milestoneRewardsLength"]],"; --reward-position-interval: ",["unknown",["rewardPositionInterval"]]]]],["flush-element"],["text","\\n"],["block",["each"],[["get",["milestoneRewards"]]],null,7],["text","  "],["open-element","div",[]],["static-attr","class","troves-milestone-repeat"],["flush-element"],["text","\\n"],["block",["tft-tooltip"],null,[["tooltipId"],["tft-troves-milestone-tracker-repeat-icon"]],0],["text","    "],["open-element","div",[]],["static-attr","class","repeat-icon"],["dynamic-attr","style",["concat",["background-image: url(\'",["unknown",["repeatIconImagePath"]],"\')"]]],["flush-element"],["close-element"],["text","\\n  "],["close-element"],["text","\\n"],["close-element"]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","      "],["open-element","lol-uikit-content-block",[]],["static-attr","type","tooltip-system"],["flush-element"],["text","\\n        "],["open-element","div",[]],["static-attr","class","tft-troves-milestone-tracker-repeat-tooltip-content"],["flush-element"],["text","\\n          "],["open-element","p",[]],["static-attr","class","progress"],["flush-element"],["append",["unknown",["repeatTooltipProgressFormat"]],false],["close-element"],["text","\\n          "],["open-element","p",[]],["static-attr","class","repeating"],["flush-element"],["text","("],["append",["unknown",["tra","troves_milestone_repeat_tooltip_repeating"]],false],["text",")"],["close-element"],["text","\\n          "],["open-element","div",[]],["static-attr","class","divider"],["flush-element"],["close-element"],["text","\\n          "],["open-element","p",[]],["static-attr","class","description"],["flush-element"],["append",["unknown",["tra","troves_milestone_repeat_tooltip_description"]],false],["close-element"],["text","\\n        "],["close-element"],["text","\\n      "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","      "],["open-element","div",[]],["dynamic-attr","class",["concat",["progress-interval ",["helper",["if"],[["helper",["eq"],[["get",["index"]],["get",["progressIndex"]]],null],"","progress-interval-locked"],null]]]],["dynamic-attr","style",["concat",["background-image: url(",["helper",["if"],[["helper",["eq"],[["get",["index"]],["get",["progressIndex"]]],null],["get",["milestonePipActiveImagePath"]],["get",["milestonePipLockedImagePath"]]],null],");"]]],["flush-element"],["text","\\n        "],["append",["unknown",["milestoneReward","resetValue"]],false],["text","\\n      "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","      "],["open-element","div",[]],["static-attr","class","progress-interval"],["dynamic-attr","style",["concat",["background-image: url(",["unknown",["milestonePipClaimedImagePath"]],");"]]],["flush-element"],["text","\\n        "],["append",["unknown",["milestoneReward","resetValue"]],false],["text","\\n      "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","          "],["open-element","div",[]],["static-attr","class","black-overlay-slim"],["flush-element"],["close-element"],["text","\\n"]],"locals":[]},{"statements":[],"locals":[]},{"statements":[["block",["if"],[["helper",["eq"],[["get",["index"]],["get",["progressIndex"]]],null]],null,4,3]],"locals":[]},{"statements":[["text","          "],["open-element","div",[]],["static-attr","class","black-overlay"],["flush-element"],["close-element"],["text","\\n          "],["open-element","div",[]],["static-attr","class","checkmark"],["dynamic-attr","style",["concat",["background-image: url(",["unknown",["milestoneClaimedCheckmark"]],");"]]],["flush-element"],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","  "],["open-element","div",[]],["static-attr","class","progress-bar"],["dynamic-attr","style",["concat",["left: ",["unknown",["milestoneReward","progressPosition"]],"px;"]]],["flush-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","progress-bar-current"],["dynamic-attr","style",["concat",["width: ",["unknown",["milestoneReward","progressPercentage"]],"%;"]]],["flush-element"],["close-element"],["text","\\n  "],["close-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","reward"],["dynamic-attr","style",["concat",["left: ",["unknown",["milestoneReward","position"]],"px;"]]],["flush-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","frame"],["dynamic-attr","style",["concat",["background-image: url(",["unknown",["milestoneFrameImagePath"]],");"]]],["flush-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","icon"],["dynamic-attr","style",["concat",["background-image: url(",["unknown",["milestoneReward","iconURL"]],");"]]],["flush-element"],["close-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","amount"],["flush-element"],["append",["unknown",["milestoneReward","currencyAmount"]],false],["close-element"],["text","\\n"],["block",["if"],[["get",["milestoneReward","triggered"]]],null,6,5],["text","    "],["close-element"],["text","\\n"],["block",["if"],[["get",["milestoneReward","triggered"]]],null,2,1],["text","  "],["close-element"],["text","\\n"]],"locals":["milestoneReward","index"]}],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, n) => {
        const s = n(1).Ember;
        e.exports = s.HTMLBars.template({
          id: "fnE3saNt",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-tft\\\\src\\\\lib\\\\troves\\\\addon\\\\templates\\\\components\\\\reward-card-v2.hbs\\" style-path=\\"null\\" js-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-tft\\\\src\\\\lib\\\\troves\\\\addon\\\\components\\\\reward-card-v2.js\\" "],["text","\\n"],["open-element","div",[]],["static-attr","class","reward-card-content"],["dynamic-attr","style",["concat",["transition-duration: ",["unknown",["rewardFadeInDuration"]],"; transition-delay: ",["unknown",["rewardFadeInDelay"]]]]],["flush-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","sheen"],["dynamic-attr","style",["concat",["background-image: url(\'",["helper",["sanitize"],[["get",["sheenPath"]]],null],"\'); transition-duration: ",["unknown",["sheenDuration"]],"; transition-delay: ",["unknown",["sheenDelay"]],";"]]],["flush-element"],["close-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","frame-container"],["flush-element"],["text","\\n"],["block",["if"],[["get",["isToOverride"]]],null,7,6],["block",["if"],[["get",["showQuantity"]]],null,5],["text","    "],["close-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","reward-info star-level"],["dynamic-attr","style",["concat",["background-image: url(\'",["helper",["sanitize"],[["get",["starPath"]]],null],"\');"]]],["flush-element"],["close-element"],["text","\\n"],["block",["if"],[["get",["isCurrency"]]],null,4,3],["block",["if"],[["get",["shouldPlayGlint"]]],null,2],["block",["if"],[["get",["isDuplicate"]]],null,1],["close-element"],["text","\\n"],["block",["if"],[["get",["isLegendary"]]],null,0]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","    "],["open-element","div",[]],["static-attr","class","legendary-spark-anim"],["flush-element"],["text","\\n        "],["append",["helper",["troves-sprite-animation"],null,[["sprite"],[["get",["standardSegmentData","PCLegendarySparkSprite"]]]]],false],["text","\\n    "],["close-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","legendary-hit-anim"],["flush-element"],["text","\\n        "],["append",["helper",["troves-sprite-animation"],null,[["sprite"],[["get",["standardSegmentData","PCLegendaryHitSprite"]]]]],false],["text","\\n    "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","        "],["open-element","div",[]],["static-attr","class","duplicate-text"],["flush-element"],["text","\\n            "],["append",["unknown",["tra","troves_reward_card_duplicate"]],false],["text","\\n        "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","        "],["open-element","div",[]],["static-attr","class","glint-anim"],["dynamic-attr","style",["concat",["transition-duration: ",["unknown",["glintDuration"]],"; transition-delay: ",["unknown",["glintDelay"]]]]],["flush-element"],["text","\\n            "],["append",["helper",["troves-sprite-animation"],null,[["sprite"],[["get",["standardSegmentData","PCGlintSprite"]]]]],false],["text","\\n        "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","        "],["open-element","div",[]],["dynamic-attr","class",["concat",["reward-info rarity-gem ",["unknown",["rarityCssClass"]]]]],["dynamic-attr","style",["concat",["background-image: url(\'",["helper",["sanitize"],[["get",["gemPath"]]],null],"\');"]]],["flush-element"],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","        "],["open-element","div",[]],["dynamic-attr","class",["concat",["reward-info rarity-gem ",["unknown",["rarityCssClass"]]]]],["flush-element"],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","            "],["open-element","div",[]],["static-attr","class","amount"],["flush-element"],["text","\\n                "],["open-element","span",[]],["static-attr","class","text"],["flush-element"],["append",["unknown",["reward","quantity"]],false],["close-element"],["text","\\n            "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","        "],["open-element","div",[]],["static-attr","class","frame"],["dynamic-attr","style",["concat",["background-image: url(\'",["helper",["sanitize"],[["get",["framePath"]]],null],"\');"]]],["flush-element"],["text","\\n            "],["open-element","div",[]],["static-attr","class","icon"],["dynamic-attr","style",["concat",["background-image: url(\'",["helper",["sanitize"],[["get",["reward","rewardTexturePath"]]],null],"\');"]]],["flush-element"],["text","\\n                "],["open-element","div",[]],["static-attr","class","cover"],["dynamic-attr","style",["concat",["transition-duration: ",["unknown",["thumbnailFadeInDuration"]],"; transition-delay: ",["unknown",["thumbnailFadeInDelay"]],";"]]],["flush-element"],["close-element"],["text","\\n            "],["close-element"],["text","\\n        "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","        "],["open-element","div",[]],["static-attr","class","frame currency-icon"],["dynamic-attr","style",["concat",["background-image: url(\'",["unknown",["overrideIconImagePath"]],"\');"]]],["flush-element"],["text","\\n            "],["open-element","div",[]],["static-attr","class","icon currency-frame"],["dynamic-attr","style",["concat",["background-image: url(\'",["unknown",["overrideFrameImagePath"]],"\');"]]],["flush-element"],["text","\\n                "],["open-element","div",[]],["static-attr","class","cover"],["dynamic-attr","style",["concat",["transition-duration: ",["unknown",["thumbnailFadeInDuration"]],"; transition-delay: ",["unknown",["thumbnailFadeInDelay"]],";"]]],["flush-element"],["close-element"],["text","\\n            "],["close-element"],["text","\\n        "],["close-element"],["text","\\n"]],"locals":[]}],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, n) => {
        const s = n(1).Ember;
        e.exports = s.HTMLBars.template({
          id: "uJjS2bRr",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-tft\\\\src\\\\lib\\\\troves\\\\addon\\\\templates\\\\components\\\\tft-troves-v2.hbs\\" style-path=\\"null\\" js-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-tft\\\\src\\\\lib\\\\troves\\\\addon\\\\components\\\\tft-troves-v2.js\\" "],["text","\\n"],["block",["if"],[["get",["isLoading"]]],null,10,9],["block",["if"],[["get",["hasValidSelectedItem"]]],null,1],["append",["unknown",["tft-troves-v2-first-time-flow"]],false]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","    "],["append",["helper",["rotational-shop-crafting-ceremony"],null,[["item","closeAction"],[["get",["selectedItem","item"]],["helper",["action"],[["get",[null]],"endCraftingCeremony"],null]]]],false],["text","\\n"]],"locals":[]},{"statements":[["block",["if"],[["get",["showCraftingCeremony"]]],null,0]],"locals":[]},{"statements":[["text","          "],["open-element","div",[]],["static-attr","class","banners-container"],["flush-element"],["text","\\n            "],["append",["helper",["troves-banners"],null,[["activeBanners","setSelectedChasedContentId"],[["get",["activeBanners"]],["helper",["action"],[["get",[null]],"setSelectedChasedContentId"],null]]]],false],["text","\\n          "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","    "],["append",["helper",["troves-ceremony-milestone-rewards"],null,[["milestones","milestonesTriggered","stopMilestoneCeremony"],[["get",["milestones"]],["get",["milestonesTriggered"]],["helper",["action"],[["get",[null]],"stopMilestoneCeremony"],null]]]],false],["text","\\n"]],"locals":[]},{"statements":[["text","    "],["open-element","div",[]],["static-attr","id","troves-ceremony-wrapper"],["static-attr","class","troves-celebration"],["flush-element"],["text","\\n      "],["append",["helper",["troves-ceremony"],null,[["ceremonyData","activeBanner","startMilestoneCeremony"],[["get",["trovesService","ceremonyData"]],["get",["activeBanner"]],["helper",["action"],[["get",[null]],"startMilestoneCeremony"],null]]]],false],["text","\\n    "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["block",["if"],[["get",["trovesService","ceremonyData"]]],null,4],["block",["if"],[["get",["showMilestoneCeremony"]]],null,3],["text","\\n    "],["open-element","div",[]],["static-attr","class","root-container"],["flush-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","left-container"],["flush-element"],["text","\\n"],["block",["if"],[["get",["showBannersList"]]],null,2],["text","      "],["close-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","center-container"],["flush-element"],["text","\\n        "],["open-element","div",[]],["static-attr","class","chased-content-container"],["flush-element"],["text","\\n            "],["append",["helper",["chased-content"],null,[["chasedContent","onPityUpdate"],[["get",["activeBanner"]],["helper",["action"],[["get",[null]],"onPityUpdate"],null]]]],false],["text","\\n        "],["close-element"],["text","\\n        "],["open-element","div",[]],["static-attr","class","milestone-tracker"],["flush-element"],["text","\\n          "],["append",["unknown",["milestone-rewards-tracker"]],false],["text","\\n        "],["close-element"],["text","\\n        "],["open-element","div",[]],["static-attr","class","pull-buttons"],["flush-element"],["text","\\n          "],["append",["helper",["pull-buttons-container"],null,[["activeBannerStatus","activeBannerSourceId","pityCount","pullCost","selectedOfferId","selectedItem","startCraftingCeremony","contentOwned"],[["get",["activeBannerStatus"]],["get",["activeBanner","sourceId"]],["get",["pityCount"]],["get",["pullCost"]],["get",["selectedOfferId"]],["get",["selectedItem"]],["helper",["action"],[["get",[null]],"startCraftingCeremony"],null],["get",["activeBanner","status","owned"]]]]],false],["text","\\n        "],["close-element"],["text","\\n      "],["close-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","right-container"],["flush-element"],["text","\\n        "],["append",["unknown",["troves-wallet"]],false],["text","\\n      "],["close-element"],["text","\\n    "],["close-element"],["text","\\n  "]],"locals":[]},{"statements":[["text","    "],["open-element","div",[]],["static-attr","class","standalone-container"],["flush-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","standalone-title-text"],["flush-element"],["append",["unknown",["tra","troves_hub_banner_empty_title"]],false],["close-element"],["text","\\n      "],["open-element","img",[]],["dynamic-attr","src",["concat",[["unknown",["emptyBannerImage"]]]]],["static-attr","class","standalone-image"],["flush-element"],["close-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","standalone-footer-text"],["flush-element"],["append",["unknown",["tra","troves_hub_banner_empty_footer"]],false],["close-element"],["text","\\n    "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["block",["if"],[["get",["isEmpty"]]],null,6,5]],"locals":[]},{"statements":[["text","    "],["open-element","div",[]],["static-attr","class","standalone-container"],["flush-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","standalone-title-text"],["flush-element"],["append",["unknown",["tra","troves_hub_banner_error_title"]],false],["close-element"],["text","\\n      "],["open-element","img",[]],["dynamic-attr","src",["concat",[["unknown",["errorBannerImage"]]]]],["static-attr","class","standalone-image"],["flush-element"],["close-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","standalone-footer-text"],["flush-element"],["append",["unknown",["tra","troves_hub_banner_error_footer"]],false],["close-element"],["text","\\n    "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["block",["if"],[["get",["hasBannerError"]]],null,8,7],["text","  "],["append",["unknown",["pull-error-dialog"]],false],["text","\\n"]],"locals":[]},{"statements":[["text","  "],["open-element","div",[]],["static-attr","class","loading-spinner"],["flush-element"],["text","\\n    "],["append",["unknown",["uikit-spinner"]],false],["text","\\n  "],["close-element"],["text","\\n"]],"locals":[]}],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, n) => {
        const s = n(1).Ember;
        e.exports = s.HTMLBars.template({
          id: "PInTa8yy",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-tft\\\\src\\\\lib\\\\troves\\\\addon\\\\templates\\\\components\\\\tft-troves-v2-first-time-flow.hbs\\" style-path=\\"null\\" js-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-tft\\\\src\\\\lib\\\\troves\\\\addon\\\\components\\\\tft-troves-v2-first-time-flow.js\\" "],["text","\\n"],["block",["tft-versioned-container"],null,[["name","version"],["trovesV2",1]],2]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","      "],["open-element","div",[]],["static-attr","class","tft-troves-v2-first-time-flow-content"],["dynamic-attr","style",["concat",["background-image: url(",["unknown",["backgroundImagePath"]],")"]]],["flush-element"],["text","\\n        "],["open-element","div",[]],["static-attr","class","header"],["flush-element"],["text","\\n          "],["open-element","div",[]],["static-attr","class","title"],["flush-element"],["append",["unknown",["tra","troves_ftf_title"]],false],["close-element"],["text","\\n        "],["close-element"],["text","\\n        "],["open-element","div",[]],["static-attr","class","splash-image-container"],["flush-element"],["text","\\n          "],["open-element","img",[]],["dynamic-attr","src",["unknown",["splashImagePath"]],null],["static-attr","class","splash-image"],["flush-element"],["close-element"],["text","\\n        "],["close-element"],["text","\\n        "],["open-element","div",[]],["static-attr","class","body text"],["flush-element"],["text","\\n          "],["append",["unknown",["tra","troves_ftf_body"]],false],["text","\\n        "],["close-element"],["text","\\n      "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["block",["uikit-modal"],null,[["type","dismissibleType","acceptText","closeButton","onAccept","onClose"],["DialogConfirm","inside",["get",["tra","troves_ftf_confirmation"]],true,["helper",["action"],[["get",[null]],"hideModal"],null],["helper",["action"],[["get",[null]],"hideModal"],null]]],0]],"locals":[]},{"statements":[["block",["if"],[["get",["showModal"]]],null,1]],"locals":[]}],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, n) => {
        const s = n(1).Ember;
        e.exports = s.HTMLBars.template({
          id: "g93oHf2b",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-tft\\\\src\\\\lib\\\\troves\\\\addon\\\\templates\\\\components\\\\troves-ceremony-milestone-rewards.hbs\\" style-path=\\"null\\" js-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-tft\\\\src\\\\lib\\\\troves\\\\addon\\\\components\\\\troves-ceremony-milestone-rewards.js\\" "],["text","\\n"],["block",["if"],[["get",["milestonesTriggered"]]],null,3]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","            "],["open-element","lol-uikit-flat-button",[]],["static-attr","class","continue-button"],["dynamic-attr","onclick",["helper",["action"],[["get",[null]],"close"],null],null],["flush-element"],["text","\\n              "],["append",["unknown",["tra","rotational_shop_ceremony_continue_text"]],false],["text","\\n            "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","            "],["append",["helper",["uikit-lottie"],null,[["class","noJsonCache","play","animationParams","animationReplacementText","imagePath","src","sfxSrc"],["milestone-lottie",true,true,["get",["animationParams"]],["get",["animationReplacementText"]],["get",["milestoneLottieParams","imagePath"]],["get",["milestoneLottieParams","src"]],["get",["trovesPromoAssets","troves-milestone-lottie-sfx"]]]]],false],["text","\\n"]],"locals":[]},{"statements":[["block",["vignette","content"],null,null,1],["block",["vignette","footer"],null,null,0]],"locals":["vignette"]},{"statements":[["text","  "],["open-element","div",[]],["static-attr","class","ceremony__container"],["flush-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","troves-ceremony-milestone-rewards-container"],["dynamic-attr","style",["concat",["background-image: url(\'",["unknown",["rotationalShopAssets","milestone-ceremony-background"]],"\')"]]],["flush-element"],["text","\\n"],["block",["uikit-vignette"],null,null,2],["text","    "],["close-element"],["text","\\n  "],["close-element"],["text","\\n"]],"locals":[]}],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, n) => {
        const s = n(1).Ember;
        e.exports = s.HTMLBars.template({
          id: "IwUDKJOB",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-tft\\\\src\\\\lib\\\\troves\\\\addon\\\\templates\\\\components\\\\troves-wallet.hbs\\" style-path=\\"null\\" js-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-tft\\\\src\\\\lib\\\\troves\\\\addon\\\\components\\\\troves-wallet.js\\" "],["text","\\n"],["open-element","div",[]],["static-attr","class","treasure-tokens-button"],["flush-element"],["text","\\n"],["block",["uikit-tooltip"],null,[["tooltipId","tooltipPosition"],["tft-troves-tokens-desc","left"]],5],["block",["tft-button"],null,[["iconImageURL","action","outerCircleRadius","minWidth"],["/fe/lol-uikit/images/icon_add.png","showTrovesTokensPurchaseDialog","30px",120]],4],["close-element"],["text","\\n"],["open-element","div",[]],["static-attr","class","icw"],["flush-element"],["text","\\n"],["block",["uikit-tooltip"],null,[["tooltipId","tooltipPosition"],["tft-rsc-description","left"]],3],["text","  "],["open-element","div",[]],["static-attr","class","tft-currency-button-label"],["flush-element"],["text","\\n    "],["open-element","img",[]],["static-attr","src","/fe/lol-tft/images/rotational-shop/TFT_Icon_PC.png"],["static-attr","class","tft-currency-icon"],["flush-element"],["close-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","tft-currency-amount"],["flush-element"],["text","\\n"],["block",["if"],[["get",["rss"]]],null,2],["text","    "],["close-element"],["text","\\n  "],["close-element"],["text","\\n"],["close-element"],["text","\\n"],["open-element","div",[]],["static-attr","class","icw"],["flush-element"],["text","\\n"],["block",["uikit-tooltip"],null,[["tooltipId","tooltipPosition"],["tft-rsc-description","left"]],1],["text","  "],["open-element","div",[]],["static-attr","class","tft-currency-button-label"],["flush-element"],["text","\\n    "],["open-element","img",[]],["static-attr","src","/fe/lol-tft/images/rotational-shop/TFT_Icon_SC.png"],["static-attr","class","tft-currency-icon"],["flush-element"],["close-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","tft-currency-amount"],["flush-element"],["text","\\n"],["block",["if"],[["get",["rss"]]],null,0],["text","    "],["close-element"],["text","\\n  "],["close-element"],["text","\\n"],["close-element"]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","        "],["append",["unknown",["rss","formattedSCAmountString"]],false],["text","\\n"]],"locals":[]},{"statements":[["text","    "],["open-element","lol-uikit-content-block",[]],["static-attr","type","tooltip-small"],["flush-element"],["text","\\n      "],["open-element","p",[]],["static-attr","class","rcp-fe-lol-tft-troves-wallet-tooltip-text"],["flush-element"],["append",["helper",["sanitize"],[["get",["standardCoinsDescription"]]],null],false],["close-element"],["text","\\n    "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","        "],["append",["unknown",["rss","formattedUPCAmountString"]],false],["text","\\n"]],"locals":[]},{"statements":[["text","    "],["open-element","lol-uikit-content-block",[]],["static-attr","type","tooltip-small"],["flush-element"],["text","\\n      "],["open-element","p",[]],["static-attr","class","rcp-fe-lol-tft-troves-wallet-tooltip-text"],["flush-element"],["append",["helper",["sanitize"],[["get",["premiumCoinsDescription"]]],null],false],["close-element"],["text","\\n    "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","    "],["open-element","div",[]],["static-attr","class","tft-currency-button-label"],["flush-element"],["text","\\n      "],["open-element","img",[]],["static-attr","src","/fe/lol-tft-troves/images/TFT_Currency_TreasureToken_80x80.png"],["static-attr","class","tft-currency-icon"],["flush-element"],["close-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","tft-currency-amount"],["flush-element"],["text","\\n        "],["append",["unknown",["formattedTrovesTokensAmount"]],false],["text","\\n      "],["close-element"],["text","\\n    "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","    "],["open-element","lol-uikit-content-block",[]],["static-attr","type","tooltip-small"],["flush-element"],["text","\\n      "],["open-element","p",[]],["static-attr","class","rcp-fe-lol-tft-troves-wallet-tooltip-text"],["flush-element"],["append",["unknown",["tra","troves_tokens_description"]],false],["close-element"],["text","\\n    "],["close-element"],["text","\\n"]],"locals":[]}],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, n) => {
        const s = n(1).Ember;
        e.exports = s.HTMLBars.template({
          id: "/JrBvStN",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-tft\\\\src\\\\lib\\\\rotational-shop\\\\addon\\\\templates\\\\components\\\\rotational-shop-grouped-items.hbs\\" style-path=\\"null\\" js-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-tft\\\\src\\\\lib\\\\rotational-shop\\\\addon\\\\components\\\\rotational-shop-grouped-items.js\\" "],["text","\\n\\n"],["block",["if"],[["get",["showGroupedEndTime"]]],null,3],["open-element","div",[]],["dynamic-attr","class",["concat",["rotational-shop-items-container ",["helper",["if"],[["get",["hasMultiple"]],"multiple"],null]]]],["flush-element"],["text","\\n"],["block",["if"],[["get",["hasItems"]]],null,2,0],["close-element"]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","    "],["open-element","div",[]],["static-attr","class","no-items-error-message-container"],["flush-element"],["text","\\n      "],["append",["unknown",["noItemsErrorMessage"]],false],["text","\\n    "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","      "],["open-element","div",[]],["static-attr","class","item-frame"],["flush-element"],["text","\\n        "],["append",["helper",["rotational-shop-item"],null,[["itemWithStoreId","frameDefinition","hasGroupedEndTime","onItemSelected","activeNav"],[["get",["content","item"]],["get",["content","frameDefinition"]],["get",["showGroupedEndTime"]],["helper",["action"],[["get",[null]],"onItemSelected"],null],["get",["activeNav"]]]]],false],["text","\\n      "],["close-element"],["text","\\n"]],"locals":["content"]},{"statements":[["block",["tft-custom-flex-wrap"],null,[["frames","columns","heightRatio"],[["get",["frames"]],4,1.1]],1]],"locals":[]},{"statements":[["text","  "],["open-element","div",[]],["static-attr","class","rotational-shop-end-time-container"],["flush-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","section-name"],["flush-element"],["append",["unknown",["name"]],false],["close-element"],["text","\\n      "],["append",["helper",["countdown-widget"],null,[["endDate","preCountdownEnabled","countdownEnabled","requireStartDateToTransition","hidePreCountdownAfterStartDate","hideCountdownAfterEndDate","endingWrappingText","endingLongTimeText"],[["get",["endTime"]],false,true,false,false,false,["get",["tra","tft_event_time_until_end"]],""]]],false],["text","\\n  "],["close-element"],["text","\\n"]],"locals":[]}],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, n) => {
        const s = n(1).Ember;
        e.exports = s.HTMLBars.template({
          id: "sGi70N9I",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-tft\\\\src\\\\lib\\\\rotational-shop\\\\addon\\\\templates\\\\components\\\\rotational-shop-header.hbs\\" style-path=\\"null\\" js-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-tft\\\\src\\\\lib\\\\rotational-shop\\\\addon\\\\components\\\\rotational-shop-header.js\\" "],["text","\\n"],["open-element","div",[]],["static-attr","class","currency-wrapper"],["flush-element"],["text","\\n"],["block",["if"],[["get",["showStandardCurrency"]]],null,4],["text","  "],["open-element","div",[]],["static-attr","class","icw"],["flush-element"],["text","\\n"],["block",["tft-tooltip"],null,[["tooltipId"],["tft-rsc-description"]],1],["block",["tft-button"],null,[["outerCircleRadius","hasAddIcon","minWidth","minHeight"],["30px",false,100,35]],0],["text","  "],["close-element"],["text","\\n"],["close-element"]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","        "],["open-element","div",[]],["static-attr","class","currency-button-label"],["flush-element"],["text","\\n          "],["open-element","div",[]],["static-attr","class","currency-icon"],["static-attr","style","background-image:url(\'/fe/lol-tft/images/rotational-shop/TFT_Icon_PC.png\')"],["flush-element"],["close-element"],["text","\\n          "],["open-element","div",[]],["static-attr","class","currency-amount"],["flush-element"],["text","\\n            "],["open-element","p",[]],["flush-element"],["append",["unknown",["rotationalShopService","formattedUPCAmountString"]],false],["close-element"],["text","\\n          "],["close-element"],["text","\\n        "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","      "],["open-element","lol-uikit-content-block",[]],["static-attr","type","tooltip-small"],["flush-element"],["text","\\n        "],["open-element","p",[]],["static-attr","class","rcp-fe-lol-tft-rotational-shop-header-tooltip-text"],["flush-element"],["append",["helper",["sanitize"],[["get",["premiumCoinsDescription"]]],null],false],["close-element"],["text","\\n      "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","          "],["open-element","div",[]],["static-attr","class","currency-button-label"],["flush-element"],["text","\\n            "],["open-element","div",[]],["static-attr","class","currency-icon"],["static-attr","style","background-image:url(\'/fe/lol-tft/images/rotational-shop/TFT_Icon_SC.png\')"],["flush-element"],["close-element"],["text","\\n            "],["open-element","div",[]],["static-attr","class","currency-amount"],["flush-element"],["text","\\n              "],["open-element","p",[]],["flush-element"],["append",["unknown",["rotationalShopService","formattedSCAmountString"]],false],["close-element"],["text","\\n            "],["close-element"],["text","\\n          "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","        "],["open-element","lol-uikit-content-block",[]],["static-attr","type","tooltip-small"],["flush-element"],["text","\\n          "],["open-element","p",[]],["static-attr","class","rcp-fe-lol-tft-rotational-shop-header-tooltip-text"],["flush-element"],["append",["helper",["sanitize"],[["get",["standardCoinsDescription"]]],null],false],["close-element"],["text","\\n        "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","    "],["open-element","div",[]],["static-attr","class","icw"],["flush-element"],["text","\\n"],["block",["tft-tooltip"],null,[["tooltipId"],["tft-rsc-description"]],3],["block",["tft-button"],null,[["outerCircleRadius","hasAddIcon","minWidth","minHeight"],["30px",false,100,35]],2],["text","    "],["close-element"],["text","\\n"]],"locals":[]}],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, n) => {
        const s = n(1).Ember;
        e.exports = s.HTMLBars.template({
          id: "ErZSPlwg",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-tft\\\\src\\\\lib\\\\rotational-shop\\\\addon\\\\templates\\\\components\\\\rotational-shop-item.hbs\\" style-path=\\"null\\" js-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-tft\\\\src\\\\lib\\\\rotational-shop\\\\addon\\\\components\\\\rotational-shop-item.js\\" "],["text","\\n"],["open-element","div",[]],["static-attr","class","item-container"],["dynamic-attr","style",["concat",[["unknown",["itemFrameImagePaths"]],["unknown",["costLabelImagePaths"]]]]],["dynamic-attr","clickable",["concat",[["unknown",["clickable"]]]]],["flush-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","cropped-item-background"],["dynamic-attr","style",["concat",["background-image: url(\'/lol-game-data/assets/",["unknown",["imagePath"]],"\'); --u1:",["unknown",["imageUV","u1"]],"; --u2:",["unknown",["imageUV","u2"]],"; --v1:",["unknown",["imageUV","v1"]],"; --v2:",["unknown",["imageUV","v2"]]]]],["flush-element"],["close-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","item-content-frame"],["flush-element"],["close-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","item-content"],["flush-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","upper"],["flush-element"],["text","\\n"],["block",["if"],[["get",["hasBanner"]]],null,4],["block",["if"],[["get",["showEndTime"]]],null,3],["text","    "],["close-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","lower"],["flush-element"],["text","\\n      "],["open-element","div",[]],["dynamic-attr","class",["concat",["price ",["helper",["if"],[["get",["grayout"]],"gray-out"],null]]]],["flush-element"],["text","\\n"],["block",["if"],[["get",["itemSold"]]],null,2,1],["text","      "],["close-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","name"],["flush-element"],["text","\\n        "],["append",["unknown",["item","name"]],false],["text","\\n      "],["close-element"],["text","\\n    "],["close-element"],["text","\\n  "],["close-element"],["text","\\n"],["close-element"],["text","\\n"]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","              "],["open-element","div",[]],["static-attr","class","icon"],["dynamic-attr","style",["concat",["background-image:url(\'",["unknown",["payment","icon"]],"\')"]]],["flush-element"],["close-element"],["text","\\n              "],["open-element","div",[]],["static-attr","class","amount"],["flush-element"],["text","\\n                "],["open-element","div",[]],["flush-element"],["append",["unknown",["payment","cost"]],false],["close-element"],["text","\\n              "],["close-element"],["text","\\n"]],"locals":["payment","index"]},{"statements":[["text","          "],["open-element","div",[]],["static-attr","class","currency"],["flush-element"],["text","\\n"],["block",["each"],[["get",["payments"]]],null,0],["text","          "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","          "],["open-element","div",[]],["static-attr","class","checkmark"],["dynamic-attr","style",["concat",["background-image:url(\'",["unknown",["rotationalShopAssets","checkmark-icon"]],"\')"]]],["flush-element"],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","        "],["append",["helper",["countdown-widget"],null,[["endDate","preCountdownEnabled","countdownEnabled","requireStartDateToTransition","hidePreCountdownAfterStartDate","hideCountdownAfterEndDate","endingWrappingText","endingLongTimeText"],[["get",["endTime"]],false,true,false,false,false,["get",["tra","tft_event_time_until_end"]],""]]],false],["text","\\n"]],"locals":[]},{"statements":[["text","        "],["open-element","div",[]],["static-attr","class","troves-icon"],["flush-element"],["text","\\n          "],["open-element","img",[]],["dynamic-attr","src",["concat",[["unknown",["rotationalShopAssets","troves-icon"]]]]],["flush-element"],["close-element"],["text","\\n        "],["close-element"],["text","\\n"]],"locals":[]}],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, n) => {
        const s = n(1).Ember;
        e.exports = s.HTMLBars.template({
          id: "ytu+WTsI",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-tft\\\\src\\\\lib\\\\rotational-shop\\\\addon\\\\templates\\\\components\\\\rotational-shop-item-detail-small.hbs\\" style-path=\\"null\\" js-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-tft\\\\src\\\\lib\\\\rotational-shop\\\\addon\\\\components\\\\rotational-shop-item-detail-small.js\\" "],["text","\\n"],["block",["uikit-modal"],null,[["type","dismissibleType","onClose"],["DialogDismiss","inside",["helper",["action"],[["get",[null]],"close"],null]]],6]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","        "],["append",["helper",["rotational-shop-redeem-button"],null,[["contentOwned","selectedItem","overrideButtonText","redeemCompleteCallback","redeemFailCallback"],[["get",["itemSold"]],["get",["selectedItem"]],["get",["newBalanceString"]],["helper",["action"],[["get",[null]],"redeemComplete"],null],["helper",["action"],[["get",[null]],"redeemFail"],null]]]],false],["text","\\n      "]],"locals":[]},{"statements":[["text","        "],["append",["helper",["rotational-shop-redeem-button"],null,[["contentOwned","selectedItem","showInsufficientButtonText","redeemCompleteCallback","redeemFailCallback"],[["get",["itemSold"]],["get",["selectedItem"]],true,["helper",["action"],[["get",[null]],"redeemComplete"],null],["helper",["action"],[["get",[null]],"redeemFail"],null]]]],false],["text","\\n"]],"locals":[]},{"statements":[["block",["if"],[["get",["insufficientBalance"]]],null,1,0]],"locals":[]},{"statements":[["text","        "],["append",["helper",["rotational-shop-redeem-button"],null,[["showButtonText","showTooltip","overrideButtonClick","overrideButtonContent"],[false,false,["helper",["action"],[["get",[null]],"close"],null],["get",["tra","rotational_shop_item_detail_small_continue"]]]]],false],["text","\\n"]],"locals":[]},{"statements":[["text","        "],["open-element","div",[]],["static-attr","class","error-message"],["flush-element"],["append",["unknown",["errorMessage"]],false],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","          "],["open-element","div",[]],["static-attr","class","checkmark"],["dynamic-attr","style",["concat",["background-image:url(\'",["unknown",["rotationalShopAssets","checkmark-icon"]],"\')"]]],["flush-element"],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","  "],["open-element","div",[]],["static-attr","class","rotational-shop-item-detail-small-modal"],["dynamic-attr","style",["concat",["--image-path: url(\'/lol-game-data/assets/",["unknown",["detailImagePath"]],"\');"]]],["flush-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","title"],["flush-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","title-row"],["flush-element"],["text","\\n"],["block",["if"],[["get",["redeemCompleted"]]],null,5],["text","        "],["open-element","div",[]],["static-attr","class","title-text"],["flush-element"],["text","\\n          "],["append",["unknown",["item","name"]],false],["text","\\n        "],["close-element"],["text","\\n      "],["close-element"],["text","\\n"],["block",["if"],[["get",["errorMessage"]]],null,4],["text","    "],["close-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","description small-text"],["flush-element"],["text","\\n      "],["append",["unknown",["description"]],false],["text","\\n    "],["close-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","button-container"],["flush-element"],["text","\\n"],["block",["if"],[["get",["redeemCompleted"]]],null,3,2],["text","    "],["close-element"],["text","\\n  "],["close-element"],["text","\\n"]],"locals":[]}],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, n) => {
        const s = n(1).Ember;
        e.exports = s.HTMLBars.template({
          id: "cYgeMfRs",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-tft\\\\src\\\\lib\\\\rotational-shop\\\\addon\\\\templates\\\\components\\\\rotational-shop-item-detail.hbs\\" style-path=\\"null\\" js-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-tft\\\\src\\\\lib\\\\rotational-shop\\\\addon\\\\components\\\\rotational-shop-item-detail.js\\" "],["text","\\n"],["open-element","div",[]],["static-attr","class","detail-header"],["flush-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","detail-header-left"],["flush-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","back-icon"],["dynamic-attr","onclick",["helper",["action"],[["get",[null]],"close"],null],null],["dynamic-attr","onmouseenter",["helper",["action"],[["get",[null]],"playBackButtonHoverSFX"],null],null],["flush-element"],["close-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","vertical-line"],["flush-element"],["close-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","name"],["flush-element"],["append",["unknown",["item","name"]],false],["close-element"],["text","\\n  "],["close-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","detail-header-right"],["flush-element"],["text","\\n    "],["append",["helper",["rotational-shop-header"],null,[["showStandardCurrency"],[false]]],false],["text","\\n  "],["close-element"],["text","\\n"],["close-element"],["text","\\n"],["open-element","div",[]],["static-attr","class","detail-body"],["flush-element"],["text","\\n"],["block",["if"],[["get",["errorMessage"]]],null,2,1],["close-element"],["text","\\n"],["open-element","div",[]],["static-attr","class","detail-footer"],["flush-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","footer-left"],["flush-element"],["close-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","description"],["flush-element"],["append",["unknown",["description"]],false],["close-element"],["text","\\n  "],["append",["helper",["rotational-shop-redeem-button"],null,[["contentOwned","selectedItem","showInsufficientButtonText","startCraftingCeremony","redeemStartCallback","redeemFailCallback"],[["get",["itemSold"]],["get",["selectedItem"]],true,["get",["startCraftingCeremony"]],["helper",["action"],[["get",[null]],"redeemStart"],null],["helper",["action"],[["get",[null]],"redeemFail"],null]]]],false],["text","\\n"],["close-element"]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","    "],["open-element","div",[]],["static-attr","class","boom-container"],["dynamic-attr","style",["concat",["background-image: url(\'",["unknown",["detailImagePath"]],"\')"]]],["flush-element"],["close-element"],["text","\\n  "]],"locals":[]},{"statements":[["block",["if"],[["get",["itemIsBoom"]]],null,0]],"locals":[]},{"statements":[["text","    "],["open-element","div",[]],["static-attr","class","error-message"],["flush-element"],["append",["unknown",["errorMessage"]],false],["close-element"],["text","\\n"]],"locals":[]}],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, n) => {
        const s = n(1).Ember;
        e.exports = s.HTMLBars.template({
          id: "lB47blnK",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-tft\\\\src\\\\lib\\\\rotational-shop\\\\addon\\\\templates\\\\components\\\\rotational-shop-nav.hbs\\" style-path=\\"null\\" js-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-tft\\\\src\\\\lib\\\\rotational-shop\\\\addon\\\\components\\\\rotational-shop-nav.js\\" "],["text","\\n"],["open-element","div",[]],["static-attr","id","rotational-shop-nav"],["dynamic-attr","class",["concat",["rotational-shop-nav ",["helper",["if"],[["get",["isSelected"]],"selected"],null]]]],["flush-element"],["text","\\n  "],["open-element","div",[]],["dynamic-attr","class",["concat",["nav-background ",["helper",["if"],[["get",["isSelected"]],"selected"],null]]]],["dynamic-attr","onmousemove",["helper",["action"],[["get",[null]],"setGlowMousePosition"],null],null],["flush-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","nav-glow"],["flush-element"],["close-element"],["text","\\n  "],["close-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","nav-icon"],["dynamic-attr","style",["concat",["background-image: url(\'",["unknown",["navIconImagePath"]],"\')"]]],["flush-element"],["close-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","nav-name"],["flush-element"],["append",["unknown",["navName"]],false],["close-element"],["text","\\n"],["block",["if"],[["get",["showPip"]]],null,0],["close-element"]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","    "],["open-element","div",[]],["static-attr","class","rotational-shop-nav-pip"],["flush-element"],["text","\\n      "],["append",["unknown",["call-to-action-pip"]],false],["text","\\n    "],["close-element"],["text","\\n"]],"locals":[]}],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, n) => {
        const s = n(1).Ember;
        e.exports = s.HTMLBars.template({
          id: "6/f+5fjp",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-tft\\\\src\\\\lib\\\\rotational-shop\\\\addon\\\\templates\\\\components\\\\rotational-shop-crafting-ceremony.hbs\\" style-path=\\"null\\" js-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-tft\\\\src\\\\lib\\\\rotational-shop\\\\addon\\\\components\\\\rotational-shop-crafting-ceremony.js\\" "],["text","\\n"],["block",["uikit-modal"],null,[["type","displayModal"],["DialogAlert",["get",["displayModal"]]]],6]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","      "],["append",["helper",["uikit-lottie"],null,[["class","noJsonCache","play","onAnimationComplete","animationParams","imagePath","src","sfxSrc"],["currency-lottie",true,true,["helper",["action"],[["get",[null]],"onCurrencyLottieAnimationComplete"],null],["get",["currenyLottieParams","animationParams"]],["get",["currenyLottieParams","imagePath"]],["get",["currenyLottieParams","src"]],["get",["currenyLottieParams","sfxSrc"]]]]],false],["text","\\n"]],"locals":[]},{"statements":[["text","      "],["open-element","uikit-video",[]],["static-attr","id","rotational-shop-crafting-ceremony-video"],["static-attr","class","crafting-ceremony-video"],["static-attr","cache-name","rcp-fe-lol-tft"],["static-attr","preload","true"],["dynamic-attr","src",["concat",[["unknown",["craftingCeremonyVideoPath"]]]]],["flush-element"],["text","\\n      "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","              "],["open-element","lol-uikit-flat-button",[]],["static-attr","class","continue-button"],["dynamic-attr","onclick",["helper",["action"],[["get",[null]],"closeCraftingCeremony"],null],null],["flush-element"],["text","\\n                "],["append",["unknown",["tra","rotational_shop_ceremony_continue_text"]],false],["text","\\n              "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","            "],["append",["helper",["uikit-lottie"],null,[["class","noJsonCache","play","animationParams","animationReplacementImages","animationReplacementText","imagePath","src","sfxSrc"],["mythic-lottie",true,true,["get",["mythicLottieParams","animationParams"]],["get",["mythicLottieParams","animationReplacementImages"]],["get",["mythicLottieParams","animationReplacementText"]],["get",["mythicLottieParams","imagePath"]],["get",["mythicLottieParams","src"]],["get",["mythicLottieParams","sfxSrc"]]]]],false],["text","\\n"]],"locals":[]},{"statements":[["block",["vignette","content"],null,null,3],["block",["vignette","footer"],null,null,2]],"locals":["vignette"]},{"statements":[["text","      "],["open-element","div",[]],["static-attr","class","mythic-lottie-container"],["flush-element"],["text","\\n"],["block",["uikit-vignette"],null,null,4],["text","      "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","  "],["open-element","div",[]],["static-attr","class","rotational-shop-crafting-ceremony-container rotational-shop-crafting-ceremony_background"],["flush-element"],["text","\\n"],["block",["if"],[["get",["showMythicLottie"]]],null,5],["text","    \\n"],["block",["if"],[["get",["showCraftingVideo"]]],null,1],["text","\\n"],["block",["if"],[["get",["showCurrencyLottie"]]],null,0],["text","  "],["close-element"],["text","\\n"]],"locals":[]}],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, n) => {
        const s = n(1).Ember;
        e.exports = s.HTMLBars.template({
          id: "lZoDSRmm",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-tft\\\\src\\\\lib\\\\rotational-shop\\\\addon\\\\templates\\\\components\\\\rotational-shop-redeem-button.hbs\\" style-path=\\"null\\" js-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-tft\\\\src\\\\lib\\\\rotational-shop\\\\addon\\\\components\\\\rotational-shop-redeem-button.js\\" "],["text","\\n"],["open-element","div",[]],["static-attr","class","redeem-button-container"],["dynamic-attr","onclick",["helper",["if"],[["get",["overrideButtonClick"]],["get",["overrideButtonClick"]],["helper",["action"],[["get",[null]],"clickAction"],null]],null],null],["flush-element"],["text","\\n"],["block",["if"],[["get",["showTooltip"]]],null,22],["text","\\n"],["open-element","lol-uikit-flat-button",[]],["static-attr","class","button glow"],["dynamic-attr","disabled",["helper",["if"],[["get",["overrideButtonClick"]],false,["get",["isDisabledForRedeem"]]],null],null],["flush-element"],["text","\\n"],["block",["if"],[["get",["isPurchasing"]]],null,17,16],["close-element"],["text","\\n\\n"],["block",["if"],[["get",["showButtonText"]]],null,12],["text","\\n"],["block",["if"],[["get",["showRedeemModal"]]],null,3],["block",["if"],[["get",["showInsufficientModal"]]],null,1],["close-element"]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","  "],["open-element","div",[]],["static-attr","class","tft-rotational-shop-redeem-dialog-container"],["dynamic-attr","style",["concat",["background-image:url(",["unknown",["redeemDialogBackground"]],")"]]],["flush-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","redeem-dialog-title redeem-insufficient-dialog-title"],["flush-element"],["append",["unknown",["insufficientDialogTitleText"]],false],["close-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","redeem-dialog-content"],["flush-element"],["append",["unknown",["insufficientDialogContentText"]],false],["close-element"],["text","\\n  "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["block",["uikit-modal"],null,[["type","dismissibleType","acceptText","closeButton","onAccept","onClose"],["DialogConfirm","inside",["get",["tra","troves_redeem_insufficient_button_accept_text"]],true,["helper",["action"],[["get",[null]],"hideSufficientModal"],null],["helper",["action"],[["get",[null]],"hideSufficientModal"],null]]],0]],"locals":[]},{"statements":[["text","  "],["open-element","div",[]],["static-attr","class","tft-rotational-shop-redeem-dialog-container"],["dynamic-attr","style",["concat",["background-image:url(",["unknown",["redeemDialogBackground"]],")"]]],["flush-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","redeem-dialog-title"],["flush-element"],["append",["unknown",["redeemDialogTitleText"]],false],["close-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","redeem-dialog-content"],["flush-element"],["append",["helper",["sanitize"],[["get",["redeemDialogContentText"]]],null],false],["close-element"],["text","\\n  "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["block",["uikit-modal"],null,[["type","dismissibleType","acceptText","closeButton","onAccept","onClose"],["DialogConfirm","inside",["get",["tra","troves_redeem_button_accept_text"]],true,["helper",["action"],[["get",[null]],"onRedeem"],null],["helper",["action"],[["get",[null]],"hideRedeemModal"],null]]],2]],"locals":[]},{"statements":[["text","    "],["open-element","div",[]],["static-attr","class","pull-button-text"],["flush-element"],["append",["unknown",["defaultButtonText"]],false],["close-element"],["text","\\n  "]],"locals":[]},{"statements":[["text","      "],["open-element","div",[]],["static-attr","class","pull-button-text"],["flush-element"],["append",["unknown",["defaultButtonText"]],false],["close-element"],["text","\\n    "]],"locals":[]},{"statements":[["text","      "],["open-element","div",[]],["static-attr","class","pull-button-text insufficient-button-text"],["flush-element"],["append",["unknown",["insufficientButtonText"]],false],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["block",["if"],[["get",["isInsufficientAfterPurchase"]]],null,6,5]],"locals":[]},{"statements":[["text","      "],["open-element","div",[]],["static-attr","class","pull-button-text"],["flush-element"],["append",["unknown",["defaultButtonText"]],false],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["block",["if"],[["get",["contentOwned"]]],null,8,7]],"locals":[]},{"statements":[["block",["if"],[["get",["showInsufficientButtonText"]]],null,9,4]],"locals":[]},{"statements":[["text","    "],["open-element","div",[]],["static-attr","class","pull-button-text"],["flush-element"],["append",["unknown",["overrideButtonText"]],false],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["block",["if"],[["get",["overrideButtonText"]]],null,11,10]],"locals":[]},{"statements":[["text","        "],["open-element","img",[]],["dynamic-attr","src",["concat",[["unknown",["paymentDetail","currencyImagePath"]]]]],["static-attr","class","pull-currency-icon"],["dynamic-attr","disabled",["unknown",["isDisabledForRedeem"]],null],["flush-element"],["close-element"],["text","\\n        "],["open-element","span",[]],["static-attr","class","pull-button-holder-text"],["flush-element"],["append",["unknown",["paymentDetail","cost"]],false],["close-element"],["text","\\n"]],"locals":["paymentDetail"]},{"statements":[["block",["each"],[["get",["paymentDetails"]]],null,13]],"locals":[]},{"statements":[["text","      "],["append",["unknown",["overrideButtonContent"]],false],["text","\\n"]],"locals":[]},{"statements":[["block",["if"],[["get",["overrideButtonContent"]]],null,15,14]],"locals":[]},{"statements":[["text","    "],["append",["unknown",["uikit-spinner"]],false],["text","\\n"]],"locals":[]},{"statements":[["text","        "],["open-element","lol-uikit-content-block",[]],["static-attr","type","tooltip-large"],["flush-element"],["text","\\n          "],["open-element","p",[]],["flush-element"],["append",["unknown",["insufficientBalanceTooltipDescription"]],false],["close-element"],["text","\\n        "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["block",["tft-tooltip"],null,[["tooltipId"],["tft-rotational-shop-item-detail-small-insufficient-balance"]],18]],"locals":[]},{"statements":[["block",["if"],[["get",["isInsufficient"]]],null,19]],"locals":[]},{"statements":[],"locals":[]},{"statements":[["block",["if"],[["get",["contentOwned"]]],null,21,20]],"locals":[]}],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, n) => {
        const s = n(1).Ember;
        e.exports = s.HTMLBars.template({
          id: "fIK483M6",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-tft\\\\src\\\\lib\\\\rotational-shop\\\\addon\\\\templates\\\\components\\\\rotational-shop.hbs\\" style-path=\\"null\\" js-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-tft\\\\src\\\\lib\\\\rotational-shop\\\\addon\\\\components\\\\rotational-shop.js\\" "],["text","\\n"],["open-element","div",[]],["static-attr","class","rotational-shop-root-container"],["flush-element"],["text","\\n"],["block",["if"],[["get",["showCraftingCeremony"]]],null,9],["text","  "],["open-element","div",[]],["static-attr","class","rotational-shop-root-body"],["flush-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","rotational-shop-left-container"],["flush-element"],["text","\\n"],["block",["each"],[["get",["navs"]]],null,8],["text","    "],["close-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","rotational-shop-right-container"],["flush-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","rotational-shop-root-header"],["flush-element"],["text","\\n        "],["append",["unknown",["rotational-shop-header"]],false],["text","\\n      "],["close-element"],["text","\\n      "],["open-element","lol-uikit-scrollable",[]],["static-attr","class","rotational-shop-scroller"],["static-attr","overflow-masks","enabled"],["dynamic-attr","onscroll",["helper",["action"],[["get",[null]],"onScroll"],null],null],["flush-element"],["text","\\n"],["block",["if"],[["get",["hasDisplayedGroups"]]],null,7,5],["block",["if"],[["get",["isSeasonalTab"]]],null,4],["text","      "],["close-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","scroll-container-vignette"],["flush-element"],["close-element"],["text","\\n    "],["close-element"],["text","\\n  "],["close-element"],["text","\\n"],["block",["if"],[["get",["showItemModal"]]],null,3],["close-element"]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","        "],["append",["helper",["rotational-shop-item-detail"],null,[["closeItemDetail","selectedItem","startCraftingCeremony"],[["helper",["action"],[["get",[null]],"hideItemModal"],null],["get",["selectedItem"]],["helper",["action"],[["get",[null]],"startCraftingCeremony"],null]]]],false],["text","\\n"]],"locals":[]},{"statements":[["block",["tft-content-viewport"],null,[["fullHeight"],[true]],0]],"locals":[]},{"statements":[["text","      "],["append",["helper",["rotational-shop-item-detail-small"],null,[["closeItemDetail","selectedItem"],[["helper",["action"],[["get",[null]],"hideItemModal"],null],["get",["selectedItem"]]]]],false],["text","\\n"]],"locals":[]},{"statements":[["block",["if"],[["get",["useSmallItemDetail"]]],null,2,1]],"locals":[]},{"statements":[["text","          "],["open-element","div",[]],["static-attr","class","legacy-store-link-padded"],["flush-element"],["text","\\n            "],["open-element","div",[]],["static-attr","class","legacy-store-link-container"],["flush-element"],["text","\\n              "],["open-element","div",[]],["static-attr","class","icon-background"],["dynamic-attr","style",["concat",["background-image: url(\'",["unknown",["rotationalShopAssets","legacy-store-link-background"]],"\');"]]],["flush-element"],["text","\\n                "],["open-element","div",[]],["static-attr","class","icon"],["dynamic-attr","style",["concat",["background-image: url(\'",["unknown",["rotationalShopAssets","legacy-store-link-icon"]],"\');"]]],["flush-element"],["close-element"],["text","\\n              "],["close-element"],["text","\\n              "],["open-element","div",[]],["static-attr","class","description centered"],["flush-element"],["text","\\n                "],["append",["unknown",["tra","LoLStoreLinkDescription"]],false],["text","\\n              "],["close-element"],["text","\\n              "],["open-element","lol-uikit-flat-button",[]],["static-attr","class","link"],["static-attr","primary","true"],["dynamic-attr","onclick",["helper",["action"],[["get",[null]],"goToLegacyStore"],null],null],["flush-element"],["text","\\n                "],["append",["unknown",["tra","rotational_shop_legacy_store_link_go"]],false],["text","\\n              "],["close-element"],["text","\\n            "],["close-element"],["text","\\n          "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","          "],["open-element","div",[]],["static-attr","class","no-displayed-groups-error-container"],["flush-element"],["text","\\n            "],["append",["unknown",["noDisplayedGroupsErrorMessage"]],false],["text","\\n          "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","            "],["append",["helper",["rotational-shop-grouped-items"],null,[["groupedItems","activeNav","onItemSelected"],[["get",["groupedItems"]],["get",["activeNav"]],["helper",["action"],[["get",[null]],"onItemSelected"],null]]]],false],["text","\\n"]],"locals":["groupedItems","index"]},{"statements":[["block",["each"],[["get",["displayedGroups"]]],null,6]],"locals":[]},{"statements":[["text","        "],["append",["helper",["rotational-shop-nav"],null,[["nav","activeNav","onNavSelected"],[["get",["nav"]],["get",["activeNav"]],["helper",["action"],[["get",[null]],"onNavSelected"],null]]]],false],["text","\\n"]],"locals":["nav","index"]},{"statements":[["text","    "],["append",["helper",["rotational-shop-crafting-ceremony"],null,[["item","closeAction"],[["get",["selectedItem","item"]],["helper",["action"],[["get",[null]],"endCraftingCeremony"],null]]]],false],["text","\\n"]],"locals":[]}],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, n) => {
        const s = n(1).Ember;
        e.exports = s.HTMLBars.template({
          id: "odC0opCJ",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-tft\\\\src\\\\app\\\\templates\\\\rotational-shop.hbs\\" style-path=\\"null\\" js-path=\\"null\\" "],["text","\\n"],["open-element","div",[]],["static-attr","class","rcp-fe-lol-tft-application-background"],["dynamic-attr","style",["concat",["background-image:url(",["unknown",["shopBackground"]],")"]]],["flush-element"],["text","\\n  "],["append",["helper",["rotational-shop"],null,[["setActiveNav"],[["helper",["action"],[["get",[null]],"setActiveNav"],null]]]],false],["text","\\n"],["close-element"]],"locals":[],"named":[],"yields":[],"blocks":[],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        var s = n(1),
          a = n(78),
          o = n(159);
        const l = "/lol-tft-troves/v1/purchase",
          i = "/lol-tft-troves/v1/order-notifications/";
        var r = s.Ember.Component.extend({
          classNames: ["tft-troves-item-purchase"],
          layout: n(241),
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
            this._super(...arguments);
          },
          willDestroy() {
            this._clearPurchaseOrderNotificationTimer(),
              this._super(...arguments);
          },
          step: s.Ember.computed("offer.quantity", function () {
            const e = this.get("offer.quantity");
            return isNaN(e) || e < 0 ? 1 : e;
          }),
          multiplierStep: s.Ember.computed("step", "multiplier", function () {
            return this.get("step") * this.get("multiplier");
          }),
          negativeMultiplier: s.Ember.computed("multiplier", function () {
            return -this.get("multiplier");
          }),
          tokenQuantity: s.Ember.computed("quantity", "step", function () {
            return this.get("quantity") * this.get("step");
          }),
          plusButtonDisabled: s.Ember.computed(
            "quantity",
            "offer.maxQuantity",
            function () {
              const e = this.get("offer.maxQuantity");
              return !(isNaN(e) || e < 0) && this.get("quantity") >= e;
            },
          ),
          minusButtonDisabled: s.Ember.computed(
            "quantity",
            "offer.minQuantity",
            function () {
              const e = this.get("offer.minQuantity");
              return !(isNaN(e) || e < 0) && this.get("quantity") <= e;
            },
          ),
          totalPrice: s.Ember.computed("quantity", "offer.price", function () {
            let e = this.get("offer.price");
            return isNaN(e) && (e = 0), this.get("quantity") * e;
          }),
          newBalance: s.Ember.computed(
            "totalPrice",
            "tftService.rpAmount",
            function () {
              return this.get("tftService.rpAmount") - this.get("totalPrice");
            },
          ),
          newBalanceText: s.Ember.computed("newBalance", function () {
            return this.get("tra").formatString("tft_purchase_new_balance", {
              balance: this.get("newBalance"),
            });
          }),
          notEnoughRp: s.Ember.computed.lt("newBalance", 0),
          tokenPurchaseSuccessText: s.Ember.computed(
            "tokenQuantity",
            function () {
              return `<p class="purchase-success-quantity">${this.get("tra").formatString("troves_tokens_quantity", { quantity: this.get("tokenQuantity") })}</p><p class="purchase-success-message">${this.get("tra").formatString("troves_tokens_granting", { quantity: this.get("tokenQuantity") })}</p>`;
            },
          ),
          tokenLimit: s.Ember.computed(
            "offer.maxQuantity",
            "offer.quantity",
            function () {
              return this.get("offer.maxQuantity") * this.get("offer.quantity");
            },
          ),
          iconUrl: s.Ember.computed(
            "isPurchasing",
            "purchaseError",
            "purchaseSuccess",
            "offer.iconUrl",
            function () {
              return this.get("isPurchasing")
                ? "/fe/lol-tft-troves/images/purchase-loading.gif"
                : this.get("purchaseError")
                  ? "/fe/lol-tft-troves/images/purchase-warning.png"
                  : this.get("offer.iconUrl");
            },
          ),
          title: s.Ember.computed(
            "isPurchasing",
            "purchaseError",
            "purchaseSuccess",
            "offer.name",
            function () {
              if (this.get("isPurchasing"))
                return this.get("tra.tft_purchase_title_loading");
              if (this.get("purchaseError"))
                return this.get("tra.tft_purchase_error_title");
              if (this.get("purchaseSuccess"))
                return this.get("tra.tft_purchase_title_success");
              return this.get("tra").get("troves_tokens_title");
            },
          ),
          itemDescription: s.Ember.computed(
            "isPurchasing",
            "purchaseError",
            "purchaseSuccess",
            "offer.description",
            function () {
              return this.get("purchaseError")
                ? this.get("errorMessage")
                : this.get("purchaseSuccess") || this.get("isPurchasing")
                  ? ""
                  : this.get("offer.description");
            },
          ),
          completeButtonText: s.Ember.computed("purchaseSuccess", function () {
            return this.get("purchaseSuccess")
              ? this.get("tra.tft_purchase_button_complete")
              : this.get("tra.tft_purchase_button_close");
          }),
          confirmationText: s.Ember.computed(
            "isPurchasing",
            "purchaseError",
            "purchaseSuccess",
            function () {
              return this.get("isPurchasing")
                ? this.get("tra.tft_purchase_message_loading")
                : this.get("purchaseError")
                  ? this.get("tra.tft_purchase_error_try_later")
                  : this.get("purchaseSuccess")
                    ? this.get("tokenPurchaseSuccessText")
                    : "";
            },
          ),
          showCompleteButton: s.Ember.computed(
            "purchaseSuccess",
            "purchaseError",
            function () {
              return this.get("purchaseSuccess") || this.get("purchaseError");
            },
          ),
          isPurchaseInitializing: s.Ember.computed(
            "isPurchasing",
            "purchaseError",
            "purchaseSuccess",
            function () {
              return (
                !this.get("isPurchasing") &&
                !this.get("purchaseError") &&
                !this.get("purchaseSuccess")
              );
            },
          ),
          showQuantityButtons: s.Ember.computed(
            "isPurchaseInitializing",
            "offer.incrementalPurchase",
            function () {
              return (
                this.get("isPurchaseInitializing") &&
                this.get("offer.incrementalPurchase")
              );
            },
          ),
          showQuantityLimit: s.Ember.computed(
            "isPurchaseInitializing",
            "offer.maxQuantity",
            function () {
              return (
                this.get("isPurchaseInitializing") &&
                this.get("offer.maxQuantity") > 0
              );
            },
          ),
          actions: {
            updateQuantity(e, t) {
              if (
                (e > 0 && this.get("plusButtonDisabled")) ||
                (e < 0 && this.get("minusButtonDisabled"))
              )
                return;
              let n = this.get("offer.minQuantity");
              isNaN(n) && (n = 1);
              let s = this.get("offer.maxQuantity");
              isNaN(s) && (s = -1);
              let a = this.get("quantity") + e;
              n > 0 && a < n ? (a = n) : s > 0 && a > s && (a = s),
                this.set("quantity", a),
                this.send("playSound", t);
            },
            makePurchase() {
              if (this.get("offer"))
                return (
                  this.set("isPurchasing", !0),
                  this.set("purchaseSuccess", !1),
                  s.db
                    .post(l, {
                      offerId: this.get("offer.id"),
                      quantity: this.get("quantity"),
                    })
                    .then(this._handlePurchaseRequestCompleted.bind(this))
                    .catch(this._handlePurchaseError.bind(this))
                );
            },
            endPurchase() {
              this.element &&
                this.element.dispatchEvent(
                  new Event("closeButtonClick", { bubbles: !0 }),
                );
            },
            playSound(e) {
              const t = o.SFX[e];
              t && t.play();
            },
          },
          _handlePurchaseRequestCompleted(e) {
            if (e) {
              const t = e.data && e.data.id;
              if (!t) return void this._handlePurchaseError();
              this.set("currentOrderId", t),
                s.db.addObserver(i + t, this, (e) => {
                  e &&
                    (this.set("orderNotifications", e),
                    this._clearPurchaseOrderNotificationTimer(),
                    e.status === a.CAP_STATUS_COMPLETE
                      ? this._handlePurchaseCompleted()
                      : this._handlePurchaseError(),
                    this.set("currentOrderId", null),
                    s.db.removeObserver(i + e.orderId, this));
                });
              const n = setTimeout(() => {
                this._handlePurchaseOrderNotificationTimeout();
              }, a.MAX_WAITING_TIME_IN_MS);
              this.set("currentRmsNotificationTimer", n);
            } else this._handlePurchaseCompleted();
          },
          _handlePurchaseCompleted() {
            this.set("isPurchasing", !1), this.set("purchaseSuccess", !0);
          },
          _handlePurchaseError() {
            this.set("isPurchasing", !1),
              this.set("purchaseSuccess", !1),
              this.set("purchaseError", !0);
            const e = this.get("orderNotifications");
            e && e.errorCode
              ? (e.data &&
                  e.data.availableQuantity &&
                  (e.data.availableQuantity =
                    e.data.availableQuantity * this.get("step")),
                this.set(
                  "errorMessage",
                  this.get("tra").formatString(
                    "troves_store_order_error_code_" + e.errorCode,
                    e.data,
                  ),
                ))
              : this.set(
                  "errorMessage",
                  this.get("tra.tft_purchase_error_generic"),
                );
          },
          _handlePurchaseOrderNotificationTimeout() {
            this._handlePurchaseError(), this.set("currentOrderId", null);
          },
          _clearPurchaseOrderNotificationTimer() {
            const e = this.get("currentRmsNotificationTimer");
            e && (clearTimeout(e), this.set("currentOrderId", null));
          },
        });
        t.default = r;
      },
      (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        var s = n(1),
          a = n(2);
        n(271);
        const o = s.UIKit.getVignetteCelebrationManager();
        var l = s.Ember.Component.extend({
          classNames: [`${a.PLUGIN_NAME}-reward-celebration`],
          layout: n(272),
          selectedReward: null,
          softSelectionMade: !1,
          didDestroyElement() {
            null !== this.get("selectedReward") &&
              this.set("selectedReward", null);
          },
          actions: {
            selectReward(e, t) {
              t.target.disabled ||
                (null !== this.get("selectedReward") &&
                  this.set("selectedReward.isSelected", !1),
                this.set("selectedReward", e),
                this.set("selectedReward.isSelected", !0),
                this.set("softSelectionMade", !0),
                o.update({ id: this.id, data: { nextButtonEnabled: !0 } }));
            },
          },
        });
        t.default = l;
      },
      (e, t, n) => {
        "use strict";
        n.r(t);
      },
      (e, t, n) => {
        const s = n(1).Ember;
        e.exports = s.HTMLBars.template({
          id: "rtoHnPaf",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-tft\\\\src\\\\app\\\\components\\\\reward-celebration\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-tft\\\\src\\\\app\\\\components\\\\reward-celebration\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-tft\\\\src\\\\app\\\\components\\\\reward-celebration\\\\index.js\\" "],["text","\\n"],["open-element","div",[]],["static-attr","class","rewards-container"],["flush-element"],["text","\\n"],["block",["each"],[["get",["rewards"]]],null,2],["close-element"]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","      "],["open-element","div",[]],["static-attr","class","reward"],["flush-element"],["text","\\n        "],["open-element","div",[]],["dynamic-attr","class",["concat",["reward-icon ",["unknown",["reward","rewardType"]]]]],["flush-element"],["text","\\n          "],["open-element","img",[]],["dynamic-attr","src",["unknown",["reward","iconUrl"]],null],["flush-element"],["close-element"],["text","\\n        "],["close-element"],["text","\\n        "],["open-element","div",[]],["static-attr","class","reward-description-wrapper"],["flush-element"],["text","\\n          "],["open-element","div",[]],["static-attr","class","reward-description"],["flush-element"],["append",["unknown",["reward","description"]],false],["close-element"],["text","\\n        "],["close-element"],["text","\\n      "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","      "],["open-element","div",[]],["dynamic-attr","onclick",["helper",["action"],[["get",[null]],"selectReward",["get",["reward"]]],null],null],["dynamic-attr","class",["concat",["reward selectable \\n          ",["helper",["if"],[["get",["reward","isSelected"]],"selected"],null]," \\n          ",["helper",["if"],[["get",["softSelectionMade"]],"selection-made"],null]]]],["flush-element"],["text","\\n        "],["open-element","div",[]],["static-attr","class","brightener-bg"],["flush-element"],["close-element"],["text","\\n        "],["open-element","div",[]],["static-attr","class","dimmer-bg"],["flush-element"],["close-element"],["text","\\n        "],["open-element","div",[]],["static-attr","class","radial-glow"],["flush-element"],["close-element"],["text","\\n        "],["open-element","div",[]],["dynamic-attr","class",["concat",["reward-icon ",["unknown",["reward","rewardType"]]]]],["flush-element"],["text","\\n          "],["open-element","img",[]],["dynamic-attr","src",["unknown",["reward","iconUrl"]],null],["flush-element"],["close-element"],["text","\\n        "],["close-element"],["text","\\n        "],["open-element","div",[]],["static-attr","class","reward-description-wrapper"],["flush-element"],["text","\\n          "],["open-element","div",[]],["static-attr","class","reward-description"],["flush-element"],["append",["unknown",["reward","description"]],false],["close-element"],["text","\\n        "],["close-element"],["text","\\n      "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["block",["if"],[["get",["selectable"]]],null,1,0]],"locals":["reward"]}],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        var s = n(1),
          a = n(2);
        n(274);
        var o = s.Ember.Component.extend({
          classNames: [`${a.PLUGIN_NAME}-reward-celebration-v2`],
          layout: n(275),
          rewardsPerPage: 10,
          currentPage: 1,
          pageCount: s.Ember.computed("rewardsPerPage", function () {
            const e = this.get("rewards"),
              t = this.get("rewardsPerPage");
            return Math.ceil(e.length / t);
          }),
          isOnePage: s.Ember.computed.equal("pageCount", 1),
          isFirstPage: s.Ember.computed.equal("currentPage", 1),
          isLastPage: s.Ember.computed("currentPage", "pageCount", function () {
            return this.get("pageCount") === this.get("currentPage");
          }),
          paginatedRewards: s.Ember.computed(
            "rewards.@each",
            "pageCount",
            "currentPage",
            function () {
              const e = this.get("rewards"),
                t = this.get("rewardsPerPage"),
                n = this.get("pageCount"),
                s = this.get("currentPage"),
                a = {};
              for (let o = 1; o <= n; o++) {
                const n = e.slice((o - 1) * t, o * t);
                a[o] = { isSelected: o === s, contents: n };
              }
              return a;
            },
          ),
          currentPageRewards: s.Ember.computed(
            "paginatedRewards",
            "currentPage",
            function () {
              return this.get("paginatedRewards")[this.get("currentPage")]
                .contents;
            },
          ),
          selectedPageLookup: s.Ember.computed(
            "currentPage",
            "pageCount",
            function () {
              const e = this.get("currentPage"),
                t = this.get("pageCount"),
                n = {};
              for (let s = 1; s <= t; s++) n[s] = s === e;
              return n;
            },
          ),
          playClickSounds() {
            s.Audio.getChannel("sfx-ui").playSound(
              "/fe/lol-static-assets/sounds/sfx-uikit-grid-click.ogg",
            ),
              s.Audio.getChannel("sfx-ui").playSound(
                "/fe/lol-static-assets/sounds/sfx-uikit-grid-click-release.ogg",
              );
          },
          setPage(e) {
            this.playClickSounds();
            const t = parseInt(this.get("pageCount"));
            (e = parseInt(e)) >= 1 && e <= t && this.set("currentPage", e);
          },
          actions: {
            setPage(e) {
              this.setPage(e);
            },
            nextPage() {
              this.playClickSounds(), this.setPage(1 + this.get("currentPage"));
            },
            previousPage() {
              this.playClickSounds(), this.setPage(this.get("currentPage") - 1);
            },
          },
        });
        t.default = o;
      },
      (e, t, n) => {
        "use strict";
        n.r(t);
      },
      (e, t, n) => {
        const s = n(1).Ember;
        e.exports = s.HTMLBars.template({
          id: "HvU1j5HT",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-tft\\\\src\\\\app\\\\components\\\\reward-celebration-v2\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-tft\\\\src\\\\app\\\\components\\\\reward-celebration-v2\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-tft\\\\src\\\\app\\\\components\\\\reward-celebration-v2\\\\index.js\\" "],["text","\\n"],["open-element","div",[]],["static-attr","class","celebration-container"],["flush-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","reward-page"],["flush-element"],["text","\\n"],["block",["each"],[["get",["currentPageRewards"]]],null,4],["text","      "],["close-element"],["text","\\n    \\n\\n"],["block",["unless"],[["get",["isOnePage"]]],null,3],["text","    "],["block",["unless"],[["get",["isFirstPage"]]],null,1],["text","\\n    "],["block",["unless"],[["get",["isLastPage"]]],null,0],["text","\\n"],["close-element"],["text","\\n"]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text"," "],["open-element","a",[]],["dynamic-attr","class",["concat",["right-arrow ",["helper",["if"],[["get",["isLastPage"]],"hidden"],null]]]],["modifier",["action"],[["get",[null]],"nextPage"]],["flush-element"],["close-element"],["text"," "]],"locals":[]},{"statements":[["text"," "],["open-element","a",[]],["static-attr","class","left-arrow"],["modifier",["action"],[["get",[null]],"previousPage"]],["flush-element"],["close-element"],["text"," "]],"locals":[]},{"statements":[["text","        "],["open-element","a",[]],["dynamic-attr","class",["concat",["page-selector ",["helper",["if"],[["get",["rewards","isSelected"]],"selected"],null]]]],["modifier",["action"],[["get",[null]],"setPage",["get",["page"]]]],["flush-element"],["close-element"],["text","\\n"]],"locals":["page","rewards"]},{"statements":[["text","    "],["open-element","div",[]],["static-attr","class","page-select"],["flush-element"],["text","\\n"],["block",["each"],[["helper",["-each-in"],[["get",["paginatedRewards"]]],null]],null,2],["text","    "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","            "],["open-element","div",[]],["dynamic-attr","class",["concat",["reward ",["unknown",["reward","rewardType"]]]]],["dynamic-attr","style",["concat",["background-image: url(\'",["unknown",["reward","iconUrl"]],"\')"]]],["flush-element"],["close-element"],["text","\\n"]],"locals":["reward"]}],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        var s = n(1),
          a = n(2);
        n(277);
        var o = s.Ember.Component.extend({
          classNames: [`${a.EVENT_DAILY_LOGIN_CELEBRATION_NAME}`],
          layout: n(278),
          rewards: null,
          rewardWidth: s.Ember.computed("rewards", function () {
            const e = this.get("rewards");
            return Array.isArray(e) && e.length > 0
              ? Math.max(20, 100 / e.length)
              : 0;
          }),
        });
        t.default = o;
      },
      (e, t, n) => {
        "use strict";
        n.r(t);
      },
      (e, t, n) => {
        const s = n(1).Ember;
        e.exports = s.HTMLBars.template({
          id: "JDISQhKD",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-tft\\\\src\\\\app\\\\components\\\\tft-event-daily-login-celebration\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-tft\\\\src\\\\app\\\\components\\\\tft-event-daily-login-celebration\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-tft\\\\src\\\\app\\\\components\\\\tft-event-daily-login-celebration\\\\index.js\\" "],["text","\\n"],["block",["each"],[["get",["rewards"]]],null,0]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","  "],["open-element","div",[]],["static-attr","class","reward"],["dynamic-attr","style",["concat",["--reward-width: ",["unknown",["rewardWidth"]]]]],["flush-element"],["text","\\n    "],["append",["helper",["tft-event-daily-login-reward-item"],null,[["class","milestone","showHeader"],["daily-login-reward-item",["get",["reward","milestone"]],false]]],false],["text","\\n  "],["close-element"],["text","\\n"]],"locals":["reward"]}],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        t.default = class {
          constructor(e) {
            this._api = e;
          }
          show(e) {
            return this._api.show(e).then(() => this);
          }
          hide() {}
          getBattlePassMilestone() {
            return {
              BattlepassMilestoneComponent: n(29).default,
              TftService: n(218).default,
              TftTooltipComponent: n(21).default,
            };
          }
          showTroves(e = 1) {
            return this._api.showTroves(e);
          }
          showEventPass() {
            return this._api.showEventPass();
          }
          setEventsData(e, t) {
            this._api.setEventsData(e, t);
          }
          setPromoButtonsData(e, t) {
            this._api.setPromoButtonsData(e, t);
          }
        };
      },
    ],
    t = {};
  function n(s) {
    var a = t[s];
    if (void 0 !== a) return a.exports;
    var o = (t[s] = { exports: {} });
    return e[s](o, o.exports, n), o.exports;
  }
  (n.r = (e) => {
    "undefined" != typeof Symbol &&
      Symbol.toStringTag &&
      Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }),
      Object.defineProperty(e, "__esModule", { value: !0 });
  }),
    (n.p = "/fe/lol-tft/"),
    (() => {
      "use strict";
      var e,
        t = (e = n(1)) && e.__esModule ? e : { default: e },
        s = n(2);
      n(3), n(4), n(5), n(6);
      const a = "rcp-fe-lol-tft",
        o = document.currentScript.ownerDocument;
      const l = window.getPluginAnnounceEventName(a);
      o.addEventListener(
        l,
        function (e) {
          (0, e.registrationHandler)(function (e) {
            const l = (e) =>
              e.get("rcp-fe-ember-libs").getEmberDataBinding("rcp-fe-lol-tft");
            return t.default
              .init(e, {
                Audio: (e) => e.get("rcp-fe-audio"),
                AudioPlugin: (e) => e.get("rcp-fe-audio"),
                componentFactory: (e) =>
                  e.get("rcp-fe-common-libs").getComponentFactory("1"),
                dataBinding: (e) =>
                  e.get("rcp-fe-common-libs").getDataBinding(s.PLUGIN_NAME),
                Ember: (e) => e.get("rcp-fe-ember-libs").getEmber(),
                EmberDataBinding: l,
                emberDataBinding: l,
                emberL10n: (e) => e.get("rcp-fe-ember-libs").getEmberL10n("1"),
                htmlSanitizer: (e) =>
                  e.get("rcp-fe-common-libs").getHtmlSanitizer(1),
                LeagueTierNames: (e) =>
                  e
                    .get("rcp-fe-lol-shared-components")
                    .getApi_LeagueTierNames(),
                lockAndLoadPlugin: (e) => e.get("rcp-fe-lol-lock-and-load"),
                lodash: (e) => e.get("rcp-fe-common-libs").getLodash(4),
                logger: (e) => e.get("rcp-fe-common-libs").logging.create(a),
                ModalManager: (e) =>
                  e.get("rcp-fe-lol-uikit").getModalManager(),
                navigation: (e) => e.get("rcp-fe-lol-navigation"),
                Parties: (e) => e.get("rcp-fe-lol-parties"),
                Replays: (e) =>
                  e.get("rcp-fe-lol-shared-components").getApi_Replays(),
                Router: (e) =>
                  e.get("rcp-fe-lol-shared-components").getApi_Router(),
                SharedEmberComponents: (e) =>
                  e
                    .get("rcp-fe-lol-shared-components")
                    .getSharedEmberComponents(),
                socket: (e) => e.getSocket(),
                Telemetry: (e) => e.get("rcp-fe-common-libs").getTelemetry(1),
                TemplateHelper: (e) =>
                  e.get("rcp-fe-lol-uikit").getTemplateHelper(),
                TooltipManager: (e) =>
                  e.get("rcp-fe-lol-uikit").getTooltipManager(),
                UIKit: (e) => e.get("rcp-fe-lol-uikit"),
                UIKitPlugin: (e) => e.get("rcp-fe-lol-uikit"),
                UXSettings: (e) =>
                  e.get("rcp-fe-lol-shared-components").getApi_UXSettings(),
                VideoCache: (e) => e.get("rcp-fe-lol-uikit").getVideoCache(),
                Viewport: (e) =>
                  e.get("rcp-fe-lol-shared-components").getApi_Viewport(),
                webComponents: (e) =>
                  e.get("rcp-fe-common-libs").getWebComponents(o),
                websocket: (e) => e.getSocket(),
              })
              .then(() => {
                e.getOptional("rcp-fe-lol-tft-team-planner").then(
                  (e) => {
                    t.default.TeamPlanner = e;
                  },
                  () => null,
                );
              })
              .then(() => {
                const n = e
                    .get("rcp-fe-lol-l10n")
                    .tra()
                    .overlay("/fe/lol-l10n/trans.json")
                    .overlay("/fe/lol-tft/trans.json")
                    .overlay("/fe/lol-loot/trans.json")
                    .overlay("/fe/lol-match-history/trans.json")
                    .overlay("/fe/lol-parties/trans.json")
                    .overlay("/fe/lol-navigation/trans.json")
                    .overlay("/fe/lol-tft/trans-troves.json")
                    .overlay("/fe/lol-tft/trans-rotational-shop.json"),
                  s = t.default.emberL10n(t.default.Ember, n);
                return t.default.add({
                  db: t.default.dataBinding.bindTo(e.getSocket()),
                  EmberAddons: (e) =>
                    e.get("rcp-fe-ember-libs").getSharedEmberAddons(),
                  emberApplicationFactory: (e) =>
                    e.get("rcp-fe-ember-libs").getEmberApplicationFactory(),
                  tra: n,
                  traService: s,
                });
              })
              .then(function () {
                const { Viewport: e, navigation: a } = t.default,
                  o = e.getApiKey(s.PLUGIN_NAME),
                  l = e.main().getScreenRoot(o, s.PLUGIN_NAME),
                  i = new (0, n(7).default)(l);
                i.setupTftApp();
                return new (0, n(279).default)(i);
              });
          });
        },
        { once: !0 },
      );
    })();
})();
