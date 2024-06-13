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
        const a = {
          init: function (e, n) {
            return (t = e), this.add(n);
          },
          _getValue: function (e, n) {
            let a;
            return (
              "function" == typeof n
                ? ((a = n(t)),
                  a ||
                    console.warn(
                      "The function for key " + e + " returned a falsy value: ",
                      a,
                    ))
                : "string" == typeof n
                  ? ((a = t.get(n)),
                    a ||
                      console.warn(
                        "The provider `get` invocation for the key " +
                          e +
                          " returned a falsy value: ",
                        a,
                      ))
                  : "object" == typeof n && (a = n),
              a
            );
          },
          add: function (e) {
            e = e || {};
            const t = [],
              n = this;
            return (
              Object.keys(e).forEach(function (a) {
                const l = e[a],
                  s = n._getValue(a, l);
                s && s.then
                  ? (s.then(function (e) {
                      e ||
                        console.warn(
                          "The promise for the key " +
                            a +
                            " resolved with a falsy value: ",
                          e,
                        ),
                        n._addValue(a, e);
                    }),
                    t.push(s))
                  : n._addValue(a, s);
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
        e.exports = a;
      },
      (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = function () {
            const e = new a.default();
            return new l.default(e);
          });
        var a = s(n(3)),
          l = s(n(112));
        function s(e) {
          return e && e.__esModule ? e : { default: e };
        }
      },
      (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        var a = n(1),
          l = (function (e, t) {
            if (!t && e && e.__esModule) return e;
            if (null === e || ("object" != typeof e && "function" != typeof e))
              return { default: e };
            var n = o(t);
            if (n && n.has(e)) return n.get(e);
            var a = {},
              l = Object.defineProperty && Object.getOwnPropertyDescriptor;
            for (var s in e)
              if (
                "default" !== s &&
                Object.prototype.hasOwnProperty.call(e, s)
              ) {
                var r = l ? Object.getOwnPropertyDescriptor(e, s) : null;
                r && (r.get || r.set)
                  ? Object.defineProperty(a, s, r)
                  : (a[s] = e[s]);
              }
            (a.default = e), n && n.set(e, a);
            return a;
          })(n(4)),
          s = n(5);
        function o(e) {
          if ("function" != typeof WeakMap) return null;
          var t = new WeakMap(),
            n = new WeakMap();
          return (o = function (e) {
            return e ? n : t;
          })(e);
        }
        t.default = class {
          constructor() {
            (this.screenRoot = this.getScreenRoot()),
              (this.application = null),
              (this.applicationRegistered = !1),
              (this.eventHubDataBinding = (0, a.dataBinding)(
                s.EVENT_HUB_API,
                a.socket,
              ));
          }
          getScreenRoot() {
            const e = a.Viewport.getApiKey(l.APP_NAME);
            return a.Viewport.main().getScreenRoot(e, l.APP_NAME);
          }
          show(e) {
            return (
              this.applicationRegistered ||
                ((0, l.default)(), (this.applicationRegistered = !0)),
              this.screenRoot.bump().then(() => {
                this.application ||
                  ((this.application = a.ComponentFactory.create(l.APP_NAME)),
                  this.screenRoot
                    .getElement()
                    .appendChild(this.application.domNode)),
                  a.externalModel.set("isVisible", !0),
                  a.externalModel.set("navOptions", e),
                  a.Telemetry.sendCustomData(s.TELEMETRY.TABLE, {
                    eventName: s.TELEMETRY.SHOW_EVENT,
                    eventId: e?.eventId,
                    showPip: e?.showPip,
                    showGlow: e?.showGlow,
                  });
              })
            );
          }
          hide() {
            a.externalModel.set("isVisible", !1), this.screenRoot.release();
          }
        };
      },
      (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.APP_NAME = void 0),
          (t.default = function () {
            const e = {
              ComponentFactory: a.ComponentFactory,
              Router: s.default,
              ApplicationRoute: o.default,
              IndexRoute: r.default,
              EventShopRoute: i.default,
              HallOfLegendsRoute: c.default,
              EventHubService: p.default,
              MarketingPreferencesService: u.default,
              PlayerSettingsService: d.default,
              RewardsService: m.default,
              RiotclientService: h.default,
              tra: a.traService,
              HelpModalComponent: v.default,
              PageHeaderComponent: f.default,
              PageHeaderSystemControlsComponent: _.default,
              PurchaseBundlesModalComponent: g.default,
              PurchaseLevelsModalComponent: b.default,
              EventShopCardMultiPurchaseModalComponent: E.default,
              EventShopCategoryNavBarComponent: x.default,
              EventShopCategoryNavBarTabComponent: T.default,
              EventShopCategoryOffersComponent: y.default,
              EventShopFallbackComponent: k.default,
              EventShopMainViewComponent: C.default,
              EventShopOfferCardComponent: P.default,
              EventShopProgressionComponent: w.default,
              EventShopRewardTrackWrapperComponent: S.default,
              EventShopTokenBalanceAmountComponent: R.default,
              EventShopTokenShopComponent: L.default,
              EventShopXpComponent: A.default,
              HolClaimButtonComponent: I.default,
              HolLevelIconFlamesComponent: O.default,
              HolNarrativeComponent: M.default,
              HolPromotionBannerComponent: N.default,
              HolRewardDetailsComponent: D.default,
              HolXpComponent: B.default,
              RemainingTimeTextComponent: ge,
              ...a.RewardTrackerEmberComponents,
              ...a.MultiPurchaseSliderEmberComponents,
              ApplicationController: H.default,
              IndexController: U.default,
              EventShopController: V.default,
              HallOfLegendsController: j.default,
              EqHelper: F.default,
              InventoryTypeNameHelper: Y.default,
              SafeImagePathHelper: K.default,
              TEMPLATES: {
                application: G.default,
                index: W.default,
                [l.ROUTES.EVENT_SHOP]: X.default,
                [l.ROUTES.HALL_OF_LEGENDS]: z.default,
                "components/help-modal": Q.default,
                "components/page-header-system-controls": q.default,
                "components/page-header": $.default,
                "components/purchase-bundles-modal": Z.default,
                "components/purchase-levels-modal": J.default,
                "components/event-shop-card-multi-purchase-modal": ee.default,
                "components/event-shop-category-nav-bar-tab": te.default,
                "components/event-shop-category-nav-bar": ne.default,
                "components/event-shop-category-offers": ae.default,
                "components/event-shop-fallback": le.default,
                "components/event-shop-main-view": se.default,
                "components/event-shop-offer-card": oe.default,
                "components/event-shop-progression": re.default,
                "components/event-shop-reward-track-wrapper": ie.default,
                "components/event-shop-token-shop": ce.default,
                "components/event-shop-xp": pe.default,
                "components/hol-claim-button": ue.default,
                "components/hol-level-icon-flames": de.default,
                "components/hol-narrative": me.default,
                "components/hol-promotion-banner": he.default,
                "components/hol-reward-details": ve.default,
                "components/hol-xp": fe.default,
              },
            };
            a.emberApplicationFactory.setFactoryDefinition(be, e, {
              EMBER_CLI_COMPAT: !0,
            });
          });
        var a = n(1),
          l = n(5),
          s = _e(n(6)),
          o = _e(n(7)),
          r = _e(n(8)),
          i = _e(n(9)),
          c = _e(n(10)),
          p = _e(n(11)),
          u = _e(n(12)),
          d = _e(n(13)),
          m = _e(n(14)),
          h = _e(n(15)),
          v = _e(n(16)),
          f = _e(n(17)),
          _ = _e(n(18)),
          g = _e(n(19)),
          b = _e(n(20)),
          E = _e(n(21)),
          x = _e(n(23)),
          T = _e(n(24)),
          y = _e(n(25)),
          k = _e(n(26)),
          C = _e(n(27)),
          P = _e(n(28)),
          w = _e(n(49)),
          S = _e(n(50)),
          R = _e(n(69)),
          L = _e(n(70)),
          A = _e(n(71)),
          I = _e(n(72)),
          O = _e(n(73)),
          M = _e(n(74)),
          N = _e(n(75)),
          D = _e(n(76)),
          B = _e(n(77)),
          H = _e(n(78)),
          U = _e(n(80)),
          V = _e(n(81)),
          j = _e(n(82)),
          F = _e(n(83)),
          Y = _e(n(84)),
          K = _e(n(85)),
          G = _e(n(86)),
          W = _e(n(87)),
          X = _e(n(88)),
          z = _e(n(89)),
          Q = _e(n(90)),
          q = _e(n(91)),
          $ = _e(n(92)),
          Z = _e(n(93)),
          J = _e(n(94)),
          ee = _e(n(95)),
          te = _e(n(96)),
          ne = _e(n(97)),
          ae = _e(n(98)),
          le = _e(n(99)),
          se = _e(n(100)),
          oe = _e(n(101)),
          re = _e(n(102)),
          ie = _e(n(103)),
          ce = _e(n(104)),
          pe = _e(n(105)),
          ue = _e(n(106)),
          de = _e(n(107)),
          me = _e(n(108)),
          he = _e(n(109)),
          ve = _e(n(110)),
          fe = _e(n(111));
        function _e(e) {
          return e && e.__esModule ? e : { default: e };
        }
        const { RemainingTimeTextComponent: ge } = a.SharedComponents,
          be = "rcp-fe-lol-event-hub";
        t.APP_NAME = be;
      },
      (e, t) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default =
            t.TOKEN_SHOP_OBSERVERS =
            t.TELEMETRY =
            t.ROUTES =
            t.RIOTCLIENT_API =
            t.REWARD_TRACK_OBSERVERS =
            t.REWARD_TRACK_ITEM_STATE =
            t.REWARD_CELEBRATION_TYPE_FULLSCREEN =
            t.REWARDS_API =
            t.REPLAY_FULLSCREEN_CELEBRATION_PATH =
            t.REGION_LOCALE_PATH =
            t.PURCHASE_OFFER_PATH =
            t.PURCHASE_ITEM_PATH =
            t.PROGRESSION_PURCHASE_DATA_PATH =
            t.PASS_OWNERSHIP_TYPES =
            t.PASS_BUNDLES_PATH =
            t.OFFER_STATES =
            t.HOL_OBSERVERS =
            t.EVENT_SHOP_OFFER_CARD_CONTAINER_CLASSNAME =
            t.EVENT_SHOP_OBSERVERS =
            t.EVENT_OBSERVERS_BY_TYPE =
            t.EVENT_INFO_PATH =
            t.EVENT_HUB_TYPES =
            t.EVENT_HUB_API =
            t.EVENT_BASE_OBSERVERS =
            t.CLAIM_ALL_REWARDS_PATH =
              void 0);
        const n = "/lol-event-hub/v1";
        t.EVENT_HUB_API = n;
        const a = "/info";
        t.EVENT_INFO_PATH = a;
        t.PASS_BUNDLES_PATH = "/pass-bundles";
        t.PROGRESSION_PURCHASE_DATA_PATH = "/progression-purchase-data";
        t.PURCHASE_ITEM_PATH = "/purchase-item";
        t.PURCHASE_OFFER_PATH = "/purchase-offer";
        const l = "/reward-track/claim-all";
        t.CLAIM_ALL_REWARDS_PATH = l;
        t.REWARDS_API = "/lol-rewards/v1";
        t.REPLAY_FULLSCREEN_CELEBRATION_PATH = "/reward/replay";
        t.REWARD_CELEBRATION_TYPE_FULLSCREEN = "FULLSCREEN";
        t.RIOTCLIENT_API = "/riotclient";
        t.REGION_LOCALE_PATH = "/region-locale";
        const s = {
          INDEX: "/",
          EVENT_SHOP: "event-shop",
          HALL_OF_LEGENDS: "hall-of-legends",
        };
        t.ROUTES = s;
        const o = {
          EVENT_SHOP: "kEventShop",
          HALL_OF_LEGENDS: "kHallOfLegends",
        };
        t.EVENT_HUB_TYPES = o;
        const r = { PURCHASED: "Purchased", UNOWNED: "Unowned" };
        t.PASS_OWNERSHIP_TYPES = r;
        const i = {
          LOCKED: "Locked",
          UNLOCKED: "Unlocked",
          UNSELECTED: "Unselected",
          SELECTED: "Selected",
        };
        t.REWARD_TRACK_ITEM_STATE = i;
        t.OFFER_STATES = {
          OWNED: "kOwned",
          AVAILABLE: "kAvailable",
          UNAVAILABLE: "kUnavailable",
          UNREVEALED: "kUnrevealed",
          PURCHASING: "kPurchasing",
        };
        t.TELEMETRY = {
          TABLE: "event_hub",
          CATEGORY_NAV_BAR_CLICK_EVENT: "category_nav_bar_click",
          HOL_PLAY_NARRATIVE_EVENT: "play_narrative_click",
          HOL_PROMOTION_BANNER_CLICK_EVENT: "promotion_banner_click",
          OPEN_OFFER_CARD_EVENT: "open_offer_card",
          OPEN_PURCHASE_LEVELS_EVENT: "open_purchase_level_modal",
          PURCHASE_LEVELS_CLICK_EVENT: "purchase_levels_click",
          PURCHASE_LEVELS_RP_TOP_UP_CLICK_EVENT:
            "purchase_levels_rp_top_up_click",
          PURCHASE_OFFER_EVENT: "purchase_offer",
          PURCHASE_PASS_CLICK_EVENT: "purchase_pass_click",
          PURCHASE_PASS_UNLOCK_CLICK_EVENT: "purchase_pass_unlock_click",
          PURCHASE_TOKENS_CLICK_EVENT: "purchase_tokens_click",
          REPLAY_BUTTON_CLICK_EVENT: "replay_button_click",
          REPLAY_BUTTON_NODE_LEVEL_CLICK_EVENT:
            "replay_button_node_level_click",
          REWARD_CLICK_EVENT: "reward_click",
          SHOW_EVENT: "show",
        };
        const c = [
          { propertyName: "info", propertyPath: a },
          {
            propertyName: "eventShopProgressionData",
            propertyPath: "/progress-info-data",
          },
          {
            propertyName: "eventDetailsData",
            propertyPath: "/event-details-data",
          },
          { propertyName: "isGracePeriod", propertyPath: "/is-grace-period" },
        ];
        t.EVENT_BASE_OBSERVERS = c;
        const p = [
          { propertyName: "tokenShopData", propertyPath: "/token-shop" },
          {
            propertyName: "categoriesOffers",
            propertyPath: "/token-shop/categories-offers",
          },
          {
            propertyName: "tokenBalance",
            propertyPath: "/token-shop/token-balance",
            defaultValue: 0,
          },
        ];
        t.TOKEN_SHOP_OBSERVERS = p;
        const u = [
          {
            propertyName: "rewardTrackProgress",
            propertyPath: "/reward-track/progress",
          },
          {
            propertyName: "rewardTrackItems",
            propertyPath: "/reward-track/items",
          },
          {
            propertyName: "rewardTrackBonusItems",
            propertyPath: "/reward-track/bonus-items",
          },
          {
            propertyName: "rewardTrackBonusProgress",
            propertyPath: "/reward-track/bonus-progress",
          },
          {
            propertyName: "unclaimedRewards",
            propertyPath: "/reward-track/unclaimed-rewards",
          },
          { propertyName: "rewardTrackXP", propertyPath: "/reward-track/xp" },
          {
            propertyName: "failureLoadingRewardTrack",
            propertyPath: "/reward-track/failure",
          },
        ];
        t.REWARD_TRACK_OBSERVERS = u;
        const d = [
          ...c,
          ...p,
          ...u,
          {
            propertyName: "backgroundData",
            propertyPath: "/pass-background-data",
          },
        ];
        t.EVENT_SHOP_OBSERVERS = d;
        const m = [
          ...c,
          ...u,
          {
            propertyName: "progressionPurchaseData",
            propertyPath: "/progression-purchase-data",
          },
          { propertyName: "narrative", propertyPath: "/narrative" },
        ];
        t.HOL_OBSERVERS = m;
        const h = { [o.EVENT_SHOP]: d, [o.HALL_OF_LEGENDS]: m };
        t.EVENT_OBSERVERS_BY_TYPE = h;
        const v = "event-shop-offer-card";
        t.EVENT_SHOP_OFFER_CARD_CONTAINER_CLASSNAME = v;
        var f = {
          CLAIM_ALL_REWARDS_PATH: l,
          EVENT_HUB_API: n,
          EVENT_OBSERVERS_BY_TYPE: h,
          PASS_OWNERSHIP_TYPES: r,
          REWARD_TRACK_ITEM_STATE: i,
          EVENT_SHOP_OFFER_CARD_CONTAINER_CLASSNAME: v,
          ROUTES: s,
          EVENT_HUB_TYPES: o,
        };
        t.default = f;
      },
      (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        var a = n(1),
          l = n(5);
        const s = a.Ember.Router.extend({ location: "none" });
        s.map(function () {
          this.route(l.ROUTES.EVENT_SHOP), this.route(l.ROUTES.HALL_OF_LEGENDS);
        });
        var o = s;
        t.default = o;
      },
      (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        var a = n(1),
          l = a.Ember.Route.extend({ model: () => a.externalModel });
        t.default = l;
      },
      (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        var a = n(1),
          l = a.Ember.Route.extend({ model: () => a.externalModel });
        t.default = l;
      },
      (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        var a = n(1),
          l = a.Ember.Route.extend({
            model: () => a.externalModel,
            setupController(e, t) {
              this._super(...arguments), e.set("model", t);
            },
          });
        t.default = l;
      },
      (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        var a = n(1),
          l = a.Ember.Route.extend({
            model: () => a.externalModel,
            setupController(e, t) {
              this._super(...arguments), e.set("model", t);
            },
          });
        t.default = l;
      },
      (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        var a = n(5),
          l = n(1),
          s = l.Ember.Service.extend({
            init() {
              this._super(...arguments),
                (this.eventHubDataBinding = (0, l.dataBinding)(
                  a.EVENT_HUB_API,
                  l.socket,
                )),
                (this.eventSpecificObservers = []),
                this.getEvents();
            },
            getEvents() {
              this.eventHubDataBinding.observe("/events", this, (e) => {
                this.setProperties({ events: e });
              });
            },
            setActiveEvent(e) {
              const t = this.get("activeEventId");
              if (!t || t !== e) {
                this.clearEventSpecificData();
                const t = this.events.find(({ eventId: t }) => t === e),
                  n = t?.eventInfo?.eventType;
                this.setProperties({ activeEventId: e, activeEventType: n }),
                  this.observeEventSpecificData(),
                  this.getPassBundles();
              }
            },
            observeEventSpecificData() {
              const e = a.EVENT_OBSERVERS_BY_TYPE[this.activeEventType] || [];
              for (const {
                propertyName: t,
                propertyPath: n,
                defaultValue: a,
              } of e) {
                const e = this.getEventSpecificPropertyPath(n);
                this.eventSpecificObservers.push({ path: e, propertyName: t }),
                  this.eventHubDataBinding.observe(e, this, (e) => {
                    this.isDestroying ||
                      this.isDestroyed ||
                      (null == e && (e = a), this.setProperties({ [t]: e }));
                  });
              }
            },
            clearEventSpecificData() {
              this.eventSpecificObservers.forEach(
                ({ path: e, propertyName: t }) => {
                  this.eventHubDataBinding.unobserve(e, this),
                    this.setProperties({ [t]: void 0 });
                },
              ),
                (this.eventSpecificObservers = []);
            },
            async getPassBundles() {
              return await this.eventHubDataBinding.get(
                this.getEventSpecificPropertyPath(a.PASS_BUNDLES_PATH),
                { skipCache: !0 },
              );
            },
            async getProgressionPurchaseData() {
              return await this.eventHubDataBinding.get(
                this.getEventSpecificPropertyPath(
                  a.PROGRESSION_PURCHASE_DATA_PATH,
                ),
                { skipCache: !0 },
              );
            },
            purchasePassBundle(e) {
              const t = {
                inventoryType: e.details.inventoryType,
                itemId: e.details.itemId,
                quantity: 1,
                rpCost: e.finalPrice,
              };
              return this.purchaseItem(t);
            },
            async purchaseItem(e) {
              return await this.eventHubDataBinding.post(
                a.PURCHASE_ITEM_PATH,
                e,
              );
            },
            claimAllPendingRewards() {
              this.eventHubDataBinding.post(
                this.getEventSpecificPropertyPath(a.CLAIM_ALL_REWARDS_PATH),
              );
            },
            async purchaseOffer(e, t) {
              return await this.eventHubDataBinding.post(
                this.getEventSpecificPropertyPath(a.PURCHASE_OFFER_PATH),
                { offerId: e, purchaseQuantity: t },
              );
            },
            getEventSpecificPropertyPath(e) {
              return `/events/${this.activeEventId}${e}`;
            },
            willDestroy() {
              this._super(...arguments),
                this.eventHubDataBinding.unobserve(this);
            },
          });
        t.default = s;
      },
      (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        var a = n(1);
        var l = a.Ember.Service.extend({
          init() {
            this._super(...arguments),
              (this.mpsApi = (0, a.dataBinding)(
                "/lol-marketing-preferences/v1",
                a.socket,
              ));
          },
          setFromEventShopForHolPartition() {
            return this.mpsApi.post("/partition/hall_of_legends_embed_2024", {
              fromEventShop: "true",
            });
          },
        });
        t.default = l;
      },
      (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        var a = n(1);
        const l = "/account/LCUPreferences/event-hub",
          s = "/local/event-hub",
          o = { animationsEnabled: !0 };
        var r = a.Ember.Service.extend({
          init() {
            this._super(...arguments),
              (this.settingsDataBinding = (0, a.dataBinding)(
                "/lol-settings/v2",
                a.socket,
              )),
              this.settingsDataBinding.observe(
                "/local/lol-user-experience",
                this,
                (e) => {
                  this.set("potatoModeEnabled", e?.data?.potatoModeEnabled);
                },
              ),
              this.settingsDataBinding.observe(s, this, (e) => {
                const t = e?.data || o;
                this.set("localSettings", t);
              });
          },
          willDestroy() {
            this._super(...arguments), this.settingsDataBinding.unobserve(this);
          },
          updatePlayerSettings(e = 0, t = 0) {
            this.settingsDataBinding.observe("/ready", this, (n) => {
              n &&
                (this.settingsDataBinding.unobserve("/ready", this),
                this.settingsDataBinding.patch(l, {
                  data: {
                    lastTimeSeen: new Date().toISOString(),
                    lastSeenTokenBalance: e,
                    lastSeenTokenShopOffersVersion: t,
                  },
                  schemaVersion: 1,
                }));
            });
          },
          getAccountSettings() {
            return this.settingsDataBinding.get(l);
          },
          updateLocalSettings(e) {
            this.settingsDataBinding.patch(s, { data: e, schemaVersion: 1 });
          },
          toggleAnimationsEnabled() {
            if (this.get("potatoModeEnabled")) return;
            const e = this.get("localSettings");
            this.updateLocalSettings({
              ...e,
              animationsEnabled: !e.animationsEnabled,
            });
          },
          animationsEnabled: a.Ember.computed(
            "localSettings",
            "potatoModeEnabled",
            function () {
              return (
                !this.get("potatoModeEnabled") &&
                this.get("localSettings")?.animationsEnabled
              );
            },
          ),
        });
        t.default = r;
      },
      (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        var a = n(5),
          l = n(1),
          s = l.Ember.Service.extend({
            init() {
              this._super(...arguments),
                (this.rewardsApi = (0, l.dataBinding)(a.REWARDS_API, l.socket));
            },
            replayFullscreenCelebration(e) {
              return this.rewardsApi.post(
                a.REPLAY_FULLSCREEN_CELEBRATION_PATH,
                e,
              );
            },
          });
        t.default = s;
      },
      (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        var a = n(5),
          l = n(1),
          s = l.Ember.Service.extend({
            init() {
              this._super(...arguments),
                (this.riotclientBinding = (0, l.dataBinding)(
                  a.RIOTCLIENT_API,
                  l.socket,
                )),
                this.observeRegionData();
            },
            observeRegionData() {
              this.riotclientBinding.observe(
                a.REGION_LOCALE_PATH,
                this,
                (e) => {
                  this.set("isKRRegion", "KR" === e?.region?.toUpperCase());
                },
              );
            },
          });
        t.default = s;
      },
      (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        var a = n(1),
          l = n(5),
          s = a.Ember.Component.extend({
            eventHubService: a.Ember.inject.service("event-hub"),
            eventDetailsData: a.Ember.computed.alias(
              "eventHubService.eventDetailsData",
            ),
            eventType: a.Ember.computed.alias(
              "eventHubService.activeEventType",
            ),
            firstColumnTopic: a.Ember.computed("eventType", function () {
              return this.get("eventType") === l.EVENT_HUB_TYPES.HALL_OF_LEGENDS
                ? a.tra.get("hol_help_modal_cinmatic_experience")
                : a.tra.get("event_shop_help_modal_earn_tokens");
            }),
            firstColumnDescription: a.Ember.computed(
              "eventType",
              "eventDetailsData",
              function () {
                if (
                  this.get("eventType") === l.EVENT_HUB_TYPES.HALL_OF_LEGENDS
                ) {
                  const e = this.get("eventDetailsData.inducteeName");
                  return a.tra.formatString(
                    "hol_help_modal_cinmatic_experience_description",
                    { inducteeName: e },
                  );
                }
                return a.tra.get(
                  "event_shop_help_modal_earn_tokens_description",
                );
              },
            ),
            secondColumnTopic: a.Ember.computed("eventType", function () {
              return this.get("eventType") === l.EVENT_HUB_TYPES.HALL_OF_LEGENDS
                ? a.tra.get("hol_help_modal_exclusive_skins")
                : a.tra.get("event_shop_help_modal_redeem_tokens");
            }),
            secondColumnDescription: a.Ember.computed("eventType", function () {
              return this.get("eventType") === l.EVENT_HUB_TYPES.HALL_OF_LEGENDS
                ? a.tra.get("hol_help_modal_exclusive_skins_description")
                : a.tra.get("event_shop_help_modal_redeem_tokens_description");
            }),
            thirdColumnTopic: a.Ember.computed("eventType", function () {
              return this.get("eventType") === l.EVENT_HUB_TYPES.HALL_OF_LEGENDS
                ? a.tra.get("hol_help_modal_rewards")
                : a.tra.get("event_shop_help_modal_upgrade_pass");
            }),
            thirdColumnDescription: a.Ember.computed(
              "eventType",
              "eventDetailsData",
              function () {
                if (
                  this.get("eventType") === l.EVENT_HUB_TYPES.HALL_OF_LEGENDS
                ) {
                  const e = this.get("eventDetailsData.inducteeName");
                  return a.tra.formatString(
                    "hol_help_modal_rewards_description",
                    { inducteeName: e },
                  );
                }
                return a.tra.get(
                  "event_shop_help_modal_upgrade_pass_description",
                );
              },
            ),
            firstColumnIconClass: a.Ember.computed("eventType", function () {
              return this.get("eventType") === l.EVENT_HUB_TYPES.HALL_OF_LEGENDS
                ? "eh-help-modal-icon-scroll"
                : "eh-help-modal-icon-loot";
            }),
            secondColumnIconClass: a.Ember.computed("eventType", function () {
              return this.get("eventType") === l.EVENT_HUB_TYPES.HALL_OF_LEGENDS
                ? "eh-help-modal-icon-skin"
                : "eh-help-modal-icon-currency";
            }),
            thirdColumnIconClass: a.Ember.computed("eventType", function () {
              return this.get("eventType") === l.EVENT_HUB_TYPES.HALL_OF_LEGENDS
                ? "eh-help-modal-icon-loot"
                : "eh-help-modal-icon-boost";
            }),
            actions: {
              handleCloseModalClick() {
                this.set("showHelpModal", !1);
              },
            },
          });
        t.default = s;
      },
      (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        var a = n(1),
          l = n(5),
          s = a.Ember.Component.extend({
            classNames: ["eh-page-header"],
            classNameBindings: [
              "showBottomBorder:eh-page-header-show-bottom-border",
            ],
            showBottomBorder: !1,
            showHelpIcon: !1,
            showTokenBalance: !1,
            showSystemControls: !1,
            gracePeriodTooltipsText: a.Ember.computed(
              "gracePeriodTooltipTextsOverride",
              function () {
                return {
                  tooltipTitleTop: this.get(
                    "tra.event_shop_page_header_time_tooltip_shop_title",
                  ),
                  tooltipDescriptionTop: this.get(
                    "tra.event_shop_page_header_time_tooltip_shop_description_grace_period",
                  ),
                  tooltipTitleBottom: this.get(
                    "tra.event_shop_page_header_time_tooltip_progress_title_grace_period",
                  ),
                  tooltipDescriptionBottom: this.get(
                    "tra.event_shop_page_header_time_tooltip_progress_description_grace_period",
                  ),
                  ...this.get("gracePeriodTooltipTextsOverride"),
                };
              },
            ),
            tooltipProgressText: a.Ember.computed(
              "tooltipProgressTextOverride",
              function () {
                return {
                  tooltipTitleTop: this.get(
                    "tra.event_shop_page_header_time_tooltip_progress_title",
                  ),
                  tooltipDescriptionTop: this.get(
                    "tra.event_shop_page_header_time_tooltip_progress_description",
                  ),
                  tooltipTitleBottom: this.get(
                    "tra.event_shop_page_header_time_tooltip_shop_title",
                  ),
                  ...this.get("tooltipProgressTextOverride"),
                };
              },
            ),
            eventHubService: a.Ember.inject.service("event-hub"),
            eventDetailsData: a.Ember.computed.alias(
              "eventHubService.eventDetailsData",
            ),
            isGracePeriod: a.Ember.computed.alias(
              "eventHubService.isGracePeriod",
            ),
            tokenImage: a.Ember.computed.alias(
              "eventHubService.tokenShopData.tokenImage",
            ),
            tokenBundlesCatalogEntry: a.Ember.computed.alias(
              "eventHubService.tokenShopData.tokenBundlesCatalogEntry",
            ),
            showHelpModal: !1,
            remainingTimeTextProps: a.Ember.computed(
              "isGracePeriod",
              "eventDetailsData",
              "gracePeriodRemainingTimeTextOverride",
              function () {
                if (this.get("isGracePeriod"))
                  return {
                    almostEndingText: this.get(
                      "tra.event_shop_page_header_shop_almost_closing",
                    ),
                    wrappingText: this.get(
                      "tra.event_shop_page_header_shop_closes_in",
                    ),
                    endDateTime: this.get("eventDetailsData.shopEndDate"),
                    ...this.get("gracePeriodRemainingTimeTextOverride"),
                  };
                const e =
                  this.get("eventDetailsData.progressEndDate") ||
                  this.get("eventDetailsData.shopEndDate");
                return {
                  almostEndingText: this.get(
                    "tra.event_shop_page_header_event_almost_ending",
                  ),
                  wrappingText: this.get(
                    "tra.event_shop_page_header_event_ends_in",
                  ),
                  endDateTime: e,
                };
              },
            ),
            progressEndDateFullText: a.Ember.computed(
              "eventDetailsData",
              "tra.metadata.locale",
              function () {
                if (!this.get("eventDetailsData.progressEndDate")) return;
                const e = this.get("tra.metadata.locale.id"),
                  t = this.getLocaleFromTraLocaleId(e);
                return this.getEndTimerTooltipText(
                  this.get("eventDetailsData.progressEndDate"),
                  t,
                );
              },
            ),
            shopEndDateFullText: a.Ember.computed(
              "eventDetailsData",
              "tra.metadata.locale",
              function () {
                const e = this.get("tra.metadata.locale.id"),
                  t = this.getLocaleFromTraLocaleId(e);
                return this.getEndTimerTooltipText(
                  this.get("eventDetailsData.shopEndDate"),
                  t,
                );
              },
            ),
            getLocaleFromTraLocaleId: (e = "") =>
              e.toLowerCase().replace("_", "-"),
            getEndTimerTooltipText(e, t) {
              const n = new Date(e),
                l = n.toLocaleDateString(t, { dateStyle: "medium" }),
                s = n.toLocaleTimeString(t, {
                  timeZoneName: "short",
                  hour: "numeric",
                  minute: "numeric",
                });
              return a.tra.formatString(
                "event_shop_page_header_time_tooltip_date_string",
                { dateText: l, timeText: s },
              );
            },
            headerTitleImageSrc: a.Ember.computed.alias(
              "eventHubService.eventDetailsData.headerTitleImagePath",
            ),
            hasHeaderTitleImage: a.Ember.computed(
              "headerTitleImageSrc",
              function () {
                const e = this.get("headerTitleImageSrc");
                return !(!e || "/lol-game-data/assets/" === e);
              },
            ),
            actions: {
              showHelpModal() {
                this.set("showHelpModal", !0);
              },
              navigateToStore() {
                a.Telemetry.sendCustomData(l.TELEMETRY.TABLE, {
                  eventName: l.TELEMETRY.PURCHASE_TOKENS_CLICK_EVENT,
                  eventId: this.get("eventHubService.info.eventId"),
                  lockedTokens: this.get(
                    "eventHubService.info.lockedTokenCount",
                  ),
                  tokenBalance: this.get(
                    "eventHubService.info.currentTokenBalance",
                  ),
                });
                const e = this.get("tokenBundlesCatalogEntry").map((e) => ({
                  itemId: e.itemId,
                  inventoryType: "BUNDLES",
                }));
                a.Router.navigateTo("rcp-fe-lol-store", {
                  page: "hextech",
                  items: e,
                });
              },
            },
          });
        t.default = s;
      },
      (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        var a = n(1),
          l = a.Ember.Component.extend({
            classNames: ["eh-page-header-system-controls"],
            playerSettingsService: a.Ember.inject.service("player-settings"),
            animationsEnabled: a.Ember.computed.alias(
              "playerSettingsService.animationsEnabled",
            ),
            actions: {
              toggleAnimationEnabled() {
                this.get("playerSettingsService").toggleAnimationsEnabled();
              },
            },
          });
        t.default = l;
      },
      (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        var a = n(1),
          l = n(5);
        const s = {
          1: {
            CSS_CLASS: "eh-purchase-bundles-modal-option-single",
            LOCATIONS: [0],
          },
          2: {
            CSS_CLASS: "eh-purchase-bundles-modal-option-tall",
            LOCATIONS: [0, 1],
          },
          3: {
            CSS_CLASS: "eh-purchase-bundles-modal-option-tall",
            LOCATIONS: [0],
          },
          4: {
            CSS_CLASS: "eh-purchase-bundles-modal-option-wide",
            LOCATIONS: [0],
          },
        };
        var o = a.Ember.Component.extend({
          tag: null,
          eventHubService: a.Ember.inject.service("event-hub"),
          riotclientService: a.Ember.inject.service("riotclient"),
          showPurchaseModal: !1,
          bundles: null,
          selectedOption: null,
          summarySubtitle: a.Ember.computed.alias(
            "tra.event_hub_purchase_modal_summary_pass_subtitle",
          ),
          descriptionElementAdditionalClassName: null,
          isDescriptionExpanded: !1,
          isExecutingPurchase: !1,
          purchaseCompleted: !1,
          dropRatesLootItemName: null,
          showDropRatesModal: !1,
          rpPurchaseInProgress: !1,
          showKrTos: a.Ember.computed.alias("riotclientService.isKRRegion"),
          tosText: a.Ember.computed("showKrTos", function () {
            return this.get("showKrTos")
              ? a.Ember.String.htmlSafe(
                  this.get("tra.event_hub_purchase_modal_tos_kr"),
                )
              : a.Ember.String.htmlSafe(
                  this.get("tra.event_hub_purchase_modal_tos"),
                );
          }),
          tosDisabled: a.Ember.computed.not("selectedOption.isPurchasable"),
          tosChecked: !1,
          unlockButtonDisabled: a.Ember.computed(
            "isExecutingPurchase",
            "selectedOption",
            "tosChecked",
            function () {
              const e = this.get("isExecutingPurchase"),
                t = this.get("selectedOption"),
                n = this.get("tosChecked");
              return !(!e && t && t.isPurchasable && n);
            },
          ),
          optionsPointerClass: a.Ember.computed(
            "isExecutingPurchase",
            "purchaseCompleted",
            function () {
              return this.get("isExecutingPurchase") ||
                this.get("purchaseCompleted")
                ? ""
                : "eh-purchase-bundles-modal-option-pointer";
            },
          ),
          options: a.Ember.computed("bundles", function () {
            const e = this.get("bundles");
            if (!e) return [];
            if (!Object.keys(s).includes(e.length.toString())) {
              const t = Object.keys(s).join(", ");
              a.logger.error(
                `Pass Purchase Modal - expected number of bundles to be ${t}; but got: ${e.length}`,
              );
            }
            const t = s[e.length] || {},
              n = t.CSS_CLASS || "",
              l = t.LOCATIONS || [],
              o = e.map(
                (e, t) => (
                  e.bundledItems.forEach((e) => {
                    (e.displayName = e.name),
                      e.quantity > 1 &&
                        (e.displayName = a.tra.formatString(
                          "event_hub_purchase_modal_summary_item_name_quantity",
                          { name: e.name, quantity: e.quantity },
                        ));
                  }),
                  e.finalPrice <= 0 &&
                    ((e.isOwned = !0),
                    (e.ownedClass = "eh-purchase-bundles-modal-option-owned")),
                  { ...e, optionTypeCssClass: l.includes(t) ? n : "" }
                ),
              );
            let r;
            const i = this.get("selectedOption");
            return (
              (r =
                1 === o.length
                  ? o[0]
                  : null !== i
                    ? o.find((e) => i.details.itemId === e.details.itemId)
                    : o.find((e) => !e.isOwned)),
              r &&
                (this.set("selectedOption", r),
                a.Ember.set(
                  r,
                  "selectedCssClass",
                  "eh-purchase-bundles-modal-option-selected",
                )),
              o
            );
          }),
          summaryTitle: a.Ember.computed("selectedOption", function () {
            const e = this.get("selectedOption");
            return e
              ? e.details.name
              : this.get(
                  "tra.event_hub_purchase_modal_summary_default_pass_title",
                );
          }),
          newBalance: a.Ember.computed("selectedOption", function () {
            const e = this.get("selectedOption");
            return e && e.futureBalance
              ? a.tra.formatString("event_hub_purchase_modal_rp", {
                  price: e.futureBalance,
                })
              : "";
          }),
          finalPrice: a.Ember.computed("selectedOption", function () {
            const e = this.get("selectedOption");
            return e && e.finalPrice
              ? a.tra.formatString("event_hub_purchase_modal_rp", {
                  price: e.finalPrice,
                })
              : "";
          }),
          initialPrice: a.Ember.computed("selectedOption", function () {
            const e = this.get("selectedOption");
            return e && e.initialPrice && e.finalPrice !== e.initialPrice
              ? a.tra.formatString("event_hub_purchase_modal_rp", {
                  price: e.initialPrice,
                })
              : null;
          }),
          discountPercentage: a.Ember.computed("selectedOption", function () {
            const e = this.get("selectedOption");
            return e && e.discountPercentage
              ? a.tra.formatString(
                  "event_hub_purchase_modal_discount_percentage",
                  { percentage: e.discountPercentage },
                )
              : null;
          }),
          optionsExecutingPurchaseClass: a.Ember.computed(
            "isExecutingPurchase",
            function () {
              return this.get("isExecutingPurchase")
                ? "eh-purchase-bundles-modal-option-executing-purchase"
                : "";
            },
          ),
          numberOfOptionsWrapperCssClass: a.Ember.computed(
            "options",
            function () {
              switch (this.get("options").length) {
                case 1:
                  return "eh-purchase-bundles-modal-single-option";
                case 2:
                  return "eh-purchase-bundles-modal-two-options";
                case 3:
                  return "eh-purchase-bundles-modal-three-options";
                case 4:
                  return "eh-purchase-bundles-modal-four-options";
                default:
                  return "";
              }
            },
          ),
          successMessage: a.Ember.computed("showKrTos", function () {
            return this.get("showKrTos")
              ? a.Ember.String.htmlSafe(
                  this.get("tra.event_hub_purchase_modal_success_message_kr"),
                )
              : a.Ember.String.htmlSafe(
                  this.get("tra.event_hub_purchase_modal_success_message"),
                );
          }),
          didInsertElement() {
            this._super(...arguments),
              this.addObserver("showPurchaseModal", this.getOptions),
              this.getOptions();
          },
          willDestroyElement() {
            this.removeObserver("showPurchaseModal");
          },
          didRender() {
            this.defineSeeMoreElementVisibility();
          },
          defineSeeMoreElementVisibility() {
            if (!this.get("selectedOption"))
              return void this.set(
                "descriptionElementAdditionalClassName",
                "eh-purchase-bundles-modal-description-see-more-display-none",
              );
            const e = document.getElementById(
              "eh-purchase-bundles-modal-summary-description-text",
            );
            e && e.offsetHeight < 72
              ? this.set(
                  "descriptionElementAdditionalClassName",
                  "eh-purchase-bundles-modal-description-see-more-display-none",
                )
              : this.set("descriptionElementAdditionalClassName", "");
          },
          getOptions() {
            this.get("showPurchaseModal") &&
              this.get("eventHubService")
                .getPassBundles()
                .then((e) => {
                  if (!e.length)
                    throw new Error(
                      "Pass Purhcase Modal - Pass Bundles did not return any option",
                    );
                  this.set("bundles", e);
                })
                .catch((e) => {
                  a.logger.error(
                    "Pass Purchase Modal - Failure loading purchase options",
                    e,
                  );
                  const t = a.UIKit.getTemplateHelper().contentBlockDialog(
                    this.get("tra.event_hub_generic_error_header"),
                    this.get("tra.event_hub_generic_error_body"),
                  );
                  this.showErrorModal(t);
                });
          },
          closeModal() {
            this.setProperties({
              showPurchaseModal: !1,
              bundles: null,
              selectedOption: null,
              isExecutingPurchase: !1,
              purchaseCompleted: !1,
              dropRatesLootItemName: null,
              showDropRatesModal: !1,
              tosChecked: !1,
            }),
              this.setIsDescriptionExpanded(!1);
          },
          showErrorModal(e) {
            this.closeModal(),
              a.UIKit.getModalManager().add({
                type: "DialogAlert",
                data: {
                  contents: e,
                  okText: this.get("tra.event_hub_modal_ok_button"),
                },
              });
          },
          showPurchaseErrorModal() {
            const e = a.UIKit.getTemplateHelper().contentBlockDialog(
              this.get("tra.event_hub_generic_purchase_error_header"),
              this.get("tra.event_hub_generic_purchase_error_body"),
            );
            this.showErrorModal(e);
          },
          resetSelectedOptionCssClass() {
            this.get("options").forEach((e) => {
              e.selectedCssClass && a.Ember.set(e, "selectedCssClass", "");
            });
          },
          setIsDescriptionExpanded(e) {
            this.set("isDescriptionExpanded", e);
            const t = document.getElementById(
              "eh-purchase-bundles-modal-summary-description",
            );
            if (t)
              if (e) {
                const e = t.scrollHeight + 3;
                t.style.maxHeight = e + "px";
              } else t.style.maxHeight = "72px";
          },
          actions: {
            handleCloseModalClick() {
              this.closeModal();
            },
            openRPPurchaseModal() {
              this.set("rpPurchaseInProgress", !0),
                a.Payments.openPayments({
                  action: "RP_PURCHASE",
                  openedFrom: "event_hub_pass_purchase",
                  onClose: this.getOptions.bind(this),
                })
                  .catch((e) => {
                    a.logger.error(
                      "Pass Purchase Payments Modal - Failure loading payments modal",
                      e,
                    );
                    const t = a.UIKit.getTemplateHelper().contentBlockDialog(
                      this.get("tra.event_hub_generic_error_header"),
                      this.get("tra.event_hub_generic_purchase_rp_error_body"),
                    );
                    this.showErrorModal(t);
                  })
                  .finally(() => {
                    this.set("rpPurchaseInProgress", !1);
                  });
            },
            selectOption(e) {
              this.get("isExecutingPurchase") ||
                this.get("purchaseCompleted") ||
                this.get("selectedOption") === e ||
                (this.resetSelectedOptionCssClass(),
                a.Ember.set(
                  e,
                  "selectedCssClass",
                  "eh-purchase-bundles-modal-option-selected",
                ),
                this.set("selectedOption", e),
                this.setIsDescriptionExpanded(!1),
                this.set("tosChecked", !1),
                this.set("descriptionElementAdditionalClassName", ""));
            },
            toggleTosChecked(e) {
              this.set("tosChecked", e.target.checked);
            },
            unlockPass() {
              if (this.get("unlockButtonDisabled")) return;
              this.set("isExecutingPurchase", !0);
              const e = this.get("selectedOption");
              a.Telemetry.sendCustomData(l.TELEMETRY.TABLE, {
                eventName: l.TELEMETRY.PURCHASE_PASS_UNLOCK_CLICK_EVENT,
                eventId: this.get("eventHubService.info.eventId"),
                selectedOption: e.details.itemId,
              }),
                this.get("eventHubService")
                  .purchasePassBundle(e)
                  .then(() => {
                    this.set("isExecutingPurchase", !1),
                      this.set("purchaseCompleted", !0);
                  })
                  .catch((e) => {
                    a.logger.error("Failure purchasing Event Pass", e),
                      this.showPurchaseErrorModal();
                  });
            },
            expandOrCollapseDescription() {
              this.setIsDescriptionExpanded(!this.get("isDescriptionExpanded"));
            },
            openDropRatesModal(e) {
              this.set(
                "dropRatesLootItemName",
                `${e.subInventoryType}_${e.itemId}_OPEN`,
              ),
                this.set("showDropRatesModal", !0);
            },
            closeDropRatesModal() {
              this.set("dropRatesLootItemName", null),
                this.set("showDropRatesModal", !1);
            },
          },
        });
        t.default = o;
      },
      (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = t.SOUNDS = void 0);
        var a = n(1),
          l = n(5);
        const { RunMixin: s } = a.EmberAddons.EmberLifeline,
          o = {
            STEP: "/fe/lol-static-assets/sounds/sfx-uikit-generic-click-small.ogg",
            MAX: "/fe/lol-static-assets/sounds/sfx-uikit-generic-click-big.ogg",
          };
        t.SOUNDS = o;
        var r = a.Ember.Component.extend(s, {
          tag: null,
          eventHubService: a.Ember.inject.service("event-hub"),
          playerSettingsService: a.Ember.inject.service("player-settings"),
          formatter: a.Ember.computed("tra.metadata.locale.id", function () {
            const e = this.get("tra.metadata.locale.id")
              .toLowerCase()
              .replace("_", "-");
            return Intl.NumberFormat(e, { numberingSystem: "latn" });
          }),
          progressionOfferId: "",
          showPurchaseModal: !1,
          errorLoadingPurchaseData: !1,
          isDataLoading: !0,
          rpPurchaseInProgress: !1,
          purchaseInProgress: !1,
          levelsToBuy: 1,
          minNumberOfLevelsToBuy: 1,
          tosChecked: !1,
          tosNotChecked: a.Ember.computed.not("tosChecked"),
          titleTraKey: "",
          selectedReward: null,
          pricePerLevel: 0,
          currentBalance: 0,
          animationsEnabled: a.Ember.computed.alias(
            "playerSettingsService.animationsEnabled",
          ),
          currentLevel: a.Ember.computed.alias(
            "eventHubService.rewardTrackProgress.level",
          ),
          totalNumberOfLevels: a.Ember.computed.alias(
            "eventHubService.rewardTrackProgress.totalLevels",
          ),
          shouldRenderSlider: a.Ember.computed(
            "numberOfLevelsToBuy",
            function () {
              return this.get("numberOfLevelsToBuy") > 1;
            },
          ),
          newLevel: a.Ember.computed(
            "currentLevel",
            "levelsToBuy",
            function () {
              return this.get("currentLevel") + this.get("levelsToBuy");
            },
          ),
          tosDisabled: a.Ember.computed(
            "notEnoughRp",
            "errorLoadingPurchaseData",
            function () {
              const e =
                this.get("notEnoughRp") || this.get("errorLoadingPurchaseData");
              return e && this.set("tosChecked", !1), e;
            },
          ),
          tosEnabled: a.Ember.computed.not("tosDisabled"),
          totalPrice: a.Ember.computed(
            "levelsToBuy",
            "pricePerLevel",
            function () {
              return this.get("levelsToBuy") * this.get("pricePerLevel");
            },
          ),
          totalPriceTra: a.Ember.computed("totalPrice", function () {
            const e = this.get("formatter").format(this.get("totalPrice"));
            return a.tra.formatString("event_hub_purchase_modal_rp", {
              price: e,
            });
          }),
          numberOfLevelsToBuy: a.Ember.computed(
            "currentLevel",
            "totalNumberOfLevels",
            function () {
              return this.get("totalNumberOfLevels") - this.get("currentLevel");
            },
          ),
          notEnoughRp: a.Ember.computed("newBalance", function () {
            return this.get("newBalance") < 0;
          }),
          newBalance: a.Ember.computed(
            "currentBalance",
            "totalPrice",
            function () {
              return this.get("currentBalance") - this.get("totalPrice");
            },
          ),
          newBalanceTra: a.Ember.computed("newBalance", function () {
            const e = this.get("formatter").format(this.get("newBalance"));
            return a.tra.formatString("event_hub_purchase_modal_rp", {
              price: e,
            });
          }),
          titleTra: a.Ember.computed("titleTraKey", function () {
            return this.get(`tra.${this.get("titleTraKey")}`);
          }),
          purchaseTosTra: a.Ember.computed.alias(
            "tra.event_hub_purchase_levels_tos",
          ),
          purchaseButtonDisabled: a.Ember.computed.or(
            "tosNotChecked",
            "purchaseInProgress",
          ),
          levelsButtonTra: a.Ember.computed.alias(
            "tra.event_hub_purchase_levels_button",
          ),
          init() {
            this._super(...arguments),
              this.addObserver(
                "showPurchaseModal",
                this.observeShowPurchaseModal,
              ),
              this.addObserver(
                "selectedReward",
                this.setLevelsToBuyFromSelectedReward,
              ),
              (0, a.dataBinding)("/lol-inventory", a.socket).observe(
                "/v1/wallet/RP",
                this,
                this.debouncedFetchProgressionPurchaseData,
              );
          },
          showPostPurchaseConfirmation() {
            const e = a.UIKit.getTemplateHelper().contentBlockDialog(
              this.get("tra.event_hub_purchase_levels_confirmation_header"),
              this.get("tra.event_hub_purchase_levels_confirmation_body"),
            );
            a.UIKit.getModalManager().add({
              type: "DialogAlert",
              data: { contents: e, okText: this.get("tra.event_hub_done") },
            });
          },
          showGeneralErrorModal() {
            const e = a.UIKit.getTemplateHelper().contentBlockDialog(
              this.get("tra.event_hub_generic_purchase_error_header"),
              this.get("tra.event_hub_generic_purchase_error_body"),
            );
            a.UIKit.getModalManager().add({
              type: "DialogAlert",
              data: {
                contents: e,
                okText: this.get("tra.event_hub_modal_ok_button"),
              },
            });
          },
          observeShowPurchaseModal() {
            this.get("showPurchaseModal") &&
              (this.fetchProgressionPurchaseData(),
              a.Telemetry.sendCustomData(l.TELEMETRY.TABLE, {
                eventName: l.TELEMETRY.OPEN_PURCHASE_LEVELS_EVENT,
                eventId: this.get("eventHubService.info.eventId"),
                playerCurrentLevel: this.get("currentLevel"),
                selectedRewardLevel:
                  this.get("selectedReward")?.item?.threshold,
                levelsToBuy: this.get("levelsToBuy"),
                totalPrice: this.get("totalPrice"),
                currentBalance: this.get("currentBalance"),
                notEnoughRp: this.get("notEnoughRp"),
              }));
          },
          setLevelsToBuyFromSelectedReward() {
            const e = this.get("selectedReward")?.item?.threshold;
            if (!e) return void this.set("levelsToBuy", 1);
            const t = e - this.get("currentLevel");
            this.set(
              "levelsToBuy",
              Math.max(1, Math.min(this.get("numberOfLevelsToBuy"), t)),
            );
          },
          fetchProgressionPurchaseData() {
            this.set("isDataLoading", !0),
              this.get("eventHubService")
                .getProgressionPurchaseData()
                .then((e) => {
                  this.setProperties({
                    errorLoadingPurchaseData: !1,
                    pricePerLevel: e.pricePerLevel,
                    currentBalance: e.rpBalance,
                    progressionOfferId: e.offerId,
                    levelsToBuy: Math.max(
                      1,
                      Math.min(
                        this.get("levelsToBuy"),
                        this.get("numberOfLevelsToBuy"),
                      ),
                    ),
                  });
                })
                .catch((e) => {
                  this.set("errorLoadingPurchaseData", !0),
                    a.logger.error(
                      "Failure loading progression purchase data",
                      e,
                    );
                })
                .finally(() => {
                  this.set("isDataLoading", !1);
                });
          },
          debouncedFetchProgressionPurchaseData() {
            this.set("isDataLoading", !0),
              this.debounceTask("fetchProgressionPurchaseData", 100);
          },
          willDestroyElement() {
            this.removeObserver("showPurchaseModal");
          },
          closeModal() {
            this.setProperties({
              showPurchaseModal: !1,
              purchaseInProgress: !1,
              tosChecked: !1,
            }),
              this.setLevelsToBuyFromSelectedReward();
          },
          showErrorModal(e) {
            a.UIKit.getModalManager().add({
              type: "DialogAlert",
              data: {
                contents: e,
                okText: this.get("tra.event_hub_modal_ok_button"),
              },
              show: !0,
            });
          },
          showPurchaseErrorModal() {
            const e = a.UIKit.getTemplateHelper().contentBlockDialog(
              this.get("tra.event_hub_generic_purchase_error_header"),
              this.get("tra.event_hub_generic_purchase_error_body"),
            );
            this.showErrorModal(e);
          },
          _animateLevelPurchaseIncrease() {
            if (!this.get("animationsEnabled")) return;
            const e = document.querySelector("video#level-increase");
            e && ((e.currentTime = 0), e.play());
          },
          actions: {
            handleCloseModalClick() {
              this.closeModal();
            },
            handleValidationChange(e) {},
            handleSelectedQuantityChange(e) {},
            updateLevelsToBuy(e) {
              this.get("levelsToBuy") < e.value &&
                this.debounceTask("_animateLevelPurchaseIncrease", 100),
                this.set("levelsToBuy", e.value);
              const t = a.AudioPlugin.getChannel("sfx-ui");
              this.get("levelsToBuy") === this.get("numberOfLevelsToBuy")
                ? t.playSound(o.MAX)
                : t.playSound(o.STEP);
            },
            decreaseLevelsToBuy() {
              this.get("levelsToBuy") !== this.get("minNumberOfLevelsToBuy") &&
                this.set(
                  "levelsToBuy",
                  Math.max(1, this.get("levelsToBuy") - 1),
                );
            },
            increaseLevelsToBuy() {
              this.get("levelsToBuy") !== this.get("numberOfLevelsToBuy") &&
                (this.set(
                  "levelsToBuy",
                  Math.min(
                    this.get("levelsToBuy") + 1,
                    this.get("numberOfLevelsToBuy"),
                  ),
                ),
                this._animateLevelPurchaseIncrease());
            },
            toggleTosChecked(e) {
              this.set("tosChecked", e.target.checked);
            },
            purchaseLevels() {
              if (!this.get("purchaseButtonDisabled"))
                return (
                  this.set("purchaseInProgress", !0),
                  a.Telemetry.sendCustomData(l.TELEMETRY.TABLE, {
                    eventName: l.TELEMETRY.PURCHASE_LEVELS_CLICK_EVENT,
                    eventId: this.get("eventHubService.info.eventId"),
                    playerCurrentLevel: this.get("currentLevel"),
                    levelsToBuy: this.get("levelsToBuy"),
                    totalPrice: this.get("totalPrice"),
                    currentBalance: this.get("currentBalance"),
                    newBalance: this.get("newBalance"),
                  }),
                  this.get("eventHubService")
                    .purchaseOffer(
                      this.get("progressionOfferId"),
                      this.get("levelsToBuy"),
                    )
                    .then(() => {
                      a.AudioPlugin.getChannel("sfx-ui").playSound(
                        "/fe/lol-static-assets/sounds/sfx-yourshop-stinger.ogg",
                      ),
                        this.showPostPurchaseConfirmation(),
                        this.closeModal();
                    })
                    .catch((e) => {
                      a.logger.error(
                        `Failure purchasing offer id: ${this.get("progressionOfferId")}`,
                        e,
                      ),
                        this.closeModal(),
                        this.showGeneralErrorModal();
                    })
                );
            },
            openRPPurchaseModal() {
              this.set("rpPurchaseInProgress", !0),
                a.Telemetry.sendCustomData(l.TELEMETRY.TABLE, {
                  eventName: l.TELEMETRY.PURCHASE_LEVELS_RP_TOP_UP_CLICK_EVENT,
                  eventId: this.get("eventHubService.info.eventId"),
                  playerCurrentLevel: this.get("currentLevel"),
                  levelsToBuy: this.get("levelsToBuy"),
                  totalPrice: this.get("totalPrice"),
                  currentBalance: this.get("currentBalance"),
                }),
                a.Payments.openPayments({
                  action: "RP_PURCHASE",
                  openedFrom: "event_hub_purchase_levels",
                  onClose:
                    this.debouncedFetchProgressionPurchaseData.bind(this),
                })
                  .catch((e) => {
                    a.logger.error(
                      "Levels Purchase Payments Modal - Failure loading payments modal",
                      e,
                    );
                    const t = a.UIKit.getTemplateHelper().contentBlockDialog(
                      this.get("tra.event_hub_generic_error_header"),
                      this.get("tra.event_hub_generic_purchase_rp_error_body"),
                    );
                    this.showErrorModal(t);
                  })
                  .finally(() => {
                    this.set("rpPurchaseInProgress", !1);
                  });
            },
          },
        });
        t.default = r;
      },
      (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        var a = n(1),
          l = n(5),
          s = n(22),
          o = a.Ember.Component.extend({
            classNames: ["event-shop-card-multi-purchase-modal"],
            eventHubService: a.Ember.inject.service("event-hub"),
            purchaseInProgress: !1,
            disableButtonState: !1,
            notEnoughRp: !1,
            offerPurchased: !1,
            offer: null,
            isPurchaseDisabled: a.Ember.computed.or(
              "disableButtonState",
              "purchaseInProgress",
              "validationError",
            ),
            tokenImageSrc: a.Ember.computed.alias(
              "eventHubService.tokenShopData.tokenImage",
            ),
            currentTokenBalance: a.Ember.computed.alias(
              "eventHubService.tokenBalance",
            ),
            shouldRenderMultiPurchaseSlider: a.Ember.computed(
              "offer.maxQuantity",
              function () {
                return this.get("offer.maxQuantity") > 1;
              },
            ),
            purchaseConstraints: a.Ember.computed("offer", function () {
              return (0, s.getOfferPurchaseConstraints)(this.get("offer"));
            }),
            minPurchasableQuantity: a.Ember.computed.alias(
              "purchaseConstraints.min",
            ),
            maxPurchasableQuantity: a.Ember.computed.alias(
              "purchaseConstraints.max",
            ),
            purchaseQuantity: a.Ember.computed(
              "offer",
              "purchaseConstraints",
              "selectedQuantity",
              function () {
                const e = this.get(
                  "purchaseConstraints.getPurchaseQuantityFromSelectedQuantity",
                )(this.get("selectedQuantity"));
                return e || 1;
              },
            ),
            purchasePrice: a.Ember.computed(
              "validationError",
              "purchaseConstraints",
              "purchaseQuantity",
              function () {
                return this.get("validationError")
                  ? this.get("purchaseConstraints.price")
                  : this.get("purchaseQuantity") *
                      this.get("purchaseConstraints.price");
              },
            ),
            futureTokenBalance: a.Ember.computed(
              "currentTokenBalance",
              "purchaseConstraints",
              "purchaseQuantity",
              function () {
                return (
                  this.get("currentTokenBalance") -
                  this.get("purchaseQuantity") *
                    this.get("purchaseConstraints.price")
                );
              },
            ),
            selectedQuantity: null,
            validationError: null,
            init() {
              this._super(...arguments),
                (this.notEnoughRp =
                  this.get("offer.offerState") === l.OFFER_STATES.UNAVAILABLE),
                (this.offerPurchased =
                  this.get("offer.offerState") === l.OFFER_STATES.OWNED),
                (this.disableButtonState =
                  this.notEnoughRp || this.offerPurchased),
                (this.purchaseInProgress =
                  this.get("offer.offerState") === l.OFFER_STATES.PURCHASING);
            },
            showPostPurchaseConfirmation() {
              const e = a.UIKit.getTemplateHelper().contentBlockDialog(
                this.get("tra.event_shop_card_purchase_confirmation_header"),
                this.get("tra.event_shop_card_purchase_confirmation_body"),
              );
              a.UIKit.getModalManager().add({
                type: "DialogAlert",
                data: { contents: e, okText: this.get("tra.event_hub_done") },
              });
            },
            showGeneralErrorModal() {
              const e = a.UIKit.getTemplateHelper().contentBlockDialog(
                this.get("tra.event_hub_generic_purchase_error_header"),
                this.get("tra.event_hub_generic_purchase_error_body"),
              );
              a.UIKit.getModalManager().add({
                type: "DialogAlert",
                data: {
                  contents: e,
                  okText: this.get("tra.event_hub_modal_ok_button"),
                },
              });
            },
            executePurchase({ id: e }) {
              return (
                a.Telemetry.sendCustomData(l.TELEMETRY.TABLE, {
                  eventName: l.TELEMETRY.PURCHASE_OFFER_EVENT,
                  eventId: this.get("eventHubService.info.eventId"),
                  clickedOffer: e,
                  tokenBalance: this.get("currentTokenBalance"),
                }),
                this.get("eventHubService")
                  .purchaseOffer(e, this.get("purchaseQuantity"))
                  .then(() => {
                    a.AudioPlugin.getChannel("sfx-ui").playSound(
                      "/fe/lol-static-assets/sounds/sfx-yourshop-stinger.ogg",
                    ),
                      this.showPostPurchaseConfirmation(),
                      this.closeModal();
                  })
                  .catch((t) => {
                    a.logger.error(`Failure purchasing offer id: ${e}`, t),
                      this.closeModal(),
                      this.showGeneralErrorModal();
                  })
              );
            },
            actions: {
              purchaseOffer(e) {
                !this.get("isPurchaseDisabled") &&
                  e &&
                  (this.set("purchaseInProgress", !0), this.executePurchase(e));
              },
              handleValidationChange(e) {
                this.set("validationError", e);
              },
              handleSelectedQuantityChange(e) {
                this.set("selectedQuantity", e);
              },
            },
          });
        t.default = o;
      },
      (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.getRouteByEventHubType =
            t.getOfferPurchaseConstraints =
            t.getCategoryOffersId =
            t.default =
              void 0);
        var a = n(5);
        const l = (e) => `event_shop_offers_category_${e.toLowerCase()}`;
        t.getCategoryOffersId = l;
        const s = (e) => {
          if (1 === e.items.length) {
            const t = e.items[0];
            return {
              min: t.quantity,
              max: t.quantity * e.maxQuantity,
              getPurchaseQuantityFromSelectedQuantity: (e) =>
                0 === t.quantity ? 0 : e / t.quantity,
              price: e.price,
            };
          }
          return {
            min: 1,
            max: e.maxQuantity,
            getPurchaseQuantityFromSelectedQuantity: (e) => e,
            price: e.price,
          };
        };
        t.getOfferPurchaseConstraints = s;
        const o = (e) => {
          switch (e) {
            case a.EVENT_HUB_TYPES.EVENT_SHOP:
              return a.ROUTES.EVENT_SHOP;
            case a.EVENT_HUB_TYPES.HALL_OF_LEGENDS:
              return a.ROUTES.HALL_OF_LEGENDS;
            default:
              return a.ROUTES.EVENT_SHOP;
          }
        };
        t.getRouteByEventHubType = o;
        var r = {
          getCategoryOffersId: l,
          getOfferPurchaseConstraints: s,
          getRouteByEventHubType: o,
        };
        t.default = r;
      },
      (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        var a = n(1).Ember.Component.extend({
          classNames: ["event-shop-category-nav-bar"],
        });
        t.default = a;
      },
      (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        var a = n(1),
          l = n(5),
          s = n(22),
          o = a.Ember.Component.extend({
            classNames: ["event-shop-nav-bar-tab"],
            classNameBindings: [
              "isTabSelected:event-shop-nav-bar-tab-selected",
            ],
            scrollToCategory: null,
            isTabSelected: a.Ember.computed("currentCategory", function () {
              return this.get("currentCategory") === this.get("category");
            }),
            categoryTra: a.Ember.computed("category", function () {
              return this.get(
                `tra.${(0, s.getCategoryOffersId)(this.category)}_tooltip`,
              );
            }),
            click() {
              this.scrollToCategory(this.get("category")),
                a.Telemetry.sendCustomData(l.TELEMETRY.TABLE, {
                  eventName: l.TELEMETRY.CATEGORY_NAV_BAR_CLICK_EVENT,
                  eventId: this.get("eventHubService.info.eventId"),
                  clickedCategory: this.get("category"),
                });
            },
          });
        t.default = o;
      },
      (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        var a = n(1),
          l = n(5),
          s = n(22),
          o = a.Ember.Component.extend({
            classNames: ["event-shop-category-offers"],
            categoryOffersId: a.Ember.computed(
              "categoryOffers.category",
              function () {
                return (0, s.getCategoryOffersId)(
                  this.get("categoryOffers.category"),
                );
              },
            ),
            didInsertElement() {
              this._super(...arguments);
              const e = this.element.querySelectorAll(
                `.${l.EVENT_SHOP_OFFER_CARD_CONTAINER_CLASSNAME}`,
              );
              this.configureOfferCardsObservers(e);
            },
            configureOfferCardsObservers(e) {
              e.length &&
                (this.observeElementIntersection(e[0]),
                this.observeElementIntersection(e[e.length - 1]));
            },
            observeElementIntersection(e) {
              (e.category = this.get("categoryOffers.category")),
                this.headerTxtObserver.observe(e);
            },
          });
        t.default = o;
      },
      (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        var a = n(1),
          l = a.Ember.Component.extend({
            classNames: ["event-shop-fallback"],
            tra: a.tra,
            error: null,
            errorMessageTra: a.Ember.computed("error", function () {
              return {
                title: this.get(`tra.${this.get("error.errorId")}_title`),
                description: this.get(
                  `tra.${this.get("error.errorId")}_description`,
                ),
              };
            }),
          });
        t.default = l;
      },
      (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        var a = n(1).Ember.Component.extend({
          classNames: ["event-shop-main-view"],
          isRewardTrackMinimized: !1,
          actions: {
            minimizeRewardTrack() {
              this.sendAction("toggleMinimizeRewardTrack");
            },
          },
        });
        t.default = a;
      },
      (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        var a = n(1),
          l = n(5);
        const s = n(29);
        var o = a.Ember.Component.extend({
          classNames: [l.EVENT_SHOP_OFFER_CARD_CONTAINER_CLASSNAME],
          classNameBindings: [
            "offer.highlighted:event-shop-token-shop-highlighted-card",
            "isOfferOwned:event-shop-token-shop-card-owned",
            "isOfferAvailable:event-shop-token-shop-card-available",
            "isOfferUnavailable:event-shop-token-shop-card-unavailable",
          ],
          offer: null,
          eventHubService: a.Ember.inject.service("event-hub"),
          tooltipManager: a.UIKit.getTooltipManager(),
          isMouseOver: !1,
          tokenShopData: a.Ember.computed.alias(
            "eventHubService.tokenShopData",
          ),
          tokenBalance: a.Ember.computed.alias("eventHubService.tokenBalance"),
          requiredTokens: a.Ember.computed(
            "offer.price",
            "tokenBalance",
            function () {
              return this.get("offer.price") - this.get("tokenBalance");
            },
          ),
          isPurchasing: a.Ember.computed("offer.offerState", function () {
            return this.get("offer.offerState") === l.OFFER_STATES.PURCHASING;
          }),
          isOfferRevealed: a.Ember.computed("offer.offerState", function () {
            return this.get("offer.offerState") !== l.OFFER_STATES.UNREVEALED;
          }),
          isOfferOwned: a.Ember.computed("offer.offerState", function () {
            return this.get("offer.offerState") === l.OFFER_STATES.OWNED;
          }),
          isOfferAvailable: a.Ember.computed("offer.offerState", function () {
            return this.get("offer.offerState") === l.OFFER_STATES.AVAILABLE;
          }),
          isOfferUnavailable: a.Ember.computed("offer.offerState", function () {
            return this.get("offer.offerState") === l.OFFER_STATES.UNAVAILABLE;
          }),
          shouldRenderOfferItemsCount: a.Ember.computed("offer", function () {
            return this.get("offer.items.length") > 1;
          }),
          offerImage: a.Ember.computed("offer.image", function () {
            const e = this.get("offer.image");
            return e && "/lol-game-data/assets/" !== e
              ? e
              : "/fe/lol-static-assets/images/event-shop/icon-shocked-poro-clear.png";
          }),
          displayMultiPurchaseModal: !1,
          didInsertElement() {
            this._super(...arguments),
              (this.priceDivTarget = this.element.querySelector(
                "div.event-shop-token-shop-offer-card-price-value",
              ));
            const e = {
                root: document.querySelector(
                  "#token-shop-scrollable-container",
                ),
                rootMargin: "0px",
                threshold: 0.7,
              },
              t = new IntersectionObserver((e) => this.enableTooltip(e), e),
              n = this.element;
            t.observe(n),
              this.renderTooltip(),
              this.addObserver("requiredTokens", this.renderTooltip);
          },
          willDestroyElement() {
            this.removeObserver("requiredTokens");
          },
          renderTooltip() {
            if (
              (this.get("tooltipManager").unassign(this.priceDivTarget),
              this.get("isOfferUnavailable"))
            ) {
              const e = this.renderTooltipContainer(s);
              this.get("tooltipManager").assign(
                this.priceDivTarget,
                e,
                {},
                {
                  targetAnchor: { x: "center", y: "bottom" },
                  positioningStrategy: "flip",
                },
              );
            }
          },
          renderTooltipContainer(e) {
            let t = this.get("tra.event_shop_progression_label_more_tokens");
            1 === this.get("requiredTokens") &&
              (t = this.get("tra.event_shop_progression_label_one_more_token"));
            const n = e({
                youNeedText: this.get("tra.event_shop_card_purchase_you_need"),
                requiredTokens: this.get("requiredTokens"),
                moreTokensText: t,
                unlockText: this.get("tra.event_shop_card_purchase_to_unlock"),
              }),
              a = document.createElement("div");
            return (a.innerHTML = n), a;
          },
          enableTooltip(e) {
            for (let t = 0; t < e.length; t++) {
              const n = e[t];
              this.get("isOfferUnavailable") &&
                (n.isIntersecting
                  ? (this.get("tooltipManager").enable(this.priceDivTarget),
                    this.isMouseOver &&
                      this.get("tooltipManager").show(this.priceDivTarget))
                  : this.get("tooltipManager").disable(this.priceDivTarget));
            }
          },
          mouseEnter() {
            (this.isMouseOver = !0),
              this.get("isOfferUnavailable") &&
                this.get("tooltipManager").show(this.priceDivTarget);
          },
          mouseLeave() {
            (this.isMouseOver = !1),
              this.get("tooltipManager").hide(this.priceDivTarget);
          },
          click() {
            this.get("isOfferRevealed") && this.showModal(this.get("offer"));
          },
          showModal(e) {
            return (
              a.Telemetry.sendCustomData(l.TELEMETRY.TABLE, {
                eventName: l.TELEMETRY.OPEN_OFFER_CARD_EVENT,
                eventId: this.get("eventHubService.info.eventId"),
                clickedOffer: e.id,
                tokenBalance: this.get(
                  "eventHubService.info.currentTokenBalance",
                ),
              }),
              this.set("displayMultiPurchaseModal", !0)
            );
          },
          actions: {
            closeModal() {
              this.set("displayMultiPurchaseModal", !1);
            },
          },
        });
        t.default = o;
      },
      (e, t, n) => {
        var a = n(30);
        e.exports = (a.default || a).template({
          compiler: [7, ">= 4.0.0"],
          main: function (e, t, n, a, l) {
            var s,
              o = null != t ? t : e.nullContext || {},
              r = n.helperMissing,
              i = "function",
              c = e.escapeExpression;
            return (
              '<lol-uikit-tooltip>\r\n  <lol-uikit-content-block class="event-shop-xp-tooltip-content" type="tooltip-system">\r\n    <div class="event-shop-progression-tooltip-block">\r\n      <p>\r\n        ' +
              c(
                typeof (s =
                  null != (s = n.youNeedText || (null != t ? t.youNeedText : t))
                    ? s
                    : r) === i
                  ? s.call(o, { name: "youNeedText", hash: {}, data: l })
                  : s,
              ) +
              "<span class='event-shop-progression-tooltip-block-bold'> " +
              c(
                typeof (s =
                  null !=
                  (s = n.requiredTokens || (null != t ? t.requiredTokens : t))
                    ? s
                    : r) === i
                  ? s.call(o, { name: "requiredTokens", hash: {}, data: l })
                  : s,
              ) +
              " " +
              c(
                typeof (s =
                  null !=
                  (s = n.moreTokensText || (null != t ? t.moreTokensText : t))
                    ? s
                    : r) === i
                  ? s.call(o, { name: "moreTokensText", hash: {}, data: l })
                  : s,
              ) +
              " </span>" +
              c(
                typeof (s =
                  null != (s = n.unlockText || (null != t ? t.unlockText : t))
                    ? s
                    : r) === i
                  ? s.call(o, { name: "unlockText", hash: {}, data: l })
                  : s,
              ) +
              "\r\n      </p>\r\n    </div>\r\n  </lol-uikit-content-block>\r\n</lol-uikit-tooltip>"
            );
          },
          useData: !0,
        });
      },
      (e, t, n) => {
        e.exports = n(31).default;
      },
      (e, t, n) => {
        "use strict";
        function a(e) {
          return e && e.__esModule ? e : { default: e };
        }
        function l(e) {
          if (e && e.__esModule) return e;
          var t = {};
          if (null != e)
            for (var n in e)
              Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
          return (t.default = e), t;
        }
        t.__esModule = !0;
        var s = l(n(32)),
          o = a(n(46)),
          r = a(n(34)),
          i = l(n(33)),
          c = l(n(47)),
          p = a(n(48));
        function u() {
          var e = new s.HandlebarsEnvironment();
          return (
            i.extend(e, s),
            (e.SafeString = o.default),
            (e.Exception = r.default),
            (e.Utils = i),
            (e.escapeExpression = i.escapeExpression),
            (e.VM = c),
            (e.template = function (t) {
              return c.template(t, e);
            }),
            e
          );
        }
        var d = u();
        (d.create = u),
          p.default(d),
          (d.default = d),
          (t.default = d),
          (e.exports = t.default);
      },
      (e, t, n) => {
        "use strict";
        function a(e) {
          return e && e.__esModule ? e : { default: e };
        }
        (t.__esModule = !0), (t.HandlebarsEnvironment = p);
        var l = n(33),
          s = a(n(34)),
          o = n(35),
          r = n(43),
          i = a(n(45));
        t.VERSION = "4.1.2";
        t.COMPILER_REVISION = 7;
        t.REVISION_CHANGES = {
          1: "<= 1.0.rc.2",
          2: "== 1.0.0-rc.3",
          3: "== 1.0.0-rc.4",
          4: "== 1.x.x",
          5: "== 2.0.0-alpha.x",
          6: ">= 2.0.0-beta.1",
          7: ">= 4.0.0",
        };
        var c = "[object Object]";
        function p(e, t, n) {
          (this.helpers = e || {}),
            (this.partials = t || {}),
            (this.decorators = n || {}),
            o.registerDefaultHelpers(this),
            r.registerDefaultDecorators(this);
        }
        p.prototype = {
          constructor: p,
          logger: i.default,
          log: i.default.log,
          registerHelper: function (e, t) {
            if (l.toString.call(e) === c) {
              if (t)
                throw new s.default("Arg not supported with multiple helpers");
              l.extend(this.helpers, e);
            } else this.helpers[e] = t;
          },
          unregisterHelper: function (e) {
            delete this.helpers[e];
          },
          registerPartial: function (e, t) {
            if (l.toString.call(e) === c) l.extend(this.partials, e);
            else {
              if (void 0 === t)
                throw new s.default(
                  'Attempting to register a partial called "' +
                    e +
                    '" as undefined',
                );
              this.partials[e] = t;
            }
          },
          unregisterPartial: function (e) {
            delete this.partials[e];
          },
          registerDecorator: function (e, t) {
            if (l.toString.call(e) === c) {
              if (t)
                throw new s.default(
                  "Arg not supported with multiple decorators",
                );
              l.extend(this.decorators, e);
            } else this.decorators[e] = t;
          },
          unregisterDecorator: function (e) {
            delete this.decorators[e];
          },
        };
        var u = i.default.log;
        (t.log = u), (t.createFrame = l.createFrame), (t.logger = i.default);
      },
      (e, t) => {
        "use strict";
        (t.__esModule = !0),
          (t.extend = o),
          (t.indexOf = function (e, t) {
            for (var n = 0, a = e.length; n < a; n++) if (e[n] === t) return n;
            return -1;
          }),
          (t.escapeExpression = function (e) {
            if ("string" != typeof e) {
              if (e && e.toHTML) return e.toHTML();
              if (null == e) return "";
              if (!e) return e + "";
              e = "" + e;
            }
            if (!l.test(e)) return e;
            return e.replace(a, s);
          }),
          (t.isEmpty = function (e) {
            return (!e && 0 !== e) || !(!c(e) || 0 !== e.length);
          }),
          (t.createFrame = function (e) {
            var t = o({}, e);
            return (t._parent = e), t;
          }),
          (t.blockParams = function (e, t) {
            return (e.path = t), e;
          }),
          (t.appendContextPath = function (e, t) {
            return (e ? e + "." : "") + t;
          });
        var n = {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#x27;",
            "`": "&#x60;",
            "=": "&#x3D;",
          },
          a = /[&<>"'`=]/g,
          l = /[&<>"'`=]/;
        function s(e) {
          return n[e];
        }
        function o(e) {
          for (var t = 1; t < arguments.length; t++)
            for (var n in arguments[t])
              Object.prototype.hasOwnProperty.call(arguments[t], n) &&
                (e[n] = arguments[t][n]);
          return e;
        }
        var r = Object.prototype.toString;
        t.toString = r;
        var i = function (e) {
          return "function" == typeof e;
        };
        i(/x/) &&
          (t.isFunction = i =
            function (e) {
              return (
                "function" == typeof e && "[object Function]" === r.call(e)
              );
            }),
          (t.isFunction = i);
        var c =
          Array.isArray ||
          function (e) {
            return (
              !(!e || "object" != typeof e) && "[object Array]" === r.call(e)
            );
          };
        t.isArray = c;
      },
      (e, t) => {
        "use strict";
        t.__esModule = !0;
        var n = [
          "description",
          "fileName",
          "lineNumber",
          "message",
          "name",
          "number",
          "stack",
        ];
        function a(e, t) {
          var l = t && t.loc,
            s = void 0,
            o = void 0;
          l && (e += " - " + (s = l.start.line) + ":" + (o = l.start.column));
          for (
            var r = Error.prototype.constructor.call(this, e), i = 0;
            i < n.length;
            i++
          )
            this[n[i]] = r[n[i]];
          Error.captureStackTrace && Error.captureStackTrace(this, a);
          try {
            l &&
              ((this.lineNumber = s),
              Object.defineProperty
                ? Object.defineProperty(this, "column", {
                    value: o,
                    enumerable: !0,
                  })
                : (this.column = o));
          } catch (e) {}
        }
        (a.prototype = new Error()), (t.default = a), (e.exports = t.default);
      },
      (e, t, n) => {
        "use strict";
        function a(e) {
          return e && e.__esModule ? e : { default: e };
        }
        (t.__esModule = !0),
          (t.registerDefaultHelpers = function (e) {
            l.default(e),
              s.default(e),
              o.default(e),
              r.default(e),
              i.default(e),
              c.default(e),
              p.default(e);
          });
        var l = a(n(36)),
          s = a(n(37)),
          o = a(n(38)),
          r = a(n(39)),
          i = a(n(40)),
          c = a(n(41)),
          p = a(n(42));
      },
      (e, t, n) => {
        "use strict";
        t.__esModule = !0;
        var a = n(33);
        (t.default = function (e) {
          e.registerHelper("blockHelperMissing", function (t, n) {
            var l = n.inverse,
              s = n.fn;
            if (!0 === t) return s(this);
            if (!1 === t || null == t) return l(this);
            if (a.isArray(t))
              return t.length > 0
                ? (n.ids && (n.ids = [n.name]), e.helpers.each(t, n))
                : l(this);
            if (n.data && n.ids) {
              var o = a.createFrame(n.data);
              (o.contextPath = a.appendContextPath(n.data.contextPath, n.name)),
                (n = { data: o });
            }
            return s(t, n);
          });
        }),
          (e.exports = t.default);
      },
      (e, t, n) => {
        "use strict";
        t.__esModule = !0;
        var a,
          l = n(33),
          s = n(34),
          o = (a = s) && a.__esModule ? a : { default: a };
        (t.default = function (e) {
          e.registerHelper("each", function (e, t) {
            if (!t) throw new o.default("Must pass iterator to #each");
            var n = t.fn,
              a = t.inverse,
              s = 0,
              r = "",
              i = void 0,
              c = void 0;
            function p(t, a, s) {
              i &&
                ((i.key = t),
                (i.index = a),
                (i.first = 0 === a),
                (i.last = !!s),
                c && (i.contextPath = c + t)),
                (r += n(e[t], {
                  data: i,
                  blockParams: l.blockParams([e[t], t], [c + t, null]),
                }));
            }
            if (
              (t.data &&
                t.ids &&
                (c = l.appendContextPath(t.data.contextPath, t.ids[0]) + "."),
              l.isFunction(e) && (e = e.call(this)),
              t.data && (i = l.createFrame(t.data)),
              e && "object" == typeof e)
            )
              if (l.isArray(e))
                for (var u = e.length; s < u; s++)
                  s in e && p(s, s, s === e.length - 1);
              else {
                var d = void 0;
                for (var m in e)
                  e.hasOwnProperty(m) &&
                    (void 0 !== d && p(d, s - 1), (d = m), s++);
                void 0 !== d && p(d, s - 1, !0);
              }
            return 0 === s && (r = a(this)), r;
          });
        }),
          (e.exports = t.default);
      },
      (e, t, n) => {
        "use strict";
        t.__esModule = !0;
        var a,
          l = n(34),
          s = (a = l) && a.__esModule ? a : { default: a };
        (t.default = function (e) {
          e.registerHelper("helperMissing", function () {
            if (1 !== arguments.length)
              throw new s.default(
                'Missing helper: "' +
                  arguments[arguments.length - 1].name +
                  '"',
              );
          });
        }),
          (e.exports = t.default);
      },
      (e, t, n) => {
        "use strict";
        t.__esModule = !0;
        var a = n(33);
        (t.default = function (e) {
          e.registerHelper("if", function (e, t) {
            return (
              a.isFunction(e) && (e = e.call(this)),
              (!t.hash.includeZero && !e) || a.isEmpty(e)
                ? t.inverse(this)
                : t.fn(this)
            );
          }),
            e.registerHelper("unless", function (t, n) {
              return e.helpers.if.call(this, t, {
                fn: n.inverse,
                inverse: n.fn,
                hash: n.hash,
              });
            });
        }),
          (e.exports = t.default);
      },
      (e, t) => {
        "use strict";
        (t.__esModule = !0),
          (t.default = function (e) {
            e.registerHelper("log", function () {
              for (
                var t = [void 0], n = arguments[arguments.length - 1], a = 0;
                a < arguments.length - 1;
                a++
              )
                t.push(arguments[a]);
              var l = 1;
              null != n.hash.level
                ? (l = n.hash.level)
                : n.data && null != n.data.level && (l = n.data.level),
                (t[0] = l),
                e.log.apply(e, t);
            });
          }),
          (e.exports = t.default);
      },
      (e, t) => {
        "use strict";
        (t.__esModule = !0),
          (t.default = function (e) {
            e.registerHelper("lookup", function (e, t) {
              return e
                ? "constructor" !== t || e.propertyIsEnumerable(t)
                  ? e[t]
                  : void 0
                : e;
            });
          }),
          (e.exports = t.default);
      },
      (e, t, n) => {
        "use strict";
        t.__esModule = !0;
        var a = n(33);
        (t.default = function (e) {
          e.registerHelper("with", function (e, t) {
            a.isFunction(e) && (e = e.call(this));
            var n = t.fn;
            if (a.isEmpty(e)) return t.inverse(this);
            var l = t.data;
            return (
              t.data &&
                t.ids &&
                ((l = a.createFrame(t.data)).contextPath = a.appendContextPath(
                  t.data.contextPath,
                  t.ids[0],
                )),
              n(e, {
                data: l,
                blockParams: a.blockParams([e], [l && l.contextPath]),
              })
            );
          });
        }),
          (e.exports = t.default);
      },
      (e, t, n) => {
        "use strict";
        (t.__esModule = !0),
          (t.registerDefaultDecorators = function (e) {
            s.default(e);
          });
        var a,
          l = n(44),
          s = (a = l) && a.__esModule ? a : { default: a };
      },
      (e, t, n) => {
        "use strict";
        t.__esModule = !0;
        var a = n(33);
        (t.default = function (e) {
          e.registerDecorator("inline", function (e, t, n, l) {
            var s = e;
            return (
              t.partials ||
                ((t.partials = {}),
                (s = function (l, s) {
                  var o = n.partials;
                  n.partials = a.extend({}, o, t.partials);
                  var r = e(l, s);
                  return (n.partials = o), r;
                })),
              (t.partials[l.args[0]] = l.fn),
              s
            );
          });
        }),
          (e.exports = t.default);
      },
      (e, t, n) => {
        "use strict";
        t.__esModule = !0;
        var a = n(33),
          l = {
            methodMap: ["debug", "info", "warn", "error"],
            level: "info",
            lookupLevel: function (e) {
              if ("string" == typeof e) {
                var t = a.indexOf(l.methodMap, e.toLowerCase());
                e = t >= 0 ? t : parseInt(e, 10);
              }
              return e;
            },
            log: function (e) {
              if (
                ((e = l.lookupLevel(e)),
                "undefined" != typeof console && l.lookupLevel(l.level) <= e)
              ) {
                var t = l.methodMap[e];
                console[t] || (t = "log");
                for (
                  var n = arguments.length, a = Array(n > 1 ? n - 1 : 0), s = 1;
                  s < n;
                  s++
                )
                  a[s - 1] = arguments[s];
                console[t].apply(console, a);
              }
            },
          };
        (t.default = l), (e.exports = t.default);
      },
      (e, t) => {
        "use strict";
        function n(e) {
          this.string = e;
        }
        (t.__esModule = !0),
          (n.prototype.toString = n.prototype.toHTML =
            function () {
              return "" + this.string;
            }),
          (t.default = n),
          (e.exports = t.default);
      },
      (e, t, n) => {
        "use strict";
        (t.__esModule = !0),
          (t.checkRevision = function (e) {
            var t = (e && e[0]) || 1,
              n = r.COMPILER_REVISION;
            if (t !== n) {
              if (t < n) {
                var a = r.REVISION_CHANGES[n],
                  l = r.REVISION_CHANGES[t];
                throw new o.default(
                  "Template was precompiled with an older version of Handlebars than the current runtime. Please update your precompiler to a newer version (" +
                    a +
                    ") or downgrade your runtime to an older version (" +
                    l +
                    ").",
                );
              }
              throw new o.default(
                "Template was precompiled with a newer version of Handlebars than the current runtime. Please update your runtime to a newer version (" +
                  e[1] +
                  ").",
              );
            }
          }),
          (t.template = function (e, t) {
            if (!t) throw new o.default("No environment passed to template");
            if (!e || !e.main)
              throw new o.default("Unknown template object: " + typeof e);
            (e.main.decorator = e.main_d), t.VM.checkRevision(e.compiler);
            var n = {
              strict: function (e, t) {
                if (!(t in e))
                  throw new o.default('"' + t + '" not defined in ' + e);
                return e[t];
              },
              lookup: function (e, t) {
                for (var n = e.length, a = 0; a < n; a++)
                  if (e[a] && null != e[a][t]) return e[a][t];
              },
              lambda: function (e, t) {
                return "function" == typeof e ? e.call(t) : e;
              },
              escapeExpression: l.escapeExpression,
              invokePartial: function (n, a, s) {
                s.hash &&
                  ((a = l.extend({}, a, s.hash)), s.ids && (s.ids[0] = !0)),
                  (n = t.VM.resolvePartial.call(this, n, a, s));
                var r = t.VM.invokePartial.call(this, n, a, s);
                if (
                  (null == r &&
                    t.compile &&
                    ((s.partials[s.name] = t.compile(n, e.compilerOptions, t)),
                    (r = s.partials[s.name](a, s))),
                  null != r)
                ) {
                  if (s.indent) {
                    for (
                      var i = r.split("\n"), c = 0, p = i.length;
                      c < p && (i[c] || c + 1 !== p);
                      c++
                    )
                      i[c] = s.indent + i[c];
                    r = i.join("\n");
                  }
                  return r;
                }
                throw new o.default(
                  "The partial " +
                    s.name +
                    " could not be compiled when running in runtime-only mode",
                );
              },
              fn: function (t) {
                var n = e[t];
                return (n.decorator = e[t + "_d"]), n;
              },
              programs: [],
              program: function (e, t, n, a, l) {
                var s = this.programs[e],
                  o = this.fn(e);
                return (
                  t || l || a || n
                    ? (s = i(this, e, o, t, n, a, l))
                    : s || (s = this.programs[e] = i(this, e, o)),
                  s
                );
              },
              data: function (e, t) {
                for (; e && t--; ) e = e._parent;
                return e;
              },
              merge: function (e, t) {
                var n = e || t;
                return e && t && e !== t && (n = l.extend({}, t, e)), n;
              },
              nullContext: Object.seal({}),
              noop: t.VM.noop,
              compilerInfo: e.compiler,
            };
            function a(t) {
              var l =
                  arguments.length <= 1 || void 0 === arguments[1]
                    ? {}
                    : arguments[1],
                s = l.data;
              a._setup(l),
                !l.partial &&
                  e.useData &&
                  (s = (function (e, t) {
                    (t && "root" in t) ||
                      ((t = t ? r.createFrame(t) : {}).root = e);
                    return t;
                  })(t, s));
              var o = void 0,
                i = e.useBlockParams ? [] : void 0;
              function c(t) {
                return "" + e.main(n, t, n.helpers, n.partials, s, i, o);
              }
              return (
                e.useDepths &&
                  (o = l.depths
                    ? t != l.depths[0]
                      ? [t].concat(l.depths)
                      : l.depths
                    : [t]),
                (c = p(e.main, c, n, l.depths || [], s, i))(t, l)
              );
            }
            return (
              (a.isTop = !0),
              (a._setup = function (a) {
                a.partial
                  ? ((n.helpers = a.helpers),
                    (n.partials = a.partials),
                    (n.decorators = a.decorators))
                  : ((n.helpers = n.merge(a.helpers, t.helpers)),
                    e.usePartial &&
                      (n.partials = n.merge(a.partials, t.partials)),
                    (e.usePartial || e.useDecorators) &&
                      (n.decorators = n.merge(a.decorators, t.decorators)));
              }),
              (a._child = function (t, a, l, s) {
                if (e.useBlockParams && !l)
                  throw new o.default("must pass block params");
                if (e.useDepths && !s)
                  throw new o.default("must pass parent depths");
                return i(n, t, e[t], a, 0, l, s);
              }),
              a
            );
          }),
          (t.wrapProgram = i),
          (t.resolvePartial = function (e, t, n) {
            e
              ? e.call || n.name || ((n.name = e), (e = n.partials[e]))
              : (e =
                  "@partial-block" === n.name
                    ? n.data["partial-block"]
                    : n.partials[n.name]);
            return e;
          }),
          (t.invokePartial = function (e, t, n) {
            var a = n.data && n.data["partial-block"];
            (n.partial = !0),
              n.ids && (n.data.contextPath = n.ids[0] || n.data.contextPath);
            var s = void 0;
            n.fn &&
              n.fn !== c &&
              (function () {
                n.data = r.createFrame(n.data);
                var e = n.fn;
                (s = n.data["partial-block"] =
                  function (t) {
                    var n =
                      arguments.length <= 1 || void 0 === arguments[1]
                        ? {}
                        : arguments[1];
                    return (
                      (n.data = r.createFrame(n.data)),
                      (n.data["partial-block"] = a),
                      e(t, n)
                    );
                  }),
                  e.partials &&
                    (n.partials = l.extend({}, n.partials, e.partials));
              })();
            void 0 === e && s && (e = s);
            if (void 0 === e)
              throw new o.default(
                "The partial " + n.name + " could not be found",
              );
            if (e instanceof Function) return e(t, n);
          }),
          (t.noop = c);
        var a,
          l = (function (e) {
            if (e && e.__esModule) return e;
            var t = {};
            if (null != e)
              for (var n in e)
                Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
            return (t.default = e), t;
          })(n(33)),
          s = n(34),
          o = (a = s) && a.__esModule ? a : { default: a },
          r = n(32);
        function i(e, t, n, a, l, s, o) {
          function r(t) {
            var l =
                arguments.length <= 1 || void 0 === arguments[1]
                  ? {}
                  : arguments[1],
              r = o;
            return (
              !o ||
                t == o[0] ||
                (t === e.nullContext && null === o[0]) ||
                (r = [t].concat(o)),
              n(
                e,
                t,
                e.helpers,
                e.partials,
                l.data || a,
                s && [l.blockParams].concat(s),
                r,
              )
            );
          }
          return (
            ((r = p(n, r, e, o, a, s)).program = t),
            (r.depth = o ? o.length : 0),
            (r.blockParams = l || 0),
            r
          );
        }
        function c() {
          return "";
        }
        function p(e, t, n, a, s, o) {
          if (e.decorator) {
            var r = {};
            (t = e.decorator(t, r, n, a && a[0], s, o, a)), l.extend(t, r);
          }
          return t;
        }
      },
      (e, t, n) => {
        "use strict";
        (t.__esModule = !0),
          (t.default = function (e) {
            var t = void 0 !== n.g ? n.g : window,
              a = t.Handlebars;
            e.noConflict = function () {
              return t.Handlebars === e && (t.Handlebars = a), e;
            };
          }),
          (e.exports = t.default);
      },
      (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        var a = n(1),
          l = n(5),
          s = a.Ember.Component.extend({
            classNames: ["event-shop-progression"],
            eventHubService: a.Ember.inject.service("event-hub"),
            failureLoadingRewardTrack: a.Ember.computed.alias(
              "eventHubService.failureLoadingRewardTrack",
            ),
            rewardTrackItems: a.Ember.computed.alias(
              "eventHubService.rewardTrackItems",
            ),
            eventShopProgressionData: a.Ember.computed.alias(
              "eventHubService.eventShopProgressionData",
            ),
            unclaimedRewards: a.Ember.computed.alias(
              "eventHubService.unclaimedRewards.rewardsCount",
            ),
            lockedTokens: a.Ember.computed.alias(
              "eventHubService.unclaimedRewards.lockedTokensCount",
            ),
            showPassPurchaseModal: !1,
            isLoadingPassAvailability: !0,
            passAvailableToPurchase: !1,
            passUnavailable: a.Ember.computed.not("passAvailableToPurchase"),
            hasUnclaimedRewards: a.Ember.computed(
              "unclaimedRewards",
              function () {
                return this.get("unclaimedRewards") > 0;
              },
            ),
            eventPassItems: a.Ember.computed(
              "eventShopProgressionData.eventPassBundlesCatalogEntry",
              function () {
                return (
                  this.get(
                    "eventShopProgressionData.eventPassBundlesCatalogEntry",
                  ) || []
                ).map((e) => ({ itemId: e.itemId, inventoryType: "BUNDLES" }));
              },
            ),
            init() {
              this._super(...arguments),
                this.addObserver(
                  "model.navOptions.openPassPurchase",
                  this.setShowPassPurchaseModalFromModel,
                ),
                this.setShowPassPurchaseModalFromModel();
            },
            willDestroyElement() {
              this._super(...arguments),
                this.removeObserver("model.navOptions.openPassPurchase");
            },
            didInsertElement() {
              this._super(...arguments),
                this.set("isLoadingPassAvailability", !0),
                this.checkPassAvailability();
            },
            setShowPassPurchaseModalFromModel() {
              const e = this.get("model.navOptions.openPassPurchase");
              this.set("showPassPurchaseModal", e);
            },
            checkPassAvailability() {
              this.get("eventShopProgressionData.passPurchased")
                ? this.set("isLoadingPassAvailability", !1)
                : this.get("eventHubService")
                    .getPassBundles()
                    .then((e) => {
                      e.length && this.set("passAvailableToPurchase", !0);
                    })
                    .catch((e) => {
                      a.logger.error("Failure loading pass options", e);
                    })
                    .finally(() => {
                      this.set("isLoadingPassAvailability", !1);
                    });
            },
            actions: {
              passPurchaseClick() {
                a.Telemetry.sendCustomData(l.TELEMETRY.TABLE, {
                  eventName: l.TELEMETRY.PURCHASE_PASS_CLICK_EVENT,
                  eventId: this.get("eventHubService.info.eventId"),
                  lockedTokens: this.get(
                    "eventHubService.info.lockedTokenCount",
                  ),
                  tokenBalance: this.get(
                    "eventHubService.info.currentTokenBalance",
                  ),
                }),
                  this.set("showPassPurchaseModal", !0);
              },
            },
          });
        t.default = s;
      },
      (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        var a = n(1),
          l = n(51),
          s = n(5);
        const { TRACKER_SIZE: o } = l.REWARD_TRACKER;
        var r = a.Ember.Component.extend({
          classNames: ["event-shop-reward-track-wrapper"],
          eventHubService: a.Ember.inject.service("event-hub"),
          trackerSize: o.SMALL,
          displayCurrentBonusIteration: !0,
          rewardTrackProgress: a.Ember.computed.alias(
            "eventHubService.rewardTrackProgress",
          ),
          rewardTrackItems: a.Ember.computed.alias(
            "eventHubService.rewardTrackItems",
          ),
          rewardTrackBonusProgress: a.Ember.computed.alias(
            "eventHubService.rewardTrackBonusProgress",
          ),
          rewardTrackBonusItems: a.Ember.computed.alias(
            "eventHubService.rewardTrackBonusItems",
          ),
          isGracePeriod: a.Ember.computed.alias(
            "eventHubService.isGracePeriod",
          ),
          scrollingArrowsEnabled: !0,
          handleClickItem(e) {
            this.trackItemHasUnclaimedRewards(e) &&
              (a.AudioPlugin.getChannel("sfx-ui").playSound(
                "/fe/lol-static-assets/sounds/sfx-uikit-grid-click.ogg",
              ),
              this.get("eventHubService").claimAllPendingRewards());
          },
          trackItemHasUnclaimedRewards: ({ rewardOptions: e }) =>
            e.some(
              ({ state: e }) => e === s.REWARD_TRACK_ITEM_STATE.UNSELECTED,
            ),
          actions: {
            clickItem(e) {
              a.Ember.run.debounce(this, this.handleClickItem, e, 250);
            },
          },
        });
        t.default = r;
      },
      (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          Object.defineProperty(t, "PAW", {
            enumerable: !0,
            get: function () {
              return a.default;
            },
          }),
          Object.defineProperty(t, "PROFILE_PRIVACY", {
            enumerable: !0,
            get: function () {
              return i.default;
            },
          }),
          Object.defineProperty(t, "QUEUES", {
            enumerable: !0,
            get: function () {
              return l.default;
            },
          }),
          Object.defineProperty(t, "REWARD_TRACKER", {
            enumerable: !0,
            get: function () {
              return s.default;
            },
          }),
          Object.defineProperty(t, "SETTINGS", {
            enumerable: !0,
            get: function () {
              return r.default;
            },
          }),
          Object.defineProperty(t, "SOCIAL", {
            enumerable: !0,
            get: function () {
              return o.default;
            },
          }),
          Object.defineProperty(t, "TIME", {
            enumerable: !0,
            get: function () {
              return c.default;
            },
          });
        var a = p(n(52)),
          l = p(n(63)),
          s = p(n(64)),
          o = p(n(65)),
          r = p(n(66)),
          i = p(n(67)),
          c = p(n(68));
        function p(e) {
          return e && e.__esModule ? e : { default: e };
        }
      },
      (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        var a = m(n(53)),
          l = m(n(54)),
          s = m(n(55)),
          o = m(n(56)),
          r = m(n(57)),
          i = m(n(58)),
          c = m(n(59)),
          p = m(n(60)),
          u = m(n(61)),
          d = m(n(62));
        function m(e) {
          return e && e.__esModule ? e : { default: e };
        }
        var h = {
          COMPONENT_TYPES: a.default,
          CURRENCY_TYPES: l.default,
          INVENTORY_TYPES: s.default,
          MEDIA_TYPES: o.default,
          MEDIA_LOAD_TYPES: r.default,
          MODAL_TYPES: i.default,
          OFFER_PURCHASE_STATES: c.default,
          OFFER_VALIDATION_STATES: p.default,
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
          a = "RANKED_FLEX_SR",
          l = "RANKED_FLEX_TT",
          s = "CHERRY",
          o = "RANKED_TFT",
          r = "RANKED_TFT_DOUBLE_UP",
          i = "RANKED_TFT_TURBO",
          c = "RANKED_TFT_PAIRS",
          p = [n, a],
          u = [...p, l],
          d = [s],
          m = [o, r],
          h = [i, c],
          v = [...m, ...h],
          f = [...u, ...m],
          _ = [...h, ...d];
        var g = {
          RANKED_SOLO_5x5_QUEUE_TYPE: n,
          RANKED_FLEX_SR_QUEUE_TYPE: a,
          RANKED_FLEX_TT_QUEUE_TYPE: l,
          RANKED_CHERRY_QUEUE_TYPE: s,
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
          ALL_RANKED_AND_RATED_QUEUE_TYPES: [...f, ..._],
        };
        t.default = g;
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
          a = { PRIVATE: "PRIVATE", PUBLIC: "PUBLIC" };
        var l = {
          ProfilePrivacyEnabledState: n,
          ProfilePrivacySetting: a,
          DEFAULT_PROFILE_PRIVACY: {
            enabledState: n.UNKNOWN,
            setting: a.PUBLIC,
          },
        };
        t.default = l;
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
        const a = 36e5,
          l = 864e5,
          s = 6048e5,
          o = {
            MILLISECONDS_IN_A_SECOND: 1e3,
            MILLISECONDS_IN_A_MINUTE: 6e4,
            MILLISECONDS_IN_A_HOUR: a,
            MILLISECONDS_IN_A_DAY: l,
            MILLISECONDS_IN_A_WEEK: s,
            MILLISECONDS_IN_A_YEAR: 314496e5,
          };
        t.TIME_CONVERSIONS = o;
        var r = { TIME_UNITS: n, TIME_CONVERSIONS: o };
        t.default = r;
      },
      (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        var a = n(1),
          l = a.Ember.Component.extend({
            classNames: ["event-shop-token-shop-balance-amount"],
            eventHubService: a.Ember.inject.service("event-hub"),
            init() {
              this._super(...arguments),
                this.addObserver(
                  "eventHubService.tokenBalance",
                  this.renderTokenBalance,
                );
            },
            didInsertElement() {
              this._super(...arguments), this.renderTokenBalance();
            },
            willDestroyElement() {
              this.removeObserver("eventHubService.tokenBalance");
            },
            renderTokenBalance() {
              const e = this.get("eventHubService.tokenBalance");
              this.element.style.setProperty(
                "--event-shop-token-balance",
                e || 0,
              );
            },
          });
        t.default = l;
      },
      (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        var a = n(1),
          l = n(22);
        var s = a.Ember.Component.extend({
          classNames: ["event-shop-token-shop"],
          eventHubService: a.Ember.inject.service("event-hub"),
          categoriesOffers: a.Ember.computed(
            "eventHubService.categoriesOffers",
            function () {
              const e = this.get("eventHubService.categoriesOffers");
              return e?.length
                ? e.map((e) => {
                    const t = (0, l.getCategoryOffersId)(e.category);
                    return { ...e, categoryTitle: a.tra.get(t) };
                  })
                : [];
            },
          ),
          init() {
            this._super(...arguments);
            this.headerTxtObserver = new IntersectionObserver(
              (e) => this.updateHeader(e),
              { rootMargin: "0px", threshold: 0.9 },
            );
          },
          setCurrentCategory(e) {
            this.setProperties({ currentCategory: e });
          },
          updateHeader(e) {
            for (let t = 0; t < e.length; t++) {
              const n = e[t];
              if (n.isIntersecting) {
                this.setCurrentCategory(n.target.category);
                break;
              }
            }
          },
          actions: {
            scrollToCategory(e) {
              const t = this.element.querySelector(
                `#${(0, l.getCategoryOffersId)(e)}`,
              );
              this.element.querySelector(
                "#token-shop-scrollable-container",
              ).scrollTop = t.offsetTop - 70;
            },
          },
        });
        t.default = s;
      },
      (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        var a = n(1),
          l = a.Ember.Component.extend({
            classNames: ["event-shop-xp"],
            eventHubService: a.Ember.inject.service("event-hub"),
            rewardTrackXP: a.Ember.computed.alias(
              "eventHubService.rewardTrackXP",
            ),
            isGracePeriod: a.Ember.computed.alias(
              "eventHubService.isGracePeriod",
            ),
            unclaimedRewards: a.Ember.computed.alias(
              "eventHubService.unclaimedRewards.rewardsCount",
            ),
            completedLoops: a.Ember.computed("rewardTrackXP", function () {
              return Math.max(this.get("rewardTrackXP.iteration") - 1, 0);
            }),
            hasUnclaimedRewards: a.Ember.computed(
              "unclaimedRewards",
              function () {
                return this.get("unclaimedRewards") > 0;
              },
            ),
            levelLabel: a.Ember.computed("rewardTrackXP", function () {
              return this.get("rewardTrackXP.currentLevel") > 0
                ? this.get("tra").formatString(
                    "event_shop_xp_label_current_level",
                    { currentLevel: this.get("rewardTrackXP.currentLevel") },
                  )
                : this.get("tra.event_shop_xp_label_level_start");
            }),
            xpOverflow: a.Ember.computed("rewardTrackXP", function () {
              return (
                this.get("rewardTrackXP.isBonusPhase") &&
                this.get("rewardTrackXP.currentLevelXP") >=
                  this.get("rewardTrackXP.totalLevelXP")
              );
            }),
          });
        t.default = l;
      },
      (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        var a = n(1),
          l = a.Ember.Component.extend({
            classNames: ["hol-claim-button"],
            classNameBindings: [
              "claimingInProgress:hol-claim-button-claiming-in-progress",
            ],
            eventHubService: a.Ember.inject.service("event-hub"),
            playerSettingsService: a.Ember.inject.service("player-settings"),
            claimingInProgress: !1,
            unclaimedRewards: a.Ember.computed.alias(
              "eventHubService.unclaimedRewards.rewardsCount",
            ),
            claimButtonDisabled: a.Ember.computed(
              "unclaimedRewards",
              function () {
                return (
                  !this.get("unclaimedRewards") ||
                  0 === this.get("unclaimedRewards")
                );
              },
            ),
            shouldShowAnimations: a.Ember.computed(
              "playerSettingsService.animationsEnabled",
              "unclaimedRewards",
              function () {
                return (
                  this.get("playerSettingsService.animationsEnabled") &&
                  this.get("unclaimedRewards") > 0
                );
              },
            ),
            mouseDown() {
              const e = this.element.querySelector(
                ".hol-claim-button-animation-active",
              );
              e && ((e.currentTime = 0), e.play());
            },
            actions: {
              claimAllRewards() {
                this.get("claimButtonDisabled") ||
                  (this.get("eventHubService").claimAllPendingRewards(),
                  this.set("claimingInProgress", !0),
                  a.Ember.run.later(
                    this,
                    () => this.set("claimingInProgress", !1),
                    5e3,
                  ));
              },
            },
          });
        t.default = l;
      },
      (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        var a = n(1),
          l = n(51),
          s = n(5);
        const { MILESTONE_STAGES: o, REWARD_STATE: r } = l.REWARD_TRACKER;
        var i = a.Ember.Component.extend({
          classNames: ["hol-level-icon-flames"],
          classNameBindings: [
            "flameClicked:hol-level-icon-flames-click",
            "applyHoverClassNameBinding:hol-level-icon-flames-hover",
          ],
          itemIndex: null,
          levelClass: null,
          reward: null,
          isRewardItemClicked: !1,
          isRewardItemHovering: !1,
          applyHoverClassNameBinding: a.Ember.computed.or(
            "isRewardItemClicked",
            "isRewardItemHovering",
          ),
          flameClicked: !1,
          animationsEnabled: !1,
          eventHubService: a.Ember.inject.service("event-hub"),
          rewardsService: a.Ember.inject.service("rewards"),
          playerSettingsService: a.Ember.inject.service("player-settings"),
          state: a.Ember.computed("reward", function () {
            return this.get("reward")?.rewardOptions?.[0]?.state;
          }),
          stateClass: a.Ember.computed("state", function () {
            const e = this.get("state")?.toLocaleLowerCase();
            return e || "";
          }),
          iconCursorClass: a.Ember.computed("replayEnabled", function () {
            return this.get("replayEnabled")
              ? "reward-level-icon-flames-clickable"
              : "";
          }),
          replayEnabled: a.Ember.computed("levelClass", function () {
            return (
              this.get("levelClass") === o.COMPLETED ||
              this.get("levelClass") === o.CURRENT
            );
          }),
          animationIdleSrc: a.Ember.computed(
            "state",
            "replayEnabled",
            function () {
              const e = this.get("state"),
                t = this.get("replayEnabled");
              let n = "locked";
              return (
                e === r.UNSELECTED
                  ? (n = "claimable")
                  : (e === r.SELECTED || t) && (n = "claimed"),
                `/fe/lol-event-hub/videos/MILESTONE_Flame-${n}-default.webm`
              );
            },
          ),
          animationHoverSrc: a.Ember.computed(
            "state",
            "replayEnabled",
            function () {
              const e = this.get("state"),
                t = this.get("replayEnabled");
              let n = "locked";
              return (
                e === r.UNSELECTED
                  ? (n = "claimable")
                  : (e === r.SELECTED || t) && (n = "claimed"),
                `/fe/lol-event-hub/videos/MILESTONE_Flame-${n}-hover.webm`
              );
            },
          ),
          animationClickSrc: a.Ember.computed(
            "state",
            "replayEnabled",
            function () {
              const e = this.get("state"),
                t = this.get("replayEnabled");
              let n = "locked";
              return (
                e === r.UNSELECTED
                  ? (n = "claimable")
                  : (e === r.SELECTED || t) && (n = "claimed"),
                `/fe/lol-event-hub/videos/MILESTONE_Flame-${n}-pressed.webm`
              );
            },
          ),
          mouseDown() {
            this.set("flameClicked", !0);
          },
          mouseUp() {
            this.set("flameClicked", !1), this.replayCelebrationIfEnabled();
          },
          mouseLeave() {
            this.set("flameClicked", !1);
          },
          replayCelebrationIfEnabled() {
            if (!this.get("replayEnabled")) return;
            const e = this.get("reward");
            this.get("itemClick") && this.get("itemClick")(e, 0);
            const t = e.rewardOptions.find(
              (e) => e.celebrationType === s.REWARD_CELEBRATION_TYPE_FULLSCREEN,
            ).rewardGroupId;
            this.get("rewardsService").replayFullscreenCelebration(t),
              a.Telemetry.sendCustomData(s.TELEMETRY.TABLE, {
                eventName: s.TELEMETRY.REPLAY_BUTTON_NODE_LEVEL_CLICK_EVENT,
                eventId: this.get("eventHubService.info.eventId"),
                isPassPurchased: this.get(
                  "eventHubService.info.isPassPurchased",
                ),
                clickOnLevel: e.threshold,
                playerOnLevel: this.get(
                  "eventHubService.rewardTrackProgress.level",
                ),
              });
          },
        });
        t.default = i;
      },
      (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        var a = n(1),
          l = n(5),
          s = a.Ember.Component.extend({
            classNames: ["hol-narrative"],
            eventHubService: a.Ember.inject.service("event-hub"),
            playerCurrentLevel: a.Ember.computed.alias(
              "eventHubService.rewardTrackProgress.level",
            ),
            narrativeElementInView: null,
            descriptionTextElementAdditionalClass: null,
            narrativeTitle: a.Ember.computed(
              "narrativeElementInView",
              function () {
                const e = this.get("narrativeElementInView");
                return e?.localizedNarrativeTitle || "";
              },
            ),
            narrativeDescription: a.Ember.computed(
              "narrativeElementInView",
              function () {
                const e = this.get("narrativeElementInView");
                return e?.localizedNarrativeDescription || "";
              },
            ),
            showPlayNarrativeVideoButton: a.Ember.computed(
              "narrativeElementInView",
              function () {
                const e = this.get("narrativeElementInView");
                return !(
                  !e?.narrativeVideo?.localizedNarrativeVideoUrl ||
                  !e?.narrativeVideo?.localizedPlayNarrativeButtonLabel
                );
              },
            ),
            playNarrativeButtonLabel: a.Ember.computed(
              "narrativeElementInView",
              function () {
                const e = this.get("narrativeElementInView");
                return (
                  e?.narrativeVideo?.localizedPlayNarrativeButtonLabel || ""
                );
              },
            ),
            playButtonDisabled: a.Ember.computed(
              "narrativeElementInView",
              "playerCurrentLevel",
              function () {
                const e = this.get("narrativeElementInView"),
                  t = e?.narrativeVideo?.narrativeVideoIsLockedOnLevel,
                  n =
                    this.get("playerCurrentLevel") >=
                    e?.narrativeStartingTrackLevel;
                return t && !n;
              },
            ),
            didRender() {
              this.alignNarrativeDescription();
            },
            alignNarrativeDescription() {
              if (!this.get("narrativeDescription"))
                return void this.set(
                  "descriptionTextElementAdditionalClass",
                  "",
                );
              const e = document.getElementById(
                "hol-narrative-description-text",
              );
              e && e.offsetHeight > 108
                ? this.set(
                    "descriptionTextElementAdditionalClass",
                    "hol-narrative-description-text-with-scroll",
                  )
                : this.set("descriptionTextElementAdditionalClass", "");
            },
            actions: {
              playNarrativeButtonClick() {
                if (this.get("playButtonDisabled")) return;
                const e = this.get("narrativeElementInView");
                a.Telemetry.sendCustomData(l.TELEMETRY.TABLE, {
                  eventName: l.TELEMETRY.HOL_PLAY_NARRATIVE_EVENT,
                  eventId: this.get("eventHubService.info.eventId"),
                  videoTitle: this.get("playNarrativeButtonLabel"),
                  milestoneLevel: e?.narrativeStartingTrackLevel,
                });
                const t = document.createElement("iframe");
                t.setAttribute(
                  "src",
                  e?.narrativeVideo?.localizedNarrativeVideoUrl,
                ),
                  t.setAttribute("width", "100%"),
                  t.setAttribute("height", "100%"),
                  t.setAttribute("frameborder", "0"),
                  a.FullPageModalManager.open({ data: { contents: t } });
              },
            },
          });
        t.default = s;
      },
      (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        var a = n(1),
          l = n(5);
        var s = a.Ember.Component.extend({
          classNames: ["hol-promotion-banner"],
          selectedReward: null,
          eventHubService: a.Ember.inject.service("event-hub"),
          marketingPreferencesService: a.Ember.inject.service(
            "marketing-preferences",
          ),
          promotionBannerImgSrc: a.Ember.computed.alias(
            "eventHubService.eventDetailsData.promotionBannerImage",
          ),
          showBanner: a.Ember.computed(
            "selectedReward",
            "promotionBannerImgSrc",
            function () {
              const e = this.get("promotionBannerImgSrc");
              if (!e || "/lol-game-data/assets/" === e) return !1;
              const t = this.get("selectedReward");
              return 10 !== Number.parseInt(t?.item?.threshold);
            },
          ),
          actions: {
            bannerClick() {
              a.Telemetry.sendCustomData(l.TELEMETRY.TABLE, {
                eventName: l.TELEMETRY.HOL_PROMOTION_BANNER_CLICK_EVENT,
                eventId: this.get("eventHubService.info.eventId"),
              }),
                this.get(
                  "marketingPreferencesService",
                ).setFromEventShopForHolPartition(),
                a.Navigation.showSubnavTab("hall-of-legends-embed-2024"),
                a.Navigation.showHome();
            },
          },
        });
        t.default = s;
      },
      (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        var a = n(1),
          l = n(5),
          s = a.Ember.Component.extend({
            classNames: ["hol-reward-details"],
            eventHubService: a.Ember.inject.service("event-hub"),
            rewardsService: a.Ember.inject.service("rewards"),
            playerCurrentLevel: a.Ember.computed.alias(
              "eventHubService.rewardTrackProgress.level",
            ),
            selectedReward: null,
            level: a.Ember.computed("selectedReward", function () {
              const e = this.get("selectedReward")?.item.threshold;
              return a.tra.formatString("event_hub_reward_level_number_text", {
                levelNumber: e,
              });
            }),
            title: a.Ember.computed("selectedReward", function () {
              const e = this.get("selectedReward")?.item,
                t = this.get("selectedReward")?.optionIndex || 0;
              return e?.rewardOptions?.[t]?.rewardName || "";
            }),
            description: a.Ember.computed("selectedReward", function () {
              const e = this.get("selectedReward")?.item,
                t = this.get("selectedReward")?.optionIndex || 0;
              return e?.rewardOptions?.[t]?.rewardDescription || "";
            }),
            showReplayButton: a.Ember.computed("selectedReward", function () {
              const e = this.get("selectedReward")?.item;
              return !!e?.rewardOptions?.some(
                (e) =>
                  e.celebrationType === l.REWARD_CELEBRATION_TYPE_FULLSCREEN,
              );
            }),
            isReplayButtonDisabled: a.Ember.computed(
              "showReplayButton",
              "selectedReward",
              function () {
                if (!this.get("showReplayButton")) return !0;
                const e = this.get("selectedReward").item;
                return this.get("playerCurrentLevel") < e?.threshold;
              },
            ),
            actions: {
              replayButtonClick() {
                if (this.get("isReplayButtonDisabled")) return;
                const e = this.get("selectedReward").item,
                  t = e.rewardOptions.find(
                    (e) =>
                      e.celebrationType ===
                      l.REWARD_CELEBRATION_TYPE_FULLSCREEN,
                  ).rewardGroupId;
                this.get("rewardsService").replayFullscreenCelebration(t),
                  a.Telemetry.sendCustomData(l.TELEMETRY.TABLE, {
                    eventName: l.TELEMETRY.REPLAY_BUTTON_CLICK_EVENT,
                    eventId: this.get("eventHubService.info.eventId"),
                    milestoneLevel: e.threshold,
                  });
              },
            },
          });
        t.default = s;
      },
      (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = t.PERCENTAGE_ANIMATION_STEP = void 0);
        var a = n(1);
        t.PERCENTAGE_ANIMATION_STEP = 5;
        var l = a.Ember.Component.extend({
          classNames: ["hol-xp"],
          eventHubService: a.Ember.inject.service("event-hub"),
          isGracePeriod: a.Ember.computed.alias(
            "eventHubService.isGracePeriod",
          ),
          rewardTrackProgress: a.Ember.computed.alias(
            "eventHubService.rewardTrackProgress",
          ),
          showXpText: a.Ember.computed("rewardTrackProgress", function () {
            const { level: e, totalLevels: t } = this.get(
              "rewardTrackProgress",
            );
            return e < t;
          }),
          currentLevel: null,
          radialPercentage: 0,
          remainingPercentage: a.Ember.computed(
            "radialPercentage",
            function () {
              const e = 100 - this.get("radialPercentage");
              return e > 0 ? e : 0;
            },
          ),
          getPlayerXpPercentage(e) {
            const t = Math.ceil((e?.currentLevelXP / e?.totalLevelXP) * 100);
            return Math.min(100, t) || 0;
          },
          init() {
            this._super(...arguments),
              (this.updateRadialPercentage =
                this.updateRadialPercentage.bind(this));
          },
          didInsertElement() {
            this._super(...arguments),
              this.addObserver(
                "rewardTrackProgress",
                this.onRewardTrackProgressChange,
              ),
              this.updateRadialPercentage();
            const { level: e } = this.get("rewardTrackProgress");
            this.set("currentLevel", e);
          },
          willDestroyElement() {
            this._super(...arguments),
              this.removeObserver("rewardTrackProgress");
          },
          onRewardTrackProgressChange() {
            const e = this.get("currentLevel"),
              t = this.get("rewardTrackProgress").level;
            t > e &&
              (this.set("currentLevel", t),
              this.set("radialPercentage", this.get("radialPercentage") + 5)),
              this.updateRadialPercentage();
          },
          updateRadialPercentage() {
            const e = this.get("radialPercentage"),
              t = this.getPlayerXpPercentage(this.get("rewardTrackProgress"));
            if (e === t) return;
            if (e >= 100)
              return (
                this.set("radialPercentage", 0),
                void requestAnimationFrame(this.updateRadialPercentage)
              );
            const n = t < e ? 5 : Math.min(5, t - e),
              a = Math.min(100, e + n);
            this.set("radialPercentage", a),
              requestAnimationFrame(this.updateRadialPercentage);
          },
        });
        t.default = l;
      },
      (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        var a = n(1),
          l = n(5);
        n(79);
        var s = a.Ember.Controller.extend({
          isVisible: a.Ember.computed.alias("model.isVisible"),
          eventHubService: a.Ember.inject.service("event-hub"),
          backgroundImageStyle: a.Ember.computed(
            "eventHubService.backgroundData",
            "eventHubService.activeEventType",
            function () {
              if (
                this.get("eventHubService.activeEventType") ===
                  l.EVENT_HUB_TYPES.EVENT_SHOP &&
                this.get("eventHubService.backgroundData.backgroundImagePath")
              )
                return a.Ember.String.htmlSafe(
                  `background-image: url(${this.get("eventHubService.backgroundData.backgroundImagePath")})`,
                );
            },
          ),
        });
        t.default = s;
      },
      (e, t, n) => {
        "use strict";
        n.r(t);
      },
      (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        var a = n(1),
          l = n(22),
          s = n(5),
          o = a.Ember.Controller.extend({
            eventHubService: a.Ember.inject.service("event-hub"),
            isVisible: a.Ember.computed.alias("model.isVisible"),
            availableEvents: a.Ember.computed(
              "eventHubService.events.[]",
              function () {
                return (this.get("eventHubService.events") || []).map(
                  ({
                    eventId: e,
                    eventInfo: { eventName: t, eventType: n },
                  }) => ({
                    eventId: e,
                    eventType: n,
                    eventName: t,
                    route: (0, l.getRouteByEventHubType)(n),
                  }),
                );
              },
            ),
            init() {
              this._super(...arguments),
                (this.handleAvailableEventsChanged =
                  this.handleAvailableEventsChanged.bind(this)),
                (this.handleIsVisibleChanged =
                  this.handleIsVisibleChanged.bind(this)),
                this.addObserver(
                  "isVisible",
                  this,
                  this.handleIsVisibleChanged,
                ),
                this.addObserver(
                  "availableEvents",
                  this.handleAvailableEventsChanged,
                );
            },
            willDestroyElement() {
              this.removeObserver("isVisible"),
                this.removeObserver("availableEvents");
            },
            handleIsVisibleChanged() {
              this.transitionToRoute(s.ROUTES.INDEX),
                this.handleAvailableEventsChanged();
            },
            handleAvailableEventsChanged() {
              if (!this.get("isVisible")) return;
              const e = this.get("availableEvents");
              1 === e.length && this.send("selectEvent", e[0]);
            },
            actions: {
              selectEvent({ eventId: e, route: t }) {
                const n = this.get("eventHubService.activeEventId");
                (n && n === e) || this.get("eventHubService").setActiveEvent(e),
                  this.transitionToRoute(t);
              },
            },
          });
        t.default = o;
      },
      (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0),
          n(79);
        var a = n(1),
          l = a.Ember.Controller.extend({
            init() {
              this._super(...arguments),
                this.addObserver("isVisible", this, "updatePlayerSettings"),
                this.addObserver("tokenBalance", this, "updatePlayerSettings"),
                this.addObserver(
                  "tokenShopOffersVersion",
                  this,
                  "updatePlayerSettings",
                );
            },
            willDestroy() {
              this.removeObserver("isVisible"),
                this.removeObserver("tokenBalance"),
                this.removeObserver("tokenShopOffersVersion");
            },
            eventHubService: a.Ember.inject.service("event-hub"),
            playerSettingsService: a.Ember.inject.service("player-settings"),
            isVisible: a.Ember.computed.alias("model.isVisible"),
            tokenBalance: a.Ember.computed.alias(
              "eventHubService.tokenBalance",
            ),
            tokenShopOffersVersion: a.Ember.computed.alias(
              "eventHubService.tokenShopData.offersVersion",
            ),
            isEventShopReady: a.Ember.computed.or(
              "eventHubService.categoriesOffers",
              "eventHubService.rewardTrackItems",
            ),
            isRewardTrackMinimized: !1,
            updatePlayerSettings: function () {
              this.get("isVisible") &&
                this.get("playerSettingsService").updatePlayerSettings(
                  this.get("tokenBalance"),
                  this.get("tokenShopOffersVersion"),
                );
            },
            actions: {
              toggleMinimizeRewardTrack() {
                this.set(
                  "isRewardTrackMinimized",
                  !this.get("isRewardTrackMinimized"),
                );
              },
            },
          });
        t.default = l;
      },
      (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        var a = n(1),
          l = n(51),
          s = n(5);
        n(79);
        const { TRACKER_SIZE: o } = l.REWARD_TRACKER;
        var r = a.Ember.Controller.extend({
          eventHubService: a.Ember.inject.service("event-hub"),
          playerSettingsService: a.Ember.inject.service("player-settings"),
          parallaxEnabled: a.Ember.computed.alias(
            "playerSettingsService.animationsEnabled",
          ),
          disableRewardTrackerAnimations: a.Ember.computed.not(
            "playerSettingsService.animationsEnabled",
          ),
          rewardTrackProgress: a.Ember.computed.alias(
            "eventHubService.rewardTrackProgress",
          ),
          rewardTrackItems: a.Ember.computed.alias(
            "eventHubService.rewardTrackItems",
          ),
          trackerSize: o.MEDIUM,
          isVisible: a.Ember.computed.alias("model.isVisible"),
          gracePeriodTooltipTextsOverride: a.Ember.computed("tra", function () {
            return {
              tooltipTitleTop: this.get(
                "tra.hol_page_header_time_tooltip_event_title_grace_period",
              ),
              tooltipDescriptionTop: this.get(
                "tra.hol_page_header_time_tooltip_event_description_grace_period",
              ),
              tooltipTitleBottom: this.get(
                "tra.hol_page_header_time_tooltip_progress_title_grace_period",
              ),
              tooltipDescriptionBottom: this.get(
                "tra.hol_page_header_time_tooltip_progress_description_grace_period",
              ),
            };
          }),
          gracePeriodRemainingTimeTextOverride: a.Ember.computed(
            "tra",
            function () {
              return {
                almostEndingText: this.get(
                  "tra.hol_page_header_event_almost_closing",
                ),
                wrappingText: this.get("tra.hol_page_header_event_closes_in"),
              };
            },
          ),
          tooltipProgressTextOverride: a.Ember.computed("tra", function () {
            return {
              tooltipTitleTop: this.get(
                "tra.hol_page_header_time_tooltip_progress_title",
              ),
              tooltipDescriptionTop: this.get(
                "tra.hol_page_header_time_tooltip_progress_description",
              ),
              tooltipTitleBottom: this.get(
                "tra.hol_page_header_time_tooltip_event_title",
              ),
            };
          }),
          showHelpModal: !1,
          passPurchased: a.Ember.computed.alias(
            "eventHubService.info.isPassPurchased",
          ),
          showPassPurchaseModal: !1,
          showPurchaseLevelsModal: !1,
          currentLevel: a.Ember.computed.alias(
            "eventHubService.rewardTrackProgress.level",
          ),
          totalNumberOfLevels: a.Ember.computed.alias(
            "eventHubService.rewardTrackProgress.totalLevels",
          ),
          noMoreLevelsToBuy: a.Ember.computed(
            "currentLevel",
            "totalNumberOfLevels",
            function () {
              return (
                this.get("currentLevel") === this.get("totalNumberOfLevels")
              );
            },
          ),
          backgroundImageStyle: a.Ember.computed(
            "narrativeElementInView",
            "parallaxEnabled",
            function () {
              const e = this.get("narrativeElementInView"),
                t = e?.narrativeBackgroundImage;
              if (t && !this.get("parallaxEnabled"))
                return a.Ember.String.htmlSafe(`background-image: url("${t}")`);
            },
          ),
          clickedReward: null,
          selectedReward: a.Ember.computed(
            "currentLevel",
            "rewardTrackItems",
            "clickedReward",
            function () {
              const e = this.get("clickedReward");
              if (e) return this.set("clickedReward", null), e;
              const t = this.get("rewardTrackItems"),
                n = this.get("currentLevel"),
                a = t?.find((e) => e.threshold >= n);
              return { item: a, optionIndex: 0 };
            },
          ),
          selectedRewardImage: a.Ember.computed("selectedReward", function () {
            const e = this.get("selectedReward")?.item,
              t = this.get("selectedReward")?.optionIndex || 0;
            return (
              e?.rewardOptions[t]?.splashImagePath ||
              e?.rewardOptions[t]?.thumbIconPath ||
              ""
            );
          }),
          latestLevelInView: null,
          previousLatestLevelInView: null,
          previousSelectedRewardLevel: null,
          sortedNarrativeElementsByLevelDescending: a.Ember.computed(
            "eventHubService.narrative",
            function () {
              const e = this.get("eventHubService.narrative");
              return e?.length
                ? [...e].sort(
                    (e, t) =>
                      t.narrativeStartingTrackLevel -
                      e.narrativeStartingTrackLevel,
                  )
                : [];
            },
          ),
          narrativeElementInView: a.Ember.computed(
            "sortedNarrativeElementsByLevelDescending",
            "selectedReward",
            "latestLevelInView",
            "previousLatestLevelInView",
            "previousSelectedRewardLevel",
            function () {
              const e = this.get("latestLevelInView"),
                t = this.get("sortedNarrativeElementsByLevelDescending"),
                n = this.get("selectedReward")?.item?.threshold;
              if (!e || !t?.length || !n) return;
              let a = n;
              n === this.get("previousSelectedRewardLevel") &&
                e !== this.get("previousLatestLevelInView") &&
                (a = e),
                this.set("previousSelectedRewardLevel", n),
                this.set("previousLatestLevelInView", e);
              return t.find((e) => a >= e.narrativeStartingTrackLevel);
            },
          ),
          init() {
            this._super(...arguments),
              this.addObserver("isVisible", this, "pageVisibilityChanged");
          },
          willDestroyElement() {
            this.removeObserver("isVisible");
          },
          pageVisibilityChanged: function () {
            this.get("isVisible") &&
              (this.checkAndShowHelpModal(),
              this.get("playerSettingsService").updatePlayerSettings());
          },
          checkAndShowHelpModal() {
            this.get("playerSettingsService")
              .getAccountSettings()
              .then(({ data: e }) => {
                const t = new Date(e?.lastTimeSeen),
                  n = new Date(
                    this.get("eventHubService.eventDetailsData.eventStartDate"),
                  );
                (isNaN(t) || t < n) && this.set("showHelpModal", !0);
              });
          },
          showPassPurchaseModalObserver: a.Ember.observer(
            "model.navOptions.openPassPurchase",
            function () {
              const e = this.get("model.navOptions.openPassPurchase");
              this.set("showPassPurchaseModal", e);
            },
          ),
          actions: {
            passPurchaseClick() {
              this.get("passPurchased") ||
                (a.Telemetry.sendCustomData(s.TELEMETRY.TABLE, {
                  eventName: s.TELEMETRY.PURCHASE_PASS_CLICK_EVENT,
                  eventId: this.get("eventHubService.info.eventId"),
                }),
                this.set("showPassPurchaseModal", !0));
            },
            rewardsInViewChanged(e = []) {
              0 !== e.length &&
                this.set("latestLevelInView", Math.max(...e) + 1);
            },
            purchaseLevelsClick() {
              this.set("showPurchaseLevelsModal", !0);
            },
            rewardItemClick(e, t) {
              a.Telemetry.sendCustomData(s.TELEMETRY.TABLE, {
                eventName: s.TELEMETRY.REWARD_CLICK_EVENT,
                eventId: this.get("eventHubService.info.eventId"),
                milestoneLevel: e.threshold,
              }),
                this.set("clickedReward", { item: e, optionIndex: t });
            },
            onRewardTrackerScroll(e) {
              const t =
                  e?.srcElement?.scrollLeft /
                    (e?.srcElement?.scrollWidth - e?.srcElement?.clientWidth) ||
                  0,
                n =
                  document.querySelector(".hol-root-parallax")?.clientWidth ||
                  0;
              document
                .querySelectorAll(".hol-root-parallax-layer")
                .forEach((e) => {
                  const a = t * (e.scrollWidth - n);
                  e.style.transform = `translateX(-${a}px)`;
                });
            },
          },
        });
        t.default = r;
      },
      (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        var a = n(1).Ember.Helper.helper((e) => e[0] === e[1]);
        t.default = a;
      },
      (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = t.INVENTORY_TYPE_TRA_KEY = void 0);
        var a = n(1);
        const l = {
          ACHIEVEMENT_TITLE: "event_hub_inventory_type_name_achievement_title",
          BOOST: "event_hub_inventory_type_name_boost",
          BUNDLES: "event_hub_inventory_type_name_bundles",
          CHAMPION: "event_hub_inventory_type_name_champion",
          CHAMPION_SKIN: "event_hub_inventory_type_name_champion_skin",
          COMPANION: "event_hub_inventory_type_name_companion",
          CURRENCY: "event_hub_inventory_type_name_currency",
          EMOTE: "event_hub_inventory_type_name_emote",
          EVENT_PASS: "event_hub_inventory_type_name_event_pass",
          GIFT: "event_hub_inventory_type_name_gift",
          HEXTECH_CRAFTING: "event_hub_inventory_type_name_hextech_crafting",
          MYSTERY: "event_hub_inventory_type_name_mystery",
          PROGRESSION: "event_hub_inventory_type_name_progression",
          REGALIA_BANNER: "event_hub_inventory_type_name_regalia_banner",
          REGALIA_CREST: "event_hub_inventory_type_name_regalia_crest",
          RP: "event_hub_inventory_type_name_rp",
          RUNE: "event_hub_inventory_type_name_rune",
          SPELL_BOOK_PAGE: "event_hub_inventory_type_name_spell_book_page",
          SKIN_AUGMENT: "event_hub_inventory_type_name_skin_augment",
          SKIN_BORDER: "event_hub_inventory_type_name_skin_border",
          STATSTONE: "event_hub_inventory_type_name_statstone",
          SUMMONER_ICON: "event_hub_inventory_type_name_summoner_icon",
          TFT_DAMAGE_SKIN: "event_hub_inventory_type_name_tft_damage_skin",
          TFT_MAP_SKIN: "event_hub_inventory_type_name_tft_map_skin",
          WARD_SKIN: "event_hub_inventory_type_name_ward_skin",
        };
        t.INVENTORY_TYPE_TRA_KEY = l;
        var s = a.Ember.Helper.helper(function (e) {
          const t = e[0],
            n = l[t];
          return a.tra.get(n);
        });
        t.default = s;
      },
      (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        var a = n(1).Ember.Helper.helper(function (e) {
          let t = e[0];
          return (
            (t && "" !== t && "default.png" !== t && "default.jpg" !== t) ||
              (t =
                "/fe/lol-static-assets/images/event-shop/icon-shocked-poro-clear.png"),
            t
          );
        });
        t.default = a;
      },
      (e, t, n) => {
        const a = n(1).Ember;
        e.exports = a.HTMLBars.template({
          id: "JTitz1ev",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-event-hub\\\\src\\\\app\\\\templates\\\\application.hbs\\" style-path=\\"null\\" js-path=\\"null\\" "],["text","\\n"],["block",["if"],[["get",["isVisible"]]],null,0]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","  "],["open-element","div",[]],["static-attr","class","rcp-fe-lol-event-hub-application"],["dynamic-attr","style",["unknown",["backgroundImageStyle"]],null],["flush-element"],["text","\\n    "],["append",["unknown",["outlet"]],false],["text","\\n  "],["close-element"],["text","\\n"]],"locals":[]}],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, n) => {
        const a = n(1).Ember;
        e.exports = a.HTMLBars.template({
          id: "+k2D/OgR",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-event-hub\\\\src\\\\app\\\\templates\\\\index.hbs\\" style-path=\\"null\\" js-path=\\"null\\" "],["text","\\n"],["open-element","div",[]],["static-attr","class","event-hub-index"],["flush-element"],["text","\\n"],["block",["each"],[["get",["availableEvents"]]],null,0],["close-element"],["text","\\n"]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","    "],["open-element","div",[]],["static-attr","class","event-hub-navigation-item"],["modifier",["action"],[["get",[null]],"selectEvent",["get",["event"]]]],["flush-element"],["text","\\n          "],["append",["unknown",["event","route"]],false],["text","\\n          "],["append",["unknown",["event","eventName"]],false],["text","\\n    "],["close-element"],["text","\\n"]],"locals":["event"]}],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, n) => {
        const a = n(1).Ember;
        e.exports = a.HTMLBars.template({
          id: "v+yfJ4AG",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-event-hub\\\\src\\\\app\\\\templates\\\\event-shop.hbs\\" style-path=\\"null\\" js-path=\\"null\\" "],["text","\\n"],["open-element","div",[]],["static-attr","class","event-shop-root"],["dynamic-attr","style",["unknown",["backgroundImageStyle"]],null],["flush-element"],["text","\\n  "],["append",["helper",["page-header"],null,[["showBottomBorder","showHelpIcon","showTokenBalance"],[true,true,true]]],false],["text","\\n"],["block",["if"],[["get",["isEventShopReady"]]],null,1,0],["close-element"],["text","\\n"]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","    "],["append",["unknown",["event-shop-fallback"]],false],["text","\\n"]],"locals":[]},{"statements":[["text","    "],["append",["helper",["event-shop-main-view"],null,[["isRewardTrackMinimized","toggleMinimizeRewardTrack","model"],[["get",["isRewardTrackMinimized"]],["helper",["action"],[["get",[null]],"toggleMinimizeRewardTrack"],null],["get",["model"]]]]],false],["text","\\n"]],"locals":[]}],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, n) => {
        const a = n(1).Ember;
        e.exports = a.HTMLBars.template({
          id: "sNxEEr1w",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-event-hub\\\\src\\\\app\\\\templates\\\\hall-of-legends.hbs\\" style-path=\\"null\\" js-path=\\"null\\" "],["text","\\n"],["open-element","div",[]],["static-attr","class","hol-root"],["dynamic-attr","style",["unknown",["backgroundImageStyle"]],null],["flush-element"],["text","\\n"],["block",["if"],[["get",["parallaxEnabled"]]],null,4],["text","  "],["open-element","div",[]],["static-attr","class","hol-root-reward-highlight"],["flush-element"],["text","\\n    "],["open-element","img",[]],["dynamic-attr","src",["concat",[["unknown",["selectedRewardImage"]]]]],["static-attr","class","hol-root-reward-highlight-image"],["flush-element"],["close-element"],["text","\\n  "],["close-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","hol-root-content-shroud"],["flush-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","hol-root-reward-framming"],["flush-element"],["text","\\n      "],["open-element","img",[]],["static-attr","src","/fe/lol-event-hub/images/hol-reward-framing.png"],["static-attr","class","hol-root-reward-framming-image"],["flush-element"],["close-element"],["text","\\n    "],["close-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","hol-root-header"],["flush-element"],["text","\\n      "],["append",["helper",["page-header"],null,[["showHelpModal","showHelpIcon","showSystemControls","gracePeriodTooltipTextsOverride","gracePeriodRemainingTimeTextOverride","tooltipProgressTextOverride"],[["get",["showHelpModal"]],true,true,["get",["gracePeriodTooltipTextsOverride"]],["get",["gracePeriodRemainingTimeTextOverride"]],["get",["tooltipProgressTextOverride"]]]]],false],["text","\\n    "],["close-element"],["text","\\n"],["block",["if"],[["get",["rewardTrackItems"]]],null,3,0],["text","  "],["close-element"],["text","\\n  "],["append",["helper",["purchase-levels-modal"],null,[["showPurchaseModal","titleTraKey","selectedReward"],[["get",["showPurchaseLevelsModal"]],"hol_purchase_levels_modal_title",["get",["selectedReward"]]]]],false],["text","\\n  "],["append",["helper",["purchase-bundles-modal"],null,[["showPurchaseModal"],[["get",["showPassPurchaseModal"]]]]],false],["text","\\n"],["close-element"],["text","\\n"]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","      "],["append",["unknown",["event-shop-fallback"]],false],["text","\\n"]],"locals":[]},{"statements":[["text","              "],["open-element","lol-uikit-flat-button",[]],["static-attr","primary","true"],["static-attr","class","idle hol-root-reward-track-cta"],["modifier",["action"],[["get",[null]],"passPurchaseClick"]],["flush-element"],["text","\\n                "],["open-element","div",[]],["static-attr","class","hol-root-reward-track-upgrade-pass-cta"],["flush-element"],["text","\\n                  "],["open-element","img",[]],["static-attr","class","hol-root-ticket-icon"],["static-attr","src","/fe/lol-static-assets/images/event-shop/ticket-gold2.svg"],["flush-element"],["close-element"],["text","\\n                  "],["append",["unknown",["tra","event_hub_purchase_pass"]],false],["text","\\n                "],["close-element"],["text","\\n              "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","              "],["open-element","lol-uikit-flat-button",[]],["static-attr","primary","true"],["static-attr","class","idle hol-root-reward-track-cta"],["dynamic-attr","disabled",["unknown",["noMoreLevelsToBuy"]],null],["modifier",["action"],[["get",[null]],"purchaseLevelsClick"]],["flush-element"],["text","\\n                "],["open-element","div",[]],["static-attr","class","hol-root-reward-track-upgrade-pass-cta"],["flush-element"],["text","\\n                  "],["open-element","img",[]],["static-attr","class","hol-root-ticket-icon"],["static-attr","src","/fe/lol-static-assets/images/event-shop/ticket-gold2.svg"],["flush-element"],["close-element"],["text","\\n                  "],["append",["unknown",["tra","event_hub_purchase_lvl"]],false],["text","\\n                "],["close-element"],["text","\\n              "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","      "],["open-element","div",[]],["static-attr","class","hol-root-center-area"],["flush-element"],["text","\\n        "],["open-element","div",[]],["static-attr","class","hol-root-center-area-left-column"],["flush-element"],["text","\\n          "],["append",["helper",["hol-narrative"],null,[["narrativeElementInView"],[["get",["narrativeElementInView"]]]]],false],["text","\\n        "],["close-element"],["text","\\n        "],["open-element","div",[]],["static-attr","class","hol-root-center-area-right-column"],["flush-element"],["text","\\n          "],["append",["helper",["hol-promotion-banner"],null,[["selectedReward"],[["get",["selectedReward"]]]]],false],["text","\\n          "],["append",["helper",["hol-reward-details"],null,[["selectedReward"],[["get",["selectedReward"]]]]],false],["text","\\n        "],["close-element"],["text","\\n      "],["close-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","hol-root-reward-track"],["flush-element"],["text","\\n        "],["append",["helper",["reward-tracker"],null,[["rewardTrackItems","rewardTrackProgress","trackerSize","shouldScrollToUnclaimedReward","rewardItemTooltipComponent","rewardsInViewChanged","itemClick","isBorderlessTrack","scrollingArrowsEnabled","selectedItemThreshold","rewardItemLevelIconComponent","onScroll","disableAnimations"],[["get",["rewardTrackItems"]],["get",["rewardTrackProgress"]],["get",["trackerSize"]],true,"",["helper",["action"],[["get",[null]],"rewardsInViewChanged"],null],["helper",["action"],[["get",[null]],"rewardItemClick"],null],true,true,["get",["selectedReward","item","threshold"]],"hol-level-icon-flames",["helper",["action"],[["get",[null]],"onRewardTrackerScroll"],null],["get",["disableRewardTrackerAnimations"]]]]],false],["text","\\n        "],["open-element","div",[]],["static-attr","class","hol-root-reward-track-second-row"],["flush-element"],["text","\\n          "],["open-element","div",[]],["static-attr","class","hol-root-xp"],["flush-element"],["text","\\n            "],["append",["unknown",["hol-xp"]],false],["text","\\n          "],["close-element"],["text","\\n          "],["open-element","div",[]],["static-attr","class","hol-root-reward-track-cta-group"],["flush-element"],["text","\\n            "],["append",["unknown",["hol-claim-button"]],false],["text","\\n"],["block",["if"],[["get",["passPurchased"]]],null,2,1],["text","          "],["close-element"],["text","\\n        "],["close-element"],["text","\\n      "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","    "],["open-element","div",[]],["static-attr","class","hol-root-parallax"],["flush-element"],["text","\\n      "],["open-element","img",[]],["static-attr","class","hol-root-parallax-layer hol-root-parallax-background"],["static-attr","src","/fe/lol-event-hub/images/parallax/background.png"],["flush-element"],["close-element"],["text","\\n      "],["open-element","img",[]],["static-attr","class","hol-root-parallax-layer hol-root-parallax-midground"],["static-attr","src","/fe/lol-event-hub/images/parallax/midground.png"],["flush-element"],["close-element"],["text","\\n      "],["open-element","img",[]],["static-attr","class","hol-root-parallax-layer hol-root-parallax-foreground"],["static-attr","src","/fe/lol-event-hub/images/parallax/foreground.png"],["flush-element"],["close-element"],["text","\\n    "],["close-element"],["text","\\n"]],"locals":[]}],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, n) => {
        const a = n(1).Ember;
        e.exports = a.HTMLBars.template({
          id: "aZ8C5pKf",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-event-hub\\\\src\\\\app\\\\templates\\\\components\\\\help-modal.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-event-hub\\\\src\\\\app\\\\styles\\\\components\\\\help-modal.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-event-hub\\\\src\\\\app\\\\components\\\\help-modal.js\\" "],["text","\\n"],["block",["uikit-modal"],null,[["displayModal","type","okText","dismissible","dismissibleType","onClose"],[["get",["showHelpModal"]],"DialogAlert",["get",["tra","event_hub_help_modal_explore_button"]],true,"inside",["helper",["action"],[["get",[null]],"handleCloseModalClick"],null]]],0]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","  "],["open-element","lol-uikit-content-block",[]],["static-attr","type","dialog-large"],["static-attr","id","eh-help-modal"],["flush-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","eh-help-modal-top"],["flush-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","eh-help-modal-title"],["flush-element"],["append",["unknown",["tra","event_hub_help_modal_title"]],false],["close-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","eh-help-modal-event-name"],["flush-element"],["text","\\n        "],["append",["unknown",["eventDetailsData","eventName"]],false],["text","\\n      "],["close-element"],["text","\\n      "],["open-element","hr",[]],["static-attr","class","heading-spacer"],["flush-element"],["close-element"],["text","\\n    "],["close-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","eh-help-modal-mid"],["flush-element"],["text","\\n      "],["open-element","img",[]],["static-attr","class","eh-help-modal-image"],["dynamic-attr","src",["unknown",["eventDetailsData","helpModalImagePath"]],null],["flush-element"],["close-element"],["text","\\n    "],["close-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","eh-help-modal-bot"],["flush-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","eh-help-modal-bot-containers"],["flush-element"],["text","\\n        "],["open-element","div",[]],["dynamic-attr","class",["concat",["eh-help-modal-icons ",["unknown",["firstColumnIconClass"]]]]],["flush-element"],["close-element"],["text","\\n        "],["open-element","div",[]],["static-attr","class","eh-help-modal-topic"],["flush-element"],["append",["unknown",["firstColumnTopic"]],false],["close-element"],["text","\\n        "],["open-element","div",[]],["static-attr","class","eh-help-description"],["flush-element"],["append",["unknown",["firstColumnDescription"]],false],["close-element"],["text","\\n      "],["close-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","eh-help-modal-bot-containers"],["flush-element"],["text","\\n        "],["open-element","div",[]],["dynamic-attr","class",["concat",["eh-help-modal-icons ",["unknown",["secondColumnIconClass"]]]]],["flush-element"],["close-element"],["text","\\n        "],["open-element","div",[]],["static-attr","class","eh-help-modal-topic"],["flush-element"],["append",["unknown",["secondColumnTopic"]],false],["close-element"],["text","\\n        "],["open-element","div",[]],["static-attr","class","eh-help-description"],["flush-element"],["append",["unknown",["secondColumnDescription"]],false],["close-element"],["text","\\n      "],["close-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","eh-help-modal-bot-containers"],["flush-element"],["text","\\n        "],["open-element","div",[]],["dynamic-attr","class",["concat",["eh-help-modal-icons ",["unknown",["thirdColumnIconClass"]]]]],["flush-element"],["close-element"],["text","\\n        "],["open-element","div",[]],["static-attr","class","eh-help-modal-topic"],["flush-element"],["append",["unknown",["thirdColumnTopic"]],false],["close-element"],["text","\\n        "],["open-element","div",[]],["static-attr","class","eh-help-description"],["flush-element"],["append",["unknown",["thirdColumnDescription"]],false],["close-element"],["text","\\n      "],["close-element"],["text","\\n    "],["close-element"],["text","\\n  "],["close-element"],["text","\\n"]],"locals":[]}],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, n) => {
        const a = n(1).Ember;
        e.exports = a.HTMLBars.template({
          id: "JGgqt7ia",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-event-hub\\\\src\\\\app\\\\templates\\\\components\\\\page-header-system-controls.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-event-hub\\\\src\\\\app\\\\styles\\\\components\\\\page-header-system-controls.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-event-hub\\\\src\\\\app\\\\components\\\\page-header-system-controls.js\\" "],["text","\\n"],["open-element","div",[]],["static-attr","class","eh-page-header-system-controls-icon-wrapper eh-page-header-animation-control"],["dynamic-attr","onclick",["helper",["action"],[["get",[null]],"toggleAnimationEnabled"],null],null],["flush-element"],["text","\\n"],["block",["if"],[["get",["animationsEnabled"]]],null,3,1],["close-element"],["text","\\n"]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","      "],["open-element","lol-uikit-content-block",[]],["static-attr","class","eh-page-header-system-controls-tooltip"],["static-attr","type","tooltip-system"],["flush-element"],["text","\\n        "],["append",["unknown",["tra","event_hub_page_header_system_controls_tooltip_animation_off"]],false],["text","\\n      "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["block",["uikit-tooltip"],null,[["tooltipPosition","type"],["bottom","system"]],0],["text","    "],["open-element","svg",[]],["static-attr","width","24"],["static-attr","height","24"],["static-attr","viewBox","0 0 24 24"],["static-attr","fill","none"],["static-attr","xmlns","http://www.w3.org/2000/svg","http://www.w3.org/2000/xmlns/"],["flush-element"],["text","\\n      "],["open-element","circle",[]],["static-attr","class","eh-page-header-system-controls-icon-circle"],["static-attr","cx","12"],["static-attr","cy","12"],["static-attr","r","11.5"],["static-attr","stroke","#A09B8C"],["flush-element"],["close-element"],["text","\\n      "],["open-element","path",[]],["static-attr","class","eh-page-header-system-controls-icon-path"],["static-attr","fill-rule","evenodd"],["static-attr","clip-rule","evenodd"],["static-attr","d","M8.01022 11.7118C8.00345 11.807 8 11.9031 8 12C8 14.2091 9.79086 16 12 16C12.0969 16 12.193 15.9966 12.2882 15.9898L8.01022 11.7118ZM14.2251 15.3245C15.2955 14.6067 16 13.3856 16 12C16 9.79086 14.2091 8 12 8C10.6144 8 9.39332 8.70453 8.6755 9.77491L14.2251 15.3245Z"],["static-attr","fill","#A09B8C"],["flush-element"],["close-element"],["text","\\n      "],["open-element","path",[]],["static-attr","class","eh-page-header-system-controls-icon-path"],["static-attr","d","M6.3999 7.70166L7.70098 6.40058L17.5994 16.299L16.2983 17.6001L6.3999 7.70166Z"],["static-attr","fill","#A09B8C"],["flush-element"],["close-element"],["text","\\n    "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","      "],["open-element","lol-uikit-content-block",[]],["static-attr","class","eh-page-header-system-controls-tooltip"],["static-attr","type","tooltip-system"],["flush-element"],["text","\\n        "],["append",["unknown",["tra","event_hub_page_header_system_controls_tooltip_animation_on"]],false],["text","\\n      "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["block",["uikit-tooltip"],null,[["tooltipPosition","type"],["bottom","system"]],2],["text","    "],["open-element","svg",[]],["static-attr","width","24"],["static-attr","height","24"],["static-attr","viewBox","0 0 24 24"],["static-attr","fill","none"],["static-attr","xmlns","http://www.w3.org/2000/svg","http://www.w3.org/2000/xmlns/"],["flush-element"],["text","\\n      "],["open-element","circle",[]],["static-attr","class","eh-page-header-system-controls-icon-circle"],["static-attr","cx","12"],["static-attr","cy","12"],["static-attr","r","11.5"],["static-attr","stroke","#A09B8C"],["flush-element"],["close-element"],["text","\\n      "],["open-element","g",[]],["static-attr","clip-path","url(#clip0_3016_32270)"],["flush-element"],["text","\\n        "],["open-element","path",[]],["static-attr","class","eh-page-header-system-controls-icon-path"],["static-attr","fill-rule","evenodd"],["static-attr","clip-rule","evenodd"],["static-attr","d","M8.0006 8.08015C7.74191 8.02759 7.47416 8 7.19995 8C4.99081 8 3.19995 9.79086 3.19995 12C3.19995 14.2091 4.99081 16 7.19995 16C7.47415 16 7.74191 15.9724 8.0006 15.9199C7.01047 14.9098 6.39995 13.5262 6.39995 12C6.39995 10.4738 7.01047 9.09024 8.0006 8.08015ZM9.59995 8.79971C8.62839 9.52947 7.99995 10.6913 7.99995 12C7.99995 13.3087 8.62839 14.4705 9.59995 15.2003C10.5715 14.4705 11.2 13.3087 11.2 12C11.2 10.6913 10.5715 9.52947 9.59995 8.79971Z"],["static-attr","fill","#A09B8C"],["flush-element"],["close-element"],["text","\\n        "],["open-element","path",[]],["static-attr","class","eh-page-header-system-controls-icon-path"],["static-attr","fill-rule","evenodd"],["static-attr","clip-rule","evenodd"],["static-attr","d","M12.8007 8.08015C12.542 8.02759 12.2742 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16C12.2742 16 12.542 15.9724 12.8007 15.9199C11.8105 14.9098 11.2 13.5262 11.2 12C11.2 10.4738 11.8105 9.09023 12.8007 8.08015ZM14.4 8.79971C13.4284 9.52947 12.8 10.6913 12.8 12C12.8 13.3087 13.4284 14.4705 14.4 15.2003C15.3716 14.4705 16 13.3087 16 12C16 10.6913 15.3716 9.52947 14.4 8.79971Z"],["static-attr","fill","#A09B8C"],["flush-element"],["close-element"],["text","\\n        "],["open-element","path",[]],["static-attr","class","eh-page-header-system-controls-icon-path"],["static-attr","d","M20.7999 12C20.7999 14.2091 19.0091 16 16.7999 16C14.5908 16 12.7999 14.2091 12.7999 12C12.7999 9.79086 14.5908 8 16.7999 8C19.0091 8 20.7999 9.79086 20.7999 12Z"],["static-attr","fill","#A09B8C"],["flush-element"],["close-element"],["text","\\n      "],["close-element"],["text","\\n      "],["open-element","defs",[]],["flush-element"],["text","\\n        "],["open-element","clipPath",[]],["static-attr","id","clip0_3016_32270"],["flush-element"],["text","\\n          "],["open-element","rect",[]],["static-attr","width","17.6"],["static-attr","height","17.6"],["static-attr","fill","white"],["static-attr","transform","translate(3.19995 3.2002)"],["flush-element"],["close-element"],["text","\\n        "],["close-element"],["text","\\n      "],["close-element"],["text","\\n    "],["close-element"],["text","\\n"]],"locals":[]}],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, n) => {
        const a = n(1).Ember;
        e.exports = a.HTMLBars.template({
          id: "9DEuw1Sw",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-event-hub\\\\src\\\\app\\\\templates\\\\components\\\\page-header.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-event-hub\\\\src\\\\app\\\\styles\\\\components\\\\page-header.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-event-hub\\\\src\\\\app\\\\components\\\\page-header.js\\" "],["text","\\n"],["open-element","img",[]],["static-attr","class","eh-page-header-logo"],["dynamic-attr","src",["unknown",["eventDetailsData","eventIconPath"]],null],["flush-element"],["close-element"],["text","\\n"],["open-element","div",[]],["static-attr","class","eh-page-header-title"],["flush-element"],["text","\\n"],["block",["if"],[["get",["hasHeaderTitleImage"]]],null,11,10],["close-element"],["text","\\n"],["open-element","div",[]],["static-attr","class","eh-page-header-end-timer"],["flush-element"],["text","\\n"],["block",["uikit-tooltip"],null,[["tooltipPosition","type"],["bottom","system"]],9],["text","  "],["open-element","img",[]],["static-attr","class","eh-page-header-clock-icon"],["static-attr","src","/fe/lol-static-assets/images/event-shop/clock-icon-gold3.svg"],["flush-element"],["close-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","eh-page-header-end-timer-text"],["flush-element"],["text","\\n    "],["append",["helper",["remaining-time-text"],null,[["endDateTime","almostEndingText","timeHasExpiredText","longTimeText","wrappingText"],[["get",["remainingTimeTextProps","endDateTime"]],["get",["remainingTimeTextProps","almostEndingText"]],["get",["tra","event_shop_page_header_event_ended"]],"",["get",["remainingTimeTextProps","wrappingText"]]]]],false],["text","\\n  "],["close-element"],["text","\\n"],["close-element"],["text","\\n"],["block",["if"],[["get",["showHelpIcon"]]],null,3],["block",["if"],[["get",["showTokenBalance"]]],null,2],["block",["if"],[["get",["showSystemControls"]]],null,0],["open-element","div",[]],["static-attr","class","eh-help-modal-root"],["flush-element"],["text","\\n  "],["append",["helper",["help-modal"],null,[["showHelpModal"],[["get",["showHelpModal"]]]]],false],["text","\\n"],["close-element"],["text","\\n\\n"]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","  "],["append",["unknown",["page-header-system-controls"]],false],["text","\\n"]],"locals":[]},{"statements":[["text","          "],["open-element","lol-uikit-content-block",[]],["static-attr","class","eh-page-header-buy-tokens-tooltip"],["static-attr","type","tooltip-system"],["flush-element"],["text","\\n            "],["append",["unknown",["tra","event_shop_page_header_buy_tokens_tooltip"]],false],["text","\\n          "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","  "],["open-element","div",[]],["static-attr","class","eh-page-header-token-balance-wrapper"],["flush-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","eh-page-header-token-balance"],["flush-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","eh-page-header-token-balance-label"],["flush-element"],["text","\\n        "],["append",["unknown",["tra","event_shop_page_header_balance_you_have"]],false],["text","\\n      "],["close-element"],["text","\\n      "],["open-element","img",[]],["static-attr","class","eh-page-header-token-balance-icon"],["dynamic-attr","src",["unknown",["tokenImage"]],null],["flush-element"],["close-element"],["text","\\n      "],["append",["unknown",["event-shop-token-balance-amount"]],false],["text","\\n    "],["close-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","eh-page-header-buy-tokens-link"],["flush-element"],["text","\\n      "],["open-element","lol-uikit-close-button",[]],["static-attr","button-type","plus"],["dynamic-attr","onclick",["helper",["action"],[["get",[null]],"navigateToStore"],null],null],["flush-element"],["text","\\n"],["block",["uikit-tooltip"],null,[["tooltipPosition","type"],["bottom","system"]],1],["text","      "],["close-element"],["text","\\n    "],["close-element"],["text","\\n  "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","  "],["open-element","div",[]],["static-attr","class","eh-page-header-help-container"],["flush-element"],["text","\\n    "],["open-element","lol-uikit-info-icon",[]],["static-attr","class","eh-page-header-help-button"],["dynamic-attr","onclick",["helper",["action"],[["get",[null]],"showHelpModal"],null],null],["flush-element"],["text","\\n    "],["close-element"],["text","\\n  "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","          "],["open-element","div",[]],["static-attr","class","eh-page-header-tooltip-block eh-page-header-tooltip-block-bottom"],["flush-element"],["text","\\n            "],["open-element","h6",[]],["static-attr","class","eh-page-header-time-tooltip-bot-title"],["flush-element"],["append",["unknown",["tooltipProgressText","tooltipTitleBottom"]],false],["text","\\n            "],["close-element"],["text","\\n            "],["open-element","p",[]],["static-attr","class","eh-page-header-time-tooltip-bot-date"],["flush-element"],["append",["unknown",["shopEndDateFullText"]],false],["close-element"],["text","\\n          "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","              "],["append",["unknown",["shopEndDateFullText"]],false],["text","\\n"]],"locals":[]},{"statements":[["text","              "],["append",["unknown",["progressEndDateFullText"]],false],["text","\\n"]],"locals":[]},{"statements":[["text","        "],["open-element","div",[]],["static-attr","class","eh-page-header-tooltip-block eh-page-header-tooltip-block-top"],["flush-element"],["text","\\n          "],["open-element","h5",[]],["static-attr","class","eh-page-header-time-tooltip-top-title"],["flush-element"],["text","\\n            "],["append",["unknown",["tooltipProgressText","tooltipTitleTop"]],false],["close-element"],["text","\\n          "],["open-element","p",[]],["static-attr","class","eh-page-header-time-tooltip-top-date"],["flush-element"],["text","\\n"],["block",["if"],[["get",["progressEndDateFullText"]]],null,6,5],["text","          "],["close-element"],["text","\\n          "],["open-element","p",[]],["static-attr","class","eh-page-header-description"],["flush-element"],["append",["unknown",["tooltipProgressText","tooltipTitleDescription"]],false],["close-element"],["text","\\n        "],["close-element"],["text","\\n"],["block",["if"],[["get",["progressEndDateFullText"]]],null,4]],"locals":[]},{"statements":[["text","        "],["open-element","div",[]],["static-attr","class","eh-page-header-tooltip-block eh-page-header-tooltip-block-top"],["flush-element"],["text","\\n          "],["open-element","h5",[]],["static-attr","class","eh-page-header-time-tooltip-top-title"],["flush-element"],["text","\\n            "],["append",["unknown",["gracePeriodTooltipsText","tooltipTitleTop"]],false],["text","\\n          "],["close-element"],["text","\\n          "],["open-element","p",[]],["static-attr","class","eh-page-header-time-tooltip-top-date"],["flush-element"],["append",["unknown",["shopEndDateFullText"]],false],["close-element"],["text","\\n          "],["open-element","p",[]],["static-attr","class","eh-page-header-description-top"],["flush-element"],["text","\\n            "],["append",["unknown",["gracePeriodTooltipsText","tooltipDescriptionTop"]],false],["close-element"],["text","\\n        "],["close-element"],["text","\\n        "],["open-element","div",[]],["static-attr","class","eh-page-header-tooltip-block eh-page-header-tooltip-block-bottom"],["flush-element"],["text","\\n          "],["open-element","h6",[]],["static-attr","class","eh-page-header-time-tooltip-bot-title"],["flush-element"],["text","\\n            "],["append",["unknown",["gracePeriodTooltipsText","tooltipTitleBottom"]],false],["text","\\n          "],["close-element"],["text","\\n          "],["open-element","p",[]],["static-attr","class","eh-page-header-description"],["flush-element"],["text","\\n            "],["append",["unknown",["gracePeriodTooltipsText","tooltipDescriptionBottom"]],false],["text","\\n          "],["close-element"],["text","\\n        "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","    "],["open-element","lol-uikit-content-block",[]],["static-attr","class","eh-page-header-tooltip-content"],["static-attr","type","tooltip-large"],["flush-element"],["text","\\n"],["block",["if"],[["get",["isGracePeriod"]]],null,8,7],["text","\\n    "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","    "],["open-element","div",[]],["static-attr","class","eh-page-header-title-text"],["flush-element"],["append",["unknown",["eventDetailsData","eventName"]],false],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","    "],["open-element","img",[]],["static-attr","class","eh-page-header-title-image"],["dynamic-attr","src",["unknown",["headerTitleImageSrc"]],null],["flush-element"],["close-element"],["text","\\n"]],"locals":[]}],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, n) => {
        const a = n(1).Ember;
        e.exports = a.HTMLBars.template({
          id: "R/0AjfOi",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-event-hub\\\\src\\\\app\\\\templates\\\\components\\\\purchase-bundles-modal.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-event-hub\\\\src\\\\app\\\\styles\\\\components\\\\purchase-bundles-modal.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-event-hub\\\\src\\\\app\\\\components\\\\purchase-bundles-modal.js\\" "],["text","\\n"],["block",["uikit-modal"],null,[["displayModal","type","dismissible","dismissibleType","onClose"],[["get",["showPurchaseModal"]],"DialogAlert",true,"inside",["helper",["action"],[["get",[null]],"handleCloseModalClick"],null]]],24],["block",["if"],[["get",["showDropRatesModal"]]],null,1]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","    "],["append",["helper",["loot-table-root"],null,[["name"],[["get",["dropRatesLootItemName"]]]]],false],["text","\\n"]],"locals":[]},{"statements":[["block",["uikit-modal"],null,[["show","type","dismissibleType","onClose"],["true","DialogDismiss","inside",["helper",["action"],[["get",[null]],"closeDropRatesModal"],null]]],0]],"locals":[]},{"statements":[["text","              "],["open-element","h5",[]],["static-attr","class","eh-purchase-bundles-modal-summary-choose-text"],["flush-element"],["append",["unknown",["tra","event_hub_purchase_modal_summary_choose"]],false],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","                              "],["open-element","div",[]],["static-attr","class","eh-purchase-bundles-modal-summary-unlock-button-content"],["flush-element"],["text","\\n                                "],["append",["unknown",["tra","event_hub_purchase_modal_buy_rp"]],false],["text","\\n                              "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","                                "],["append",["helper",["uikit-spinner"],null,[["width","height"],["15px","15px"]]],false],["text","\\n"]],"locals":[]},{"statements":[["text","                    "],["open-element","div",[]],["static-attr","class","eh-purchase-bundles-modal-summary-balance"],["flush-element"],["text","\\n                      "],["open-element","div",[]],["static-attr","class","eh-purchase-bundles-modal-summary-balance-not-enough-rp"],["flush-element"],["text","\\n                        "],["append",["unknown",["tra","event_hub_purchase_modal_not_enough_rp"]],false],["close-element"],["text","\\n                    "],["close-element"],["text","\\n                    "],["open-element","div",[]],["static-attr","class","eh-purchase-bundles-modal-summary-unlock-button"],["flush-element"],["text","\\n                      "],["open-element","lol-uikit-flat-button",[]],["static-attr","primary","true"],["dynamic-attr","onclick",["helper",["action"],[["get",[null]],"openRPPurchaseModal"],null],null],["dynamic-attr","disabled",["unknown",["rpPurchaseInProgress"]],null],["flush-element"],["text","\\n"],["block",["if"],[["get",["rpPurchaseInProgress"]]],null,4,3],["text","                      "],["close-element"],["text","\\n                    "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","                    "],["open-element","div",[]],["static-attr","class","eh-purchase-bundles-modal-summary-balance"],["flush-element"],["text","\\n                      "],["append",["unknown",["tra","event_hub_purchase_modal_balance"]],false],["text","\\n                      "],["open-element","span",[]],["static-attr","class","eh-purchase-bundles-modal-rp-icon"],["flush-element"],["close-element"],["text","\\n                      "],["append",["unknown",["newBalance"]],false],["text","\\n                    "],["close-element"],["text","\\n                    "],["open-element","div",[]],["static-attr","class","eh-purchase-bundles-modal-summary-tos"],["flush-element"],["text","\\n                      "],["open-element","lol-uikit-flat-checkbox",[]],["flush-element"],["text","\\n                        "],["open-element","input",[]],["static-attr","slot","input"],["static-attr","id","tosChecked"],["static-attr","name","tosChecked"],["static-attr","type","checkbox"],["dynamic-attr","onchange",["helper",["action"],[["get",[null]],"toggleTosChecked"],null],null],["dynamic-attr","disabled",["unknown",["tosDisabled"]],null],["dynamic-attr","checked",["unknown",["tosChecked"]],null],["flush-element"],["close-element"],["text","\\n                        "],["open-element","label",[]],["static-attr","slot","label"],["static-attr","for","tosChecked"],["static-attr","class","eh-purchase-bundles-modal-tos-text"],["flush-element"],["text","\\n                          "],["append",["unknown",["tosText"]],false],["text","\\n                        "],["close-element"],["text","\\n                      "],["close-element"],["text","\\n                    "],["close-element"],["text","\\n                    "],["open-element","div",[]],["static-attr","class","eh-purchase-bundles-modal-summary-unlock-button"],["flush-element"],["text","\\n                      "],["open-element","lol-uikit-flat-button",[]],["static-attr","primary","true"],["dynamic-attr","disabled",["unknown",["unlockButtonDisabled"]],null],["dynamic-attr","onclick",["helper",["action"],[["get",[null]],"unlockPass"],null],null],["flush-element"],["text","\\n                        "],["open-element","div",[]],["static-attr","class","eh-purchase-bundles-modal-summary-unlock-button-content"],["flush-element"],["text","\\n                          "],["append",["unknown",["tra","event_hub_purchase_modal_unlock_now"]],false],["text","\\n                        "],["close-element"],["text","\\n                      "],["close-element"],["text","\\n                    "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","                              "],["open-element","div",[]],["dynamic-attr","onclick",["helper",["action"],[["get",[null]],"openDropRatesModal",["get",["item"]]],null],null],["static-attr","class","eh-purchase-bundles-modal-summary-item-drop-rates"],["flush-element"],["text","\\n                                "],["open-element","span",[]],["static-attr","class","eh-purchase-bundles-modal-dice-icon"],["flush-element"],["close-element"],["text","\\n                                "],["append",["unknown",["tra","event_hub_purchase_modal_see_drop_rates"]],false],["text","\\n                              "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","                                "],["append",["helper",["inventory-type-name"],[["get",["item","inventoryType"]]],null],false],["text","\\n"]],"locals":[]},{"statements":[["text","                                "],["append",["unknown",["tra","event_shop_offer_card_owned"]],false],["text","\\n"]],"locals":[]},{"statements":[["text","                      "],["open-element","div",[]],["dynamic-attr","class",["concat",["eh-purchase-bundles-modal-summary-item\\n                          ",["helper",["if"],[["get",["item","owned"]],"eh-purchase-bundles-modal-summary-item-owned"],null]]]],["flush-element"],["text","\\n                        "],["open-element","div",[]],["static-attr","class","eh-purchase-bundles-modal-summary-item-img-wrapper"],["flush-element"],["text","\\n                          "],["open-element","img",[]],["static-attr","class","eh-purchase-bundles-modal-summary-item-img"],["dynamic-attr","src",["helper",["safe-image-path"],[["get",["item","splashImage"]]],null],null],["flush-element"],["close-element"],["text","\\n                        "],["close-element"],["text","\\n                        "],["open-element","div",[]],["static-attr","class","eh-purchase-bundles-modal-summary-item-details"],["flush-element"],["text","\\n                          "],["open-element","p",[]],["static-attr","class","eh-purchase-bundles-modal-summary-item-name"],["flush-element"],["text","\\n                            "],["append",["unknown",["item","displayName"]],false],["text","\\n                          "],["close-element"],["text","\\n                          "],["open-element","div",[]],["static-attr","class","eh-purchase-bundles-modal-summary-item-description"],["flush-element"],["text","\\n                            "],["open-element","p",[]],["static-attr","class","eh-purchase-bundles-modal-summary-item-inventory-type"],["flush-element"],["text","\\n"],["block",["if"],[["get",["item","owned"]]],null,9,8],["text","                            "],["close-element"],["text","\\n"],["block",["if"],[["helper",["eq"],[["get",["item","subInventoryType"]],"CHEST"],null]],null,7],["text","                          "],["close-element"],["text","\\n                        "],["close-element"],["text","\\n                      "],["close-element"],["text","\\n"]],"locals":["item"]},{"statements":[["text","                        "],["append",["unknown",["tra","event_shop_see_more"]],false],["text","\\n"]],"locals":[]},{"statements":[["text","                        "],["append",["unknown",["tra","event_shop_see_less"]],false],["text","\\n"]],"locals":[]},{"statements":[["text","              "],["open-element","lol-uikit-scrollable",[]],["static-attr","overflow-masks","enabled"],["static-attr","class","eh-purchase-bundles-modal-summary-scrollable-area"],["flush-element"],["text","\\n                "],["open-element","div",[]],["static-attr","id","eh-purchase-bundles-modal-summary-description"],["dynamic-attr","class",["concat",["eh-purchase-bundles-modal-summary-description\\n                    ",["unknown",["descriptionElementAdditionalClassName"]],"\\n                    ",["helper",["if"],[["get",["isDescriptionExpanded"]],"eh-purchase-bundles-modal-summary-description-expanded"],null]]]],["flush-element"],["text","\\n                  "],["open-element","div",[]],["static-attr","id","eh-purchase-bundles-modal-summary-description-text"],["static-attr","class","eh-purchase-bundles-modal-summary-description-text"],["flush-element"],["text","\\n                    "],["append",["unknown",["selectedOption","details","description"]],true],["text","\\n                  "],["close-element"],["text","\\n                  "],["open-element","div",[]],["static-attr","class","eh-purchase-bundles-modal-summary-description-see-more"],["dynamic-attr","onclick",["helper",["action"],[["get",[null]],"expandOrCollapseDescription"],null],null],["flush-element"],["text","\\n                    "],["open-element","div",[]],["static-attr","class","eh-purchase-bundles-modal-summary-description-see-more-text"],["flush-element"],["text","\\n"],["block",["if"],[["get",["isDescriptionExpanded"]]],null,12,11],["text","                    "],["close-element"],["text","\\n                    "],["open-element","span",[]],["static-attr","class","eh-purchase-bundles-modal-summary-description-see-more-chevron"],["flush-element"],["close-element"],["text","\\n                  "],["close-element"],["text","\\n                "],["close-element"],["text","\\n                "],["open-element","div",[]],["static-attr","class","eh-purchase-bundles-modal-summary-items"],["flush-element"],["text","\\n                  "],["open-element","h5",[]],["static-attr","class","eh-purchase-bundles-modal-summary-items-header"],["flush-element"],["text","\\n                    "],["append",["unknown",["tra","event_hub_purchase_modal_purchse_summary"]],false],["text","\\n                  "],["close-element"],["text","\\n                  "],["open-element","div",[]],["static-attr","class","eh-purchase-bundles-modal-summary-item-list"],["flush-element"],["text","\\n"],["block",["each"],[["get",["selectedOption","bundledItems"]]],null,10],["text","                  "],["close-element"],["text","\\n                "],["close-element"],["text","\\n              "],["close-element"],["text","\\n              "],["open-element","div",[]],["static-attr","class","eh-purchase-bundles-modal-summary-unlock"],["flush-element"],["text","\\n                "],["open-element","div",[]],["static-attr","class","eh-purchase-bundles-modal-summary-price"],["flush-element"],["text","\\n                  "],["open-element","div",[]],["static-attr","class","eh-purchase-bundles-modal-summary-final-price"],["flush-element"],["text","\\n                    "],["open-element","span",[]],["static-attr","class","eh-purchase-bundles-modal-rp-icon"],["flush-element"],["close-element"],["text","\\n                    "],["open-element","div",[]],["static-attr","class","eh-purchase-bundles-modal-summary-final-price-text"],["flush-element"],["append",["unknown",["finalPrice"]],false],["close-element"],["text","\\n                  "],["close-element"],["text","\\n"],["text","                "],["close-element"],["text","\\n"],["block",["if"],[["get",["selectedOption","isPurchasable"]]],null,6,5],["text","              "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","          "],["open-element","div",[]],["static-attr","class","eh-purchase-bundles-modal-summary-details"],["flush-element"],["text","\\n"],["block",["if"],[["get",["selectedOption"]]],null,13,2],["text","          "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","          "],["open-element","div",[]],["static-attr","class","eh-purchase-bundles-modal-spinner"],["flush-element"],["text","\\n            "],["append",["unknown",["event-shop-fallback"]],false],["text","\\n          "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","        "],["open-element","div",[]],["static-attr","class","eh-purchase-bundles-modal-summary-header"],["flush-element"],["text","\\n          "],["open-element","h4",[]],["static-attr","class","eh-purchase-bundles-modal-summary-title"],["flush-element"],["append",["unknown",["summaryTitle"]],false],["close-element"],["text","\\n          "],["open-element","h5",[]],["static-attr","class","eh-purchase-bundles-modal-summary-subtitle"],["flush-element"],["append",["unknown",["summarySubtitle"]],false],["close-element"],["text","\\n        "],["close-element"],["text","\\n"],["block",["if"],[["get",["isExecutingPurchase"]]],null,15,14]],"locals":[]},{"statements":[["text","        "],["open-element","div",[]],["static-attr","class","eh-purchase-bundles-modal-success"],["flush-element"],["text","\\n          "],["open-element","div",[]],["static-attr","class","eh-purchase-bundles-modal-success-header"],["flush-element"],["text","\\n            "],["open-element","div",[]],["static-attr","class","eh-purchase-bundles-modal-success-lock-icon"],["flush-element"],["close-element"],["text","\\n            "],["open-element","div",[]],["static-attr","class","eh-purchase-bundles-modal-success-text"],["flush-element"],["text","\\n              "],["append",["unknown",["tra","event_hub_purchase_modal_success_header"]],false],["text","\\n            "],["close-element"],["text","\\n            "],["open-element","div",[]],["static-attr","class","eh-purchase-bundles-modal-success-item-name"],["flush-element"],["text","\\n              "],["append",["unknown",["summaryTitle"]],false],["text","\\n            "],["close-element"],["text","\\n            "],["open-element","div",[]],["static-attr","class","eh-purchase-bundles-modal-success-message"],["flush-element"],["text","\\n              "],["append",["unknown",["successMessage"]],false],["text","\\n            "],["close-element"],["text","\\n          "],["close-element"],["text","\\n          "],["open-element","div",[]],["static-attr","class","eh-purchase-bundles-modal-success-footer"],["flush-element"],["text","\\n            "],["open-element","div",[]],["static-attr","class","eh-purchase-bundles-modal-summary-unlock-button"],["flush-element"],["text","\\n              "],["open-element","lol-uikit-flat-button",[]],["dynamic-attr","onclick",["helper",["action"],[["get",[null]],"handleCloseModalClick"],null],null],["flush-element"],["text","\\n                "],["open-element","div",[]],["static-attr","class","eh-purchase-bundles-modal-summary-unlock-button-content"],["flush-element"],["text","\\n                  "],["append",["unknown",["tra","event_hub_purchase_modal_awesome"]],false],["text","\\n                "],["close-element"],["text","\\n              "],["close-element"],["text","\\n            "],["close-element"],["text","\\n          "],["close-element"],["text","\\n        "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","        "],["open-element","div",[]],["static-attr","class","eh-purchase-bundles-modal-spinner"],["flush-element"],["text","\\n          "],["append",["unknown",["event-shop-fallback"]],false],["text","\\n        "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","                "],["open-element","div",[]],["static-attr","class","eh-purchase-bundles-modal-option-details"],["flush-element"],["text","\\n                  "],["open-element","div",[]],["static-attr","class","eh-purchase-bundles-modal-option-title"],["flush-element"],["append",["unknown",["option","details","name"]],false],["close-element"],["text","\\n                  "],["open-element","div",[]],["static-attr","class","eh-purchase-bundles-modal-option-bottom-row"],["flush-element"],["text","\\n                    "],["open-element","div",[]],["static-attr","class","eh-purchase-bundles-modal-option-price"],["flush-element"],["text","\\n                      "],["open-element","span",[]],["static-attr","class","eh-purchase-bundles-modal-rp-icon"],["flush-element"],["close-element"],["text","\\n                      "],["open-element","div",[]],["static-attr","class","eh-purchase-bundles-modal-option-price-text"],["flush-element"],["append",["unknown",["option","finalPrice"]],false],["close-element"],["text","\\n                    "],["close-element"],["text","\\n                    "],["open-element","div",[]],["static-attr","class","eh-purchase-bundles-modal-option-quantity"],["flush-element"],["append",["unknown",["option","bundledItems","length"]],false],["close-element"],["text","\\n                  "],["close-element"],["text","\\n                "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","                "],["open-element","div",[]],["static-attr","class","eh-purchase-bundles-modal-option-owned-text"],["flush-element"],["append",["unknown",["tra","event_shop_offer_card_owned"]],false],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","                "],["open-element","img",[]],["static-attr","class","eh-purchase-bundles-modal-decorator-badge"],["dynamic-attr","src",["unknown",["option","details","decoratorBadgeURL"]],null],["static-attr","onerror","this.onerror=null; this.remove();"],["flush-element"],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","            "],["open-element","div",[]],["dynamic-attr","class",["concat",["eh-purchase-bundles-modal-option\\n                ",["unknown",["option","optionTypeCssClass"]],"\\n                ",["unknown",["option","selectedCssClass"]],"\\n                ",["unknown",["option","ownedClass"]],"\\n                ",["unknown",["optionsPointerClass"]],"\\n                ",["unknown",["optionsExecutingPurchaseClass"]]]]],["dynamic-attr","onclick",["helper",["action"],[["get",[null]],"selectOption",["get",["option"]]],null],null],["flush-element"],["text","\\n              "],["open-element","div",[]],["static-attr","class","eh-purchase-bundles-modal-option-image-wrapper"],["flush-element"],["text","\\n"],["block",["if"],[["get",["option","details","decoratorBadgeURL"]]],null,21],["text","                "],["open-element","img",[]],["static-attr","class","eh-purchase-bundles-modal-option-image"],["dynamic-attr","src",["unknown",["option","details","splashImage"]],null],["dynamic-attr","alt",["unknown",["option","details","name"]],null],["flush-element"],["close-element"],["text","\\n              "],["close-element"],["text","\\n              "],["open-element","div",[]],["static-attr","class","eh-purchase-bundles-modal-option-details-wrapper"],["flush-element"],["text","\\n"],["block",["if"],[["get",["option","isOwned"]]],null,20,19],["text","              "],["close-element"],["text","\\n            "],["close-element"],["text","\\n"]],"locals":["option"]},{"statements":[["text","        "],["open-element","div",[]],["dynamic-attr","class",["concat",["eh-purchase-bundles-modal-options-wrapper ",["unknown",["numberOfOptionsWrapperCssClass"]]]]],["flush-element"],["text","\\n"],["block",["each"],[["get",["options"]]],null,22],["text","        "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","  "],["open-element","div",[]],["static-attr","class","eh-purchase-bundles-modal"],["flush-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","eh-purchase-bundles-modal-options"],["flush-element"],["text","\\n"],["block",["if"],[["get",["options","length"]]],null,23,18],["text","    "],["close-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","eh-purchase-bundles-modal-summary"],["flush-element"],["text","\\n"],["block",["if"],[["get",["purchaseCompleted"]]],null,17,16],["text","    "],["close-element"],["text","\\n  "],["close-element"],["text","\\n"]],"locals":[]}],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, n) => {
        const a = n(1).Ember;
        e.exports = a.HTMLBars.template({
          id: "Aivm0UBc",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-event-hub\\\\src\\\\app\\\\templates\\\\components\\\\purchase-levels-modal.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-event-hub\\\\src\\\\app\\\\styles\\\\components\\\\purchase-levels-modal.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-event-hub\\\\src\\\\app\\\\components\\\\purchase-levels-modal.js\\" "],["text","\\n"],["block",["uikit-modal"],null,[["displayModal","type","dismissible","dismissibleType","onClose"],[["get",["showPurchaseModal"]],"DialogAlert",true,"inside",["helper",["action"],[["get",[null]],"handleCloseModalClick"],null]]],12]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","                                "],["append",["unknown",["levelsButtonTra"]],false],["text","\\n"]],"locals":[]},{"statements":[["text","                                "],["append",["helper",["uikit-spinner"],null,[["width","height"],["15px","15px"]]],false],["text","\\n"]],"locals":[]},{"statements":[["text","                        "],["open-element","lol-uikit-flat-button",[]],["static-attr","class","eh-purchase-levels-modal-price-button"],["dynamic-attr","disabled",["unknown",["purchaseButtonDisabled"]],null],["dynamic-attr","onclick",["helper",["action"],[["get",[null]],"purchaseLevels"],null],null],["flush-element"],["text","\\n"],["block",["if"],[["get",["purchaseInProgress"]]],null,1,0],["text","                        "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","                                "],["append",["unknown",["tra","event_hub_purchase_modal_buy_rp"]],false],["text","\\n"]],"locals":[]},{"statements":[["text","                                "],["append",["helper",["uikit-spinner"],null,[["width","height"],["15px","15px"]]],false],["text","\\n"]],"locals":[]},{"statements":[["text","                        "],["open-element","lol-uikit-flat-button",[]],["static-attr","class","eh-purchase-levels-modal-rp-button"],["static-attr","primary","true"],["dynamic-attr","onclick",["helper",["action"],[["get",[null]],"openRPPurchaseModal"],null],null],["dynamic-attr","disabled",["unknown",["rpPurchaseInProgress"]],null],["flush-element"],["text","\\n"],["block",["if"],[["get",["rpPurchaseInProgress"]]],null,4,3],["text","                        "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","                        "],["open-element","div",[]],["static-attr","class","es-purchase-levels-modal-error"],["flush-element"],["text","\\n                            "],["append",["unknown",["tra","event_hub_purchase_levels_modal_error_loading_offer"]],false],["text","\\n                        "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","                    "],["open-element","div",[]],["static-attr","class","eh-purchase-levels-modal-price-breakdown-new-balance"],["flush-element"],["append",["unknown",["tra","event_hub_purchase_levels_modal_new_balance"]],false],["open-element","img",[]],["static-attr","src","/fe/lol-static-assets/images/event-hub/rp-small.svg"],["flush-element"],["close-element"],["append",["unknown",["newBalanceTra"]],false],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","                    "],["open-element","div",[]],["static-attr","class","es-purchase-levels-modal-error"],["flush-element"],["text","\\n                        "],["append",["unknown",["tra","event_hub_purchase_modal_not_enough_rp"]],false],["text","\\n                    "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","                        "],["open-element","div",[]],["static-attr","class","eh-multi-purchase-slider-container"],["flush-element"],["text","\\n                            "],["open-element","div",[]],["static-attr","class","eh-slider-number"],["flush-element"],["text","\\n                                "],["append",["unknown",["minNumberOfLevelsToBuy"]],false],["text","\\n                            "],["close-element"],["text","\\n                            "],["open-element","lol-uikit-slider",[]],["static-attr","class","multi-purchase-uikit-slider eh-multi-purchase-slider"],["static-attr","step","1"],["static-attr","min","1"],["dynamic-attr","max",["unknown",["numberOfLevelsToBuy"]],null],["dynamic-attr","value",["unknown",["levelsToBuy"]],null],["static-attr","clickSet","true"],["dynamic-attr","onchange",["helper",["action"],[["get",[null]],"updateLevelsToBuy"],null],null],["flush-element"],["close-element"],["text","\\n                            "],["open-element","div",[]],["static-attr","class","eh-slider-number"],["flush-element"],["text","\\n                                "],["append",["unknown",["numberOfLevelsToBuy"]],false],["text","\\n                            "],["close-element"],["text","\\n                        "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","                            "],["open-element","uikit-state-machine",[]],["static-attr","state","hidden"],["dynamic-attr","showPurchaseModal",["helper",["if"],[["get",["showPurchaseModal"]],"true","false"],null],null],["dynamic-attr","isDataLoading",["helper",["if"],[["get",["isDataLoading"]],"true","false"],null],null],["static-attr","class","eh-purchase-levels-modal-selection-next-level-animation"],["flush-element"],["text","\\n                                "],["open-element","uikit-states",[]],["flush-element"],["text","\\n                                    "],["open-element","uikit-state",[]],["static-attr","name","hidden"],["flush-element"],["text","\\n                                        "],["open-element","uikit-transition",[]],["static-attr","next-state","intro"],["flush-element"],["text","\\n                                            "],["open-element","uikit-condition-parameter",[]],["static-attr","name","showPurchaseModal"],["static-attr","value","true"],["flush-element"],["close-element"],["text","\\n                                            "],["open-element","uikit-condition-parameter",[]],["static-attr","name","isDataLoading"],["static-attr","value","false"],["flush-element"],["close-element"],["text","\\n                                            "],["open-element","uikit-condition-media",[]],["static-attr","selector","#hidden"],["static-attr","can-play",""],["flush-element"],["close-element"],["text","\\n                                        "],["close-element"],["text","\\n                                        "],["open-element","uikit-behavior-media",[]],["static-attr","selector","#hidden"],["static-attr","preloading",""],["flush-element"],["close-element"],["text","\\n                                        "],["open-element","uikit-behavior-media",[]],["static-attr","selector","#loop"],["static-attr","preloading",""],["flush-element"],["close-element"],["text","\\n                                    "],["close-element"],["text","\\n                                    "],["open-element","uikit-state",[]],["static-attr","name","intro"],["flush-element"],["text","\\n                                        "],["open-element","uikit-transition",[]],["static-attr","next-state","loop"],["flush-element"],["text","\\n                                            "],["open-element","uikit-condition-media",[]],["static-attr","selector","#hidden"],["static-attr","ended",""],["flush-element"],["close-element"],["text","\\n                                            "],["open-element","uikit-condition-media",[]],["static-attr","selector","#loop"],["static-attr","can-play",""],["flush-element"],["close-element"],["text","\\n                                        "],["close-element"],["text","\\n                                        "],["open-element","uikit-behavior-media",[]],["static-attr","selector","#hidden"],["static-attr","ended",""],["flush-element"],["close-element"],["text","\\n                                    "],["close-element"],["text","\\n                                    "],["open-element","uikit-state",[]],["static-attr","name","loop"],["flush-element"],["text","\\n                                        "],["open-element","uikit-transition",[]],["static-attr","next-state","hidden"],["flush-element"],["text","\\n                                            "],["open-element","uikit-condition-parameter",[]],["static-attr","next-state","hidden"],["static-attr","name","isDataLoading"],["static-attr","value","true"],["flush-element"],["close-element"],["text","\\n                                        "],["close-element"],["text","\\n                                        "],["open-element","uikit-behavior-media",[]],["static-attr","selector","#loop"],["static-attr","playing",""],["flush-element"],["close-element"],["text","\\n                                    "],["close-element"],["text","\\n                                "],["close-element"],["text","\\n                                "],["open-element","uikit-switch",[]],["static-attr","id","hidden"],["static-attr","visible-state","intro"],["flush-element"],["text","\\n                                    "],["open-element","uikit-video",[]],["static-attr","src","/fe/lol-static-assets/images/event-hub/level-ring-fast.webm"],["static-attr","visible-value","*"],["flush-element"],["close-element"],["text","\\n                                "],["close-element"],["text","\\n                                "],["open-element","uikit-switch",[]],["static-attr","id","loop"],["static-attr","visible-state","loop"],["flush-element"],["text","\\n                                    "],["open-element","uikit-video",[]],["static-attr","src","/fe/lol-static-assets/images/event-hub/level-ring.webm"],["static-attr","visible-value","*"],["static-attr","loop",""],["flush-element"],["close-element"],["text","\\n                                "],["close-element"],["text","\\n                            "],["close-element"],["text","\\n                            "],["open-element","video",[]],["static-attr","id","level-increase"],["static-attr","class","eh-purchase-levels-modal-selection-next-level-animation"],["static-attr","src","/fe/lol-static-assets/images/event-hub/union-animated.webm#t=50"],["flush-element"],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","                "],["open-element","div",[]],["static-attr","class","eh-purchase-levels-modal-spinner"],["flush-element"],["text","\\n                    "],["append",["helper",["uikit-spinner"],null,[["width","height"],["40px","40px"]]],false],["text","\\n                "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","    "],["open-element","div",[]],["static-attr","class","eh-purchase-levels-modal"],["flush-element"],["text","\\n        "],["open-element","div",[]],["static-attr","class","eh-purchase-levels-modal-container"],["flush-element"],["text","\\n            "],["open-element","div",[]],["static-attr","class","eh-purchase-levels-modal-header"],["flush-element"],["text","\\n                "],["open-element","img",[]],["static-attr","src","/fe/lol-static-assets/images/event-hub/ticket.svg"],["flush-element"],["close-element"],["text","\\n                "],["open-element","div",[]],["static-attr","class","eh-purchase-levels-modal-header-title"],["flush-element"],["text","\\n                    "],["append",["unknown",["titleTra"]],false],["text","\\n                "],["close-element"],["text","\\n                "],["open-element","div",[]],["static-attr","class","eh-purchase-levels-modal-header-subtitle"],["flush-element"],["text","\\n                    "],["append",["unknown",["tra","event_hub_purchase_levels_modal_subtitle"]],false],["text","\\n                "],["close-element"],["text","\\n            "],["close-element"],["text","\\n\\n"],["block",["if"],[["get",["isDataLoading"]]],null,11],["text","            "],["open-element","div",[]],["dynamic-attr","class",["concat",["eh-purchase-levels-modal-content-container ",["helper",["if"],[["get",["isDataLoading"]],"eh-purchase-levels-modal-content-container--hidden"],null]]]],["flush-element"],["text","\\n                "],["open-element","div",[]],["static-attr","class","eh-purchase-levels-modal-selection-container"],["flush-element"],["text","\\n                    "],["open-element","div",[]],["static-attr","class","eh-purchase-levels-modal-selection"],["flush-element"],["text","\\n"],["block",["if"],[["get",["animationsEnabled"]]],null,10],["text","                        "],["open-element","div",[]],["dynamic-attr","class",["concat",["eh-purchase-levels-modal-selection-next-level ",["helper",["unless"],[["get",["animationsEnabled"]],"low-spec"],null]]]],["flush-element"],["text","\\n                            "],["open-element","div",[]],["static-attr","class","eh-purchase-levels-modal-selection-next-level-title"],["flush-element"],["text","\\n                                "],["append",["unknown",["tra","event_hub_purchase_levels_modal_new_level_text"]],false],["text","\\n                            "],["close-element"],["text","\\n                            "],["open-element","div",[]],["static-attr","class","eh-purchase-levels-modal-selection-next-level-black-box"],["flush-element"],["text","\\n                                "],["open-element","div",[]],["static-attr","class","eh-purchase-levels-modal-selection-next-level-new-level"],["flush-element"],["text","\\n                                    "],["append",["unknown",["newLevel"]],false],["text","\\n                                "],["close-element"],["text","\\n                            "],["close-element"],["text","\\n                        "],["close-element"],["text","\\n                    "],["close-element"],["text","\\n"],["block",["if"],[["get",["shouldRenderSlider"]]],null,9],["text","\\n                    "],["open-element","div",[]],["static-attr","class","eh-slider-incrementer-container"],["flush-element"],["text","\\n                        "],["open-element","div",[]],["static-attr","class","eh-slider-incrementer"],["flush-element"],["text","\\n                            "],["open-element","lol-uikit-close-button",[]],["static-attr","button-type","remove"],["dynamic-attr","onclick",["helper",["action"],[["get",[null]],"decreaseLevelsToBuy"],null],null],["dynamic-attr","disabled",["helper",["if"],[["helper",["eq"],[["get",["minNumberOfLevelsToBuy"]],["get",["levelsToBuy"]]],null],"true",null],null],null],["flush-element"],["close-element"],["text","\\n                            "],["open-element","div",[]],["static-attr","class","eh-slider-incrementer-current"],["flush-element"],["append",["unknown",["levelsToBuy"]],false],["close-element"],["text","\\n                            "],["open-element","lol-uikit-close-button",[]],["static-attr","button-type","add"],["dynamic-attr","onclick",["helper",["action"],[["get",[null]],"increaseLevelsToBuy"],null],null],["dynamic-attr","disabled",["helper",["if"],[["helper",["eq"],[["get",["numberOfLevelsToBuy"]],["get",["levelsToBuy"]]],null],"true",null],null],null],["flush-element"],["close-element"],["text","\\n                        "],["close-element"],["text","\\n                        "],["open-element","div",[]],["static-attr","class","eh-slider-incrementer-caption"],["flush-element"],["text","\\n                            "],["append",["unknown",["tra","event_hub_purchase_levels_modal_slider_caption"]],false],["text","\\n                        "],["close-element"],["text","\\n                    "],["close-element"],["text","\\n                "],["close-element"],["text","\\n                "],["open-element","div",[]],["static-attr","class","eh-purchase-levels-modal-price-breakdown-container"],["flush-element"],["text","\\n                    "],["open-element","div",[]],["static-attr","class","eh-purchase-levels-modal-price-breakdown-rp"],["flush-element"],["open-element","img",[]],["static-attr","src","/fe/lol-static-assets/images/event-hub/rp.svg"],["flush-element"],["close-element"],["append",["unknown",["totalPriceTra"]],false],["close-element"],["text","\\n"],["block",["if"],[["get",["notEnoughRp"]]],null,8,7],["text","                "],["close-element"],["text","\\n                "],["open-element","div",[]],["static-attr","class","eh-purchase-levels-modal-price-confirmation-container"],["flush-element"],["text","\\n                    "],["open-element","lol-uikit-flat-checkbox",[]],["flush-element"],["text","\\n                        "],["open-element","input",[]],["static-attr","slot","input"],["static-attr","id","tosChecked"],["static-attr","name","tosChecked"],["static-attr","type","checkbox"],["dynamic-attr","onchange",["helper",["action"],[["get",[null]],"toggleTosChecked"],null],null],["dynamic-attr","disabled",["unknown",["tosDisabled"]],null],["dynamic-attr","checked",["unknown",["tosChecked"]],null],["flush-element"],["close-element"],["text","\\n                        "],["open-element","label",[]],["static-attr","slot","label"],["static-attr","for","tosChecked"],["static-attr","class","eh-purchase-levels-modal-price-confirmation-text"],["flush-element"],["text","\\n                            "],["append",["unknown",["purchaseTosTra"]],false],["text","\\n                        "],["close-element"],["text","\\n                    "],["close-element"],["text","\\n"],["block",["if"],[["get",["errorLoadingPurchaseData"]]],null,6],["text","                "],["close-element"],["text","\\n                "],["open-element","div",[]],["static-attr","class","eh-purchase-levels-modal-buttons-container"],["flush-element"],["text","\\n"],["block",["if"],[["get",["notEnoughRp"]]],null,5,2],["text","                "],["close-element"],["text","\\n            "],["close-element"],["text","\\n        "],["close-element"],["text","\\n    "],["close-element"],["text","\\n"]],"locals":[]}],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, n) => {
        const a = n(1).Ember;
        e.exports = a.HTMLBars.template({
          id: "Vv5T6iuB",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-event-hub\\\\src\\\\app\\\\templates\\\\components\\\\event-shop-card-multi-purchase-modal.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-event-hub\\\\src\\\\app\\\\styles\\\\components\\\\event-shop-card-multi-purchase-modal.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-event-hub\\\\src\\\\app\\\\components\\\\event-shop-card-multi-purchase-modal.js\\" "],["text","\\n"],["open-element","lol-uikit-content-block",[]],["static-attr","type","dialog-large"],["static-attr","class","event-shop-card-multi-purchase-content-block"],["flush-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","event-shop-card-multi-purchase-modal-preview-container"],["flush-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","event-shop-card-multi-purchase-modal-image-container"],["flush-element"],["text","\\n      "],["open-element","img",[]],["static-attr","class","event-shop-card-multi-purchase-modal-image"],["dynamic-attr","src",["unknown",["offer","image"]],null],["flush-element"],["close-element"],["text","\\n    "],["close-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","event-shop-card-multi-purchase-item-title"],["flush-element"],["append",["unknown",["offer","localizedTitle"]],false],["close-element"],["text","\\n  "],["close-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","event-shop-card-multi-purchase-item-details"],["flush-element"],["text","\\n    "],["open-element","p",[]],["flush-element"],["append",["unknown",["offer","localizedDescription"]],false],["close-element"],["text","\\n  "],["close-element"],["text","\\n"],["block",["if"],[["get",["shouldRenderMultiPurchaseSlider"]]],null,3],["text","  "],["open-element","div",[]],["static-attr","class","event-shop-card-multi-purchase-details"],["flush-element"],["text","\\n    "],["open-element","lol-uikit-purchase-button",[]],["dynamic-attr","disabled",["unknown",["isPurchaseDisabled"]],null],["dynamic-attr","onclick",["helper",["action"],[["get",[null]],"purchaseOffer",["get",["offer"]]],null],null],["flush-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","event-shop-card-multi-purchase-currency-wrapper"],["flush-element"],["text","\\n        "],["open-element","img",[]],["static-attr","class","event-shop-card-multi-purchase-currency-icon"],["dynamic-attr","src",["unknown",["tokenImageSrc"]],null],["flush-element"],["close-element"],["text","\\n        "],["append",["unknown",["purchasePrice"]],false],["text","\\n      "],["close-element"],["text","\\n    "],["close-element"],["text","\\n"],["block",["if"],[["get",["notEnoughRp"]]],null,2],["block",["if"],[["get",["offerPurchased"]]],null,1],["text","    "],["open-element","div",[]],["static-attr","class","event-shop-card-multi-purchase-future-balance"],["flush-element"],["text","\\n"],["block",["unless"],[["get",["isPurchaseDisabled"]]],null,0],["text","    "],["close-element"],["text","\\n\\n  "],["close-element"],["text","\\n"],["close-element"],["text","\\n"]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","        "],["append",["unknown",["tra","event_hub_purchase_modal_balance"]],false],["text"," "],["append",["unknown",["futureTokenBalance"]],false],["text","\\n"]],"locals":[]},{"statements":[["text","    "],["open-element","div",[]],["static-attr","class","event-shop-card-multi-purchase-not-enough-tokens"],["flush-element"],["append",["unknown",["tra","event_shop_card_purchase_offer_already_owned"]],false],["text","\\n    "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","    "],["open-element","div",[]],["static-attr","class","event-shop-card-multi-purchase-not-enough-tokens"],["flush-element"],["append",["unknown",["tra","event_shop_card_purchase_not_enough_tokens"]],false],["text","\\n    "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","    "],["append",["helper",["multi-purchase-slider"],null,[["min","max","onValidationChange","onSelectedQuantityChange","disabled"],[["get",["minPurchasableQuantity"]],["get",["maxPurchasableQuantity"]],["helper",["action"],[["get",[null]],"handleValidationChange"],null],["helper",["action"],[["get",[null]],"handleSelectedQuantityChange"],null],["get",["purchaseInProgress"]]]]],false],["text","\\n"]],"locals":[]}],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, n) => {
        const a = n(1).Ember;
        e.exports = a.HTMLBars.template({
          id: "FpB3kkPW",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-event-hub\\\\src\\\\app\\\\templates\\\\components\\\\event-shop-category-nav-bar-tab.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-event-hub\\\\src\\\\app\\\\styles\\\\components\\\\event-shop-category-nav-bar-tab.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-event-hub\\\\src\\\\app\\\\components\\\\event-shop-category-nav-bar-tab.js\\" "],["text","\\n"],["open-element","img",[]],["static-attr","class","event-shop-nav-bar-tab-icon"],["dynamic-attr","src",["unknown",["categoryIconPath"]],null],["flush-element"],["close-element"],["text","\\n"],["block",["uikit-tooltip"],null,[["tooltipPosition","type"],["right","system"]],0]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["open-element","lol-uikit-content-block",[]],["static-attr","type","tooltip-system"],["flush-element"],["text","\\n    "],["open-element","p",[]],["flush-element"],["append",["unknown",["categoryTra"]],false],["close-element"],["text","\\n"],["close-element"],["text","\\n"]],"locals":[]}],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, n) => {
        const a = n(1).Ember;
        e.exports = a.HTMLBars.template({
          id: "1M/mdIqu",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-event-hub\\\\src\\\\app\\\\templates\\\\components\\\\event-shop-category-nav-bar.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-event-hub\\\\src\\\\app\\\\styles\\\\components\\\\event-shop-category-nav-bar.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-event-hub\\\\src\\\\app\\\\components\\\\event-shop-category-nav-bar.js\\" "],["text","\\n"],["block",["each"],[["get",["categoriesOffers"]]],null,0]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","  "],["append",["helper",["event-shop-category-nav-bar-tab"],null,[["scrollToCategory","category","categoryIconPath","currentCategory"],[["get",["scrollToCategory"]],["get",["categoryOffers","category"]],["get",["categoryOffers","categoryIconPath"]],["get",["currentCategory"]]]]],false],["text","\\n"]],"locals":["categoryOffers"]}],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, n) => {
        const a = n(1).Ember;
        e.exports = a.HTMLBars.template({
          id: "ShveJusy",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-event-hub\\\\src\\\\app\\\\templates\\\\components\\\\event-shop-category-offers.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-event-hub\\\\src\\\\app\\\\styles\\\\components\\\\event-shop-category-offers.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-event-hub\\\\src\\\\app\\\\components\\\\event-shop-category-offers.js\\" "],["text","\\n"],["open-element","div",[]],["dynamic-attr","id",["unknown",["categoryOffersId"]],null],["static-attr","class","event-shop-token-shop-category-offers"],["flush-element"],["text","\\n"],["block",["each"],[["get",["categoryOffers","offers"]]],null,0],["close-element"],["text","\\n"]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","    "],["append",["helper",["event-shop-offer-card"],null,[["offer"],[["get",["offer"]]]]],false],["text","\\n"]],"locals":["offer"]}],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, n) => {
        const a = n(1).Ember;
        e.exports = a.HTMLBars.template({
          id: "gGUMBjzT",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-event-hub\\\\src\\\\app\\\\templates\\\\components\\\\event-shop-fallback.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-event-hub\\\\src\\\\app\\\\styles\\\\components\\\\event-shop-fallback.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-event-hub\\\\src\\\\app\\\\components\\\\event-shop-fallback.js\\" "],["text","\\n"],["block",["if"],[["get",["error","errorMessage"]]],null,1,0]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","  "],["open-element","div",[]],["static-attr","class","event-shop-spinner"],["flush-element"],["text","\\n    "],["append",["helper",["uikit-spinner"],null,[["width","height"],["40px","40px"]]],false],["text","\\n  "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","  "],["open-element","div",[]],["static-attr","class","event-shop-unavailable-container"],["flush-element"],["text","\\n    "],["open-element","img",[]],["static-attr","class","event-shop-unavailable-error-image"],["static-attr","src","/fe/lol-static-assets/images/event-shop/icon-shocked-poro-clear.png"],["flush-element"],["close-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","event-shop-unavailable-message"],["flush-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","event-shop-unavailable-message-title"],["flush-element"],["text","\\n        "],["open-element","img",[]],["static-attr","class","event-shop-unavailable-message-title-warning"],["static-attr","src","/fe/lol-static-assets/images/event-shop/red-warning.png"],["flush-element"],["close-element"],["append",["unknown",["errorMessageTra","title"]],false],["text","\\n      "],["close-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","event-shop-unavailable-message-description"],["flush-element"],["text","\\n        "],["append",["unknown",["errorMessageTra","description"]],false],["text","\\n      "],["close-element"],["text","\\n    "],["close-element"],["text","\\n  "],["close-element"],["text","\\n"]],"locals":[]}],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, n) => {
        const a = n(1).Ember;
        e.exports = a.HTMLBars.template({
          id: "ESR5HFFv",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-event-hub\\\\src\\\\app\\\\templates\\\\components\\\\event-shop-main-view.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-event-hub\\\\src\\\\app\\\\styles\\\\components\\\\event-shop-main-view.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-event-hub\\\\src\\\\app\\\\components\\\\event-shop-main-view.js\\" "],["text","\\n"],["open-element","div",[]],["dynamic-attr","class",["concat",["event-shop-main-view-token-shop ",["helper",["if"],[["get",["isRewardTrackMinimized"]],"event-shop-main-view-token-shop-maximized",""],null]]]],["flush-element"],["text","\\n  "],["append",["unknown",["event-shop-token-shop"]],false],["text","\\n"],["close-element"],["text","\\n"],["open-element","div",[]],["dynamic-attr","class",["concat",["event-shop-main-view-progression ",["helper",["if"],[["get",["isRewardTrackMinimized"]],"event-shop-main-view-progression-minimized",""],null]]]],["flush-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","event-shop-main-view-progression-minimize-button-container"],["dynamic-attr","onclick",["helper",["action"],[["get",[null]],"minimizeRewardTrack"],null],null],["flush-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","event-shop-main-view-progression-minimize-button-trapezoid-border"],["flush-element"],["close-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","event-shop-main-view-progression-minimize-button-trapezoid"],["flush-element"],["text","\\n      "],["open-element","div",[]],["dynamic-attr","class",["concat",["event-shop-main-view-progression-minimize-button-chevron ",["helper",["if"],[["get",["isRewardTrackMinimized"]],"rotate-up",""],null]]]],["flush-element"],["close-element"],["text","\\n    "],["close-element"],["text","\\n  "],["close-element"],["text","\\n  "],["append",["helper",["event-shop-progression"],null,[["model"],[["get",["model"]]]]],false],["text","\\n"],["close-element"]],"locals":[],"named":[],"yields":[],"blocks":[],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, n) => {
        const a = n(1).Ember;
        e.exports = a.HTMLBars.template({
          id: "K4M13wZF",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-event-hub\\\\src\\\\app\\\\templates\\\\components\\\\event-shop-offer-card.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-event-hub\\\\src\\\\app\\\\styles\\\\components\\\\event-shop-offer-card.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-event-hub\\\\src\\\\app\\\\components\\\\event-shop-offer-card.js\\" "],["text","\\n"],["open-element","img",[]],["dynamic-attr","src",["concat",[["unknown",["offerImage"]]]]],["static-attr","class","event-shop-token-shop-offer-card-image"],["flush-element"],["close-element"],["text","\\n"],["open-element","div",[]],["static-attr","class","event-shop-token-shop-offer-card-footer"],["flush-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","event-shop-token-shop-offer-card-title"],["flush-element"],["text","\\n    "],["append",["unknown",["offer","localizedTitle"]],false],["text","\\n  "],["close-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","event-shop-token-shop-offer-card-price"],["flush-element"],["text","\\n"],["block",["if"],[["get",["isOfferOwned"]]],null,7,6],["text","  "],["close-element"],["text","\\n"],["block",["if"],[["get",["shouldRenderOfferItemsCount"]]],null,2],["close-element"],["text","\\n\\n"],["block",["if"],[["get",["displayMultiPurchaseModal"]]],null,1]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","    "],["append",["helper",["event-shop-card-multi-purchase-modal"],null,[["closeModal","offer"],[["helper",["action"],[["get",[null]],"closeModal"],null],["get",["offer"]]]]],false],["text","\\n"]],"locals":[]},{"statements":[["block",["uikit-modal"],null,[["displayModal","type","dismissible","dismissibleType","onClose"],[["get",["displayMultiPurchaseModal"]],"DialogDismiss",true,"outside",["helper",["action"],[["get",[null]],"closeModal"],null]]],0]],"locals":[]},{"statements":[["text","    "],["open-element","div",[]],["static-attr","class","event-shop-token-shop-offer-items-size"],["flush-element"],["text","\\n      "],["append",["unknown",["offer","items","length"]],false],["text","\\n    "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","      "],["open-element","img",[]],["static-attr","class","event-shop-token-shop-offer-card-price-currency-icon"],["dynamic-attr","src",["unknown",["tokenShopData","tokenImage"]],null],["flush-element"],["close-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","event-shop-token-shop-offer-card-price-value"],["flush-element"],["append",["unknown",["offer","price"]],false],["close-element"],["text","\\n    "]],"locals":[]},{"statements":[["block",["if"],[["get",["isOfferRevealed"]]],null,3]],"locals":[]},{"statements":[["text","      "],["open-element","div",[]],["static-attr","class","event-shop-token-shop-offer-card-spinner"],["flush-element"],["text","\\n        "],["append",["helper",["uikit-spinner"],null,[["width","height"],["15px","15px"]]],false],["text","\\n      "],["close-element"],["text","\\n      "],["append",["unknown",["tra","event_shop_offer_card_purchasing"]],false],["text","\\n"]],"locals":[]},{"statements":[["block",["if"],[["get",["isPurchasing"]]],null,5,4]],"locals":[]},{"statements":[["text","      "],["open-element","img",[]],["static-attr","class","event-shop-token-shop-offer-card-owned-icon"],["static-attr","src","/fe/lol-static-assets/images/event-shop/check_mask.png"],["flush-element"],["close-element"],["text","\\n      "],["append",["unknown",["tra","event_shop_offer_card_owned"]],false],["text","\\n"]],"locals":[]}],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, n) => {
        const a = n(1).Ember;
        e.exports = a.HTMLBars.template({
          id: "H/0LzVVS",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-event-hub\\\\src\\\\app\\\\templates\\\\components\\\\event-shop-progression.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-event-hub\\\\src\\\\app\\\\styles\\\\components\\\\event-shop-progression.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-event-hub\\\\src\\\\app\\\\components\\\\event-shop-progression.js\\" "],["text","\\n"],["block",["if"],[["get",["rewardTrackItems","length"]]],null,10,0]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","  "],["open-element","div",[]],["static-attr","class","event-shop-progression-fallback"],["flush-element"],["text","\\n    "],["append",["helper",["event-shop-fallback"],null,[["error"],[["get",["failureLoadingRewardTrack"]]]]],false],["text","\\n  "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","        "],["open-element","div",[]],["static-attr","class","event-shop-progression-upgrade-button"],["flush-element"],["text","\\n          "],["open-element","lol-uikit-flat-button",[]],["static-attr","primary","true"],["static-attr","class","idle"],["modifier",["action"],[["get",[null]],"passPurchaseClick"]],["flush-element"],["text","\\n            "],["open-element","div",[]],["static-attr","class","event-shop-progression-button-content"],["flush-element"],["text","\\n              "],["open-element","img",[]],["static-attr","class","event-shop-progression-ticket-icon"],["static-attr","src","/fe/lol-static-assets/images/event-shop/ticket-gold2.svg"],["flush-element"],["close-element"],["text","\\n              "],["append",["unknown",["tra","event_hub_purchase_pass"]],false],["text","\\n            "],["close-element"],["text","\\n          "],["close-element"],["text","\\n        "],["close-element"],["text","\\n      "]],"locals":[]},{"statements":[["text","        "],["open-element","div",[]],["static-attr","class","event-shop-progression-label-pass-message"],["flush-element"],["text","\\n          "],["append",["unknown",["tra","event_shop_progression_label_pass_unavailable"]],false],["text","\\n        "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["block",["if"],[["get",["passUnavailable"]]],null,2,1]],"locals":[]},{"statements":[["text","        "],["open-element","div",[]],["static-attr","class","event-shop-progression-label-pass-message"],["flush-element"],["text","\\n          "],["open-element","img",[]],["static-attr","class","event-shop-progression-check-icon"],["static-attr","src","/fe/lol-static-assets/images/event-shop/check_mask.png"],["flush-element"],["close-element"],["text","\\n          "],["append",["unknown",["tra","event_shop_progression_label_pass_purchased"]],false],["text","\\n        "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["block",["if"],[["get",["eventShopProgressionData","passPurchased"]]],null,4,3]],"locals":[]},{"statements":[["text","        "],["open-element","div",[]],["static-attr","class","event-shop-progression-label-pass-message"],["flush-element"],["text","\\n          "],["append",["unknown",["tra","event_shop_progression_label_pass_loading"]],false],["text","\\n        "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","        "],["open-element","div",[]],["static-attr","class","event-shop-progression-label-wrapper"],["flush-element"],["text","\\n          "],["open-element","p",[]],["static-attr","class","event-shop-progression-label"],["flush-element"],["append",["unknown",["tra","event_shop_progression_label_instantly_get"]],false],["close-element"],["text","\\n          "],["open-element","img",[]],["static-attr","class","event-shop-progression-token-icon"],["dynamic-attr","src",["unknown",["eventShopProgressionData","tokenImage"]],null],["flush-element"],["close-element"],["text","\\n          "],["open-element","p",[]],["static-attr","class","event-shop-progression-label-tokens"],["flush-element"],["append",["unknown",["lockedTokens"]],false],["text","\\n            "],["append",["unknown",["tra","event_shop_progression_label_tokens"]],false],["close-element"],["text","\\n        "],["close-element"],["text","\\n      "]],"locals":[]},{"statements":[["block",["if"],[["get",["lockedTokens"]]],null,7]],"locals":[]},{"statements":[["text","        "],["open-element","div",[]],["static-attr","class","event-shop-progression-unclaimed-wrapper"],["flush-element"],["text","\\n          "],["open-element","div",[]],["static-attr","class","event-shop-progression-unclaimed-box"],["flush-element"],["text","\\n            "],["open-element","span",[]],["flush-element"],["append",["unknown",["unclaimedRewards"]],false],["close-element"],["text","\\n          "],["close-element"],["text","\\n          "],["open-element","div",[]],["flush-element"],["text","\\n            "],["open-element","p",[]],["flush-element"],["append",["unknown",["tra","event_shop_progression_label_unclaimed_rewards"]],false],["close-element"],["text","\\n          "],["close-element"],["text","\\n        "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","  "],["open-element","div",[]],["static-attr","class","event-shop-progression-info"],["flush-element"],["text","\\n    "],["append",["unknown",["event-shop-xp"]],false],["text","\\n    "],["open-element","div",[]],["static-attr","class","event-shop-progression-pass-purchase"],["flush-element"],["text","\\n"],["block",["if"],[["get",["hasUnclaimedRewards"]]],null,9,8],["block",["if"],[["get",["isLoadingPassAvailability"]]],null,6,5],["text","      "],["append",["helper",["purchase-bundles-modal"],null,[["showPurchaseModal"],[["get",["showPassPurchaseModal"]]]]],false],["text","\\n    "],["close-element"],["text","\\n  "],["close-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","event-shop-progression-track"],["flush-element"],["text","\\n    "],["append",["unknown",["event-shop-reward-track-wrapper"]],false],["text","\\n  "],["close-element"],["text","\\n"]],"locals":[]}],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, n) => {
        const a = n(1).Ember;
        e.exports = a.HTMLBars.template({
          id: "i+L8e1qP",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-event-hub\\\\src\\\\app\\\\templates\\\\components\\\\event-shop-reward-track-wrapper.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-event-hub\\\\src\\\\app\\\\styles\\\\components\\\\event-shop-reward-track-wrapper.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-event-hub\\\\src\\\\app\\\\components\\\\event-shop-reward-track-wrapper.js\\" "],["text","\\n"],["block",["if"],[["get",["rewardTrackItems"]]],null,0]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","  "],["append",["helper",["reward-tracker"],null,[["rewardTrackItems","rewardTrackProgress","displayCurrentBonusIteration","rewardTrackBonusItems","rewardTrackBonusProgress","itemClick","bonusItemClick","trackerSize","useDefaultTooltipComponent","isDisabled","shouldScrollToUnclaimedReward","scrollingArrowsEnabled"],[["get",["rewardTrackItems"]],["get",["rewardTrackProgress"]],["get",["displayCurrentBonusIteration"]],["get",["rewardTrackBonusItems"]],["get",["rewardTrackBonusProgress"]],["helper",["action"],[["get",[null]],"clickItem"],null],["helper",["action"],[["get",[null]],"clickItem"],null],["get",["trackerSize"]],true,["get",["isGracePeriod"]],true,["get",["scrollingArrowsEnabled"]]]]],false],["text","\\n"]],"locals":[]}],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, n) => {
        const a = n(1).Ember;
        e.exports = a.HTMLBars.template({
          id: "W5y1Ewv0",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-event-hub\\\\src\\\\app\\\\templates\\\\components\\\\event-shop-token-shop.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-event-hub\\\\src\\\\app\\\\styles\\\\components\\\\event-shop-token-shop.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-event-hub\\\\src\\\\app\\\\components\\\\event-shop-token-shop.js\\" "],["text","\\n"],["block",["if"],[["get",["categoriesOffers","length"]]],null,2,0]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","  "],["append",["unknown",["event-shop-fallback"]],false],["text","\\n"]],"locals":[]},{"statements":[["text","          "],["open-element","div",[]],["static-attr","class","event-shop-token-shop-section-header-title-text"],["flush-element"],["append",["unknown",["categoryOffers","categoryTitle"]],false],["close-element"],["text","\\n          "],["open-element","hr",[]],["static-attr","class","event-shop-token-shop-section-header-line"],["flush-element"],["close-element"],["text","\\n          "],["append",["helper",["event-shop-category-offers"],null,[["categoryOffers","headerTxtObserver"],[["get",["categoryOffers"]],["get",["headerTxtObserver"]]]]],false],["text","\\n"]],"locals":["categoryOffers"]},{"statements":[["text","  "],["append",["helper",["event-shop-category-nav-bar"],null,[["currentCategory","categoriesOffers","scrollToCategory"],[["get",["currentCategory"]],["get",["categoriesOffers"]],["helper",["action"],[["get",[null]],"scrollToCategory"],null]]]],false],["text","\\n  "],["open-element","lol-uikit-scrollable",[]],["static-attr","id","token-shop-scrollable-container"],["static-attr","class","event-shop-token-shop-scrollable-section"],["flush-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","event-shop-token-shop-content"],["flush-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","event-shop-token-shop-offers"],["flush-element"],["text","\\n"],["block",["each"],[["get",["categoriesOffers"]]],null,1],["text","      "],["close-element"],["text","\\n    "],["close-element"],["text","\\n  "],["close-element"],["text","\\n"]],"locals":[]}],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, n) => {
        const a = n(1).Ember;
        e.exports = a.HTMLBars.template({
          id: "eLPucwG6",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-event-hub\\\\src\\\\app\\\\templates\\\\components\\\\event-shop-xp.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-event-hub\\\\src\\\\app\\\\styles\\\\components\\\\event-shop-xp.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-event-hub\\\\src\\\\app\\\\components\\\\event-shop-xp.js\\" "],["text","\\n"],["open-element","div",[]],["static-attr","class","event-shop-xp-header-pass-track"],["flush-element"],["text","\\n  "],["append",["unknown",["tra","event_shop_xp_header_pass_track"]],false],["text","\\n"],["close-element"],["text","\\n"],["open-element","div",[]],["static-attr","class","event-shop-xp-vertical-divider"],["flush-element"],["close-element"],["text","\\n"],["open-element","div",[]],["dynamic-attr","class",["concat",["event-shop-xp-level-tooltip ",["helper",["if"],[["get",["rewardTrackXP","isBonusPhase"]],"is-completed"],null]]]],["flush-element"],["text","\\n"],["block",["uikit-tooltip"],null,[["tooltipPosition","type"],["top","system"]],10],["text","  "],["open-element","div",[]],["static-attr","class","event-shop-xp-level"],["flush-element"],["text","\\n"],["block",["if"],[["get",["isGracePeriod"]]],null,5,4],["text","  "],["close-element"],["text","\\n"],["block",["if"],[["get",["isGracePeriod"]]],null,1,0],["close-element"],["text","\\n"],["open-element","div",[]],["static-attr","class","event-shop-xp-vertical-divider"],["flush-element"],["close-element"],["text","\\n"]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","    "],["open-element","div",[]],["dynamic-attr","class",["concat",["event-shop-xp-label-xp-wrapper ",["helper",["if"],[["get",["xpOverflow"]]," xp-overflow"],null]]]],["flush-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","event-shop-xp-label-xp"],["flush-element"],["text","\\n        "],["open-element","span",[]],["static-attr","class","event-shop-xp-label-xp-current"],["flush-element"],["append",["unknown",["rewardTrackXP","currentLevelXP"]],false],["close-element"],["text","\\n         / \\n        "],["open-element","span",[]],["static-attr","class","event-shop-xp-label-xp-total"],["flush-element"],["text"," "],["append",["unknown",["rewardTrackXP","totalLevelXP"]],false],["close-element"],["text","\\n      "],["close-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","event-shop-xp-label-level-xp"],["flush-element"],["append",["unknown",["tra","event_hub_xp_label"]],false],["close-element"],["text","\\n    "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","    "],["open-element","div",[]],["dynamic-attr","class",["concat",["event-shop-xp-label-xp-wrapper ",["helper",["if"],[["get",["hasUnclaimedRewards"]]," unclaimed"],null]]]],["flush-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","event-shop-xp-label-xp"],["flush-element"],["text","\\n        "],["open-element","span",[]],["static-attr","class","event-shop-xp-label-xp-current"],["flush-element"],["append",["unknown",["rewardTrackXP","currentLevel"]],false],["close-element"],["text","\\n      "],["close-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","event-shop-xp-label-level-xp"],["flush-element"],["append",["unknown",["tra","event_shop_reward_description_level_completed"]],false],["close-element"],["text","\\n    "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","      "],["open-element","div",[]],["static-attr","class","event-shop-xp-label-level"],["flush-element"],["text","\\n        "],["append",["unknown",["levelLabel"]],false],["text","\\n      "],["close-element"],["text","\\n    "]],"locals":[]},{"statements":[["text","      "],["open-element","div",[]],["static-attr","class","event-shop-xp-repeat"],["flush-element"],["text","\\n        "],["open-element","svg",[]],["static-attr","class","event-shop-xp-repeat-icon"],["static-attr","viewBox","0 0 10 7"],["flush-element"],["text","\\n          "],["open-element","path",[]],["static-attr","class","event-shop-xp-repeat-icon-path"],["static-attr","fill-rule","evenodd"],["static-attr","clip-rule","evenodd"],["static-attr","d","M6.38908 1.77185V0.399902L3.9833 2.31037L6.38956 4.22084V2.85168C6.81026 2.85942 7.21055 3.02847 7.50237 3.32164C7.79419 3.61481 7.95364 4.00809 7.94565 4.41496C7.93765 4.82183 7.76286 5.20897 7.45972 5.4912C7.15659 5.77343 6.74995 5.92765 6.32925 5.91991H3.33337C2.91248 5.91991 2.50883 5.75821 2.21121 5.47037C1.9136 5.18254 1.7464 4.79215 1.7464 4.3851C1.7464 3.97804 1.9136 3.58765 2.21121 3.29982C2.50883 3.01199 2.91248 2.85028 3.33337 2.85028V1.77045C2.61636 1.77045 1.92872 2.04593 1.42171 2.53627C0.914713 3.02661 0.629883 3.69165 0.629883 4.3851C0.629883 5.07854 0.914713 5.74359 1.42171 6.23393C1.92872 6.72427 2.61636 6.99974 3.33337 6.99974H6.32925C6.68409 7.00357 7.03623 6.93977 7.36557 6.81198C7.69491 6.68419 7.995 6.49492 8.24871 6.25496C8.50242 6.01501 8.70477 5.72907 8.84422 5.41349C8.98367 5.0979 9.05748 4.75884 9.06144 4.41566C9.0654 4.07249 8.99943 3.73192 8.8673 3.4134C8.73517 3.09488 8.53947 2.80465 8.29136 2.55928C8.04325 2.31391 7.7476 2.1182 7.42129 1.98334C7.09498 1.84847 6.7444 1.77708 6.38956 1.77325L6.38908 1.77185Z"],["static-attr","fill","#5b5a56"],["flush-element"],["close-element"],["text","\\n        "],["close-element"],["text","\\n        "],["open-element","span",[]],["static-attr","class","event-shop-xp-iteration"],["flush-element"],["text","\\n          "],["append",["unknown",["rewardTrackXP","iteration"]],false],["text","\\n        "],["close-element"],["text","\\n      "],["close-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","event-shop-xp-vertical-divider"],["flush-element"],["close-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","event-shop-xp-label-level"],["flush-element"],["text","\\n        "],["append",["unknown",["levelLabel"]],false],["text","\\n      "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["block",["if"],[["get",["rewardTrackXP","isBonusPhase"]]],null,3,2]],"locals":[]},{"statements":[["text","      "],["open-element","div",[]],["static-attr","class","event-shop-xp-label-progress-locked"],["flush-element"],["text","\\n        "],["append",["unknown",["tra","event_shop_xp_label_level_progress_locked"]],false],["text","\\n      "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","        "],["open-element","div",[]],["static-attr","class","event-shop-progression-tooltip-block"],["flush-element"],["text","\\n          "],["open-element","h5",[]],["flush-element"],["append",["unknown",["tra","event_shop_xp_label_event_xp"]],false],["close-element"],["text","\\n          "],["open-element","p",[]],["flush-element"],["append",["unknown",["tra","event_shop_xp_tooltip_complete_top"]],false],["open-element","br",[]],["flush-element"],["close-element"],["append",["unknown",["tra","event_shop_xp_tooltip_complete_bottom"]],false],["text","\\n          "],["close-element"],["text","\\n        "],["close-element"],["text","\\n      "]],"locals":[]},{"statements":[["text","        "],["open-element","div",[]],["static-attr","class","event-shop-progression-tooltip-block-repeat"],["flush-element"],["text","\\n          "],["open-element","div",[]],["static-attr","class","event-shop-xp-tooltip-block-description"],["flush-element"],["text","\\n            "],["open-element","h5",[]],["static-attr","class","event-shop-xp-tooltip-block-description-header"],["flush-element"],["text","\\n              "],["append",["unknown",["tra","event_shop_xp_tooltip_looping_description_header"]],false],["text","\\n            "],["close-element"],["text","\\n            "],["open-element","p",[]],["static-attr","class","event-shop-xp-tooltip-block-description-content"],["flush-element"],["text","\\n              "],["append",["helper",["sanitize"],[["get",["tra","event_shop_xp_tooltip_looping_description_content$html"]]],null],false],["text","\\n            "],["close-element"],["text","\\n          "],["close-element"],["text","\\n          "],["open-element","div",[]],["static-attr","class","event-shop-xp-vertical-divider"],["flush-element"],["close-element"],["text","\\n          "],["open-element","div",[]],["static-attr","class","event-shop-progression-tooltip-block-loop"],["flush-element"],["text","\\n            "],["open-element","div",[]],["static-attr","class","event-shop-xp-tooltip-repeat"],["flush-element"],["text","\\n              "],["open-element","svg",[]],["static-attr","class","event-shop-xp-tooltip-repeat-icon"],["static-attr","viewBox","0 0 10 7"],["flush-element"],["text","\\n                "],["open-element","path",[]],["static-attr","class","event-shop-xp-repeat-icon-path"],["static-attr","fill-rule","evenodd"],["static-attr","clip-rule","evenodd"],["static-attr","d","M6.38908 1.77185V0.399902L3.9833 2.31037L6.38956 4.22084V2.85168C6.81026 2.85942 7.21055 3.02847 7.50237 3.32164C7.79419 3.61481 7.95364 4.00809 7.94565 4.41496C7.93765 4.82183 7.76286 5.20897 7.45972 5.4912C7.15659 5.77343 6.74995 5.92765 6.32925 5.91991H3.33337C2.91248 5.91991 2.50883 5.75821 2.21121 5.47037C1.9136 5.18254 1.7464 4.79215 1.7464 4.3851C1.7464 3.97804 1.9136 3.58765 2.21121 3.29982C2.50883 3.01199 2.91248 2.85028 3.33337 2.85028V1.77045C2.61636 1.77045 1.92872 2.04593 1.42171 2.53627C0.914713 3.02661 0.629883 3.69165 0.629883 4.3851C0.629883 5.07854 0.914713 5.74359 1.42171 6.23393C1.92872 6.72427 2.61636 6.99974 3.33337 6.99974H6.32925C6.68409 7.00357 7.03623 6.93977 7.36557 6.81198C7.69491 6.68419 7.995 6.49492 8.24871 6.25496C8.50242 6.01501 8.70477 5.72907 8.84422 5.41349C8.98367 5.0979 9.05748 4.75884 9.06144 4.41566C9.0654 4.07249 8.99943 3.73192 8.8673 3.4134C8.73517 3.09488 8.53947 2.80465 8.29136 2.55928C8.04325 2.31391 7.7476 2.1182 7.42129 1.98334C7.09498 1.84847 6.7444 1.77708 6.38956 1.77325L6.38908 1.77185Z"],["static-attr","fill","#5b5a56"],["flush-element"],["close-element"],["text","\\n              "],["close-element"],["text","\\n              "],["open-element","span",[]],["static-attr","class","event-shop-xp-iteration"],["flush-element"],["text","\\n                "],["append",["unknown",["rewardTrackXP","iteration"]],false],["text","\\n              "],["close-element"],["text","\\n            "],["close-element"],["text","\\n            "],["open-element","p",[]],["flush-element"],["append",["unknown",["tra","event_shop_xp_tooltip_looping_loop_header"]],false],["close-element"],["text","\\n            "],["open-element","div",[]],["static-attr","class","event-shop-xp-horizontal-divider"],["flush-element"],["close-element"],["text","\\n            "],["open-element","p",[]],["flush-element"],["append",["unknown",["completedLoops"]],false],["text"," "],["append",["unknown",["tra","event_shop_xp_tooltip_looping_loop_footer"]],false],["close-element"],["text","\\n          "],["close-element"],["text","\\n        "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["block",["if"],[["get",["rewardTrackXP","isBonusPhase"]]],null,7,6]],"locals":[]},{"statements":[["text","        "],["open-element","div",[]],["static-attr","class","event-shop-progression-tooltip-block"],["flush-element"],["text","\\n          "],["open-element","h5",[]],["flush-element"],["append",["unknown",["tra","event_shop_xp_label_level_progress_locked"]],false],["close-element"],["text","\\n          "],["open-element","p",[]],["flush-element"],["append",["helper",["sanitize"],[["get",["tra","event_shop_xp_tooltip_progress_locked_description"]]],null],false],["close-element"],["text","\\n        "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","    "],["open-element","lol-uikit-content-block",[]],["static-attr","class","event-shop-xp-tooltip-content"],["static-attr","type","tooltip-system"],["flush-element"],["text","\\n"],["block",["if"],[["get",["isGracePeriod"]]],null,9,8],["text","    "],["close-element"],["text","\\n"]],"locals":[]}],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, n) => {
        const a = n(1).Ember;
        e.exports = a.HTMLBars.template({
          id: "MBVjiXkm",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-event-hub\\\\src\\\\app\\\\templates\\\\components\\\\hol-claim-button.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-event-hub\\\\src\\\\app\\\\styles\\\\components\\\\hol-claim-button.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-event-hub\\\\src\\\\app\\\\components\\\\hol-claim-button.js\\" "],["text","\\n"],["open-element","lol-uikit-flat-button",[]],["static-attr","class","idle hol-claim-button-uikit-flat-button"],["dynamic-attr","disabled",["unknown",["claimButtonDisabled"]],null],["modifier",["action"],[["get",[null]],"claimAllRewards"]],["flush-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","hol-claim-button-uikit-flat-button-content"],["flush-element"],["text","\\n"],["block",["if"],[["get",["unclaimedRewards"]]],null,1],["text","    "],["append",["unknown",["tra","event_shop_reward_button_claim_reward"]],false],["text","\\n  "],["close-element"],["text","\\n"],["close-element"],["text","\\n"],["block",["if"],[["get",["shouldShowAnimations"]]],null,0]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","  "],["open-element","div",[]],["static-attr","class","hol-claim-button-animations"],["flush-element"],["text","\\n    "],["open-element","video",[]],["static-attr","class","hol-claim-button-animation-idle"],["static-attr","src","/fe/lol-event-hub/videos/CLAIM_BTN_Claimable-particles-default.webm"],["static-attr","preload",""],["static-attr","autoplay",""],["static-attr","loop",""],["flush-element"],["close-element"],["text","\\n    "],["open-element","video",[]],["static-attr","class","hol-claim-button-animation-hover"],["static-attr","src","/fe/lol-event-hub/videos/CLAIM_BTN_Claimable-particles-hover.webm"],["static-attr","preload",""],["static-attr","autoplay",""],["static-attr","loop",""],["flush-element"],["close-element"],["text","\\n    "],["open-element","video",[]],["static-attr","class","hol-claim-button-animation-active"],["static-attr","src","/fe/lol-event-hub/videos/CLAIM_BTN_Claimable-particles-pressed.webm"],["static-attr","preload",""],["flush-element"],["close-element"],["text","\\n  "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","      "],["open-element","div",[]],["static-attr","class","hol-claim-button-unclaimed-rewards-label"],["flush-element"],["text","\\n        "],["append",["unknown",["unclaimedRewards"]],false],["text","\\n      "],["close-element"],["text","\\n"]],"locals":[]}],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, n) => {
        const a = n(1).Ember;
        e.exports = a.HTMLBars.template({
          id: "fU2vWTPN",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-event-hub\\\\src\\\\app\\\\templates\\\\components\\\\hol-level-icon-flames.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-event-hub\\\\src\\\\app\\\\styles\\\\components\\\\hol-level-icon-flames.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-event-hub\\\\src\\\\app\\\\components\\\\hol-level-icon-flames.js\\" "],["text","\\n"],["open-element","div",[]],["dynamic-attr","class",["concat",["reward-level-icon-flames ",["unknown",["iconCursorClass"]]]]],["flush-element"],["text","\\n"],["block",["if"],[["get",["animationsEnabled"]]],null,1,0],["close-element"],["text","\\n"]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","    "],["open-element","svg",[]],["static-attr","xmlns","http://www.w3.org/2000/svg","http://www.w3.org/2000/xmlns/"],["static-attr","width","32"],["static-attr","height","33"],["static-attr","viewBox","0 0 32 33"],["static-attr","fill","none"],["flush-element"],["text","\\n      "],["open-element","path",[]],["static-attr","d","M25.7129 18.1384C25.6949 18.0782 25.6409 18.0391 25.5809 18.0331C25.518 18.0271 25.461 18.0632 25.434 18.1173C24.9031 19.224 23.6854 19.8404 22.6596 19.9066C23.3075 19.1488 23.5804 17.8677 23.3915 16.3852C23.1545 14.5297 22.0718 11.9796 19.7863 10.9C16.4211 9.31224 15.3354 7.8327 15.3084 4.81648C15.3084 4.75333 15.2664 4.69619 15.2094 4.67514C15.1494 4.65409 15.0835 4.67514 15.0445 4.72325C12.1352 8.2928 12.888 10.04 13.5508 11.5827C13.6918 11.9105 13.8268 12.2232 13.9197 12.542C14.1837 13.4351 14.0037 14.4004 13.4429 15.1312C12.987 15.7236 12.3511 16.0484 11.6973 16.0303C11.2804 16.0153 10.9954 15.889 10.8305 15.6394C10.5066 15.1492 10.6235 14.1568 11.1814 12.6863C11.2054 12.6262 11.1874 12.56 11.1394 12.5179C11.0914 12.4758 11.0224 12.4698 10.9684 12.5029C6.9884 14.7914 6.89242 19.1939 7.03639 20.9802C7.15036 22.4026 8.69199 25.8188 11.7693 27.587C14.3516 29.0725 18.1367 28.6816 19.1085 28.4049C25.0501 26.7179 26.7597 21.4794 25.7099 18.1384H25.7129ZM17.135 21.338C18.5296 21.6748 19.4864 22.6041 19.5704 23.7077C19.6484 24.7271 18.9795 25.6263 17.7828 26.1135C16.4631 26.6517 13.7248 26.1074 12.3091 24.6279C11.6523 23.9423 11.3494 23.1484 11.4063 22.2703C11.5053 20.7486 12.657 19.0646 14.8345 17.2573C14.6006 18.9263 14.5016 20.7035 17.138 21.338H17.135Z"],["dynamic-attr","fill",["concat",["url(#paint0_linear_4086_42312",["unknown",["itemIndex"]],")"]]],["flush-element"],["close-element"],["text","\\n      "],["open-element","defs",[]],["flush-element"],["text","\\n        "],["open-element","linearGradient",[]],["dynamic-attr","id",["concat",["paint0_linear_4086_42312",["unknown",["itemIndex"]]]]],["static-attr","x1","16.5"],["static-attr","y1","28.667"],["static-attr","x2","16.5"],["static-attr","y2","4.66699"],["static-attr","gradientUnits","userSpaceOnUse"],["flush-element"],["text","\\n          "],["open-element","stop",[]],["dynamic-attr","class",["concat",["reward-level-icon-flames-gradient-start reward-level-flames-state-",["unknown",["stateClass"]]," ",["unknown",["levelClass"]]]]],["flush-element"],["close-element"],["text","\\n          "],["open-element","stop",[]],["static-attr","offset","1"],["dynamic-attr","class",["concat",["reward-level-icon-flames-gradient-finish reward-level-flames-state-",["unknown",["stateClass"]]," ",["unknown",["levelClass"]]]]],["flush-element"],["close-element"],["text","\\n        "],["close-element"],["text","\\n      "],["close-element"],["text","\\n    "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","    "],["open-element","div",[]],["static-attr","class","reward-level-icon-flames-animations"],["flush-element"],["text","\\n      "],["open-element","video",[]],["static-attr","class","reward-level-icon-flames-animation reward-level-icon-flames-animation-idle"],["dynamic-attr","src",["unknown",["animationIdleSrc"]],null],["static-attr","loop",""],["static-attr","autoplay",""],["static-attr","muted",""],["flush-element"],["close-element"],["text","\\n      "],["open-element","video",[]],["static-attr","class","reward-level-icon-flames-animation reward-level-icon-flames-animation-hover"],["dynamic-attr","src",["unknown",["animationHoverSrc"]],null],["static-attr","loop",""],["static-attr","autoplay",""],["static-attr","muted",""],["flush-element"],["close-element"],["text","\\n      "],["open-element","video",[]],["static-attr","class","reward-level-icon-flames-animation reward-level-icon-flames-animation-click"],["dynamic-attr","src",["unknown",["animationClickSrc"]],null],["static-attr","loop",""],["static-attr","autoplay",""],["static-attr","muted",""],["flush-element"],["close-element"],["text","\\n    "],["close-element"],["text","\\n"]],"locals":[]}],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, n) => {
        const a = n(1).Ember;
        e.exports = a.HTMLBars.template({
          id: "kRGeIJJ1",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-event-hub\\\\src\\\\app\\\\templates\\\\components\\\\hol-narrative.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-event-hub\\\\src\\\\app\\\\styles\\\\components\\\\hol-narrative.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-event-hub\\\\src\\\\app\\\\components\\\\hol-narrative.js\\" "],["text","\\n"],["open-element","div",[]],["static-attr","class","hol-narrative-title"],["flush-element"],["append",["unknown",["narrativeTitle"]],false],["close-element"],["text","\\n\\n"],["open-element","lol-uikit-scrollable",[]],["static-attr","class","hol-narrative-description"],["dynamic-attr","overflow-masks",["helper",["if"],[["get",["descriptionTextElementAdditionalClass"]],"enabled","disabled"],null],null],["flush-element"],["text","\\n  "],["open-element","div",[]],["static-attr","id","hol-narrative-description-text"],["dynamic-attr","class",["concat",["hol-narrative-description-text ",["unknown",["descriptionTextElementAdditionalClass"]]]]],["flush-element"],["text","\\n    "],["append",["unknown",["narrativeDescription"]],false],["text","\\n  "],["close-element"],["text","\\n"],["close-element"],["text","\\n\\n"],["block",["if"],[["get",["showPlayNarrativeVideoButton"]]],null,0]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","  "],["open-element","lol-uikit-flat-button",[]],["static-attr","class","hol-narrative-video-button"],["dynamic-attr","onclick",["helper",["action"],[["get",[null]],"playNarrativeButtonClick"],null],null],["dynamic-attr","disabled",["unknown",["playButtonDisabled"]],null],["flush-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","hol-narrative-video-button-content"],["flush-element"],["text","\\n      "],["append",["unknown",["playNarrativeButtonLabel"]],false],["text","\\n    "],["close-element"],["text","\\n  "],["close-element"],["text","\\n"]],"locals":[]}],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, n) => {
        const a = n(1).Ember;
        e.exports = a.HTMLBars.template({
          id: "cLlNYjff",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-event-hub\\\\src\\\\app\\\\templates\\\\components\\\\hol-promotion-banner.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-event-hub\\\\src\\\\app\\\\styles\\\\components\\\\hol-promotion-banner.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-event-hub\\\\src\\\\app\\\\components\\\\hol-promotion-banner.js\\" "],["text","\\n"],["block",["if"],[["get",["showBanner"]]],null,0]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","    "],["open-element","img",[]],["static-attr","class","hol-promotion-banner-img"],["dynamic-attr","onclick",["helper",["action"],[["get",[null]],"bannerClick"],null],null],["dynamic-attr","src",["unknown",["promotionBannerImgSrc"]],null],["flush-element"],["close-element"],["text","\\n"]],"locals":[]}],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, n) => {
        const a = n(1).Ember;
        e.exports = a.HTMLBars.template({
          id: "nAgKtgi2",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-event-hub\\\\src\\\\app\\\\templates\\\\components\\\\hol-reward-details.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-event-hub\\\\src\\\\app\\\\styles\\\\components\\\\hol-reward-details.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-event-hub\\\\src\\\\app\\\\components\\\\hol-reward-details.js\\" "],["text","\\n"],["open-element","div",[]],["static-attr","class","hol-reward-details-level"],["flush-element"],["text","\\n  "],["append",["unknown",["level"]],false],["text","\\n"],["close-element"],["text","\\n"],["open-element","div",[]],["static-attr","class","hol-reward-details-title"],["flush-element"],["text","\\n  "],["append",["unknown",["title"]],false],["text","\\n"],["close-element"],["text","\\n"],["open-element","lol-uikit-scrollable",[]],["static-attr","class","hol-reward-details-description"],["flush-element"],["text","\\n  "],["append",["unknown",["description"]],false],["text","\\n"],["close-element"],["text","\\n"],["block",["if"],[["get",["showReplayButton"]]],null,0]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","  "],["open-element","lol-uikit-flat-button",[]],["static-attr","class","idle hol-reward-details-replay-button"],["dynamic-attr","onclick",["helper",["action"],[["get",[null]],"replayButtonClick"],null],null],["dynamic-attr","disabled",["unknown",["isReplayButtonDisabled"]],null],["flush-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","hol-reward-details-replay-button-content"],["flush-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","hol-reward-details-replay-button-icon"],["flush-element"],["text","\\n        "],["open-element","svg",[]],["static-attr","xmlns","http://www.w3.org/2000/svg","http://www.w3.org/2000/xmlns/"],["static-attr","width","16"],["static-attr","height","16"],["static-attr","viewBox","0 0 16 16"],["static-attr","fill","none"],["flush-element"],["text","\\n          "],["open-element","path",[]],["static-attr","d","M13.4308 8.88263C13.4202 8.84654 13.3884 8.82309 13.353 8.81948C13.3159 8.81587 13.2823 8.83752 13.2664 8.87C12.9534 9.53399 12.2356 9.90387 11.631 9.94357C12.0129 9.48888 12.1737 8.72024 12.0624 7.83071C11.9227 6.71745 11.2844 5.18738 9.93723 4.53963C7.95354 3.58695 7.31352 2.69923 7.29761 0.889495C7.29761 0.851605 7.27286 0.817323 7.23927 0.804692C7.20391 0.792062 7.16501 0.804692 7.14203 0.833561C5.42707 2.97529 5.87084 4.0236 6.26156 4.94921C6.34466 5.14588 6.42422 5.33353 6.47903 5.52479C6.63461 6.06067 6.52853 6.63986 6.19792 7.07831C5.92918 7.43376 5.55436 7.62863 5.16894 7.6178C4.92319 7.60878 4.75523 7.533 4.65799 7.38324C4.46705 7.08914 4.536 6.49371 4.86485 5.6114C4.87899 5.57531 4.86838 5.53562 4.84009 5.51036C4.81181 5.4851 4.77114 5.48149 4.73932 5.50134C2.39318 6.87442 2.33661 9.51595 2.42147 10.5877C2.48866 11.4412 3.39741 13.4909 5.21137 14.5518C6.73362 15.4431 8.96483 15.2086 9.53766 15.0426C13.0401 14.0304 14.0478 10.8872 13.429 8.88263H13.4308ZM8.37432 10.8024C9.19644 11.0045 9.76043 11.562 9.80994 12.2242C9.8559 12.8359 9.46164 13.3754 8.75621 13.6677C7.97829 13.9907 6.36411 13.6641 5.52961 12.7763C5.14242 12.365 4.96385 11.8886 4.99745 11.3618C5.05579 10.4488 5.7347 9.43836 7.01827 8.35396C6.88036 9.35536 6.82202 10.4217 8.37609 10.8024H8.37432Z"],["static-attr","fill","#CDBE91"],["flush-element"],["close-element"],["text","\\n        "],["close-element"],["text","\\n      "],["close-element"],["text","\\n      "],["append",["unknown",["tra","hol_cutscene_button_label"]],false],["text","\\n    "],["close-element"],["text","\\n  "],["close-element"],["text","\\n"]],"locals":[]}],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, n) => {
        const a = n(1).Ember;
        e.exports = a.HTMLBars.template({
          id: "yqD9I+m4",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-event-hub\\\\src\\\\app\\\\templates\\\\components\\\\hol-xp.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-event-hub\\\\src\\\\app\\\\styles\\\\components\\\\hol-xp.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-event-hub\\\\src\\\\app\\\\components\\\\hol-xp.js\\" "],["text","\\n"],["block",["if"],[["get",["isGracePeriod"]]],null,3],["open-element","div",[]],["static-attr","class","hol-xp-radial"],["flush-element"],["text","\\n  "],["open-element","lol-uikit-radial-progress",[]],["static-attr","class","hol-xp-radial-component"],["static-attr","start-angle","270"],["static-attr","end-angle","-90"],["static-attr","type","custom"],["flush-element"],["text","\\n    "],["open-element","div",[]],["static-attr","slot","bottom"],["static-attr","class","bottom"],["flush-element"],["text","\\n        "],["open-element","div",[]],["static-attr","class","hol-xp-radial-component-outer-ring"],["flush-element"],["close-element"],["text","\\n    "],["close-element"],["text","\\n    "],["open-element","div",[]],["static-attr","slot","middle"],["static-attr","class","middle"],["dynamic-attr","percent",["unknown",["radialPercentage"]],null],["flush-element"],["close-element"],["text","\\n    "],["open-element","div",[]],["static-attr","slot","middle"],["static-attr","class","middle hol-xp-radial-component-remaining-xp"],["dynamic-attr","percent",["unknown",["remainingPercentage"]],null],["flush-element"],["close-element"],["text","\\n    "],["open-element","div",[]],["static-attr","slot","top"],["static-attr","class","top"],["flush-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","hol-xp-radial-component-label"],["flush-element"],["append",["unknown",["rewardTrackProgress","level"]],false],["close-element"],["text","\\n    "],["close-element"],["text","\\n  "],["close-element"],["text","\\n"],["close-element"],["text","\\n"],["open-element","div",[]],["static-attr","class","hol-xp-text-wrapper"],["flush-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","hol-xp-level-progress"],["flush-element"],["text","\\n"],["block",["if"],[["get",["showXpText"]]],null,1,0],["text","  "],["close-element"],["text","\\n"],["close-element"]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","      "],["append",["unknown",["tra","event_hub_pass_complete"]],false],["text","\\n"]],"locals":[]},{"statements":[["text","      "],["append",["unknown",["rewardTrackProgress","currentLevelXP"]],false],["text"," / "],["append",["unknown",["rewardTrackProgress","totalLevelXP"]],false],["text","\\n      "],["open-element","span",[]],["static-attr","class","hol-xp-label"],["flush-element"],["append",["unknown",["tra","event_hub_xp_label"]],false],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","    "],["open-element","lol-uikit-content-block",[]],["static-attr","type","tooltip-system"],["flush-element"],["text","\\n        "],["open-element","div",[]],["static-attr","class","hol-xp-grace-period-tooltip-container"],["flush-element"],["text","\\n          "],["open-element","h5",[]],["flush-element"],["append",["unknown",["tra","hol_xp_label_level_progress_locked"]],false],["close-element"],["text","\\n          "],["open-element","p",[]],["flush-element"],["append",["helper",["sanitize"],[["get",["tra","hol_shop_xp_tooltip_progress_locked_description"]]],null],false],["close-element"],["text","\\n        "],["close-element"],["text","\\n    "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["block",["uikit-tooltip"],null,[["tooltipPosition","type"],["top","system"]],2]],"locals":[]}],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        t.default = class {
          constructor(e) {
            this.privateAPI = e;
          }
          show(e) {
            this.privateAPI.show(e);
          }
          hide() {
            this.privateAPI.hide();
          }
        };
      },
    ],
    t = {};
  function n(a) {
    var l = t[a];
    if (void 0 !== l) return l.exports;
    var s = (t[a] = { exports: {} });
    return e[a](s, s.exports, n), s.exports;
  }
  (n.g = (function () {
    if ("object" == typeof globalThis) return globalThis;
    try {
      return this || new Function("return this")();
    } catch (e) {
      if ("object" == typeof window) return window;
    }
  })()),
    (n.r = (e) => {
      "undefined" != typeof Symbol &&
        Symbol.toStringTag &&
        Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }),
        Object.defineProperty(e, "__esModule", { value: !0 });
    }),
    (() => {
      "use strict";
      var e,
        t = (e = n(1)) && e.__esModule ? e : { default: e };
      const a = "rcp-fe-lol-event-hub",
        l = window.testsSandboxDoc || document.currentScript.ownerDocument;
      const s = window.getPluginAnnounceEventName(a);
      l.addEventListener(
        s,
        function (e) {
          (0, e.registrationHandler)((e) =>
            t.default
              .init(e, {
                ComponentFactory: (e) =>
                  e.get("rcp-fe-common-libs").getComponentFactory(),
                Telemetry: (e) => e.get("rcp-fe-common-libs").getTelemetry(),
                dataBinding: (e) =>
                  e.get("rcp-fe-common-libs").getDataBinding(a),
                EmberAddons: (e) =>
                  e.get("rcp-fe-ember-libs").getSharedEmberAddons(),
                Ember: (e) => e.get("rcp-fe-ember-libs").getEmber(),
                emberL10n: (e) => e.get("rcp-fe-ember-libs").getEmberL10n(),
                FullPageModalManager: (e) =>
                  e
                    .get("rcp-fe-lol-shared-components")
                    .getApi_fullPageModalManager(),
                logger: (e) => e.get("rcp-fe-common-libs").logging.create(a),
                UIKit: (e) => e.get("rcp-fe-lol-uikit"),
                AudioPlugin: (e) => e.get("rcp-fe-audio"),
                Navigation: (e) => e.get("rcp-fe-lol-navigation"),
                RewardTrackerEmberComponents: (e) =>
                  e
                    .get("rcp-fe-lol-shared-components")
                    .getRewardTrackerEmberComponents(),
                MultiPurchaseSliderEmberComponents: (e) =>
                  e
                    .get("rcp-fe-lol-shared-components")
                    .getMultiPurchaseSliderEmberComponents(),
                Router: (e) =>
                  e.get("rcp-fe-lol-shared-components").getApi_Router(),
                SharedComponents: (e) =>
                  e
                    .get("rcp-fe-lol-shared-components")
                    .getSharedEmberComponents(),
                Payments: (e) =>
                  e.get("rcp-fe-lol-shared-components").getApi_Payments(),
                socket: (e) => e.getSocket(),
                Viewport: (e) =>
                  e.get("rcp-fe-lol-shared-components").getApi_Viewport(),
              })
              .then(() => {
                const n = e
                    .get("rcp-fe-lol-l10n")
                    .tra()
                    .overlay("/fe/lol-l10n/trans.json")
                    .overlay("/fe/lol-loot/trans.json")
                    .overlay("/fe/lol-event-hub/trans.json"),
                  a = t.default.emberL10n(t.default.Ember, n),
                  l = t.default.Ember.Object.create({ isVisible: !1 });
                return t.default.add({
                  emberApplicationFactory: e
                    .get("rcp-fe-ember-libs")
                    .getEmberApplicationFactory(),
                  externalModel: l,
                  tra: n,
                  traService: a,
                });
              })
              .then(() => (0, n(2).default)()),
          );
        },
        { once: !0 },
      );
    })();
})();
