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
                const i = e[a],
                  o = n._getValue(a, i);
                o && o.then
                  ? (o.then(function (e) {
                      e ||
                        console.warn(
                          "The promise for the key " +
                            a +
                            " resolved with a falsy value: ",
                          e,
                        ),
                        n._addValue(a, e);
                    }),
                    t.push(o))
                  : n._addValue(a, o);
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
      (e, t) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.VIEWPORT_SCREEN_ID = void 0);
        t.VIEWPORT_SCREEN_ID = "rcp-fe-lol-new-player-experience";
      },
      (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        const a = {
          MODULE_CLICKED: n(4),
          BUTTON_READY: n(5),
          START_CLICKED: n(6),
          START_HOVERED: n(7),
          CAPSULE_ANIMATION: n(8),
          MODULE_COMPLETE: n(9),
          MODULE_UNLOCK: n(10),
        };
        class i {
          constructor(e) {
            (this._audioPlugin = e), (this._sfxChannel = null);
          }
          createSound(e) {
            const t = this._sfxChannel.createSound(e);
            return (
              (t.delayedPlay = function (e) {
                setTimeout(t.play.bind(t), e);
              }),
              t
            );
          }
          init() {
            (this._sfxChannel = this._audioPlugin.getChannel("sfx-ui")),
              Object.keys(a).forEach(function (e) {
                this[e] = this.createSound(a[e]);
              }, this);
          }
          getSound(e) {
            return this[e];
          }
        }
        (t.default = i), (e.exports = i);
      },
      (e, t, n) => {
        "use strict";
        e.exports = n.p + "sfx-npe-button-module-click.ogg";
      },
      (e, t, n) => {
        "use strict";
        e.exports = n.p + "sfx-npe-button-ready.ogg";
      },
      (e, t, n) => {
        "use strict";
        e.exports = n.p + "sfx-npe-button-startnow-click.ogg";
      },
      (e, t, n) => {
        "use strict";
        e.exports = n.p + "sfx-npe-button-startnow-hover.ogg";
      },
      (e, t, n) => {
        "use strict";
        e.exports = n.p + "sfx-npe-capsule-anim.ogg";
      },
      (e, t, n) => {
        "use strict";
        e.exports = n.p + "sfx-npe-module-complete_051619.ogg";
      },
      (e, t, n) => {
        "use strict";
        e.exports = n.p + "sfx-npe-module-unlock_51620.ogg";
      },
      (e, t, n) => {
        "use strict";
        var a = n(1),
          i = r(n(12)),
          o = r(n(23)),
          l = n(24),
          s = r(n(29));
        function r(e) {
          return e && e.__esModule ? e : { default: e };
        }
        const c = "/lol-npe-tutorial-path/v1/tutorials/init",
          u = "/lol-lobby/v2/lobby",
          m = "/lol-npe-tutorial-path/v1/settings",
          p = "/lol-npe-tutorial-path/v1/tutorials",
          d = a.dataBinding.bindTo(a.socket);
        e.exports = class {
          constructor(e) {
            (this.screenRoot = e),
              (this.isShowing = !1),
              (this.application = null),
              (this.binding = d);
          }
          show() {
            d.get(m)
              .then((e) => {
                !e || e.hasSeenTutorialPath
                  ? (this._tutorialSeriesOptIn(),
                    this._addNewPlayerExperience())
                  : this._addFirstTimeNPE();
              })
              .catch((e) => {
                a.logger.warning(
                  "There was a problem fetching required settings, with error:",
                  e,
                );
              });
          }
          hide() {
            this.screenRoot &&
              this.isShowing &&
              (a.logger.trace("NPE: Releasing new player experience viewport."),
              this.screenRoot.release(),
              (this.isShowing = !1),
              this._deleteParty(),
              a.Navigation.show(),
              o.default.hideNewPlayerTutorial(),
              this.screenRoot
                .getElement()
                .removeChild(this.application.domNode),
              this.application.onRemove(),
              (this.application = null),
              this.binding.unobserve(p, this));
          }
          _addFirstTimeNPE() {
            this._tutorialSeriesOptIn()
              .then(
                () => (
                  this._addNewPlayerExperience(), this._playFirstTutorial()
                ),
              )
              .catch(() => {
                a.logger.warning("Could not launch tutorial game");
              });
          }
          _addNewPlayerExperience() {
            !this.isShowing &&
              this.screenRoot &&
              (a.logger.trace("NPE: Bumping new player experience viewport."),
              this.screenRoot.bump(),
              (this.isShowing = !0),
              (0, s.default)((e) => (e.hasSeenTutorialPath = !0)),
              a.Navigation.hide(),
              o.default.showNewPlayerTutorial(),
              a.Telemetry.invokeWithLowProbability(() => {
                a.Telemetry.recordNonTimingTracingEvent(
                  "npe-tutorial-seen",
                  1,
                  "click",
                );
              }),
              (this.application = this._createApp()),
              this.screenRoot
                .getElement()
                .appendChild(this.application.domNode));
          }
          _playFirstTutorial() {
            const e = this;
            return new Promise((t, n) => {
              this.binding.observe(p, e, (a) => {
                a &&
                  0 !== a.length &&
                  (this.binding.unobserve(p, e),
                  l.TutorialLauncher.playTutorial(a[0])
                    .then(() => {
                      o.default.sendTelemetryEvent("auto_launch_tutorial", {
                        queueId: a[0].queueId,
                      }),
                        t();
                    })
                    .catch(() => {
                      n();
                    }));
              });
            });
          }
          _deleteParty() {
            return d.delete(u);
          }
          _tutorialSeriesOptIn() {
            return d.patch(c);
          }
          _createApp() {
            const e = {
              closeNPE: () => {
                this.hide(), a.Home.showHome();
              },
            };
            return i.default.register(), i.default.create(e);
          }
        };
      },
      (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        var a,
          i = n(1),
          o = (a = n(13)) && a.__esModule ? a : { default: a };
        const l = "rcp-fe-lol-new-player-experience";
        var s = {
          register: () => {
            const e = (0, o.default)(i.Ember, i.tra),
              t = n(14),
              a = n(15),
              s = n(16),
              r = n(17),
              c = n(18),
              u = n(19),
              m = n(20),
              p = n(21),
              d = i.Navigation.getMissionsButton(),
              { ArrowFooterComponent: h, PlayerNameComponent: g } =
                i.SharedComponents.getSharedEmberComponents();
            i.EmberApplicationFactory.setFactoryDefinition({
              name: l,
              tra: e,
              ComponentFactory: i.ComponentFactory,
              NpeTutorialPathRootComponent: n(22),
              NpeTutorialPathFooterComponent: n(27),
              NpeTutorialPathCarouselComponent: n(31),
              NpeTutorialPathCarouselNavigationComponent: n(34),
              NpeTutorialPathItemCardComponent: n(37),
              NpeTutorialPathItemRewardComponent: n(40),
              NpeTutorialPathHeaderComponent: n(43),
              NpeTutorialPathFooterMissionsTrackerComponent: n(47),
              MissionsButtonComponent: d.MissionsButtonComponent,
              GameflowService: t,
              NpeService: a,
              GameDataService: s,
              SummonerService: r,
              PartiesService: c,
              EndOfGameService: u,
              PatcherService: m,
              UxSettingsService: p,
              MissionsService: d.MissionsService,
              ArrowFooterComponent: h,
              PlayerNameComponent: g,
            }),
              i.EmberApplicationFactory.setFactoryDefinition({
                name: "rcp-fe-lol-new-player-experience-reward-celebration",
                tra: e,
                ComponentFactory: i.ComponentFactory,
                NpeRewardCelebrationComponent: n(50),
                GameflowService: t,
                NpeService: a,
                GameDataService: s,
                SummonerService: r,
                PartiesService: c,
                EndOfGameService: u,
                PatcherService: m,
              });
          },
          create: (e) => i.ComponentFactory.create(l, e),
        };
        t.default = s;
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
          const { regions: a, region: i, locale: o } = e.metadata();
          if ((n = n.get("metadata." + t)) && "region" === t && n.id !== i.id) {
            const t = a[n.id],
              i = t.defaultLocale
                ? t.defaultLocale.id
                : t.availableLocales[0].id;
            e.setLocale(i, n.id);
          } else n && "locale" === t && n.id !== o.id && e.setLocale(n.id);
        }
        e.exports = function (e, a, i) {
          let o;
          const l = { metadata: !0, moment: !0 };
          return (
            (a = a.observe(() => {
              if (o) {
                const e = t(a.metadata());
                o.set("metadata", e),
                  o.beginPropertyChanges(),
                  Object.keys(l).forEach((e) => {
                    o.propertyWillChange(e), o.propertyDidChange(e);
                  }),
                  o.endPropertyChanges();
              }
            })),
            (o = e.Service.extend({
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
                return (l[e] = !0), this._tra.get(e);
              },
              willDestroy: () => this._tra.unregister(),
              addOverlays: function (e) {
                let t = this._tra;
                for (const n of e) t = t.overlay(n);
                t && this.wrapTra(t);
              },
            }).create()),
            o.set("service", o),
            o.addObserver("metadata.region", n.bind(null, a, "region")),
            o.addObserver("metadata.locale", n.bind(null, a, "locale")),
            i &&
              (console.warning(
                "deprecated: pass a traService as a property of your Ember application definition",
              ),
              i.register("tra:main", o, { instantiate: !1 }),
              i.inject("component", "tra", "tra:main"),
              i.inject("controller", "tra", "tra:main"),
              i.inject("view", "tra", "tra:main"),
              i.inject("model", "tra", "tra:main"),
              i.inject("route", "tra", "tra:main"),
              i.inject("service", "tra", "tra:main")),
            o
          );
        };
      },
      (e, t, n) => {
        "use strict";
        var a = n(1);
        const i = (0, a.emberDataBinding)({
          Ember: a.Ember,
          websocket: (0, a.getProvider)().getSocket(),
          logPrefix: "npe:service:gameflow",
          basePaths: { gameflow: "/lol-gameflow" },
          boundProperties: {
            session: { api: "gameflow", path: "/v1/session" },
          },
        });
        e.exports = a.Ember.Service.extend(i, {
          startBasicTutorial: function () {
            return this.get("api.gameflow").post("v1/basic-tutorial/start");
          },
          startBattleTraining: function () {
            return this.get("api.gameflow").post("v1/battle-training/start");
          },
          reconnect: function () {
            return this.get("api.gameflow").post("v1/reconnect");
          },
          isInTutorialFlow: !1,
          isInBasicTutorial: a.Ember.computed(
            "session",
            "session.gameData.queue.gameMode",
            "isInGame",
            "isReconnecting",
            function () {
              const e = this.get("session.gameData.queue"),
                t = this.get("isInGame"),
                n = this.get("isReconnecting");
              return (
                !(!e || (!n && !t)) &&
                ("TUTORIAL" === e.gameMode ||
                  e.gameMode.includes("TUTORIAL_MODULE"))
              );
            },
          ),
          isWaitingForStats: a.Ember.computed.equal(
            "session.phase",
            "WaitingForStats",
          ),
          isEndOfGame: a.Ember.computed.equal("session.phase", "EndOfGame"),
          isNotInGameFlow: a.Ember.computed(
            "session",
            "session.phase",
            function () {
              const e = this.get("session.phase");
              return "None" === e || "Lobby" === e || !e;
            },
          ),
          isReconnecting: a.Ember.computed(
            "session",
            "session.phase",
            function () {
              const e = this.get("session.phase");
              return !!e && "Reconnect" === e;
            },
          ),
          isUnableToReconnect: a.Ember.computed(
            "session",
            "session.gameData.queue.gameMode",
            "isReconnecting",
            function () {
              const e = this.get("session.gameData.queue"),
                t = this.get("isReconnecting");
              return (
                !(!e || !t) &&
                ("TUTORIAL" === e.gameMode ||
                  e.gameMode.includes("TUTORIAL_MODULE"))
              );
            },
          ),
          isInEog: a.Ember.computed("session", "session.phase", function () {
            const e = this.get("session.phase");
            return (
              !!e &&
              ("EndOfGame" === e ||
                "PreEndOfGame" === e ||
                "WaitingForStats" === e)
            );
          }),
          isInGame: a.Ember.computed("session", "session.phase", function () {
            const e = this.get("session.phase");
            return (
              !!e &&
              ("GameStart" === e ||
                "FailedToLaunch" === e ||
                "InProgress" === e)
            );
          }),
          isInQueue: a.Ember.computed("session", "session.phase", function () {
            const e = this.get("session.phase");
            return !!e && ("Matchmaking" === e || "ReadyCheck" === e);
          }),
        });
      },
      (e, t, n) => {
        "use strict";
        var a = n(1);
        const i = (0, a.emberDataBinding)({
          Ember: a.Ember,
          websocket: (0, a.getProvider)().getSocket(),
          logPrefix: "npe:service:npe",
          basePaths: {
            npe: "/lol-npe-tutorial-path",
            platformConfig: "/lol-platform-config",
          },
          boundProperties: {
            settings: { api: "npe", path: "/v1/settings", default: {} },
            tutorialConfig: {
              api: "platformConfig",
              path: "/v1/namespaces/LcuTutorial",
            },
            championChoice: { api: "npe", path: "/v1/rewards/champ" },
            missionsConfig: {
              api: "platformConfig",
              path: "/v1/namespaces/Missions",
            },
            entitlements: { path: "/entitlements/v1/token", default: {} },
            levelMaximum: {
              api: "platformConfig",
              path: "/v1/namespaces/LcuTutorial/SkipTutorialPathAfterLevel",
              default: 10,
            },
            defaultIcon: {
              api: "platformConfig",
              path: "/v1/namespaces/LcuTutorial/TutorialSummonerIcon",
              default: 4,
            },
          },
        });
        e.exports = a.Ember.Service.extend(i, {
          tutorials: null,
          init() {
            this._super(...arguments),
              (this.binding = a.dataBinding.bindTo(a.socket)),
              this.initObservers();
          },
          willDestroy() {
            this._super(...arguments),
              this.binding.unobserve(
                "/lol-npe-tutorial-path/v1/tutorials",
                this,
              );
          },
          initObservers() {
            this.binding.observe(
              "/lol-npe-tutorial-path/v1/tutorials",
              this,
              (e) => {
                if (
                  e &&
                  !this.isDestroying &&
                  !this.isDestroyed &&
                  !this.isTutorialsEqual(e)
                ) {
                  for (let t = 0; t < e.length; ++t)
                    (e[t].isCard = "CARD" === e[t].type),
                      (e[t] = a.Ember.Object.create(e[t]));
                  this.set("tutorials", a.Ember.A(e));
                }
              },
            );
          },
          waitingForStatsTimeout: a.Ember.computed(
            "tutorialConfig.StatsTimeout",
            function () {
              const e = this.get("tutorialConfig.StatsTimeout");
              return e || 2e4;
            },
          ),
          markAsRead: function (e) {
            this.get("api.npe").put("v1/tutorials/" + e + "/view");
          },
          isTutorialsEqual(e) {
            const t = this.get("tutorials");
            if (!t || e.length !== t.length) return !1;
            for (let n = 0; n < e.length; ++n)
              if (
                e[n].status !== t[n].status ||
                e[n].isViewed !== t[n].isViewed
              )
                return !1;
            return !0;
          },
        });
      },
      (e, t, n) => {
        "use strict";
        var a = n(1);
        const i = "/lol-game-data/assets/v1/summoner-icons.json",
          o = a.dataBinding.bindTo(a.socket);
        e.exports = a.Ember.Service.extend({
          profileIcons: null,
          init() {
            this._super(...arguments), this._initDataBindings();
          },
          willDestroy() {
            this._super(...arguments), o.unobserve(i);
          },
          _initDataBindings() {
            o.observe(i, (e) => {
              e && this.set("profileIcons", a.Ember.A(e));
            });
          },
          summonerIconUrl: function (e, t) {
            let n = null;
            if (Number.isInteger(e) && t) {
              const a = t.findBy("id", e);
              a && a.imagePath && (n = a.imagePath);
            }
            return n;
          },
        });
      },
      (e, t, n) => {
        "use strict";
        var a = n(1);
        const i = (0, a.emberDataBinding)({
          Ember: a.Ember,
          websocket: (0, a.getProvider)().getSocket(),
          logPrefix: "npe:service:summoner",
          basePaths: { summoner: "/lol-summoner" },
          boundProperties: {
            localSummonerData: {
              api: "summoner",
              path: "/v1/current-summoner",
              default: { displayName: "", summonerLevel: 1, profileIconId: 29 },
            },
          },
        });
        e.exports = a.Ember.Service.extend(i, {});
      },
      (e, t, n) => {
        "use strict";
        var a = n(1);
        const i = (0, a.emberDataBinding)({
          Ember: a.Ember,
          websocket: (0, a.getProvider)().getSocket(),
          logPrefix: "npe:service:parties",
          basePaths: { lobby: "/lol-lobby", matchmaking: "/lol-matchmaking" },
          boundProperties: {
            searchState: { api: "matchmaking", path: "/v1/search" },
          },
        });
        e.exports = a.Ember.Service.extend(i, {
          leaveParty: function () {
            return this.get("api.lobby").delete("v2/lobby");
          },
          createParty: function (e) {
            const t = { queueId: e };
            return this.get("api.lobby").post("v2/lobby", t);
          },
          findMatch: function () {
            return this.get("api.lobby").post("v2/lobby/matchmaking/search");
          },
          quickSearch: function (e, t) {
            const n = { queueId: e };
            return (
              t && (n.gameCustomization = { championId: t.id.toString() }),
              this.get("api.lobby").post("v2/matchmaking/quick-search", n)
            );
          },
          cancelMatchmaking: function () {
            return this.get("api.lobby").delete("v2/lobby/matchmaking/search");
          },
          cancelPlayAgain: function () {
            return this.get("api.lobby").post("v2/lobby/play-again-decline");
          },
        });
      },
      (e, t, n) => {
        "use strict";
        var a = n(1);
        const i = (0, a.emberDataBinding)({
          Ember: a.Ember,
          websocket: (0, a.getProvider)().getSocket(),
          logPrefix: "npe:service:end-of-game",
          basePaths: { endOfGame: "/lol-end-of-game" },
        });
        e.exports = a.Ember.Service.extend(i, {
          dismissStats: function () {
            return this.get("api.endOfGame").post("v1/state/dismiss-stats");
          },
        });
      },
      (e, t, n) => {
        "use strict";
        var a = n(1);
        const i = (0, a.emberDataBinding)({
          Ember: a.Ember,
          websocket: (0, a.getProvider)().getSocket(),
          logPrefix: "npe:service:patcher",
          basePaths: { patcher: "/patcher" },
          boundProperties: {
            productStates: {
              api: "patcher",
              path: "/v1/products/league_of_legends/state",
            },
          },
        });
        e.exports = a.Ember.Service.extend(i, {
          isPlayable: a.Ember.computed(
            "productStates.components.@each.isUpToDate",
            function () {
              return (
                (this.get("productStates") &&
                  a.Ember.A(this.get("productStates.components"))
                    .mapBy("isUpToDate")
                    .every(function (e) {
                      return e;
                    })) ||
                !this.get("productStates")
              );
            },
          ),
        });
      },
      (e, t, n) => {
        "use strict";
        var a = n(1);
        const i = [
          "/fe/lol-new-player-experience/vfx-capsule-loop.webm",
          "/fe/lol-new-player-experience/vfx-capsule-open.webm",
          "/fe/lol-new-player-experience/vfx-essence-big-blue-loop.webm",
          "/fe/lol-new-player-experience/vfx-league-logo-loop-idle.webm",
          "/fe/lol-new-player-experience/vfx-tutorial-complete.webm",
          "/fe/lol-new-player-experience/vfx-tutorial-unlock.webm",
          "/fe/lol-new-player-experience/vfx-vertical-magic-loop.webm",
        ];
        let o = null;
        e.exports = a.Ember.Service.extend({
          largeAreaAnimationsEnabled: !1,
          init() {
            this._super(...arguments),
              (this._onSettingsChange = this._onSettingsChange.bind(this)),
              this._createVideoCache(),
              this._addUXObserver();
          },
          willDestroy() {
            this._super(...arguments),
              this._removeUXObserver(),
              this._destroyVideoCache();
          },
          _createVideoCache() {
            o = a.VideoCache.createCache("rcp-fe-lol-npe-tutorial-path");
          },
          _destroyVideoCache() {
            this.get("largeAreaAnimationsEnabled") && o.release();
          },
          _addUXObserver() {
            a.UXSettings.addObserver(this._onSettingsChange);
          },
          _removeUXObserver() {
            a.UXSettings.removeObserver(this._onSettingsChange);
          },
          _onSettingsChange(e) {
            const { largeAreaAnimationsEnabled: t } = e;
            o.release(),
              this.set("largeAreaAnimationsEnabled", t),
              e &&
                t &&
                i.forEach((e) => {
                  o.cache(e);
                });
          },
        });
      },
      (e, t, n) => {
        "use strict";
        var a,
          i = n(1),
          o = (a = n(23)) && a.__esModule ? a : { default: a },
          l = n(24);
        n(25),
          (e.exports = i.Ember.Component.extend({
            classNames: ["npe-root-component"],
            layout: n(26),
            gameflowService: i.Ember.inject.service("gameflow"),
            npeService: i.Ember.inject.service("npe"),
            tutorials: i.Ember.computed.alias("npeService.tutorials"),
            partiesService: i.Ember.inject.service("parties"),
            endOfGameService: i.Ember.inject.service("end-of-game"),
            uxSettingsService: i.Ember.inject.service("ux-settings"),
            largeAreaAnimationsEnabled: i.Ember.computed.alias(
              "uxSettingsService.largeAreaAnimationsEnabled",
            ),
            session: i.Ember.computed.alias("gameflowService.session"),
            isWaitingForStats: i.Ember.computed.alias(
              "gameflowService.isWaitingForStats",
            ),
            isEndOfGame: i.Ember.computed.alias("gameflowService.isEndOfGame"),
            waitingForStatsTimer: null,
            isTutorialDataReady: i.Ember.computed.gt("tutorials.length", 0),
            _selectedTutorialId: 0,
            selectedTutorial: i.Ember.computed(
              "tutorials.[]",
              "_selectedTutorialId",
              function () {
                const e = this.get("tutorials");
                return e && 0 !== e.length
                  ? this.get("tutorials")[this.get("_selectedTutorialId")]
                  : null;
              },
            ),
            endOfGameTutorialObserver: i.Ember.observer(
              "session",
              "session.phase",
              function () {
                const e = this.get("isWaitingForStats"),
                  t = this.get("isEndOfGame");
                if (e && !this.waitingForStatsTimer) {
                  const e = this.get("npeService.waitingForStatsTimeout");
                  this.waitingForStatsTimer = i.Ember.run.later(() => {
                    (this.waitingForStatsTimer = null),
                      this.finalizeTutorialGame();
                  }, e);
                } else
                  !e &&
                    this.waitingForStatsTimer &&
                    (i.Ember.run.cancel(this.waitingForStatsTimer),
                    (this.waitingForStatsTimer = null));
                t && this.finalizeTutorialGame();
              },
            ),
            finalizeTutorialGame() {
              this.get("endOfGameService").dismissStats(),
                this.get("partiesService").leaveParty();
            },
            actions: {
              playTutorial: function () {
                const e = this.get("selectedTutorial");
                l.TutorialLauncher.playTutorial(e),
                  o.default.logButtonClick("launch_tutorial", e.queueId);
              },
              selectTutorial: function (e) {
                this.set("_selectedTutorialId", e);
              },
              exitTutorials() {
                this.get("closeNPE")();
              },
            },
          }));
      },
      (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        var a = (function (e, t) {
          if (!t && e && e.__esModule) return e;
          if (null === e || ("object" != typeof e && "function" != typeof e))
            return { default: e };
          var n = i(t);
          if (n && n.has(e)) return n.get(e);
          var a = {},
            o = Object.defineProperty && Object.getOwnPropertyDescriptor;
          for (var l in e)
            if ("default" !== l && Object.prototype.hasOwnProperty.call(e, l)) {
              var s = o ? Object.getOwnPropertyDescriptor(e, l) : null;
              s && (s.get || s.set)
                ? Object.defineProperty(a, l, s)
                : (a[l] = e[l]);
            }
          (a.default = e), n && n.set(e, a);
          return a;
        })(n(1));
        function i(e) {
          if ("function" != typeof WeakMap) return null;
          var t = new WeakMap(),
            n = new WeakMap();
          return (i = function (e) {
            return e ? n : t;
          })(e);
        }
        var o = new (class {
          constructor() {
            const e = a.default.getProvider().getSocket();
            (this._telemetryBinding = (0, a.dataBinding)("/telemetry", e)),
              (this._pluginName = "rcp-fe-lol-new-player-experience"),
              (this._eventName = "new_player_experience");
          }
          sendTelemetryEvent(e, t) {
            t = t || {};
            const n = { eventName: e, plugin: this._pluginName };
            Object.assign(t, n), this._logDradisEvent(this._eventName, t);
          }
          _sendDetailedEvent(e, t, n, a, i) {
            ((i = i || {}).eventContext = e),
              (i.eventType = t),
              (i.eventAction = n),
              this._logDradisEvent(a, i);
          }
          _logDradisEvent(e, t) {
            this._telemetryBinding.post(`/v1/events/${e}`, t);
          }
          logError(e, t, n) {
            const a = { action: e, errorDescription: t, errorData: n };
            return this._sendDetailedEvent(
              "app",
              "general",
              "error",
              this._pluginName,
              a,
            );
          }
          showNewPlayerTutorial() {
            this._logDradisEvent(this._eventName, {
              eventName: "show_screen",
              plugin: this._pluginName,
              screenName: "npe_tutorial_modules",
            });
          }
          hideNewPlayerTutorial() {
            this._logDradisEvent(this._eventName, {
              eventName: "hide_screen",
              plugin: this._pluginName,
              screenName: "npe_tutorial_modules",
            });
          }
          logButtonClick(e, t, n) {
            n = n || {};
            const a = {
              eventName: "button_click",
              plugin: this._pluginName,
              buttonAction: e,
              buttonDestination: t,
            };
            Object.assign(n, a), this._logDradisEvent(this._eventName, n);
          }
        })();
        t.default = o;
      },
      (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.playTutorial = t.TutorialLauncher = void 0);
        var a = n(1);
        const i = function (e) {
          const t = (0, a.dataBinding)("/lol-lobby"),
            n = (0, a.dataBinding)("/lol-gameflow"),
            i = (0, a.dataBinding)("/lol-npe-tutorial-path");
          let o = null;
          const l = () => t.delete("v2/lobby");
          if ("basic_tutorial" === e.queueId)
            o = new Promise((e, t) => {
              const a = () => {
                n.post("v1/basic-tutorial/start")
                  .then(() => {
                    e();
                  })
                  .catch(() => {
                    t();
                  });
              };
              l()
                .then(() => {
                  a();
                })
                .catch(() => {
                  a();
                });
            });
          else if ("battle_training" === e.queueId)
            o = new Promise((e, t) => {
              const a = () => {
                n.post("v1/battle-training/start")
                  .then(() => {
                    e();
                  })
                  .catch(() => {
                    t();
                  });
              };
              l()
                .then(() => {
                  a();
                })
                .catch(() => {
                  a();
                });
            });
          else {
            const n = { queueId: parseInt(e.queueId) };
            e.useQuickSearchMatchmaking
              ? (e.useChosenChampion &&
                  i.get("v1/rewards/champ").then((e) => {
                    e &&
                      (n.gameCustomization = { championId: e.id.toString() });
                  }),
                (o = new Promise((e, a) => {
                  const i = () => {
                    t.post("v2/matchmaking/quick-search", n)
                      .then(() => {
                        e();
                      })
                      .catch((e) => {
                        a(e);
                      });
                  };
                  l()
                    .then(() => {
                      i();
                    })
                    .catch(() => {
                      i();
                    });
                })))
              : (o = new Promise((e, a) =>
                  t
                    .post("v2/lobby", n)
                    .then(() => {
                      o = t
                        .post("v2/lobby/matchmaking/search")
                        .then(() => {
                          e();
                        })
                        .catch((e) => {
                          a(e);
                        });
                    })
                    .catch((e) => {
                      a(e);
                    }),
                ));
          }
          return o;
        };
        t.playTutorial = i;
        const o = { playTutorial: i };
        t.TutorialLauncher = o;
      },
      (e, t, n) => {
        "use strict";
        n.r(t);
      },
      (e, t, n) => {
        const a = n(1).Ember;
        e.exports = a.HTMLBars.template({
          id: "gnAb+uPj",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\Releases_14_10\\\\LeagueClientContent_Release\\\\15682\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-new-player-experience\\\\src\\\\components\\\\root-component\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\Releases_14_10\\\\LeagueClientContent_Release\\\\15682\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-new-player-experience\\\\src\\\\components\\\\root-component\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\Releases_14_10\\\\LeagueClientContent_Release\\\\15682\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-new-player-experience\\\\src\\\\components\\\\root-component\\\\index.js\\" "],["text","\\n"],["open-element","div",[]],["static-attr","class","bg-spinner-wrapper"],["flush-element"],["text","\\n  "],["open-element","div",[]],["dynamic-attr","class",["concat",["npe-bg-ticks ",["helper",["if"],[["get",["largeAreaAnimationsEnabled"]],"animated"],null]]]],["flush-element"],["text","\\n    "],["open-element","svg",[]],["static-attr","xmlns","http://www.w3.org/2000/svg","http://www.w3.org/2000/xmlns/"],["flush-element"],["text","\\n      "],["open-element","circle",[]],["static-attr","class","radial-ticks"],["static-attr","cx","287"],["static-attr","cy","287"],["static-attr","r","287"],["flush-element"],["close-element"],["text","\\n    "],["close-element"],["text","\\n  "],["close-element"],["text","\\n"],["close-element"],["text","\\n\\n"],["append",["unknown",["npe-tutorial-path-header"]],false],["text","\\n"],["block",["if"],[["get",["isTutorialDataReady"]]],null,0],["text","\\n"],["append",["helper",["npe-tutorial-path-footer"],null,[["playTutorial","selectedTutorial","isTutorialDataReady","exit"],["playTutorial",["get",["selectedTutorial"]],["get",["isTutorialDataReady"]],["helper",["action"],[["get",[null]],"exitTutorials"],null]]]],false]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","  "],["append",["helper",["npe-tutorial-path-carousel"],null,[["class","tutorials","selectTutorial","exit"],["npe-tutorial-carousel",["get",["tutorials"]],"selectTutorial",["helper",["action"],[["get",[null]],"exitTutorials"],null]]]],false],["text","\\n"]],"locals":[]}],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, n) => {
        "use strict";
        var a = n(1),
          i = l(n(23));
        n(28);
        var o = l(n(29));
        function l(e) {
          return e && e.__esModule ? e : { default: e };
        }
        e.exports = a.Ember.Component.extend({
          classNames: ["npe-footer-component"],
          layout: n(30),
          tutorialService: a.Ember.inject.service("npe"),
          gameflowService: a.Ember.inject.service("gameflow"),
          partiesService: a.Ember.inject.service("parties"),
          npeService: a.Ember.inject.service("npe"),
          summonerService: a.Ember.inject.service("summoner"),
          patcherService: a.Ember.inject.service("patcher"),
          modalManager: a.UIKit.getModalManager(),
          settings: a.Ember.computed.alias("tutorialService.settings"),
          isInQueue: a.Ember.computed.alias("gameflowService.isInQueue"),
          isReconnecting: a.Ember.computed.alias(
            "gameflowService.isReconnecting",
          ),
          isInGame: a.Ember.computed.alias("gameflowService.isInGame"),
          isInLobby: a.Ember.computed.equal(
            "gameflowService.session.phase",
            "LOBBY",
          ),
          isNotInGameFlow: a.Ember.computed.alias(
            "gameflowService.isNotInGameFlow",
          ),
          isNotInQueue: a.Ember.computed.not("isInQueue"),
          isInEog: a.Ember.computed.alias("gameflowService.isInEog"),
          playButtonCloseHidden: a.Ember.computed.and("isNew", "isNotInQueue"),
          selectedTutorial: null,
          optimisticLock: !1,
          buttonSounds: {
            closeHover: "/fe/lol-parties/sfx-lobby-button-quit-hover.ogg",
            closeClick: "/fe/lol-parties/sfx-lobby-button-quit-click.ogg",
            playClick: "/fe/lol-parties/sfx-lobby-button-find-match-click.ogg",
            playHover: "/fe/lol-parties/sfx-lobby-button-find-match-hover.ogg",
          },
          selectedTutorialUnlocked: a.Ember.computed.equal(
            "selectedTutorial.status",
            "UNLOCKED",
          ),
          selectedTutorialCompleted: a.Ember.computed.equal(
            "selectedTutorial.status",
            "COMPLETED",
          ),
          selectedTutorialIsCard: a.Ember.computed.equal(
            "selectedTutorial.type",
            "CARD",
          ),
          selectedTutorialPlayable: a.Ember.computed.or(
            "selectedTutorialUnlocked",
            "selectedTutorialCompleted",
          ),
          playButtonDisabled: a.Ember.computed.not("playButtonEnabled"),
          exitButtonDisabled: null,
          playButtonCloseDisabled: null,
          isNew: a.Ember.computed(
            "settings.hasSkippedTutorialPath",
            "npeService.levelMaximum",
            "summonerService.localSummonerData.summonerLevel",
            function () {
              const e = this.get("settings.hasSkippedTutorialPath"),
                t = this.get("npeService.levelMaximum"),
                n = this.get("summonerService.localSummonerData.summonerLevel");
              return !e && n <= t;
            },
          ),
          playButtonEnabled: a.Ember.computed(
            "isTutorialDataReady",
            "isNotInGameFlow",
            "isReconnecting",
            "selectedTutorialIsCard",
            "selectedTutorialPlayable",
            "isInQueue",
            "gameflowService.isInBasicTutorial",
            "optimisticLock",
            "patcherService.isPlayable",
            function () {
              const e = this.get("isTutorialDataReady"),
                t = this.get("isNotInGameFlow"),
                n = this.get("selectedTutorialPlayable"),
                a = this.get("isReconnecting"),
                i = this.get("isInLobby"),
                o = this.get("isInQueue"),
                l = this.get("selectedTutorialIsCard"),
                s = this.get("gameflowService.isInBasicTutorial"),
                r = this.get("optimisticLock"),
                c = this.get("patcherService.isPlayable");
              return (
                t && c
                  ? this.set("exitButtonDisabled", null)
                  : this.set("exitButtonDisabled", "disabled"),
                o || i || (t && c)
                  ? this.set("playButtonCloseDisabled", null)
                  : this.set("playButtonCloseDisabled", "disabled"),
                e && n && (t || a) && l && !s && !r && c
              );
            },
          ),
          playButtonLocText: a.Ember.computed(
            "isReconnecting",
            "isInQueue",
            "isInGame",
            "isInEog",
            "patcherService.isPlayable",
            function () {
              const e = this.get("isReconnecting"),
                t = this.get("isInGame"),
                n = this.get("isInLobby"),
                a = this.get("isInQueue"),
                i = this.get("patcherService.isPlayable"),
                o = this.get("isInEog");
              let l = "tra.npe_tutorial_path_confirm_button_text";
              return (
                e
                  ? (l = "tra.npe_tutorial_path_button_text_RECONNECT")
                  : t
                    ? (l = "tra.npe_tutorial_path_button_text_IN_GAME")
                    : a
                      ? (l = "tra.npe_tutorial_path_button_text_IN_QUEUE")
                      : o
                        ? (l = "tra.npe_tutorial_path_button_text_CONCLUDING")
                        : n ||
                          i ||
                          (l = "tra.npe_tutorial_path_button_text_PATCHING"),
                this.get(l)
              );
            },
          ),
          closeButtonLocText: a.Ember.computed(
            "isInQueue",
            "tra.ready",
            function () {
              let e = "tra.npe_tutorial_path_leave";
              return (
                this.get("isInQueue") && (e = "tra.npe_tutorial_path_cancel"),
                this.get(e)
              );
            },
          ),
          exitTutorialScreen() {
            if (this.get("isNew")) {
              this.get("modalManager")
                .add({
                  type: "DialogConfirm",
                  data: {
                    contents: this.get("tra.npe_tutorial_path_leave_confirm"),
                    acceptText: this.get("tra.npe_tutorial_path_leave"),
                    declineText: this.get("tra.npe_tutorial_path_stay"),
                    closeButton: !1,
                  },
                })
                .acceptPromise.then(
                  () => {
                    (0, o.default)((e) => (e.hasSkippedTutorialPath = !0)),
                      i.default.logButtonClick(
                        "exit_npe_tutorials",
                        "client_home",
                      ),
                      this.sendAction("exit");
                  },
                  () => {},
                );
            } else
              i.default.logButtonClick("exit_npe_tutorials", "client_home"),
                this.sendAction("exit");
          },
          actions: {
            exitTutorial: function () {
              null === this.get("exitButtonDisabled") &&
                this.exitTutorialScreen();
            },
            arrowFooterCloseClicked: function () {
              const e = this.get("isInQueue"),
                t = this.get("partiesService");
              e
                ? t.cancelMatchmaking().then(() => {
                    t.leaveParty();
                  })
                : this.exitTutorialScreen();
            },
            startTutorial: function () {
              this.set("optimisticLock", !0),
                a.Ember.run.debounce(
                  this,
                  () => {
                    this.set("optimisticLock", !1);
                  },
                  8e3,
                );
              this.get("isReconnecting")
                ? this.get("gameflowService").reconnect()
                : this.sendAction("playTutorial");
            },
          },
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
        t.default = (e) => {
          const t = (0, a.dataBinding)("/lol-npe-tutorial-path", a.socket);
          t.get("/v1/settings").then((n) => {
            n && (e(n), t.put("/v1/settings", n));
          });
        };
      },
      (e, t, n) => {
        const a = n(1).Ember;
        e.exports = a.HTMLBars.template({
          id: "Jz9gdokh",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\Releases_14_10\\\\LeagueClientContent_Release\\\\15682\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-new-player-experience\\\\src\\\\components\\\\footer-component\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\Releases_14_10\\\\LeagueClientContent_Release\\\\15682\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-new-player-experience\\\\src\\\\components\\\\footer-component\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\Releases_14_10\\\\LeagueClientContent_Release\\\\15682\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-new-player-experience\\\\src\\\\components\\\\footer-component\\\\index.js\\" "],["text","\\n"],["append",["helper",["arrow-footer"],null,[["removeCloseButton","confirmButtonText","confirmButtonDisabled","confirmButtonClicked","closeButtonClicked","closeButtonDisabled","confirmButtonHoverSound","confirmButtonClickSound","closeButtonHoverSound","closeButtonClickSound","closeButtonTooltipText","closeButtonShowTooltip","closeButtonTooltipType"],[["get",["playButtonCloseHidden"]],["get",["playButtonLocText"]],["get",["playButtonDisabled"]],"startTutorial","arrowFooterCloseClicked",["get",["playButtonCloseDisabled"]],["get",["buttonSounds","playHover"]],["get",["buttonSounds","playClick"]],["get",["buttonSounds","closeHover"]],["get",["buttonSounds","closeClick"]],["get",["closeButtonLocText"]],"true","tooltip-system"]]],false],["text","\\n\\n"],["block",["if"],[["get",["isNew"]]],null,2,0]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["comment"," bottom-right-buttons "],["text","\\n"],["open-element","div",[]],["static-attr","class","bottom-right-buttons"],["flush-element"],["text","\\n  "],["open-element","lol-social-chat-toggle-button",[]],["static-attr","position","inside"],["flush-element"],["close-element"],["text","\\n  "],["append",["unknown",["npe-tutorial-path-footer-missions-tracker"]],false],["text","\\n"],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","    "],["open-element","lol-uikit-content-block",[]],["static-attr","type","tooltip-system"],["flush-element"],["text","\\n      "],["open-element","p",[]],["flush-element"],["append",["unknown",["tra","npe_tutorial_path_leave"]],false],["close-element"],["text","\\n    "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["open-element","lol-uikit-close-button",[]],["dynamic-attr","disabled",["unknown",["exitButtonDisabled"]],null],["static-attr","arrow-right","true"],["dynamic-attr","onclick",["helper",["action"],[["get",[null]],"exitTutorial"],null],null],["flush-element"],["text","\\n"],["block",["uikit-tooltip"],null,[["tooltipPosition","type"],["top","system"]],1],["close-element"],["text","\\n"]],"locals":[]}],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, n) => {
        "use strict";
        var a = n(1);
        n(32);
        var i,
          o = (i = n(29)) && i.__esModule ? i : { default: i };
        e.exports = a.Ember.Component.extend({
          classNames: ["npe-tutorial-carousel-component"],
          layout: n(33),
          npeService: a.Ember.inject.service("npe"),
          gameflowService: a.Ember.inject.service("gameflow"),
          partiesService: a.Ember.inject.service("parties"),
          isNotInGameFlow: a.Ember.computed.alias(
            "gameflowService.isNotInGameFlow",
          ),
          tutorials: a.Ember.computed.alias("npeService.tutorials"),
          isInQueue: a.Ember.computed.alias("gameflowService.isInQueue"),
          matchmakingState: a.Ember.computed.alias(
            "partiesService.searchState",
          ),
          selectedIndex: 0,
          hasRendered: !1,
          navigateRightDisabled: !0,
          navigateLeftDisabled: !0,
          isUnableToReconnect: a.Ember.computed.alias(
            "gameflowService.isUnableToReconnect",
          ),
          isUnableToLaunch: a.Ember.computed.or(
            "isUnableToReconnect",
            "isInQueue",
          ),
          uxSettingsService: a.Ember.inject.service("ux-settings"),
          largeAreaAnimationsEnabled: a.Ember.computed.alias(
            "uxSettingsService.largeAreaAnimationsEnabled",
          ),
          _timeRemainingToExitGame: 330,
          timerId: null,
          updatingSelection: !0,
          init() {
            this._super(...arguments), this.itemsChangedObserver();
          },
          willDestroyElement() {
            this._super(...arguments),
              a.Ember.run.cancel(this.advanceTutorialTimeout);
          },
          itemsChangedObserver: a.Ember.observer(
            "isNotInGameFlow",
            function () {
              this.get("isNotInGameFlow") &&
                (this.get("hasRendered")
                  ? (this.advanceTutorialTimeout = a.Ember.run.later(() => {
                      this.advanceTutorial();
                    }, 1e3))
                  : this.advanceTutorial());
            },
          ),
          timeInQueue: a.Ember.computed(
            "matchmakingState.timeInQueue",
            function () {
              const e = this.get("matchmakingState.timeInQueue");
              return this.getFormattedTime(e);
            },
          ),
          timeRemainingToExitGame: a.Ember.computed(
            "_timeRemainingToExitGame",
            function () {
              const e = this.get("_timeRemainingToExitGame");
              return this.getFormattedTime(e);
            },
          ),
          isUnableToReconnectObserver: a.Ember.observer(
            "isUnableToReconnect",
            function () {
              this.get("isUnableToReconnect") &&
                !this.timerId &&
                (this.set("_timeRemainingToExitGame", 330), this.runTimer());
            },
          ),
          runTimer() {
            this.timerId = a.Ember.run.later(
              this,
              function () {
                this.set(
                  "_timeRemainingToExitGame",
                  this._timeRemainingToExitGame - 0.5,
                ),
                  (this.timerId = null),
                  this._timeRemainingToExitGame > 0 && this.runTimer();
              },
              500,
            );
          },
          getFormattedTime(e) {
            if ("number" != typeof e) return "-:--";
            const t = Math.floor(e / 60);
            return (e = Math.floor(e % 60)) < 10 && (e = "0" + e), t + ":" + e;
          },
          selectInitialTutorial() {
            const e = this.get("tutorials");
            if (e && e.length > 0)
              for (let t = 0; t < e.length; t++)
                if ("UNLOCKED" === e[t].status)
                  return void this.set("selectedIndex", t);
          },
          triggerTutorialRewardCelebration(e) {
            const t = this.get("largeAreaAnimationsEnabled"),
              n = a.Ember.Object.create({
                tutorial: e,
                largeAreaAnimationsEnabled: t,
                celebrationComplete: !1,
              }),
              i = a.ComponentFactory.create({
                type: "rcp-fe-lol-new-player-experience-reward-celebration",
                data: n,
              }),
              o = a.VignetteCelebrationManager.add({
                type: "VignetteCelebration",
                ComponentFactory: a.ComponentFactory,
                id: e.id,
                data: {
                  header: { title: a.tra.get("npe_reward_celebration_title") },
                  backgroundImageUrl:
                    "/fe/lol-new-player-experience/Celebrations_GenericMagicBG.png",
                  nextButtonText: a.tra.get(
                    "npe_reward_celebration_claim_button",
                  ),
                  nextButtonEnabled: !t,
                },
                height: "MEDIUM",
                timing: "INFINITE",
                animationsEnabled: t,
                onClick: () => {
                  n.set("celebrationComplete", !0),
                    setTimeout(() => {
                      a.VignetteCelebrationManager.remove({ id: e.id }),
                        this.exitTutorialScreen();
                    }, 1200);
                },
                onRemove: () => {
                  this.markAsViewed(e);
                },
                content: i,
              });
            a.Ember.run.later(() => {
              o.data.nextButtonEnabled ||
                ((o.data.nextButtonEnabled = !0),
                a.VignetteCelebrationManager.update(o));
            }, 3600);
          },
          exitTutorialScreen() {
            (0, o.default)((e) => (e.hasSkippedTutorialPath = !0)),
              this.sendAction("exit");
          },
          advanceTutorial() {
            const e = this.get("tutorials");
            if (0 === e.length) return;
            let t = this.get("selectedIndex");
            this.selectInitialTutorial(),
              (t = this.get("selectedIndex")),
              this.setSelected(t);
            const n = e.filter(
              (e) =>
                "COMPLETED" === e.status && "REWARD" === e.type && !e.isViewed,
            );
            if (n.length > 0)
              for (let e = 0; e < n.length; e++)
                this.triggerTutorialRewardCelebration(n[e]);
          },
          setNavigationButtons(e, t) {
            e
              ? (0 === t
                  ? this.set("navigateLeftDisabled", !0)
                  : this.set("navigateLeftDisabled", null),
                t === e.length - 1
                  ? this.set("navigateRightDisabled", !0)
                  : this.set("navigateRightDisabled", null))
              : this.setProperties({
                  navigateLeftDisabled: !0,
                  navigateRightDisabled: !0,
                });
          },
          setSelected(e) {
            const t = this.get("tutorials");
            if (!t || 0 === t.length) return;
            const n = this.$(".npe-tutorial-carousel");
            if (n && 0 !== n.outerWidth()) {
              a.Ember.run.cancel(this.setSelectedRunID);
              for (let n = t.length - 1; n >= 0; n--)
                t[n].set("isSelected", n === e);
              this.set("selectedIndex", e),
                this.sendAction("selectTutorial", e),
                this.setNavigationButtons(t, e),
                this.set("hasRendered", !0),
                this.animateCarouselPosition(e);
            } else
              this.setSelectedRunID = a.Ember.run.debounce(
                this,
                "setSelected",
                e,
                500,
              );
          },
          setSelectedTutorial() {
            const e = this.get("selectedIndex"),
              t = this.get("tutorials");
            t[e] && t[e].set("isSelected", !0);
          },
          animateCarouselPosition(e) {
            const t = this.$(".npe-tutorial-carousel");
            let n = t.outerWidth(!0) / 2,
              a = 0;
            const i = t.children();
            for (let t = 0; t < i.length; t++)
              if (
                ((n -= i.eq(t).outerWidth(!0)),
                i.eq(t).hasClass("npe-tutorial-carousel-item"))
              ) {
                if (a === e) {
                  n += i.eq(t).outerWidth(!0) / 2;
                  break;
                }
                a++;
              }
            this.$(".npe-tutorial-carousel").off("transitionend"),
              this.set("updatingSelection", !0),
              this.$(".npe-tutorial-carousel").css({
                "-webkit-transform": "translate(" + Math.floor(n) + "px,0px)",
              }),
              this.$(".npe-tutorial-carousel").on("transitionend", () => {
                this.set("updatingSelection", !1),
                  this.$(".npe-tutorial-carousel").off("transitionend");
              });
          },
          markAsViewed(e) {
            e && !e.isViewed && this.get("npeService").markAsRead(e.id);
          },
          actions: {
            onItemClick(e, t) {
              a.tutorialSounds.getSound("MODULE_CLICKED").play(),
                this.setSelected(e);
            },
            cardUnlocked(e, t) {},
            cardCompleted(e, t) {
              this.markAsViewed(t);
            },
            onLeftArrowClicked() {
              const e = this.get("selectedIndex");
              0 !== e &&
                (a.tutorialSounds.getSound("MODULE_CLICKED").play(),
                this.setSelected(e - 1));
            },
            onRightArrowClicked() {
              const e = this.get("selectedIndex"),
                t = this.get("tutorials");
              t &&
                e !== t.length - 1 &&
                (a.tutorialSounds.getSound("MODULE_CLICKED").play(),
                this.setSelected(e + 1));
            },
            carouselNavItemSelect: function (e) {
              this.setSelected(e);
            },
          },
        });
      },
      (e, t, n) => {
        "use strict";
        n.r(t);
      },
      (e, t, n) => {
        const a = n(1).Ember;
        e.exports = a.HTMLBars.template({
          id: "B8yJz+KP",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\Releases_14_10\\\\LeagueClientContent_Release\\\\15682\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-new-player-experience\\\\src\\\\components\\\\tutorial-carousel-component\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\Releases_14_10\\\\LeagueClientContent_Release\\\\15682\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-new-player-experience\\\\src\\\\components\\\\tutorial-carousel-component\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\Releases_14_10\\\\LeagueClientContent_Release\\\\15682\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-new-player-experience\\\\src\\\\components\\\\tutorial-carousel-component\\\\index.js\\" "],["text","\\n"],["block",["if"],[["get",["largeAreaAnimationsEnabled"]]],null,5],["open-element","div",[]],["dynamic-attr","class",["concat",["npe-tutorial-carousel ",["helper",["if"],[["get",["hasRendered"]],"visible"],null]]]],["flush-element"],["text","\\n"],["block",["each"],[["get",["tutorials"]]],[["key"],["id"]],4],["close-element"],["text","\\n\\n"],["block",["unless"],[["get",["tutorials","length"]]],null,0],["text","\\n"],["open-element","div",[]],["dynamic-attr","class",["concat",["npe-tutorial-block ",["helper",["if"],[["get",["isUnableToReconnect"]],"visible","hidden"],null]]]],["flush-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","npe-tutorial-timer"],["flush-element"],["append",["unknown",["timeRemainingToExitGame"]],false],["close-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","npe-tutorial-timer-label"],["flush-element"],["append",["unknown",["tra","npe_tutorial_patch_ESTIMATED"]],false],["close-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","npe-tutorial-info"],["flush-element"],["append",["unknown",["tra","npe_tutorial_patch_UNABLE_TO_RECONNECT_TEXT"]],false],["close-element"],["text","\\n"],["close-element"],["text","\\n\\n"],["open-element","div",[]],["dynamic-attr","class",["concat",["npe-tutorial-block ",["helper",["if"],[["get",["isInQueue"]],"visible","hidden"],null]]]],["flush-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","npe-tutorial-timer"],["flush-element"],["append",["unknown",["timeInQueue"]],false],["close-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","npe-tutorial-info"],["flush-element"],["append",["unknown",["tra","npe_tutorial_patch_QUEUE_TEXT"]],false],["close-element"],["text","\\n"],["close-element"],["text","\\n\\n"],["append",["helper",["npe-tutorial-path-carousel-navigation"],null,[["carouselNavItemSelect","tutorials","selectedIndex","isUnableToLaunch","class"],["carouselNavItemSelect",["get",["tutorials"]],["get",["selectedIndex"]],["get",["isUnableToLaunch"]],"npe-tutorial-navigation"]]],false],["text","\\n\\n"],["open-element","button",[]],["static-attr","class","npe-tutorial-carousel-arrow npe-tutorial-carousel-left-arrow"],["dynamic-attr","disabled",["unknown",["navigateLeftDisabled"]],null],["modifier",["action"],[["get",[null]],"onLeftArrowClicked"]],["flush-element"],["close-element"],["text","\\n"],["open-element","button",[]],["static-attr","class","npe-tutorial-carousel-arrow npe-tutorial-carousel-right-arrow"],["dynamic-attr","disabled",["unknown",["navigateRightDisabled"]],null],["modifier",["action"],[["get",[null]],"onRightArrowClicked"]],["flush-element"],["close-element"],["text","\\n"]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","  "],["append",["helper",["uikit-spinner"],null,[["style"],["pointer-events: none;"]]],false],["text","\\n"]],"locals":[]},{"statements":[["text","    "],["append",["helper",["npe-tutorial-path-item-reward"],null,[["tutorial","onSelect","class"],[["get",["tutorial"]],["helper",["action"],[["get",[null]],"onItemClick",["get",["index"]],["get",["tutorial"]]],null],"npe-tutorial-carousel-item"]]],false],["text","\\n"]],"locals":[]},{"statements":[["text","    "],["append",["helper",["npe-tutorial-path-item-card"],null,[["tutorial","largeAreaAnimationsEnabled","onUnlocked","onCompleted","onSelect","class","isNotInGameFlow"],[["get",["tutorial"]],["get",["largeAreaAnimationsEnabled"]],["helper",["action"],[["get",[null]],"cardUnlocked",["get",["index"]],["get",["tutorial"]]],null],["helper",["action"],[["get",[null]],"cardCompleted",["get",["index"]],["get",["tutorial"]]],null],["helper",["action"],[["get",[null]],"onItemClick",["get",["index"]],["get",["tutorial"]]],null],"npe-tutorial-carousel-item",["get",["isNotInGameFlow"]]]]],false],["text","\\n"]],"locals":[]},{"statements":[["text","    "],["open-element","div",[]],["static-attr","class","npe-tutorial-carousel-item-spacer"],["flush-element"],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["block",["if"],[["get",["index"]]],null,3],["block",["if"],[["get",["tutorial","isCard"]]],null,2,1]],"locals":["tutorial","index"]},{"statements":[["text","  "],["open-element","video",[]],["static-attr","visible-value","true"],["dynamic-attr","class",["concat",["npe-tutorial-item-magic-video ",["helper",["unless"],[["get",["updatingSelection"]],"visible"],null]]]],["static-attr","src","/fe/lol-new-player-experience/vfx-vertical-magic-loop.webm"],["static-attr","cache-name","rcp-fe-lol-npe-tutorial-path"],["static-attr","autoplay",""],["static-attr","preload",""],["static-attr","loop",""],["flush-element"],["text","\\n  "],["close-element"],["text","\\n"]],"locals":[]}],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, n) => {
        "use strict";
        var a,
          i = n(1),
          o = (a = n(23)) && a.__esModule ? a : { default: a };
        n(35);
        e.exports = i.Ember.Component.extend({
          classNames: ["npe-tp-carousel-navigation"],
          classNameBindings: ["isUnableToLaunch:hidden:visible"],
          layout: n(36),
          isUnableToLaunch: !1,
          selectedIndex: 0,
          tutorialNavItems: i.Ember.computed(
            "tutorials.[]",
            "tutorials.@each.status",
            "selectedIndex",
            function () {
              const e = i.Ember.A(),
                t = this.get("tutorials");
              return t
                ? (t.forEach((t, n) => {
                    const a = {},
                      i = t.type ? t.type.toLowerCase() : "";
                    (a.isReward = "reward" === i),
                      (a.selectedClass =
                        n === this.get("selectedIndex") ? "selected" : ""),
                      (a.statusClass = t.status ? t.status.toLowerCase() : ""),
                      (a.position = n),
                      (a.description = t.description || ""),
                      e.push(a);
                  }),
                  e)
                : e;
            },
          ),
          actions: {
            selectCarouselItem: function (e) {
              this.sendAction("carouselNavItemSelect", e.position),
                o.default.logButtonClick(
                  "selectCarouselItem",
                  "carouselItem" + e.position,
                );
            },
          },
        });
      },
      (e, t, n) => {
        "use strict";
        n.r(t);
      },
      (e, t, n) => {
        const a = n(1).Ember;
        e.exports = a.HTMLBars.template({
          id: "KRbOd0zz",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\Releases_14_10\\\\LeagueClientContent_Release\\\\15682\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-new-player-experience\\\\src\\\\components\\\\tutorial-carousel-component\\\\carousel-navigation-component\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\Releases_14_10\\\\LeagueClientContent_Release\\\\15682\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-new-player-experience\\\\src\\\\components\\\\tutorial-carousel-component\\\\carousel-navigation-component\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\Releases_14_10\\\\LeagueClientContent_Release\\\\15682\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-new-player-experience\\\\src\\\\components\\\\tutorial-carousel-component\\\\carousel-navigation-component\\\\index.js\\" "],["text","\\n"],["open-element","div",[]],["static-attr","class","nav-content"],["flush-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","nav-pips"],["flush-element"],["text","\\n"],["block",["each"],[["get",["tutorialNavItems"]]],null,2],["text","  "],["close-element"],["text","\\n"],["close-element"],["text","\\n"]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","            "],["open-element","lol-uikit-content-block",[]],["static-attr","type","tooltip-system"],["flush-element"],["text","\\n              "],["open-element","p",[]],["flush-element"],["append",["unknown",["tra","npe_tutorial_item_LOCKED_REWARD_DESCRIPTION"]],false],["close-element"],["text","\\n            "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["block",["uikit-tooltip"],null,[["tooltipPosition","type"],["right","system"]],0]],"locals":[]},{"statements":[["text","      "],["open-element","div",[]],["dynamic-attr","class",["concat",["nav-pip ",["helper",["if"],[["get",["navItem","isReward"]],"reward",["get",["navItem","statusClass"]]],null]," ",["unknown",["navItem","selectedClass"]]]]],["modifier",["action"],[["get",[null]],"selectCarouselItem",["get",["navItem"]]],[["on"],["click"]]],["flush-element"],["text","\\n"],["block",["if"],[["get",["navItem","isReward"]]],null,1],["text","      "],["close-element"],["text","\\n"]],"locals":["navItem"]}],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, n) => {
        "use strict";
        var a,
          i = n(1),
          o = (a = n(23)) && a.__esModule ? a : { default: a };
        n(38),
          (e.exports = i.Ember.Component.extend({
            classNames: ["npe-tutorial-item-card-component"],
            classNameBindings: [
              "isSelected:selected",
              "isReward:reward:card",
              "isLocked:locked",
            ],
            layout: n(39),
            tutorial: null,
            title: i.Ember.computed.alias("tutorial.title"),
            description: i.Ember.computed.alias("tutorial.description"),
            stepNumber: i.Ember.computed.alias("tutorial.stepNumber"),
            rewards: i.Ember.computed.alias("tutorial.rewards"),
            isReward: i.Ember.computed.equal("tutorial.type", "REWARD"),
            isCompleted: i.Ember.computed.equal("tutorial.status", "COMPLETED"),
            isNotCompleted: i.Ember.computed.not("isCompleted"),
            isUnlocked: i.Ember.computed.equal("tutorial.status", "UNLOCKED"),
            isLocked: i.Ember.computed.equal("tutorial.status", "LOCKED"),
            isSelected: i.Ember.computed.alias("tutorial.isSelected"),
            isNotReward: i.Ember.computed.not("isReward"),
            isSelectedNotReward: i.Ember.computed.and(
              "isNotReward",
              "isSelected",
            ),
            largeAreaAnimationsEnabled: !1,
            backgroundUrlSource: i.Ember.computed.alias(
              "tutorial.backgroundUrl",
            ),
            shouldAnimate: !1,
            isAnimating: !1,
            hasUpdateStateAnimated: !1,
            didReceiveAttrs() {
              this._super(...arguments);
              const e = !this.get("tutorial.isViewed"),
                t = this.get("isNotInGameFlow");
              e && t && !this.shouldAnimate && (this.shouldAnimate = !0);
            },
            didRender() {
              this._super(...arguments),
                this.shouldAnimate &&
                  !this.isAnimating &&
                  ((this.isAnimating = !0), this.animateTutorialCard());
            },
            willDestroyElement() {
              this._super(...arguments),
                i.Ember.run.cancel(this.animationReset),
                i.Ember.run.cancel(this.onCompleteTimeout);
            },
            animateTutorialCard() {
              const e = this.get("tutorial.status");
              "UNLOCKED" !== e || this.hasUpdateStateAnimated
                ? "COMPLETED" === e &&
                  (i.tutorialSounds.getSound("MODULE_COMPLETE").play(),
                  this.element
                    .querySelector(".npe-tutorial-item-complete-video")
                    .play(),
                  (this.onCompleteTimeout = i.Ember.run.later(
                    this,
                    () => this.get("onCompleted")(),
                    2e3,
                  )))
                : (i.tutorialSounds.getSound("MODULE_UNLOCK").play(),
                  this.element
                    .querySelector(".npe-tutorial-item-unlock-video")
                    .play(),
                  (this.hasUpdateStateAnimated = !0)),
                (this.animationReset = i.Ember.run.later(
                  this,
                  () => {
                    (this.shouldAnimate = !1), (this.isAnimating = !1);
                  },
                  3e3,
                ));
            },
            actions: {
              onClicked() {
                if (this.get("isSelected")) return;
                this.get("onSelect")();
                const e = "stepNumber" + this.tutorial.stepNumber,
                  t = {
                    stepNumber: this.tutorial.stepNumber,
                    tutorialType: this.tutorial.type,
                    tutorialStatus: this.tutorial.status,
                    tutorialTitle: this.tutorial.title
                      .split(" ")
                      .join("_")
                      .toLowerCase()
                      .replace(/\W+/g, ""),
                  };
                o.default.logButtonClick("carouselNavigation", e, t);
              },
            },
          }));
      },
      (e, t, n) => {
        "use strict";
        n.r(t);
      },
      (e, t, n) => {
        const a = n(1).Ember;
        e.exports = a.HTMLBars.template({
          id: "sxKY0eHD",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\Releases_14_10\\\\LeagueClientContent_Release\\\\15682\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-new-player-experience\\\\src\\\\components\\\\tutorial-item-card-component\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\Releases_14_10\\\\LeagueClientContent_Release\\\\15682\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-new-player-experience\\\\src\\\\components\\\\tutorial-item-card-component\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\Releases_14_10\\\\LeagueClientContent_Release\\\\15682\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-new-player-experience\\\\src\\\\components\\\\tutorial-item-card-component\\\\index.js\\" "],["text","\\n"],["open-element","lol-uikit-dialog-frame",[]],["dynamic-attr","appearance",["concat",[["helper",["if"],[["get",["isLocked"]],"disabled"],null]]]],["flush-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","tutorial-item-card-animation"],["modifier",["action"],[["get",[null]],"onClicked"]],["flush-element"],["text","\\n    "],["open-element","img",[]],["dynamic-attr","class",["concat",["npe-tutorial-item-image  ",["helper",["if"],[["get",["isLocked"]],"locked"],null]]]],["dynamic-attr","src",["concat",[["unknown",["backgroundUrlSource"]]]]],["flush-element"],["close-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","npe-tutorial-item-top-block"],["flush-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","npe-tutorial-item-sequence-block"],["flush-element"],["text","\\n        "],["open-element","div",[]],["dynamic-attr","class",["concat",["npe-tutorial-item-sequence ",["helper",["if"],[["get",["isLocked"]],"locked"],null]]]],["flush-element"],["append",["unknown",["stepNumber"]],false],["close-element"],["text","\\n      "],["close-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","npe-tutorial-item-text-block"],["flush-element"],["text","\\n        "],["open-element","div",[]],["dynamic-attr","class",["concat",["npe-tutorial-item-title ",["helper",["if"],[["get",["isLocked"]],"locked"],null]]]],["flush-element"],["append",["unknown",["title"]],false],["close-element"],["text","\\n        "],["open-element","div",[]],["dynamic-attr","class",["concat",["npe-tutorial-item-description ",["helper",["if"],[["get",["isLocked"]],"locked"],null]]]],["flush-element"],["append",["unknown",["description"]],false],["close-element"],["text","\\n      "],["close-element"],["text","\\n    "],["close-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","npe-tutorial-item-rewards-block"],["flush-element"],["text","\\n"],["block",["unless"],[["get",["isCompleted"]]],null,3,0],["text","    "],["close-element"],["text","\\n    "],["open-element","div",[]],["dynamic-attr","class",["concat",["npe-tutorial-item-overlay checkmark ",["helper",["if"],[["get",["isSelected"]],"selected"],null]," ",["helper",["if"],[["get",["isCompleted"]],"visible","hidden"],null]," ",["helper",["if"],[["get",["largeAreaAnimationsEnabled"]],"largeAreaAnimationsEnabled"],null]]]],["flush-element"],["text","\\n         "],["open-element","div",[]],["static-attr","class","npe-tutorial-item-checkmark"],["flush-element"],["close-element"],["text","\\n    "],["close-element"],["text","\\n    "],["open-element","div",[]],["dynamic-attr","class",["concat",["npe-tutorial-item-overlay lock ",["helper",["if"],[["get",["isSelected"]],"selected"],null]," ",["helper",["if"],[["get",["isLocked"]],"visible","hidden"],null]," ",["helper",["if"],[["get",["largeAreaAnimationsEnabled"]],"largeAreaAnimationsEnabled"],null]]]],["flush-element"],["text","\\n      "],["open-element","div",[]],["dynamic-attr","class",["concat",["npe-tutorial-item-lock-text ",["helper",["if"],[["get",["isSelected"]],"selected"],null]]]],["flush-element"],["append",["unknown",["tra","npe_tutorial_item_LOCKED_DESCRIPTION"]],false],["close-element"],["text","\\n    "],["close-element"],["text","\\n    "],["open-element","uikit-video",[]],["static-attr","class","npe-tutorial-item-complete-video"],["static-attr","src","/fe/lol-new-player-experience/vfx-tutorial-complete.webm"],["static-attr","cache-name","rcp-fe-lol-npe-tutorial-path"],["static-attr","preload",""],["flush-element"],["text","\\n    "],["close-element"],["text","\\n    "],["open-element","uikit-video",[]],["static-attr","class","npe-tutorial-item-unlock-video"],["static-attr","src","/fe/lol-new-player-experience/vfx-tutorial-unlock.webm"],["static-attr","cache-name","rcp-fe-lol-npe-tutorial-path"],["static-attr","preload",""],["flush-element"],["text","\\n    "],["close-element"],["text","\\n  "],["close-element"],["text","\\n"],["close-element"],["text","\\n"]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","        "],["open-element","div",[]],["static-attr","class","npe-tutorial-item-reward-description"],["flush-element"],["append",["unknown",["tra","npe_tutorial_item_COMPLETED"]],false],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","            "],["open-element","div",[]],["static-attr","class","npe-tutorial-item-reward-block"],["flush-element"],["text","\\n              "],["open-element","img",[]],["static-attr","class","npe-tutorial-item-reward-icon"],["dynamic-attr","src",["concat",[["unknown",["reward","iconUrl"]]]]],["flush-element"],["close-element"],["text","\\n              "],["open-element","div",[]],["dynamic-attr","class",["concat",["npe-tutorial-item-reward-description ",["helper",["if"],[["get",["isLocked"]],"locked"],null]]]],["flush-element"],["text","\\n                "],["append",["unknown",["reward","description"]],false],["text","\\n              "],["close-element"],["text","\\n            "],["close-element"],["text","\\n"]],"locals":["reward"]},{"statements":[["text","          "],["open-element","div",[]],["dynamic-attr","class",["concat",["npe-tutorial-item-reward-title ",["helper",["if"],[["get",["isLocked"]],"locked"],null]]]],["flush-element"],["text","\\n            "],["append",["unknown",["tra","npe_tutorial_item_REWARDS"]],false],["text","\\n          "],["close-element"],["text","\\n"],["block",["each"],[["get",["rewards"]]],null,1]],"locals":[]},{"statements":[["block",["if"],[["get",["rewards","length"]]],null,2]],"locals":[]}],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, n) => {
        "use strict";
        var a,
          i = n(1),
          o = (a = n(23)) && a.__esModule ? a : { default: a };
        n(41),
          (e.exports = i.Ember.Component.extend({
            classNames: ["npe-tutorial-item-reward-component"],
            classNameBindings: [
              "isSelected:selected",
              "isReward:reward:card",
              "isLocked:locked",
            ],
            layout: n(42),
            tutorial: null,
            title: i.Ember.computed.alias("tutorial.title"),
            description: i.Ember.computed.alias("tutorial.description"),
            stepNumber: i.Ember.computed.alias("tutorial.stepNumber"),
            rewards: i.Ember.computed.alias("tutorial.rewards"),
            isReward: i.Ember.computed.equal("tutorial.type", "REWARD"),
            isCompleted: i.Ember.computed.equal("tutorial.status", "COMPLETED"),
            isNotCompleted: i.Ember.computed.not("isCompleted"),
            isUnlocked: i.Ember.computed.equal("tutorial.status", "UNLOCKED"),
            isLocked: i.Ember.computed.equal("tutorial.status", "LOCKED"),
            isSelected: i.Ember.computed.alias("tutorial.isSelected"),
            isNotReward: i.Ember.computed.not("isReward"),
            isSelectedNotReward: i.Ember.computed.and(
              "isNotReward",
              "isSelected",
            ),
            uxSettingsService: i.Ember.inject.service("ux-settings"),
            largeAreaAnimationsEnabled: i.Ember.computed.alias(
              "uxSettingsService.largeAreaAnimationsEnabled",
            ),
            backgroundUrlSource: i.Ember.computed(
              "tutorial.backgroundUrl",
              function () {
                const e = this.get("tutorial.backgroundUrl");
                return e ? "background-image: url(" + e + ")" : "";
              },
            ),
            actions: {
              onClicked() {
                this.get("onSelect")();
                const e = "stepNumber" + this.tutorial.stepNumber,
                  t = {
                    stepNumber: this.tutorial.stepNumber,
                    tutorialType: this.tutorial.type,
                    tutorialStatus: this.tutorial.status,
                    tutorialTitle: this.tutorial.title
                      .split(" ")
                      .join("_")
                      .toLowerCase()
                      .replace(/\W+/g, ""),
                  };
                o.default.logButtonClick("carouselNavigation", e, t);
              },
            },
          }));
      },
      (e, t, n) => {
        "use strict";
        n.r(t);
      },
      (e, t, n) => {
        const a = n(1).Ember;
        e.exports = a.HTMLBars.template({
          id: "sKLNwXSa",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\Releases_14_10\\\\LeagueClientContent_Release\\\\15682\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-new-player-experience\\\\src\\\\components\\\\tutorial-item-reward-component\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\Releases_14_10\\\\LeagueClientContent_Release\\\\15682\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-new-player-experience\\\\src\\\\components\\\\tutorial-item-reward-component\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\Releases_14_10\\\\LeagueClientContent_Release\\\\15682\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-new-player-experience\\\\src\\\\components\\\\tutorial-item-reward-component\\\\index.js\\" "],["text","\\n"],["open-element","div",[]],["static-attr","class","npe-tutorial-item-reward-wrapper"],["modifier",["action"],[["get",[null]],"onClicked"]],["flush-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","npe-tutorial-item-reward-switch"],["flush-element"],["text","\\n"],["block",["if"],[["get",["largeAreaAnimationsEnabled"]]],null,2,1],["text","  "],["close-element"],["text","\\n  \\n  "],["open-element","div",[]],["dynamic-attr","class",["concat",["npe-tutorial-reward-checkmark ",["helper",["if"],[["get",["isCompleted"]],"completed"],null]," ",["helper",["if"],[["get",["isLocked"]],"locked"],null]," ",["helper",["if"],[["get",["isSelected"]],"selected"],null]]]],["flush-element"],["text","\\n"],["block",["if"],[["get",["isLocked"]]],null,0],["text","  "],["close-element"],["text","\\n"],["close-element"]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","    "],["open-element","div",[]],["dynamic-attr","class",["concat",["npe-tutorial-reward-lock-text ",["helper",["if"],[["get",["isSelected"]],"selected"],null]]]],["flush-element"],["append",["unknown",["tra","npe_tutorial_item_LOCKED_REWARD_DESCRIPTION"]],false],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","      "],["open-element","div",[]],["dynamic-attr","class",["concat",["npe-tutorial-reward-image ",["helper",["if"],[["get",["isLocked"]],"locked"],null]]]],["flush-element"],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","      "],["open-element","video",[]],["dynamic-attr","class",["concat",["npe-tutorial-item-reward-video ",["helper",["if"],[["get",["isLocked"]],"locked"],null]]]],["static-attr","src","/fe/lol-new-player-experience/vfx-capsule-loop.webm"],["static-attr","cache-name","rcp-fe-lol-npe-tutorial-path"],["static-attr","autoplay",""],["static-attr","preload",""],["static-attr","loop",""],["flush-element"],["close-element"],["text","\\n"]],"locals":[]}],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, n) => {
        "use strict";
        var a = n(1);
        n(44),
          (e.exports = a.Ember.Component.extend({
            classNames: ["npe-header-component"],
            layout: n(45),
            gameDataService: a.Ember.inject.service("game-data"),
            summonerService: a.Ember.inject.service("summoner"),
            currentPlayerLevel: a.Ember.computed.alias(
              "summonerService.localSummonerData.summonerLevel",
            ),
            currentPlayerSummonerName: a.Ember.computed.alias(
              "summonerService.localSummonerData.displayName",
            ),
            currentPlayerGameName: a.Ember.computed.alias(
              "summonerService.localSummonerData.gameName",
            ),
            currentPlayerTagLine: a.Ember.computed.alias(
              "summonerService.localSummonerData.tagLine",
            ),
            currentPlayerPuuid: a.Ember.computed.alias(
              "summonerService.localSummonerData.puuid",
            ),
            hasLongSummonerLevel: a.Ember.computed.gt(
              "summonerService.localSummonerData.summonerLevel",
              999,
            ),
            percentCompleteForNextLevel: a.Ember.computed.alias(
              "summonerService.localSummonerData.percentCompleteForNextLevel",
            ),
            leagueLogoIdle: n(46),
            summonerIconUrl: a.Ember.computed(
              "gameDataService.profileIcons",
              "gameDataService.profileIcons.[]",
              "summonerService",
              "summonerService.localSummonerData",
              "summonerService.localSummonerData.profileIconId",
              function () {
                let e = this.get(
                  "summonerService.localSummonerData.profileIconId",
                );
                e = !e || e < 0 ? 29 : e;
                const t = this.get("gameDataService.profileIcons");
                return this.get("gameDataService").summonerIconUrl(e, t);
              },
            ),
            hasSummonerIconUrl: a.Ember.computed(
              "summonerIconUrl",
              function () {
                const e = this.get("summonerIconUrl");
                return e && e.length > 0;
              },
            ),
            didInsertElementListener: a.Ember.on(
              "didInsertElement",
              function () {
                this._playLogoVideo();
              },
            ),
            _playLogoVideo: function () {
              this.element
                .querySelector(".npe-header-league-logo-video")
                .play();
            },
          }));
      },
      (e, t, n) => {
        "use strict";
        n.r(t);
      },
      (e, t, n) => {
        const a = n(1).Ember;
        e.exports = a.HTMLBars.template({
          id: "KYG8SFvz",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\Releases_14_10\\\\LeagueClientContent_Release\\\\15682\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-new-player-experience\\\\src\\\\components\\\\header-component\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\Releases_14_10\\\\LeagueClientContent_Release\\\\15682\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-new-player-experience\\\\src\\\\components\\\\header-component\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\Releases_14_10\\\\LeagueClientContent_Release\\\\15682\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-new-player-experience\\\\src\\\\components\\\\header-component\\\\index.js\\" "],["text","\\n"],["open-element","div",[]],["static-attr","class","npe-header-league-logo"],["flush-element"],["text","\\n  "],["open-element","lol-uikit-video",[]],["static-attr","type","idle"],["static-attr","class","npe-header-league-logo-video"],["dynamic-attr","src",["unknown",["leagueLogoIdle"]],null],["flush-element"],["close-element"],["text","\\n"],["close-element"],["text","\\n\\n"],["open-element","div",[]],["static-attr","class","summoner-info-anchor"],["flush-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","fancy-icon-with-level"],["flush-element"],["text","\\n    "],["open-element","lol-uikit-radial-progress",[]],["static-attr","class","summoner-level-icon"],["static-attr","type","custom"],["dynamic-attr","percent",["concat",[["unknown",["percentCompleteForNextLevel"]]]]],["static-attr","start-angle","240"],["static-attr","end-angle","-60"],["flush-element"],["text","\\n      "],["comment"," Summoner icon with summoner level rendering "],["text","\\n      "],["open-element","div",[]],["static-attr","slot","bottom"],["static-attr","class","bottom unfilled xp-ring"],["flush-element"],["close-element"],["text","\\n      "],["open-element","div",[]],["static-attr","slot","middle"],["static-attr","class","middle filled xp-ring"],["flush-element"],["close-element"],["text","\\n      "],["open-element","div",[]],["static-attr","slot","top"],["static-attr","class","top"],["flush-element"],["text","\\n          "],["open-element","div",[]],["static-attr","class","center xp-ring"],["flush-element"],["close-element"],["text","\\n          "],["open-element","img",[]],["static-attr","class","icon-image"],["dynamic-attr","class-has-icon",["concat",[["unknown",["hasSummonerIconUrl"]]]]],["dynamic-attr","src",["concat",[["unknown",["summonerIconUrl"]]]]],["flush-element"],["close-element"],["text","\\n          "],["open-element","div",[]],["static-attr","class","summoner-level-ring"],["flush-element"],["close-element"],["text","\\n          "],["open-element","div",[]],["static-attr","class","summoner-level"],["dynamic-attr","class-has-long-summoner-level",["concat",[["unknown",["hasLongSummonerLevel"]]]]],["flush-element"],["append",["unknown",["currentPlayerLevel"]],false],["close-element"],["text","\\n      "],["close-element"],["text","\\n    "],["close-element"],["text","\\n  "],["close-element"],["text","\\n\\n  "],["open-element","div",[]],["static-attr","class","current-player-name"],["flush-element"],["text","\\n    "],["append",["helper",["player-name"],null,[["format","puuid","summonerName","gameName","tagLine"],["short",["get",["currentPlayerPuuid"]],["get",["currentPlayerSummonerName"]],["get",["currentPlayerGameName"]],["get",["currentPlayerTagLine"]]]]],false],["text","\\n  "],["close-element"],["text","\\n"],["close-element"],["text","\\n\\n"],["open-element","div",[]],["static-attr","class","tutorial-path-nav"],["flush-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","tutorial-path-nav-items"],["flush-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","tutorial-path-nav-item"],["flush-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","tutorial-path-nav-item-text"],["flush-element"],["append",["unknown",["tra","npe_tutorial_path_nav_text"]],false],["close-element"],["text","\\n    "],["close-element"],["text","\\n  "],["close-element"],["text","\\n"],["close-element"],["text","\\n"]],"locals":[],"named":[],"yields":[],"blocks":[],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, n) => {
        "use strict";
        e.exports = n.p + "vfx-league-logo-loop-idle.webm";
      },
      (e, t, n) => {
        "use strict";
        var a = n(1);
        n(48),
          (e.exports = a.Ember.Component.extend({
            layout: n(49),
            classNames: ["missions-tracker-component"],
            missionsButton: null,
            npeService: a.Ember.inject.service("npe"),
            missionsConfig: a.Ember.computed.alias("npeService.missionsConfig"),
            entitlements: a.Ember.computed.alias("npeService.entitlements"),
            missionsButtonEnabled: a.Ember.computed(
              "missionsConfig",
              "missionsConfig.MissionsEnabled",
              "missionsConfig.MissionsFrontEndEnabled",
              "entitlements.entitlements.[]",
              function () {
                let e = !1,
                  t = !1;
                this.get("missionsConfig") &&
                  ((e = !1 !== this.get("missionsConfig.MissionsEnabled")),
                  (t =
                    !1 !== this.get("missionsConfig.MissionsFrontEndEnabled")));
                const n = this.get("entitlements.entitlements"),
                  a =
                    n &&
                    n.includes("urn:entitlement:globalriot.missions.enabled");
                return e && (t || a);
              },
            ),
          }));
      },
      (e, t, n) => {
        "use strict";
        n.r(t);
      },
      (e, t, n) => {
        const a = n(1).Ember;
        e.exports = a.HTMLBars.template({
          id: "L+Q4WzG2",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\Releases_14_10\\\\LeagueClientContent_Release\\\\15682\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-new-player-experience\\\\src\\\\components\\\\missions-tracker-component\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\Releases_14_10\\\\LeagueClientContent_Release\\\\15682\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-new-player-experience\\\\src\\\\components\\\\missions-tracker-component\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\Releases_14_10\\\\LeagueClientContent_Release\\\\15682\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-new-player-experience\\\\src\\\\components\\\\missions-tracker-component\\\\index.js\\" "],["text","\\n"],["block",["if"],[["get",["missionsButtonEnabled"]]],null,0]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","  "],["append",["unknown",["missions-button"]],false],["text","\\n"]],"locals":[]}],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, n) => {
        "use strict";
        var a = n(1);
        n(51);
        const i = a.Ember.Component.extend({
          classNames: ["npe-reward-celebration-component"],
          layout: n(52),
          tutorial: null,
          celebrationComplete: !1,
          rewardCelebrationState: "",
          isShowRewardState: a.Ember.computed.equal(
            "rewardCelebrationState",
            "show-reward",
          ),
          isRewardIdleState: a.Ember.computed.equal(
            "rewardCelebrationState",
            "reward-idle",
          ),
          isHideRewardState: a.Ember.computed.equal(
            "rewardCelebrationState",
            "hide-reward",
          ),
          isRewardVisibleState: a.Ember.computed.or(
            "isShowRewardState",
            "isRewardIdleState",
            "isHideRewardState",
          ),
          didInsertElement() {
            this._super(...arguments);
            this.element.querySelector(".npe-reward-capsule-video").play(),
              (this.playVideoTimeout = a.Ember.run.later(
                this,
                () => {
                  this.set("rewardCelebrationState", "show-reward"),
                    this.get("largeAreaAnimationsEnabled") &&
                      this.element
                        .querySelector(".npe-reward-blue-essence-video")
                        .play(),
                    this.set("celebrationComplete", !0);
                },
                2400,
              ));
          },
          willDestroyElement() {
            this._super(...arguments),
              a.Ember.run.cancel(this.playVideoTimeout);
          },
        });
        e.exports = i;
      },
      (e, t, n) => {
        "use strict";
        n.r(t);
      },
      (e, t, n) => {
        const a = n(1).Ember;
        e.exports = a.HTMLBars.template({
          id: "AQvWMBMM",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\Releases_14_10\\\\LeagueClientContent_Release\\\\15682\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-new-player-experience\\\\src\\\\components\\\\reward-celebration-component\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\Releases_14_10\\\\LeagueClientContent_Release\\\\15682\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-new-player-experience\\\\src\\\\components\\\\reward-celebration-component\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\Releases_14_10\\\\LeagueClientContent_Release\\\\15682\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-new-player-experience\\\\src\\\\components\\\\reward-celebration-component\\\\index.js\\" "],["text","\\n"],["open-element","div",[]],["static-attr","class","npe-reward-celebration-animation"],["flush-element"],["text","\\n  "],["open-element","div",[]],["dynamic-attr","class",["concat",["reward-wrapper capsule-container ",["helper",["if"],[["get",["isShowRewardState"]],"hide"],null]]]],["flush-element"],["text","\\n    "],["open-element","uikit-video",[]],["static-attr","class","npe-reward-capsule-video"],["static-attr","src","/fe/lol-new-player-experience/vfx-capsule-open.webm"],["static-attr","cache-name","rcp-fe-lol-npe-tutorial-path"],["static-attr","preload",""],["flush-element"],["text","\\n    "],["close-element"],["text","\\n  "],["close-element"],["text","\\n  "],["open-element","div",[]],["dynamic-attr","class",["concat",["reward-wrapper blue-essence-container ",["helper",["if"],[["get",["isRewardVisibleState"]],"show"],null]," ",["helper",["if"],[["get",["isHideRewardState"]],"hide"],null]]]],["flush-element"],["text","\\n"],["block",["if"],[["get",["largeAreaAnimationsEnabled"]]],null,1,0],["text","    "],["open-element","div",[]],["static-attr","class","reward-text-wrapper"],["flush-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","reward-text"],["flush-element"],["append",["unknown",["tra","npe_reward_celebration_text"]],false],["close-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","reward-footer"],["flush-element"],["append",["unknown",["tra","npe_reward_celebration_footer"]],false],["close-element"],["text","\\n    "],["close-element"],["text","\\n  "],["close-element"],["text","\\n"],["close-element"]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","      "],["open-element","div",[]],["static-attr","class","npe-reward-blue-essence-static"],["flush-element"],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","      "],["open-element","uikit-video",[]],["static-attr","class","npe-reward-blue-essence-video"],["static-attr","src","/fe/lol-new-player-experience/vfx-essence-big-blue-loop.webm"],["static-attr","cache-name","rcp-fe-lol-npe-tutorial-path"],["static-attr","preload",""],["static-attr","loop",""],["flush-element"],["text","\\n      "],["close-element"],["text","\\n"]],"locals":[]}],"hasPartials":false}',
          meta: {},
        });
      },
      (e) => {
        "use strict";
        e.exports = class {
          constructor(e) {
            this._privateApi = e;
          }
          show() {
            this._privateApi.show();
          }
          hide() {
            this._privateApi.hide();
          }
        };
      },
    ],
    t = {};
  function n(a) {
    var i = t[a];
    if (void 0 !== i) return i.exports;
    var o = (t[a] = { exports: {} });
    return e[a](o, o.exports, n), o.exports;
  }
  (n.r = (e) => {
    "undefined" != typeof Symbol &&
      Symbol.toStringTag &&
      Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }),
      Object.defineProperty(e, "__esModule", { value: !0 });
  }),
    (n.p = "/fe/lol-new-player-experience/"),
    (() => {
      "use strict";
      var e,
        t = (e = n(1)) && e.__esModule ? e : { default: e },
        a = n(2);
      const i = "rcp-fe-lol-new-player-experience",
        o = document.currentScript.ownerDocument;
      const l = window.getPluginAnnounceEventName(i);
      o.addEventListener(
        l,
        function (e) {
          (0, e.registrationHandler)((e) => {
            const o = e
              .get("rcp-fe-lol-shared-components")
              .getApi_Viewport()
              .fullScreen()
              .getScreenRoot(a.VIEWPORT_SCREEN_ID);
            return t.default
              .init(e, {
                Audio: (e) => e.get("rcp-fe-audio"),
                ComponentFactory: (e) =>
                  e.get("rcp-fe-common-libs").getComponentFactory("1"),
                dataBinding: (e) =>
                  e
                    .get("rcp-fe-common-libs")
                    .getDataBinding("rcp-fe-lol-new-player-experience"),
                Ember: (e) => e.get("rcp-fe-ember-libs").getEmber(),
                emberDataBinding: (e) =>
                  e
                    .get("rcp-fe-ember-libs")
                    .getEmberDataBinding("rcp-fe-lol-new-player-experience"),
                Home: (e) => e.get("rcp-fe-lol-navigation"),
                HomeRegistry: (e) =>
                  e.get("rcp-fe-lol-shared-components").getApi_HomeRegistry(),
                Lodash: (e) => e.get("rcp-fe-common-libs").getLodash(4),
                logger: (e) => e.get("rcp-fe-common-libs").logging.create(i),
                Navigation: (e) => e.get("rcp-fe-lol-navigation"),
                SharedComponents: (e) => e.get("rcp-fe-lol-shared-components"),
                socket: (e) => e.getSocket(),
                Telemetry: (e) => e.get("rcp-fe-common-libs").getTelemetry(1),
                tra: (e) =>
                  e
                    .get("rcp-fe-lol-l10n")
                    .tra()
                    .overlay("/fe/lol-l10n/trans.json")
                    .overlay("/fe/lol-new-player-experience/trans.json"),
                UIKit: (e) => e.get("rcp-fe-lol-uikit"),
                UXSettings: (e) =>
                  e.get("rcp-fe-lol-shared-components").getApi_UXSettings(),
                VideoCache: (e) => e.get("rcp-fe-lol-uikit").getVideoCache(),
                VignetteCelebrationManager: (e) =>
                  e.get("rcp-fe-lol-uikit").getVignetteCelebrationManager(),
                _: (e) => e.get("rcp-fe-common-libs").getLodash("v4"),
              })
              .then(() => {
                const e = new (n(3))(t.default.Audio);
                return (
                  e.init(),
                  t.default.add({
                    tutorialSounds: e,
                    EmberApplicationFactory: (e) =>
                      e.get("rcp-fe-ember-libs").getEmberApplicationFactory(),
                  })
                );
              })
              .then(() => {
                const e = new (n(11))(o);
                return new (n(53))(e);
              });
          });
        },
        { once: !0 },
      );
    })();
})();
