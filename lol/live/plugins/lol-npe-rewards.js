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
                  l = n._getValue(s, a);
                l && l.then
                  ? (l.then(function (e) {
                      e ||
                        console.warn(
                          "The promise for the key " +
                            s +
                            " resolved with a falsy value: ",
                          e,
                        ),
                        n._addValue(s, e);
                    }),
                    t.push(l))
                  : n._addValue(s, l);
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
      (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        var s = n(1),
          a = o(n(3)),
          l = o(n(4)),
          r = n(5);
        function o(e) {
          return e && e.__esModule ? e : { default: e };
        }
        t.default = class {
          constructor() {
            this.application = null;
          }
          _traService() {
            const e = s.l10n
              .tra()
              .overlay("/fe/lol-l10n/trans.json")
              .overlay("/fe/lol-npe-rewards/trans.json");
            return (0, a.default)(s.Ember, e);
          }
          getEmberApplication(e) {
            return new Promise((t) => {
              (!this.application ||
                this.application.isDestroyed ||
                this.application.isDestroying) &&
                ((0, l.default)(this._traService(), e.abTestGroupId),
                (this.application = s.ComponentFactory.create(r.PLUGIN_NAME))),
                t(this.application);
            });
          }
          getRootElement(e) {
            return this.getEmberApplication(e).then((e) => e.domNode);
          }
          detach() {
            this.application &&
              (this.application.onRemove(), (this.application = null));
          }
        };
      },
      (e) => {
        "use strict";
        function t(e) {
          const n = {};
          for (const s in e)
            "object" == typeof e[s] ? (n[s] = t(e[s])) : (n[s] = e[s]);
          return n;
        }
        function n(e, t, n) {
          const { regions: s, region: a, locale: l } = e.metadata();
          if ((n = n.get("metadata." + t)) && "region" === t && n.id !== a.id) {
            const t = s[n.id],
              a = t.defaultLocale
                ? t.defaultLocale.id
                : t.availableLocales[0].id;
            e.setLocale(a, n.id);
          } else n && "locale" === t && n.id !== l.id && e.setLocale(n.id);
        }
        e.exports = function (e, s, a) {
          let l;
          const r = { metadata: !0, moment: !0 };
          return (
            (s = s.observe(() => {
              if (l) {
                const e = t(s.metadata());
                l.set("metadata", e),
                  l.beginPropertyChanges(),
                  Object.keys(r).forEach((e) => {
                    l.propertyWillChange(e), l.propertyDidChange(e);
                  }),
                  l.endPropertyChanges();
              }
            })),
            (l = e.Service.extend({
              _tra: null,
              init() {
                this.wrapTra(s);
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
                return (r[e] = !0), this._tra.get(e);
              },
              willDestroy: () => this._tra.unregister(),
              addOverlays: function (e) {
                let t = this._tra;
                for (const n of e) t = t.overlay(n);
                t && this.wrapTra(t);
              },
            }).create()),
            l.set("service", l),
            l.addObserver("metadata.region", n.bind(null, s, "region")),
            l.addObserver("metadata.locale", n.bind(null, s, "locale")),
            a &&
              (console.warning(
                "deprecated: pass a traService as a property of your Ember application definition",
              ),
              a.register("tra:main", l, { instantiate: !1 }),
              a.inject("component", "tra", "tra:main"),
              a.inject("controller", "tra", "tra:main"),
              a.inject("view", "tra", "tra:main"),
              a.inject("model", "tra", "tra:main"),
              a.inject("route", "tra", "tra:main"),
              a.inject("service", "tra", "tra:main")),
            l
          );
        };
      },
      (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = function (e, t) {
            const l = {
                name: a.PLUGIN_NAME,
                tra: e,
                ComponentFactory: s.ComponentFactory,
                Router: n(6).default,
                IndexRoute: n(7).default,
                ApplicationController: n(9).default,
                RewardsV2Controller: n(10).default,
                SplashController: n(13).default,
                RewardsV3Controller: n(15).default,
                RewardsV4Controller: n(17).default,
                LevelRewardsComponent: n(19),
                LoginRewardsComponent: n(22),
                ProgressBarComponent: n(26),
                RewardHubDetailComponent: n(29),
                GameModeCarouselComponent: n(32).default,
                LoadingExperienceComponent: n(35).default,
                NewPlayerPackComponent: n(38),
                BattlePassComponent: n(41),
                ProgressionMilestoneComponent: n(44),
                ProgressionMilestoneListComponent: n(47),
                ProgressionMilestoneRewardComponent: n(50),
                LevelUpInteractionsComponent: n(53).default,
                ChallengesCardComponent: n(56).default,
                NpeTooltipComponent: n(59).default,
                RewardsService: n(61).default,
                NewPlayerPackService: n(62).default,
                LobbyService: n(63).default,
                LayoutService: n(64).createLayoutService(t),
                EqHelper: s.Ember.Helper.helper((e) => e[0] === e[1]),
                TEMPLATES: {
                  application: n(65),
                  rewardsV2: n(66),
                  splash: n(67),
                  rewardsV3: n(68),
                  rewardsV4: n(69),
                },
              },
              r = {
                name: `${a.PLUGIN_NAME}-calendar`,
                tra: e,
                ComponentFactory: s.ComponentFactory,
                RewardsCalendarComponent: n(70),
                CalendarItemComponent: n(73),
                CalendarItemDetailComponent: n(76),
                RewardStringTranslationHelper: n(79),
                ItemImagePathHelper: n(80),
              };
            s.emberApplicationFactory.setFactoryDefinition(l),
              s.emberApplicationFactory.setFactoryDefinition(r);
          });
        var s = n(1),
          a = n(5);
      },
      (e, t) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.PLUGIN_NAME = t.LAYOUT_NAMES = void 0);
        t.PLUGIN_NAME = "rcp-fe-lol-npe-rewards";
        t.LAYOUT_NAMES = { V3: "rewards-hub-v3-challenges" };
      },
      (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        const s = n(1).Ember.Router.extend({ location: "none" });
        s.map(function () {
          this.route("splash"),
            this.route("rewardsV2"),
            this.route("rewardsV3"),
            this.route("rewardsV4");
        });
        var a = s;
        t.default = a;
      },
      (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        var s = n(1);
        n(8);
        var a = s.Ember.Route.extend({
          layoutService: s.Ember.inject.service("layout"),
          beforeModel() {
            return this.get("layoutService")
              .getInitialRouteName()
              .then((e) => this.replaceWith(e));
          },
        });
        t.default = a;
      },
      (e, t, n) => {
        "use strict";
        n.r(t);
      },
      (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        var s = n(1);
        n(8);
        var a = s.Ember.Controller.extend({});
        t.default = a;
      },
      (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        var s = n(1),
          a = n(11);
        n(12);
        var l = s.Ember.Controller.extend({
          rewardsService: s.Ember.inject.service("rewards"),
          configLoaded: s.Ember.computed.alias("rewardsService.configLoaded"),
          levelRewards: s.Ember.computed.alias("rewardsService.levelRewards"),
          loginRewards: s.Ember.computed.alias("rewardsService.loginRewards"),
          panelsLoadedv2: s.Ember.computed.and("levelRewards", "loginRewards"),
          actions: {
            openCalendar(e, t) {
              const n = s.ComponentFactory.create(
                  "rcp-fe-lol-npe-rewards-calendar",
                  { rewards: e, rewardsType: t },
                ),
                l = () => {
                  s.fullPageModalManager.removeEventListener(
                    "fullPageModalClose",
                    l,
                  );
                };
              s.fullPageModalManager.addEventListener("fullPageModalClose", l),
                s.fullPageModalManager.open({ data: { contents: n.domNode } }),
                (0, a.sendEvent)({
                  eventName: "button-click",
                  buttonAction: `view-${t}-rewards`,
                });
            },
          },
        });
        t.default = l;
      },
      (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.sendEvent = function (e = {}) {
            const t = Object.assign({}, e, {
              plugin: "rcp-fe-lol-npe-rewards",
            });
            s.Telemetry.sendCustomData("new_player_experience_rewards", t);
          });
        var s = n(1);
      },
      (e, t, n) => {
        "use strict";
        n.r(t);
      },
      (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        var s = n(1);
        n(14);
        var a = s.Ember.Controller.extend({
          rewardsService: s.Ember.inject.service("rewards"),
          layoutService: s.Ember.inject.service("layout"),
          actions: {
            closeIntro() {
              this.get("rewardsService").visitHub();
              const e = this.get("layoutService").getPostSplashRouteName();
              this.transitionToRoute(e);
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
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        var s = n(1),
          a = n(11);
        n(16);
        var l = s.Ember.Controller.extend({
          rewardsService: s.Ember.inject.service("rewards"),
          configLoaded: s.Ember.computed.alias("rewardsService.configLoaded"),
          levelRewards: s.Ember.computed.alias("rewardsService.levelRewards"),
          loginRewards: s.Ember.computed.alias("rewardsService.loginRewards"),
          panelsLoadedv3: s.Ember.computed.and("levelRewards", "loginRewards"),
          init() {
            this._super(...arguments),
              this.get("rewardsService").optInToRewardsChallenges();
          },
          actions: {
            openCalendar(e, t) {
              const n = s.ComponentFactory.create(
                  "rcp-fe-lol-npe-rewards-calendar",
                  { rewards: e, rewardsType: t },
                ),
                l = () => {
                  s.fullPageModalManager.removeEventListener(
                    "fullPageModalClose",
                    l,
                  );
                };
              s.fullPageModalManager.addEventListener("fullPageModalClose", l),
                s.fullPageModalManager.open({ data: { contents: n.domNode } }),
                (0, a.sendEvent)({
                  eventName: "button-click",
                  buttonAction: `view-${t}-rewards`,
                });
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
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        var s = n(1),
          a = n(11);
        n(18);
        var l = s.Ember.Controller.extend({
          rewardsService: s.Ember.inject.service("rewards"),
          configLoaded: s.Ember.computed.alias("rewardsService.configLoaded"),
          levelRewards: s.Ember.computed.alias("rewardsService.levelRewards"),
          loginRewards: s.Ember.computed.alias("rewardsService.loginRewards"),
          panelsLoadedv4: s.Ember.computed.and("levelRewards", "loginRewards"),
          init() {
            this._super(...arguments),
              this.get("rewardsService").optInToRewardsChallenges();
          },
          actions: {
            openCalendar(e, t) {
              const n = s.ComponentFactory.create(
                  "rcp-fe-lol-npe-rewards-calendar",
                  { rewards: e, rewardsType: t },
                ),
                l = () => {
                  s.fullPageModalManager.removeEventListener(
                    "fullPageModalClose",
                    l,
                  );
                };
              s.fullPageModalManager.addEventListener("fullPageModalClose", l),
                s.fullPageModalManager.open({ data: { contents: n.domNode } }),
                (0, a.sendEvent)({
                  eventName: "button-click",
                  buttonAction: `view-${t}-rewards`,
                });
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
        var s = n(1);
        n(20);
        let a = null;
        e.exports = s.Ember.Component.extend({
          classNames: ["level-rewards-container", "rewards-container"],
          classNameBindings: ["allComplete", "shouldAnimate"],
          layout: n(21),
          animatedTickIndex: null,
          shouldAnimate: s.Ember.computed.notEmpty("animatedTickIndex"),
          didReceiveAttrs() {
            const e = this.get("lastClaimedRewardIndex");
            null !== a && e === a + 1
              ? this.set("animatedTickIndex", e)
              : this.set("animatedTickIndex", null),
              (a = e);
          },
          shownRewardPacks: s.Ember.computed(
            "lastClaimedReward",
            "currentReward",
            "shouldAnimate",
            function () {
              const e = [];
              return (
                this.get("lastClaimedReward") &&
                  this.get("shouldAnimate") &&
                  e.push(this.get("lastClaimedReward")),
                this.get("currentReward") && e.push(this.get("currentReward")),
                s.Ember.A(e)
              );
            },
          ),
          lastClaimedRewardIndex: s.Ember.computed(
            "rewards.[]",
            "lastClaimedReward",
            function () {
              return this.get("lastClaimedReward")
                ? this.get("rewards").indexOf(this.get("lastClaimedReward"))
                : -1;
            },
          ),
          lastClaimedReward: s.Ember.computed(
            "rewards.@each.state",
            function () {
              let e = null;
              return (
                this.get("rewards").forEach((t) => {
                  "CLAIMED" === t.state && (e = t);
                }),
                e
              );
            },
          ),
          completedCount: s.Ember.computed("rewards.@each.state", function () {
            const e = this.get("rewards");
            return e ? e.filterBy("state", "CLAIMED").length : 0;
          }),
          totalCount: s.Ember.computed("rewards.@each.state", function () {
            const e = this.get("rewards");
            return e ? e.length : 0;
          }),
          currentReward: s.Ember.computed("rewards.@each.state", function () {
            const e = this.get("rewards");
            if (!e) return null;
            for (let t = 0; t < e.length; t++)
              if ("LOCKED" === e[t].state) return e[t];
          }),
          allComplete: s.Ember.computed(
            "completedCount",
            "currentReward",
            function () {
              return this.get("completedCount") && !this.get("currentReward");
            },
          ),
          progressText: s.Ember.computed(
            "totalCount",
            "tra.level_rewards_progress_metric",
            function () {
              return this.get("tra").formatString(
                "level_rewards_progress_metric",
                { count: this.get("totalCount") },
              );
            },
          ),
          actions: {
            openCalendar(e, t) {
              this.openCalendar(e, t);
            },
          },
        });
      },
      (e, t, n) => {
        "use strict";
        n.r(t);
      },
      (e, t, n) => {
        const s = n(1).Ember;
        e.exports = s.HTMLBars.template({
          id: "eLOSLIdM",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\Releases_14_13\\\\LeagueClientContent_Release\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-npe-rewards\\\\src\\\\app\\\\templates\\\\components\\\\level-rewards.hbs\\" style-path=\\"null\\" js-path=\\"T:\\\\cid\\\\p4\\\\Releases_14_13\\\\LeagueClientContent_Release\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-npe-rewards\\\\src\\\\app\\\\components\\\\level-rewards.js\\" "],["text","\\n"],["open-element","div",[]],["static-attr","class","rewards-main-content"],["flush-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","rewards-section-header"],["flush-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","rewards-title"],["flush-element"],["append",["unknown",["tra","level_rewards_panel_title"]],false],["close-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","rewards-subtitle"],["flush-element"],["append",["unknown",["tra","level_rewards_panel_description"]],false],["close-element"],["text","\\n  "],["close-element"],["text","\\n"],["block",["each"],[["get",["shownRewardPacks"]]],null,0],["text","  "],["open-element","div",[]],["static-attr","class","rewards-section-footer"],["flush-element"],["text","\\n    "],["append",["helper",["progress-bar"],null,[["totalCount","completedCount","progressText","allComplete","shouldAnimate"],[["get",["totalCount"]],["get",["completedCount"]],["get",["progressText"]],["get",["allComplete"]],["get",["shouldAnimate"]]]]],false],["text","\\n    "],["open-element","lol-uikit-flat-button",[]],["static-attr","class","rewards-calendar-button"],["dynamic-attr","onclick",["helper",["action"],[["get",[null]],"openCalendar",["get",["rewards"]],["get",["rewardsType"]]],null],null],["flush-element"],["text","\\n      "],["append",["unknown",["tra","calendar_rewards_panel_button_text"]],false],["text","\\n    "],["close-element"],["text","\\n  "],["close-element"],["text","\\n"],["close-element"],["text","\\n"]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","    "],["append",["helper",["reward-hub-detail"],null,[["rewardPack","animateOut","animateIn","shouldAnimate"],[["get",["reward"]],["helper",["eq"],[["get",["reward"]],["get",["lastClaimedReward"]]],null],["helper",["eq"],[["get",["reward"]],["get",["currentReward"]]],null],["get",["shouldAnimate"]]]]],false],["text","\\n"]],"locals":["reward"]}],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, n) => {
        "use strict";
        var s = n(1);
        n(23);
        var a,
          l = (a = n(24)) && a.__esModule ? a : { default: a };
        let r = null;
        e.exports = s.Ember.Component.extend({
          classNames: ["login-rewards-container", "rewards-container"],
          classNameBindings: [
            "allComplete",
            "shouldAnimate",
            "renderModeV3:render-mode-v3:rewards-container",
          ],
          layout: n(25),
          currentTime: 0,
          animatedTickIndex: null,
          shouldAnimate: s.Ember.computed.notEmpty("animatedTickIndex"),
          init() {
            this._super(...arguments), this.updateTimer();
          },
          didReceiveAttrs() {
            const e = this.get("lastClaimedRewardIndex");
            null !== r && e === r + 1
              ? this.set("animatedTickIndex", e)
              : this.set("animatedTickIndex", null),
              (r = e);
          },
          updateTimer() {
            const e = Date.now();
            this.set("currentTime", e);
            const t = 1e3 - (e % 1e3);
            this.updateTimerTimeout = window.setTimeout(
              () => this.updateTimer(),
              0 === t ? 1e3 : t,
            );
          },
          willDestroyElement() {
            this._super(...arguments),
              this.updateTimerTimeout &&
                window.clearTimeout(this.updateTimerTimeout);
          },
          shownRewardPacks: s.Ember.computed(
            "lastClaimedReward",
            "currentReward",
            "shouldAnimate",
            function () {
              const e = [];
              return (
                this.get("lastClaimedReward") &&
                  this.get("shouldAnimate") &&
                  e.push(this.get("lastClaimedReward")),
                this.get("currentReward") && e.push(this.get("currentReward")),
                s.Ember.A(e)
              );
            },
          ),
          lastClaimedRewardIndex: s.Ember.computed(
            "rewards.[]",
            "lastClaimedReward",
            function () {
              return this.get("lastClaimedReward")
                ? this.get("rewards").indexOf(this.get("lastClaimedReward"))
                : -1;
            },
          ),
          lastClaimedReward: s.Ember.computed(
            "rewards.@each.state",
            function () {
              let e = null;
              return (
                this.get("rewards").forEach((t) => {
                  "CLAIMED" === t.state && (e = t);
                }),
                e
              );
            },
          ),
          completedCount: s.Ember.computed("rewards.@each.state", function () {
            const e = this.get("rewards");
            return e ? e.filterBy("state", "CLAIMED").length : 0;
          }),
          totalCount: s.Ember.computed("rewards.@each.state", function () {
            const e = this.get("rewards");
            return e ? e.length : 0;
          }),
          currentReward: s.Ember.computed("rewards.@each.state", function () {
            const e = this.get("rewards");
            if (!e) return null;
            for (let t = 0; t < e.length; t++)
              if ("LOCKED" === e[t].state) return e[t];
          }),
          currentRewardUnavailable: s.Ember.computed(
            "currentReward.unlockTime",
            "currentTime",
            function () {
              return (
                this.get("currentTime") < this.get("currentReward.unlockTime")
              );
            },
          ),
          unlockTimeRemaining: s.Ember.computed(
            "currentReward.unlockTime",
            "currentTime",
            function () {
              return (
                this.get("currentReward.unlockTime") - this.get("currentTime")
              );
            },
          ),
          unlockRemainingHours: s.Ember.computed(
            "unlockTimeRemaining",
            function () {
              const e = Math.floor(this.get("unlockTimeRemaining") / 36e5) % 60;
              return (0, l.default)(e, 2);
            },
          ),
          unlockRemainingMinutes: s.Ember.computed(
            "unlockTimeRemaining",
            function () {
              const e = Math.floor(this.get("unlockTimeRemaining") / 6e4) % 60;
              return (0, l.default)(e, 2);
            },
          ),
          unlockRemainingSeconds: s.Ember.computed(
            "unlockTimeRemaining",
            function () {
              const e = Math.floor(this.get("unlockTimeRemaining") / 1e3) % 60;
              return (0, l.default)(e, 2);
            },
          ),
          unlockRemainingString: s.Ember.computed(
            "unlockRemainingHours",
            "unlockRemainingMinutes",
            "unlockRemainingSeconds",
            function () {
              return this.get("renderModeCarousel")
                ? this.get("unlockRemainingHours") < 1
                  ? this.get("tra").formatString(
                      "login_rewards_unlock_countdown_short",
                      {
                        minutes: this.get("unlockRemainingMinutes"),
                        seconds: this.get("unlockRemainingSeconds"),
                      },
                    )
                  : this.get("tra").formatString(
                      "login_rewards_unlock_countdown_long",
                      {
                        hours: this.get("unlockRemainingHours"),
                        minutes: this.get("unlockRemainingMinutes"),
                      },
                    )
                : this.get("tra").formatString(
                    "login_rewards_unlock_countdown",
                    {
                      hours: this.get("unlockRemainingHours"),
                      minutes: this.get("unlockRemainingMinutes"),
                      seconds: this.get("unlockRemainingSeconds"),
                    },
                  );
            },
          ),
          allComplete: s.Ember.computed(
            "completedCount",
            "currentReward",
            function () {
              return this.get("completedCount") && !this.get("currentReward");
            },
          ),
          progressText: s.Ember.computed(
            "totalCount",
            "tra.login_rewards_progress_metric",
            function () {
              return this.get("tra").formatString(
                "login_rewards_progress_metric",
                { count: this.get("totalCount") },
              );
            },
          ),
          actions: {
            openCalendar(e, t) {
              this.openCalendar(e, t);
            },
          },
        });
      },
      (e, t, n) => {
        "use strict";
        n.r(t);
      },
      (e, t) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = function (e, t) {
            let n = "" + e;
            for (; n.length < t; ) n = "0" + n;
            return n;
          });
      },
      (e, t, n) => {
        const s = n(1).Ember;
        e.exports = s.HTMLBars.template({
          id: "nZvLVdFy",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\Releases_14_13\\\\LeagueClientContent_Release\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-npe-rewards\\\\src\\\\app\\\\templates\\\\components\\\\login-rewards.hbs\\" style-path=\\"null\\" js-path=\\"T:\\\\cid\\\\p4\\\\Releases_14_13\\\\LeagueClientContent_Release\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-npe-rewards\\\\src\\\\app\\\\components\\\\login-rewards.js\\" "],["text","\\n"],["block",["if"],[["get",["renderModeV3"]]],null,5,2]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","      "],["append",["helper",["reward-hub-detail"],null,[["rewardPack","animateOut","animateIn","shouldAnimate"],[["get",["reward"]],["helper",["eq"],[["get",["reward"]],["get",["lastClaimedReward"]]],null],["helper",["eq"],[["get",["reward"]],["get",["currentReward"]]],null],["get",["shouldAnimate"]]]]],false],["text","\\n"]],"locals":["reward"]},{"statements":[["text","        "],["open-element","div",[]],["static-attr","class","rewards-unlock-message"],["flush-element"],["text","\\n          "],["append",["unknown",["unlockRemainingString"]],false],["text","\\n        "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","  "],["open-element","div",[]],["static-attr","class","rewards-main-content"],["flush-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","rewards-section-header"],["flush-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","rewards-title"],["flush-element"],["append",["unknown",["tra","login_rewards_panel_title"]],false],["close-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","rewards-subtitle"],["flush-element"],["append",["unknown",["tra","login_rewards_panel_description"]],false],["close-element"],["text","\\n"],["block",["if"],[["get",["currentRewardUnavailable"]]],null,1],["text","    "],["close-element"],["text","\\n"],["block",["each"],[["get",["shownRewardPacks"]]],null,0],["text","    "],["open-element","div",[]],["static-attr","class","rewards-section-footer"],["flush-element"],["text","\\n      "],["append",["helper",["progress-bar"],null,[["totalCount","completedCount","progressText","allComplete","currentRewardUnavailable","shouldAnimate"],[["get",["totalCount"]],["get",["completedCount"]],["get",["progressText"]],["get",["allComplete"]],["get",["currentRewardUnavailable"]],["get",["shouldAnimate"]]]]],false],["text","\\n      "],["open-element","lol-uikit-flat-button",[]],["static-attr","class","rewards-calendar-button"],["dynamic-attr","onclick",["helper",["action"],[["get",[null]],"openCalendar",["get",["rewards"]],["get",["rewardsType"]]],null],null],["flush-element"],["text","\\n        "],["append",["unknown",["tra","calendar_rewards_panel_button_text"]],false],["text","\\n      "],["close-element"],["text","\\n    "],["close-element"],["text","\\n  "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","          "],["append",["unknown",["completedCount"]],false],["text","/"],["append",["unknown",["totalCount"]],false],["text","\\n"]],"locals":[]},{"statements":[["text","          "],["append",["unknown",["unlockRemainingString"]],false],["text","\\n"]],"locals":[]},{"statements":[["text","  "],["open-element","div",[]],["static-attr","class","section-wrapper"],["flush-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","section-left"],["flush-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","reward-image"],["flush-element"],["text","\\n        "],["open-element","img",[]],["static-attr","class","daily-play-image"],["dynamic-attr","src",["concat",["/fe/lol-static-assets/images/npe-rewards-reward-circle-",["unknown",["currentReward","rewardKey"]],".png"]]],["flush-element"],["close-element"],["text","\\n      "],["close-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","reward-progress"],["flush-element"],["text","\\n"],["block",["if"],[["get",["currentRewardUnavailable"]]],null,4,3],["text","      "],["close-element"],["text","\\n    "],["close-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","section-right"],["flush-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","section-title"],["flush-element"],["text","\\n        "],["append",["unknown",["tra","passes_daily_play_headline"]],false],["text","\\n      "],["close-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","section-subtitle"],["flush-element"],["text","\\n        "],["append",["unknown",["tra","passes_daily_play_subline"]],false],["text","\\n      "],["close-element"],["text","\\n      "],["open-element","lol-uikit-flat-button",[]],["static-attr","class","view-button"],["dynamic-attr","onclick",["helper",["action"],[["get",[null]],"openCalendar",["get",["rewards"]],["get",["rewardsType"]]],null],null],["flush-element"],["text","\\n        "],["append",["unknown",["tra","passes_daily_play_cta"]],false],["text","\\n      "],["close-element"],["text","\\n    "],["close-element"],["text","\\n  "],["close-element"],["text","\\n"]],"locals":[]}],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, n) => {
        "use strict";
        var s = n(1);
        n(27);
        var a,
          l = (a = n(24)) && a.__esModule ? a : { default: a };
        e.exports = s.Ember.Component.extend({
          classNames: ["lol-npe-rewards-progress-bar-component"],
          classNameBindings: ["shouldAnimate"],
          layout: n(28),
          shouldAnimate: !1,
          rewardIndexIndicators: s.Ember.computed(
            "totalCount",
            "completedCount",
            "shouldAnimate",
            function () {
              const e = this.get("totalCount"),
                t = this.get("completedCount"),
                n = this.get("shouldAnimate"),
                a = t === e ? t : t + 1,
                r = n && t !== a ? "should-animate" : "",
                o = [];
              return (
                n &&
                  t !== a &&
                  o.push(
                    s.Ember.Object.create({
                      text: (0, l.default)(t, 2),
                      class: "animated-duplicate " + r,
                    }),
                  ),
                o.push(
                  s.Ember.Object.create({
                    text: (0, l.default)(a, 2),
                    class: r,
                  }),
                ),
                s.Ember.A(o)
              );
            },
          ),
          progressBarTicks: s.Ember.computed(
            "totalCount",
            "completedCount",
            "shouldAnimate",
            function () {
              const e = s.Ember.A(),
                t = this.get("totalCount"),
                n = this.get("completedCount"),
                a = this.get("shouldAnimate");
              for (let s = 0; s < t; s++)
                a
                  ? s === n - 1
                    ? (e.push("locked-current"),
                      e.push("claimed animated-duplicate"))
                    : s === n
                      ? (e.push("locked"),
                        e.push("locked-current animated-duplicate"))
                      : s < n
                        ? e.push("claimed")
                        : s > n && e.push("locked")
                  : s === n
                    ? e.push("locked-current")
                    : s < n
                      ? e.push("claimed")
                      : s > n && e.push("locked");
              return e.map((e) => ({ class: e, _id: Math.random() }));
            },
          ),
        });
      },
      (e, t, n) => {
        "use strict";
        n.r(t);
      },
      (e, t, n) => {
        const s = n(1).Ember;
        e.exports = s.HTMLBars.template({
          id: "+1OPUEjy",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\Releases_14_13\\\\LeagueClientContent_Release\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-npe-rewards\\\\src\\\\app\\\\templates\\\\components\\\\progress-bar.hbs\\" style-path=\\"null\\" js-path=\\"T:\\\\cid\\\\p4\\\\Releases_14_13\\\\LeagueClientContent_Release\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-npe-rewards\\\\src\\\\app\\\\components\\\\progress-bar.js\\" "],["text","\\n"],["block",["each"],[["get",["rewardIndexIndicators"]]],null,2],["open-element","span",[]],["static-attr","class","type-label"],["flush-element"],["append",["unknown",["progressText"]],false],["close-element"],["text","\\n"],["block",["if"],[["get",["allComplete"]]],null,1],["open-element","div",[]],["static-attr","class","progress-bar"],["flush-element"],["text","\\n"],["block",["each"],[["get",["progressBarTicks"]]],[["key"],["_id"]],0],["close-element"],["text","\\n"]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","    "],["open-element","div",[]],["dynamic-attr","class",["concat",["progress-bar-tick progress-bar-tick-",["unknown",["tick","class"]]]]],["flush-element"],["close-element"],["text","\\n"]],"locals":["tick"]},{"statements":[["text","  "],["open-element","span",[]],["static-attr","class","all-completed-label"],["flush-element"],["append",["unknown",["tra","progress_bar_completed"]],false],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","  "],["open-element","span",[]],["dynamic-attr","class",["concat",["completed-count-label ",["unknown",["indicator","class"]]]]],["flush-element"],["append",["unknown",["indicator","text"]],false],["close-element"],["text","\\n"]],"locals":["indicator"]}],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, n) => {
        "use strict";
        var s = n(1);
        n(30),
          (e.exports = s.Ember.Component.extend({
            classNames: ["rewards-next-reward-preview"],
            classNameBindings: ["animateIn", "animateOut", "shouldAnimate"],
            layout: n(31),
            shouldShowCheckmark: s.Ember.computed.and(
              "animateOut",
              "shouldAnimate",
            ),
            listItems: s.Ember.computed("rewardPack", function () {
              const e = this.get("rewardPack");
              if (!e) return s.Ember.A();
              const t = s.Ember.A();
              e.majorReward && t.push(e.majorReward),
                e.minorRewards && t.pushObjects(e.minorRewards);
              const n = s.Ember.A();
              return (
                t.forEach((e) => {
                  switch (e.renderer) {
                    case "game_mode":
                      n.pushObjects(e.data.gameModes);
                      break;
                    case "champion_choice":
                      n.push("champion_choice_" + e.data.type);
                      break;
                    case "skin_shard":
                      e.data.name
                        ? n.push("skin_shard_" + e.data.name)
                        : n.push("skin_shard");
                      break;
                    case "client_feature":
                      n.push("client_feature_" + e.data.type);
                      break;
                    default:
                      n.push(e.renderer);
                  }
                }),
                n.map((e) =>
                  s.Ember.Object.create({
                    key: e,
                    description: this.get("tra").get(
                      "reward_short_description_" + e,
                    ),
                  }),
                )
              );
            }),
          }));
      },
      (e, t, n) => {
        "use strict";
        n.r(t);
      },
      (e, t, n) => {
        const s = n(1).Ember;
        e.exports = s.HTMLBars.template({
          id: "UI7vRGme",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\Releases_14_13\\\\LeagueClientContent_Release\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-npe-rewards\\\\src\\\\app\\\\templates\\\\components\\\\reward-hub-detail.hbs\\" style-path=\\"null\\" js-path=\\"T:\\\\cid\\\\p4\\\\Releases_14_13\\\\LeagueClientContent_Release\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-npe-rewards\\\\src\\\\app\\\\components\\\\reward-hub-detail.js\\" "],["text","\\n"],["open-element","div",[]],["static-attr","class","rewards-next-reward-preview-image-container"],["flush-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","rewards-next-reward-preview-image-wrapper"],["flush-element"],["text","\\n    "],["open-element","img",[]],["static-attr","class","rewards-next-reward-preview-image"],["dynamic-attr","src",["concat",["/fe/lol-static-assets/images/npe-rewards-reward-circle-",["unknown",["rewardPack","rewardKey"]],".png"]]],["flush-element"],["close-element"],["text","\\n"],["block",["if"],[["get",["animateOut"]]],null,1],["text","  "],["close-element"],["text","\\n"],["close-element"],["text","\\n"],["open-element","div",[]],["static-attr","class","rewards-next-reward-preview-text-container"],["flush-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","rewards-next-reward-preview-text-title"],["flush-element"],["text","\\n    "],["append",["unknown",["tra","level_rewards_panel_next_reward_title"]],false],["text","\\n  "],["close-element"],["text","\\n  "],["open-element","ul",[]],["static-attr","class","reward-items-list"],["flush-element"],["text","\\n"],["block",["each"],[["get",["listItems"]]],null,0],["text","  "],["close-element"],["text","\\n"],["close-element"],["text","\\n"]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","      "],["open-element","li",[]],["dynamic-attr","class",["concat",["reward-list-item-",["unknown",["rewardItem","key"]]]]],["flush-element"],["append",["unknown",["rewardItem","description"]],false],["close-element"],["text","\\n"]],"locals":["rewardItem"]},{"statements":[["text","      "],["open-element","div",[]],["static-attr","class","rewards-completed-checkmark"],["flush-element"],["close-element"],["text","\\n"]],"locals":[]}],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        var s = n(1);
        n(33);
        var a = n(11);
        const l = [430, 830, 460, 800, 450];
        var r = s.Ember.Component.extend({
          classNames: ["game-mode-carousel"],
          layout: n(34),
          currentCarouselSelectionIndex: 0,
          playButtonDisabled: !0,
          lobbyService: s.Ember.inject.service("lobby"),
          eligibility: s.Ember.computed.alias("lobbyService.eligibility"),
          gameQueues: s.Ember.computed.alias("lobbyService.gameQueues"),
          init: function () {
            this._super(...arguments),
              (this.patcherButtonEnabledSubscriber = (e) => {
                this.isDestroying ||
                  this.isDestroyed ||
                  this.set("playButtonDisabled", !e);
              }),
              s.Navigation.isButtonEnabledSubscribe(
                this.patcherButtonEnabledSubscriber,
              );
          },
          didInsertElement: function () {
            this._super(...arguments),
              this.element &&
                this.element.querySelector(".game-mode-carousel-video") &&
                this.element
                  .querySelector(".game-mode-carousel-video")
                  .playWithoutStopping();
          },
          didDestroyElement: function () {
            this._super(...arguments),
              s.Navigation.isButtonEnabledUnsubscribe(
                this.patcherButtonEnabledSubscriber,
              );
          },
          carouselVideoSrc: s.Ember.computed(
            "currentCarouselSelection",
            function () {
              const e = this.get("currentCarouselSelection.queue.mapId");
              return e
                ? `/fe/lol-static-assets/videos/npe-rewards-carousel-map-bg-${e}.webm`
                : "";
            },
          ),
          currentCarouselSelection: s.Ember.computed(
            "currentCarouselSelectionIndex",
            "carouselQueues",
            function () {
              return this.get("carouselQueues")
                ? this.get("carouselQueues")[
                    this.get("currentCarouselSelectionIndex")
                  ]
                : null;
            },
          ),
          carouselQueues: s.Ember.computed(
            "gameQueues",
            "eligibility",
            function () {
              if (!this.get("gameQueues") || !this.get("eligibility"))
                return null;
              const e = s.Ember.A();
              return (
                l.forEach((t) => {
                  const n = this.get("gameQueues").findBy("id", t),
                    a = this.get("eligibility").find((e) => e.queueId === t);
                  n &&
                    a &&
                    a.eligible &&
                    e.pushObject(
                      s.Ember.Object.create({
                        queue: n,
                        title: this.get("tra").get("queue_" + t + "_title"),
                        description: this.get("tra").get(
                          "queue_" + t + "_description",
                        ),
                      }),
                    );
                }),
                e
              );
            },
          ),
          multipleCarouselQueues: s.Ember.computed.gt(
            "carouselQueues.length",
            1,
          ),
          selectCarouselItem: function (e) {
            if (this.get("isAnimating")) return;
            const t = this.get("carouselQueues").length;
            e = (e + t) % t;
            const n = this.get("carouselQueues")[e];
            if (
              this.element &&
              this.element.querySelector(".game-mode-carousel-queue-info")
            ) {
              const t =
                n.get("queue.mapId") !==
                this.get("currentCarouselSelection.queue.mapId");
              let a;
              this.set("isAnimating", !0),
                (a = t
                  ? this.element.querySelector(
                      ".game-mode-carousel-animation-target",
                    )
                  : this.element.querySelector(
                      ".game-mode-carousel-queue-info",
                    ));
              const l = a.animate([{ opacity: 1 }, { opacity: 0 }], {
                duration: 200,
                fill: "forwards",
              });
              l.onfinish = () => {
                this.set("currentCarouselSelectionIndex", e),
                  s.Ember.run.scheduleOnce("afterRender", this, () => {
                    t &&
                      this.element
                        .querySelector(".game-mode-carousel-video")
                        .playWithoutStopping(),
                      l.cancel();
                    a.animate([{ opacity: 0 }, { opacity: 1 }], 200).onfinish =
                      () => {
                        this.set("isAnimating", !1);
                      };
                  });
              };
            } else this.set("currentCarouselSelectionIndex", e);
          },
          actions: {
            nextCarouselItem: function () {
              this.selectCarouselItem(
                this.get("currentCarouselSelectionIndex") + 1,
              );
            },
            previousCarouselItem: function () {
              this.selectCarouselItem(
                this.get("currentCarouselSelectionIndex") - 1,
              );
            },
            play: function () {
              const e = !!this.get("lobbyService.lobby"),
                t = this.get("currentCarouselSelection.queue.id");
              (0, a.sendEvent)({
                eventName: "button-click",
                buttonAction: `game-mode-carousel-click-play-queue-${t}`,
              }),
                (0, s.dataBinding)("/lol-lobby")
                  .post("/v2/lobby", { queueId: t })
                  .then(() => {
                    e && s.Navigation.performMainAction();
                  });
            },
          },
        });
        t.default = r;
      },
      (e, t, n) => {
        "use strict";
        n.r(t);
      },
      (e, t, n) => {
        const s = n(1).Ember;
        e.exports = s.HTMLBars.template({
          id: "7Os7EOoG",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\Releases_14_13\\\\LeagueClientContent_Release\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-npe-rewards\\\\src\\\\app\\\\templates\\\\components\\\\game-mode-carousel.hbs\\" style-path=\\"null\\" js-path=\\"T:\\\\cid\\\\p4\\\\Releases_14_13\\\\LeagueClientContent_Release\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-npe-rewards\\\\src\\\\app\\\\components\\\\game-mode-carousel.js\\" "],["text","\\n"],["open-element","div",[]],["static-attr","class","game-mode-carousel-inner"],["flush-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","game-mode-carousel-animation-target"],["flush-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","game-mode-carousel-video-wrapper"],["flush-element"],["text","\\n      "],["open-element","uikit-video",[]],["dynamic-attr","src",["concat",[["unknown",["carouselVideoSrc"]]]]],["static-attr","preload",""],["static-attr","loop",""],["static-attr","autoplay",""],["static-attr","class","game-mode-carousel-video"],["flush-element"],["close-element"],["text","\\n    "],["close-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","game-mode-carousel-background-overlay"],["flush-element"],["close-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","game-mode-carousel-queue-info"],["flush-element"],["text","\\n      "],["open-element","span",[]],["static-attr","class","carousel-queue-info-title"],["flush-element"],["append",["unknown",["currentCarouselSelection","title"]],false],["close-element"],["text","\\n      "],["open-element","span",[]],["static-attr","class","carousel-queue-info-description"],["flush-element"],["append",["unknown",["currentCarouselSelection","description"]],false],["close-element"],["text","\\n      "],["open-element","lol-uikit-flat-button",[]],["static-attr","type","next"],["dynamic-attr","onclick",["helper",["action"],[["get",[null]],"play"],null],null],["static-attr","class","carousel-play-button"],["dynamic-attr","disabled",["unknown",["playButtonDisabled"]],null],["flush-element"],["text","\\n        "],["append",["unknown",["tra","navbar_button_play"]],false],["text","\\n      "],["close-element"],["text","\\n    "],["close-element"],["text","\\n  "],["close-element"],["text","\\n"],["block",["if"],[["get",["multipleCarouselQueues"]]],null,0],["close-element"],["text","\\n"]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","    "],["open-element","div",[]],["static-attr","class","game-mode-carousel-buttons"],["flush-element"],["text","\\n      "],["open-element","span",[]],["static-attr","class","carousel-button left"],["modifier",["action"],[["get",[null]],"previousCarouselItem"]],["flush-element"],["close-element"],["text","\\n      "],["open-element","span",[]],["static-attr","class","carousel-button right"],["modifier",["action"],[["get",[null]],"nextCarouselItem"]],["flush-element"],["close-element"],["text","\\n    "],["close-element"],["text","\\n"]],"locals":[]}],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        var s = n(1),
          a = n(5);
        n(36);
        var l = s.Ember.Component.extend({
          classNames: [`${a.PLUGIN_NAME}-loading-experience`],
          layout: n(37),
          shouldShowError: !1,
          loadingTimeout: null,
          init() {
            this._super(...arguments), this.startLoadingTimeout();
          },
          willDestroyElement() {
            this._super(...arguments), s.Ember.run.cancel(this.loadingTimeout);
          },
          startLoadingTimeout() {
            this.set("shouldShowError", !1),
              (this.loadingTimeout = s.Ember.run.later(
                () => this.set("shouldShowError", !0),
                8e3,
              ));
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
          id: "KIejScAh",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\Releases_14_13\\\\LeagueClientContent_Release\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-npe-rewards\\\\src\\\\app\\\\templates\\\\components\\\\loading-experience.hbs\\" style-path=\\"null\\" js-path=\\"T:\\\\cid\\\\p4\\\\Releases_14_13\\\\LeagueClientContent_Release\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-npe-rewards\\\\src\\\\app\\\\components\\\\loading-experience.js\\" "],["text","\\n"],["block",["if"],[["get",["shouldShowError"]]],null,1,0]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","  "],["append",["helper",["uikit-spinner"],null,[["class","width","height"],["loading-spinner {{unless shouldShowError \'animate-in\'}}","50px","50px"]]],false],["text","\\n"]],"locals":[]},{"statements":[["text","  "],["open-element","div",[]],["dynamic-attr","class",["concat",["error-container ",["helper",["if"],[["get",["shouldShowError"]],"animate-in"],null]]]],["flush-element"],["text","\\n    "],["open-element","lol-uikit-content-block",[]],["flush-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","error-icon"],["flush-element"],["close-element"],["text","\\n      "],["open-element","p",[]],["static-attr","class","error-message"],["flush-element"],["text","\\n        "],["append",["unknown",["tra","hub_error_message_fetch_rewards"]],false],["text","\\n      "],["close-element"],["text","\\n    "],["close-element"],["text","\\n  "],["close-element"],["text","\\n"]],"locals":[]}],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, n) => {
        "use strict";
        var s = n(1),
          a = n(11),
          l = n(5);
        n(39);
        const r = {
          HEXTECH_BUNDLE: "hextech",
          CHAMPION_BUNDLE: "bundles_champions",
        };
        e.exports = s.Ember.Component.extend({
          classNames: [`${l.PLUGIN_NAME}-new-player-pack-component`],
          classNameBindings: [
            "renderModeSidebar:render-mode-sidebar",
            "renderModeCarousel:render-mode-carousel",
          ],
          layout: n(40),
          rewardsService: s.Ember.inject.service("rewards"),
          newPlayerPackService: s.Ember.inject.service("new-player-pack"),
          rewardsPackDiscountDisabled: s.Ember.computed.alias(
            "rewardsService.RewardsPackDiscountDisabled",
          ),
          newPlayerPacksLoaded: s.Ember.computed.gt("newPlayerPacks.length", 0),
          activePackDisabled: s.Ember.computed.not("activePack.active"),
          activePackIndex: 0,
          carouselAutoNavigateTimerId: null,
          newPlayerPacks: null,
          didReceiveAttrs() {
            this._super(...arguments),
              this.get("newPlayerPackService")
                .getNewPlayerPacks()
                .then((e) => {
                  this.set("newPlayerPacks", e),
                    this.get("renderModeCarousel") &&
                      this.startCarouselAutoNavigate();
                });
          },
          willDestroyElement() {
            this._super(...arguments), this.clearCarouselAutoNavigateTimer();
          },
          visibleNewPlayerPacks: s.Ember.computed(
            "renderModeCarousel",
            "newPlayerPacks",
            function () {
              const e = this.get("renderModeCarousel"),
                t = this.get("newPlayerPacks") || [];
              if (!e) return t;
              const n = t.filter((e) => !e.isOwned);
              return 0 === n.length ? t : n;
            },
          ),
          activePack: s.Ember.computed(
            "visibleNewPlayerPacks",
            "activePackIndex",
            function () {
              const e = this.get("visibleNewPlayerPacks"),
                t = this.get("activePackIndex");
              return e && 0 !== e.length ? e[t] : null;
            },
          ),
          shouldShowCarouselFeatures: s.Ember.computed(
            "renderModeCarousel",
            "visibleNewPlayerPacks",
            function () {
              const e = this.get("renderModeCarousel"),
                t = this.get("visibleNewPlayerPacks");
              return e && t.length > 1;
            },
          ),
          backgroundClass: s.Ember.computed(
            "renderModeCarousel",
            "activePack",
            function () {
              if (!this.get("renderModeCarousel")) return "";
              return `bundle-${this.get("activePack.itemId")}`;
            },
          ),
          activePackTitle: s.Ember.computed("activePack.itemId", function () {
            const e = `new_player_pack_panel_title_${this.get("activePack.itemId")}`;
            return this.get("tra").formatString(e);
          }),
          activePackDescription: s.Ember.computed(
            "activePack.itemId",
            function () {
              const e =
                99900610 === this.get("activePack.itemId")
                  ? "new_player_pack_panel_description_v2"
                  : "new_player_pack_starter_pack_panel_description";
              return this.get("tra").formatString(e);
            },
          ),
          shouldShowDiscount: s.Ember.computed(
            "activePack.discountPercentage",
            "rewardsPackDiscountDisabled",
            function () {
              const e = this.get("activePack.discountPercentage"),
                t = this.get("rewardsPackDiscountDisabled");
              return e > 0 && !t;
            },
          ),
          startCarouselAutoNavigate() {
            this.clearCarouselAutoNavigateTimer();
            const e = setTimeout(() => {
              this.get("newPlayerPacksLoaded") && this.showNextPack(),
                this.startCarouselAutoNavigate();
            }, 5e3);
            this.set("carouselAutoNavigateTimerId", e);
          },
          clearCarouselAutoNavigateTimer() {
            clearTimeout(this.get("carouselAutoNavigateTimerId"));
          },
          showNextPack() {
            const e = this.get("visibleNewPlayerPacks"),
              t = (this.get("activePackIndex") + 1) % e.length;
            this.set("activePackIndex", t);
          },
          actions: {
            openStore() {
              const {
                inventoryType: e,
                itemId: t,
                subInventoryType: n,
              } = this.get("activePack");
              s.Router.navigateTo("rcp-fe-lol-store", {
                items: [{ inventoryType: e, itemId: t }],
                page: r[n],
              }),
                (0, a.sendEvent)({
                  eventName: "button-click",
                  buttonAction: "store-deep-link-new-player-pack",
                });
            },
            showNextPack() {
              this.showNextPack(), this.startCarouselAutoNavigate();
            },
            showPrevPack() {
              const e = this.get("visibleNewPlayerPacks"),
                t = this.get("activePackIndex"),
                n = 0 === t ? e.length - 1 : t - 1;
              this.set("activePackIndex", n), this.startCarouselAutoNavigate();
            },
            pipClicked(e) {
              this.set("activePackIndex", e), this.startCarouselAutoNavigate();
            },
            pauseCarousel() {
              this.get("renderModeCarousel") &&
                this.clearCarouselAutoNavigateTimer();
            },
            startCarousel() {
              this.get("renderModeCarousel") &&
                this.startCarouselAutoNavigate();
            },
          },
        });
      },
      (e, t, n) => {
        "use strict";
        n.r(t);
      },
      (e, t, n) => {
        const s = n(1).Ember;
        e.exports = s.HTMLBars.template({
          id: "ZfqbsQMp",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\Releases_14_13\\\\LeagueClientContent_Release\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-npe-rewards\\\\src\\\\app\\\\templates\\\\components\\\\new-player-pack.hbs\\" style-path=\\"null\\" js-path=\\"T:\\\\cid\\\\p4\\\\Releases_14_13\\\\LeagueClientContent_Release\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-npe-rewards\\\\src\\\\app\\\\components\\\\new-player-pack.js\\" "],["text","\\n"],["block",["if"],[["get",["newPlayerPacksLoaded"]]],null,6,0]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","  "],["append",["helper",["uikit-spinner"],null,[["class","width","height"],["loading-spinner","50px","50px"]]],false],["text","\\n"]],"locals":[]},{"statements":[["text","            "],["open-element","div",[]],["static-attr","class","discount-container"],["flush-element"],["text","\\n              "],["open-element","span",[]],["static-attr","class","discount"],["flush-element"],["text","\\n                -"],["append",["unknown",["activePack","discountPercentage"]],false],["text","%\\n              "],["close-element"],["text","\\n              "],["open-element","span",[]],["static-attr","class","total-cost"],["flush-element"],["text","\\n                "],["append",["unknown",["activePack","totalCost"]],false],["text","\\n              "],["close-element"],["text","\\n            "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["block",["if"],[["get",["shouldShowDiscount"]]],null,1],["text","          "],["open-element","lol-uikit-purchase-button",[]],["static-attr","class","purchase-button"],["static-attr","rp",""],["dynamic-attr","disable",["unknown",["activePackDisabled"]],null],["dynamic-attr","onclick",["helper",["action"],[["get",[null]],"openStore"],null],null],["dynamic-attr","onmouseover",["helper",["action"],[["get",[null]],"pauseCarousel"],null],null],["dynamic-attr","onmouseout",["helper",["action"],[["get",[null]],"startCarousel"],null],null],["static-attr","style","width: 170px;"],["flush-element"],["text","\\n            "],["append",["unknown",["activePack","discountCost"]],false],["text","\\n          "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","          "],["open-element","lol-uikit-flat-button",[]],["static-attr","class","purchase-button"],["static-attr","disabled",""],["flush-element"],["text","\\n            "],["append",["unknown",["tra","new_player_pack_panel_button_owned"]],false],["text","\\n          "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","            "],["open-element","li",[]],["dynamic-attr","class",["concat",["pip ",["helper",["if"],[["helper",["eq"],[["get",["index"]],["get",["activePackIndex"]]],null],"pip-selected"],null]]]],["dynamic-attr","onClick",["helper",["action"],[["get",[null]],"pipClicked",["get",["index"]]],null],null],["flush-element"],["close-element"],["text","\\n"]],"locals":["pack","index"]},{"statements":[["text","      "],["open-element","lol-uikit-arrow-button",[]],["static-attr","class","carousel-left-arrow"],["static-attr","direction","left"],["dynamic-attr","onclick",["helper",["action"],[["get",[null]],"showPrevPack"],null],null],["flush-element"],["text","\\n      "],["close-element"],["text","\\n      "],["open-element","lol-uikit-arrow-button",[]],["static-attr","class","carousel-right-arrow"],["dynamic-attr","onclick",["helper",["action"],[["get",[null]],"showNextPack"],null],null],["flush-element"],["close-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","pip-list-container"],["flush-element"],["text","\\n        "],["open-element","ul",[]],["static-attr","class","pip-list"],["flush-element"],["text","\\n"],["block",["each"],[["get",["visibleNewPlayerPacks"]]],null,4],["text","        "],["close-element"],["text","\\n      "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","  "],["open-element","div",[]],["dynamic-attr","class",["concat",["rewards-main-content ",["unknown",["backgroundClass"]]]]],["flush-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","store-time-sensitive-banner"],["flush-element"],["close-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","rewards-section-header"],["flush-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","rewards-title"],["flush-element"],["append",["unknown",["activePackTitle"]],false],["close-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","rewards-subtitle"],["flush-element"],["append",["unknown",["activePackDescription"]],false],["close-element"],["text","\\n    "],["close-element"],["text","\\n"],["block",["if"],[["get",["shouldShowCarouselFeatures"]]],null,5],["text","    "],["open-element","div",[]],["static-attr","class","rewards-section-footer"],["flush-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","footer-content"],["flush-element"],["text","\\n"],["block",["if"],[["get",["activePack","isOwned"]]],null,3,2],["text","      "],["close-element"],["text","\\n    "],["close-element"],["text","\\n  "],["close-element"],["text","\\n"]],"locals":[]}],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, n) => {
        "use strict";
        var s = n(1);
        n(5);
        n(42),
          (e.exports = s.Ember.Component.extend({
            classNames: ["lol-npe-rewards-battle-pass-component"],
            layout: n(43),
            totalPointsEarned: s.Ember.computed.alias(
              "tftService.battlePass.totalPointsEarned",
            ),
            mockBattlePass: {
              totalPointsEarned: 0,
              milestones: [
                {
                  id: 0,
                  missionId: "24c94ca0-706d-11e9-b456-02b1ec2c7355",
                  label: 1,
                  state: "ACQUIRED",
                  pointsForMilestone: 100,
                  percentComplete: 100,
                  description: "Hextech Chest",
                  rewardStrategy: { groupStrategy: "SELECT_GROUPS" },
                  rewards: [{ description: "Hextech Chest", rewardGroup: "a" }],
                },
                {
                  id: 1,
                  missionId: "24c94ca0-706d-11e9-b456-02b1ec2c7355",
                  label: 2,
                  state: "ACQUIRED",
                  pointsForMilestone: 300,
                  percentComplete: 100,
                  description: "Hextech Chest",
                  rewardStrategy: { groupStrategy: "SELECT_GROUPS" },
                  rewards: [{ description: "Hextech Chest", rewardGroup: "a" }],
                },
                {
                  id: 2,
                  missionId: "24c94ca0-706d-11e9-b456-02b1ec2c7355",
                  label: 3,
                  state: "UNCLAIMED",
                  pointsForMilestone: 900,
                  percentComplete: 100,
                  description: "Hextech Chest",
                  rewardStrategy: { groupStrategy: "SELECT_GROUPS" },
                  rewards: [{ description: "Hextech Chest", rewardGroup: "a" }],
                },
                {
                  id: 3,
                  missionId: "24c94ca0-706d-11e9-b456-02b1ec2c7355",
                  label: 4,
                  state: "IN_PROGRESS",
                  pointsForMilestone: 1500,
                  percentComplete: 50,
                  description: "Hextech Chest",
                  rewardStrategy: { groupStrategy: "SELECT_GROUPS" },
                  rewards: [{ description: "Hextech Chest", rewardGroup: "a" }],
                },
                {
                  id: 4,
                  missionId: "24c94ca0-706d-11e9-b456-02b1ec2c7355",
                  label: 5,
                  state: "UNAVAILABLE",
                  pointsForMilestone: 2e3,
                  percentComplete: 0,
                  description: "Hextech Chest",
                  rewardStrategy: { groupStrategy: "SELECT_GROUPS" },
                  rewards: [{ description: "Hextech Chest", rewardGroup: "a" }],
                },
                {
                  id: 5,
                  missionId: "24c94ca0-706d-11e9-b456-02b1ec2c7355",
                  label: 6,
                  state: "UNAVAILABLE",
                  pointsForMilestone: 3e3,
                  percentComplete: 0,
                  description: "Hextech Chest",
                  rewardStrategy: { groupStrategy: "SELECT_GROUPS" },
                  rewards: [{ description: "Hextech Chest", rewardGroup: "a" }],
                },
                {
                  id: 6,
                  missionId: "24c94ca0-706d-11e9-b456-02b1ec2c7355",
                  label: 7,
                  state: "UNAVAILABLE",
                  pointsForMilestone: 5e3,
                  percentComplete: 0,
                  description: "Hextech Chest",
                  rewardStrategy: { groupStrategy: "SELECT_GROUPS" },
                  rewards: [{ description: "Hextech Chest", rewardGroup: "a" }],
                },
                {
                  id: 7,
                  missionId: "24c94ca0-706d-11e9-b456-02b1ec2c7355",
                  label: 8,
                  state: "UNAVAILABLE",
                  pointsForMilestone: 7500,
                  percentComplete: 0,
                  description: "Hextech Chest",
                  rewardStrategy: { groupStrategy: "SELECT_GROUPS" },
                  rewards: [{ description: "Hextech Chest", rewardGroup: "a" }],
                },
                {
                  id: 8,
                  missionId: "24c94ca0-706d-11e9-b456-02b1ec2c7355",
                  label: 9,
                  state: "UNAVAILABLE",
                  pointsForMilestone: 1e4,
                  percentComplete: 0,
                  description: "Hextech Chest",
                  rewardStrategy: { groupStrategy: "SELECT_GROUPS" },
                  rewards: [{ description: "Hextech Chest", rewardGroup: "a" }],
                },
              ],
            },
            currentMilestoneIdx: s.Ember.computed("milestones.[]", function () {
              return 1;
            }),
            actions: {},
          }));
      },
      (e, t, n) => {
        "use strict";
        n.r(t);
      },
      (e, t, n) => {
        const s = n(1).Ember;
        e.exports = s.HTMLBars.template({
          id: "RDFduYNR",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\Releases_14_13\\\\LeagueClientContent_Release\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-npe-rewards\\\\src\\\\app\\\\templates\\\\components\\\\battle-pass.hbs\\" style-path=\\"null\\" js-path=\\"T:\\\\cid\\\\p4\\\\Releases_14_13\\\\LeagueClientContent_Release\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-npe-rewards\\\\src\\\\app\\\\components\\\\battle-pass.js\\" "],["text","\\n"],["block",["progression-milestone-list"],null,[["currentIdx"],[["get",["currentMilestoneIdx"]]]],2]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["append",["helper",["progression-milestone-reward"],null,[["milestone"],[["get",["milestone"]]]]],false],["text","\\n"]],"locals":[]},{"statements":[["block",["progression-milestone"],null,[["milestone","milestoneIdx","totalPointsEarned"],[["get",["milestone"]],["get",["index"]],["get",["totalPointsEarned"]]]],0]],"locals":["milestone","index"]},{"statements":[["text","\\n"],["block",["each"],[["get",["mockBattlePass","milestones"]]],[["key"],["id"]],1],["text","\\n"]],"locals":[]}],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, n) => {
        "use strict";
        var s = n(1),
          a = n(5);
        n(45),
          (e.exports = s.Ember.Component.extend({
            classNames: ["lol-npe-rewards-progression-milestone-component"],
            layout: n(46),
            isFirst: s.Ember.computed.equal("milestoneIdx", 0),
            isLast: s.Ember.computed.equal(
              "milestoneIdx",
              a.LENGTH_OF_MILESTONES - 1,
            ),
            isFirstMilestoneInProgress: s.Ember.computed.and(
              "isInProgress",
              "isFirst",
            ),
            isLastMilestoneComplete: s.Ember.computed.and(
              "isComplete",
              "isLast",
            ),
            isInProgress: s.Ember.computed.equal(
              "milestone.state",
              a.BP_MILESTONE_IN_PROGRESS,
            ),
            isUnclaimed: s.Ember.computed.equal(
              "milestone.state",
              a.BP_MILESTONE_CLAIMABLE,
            ),
            isAcquired: s.Ember.computed.equal(
              "milestone.state",
              a.BP_MILESTONE_COMPLETE,
            ),
            isComplete: s.Ember.computed.or("isAcquired", "isUnclaimed"),
            progressBarWidth: s.Ember.computed(
              "milestone.percentComplete",
              "isFirst",
              function () {
                const e = this.get("milestone.percentComplete");
                return this.get("isFirst")
                  ? (a.PROGRESS_BAR_MAX_WIDTH * e * 0.01) / 2
                  : a.PROGRESS_BAR_MAX_WIDTH * e * 0.01;
              },
            ),
            progressBarStyle: s.Ember.computed(
              "progressBarWidth",
              "isFirst",
              function () {
                const e = this.get("progressBarWidth"),
                  t = this.get("isFirst"),
                  n = a.PROGRESS_BAR_MAX_WIDTH / 2 - a.PROGRESS_BAR_END_OFFSET;
                let s = `width: ${e}px;`;
                return (
                  t &&
                    (s += ` left: ${a.PROGRESS_BAR_END_OFFSET}px; max-width: ${n}px;`),
                  s
                );
              },
            ),
          }));
      },
      (e, t, n) => {
        "use strict";
        n.r(t);
      },
      (e, t, n) => {
        const s = n(1).Ember;
        e.exports = s.HTMLBars.template({
          id: "bvgAeG1K",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\Releases_14_13\\\\LeagueClientContent_Release\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-npe-rewards\\\\src\\\\app\\\\templates\\\\components\\\\progression-milestone.hbs\\" style-path=\\"null\\" js-path=\\"T:\\\\cid\\\\p4\\\\Releases_14_13\\\\LeagueClientContent_Release\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-npe-rewards\\\\src\\\\app\\\\components\\\\progression-milestone.js\\" "],["text","\\n"],["open-element","div",[]],["static-attr","class","rewards"],["flush-element"],["text","\\n  "],["yield","default"],["text","\\n"],["close-element"],["text","\\n\\n"],["open-element","div",[]],["dynamic-attr","class",["concat",["progress-bar-container",["helper",["if"],[["get",["isFirst"]]," first-bar"],null],["helper",["if"],[["get",["isLast"]]," last-bar"],null]]]],["flush-element"],["text","\\n  "],["open-element","div",[]],["dynamic-attr","class",["concat",["progress-bar ",["helper",["if"],[["get",["isInProgress"]],"in-progress"],null]]]],["dynamic-attr","style",["unknown",["progressBarStyle"]],null],["flush-element"],["text","\\n"],["block",["if"],[["get",["isInProgress"]]],null,3],["text","  "],["close-element"],["text","\\n"],["block",["if"],[["get",["isLastMilestoneComplete"]]],null,2],["close-element"],["text","\\n"],["open-element","div",[]],["static-attr","class","milestone-container"],["flush-element"],["text","\\n"],["block",["if"],[["get",["isComplete"]]],null,1,0],["close-element"]],"locals":[],"named":[],"yields":["default"],"blocks":[{"statements":[["text","  "],["open-element","img",[]],["static-attr","class","milestone-locked"],["static-attr","src","/fe/lol-tft/images/pass-milestone-lock.png"],["flush-element"],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","  "],["open-element","img",[]],["static-attr","class","milestone-complete"],["static-attr","src","/fe/lol-tft/images/pass-milestone-gem.png"],["flush-element"],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","  "],["open-element","div",[]],["static-attr","class","progress-bar progress-complete"],["flush-element"],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","    "],["open-element","div",[]],["static-attr","class","progress-indicator-container"],["flush-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","progress-indicator-line"],["flush-element"],["close-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","progress-indicator-info"],["dynamic-attr","style",["helper",["if"],[["get",["isFirstMilestoneInProgress"]],"transform: translateX(0)"],null],null],["flush-element"],["text","\\n        "],["open-element","span",[]],["static-attr","class","progress-indicator-points-earned"],["flush-element"],["append",["unknown",["totalPointsEarned"]],false],["close-element"],["text","\\n        "],["open-element","span",[]],["static-attr","class","progress-indicator-points-required"],["flush-element"],["text","/ "],["append",["unknown",["milestone","pointsForMilestone"]],false],["text","\\n          "],["append",["unknown",["tra","battle_pass_milestone_progress_units"]],false],["close-element"],["text","\\n      "],["close-element"],["text","\\n    "],["close-element"],["text","\\n"]],"locals":[]}],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, n) => {
        "use strict";
        var s = n(1),
          a = n(5);
        n(48);
        const l = ".right-button-group > lol-uikit-arrow-button",
          r = ".left-button-group > lol-uikit-arrow-button";
        e.exports = s.Ember.Component.extend({
          classNames: ["lol-npe-rewards-progression-milestone-list-component"],
          layout: n(49),
          didInsertElement() {
            this._super(...arguments), this.setInitialScrollPosition();
          },
          setInitialScrollPosition() {
            const e = this.element.querySelector(".milestones");
            this.get("currentIdx") > Math.floor(a.LENGTH_OF_MILESTONES / 2)
              ? ((this.element.querySelector(l).disabled = !0),
                (e.scrollLeft = e.scrollWidth),
                this.setMilestonesMask(e, "left"))
              : ((this.element.querySelector(r).disabled = !0),
                this.setMilestonesMask(e, "right"));
          },
          setMilestonesMask(e, t) {
            const n = `-webkit-mask-image: linear-gradient(to ${t}, #000 96%, transparent 100%);`;
            e.setAttribute("style", n);
          },
          actions: {
            navigateToStart(e) {
              const t = this.element.querySelector(".milestones");
              (t.scrollLeft = 0),
                this.setMilestonesMask(t, "right"),
                (e.target.disabled = !0),
                (this.element.querySelector(l).disabled = !1);
            },
            navigateToEnd(e) {
              const t = this.element.querySelector(".milestones");
              this.setMilestonesMask(t, "left"),
                (t.scrollLeft = t.scrollWidth),
                (e.target.disabled = !0),
                (this.element.querySelector(r).disabled = !1);
            },
          },
        });
      },
      (e, t, n) => {
        "use strict";
        n.r(t);
      },
      (e, t, n) => {
        const s = n(1).Ember;
        e.exports = s.HTMLBars.template({
          id: "z1fqxBQW",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\Releases_14_13\\\\LeagueClientContent_Release\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-npe-rewards\\\\src\\\\app\\\\templates\\\\components\\\\progression-milestone-list.hbs\\" style-path=\\"null\\" js-path=\\"T:\\\\cid\\\\p4\\\\Releases_14_13\\\\LeagueClientContent_Release\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-npe-rewards\\\\src\\\\app\\\\components\\\\progression-milestone-list.js\\" "],["text","\\n"],["open-element","div",[]],["static-attr","class","milestones-wrapper"],["flush-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","left-button-group"],["flush-element"],["text","\\n    "],["open-element","lol-uikit-arrow-button",[]],["static-attr","direction","left"],["static-attr","class","arrow"],["dynamic-attr","onClick",["helper",["action"],[["get",[null]],"navigateToStart"],null],null],["flush-element"],["close-element"],["text","\\n  "],["close-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","milestones"],["flush-element"],["text","\\n    "],["yield","default"],["text","\\n  "],["close-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","right-button-group"],["flush-element"],["text","\\n    "],["open-element","lol-uikit-arrow-button",[]],["static-attr","direction","right"],["static-attr","class","arrow"],["dynamic-attr","onClick",["helper",["action"],[["get",[null]],"navigateToEnd"],null],null],["flush-element"],["close-element"],["text","\\n  "],["close-element"],["text","\\n"],["close-element"],["text","\\n"]],"locals":[],"named":[],"yields":["default"],"blocks":[],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, n) => {
        "use strict";
        var s = n(1),
          a = n(5);
        n(51),
          (e.exports = s.Ember.Component.extend({
            classNames: ["lol-npe-rewards-progression-reward-component"],
            layout: n(52),
            isClaimable: s.Ember.computed.equal("milestone.state", "UNCLAIMED"),
            imageUrl: s.Ember.computed("milestone.iconImageUrl", function () {
              const e = this.get("milestone.iconImageUrl");
              return e || a.DEFAULT_REWARD_IMG_URL;
            }),
            stateClassName: s.Ember.computed("milestone.state", function () {
              const e = this.get("milestone.state");
              if (e && "string" == typeof e)
                return e.toLowerCase().replace("_", "-");
            }),
            actions: {},
          }));
      },
      (e, t, n) => {
        "use strict";
        n.r(t);
      },
      (e, t, n) => {
        const s = n(1).Ember;
        e.exports = s.HTMLBars.template({
          id: "MxjnGTvL",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\Releases_14_13\\\\LeagueClientContent_Release\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-npe-rewards\\\\src\\\\app\\\\templates\\\\components\\\\progression-reward.hbs\\" style-path=\\"null\\" js-path=\\"T:\\\\cid\\\\p4\\\\Releases_14_13\\\\LeagueClientContent_Release\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-npe-rewards\\\\src\\\\app\\\\components\\\\progression-reward.js\\" "],["text","\\n"],["open-element","div",[]],["dynamic-attr","class",["concat",["reward significance-default state-",["helper",["if"],[["get",["stateClassName"]],["get",["stateClassName"]],"locked"],null]]]],["dynamic-attr","onclick",["helper",["if"],[["get",["isClaimable"]],["helper",["action"],[["get",[null]],"claim"],null]],null],null],["flush-element"],["text","\\n"],["block",["if"],[["get",["isClaimable"]]],null,0],["text","  "],["open-element","img",[]],["static-attr","class","reward-image"],["dynamic-attr","src",["concat",[["unknown",["imageUrl"]]]]],["flush-element"],["close-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","reward-frame"],["flush-element"],["text","\\n    "],["open-element","span",[]],["static-attr","class","label"],["flush-element"],["append",["unknown",["milestone","label"]],false],["close-element"],["text","\\n  "],["close-element"],["text","\\n"],["close-element"]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","  "],["open-element","span",[]],["static-attr","class","claim-label"],["flush-element"],["append",["unknown",["tra","battle_pass_milestone_claim"]],false],["close-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","particles"],["flush-element"],["text","\\n    "],["open-element","img",[]],["static-attr","src","/fe/lol-tft/images/pass-reward-frame-particle-1.png"],["flush-element"],["close-element"],["text","\\n    "],["open-element","img",[]],["static-attr","src","/fe/lol-tft/images/pass-reward-frame-particle-2.png"],["flush-element"],["close-element"],["text","\\n    "],["open-element","img",[]],["static-attr","src","/fe/lol-tft/images/pass-reward-frame-particle-3.png"],["flush-element"],["close-element"],["text","\\n    "],["open-element","img",[]],["static-attr","src","/fe/lol-tft/images/pass-reward-frame-particle-4.png"],["flush-element"],["close-element"],["text","\\n    "],["open-element","img",[]],["static-attr","src","/fe/lol-tft/images/pass-reward-frame-particle-5.png"],["flush-element"],["close-element"],["text","\\n  "],["close-element"],["text","\\n"]],"locals":[]}],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        var s = n(1),
          a = n(5);
        n(54);
        var l = s.Ember.Component.extend({
          rewardsService: s.Ember.inject.service("rewards"),
          classNames: [`${a.PLUGIN_NAME}-level-up-interactions-component`],
          layout: n(55),
          loginRewards: s.Ember.computed.alias("rewardsService.loginRewards"),
          actions: {
            openCalendar(e, t) {
              this.openCalendar(e, t);
            },
            openLoot() {
              s.Router.navigateTo("rcp-fe-lol-loot");
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
          id: "uvuiS+KY",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\Releases_14_13\\\\LeagueClientContent_Release\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-npe-rewards\\\\src\\\\app\\\\templates\\\\components\\\\level-up-interactions.hbs\\" style-path=\\"null\\" js-path=\\"T:\\\\cid\\\\p4\\\\Releases_14_13\\\\LeagueClientContent_Release\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-npe-rewards\\\\src\\\\app\\\\components\\\\level-up-interactions.js\\" "],["text","\\n"],["open-element","div",[]],["static-attr","class","interactions-bar"],["flush-element"],["text","\\n  "],["append",["unknown",["challenges-card"]],false],["text","\\n  "],["open-element","div",[]],["static-attr","class","daily-play"],["flush-element"],["text","\\n"],["block",["if"],[["get",["loginRewards"]]],null,1,0],["text","  "],["close-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","go-to-loot section-wrapper"],["flush-element"],["text","\\n    "],["open-element","lol-uikit-flat-button",[]],["static-attr","class","loot-button"],["dynamic-attr","onclick",["helper",["action"],[["get",[null]],"openLoot"],null],null],["flush-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","loot-button-content"],["flush-element"],["text","\\n        "],["open-element","img",[]],["static-attr","class","hextech"],["static-attr","src","/fe/lol-static-assets/images/npe-rewards-hextech-chest.png"],["flush-element"],["close-element"],["text","\\n        "],["open-element","div",[]],["flush-element"],["append",["unknown",["tra","passes_loot_button"]],false],["close-element"],["text","\\n      "],["close-element"],["text","\\n    "],["close-element"],["text","\\n  "],["close-element"],["text","\\n"],["close-element"],["text","\\n"]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","      "],["open-element","div",[]],["static-attr","class","loading-section"],["flush-element"],["text","\\n        "],["append",["helper",["uikit-spinner"],null,[["width","height"],["50px","50px"]]],false],["text","\\n      "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","      "],["append",["helper",["login-rewards"],null,[["rewardsType","rewards","openCalendar","renderModeV3"],["login",["get",["loginRewards"]],["helper",["action"],[["get",[null]],"openCalendar"],null],true]]],false],["text","\\n"]],"locals":[]}],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        var s,
          a = n(1),
          l = n(5),
          r = n(11),
          o = (s = n(57)) && s.__esModule ? s : { default: s };
        n(58);
        var i = a.Ember.Component.extend({
          layout: o.default,
          classNames: [`${l.PLUGIN_NAME}-challenges-card`],
          rewardsService: a.Ember.inject.service("rewards"),
          challengesProgress: a.Ember.computed.alias(
            "rewardsService.challengesProgress",
          ),
          currentProgress: a.Ember.computed.alias(
            "challengesProgress.progress.currentProgress",
          ),
          totalCount: a.Ember.computed.alias(
            "challengesProgress.progress.totalCount",
          ),
          allComplete: a.Ember.computed(
            "currentProgress",
            "totalCount",
            function () {
              return (
                !!this.get("totalCount") &&
                this.get("currentProgress") === this.get("totalCount")
              );
            },
          ),
          progressBarStyle: a.Ember.computed(
            "currentProgress",
            "totalCount",
            function () {
              return `width: ${(this.get("currentProgress") / this.get("totalCount")) * 100}%;`;
            },
          ),
          actions: {
            openMissions() {
              a.Navigation.showTracker(),
                (0, r.sendEvent)({
                  eventName: "button-click",
                  buttonAction: "npe-challenges-mission-tracker-button-click",
                });
            },
            openLoot() {
              a.Router.navigateTo("rcp-fe-lol-loot"),
                (0, r.sendEvent)({
                  eventName: "button-click",
                  buttonAction: "npe-challenges-loot-button-click",
                });
            },
          },
        });
        t.default = i;
      },
      (e, t, n) => {
        const s = n(1).Ember;
        e.exports = s.HTMLBars.template({
          id: "qPcWy7qF",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\Releases_14_13\\\\LeagueClientContent_Release\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-npe-rewards\\\\src\\\\app\\\\templates\\\\components\\\\challenges-card.hbs\\" style-path=\\"null\\" js-path=\\"T:\\\\cid\\\\p4\\\\Releases_14_13\\\\LeagueClientContent_Release\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-npe-rewards\\\\src\\\\app\\\\components\\\\challenges-card.js\\" "],["text","\\n"],["open-element","div",[]],["static-attr","class","challenges"],["flush-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","section-title"],["flush-element"],["text","\\n    "],["open-element","span",[]],["flush-element"],["append",["unknown",["tra","passes_challenges_headline"]],false],["close-element"],["text","\\n  "],["close-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","section-wrapper"],["flush-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","section-left"],["flush-element"],["text","\\n      "],["open-element","div",[]],["dynamic-attr","class",["concat",["reward-image ",["helper",["if"],[["get",["allComplete"]],"complete-grey"],null]]]],["flush-element"],["text","\\n"],["block",["npe-tooltip"],null,[["tooltipId"],["challenges"]],3],["text","      "],["close-element"],["text","\\n    "],["close-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","section-right"],["flush-element"],["text","\\n"],["block",["if"],[["get",["challengesProgress"]]],null,2],["text","      "],["open-element","div",[]],["static-attr","class","section-subtitle"],["flush-element"],["text","\\n        "],["append",["unknown",["tra","passes_challenges_subline"]],false],["text","\\n      "],["close-element"],["text","\\n    "],["close-element"],["text","\\n  "],["close-element"],["text","\\n"],["block",["if"],[["get",["allComplete"]]],null,1,0],["close-element"],["text","\\n"]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","    "],["open-element","lol-uikit-flat-button",[]],["static-attr","class","view-button"],["dynamic-attr","onclick",["helper",["action"],[["get",[null]],"openMissions"],null],null],["flush-element"],["text","\\n      "],["append",["unknown",["tra","passes_challenges_cta"]],false],["text","\\n    "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","    "],["open-element","div",[]],["static-attr","class","complete-checkmark"],["flush-element"],["close-element"],["text","\\n    "],["open-element","lol-uikit-flat-button",[]],["static-attr","class","view-button"],["dynamic-attr","onclick",["helper",["action"],[["get",[null]],"openLoot"],null],null],["flush-element"],["text","\\n      "],["append",["unknown",["tra","passes_loot_button"]],false],["text","\\n    "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","        "],["open-element","div",[]],["static-attr","class","progress-bar-container"],["flush-element"],["text","\\n          "],["open-element","div",[]],["static-attr","class","progress-bar"],["dynamic-attr","style",["unknown",["progressBarStyle"]],null],["flush-element"],["text","\\n          "],["close-element"],["text","\\n        "],["close-element"],["text","\\n        "],["open-element","div",[]],["static-attr","class","progress-label"],["flush-element"],["append",["unknown",["currentProgress"]],false],["text"," /\\n          "],["append",["unknown",["totalCount"]],false],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","          "],["open-element","lol-uikit-content-block",[]],["static-attr","class","npe-rewards-challenges-tooltip"],["flush-element"],["text","\\n            "],["open-element","h6",[]],["static-attr","class","rcp-fe-lol-npe-rewards-tooltip-header"],["flush-element"],["append",["unknown",["tra","passes_challenges_tooltip_headline"]],false],["close-element"],["text","\\n            "],["open-element","p",[]],["static-attr","class","rcp-fe-lol-npe-rewards-tooltip-subheader"],["flush-element"],["append",["unknown",["tra","passes_challenges_tooltip_subline"]],false],["close-element"],["text","\\n          "],["close-element"],["text","\\n"]],"locals":[]}],"hasPartials":false}',
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
          a = n(5);
        const l = s.UIKit.getTooltipManager();
        var r = s.Ember.Component.extend({
          classNames: [`${a.PLUGIN_NAME}-npe-tooltip`],
          layout: n(60),
          toolTipAttached: !1,
          tooltipOptions: null,
          init() {
            this._super(...arguments);
            this.set("tooltipOptions", {
              targetAnchor: { x: "center", y: "top" },
              tooltipAnchor: { x: "center", y: "bottom" },
              tooltipDirection: "top",
            });
          },
          tooltipSetup() {
            const e = this.toolTipAttached;
            if (
              ((this.tooltipHoverElement = this.element.parentElement),
              !e && this.tooltipHoverElement)
            ) {
              const e = this.get("tooltipId");
              (this.tooltipElement = this.element.querySelector(
                `#npe-tooltip-${e}`,
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
            l.assign(
              this.tooltipHoverElement,
              this.tooltipElement,
              null,
              this.get("tooltipOptions"),
            );
          },
          detachTooltip: function () {
            l.unassign(this.tooltipHoverElement);
          },
        });
        t.default = r;
      },
      (e, t, n) => {
        const s = n(1).Ember;
        e.exports = s.HTMLBars.template({
          id: "zNyFPTLu",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\Releases_14_13\\\\LeagueClientContent_Release\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-npe-rewards\\\\src\\\\app\\\\templates\\\\components\\\\npe-tooltip.hbs\\" style-path=\\"null\\" js-path=\\"T:\\\\cid\\\\p4\\\\Releases_14_13\\\\LeagueClientContent_Release\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-npe-rewards\\\\src\\\\app\\\\components\\\\npe-tooltip.js\\" "],["text","\\n"],["open-element","lol-uikit-tooltip",[]],["dynamic-attr","id",["concat",["npe-tooltip-",["unknown",["tooltipId"]]]]],["flush-element"],["text","\\n  "],["yield","default"],["text","\\n"],["close-element"],["text","\\n"]],"locals":[],"named":[],"yields":["default"],"blocks":[],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        var s = n(1);
        const a = "/lol-npe-rewards/v1/level-rewards",
          l = "/lol-npe-rewards/v1/login-rewards",
          r = "/lol-npe-rewards/v1/challenges/progress",
          o = "/lol-npe-rewards/v1/challenges/opt",
          i = "/lol-platform-config/v1/namespaces/LcuNpe",
          c = "/lol-settings/v2/account/LCUPreferences/lol-tutorial";
        var d = s.Ember.Service.extend({
          configLoaded: null,
          RewardsPackDiscountDisabled: null,
          levelRewards: null,
          loginRewards: null,
          challengesProgress: null,
          isChallengesEnabled: null,
          promisedPlatformConfig: null,
          init() {
            this._super(...arguments),
              (this.binding = s.dataBinding.bindTo(s.socket)),
              this._setConfigurationState(),
              this._initObservers();
          },
          willDestroy() {
            this._super(...arguments),
              this.binding.unobserve(a),
              this.binding.unobserve(l),
              this.binding.unobserve(r),
              (this.binding = null);
          },
          visitHub: function () {
            this.binding.patch(c, {
              data: { npeRewardsV1IntroSeen: !0 },
              schemaVersion: 1,
            });
          },
          getHasVisitedHub: function () {
            return this.binding
              .get(c)
              .then(
                (e) =>
                  !(!e || !e.data) && Boolean(e.data.npeRewardsV1IntroSeen),
              )
              .catch(
                (e) => (
                  s.logger.error(
                    "Error fetching lol-tutorial settings from player preferences:",
                    e,
                  ),
                  !1
                ),
              );
          },
          _initObservers: function () {
            this.binding.observe(a, (e) => {
              !e ||
                this.isDestroying ||
                this.isDestroyed ||
                this.set("levelRewards", s.Ember.A(e.rewardPacks));
            }),
              this.binding.observe(l, (e) => {
                !e ||
                  this.isDestroying ||
                  this.isDestroyed ||
                  this.set("loginRewards", s.Ember.A(e.rewardPacks));
              }),
              this.binding.observe(r, (e) => {
                !e ||
                  this.isDestroying ||
                  this.isDestroyed ||
                  this.set("challengesProgress", s.Ember.Object.create(e));
              });
          },
          _setConfigurationState() {
            return this._getPlatformConfig()
              .then((e) => {
                this._setRewardsPackDiscountDisabled(e),
                  this._setRewardsChallengesEnabled(e),
                  this.set("configLoaded", !0);
              })
              .catch((e) => {
                s.logger.error(
                  "Setting UI state from platform configuration failed:",
                  e,
                ),
                  this.set("configLoaded", !1);
              });
          },
          _getPlatformConfig() {
            return (
              this.promisedPlatformConfig ||
                (this.promisedPlatformConfig = this.binding
                  .get(i)
                  .then(
                    (e) =>
                      e ||
                      (s.logger.error(
                        "There was a problem fetching platform configuration for NPE",
                      ),
                      null),
                  )),
              this.promisedPlatformConfig
            );
          },
          _setRewardsPackDiscountDisabled(e) {
            e &&
              this.set(
                "RewardsPackDiscountDisabled",
                Boolean(e.RewardsPackDiscountDisabled),
              );
          },
          _setRewardsChallengesEnabled(e) {
            e &&
              this.set(
                "isChallengesEnabled",
                Boolean(e.RewardsChallengesEnabled),
              );
          },
          optInToRewardsChallenges: function () {
            this.binding.post(o);
          },
        });
        t.default = d;
      },
      (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        var s = n(1);
        const a = [99900610, 99900882, 99900881, 99900879, 99900883, 99900880],
          l = {
            HEXTECH_CRAFTING_254: 295,
            HEXTECH_CRAFTING_255: 295,
            SUMMONER_ICON_3550: 650,
            SUMMONER_ICON_4305: 650,
            SUMMONER_ICON_4302: 650,
            SUMMONER_ICON_4303: 650,
            SUMMONER_ICON_4304: 650,
            SUMMONER_ICON_4301: 650,
          },
          r = ["SUMMONER_ICON", "CHAMPION", "CHAMPION_SKIN"],
          o = {
            newPlayerPacks: `/lol-store/v1/catalog?inventoryType=["BUNDLES"]&itemId=[${a.toString()}]`,
            inventoryByType: (e) => `/lol-inventory/v2/inventory/${e}`,
          };
        var i = s.Ember.Service.extend({
          init() {
            this._super(...arguments),
              (this.binding = s.dataBinding.bindTo(s.socket));
          },
          getNewPlayerPacks() {
            return Promise.all([
              this.binding.get(o.newPlayerPacks),
              this.getOwnedInventory(),
            ])
              .then(([e, t]) =>
                Promise.all([e, t, this.getBundleItemsFromCatalog(e)]),
              )
              .then(
                ([e, t, n]) => (
                  this.prepareNewPlayerPacksForComponent(e, t, n), e
                ),
              );
          },
          prepareNewPlayerPacksForComponent(e, t, n) {
            if (Array.isArray(e)) {
              for (const s of e)
                Object.assign(s, this.getBundleCostData(s, t, n));
              e.sort((e, t) => a.indexOf(e.itemId) - a.indexOf(t.itemId));
            }
          },
          getOwnedInventoryByType(e) {
            const t = o.inventoryByType(e);
            return new Promise((e) => {
              const n = (s) => {
                s && !s.errorCode && (this.binding.unobserve(t, n), e(s));
              };
              this.binding.observe(t, n);
            });
          },
          getOwnedInventory() {
            return Promise.all(
              r.map((e) => this.getOwnedInventoryByType(e)),
            ).then((e) => {
              let t = [];
              for (const n of e) t = t.concat(n);
              return this.createInventoryOwnershipMap(t);
            });
          },
          createInventoryOwnershipMap(e) {
            const t = {};
            for (const n of e)
              t[n.inventoryType] || (t[n.inventoryType] = {}),
                "OWNED" === n.ownershipType &&
                  (t[n.inventoryType][n.itemId] = !0);
            return t;
          },
          getBundleItemsFromCatalog(e) {
            const t = this.groupBundleItemsByInventoryType(e),
              n = [];
            for (const e of Object.keys(t))
              n.push(this.getCatalogItemsByInventoryType(e, t[e]));
            return Promise.all(n).then((e) => {
              const n = this.createInventoryTypeToCatalogItemMap(e);
              return this.fillMissingCatalogItems(t, n), n;
            });
          },
          groupBundleItemsByInventoryType(e) {
            if (!Array.isArray(e)) return {};
            const t = {};
            for (const n of e)
              for (const e of n.bundled.items)
                t[e.inventoryType]
                  ? t[e.inventoryType].push(e)
                  : (t[e.inventoryType] = [e]);
            return t;
          },
          createInventoryTypeToCatalogItemMap(e) {
            const t = {};
            for (const n of e)
              for (const e of n) {
                const { inventoryType: n, itemId: s } = e;
                t[n] || (t[n] = {}), (t[n][s] = e);
              }
            return t;
          },
          fillMissingCatalogItems(e, t) {
            for (const n of Object.keys(e)) {
              t[n] || (t[n] = {});
              for (const s of e[n]) {
                const { inventoryType: e, itemId: n } = s,
                  a = !!l[`${e}_${n}`];
                (!t[e] || !t[e][n]) &&
                  a &&
                  (t[e][n] = this.createDummyCatalogItem(s));
              }
            }
          },
          createDummyCatalogItem(e) {
            const { inventoryType: t, itemId: n } = e;
            return {
              inventoryType: t,
              itemId: n,
              prices: [{ currency: "RP", cost: l[`${t}_${n}`] || 0 }],
            };
          },
          getCatalogItemsByInventoryType(e, t) {
            const n = t.map((e) => e.itemId);
            return (0, s.dataBinding)("/lol-store").get(
              `/v1/catalog?inventoryType=["${e}"]&itemId=[${n.toString()}]`,
            );
          },
          getBundleDiscountCost(e) {
            return e.bundled.items.reduce(
              (e, t) => e + this.getRpCostFromPrices(t.discountPrices),
              0,
            );
          },
          getBundleTotalCost(e, t, n) {
            return e.bundled.items.reduce((e, s) => {
              if (t[s.inventoryType] && t[s.inventoryType][s.itemId]) return e;
              const a = n[s.inventoryType][s.itemId];
              return e + (a ? this.getRpCostFromPrices(a.prices || []) : 0);
            }, 0);
          },
          getRpCostFromPrices(e) {
            const t = e.find((e) => "RP" === e.currency);
            return t ? t.cost : 0;
          },
          getBundleIsOwned: (e, t) =>
            e.bundled.items.every(
              ({ inventoryType: e, itemId: n }) =>
                (t[e] && t[e][n]) || !r.includes(e),
            ),
          getBundleCostData(e, t, n) {
            const s = this.getBundleTotalCost(e, t, n),
              a = this.getBundleDiscountCost(e),
              l = this.getBundleIsOwned(e, t);
            let r = 0;
            return (
              0 !== s && (r = Math.round(((s - a) / s) * 100)),
              {
                totalCost: s,
                discountCost: a,
                discountPercentage: r,
                isOwned: l,
              }
            );
          },
        });
        t.default = i;
      },
      (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        var s = n(1);
        const a = "/lol-game-queues/v1/queues",
          l = "/lol-lobby/v2/lobby",
          r = "/lol-lobby/v2/eligibility/initial-configuration-complete",
          o = "/lol-lobby/v2/eligibility/self";
        var i = s.Ember.Service.extend({
          lobby: null,
          gameQueues: null,
          eligibility: null,
          init() {
            this._super(...arguments),
              (this.binding = s.dataBinding.bindTo(s.socket)),
              this._initObservers();
          },
          willDestroy() {
            this._super(...arguments),
              this.binding.unobserve(a),
              this.binding.unobserve(l),
              this.binding.unobserve(r),
              (this.binding = null);
          },
          _initObservers() {
            this.binding.observe(a, (e) => {
              !e ||
                this.isDestroying ||
                this.isDestroyed ||
                this.set("gameQueues", s.Ember.A(e));
            }),
              this.binding.observe(l, (e) => {
                !e ||
                  this.isDestroying ||
                  this.isDestroyed ||
                  this.set("lobby", e);
              }),
              this.binding.observe(r, (e) => {
                (e || this.isDestroying || this.isDestroyed) &&
                  this.binding.post(o).then((e) => {
                    this.set("eligibility", s.Ember.A(e));
                  });
              });
          },
        });
        t.default = i;
      },
      (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.createLayoutService = function (e) {
            return s.Ember.Service.extend({
              rewardsService: s.Ember.inject.service("rewards"),
              getInitialRouteName() {
                return this.get("rewardsService")
                  .getHasVisitedHub()
                  .then((e) => (e ? this.getPostSplashRouteName() : "splash"))
                  .catch(() => "splash");
              },
              getPostSplashRouteName: () =>
                e === a.LAYOUT_NAMES.V3 ? "rewardsV3" : "rewardsV4",
            });
          });
        var s = n(1),
          a = n(5);
      },
      (e, t, n) => {
        const s = n(1).Ember;
        e.exports = s.HTMLBars.template({
          id: "zNozto+s",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\Releases_14_13\\\\LeagueClientContent_Release\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-npe-rewards\\\\src\\\\app\\\\templates\\\\application.hbs\\" style-path=\\"null\\" js-path=\\"null\\" "],["text","\\n"],["open-element","div",[]],["static-attr","class","rcp-fe-lol-npe-rewards"],["flush-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","lol-npe-rewards-content"],["flush-element"],["text","\\n    "],["append",["unknown",["outlet"]],false],["text","\\n  "],["close-element"],["text","\\n"],["close-element"],["text","\\n"]],"locals":[],"named":[],"yields":[],"blocks":[],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, n) => {
        const s = n(1).Ember;
        e.exports = s.HTMLBars.template({
          id: "q+hZ5Wzo",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\Releases_14_13\\\\LeagueClientContent_Release\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-npe-rewards\\\\src\\\\app\\\\templates\\\\rewardsV2.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\Releases_14_13\\\\LeagueClientContent_Release\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-npe-rewards\\\\src\\\\app\\\\styles\\\\rewardsV2.styl\\" js-path=\\"null\\" "],["text","\\n"],["open-element","div",[]],["static-attr","class","rcp-fe-lol-npe-rewards-hub-v2 main-background"],["flush-element"],["text","\\n"],["block",["if"],[["get",["configLoaded"]]],null,3,0],["close-element"],["text","\\n"]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","    "],["append",["unknown",["loading-experience"]],false],["text","\\n"]],"locals":[]},{"statements":[["text","        "],["append",["unknown",["loading-experience"]],false],["text","\\n"]],"locals":[]},{"statements":[["text","        "],["open-element","div",[]],["static-attr","class","page-layout-rewards-v2"],["flush-element"],["text","\\n          "],["open-element","div",[]],["static-attr","class","rewards-header-container"],["flush-element"],["text","\\n            "],["open-element","div",[]],["static-attr","class","rewards-header-subtitle"],["flush-element"],["append",["unknown",["tra","intro_header_subtitle"]],false],["close-element"],["text","\\n            "],["open-element","div",[]],["static-attr","class","rewards-header-title"],["flush-element"],["append",["unknown",["tra","intro_header_title_v2"]],false],["close-element"],["text","\\n          "],["close-element"],["text","\\n          "],["append",["helper",["new-player-pack"],null,[["renderModeSidebar"],[true]]],false],["text","\\n          "],["append",["unknown",["game-mode-carousel"]],false],["text","\\n          "],["append",["helper",["level-rewards"],null,[["rewardsType","rewards","openCalendar"],["level",["get",["levelRewards"]],["helper",["action"],[["get",[null]],"openCalendar"],null]]]],false],["text","\\n          "],["append",["helper",["login-rewards"],null,[["rewardsType","rewards","openCalendar"],["login",["get",["loginRewards"]],["helper",["action"],[["get",[null]],"openCalendar"],null]]]],false],["text","\\n        "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","    "],["open-element","div",[]],["static-attr","class","root-component"],["flush-element"],["text","\\n"],["block",["if"],[["get",["panelsLoadedv2"]]],null,2,1],["text","    "],["close-element"],["text","\\n    "],["append",["unknown",["outlet"]],false],["text","\\n"]],"locals":[]}],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, n) => {
        const s = n(1).Ember;
        e.exports = s.HTMLBars.template({
          id: "N/CItf+3",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\Releases_14_13\\\\LeagueClientContent_Release\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-npe-rewards\\\\src\\\\app\\\\templates\\\\splash.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\Releases_14_13\\\\LeagueClientContent_Release\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-npe-rewards\\\\src\\\\app\\\\styles\\\\splash.styl\\" js-path=\\"null\\" "],["text","\\n"],["open-element","div",[]],["static-attr","class","lol-npe-rewards-intro-splash rewards-v2"],["flush-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","intro-splash-content"],["flush-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","intro-splash-content-top-section"],["flush-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","intro-splash-divider"],["flush-element"],["close-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","intro-splash-title"],["flush-element"],["text","\\n        "],["append",["unknown",["tra","splash_title_line1"]],false],["open-element","br",[]],["flush-element"],["close-element"],["text","\\n        "],["append",["unknown",["tra","splash_title_line2"]],false],["text","\\n      "],["close-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","intro-splash-button-wrapper"],["flush-element"],["text","\\n        "],["open-element","lol-uikit-flat-button",[]],["static-attr","class","intro-splash-button"],["dynamic-attr","onclick",["helper",["action"],[["get",[null]],"closeIntro"],null],null],["flush-element"],["text","\\n          "],["append",["unknown",["tra","splash_button_get_started"]],false],["text","\\n        "],["close-element"],["text","\\n      "],["close-element"],["text","\\n    "],["close-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","intro-splash-log-in-wrapper"],["flush-element"],["text","\\n      "],["open-element","span",[]],["static-attr","class","title"],["flush-element"],["append",["unknown",["tra","splash_button_log_in_title"]],false],["close-element"],["text","\\n      "],["open-element","span",[]],["static-attr","class","description"],["flush-element"],["append",["unknown",["tra","splash_button_log_in_description"]],false],["close-element"],["text","\\n    "],["close-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","intro-splash-level-up-wrapper"],["flush-element"],["text","\\n      "],["open-element","span",[]],["static-attr","class","title"],["flush-element"],["append",["unknown",["tra","splash_button_level_up_title"]],false],["close-element"],["text","\\n      "],["open-element","span",[]],["static-attr","class","description"],["flush-element"],["append",["unknown",["tra","splash_button_level_up_description"]],false],["close-element"],["text","\\n    "],["close-element"],["text","\\n  "],["close-element"],["text","\\n"],["close-element"],["text","\\n"]],"locals":[],"named":[],"yields":[],"blocks":[],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, n) => {
        const s = n(1).Ember;
        e.exports = s.HTMLBars.template({
          id: "c1j0gJFw",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\Releases_14_13\\\\LeagueClientContent_Release\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-npe-rewards\\\\src\\\\app\\\\templates\\\\rewardsV3.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\Releases_14_13\\\\LeagueClientContent_Release\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-npe-rewards\\\\src\\\\app\\\\styles\\\\rewardsV3.styl\\" js-path=\\"null\\" "],["text","\\n"],["open-element","div",[]],["static-attr","class","rcp-fe-lol-npe-rewards-hub-v3 main-background"],["flush-element"],["text","\\n"],["block",["if"],[["get",["configLoaded"]]],null,3,0],["close-element"],["text","\\n"]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","    "],["append",["unknown",["loading-experience"]],false],["text","\\n"]],"locals":[]},{"statements":[["text","        "],["append",["unknown",["loading-experience"]],false],["text","\\n"]],"locals":[]},{"statements":[["text","        "],["open-element","div",[]],["static-attr","class","page-layout-rewards-v3"],["flush-element"],["text","\\n          "],["open-element","div",[]],["static-attr","class","rewards-header-container"],["flush-element"],["text","\\n            "],["open-element","div",[]],["static-attr","class","rewards-header-subtitle"],["flush-element"],["append",["unknown",["tra","intro_header_subtitle"]],false],["close-element"],["text","\\n            "],["open-element","div",[]],["static-attr","class","rewards-header-title"],["flush-element"],["append",["unknown",["tra","intro_header_title_v2"]],false],["close-element"],["text","\\n          "],["close-element"],["text","\\n          "],["open-element","div",[]],["static-attr","class","v3-hub-magic"],["flush-element"],["close-element"],["text","\\n          "],["append",["helper",["new-player-pack"],null,[["renderModeSidebar"],[true]]],false],["text","\\n          "],["append",["unknown",["challenges-card"]],false],["text","\\n          "],["append",["helper",["level-rewards"],null,[["rewardsType","rewards","openCalendar"],["level",["get",["levelRewards"]],["helper",["action"],[["get",[null]],"openCalendar"],null]]]],false],["text","\\n          "],["append",["helper",["login-rewards"],null,[["rewardsType","rewards","openCalendar"],["login",["get",["loginRewards"]],["helper",["action"],[["get",[null]],"openCalendar"],null]]]],false],["text","\\n        "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","    "],["open-element","div",[]],["static-attr","class","root-component"],["flush-element"],["text","\\n"],["block",["if"],[["get",["panelsLoadedv3"]]],null,2,1],["text","    "],["close-element"],["text","\\n    "],["append",["unknown",["outlet"]],false],["text","\\n"]],"locals":[]}],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, n) => {
        const s = n(1).Ember;
        e.exports = s.HTMLBars.template({
          id: "gtiCS/ig",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\Releases_14_13\\\\LeagueClientContent_Release\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-npe-rewards\\\\src\\\\app\\\\templates\\\\rewardsV4.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\Releases_14_13\\\\LeagueClientContent_Release\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-npe-rewards\\\\src\\\\app\\\\styles\\\\rewardsV4.styl\\" js-path=\\"null\\" "],["text","\\n"],["open-element","div",[]],["static-attr","class","rcp-fe-lol-npe-rewards-hub-v4 main-background"],["flush-element"],["text","\\n"],["block",["if"],[["get",["configLoaded"]]],null,3,0],["close-element"],["text","\\n"]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","    "],["append",["unknown",["loading-experience"]],false],["text","\\n"]],"locals":[]},{"statements":[["text","        "],["append",["unknown",["loading-experience"]],false],["text","\\n"]],"locals":[]},{"statements":[["text","        "],["open-element","div",[]],["static-attr","class","page-layout-rewards-v4"],["flush-element"],["text","\\n          "],["open-element","div",[]],["static-attr","class","rewards-header-container"],["flush-element"],["text","\\n            "],["open-element","div",[]],["static-attr","class","rewards-header-subtitle"],["flush-element"],["append",["unknown",["tra","intro_header_subtitle"]],false],["close-element"],["text","\\n            "],["open-element","div",[]],["static-attr","class","rewards-header-title"],["flush-element"],["append",["unknown",["tra","intro_header_title_v2"]],false],["close-element"],["text","\\n          "],["close-element"],["text","\\n          "],["open-element","div",[]],["static-attr","class","v4-hub-magic"],["flush-element"],["close-element"],["text","\\n          "],["append",["helper",["new-player-pack"],null,[["renderModeCarousel"],[true]]],false],["text","\\n          "],["append",["unknown",["challenges-card"]],false],["text","\\n          "],["append",["helper",["level-rewards"],null,[["rewardsType","rewards","openCalendar"],["level",["get",["levelRewards"]],["helper",["action"],[["get",[null]],"openCalendar"],null]]]],false],["text","\\n          "],["append",["helper",["login-rewards"],null,[["rewardsType","rewards","openCalendar"],["login",["get",["loginRewards"]],["helper",["action"],[["get",[null]],"openCalendar"],null]]]],false],["text","\\n        "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","    "],["open-element","div",[]],["static-attr","class","root-component"],["flush-element"],["text","\\n"],["block",["if"],[["get",["panelsLoadedv4"]]],null,2,1],["text","    "],["close-element"],["text","\\n    "],["append",["unknown",["outlet"]],false],["text","\\n"]],"locals":[]}],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, n) => {
        "use strict";
        var s = n(1);
        n(71),
          (e.exports = s.Ember.Component.extend({
            classNames: ["npe-rewards-calendar"],
            layout: n(72),
            imagePath: "/fe/lol-static-assets/images",
            init() {
              this._super(...arguments), this.setInitialSelectedItem();
            },
            selectedRewardIndex: null,
            selectedReward: null,
            setInitialSelectedItem: function () {
              const e = this.get("rewards");
              for (let t = 0; t < e.length; t++)
                if ("LOCKED" === e[t].state)
                  return (
                    this.set("selectedRewardIndex", t),
                    void this.set("selectedReward", e[t])
                  );
              this.set("selectedRewardIndex", e.length - 1),
                this.set("selectedReward", e[e.length - 1]);
            },
            lastItemNumber: s.Ember.computed.alias("rewards.length"),
            rewardsCalendarHeaderTitle: s.Ember.computed(
              "rewardsType",
              function () {
                const e = this.get("tra"),
                  t = `calendar_rewards_header_${this.get("rewardsType")}_title`;
                return e.get(t);
              },
            ),
            rewardsCalendarHeaderDescription: s.Ember.computed(
              "rewardsType",
              function () {
                const e = this.get("tra"),
                  t = `calendar_rewards_header_${this.get("rewardsType")}_description`;
                return e.get(t);
              },
            ),
            rewardsCalendarFooterMessage: s.Ember.computed(
              "rewardsType",
              function () {
                const e = this.get("rewardsType");
                return this.get("tra").get(
                  `calendar_rewards_footer_${e}_message`,
                );
              },
            ),
            actions: {
              selectRewardItem(e, t) {
                this.set("selectedRewardIndex", t),
                  this.set("selectedReward", e);
              },
            },
          }));
      },
      (e, t, n) => {
        "use strict";
        n.r(t);
      },
      (e, t, n) => {
        const s = n(1).Ember;
        e.exports = s.HTMLBars.template({
          id: "uf/+mPDO",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\Releases_14_13\\\\LeagueClientContent_Release\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-npe-rewards\\\\src\\\\app\\\\templates\\\\components\\\\rewards-calendar.hbs\\" style-path=\\"null\\" js-path=\\"T:\\\\cid\\\\p4\\\\Releases_14_13\\\\LeagueClientContent_Release\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-npe-rewards\\\\src\\\\app\\\\components\\\\rewards-calendar.js\\" "],["text","\\n"],["open-element","div",[]],["dynamic-attr","class",["concat",["rewards-calendar-background ",["unknown",["rewardsType"]]]]],["flush-element"],["close-element"],["text","\\n"],["open-element","div",[]],["static-attr","class","rewards-calendar-header"],["flush-element"],["text","\\n  "],["open-element","div",[]],["dynamic-attr","class",["concat",["rewards-calendar-header-title ",["unknown",["rewardsType"]]]]],["flush-element"],["text","\\n    "],["append",["unknown",["rewardsCalendarHeaderTitle"]],false],["text","\\n  "],["close-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","rewards-calendar-header-description"],["flush-element"],["text","\\n    "],["append",["unknown",["rewardsCalendarHeaderDescription"]],false],["text","\\n  "],["close-element"],["text","\\n"],["close-element"],["text","\\n"],["open-element","div",[]],["dynamic-attr","class",["concat",["rewards-calendar-items ",["unknown",["rewardsType"]]]]],["flush-element"],["text","\\n"],["block",["each"],[["get",["rewards"]]],null,0],["close-element"],["text","\\n"],["append",["helper",["calendar-item-detail"],null,[["rewardType","selectedReward","selectedRewardIndex"],[["get",["rewardsType"]],["get",["selectedReward"]],["get",["selectedRewardIndex"]]]]],false],["text","\\n"],["open-element","div",[]],["static-attr","class","rewards-calendar-footer"],["flush-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","rewards-calendar-footer-message"],["flush-element"],["text","\\n    "],["append",["unknown",["rewardsCalendarFooterMessage"]],false],["text","\\n  "],["close-element"],["text","\\n"],["close-element"],["text","\\n"]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","    "],["append",["helper",["calendar-item"],null,[["index","reward","rewardType","lastItemNumber","selectedItemIndex","selectRewardItem"],[["get",["index"]],["get",["reward"]],["get",["rewardsType"]],["get",["lastItemNumber"]],["get",["selectedRewardIndex"]],["helper",["action"],[["get",[null]],"selectRewardItem"],null]]]],false],["text","\\n"]],"locals":["reward","index"]}],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, n) => {
        "use strict";
        var s = n(1);
        n(74),
          (e.exports = s.Ember.Component.extend({
            classNames: ["lol-npe-rewards-calendar-item-component"],
            classNameBindings: ["rewardType"],
            layout: n(75),
            imagePath: "/fe/lol-static-assets/images",
            progressRewardNumber: s.Ember.computed(
              "index",
              "rewardType",
              function () {
                const e = this.get("rewardType"),
                  t = this.get("index") + 1;
                return this.get("tra").formatString(`calendar_rewards_${e}`, {
                  progressNumber: t,
                });
              },
            ),
            hideMinorRewards: s.Ember.computed(
              "reward.minorRewards",
              function () {
                for (const e of this.get("reward.minorRewards"))
                  if (!e.data.hideInCalendarDetail) return !1;
                return !0;
              },
            ),
            isLastCalendarItem: s.Ember.computed(
              "index",
              "lastItemNumber",
              function () {
                return this.get("index") === this.get("lastItemNumber") - 1;
              },
            ),
            isSelectedCalendarItem: s.Ember.computed(
              "index",
              "selectedItemIndex",
              function () {
                return this.get("index") === this.get("selectedItemIndex");
              },
            ),
            lastItemClass: s.Ember.computed("isLastCalendarItem", function () {
              return this.get("isLastCalendarItem") ? " last-item" : "";
            }),
            selectedItemClass: s.Ember.computed(
              "isSelectedCalendarItem",
              function () {
                return this.get("isSelectedCalendarItem") ? " selected" : "";
              },
            ),
            isChampionChoice: s.Ember.computed.equal(
              "reward.majorReward.renderer",
              "champion_choice",
            ),
            hasChampionChoiceRoleIcon: s.Ember.computed(
              "isChampionChoice",
              "reward.majorReward.data.type",
              function () {
                const e = this.get("reward.majorReward.data.type");
                return !!e && "generic" !== e && this.get("isChampionChoice");
              },
            ),
            actions: {
              selectRewardItem(e, t) {
                this.selectRewardItem(e, t);
              },
            },
          }));
      },
      (e, t, n) => {
        "use strict";
        n.r(t);
      },
      (e, t, n) => {
        const s = n(1).Ember;
        e.exports = s.HTMLBars.template({
          id: "cg5FhV/m",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\Releases_14_13\\\\LeagueClientContent_Release\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-npe-rewards\\\\src\\\\app\\\\templates\\\\components\\\\calendar-item.hbs\\" style-path=\\"null\\" js-path=\\"T:\\\\cid\\\\p4\\\\Releases_14_13\\\\LeagueClientContent_Release\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-npe-rewards\\\\src\\\\app\\\\components\\\\calendar-item.js\\" "],["text","\\n"],["open-element","div",[]],["static-attr","class","reward-item-container"],["modifier",["action"],[["get",[null]],"selectRewardItem",["get",["reward"]],["get",["index"]]],[["on"],["click"]]],["flush-element"],["text","\\n  "],["open-element","div",[]],["dynamic-attr","class",["concat",["under-reward-calendar-item-bg-color\\n              ",["unknown",["reward","state"]],"\\n              ",["unknown",["lastItemClass"]],"\\n              ",["unknown",["selectedItemClass"]]]]],["flush-element"],["close-element"],["text","\\n  "],["open-element","div",[]],["dynamic-attr","class",["concat",["major-item-image-container\\n              ",["unknown",["lastItemClass"]],"\\n              ",["unknown",["selectedItemClass"]]]]],["flush-element"],["text","\\n    "],["open-element","img",[]],["dynamic-attr","class",["concat",["major-item-image\\n               ",["unknown",["rewardType"]],"\\n               ",["unknown",["reward","rewardKey"]]]]],["dynamic-attr","src",["helper",["item-image-path"],[["get",["imagePath"]],["get",["reward","rewardKey"]],"major"],null],null],["flush-element"],["close-element"],["text","\\n"],["block",["if"],[["get",["hasChampionChoiceRoleIcon"]]],null,4],["text","  "],["close-element"],["text","\\n\\n"],["block",["if"],[["get",["reward","minorRewards"]]],null,3],["text","  "],["open-element","div",[]],["dynamic-attr","class",["concat",["over-reward-calendar-item-bg-color\\n              ",["unknown",["rewardType"]],"\\n              ",["unknown",["reward","state"]],"\\n              ",["unknown",["lastItemClass"]],"\\n              ",["unknown",["selectedItemClass"]]]]],["flush-element"],["close-element"],["text","\\n  "],["open-element","div",[]],["dynamic-attr","class",["concat",["bg-circle-in-frame ",["unknown",["rewardType"]]]]],["flush-element"],["close-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","rewards-calendar-bg-frame-container"],["flush-element"],["text","\\n    "],["open-element","div",[]],["dynamic-attr","class",["concat",["rewards-calendar-bg-frame\\n                ",["unknown",["reward","state"]],"\\n                ",["unknown",["lastItemClass"]],"\\n                ",["unknown",["selectedItemClass"]]]]],["flush-element"],["close-element"],["text","\\n  "],["close-element"],["text","\\n\\n  "],["open-element","div",[]],["dynamic-attr","class",["concat",["claimed-border-selected\\n              ",["unknown",["reward","state"]],"\\n              ",["unknown",["selectedItemClass"]]]]],["flush-element"],["close-element"],["text","\\n\\n  "],["open-element","div",[]],["dynamic-attr","class",["concat",["calendar-progress-number ",["unknown",["reward","state"]]," ",["unknown",["selectedItemClass"]]]]],["flush-element"],["text","\\n    "],["append",["unknown",["progressRewardNumber"]],false],["text","\\n  "],["close-element"],["text","\\n"],["close-element"],["text","\\n"]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","            "],["open-element","img",[]],["dynamic-attr","class",["concat",["minor-item-image ",["unknown",["minorReward","renderer"]]]]],["dynamic-attr","src",["helper",["item-image-path"],[["get",["imagePath"]],["get",["minorReward","renderer"]],"minor"],null],null],["flush-element"],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["block",["unless"],[["get",["minorReward","data","hideInCalendarDetail"]]],null,0]],"locals":["minorReward"]},{"statements":[["text","      "],["open-element","div",[]],["dynamic-attr","class",["concat",["minor-item-image-container ",["unknown",["lastItemClass"]]]]],["flush-element"],["text","\\n        "],["open-element","span",[]],["static-attr","class","minor-plus-sign"],["flush-element"],["text","+"],["close-element"],["text","\\n"],["block",["each"],[["get",["reward","minorRewards"]]],null,1],["text","      "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["block",["unless"],[["get",["hideMinorRewards"]]],null,2]],"locals":[]},{"statements":[["text","      "],["open-element","div",[]],["static-attr","class","champion-icon-container"],["flush-element"],["text","\\n        "],["open-element","img",[]],["static-attr","class","champion-icon"],["dynamic-attr","src",["helper",["item-image-path"],[["get",["imagePath"]],["get",["reward","rewardKey"]],"major-icon"],null],null],["flush-element"],["close-element"],["text","\\n      "],["close-element"],["text","\\n"]],"locals":[]}],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, n) => {
        "use strict";
        var s = n(1);
        n(77),
          (e.exports = s.Ember.Component.extend({
            classNames: ["lol-npe-rewards-calendar-item-detail-component"],
            classNameBindings: ["rewardType"],
            layout: n(78),
            imagePath: "/fe/lol-static-assets/images",
            champions: null,
            spellsIconsImages: null,
            init() {
              this._super(...arguments),
                this.set("champions", s.Ember.A()),
                this.set("spellsIconsImages", s.Ember.A());
            },
            didReceiveAttrs() {
              this._super(...arguments);
              const e = this.get("selectedReward.majorReward.renderer");
              "champion_choice" === e
                ? this.setAllChampions()
                : "spells" === e && this.setAllSpellsIcons();
            },
            setAllSpellsIcons: function () {
              return (
                this.set("spellsIconsImages", s.Ember.A()),
                (0, s.dataBinding)("lol-game-data")
                  .get("/assets/v1/summoner-spells.json")
                  .then((e) => {
                    this.isDestroyed ||
                      this.isDestroying ||
                      this.setSpellIconImg(e);
                  })
              );
            },
            setSpellIconImg: function (e) {
              const t = s.Ember.A();
              this.get("selectedReward.majorReward.data.ids").forEach((n) => {
                const s = e.find((e) => e.id === n);
                t.push(s.iconPath);
              }),
                this.set("spellsIconsImages", t);
            },
            setAllChampions: function () {
              this.set("champions", s.Ember.A());
              const e = this.get(
                "selectedReward.majorReward.data.champIds",
              ).map((e) => this.getChampion(e));
              return Promise.all(e).then((e) => {
                const t = s.Ember.A(e);
                this.isDestroyed ||
                  this.isDestroying ||
                  this.set("champions", t);
              });
            },
            getChampion: function (e) {
              return (0, s.dataBinding)("lol-game-data").get(
                "/assets/v1/champions/" + e + ".json",
              );
            },
            isChampionChoice: s.Ember.computed.equal(
              "selectedReward.majorReward.renderer",
              "champion_choice",
            ),
            isSpellChoice: s.Ember.computed.equal(
              "selectedReward.majorReward.renderer",
              "spells",
            ),
            progressNumberText: s.Ember.computed(
              "rewardType",
              "selectedRewardIndex",
              function () {
                const e = this.get("rewardType"),
                  t = this.get("selectedRewardIndex");
                return this.get("tra").formatString(
                  `calendar_detail_${e}_title`,
                  { progressNumber: t + 1 },
                );
              },
            ),
          }));
      },
      (e, t, n) => {
        "use strict";
        n.r(t);
      },
      (e, t, n) => {
        const s = n(1).Ember;
        e.exports = s.HTMLBars.template({
          id: "ONhMSW86",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\Releases_14_13\\\\LeagueClientContent_Release\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-npe-rewards\\\\src\\\\app\\\\templates\\\\components\\\\calendar-item-detail.hbs\\" style-path=\\"null\\" js-path=\\"T:\\\\cid\\\\p4\\\\Releases_14_13\\\\LeagueClientContent_Release\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-npe-rewards\\\\src\\\\app\\\\components\\\\calendar-item-detail.js\\" "],["text","\\n"],["open-element","div",[]],["static-attr","class","item-detail-progression-header"],["flush-element"],["append",["unknown",["progressNumberText"]],false],["close-element"],["text","\\n"],["open-element","div",[]],["static-attr","class","reward-detail-content"],["flush-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","minor-rewards-list"],["flush-element"],["text","\\n"],["block",["if"],[["get",["selectedReward","minorRewards"]]],null,10],["text","  "],["close-element"],["text","\\n"],["block",["if"],[["get",["isChampionChoice"]]],null,7,5],["text","  "],["open-element","div",[]],["static-attr","class","item-detail-description-container"],["flush-element"],["text","\\n    "],["open-element","div",[]],["dynamic-attr","class",["concat",["item-detail-major-reward-title ",["unknown",["selectedReward","rewardKey"]]]]],["flush-element"],["text","\\n      "],["append",["helper",["reward-string-translation"],[["get",["selectedReward","rewardKey"]],["get",["tra"]],"title","major",["get",["selectedReward","majorReward","data"]]],null],false],["text","\\n    "],["close-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","item-detail-description"],["flush-element"],["text","\\n      "],["append",["helper",["reward-string-translation"],[["get",["selectedReward","rewardKey"]],["get",["tra"]],"description","major"],null],false],["text","\\n    "],["close-element"],["text","\\n  "],["close-element"],["text","\\n"],["close-element"],["text","\\n"]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","        "],["open-element","img",[]],["dynamic-attr","class",["concat",["reward-detail-generic-image ",["unknown",["selectedReward","rewardKey"]]]]],["dynamic-attr","src",["helper",["item-image-path"],[["get",["imagePath"]],["get",["selectedReward","rewardKey"]],"major"],null],null],["flush-element"],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","        "],["open-element","img",[]],["dynamic-attr","class",["concat",["reward-detail-generic-image ",["unknown",["selectedReward","rewardKey"]]]]],["dynamic-attr","src",["helper",["item-image-path"],[["get",["imagePath"]],["get",["selectedReward","rewardKey"]],"detail"],null],null],["flush-element"],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","    "],["open-element","div",[]],["static-attr","class","major-reward-visuals reward-detail-generic-image-wrapper"],["flush-element"],["text","\\n"],["block",["if"],[["get",["selectedReward","majorReward","data","hasCustomDetailImage"]]],null,1,0],["text","    "],["close-element"],["text","\\n  "]],"locals":[]},{"statements":[["text","        "],["open-element","img",[]],["static-attr","class","spell-icon"],["dynamic-attr","src",["concat",[["get",["spellIconImg"]]]]],["flush-element"],["close-element"],["text","\\n"]],"locals":["spellIconImg"]},{"statements":[["text","    "],["open-element","div",[]],["static-attr","class","major-reward-visuals reward-detail-spells-icons-list"],["flush-element"],["text","\\n"],["block",["each"],[["get",["spellsIconsImages"]]],null,3],["text","    "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["block",["if"],[["get",["isSpellChoice"]]],null,4,2]],"locals":[]},{"statements":[["text","        "],["open-element","div",[]],["static-attr","class","champ-icon-wrapper"],["flush-element"],["text","\\n          "],["open-element","img",[]],["dynamic-attr","class",["concat",["champ-icon ",["unknown",["selectedReward","rewardKey"]]]]],["dynamic-attr","src",["concat",[["unknown",["champion","squarePortraitPath"]]]]],["flush-element"],["close-element"],["text","\\n          "],["open-element","div",[]],["static-attr","class","champ-name-text"],["flush-element"],["append",["unknown",["champion","name"]],false],["close-element"],["text","\\n        "],["close-element"],["text","\\n"]],"locals":["champion"]},{"statements":[["text","    "],["open-element","div",[]],["static-attr","class","major-reward-visuals reward-detail-champ-choice-list"],["flush-element"],["text","\\n"],["block",["each"],[["get",["champions"]]],null,6],["text","    "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","          "],["open-element","div",[]],["static-attr","class","item-detail-minor"],["flush-element"],["text","\\n            "],["open-element","img",[]],["dynamic-attr","class",["concat",["minor-detail-image ",["unknown",["minorReward","renderer"]]]]],["dynamic-attr","src",["concat",[["helper",["item-image-path"],[["get",["imagePath"]],["get",["minorReward","renderer"]],"minor"],null]]]],["flush-element"],["close-element"],["text","\\n            "],["open-element","div",[]],["static-attr","class","item-detail-minor-reward-title"],["flush-element"],["text","\\n              "],["append",["helper",["reward-string-translation"],[["get",["minorReward","renderer"]],["get",["tra"]],"title","minor",["get",["minorReward","data"]]],null],false],["close-element"],["text","\\n          "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["block",["unless"],[["get",["minorReward","data","hideInCalendarDetail"]]],null,8]],"locals":["minorReward"]},{"statements":[["block",["each"],[["get",["selectedReward","minorRewards"]]],null,9]],"locals":[]}],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, n) => {
        "use strict";
        var s = n(1);
        e.exports = s.Ember.Helper.extend({
          compute: function (e) {
            const [t, n, s, a, l] = e;
            let r = `reward_pack_${a}_${s}_${t.replace(/-/g, "_")}`;
            if (!l) return n.get(r);
            if ("minor" === a) {
              if ((l.type && (r += "_" + l.type), l.gameModes))
                return l.gameModes.map((e) => n.get(r + "_" + e)).join(", ");
              if (l.ids) return l.ids.map((e) => n.get(r + "_" + e)).join(", ");
            }
            return l.quantity
              ? n.formatString(r, { quantity: l.quantity })
              : n.get(r);
          },
        });
      },
      (e, t, n) => {
        "use strict";
        var s = n(1);
        e.exports = s.Ember.Helper.extend({
          compute: function (e) {
            const t = e[0],
              n = e[1].replace(/_/g, "-"),
              s = e[2];
            if ("minor" === s) {
              return [
                "hextech-chest",
                "blue-essence",
                "hextech-key",
                "hextech-key-fragment",
                "orange-essence",
                "xp-boost",
              ].includes(n)
                ? `${t}/npe-rewards-${n}.png`
                : `${t}/npe-rewards-unlock.png`;
            }
            return `${t}/npe-rewards-reward-${s}-${n}.png`;
          },
        });
      },
    ],
    t = {};
  function n(s) {
    var a = t[s];
    if (void 0 !== a) return a.exports;
    var l = (t[s] = { exports: {} });
    return e[s](l, l.exports, n), l.exports;
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
      const s = "rcp-fe-lol-npe-rewards",
        a = document.currentScript.ownerDocument;
      const l = window.getPluginAnnounceEventName(s);
      a.addEventListener(
        l,
        function (e) {
          (0, e.registrationHandler)((e) =>
            t.default
              .init(e, {
                ComponentFactory: (e) =>
                  e.get("rcp-fe-common-libs").getComponentFactory("1"),
                dataBinding: (e) =>
                  e
                    .get("rcp-fe-common-libs")
                    .getDataBinding("rcp-fe-lol-npe-rewards"),
                Ember: (e) => e.get("rcp-fe-ember-libs").getEmber(),
                emberDataBinding: (e) =>
                  e
                    .get("rcp-fe-ember-libs")
                    .getEmberDataBinding("rcp-fe-lol-npe-rewards"),
                fullPageModalManager: (e) =>
                  e.get("rcp-fe-lol-navigation").getFullPageModalManager(),
                l10n: (e) => e.get("rcp-fe-lol-l10n"),
                logger: (e) => e.get("rcp-fe-common-libs").logging.create(s),
                Navigation: (e) => e.get("rcp-fe-lol-navigation"),
                Router: (e) =>
                  e.get("rcp-fe-lol-shared-components").getApi_Router(),
                socket: (e) => e.getSocket(),
                Telemetry: (e) => e.get("rcp-fe-common-libs").getTelemetry("1"),
                UIKit: (e) => e.get("rcp-fe-lol-uikit"),
              })
              .then(() =>
                t.default.add({
                  emberApplicationFactory: e
                    .get("rcp-fe-ember-libs")
                    .getEmberApplicationFactory(),
                }),
              )
              .then(() => {
                const e = new (0, n(2).default)();
                return {
                  getRootElement: (t) => e.getRootElement(t),
                  detach: () => e.detach(),
                };
              }),
          );
        },
        { once: !0 },
      );
    })();
})();
