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
                const s = e[a],
                  l = n._getValue(a, s);
                l && l.then
                  ? (l.then(function (e) {
                      e ||
                        console.warn(
                          "The promise for the key " +
                            a +
                            " resolved with a falsy value: ",
                          e,
                        ),
                        n._addValue(a, e);
                    }),
                    t.push(l))
                  : n._addValue(a, l);
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
          (t.default = void 0);
        var a,
          s = (a = n(1)) && a.__esModule ? a : { default: a },
          l = n(3);
        function o(e, t) {
          return "number" != typeof e.itemId ||
            "string" != typeof e.inventoryType
            ? (s.default.logger.error(
                "Purchase Anywhere Widget expects a number itemId and string inventoryType",
              ),
              !1)
            : "string" == typeof t ||
                (s.default.logger.error(
                  "Purchase Anywhere Widget expects a source to indicate who is the caller",
                ),
                !1);
        }
        function i(e, t, n) {
          if (!e)
            return (
              s.default.logger.error("Create Paw Template expects a offer id."),
              !1
            );
          if (!n)
            return (
              s.default.logger.error("Create Paw Template expects a source."),
              !1
            );
          if (!t)
            return (
              s.default.logger.error("Create Paw Template expects a template."),
              !1
            );
          if (!t.templateType)
            return (
              s.default.logger.error(
                "Create Paw Template expects a template to contain a template type",
              ),
              !1
            );
          if (t.components)
            for (let e = 0; e < t.components.length; e++)
              if (
                t.components[e].componentType ===
                  l.PAW.COMPONENT_TYPES.PURCHASE &&
                t.components[e].currencyType === l.PAW.CURRENCY_TYPES.IP
              )
                return (
                  s.default.logger.error(
                    "Create Paw Template does not support currency type IP, this is deprecated, use BE",
                  ),
                  !1
                );
          return !0;
        }
        t.default = class {
          constructor(e) {
            this.privateAPI = e;
          }
          createPAWChoiceModal(e, t, n, a = null, s = null, l = null) {
            if (
              (function (e, t) {
                let n = !0;
                const a = e.length;
                for (let s = 0; s < a; ++s) n = n && o(e[s], t);
                return n;
              })(e, t)
            ) {
              const { privateAPI: n } = this;
              if (n.createPAWChoiceModal(e, t, a, s))
                return (n.onClosed = l), !0;
            }
            return !1;
          }
          createPAWModal(e, t, n, a = null, s = null, l = null) {
            if (o(e, t)) {
              const { privateAPI: n } = this;
              if (n.createPAWModal(e, t, a, s)) return (n.onClosed = l), !0;
            }
            return !1;
          }
          closePawModal = () => this.privateAPI.removePAWModalBinded();
          createPawTemplateModal(e, t, n, a) {
            return (
              !!i(e, t, n) &&
              this.privateAPI.createPawTemplateModal(e, t, n, a, !1)
            );
          }
          createPawTemplateModalAsync(e, t, n, a) {
            return (
              !!i(e, t, n) &&
              this.privateAPI.createPawTemplateModal(e, t, n, a, !0)
            );
          }
          populatePawTemplateModal(e) {
            return (
              !!(function (e) {
                return e
                  ? !!e.templateType ||
                      (s.default.logger.error(
                        "Populate Paw Template expects a template to contain a template type",
                      ),
                      !1)
                  : (s.default.logger.error(
                      "Populate Paw Template expects a template.",
                    ),
                    !1);
              })(e) && this.privateAPI.populatePawTemplateModal(e)
            );
          }
          getBaseSkinLineData(e) {
            return (function (e) {
              return (
                !!e ||
                (s.default.logger.error("Get Template Data expects offer id."),
                !1)
              );
            })(e)
              ? this.privateAPI.getBaseSkinLineData(e)
              : Promise.reject("failed parameter sanitization");
          }
        };
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
              return c.default;
            },
          }),
          Object.defineProperty(t, "QUEUES", {
            enumerable: !0,
            get: function () {
              return s.default;
            },
          }),
          Object.defineProperty(t, "REWARD_TRACKER", {
            enumerable: !0,
            get: function () {
              return l.default;
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
              return o.default;
            },
          }),
          Object.defineProperty(t, "TIME", {
            enumerable: !0,
            get: function () {
              return r.default;
            },
          });
        var a = p(n(4)),
          s = p(n(15)),
          l = p(n(16)),
          o = p(n(17)),
          i = p(n(18)),
          c = p(n(19)),
          r = p(n(20));
        function p(e) {
          return e && e.__esModule ? e : { default: e };
        }
      },
      (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        var a = d(n(5)),
          s = d(n(6)),
          l = d(n(7)),
          o = d(n(8)),
          i = d(n(9)),
          c = d(n(10)),
          r = d(n(11)),
          p = d(n(12)),
          m = d(n(13)),
          u = d(n(14));
        function d(e) {
          return e && e.__esModule ? e : { default: e };
        }
        var h = {
          COMPONENT_TYPES: a.default,
          CURRENCY_TYPES: s.default,
          INVENTORY_TYPES: l.default,
          MEDIA_TYPES: o.default,
          MEDIA_LOAD_TYPES: i.default,
          MODAL_TYPES: c.default,
          OFFER_PURCHASE_STATES: r.default,
          OFFER_VALIDATION_STATES: p.default,
          SCROLL_LIST_DISPLAY_TYPES: m.default,
          TEMPLATE_TYPES: u.default,
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
          s = "RANKED_FLEX_TT",
          l = "CHERRY",
          o = "RANKED_TFT",
          i = "RANKED_TFT_DOUBLE_UP",
          c = "RANKED_TFT_TURBO",
          r = "RANKED_TFT_PAIRS",
          p = [n, a],
          m = [...p, s],
          u = [l],
          d = [o, i],
          h = [c, r],
          g = [...d, ...h],
          _ = [...m, ...d],
          f = [...h, ...u];
        var w = {
          RANKED_SOLO_5x5_QUEUE_TYPE: n,
          RANKED_FLEX_SR_QUEUE_TYPE: a,
          RANKED_FLEX_TT_QUEUE_TYPE: s,
          RANKED_CHERRY_QUEUE_TYPE: l,
          RANKED_TFT_QUEUE_TYPE: o,
          RANKED_TFT_DOUBLE_UP_QUEUE_TYPE: i,
          RANKED_TFT_TURBO_QUEUE_TYPE: c,
          RANKED_TFT_PAIRS_QUEUE_TYPE: r,
          RANKED_LOL_QUEUE_TYPES: m,
          RANKED_SR_QUEUE_TYPES: p,
          RANKED_TFT_QUEUE_TYPES: d,
          RATED_TFT_QUEUE_TYPES: h,
          RANKED_AND_RATED_TFT_QUEUE_TYPES: g,
          ALL_RANKED_QUEUE_TYPES: _,
          ALL_RATED_QUEUE_TYPES: f,
          ALL_RANKED_AND_RATED_QUEUE_TYPES: [..._, ...f],
        };
        t.default = w;
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
        var s = {
          ProfilePrivacyEnabledState: n,
          ProfilePrivacySetting: a,
          DEFAULT_PROFILE_PRIVACY: {
            enabledState: n.UNKNOWN,
            setting: a.PUBLIC,
          },
        };
        t.default = s;
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
          s = 864e5,
          l = 6048e5,
          o = {
            MILLISECONDS_IN_A_SECOND: 1e3,
            MILLISECONDS_IN_A_MINUTE: 6e4,
            MILLISECONDS_IN_A_HOUR: a,
            MILLISECONDS_IN_A_DAY: s,
            MILLISECONDS_IN_A_WEEK: l,
            MILLISECONDS_IN_A_YEAR: 314496e5,
          };
        t.TIME_CONVERSIONS = o;
        var i = { TIME_UNITS: n, TIME_CONVERSIONS: o };
        t.default = i;
      },
      (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        var a = n(1);
        let s;
        class l {
          constructor() {
            (this.receiveConfiguration = this.receiveConfiguration.bind(this)),
              (this.privateAPI = a.privateAPI),
              (this.pawBinding = (0, a.dataBinding)(
                "/lol-purchase-widget",
                (0, a.getProvider)().getSocket(),
              )),
              this.pawBinding.observe(
                "/v1/configuration",
                this,
                this.receiveConfiguration,
              );
          }
          receiveConfiguration(e = {}) {
            const { enabled: t } = e;
            return t ? this.privateAPI.enable() : this.privateAPI.disable();
          }
        }
        var o = {
          init: function () {
            return s || (s = new l());
          },
        };
        t.default = o;
      },
      (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        var a,
          s = n(1),
          l = (a = n(23)) && a.__esModule ? a : { default: a };
        let o;
        class i {
          constructor() {
            (this.handleGameFlowUpdate = this.handleGameFlowUpdate.bind(this)),
              (this.privateAPI = s.privateAPI),
              (this.gameFlowBinding = (0, s.dataBinding)(
                "/lol-gameflow",
                (0, s.getProvider)().getSocket(),
              )),
              this.gameFlowBinding.observe(
                "/v1/session",
                this,
                this.handleGameFlowUpdate,
              );
          }
          handleGameFlowUpdate(e) {
            if (!e) return;
            const { phase: t } = e;
            t &&
              ((t !== l.default.READY_CHECK && t !== l.default.GAME_START) ||
                this.privateAPI.removePAWModal());
          }
        }
        var c = {
          init: function () {
            return o || (o = new i());
          },
        };
        t.default = c;
      },
      (e, t) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        t.default = {
          NONE: "NONE",
          LOBBY: "Lobby",
          MATCHMAKING: "Matchmaking",
          READY_CHECK: "ReadyCheck",
          CHAMP_SELECT: "ChampSelect",
          GAME_START: "GameStart",
          FAILED_TO_LAUNCH: "FailedToLaunch",
          IN_PROGRESS: "InProgress",
          RECONNECT: "Reconnect",
          WAITING_FOR_STATS: "WaitingForStats",
          END_OF_GAME: "EndOfGame",
        };
      },
      (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        var a = n(1),
          s = w(n(25)),
          l = n(26),
          o = n(27),
          i = w(n(28)),
          c = w(n(31)),
          r = w(n(34)),
          p = w(n(37)),
          m = w(n(40)),
          u = w(n(43)),
          d = w(n(46)),
          h = w(n(49)),
          g = w(n(52)),
          _ = w(n(55)),
          f = w(n(58));
        function w(e) {
          return e && e.__esModule ? e : { default: e };
        }
        t.default = class {
          constructor() {
            (this.bindings = {
              champions: (0, a.dataBinding)(
                "/lol-champions",
                (0, a.getProvider)().getSocket(),
              ),
              login: (0, a.dataBinding)(
                "/lol-login",
                (0, a.getProvider)().getSocket(),
              ),
              paw: (0, a.dataBinding)(
                "/lol-purchase-widget",
                (0, a.getProvider)().getSocket(),
              ),
              store: (0, a.dataBinding)(
                "/lol-store",
                (0, a.getProvider)().getSocket(),
              ),
            }),
              (this.tra = this.traService()),
              this.setUpComponents(this.tra),
              (this.createPAWModal = this.createPAWModal.bind(this)),
              (this.removePAWModalBinded = this.closePAWModal.bind(this)),
              (this.enabled = !0),
              (this.pawModal = null);
          }
          get isEnabled() {
            return this.enabled;
          }
          traService() {
            const e = (0, a.getProvider)()
              .get("rcp-fe-lol-l10n")
              .tra()
              .overlay("/fe/lol-l10n/trans.json")
              .overlay("/fe/lol-paw/trans.json")
              .overlay("/fe/ember-libs/trans-loot-table.json");
            return (0, s.default)(a.Ember, e);
          }
          showPAWModal(e, t, n) {
            return (
              a.Telemetry.sendCustomData(l.TELEMETRY_EVENT_NAME, n),
              (t = {
                items: null,
                itemId: null,
                inventoryType: null,
                pawTemplateData: null,
                ...t,
              }),
              (this.pawModal = a.modalManager.add({
                type: "rcp-fe-lol-paw",
                owner: e,
                data: t,
                dismissOnBackdrop: !0,
                ComponentFactory: a.componentFactory,
              })),
              this.pawModal.domNode.addEventListener(
                o.PAW_MODAL_CLOSE_EVENT_NAME,
                this.removePAWModalBinded,
              ),
              !0
            );
          }
          createPAWChoiceModal(e, t, n = null, a = null) {
            if (!this.enabled || this.pawModal) return !1;
            t && (this.source = t);
            const s = { source: t, onPurchased: a, items: e },
              o = {
                id: l.TELEMETRY_EVENT_ID.CREATE_PAW_WINDOW,
                itemIds: e.itemIds,
                inventoryType: e.inventoryType,
                source: t,
              };
            return this.showPAWModal(n, s, o);
          }
          createPAWModal(e, t, n = null, a = null) {
            if (!this.enabled || this.pawModal) return !1;
            t && (this.source = t);
            const s = Object.assign({ source: t, onPurchased: a }, e),
              o = {
                id: l.TELEMETRY_EVENT_ID.CREATE_PAW_WINDOW,
                itemIds: e.itemId,
                inventoryType: e.inventoryType,
                source: t,
              };
            return this.showPAWModal(n, s, o);
          }
          closePAWModal() {
            this.removePAWModal();
          }
          getSource() {
            return this.source;
          }
          removePAWModal() {
            this.pawModal &&
              (this.onClosed && this.onClosed(),
              this.pawModal.domNode.removeEventListener(
                o.PAW_MODAL_CLOSE_EVENT_NAME,
                this.removePAWModalBinded,
              ),
              a.modalManager.remove(this.pawModal),
              (this.onClosed = null),
              this.pawModal.componentPromise.then((e) =>
                a.Ember.run(() => {
                  e && e.app && e.app.destroy();
                }),
              ),
              (this.pawModal = null),
              (this.source = null),
              a.Telemetry.sendCustomData(l.TELEMETRY_EVENT_NAME, {
                id: l.TELEMETRY_EVENT_ID.CLOSE_PAW_WINDOW,
              }));
          }
          createErrorModal(e) {
            a.modalManager.add({
              type: "DialogAlert",
              show: !0,
              data: Object.assign(
                { okText: this.tra.get("cat_paw_error_ok_button") },
                e,
              ),
            });
          }
          setUpComponents(e) {
            a.emberApplicationFactory.setFactoryDefinition({
              name: "rcp-fe-lol-paw",
              tra: e,
              ComponentFactory: a.componentFactory,
              PawRootComponent: n(59),
              TopBannerComponent: n(65),
              ItemDetailsComponent: n(68),
              PurchaseOptionsComponent: n(71),
              PurchaseWarningsComponent: n(74),
              ItemSplashComponent: n(77),
              OverlayImageComponent: n(80),
              ContentDescriptionComponent: n(83),
              DependencyDetailsComponent: n(85),
              PriceDetailsComponent: n(88),
              PriceButtonComponent: n(91),
              DisclaimerCheckboxComponent: n(94),
              ItemUnlockedComponent: n(97),
              CelebrationVideoComponent: n(100),
              PawChoiceComponent: n(102),
              ItemChoiceComponent: n(105),
              ItemChoiceDetailsComponent: n(110),
              ItemChoiceDetailFullComponent: n(113),
              BundleRootComponent: n(116),
              BundleTitleComponent: n(119),
              BundleDescriptionComponent: n(122),
              BundleItemsComponent: n(125),
              BundlePriceComponent: n(128),
              BundlePurchaseComponent: n(131),
              ChromaBundleDetailsComponent: n(134),
              ChromaBundleOverlayImageComponent: n(136),
              ChromaButtonComponent: n(139),
              ChromaBundleContentItemsComponent: n(142),
              PurchaseWidgetService: n(143),
              PawTemplateService: i.default,
              PawTemplateLargeTwoColumnLandscapeTemplateComponent: c.default,
              PawTemplateImageCarouselComponent: r.default,
              PawTemplateMediaComponent: p.default,
              PawTemplatePurchaseComponent: m.default,
              PawTemplateScrollListComponent: u.default,
              PawTemplateTextComponent: d.default,
              PawTemplateTitleSubtitleComponent: h.default,
              PawTemplateVerticalListComponent: g.default,
              PawTemplateWindowComponent: _.default,
            }),
              a.emberApplicationFactory.setFactoryDefinition({
                name: "PAWRPTopUpModalComponent",
                tra: e,
                ComponentFactory: a.componentFactory,
                PAWRPTopUpModalComponent: n(144),
              });
          }
          enable() {
            this.enabled = !0;
          }
          disable() {
            (this.enabled = !1), this.removePAWModal();
          }
          createPawTemplateModal(e, t, n, a, s) {
            if (this.pawModal) return !1;
            if (!this.enabled) return !1;
            n && (this.source = n);
            const o = { id: l.TELEMETRY_EVENT_ID.CREATE_PAW_WINDOW, source: n },
              i = {
                pawTemplateData: {
                  offerId: e,
                  template: t,
                  source: n,
                  async: s,
                  service: null,
                },
              };
            return (this.onClosed = a), this.showPAWModal(null, i, o);
          }
          populatePawTemplateModal(e) {
            return this.pawModal
              ? !!this.enabled &&
                  (this.pawModal.data.pawTemplateData
                    ? (this.pawModal.data.pawTemplateData.service.populateModal(
                        e,
                      ),
                      !0)
                    : (a.logger.error(
                        "Cannot update template data on a non PAW Template presentation",
                      ),
                      !1))
              : (a.logger.error(
                  "Cannot update template data no PAW Template modal created",
                ),
                !1);
          }
          getBaseSkinLineData(e) {
            return new Promise((t, n) => {
              this.bindings.paw
                .get(o.BASE_SKIN_LINE_DATA_URL + "/" + e)
                .then((a) => {
                  a
                    ? t((0, f.default)(a, this.tra))
                    : n(`offer id ${e} not found`);
                })
                .catch((e) => {
                  n(e);
                });
            });
          }
        };
      },
      (e) => {
        "use strict";
        function t(e) {
          const n = {};
          for (const a in e)
            "object" == typeof e[a] ? (n[a] = t(e[a])) : (n[a] = e[a]);
          return n;
        }
        function n(e, t, n) {
          const { regions: a, region: s, locale: l } = e.metadata();
          if ((n = n.get("metadata." + t)) && "region" === t && n.id !== s.id) {
            const t = a[n.id],
              s = t.defaultLocale
                ? t.defaultLocale.id
                : t.availableLocales[0].id;
            e.setLocale(s, n.id);
          } else n && "locale" === t && n.id !== l.id && e.setLocale(n.id);
        }
        e.exports = function (e, a, s) {
          let l;
          const o = { metadata: !0, moment: !0 };
          return (
            (a = a.observe(() => {
              if (l) {
                const e = t(a.metadata());
                l.set("metadata", e),
                  l.beginPropertyChanges(),
                  Object.keys(o).forEach((e) => {
                    l.propertyWillChange(e), l.propertyDidChange(e);
                  }),
                  l.endPropertyChanges();
              }
            })),
            (l = e.Service.extend({
              _tra: null,
              init() {
                this.wrapTra(a);
              },
              wrapTra(e) {
                e &&
                  ((this._tra = e),
                  this.set("metadata", t(this._tra.metadata())),
                  (this.setLocale = this._tra.setLocale.bind(this._tra)),
                  (this.formatString = this._tra.formatString.bind(this._tra)),
                  (this.moment = this._tra.moment.bind(this._tra)),
                  (this.ready = this._tra.ready.bind(this._tra)),
                  (this.exists = this._tra.exists.bind(this._tra)),
                  (this.getAsync = this._tra.getAsync.bind(this._tra)),
                  (this.existsAsync = this._tra.existsAsync.bind(this._tra)),
                  (this.numeral = this._tra.numeral.bind(this._tra)));
              },
              unknownProperty(e) {
                return (o[e] = !0), this._tra.get(e);
              },
              willDestroy: () => this._tra.unregister(),
              addOverlays: function (e) {
                let t = this._tra;
                for (const n of e) t = t.overlay(n);
                t && this.wrapTra(t);
              },
            }).create()),
            l.set("service", l),
            l.addObserver("metadata.region", n.bind(null, a, "region")),
            l.addObserver("metadata.locale", n.bind(null, a, "locale")),
            s &&
              (console.warning(
                "deprecated: pass a traService as a property of your Ember application definition",
              ),
              s.register("tra:main", l, { instantiate: !1 }),
              s.inject("component", "tra", "tra:main"),
              s.inject("controller", "tra", "tra:main"),
              s.inject("view", "tra", "tra:main"),
              s.inject("model", "tra", "tra:main"),
              s.inject("route", "tra", "tra:main"),
              s.inject("service", "tra", "tra:main")),
            l
          );
        };
      },
      (e) => {
        "use strict";
        e.exports = {
          TELEMETRY_EVENT_ID: {
            CREATE_PAW_WINDOW: "lol_paw_create_paw_window",
            CLOSE_PAW_WINDOW: "lol_paw_close_paw_window",
            START_PURCHASE: "lol_paw_start_purchase",
            PURCHASE_SUCCESS: "lol_paw_purchase_success",
            PURCHASE_FAILED: "lol_paw_purchase_failed",
            START_LOADING_ITEM: "lol_paw_start_loading_item",
            LOAD_ITEM_SUCCESS: "lol_paw_load_item_success",
            LOAD_ITEM_FAIL: "lol_paw_load_item_fail",
            CHOICE_OPTION_SELECT: "lol_paw_choice_item_select",
          },
          TELEMETRY_EVENT_NAME: "rcp-fe-lol-paw-event",
          TELEMETRY_ERROR_MESSAGES: {
            INTERNAL_ERROR: "JS error",
            EXTERNAL_ERROR: "Purchase Error",
          },
        };
      },
      (e) => {
        "use strict";
        e.exports = {
          PAW_MODAL_CLOSE_EVENT_NAME: "dialogFrameDismissed",
          MAX_WAITING_TIME_IN_MS: 19e3,
          PURCHASE_OFFER_URL: "/v3/purchaseOffer",
          PURCHASE_OFFER_STATUSES_URL: "/v3/purchase-offer-order-statuses",
          PURCHASE_WIDGET_BINDING_URL: "/lol-purchase-widget",
          IMAGE_PATH_BE: "/fe/lol-static-assets/images/icon-be-150.png",
          IMAGE_PATH_RP: "/fe/lol-static-assets/images/icon-rp-gradient-32.png",
          BASE_SKIN_LINE_DATA_URL: "/v3/base-skin-line-data",
          VALIDATE_OFFER_URL: "/v3/validateOffer",
        };
      },
      (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        var a = n(1),
          s = n(27),
          l = c(n(29)),
          o = n(3),
          i = c(n(30));
        function c(e) {
          return e && e.__esModule ? e : { default: e };
        }
        const { computed: r } = a.Ember;
        var p = a.Ember.Service.extend(i.default, {
          pawTemplateDataCache: void 0,
          isWaitingForAsyncPopulate: !0,
          isWaitingToPresent: !0,
          offerValidationProgress: {
            state: o.PAW.OFFER_VALIDATION_STATES.NOT_STARTED,
            error: void 0,
          },
          offerPurchaseProgress: {
            orderId: void 0,
            state: o.PAW.OFFER_PURCHASE_STATES.NOT_STARTED,
            error: void 0,
          },
          componentNames: r(
            "pawTemplateDataCache.template.components.[]",
            "isWaitingToPresent",
            function () {
              const e = [];
              if (this.get("isWaitingToPresent")) return e;
              for (
                let t = 0;
                t < this.get("pawTemplateDataCache.template.components").length;
                t++
              ) {
                const n = this.get(
                  "pawTemplateDataCache.template.components." +
                    t +
                    ".componentType",
                );
                e.push(this._getComponentNameFromComponentType(n));
              }
              return e;
            },
          ),
          genericError: !1,
          nonRefundableDisclaimerEnabled: r.readOnly(
            "pawConfig.nonRefundableDisclaimerEnabled",
          ),
          init() {
            this._super(...arguments),
              (this._dataBinding = (0, a.dataBinding)(
                s.PURCHASE_WIDGET_BINDING_URL,
                (0, a.getProvider)().getSocket(),
              )),
              this._dataBinding.observe(
                s.PURCHASE_OFFER_STATUSES_URL,
                this,
                (e) => {
                  this._updateOfferPurchaseProgress(e);
                },
              );
          },
          willDestroy() {
            this._super(...arguments),
              this._dataBinding.unobserve(this),
              (this._dataBinding = null);
          },
          initializeWithData(e) {
            this.get("pawTemplateDataCache.service")
              ? a.logger.error(
                  "pawTemplateDataCache.service reference already exists, initializeWithData() should only be called once",
                )
              : ((e.service = this),
                this.set("offerValidationProgress", {
                  state: o.PAW.OFFER_VALIDATION_STATES.NOT_STARTED,
                  errorKey: void 0,
                }),
                this.set("offerPurchaseProgress", {
                  orderId: void 0,
                  state: o.PAW.OFFER_PURCHASE_STATES.NOT_STARTED,
                  errorKey: void 0,
                }),
                this.set("genericError", !1),
                this.set("isWaitingToPresent", !0),
                this.set("pawTemplateDataCache", e),
                this.set("isWaitingForAsyncPopulate", e.async),
                e.async &&
                  this.set(
                    "asyncWithoutPopulateTimeout",
                    setTimeout(() => {
                      this.get("isWaitingToPresent") &&
                        this.set("genericError", !0);
                    }, s.MAX_WAITING_TIME_IN_MS),
                  ));
          },
          populateModal(e) {
            this.set("pawTemplateDataCache.template", e),
              this.set("isWaitingForAsyncPopulate", !1),
              this._checkIfReadyToPresent();
          },
          getComponentDataForArea(e) {
            return this.get("pawTemplateDataCache.template.components." + e);
          },
          getMediaPath(e) {
            if (e) {
              switch (e.loadType) {
                case o.PAW.MEDIA_LOAD_TYPES.LOCAL_ASSET:
                case o.PAW.MEDIA_LOAD_TYPES.GAME_DATA:
                  return e.location;
              }
              a.logger.warning(e.loadType + " not handled in getMediaPath");
            }
          },
          validateOffer() {
            this.set(
              "offerValidationProgress.state",
              o.PAW.OFFER_VALIDATION_STATES.IN_PROGRESS,
            );
            const e = { offerId: this.get("pawTemplateDataCache.offerId") };
            Promise.race([
              this._getTimeoutPromise(
                s.MAX_WAITING_TIME_IN_MS,
                "paw-template.validateOffer",
              ),
              this._dataBinding.post(s.VALIDATE_OFFER_URL, e),
            ])
              .then((e) => {
                this._handleValidationResponse(e);
              })
              .catch((e) => {
                this._handleValidationResponse();
              });
          },
          purchaseOffer(e) {
            this._updateOfferPurchaseProgressState(
              o.PAW.OFFER_PURCHASE_STATES.IN_PROGRESS,
            );
            const t =
                e.currencyType === o.PAW.CURRENCY_TYPES.CUSTOM
                  ? e.currencyPaymentOption
                  : e.currencyType,
              n = e.quantity ? e.quantity : 1,
              a = {
                offerId: this.get("pawTemplateDataCache.offerId"),
                currencyType: t,
                quantity: n,
                price: e.price,
              };
            this.get("pawTemplateDataCache.template").onPurchaseInitiated &&
              this.get("pawTemplateDataCache.template").onPurchaseInitiated(e),
              this.set("purchaseOptionSourceInProgress", e),
              Promise.race([
                this._getTimeoutPromise(
                  s.MAX_WAITING_TIME_IN_MS,
                  "paw-template.purchaseOffer",
                ),
                this._dataBinding.post(s.PURCHASE_OFFER_URL, a),
              ])
                .then((e) => {
                  e.legacy
                    ? this._updateOfferPurchaseProgressState(
                        o.PAW.OFFER_PURCHASE_STATES.SUCCESS,
                      )
                    : this.set(
                        "offerPurchaseProgress.orderId",
                        e.orderDto.data.id,
                      );
                })
                .catch((e) => {
                  this._updateOfferPurchaseProgressState(
                    o.PAW.OFFER_PURCHASE_STATES.FAIL,
                  ),
                    this.set(
                      "offerPurchaseProgress.errorKey",
                      "cat_paw_error_generic",
                    );
                });
          },
          notifySourceConnections(e, t) {
            const n = this.get(
              "pawTemplateDataCache.template.componentConnections",
            );
            if (n)
              for (let a = 0; a < n.length; a++)
                if (n[a].source === e)
                  for (let e = 0; e < n[a].connections.length; e++)
                    this.set(
                      "pawTemplateDataCache.template.components." +
                        n[a].connections[e] +
                        ".sourceConnectionData",
                      t,
                    );
          },
          getMediaPathFromPurchaseOption(e) {
            if (e.currencyImage) return this.getMediaPath(e.currencyImage);
            switch (e.currencyType) {
              case o.PAW.CURRENCY_TYPES.BE:
                return s.IMAGE_PATH_BE;
              case o.PAW.CURRENCY_TYPES.RP:
                return s.IMAGE_PATH_RP;
              case o.PAW.CURRENCY_TYPES.CUSTOM:
                return e.currencyImage
                  ? this.getMediaPath(e.currencyImage)
                  : null;
              default:
                return (
                  a.logger.warning(
                    e.currencyType +
                      " not handled in getMediaPathFromPurchaseOption",
                  ),
                  null
                );
            }
          },
          getValidateErrorStringFromKey(e, t) {
            switch (t) {
              case l.default.ITEM_OWNED:
                return e.get("cat_paw_error_validation_item_owned");
              case l.default.ITEM_UNAVAILABLE:
                return e.get("cat_paw_error_validation_item_not_active");
              case l.default.MISSING_REQUIRED_ITEMS:
                return e.get("cat_paw_error_validation_item_parent_not_owned");
              case l.default.MISSING_REQUIRED_ITEMS_LOYALTY:
                return e.get(
                  "cat_paw_error_validation_item_loyalty_parent_not_owned",
                );
              case l.default.NOT_ENOUGH_CURRENCY:
                return e.get(
                  "cat_paw_error_validation_item_not_enough_currency",
                );
              case l.default.GENERIC_ERROR:
              default:
                return e.get("cat_paw_error_generic");
            }
          },
          getErrorIcon: (e) =>
            e === l.default.MISSING_REQUIRED_ITEMS_LOYALTY
              ? "/fe/lol-static-assets/images/xbox-game-pass-loyalty-hint.svg"
              : "/fe/lol-static-assets/svg/alert-info-red.svg",
          _checkIfReadyToPresent() {
            const e =
              this.get("offerValidationProgress.state") ===
              o.PAW.OFFER_VALIDATION_STATES.COMPLETED;
            !this.get("isWaitingForAsyncPopulate") &&
              e &&
              this.set("isWaitingToPresent", !1);
          },
          _getComponentNameFromComponentType(e) {
            const t = "paw-template-";
            switch (e) {
              case o.PAW.COMPONENT_TYPES.TEXT:
                return t + "text";
              case o.PAW.COMPONENT_TYPES.TITLE_SUBTITLE:
                return t + "title-subtitle";
              case o.PAW.COMPONENT_TYPES.PURCHASE:
                return t + "purchase";
              case o.PAW.COMPONENT_TYPES.MEDIA:
                return t + "media";
              case o.PAW.COMPONENT_TYPES.IMAGE_CAROUSEL:
                return t + "image-carousel";
              case o.PAW.COMPONENT_TYPES.SCROLL_LIST:
                return t + "scroll-list";
              case o.PAW.COMPONENT_TYPES.VERTICAL_LIST:
                return t + "vertical-list";
              default:
                return (
                  a.logger.warning(
                    e + " not handled in getComponentNameFromComponentType",
                  ),
                  null
                );
            }
          },
          _getTimeoutPromise: (e, t) =>
            new Promise(function (n, a) {
              setTimeout(function () {
                a(new Error(`${t} request has not return after ${e}ms`));
              }, e);
            }),
          _updateOfferPurchaseProgress(e) {
            if (e) {
              const t = this.get("offerPurchaseProgress.orderId");
              if (e.statuses[t]) {
                const n = e.statuses[t].orderState;
                this._updateOfferPurchaseProgressState(n),
                  n === o.PAW.OFFER_PURCHASE_STATES.FAIL &&
                    this.set(
                      "offerPurchaseProgress.errorKey",
                      "cat_paw_error_generic",
                    );
              }
            }
          },
          _updateOfferPurchaseProgressState(e) {
            this.set("offerPurchaseProgress.state", e),
              (e !== o.PAW.OFFER_PURCHASE_STATES.FAIL &&
                e !== o.PAW.OFFER_PURCHASE_STATES.SUCCESS) ||
                (this.get("pawTemplateDataCache.template").onPurchaseComplete &&
                  this.get("pawTemplateDataCache.template").onPurchaseComplete(
                    this.get("purchaseOptionSourceInProgress"),
                    e === o.PAW.OFFER_PURCHASE_STATES.SUCCESS,
                  ));
          },
          _handleValidationResponse(e) {
            this.set(
              "offerValidationProgress.state",
              o.PAW.OFFER_VALIDATION_STATES.COMPLETED,
            ),
              e
                ? e.validationErrors.length > 0 &&
                  (e.validationErrors[0].errorKey === l.default.GENERIC_ERROR &&
                    this.set("genericError", !0),
                  e.validationErrors[0].errorKey,
                  l.default.NOT_ENOUGH_CURRENCY,
                  this.set(
                    "offerValidationProgress.errorKey",
                    e.validationErrors[0].errorKey,
                  ))
                : this.set(
                    "offerValidationProgress.errorKey",
                    l.default.GENERIC_ERROR,
                  ),
              this._checkIfReadyToPresent();
          },
        });
        t.default = p;
      },
      (e, t) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        t.default = {
          GENERIC_ERROR: "validate.generic_error",
          ITEM_UNAVAILABLE: "validate.item_unavailable",
          ITEM_OWNED: "validate.item_owned",
          MISSING_REQUIRED_ITEMS: "validate.missing_required_items",
          MISSING_REQUIRED_ITEMS_LOYALTY:
            "validate.missing_required_items_loyalty",
          NOT_ENOUGH_CURRENCY: "validate.not_enough_currency",
        };
      },
      (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        var a = n(1);
        var s = (0, a.emberDataBinding)({
          Ember: a.Ember,
          websocket: (0, a.getProvider)().getSocket(),
          basePaths: {
            paw: "/lol-purchase-widget",
            settings: "/lol-settings",
            lolInventory: "/lol-inventory",
          },
          boundProperties: {
            userExperience: {
              api: "settings",
              path: "/v2/local/lol-user-experience",
            },
            rpWallet: { api: "lolInventory", path: "/v1/wallet/RP" },
            ipWallet: {
              api: "lolInventory",
              path: "/v1/wallet/lol_blue_essence",
            },
            pawConfig: { api: "paw", path: "/v1/configuration" },
          },
        });
        t.default = s;
      },
      (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        var a = n(1),
          s = n(3);
        const { computed: l } = a.Ember;
        var o = a.Ember.Component.extend({
          classNames: ["paw-template-large-two-column-landscape-template"],
          layout: n(32),
          style: n(33),
          pawTemplateService: a.Ember.inject.service("paw-template"),
          componentData0: l.readOnly(
            "pawTemplateService.pawTemplateDataCache.template.components.0",
          ),
          componentData1: l.readOnly(
            "pawTemplateService.pawTemplateDataCache.template.components.1",
          ),
          componentData2: l.readOnly(
            "pawTemplateService.pawTemplateDataCache.template.components.2",
          ),
          componentData3: l.readOnly(
            "pawTemplateService.pawTemplateDataCache.template.components.3",
          ),
          componentData4: l.readOnly(
            "pawTemplateService.pawTemplateDataCache.template.components.4",
          ),
          area0ComponentName: l.readOnly("pawTemplateService.componentNames.0"),
          area1ComponentName: l.readOnly("pawTemplateService.componentNames.1"),
          area2ComponentName: l.readOnly("pawTemplateService.componentNames.2"),
          area3ComponentName: l.readOnly("pawTemplateService.componentNames.3"),
          area4ComponentName: l.readOnly("pawTemplateService.componentNames.4"),
          isWaitingToPresent: l.readOnly(
            "pawTemplateService.isWaitingToPresent",
          ),
          genericError: l.readOnly("pawTemplateService.genericError"),
          purchaseSuccess: l.equal(
            "pawTemplateService.offerPurchaseProgress.state",
            s.PAW.OFFER_PURCHASE_STATES.SUCCESS,
          ),
          successImagePath: l(
            "pawTemplateService.pawTemplateDataCache.template.purchaseSuccessInfo.purchaseSuccessImage",
            function () {
              const e = this.get(
                "pawTemplateService.pawTemplateDataCache.template.purchaseSuccessInfo.purchaseSuccessImage",
              );
              return this.get("pawTemplateService").getMediaPath(e);
            },
          ),
          successItemName: l.readOnly(
            "pawTemplateService.pawTemplateDataCache.template.purchaseSuccessInfo.purchaseSuccessItemName",
          ),
          successItemDescription: l.readOnly(
            "pawTemplateService.pawTemplateDataCache.template.purchaseSuccessInfo.purchaseSuccessItemDescription",
          ),
          successDeepLinkConextPrefix: l(
            "pawTemplateService.pawTemplateDataCache.template.purchaseSuccessInfo",
            function () {
              return this.get(
                "tra.cat_pawt_celebration_deep_link_context",
              ).split("{{icon}}")[0];
            },
          ),
          successDeepLinkConextSuffix: l(
            "pawTemplateService.pawTemplateDataCache.template.purchaseSuccessInfo",
            function () {
              return this.get(
                "tra.cat_pawt_celebration_deep_link_context",
              ).split("{{icon}}")[1];
            },
          ),
          actions: {
            onCloseButton() {
              a.privateAPI.removePAWModal();
            },
            onCollectionsButton() {
              a.privateAPI.removePAWModal(),
                a.Router.navigateTo("rcp-fe-lol-collections");
            },
          },
        });
        t.default = o;
      },
      (e, t, n) => {
        const a = n(1).Ember;
        e.exports = a.HTMLBars.template({
          id: "cqn3e4OQ",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\Releases_14_13\\\\LeagueClientContent_Release\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-paw\\\\src\\\\components\\\\paw-template\\\\large-two-column-landscape-template-component\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\Releases_14_13\\\\LeagueClientContent_Release\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-paw\\\\src\\\\components\\\\paw-template\\\\large-two-column-landscape-template-component\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\Releases_14_13\\\\LeagueClientContent_Release\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-paw\\\\src\\\\components\\\\paw-template\\\\large-two-column-landscape-template-component\\\\index.js\\" "],["text","\\n"],["block",["if"],[["get",["genericError"]]],null,5,4]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","  "],["open-element","div",[]],["static-attr","class","paw-template-large-two-column-landscape-template-flex"],["flush-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","paw-template-large-two-column-landscape-template-column-0 paw-template-large-two-column-landscape-template-column"],["flush-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","paw-template-large-two-column-landscape-template-area-0 paw-template-large-two-column-landscape-template-area"],["flush-element"],["text"," \\n        "],["open-element","div",[]],["static-attr","class","paw-template-large-two-column-landscape-template-content"],["flush-element"],["text","\\n          "],["append",["helper",["component"],[["get",["area0ComponentName"]]],[["areaIndex","componentData"],[0,["get",["componentData0"]]]]],false],["text","\\n        "],["close-element"],["text","\\n      "],["close-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","paw-template-large-two-column-landscape-template-area-1 paw-template-large-two-column-landscape-template-area"],["flush-element"],["text"," \\n        "],["open-element","div",[]],["static-attr","class","paw-template-large-two-column-landscape-template-content"],["flush-element"],["text","\\n          "],["append",["helper",["component"],[["get",["area1ComponentName"]]],[["areaIndex","componentData"],[1,["get",["componentData1"]]]]],false],["text","\\n        "],["close-element"],["text","\\n      "],["close-element"],["text","\\n    "],["close-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","paw-template-large-two-column-landscape-template-column-1 paw-template-large-two-column-landscape-template-column "],["flush-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","paw-template-large-two-column-landscape-template-area-2 paw-template-large-two-column-landscape-template-area"],["flush-element"],["text"," \\n        "],["open-element","div",[]],["static-attr","class","paw-template-large-two-column-landscape-template-content"],["flush-element"],["text","\\n          "],["append",["helper",["component"],[["get",["area2ComponentName"]]],[["areaIndex","componentData"],[2,["get",["componentData2"]]]]],false],["text","\\n        "],["close-element"],["text","\\n      "],["close-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","paw-template-large-two-column-landscape-template-area-3 paw-template-large-two-column-landscape-template-area"],["flush-element"],["text"," \\n        "],["open-element","div",[]],["static-attr","class","paw-template-large-two-column-landscape-template-content"],["flush-element"],["text","\\n          "],["append",["helper",["component"],[["get",["area3ComponentName"]]],[["areaIndex","componentData"],[3,["get",["componentData3"]]]]],false],["text","\\n        "],["close-element"],["text","\\n      "],["close-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","paw-template-large-two-column-landscape-template-area-4 paw-template-large-two-column-landscape-template-area"],["flush-element"],["text"," \\n        "],["open-element","div",[]],["static-attr","class","paw-template-large-two-column-landscape-template-content"],["flush-element"],["text","\\n          "],["append",["helper",["component"],[["get",["area4ComponentName"]]],[["areaIndex","componentData"],[4,["get",["componentData4"]]]]],false],["text","\\n        "],["close-element"],["text","\\n      "],["close-element"],["text","\\n    "],["close-element"],["text","\\n  "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","  "],["open-element","div",[]],["static-attr","class","paw-template-large-two-column-landscape-template-flex paw-template-large-two-column-landscape-template-spinner"],["flush-element"],["text","\\n    "],["append",["helper",["uikit-spinner"],null,[["src"],["/fe/lol-paw/images/spinner.png"]]],false],["text","\\n  "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["block",["if"],[["get",["isWaitingToPresent"]]],null,1,0]],"locals":[]},{"statements":[["text","  "],["open-element","div",[]],["static-attr","class","paw-template-large-two-column-landscape-template-flex paw-template-large-two-column-landscape-template-success"],["flush-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","paw-template-large-two-column-landscape-template-success-image-wrapper"],["flush-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","paw-template-large-two-column-landscape-template-success-image"],["dynamic-attr","style",["concat",["background-image:url(",["unknown",["successImagePath"]],")"]]],["flush-element"],["close-element"],["text","\\n    "],["close-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","paw-template-large-two-column-landscape-template-success-right-panel"],["flush-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","paw-template-large-two-column-landscape-template-success-clock-image-wrapper"],["flush-element"],["text","\\n        "],["open-element","object",[]],["static-attr","class","paw-template-large-two-column-landscape-template-success-clock-image"],["static-attr","type","image/svg+xml"],["dynamic-attr","data","/fe/lol-static-assets/svg/circle-lines-gold.svg",null],["flush-element"],["close-element"],["text","\\n        "],["open-element","div",[]],["static-attr","class","paw-template-large-two-column-landscape-template-success-lock-image"],["flush-element"],["text","\\n          "],["open-element","object",[]],["static-attr","type","image/svg+xml"],["dynamic-attr","data","/fe/lol-static-assets/svg/lock-open-gold.svg",null],["flush-element"],["close-element"],["text","\\n        "],["close-element"],["text","\\n        "],["open-element","div",[]],["static-attr","class","paw-template-large-two-column-landscape-template-success-text paw-template-large-two-column-landscape-template-success-title"],["flush-element"],["append",["unknown",["tra","cat_pawt_celebration_unlocked_header"]],false],["close-element"],["text","\\n        "],["open-element","div",[]],["static-attr","class","paw-template-large-two-column-landscape-template-success-text paw-template-large-two-column-landscape-template-success-name"],["flush-element"],["append",["unknown",["successItemName"]],false],["close-element"],["text","\\n        "],["open-element","div",[]],["static-attr","class","paw-template-large-two-column-landscape-template-success-text paw-template-large-two-column-landscape-template-success-description"],["flush-element"],["append",["unknown",["successItemDescription"]],false],["close-element"],["text","\\n        "],["open-element","div",[]],["static-attr","class","paw-template-large-two-column-landscape-template-success-text paw-template-large-two-column-landscape-template-success-action"],["flush-element"],["text","  \\n          "],["append",["unknown",["successDeepLinkConextPrefix"]],false],["text","\\n          "],["open-element","span",[]],["static-attr","class","paw-template-large-two-column-landscape-template-success-action-icon"],["flush-element"],["text","\\n            "],["open-element","object",[]],["static-attr","type","image/svg+xml"],["dynamic-attr","data","/fe/lol-static-assets/svg/backpack-light-gold.svg",null],["flush-element"],["close-element"],["text","\\n          "],["close-element"],["text","\\n          "],["append",["unknown",["successDeepLinkConextSuffix"]],false],["text","\\n        "],["close-element"],["text","\\n      "],["close-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","paw-template-large-two-column-landscape-template-success-button-flex"],["flush-element"],["text","\\n        "],["open-element","lol-uikit-purchase-button",[]],["static-attr","class","paw-template-large-two-column-landscape-template-success-button-close"],["dynamic-attr","onclick",["helper",["action"],[["get",[null]],"onCloseButton"],null],null],["flush-element"],["append",["unknown",["tra","cat_pawt_celebration_confirmation"]],false],["close-element"],["text","\\n        "],["open-element","lol-uikit-flat-button",[]],["static-attr","class","paw-template-large-two-column-landscape-template-success-button-collections"],["dynamic-attr","onclick",["helper",["action"],[["get",[null]],"onCollectionsButton"],null],null],["flush-element"],["text","\\n          "],["open-element","div",[]],["static-attr","class","paw-template-large-two-column-landscape-template-success-button-collections-flex"],["flush-element"],["text","\\n            "],["open-element","div",[]],["static-attr","class","paw-template-large-two-column-landscape-template-success-button-collections-image"],["flush-element"],["text","\\n              "],["open-element","object",[]],["static-attr","type","image/svg+xml"],["dynamic-attr","data","/fe/lol-static-assets/svg/backpack-gold.svg",null],["flush-element"],["close-element"],["text","\\n            "],["close-element"],["text","\\n            "],["open-element","div",[]],["static-attr","class","paw-template-large-two-column-landscape-template-success-button-collections-text"],["flush-element"],["append",["unknown",["tra","cat_pawt_celebration_deep_link_button"]],false],["close-element"],["text","\\n          "],["close-element"],["text","\\n        "],["close-element"],["text","\\n      "],["close-element"],["text","\\n    "],["close-element"],["text","\\n  "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["block",["if"],[["get",["purchaseSuccess"]]],null,3,2]],"locals":[]},{"statements":[["text","  "],["open-element","div",[]],["static-attr","class","paw-template-large-two-column-landscape-template-error-column"],["flush-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","paw-template-large-two-column-landscape-template-error-title"],["flush-element"],["append",["unknown",["tra","cat_paw_error_purchase_internal_fail_title"]],false],["close-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","paw-template-large-two-column-landscape-template-error-icon-panel"],["flush-element"],["text","\\n      "],["open-element","object",[]],["static-attr","type","image/svg+xml"],["dynamic-attr","data","/fe/lol-static-assets/svg/poro-sweat-exclamation.svg",null],["flush-element"],["close-element"],["text","\\n    "],["close-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","paw-template-large-two-column-landscape-template-error-message"],["flush-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","paw-template-large-two-column-landscape-template-error-message-header"],["flush-element"],["append",["unknown",["tra","cat_paw_error_purchase_internal_fail_header"]],false],["close-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","paw-template-large-two-column-landscape-template-error-message-body"],["flush-element"],["append",["unknown",["tra","cat_paw_error_purchase_internal_fail"]],false],["close-element"],["text","\\n    "],["close-element"],["text"," \\n    "],["open-element","lol-uikit-purchase-button",[]],["static-attr","class","paw-template-large-two-column-landscape-template-error-close-button"],["dynamic-attr","onclick",["helper",["action"],[["get",[null]],"onCloseButton"],null],null],["flush-element"],["append",["unknown",["tra","cat_paw_error_purchase_internal_fail_close"]],false],["close-element"],["text","\\n  "],["close-element"],["text","\\n"]],"locals":[]}],"hasPartials":false}',
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
        var a = n(1);
        const { computed: s } = a.Ember;
        var l = a.Ember.Component.extend({
          classNames: ["paw-template-image-carousel"],
          layout: n(35),
          style: n(36),
          pawTemplateService: a.Ember.inject.service("paw-template"),
          selectedDisplayIndex: 0,
          scrollPosition: 0,
          thumbnailWidth: 90,
          thumbnailsToDisplay: s("componentData.images.[]", function () {
            const e = [];
            for (let t = 0; t < this.get("componentData.images").length; t++)
              e.push({
                displayIndex: t,
                imagePath: this.get("pawTemplateService").getMediaPath(
                  this.get("componentData.images." + t + ".thumbnail"),
                ),
              });
            return e;
          }),
          thumbnails: s(
            "selectedDisplayIndex",
            "thumbnailsToDisplay",
            function () {
              for (let e = 0; e < this.get("thumbnailsToDisplay").length; e++)
                this.set(
                  "thumbnailsToDisplay." + e + ".selected",
                  e === this.get("selectedDisplayIndex"),
                );
              return this.get("thumbnailsToDisplay");
            },
          ),
          init() {
            this._super(...arguments),
              this._snapToIndex(0),
              this.set(
                "autoScrollInterval",
                setInterval(() => {
                  this._changeScrollPosition(1);
                }, 1e4),
              );
          },
          actions: {
            onThumbnailButton(e) {
              this.set("selectedDisplayIndex", e.displayIndex),
                this._notifyConnections(e.displayIndex),
                this._snapToIndex(this.get("selectedDisplayIndex")),
                this._clearIntervalHelper();
            },
            onLeftArrowButton() {
              this._changeScrollPosition(-1), this._clearIntervalHelper();
            },
            onRightArrowButton() {
              this._changeScrollPosition(1), this._clearIntervalHelper();
            },
          },
          _snapToIndex(e) {
            const t = this.get("thumbnailWidth"),
              n =
                ((this.get("componentData.images")
                  ? this.get("componentData.images").length
                  : 0) *
                  t) /
                  2 -
                t / 2 -
                e * t;
            this.set("scrollPosition", n);
          },
          _notifyConnections(e) {
            const t = this.get("componentData.images." + e + ".large"),
              n = this.get("componentData.images." + e + ".thumbnail"),
              a = {
                media:
                  this.get("componentData.images." + e + ".video") || t || n,
                associatedText: this.get(
                  "componentData.localizedAssociatedTextData." + e,
                ),
                index: e + 1,
              };
            this.get("pawTemplateService").notifySourceConnections(
              this.get("areaIndex"),
              a,
            );
          },
          _changeScrollPosition(e) {
            let t = 0;
            e > 0
              ? this.get("selectedDisplayIndex") <
                  this.get("componentData.images").length - 1 &&
                (t = this.get("selectedDisplayIndex") + 1)
              : ((t = this.get("componentData.images").length - 1),
                this.get("selectedDisplayIndex") > 0 &&
                  (t = this.get("selectedDisplayIndex") - 1)),
              this.set("selectedDisplayIndex", t),
              this._notifyConnections(t),
              this._snapToIndex(this.get("selectedDisplayIndex"));
          },
          _clearIntervalHelper() {
            this.get("autoScrollInterval") &&
              (clearInterval(this.get("autoScrollInterval")),
              this.set("autoScrollInterval", null));
          },
        });
        t.default = l;
      },
      (e, t, n) => {
        const a = n(1).Ember;
        e.exports = a.HTMLBars.template({
          id: "+gi8OziT",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\Releases_14_13\\\\LeagueClientContent_Release\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-paw\\\\src\\\\components\\\\paw-template\\\\image-carousel-component\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\Releases_14_13\\\\LeagueClientContent_Release\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-paw\\\\src\\\\components\\\\paw-template\\\\image-carousel-component\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\Releases_14_13\\\\LeagueClientContent_Release\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-paw\\\\src\\\\components\\\\paw-template\\\\image-carousel-component\\\\index.js\\" "],["text","\\n"],["open-element","lol-uikit-arrow-button",[]],["static-attr","class","paw-template-image-carousel-arrow-image paw-template-image-carousel-left-arrow"],["dynamic-attr","onclick",["helper",["action"],[["get",[null]],"onLeftArrowButton"],null],null],["flush-element"],["close-element"],["text","\\n"],["open-element","div",[]],["static-attr","class","paw-template-image-carousel-content-wrapper-outer"],["flush-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","paw-template-image-carousel-content-wrapper-inner"],["flush-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","paw-template-image-carousel-content-scroll"],["dynamic-attr","style",["concat",["transform: translateX(",["unknown",["scrollPosition"]],"px)"]]],["flush-element"],["text","\\n"],["block",["each"],[["get",["thumbnails"]]],null,0],["text","    "],["close-element"],["text","\\n  "],["close-element"],["text","\\n"],["close-element"],["text","\\n"],["open-element","lol-uikit-arrow-button",[]],["static-attr","class","paw-template-image-carousel-arrow-image"],["dynamic-attr","onclick",["helper",["action"],[["get",[null]],"onRightArrowButton"],null],null],["flush-element"],["close-element"]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","        "],["open-element","div",[]],["dynamic-attr","class",["concat",["paw-template-image-carousel-thumbnail ",["helper",["if"],[["get",["thumbnail","selected"]],"paw-template-image-carousel-thumbnail-selected"],null]]]],["flush-element"],["text","\\n          "],["open-element","button",[]],["dynamic-attr","class",["concat",["paw-template-image-carousel-thumbnail-button ",["helper",["if"],[["get",["thumbnail","selected"]],"paw-template-image-carousel-thumbnail-button-selected"],null]]]],["dynamic-attr","onclick",["helper",["action"],[["get",[null]],"onThumbnailButton",["get",["thumbnail"]]],null],null],["flush-element"],["text","\\n            "],["open-element","div",[]],["static-attr","class","paw-template-image-carousel-thumbnail-button-image"],["dynamic-attr","style",["concat",["background-image:url(",["unknown",["thumbnail","imagePath"]],")"]]],["flush-element"],["text","\\n              "],["open-element","div",[]],["static-attr","class","paw-template-image-carousel-thumbnail-border"],["flush-element"],["text","\\n                "],["open-element","div",[]],["static-attr","class","paw-template-image-carousel-thumbnail-border-inner"],["flush-element"],["close-element"],["text","\\n              "],["close-element"],["text","\\n            "],["close-element"],["text","\\n          "],["close-element"],["text","\\n        "],["close-element"],["text","\\n"]],"locals":["thumbnail","index"]}],"hasPartials":false}',
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
        var a = n(1),
          s = n(3);
        const { computed: l } = a.Ember;
        var o = a.Ember.Component.extend({
          classNames: ["paw-template-media"],
          layout: n(38),
          style: n(39),
          pawTemplateService: a.Ember.inject.service("paw-template"),
          captionTitle: l(
            "componentData.caption.localizedTitle",
            "componentData.sourceConnectionData",
            function () {
              return (
                this.get("componentData.sourceConnectionData.associatedText") ||
                this.get("componentData.caption.localizedTitle")
              );
            },
          ),
          captionText: l(
            "componentData.caption.total",
            "componentData.sourceConnectionData",
            function () {
              const e =
                this.get("componentData.sourceConnectionData.index") || 1;
              return this.get("tra").formatString("cat_paw_skin_line_caption", {
                index: e,
                total: this.get("componentData.caption.total"),
              });
            },
          ),
          media: l(
            "componentData.media",
            "componentData.sourceConnectionData",
            function () {
              const e = this.get("componentData.sourceConnectionData.media"),
                t = e || this.get("componentData.media");
              return {
                isVideo:
                  (e && e.type === s.PAW.MEDIA_TYPES.VIDEO) ||
                  this.get("componentData.media.type") ===
                    s.PAW.MEDIA_TYPES.VIDEO,
                path: this.get("pawTemplateService").getMediaPath(t),
              };
            },
          ),
        });
        t.default = o;
      },
      (e, t, n) => {
        const a = n(1).Ember;
        e.exports = a.HTMLBars.template({
          id: "Fy+zpGbX",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\Releases_14_13\\\\LeagueClientContent_Release\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-paw\\\\src\\\\components\\\\paw-template\\\\media-component\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\Releases_14_13\\\\LeagueClientContent_Release\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-paw\\\\src\\\\components\\\\paw-template\\\\media-component\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\Releases_14_13\\\\LeagueClientContent_Release\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-paw\\\\src\\\\components\\\\paw-template\\\\media-component\\\\index.js\\" "],["text","\\n"],["open-element","div",[]],["static-attr","class","paw-template-media-content"],["flush-element"],["text","\\n"],["block",["if"],[["get",["media","isVideo"]]],null,1,0],["text","  "],["open-element","div",[]],["static-attr","class","paw-template-media-caption"],["flush-element"],["text"," \\n    "],["open-element","div",[]],["static-attr","class","paw-template-media-caption-flex"],["flush-element"],["text"," \\n      "],["open-element","div",[]],["static-attr","class","paw-template-media-caption-title"],["flush-element"],["append",["unknown",["captionTitle"]],false],["close-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","paw-template-media-caption-subtitle-wrapper"],["flush-element"],["text","\\n        "],["open-element","div",[]],["static-attr","class","paw-template-media-content-subtitle-icon"],["flush-element"],["text","\\n          "],["open-element","object",[]],["static-attr","type","image/svg+xml"],["static-attr","data","/fe/lol-static-assets/svg/mask-group.svg"],["flush-element"],["close-element"],["text","\\n        "],["close-element"],["text","\\n        "],["open-element","div",[]],["static-attr","class","paw-template-media-caption-subtitle-text"],["flush-element"],["append",["unknown",["captionText"]],false],["close-element"],["text","\\n      "],["close-element"],["text","\\n    "],["close-element"],["text","    \\n  "],["close-element"],["text","\\n"],["close-element"],["text","\\n"]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","    "],["open-element","div",[]],["static-attr","class","paw-template-media-content"],["dynamic-attr","style",["concat",["background-image:url(",["unknown",["media","path"]],")"]]],["flush-element"],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","    "],["open-element","video",[]],["static-attr","autoplay",""],["static-attr","loop",""],["static-attr","class","paw-template-media-video"],["dynamic-attr","src",["unknown",["media","path"]],null],["flush-element"],["close-element"],["text","\\n"]],"locals":[]}],"hasPartials":false}',
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
        var a = n(1),
          s = n(3);
        const { computed: l } = a.Ember;
        var o = a.Ember.Component.extend({
          classNames: ["paw-template-purchase"],
          layout: n(41),
          style: n(42),
          pawTemplateService: a.Ember.inject.service("paw-template"),
          validateError: l(
            "pawTemplateService.offerValidationProgress.errorKey",
            function () {
              const e = this.get(
                "pawTemplateService.offerValidationProgress.errorKey",
              );
              return e
                ? this.get("pawTemplateService").getValidateErrorStringFromKey(
                    this.get("tra"),
                    e,
                  )
                : void 0;
            },
          ),
          validationIcon: l(
            "pawTemplateService.offerValidationProgress.errorKey",
            function () {
              const e = this.get(
                "pawTemplateService.offerValidationProgress.errorKey",
              );
              return this.get("pawTemplateService").getErrorIcon(e);
            },
          ),
          purchaseNotStarted: l.equal(
            "pawTemplateService.offerPurchaseProgress.state",
            s.PAW.OFFER_PURCHASE_STATES.NOT_STARTED,
          ),
          purchaseInProgress: l.equal(
            "pawTemplateService.offerPurchaseProgress.state",
            s.PAW.OFFER_PURCHASE_STATES.IN_PROGRESS,
          ),
          purchaseSuccess: l.equal(
            "pawTemplateService.offerPurchaseProgress.state",
            s.PAW.OFFER_PURCHASE_STATES.SUCCESS,
          ),
          purchaseError: l(
            "pawTemplateService.offerPurchaseProgress.state",
            "pawTemplateService.offerPurchaseProgress.errorKey",
            function () {
              return (
                this.get("pawTemplateService.offerPurchaseProgress.state") ===
                  s.PAW.OFFER_PURCHASE_STATES.FAIL &&
                this.get(
                  `tra.${this.get("pawTemplateService.offerPurchaseProgress.errorKey")}`,
                )
              );
            },
          ),
          purchaseOptions: l(
            "componentData.purchaseOptions",
            "validateError",
            "purchaseError",
            function () {
              const e = [];
              for (
                let t = 0;
                t < this.get("componentData.purchaseOptions").length;
                t++
              )
                e.push({
                  currencyImagePath: this.get(
                    "pawTemplateService",
                  ).getMediaPathFromPurchaseOption(
                    this.get(`componentData.purchaseOptions.${t}`),
                  ),
                  currencyName: this.get(
                    `componentData.purchaseOptions.${t}.currencyName`,
                  ),
                  price: this.get(`componentData.purchaseOptions.${t}.price`),
                  source: this.get(`componentData.purchaseOptions.${t}`),
                  disabled:
                    this.get("validateError") ||
                    this.get("purchaseError") ||
                    this.get(`componentData.purchaseOptions.${t}.disabled`),
                });
              return e;
            },
          ),
          disclaimerAcknowledged: !1,
          showNonRefundableDisclaimer: l(
            "pawTemplateService.nonRefundableDisclaimerEnabled",
            "disclaimerAcknowledged",
            function () {
              return (
                this.get("pawTemplateService.nonRefundableDisclaimerEnabled") &&
                !this.get("disclaimerAcknowledged")
              );
            },
          ),
          showError: l("validateError", "purchaseError", function () {
            return this.get("validateError") || this.get("purchaseError");
          }),
          disclaimerTextPrefix: l(
            "tra.cat_paw_purchase_non_refundable_disclaimer",
            function () {
              return this.get(
                "tra.cat_paw_purchase_non_refundable_disclaimer",
              ).split("{{confirmationLink}}")[0];
            },
          ),
          disclaimerTextSuffix: l(
            "tra.cat_paw_purchase_non_refundable_disclaimer",
            function () {
              return this.get(
                "tra.cat_paw_purchase_non_refundable_disclaimer",
              ).split("{{confirmationLink}}")[1];
            },
          ),
          actions: {
            onPurchaseButton(e) {
              e.disabled ||
                this.get("pawTemplateService").purchaseOffer(e.source);
            },
            onDisclaimerButton() {
              this.set("disclaimerAcknowledged", !0);
            },
          },
        });
        t.default = o;
      },
      (e, t, n) => {
        const a = n(1).Ember;
        e.exports = a.HTMLBars.template({
          id: "7CLTXGYh",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\Releases_14_13\\\\LeagueClientContent_Release\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-paw\\\\src\\\\components\\\\paw-template\\\\purchase-component\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\Releases_14_13\\\\LeagueClientContent_Release\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-paw\\\\src\\\\components\\\\paw-template\\\\purchase-component\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\Releases_14_13\\\\LeagueClientContent_Release\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-paw\\\\src\\\\components\\\\paw-template\\\\purchase-component\\\\index.js\\" "],["text","\\n"],["block",["if"],[["get",["purchaseInProgress"]]],null,10,9]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","              "],["open-element","div",[]],["static-attr","class","paw-template-purchase-button-currency-padding-left"],["flush-element"],["append",["unknown",["purchaseOption","currencyName"]],false],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","              "],["open-element","div",[]],["static-attr","class","paw-template-purchase-button-currency-image"],["dynamic-attr","style",["concat",["background-image:url(",["unknown",["purchaseOption","currencyImagePath"]],")"]]],["flush-element"],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","        "],["open-element","lol-uikit-purchase-button",[]],["static-attr","class","paw-template-purchase-button"],["dynamic-attr","onclick",["helper",["action"],[["get",[null]],"onPurchaseButton",["get",["purchaseOption"]]],null],null],["dynamic-attr","disabled",["unknown",["purchaseOption","disabled"]],null],["flush-element"],["text","\\n          "],["open-element","div",[]],["static-attr","class","paw-template-flex-base"],["flush-element"],["text","\\n"],["block",["if"],[["get",["purchaseOption","currencyImagePath"]]],null,1],["text","            "],["open-element","div",[]],["static-attr","class","paw-template-purchase-button-currency-padding-left"],["flush-element"],["append",["unknown",["purchaseOption","price"]],false],["close-element"],["text","\\n"],["block",["if"],[["get",["purchaseOption","currencyName"]]],null,0],["text","          "],["close-element"],["text","\\n        "],["close-element"],["text","\\n"]],"locals":["purchaseOption"]},{"statements":[["block",["each"],[["get",["purchaseOptions"]]],null,2]],"locals":[]},{"statements":[["text","      "],["open-element","div",[]],["static-attr","class","paw-template-purchase-disclaimer-text"],["flush-element"],["text","\\n        "],["append",["unknown",["disclaimerTextPrefix"]],false],["text"," "],["open-element","a",[]],["static-attr","class","paw-template-purchase-disclaimer-link"],["dynamic-attr","href",["unknown",["tra","cat_paw_purchase_non_refundable_disclaimer_link"]],null],["static-attr","target","_blank"],["flush-element"],["text","\\n          "],["append",["unknown",["tra","cat_paw_purchase_disclaimer_link_text"]],false],["text"," \\n          "],["open-element","div",[]],["static-attr","class","paw-template-purchase-disclaimer-link-icon"],["flush-element"],["text","\\n            "],["open-element","object",[]],["static-attr","type","image/svg+xml"],["dynamic-attr","data","/fe/lol-static-assets/svg/external-link-blue.svg",null],["flush-element"],["close-element"],["text","\\n          "],["close-element"],["text","\\n        "],["close-element"],["text"," "],["append",["unknown",["disclaimerTextSuffix"]],false],["text","\\n      "],["close-element"],["text","\\n      "],["open-element","lol-uikit-flat-button",[]],["static-attr","class","paw-template-purchase-disclaimer-button"],["dynamic-attr","onclick",["helper",["action"],[["get",[null]],"onDisclaimerButton"],null],null],["flush-element"],["text","\\n        "],["append",["unknown",["tra","cat_paw_bundled_disclaimers_ok"]],false],["text","\\n      "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","        "],["open-element","div",[]],["static-attr","class","paw-template-purchase-error"],["flush-element"],["append",["unknown",["purchaseError"]],false],["close-element"],["text","\\n      "]],"locals":[]},{"statements":[["block",["if"],[["get",["purchaseError"]]],null,5]],"locals":[]},{"statements":[["text","        "],["open-element","div",[]],["static-attr","class","paw-template-purchase-error"],["flush-element"],["append",["unknown",["validateError"]],false],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","    "],["open-element","div",[]],["static-attr","class","paw-template-flex-base paw-template-purchase-upper-container"],["flush-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","paw-template-purchase-error-icon"],["flush-element"],["text","\\n        "],["open-element","object",[]],["static-attr","type","image/svg+xml"],["dynamic-attr","data",["unknown",["validationIcon"]],null],["flush-element"],["close-element"],["text","\\n      "],["close-element"],["text","\\n"],["block",["if"],[["get",["validateError"]]],null,7,6],["text","    "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["block",["if"],[["get",["showError"]]],null,8],["text","  "],["open-element","div",[]],["static-attr","class","paw-template-flex-base paw-template-purchase-lower-container"],["flush-element"],["text","\\n"],["block",["if"],[["get",["showNonRefundableDisclaimer"]]],null,4,3],["text","  "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","  "],["open-element","div",[]],["static-attr","class","paw-template-flex-base"],["flush-element"],["text","\\n      "],["append",["helper",["uikit-spinner"],null,[["src"],["/fe/lol-paw/images/spinner.png"]]],false],["text","\\n  "],["close-element"],["text","\\n"]],"locals":[]}],"hasPartials":false}',
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
        var a = n(1),
          s = n(3);
        const { computed: l } = a.Ember;
        var o = a.Ember.Component.extend({
          classNames: ["paw-template-scroll-list"],
          layout: n(44),
          style: n(45),
          pawTemplateService: a.Ember.inject.service("paw-template"),
          scrollListSections: l("componentData.sections", function () {
            const e = [];
            for (
              let t = 0;
              t < this.get("componentData.sections").length;
              t++
            ) {
              const n = [];
              for (
                let e = 0;
                e < this.get(`componentData.sections.${t}.items`).length;
                e++
              ) {
                const a = this.get(
                    `componentData.sections.${t}.items.${e}.thumbnail`,
                  ),
                  s = this.get(`componentData.sections.${t}.items.${e}.image`);
                n.push({
                  sectionIndex: t,
                  itemIndex: e,
                  localizedTitle: this.get(
                    `componentData.sections.${t}.items.${e}.localizedTitle`,
                  ),
                  localizedSubtitle: this.get(
                    `componentData.sections.${t}.items.${e}.localizedSubtitle`,
                  ),
                  localizedRightText: this.get(
                    `componentData.sections.${t}.items.${e}.localizedRightText`,
                  ),
                  imagePath: a
                    ? this.get("pawTemplateService").getMediaPath(a)
                    : null,
                  imageData: s || a,
                });
              }
              e.push({
                isCompact:
                  this.get(`componentData.sections.${t}.displayType`) ===
                  s.PAW.SCROLL_LIST_DISPLAY_TYPES.COMPACT,
                isExpanded:
                  this.get(`componentData.sections.${t}.displayType`) ===
                  s.PAW.SCROLL_LIST_DISPLAY_TYPES.EXPANDED,
                isDetailed:
                  this.get(`componentData.sections.${t}.displayType`) ===
                  s.PAW.SCROLL_LIST_DISPLAY_TYPES.DETAILED,
                localizedTitle: this.get(
                  `componentData.sections.${t}.localizedTitle`,
                ),
                items: n,
              });
            }
            return e;
          }),
          actions: {
            onItemSelected(e) {
              this.get("componentData.onItemSelected") &&
                this.get("componentData.onItemSelected")(e);
            },
          },
        });
        t.default = o;
      },
      (e, t, n) => {
        const a = n(1).Ember;
        e.exports = a.HTMLBars.template({
          id: "rQ+epjvC",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\Releases_14_13\\\\LeagueClientContent_Release\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-paw\\\\src\\\\components\\\\paw-template\\\\scroll-list-component\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\Releases_14_13\\\\LeagueClientContent_Release\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-paw\\\\src\\\\components\\\\paw-template\\\\scroll-list-component\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\Releases_14_13\\\\LeagueClientContent_Release\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-paw\\\\src\\\\components\\\\paw-template\\\\scroll-list-component\\\\index.js\\" "],["text","\\n"],["open-element","lol-uikit-scrollable",[]],["static-attr","class","paw-template-scroll-list-scrollable"],["flush-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","paw-template-scroll-list-container"],["flush-element"],["text","\\n"],["block",["each"],[["get",["scrollListSections"]]],null,6],["text","  "],["close-element"],["text","\\n"],["close-element"]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","              "],["open-element","button",[]],["static-attr","class","paw-template-scroll-list-item paw-template-scroll-list-item-detailed"],["dynamic-attr","onclick",["helper",["action"],[["get",[null]],"onItemSelected",["get",["item"]]],null],null],["flush-element"],["text","\\n                "],["open-element","div",[]],["static-attr","class","paw-template-scroll-list-item-detailed-image-container"],["flush-element"],["text","\\n                  "],["open-element","div",[]],["static-attr","class","paw-template-scroll-list-item-detailed-image"],["dynamic-attr","style",["concat",["background-image:url(",["unknown",["item","imagePath"]],")"]]],["flush-element"],["close-element"],["text","\\n                "],["close-element"],["text","\\n                "],["open-element","div",[]],["static-attr","class","paw-template-scroll-list-item-title-subtitle-container"],["flush-element"],["text","\\n                  "],["open-element","div",[]],["static-attr","class","paw-template-scroll-list-item-title paw-template-scroll-list-item-detailed-title"],["flush-element"],["append",["unknown",["item","localizedTitle"]],false],["close-element"],["text","\\n                  "],["open-element","div",[]],["static-attr","class","paw-template-scroll-list-item-detailed-subtitle"],["flush-element"],["append",["unknown",["item","localizedSubtitle"]],false],["close-element"],["text","\\n                "],["close-element"],["text","\\n                "],["open-element","div",[]],["static-attr","class","paw-template-scroll-list-item-detailed-right-text"],["flush-element"],["append",["unknown",["item","localizedRightText"]],false],["close-element"],["text","\\n              "],["close-element"],["text","\\n            "]],"locals":[]},{"statements":[["block",["if"],[["get",["section","isDetailed"]]],null,0]],"locals":[]},{"statements":[["text","              "],["open-element","button",[]],["static-attr","class","paw-template-scroll-list-item paw-template-scroll-list-item-compact"],["dynamic-attr","onclick",["helper",["action"],[["get",[null]],"onItemSelected",["get",["item"]]],null],null],["flush-element"],["text","\\n              "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["block",["if"],[["get",["section","isCompact"]]],null,2,1]],"locals":[]},{"statements":[["text","              "],["open-element","button",[]],["static-attr","class","paw-template-scroll-list-item paw-template-scroll-list-item-expanded"],["dynamic-attr","onclick",["helper",["action"],[["get",[null]],"onItemSelected",["get",["item"]]],null],null],["flush-element"],["text","\\n                "],["open-element","div",[]],["static-attr","class","paw-template-scroll-list-item-expanded-image-container"],["flush-element"],["text","\\n                  "],["open-element","div",[]],["static-attr","class","paw-template-scroll-list-item-image paw-template-scroll-list-item-expanded-image"],["dynamic-attr","style",["concat",["background-image:url(",["unknown",["item","imagePath"]],")"]]],["flush-element"],["close-element"],["text","\\n                "],["close-element"],["text","\\n                "],["open-element","div",[]],["static-attr","class","paw-template-scroll-list-item-title-subtitle-container"],["flush-element"],["text","\\n                  "],["open-element","div",[]],["static-attr","class","paw-template-scroll-list-item-title paw-template-scroll-list-item-expanded-title"],["flush-element"],["append",["unknown",["item","localizedTitle"]],false],["close-element"],["text","\\n                  "],["open-element","div",[]],["static-attr","class","paw-template-scroll-list-item-expanded-subtitle"],["flush-element"],["append",["unknown",["item","localizedSubtitle"]],false],["close-element"],["text","\\n                "],["close-element"],["text","\\n              "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["block",["if"],[["get",["section","isExpanded"]]],null,4,3]],"locals":["item"]},{"statements":[["text","        "],["open-element","div",[]],["static-attr","class","paw-template-scroll-list-section"],["flush-element"],["text","\\n          "],["open-element","div",[]],["static-attr","class","paw-template-scroll-list-section-title"],["flush-element"],["append",["unknown",["section","localizedTitle"]],false],["close-element"],["text","\\n"],["block",["each"],[["get",["section","items"]]],null,5],["text","        "],["close-element"],["text","\\n"]],"locals":["section"]}],"hasPartials":false}',
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
        var a = n(1);
        const { computed: s } = a.Ember;
        var l = a.Ember.Component.extend({
          classNames: ["paw-template-text"],
          layout: n(47),
          style: n(48),
          pawTemplateService: a.Ember.inject.service("paw-template"),
          text: s.readOnly("componentData.localizedText"),
        });
        t.default = l;
      },
      (e, t, n) => {
        const a = n(1).Ember;
        e.exports = a.HTMLBars.template({
          id: "NEVBD9ey",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\Releases_14_13\\\\LeagueClientContent_Release\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-paw\\\\src\\\\components\\\\paw-template\\\\text-component\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\Releases_14_13\\\\LeagueClientContent_Release\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-paw\\\\src\\\\components\\\\paw-template\\\\text-component\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\Releases_14_13\\\\LeagueClientContent_Release\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-paw\\\\src\\\\components\\\\paw-template\\\\text-component\\\\index.js\\" "],["text","\\n"],["append",["unknown",["text"]],false]],"locals":[],"named":[],"yields":[],"blocks":[],"hasPartials":false}',
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
        var a = n(1);
        const { computed: s } = a.Ember;
        var l = a.Ember.Component.extend({
          classNames: ["paw-template-title-subtitle"],
          layout: n(50),
          style: n(51),
          pawTemplateService: a.Ember.inject.service("paw-template"),
          title: s.readOnly("componentData.localizedTitle"),
          subtitle: s.readOnly("componentData.localizedSubtitle"),
        });
        t.default = l;
      },
      (e, t, n) => {
        const a = n(1).Ember;
        e.exports = a.HTMLBars.template({
          id: "Gb04mR6H",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\Releases_14_13\\\\LeagueClientContent_Release\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-paw\\\\src\\\\components\\\\paw-template\\\\title-subtitle-component\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\Releases_14_13\\\\LeagueClientContent_Release\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-paw\\\\src\\\\components\\\\paw-template\\\\title-subtitle-component\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\Releases_14_13\\\\LeagueClientContent_Release\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-paw\\\\src\\\\components\\\\paw-template\\\\title-subtitle-component\\\\index.js\\" "],["text","\\n"],["open-element","div",[]],["static-attr","class","paw-template-title-subtitle-base paw-template-title-subtitle-title"],["flush-element"],["append",["unknown",["title"]],false],["close-element"],["text","\\n"],["open-element","div",[]],["static-attr","class","paw-template-title-subtitle-base paw-template-title-subtitle-subtitle"],["flush-element"],["append",["unknown",["subtitle"]],false],["close-element"],["text","\\n"]],"locals":[],"named":[],"yields":[],"blocks":[],"hasPartials":false}',
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
        var a = n(1);
        const { computed: s } = a.Ember;
        var l = a.Ember.Component.extend({
          classNames: ["paw-template-vertical-list"],
          layout: n(53),
          style: n(54),
          pawTemplateService: a.Ember.inject.service("paw-template"),
          items: s("componentData.items.[]", function () {
            const e = [];
            for (let t = 0; t < this.get("componentData.items").length; t++) {
              let n, a, s;
              this.get("componentData.items." + t + ".image") &&
                (n = this.get("pawTemplateService").getMediaPath(
                  this.get("componentData.items." + t + ".image"),
                )),
                this.get("componentData.items." + t + ".localizedName") &&
                  (a = this.get("componentData.items." + t + ".localizedName")),
                this.get(
                  "componentData.items." + t + ".localizedDescription",
                ) &&
                  (s = this.get(
                    "componentData.items." + t + ".localizedDescription",
                  )),
                e.push({ imagePath: n, name: a, description: s });
            }
            return e;
          }),
        });
        t.default = l;
      },
      (e, t, n) => {
        const a = n(1).Ember;
        e.exports = a.HTMLBars.template({
          id: "OZ4wy4NA",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\Releases_14_13\\\\LeagueClientContent_Release\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-paw\\\\src\\\\components\\\\paw-template\\\\vertical-list-component\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\Releases_14_13\\\\LeagueClientContent_Release\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-paw\\\\src\\\\components\\\\paw-template\\\\vertical-list-component\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\Releases_14_13\\\\LeagueClientContent_Release\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-paw\\\\src\\\\components\\\\paw-template\\\\vertical-list-component\\\\index.js\\" "],["text","\\n"],["block",["each"],[["get",["items"]]],null,3]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","        "],["open-element","div",[]],["static-attr","class","paw-template-vertical-list-element-description"],["flush-element"],["text","\\n          "],["append",["unknown",["item","description"]],false],["text","\\n        "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","        "],["open-element","div",[]],["static-attr","class","paw-template-vertical-list-element-name"],["flush-element"],["text","\\n          "],["append",["unknown",["item","name"]],false],["text","\\n        "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","      "],["open-element","div",[]],["static-attr","class","paw-template-vertical-list-element-image"],["dynamic-attr","style",["concat",["background-image:url(",["unknown",["item","imagePath"]],")"]]],["flush-element"],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","  "],["open-element","div",[]],["static-attr","class","paw-template-vertical-list-element"],["flush-element"],["text","\\n"],["block",["if"],[["get",["item","imagePath"]]],null,2],["text","    \\n    "],["open-element","div",[]],["static-attr","class","paw-template-vertical-list-element-text-container"],["flush-element"],["text","\\n"],["block",["if"],[["get",["item","name"]]],null,1],["text","      \\n"],["block",["if"],[["get",["item","description"]]],null,0],["text","    "],["close-element"],["text","\\n  "],["close-element"],["text","\\n"]],"locals":["item"]}],"hasPartials":false}',
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
        var a = n(1),
          s = n(3);
        const { computed: l } = a.Ember;
        var o = a.Ember.Component.extend({
          classNames: ["paw-template-window"],
          layout: n(56),
          style: n(57),
          pawTemplateService: a.Ember.inject.service("paw-template"),
          isLargeTwoColumnLandscapeTemplate: l(
            "pawTemplateService.pawTemplateDataCache.template.templateType",
            function () {
              return (
                this.get(
                  "pawTemplateService.pawTemplateDataCache.template.templateType",
                ) === s.PAW.TEMPLATE_TYPES.LARGE_TWO_COLUMN_LANDSCAPE
              );
            },
          ),
        });
        t.default = o;
      },
      (e, t, n) => {
        const a = n(1).Ember;
        e.exports = a.HTMLBars.template({
          id: "2+VtHGcL",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\Releases_14_13\\\\LeagueClientContent_Release\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-paw\\\\src\\\\components\\\\paw-template\\\\window-component\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\Releases_14_13\\\\LeagueClientContent_Release\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-paw\\\\src\\\\components\\\\paw-template\\\\window-component\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\Releases_14_13\\\\LeagueClientContent_Release\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-paw\\\\src\\\\components\\\\paw-template\\\\window-component\\\\index.js\\" "],["text","\\n"],["block",["if"],[["get",["isLargeTwoColumnLandscapeTemplate"]]],null,0]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","    "],["append",["unknown",["paw-template-large-two-column-landscape-template"]],false],["text","\\n"]],"locals":[]}],"hasPartials":false}',
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
          (t.default = function (e, t) {
            return {
              templateType: a.PAW.TEMPLATE_TYPES.LARGE_TWO_COLUMN_LANDSCAPE,
              components: [
                {
                  componentType: a.PAW.COMPONENT_TYPES.MEDIA,
                  media: {
                    type: a.PAW.MEDIA_TYPES.VIDEO,
                    loadType: a.PAW.MEDIA_LOAD_TYPES.GAME_DATA,
                    location: e.items[0].largeVideoPath,
                  },
                  caption: {
                    localizedTitle: e.items[0].localizedShortName,
                    index: 1,
                    total: e.items.length,
                  },
                },
                {
                  componentType: a.PAW.COMPONENT_TYPES.IMAGE_CAROUSEL,
                  images: o(e),
                  localizedAssociatedTextData: s(e),
                },
                {
                  componentType: a.PAW.COMPONENT_TYPES.TITLE_SUBTITLE,
                  localizedTitle: e.localizedName,
                  localizedSubtitle: t.get("cat_paw_skin_line"),
                },
                {
                  componentType: a.PAW.COMPONENT_TYPES.SCROLL_LIST,
                  sections: [
                    {
                      displayType: a.PAW.SCROLL_LIST_DISPLAY_TYPES.EXPANDED,
                      items: i(e),
                    },
                    {
                      displayType: a.PAW.SCROLL_LIST_DISPLAY_TYPES.DETAILED,
                      localizedTitle: t.get(
                        "cat_paw_skin_line_purchase_summary",
                      ),
                      items: c(e, t),
                    },
                  ],
                },
                {
                  componentType: a.PAW.COMPONENT_TYPES.PURCHASE,
                  purchaseOptions: r(e),
                },
              ],
              componentConnections: [{ source: 1, connections: [0] }],
              purchaseSuccessInfo: {
                purchaseSuccessImage: {
                  type: a.PAW.MEDIA_TYPES.IMAGE,
                  loadType: a.PAW.MEDIA_LOAD_TYPES.GAME_DATA,
                  location: e.uncenteredSplashPath,
                },
                purchaseSuccessItemName: e.localizedName,
                purchaseSuccessItemDescription: l(e, t),
              },
            };
          });
        var a = n(3);
        function s(e) {
          const t = [];
          for (let n = 0; n < e.items.length; n++)
            t.push(e.items[n].localizedShortName);
          return t;
        }
        function l(e, t) {
          return t.formatString(
            "cat_pawt_celebration_unlocked_message_skin_line",
            { successItemName: e.localizedName },
          );
        }
        function o(e) {
          const t = [];
          for (let n = 0; n < e.items.length; n++)
            t.push({
              thumbnail: {
                type: a.PAW.MEDIA_TYPES.IMAGE,
                loadType: a.PAW.MEDIA_LOAD_TYPES.GAME_DATA,
                location:
                  e.items[n].largeImagePath || e.items[n].thumbnailImagePath,
              },
              large: {
                type: a.PAW.MEDIA_TYPES.IMAGE,
                loadType: a.PAW.MEDIA_LOAD_TYPES.GAME_DATA,
                location:
                  e.items[n].largeImagePath || e.items[n].thumbnailImagePath,
              },
              video: {
                type: a.PAW.MEDIA_TYPES.VIDEO,
                loadType: a.PAW.MEDIA_LOAD_TYPES.GAME_DATA,
                location: e.items[n].largeVideoPath,
              },
            });
          return t;
        }
        function i(e) {
          const t = [];
          for (let n = 0; n < e.skinLineDescriptions.length; n++)
            t.push({
              localizedTitle: e.skinLineDescriptions[n].title,
              localizedSubtitle: e.skinLineDescriptions[n].description,
              thumbnail: {
                type: a.PAW.MEDIA_TYPES.IMAGE,
                loadType: a.PAW.MEDIA_LOAD_TYPES.LOCAL_ASSET,
                location: e.skinLineDescriptions[n].iconImagePath,
              },
            });
          return t;
        }
        function c(e, t) {
          const n = [];
          for (let s = 0; s < e.items.length; s++)
            n.push({
              localizedTitle: e.items[s].localizedLongName,
              localizedSubtitle:
                0 === s
                  ? t.get("cat_paw_skin_line_purchase_summary_base")
                  : t.get("cat_paw_skin_line_purchase_summary_extras"),
              thumbnail: {
                type: a.PAW.MEDIA_TYPES.IMAGE,
                loadType: a.PAW.MEDIA_LOAD_TYPES.GAME_DATA,
                location: e.items[s].thumbnailImagePath,
              },
            });
          return n;
        }
        function r(e) {
          const t = [];
          for (let n = 0; n < e.pricingOptions.length; n++)
            t.push({
              price: e.pricingOptions[n].price,
              currencyType: e.pricingOptions[n].currencyType,
              currencyPaymentOption: e.pricingOptions[n].currencyPaymentOption,
              currencyName: e.pricingOptions[n].currencyName,
              currencyImagePath: e.pricingOptions[n].currencyImagePath,
            });
          return t;
        }
      },
      (e, t, n) => {
        "use strict";
        var a = n(1),
          s = n(3),
          l = m(n(30)),
          o = m(n(60)),
          i = m(n(61)),
          c = n(26),
          r = n(27),
          p = n(62);
        function m(e) {
          return e && e.__esModule ? e : { default: e };
        }
        const { Component: u, computed: d } = a.Ember,
          h = [i.default.Errors.NOT_ENOUGH_CURRENCY],
          g = [
            i.default.Errors.NOT_ENOUGH_CURRENCY,
            i.default.Errors.PARENT_NOT_OWNED,
          ],
          _ = u.extend(l.default, {
            isLoadingCatalogItemInfo: !0,
            layout: n(63),
            style: n(64),
            inventoryType: null,
            itemId: null,
            items: null,
            pawTemplateData: null,
            supportsMultipleItems: d.notEmpty("items"),
            purchaseRequestFinished: !1,
            currentRmsNotificationTransactionId: "",
            currentRmsNotificationTimer: null,
            purchaseWidgetService: a.Ember.inject.service("purchaseWidget"),
            nonRefundableDisclaimerEnabled: d.readOnly(
              "pawConfig.nonRefundableDisclaimerEnabled",
            ),
            alwaysShowPurchaseDisclaimer: d.readOnly(
              "pawConfig.alwaysShowPurchaseDisclaimer",
            ),
            isPotatoModeEnabled: d.readOnly(
              "userExperience.data.potatoModeEnabled",
            ),
            itemPurchaseOption: d.readOnly("catalogItemPurchaseOption.item"),
            dependencies: d.readOnly("catalogItemPurchaseOption.dependencies"),
            bundledItems: d.readOnly("catalogItemPurchaseOption.bundledItems"),
            purchaseOptions: d.readOnly(
              "catalogItemPurchaseOption.purchaseOptions",
            ),
            sale: d.readOnly("catalogItemPurchaseOption.sale"),
            validationErrors: d.readOnly(
              "catalogItemPurchaseOption.validationErrors",
            ),
            pawTemplateService: a.Ember.inject.service("paw-template"),
            isPawTemplateModal: d.notEmpty("pawTemplateData"),
            pendingRmsNotification: d(
              "purchaseWidgetService.orderNotifications.[]",
              "currentRmsNotificationTransactionId",
              function () {
                const e = this.get("currentRmsNotificationTransactionId");
                if (!e) return !1;
                const t = (
                    this.get("purchaseWidgetService.orderNotifications") || []
                  ).filter((t) => t.eventTypeId === e),
                  n = t.find((e) => "COMPLETE" === e.status),
                  a = t.find((e) => "FAILED" === e.status);
                return (
                  n
                    ? (this._clearTimeoutTimer(),
                      this.set("currentRmsNotificationTransactionId", ""),
                      this._handlePurchaseCompleted({ transactionId: e }))
                    : a &&
                      (this._clearTimeoutTimer(),
                      this._handleRmsNotificationFailed()),
                  !n && !a
                );
              },
            ),
            purchaseSuccess: d(
              "purchaseRequestFinished",
              "pendingRmsNotification",
              function () {
                return (
                  this.get("purchaseRequestFinished") &&
                  !this.get("pendingRmsNotification")
                );
              },
            ),
            showCelebrationVideo: d(
              "isPotatoModeEnabled",
              "purchaseSuccess",
              "supportsMultipleItems",
              function () {
                return (
                  !this.get("isPotatoModeEnabled") &&
                  this.get("purchaseSuccess") &&
                  !this.get("supportsMultipleItems")
                );
              },
            ),
            isBundledItem: d("itemPurchaseOption", function () {
              const e = this.get("itemPurchaseOption");
              return e && e.inventoryType === s.PAW.INVENTORY_TYPES.BUNDLES;
            }),
            contentRendererComponent: d("itemPurchaseOption", function () {
              const e = this.get("itemPurchaseOption");
              return e &&
                e.inventoryType === s.PAW.INVENTORY_TYPES.BUNDLES &&
                e.subInventoryType === o.default.CHROMA_BUNDLE
                ? "chroma-bundle-details"
                : "item-details";
            }),
            wallet: d("rpWallet.RP", "ipWallet.lol_blue_essence", function () {
              const e = this.get("rpWallet.RP") || 0,
                t = this.get("ipWallet.lol_blue_essence") || 0;
              return a.Ember.Object.create({ RP: e, IP: t });
            }),
            topBannerErrorMessage: d("validationErrors", function () {
              return this._findErrorMessage(this.get("validationErrors"), !0);
            }),
            bottomErrorMessage: d("validationErrors", function () {
              return this._findErrorMessage(this.get("validationErrors"), !1);
            }),
            bundleErrorMessage: d("validationErrors", function () {
              return this._findErrorMessageForBundle(
                this.get("validationErrors"),
              );
            }),
            showBundlesSplashPawModal: d(
              "isBundledItem",
              "catalogItemPurchaseOption",
              function () {
                return !(
                  !this.get("isBundledItem") ||
                  !this.get("catalogItemPurchaseOption.pawSplashImage")
                );
              },
            ),
            init() {
              this._super(...arguments),
                this.get("isPawTemplateModal") &&
                  this.get("pawTemplateService").initializeWithData(
                    this.get("pawTemplateData"),
                  );
            },
            didInsertElement() {
              this._super(...arguments),
                this.get("isPawTemplateModal")
                  ? this.get("pawTemplateService").validateOffer()
                  : this._loadCatalogItemInfo();
            },
            actions: {
              purchase(e) {
                this._purchase(e);
              },
            },
            willDestroy() {
              this.set("onPurchased", null),
                this._clearTimeoutTimer(),
                this._super(...arguments);
            },
            _purchase(e) {
              this.set("isPurchasing", !0);
              const t = this.get("purchaseWidgetService"),
                n = this.get("source");
              return t
                .purchaseItem(e, n)
                .then(this._handlePurchaseRequestFinished.bind(this))
                .catch(this._handlePurchaseError.bind(this));
            },
            _extractPurchaseResultInfo(e) {
              const t = e && e.items && e.items.length > 0,
                n = e && e.transactions && e.transactions.length > 0;
              return {
                itemIds: t
                  ? e.items
                      .filter((e) => e.itemKey)
                      .map((e) => e.itemKey.itemId)
                  : [],
                inventoryTypes: t
                  ? e.items
                      .filter((e) => e.itemKey)
                      .map((e) => e.itemKey.inventoryType)
                  : [],
                sources: t
                  ? e.items.filter((e) => e.source).map((e) => e.source)
                  : [],
                transactionIds: n
                  ? e.transactions
                      .filter((e) => e.transactionId)
                      .map((e) => e.transactionId)
                  : [],
              };
            },
            _handlePurchaseRequestFinished(e) {
              if (
                (this.set("purchaseRequestFinished", !0),
                e && e.useRMSConfirmation)
              ) {
                const t =
                  e.transactions &&
                  e.transactions[0] &&
                  e.transactions[0].transactionId;
                if (!t)
                  return void this._handlePurchaseError({
                    data: {
                      errorDetails: {
                        error:
                          "Purchase error: received useRMSConfirmation=true but could not find a transactionId",
                      },
                    },
                  });
                this.set("currentRmsNotificationTransactionId", t);
                const n = setTimeout(() => {
                  this._handleRmsNotificationTimeout();
                }, r.MAX_WAITING_TIME_IN_MS);
                this.set("currentRmsNotificationTimer", n);
              } else this._handlePurchaseCompleted(e);
            },
            _handlePurchaseCompleted(e) {
              const t = this._extractPurchaseResultInfo(e);
              a.Telemetry.sendCustomData(c.TELEMETRY_EVENT_NAME, {
                id: c.TELEMETRY_EVENT_ID.PURCHASE_SUCCESS,
                purchaseDetails: JSON.stringify(e),
                itemIds: t.itemIds,
                inventoryTypes: t.inventoryTypes,
                sources: t.sources,
                transactionIds: t.transactionIds,
              }),
                this.set("isPurchasing", !1);
              const n = this.get("onPurchased");
              n && n(e);
            },
            _handlePurchaseError(e) {
              if (
                (this.set("isPurchasing", !1),
                a.privateAPI.removePAWModal(),
                e instanceof Error)
              )
                return (
                  a.Telemetry.sendCustomData(c.TELEMETRY_EVENT_NAME, {
                    id: c.TELEMETRY_EVENT_ID.PURCHASE_FAILED,
                    errorType: c.TELEMETRY_ERROR_MESSAGES.INTERNAL_ERROR,
                    errorName: e.name,
                    errorMessage: e.message,
                  }),
                  a.privateAPI.createErrorModal({
                    contents: this.get("tra.cat_paw_error_generic"),
                  })
                );
              const t = Object.keys(e.data.errorDetails);
              let n = this.get("tra.cat_paw_error_generic");
              if (t.length) {
                const e = `cat_paw_error_${t[0].replace(/\./g, "_")}`;
                this.get("tra").exists(e) && (n = this.get(`tra.${e}`));
              }
              a.Telemetry.sendCustomData(c.TELEMETRY_EVENT_NAME, {
                id: c.TELEMETRY_EVENT_ID.PURCHASE_FAILED,
                errorType: c.TELEMETRY_ERROR_MESSAGES.EXTERNAL_ERROR,
                errorMessage: n,
                errorDetails: JSON.stringify(e.data.errorDetails),
              }),
                a.privateAPI.createErrorModal({ contents: n });
            },
            _handleRmsNotificationTimeout() {
              const e = this.get("currentRmsNotificationTransactionId"),
                t = this.get("purchaseWidgetService.orderNotifications") || [];
              let n = "NOT_STARTED";
              for (let a = t.length - 1; a >= 0; a--) {
                const s = t[a];
                if (s.eventTypeId === e) {
                  n = s.status;
                  break;
                }
              }
              const a = {
                error: `Purchase error: timed out when waiting for RMS completed notification for transaction: ${e}, final status was: ${n}`,
              };
              this._handlePurchaseError({ data: { errorDetails: a } }),
                this.set("currentRmsNotificationTransactionId", "");
            },
            _handleRmsNotificationFailed() {
              const e = {
                error: `Purchase error: failed RMS notification for transaction: ${this.get("currentRmsNotificationTransactionId")}`,
              };
              this._handlePurchaseError({ data: { errorDetails: e } }),
                this.set("currentRmsNotificationTransactionId", "");
            },
            _loadSingleCatalogItemInfo() {
              const e = this.get("purchaseWidgetService"),
                t = this.get("itemId"),
                n = this.get("inventoryType"),
                s = {
                  id: c.TELEMETRY_EVENT_ID.START_LOADING_ITEM,
                  itemId: t,
                  inventoryType: n,
                };
              a.Telemetry.sendCustomData(c.TELEMETRY_EVENT_NAME, s),
                Promise.race([
                  this._getTimeoutPromise(r.MAX_WAITING_TIME_IN_MS),
                  e.getItem(t, n),
                ])
                  .then(this._handleCatalogItemPurchaseOption.bind(this))
                  .catch(this._handleCatalogItemInfoError.bind(this));
            },
            _loadMultipleCatalogItemInfo() {
              const e = this.get("purchaseWidgetService"),
                t = this.get("items.itemIds"),
                n = this.get("items.inventoryType"),
                s = {
                  id: c.TELEMETRY_EVENT_ID.START_LOADING_ITEM,
                  itemIds: t,
                  inventoryType: n,
                };
              a.Telemetry.sendCustomData(c.TELEMETRY_EVENT_NAME, s),
                Promise.race([
                  this._getTimeoutPromise(r.MAX_WAITING_TIME_IN_MS),
                  e.getItems(t, n),
                ])
                  .then(this._handleCatalogItemPurchaseOption.bind(this))
                  .catch(this._handleCatalogItemInfoError.bind(this));
            },
            _loadCatalogItemInfo() {
              this._showLoadingSpinner();
              this.get("supportsMultipleItems")
                ? this._loadMultipleCatalogItemInfo()
                : this._loadSingleCatalogItemInfo();
            },
            _handleCatalogItemPurchaseOption(e) {
              if (e) {
                const t = this._transformCatalogItemMetadata(e);
                this.set("catalogItemPurchaseOption", t);
              } else {
                const e = this._getCatalogPurchaseOptionWithValidationErrors([
                  i.default.Errors.UNKNOWN_ITEM,
                ]);
                this.set("catalogItemPurchaseOption", e);
              }
              this._hideLoadingSpinner(),
                a.Telemetry.sendCustomData(c.TELEMETRY_EVENT_NAME, {
                  id: c.TELEMETRY_EVENT_ID.LOAD_ITEM_SUCCESS,
                });
            },
            _handleCatalogItemInfoError(e) {
              a.logger.error(
                "Purchasable item retrieval error or timeout: ",
                e,
              );
              let t = e;
              e instanceof Error || e instanceof TypeError
                ? ((t = this._getCatalogPurchaseOptionWithValidationErrors([
                    i.default.Errors.GENERIC_ERROR,
                  ])),
                  a.Telemetry.sendCustomData(c.TELEMETRY_EVENT_NAME, {
                    id: c.TELEMETRY_EVENT_ID.LOAD_ITEM_FAIL,
                    errorType: "JS error",
                    errorName: e.name,
                    errorMessage: e.message,
                  }))
                : a.Telemetry.sendCustomData(c.TELEMETRY_EVENT_NAME, {
                    id: c.TELEMETRY_EVENT_ID.LOAD_ITEM_FAIL,
                    errorType: "Validation error",
                    validationErrors: t.validationErrors,
                  }),
                this.set("catalogItemPurchaseOption", t),
                this._hideLoadingSpinner();
            },
            _transformCatalogItemMetadata(e) {
              const t = e.item;
              if (t && t.metadata && t.metadata.length) {
                const n = t.metadata
                  .map((e) => {
                    if ("DYNAMIC_TAG" !== e.type) return null;
                    let t;
                    try {
                      t = JSON.parse(e.value);
                    } catch (e) {
                      return null;
                    }
                    return t &&
                      t.tag &&
                      (0, p.isNowWithinActivationDates)(
                        t.activeDate,
                        t.inactiveDate,
                      )
                      ? t.tag
                      : null;
                  })
                  .filter((e) => !!e);
                return (
                  t.metadata.forEach(({ type: t, value: n }) => {
                    switch (t) {
                      case "HIDDEN_BUNDLE_ITEMS":
                        try {
                          e.hiddenBundleItems = JSON.parse(n);
                        } catch (e) {
                          a.logger.warning(
                            "Cannot parse HIDDEN_BUNDLE_ITEMS JSON, defaulting to hiding no items",
                            e,
                          );
                        }
                        return;
                      case "PAW_SPLASH_IMAGE":
                        e.pawSplashImage = n;
                    }
                  }),
                  n.length
                    ? { ...e, item: { ...t, tags: t.tags.concat(n) } }
                    : e
                );
              }
              return e;
            },
            _showLoadingSpinner() {
              this.set("isLoadingCatalogItemInfo", !0);
            },
            _hideLoadingSpinner() {
              this.set("isLoadingCatalogItemInfo", !1);
            },
            _findErrorMessage(e, t) {
              if (e && e.length > 0) {
                const n = e.filter((e) => t === g.includes(e));
                if (n.length > 0) return this.get(`tra.${n[0].messageKey}`);
              }
              return null;
            },
            _findErrorMessageForBundle(e) {
              const t = e.filter((e) => !h.includes(e));
              return t.length > 0 ? this.get(`tra.${t[0].messageKey}`) : null;
            },
            _getTimeoutPromise: (e) =>
              new Promise(function (t, n) {
                setTimeout(function () {
                  n(new Error(`Request has not return after ${e}ms`));
                }, e);
              }),
            _clearTimeoutTimer() {
              const e = this.get("currentRmsNotificationTimer");
              e &&
                (clearTimeout(e),
                this.set("currentRmsNotificationTransactionId", null));
            },
            _getCatalogPurchaseOptionWithValidationErrors: (e) =>
              a.Ember.Object.create({
                purchaseOptions: [],
                dependencies: [],
                bundledItems: [],
                validationErrors: e,
              }),
          });
        e.exports = _;
      },
      (e, t) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        t.default = {
          CHROMA: "RECOLOR",
          CHROMA_BUNDLE: "CHROMA_BUNDLE",
          STATSTONES_BUNDLE: "STATSTONES_BUNDLE",
        };
      },
      (e, t) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        class n {
          constructor(e) {
            (this.id = e), (this.messageKey = this._buildMessageKey(e));
          }
          _buildMessageKey(e) {
            return `cat_paw_error_${e.replace(/\./g, "_")}`;
          }
        }
        const a = {
            ALREADY_OWNED: "validation.item.owned",
            BASE_SKIN_NOT_OWNED: "validation.item.base.skin.not.owned",
            MALFORMED: "validation.item.malformed",
            MISSING_REQUEST_FIELDS: "validation.request.missing.fields",
            NO_PRICE: "validation.item.no.price",
            NOT_ENOUGH_CURRENCY: "validation.item.not.enough.currency",
            NOT_VALID: "validation.not.valid",
            OVER_LIMIT: "validation.item.over.limit",
            PARENT_NOT_OWNED: "validation.item.parent.not.owned",
            UNKNOWN_ITEM: "validation.item.nonexistant",
            UNPURCHASABLE_ITEM: "validation.item.not.active",
            PAW_ITEM_PURCHASE_DISABLED: "validation.item.paw.purchase.disabled",
            CONNECTION_TIME_OUT: "validation.connection.failed",
          },
          s = {
            ALREADY_OWNED: new n("validation.item.owned"),
            GENERIC_ERROR: new n("validation.generic"),
            NOT_ENOUGH_CURRENCY: new n("validation.item.not.enough.currency"),
            NOT_VALID: new n("validation.not.valid"),
            UNSUPPORTED_INVENTORY_TYPE: new n("validation.not.valid"),
            UNKNOWN_ITEM: new n("validation.item.nonexistant"),
            UNPURCHASABLE_ITEM: new n("validation.item.not.active"),
            BASE_SKIN_NOT_OWNED: new n("validation.item.base.skin.not.owned"),
            PARENT_NOT_OWNED: new n("validation.item.parent.not.owned"),
            PAW_ITEM_PURCHASE_DISABLED: new n(
              "validation.item.purchase.disabled",
            ),
            CONNECTION_TIME_OUT: new n("validation.generic"),
          },
          l = new Map([
            [a.ALREADY_OWNED, s.ALREADY_OWNED],
            [a.BASE_SKIN_NOT_OWNED, s.BASE_SKIN_NOT_OWNED],
            [a.PARENT_NOT_OWNED, s.PARENT_NOT_OWNED],
            [a.UNKNOWN_ITEM, s.UNKNOWN_ITEM],
            [a.UNPURCHASABLE_ITEM, s.UNPURCHASABLE_ITEM],
            [a.NOT_ENOUGH_CURRENCY, s.NOT_ENOUGH_CURRENCY],
            [a.ALREADY_OWNED, s.ALREADY_OWNED],
            [a.MALFORMED, s.NOT_VALID],
            [a.NO_PRICE, s.NOT_VALID],
            [a.OVER_LIMIT, s.NOT_VALID],
            [a.MISSING_REQUEST_FIELDS, s.NOT_VALID],
            [a.NOT_VALID, s.NOT_VALID],
            [a.PAW_ITEM_PURCHASE_DISABLED, s.PAW_ITEM_PURCHASE_DISABLED],
            [a.CONNECTION_TIME_OUT, s.CONNECTION_TIME_OUT],
          ]);
        var o = {
          Errors: s,
          fromErrorKey: function (e) {
            let t = s.GENERIC_ERROR;
            return l.has(e) && (t = l.get(e)), t;
          },
          ValidationErrorKeys: a,
        };
        t.default = o;
      },
      (e, t) => {
        "use strict";
        function n(e) {
          return new Date(e);
        }
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.isNowWithinActivationDates = function (e = null, t = null) {
            const a = new Date();
            if (e) {
              const t = n(e) - a;
              if (isNaN(t) || t > 0) return !1;
            }
            if (t) {
              const e = n(t) - a;
              if (isNaN(e) || e < 0) return !1;
            }
            return !0;
          }),
          (t.parseDate = n);
      },
      (e, t, n) => {
        const a = n(1).Ember;
        e.exports = a.HTMLBars.template({
          id: "5UUO8PJ/",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\Releases_14_13\\\\LeagueClientContent_Release\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-paw\\\\src\\\\components\\\\paw-root-component\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\Releases_14_13\\\\LeagueClientContent_Release\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-paw\\\\src\\\\components\\\\paw-root-component\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\Releases_14_13\\\\LeagueClientContent_Release\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-paw\\\\src\\\\components\\\\paw-root-component\\\\index.js\\" "],["text","\\n"],["open-element","lol-uikit-dialog-frame",[]],["static-attr","class","dialog-frame"],["static-attr","dismissable","true"],["static-attr","dismissable-type","inside"],["static-attr","no-default-padding",""],["static-attr","dismissable-icon-background",""],["flush-element"],["text","\\n"],["block",["if"],[["get",["isPawTemplateModal"]]],null,8,7],["close-element"],["text","\\n"]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","          "],["append",["unknown",["celebration-video"]],false],["text","\\n"]],"locals":[]},{"statements":[["text","              "],["append",["helper",["top-banner"],null,[["sale","itemPurchaseOption","message"],[["get",["sale"]],["get",["itemPurchaseOption"]],["get",["topBannerErrorMessage"]]]]],false],["text","\\n              "],["append",["helper",["component"],[["get",["contentRendererComponent"]]],[["itemPurchaseOption","dependencies","bundledItems","purchaseSuccess"],[["get",["itemPurchaseOption"]],["get",["dependencies"]],["get",["bundledItems"]],["get",["purchaseSuccess"]]]]],false],["text","\\n              "],["append",["helper",["purchase-options"],null,[["wallet","itemPurchaseOption","purchaseOptions","alwaysShowPurchaseDisclaimer","purchaseSuccess","isPurchasing","itemUnlockedMessage","errorMessage","purchase"],[["get",["wallet"]],["get",["itemPurchaseOption"]],["get",["purchaseOptions"]],["get",["alwaysShowPurchaseDisclaimer"]],["get",["purchaseSuccess"]],["get",["isPurchasing"]],["get",["itemUnlockedMessage"]],["get",["bottomErrorMessage"]],"purchase"]]],false],["text","\\n"]],"locals":[]},{"statements":[["text","              "],["append",["helper",["bundle-root"],null,[["catalogItemPurchaseOption","itemPurchaseOption","wallet","purchaseOptions","alwaysShowPurchaseDisclaimer","purchaseSuccess","isPurchasing","errorMessage","validationErrors","purchase"],[["get",["catalogItemPurchaseOption"]],["get",["itemPurchaseOption"]],["get",["wallet"]],["get",["purchaseOptions"]],["get",["alwaysShowPurchaseDisclaimer"]],["get",["purchaseSuccess"]],["get",["isPurchasing"]],["get",["bundleErrorMessage"]],["get",["validationErrors"]],"purchase"]]],false],["text","\\n"]],"locals":[]},{"statements":[["block",["if"],[["get",["isBundledItem"]]],null,2,1]],"locals":[]},{"statements":[["text","            "],["append",["helper",["paw-choice"],null,[["choices","wallet","purchaseOptions","alwaysShowPurchaseDisclaimer","purchaseSuccess","isPurchasing","errorMessage","purchase"],[["get",["catalogItemPurchaseOption","choices"]],["get",["wallet"]],["get",["purchaseOptions"]],["get",["alwaysShowPurchaseDisclaimer"]],["get",["purchaseSuccess"]],["get",["isPurchasing"]],["get",["bottomErrorMessage"]],"purchase"]]],false],["text","\\n"]],"locals":[]},{"statements":[["text","        "],["open-element","div",[]],["dynamic-attr","class",["concat",["paw-content ",["helper",["if"],[["get",["supportsMultipleItems"]],"no-padding"],null]]]],["flush-element"],["text","\\n"],["block",["if"],[["get",["supportsMultipleItems"]]],null,4,3],["text","        "],["close-element"],["text","\\n"],["block",["if"],[["get",["showCelebrationVideo"]]],null,0]],"locals":[]},{"statements":[["text","        "],["open-element","div",[]],["static-attr","class","spinner-wrapper"],["flush-element"],["text","\\n          "],["append",["helper",["uikit-spinner"],null,[["src"],["/fe/lol-paw/images/spinner.png"]]],false],["text","\\n        "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","    "],["open-element","div",[]],["dynamic-attr","class",["concat",["paw-window ",["helper",["if"],[["get",["supportsMultipleItems"]],"paw-window-choice"],null]," ",["helper",["if"],[["get",["showBundlesSplashPawModal"]],"paw-window-bundles-splash"],null]]]],["flush-element"],["text","\\n"],["block",["if"],[["get",["isLoadingCatalogItemInfo"]]],null,6,5],["text","    "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","    "],["append",["unknown",["paw-template-window"]],false],["text","\\n"]],"locals":[]}],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, n) => {
        "use strict";
        n.r(t);
      },
      (e, t, n) => {
        "use strict";
        var a = n(1),
          s = n(62);
        const { Component: l, computed: o } = a.Ember,
          i = l.extend({
            classNames: ["paw-top-banner", "fade-in"],
            layout: n(66),
            style: n(67),
            saleValue: o("sale.discount", function () {
              return Math.round(this.get("sale.discount"));
            }),
            isOnSale: o.bool("sale"),
            extraDecoratorBadges: o("itemPurchaseOption", function () {
              const e = this.get("itemPurchaseOption");
              return e && e.metadata && e.metadata.length
                ? e.metadata
                    .map((e) => {
                      if ("EXTRA_STORE_CARD_DECORATOR_BADGE" !== e.type)
                        return null;
                      let t;
                      try {
                        t = JSON.parse(e.value);
                      } catch (e) {
                        return null;
                      }
                      return t &&
                        t.icon &&
                        t.position &&
                        (0, s.isNowWithinActivationDates)(
                          t.activeDate,
                          t.inactiveDate,
                        )
                        ? {
                            className: `badge-position-${t.position}`,
                            imageUrl: `url(/fe/lol-paw/images/${t.icon}-banner.png)`,
                          }
                        : null;
                    })
                    .filter((e) => !!e)
                : null;
            }),
          });
        e.exports = i;
      },
      (e, t, n) => {
        const a = n(1).Ember;
        e.exports = a.HTMLBars.template({
          id: "kjhFrkPG",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\Releases_14_13\\\\LeagueClientContent_Release\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-paw\\\\src\\\\components\\\\ui\\\\top-banner-component\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\Releases_14_13\\\\LeagueClientContent_Release\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-paw\\\\src\\\\components\\\\ui\\\\top-banner-component\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\Releases_14_13\\\\LeagueClientContent_Release\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-paw\\\\src\\\\components\\\\ui\\\\top-banner-component\\\\index.js\\" "],["text","\\n"],["block",["if"],[["get",["message"]]],null,4],["block",["if"],[["get",["isOnSale"]]],null,3],["block",["if"],[["get",["extraDecoratorBadges"]]],null,2]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","      "],["open-element","div",[]],["dynamic-attr","class",["concat",["item-metadata-decorator-badge ",["unknown",["badge","className"]]]]],["dynamic-attr","style",["concat",["background-image: ",["unknown",["badge","imageUrl"]]]]],["flush-element"],["close-element"],["text","\\n"]],"locals":["badge"]},{"statements":[["block",["each"],[["get",["extraDecoratorBadges"]]],null,0]],"locals":[]},{"statements":[["block",["if"],[["get",["extraDecoratorBadges","length"]]],null,1]],"locals":[]},{"statements":[["text","  "],["open-element","div",[]],["static-attr","class","on-sale-banner"],["flush-element"],["text","\\n    -"],["append",["unknown",["saleValue"]],false],["text","%\\n  "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","  "],["open-element","div",[]],["static-attr","class","error-message"],["flush-element"],["text","\\n    "],["append",["unknown",["message"]],false],["text","\\n  "],["close-element"],["text","\\n"]],"locals":[]}],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, n) => {
        "use strict";
        n.r(t);
      },
      (e, t, n) => {
        "use strict";
        var a = n(1),
          s = n(3);
        const { Component: l, computed: o } = a.Ember,
          i = l.extend({
            classNames: ["paw-content-details"],
            layout: n(69),
            style: n(70),
            showOverlayImage: o(
              "itemPurchaseOption.assets.iconPath",
              "itemPurchaseOption.inventoryType",
              "itemPurchaseOption.subInventoryType",
              function () {
                return (
                  this.get("itemPurchaseOption.assets.iconPath") &&
                  (this.get("itemPurchaseOption.inventoryType") !==
                    s.PAW.INVENTORY_TYPES.CHAMPION_SKIN ||
                    this.get("itemPurchaseOption.subInventoryType"))
                );
              },
            ),
            isItemDependencyLoyaltyUnlocked: o(
              "itemPurchaseOption",
              "dependencies.[]",
              function () {
                let e = !1;
                return (
                  this.get("dependencies").forEach((t) => {
                    t.loyaltyUnlocked && (e = !0);
                  }),
                  e
                );
              },
            ),
            loyaltyHintText: o(function () {
              return this.get("tra.cat_paw_loyalty_unlocked_hint");
            }),
          });
        e.exports = i;
      },
      (e, t, n) => {
        const a = n(1).Ember;
        e.exports = a.HTMLBars.template({
          id: "oAc8cBXR",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\Releases_14_13\\\\LeagueClientContent_Release\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-paw\\\\src\\\\components\\\\ui\\\\item-details-component\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\Releases_14_13\\\\LeagueClientContent_Release\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-paw\\\\src\\\\components\\\\ui\\\\item-details-component\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\Releases_14_13\\\\LeagueClientContent_Release\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-paw\\\\src\\\\components\\\\ui\\\\item-details-component\\\\index.js\\" "],["text","\\n"],["append",["helper",["item-splash"],null,[["itemPurchaseOption","showOverlayImage"],[["get",["itemPurchaseOption"]],["get",["showOverlayImage"]]]]],false],["text","\\n"],["open-element","div",[]],["static-attr","class","item-inner-content"],["flush-element"],["text","\\n  "],["append",["helper",["overlay-image"],null,[["showOverlayImage","itemPurchaseOption"],[["get",["showOverlayImage"]],["get",["itemPurchaseOption"]]]]],false],["text","\\n  "],["append",["helper",["content-description"],null,[["itemPurchaseOption","purchaseSuccess"],[["get",["itemPurchaseOption"]],["get",["purchaseSuccess"]]]]],false],["text","\\n"],["close-element"],["text","\\n"],["block",["if"],[["get",["dependencies"]]],null,1],["open-element","hr",[]],["static-attr","class","content-separator"],["flush-element"],["close-element"],["text","\\n\\n"],["block",["if"],[["get",["isItemDependencyLoyaltyUnlocked"]]],null,0]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","  "],["open-element","div",[]],["static-attr","class","loyalty-hint"],["flush-element"],["text","\\n    "],["open-element","p",[]],["static-attr","class","loyalty-hint__text"],["flush-element"],["text","\\n      "],["open-element","img",[]],["static-attr","class","loyalty-hint__logo"],["static-attr","src","/fe/lol-static-assets/images/xbox-game-pass-loyalty-hint.svg"],["static-attr","alt","Rewards Program Logo"],["flush-element"],["close-element"],["text","\\n      "],["append",["unknown",["loyaltyHintText"]],false],["text","\\n    "],["close-element"],["text","\\n  "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","  "],["append",["helper",["dependency-details"],null,[["dependencies"],[["get",["dependencies"]]]]],false],["text","\\n"]],"locals":[]}],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, n) => {
        "use strict";
        n.r(t);
      },
      (e, t, n) => {
        "use strict";
        var a = n(1);
        const { Component: s, computed: l } = a.Ember,
          o = s.extend({
            classNames: ["paw-purchase-options"],
            purchaseDisclaimerChecked: !1,
            layout: n(72),
            style: n(73),
            purchaseEnabled: l(
              "alwaysShowPurchaseDisclaimer",
              "purchaseDisclaimerChecked",
              function () {
                return (
                  !this.get("alwaysShowPurchaseDisclaimer") ||
                  this.get("purchaseDisclaimerChecked")
                );
              },
            ),
            actions: {
              toggleDisclaimerValue(e) {
                this.set("purchaseDisclaimerChecked", e);
              },
              purchase: function (e) {
                this.sendAction("purchase", e);
              },
            },
          });
        e.exports = o;
      },
      (e, t, n) => {
        const a = n(1).Ember;
        e.exports = a.HTMLBars.template({
          id: "pwRbT8+5",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\Releases_14_13\\\\LeagueClientContent_Release\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-paw\\\\src\\\\components\\\\ui\\\\purchase-options-component\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\Releases_14_13\\\\LeagueClientContent_Release\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-paw\\\\src\\\\components\\\\ui\\\\purchase-options-component\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\Releases_14_13\\\\LeagueClientContent_Release\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-paw\\\\src\\\\components\\\\ui\\\\purchase-options-component\\\\index.js\\" "],["text","\\n"],["block",["if"],[["get",["purchaseSuccess"]]],null,6,5]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","    "],["append",["helper",["disclaimer-checkbox"],null,[["toggleDisclaimerValue"],["toggleDisclaimerValue"]]],false],["text","\\n"]],"locals":[]},{"statements":[["text","  "],["append",["helper",["purchase-warnings"],null,[["itemPurchaseOption"],[["get",["itemPurchaseOption"]]]]],false],["text","\\n"],["block",["if"],[["get",["alwaysShowPurchaseDisclaimer"]]],null,0],["text","  "],["append",["helper",["price-details"],null,[["purchaseOptions","itemPurchaseOption","wallet","purchaseEnabled","purchase","padding"],[["get",["purchaseOptions"]],["get",["itemPurchaseOption"]],["get",["wallet"]],["get",["purchaseEnabled"]],"purchase",["get",["padding"]]]]],false],["text","\\n"]],"locals":[]},{"statements":[["text","  "],["open-element","p",[]],["flush-element"],["append",["unknown",["errorMessage"]],false],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["block",["if"],[["get",["errorMessage"]]],null,2,1]],"locals":[]},{"statements":[["text","  "],["open-element","div",[]],["static-attr","class","spinner-wrapper"],["flush-element"],["text","\\n    "],["append",["helper",["uikit-spinner"],null,[["src"],["/fe/lol-paw/images/spinner.png"]]],false],["text","\\n  "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["block",["if"],[["get",["isPurchasing"]]],null,4,3]],"locals":[]},{"statements":[["text","  "],["append",["helper",["item-unlocked"],null,[["itemPurchaseOption"],[["get",["itemPurchaseOption"]]]]],false],["text","\\n"]],"locals":[]}],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, n) => {
        "use strict";
        n.r(t);
      },
      (e, t, n) => {
        "use strict";
        var a = n(1);
        const { Component: s, computed: l } = a.Ember,
          o = s.extend({
            classNames: ["paw-warnings-wrapper"],
            layout: n(75),
            style: n(76),
            warnings: l("itemPurchaseOption", function () {
              const e = this.get("itemPurchaseOption.tags") || [],
                t = this.get("tra");
              return e
                .filter((e) => 0 === e.indexOf("charity"))
                .map((e) => {
                  const n = `cat_paw_charity_${e.substring(7).toLowerCase()}_disclaimer`;
                  return t.exists(n)
                    ? t.get(n)
                    : t.get("cat_paw_charity_default_disclaimer");
                });
            }),
          });
        e.exports = o;
      },
      (e, t, n) => {
        const a = n(1).Ember;
        e.exports = a.HTMLBars.template({
          id: "RQ3XWxyS",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\Releases_14_13\\\\LeagueClientContent_Release\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-paw\\\\src\\\\components\\\\ui\\\\purchase-warnings-component\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\Releases_14_13\\\\LeagueClientContent_Release\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-paw\\\\src\\\\components\\\\ui\\\\purchase-warnings-component\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\Releases_14_13\\\\LeagueClientContent_Release\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-paw\\\\src\\\\components\\\\ui\\\\purchase-warnings-component\\\\index.js\\" "],["text","\\n"],["block",["each"],[["get",["warnings"]]],null,0]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","  "],["open-element","div",[]],["static-attr","class","paw-warning"],["flush-element"],["append",["get",["warning"]],false],["close-element"],["text","\\n"]],"locals":["warning"]}],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, n) => {
        "use strict";
        n.r(t);
      },
      (e, t, n) => {
        "use strict";
        var a = n(1);
        const { Component: s, computed: l } = a.Ember,
          o = s.extend({
            classNames: ["paw-item-splash"],
            layout: n(78),
            style: n(79),
            emblems: l.readOnly("itemPurchaseOption.assets.emblems"),
            hasEmblem: l.bool("emblems.length"),
            backgroundImageUrl: l(
              "itemPurchaseOption.assets.splashPath",
              function () {
                return (
                  this.get("itemPurchaseOption.assets.splashPath") ||
                  "/fe/lol-paw/images/paw-splash-bg.jpg"
                );
              },
            ),
            showEmblem: l("hasEmblem", "showOverlayImage", function () {
              return this.get("hasEmblem") && !this.get("showOverlayImage");
            }),
          });
        e.exports = o;
      },
      (e, t, n) => {
        const a = n(1).Ember;
        e.exports = a.HTMLBars.template({
          id: "g+9sRM7Q",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\Releases_14_13\\\\LeagueClientContent_Release\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-paw\\\\src\\\\components\\\\ui\\\\item-splash-component\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\Releases_14_13\\\\LeagueClientContent_Release\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-paw\\\\src\\\\components\\\\ui\\\\item-splash-component\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\Releases_14_13\\\\LeagueClientContent_Release\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-paw\\\\src\\\\components\\\\ui\\\\item-splash-component\\\\index.js\\" "],["text","\\n"],["open-element","img",[]],["dynamic-attr","class",["concat",["background-image ",["helper",["if"],[["get",["showOverlayImage"]],"half-opacity"],null]]]],["dynamic-attr","src",["concat",[["unknown",["backgroundImageUrl"]]]]],["flush-element"],["close-element"],["text","\\n"],["block",["if"],[["get",["showEmblem"]]],null,1]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","      "],["open-element","img",[]],["static-attr","class","emblem-image"],["dynamic-attr","src",["concat",[["unknown",["emblem","emblemPath","large"]]]]],["flush-element"],["close-element"],["text","\\n"]],"locals":["emblem"]},{"statements":[["text","  "],["open-element","div",[]],["static-attr","class","emblem-container"],["flush-element"],["text","\\n"],["block",["each"],[["get",["emblems"]]],null,0],["text","  "],["close-element"],["text","\\n"]],"locals":[]}],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, n) => {
        "use strict";
        n.r(t);
      },
      (e, t, n) => {
        "use strict";
        var a,
          s = n(1),
          l = n(3),
          o = (a = n(60)) && a.__esModule ? a : { default: a };
        const { Component: i, computed: c } = s.Ember,
          r = i.extend({
            classNames: ["paw-overlay-image-content"],
            layout: n(81),
            style: n(82),
            overlayImagePath: c.readOnly("itemPurchaseOption.assets.iconPath"),
            showChromaIcon: c("itemPurchaseOption", function () {
              const e = this.get("itemPurchaseOption");
              if (e) {
                const { inventoryType: t, subInventoryType: n } = e;
                return (
                  t === l.PAW.INVENTORY_TYPES.CHAMPION_SKIN &&
                  n === o.default.CHROMA
                );
              }
              return !1;
            }),
            overlayBackgroundPath: c(
              "itemPurchaseOption.assets.iconBackgroundPath",
              function () {
                return (
                  this.get("itemPurchaseOption.assets.iconBackgroundPath") ||
                  'url("/fe/lol-paw/images/bg-chroma-card.jpg")'
                );
              },
            ),
            inventoryTypeSpecialStyle: c(
              "itemPurchaseOption.inventoryType",
              function () {
                const e = this.get("itemPurchaseOption.inventoryType");
                return e ? e.toLowerCase() : "";
              },
            ),
          });
        e.exports = r;
      },
      (e, t, n) => {
        const a = n(1).Ember;
        e.exports = a.HTMLBars.template({
          id: "3C43HJLA",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\Releases_14_13\\\\LeagueClientContent_Release\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-paw\\\\src\\\\components\\\\ui\\\\overlay-image-component\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\Releases_14_13\\\\LeagueClientContent_Release\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-paw\\\\src\\\\components\\\\ui\\\\overlay-image-component\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\Releases_14_13\\\\LeagueClientContent_Release\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-paw\\\\src\\\\components\\\\ui\\\\overlay-image-component\\\\index.js\\" "],["text","\\n"],["block",["if"],[["get",["showOverlayImage"]]],null,1]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","        "],["open-element","img",[]],["static-attr","src","/fe/lol-paw/images/icon-chroma.png"],["static-attr","class","chroma-icon"],["flush-element"],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","  "],["open-element","div",[]],["static-attr","class","overlay-image-wrapper"],["dynamic-attr","style",["concat",["background-image: ",["unknown",["overlayBackgroundPath"]]]]],["flush-element"],["text","\\n    "],["open-element","div",[]],["dynamic-attr","class",["concat",["overlay-image-border ",["unknown",["inventoryTypeSpecialStyle"]]]]],["flush-element"],["text","\\n      "],["open-element","img",[]],["static-attr","class","paw-purchase-overlay-image"],["dynamic-attr","src",["concat",[["unknown",["overlayImagePath"]]]]],["flush-element"],["close-element"],["text","\\n"],["block",["if"],[["get",["showChromaIcon"]]],null,0],["text","    "],["close-element"],["text","\\n  "],["close-element"],["text","\\n"]],"locals":[]}],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, n) => {
        "use strict";
        n.r(t);
      },
      (e, t, n) => {
        "use strict";
        var a = n(1);
        const { Component: s, computed: l } = a.Ember;
        function o(e, t, n) {
          return e.exists(t) ? t : n;
        }
        const i = s.extend({
          classNames: ["paw-content-description"],
          layout: n(84),
          itemSubtitle: l("itemPurchaseOption", "tra.metadata", function () {
            const e = this.get("itemPurchaseOption.description");
            if (e) return e;
            const t = this.get("itemPurchaseOption");
            if (t && t.inventoryType) {
              let e = null;
              const n = this.get("tra"),
                { inventoryType: a, subInventoryType: s } = t;
              if (((e = o(n, `cat_paw_subtitle_${a.toLowerCase()}`, e)), s)) {
                e = o(
                  n,
                  `cat_paw_subtitle_${a.toLowerCase()}_${s.toLowerCase()}`,
                  e,
                );
              }
              return e ? n.get(e) : "";
            }
            return "";
          }),
          subtitle: l(
            "itemSubtitle",
            "purchaseSuccess",
            "tra.cat_paw_modal_item_unlocked_title",
            function () {
              return this.get("purchaseSuccess")
                ? this.get("tra.cat_paw_modal_item_unlocked_title")
                : this.get("itemSubtitle");
            },
          ),
        });
        e.exports = i;
      },
      (e, t, n) => {
        const a = n(1).Ember;
        e.exports = a.HTMLBars.template({
          id: "qfdPC67n",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\Releases_14_13\\\\LeagueClientContent_Release\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-paw\\\\src\\\\components\\\\ui\\\\content-description-component\\\\layout.hbs\\" style-path=\\"null\\" js-path=\\"T:\\\\cid\\\\p4\\\\Releases_14_13\\\\LeagueClientContent_Release\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-paw\\\\src\\\\components\\\\ui\\\\content-description-component\\\\index.js\\" "],["text","\\n"],["open-element","lol-uikit-content-block",[]],["static-attr","padding","small"],["static-attr","class","item-description"],["flush-element"],["text","\\n  "],["open-element","h3",[]],["static-attr","class","title-text"],["flush-element"],["append",["unknown",["itemPurchaseOption","name"]],false],["close-element"],["text","\\n  "],["open-element","p",[]],["flush-element"],["append",["unknown",["subtitle"]],false],["close-element"],["text","\\n"],["close-element"],["text","\\n"]],"locals":[],"named":[],"yields":[],"blocks":[],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, n) => {
        "use strict";
        var a = n(1);
        const { Component: s, computed: l } = a.Ember,
          o = a.Ember.A,
          i = s.extend({
            classNames: ["paw-dependency-details"],
            layout: n(86),
            style: n(87),
            shouldShowContentBlock: l("dependencies", function () {
              return (
                (this.get("dependencies") || []).findIndex((e) => !e.owned) > -1
              );
            }),
            dependentItems: l(
              "tra.cat_paw_dependency_includes",
              "dependencies",
              function () {
                const e = (this.get("dependencies") || []).filter(
                  (e) => !e.owned,
                );
                return o(
                  e.map((e) => ({
                    tilePath: e.assets.tilePath,
                    description: this._getDependencyDescription(
                      e.inventoryType,
                    ),
                  })),
                );
              },
            ),
            _getDependencyDescription(e) {
              return this.get("tra").formatString(
                "cat_paw_dependency_includes",
                {
                  inventoryType: this.get(
                    `tra.cat_paw_inventory_type_${e.toLowerCase()}`,
                  ),
                },
              );
            },
          });
        e.exports = i;
      },
      (e, t, n) => {
        const a = n(1).Ember;
        e.exports = a.HTMLBars.template({
          id: "I+aZnp9H",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\Releases_14_13\\\\LeagueClientContent_Release\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-paw\\\\src\\\\components\\\\ui\\\\dependency-details-component\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\Releases_14_13\\\\LeagueClientContent_Release\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-paw\\\\src\\\\components\\\\ui\\\\dependency-details-component\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\Releases_14_13\\\\LeagueClientContent_Release\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-paw\\\\src\\\\components\\\\ui\\\\dependency-details-component\\\\index.js\\" "],["text","\\n"],["block",["if"],[["get",["shouldShowContentBlock"]]],null,1]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","      "],["open-element","div",[]],["static-attr","class","icon-container fade-in"],["flush-element"],["text","\\n        "],["open-element","div",[]],["static-attr","class","icon-inner-border"],["flush-element"],["text","\\n          "],["open-element","img",[]],["static-attr","class","tile-icon fade-in"],["dynamic-attr","src",["unknown",["dependentItem","tilePath"]],null],["flush-element"],["close-element"],["text","\\n        "],["close-element"],["text","\\n      "],["close-element"],["text","\\n      "],["open-element","p",[]],["static-attr","class","dependency-description fade-in"],["flush-element"],["append",["unknown",["dependentItem","description"]],false],["close-element"],["text","\\n"]],"locals":["dependentItem"]},{"statements":[["text","  "],["open-element","hr",[]],["static-attr","class","content-separator"],["flush-element"],["close-element"],["text","\\n  "],["open-element","lol-uikit-content-block",[]],["static-attr","class","dependency-content"],["static-attr","padding","none"],["flush-element"],["text","\\n"],["block",["each"],[["get",["dependentItems"]]],null,0],["text","  "],["close-element"],["text","\\n"]],"locals":[]}],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, n) => {
        "use strict";
        n.r(t);
      },
      (e, t, n) => {
        "use strict";
        var a = n(1);
        const { Component: s } = a.Ember,
          l = s.extend({
            classNames: ["paw-price-details"],
            layout: n(89),
            style: n(90),
            paddingWithDefault: a.Ember.computed("padding", function () {
              return this.get("padding") || "medium";
            }),
            actions: {
              purchase: function (e) {
                this.sendAction("purchase", e);
              },
            },
          });
        e.exports = l;
      },
      (e, t, n) => {
        const a = n(1).Ember;
        e.exports = a.HTMLBars.template({
          id: "kGOrr+NY",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\Releases_14_13\\\\LeagueClientContent_Release\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-paw\\\\src\\\\components\\\\ui\\\\price-details-component\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\Releases_14_13\\\\LeagueClientContent_Release\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-paw\\\\src\\\\components\\\\ui\\\\price-details-component\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\Releases_14_13\\\\LeagueClientContent_Release\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-paw\\\\src\\\\components\\\\ui\\\\price-details-component\\\\index.js\\" "],["text","\\n"],["open-element","lol-uikit-content-block",[]],["dynamic-attr","padding",["concat",[["unknown",["paddingWithDefault"]]]]],["static-attr","class","paw-price-details"],["flush-element"],["text","\\n"],["block",["each"],[["get",["purchaseOptions"]]],null,0],["close-element"],["text","\\n"]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","    "],["append",["helper",["price-button"],null,[["itemPurchaseOption","wallet","purchaseOption","purchaseEnabled","purchase"],[["get",["itemPurchaseOption"]],["get",["wallet"]],["get",["purchaseOption"]],["get",["purchaseEnabled"]],"purchase"]]],false],["text","\\n"]],"locals":["purchaseOption"]}],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, n) => {
        "use strict";
        n.r(t);
      },
      (e, t, n) => {
        "use strict";
        var a = n(1);
        const { Component: s, computed: l } = a.Ember,
          o = "/lol-client-config/v3/client-config/",
          i = o + "lol.client_settings.paw.enableRPTopUp",
          c = o + "lol.client_settings.payments.paymentsMode",
          r = a.dataBinding.bindTo((0, a.getProvider)().getSocket()),
          p = s.extend({
            classNames: ["paw-price-button", "fade-in"],
            classNameBindings: [
              "hasSplashImage:paw-price-button--has-splash-image",
            ],
            layout: n(92),
            style: n(93),
            init() {
              this._super(...arguments), this.initDataBindings();
            },
            initDataBindings() {
              r.observe(i, this, function (e) {
                this.set("isRPTopUpEnabled", e);
              });
            },
            willDestroy() {
              r.unobserve(i), r.unobserve(c), this.closeRpTopUpModal();
            },
            closeRpTopUpModal() {
              const e = this.get("RPTopUpModal"),
                t = this.get("RPTopUpModalComponent");
              t &&
                (t.componentPromise.then((e) => {
                  e.app.destroy();
                }),
                e && a.modalManager.remove(e),
                this.set("RPTopUpModal", null),
                this.set("RPTopUpModalComponent", null));
            },
            openPAWErrorModal() {
              const e = a.UiKitPlugin.getTemplateHelper(),
                t = this.get("tra").formatString("cat_paw_rp_error_message", {
                  errorCode: "200",
                }),
                n = e.contentBlockDialog(
                  this.get("tra.cat_paw_rp_error_title"),
                  t,
                );
              a.modalManager.add({
                type: "DialogAlert",
                data: {
                  contents: n,
                  okText: this.get("tra.cat_paw_rp_error_button"),
                  dismissible: !1,
                },
                owner: this.get("element"),
              });
            },
            isRPTopUpEnabled: !1,
            aggregatedPriceDetails: l(
              "purchaseOption.priceDetails",
              function () {
                const e = this.get("purchaseOption.priceDetails"),
                  t = [];
                return (
                  e &&
                    e.forEach((e) => {
                      const { currencyType: n, price: a } = e.price;
                      if (a > 0) {
                        const e = t.find((e) => e.currencyType === n);
                        e
                          ? (e.price += a)
                          : t.push({ currencyType: n, price: a });
                      }
                    }),
                  t
                );
              },
            ),
            newBalance: l(
              "tra.cat_paw_purchase_cant_afford_message",
              "aggregatedPriceDetails",
              "wallet",
              function () {
                const e = this.get("aggregatedPriceDetails"),
                  t = this.get("wallet"),
                  n = [];
                return (
                  e.forEach((e) => {
                    const { currencyType: a, price: s } = e;
                    t.hasOwnProperty(a)
                      ? n.push({
                          currencyType: a,
                          remaining: t[a] - s,
                          currencyName: this.get(
                            `tra.cat_paw_modal_currency_${a.toLowerCase()}`,
                          ),
                          cantAffordMessage: this.get("tra").formatString(
                            "cat_paw_purchase_cant_afford_message",
                            {
                              currency: this.get(
                                `tra.cat_paw_modal_currency_${a.toLowerCase()}`,
                              ),
                            },
                          ),
                        })
                      : n.push({
                          currencyType: a,
                          remaining: -s,
                          currencyName: this.get(
                            `tra.cat_paw_modal_currency_${a.toLowerCase()}`,
                          ),
                          cantAffordMessage: this.get("tra").formatString(
                            "cat_paw_purchase_cant_afford_message",
                            {
                              currency: this.get(
                                `tra.cat_paw_modal_currency_${a.toLowerCase()}`,
                              ),
                            },
                          ),
                        });
                  }),
                  n
                );
              },
            ),
            cantAffordBalance: l("newBalance", function () {
              return this.get("newBalance").find((e) => e.remaining < 0);
            }),
            purchaseDisabled: l(
              "isRPTopUpEnabled",
              "cantAffordBalance",
              "purchaseEnabled",
              function () {
                if (this.get("isRPTopUpEnabled")) {
                  const e = this.get("cantAffordBalance");
                  return (
                    !this.get("purchaseEnabled") ||
                    (!!e && "RP" !== e.currencyType)
                  );
                }
                return Boolean(
                  this.get("cantAffordBalance") || !this.get("purchaseEnabled"),
                );
              },
            ),
            showRPTopUpModal: function () {
              const e = -1 * this.get("cantAffordBalance").remaining,
                t = this.get("itemPurchaseOption").name,
                n = `${a.privateAPI.getSource()}-PAW`,
                s = a.componentFactory.create("PAWRPTopUpModalComponent", {
                  price: e,
                  itemName: t,
                }),
                l = a.modalManager.add({
                  type: "DialogConfirm",
                  data: {
                    contents: s.domNode,
                    acceptText: this.get("tra.cat_paw_rp_purchase_message"),
                    declineText: this.get("tra.cat_paw_rp_cancel_message"),
                    primaryButton: "accept",
                    onAccept: async () => {
                      try {
                        await a.sharedPayments.openPayments({
                          action: "RP_PURCHASE",
                          openedFrom: n,
                        });
                      } catch (e) {
                        this.openPAWErrorModal();
                      }
                    },
                  },
                  owner: this.get("element"),
                });
              this.set("RPTopUpModalComponent", s), this.set("RPTopUpModal", l);
            },
            actions: {
              startPurchase: function () {
                if (this.get("isRPTopUpEnabled")) {
                  const e = this.get("cantAffordBalance");
                  if (!this.get("purchaseEnabled")) return;
                  if (e && "RP" === e.currencyType)
                    return void this.showRPTopUpModal();
                  this.sendAction("purchase", this.get("purchaseOption"));
                } else {
                  if (this.get("purchaseDisabled")) return;
                  this.sendAction("purchase", this.get("purchaseOption"));
                }
              },
            },
          });
        e.exports = p;
      },
      (e, t, n) => {
        const a = n(1).Ember;
        e.exports = a.HTMLBars.template({
          id: "A/nZl1a1",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\Releases_14_13\\\\LeagueClientContent_Release\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-paw\\\\src\\\\components\\\\ui\\\\price-button-component\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\Releases_14_13\\\\LeagueClientContent_Release\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-paw\\\\src\\\\components\\\\ui\\\\price-button-component\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\Releases_14_13\\\\LeagueClientContent_Release\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-paw\\\\src\\\\components\\\\ui\\\\price-button-component\\\\index.js\\" "],["text","\\n"],["block",["if"],[["get",["isRPTopUpEnabled"]]],null,8,4]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","        "],["open-element","p",[]],["static-attr","class","currency-remaining"],["flush-element"],["text","\\n          "],["append",["unknown",["balance","remaining"]],false],["text"," "],["append",["unknown",["balance","currencyName"]],false],["text","\\n        "],["close-element"],["text","\\n"]],"locals":["balance"]},{"statements":[["text","    "],["open-element","div",[]],["static-attr","class","balance-info"],["flush-element"],["text","\\n      "],["open-element","p",[]],["static-attr","class","new-balance-label"],["flush-element"],["append",["unknown",["tra","cat_paw_modal_new_balance"]],false],["close-element"],["text","\\n"],["block",["each"],[["get",["newBalance"]]],null,0],["text","    "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","    "],["open-element","div",[]],["static-attr","class","balance-info"],["flush-element"],["text","\\n      "],["open-element","p",[]],["static-attr","class","cant-afford"],["flush-element"],["append",["unknown",["cantAffordBalance","cantAffordMessage"]],false],["close-element"],["text","\\n    "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","      "],["open-element","div",[]],["dynamic-attr","class",["concat",["currency-icon ",["unknown",["priceDetail","currencyType"]]]]],["flush-element"],["close-element"],["text","\\n      "],["open-element","span",[]],["static-attr","class","price"],["flush-element"],["append",["unknown",["priceDetail","price"]],false],["close-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","multiple-currency-separator"],["flush-element"],["text","+"],["close-element"],["text","\\n"]],"locals":["priceDetail"]},{"statements":[["text","  "],["open-element","lol-uikit-purchase-button",[]],["static-attr","class","multi-currency-purchase-button"],["dynamic-attr","disabled",["helper",["if"],[["get",["purchaseDisabled"]],true],null],null],["modifier",["action"],[["get",[null]],"startPurchase"]],["flush-element"],["text","\\n"],["block",["each"],[["get",["aggregatedPriceDetails"]]],null,3],["text","  "],["close-element"],["text","\\n"],["block",["if"],[["get",["cantAffordBalance"]]],null,2,1]],"locals":[]},{"statements":[["text","        "],["open-element","p",[]],["static-attr","class","currency-remaining"],["flush-element"],["text","\\n          "],["append",["unknown",["balance","remaining"]],false],["text"," "],["append",["unknown",["balance","currencyName"]],false],["text","\\n        "],["close-element"],["text","\\n"]],"locals":["balance"]},{"statements":[["text","    "],["open-element","div",[]],["static-attr","class","balance-info"],["flush-element"],["text","\\n      "],["open-element","p",[]],["static-attr","class","new-balance-label"],["flush-element"],["append",["unknown",["tra","cat_paw_modal_new_balance"]],false],["close-element"],["text","\\n"],["block",["each"],[["get",["newBalance"]]],null,5],["text","    "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","      "],["open-element","div",[]],["dynamic-attr","class",["concat",["currency-icon ",["unknown",["priceDetail","currencyType"]]]]],["flush-element"],["close-element"],["text","\\n      "],["open-element","span",[]],["static-attr","class","price"],["flush-element"],["append",["unknown",["priceDetail","price"]],false],["close-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","multiple-currency-separator"],["flush-element"],["text","+"],["close-element"],["text","\\n"]],"locals":["priceDetail"]},{"statements":[["text","  "],["open-element","lol-uikit-purchase-button",[]],["static-attr","class","multi-currency-purchase-button"],["dynamic-attr","disabled",["helper",["if"],[["get",["purchaseDisabled"]],true],null],null],["modifier",["action"],[["get",[null]],"startPurchase"]],["flush-element"],["text","\\n"],["block",["each"],[["get",["aggregatedPriceDetails"]]],null,7],["text","  "],["close-element"],["text","\\n"],["block",["unless"],[["get",["cantAffordBalance"]]],null,6]],"locals":[]}],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, n) => {
        "use strict";
        n.r(t);
      },
      (e, t, n) => {
        "use strict";
        var a = n(1);
        const { computed: s, Component: l } = a.Ember,
          o = l.extend({
            layout: n(95),
            style: n(96),
            tokenizedConfirmationText: s(
              "tra.cat_paw_purchase_disclaimer",
              function () {
                const e = this.get("tra.cat_paw_purchase_disclaimer");
                return /(.*){{confirmationLink}}(.*)/.exec(e);
              },
            ),
            confirmationTextPrefix: s(
              "tokenizedConfirmationText",
              "tra.cat_paw_purchase_disclaimer",
              function () {
                const e = this.get("tokenizedConfirmationText");
                return e && 3 === e.length
                  ? a.Ember.Handlebars.Utils.escapeExpression(e[1])
                  : this.get("tra.cat_paw_purchase_disclaimer");
              },
            ),
            confirmationTextPostfix: s(
              "tokenizedConfirmationText",
              "tra.cat_paw_purchase_disclaimer",
              function () {
                const e = this.get("tokenizedConfirmationText");
                return e && 3 === e.length
                  ? a.Ember.Handlebars.Utils.escapeExpression(e[2])
                  : "";
              },
            ),
            confirmationLinkText: s(
              "tokenizedConfirmationText",
              "tra.cat_paw_purchase_disclaimer",
              function () {
                const e = this.get("tokenizedConfirmationText");
                if (e && 3 === e.length) {
                  return this.get("tra.cat_paw_purchase_disclaimer_link_text");
                }
                return "";
              },
            ),
            didInsertElement() {
              this._super(...arguments);
              this.element.querySelector(
                ".paw-purchase-confirmation-link",
              ).onclick = function (e) {
                e.stopPropagation();
              };
            },
            actions: {
              toggleDisclaimerCheckbox(e) {
                const t = e.target;
                this.sendAction("toggleDisclaimerValue", t.checked);
              },
            },
          });
        e.exports = o;
      },
      (e, t, n) => {
        const a = n(1).Ember;
        e.exports = a.HTMLBars.template({
          id: "BmJjxAdp",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\Releases_14_13\\\\LeagueClientContent_Release\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-paw\\\\src\\\\components\\\\ui\\\\disclaimer-checkbox-component\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\Releases_14_13\\\\LeagueClientContent_Release\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-paw\\\\src\\\\components\\\\ui\\\\disclaimer-checkbox-component\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\Releases_14_13\\\\LeagueClientContent_Release\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-paw\\\\src\\\\components\\\\ui\\\\disclaimer-checkbox-component\\\\index.js\\" "],["text","\\n"],["open-element","lol-uikit-flat-checkbox",[]],["static-attr","name","pawPurchaseDisclaimer"],["static-attr","class","paw-purchase-disclaimer"],["flush-element"],["text","\\n  "],["open-element","input",[]],["static-attr","slot","input"],["static-attr","type","checkbox"],["static-attr","name","pawPurchaseDisclaimer"],["static-attr","class","paw-purchase-disclaimer-checkbox"],["dynamic-attr","onchange",["helper",["action"],[["get",[null]],"toggleDisclaimerCheckbox"],null],null],["flush-element"],["close-element"],["text","\\n  "],["open-element","label",[]],["static-attr","slot","label"],["static-attr","for","pawPurchaseDisclaimer"],["static-attr","class","lol-settings-checkbox-label"],["flush-element"],["text","\\n    "],["append",["unknown",["confirmationTextPrefix"]],false],["text","\\n    "],["open-element","a",[]],["static-attr","target","_blank"],["dynamic-attr","class",["concat",["paw-purchase-confirmation-link ",["helper",["unless"],[["get",["confirmationLinkText"]],"hidden"],null]]]],["dynamic-attr","href",["concat",[["unknown",["tra","cat_paw_purchase_disclaimer_link"]]]]],["flush-element"],["text","\\n      "],["append",["unknown",["confirmationLinkText"]],false],["text","\\n    "],["close-element"],["text","\\n    "],["append",["unknown",["confirmationTextPostfix"]],false],["text","\\n  "],["close-element"],["text","\\n"],["close-element"],["text","\\n"]],"locals":[],"named":[],"yields":[],"blocks":[],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, n) => {
        "use strict";
        n.r(t);
      },
      (e, t, n) => {
        "use strict";
        var a = n(1),
          s = n(27);
        const { Component: l, computed: o } = a.Ember;
        function i(e, t, n) {
          return e.exists(t) ? t : n;
        }
        const c = l.extend({
          classNames: ["paw-item-unlocked", "fade-in"],
          layout: n(98),
          style: n(99),
          unlockSuccessMessage: o(
            "itemPurchaseOption.{inventoryType,subInventoryType,name}",
            "tra.cat_paw_modal_item_unlocked_details",
            function () {
              let e = "cat_paw_unlock_message";
              const t = this.get("tra"),
                n = this.get("itemPurchaseOption"),
                a = this.get("itemPurchaseOption.name");
              if (n && n.inventoryType) {
                const { inventoryType: a, subInventoryType: s } = n;
                if (
                  ((e = i(t, `cat_paw_unlock_message_${a.toLowerCase()}`, e)),
                  s)
                ) {
                  e = i(
                    t,
                    `cat_paw_unlock_message_${a.toLowerCase()}_${s.toLowerCase()}`,
                    e,
                  );
                }
              }
              return a
                ? t.formatString(e, { itemName: a })
                : this.get("tra.cat_paw_modal_item_unlocked_title");
            },
          ),
          actions: {
            closeModal: function () {
              this.element.dispatchEvent(
                new Event(s.PAW_MODAL_CLOSE_EVENT_NAME, { bubbles: !0 }),
              );
            },
          },
        });
        e.exports = c;
      },
      (e, t, n) => {
        const a = n(1).Ember;
        e.exports = a.HTMLBars.template({
          id: "l8PFxkKC",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\Releases_14_13\\\\LeagueClientContent_Release\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-paw\\\\src\\\\components\\\\ui\\\\item-unlocked-component\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\Releases_14_13\\\\LeagueClientContent_Release\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-paw\\\\src\\\\components\\\\ui\\\\item-unlocked-component\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\Releases_14_13\\\\LeagueClientContent_Release\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-paw\\\\src\\\\components\\\\ui\\\\item-unlocked-component\\\\index.js\\" "],["text","\\n"],["open-element","p",[]],["static-attr","class","unlock-success-message"],["flush-element"],["append",["unknown",["unlockSuccessMessage"]],false],["close-element"],["text","\\n"],["open-element","div",[]],["static-attr","class","done-button-row"],["flush-element"],["text","\\n  "],["open-element","lol-uikit-flat-button",[]],["dynamic-attr","onclick",["helper",["action"],[["get",[null]],"closeModal"],null],null],["flush-element"],["text","\\n    "],["append",["unknown",["tra","cat_paw_modal_button_done"]],false],["text","\\n  "],["close-element"],["text","\\n"],["close-element"],["text","\\n"]],"locals":[],"named":[],"yields":[],"blocks":[],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, n) => {
        "use strict";
        n.r(t);
      },
      (e, t, n) => {
        "use strict";
        var a = n(1);
        const { Component: s } = a.Ember,
          l = s.extend({
            tagName: "lol-uikit-video",
            classNames: ["paw-celebration-video"],
            attributeBindings: ["src", "type"],
            type: "intro",
            src: "/fe/lol-paw/videos/UnlockCeremony.webm",
            style: n(101),
            didInsertElement() {
              this.element.play();
            },
          });
        e.exports = l;
      },
      (e, t, n) => {
        "use strict";
        n.r(t);
      },
      (e, t, n) => {
        "use strict";
        var a,
          s = n(1),
          l = (a = n(30)) && a.__esModule ? a : { default: a };
        const { Component: o } = s.Ember,
          i = o.extend(l.default, {
            layout: n(103),
            style: n(104),
            choices: null,
            wallet: null,
            purchaseOptions: null,
            alwaysShowPurchaseDisclaimer: null,
            purchaseSuccess: null,
            isPurchasing: null,
            itemUnlockedMessage: null,
            errorMessage: null,
            purchase: null,
            isMultipleItems: s.Ember.computed("choices", function () {
              return this.get("choices").length > 1;
            }),
            isSingleItem: s.Ember.computed.not("isMultipleItems"),
            actions: {
              triggerDetails(e) {
                const t = this.element.querySelector(
                    `.paw-choice-window-details.option${e}`,
                  ),
                  n = this.element.querySelectorAll(
                    ".paw-choice-window-details",
                  ),
                  a = this.element.querySelector(".paw-choice-content-wrapper");
                for (let e = 0; e < n.length; ++e)
                  n[e].classList.remove("active");
                t.classList.add("active"),
                  (a.style.transform = "translateX(-756px)");
              },
              goBack() {
                const e = this.element.querySelectorAll(
                  ".paw-choice-window-details",
                );
                this.element.querySelector(
                  ".paw-choice-content-wrapper",
                ).style.transform = "translateX(0px)";
                for (let t = 0; t < e.length; ++t)
                  e[t].classList.remove("active");
              },
              purchase: function (e) {
                this.sendAction("purchase", e);
              },
            },
          });
        e.exports = i;
      },
      (e, t, n) => {
        const a = n(1).Ember;
        e.exports = a.HTMLBars.template({
          id: "jwqgBSZs",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\Releases_14_13\\\\LeagueClientContent_Release\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-paw\\\\src\\\\components\\\\paw-choice-component\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\Releases_14_13\\\\LeagueClientContent_Release\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-paw\\\\src\\\\components\\\\paw-choice-component\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\Releases_14_13\\\\LeagueClientContent_Release\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-paw\\\\src\\\\components\\\\paw-choice-component\\\\index.js\\" "],["text","\\n"],["open-element","div",[]],["static-attr","class","paw-choice-window"],["flush-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","paw-choice-content-wrapper"],["flush-element"],["text","\\n"],["block",["if"],[["get",["errorMessage"]]],null,5,4],["text","  "],["close-element"],["text","\\n"],["close-element"]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","      "],["open-element","div",[]],["dynamic-attr","class",["concat",["paw-choice-window-details option",["get",["index"]]," ",["helper",["if"],[["get",["isSingleItem"]],"active"],null]]]],["flush-element"],["text","\\n        "],["append",["helper",["item-choice-details"],null,[["item","contents","displayType","backgroundImage","purchaseOptions","fullPrice","wallet","alwaysShowPurchaseDisclaimer","purchaseSuccess","isPurchasing","itemUnlockedMessage","isMultipleItems","errorMessage","purchase","goBack"],[["get",["choice","item"]],["get",["choice","contents"]],["get",["choice","displayType"]],["get",["choice","backgroundImage"]],["get",["choice","purchaseOptions"]],["get",["choice","fullPrice"]],["get",["wallet"]],["get",["alwaysShowPurchaseDisclaimer"]],["get",["purchaseSuccess"]],["get",["isPurchasing"]],["get",["itemUnlockedMessage"]],["get",["isMultipleItems"]],["get",["errorMessage"]],"purchase",["helper",["action"],[["get",[null]],"goBack"],null]]]],false],["text","\\n      "],["close-element"],["text","\\n"]],"locals":["choice","index"]},{"statements":[["text","      "],["open-element","div",[]],["static-attr","class","paw-choice-separator"],["flush-element"],["text","\\n        "],["open-element","div",[]],["static-attr","class","paw-choice-separator-background"],["flush-element"],["text","\\n          "],["open-element","div",[]],["static-attr","class","paw-choice-separator-background-insert"],["flush-element"],["close-element"],["text","\\n          "],["open-element","h3",[]],["static-attr","class","paw-choice-separator-text"],["flush-element"],["append",["unknown",["tra","cat_paw_choice_separator_text"]],false],["close-element"],["text","\\n        "],["close-element"],["text","\\n      "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["block",["if"],[["get",["index"]]],null,1],["text","      "],["open-element","div",[]],["dynamic-attr","class",["concat",["paw-choice-window-option option",["get",["index"]]]]],["flush-element"],["text","\\n        "],["append",["helper",["item-choice"],null,[["index","title","itemId","subTitle","description","backgroundImage","discount","pricing","inventoryType","triggerDetails"],[["get",["index"]],["get",["choice","item","name"]],["get",["choice","item","itemId"]],["get",["choice","item","subTitle"]],["get",["choice","item","description"]],["get",["choice","backgroundImage"]],["get",["choice","discount"]],["get",["choice","item","prices"]],["get",["choice","item","inventoryType"]],["helper",["action"],[["get",[null]],"triggerDetails"],null]]]],false],["text","\\n      "],["close-element"],["text","\\n"]],"locals":["choice","index"]},{"statements":[["text","    "],["open-element","div",[]],["static-attr","class","paw-choice-window-page item-select"],["flush-element"],["text","\\n"],["block",["each"],[["get",["choices"]]],null,2],["text","    "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["block",["if"],[["get",["isMultipleItems"]]],null,3],["text","\\n"],["text","    "],["open-element","div",[]],["static-attr","class","paw-choice-window-page item-details"],["flush-element"],["text","\\n"],["block",["each"],[["get",["choices"]]],null,0],["text","    "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","    "],["open-element","p",[]],["static-attr","class","paw-choice-error"],["flush-element"],["append",["unknown",["errorMessage"]],false],["close-element"],["text","\\n"]],"locals":[]}],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, n) => {
        "use strict";
        n.r(t);
      },
      (e, t, n) => {
        "use strict";
        var a,
          s = n(1),
          l = n(26),
          o = (a = n(106)) && a.__esModule ? a : { default: a },
          i = n(107);
        const { Component: c, computed: r } = s.Ember,
          p =
            "linear-gradient(to top, black 0px, rgba(0,0,0, 0.8) 310px, transparent 80%)",
          m = c.extend({
            classNames: ["paw-content-choice"],
            layout: n(108),
            style: n(109),
            purchaseWidgetService: s.Ember.inject.service("purchaseWidget"),
            title: null,
            subTitle: null,
            description: null,
            discount: null,
            backgroundImage: null,
            pricing: null,
            inventoryType: null,
            index: null,
            itemId: null,
            backgroundImageHover: r("backgroundImage", function () {
              const e = this.get("backgroundImage");
              return `${p}, url(${e})`;
            }),
            sales: r("pricing", function () {
              return this.get("pricing").reduce((e, t) => {
                const n = (0, i.populateSales)(this.get("tra"), t);
                return n && (e.push(n), (t.sale = n)), e;
              }, []);
            }),
            shouldRenderSale: r.notEmpty("sales"),
            isDiscount: r.notEmpty("discount"),
            discountFormatted: r("discount", function () {
              const e = this.get("discount");
              return this.get("tra").formatString(
                "cat_paw_choice_sale_value_off",
                { amount: e },
              );
            }),
            subTitleWithDefault: r("subTitle", "inventoryType", function () {
              let e = this.get("subTitle");
              const t = this.get("inventoryType"),
                n = this.get("tra");
              return (
                "" === e && (e = n.get(`cat_paw_choice_default_subtitle_${t}`)),
                e
              );
            }),
            backgroundImageHoverOut: r("backgroundImage", function () {
              const e = this.get("backgroundImage");
              return `${p}, url(${e})`;
            }),
            backgroundImageHoverIn: r("backgroundImage", function () {
              const e = this.get("backgroundImage");
              return `linear-gradient(180deg, rgba(240, 230, 210, 0.1) 0%, transparent 100%), ${p}, url(${e})`;
            }),
            safeChoiceOption: s.Ember.computed(
              "index",
              "inventoryType",
              function () {
                const e = this.get("index"),
                  t = this.get("inventoryType");
                return o.default[t] && o.default[t][e]
                  ? o.default[t][e]
                  : e.toString();
              },
            ),
            mouseEnter() {
              const e = this.get("backgroundImageHoverIn");
              this.set("backgroundImageHover", e);
            },
            mouseLeave() {
              const e = this.get("backgroundImageHoverOut");
              this.set("backgroundImageHover", e);
            },
            click() {
              const e = this.get("index"),
                t = this.get("itemId"),
                n = this.get("inventoryType"),
                a = this.get("safeChoiceOption"),
                o = this.get("purchaseWidgetService.summoner.puuid");
              this.get("triggerDetails")(e);
              const i = {
                id: l.TELEMETRY_EVENT_ID.CHOICE_OPTION_SELECT,
                itemId: t,
                inventoryType: n,
                choice: a,
                puuid: o,
              };
              s.Telemetry.sendCustomData(l.TELEMETRY_EVENT_NAME, i);
            },
          });
        e.exports = m;
      },
      (e, t) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        t.default = { STATSTONE: { 0: "series", 1: "series_pass" } };
      },
      (e) => {
        "use strict";
        function t(e) {
          return Math.round((100 * e).toFixed(1));
        }
        e.exports = {
          decimalToDiscount: t,
          hasSales: function (e) {
            return e.some((e) => e.sale);
          },
          populateSales: function (e, n) {
            return n.sale
              ? {
                  currency: n.currency,
                  cost: n.sale.cost,
                  discount: e.formatString("cat_paw_modal_sale_value", {
                    amount: t(n.sale.discount),
                  }),
                  endDate: n.sale.endDate,
                  startDate: n.sale.startDate,
                }
              : null;
          },
        };
      },
      (e, t, n) => {
        const a = n(1).Ember;
        e.exports = a.HTMLBars.template({
          id: "WMsWBFmq",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\Releases_14_13\\\\LeagueClientContent_Release\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-paw\\\\src\\\\components\\\\paw-choice-ui\\\\item-choice-component\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\Releases_14_13\\\\LeagueClientContent_Release\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-paw\\\\src\\\\components\\\\paw-choice-ui\\\\item-choice-component\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\Releases_14_13\\\\LeagueClientContent_Release\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-paw\\\\src\\\\components\\\\paw-choice-ui\\\\item-choice-component\\\\index.js\\" "],["text","\\n"],["open-element","div",[]],["static-attr","class","paw-choice-wrapper"],["dynamic-attr","style",["concat",["background-image:",["unknown",["backgroundImageHover"]],";"]]],["flush-element"],["text","\\n"],["block",["if"],[["get",["shouldRenderSale"]]],null,4],["block",["if"],[["get",["isDiscount"]]],null,3],["text","  "],["open-element","div",[]],["static-attr","class","paw-choice-item-description"],["flush-element"],["text","\\n    "],["open-element","h3",[]],["static-attr","class","paw-choice-option-title"],["flush-element"],["append",["unknown",["title"]],false],["close-element"],["text","\\n    "],["open-element","h5",[]],["static-attr","class","paw-choice-option-subtitle"],["flush-element"],["append",["unknown",["subTitleWithDefault"]],false],["close-element"],["text","\\n    "],["open-element","span",[]],["static-attr","class","paw-choice-option-description"],["flush-element"],["append",["unknown",["description"]],false],["close-element"],["text","\\n  "],["close-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","paw-choice-divider"],["flush-element"],["close-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","paw-choice-item-pricing"],["flush-element"],["text","\\n"],["block",["each"],[["get",["pricing"]]],null,2],["text","  "],["close-element"],["text","\\n"],["close-element"]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","          "],["open-element","div",[]],["dynamic-attr","class",["concat",["paw-choice-item-pricing-option ",["unknown",["priceType","currency"]]]]],["flush-element"],["text","\\n              "],["open-element","h5",[]],["dynamic-attr","class",["concat",["currency-icon ",["unknown",["priceType","currency"]]]]],["flush-element"],["close-element"],["text","\\n              "],["open-element","span",[]],["static-attr","class","price"],["flush-element"],["append",["unknown",["priceType","cost"]],false],["close-element"],["text","\\n          "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","      "],["open-element","div",[]],["dynamic-attr","class",["concat",["paw-choice-item-pricing-sale ",["unknown",["priceType","currency"]]]]],["flush-element"],["text","\\n          "],["open-element","div",[]],["static-attr","class","regular-price"],["flush-element"],["text","\\n            "],["open-element","h5",[]],["dynamic-attr","class",["concat",["currency-icon ",["unknown",["priceType","currency"]]]]],["flush-element"],["close-element"],["text","\\n            "],["open-element","span",[]],["static-attr","class","price"],["flush-element"],["append",["unknown",["priceType","cost"]],false],["close-element"],["text","\\n            "],["open-element","span",[]],["static-attr","class","strikethrough"],["flush-element"],["close-element"],["text","\\n          "],["close-element"],["text","\\n          "],["open-element","div",[]],["static-attr","class","sale-price"],["flush-element"],["text","\\n            "],["open-element","h5",[]],["dynamic-attr","class",["concat",["currency-icon ",["unknown",["priceType","currency"]]]]],["flush-element"],["close-element"],["text","\\n            "],["open-element","span",[]],["static-attr","class","price"],["flush-element"],["append",["unknown",["priceType","sale","cost"]],false],["close-element"],["text","\\n            "],["open-element","span",[]],["static-attr","class","sale-discount"],["flush-element"],["text","("],["append",["unknown",["priceType","sale","discount"]],false],["text",")"],["close-element"],["text","\\n          "],["close-element"],["text","\\n      "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["block",["if"],[["get",["priceType","sale"]]],null,1,0]],"locals":["priceType"]},{"statements":[["text","    "],["open-element","div",[]],["static-attr","class","paw-choice-discount"],["flush-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","paw-choice-discount-divider"],["flush-element"],["close-element"],["text","\\n      "],["open-element","h3",[]],["static-attr","class","paw-choice-discount-amount"],["flush-element"],["append",["unknown",["discountFormatted"]],false],["close-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","paw-choice-discount-divider"],["flush-element"],["close-element"],["text","\\n    "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","        "],["open-element","div",[]],["static-attr","class","paw-choice-sale"],["flush-element"],["text","\\n            "],["open-element","div",[]],["static-attr","class","sale-box"],["flush-element"],["text","\\n                "],["open-element","div",[]],["static-attr","class","paw-choice-sale-label"],["flush-element"],["append",["unknown",["tra","cat_paw_modal_sale_flag_text"]],false],["close-element"],["text","\\n                "],["open-element","div",[]],["static-attr","class","sale-box sale-blur"],["flush-element"],["close-element"],["text","\\n            "],["close-element"],["text","\\n        "],["close-element"],["text","\\n"]],"locals":[]}],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, n) => {
        "use strict";
        n.r(t);
      },
      (e, t, n) => {
        "use strict";
        var a = n(1),
          s = n(107);
        const { Component: l, computed: o } = a.Ember,
          i = l.extend({
            classNames: ["paw-content-choice-details"],
            layout: n(111),
            style: n(112),
            item: null,
            contents: null,
            backgroundImage: null,
            purchaseOptions: null,
            fullPrice: null,
            wallet: null,
            alwaysShowPurchaseDisclaimer: null,
            purchaseSuccess: null,
            isPurchasing: null,
            itemUnlockedMessage: null,
            isMultipleItems: null,
            errorMessage: null,
            purchase: null,
            goBack: null,
            title: o.alias("item.name"),
            description: o.alias("item.description"),
            inventoryType: o.alias("item.inventoryType"),
            shouldShowBackButton: o.and("displayDetails", "isMultipleItems"),
            isDiscount: o.notEmpty("fullPrice"),
            isFullDisplay: o.equal("displayType", "FULL"),
            isListDisplay: o.equal("displayType", "LIST"),
            displayDetails: o("purchaseSuccess", function () {
              return !this.get("purchaseSuccess");
            }),
            sales: o("item", function () {
              return (this.get("item").prices || []).reduce((e, t) => {
                const n = (0, s.populateSales)(this.get("tra"), t);
                return n && e.push(n), e;
              }, []);
            }),
            shouldShowSales: o.notEmpty("sales"),
            additionalSaleDiscount: o("sales", "adjustedPrice", function () {
              const e = this.get("sales")[0],
                t = this.get("adjustedPrice");
              return this.get("tra").formatString(
                "cat_paw_modal_details_formatted_discount",
                { amount: t - e.cost },
              );
            }),
            totalSalePrice: o("sales", function () {
              return this.get("sales")[0].cost;
            }),
            sortedContents: o("contents", function () {
              return this.get("contents").sort((e, t) =>
                e.title > t.title ? 1 : -1,
              );
            }),
            limitedContents: o("sortedContents", function () {
              return this.get("sortedContents").slice(0, 15);
            }),
            isLimitedContents: o("limitedContents", function () {
              const e = this.get("limitedContents");
              return this.get("contents").length > e.length;
            }),
            firstColumnContents: o("limitedContents", function () {
              const e = this.get("limitedContents");
              return e.slice(0, e.length / 2);
            }),
            secondColumnContents: o("limitedContents", function () {
              const e = this.get("limitedContents");
              return e.slice(e.length / 2 + 1);
            }),
            overflowTextFirstLine: o(
              "limitedContents",
              "contents",
              function () {
                const e = this.get("firstColumnContents"),
                  t = this.get("secondColumnContents"),
                  n = this.get("contents").length - e.length - t.length;
                return this.get("tra").formatString(
                  "cat_paw_choice_list_extra_items",
                  { extraContent: n },
                );
              },
            ),
            discount: o("fullPrice", "adjustedPrice", function () {
              const e = this.get("fullPrice"),
                t = this.get("adjustedPrice");
              return Math.floor(100 * (1 - t / e));
            }),
            formattedDiscount: o("discount", function () {
              const e = this.get("discount");
              return this.get("tra").formatString(
                "cat_paw_choice_sale_value_off",
                { amount: e },
              );
            }),
            saleDiscount: o("fullPrice", "sales", function () {
              const e = this.get("fullPrice"),
                t = this.get("sales")[0];
              return Math.floor(100 * (1 - t.cost / e));
            }),
            formattedSaleDiscount: o("saleDiscount", function () {
              const e = this.get("saleDiscount");
              return this.get("tra").formatString(
                "cat_paw_choice_sale_value_off",
                { amount: e },
              );
            }),
            adjustedPrice: o("item", "currencyType", function () {
              const e = this.get("item"),
                t = this.get("currencyType");
              return this.getPriceForCurrency(e.prices, t);
            }),
            adjustedDiscountAmount: o(
              "fullPrice",
              "adjustedPrice",
              function () {
                const e = this.get("fullPrice"),
                  t = this.get("adjustedPrice");
                return this.get("tra").formatString(
                  "cat_paw_modal_details_formatted_discount",
                  { amount: e - t },
                );
              },
            ),
            currencyType: o("purchaseOptions", function () {
              return this.get("purchaseOptions")[0].priceDetails[0].price
                .currencyType;
            }),
            mainCurrency: o("currencyType", function () {
              const e = this.get("currencyType");
              return this.get("tra").get(
                `cat_paw_modal_currency_${e.toLowerCase()}`,
              );
            }),
            getPriceForCurrency(e, t) {
              for (const n of e) if (n.currency === t) return n.cost;
            },
            actions: {
              goBackToMain() {
                this.get("goBack")();
              },
              purchase: function (e) {
                this.sendAction("purchase", e);
              },
            },
          });
        e.exports = i;
      },
      (e, t, n) => {
        const a = n(1).Ember;
        e.exports = a.HTMLBars.template({
          id: "c3VoVaUd",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\Releases_14_13\\\\LeagueClientContent_Release\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-paw\\\\src\\\\components\\\\paw-choice-ui\\\\item-choice-details-component\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\Releases_14_13\\\\LeagueClientContent_Release\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-paw\\\\src\\\\components\\\\paw-choice-ui\\\\item-choice-details-component\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\Releases_14_13\\\\LeagueClientContent_Release\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-paw\\\\src\\\\components\\\\paw-choice-ui\\\\item-choice-details-component\\\\index.js\\" "],["text","\\n\\n"],["block",["if"],[["get",["shouldShowBackButton"]]],null,13],["open-element","div",[]],["static-attr","class","paw-choice-item-details-visual"],["dynamic-attr","style",["concat",["background-image: url(",["unknown",["backgroundImage"]],")"]]],["flush-element"],["close-element"],["text","\\n"],["open-element","div",[]],["static-attr","class","paw-choice-separator"],["flush-element"],["close-element"],["text","\\n"],["open-element","div",[]],["static-attr","class","paw-choice-item-details-view"],["flush-element"],["text","\\n  "],["open-element","lol-uikit-content-block",[]],["static-attr","class","item-details-view-header"],["flush-element"],["text","\\n    "],["open-element","h4",[]],["static-attr","class","item-title"],["flush-element"],["append",["unknown",["title"]],false],["close-element"],["text","\\n    "],["open-element","span",[]],["static-attr","class","item-description"],["flush-element"],["append",["unknown",["description"]],false],["close-element"],["text","\\n  "],["close-element"],["text","\\n"],["block",["if"],[["get",["displayDetails"]]],null,12,0],["text","  "],["append",["helper",["purchase-options"],null,[["wallet","itemPurchaseOption","purchaseOptions","alwaysShowPurchaseDisclaimer","purchaseSuccess","isPurchasing","itemUnlockedMessage","errorMessage","purchase","padding"],[["get",["wallet"]],["get",["item"]],["get",["purchaseOptions"]],["get",["alwaysShowPurchaseDisclaimer"]],["get",["purchaseSuccess"]],["get",["isPurchasing"]],["get",["itemUnlockedMessage"]],["get",["errorMessage"]],"purchase","small"]]],false],["text","\\n"],["close-element"],["text","\\n"]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","  "],["open-element","lol-uikit-content-block",[]],["flush-element"],["text","\\n    "],["open-element","h5",[]],["flush-element"],["append",["unknown",["tra","cat_paw_modal_item_unlocked_title"]],false],["close-element"],["text","\\n  "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","        "],["append",["helper",["item-choice-detail-full"],null,[["title","iconUrl","subTitle","description","inventoryType"],[["get",["content","title"]],["get",["content","iconUrl"]],["get",["content","subTitle"]],["get",["content","description"]],["get",["inventoryType"]]]]],false],["text","\\n        "],["open-element","div",[]],["static-attr","class","paw-choice-separator"],["flush-element"],["close-element"],["text","\\n"]],"locals":["content"]},{"statements":[["block",["each"],[["get",["contents"]]],null,1],["text","      "]],"locals":[]},{"statements":[["block",["if"],[["get",["isFullDisplay"]]],null,2]],"locals":[]},{"statements":[["text","            "],["open-element","h6",[]],["static-attr","class","discount-breakdown-pack"],["flush-element"],["text","\\n              "],["open-element","span",[]],["flush-element"],["append",["unknown",["tra","cat_paw_bundled_discount_adjusted_title"]],false],["close-element"],["text","\\n              "],["open-element","span",[]],["static-attr","class","amount-currency"],["flush-element"],["append",["unknown",["adjustedPrice"]],false],["text"," "],["append",["unknown",["mainCurrency"]],false],["close-element"],["text","\\n            "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","            "],["open-element","h6",[]],["static-attr","class","discount-calculation-pack"],["flush-element"],["text","\\n              "],["open-element","span",[]],["flush-element"],["append",["unknown",["tra","cat_paw_modal_sale_flag_text"]],false],["close-element"],["text","\\n              "],["open-element","span",[]],["static-attr","class","amount-currency"],["flush-element"],["append",["unknown",["additionalSaleDiscount"]],false],["text"," "],["append",["unknown",["mainCurrency"]],false],["close-element"],["text","\\n            "],["close-element"],["text","\\n            "],["open-element","h6",[]],["static-attr","class","discount-breakdown-pack sale-discounted"],["flush-element"],["text","\\n                "],["open-element","span",[]],["flush-element"],["append",["unknown",["tra","cat_paw_bundled_discount_adjusted_title"]],false],["close-element"],["text","\\n                "],["open-element","span",[]],["static-attr","class","amount-currency sale-discounted"],["flush-element"],["append",["unknown",["totalSalePrice"]],false],["text"," "],["append",["unknown",["mainCurrency"]],false],["close-element"],["text","\\n            "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","        "],["open-element","h4",[]],["static-attr","class","discount-amount"],["flush-element"],["append",["unknown",["formattedDiscount"]],false],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","        "],["open-element","h4",[]],["static-attr","class","discount-amount"],["flush-element"],["append",["unknown",["formattedSaleDiscount"]],false],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","        "],["open-element","div",[]],["static-attr","class","overflow-line"],["flush-element"],["append",["unknown",["overflowTextFirstLine"]],false],["close-element"],["text","\\n        "],["open-element","div",[]],["static-attr","class","overflow-line decorator"],["flush-element"],["append",["unknown",["tra","cat_paw_choice_list_extra_items_decorator"]],false],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","            "],["open-element","p",[]],["static-attr","class","item-list-name"],["flush-element"],["append",["unknown",["content","title"]],false],["close-element"],["text","\\n"]],"locals":["content"]},{"statements":[["text","            "],["open-element","p",[]],["static-attr","class","item-list-name"],["flush-element"],["append",["unknown",["content","title"]],false],["close-element"],["text","\\n"]],"locals":["content"]},{"statements":[["text","      "],["open-element","div",[]],["static-attr","class","paw-choice-item-list"],["flush-element"],["text","\\n        "],["open-element","div",[]],["static-attr","class","item-list-column"],["flush-element"],["text","\\n"],["block",["each"],[["get",["firstColumnContents"]]],null,10],["text","        "],["close-element"],["text","\\n        "],["open-element","div",[]],["static-attr","class","item-list-column"],["flush-element"],["text","\\n"],["block",["each"],[["get",["secondColumnContents"]]],null,9],["text","        "],["close-element"],["text","\\n      "],["close-element"],["text","\\n"],["block",["if"],[["get",["isLimitedContents"]]],null,8],["text","      "],["open-element","div",[]],["static-attr","class","paw-choice-separator"],["flush-element"],["close-element"],["text","\\n      "],["open-element","lol-uikit-content-block",[]],["static-attr","class","item-discount-section"],["flush-element"],["text","\\n"],["block",["if"],[["get",["shouldShowSales"]]],null,7,6],["text","        "],["open-element","div",[]],["static-attr","class","discount-breakdown"],["flush-element"],["text","\\n          "],["open-element","h6",[]],["static-attr","class","discount-breakdown-pack unadjusted"],["flush-element"],["text","\\n            "],["open-element","span",[]],["flush-element"],["append",["unknown",["tra","cat_paw_bundled_discount_unadjusted_title"]],false],["close-element"],["text","\\n            "],["open-element","span",[]],["static-attr","class","amount-currency unadjusted"],["flush-element"],["append",["unknown",["fullPrice"]],false],["text"," "],["append",["unknown",["mainCurrency"]],false],["close-element"],["text","\\n          "],["close-element"],["text","\\n          "],["open-element","h6",[]],["static-attr","class","discount-calculation-pack"],["flush-element"],["text","\\n            "],["open-element","span",[]],["flush-element"],["append",["unknown",["tra","cat_paw_bundled_discount_calculated_title"]],false],["close-element"],["text","\\n            "],["open-element","span",[]],["static-attr","class","amount-currency"],["flush-element"],["append",["unknown",["adjustedDiscountAmount"]],false],["text"," "],["append",["unknown",["mainCurrency"]],false],["close-element"],["text","\\n          "],["close-element"],["text","\\n"],["block",["if"],[["get",["shouldShowSales"]]],null,5,4],["text","        "],["close-element"],["text","\\n      "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","    "],["open-element","lol-uikit-scrollable",[]],["static-attr","class","item-details-view-scrollable"],["static-attr","overflow-masks","enabled"],["flush-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","item-details-view-list"],["flush-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","paw-choice-separator"],["flush-element"],["close-element"],["text","\\n"],["block",["if"],[["get",["isListDisplay"]]],null,11,3],["text","      "],["open-element","div",[]],["static-attr","class","paw-choice-separator"],["flush-element"],["close-element"],["text","\\n    "],["close-element"],["text","\\n  "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["open-element","div",[]],["static-attr","class","paw-choice-back-button"],["modifier",["action"],[["get",[null]],"goBackToMain"]],["flush-element"],["close-element"],["text","\\n"]],"locals":[]}],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, n) => {
        "use strict";
        n.r(t);
      },
      (e, t, n) => {
        "use strict";
        var a = n(1),
          s = n(3);
        const { Component: l, computed: o } = a.Ember,
          i = l.extend({
            classNames: ["paw-content-choice-detail"],
            layout: n(114),
            style: n(115),
            title: null,
            subTitle: null,
            description: null,
            iconUrl: null,
            inventoryType: null,
            subTitleForInventoryType: o(
              "subTitle",
              "inventoryType",
              function () {
                const e = this.get("subTitle");
                return this.get("inventoryType") ===
                  s.PAW.INVENTORY_TYPES.STATSTONE
                  ? this.get("tra").get(`cat_paw_bundled_eternal_rarity_${e}`)
                  : (a.logger.warning(
                      "Bundle item type not yet supported, setting subtitle to null",
                    ),
                    null);
              },
            ),
          });
        e.exports = i;
      },
      (e, t, n) => {
        const a = n(1).Ember;
        e.exports = a.HTMLBars.template({
          id: "smM6He8p",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\Releases_14_13\\\\LeagueClientContent_Release\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-paw\\\\src\\\\components\\\\paw-choice-ui\\\\item-choice-detail-full-component\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\Releases_14_13\\\\LeagueClientContent_Release\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-paw\\\\src\\\\components\\\\paw-choice-ui\\\\item-choice-detail-full-component\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\Releases_14_13\\\\LeagueClientContent_Release\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-paw\\\\src\\\\components\\\\paw-choice-ui\\\\item-choice-detail-full-component\\\\index.js\\" "],["text","\\n"],["open-element","div",[]],["static-attr","class","item-details-component"],["flush-element"],["text","\\n  "],["open-element","img",[]],["static-attr","class","item-details-icon"],["dynamic-attr","src",["concat",[["unknown",["iconUrl"]]]]],["flush-element"],["close-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","item-details-info"],["flush-element"],["text","\\n    "],["open-element","span",[]],["static-attr","class","item-details-title"],["flush-element"],["append",["unknown",["title"]],false],["close-element"],["text","\\n"],["block",["if"],[["get",["subTitleForInventoryType"]]],null,0],["text","    "],["open-element","span",[]],["static-attr","class","item-details-description"],["flush-element"],["append",["unknown",["description"]],false],["close-element"],["text","\\n  "],["close-element"],["text","\\n"],["close-element"]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","    "],["open-element","span",[]],["static-attr","class","item-details-sub-title"],["flush-element"],["append",["unknown",["subTitleForInventoryType"]],false],["close-element"],["text","\\n"]],"locals":[]}],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, n) => {
        "use strict";
        n.r(t);
      },
      (e, t, n) => {
        "use strict";
        var a,
          s = n(1),
          l = n(3),
          o = (a = n(60)) && a.__esModule ? a : { default: a };
        const { Component: i, computed: c } = s.Ember,
          r = [
            {
              inventoryType: l.PAW.INVENTORY_TYPES.BUNDLES,
              subInventoryType: o.default.STATSTONES_BUNDLE,
            },
          ],
          p = i.extend({
            classNames: ["paw-bundle-root-component"],
            layout: n(117),
            style: n(118),
            hasDiscount: c(
              "catalogItemPurchaseOption.sale.discount",
              function () {
                return this.get("catalogItemPurchaseOption.sale.discount") > 0;
              },
            ),
            formattedBundledItems: c(
              "catalogItemPurchaseOption.bundledItems",
              "catalogItemPurchaseOption.hiddenBundleItems",
              function () {
                const e = this.get(
                  "catalogItemPurchaseOption.hiddenBundleItems",
                );
                return this.get("catalogItemPurchaseOption.bundledItems")
                  .filter(
                    (t) =>
                      !e ||
                      !e.find(
                        (e) =>
                          t.itemId === e.itemId &&
                          t.inventoryType === e.inventoryType,
                      ),
                  )
                  .map((e) => {
                    const {
                        inventoryType: t,
                        itemId: n,
                        assets: a,
                        hasVisibleLootOdds: s,
                        subInventoryType: o,
                        bundledItemPrice: i,
                      } = e,
                      { CHAMPION_SKIN: c } = l.PAW.INVENTORY_TYPES,
                      { iconPath: r, tilePath: p } = a,
                      m = i.quantity,
                      u = e.owned,
                      d = this._getStatstoneRarity(e),
                      h = this._getItemSubtitle(e),
                      g =
                        m > 1
                          ? this.get("tra").formatString(
                              "cat_paw_bundle_item_quantity_and_name",
                              { quantity: m, name: e.name },
                            )
                          : e.name;
                    return {
                      itemBackgroundPath:
                        t === c
                          ? 'url("/fe/lol-paw/images/bg-chroma-card.jpg")'
                          : void 0,
                      imagePath:
                        r ||
                        p ||
                        e.imagePath ||
                        "/fe/lol-paw/images/not-found.png",
                      itemId: n,
                      owned: u,
                      itemRarity: d,
                      itemSubtitle: h,
                      hasVisibleLootOdds: s,
                      name: g,
                      subInventoryType: o,
                    };
                  });
              },
            ),
            displayBundleNonRefundableDisclaimer: s.Ember.computed(
              "catalogItemPurchaseOption.item.inventoryType",
              "catalogItemPurchaseOption.item.subInventoryType",
              "alwaysShowPurchaseDisclaimer",
              function () {
                if (this.get("alwaysShowPurchaseDisclaimer")) return !1;
                const e =
                    this.get("catalogItemPurchaseOption.item.inventoryType") ||
                    "",
                  t =
                    this.get(
                      "catalogItemPurchaseOption.item.subInventoryType",
                    ) || "";
                return (
                  -1 ===
                  r.findIndex(
                    (n) => n.inventoryType === e && n.subInventoryType === t,
                  )
                );
              },
            ),
            showPrice: c("errorMessage", function () {
              return !this.get("errorMessage");
            }),
            infoContainerWidthClass: c(
              "catalogItemPurchaseOption.pawSplashImage",
              function () {
                return !!this.get("catalogItemPurchaseOption.pawSplashImage")
                  ? "paw-bundle-root-info-container-half-size"
                  : "paw-bundle-root-info-container-full-size";
              },
            ),
            _getStatstoneRarity(e) {
              const { inventoryType: t, tags: n } = e,
                { STATSTONE: a } = l.PAW.INVENTORY_TYPES;
              if (t === a) {
                return n.includes("statstone_epic")
                  ? this.get("tra.cat_paw_bundled_eternal_rarity_epic")
                  : this.get("tra.cat_paw_bundled_eternal_rarity_common");
              }
              return null;
            },
            _getItemSubtitle(e) {
              const { inventoryType: t, subInventoryType: n } = e;
              return n === o.default.CHROMA
                ? this.get("tra.cat_paw_bundled_type_chroma")
                : this.get(`tra.cat_paw_bundled_type_${t.toLowerCase()}`);
            },
            actions: {
              purchase: function (e) {
                this.sendAction("purchase", e);
              },
            },
          });
        e.exports = p;
      },
      (e, t, n) => {
        const a = n(1).Ember;
        e.exports = a.HTMLBars.template({
          id: "sznaDmw2",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\Releases_14_13\\\\LeagueClientContent_Release\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-paw\\\\src\\\\components\\\\bundle\\\\bundle-root-component\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\Releases_14_13\\\\LeagueClientContent_Release\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-paw\\\\src\\\\components\\\\bundle\\\\bundle-root-component\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\Releases_14_13\\\\LeagueClientContent_Release\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-paw\\\\src\\\\components\\\\bundle\\\\bundle-root-component\\\\index.js\\" "],["text","\\n"],["block",["if"],[["get",["catalogItemPurchaseOption","pawSplashImage"]]],null,2],["text","\\n"],["open-element","div",[]],["dynamic-attr","class",["concat",["paw-bundle-root-info-container ",["unknown",["infoContainerWidthClass"]]]]],["flush-element"],["text","\\n"],["text","    "],["open-element","div",[]],["static-attr","class","paw-bundle-root-title"],["flush-element"],["text","\\n        "],["append",["helper",["bundle-title"],null,[["title","subtitle"],[["get",["catalogItemPurchaseOption","item","name"]],["get",["catalogItemPurchaseOption","item","subtitle"]]]]],false],["text","\\n    "],["close-element"],["text","\\n\\n    "],["open-element","div",[]],["static-attr","class","paw-bundle-root-separator"],["flush-element"],["close-element"],["text","\\n\\n\\n    "],["open-element","div",[]],["static-attr","class","paw-bundle-root-shrinking-wrapper"],["flush-element"],["text","\\n"],["block",["if"],[["get",["catalogItemPurchaseOption","item","description"]]],null,1],["text","        "],["open-element","div",[]],["static-attr","class","paw-bundle-root-items"],["flush-element"],["text","\\n            "],["append",["helper",["bundle-items"],null,[["catalogItemPurchaseOption","formattedBundledItems","displayBundleNonRefundableDisclaimer","alwaysShowPurchaseDisclaimer","showPrice"],[["get",["catalogItemPurchaseOption"]],["get",["formattedBundledItems"]],["get",["displayBundleNonRefundableDisclaimer"]],["get",["alwaysShowPurchaseDisclaimer"]],["get",["showPrice"]]]]],false],["text","\\n        "],["close-element"],["text","\\n    "],["close-element"],["text","\\n\\n    "],["open-element","div",[]],["static-attr","class","paw-bundle-root-separator"],["flush-element"],["close-element"],["text","\\n\\n\\n    \\n"],["block",["if"],[["get",["showPrice"]]],null,0],["text","\\n"],["text","    "],["open-element","div",[]],["static-attr","class","paw-bundle-root-footer"],["flush-element"],["text","\\n        "],["append",["helper",["bundle-purchase"],null,[["catalogItemPurchaseOption","wallet","purchase","isPurchasing","purchaseSuccess","alwaysShowPurchaseDisclaimer","displayBundleNonRefundableDisclaimer","errorMessage","validationErrors"],[["get",["catalogItemPurchaseOption"]],["get",["wallet"]],"purchase",["get",["isPurchasing"]],["get",["purchaseSuccess"]],["get",["alwaysShowPurchaseDisclaimer"]],["get",["displayBundleNonRefundableDisclaimer"]],["get",["errorMessage"]],["get",["validationErrors"]]]]],false],["text","\\n    "],["close-element"],["text","\\n"],["close-element"]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","        "],["open-element","div",[]],["static-attr","class","paw-bundle-root-price"],["flush-element"],["text","\\n            "],["append",["helper",["bundle-price"],null,[["catalogItemPurchaseOption"],[["get",["catalogItemPurchaseOption"]]]]],false],["text","\\n        "],["close-element"],["text","\\n\\n        "],["open-element","div",[]],["static-attr","class","paw-bundle-root-separator"],["flush-element"],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","            "],["open-element","div",[]],["static-attr","class","paw-bundle-root-description"],["flush-element"],["text","\\n                "],["append",["helper",["bundle-description"],null,[["description"],[["get",["catalogItemPurchaseOption","item","description"]]]]],false],["text","\\n            "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","    "],["open-element","div",[]],["static-attr","class","paw-bundle-root-image-container"],["flush-element"],["text","\\n        "],["open-element","div",[]],["static-attr","class","paw-bundle-root-image-and-tags"],["flush-element"],["text","\\n            "],["append",["helper",["top-banner"],null,[["itemPurchaseOption"],[["get",["itemPurchaseOption"]]]]],false],["text","\\n            "],["open-element","img",[]],["static-attr","class","paw-bundle-image"],["dynamic-attr","src",["unknown",["catalogItemPurchaseOption","pawSplashImage"]],null],["flush-element"],["close-element"],["text","\\n        "],["close-element"],["text","\\n    "],["close-element"],["text","\\n\\n    "],["open-element","div",[]],["static-attr","class","paw-bundle-root-vertical-line"],["flush-element"],["close-element"],["text","\\n"]],"locals":[]}],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, n) => {
        "use strict";
        n.r(t);
      },
      (e, t, n) => {
        "use strict";
        var a = n(1);
        const { Component: s, computed: l } = a.Ember,
          o = s.extend({
            classNames: ["paw-bundle-title-component"],
            layout: n(120),
            style: n(121),
          });
        e.exports = o;
      },
      (e, t, n) => {
        const a = n(1).Ember;
        e.exports = a.HTMLBars.template({
          id: "50jQZbwD",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\Releases_14_13\\\\LeagueClientContent_Release\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-paw\\\\src\\\\components\\\\bundle\\\\bundle-title-component\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\Releases_14_13\\\\LeagueClientContent_Release\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-paw\\\\src\\\\components\\\\bundle\\\\bundle-title-component\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\Releases_14_13\\\\LeagueClientContent_Release\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-paw\\\\src\\\\components\\\\bundle\\\\bundle-title-component\\\\index.js\\" "],["text","\\n"],["open-element","div",[]],["static-attr","class","paw-bundle-title-top"],["flush-element"],["append",["unknown",["title"]],false],["close-element"]],"locals":[],"named":[],"yields":[],"blocks":[],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, n) => {
        "use strict";
        n.r(t);
      },
      (e, t, n) => {
        "use strict";
        var a = n(1);
        const { Component: s, computed: l } = a.Ember,
          o = s.extend({
            classNames: ["paw-bundle-description-component"],
            layout: n(123),
            style: n(124),
            isOverflowing: !1,
            seeMoreIsExpanded: !1,
            didInsertElement() {
              this._super(...arguments);
              const e = this.get("element").querySelector(
                ".paw-bundle-description-text",
              );
              e && this.set("isOverflowing", e.scrollHeight > e.clientHeight);
            },
            descriptionIsShrunk: l(
              "isOverflowing",
              "seeMoreIsExpanded",
              function () {
                return (
                  this.get("isOverflowing") && !this.get("seeMoreIsExpanded")
                );
              },
            ),
            descriptionIsExpanded: l(
              "isOverflowing",
              "seeMoreIsExpanded",
              function () {
                return (
                  this.get("isOverflowing") && this.get("seeMoreIsExpanded")
                );
              },
            ),
            actions: {
              toggleSeeMore() {
                this.set("seeMoreIsExpanded", !this.get("seeMoreIsExpanded"));
              },
            },
          });
        e.exports = o;
      },
      (e, t, n) => {
        const a = n(1).Ember;
        e.exports = a.HTMLBars.template({
          id: "UUBIOSoy",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\Releases_14_13\\\\LeagueClientContent_Release\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-paw\\\\src\\\\components\\\\bundle\\\\bundle-description-component\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\Releases_14_13\\\\LeagueClientContent_Release\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-paw\\\\src\\\\components\\\\bundle\\\\bundle-description-component\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\Releases_14_13\\\\LeagueClientContent_Release\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-paw\\\\src\\\\components\\\\bundle\\\\bundle-description-component\\\\index.js\\" "],["text","\\n"],["open-element","div",[]],["dynamic-attr","class",["concat",["paw-bundle-description-container ",["helper",["if"],[["get",["descriptionIsExpanded"]],"paw-bundle-description-container--expanded"],null]]]],["flush-element"],["text","\\n"],["text","    "],["open-element","div",[]],["static-attr","class","paw-bundle-description-text"],["flush-element"],["text","\\n        "],["append",["unknown",["description"]],true],["text","\\n    "],["close-element"],["text","\\n\\n\\n"],["block",["if"],[["get",["descriptionIsExpanded"]]],null,2],["block",["if"],[["get",["isOverflowing"]]],null,1],["close-element"],["text","\\n"]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","            "],["open-element","div",[]],["static-attr","class","paw-bundle-description-shadow"],["flush-element"],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","    "],["open-element","div",[]],["static-attr","class","paw-bundle-description-expand-container"],["modifier",["action"],[["get",[null]],"toggleSeeMore"]],["flush-element"],["text","\\n"],["block",["if"],[["get",["descriptionIsShrunk"]]],null,0],["text","        "],["open-element","div",[]],["static-attr","class","paw-bundle-description-expand-text"],["flush-element"],["append",["unknown",["tra","cat_paw_bundle_see_more"]],false],["close-element"],["text","\\n        "],["open-element","div",[]],["static-attr","class","paw-bundle-description-down-carat"],["flush-element"],["close-element"],["text","\\n    "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","        "],["open-element","div",[]],["static-attr","class","paw-bundle-description-separator"],["flush-element"],["close-element"],["text","\\n"]],"locals":[]}],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, n) => {
        "use strict";
        n.r(t);
      },
      (e, t, n) => {
        "use strict";
        var a = n(1);
        const { Component: s } = a.Ember,
          l = s.extend({
            classNames: ["paw-bundle-item-component"],
            layout: n(126),
            lootTableItemName: null,
            style: n(127),
            actions: {
              closeLootTableModal() {
                this.set("lootTableItemName", null);
              },
              openLootTableModal(e) {
                this.set("lootTableItemName", `CHEST_${e}_OPEN`);
              },
            },
          });
        e.exports = l;
      },
      (e, t, n) => {
        const a = n(1).Ember;
        e.exports = a.HTMLBars.template({
          id: "/uiR2dza",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\Releases_14_13\\\\LeagueClientContent_Release\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-paw\\\\src\\\\components\\\\bundle\\\\bundle-items-component\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\Releases_14_13\\\\LeagueClientContent_Release\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-paw\\\\src\\\\components\\\\bundle\\\\bundle-items-component\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\Releases_14_13\\\\LeagueClientContent_Release\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-paw\\\\src\\\\components\\\\bundle\\\\bundle-items-component\\\\index.js\\" "],["text","\\n"],["open-element","div",[]],["static-attr","class","paw-bundle-item-header"],["flush-element"],["append",["unknown",["tra","cat_paw_bundle_purchase_summary"]],false],["close-element"],["text","\\n"],["open-element","div",[]],["static-attr","class","paw-bundle-item-wrapper"],["flush-element"],["text","\\n    "],["open-element","lol-uikit-scrollable",[]],["flush-element"],["text","\\n"],["block",["each"],[["get",["formattedBundledItems"]]],null,4],["text","    "],["close-element"],["text","\\n"],["close-element"],["text","\\n\\n"],["block",["if"],[["get",["lootTableItemName"]]],null,1]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","        "],["append",["helper",["loot-table-root"],null,[["name"],[["get",["lootTableItemName"]]]]],false],["text","\\n"]],"locals":[]},{"statements":[["block",["uikit-modal"],null,[["show","type","dismissibleType","onClose"],["true","DialogDismiss","inside",["helper",["action"],[["get",[null]],"closeLootTableModal"],null]]],0]],"locals":[]},{"statements":[["text","                        "],["append",["unknown",["tra","cat_paw_bundled_item_purchased"]],false],["text","\\n"]],"locals":[]},{"statements":[["text","                        "],["open-element","div",[]],["static-attr","class","paw-bundle-item-loot-table-link"],["dynamic-attr","onclick",["helper",["action"],[["get",[null]],"openLootTableModal",["get",["item","itemId"]]],null],null],["flush-element"],["text","\\n                            "],["append",["unknown",["tra","cat_paw_bundle_view_drop_rates"]],false],["text","\\n                        "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","            "],["open-element","div",[]],["static-attr","class","paw-bundle-item-container"],["flush-element"],["text","\\n                "],["open-element","div",[]],["static-attr","class","paw-bundle-item-overlay"],["flush-element"],["text","\\n                    "],["open-element","div",[]],["static-attr","class","paw-bundle-item-overlay-image"],["dynamic-attr","style",["concat",["background-image: ",["unknown",["item","itemBackgroundPath"]]]]],["flush-element"],["text","\\n                        "],["open-element","img",[]],["dynamic-attr","src",["unknown",["item","imagePath"]],null],["flush-element"],["close-element"],["text","\\n                    "],["close-element"],["text","\\n                "],["close-element"],["text","\\n\\n                "],["open-element","div",[]],["static-attr","class","paw-bundle-item-content"],["flush-element"],["text","\\n                    "],["open-element","div",[]],["static-attr","class","paw-bundle-item-title"],["flush-element"],["text","\\n                        "],["append",["unknown",["item","name"]],false],["text","\\n                    "],["close-element"],["text","\\n                    "],["open-element","div",[]],["static-attr","class","paw-bundle-item-type"],["flush-element"],["text","\\n                        "],["append",["unknown",["item","itemRarity"]],false],["text","\\n                    "],["close-element"],["text","\\n                    "],["open-element","div",[]],["static-attr","class","paw-bundle-item-subtitle"],["flush-element"],["text","\\n                        "],["append",["unknown",["item","itemSubtitle"]],false],["text","\\n                    "],["close-element"],["text","\\n"],["block",["if"],[["get",["item","hasVisibleLootOdds"]]],null,3],["text","                "],["close-element"],["text","\\n\\n                "],["open-element","div",[]],["static-attr","class","paw-bundle-item-purchased"],["flush-element"],["text","\\n"],["block",["if"],[["get",["item","owned"]]],null,2],["text","                "],["close-element"],["text","\\n            "],["close-element"],["text","\\n"]],"locals":["item"]}],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, n) => {
        "use strict";
        n.r(t);
      },
      (e, t, n) => {
        "use strict";
        var a = n(1);
        const { Component: s, computed: l } = a.Ember,
          o = s.extend({
            classNames: ["paw-bundle-price-component"],
            layout: n(129),
            style: n(130),
            adjustedTotalAmount: l.readOnly(
              "catalogItemPurchaseOption.purchaseOptions.0.priceDetails.0.price.price",
            ),
            unadjustedTotalAmount: l(
              "catalogItemPurchaseOption.bundledItems",
              function () {
                const e = this.get("catalogItemPurchaseOption.bundledItems");
                let t = 0;
                return (
                  e.forEach((e) => {
                    const n = e.bundledItemPrice.discountPrices.find(
                        (e) => "RP" === e.currency,
                      ),
                      a = n ? n.originalCost : 0;
                    t += e.bundledItemPrice.quantity * a;
                  }),
                  t
                );
              },
            ),
            discountPercentage: l(
              "adjustedTotalAmount",
              "unadjustedTotalAmount",
              function () {
                const e = this.get("adjustedTotalAmount"),
                  t = this.get("unadjustedTotalAmount");
                return Math.round(((t - e) / t) * 100);
              },
            ),
            hasDiscount: l("discountPercentage", function () {
              return this.get("discountPercentage") > 0;
            }),
          });
        e.exports = o;
      },
      (e, t, n) => {
        const a = n(1).Ember;
        e.exports = a.HTMLBars.template({
          id: "yV7SkB5t",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\Releases_14_13\\\\LeagueClientContent_Release\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-paw\\\\src\\\\components\\\\bundle\\\\bundle-price-component\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\Releases_14_13\\\\LeagueClientContent_Release\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-paw\\\\src\\\\components\\\\bundle\\\\bundle-price-component\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\Releases_14_13\\\\LeagueClientContent_Release\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-paw\\\\src\\\\components\\\\bundle\\\\bundle-price-component\\\\index.js\\" "],["text","\\n"],["open-element","div",[]],["static-attr","class","paw-bundle-price-total"],["flush-element"],["append",["unknown",["tra","cat_paw_bundled_discount_unadjusted_title"]],false],["close-element"],["text","\\n"],["open-element","img",[]],["static-attr","class","paw-bundle-price-currency-icon"],["static-attr","src","fe/lol-paw/images/rp-icon.svg"],["flush-element"],["close-element"],["text","\\n"],["open-element","div",[]],["static-attr","class","paw-bundle-price-amount"],["flush-element"],["append",["unknown",["adjustedTotalAmount"]],false],["text"," "],["append",["unknown",["tra","cat_paw_modal_currency_rp"]],false],["close-element"],["text","\\n"]],"locals":[],"named":[],"yields":[],"blocks":[],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, n) => {
        "use strict";
        n.r(t);
      },
      (e, t, n) => {
        "use strict";
        var a,
          s = n(1),
          l = (a = n(61)) && a.__esModule ? a : { default: a };
        const { Component: o, computed: i } = s.Ember,
          c = o.extend({
            classNames: ["paw-bundle-purchase-component"],
            layout: n(132),
            style: n(133),
            displayDisclaimers: s.Ember.computed.or(
              "displayBundleNonRefundableDisclaimer",
              "alwaysShowPurchaseDisclaimer",
            ),
            disclaimersAccepted: !1,
            didInsertElement: function () {
              window.splash = this;
            },
            termsOfServiceDisclaimer: i(function () {
              const e = this.get("tra"),
                t = e.get("cat_paw_purchase_disclaimer_link");
              return s.Ember.String.htmlSafe(
                e.formatString("cat_paw_bundle_tos_disclaimer", {
                  disclaimerLink: t,
                }),
              );
            }),
            purchaseRestricted: s.Ember.computed(
              "validationErrors",
              function () {
                const e = this.get("validationErrors");
                if (e)
                  return !!e.find(
                    (e) =>
                      e.id === l.default.ValidationErrorKeys.PARENT_NOT_OWNED,
                  );
              },
            ),
            purchaseEnabled: s.Ember.computed(
              "displayDisclaimers",
              "disclaimersAccepted",
              function () {
                return (
                  !this.get("displayDisclaimers") ||
                  this.get("disclaimersAccepted")
                );
              },
            ),
            actions: {
              acceptDisclaimer: function () {
                this.set(
                  "disclaimersAccepted",
                  !this.get("disclaimersAccepted"),
                );
              },
              purchase: function (e) {
                this.sendAction("purchase", e);
              },
            },
          });
        e.exports = c;
      },
      (e, t, n) => {
        const a = n(1).Ember;
        e.exports = a.HTMLBars.template({
          id: "GqZ52s09",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\Releases_14_13\\\\LeagueClientContent_Release\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-paw\\\\src\\\\components\\\\bundle\\\\bundle-purchase-component\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\Releases_14_13\\\\LeagueClientContent_Release\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-paw\\\\src\\\\components\\\\bundle\\\\bundle-purchase-component\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\Releases_14_13\\\\LeagueClientContent_Release\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-paw\\\\src\\\\components\\\\bundle\\\\bundle-purchase-component\\\\index.js\\" "],["text","\\n"],["block",["if"],[["get",["purchaseSuccess"]]],null,11,10]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","    "],["append",["helper",["price-button"],null,[["itemPurchaseOption","wallet","purchaseOption","purchaseEnabled","purchase"],[["get",["catalogItemPurchaseOption","item"]],["get",["wallet"]],["get",["purchaseOption"]],["get",["purchaseEnabled"]],"purchase"]]],false],["text","\\n"]],"locals":["purchaseOption"]},{"statements":[["text","          "],["append",["unknown",["termsOfServiceDisclaimer"]],false],["text","\\n"]],"locals":[]},{"statements":[["text","          "],["append",["unknown",["tra","cat_paw_bundled_disclaimer_bundle_non_refundable"]],false],["text","\\n"]],"locals":[]},{"statements":[["text","    "],["open-element","lol-uikit-flat-checkbox",[]],["static-attr","name","pawPurchaseDisclaimer"],["static-attr","class","paw-bundle-purchase-disclaimer-checkbox"],["flush-element"],["text","\\n      "],["open-element","input",[]],["static-attr","slot","input"],["static-attr","type","checkbox"],["static-attr","name","pawPurchaseDisclaimer"],["dynamic-attr","onchange",["helper",["action"],[["get",[null]],"acceptDisclaimer"],null],null],["flush-element"],["close-element"],["text","\\n      "],["open-element","label",[]],["static-attr","slot","label"],["static-attr","for","pawPurchaseDisclaimer"],["static-attr","class","paw-bundle-purchase-disclaimer-text"],["flush-element"],["text","\\n"],["block",["if"],[["get",["displayBundleNonRefundableDisclaimer"]]],null,2],["block",["if"],[["get",["alwaysShowPurchaseDisclaimer"]]],null,1],["text","      "],["close-element"],["text","\\n    "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["block",["if"],[["get",["displayDisclaimers"]]],null,3],["block",["each"],[["get",["catalogItemPurchaseOption","purchaseOptions"]]],null,0]],"locals":[]},{"statements":[["text","  "],["open-element","div",[]],["static-attr","class","paw-bundle-bottom-generic-error"],["flush-element"],["text","\\n      "],["open-element","p",[]],["flush-element"],["append",["unknown",["errorMessage"]],false],["close-element"],["text","\\n  "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["block",["if"],[["get",["errorMessage"]]],null,5,4]],"locals":[]},{"statements":[["text","  "],["open-element","div",[]],["static-attr","class","paw-bundle-bottom-purchase-error"],["flush-element"],["text","\\n      "],["open-element","p",[]],["flush-element"],["append",["unknown",["errorMessage"]],false],["close-element"],["text","\\n  "],["close-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","paw-bundle-bottom-purchase"],["flush-element"],["text","\\n      "],["append",["helper",["price-details"],null,[["purchaseOptions","wallet","purchaseEnabled","purchase"],[["get",["catalogItemPurchaseOption","purchaseOptions"]],["get",["wallet"]],false,"purchase"]]],false],["text","\\n  "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["block",["if"],[["get",["purchaseRestricted"]]],null,7,6]],"locals":[]},{"statements":[["text","  "],["open-element","div",[]],["static-attr","class","spinner-wrapper"],["flush-element"],["text","\\n    "],["append",["helper",["uikit-spinner"],null,[["src"],["/fe/lol-paw/images/spinner.png"]]],false],["text","\\n  "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["block",["if"],[["get",["isPurchasing"]]],null,9,8]],"locals":[]},{"statements":[["text","  "],["append",["helper",["item-unlocked"],null,[["itemPurchaseOption"],[["get",["itemPurchaseOption","catalogItemPurchaseOption","item"]]]]],false],["text","\\n"]],"locals":[]}],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, n) => {
        "use strict";
        n.r(t);
      },
      (e, t, n) => {
        "use strict";
        var a,
          s = n(1),
          l = (a = n(68)) && a.__esModule ? a : { default: a },
          o = n(3);
        const { computed: i } = s.Ember,
          c = l.default.extend({
            showOverlayImage: !0,
            layout: n(135),
            champion: i("bundledItems", function () {
              const e = this.get("bundledItems");
              return e
                ? e.find(
                    (e) => e.inventoryType === o.PAW.INVENTORY_TYPES.CHAMPION,
                  )
                : null;
            }),
            skin: i("bundledItems", function () {
              const e = this.get("bundledItems");
              return e
                ? e.find(
                    (e) =>
                      e.inventoryType === o.PAW.INVENTORY_TYPES.CHAMPION_SKIN &&
                      !e.subInventoryType,
                  )
                : null;
            }),
            itemSubtitle: i("champion.owned", "skin.owned", function () {
              const e = this.get("champion.owned")
                ? this.get("skin.owned")
                  ? "cat_paw_modal_chroma_bundles_subtitle"
                  : "cat_paw_modal_chroma_bundles_with_skin_subtitle"
                : "cat_paw_modal_chroma_bundles_with_champion_subtitle";
              return this.get(`tra.${e}`);
            }),
          });
        e.exports = c;
      },
      (e, t, n) => {
        const a = n(1).Ember;
        e.exports = a.HTMLBars.template({
          id: "kXBeidhl",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\Releases_14_13\\\\LeagueClientContent_Release\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-paw\\\\src\\\\components\\\\ui\\\\chroma-bundle\\\\chroma-bundle-details-component\\\\layout.hbs\\" style-path=\\"null\\" js-path=\\"T:\\\\cid\\\\p4\\\\Releases_14_13\\\\LeagueClientContent_Release\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-paw\\\\src\\\\components\\\\ui\\\\chroma-bundle\\\\chroma-bundle-details-component\\\\index.js\\" "],["text","\\n"],["append",["helper",["item-splash"],null,[["itemPurchaseOption","showOverlayImage"],[["get",["skin"]],["get",["showOverlayImage"]]]]],false],["text","\\n"],["open-element","div",[]],["static-attr","class","item-inner-content"],["flush-element"],["text","\\n  "],["append",["helper",["chroma-bundle-overlay-image"],null,[["showOverlayImage","bundledItems"],[["get",["showOverlayImage"]],["get",["bundledItems"]]]]],false],["text","\\n  "],["append",["helper",["content-description"],null,[["itemPurchaseOption","purchaseSuccess","itemSubtitle"],[["get",["itemPurchaseOption"]],["get",["purchaseSuccess"]],["get",["itemSubtitle"]]]]],false],["text","\\n"],["close-element"],["text","\\n"],["append",["helper",["chroma-bundle-content-items"],null,[["bundledItems"],[["get",["bundledItems"]]]]],false],["text","\\n"],["open-element","hr",[]],["static-attr","class","content-separator"],["flush-element"],["close-element"],["text","\\n"]],"locals":[],"named":[],"yields":[],"blocks":[],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, n) => {
        "use strict";
        var a = n(1),
          s = i(n(80)),
          l = n(3),
          o = i(n(60));
        function i(e) {
          return e && e.__esModule ? e : { default: e };
        }
        const { computed: c } = a.Ember,
          r = s.default.extend({
            classNames: [
              "paw-overlay-image-content",
              "paw-chroma-bundle-overlay-image-content",
            ],
            showChromaIcon: !0,
            layout: n(137),
            style: n(138),
            overlayImagePath: c.readOnly("showingChroma.assets.iconPath"),
            skin: c("bundledItems", function () {
              return this.get("bundledItems")
                ? this.get("bundledItems").find(
                    (e) =>
                      e.inventoryType === l.PAW.INVENTORY_TYPES.CHAMPION_SKIN &&
                      !e.subInventoryType,
                  )
                : null;
            }),
            unownedChromas: c("bundledItems", function () {
              return this.get("bundledItems")
                ? this.get("bundledItems").filter(
                    (e) =>
                      !e.owned &&
                      e.inventoryType === l.PAW.INVENTORY_TYPES.CHAMPION_SKIN &&
                      e.subInventoryType === o.default.CHROMA,
                  )
                : [];
            }),
            didInsertElement() {
              this._setDefaultShowingChroma();
            },
            actions: {
              showPreview: function (e) {
                this.set("showingChroma", e);
              },
            },
            _setDefaultShowingChroma() {
              const e = this.get("skin"),
                t = this.get("unownedChromas");
              this.set(
                "showingChroma",
                e && e.owned ? (t.length > 0 ? t[0] : null) : e,
              );
            },
          });
        e.exports = r;
      },
      (e, t, n) => {
        const a = n(1).Ember;
        e.exports = a.HTMLBars.template({
          id: "Q89TL7WH",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\Releases_14_13\\\\LeagueClientContent_Release\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-paw\\\\src\\\\components\\\\ui\\\\chroma-bundle\\\\chroma-bundle-overlay-image-component\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\Releases_14_13\\\\LeagueClientContent_Release\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-paw\\\\src\\\\components\\\\ui\\\\chroma-bundle\\\\chroma-bundle-overlay-image-component\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\Releases_14_13\\\\LeagueClientContent_Release\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-paw\\\\src\\\\components\\\\ui\\\\chroma-bundle\\\\chroma-bundle-overlay-image-component\\\\index.js\\" "],["text","\\n"],["block",["if"],[["get",["showOverlayImage"]]],null,3]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","        "],["append",["helper",["chroma-button"],null,[["chroma","showPreview","showingChroma"],[["get",["chroma"]],"showPreview",["get",["showingChroma"]]]]],false],["text","\\n"]],"locals":["chroma"]},{"statements":[["text","        "],["append",["helper",["chroma-button"],null,[["chroma","showPreview","showingChroma"],[["get",["skin"]],"showPreview",["get",["showingChroma"]]]]],false],["text","\\n"]],"locals":[]},{"statements":[["text","        "],["open-element","img",[]],["static-attr","src","/fe/lol-paw/images/icon-chroma.png"],["static-attr","class","chroma-icon"],["flush-element"],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","  "],["open-element","div",[]],["static-attr","class","overlay-image-wrapper"],["flush-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","overlay-image-border"],["dynamic-attr","style",["concat",["background-image: ",["unknown",["overlayBackgroundPath"]]]]],["flush-element"],["text","\\n      "],["open-element","img",[]],["static-attr","class","paw-purchase-overlay-image"],["dynamic-attr","src",["concat",[["unknown",["overlayImagePath"]]]]],["flush-element"],["close-element"],["text","\\n"],["block",["if"],[["get",["showChromaIcon"]]],null,2],["text","    "],["close-element"],["text","\\n\\n    "],["open-element","lol-uikit-scrollable",[]],["static-attr","class","chroma-selection"],["flush-element"],["text","\\n"],["block",["unless"],[["get",["skin","owned"]]],null,1],["block",["each"],[["get",["unownedChromas"]]],null,0],["text","    "],["close-element"],["text","\\n  "],["close-element"],["text","\\n"]],"locals":[]}],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, n) => {
        "use strict";
        n.r(t);
      },
      (e, t, n) => {
        "use strict";
        var a = n(1);
        const { Component: s, computed: l } = a.Ember,
          o = s.extend({
            classNames: ["paw-chroma-button"],
            classNameBindings: ["active"],
            layout: n(140),
            style: n(141),
            active: l("showingChroma", "chroma", function () {
              return this.get("showingChroma") === this.get("chroma");
            }),
            color: l("chroma.assets.colors.[]", function () {
              const e = this.get("chroma.assets.colors");
              if (e)
                return 1 !== e.length && e[1]
                  ? "linear-gradient(135deg, " +
                      e[0] +
                      " 0%, " +
                      e[0] +
                      " 50%, " +
                      e[1] +
                      " 50%, " +
                      e[1] +
                      " 100%)"
                  : e[0];
            }),
            mouseEnter: function () {
              this.sendAction("showPreview", this.get("chroma"));
            },
          });
        e.exports = o;
      },
      (e, t, n) => {
        const a = n(1).Ember;
        e.exports = a.HTMLBars.template({
          id: "4sWw9P92",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\Releases_14_13\\\\LeagueClientContent_Release\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-paw\\\\src\\\\components\\\\ui\\\\chroma-bundle\\\\chroma-button-component\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\Releases_14_13\\\\LeagueClientContent_Release\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-paw\\\\src\\\\components\\\\ui\\\\chroma-bundle\\\\chroma-button-component\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\Releases_14_13\\\\LeagueClientContent_Release\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-paw\\\\src\\\\components\\\\ui\\\\chroma-bundle\\\\chroma-button-component\\\\index.js\\" "],["text","\\n"],["open-element","div",[]],["static-attr","class","contents"],["dynamic-attr","style",["concat",["background:",["unknown",["color"]]]]],["flush-element"],["close-element"],["text","\\n"]],"locals":[],"named":[],"yields":[],"blocks":[],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, n) => {
        "use strict";
        n.r(t);
      },
      (e, t, n) => {
        "use strict";
        var a = n(1),
          s = i(n(85)),
          l = n(3),
          o = i(n(60));
        function i(e) {
          return e && e.__esModule ? e : { default: e };
        }
        const { computed: c } = a.Ember,
          r = a.Ember.A,
          p = s.default.extend({
            dependentItems: c.alias("containedItems"),
            shouldShowContentBlock: c.gt("containedItems.length", 0),
            containedItems: c("tra.metadata", "bundledItems", function () {
              const e = r(),
                t = this.get("bundledItems");
              return (
                t &&
                  (this._checkChampion(t, e), this._checkSkinAndChromas(t, e)),
                e
              );
            }),
            _checkChampion(e, t) {
              const n = e.find(
                (e) => e.inventoryType === l.PAW.INVENTORY_TYPES.CHAMPION,
              );
              n &&
                !n.owned &&
                t.pushObject({
                  tilePath: n.assets.tilePath,
                  description: this.get("tra").formatString(
                    "cat_paw_dependency_includes",
                    {
                      inventoryType: this.get(
                        `tra.cat_paw_inventory_type_${l.PAW.INVENTORY_TYPES.CHAMPION.toLowerCase()}`,
                      ),
                    },
                  ),
                });
            },
            _checkSkinAndChromas(e, t) {
              const n = e.find(
                  (e) =>
                    e.inventoryType === l.PAW.INVENTORY_TYPES.CHAMPION_SKIN &&
                    !e.subInventoryType,
                ),
                a = e.filter(
                  (e) =>
                    e.inventoryType === l.PAW.INVENTORY_TYPES.CHAMPION_SKIN &&
                    e.subInventoryType === o.default.CHROMA &&
                    !e.owned,
                ),
                s = {};
              if (n) s.tilePath = n.assets.tilePath;
              else {
                if (!(a.length > 0)) return;
                s.tilePath = a[0].assets.tilePath;
              }
              const i =
                n && !n.owned
                  ? "cat_paw_bundle_content_skin_and_chromas"
                  : "cat_paw_bundle_content_chromas";
              (s.description = this.get("tra").formatString(i, {
                itemCount: a.length,
              })),
                t.pushObject(s);
            },
          });
        e.exports = p;
      },
      (e, t, n) => {
        "use strict";
        var a,
          s = n(1),
          l = (a = n(61)) && a.__esModule ? a : { default: a },
          o = n(27),
          i = n(26);
        const c = (0, s.emberDataBinding)({
            Ember: s.Ember,
            websocket: (0, s.getProvider)().getSocket(),
            logPrefix: "service:purchasewidget",
            boundProperties: {
              orderNotifications: "/lol-purchase-widget/v1/order-notifications",
              summoner: "/lol-summoner/v1/current-summoner",
            },
          }),
          r = s.Ember.Service.extend(c, {
            init() {
              this._super(...arguments),
                (this._dataBinding = (0, s.dataBinding)("lol-purchase-widget"));
            },
            getItem(e, t) {
              const n = `/v1/purchasable-item?inventoryType=${t}&itemId=${e}`;
              return this._dataBinding
                .get(n, { skipCache: !0 })
                .then(this._mapValidationErrors);
            },
            getItems(e, t) {
              const n = `/v1/purchasable-items/${t}`;
              return this._dataBinding
                .post(n, e)
                .then(this._mapValidationErrors);
            },
            _mapValidationErrors(e) {
              const t = Object.assign({}, e);
              if (t.validationErrors) {
                const e = t.validationErrors.map(function (e) {
                  return l.default.fromErrorKey(e.id);
                });
                t.validationErrors = e;
              }
              return t;
            },
            _getTimeoutPromise: (e) =>
              new Promise(function (t, n) {
                setTimeout(function () {
                  n(new Error(`Request has not return after ${e}ms`));
                }, e);
              }),
            purchaseItem(e, t) {
              const n = [];
              return (
                e.priceDetails.forEach((e) => {
                  n.push({
                    itemKey: e.itemKey,
                    purchaseCurrencyInfo: {
                      currencyType: e.price.currencyType,
                      price: e.price.price,
                      purchasable: !0,
                    },
                    source: t,
                    quantity: 1,
                  });
                }),
                s.Telemetry.sendCustomData(i.TELEMETRY_EVENT_NAME, {
                  id: i.TELEMETRY_EVENT_ID.START_PURCHASE,
                  purchaseDataItems: JSON.stringify(n),
                }),
                Promise.race([
                  this._getTimeoutPromise(o.MAX_WAITING_TIME_IN_MS),
                  this._dataBinding.post("/v2/purchaseItems", { items: n }),
                ])
              );
            },
          });
        e.exports = r;
      },
      (e, t, n) => {
        "use strict";
        var a = n(1);
        const { Component: s, computed: l } = a.Ember,
          o = s.extend({
            classNames: ["paw-rp-top-up-modal"],
            layout: n(145),
            style: n(146),
            dialogMessage: l("price", "itemName", function () {
              return this.get("tra").formatString("cat_paw_rp_top_up_message", {
                remainingPrice: this.get("price"),
                itemName: this.get("itemName"),
              });
            }),
          });
        e.exports = o;
      },
      (e, t, n) => {
        const a = n(1).Ember;
        e.exports = a.HTMLBars.template({
          id: "/y5nutKY",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\Releases_14_13\\\\LeagueClientContent_Release\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-paw\\\\src\\\\components\\\\ui\\\\paw-rp-top-up-modal-component\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\Releases_14_13\\\\LeagueClientContent_Release\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-paw\\\\src\\\\components\\\\ui\\\\paw-rp-top-up-modal-component\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\Releases_14_13\\\\LeagueClientContent_Release\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-paw\\\\src\\\\components\\\\ui\\\\paw-rp-top-up-modal-component\\\\index.js\\" "],["text","\\n"],["open-element","lol-uikit-content-block",[]],["static-attr","type","dialog-medium"],["static-attr","class","rp-top-up-modal-container"],["flush-element"],["text","\\n    "],["open-element","h4",[]],["flush-element"],["append",["unknown",["tra","cat_paw_rp_header_message"]],false],["close-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","dialog-message-container"],["flush-element"],["text","\\n        "],["open-element","p",[]],["flush-element"],["append",["helper",["sanitize"],[["get",["dialogMessage"]]],null],false],["close-element"],["text","\\n        "],["open-element","div",[]],["static-attr","class","up-sell-text"],["flush-element"],["text","\\n            "],["open-element","p",[]],["flush-element"],["append",["unknown",["tra","cat_paw_rp_up_sell_text"]],false],["close-element"],["text","\\n        "],["close-element"],["text","\\n    "],["close-element"],["text","\\n"],["close-element"],["text","\\n"]],"locals":[],"named":[],"yields":[],"blocks":[],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, n) => {
        "use strict";
        n.r(t);
      },
    ],
    t = {};
  function n(a) {
    var s = t[a];
    if (void 0 !== s) return s.exports;
    var l = (t[a] = { exports: {} });
    return e[a](l, l.exports, n), l.exports;
  }
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
      const a = "rcp-fe-lol-paw",
        s = document.currentScript.ownerDocument;
      const l = window.getPluginAnnounceEventName(a);
      s.addEventListener(
        l,
        function (e) {
          (0, e.registrationHandler)((e) =>
            t.default
              .init(e, {
                AudioPlugin: (e) => e.get("rcp-fe-audio"),
                componentFactory: (e) =>
                  e.get("rcp-fe-common-libs").getComponentFactory("1"),
                dataBinding: (e) =>
                  e.get("rcp-fe-common-libs").getDataBinding("rcp-fe-lol-paw"),
                Ember: (e) => e.get("rcp-fe-ember-libs").getEmber(),
                emberApplicationFactory: (e) =>
                  e.get("rcp-fe-ember-libs").getEmberApplicationFactory(),
                emberDataBinding: (e) =>
                  e
                    .get("rcp-fe-ember-libs")
                    .getEmberDataBinding("rcp-fe-lol-paw"),
                Lodash: (e) => e.get("rcp-fe-common-libs").getLodash("4"),
                logger: (e) => e.get("rcp-fe-common-libs").logging.create(a),
                modalManager: (e) =>
                  e.get("rcp-fe-lol-uikit").getModalManager(),
                Router: (e) =>
                  e.get("rcp-fe-lol-shared-components").getApi_Router(),
                sharedPayments: (e) =>
                  e.get("rcp-fe-lol-shared-components").getApi_Payments(),
                Telemetry: (e) => e.get("rcp-fe-common-libs").getTelemetry(1),
                UiKitPlugin: (e) => e.get("rcp-fe-lol-uikit"),
              })
              .then(() => {
                const e = n(2).default,
                  a = n(21).default,
                  s = n(22).default,
                  l = new (0, n(24).default)(),
                  o = new e(l);
                return t.default.add({ privateAPI: l }), a.init(), s.init(), o;
              }),
          );
        },
        { once: !0 },
      );
    })();
})();
