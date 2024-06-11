(() => {
  var t = [
      ,
      (t) => {
        "use strict";
        let e;
        function a() {
          return (
            e ||
            (console.error(
              "The `provider` object has not been set, please do so by calling the `init` method.",
            ),
            null)
          );
        }
        const n = {
          init: function (t, a) {
            return (e = t), this.add(a);
          },
          _getValue: function (t, a) {
            let n;
            return (
              "function" == typeof a
                ? ((n = a(e)),
                  n ||
                    console.warn(
                      "The function for key " + t + " returned a falsy value: ",
                      n,
                    ))
                : "string" == typeof a
                  ? ((n = e.get(a)),
                    n ||
                      console.warn(
                        "The provider `get` invocation for the key " +
                          t +
                          " returned a falsy value: ",
                        n,
                      ))
                  : "object" == typeof a && (n = a),
              n
            );
          },
          add: function (t) {
            t = t || {};
            const e = [],
              a = this;
            return (
              Object.keys(t).forEach(function (n) {
                const s = t[n],
                  l = a._getValue(n, s);
                l && l.then
                  ? (l.then(function (t) {
                      t ||
                        console.warn(
                          "The promise for the key " +
                            n +
                            " resolved with a falsy value: ",
                          t,
                        ),
                        a._addValue(n, t);
                    }),
                    e.push(l))
                  : a._addValue(n, l);
              }),
              Promise.all(e)
            );
          },
          _addValue: function (t, e) {
            this[t] = e;
          },
          provider: function () {
            return (
              console.error(
                "The function `provider` has been deprecated, please use `getProvider`",
                new Error().stack,
              ),
              a()
            );
          },
          getProvider: function () {
            return a();
          },
        };
        t.exports = n;
      },
      (t, e, a) => {
        "use strict";
        Object.defineProperty(e, "__esModule", { value: !0 }),
          (e.default = void 0);
        var n,
          s = (n = a(1)) && n.__esModule ? n : { default: n };
        class l {
          constructor() {
            const t = s.default.getProvider();
            this.tra = t
              .get("rcp-fe-lol-l10n")
              .tra()
              .overlay("/fe/lol-l10n/trans.json")
              .overlay("/fe/lol-match-history/trans.json");
            const e = a(3);
            this.matchSummaryApi = e(t, this.tra);
            const n = a(43);
            this.matchDetailsApi = n(t, this.tra);
          }
          displayMatchSummary(t) {
            this.tra.ready().then(() => {
              this.matchSummaryApi.displayMatchSummary(t);
            });
          }
          hideMatchSummary(t) {
            this.matchSummaryApi.hideMatchSummary(t);
          }
          displayMatchDetails(t) {
            this.matchDetailsApi.displayMatchDetails(t);
          }
          hideMatchDetails() {
            this.matchDetailsApi.hideMatchDetails();
          }
        }
        e.default = () => new l();
      },
      (t, e, a) => {
        "use strict";
        var n,
          s = (n = a(42)) && n.__esModule ? n : { default: n },
          l = a(1);
        let i;
        class o {
          constructor(t, e) {
            const a = (0, s.default)(l.Ember, e);
            (this._tra = e), (this._traService = a), (this._provider = t);
          }
          displayMatchSummary(t = {}) {
            l.Telemetry.startTracingEvent("profile-match-history-rendered"),
              new Promise((t) => {
                Promise.resolve()
                  .then(
                    (() => {
                      t(a(4));
                    }).bind(null, a),
                  )
                  .catch(a.oe);
              }).then((e) => {
                const a = !(!t || !t.summonerId) && t.summonerId;
                e(this._provider, this._traService, a, t.rootElement).then(
                  (e) => (t.matchHistorySection.component = e),
                );
              });
          }
          hideMatchSummary(t = {}) {
            t.matchHistorySection.component &&
              t.rootElement &&
              (t.rootElement.removeChild(
                t.matchHistorySection.component.domNode,
              ),
              t.matchHistorySection.component.componentPromise.then((t) =>
                t.app.destroy(),
              ),
              (t.matchHistorySection.component = null));
          }
        }
        t.exports = function (t, e) {
          return void 0 === i && (i = new o(t, e)), i;
        };
      },
      (t, e, a) => {
        "use strict";
        var n = a(1),
          s = a(5);
        let l;
        const i = a(7).default;
        t.exports = function (t, e, o, r) {
          return (
            n.logger.trace("Creating Match Summary Ember application"),
            (l = r),
            n.EmberApplicationFactory.setFactoryDefinition({
              name: "MatchSummaryRootComponent",
              tra: e,
              ComponentFactory: n.ComponentFactory,
              MatchSummaryRootComponent: a(8),
              MatchSummaryRecentlyPlayedChampionsComponent: a(21),
              MatchSummaryGeneralMatchSummaryComponent: a(26),
              TftMatchSummaryComponent: a(29),
              ChampRolePercentageTooltipComponent: a(32),
              ChampPortraitComponent: a(34),
              SpellItemIconComponent: a(36),
              RecentActivityComponent: a(38),
              MatchHistoryTooltipComponent: a(40).default,
              RenderTelemetrySenderComponent:
                n.SharedEmberComponents.RenderTelemetrySenderComponent,
              ChampPercentageDisplayHelper: a(24).champPercentageDisplayHelper,
              ChampionLevelHelper: a(24).championLevelHelper,
              RoleTitleHelper: a(24).roleTitleHelper,
              MasteryCrestComponent:
                n.SharedChampionMasteryComponents.MasteryCrestComponent,
              ClientConfigService: i,
            }),
            o
              ? n.logger.trace(`Updating match summary summoner ID to ${o}`)
              : (n.logger.trace("Updating match summary without summoner ID"),
                (o = !1)),
            n.Ember.RSVP.hash({
              champions: s.champions,
              championsByAlias: s.championsByAlias,
              items: s.items,
              maps: s.maps,
              queues: s.queues,
              spells: s.spells,
              tftItemsByName: s.tftItemsByName,
              tftChampionsByAlias: s.tftChampionsByAlias,
              tftTraitsById: s.tftTraitsById,
              tftGameVariationsByAlias: s.tftGameVariationsByAlias,
              tftDefaultSet: s.tftDefaultSet,
              tftSets: s.tftSets,
            }).then((t) => {
              const e = {
                  summonerId: o,
                  champions: t.champions,
                  championsByAlias: t.championsByAlias,
                  tftChampionsByAlias: t.tftChampionsByAlias,
                  tftTraitsById: t.tftTraitsById,
                  tftGameVariationsByAlias: t.tftGameVariationsByAlias,
                  items: t.items,
                  maps: t.maps,
                  queues: t.queues,
                  spells: t.spells,
                  tftItemsByName: t.tftItemsByName,
                  tftDefaultSet: t.tftDefaultSet,
                  tftSets: t.tftSets,
                },
                a = n.ComponentFactory.create("MatchSummaryRootComponent", e);
              return l.appendChild(a.domNode), a;
            })
          );
        };
      },
      (t, e, a) => {
        "use strict";
        var n = a(1),
          s = a(6);
        const l = n.Ember.Object.extend(
            s.DataBindingMixin,
            s.FixDataBindingMixin,
            {
              champions() {
                return this.retrieveData(
                  "api.gameData",
                  "/assets/v1/champion-summary.json",
                ).then((t) => this._indexEntities(t));
              },
              championsByAlias() {
                return this.retrieveData(
                  "api.gameData",
                  "/assets/v1/champion-summary.json",
                ).then((t) =>
                  t.reduce((t, e) => t.set(e.alias, e), n.Ember.Map.create()),
                );
              },
              tftChampionsByAlias() {
                return this.retrieveData(
                  "api.gameData",
                  "/assets/v1/tftchampions.json",
                ).then((t) =>
                  t.reduce(
                    (t, e) =>
                      e.name
                        ? t.set(e.name.toLowerCase(), e)
                        : t.set(e.character_id.toLowerCase(), e),
                    n.Ember.Map.create(),
                  ),
                );
              },
              tftTraitsById() {
                return this.retrieveData(
                  "api.gameData",
                  "/assets/v1/tfttraits.json",
                ).then((t) =>
                  t.reduce(
                    (t, e) => t.set(e.trait_id.toLowerCase(), e),
                    n.Ember.Map.create(),
                  ),
                );
              },
              tftGameVariationsByAlias() {
                return this.retrieveData(
                  "api.gameData",
                  "/assets/v1/tftgamevariations.json",
                ).then((t) =>
                  t.reduce(
                    (t, e) =>
                      t.set(e.game_variation_decorated_name.toLowerCase(), e),
                    n.Ember.Map.create(),
                  ),
                );
              },
              tftSets() {
                return this.retrieveData(
                  "api.gameData",
                  "/assets/v1/tftsets.json",
                ).then((t) => t.LCTFTModeData.mActiveSets);
              },
              tftDefaultSet() {
                return this.retrieveData(
                  "api.gameData",
                  "/assets/v1/tftsets.json",
                ).then((t) => t.LCTFTModeData.mDefaultSet);
              },
              items() {
                return this.retrieveData(
                  "api.gameData",
                  "/assets/v1/items.json",
                ).then((t) => this._indexEntities(t));
              },
              runes() {
                return this.retrieveData(
                  "api.gameData",
                  "/assets/v1/perks.json",
                ).then(
                  (t) => this._indexEntities(t),
                  () => n.Ember.Map.create(),
                );
              },
              runesStyles() {
                return this.retrieveData(
                  "api.gameData",
                  "/assets/v1/perkstyles.json",
                ).then(
                  (t) =>
                    t.styles
                      ? this._indexEntities(t.styles)
                      : this._indexEntities(t),
                  () => n.Ember.Map.create(),
                );
              },
              maps() {
                return this.retrieveData("api.maps", "/v2/maps").then((t) =>
                  n.Ember.A(t),
                );
              },
              queues() {
                return this.retrieveData("api.queues", "/v1/queues").then((t) =>
                  this._indexEntities(t),
                );
              },
              spells() {
                return this.retrieveData(
                  "api.gameData",
                  "/assets/v1/summoner-spells.json",
                ).then((t) => this._indexEntities(t));
              },
              augments() {
                return this.retrieveData(
                  "api.gameData",
                  "/assets/v1/cherry-augments.json",
                ).then((t) => this._indexEntities(t));
              },
              tftItems() {
                return this.retrieveData(
                  "api.gameData",
                  "/assets/v1/tftitems.json",
                ).then((t) => this._indexEntities(t));
              },
              tftItemsByName() {
                return this.retrieveData(
                  "api.gameData",
                  "/assets/v1/tftitems.json",
                ).then((t) => this._indexEntitiesByName(t));
              },
              _indexEntitiesByName: (t) =>
                n.Ember.isArray(t)
                  ? t.reduce((t, e) => t.set(e.nameId, e), n.Ember.Map.create())
                  : n.Ember.Map.create(),
              _indexEntities: (t) =>
                n.Ember.isArray(t)
                  ? t.reduce((t, e) => t.set(e.id, e), n.Ember.Map.create())
                  : n.Ember.Map.create(),
            },
          ),
          i = l.create();
        t.exports = {
          MapsAndGameData: l,
          augments: i.augments(),
          champions: i.champions(),
          items: i.items(),
          maps: i.maps(),
          queues: i.queues(),
          runes: i.runes(),
          runesStyles: i.runesStyles(),
          spells: i.spells(),
          tftItems: i.tftItems(),
          tftItemsByName: i.tftItemsByName(),
          championsByAlias: i.championsByAlias(),
          tftChampionsByAlias: i.tftChampionsByAlias(),
          tftTraitsById: i.tftTraitsById(),
          tftGameVariationsByAlias: i.tftGameVariationsByAlias(),
          tftSets: i.tftSets(),
          tftDefaultSet: i.tftDefaultSet(),
          CUSTOM_GAME_TYPE: "CUSTOM_GAME",
          DEFAULT_MAP_ID: 11,
        };
      },
      (t, e, a) => {
        "use strict";
        var n = a(1);
        const s = (0, n.EmberDataBinding)({
            Ember: n.Ember,
            websocket: (0, n.getProvider)().getSocket(),
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
          l = n.Ember.Mixin.create({
            retrieveData(t, e, a) {
              return this.get(t)
                .get(e, a)
                .then((t) => (t ? Promise.resolve(t) : Promise.reject(void 0)));
            },
          });
        t.exports = { FixDataBindingMixin: l, DataBindingMixin: s };
      },
      (t, e, a) => {
        "use strict";
        Object.defineProperty(e, "__esModule", { value: !0 }),
          (e.default = void 0);
        var n = a(1);
        const s = [];
        var l = n.Ember.Service.extend({
          init: function () {
            this._super(...arguments),
              (this.clientConfigDataBinding = (0, n.dataBinding)(
                "/lol-client-config",
                (0, n.getProvider)().getSocket(),
              )),
              s.forEach((t) => {
                const e = `v3/client-config/${t.path}`;
                this.clientConfigDataBinding.observe(e, this, (e) =>
                  this.setProperty(t, e),
                );
              });
          },
          setProperty(t, e) {
            let a = t.default;
            "" !== e && (a = e), this.set(t.name, a);
          },
          willDestroy() {
            this._super(...arguments),
              s.forEach((t) => {
                const e = `v3/client-config/${t.path}`;
                this.clientConfigDataBinding.unobserve(e, this);
              });
          },
        });
        e.default = l;
      },
      (t, e, a) => {
        "use strict";
        var n = a(1),
          s = a(6),
          l = m(a(9)),
          i = m(a(10)),
          o = a(5),
          r = m(a(11)),
          c = a(15);
        function m(t) {
          return t && t.__esModule ? t : { default: t };
        }
        a(19);
        const { Component: p, RSVP: d, observer: u, computed: h } = n.Ember,
          g = "CHEATER_TERMINATED",
          f = "REMAKE",
          _ = "EARLY_SURRENDER_LEAVER",
          y = "EARLY_SURRENDER_ACCOMPLICE",
          T = "VICTORY";
        t.exports = p.extend(
          s.DataBindingMixin,
          s.FixDataBindingMixin,
          l.default,
          {
            classNames: ["match-history-main", "lol-match-history-bg"],
            layout: a(20),
            clubName: "",
            deltas: null,
            tftMatchesLoading: !0,
            generalMatchesLoading: !0,
            allGeneralMatches: null,
            generalMatches: null,
            tftMatches: null,
            replayButtons: null,
            tftReplayButtons: null,
            activeMatchListName: "general",
            matchListTypes: null,
            acsAccountInfo: null,
            areAllGeneralMatchesLoaded: !1,
            allTftMatchesLoaded: h.gt("tftMatches.length", 0),
            isTftSelected: h.equal("activeMatchListName", "tft"),
            atLeastOneGeneralMatch: h.gt("gameCount", 0),
            atLeastOneMatchInCategory: h.gt("activeMatchList.length", 0),
            atLeastOneMatch: h.or(
              "atLeastOneGeneralMatch",
              "allTftMatchesLoaded",
            ),
            gameCount: h("generalMatches.[]", function () {
              const t = this.get("generalMatches");
              return t ? t.length : 0;
            }),
            maxChampMasteryLevel: h.readOnly(
              "platformConfig.ChampionMasteryConfig.MaxChampionLevel",
            ),
            isTftMatchHistoryEnabled: !0,
            isLoading: h.or("tftMatchesLoading", "generalMatchesLoading"),
            isThirdPersonView: h("summonerId", function () {
              return !!this.get("summonerId");
            }),
            fullMatchHistoryUrl: h(
              "matchHistoryWebURL",
              "acsAccountInfo",
              function () {
                const t = this.get("matchHistoryWebURL");
                if (t) {
                  const e = this.get("acsAccountInfo");
                  return `${t}/#match-history/${e.platformId}/${e.accountId}`;
                }
                return !1;
              },
            ),
            masteries: h(
              "isThirdPersonView",
              "targetMasteries",
              "myMasteries",
              function () {
                let t;
                return (
                  (t = this.get("isThirdPersonView")
                    ? this.get("targetMasteries")
                    : this.get("myMasteries")),
                  n.Lodash.keyBy(t, "championId")
                );
              },
            ),
            summoner: h(
              "isThirdPersonView",
              "targetSummoner",
              "mySummoner",
              function () {
                return this.get("isThirdPersonView")
                  ? this.get("targetSummoner")
                  : this.get("mySummoner");
              },
            ),
            activeMatchList: h(
              "activeMatchListName",
              "generalMatches.[]",
              "tftMatches.[]",
              function () {
                return "general" === this.get("activeMatchListName")
                  ? this.get("generalMatches")
                  : this.get("tftMatches");
              },
            ),
            championPortrait: h("participant.championId", function () {
              const t = this.get("participant.championId");
              return this.get("champions").get(t);
            }),
            thirdPersonAccessibleGameQueues: h.readOnly(
              "platformConfig.Replays.ThirdPersonAccessibleGameQueues",
            ),
            isTftReplaysEnabled: h.readOnly(
              "platformConfig.Replays.TftReplaysEnabled",
            ),
            puuid: h(
              "summoner.puuid",
              "session.puuid",
              "isThirdPersonView",
              function () {
                return this.get("isThirdPersonView")
                  ? this.get("summoner.puuid")
                  : this.get("session.puuid");
              },
            ),
            didRender() {
              this._super(...arguments),
                this._addGeneralReplaysButtons(),
                this._addTftReplayButtons();
            },
            init() {
              this._super(...arguments),
                this.set("allGeneralMatches", n.Ember.A()),
                this.set("generalMatches", n.Ember.A()),
                this.set("tftMatches", n.Ember.A()),
                this.set("matchListTypes", n.Ember.A()),
                this.set("deltas", new Map());
            },
            didInsertElement() {
              this._super(...arguments),
                this.set("replayButtons", n.Ember.A()),
                this.set("tftReplayButtons", n.Ember.A()),
                this._updateSummoner();
            },
            willDestroyElement() {
              this._super(...arguments),
                this.destroyReplayButtons(),
                this.set("summonerId", ""),
                (0, n.dataBinding)(
                  "/lol-end-of-game",
                  (0, n.getProvider)().getSocket(),
                ).removeObserver("/v1/state", this);
            },
            _addTftReplayButtons: function () {
              if (!0 !== this.get("isTftReplaysEnabled")) return;
              const t = this.get("tftReplayButtons");
              if (0 === t.length) {
                const e = this.get("tftMatches");
                if (e.length > 0) {
                  const a = (
                    Boolean(this.get("thirdPersonAccessibleGameQueues"))
                      ? this.get("thirdPersonAccessibleGameQueues").split(",")
                      : []
                  ).map(function (t) {
                    return parseInt(t, 10);
                  });
                  this.$(".tft-player-history-accessory-game-action")
                    .toArray()
                    .forEach((s, l) => {
                      const i = e[l];
                      if (
                        this.get("isThirdPersonView") &&
                        !a.includes(i.json.queue_id)
                      )
                        return void n.logger.trace(
                          "Queue id for this game is not whitelisted, not adding replay button",
                        );
                      const o = n.Replays.createReplayButton({
                        gameId: i.json.game_id,
                        gameVersion: i.json.game_version,
                        gameType: i.metadata.product,
                        queueId: i.json.queue_id,
                        gameCreation: Math.round(i.json.game_datetime),
                        gameDuration: i.json.game_length,
                      });
                      o
                        ? (this.$(s).html(o.domNode), t.push(o))
                        : n.logger.error(
                            "Unable to create replay button for match",
                            i,
                          );
                    });
                }
              }
            },
            _addGeneralReplaysButtons: function () {
              const t = this.get("replayButtons");
              if (!(t.length > 0))
                if (
                  n.Replays.isGeneralReplaysEnabled() &&
                  this.get("areAllGeneralMatchesLoaded") &&
                  this.get("atLeastOneMatch")
                ) {
                  const e = this.$(
                    ".player-history-accessory-game-action",
                  ).toArray();
                  if (e.length > 0) {
                    const a = this.get("allGeneralMatches"),
                      s = (
                        Boolean(this.get("thirdPersonAccessibleGameQueues"))
                          ? this.get("thirdPersonAccessibleGameQueues").split(
                              ",",
                            )
                          : []
                      ).map(function (t) {
                        return parseInt(t, 10);
                      });
                    e.forEach((e, l) => {
                      const i = a[l];
                      if (
                        this.get("isThirdPersonView") &&
                        !s.includes(i.queueId)
                      )
                        return void n.logger.trace(
                          "Queue id for this game is not whitelisted, not adding replay button",
                        );
                      const o = n.Replays.createReplayButton({
                        gameId: i.get("gameId"),
                        gameVersion: i.get("gameVersion"),
                        gameType: i.get("gameType"),
                        queueId: i.get("queueId"),
                        gameCreation: i.get("gameCreation"),
                        gameDuration: i.get("gameDuration"),
                      });
                      o
                        ? (this.$(e).html(o.domNode), t.push(o))
                        : n.logger.error(
                            "Unable to create replay button for match",
                            i,
                          );
                    });
                  }
                } else
                  n.logger.trace("Not adding Replay buttons"),
                    n.logger.trace(
                      "replaysEnabled",
                      n.Replays.isGeneralReplaysEnabled(),
                    ),
                    n.logger.trace(
                      "areAllGeneralMatchesLoaded()",
                      this.get("areAllGeneralMatchesLoaded"),
                    ),
                    n.logger.trace(
                      "atLeastOneGeneralMatch",
                      this.get("atLeastOneGeneralMatch"),
                    );
            },
            destroyReplayButtons() {
              n.Lodash.forEach(this.get("replayButtons"), (t) => t.destroy()),
                (this.get("replayButtons").length = 0),
                n.Lodash.forEach(this.get("tftReplayButtons"), (t) =>
                  t.destroy(),
                ),
                (this.get("tftReplayButtons").length = 0);
            },
            actions: {
              clickWebMatchHistory: function () {
                return c.SFX.genericClickSm.play(), !0;
              },
              setMatchListSource(t) {
                this.set("activeMatchListName", t), this.destroyReplayButtons();
              },
            },
            _updateMatchTypeSubnavigation() {
              this.get("matchListTypes").setObjects([
                {
                  id: "general",
                  title: this.get("tra.MATCH_HISTORY_TITLE_GENERAL"),
                  defaultActive: !0,
                },
                {
                  id: "tft",
                  title: this.get("tra.MATCH_HISTORY_TITLE_TFT"),
                  defaultActive: !1,
                },
              ]);
            },
            _updateSummoner() {
              this.isDestroying ||
                this.isDestroyed ||
                this.get("api.platformConfig")
                  .get("v1/namespaces/NewMatchHistory/TftMatchHistoryEnabled")
                  .then((t) => {
                    null !== t && this.set("isTftMatchHistoryEnabled", t);
                    const e = this.get("puuid");
                    this.get("isTftMatchHistoryEnabled") && e
                      ? this._loadTftPlayerData(e)
                      : this.set("tftMatchesLoading", !1);
                  })
                  .finally(() => {
                    this.get("isThirdPersonView")
                      ? this.get("summoner") && this._loadFriendData()
                      : (this._loadCurrentPlayerData(
                          this.get("session.summonerId"),
                        ),
                        this.destroyReplayButtons());
                  });
            },
            _summonerObserver: n.Ember.observer("summoner", function () {
              this._updateSummoner();
            }),
            _endOfGameStateObserver: n.Ember.on("init", function () {
              (0, n.dataBinding)(
                "/lol-end-of-game",
                (0, n.getProvider)().getSocket(),
              ).observe("/v1/state", this, (t) => {
                t &&
                  "BeforeEndOfGame" === t.state &&
                  (this.get("generalMatchesLoading") ||
                    this.get("isThirdPersonView") ||
                    this._loadCurrentPlayerData(
                      this.get("summoner.summonerId"),
                      !0,
                    ));
              });
            }),
            calculateMatchResult: function (t) {
              const e = n.Lodash.get(t, "participant.win"),
                a = n.Lodash.get(
                  t,
                  "participant.stats.gameEndedInEarlySurrender",
                ),
                s = n.Lodash.get(t, "participant.stats.causedEarlySurrender"),
                l = n.Lodash.get(
                  t,
                  "participant.stats.earlySurrenderAccomplice",
                ),
                i = n.Lodash.get(t, "participant.stats.teamEarlySurrendered");
              return "Abort_AntiCheatExit" ===
                n.Lodash.get(t, "endOfGameResult")
                ? g
                : a && !s && !l
                  ? f
                  : a && i && s
                    ? _
                    : a && l
                      ? y
                      : e
                        ? T
                        : "DEFEAT";
            },
            calculateTitleClass: function (t) {
              const e = "defeat";
              return t === g
                ? "cheaterTerminated"
                : t === f
                  ? "earlySurrender"
                  : t === _ || t === y
                    ? e
                    : t === T
                      ? "victory"
                      : e;
            },
            calculateMatchResultTitle: function (t) {
              return t === g
                ? this.get("tra.MATCH_HISTORY_MATCH_RESULT_CHEATER_TERMINATED")
                : t === f
                  ? this.get("tra.MATCH_HISTORY_MATCH_RESULT_REMAKE")
                  : t === _
                    ? this.get("tra.MATCH_HISTORY_MATCH_RESULT_REMAKE_LEAVER")
                    : t === y
                      ? this.get(
                          "tra.MATCH_HISTORY_MATCH_RESULT_REMAKE_RESTRICTED",
                        )
                      : t === T
                        ? this.get("tra.MATCH_HISTORY_MATCH_RESULT_VICTORY")
                        : this.get("tra.MATCH_HISTORY_MATCH_RESULT_DEFEAT");
            },
            _formatChampMasteryIpXpDescription(t) {
              const e = [];
              return (
                t.champMastery && e.push(t.champMastery),
                t.ipDelta &&
                  e.push(
                    t.ipDelta + " " + this.get("tra.postgame_progress_ip"),
                  ),
                t.xpDelta &&
                  e.push(
                    t.xpDelta + " " + this.get("tra.postgame_progress_xp"),
                  ),
                e.length > 0 ? e.join(" / ") : null
              );
            },
            _enrichSummary(t, e, a, s) {
              const l = this.calculateMatchResult(t);
              let r = "";
              if (t.gameType === o.CUSTOM_GAME_TYPE)
                r = this.get("tra.MATCH_HISTORY_QUEUE_MODE_CUSTOM");
              else {
                const e = a.get(n.Lodash.get(t, "queueId"));
                (r = n.Lodash.get(e, "detailedDescription")),
                  r || (r = n.Lodash.get(e, "description"));
              }
              (t.titleInfo = {
                title: this.calculateMatchResultTitle(l),
                titleClass: this.calculateTitleClass(l),
                subTitle: r,
              }),
                (t.additionalInfo = {
                  mapName: n.Lodash.get(e.findBy("id", t.mapId), "name"),
                  duration: n.l10nDuration.formatSeconds(t.gameDuration),
                  creationTime: i.default.formatDate(
                    t.gameCreation,
                    this.get("tra.MATCH_DETAILS_GAME_CREATION_DATE_FORMAT"),
                    this.get("tra"),
                  ),
                });
              const c = s.get(t.gameId);
              if (c && c.platformDelta) {
                n.Lodash.assign(t.additionalInfo, {
                  ipDelta: c.platformDelta.ipDelta,
                }),
                  n.Lodash.assign(t.additionalInfo, {
                    xpDelta: c.platformDelta.xpDelta,
                  }),
                  c.champMastery &&
                    n.Lodash.assign(t.additionalInfo, {
                      champMastery: c.champMastery.grade,
                    });
                const e = this._formatChampMasteryIpXpDescription(
                  t.additionalInfo,
                );
                n.Lodash.assign(t.additionalInfo, { champMasteryIpXpDesc: e });
              }
              return t;
            },
            _loadCurrentPlayerData(t, e = !1) {
              return d
                .hashSettled({
                  matchListData: this.retrieveData(
                    "api.matchHistory",
                    "/v1/products/lol/current-summoner/matches",
                    { skipCache: !0 },
                  ),
                  deltas: this.retrieveData("api.matchHistory", "/v1/delta", {
                    skipCache: !0,
                  }),
                })
                .then((t) => {
                  this.get("isDestroyed") ||
                    (e ||
                    "fulfilled" === t.matchListData.state ||
                    "fulfilled" === t.deltas.state
                      ? "fulfilled" === t.deltas.state &&
                        this._updateDeltas(t.deltas.value)
                      : 404 === t.matchListData.reason.status ||
                          404 === t.deltas.reason.status
                        ? this.set("generalMatchesLoading", !1)
                        : this.showModal({
                            type: "DialogAlert",
                            data: {
                              contents: this.get(
                                "tra.MATCH_DETAILS_LOADING_ERROR",
                              ),
                              okText: this.get(
                                "tra.MATCH_DETAILS_LOADING_ERROR_CONFIRMATION",
                              ),
                              onOk: () => {
                                this.set("generalMatchesLoading", !1);
                              },
                            },
                          }),
                    this._updateMatches(t.matchListData.value),
                    t.matchListData.value &&
                      t.matchListData.value.platformId &&
                      this.set("acsAccountInfo", {
                        platformId: t.matchListData.value.platformId,
                        accountId: t.matchListData.value.accountId,
                      }),
                    this._updateMatchTypeSubnavigation(),
                    this.set("generalMatchesLoading", !1));
                });
            },
            _loadTftPlayerData(t, e = !1) {
              const a = this.get("tftDefaultSet"),
                n = a
                  ? `/v1/products/tft/${t}/matches?begin=0&count=20&tag=${a.SetCoreName}`
                  : `/v1/products/tft/${t}/matches?begin=0&count=20`;
              return d
                .hashSettled({
                  tftMatchListData: this.retrieveData("api.matchHistory", n, {
                    skipCache: !0,
                  }),
                })
                .then((t) => {
                  if (this.get("isDestroyed")) return;
                  if ("fulfilled" !== t.tftMatchListData.state)
                    return (
                      e ||
                        404 === t.tftMatchListData.reason.status ||
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
                        }),
                      this._updateMatchTypeSubnavigation(),
                      void this.set("tftMatchesLoading", !1)
                    );
                  const a = this._enrichTftGames(
                    t.tftMatchListData.value.games,
                  );
                  this.set("tftMatches", a), this.set("tftMatchesLoading", !1);
                });
            },
            _enrichTftGames(t) {
              return (
                n.Lodash.forEach(t, (t) => {
                  t &&
                    t.json &&
                    t.json.participants &&
                    (this._enrichGameVariation(t),
                    n.Lodash.forEach(t.json.participants, (e) => {
                      this._enrichUnits(e),
                        this._enrichTraits(t, e),
                        this._enrichAugments(e);
                    }));
                }),
                t
              );
            },
            _enrichUnits(t) {
              const e = this.get("tftChampionsByAlias"),
                a = this.get("tftItemsByName"),
                s = this.get("championsByAlias");
              n.Lodash.forEach(t.units, (t) => {
                let l = e.get(t.character_id.toLowerCase());
                if (l)
                  l.character_record
                    ? ((t.iconPath = l.character_record.squareIconPath),
                      (t.championName = l.character_record.display_name))
                    : ((t.iconPath = l.squareIconPath),
                      (t.championName = l.display_name));
                else {
                  const e = t.name.replace("TFT_", "").replace("TFT2_", "");
                  (l = s.get(e)),
                    l
                      ? ((t.iconPath = l.squarePortraitPath),
                        (t.championName = l.name))
                      : n.logger.trace("Unknown champion: " + t);
                }
                n.Lodash.forEach(t.itemNames, (e) => {
                  const s = a.get(e);
                  s &&
                    (t.equippedItems || (t.equippedItems = n.Ember.A([])),
                    t.equippedItems.pushObject(s));
                });
              }),
                t.units.sort((t, e) =>
                  t.tier > e.tier
                    ? -1
                    : t.tier < e.tier
                      ? 1
                      : t.itemNames &&
                          (!e.itemNames ||
                            t.itemNames.length > e.itemNames.length)
                        ? -1
                        : e.itemNames &&
                            (!t.itemNames ||
                              t.itemNames.length < e.itemNames.length)
                          ? 1
                          : t.rarity > e.rarity
                            ? -1
                            : t.rarity < e.rarity
                              ? 1
                              : t.name.localeCompare(e.name),
                );
            },
            _enrichTraits(t, e) {
              const a = this.get("tftTraitsById");
              "object" == typeof e.traits &&
                e.traits.length &&
                (n.Lodash.forEach(e.traits, (e) => {
                  if ("object" == typeof e) {
                    const n = a.get(e.name.toLowerCase());
                    n &&
                      ((e.name = n.display_name), (e.iconPath = n.icon_path)),
                      t.metadata.data_version >= 3
                        ? (e.rank = e.style)
                        : e.tier_current === e.tier_total
                          ? (e.rank = 3)
                          : 0 === e.tier_current
                            ? (e.rank = 0)
                            : 1 === e.tier_current
                              ? (e.rank = 1)
                              : (e.rank = 2);
                  }
                }),
                e.traits.sort((t, e) =>
                  t.rank === e.rank
                    ? 0
                    : t.rank > e.rank
                      ? -1
                      : t.rank < e.rank
                        ? 1
                        : t.name.localeCompare(e.name),
                ));
            },
            _enrichAugments(t) {
              if (t.augments) {
                const e = this.get("tftItemsByName");
                t.augments = t.augments.map((t) => e.get(t));
              }
            },
            _enrichGameVariation(t) {
              const e = this.get("tftGameVariationsByAlias");
              if (!t.json.game_variation) return;
              const a = e.get(t.json.game_variation.toLowerCase());
              a &&
                ((t.json.gameVariation = {}),
                (t.json.gameVariation.displayName =
                  a.game_variation_display_name),
                (t.json.gameVariation.iconPath = a.icon_path),
                (t.json.gameVariation.description =
                  a.game_variation_description));
            },
            _loadFriendData() {
              return d
                .hash({
                  matchListData: this.retrieveData(
                    "api.matchHistory",
                    `/v1/products/lol/${this.get("summoner.puuid")}/matches`,
                    { skipCache: !0 },
                  ),
                })
                .then(
                  (t) => {
                    this._updateMatches(t.matchListData),
                      this.set("acsAccountInfo", {
                        platformId: t.matchListData.platformId,
                        accountId: t.matchListData.accountId,
                      }),
                      this._updateMatchTypeSubnavigation(),
                      this.set("generalMatchesLoading", !1);
                  },
                  (t) => {
                    n.logger.error(
                      `Could not load your friend data because of ${JSON.stringify(t)}`,
                    ),
                      404 !== t.status
                        ? this.showModal({
                            type: "DialogAlert",
                            data: {
                              contents: this.get(
                                "tra.MATCH_DETAILS_LOADING_ERROR",
                              ),
                              okText: this.get(
                                "tra.MATCH_DETAILS_LOADING_ERROR_CONFIRMATION",
                              ),
                              onOk: () => {
                                this.set("generalMatchesLoading", !1);
                              },
                            },
                          })
                        : this.set("generalMatchesLoading", !1);
                  },
                );
            },
            _updateDeltas(t) {
              const e = n.Lodash.get(t, "deltas", []).reduce(
                (t, e) => t.set(e.gameId, e),
                new Map(),
              );
              this.set("deltas", e),
                n.logger.trace(`Setting deltas to ${JSON.stringify(e)}`);
            },
            _updateMatches(t) {
              const e = this.get("maps"),
                a = this.get("queues"),
                s = this.get("deltas"),
                l = n.Lodash.get(t, "games.games", []),
                i = r.default
                  .create({ games: l })
                  .get("matchSummaries")
                  .map((t) => this._enrichSummary(t, e, a, s));
              this.set("allGeneralMatches", n.Ember.A(i)),
                this.set("generalMatches", n.Ember.A(i.slice(0, 6))),
                this._updateGoldEarned(),
                n.Ember.run.scheduleOnce("afterRender", this, () => {
                  (this.get("generalMatches") || n.Ember.A()).pushObjects(
                    i.slice(6),
                  ),
                    this.set("areAllGeneralMatchesLoaded", !0);
                });
            },
            _updateGoldEarned() {
              this.get("allGeneralMatches").forEach((t) => {
                const { goldEarned: e } = t.participant,
                  a = this.get("tra.metadata.locale.id");
                t.participant.goldEarnedDisplay = i.default.formatGold(e, a);
              });
            },
          },
        );
      },
      (t, e, a) => {
        "use strict";
        var n = a(1);
        t.exports = n.Ember.Mixin.create({
          ModalManager: (0, n.getProvider)()
            .get("rcp-fe-lol-uikit")
            .getModalManager(),
          showModal: function (t) {
            const e = this.get("ModalManager").add(t);
            return (
              n.Ember.get(e, "data.onOk") && e.okPromise
                ? e.okPromise.then(t.data.onOk)
                : e.acceptPromise &&
                  e.acceptPromise
                    .then(() => {
                      n.Ember.get(e, "data.onAccept") && e.data.onAccept();
                    })
                    .catch(() => {
                      n.Ember.get(e, "data.onDecline") && e.data.onDecline();
                    }),
              e
            );
          },
          removeModal: function (t) {
            this.get("ModalManager").remove(t);
          },
        });
      },
      (t, e) => {
        "use strict";
        Object.defineProperty(e, "__esModule", { value: !0 }),
          (e.default = void 0);
        var a = {
          formatGold(t, e) {
            const a = e ? e.replace("_", "-") : "en-US",
              n = "ar-AE" === a ? "en-US" : a;
            return t.toLocaleString(n);
          },
          formatDate: (t, e, a) => a.moment(new Date(t)).format(e),
        };
        e.default = a;
      },
      (t, e, a) => {
        "use strict";
        Object.defineProperty(e, "__esModule", { value: !0 }),
          (e.default = void 0);
        var n,
          s = a(1),
          l = (n = a(12)) && n.__esModule ? n : { default: n };
        var i = s.Ember.Object.extend({
          matchSummaries: s.Ember.A(),
          games: s.Ember.A(),
          init() {
            this._super(this, arguments);
            const t = this.get("games").map((t) => new l.default(t)),
              e = s.Lodash.orderBy(t, ["gameCreation"], ["desc"]);
            this.set("matchSummaries", s.Ember.A(e));
          },
        });
        e.default = i;
      },
      (t, e, a) => {
        "use strict";
        Object.defineProperty(e, "__esModule", { value: !0 }),
          (e.default = void 0);
        var n,
          s = a(1),
          l = (n = a(13)) && n.__esModule ? n : { default: n };
        var i = s.Ember.Object.extend({
          gameId: 0,
          gameCreation: 0,
          gameDuration: 0,
          queueId: 0,
          mapId: 0,
          seasonId: 0,
          gameVersion: null,
          gameMode: null,
          gameType: null,
          participant: null,
          init() {
            if (
              (this._super(this, arguments),
              0 === arguments.length || !arguments[0])
            )
              return;
            const t = arguments[0];
            this.set("gameId", t.gameId),
              this.set("gameCreation", t.gameCreation),
              this.set("gameDuration", t.gameDuration),
              this.set("queueId", t.queueId),
              this.set("mapId", t.mapId),
              this.set("seasonId", t.seasonId),
              this.set("gameVersion", t.gameVersion),
              this.set("gameMode", t.gameMode),
              this.set("gameType", t.gameType);
            const e = new l.default(
              t.participants[0],
              t.participantIdentities[0],
            );
            this.set("participant", e);
          },
        });
        e.default = i;
      },
      (t, e, a) => {
        "use strict";
        Object.defineProperty(e, "__esModule", { value: !0 }),
          (e.default = void 0);
        var n = a(1);
        const s = a(14);
        var l = n.Ember.Object.extend({
          spellIds: n.Ember.computed("spell1Id", "spell2Id", function () {
            const t = [];
            return (
              n.Lodash.range(1, 3).forEach((e) => {
                t.push(this.get("spell" + e + "Id"));
              }),
              n.Ember.A(t)
            );
          }),
          itemIds: n.Ember.computed(
            "item0",
            "item1",
            "item2",
            "item3",
            "item4",
            "item5",
            "item6",
            function () {
              const t = [];
              return (
                n.Lodash.range(0, 7).forEach((e) => {
                  t.push(this.get("item" + e));
                }),
                n.Ember.A(t)
              );
            },
          ),
          minionsPlusNeutralMonstersCount: n.Ember.computed(
            "totalMinionsKilled",
            "neutralMinionsKilled",
            function () {
              return (
                this.get("totalMinionsKilled") +
                this.get("neutralMinionsKilled")
              );
            },
          ),
          init() {
            if (
              (this._super(this, arguments),
              2 === arguments.length && arguments[0] && arguments[1])
            ) {
              const [t, e] = arguments;
              this.set("puuid", t.puuid),
                this.set("participantId", t.participantId),
                this.set("teamId", t.teamId),
                this.set("championId", t.championId),
                this.set("spell1Id", t.spell1Id),
                this.set("spell2Id", t.spell2Id),
                this.set(
                  "highestAchievedSeasontier",
                  t.highestAchievedSeasontier,
                ),
                this.set("player", e.player);
              const a = n.Lodash.defaults({}, t.stats, s);
              n.Lodash.assign(this, a);
            } else
              n.logger.warning(
                `Could not create Participant instance - invalid arguments: ${arguments}`,
              );
          },
        });
        e.default = l;
      },
      (t) => {
        "use strict";
        t.exports = JSON.parse(
          '{"kills":"0","deaths":"0","assists":"0","largestKillingSpree":"0","largestMultiKill":"0","firstBloodKill":"0","totalDamageDealtToChampions":"0","physicalDamageDealtToChampions":"0","magicDamageDealtToChampions":"0","trueDamageDealtToChampions":"0","physicalDamageDealt":"0","totalDamageDealt":"0","magicDamageDealt":"0","trueDamageDealt":"0","largestCriticalStrike":"0","totalHeal":"0","totalHealsOnTeammates":"0","totalDamageShieldedOnTeammates":"0","totalDamageTaken":"0","physicalDamageTaken":"0","magicalDamageTaken":"0","trueDamageTaken":"0","damageSelfMitigated":"0","damageDealtToObjectives":"0","damageDealtToTurrets":"0","visionScore":"0","timeCCingOthers":"0","wardsPlaced":"0","wardsKilled":"0","sightWardsBoughtInGame":"0","visionWardsBoughtInGame":"0","goldEarned":"0","goldSpent":"0","totalMinionsKilled":"0","neutralMinionsKilled":"0","neutralMinionsKilledTeamJungle":"0","neutralMinionsKilledEnemyJungle":"0"}',
        );
      },
      (t, e, a) => {
        "use strict";
        Object.defineProperty(e, "__esModule", { value: !0 }), (e.SFX = void 0);
        const n = a(1).AudioPlugin.getChannel("sfx-ui");
        function s(t) {
          return n.createSound(t, { allowConcurrency: !1 });
        }
        const l = {
          genericClickSm: s(a(16)),
          gridClick: s(a(17)),
          gridHover: s(a(18)),
        };
        e.SFX = l;
      },
      (t, e, a) => {
        "use strict";
        t.exports = a.p + "sfx-uikit-generic-click-small.ogg";
      },
      (t, e, a) => {
        "use strict";
        t.exports = a.p + "sfx-uikit-grid-click.ogg";
      },
      (t, e, a) => {
        "use strict";
        t.exports = a.p + "sfx-uikit-grid-hover.ogg";
      },
      (t, e, a) => {
        "use strict";
        a.r(e);
      },
      (t, e, a) => {
        const n = a(1).Ember;
        t.exports = n.HTMLBars.template({
          id: "2ROqxsKR",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-match-history\\\\src\\\\components\\\\summary\\\\match-summary-root-component\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-match-history\\\\src\\\\components\\\\summary\\\\match-summary-root-component\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-match-history\\\\src\\\\components\\\\summary\\\\match-summary-root-component\\\\index.js\\" "],["text","\\n"],["open-element","div",[]],["static-attr","class","match-history"],["flush-element"],["text","\\n\\n"],["block",["if"],[["get",["isLoading"]]],null,13,12],["close-element"]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","            "],["append",["helper",["match-summary-recently-played-champions"],null,[["puuid","atLeastOneMatch","gameCount","areAllMatchesLoaded","champions","matches","masteries"],[["get",["puuid"]],["get",["atLeastOneGeneralMatch"]],["get",["gameCount"]],["get",["areAllGeneralMatchesLoaded"]],["get",["champions"]],["get",["allGeneralMatches"]],["get",["masteries"]]]]],false],["text","\\n"]],"locals":[]},{"statements":[["block",["if"],[["get",["atLeastOneGeneralMatch"]]],null,0]],"locals":[]},{"statements":[["text","          "],["comment"," NO-OP "],["text","\\n"]],"locals":[]},{"statements":[["text","          "],["comment"," no games for this player "],["text","\\n          "],["open-element","div",[]],["static-attr","class","match-history-wrapper loading-fade-in"],["flush-element"],["text","\\n            "],["open-element","div",[]],["static-attr","class","match-history-no-games-header"],["flush-element"],["append",["unknown",["tra","MATCH_HISTORY_SUMMARY_NO_GAMES_HEADER"]],false],["close-element"],["text","\\n            "],["open-element","div",[]],["static-attr","class","match-history-no-games-reason-header"],["flush-element"],["append",["unknown",["tra","MATCH_HISTORY_SUMMARY_NO_GAMES_REASON_HEADER"]],false],["close-element"],["text","\\n            "],["open-element","ul",[]],["static-attr","class","match-history-no-games-reason"],["flush-element"],["text","\\n              "],["open-element","li",[]],["flush-element"],["append",["unknown",["tra","MATCH_HISTORY_SUMMARY_NO_GAMES_REASON_1"]],false],["close-element"],["text","\\n              "],["open-element","li",[]],["flush-element"],["append",["unknown",["tra","MATCH_HISTORY_SUMMARY_NO_GAMES_REASON_2"]],false],["close-element"],["text","\\n              "],["open-element","li",[]],["flush-element"],["append",["unknown",["tra","MATCH_HISTORY_SUMMARY_NO_GAMES_REASON_3"]],false],["close-element"],["text","\\n            "],["close-element"],["text","\\n          "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","                  "],["append",["helper",["match-summary-general-match-summary"],null,[["champions","match","spells","items"],[["get",["champions"]],["get",["match"]],["get",["spells"]],["get",["items"]]]]],false],["text","\\n"]],"locals":["match"]},{"statements":[["block",["each"],[["get",["activeMatchList"]]],[["key"],["gameId"]],4]],"locals":[]},{"statements":[["text","                  "],["append",["helper",["tft-match-summary"],null,[["puuid","tftSets","companions","champions","match","spells","items","queues"],[["get",["puuid"]],["get",["tftSets"]],["get",["companions"]],["get",["champions"]],["get",["match"]],["get",["spells"]],["get",["items"]],["get",["queues"]]]]],false],["text","\\n"]],"locals":["match"]},{"statements":[["block",["each"],[["get",["activeMatchList"]]],[["key"],["gameId"]],6]],"locals":[]},{"statements":[["text","          "],["open-element","div",[]],["static-attr","class","match-history-wrapper loading-fade-in"],["flush-element"],["text","\\n"],["text","            "],["open-element","lol-uikit-scrollable",[]],["static-attr","class","match-history-list"],["static-attr","overflow-masks","enabled"],["flush-element"],["text","\\n"],["block",["if"],[["get",["isTftSelected"]]],null,7,5],["text","            "],["close-element"],["text","\\n          "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","              "],["open-element","lol-uikit-navigation-item",[]],["dynamic-attr","active",["unknown",["matchListType","defaultActive"]],null],["dynamic-attr","onclick",["helper",["action"],[["get",[null]],"setMatchListSource",["get",["matchListType","id"]]],null],null],["flush-element"],["append",["unknown",["matchListType","title"]],false],["close-element"],["text","\\n"]],"locals":["matchListType"]},{"statements":[["text","          "],["open-element","lol-uikit-navigation-bar",[]],["static-attr","type","tabbed"],["static-attr","selectedIndex","0"],["flush-element"],["text","\\n"],["block",["each"],[["get",["matchListTypes"]]],null,9],["text","          "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","      "],["open-element","div",[]],["static-attr","class","match-history-left"],["flush-element"],["text","\\n\\n\\n        "],["open-element","div",[]],["static-attr","class","match-history-left-title"],["flush-element"],["append",["unknown",["tra","MATCH_HISTORY_SUMMARY_RECENT_GAMES_LABEL"]],false],["close-element"],["text","\\n"],["block",["if"],[["get",["isTftMatchHistoryEnabled"]]],null,10],["text","\\n"],["block",["if"],[["get",["atLeastOneMatchInCategory"]]],null,8,3],["text","      "],["close-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","match-history-right"],["flush-element"],["text","\\n"],["block",["if"],[["get",["isTftSelected"]]],null,2,1],["text","      "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["block",["render-telemetry-sender"],null,[["renderEventName"],["profile-match-history-rendered"]],11]],"locals":[]},{"statements":[["text","    "],["open-element","div",[]],["static-attr","class","match-history-left-title"],["flush-element"],["append",["unknown",["tra","MATCH_HISTORY_SUMMARY_RECENT_GAMES_LABEL"]],false],["close-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","match-history-loading-icon-container"],["flush-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","match-history-loading-icon"],["flush-element"],["close-element"],["text","\\n    "],["close-element"],["text","\\n"]],"locals":[]}],"hasPartials":false}',
          meta: {},
        });
      },
      (t, e, a) => {
        "use strict";
        var n = a(1);
        a(22);
        var s,
          l = a(23),
          i = (s = a(24)) && s.__esModule ? s : { default: s };
        t.exports = n.Ember.Component.extend({
          layout: a(25),
          champRoleList: n.Ember.A([
            "fighter",
            "tank",
            "mage",
            "assassin",
            "support",
            "marksman",
          ]),
          classNames: ["match-summary-recently-played-champions-component"],
          didRender() {
            this._super(...arguments), this._setupRecentActivityTooltips();
          },
          showHighLightClass: n.Ember.computed(
            "lowSpecModeSettings",
            function () {
              const t = this.get("lowSpecModeSettings");
              return !Boolean(t && t.data && !0 === t.data.potatoModeEnabled);
            },
          ),
          currentLocale: n.Ember.computed(
            "tra.metadata.locale.id",
            function () {
              return (this.get("tra.metadata.locale.id") || "en_US").replace(
                "_",
                "-",
              );
            },
          ),
          champRoles: n.Ember.computed("matches", function () {
            const t = this.get("matches"),
              e = new Map();
            return (
              t.forEach((t) => {
                const { championId: a } = t.participant,
                  s = this.get("champions").get(a);
                s
                  ? e[s.roles[0]]
                    ? e[s.roles[0]]++
                    : (e[s.roles[0]] = 1)
                  : n.logger.error("Cannot find champ summary for id " + a);
              }),
              e
            );
          }),
          recentlyPlayedChamps: n.Ember.computed(
            "masteries",
            "matches",
            "champions",
            "areAllMatchesLoaded",
            "atLeastOneMatch",
            "currentLocale",
            function () {
              const t = this.get("matches"),
                e = this.get("masteries"),
                a = this.get("champions"),
                s = n.Lodash.keyBy(e, "championId");
              if (t && 0 !== t.length) {
                const e = {},
                  l = [];
                n.Lodash.forEach(t, (t) => {
                  const { championId: a } = t.participant;
                  if (e[a]) e[a].count++;
                  else {
                    const t = { champId: a, count: 1 };
                    (e[a] = t), l.push(t);
                  }
                });
                const o = (0, n.Lodash)(l)
                  .orderBy(["count"], ["desc"])
                  .take(3)
                  .map((e) => {
                    n.logger.trace(`Enriching champ ${JSON.stringify(e)}`);
                    return n.Lodash.assign({}, a.get(e.champId), {
                      id: e.champId,
                      percentage: (100 * e.count) / t.length,
                      mastery: n.Lodash.get(s, e.champId, {
                        championId: e.champId,
                        championLevel: 0,
                        championPoints: 0,
                        championPointsSinceLastLevel: 0,
                        championPointsUntilNextLevel: 0,
                      }),
                    });
                  })
                  .value();
                if (o.length < 3) {
                  const t = o.length;
                  (o.length = 3), o.fill({}, t, 3);
                }
                const r = this.get("currentLocale");
                return o.map((t) =>
                  t.mastery
                    ? {
                        ...t,
                        championName: t.name,
                        roleTitle: i.default.roleTitle([t, this.get("tra")]),
                        score: i.default.scoreDisplay([t, this.get("tra"), r]),
                        masteryProgress: i.default.masteryProgress([t]),
                        masteryLevel: i.default.championLevel([t]),
                        masteryBannerPath:
                          n.SharedChampionMasteryConstants.getMasteryBannerAsset(
                            t?.mastery?.championLevel,
                          ),
                      }
                    : t,
                );
              }
              return (
                n.logger.warning("return empty recent champ list"),
                n.Ember.A([{}, {}, {}])
              );
            },
          ),
          recentlyPlayedChampsBottomLabel: n.Ember.computed(
            "matches",
            function () {
              const t = this.get("matches");
              return t && t.length > 0
                ? this.get(
                    "tra.MATCH_HISTORY_SUMMARY_PERCENTAGE_OF_GAME_PLAYED_LABEL",
                  )
                : this.get(
                    "tra.MATCH_HISTORY_SUMMARY_GO_PLAY_SOME_GAMES_LABEL",
                  );
            },
          ),
          tooltipConfig: {
            targetAnchor: { x: "center", y: "top" },
            tooltipAnchor: { x: "center", y: "bottom" },
            offset: { x: 0, y: -2 },
          },
          _setupRecentActivityTooltips() {
            if (
              this.get("areAllMatchesLoaded") &&
              this.get("atLeastOneMatch")
            ) {
              const t = this.get("champRoleList"),
                e = this.get("champRoles"),
                a = this.get("gameCount"),
                s = this.$(".recent-activity-item").toArray();
              t.forEach((t, i) => {
                const o = s[i],
                  r = (0, l.recentActivityData)(t, e, a),
                  c = {
                    tra: this.get("tra"),
                    roleName: t,
                    champRolePercentage: r.champRolePercentage,
                  },
                  m = {
                    ComponentFactory: n.ComponentFactory,
                    targetAnchor: { x: "center", y: "top" },
                    tooltipAnchor: { x: "center", y: "bottom" },
                  };
                n.TooltipManager.assign(o, "ChampRolePercentageTooltip", c, m);
              });
            }
          },
          actions: {},
        });
      },
      (t, e, a) => {
        "use strict";
        a.r(e);
      },
      (t) => {
        "use strict";
        function e(t, e = new Map()) {
          if (t && e) {
            const a = e[t];
            return a || 0;
          }
          return 0;
        }
        function a(t = 0, e = 0) {
          return e > 0 ? Math.round((100 * t) / e) : 0;
        }
        t.exports = {
          roleGamesCount: e,
          rolePercentage: a,
          recentActivityData: function (t, n, s) {
            const l = e(t, n);
            return { roleCount: l, champRolePercentage: a(l, s) };
          },
        };
      },
      (t, e, a) => {
        "use strict";
        var n = a(1);
        const { Helper: s } = n.Ember;
        function l(t) {
          const [e, a, n = "en-US"] = t,
            { mastery: s } = e;
          return a && a.formatString && s
            ? a.formatString(
                "MATCH_HISTORY_SUMMARY_RECENT_MASTERY_TOOLTIP_POINTS",
                {
                  current: s.championPoints.toLocaleString(n),
                  next: (
                    s.championPoints + s.championPointsUntilNextLevel
                  ).toLocaleString(n),
                },
              )
            : "";
        }
        function i(t) {
          const [e] = t;
          if (e.mastery)
            return Math.round(
              (e.mastery.championPointsSinceLastLevel /
                (e.mastery.championPointsSinceLastLevel +
                  e.mastery.championPointsUntilNextLevel)) *
                100,
            );
        }
        function o(t) {
          const [e] = t;
          return e && e.percentage ? +e.percentage.toFixed(0) : null;
        }
        function r(t) {
          const [e] = t;
          if (e && e.mastery) {
            const t = e.mastery.championLevel,
              a = 10;
            return t ? Math.min(t, a) : 0;
          }
          return 0;
        }
        function c(t) {
          const [e, a] = t;
          if (e && e.roles) {
            const t = e.roles[0],
              n = e.mastery.championLevel;
            return n > 0 ? a.get(`champion_mastery_role_title_${t}_${n}`) : "";
          }
          return "";
        }
        t.exports = {
          scoreDisplay: l,
          masteryProgress: i,
          champPercentageDisplay: o,
          championLevel: r,
          roleTitle: c,
          scoreDisplayHelper: s.helper(l),
          masteryProgressHelper: s.helper(i),
          champPercentageDisplayHelper: s.helper(o),
          championLevelHelper: s.helper(r),
          roleTitleHelper: s.helper(c),
        };
      },
      (t, e, a) => {
        const n = a(1).Ember;
        t.exports = n.HTMLBars.template({
          id: "kevjPAoK",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-match-history\\\\src\\\\components\\\\summary\\\\match-summary-recently-played-champions-component\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-match-history\\\\src\\\\components\\\\summary\\\\match-summary-recently-played-champions-component\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-match-history\\\\src\\\\components\\\\summary\\\\match-summary-recently-played-champions-component\\\\index.js\\" "],["text","\\n\\n"],["block",["if"],[["get",["fullMatchHistoryUrl"]]],null,8],["text","  "],["open-element","div",[]],["static-attr","class","match-history-right-box"],["flush-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","right-box-title"],["flush-element"],["append",["unknown",["tra","MATCH_HISTORY_SUMMARY_RECENTLY_PLAYED_CHAMPS_LABEL"]],false],["close-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","recent-champs-list"],["flush-element"],["text","\\n"],["block",["each"],[["get",["recentlyPlayedChamps"]]],null,7],["text","    "],["close-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","recent-champ-notes"],["flush-element"],["append",["unknown",["recentlyPlayedChampsBottomLabel"]],false],["close-element"],["text","\\n  "],["close-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","match-history-right-box second-box"],["flush-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","right-box-title"],["flush-element"],["append",["unknown",["tra","MATCH_HISTORY_SUMMARY_RECENT_ACTIVITIES_LABEL"]],false],["close-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","recent-activity-list"],["flush-element"],["text","\\n"],["block",["each"],[["get",["champRoleList"]]],null,0],["text","    "],["close-element"],["text","\\n  "],["close-element"]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","        "],["append",["helper",["recent-activity"],null,[["roleName","index","champRoleMap","gameCount"],[["get",["roleName"]],["get",["index"]],["get",["champRoles"]],["get",["gameCount"]]]]],false],["text","\\n"]],"locals":["roleName","index"]},{"statements":[["text","              "],["open-element","div",[]],["static-attr","class","recent-champ-percent"],["flush-element"],["text","\\n                "],["open-element","span",[]],["static-attr","class","recent-champ-percent-number"],["flush-element"],["append",["helper",["champ-percentage-display"],[["get",["champ"]]],null],false],["close-element"],["text","%\\n              "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","                    "],["open-element","lol-uikit-champion-mastery-tooltip",[]],["dynamic-attr","name",["unknown",["champ","championName"]],null],["dynamic-attr","score",["unknown",["champ","score"]],null],["flush-element"],["text","\\n                      "],["open-element","lol-uikit-radial-progress",[]],["static-attr","slot","lol-uikit-radial-progress"],["static-attr","type","blue"],["dynamic-attr","percent",["unknown",["champ","masteryProgress"]],null],["flush-element"],["text","\\n                        "],["open-element","div",[]],["static-attr","slot","top"],["static-attr","class","top"],["flush-element"],["open-element","h4",[]],["flush-element"],["append",["unknown",["champ","masteryLevel"]],false],["close-element"],["close-element"],["text","\\n                      "],["close-element"],["text","\\n                    "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["block",["uikit-tooltip"],null,[["tooltipConfig"],[["get",["tooltipConfig"]]]],2]],"locals":[]},{"statements":[["text","                "],["append",["helper",["mastery-crest"],null,[["masteryLevel"],[["helper",["champion-level"],[["get",["champ"]]],null]]]],false],["text","\\n"]],"locals":[]},{"statements":[["text","                    "],["open-element","span",[]],["static-attr","class","recent-champ-placeholder"],["flush-element"],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","                    "],["open-element","img",[]],["dynamic-attr","src",["concat",[["unknown",["champ","squarePortraitPath"]]]]],["static-attr","alt",""],["static-attr","class","recent-champ-img"],["flush-element"],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","        "],["open-element","div",[]],["flush-element"],["text","\\n          "],["open-element","div",[]],["dynamic-attr","class",["concat",["recent-champ-item recent-champ-",["get",["champIndex"]]]]],["flush-element"],["text","\\n            "],["open-element","lol-uikit-champion-thumbnail",[]],["flush-element"],["text","\\n              "],["open-element","img",[]],["dynamic-attr","class",["concat",["lcm-champion-banner ",["helper",["unless"],[["get",["champ","masteryLevel"]],"no-mastery"],null]]]],["dynamic-attr","src",["concat",[["unknown",["champ","masteryBannerPath"]]]]],["flush-element"],["close-element"],["text","\\n              "],["open-element","div",[]],["static-attr","class","thumbnail-square"],["flush-element"],["text","\\n                "],["open-element","div",[]],["static-attr","class","recent-champ-portrait"],["flush-element"],["text","\\n"],["block",["if"],[["get",["champ","squarePortraitPath"]]],null,6,5],["text","                "],["close-element"],["text","\\n              "],["close-element"],["text","\\n              "],["open-element","div",[]],["dynamic-attr","class",["concat",["mastery-crest level-",["helper",["champion-level"],[["get",["champ"]]],null]]]],["flush-element"],["text","\\n"],["block",["if"],[["get",["champ","masteryLevel"]]],null,4],["text","              "],["close-element"],["text","\\n            "],["close-element"],["text","\\n              "],["open-element","div",[]],["static-attr","class","recent-champ-tooltip-anchor"],["flush-element"],["text","\\n"],["block",["if"],[["get",["champ","mastery"]]],null,3],["text","              "],["close-element"],["text","\\n"],["block",["if"],[["get",["champ","percentage"]]],null,1],["text","          "],["close-element"],["text","\\n        "],["close-element"],["text","\\n"]],"locals":["champ","champIndex"]},{"statements":[["text","    "],["open-element","a",[]],["dynamic-attr","href",["concat",[["unknown",["fullMatchHistoryUrl"]]]]],["static-attr","target","_new"],["static-attr","class","full-match-history-btn"],["dynamic-attr","onclick",["helper",["action"],[["get",[null]],"clickWebMatchHistory"],null],null],["flush-element"],["text","\\n      "],["append",["unknown",["tra","MATCH_HISTORY_SUMMARY_FULL_MATCH_HISTORY_LABEL"]],false],["text","\\n    "],["close-element"],["text","\\n"]],"locals":[]}],"hasPartials":false}',
          meta: {},
        });
      },
      (t, e, a) => {
        "use strict";
        var n = a(1);
        a(27);
        var s = a(15);
        t.exports = n.Ember.Component.extend({
          layout: a(28),
          classNames: ["match-summary-general-match-summary-component"],
          actions: {
            displayMatchDetails(t) {
              if (t && t.gameId) {
                s.SFX.gridClick.play();
                const { gameId: e } = t,
                  { participant: a } = t,
                  { additionalInfo: l } = t;
                this.get("isThirdPersonView")
                  ? n.MatchApi.displayMatchDetails({
                      gameId: e,
                      summonerId: a.player.summonerId,
                      defaultSection: "scoreboard",
                      sections: [
                        "overview",
                        "scoreboard",
                        "stats",
                        "graph",
                        "runes",
                      ],
                      dataSource: "legs",
                      closeModalCallback: (t) => {
                        this.isDestroying ||
                          this.isDestroyed ||
                          this.element.dispatchEvent(
                            new Event(t, { bubbles: !0 }),
                          );
                      },
                    })
                  : n.MatchApi.displayMatchDetails({
                      gameId: e,
                      summonerId: a.player.summonerId,
                      additionalInfo: l,
                      defaultSection: "scoreboard",
                      sections: [
                        "overview",
                        "scoreboard",
                        "stats",
                        "graph",
                        "runes",
                      ],
                      dataSource: "legs",
                    });
              }
            },
          },
        });
      },
      (t, e, a) => {
        "use strict";
        a.r(e);
      },
      (t, e, a) => {
        const n = a(1).Ember;
        t.exports = n.HTMLBars.template({
          id: "evGOEFNj",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-match-history\\\\src\\\\components\\\\summary\\\\match-summary-general-match-summary-component\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-match-history\\\\src\\\\components\\\\summary\\\\match-summary-general-match-summary-component\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-match-history\\\\src\\\\components\\\\summary\\\\match-summary-general-match-summary-component\\\\index.js\\" "],["text","\\n"],["open-element","div",[]],["dynamic-attr","class",["concat",["player-history-object-wrapper ",["helper",["if"],[["get",["showHighLightClass"]],"high-spec-highlight"],null]]]],["dynamic-attr","onclick",["helper",["action"],[["get",[null]],"displayMatchDetails",["get",["match"]]],null],null],["flush-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","player-history-champion"],["flush-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","player-history-champion-icon"],["flush-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","player-history-champion-icon-border"],["flush-element"],["close-element"],["text","\\n      "],["append",["helper",["champ-portrait"],null,[["champions","id"],[["get",["champions"]],["get",["match","participant","championId"]]]]],false],["text","\\n      "],["open-element","div",[]],["static-attr","class","player-history-champion-frame"],["flush-element"],["close-element"],["text","\\n    "],["close-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","player-history-lv"],["flush-element"],["append",["unknown",["match","participant","champLevel"]],false],["close-element"],["text","\\n  "],["close-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","player-history-result"],["flush-element"],["text","\\n\\n    "],["open-element","div",[]],["dynamic-attr","class",["concat",["player-history-result-text ",["unknown",["match","titleInfo","titleClass"]]]]],["flush-element"],["append",["unknown",["match","titleInfo","title"]],false],["close-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","player-history-mode"],["flush-element"],["append",["unknown",["match","titleInfo","subTitle"]],false],["close-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","player-history-team-name"],["flush-element"],["append",["unknown",["clubName"]],false],["close-element"],["text","\\n\\n    "],["open-element","div",[]],["static-attr","class","player-history-spells"],["flush-element"],["text","\\n"],["block",["each"],[["get",["match","participant","spellIds"]]],null,3],["text","    "],["close-element"],["text","\\n  "],["close-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","player-history-items"],["flush-element"],["text","\\n    "],["open-element","ul",[]],["static-attr","class","player-history-items-list"],["flush-element"],["text","\\n"],["block",["each"],[["get",["match","participant","itemIds"]]],null,2],["text","    "],["close-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","player-history-stats"],["flush-element"],["text","\\n      "],["open-element","span",[]],["static-attr","class","player-history-stats-kills"],["flush-element"],["text","\\n        "],["open-element","span",[]],["dynamic-attr","class",["concat",[["helper",["if"],[["get",["match","participant","mostKills"]],"player-history-stats-highest-value"],null]]]],["flush-element"],["append",["unknown",["match","participant","kills"]],false],["close-element"],["text","\\n        /"],["open-element","span",[]],["flush-element"],["append",["unknown",["match","participant","deaths"]],false],["close-element"],["text","\\n        /"],["open-element","span",[]],["dynamic-attr","class",["concat",[["helper",["if"],[["get",["match","participant","mostAssists"]],"player-history-stats-highest-value"],null]]]],["flush-element"],["append",["unknown",["match","participant","assists"]],false],["close-element"],["text","\\n      "],["close-element"],["text","\\n      "],["open-element","span",[]],["dynamic-attr","class",["concat",["player-history-stats-minions ",["helper",["if"],[["get",["match","participant","mostMinionKills"]],"player-history-stats-highest-value"],null]]]],["flush-element"],["append",["unknown",["match","participant","minionsPlusNeutralMonstersCount"]],false],["close-element"],["text","\\n      "],["open-element","span",[]],["dynamic-attr","class",["concat",["player-history-stats-gold ",["helper",["if"],[["get",["match","participant","mostGoldEarned"]],"player-history-stats-highest-value"],null]]]],["flush-element"],["append",["unknown",["match","participant","goldEarnedDisplay"]],false],["close-element"],["text","\\n    "],["close-element"],["text","\\n  "],["close-element"],["text","\\n\\n"],["block",["if"],[["get",["match","additionalInfo"]]],null,1],["close-element"],["text","\\n"]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["open-element","div",[]],["static-attr","class","player-history-ip"],["flush-element"],["append",["unknown",["match","additionalInfo","champMasteryIpXpDesc"]],false],["close-element"]],"locals":[]},{"statements":[["text","    "],["open-element","div",[]],["static-attr","class","player-history-others"],["flush-element"],["text","\\n      "],["block",["if"],[["get",["match","additionalInfo","champMasteryIpXpDesc"]]],null,0],["text","\\n      "],["open-element","div",[]],["static-attr","class","player-history-map"],["flush-element"],["append",["unknown",["match","additionalInfo","mapName"]],false],["close-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","player-history-date"],["flush-element"],["append",["unknown",["match","additionalInfo","duration"]],false],["open-element","span",[]],["static-attr","class","inline-bullet"],["flush-element"],["text","•"],["close-element"],["append",["unknown",["match","additionalInfo","creationTime"]],false],["close-element"],["text","\\n    "],["close-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","player-history-accessory-game-action"],["flush-element"],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","        "],["open-element","li",[]],["static-attr","class","player-history-item"],["flush-element"],["text","\\n          "],["append",["helper",["spell-item-icon"],null,[["ref","id","class"],[["get",["items"]],["get",["itemId"]],"player-history-item-pic"]]],false],["text","\\n        "],["close-element"],["text","\\n"]],"locals":["itemId"]},{"statements":[["text","        "],["append",["helper",["spell-item-icon"],null,[["ref","id","class"],[["get",["spells"]],["get",["spellId"]],"player-history-spell-pic"]]],false],["text","\\n"]],"locals":["spellId"]}],"hasPartials":false}',
          meta: {},
        });
      },
      (t, e, a) => {
        "use strict";
        var n = a(1);
        a(30);
        t.exports = n.Ember.Component.extend({
          layout: a(31),
          match: null,
          classNames: ["tft-match-summary-component"],
          classNameBindings: ["isPair:pair"],
          matchData: n.Ember.computed.alias("match.json"),
          gameType: n.Ember.computed.alias("matchData.tft_game_type"),
          metadata: n.Ember.computed.alias("match.metadata"),
          companionIcon: n.Ember.computed.alias("matchCompanion.loadoutsIcon"),
          currentPlayerLevel: n.Ember.computed.alias("currentPlayer.level"),
          modeText: n.Ember.computed(
            "matchData.queue_id",
            "metadata.tags.[]",
            "queues",
            function () {
              const t = this.get("queues").get(this.get("matchData.queue_id"));
              if (t) return t.description;
              return this.get("metadata.tags").includes("ranked")
                ? this.get("tra.MATCH_HISTORY_TFT_RANKED")
                : this.get("tra.MATCH_HISTORY_TFT_NORMAL");
            },
          ),
          units: n.Ember.computed.alias("currentPlayer.units"),
          unitPlaceholders: n.Ember.computed("units.length", function () {
            const t = this.get("units.length");
            if (t >= 10) return n.Ember.A();
            const e = 10 - t,
              a = n.Ember.A();
            for (let t = 0; t < e; t++) a.push(t);
            return a;
          }),
          isPair: n.Ember.computed("gameType", function () {
            return "pairs" === this.get("gameType");
          }),
          placement: n.Ember.computed(
            "currentPlayer.placement",
            "isPair",
            function () {
              return this.get("isPair")
                ? Math.ceil(this.get("currentPlayer.placement") / 2)
                : this.get("currentPlayer.placement");
            },
          ),
          placementText: n.Ember.computed("placement", function () {
            return this.get(
              "tra.MATCH_HISTORY_TFT_PLACEMENT_" + this.get("placement"),
            );
          }),
          augmentContainer: n.Ember.computed(
            "matchData.tft_set_core_name",
            "tftSets.@each.SetCoreName",
            function () {
              const t = this.get("matchData.tft_set_core_name"),
                e = this.get("tftSets").find((e) => e.SetCoreName === t) || {};
              return {
                name: e.SetAugmentName || "",
                icon: e.SetAugmentContainer || "",
              };
            },
          ),
          matchLength: n.Ember.computed(
            "matchData.game_length",
            "matchData.game_datetime",
            function () {
              const t = this.get("matchData.game_length"),
                e = ~~(t / 3600),
                a = ~~((t % 3600) / 60),
                n = ~~t % 60;
              let s = "";
              return (
                e > 0 && (s += e + ":" + (a < 10 ? "0" : "")),
                (s += a + ":" + (n < 10 ? "0" : "")),
                (s += "" + n),
                s
              );
            },
          ),
          matchDate: n.Ember.computed("matchData.game_datetime", function () {
            return this.get("tra")
              .moment(parseInt(this.get("matchData.game_datetime")))
              .format("L");
          }),
          matchCompanion: n.Ember.computed(
            "companions",
            "currentPlayer.companion.content_ID",
            function () {
              const t = this.get("companions"),
                e = this.get("currentPlayer.companion.content_ID");
              if (!t || !e) return null;
              let a;
              return (
                t.groups.every((t) =>
                  t.items.every((t) =>
                    t.contentId === e
                      ? ((a = [t]), !1)
                      : ((a = t.upgrades.filter(function (t) {
                          return t.contentId === e;
                        })),
                        0 === a.length),
                  ),
                ),
                a.length > 0 ? a[0] : null
              );
            },
          ),
          currentPlayer: n.Ember.computed(
            "matchData.participants",
            "puuid",
            function () {
              const t = this.get("matchData.participants"),
                e = this.get("puuid"),
                a = t.filter(function (t) {
                  return t.puuid === e;
                });
              return a.length > 0 ? a[0] : null;
            },
          ),
          actions: { displayMatchDetails(t) {} },
        });
      },
      (t, e, a) => {
        "use strict";
        a.r(e);
      },
      (t, e, a) => {
        const n = a(1).Ember;
        t.exports = n.HTMLBars.template({
          id: "fHJ+EV7r",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-match-history\\\\src\\\\components\\\\summary\\\\tft-match-summary-component\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-match-history\\\\src\\\\components\\\\summary\\\\tft-match-summary-component\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-match-history\\\\src\\\\components\\\\summary\\\\tft-match-summary-component\\\\index.js\\" "],["text","\\n"],["open-element","div",[]],["dynamic-attr","class",["concat",["match-summary-little-legends-container placement_",["unknown",["placement"]]]]],["flush-element"],["text","\\n     "],["open-element","div",[]],["static-attr","class","player-history-champion"],["flush-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","player-history-champion-icon"],["flush-element"],["text","\\n        "],["open-element","div",[]],["static-attr","class","player-history-champion-icon-border"],["flush-element"],["close-element"],["text","\\n        "],["open-element","img",[]],["static-attr","class","match-summary-little-legends-img"],["dynamic-attr","src",["unknown",["companionIcon"]],null],["flush-element"],["close-element"],["text","\\n        "],["open-element","div",[]],["static-attr","class","player-history-champion-frame"],["flush-element"],["close-element"],["text","\\n      "],["close-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","player-history-lv"],["flush-element"],["append",["unknown",["currentPlayerLevel"]],false],["close-element"],["text","\\n    "],["close-element"],["text","\\n"],["close-element"],["text","\\n\\n"],["open-element","div",[]],["static-attr","class","match-summary-player-stats"],["flush-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","match-summary-placement-display"],["flush-element"],["append",["unknown",["placementText"]],false],["close-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","match-summary-details"],["flush-element"],["text","\\n        "],["append",["unknown",["modeText"]],false],["text"," ● "],["append",["unknown",["matchLength"]],false],["text","\\n    "],["close-element"],["text","\\n"],["block",["if"],[["get",["matchData","gameVariation"]]],null,13],["text","    "],["open-element","div",[]],["static-attr","class","match-summary-details"],["flush-element"],["text","\\n        "],["append",["unknown",["matchDate"]],false],["text","\\n    "],["close-element"],["text","\\n"],["close-element"],["text","\\n\\n"],["block",["if"],[["get",["currentPlayer","augments"]]],null,10],["text","\\n"],["open-element","div",[]],["static-attr","class","match-summary-right"],["flush-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","match-summary-champions-in-play"],["flush-element"],["text","\\n"],["block",["each"],[["get",["units"]]],[["key"],["name"]],6],["text","    "],["close-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","match-summary-traits"],["flush-element"],["text","\\n"],["block",["each"],[["get",["currentPlayer","traits"]]],[["key"],["name"]],2],["text","    "],["close-element"],["text","\\n"],["close-element"],["text","\\n"]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","                        "],["open-element","lol-uikit-content-block",[]],["static-attr","type","tooltip-system"],["static-attr","class","match-summary-tft-tooltip"],["flush-element"],["text","\\n                            "],["open-element","p",[]],["flush-element"],["append",["unknown",["trait","name"]],false],["close-element"],["text","\\n                        "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","                "],["open-element","div",[]],["dynamic-attr","class",["concat",["match-summary-trait-img-bg trait_level_",["unknown",["trait","rank"]]]]],["flush-element"],["text","\\n                    "],["open-element","img",[]],["dynamic-attr","class",["concat",["match-summary-trait-img ",["unknown",["trait","name"]]]]],["dynamic-attr","src",["unknown",["trait","iconPath"]],null],["flush-element"],["close-element"],["text","\\n"],["block",["match-history-tooltip"],null,[["direction","tooltipId"],["bottom","match-summary-tft-trait-tooltip"]],0],["text","                "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["block",["if"],[["get",["trait","tier_current"]]],null,1]],"locals":["trait","index"]},{"statements":[["text","                                "],["open-element","lol-uikit-content-block",[]],["static-attr","type","tooltip-system"],["static-attr","class","match-summary-tft-tooltip"],["flush-element"],["text","\\n                                    "],["open-element","p",[]],["flush-element"],["append",["unknown",["item","name"]],false],["close-element"],["text","\\n                                "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","                        "],["open-element","div",[]],["static-attr","class","match-history-tft-player-piece-item"],["dynamic-attr","style",["concat",["background-image: url(",["unknown",["item","squareIconPath"]],");"]]],["flush-element"],["text","\\n"],["block",["match-history-tooltip"],null,[["direction","tooltipId"],["bottom","match-summary-tft-champion-tooltip"]],3],["text","                        "],["close-element"],["text","\\n"]],"locals":["item"]},{"statements":[["text","                        "],["open-element","lol-uikit-content-block",[]],["static-attr","type","tooltip-system"],["static-attr","class","match-summary-tft-tooltip"],["flush-element"],["text","\\n                            "],["open-element","p",[]],["flush-element"],["append",["unknown",["unit","championName"]],false],["close-element"],["text","\\n                        "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","            "],["open-element","div",[]],["dynamic-attr","class",["concat",["tft-player-piece piece-level-",["unknown",["unit","tier"]]]]],["flush-element"],["text","\\n                "],["open-element","div",[]],["static-attr","class","piece-inner-border"],["dynamic-attr","style",["concat",["background-image: url(",["unknown",["unit","iconPath"]],");"]]],["flush-element"],["text","\\n"],["block",["match-history-tooltip"],null,[["direction","tooltipId"],["bottom","match-summary-tft-champion-tooltip"]],5],["text","                "],["close-element"],["text","\\n\\n                 "],["open-element","div",[]],["static-attr","class","match-history-tft-player-piece-item-container"],["flush-element"],["text","\\n"],["block",["each"],[["get",["unit","equippedItems"]]],null,4],["text","                "],["close-element"],["text","\\n            "],["close-element"],["text","\\n\\n\\n"]],"locals":["unit","index"]},{"statements":[["text","                        "],["open-element","lol-uikit-content-block",[]],["static-attr","type","tooltip-system"],["static-attr","class","match-summary-tft-tooltip"],["flush-element"],["text","\\n                            "],["open-element","p",[]],["flush-element"],["append",["unknown",["augment","name"]],false],["close-element"],["text","\\n                        "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","                "],["open-element","div",[]],["static-attr","class","match-summary-augment-icon"],["dynamic-attr","style",["concat",["background-image: url(",["unknown",["augment","squareIconPath"]],");"]]],["flush-element"],["text","\\n"],["block",["match-history-tooltip"],null,[["direction","tooltipId"],["bottom","match-summary-augment-tooltip"]],7],["text","                "],["close-element"],["text","\\n"]],"locals":["augment"]},{"statements":[["text","                "],["open-element","lol-uikit-content-block",[]],["static-attr","type","tooltip-system"],["static-attr","class","match-summary-tft-tooltip"],["flush-element"],["text","\\n                    "],["open-element","p",[]],["flush-element"],["append",["unknown",["augmentContainer","name"]],false],["close-element"],["text","\\n                "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","    "],["open-element","div",[]],["static-attr","class","match-summary-augment"],["flush-element"],["text","\\n        "],["open-element","div",[]],["static-attr","class","match-summary-augment-inner"],["dynamic-attr","style",["concat",["background-image: url(",["unknown",["augmentContainer","icon"]],");"]]],["flush-element"],["text","\\n"],["block",["match-history-tooltip"],null,[["direction","tooltipId"],["top","match-summary-augment-tooltip"]],9],["text","        "],["close-element"],["text","\\n        "],["open-element","div",[]],["static-attr","class","match-summary-augment-icon-container"],["flush-element"],["text","\\n"],["block",["each"],[["get",["currentPlayer","augments"]]],null,8],["text","        "],["close-element"],["text","\\n    "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","                    "],["open-element","lol-uikit-content-block",[]],["static-attr","type","tooltip-system"],["static-attr","class","match-summary-tft-tooltip"],["flush-element"],["text","\\n                        "],["open-element","p",[]],["flush-element"],["append",["unknown",["matchData","gameVariation","description"]],false],["close-element"],["text","\\n                    "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["block",["match-history-tooltip"],null,[["direction","tooltipId"],["bottom","match-summary-tft-trait-tooltip"]],11]],"locals":[]},{"statements":[["text","        "],["open-element","div",[]],["static-attr","class","match-summary-details"],["flush-element"],["text","\\n            "],["append",["unknown",["matchData","gameVariation","displayName"]],false],["text","\\n            "],["open-element","lol-uikit-info-icon",[]],["static-attr","class","match-summary-set-mechanic-tooltip-icon"],["flush-element"],["close-element"],["text","\\n"],["block",["if"],[["get",["matchData","gameVariation","description"]]],null,12],["text","        "],["close-element"],["text","\\n"]],"locals":[]}],"hasPartials":false}',
          meta: {},
        });
      },
      (t, e, a) => {
        "use strict";
        var n = (function (t, e) {
          if (!e && t && t.__esModule) return t;
          if (null === t || ("object" != typeof t && "function" != typeof t))
            return { default: t };
          var a = s(e);
          if (a && a.has(t)) return a.get(t);
          var n = {},
            l = Object.defineProperty && Object.getOwnPropertyDescriptor;
          for (var i in t)
            if ("default" !== i && Object.prototype.hasOwnProperty.call(t, i)) {
              var o = l ? Object.getOwnPropertyDescriptor(t, i) : null;
              o && (o.get || o.set)
                ? Object.defineProperty(n, i, o)
                : (n[i] = t[i]);
            }
          (n.default = t), a && a.set(t, n);
          return n;
        })(a(1));
        function s(t) {
          if ("function" != typeof WeakMap) return null;
          var e = new WeakMap(),
            a = new WeakMap();
          return (s = function (t) {
            return t ? a : e;
          })(t);
        }
        const l = n.Ember.Component.extend({
          layout: a(33),
          classNames: ["champ-role-percentage-tooltip"],
          roleName: "",
          champRolePercentage: 0,
          localizedRoleName: n.Ember.computed(
            "tra.metadata",
            "roleName",
            function () {
              const t = this.get("roleName").toUpperCase();
              return this.get(`tra.MATCH_HISTORY_SUMMARY_RECENT_ROLE_${t}`);
            },
          ),
          localizedChampRolePercentage: n.Ember.computed(
            "tra.metadata",
            "champRolePercentage",
            function () {
              const t = this.get("champRolePercentage");
              return this.get("tra").formatString(
                "MATCH_HISTORY_SUMMARY_PLAYED_GAMES_PERCENTAGE",
                { percentage: t },
              );
            },
          ),
        });
        n.default &&
          n.default.EmberApplicationFactory.setFactoryDefinition({
            name: "ChampRolePercentageTooltip",
            ChampRolePercentageTooltipComponent: l,
            ComponentFactory: n.default.ComponentFactory,
          }),
          (t.exports = l);
      },
      (t, e, a) => {
        const n = a(1).Ember;
        t.exports = n.HTMLBars.template({
          id: "ofi94mBP",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-match-history\\\\src\\\\components\\\\summary\\\\champ-role-percentage-tooltip-component\\\\layout.hbs\\" style-path=\\"null\\" js-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-match-history\\\\src\\\\components\\\\summary\\\\champ-role-percentage-tooltip-component\\\\index.js\\" "],["text","\\n"],["open-element","lol-uikit-tooltip",[]],["flush-element"],["text","\\n  "],["open-element","lol-uikit-content-block",[]],["static-attr","type","tooltip-small"],["flush-element"],["text","\\n    "],["open-element","h6",[]],["flush-element"],["append",["unknown",["localizedRoleName"]],false],["close-element"],["text","\\n    "],["open-element","p",[]],["flush-element"],["append",["unknown",["localizedChampRolePercentage"]],false],["close-element"],["text","\\n  "],["close-element"],["text","\\n"],["close-element"],["text","\\n"]],"locals":[],"named":[],"yields":[],"blocks":[],"hasPartials":false}',
          meta: {},
        });
      },
      (t, e, a) => {
        "use strict";
        var n = a(1);
        t.exports = n.Ember.Component.extend({
          layout: a(35),
          champion: n.Ember.computed("champions", "id", function () {
            const t = this.get("champions"),
              e = this.get("id");
            return t && e ? t.get(e) : null;
          }),
        });
      },
      (t, e, a) => {
        const n = a(1).Ember;
        t.exports = n.HTMLBars.template({
          id: "5YoKz9wQ",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-match-history\\\\src\\\\components\\\\summary\\\\champ-portrait-component\\\\layout.hbs\\" style-path=\\"null\\" js-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-match-history\\\\src\\\\components\\\\summary\\\\champ-portrait-component\\\\index.js\\" "],["text","\\n"],["block",["if"],[["get",["champion"]]],null,1,0]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","  "],["open-element","img",[]],["static-attr","class","no-champ-icon"],["flush-element"],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","  "],["open-element","img",[]],["dynamic-attr","src",["concat",[["unknown",["champion","squarePortraitPath"]]]]],["static-attr","alt",""],["static-attr","class","player-history-champion-pic"],["flush-element"],["close-element"],["text","\\n"]],"locals":[]}],"hasPartials":false}',
          meta: {},
        });
      },
      (t, e, a) => {
        "use strict";
        var n = a(1);
        t.exports = n.Ember.Component.extend({
          layout: a(37),
          item: n.Ember.computed("ref", "id", function () {
            const t = this.get("ref"),
              e = this.get("id");
            return t && e ? t.get(e) : null;
          }),
        });
      },
      (t, e, a) => {
        const n = a(1).Ember;
        t.exports = n.HTMLBars.template({
          id: "rN3beae2",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-match-history\\\\src\\\\components\\\\summary\\\\spell-item-icon-component\\\\layout.hbs\\" style-path=\\"null\\" js-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-match-history\\\\src\\\\components\\\\summary\\\\spell-item-icon-component\\\\index.js\\" "],["text","\\n"],["block",["if"],[["get",["item"]]],null,0]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","  "],["open-element","img",[]],["dynamic-attr","src",["concat",[["unknown",["item","iconPath"]]]]],["static-attr","alt",""],["dynamic-attr","class",["concat",[["unknown",["class"]]]]],["flush-element"],["close-element"],["text","\\n"]],"locals":[]}],"hasPartials":false}',
          meta: {},
        });
      },
      (t, e, a) => {
        "use strict";
        var n = a(1),
          s = a(23);
        t.exports = n.Ember.Component.extend({
          layout: a(39),
          champRolePercentage: n.Ember.computed(
            "roleName",
            "champRoleMap",
            "gameCount",
            function () {
              const t = this.get("roleName"),
                e = this.get("champRoleMap"),
                a = this.get("gameCount");
              return (0, s.recentActivityData)(t, e, a).champRolePercentage;
            },
          ),
        });
      },
      (t, e, a) => {
        const n = a(1).Ember;
        t.exports = n.HTMLBars.template({
          id: "wXjQBNxS",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-match-history\\\\src\\\\components\\\\summary\\\\recent-activity-component\\\\layout.hbs\\" style-path=\\"null\\" js-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-match-history\\\\src\\\\components\\\\summary\\\\recent-activity-component\\\\index.js\\" "],["text","\\n"],["open-element","div",[]],["dynamic-attr","class",["concat",["recent-activity-item item-",["unknown",["index"]]]]],["flush-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","recent-activity-bar"],["flush-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","recent-activity-fill"],["dynamic-attr","style",["concat",["height: ",["unknown",["champRolePercentage"]],"%"]]],["flush-element"],["close-element"],["text","\\n  "],["close-element"],["text","\\n  "],["open-element","div",[]],["dynamic-attr","class",["concat",["recent-activity-icon ",["unknown",["roleName"]],"-icon"]]],["flush-element"],["close-element"],["text","\\n"],["close-element"],["text","\\n"]],"locals":[],"named":[],"yields":[],"blocks":[],"hasPartials":false}',
          meta: {},
        });
      },
      (t, e, a) => {
        "use strict";
        Object.defineProperty(e, "__esModule", { value: !0 }),
          (e.default = void 0);
        var n = a(1);
        const s = {
            targetAnchor: { x: "center", y: "top" },
            tooltipAnchor: { x: "center", y: "bottom" },
            tooltipDirection: "top",
          },
          l = {
            targetAnchor: { x: "center", y: "bottom" },
            tooltipAnchor: { x: "center", y: "top" },
            tooltipDirection: "bottom",
          };
        var i = n.Ember.Component.extend({
          classNames: ["match-history-tooltip"],
          layout: a(41),
          toolTipAttached: !1,
          tooltipOptions: s,
          tooltipSetup() {
            const t = this.toolTipAttached;
            if (
              ((this.tooltipHoverElement = this.element.parentElement),
              !t && this.tooltipHoverElement)
            ) {
              const t = this.get("tooltipId");
              (this.tooltipElement = this.element.querySelector(
                `#match-history-tooltip-${t}`,
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
            const t = "bottom" === this.get("direction") ? l : s;
            n.TooltipManager.assign(
              this.tooltipHoverElement,
              this.tooltipElement,
              null,
              t,
            );
          },
          detachTooltip: function () {
            n.TooltipManager.unassign(this.tooltipHoverElement);
          },
        });
        e.default = i;
      },
      (t, e, a) => {
        const n = a(1).Ember;
        t.exports = n.HTMLBars.template({
          id: "kR3dy1Zj",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-match-history\\\\src\\\\components\\\\summary\\\\match-history-tooltip-component\\\\layout.hbs\\" style-path=\\"null\\" js-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-match-history\\\\src\\\\components\\\\summary\\\\match-history-tooltip-component\\\\index.js\\" "],["text","\\n"],["open-element","lol-uikit-tooltip",[]],["dynamic-attr","id",["concat",["match-history-tooltip-",["unknown",["tooltipId"]]]]],["flush-element"],["text","\\n  "],["yield","default"],["text","\\n"],["close-element"],["text","\\n"]],"locals":[],"named":[],"yields":["default"],"blocks":[],"hasPartials":false}',
          meta: {},
        });
      },
      (t) => {
        "use strict";
        function e(t) {
          const a = {};
          for (const n in t)
            "object" == typeof t[n] ? (a[n] = e(t[n])) : (a[n] = t[n]);
          return a;
        }
        function a(t, e, a) {
          const { regions: n, region: s, locale: l } = t.metadata();
          if ((a = a.get("metadata." + e)) && "region" === e && a.id !== s.id) {
            const e = n[a.id],
              s = e.defaultLocale
                ? e.defaultLocale.id
                : e.availableLocales[0].id;
            t.setLocale(s, a.id);
          } else a && "locale" === e && a.id !== l.id && t.setLocale(a.id);
        }
        t.exports = function (t, n, s) {
          let l;
          const i = { metadata: !0, moment: !0 };
          return (
            (n = n.observe(() => {
              if (l) {
                const t = e(n.metadata());
                l.set("metadata", t),
                  l.beginPropertyChanges(),
                  Object.keys(i).forEach((t) => {
                    l.propertyWillChange(t), l.propertyDidChange(t);
                  }),
                  l.endPropertyChanges();
              }
            })),
            (l = t.Service.extend({
              _tra: null,
              init() {
                this.wrapTra(n);
              },
              wrapTra(t) {
                t &&
                  ((this._tra = t),
                  this.set("metadata", e(this._tra.metadata())),
                  (this.setLocale = this._tra.setLocale.bind(this._tra)),
                  (this.formatString = this._tra.formatString.bind(this._tra)),
                  (this.moment = this._tra.moment.bind(this._tra)),
                  (this.ready = this._tra.ready.bind(this._tra)),
                  (this.exists = this._tra.exists.bind(this._tra)),
                  (this.getAsync = this._tra.getAsync.bind(this._tra)),
                  (this.existsAsync = this._tra.existsAsync.bind(this._tra)),
                  (this.numeral = this._tra.numeral.bind(this._tra)));
              },
              unknownProperty(t) {
                return (i[t] = !0), this._tra.get(t);
              },
              willDestroy: () => this._tra.unregister(),
              addOverlays: function (t) {
                let e = this._tra;
                for (const a of t) e = e.overlay(a);
                e && this.wrapTra(e);
              },
            }).create()),
            l.set("service", l),
            l.addObserver("metadata.region", a.bind(null, n, "region")),
            l.addObserver("metadata.locale", a.bind(null, n, "locale")),
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
      (t, e, a) => {
        "use strict";
        var n,
          s = (n = a(42)) && n.__esModule ? n : { default: n },
          l = a(1);
        class i {
          constructor(t, e) {
            l.logger.trace("Creating Match Details Ember application");
            const a = e
                .overlay("/fe/lol-l10n/trans.json")
                .overlay("/fe/lol-shared-components/trans.json"),
              n = (0, s.default)(l.Ember, a);
            (this._tra = a), (this._traService = n), (this._provider = t);
          }
          displayMatchDetails(t) {
            this._matchDetailsApi
              ? this._matchDetailsApi.showMatchDetails(t)
              : this._initMatchDetailsApi((e) => e.showMatchDetails(t));
          }
          hideMatchDetails() {
            this._matchDetailsApi && this._matchDetailsApi.hideMatchDetails();
          }
          _initMatchDetailsApi(t) {
            if (this._matchDetailsApi)
              return t && t(this._matchDetailsApi), this._matchDetailsApi;
            new Promise((t) => {
              Promise.resolve()
                .then(
                  (() => {
                    t(a(44));
                  }).bind(null, a),
                )
                .catch(a.oe);
            }).then((e) => {
              (this._matchDetailsApi = new e(this._provider, this._traService)),
                t(this._matchDetailsApi);
            });
          }
        }
        let o;
        t.exports = function (t, e) {
          return void 0 === o && (o = new i(t, e)), o;
        };
      },
      (t, e, a) => {
        "use strict";
        var n,
          s = a(1),
          l = a(5),
          i = (n = a(45)) && n.__esModule ? n : { default: n };
        const o = new Map();
        o.set("scoreboard", {
          sectionName: "scoreboard",
          locKey: "MATCH_DETAILS_SUB_NAV_TITLE_SCOREBOARD",
          jmxEnabledKey: "LCUScoreboardEnabled",
          enabled: !0,
          display: !0,
          priority: 1,
        }),
          o.set("overview", {
            sectionName: "overview",
            locKey: "MATCH_DETAILS_SUB_NAV_TITLE_OVERVIEW",
            jmxEnabledKey: "LCUOverviewEnabled",
            enabled: !0,
            display: !0,
            priority: 2,
          }),
          o.set("stats", {
            sectionName: "stats",
            locKey: "MATCH_DETAILS_SUB_NAV_TITLE_STATS",
            jmxEnabledKey: "LCUStatsEnabled",
            enabled: !0,
            display: !0,
            priority: 3,
          }),
          o.set("graph", {
            sectionName: "graph",
            locKey: "MATCH_DETAILS_SUB_NAV_TITLE_GRAPH",
            jmxEnabledKey: "LCUGraphEnabled",
            enabled: !0,
            display: !0,
            priority: 4,
          }),
          o.set("runes", {
            sectionName: "runes",
            locKey: "MATCH_DETAILS_SUB_NAV_TITLE_RUNES",
            jmxEnabledKey: "LCURunesEnabled",
            jmxVisibleKey: "LCURunesVisible",
            enabled: !0,
            display: !0,
            priority: 5,
          });
        let r,
          c,
          m,
          p,
          d,
          u,
          h = !1,
          g = !1;
        function f() {
          r.release(),
            p &&
              s.Lodash.isFunction(p) &&
              !g &&
              (p("closeButtonClick"), (g = !0)),
            c && c.onRemove();
        }
        function _() {
          r.release(),
            p &&
              s.Lodash.isFunction(p && !g) &&
              (p("closeMatchDetailModalOnly"), (g = !0));
        }
        t.exports = class {
          constructor(t, e) {
            s.logger.trace("Creating Match Details Ember application"),
              h ||
                (function (t, e) {
                  (r = s.Viewport.overlay().getScreenRoot(
                    "rcp-fe-lol-match-details-overlay",
                  )),
                    (d = r.getElement()),
                    (u = document.createElement("lol-uikit-full-page-modal")),
                    (u.className = "rcp-fe-lol-match-details-overlay-content"),
                    d.appendChild(u),
                    u.addEventListener("closeButtonClick", f),
                    u.addEventListener("closeMatchDetailModalOnly", _),
                    s.EmberApplicationFactory.setFactoryDefinition({
                      name: "MatchDetailsRootComponent",
                      ComponentFactory: s.ComponentFactory,
                      tra: e,
                      MatchDetailsRootComponent: a(46),
                      LayerHeaderComponent: a(50),
                      MatchOverviewComponent: a(53).OverviewComponent,
                      MatchDetailsTimelineChartComponent:
                        a(57).TimelineChartComponent,
                      MatchDetailsEventChartComponent: a(80),
                      MatchDetailsMapChartComponent: a(84),
                      MapTooltipComponent: a(98),
                      MatchScoreboardComponent: a(101),
                      MatchDetailsTeamDataComponent: a(109),
                      MatchDetailsTeamObjectivesComponent: a(113),
                      ScoreboardTooltipComponent: a(116),
                      ElementalTooltipComponent: a(118),
                      ItemTooltipComponent: a(121),
                      SpellTooltipComponent: a(124),
                      KeystoneTooltipComponent: a(127),
                      ChampIconComponent: a(130),
                      PlayerHistoryRowComponent: a(132),
                      MatchStatsComponent: a(136),
                      SubteamAvatarsComponent: a(140),
                      TeamAvatarsComponent: a(143),
                      TeamAvatarComponent: a(146),
                      StatsTableComponent: a(148),
                      StatsRowComponent: a(151),
                      StatsBgComponent: a(154),
                      MatchGraphComponent: a(157),
                      GraphCategoriesComponent: a(160),
                      GraphDisplayComponent: a(164),
                      MatchRunesComponent: a(167),
                      RunesRuneStatsComponent: a(170),
                      RunesPlayerStatsComponent: a(173),
                      PlayerNameComponent:
                        s.SharedEmberComponents.PlayerNameComponent,
                      GameIdClipboardCopyComponent:
                        s.SharedEmberComponents.GameIdClipboardCopyComponent,
                      StatsService: a(176),
                      PlayerReportsService: i.default,
                    }),
                    s.Viewport.main()
                      .getScreenRoot("rcp-fe-lol-profiles-main")
                      .on("hide", function () {
                        f();
                      }),
                    s.Viewport.overlay().on("remove", function (t, e) {
                      e &&
                        "rcp-fe-lol-match-details-overlay" === e.name &&
                        p &&
                        s.Lodash.isFunction(p) &&
                        !g &&
                        (p("closeButtonClick"), (g = !0));
                    }),
                    s.Navigation.on("navigate", () => {
                      f();
                    }),
                    (h = !0);
                })(0, e);
          }
          showMatchDetails(t) {
            this.hideMatchDetails(),
              (function (t) {
                let e = !1;
                t.closeModalCallback &&
                s.Lodash.isFunction(t.closeModalCallback)
                  ? ((p = t.closeModalCallback), (e = !0))
                  : (p = null);
                g = !1;
                const a = s.Lodash.get(t, "sections", []),
                  n = [];
                a.forEach((t) => n.push(o.get(t)));
                const i = s.Lodash.get(t, "defaultSection"),
                  d = s.Lodash.get(t, "dataSource", "eogStats");
                s.Ember.RSVP.hash({
                  augments: l.augments,
                  champions: l.champions,
                  championsByAlias: l.championsByAlias,
                  items: l.items,
                  maps: l.maps,
                  queues: l.queues,
                  runes: l.runes,
                  runesStyles: l.runesStyles,
                  spells: l.spells,
                  tftItemsByName: l.tftItemsByName,
                  tftChampionsByAlias: l.tftChampionsByAlias,
                  tftTraitsById: l.tftTraitsById,
                }).then((a) => {
                  s.logger.trace(
                    `Displaying match details for gameId ${t.gameId} and summoner ${t.summonerId}`,
                  ),
                    c &&
                      (u.removeChild(u.childNodes[0]),
                      c.componentPromise.then(function (t) {
                        t.app.destroy();
                      })),
                    (m = {
                      dataSource: d,
                      hideHeader: t.hideHeader,
                      baseGameId: t.gameId,
                      baseSummonerId: t.summonerId,
                      additionalInfo: t.additionalInfo,
                      isThirdPersonView: e,
                      currentSelectedSectionName: i,
                      sections: n,
                      champions: a.champions,
                      championsByAlias: a.championsByAlias,
                      tftChampionsByAlias: a.tftChampionsByAlias,
                      tftTraitsById: a.tftTraitsById,
                      augments: a.augments,
                      items: a.items,
                      maps: a.maps,
                      queues: a.queues,
                      runes: a.runes,
                      runesStyles: a.runesStyles,
                      spells: a.spells,
                      tftItemsByName: a.tftItemsByName,
                    });
                  const l = s.ComponentFactory.create(
                    {
                      type: "MatchDetailsRootComponent",
                      classNames: ["match-details-root"],
                    },
                    m,
                  );
                  u.appendChild(l.domNode), (c = l), r.bump();
                });
              })(t);
          }
          hideMatchDetails() {
            r.release();
          }
        };
      },
      (t, e, a) => {
        "use strict";
        Object.defineProperty(e, "__esModule", { value: !0 }),
          (e.default = void 0);
        var n = a(1),
          s = n.Ember.Service.extend({
            reportedPlayers: null,
            playerReportSenderBasePath: "/lol-player-report-sender",
            init() {
              this._super(...arguments), this.initDataBindings();
            },
            willDestroy() {
              this.removeObservers(), this.removeDataBindings();
            },
            removeDataBindings() {
              this.playerReportSenderBinding = null;
            },
            initDataBindings() {
              this.playerReportSenderBinding = (0, n.dataBinding)(
                this.get("playerReportSenderBasePath"),
                n.socket,
              );
            },
            removeObservers() {
              this.playerReportSenderBinding.removeObserver(
                this.get("playerReportSenderBasePath"),
                this,
              );
            },
            reportedPlayerObserver: n.Ember.observer("gameId", function () {
              const t = this.get("gameId");
              t &&
                (this.playerReportSenderBinding.removeObserver(
                  this.get("playerReportSenderBasePath"),
                  this,
                ),
                this.playerReportSenderBinding.observe(
                  `/v1/reported-players/gameId/${t}`,
                  this,
                  this.handleReportedPlayersUpdate,
                ));
            }),
            handleReportedPlayersUpdate: function (t) {
              this.set("reportedPlayers", t);
            },
          });
        e.default = s;
      },
      (t, e, a) => {
        "use strict";
        var n = a(1),
          s = r(a(13)),
          l = r(a(9)),
          i = a(6),
          o = a(47);
        function r(t) {
          return t && t.__esModule ? t : { default: t };
        }
        a(48);
        const c = (0, n.EmberDataBinding)({
          Ember: n.Ember,
          websocket: (0, n.getProvider)().getSocket(),
          boundProperties: {
            potatoModeSetting: "/lol-settings/v2/local/lol-user-experience",
            currentSummoner: "/lol-summoner/v1/current-summoner",
          },
        });
        t.exports = n.Ember.Component.extend(
          c,
          i.DataBindingMixin,
          i.FixDataBindingMixin,
          l.default,
          {
            classNames: ["match-details-root-component"],
            classNameBindings: ["hideHeader:match-details-no-header"],
            layout: a(49),
            isLoading: !0,
            isTransitioning: !1,
            matchHistoryConfig: n.Ember.computed.alias(
              "platformConfig.NewMatchHistory",
            ),
            localPuuid: n.Ember.computed.alias("currentSummoner.puuid"),
            stats: n.Ember.inject.service(),
            playerReportsService: n.Ember.inject.service("player-reports"),
            getNameFallback(t, e) {
              return void 0 === t || "" === t
                ? this.get("tra.MATCH_DETAILS_SUMMONER_NAME") + e
                : t;
            },
            loadData() {
              const t = this.get("baseGameId"),
                e = this.get("playerReportsService");
              e && e.set("gameId", t);
              const a = this.retrieveData("api.matchHistory", `/v1/games/${t}`),
                l = this.retrieveData(
                  "api.matchHistory",
                  `/v1/game-timelines/${t}`,
                );
              return n.Ember.RSVP.hashSettled({
                gameData: a,
                gameTimeline: l,
              }).then(
                (t) => {
                  if (this.get("isDestroyed")) return;
                  const e = t.gameData.value;
                  if (
                    (e.participants &&
                      e.participantIdentities &&
                      (e.participantIdentities.forEach((t, a) => {
                        const {
                          summonerName: n,
                          gameName: s,
                          tagLine: l,
                        } = t.player;
                        let i;
                        (i =
                          s && l
                            ? this.get("_playerNames")?.formatPlayerName({
                                summonerName: n,
                                gameName: s,
                                tagLine: l,
                              })?.playerName
                            : n),
                          (e.participantIdentities[a].player.displayName = i);
                      }),
                      (e.participants = e.participants.map((t) => {
                        const a = n.Lodash.find(
                          e.participantIdentities,
                          (e) => e.participantId === t.participantId,
                        );
                        return (
                          (a.player.summonerName = this.getNameFallback(
                            a.player.summonerName,
                            t.participantId,
                          )),
                          (a.player.displayName = this.getNameFallback(
                            a.player.displayName,
                            t.participantId,
                          )),
                          n.Lodash.set(
                            a.player,
                            "participantId",
                            a.participantId,
                          ),
                          new s.default(t, a)
                        );
                      }))),
                    this.get("baseSummonerId"))
                  ) {
                    const t = n.Lodash.find(
                      e.participants,
                      (t) => t.player.summonerId === this.get("baseSummonerId"),
                    );
                    (e.participants = n.Lodash.sortBy(e.participants, [
                      "teamId",
                      function (e) {
                        return e.player.summonerId === t.player.summonerId
                          ? -1
                          : 0;
                      },
                    ])),
                      this.set("baseCurrentParticipant", t);
                  }
                  this.set("baseGameData", e),
                    "fulfilled" === t.gameTimeline.state
                      ? this.set("baseGameTimeline", t.gameTimeline.value)
                      : this.set("baseGameTimeline", null),
                    this.set("isLoading", !1);
                },
                (t) => {
                  404 !== t.status &&
                    (n.logger.error("Could not load match details data", t),
                    this.showModal({
                      type: "DialogAlert",
                      data: {
                        contents: this.get("tra.MATCH_DETAILS_LOADING_ERROR"),
                        okText: this.get(
                          "tra.MATCH_DETAILS_LOADING_ERROR_CONFIRMATION",
                        ),
                        onOk: () => {
                          this.element.dispatchEvent(
                            new Event("closeMatchDetailModalOnly", {
                              bubbles: !0,
                            }),
                          );
                        },
                      },
                    }));
                },
              );
            },
            init() {
              this._super(...arguments), (this._playerNames = n.playerNames);
            },
            loadGameData: n.Ember.on("init", function () {
              if ("legs" === this.get("dataSource")) return this.loadData();
              this.set("isLoading", !1);
            }),
            setStatsDataSource: n.Ember.on("init", function () {
              this.get("stats").setSourceOptions({
                dataSource: this.get("dataSource"),
                baseGameId: this.get("baseGameId"),
                baseSummonerId: this.get("baseSummonerId"),
              });
            }),
            gameData: n.Ember.computed("baseGameData", function () {
              return this.get("baseGameData") || {};
            }),
            gameTimeline: n.Ember.computed("baseGameTimeline", function () {
              return this.get("baseGameTimeline") || {};
            }),
            currentParticipant: n.Ember.computed(
              "baseCurrentParticipant",
              function () {
                return this.get("baseCurrentParticipant") || {};
              },
            ),
            addNavigationListenersOnInserted: n.Ember.on(
              "didInsertElement",
              function () {
                this.$("lol-uikit-navigation-bar")
                  .get(0)
                  .addEventListener(
                    "lol-uikit-navigation-item-attr-set-event",
                    (t) => {
                      const e = t.detail.node;
                      this.showSection(e.dataset.name);
                    },
                  );
              },
            ),
            sectionName: n.Ember.computed(
              "displaySections",
              "currentSelectedSectionName",
              function () {
                return (
                  "match-" +
                  this.get("displaySections")[this.get("selectedSectionIndex")]
                    .name
                );
              },
            ),
            selectedSectionIndex: n.Ember.computed(
              "displaySections.[]",
              "displaySections.@each.selected",
              function () {
                const t = this.get("displaySections");
                let e = -1;
                return (
                  t.forEach(function (t, a) {
                    t.selected && (e = a);
                  }),
                  e
                );
              },
            ),
            subteamGameModeData: n.Ember.computed(function () {
              return o.GAME_MODES_WITH_SUBTEAMS;
            }),
            isGameModeWithSubteams: n.Ember.computed(
              "baseGameData",
              "subteamGameModeData",
              function () {
                return !!this.get("subteamGameModeData")[
                  this.get("baseGameData.gameMode")
                ];
              },
            ),
            displaySections: n.Ember.computed(
              "tra.metadata",
              "sections.@each.sectionName",
              "currentSelectedSectionName",
              "matchHistoryConfig",
              "isGameModeWithSubteams",
              "subteamGameModeData",
              function () {
                let t = this.get("sections");
                const e = this.get("currentSelectedSectionName"),
                  a = this.get("matchHistoryConfig"),
                  s = [];
                let l = [];
                const i = this.get("gameData.gameMode");
                this.get("isGameModeWithSubteams") &&
                  (l = this.get("subteamGameModeData")[i].disabledSections),
                  (t = n.Lodash.sortBy(t, ["priority"]));
                let o = !1;
                return (
                  t.forEach((t) => {
                    const i = n.Ember.Object.create({}),
                      r = a && !1 === a[t.jmxEnabledKey],
                      c = a && !1 === a[t.jmxVisibleKey],
                      m = e === t.sectionName,
                      p = l.includes(t.sectionName);
                    m && (o = !0),
                      i.set("name", t.sectionName),
                      i.set("displayName", this.get(`tra.${t.locKey}`)),
                      i.set("selected", m),
                      i.set("disabled", !t.enabled || r),
                      i.set("display", (t.display || !c) && !p),
                      s.push(i);
                  }),
                  !o && s.length > 0 && s[0].set("selected", !0),
                  n.Ember.A(s)
                );
              },
            ),
            didRender() {
              this._super(...arguments),
                this.get("isTransitioning") && this.set("isTransitioning", !1);
            },
            showSection: function (t) {
              this.get("currentSelectedSectionName") === t ||
                this.get("isTransitioning") ||
                (this.set("currentSelectedSectionName", t),
                this.set("isTransitioning", !0));
            },
          },
        );
      },
      (t, e) => {
        "use strict";
        Object.defineProperty(e, "__esModule", { value: !0 }),
          (e.GAME_MODES_WITH_SUBTEAMS = void 0);
        e.GAME_MODES_WITH_SUBTEAMS = {
          CHERRY: { disabledSections: ["overview", "runes"] },
        };
      },
      (t, e, a) => {
        "use strict";
        a.r(e);
      },
      (t, e, a) => {
        const n = a(1).Ember;
        t.exports = n.HTMLBars.template({
          id: "pcqJjSxq",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-match-history\\\\src\\\\components\\\\details\\\\match-details-root-component\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-match-history\\\\src\\\\components\\\\details\\\\match-details-root-component\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-match-history\\\\src\\\\components\\\\details\\\\match-details-root-component\\\\index.js\\" "],["text","\\n"],["open-element","lol-uikit-navigation-bar",[]],["static-attr","class","rcp-fe-lol-match-details-overlay-sub-nav"],["static-attr","type","nav-bar-secondary"],["dynamic-attr","selectedindex",["unknown",["selectedSectionIndex"]],null],["flush-element"],["text","\\n"],["block",["each"],[["get",["displaySections"]]],null,4],["close-element"],["text","\\n\\n"],["block",["if"],[["get",["isLoading"]]],null,2,1]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","    "],["append",["helper",["layer-header"],null,[["gameData","additionalInfo","currentParticipant","isThirdPersonView","maps","queues","potatoModeSetting"],[["get",["gameData"]],["get",["additionalInfo"]],["get",["currentParticipant"]],["get",["isThirdPersonView"]],["get",["maps"]],["get",["queues"]],["get",["potatoModeSetting"]]]]],false],["text","\\n"]],"locals":[]},{"statements":[["block",["unless"],[["get",["hideHeader"]]],null,0],["text","  "],["append",["helper",["component"],[["get",["sectionName"]]],[["isTransitioning","gameData","gameTimeline","currentParticipant","augments","champions","championsByAlias","items","runes","runesStyles","spells","localPuuid"],[["get",["isTransitioning"]],["get",["gameData"]],["get",["gameTimeline"]],["get",["currentParticipant"]],["get",["augments"]],["get",["champions"]],["get",["championsByAlias"]],["get",["items"]],["get",["runes"]],["get",["runesStyles"]],["get",["spells"]],["get",["localPuuid"]]]]],false],["text","\\n"]],"locals":[]},{"statements":[["text","  "],["open-element","div",[]],["static-attr","class","match-details-loading-icon-container"],["flush-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","match-details-loading-icon"],["flush-element"],["close-element"],["text","\\n  "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","      "],["open-element","lol-uikit-navigation-item",[]],["dynamic-attr","data-name",["concat",[["unknown",["section","name"]]]]],["dynamic-attr","disabled",["unknown",["section","disabled"]],null],["dynamic-attr","active",["unknown",["section","selected"]],null],["flush-element"],["text","\\n        "],["append",["unknown",["section","displayName"]],false],["text","\\n      "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["block",["if"],[["get",["section","display"]]],null,3]],"locals":["section"]}],"hasPartials":false}',
          meta: {},
        });
      },
      (t, e, a) => {
        "use strict";
        var n = a(1),
          s = a(6),
          l = a(5);
        a(51),
          (t.exports = n.Ember.Component.extend(s.DataBindingMixin, {
            layout: a(52),
            classNames: ["match-details-layer-header"],
            animationDisabled: n.Ember.computed.bool(
              "potatoModeSetting.data.potatoModeEnabled",
            ),
            map: n.Ember.computed(
              "maps",
              "gameData.mapId",
              "gameData.gameMode",
              function () {
                const t = n.Lodash.find(this.get("maps"), {
                  gameMode: this.get("gameData.gameMode"),
                  id: this.get("gameData.mapId"),
                });
                return (
                  t || n.Lodash.find(this.get("maps"), { id: l.DEFAULT_MAP_ID })
                );
              },
            ),
            createdAt: n.Ember.computed(
              "gameData",
              "tra.MATCH_DETAILS_GAME_CREATION_DATE_FORMAT",
              function () {
                const t = this.get("gameData").gameCreation;
                return (0, n.moment)(new Date(t)).format(
                  this.get("tra.MATCH_DETAILS_GAME_CREATION_DATE_FORMAT"),
                );
              },
            ),
            duration: n.Ember.computed("gameData", function () {
              const t = this.get("gameData").gameDuration;
              return n.l10nDuration.formatSeconds(t);
            }),
            gameId: n.Ember.computed("gameData", function () {
              return this.get("gameData.gameId");
            }),
            type: n.Ember.computed(
              "gameData.gameType",
              "gameData.queueId",
              "queues",
              "tra.MATCH_HISTORY_QUEUE_MODE_CUSTOM",
              function () {
                if (this.get("gameData.gameType") === l.CUSTOM_GAME_TYPE)
                  return this.get("tra.MATCH_HISTORY_QUEUE_MODE_CUSTOM");
                const t = this.get("queues").get(this.get("gameData.queueId"));
                return t
                  ? t.detailedDescription
                    ? t.detailedDescription
                    : t.description
                  : "";
              },
            ),
            outcome: n.Ember.computed(
              "currentParticipant.win",
              "gameData.endOfGameResult",
              "tra.postgame_progress_victory",
              "tra.postgame_progress_defeat",
              "tra.MATCH_HISTORY_MATCH_RESULT_REMAKE",
              "tra.MATCH_HISTORY_MATCH_RESULT_CHEATER_TERMINATED_VANGUARD",
              "currentParticipant.stats.gameEndedInEarlySurrender",
              function () {
                const t = this.get("currentParticipant").win;
                return "Abort_AntiCheatExit" ===
                  this.get("gameData.endOfGameResult")
                  ? this.get(
                      "tra.MATCH_HISTORY_MATCH_RESULT_CHEATER_TERMINATED_VANGUARD",
                    )
                  : this.get(
                        "currentParticipant.stats.gameEndedInEarlySurrender",
                      )
                    ? this.get("tra.MATCH_HISTORY_MATCH_RESULT_REMAKE")
                    : this.get(
                        "tra." +
                          (t
                            ? "postgame_progress_victory"
                            : "postgame_progress_defeat"),
                      );
              },
            ),
            mapIcon: n.Ember.computed(
              "currentParticipant.win",
              "gameData.mapId",
              "animationDisabled",
              function () {
                const t = this.get("map");
                return this.get("animationDisabled")
                  ? this.get("currentParticipant.win")
                    ? n.Lodash.get(t, "assets.icon-victory")
                    : n.Lodash.get(t, "assets.icon-defeat")
                  : this.get("currentParticipant.win")
                    ? n.Lodash.get(t, "assets.icon-victory-video")
                    : n.Lodash.get(t, "assets.icon-defeat-video");
              },
            ),
            isThirdPersonView: !1,
            thirdPersonAccessibleGameQueues: n.Ember.computed.readOnly(
              "platformConfig.Replays.ThirdPersonAccessibleGameQueues",
            ),
            whitelistedQueueIds: n.Ember.computed(
              "thirdPersonAccessibleGameQueues",
              function () {
                return n.Ember.A(
                  (this.get("thirdPersonAccessibleGameQueues") || "")
                    .split(",")
                    .map(function (t) {
                      return parseInt(t, 10);
                    }),
                );
              },
            ),
            replayButton: null,
            shouldShowReplayButton: n.Ember.computed(
              "gameData",
              "isThirdPersonView",
              "whitelistedQueueIds",
              function () {
                const t = this.get("gameData");
                return (
                  !(!t || !n.Replays.isGeneralReplaysEnabled()) &&
                  (!(
                    this.get("isThirdPersonView") &&
                    !this.get("whitelistedQueueIds").includes(t.queueId)
                  ) ||
                    (n.logger.trace(
                      "Queue id for this game is not whitelisted, not adding replay button",
                    ),
                    !1))
                );
              },
            ),
            onDidRender: n.Ember.on("didRender", function () {
              this._addReplayButton();
            }),
            _addReplayButton: n.Ember.observer(
              "shouldShowReplayButton",
              function () {
                if (this.get("replayButton")) return;
                if (!this.get("shouldShowReplayButton")) return;
                const t = this.element
                  ? this.element.querySelector(".match-layer-header-replay")
                  : null;
                if (!t) return;
                const e = this.get("gameData"),
                  a = n.Replays.createReplayButton({
                    gameId: e.gameId,
                    gameVersion: e.gameVersion,
                    gameType: e.gameType,
                    queueId: e.queueId,
                    gameCreation: e.gameCreation,
                    gameDuration: e.gameDuration,
                  });
                if (a) {
                  for (; t.firstChild; ) t.removeChild(t.firstChild);
                  t.appendChild(a.domNode), this.set("replayButton", a);
                } else
                  n.logger.error("Unable to create replay button for match");
              },
            ),
            destroyReplayButton: n.Ember.on("willDestroyElement", function () {
              const t = this.get("replayButton");
              t && (t.destroy(), this.set("replayButton", null));
            }),
            actions: {
              backToMatchHistory: function () {
                this.element.dispatchEvent(
                  new Event("closeMatchDetailModalOnly", { bubbles: !0 }),
                );
              },
            },
          }));
      },
      (t, e, a) => {
        "use strict";
        a.r(e);
      },
      (t, e, a) => {
        const n = a(1).Ember;
        t.exports = n.HTMLBars.template({
          id: "r2ZV3WC4",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-match-history\\\\src\\\\components\\\\details\\\\layer-header-component\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-match-history\\\\src\\\\components\\\\details\\\\layer-header-component\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-match-history\\\\src\\\\components\\\\details\\\\layer-header-component\\\\index.js\\" "],["text","\\n"],["open-element","div",[]],["static-attr","class","match-layer-header-wrapper match_details_clearfix"],["flush-element"],["text","\\n"],["block",["if"],[["get",["isThirdPersonView"]]],null,3],["block",["if"],[["get",["animationDisabled"]]],null,2,1],["text","  "],["open-element","div",[]],["static-attr","class","match-layer-header-right"],["flush-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","match-layer-header-name"],["flush-element"],["append",["unknown",["outcome"]],false],["close-element"],["text","\\n    "],["open-element","ul",[]],["static-attr","class","match-layer-header-info-list match_details_clearfix"],["flush-element"],["text","\\n      "],["open-element","li",[]],["static-attr","class","match-layer-header-info-item"],["flush-element"],["append",["unknown",["map","name"]],false],["close-element"],["text","\\n      "],["open-element","li",[]],["static-attr","class","match-layer-header-info-item"],["flush-element"],["append",["unknown",["type"]],false],["close-element"],["text","\\n      "],["open-element","li",[]],["static-attr","class","match-layer-header-info-item"],["flush-element"],["append",["unknown",["duration"]],false],["close-element"],["text","\\n      "],["open-element","li",[]],["static-attr","class","match-layer-header-info-item"],["flush-element"],["append",["unknown",["createdAt"]],false],["close-element"],["text","\\n      "],["open-element","li",[]],["static-attr","class","match-layer-header-info-item"],["flush-element"],["append",["helper",["game-id-clipboard-copy"],null,[["gameId"],[["get",["gameId"]]]]],false],["close-element"],["text","\\n      "],["block",["if"],[["get",["additionalInfo","champMasteryIpXpDesc"]]],null,0],["text","\\n    "],["close-element"],["text","\\n  "],["close-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","match-layer-header-replay"],["flush-element"],["text","\\n"],["text","  "],["close-element"],["text","\\n"],["close-element"],["text","\\n"]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["open-element","li",[]],["static-attr","class","match-layer-header-info-item"],["flush-element"],["append",["unknown",["additionalInfo","champMasteryIpXpDesc"]],false],["close-element"]],"locals":[]},{"statements":[["text","    "],["open-element","div",[]],["static-attr","class","match-layer-header-icon"],["flush-element"],["text","\\n      "],["open-element","video",[]],["static-attr","class","match-layer-header-video"],["static-attr","autoplay","true"],["static-attr","loop","true"],["dynamic-attr","src",["concat",[["unknown",["mapIcon"]]]]],["flush-element"],["close-element"],["text","\\n    "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","    "],["open-element","div",[]],["static-attr","class","match-layer-header-icon"],["flush-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","match-layer-header-icon-img map-icon"],["dynamic-attr","style",["concat",["background-image: url(",["unknown",["mapIcon"]],")"]]],["flush-element"],["close-element"],["text","\\n    "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","    "],["open-element","div",[]],["static-attr","class","match-layer-header-left"],["modifier",["action"],[["get",[null]],"backToMatchHistory"],[["on"],["click"]]],["flush-element"],["close-element"],["text","\\n"]],"locals":[]}],"hasPartials":false}',
          meta: {},
        });
      },
      (t, e, a) => {
        "use strict";
        var n = a(1);
        a(54);
        var s,
          l = (s = a(55)) && s.__esModule ? s : { default: s };
        const i = ["DARKSTAR", "STARGUARDIAN"],
          o = n.Ember.Component.extend({
            classNames: ["match-details-overview-component"],
            layout: a(56),
            chartTitle: n.Ember.computed("displayedChart", function () {
              return this.get("tra").get(
                l.default.CHART_TITLES_KEYS[this.get("displayedChart")],
              );
            }),
            hasTimelineData: n.Ember.computed("gameTimeline", function () {
              const t = this.get("gameTimeline");
              return (
                t.frames &&
                t.frames.length > 0 &&
                !this.shouldSkipTimelineData()
              );
            }),
            shouldSkipTimelineData: function () {
              const t = this.get("gameData");
              return !(!t || !t.gameMode || -1 === i.indexOf(t.gameMode));
            },
            init: function () {
              this._super.apply(this, arguments);
            },
            constants: l.default,
            displayed: { teamGoldAdvantage: !0 },
            displayedChart: "teamGoldAdvantage",
            overviewData: n.Ember.computed(
              "gameData",
              "gameTimeline",
              "currentParticipant.player.currentAccountId",
              "champions",
              function () {
                return m(
                  this.get("gameData"),
                  this.get("gameTimeline"),
                  this.get("currentParticipant.player.currentAccountId"),
                  this.get("champions"),
                );
              },
            ),
            actions: {
              selectTimelineChart: function (t) {
                this.set("displayed.teamGoldAdvantage", !1),
                  this.set("displayed.teamGold", !1),
                  this.set("displayed.championGold", !1),
                  this.set("displayed." + t, !0),
                  this.set("displayedChart", t);
              },
            },
            didInsertElement: function () {
              const t = n.Ember.$(this.element).find(
                ".match-details-overview-container",
              )[0];
              t.addEventListener("webkitAnimationEnd", function (e) {
                e.target === t &&
                  "fade-in" === e.animationName &&
                  t.classList.remove("match-details-loading-fade-in");
              });
            },
          });
        function r(t, e) {
          return t[e].teamId;
        }
        function c(t, e) {
          const a = {};
          return (
            n.Lodash.each(t.participants, (t) => {
              a[t.participantId] = n.Lodash.extend(t, {
                imgSrc: e.get(t.championId).squarePortraitPath,
              });
            }),
            a
          );
        }
        function m(t, e, a, s) {
          const l = n.Lodash.filter(
              t.participantIdentities,
              (t) => t.player.currentAccountId === a,
            )[0],
            i = c(t, s);
          return {
            participants: i,
            timelines: p(e.frames, i, l),
            mapId: t.mapId,
            ownerId: l ? l.participantId : null,
          };
        }
        function p(t, e, a) {
          const s = [],
            i = [],
            o = [],
            c = [],
            m = { championKills: [], championDeaths: [], buildingKills: [] },
            p = r(e, a.participantId),
            h = g(p);
          return (
            n.Lodash.each(t, (t) => {
              const { timestamp: r } = t,
                g = u(t, e);
              if (void 0 === g) return;
              const f = d(t.events, e, m, a),
                _ = { timestamp: r };
              (_[l.default.TEAM_BLUE_ID] = g.teamGolds[l.default.TEAM_BLUE_ID]),
                (_[l.default.TEAM_RED_ID] = g.teamGolds[l.default.TEAM_RED_ID]),
                i.push({ gold: g.teamGolds[p] - g.teamGolds[h], timestamp: r }),
                s.push(_),
                o.push({ champions: g.championGolds, timestamp: r }),
                c.push(n.Lodash.extend(f, { timestamp: r }));
            }),
            {
              teamGoldAdvantage: i,
              teamGold: s,
              championGold: o,
              events: c,
              mapsInfo: m,
            }
          );
        }
        function d(t, e, a, s) {
          const i = {},
            o = {};
          (i[l.default.TEAM_BLUE_ID] = i[l.default.TEAM_RED_ID] = 0),
            (o[l.default.TEAM_BLUE_ID] = o[l.default.TEAM_RED_ID] = null);
          let c = {};
          (c[l.default.TEAM_RED_ID] = {}), (c[l.default.TEAM_BLUE_ID] = {});
          const m = t.filter(
              (t) =>
                !!n.Lodash.includes(l.default.RELEVANT_EVENT_TYPES, t.type) &&
                (t.type !== l.default.CHAMP_KILL_EVENT_TYPE ||
                  0 !== t.victimId),
            ),
            p = r(e, s.participantId);
          n.Lodash.each(m, (t) => {
            const { killerId: n } = t;
            let s = h(t, e);
            (s = s === p ? 100 : 200), c[s][n] || (c[s][n] = []);
            const r = c[s][n];
            switch (t.type) {
              case l.default.CHAMP_KILL_EVENT_TYPE:
                const { victimId: c } = t,
                  m = e[c];
                i[s]++,
                  r.push({
                    isChampion: !0,
                    class: `champion-${m.championId}`,
                    imgSrc: m.imgSrc,
                  });
                const p = t.position;
                a.championKills.push({
                  playerId: n,
                  teamId: s,
                  position: p,
                  victimId: c,
                  timestamp: t.timestamp,
                }),
                  a.championDeaths.push({
                    playerId: c,
                    teamId: g(s),
                    position: p,
                    killerId: n,
                    timestamp: t.timestamp,
                    killerTeamId: s,
                  });
                break;
              case l.default.BUILD_KILL_EVENT_TYPE:
                const d = l.default.OBJECTIVE_TYPE_DISPLAY_MAP[t.buildingType];
                (o[s] = f(o[s], d, l.default.OBJECTIVE_GREATENESS_MAP)),
                  r.push({ isChampion: !1, class: `${d}-${g(s)}` }),
                  a.buildingKills.push({
                    display: d,
                    playerId: n,
                    killerTeamId: s,
                    timestamp: t.timestamp,
                    teamId: g(s),
                    position: t.position,
                  });
                break;
              case l.default.ELITE_MONSTER_KILL_TYPE:
                let u = l.default.OBJECTIVE_TYPE_DISPLAY_MAP[t.monsterType];
                (o[s] = f(o[s], u, l.default.OBJECTIVE_GREATENESS_MAP)),
                  t.monsterSubType &&
                    l.default.OBJECTIVE_TYPE_DISPLAY_MAP[t.monsterSubType] &&
                    (u =
                      l.default.OBJECTIVE_TYPE_DISPLAY_MAP[t.monsterSubType]),
                  r.push({ isChampion: !1, class: `${u}-${s}` });
            }
          });
          const d = n.Lodash.reduce(
              i,
              (t, e, a) => (e > 0 && t.push({ teamId: a, count: e }), t),
              [],
            ),
            u = n.Lodash.reduce(
              o,
              (t, e, a) => (e && t.push({ teamId: a, objective: e }), t),
              [],
            );
          return (
            (c = n.Lodash.fromPairs(
              n.Lodash.map(c, (t, a) => [
                a,
                {
                  isEmpty: n.Lodash.size(t) <= 0,
                  rows: n.Lodash.map(t, (t, n) => {
                    const s = n > 0,
                      l = s ? e[n].championId : null;
                    return {
                      killer: {
                        class: s ? `champion-${l}` : `minion-${a}`,
                        imgSrc: s ? e[n].imgSrc : null,
                        imgClass: s ? "" : `event-icon-minions-${a}`,
                      },
                      victims: t,
                    };
                  }),
                },
              ]),
            )),
            { kills: d, details: c, objectives: u }
          );
        }
        function u(t, e) {
          if (0 === n.Lodash.size(t.participantFrames)) return;
          const a = [],
            s = n.Lodash.reduce(
              t.participantFrames,
              (t, n) => {
                const { teamId: s } = e[n.participantId];
                return (
                  t.teamGolds[s] || ((t.teamGolds[s] = 0), a.push(s)),
                  (t.championGolds[n.participantId] = n.totalGold),
                  (t.teamGolds[s] += n.totalGold),
                  t
                );
              },
              { teamGolds: {}, championGolds: {} },
            );
          if (1 === a.length) {
            const t = g(a[0]);
            s.teamGolds[t] = 0;
          }
          return s;
        }
        function h(t, e) {
          switch (t.type) {
            case l.default.CHAMP_KILL_EVENT_TYPE:
              return g(e[t.victimId].teamId);
            case l.default.BUILD_KILL_EVENT_TYPE:
              return g(t.teamId);
            case l.default.ELITE_MONSTER_KILL_TYPE:
              return t.killerId <= 0 ? -1 : e[t.killerId].teamId;
            default:
              return (
                n.logger.warning("Cannot infer teamId from event: ", t), -1
              );
          }
        }
        function g(t) {
          return l.default.TEAM_BLUE_ID + l.default.TEAM_RED_ID - t;
        }
        function f(t, e, a) {
          return t && a[t] > a[e] ? t : e;
        }
        t.exports = {
          OverviewComponent: o,
          enrichGameDetails: m,
          prepareTimelineInfo: p,
          summarizeEventsInfo: d,
          summarizeGoldsTimeline: u,
          getTeamId: h,
          getOtherTeamId: g,
          getGreaterObjective: f,
          participantsByIdMap: c,
        };
      },
      (t, e, a) => {
        "use strict";
        a.r(e);
      },
      (t, e) => {
        "use strict";
        Object.defineProperty(e, "__esModule", { value: !0 }),
          (e.default = void 0);
        var a = {
          TEAM_BLUE_ID: 100,
          TEAM_RED_ID: 200,
          get TEAM_IDS() {
            return [this.TEAM_BLUE_ID, this.TEAM_RED_ID];
          },
          CHAMP_KILL_EVENT_TYPE: "CHAMPION_KILL",
          BUILD_KILL_EVENT_TYPE: "BUILDING_KILL",
          ELITE_MONSTER_KILL_TYPE: "ELITE_MONSTER_KILL",
          get RELEVANT_EVENT_TYPES() {
            return [
              this.CHAMP_KILL_EVENT_TYPE,
              this.BUILD_KILL_EVENT_TYPE,
              this.ELITE_MONSTER_KILL_TYPE,
            ];
          },
          CHART_TITLES_KEYS: {
            teamGoldAdvantage:
              "MATCH_HISTORY_OVERVIEW_TIMELINE_GOLD_ADVANTAGE_TITLE",
            teamGold: "MATCH_HISTORY_OVERVIEW_TIMELINE_TEAM_GOLD_TITLE",
            championGold: "MATCH_HISTORY_OVERVIEW_TIMELINE_CHAMPION_GOLD_TITLE",
          },
          OBJECTIVE_TYPE_DISPLAY_MAP: {
            TOWER_BUILDING: "tower",
            INHIBITOR_BUILDING: "inhibitor",
            NEXUS_BUILDING: "nexus",
            DRAGON: "dragon",
            AIR_DRAGON: "air",
            EARTH_DRAGON: "earth",
            FIRE_DRAGON: "fire",
            WATER_DRAGON: "water",
            ELDER_DRAGON: "elder",
            RIFTHERALD: "herald",
            BARON_NASHOR: "baron",
            VILEMAW: "vilemaw",
          },
          OBJECTIVE_GREATENESS_MAP: {
            tower: 1,
            inhibitor: 2,
            herald: 3,
            dragon: 4,
            baron: 5,
            nexus: 6,
          },
          TIMELINE_CHART_SPECS: {
            width: 687,
            height: 325,
            margin: { top: 14, bottom: 25, left: 43, right: 20 },
            pointRarius: 4.2,
            tickPadding: { x: 8, y: 10 },
            ticks: { x: 5 },
          },
          get EVENT_CHART_SPECS() {
            return {
              width: this.TIMELINE_CHART_SPECS.width,
              height: 95,
              margin: {
                top: 3,
                bottom: 0,
                left: this.TIMELINE_CHART_SPECS.margin.left,
                right: this.TIMELINE_CHART_SPECS.margin.right,
              },
              frameHeight: 95,
              pointRadius: { min: 2, max: 8 },
              textPositions: { x: 15, y: [19, 40, 65, 85] },
              killDotsTransition: { y: (t) => t / 2.2 - 10 },
              objectiveIconTransition: { y: (t) => t / 2.2 - 40 },
            };
          },
          MAP_CHART_SPECS: {
            mapW: 279,
            mapH: 279,
            iconW: 24,
            iconH: 24,
            circleR: 4,
            mapDomains: {
              1: { min: { x: -650, y: -83 }, max: { x: 14076, y: 14522 } },
              3: { min: { x: -500, y: -500 }, max: { x: 15e3, y: 15e3 } },
              8: { min: { x: 0, y: 0 }, max: { x: 13987, y: 13987 } },
              10: { min: { x: 0, y: 0 }, max: { x: 15398, y: 15398 } },
              11: { min: { x: 0, y: 0 }, max: { x: 14820, y: 14881 } },
              12: { min: { x: -28, y: -19 }, max: { x: 12849, y: 12858 } },
              14: { min: { x: -28, y: -19 }, max: { x: 12849, y: 12858 } },
              21: { min: { x: 0, y: 0 }, max: { x: 15e3, y: 15e3 } },
              90: { min: { x: 0, y: 0 }, max: { x: 14820, y: 14881 } },
            },
          },
        };
        e.default = a;
      },
      (t, e, a) => {
        const n = a(1).Ember;
        t.exports = n.HTMLBars.template({
          id: "KzrPqS7l",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-match-history\\\\src\\\\components\\\\overview\\\\match-details-overview-component\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-match-history\\\\src\\\\components\\\\overview\\\\match-details-overview-component\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-match-history\\\\src\\\\components\\\\overview\\\\match-details-overview-component\\\\index.js\\" "],["text","\\n"],["open-element","div",[]],["dynamic-attr","class",["concat",["match-details-overview-container ",["helper",["if"],[["get",["isTransitioning"]],"match-details-loading-hide","match-details-loading-fade-in"],null]]]],["flush-element"],["text","\\n"],["block",["if"],[["get",["hasTimelineData"]]],null,1,0],["close-element"]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","    "],["open-element","div",[]],["static-attr","class","match-details-timeline-no-timeline-header"],["flush-element"],["append",["unknown",["tra","MATCH_HISTORY_OVERVIEW_TIMELINE_NO_TIMELINE"]],false],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","    "],["open-element","div",[]],["static-attr","class","match-details-timeline-container"],["flush-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","match-details-timeline-display"],["flush-element"],["text","\\n        "],["open-element","div",[]],["dynamic-attr","class",["concat",[["helper",["unless"],[["get",["displayed","teamGoldAdvantage"]],"chart-hidden"],null]]]],["flush-element"],["text","\\n          "],["append",["helper",["match-details-timeline-chart"],null,[["chartData","chartType","specs"],[["get",["overviewData"]],"teamGoldAdvantage",["get",["constants","TIMELINE_CHART_SPECS"]]]]],false],["text","\\n        "],["close-element"],["text","\\n        "],["open-element","div",[]],["dynamic-attr","class",["concat",[["helper",["unless"],[["get",["displayed","teamGold"]],"chart-hidden"],null]]]],["flush-element"],["text","\\n          "],["append",["helper",["match-details-timeline-chart"],null,[["chartData","chartType","specs"],[["get",["overviewData"]],"teamGold",["get",["constants","TIMELINE_CHART_SPECS"]]]]],false],["text","\\n        "],["close-element"],["text","\\n        "],["open-element","div",[]],["dynamic-attr","class",["concat",[["helper",["unless"],[["get",["displayed","championGold"]],"chart-hidden"],null]]]],["flush-element"],["text","\\n          "],["append",["helper",["match-details-timeline-chart"],null,[["chartData","chartType","specs"],[["get",["overviewData"]],"championGold",["get",["constants","TIMELINE_CHART_SPECS"]]]]],false],["text","\\n        "],["close-element"],["text","\\n        "],["open-element","div",[]],["static-attr","class","match-details-timeline-display-posfix"],["flush-element"],["close-element"],["text","\\n        "],["append",["helper",["match-details-event-chart"],null,[["chartData","specs"],[["get",["overviewData"]],["get",["constants","EVENT_CHART_SPECS"]]]]],false],["text","\\n      "],["close-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","match-details-timeline-header"],["flush-element"],["text","\\n        "],["open-element","lol-uikit-flat-dropdown",[]],["static-attr","class","match-details-timeline-chart-dropdown"],["static-attr","direction","downward"],["flush-element"],["text","\\n          "],["open-element","lol-uikit-dropdown-option",[]],["static-attr","slot","lol-uikit-dropdown-option"],["static-attr","class","match-details-timeline-selector-option"],["dynamic-attr","selected",["concat",[["helper",["if"],[["get",["displayed","teamGoldAdvantage"]],"true","false"],null]]]],["dynamic-attr","onclick",["helper",["action"],[["get",[null]],"selectTimelineChart","teamGoldAdvantage"],null],null],["flush-element"],["text","\\n            "],["append",["unknown",["tra","MATCH_HISTORY_OVERVIEW_TIMELINE_GOLD_ADVANTAGE_OPTION"]],false],["text","\\n          "],["close-element"],["text","\\n          "],["open-element","lol-uikit-dropdown-option",[]],["static-attr","slot","lol-uikit-dropdown-option"],["static-attr","class","match-details-timeline-selector-option"],["dynamic-attr","selected",["concat",[["helper",["if"],[["get",["displayed","teamGold"]],"true","false"],null]]]],["dynamic-attr","onclick",["helper",["action"],[["get",[null]],"selectTimelineChart","teamGold"],null],null],["flush-element"],["text","\\n            "],["append",["unknown",["tra","MATCH_HISTORY_OVERVIEW_TIMELINE_TEAM_GOLD_OPTION"]],false],["text","\\n          "],["close-element"],["text","\\n          "],["open-element","lol-uikit-dropdown-option",[]],["static-attr","slot","lol-uikit-dropdown-option"],["static-attr","class","match-details-timeline-selector-option"],["dynamic-attr","selected",["concat",[["helper",["if"],[["get",["displayed","championGold"]],"true","false"],null]]]],["dynamic-attr","onclick",["helper",["action"],[["get",[null]],"selectTimelineChart","championGold"],null],null],["flush-element"],["text","\\n            "],["append",["unknown",["tra","MATCH_HISTORY_OVERVIEW_TIMELINE_CHAMPION_GOLD_OPTION"]],false],["text","\\n          "],["close-element"],["text","\\n        "],["close-element"],["text","\\n      "],["close-element"],["text","\\n    "],["close-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","match-details-map-container"],["flush-element"],["text","\\n      "],["append",["helper",["match-details-map-chart"],null,[["chartData","killType","playerId","specs"],[["get",["overviewData"]],["get",["killType"]],["get",["playerId"]],["get",["constants","MAP_CHART_SPECS"]]]]],false],["text","\\n    "],["close-element"],["text","\\n"]],"locals":[]}],"hasPartials":false}',
          meta: {},
        });
      },
      (t, e, a) => {
        "use strict";
        var n = a(1);
        a(58);
        var s,
          l = (s = a(10)) && s.__esModule ? s : { default: s };
        const i = a(59),
          o = { teamGoldAdvantage: m, teamGold: p, championGold: d },
          r = n.Ember.Component.extend({
            classNames: ["match-details-timeline-chart-component"],
            layout: a(79),
            draw: function (t, e) {
              const a = t.timelines[e],
                s = this.get("specs"),
                l = this.get("tra.MATCH_HISTORY_THOUSANDS_SUFFIX"),
                i = this.get("tra.metadata.locale.id"),
                r = c(a, e, s, l, i),
                m = this.get("tra.formatString"),
                p = this.get(
                  "tra.MATCH_HISTORY_OVERVIEW_TIMELINE_GOLD_ADVANTAGE_TOOLTIP_TEAM_ONE",
                ),
                d = this.get(
                  "tra.MATCH_HISTORY_OVERVIEW_TIMELINE_GOLD_ADVANTAGE_TOOLTIP_TEAM_TWO",
                );
              (a.ownerId = t.ownerId + ""), (a.participants = t.participants);
              const u = n.d3
                .select(this.$().get(0))
                .append("svg:svg")
                .attr("width", r.w)
                .attr("height", r.h)
                .attr("class", "match-details-timeline-chart");
              u
                .append("svg:g")
                .attr("class", "match-details-timeline-axis-y")
                .attr("transform", y(r.margin.left, r.margin.top))
                .call(r.axis.y)
                .selectAll("g")
                .filter((t) => 0 === t)
                .classed("zero-line", !0),
                u
                  .append("svg:g")
                  .attr("class", "match-details-timeline-axis-x")
                  .attr("transform", y(r.margin.left, r.innerH + r.margin.top))
                  .call(r.axis.x);
              const h = u
                .append("svg:g")
                .attr("transform", y(r.margin.left, r.margin.top))
                .attr("class", "match-details-timeline-chart-interact");
              h
                .append("svg:line")
                .attr("class", "vertical-rule-sync")
                .attr("y1", 0)
                .attr("y2", r.innerH + r.margin.bottom)
                .style("display", "none"),
                h
                  .on("mouseover", () =>
                    n.d3
                      .selectAll(".vertical-rule-sync")
                      .style("display", "block"),
                  )
                  .on("mouseout", () =>
                    n.d3
                      .selectAll(".vertical-rule-sync")
                      .style("display", "none"),
                  )
                  .on("mousemove", function () {
                    const t = n.d3.mouse(this)[0];
                    n.d3
                      .selectAll(".vertical-rule-sync")
                      .attr("x1", t)
                      .attr("x2", t);
                  }),
                h
                  .append("svg:rect")
                  .attr("width", r.innerW)
                  .attr("height", r.innerH + r.margin.bottom)
                  .attr("class", "background-rect"),
                o[e]({
                  chartSvg: h,
                  outerSvg: u,
                  chart: r,
                  data: a,
                  traFormatString: m,
                  locale: i,
                  blue: p,
                  red: d,
                  parentElement: this.element,
                }),
                this.createTooltip();
            },
            createTooltip: function () {
              const t = this.$("circle.timeline-data-point");
              n.Lodash.each(t, (t) => {
                n.TooltipManager.assign(
                  t,
                  i({ text: t.attributes.tooltip.value }),
                  {},
                  {
                    targetAnchor: { x: "center", y: "top" },
                    tooltipAnchor: { x: "center", y: "bottom" },
                    offset: { x: 0, y: 0 },
                  },
                );
              });
            },
            didInsertElement: function () {
              const t = this.get("chartData");
              if (t) {
                const e = this.get("chartData.ownerId"),
                  a = n.Lodash.find(t.participants, {
                    participantId: e,
                  }).teamId;
                let s = n.Lodash.sortBy(t.participants, function (t) {
                    return t.participantId === e ? -2 : t.teamId === a ? -1 : 1;
                  }),
                  l = 1;
                (s = n.Lodash.keyBy(s, () => l++)),
                  this.set("chartData.participants", s),
                  this.draw(t, this.get("chartType"));
              }
            },
          });
        function c(t, e, a, s, l) {
          const i = a.width,
            o = a.height,
            { margin: r } = a,
            c = o - r.top - r.bottom,
            m = i - r.left - r.right;
          let p,
            d = 0;
          if ("teamGoldAdvantage" === e)
            (p = Math.max(
              n.d3.max(t, (t) => t.gold),
              Math.abs(n.d3.min(t, (t) => t.gold)),
            )),
              (d = -p);
          else if ("teamGold" === e) {
            const e = t[t.length - 1];
            p = n.Lodash.max(n.Lodash.values(n.Lodash.omit(e, "timestamp")));
          } else
            "championGold" === e &&
              (p = n.Lodash.max(n.Lodash.values(t[t.length - 1].champions)));
          (p = 1e3 * Math.ceil(p / 1e3)), (d = 1e3 * Math.floor(d / 1e3));
          const u = n.d3.scale
              .linear()
              .range([0, m])
              .domain([0, t[t.length - 1].timestamp]),
            h = n.d3.scale.linear().range([c, 0]).domain([d, p]),
            g = n.d3.svg
              .axis()
              .scale(u)
              .ticks(a.ticks.x)
              .tickPadding(a.tickPadding.x)
              .tickSize(0)
              .tickFormat(n.l10nDuration.formatMilliseconds),
            f = n.d3.svg
              .axis()
              .scale(h)
              .orient("left")
              .tickSize(-m)
              .tickPadding(a.tickPadding.y)
              .tickFormat((t) => {
                let e = n.d3.format("s")(Math.abs(t)).replace("k", s);
                return "de_DE" === l && (e = e.replace(".", ",")), e;
              });
          return {
            w: i,
            h: o,
            innerW: m,
            innerH: c,
            margin: r,
            pointRarius: a.pointRarius,
            scale: { x: u, y: h },
            axis: { x: g, y: f },
          };
        }
        function m(t) {
          const {
              chartSvg: e,
              chart: a,
              data: s,
              traFormatString: l,
              locale: i,
              blue: o,
              red: r,
            } = t,
            c = h(s),
            m = e.append("svg:g");
          m
            .selectAll("line")
            .data(c)
            .enter()
            .append("line")
            .attr("class", (t) =>
              0 === t.y1 && 0 === t.y2
                ? "data-line data-stroke-even"
                : t.y1 > 0 || t.y2 > 0
                  ? "data-line data-stroke-100"
                  : "data-line data-stroke-200",
            )
            .attr("x1", (t) => a.scale.x(t.x1))
            .attr("y1", a.scale.y(0))
            .attr("x2", (t) => a.scale.x(t.x2))
            .attr("y2", a.scale.y(0)),
            m
              .selectAll("line")
              .data(c)
              .transition()
              .delay(200)
              .duration(430)
              .ease("cubic-out")
              .attr("y1", (t) => a.scale.y(t.y1))
              .attr("y2", (t) => a.scale.y(t.y2));
          const p = n.d3.svg
              .area()
              .interpolate("linear")
              .x((t) => a.scale.x(t.x))
              .y0(a.scale.y(0))
              .y1((t) => a.scale.y(t.y)),
            d = n.d3.svg
              .area()
              .interpolate("linear")
              .x((t) => a.scale.x(t.x))
              .y0(a.scale.y(0))
              .y1(a.scale.y(0)),
            u = g(c),
            _ = e.append("svg:g");
          _.selectAll("path")
            .data(u)
            .enter()
            .append("path")
            .attr("class", (t) => "data-area data-fill-" + t.teamId)
            .attr("d", (t) => d(t.data)),
            _.selectAll("path")
              .data(u)
              .transition()
              .delay(200)
              .duration(430)
              .ease("cubic-out")
              .attr("d", (t) => p(t.data));
          const y = e.append("svg:g");
          y
            .selectAll(".timeline-data-point")
            .data(s)
            .enter()
            .append("circle")
            .attr("class", (t) =>
              t.gold > 0
                ? "timeline-data-point data-fill-100"
                : t.gold < 0
                  ? "timeline-data-point data-fill-200"
                  : "timeline-data-point data-fill-even",
            )
            .attr("cx", (t) => a.scale.x(t.timestamp))
            .attr("cy", a.scale.y(0))
            .attr("r", () => a.pointRarius)
            .attr("tooltip", (t) => f(t, l, i, t.gold > 0 ? o : r)),
            y
              .selectAll(".timeline-data-point")
              .data(s)
              .transition()
              .delay(200)
              .duration(430)
              .ease("cubic-out")
              .attr("cy", (t) => a.scale.y(t.gold));
        }
        function p(t) {
          const {
              chartSvg: e,
              chart: a,
              data: s,
              traFormatString: l,
              locale: i,
            } = t,
            o = u(s);
          n.Lodash.each([100, 200], (t) => {
            const r = n.d3.svg
              .line()
              .x((t) => a.scale.x(t.timestamp))
              .y((e) => a.scale.y(e[t]))
              .interpolate("linear");
            e
              .append("svg:g")
              .selectAll(".data-line")
              .data([s])
              .enter()
              .append("svg:path")
              .attr(
                "class",
                "data-line data-stroke-" + (t === o ? "100" : "200"),
              )
              .attr("d", r(s)),
              e
                .append("svg:g")
                .selectAll(".timeline-data-point")
                .data(s)
                .enter()
                .append("svg:circle")
                .attr(
                  "class",
                  "timeline-data-point data-fill-" + (t === o ? "100" : "200"),
                )
                .attr("cx", (t) => a.scale.x(t.timestamp))
                .attr("cy", (e) => a.scale.y(e[t]))
                .attr("r", () => a.pointRarius)
                .attr("tooltip", (e) => _(e[t], e.timestamp, l, i));
          });
        }
        function d(t) {
          const {
              chartSvg: e,
              chart: a,
              data: s,
              traFormatString: l,
              locale: i,
              parentElement: o,
            } = t,
            { participants: r } = s,
            c = document.createElement("div");
          c.classList.add("match-details-champ-gold-toggle-container"),
            o.appendChild(c);
          const m = document.createElement("div");
          m.classList.add("champ-gold-toggles", "champ-gold-toggles-100");
          const p = document.createElement("div");
          p.classList.add("champ-gold-toggles", "champ-gold-toggles-200"),
            c.appendChild(m),
            c.appendChild(p);
          const d = { 100: m, 200: p },
            h = u(s);
          n.Lodash.each(r, (t) => {
            const o = t.participantId + "" === s.ownerId,
              r = o ? "owner" : t.teamId === h ? "100" : "200",
              c = o ? "" : "none",
              m = e
                .append("svg:g")
                .attr("class", "data-champ-gold-" + t.participantId)
                .style("display", c)
                .selectAll(".data-champ-gold"),
              p = n.d3.svg
                .line()
                .x((t) => a.scale.x(t.timestamp))
                .y((e) => a.scale.y(e.champions[t.participantId]))
                .interpolate("linear");
            m
              .data([s])
              .enter()
              .append("svg:path")
              .attr("class", `data-line data-stroke-${r}`)
              .attr("d", p(s)),
              m
                .data(s)
                .enter()
                .append("svg:circle")
                .attr("class", `timeline-data-point data-fill-${r}`)
                .attr("cx", (t) => a.scale.x(t.timestamp))
                .attr("cy", (e) => a.scale.y(e.champions[t.participantId]))
                .attr("r", () => a.pointRarius)
                .attr("tooltip", (e) =>
                  _(e.champions[t.participantId], e.timestamp, l, i),
                );
            const u = d[t.teamId === h ? 100 : 200],
              g = document.createElement("div");
            g.classList.add(`gold-toggle-${r}`, "champ-gold-toggle-icon"),
              g.setAttribute("status", o ? "shown" : "hidden");
            const f = document.createElement("img");
            f.classList.add("champ-gold-toggle-img"),
              (f.src = t.imgSrc),
              g.appendChild(f),
              u.appendChild(g),
              g.addEventListener("click", () => {
                const a = e.select(".data-champ-gold-" + t.participantId),
                  n = "none" === a.style("display");
                a.style("display", n ? "" : "none"),
                  g.setAttribute("status", n ? "shown" : "hidden");
              });
          });
        }
        function u(t) {
          let e = 100;
          return (
            n.Lodash.each(t.participants, (a) => {
              a.participantId + "" === t.ownerId && (e = a.teamId);
            }),
            e
          );
        }
        function h(t) {
          return n.Lodash.reduce(
            t,
            (e, a, n) => {
              const s = t[n + 1];
              if (s)
                if (a.gold * s.gold < 0) {
                  const t =
                    a.timestamp +
                    Math.abs(
                      ((s.timestamp - a.timestamp) * a.gold) /
                        (s.gold - a.gold),
                    );
                  e.push({ x1: a.timestamp, y1: a.gold, x2: t, y2: 0 }),
                    e.push({ x1: t, y1: 0, x2: s.timestamp, y2: s.gold });
                } else
                  e.push({
                    x1: a.timestamp,
                    y1: a.gold,
                    x2: s.timestamp,
                    y2: s.gold,
                  });
              return e;
            },
            [],
          );
        }
        function g(t) {
          if (t.length) {
            const e = { x: t[0].x1, y: t[0].y1 };
            return n.Lodash.reduce(
              t,
              (t, e) => {
                const a = { x: e.x2, y: e.y2 };
                return (
                  a.y >= 0 && t[0].data.push(a),
                  a.y <= 0 && t[1].data.push(a),
                  t
                );
              },
              [
                { teamId: 100, data: [e] },
                { teamId: 200, data: [e] },
              ],
            );
          }
          return [
            { teamId: 100, data: [{ x: 0, y: 0 }] },
            { teamId: 200, data: [{ x: 0, y: 0 }] },
          ];
        }
        function f(t, e, a, s) {
          const i = n.l10nDuration.formatMilliseconds(t.timestamp);
          return 0 === t.gold
            ? e("MATCH_HISTORY_OVERVIEW_TIMELINE_GOLD_ADVANTAGE_TOOLTIP_EVEN", {
                time: i,
              })
            : e(
                "MATCH_HISTORY_OVERVIEW_TIMELINE_GOLD_ADVANTAGE_TOOLTIP_AHEAD",
                {
                  team: s,
                  gold: l.default.formatGold(Math.abs(t.gold), a),
                  time: i,
                },
              );
        }
        function _(t, e, a, s) {
          const i = n.l10nDuration.formatMilliseconds(e);
          return a("MATCH_HISTORY_OVERVIEW_TIMELINE_GOLD_TOOLTIP", {
            gold: l.default.formatGold(t, s),
            time: i,
          });
        }
        function y(t, e) {
          return `translate(${t},${e})`;
        }
        t.exports = {
          TimelineChartComponent: r,
          getChartBasicInfo: c,
          drawTeamGoldAdvantageSpecifics: m,
          drawTeamGoldSpecifics: p,
          drawChampionGoldSpecifics: d,
          getZeroYInterpolatedPoints: h,
          getTeamDataGroups: g,
          getTeamGoldAdvantageTooltip: f,
          getGoldTooltip: _,
          getTranslateAttr: y,
        };
      },
      (t, e, a) => {
        "use strict";
        a.r(e);
      },
      (t, e, a) => {
        var n = a(60);
        t.exports = (n.default || n).template({
          compiler: [7, ">= 4.0.0"],
          main: function (t, e, a, n, s) {
            var l;
            return (
              '<lol-uikit-tooltip>\r\n  <div class="match-details-timeline-tooltip">\r\n    <span class="match-details-timeline-tooltip-text">' +
              t.escapeExpression(
                "function" ==
                  typeof (l =
                    null != (l = a.text || (null != e ? e.text : e))
                      ? l
                      : a.helperMissing)
                  ? l.call(null != e ? e : t.nullContext || {}, {
                      name: "text",
                      hash: {},
                      data: s,
                    })
                  : l,
              ) +
              "</span>\r\n  </div>\r\n</lol-uikit-tooltip>"
            );
          },
          useData: !0,
        });
      },
      (t, e, a) => {
        t.exports = a(61).default;
      },
      (t, e, a) => {
        "use strict";
        function n(t) {
          return t && t.__esModule ? t : { default: t };
        }
        function s(t) {
          if (t && t.__esModule) return t;
          var e = {};
          if (null != t)
            for (var a in t)
              Object.prototype.hasOwnProperty.call(t, a) && (e[a] = t[a]);
          return (e.default = t), e;
        }
        e.__esModule = !0;
        var l = s(a(62)),
          i = n(a(76)),
          o = n(a(64)),
          r = s(a(63)),
          c = s(a(77)),
          m = n(a(78));
        function p() {
          var t = new l.HandlebarsEnvironment();
          return (
            r.extend(t, l),
            (t.SafeString = i.default),
            (t.Exception = o.default),
            (t.Utils = r),
            (t.escapeExpression = r.escapeExpression),
            (t.VM = c),
            (t.template = function (e) {
              return c.template(e, t);
            }),
            t
          );
        }
        var d = p();
        (d.create = p),
          m.default(d),
          (d.default = d),
          (e.default = d),
          (t.exports = e.default);
      },
      (t, e, a) => {
        "use strict";
        function n(t) {
          return t && t.__esModule ? t : { default: t };
        }
        (e.__esModule = !0), (e.HandlebarsEnvironment = m);
        var s = a(63),
          l = n(a(64)),
          i = a(65),
          o = a(73),
          r = n(a(75));
        e.VERSION = "4.1.2";
        e.COMPILER_REVISION = 7;
        e.REVISION_CHANGES = {
          1: "<= 1.0.rc.2",
          2: "== 1.0.0-rc.3",
          3: "== 1.0.0-rc.4",
          4: "== 1.x.x",
          5: "== 2.0.0-alpha.x",
          6: ">= 2.0.0-beta.1",
          7: ">= 4.0.0",
        };
        var c = "[object Object]";
        function m(t, e, a) {
          (this.helpers = t || {}),
            (this.partials = e || {}),
            (this.decorators = a || {}),
            i.registerDefaultHelpers(this),
            o.registerDefaultDecorators(this);
        }
        m.prototype = {
          constructor: m,
          logger: r.default,
          log: r.default.log,
          registerHelper: function (t, e) {
            if (s.toString.call(t) === c) {
              if (e)
                throw new l.default("Arg not supported with multiple helpers");
              s.extend(this.helpers, t);
            } else this.helpers[t] = e;
          },
          unregisterHelper: function (t) {
            delete this.helpers[t];
          },
          registerPartial: function (t, e) {
            if (s.toString.call(t) === c) s.extend(this.partials, t);
            else {
              if (void 0 === e)
                throw new l.default(
                  'Attempting to register a partial called "' +
                    t +
                    '" as undefined',
                );
              this.partials[t] = e;
            }
          },
          unregisterPartial: function (t) {
            delete this.partials[t];
          },
          registerDecorator: function (t, e) {
            if (s.toString.call(t) === c) {
              if (e)
                throw new l.default(
                  "Arg not supported with multiple decorators",
                );
              s.extend(this.decorators, t);
            } else this.decorators[t] = e;
          },
          unregisterDecorator: function (t) {
            delete this.decorators[t];
          },
        };
        var p = r.default.log;
        (e.log = p), (e.createFrame = s.createFrame), (e.logger = r.default);
      },
      (t, e) => {
        "use strict";
        (e.__esModule = !0),
          (e.extend = i),
          (e.indexOf = function (t, e) {
            for (var a = 0, n = t.length; a < n; a++) if (t[a] === e) return a;
            return -1;
          }),
          (e.escapeExpression = function (t) {
            if ("string" != typeof t) {
              if (t && t.toHTML) return t.toHTML();
              if (null == t) return "";
              if (!t) return t + "";
              t = "" + t;
            }
            if (!s.test(t)) return t;
            return t.replace(n, l);
          }),
          (e.isEmpty = function (t) {
            return (!t && 0 !== t) || !(!c(t) || 0 !== t.length);
          }),
          (e.createFrame = function (t) {
            var e = i({}, t);
            return (e._parent = t), e;
          }),
          (e.blockParams = function (t, e) {
            return (t.path = e), t;
          }),
          (e.appendContextPath = function (t, e) {
            return (t ? t + "." : "") + e;
          });
        var a = {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#x27;",
            "`": "&#x60;",
            "=": "&#x3D;",
          },
          n = /[&<>"'`=]/g,
          s = /[&<>"'`=]/;
        function l(t) {
          return a[t];
        }
        function i(t) {
          for (var e = 1; e < arguments.length; e++)
            for (var a in arguments[e])
              Object.prototype.hasOwnProperty.call(arguments[e], a) &&
                (t[a] = arguments[e][a]);
          return t;
        }
        var o = Object.prototype.toString;
        e.toString = o;
        var r = function (t) {
          return "function" == typeof t;
        };
        r(/x/) &&
          (e.isFunction = r =
            function (t) {
              return (
                "function" == typeof t && "[object Function]" === o.call(t)
              );
            }),
          (e.isFunction = r);
        var c =
          Array.isArray ||
          function (t) {
            return (
              !(!t || "object" != typeof t) && "[object Array]" === o.call(t)
            );
          };
        e.isArray = c;
      },
      (t, e) => {
        "use strict";
        e.__esModule = !0;
        var a = [
          "description",
          "fileName",
          "lineNumber",
          "message",
          "name",
          "number",
          "stack",
        ];
        function n(t, e) {
          var s = e && e.loc,
            l = void 0,
            i = void 0;
          s && (t += " - " + (l = s.start.line) + ":" + (i = s.start.column));
          for (
            var o = Error.prototype.constructor.call(this, t), r = 0;
            r < a.length;
            r++
          )
            this[a[r]] = o[a[r]];
          Error.captureStackTrace && Error.captureStackTrace(this, n);
          try {
            s &&
              ((this.lineNumber = l),
              Object.defineProperty
                ? Object.defineProperty(this, "column", {
                    value: i,
                    enumerable: !0,
                  })
                : (this.column = i));
          } catch (t) {}
        }
        (n.prototype = new Error()), (e.default = n), (t.exports = e.default);
      },
      (t, e, a) => {
        "use strict";
        function n(t) {
          return t && t.__esModule ? t : { default: t };
        }
        (e.__esModule = !0),
          (e.registerDefaultHelpers = function (t) {
            s.default(t),
              l.default(t),
              i.default(t),
              o.default(t),
              r.default(t),
              c.default(t),
              m.default(t);
          });
        var s = n(a(66)),
          l = n(a(67)),
          i = n(a(68)),
          o = n(a(69)),
          r = n(a(70)),
          c = n(a(71)),
          m = n(a(72));
      },
      (t, e, a) => {
        "use strict";
        e.__esModule = !0;
        var n = a(63);
        (e.default = function (t) {
          t.registerHelper("blockHelperMissing", function (e, a) {
            var s = a.inverse,
              l = a.fn;
            if (!0 === e) return l(this);
            if (!1 === e || null == e) return s(this);
            if (n.isArray(e))
              return e.length > 0
                ? (a.ids && (a.ids = [a.name]), t.helpers.each(e, a))
                : s(this);
            if (a.data && a.ids) {
              var i = n.createFrame(a.data);
              (i.contextPath = n.appendContextPath(a.data.contextPath, a.name)),
                (a = { data: i });
            }
            return l(e, a);
          });
        }),
          (t.exports = e.default);
      },
      (t, e, a) => {
        "use strict";
        e.__esModule = !0;
        var n,
          s = a(63),
          l = a(64),
          i = (n = l) && n.__esModule ? n : { default: n };
        (e.default = function (t) {
          t.registerHelper("each", function (t, e) {
            if (!e) throw new i.default("Must pass iterator to #each");
            var a = e.fn,
              n = e.inverse,
              l = 0,
              o = "",
              r = void 0,
              c = void 0;
            function m(e, n, l) {
              r &&
                ((r.key = e),
                (r.index = n),
                (r.first = 0 === n),
                (r.last = !!l),
                c && (r.contextPath = c + e)),
                (o += a(t[e], {
                  data: r,
                  blockParams: s.blockParams([t[e], e], [c + e, null]),
                }));
            }
            if (
              (e.data &&
                e.ids &&
                (c = s.appendContextPath(e.data.contextPath, e.ids[0]) + "."),
              s.isFunction(t) && (t = t.call(this)),
              e.data && (r = s.createFrame(e.data)),
              t && "object" == typeof t)
            )
              if (s.isArray(t))
                for (var p = t.length; l < p; l++)
                  l in t && m(l, l, l === t.length - 1);
              else {
                var d = void 0;
                for (var u in t)
                  t.hasOwnProperty(u) &&
                    (void 0 !== d && m(d, l - 1), (d = u), l++);
                void 0 !== d && m(d, l - 1, !0);
              }
            return 0 === l && (o = n(this)), o;
          });
        }),
          (t.exports = e.default);
      },
      (t, e, a) => {
        "use strict";
        e.__esModule = !0;
        var n,
          s = a(64),
          l = (n = s) && n.__esModule ? n : { default: n };
        (e.default = function (t) {
          t.registerHelper("helperMissing", function () {
            if (1 !== arguments.length)
              throw new l.default(
                'Missing helper: "' +
                  arguments[arguments.length - 1].name +
                  '"',
              );
          });
        }),
          (t.exports = e.default);
      },
      (t, e, a) => {
        "use strict";
        e.__esModule = !0;
        var n = a(63);
        (e.default = function (t) {
          t.registerHelper("if", function (t, e) {
            return (
              n.isFunction(t) && (t = t.call(this)),
              (!e.hash.includeZero && !t) || n.isEmpty(t)
                ? e.inverse(this)
                : e.fn(this)
            );
          }),
            t.registerHelper("unless", function (e, a) {
              return t.helpers.if.call(this, e, {
                fn: a.inverse,
                inverse: a.fn,
                hash: a.hash,
              });
            });
        }),
          (t.exports = e.default);
      },
      (t, e) => {
        "use strict";
        (e.__esModule = !0),
          (e.default = function (t) {
            t.registerHelper("log", function () {
              for (
                var e = [void 0], a = arguments[arguments.length - 1], n = 0;
                n < arguments.length - 1;
                n++
              )
                e.push(arguments[n]);
              var s = 1;
              null != a.hash.level
                ? (s = a.hash.level)
                : a.data && null != a.data.level && (s = a.data.level),
                (e[0] = s),
                t.log.apply(t, e);
            });
          }),
          (t.exports = e.default);
      },
      (t, e) => {
        "use strict";
        (e.__esModule = !0),
          (e.default = function (t) {
            t.registerHelper("lookup", function (t, e) {
              return t
                ? "constructor" !== e || t.propertyIsEnumerable(e)
                  ? t[e]
                  : void 0
                : t;
            });
          }),
          (t.exports = e.default);
      },
      (t, e, a) => {
        "use strict";
        e.__esModule = !0;
        var n = a(63);
        (e.default = function (t) {
          t.registerHelper("with", function (t, e) {
            n.isFunction(t) && (t = t.call(this));
            var a = e.fn;
            if (n.isEmpty(t)) return e.inverse(this);
            var s = e.data;
            return (
              e.data &&
                e.ids &&
                ((s = n.createFrame(e.data)).contextPath = n.appendContextPath(
                  e.data.contextPath,
                  e.ids[0],
                )),
              a(t, {
                data: s,
                blockParams: n.blockParams([t], [s && s.contextPath]),
              })
            );
          });
        }),
          (t.exports = e.default);
      },
      (t, e, a) => {
        "use strict";
        (e.__esModule = !0),
          (e.registerDefaultDecorators = function (t) {
            l.default(t);
          });
        var n,
          s = a(74),
          l = (n = s) && n.__esModule ? n : { default: n };
      },
      (t, e, a) => {
        "use strict";
        e.__esModule = !0;
        var n = a(63);
        (e.default = function (t) {
          t.registerDecorator("inline", function (t, e, a, s) {
            var l = t;
            return (
              e.partials ||
                ((e.partials = {}),
                (l = function (s, l) {
                  var i = a.partials;
                  a.partials = n.extend({}, i, e.partials);
                  var o = t(s, l);
                  return (a.partials = i), o;
                })),
              (e.partials[s.args[0]] = s.fn),
              l
            );
          });
        }),
          (t.exports = e.default);
      },
      (t, e, a) => {
        "use strict";
        e.__esModule = !0;
        var n = a(63),
          s = {
            methodMap: ["debug", "info", "warn", "error"],
            level: "info",
            lookupLevel: function (t) {
              if ("string" == typeof t) {
                var e = n.indexOf(s.methodMap, t.toLowerCase());
                t = e >= 0 ? e : parseInt(t, 10);
              }
              return t;
            },
            log: function (t) {
              if (
                ((t = s.lookupLevel(t)),
                "undefined" != typeof console && s.lookupLevel(s.level) <= t)
              ) {
                var e = s.methodMap[t];
                console[e] || (e = "log");
                for (
                  var a = arguments.length, n = Array(a > 1 ? a - 1 : 0), l = 1;
                  l < a;
                  l++
                )
                  n[l - 1] = arguments[l];
                console[e].apply(console, n);
              }
            },
          };
        (e.default = s), (t.exports = e.default);
      },
      (t, e) => {
        "use strict";
        function a(t) {
          this.string = t;
        }
        (e.__esModule = !0),
          (a.prototype.toString = a.prototype.toHTML =
            function () {
              return "" + this.string;
            }),
          (e.default = a),
          (t.exports = e.default);
      },
      (t, e, a) => {
        "use strict";
        (e.__esModule = !0),
          (e.checkRevision = function (t) {
            var e = (t && t[0]) || 1,
              a = o.COMPILER_REVISION;
            if (e !== a) {
              if (e < a) {
                var n = o.REVISION_CHANGES[a],
                  s = o.REVISION_CHANGES[e];
                throw new i.default(
                  "Template was precompiled with an older version of Handlebars than the current runtime. Please update your precompiler to a newer version (" +
                    n +
                    ") or downgrade your runtime to an older version (" +
                    s +
                    ").",
                );
              }
              throw new i.default(
                "Template was precompiled with a newer version of Handlebars than the current runtime. Please update your runtime to a newer version (" +
                  t[1] +
                  ").",
              );
            }
          }),
          (e.template = function (t, e) {
            if (!e) throw new i.default("No environment passed to template");
            if (!t || !t.main)
              throw new i.default("Unknown template object: " + typeof t);
            (t.main.decorator = t.main_d), e.VM.checkRevision(t.compiler);
            var a = {
              strict: function (t, e) {
                if (!(e in t))
                  throw new i.default('"' + e + '" not defined in ' + t);
                return t[e];
              },
              lookup: function (t, e) {
                for (var a = t.length, n = 0; n < a; n++)
                  if (t[n] && null != t[n][e]) return t[n][e];
              },
              lambda: function (t, e) {
                return "function" == typeof t ? t.call(e) : t;
              },
              escapeExpression: s.escapeExpression,
              invokePartial: function (a, n, l) {
                l.hash &&
                  ((n = s.extend({}, n, l.hash)), l.ids && (l.ids[0] = !0)),
                  (a = e.VM.resolvePartial.call(this, a, n, l));
                var o = e.VM.invokePartial.call(this, a, n, l);
                if (
                  (null == o &&
                    e.compile &&
                    ((l.partials[l.name] = e.compile(a, t.compilerOptions, e)),
                    (o = l.partials[l.name](n, l))),
                  null != o)
                ) {
                  if (l.indent) {
                    for (
                      var r = o.split("\n"), c = 0, m = r.length;
                      c < m && (r[c] || c + 1 !== m);
                      c++
                    )
                      r[c] = l.indent + r[c];
                    o = r.join("\n");
                  }
                  return o;
                }
                throw new i.default(
                  "The partial " +
                    l.name +
                    " could not be compiled when running in runtime-only mode",
                );
              },
              fn: function (e) {
                var a = t[e];
                return (a.decorator = t[e + "_d"]), a;
              },
              programs: [],
              program: function (t, e, a, n, s) {
                var l = this.programs[t],
                  i = this.fn(t);
                return (
                  e || s || n || a
                    ? (l = r(this, t, i, e, a, n, s))
                    : l || (l = this.programs[t] = r(this, t, i)),
                  l
                );
              },
              data: function (t, e) {
                for (; t && e--; ) t = t._parent;
                return t;
              },
              merge: function (t, e) {
                var a = t || e;
                return t && e && t !== e && (a = s.extend({}, e, t)), a;
              },
              nullContext: Object.seal({}),
              noop: e.VM.noop,
              compilerInfo: t.compiler,
            };
            function n(e) {
              var s =
                  arguments.length <= 1 || void 0 === arguments[1]
                    ? {}
                    : arguments[1],
                l = s.data;
              n._setup(s),
                !s.partial &&
                  t.useData &&
                  (l = (function (t, e) {
                    (e && "root" in e) ||
                      ((e = e ? o.createFrame(e) : {}).root = t);
                    return e;
                  })(e, l));
              var i = void 0,
                r = t.useBlockParams ? [] : void 0;
              function c(e) {
                return "" + t.main(a, e, a.helpers, a.partials, l, r, i);
              }
              return (
                t.useDepths &&
                  (i = s.depths
                    ? e != s.depths[0]
                      ? [e].concat(s.depths)
                      : s.depths
                    : [e]),
                (c = m(t.main, c, a, s.depths || [], l, r))(e, s)
              );
            }
            return (
              (n.isTop = !0),
              (n._setup = function (n) {
                n.partial
                  ? ((a.helpers = n.helpers),
                    (a.partials = n.partials),
                    (a.decorators = n.decorators))
                  : ((a.helpers = a.merge(n.helpers, e.helpers)),
                    t.usePartial &&
                      (a.partials = a.merge(n.partials, e.partials)),
                    (t.usePartial || t.useDecorators) &&
                      (a.decorators = a.merge(n.decorators, e.decorators)));
              }),
              (n._child = function (e, n, s, l) {
                if (t.useBlockParams && !s)
                  throw new i.default("must pass block params");
                if (t.useDepths && !l)
                  throw new i.default("must pass parent depths");
                return r(a, e, t[e], n, 0, s, l);
              }),
              n
            );
          }),
          (e.wrapProgram = r),
          (e.resolvePartial = function (t, e, a) {
            t
              ? t.call || a.name || ((a.name = t), (t = a.partials[t]))
              : (t =
                  "@partial-block" === a.name
                    ? a.data["partial-block"]
                    : a.partials[a.name]);
            return t;
          }),
          (e.invokePartial = function (t, e, a) {
            var n = a.data && a.data["partial-block"];
            (a.partial = !0),
              a.ids && (a.data.contextPath = a.ids[0] || a.data.contextPath);
            var l = void 0;
            a.fn &&
              a.fn !== c &&
              (function () {
                a.data = o.createFrame(a.data);
                var t = a.fn;
                (l = a.data["partial-block"] =
                  function (e) {
                    var a =
                      arguments.length <= 1 || void 0 === arguments[1]
                        ? {}
                        : arguments[1];
                    return (
                      (a.data = o.createFrame(a.data)),
                      (a.data["partial-block"] = n),
                      t(e, a)
                    );
                  }),
                  t.partials &&
                    (a.partials = s.extend({}, a.partials, t.partials));
              })();
            void 0 === t && l && (t = l);
            if (void 0 === t)
              throw new i.default(
                "The partial " + a.name + " could not be found",
              );
            if (t instanceof Function) return t(e, a);
          }),
          (e.noop = c);
        var n,
          s = (function (t) {
            if (t && t.__esModule) return t;
            var e = {};
            if (null != t)
              for (var a in t)
                Object.prototype.hasOwnProperty.call(t, a) && (e[a] = t[a]);
            return (e.default = t), e;
          })(a(63)),
          l = a(64),
          i = (n = l) && n.__esModule ? n : { default: n },
          o = a(62);
        function r(t, e, a, n, s, l, i) {
          function o(e) {
            var s =
                arguments.length <= 1 || void 0 === arguments[1]
                  ? {}
                  : arguments[1],
              o = i;
            return (
              !i ||
                e == i[0] ||
                (e === t.nullContext && null === i[0]) ||
                (o = [e].concat(i)),
              a(
                t,
                e,
                t.helpers,
                t.partials,
                s.data || n,
                l && [s.blockParams].concat(l),
                o,
              )
            );
          }
          return (
            ((o = m(a, o, t, i, n, l)).program = e),
            (o.depth = i ? i.length : 0),
            (o.blockParams = s || 0),
            o
          );
        }
        function c() {
          return "";
        }
        function m(t, e, a, n, l, i) {
          if (t.decorator) {
            var o = {};
            (e = t.decorator(e, o, a, n && n[0], l, i, n)), s.extend(e, o);
          }
          return e;
        }
      },
      (t, e, a) => {
        "use strict";
        (e.__esModule = !0),
          (e.default = function (t) {
            var e = void 0 !== a.g ? a.g : window,
              n = e.Handlebars;
            t.noConflict = function () {
              return e.Handlebars === t && (e.Handlebars = n), t;
            };
          }),
          (t.exports = e.default);
      },
      (t, e, a) => {
        const n = a(1).Ember;
        t.exports = n.HTMLBars.template({
          id: "zkklUQKw",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-match-history\\\\src\\\\components\\\\overview\\\\match-details-timeline-chart-component\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-match-history\\\\src\\\\components\\\\overview\\\\match-details-timeline-chart-component\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-match-history\\\\src\\\\components\\\\overview\\\\match-details-timeline-chart-component\\\\index.js\\" "],["text","\\n"]],"locals":[],"named":[],"yields":[],"blocks":[],"hasPartials":false}',
          meta: {},
        });
      },
      (t, e, a) => {
        "use strict";
        var n = a(1);
        a(81);
        const s = a(82);
        t.exports = n.Ember.Component.extend({
          classNames: ["match-details-event-chart-component"],
          layout: a(83),
          draw: function (t) {
            const { events: e } = t.timelines,
              a = this.get("specs"),
              s = (function (t, e) {
                const a = e.width,
                  s = e.height,
                  { margin: l } = e,
                  i = s - l.top - l.bottom,
                  o = a - l.left - l.right,
                  r = n.d3.max(t, (t) => {
                    const e = n.Lodash.map(t.kills, "count");
                    return e.length ? n.Lodash.max(e) : 0;
                  }),
                  c = n.d3.scale
                    .linear()
                    .range([0, o])
                    .domain([0, t[t.length - 1].timestamp]),
                  m = n.d3.scale
                    .linear()
                    .range([e.pointRadius.min, e.pointRadius.max])
                    .domain([0, r]);
                return {
                  w: a,
                  h: s,
                  innerW: o,
                  innerH: i,
                  frameW: o / t.length,
                  frameH: e.frameHeight,
                  margin: l,
                  scale: { x: c, radius: m },
                };
              })(e, a),
              l = n.d3
                .select(this.$().get(0))
                .append("svg:svg")
                .attr("width", s.w)
                .attr("height", s.h)
                .attr("class", "match-details-event-chart"),
              i = l
                .append("svg:g")
                .attr(
                  "transform",
                  `translate(${s.margin.left}, ${s.margin.top})`,
                )
                .attr("class", "match-details-event-chart-interact");
            i
              .append("svg:line")
              .attr("class", "vertical-rule-sync")
              .attr("y1", -s.margin.top)
              .attr("y2", s.innerH + s.margin.top)
              .style("display", "none"),
              i
                .on("mouseover", () =>
                  n.d3
                    .selectAll(".vertical-rule-sync")
                    .style("display", "block"),
                )
                .on("mouseout", () =>
                  n.d3
                    .selectAll(".vertical-rule-sync")
                    .style("display", "none"),
                )
                .on("mousemove", function () {
                  const t = n.d3.mouse(this)[0];
                  n.d3
                    .selectAll(".vertical-rule-sync")
                    .attr("x1", t)
                    .attr("x2", t);
                }),
              i
                .append("svg:rect")
                .attr("width", s.innerW)
                .attr("height", s.innerH)
                .attr("class", "background-rect");
            const o = i
              .append("svg:g")
              .selectAll(".match-details-event-frame")
              .data(e)
              .enter()
              .append("svg:g")
              .filter((t) => t.kills.length + t.objectives.length > 0)
              .attr("class", "match-details-event-frame")
              .attr(
                "transform",
                (t) => "translate(" + s.scale.x(t.timestamp) + ", 0)",
              )
              .attr("tooltipData", (t) => JSON.stringify(t.details))
              .on("mouseover", function () {
                n.d3
                  .select(this)
                  .style("filter", 'url("#match-details-brightness-filter")');
              })
              .on("mouseout", function () {
                n.d3.select(this).style("filter", "none");
              });
            o
              .append("svg:rect")
              .attr("x", -s.frameW / 2)
              .attr("y", 0)
              .attr("width", s.frameW)
              .attr("height", s.frameH)
              .attr("class", "background-rect"),
              o
                .selectAll(".match-details-event-kills")
                .data((t) => t.kills)
                .enter()
                .append("svg:circle")
                .attr(
                  "class",
                  (t) =>
                    "match-details-event-kills data-point data-fill-" +
                    t.teamId,
                )
                .attr("cx", 0)
                .attr("cy", (t) => a.killDotsTransition.y(t.teamId))
                .attr("r", (t) => s.scale.radius(t.count)),
              o
                .selectAll(".match-details-event-objectives")
                .data((t) => t.objectives)
                .enter()
                .append("svg:foreignObject")
                .attr("x", 0)
                .attr("y", (t) => a.objectiveIconTransition.y(t.teamId))
                .append("xhtml:div")
                .attr(
                  "class",
                  (t) =>
                    `match-details-event-objectives event-icon-${t.objective}-${t.teamId}`,
                );
            const r =
              this.get("tra.MATCH_HISTORY_OVERVIEW_EVENT_OBJECTIVES_LABEL") +
              " / " +
              this.get("tra.MATCH_HISTORY_OVERVIEW_EVENT_KILLS_LABEL");
            for (let t = 0; t < 4; t++)
              l.append("svg:text")
                .attr("x", a.textPositions.x)
                .attr("y", a.textPositions.y[t])
                .attr("class", "match-details-event-label")
                .text(t % 2 == 0 ? r : "");
            this.createTooltip();
          },
          createTooltip: function () {
            const t = this.$("g.match-details-event-frame");
            n.Lodash.each(t, (t) => {
              const e = JSON.parse(t.attributes.tooltipData.value);
              n.TooltipManager.assign(
                t,
                s({ data: e }),
                {},
                {
                  targetAnchor: { x: "center", y: "top" },
                  tooltipAnchor: { x: "center", y: "bottom" },
                  offset: { x: 0, y: 0 },
                },
              );
            });
          },
          didInsertElement: function () {
            const t = this.get("chartData");
            t && this.draw(t);
          },
        });
      },
      (t, e, a) => {
        "use strict";
        a.r(e);
      },
      (t, e, a) => {
        var n = a(60);
        t.exports = (n.default || n).template({
          1: function (t, e, a, n, s, l) {
            var i;
            return null !=
              (i = a.unless.call(
                null != e ? e : t.nullContext || {},
                null != (i = l[0][0]) ? i.isEmpty : i,
                {
                  name: "unless",
                  hash: {},
                  fn: t.program(2, s, 0, l),
                  inverse: t.noop,
                  data: s,
                  blockParams: l,
                },
              ))
              ? i
              : "";
          },
          2: function (t, e, a, n, s, l) {
            var i,
              o,
              r = null != e ? e : t.nullContext || {},
              c = a.helperMissing,
              m = "function",
              p = t.escapeExpression;
            return (
              '      <div class="event-tooltip-container-' +
              p(
                typeof (o = null != (o = a.key || (s && s.key)) ? o : c) === m
                  ? o.call(r, {
                      name: "key",
                      hash: {},
                      data: s,
                      blockParams: l,
                    })
                  : o,
              ) +
              '">\r\n        <hr class="event-tooltip-line event-tooltip-line-' +
              p(
                typeof (o = null != (o = a.key || (s && s.key)) ? o : c) === m
                  ? o.call(r, {
                      name: "key",
                      hash: {},
                      data: s,
                      blockParams: l,
                    })
                  : o,
              ) +
              '">\r\n        <div class="event-tooltip-rows">\r\n' +
              (null !=
              (i = a.each.call(r, null != (i = l[1][0]) ? i.rows : i, {
                name: "each",
                hash: {},
                fn: t.program(3, s, 1, l),
                inverse: t.noop,
                data: s,
                blockParams: l,
              }))
                ? i
                : "") +
              "        </div>\r\n      </div>\r\n"
            );
          },
          3: function (t, e, a, n, s, l) {
            var i,
              o = t.lambda,
              r = t.escapeExpression;
            return (
              '          <div class="event-tooltip-row">\r\n            <div class="event-tooltip-icon event-tooltip-killer event-icon-' +
              r(
                o(
                  null != (i = null != (i = l[0][0]) ? i.killer : i)
                    ? i.class
                    : i,
                  e,
                ),
              ) +
              '">\r\n              <div class="event-tooltip-icon-champion">\r\n                <div class="event-tooltip-icon-cover">\r\n                  <img src="' +
              r(
                o(
                  null != (i = null != (i = l[0][0]) ? i.killer : i)
                    ? i.imgSrc
                    : i,
                  e,
                ),
              ) +
              '" class="event-tooltip-icon-img ' +
              r(
                o(
                  null != (i = null != (i = l[0][0]) ? i.killer : i)
                    ? i.imgClass
                    : i,
                  e,
                ),
              ) +
              '"></img>\r\n                </div>\r\n              </div>\r\n            </div>\r\n            <div class="event-tooltip-kill-sign"></div>\r\n' +
              (null !=
              (i = a.each.call(
                null != e ? e : t.nullContext || {},
                null != (i = l[0][0]) ? i.victims : i,
                {
                  name: "each",
                  hash: {},
                  fn: t.program(4, s, 1, l),
                  inverse: t.noop,
                  data: s,
                  blockParams: l,
                },
              ))
                ? i
                : "") +
              "          </div>\r\n"
            );
          },
          4: function (t, e, a, n, s, l) {
            var i;
            return (
              '              <div class="event-tooltip-icon event-tooltip-victim event-icon-' +
              t.escapeExpression(
                t.lambda(null != (i = l[0][0]) ? i.class : i, e),
              ) +
              '">\r\n' +
              (null !=
              (i = a.if.call(
                null != e ? e : t.nullContext || {},
                null != (i = l[0][0]) ? i.isChampion : i,
                {
                  name: "if",
                  hash: {},
                  fn: t.program(5, s, 0, l),
                  inverse: t.noop,
                  data: s,
                  blockParams: l,
                },
              ))
                ? i
                : "") +
              "              </div>\r\n"
            );
          },
          5: function (t, e, a, n, s, l) {
            var i;
            return (
              '                <div class="event-tooltip-icon-champion">\r\n                  <div class="event-tooltip-icon-cover">\r\n                    <img src="' +
              t.escapeExpression(
                t.lambda(null != (i = l[1][0]) ? i.imgSrc : i, e),
              ) +
              '" class="event-tooltip-icon-img"></img>\r\n                  </div>\r\n                </div>\r\n'
            );
          },
          compiler: [7, ">= 4.0.0"],
          main: function (t, e, a, n, s, l) {
            var i;
            return (
              '<lol-uikit-tooltip>\r\n  <div class="match-details-event-tooltip">\r\n' +
              (null !=
              (i = a.each.call(
                null != e ? e : t.nullContext || {},
                null != e ? e.data : e,
                {
                  name: "each",
                  hash: {},
                  fn: t.program(1, s, 1, l),
                  inverse: t.noop,
                  data: s,
                  blockParams: l,
                },
              ))
                ? i
                : "") +
              "  </div>\r\n</lol-uikit-tooltip>"
            );
          },
          useData: !0,
          useBlockParams: !0,
        });
      },
      (t, e, a) => {
        const n = a(1).Ember;
        t.exports = n.HTMLBars.template({
          id: "qIxmMN8K",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-match-history\\\\src\\\\components\\\\overview\\\\match-details-event-chart-component\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-match-history\\\\src\\\\components\\\\overview\\\\match-details-event-chart-component\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-match-history\\\\src\\\\components\\\\overview\\\\match-details-event-chart-component\\\\index.js\\" "],["text","\\n"],["open-element","div",[]],["static-attr","class","match-details-event-bg-100"],["flush-element"],["close-element"],["text","\\n"],["open-element","div",[]],["static-attr","class","match-details-event-bg-200"],["flush-element"],["close-element"],["text","\\n"],["open-element","svg",[]],["static-attr","id","match-details-svg-defs"],["flush-element"],["text","\\n  "],["open-element","defs",[]],["flush-element"],["text","\\n    "],["open-element","filter",[]],["static-attr","id","match-details-brightness-filter"],["flush-element"],["text","\\n      "],["open-element","feComponentTransfer",[]],["flush-element"],["text","\\n        "],["open-element","feFuncR",[]],["static-attr","type","linear"],["static-attr","slope","3"],["flush-element"],["close-element"],["text","\\n        "],["open-element","feFuncG",[]],["static-attr","type","linear"],["static-attr","slope","3"],["flush-element"],["close-element"],["text","\\n        "],["open-element","feFuncB",[]],["static-attr","type","linear"],["static-attr","slope","3"],["flush-element"],["close-element"],["text","\\n      "],["close-element"],["text","\\n    "],["close-element"],["text","\\n  "],["close-element"],["text","\\n"],["close-element"]],"locals":[],"named":[],"yields":[],"blocks":[],"hasPartials":false}',
          meta: {},
        });
      },
      (t, e, a) => {
        "use strict";
        var n = a(1);
        a(85);
        const s = {
            death: { 100: a(86), 200: a(87) },
            tower: { 100: a(88), 200: a(89) },
            inhibitor: { 100: a(90), 200: a(91) },
            nexus: { 100: a(92), 200: a(93) },
          },
          l = { 11: a(94), 12: a(95), 21: a(96) };
        function i(t, e, a, s, l) {
          n.TooltipManager.assign(
            t,
            "MapTooltip",
            { timestamp: e, killerImgSrc: a, victimImgSrc: s, killerTeam: l },
            {
              ComponentFactory: n.ComponentFactory,
              type: "system",
              targetAnchor: { x: "center", y: "top" },
              tooltipAnchor: { x: "center", y: "bottom" },
            },
          );
        }
        t.exports = n.Ember.Component.extend({
          classNames: ["match-details-map-chart-component"],
          layout: a(97),
          displayType: "champion",
          displayPlayer: null,
          playerImgSrcMap: n.Ember.computed("teams", function () {
            const t = {};
            return (
              this.get("teams").forEach((e) => {
                e.forEach((e) => {
                  t[e.participantId] = e.imgSrc;
                });
              }),
              t
            );
          }),
          mapBg: n.Ember.computed("chartData.mapId", function () {
            const t = this.get("chartData");
            return t && t.mapId in l ? l[t.mapId] : null;
          }),
          draw: function (t) {
            const { mapsInfo: e } = t.timelines,
              a = n.Lodash.extend(this.get("specs"), {
                mapBg: this.get("mapBg"),
                images: s,
              }),
              l = a.mapDomains[t.mapId],
              i = n.d3
                .select(this.$(".map-svg-wrapper").get(0))
                .append("svg")
                .attr("width", a.mapW)
                .attr("height", a.mapH),
              o = n.d3.scale
                .linear()
                .domain([l.min.x, l.max.x])
                .range([0, a.mapW]),
              r = n.d3.scale
                .linear()
                .domain([l.min.y, l.max.y])
                .range([a.mapH, 0]);
            i
              .append("image")
              .attr("xlink:href", a.mapBg)
              .attr("x", "0")
              .attr("y", "0")
              .attr("width", a.mapW)
              .attr("height", a.mapH),
              i
                .append("svg:g")
                .attr("class", "champion-kills")
                .selectAll("champion-kill")
                .data(e.championKills)
                .enter()
                .append("svg:circle")
                .attr(
                  "id",
                  (t) => "champkill_" + t.timestamp + "_" + t.victimId,
                )
                .attr("cx", (t) => o(t.position.x))
                .attr("cy", (t) => r(t.position.y))
                .attr("r", a.circleR)
                .attr(
                  "class",
                  (t) =>
                    `map-data champion-event champion-kill player-${t.playerId} data-fill-${t.teamId}`,
                )
                .attr("display", "none"),
              i
                .append("svg:g")
                .attr("class", "champion-deaths")
                .selectAll("champion-death")
                .data(e.championDeaths)
                .enter()
                .append("svg:image")
                .attr(
                  "id",
                  (t) => "championDeath_" + t.timestamp + "_" + t.playerId,
                )
                .attr("xlink:href", (t) => a.images.death[t.teamId])
                .attr("x", (t) => o(t.position.x) - a.iconW / 2)
                .attr("y", (t) => r(t.position.y) - a.iconH / 2)
                .attr("width", a.iconW)
                .attr("height", a.iconH)
                .attr(
                  "class",
                  (t) =>
                    `map-data champion-event champion-death player-${t.playerId}`,
                )
                .attr("display", "none"),
              i
                .append("svg:g")
                .attr("class", "building-kills")
                .selectAll("building-kill")
                .data(e.buildingKills)
                .enter()
                .append("svg:image")
                .attr(
                  "id",
                  (t) => "buildingKill_" + t.timestamp + "_" + t.playerId,
                )
                .attr("xlink:href", (t) => a.images[t.display][t.teamId])
                .attr("x", (t) => o(t.position.x) - a.iconW / 2)
                .attr("y", (t) => r(t.position.y) - a.iconH / 2)
                .attr("width", a.iconW)
                .attr("height", a.iconH)
                .attr(
                  "class",
                  (t) => `map-data building-kill player-${t.playerId}`,
                )
                .attr("display", "none"),
              this.addTooltips(e);
          },
          addTooltips: function (t) {
            const e = i.bind(this);
            t.championKills.forEach((t) => {
              const { timestamp: a } = t,
                { victimId: s } = t,
                l = this.get("playerImgSrcMap")[t.playerId],
                i = this.get("playerImgSrcMap")[t.victimId],
                o = this.$().find(`#champkill_${a}_${s}`)[0];
              e(o, t.timestamp, l, i, t.teamId), n.TooltipManager.disable(o);
            }),
              t.championDeaths.forEach((t) => {
                const { timestamp: a } = t,
                  { playerId: s } = t,
                  l = this.get("playerImgSrcMap")[t.killerId],
                  i = this.get("playerImgSrcMap")[t.playerId],
                  o = this.$().find(`#championDeath_${a}_${s}`)[0];
                e(o, t.timestamp, l, i, t.killerTeamId),
                  n.TooltipManager.disable(o);
              }),
              t.buildingKills.forEach((t) => {
                const { timestamp: a } = t,
                  { playerId: s } = t,
                  l = this.get("playerImgSrcMap")[t.playerId],
                  i = this.$().find(`#buildingKill_${a}_${s}`)[0];
                e(i, t.timestamp, l, void 0, t.killerTeamId),
                  n.TooltipManager.disable(i);
              });
          },
          resetVisibility: function () {
            const t = (function (t, e) {
                const a = "champion" === t;
                return e
                  ? `.player-${e}${a ? ".champion-event" : ".building-kill"}`
                  : a
                    ? ".champion-kill"
                    : ".building-kill";
              })(this.get("displayType"), this.get("displayPlayer")),
              e = this.$().find(".map-show");
            for (let t = 0; t < e.length; t++) n.TooltipManager.disable(e[t]);
            n.d3
              .selectAll(this.$(".map-show"))
              .classed("map-show", !1)
              .style("display", "none");
            const a = this.$().find(t);
            for (let t = 0; t < a.length; t++) n.TooltipManager.enable(a[t]);
            n.d3
              .selectAll(this.$(t))
              .classed("map-show", !0)
              .style("display", "inline");
          },
          actions: {
            selectMapChart: function (t) {
              this.set("displayType", t), this.resetVisibility();
            },
            toggleChampDisplay: function (t) {
              const e = this.get("displayPlayer") === t ? null : t;
              this.set("displayPlayer", e);
              const a = this.get("teams");
              n.Lodash.each(a, (t) => {
                n.Lodash.each(t, (t) => {
                  n.Ember.set(t, "disabled", e && t.participantId !== e);
                });
              }),
                this.resetVisibility();
            },
          },
          didInsertElement: function () {
            const t = this.get("chartData");
            if (t && this.get("mapBg")) {
              const e = this.get("chartData.ownerId");
              let a = n.Lodash.groupBy(t.participants, "teamId");
              (a = n.Lodash.sortBy(a, function (t) {
                return n.Lodash.find(t, (t) => t.participantId === e) ? -1 : 1;
              })),
                this.set("ownerTeamId", a[0][0].teamId),
                this.set("teams", a),
                this.draw(t),
                this.resetVisibility(),
                this.$(".map-type-selector")[0].refreshSelected();
            }
          },
        });
      },
      (t, e, a) => {
        "use strict";
        a.r(e);
      },
      (t, e, a) => {
        "use strict";
        t.exports = a.p + "dead_blue.png";
      },
      (t, e, a) => {
        "use strict";
        t.exports = a.p + "dead_red.png";
      },
      (t, e, a) => {
        "use strict";
        t.exports = a.p + "tower_building_blue.png";
      },
      (t, e, a) => {
        "use strict";
        t.exports = a.p + "tower_building_red.png";
      },
      (t, e, a) => {
        "use strict";
        t.exports = a.p + "inhibitor_building_blue.png";
      },
      (t, e, a) => {
        "use strict";
        t.exports = a.p + "inhibitor_building_red.png";
      },
      (t, e, a) => {
        "use strict";
        t.exports = a.p + "nexus_building_blue.png";
      },
      (t, e, a) => {
        "use strict";
        t.exports = a.p + "nexus_building_red.png";
      },
      (t, e, a) => {
        "use strict";
        t.exports = a.p + "map11.png";
      },
      (t, e, a) => {
        "use strict";
        t.exports = a.p + "map12.png";
      },
      (t, e, a) => {
        "use strict";
        t.exports = a.p + "map21.png";
      },
      (t, e, a) => {
        const n = a(1).Ember;
        t.exports = n.HTMLBars.template({
          id: "spuofpNg",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-match-history\\\\src\\\\components\\\\overview\\\\match-details-map-chart-component\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-match-history\\\\src\\\\components\\\\overview\\\\match-details-map-chart-component\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-match-history\\\\src\\\\components\\\\overview\\\\match-details-map-chart-component\\\\index.js\\" "],["text","\\n"],["block",["if"],[["get",["mapBg"]]],null,2]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","          "],["open-element","div",[]],["dynamic-attr","class",["concat",["map-champ-toggle team-",["get",["index"]]," ",["helper",["if"],[["get",["player","disabled"]],"map-toggle-disabled"],null]]]],["modifier",["action"],[["get",[null]],"toggleChampDisplay",["get",["player","participantId"]]]],["flush-element"],["text","\\n            "],["open-element","img",[]],["dynamic-attr","src",["unknown",["player","imgSrc"]],null],["static-attr","class","map-champ-toggle-img"],["flush-element"],["close-element"],["text","\\n          "],["close-element"],["text","\\n"]],"locals":["player"]},{"statements":[["text","      "],["open-element","div",[]],["dynamic-attr","class",["concat",["map-champ-toggles team-",["get",["index"]]]]],["flush-element"],["text","\\n"],["block",["each"],[["get",["team"]]],null,0],["text","      "],["close-element"],["text","\\n"]],"locals":["index","team"]},{"statements":[["text","  "],["open-element","div",[]],["static-attr","class","map-chart-header"],["flush-element"],["text","\\n    "],["open-element","lol-uikit-flat-dropdown",[]],["static-attr","class","match-details-timeline-chart-dropdown map-type-selector"],["flush-element"],["text","\\n      "],["open-element","lol-uikit-dropdown-option",[]],["static-attr","slot","lol-uikit-dropdown-option"],["static-attr","class","map-selector-option"],["dynamic-attr","onclick",["helper",["action"],[["get",[null]],"selectMapChart","champion"],null],null],["flush-element"],["text","\\n        "],["append",["unknown",["tra","MATCH_HISTORY_OVERVIEW_MAP_CHAMPION_KILLS_OPTION"]],false],["text","\\n      "],["close-element"],["text","\\n      "],["open-element","lol-uikit-dropdown-option",[]],["static-attr","slot","lol-uikit-dropdown-option"],["static-attr","class","map-selector-option"],["dynamic-attr","onclick",["helper",["action"],[["get",[null]],"selectMapChart","building"],null],null],["flush-element"],["text","\\n        "],["append",["unknown",["tra","MATCH_HISTORY_OVERVIEW_MAP_BUILDING_KILLS_OPTION"]],false],["text","\\n      "],["close-element"],["text","\\n    "],["close-element"],["text","\\n  "],["close-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","map-svg-wrapper"],["flush-element"],["text","\\n  "],["close-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","map-champ-toggle-container"],["flush-element"],["text","\\n    "],["open-element","ul",[]],["flush-element"],["text","\\n    "],["close-element"],["text","\\n"],["block",["each"],[["helper",["-each-in"],[["get",["teams"]]],null]],null,1],["text","  "],["close-element"],["text","\\n"]],"locals":[]}],"hasPartials":false}',
          meta: {},
        });
      },
      (t, e, a) => {
        "use strict";
        var n = (function (t, e) {
          if (!e && t && t.__esModule) return t;
          if (null === t || ("object" != typeof t && "function" != typeof t))
            return { default: t };
          var a = s(e);
          if (a && a.has(t)) return a.get(t);
          var n = {},
            l = Object.defineProperty && Object.getOwnPropertyDescriptor;
          for (var i in t)
            if ("default" !== i && Object.prototype.hasOwnProperty.call(t, i)) {
              var o = l ? Object.getOwnPropertyDescriptor(t, i) : null;
              o && (o.get || o.set)
                ? Object.defineProperty(n, i, o)
                : (n[i] = t[i]);
            }
          (n.default = t), a && a.set(t, n);
          return n;
        })(a(1));
        function s(t) {
          if ("function" != typeof WeakMap) return null;
          var e = new WeakMap(),
            a = new WeakMap();
          return (s = function (t) {
            return t ? a : e;
          })(t);
        }
        a(99);
        const l = n.Ember.Component.extend({
          layout: a(100),
          classNames: ["map-tooltip"],
          victimTeam: n.Ember.computed("killerTeam", function () {
            return 300 - this.get("killerTeam");
          }),
          formattedTime: n.Ember.computed("timestamp", function () {
            const t = Math.floor(this.get("timestamp") / 6e4),
              e = ((this.get("timestamp") % 6e4) / 1e3).toFixed(0);
            return 60 === e
              ? t + 1 + ":00"
              : e < 10
                ? t + ":0" + e
                : t + ":" + e;
          }),
        });
        n.default &&
          n.default.EmberApplicationFactory.setFactoryDefinition({
            name: "MapTooltip",
            MapTooltipComponent: l,
            ComponentFactory: n.default.ComponentFactory,
          }),
          (t.exports = l);
      },
      (t, e, a) => {
        "use strict";
        a.r(e);
      },
      (t, e, a) => {
        const n = a(1).Ember;
        t.exports = n.HTMLBars.template({
          id: "YelfQ2EF",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-match-history\\\\src\\\\components\\\\overview\\\\map-tooltip-component\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-match-history\\\\src\\\\components\\\\overview\\\\map-tooltip-component\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-match-history\\\\src\\\\components\\\\overview\\\\map-tooltip-component\\\\index.js\\" "],["text","\\n"],["open-element","lol-uikit-tooltip",[]],["flush-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","match-details-map-event-tooltip"],["flush-element"],["text","\\t  \\n    "],["open-element","div",[]],["static-attr","class","map-event-tooltip-row"],["flush-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","map-event-tooltip-icon"],["flush-element"],["text","\\n        "],["open-element","div",[]],["dynamic-attr","class",["concat",["map-event-tooltip-icon-champion map-event-team-color-",["unknown",["killerTeam"]]]]],["flush-element"],["text","\\n          "],["open-element","div",[]],["static-attr","class","map-event-tooltip-icon-cover"],["flush-element"],["text","\\n"],["block",["if"],[["get",["killerImgSrc"]]],null,3,2],["text","          "],["close-element"],["text","\\n        "],["close-element"],["text","\\n      "],["close-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","map-event-tooltip-kill-sign"],["flush-element"],["close-element"],["text","\\n"],["block",["if"],[["get",["victimImgSrc"]]],null,1,0],["text","      "],["open-element","span",[]],["static-attr","class","map-event-tooltip-timestamp"],["flush-element"],["append",["unknown",["formattedTime"]],false],["close-element"],["text","\\n    "],["close-element"],["text","  \\n  "],["close-element"],["text","\\n"],["close-element"]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","      "],["open-element","span",[]],["dynamic-attr","class",["concat",["map-event-icon-tower-",["unknown",["victimTeam"]]]]],["flush-element"],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","      "],["open-element","div",[]],["static-attr","class","map-event-tooltip-icon"],["flush-element"],["text","\\n        "],["open-element","div",[]],["dynamic-attr","class",["concat",["map-event-tooltip-icon-champion map-event-team-color-",["unknown",["victimTeam"]]]]],["flush-element"],["text","\\n          "],["open-element","div",[]],["static-attr","class","map-event-tooltip-icon-cover"],["flush-element"],["text","\\n            "],["open-element","img",[]],["dynamic-attr","src",["concat",[["unknown",["victimImgSrc"]]]]],["static-attr","class","map-event-tooltip-icon-img"],["flush-element"],["close-element"],["text","\\n          "],["close-element"],["text","\\n        "],["close-element"],["text","\\n      "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","            "],["open-element","img",[]],["dynamic-attr","class",["concat",["map-event-tooltip-icon-img map-event-icon-minions-",["unknown",["killerTeam"]]]]],["flush-element"],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","            "],["open-element","img",[]],["dynamic-attr","src",["concat",[["unknown",["killerImgSrc"]]]]],["static-attr","class","map-event-tooltip-icon-img"],["flush-element"],["close-element"],["text","\\n"]],"locals":[]}],"hasPartials":false}',
          meta: {},
        });
      },
      (t, e, a) => {
        "use strict";
        var n = a(1),
          s = a(102),
          l = a(105);
        function i(t) {
          const e = {
            kills: 0,
            assists: 0,
            minionsPlusNeutralMonstersCount: 0,
            goldEarned: 0,
          };
          return (
            n.Lodash.each(t, (t) => {
              n.Lodash.each(
                [
                  "kills",
                  "assists",
                  "minionsPlusNeutralMonstersCount",
                  "goldEarned",
                ],
                (a) => {
                  t[a] > e[a] && (e[a] = t[a]);
                },
              );
            }),
            e
          );
        }
        a(107),
          (t.exports = n.Ember.Component.extend({
            classNames: ["match-details-scoreboard-component"],
            layout: a(108),
            subteams: n.Ember.computed(
              "currentParticipant",
              "gameData",
              "hasObjectives",
              function () {
                const t = this.get("champions"),
                  e = this.get("gameData"),
                  a = this.get("hasObjectives"),
                  o = this.get("currentParticipant"),
                  r = this.get("tra");
                n.logger.trace(`Loading teams for game ID ${e.gameId}`);
                let c = (0, s.buildTeamsFromSubteams)(e, t, o);
                return (
                  n.Lodash.each(c, (s) => {
                    (s.hasBansOrObjectives = s.hasBans || a),
                      (s.placementDisplayText = r.formatString(
                        l.MODE_PLACEMENT_TRA_KEY + s.placement,
                      ));
                    const o = l.GAME_MODES_WITH_SUBTEAMS[
                      e.gameMode
                    ].subteams.find((t) => t.subteamId === s.subteamId);
                    if (o) {
                      const t = o.display;
                      (s.teamNameDisplayText = r.get(t.label)),
                        (s.teamIcon = t.icon);
                    }
                    const c = i(s.participants);
                    n.Lodash.each(s.participants, (t) => {
                      (t.mostKills = t.kills === c.kills),
                        (t.mostAssists = t.assists === c.assists),
                        (t.mostMinionKills =
                          t.minionsPlusNeutralMonstersCount ===
                          c.minionsPlusNeutralMonstersCount),
                        (t.mostGoldEarned = t.goldEarned === c.goldEarned);
                    }),
                      n.Lodash.each(
                        s.bans,
                        (e) =>
                          (e.squarePortraitPath = t.get(e.championId)
                            ? t.get(e.championId).squarePortraitPath
                            : ""),
                      );
                  }),
                  (c = c.sort(function (t, e) {
                    return t.placement - e.placement;
                  })),
                  c
                );
              },
            ),
            platformTeams: n.Ember.computed(
              "currentParticipant",
              "gameData",
              "hasObjectives",
              function () {
                const t = this.get("champions"),
                  e = this.get("gameData"),
                  a = this.get("hasObjectives"),
                  l = this.get("currentParticipant");
                n.logger.trace(`Loading teams for game ID ${e.gameId}`);
                let o = (0, s.buildTeams)(e, t, l);
                return (
                  n.Lodash.each(o, (e) => {
                    e.hasBansOrObjectives = e.hasBans || a;
                    const s = i(e.participants);
                    n.Lodash.each(e.participants, (t) => {
                      (t.mostKills = t.kills === s.kills),
                        (t.mostAssists = t.assists === s.assists),
                        (t.mostMinionKills =
                          t.minionsPlusNeutralMonstersCount ===
                          s.minionsPlusNeutralMonstersCount),
                        (t.mostGoldEarned = t.goldEarned === s.goldEarned);
                    }),
                      n.Lodash.each(
                        e.bans,
                        (e) =>
                          (e.squarePortraitPath = t.get(
                            e.championId,
                          ).squarePortraitPath),
                      );
                  }),
                  (o = n.Lodash.sortBy(o, function (t) {
                    return t.teamId === l.teamId ? -1 : 0;
                  })),
                  o
                );
              },
            ),
            teams: n.Ember.computed("isGameModeWithSubteams", function () {
              return this.get("isGameModeWithSubteams")
                ? this.get("subteams")
                : this.get("platformTeams");
            }),
            subteamGameModeData: n.Ember.computed(function () {
              return l.GAME_MODES_WITH_SUBTEAMS;
            }),
            isGameModeWithSubteams: n.Ember.computed(
              "gameData.gameMode",
              "subteamGameModeData",
              function () {
                return !!this.get("subteamGameModeData")[
                  this.get("gameData.gameMode")
                ];
              },
            ),
            isHexakill: n.Ember.computed("gameData.participants", function () {
              return 12 === this.get("gameData.participants").length;
            }),
            hasBans: n.Ember.computed(function () {
              return (
                this.get("teams").length > 0 &&
                this.get("teams")[0].bans.length > 0
              );
            }),
            hasObjectives: n.Ember.computed("gameData.gameMode", function () {
              return !l.GAME_MODES_WITHOUT_OBJECTIVES.includes(
                this.get("gameData.gameMode"),
              );
            }),
            rightTitleText: n.Ember.computed("gameData.gameMode", function () {
              const t = this.get("tra"),
                e = this.get("hasBans"),
                a = this.get("hasObjectives");
              let n = "";
              return (
                e && a
                  ? (n = "MATCH_DETAILS_BAN_AND_OBJECTIVES")
                  : a
                    ? (n = "MATCH_DETAILS_OBJECTIVES")
                    : e && (n = "MATCH_DETAILS_BAN"),
                t.get(n)
              );
            }),
            removeAnimationWhenDone: n.Ember.on(
              "didInsertElement",
              function () {
                const t = this.get("isHexakill")
                    ? ".match-details-team-container-hexakill"
                    : ".match-details-team-container",
                  e = n.Ember.$(this.element).find(t)[0];
                e.addEventListener("webkitAnimationEnd", function (t) {
                  t.target === e &&
                    "fade-in" === t.animationName &&
                    e.classList.remove("match-details-loading-fade-in");
                });
              },
            ),
          }));
      },
      (t, e, a) => {
        "use strict";
        Object.defineProperty(e, "__esModule", { value: !0 }),
          (e.buildTeams = function (t, e, a) {
            const {
              gameId: s,
              teams: i,
              participants: o,
              participantIdentities: r,
            } = t;
            let c = [];
            i
              ? (c = i.map((t) => {
                  const n = (0, l.fromJson)(t, o, r, e);
                  return n.teamId === a.teamId && n.set("isFirstTeam", !0), n;
                }))
              : (n.logger.error(
                  `Could not load details for game ID ${s} - details are empty or incomplete`,
                ),
                n.logger.trace(
                  `Details fo game ID ${s}: ${JSON.stringify(t)}`,
                ));
            return (
              (c = c.filter((t) => t.participants.length > 0)), n.Ember.A(c)
            );
          }),
          (e.buildTeamsFromSubteams = function (t, e, a) {
            const {
              gameId: l,
              teams: i,
              participants: o,
              participantIdentities: r,
            } = t;
            let c = [];
            o
              ? (o.forEach(function (t) {
                  const e = t.playerSubteamId;
                  if (!c.find((e) => e.subteamId === t.playerSubteamId)) {
                    const a = {};
                    (a.subteamId = e),
                      (a.teamId = e),
                      (a.placement = t.subteamPlacement),
                      (a.hasBans = !1),
                      a.placement <= 1 &&
                        ((a.bans = i[0].bans), (a.hasBans = !0)),
                      c.push(a);
                  }
                }),
                (c = c.map((t) => {
                  const n = (0, s.fromJson)(t, o, r, e);
                  return (
                    n.subteamId === a.playerSubteamId &&
                      n.set("isFirstTeam", !0),
                    n
                  );
                })))
              : (n.logger.error(
                  `Could not load details for game ID ${l} - details are empty or incomplete`,
                ),
                n.logger.trace(
                  `Details fo game ID ${l}: ${JSON.stringify(t)}`,
                ));
            return (
              (c = c.filter((t) => t.participants.length > 0)), n.Ember.A(c)
            );
          });
        var n = a(1),
          s = a(103),
          l = a(104);
      },
      (t, e, a) => {
        "use strict";
        Object.defineProperty(e, "__esModule", { value: !0 }),
          (e.fromJson = function (t, e, a, n) {
            const o = e
                .filter((e) => e.playerSubteamId === t.subteamId)
                .map((t) => {
                  const e = a.find((e) => e.participantId === t.participantId),
                    i = new l.default(t, e),
                    o = n.get(i.championId);
                  return (
                    (i.titleInfo = {
                      title: o.name,
                      subTitle: s.Lodash.get(e, "player.displayName", o.name),
                    }),
                    i
                  );
                }),
              r = t.bans ? t.bans.map((t) => s.Ember.Object.create(t)) : [];
            return i.create({
              participants: s.Ember.A(o),
              teamId: t.teamId,
              towerKills: t.towerKills,
              inhibitorKills: t.inhibitorKills,
              baronKills: t.baronKills,
              dragonKills: t.dragonKills,
              vilemawKills: t.vilemawKills,
              riftHeraldKills: t.riftHeraldKills,
              hordeKills: t.hordeKills,
              bans: s.Ember.A(r),
              victory: "Win" === t.win,
              subteamId: t.subteamId,
              placement: t.placement,
            });
          });
        var n,
          s = a(1),
          l = (n = a(13)) && n.__esModule ? n : { default: n };
        const i = s.Ember.Object.extend({
          teamId: 0,
          towerKills: 0,
          inhibitorKills: 0,
          baronKills: 0,
          dragonKills: 0,
          vilemawKills: 0,
          riftHeraldKills: 0,
          hordeKills: 0,
          victory: !1,
          isFirstTeam: !1,
          participants: s.Ember.A(),
          bans: s.Ember.A(),
          color: s.Ember.computed("isFirstTeam", function () {
            return this.get("isFirstTeam") ? "blue" : "red";
          }),
          kills: s.Ember.computed("participants.[]", function () {
            return s.Lodash.sum(
              this.get("participants").map((t) => t.stats.kills),
            );
          }),
          deaths: s.Ember.computed("participants.[]", function () {
            return s.Lodash.sum(
              this.get("participants").map((t) => t.stats.deaths),
            );
          }),
          assists: s.Ember.computed("participants.[]", function () {
            return s.Lodash.sum(
              this.get("participants").map((t) => t.stats.assists),
            );
          }),
          gold: s.Ember.computed("participants.[]", function () {
            return s.Lodash.sum(
              this.get("participants").map((t) => t.stats.goldEarned),
            );
          }),
          hasBans: s.Ember.computed.gt("bans.length", 0),
        });
      },
      (t, e, a) => {
        "use strict";
        Object.defineProperty(e, "__esModule", { value: !0 }),
          (e.default = void 0),
          (e.fromJson = function (t, e, a, n) {
            const o = e
                .filter((e) => e.teamId === t.teamId)
                .map((t) => {
                  const e = a.find((e) => e.participantId === t.participantId),
                    i = new l.default(t, e),
                    o = n.get(i.championId);
                  return (
                    (i.titleInfo = {
                      title: o.name,
                      subTitle: s.Lodash.get(e, "player.displayName", o.name),
                    }),
                    i
                  );
                }),
              r = t.bans.map((t) => s.Ember.Object.create(t));
            return i.create({
              participants: s.Ember.A(o),
              teamId: t.teamId,
              towerKills: t.towerKills,
              inhibitorKills: t.inhibitorKills,
              baronKills: t.baronKills,
              dragonKills: t.dragonKills,
              vilemawKills: t.vilemawKills,
              riftHeraldKills: t.riftHeraldKills,
              hordeKills: t.hordeKills,
              bans: s.Ember.A(r),
              victory: "Win" === t.win,
            });
          });
        var n,
          s = a(1),
          l = (n = a(13)) && n.__esModule ? n : { default: n };
        const i = s.Ember.Object.extend({
          teamId: 0,
          towerKills: 0,
          inhibitorKills: 0,
          baronKills: 0,
          dragonKills: 0,
          vilemawKills: 0,
          riftHeraldKills: 0,
          hordeKills: 0,
          victory: !1,
          isFirstTeam: !1,
          participants: s.Ember.A(),
          bans: s.Ember.A(),
          color: s.Ember.computed("isFirstTeam", function () {
            return this.get("isFirstTeam") ? "blue" : "red";
          }),
          kills: s.Ember.computed("participants.[]", function () {
            return s.Lodash.sum(
              this.get("participants").map((t) => t.stats.kills),
            );
          }),
          deaths: s.Ember.computed("participants.[]", function () {
            return s.Lodash.sum(
              this.get("participants").map((t) => t.stats.deaths),
            );
          }),
          assists: s.Ember.computed("participants.[]", function () {
            return s.Lodash.sum(
              this.get("participants").map((t) => t.stats.assists),
            );
          }),
          gold: s.Ember.computed("participants.[]", function () {
            return s.Lodash.sum(
              this.get("participants").map((t) => t.stats.goldEarned),
            );
          }),
          hasBans: s.Ember.computed.gt("bans.length", 0),
        });
        var o = i;
        e.default = o;
      },
      (t, e, a) => {
        "use strict";
        Object.defineProperty(e, "__esModule", { value: !0 }),
          (e.MODE_PLACEMENT_TRA_KEY =
            e.GAME_MODES_WITH_SUBTEAMS =
            e.GAME_MODES_WITHOUT_OBJECTIVES =
              void 0);
        var n = a(106);
        e.MODE_PLACEMENT_TRA_KEY = "MATCH_HISTORY_MODE_PLACEMENT_";
        const s = { CHERRY: { subteams: n.CHERRY_SUBTEAM_DISPLAY_DATA } };
        e.GAME_MODES_WITH_SUBTEAMS = s;
        e.GAME_MODES_WITHOUT_OBJECTIVES = ["CHERRY"];
      },
      (t, e) => {
        "use strict";
        Object.defineProperty(e, "__esModule", { value: !0 }),
          (e.CHERRY_SUBTEAM_SIZE =
            e.CHERRY_SUBTEAM_DISPLAY_DATA =
            e.CHERRY_GAME_MODE =
              void 0);
        e.CHERRY_GAME_MODE = "CHERRY";
        e.CHERRY_SUBTEAM_SIZE = 2;
        e.CHERRY_SUBTEAM_DISPLAY_DATA = [
          {
            subteamId: 1,
            display: {
              label: "MATCH_HISTORY_SUBTEAM_DISPLAY_NAME_PORO",
              icon: "/fe/lol-match-history/images/subteams/poro.svg",
              iconGradient:
                "radial-gradient(50% 61.7% at 50% 100%, rgba(96, 25, 63, 0.4) 0%, rgba(96, 25, 63, 0) 100%)",
            },
          },
          {
            subteamId: 2,
            display: {
              label: "MATCH_HISTORY_SUBTEAM_DISPLAY_NAME_MINION",
              icon: "/fe/lol-match-history/images/subteams/minion.svg",
              iconGradient:
                "radial-gradient(50% 61.7% at 50% 100%, rgba(11, 58, 50, 0.4) 0%, rgba(11, 58, 50, 0) 100%)",
            },
          },
          {
            subteamId: 3,
            display: {
              label: "MATCH_HISTORY_SUBTEAM_DISPLAY_NAME_SCUTTLE",
              icon: "/fe/lol-match-history/images/subteams/scuttle.svg",
              iconGradient:
                "radial-gradient(50% 61.7% at 50% 100%, rgba(39, 58, 11, 0.4) 0%, rgba(39, 58, 11, 0) 100%)",
            },
          },
          {
            subteamId: 4,
            display: {
              label: "MATCH_HISTORY_SUBTEAM_DISPLAY_NAME_KRUG",
              icon: "/fe/lol-match-history/images/subteams/krug.svg",
              iconGradient:
                "radial-gradient(50% 61.7% at 50% 100%, rgba(85, 46, 10, 0.4) 0%, rgba(85, 46, 10, 0) 100%)",
            },
          },
          {
            subteamId: 5,
            display: {
              label: "MATCH_HISTORY_SUBTEAM_DISPLAY_NAME_RAPTOR",
              icon: "/fe/lol-match-history/images/subteams/raptor.svg",
              iconGradient:
                "radial-gradient(50% 61.7% at 50% 100%, rgba(100, 23, 35, 0.4) 0%, rgba(100, 23, 35, 0) 100%)",
            },
          },
          {
            subteamId: 6,
            display: {
              label: "MATCH_HISTORY_SUBTEAM_DISPLAY_NAME_SENTINEL",
              icon: "/fe/lol-match-history/images/subteams/sentinel.svg",
              iconGradient:
                "radial-gradient(50% 61.7% at 50% 100%, rgba(25, 66, 96, 0.4) 0%, rgba(25, 66, 96, 0) 100%)",
            },
          },
          {
            subteamId: 7,
            display: {
              label: "MATCH_HISTORY_SUBTEAM_DISPLAY_NAME_WOLF",
              icon: "/fe/lol-match-history/images/subteams/wolf.svg",
              iconGradient:
                "radial-gradient(50% 61.7% at 50% 100%, rgba(71, 56, 4, 0.4) 0%, rgba(71, 56, 4, 0) 100%)",
            },
          },
          {
            subteamId: 8,
            display: {
              label: "MATCH_HISTORY_SUBTEAM_DISPLAY_NAME_GROMP",
              icon: "/fe/lol-match-history/images/subteams/gromp.svg",
              iconGradient:
                "radial-gradient(50% 61.7% at 50% 100%, rgba(73, 25, 96, 0.4) 0%, rgba(73, 25, 96, 0) 100%)",
            },
          },
        ];
      },
      (t, e, a) => {
        "use strict";
        a.r(e);
      },
      (t, e, a) => {
        const n = a(1).Ember;
        t.exports = n.HTMLBars.template({
          id: "Svt/XaaD",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-match-history\\\\src\\\\components\\\\scoreboard\\\\match-details-scoreboard-component\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-match-history\\\\src\\\\components\\\\scoreboard\\\\match-details-scoreboard-component\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-match-history\\\\src\\\\components\\\\scoreboard\\\\match-details-scoreboard-component\\\\index.js\\" "],["text","\\n"],["open-element","lol-uikit-scrollable",[]],["dynamic-attr","class",["concat",[["helper",["if"],[["get",["isHexakill"]],"match-details-team-container-hexakill","match-details-team-container"],null]," match_details_clearfix ",["helper",["if"],[["get",["isTransitioning"]],"match-details-loading-hide","match-details-loading-fade-in"],null]]]],["static-attr","overflow-masks","enabled"],["flush-element"],["text","\\n"],["block",["each"],[["get",["teams"]]],null,10],["close-element"],["text","\\n"]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","            "],["append",["helper",["match-details-team-objectives"],null,[["team","mapId","gameTimeline"],[["get",["t"]],["get",["gameData","mapId"]],["get",["gameTimeline"]]]]],false],["text","\\n"]],"locals":[]},{"statements":[],"locals":[]},{"statements":[["text","                "],["open-element","div",[]],["static-attr","class","match-details-banned-item"],["flush-element"],["text","\\n                  "],["open-element","img",[]],["dynamic-attr","src",["concat",[["unknown",["ban","squarePortraitPath"]]]]],["static-attr","alt",""],["static-attr","class","match-details-banned-img"],["flush-element"],["close-element"],["text","\\n                  "],["open-element","div",[]],["static-attr","class","match-details-banned-top"],["flush-element"],["close-element"],["text","\\n                  "],["open-element","div",[]],["static-attr","class","match-details-banned-btm"],["flush-element"],["close-element"],["text","\\n                "],["close-element"],["text","\\n"]],"locals":["ban"]},{"statements":[["text","            "],["open-element","div",[]],["static-attr","class","match-details-banned-wrapper"],["flush-element"],["text","\\n"],["block",["each"],[["get",["t","bans"]]],[["key"],["championId"]],2,1],["text","            "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","          "],["open-element","div",[]],["dynamic-attr","class",["concat",["match-details-right-title match_details_",["unknown",["t","color"]]]]],["flush-element"],["append",["unknown",["rightTitleText"]],false],["close-element"],["text","\\n"],["block",["if"],[["get",["t","hasBans"]]],null,3],["block",["if"],[["get",["hasObjectives"]]],null,0]],"locals":[]},{"statements":[["text","            "],["append",["helper",["player-history-row"],null,[["currentParticipant","participant","titleInfo","showSpellTooltip","showItemTooltip","team","augments","champions","items","spells","runes","displayTooltip","mapId","gameId","queueId","gameCreation","localPuuid"],[["get",["currentParticipant"]],["get",["p"]],["get",["p","titleInfo"]],true,true,["get",["t"]],["get",["augments"]],["get",["champions"]],["get",["items"]],["get",["spells"]],["get",["runes"]],true,["get",["gameData","mapId"]],["get",["gameData","gameId"]],["get",["gameData","queueId"]],["get",["gameData","gameCreation"]],["get",["localPuuid"]]]]],false],["text","\\n"]],"locals":["p"]},{"statements":[["text","            "],["append",["helper",["match-details-team-data"],null,[["team","gameMode","queueId"],[["get",["t"]],["get",["gameData","gameMode"]],["get",["gameData","queueId"]]]]],false],["text","\\n"]],"locals":[]},{"statements":[["text","            "],["open-element","div",[]],["static-attr","class","match-details-subteam-data"],["flush-element"],["text","\\n              "],["append",["helper",["match-details-team-data"],null,[["team","gameMode","queueId"],[["get",["t"]],["get",["gameData","gameMode"]],["get",["gameData","queueId"]]]]],false],["text","\\n            "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","            "],["open-element","div",[]],["static-attr","class","match-details-team-name"],["flush-element"],["text","\\n              "],["append",["helper",["if"],[["get",["t","isFirstTeam"]],["get",["tra","MATCH_HISTORY_MATCH_RESULT_TEAM_1_LABEL"]],["get",["tra","MATCH_HISTORY_MATCH_RESULT_TEAM_2_LABEL"]]],null],false],["text","\\n            "],["close-element"],["text","  \\n"]],"locals":[]},{"statements":[["text","          "],["open-element","div",[]],["static-attr","class","match-details-subteam-container"],["flush-element"],["text","\\n              "],["open-element","div",[]],["static-attr","class","match-details-subteam-placement"],["flush-element"],["text","\\n                "],["append",["unknown",["t","placementDisplayText"]],false],["text","\\n              "],["close-element"],["text","\\n              "],["open-element","div",[]],["static-attr","class","match-details-subteam-display-data"],["flush-element"],["text","\\n                "],["open-element","div",[]],["static-attr","class","match-details-subteam-icon"],["dynamic-attr","style",["concat",["background-image: url(",["unknown",["t","teamIcon"]],")"]]],["flush-element"],["close-element"],["text","\\n                "],["open-element","div",[]],["static-attr","class","match-details-subteam-name"],["flush-element"],["text","\\n                  "],["append",["unknown",["t","teamNameDisplayText"]],false],["text","\\n                "],["close-element"],["text","\\n              "],["close-element"],["text","\\n          "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","    "],["open-element","div",[]],["static-attr","class","match-details-team-wrapper"],["flush-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","match-details-left-wrapper"],["flush-element"],["text","\\n        "],["open-element","div",[]],["dynamic-attr","class",["concat",["match-details-team-header match_details_",["unknown",["t","color"]]," match_details_clearfix"]]],["flush-element"],["text","\\n"],["block",["if"],[["get",["isGameModeWithSubteams"]]],null,9,8],["block",["if"],[["get",["isGameModeWithSubteams"]]],null,7,6],["text","        "],["close-element"],["text","\\n        "],["open-element","div",[]],["static-attr","class","match-details-team-list"],["flush-element"],["text","\\n"],["block",["each"],[["get",["t","participants"]]],null,5],["text","        "],["close-element"],["text","\\n      "],["close-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","match-details-right-wrapper"],["flush-element"],["text","\\n"],["block",["if"],[["get",["t","hasBansOrObjectives"]]],null,4],["text","      "],["close-element"],["text","\\n    "],["close-element"],["text","\\n"]],"locals":["t"]}],"hasPartials":false}',
          meta: {},
        });
      },
      (t, e, a) => {
        "use strict";
        var n = a(1);
        a(110);
        var s = i(a(10)),
          l = i(a(111));
        function i(t) {
          return t && t.__esModule ? t : { default: t };
        }
        const o = ["S+", "S", "A+", "A", "B+", "B", "C+", "C", "D"],
          r = {
            990: {
              scoreStat: "playerScore0",
              gradeStat: "playerScore1",
              styleClass: "match-details-team-starguardian-score",
              traKey: "MATCH_HISTORY_SCOREBOARD_TEAM_SCORE_STARGUARDIAN",
            },
            1030: {
              scoreStat: "playerScore0",
              styleClass: "match-details-team-odyssey-score",
              traKey: "MATCH_HISTORY_SCOREBOARD_TEAM_SCORE_STARGUARDIAN",
            },
            1040: {
              scoreStat: "playerScore0",
              styleClass: "match-details-team-odyssey-score",
              traKey: "MATCH_HISTORY_SCOREBOARD_TEAM_SCORE_STARGUARDIAN",
            },
            1050: {
              scoreStat: "playerScore0",
              styleClass: "match-details-team-odyssey-score",
              traKey: "MATCH_HISTORY_SCOREBOARD_TEAM_SCORE_STARGUARDIAN",
            },
            1060: {
              scoreStat: "playerScore0",
              styleClass: "match-details-team-odyssey-score",
              traKey: "MATCH_HISTORY_SCOREBOARD_TEAM_SCORE_STARGUARDIAN",
            },
            1070: {
              scoreStat: "playerScore0",
              styleClass: "match-details-team-odyssey-score",
              traKey: "MATCH_HISTORY_SCOREBOARD_TEAM_SCORE_STARGUARDIAN",
            },
          },
          c = {
            1e3: {
              traKey: "MATCH_HISTORY_SCOREBOARD_TEAM_STAT1_PROJECT",
              styleClass: "match-details-team-project-kills",
            },
            1001: {
              traKey: "MATCH_HISTORY_SCOREBOARD_TEAM_STAT1_PROJECT",
              styleClass: "match-details-team-project-kills",
            },
          },
          m = {
            1e3: {
              traKey: "MATCH_HISTORY_SCOREBOARD_TEAM_STAT0_PROJECT",
              styleClass: "match-details-team-project-energy",
            },
            1001: {
              traKey: "MATCH_HISTORY_SCOREBOARD_TEAM_STAT0_PROJECT",
              styleClass: "match-details-team-project-energy",
            },
          };
        function p(t, e) {
          n.TooltipManager.assign(
            t,
            "ScoreboardTooltip",
            { traString: e, tra: this.get("tra") },
            {
              ComponentFactory: n.ComponentFactory,
              type: "system",
              targetAnchor: { x: "center", y: "top" },
              tooltipAnchor: { x: "center", y: "bottom" },
            },
          );
        }
        t.exports = n.Ember.Component.extend({
          classNames: ["match-details-team-data-component"],
          layout: a(112),
          teamKdaOverride: n.Ember.computed("queueId", function () {
            return r[this.get("queueId")];
          }),
          playerCSOverride: n.Ember.computed("queueId", function () {
            return c[this.get("queueId")];
          }),
          playerGoldOverride: n.Ember.computed("queueId", function () {
            return m[this.get("queueId")];
          }),
          isGameModeWithCS: n.Ember.computed("gameMode", function () {
            return !l.default.GAME_MODES_WITHOUT_CS.includes(
              this.get("gameMode"),
            );
          }),
          teamScore: n.Ember.computed(
            "team.participants.0.stats.playerScore0",
            "teamKdaOverride.scoreStat",
            "tra.metadata.locale.id",
            function () {
              const t = this.get("teamKdaOverride.scoreStat");
              if (!t) return;
              const e = this.get(`team.participants.0.stats.${t}`) || 0;
              return s.default.formatGold(
                e,
                this.get("tra.metadata.locale.id"),
              );
            },
          ),
          teamScoreGrade: n.Ember.computed(
            "team.participants.0.stats.playerScore1",
            "teamKdaOverride.gradeStat",
            function () {
              const t = this.get("teamKdaOverride.gradeStat");
              if (t) {
                const e =
                  this.get(`team.participants.0.stats.${t}`) || o.length;
                return o[e - 1];
              }
            },
          ),
          formattedTeamGold: n.Ember.computed(
            "team",
            "tra.metadata.locale.id",
            function () {
              const t = this.get("tra.metadata.locale.id"),
                e = this.get("team.gold");
              return s.default.formatGold(e, t);
            },
          ),
          setupTooltip: n.Ember.on("didInsertElement", function () {
            const t = p.bind(this);
            if (this.get("teamKdaOverride")) {
              t(
                n.Ember.$(this.element).find(
                  "." + this.get("teamKdaOverride.styleClass"),
                )[0],
                this.get("teamKdaOverride.traKey"),
              );
            } else {
              t(
                n.Ember.$(this.element).find(".match-details-team-kill")[0],
                "MATCH_HISTORY_SCOREBOARD_TEAM_KDA",
              );
            }
            const e = n.Ember.$(this.element).find(
                ".match-details-team-gold",
              )[0],
              a = n.Ember.$(this.element).find(
                ".match-details-team-kill-icon",
              )[0];
            if (this.get("playerCSOverride")) {
              t(
                n.Ember.$(this.element).find(
                  "." + this.get("playerCSOverride.styleClass"),
                ),
                this.get("playerCSOverride.traKey"),
              );
            } else {
              t(
                n.Ember.$(this.element).find(".match-details-team-cs-icon")[0],
                "MATCH_HISTORY_SCOREBOARD_CS_ICON",
              );
            }
            if (this.get("playerGoldOverride")) {
              t(
                n.Ember.$(this.element).find(
                  "." + this.get("playerGoldOverride.styleClass"),
                ),
                this.get("playerGoldOverride.traKey"),
              );
            } else {
              t(
                n.Ember.$(this.element).find(
                  ".match-details-team-gold-icon",
                )[0],
                "MATCH_HISTORY_SCOREBOARD_GOLD_ICON",
              );
            }
            t(e, "MATCH_HISTORY_SCOREBOARD_TEAM_GOLD"),
              t(a, "MATCH_HISTORY_SCOREBOARD_KDA_ICON");
          }),
        });
      },
      (t, e, a) => {
        "use strict";
        a.r(e);
      },
      (t, e) => {
        "use strict";
        Object.defineProperty(e, "__esModule", { value: !0 }),
          (e.default = void 0);
        e.default = { GAME_MODES_WITHOUT_CS: ["CHERRY"] };
      },
      (t, e, a) => {
        const n = a(1).Ember;
        t.exports = n.HTMLBars.template({
          id: "pIrXtIry",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-match-history\\\\src\\\\components\\\\scoreboard\\\\match-details-team-data-component\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-match-history\\\\src\\\\components\\\\scoreboard\\\\match-details-team-data-component\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-match-history\\\\src\\\\components\\\\scoreboard\\\\match-details-team-data-component\\\\index.js\\" "],["text","\\n"],["open-element","div",[]],["static-attr","class","match-details-team-data"],["flush-element"],["text","\\n"],["block",["if"],[["get",["teamKdaOverride"]]],null,8,5],["text","  "],["open-element","div",[]],["static-attr","class","match-details-team-right"],["flush-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","match-details-team-gold"],["flush-element"],["text","\\n        "],["open-element","div",[]],["static-attr","class","match-details-team-gold-count"],["flush-element"],["append",["unknown",["formattedTeamGold"]],false],["close-element"],["text","\\n        "],["open-element","div",[]],["static-attr","class","match-details-team-gold-coin"],["flush-element"],["close-element"],["text","\\n    "],["close-element"],["text","\\n    "],["open-element","div",[]],["dynamic-attr","class",["concat",["match-details-team-kill-icon ",["helper",["if"],[["get",["isGameModeWithCS"]],"","match-details-team-kill-icon-no-cs"],null]]]],["flush-element"],["close-element"],["text","\\n"],["block",["if"],[["get",["isGameModeWithCS"]]],null,4],["block",["if"],[["get",["playerGoldOverride"]]],null,1,0],["text","  "],["close-element"],["text","\\n"],["close-element"],["text","\\n"]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","      "],["open-element","div",[]],["static-attr","class","match-details-team-gold-icon"],["flush-element"],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","      "],["open-element","div",[]],["dynamic-attr","class",["unknown",["playerGoldOverride","styleClass"]],null],["flush-element"],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","        "],["open-element","div",[]],["static-attr","class","match-details-team-cs-icon"],["flush-element"],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","        "],["open-element","div",[]],["dynamic-attr","class",["unknown",["playerCSOverride","styleClass"]],null],["flush-element"],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["block",["if"],[["get",["playerCSOverride"]]],null,3,2]],"locals":[]},{"statements":[["text","    "],["open-element","div",[]],["static-attr","class","match-details-team-kill"],["flush-element"],["text","\\n      "],["append",["unknown",["team","kills"]],false],["open-element","span",[]],["static-attr","class","match-details-team-k-break"],["flush-element"],["text","/"],["close-element"],["append",["unknown",["team","deaths"]],false],["open-element","span",[]],["static-attr","class","match-details-team-k-break"],["flush-element"],["text","/"],["close-element"],["append",["unknown",["team","assists"]],false],["text","\\n    "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","        "],["append",["unknown",["teamScore"]],false],["text","\\n"]],"locals":[]},{"statements":[["text","        "],["append",["unknown",["teamScoreGrade"]],false],["open-element","span",[]],["static-attr","class","match-details-team-score-break"],["flush-element"],["close-element"],["text","("],["append",["unknown",["teamScore"]],false],["text",")\\n"]],"locals":[]},{"statements":[["text","    "],["open-element","div",[]],["dynamic-attr","class",["unknown",["teamKdaOverride","styleClass"]],null],["flush-element"],["text","\\n"],["block",["if"],[["get",["teamKdaOverride","gradeStat"]]],null,7,6],["text","    "],["close-element"],["text","\\n"]],"locals":[]}],"hasPartials":false}',
          meta: {},
        });
      },
      (t, e, a) => {
        "use strict";
        var n = a(1);
        function s(t, e, a = "ScoreboardTooltip", s = null) {
          n.TooltipManager.assign(
            t,
            a,
            { traString: e, data: s, tra: this.get("tra") },
            {
              ComponentFactory: n.ComponentFactory,
              type: "system",
              targetAnchor: { x: "center", y: "top" },
              tooltipAnchor: { x: "center", y: "bottom" },
            },
          );
        }
        a(114);
        const l = {
            AIR_DRAGON: "air-dragon",
            EARTH_DRAGON: "earth-dragon",
            FIRE_DRAGON: "fire-dragon",
            WATER_DRAGON: "water-dragon",
            ELDER_DRAGON: "elder-dragon",
          },
          i = new Set([30]),
          o = new Set([11]),
          r = new Set([11]),
          c = new Set([11]),
          m = new Set([11]),
          p = new Set([10]);
        t.exports = n.Ember.Component.extend({
          classNames: ["match-details-team-objectives-component"],
          layout: a(115),
          showTower: n.Ember.computed("mapId", function () {
            return !!this.get("mapId") && !this.isMapIdInSet(i);
          }),
          showInhib: n.Ember.computed("mapId", function () {
            return !!this.get("mapId") && !this.isMapIdInSet(i);
          }),
          showBaron: n.Ember.computed("mapId", function () {
            return this.isMapIdInSet(o);
          }),
          showDragon: n.Ember.computed("mapId", function () {
            return this.isMapIdInSet(r);
          }),
          showHorde: n.Ember.computed("mapId", function () {
            return this.isMapIdInSet(c);
          }),
          showRiftHerald: n.Ember.computed(
            "mapId",
            "team.riftHeraldKills",
            function () {
              return (
                this.isMapIdInSet(m) &&
                void 0 !== this.get("team.riftHeraldKills")
              );
            },
          ),
          showVilemaw: n.Ember.computed("mapId", function () {
            return this.isMapIdInSet(p);
          }),
          participantMap: n.Ember.computed("team.participants", function () {
            const t = {};
            return (
              this.get("team.participants").forEach((e) => {
                t[e.participantId] = !0;
              }),
              t
            );
          }),
          elementalData: n.Ember.computed("gameTimeline", function () {
            const t = [];
            if (
              this.get("team.dragonKills") > 0 &&
              this.get("gameTimeline.frames")
            ) {
              const e = this.get("participantMap"),
                a = this.get("gameTimeline.frames");
              for (let n = 0; n < a.length; n++) {
                const { events: s } = a[n];
                if (s)
                  for (let a = 0; a < s.length; a++) {
                    const n = s[a];
                    l[n.monsterSubType] &&
                      e[n.killerId] &&
                      t.push(l[n.monsterSubType]);
                  }
              }
            }
            return t;
          }),
          isMapIdInSet(t) {
            return t.has(this.get("mapId"));
          },
          setupTooltip: n.Ember.on("didInsertElement", function () {
            const t = s.bind(this);
            if (this.get("showTower")) {
              t(
                n.Ember.$(this.element).find(".tower-icon")[0],
                "MATCH_HISTORY_SCOREBOARD_OBJECTIVE_TOWER",
              );
            }
            if (this.get("showInhib")) {
              t(
                n.Ember.$(this.element).find(".inhibitor-icon")[0],
                "MATCH_HISTORY_SCOREBOARD_OBJECTIVE_INHIBITOR",
              );
            }
            if (this.get("showBaron")) {
              t(
                n.Ember.$(this.element).find(".baron-icon")[0],
                "MATCH_HISTORY_SCOREBOARD_OBJECTIVE_BARON",
              );
            }
            if (this.get("showDragon")) {
              t(
                n.Ember.$(this.element).find(".dragon-icon")[0],
                "MATCH_HISTORY_SCOREBOARD_OBJECTIVE_DRAGON",
                "ElementalTooltip",
                this.get("elementalData"),
              );
            }
            if (this.get("showRiftHerald")) {
              t(
                n.Ember.$(this.element).find(".rift-herald-icon")[0],
                "MATCH_HISTORY_SCOREBOARD_OBJECTIVE_RIFT_HERALD",
              );
            }
            if (this.get("showVilemaw")) {
              t(
                n.Ember.$(this.element).find(".vilemaw-icon")[0],
                "MATCH_HISTORY_SCOREBOARD_OBJECTIVE_VILEMAW",
              );
            }
            if (this.get("showHorde")) {
              t(
                n.Ember.$(this.element).find(".horde-icon")[0],
                "MATCH_HISTORY_SCOREBOARD_OBJECTIVE_HORDE",
              );
            }
          }),
        });
      },
      (t, e, a) => {
        "use strict";
        a.r(e);
      },
      (t, e, a) => {
        const n = a(1).Ember;
        t.exports = n.HTMLBars.template({
          id: "zr/Rq/VM",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-match-history\\\\src\\\\components\\\\scoreboard\\\\match-details-team-objectives-component\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-match-history\\\\src\\\\components\\\\scoreboard\\\\match-details-team-objectives-component\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-match-history\\\\src\\\\components\\\\scoreboard\\\\match-details-team-objectives-component\\\\index.js\\" "],["text","\\n"],["open-element","div",[]],["static-attr","class","match-details-right-data"],["flush-element"],["text","\\n"],["block",["if"],[["get",["showTower"]]],null,6],["block",["if"],[["get",["showInhib"]]],null,5],["block",["if"],[["get",["showBaron"]]],null,4],["block",["if"],[["get",["showDragon"]]],null,3],["block",["if"],[["get",["showRiftHerald"]]],null,2],["block",["if"],[["get",["showVilemaw"]]],null,1],["block",["if"],[["get",["showHorde"]]],null,0],["close-element"]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","    "],["open-element","div",[]],["static-attr","class","match-details-right-data-item"],["flush-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","match-details-right-data-icon horde-icon"],["flush-element"],["close-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","match-details-right-data-text"],["flush-element"],["append",["unknown",["team","hordeKills"]],false],["close-element"],["text","\\n    "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","    "],["open-element","div",[]],["static-attr","class","match-details-right-data-item"],["flush-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","match-details-right-data-icon vilemaw-icon"],["flush-element"],["close-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","match-details-right-data-text"],["flush-element"],["append",["unknown",["team","vilemawKills"]],false],["close-element"],["text","\\n    "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","    "],["open-element","div",[]],["static-attr","class","match-details-right-data-item"],["flush-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","match-details-right-data-icon rift-herald-icon"],["flush-element"],["close-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","match-details-right-data-text"],["flush-element"],["append",["unknown",["team","riftHeraldKills"]],false],["close-element"],["text","\\n    "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","    "],["open-element","div",[]],["static-attr","class","match-details-right-data-item"],["flush-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","match-details-right-data-icon dragon-icon"],["flush-element"],["close-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","match-details-right-data-text"],["flush-element"],["append",["unknown",["team","dragonKills"]],false],["close-element"],["text","\\n    "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","    "],["open-element","div",[]],["static-attr","class","match-details-right-data-item"],["flush-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","match-details-right-data-icon baron-icon"],["flush-element"],["close-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","match-details-right-data-text"],["flush-element"],["append",["unknown",["team","baronKills"]],false],["close-element"],["text","\\n    "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","    "],["open-element","div",[]],["static-attr","class","match-details-right-data-item"],["flush-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","match-details-right-data-icon inhibitor-icon"],["flush-element"],["close-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","match-details-right-data-text"],["flush-element"],["append",["unknown",["team","inhibitorKills"]],false],["close-element"],["text","\\n    "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","    "],["open-element","div",[]],["static-attr","class","match-details-right-data-item"],["flush-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","match-details-right-data-icon tower-icon"],["flush-element"],["close-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","match-details-right-data-text"],["flush-element"],["append",["unknown",["team","towerKills"]],false],["close-element"],["text","\\n    "],["close-element"],["text","\\n"]],"locals":[]}],"hasPartials":false}',
          meta: {},
        });
      },
      (t, e, a) => {
        "use strict";
        var n = (function (t, e) {
          if (!e && t && t.__esModule) return t;
          if (null === t || ("object" != typeof t && "function" != typeof t))
            return { default: t };
          var a = s(e);
          if (a && a.has(t)) return a.get(t);
          var n = {},
            l = Object.defineProperty && Object.getOwnPropertyDescriptor;
          for (var i in t)
            if ("default" !== i && Object.prototype.hasOwnProperty.call(t, i)) {
              var o = l ? Object.getOwnPropertyDescriptor(t, i) : null;
              o && (o.get || o.set)
                ? Object.defineProperty(n, i, o)
                : (n[i] = t[i]);
            }
          (n.default = t), a && a.set(t, n);
          return n;
        })(a(1));
        function s(t) {
          if ("function" != typeof WeakMap) return null;
          var e = new WeakMap(),
            a = new WeakMap();
          return (s = function (t) {
            return t ? a : e;
          })(t);
        }
        const l = n.Ember.Component.extend({
          layout: a(117),
          classNames: ["scoreboard-tooltip"],
          text: n.Ember.computed("traString", "tra.metadata", function () {
            return this.get("tra").get(this.get("traString"));
          }),
        });
        n.default &&
          n.default.EmberApplicationFactory.setFactoryDefinition({
            name: "ScoreboardTooltip",
            ScoreboardTooltipComponent: l,
            ComponentFactory: n.default.ComponentFactory,
          }),
          (t.exports = l);
      },
      (t, e, a) => {
        const n = a(1).Ember;
        t.exports = n.HTMLBars.template({
          id: "26jM6KOb",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-match-history\\\\src\\\\components\\\\scoreboard\\\\scoreboard-tooltip-component\\\\layout.hbs\\" style-path=\\"null\\" js-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-match-history\\\\src\\\\components\\\\scoreboard\\\\scoreboard-tooltip-component\\\\index.js\\" "],["text","\\n"],["open-element","lol-uikit-tooltip",[]],["flush-element"],["text","\\n  "],["open-element","lol-uikit-content-block",[]],["static-attr","type","tooltip-system"],["flush-element"],["text","\\n    "],["open-element","p",[]],["flush-element"],["append",["unknown",["text"]],false],["close-element"],["text","\\n  "],["close-element"],["text","\\n"],["close-element"]],"locals":[],"named":[],"yields":[],"blocks":[],"hasPartials":false}',
          meta: {},
        });
      },
      (t, e, a) => {
        "use strict";
        var n = (function (t, e) {
          if (!e && t && t.__esModule) return t;
          if (null === t || ("object" != typeof t && "function" != typeof t))
            return { default: t };
          var a = s(e);
          if (a && a.has(t)) return a.get(t);
          var n = {},
            l = Object.defineProperty && Object.getOwnPropertyDescriptor;
          for (var i in t)
            if ("default" !== i && Object.prototype.hasOwnProperty.call(t, i)) {
              var o = l ? Object.getOwnPropertyDescriptor(t, i) : null;
              o && (o.get || o.set)
                ? Object.defineProperty(n, i, o)
                : (n[i] = t[i]);
            }
          (n.default = t), a && a.set(t, n);
          return n;
        })(a(1));
        function s(t) {
          if ("function" != typeof WeakMap) return null;
          var e = new WeakMap(),
            a = new WeakMap();
          return (s = function (t) {
            return t ? a : e;
          })(t);
        }
        a(119);
        const l = n.Ember.Component.extend({
          layout: a(120),
          classNames: ["elemental-tooltip"],
          text: n.Ember.computed("traString", "tra.metadata", function () {
            return this.get("tra").get(this.get("traString"));
          }),
          elementalData: n.Ember.computed.alias("data"),
        });
        n.default &&
          n.default.EmberApplicationFactory.setFactoryDefinition({
            name: "ElementalTooltip",
            ElementalTooltipComponent: l,
            ComponentFactory: n.default.ComponentFactory,
          }),
          (t.exports = l);
      },
      (t, e, a) => {
        "use strict";
        a.r(e);
      },
      (t, e, a) => {
        const n = a(1).Ember;
        t.exports = n.HTMLBars.template({
          id: "qzaUw1H0",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-match-history\\\\src\\\\components\\\\scoreboard\\\\elemental-tooltip-component\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-match-history\\\\src\\\\components\\\\scoreboard\\\\elemental-tooltip-component\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-match-history\\\\src\\\\components\\\\scoreboard\\\\elemental-tooltip-component\\\\index.js\\" "],["text","\\n"],["open-element","lol-uikit-tooltip",[]],["flush-element"],["text","\\n  "],["open-element","lol-uikit-content-block",[]],["static-attr","type","tooltip-system"],["flush-element"],["text","\\n    "],["open-element","p",[]],["flush-element"],["append",["unknown",["text"]],false],["close-element"],["text","\\n"],["block",["if"],[["get",["elementalData"]]],null,1],["text","  "],["close-element"],["text","\\n"],["close-element"],["text","\\n"]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","          "],["open-element","div",[]],["dynamic-attr","class",["concat",["match-details-elemental-icon ",["get",["d"]]]]],["flush-element"],["close-element"],["text","\\n"]],"locals":["d"]},{"statements":[["text","      "],["open-element","div",[]],["static-attr","class","match-details-elemental-data"],["flush-element"],["text","\\n"],["block",["each"],[["get",["elementalData"]]],null,0],["text","      "],["close-element"],["text","\\n"]],"locals":[]}],"hasPartials":false}',
          meta: {},
        });
      },
      (t, e, a) => {
        "use strict";
        var n = (function (t, e) {
          if (!e && t && t.__esModule) return t;
          if (null === t || ("object" != typeof t && "function" != typeof t))
            return { default: t };
          var a = s(e);
          if (a && a.has(t)) return a.get(t);
          var n = {},
            l = Object.defineProperty && Object.getOwnPropertyDescriptor;
          for (var i in t)
            if ("default" !== i && Object.prototype.hasOwnProperty.call(t, i)) {
              var o = l ? Object.getOwnPropertyDescriptor(t, i) : null;
              o && (o.get || o.set)
                ? Object.defineProperty(n, i, o)
                : (n[i] = t[i]);
            }
          (n.default = t), a && a.set(t, n);
          return n;
        })(a(1));
        function s(t) {
          if ("function" != typeof WeakMap) return null;
          var e = new WeakMap(),
            a = new WeakMap();
          return (s = function (t) {
            return t ? a : e;
          })(t);
        }
        a(122);
        const l = n.Ember.Component.extend({
          layout: a(123),
          classNames: ["item-tooltip"],
        });
        n.default &&
          n.default.EmberApplicationFactory.setFactoryDefinition({
            name: "ItemTooltip",
            ItemTooltipComponent: l,
            ComponentFactory: n.default.ComponentFactory,
          }),
          (t.exports = l);
      },
      (t, e, a) => {
        "use strict";
        a.r(e);
      },
      (t, e, a) => {
        const n = a(1).Ember;
        t.exports = n.HTMLBars.template({
          id: "TOdv+bhV",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-match-history\\\\src\\\\components\\\\scoreboard\\\\item-tooltip-component\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-match-history\\\\src\\\\components\\\\scoreboard\\\\item-tooltip-component\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-match-history\\\\src\\\\components\\\\scoreboard\\\\item-tooltip-component\\\\index.js\\" "],["text","\\n"],["open-element","lol-uikit-tooltip",[]],["flush-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","match-history-item-tooltip"],["flush-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","match-item-info"],["flush-element"],["text","\\n      "],["open-element","img",[]],["dynamic-attr","src",["concat",[["unknown",["item","iconPath"]]]]],["static-attr","class","match-item-icon"],["flush-element"],["close-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","match-item-right"],["flush-element"],["text","\\n        "],["open-element","div",[]],["static-attr","class","match-history-tooltip-title"],["flush-element"],["append",["unknown",["item","name"]],false],["close-element"],["text","\\n        "],["open-element","div",[]],["static-attr","class","match-item-price"],["flush-element"],["append",["unknown",["item","priceTotal"]],false],["close-element"],["text","\\n      "],["close-element"],["text","\\n    "],["close-element"],["text","\\n    "],["open-element","div",[]],["flush-element"],["text","\\n      "],["open-element","lol-uikit-game-data-markup",[]],["static-attr","type","item"],["dynamic-attr","markup",["concat",[["unknown",["item","description"]]]]],["flush-element"],["close-element"],["text","\\n    "],["close-element"],["text","\\n  "],["close-element"],["text","\\n"],["close-element"],["text","\\n"]],"locals":[],"named":[],"yields":[],"blocks":[],"hasPartials":false}',
          meta: {},
        });
      },
      (t, e, a) => {
        "use strict";
        var n = (function (t, e) {
          if (!e && t && t.__esModule) return t;
          if (null === t || ("object" != typeof t && "function" != typeof t))
            return { default: t };
          var a = s(e);
          if (a && a.has(t)) return a.get(t);
          var n = {},
            l = Object.defineProperty && Object.getOwnPropertyDescriptor;
          for (var i in t)
            if ("default" !== i && Object.prototype.hasOwnProperty.call(t, i)) {
              var o = l ? Object.getOwnPropertyDescriptor(t, i) : null;
              o && (o.get || o.set)
                ? Object.defineProperty(n, i, o)
                : (n[i] = t[i]);
            }
          (n.default = t), a && a.set(t, n);
          return n;
        })(a(1));
        function s(t) {
          if ("function" != typeof WeakMap) return null;
          var e = new WeakMap(),
            a = new WeakMap();
          return (s = function (t) {
            return t ? a : e;
          })(t);
        }
        a(125);
        const l = n.Ember.Component.extend({
          layout: a(126),
          classNames: ["spell-tooltip"],
          spellLvlLbl: n.Ember.computed("tra.metadata", function () {
            return this.get("tra.MATCH_HISTORY_SUMMONER_SPELL_LEVEL");
          }),
        });
        n.default &&
          n.default.EmberApplicationFactory.setFactoryDefinition({
            name: "SpellTooltip",
            SpellTooltipComponent: l,
            ComponentFactory: n.default.ComponentFactory,
          }),
          (t.exports = l);
      },
      (t, e, a) => {
        "use strict";
        a.r(e);
      },
      (t, e, a) => {
        const n = a(1).Ember;
        t.exports = n.HTMLBars.template({
          id: "W7TfWL5J",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-match-history\\\\src\\\\components\\\\scoreboard\\\\spell-tooltip-component\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-match-history\\\\src\\\\components\\\\scoreboard\\\\spell-tooltip-component\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-match-history\\\\src\\\\components\\\\scoreboard\\\\spell-tooltip-component\\\\index.js\\" "],["text","\\n"],["open-element","lol-uikit-tooltip",[]],["flush-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","match-history-item-tooltip"],["flush-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","match-spell-icon-tooltip-header"],["flush-element"],["text","\\n      "],["open-element","img",[]],["dynamic-attr","src",["concat",[["unknown",["spell","iconPath"]]]]],["static-attr","class","match-spell-icon-tooltip-icon"],["flush-element"],["close-element"],["text","\\n      "],["open-element","div",[]],["flush-element"],["text","\\n        "],["open-element","div",[]],["static-attr","class","match-spell-icon-tooltip-name"],["flush-element"],["append",["unknown",["spell","name"]],false],["close-element"],["text","\\n        "],["open-element","div",[]],["static-attr","class","match-spell-icon-tooltip-level"],["flush-element"],["append",["unknown",["spellLvlLbl"]],false],["text"," "],["append",["unknown",["spell","summonerLevel"]],false],["close-element"],["text","\\n      "],["close-element"],["text","\\n    "],["close-element"],["text","\\n\\n    "],["open-element","div",[]],["static-attr","class","match-spell-icon-description"],["flush-element"],["append",["unknown",["spell","description"]],false],["close-element"],["text","\\n  "],["close-element"],["text","\\n"],["close-element"],["text","\\n"]],"locals":[],"named":[],"yields":[],"blocks":[],"hasPartials":false}',
          meta: {},
        });
      },
      (t, e, a) => {
        "use strict";
        var n = (function (t, e) {
          if (!e && t && t.__esModule) return t;
          if (null === t || ("object" != typeof t && "function" != typeof t))
            return { default: t };
          var a = s(e);
          if (a && a.has(t)) return a.get(t);
          var n = {},
            l = Object.defineProperty && Object.getOwnPropertyDescriptor;
          for (var i in t)
            if ("default" !== i && Object.prototype.hasOwnProperty.call(t, i)) {
              var o = l ? Object.getOwnPropertyDescriptor(t, i) : null;
              o && (o.get || o.set)
                ? Object.defineProperty(n, i, o)
                : (n[i] = t[i]);
            }
          (n.default = t), a && a.set(t, n);
          return n;
        })(a(1));
        function s(t) {
          if ("function" != typeof WeakMap) return null;
          var e = new WeakMap(),
            a = new WeakMap();
          return (s = function (t) {
            return t ? a : e;
          })(t);
        }
        a(128);
        const l = n.Ember.Component.extend({
          layout: a(129),
          classNames: ["Keystone-tooltip"],
          sanitizeConfig: {
            allowedTags: [
              "p",
              "em",
              "i",
              "br",
              "b",
              "strong",
              "hr",
              "h1",
              "h2",
              "h3",
              "a",
              "h4",
              "h5",
              "strike",
              "code",
              "ul",
              "ol",
              "li",
              "blockquote",
              "lol-uikit-tooltipped-keyword",
            ],
            allowedAttributes: { "lol-uikit-tooltipped-keyword": ["key"] },
          },
        });
        n.default &&
          n.default.EmberApplicationFactory.setFactoryDefinition({
            name: "KeystoneTooltip",
            KeystoneTooltipComponent: l,
            ComponentFactory: n.default.ComponentFactory,
          }),
          (t.exports = l);
      },
      (t, e, a) => {
        "use strict";
        a.r(e);
      },
      (t, e, a) => {
        const n = a(1).Ember;
        t.exports = n.HTMLBars.template({
          id: "hfjQWMkL",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-match-history\\\\src\\\\components\\\\scoreboard\\\\keystone-tooltip-component\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-match-history\\\\src\\\\components\\\\scoreboard\\\\keystone-tooltip-component\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-match-history\\\\src\\\\components\\\\scoreboard\\\\keystone-tooltip-component\\\\index.js\\" "],["text","\\n"],["open-element","lol-uikit-tooltip",[]],["flush-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","match-history-item-tooltip"],["flush-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","match-keystone-icon-tooltip-header"],["flush-element"],["text","\\n      "],["open-element","img",[]],["dynamic-attr","src",["concat",[["unknown",["keystone","iconPath"]]]]],["static-attr","class","match-keystone-icon-tooltip-icon"],["flush-element"],["close-element"],["text","\\n      "],["open-element","div",[]],["flush-element"],["text","\\n        "],["open-element","div",[]],["static-attr","class","match-keystone-icon-tooltip-name"],["flush-element"],["append",["helper",["sanitize"],[["get",["keystone","name"]]],[["config"],[["get",["sanitizeConfig"]]]]],false],["close-element"],["text","\\n      "],["close-element"],["text","\\n    "],["close-element"],["text","\\n\\n    "],["open-element","div",[]],["static-attr","class","match-keystone-icon-description"],["flush-element"],["append",["helper",["sanitize"],[["get",["keystone","shortDesc"]]],[["config"],[["get",["sanitizeConfig"]]]]],false],["close-element"],["text","\\n  "],["close-element"],["text","\\n"],["close-element"],["text","\\n"]],"locals":[],"named":[],"yields":[],"blocks":[],"hasPartials":false}',
          meta: {},
        });
      },
      (t, e, a) => {
        "use strict";
        var n = a(1);
        t.exports = n.Ember.Component.extend({
          layout: a(131),
          champIconClass: null,
          champ: n.Ember.computed("champId", function () {
            return this.get("champions").get(this.get("champId"));
          }),
        });
      },
      (t, e, a) => {
        const n = a(1).Ember;
        t.exports = n.HTMLBars.template({
          id: "uUnDmnGt",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-match-history\\\\src\\\\components\\\\scoreboard\\\\champ-icon-component\\\\layout.hbs\\" style-path=\\"null\\" js-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-match-history\\\\src\\\\components\\\\scoreboard\\\\champ-icon-component\\\\index.js\\" "],["text","\\n"],["block",["if"],[["get",["champ"]]],null,1,0]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","  "],["open-element","img",[]],["static-attr","class","no-champ-icon"],["flush-element"],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","  "],["open-element","img",[]],["dynamic-attr","src",["concat",[["unknown",["champ","squarePortraitPath"]]]]],["static-attr","alt",""],["dynamic-attr","class",["concat",[["unknown",["champIconClass"]]]]],["flush-element"],["close-element"],["text","\\n"]],"locals":[]}],"hasPartials":false}',
          meta: {},
        });
      },
      (t, e, a) => {
        "use strict";
        var n,
          s = a(1),
          l = a(6),
          i = (n = a(10)) && n.__esModule ? n : { default: n },
          o = a(133);
        a(134);
        const { Component: r, computed: c } = s.Ember,
          m = { 1e3: "playerScore0", 1001: "playerScore0" },
          p = { 1e3: "playerScore1", 1001: "playerScore1" };
        function d(t, e) {
          return function () {
            const a = this.get(t);
            return this.get(e).map((t) => a.get(t));
          };
        }
        t.exports = r.extend(l.DataBindingMixin, {
          layout: a(135),
          classNames: ["player-history-object"],
          classNameBindings: [
            "selectable",
            "isCurrentParticipant:me",
            "showHighLightClass:high-spec-highlight",
          ],
          isThirdPersonView: !1,
          displayTooltip: !1,
          hasAssignedTooltip: !1,
          playerReportsService: s.Ember.inject.service("player-reports"),
          goldEarnedDisplay: c(
            "participant.stats",
            "tra.metadata.locale.id",
            function () {
              const t = this.get("participant.goldEarned"),
                e = this.get("tra.metadata.locale.id");
              return i.default.formatGold(t, e);
            },
          ),
          clubName: "",
          mapHasMinions: s.Ember.computed("mapId", function () {
            return !o.MAP_IDS_WITHOUT_CS.includes(this.get("mapId"));
          }),
          isCurrentParticipant: s.Ember.computed(
            "currentParticipant",
            "participant",
            function () {
              if (!this.get("currentParticipant.player")) return !1;
              const t = this.get("currentParticipant").player,
                { player: e } = this.get("participant");
              return t.summonerId === e.summonerId;
            },
          ),
          spellDTOs: c(
            "participant.spellIds.[]",
            d("spells", "participant.spellIds"),
          ),
          keystone: c("participant.perk0", function () {
            if (!this.get("participant.perk0")) return !1;
            const t = this.get("participant.perk0");
            return this.get("runes").get(t);
          }),
          itemDTOs: c(
            "participant.itemIds.[]",
            d("items", "participant.itemIds"),
          ),
          champion: c("participant.championId", function () {
            const t = this.get("participant.championId");
            return this.get("champions").get(t);
          }),
          summonerId: c.readOnly("participant.player.summonerId"),
          puuid: c.readOnly("participant.player.puuid"),
          summonerName: c.readOnly("participant.player.summonerName"),
          gameName: c.readOnly("participant.player.gameName"),
          tagLine: c.readOnly("participant.player.tagLine"),
          playerNames: c("summonerName", "gameName", "tagLine", function () {
            const t = this.get("summonerName"),
              e = this.get("gameName"),
              a = this.get("tagLine");
            return e && a
              ? this.get("_playerNames").formatPlayerName({
                  summonerName: t,
                  gameName: e,
                  tagLine: a,
                })
              : t;
          }),
          playerNameFull: c.readOnly("playerNames.playerNameFull"),
          squarePortraitPath: c(
            "champions",
            "participant.championId",
            function () {
              const t = this.get("champions"),
                e = this.get("participant.championId");
              return t && e ? t.get(e).squarePortraitPath : "";
            },
          ),
          isSummonerBlocked: s.Ember.computed(
            "blockedPlayers.[]",
            "summonerId",
            function () {
              return (
                s.Lodash.findIndex(this.get("blockedPlayers"), {
                  summonerId: this.get("summonerId"),
                }) > -1
              );
            },
          ),
          isSummonerFriend: s.Ember.computed(
            "friends.[]",
            "summonerId",
            function () {
              return (
                s.Lodash.findIndex(this.get("friends"), {
                  summonerId: this.get("summonerId"),
                }) > -1
              );
            },
          ),
          showHighLightClass: s.Ember.computed(
            "lowSpecModeSettings",
            function () {
              const t = this.get("lowSpecModeSettings");
              return !Boolean(t && t.data && !0 === t.data.potatoModeEnabled);
            },
          ),
          itemSetsEnabled: c.readOnly("platformConfig.ItemSets.EditorEnabled"),
          maxItemSets: c("platformConfig.ItemSets.MaxItemSets", function () {
            const t = this.get("platformConfig.ItemSets.MaxItemSets");
            return void 0 === t ? 20 : t;
          }),
          playerCSDisplay: c("queueId", "participant", function () {
            const t = p[this.get("queueId")];
            return t
              ? this.get(`participant.${t}`)
              : this.get("participant.minionsPlusNeutralMonstersCount");
          }),
          playerGoldDisplay: c("queueId", "goldEarnedDisplay", function () {
            const t = m[this.get("queueId")];
            return t
              ? this.get(`participant.${t}`)
              : this.get("goldEarnedDisplay");
          }),
          init() {
            this._super(...arguments), (this._playerNames = s.playerNames);
          },
          didInsertElement() {
            this._super(...arguments), this.addContextMenu();
          },
          addContextMenu() {
            this.$()[0].addEventListener("contextmenu", (t) => {
              const e = this.getMenuItemModel();
              e.length > 0 &&
                (s.ContextMenuManager.setMenuItems(e),
                s.ContextMenuManager.openAtEvent(t));
            });
          },
          isLocalPlayerInGame: c(
            "currentParticipant.player.puuid",
            "localPuuid",
            function () {
              return (
                this.get("currentParticipant.player.puuid") ===
                this.get("localPuuid")
              );
            },
          ),
          hasGameReportWindowExpired: c("gameCreation", function () {
            const t = this.get("gameCreation");
            if (!t) return !0;
            const e = new Date(t);
            return new Date() - e > 432e6;
          }),
          isPlayerReported: c(
            "playerReportsService.reportedPlayers.[]",
            "participant.player.puuid",
            function () {
              const t = this.get("participant.player.puuid"),
                e = this.get("playerReportsService.reportedPlayers") || [];
              return !!(e && e.length > 0) && e.includes(t);
            },
          ),
          cannotReportPlayer: c(
            "hasGameReportWindowExpired",
            "isLocalPlayerInGame",
            "isPlayerReported",
            function () {
              const t = this.get("isLocalPlayerInGame"),
                e = this.get("hasGameReportWindowExpired");
              return this.get("isPlayerReported") || !t || e;
            },
          ),
          hasAugments: c("mapId", function () {
            return o.MAP_IDS_WITH_AUGMENTS.includes(this.get("mapId"));
          }),
          participantAugments: c("participant", "mapId", function () {
            const t = this.get("participant"),
              e = this.get("augments"),
              a = [];
            for (let n = 1; n <= o.NUMBER_OF_AUGMENTS; ++n) {
              const s = t[`playerAugment${n}`] || 0,
                l = e.get(s) || { id: 0, rarity: "none" };
              a.push(l);
            }
            return a;
          }),
          getMenuItemModel: function () {
            let t = [];
            const e = this.get("participant.player.puuid"),
              a = this.get("summonerName"),
              n = this.get("playerNameFull");
            if (this.get("itemSetsEnabled")) {
              const e = this.get("champion"),
                a = this.get("maxItemSets"),
                s = this.get("myItemSets"),
                l =
                  void 0 !== s &&
                  void 0 !== s.itemSets &&
                  s.itemSets.length >= a,
                i = {
                  label: this.get(
                    "tra.MATCH_HISTORY_SCOREBOARD_MENU_IMPORT_ITEM_SET",
                  ),
                  target: this,
                  disabled: l,
                  action: function () {
                    this.confirmImportItemSet(e, n);
                  },
                };
              t.push(i);
            }
            const l = this.get("summonerId");
            let i;
            this.get("isSummonerBlocked")
              ? (i = this.get("blockedPlayers").findBy("summonerId", l).id)
              : this.get("isFriend") &&
                (i = this.get("friends").findBy("summonerId", l).id);
            const o = this.get("session.summonerId");
            if (l === o) return t;
            const r = {
                label: this.get(
                  "tra.MATCH_HISTORY_SCOREBOARD_MENU_VIEW_PROFILE",
                ),
                target: this,
                action: function () {
                  (0, s.getProvider)()
                    .get("rcp-fe-lol-profiles")
                    .showOverlay({ summonerId: this.get("summonerId") });
                },
              },
              c = {
                label: this.get(
                  "tra.MATCH_HISTORY_SCOREBOARD_MENU_BLOCK_PLAYER",
                ),
                target: this,
                action: function () {
                  this.confirmBlockPlayer(l, a, n);
                },
              },
              m = {
                label: this.get(
                  "tra.MATCH_HISTORY_SCOREBOARD_MENU_UNBLOCK_PLAYER",
                ),
                target: this,
                action: function () {
                  this.get("api.bindings.chat").delete(
                    `/v1/blocked-players/${i}`,
                  );
                },
              },
              p = {
                label: this.get("tra.MATCH_HISTORY_SCOREBOARD_MENU_ADD_FRIEND"),
                target: this,
                action: function () {
                  this.get("api.bindings.chat").post("/v2/friend-requests/", {
                    puuid: this.get("puuid"),
                  });
                },
              },
              d = {
                label: this.get(
                  "tra.MATCH_HISTORY_SCOREBOARD_MENU_REMOVE_FRIEND",
                ),
                target: this,
                action: function () {
                  this.get("api.bindings.chat").delete(`/v1/friends/${i}`);
                },
              },
              u = s.Ember.Object.create({
                summonerName: a,
                summonerId: l,
                gameId: this.get("gameId"),
                puuid: e,
              }),
              h = this.get("squarePortraitPath"),
              g = {
                label: this.get(
                  "tra.MATCH_HISTORY_SCOREBOARD_MENU_BLOCK_BTN_REPORT",
                ),
                target: this,
                disabled: this.get("cannotReportPlayer"),
                action: function () {
                  s.SharedReportModalApps.showReportModal(
                    u,
                    h,
                    "LOL",
                    "MATCH_HISTORY",
                  );
                },
              };
            return (
              (t = t.concat([
                r,
                this.get("isSummonerBlocked") ? m : c,
                this.get("isSummonerFriend") ? d : p,
                g,
              ])),
              t
            );
          },
          confirmBlockPlayer(t, e, a) {
            const n = (0, s.getProvider)().get("rcp-fe-lol-uikit"),
              l = n.getTemplateHelper(),
              i = n.getModalManager(),
              o = l.contentBlockDialog(
                this.get(
                  "tra.MATCH_HISTORY_SCOREBOARD_MENU_BLOCK_CONFIRM_TITLE",
                ),
                this.get("tra").formatString(
                  "MATCH_HISTORY_SCOREBOARD_MENU_BLOCK_CONFIRM_TEXT",
                  { name: a },
                ),
                "dialog-medium",
                "confirm-friend-actions",
              ),
              r = i.add({
                type: "DialogConfirm",
                data: {
                  contents: o,
                  acceptText: this.get(
                    "tra.MATCH_HISTORY_SCOREBOARD_MENU_BLOCK_BTN_BLOCK",
                  ),
                  declineText: this.get(
                    "tra.MATCH_HISTORY_SCOREBOARD_MENU_BLOCK_BTN_CANCEL",
                  ),
                  closeButton: !1,
                },
              }),
              c = r.domNode.querySelector(".confirm-friend-actions");
            (c.style.width = "360px"),
              (c.querySelector("p").style.textAlign = "left"),
              r.acceptPromise
                .then(() => {
                  this.get("api.bindings.chat").post("/v1/blocked-players", {
                    summonerId: t,
                    name: e,
                  });
                })
                .catch(() => {});
          },
          confirmImportItemSet(t, e) {
            const a = {
              items: s.Lodash.compact(this.get("itemDTOs")).map((t) => t.id),
              name: this.get("tra").formatString(
                "MATCH_HISTORY_ITEM_SETS_IMPORT_NAME",
                { champion: t.name, summoner: e },
              ),
              maps: [this.get("mapId")],
              champions: [t.id],
              source: "match_history",
            };
            (0, s.getProvider)()
              .getOptional("rcp-fe-lol-collections")
              .then(
                (t) => t.getItemSetsApi().saveItemSet(a),
                (t) => s.logger.error("Provider getOptional failure", t),
              );
          },
          assignAllTooltips() {
            const t = this.get("spells"),
              e = this.get("items"),
              a = this.get("runes"),
              n = this.get("tra"),
              l = this.$(".player-history-spells img"),
              i = this.get("participant.spellIds");
            l.each(function (e) {
              const a = t.get(i[e]);
              a &&
                s.TooltipManager.assign(
                  this,
                  "SpellTooltip",
                  { spell: a, tra: n },
                  {
                    ComponentFactory: s.ComponentFactory,
                    targetAnchor: { x: "center", y: "top" },
                    tooltipAnchor: { x: "left", y: "bottom" },
                    offset: { x: -20, y: 6 },
                    restrictArea: "whole-window",
                  },
                );
            });
            const o = this.$(".player-history-keystone img"),
              r = this.get("participant.perk0");
            o.each(function (t) {
              const e = a.get(r);
              e &&
                s.TooltipManager.assign(
                  this,
                  "KeystoneTooltip",
                  { keystone: e, tra: n },
                  {
                    ComponentFactory: s.ComponentFactory,
                    targetAnchor: { x: "center", y: "top" },
                    tooltipAnchor: { x: "left", y: "bottom" },
                    offset: { x: -20, y: 6 },
                    restrictArea: "whole-window",
                  },
                );
            });
            const c = this.$(".player-history-item"),
              m = this.get("participant.itemIds");
            if (
              (c.each(function (t) {
                const a = e.get(m[t]);
                a &&
                  s.TooltipManager.assign(
                    this,
                    "ItemTooltip",
                    { item: a },
                    {
                      ComponentFactory: s.ComponentFactory,
                      targetAnchor: { x: "left", y: "center" },
                      tooltipAnchor: { x: "right", y: "center" },
                      offset: { x: 5, y: 0 },
                    },
                  );
              }),
              this.get("hasAugments"))
            ) {
              const t = this.$(".player-history-augment"),
                e = this.get("participantAugments");
              t.each(function (t) {
                const a = e[t];
                a &&
                  a.id &&
                  s.TooltipManager.assign(
                    this,
                    "ScoreboardTooltip",
                    { text: a.nameTRA },
                    {
                      ComponentFactory: s.ComponentFactory,
                      type: "system",
                      targetAnchor: { x: "center", y: "top" },
                      tooltipAnchor: { x: "center", y: "bottom" },
                    },
                  );
              });
            }
            this.set("hasAssignedTooltip", !0);
          },
          didRender() {
            !this.get("hasAssignedTooltip") &&
              this.get("displayTooltip") &&
              this.assignAllTooltips();
          },
        });
      },
      (t, e) => {
        "use strict";
        Object.defineProperty(e, "__esModule", { value: !0 }),
          (e.NUMBER_OF_AUGMENTS =
            e.MAP_IDS_WITH_AUGMENTS =
            e.MAP_IDS_WITHOUT_CS =
              void 0);
        e.MAP_IDS_WITHOUT_CS = [30];
        e.MAP_IDS_WITH_AUGMENTS = [30, 33];
        e.NUMBER_OF_AUGMENTS = 4;
      },
      (t, e, a) => {
        "use strict";
        a.r(e);
      },
      (t, e, a) => {
        const n = a(1).Ember;
        t.exports = n.HTMLBars.template({
          id: "lsNIo7kg",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-match-history\\\\src\\\\components\\\\scoreboard\\\\player-history-row-component\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-match-history\\\\src\\\\components\\\\scoreboard\\\\player-history-row-component\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-match-history\\\\src\\\\components\\\\scoreboard\\\\player-history-row-component\\\\index.js\\" "],["text","\\n"],["comment"," add class \\"me\\" to mark my profile to the parent div "],["text","\\n"],["open-element","div",[]],["static-attr","class","player-history-object-wrapper"],["flush-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","player-history-champion"],["flush-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","player-history-champion-icon"],["flush-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","player-history-champion-icon-border"],["flush-element"],["close-element"],["text","\\n"],["block",["if"],[["get",["champion"]]],null,9,8],["text","      "],["open-element","div",[]],["static-attr","class","player-history-champion-frame"],["flush-element"],["close-element"],["text","\\n    "],["close-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","player-history-lv"],["flush-element"],["append",["unknown",["participant","champLevel"]],false],["close-element"],["text","\\n  "],["close-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","player-history-result"],["flush-element"],["text","\\n\\n    "],["open-element","div",[]],["dynamic-attr","class",["concat",["player-history-result-text ",["unknown",["titleInfo","titleClass"]]]]],["flush-element"],["append",["unknown",["titleInfo","title"]],false],["close-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","player-history-mode"],["flush-element"],["append",["unknown",["titleInfo","subTitle"]],false],["close-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","player-history-team-name"],["flush-element"],["append",["unknown",["clubName"]],false],["close-element"],["text","\\n\\n    "],["open-element","div",[]],["static-attr","class","player-history-keystone"],["flush-element"],["text","\\n"],["block",["if"],[["get",["keystone","iconPath"]]],null,7],["text","    "],["close-element"],["text","\\n\\n    "],["open-element","div",[]],["static-attr","class","player-history-spells"],["flush-element"],["text","\\n"],["block",["each"],[["get",["spellDTOs"]]],null,6],["text","    "],["close-element"],["text","\\n  "],["close-element"],["text","\\n  "],["open-element","div",[]],["dynamic-attr","class",["concat",["player-history-items ",["helper",["if"],[["get",["hasAugments"]],"player-history-items-with-augments"],null]]]],["flush-element"],["text","\\n"],["block",["if"],[["get",["hasAugments"]]],null,4],["text","    "],["open-element","ul",[]],["static-attr","class","player-history-items-list"],["flush-element"],["text","\\n"],["block",["each"],[["get",["itemDTOs"]]],null,2],["text","    "],["close-element"],["text","\\n    "],["open-element","div",[]],["dynamic-attr","class",["concat",[["helper",["if"],[["get",["mapHasMinions"]],"player-history-stats","player-history-stats-no-minions"],null]]]],["flush-element"],["text","\\n      "],["open-element","span",[]],["static-attr","class","player-history-stats-kills"],["flush-element"],["text","\\n        "],["open-element","span",[]],["dynamic-attr","class",["concat",[["helper",["if"],[["get",["participant","mostKills"]],"player-history-stats-highest-value"],null]]]],["flush-element"],["append",["unknown",["participant","kills"]],false],["close-element"],["text","\\n        /"],["open-element","span",[]],["flush-element"],["append",["unknown",["participant","deaths"]],false],["close-element"],["text","\\n        /"],["open-element","span",[]],["dynamic-attr","class",["concat",[["helper",["if"],[["get",["participant","mostAssists"]],"player-history-stats-highest-value"],null]]]],["flush-element"],["append",["unknown",["participant","assists"]],false],["close-element"],["text","\\n      "],["close-element"],["text","\\n"],["block",["if"],[["get",["mapHasMinions"]]],null,0],["text","      "],["open-element","span",[]],["dynamic-attr","class",["concat",["player-history-stats-gold ",["helper",["if"],[["get",["participant","mostGoldEarned"]],"player-history-stats-highest-value"],null]]]],["flush-element"],["append",["unknown",["playerGoldDisplay"]],false],["close-element"],["text","\\n    "],["close-element"],["text","\\n  "],["close-element"],["text","\\n"],["close-element"],["text","\\n"]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","        "],["open-element","span",[]],["dynamic-attr","class",["concat",["player-history-stats-minions ",["helper",["if"],[["get",["participant","mostMinionKills"]],"player-history-stats-highest-value"],null]]]],["flush-element"],["append",["unknown",["playerCSDisplay"]],false],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","            "],["open-element","img",[]],["dynamic-attr","src",["concat",[["unknown",["item","iconPath"]]]]],["static-attr","alt",""],["static-attr","class","player-history-item-pic"],["flush-element"],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","        "],["open-element","li",[]],["static-attr","class","player-history-item"],["flush-element"],["text","\\n"],["block",["if"],[["get",["item","iconPath"]]],null,1],["text","        "],["close-element"],["text","\\n"]],"locals":["item"]},{"statements":[["text","          "],["open-element","div",[]],["dynamic-attr","class",["concat",["player-history-augment-border player-history-augment-rarity-",["unknown",["augment","rarity"]]]]],["flush-element"],["text","\\n            "],["open-element","div",[]],["static-attr","class","player-history-augment"],["dynamic-attr","style",["concat",["-webkit-mask-image: url(",["unknown",["augment","augmentSmallIconPath"]],");"]]],["flush-element"],["close-element"],["text","\\n          "],["close-element"],["text","\\n"]],"locals":["augment"]},{"statements":[["text","      "],["open-element","div",[]],["static-attr","class","player-history-augment-wrapper"],["flush-element"],["text","\\n"],["block",["each"],[["get",["participantAugments"]]],null,3],["text","      "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","          "],["open-element","img",[]],["dynamic-attr","src",["concat",[["unknown",["spell","iconPath"]]]]],["static-attr","alt",""],["static-attr","class","player-history-spell-pic"],["flush-element"],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["block",["if"],[["get",["spell","iconPath"]]],null,5]],"locals":["spell"]},{"statements":[["text","          "],["open-element","img",[]],["dynamic-attr","src",["concat",[["unknown",["keystone","iconPath"]]]]],["static-attr","alt",""],["static-attr","class","player-history-keystone-pic"],["flush-element"],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","        "],["open-element","img",[]],["static-attr","class","no-champ-icon"],["flush-element"],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","        "],["open-element","img",[]],["dynamic-attr","src",["concat",[["unknown",["champion","squarePortraitPath"]]]]],["static-attr","alt",""],["static-attr","class","player-history-champion-pic"],["flush-element"],["close-element"],["text","\\n"]],"locals":[]}],"hasPartials":false}',
          meta: {},
        });
      },
      (t, e, a) => {
        "use strict";
        var n = a(1);
        a(137);
        var s = a(106);
        t.exports = n.Ember.Component.extend({
          classNames: ["match-details-stats-component"],
          layout: a(138),
          stats: n.Ember.inject.service(),
          init() {
            this._super(...arguments),
              this._calculateCherryStartingSubteamPlacement();
          },
          statsCurrentParticipant: n.Ember.computed(
            "stats.participants",
            "stats.currentSummonerId",
            function () {
              const t = this.get("stats.participants"),
                e = this.get("stats.currentSummonerId");
              if (t) {
                const a = t.find(function (t) {
                  return t.summonerId === e;
                });
                return a || t[0];
              }
            },
          ),
          myTeamId: n.Ember.computed.alias("statsCurrentParticipant.teamId"),
          otherTeamId: n.Ember.computed("statsCurrentParticipant", function () {
            const t = this.get("statsCurrentParticipant");
            return t && 100 === t.teamId ? 200 : 100;
          }),
          startingSubteamPlacement: null,
          currentParticipantObserver: n.Ember.observer(
            "stats.participants",
            "stats.currentSummonerId",
            function () {
              this._calculateCherryStartingSubteamPlacement();
            },
          ),
          sortProperty: ["teamId"],
          sortedParticipants: n.Ember.computed(
            "stats.participants",
            "gameMode",
            "startingSubteamPlacement",
            function () {
              let t = this.get("stats.participants");
              if (!t || !t.length) return [];
              if (this.get("gameMode") === s.CHERRY_GAME_MODE)
                return this._calculateCherryParticipants(t);
              const e = this.get("myTeamId");
              return (
                (t = t.slice(0).sort(function (t, a) {
                  return t.teamId === e ? -1 : t.teamId === a.teamId ? 0 : 1;
                })),
                t
              );
            },
          ),
          mapId: n.Ember.computed.alias("gameData.mapId"),
          gameMode: n.Ember.computed.alias("gameData.gameMode"),
          tabDescriptions: n.Ember.A(a(139)),
          showSubteamAvatars: n.Ember.computed.equal(
            "gameMode",
            s.CHERRY_GAME_MODE,
          ),
          removeAnimationWhenDone: n.Ember.on("didInsertElement", function () {
            const t = n.Ember.$(this.element).find(".match-stats-container")[0];
            t.addEventListener("webkitAnimationEnd", function (e) {
              e.target === t &&
                "fade-in" === e.animationName &&
                t.classList.remove("match-details-loading-fade-in");
            });
          }),
          _calculateCherryParticipants(t) {
            t = t.slice(0).sort(function (t, e) {
              return t.stats.subteamPlacement - e.stats.subteamPlacement;
            });
            const e = this.get("startingSubteamPlacement") || 1,
              a = Math.floor(10 / s.CHERRY_SUBTEAM_SIZE),
              n = (e - 1) * s.CHERRY_SUBTEAM_SIZE,
              l = n + a * s.CHERRY_SUBTEAM_SIZE;
            return t.slice(n, l);
          },
          _calculateCherryStartingSubteamPlacement() {
            if (this.get("gameMode") === s.CHERRY_GAME_MODE) {
              if (null !== this.get("startingSubteamPlacement")) return;
              const t = this.get("stats.participants");
              if (!t || !t.length) return;
              const e =
                  this.get("statsCurrentParticipant").stats.subteamPlacement ||
                  1,
                a = Math.floor(10 / s.CHERRY_SUBTEAM_SIZE),
                n = Math.max(1, e - a + 1);
              this.set("startingSubteamPlacement", n);
            }
          },
          hoverColumn(t) {
            n.Lodash.forEach(this.$(".match-history-stats-main"), (e) => {
              const a = e.querySelectorAll(".match-history-stats-bg-column");
              a[t] && a[t].classList.add("hover");
            });
            const e = this.$(".team-avatar-wrapper");
            e[t] && e[t].classList.add("hover");
          },
          removeHoverColumn(t) {
            n.Lodash.forEach(this.$(".match-history-stats-main"), (e) => {
              const a = e.querySelectorAll(".match-history-stats-bg-column");
              a[t] && a[t].classList.remove("hover");
            });
            const e = this.$(".team-avatar-wrapper");
            e[t] && e[t].classList.remove("hover");
          },
          didInsertElement() {
            this._super(...arguments),
              this.element.addEventListener("selectHoverColumnIndex", (t) => {
                this.hoverColumn(t.columnIndex);
              }),
              this.element.addEventListener("deselectHoverColumnIndex", (t) => {
                this.removeHoverColumn(t.columnIndex);
              });
          },
          actions: {
            stopEventPropagation: function () {},
            updateStartingSubteamPlacement: function (t) {
              if (this.get("gameMode") === s.CHERRY_GAME_MODE) {
                const e = Math.floor(10 / s.CHERRY_SUBTEAM_SIZE),
                  a = this.get("stats.participants.length"),
                  n = Math.ceil(a / s.CHERRY_SUBTEAM_SIZE);
                let l = this.get("startingSubteamPlacement");
                (l += t ? 1 : -1),
                  (l = Math.min(n - e + 1, l)),
                  (l = Math.max(1, l)),
                  this.set("startingSubteamPlacement", l);
              }
            },
          },
        });
      },
      (t, e, a) => {
        "use strict";
        a.r(e);
      },
      (t, e, a) => {
        const n = a(1).Ember;
        t.exports = n.HTMLBars.template({
          id: "TzR7zGqn",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-match-history\\\\src\\\\components\\\\stats\\\\match-details-stats-component\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-match-history\\\\src\\\\components\\\\stats\\\\match-details-stats-component\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-match-history\\\\src\\\\components\\\\stats\\\\match-details-stats-component\\\\index.js\\" "],["text","\\n"],["open-element","div",[]],["dynamic-attr","class",["concat",["match-stats-container ",["helper",["if"],[["get",["isTransitioning"]],"match-details-loading-hide","match-details-loading-fade-in"],null]]]],["modifier",["action"],[["get",[null]],"stopEventPropagation"]],["flush-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","match-stats-teams"],["flush-element"],["text","\\n"],["block",["if"],[["get",["showSubteamAvatars"]]],null,2,1],["text","    "],["open-element","div",[]],["static-attr","class","match_details_clearfix"],["flush-element"],["close-element"],["text","\\n  "],["close-element"],["text","\\n  "],["open-element","lol-uikit-scrollable",[]],["static-attr","class","match-stats-table-container"],["static-attr","overflow-masks","enabled"],["flush-element"],["text","\\n"],["block",["each"],[["get",["tabDescriptions"]]],null,0],["text","  "],["close-element"],["text","\\n"],["close-element"],["text","\\n"]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","    "],["append",["helper",["stats-table"],null,[["tab","mapId","gameMode","participants","currentSummonerId"],[["get",["tab"]],["get",["mapId"]],["get",["gameMode"]],["get",["sortedParticipants"]],["get",["stats","currentSummonerId"]]]]],false],["text","\\n"]],"locals":["tab"]},{"statements":[["text","      "],["append",["helper",["team-avatars"],null,[["champions","participants","currentSummonerId","teamId","isMyTeam"],[["get",["champions"]],["get",["sortedParticipants"]],["get",["stats","currentSummonerId"]],["get",["myTeamId"]],true]]],false],["text","\\n      "],["append",["helper",["team-avatars"],null,[["champions","participants","currentSummonerId","teamId","isMyTeam"],[["get",["champions"]],["get",["sortedParticipants"]],["get",["stats","currentSummonerId"]],["get",["otherTeamId"]],false]]],false],["text","\\n"]],"locals":[]},{"statements":[["text","      "],["append",["helper",["subteam-avatars"],null,[["champions","participants","startingSubteamPlacement","currentSummonerId","updateStartingSubteamPlacement"],[["get",["champions"]],["get",["sortedParticipants"]],["get",["startingSubteamPlacement"]],["get",["stats","currentSummonerId"]],"updateStartingSubteamPlacement"]]],false],["text","\\n"]],"locals":[]}],"hasPartials":false}',
          meta: {},
        });
      },
      (t) => {
        "use strict";
        t.exports = JSON.parse(
          '[{"name":"MATCH_HISTORY_STATS_TAB_COMBAT","attributes":[{"name":"MATCH_HISTORY_STATS_ATTR_KDA","key":["kills","deaths","assists"],"format":"concatKDA"},{"name":"MATCH_HISTORY_STATS_ATTR_LARGEST_KILLING_SPREE","key":"largestKillingSpree"},{"name":"MATCH_HISTORY_STATS_ATTR_LARGEST_MULTI_KILL","key":"largestMultiKill"},{"name":"MATCH_HISTORY_STATS_ATTR_TIME_CCING_OTHERS","key":"timeCCingOthers","format":"number"},{"name":"MATCH_HISTORY_STATS_ATTR_FIRST_BLOOD","key":"firstBloodKill","format":"firstBloodFormatter"}]},{"name":"MATCH_HISTORY_STATS_TAB_DMG","attributes":[{"name":"MATCH_HISTORY_STATS_ATTR_DMG_CHAMPION_TOTAL","key":"totalDamageDealtToChampions","format":"number"},{"name":"MATCH_HISTORY_STATS_ATTR_DMG_CHAMPION_PHYSICAL","key":"physicalDamageDealtToChampions","format":"number"},{"name":"MATCH_HISTORY_STATS_ATTR_DMG_CHAMPION_MAGICAL","key":"magicDamageDealtToChampions","format":"number"},{"name":"MATCH_HISTORY_STATS_ATTR_DMG_CHAMPION_TRUE","key":"trueDamageDealtToChampions","format":"number"},{"name":"MATCH_HISTORY_STATS_ATTR_DMG_DEALT_TOTAL","key":"totalDamageDealt","format":"number"},{"name":"MATCH_HISTORY_STATS_ATTR_DMG_DEALT_PHYSICAL","key":"physicalDamageDealt","format":"number"},{"name":"MATCH_HISTORY_STATS_ATTR_DMG_DEALT_MAGICAL","key":"magicDamageDealt","format":"number"},{"name":"MATCH_HISTORY_STATS_ATTR_DMG_DEALT_TRUE","key":"trueDamageDealt","format":"number"},{"name":"MATCH_HISTORY_STATS_ATTR_LARGEST_CRITICAL_STRIKE","key":"largestCriticalStrike","format":"number"},{"name":"MATCH_HISTORY_STATS_ATTR_DMG_DEALT_TOTAL_TURRETS","key":"damageDealtToTurrets","format":"number"},{"name":"MATCH_HISTORY_STATS_ATTR_DMG_DEALT_TOTAL_OBJECTIVES","key":"damageDealtToObjectives","format":"number"}]},{"name":"MATCH_HISTORY_STATS_TAB_DMG_TAKEN_HEALED","attributes":[{"name":"MATCH_HISTORY_STATS_ATTR_DMG_HEALED","key":"totalHeal","format":"number"},{"name":"MATCH_HISTORY_STATS_ATTR_TOTAL_HEAL_ON_TEAMMATES","key":"totalHealsOnTeammates","format":"number"},{"name":"MATCH_HISTORY_STATS_ATTR_TOTAL_DAMAGE_SHIELDED_ON_TEAMMATES","key":"totalDamageShieldedOnTeammates","format":"number"},{"name":"MATCH_HISTORY_STATS_ATTR_DMG_TAKEN_TOTAL","key":"totalDamageTaken","format":"number"},{"name":"MATCH_HISTORY_STATS_ATTR_DMG_TAKEN_PHYSICAL","key":"physicalDamageTaken","format":"number"},{"name":"MATCH_HISTORY_STATS_ATTR_DMG_TAKEN_MAGICAL","key":"magicalDamageTaken","format":"number"},{"name":"MATCH_HISTORY_STATS_ATTR_DMG_TAKEN_TRUE","key":"trueDamageTaken","format":"number"},{"name":"MATCH_HISTORY_STATS_ATTR_DMG_SELF_MITIGATED","key":"damageSelfMitigated","format":"number"}]},{"name":"MATCH_HISTORY_STATS_TAB_VISION","attributes":[{"name":"MATCH_HISTORY_STATS_ATTR_WARDS_VISION_SCORE","key":"visionScore"},{"name":"MATCH_HISTORY_STATS_ATTR_WARDS_PLACED","key":"wardsPlaced"},{"name":"MATCH_HISTORY_STATS_ATTR_WARDS_DESTROYED","key":"wardsKilled"},{"name":"MATCH_HISTORY_STATS_ATTR_WARDS_PURCHASED_VISION","key":"visionWardsBoughtInGame"}]},{"name":"MATCH_HISTORY_STATS_TAB_INCOME","attributes":[{"name":"MATCH_HISTORY_STATS_ATTR_GOLD_EARNED","key":"goldEarned","format":"number"},{"name":"MATCH_HISTORY_STATS_ATTR_GOLD_SPENT","key":"goldSpent","format":"number"},{"name":"MATCH_HISTORY_STATS_ATTR_KILLED_MINION","key":"totalMinionsKilled","format":"number"},{"name":"MATCH_HISTORY_STATS_ATTR_KILLED_NEUTRAL","key":"neutralMinionsKilled","hideOnMurderBridge":true},{"name":"MATCH_HISTORY_STATS_ATTR_KILLED_NEUTRAL_JUNGLE_TEAM","key":"neutralMinionsKilledTeamJungle","hideOnMurderBridge":true},{"name":"MATCH_HISTORY_STATS_ATTR_KILLED_NEUTRAL_JUNGLE_ENEMY","key":"neutralMinionsKilledEnemyJungle","hideOnMurderBridge":true}]},{"name":"MATCH_HISTORY_STATS_TAB_MISC","attributes":[{"name":"MATCH_HISTORY_STATS_ATTR_MISC_TOWERS_DESTROYED","key":"turretKills"},{"name":"MATCH_HISTORY_STATS_ATTR_MISC_INHIBITORS_DESTROYED","key":"inhibitorKills"}]}]',
        );
      },
      (t, e, a) => {
        "use strict";
        var n = a(1);
        a(141);
        var s = a(106);
        t.exports = n.Ember.Component.extend({
          layout: a(142),
          classNames: ["subteam-avatars-container"],
          participants: null,
          startingSubteamPlacement: 1,
          currentSummonerId: "",
          subteams: n.Ember.computed(
            "participants",
            "participants.[]",
            "currentSummonerId",
            function () {
              const t = [];
              let e = [],
                a = this.get("startingSubteamPlacement") || 1,
                n = !1;
              return (
                this.get("participants").forEach((l, i) => {
                  if (
                    (e.push(l),
                    l.summonerId === this.get("currentSummonerId") && (n = !0),
                    (i + 1) % s.CHERRY_SUBTEAM_SIZE == 0)
                  ) {
                    const i = s.CHERRY_SUBTEAM_DISPLAY_DATA.find(
                      (t) => t.subteamId === l.stats.playerSubteamId,
                    );
                    t.push({
                      placement: this.get(
                        `tra.MATCH_HISTORY_MODE_PLACEMENT_${a}`,
                      ),
                      subteamId: l.stats.playerSubteamId,
                      subteamIcon: i ? i.display.icon : "",
                      subteamGradient: i ? i.display.iconGradient : "",
                      isLocalSubteam: n,
                      participants: [...e],
                    }),
                      (e = []),
                      ++a,
                      (n = !1);
                  }
                }),
                t
              );
            },
          ),
          actions: {
            navigateSubteams: function (t) {
              this.sendAction("updateStartingSubteamPlacement", t);
            },
          },
        });
      },
      (t, e, a) => {
        "use strict";
        a.r(e);
      },
      (t, e, a) => {
        const n = a(1).Ember;
        t.exports = n.HTMLBars.template({
          id: "pvH1E+UV",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-match-history\\\\src\\\\components\\\\stats\\\\subteam-avatars-component\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-match-history\\\\src\\\\components\\\\stats\\\\subteam-avatars-component\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-match-history\\\\src\\\\components\\\\stats\\\\subteam-avatars-component\\\\index.js\\" "],["text","\\n"],["block",["each"],[["get",["subteams"]]],null,1],["open-element","div",[]],["static-attr","class","subteam-navigation-arrow subteam-navigation-left"],["dynamic-attr","onclick",["helper",["action"],[["get",[null]],"navigateSubteams",false],null],null],["flush-element"],["close-element"],["text","\\n"],["open-element","div",[]],["static-attr","class","subteam-navigation-arrow subteam-navigation-right"],["dynamic-attr","onclick",["helper",["action"],[["get",[null]],"navigateSubteams",true],null],null],["flush-element"],["close-element"],["text","\\n"],["open-element","div",[]],["static-attr","class","match_details_clearfix"],["flush-element"],["close-element"]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","      "],["append",["helper",["team-avatar"],null,[["champions","participant","participants","currentSummonerId","isHexakill"],[["get",["champions"]],["get",["participant"]],["get",["participants"]],["get",["currentSummonerId"]],false]]],false],["text","\\n"]],"locals":["participant"]},{"statements":[["text","  "],["open-element","div",[]],["dynamic-attr","class",["concat",["subteams-avatar-subteam-container ",["helper",["if"],[["get",["subteam","isLocalSubteam"]],"local-subteam"],null]]]],["flush-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","subteams-avatar-subteam-placement-container"],["flush-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","subteams-avatar-subteam-icon"],["dynamic-attr","style",["concat",["background-image: url(",["unknown",["subteam","subteamIcon"]],")"]]],["flush-element"],["close-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","subteams-avatar-subteam-gradient-overlay"],["dynamic-attr","style",["concat",["background: ",["unknown",["subteam","subteamGradient"]]]]],["flush-element"],["close-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","subteams-avatar-subteam-placement"],["flush-element"],["append",["unknown",["subteam","placement"]],false],["close-element"],["text","\\n    "],["close-element"],["text","\\n"],["block",["each"],[["get",["subteam","participants"]]],null,0],["text","  "],["close-element"],["text","\\n"]],"locals":["subteam"]}],"hasPartials":false}',
          meta: {},
        });
      },
      (t, e, a) => {
        "use strict";
        var n = a(1);
        a(144),
          (t.exports = n.Ember.Component.extend({
            layout: a(145),
            classNames: ["team-avatar-container"],
            classNameBindings: ["teamStyle"],
            teamId: null,
            participants: null,
            teamStyle: n.Ember.computed("isMyTeam", function () {
              return this.get("isMyTeam") ? "team_blue" : "team_red";
            }),
            isHexakill: n.Ember.computed("participants", function () {
              return 12 === this.get("participants").length;
            }),
            validParticipants: n.Ember.computed(
              "participants",
              "participants.[]",
              "teamId",
              function () {
                return n.Lodash.filter(this.get("participants"), {
                  teamId: this.get("teamId"),
                });
              },
            ),
          }));
      },
      (t, e, a) => {
        "use strict";
        a.r(e);
      },
      (t, e, a) => {
        const n = a(1).Ember;
        t.exports = n.HTMLBars.template({
          id: "jOYO0xZW",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-match-history\\\\src\\\\components\\\\stats\\\\team-avatars-component\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-match-history\\\\src\\\\components\\\\stats\\\\team-avatars-component\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-match-history\\\\src\\\\components\\\\stats\\\\team-avatars-component\\\\index.js\\" "],["text","\\n"],["block",["each"],[["get",["validParticipants"]]],null,0],["open-element","div",[]],["static-attr","class","match_details_clearfix"],["flush-element"],["close-element"],["text","\\n"]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","  "],["append",["helper",["team-avatar"],null,[["champions","participant","participants","currentSummonerId","isHexakill"],[["get",["champions"]],["get",["participant"]],["get",["participants"]],["get",["currentSummonerId"]],["get",["isHexakill"]]]]],false],["text","\\n"]],"locals":["participant"]}],"hasPartials":false}',
          meta: {},
        });
      },
      (t, e, a) => {
        "use strict";
        var n = a(1);
        t.exports = n.Ember.Component.extend({
          layout: a(147),
          classNames: ["team-avatar-wrapper"],
          classNameBindings: ["isCurrent:current", "isHexakill:hexakill"],
          currentSummonerId: null,
          participant: null,
          isHexakill: !1,
          summonerId: n.Ember.computed.alias("participant.summonerId"),
          currentParticipantIndex: n.Ember.computed(
            "participants",
            "participant",
            function () {
              return this.get("participants").indexOf(this.get("participant"));
            },
          ),
          avatarSrc: n.Ember.computed("participant.championId", function () {
            return this.get("champions").get(this.get("participant.championId"))
              .squarePortraitPath;
          }),
          mouseEnter: function () {
            const t = new Event("selectHoverColumnIndex", { bubbles: !0 });
            (t.columnIndex = this.get("currentParticipantIndex")),
              this.element.dispatchEvent(t);
          },
          mouseLeave: function () {
            const t = new Event("deselectHoverColumnIndex", { bubbles: !0 });
            (t.columnIndex = this.get("currentParticipantIndex")),
              this.element.dispatchEvent(t);
          },
          isCurrent: n.Ember.computed(
            "currentSummonerId",
            "summonerId",
            function () {
              return (
                !!this.get("currentSummonerId") &&
                this.get("currentSummonerId") === this.get("summonerId")
              );
            },
          ),
        });
      },
      (t, e, a) => {
        const n = a(1).Ember;
        t.exports = n.HTMLBars.template({
          id: "xlfWlExr",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-match-history\\\\src\\\\components\\\\stats\\\\team-avatar\\\\layout.hbs\\" style-path=\\"null\\" js-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-match-history\\\\src\\\\components\\\\stats\\\\team-avatar\\\\index.js\\" "],["text","\\n"],["open-element","div",[]],["dynamic-attr","class",["concat",["team-avatar-outer ",["helper",["if"],[["get",["isHexakill"]],"hexakill"],null]]]],["flush-element"],["text","\\n  "],["open-element","div",[]],["dynamic-attr","class",["concat",["team-avatar-border ",["helper",["if"],[["get",["isHexakill"]],"hexakill"],null]]]],["flush-element"],["close-element"],["text","\\n  "],["open-element","div",[]],["dynamic-attr","class",["concat",["team-avatar ",["helper",["if"],[["get",["isHexakill"]],"hexakill"],null]]]],["flush-element"],["text","\\n    "],["open-element","img",[]],["dynamic-attr","src",["concat",[["unknown",["avatarSrc"]]]]],["static-attr","alt",""],["dynamic-attr","class",["concat",["team-avatar-img ",["helper",["if"],[["get",["isHexakill"]],"hexakill"],null]]]],["flush-element"],["close-element"],["text","\\n  "],["close-element"],["text","\\n"],["close-element"],["text","\\n"]],"locals":[],"named":[],"yields":[],"blocks":[],"hasPartials":false}',
          meta: {},
        });
      },
      (t, e, a) => {
        "use strict";
        var n = a(1);
        a(149);
        var s = a(15);
        t.exports = n.Ember.Component.extend({
          layout: a(150),
          classNames: ["match-history-stats-wrapper"],
          classNameBindings: ["openStyle"],
          tab: null,
          participants: null,
          currentSummonerId: null,
          mapId: null,
          isOpen: !0,
          openStyle: n.Ember.computed("isOpen", function () {
            return this.get("isOpen") ? "open" : "";
          }),
          headerText: n.Ember.computed("tab.name", function () {
            return this.get("tra." + this.get("tab.name"));
          }),
          actions: {
            toggle: function () {
              s.SFX.genericClickSm.play(),
                this.set("isOpen", !this.get("isOpen"));
            },
          },
        });
      },
      (t, e, a) => {
        "use strict";
        a.r(e);
      },
      (t, e, a) => {
        const n = a(1).Ember;
        t.exports = n.HTMLBars.template({
          id: "R6Gnot+L",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-match-history\\\\src\\\\components\\\\stats\\\\stats-table-component\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-match-history\\\\src\\\\components\\\\stats\\\\stats-table-component\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-match-history\\\\src\\\\components\\\\stats\\\\stats-table-component\\\\index.js\\" "],["text","\\n"],["open-element","div",[]],["static-attr","class","match-history-stats-header"],["modifier",["action"],[["get",[null]],"toggle"]],["flush-element"],["append",["unknown",["headerText"]],false],["close-element"],["text","\\n"],["open-element","div",[]],["static-attr","class","match-history-stats-main"],["flush-element"],["text","\\n  "],["append",["helper",["stats-bg"],null,[["currentSummonerId","gameMode","players"],[["get",["currentSummonerId"]],["get",["gameMode"]],["get",["participants"]]]]],false],["text","\\n\\n  "],["open-element","table",[]],["static-attr","class","match-history-stats-tb"],["static-attr","border","0"],["static-attr","cellspacing","0"],["static-attr","cellpadding","0"],["static-attr","ondragstart","return false;"],["static-attr","ondrop","return false;"],["flush-element"],["text","\\n"],["block",["each"],[["get",["tab","attributes"]]],null,0],["text","  "],["close-element"],["text","\\n"],["close-element"],["text","\\n"]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","      "],["append",["helper",["stats-row"],null,[["attr","mapId","participants","currentSummonerId"],[["get",["attr"]],["get",["mapId"]],["get",["participants"]],["get",["currentSummonerId"]]]]],false],["text","\\n"]],"locals":["attr"]}],"hasPartials":false}',
          meta: {},
        });
      },
      (t, e, a) => {
        "use strict";
        var n = a(1),
          s = i(a(152)),
          l = i(a(10));
        function i(t) {
          return t && t.__esModule ? t : { default: t };
        }
        t.exports = n.Ember.Component.extend({
          tagName: "tr",
          attr: null,
          localizedRowName: n.Ember.computed("attr.name", function () {
            return this.get("tra." + this.get("attr.name"));
          }),
          layout: a(153),
          index: null,
          participants: null,
          cellContents: n.Ember.computed(
            "participants",
            "tra.metadata.locale.id",
            function () {
              const t = this.get("attr.key"),
                e = this.get("attr.format"),
                a = this.get("tra.metadata.locale.id"),
                n = this.get("currentSummonerId");
              return this.get("participants").map(function (i) {
                let o = i.stats[t],
                  r = !1;
                switch (e) {
                  case "concatKDA":
                    o = s.default.concatKDA(
                      i.stats[t[0]],
                      i.stats[t[1]],
                      i.stats[t[2]],
                    );
                    break;
                  case "firstBloodFormatter":
                    (o = s.default.firstBloodFormatter(i.stats[t])), (r = !0);
                    break;
                  case "number":
                    o = l.default.formatGold(i.stats[t], a);
                    break;
                  default:
                    o = i.stats[t];
                }
                return {
                  content: o,
                  currentStyle: n === i.summonerId && "current",
                  isFirstBlood: r,
                };
              });
            },
          ),
          isParticipantsPopulated: n.Ember.computed(
            "participants",
            function () {
              const t = this.get("participants");
              return !(!t || (Array.isArray(t) && !t[0]));
            },
          ),
          isAttrWithData: n.Ember.computed(
            "attr",
            "isParticipantsPopulated",
            function () {
              if (!this.get("isParticipantsPopulated")) return !1;
              const t = this.get("attr"),
                e = this.get("participants");
              if (t && Array.isArray(t.key))
                t.key.forEach(function (t) {
                  if (void 0 === e[0].stats[t]) return !1;
                });
              else if (t && void 0 === e[0].stats[t.key]) return !1;
              return !0;
            },
          ),
          showStat: n.Ember.computed(
            "attr.hideOnMurderBridge",
            "mapId",
            function () {
              const t = this.get("mapId"),
                e = this.get("attr.hideOnMurderBridge");
              return void 0 === e || (!0 === e && 12 !== t && 14 !== t);
            },
          ),
          isVisible: n.Ember.computed.and("isAttrWithData", "showStat"),
          isHexakill: n.Ember.computed("participants", function () {
            return 12 === this.get("participants").length;
          }),
          actions: {
            columnHovered: function (t) {
              const e = new Event("selectHoverColumnIndex", { bubbles: !0 });
              (e.columnIndex = t), this.element.dispatchEvent(e);
            },
            columnLoseHover: function (t) {
              const e = new Event("deselectHoverColumnIndex", { bubbles: !0 });
              (e.columnIndex = t), this.element.dispatchEvent(e);
            },
          },
        });
      },
      (t, e) => {
        "use strict";
        Object.defineProperty(e, "__esModule", { value: !0 }),
          (e.default = void 0);
        e.default = {
          concatKDA: function (t, e, a) {
            return t + "/" + e + "/" + a;
          },
          firstBloodFormatter: function (t) {
            return t ? "yes" : "no";
          },
        };
      },
      (t, e, a) => {
        const n = a(1).Ember;
        t.exports = n.HTMLBars.template({
          id: "0seJZDa1",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-match-history\\\\src\\\\components\\\\stats\\\\stats-row\\\\layout.hbs\\" style-path=\\"null\\" js-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-match-history\\\\src\\\\components\\\\stats\\\\stats-row\\\\index.js\\" "],["text","\\n"],["block",["if"],[["get",["isVisible"]]],null,3]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","        "],["append",["unknown",["cellContent","content"]],false],["text","\\n"]],"locals":[]},{"statements":[["text","        "],["open-element","span",[]],["dynamic-attr","class",["concat",["stats-",["unknown",["cellContent","content"]]]]],["flush-element"],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","    "],["open-element","td",[]],["dynamic-attr","class",["concat",["stats-td-normal ",["helper",["if"],[["get",["isHexakill"]],"hexakill"],null]," ",["unknown",["cellContent","currentStyle"]]]]],["modifier",["action"],[["get",[null]],"columnHovered",["get",["index"]]],[["on"],["mouseEnter"]]],["modifier",["action"],[["get",[null]],"columnLoseHover",["get",["index"]]],[["on"],["mouseLeave"]]],["flush-element"],["text","\\n"],["block",["if"],[["get",["cellContent","isFirstBlood"]]],null,1,0],["text","    "],["close-element"],["text","\\n"]],"locals":["cellContent","index"]},{"statements":[["text","  "],["open-element","td",[]],["static-attr","class","stats-td-normal stats-td-column-header"],["flush-element"],["append",["unknown",["localizedRowName"]],false],["close-element"],["text","\\n"],["block",["each"],[["get",["cellContents"]]],null,2]],"locals":[]}],"hasPartials":false}',
          meta: {},
        });
      },
      (t, e, a) => {
        "use strict";
        var n = a(1);
        a(155);
        var s = a(106);
        t.exports = n.Ember.Component.extend({
          layout: a(156),
          classNames: ["match-history-stats-bg"],
          isHexakill: n.Ember.computed("players", function () {
            return 12 === this.get("players").length;
          }),
          statsCurrentParticipant: n.Ember.computed(
            "players",
            "currentSummonerId",
            function () {
              const t = this.get("players"),
                e = this.get("currentSummonerId");
              if (t) {
                const a = t.find(function (t) {
                  return t.summonerId === e;
                });
                return a || t[0];
              }
            },
          ),
          myTeamId: n.Ember.computed.alias("statsCurrentParticipant.teamId"),
          columnContents: n.Ember.computed(
            "players",
            "myTeamId",
            "currentSummonerId",
            "gameMode",
            function () {
              const t = this.get("isHexakill");
              if (this.get("gameMode") === s.CHERRY_GAME_MODE)
                return this._calculateCherryColumnContents();
              const e = this.get("myTeamId");
              return this.get("players").map(function (a) {
                return {
                  team: a.teamId === e ? "team_blue" : "team_red",
                  isHexakill: t,
                };
              });
            },
          ),
          _calculateCherryColumnContents() {
            const t = this.get("currentSummonerId"),
              e = this.get("players").find((e) => e.summonerId === t),
              a = e ? e.stats.playerSubteamId : null;
            return this.get("players").map(function (t) {
              return {
                team: t.stats.playerSubteamId === a ? "team_blue" : "team_red",
                isHexakill: !1,
              };
            });
          },
          players: null,
        });
      },
      (t, e, a) => {
        "use strict";
        a.r(e);
      },
      (t, e, a) => {
        const n = a(1).Ember;
        t.exports = n.HTMLBars.template({
          id: "V+OrwkUC",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-match-history\\\\src\\\\components\\\\stats\\\\stats-bg\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-match-history\\\\src\\\\components\\\\stats\\\\stats-bg\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-match-history\\\\src\\\\components\\\\stats\\\\stats-bg\\\\index.js\\" "],["text","\\n"],["block",["each"],[["get",["columnContents"]]],null,0]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","  "],["open-element","div",[]],["dynamic-attr","class",["concat",["match-history-stats-bg-column ",["unknown",["column","team"]]," ",["helper",["if"],[["get",["column","isHexakill"]],"hexakill"],null]]]],["flush-element"],["close-element"],["text","\\n"]],"locals":["column"]}],"hasPartials":false}',
          meta: {},
        });
      },
      (t, e, a) => {
        "use strict";
        var n = a(1);
        a(158),
          (t.exports = n.Ember.Component.extend({
            classNames: ["match-details-graph-component"],
            layout: a(159),
            selectedAttributes: n.Ember.A([]),
            gameMode: n.Ember.computed.alias("gameData.gameMode"),
            mapId: n.Ember.computed.alias("gameData.mapId"),
            removeAnimationWhenDone: n.Ember.on(
              "didInsertElement",
              function () {
                const t = n.Ember.$(this.element).find(
                  ".match-graph-container",
                )[0];
                t.addEventListener("webkitAnimationEnd", function (e) {
                  e.target === t &&
                    "fade-in" === e.animationName &&
                    t.classList.remove("match-details-loading-fade-in");
                });
              },
            ),
          }));
      },
      (t, e, a) => {
        "use strict";
        a.r(e);
      },
      (t, e, a) => {
        const n = a(1).Ember;
        t.exports = n.HTMLBars.template({
          id: "jDPUQRb5",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-match-history\\\\src\\\\components\\\\graph\\\\match-details-graph-component\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-match-history\\\\src\\\\components\\\\graph\\\\match-details-graph-component\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-match-history\\\\src\\\\components\\\\graph\\\\match-details-graph-component\\\\index.js\\" "],["text","\\n"],["open-element","div",[]],["dynamic-attr","class",["concat",["match-graph-container ",["helper",["if"],[["get",["isTransitioning"]],"match-details-loading-hide","match-details-loading-fade-in"],null]]]],["flush-element"],["text","\\n  "],["append",["helper",["graph-categories"],null,[["selectedAttributes","mapId"],[["get",["selectedAttributes"]],["get",["mapId"]]]]],false],["text","\\n  "],["append",["helper",["graph-display"],null,[["selectedAttributes","gameMode"],[["get",["selectedAttributes"]],["get",["gameMode"]]]]],false],["text","\\n"],["close-element"],["text","\\n"]],"locals":[],"named":[],"yields":[],"blocks":[],"hasPartials":false}',
          meta: {},
        });
      },
      (t, e, a) => {
        "use strict";
        var n = a(1);
        a(161);
        const s = a(162);
        t.exports = n.Ember.Component.extend({
          classNames: ["match-graph-categories"],
          layout: a(163),
          selectedAttributes: n.Ember.A([]),
          stats: n.Ember.inject.service(),
          mapId: null,
          statsCategories: n.Ember.computed(
            "tra.metadata",
            "stats.participants",
            "mapId",
            function () {
              const t = s,
                e = n.Ember.A([]),
                a = this.get("mapId");
              return (
                t.forEach((t) => {
                  const s = n.Ember.Object.create();
                  s.set("name", t.name),
                    s.set("selected", !1),
                    s.set("attributes", n.Ember.A([])),
                    s.set("locString", this.get(`tra.${t.name}`)),
                    t.attributes.forEach((t) => {
                      const e = n.Ember.Object.create();
                      e.set("name", t.name),
                        e.set("key", t.key),
                        e.set("locString", this.get(`tra.${t.name}`)),
                        e.set("selected", !1),
                        e.set("disabled", !1);
                      const l = t.hideOnMurderBridge;
                      (void 0 === l || (!0 === l && 12 !== a && 14 !== a)) &&
                        void 0 !==
                          this.get(`stats.participants.0.stats.${t.key}`) &&
                        s.attributes.push(e);
                    }),
                    e.push(s);
                }),
                e
              );
            },
          ),
          selectFirstCategory: n.Ember.on(
            "didInsertElement",
            n.Ember.observer("stats.participants", function () {
              this.get("statsCategories.0.attributes.0") &&
                (this.set("statsCategories.0.attributes.0.selected", !0),
                this.send(
                  "selectAttribute",
                  this.get("statsCategories.0.attributes.0"),
                ));
            }),
          ),
          _setSelectedAttributes: function () {
            const t = this.get("statsCategories"),
              e = n.Ember.A([]);
            t.forEach(function (t) {
              t.get("attributes").forEach(function (t) {
                t.get("selected") && e.push(t);
              });
            }),
              this.set("selectedAttributes", e);
          },
          _setDisableValues: function () {
            let t = 0;
            const e = this.get("statsCategories");
            e.forEach(function (e) {
              e.attributes.forEach(function (e) {
                e.get("selected") && t++;
              });
            }),
              e.forEach(function (e) {
                e.attributes.forEach(function (e) {
                  const a = t >= 6;
                  !e.get("selected") && a
                    ? e.set("disabled", !0)
                    : e.set("disabled", !1);
                });
              });
          },
          actions: {
            selectCategory: function (t) {
              const e = this.get("statsCategories");
              t.selected
                ? e.forEach(function (e) {
                    e.name === t.name
                      ? (e.set("selected", !0),
                        e.attributes.forEach(function (t) {
                          t.set("selected", !0);
                        }))
                      : (e.set("selected", !1),
                        e.attributes.forEach(function (t) {
                          t.set("selected", !1);
                        }));
                  })
                : e.forEach(function (e) {
                    e.name === t.name &&
                      (e.set("selected", !1),
                      e.attributes.forEach(function (t) {
                        t.set("selected", !1), t.set("disabled", !1);
                      }));
                  }),
                this._setDisableValues(),
                this._setSelectedAttributes();
            },
            selectAttribute: function (t) {
              this.get("statsCategories").forEach(function (e) {
                let a = 0;
                e.attributes.forEach(function (n) {
                  n.name === t.get("name") &&
                    t.get("selected") &&
                    e.set("selected", !0),
                    n.get("selected") && a++;
                }),
                  0 === a && e.set("selected", !1);
              }),
                this._setDisableValues(),
                this._setSelectedAttributes();
            },
          },
        });
      },
      (t, e, a) => {
        "use strict";
        a.r(e);
      },
      (t) => {
        "use strict";
        t.exports = JSON.parse(
          '[{"name":"MATCH_HISTORY_GRAPH_TAB_DAMAGE_DEALT_CHAMPIONS","attributes":[{"name":"MATCH_HISTORY_GRAPH_ATTR_DMG_CHAMPION_TOTAL","key":"totalDamageDealtToChampions"},{"name":"MATCH_HISTORY_GRAPH_ATTR_DMG_CHAMPION_PHYSICAL","key":"physicalDamageDealtToChampions"},{"name":"MATCH_HISTORY_GRAPH_ATTR_DMG_CHAMPION_MAGICAL","key":"magicDamageDealtToChampions"},{"name":"MATCH_HISTORY_GRAPH_ATTR_DMG_CHAMPION_TRUE","key":"trueDamageDealtToChampions"}]},{"name":"MATCH_HISTORY_GRAPH_TAB_TOTAL_DAMAGE_DEALT","attributes":[{"name":"MATCH_HISTORY_GRAPH_ATTR_DMG_DEALT_TOTAL_PHYSICAL","key":"physicalDamageDealt"},{"name":"MATCH_HISTORY_GRAPH_ATTR_DMG_DEALT_TOTAL_MAGICAL","key":"magicDamageDealt"},{"name":"MATCH_HISTORY_GRAPH_ATTR_DMG_DEALT_TOTAL_TRUE","key":"trueDamageDealt"},{"name":"MATCH_HISTORY_GRAPH_ATTR_DMG_DEALT_TOTAL_TURRET","key":"damageDealtToTurrets"},{"name":"MATCH_HISTORY_GRAPH_ATTR_DMG_DEALT_TOTAL_OBJECTIVES","key":"damageDealtToObjectives"}]},{"name":"MATCH_HISTORY_GRAPH_TAB_DAMAGE_TAKEN_HEALED","attributes":[{"name":"MATCH_HISTORY_GRAPH_ATTR_DMG_HEALED","key":"totalHeal"},{"name":"MATCH_HISTORY_STATS_ATTR_TOTAL_HEAL_ON_TEAMMATES","key":"totalHealsOnTeammates","format":"number"},{"name":"MATCH_HISTORY_STATS_ATTR_TOTAL_DAMAGE_SHIELDED_ON_TEAMMATES","key":"totalDamageShieldedOnTeammates","format":"number"},{"name":"MATCH_HISTORY_GRAPH_ATTR_DMG_TAKEN_TOTAL","key":"totalDamageTaken"},{"name":"MATCH_HISTORY_GRAPH_ATTR_DMG_TAKEN_PHYSICAL","key":"physicalDamageTaken"},{"name":"MATCH_HISTORY_GRAPH_ATTR_DMG_TAKEN_MAGICAL","key":"magicalDamageTaken"},{"name":"MATCH_HISTORY_GRAPH_ATTR_DMG_TAKEN_TRUE","key":"trueDamageTaken"},{"name":"MATCH_HISTORY_GRAPH_ATTR_DMG_SELF_MITIGATED","key":"damageSelfMitigated"}]},{"name":"MATCH_HISTORY_GRAPH_TAB_INCOME","attributes":[{"name":"MATCH_HISTORY_GRAPH_ATTR_GOLD_EARNED","key":"goldEarned"},{"name":"MATCH_HISTORY_GRAPH_ATTR_GOLD_SPENT","key":"goldSpent"}]},{"name":"MATCH_HISTORY_GRAPH_TAB_VISION","attributes":[{"name":"MATCH_HISTORY_GRAPH_ATTR_WARDS_VISION_SCORE","key":"visionScore"},{"name":"MATCH_HISTORY_GRAPH_ATTR_WARDS_PLACED","key":"wardsPlaced"},{"name":"MATCH_HISTORY_GRAPH_ATTR_WARDS_DESTROYED","key":"wardsKilled"},{"name":"MATCH_HISTORY_GRAPH_ATTR_WARDS_PURCHASED_VISION","key":"visionWardsBoughtInGame"}]},{"name":"MATCH_HISTORY_GRAPH_TAB_MONSTERS_MINIONS","attributes":[{"name":"MATCH_HISTORY_GRAPH_ATTR_KILLED_MINION","key":"totalMinionsKilled"},{"name":"MATCH_HISTORY_GRAPH_ATTR_KILLED_NEUTRAL","key":"neutralMinionsKilled","hideOnMurderBridge":true},{"name":"MATCH_HISTORY_GRAPH_ATTR_KILLED_NEUTRAL_JUNGLE_TEAM","key":"neutralMinionsKilledTeamJungle","hideOnMurderBridge":true},{"name":"MATCH_HISTORY_GRAPH_ATTR_KILLED_NEUTRAL_JUNGLE_ENEMY","key":"neutralMinionsKilledEnemyJungle","hideOnMurderBridge":true}]}]',
        );
      },
      (t, e, a) => {
        const n = a(1).Ember;
        t.exports = n.HTMLBars.template({
          id: "7ZBaX4gU",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-match-history\\\\src\\\\components\\\\graph\\\\graph-categories\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-match-history\\\\src\\\\components\\\\graph\\\\graph-categories\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-match-history\\\\src\\\\components\\\\graph\\\\graph-categories\\\\index.js\\" "],["text","\\n"],["open-element","lol-uikit-scrollable",[]],["static-attr","class","match-graph-categories-scrollbar"],["static-attr","overflow-masks","enabled"],["flush-element"],["text","\\n"],["block",["each"],[["get",["statsCategories"]]],null,1],["close-element"],["text","\\n"]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","          "],["open-element","div",[]],["static-attr","class","match-graph-category-attribute"],["flush-element"],["text","\\n            "],["open-element","lol-uikit-flat-checkbox",[]],["dynamic-attr","class",["concat",["match-graph-attribute-checkbox ",["unknown",["statAttribute","name"]]]]],["modifier",["action"],[["get",[null]],"selectAttribute",["get",["statAttribute"]]]],["flush-element"],["text","\\n              "],["append",["helper",["input"],null,[["slot","class","type","id","checked","disabled","name"],["input","match-history-category-attribute-checkbox","checkbox",["get",["statAttribute","name"]],["get",["statAttribute","selected"]],["get",["statAttribute","disabled"]],["get",["statAttribute","name"]]]]],false],["text","\\n              "],["open-element","label",[]],["static-attr","slot","label"],["static-attr","class","match-history-category-label"],["dynamic-attr","for",["concat",[["unknown",["statAttribute","name"]]]]],["flush-element"],["text","\\n                "],["open-element","span",[]],["static-attr","class","flat-checkbox-span"],["flush-element"],["close-element"],["text","\\n                "],["append",["unknown",["statAttribute","locString"]],false],["text","\\n              "],["close-element"],["text","\\n            "],["close-element"],["text","\\n          "],["close-element"],["text","\\n"]],"locals":["statAttribute"]},{"statements":[["text","    "],["open-element","div",[]],["static-attr","class","match-graph-category"],["flush-element"],["text","\\n      "],["open-element","lol-uikit-flat-checkbox",[]],["dynamic-attr","class",["concat",["match-graph-category-checkbox ",["unknown",["statCategory","name"]]]]],["dynamic-attr","disabled",["unknown",["statCategory","disabled"]],null],["modifier",["action"],[["get",[null]],"selectCategory",["get",["statCategory"]]]],["flush-element"],["text","\\n        "],["append",["helper",["input"],null,[["slot","class","type","id","checked","name"],["input","match-history-category-checkbox","checkbox",["get",["statCategory","name"]],["get",["statCategory","selected"]],["get",["statCategory","name"]]]]],false],["text","\\n        "],["open-element","label",[]],["static-attr","slot","label"],["static-attr","class","match-history-category-label"],["dynamic-attr","for",["concat",[["unknown",["statCategory","name"]]]]],["flush-element"],["text","\\n          "],["open-element","span",[]],["static-attr","class","flat-checkbox-span"],["flush-element"],["close-element"],["text","\\n          "],["append",["unknown",["statCategory","locString"]],false],["text","\\n        "],["close-element"],["text","\\n      "],["close-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","match-graph-category-attributes"],["flush-element"],["text","\\n"],["block",["each"],[["get",["statCategory","attributes"]]],null,0],["text","      "],["close-element"],["text","\\n    "],["close-element"],["text","\\n"]],"locals":["statCategory"]}],"hasPartials":false}',
          meta: {},
        });
      },
      (t, e, a) => {
        "use strict";
        var n = a(1);
        a(165);
        var s = a(5),
          l = a(106);
        const i = 16,
          o = "legs",
          r = "blue";
        t.exports = n.Ember.Component.extend({
          classNames: ["match-graph-display"],
          classNameBindings: [
            "graphIsScrollable:match-graph-display-scrollable",
          ],
          layout: a(166),
          stats: n.Ember.inject.service(),
          graphIsScrollable: n.Ember.computed(
            "stats.participants",
            function () {
              return (
                this.get("stats.participants.length") > 10 &&
                this.get("gameMode") === l.CHERRY_GAME_MODE
              );
            },
          ),
          graphData: n.Ember.computed(
            "selectedAttributes",
            "stats.participants",
            "stats.currentSummonerId",
            function () {
              const t = this.get("selectedAttributes"),
                e = this.get("stats.currentSummonerId"),
                a = this.get("stats.participants"),
                n = this.get("gameMode"),
                s = [];
              let i = 1,
                o = !1;
              return a && 0 !== a.length
                ? (a.forEach(function (a) {
                    const r = {},
                      c = a.summonerId === e;
                    c && (o = !0),
                      (r.isCurrent = c),
                      (r.isLocalPlayer = c),
                      (r.teamId = a.teamId),
                      (r.championId = a.championId),
                      (r.graphYAxisIndex = i++),
                      (r.stats = []),
                      n === l.CHERRY_GAME_MODE &&
                        ((r.subteamId = a.stats.playerSubteamId || 0),
                        (r.subteamStanding = a.stats.subteamPlacement || 0)),
                      t.forEach(function (t) {
                        const e = {};
                        (e.id = t.key),
                          (e.value = a.stats[t.key]),
                          (e.name = t.locString),
                          (e.teamId = a.teamId),
                          r.stats.push(e);
                      }),
                      s.push(r);
                  }),
                  o || (s[0].isCurrent = !0),
                  this._applyTeamColors(s))
                : s;
            },
          ),
          fetchChampionData: n.Ember.on("didInsertElement", function () {
            s.champions.then((t) => this.set("championData", t));
          }),
          generateRerenderGraphData: n.Ember.on(
            "didInsertElement",
            n.Ember.observer("graphData", "championData", function () {
              this.get("graphData.length") &&
                this.get("championData") &&
                (this.get("isInitialGraphRendered") ||
                  (this.renderInitialGraph(),
                  this.set("isInitialGraphRendered", !0)),
                this.rerenderGraph());
            }),
          ),
          renderInitialGraph: function () {
            const t = this.get("graphData");
            let e = this.get("stats.dataSource") === o ? 500 : 570;
            this.get("gameMode") === l.CHERRY_GAME_MODE && (e = 800);
            const a = 20,
              s = 20,
              r = 20,
              c = 50,
              m = 700 - c - s,
              p = e - a - r,
              d = n.d3.scale.linear().range([0, m]);
            let u = p;
            this.get("gameMode") === l.CHERRY_GAME_MODE &&
              (u = p - i * (l.CHERRY_SUBTEAM_DISPLAY_DATA.length - 1));
            const h = n.d3.scale.ordinal().rangeBands([0, u], 0.4),
              g = n.d3.scale.ordinal(),
              f = n.d3.svg
                .axis()
                .scale(d)
                .orient("bottom")
                .tickFormat(n.d3.format("d"))
                .innerTickSize(-p)
                .outerTickSize(0),
              _ = n.d3.svg.axis().scale(h).orient("left"),
              y = n.d3
                .select(".match-graph-display .match-main-graph")
                .append("svg")
                .attr("width", m + c + s)
                .attr("height", p + a + r),
              T = y
                .append("g")
                .attr("transform", "translate(" + c + "," + a + ")");
            d.domain([0, 0]),
              h.domain(
                t.map(function (t) {
                  return t.graphYAxisIndex;
                }),
              ),
              this._appendAxis(f, _, T, p),
              this._initialAvatarsRender(t, y, h),
              this.set("x", d),
              this.set("y0", h),
              this.set("y1", g),
              this.set("xAxis", f),
              this.set("yAxis", _),
              this.set("svg", T);
          },
          rerenderGraph: function () {
            const t = this.get("graphData"),
              e = this.get("x"),
              a = this.get("y0"),
              s = this.get("y1"),
              l = this.get("svg"),
              i = this.get("xAxis"),
              o = this._getStatsIds(t);
            e.domain([
              0,
              n.d3.max(t, function (t) {
                return n.d3.max(t.stats, function (t) {
                  return t.value;
                });
              }),
            ]),
              s.domain(o).rangeRoundBands([0, a.rangeBand()]),
              l.selectAll(".match-graph-x-axis").call(i);
            const r = l.selectAll(".match-graph-champion").data(t);
            this._renderChampions(r);
            const c = r.selectAll("rect").data(function (t) {
              return t.stats;
            });
            this._renderStats(c, o), this._applyTooltips(c, o);
          },
          _renderChampions: function (t) {
            const e = this.get("y0"),
              a = this.get("gameMode"),
              n = t.enter().append("g").attr("class", "match-graph-champion");
            if (a === l.CHERRY_GAME_MODE) {
              const t =
                (this.get("graphData").find((t) => t.isLocalPlayer) || {})
                  .subteamStanding || 1;
              n.attr("transform", function (a) {
                let n = 0;
                a.subteamStanding > t
                  ? (n = (a.subteamStanding - 1) * i)
                  : a.subteamStanding < t && (n = a.subteamStanding * i);
                return `translate(0, ${e(a.graphYAxisIndex) + n - 8})`;
              });
            } else
              n.attr("transform", function (t) {
                const a = t.teamColor === r ? 0 : i;
                return `translate(0, ${e(t.graphYAxisIndex) + a - 8})`;
              });
          },
          _renderStats: function (t, e) {
            const a = n.d3.scale
                .ordinal()
                .range(["#1ba9bd", "#098c9e", "#06535d", "#04434a"]),
              s = n.d3.scale
                .ordinal()
                .range(["#ec2040", "#be1e37", "#8c1728", "#721220"]),
              l = this.get("y1"),
              i = this.get("x");
            t.enter().append("rect").attr("width", 0),
              t
                .attr("x", 1)
                .attr("id", function (t) {
                  return t.id;
                })
                .attr("class", function (t) {
                  return `match-graph-stat-bar ${t.id}`;
                })
                .attr("data-value", function (t) {
                  return t.value;
                })
                .style("fill", function (t, e) {
                  return t.teamColor === r ? a(e) : s(e);
                })
                .transition()
                .attr("y", function (t, a) {
                  const n = e.length > 1 ? 4 * a - 2 * e.length : 0,
                    s = l(e[a]) + n,
                    i = Math.round(l.rangeBand() / 2 - 15);
                  return l.rangeBand() > 30 ? s + i : s;
                })
                .attr("height", function () {
                  const t = l.rangeBand();
                  return t > 30 ? 30 : t;
                })
                .attr("width", function (t) {
                  return i(t.value);
                }),
              t.exit().transition().attr("width", 0).remove();
          },
          _applyTooltips: function (t) {
            t.on("mouseover", (t) => {
              this.$(`.${t.id}`).each((e, a) => {
                const n = this.get("stats.dataSource") === o ? 218 : 137,
                  s = this.$(a).offset(),
                  l = this.$(".match-main-graph-scrollable-wrapper"),
                  i = Math.abs(a.getAttribute("width")),
                  r = Math.abs(a.getAttribute("height")),
                  c = Math.abs(s.left) - 244 + i,
                  m = Math.abs(s.top) - n + r / 2 - 4 + l.scrollTop(),
                  p = a.getAttribute("data-value");
                this.$(".match-main-graph").append(
                  `\n          <div class="math-graph-tooltip ${t.id}-tooltip"\n            style="left: ${c}px; top: ${m}px;">\n            ${p}\n          </div>\n        `,
                );
              }),
                this.$(this.element).append(
                  `\n        <div class="match-main-graph-tooltip-hint">\n          ${t.name}\n        </div>\n      `,
                );
            }),
              t.on("mouseout", (t) => {
                this.$(`.${t.id}-tooltip`).remove(),
                  this.$(".match-main-graph-tooltip-hint").remove();
              });
          },
          _applyTeamColors: function (t) {
            const e = this.get("gameMode"),
              a = t.find((t) => t.isCurrent),
              n = [],
              s = [];
            return (
              a &&
                ((a.teamColor = r),
                a.stats.forEach((t) => (t.teamColor = r)),
                n.push(a)),
              t.forEach(function (t) {
                let i = t.teamId === a.teamId;
                e === l.CHERRY_GAME_MODE && (i = t.subteamId === a.subteamId),
                  i && !t.isCurrent
                    ? ((t.teamColor = r),
                      t.stats.forEach((t) => (t.teamColor = r)),
                      n.push(t))
                    : t.isCurrent ||
                      ((t.teamColor = "red"),
                      t.stats.forEach((t) => (t.teamColor = "red")),
                      s.push(t));
              }),
              e === l.CHERRY_GAME_MODE &&
                s.sort((t, e) => t.subteamStanding - e.subteamStanding),
              n.concat(s)
            );
          },
          _appendAxis(t, e, a, n) {
            a
              .append("g")
              .attr("class", "match-graph-axis match-graph-x-axis")
              .attr("transform", "translate(0," + n + ")")
              .classed("grid", !0)
              .call(t),
              a
                .append("g")
                .attr("class", "match-graph-axis match-graph-y-axis")
                .call(e);
          },
          _initialAvatarsRender: function (t, e, a) {
            e.select(".match-graph-y-axis").selectAll("text").remove(),
              e
                .append("clipPath")
                .attr("id", "avatar-clip")
                .append("circle")
                .attr("cx", 21)
                .attr("cy", 20)
                .attr("r", 13);
            const n = e
              .selectAll(".match-graph-y-axis")
              .selectAll(".tick")
              .data(t)
              .attr("class", function (t) {
                const e = t.isLocalPlayer ? "local-player" : "";
                return `tick team-${t.teamColor} ${e}`;
              });
            if (this.get("gameMode") === l.CHERRY_GAME_MODE) {
              const t =
                (this.get("graphData").find((t) => t.isLocalPlayer) || {})
                  .subteamStanding || 1;
              n.attr("transform", function (e) {
                let n = 0;
                e.subteamStanding > t
                  ? (n = (e.subteamStanding - 1) * i)
                  : e.subteamStanding < t && (n = e.subteamStanding * i);
                return `translate(0, ${a(e.graphYAxisIndex) + n - 8 + a.rangeBand() / 2 - 15})`;
              });
            } else
              n.attr("transform", function (t) {
                const e = t.teamColor === r ? 0 : i;
                return `translate(0, ${a(t.graphYAxisIndex) + e - 8 + a.rangeBand() / 2 - 15})`;
              });
            n.append("circle").attr("class", "avatar-border");
            const s = this.get("championData");
            n.append("svg:image")
              .attr("class", "avatar")
              .attr("xlink:href", function (t) {
                return s.get(t.championId).squarePortraitPath;
              })
              .attr("clip-path", "url(#avatar-clip)");
          },
          _getStatsIds: function (t) {
            return t[0].stats.map(function (t) {
              return t.id;
            });
          },
        });
      },
      (t, e, a) => {
        "use strict";
        a.r(e);
      },
      (t, e, a) => {
        const n = a(1).Ember;
        t.exports = n.HTMLBars.template({
          id: "whZr28TG",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-match-history\\\\src\\\\components\\\\graph\\\\graph-display\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-match-history\\\\src\\\\components\\\\graph\\\\graph-display\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-match-history\\\\src\\\\components\\\\graph\\\\graph-display\\\\index.js\\" "],["text","\\n"],["open-element","lol-uikit-scrollable",[]],["static-attr","class","match-main-graph-scrollable-wrapper"],["dynamic-attr","overflow-masks",["concat",[["helper",["if"],[["get",["graphIsScrollable"]],"enabled"],null]]]],["flush-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","match-main-graph"],["flush-element"],["close-element"],["text","\\n"],["close-element"],["text","\\n"]],"locals":[],"named":[],"yields":[],"blocks":[],"hasPartials":false}',
          meta: {},
        });
      },
      (t, e, a) => {
        "use strict";
        var n = a(1);
        a(168);
        t.exports = n.Ember.Component.extend({
          classNames: ["match-details-runes-component"],
          layout: a(169),
          selectedAttributes: n.Ember.A([]),
          stats: n.Ember.inject.service(),
          statsCurrentParticipant: n.Ember.computed(
            "stats.participants",
            "stats.currentSummonerId",
            "currentParticipant.summonerId",
            function () {
              const t = this.get("stats.participants"),
                e = this.get("currentParticipant"),
                a = this.get("stats.currentSummonerId");
              if (void 0 !== e.stats) return e;
              if (t) {
                const e = t.find(function (t) {
                  return t.summonerId === a;
                });
                return e || t[0];
              }
            },
          ),
          playerStats: n.Ember.computed.readOnly(
            "statsCurrentParticipant.stats",
          ),
          runesPrimaryStyle: n.Ember.computed(
            "playerStats.perkPrimaryStyle",
            "runesStyles",
            function () {
              const t = this.get("playerStats.perkPrimaryStyle");
              return (this.get("runesStyles") || n.Ember.Map.create()).get(t);
            },
          ),
          runesSubStyle: n.Ember.computed(
            "playerStats.perkSubStyle",
            "runesStyles",
            function () {
              const t = this.get("playerStats.perkSubStyle");
              return (this.get("runesStyles") || n.Ember.Map.create()).get(t);
            },
          ),
          runesStats: n.Ember.computed("playerStats", "runes", function () {
            const t = this.get("playerStats"),
              e = this.get("runes");
            if (!t || !e) return [];
            const a = [];
            for (let n = 0; n < 6; n++) {
              const s = {},
                l = "perk" + n,
                i = t[l],
                o = e.get(i);
              if (o) {
                (s.rune = o), (s.vars = []);
                for (let e = 0; e < 3; e++) {
                  const a = l + "Var" + (e + 1);
                  s.vars.push(t[a]);
                }
                a.push(s);
              }
            }
            return a;
          }),
        });
      },
      (t, e, a) => {
        "use strict";
        a.r(e);
      },
      (t, e, a) => {
        const n = a(1).Ember;
        t.exports = n.HTMLBars.template({
          id: "TBvQHv/T",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-match-history\\\\src\\\\components\\\\runes\\\\match-details-runes-component\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-match-history\\\\src\\\\components\\\\runes\\\\match-details-runes-component\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-match-history\\\\src\\\\components\\\\runes\\\\match-details-runes-component\\\\index.js\\" "],["text","\\n"],["open-element","div",[]],["dynamic-attr","class",["concat",["match-runes-container ",["helper",["if"],[["get",["isTransitioning"]],"match-details-loading-hide","match-details-loading-fade-in"],null]]]],["flush-element"],["text","\\n"],["text","  "],["append",["helper",["runes-player-stats"],null,[["participant","currentParticipant","champions","items","runes","spells","runesPrimaryStyle","runesSubStyle"],[["get",["statsCurrentParticipant"]],["get",["currentParticipant"]],["get",["champions"]],["get",["items"]],["get",["runes"]],["get",["spells"]],["get",["runesPrimaryStyle"]],["get",["runesSubStyle"]]]]],false],["text","\\n\\n"],["block",["each"],[["get",["runesStats"]]],null,0],["close-element"],["text","\\n"]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","    "],["append",["helper",["runes-rune-stats"],null,[["stats","index"],[["get",["stats"]],["get",["index"]]]]],false],["text","\\n"]],"locals":["stats","index"]}],"hasPartials":false}',
          meta: {},
        });
      },
      (t, e, a) => {
        "use strict";
        var n = a(1);
        a(171);
        const s = '<span class="statvalue">#</span>';
        t.exports = n.Ember.Component.extend({
          layout: a(172),
          classNames: ["match-history-runes-wrapper"],
          classNameBindings: ["isKeystone:keystone"],
          stats: {},
          isKeystone: n.Ember.computed.not("index"),
          runeName: n.Ember.computed.alias("stats.rune.name"),
          runeIconPath: n.Ember.computed.alias("stats.rune.iconPath"),
          statStrings: n.Ember.computed(
            "stats.rune.endOfGameStatDescs",
            "stats.vars",
            function () {
              const t = this.get("stats.vars") || [];
              let e = this.get("stats.rune.endOfGameStatDescs") || [];
              return (
                e.length <= 0 && (e = ["--"]),
                e.map((e) => this.fillInPlaceholders(e, t))
              );
            },
          ),
          fillInPlaceholders: function (t, e) {
            for (let a = 0; a < 3; a++) {
              const n = "@eogvar#@".replace("#", a + 1),
                l = e.length > a ? e[a] : "",
                i = new RegExp(n, "ig"),
                o = s.replace("#", l);
              t = t.replace(i, o);
            }
            return t;
          },
        });
      },
      (t, e, a) => {
        "use strict";
        a.r(e);
      },
      (t, e, a) => {
        const n = a(1).Ember;
        t.exports = n.HTMLBars.template({
          id: "BEIk6yhx",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-match-history\\\\src\\\\components\\\\runes\\\\rune-stats\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-match-history\\\\src\\\\components\\\\runes\\\\rune-stats\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-match-history\\\\src\\\\components\\\\runes\\\\rune-stats\\\\index.js\\" "],["text","\\n"],["open-element","img",[]],["static-attr","class","match-history-runes-icon"],["dynamic-attr","src",["concat",[["unknown",["runeIconPath"]]]]],["flush-element"],["close-element"],["text","\\n"],["open-element","div",[]],["static-attr","class","match-history-runes-name"],["flush-element"],["append",["unknown",["runeName"]],false],["close-element"],["text","\\n"],["open-element","div",[]],["static-attr","class","match-history-runes-stats-container"],["flush-element"],["text","\\n"],["block",["each"],[["get",["statStrings"]]],null,0],["close-element"],["text","\\n"]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","  "],["open-element","span",[]],["static-attr","class","match-history-runes-stats-text"],["flush-element"],["append",["helper",["sanitize"],[["get",["statString"]]],null],false],["close-element"],["text","\\n"]],"locals":["statString"]}],"hasPartials":false}',
          meta: {},
        });
      },
      (t, e, a) => {
        "use strict";
        var n,
          s = a(1),
          l = a(6),
          i = (n = a(10)) && n.__esModule ? n : { default: n };
        a(174);
        const { Component: o, computed: r } = s.Ember;
        function c(t, e) {
          return function () {
            const a = this.get(t);
            return this.get(e).map((t) => a.get(t));
          };
        }
        t.exports = o.extend(l.DataBindingMixin, {
          layout: a(175),
          classNames: ["runes-player-stats"],
          goldEarnedDisplay: r(
            "participant.goldEarned",
            "tra.metadata.locale.id",
            function () {
              const t = this.get("participant.goldEarned"),
                e = this.get("tra.metadata.locale.id");
              return i.default.formatGold(t, e);
            },
          ),
          kdaDisplay: r(
            "participant.kills",
            "participant.deaths",
            "participant.assists",
            function () {
              return `${this.get("participant.kills")} / ${this.get("participant.deaths")} / ${this.get("participant.assists")}`;
            },
          ),
          spellDTOs: r(
            "participant.spellIds.[]",
            c("spells", "participant.spellIds"),
          ),
          itemDTOs: r(
            "participant.itemIds.[]",
            c("items", "participant.itemIds"),
          ),
          champion: r("participant.championId", function () {
            const t = this.get("participant.championId");
            return this.get("champions").get(t);
          }),
          summonerId: r.readOnly("participant.player.summonerId"),
          puuid: r.readOnly("participant.player.puuid"),
          summonerName: r.readOnly("participant.player.summonerName"),
          gameName: r.readOnly("participant.player.gameName"),
          tagLine: r.readOnly("participant.player.tagLine"),
          runesPrimaryStyleName: r.readOnly("runesPrimaryStyle.name"),
          runesSubStyleName: r.readOnly("runesSubStyle.name"),
          didInsertElement() {
            this._super(...arguments), this.assignAllTooltips();
          },
          assignAllTooltips() {
            const t = this.get("spells"),
              e = this.get("items"),
              a = this.get("tra"),
              n = this.$(".spells img"),
              l = this.get("participant.spellIds");
            n.each(function (e) {
              const n = t.get(l[e]);
              n &&
                s.TooltipManager.assign(
                  this,
                  "SpellTooltip",
                  { spell: n, tra: a },
                  {
                    ComponentFactory: s.ComponentFactory,
                    targetAnchor: { x: "center", y: "top" },
                    tooltipAnchor: { x: "left", y: "bottom" },
                    offset: { x: -20, y: 6 },
                    restrictArea: "whole-window",
                  },
                );
            });
            const i = this.$(".item"),
              o = this.get("participant.itemIds");
            i.each(function (t) {
              const a = e.get(o[t]);
              a &&
                s.TooltipManager.assign(
                  this,
                  "ItemTooltip",
                  { item: a },
                  {
                    ComponentFactory: s.ComponentFactory,
                    targetAnchor: { x: "left", y: "center" },
                    tooltipAnchor: { x: "right", y: "center" },
                    offset: { x: 5, y: 0 },
                  },
                );
            });
          },
        });
      },
      (t, e, a) => {
        "use strict";
        a.r(e);
      },
      (t, e, a) => {
        const n = a(1).Ember;
        t.exports = n.HTMLBars.template({
          id: "3S+iNz8h",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-match-history\\\\src\\\\components\\\\runes\\\\player-stats\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-match-history\\\\src\\\\components\\\\runes\\\\player-stats\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-match-history\\\\src\\\\components\\\\runes\\\\player-stats\\\\index.js\\" "],["text","\\n"],["open-element","div",[]],["static-attr","class","spells"],["flush-element"],["text","\\n"],["block",["each"],[["get",["spellDTOs"]]],null,5],["close-element"],["text","\\n\\n"],["open-element","div",[]],["static-attr","class","champion"],["flush-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","champion-icon"],["flush-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","champion-icon-border"],["flush-element"],["close-element"],["text","\\n"],["block",["if"],[["get",["champion"]]],null,3,2],["text","    "],["open-element","div",[]],["static-attr","class","champion-frame"],["flush-element"],["close-element"],["text","\\n  "],["close-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","champ-level"],["flush-element"],["append",["unknown",["participant","champLevel"]],false],["close-element"],["text","\\n"],["close-element"],["text","\\n\\n"],["open-element","div",[]],["static-attr","class","player-info"],["flush-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","name"],["flush-element"],["text","\\n    "],["append",["helper",["player-name"],null,[["format","puuid","summonerName","gameName","tagLine"],["short",["get",["puuid"]],["get",["summonerName"]],["get",["gameName"]],["get",["tagLine"]]]]],false],["text","\\n  "],["close-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","styles"],["flush-element"],["append",["unknown",["runesPrimaryStyleName"]],false],["text"," / "],["append",["unknown",["runesSubStyleName"]],false],["close-element"],["text","\\n"],["close-element"],["text","\\n\\n"],["open-element","div",[]],["static-attr","class","items-container"],["flush-element"],["text","\\n  "],["open-element","ul",[]],["static-attr","class","items-list"],["flush-element"],["text","\\n"],["block",["each"],[["get",["itemDTOs"]]],null,1],["text","  "],["close-element"],["text","\\n"],["close-element"],["text","\\n\\n"],["open-element","div",[]],["static-attr","class","stats"],["flush-element"],["text","\\n  "],["open-element","span",[]],["static-attr","class","stats-kills"],["flush-element"],["append",["unknown",["kdaDisplay"]],false],["close-element"],["text","\\n  "],["open-element","span",[]],["static-attr","class","stats-minions"],["flush-element"],["append",["unknown",["participant","minionsPlusNeutralMonstersCount"]],false],["close-element"],["text","\\n  "],["open-element","span",[]],["static-attr","class","stats-gold"],["flush-element"],["append",["unknown",["goldEarnedDisplay"]],false],["close-element"],["text","\\n"],["close-element"],["text","\\n"]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","          "],["open-element","img",[]],["dynamic-attr","src",["concat",[["unknown",["item","iconPath"]]]]],["static-attr","alt",""],["static-attr","class","item-pic"],["flush-element"],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","      "],["open-element","li",[]],["static-attr","class","item"],["flush-element"],["text","\\n"],["block",["if"],[["get",["item","iconPath"]]],null,0],["text","      "],["close-element"],["text","\\n"]],"locals":["item"]},{"statements":[["text","      "],["open-element","img",[]],["static-attr","class","no-champ-icon"],["flush-element"],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","      "],["open-element","img",[]],["dynamic-attr","src",["concat",[["unknown",["champion","squarePortraitPath"]]]]],["static-attr","alt",""],["static-attr","class","champion-pic"],["flush-element"],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","      "],["open-element","img",[]],["dynamic-attr","src",["concat",[["unknown",["spell","iconPath"]]]]],["static-attr","alt",""],["static-attr","class","player-history-spell-pic"],["flush-element"],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["block",["if"],[["get",["spell","iconPath"]]],null,4]],"locals":["spell"]}],"hasPartials":false}',
          meta: {},
        });
      },
      (t, e, a) => {
        "use strict";
        var n = a(1);
        const s = {
            CHAMPIONS_KILLED: "kills",
            NUM_DEATHS: "deaths",
            ASSISTS: "assists",
            LARGEST_KILLING_SPREE: "largestKillingSpree",
            LARGEST_MULTI_KILL: "largestMultiKill",
            TOTAL_DAMAGE_DEALT_TO_CHAMPIONS: "totalDamageDealtToChampions",
            PHYSICAL_DAMAGE_DEALT_TO_CHAMPIONS:
              "physicalDamageDealtToChampions",
            MAGIC_DAMAGE_DEALT_TO_CHAMPIONS: "magicDamageDealtToChampions",
            TRUE_DAMAGE_DEALT_TO_CHAMPIONS: "trueDamageDealtToChampions",
            TOTAL_DAMAGE_DEALT: "totalDamageDealt",
            PHYSICAL_DAMAGE_DEALT_PLAYER: "physicalDamageDealt",
            MAGIC_DAMAGE_DEALT_PLAYER: "magicDamageDealt",
            TRUE_DAMAGE_DEALT_PLAYER: "trueDamageDealt",
            LARGEST_CRITICAL_STRIKE: "largestCriticalStrike",
            TOTAL_HEAL: "totalHeal",
            TOTAL_HEAL_ON_TEAMMATES: "totalHealsOnTeammates",
            TOTAL_DAMAGE_SHIELDED_ON_TEAMMATES:
              "totalDamageShieldedOnTeammates",
            TOTAL_DAMAGE_TAKEN: "totalDamageTaken",
            PHYSICAL_DAMAGE_TAKEN: "physicalDamageTaken",
            MAGIC_DAMAGE_TAKEN: "magicalDamageTaken",
            TRUE_DAMAGE_TAKEN: "trueDamageTaken",
            TOTAL_DAMAGE_SELF_MITIGATED: "damageSelfMitigated",
            TOTAL_DAMAGE_DEALT_TO_OBJECTIVES: "damageDealtToObjectives",
            TOTAL_DAMAGE_DEALT_TO_TURRETS: "damageDealtToTurrets",
            VISION_SCORE: "visionScore",
            TIME_CCING_OTHERS: "timeCCingOthers",
            WARD_PLACED: "wardsPlaced",
            WARD_KILLED: "wardsKilled",
            VISION_WARDS_BOUGHT_IN_GAME: "visionWardsBoughtInGame",
            GOLD_EARNED: "goldEarned",
            MINIONS_KILLED: "totalMinionsKilled",
            NEUTRAL_MINIONS_KILLED: "neutralMinionsKilled",
            NEUTRAL_MINIONS_KILLED_YOUR_JUNGLE:
              "neutralMinionsKilledTeamJungle",
            NEUTRAL_MINIONS_KILLED_ENEMY_JUNGLE:
              "neutralMinionsKilledEnemyJungle",
            TURRETS_KILLED: "turretKills",
            BARRACKS_KILLED: "inhibitorKills",
            PERK_PRIMARY_STYLE: "perkPrimaryStyle",
            PERK_SUB_STYLE: "perkSubStyle",
            WAS_AFK: "wasAfk",
          },
          l = {
            PERK0: "perk0",
            PERK0_VAR1: "perk0Var1",
            PERK0_VAR2: "perk0Var2",
            PERK0_VAR3: "perk0Var3",
            PERK1: "perk1",
            PERK1_VAR1: "perk1Var1",
            PERK1_VAR2: "perk1Var2",
            PERK1_VAR3: "perk1Var3",
            PERK2: "perk2",
            PERK2_VAR1: "perk2Var1",
            PERK2_VAR2: "perk2Var2",
            PERK2_VAR3: "perk2Var3",
            PERK3: "perk3",
            PERK3_VAR1: "perk3Var1",
            PERK3_VAR2: "perk3Var2",
            PERK3_VAR3: "perk3Var3",
            PERK4: "perk4",
            PERK4_VAR1: "perk4Var1",
            PERK4_VAR2: "perk4Var2",
            PERK4_VAR3: "perk4Var3",
            PERK5: "perk5",
            PERK5_VAR1: "perk5Var1",
            PERK5_VAR2: "perk5Var2",
            PERK5_VAR3: "perk5Var3",
          },
          i = (0, n.EmberDataBinding)({
            Ember: n.Ember,
            websocket: (0, n.getProvider)().getSocket(),
            logPrefix: "service:match-history:eog-stats-service",
            boundProperties: {
              eogStatsBlock: "/lol-end-of-game/v1/eog-stats-block",
              legsGameData: "/lol-match-history/v1/games/{{baseGameId}}",
              session: "/lol-login/v1/session",
            },
          });
        t.exports = n.Ember.Service.extend(i, {
          _eogParticipants: n.Ember.computed("eogStatsBlock", function () {
            const t = this.get("eogStatsBlock");
            if (!t) return n.Ember.A([]);
            const e = t.teams[0].players.concat(t.teams[1].players);
            let a = n.Ember.A([]);
            e.forEach(function (t) {
              const e = {};
              (e.teamId = t.teamId),
                (e.championId = t.championId),
                (e.summonerId = t.summonerId),
                (e.champLevel = t.stats.LEVEL),
                (e.goldEarned = t.stats.GOLD_EARNED),
                (e.championId = t.championId),
                (e.player = {}),
                (e.player.summonerName = t.summonerName),
                (e.player.summonerId = t.summonerId),
                (e.spellIds = []),
                (e.spellIds[0] = t.spell1Id),
                (e.spellIds[1] = t.spell2Id),
                (e.itemIds = t.items),
                (e.stats = {}),
                Object.keys(s).forEach(function (a) {
                  e.stats[s[a]] = t.stats[a];
                }),
                Object.keys(l).forEach(function (a) {
                  e.stats[l[a]] = t.stats[a];
                }),
                (e.minionsPlusNeutralMonstersCount =
                  e.stats.totalMinionsKilled + e.stats.neutralMinionsKilled),
                (e.kills = e.stats.kills),
                (e.deaths = e.stats.deaths),
                (e.assists = e.stats.assists),
                a.push(e);
            });
            const i = this.get("currentSummonerId");
            return (
              (a = n.Lodash.sortBy(a, [
                "teamId",
                function (t) {
                  return t.summonerId === i ? -1 : 0;
                },
              ])),
              a
            );
          }),
          _legsParticipants: n.Ember.computed("legsGameData", function () {
            const t = this.get("legsGameData");
            if (!t) return n.Ember.A([]);
            const e = t.participants,
              a = n.Ember.A([]);
            return (
              e.forEach(function (e) {
                const n = {},
                  s = t.participantIdentities.find(
                    (t) => t.participantId === e.participantId,
                  );
                (n.summonerId = s.player.summonerId),
                  (n.teamId = e.teamId),
                  (n.championId = e.championId),
                  (n.stats = e.stats),
                  a.push(n);
              }),
              a
            );
          }),
          setSourceOptions: function (t) {
            if (this.get("dataSource"))
              throw "rcp-fe-lol-match-history: you should only use setSourceOptions once.";
            this.set("dataSource", t.dataSource),
              this.set("baseGameId", t.baseGameId),
              this.set("baseSummonerId", t.baseSummonerId);
          },
          currentSummonerId: n.Ember.computed(
            "dataSource",
            "session.summonerId",
            "baseSummonerId",
            function () {
              return "eogStats" === this.get("dataSource")
                ? this.get("session.summonerId")
                : "legs" === this.get("dataSource")
                  ? this.get("baseSummonerId")
                  : -1;
            },
          ),
          gameId: n.Ember.computed(
            "dataSource",
            "eogStatsBlock",
            "baseGameId",
            function () {
              return "eogStats" === this.get("dataSource")
                ? this.get("eogStatsBlock.reportGameId")
                : "legs" === this.get("dataSource")
                  ? this.get("baseGameId")
                  : void 0;
            },
          ),
          participants: n.Ember.computed(
            "dataSource",
            "_eogParticipants",
            "_legsParticipants",
            function () {
              return "eogStats" === this.get("dataSource")
                ? this.get("_eogParticipants")
                : "legs" === this.get("dataSource")
                  ? this.get("_legsParticipants")
                  : n.Ember.A([]);
            },
          ),
        });
      },
    ],
    e = {};
  function a(n) {
    var s = e[n];
    if (void 0 !== s) return s.exports;
    var l = (e[n] = { exports: {} });
    return t[n](l, l.exports, a), l.exports;
  }
  (a.g = (function () {
    if ("object" == typeof globalThis) return globalThis;
    try {
      return this || new Function("return this")();
    } catch (t) {
      if ("object" == typeof window) return window;
    }
  })()),
    (a.r = (t) => {
      "undefined" != typeof Symbol &&
        Symbol.toStringTag &&
        Object.defineProperty(t, Symbol.toStringTag, { value: "Module" }),
        Object.defineProperty(t, "__esModule", { value: !0 });
    }),
    (a.p = "/fe/lol-match-history/"),
    (() => {
      "use strict";
      var t,
        e = (t = a(1)) && t.__esModule ? t : { default: t };
      const n = "rcp-fe-lol-match-history",
        s = document.currentScript.ownerDocument;
      const l = window.getPluginAnnounceEventName(n);
      s.addEventListener(
        l,
        function (t) {
          (0, t.registrationHandler)(function (t) {
            return e.default
              .init(t, {
                AudioPlugin: (t) => t.get("rcp-fe-audio"),
                ComponentFactory: (t) =>
                  t.get("rcp-fe-common-libs").getComponentFactory(1),
                ContextMenuManager: (t) =>
                  t.get("rcp-fe-lol-uikit").getContextMenuManager(),
                d3: (t) => t.get("rcp-fe-common-libs").getD3("3"),
                dataBinding: (t) =>
                  t
                    .get("rcp-fe-common-libs")
                    .getDataBinding("rcp-fe-lol-match-history"),
                Ember: (t) => t.get("rcp-fe-ember-libs").getEmber(),
                EmberDataBinding: (t) =>
                  t
                    .get("rcp-fe-ember-libs")
                    .getEmberDataBinding("rcp-fe-lol-match-history"),
                l10nDuration: (t) => t.get("rcp-fe-lol-l10n").duration(),
                Lodash: (t) => t.get("rcp-fe-common-libs").getLodash("4"),
                logger: (t) => t.get("rcp-fe-common-libs").logging.create(n),
                ModalManager: (t) =>
                  t.get("rcp-fe-lol-uikit").getModalManager(),
                moment: (t) => t.get("rcp-fe-lol-l10n").moment(),
                Navigation: (t) => t.get("rcp-fe-lol-navigation"),
                playerNames: (t) => t.get("rcp-fe-common-libs").playerNames,
                Replays: (t) =>
                  t.get("rcp-fe-lol-shared-components").getApi_Replays(),
                SharedReportModalApps: (t) =>
                  t
                    .get("rcp-fe-lol-shared-components")
                    .getApi_SharedReportModalApps(),
                SharedEmberComponents: (t) =>
                  t
                    .get("rcp-fe-lol-shared-components")
                    .getSharedEmberComponents(),
                SharedChampionMasteryComponents: (t) =>
                  t
                    .get("rcp-fe-lol-shared-components")
                    .getApi_SharedChampionMasteryComponents(),
                SharedChampionMasteryConstants: (t) =>
                  t
                    .get("rcp-fe-lol-shared-components")
                    .getApi_SharedChampionMasteryConstants(),
                Telemetry: (t) => t.get("rcp-fe-common-libs").getTelemetry(),
                TooltipManager: (t) =>
                  t.get("rcp-fe-lol-uikit").getTooltipManager(),
                Viewport: (t) =>
                  t.get("rcp-fe-lol-shared-components").getApi_Viewport(),
                socket: (t) => t.getSocket(),
              })
              .then(() =>
                e.default.add({
                  EmberApplicationFactory: (t) =>
                    t.get("rcp-fe-ember-libs").getEmberApplicationFactory(),
                }),
              )
              .then(() => {
                const t = a(2).default();
                return e.default.add({ MatchApi: () => t }), t;
              });
          });
        },
        { once: !0 },
      );
    })();
})();
